---
title: Palavras-chave salvas
description: Organize com etiquetas as buscas que você salvou, acompanhe a posição média delas nos últimos 90 dias e exporte para CSV ou Planilhas.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-22
---

Nesta tela você reúne as buscas que importam para você, as marca com etiquetas e acompanha as posições delas.

O aplicativo não sugere palavras-chave. Na tela Arama performansı (Desempenho de busca) ou Sıralama takibi (Acompanhamento de posições), você escolhe **Kelime olarak kaydet** (Salvar como palavra-chave) no menu de uma linha. A palavra-chave aparece aqui, com a posição média dos últimos 90 dias. A posição vem do arquivo de Sıralama takibi. Salvar não inicia um novo acompanhamento no Google; apenas filtra dados já coletados para essas palavras-chave.

## O que há na tela

**Barra superior.** Uma linha de descrição, **E-Tablolar'a aktar** (Exportar para o Planilhas), **CSV indir** (Baixar CSV) e **Yenile** (Atualizar). Abaixo, aparece "{n} kayıtlı kelime" ({n} palavras-chave salvas).

**Cartão de distribuição de posições.** Barras que mostram quantas das suas palavras-chave estão nas posições 1-3, 4-10, 11-20 e 21+. Abaixo há uma nota: "sıralar son 90 günün ortalaması" (as posições são a média dos últimos 90 dias). Uma palavra-chave sem registro no arquivo conta como "Verisi yok" (Sem dados). Se o arquivo estiver incompleto, você vê "Bilinmiyor (arşiv kesildi)" (Desconhecida, arquivo cortado). Os botões **İlk 10** (As 10 primeiras) e **Sıra 11-20** (Posição 11-20) restringem a tabela a essa faixa.

**Painel de filtros.** Em **Sonuçları filtrele** (Filtrar resultados) estão as caixas **İçersin** (Contém) e **İçermesin** (Não contém). Elas procuram texto dentro da palavra-chave. Para as etiquetas, usa-se **Etiket ara** (Buscar etiquetas). **Tümünü temizle** (Limpar tudo) zera tudo. Um projeto pode ter no máximo 50 etiquetas.

**Tabela.** Colunas: **Kelime** (Palavra-chave), **Ort. sıra** (Posição média), **Amaç** (Intenção), **Etiketler** (Etiquetas), **Eklenme** (Adição). Se a posição estiver vazia, ao passar o mouse aparece "Search Console bu kelime için sıra kaydetmemiş" (O Search Console não registrou posição para esta palavra-chave). A coluna **Amaç** (Intenção) mostra o que quer a pessoa que busca a palavra-chave:

- Bilgi amaçlı (Informacional): quer aprender.
- Ticari araştırma (Pesquisa comercial): vai comparar e escolher.
- İşlem odaklı (Transacional): pronta para comprar.
- Yönlendirici (Navegacional): procura um site específico.
- Bilinmiyor (Desconhecida): não está claro.

As formas curtas são Bilgi, Ticari, İşlem, Gezinme e um ponto de interrogação. O menu da linha: **Kelimeyi kopyala** (Copiar a palavra-chave), **Arama performansında ara** (Buscar em Desempenho de busca), **Kelimeyi sil** (Excluir a palavra-chave).

**Ações em lote.** Quando você marca linhas, aparecem no alto **Kelimeleri kopyala** (Copiar as palavras-chave), **Etiketleri güncelle** (Atualizar as etiquetas) e um botão de excluir. Antes de excluir, aparece um aviso: "kalıcı olarak silinecek. Bu geri alınamaz." (será excluído de forma permanente. Isso não pode ser desfeito.)

**Estados vazios.** Se não houver nenhuma palavra-chave, aparece "Henüz kayıtlı kelime yok" (Ainda não há palavras-chave salvas). Surgem dois atalhos: **Sorgulara göz at** (Explorar as consultas) e **Sıralamayı aç** (Abrir o acompanhamento de posições). Se nenhuma palavra-chave corresponder ao filtro, aparece "Bu filtrelere uyan kelime yok" (Nenhuma palavra-chave corresponde a estes filtros).

## Como usar

1. Em Arama performansı (Desempenho de busca), abra a aba **Sıra 5-20** (Posição 5-20). Marque cinco ou dez buscas que você considera importantes com **Kelime olarak kaydet** (Salvar como palavra-chave). Inclua também as buscas das páginas que trazem receita, não só as mais exibidas.
2. Venha para cá e marque as palavras-chave. Com **Etiketleri güncelle** (Atualizar as etiquetas), dê etiquetas como "ürün" (produto), "blog" e "marka" (marca). Isso facilita a comparação no mês seguinte.
3. Uma vez por mês, olhe o cartão **Sıra dağılımı** (Distribuição de posições). As palavras-chave da faixa 11-20 são as mais próximas da primeira página. Encontre as páginas dessas palavras-chave na tela Fırsatlar (Oportunidades).
4. Para um relatório, escolha **CSV indir** (Baixar CSV) ou **E-Tablolar'a aktar** (Exportar para o Planilhas). O arquivo vem com os filtros que você aplicou.

## Como os números são calculados

As palavras-chave e as etiquetas estão no banco de dados deste computador. **Ort. sıra** (Posição média) é calculada a partir do arquivo de Sıralama takibi dos últimos 90 dias. Os dias com muitas impressões pesam mais na média. Maiúsculas e minúsculas não são distinguidas.

As 500 buscas mais exibidas são puxadas do arquivo. Se a sua palavra-chave salva estiver fora dessas 500, a posição dela aparece como "bilinmiyor" (desconhecida).

A intenção só é gravada se vier junto quando a palavra-chave é salva. Ela não é calculada depois. A lista é dividida em páginas de 50, 100 ou 250.

## Perguntas frequentes

**Salvei a palavra-chave. Por que a posição está vazia?** O arquivo pode ainda não ter coletado dias dessa palavra-chave. Abra a tela Sıralama takibi e espere o arquivo se preencher. Depois escolha **Yenile** (Atualizar) aqui.

**Minha posição é diferente quando busco no Google.** A posição aqui é a média de 90 dias. Ela não pode ser comparada com uma única busca.

**Onde está a coluna de volume de busca?** Não há. O aplicativo não estima volume. Você vê o número de impressões na tela Arama performansı (Desempenho de busca).

**Posso salvar a mesma palavra-chave duas vezes?** Não. O mesmo texto vira um só registro.

**Se eu excluir uma etiqueta, as palavras-chave são excluídas?** Não. A etiqueta some, e as palavras-chave ficam.

## Limites

Esta tela não é uma ferramenta de pesquisa de palavras-chave. Ela não produz sugestões e não mostra volume nem dificuldade. A informação de posição se limita ao arquivo. As posições das buscas raras que o Google oculta nunca chegam. Os dados estão no banco de dados desta instalação. O backup você precisa fazer por conta própria.

<!-- Kaynaklar: src/routes/_project/p/$projectId/saved.tsx; src/client/features/saved-keywords/SavedKeywordsHeader.tsx; SavedKeywordsTable.tsx; SavedKeywordsFilterPanel.tsx; SavedKeywordsTagFilter.tsx; SavedKeywordsSummary.tsx; SavedKeywordsModals.tsx; useSavedKeywordPositions.ts; savedKeywordPositions.ts; src/client/components/IntentBadge.tsx; src/server/features/keywords/repositories/KeywordResearchRepository.ts; src/server/features/keywords/services/research/saved-keywords.ts -->
