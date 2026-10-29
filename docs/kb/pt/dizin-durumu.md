---
title: Status de indexação
description: O Google colocou cada página no índice? Se não, por quê, e quando ele a rastreou pela última vez? No máximo 2.000 consultas por dia.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

A auditoria do site verifica se uma página abre, mas não consegue saber se o Google a colocou no índice dele. A aba **Status de indexação**, dentro de **Auditoria do site**, pergunta isso ao Google pela Inspeção de URL do Search Console e guarda as respostas neste computador. Uma página só é consultada de novo quando a resposta dela fica antiga.

Essa economia importa: o Google concede 2.000 consultas por dia para cada propriedade do Search Console, e o aplicativo e o agente conectado dividem a mesma cota.

## O que a aba contém

**Anel "O que o Google fez com essas páginas?"** Divide as páginas rastreadas em três grupos:

- **No Google**: a página pode aparecer na busca.
- **Não indexado**: o Google a analisou, mas não a incluiu.
- **Aguardando uma resposta**: a página ainda não foi consultada ou o Google não respondeu.

**Quadros de resumo.** Mostram quantas páginas foram consultadas, quantas estão no índice, quantas não estão e quantas aguardam. **Páginas onde o Google escolheu um canônico diferente** conta as páginas em que o endereço escolhido pelo Google difere do canonical declarado no site. Uma diferença apenas na barra final também conta. **Páginas desta auditoria ainda não verificadas no Google** indica quantas páginas faltam consultar.

**Verificar o status no Google.** Cada clique consulta no máximo 25 páginas, começando pelas que nunca foram consultadas e depois pelas que têm a resposta vencida há mais tempo. Quando a cota diária se esgota, aparece um aviso. O botão fica desativado se:

- o Search Console não estiver conectado;
- não houver mais páginas para consultar;
- o domínio auditado não pertencer à propriedade conectada, por exemplo porque outro site foi auditado.

**Tabela.** As colunas são **Página**, **Status**, **Motivo**, **URL canônico selecionado pelo Google** e **Último rastreamento do Google**. O status é "No Google", "Não verificado", "Sem resposta", "Erro" ou um dos 18 status do Google, traduzido. Alguns exemplos:

- "Descoberto, atualmente não indexado"
- "Excluído pela tag 'noindex'"
- "Bloqueado por robots.txt"
- "Soft 404"
- "URL desconhecido para o Google"

A tabela pode ser baixada em CSV.

## Passo a passo

1. Quando a auditoria terminar, abra a aba. Se muitas páginas estiverem em **Aguardando uma resposta**, clique em **Verificar o status no Google**: cada clique avança 25 páginas, e em um site pequeno poucos cliques bastam.
2. Examine primeiro o grupo **Não indexado**. A coluna **Motivo** traz a explicação do Google, que muitas vezes já indica a solução:
   - "Bloqueado por robots.txt": remova o bloqueio.
   - "Excluído pela tag 'noindex'": remova a tag.
   - "Descoberto, atualmente não indexado": em geral, basta esperar.
3. Adicione ao sitemap as páginas importantes marcadas como "URL desconhecido para o Google" e envie o sitemap no Search Console. Para algumas páginas especialmente importantes, use no Search Console o comando "Solicitar indexação".
4. Se o quadro de canônicos diferentes não estiver zerado, leia a coluna **URL canônico selecionado pelo Google**: o Google não aceitou o endereço principal declarado. Corrija o canonical ou adote o endereço escolhido pelo Google.
5. Consulte de novo depois de alguns dias. Só as respostas antigas são consultadas outra vez, então a cota não é desperdiçada.

## Como os números são calculados

Se o Google responder "no índice", a página fica em **No Google**. Qualquer outra resposta do Google ("fora do índice" ou indefinida) coloca a página em **Não indexado**. Sem resposta, a página continua em **Aguardando uma resposta**.

Uma resposta fica antiga depois de 14 dias para uma página no índice e depois de 3 dias para uma página não indexada ou com erro. Uma página nunca consultada está sempre pronta para consulta. A cota diária é calculada sobre as consultas das últimas 24 horas. O aplicativo conta apenas as próprias consultas: as inspeções feitas manualmente no Search Console não entram no contador, mas reduzem a cota real do Google.

Se o último rastreamento do Google tiver mais de 90 dias, a auditoria do site registra o problema "O Google não rastreia esta página há muito tempo". As respostas antigas são reunidas em um único problema, "As respostas do Google para algumas páginas estão desatualizadas".

## Perguntas frequentes

**De quem é o limite de 2.000?** Da propriedade. Dois projetos conectados à mesma propriedade e o agente usam a mesma cota.

**O que fazer com uma página "Descoberto, atualmente não indexado"?** Muitas vezes, nada: em sites novos, o Google pode levar semanas. Um link a partir das páginas rastreadas com mais frequência pode acelerar o processo.

**A aba informa ao Google sobre páginas novas?** Não, ela só pergunta. Para informar páginas novas, use o sitemap e "Solicitar indexação" no Search Console.

## Limites

A aba mostra apenas o que o Google responde, e o Google pode deixar alguns campos vazios. O limite de 2.000 consultas por dia não pode ser ultrapassado: verificar um site de 10.000 páginas leva cinco dias. Só as páginas rastreadas pela auditoria são consultadas; endereços que ficaram fora da auditoria não aparecem.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
