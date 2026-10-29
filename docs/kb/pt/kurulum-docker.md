---
title: Instalar com Docker
description: Instale com Docker no Mac, no Linux e no Windows. Um comando basta e não é preciso criar um arquivo .env. Seus dados ficam no volume de dados do Docker.
kind: nasil-yapilir
updated: 2026-10-22
---

O Docker executa aplicativos em ambientes isolados, chamados contêineres. Ao fim deste procedimento, o aplicativo responde em `http://localhost:3001`. O procedimento é para Mac, Linux e para quem já usa Docker; no Windows, o [instalador de arquivo único](/docs/kurulum-windows/) é mais simples. A primeira inicialização leva alguns minutos, porque o aplicativo é compilado dentro do contêiner; as seguintes levam segundos.

## O que você precisa

- Docker Desktop (Mac, Windows) ou Docker Engine com Docker Compose (Linux). No Windows, o Docker Desktop exige o WSL 2 e a virtualização ativada na BIOS/UEFI.
- Git. Se você não tiver, **Code → Download ZIP** na página do GitHub também serve.
- Cerca de 2 GB de espaço livre em disco e 2 GB de memória livre durante a primeira compilação.

## Passos

1. Baixe o repositório (os arquivos do projeto) e entre na pasta dele:

```sh
git clone https://github.com/ucsahinn/seotracker.git
cd seotracker
```

2. Inicie o aplicativo:

```sh
docker compose up -d
```

Não é preciso mais nada, nem um arquivo `.env`. A chave de criptografia e o token MCP do agente são gerados na primeira inicialização e guardados no volume de dados do Docker.

3. Para acompanhar o progresso:

```sh
docker compose logs -f
```

4. No registro, a linha "Building client + server" indica a primeira compilação. Espere até que `docker compose ps` mostre o estado **healthy** e depois abra `http://localhost:3001` no navegador.

O próximo passo é [conectar ao Google](/docs/google-baglantisi/). No Docker, os endereços de redirecionamento que você registra no Google são:

- `http://localhost:3001/api/gsc/oauth/callback`
- `http://localhost:3001/api/ga4/oauth/callback`

### Atualização

Execute estes dois comandos:

```sh
git pull
docker compose up -d --build
```

**Configurações → Sobre** avisa sobre a nova versão e mostra os mesmos comandos. Os dados ficam no volume `seotracker_data`: a atualização não os apaga.

### Parar e remover

- Para parar: `docker compose stop`
- Para iniciar de novo: `docker compose up -d`
- Para remover o contêiner e manter os dados: `docker compose down`
- Para apagar também os dados: `docker compose down -v`. Este comando apaga de forma permanente o banco de dados, as conexões com o Google e os relatórios.

### Backup

Seus dados estão no volume `seotracker_data`, no caminho `/app/.wrangler` dentro do contêiner. Para fazer um backup, execute estes três comandos, nesta ordem:

```sh
docker compose stop
docker run --rm -v seotracker_data:/data -v "$PWD":/backup alpine tar czf /backup/seotracker-yedek.tgz -C /data .
docker compose up -d
```

Para restaurar, use `tar xzf` no lugar de `tar czf` no mesmo comando. O arquivo `instance-secret`, no volume de dados, é a chave que criptografa as conexões com o Google. Sem ele, o backup é restaurado sem as conexões com o Google.

### Configurações (opcional)

Nenhuma configuração é obrigatória. Para mudar alguma, crie um arquivo `.env` na pasta do projeto e execute `docker compose up -d --force-recreate seotracker`.

| Nome da configuração                   | O que faz                                                                                                                                    |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| PORT                                   | O número da porta, 3001 por padrão. Quando ele muda, os endereços de redirecionamento do Google também mudam                                 |
| ALLOWED_HOST                           | O nome pelo qual o aplicativo é acessado de fora, se houver outro servidor na frente. Se estiver vazio, só localhost                         |
| AUTH_MODE                              | `local_noauth` (padrão) ou `cloudflare_access`                                                                                               |
| BETTER_AUTH_SECRET                     | A chave de criptografia. Deixe vazia e o aplicativo cria uma. Se você a definir à mão, use pelo menos 32 caracteres e depois não a altere    |
| GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Uma alternativa a informá-los na tela **Configurações**. O valor informado na tela tem prioridade                                            |
| PAGESPEED_API_KEY                      | Uma alternativa a informá-la na tela **Configurações**                                                                                       |
| MCP_TOKEN                              | Se estiver vazio, é criado na primeira inicialização. Se você escrever `off`, nenhum token é exigido. Qualquer outro valor é usado como está |

## Verificação

- Na saída de `docker compose ps`, o estado deve ser **healthy**. Na primeira inicialização, pode levar até cinco minutos para chegar a ele.
- A saída de `curl.exe http://127.0.0.1:3001/api/health` (no Windows; no Mac e no Linux, `curl`) deve começar com "status":"ok". Você também pode abrir `http://127.0.0.1:3001/api/health` no navegador.
- `http://localhost:3001` deve abrir no navegador. Na tela **Ajuda**, o cartão **Status do app** não deve mostrar erros. Até o Google ser conectado, a linha de login no Google fica em aviso: isso é normal.

## Perguntas frequentes

**Por que a primeira inicialização demora?** O aplicativo é compilado dentro do contêiner. Nas inicializações seguintes, a compilação é pulada.

**Onde está o arquivo `.env.example`?** Não há nenhum. Esse arquivo, herdado do projeto de origem, descrevia coisas que não existem nesta versão. A lista completa está na tabela acima e no arquivo `docs/ENVIRONMENT.md`.

**Posso expô-lo na internet?** O aplicativo não pede identificação a ninguém. Não o exponha sem colocar na frente um sistema de autenticação próprio. Se você definir `ALLOWED_HOST`, o aplicativo avisa na verificação de saúde.

**Onde fica o token MCP do agente?** A tela **Configuração do agente** mostra o comando: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Se você usa o Git Bash, coloque `MSYS_NO_PATHCONV=1` na frente.

## Se algo der errado

- **Aparece "Bind for 127.0.0.1:3001 failed".** O número da porta está em uso. Coloque na pasta do projeto um arquivo `.env` com a linha `PORT=3002` e recrie o contêiner. No Windows, o Bloco de Notas pode salvar o arquivo como `.env.txt`. No PowerShell, `Set-Content -Encoding ascii .env 'PORT=3002'` é mais seguro.
- **O estado é "unhealthy".** `docker compose logs --tail 50` mostra as últimas linhas. Se a memória acabou durante a compilação, dê mais memória ao Docker Desktop.
- **A conexão com o Google aparece como não configurada.** Se `BETTER_AUTH_SECRET` tiver menos de 32 caracteres, o Google fica desligado. Se você a definiu à mão, deixe-a mais longa. Se não definiu, o arquivo `instance-secret` no volume de dados pode estar danificado.
- **A conexão com o Google caiu depois de uma atualização.** `BETTER_AUTH_SECRET` mudou ou o volume de dados foi recriado. Escolha **Reconectar** nas configurações do projeto.

<!-- Kaynaklar: docs/SELF_HOSTING_DOCKER.md; docs/ENVIRONMENT.md; compose.yaml; docker-entrypoint.sh; src/lib/selfhost-preflight.ts; src/routes/_app/ai.tsx -->
