---
title: Analytics
description: Veja o que os visitantes que vêm da busca fazem depois. Relatórios do Google Analytics 4, eventos-chave e se a sua medição está funcionando direito.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-22
---

Nesta tela você vê o que fazem as pessoas que chegam ao seu site. O Search Console diz o que acontece no Google. O Analytics diz o que o visitante faz no seu site.

A tela mostra sete relatórios da sua conta do Google Analytics 4. Por padrão, ela filtra apenas os visitantes que vieram da busca (busca orgânica). A oitava aba verifica a própria medição: o contador está funcionando? Há um evento-chave definido?

## O que há na tela

**Abas.** **Giriş sayfaları** (Páginas de entrada), **Sayfa performansı** (Desempenho das páginas), **Trafik kaynakları** (Fontes de tráfego), **Anahtar olaylar** (Eventos-chave), **E-ticaret** (Comércio eletrônico), **Site içi arama** (Busca no site), **Kitle dağılımı** (Distribuição do público) e **Ölçüm durumu** (Estado da medição). Uma pergunta curta aparece sob cada aba. Uma página de entrada é a primeira página em que um visitante entra no seu site. Um evento-chave é uma ação que você conta como importante.

**Controles.** **Dönem** (Período): Son 7 gün, Son 28 gün, Son 3 ay (últimos 7 dias, últimos 28 dias, últimos 3 meses). **Kanal** (Canal): Organik arama (Busca orgânica) (padrão) ou Tüm trafik (Todo o tráfego). **Satır** (Linhas): 50, 100, 200. Na aba de público, você escolhe **Cihaz** (Dispositivo), **Ülke** (País), **Yeni / geri dönen** (Novos / recorrentes). Na aba de tráfego, você escolhe **Kanal grubu** (Grupo de canais), **Kaynak / ortam** (Origem / mídia), **Kampanya** (Campanha). Suas escolhas são gravadas na barra de endereços.

**Painel de sessões orgânicas.** Na aba de páginas de entrada, fica acima da tabela. Uma sessão é uma visita inteira. O painel tem uma linha diária de sessões e os cartões **Oturum** (Sessões) e **Etkileşim oranı** (Taxa de engajamento). Se a receita for medida, **Organik gelir** (Receita orgânica) também aparece. Todos mostram a variação em relação ao período anterior.

**Tabela.** As colunas mudam conforme o relatório. Exemplos: **Alan adı** (Nome do domínio), **Giriş sayfası** (Página de entrada), **Sayfa** (Página), **Olay** (Evento), **Kanal** (Canal), **Cihaz** (Dispositivo), **Ülke** (País), **Ürün** (Produto), **Arama terimi** (Termo de busca). Medidas: **Oturum** (Sessões), **Aktif kullanıcı** (Usuários ativos), **Etkileşim oranı** (Taxa de engajamento), **Anahtar olay** (Evento-chave), **Gelir** (Receita), **Görüntülenme** (Visualizações). Se nenhum evento-chave estiver definido, mostra sempre 0.

**Linha sob a tabela.** Informa quantas linhas são mostradas. Se o Google amostrou os dados, acrescenta "örneklenmiş" (amostrado). Se ele ocultou linhas por privacidade, acrescenta "eşik altı satırlar gizlendi" (linhas abaixo do limite foram ocultadas).

**Filtros rápidos.** **Sadece organik** (Somente orgânico), **Etkileşimi düşük** (Baixo engajamento) (abaixo de 50%), **Dönüşümü olan** (Com conversões), **Geliri olan** (Com receita), **Etkileşim süresi düşük** (Baixo tempo de engajamento), **Trafiği yüksek, dönüşümü düşük** (Muito tráfego, poucas conversões).

**Cartões de resumo.** As abas de eventos-chave, comércio eletrônico e busca no site têm seus próprios cartões de resumo.

**Aba de estado da medição.** Quatro cartões: **Web veri akışı** (Fluxo de dados da web), **Anahtar olay** (Evento-chave), **Özel boyut** (Dimensão personalizada), **Bulgu** (Constatação). As constatações podem ser estas: "Web veri akışı yok" (Não há fluxo de dados da web), "Gelişmiş ölçüm kapalı" (A medição aprimorada está desativada), "Site içi arama ölçülmüyor" (A busca no site não é medida), "Anahtar olay tanımlı değil" (Nenhum evento-chave definido), "Envanter eksik olabilir" (O inventário pode estar incompleto). As sete opções da medição aprimorada são mostradas uma a uma: Kaydırma (Rolagens), Dış bağlantı (Cliques de saída), Site içi arama (Busca no site), Video (Vídeo), Dosya indirme (Downloads de arquivos), Form (Formulário), Sayfa geçişleri (Mudanças de página). Se não houver problema, aparece "Ölçüm kurulumunda eksik bulunamadı." (Nenhuma lacuna foi encontrada na configuração da medição.)

**Estados vazios.** Aparece "Bu dönemde veri yok" (Sem dados neste período) e são oferecidos dois atalhos: **Tüm trafiğe bak** (Ver todo o tráfego), **Ölçüm durumunu kontrol et** (Verificar o estado da medição). Se o Analytics não estiver conectado, aparece "Google Analytics bağlı değil" (O Google Analytics não está conectado).

## Como usar

1. Olhe primeiro a aba **Ölçüm durumu**. Se ela disser "Anahtar olay tanımlı değil", as colunas de conversão ficam em zero. Primeiro defina um evento-chave no Analytics.
2. Na aba **Giriş sayfaları**, olhe a coluna **Alan adı**. Se você vir localhost ou 127.0.0.1, um site de teste no seu próprio computador está enviando dados. Essas linhas não são visitas reais. O aplicativo não filtra isso para você.
3. Se o tráfego caiu, abra a aba **Trafik kaynakları** com **Kanal grubu**. Se a queda for só na busca, o problema está na busca. Se caiu em todos os canais, há um problema na medição ou no site.
4. O botão **Trafiği yüksek, dönüşümü düşük** mostra isto: o Google envia visitantes, mas a página não os retém. O trabalho a fazer está na tela Fırsatlar (Oportunidades).

## Como os números são calculados

O período termina ontem, no fuso horário da conta. O Analytics entrega os dados com um dia de atraso. Se "Organik arama" estiver escolhido, só são contadas as visitas vindas do Google ou de outro mecanismo de busca.

Cada relatório pede no máximo 200 linhas. O estado da medição lê as configurações do Analytics e não gasta da cota de relatórios. Se a cota de relatórios acabar, você vê o erro "Google Analytics reporting quota is exhausted." (a cota de relatórios do Analytics foi usada por completo). As cotas são acompanhadas na seção de limites em **Ayarlar** (Configurações).

## Perguntas frequentes

**Por que o número de sessões é diferente dos cliques do Search Console?** Os dois contam coisas diferentes. O Search Console conta cliques no Google. O Analytics conta sessões que chegam ao site. Um visitante que não dá consentimento aos cookies nunca chega ao Analytics.

**O número de linhas fica em 200.** São pedidas no máximo 200 linhas por vez. Encurte o período ou mude o detalhamento.

**Por que a cota acabou?** Uma conta padrão recebe 200.000 tokens (unidades de cota) por dia e 40.000 por hora. Cada relatório gasta alguns tokens. Clicar em **Yenile** (Atualizar) repetidamente esgota a cota.

## Limites

O que o Analytics não mede, esta tela também não pode mostrar. Isso inclui visitas sem consentimento de cookies, eventos-chave não definidos e a medição aprimorada desativada. A tela não filtra sozinha o tráfego de localhost. O Analytics e o Search Console informam em fusos horários diferentes. As correspondências diárias podem se deslocar um dia.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
