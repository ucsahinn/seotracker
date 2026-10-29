---
title: Palavras-chave salvas
description: Como acompanhar as palavras-chave salvas no arquivo local: períodos, observações, dados ausentes, variações de posição e exportação.
screen: Kayıtlı kelimeler
route: /p/<proje>/saved
updated: 2026-10-27
---

As consultas importantes são salvas a partir de **Desempenho da pesquisa** ou de **Acompanhamento de posições**. Salvar não inicia um novo acompanhamento no Google: a tela relaciona as palavras salvas às observações que já estão no arquivo local.

## Período e contagens

O período pode ser de 30, 90 ou 180 dias; o padrão é 90. A tela mostra as datas exatas do período atual e do período anterior de mesma duração. As datas seguem o fuso horário do Pacífico, com um atraso presumido de três dias; esse atraso não garante que o arquivo esteja completo.

Os cartões no topo contam:

- as palavras salvas que passam pelos filtros de texto e etiquetas;
- as **Palavras-chave observadas** no período;
- os movimentos significativos comparáveis;
- as palavras com **Posição desconhecida**.

As barras usam a mesma base e, com um clique, filtram a tabela. Esses números não são volume de busca e não cobrem todas as consultas do site. Palavras salvas para mercados diferentes ficam separadas, mas as observações abrangem todos os países e dispositivos.

Se nenhuma palavra for comparável, o cartão de movimentos mostra **Sem comparação** em vez de zero. Se todas as palavras foram observadas, o cartão **Posição desconhecida** não aponta observações ausentes. Cartões sem resultados correspondentes não são clicáveis.

## Como a posição é calculada

A posição é uma média ponderada pelas impressões. Na comparação com as consultas do Google, espaços repetidos são reduzidos e as maiúsculas seguem as regras do turco, de modo que I/ı fica separado de İ/i. As variantes originais da mesma palavra são combinadas pelas impressões.

Um dado ausente não é posição zero nem perda comprovada. Um movimento é significativo a partir de 0,5 posição; variações menores aparecem nos detalhes. "Sem comparação" não quer dizer "sem alteração".

## Examine uma palavra

A tabela mostra palavra, posição média, variação, impressões e etiquetas; no celular, as métricas aparecem abaixo da palavra. Os **Detalhes do arquivo** usam os mesmos períodos e mostram variantes originais, média anterior, dias observados e mercado salvo. Ali ficam também a data de inclusão e a intenção registrada no passado, se houver: o aplicativo não mede uma nova intenção.

**Mostrar observações diárias do arquivo** carrega o histórico dia a dia, com as mesmas datas e a mesma correspondência. Dias ausentes ficam em branco. O gráfico pode ser percorrido pelo teclado e há também uma lista em texto dos valores.

O link secundário pesquisa o texto da palavra nos últimos 28 dias de **Desempenho da pesquisa**; não é a mesma medida do arquivo.

## Filtros e ordenação

- **Contém**: todos os termos precisam aparecer. **Não contém**: nenhum dos termos pode aparecer. Cada campo aceita até 20 termos.
- **Etiquetas**: basta uma das etiquetas escolhidas; é possível selecionar até 50. Isso não limita quantas etiquetas o projeto pode ter. As contagens por etiqueta valem para o projeto inteiro.
- Filtros, faixa de posição, período, ordenação e página ficam na URL. **Limpar tudo** também remove uma faixa ativa sem resultados.

A ordem padrão é pela data de inclusão; também é possível ordenar por posição, movimento, impressões e palavra. Ordenar por **Quedas significativas** ajuda a decidir por onde começar, mas não indica a causa da queda.

A seleção de linhas vale apenas para a página atual. Enquanto um filtro ou uma atualização estiver em andamento, as ações nas linhas anteriores ficam bloqueadas. Remover palavras exige confirmação.

## Arquivo e exportação

Conexão ausente, arquivo nunca importado, cobertura parcial e falha de leitura têm, cada um, sua própria explicação. **Atualizar lista** relê apenas o banco de dados local; para baixar novos dados do Google, atualize o arquivo em **Acompanhamento de posições**. O Google pode omitir consultas raras: a falta de observações não prova que a página esteja ausente da busca.

**Baixar CSV** e **Exportar para Sheets** usam o mesmo conjunto filtrado. As primeiras colunas são palavra, intenção, etiquetas e data de inclusão; depois vêm posição atual e anterior, variação, status, dias, datas, cobertura, variantes, escopo, mercado, ID e snapshot. Medidas desconhecidas ficam vazias. Se os dados mudarem durante a exportação, comece de novo.
