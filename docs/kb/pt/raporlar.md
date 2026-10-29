---
title: Relatórios e modelos
description: Salve relatórios de pesquisa, auditoria e do agente como arquivos HTML, encontre-os, imprima em PDF e compartilhe; modelos e limites.
screen: Raporlar
route: /p/<proje>/reports
updated: 2026-10-27
---

Um relatório é um documento HTML salvo no projeto. Abri-lo não atualiza os dados do Google, e a data em que foi salvo não é a data das medições.

## Crie um relatório

- **Preparar relatório de pesquisa** abre **Desempenho da pesquisa**: escolha período, dispositivo, país e tipo de pesquisa e baixe o relatório.
- **Preparar relatório de auditoria** abre **Auditoria do site**, onde você escolhe o rastreamento de origem.
- **Copiar prompt do relatório** copia o comando para colar no agente, que escreve o relatório e o salva aqui.

O documento é salvo antes do download e continua legível mesmo se a fonte for desconectada. Os modelos são instruções para o agente: não geram relatórios sozinhos nem os agendam.

## Encontre um relatório

No topo aparece o **Último relatório atualizado**, com o resumo salvo e os botões para abrir e baixar. Se faltar o resumo ou o período em forma estruturada, a tela avisa: nesse caso, confira as datas e os limites no próprio documento. O aplicativo não analisa título ou HTML para reconstruir a origem. O relatório do topo não é um resumo atualizado do site.

A pesquisa nos relatórios examina título e resumo. As contagens por tipo consideram a pesquisa e o filtro dos últimos sete dias, mas não o filtro por tipo. "Últimos sete dias" se refere aos arquivos salvos ou atualizados nesse período, não a cada edição nem a dados recentes do Google. O número de resultados e o total do projeto aparecem separados.

O servidor devolve 25 relatórios por página, e todos continuam acessíveis e pesquisáveis, inclusive depois do centésimo. A ordem padrão é a última atualização: editar um arquivo antigo o leva para o topo. Também é possível ordenar por data de criação e por título. Pesquisa, tipo, filtro recente, ordenação e página ficam na URL, então Voltar e recarregar os preservam.

## Tipos de relatório

Os novos relatórios de desempenho da pesquisa e de auditoria do site têm, cada um, um tipo salvo. Relatórios mais antigos criados pelo aplicativo aparecem como **Relatório do app, tipo não registrado**: o tipo não é deduzido do título e eles não são contados como auditorias. As skills do agente e os nomes dos modelos salvos continuam visíveis. Mais arquivos não indicam progresso de SEO. O tamanho exibido é o do HTML salvo; o arquivo baixado pode ser maior por causa dos metadados de segurança.

Um relatório de pesquisa é identificado por propriedade, datas e filtros; um relatório de auditoria, pelo ID da auditoria. Gerar de novo a mesma fonte em outro idioma atualiza o mesmo registro e pode mudar o idioma dele. Um título já usado por um relatório do agente é recusado; se um documento antigo tiver o mesmo título, ele é mantido e o novo salvamento é recusado. Títulos longos respeitam o limite de tamanho, e o servidor os diferencia pela fonte e pelos filtros.

Os relatórios do aplicativo são gerados de novo a partir da tela de origem; os agentes não podem substituir o conteúdo deles com `save_report`.

## Leia, imprima e compartilhe

A pré-visualização abre em um quadro isolado, sem scripts e sem acesso à rede. As informações sobre fonte e salvamento podem ser expandidas abaixo do documento. O relatório mantém o idioma em que foi criado; para outro idioma ou dados novos, gere-o de novo na tela de origem.

- **Baixar como HTML** gera um arquivo legível offline, para enviar como anexo.
- O PDF é gerado pela impressão do navegador. Se a aba de impressão for bloqueada, permita pop-ups ou escolha **Abrir em uma nova aba** e imprima de lá.
- Em tela cheia, o foco do teclado fica no documento; os comandos de saída ficam acima e abaixo dele.

O link do relatório só funciona nesta instalação: para compartilhar, envie o arquivo.

## Se a pré-visualização não abrir

Depois de 15 segundos sem pré-visualização, aparecem **Tentar novamente** e **Abrir em uma nova aba**. Documento ausente, acesso negado, problema de conexão e erro do servidor têm, cada um, sua própria orientação. Se a atualização da lista falhar, os dados anteriores continuam com um aviso. Se a verificação de armazenamento estiver indisponível, isso não prova que haja espaço livre.

## Limites dos dados no relatório

O relatório de pesquisa informa período efetivo, comparação, filtros e momento de criação. Os dias seguem o horário do Pacífico. Se o Google não informar até quando os dados estão completos, o relatório declara o atraso presumido. Se o limite de linhas foi atingido, a parte não listada inclui tanto consultas ocultas quanto linhas não lidas. Os limites por consulta, página e par consulta-página afetam as oportunidades, não os totais do site.

A seção de sobreposições informa período e limites mesmo quando não encontra nada; um relatório de sete dias pode usar 28 dias nessa análise. Várias páginas na mesma consulta não provam cliques perdidos nem danos de SEO. Dados históricos ou de aparência indisponíveis não viram zero. Listas truncadas informam quantas linhas são mostradas e quantas foram observadas. O orçamento de solicitações vale para a visualização de pesquisa e não inclui análises adicionais nem cache.

Criar um relatório relê os dados do servidor. O Google pode corrigir o passado e o período pode ser recalculado, então o resultado pode diferir de uma tela vista antes.

O relatório de auditoria informa na metodologia o período de tráfego do GSC, o limite de linhas e a medição CrUX móvel salva, se houver. Ele mostra o site de origem quando o rastreamento original permite verificá-lo; se for diferente do site do projeto, aparece um aviso. Sem uma fonte verificada, o relatório pode se referir a outro site, e os relatórios antigos aparecem como **Relatório antigo · fonte e data não verificadas**. **Abrir auditorias do site** abre o histórico de auditorias: se houver uma auditoria adequada, abra-a e baixe o relatório. O link não inicia auditoria nem cria relatório; os arquivos antigos não mudam.

## Modelos e limites de armazenamento

Cada projeto pode ter dez modelos. O nome aceita até 80 caracteres, a descrição até 200 e as instruções até 3.000. Excluir um modelo não exclui os relatórios criados com ele. **Limpar pesquisa** volta a mostrar os modelos ocultos pela pesquisa.

| Limite                  | Valor            |
| ----------------------- | ---------------- |
| tamanho de um relatório | 500.000 bytes    |
| título                  | 120 caracteres   |
| resumo                  | 2.500 caracteres |
| relatórios por projeto  | 10.000           |
| espaço por instalação   | 5 GB             |

São limites de armazenamento, não medidas de SEO.
