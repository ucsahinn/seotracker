---
title: Configurações
description: Tema, chave de acesso do Google, chave do PageSpeed, limites de uso, versão e verificação de atualização. A tela única de configurações de toda a instalação.
screen: Ayarlar
route: /settings
updated: 2026-10-22
---

Nesta página você vê onde gerenciar a conexão com o Google, a chave de velocidade e as atualizações.

**Ayarlar** (Configurações) é a tela de tudo o que diz respeito à instalação inteira. As configurações de cada projeto (nome, domínio, propriedade do Search Console e do Analytics) ficam na página **Proje ayarları** (Configurações do projeto) de cada projeto. Aqui você gerencia a chave de acesso necessária para se conectar ao Google, a chave do PageSpeed, o tema e a verificação de atualização. À esquerda há as seções **Görünüm** (Aparência), **Google**, **Hizmet hesabı** (Conta de serviço), **Hız ölçümü** (Medição de velocidade), **Sınırlar** (Limites), **Hakkında** (Sobre) e **Sürüm notları** (Notas de versão). O título de cada seção tem um selo que indica o estado dela.

## O que há na tela

**Görünüm** (Aparência). Para **Tema** (Tema) há as opções Sistem (Sistema), Açık (Claro) e Koyu (Escuro). Sua escolha fica guardada neste navegador. Em outro navegador ou em outro computador, você escolhe de novo.

**Google.** O selo tem um de três valores: **Kayıtlı** (Salvo), **Ortamdan geliyor** (Vem do ambiente; em uma instalação Docker, foi informado pelo arquivo `.env`) ou **Eksik** (Ausente). A seção mostra os dois endereços de redirecionamento que você vai adicionar no Google Cloud Console (o painel de desenvolvedores do Google). Há botões de copiar ao lado deles. Você precisa adicionar os dois. Se não adicionar o endereço do Analytics, só o Search Console se conecta.

Campos: **İstemci kimliği** (ID do cliente) e **Gizli anahtar** (Chave secreta). Ambos são detalhes da chave de acesso que você obtém do Google. Botões: **Kaydet** (Salvar), **Vazgeç** (Cancelar), **Değiştir** (Alterar) e **Sil** (Excluir). **Sil** corta as conexões existentes. A configuração passo a passo está no guia da conexão com o Google.

**Hizmet hesabı** (Conta de serviço; o caminho mais curto). Uma conta de serviço é uma conta de robô criada no Google para o aplicativo. No campo **JSON anahtar dosyası** (Arquivo de chave JSON), você cola o conteúdo do arquivo que baixou do Google Cloud. Se uma estiver salva, o endereço de e-mail da conta aparece. A tela informa onde adicionar esse endereço:

- Search Console: "Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle" (Configurações → Usuários e permissões → Adicionar usuário), permissão Full.
- Analytics: "Yönetici → Erişim yönetimi" (Administrador → Gerenciamento de acesso), permissão Viewer.

O selo diz **Kayıtlı** (Salvo) ou **Kullanılmıyor** (Não utilizada). Uma conta de serviço salva tem preferência sobre a chave de acesso do Google. Excluir remove a conta do aplicativo, mas não cancela a chave no Google.

**Hız ölçümü** (Medição de velocidade). Há um campo **API anahtarı** (Chave de API) e um botão **Anahtarı test et** (Testar a chave). O teste "1 ölçüm harcar" (gasta 1 medição), e você pode clicar uma vez a cada dez segundos. O selo diz **Anahtar kayıtlı** (Chave salva), **Ortam anahtarı** (Chave do ambiente) ou **Anahtar eksik** (Chave ausente). Os detalhes estão no guia da chave do PageSpeed.

**Sınırlar** (Limites). Os cartões "Google ve sistem sınırları" (Limites do Google e do sistema) mostram o seguinte:

- URL Inspection (Search Console): 2.000 por dia.
- PageSpeed Insights.
- Unidades de cota diária e horária do GA4 (Google Analytics): 200.000 e 40.000 por padrão. O Google não publica esse número. Ele só informa quanto resta.
- Limite de páginas da auditoria: 10.000.
- Relatórios por projeto: 10.000; modelos: 10.
- Maior relatório: 500.000 bytes.

O estado de cada cartão é **Yeterli** (Suficiente), **Azalıyor** (Acabando, depois de 70 por cento), **Neredeyse doldu** (Quase cheio, depois de 90 por cento) ou **Bilinmiyor** (Desconhecido).

**Hakkında** (Sobre). A linha **Sürüm** (Versão) mostra a versão (como v2.3.0). A chave **Güncellemeleri kontrol et** (Verificar atualizações) vem ligada por padrão. Quando está ligada, o aplicativo pergunta ao GitHub a versão mais recente no máximo uma vez por dia. Nesse caso, o botão **Şimdi kontrol et** (Verificar agora) também aparece. Se houver uma versão nova, aparece um link **Değişiklikler** (Alterações) e, para instalações Docker, um comando para copiar: `git pull && docker compose up -d --build`. Para o pacote Windows, ele aponta para **Güncelle** (Atualizar) no ícone da barra de tarefas. Se a atualização automática estiver ligada, a versão nova se instala sozinha.

**Sürüm notları** (Notas de versão). Lista o que mudou em cada versão.

## Como usar

1. Na primeira configuração, informe primeiro o ID do cliente e a chave secreta na seção **Google**. Depois informe a chave do PageSpeed na seção **Hız ölçümü** (Medição de velocidade). Quando as duas estiverem salvas, vá ao projeto e escolha a propriedade.
2. Uma vez por mês, olhe a seção **Sınırlar** (Limites). A cota que você vê como "Azalıyor" (Acabando) costuma ser o limite de URL Inspection.
3. Se houver uma versão nova na seção **Hakkında** (Sobre), atualize. As notas de versão dizem o que mudou. A verificação de atualização é a única conexão do seu computador com algum lugar que não seja o Google. Se você não a quiser, desligue a chave.
4. Se precisar trocar a chave de acesso do Google (por exemplo, um novo projeto do Cloud), clique em **Değiştir** (Alterar) e cole os valores novos. As conexões existentes não funcionam com a chave nova. Nos projetos, você precisa escolher **Yeniden bağlan** (Reconectar).

## Perguntas frequentes

**Por que não vejo a minha chave secreta na tela?** O aplicativo a guarda criptografada e não a envia de volta ao navegador. A tela mostra apenas que ela está salva, e o ID.

**E se o valor que informei no `.env` no Docker e o que digitei na tela entrarem em conflito?** O digitado na tela vence. Se você salvar um valor enquanto o selo diz "Ortamdan geliyor" (Vem do ambiente), esse passa a ser usado daí em diante.

**O que a verificação de atualização envia?** Não envia nenhum dado. Lê a lista pública de versões do GitHub. A solicitação é anônima.

**Conta de serviço ou chave de acesso do Google?** Uma conta de serviço dispensa a tela de consentimento e não expira. Em troca, você precisa dar permissão a essa conta à mão no Search Console e no Analytics. Em uma instalação de uma só pessoa, qualquer uma serve. Se você vê com frequência "süresi doldu" (expirou), passe para uma conta de serviço.

## Limites

A tela **Ayarlar** (Configurações) não altera o número da porta, a pasta de dados nem as configurações de rede. Isso fica em `config.json` no pacote Windows e no arquivo `.env` no Docker. Não há gerenciamento de usuário e senha, porque o aplicativo é de um só usuário. Os cartões de cota são a contagem do próprio aplicativo, não o contador real do Google. As inspeções de URL que você faz à mão no Search Console não aparecem aqui, mas gastam o limite do Google.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
