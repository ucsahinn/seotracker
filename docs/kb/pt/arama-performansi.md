---
title: Desempenho de busca
description: Veja em quais buscas você aparece no Google e quantas pessoas clicam. Por consulta, página, país e dispositivo, até 16 meses atrás.
screen: Arama performansı
route: /p/<proje>/search-performance
updated: 2026-10-22
---

Nesta tela você vê em quais buscas você aparece no Google e quantas pessoas clicam. Os dados vêm diretamente do Google Search Console. O aplicativo não estima nenhum número.

Os filtros que você escolhe são gravados na barra de endereços. Você pode compartilhar a visualização como um link ou guardá-la nos favoritos.

## O que há na tela

**Filtros.** **Dönem** (Período): Son 7 gün, Son 28 gün (padrão), Son 3 ay (últimos 7 dias, últimos 28 dias, últimos 3 meses). **Arama türü** (Tipo de busca): Web, Görsel (Imagem), Video (Vídeo), Haber (Notícias). **Cihaz** (Dispositivo): Tüm cihazlar (Todos os dispositivos), Mobil (Celular), Bilgisayar (Computador), Tablet. A lista **Ülke** (País) tem os países que o Google informou nesse período. O link **Mülkü değiştir** (Alterar propriedade) leva às configurações do projeto.

**Quatro cartões de totais.** **Tıklama** (Cliques), **Gösterim** (Impressões), **Tıklama oranı** (Taxa de cliques) (que percentual das impressões foi clicado) e **Ortalama sıra** (Posição média). Na posição média, um número pequeno é bom, e 1 é a primeira posição. Cada cartão mostra a variação em relação ao período anterior.

**Gráfico de variação diária.** Os totais distribuídos por dia. Você alterna entre as quatro medidas com os botões acima dele.

**Cihazlar, Ülkeler, Arama görünümü** (Dispositivos, Países, Aparência na busca). Três cartões pequenos. Em países, são mostrados os seis primeiros. A aparência na busca lista os tipos de resultado enriquecido. Um resultado enriquecido é um resultado que aparece na busca com informações extras, como um produto ou um vídeo. São mostrados os cinco primeiros, e o restante é reunido em "Diğer görünümler" (Outras aparências).

**Quatro abas.**

- **Sıra 5-20 (N)** (Posição 5-20): as consultas mais exibidas que aparecem no Google entre a posição 5 e a 20.
- **Sorgular** (Consultas): uma tabela por busca.
- **Sayfalar** (Páginas): uma tabela por página.
- **Sayfa çakışmaları** (Sobreposição de páginas): casos em que mais de uma das suas páginas competem na mesma busca.

**Filtros rápidos.** **İlk 10'da** (Entre as 10 primeiras), **Hiç tıklanmayan** (Nunca clicadas), **Tıklama oranı düşük** (Taxa de cliques baixa), **Tıklama alanlar** (Com cliques), **Sıra 5-10** (Posição 5-10), **Sıra 11-20** (Posição 11-20). Taxa de cliques baixa significa isto: na primeira página, pelo menos 100 impressões, taxa abaixo de 2%.

**Menu da linha.** Os três pontos à direita de cada linha: **Sayfayı yeni sekmede aç** (Abrir a página em nova aba), **Adresi kopyala** (Copiar o endereço), **Kelimeyi kopyala** (Copiar a palavra), **Kelime olarak kaydet** (Salvar como palavra). O que você salva vai para a tela Kayıtlı kelimeler (Palavras salvas).

**Exportação.** **E-Tablolar'a aktar** (Exportar para o Planilhas) e **CSV indir** (Baixar CSV). Leva a tabela visível, com os filtros. A aba de sobreposição não tem exportação.

## Como usar

1. Comece com **Son 28 gün**. Se houver uma queda grande, escolha **Son 3 ay**. No gráfico, veja em que dia a queda começou.
2. Abra a aba **Sıra 5-20**. O Google já mostra você, mas ninguém clica. Abra a página das três consultas mais exibidas. Corrija o título e o primeiro parágrafo para essa busca.
3. Na aba **Sorgular**, clique no botão **Tıklama oranı düşük**. Sua posição é boa, mas ninguém clica. O problema provavelmente está no título e na descrição.
4. Para ver em quais buscas uma página aparece, escolha **Arama performansında ara** (Buscar em Desempenho de busca) na aba **Sayfalar**.
5. Marque as consultas que você quer acompanhar com **Kelime olarak kaydet**.

## Como os números são calculados

O Google entrega os dados com três dias de atraso. Por isso, o período termina três dias antes de hoje, não hoje. O período anterior tem a mesma duração e vem logo antes deste intervalo. A variação de cliques e impressões é mostrada em percentual, e a variação da taxa de cliques é mostrada em pontos.

Os cartões de totais são os totais reais do site. As tabelas contam separadamente cada página que aparece na mesma busca. Se você somar a tabela de páginas, obtém um número maior que o do cartão. Isso não é um erro.

O Google entrega no máximo 1.000 linhas por vez. Se houver uma nota sob a tabela dizendo "bu liste tam değil" (esta lista não está completa), a lista foi cortada. A lista Posição 5-20 tem no máximo 100 linhas.

A análise de sobreposição olha 28 dias. Ela examina apenas as buscas com pelo menos 100 impressões. Para uma página participar, ela precisa de pelo menos 10 impressões e de 20% de participação. A página que o Google mais exibe é contada como a "preferida".

## Perguntas frequentes

**Por que os últimos três dias estão vazios?** O Google ainda não entregou esses dias. Olhe de novo em alguns dias.

**O total da tabela não bate com o cartão.** Isso é normal. O cartão é o total do site.

**Minha posição é diferente quando busco no Google.** A posição aqui é a média do período. Ela não reflete uma única busca.

**A consulta que eu pesquisei não está na lista.** O Google oculta as consultas pesquisadas muito raramente. Em sites pequenos pode não haver nenhuma linha de consulta.

**Se houver sobreposição, devo juntar as páginas?** Na maioria das vezes, não. Primeiro decida qual página você quer que responda. Depois aponte os links internos para essa página.

## Limites

Os tipos Discover e Google Notícias não existem aqui. O volume de busca e as posições de concorrentes também não. Os dados não vão além de 16 meses atrás. Para dados mais antigos, veja o arquivo na tela Sıralama takibi (Acompanhamento de posições).

<!-- Kaynaklar: src/routes/_project/p/$projectId/search-performance.tsx; src/client/features/search-performance/SearchPerformancePage.tsx; SearchFilters.tsx; TotalsCards.tsx; SearchTrendChart.tsx; CountryBreakdown.tsx; QuickFilterBar.tsx; quickFilters.ts; tabBuckets.ts; TabSummaries.tsx; SearchPerformanceColumns.tsx; CannibalizationTable.tsx; src/serverFunctions/searchPerformance.ts; src/server/features/gsc/searchPerformanceReport.ts; src/server/features/gsc/cannibalization.ts; src/server/features/gsc/services/CannibalizationService.ts; src/shared/dataFreshness.ts -->
