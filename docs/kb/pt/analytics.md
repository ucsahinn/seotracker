---
title: Analytics
description: Analytics mostra visitas, engajamento e eventos principais medidos na propriedade GA4.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-27
---

Os links de Oportunidades abrem o mesmo grupo de endereços normalizados e as datas da fonte com `pageGroup`. O servidor lê todas as linhas de páginas de destino orgânicas do Google, página por página, antes do filtro e da paginação de 50/100/200 linhas na tela. Parâmetros de consulta e barras finais pertencem ao mesmo grupo; hosts diferentes e caminhos com maiúsculas diferentes ficam separados. Limites da fonte ou de qualidade impedem confirmar o grupo completo e são informados. Um resultado vazio não prova ausência de tráfego. O resumo mantém o escopo da propriedade. O filtro pode ser removido; URL, navegação Voltar e exportações preservam seu escopo.

Analytics mostra visitas, engajamento e eventos principais medidos na propriedade GA4. O seletor oferece páginas de destino, páginas, aquisição, eventos principais, comércio eletrônico, pesquisa interna, público e configurações de medição.

## Leia primeiro o escopo

A busca orgânica inclui mecanismos além do Google. Todo o tráfego altera o resumo e o relatório juntos. A pesquisa interna sempre mostra eventos medidos de resultados de pesquisa em todos os canais, sem seletor de canal. Todos os hosts e fluxos da propriedade estão incluídos. Outros sites ou aplicativos podem contribuir para os totais.

Os períodos de 7, 28 e 90 dias terminam ontem no fuso da propriedade. Ontem é um dia de calendário encerrado, sem garantia de dados definitivos. Dias recentes podem ser reprocessados. As datas efetivas, o período anterior de mesma duração e o fuso são exibidos. Links aceitam startDate/endDate juntos; uma data final futura é limitada a ontem com aviso. GA4 e Search Console usam calendários e medidas diferentes. Datas iguais não garantem intervalos temporais idênticos.

## Examine resultados e linhas

O resumo segue o escopo escolhido: sessões, taxa de engajamento, eventos principais e receita de compras. Eventos principais não são clientes únicos. Receita zero não prova ausência de loja. A moeda desconhecida aparece ao lado do valor. O tempo de engajamento é total, não a média por usuário. Os valores diários distinguem dias desconhecidos de zero. Restrições de qualidade impedem comparações ou recomendações conclusivas.

Escolha 50, 100 ou 200 linhas por página e use Anterior/Próxima. Filtros, ordenação, resumos e exportações abrangem apenas a página listada. Selecionar uma barra filtra a tabela sem alterar a base do resumo. Usuários podem aparecer em várias categorias: não os some como usuários únicos da propriedade. Caminhos iguais em hosts distintos e produtos com o mesmo nome e IDs diferentes permanecem separados. Receitas negativas ou desconhecidas não recebem gráfico de participação.

O filtro de baixa conversão é um indício para investigar pelo menos quatro páginas elegíveis listadas com no mínimo 30 sessões cada. Não estima vendas perdidas. Ausência de eventos observados não prova configuração incompleta. Pesquisas internas frequentes não provam falta de conteúdo.

## Compartilhamento, medição e cota

Relatório, canal, datas, detalhamento, tamanho e posição da página ficam na URL. O filtro exato host/path abrange somente as linhas listadas e não agrupa variantes de URL. CSV e Planilhas exportam as linhas filtradas com números brutos. ga4_scope_json preserva origem, propriedade, datas, fuso, moeda, qualidade, página e filtros.

O diagnóstico lê apenas configurações Admin. Não encontrar lacunas não prova que a tag envia dados: siga as verificações de coleta vinculadas. Inventários parciais indicam pelo menos. Se a medição otimizada estiver desativada, nenhuma subfunção estará efetivamente ativa. Nenhuma configuração da conta é alterada.

A seção recolhida de cota mostra uma captura local da última resposta, não o uso do período de tráfego. O teto padrão é uma suposição. Atualizar solicita novamente os relatórios visíveis e pode consumir tokens.

Quando o Google trunca dados no período solicitado, o resumo do Analytics e os detalhes do relatório mostram o motivo e as datas informados pelo Google. O relatório é considerado limitado; uma cobertura incompleta não é apresentada como uma comparação confiável entre períodos.
