---
title: Auditoria do site
description: Confira seu site com 202 regras e priorize os problemas. Entenda a pontuação da auditoria, a cobertura das medições e os resultados incompletos.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-28
---

Esta página explica como encontrar os problemas do seu site e corrigi-los.

O aplicativo percorre o seu site com o seu próprio rastreador (um programa que abre e lê as páginas uma a uma). Ele procura links quebrados, títulos ausentes e páginas lentas. No fim, você recebe uma pontuação e uma lista de problemas em ordem de importância, cada um com a instrução para corrigi-lo. A pontuação mostra também quantas das verificações puderam ser medidas. Uma auditoria que parou no meio não recebe pontuação.

## O que há na tela

**O cartão para iniciar uma nova auditoria.** Tem estes campos.

- **O campo do endereço do site**: o domínio do seu projeto já vem preenchido.
- **Rastrear até N páginas**: no mínimo 10, no máximo 10.000, 50 por padrão. Se você digitar um número acima de 500, o aplicativo pede confirmação.
- **Medir também a velocidade da página**: desligado por padrão. Se você ligar, cada página é medida no celular e no computador. Quem faz a medição é o Google Lighthouse (a ferramenta do Google que mede páginas). O cartão informa de antemão o tempo mínimo que isso vai levar.
- **Verificar também links de saída e tamanho das imagens**: depois do rastreamento, ele confere se os links para outros sites abrem e qual é o tamanho dos arquivos de imagem. No máximo 300 endereços são consultados. Sites que bloqueiam robôs são pulados.

Se você não tem uma chave do PageSpeed (a chave gratuita que o Google fornece para medir velocidade), a medição de velocidade fica limitada a 50 páginas. Para medir todas as páginas, adicione uma chave gratuita em **Configurações**. **Iniciar auditoria** começa a auditoria. A seção **Cotas** logo abaixo vem fechada. Se você abrir, vê o estado atual das cotas do PageSpeed e da inspeção de URL.

**Auditorias anteriores.** Cada auditoria é listada com a data, o endereço, o estado, o número de páginas e a contagem de problemas. As colunas Crítico, Aviso e Informação mostram todos os problemas registrados, incluindo os das páginas e as verificações do site inteiro; uma página pode ter vários problemas. Se mais de um site foi auditado no projeto, aparece um seletor de site acima da lista. A densidade indica problemas por cem páginas. As linhas de tendência e as setas de variação só aparecem quando os dados registrados confirmam o mesmo site, conjunto de páginas, configurações de rastreamento e verificações medidas. Escopos diferentes ou desconhecidos são exibidos como contagens independentes; não é possível determinar a alteração. Com vários sites selecionados, o gráfico fica oculto. **Ver** numa linha abre a auditoria. O menu da linha tem **Executar novamente com as mesmas configurações** e **Excluir auditoria**. Excluir apaga também as páginas, os problemas e as medições de velocidade da auditoria, e não dá para desfazer.

**Detalhes da auditoria.** No alto, **Baixar relatório** baixa um relatório HTML em um único arquivo e o guarda em **Relatórios**. Abaixo, aparecem avisos amarelos quando for preciso (veja adiante). Depois vem o cartão da pontuação.

**Cartão da pontuação.** Ele mostra estas coisas.

- No centro, a **Pontuação do site** e, ao lado, uma palavra de avaliação: **Excelente**, **Bom**, **Média** ou **Ruim**.
- Abaixo, a linha de cobertura: "Pontuação baseada nas 142 verificações medidas. 38 verificações não puderam ser medidas." O ponto de interrogação ao lado explica como a pontuação é calculada.
- Uma frase de avaliação. Se a pontuação está presa a um limite, ela diz o motivo.
- **Endereços encontrados: N, rastreados: M**. Quantos endereços o rastreamento achou no site e quantos abriu. Se a auditoria parou no limite de páginas que você escolheu, uma nota diz "A auditoria estava limitada a N páginas; o site pode ter mais páginas." Nesse caso a pontuação continua valendo.
- Linhas para as categorias pesadas que não puderam ser medidas. Por exemplo "Velocidade não medida: a cota do PageSpeed acabou".
- Quatro contadores: **Problemas críticos**, **Melhorias** (avisos e informações), **Verificações aprovadas** e **Não medido**.
- **Pontuações por categoria**: Rastreando, Conteúdo, Indexação, Velocidade, Segurança, Acessibilidade, Social e dados estruturados. A mais baixa fica em cima. Se você clicar numa categoria, a guia **Verificações** abre nessa categoria. Uma categoria em que nada pôde ser medido diz "Não medido". Uma medida em parte diz "Dados parciais".
- **Histórico da pontuação**: as pontuações das últimas auditorias do mesmo site. Aparece quando duas auditorias têm pontuação. As barras cinzas são pontuações provisórias. Auditorias sem pontuação não aparecem no gráfico, e uma linha abaixo diz quantas são.

**Guias.**

- **A fazer (N)**: os trabalhos, começando pelo que dá mais pontos. Cada trabalho mostra os pontos que você ganha, uma etiqueta "Tarefa pequena", "Tarefa média" ou "Tarefa grande" e uma caixa **Como corrigir**. Se o Search Console estiver ligado, a ordem também leva em conta os cliques das páginas afetadas.
- **Verificações (N)**: todas as verificações, por categoria. Cada uma aparece como aprovada, reprovada ou não medida. Para as não medidas, o motivo vem escrito.
- **Dados instantâneos**: o site para além das suas páginas. Coisas como o certificado, o registro do domínio, o DNS e uma prévia do site.
- **Páginas com problemas (N)**: agrupa os problemas. Abra um cartão para ver a causa, os endereços afetados e a caixa **Como corrigir**. Dá para pesquisar nos endereços.
- **Páginas (N)**: cada página rastreada. Filtros rápidos: **Indexação bloqueada**, **Lento** (mais de 1 segundo), **Texto alternativo ausente**, **Não está no sitemap**.
- **Status de indexação**: a resposta do Google para cada página. Ela é explicada em um guia próprio. Se o site auditado não pertence à propriedade do Search Console do projeto, esta guia não mostra dados do Google e a tela explica o motivo.
- **Velocidade (N)**: só aparece se a medição de velocidade estava ligada. Se algumas páginas não puderam ser medidas, o número vem escrito como "10/12".

O menu **Exportar** no alto à direita entrega a lista da guia aberta como **Exportar para Sheets**, **CSV** ou **JSON**. Se um filtro estiver ativo, só as linhas visíveis saem.

## Os três estados da pontuação

**Pontuação completa.** Quando a maior parte das verificações foi medida, ela vem com uma palavra de avaliação. Leia a pontuação assim: de 90 em diante Excelente, de 70 em diante Bom, de 50 em diante Média, abaixo disso Ruim.

**Pontuação provisória.** Se a parcela de verificações medidas cair abaixo de 70 por cento, a pontuação é provisória. Ela também é provisória se menos da metade das verificações de Rastreando, Indexação, Conteúdo ou Velocidade foi medida. O cartão escreve "Pontuação provisória, cobertura das medições 62%", não dá palavra de avaliação e fica numa cor neutra. O número reflete só as verificações que se conseguiu ver. Sobre o resto, nenhum julgamento, bom ou ruim, foi feito. Os motivos de costume são estes: a cota do PageSpeed acabou, não há chave do PageSpeed, a medição de velocidade estava desligada ou não se conseguiu buscar os dados de índice no Search Console.

**Sem pontuação.** Nestes casos, o cartão escreve "Auditoria incompleta, sem pontuação" no lugar da pontuação.

- A auditoria parou com um erro.
- A auditoria ainda está em execução.
- O rastreamento foi interrompido antecipadamente devido ao limite de taxa do site. A lista de problemas está incompleta, e uma pontuação seria só um palpite.
- Nenhuma página pôde ser rastreada. Nesse caso o cartão da pontuação nem aparece.

Os resultados continuam sendo mostrados e valem para as páginas rastreadas. Para uma pontuação completa, execute a auditoria de novo.

## Se a auditoria parou, o que está escrito

Quando uma auditoria falha, a tela diz três coisas: o que aconteceu, se o defeito está no seu site ou no aplicativo, e o que você deve fazer. O título diz em que fase ela parou: **descoberta de URLs**, **rastreamento**, **medição de velocidade** ou **preparação dos resultados**.

| O que a tela diz                                                                                    | De que lado                 | O que fazer                                                                                  |
| --------------------------------------------------------------------------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------- |
| Uma etapa não terminou a tempo                                                                      | Provavelmente o site        | Tente de novo em alguns minutos. Se repetir, comece com menos páginas                        |
| A auditoria não coube na memória que o aplicativo pode usar                                         | O aplicativo                | Comece de novo com menos páginas                                                             |
| A auditoria passou do tempo de processador permitido                                                | O aplicativo                | Comece de novo com menos páginas                                                             |
| Ocorreu um erro ao gravar os resultados no banco de dados                                           | O aplicativo                | Veja se o disco tem espaço, reinicie o aplicativo e comece a auditoria de novo               |
| O resultado de uma etapa passou do tamanho que o aplicativo consegue guardar                        | O aplicativo                | Comece de novo com menos páginas                                                             |
| O mecanismo interno de auditoria do aplicativo informou um erro                                     | O aplicativo                | Escolha **Yeniden başlat** (Reiniciar) no menu da bandeja, depois comece a auditoria de novo |
| A auditoria foi interrompida                                                                        | O aplicativo                | Deixe o aplicativo aberto e comece a auditoria de novo                                       |
| A chave de instalação não chegou à parte que executa as auditorias (suas chaves não foram apagadas) | O aplicativo                | Atualize ou reinicie o aplicativo e comece a auditoria de novo                               |
| A auditoria parou com um erro inesperado                                                            | Não foi possível determinar | Comece de novo. Se continuar, baixe o pacote de diagnóstico em **Ajuda**                     |

O texto bruto do erro não chega à tela. Ele fica no pacote de diagnóstico.

## Avisos amarelos durante o rastreamento

- **A auditoria não conseguiu rastrear este site por completo.** A proteção contra robôs do seu site parou o rastreador. Os resultados continuam sendo mostrados. Libere "seotracker-audit" no firewall ou experimente um dos rastreadores de computador que o guia sugere.
- **N páginas não puderam ser obtidas (erro de rede).** A conexão não se estabeleceu nem na nova tentativa. Essas páginas não foram auditadas e não contam como quebradas. Muitas vezes é passageiro. Execute a auditoria de novo. Se continuar, veja se o site abre a partir deste computador.
- **O site limitou a taxa em N páginas.** O site respondeu "muitas solicitações". Essas páginas não puderam ser auditadas. Comece de novo depois que o limite zerar.
- **O rastreamento foi interrompido antes do previsto devido ao limite de solicitações do site.** A espera pedida passou do tempo que a auditoria pode levar. O relatório está incompleto e não recebe pontuação.
- **Não foi possível ler a chave PageSpeed salva; a medição de velocidade foi feita sem chave.** A auditoria terminou, mas a medição de velocidade foi feita sem chave. Os resultados do rastreamento não foram afetados. A medição de velocidade ficou limitada às primeiras páginas. Atualize ou reinicie o aplicativo e comece uma nova auditoria. Se continuar, salve de novo a chave do PageSpeed em **Configurações**.

## Como usar

1. Na primeira auditoria, deixe o número de páginas em 50. Mantenha a medição de velocidade desligada. Termina em um ou dois minutos. Com a medição de velocidade desligada, a pontuação pode sair provisória. Isso é normal.
2. Leia a linha de cobertura no cartão da pontuação. Se estiver escrito **Pontuação provisória**, as linhas abaixo dizem o motivo.
3. Na guia **A fazer**, comece pelos três primeiros trabalhos. Eles dão mais pontos com menos esforço.
4. Na guia **Páginas com problemas**, termine primeiro os problemas críticos. Um problema crítico impede o Google de ver a página.
5. Leve a lista com **Exportar** e entregue a quem cuida do seu site. A caixa **Como corrigir** pode ser repassada do jeito que está.
6. Depois de corrigir, clique em **Executar novamente com as mesmas configurações**. As setas da lista **Auditorias anteriores** e o **Histórico da pontuação** mostram o que foi corrigido.
7. Ligue a medição de velocidade uma vez por semana, para as páginas importantes. Cada página leva cerca de dez segundos e gasta cota do Google.

## Como os números são calculados

**Pontuação.** Cada achado tira pontos da sua própria categoria. Quantos, depende da importância do achado e da parcela de páginas que ele atinge. Os pesos são: crítico 40, aviso 15, informação 3. A pontuação do site é a média ponderada de sete categorias. Rastreando e Indexação pesam mais, Social e dados estruturados pesa menos. Uma verificação que não pôde ser medida não aumenta nem diminui a pontuação. Por isso a cobertura é mostrada à parte.

**Limites máximos.** Se houver um único problema que seja, a pontuação é no máximo 99. Se houver um problema crítico, no máximo 69. Com 5 avisos ou mais, no máximo 89. Assim, uma única página bloqueada na indexação num site grande não se esconde sob uma pontuação alta. Se um limite segura a pontuação, o cartão escreve isso. O "+N pontos" ao lado de um trabalho também leva o limite em conta. Corrigir o único problema crítico tira o limite inteiro. Corrigir um aviso enquanto um limite vale dá muito pouco.

**Rastreamento.** O aplicativo não sobrecarrega o seu site. Ele envia no máximo duas solicitações ao mesmo tempo. Se o site responde "muitas solicitações" (429), ele espera. Se a espera total passar de 30 minutos, o rastreamento para e a auditoria fica sem pontuação.

**Medição de velocidade.** Num site de 212 páginas, a auditoria inteira levou 35 minutos. Cerca de 24 deles foram de medição de velocidade. Se a cota diária acabar, a medição para, os resultados até ali ficam e a pontuação pode ser provisória. Um problema é escrito nestes casos:

- O conteúdo principal aparece depois de mais de 4 segundos (LCP).
- O conteúdo se desloca mais de 0,25 (CLS).
- A resposta a um clique leva mais de 500 milissegundos (INP).
- A pontuação de SEO do Lighthouse fica abaixo de 90.

## Perguntas frequentes

**A auditoria mostra o que o Google vê?** Não. O rastreador do aplicativo lê a página por conta própria. A resposta do Google está na guia **Status de indexação**.

**A pontuação é 98, por que não 100?** Um único problema já segura a pontuação em 99 ou menos.

**Por que a minha pontuação está presa em 69?** Há um problema crítico. Enquanto você não o corrigir, a pontuação não passa de 69. O cartão avisa.

**Por que aparece "Pontuação provisória"?** Uma parte grande das verificações não pôde ser medida. A linha de cobertura e as linhas abaixo dizem o motivo. Ligar a medição de velocidade ou conectar o Search Console costuma aumentar a cobertura.

**Por que aparece "Auditoria incompleta" no lugar da pontuação?** A auditoria parou no meio ou cedo demais. A lista de problemas está incompleta, então não há pontuação. Execute a auditoria de novo.

**O que significa o aviso "bloqueado"?** A proteção contra robôs do seu site parou o rastreador. Libere "seotracker-audit" no firewall.

**A medição de velocidade parou no meio.** Em geral falta a chave do PageSpeed ou a cota diária acabou. O cartão de cotas em **Configurações** diz o motivo.

**Quantas auditorias rodam ao mesmo tempo?** No máximo três. Duas auditorias que medem velocidade se atrasam uma à outra.

## Limites

O rastreador pode não ver conteúdo que o JavaScript (código que roda na página) acrescenta depois. Uma auditoria rastreia no máximo 10.000 páginas. A medição de velocidade é a medição de laboratório do Google, não dados de visitantes reais. A auditoria não muda nada no seu site. As correções são feitas por você ou pelo seu assistente.

Nas auditorias anteriores, **Páginas rastreadas** indica os endereços efetivamente rastreados, incluindo auditorias falhadas, e não o limite inicial. As colunas Crítico e Aviso mostram o total de problemas. **Medição de velocidade pedida** significa que a opção estava ativa no início; não prova que a medição tenha sido concluída com êxito. No telemóvel, desloque a tabela na horizontal para ver as restantes colunas e ações.

<!-- Fontes: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; AuditSiteFilter.tsx; ProgressCard.tsx; src/client/features/audit/results/ResultsView.tsx; ResultsHeader.tsx; ScoreOverview.tsx; ScoreGauge.tsx; WithheldScore.tsx; scoreWords.ts; auditFailureCopy.ts; ChecksView.tsx; TodoView.tsx; IssuesView.tsx; QuickFilters.tsx; ForeignPropertyNotice.tsx; DownloadReportButton.tsx; src/routes/_project/p/$projectId/audit/index.tsx; src/shared/auditStanding.ts; src/shared/auditScore.ts; src/shared/auditCategory.ts; src/shared/audit-limits.ts; src/server/lib/audit/crawl-throttle.ts -->

O histórico mostra ocorrências críticas, avisos e informações por página; uma página pode ter várias ocorrências. Trabalhos concluídos mostram o limite de rastreamento registrado ou informam que ele não foi registrado. Os detalhes do escopo abrem as verificações medidas e não medidas. Auditorias com falha mostram a explicação registrada e o próximo passo; causas desconhecidas são indicadas explicitamente.
