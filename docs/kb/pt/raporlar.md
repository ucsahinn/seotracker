---
title: Relatórios e modelos
description: Os relatórios que você baixa de uma auditoria ou pede ao seu assistente são um único arquivo HTML. Abre no celular, pode ser impresso e pode ser compartilhado.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-22
---

Nesta página você aprende a obter relatórios, a compartilhá-los e a repeti-los com um modelo.

A tela **Raporlar** (Relatórios) guarda em uma única lista todos os relatórios feitos para este projeto. Um relatório vem de uma de duas formas. O botão **Raporu indir** (Baixar o relatório), na tela **Site denetimi** (Auditoria do site), gera o relatório do próprio aplicativo. O seu assistente de IA faz uma pesquisa e salva o que encontrou como relatório. Cada relatório é um único arquivo HTML. Não tem script (código que roda na página), nem recursos externos, nem fontes embutidas. Por isso abre no celular, pode ser impresso como PDF e pode ser enviado por e-mail. Não há no aplicativo um editor para escrever um relatório à mão. Quem escreve o relatório é o aplicativo ou o assistente.

## O que há na tela

**Barra superior.** O botão **Yeni rapor iste** (Pedir um novo relatório) copia para a área de transferência um texto que você cola para o seu assistente.

**Filtros.** Tümü (Todos), Son 7 gün (Últimos 7 dias), Şablonla yazılan (Escritos com um modelo), Beceriyle yazılan (Escritos com uma skill). Há também uma caixa de busca.

**Tabela.** Tem as colunas **Rapor** (Relatório), **Tür** (Tipo), **Oluşturulma** (Criação) e **Boyut** (Tamanho). **Tür** diz qual trabalho produziu o relatório. Por exemplo, "Site denetimi raporu" (Relatório de auditoria do site) é do próprio aplicativo. Para relatórios escritos com um modelo, aparece o nome do modelo.

**Página do relatório.** O relatório abre em um quadro seguro próprio. Botões: **HTML olarak indir** (Baixar como HTML), copiar o link e imprimir. O link só abre nesta instalação. Não há acesso de fora.

**Modelos de relatório.** Você os acessa pelo menu ou pela tela Raporlar. Um modelo é uma receita salva que diz ao seu assistente como escrever o relatório: quem vai lê-lo, quais seções ele terá, em que idioma será escrito. Campos:

- **Ad** (Nome): no máximo 80 caracteres, único no projeto.
- **Açıklama** (Descrição): no máximo 200 caracteres. Uma frase que diz quando usar.
- **Yönerge** (Instrução): no máximo 3.000 caracteres.

Um projeto pode ter no máximo 10 modelos. Excluir um modelo não exclui os relatórios feitos com ele.

## Como usar

1. Para o seu primeiro relatório, clique em **Raporu indir** na tela Site denetimi. O relatório é baixado para o seu computador e cai nesta lista. Ele começa com a seção "Bu hafta yapılacak N şey" (N coisas a fazer esta semana).
2. Se você trabalha com um assistente, clique em **Yeni rapor iste**. Cole o texto copiado no Claude Code, no Codex ou no Cursor. O assistente pergunta qual relatório você quer, lê os dados e salva o relatório aqui.
3. Se você quer o mesmo relatório todo mês, escreva um modelo. Na instrução, escreva o leitor ("a pessoa que cuida do site, não conhece SEO"), as seções, a ordem e o tom. Se você pedir o modelo pelo nome, o assistente o aplica.
4. Para compartilhar, clique em **HTML olarak indir** e envie o arquivo. Quem o recebe abre o arquivo em um navegador. Copiar o link funciona apenas no mesmo computador.
5. Não apague relatórios antigos. Na conversa seguinte, o assistente lê o resumo do relatório anterior e compara.

## Como os números são calculados

O relatório de auditoria é diagramado para impressão em A4. Tem estas seções: sumário, "Bu hafta yapılacak N şey", problemas, medição de velocidade, status de indexação no Google e mapa do site. A seção de status de indexação usa apenas respostas já salvas e não faz perguntas novas.

As listas são limitadas: 50 endereços por problema, 300 páginas, 50 linhas de velocidade, 3.000 endereços no anexo. Se o arquivo passar de 400 KB, as listas ficam mais curtas.

Um relatório pode ter no máximo 500.000 bytes (recomenda-se menos de 80 KB). O título tem no máximo 120 caracteres e é único no projeto. O resumo tem no máximo 2.500 caracteres. Um segundo relatório com o mesmo título não é aceito. Um projeto pode ter no máximo 10.000 relatórios, e a instalação tem 5 GB de espaço no total.

Segurança: ao salvar, são recusados os arquivos que contêm um script, um iframe (uma caixa que embute uma página dentro de outra), um formulário, um estilo externo, um manipulador de evento (como onclick), um link javascript: ou um redirecionamento automático. Quando um relatório é aberto, ele também é mostrado em uma caixa fechada, sem acesso à rede. Assim, um relatório não pode enviar nada para fora sem que você saiba.

## Perguntas frequentes

**Quem escreveu o relatório?** A coluna **Tür** informa. "Site denetimi raporu" é do aplicativo, os demais são do assistente. A página do relatório também mostra quem o salvou.

**Posso editar o relatório?** Não no aplicativo. Diga ao assistente "mude esta seção", e o assistente atualiza o relatório.

**Enviei o link e a outra pessoa não consegue abrir.** O link funciona apenas neste computador. Envie o arquivo com **HTML olarak indir**.

**No que devo prestar atenção ao escrever um modelo?** Um modelo é uma receita de formato, não uma fonte de informação. Escreva as seções, o tom e para quem é escrito. Não escreva números nem afirmações. O assistente pega os números dos dados todas as vezes.

## Limites

Os relatórios não são publicados para fora. O compartilhamento é feito enviando o arquivo. Um relatório é tão exato quanto os dados que o seu autor leu. A seção "Bu rapor nasıl hazırlandı" (Como este relatório foi preparado), no fim dos relatórios do assistente, lista qual ferramenta disse o quê. Rastreie por ali um número de que você duvide.

<!-- Kaynaklar: src/routes/_project/p/$projectId/reports/index.tsx; reports/$reportId.tsx; reports/templates.tsx; src/client/features/reports/ReportsList.tsx; reportStats.ts; reportRequestPrompt.ts; src/server/features/reports/services/ReportService.ts; src/types/schemas/reports.ts; src/types/schemas/report-templates.ts; src/routes/r/$reportId.ts; src/shared/report-sandbox.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
