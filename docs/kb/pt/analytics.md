---
title: Compreender os dados do Analytics
description: Como ler sessões, engajamento, eventos principais e receita do GA4 do site, verificar a medição e exportar as linhas necessárias.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-27
---

A tela **Analytics** lê a propriedade do GA4 conectada ao projeto. No topo fica um resumo de sessões, taxa de engajamento, eventos principais e receita de compras. Abaixo, o seletor de relatórios oferece **Páginas de destino**, **Páginas e telas**, **Aquisição de tráfego**, **Eventos principais**, **E-commerce**, **Pesquisa no site**, **Público** e **Status da medição**. As notas sobre como ler os números ficam na seção recolhida **Compreender os dados do Analytics**; escopo, datas e avisos permanecem sempre visíveis.

## Escopo: canal, propriedade e datas

O canal padrão é **Pesquisa orgânica**, que inclui todos os mecanismos de busca, não só o Google. **Todo o tráfego** muda ao mesmo tempo o resumo e o relatório. **Pesquisa no site** sempre cobre todo o tráfego e não tem seletor de canal.

Os números incluem todos os hosts e fluxos de dados da propriedade. Se outro site ou aplicativo enviar dados para a mesma propriedade, esses dados também entram.

Os períodos de 7, 28 e 90 dias terminam ontem, no fuso horário da propriedade. A tela mostra as datas atuais, o período anterior de mesma duração e o fuso horário. Ontem é um dia encerrado, mas o GA4 ainda pode reprocessar os dias recentes. Um link pode definir datas exatas com `startDate` e `endDate`; uma data final no futuro volta para ontem, com um aviso.

O GA4 e o Search Console usam calendários diferentes (fuso da propriedade versus horário do Pacífico) e medidas diferentes. As mesmas datas podem cobrir horas diferentes.

## Leia o resumo

- **Eventos principais** contam eventos, não clientes únicos.
- O **tempo de engajamento** é um total, não uma média por usuário.
- **Receita** igual a zero não prova que o site não tenha loja. Uma moeda desconhecida aparece ao lado do valor.
- Os valores diários separam um dia desconhecido de um dia com valor zero.

Se um valor não puder ser lido, a tela mostra **Não foi possível determinar o tráfego deste período** e mantém os valores que conseguiu ler. As restrições informadas pelo Google, como amostragem ou limites de privacidade, aparecem ao lado das métricas; uma causa desconhecida é declarada como tal. Dados restritos não são usados em comparações ou recomendações conclusivas. Se o Google truncou os dados no período escolhido, o resumo e o relatório mostram o motivo e as datas informados pelo Google, e a comparação entre períodos não é exibida.

Para corrigir um erro de leitura, clique em **Tentar novamente** ou abra **Status da medição**. Trocar de canal não resolve o problema.

## Trabalhe com as linhas do relatório

O relatório mostra 50, 100 ou 200 linhas por página; **Página anterior** e **Página seguinte** percorrem as demais. Filtros, ordenação, resumos e exportações valem para a página de linhas visível. Clicar em uma barra do gráfico filtra a tabela sem alterar o resumo.

- O mesmo usuário pode aparecer em várias categorias: não some os usuários das categorias para obter usuários únicos.
- O mesmo caminho em hosts diferentes, e produtos com o mesmo nome mas IDs diferentes, ficam em linhas separadas.
- Os gráficos de participação na receita não aparecem se algum valor for negativo ou desconhecido.

O filtro **Alto tráfego, baixa conversão** é um ponto de partida para investigação. Ele exige pelo menos quatro páginas listadas com no mínimo 30 sessões cada e não estima vendas perdidas. Uma página sem eventos principais não prova um problema de rastreamento, e pesquisas frequentes no site não provam falta de conteúdo.

## Grupos de endereços vindos de Oportunidades

**Examinar grupo de endereços do Analytics**, na tela [Oportunidades](/docs/firsatlar/), abre **Páginas de destino** filtradas por um grupo de endereços, com as datas dos dados de origem. O servidor lê do Google todas as linhas de páginas de destino orgânicas antes de dividi-las em páginas, então o grupo inteiro é correspondido. Parâmetros de consulta e barras finais ficam no mesmo grupo; hosts diferentes e caminhos com maiúsculas diferentes ficam separados. Se um limite da fonte ou uma restrição de dados impedir a correspondência completa, a tela avisa; um resultado vazio não prova ausência de tráfego. O resumo mantém o escopo da propriedade inteira. **Remover filtro de grupo de endereços** volta ao relatório completo.

## Links e exportações

Relatório, canal, datas, detalhamento, tamanho e posição da página ficam na URL: um link ou o botão Voltar restauram a mesma visualização. O filtro exato por host e caminho vale apenas para as linhas listadas e não agrupa variantes de URL.

**CSV** e **Exportar para Sheets** exportam as linhas filtradas com os números brutos. A coluna `ga4_scope_json` registra fonte, propriedade, datas, fuso horário, moeda, qualidade dos dados, página e filtros.

## Status da medição

**Status da medição** lê as configurações de Admin da propriedade: fluxos de dados da Web, medição otimizada, eventos principais e definições personalizadas. Nada é alterado na sua conta. "Nenhuma lacuna nas configurações verificadas" não prova que a tag envia dados; para isso, use as verificações de coleta vinculadas. Com a medição otimizada desativada, nenhum dos eventos automáticos dela está ativo. Contagens marcadas como "pelo menos" vêm de um inventário que pode estar incompleto.

## Cota

A seção recolhida de cota mostra os tokens de relatório restantes segundo a última resposta, não o consumo no período escolhido. O limite das propriedades padrão usado na comparação é uma suposição. **Atualizar** solicita de novo os relatórios visíveis e consome tokens.
