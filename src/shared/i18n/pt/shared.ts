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
};
