/* eslint-disable max-lines -- locale translation data */
import type { Catalog } from "@/shared/i18n";

/** Portuguese (Portugal) for the Search performance screen, its to-do copy and the printable report. */
export const ptSearch: Catalog = {
  "Arşivde en çok gösterim": "Mais impressões neste arquivo",
  "{date} tarihli geçmiş bu bilgisayarda saklı; Google'ın 16 ay sınırı buna uygulanmaz.":
    "O histórico de {date} está guardado neste computador; o limite de 16 meses do Google não se aplica.",
  "Marka adları kaydedildi": "Nomes da marca salvos",
  "Marka adları kaydedilemedi": "Não foi possível salvar os nomes da marca",
  "Sitenizin adını ve insanların onu nasıl yazdığını girin. Bu kelimeleri içeren aramalar marka araması sayılır.":
    "Insira o nome do seu site e as formas como as pessoas o escrevem. As pesquisas com essas palavras contam como pesquisas de marca.",
  "Marka adları": "Nomes da marca",
  "{term} adını kaldır": "Remover {term}",
  "Marka adı ekle": "Adicionar um nome da marca",
  "Örnek: örnek site": "Exemplo: site de exemplo",
  Ekle: "Adicionar",
  "Öneriler:": "Sugestões:",
  "Eşiği aşan değişim yok.": "Nenhuma variação acima do limite.",
  "{previous} → {current} tıklama": "{previous} → {current} cliques",
  "sıra {position}": "posição {position}",
  "Düşenler ({count})": "Em queda ({count})",
  "Yükselenler ({count})": "Em alta ({count})",
  "Arşivde henüz gün yok. Bu ekran her açıldığında Search Console'dan günlük toplamları alıp bu bilgisayarda saklar; ay ay eğilim birkaç gün içinde burada görünür.":
    "Ainda não há dias no arquivo. Sempre que esta tela é aberta, ela salva neste computador os totais diários do Search Console; a tendência mês a mês aparece aqui em poucos dias.",
  "Arşiv {date} tarihinden başlıyor; iki ay dolunca eğilim burada görünür.":
    "O arquivo começa em {date}; a tendência aparece quando ele tiver dois meses.",
  "{count} aylık tıklama, {start} – {end}.":
    "Cliques em {count} meses, {start} – {end}.",
  "Aylık tıklama": "Cliques mensais",
  Ay: "Mês",
  "Arşivdeki gün": "Dias no arquivo",
  "Bu bilgisayardaki arşivden, cihaz filtresine göre (ülke filtresi uygulanmaz). Kesik çizgili çubuk: arşivin o ayın tamamını tutmadığı ay.":
    "Do arquivo neste computador, segundo o filtro de dispositivo (o filtro de país não se aplica). Barra tracejada: um mês que o arquivo não tem completo.",
  "Önceki döneme göre en çok değişenler":
    "Maiores variações em relação ao período anterior",
  "{start} – {end} ile karşılaştırma. En az {clicks} tıklamalık ve {share} oranında bir değişim aranır.":
    "Comparado com {start} – {end}. Busca uma variação de pelo menos {clicks} cliques e {share}.",
  "Satır sınırı yüzünden bir dönemin tablosu eksik; yalnızca iki dönemde de görünen satırlar karşılaştırıldı.":
    "A tabela de um período está incompleta por causa do limite de linhas; só foram comparadas as linhas presentes nos dois períodos.",
  "Yeni ve kaybolan sorgular": "Consultas novas e perdidas",
  "Yalnızca bir dönemde en az {impressions} gösterim alan sorgular.":
    "Consultas com pelo menos {impressions} impressões em apenas um dos dois períodos.",
  "Yeni görünenler": "Novas",
  "Önceki dönemin tablosu satır sınırında kesildiği için hangi sorguların yeni olduğu bilinemiyor.":
    "Não é possível saber quais consultas são novas: a tabela do período anterior foi cortada no limite de linhas.",
  "Bu dönemde yeni görünen sorgu yok.": "Não há consultas novas neste período.",
  "Kaybolanlar (önceki dönemdeki değerleriyle)":
    "Perdidas (com os valores do período anterior)",
  "Bu dönemin tablosu satır sınırında kesildiği için hangi sorguların kaybolduğu bilinemiyor.":
    "Não é possível saber quais consultas foram perdidas: a tabela deste período foi cortada no limite de linhas.",
  "Kaybolan sorgu yok.": "Não há consultas perdidas.",
  "Gücünü kaybeden sayfalar": "Páginas perdendo força",
  "Son çeyrekteki tıklamaları, önceki dört çeyreğin en iyisinin {share} kadarından aza düşen ve geçen yılın aynı çeyreğinden de geride kalan sayfalar.":
    "Páginas cujos cliques no último trimestre ficaram abaixo de {share} do melhor dos quatro trimestres anteriores e também atrás do mesmo trimestre do ano passado.",
  "Bu karşılaştırma bir yılı aşkın veri ister; Search Console bu mülk için o kadar eski veri vermedi ya da filtre uygulanmış.":
    "Esta comparação precisa de mais de um ano de dados; o Search Console não retornou tantos dados para esta propriedade, ou há um filtro ativo.",
  "Belirgin biçimde gücünü kaybeden sayfa yok.":
    "Nenhuma página está claramente perdendo força.",
  "Son çeyrek {clicks} · en iyisi {peak} tıklama":
    "Último trimestre {clicks} · melhor {peak} cliques",
  "Uzun dönem: aylık tıklama": "Longo prazo: cliques mensais",
  "Search Console en fazla 16 ay geriye gider; bu arşiv günlük toplamları bu bilgisayarda daha uzun saklar.":
    "O Search Console guarda no máximo 16 meses; este arquivo mantém os totais diários neste computador por mais tempo.",
  sorgular: "consultas",
  sayfalar: "páginas",
  "sorgu-sayfa eşleşmeleri": "pares consulta-página",
  "Geçen yıl karşılaştırılamıyor: Google bu günleri artık vermiyor (en fazla 16 ay).":
    "Não é possível comparar com o ano passado: o Google não fornece mais esses dias (máximo de 16 meses).",
  "Önceki dönem karşılaştırılamıyor: Google bu günleri vermiyor.":
    "Não é possível comparar com o período anterior: o Google não fornece esses dias.",
  "Verinin durumu": "Status dos dados",

  "Kesinleşmemiş gün yok.": "Nenhum dia ainda em contagem.",
  "Son veri: {date}.": "Dados mais recentes: {date}.",
  "Bu dönem için Google'dan hiç satır gelmedi.":
    "O Google não retornou linhas para este período.",
  "Gizli sorgular": "Consultas ocultas",
  "Gizli sorgu payı hesaplanamadı (tıklama yok).":
    "Não é possível calcular a parcela de consultas ocultas (sem cliques).",
  "Satır sınırına ulaşıldı ({tables}); en az tıklanan uç eksik. Daraltmak için filtre kullanın.":
    "Limite de linhas atingido ({tables}); falta a cauda menos clicada. Use um filtro para restringir.",
  "Tablolar tam: {queries} sorgu, {pages} sayfa okundu.":
    "Tabelas completas: {queries} consultas e {pages} páginas lidas.",
  "Sıra 4-10": "Posição 4-10",
  "İlk sayfada ama ilk üçte değil: en çok tıklama kazandıran adım ilk üçe çıkmaktır.":
    "Na primeira página, mas fora das três primeiras posições: entrar nas três primeiras é o que traz mais cliques.",
  "Bu dönem için satır yok": "Sem linhas para este período",
  "Search Console bu dönem ve filtreler için satır vermedi. Dönemi genişletmeyi ya da filtreleri kaldırmayı deneyin.":
    "O Search Console não retornou linhas para este período e estes filtros. Escolha um período mais longo ou remova os filtros.",
  "Taban: okunan {rows} sorgu, {clicks} tıklama. Sitenin toplamı {site} tıklama; aradaki fark Google'ın gizlediği sorgulardan.":
    "Base: {rows} consultas lidas, {clicks} cliques. O total do site é de {site} cliques; a diferença são consultas que o Google oculta.",
  "Taban: okunan {rows} sayfa, {clicks} tıklama. Google sayfa satırlarını sayfa bazında topladığı için site toplamından ({site}) biraz farklı olabilir.":
    "Base: {rows} páginas lidas, {clicks} cliques. O Google soma as linhas de páginas por página, por isso pode diferir um pouco do total do site ({site}).",
  "Çubuk, satırın bu tablodaki tıklama payı.":
    "A barra é a parcela de cliques da linha nesta tabela.",
  "Google'ın satır sınırına ulaşıldı; en az tıklanan uç listede yok.":
    "O limite de linhas do Google foi atingido; a cauda menos clicada não está listada.",
  "Önceki dönem tablosu da kesildi; değişimi bilinmeyen satırlarda – yazar.":
    "A tabela do período anterior também foi cortada; linhas com variação desconhecida mostram –.",
  "Önceki dönemde bilinmiyor": "Desconhecido no período anterior",
  "Sıra {range}": "Posição {range}",
  "Paylar sitenin toplamına göre: {clicks} tıklama, {impressions} gösterim.":
    "Parcelas do total do site: {clicks} cliques, {impressions} impressões.",
  "Bu kırılımda filtre olduğu için paylar satırların toplamına göre: {clicks} tıklama.":
    "Há um filtro ativo nesta divisão, por isso as parcelas são do total das linhas: {clicks} cliques.",
  "{name} filtresini kaldır": "Remover o filtro {name}",
  "Tüm ekranı {name} ile daralt": "Restringir toda a tela a {name}",
  "Daha az göster": "Mostrar menos",
  "Tümünü göster ({count})": "Mostrar tudo ({count})",
  "Google'ın satır sınırına ulaşıldı; liste tam değil.":
    "O limite de linhas do Google foi atingido; a lista não está completa.",
  "{clicks} tıklama": "{clicks} cliques",
  "Okunan {count} sorgunun ortalama sırasına göre. Google'ın gizlediği sorgular burada yok.":
    "Pela posição média das {count} consultas lidas. As consultas ocultas pelo Google não estão incluídas.",
  "Haftalara göre sorgu dağılımı": "Consultas por semana",
  "{count} haftada, sıra aralıklarının sorgular içindeki payı.":
    "Parcela de cada faixa de posições entre as consultas, ao longo de {count} semanas.",
  Hafta: "Semana",
  "{date} haftası": "Semana de {date}",
  "Her hafta, o hafta görünen sorguların sıra aralıklarına dağılımı (pay). Bu bilgisayardaki sorgu arşivinden, kesin verilerle; tüm cihaz ve ülkeler.":
    "Em cada semana, como as consultas exibidas naquela semana se distribuem pelas faixas de posições (parcela). Do arquivo de consultas neste computador, dados definitivos; todos os dispositivos e países.",
  "Haftalık dağılım için sorgu arşivi doluyor; Sıralama takibi ekranı ya da bu ekran açıldıkça tamamlanır.":
    "O arquivo de consultas ainda está sendo preenchido para a divisão semanal; ele se completa ao abrir esta tela ou o Acompanhamento de posições.",
  "Haftalık dağılım cihaz ya da ülke filtresiyle gösterilmez: arşiv bu kırılımları tutmaz.":
    "A divisão semanal não aparece com filtro de dispositivo ou país: o arquivo não guarda essas divisões.",
  "Haftalık dağılım için en az iki hafta gerekir.":
    "A divisão semanal precisa de pelo menos duas semanas.",
  "{count} sorgu · {clicks} tıklama": "{count} consultas · {clicks} cliques",
  "(sorgu tıklamalarının {share} kadarı)":
    "({share} dos cliques das consultas)",
  "Tıklama oranı {ctr} · ortalama sıra {position}":
    "CTR {ctr} · posição média {position}",
  "Marka aramaları": "Pesquisas de marca",
  "Marka dışı aramalar": "Pesquisas sem marca",
  "{count} sorgu · tıklama oranı {ctr} · ortalama sıra {position}":
    "{count} consultas · CTR {ctr} · posição média {position}",
  "Marka adları: {terms}. Paylar okunan sorgulara göre; gizli sorgular dahil değil.":
    "Nomes da marca: {terms}. Parcelas das consultas lidas; as consultas ocultas não estão incluídas.",
  "Marka adlarını düzenle": "Editar nomes da marca",
  "Sorgularınız Google'da hangi sıralarda görünüyor.":
    "Em que posições suas consultas aparecem no Google.",
  "Marka ve marka dışı aramalar": "Pesquisas de marca e sem marca",
  "Adınızla gelen aramalar ile sizi bilmeden bulanlar ayrı ölçülür.":
    "As pesquisas pelo seu nome e as de pessoas que não conheciam você são medidas separadamente.",
  "Bir cihaza tıklayınca tüm ekran o cihaza göre daralır.":
    "Clique em um dispositivo para restringir toda a tela a ele.",
  "Bir ülkeye tıklayınca tüm ekran o ülkeye göre daralır.":
    "Clique em um país para restringir toda a tela a ele.",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü. Google bu dökümü sayfa bazında toplar.":
    "Os formatos especiais em que seus resultados apareceram no Google. O Google soma esta divisão por página.",
  "Google bu dönem için özel bir sonuç biçimi (zengin sonuç, video vb.) bildirmedi.":
    "O Google não indicou nenhum formato de resultado especial (pesquisa aprimorada, vídeo etc.) neste período.",
  "Soru ve uzun aramalar": "Perguntas e pesquisas longas",
  "Soru kalıbındaki aramalar ve {words} ya da daha çok kelimeli aramalar: içerik fikirlerinin en net kaynağı.":
    "Pesquisas em forma de pergunta e pesquisas com {words} ou mais palavras: a fonte mais clara de ideias de conteúdo.",
  "Soru aramaları": "Pesquisas em forma de pergunta",
  "Uzun aramalar": "Pesquisas longas",
  "Paneli kapat": "Fechar painel",
  "Ayrıntı yüklenemedi": "Não foi possível carregar os detalhes",
  "Search Console bağlantısı yok.": "O Search Console não está conectado.",
  "{start} – {end}, kesin günler": "{start} – {end}, dias definitivos",
  "{key} için günlük tıklama, toplam {total}.":
    "Cliques diários de {key}, {total} no total.",
  "Bu sayfanın sorguları ({count})": "Consultas desta página ({count})",
  "Bu sorguda görünen sayfalar ({count})":
    "Páginas exibidas para esta consulta ({count})",
  "Bu sayfa için listelenen sorgu yok; tıklamaları Google'ın gizlediği sorgulardan geliyor olabilir.":
    "Não há consultas listadas para esta página; os cliques podem vir de consultas ocultas pelo Google.",
  "Bu sorgu için sayfa satırı yok.":
    "Não há linhas de página para esta consulta.",
  "Sorgu-sayfa tablosu satır sınırında kesildi; bazı eşleşmeler eksik olabilir.":
    "A tabela consulta-página foi cortada no limite de linhas; podem faltar alguns pares.",
  "Sorgu satırlarının toplamı sayfanın toplamından küçük olabilir: gizli sorgular listelenmez.":
    "As linhas de consultas desta página podem somar menos do que o total dela: as consultas ocultas não são listadas.",
  "Hedef sayfa": "Página-alvo",
  "{count} sayfa bu sorguda": "{count} páginas nesta consulta",
  "Olası kazanç": "Ganho possível",
  "Yetersiz veri": "Dados insuficientes",
  "Sıra 4-20 arasındaki sorgular": "Consultas nas posições 4-20",
  "Marka dışı sorgularınızın her sıradaki tıklama oranı. Bir sırada en az {queries} sorgu ve {impressions} gösterim yoksa o sıra hesaba katılmaz; tahmin yapılmaz.":
    "A CTR das suas consultas sem marca em cada posição. Uma posição só conta com pelo menos {queries} consultas e {impressions} impressões; nada é estimado.",
  "Sorgularınızın her sıradaki tıklama oranı (marka adları tanımlanmadığı için marka aramaları dahil). Bir sırada en az {queries} sorgu ve {impressions} gösterim yoksa o sıra hesaba katılmaz; tahmin yapılmaz.":
    "A CTR das suas consultas em cada posição (incluindo pesquisas de marca, porque não há nomes da marca definidos). Uma posição só conta com pelo menos {queries} consultas e {impressions} impressões; nada é estimado.",
  "İlk üçe yakın sorgular": "Consultas perto das três primeiras posições",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. İlk üçe çıkarlarsa birlikte yaklaşık {clicks} ek tıklama getirebilir.":
    "{count} consultas com posição média entre 4 e 20 e pelo menos {impressions} impressões. Chegar às três primeiras posições poderia trazer, juntas, cerca de {clicks} cliques a mais.",
  "En büyük kazançlı {shown} tanesi listeleniyor.":
    "São listadas as {shown} com maior ganho.",
  "Sırasına göre az tıklanan sonuçlar":
    "Resultados com menos cliques do que a posição faria esperar",
  "Tıklama oranı, sitenizde aynı sıradaki sonuçların ortalamasının {share} kadarından az olan ve en az {impressions} gösterim alan sorgular. Başlık ve açıklama yeniden yazılarak kazanılabilir.":
    "Consultas cuja CTR fica abaixo de {share} da que seus resultados obtêm na mesma posição, com pelo menos {impressions} impressões. Um título e uma descrição reescritos podem conquistar esses cliques.",
  "Sırasına göre belirgin biçimde az tıklanan sonuç yok ya da karşılaştırma için yeterli veri yok.":
    "Nenhum resultado tem claramente poucos cliques para a sua posição, ou não há dados suficientes para comparar.",
  "Bu sırada beklenen": "Esperado nesta posição",
  "Görünen ama hiç tıklanmayan sayfalar":
    "Páginas que aparecem mas nunca são clicadas",
  "Bu dönemde en az {impressions} gösterim alıp tek tıklama almayan sayfalar.":
    "Páginas com pelo menos {impressions} impressões e nenhum clique neste período.",
  "{shown} / {total} sayfa listeleniyor.":
    "{shown} de {total} páginas listadas.",
  "Gösterim alıp hiç tıklanmayan sayfa yok.":
    "Nenhuma página teve impressões sem cliques.",
  "Sitenizin sıraya göre tıklama oranı": "CTR do seu site por posição",
  "Yukarıdaki kazançların ölçüsü: başka sitelerin değil, sizin sonuçlarınızın her sıradaki tıklama oranı.":
    "A medida dos ganhos acima: a CTR dos seus próprios resultados em cada posição, não a de outros sites.",
  Web: "Web",
  Video: "Vídeo",
  "Google güncellemesi": "Atualização do Google",
  Not: "Nota",
  "Site denetimi tamamlandı": "Auditoria do site concluída",
  "Not eklendi": "Nota adicionada",
  "Not eklenemedi": "Não foi possível adicionar a nota",
  "Not silindi": "Nota excluída",
  "Not silinemedi": "Não foi possível excluir a nota",
  "Grafikteki işaretler": "Marcadores do gráfico",
  "Notu sil: {note}": "Excluir nota: {note}",
  "Örnek: Yeni sayfa başlıkları yayına alındı":
    "Exemplo: novos títulos das páginas publicados",
  "Notu ekle": "Adicionar a nota",
  "Not ekle": "Adicionar uma nota",
  "Bu dönemin dışındaki notlar ({count})": "Notas fora deste período ({count})",
  "Önceki dönemle": "Em relação ao período anterior",
  "Geçen yılla": "Em relação ao ano passado",
  "Karşılaştırma yok": "Sem comparação",
  Yenilenemedi: "Não foi possível atualizar",
  "Google'da kaç kez göründüğünüz, kaç tıklama aldığınız ve önce neyi düzeltmeniz gerektiği.":
    "Quantas vezes você aparece no Google, quantos cliques recebe e o que corrigir primeiro.",
  "Sorgular (CSV)": "Consultas (CSV)",
  "Sayfalar (CSV)": "Páginas (CSV)",
  "İlk üçe yakın sorgular (CSV)":
    "Consultas perto das três primeiras posições (CSV)",
  "Sorguları E-Tablolar'a aktar": "Exportar consultas para o Sheets",
  "Sayfaları E-Tablolar'a aktar": "Exportar páginas para o Sheets",
  Karşılaştırma: "Comparação",
  "Mülk: {site}": "Propriedade: {site}",
  "Bu dönemde hiç gösterim yok": "Sem impressões neste período",
  "Seçili cihaz, ülke ya da arama türü için Google bu günlerde sitenizi hiç göstermedi. Filtreleri genişletmeyi deneyin.":
    "O Google não mostrou seu site para o dispositivo, país ou tipo de pesquisa escolhido nesses dias. Tente ampliar os filtros.",
  "Google bu günlerde sitenizi arama sonuçlarında göstermedi. Yeni bir siteyse birkaç gün sonra tekrar bakın; değilse dizin durumunu Site denetimi'nden kontrol edin.":
    "O Google não mostrou seu site nos resultados nesses dias. Se o site é novo, volte em alguns dias; caso contrário, verifique o status de indexação na Auditoria do site.",
  "Aynı sorguda birden çok sayfanızın göründüğü durumlar. Sayfalar birbirinin tıklamasını bölebilir; birini ana sayfa yapıp diğerlerinden ona bağlantı vermek çoğu zaman yeter.":
    "Consultas em que aparece mais de uma das suas páginas. As páginas podem dividir os cliques entre si; muitas vezes basta tornar uma delas a página principal e criar links para ela a partir das outras.",
  "Sorgular ({count})": "Consultas ({count})",
  "Değişimler ({count} düşüş)": "Variações ({count} em queda)",
  Değişimler: "Variações",
  Çakışmalar: "Sobreposições",
  "Geçen yıl": "Ano passado",
  "Önceki dönem": "Período anterior",
  "Zaman içinde": "Ao longo do tempo",
  "Zaman birimi": "Unidade de tempo",
  "Bu zaman biriminde çizilecek kadar dönem yok.":
    "Não há períodos suficientes para traçar nesta unidade de tempo.",
  "{metric} ({grain})": "{metric} ({grain})",
  Kesinleşmedi: "Não definitivo",
  "Gösterim yok": "Sem impressões",
  Kesin: "Definitivo",
  "{count} dönemlik {metric} grafiği. En iyi dönem {day}, {value}.":
    "Gráfico de {metric} ao longo de {count} períodos. Melhor período {day}, {value}.",
  "{metric} grafiği": "Gráfico de {metric}",
  "Eksik dönem": "Período incompleto",
  Gösterge: "Legenda",
  "Taralı günler: Google hâlâ sayıyor, toplamlara katılmadı":
    "Dias tracejados: o Google ainda está contando esses dias; ficam fora dos totais",
  "İçi boş nokta: eksik ya da kesinleşmemiş dönem":
    "Ponto vazio: período incompleto ou ainda não definitivo",
  "Karşılaştırma çizgisi yalnızca gün görünümünde.":
    "A linha de comparação só aparece na visualização por dia.",
  "Şu an önerilecek iş yok": "Nada a recomendar no momento",
  "Search Console verisinde eşiği aşan bir fırsat ya da düşüş bulunmadı. Daha uzun bir dönem seçmek ya da birkaç gün sonra tekrar bakmak yeni bulgular çıkarabilir.":
    "Não há oportunidades nem quedas acima dos limites nos dados do Search Console. Um período mais longo, ou voltar em alguns dias, pode trazer novos resultados.",
  "ilk {count} iş birlikte {days} günde yaklaşık {clicks} ek tıklama getirebilir (tahmin).":
    "as primeiras {count} tarefas poderiam trazer, em conjunto, cerca de {clicks} cliques a mais em {days} dias (estimativa).",
  "Listedeki işlerin hepsini yapıldı olarak işaretlediniz.":
    "Você marcou todas as tarefas da lista como feitas.",
  "Yapıldı olarak işaretlenenler ({count})": "Marcadas como feitas ({count})",
  "Tıklama kazançları, sitenizin kendi sıra ve tıklama oranlarından hesaplanan yaklaşık değerlerdir. Aynı sorgu ya da sayfa için birden çok iş varsa üstteki özet onu bir kez sayar. Yapıldı işaretleri yalnızca bu tarayıcıda saklanır.":
    "Os cliques ganhos são estimativas com base nas posições e na CTR do seu próprio site. Quando várias tarefas se referem à mesma consulta ou página, o resumo acima a conta uma vez só. As marcações de feito ficam salvas só neste navegador.",
  "{rank}. sıradaki iş:": "Tarefa {rank}:",
  "Marka adını gir": "Inserir o nome da marca",
  "Bu kırılımı aç": "Abrir esta divisão",
  Yapıldı: "Feito",
  Tablet: "Tablet",
  "Önceki dönem tıklama": "Cliques do período anterior",
  "Tıklama değişimi": "Variação de cliques",
  "Önceki dönem sıra": "Posição do período anterior",
  "↑{value} sıra": "↑{value} posições",
  "↓{value} sıra": "↓{value} posições",
  "“{query}” için ilk üçe çıkma fırsatı":
    "Uma oportunidade para “{query}” chegar às três primeiras posições",
  "Sıra {position} · {impressions} gösterim · {clicks} tıklama":
    "Posição {position} · {impressions} impressões · {clicks} cliques",
  "Hedef sayfayı bu sorguya göre güçlendirin: başlıkta ve ilk paragrafta sorgunun cevabını verin, ilgili sayfalarınızdan bu sayfaya bağlantı ekleyin.":
    "Reforce a página-alvo desta consulta: responda a ela no título e no primeiro parágrafo e crie links para a página a partir das suas páginas relacionadas.",
  "“{query}” görülüyor ama az tıklanıyor":
    "“{query}” é vista, mas pouco clicada",
  "Tıklama oranı {ctr}; sitenizde bu sıradaki sonuçların oranı {expected} · sıra {position} · {impressions} gösterim":
    "CTR {ctr}; seus resultados nesta posição obtêm {expected} · posição {position} · {impressions} impressões",
  "Sayfa başlığını ve açıklamasını aramadaki niyete göre yeniden yazın: sorgunun kelimelerini kullanın, bir sayı, yıl ya da açık bir fayda ekleyin.":
    "Reescreva o título e a descrição da página de acordo com a intenção da pesquisa: use as palavras da consulta e acrescente um número, um ano ou um benefício claro.",
  "“{query}” sorgusundan gelen tıklamalar düştü":
    "Os cliques de “{query}” caíram",
  "{page} sayfasının tıklamaları düştü": "Os cliques para {page} caíram",
  "Sıra da düştü: içeriği güncelleyin, aramadaki sorulara bugünkü cevabı verin ve sayfaya iç bağlantıları artırın.":
    "A posição também caiu: atualize o conteúdo, responda à pergunta como ela é feita hoje e adicione links internos para a página.",
  "Sıra yerinde, tıklama düştü: talep azalmış ya da sonuç sayfasına yeni bir öğe gelmiş olabilir. Başlığı ve açıklamayı gözden geçirin.":
    "Posição mantida, cliques em queda: a procura pode ter diminuído ou algo novo apareceu na página de resultados. Revise o título e a descrição.",
  "{page} eski gücünü kaybediyor": "{page} está perdendo força",
  "Son çeyrekte {clicks} tıklama; en iyi çeyreği {peak} tıklama ({start} – {end})":
    "{clicks} cliques no último trimestre; o melhor trimestre teve {peak} ({start} – {end})",
  "Sayfayı tazeleyin: eskiyen bilgileri düzeltin, yeni çıkan soruları ekleyin ve güncellediğiniz tarihi sayfada gösterin.":
    "Atualize a página: corrija informações desatualizadas, responda a perguntas novas e mostre a data de atualização.",
  "{page} görünüyor ama hiç tıklanmıyor": "{page} aparece, mas nunca é clicada",
  "{impressions} gösterim, 0 tıklama · sıra {position}":
    "{impressions} impressões, 0 cliques · posição {position}",
  "İkinci sayfadan sonrasında görünüyor: önce sırasını yükseltin; içeriği derinleştirin ve diğer sayfalarınızdan bağlantı verin.":
    "Aparece depois da primeira página: melhore primeiro a posição; aprofunde o conteúdo e crie links para ela a partir das suas outras páginas.",
  "İlk sayfada olduğu hâlde tıklanmıyor: başlık ve açıklama aramayla örtüşmüyor olabilir, yeniden yazın.":
    "Está na primeira página, mas não é clicada: o título e a descrição podem não corresponder à pesquisa; reescreva-os.",
  "“{query}” sorgusunda artık görünmüyorsunuz":
    "Você não aparece mais para “{query}”",
  "Önceki dönemde {clicks} tıklama, {impressions} gösterim; bu dönemde gösterim yok":
    "{clicks} cliques e {impressions} impressões no período anterior; nenhuma impressão neste",
  "Bu sorguyu karşılayan sayfa hâlâ yayında ve dizinde mi bakın; içerik değiştiyse sorgunun cevabını sayfaya geri ekleyin.":
    "Verifique se a página que responde a esta consulta continua publicada e indexada; se o conteúdo mudou, adicione a resposta de volta.",
  "Tıklama oranı {ctr} (site geneli {site})": "CTR {ctr} (site inteiro {site})",
  "sıra {position} (site geneli {site})":
    "posição {position} (site inteiro {site})",
  "{device} aramalarında geride kalıyorsunuz":
    "Você está ficando para trás nas pesquisas em {device}",
  "{country} aramalarında geride kalıyorsunuz":
    "Você está ficando para trás nas pesquisas de {country}",
  "Sayfalarınızı bu cihazda açıp okunurluğu ve hızı kontrol edin; Site denetimi'ndeki hız sonuçları nereden başlanacağını gösterir.":
    "Abra suas páginas neste dispositivo e verifique a legibilidade e a velocidade; os resultados de velocidade da Auditoria do site mostram por onde começar.",
  "Bu ülkedeki aramalara uygun dilde ve içerikte sayfanız var mı bakın; çok dilli bir siteyse hreflang ayarlarını gözden geçirin.":
    "Verifique se você tem páginas no idioma e com o conteúdo certos para pesquisas deste país; em um site multilíngue, revise as configurações de hreflang.",
  "{date} günü tıklamalarda olağan dışı düşüş":
    "Queda incomum de cliques em {date}",
  "{date} günü gösterimlerde olağan dışı düşüş":
    "Queda incomum de impressões em {date}",
  "{value}; önceki haftaların aynı gününde ortası {expected}":
    "{value}; a mediana do mesmo dia da semana nas semanas anteriores é {expected}",
  "O gün sitede bir değişiklik, kesinti ya da Google güncellemesi oldu mu bakın; grafikteki işaretler yardımcı olur.":
    "Verifique se nesse dia o site mudou, ficou fora do ar ou houve uma atualização do Google; os marcadores do gráfico ajudam.",
  "Marka adınızı tanımlayın": "Defina o nome da sua marca",
  "Marka sorguları ayrılmadan sitenin tıklama oranı beklentisi şişer ve fırsatlar eksik çıkar.":
    "Sem separar as pesquisas de marca, a CTR esperada do site fica inflada e oportunidades são perdidas.",
  "Marka adınızı ve yazılışlarını ekleyin; marka ve marka dışı aramalar ayrı ölçülür.":
    "Adicione o nome da marca e suas grafias; as pesquisas de marca e sem marca passam a ser medidas separadamente.",
  "Güven: yüksek": "Confiança: alta",
  "Güven: orta": "Confiança: média",
  "Güven: düşük": "Confiança: baixa",
  Podcast: "Podcast",
  "{start} – {end} ({days} gün)": "{start} – {end} ({days} dias)",
  "{start} – {end}": "{start} – {end}",
  "Son veri": "Dados mais recentes",
  Oluşturulma: "Criado",
  "Arama performansı raporu": "Relatório de desempenho da pesquisa",
  "Değişimler önceki {days} güne göre. Sıra değişimi yer olarak verilir (↑ yükseldi); tıklama oranı değişimi puan olarak.":
    "Variações em relação aos {days} dias anteriores. A variação de posição é em posições (↑ subiu); a de CTR, em pontos.",
  "Önceki dönem Google'da olmadığı için değişim gösterilmez.":
    "Nenhuma variação é mostrada porque o Google não tem o período anterior.",
  "Son günler hâlâ sayılıyor ({clicks} tıklama); toplamlara ve karşılaştırmalara katılmadı.":
    "Os últimos dias ainda estão sendo contados ({clicks} cliques); ficam fora dos totais e das comparações.",
  "Google'ın gizlediği sorgulardan gelen tıklama: {share}. Bu yüzden sorgu tablolarının toplamı site toplamından küçüktür.":
    "Cliques de consultas ocultas pelo Google: {share}. Por isso as tabelas de consultas somam menos do que o total do site.",

  Yapılacaklar: "A fazer",
  "Search Console verisinde eşiği aşan bir fırsat ya da düşüş bulunmadı.":
    "Não há oportunidades nem quedas acima dos limites nos dados do Search Console.",
  "Önce bunlar": "Comece por estas",
  "İlk {count} iş, kazancı tahmin edilemeyen işler.":
    "As primeiras {count} tarefas, com ganho não estimável.",
  "İlk {count} iş birlikte {days} günde yaklaşık {clicks} ek tıklama getirebilir (tahmin).":
    "As primeiras {count} tarefas poderiam trazer, em conjunto, cerca de {clicks} cliques a mais em {days} dias (estimativa).",
  "Tıklama kazançları, sitenizin kendi sıra ve tıklama oranlarından hesaplanan yaklaşık değerlerdir. Aynı sorgu ya da sayfa için birden çok iş varsa özet onu bir kez sayar.":
    "Os cliques ganhos são estimativas com base nas posições e na CTR do seu próprio site. Quando várias tarefas se referem à mesma consulta ou página, o resumo a conta uma vez só.",
  "Günlük tıklama": "Cliques diários",
  "Bu dönem": "Este período",
  "Hâlâ sayılan günler": "Dias ainda em contagem",
  "{days} günde {clicks} tıklama; en iyi gün {day}, {best} tıklama.":
    "{clicks} cliques em {days} dias; melhor dia {day}, {best} cliques.",
  "Bu dönemde tıklama yok.": "Sem cliques neste período.",
  İşaretler: "Marcadores",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. Olası kazanç, ilk üçe çıkarsa beklenen ek tıklamadır.":
    "{count} consultas com posição média entre 4 e 20 e pelo menos {impressions} impressões. O ganho possível são os cliques a mais esperados se elas chegarem às três primeiras posições.",
  "Bu aralıkta sorgu yok.": "Não há consultas nesta faixa.",

  "Belirgin biçimde az tıklanan sonuç yok.":
    "Nenhum resultado tem claramente poucos cliques.",
  "Beklenen oran: sitenizde aynı sıradaki sonuçların tıklama oranı.":
    "Taxa esperada: a CTR dos seus resultados na mesma posição.",

  "En az {queries} sorgu ve {impressions} gösterim olmayan sıralar için oran hesaplanmaz.":
    "Posições sem pelo menos {queries} consultas e {impressions} impressões não têm taxa.",
  Önceki: "Antes",

  "Önceki dönem: {start} – {end}. Tıklama sayıları.":
    "Período anterior: {start} – {end}. Número de cliques.",
  "Tıklaması düşen sorgular": "Consultas com cliques em queda",
  "Tıklaması düşen sayfalar": "Páginas com cliques em queda",
  "Tıklaması artan sorgular": "Consultas com cliques em alta",
  "Tıklaması artan sayfalar": "Páginas com cliques em alta",
  "Yeni görünen sorgular": "Consultas novas",

  "Kaybolan sorgular (önceki dönemdeki değerleriyle)":
    "Consultas perdidas (com os valores do período anterior)",

  "Çeyrek: 91 gün.": "Trimestre: 91 dias.",
  "Son çeyrek": "Último trimestre",
  "En iyi çeyrek": "Melhor trimestre",

  "Google'ın tercih ettiği sayfa": "Página preferida pelo Google",

  "Paylar sitenin toplamına göre.": "Parcelas do total do site.",
  "Paylar satırların toplamına göre.": "Parcelas do total das linhas.",
  "İlk {limit} / {total}.": "Primeiros {limit} de {total}.",
  "Bilinmiyor: marka adları tanımlanmadı.":
    "Desconhecido: não há nomes da marca definidos.",
  "Marka adları: {terms}.": "Nomes da marca: {terms}.",
  "Okunan sorguların ortalama sırasına göre.":
    "Pela posição média das consultas lidas.",

  "Paylar okunan sorguların tıklamasına göre.":
    "Parcelas dos cliques das consultas lidas.",
  "{words}+ kelimeli aramalar": "Pesquisas com {words}+ palavras",
  "Google Search Console API, bu mülk için. Başka bir veri kaynağı, tahmini hacim ya da rakip verisi kullanılmadı.":
    "A API do Google Search Console, para esta propriedade. Não foi usada outra fonte de dados, volume estimado nem dados de concorrentes.",

  "Site toplamları": "Totais do site",
  "Site toplamı tarihe göre istenen toplamdan gelir, sorgu ya da sayfa satırlarının toplamından değil. Ortalama sıra gösterime göre ağırlıklıdır; tıklama oranı tıklama bölü gösterimdir.":
    "O total do site vem da solicitação agrupada por data, não da soma das linhas de consultas ou páginas. A posição média é ponderada pelas impressões; a CTR é cliques divididos por impressões.",

  "Kazanç tahminleri": "Estimativas de ganho",
  "Sitenizin kendi sıra-tıklama oranı eğrisinden hesaplanır; yeterli veri olmayan sıralar için tahmin yapılmaz.":
    "Tiradas da curva posição-CTR do seu próprio site; posições sem dados suficientes não têm estimativa.",
  "Google istekleri": "Solicitações ao Google",

  "Yöntem ve sınırlar": "Método e limites",
  "{host} arama performansı, {start} – {end}{filters}":
    "Desempenho da pesquisa de {host}, {start} – {end}{filters}",
  "{days} günde {clicks} tıklama, {impressions} gösterim.":
    "{clicks} cliques e {impressions} impressões em {days} dias.",
  "Tıklama oranı {ctr}, ortalama sıra {position}.":
    "CTR {ctr}, posição média {position}.",
  "İlk iş: {title}.": "Primeira tarefa: {title}.",
  "Arama performansı raporu saklama sınırını aşıyor. Daha kısa bir dönem ya da filtre seçip yeniden deneyin.":
    "O relatório de desempenho da pesquisa excede o limite de armazenamento. Escolha um período mais curto ou um filtro e tente novamente.",
  "Şu an 4. ile 20. sıra arasında yeterli gösterimi olan sorgu yok. Sorgular bu aralığa girdikçe burada listelenir.":
    "No momento, nenhuma consulta com impressões suficientes está entre as posições 4 e 20. As consultas aparecem aqui quando entram nessa faixa.",
  "Ortalama sırası 4–20 olan {count} sorgu; ilk üçe çıkarlarsa yaklaşık {clicks} ek tıklama.":
    "{count} consultas em posição média 4–20; chegar às três primeiras posições poderia trazer cerca de {clicks} cliques a mais.",
  "Onaylanmadı.": "Não confirmado.",
  "Alan adından önerilen adlar: {terms}.":
    "Nomes sugeridos a partir do seu domínio: {terms}.",
  "Önerileri onayla": "Confirmar sugestões",
  "Alan adından önerilen marka adlarıyla ölçüldü: {terms}. Onaylayın ya da düzeltin.":
    "Medido com nomes da marca sugeridos a partir do seu domínio: {terms}. Confirme-os ou corrija-os.",
  // Search performance review, 2026-10-26
  "Aynı sorgu, birden çok sayfa": "Várias páginas para a mesma consulta",
  "Birden çok sayfanın yarıştığı sorgu": "Consultas com páginas concorrentes",
  "{count} / {total}": "{count} / {total}",
  "incelenen sorguların {share} kadarı": "{share} das consultas analisadas",
  "Ana sayfa dışına giden gösterim":
    "Impressões que vão para as outras páginas",
  "incelenen gösterimlerin {share} kadarı": "{share} das impressões analisadas",
  "2. sayfa {share} gösterim alıyor":
    "a segunda página recebe {share} das impressões",
  "Diğer {count} sayfa {share} gösterim alıyor": {
    one: "{count} outra página recebe {share} das impressões",
    other: "as outras {count} páginas recebem {share} das impressões",
  },
  "{impressions} gösterim · {clicks} tıklama":
    "{impressions} impressões · {clicks} cliques",
  "1 yıl önce": "Há um ano",
  "Çeyrek başına tıklama, eskiden yeniye: {values}":
    "Cliques por trimestre, do mais antigo ao mais recente: {values}",
  "Yalnızca bir dönemde en az {impressions} gösterim alan sorgular, en çok gösterimden aza.":
    "Consultas com pelo menos {impressions} impressões em apenas um dos dois períodos, das mais vistas para as menos vistas.",
  "{count} tanesi hiç tıklama almadı.": {
    one: "{count} delas não recebeu cliques.",
    other: "{count} delas não receberam cliques.",
  },
  "Veriler {date} tarihine kadar kesin; son {count} gün hâlâ sayılıyor (grafikte taralı).":
    {
      one: "Os dados são definitivos até {date}; o Google ainda está contando o último {count} dia (hachurado no gráfico).",
      other:
        "Os dados são definitivos até {date}; o Google ainda está contando os últimos {count} dias (hachurados no gráfico).",
    },
  "Veriler {date} tarihine kadar kesin.":
    "Os dados são definitivos até {date}.",
  "Karşılaştırma: geçen yılın aynı günleri ({start} – {end}).":
    "Comparado com os mesmos dias do ano passado ({start} – {end}).",
  "Karşılaştırma: önceki {days} gün ({start} – {end}).":
    "Comparado com os {days} dias anteriores ({start} – {end}).",
  "Search Console mülkü: {site}": "Propriedade do Search Console: {site}",
  "Veri hakkında": "Sobre os dados",
  "Kesin günler: {start} – {end} ({days} gün). Search Console bir günü birkaç gün boyunca saymaya devam eder; toplamlar ve karşılaştırmalar yalnızca sayımı bitmiş günleri kullanır. Günler Google'ın kullandığı Pasifik saatine göredir.":
    "Dias definitivos: {start} – {end} ({days} dias). O Search Console continua contando um dia durante vários dias; totais e comparações usam só os dias já contados. Os dias seguem o horário do Pacífico, como no Google.",
  "Son {count} gün hâlâ sayılıyor olabilir (Google tarih bildirmedi); toplamlara katılmadı.":
    {
      one: "O Google talvez ainda esteja contando o último {count} dia (não informou a data); ele fica fora dos totais.",
      other:
        "O Google talvez ainda esteja contando os últimos {count} dias (não informou a data); eles ficam fora dos totais.",
    },
  "Son {count} gün hâlâ sayılıyor; toplamlara katılmadı.": {
    one: "O Google ainda está contando o último {count} dia; ele fica fora dos totais.",
    other:
      "O Google ainda está contando os últimos {count} dias; eles ficam fora dos totais.",
  },
  "Tıklamaların {share} kadarı ({clicks}) Google'ın gizlilik nedeniyle göstermediği aramalardan geliyor. Site toplamına dahil, sorgu tablosunda yok; bu yüzden sorgu tablosunun toplamı daha küçüktür.":
    "{share} dos cliques ({clicks}) vêm de pesquisas que o Google não mostra por privacidade. Eles entram no total do site, mas não na tabela de pesquisas, por isso a tabela soma menos.",
  "Tıklamaların {share} kadarı, Google'ın gizlilik nedeniyle göstermediği ya da satır sınırının dışında kalan aramalardan geliyor. Site toplamına dahil, sorgu tablosunda yok.":
    "{share} dos cliques vêm de pesquisas que o Google não mostra por privacidade ou que ficam além do limite de linhas. Eles entram no total do site, mas não na tabela de pesquisas.",
  "Bu görünüm için Google'a {count} istek gönderildi.": {
    one: "Esta visualização enviou {count} solicitação ao Google.",
    other: "Esta visualização enviou {count} solicitações ao Google.",
  },
  "Bu görünüm birkaç dakika içinde alınmış yanıtlardan geldi; Google'a yeni istek gönderilmedi.":
    "Esta visualização veio de respostas obtidas nos últimos minutos; nenhuma nova solicitação foi enviada ao Google.",
  "Marka aramaları ayrılmadı": "Pesquisas de marca não separadas",
  "Marka adınızı girmeden hangi aramaların sizi adınızla bulduğu bilinemez.":
    "Sem o nome da sua marca, não dá para saber quais pesquisas encontraram você pelo nome.",
  "Marka adını ekle": "Adicionar nome da marca",
  "Önceki dönemle karşılaştırılamadı.":
    "Não foi possível comparar com o período anterior.",
  "Bu ay henüz tamamlanmadı ({days} gün)":
    "Este mês ainda não terminou ({days} dias até agora)",
  "Son çubuk kesik çizgili: bu ay henüz tamamlanmadı.":
    "A última barra é tracejada: este mês ainda não terminou.",
  "Sıra {position} · tıklama oranı {ctr} (bu sırada {expected}) · {gain}":
    "Posição {position} · CTR {ctr} ({expected} nesta posição) · {gain}",
  "Olası kazanç (en fazla)": "Ganho possível (no máximo)",
  "{share} tıklama": "{share} dos cliques",
  "Sorgu sayısı": "Número de consultas",
  "Tıklama payı": "Parcela de cliques",
  "{date} (eksik veri)": "{date} (dados incompletos)",
  "Arşivde eksik; paylar karşılaştırılamaz":
    "Incompleta no arquivo; parcelas não comparáveis",
  "Arşiv {count} haftalık; soluk çubuklu haftalar eksik veri, paylar onlarla karşılaştırılamaz.":
    {
      one: "O arquivo cobre {count} semana completa; as semanas esmaecidas têm dados incompletos e suas parcelas não são comparáveis.",
      other:
        "O arquivo cobre {count} semanas completas; as semanas esmaecidas têm dados incompletos e suas parcelas não são comparáveis.",
    },
  "Arşivde henüz tam bir hafta yok; soluk çubuklar eksik veri, paylar karşılaştırılamaz.":
    "O arquivo ainda não tem uma semana completa; as barras esmaecidas têm dados incompletos, parcelas não comparáveis.",
  "Sıralama fırsatları ({count})": "Oportunidades de posicionamento ({count})",
  "Google hâlâ sayıyor; bu gün toplamlara katılmadı":
    "O Google ainda está contando; este dia não entra nos totais",
  "Son {days} günde {clicks} tıklama, {impressions} gösterim.":
    "{clicks} cliques e {impressions} impressões nos últimos {days} dias.",
  "Son {days} günde tıklamalar geçen yılın aynı günleriyle aynı.":
    "Nos últimos {days} dias, os cliques ficaram iguais aos dos mesmos dias do ano passado.",
  "Son {days} günde tıklamalar geçen yıla göre {share} arttı.":
    "Nos últimos {days} dias, os cliques subiram {share} em relação ao ano passado.",
  "Son {days} günde tıklamalar geçen yıla göre {share} azaldı.":
    "Nos últimos {days} dias, os cliques caíram {share} em relação ao ano passado.",
  "Son {days} günde tıklamalar önceki dönemle aynı.":
    "Nos últimos {days} dias, os cliques ficaram iguais aos do período anterior.",
  "Son {days} günde tıklamalar önceki döneme göre {share} arttı.":
    "Nos últimos {days} dias, os cliques subiram {share} em relação ao período anterior.",
  "Son {days} günde tıklamalar önceki döneme göre {share} azaldı.":
    "Nos últimos {days} dias, os cliques caíram {share} em relação ao período anterior.",
  "Tıklama oranı {points} puan arttı.": "A CTR subiu {points} pontos.",
  "Tıklama oranı {points} puan düştü.": "A CTR caiu {points} pontos.",
  "Ortalama sıra {places} basamak yükseldi.":
    "A posição média melhorou {places}.",
  "Ortalama sıra {places} basamak geriledi.":
    "A posição média piorou {places}.",
  "Önce yapılacak {count} iş hazır.": {
    one: "{count} primeira tarefa está pronta.",
    other: "As primeiras {count} tarefas estão prontas.",
  },
  "Önce yapılacak {count} iş birlikte en fazla {clicks} ek tıklama getirebilir (üst sınır).":
    {
      one: "A primeira {count} tarefa pode trazer no máximo {clicks} cliques a mais (limite superior).",
      other:
        "As primeiras {count} tarefas juntas podem trazer no máximo {clicks} cliques a mais (limite superior).",
    },
  "Tüm yapılacaklar ({count})": "Todas as tarefas ({count})",
  "en fazla +{count} tıklama": {
    one: "no máximo +{count} clique",
    other: "no máximo +{count} cliques",
  },
  "Sıra {position}": "Posição {position}",
  "Neden ve ne yapmalı": "Por quê e o que fazer",
  "Bu iş yapılırsa aynı uzunlukta bir dönemde beklenen en fazla ek tıklama (üst sınır).":
    "O máximo de cliques extras esperado em um período de mesma duração se isto for feito (limite superior).",
  "Değişmedi (±{value} sıra)": "Sem mudança (±{value} posições)",
  "≈ +{count} tıklama": {
    one: "≈ +{count} clique",
    other: "≈ +{count} cliques",
  },
  "{count} sorgu ilk üçe yakın": {
    one: "{count} consulta perto das três primeiras posições",
    other: "{count} consultas perto das três primeiras posições",
  },
  "{count} sonuç sırasına göre az tıklanıyor": {
    one: "{count} resultado recebe poucos cliques para a posição",
    other: "{count} resultados recebem poucos cliques para a posição",
  },
  "{count} sorgudan gelen tıklama düştü": {
    one: "Os cliques caíram em {count} consulta",
    other: "Os cliques caíram em {count} consultas",
  },
  "{count} sayfanın tıklaması düştü": {
    one: "Os cliques caíram em {count} página",
    other: "Os cliques caíram em {count} páginas",
  },
  "{count} sayfa eski gücünü kaybediyor": {
    one: "{count} página está perdendo força",
    other: "{count} páginas estão perdendo força",
  },
  "{count} sayfa görünüyor ama hiç tıklanmıyor": {
    one: "{count} página aparece, mas nunca é clicada",
    other: "{count} páginas aparecem, mas nunca são clicadas",
  },
  "{count} sorguda artık görünmüyorsunuz": {
    one: "Você não aparece mais em {count} consulta",
    other: "Você não aparece mais em {count} consultas",
  },
  "{count} cihazda geride kalıyorsunuz": {
    one: "Você fica para trás em {count} tipo de dispositivo",
    other: "Você fica para trás em {count} tipos de dispositivo",
  },
  "{count} ülkede geride kalıyorsunuz": {
    one: "Você fica para trás em {count} país",
    other: "Você fica para trás em {count} países",
  },
  "{count} günde olağan dışı düşüş": {
    one: "Queda incomum em {count} dia",
    other: "Quedas incomuns em {count} dias",
  },
  "{date}: tıklama": "{date}: cliques",
  "{date}: gösterim": "{date}: impressões",
  "Tıklama farkı": "Diferença de cliques",
  sürüyor: "em andamento",
  Oran: "CTR",
  // Search performance review fixes: brand confirmation, windows, archive lag
  "Marka adları: {terms} (önerilen, onaylanmadı).":
    "Nomes da marca: {terms} (sugeridos, não confirmados).",
  "Marka adını onayla": "Confirmar o nome da marca",
  "Marka aramaları şimdilik alan adından önerilen adlarla ayrılıyor: {terms}. Onaylanana kadar bu ayrım bir tahmin.":
    "Por enquanto, as pesquisas de marca são separadas com nomes sugeridos a partir do seu domínio: {terms}. Até que você os confirme, esta separação é uma estimativa.",
  "Önerilen adlar doğruysa onaylayın; değilse markanızın adını ve yazılışlarını girin.":
    "Se os nomes sugeridos estiverem certos, confirme-os; caso contrário, insira o nome da sua marca e as formas como ele é escrito.",
  "Dönem: {start} – {end}.": "Período: {start} – {end}.",
  "Ayın son günleri henüz gelmedi ({days} gün)":
    "Os últimos dias do mês ainda não chegaram ({days} dias)",
  "Son çubuk kesik çizgili: ayın son günleri Search Console'dan henüz gelmedi.":
    "A última barra está tracejada: os últimos dias do mês ainda não chegaram do Search Console.",
  "Haftalık dağılım yalnızca Web aramaları için.":
    "A distribuição semanal é apenas para pesquisas na Web.",
  "Marka aramaları dahil değildir.":
    "As pesquisas de marca não estão incluídas.",
  "Tam günler Google tarafından doğrulandı":
    "Dias completos confirmados pelo Google",
  "Tam gün sınırı veri gecikmesine göre varsayıldı":
    "Limite de dias completos estimado pelo atraso dos dados",
  "Önceki sonuç gösteriliyor; seçili dönem henüz yüklenmedi.":
    "O resultado anterior está sendo exibido; o período selecionado ainda não foi carregado.",
  "En fazla +{gain} tıklama / 30 gün (üst sınır)":
    "Até +{gain} cliques / 30 dias (limite máximo)",
  "{count} sayfada · bu sayfaların tüm tıklamaları 30 güne ölçekli: {clicks}; üst sınırın bu tabana oranı {share}":
    "Em {count} páginas · todos os cliques dessas páginas, ajustados para 30 dias: {clicks}; limite máximo em relação a essa base: {share}",
  "Eksik sorgu, yetersiz gösterim veya eksik hedef oranı; kazanç yok anlamına gelmez.":
    "Consultas ausentes, poucas impressões ou taxa-alvo desconhecida; isso não significa ausência de oportunidade.",
  "Analytics bu kez okunamadı; aşağıdaki kaynak notunu kontrol edin.":
    "Não foi possível ler o Analytics desta vez; confira a nota da fonte abaixo.",
  "Analytics verisi sınırlı; eksik ölçümler sıfır değildir ve dönüşüm yorumu yapılamayabilir.":
    "Os dados do Analytics são limitados; medições ausentes não são zero e podem impedir uma avaliação das conversões.",
  "Hesaplanabilen tüm sayfalardaki ölçülmüş dönüşüm sinyali · listele":
    "Sinal de conversão medido em todas as páginas calculáveis · listar",
  "İş listesi: {shown} / {total} eşleşen sayfa":
    "Lista de trabalho: {shown} / {total} páginas correspondentes",
  "Analytics değeri bilinmiyor; bağlantı, eşleşme ve kaynak kısıtlarını kontrol edin.":
    "Valor do Analytics desconhecido; confira a conexão, a correspondência de URL e as limitações da fonte.",
  "Ölçülen gösterim (30 güne ölçekli)":
    "Impressões medidas (ajustadas para 30 dias)",
  "Analytics bu adres grubunu birlikte ölçüyor; oturumları farklı URL satırları arasında toplamayın.":
    "O Analytics mede esse grupo de URLs em conjunto; não some suas sessões entre linhas de URLs diferentes.",
  "Karşılaştırılabilen marka dışı gösterim: {known}; oranı bilinmeyen: {unknown}.":
    "Impressões sem marca comparáveis: {known}; impressões sem taxa conhecida: {unknown}.",
  "Diğer aramalar (dağıtılmış kalan)":
    "Outras consultas (restante distribuído)",
  "Değişikliği not edin; aynı kapsamlı dönemlerde ölçülen tıklama, tıklama oranı ve sırayı Arama performansında karşılaştırın.":
    "Anote a mudança; compare cliques, CTR e posição medidos em períodos com o mesmo escopo em Desempenho da pesquisa.",
  "Arama niyetini ve sayfanın kapsamını inceleyin":
    "Analise a intenção de busca e a cobertura da página",
  "Gösterimler ölçüldü; düşük sıra tek başına sayfayı silmek veya birleştirmek için kanıt değildir.":
    "As impressões foram medidas; uma posição baixa, por si só, não justifica excluir ou unir uma página.",
  "Birleştirmeyi yalnızca sayfaların aynı ihtiyacı karşıladığını doğrularsanız değerlendirin.":
    "Considere unir páginas somente após confirmar que elas atendem à mesma necessidade.",
  "Önceliği ölçülen sorgulara göre belirleyin; düşük tahmin tek başına içerik kaldırma gerekçesi değildir.":
    "Priorize com base nas consultas medidas; uma estimativa baixa, por si só, não justifica remover conteúdo.",
  "Ortalama {position}. sıra; {impressions} gösterim, {clicks} tıklama ölçüldü. Hesaplanabilen aramalarda 30 güne ölçekli en fazla +{gain} tıklama (üst sınır); gerçekleşme sözü değildir.":
    "Posição média {position}; {impressions} impressões e {clicks} cliques medidos. Até +{gain} cliques ajustados para 30 dias nas consultas calculáveis (limite máximo), sem garantia de resultado.",
  "Hesaplanan kazanç yalnızca alınan ve tanımlanabilen aramaları kapsar; gizli sorguların payı bilinmiyor. Panelin sorgu tahminiyle toplanmaz.":
    "A estimativa cobre apenas consultas recebidas e identificáveis; a parcela de consultas ocultas é desconhecida. Não a some à estimativa por consulta do painel.",
  "Ölçülen sıfır: {zero}; yetersiz gösterim: {small}; eksik hedef oranı: {curve}; Google'ın aramalarını gizlediği sayfa: {pairs}.":
    "Zero medido: {zero}; poucas impressões: {small}; taxa-alvo em falta: {curve}; páginas cujas pesquisas o Google oculta: {pairs}.",
  "Search Console satır sınırına ulaşıldı; toplamlar tüm siteyi kapsamaz.":
    "O limite de linhas do Search Console foi atingido; os totais não cobrem todo o site.",
  "Aynı takvim günleri farklı saat dilimlerinde aynı an aralığı değildir. Analytics, tüm Organic Search kanalını kapsar.":
    "Os mesmos dias em fusos horários diferentes não cobrem o mesmo intervalo de tempo. O Analytics inclui todo o canal Organic Search.",
  "Analytics kotası doldu. Bir süre bekleyip Yenile’ye basın.":
    "A cota do Analytics se esgotou. Aguarde um pouco e selecione Atualizar.",
  "Analytics izni veya mülk erişimi yok. Bağlantıları ayarla ekranında erişimi doğrulayın.":
    "Falta permissão no Analytics ou acesso à propriedade. Verifique o acesso nas configurações de conexão.",
  "Analytics yanıtı okunamadı. İnternet bağlantısını kontrol edip Yenile’ye basın.":
    "Não foi possível ler a resposta do Analytics. Confira a conexão com a internet e selecione Atualizar.",
  "{start} – {end} aralığında bu mülk için sayfa satırı dönmedi. Bu, hiç gösterim olmadığı anlamına gelmez; Arama performansında mülkü kontrol edin veya dönemi genişletin.":
    "Nenhuma linha de página foi recebida para esta propriedade entre {start} e {end}. Isso não significa que não houve impressões; confira a propriedade em Desempenho da pesquisa ou amplie o período.",
  "{start} – {end} aralığında hesaplanabilen {count} sayfada ek kazanç hesaplanmadı. Bu, yapılacak iş olmadığı anlamına gelmez.":
    "Nenhum ganho adicional foi calculado para {count} páginas calculáveis entre {start} e {end}. Isso não significa que não haja trabalho a fazer.",
  "30 güne ölçekli üst sınır; çubuklar en büyük iş türüne göredir. Bir sayfa birden fazla işte sayılabilir. Seçim tüm hesaplanabilir sayfalara uygulanır.":
    "Limite máximo ajustado para 30 dias; as barras comparam com a maior categoria de trabalho. Uma página pode contar em várias categorias. A seleção abrange todas as páginas calculáveis.",
  "Hesaplanamayan kapsam": "Escopo não calculável",
  Sırala: "Ordenar",
  "Daha uzun bir dönem seçmek daha çok arama gösterebilir.":
    "Um período mais longo pode mostrar mais pesquisas.",
  "Google bu sayfaların aramalarını göstermiyor":
    "O Google não mostra as pesquisas destas páginas",
  "{hidden} sayfa gösterim aldı ama Search Console hangi aramalardan geldiğini vermedi: Google az aranan sorguları gizlilik için gizler. Arama bilinmeden kazanç hesaplanmaz. Bu bir hata değildir; site daha çok gösterim aldıkça tahminler kendiliğinden çıkar.":
    "{hidden} páginas receberam impressões, mas o Search Console não indicou de que pesquisas vieram: o Google oculta consultas pouco pesquisadas por privacidade. Sem as pesquisas, não é possível estimar ganho. Isto não é um erro; as estimativas surgem sozinhas à medida que o site recebe mais impressões.",
  "{count} sayfanın aramaları tahmin için yeterli gösterim almadı ya da sitenizde karşılaştırılacak sıra verisi yok.":
    "As pesquisas de {count} páginas receberam poucas impressões para uma estimativa, ou o seu site não tem dados de posição para comparar.",
  "Tahmini değiştirmez; yanında bir etiket olarak durur. Bu dönemde tahmin edilebilen sayfa olmadığı için eşleştirilecek bir şey yok.":
    "Não altera a estimativa; fica ao lado como etiqueta. Nenhuma página pôde ser estimada neste período, por isso não há nada a corresponder.",

  // Rankings archive scope and comparison evidence.
  "Son 5 yıllık arşiv": "Últimos 5 anos do arquivo",
  "Daha fazla hareket göster": "Mostrar mais variações",
  "Kayıtlı geçmiş korunur. Bağlantıyı ve kotayı kontrol edin, sonra yeniden deneyin.":
    "O histórico guardado é preservado. Verifique a ligação e a quota e tente novamente.",
  "Kalan günler için devam edin; birden fazla çalıştırma gerekebilir.":
    "Continue para obter os dias restantes; podem ser necessárias várias execuções.",
  "Google taranan tarihler için sorgu satırı döndürmedi. Bu, arama yapılmadığını kanıtlamaz. Kalan tarihler varsa arşivi doldurmaya devam edin; toplam trafik için Arama performansını açın.":
    "O Google não devolveu linhas de consultas para as datas analisadas. Isto não prova que não houve pesquisas. Continue com as datas restantes; abra Desempenho de pesquisa para o tráfego total.",
  "Öncelik: mutlak sıra değişimi × kayıtlı gösterim. Bu bir inceleme sırasıdır, kayıp tıklama tahmini değildir.":
    "Prioridade: variação absoluta da posição × impressões registadas. Define a ordem de análise, sem estimar cliques perdidos.",
  "{count} sorgu; aynı {paired} sorguda net değişim. Çubuklar en büyük gruba görelidir.":
    "{count} consultas; variação líquida nas mesmas {paired} consultas. Barras relativas ao maior grupo.",
  "Aynı sorgu kümesinde net değişim; giriş veya çıkış sayısı değildir.":
    "Variação líquida no mesmo conjunto de consultas, não o número de entradas ou saídas.",
  "Bu gün sorgu gözlenmedi; API yanıtı tamamlandı.":
    "Sem observação da consulta neste dia; resposta da API concluída.",
  "Bu gün arşiv kapsamı eksik veya bilinmiyor.":
    "A cobertura do arquivo neste dia está incompleta ou é desconhecida.",
  "Boşluklar doldurulmaz; sıra sıfır kabul edilmez. Ok tuşlarıyla günleri inceleyin.":
    "As lacunas ficam vazias; nunca se assume posição zero. Use as setas para consultar os dias.",
  "Gözlenen gün": "Dias observados",
  "Dönem ortalaması": "Média do período",
  "İlk/son kayıtlı gün": "Primeiro/último dia registado",
  "Günlük değerler": "Valores diários",
  "Arama performansında metin ara (tarih ve birebir sorgu korunmaz)":
    "Pesquisar texto em Desempenho de pesquisa (datas e consulta exata não são mantidas)",
  "GSC Web · Ortalama sıra, sabit bir Google sırası değildir. Konum ve cihazla değişebilir.":
    "GSC Web · A posição média não é uma classificação fixa no Google. Pode variar por localização e dispositivo.",
  "Karşılaştırılabilen {count} sorguda {up} yükseldi, {down} geriledi.":
    "Das {count} consultas comparáveis, {up} subiram e {down} desceram.",
  "Önce {query} sorgusunu inceleyin.": "Analise primeiro {query}.",
  "Karşılaştırılabilen sorgularda belirgin düşüş yok.":
    "Sem descida significativa nas consultas comparáveis.",
  "Karşılaştırması bilinmeyen: {count}. Belirgin hareket eşiği: 0,5 sıra.":
    "Comparações desconhecidas: {count}. Limiar de variação significativa: 0,5 posições.",
  "Arşiv kapsamı kısmi veya bilinmiyor. Hareketler yalnızca kayıtlı gözlemleri karşılaştırır; sitenin tamamını temsil etmez.":
    "A cobertura do arquivo é parcial ou desconhecida. As variações comparam apenas observações registadas e não representam todo o site.",
  "Tarih sonu üç günlük gecikme varsayımıdır; canlı tamlık doğrulaması değildir. Google gizli sorguları ve bazı üst sınır dışı satırları döndürmez.":
    "A data final pressupõe três dias de atraso; não verifica a completude em tempo real. O Google omite consultas ocultas e algumas linhas além dos seus limites.",
  "API yanıtı tamamlanan / sınırlı / başarısız / bilinmeyen gün: {complete} / {limited} / {failed} / {unknown}":
    "Dias com resposta da API completa / limitada / falhada / desconhecida: {complete} / {limited} / {failed} / {unknown}",
  "Önceki dönem API yanıtı tamamlanan gün: {complete} / {days}":
    "Dias com resposta da API completa no período anterior: {complete} / {days}",
  "Haftalık çizgilerde uç haftalar kısmi olabilir. Gün sayısı yalnızca sorgunun gözlendiği günleri sayar.":
    "As semanas nas extremidades podem ser parciais. Só se contam os dias em que a consulta foi observada.",
  "Arşivi doldurmaya devam et": "Continuar a preencher o arquivo",
  "Arşivde sorgu ara": "Pesquisar consultas arquivadas",
  "Tüm filtreleri kaldır": "Limpar todos os filtros",
  "Dönem ortalaması ilk 10": "Média do período nas primeiras 10",
  "Yalnızca iki dönemde de gözlenen sorgular.":
    "Apenas consultas observadas em ambos os períodos.",
  "Gösterime göre üst çeyrek eşiği; eşitlikler dahil: {count}":
    "Limiar do quartil superior por impressões, incluindo empates: {count}",
  "{matching} / {total} sorgu filtreyle eşleşiyor.":
    "{matching} / {total} consultas correspondem aos filtros.",
  "Filtreleri kaldırın, dönemi genişletin veya arşivi doldurmaya devam edin.":
    "Limpe os filtros, alargue o período ou continue a preencher o arquivo.",
  "Bu dönemde gözlenmeyen: {count}. Bu, sıra kaybı anlamına gelmez.":
    "Não observadas neste período: {count}. Isto não significa perda de posição.",
  "En çok gösterim alan ilk 25 kayıt; arama kutusu bu listede de geçerlidir.":
    "Primeiros 25 registos por impressões; a pesquisa também filtra esta lista.",
  "Google kotası doldu. Kota yenilendiğinde yeniden deneyin.":
    "A quota do Google esgotou-se. Tente novamente após a reposição.",
  "Ağ bağlantısı kurulamadı. İnternet bağlantınızı kontrol edip yeniden deneyin.":
    "A ligação à rede falhou. Verifique a ligação à Internet e tente novamente.",
  "Taranan son gün: {date}": "Analisado até: {date}",
  "Karşılaştırması bilinmeyen: {count}. Belirgin hareket eşiği: {threshold} sıra.":
    "Comparações desconhecidas: {count}. Limiar de variação significativa: {threshold} posições.",
  "En çok gösterim alan ilk {count} kayıt; arama kutusu bu listede de geçerlidir.":
    "Primeiros {count} registos por impressões; a pesquisa também filtra esta lista.",
  "Bağlantı yok; gösterilen özet kayıtlı tarihsel gözlemlerdir.":
    "Sem ligação; o resumo mostra observações históricas guardadas.",
  "Seçilen dönem Search Console'un okunabilir kesin günleri dışında. Kullanılabilir dönem: {start} – {end}.":
    "O período selecionado está fora dos dias completos disponíveis no Search Console. Período disponível: {start} – {end}.",
  "Search Console yalnızca {start} ve sonrasını okuyabilir. Bu arşiv dönemi bütünüyle açılamaz.":
    "O Search Console só pode ler dados a partir de {start}. Este período do arquivo não pode ser aberto por completo.",
  // Real-data dashboard and search explanations.
  "Önceki dönemde {clicks} tıklama, {impressions} gösterim vardı.":
    "O período anterior teve {clicks} cliques e {impressions} impressões.",
  "Geçen yıl aynı dönemde {clicks} tıklama, {impressions} gösterim vardı.":
    "O mesmo período do ano passado teve {clicks} cliques e {impressions} impressões.",
  "Az veride yüzdeler ve ortalamalar hızla değişir; tek başına büyüme veya kayıp kanıtı değildir.":
    "Com poucos dados, percentuais e médias mudam rapidamente; sozinhos, não comprovam crescimento ou perda.",
  "Bu liste, ortalama sırası yuvarlanarak 4–20 aralığında olan ve bu dönemde en az {count} gösterim alan sorguları kapsar. Eşiğin altındaki sorgular Sorgular sekmesinde incelenebilir.":
    "Esta lista inclui consultas com posição média arredondada entre 4 e 20 e pelo menos {count} impressões no período. Consulte as demais na aba Consultas.",
  "Marka sorguları bu listeden çıkarılır.":
    "Consultas de marca são excluídas desta lista.",
  "Google az aranan sorguları gizlilik için gizleyebilir. Sorgu listesi boşken de site toplamında gösterim olabilir. Toplamları ve Sayfalar sekmesini inceleyin.":
    "O Google pode ocultar consultas raras por privacidade. Os totais do site podem incluir impressões mesmo com a lista de consultas vazia. Confira os totais e a aba Páginas.",
  "Alınan veride öneri eşiklerini geçen bir fırsat ya da düşüş bulunmadı. Bu, sitenizde yapılacak iş olmadığı anlamına gelmez. Google bazı sorguları gizlilik için gizler; görünen sorguları ve sayfaları inceleyin.":
    "Nenhuma oportunidade ou queda atingiu os limites de recomendação nos dados recebidos. Isso não significa que não há trabalho a fazer. O Google oculta algumas consultas por privacidade; examine as consultas e páginas visíveis.",
  "Bu bulgular hız, kullanılabilirlik veya arama görünürlüğü ile ilgili olabilir. Ayrıntılarda etkilenen sayfaları inceleyin.":
    "Estes resultados podem envolver velocidade, usabilidade ou visibilidade na busca. Confira as páginas afetadas nos detalhes.",
  "Oturum sayısı bilinmiyor. Analytics raporunu açarak kaynak uyarılarını inceleyin; bağlantı erişimini ve sitedeki Analytics etiketini kontrol edin.":
    "O número de sessões é desconhecido. Abra o relatório do Analytics para conferir os avisos da fonte; verifique as permissões da conexão e a tag do Analytics no site.",
  "İki dönemde de gözlenen sorgu yok. Yükseliş veya düşüş henüz hesaplanamaz; mevcut sıraları aşağıdaki listeden inceleyin.":
    "Nenhuma consulta foi observada nos dois períodos. Ainda não é possível calcular subidas e descidas; consulte as posições atuais na lista abaixo.",
  "{count} sorgunun mevcut sırası gösteriliyor. Önceki dönemle karşılaştırılabilecek sorgu yok.":
    "Posições atuais de {count} consultas. Nenhuma pode ser comparada com o período anterior.",
  "Tüm kayıtlı kelimeler bu dönemde gözlendi.":
    "Todas as palavras-chave guardadas foram observadas neste período.",
  "Ek kazanç hesaplanmayan: {zero}; gösterimi yetersiz: {small}; karşılaştırılacak tıklama oranı olmayan: {curve}; tahmine uygun araması olmayan sayfa: {pairs}.":
    "Páginas sem ganho calculado: {zero}; impressões insuficientes: {small}; sem taxa de cliques comparável: {curve}; sem consultas utilizáveis: {pairs}.",
  "{start} – {end} aralığında sayfa verisi alınamadı. Bu, hiç gösterim olmadığı anlamına gelmez; Arama performansında bağlı mülkü ve tarihleri kontrol edin.":
    "Não foram recebidos dados de páginas para {start} – {end}. Isto não significa ausência de impressões; verifique a propriedade e as datas no Desempenho de pesquisa.",
  "Bu sayfalar için tahmin edilebilir arama yok":
    "Sem consultas utilizáveis para estimar estas páginas",
  "{hidden} sayfa gösterim aldı; alınan veride tahmine uygun marka dışı arama bulunamadı. Google'ın gizlediği sorgular, marka ayrımı veya veri sınırları buna yol açabilir. Bu sayfalarda kazanç sıfır değil, bilinmiyor.":
    "{hidden} páginas receberam impressões, mas os dados não contêm consultas sem marca utilizáveis. Consultas ocultas, exclusões da marca ou limites de dados podem explicar isto. O ganho potencial é desconhecido, não zero.",
  "{start} – {end} aralığında sitenizin tıklama oranını sıraya göre ölçecek kadar arama yok. Arama performansında gösterim alan sorguları inceleyin; daha fazla veri birikince tahmin yeniden hesaplanabilir.":
    "Há poucas consultas em {start} – {end} para medir a taxa de cliques por posição. Consulte as consultas com impressões no Desempenho de pesquisa; a estimativa poderá ser recalculada com mais dados.",
  "Kaydettiğiniz aramaların ortalama sırasını ve dönemler arasındaki değişimini inceleyin.":
    "Consulte as posições médias das consultas guardadas e a sua evolução entre períodos.",
  "Liste güncellendi: {date}": "Lista atualizada: {date}",
  "{count} kontrolde kritik sorun":
    "Problemas críticos em {count} verificações",
  "{count} kontrolde uyarı": "Avisos em {count} verificações",
  "Google anonim sorguları gizler ve günlük satırları sınırlar; bu arşiv tüm aramaları içermez.":
    "O Google oculta consultas anonimizadas e limita as linhas diárias; este arquivo não contém todas as pesquisas.",
  "Bu sayfa açıkken kalan günler otomatik yüklenir; bağlantı veya kota hatasında beklenir.":
    "Os dias restantes são carregados automaticamente enquanto esta página estiver aberta; erros de ligação ou quota suspendem a sincronização.",
  "Google verisi alındı: {date}": "Dados Google obtidos: {date}",
  "Google anonim sorguları gizler. API, arama türü başına günde en fazla {limit} satır sunar; sorgu ve sayfa ayrıntılarında başka satırları da atlayabilir. Tam sayfalama, tüm aramaların listelendiği anlamına gelmez.":
    "O Google oculta consultas anonimizadas. A API disponibiliza no máximo {limit} linhas por dia e tipo de pesquisa e pode omitir outros detalhes de consultas e páginas. A paginação completa não significa que todas as pesquisas estejam listadas.",
  // Dashboard source scope and measured next steps.
  "Toplamların son günü: {date}.": "Totais até: {date}.",
  "Geçici verinin son günü: {date}.": "Dados provisórios até: {date}.",
  "Bu dönemden sonra geçici veri alınmadı.":
    "Não foram recebidos dados provisórios após este período.",
  "{start} – {end} toplamlara dahil değil.":
    "O período de {start} a {end} está excluído dos totais.",
  "Search Console veri kapsamı": "Âmbito dos dados do Search Console",
  "{issue} — {scope}": "{issue} — {scope}",
  "{count} uyarı türünü inceleyin": "Rever {count} tipos de avisos",
  "Uyarı bulgularını inceleyin": "Rever os avisos encontrados",
  "{types} uyarı türü / {findings} sayfa bulgusu. Etkilenen sayfaları inceleyin.":
    "{types} tipos de avisos / {findings} ocorrências em páginas. Reveja as páginas afetadas.",
  "{findings} sayfa bulgusu. Etkilenen sayfaları inceleyin.":
    "{findings} ocorrências em páginas. Reveja as páginas afetadas.",
  "{value} yüzde puan": "{value} pontos percentuais",
  "Oran değişimi yüzde puanla gösterilir: iki dönemin yüzdeleri arasındaki farktır.":
    "A variação da taxa é apresentada em pontos percentuais: a diferença entre as percentagens dos dois períodos.",
};
