---
title: Projetos
description: Projetos lista os sites acompanhados e mostra as conexões que faltam. Cada projeto tem propriedades Google, auditorias e relatórios próprios.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-28
---

## Entenda a tela

Com vários projetos, a lista pode ser pesquisada e ordenada por nome ou domínio. **Último aberto** indica o projeto lembrado por este navegador; não é uma situação de SEO. O botão principal muda conforme a configuração: **Adicionar site**, **Conectar Search Console** ou **Abrir painel**. **Contexto do projeto** abre as notas e **Configurações** abre a configuração.

### Arquivo de pesquisa

A linha **Arquivo de pesquisa · Web · todos os dispositivos e países** resume os dados de pesquisa salvos localmente. O período termina no último dia armazenado, que pode ser antigo; as datas ficam sempre visíveis. Se faltarem dias, os cliques são o subtotal apenas dos dias observados. No gráfico, um dia ausente aparece como lacuna e não vale zero.

A variação só aparece quando os dois períodos estão completos. Totais iguais aparecem como sem alteração; uma variação a partir de zero mostra as duas contagens. Se o período anterior tiver menos de 20 cliques, o selo mostra a diferença em cliques em vez da porcentagem: de 1 para 5 cliques aparece +4 cliques. Com números tão pequenos, a variação não comprova crescimento.

Os detalhes mostram o último dia armazenado e, quando conhecido, o horário da leitura. Registros mais antigos não informam com base em que um dia foi considerado definitivo.

### Auditoria e conexões

A auditoria se refere ao host do site escolhido. A última auditoria concluída fica separada de uma tentativa mais recente que falhou ou ainda está em andamento. Uma conexão salva não garante que a leitura do Google tenha funcionado. Uma fonte ilegível não significa fonte desconectada nem valor zero: tente novamente mais tarde. **Atualizar** relê identidade e dados locais; não consulta o Google nem inicia auditorias.

## Crie e gerencie

**Novo projeto** pede nome, país, idioma e, opcionalmente, o domínio. Criar o projeto não coleta dados. As propriedades do Google são escolhidas em **Configurações do projeto → Conexões**: cada projeto tem uma propriedade do Search Console e uma do Google Analytics. Em **Geral**, você altera identidade e mercado.

**Arquivar projeto** tira o projeto da barra lateral sem apagar dados; **Restaurar** o torna visível de novo. Não é possível arquivar o único projeto restante.

Os cliques desta tela não coincidem com as sessões do GA4 nem com os totais por consulta do arquivo. Períodos diferentes não são somados.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
