---
title: Acompanhamento de posições
description: Veja a posição média das suas buscas no Google dia a dia. Os dados ficam guardados neste computador, então você pode olhar mais longe do que o limite de 16 meses do Google.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-22
---

Nesta tela você vê as suas buscas subirem e descerem ao longo do tempo. O Google Search Console limita o histórico a 16 meses. Ele também não mostra para qual posição uma busca caiu em cada dia.

O aplicativo puxa esses dados dia a dia e os guarda neste computador. O arquivo cresce cada vez que você abre a tela. Com o tempo, você volta mais longe do que o Google mostra.

## O que há na tela

**Período.** 30 gün, 90 gün (padrão), 6 ay, 16 ay e Arşivin tamamı (30 dias, 90 dias, 6 meses, 16 meses e o arquivo inteiro). O período é contado a partir de três dias antes de hoje.

**Linha de estado do arquivo.** Informa quantos dias e quantas linhas há no arquivo. Cada vez que você abre a tela, ela preenche com dados do Google os dias que faltam. Se aparecer "Bu açılışta N gün eklendi." (N dias foram adicionados desta vez.), chegaram dias novos. Se aparecer "Kalan günler sonraki açılışta tamamlanacak." (Os dias restantes serão completados na próxima vez que você abrir.), ele continua na próxima abertura.

A caixa **Sorgu içinde ara** (Buscar nas consultas) restringe a lista.

**Filtros de variação.** **Yükselenler** (Em alta) e **Düşenler** (Em queda) mostram as buscas que se moveram pelo menos meia posição. Há também **Şu an ilk 10'da** (Entre as 10 primeiras agora) e **İlk 10'dan çıkanlar** (Saíram das 10 primeiras). Botões rápidos: **Gösterimi yüksek** (Muitas impressões) (pelo menos 100 impressões) e **Hiç tıklanmayan** (Nunca clicadas).

**Distribuição de posições.** Barras que mostram quantas das suas buscas caem nas faixas 1-3, 4-10, 11-20 e 21+.

**Em alta e em queda.** Duas listas curtas: "En çok yükselenler" (As que mais subiram) e "En çok düşenler" (As que mais caíram).

**Tabela.** Colunas: **Sorgu** (Consulta), **Ort. sıra** (Posição média), **Değişim** (Variação), **Gösterim** (Impressões), **Tıklama** (Cliques), **Gün** (Dias). A coluna **Gün** informa em quantos dias a busca apareceu no período escolhido. Uma busca que aparece em apenas 3 dias de 90 é raramente pesquisada. A célula de variação diz "Yükseldi 2.4" (Subiu 2,4) ou "Düştü 1.1" (Caiu 1,1). Menu da linha: **Kelimeyi kopyala** (Copiar a palavra), **Kayıtlı kelimelere ekle** (Adicionar às palavras salvas), **Arama performansında ara** (Buscar em Desempenho de busca).

**Histórico da consulta.** Quando você clica em uma linha, abre-se a linha de posição dia a dia dessa busca. O link **Arama performansında aç** (Abrir em Desempenho de busca) mostra a mesma busca na outra tela.

**Estados vazios.** Se o arquivo estiver vazio, aparece "Henüz hangi kelimeyle arandığınız bilinmiyor" (Ainda não se sabe com quais palavras você é pesquisado) e surge o botão **Arama performansını aç** (Abrir Desempenho de busca). A lista é limitada às 100 buscas mais exibidas. Se houver mais, você vê uma nota abaixo dizendo isso.

## Como usar

1. Quando abrir a tela pela primeira vez, espere aparecer "eklendi" (adicionado) na linha do arquivo.
2. O primeiro preenchimento volta até 480 dias. Pode levar algumas aberturas.
3. Se você procura uma queda, clique no botão **Düşenler**. Depois remova as sem importância com **Gösterimi yüksek**.
4. Clique na busca do topo. No gráfico de histórico, leia o dia em que a queda começou.
5. Marque as buscas que você quer acompanhar com **Kayıtlı kelimelere ekle**.
6. Uma vez por mês, olhe as listas "En çok yükselenler" e "En çok düşenler". Isso basta para o quadro geral.

## Como os números são calculados

O arquivo só se enche com dados que o Google já finalizou. Cada vez que você abre a tela, os últimos três dias são puxados de novo, porque o Google pode corrigir esses dias depois. Assim, os dias que o Google corrigiu mais tarde são gravados outra vez.

Cliques e impressões são totais. **Ort. sıra** dá mais peso aos dias com muitas impressões. **Gün** é o número de dias que têm dados.

A variação é calculada assim: a posição deste período é subtraída da posição média do período anterior. Um número positivo significa subida. O período anterior tem a mesma duração e termina logo antes deste.

A lista traz as 100 buscas mais exibidas. No navegador, ela é dividida em páginas de 25, 50 ou 100.

## Perguntas frequentes

**Por que é diferente do valor no Search Console?** O arquivo guarda apenas dias finalizados e vai até três dias atrás. Se no Search Console você escolheu um período que inclui hoje, os números não batem.

**A busca está na lista, mas o histórico de posição dela está vazio.** Essa busca pode ter aparecido em poucos dias. Olhe a coluna **Gün**.

**Por que o arquivo está parado no mesmo dia?** O aplicativo não puxa dados em segundo plano. Abra a tela e espere a nota "eklendi".

**Posso ver a posição do meu concorrente?** Não. O Search Console fornece apenas o seu próprio site.

**O que significa a posição 1,0?** Você apareceu em primeiro lugar em todas as impressões do período. Se tivesse caído para a posição 3 por um dia, a média teria passado de 1.

## Limites

O arquivo contém apenas os dias que esta instalação viu. Se você acabou de instalar, na primeira abertura ele pode voltar no máximo 480 dias. As buscas raras que o Google oculta também não entram no arquivo. Se o arquivo for apagado (se o volume do Docker ou a pasta de dados for removido), o histórico se perde. Fazer o backup fica por sua conta.

<!-- Kaynaklar: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
