---
title: Contexto do projeto
description: Contexto do projeto guarda localmente metas, concorrentes e notas que você e um agente conectado podem usar. Limites e gravação.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

O texto inserido aqui não é verificado. Nem todo agente o lê automaticamente: alguns precisam ser instruídos a consultá-lo.

## Comece pela meta

No topo, a tela mostra quantas seções principais estão preenchidas e a meta salva. **Preencher a primeira seção vazia** abre a seção que falta; **Ir para a seção** leva a qualquer outra. **Visão geral do negócio**, meta atual, posicionamento e **Preferências de escrita** aceitam até 4.000 caracteres cada. Cada seção mostra o último autor e a data exata da alteração. **Salvar alterações** grava apenas as seções principais modificadas.

**Concorrentes** e **Páginas importantes** são listas opcionais, preenchidas manualmente. Elas não medem posição nem conversão. Cada lista aceita 100 itens:

| Lista               | Limites em caracteres               |
| ------------------- | ----------------------------------- |
| Concorrentes        | domínio 255, nome 120, notas 500    |
| Páginas importantes | endereço 2.048, tema 200, notas 500 |

O papel de uma página é um rótulo definido por você. Os agentes podem criar **Seções personalizadas**, que você pode editar ou remover: no máximo 20, com título de até 120 caracteres e conteúdo de até 4.000.

## Salve e atualize

**Atualizar** relê as notas e a configuração. Se uma leitura em segundo plano falhar, as informações e os rascunhos permanecem e um aviso aparece. Sair da página com alterações não salvas, nas seções principais ou nos formulários em linha, também gera um aviso.

Se outro cliente alterar uma seção enquanto você edita, a gravação inteira é recusada e o rascunho é preservado. A tela mostra lado a lado o **Texto no início da edição**, o **Último texto guardado** e o rascunho: compare, junte as alterações e salve de novo. Os agentes recebem a mesma proteção ao enviar `expectedContent`; clientes mais antigos que não o enviam continuam compatíveis.

## Rascunho com o agente

**Preparar rascunho com o agente** oferece um prompt que você copia com **Copiar prompt**. O prompt pede que o agente obtenha sua aprovação antes de salvar. Já as ferramentas do aplicativo gravam imediatamente, sem pedir outra confirmação. O prompt só fica disponível depois que a identidade do projeto é lida.

## Registro de pesquisa

O **Registro de pesquisa** mostra os 20 registros mais recentes dos últimos 90 dias; cada um aceita até 1.000 caracteres. A data segue o dia UTC do servidor. Registros expirados são filtrados a cada leitura. Um aviso indica quando há outros registros no mesmo período que não aparecem: o registro não é um histórico completo.

## Origem e instalação

**Origem e instalação** conta seis sinais de configuração compartilhados e separa o que falta do que não pôde ser lido. As listas opcionais não entram na conta. Uma conexão salva não é um teste ao vivo, uma chave do PageSpeed não garante cota e uma chamada de ferramenta da instalação não prova que este projeto foi lido. A contagem não é uma pontuação de SEO.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
