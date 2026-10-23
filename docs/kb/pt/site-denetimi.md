---
title: Auditoria do site
description: O aplicativo percorre o seu site página por página, confere 95 regras e ordena os problemas por importância, cada um com o que fazer a respeito.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-22
---

Esta página explica como encontrar os problemas do seu site e corrigi-los.

O aplicativo percorre o seu site com o seu próprio rastreador (um programa que abre e lê as páginas uma a uma). Ele procura links quebrados, títulos ausentes e páginas lentas. No fim, você recebe uma pontuação e uma lista de problemas em ordem de importância. Sob cada problema, ele diz como corrigir.

## O que há na tela

**O cartão "Yeni denetim başlat" (Iniciar uma nova auditoria).** Tem três campos.

- **Taranacak site adresi** (Endereço do site a rastrear): o nome de domínio do seu projeto já vem preenchido.
- **Kaç sayfa taransın?** (Quantas páginas rastrear?): no mínimo 10, no máximo 10.000, 50 por padrão. Se você digitar um número acima de 500, o aplicativo pede confirmação.
- **Sayfa hızını da ölç** (Medir também a velocidade das páginas): desligado por padrão. Se você ligar, cada página é medida no celular e no computador. Quem faz a medição é o Google Lighthouse (a ferramenta do Google que mede páginas).

Se você não tem uma chave do PageSpeed (a chave gratuita que o Google fornece para medir velocidade), a medição de velocidade fica limitada a 50 páginas. Para medir todas as páginas, adicione uma chave gratuita em **Ayarlar** (Configurações).

**Auditorias anteriores.** Cada auditoria é listada com a data, o estado, o número de páginas e a contagem de problemas. A contagem de problemas é por cem páginas. Isso permite comparar uma auditoria de 50 páginas com uma de 500. **Denetimi sil** (Excluir auditoria), no menu da linha, apaga tudo e não pode ser desfeito.

**Detalhes da auditoria.** Se o rastreamento estiver incompleto, aparece um aviso amarelo. Por exemplo: "Denetim bu siteyi tamamen tarayamadı." (A auditoria não conseguiu rastrear este site por completo.), quando uma proteção contra robôs bloqueia o rastreador. Os resultados continuam sendo mostrados. **Raporu indir** (Baixar o relatório) baixa um relatório HTML de arquivo único e o salva na tela **Raporlar** (Relatórios).

**Pontuação do site.** Você vê um número de 0 a 100. Abaixo dele, os três trabalhos que dariam mais pontos aparecem como "+N puan" (+N pontos).

**Dois gráficos.** Um mostra qual problema afeta mais páginas. O outro mostra a gravidade dos problemas.

**Quatro abas.**

- **Sorunlu sayfalar** (Páginas com problemas): abra um cartão para ver a causa e a caixa **Nasıl düzeltilir?** (Como corrigir?). Botões: **URL'leri kopyala** (Copiar as URLs), **CSV indir** (Baixar CSV), **Sayfalar sekmesinde göster** (Mostrar na aba Páginas).
- **Sayfalar** (Páginas): todas as páginas rastreadas. Filtros rápidos: **Dizine kapalı** (Fechadas à indexação), **Yavaş** (Lentas) (mais de 1 segundo), **Alt metni eksik** (Sem texto alternativo), **Site haritasında yok** (Fora do mapa do site).
- **Dizin durumu** (Status de indexação): a resposta do Google para cada página. É explicada em um guia à parte.
- **Hız** (Velocidade): só aparece se a medição de velocidade estiver ligada.

## Como usar

1. Na sua primeira auditoria, deixe o número de páginas em 50. Mantenha a medição de velocidade desligada. Termina em um ou dois minutos.
2. Comece pelos três trabalhos "+N puan" do cartão de pontuação. Eles trazem mais pontos com menos esforço.
3. Na aba **Sorunlu sayfalar**, termine primeiro os problemas críticos. Um problema crítico impede o Google de ver a página.
4. Use **URL'leri kopyala** para pegar a lista e entregá-la ao administrador do seu site. Você pode repassar a caixa **Nasıl düzeltilir?** como está.
5. Depois de corrigir, clique em **Aynı ayarlarla yeniden başlat** (Reiniciar com as mesmas configurações). No painel, o cartão "Düzelenler" (Corrigidos) mostra o que foi fechado.
6. Ligue a medição de velocidade uma vez por semana, para as suas páginas importantes. Cada página leva cerca de dez segundos e usa a cota do Google.

## Como os números são calculados

**Pontuação.** Cada problema tem um peso: crítico 40, aviso 15, informação 3. Quanto mais páginas um problema afeta, mais ele tira da pontuação. A pontuação começa em 100 e nunca fica abaixo de zero. Se existir ao menos um problema, a pontuação é no máximo 99.

Faixas: 90 ou mais é muito bom, 70 ou mais é bom, 50 ou mais é médio, abaixo disso é fraco.

**Rastreamento.** O aplicativo não sobrecarrega o seu site: envia no máximo duas solicitações ao mesmo tempo. Se o site disser "muitas solicitações" (429), ele espera. Se a espera total passar de 30 minutos, o rastreamento para.

**Medição de velocidade.** Em um site com 212 páginas, a auditoria inteira levou 35 minutos; cerca de 24 desses minutos foram de medição de velocidade. Se a cota diária acabar, a medição para e os resultados até aquele ponto ficam guardados. Um problema é relatado nestes casos:

- O conteúdo principal aparece depois de mais de 4 segundos (LCP).
- O conteúdo se desloca mais de 0,25 (CLS).
- A resposta a um clique leva mais de 500 milissegundos (INP).
- A pontuação de SEO do Lighthouse está abaixo de 90.

## Perguntas frequentes

**A auditoria mostra o que o Google vê?** Não. O rastreador do aplicativo lê a página por conta própria. A resposta do Google está na aba **Dizin durumu**.

**A pontuação é 98. Por que não 100?** Um único problema já mantém a pontuação em 99.

**O que significa o aviso "Engellendik" (Fomos bloqueados)?** A proteção contra robôs do seu site barrou o rastreador. No firewall, permita o nome "seotracker-audit".

**A medição de velocidade parou no meio.** Normalmente não há chave do PageSpeed ou a cota diária acabou. O cartão de cota em **Ayarlar** informa o motivo.

**Quantas auditorias podem rodar ao mesmo tempo?** No máximo três. Duas auditorias que medem velocidade se atrasam mutuamente.

## Limites

O rastreador pode não ver o conteúdo que o JavaScript (código que roda na página) acrescenta depois. Uma auditoria rastreia no máximo 10.000 páginas. A medição de velocidade é a medição de laboratório do Google, não dados de visitantes reais. A auditoria não altera nada no seu site. Você ou o seu assistente fazem as correções.

<!-- Kaynaklar: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; ProgressCard.tsx; ResultsView.tsx; ResultsTables.tsx; TabIntro.tsx; ScoreCard.tsx; IssueWorkloadChart.tsx; SeverityDonut.tsx; IssueCard.tsx; DownloadReportButton.tsx; export.ts; src/shared/auditScore.ts; src/shared/audit-limits.ts; src/shared/audit-issues/speed.ts; src/server/lib/audit/crawl-window.ts; crawl-throttle.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
