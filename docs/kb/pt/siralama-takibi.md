---
title: Acompanhamento de posições
description: Acompanhe a posição média das consultas no Google e suas variações. O arquivo local guarda os dados além dos 16 meses do Search Console.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-27
---

A tela mostra as consultas da Web do Search Console arquivadas neste computador. A posição média não é uma colocação fixa válida para toda pesquisa: localização, dispositivo e contexto a alteram. Impressões não são volume de busca.

## Por onde começar

O resumo conta as consultas observadas nos dois períodos e as que se moveram pelo menos meia posição. Comparações que não podem ser calculadas são contadas à parte. Abra primeiro a queda sugerida. A prioridade multiplica a variação absoluta pelas impressões registradas: não é uma estimativa de cliques perdidos. Cada lista mostra três consultas; expandida, chega a cinco, e só pode ser expandida com mais de três movimentos.

Se nenhuma consulta foi observada nos dois períodos, subidas e quedas não podem ser calculadas. O cartão de movimentos explica isso em vez de mostrar um movimento igual a zero.

## Datas e cobertura

O período pode ser de 30, 90, 180, 480 ou 1825 dias. A última opção cobre os últimos cinco anos do arquivo, não o histórico inteiro. Os meses indicados são aproximados; os detalhes mostram as datas exatas no calendário America/Los_Angeles. A data final presume três dias de atraso e não verifica em tempo real se os dados estão completos. A importação pede ao Google apenas dados definitivos.

Os dias são contados por estado: resposta completa da API, limite do aplicativo atingido, falha ou cobertura desconhecida. Dias importados no passado não são declarados completos depois. Mesmo uma resposta completa exclui as consultas que o Google oculta ou omite. A última observação e a última data analisada são informações diferentes. Completar o arquivo pode exigir várias execuções; durante a sincronização, o histórico existente continua disponível.

## Como o arquivo é preenchido

Enquanto esta tela está aberta, os dias que faltam são carregados sozinhos; **Desempenho da pesquisa** também atualiza o arquivo quando está aberta. Com as duas telas fechadas, ou com o aplicativo fechado, nada é baixado.

- Depois de cada transferência parcial, o aplicativo espera 15 segundos antes de pedir o bloco seguinte.
- Quando o arquivo está em dia, ele verifica de novo a cada 15 minutos.
- Depois de um erro de conexão ou de cota, ele espera 15 minutos antes de tentar de novo.
- Depois de um erro de autorização, você precisa renovar a conexão.

**Continuar a preencher o arquivo** retoma a transferência manualmente. A primeira importação começa no início da janela de 16 meses do Google; dias que o Google não fornece mais não podem ser recuperados. Cada execução trata no máximo quatro janelas de tempo; janelas com muitas linhas são divididas por dia e retomadas nas execuções seguintes. Para um dia, o aplicativo lê até 50.000 linhas; um dia que continua incompleto fica marcado como tal.

## Distribuição e pesquisa

A distribuição inclui todas as consultas observadas no período atual. As posições são arredondadas: 3,4 entra no primeiro grupo e 3,5 no segundo. O tamanho das barras é relativo ao maior grupo; a porcentagem é a participação nas consultas observadas. As variações dos grupos são líquidas e usam as mesmas consultas comparáveis. Uma comparação ausente não vira zero.

A pesquisa e os filtros atuam sobre todas as consultas, sem o antigo limite de cem. Os contadores consideram o texto pesquisado e os demais filtros ativos. O filtro do quartil superior por impressões inclui os empates. O filtro "top 10" inclui consultas sem observação anterior; as saídas do top 10 exigem dados nos dois períodos. Um botão remove todos os filtros. As páginas mostram 25, 50 ou 100 linhas; o número de linhas não altera os resumos.

As consultas observadas antes, mas ausentes no período atual, aparecem em uma lista separada. A ausência delas não prova perda de posição nem posição zero. A lista mostra as 25 primeiras por impressões e também respeita o texto pesquisado.

## Leia o histórico

As posições médias são ponderadas pelas impressões. A variação é a média anterior menos a média atual. Abaixo de 0,05 posição, a variação é neutra; o filtro de movimentos significativos usa 0,5. O detalhe de uma consulta usa a mesma comparação entre períodos da tabela. O primeiro e o último dia registrados são observações separadas.

O número de dias observados está sempre visível: 10 dias em 90 não são cobertura completa. Os pontos diários seguem o calendário real e os dias ausentes interrompem a linha. As datas podem ser percorridas com as teclas de seta, Home e End; os valores diários aparecem ao expandir a lista. Semanas totalmente sem dados ficam em branco; as semanas nas extremidades do período podem ser parciais.

O link para **Desempenho da pesquisa** mantém a consulta exata e as datas do arquivo. Se o período ultrapassar a retenção de dados do Google, a primeira data disponível é informada antes de abrir a página.

A tela não oferece posições de concorrentes, volume de busca nem previsões de tráfego.
