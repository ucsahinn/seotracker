---
title: Desempenho da pesquisa
description: Você vê quantas vezes aparece no Google, quantos cliques recebe e o que corrigir primeiro. Os números vêm do Search Console. Os ganhos são um limite superior.
screen: Arama performansı
route: /p/<proje>/search-performance
updated: 2026-10-28
---

Aqui você vê quantas vezes aparece no Google, quantos cliques recebe e o que corrigir primeiro.

Cliques, impressões, CTR e posição vêm direto do Search Console. O aplicativo não estima nenhum deles. As estimativas só existem nos números de "ganho possível", e eles sempre vêm marcados como "limite superior".

Os filtros escolhidos são escritos na barra de endereço. Se quiser, compartilhe essa visão como link ou guarde nos favoritos.

## Três termos

**Dia definitivo.** O Search Console continua contando um dia por vários dias. Totais e comparações usam só os dias cuja contagem terminou. Os dias seguem o horário do Pacífico que o Google usa. Dias ainda em contagem aparecem tracejados no gráfico e não entram nos totais.

**Consulta oculta.** O Google não lista as consultas pesquisadas muito raramente, por privacidade. Mas soma os cliques delas ao total do site. Por isso a tabela de consultas dá menos que o total do site. A diferença são as consultas ocultas.

**Limite superior.** Um número de ganho significa "no máximo isso". São os cliques a mais que uma pesquisa teria se subisse um degrau, com as taxas de cliques do seu próprio site. O resultado real depende dos concorrentes e do Google e costuma ser menor.

## O que há na tela

**Barra superior.** No alto à direita há quatro coisas.

- **Atualizar**: pede dados novos ao Search Console. O aplicativo normalmente reaproveita uma resposta de alguns minutos atrás.
- **Baixar relatório**: transforma a visão mostrada em um relatório imprimível em um único arquivo, salva e baixa. O relatório também fica na tela **Relatórios**.
- O menu de exportação: **Consultas (CSV)**, **Páginas (CSV)**, **Consultas perto das três primeiras posições (CSV)**, **Exportar consultas para o Sheets**, **Exportar páginas para o Sheets**. As exportações seguem os filtros da tela. Se na guia Pesquisas ou Páginas houver uma busca ou um filtro rápido, ele também vai para o arquivo.

**Filtros.** Uma barra de uma linha resume os filtros escolhidos: "(Web, Todos os dispositivos, Todos os países, Últimos 28 dias, Em relação ao período anterior)". Abrindo-a, você vê: **Tipo de pesquisa** (Web, Imagem, Vídeo, Notícias), **Filtro de dispositivo** (Todos os dispositivos, Celular, Computador, Tablet), **Filtro de país** (os países que o Google informa para aquele período), **Período** (Últimos 7 dias, Últimos 28 dias, Últimos três meses) e **Comparação** (Em relação ao período anterior, Em relação ao ano passado, Sem comparação).

**Status dos dados.** Uma faixa que diz em que os números se apoiam. Por exemplo "Os dados são definitivos até 24 out.; os últimos 3 dias ainda estão sendo contados (tracejados no gráfico)." A mesma faixa diz com quais dias a comparação é feita e o nome da sua propriedade do Search Console. Um clique no nome leva às configurações de conexão do projeto. Se a comparação com o ano passado estiver escolhida e o Google já não fornecer esses dias, a faixa avisa (o Google volta no máximo 16 meses). Em **Sobre os dados**, você vê: a data dos dias definitivos, quantos dias ainda estão sendo contados e a data dos últimos dados, a parcela de cliques de consultas ocultas, se as tabelas foram lidas por inteiro (o Google devolve um número limitado de linhas por vez) e se esta visão enviou novas solicitações ao Google ou usou uma resposta tirada alguns minutos antes.

**Frase de resumo.** Uma ou duas frases acima dos quadros dizem o que aconteceu. Por exemplo "Os cliques subiram 6,1% nos últimos 28 dias em relação ao período anterior. O CTR caiu 0,3 ponto." Depois diz quantos cliques a mais os três primeiros trabalhos poderiam trazer juntos, com a marca "(limite superior)". O link **A fazer** leva a essa guia.

**Quatro quadros.** **Cliques**, **Impressões**, **CTR** (que porcentagem das impressões foi clicada) e **Posição média**. Todos são totais dos dias definitivos. Cada quadro mostra a variação em relação à comparação escolhida e uma linha pequena. A variação de cliques e impressões é escrita em porcentagem, a do CTR em pontos, a da posição em lugares. Na posição média, um número pequeno é bom, 1 é o primeiro lugar. A direção de uma variação é mostrada também por uma seta, além da cor.

**Gráfico Ao longo do tempo.** Ele desenha os valores diários.

- O seletor no alto à direita alterna entre quatro medidas: cliques, impressões, CTR e posição média. No gráfico da posição, o alto é a posição melhor.
- Os botões **Dia**, **Semana** e **Mês** mudam a unidade de tempo. A linha de comparação (tracejada) só aparece na visão por dia.
- A área tracejada são dias que o Google ainda está contando. Um ponto vazio indica um período incompleto ou ainda não definitivo.
- Marcadores numerados acima da linha mostram três coisas: atualizações de ranqueamento anunciadas pelo Google ("Atualização do Google"), os dias em que auditorias do site terminaram ("Auditoria do site concluída") e as suas próprias notas. Abaixo do gráfico, cada número é explicado.
- **Adicionar uma nota** deixa uma nota sua numa data, por exemplo "Novos títulos de páginas no ar". Uma nota tem no máximo 280 caracteres. Ajuda a lembrar depois o motivo de uma queda ou de uma alta. As notas fora do período escolhido ficam reunidas em "Notas fora deste período (N)".

**Faixa Comece por estas.** Entre o gráfico e as guias, os três primeiros trabalhos ficam lado a lado. Cada um tem título, ganho possível e um botão. **Todas as tarefas (N)** leva à guia A fazer.

**Guias.** São sete: **A fazer (N)**, **Consultas (N)**, **Páginas (N)**, **Oportunidades de posicionamento (N)**, **Variações**, **Sobreposições** e **Distribuição**. O número entre parênteses é a quantidade de linhas ou achados na guia. Se houver pesquisas ou páginas em queda, a guia diz "Variações (N em queda)". Ao trocar de guia, a caixa de busca e o filtro rápido são zerados.

### A fazer

O aplicativo ordena por ganho estimado os trabalhos que encontra nos dados do Search Console. Os trabalhos são agrupados por tipo, e o título de cada grupo diz quantos são:

- "N pesquisas perto das três primeiras": pesquisas com posição média entre 4 e 20 e impressões suficientes. As pesquisas de marca ficam fora desta lista. Reforce a página para essa pesquisa.
- "N resultados recebem poucos cliques para a posição": pesquisas clicadas menos que as outras pesquisas do seu site na mesma posição. Reescreva título e descrição.
- "Os cliques caíram em N pesquisas" e "Os cliques caíram em N páginas": uma queda nítida em relação ao período anterior. Se a posição também caiu, atualize o conteúdo. Se a posição se manteve, revise título e descrição.
- "N páginas estão perdendo força": páginas que no último trimestre caíram bem abaixo do melhor dos quatro trimestres anteriores. Renove a página.
- "N páginas aparecem, mas nunca são clicadas". Aqui a estimativa de ganho é conservadora: usa a taxa de cliques da faixa de posições abaixo da página, não a da própria faixa. Páginas da segunda página em diante não recebem estimativa.
- "Você não aparece mais em N pesquisas": pesquisas que tinham cliques no período anterior e agora nenhuma impressão.
- "Você fica para trás em N tipos de dispositivo" e "Você fica para trás em N países".
- "Quedas incomuns em N dias": os cliques ou as impressões daquele dia estavam incomumente baixos em relação ao mesmo dia da semana nas semanas anteriores.
- "Defina o nome da sua marca": aparece quando nenhum nome de marca foi definido, para separar as pesquisas de marca. Se o aplicativo as separa com nomes sugeridos a partir do seu domínio, a tarefa se chama "Confirmar o nome da marca". Confirme as sugestões se estiverem certas; se não, informe o nome da sua marca.

Sob o título de cada grupo, **Por quê e o que fazer** dá o motivo e o que fazer. Uma linha mostra o número de ordem, o achado, a evidência (por exemplo "Posição 8,2 · 640 impressões · 12 cliques"), o ganho possível escrito "≈ +N cliques" e uma etiqueta de confiança (**Confiança: alta**, média ou baixa). De cada grupo, os quatro primeiros trabalhos aparecem, e o resto abre com **Mostrar tudo (N)**.

Você marca um trabalho com **Feito**. Os trabalhos marcados vão para "Marcadas como feitas (N)" e voltam com **Restaurar**. As marcas de "feito" ficam guardadas só neste navegador. **Detalhes** (ou **Abrir esta divisão**) numa linha abre o detalhe dessa pesquisa, página, dispositivo ou país. Se houver vários trabalhos para a mesma pesquisa ou página, o total no alto conta uma vez só.

### Pesquisas e Páginas

Uma tabela por pesquisas ou por páginas. As colunas são **Consulta** (ou **Página**), **Cliques**, **Diferença de cliques** (em relação à comparação), **Impressões**, **CTR** e **Posição**. Clique no título para ordenar. A barra atrás de uma linha é a parcela dela nos cliques desta tabela. A caixa no alto procura entre as linhas. Ao lado, fica escrito "{mostradas} / {total} linhas".

**Filtros rápidos.** Para pesquisas: **Nos 10 primeiros**, **Posição 4-10**, **Posição 11-20**, **CTR baixa**, **Sem cliques**. Para páginas: **Nos 10 primeiros**, **Com cliques**, **CTR baixa**, **Sem cliques**. CTR baixa quer dizer uma linha na primeira página, com pelo menos 100 impressões e taxa de cliques abaixo de 2 por cento.

**Menu da linha.** Nos três pontos: **Abrir página em uma nova aba**, **Copiar URL**, **Copiar palavra-chave**, **Salvar como palavra-chave**. O que você salva vai para a tela de palavras-chave salvas. Clicar numa linha abre o painel de detalhes.

A nota abaixo da tabela diz a base: "lidas N consultas, N cliques. O total do site é de N cliques; a diferença vem das consultas que o Google oculta." Se o limite de linhas do Google foi atingido, a ponta menos clicada falta na lista e a nota avisa.

### Oportunidades de posição

São quatro seções.

- **Consultas perto das três primeiras posições.** Pesquisas com posição média entre 4 e 20. As pesquisas de marca não entram. Está escrito quantos cliques a mais elas poderiam trazer juntas se cada uma subisse um degrau (de 6-10 para 4-5, de 4-5 para 2-3, de 11-20 para a primeira página). É um limite superior. O total cobre todas as consultas dessa faixa, não só as linhas listadas, e vem seguido das datas a que se refere, por exemplo "Período: 27/09/2026 – 24/10/2026." Se só os maiores ganhos estiverem listados, uma nota abaixo diz "São listadas as N com maior ganho." A tabela mostra **Consulta**, **Página de destino**, **Posição**, **Impressões**, **Cliques** e **Ganho possível**. A página de destino é a que o Google mais mostra para essa pesquisa. As pesquisas selecionadas você leva com **Copiar palavras-chave** ou **Salvar como palavra-chave**.
- **Resultados com menos cliques do que a posição faria esperar.** Pesquisas cuja taxa de cliques fica abaixo de 70 por cento da taxa do seu site para resultados na mesma posição. O ganho vem sem mudar de posição, só reescrevendo título e descrição. A tabela mostra a taxa da pesquisa, a taxa **Esperado nesta posição** e o ganho possível.
- **Páginas que aparecem mas nunca são clicadas.** Páginas que no período tiveram pelo menos 100 impressões (para 28 dias) e nenhum clique.
- **CTR do seu site por posição.** A régua dos ganhos acima. É a taxa de cliques dos seus próprios resultados em cada posição, não a de outros sites. Se uma posição tem poucas pesquisas ou impressões, aparece "Dados insuficientes" e nenhuma estimativa é feita para ela. Se você definiu nomes da marca, essas taxas são calculadas a partir das pesquisas sem marca.

### Alterações

Elas comparam o período escolhido com o anterior.

- **Maiores variações em relação ao período anterior.** Duas listas: **Em queda (N)** e **Em alta (N)**. Para uma pesquisa ou página entrar numa lista, os cliques dela precisam se mexer pelo menos 3 cliques e 20 por cento do valor anterior. Movimentos pequenos não entram. Uma linha mostra cliques, impressões e posição antes e depois.
- **Novas** e **Perdidas (com os valores do período anterior).** Só pesquisas que tiveram pelo menos 50 impressões (para 28 dias) em um único período. Se a tabela de um período estiver incompleta por causa do limite de linhas, não dá para saber qual pesquisa é nova ou perdida, e a tela avisa.
- **Páginas perdendo força.** Páginas cujos cliques do último trimestre (91 dias) caíram abaixo de 70 por cento do melhor dos quatro trimestres anteriores e que também estão atrás do mesmo trimestre do ano passado. Essa comparação pede mais de um ano de dados. Se o Search Console não forneceu dados tão antigos ou há um filtro ativo, a tela avisa.
- **Longo prazo: cliques mensais.** O Search Console volta 16 meses. O aplicativo guarda os totais diários por mais tempo neste computador. As barras mostram os cliques mensais. Uma barra de contorno tracejado é um mês que o arquivo não tem por inteiro. Se o arquivo ainda estiver se enchendo, a tela diz "Nenhum dia no arquivo ainda" ou a data de início. Esta seção segue o filtro de dispositivo, não o de país.

### Sobreposições

Mostra os casos em que várias páginas suas aparecem para a mesma pesquisa. As páginas podem dividir os cliques entre si. Em geral basta fazer de uma a página principal e ligar as outras a ela. O título do cartão é "Várias páginas para a mesma consulta".

- Três quadros: **Consultas com páginas concorrentes**, **Impressões que vão para as outras páginas** e o quadro da consulta que perde mais. Um clique no último quadro estreita a lista a essa consulta.
- A tabela **Páginas que competem pela mesma consulta** mostra, para cada consulta, as páginas dela com cliques, impressões e posições. A página que o Google mais mostra para essa consulta conta como a "preferida". A parcela de impressões que vai para as outras fica escrita "fora da parcela".
- Esta análise olha 28 dias. Se 7 dias estiver escolhido, ela sobe para 28 na análise e o período real é escrito. Só pesquisas com pelo menos 100 impressões são examinadas. Para uma página entrar na disputa, ela precisa de pelo menos 10 impressões e 20 por cento de parcela nessa pesquisa.
- Se a busca bater no limite de linhas do Search Console, a tela avisa que algumas consultas não puderam ser examinadas.

### Distribuição

- **Distribuição de posições.** Mostra em grupos em quais posições suas pesquisas aparecem. Se o arquivo tiver pelo menos duas semanas, abaixo aparece **Consultas por semana**. Esse gráfico vale só para pesquisas na Web. Com Imagem, Vídeo ou Notícias escolhido como tipo de pesquisa, aparece no lugar dele "A distribuição semanal é apenas para pesquisas na Web." Esse gráfico mostra a parcela dos grupos de posição semana a semana. Ele vem do arquivo de consultas no seu computador. Não aparece com filtro de dispositivo ou país, porque o arquivo não guarda essas divisões.
- **Pesquisas de marca e sem marca.** As pesquisas que chegam com o seu nome e as de quem não conhecia você são medidas à parte: **Pesquisas de marca** e **Pesquisas sem marca**. Para cada uma, ficam escritos o número de consultas, os cliques, o CTR e a posição média. Se nenhum nome da marca estiver definido, aparece "Pesquisas de marca não separadas" e um botão **Adicionar nome da marca**. Se o aplicativo sugeriu nomes da marca a partir do seu domínio, aparece "Não confirmado." A medição foi então feita com os nomes sugeridos. Clique em **Confirmar sugestões** ou use **Editar nomes da marca**. As parcelas são das consultas lidas, as ocultas não estão incluídas.
- **Dispositivos** e **Países.** Um clique num dispositivo ou país estreita a tela inteira a ele.
- **Aparência na pesquisa.** Em que formatos especiais seus resultados aparecem no Google (resultados enriquecidos, vídeo e assim por diante). Um resultado enriquecido é um resultado que aparece com informação extra, como produto ou vídeo. O Google soma essa divisão por página. Se o Google não informou nenhum formato especial, a tela avisa.
- **Pesquisas em forma de pergunta.** Pesquisas em forma de pergunta e pesquisas de quatro ou mais palavras. São a fonte mais clara de ideias de conteúdo.

**Nomes da marca.** Você informa os nomes da marca com **Editar nomes da marca**. Digite o nome do seu site e o jeito como as pessoas o escrevem, por exemplo o nome e a forma curta. Pesquisas que contêm essas palavras contam como pesquisas de marca. Há os botões **Salvar** e **Cancelar**, e a linha **Sugestões:** adiciona um nome com um clique. Definir nomes da marca muda não só esta tela, mas também a estimativa de ganho da tela **Oportunidades**, porque essa estimativa deixa de fora as pesquisas de marca.

**Painel de detalhes.** Um clique numa pesquisa ou página (numa tabela, em A fazer, em Oportunidades de posição ou em Alterações) abre o painel pela direita. No alto estão o período e "dias definitivos". Depois quatro números (Cliques, Impressões, CTR, Posição média) e a variação deles em relação à comparação escolhida. Abaixo, a linha **Cliques diários**. Para uma página, aparece a lista "Consultas desta página (N)"; para uma pesquisa, "Páginas exibidas para esta consulta (N)". Cada linha dá cliques e posição. Se nenhuma pesquisa for listada para uma página, os cliques dela podem vir de consultas que o Google oculta. As consultas podem somar menos que o total da página, porque as ocultas não são listadas. **Abrir página** abre a página em uma nova guia. **Salvar como palavra-chave** adiciona a pesquisa às palavras-chave salvas.

## Como usar

1. Leia primeiro a frase de resumo no alto. Ela diz se os cliques sobem ou descem.
2. Olhe a faixa **Comece por estas** ou a guia **A fazer**. Os três primeiros trabalhos são os que mais rendem.
3. Se houve uma queda grande, ponha o **Período** em **Últimos três meses**. Ache no gráfico o dia em que a queda começou. Se uma atualização do Google ou uma mudança sua cair nesse dia, ela aparece nos marcadores.
4. Na guia **Oportunidades de posição**, olhe as **Consultas perto das três primeiras posições**. Abra a página das três pesquisas mais mostradas. Ajuste título e primeiro parágrafo a essa pesquisa.
5. Na guia **Pesquisas**, aperte o botão **CTR baixa**. Sua posição é boa, mas ninguém clica. O problema provavelmente está no título e na descrição.
6. Na guia **Variações**, olhe **Em queda**. Clique na pesquisa do topo e leia no painel de detalhes o dia em que a queda começou.
7. Se na guia **Sobreposições** você vir páginas concorrendo para a mesma pesquisa, decida primeiro qual página deve responder. Depois aponte os links internos para essa página.
8. Depois de uma correção, escreva a data dela no gráfico com **Adicionar uma nota**. Duas semanas depois você vê o efeito no gráfico.
9. Quando um trabalho terminar, diga **Feito**. A lista encurta.
10. No fim do mês, guarde a visão com **Baixar relatório**.

## Como os números são calculados

O Google entrega os dados com três dias de atraso. Por isso o período não termina hoje, e sim três dias antes. Os últimos dias ainda podem mudar por mais alguns dias. O aplicativo não os inclui nos totais. O período anterior é o período de mesma duração logo antes deste. Na comparação com o ano passado, tomam-se os mesmos dias do ano passado. Você vê a variação de cliques e impressões em porcentagem e a do CTR em pontos.

Os quadros são os totais reais do site. As tabelas contam separadamente cada página que aparece para a mesma pesquisa. Se você somar a tabela de páginas, vai achar um número maior que o do quadro. Isso não é erro. Se somar a tabela de consultas, vai achar um número menor que o do quadro, porque as consultas ocultas não são listadas.

O Google entrega no máximo 1.000 linhas por vez. Se o limite de linhas foi atingido, a ponta menos clicada falta na lista e a tela avisa.

**Ganho possível.** O aplicativo aplica a cada pesquisa a taxa de cliques do próprio site. Pega a taxa um degrau acima da posição em que a pesquisa está, multiplica pelas impressões da pesquisa e subtrai os cliques atuais. Pesquisas com pouquíssimas impressões não contam (pelo menos 50 impressões para 28 dias). Nos problemas de título, a régua é a pesquisa alcançar a taxa do seu site na mesma posição. As pesquisas de marca ficam de fora. Por isso todo ganho é um limite superior. O mesmo cálculo vale na tela **Oportunidades**.

**Etiqueta de confiança.** A etiqueta ao lado de cada trabalho mostra o quanto os dados por trás do achado são sólidos: alta, média ou baixa.

## Perguntas frequentes

**Por que os últimos três dias estão tracejados no gráfico?** O Google ainda está contando esses dias. Eles não entram nos totais. Ficam definitivos em alguns dias.

**O total da tabela não bate com o quadro.** É normal. O quadro é o total do site. A tabela de consultas e a de páginas diferem por causa das consultas ocultas e porque contam várias páginas separadamente.

**A minha posição é diferente quando pesquiso no Google.** A posição aqui é a média do período. Ela não reflete uma pesquisa isolada.

**A consulta que procuro não está na lista.** O Google oculta as consultas pesquisadas muito raramente. Em sites pequenos pode não haver nenhuma linha de consulta.

**Por que um trabalho sumiu da lista A fazer?** Se você o marcou como feito, ele está em "Marcadas como feitas". As marcas ficam guardadas só neste navegador. Em outro navegador ou outro computador você o vê de novo.

**Se as páginas se sobrepõem, devo juntá-las?** Em geral, não. Decida primeiro qual página deve responder. Depois aponte os links internos para essa página. Se as páginas respondem mesmo à mesma pergunta, junte-as.

**Preciso informar um nome da marca?** Não, mas sem ele quem pesquisa o nome do seu próprio site distorce o cálculo do CTR e as oportunidades saem incompletas. A tela lembra isso com a tarefa "Defina o nome da sua marca". Se o aplicativo usa nomes sugeridos a partir do seu domínio, a tarefa se chama "Confirmar o nome da marca".

## Limites

Os tipos de pesquisa Discover e Google Notícias não estão incluídos. Não há volume de pesquisa nem posição de concorrentes. Os dados do Google não vão além de 16 meses. Para o que for mais antigo, olhe o arquivo neste computador: o gráfico de longo prazo da guia **Variações** e a tela **Acompanhamento de posições** leem dele. As marcas de "feito" e as notas ficam só nesta instalação.

<!-- Fontes: src/routes/_project/p/$projectId/search-performance.tsx; src/client/features/search-performance/SearchPerformancePage.tsx; SearchPageParts.tsx; SearchFilters.tsx; DataTrustStrip.tsx; SearchVerdict.tsx; KpiTiles.tsx; SearchTrendChart.tsx; TrendParts.tsx; SearchNotes.tsx; LongTermTrend.tsx; TodoTab.tsx; DimensionTab.tsx; DimensionTableParts.tsx; OpportunitiesTab.tsx; StrikingTable.tsx; ChangesTab.tsx; CannibalizationSummary.tsx; CannibalizationTable.tsx; DistributionTab.tsx; PositionDistribution.tsx; DrilldownPanel.tsx; BrandTerms.tsx; SearchReportButton.tsx; src/shared/searchInsights.ts; src/shared/searchTodoCopy.ts; src/shared/searchQuickFilters.ts; src/shared/dataFreshness.ts; src/serverFunctions/searchPerformance.ts; src/server/features/gsc/cannibalization.ts -->

Os links de Oportunidades e Acompanhamento de posições abrem os detalhes da URL ou consulta exata nas datas de origem. Os totais gerais continuam sendo da propriedade; os valores da identidade selecionada ficam no painel de detalhes. Períodos indisponíveis nunca são substituídos silenciosamente. Escolher um período predefinido remove as datas fixadas. O relatório envia as datas exibidas ao servidor e fica indisponível durante a atualização. As datas permanecem fixas; o Google pode revisar as medições consultadas novamente.

## Interpretar poucos dados

Quando os cliques do período de comparação ficam abaixo do limite de análise, o resumo apresenta primeiro os cliques e as impressões reais. Com poucos dados, percentuais e médias não comprovam crescimento ou perda por si só. Uma lista de oportunidades vazia não significa que nenhuma consulta esteja na posição 4–20: também se aplicam o limite de impressões ajustado ao período e a exclusão de consultas de marca.

Se a lista de tarefas estiver vazia, abra as consultas visíveis. Não é sugerido um período maior quando os últimos três meses já estão selecionados. Não se presume que o Google revele depois as consultas ocultas.
