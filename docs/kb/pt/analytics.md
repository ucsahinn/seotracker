---
title: Analytics
description: Veja o que os visitantes que vêm da busca fazem depois. Relatórios do Google Analytics 4, eventos-chave e se a sua medição está funcionando direito.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-22
---

Nesta tela você vê o que fazem as pessoas que chegam ao seu site. O Search Console diz o que acontece no Google. O Analytics diz o que o visitante faz no seu site.

A tela mostra sete relatórios da sua conta do Google Analytics 4. Por padrão, ela filtra apenas os visitantes que vieram da busca (busca orgânica). A oitava aba verifica a própria medição: o contador está funcionando? Há um evento-chave definido?

## O que há na tela

**Abas.** **Páginas de destino**, **Páginas e telas**, **Aquisição de tráfego**, **Eventos principais**, **E-commerce**, **Pesquisa no site**, **Público** e **Status da medição**. Uma pergunta curta aparece sob cada aba. Uma página de entrada é a primeira página em que um visitante entra no seu site. Um evento-chave é uma ação que você conta como importante.

**Controles.** **Período**: Son 7 gün, Son 28 gün, Son 3 ay (últimos 7 dias, últimos 28 dias, últimos 3 meses). **Canal**: Organik arama (Busca orgânica) (padrão) ou Tüm trafik (Todo o tráfego). **Linhas**: 50, 100, 200. Na aba de público, você escolhe **Dispositivo**, **País**, **Novos / recorrentes**. Na aba de tráfego, você escolhe **Grupo de canais**, **Origem / meio**, **Campanha**. Suas escolhas são gravadas na barra de endereços.

**Painel de sessões orgânicas.** Na aba de páginas de entrada, fica acima da tabela. Uma sessão é uma visita inteira. O painel tem uma linha diária de sessões e os cartões **Sessões** e **Taxa de engajamento**. Se a receita for medida, **Receita orgânica** também aparece. Todos mostram a variação em relação ao período anterior.

**Tabela.** As colunas mudam conforme o relatório. Exemplos: **Domínio**, **Página de destino**, **Página**, **Nome do evento**, **Canal**, **Dispositivo**, **País**, **Item**, **Termo de pesquisa**. Medidas: **Sessões**, **Usuários ativos**, **Taxa de engajamento**, **Eventos principais**, **Receita**, **Visualizações**. Se nenhum evento-chave estiver definido, mostra sempre 0.

**Linha sob a tabela.** Informa quantas linhas são mostradas. Se o Google amostrou os dados, acrescenta "amostradas". Se ele ocultou linhas por privacidade, acrescenta "linhas abaixo dos limites ocultas".

**Filtros rápidos.** **Somente orgânico**, **Engajamento baixo** (abaixo de 50%), **Com conversões**, **Com receita**, **Baixo tempo de engajamento**, **Alto tráfego, baixa conversão**.

**Cartões de resumo.** As abas de eventos-chave, comércio eletrônico e busca no site têm seus próprios cartões de resumo.

**Aba de estado da medição.** Quatro cartões: **Fluxos de dados da Web**, **Eventos principais**, **Dimensões personalizadas**, **Descobertas**. Os achados possíveis são: "Nenhum fluxo de dados da Web", "Medição aprimorada desativada", "A pesquisa no site não é medida", "Nenhum evento principal configurado", "O inventário pode estar incompleto". As sete opções da medição aprimorada são mostradas uma a uma: Rolagens, Cliques de saída, Pesquisa no site, Vídeo, Downloads de arquivos, Form, Alterações de página. Se não houver problema, aparece "Nada está faltando na configuração de medição."

**Estados vazios.** Aparece "Nenhum dado neste período" e são oferecidos dois atalhos: **Ver todo o tráfego**, **Verificar o status da medição**. Se o Analytics não estiver conectado, aparece "O Google Analytics não está conectado".

## Como usar

1. Olhe primeiro a aba **Status da medição**. Se ela disser "Nenhum evento principal configurado", as colunas de conversão ficam em zero. Primeiro defina um evento-chave no Analytics.
2. Na aba **Páginas de destino**, olhe a coluna **Domínio**. Se você vir localhost ou 127.0.0.1, um site de teste no seu próprio computador está enviando dados. Essas linhas não são visitas reais. O aplicativo não filtra isso para você.
3. Se o tráfego caiu, abra a aba **Aquisição de tráfego** com **Grupo de canais**. Se a queda for só na busca, o problema está na busca. Se caiu em todos os canais, há um problema na medição ou no site.
4. O botão **Alto tráfego, baixa conversão** mostra as páginas para as quais o Google envia visitantes, mas que não os retêm. O trabalho a fazer está na tela Oportunidades.

## Como os números são calculados

O período termina ontem, no fuso horário da conta. O Analytics entrega os dados com um dia de atraso. Se "Pesquisa orgânica" estiver escolhido, só são contadas as visitas vindas do Google ou de outro mecanismo de busca.

Cada relatório pede no máximo 200 linhas. O estado da medição lê as configurações do Analytics e não gasta da cota de relatórios. Se a cota de relatórios acabar, você vê o erro "Google Analytics reporting quota is exhausted." (a cota de relatórios do Analytics foi usada por completo). As cotas são acompanhadas na seção de limites em **Configurações**.

## Perguntas frequentes

**Por que o número de sessões é diferente dos cliques do Search Console?** Os dois contam coisas diferentes. O Search Console conta cliques no Google. O Analytics conta sessões que chegam ao site. Um visitante que não dá consentimento aos cookies nunca chega ao Analytics.

**O número de linhas fica em 200.** São pedidas no máximo 200 linhas por vez. Encurte o período ou mude o detalhamento.

**Por que a cota acabou?** Uma conta padrão recebe 200.000 tokens (unidades de cota) por dia e 40.000 por hora. Cada relatório gasta alguns tokens. Clicar em **Atualizar** repetidamente esgota a cota.

## Limites

O que o Analytics não mede, esta tela também não pode mostrar. Isso inclui visitas sem consentimento de cookies, eventos-chave não definidos e a medição aprimorada desativada. A tela não filtra sozinha o tráfego de localhost. O Analytics e o Search Console informam em fusos horários diferentes. As correspondências diárias podem se deslocar um dia.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
