---
title: Acompanhamento de posições
description: Posição média das suas pesquisas no Google, quais estão subindo ou caindo e como mudam os grupos de posições, mesmo além do limite de 16 meses do Google, porque os dados ficam guardados neste computador.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-27
---

Aqui você vê como as suas pesquisas sobem e descem com o tempo, e qual movimento mais importa. O Google Search Console limita o histórico a 16 meses. Ele também não mostra em que posição uma pesquisa estava em cada dia.

O aplicativo busca esses dados dia a dia e os guarda neste computador. O arquivo cresce cada vez que você abre a tela. Com o tempo, você vai mais longe no passado do que o Google mostra.

## O que há na tela

**Intervalo de tempo.** As opções são 30 dias, 90 dias (padrão), 6 meses, 16 meses e Arquivo inteiro. O intervalo escolhido fica na barra de endereço. Ele termina três dias antes de hoje. Uma linha no alto diz quais datas são mostradas.

**Linha de estado do arquivo.** Ela diz quais datas o arquivo cobre. A cada abertura, a tela completa no Google os dias que faltam. Se uma nota disser que dias foram adicionados nesta visita, entraram dias novos no arquivo. Se disser que os dias restantes serão preenchidos na próxima abertura, o trabalho continua na visita seguinte.

**Em alta e em queda.** Duas listas curtas: **Maiores altas** e **Maiores quedas**. Cada linha mostra a pesquisa, a posição antiga e a nova como "Posição 6,2 → 4,1", as impressões e quantas posições ela se mexeu. As listas não são ordenadas só pelo movimento. O movimento é multiplicado pelas impressões. Uma consulta muito pesquisada que subiu duas posições vem antes de uma pouco pesquisada que subiu quatro. Um clique numa linha abre o histórico dessa pesquisa abaixo da tabela. Pesquisas sem dados no período anterior não entram nessas listas. Se nenhuma comparação for possível, uma nota no lugar da seção diz o motivo.

**Distribuição de posições.** Quatro barras mostram quantas das suas pesquisas estão nos grupos 1-3, 4-10, 11-20 e 21+, pela posição média. Ao lado de cada barra ficam o número de pesquisas e a parcela delas. O número no extremo direito diz quantas pesquisas entraram nesse grupo ou saíram dele desde o período anterior, com seta e sinal. Nos três primeiros grupos, um aumento é boa notícia. No grupo 21+, é má notícia. Um clique numa barra restringe a tabela a esse grupo. Outro clique tira o filtro.

**Caixa de pesquisa e filtros.** A caixa **Consultas de pesquisa** restringe a lista. Abaixo há dois grupos de filtros.

- **Alterar filtros**: **Em alta** e **Em queda** mostram pesquisas que se mexeram pelo menos meia posição em relação ao período anterior. **Agora no top 10** e **Saíram do top 10** também estão aqui.
- **Filtros rápidos**: **Impressões altas** e **Sem cliques**. Impressões altas é o quarto da lista que mais aparece. Não há número fixo, porque um número fixo selecionaria todas as linhas num intervalo curto.

Um filtro que não restringe a lista de verdade não é mostrado. Um botão que não selecionaria nenhuma linha, ou todas, não diz nada.

**Tabela.** As colunas são **Consulta**, **Posição média**, **Variação**, **Impressões**, **Cliques** e às vezes **Dia**. Clique no título para ordenar. Ela começa ordenada por impressões. A célula **Posição média** tem uma linha pequena à esquerda. Ela mostra a posição semana a semana no intervalo. Se a linha sobe, a posição está melhorando. Em tela pequena, a linha fica oculta. Uma posição na primeira página é escrita em verde, na segunda página em amarelo. A cor sozinha nunca carrega a informação, porque o número sempre está escrito. A célula **Variação** diz "subiu 2,4 posições", "desceu 1,1 posições" ou "Sem variação". Para uma pesquisa sem dados no período anterior, diz "Nenhum dado no período anterior". A coluna **Dia** só aparece quando algumas pesquisas faltaram em alguns dias. Uma pesquisa que aparece só em 3 de 90 dias é pouco pesquisada. O menu da linha tem três opções: **Copiar palavra-chave**, **Adicionar às palavras-chave salvas**, **Pesquisar em Desempenho da pesquisa**. A tabela é dividida em páginas de 25, 50 ou 100 linhas.

**Histórico da pesquisa.** Um clique numa linha abre a linha de posição dia a dia dessa pesquisa. Na linha, o alto é a posição melhor. Passando o mouse, você lê a posição, os cliques e as impressões do dia. O link **Abrir em Desempenho da pesquisa** mostra a mesma pesquisa na outra tela.

**Estados vazios.** Se o Search Console não estiver ligado, aparece o botão **Conectar Search Console**. Se o arquivo estiver vazio, aparece "As palavras-chave com as quais as pessoas pesquisam você ainda não estão visíveis" e o botão **Abrir Desempenho da pesquisa**. A lista é limitada às 100 pesquisas que mais aparecem. Se houver mais, uma nota abaixo avisa.

## Como usar

1. Ao abrir a tela pela primeira vez, espere a linha do arquivo indicar que dias foram adicionados.
2. O primeiro preenchimento volta até 480 dias. Pode levar algumas visitas.
3. Olhe **Em alta e em queda**. A primeira queda é o movimento que mais prejudica o seu tráfego.
4. Olhe as barras da **Distribuição de posições**. Se o grupo 21+ tiver um aumento em vermelho ao lado, pesquisas estão deslizando para depois da segunda página.
5. Se você procura uma queda, aperte o filtro **Em queda**. Depois use **Impressões altas** para descartar as sem importância.
6. Clique na pesquisa do topo. No gráfico de histórico, leia o dia em que a queda começou.
7. Marque as pesquisas que quer acompanhar com **Adicionar às palavras-chave salvas**.

## Como os números são calculados

O arquivo só se enche com dados que o Google tornou definitivos. A cada abertura, os últimos três dias são buscados de novo, porque o Google pode corrigir esses dias depois. Assim os dias corrigidos são regravados no arquivo. Abrir a tela gasta cota do Search Console. Por isso, se a tela for aberta de novo dentro de 15 minutos do último preenchimento, ela reaproveita o mesmo resultado.

Cliques e impressões são totais. Na **Posição média**, os dias com mais impressões pesam mais. **Dia** é o número de dias com dados.

Calculamos a variação assim: subtraímos a posição deste período da posição média do período anterior. Se o resultado for positivo, você subiu. O período anterior tem a mesma duração e termina logo antes deste. A comparação só é feita para pesquisas que têm dados nos dois períodos. Uma pesquisa que se mexe menos de meia posição não conta como "em alta" nem como "em queda".

A lista de subidas e quedas é ordenada pela diferença de posição vezes as impressões. Cada lista tem no máximo cinco linhas.

Os grupos de posição são cortados na posição arredondada. 3,4 conta como "por volta da terceira", 3,5 como "por volta da quarta". Por isso uma pesquisa em 3,4 fica no grupo 1-3 e uma em 3,5 no grupo 4-10.

A lista busca as 100 pesquisas que mais aparecem.

## Perguntas frequentes

**Por que é diferente do número do Search Console?** O arquivo guarda só dias definitivos e vai até três dias atrás. Se você escolheu no Search Console um intervalo que inclui hoje, os números não batem.

**A pesquisa está na lista, mas o histórico de posição está vazio.** A pesquisa pode ter aparecido em poucos dias. Você percebe pela coluna **Dia**.

**Por que diz que a alteração não pode ser mostrada?** O arquivo não tem registros dessas pesquisas no período anterior. Escolha um intervalo mais curto ou espere o arquivo se encher.

**Por que o arquivo fica parado no mesmo dia?** O aplicativo não busca dados em segundo plano. Abra a tela e espere a nota de que dias foram adicionados.

**Posso ver a posição do meu concorrente?** Não. O Search Console só dá dados do seu próprio site.

**O que significa posição 1,0?** Que você saiu em primeiro lugar em toda impressão do período. Se tivesse caído para 3º em um dia, a média passaria de 1.

## Limites

O arquivo contém só os dias que esta instalação viu. Se você acabou de instalar, na primeira abertura dá para voltar no máximo 480 dias. Pesquisas raras que o Google oculta também não entram no arquivo. Se o arquivo for apagado, o histórico se perde. Apagar o armazenamento de dados do Docker ou a pasta de dados é um exemplo. Fazer backup fica por sua conta.

<!-- Fontes: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; PositionSparkline.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; positionBands.ts; rankingMoves.ts; src/shared/positionBands.ts; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
