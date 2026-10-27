---
title: Conectar ao Google
description: Pegue uma chave de acesso do Google uma única vez, cole no aplicativo e escolha o seu site para ler os dados do Search Console e do Analytics 4.
kind: nasil-yapilir
updated: 2026-10-22
---

A interface do aplicativo existe em seis idiomas: turco, inglês, alemão, francês, italiano e português. O idioma é escolhido em Configurações → Aparência → Idioma. Este guia mostra botões e telas com o nome que eles têm na interface em português. Para as páginas do Google, usa os nomes que o Google mostra com a conta em português.

Ao fim desta página, o aplicativo estará conectado ao Google em seu nome e lerá os dados do seu site. Para isso, você pega uma "chave de acesso do Google" uma única vez. Leva cerca de dez minutos e você nunca precisa repetir. Há também um caminho mais curto, com uma conta de serviço, no fim da página.

## O que você precisa

- Um site verificado no Search Console (uma propriedade). Se não estiver verificado, o aplicativo não o vê na lista.
- Para o Analytics 4, pelo menos a permissão de "Leitor" nessa propriedade. É opcional. O Search Console sozinho basta.
- Uma conta Google. O Google Cloud Console (o painel de desenvolvedores do Google) é gratuito e não pede cartão.
- O aplicativo aberto. Você vai copiar dele os dois endereços de redirecionamento (os endereços para os quais o Google devolve você ao aplicativo depois que você dá a permissão).

## Passos

1. No aplicativo, abra **Configurações → Google**. Você vê dois endereços. Um termina com `/api/gsc/oauth/callback` (Search Console) e o outro com `/api/ga4/oauth/callback` (Analytics). No pacote para Windows, os endereços começam com `http://127.0.0.1:3001`. No Docker, começam com `http://localhost:3001`. Anote os dois em algum lugar.
2. No navegador, vá a `console.cloud.google.com`. No seletor de projetos, no alto da página, escolha **Novo projeto**. O nome não importa. Você pode escrever "seowatcher".
3. Abra a página **APIs e serviços → Biblioteca**. Digite **Google Search Console API** na caixa de busca, clique nela e escolha **Ativar**. Se você também for conectar o Analytics, faça o mesmo para a **Google Analytics Admin API** e a **Google Analytics Data API**.
4. Abra a página **APIs e serviços → Tela de consentimento OAuth**. Como tipo de usuário, escolha **Externo**. Como nome do aplicativo, escreva o que quiser e, nos campos de e-mail, o seu próprio endereço. O estado de publicação pode continuar "Teste".
5. Na mesma página, adicione a sua própria conta Google em **Usuários de teste**. O Google não precisa aprovar mais nada.
6. Na página **APIs e serviços → Credenciais**, escolha **Criar credenciais** e depois **ID do cliente OAuth**. Essa é a sua chave de acesso do Google.
7. Como tipo de aplicativo, escolha **Aplicativo da Web**.
8. Em **URIs de redirecionamento autorizados**, adicione os dois endereços do passo 1. Não coloque barra no fim. A diferença de um único caractere causa no Google o erro "redirect_uri_mismatch" (o endereço não corresponde).
9. Escolha **Criar**. O Google mostra um ID do cliente e uma chave secreta.
10. Volte ao aplicativo. Em **Configurações → Google**, cole o ID que termina em `.apps.googleusercontent.com` no campo **ID do cliente**. Cole a chave que começa com `GOCSPX-` no campo **Segredo do cliente**.
11. Escolha **Salvar**. Aparece o aviso "Chave de acesso do Google salva". Não é preciso reiniciar. Se você colar o ID no campo errado, o aplicativo avisa: "O ID do cliente deve terminar em .apps.googleusercontent.com. Cole o ID do cliente OAuth, não o segredo do cliente."
12. Se você ainda não tem um projeto, crie um primeiro com **Novo projeto**. Veja [Projetos](/docs/projeler/).
13. Vá ao seu projeto: **Configurações do projeto → Conexões**. No cartão **Google Search Console**, escolha **Conectar**.
14. Na tela de permissão do Google, escolha a conta que você adicionou como usuário de teste e dê a permissão. Ao voltar ao aplicativo, aparece o aviso "Search Console conectado".
15. Na lista **Escolher propriedade**, escolha o seu site e depois **Salvar propriedade**. Se você escolher uma propriedade de domínio, o cartão diz "Propriedade de domínio: abrange todos os subdomínios e URLs http e https."
16. Para o Analytics, na mesma tela, escolha **Conectar** no cartão **Google Analytics**, dê a permissão e escolha a propriedade. As duas conexões pedem permissões separadas. Uma não cobre a outra.

### Um caminho mais curto: a conta de serviço

Uma conta de serviço é uma conta especial que se conecta ao Google no seu lugar. Você não precisa da tela de consentimento. Para a maioria das pessoas, esse é o caminho recomendado. O caminho OAuth acima é para quem prefere entrar com a própria conta Google.

1. Vá a `console.cloud.google.com` e abra **IAM e administrador → Contas de serviço**. Confira que, no mesmo projeto do Cloud, as APIs do passo 3 estão ativadas.
2. Clique em **Criar conta de serviço**. Dê um nome, por exemplo "seowatcher". Pule as etapas de função e clique em **Concluído**.
3. Na linha da nova conta, abra **Chaves → Adicionar chave → Criar nova chave**, escolha **JSON** e confirme. Um arquivo é baixado. Mantenha-o em sigilo.
4. No seowatcher, abra **Configurações → Conta de serviço**. Cole o conteúdo do arquivo inteiro e salve. A tela mostra o endereço de e-mail da conta de serviço. Copie-o.
5. No Search Console, abra **Configurações → Usuários e permissões → Adicionar usuário**. Digite esse endereço de e-mail e escolha a permissão **Total**.
6. Para o Analytics, no Google Analytics, abra **Administrador → Gerenciamento de acesso** da propriedade. Adicione o mesmo endereço de e-mail como **Leitor**.

Se uma conta de serviço estiver salva, o aplicativo dá preferência a ela. A linha "Em uso agora" na tela **Configurações** mostra qual está ativa.

## Verificação

- Nos cartões de **Configurações do projeto → Conexões**, o selo deve dizer **Conectado**.
- Os quatro cartões de números da tela **Painel** devem se preencher em poucos segundos. Em um site novo, os números podem ser zero. Isso não é um erro de conexão.
- O selo em **Configurações → Google** deve dizer **Salvo**.

## Perguntas frequentes

**Onde a chave secreta fica guardada?** No banco de dados deste computador, criptografada. A chave que a criptografa é o arquivo `instance-secret` (na pasta de dados, no Windows; no volume de dados, no Docker). A chave nunca é enviada ao navegador.

**Posso usar a mesma chave de acesso em mais de um projeto?** Sim. Uma por instalação basta. Cada projeto escolhe a sua própria propriedade.

**A conexão caiu depois de alguns dias.** Em aplicativos com estado "Teste", o Google pode limitar a permissão a sete dias. O cartão diz "A conexão expirou". **Reconectar** resolve. A solução duradoura é passar a tela de consentimento para "Produção" ou trocar para uma conta de serviço.

**Que permissões ele pede?** Somente leitura para o Search Console (`webmasters.readonly`) e somente leitura para o Analytics (`analytics.readonly`). O aplicativo não consegue alterar nada no Google.

## Se algo der errado

- **O Google diz "redirect_uri_mismatch".** O endereço de redirecionamento no Cloud Console não é exatamente igual ao do aplicativo. Use o botão de copiar da tela **Configurações**. Basta http no lugar de https, 127.0.0.1 no lugar de localhost, ou uma barra no fim para causar o erro.
- **Aparece o aviso "Chave de acesso do Google ausente".** Os passos 10 e 11 foram pulados ou o salvamento falhou. Na tela **Configurações**, o selo deve dizer **Salvo**.
- **O Google diz "access_denied".** A conta com que você entrou não está na lista de usuários de teste da tela de consentimento. Adicione a conta à lista ou escolha a conta certa.
- **A lista de propriedades está vazia.** Esta conta não tem nenhum site verificado no Search Console nem permissão no Analytics. Verifique o site primeiro.
- **Aparece "Conexão não concluída" e "state_mismatch".** Você abriu a tela de permissão em duas abas ou esperou mais de dez minutos. Tente de novo desde o início, em uma única aba. Se os cookies do navegador (pequenos arquivos que os sites guardam no navegador) estiverem desativados, ative-os.
- **Aparece "Conta do Google já vinculada".** A conta já foi conectada a outro registro. Remova o antigo com **Remover conta** no seletor de propriedades e conecte de novo.
- **As conexões caíram depois de uma atualização.** A chave de criptografia mudou (no Docker, `BETTER_AUTH_SECRET` foi adicionada ou o volume de dados foi recriado). Escolha **Reconectar** nos cartões.

<!-- Kaynaklar: docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md; docs/SELF_HOSTING_GOOGLE_ANALYTICS.md; src/client/features/settings/GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; googleClientId.ts; src/client/features/integrations/IntegrationConnectionCard.tsx; GooglePropertyPicker.tsx; googleAuthErrorCopy.ts; src/server/features/google/selfHostedOAuth.ts; oauth-config.ts; src/shared/gsc.ts; src/shared/ga4.ts -->
