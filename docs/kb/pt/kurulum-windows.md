---
title: Instalar no Windows
description: Instale no Windows com um único arquivo. Primeira abertura, atualização, desinstalação, backup e troca do número da porta. Não precisa de Docker nem de terminal.
kind: nasil-yapilir
updated: 2026-10-22
---

A interface do aplicativo está em turco. Este guia mostra cada botão e cada nome de tela em turco, com o significado em português entre parênteses.

Ao fim desta página, o aplicativo estará instalado no seu computador e aberto no navegador. A instalação leva dois minutos. Ela é feita só para a sua conta de usuário e não exige direitos de administrador (a permissão é pedida uma única vez, se faltar o componente Visual C++).

## O que você precisa

- Windows 10 ou 11 (64 bits).
- Cerca de 350 MB de espaço livre. O instalador tem 81 MB e o aplicativo instalado ocupa 290 MB.
- Um navegador, como Edge, Chrome ou Firefox.
- Você não precisa de Docker, Node, terminal (janela de comandos) nem direitos de administrador.
- O motor do aplicativo precisa do pacote Visual C++ da Microsoft. Se o seu computador não o tiver, o instalador o instala para você e pede permissão de administrador uma vez.

## Passos

### Primeira instalação

1. Baixe o arquivo **seowatcher-setup.exe** na página de versões do GitHub. O endereço fixo é: `github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
2. Dê um duplo clique no arquivo.
3. Se o Windows disser "O Windows protegeu o computador", clique em **Mais informações** e depois em **Executar assim mesmo** (em um Windows em turco: "Daha fazla bilgi", "Yine de çalıştır"). O arquivo ainda não tem assinatura digital, por isso o Windows não reconhece o editor. Esse aviso é normal.
4. Se quiser, compare o hash SHA-256 do arquivo (a impressão digital do arquivo) com o `SHA256SUMS.txt` da página de versões.
5. No assistente de instalação, percorra as páginas nesta ordem:
   1. Página de boas-vindas: clique em **Avançar**.
   2. Página "instalar para": escolha **Somente para mim**. É a instalação por usuário, recomendada, em `%LOCALAPPDATA%\Programs\seowatcher`. "Todos os usuários" instala em `C:\Program Files\seowatcher` e pede permissão de administrador.
   3. Página de opções: **Iniciar o seowatcher quando o Windows iniciar** (em turco: "Windows açılınca seowatcher'ı başlat") e **Criar um atalho na área de trabalho** (em turco: "Masaüstüne kısayol ekle"). A primeira já vem marcada. Desmarque-a se não quiser que o aplicativo inicie em segundo plano. Clique em **Avançar**.
   4. Clique em **Instalar** (em um Windows em turco: **Kur**).
   5. A última página tem a caixa **Iniciar o seowatcher agora**. Deixe-a marcada e clique em **Concluir** (em um Windows em turco: **Bitti**). O aplicativo abre.
6. Aguarde. A primeira abertura leva de 20 a 30 segundos. Procure o ícone do seowatcher na área de notificação (a bandeja do sistema), à direita da barra de tarefas. Se o ícone não aparecer, clique na seta ^ da barra de tarefas. O texto do ícone muda em sequência para "Anahtarlar hazırlanıyor" (Preparando as chaves), "Veritabanı güncelleniyor" (Atualizando o banco de dados) e "Sunucu başlatılıyor" (Iniciando o servidor). Quando estiver pronto, o navegador abre sozinho. Quando o Windows inicia o aplicativo automaticamente, o navegador não abre; aparece um balão "seowatcher hazır" (o seowatcher está pronto).
7. O endereço `http://127.0.0.1:3001` abre sozinho no navegador. É o endereço do próprio computador (127.0.0.1) e o número da porta (port: 3001).

O próximo passo é o guia da conexão com o Google.

### Menu da barra de tarefas

Clique com o botão direito no ícone (se ele não aparecer, clique na seta ^ da barra de tarefas). O menu tem estes itens:

- **seowatcher'ı aç** (Abrir o seowatcher): abre o aplicativo no navegador. Dar um duplo clique no ícone faz o mesmo.
- **Yeniden başlat** (Reiniciar): fecha o aplicativo e o abre de novo. Se algo travar, tente isto primeiro.
- **Günlükleri aç** (Abrir os registros): abre a pasta de registros. Nela ficam `launcher.log`, `server.log` e `migrate.log`.
- **Tanı bilgisini kopyala** (Copiar informações de diagnóstico): copia para a área de transferência a versão do Windows, o processador, a versão do Visual C++, um teste do motor, o módulo com falha no log de eventos do Windows, os despejos de falha e as últimas linhas do registro.
- **Sorunu bildir (GitHub)** (Relatar um problema (GitHub)): coloca as mesmas informações na área de transferência e abre no GitHub um relato já preenchido. Acrescente uma frase sobre o que você fez e envie.
- **Eksik Windows bileşenini kur** (Instalar o componente do Windows que falta): aparece só se o pacote Visual C++ estiver ausente. Ao clicar, ele instala o pacote e reinicia o aplicativo.
- **Kurulumu onar** (Reparar a instalação): limpa os arquivos temporários, verifica o pacote e reabre o aplicativo.
- **Güncelle** (Atualizar): está sempre no menu. Clique para consultar o GitHub na hora; se houver uma versão nova, ela é baixada e instalada. Se não houver, aparece "Güncel" (atualizado). Quando uma atualização já está pronta, o item mostra "Güncelle: X.Y.Z sürümü hazır" (Atualizar: a versão 2.3.8 está pronta); o número é o da versão nova.
- **Güncellemeleri kendiliğinden kur** (Instalar as atualizações automaticamente): se estiver marcado, o aplicativo instala sozinho a versão nova quando a encontra.
- **Veri klasörünü aç** (Abrir a pasta de dados): abre a pasta com o banco de dados e as chaves.
- **Windows açılınca başlat** (Iniciar com o Windows): se estiver marcado, o aplicativo inicia em segundo plano quando o computador liga.
- **Çıkış** (Sair): fecha o aplicativo por completo. Enquanto ele estiver fechado, a página aberta no navegador não funciona.

O menu mostra ainda uma linha de estado ("Çalışıyor: http://127.0.0.1:3001/" (Em execução: http://127.0.0.1:3001/) ou um texto de erro) e o número da versão.

Se você iniciar o aplicativo uma segunda vez, nenhuma cópia nova abre. Só a página se abre no navegador.

### Atualização

O aplicativo se atualiza sozinho. Dois minutos depois de abrir, e uma vez por dia, ele consulta no GitHub a versão mais recente. Se houver uma versão nova, ele a baixa, compara a impressão digital do arquivo (SHA-256) com o valor da página de versões, instala em silêncio e reabre. Nesse intervalo, o texto do ícone mostra "Güncelleme indiriliyor" (Baixando a atualização) e "Güncelleme kuruluyor" (Instalando a atualização). A seção **Ayarlar → Hakkında** (Configurações → Sobre), dentro do aplicativo, também avisa da versão nova e leva você até **Güncelle** no ícone.

- Se não quiser a instalação automática, desmarque **Güncellemeleri kendiliğinden kur** no menu. Assim, quando sair uma versão nova, você vê um balão e o item **Güncelle** aparece no menu.
- Para atualizar manualmente, baixe o novo instalador no mesmo endereço e execute-o. O assistente fecha o aplicativo em execução, troca os arquivos e o inicia de novo.

Seus dados, sua conexão com o Google e suas configurações continuam como estavam.

### Implantação em empresas

Para equipes de TI que querem instalar para todos os usuários de um computador, ou instalar em silêncio com uma ferramenta de implantação (Intune, GPO, PDQ):

- **Para todos os usuários**: execute o instalador como administrador e escolha a opção "todos os usuários" no assistente. O aplicativo é instalado em `C:\Program Files\seowatcher` (a instalação por usuário vai para `%LOCALAPPDATA%\Programs\seowatcher`). Os dados de cada usuário continuam na pasta `%LOCALAPPDATA%\seowatcher` dele.
- **Instalação silenciosa**: `seowatcher-setup.exe /VERYSILENT /NORESTART` (um usuário) ou `seowatcher-setup.exe /VERYSILENT /ALLUSERS /NORESTART` (administrador, todos os usuários). Quando a instalação silenciosa termina, o aplicativo abre sozinho.
- **Registro da instalação**: cada instalação grava em `%LOCALAPPDATA%\seowatcher\logs\setup.log`. Com `/LOG="caminho"` você indica outro local.
- **Desinstalação silenciosa**: `unins000.exe /VERYSILENT` (na pasta de instalação: `%LOCALAPPDATA%\Programs\seowatcher` na instalação por usuário, `C:\Program Files\seowatcher` para todos os usuários).
- **Verificação**: antes de publicar cada versão, ela é instalada em uma máquina Windows limpa, aberta, aguardada até o endereço de verificação de saúde responder, e desinstalada. Uma versão só é publicada depois de passar nesse teste.

### Reparo

Se algo travar, clique com o botão direito no ícone e em **Kurulumu onar** (Reparar a instalação). O aplicativo limpa os arquivos temporários, verifica se o pacote está completo, confere o banco de dados de novo e abre. Se faltar um arquivo, ele avisa e abre a página de versões. Basta executar o instalador outra vez.

### Desinstalação

1. No Windows, em **Ayarlar → Uygulamalar → Yüklü uygulamalar** (Configurações → Aplicativos → Aplicativos instalados), encontre **seowatcher**.
2. Clique em **Kaldır** (Desinstalar).

O desinstalador remove o programa, o atalho do menu Iniciar e o registro de "iniciar com o Windows". Ele não mexe na pasta de dados. Se você também quiser apagar o banco de dados, a conexão com o Google e os relatórios, apague a pasta de dados por conta própria.

### Onde ficam os dados e como fazer backup?

Tudo fica em uma única pasta: `%LOCALAPPDATA%\seowatcher`. Digite esse texto na barra de endereços do Explorador de Arquivos. O item de menu **Veri klasörünü aç** (Abrir a pasta de dados) também leva até lá. Dentro dela há:

- `data`: o banco de dados (projetos, arquivo do Search Console, auditorias, relatórios).
- `instance-secret`: a chave que criptografa as chaves de acesso do Google. Se ela se perder, você precisa refazer as conexões com o Google do zero.
- `mcp-token`: a senha que o seu assistente de IA usa ao se conectar ao aplicativo.
- `server.env`, `config.json`, `logs`.

Para fazer um backup:

1. Feche o aplicativo com **Çıkış** (Sair).
2. Copie a pasta inteira.

Para restaurar, feche o aplicativo, coloque a pasta de volta no lugar e inicie o aplicativo. Mudar para outro computador funciona do mesmo jeito. Se você levar também o arquivo `instance-secret`, as conexões com o Google continuam funcionando.

### Trocar o número da porta

O aplicativo usa o número 3001. Se outro programa o estiver usando, o aplicativo escolhe o primeiro número livre de 3002 a 3010. Ele grava o número escolhido no arquivo `config.json`.

Se você quiser um número específico:

1. Feche o aplicativo.
2. Abra o arquivo `config.json`, na pasta de dados, com o Bloco de Notas.
3. Escreva isto nele:

```json
{
  "port": 3005
}
```

4. Salve e inicie o aplicativo.

Quando o número muda, atualize também no Google os dois endereços de redirecionamento, com o número novo. Esses endereços são explicados no guia da conexão com o Google.

## Verificação

- Ao passar o mouse sobre o ícone da barra de tarefas (se ele não aparecer, clique na seta ^), deve aparecer "seowatcher X.Y.Z: Çalışıyor: http://127.0.0.1:3001/" (seowatcher 2.3.7: Em execução: http://127.0.0.1:3001/). O número da versão é o da que você instalou.
- No navegador, o endereço `http://127.0.0.1:3001/api/health` deve mostrar um texto que começa com "status":"ok".
- Na tela **Yardım** (Ajuda), o cartão "Kurulumunuzun durumu" (Estado da sua instalação) deve dizer "Her şey yolunda." (Está tudo certo.). Antes de conectar o Google, a linha "Google girişi" (Login do Google) pede atenção. Isso é normal.

## Perguntas frequentes

**Por que ele abre no navegador?** O aplicativo roda no seu computador como um pequeno servidor. O navegador é a tela dele.

**O que acontece quando eu desligo o computador?** O aplicativo também fecha. Se "Windows ile başlat" (Iniciar com o Windows) estiver marcado, ele inicia sozinho na próxima vez que o computador ligar.

**Posso abri-lo de outro computador?** Não, e isso é de propósito. O aplicativo escuta apenas o endereço 127.0.0.1. Para abri-lo para a internet, você precisa colocar sua própria autenticação na frente.

**Posso migrar da versão Docker?** Sim, mas os dados não se movem sozinhos. Você cria os projetos de novo e conecta o Google de novo. O arquivo do Search Console se enche outra vez na primeira abertura.

**Meu antivírus deu um aviso.** Como o arquivo não tem assinatura digital, alguns antivírus avisam. Baixe o arquivo somente da página de versões do GitHub e compare o hash SHA-256.

## Se algo der errado

- **O ícone diz "Hata: 3001 ve sonraki 9 adres numarası (port) dolu" (Erro: a porta 3001 e as 9 seguintes estão em uso).** Outro programa está usando esses números. Escreva outro número no arquivo `config.json`.
- **O ícone diz "Veritabanı güncellemesi başarısız" (A atualização do banco de dados falhou).** Clique em **Günlükleri aç** (Abrir os registros) e veja as últimas linhas de `migrate.log`. Na maioria das vezes o disco está cheio ou a pasta é somente leitura.
- **O ícone diz "Sunucu beklenmedik şekilde kapandı" (O servidor fechou de forma inesperada).** As últimas linhas de `server.log` dão o motivo. Tente **Yeniden başlat** (Reiniciar). Se não resolver, compartilhe o registro em um relato no GitHub.
- **O navegador não abriu.** Dê um duplo clique no ícone ou digite o endereço à mão: `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->
