---
title: Informações do projeto
description: Informações do projeto guarda notas locais para você e seu assistente conectado. Texto preenchido não é verificado e nem todo assistente o lê automaticamente.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

Informações do projeto guarda notas locais para você e seu assistente conectado. Texto preenchido não é verificado e nem todo assistente o lê automaticamente.

## Comece pela meta

O topo mostra quantas seções principais estão preenchidas e a meta salva. Abra a primeira seção vazia ou use o seletor. Resumo do negócio, meta atual, posicionamento e preferências de escrita permitem 4.000 caracteres cada. Autor e horário absoluto aparecem em cada seção. Salvar alterações envia somente as seções principais modificadas.

Concorrentes e páginas importantes são listas opcionais, não medições de posição ou conversão. Cada uma permite 100 registros. Domínio/nome/nota: 255/120/500 caracteres; endereço/tema/nota: 2.048/200/500. Os papéis são rótulos seus. Assistentes criam seções personalizadas; você pode editá-las ou removê-las. Limites: 20 seções, título de 120 caracteres e conteúdo de 4.000.

## Salve e atualize

Atualizar relê notas e configuração. Falhas em segundo plano preservam informações e rascunhos com um aviso. Sair com alterações principais ou em formulários em linha não salvas gera um aviso. O servidor ainda não impede sobrescritas simultâneas da mesma seção: compare o texto mais recente antes de salvar.

O prompt para o assistente pede sua aprovação antes de gravar. As ferramentas do aplicativo podem gravar imediatamente e não impõem outra confirmação. O prompt fica indisponível até a identidade do projeto ser lida.

O diário de pesquisa mostra as 20 notas mais recentes dos últimos 90 dias, de até 1.000 caracteres. A data segue o dia UTC do servidor. As notas antigas são filtradas em cada leitura. Um aviso indica outros registos no mesmo período. A lista não é o histórico completo.

Se outro cliente alterar uma secção durante a edição, toda a gravação é recusada e o rascunho é preservado. Compare o texto inicial, o último texto guardado e o rascunho, integre-os e guarde novamente. Os agentes podem enviar `expectedContent` para usar a mesma proteção; os clientes antigos sem este campo continuam compatíveis.

Fontes e configuração conta seis sinais compartilhados e distingue ausência de leitura impossível. As listas opcionais não contam. Conexão salva não é teste ao vivo, chave PageSpeed não garante cota e chamada de ferramenta da instalação não prova leitura deste projeto. Não é uma pontuação SEO.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
