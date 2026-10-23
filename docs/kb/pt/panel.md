---
title: Painel
description: A primeira tela que você vê ao abrir um projeto. Os números de busca dos últimos 28 dias, o resumo da última auditoria e as suas tarefas, tudo em um só lugar.
screen: Panel
route: /p/<proje>
updated: 2026-10-22
---

Nesta tela você vê o estado mais recente do seu site e descobre o que fazer a seguir. É a primeira tela que aparece quando você abre um projeto.

Os números de busca vêm da ferramenta Search Console, do Google. Os números de visitantes vêm do Google Analytics. O resumo da auditoria vem do rastreador de sites do próprio aplicativo. O botão **Yenile** (Atualizar), no alto, atualiza tudo isso. **Denetimi başlat** (Iniciar auditoria) leva você à tela de auditoria.

## O que há na tela

**Quatro cartões de números.** **Tıklama** (Cliques), **Gösterim** (Impressões), **Tıklama oranı** (Taxa de cliques) e **Ortalama sıra** (Posição média). Todos mostram os últimos 28 dias. Cada cartão tem uma seta que compara com os 28 dias anteriores. Na posição média, um número pequeno é bom, e 1 é a primeira posição. Portanto, se o número cai, é uma boa notícia, e a seta tem a cor correspondente. Se o Search Console não estiver conectado, o cartão diz "Search Console'u bağlayın" (Conecte o Search Console).

**Sıradaki adımlar** (Próximos passos). Até três tarefas que o aplicativo sugere. As sugestões vêm nesta ordem:

- Se o Search Console não estiver conectado, **Search Console'u bağla** (Conectar o Search Console).
- Se não houver auditoria, ou se a última tiver mais de sete dias, **Denetimi başlat**.
- Se houver um problema grave, **Kritik sorunları gör** (Ver os problemas críticos).
- Depois, **Fırsatları aç** (Abrir as oportunidades) e **Uyarıları gör** (Ver os avisos).

Quando uma tarefa é concluída, o item sai da lista.

**Novidades da última auditoria e Düzelenler (Corrigidos).** Compara as duas últimas auditorias. Você vê qual problema apareceu em quantas páginas e qual diminuiu. Se nada foi corrigido, aparece "Düzelen sorun yok." (Nenhum problema corrigido.).

**Tıklama eğilimi** (Tendência de cliques). A linha diária de cliques dos últimos 28 dias. Se houver dados de menos de quatro dias, nenhuma linha é desenhada. O link **Sorguları aç** (Abrir as consultas) leva à tela Arama performansı (Desempenho de busca).

**Sıra 5-20 arası sorgular** (Consultas nas posições 5 a 20). As quatro primeiras buscas que aparecem entre as posições 5 e 20 no Google. Com um pouco de trabalho, elas podem chegar à primeira página. **Tümünü gör** (Ver tudo) abre a lista completa.

Cartão **Site denetimi** (Auditoria do site). Mostra quantas páginas foram rastreadas, os três problemas mais comuns e as cinco páginas com mais problemas. Enquanto uma auditoria está em andamento, o cartão se atualiza a cada cinco segundos. O ícone de ponto de interrogação explica os três níveis de gravidade:

- Crítico: prejudica diretamente a sua presença na busca.
- Aviso: desgasta as posições com o tempo, mas não é urgente.
- Informação: pequenas oportunidades de melhoria.

Cartão **Organik trafik** (Tráfego orgânico). Aparece se o Google Analytics estiver conectado. Para os visitantes que vieram da busca, mostra **Oturum** (Sessões), **Aktif kullanıcı** (Usuários ativos), **Etkileşim oranı** (Taxa de engajamento) e **Anahtar olay** (Eventos-chave). Se o site mede vendas, são acrescentados também **Organik gelir** (Receita orgânica) e **Sipariş** (Pedidos).

## Como usar

1. Abra uma vez por semana e olhe as setas dos quatro cartões.
2. Faça a primeira tarefa da lista **Sıradaki adımlar**. Se a lista estiver vazia, não há nada urgente.
3. Se a última auditoria tiver mais de sete dias, clique em **Denetimi başlat**.
4. Revise o título e a descrição das páginas no cartão **Sıra 5-20 arası sorgular**. Os ganhos mais fáceis costumam estar aqui.

## Como os números são calculados

Os quatro cartões vêm de um único relatório do Search Console. O Google entrega os dados com três dias de atraso. Por isso, o período de 28 dias termina três dias atrás, não hoje. O período anterior são os 28 dias imediatamente antes desse intervalo. Se o período anterior for zero, nenhuma seta é mostrada.

A posição média dá mais peso às buscas com muitas impressões. Esses quatro números são os totais reais do site. Se você somar as linhas da tabela na tela Arama performansı, obtém um número maior. O Google conta separadamente cada página que aparece na mesma busca.

## Perguntas frequentes

**Por que não há dados de hoje?** O Google ainda não entrega os últimos três dias. Isso não é uma falha.

**A posição média subiu. Isso é bom?** Não. Passar de 3 para 7 significa cair. Por isso a seta fica vermelha.

**O cartão da auditoria mostra o que o Google vê?** Não. Mostra o que o rastreamento do próprio aplicativo encontrou. Quais páginas o Google registrou está na aba **Dizin durumu** (Status de indexação) da tela de auditoria.

**Não há o cartão Organik trafik.** O Google Analytics não está conectado nas configurações do projeto. Conectá-lo é opcional.

## Limites

O Painel não mostra volume de busca, backlinks (links de outros sites para você) nem posições de concorrentes. Esses dados não estão no aplicativo. As consultas pesquisadas muito raramente ficam ocultas no Search Console. Para os detalhes, vá à tela correspondente.

<!-- Kaynaklar: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/server/features/gsc/searchPerformanceReport.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
