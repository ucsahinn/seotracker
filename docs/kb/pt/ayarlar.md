---
title: Configurações
description: Tema, chave de acesso do Google, chave do PageSpeed, limites de uso, versão e verificação de atualização. As configurações que valem para toda a instalação.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Esta página mostra onde gerenciar a conexão com o Google, a chave de velocidade e as atualizações.

**Configurações** é a tela do que vale para a instalação inteira. As configurações de cada projeto (nome, domínio, propriedade do Search Console e do Analytics) ficam na página **Configurações do projeto** de cada projeto. Aqui você gerencia a chave de acesso necessária para se conectar ao Google, a chave do PageSpeed, o tema e a verificação de atualização. À esquerda há as seções **Aparência**, **Google**, **Conta de serviço**, **Testes de velocidade**, **Limites**, **Sobre** e **Windows**. O título de cada seção tem um selo que indica o estado dela.

## O que há na tela

**Aparência**. Para **Tema** há as opções Sistema, Claro e Escuro. Sua escolha fica guardada neste navegador. Em outro navegador ou em outro computador, você escolhe de novo.

**Idioma.** A interface do aplicativo está disponível em turco, inglês, alemão, francês, italiano e português. Em **Configurações → Aparência → Idioma**, escolha **Türkçe**, **English**, **Deutsch**, **Français**, **Italiano** ou **Português**; a página recarrega no novo idioma. Cada idioma aparece com o seu próprio nome, então você encontra o seu mesmo sem ler o atual. Enquanto você não escolher, o aplicativo segue o idioma do navegador. Se o navegador não pedir nenhum destes idiomas, o aplicativo abre em inglês. Se o navegador não informar idioma nenhum, abre em turco. A escolha fica salva neste navegador, como o tema. Só a interface do aplicativo muda. O menu da bandeja do Windows continua em turco.

**Notificações.** O sino na barra lateral mostra os últimos 50 eventos e a contagem de mensagens não lidas. **Marcar tudo como lido** mantém o histórico. Resultados de auditoria, versões novas, problemas na conexão com o Google, relatórios e consultas ao índice aparecem aqui. Enquanto o aplicativo está aberto, um evento novo aparece numa janelinha própria do aplicativo. Com a aba em segundo plano, o evento fica só no histórico do sino. O aplicativo não envia notificações do Windows nem do navegador, para que o mesmo evento nunca apareça em duas janelas sobrepostas. Se você está olhando a tela de uma auditoria, a janelinha de término dessa auditoria não aparece além disso, porque a tela já mostra o fim. **Som das notificações** toca um som curto nos eventos importantes; com **Ouvir som** você experimenta. **Testar notificação no app** cria uma notificação de teste e o som dela. As animações visuais seguem a preferência do sistema por menos movimento; o som tem configuração própria.

**Windows.** Aqui você liga ou desliga o início junto com o Windows e a instalação automática de atualizações. São as mesmas preferências salvas do menu da bandeja. As restrições de administrador são explicadas ao lado da opção. Os controles ficam desativados nas instalações Docker e de desenvolvimento; os iniciadores antigos do Windows pedem que você atualize o pacote.

Se uma preferência não puder ser salva, a tela diz por quê e o que fazer. Como esta seção conversa com o aplicativo da barra de tarefas, os erros vêm desse aplicativo:

- **O aplicativo da bandeja não respondeu em 4 segundos.** Se o computador acabou de acordar da suspensão, aperte **Tentar novamente** depois de alguns segundos. Se persistir, escolha **Çıkış** (Sair) no menu da bandeja e abra o aplicativo de novo.
- **Não foi possível conectar ao serviço de configurações do aplicativo da bandeja.** Ele pode ter sido fechado. Abra o seowatcher de novo pelo menu Iniciar.
- **Esta configuração está bloqueada por um administrador.** Só o administrador do computador pode alterá-la. Isso é normal se a instalação foi feita para todos os usuários.
- **O aplicativo da bandeja não reconheceu esta solicitação.** O servidor e o aplicativo podem ser de sessões diferentes. Escolha **Çıkış** (Sair) no menu da bandeja e abra o aplicativo de novo.
- **O aplicativo da bandeja recusou a solicitação.** Reinicie o aplicativo pelo menu da bandeja. Se persistir, atualize o pacote do Windows.
- **O aplicativo da bandeja devolveu uma resposta não reconhecida.** As versões podem não corresponder. Atualize o pacote do Windows.

Se a seção nem abrir e disser que as preferências do Windows não estão disponíveis, verifique se o aplicativo da bandeja está em execução.

**Google.** O selo tem um de três valores: **Salvo**, **Vindo de variáveis de ambiente** (Vem do ambiente; em uma instalação Docker, foi informado pelo arquivo `.env`) ou **Faltando**. A seção mostra os dois endereços de redirecionamento que você vai adicionar no Google Cloud Console (o painel de desenvolvedores do Google). Há botões de copiar ao lado deles. Você precisa adicionar os dois. Se não adicionar o endereço do Analytics, só o Search Console se conecta.

Campos: **ID do cliente** e **Segredo do cliente**. Ambos são detalhes da chave de acesso que você obtém do Google. Botões: **Salvar**, **Cancelar**, **Alterar** e **Excluir**. **Excluir** corta as conexões existentes. A configuração passo a passo está no guia da conexão com o Google.

**Conta de serviço** (o caminho mais curto). Uma conta de serviço é uma conta criada no Google para o aplicativo usar, não para uma pessoa. No campo **Arquivo de chave da conta de serviço (JSON)**, você cola o conteúdo do arquivo que baixou do Google Cloud. Se uma estiver salva, o endereço de e-mail da conta aparece. A tela informa onde adicionar esse endereço:

- Search Console: "Configurações → Usuários e permissões → Adicionar usuário", permissão Full.
- Analytics: "Administrador → Gerenciamento de acesso", permissão Viewer.

O selo diz **Salvo** ou **Não usado**. Uma conta de serviço salva tem preferência sobre a chave de acesso do Google. Excluir remove a conta do aplicativo, mas não cancela a chave no Google. Se a seção **Google** não tem o ID do cliente, mas há uma conta de serviço conectada, o selo da seção **Google** diz um neutro **Não usado, há uma conta de serviço conectada** em vez do **Faltando** amarelo. O Google passa então a funcionar pela conta de serviço.

**Testes de velocidade**. Há um campo **Chave de API** e um botão **Testar chave**. O teste "Usa 1 medição", e você pode clicar uma vez a cada dez segundos. O selo diz **Chave salva**, **Proveniente de uma variável de ambiente** ou **Chave ausente**. Os detalhes estão no guia da chave do PageSpeed.

**Limites**. Os cartões "Limites do Google e do sistema" mostram o seguinte:

- URL Inspection (Search Console): 2.000 por dia.
- PageSpeed Insights.
- Unidades de cota diária e horária do GA4 (Google Analytics): 200.000 e 40.000 por padrão. O Google não publica esse número. Ele só informa quanto resta.
- Limite de páginas da auditoria: 10.000.
- Relatórios por projeto: 10.000; modelos: 10.
- Maior relatório: 500.000 bytes.

O estado de cada cartão é **Resta o suficiente**, **Está acabando** (a partir de 70%), **Quase esgotado** (a partir de 90%) ou **Desconhecido**.

**Sobre.** A linha **Versão** mostra a versão instalada (como 0.8.0 Alpha). A chave **Verificar atualizações** vem ligada por padrão. Ligada, o aplicativo pergunta ao GitHub pela versão mais recente a cada seis horas. O botão **Verificar agora** também aparece. O aplicativo da bandeja do pacote Windows faz ainda a sua própria verificação, uma vez por dia. Se houver uma versão nova, aparece o link **O que mudou** e, nas instalações Docker, um comando para copiar: `git pull && docker compose up -d --build`. No pacote Windows, a tela aponta para **Güncelle** (Atualizar) no menu do ícone da barra de tarefas (esse menu só existe em turco). Se a atualização automática estiver ligada, a versão nova se instala sozinha.

A verificação diz uma destas coisas: saiu uma versão nova, "Você está na versão mais recente." ou um problema. Se o GitHub não puder ser alcançado, a tela diz "Não foi possível acessar o GitHub na última verificação" e mostra a última versão conhecida com a data da última verificação bem-sucedida. Isso quer dizer que não deu para confirmar se a sua versão está atual. Verifique sua conexão com a internet e tente de novo. Se a tela disser "Não foi possível acessar a fonte das versões: o repositório não foi encontrado ou é privado (GitHub 404)", o problema não é seu. Baixe o pacote de diagnóstico na tela **Ajuda** e informe. Se a chave estiver desligada, a tela diz "As verificações de atualização estão desativadas, portanto, nenhuma solicitação vai para o GitHub."

**Notas de versão**. A página fica acima das notificações no menu lateral. As etiquetas coloridas indicam novidades, correções e alterações de segurança.

## Como usar

1. Na primeira configuração, informe primeiro o ID do cliente e a chave secreta na seção **Google**. Depois informe a chave do PageSpeed na seção **Testes de velocidade**. Quando as duas estiverem salvas, vá ao projeto e escolha a propriedade.
2. Uma vez por mês, olhe a seção **Limites**. A cota que você vê como "Está acabando" costuma ser o limite de URL Inspection.
3. Se houver uma versão nova na seção **Sobre**, atualize. As notas de versão dizem o que mudou. A verificação de atualização é a única conexão do seu computador com algum lugar que não seja o Google. Se você não a quiser, desligue essa opção.
4. Se precisar trocar a chave de acesso do Google (por exemplo, um novo projeto do Cloud), clique em **Alterar** e cole os valores novos. As conexões existentes não funcionam com a chave nova. Nos projetos, você precisa escolher **Reconectar**.

## Perguntas frequentes

**Por que não vejo a minha chave secreta na tela?** O aplicativo a guarda criptografada e não a envia de volta ao navegador. A tela mostra apenas que ela está salva, e o ID.

**E se o valor que informei no `.env` no Docker e o que digitei na tela entrarem em conflito?** O digitado na tela vence. Se você salvar um valor enquanto o selo diz "Vindo de variáveis de ambiente" (Vem do ambiente), esse passa a ser usado daí em diante.

**O que a verificação de atualização envia?** Não envia nenhum dado. Lê a lista pública de versões do GitHub. A solicitação é anônima.

**Conta de serviço ou chave de acesso do Google?** Uma conta de serviço dispensa a tela de consentimento e não expira. Em troca, você precisa dar permissão a essa conta à mão no Search Console e no Analytics. Em uma instalação de uma só pessoa, qualquer uma serve. Se você vê com frequência "süresi doldu" (expirou), passe para uma conta de serviço.

## Limites

A tela **Configurações** não altera o número da porta, a pasta de dados nem as configurações de rede. Isso fica em `config.json` no pacote Windows e no arquivo `.env` no Docker. Não há gerenciamento de usuário e senha, porque o aplicativo é de um só usuário. Os cartões de cota são a contagem do próprio aplicativo, não o contador real do Google. As inspeções de URL que você faz à mão no Search Console não aparecem aqui, mas gastam o limite do Google.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
