---
title: Ajuda
description: O cartão de estado da instalação, as ações rápidas, os problemas comuns e o pacote de diagnóstico que você envia ao relatar um problema.
screen: Yardım
route: /support
updated: 2026-10-27
---

A interface do aplicativo existe em seis idiomas: turco, inglês, alemão, francês, italiano e português. O idioma é escolhido em Configurações → Aparência → Idioma. Este guia mostra botões e telas com o nome que eles têm na interface em português. O menu da bandeja do Windows só existe em turco. Ali o nome em turco vem com o significado em português entre parênteses.

Este é o primeiro lugar a olhar quando algo dá errado. A tela confere a sua instalação, diz o que está faltando e leva você à configuração certa.

## O que há na tela

**Ações rápidas**. Os botões no alto:

- **Verificar o status novamente**: atualiza o cartão abaixo.
- **Baixar pacote de diagnóstico**: baixa o arquivo que você envia ao relatar um problema. Ele não contém nenhum valor secreto.
- **Abrir guia**: abre o guia no seowatcher.io.
- **seowatcher.io**: abre o site do aplicativo, onde ficam a página de download e o guia.
- **Notas de versão**: abre a tela dedicada às notas de versão (`/release-notes`).
- **Configuração do agente**: vai à tela de conexão do assistente.

**Status do app.** O cartão verifica acesso, configurações da conexão Google, chave do PageSpeed, ambiente de execução e banco de dados desta instalação. Uma verificação bem-sucedida não garante um site sem erros nem dados Google atualizados. Configurações não lidas não são consideradas verificadas. Leia o aviso e use **Verificar o status novamente**. A versão e a hora da verificação identificam o resultado. **Copiar resumo** copia esse estado como texto; **Abrir conexões** leva às conexões do projeto.

**Aviso sobre o número da porta.** Se o pacote do Windows abrir em outro número de porta porque outro programa ocupa a 3001 (por exemplo, uma cópia antiga do Docker), aparece uma faixa amarela no alto de todas as telas do aplicativo: "Desta vez o seowatcher está rodando em 3002 porque outro programa está usando 3001 (por exemplo, uma cópia antiga do Docker). O login do Google está configurado para 3001; feche esse programa e reinicie o seowatcher." A faixa existe caso você tenha perdido a notificação da barra de tarefas. O login do Google volta ao endereço 3001 e falha se você abriu o aplicativo em 3002. O botão de fechar à direita da faixa a esconde nesta aba. A mesma frase também está escrita no cartão **Status do app**. Para resolver, feche o programa que ocupa a 3001 e escolha **Yeniden başlat** (Reiniciar) no menu da bandeja. O aplicativo volta para a 3001 e a faixa some. Se nenhum outro programa a usa, o aplicativo volta para a 3001 na próxima abertura de qualquer jeito.

**Projetos**. O estado da conexão de cada projeto com o Search Console e o Analytics. O botão **Abrir conexões** leva às configurações do projeto.

**Problemas comuns.** Seis títulos recolhíveis: a página não abre ou o aplicativo não está em execução, a porta está em uso, o meu agente não consegue se conectar (401), a medição de velocidade para no meio (429), a falta de dados de consultas e mudei uma configuração e o app não reconhece. Cada um tem o que fazer e um link para a configuração correspondente.

**Limites do Google e do sistema**. Com **Mostrar limites**, você vê o estado atual dos limites diários do Google.

**Lista no fim.** Atalhos para os arquivos de registro e para o endereço de verificação de saúde (`/api/health`). No pacote Windows, os registros abrem com **Günlükleri aç** (Abrir os registros) no menu da barra de tarefas. No Docker, use o comando dado por **Copiar comando**.

## Como usar

1. Se algo não funciona, abra esta tela primeiro e leia o aviso do cartão.
2. Clique no botão ao lado do aviso. Ele leva você à configuração certa. Faça a mudança, volte e clique em **Verificar o status novamente**.
3. Se as verificações da instalação passarem, mas o problema continuar, consulte **Problemas comuns** e a tela do projeto correspondente.
4. Se ainda não resolver, clique em **Baixar pacote de diagnóstico** e anexe o arquivo ao relato no GitHub. No pacote Windows, **Sorunu bildir (GitHub)** (Relatar um problema no GitHub), no menu da barra de tarefas, faz o mesmo com um clique.

## Perguntas frequentes

**Por que a linha "Login no Google" está amarela?** Nenhuma chave de acesso do Google foi informada ainda. A linha fica amarela até que o Google seja conectado. Siga o guia para conectar ao Google.

**A linha "Login e acesso" diz "um só usuário, sem senha".** Isso é normal. O aplicativo abre apenas a partir do seu próprio computador. Se você quiser abri-lo para fora, precisa colocar na frente o seu próprio login protegido por senha.

**O que há no pacote de diagnóstico?** A versão, as verificações da instalação, as contagens das tabelas e os resumos de etapa e erro das últimas 25 auditorias. Os erros do PageSpeed são resumidos sem os URLs das páginas. Segredos e senhas são excluídos; nomes de projetos, domínios e IDs de propriedades Google podem aparecer. Revise os arquivos antes de enviá-los.

## Limites

A tela confere apenas a própria instalação. Para encontrar um problema no seu site, use Auditoria do site. Para ver um problema do lado do Google, use a tela Status de indexação.

## Qual tela usar?

O [Painel](/docs/panel/) resume a configuração e os dados do projeto selecionado. [Oportunidades](/docs/firsatlar/) ajuda a escolher ações a partir dos dados do Search Console. O [Acompanhamento de posições](/docs/siralama-takibi/) acompanha a posição média das palavras-chave salvas nos dados Google, não resultados de busca ao vivo. Se faltarem dados, confira as conexões do projeto, o período e os avisos de cobertura. O estado da instalação não valida esses relatórios.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/quotas/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
