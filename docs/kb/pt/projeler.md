---
title: Projetos
description: Projetos ajuda a escolher um site e completar suas conexões. Cada projeto mantém suas próprias propriedades Google, auditorias e relatórios.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-27
---

Projetos ajuda a escolher um site e completar suas conexões. Cada projeto mantém suas próprias propriedades Google, auditorias e relatórios.

## Entenda a tela

Com vários projetos, pesquise e ordene por nome ou domínio. **Último aberto** indica o projeto lembrado pelo navegador, não uma situação de SEO. A ação principal permite adicionar um site, conectar o Search Console ou abrir o painel conforme a configuração conhecida. Informações do projeto abre as notas; Configurações abre a configuração.

O arquivo de pesquisa contém dados locais de pesquisas Web de todos os dispositivos e países. As datas ficam visíveis. O período termina no último dia armazenado, que pode estar antigo. Se faltarem dias, os cliques são somente o subtotal dos dias observados. Um dia ausente é uma lacuna, nunca zero. A comparação exige dois períodos completos. Totais iguais aparecem como sem alteração; mudanças a partir de zero mostram as contagens anteriores e atuais. Os detalhes mostram o último dia e o horário de leitura disponível. Registros antigos não guardam a evidência usada para determinar a finalização.

A auditoria pertence ao host do site escolhido. A última concluída é separada de uma tentativa mais recente com falha ou em andamento. Uma conexão salva não prova uma leitura Google bem-sucedida. Fonte ilegível não significa desconexão nem zero medido: tente novamente. Atualizar lê identidades e dados locais sem chamar o Google ou iniciar auditorias.

## Crie e gerencie

Novo projeto pede nome, domínio opcional, país e idioma. Criar não coleta dados. Escolha propriedades Google em Configurações → Conexões. As configurações gerais alteram identidade e mercado. Cada projeto tem uma propriedade Search Console e uma Analytics.

Arquivar preserva os dados; Restaurar recupera o projeto. O último projeto não pode ser arquivado. Cliques de pesquisa diferem de sessões GA4 e totais por consulta. Períodos diferentes não são somados.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
