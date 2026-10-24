---
title: Ajuda
description: O cartão de estado da instalação, as ações rápidas, os problemas comuns e o pacote de diagnóstico que você envia ao relatar um problema.
screen: Yardım
route: /support
updated: 2026-10-22
---

A interface do aplicativo está disponível em turco e inglês. O idioma é escolhido em Ayarlar → Görünüm → Dil. Este guia mostra cada botão e cada nome de tela em turco, com o significado em português entre parênteses.

Este é o primeiro lugar a olhar quando algo dá errado. A tela confere a sua instalação, diz o que está faltando e leva você à configuração certa.

## O que há na tela

**Hızlı işlemler** (Ações rápidas). Os botões no alto:

- **Durumu yeniden kontrol et** (Verificar o estado de novo): atualiza o cartão abaixo.
- **Tanılama paketi indir** (Baixar o pacote de diagnóstico): baixa o arquivo que você envia ao relatar um problema. Ele não contém nenhum valor secreto.
- **Kılavuzu aç** (Abrir o guia): abre o guia no seowatcher.io.
- **seowatcher.io**: abre o site do aplicativo, onde ficam a página de download e o guia.
- **Sürüm notları** (Notas de versão): vai às notas de versão em Ayarlar (Configurações).
- **Kurulum istemini kopyala** (Copiar o prompt de instalação): copia o texto de configuração que você cola no seu assistente de IA (chamado de "agente" no aplicativo).
- **Ajan kurulumu** (Configuração do agente): vai à tela de conexão do assistente.

**Kurulumunuzun durumu** (Estado da sua instalação). O cartão confere quatro coisas: **Giriş ve erişim** (Login e acesso), **Google girişi** (Login do Google), **PageSpeed anahtarı** (Chave do PageSpeed) e **Veritabanı** (Banco de dados). No alto, diz "Her şey yolunda." (Está tudo certo.) ou "N şey dikkat istiyor." (N coisas pedem atenção.). Abaixo você vê a linha da versão ("Sürüm X, güncel." (Versão X, atualizada.) ou "yeni sürüm Y var" (há uma versão nova, Y)) e a hora da última verificação. Ao lado de uma linha com problema, aparece um botão que leva à configuração certa: **Ayarları aç** (Abrir as configurações) ou **Anahtar gir** (Informar a chave). **Özeti kopyala** (Copiar o resumo) coloca o texto do cartão na área de transferência.

**Projeler** (Projetos). O estado da conexão de cada projeto com o Search Console e o Analytics. O botão **Bağlantıları aç** (Abrir as conexões) leva às configurações do projeto.

**Sık sorunlar** (Problemas comuns). Cinco títulos recolhíveis: a página não abre, o número da porta está em uso, o assistente não consegue se conectar (401), o limite do PageSpeed e a falta de dados de consultas. Cada um tem o que fazer e um link para a configuração correspondente.

**Google ve sistem sınırları** (Limites do Google e do sistema). Com **Sınırları göster** (Mostrar os limites), você vê o estado atual dos limites diários do Google.

**Lista no fim.** Atalhos para os arquivos de registro e para o endereço de verificação de saúde (`/api/health`). No pacote Windows, os registros abrem com **Günlükleri aç** (Abrir os registros) no menu da barra de tarefas. No Docker, use o comando dado por **Komutu kopyala** (Copiar o comando).

## Como usar

1. Se algo não funciona, abra esta tela primeiro e leia o aviso do cartão.
2. Clique no botão ao lado do aviso. Ele leva você à configuração certa. Faça a mudança, volte e clique em **Durumu yeniden kontrol et**.
3. Se o cartão disser "Her şey yolunda." mas o problema continuar, olhe os títulos de **Sık sorunlar**.
4. Se ainda não resolver, clique em **Tanılama paketi indir** e anexe o arquivo ao relato no GitHub. No pacote Windows, **Sorunu bildir (GitHub)** (Relatar um problema no GitHub), no menu da barra de tarefas, faz o mesmo com um clique.

## Perguntas frequentes

**Por que a linha "Google girişi" está amarela?** Nenhuma chave de acesso do Google foi informada ainda. A linha fica amarela até que o Google seja conectado. Siga o guia para conectar ao Google.

**A linha "Giriş ve erişim" diz "parolasız tek kullanıcı" (um só usuário, sem senha).** Isso é normal. O aplicativo abre apenas a partir do seu próprio computador. Se você quiser abri-lo para fora, precisa colocar na frente o seu próprio login protegido por senha.

**O que há no pacote de diagnóstico?** A versão, as verificações da instalação, as contagens das tabelas e um resumo das últimas auditorias. Não tem chaves do Google, senhas nem dados pessoais.

## Limites

A tela confere apenas a própria instalação. Para encontrar um problema no seu site, use Site denetimi (Auditoria do site). Para ver um problema do lado do Google, use a tela Dizin durumu (Status de indexação).

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/support/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
