---
title: Palavras-chave salvas
description: Organize com etiquetas as buscas que você salvou, acompanhe a posição média delas nos últimos 90 dias e exporte para CSV ou Planilhas.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-22
---

Nesta tela você reúne as buscas que importam para você, as marca com etiquetas e acompanha as posições delas.

O aplicativo não sugere palavras-chave. Na tela Desempenho da pesquisa ou Acompanhamento de posições, você escolhe **Salvar como palavra-chave** no menu de uma linha. A palavra-chave aparece aqui, com a posição média dos últimos 90 dias. A posição vem do arquivo de Acompanhamento de posições. Salvar não inicia um novo acompanhamento no Google; apenas filtra dados já coletados para essas palavras-chave.

## O que há na tela

**Barra superior.** Uma linha de descrição, **Exportar para Sheets**, **Baixar CSV** e **Atualizar**. Abaixo, aparece "N palavras-chave salvas".

**Cartão de distribuição de posições.** Barras que mostram quantas das suas palavras-chave estão nas posições 1-3, 4-10, 11-20 e 21+. Abaixo há uma nota: "as posições são a média dos últimos 90 dias". Uma palavra-chave sem registro no arquivo conta como "Sem dados". Se o arquivo estiver incompleto, você vê "Desconhecido (arquivo truncado)". Os botões **Top 10** e **Posição 11-20** restringem a tabela a essa faixa.

**Painel de filtros.** Em **Filtrar resultados** estão as caixas **Contém** e **Não contém**. Elas procuram texto dentro da palavra-chave. Para as etiquetas, usa-se **Pesquisar etiquetas**. **Limpar tudo** zera tudo. Um projeto pode ter no máximo 50 etiquetas.

**Tabela.** Colunas: **Palavra-chave**, **Pos. média**, **Intenção**, **Etiquetas**, **Adicionada**. Se a posição estiver vazia, ao passar o mouse aparece "O Search Console não registrou uma posição para esta palavra-chave". A coluna **Intenção** mostra o que quer a pessoa que busca a palavra-chave:

- Informacional: quer aprender.
- Pesquisa comercial: vai comparar e escolher.
- Transacional: pronta para comprar.
- Navegacional: procura um site específico.
- Desconhecido: não está claro.

As formas curtas são Informacional, Comercial, Transacional, Navegacional e um ponto de interrogação. O menu da linha: **Copiar palavra-chave**, **Pesquisar em Desempenho da pesquisa**, **Excluir palavra-chave**.

**Ações em lote.** Quando você marca linhas, aparecem no alto **Copiar palavras-chave**, **Atualizar etiquetas** e um botão de excluir. Antes de excluir, aparece um aviso: "será excluído de forma permanente. Isso não pode ser desfeito."

**Estados vazios.** Se não houver nenhuma palavra-chave, aparece "Ainda não há palavras-chave salvas". Surge um atalho: **Explorar consultas**; se o Search Console ainda não estiver conectado, aparece **Conectar Search Console** no lugar. Se nenhuma palavra-chave corresponder ao filtro, aparece "Nenhuma palavra-chave corresponde a estes filtros".

## Como usar

1. Em Desempenho da pesquisa, abra a aba **Oportunidades de posicionamento**. Marque cinco ou dez buscas que você considera importantes com **Salvar como palavra-chave**. Inclua também as buscas das páginas que trazem receita, não só as mais exibidas.
2. Venha para cá e marque as palavras-chave. Com **Atualizar etiquetas**, dê etiquetas como "ürün" (produto), "blog" e "marka" (marca). Isso facilita a comparação no mês seguinte.
3. Uma vez por mês, olhe o cartão **Distribuição de posições**. As palavras-chave da faixa 11-20 são as mais próximas da primeira página. Encontre as páginas dessas palavras-chave na tela Oportunidades.
4. Para um relatório, escolha **Baixar CSV** ou **Exportar para Sheets**. O arquivo vem com os filtros que você aplicou.

## Como os números são calculados

As palavras-chave e as etiquetas estão no banco de dados deste computador. **Pos. média** é calculada a partir do arquivo de Acompanhamento de posições dos últimos 90 dias. Os dias com muitas impressões pesam mais na média. Maiúsculas e minúsculas não são distinguidas.

As 500 buscas mais exibidas são puxadas do arquivo. Se a sua palavra-chave salva estiver fora dessas 500, a posição dela aparece como "desconhecido".

A intenção só é gravada se vier junto quando a palavra-chave é salva. Ela não é calculada depois. A lista é dividida em páginas de 50, 100 ou 250.

## Perguntas frequentes

**Salvei a palavra-chave. Por que a posição está vazia?** O arquivo pode ainda não ter coletado dias dessa palavra-chave. Abra a tela Acompanhamento de posições e espere o arquivo se preencher. Depois escolha **Atualizar** aqui.

**Minha posição é diferente quando busco no Google.** A posição aqui é a média de 90 dias. Ela não pode ser comparada com uma única busca.

**Onde está a coluna de volume de busca?** Não há. O aplicativo não estima volume. Você vê o número de impressões na tela Desempenho da pesquisa.

**Posso salvar a mesma palavra-chave duas vezes?** Não. O mesmo texto vira um só registro.

**Se eu excluir uma etiqueta, as palavras-chave são excluídas?** Não. A etiqueta some, e as palavras-chave ficam.

## Limites

Esta tela não é uma ferramenta de pesquisa de palavras-chave. Ela não produz sugestões e não mostra volume nem dificuldade. A informação de posição se limita ao arquivo. As posições das buscas raras que o Google oculta nunca chegam. Os dados estão no banco de dados desta instalação. O backup você precisa fazer por conta própria.

<!-- Kaynaklar: src/routes/_project/p/$projectId/saved.tsx; src/client/features/saved-keywords/SavedKeywordsHeader.tsx; SavedKeywordsTable.tsx; SavedKeywordsFilterPanel.tsx; SavedKeywordsTagFilter.tsx; SavedKeywordsSummary.tsx; SavedKeywordsModals.tsx; useSavedKeywordPositions.ts; savedKeywordPositions.ts; src/client/components/IntentBadge.tsx; src/server/features/keywords/repositories/KeywordResearchRepository.ts; src/server/features/keywords/services/research/saved-keywords.ts -->
