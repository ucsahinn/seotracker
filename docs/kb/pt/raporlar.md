---
title: Relatórios e modelos
description: Todo relatório que você baixa de uma auditoria ou do Desempenho da pesquisa, ou que o seu assistente escreve, é um único arquivo HTML. Você abre no celular, imprime ou envia por e-mail.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-27
---

Aqui você encontra como obter um relatório, para quem enviá-lo e como repeti-lo com um modelo.

A tela **Relatórios** guarda todos os relatórios feitos para este projeto em uma única lista. Um relatório nasce de três formas. O botão **Baixar relatório** da tela **Auditoria do site** produz o relatório da auditoria. O botão **Baixar relatório** da tela **Desempenho da pesquisa** produz um relatório da visão mostrada. O seu assistente de IA também pode pesquisar um assunto e salvar o que encontrou como relatório. Cada relatório é um único arquivo HTML, sem scripts (código que roda na página), recursos externos nem fontes embutidas. Por isso ele abre no celular, pode ser impresso como PDF e enviado por e-mail. O aplicativo não tem um editor para escrever relatório à mão: quem escreve é o aplicativo ou o assistente.

## O que há na tela

**Barra superior.** Os botões **Atualizar**, **Copiar prompt do relatório** e **Modelos**. **Copiar prompt do relatório** coloca na área de transferência um texto que você cola no seu assistente. Se ainda não há relatório, esse botão fica dentro do cartão do estado vazio.

**Quadros de resumo.** São três.

- **Último relatório**: há quanto tempo o último relatório foi escrito ou atualizado. O link abaixo abre o relatório.
- **Nos últimos 7 dias**: o número de relatórios escritos ou atualizados nesse período.
- **Total**: todos os relatórios. Abaixo você vê quantos são relatórios de auditoria, quantos vieram de uma competência e quantos de um modelo.

**Relatórios por tipo.** Um gráfico de anel divide os relatórios por tipo. Um clique num tipo restringe a lista aos relatórios desse tipo. Outro clique tira o filtro.

**Como funciona?** Uma explicação curta que vem fechada. Ela explica a diferença entre os relatórios escritos pelo agente e o relatório da auditoria do site.

**Filtros.** Todos, Últimos 7 dias, Criado com modelo, Criado com uma skill. Ao lado fica a caixa **Pesquisar relatórios**.

**Tabela.** Tem as colunas **Relatórios**, **Tipo**, **Criado** e **Tamanho**. Clique no título para ordenar. **Tipo** diz de onde veio o relatório. Por exemplo, "Relatório de auditoria do site" é feito pelo próprio aplicativo. O que o assistente escreve leva nomes como "Auditoria de SEO", "Comparação de períodos", "Análise da queda de tráfego", "Relatório de SEO", "Nota de orientação" ou "Configuração do projeto". Um relatório de tipo desconhecido diz "Não especificado". Nos relatórios escritos com modelo, aparece o nome do modelo. A lista mostra os últimos 100 relatórios. Se houver mais, uma nota abaixo avisa.

**Página do relatório.** O relatório abre em um quadro próprio, isolado. Botões: **Baixar como HTML**, **Salvar como PDF (imprimir)**, **Abrir em uma nova aba**. O menu **Mais ações** tem **Copiar link**. O link só funciona nesta instalação, ninguém de fora consegue acessar. A página também diz quem criou o relatório, o tipo, quando foi criado e atualizado e o tamanho.

**Modelos de relatório.** Você chega a eles pelo botão **Modelos**. Um modelo é uma receita salva que diz ao seu assistente como escrever o relatório: quem vai ler, quais seções terá e em que idioma será escrito. São três campos:

- **Nome**: no máximo 80 caracteres, único no projeto.
- **Descrição**: no máximo 200 caracteres. Uma frase que diz quando usá-lo.
- **Instrução**: no máximo 3.000 caracteres.

Um projeto pode ter no máximo 10 modelos. Excluir um modelo não exclui os relatórios feitos com ele.

## Os relatórios do próprio aplicativo

**Relatório de auditoria do site.** Produzido por **Baixar relatório** nos detalhes da auditoria. Se a auditoria parou no meio, "(parcial)" é acrescentado ao título do relatório. Por exemplo "Auditoria do site exemplo.com.br (parcial)". A capa de um relatório assim traz o aviso "O relatório pode estar incompleto." e o motivo: a auditoria parou com um erro, ainda está em execução ou nenhuma página pôde ser rastreada. Um relatório parcial não tem seções de pontuação. Se o rastreamento parou cedo por causa do limite de taxa do site, a capa diz "Auditoria incompleta, sem pontuação". Se poucas verificações foram medidas, a pontuação é escrita como "Pontuação provisória" junto com a cobertura das medições. O resumo do relatório também informa a situação. Assim, um assistente que lê a lista de relatórios sabe que um relatório está incompleto.

**Relatório de desempenho da pesquisa.** Produzido por **Baixar relatório** na tela Desempenho da pesquisa. Ele transforma a visão que você está olhando na tela (período, dispositivo, país, tipo de pesquisa) em um documento imprimível. A capa traz os dias finais, a comparação, os filtros, a data dos últimos dados e a hora da criação. Depois vêm os quatro totais, a caixa "Status dos dados", os trabalhos em **Comece por estas**, o gráfico **Ao longo do tempo** (com as atualizações do Google e as notas marcadas), as oportunidades, as alterações e as páginas concorrentes para a mesma consulta. Os números são os mesmos da tela. Pegá-lo de novo com o mesmo site, o mesmo intervalo de datas e os mesmos filtros não acrescenta um relatório novo. Ele atualiza o relatório anterior do aplicativo. Se o relatório passar do limite de armazenamento, você é convidado a escolher um período ou filtro mais curto.

Os dois relatórios são salvos primeiro e depois baixados para o seu computador. Se o download falhar por algum motivo, o relatório continua na lista **Relatórios**. Baixe-o de lá.

## Como usar

1. Para o primeiro relatório, clique em **Baixar relatório** na tela Auditoria do site. O relatório é baixado para o seu computador e também aparece nesta lista. Ele começa com a seção "N coisas para fazer esta semana".
2. Para documentar a sua situação nas pesquisas, ajuste o período e os filtros na tela Desempenho da pesquisa e clique em **Baixar relatório**.
3. Se você trabalha com um assistente, clique em **Copiar prompt do relatório**. Cole o texto copiado no Claude Code, no Codex ou no Cursor. O assistente pergunta qual relatório você quer, lê os dados e salva o relatório aqui.
4. Se você quer o mesmo relatório todo mês, escreva um modelo. Na instrução, escreva o leitor ("quem toca o site, não conhece SEO"), as seções, a ordem e o tom. Se você pedir o modelo pelo nome, o assistente o aplica.
5. Para compartilhar, clique em **Baixar como HTML** e envie o arquivo. Quem receber abre o arquivo no navegador. Um link copiado só funciona no mesmo computador.
6. Não apague relatórios antigos. Na próxima conversa, o assistente lê o resumo do relatório anterior e compara.

## Como os números são calculados

O relatório de auditoria é diagramado para impressão em A4. Ele tem sumário, "N coisas para fazer esta semana", problemas, medição de velocidade, status do índice do Google e mapa do site. A seção do status do índice usa só respostas salvas e não faz perguntas novas ao Google.

As listas têm limite: 50 endereços por problema, 300 páginas, 50 linhas de velocidade, 3.000 endereços no apêndice. Se o arquivo passar de 400 KB, as listas ficam mais curtas.

Um relatório pode ter no máximo 500.000 bytes (abaixo de 80 KB é o recomendado). O título tem no máximo 120 caracteres e é único no projeto. O resumo tem no máximo 2.500 caracteres. Um segundo relatório com o mesmo título não é aceito. Um projeto pode ter no máximo 10.000 relatórios, e a instalação reserva 5 GB no total.

Por segurança, na hora de salvar, arquivos que contenham script, iframe (uma caixa que embute uma página dentro de outra), formulário, estilo externo, manipulador de evento (como onclick), link javascript: ou redirecionamento automático são rejeitados. Ao abrir, o relatório também é mostrado em um quadro lacrado, sem acesso à rede. Ou seja, um relatório não consegue enviar nada para fora sem você saber.

## Perguntas frequentes

**Quem escreveu o relatório?** A coluna **Tipo** diz. "Relatório de auditoria do site" vem do aplicativo, todos os outros vêm do assistente. A página do relatório também mostra quem o salvou.

**O título diz "(parcial)", o que faço?** A auditoria parou no meio. A capa do relatório diz o motivo. Execute a auditoria de novo e baixe o relatório de novo.

**Posso editar o relatório?** No aplicativo, não. Diga ao assistente "mude esta seção" e ele atualiza o relatório.

**Mandei o link e a outra pessoa não consegue abrir.** O link só funciona neste computador. Envie o arquivo com **Baixar como HTML**.

**O que devo observar ao escrever um modelo?** Um modelo é uma receita de formato, não uma fonte de informação. Escreva as seções, o tom e para quem o relatório é escrito. Não escreva números nem afirmações. O assistente pega os números nos dados a cada vez.

## Limites

Os relatórios nunca são publicados fora. Para compartilhar, você envia o arquivo. A precisão de um relatório depende dos dados que quem o escreveu leu. A seção "Como este relatório foi preparado" no fim dos relatórios do assistente lista qual ferramenta deu qual informação. Para um número de que você duvida, siga a fonte a partir dali.

<!-- Fontes: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; ReportsSummary.tsx; ReportKindsHelp.tsx; ReportKindChip.tsx; reportStats.ts; reportRequestPrompt.ts; src/client/features/search-performance/SearchReportButton.tsx; src/serverFunctions/searchReport.ts; src/server/features/search/report/buildSearchReportHtml.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts; reportCoverSection.ts -->
