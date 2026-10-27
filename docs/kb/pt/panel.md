---
title: Painel
description: A primeira tela que você vê ao abrir um projeto. Os números de busca dos últimos 28 dias, o estado da configuração, as suas tarefas e o resumo da última auditoria, tudo em um só lugar.
screen: Panel
route: /p/<proje>
updated: 2026-10-27
---

Esta é a primeira tela de um projeto. Ela mostra o estado atual do seu site e o que fazer em seguida.

Os números de busca vêm do Google Search Console. Os números de visitantes vêm do Google Analytics. O resumo da auditoria vem do rastreador de sites do próprio aplicativo. O botão **Atualizar** no alto atualiza tudo. Se o projeto tem pelo menos uma auditoria, aparece ao lado o botão **Iniciar auditoria**, que leva à tela da auditoria. Abaixo do título fica o domínio do projeto.

## O que há na tela

**Quatro cartões de números.** **Cliques**, **Impressões**, **CTR** e **Posição média** cobrem os últimos 28 dias. Cada cartão tem uma seta em relação aos 28 dias anteriores. Na posição média, um número pequeno é bom, porque 1 é o primeiro lugar. Por isso, se o número cai, a notícia é boa e a seta ganha a cor correspondente. Se o Search Console não estiver ligado, o cartão avisa que só mostra dados depois de conectado. Se estiver ligado mas não houve impressões no período, o cartão diz "Não há impressões neste período".

**Próximos passos.** Ao lado do título, um rótulo diz o estado da configuração: "Configuração 4 / 6" ou, quando tudo está feito, "Configuração concluída". São contados seis itens: Search Console, Analytics, uma auditoria recente, a descrição do projeto, a chave do PageSpeed e o agente de IA. Os mesmos seis itens estão na tela **Contexto do projeto**, então as duas telas mostram o mesmo número. Uma auditoria recente é uma auditoria do próprio site do projeto, concluída nos últimos sete dias. A auditoria de outro site não conta. O que falta é listado na linha "Falta na configuração: ..." e o link **Concluir** ao lado leva à tela Contexto do projeto. A configuração não diz nada sobre o site em si. É só uma lista de tarefas.

O aplicativo sugere no máximo três tarefas. A ordem é esta:

- Se o Search Console não estiver ligado: **Conectar o Search Console** (botão: **Conectar**). Se a chave de acesso do Google ainda não foi inserida, um aviso substitui esta linha: "Chave de acesso do Google ausente", com o botão **Insira a chave de acesso do Google em Configurações**.
- Se não houver auditoria: **Execute sua primeira auditoria** (botão: **Iniciar**). A lista termina aqui.
- Se a última auditoria falhou: **Executar a auditoria novamente** (botão: **Executar novamente**). Abaixo ficam a causa, se o defeito está no site ou no aplicativo, e o que fazer. Se uma auditoria estiver em execução: **Auditoria em andamento** (botão: **Ver progresso**).
- Se houver problemas críticos: "N problemas críticos" (botão: **Visualizar**).
- Se o Search Console estiver ligado: **Revisar oportunidades** (botão: **Abrir**).
- Se a última auditoria tiver mais de sete dias: **Atualizar a auditoria** (botão: **Iniciar**).
- Se houver avisos: "N avisos" (botão: **Visualizar**).

Quando uma tarefa é concluída, ela sai da lista. Se a lista estiver vazia, aparece "Nada urgente. A auditoria está atualizada e não há problemas críticos."

**Novidades na última auditoria** e **Corrigido**. Este cartão só aparece quando tem algo a dizer. Se a última auditoria tiver mais de sete dias, ele diz quantos dias se passaram e oferece o botão **Iniciar auditoria**. Se os problemas mudaram entre as duas últimas auditorias, aparecem duas listas. **Novidades na última auditoria** mostra quais problemas foram vistos pela primeira vez, **Corrigido** quais foram fechados. Se nada foi corrigido, o cartão avisa que nenhum problema foi corrigido. Se não houver nem um nem outro, o cartão nem aparece.

**Tendência de cliques.** Uma linha com os cliques diários dos últimos 28 dias. Ela traz o total, a variação em relação ao período anterior e o dia de pico. Com menos de quatro dias de dados, nenhuma linha é desenhada. O link abaixo do gráfico abre a tela **Desempenho da pesquisa**.

**Consultas perto das três primeiras posições.** Aqui ficam as pesquisas com posição média entre 4 e 20 e impressões suficientes. O cartão diz quantos cliques a mais elas poderiam trazer juntas se cada uma subisse um degrau. É um limite superior. Cada linha mostra a posição da pesquisa e o ganho possível. Um clique numa linha abre essa pesquisa na tela Desempenho da pesquisa. **Ver tudo** abre a guia Oportunidades de posição da tela Desempenho da pesquisa. Se nenhuma pesquisa tiver impressões suficientes, o cartão avisa.

**Cartão Auditoria do site.** Mostra quantas páginas foram rastreadas e em que data, os problemas mais comuns e as páginas com mais problemas. Enquanto uma auditoria está em execução, ele diz que a auditoria está em execução e que os resultados aparecem quando ela termina, e o cartão se atualiza a cada cinco segundos. Se a auditoria não pôde ser concluída, ele diz que por isso não há resultados. Se nenhum problema foi encontrado, diz que o seu site parece íntegro. Abaixo dos problemas, uma barra mostra os níveis de gravidade. O ponto de interrogação explica os três níveis: problemas críticos podem impedir uma página de aparecer na pesquisa, avisos corroem a posição com o tempo, informações são pequenas melhorias. Um clique na barra ou num dos rótulos abaixo leva à lista de problemas. No fim fica a lista **Páginas com mais problemas**. Se não houver auditoria, este cartão não aparece, porque "Próximos passos" já sugere a primeira auditoria. **Detalhes** abre a guia de páginas com problemas da auditoria.

**Cartão de tráfego orgânico.** Aparece se o Google Analytics estiver ligado. Para os visitantes que vieram da pesquisa, mostra **Sessões**, **Usuários ativos**, **Taxa de engajamento** e **Eventos principais**. Se o site mede vendas, entram também a receita orgânica e as **Transações**. No alto do cartão, **Relatórios** abre a tela do Analytics e **Gerenciar** as configurações de conexão do Analytics. Uma nota no fim diz que o Analytics chega com 1 dia de atraso e o Search Console com 3. Por isso os dias deste cartão diferem dos quadros de cliques do alto. Se o Analytics não estiver ligado, um convite para conectar ocupa o lugar do cartão. Se você o fechar, ele não volta.

Se o cartão não consegue ler os dados, ele mostra uma frase com a causa e a solução e oferece dois botões: **Corrigir a conexão** (abre as configurações do Analytics) e **Tentar novamente**. As causas principais são estas:

- A conexão expirou ou foi revogada. Conecte de novo em **Configurações**.
- A conta conectada não alcança mais a propriedade. Dê à conta ou à conta de serviço pelo menos a função de Leitor na propriedade.
- A propriedade foi excluída ou movida. Escolha-a de novo em **Configurações**.
- Nenhuma propriedade do Analytics está conectada a este projeto. Escolha uma em **Configurações**.
- A cota de relatórios acabou. A cota se renova a cada hora e a cada dia, tente mais tarde.
- A Google Analytics Data API está desativada no seu projeto do Google Cloud. Ative "Google Analytics Data API" no Google Cloud Console.
- Não foi possível alcançar o Google. Veja a conexão de internet deste computador.
- O Google não está respondendo no momento. Tente de novo daqui a pouco.

Se o cartão não tem sessões orgânicas, diz que nenhum tráfego de pesquisa orgânica foi registrado neste intervalo. Não há nada errado. Naquele período não houve visitas vindas da pesquisa.

**Configure seu espaço de trabalho.** No fim da página, as etapas de configuração a fazer ficam em uma caixa fechada. As etapas: adicionar o seu site, adicionar os seus outros sites, conectar o seu agente de IA, conectar o Search Console e descrever o projeto. Aparece "N etapas restantes. Tudo é opcional". Você adia uma etapa com **Pular por enquanto**. As etapas adiadas e as concluídas são contadas abaixo da caixa, e **Restaurar** as traz de volta. Quando tudo estiver feito, a caixa desaparece.

## Como usar

1. Abra uma vez por semana e olhe as setas dos quatro cartões.
2. Faça a primeira tarefa da caixa **Próximos passos**. Se a caixa estiver vazia, não há nada urgente.
3. Se o rótulo da configuração mostrar algo faltando, clique em **Concluir**. Os itens que faltam se resolvem rápido.
4. Se a última auditoria tiver mais de sete dias, clique em **Iniciar auditoria**.
5. Reveja o título e a descrição das páginas do cartão **Consultas perto das três primeiras posições**. O ganho mais fácil costuma estar aqui.
6. Se o cartão **Novidades na última auditoria** e **Corrigido** aparecer, dê prioridade aos problemas vistos pela primeira vez. Você vê a mudança de uma semana de relance.

## Como os números são calculados

Os quatro cartões vêm de um único relatório do Search Console. O Google entrega os dados com três dias de atraso. Por isso o intervalo de 28 dias não termina hoje, e sim três dias antes. O período anterior são os 28 dias logo antes deste intervalo. Se o período anterior for zero, a seta não é mostrada.

Na posição média, as pesquisas com muitas impressões pesam mais. Esses quatro números são os totais reais do site. Se você somar as linhas da tabela da tela **Desempenho da pesquisa**, vai achar um número maior, porque o Google conta separadamente cada página que aparece para a mesma pesquisa.

O ganho do cartão **Consultas perto das três primeiras posições** é um limite superior. São os cliques a mais que cada pesquisa teria se subisse um degrau. O mesmo cálculo vale na tela Oportunidades. As duas telas dão o mesmo número.

O rótulo da configuração é um número, não uma porcentagem nem uma pontuação. Ele mostra quantos dos seis itens estão feitos.

## Perguntas frequentes

**Por que não há dados de hoje?** O Google ainda não entregou os últimos três dias. Isso não é uma falha.

**A posição média aumentou. Isso é bom?** Não. Passar de 3 para 7 é uma queda. Por isso a seta fica vermelha.

**O cartão da auditoria mostra o que o Google vê?** Não. Ele mostra o que o rastreamento do próprio aplicativo encontrou. Quais páginas o Google indexou aparece na guia **Status de indexação** da tela da auditoria.

**Não há o cartão de tráfego orgânico.** O Google Analytics não está ligado nas configurações do projeto, ou você fechou o cartão. Conectá-lo é opcional.

**Por que a configuração diz 5 / 6 se achei que tinha feito tudo?** A linha "Falta na configuração" diz qual item falta. Quase sempre é uma chave do PageSpeed ou uma auditoria dos últimos sete dias.

**O cartão do Analytics mostra um erro.** A frase no cartão diz a causa. Quase sempre basta renovar a conexão em **Configurações**.

## Limites

O painel não mostra volume de pesquisa, backlinks (links que chegam de outros sites até você) nem posições de concorrentes. Esses dados não existem no aplicativo. O Search Console oculta as consultas pesquisadas muito raramente. Para ver os detalhes, passe para a tela correspondente.

<!-- Fontes: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; Ga4ConnectCard.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; DashboardOnboarding.tsx; dashboardSteps.ts; GoogleSetupBanner.tsx; src/client/features/projects/projectSetupQuery.ts; src/shared/projectSetup.ts; src/server/lib/errors.ts; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
