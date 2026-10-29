---
title: Painel
description: O Painel reúne tráfego de pesquisa, próximas tarefas baseadas em dados, situação da auditoria e resultados do Analytics do projeto.
screen: Panel
route: /p/<proje>
updated: 2026-10-28
---

**Atualizar** relê as fontes ativas, a configuração e o estado da instalação. Se uma leitura falhar, o Painel avisa que a atualização foi parcial. A hora em que os dados chegaram não é o último dia medido.

## Resumo da pesquisa

Por padrão, o resumo cobre 28 dias de pesquisa na Web, em todos os dispositivos e países. Os dias recentes ainda incompletos ficam de fora. Valem as datas exibidas, no fuso horário do Pacífico. As linhas sobre a fonte mostram o período anterior efetivo, o último dia com dados e os dias excluídos. Se o Google não informar que um dia está completo, o Painel explica qual exclusão presumiu. Por causa das consultas ocultas e do limite de linhas, a lista não representa o site inteiro.

- **Cliques**: cliques nos resultados do Google que levam ao site.
- **Impressões**: vezes em que o site apareceu nos resultados.
- **CTR**: cliques divididos por impressões.
- **Posição média**: média ponderada pelas impressões; quanto menor, melhor.

Cada indicador abre Desempenho da pesquisa com o mesmo escopo. Um crescimento a partir de zero aparece em valor absoluto; uma queda para zero pode gerar uma porcentagem negativa válida. Sem período anterior, nenhuma variação é exibida. A linha clara no gráfico mostra os cliques diários do período anterior.

## Tarefas e configuração

O Painel sugere no máximo três tarefas. Elas vêm de problemas de conexão, resultados da auditoria, tarefas de pesquisa reais ou rastreamentos desatualizados. Uma conexão ativa, sozinha, não gera oportunidade. Uma leitura que falhou não vira convite para a primeira auditoria. A ausência de tarefas prioritárias não garante que todas as fontes funcionem.

A configuração usa os mesmos seis sinais de Contexto do projeto e separa sinais ausentes de sinais ilegíveis. Uma auditoria concluída do site fica desatualizada após exatamente sete dias. As preferências são um percurso opcional, recolhido por padrão, e não geram uma segunda pontuação. Etapas adiadas podem ser retomadas mesmo sem tarefas abertas.

## Estimativas por consulta

Uma consulta é elegível quando tem impressões suficientes e posição arredondada entre 4 e 20. Os cliques adicionais estimam o ganho se a consulta subisse para a faixa seguinte: são um limite superior, não tráfego medido. Estimativas conhecidas e desconhecidas são contadas sobre o conjunto inteiro, não só nas quatro linhas visíveis. Se nenhuma estimativa estiver disponível, o resultado não é apresentado como zero. A tela informa se os termos de marca estão confirmados, sugeridos ou ausentes. Não some esta estimativa ao total de Oportunidades por página: a unidade e o período são diferentes.

## Auditoria do site

O Painel usa apenas rastreamentos do domínio do projeto e ignora uma auditoria mais recente de outro site. O último resultado concluído e uma tentativa mais recente, em andamento ou com falha, aparecem separados. Se o projeto não tiver domínio, um link leva às configurações. O cartão mostra endereço inicial, data, verificações medidas e limite de páginas.

Páginas afetadas, tipos de verificação e pares página-verificação são unidades diferentes: uma mesma página pode falhar em três verificações. As notas informativas ficam fora da barra de problemas críticos e avisos. A avaliação vale apenas para o escopo medido; dados ausentes ou um limite de páginas não atestam o site inteiro.

Comparar dois rastreamentos exige o mesmo endereço inicial, as mesmas configurações e os mesmos URLs, com medições legíveis nos dois. As variações aparecem só para as verificações medidas em ambos. Um rastreamento reduzido ou ilegível não prova que um problema foi resolvido. Se o escopo for desconhecido, o cartão explica. Os links abrem os problemas da mesma auditoria para o URL escolhido; o identificador da auditoria permanece na navegação.

## Resultados do Analytics

Sessões orgânicas, usuários ativos, engajamento e eventos principais vêm do Google Analytics 4, com as datas efetivas e o fuso horário da propriedade. As sessões não coincidem com os cliques do Google e incluem outros mecanismos de busca. Uma métrica desconhecida ou restrita não significa tráfego zero; as demais métricas legíveis continuam visíveis. O Painel explica limites de privacidade, amostragem e restrições de acesso. Comparações pouco confiáveis são omitidas e dias desconhecidos ficam em branco.

Se um dos dois períodos tiver dados comerciais positivos, receita e pedidos continuam visíveis, mesmo quando o outro período mede zero. Sem essa evidência, a medição de vendas fica não confirmada. Uma moeda desconhecida é sinalizada. A nota sobre vendas fica na explicação expansível da receita orgânica.

Se as sessões forem desconhecidas, confira os avisos sobre a fonte na tela Analytics, as permissões da propriedade e a tag no site.

## Poucos dados

Se os cliques do período de comparação estiverem abaixo do limite de análise, o resumo mostra primeiro os cliques e as impressões reais. Com poucos dados, porcentagens e médias sozinhas não comprovam crescimento nem queda. Uma lista de oportunidades vazia não significa que nenhuma consulta esteja entre as posições 4 e 20: também contam o limite de impressões ajustado ao período e a exclusão das consultas de marca.

O Painel não contém volumes de busca, backlinks nem posições de concorrentes. Para comparar os dados com o Google, use as mesmas datas e os mesmos filtros.
