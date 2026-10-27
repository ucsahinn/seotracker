import type { Catalog } from "@/shared/i18n";

/** Portuguese for shared labels, Google states, and GA4 report names. */
export const ptShared: Catalog = {
  "{start} – {end}. Search Console verisi {count} gün geriden gelir, bu yüzden son gün bugün olmaz.":
    {
      one: "{start} – {end}. Os dados do Search Console têm um atraso de {count} dia, por isso o último dia nunca é hoje.",
      other:
        "{start} – {end}. Os dados do Search Console têm um atraso de {count} dias, por isso o último dia nunca é hoje.",
    },
  "TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı":
    "TEAM_DOMAIN precisa ser um endereço https completo, como https://your-team.cloudflareaccess.com",
  'TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı — "{value}" değerinin başına https:// ekleyin':
    'TEAM_DOMAIN precisa ser um endereço https completo, como https://your-team.cloudflareaccess.com — adicione https:// no início de "{value}"',
  "Site haritasında var, dizine alındı": "Enviado e indexado",
  "Dizine alındı, site haritasında yok": "Indexado, não enviado no sitemap",
  "Dizine alındı, site haritasına eklemeyi düşünün":
    "Indexado; considere adicioná-lo a um sitemap",
  "Tarandı, şu an dizine alınmadı": "Rastreado, atualmente não indexado",
  "Keşfedildi, henüz taranmadı": "Descoberto, atualmente não indexado",
  "Yinelenen içerik, canonical belirtilmemiş":
    "Duplicado sem canonical selecionado pelo usuário",
  "Yinelenen içerik, Google başka bir canonical seçti":
    "Duplicado: o Google escolheu outro canonical",
  "Yinelenen içerik, gönderilen adres canonical seçilmedi":
    "Duplicado: o URL enviado não foi selecionado como canonical",
  "Alternatif sayfa, canonical doğru":
    "Página alternativa com a tag canonical correta",
  "'noindex' etiketiyle dışlandı": "Excluído pela tag 'noindex'",
  "robots.txt engelliyor": "Bloqueado por robots.txt",
  "401 nedeniyle engellendi":
    "Bloqueado devido a uma solicitação não autorizada (401)",
  "403 nedeniyle engellendi": "Bloqueado devido a acesso proibido (403)",
  "Bulunamadı (404)": "Não encontrado (404)",
  "Yumuşak 404": "Soft 404",
  "Yönlendirme yapan sayfa": "Página com redirecionamento",
  "Sunucu hatası (5xx)": "Erro do servidor (5xx)",
  "Google bu adresi bilmiyor": "URL desconhecido para o Google",
  "Giriş sayfaları": "Páginas de destino",
  "Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm.":
    "Páginas onde as visitas começam: sessões, engajamento e conversões.",
  "Sayfa performansı": "Páginas e telas",
  "Görüntülenme ve sayfada geçirilen süre.":
    "Visualizações e tempo passado na página.",
  "Trafik kaynakları": "Aquisição de tráfego",
  "Ziyaretçiler nereden geliyor.": "De onde vêm os visitantes.",
  "Anahtar olaylar": "Eventos principais",
  "Dönüşüm saydığınız olaylar ve kaç kişi tetikledi.":
    "Os eventos que você conta como conversões e quantas pessoas os acionaram.",
  "E-ticaret": "E-commerce",
  "Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.":
    "Itens e receita; os dados aparecem quando a propriedade mede e-commerce.",
  "Site içi arama": "Pesquisa no site",
  "Ziyaretçilerin sitenizde ne aradığı.":
    "O que os visitantes procuram no seu site.",
  "Kitle dağılımı": "Público",
  "Cihaz, ülke, yeni ve geri dönen ziyaretçi.":
    "Dispositivo, país, visitantes novos e recorrentes.",
  "Ana makine adı": "Nome do host",
  "Giriş sayfası": "Página de destino",
  Sayfa: "Página",
  Olay: "Nome do evento",
  Kanal: "Canal",
  Kaynak: "Origem",
  Ortam: "Meio",
  "Kaynak / ortam": "Origem / meio",
  Kampanya: "Campanha",
  Cihaz: "Dispositivo",
  Ülke: "País",
  "Yeni / geri dönen": "Novos / recorrentes",
  Ürün: "Item",
  "Ürün kodu": "ID do item",
  "Arama terimi": "Termo de pesquisa",
  Tarih: "Data",
  Oturum: "Sessões",
  "Aktif kullanıcı": "Usuários ativos",
  Kullanıcı: "Usuários",
  "Etkileşimli oturum": "Sessões engajadas",
  "Etkileşim oranı": "Taxa de engajamento",
  "Anahtar olay": "Eventos principais",
  "Olay oranı": "Taxa de eventos principais",
  "Satın alma işlemleri": "Transações",
  Gelir: "Receita",
  Görüntülenme: "Visualizações",
  "Etkileşim süresi": "Tempo de engajamento",
  "Ürün görüntüleme": "Itens visualizados",
  "Sepete eklenen ürün": "Itens adicionados ao carrinho",
  "Arama sayısı": "Pesquisas",
  "Satılan ürün": "Itens comprados",
  "Ürün geliri": "Receita de itens",
  "Okunan kaynakta bu dönem için kayıt bulunmadı.":
    "A fonte consultada não retornou registros para este período.",
  "Kaynak satır sınırına ulaştı; sonuçlar yalnızca okunan kayıtları kapsar.":
    "O limite de linhas da fonte foi atingido; os resultados abrangem apenas os registros lidos.",
  "Kaynak isteği başarısız; bu bölümün verisi alınamadı.":
    "A solicitação à fonte falhou; não foi possível obter os dados desta seção.",
  "Kaynak saklama süresi bu karşılaştırmanın tamamını kapsamıyor.":
    "O período de retenção da fonte não abrange toda esta comparação.",
  "Kaynak durumu kaydedilmemiş.": "O estado da fonte não foi registrado.",
  "Bu rapor GA4 oturum veya gelir raporu değildir.":
    "Este documento não é um relatório de sessões ou receita do GA4.",
  "Search Console sayfa trafiği": "Tráfego por página do Search Console",
  "Dönem: {start} – {end} (Pasifik). Okunan sayfa satırı: {rows}.":
    "Período: {start} – {end} (horário do Pacífico). Linhas de páginas lidas: {rows}.",
  "Mülk: {property}. Alınma zamanı: {time}. Satır sınırı: {limit}.":
    "Propriedade: {property}. Obtido em: {time}. Limite de linhas: {limit}.",
  "Kaynak ayrıntıları bu kayıtta mevcut değil.":
    "Os detalhes da fonte não estão disponíveis neste registro.",
  "Search Console sayfa trafiği alınamadı; trafik yokluğu sonucu çıkarılamaz.":
    "Não foi possível obter o tráfego por página do Search Console; isso não comprova ausência de tráfego.",
  "Gerçek kullanıcı hızı": "Velocidade de usuários reais",
  "Mobil CrUX: {url}. Kaydedilen PageSpeed ölçümü: {time}. Sayfa ve origin kapsamları ayrı gösterilir; kayan 28 günlük veri denetim süresi değildir.":
    "CrUX móvel: {url}. Medição PageSpeed salva: {time}. Os escopos de página e origem são separados; os dados móveis de 28 dias não correspondem à duração da auditoria.",
  "Bu kayıtta kullanılabilir CrUX verisi yok; laboratuvar ölçümü gerçek kullanıcı ölçümü değildir.":
    "Este registro não contém dados CrUX utilizáveis; uma medição de laboratório não é uma medição de usuários reais.",
  "Harita keşif toplamları Anlık veri bölümündedir. Harita kapsamı oranı yalnızca taranan sayfaları kullanır; tüm harita adreslerinin tarandığını göstermez.":
    "Os totais descobertos do sitemap aparecem nos dados instantâneos. A cobertura usa apenas páginas rastreadas; não indica que todos os URLs do sitemap foram rastreados.",
  "Taranan {count} sayfanın {inMap} tanesi ({percent}) site haritasında. Bu oran taranan sayfalara aittir; keşfedilen harita adreslerinin toplamı mevcutsa Anlık veri bölümünde ayrıca gösterilir.":
    "Das {count} páginas rastreadas, {inMap} ({percent}) estão no sitemap. A taxa refere-se às páginas rastreadas; o total de URLs descobertos, quando disponível, aparece separadamente nos dados instantâneos.",
  "Kaydedilen mobil PageSpeed ölçümü: {time}.":
    "Medição PageSpeed móvel salva: {time}.",
  "Rapor hazırlanırken veriler sunucudan yeniden okundu; Google geçmiş değerleri düzeltebilir. Aynı dönem etiketi önceki ekran görüntüsüyle birebir ölçüm eşitliğini garanti etmez. Aynı kaynak yeniden hazırlanırsa kayıt güncellenir; rapor dili değişebilir.":
    "Os dados foram relidos do servidor; o Google pode revisar valores históricos. O mesmo rótulo de período não garante medições idênticas a uma captura anterior. Gerar novamente a mesma fonte atualiza o registro; o idioma do relatório pode mudar.",
  "Okunan sayfalarda güç kaybı koşulunu sağlayan kayıt bulunmadı.":
    "Nenhuma das páginas lidas atende à condição de queda.",
  "Kaydedilmiş harita keşif toplamı mevcut değil; kapsam oranı yalnızca taranan sayfaları kullanır.":
    "Não foi salvo um total de URLs descobertos no sitemap; a taxa de cobertura usa apenas as páginas rastreadas.",
};
