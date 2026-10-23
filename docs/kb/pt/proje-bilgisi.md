---
title: Informações do projeto
description: O lugar onde você escreve o que não está escrito em nenhum outro lugar sobre o seu site: um resumo do negócio, o objetivo, os concorrentes, as páginas-chave. O seu assistente lê isso antes de começar o trabalho.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-22
---

Esta página explica como contar ao seu assistente sobre o seu site uma única vez.

A tela **Proje bilgisi** (Informações do projeto) é onde você escreve o que o Google não sabe. Você escreve o que vende, qual é o objetivo agora, quem é o seu concorrente, quais páginas dão dinheiro e como você quer que as coisas sejam escritas. Você ou o seu assistente de IA (a tela diz "ajan", agente) preenchem a tela. O assistente a lê antes de começar o trabalho e escreve aqui o que aprende. Se você vir algo errado, corrija você mesmo. Ela é útil mesmo que você não use um assistente. Daqui a seis meses, a resposta para "por que nos concentramos nesta página" estará aqui.

## O que há na tela

**Quatro seções principais.** **İşin özeti** (Resumo do negócio), **Şu anki hedef** (Objetivo atual), **Konumlandırma** (Posicionamento) (como você se descreve no mercado) e **Yazım tercihleri** (Preferências de escrita). Cada uma é texto livre, com no máximo 4.000 caracteres. Abaixo, aparece quem a atualizou e quando.

**Seções personalizadas.** Para assuntos que não cabem nas quatro seções, você abre o seu próprio título. Pode haver no máximo 20 seções personalizadas, e um título tem no máximo 120 caracteres.

**Concorrentes.** O nome de domínio é obrigatório. Escrever um nome e uma nota é opcional. Você pode adicionar no máximo 100 concorrentes, e uma nota tem no máximo 500 caracteres. O aplicativo não puxa os dados do concorrente. A lista serve para você e o seu assistente se lembrarem.

**Páginas-chave.** Você escreve o endereço, a função, o assunto e uma nota. As funções são:

- **Merkez sayfa** (Página central): a página de entrada de um assunto.
- **Destek sayfası** (Página de apoio): uma subpágina que alimenta a página central.
- **Dönüşüm sayfası** (Página de conversão): uma página que dá dinheiro ou tem um formulário.
- **Diğer** (Outra).

Você pode adicionar no máximo 100 páginas. Os endereços são corrigidos para começar com https.

**Registro de pesquisas.** São notas datadas que o assistente deixa, dizendo "pesquisei isto, e deu isto". Só o assistente as escreve, e cada nota tem no máximo 1.000 caracteres. Você pode excluí-las. As notas são excluídas sozinhas depois de 90 dias. A tela mostra as 20 notas mais recentes.

**Cartão do agente.** Oferece dois textos prontos: "Ajanınıza doldurtun" (Peça ao seu agente que preencha) e "Ajanınıza gözden geçirtin" (Peça ao seu agente que revise). Você o copia com **İstemi kopyala** (Copiar o prompt) e o cola para o seu assistente. Em um projeto vazio, o primeiro texto faz o assistente lhe fazer algumas perguntas e preencher as seções.

## Como usar

1. Assim que abrir o projeto, escreva três ou cinco frases em **İşin özeti**. Escreva o que você vende, para quem vende, os idiomas do seu site e a sua página de conversão. Todo relatório do assistente se baseia nesse parágrafo.
2. Escreva **Şu anki hedef** de forma concreta. Não escreva "tráfego". Escreva "páginas de produto entrando no índice (a lista de páginas do Google)" ou "cinco pedidos por mês pelo formulário de demonstração". O assistente ordena as sugestões por isso.
3. Em **Önemli sayfalar** (Páginas importantes), adicione primeiro as páginas de conversão e depois as páginas centrais. O assistente entende por aqui qual trabalho colocar primeiro.
4. Em **Yazım tercihleri**, escreva as palavras que não devem ser usadas e o tom. Exemplos: "não diga líder do setor", "trate por você", "informe o número da versão". Os relatórios do assistente seguem essas regras.
5. Se você usa um assistente, copie e cole o texto **Ajanınıza doldurtun** no primeiro dia. O assistente preenche as seções conversando com você. Uma vez por mês, leia o registro de pesquisas e corrija o que estiver errado.

## Como os números são calculados

Não há números calculados nesta tela, apenas limites. Eles estão escritos acima.

O assistente pode fazer no máximo 50 alterações por vez. Cada alteração é gravada imediatamente, e nenhuma aprovação é pedida. Por isso, adquira o hábito de dizer ao seu assistente "pergunte-me antes de gravar". As skills bem construídas de assistentes já perguntam.

O endereço de uma página-chave tem no máximo 2.048 caracteres. O nome de domínio de um concorrente tem no máximo 255 caracteres, e um nome tem no máximo 120. O aplicativo grava a data das notas do registro, e o assistente não pode inventar uma data.

## Perguntas frequentes

**O assistente escreveu algo errado. O que faço?** Abra a seção e corrija. Quem atualizou por último passa a ser "você" ("siz"). O assistente vê a sua versão na próxima vez que ler.

**Adicionei um concorrente, mas não vieram dados.** Não virão. O aplicativo não puxa dados de concorrentes. A lista existe para que o assistente saiba o que olhar quando pesquisa na web.

**Uma nota do registro sumiu.** As notas com mais de 90 dias são excluídas. Passe as informações duradouras para as seções. O registro é um caderno temporário.

**Estas informações vão para o Google?** Não. Elas ficam guardadas neste computador. Só o assistente que você conectou as lê.

## Limites

A tela é texto livre. Ela não confere se o que você escreve é coerente. Se você escrever algo contraditório, o assistente pode não notar a contradição. Concorrentes e páginas-chave são uma lista de lembrete, não uma ferramenta de acompanhamento. Só o assistente escreve o registro de pesquisas. Escreva as suas próprias notas nas seções.

<!-- Kaynaklar: src/routes/_project/p/$projectId/context.tsx; src/routes/_project/p/$projectId/settings/context.tsx; src/client/features/projects/context/sectionCopy.ts; src/server/features/project-context/*; src/types/schemas/projectContext.ts; src/server/mcp/server.ts (update_project_context) -->
