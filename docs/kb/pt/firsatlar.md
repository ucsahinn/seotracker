---
title: Oportunidades
description: Qual página trabalhar primeiro: páginas que o Google já mostra, ordenadas pelo máximo de cliques extras do Search Console, com o trabalho sugerido.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-27
---

O cálculo usa os dados do Search Console do projeto e as taxas de cliques do próprio site. Para cada página, indica um tipo de trabalho sugerido e um limite máximo de cliques adicionais. Não é um resultado esperado nem uma garantia.

## Por onde começar

**Comece por aqui** abre a página com o maior limite de cliques adicionais entre as que podem ser estimadas, junto com o trabalho a verificar. A facilidade e o prazo do trabalho não são medidos.

Cada página entra em um tipo de trabalho conforme as pesquisas medidas:

| Tipo de trabalho                      | Situação                                                                                    | Ação sugerida                                           |
| ------------------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Título e descrição**                | Na primeira página, mas com menos cliques que as outras pesquisas do site na mesma posição. | **Reescreva o título e a descrição**                    |
| **Na primeira página, posições 4-10** | Abaixo dos três primeiros resultados. Subir uma faixa aumenta bem os cliques.               | **Reforce o conteúdo**                                  |
| **Na segunda página, posições 11-20** | Logo depois da primeira página; recebe poucos cliques até chegar lá.                        | **Adicione links internos, amplie o conteúdo**          |
| **Longe, depois da posição 20**       | Tem impressões, mas uma posição baixa.                                                      | **Analise a intenção de busca e a cobertura da página** |

Para uma página com ganho desconhecido, o trabalho sugerido depende apenas da posição média:

| Posição    | Trabalho sugerido             |
| ---------- | ----------------------------- |
| 1–5        | revisar título e snippet      |
| 6–10       | melhorar o conteúdo           |
| 11–20      | links internos e conteúdo     |
| 21 ou mais | verificar a intenção de busca |

A sugestão não prova CTR baixo nem ganho futuro.

## Datas e escopo

O período pode ser de 7, 28 ou 90 dias. O Search Console usa dias completos do calendário do Pacífico. Se o Google não informar até quando os dados estão completos, o aplicativo declara o atraso que presumiu. As datas efetivas de início e fim continuam visíveis. O Analytics lê as mesmas datas no fuso horário da propriedade, então o intervalo de tempo pode ser diferente.

O **limite máximo em base de 30 dias** converte o período escolhido para 30 dias. Não é uma previsão mensal, uma garantia nem um volume de busca. Cobre apenas consultas recebidas, identificáveis e com dados suficientes. A participação das consultas ocultas é desconhecida; os limites de linhas são informados. A estimativa por consulta do Painel usa outro modelo: não some os dois números. A comparação com os cliques atuais usa todos os cliques das páginas candidatas, inclusive os de marca.

## Lista e filtros

Os filtros por tipo de trabalho e por conversão se combinam (os dois precisam valer). O servidor filtra todas as páginas candidatas antes de mostrar as primeiras 25, 50 ou 100; os totais gerais não mudam. Uma página pode entrar em vários tipos de trabalho, então as contagens por tipo não se somam. Período, número de linhas e filtros ficam na URL. **Mostrar páginas com conversões** só aparece quando há conversões confirmadas.

No computador, a lista é uma tabela ordenável; no celular, cada página é uma linha com o botão **Detalhes**. Os detalhes mostram impressões, posição, faixa de posição alvo e a contribuição atribuída a cada consulta. Aparecem as dez principais consultas e, à parte, o restante: juntos, correspondem ao limite da página. A diferença de CTR, em pontos percentuais, usa apenas consultas sem marca comparáveis, com a mesma base de impressões.

## Ganho desconhecido

Páginas com impressões, mas sem estimativa, também aparecem: primeiro as estimadas, por ganho, depois as demais, por impressões. **Ganho desconhecido** não significa zero; os totais somam apenas os ganhos calculados. Consultas sem correspondência, impressões insuficientes e taxas-alvo ausentes são contadas à parte de um zero medido. Se o Google não devolver linhas, isso não prova ausência de impressões.

Com ganho desconhecido, examine primeiro a página e as consultas observadas; altere título ou conteúdo somente depois de confirmar uma incompatibilidade. Os detalhes listam as consultas sem marca por impressões e sinalizam as páginas que recebem apenas buscas de marca. Se nenhum ganho puder ser calculado, os tipos de trabalho mostram o número de páginas candidatas sem barras.

Poucos dados não significam potencial zero. A falta de consultas sem marca utilizáveis pode vir de consultas ocultas, da exclusão da marca ou de limites dos dados. Para examinar as consultas com impressões, abra **Desempenho da pesquisa**. Os detalhes do cálculo ficam na seção recolhida **Cobertura dos dados e cálculo**.

## Dados do Analytics

O Analytics acrescenta sessões orgânicas, eventos principais e a participação das sessões com um evento principal, como foram medidos. Ele não projeta eventos futuros a partir dos cliques adicionais. Métricas restritas continuam desconhecidas. Várias variantes de um URL podem compartilhar o mesmo grupo do Analytics: não some as sessões dele em várias linhas. O resumo de conversões separa as páginas correspondidas das que têm status desconhecido; a falta de cobertura do Analytics não equivale a zero conversões. Dados ausentes do Analytics são explicados nos detalhes da página, não linha por linha.

- **Cota esgotada**: aguarde e atualize.
- **Permissões ausentes**: confira a conexão do projeto.
- **Falha na atualização**: os dados anteriores permanecem, com as datas originais e um aviso.

**Examinar grupo de endereços do Analytics**, na linha ou nos detalhes, abre as páginas de destino orgânicas com as datas da fonte e o grupo de endereços normalizado. Se o endereço ou as datas não puderem ser correspondidos, uma explicação substitui o link. O grupo é filtrado antes da paginação, nas mesmas linhas de origem usadas por Oportunidades (no máximo 1.000). O Analytics informa os limites que impedem verificar o grupo inteiro.

## Exporte e verifique o resultado

**CSV** e **Exportar para Sheets** incluem as linhas filtradas visíveis, as datas observadas, a unidade normalizada, o modelo, a propriedade, a origem dos termos de marca, os limites da fonte e o grupo do Analytics. O ganho desconhecido fica em branco; entram status, motivo, indicador de marca e consultas observadas. A gravação no Sheets só acontece quando você escolhe a exportação.

**Abrir em Desempenho da pesquisa** mantém as datas de início e fim e abre os detalhes do URL exato. Se um período não puder ser lido, a tela explica em vez de substituir as datas.

Depois de uma alteração, anote-a e compare cliques, CTR e posição medidos em períodos equivalentes. Uma estimativa em queda, sozinha, não prova sucesso. Uma posição baixa ou uma estimativa pequena não justificam apagar conteúdo; considere unir duas páginas só depois de confirmar que atendem à mesma necessidade.
