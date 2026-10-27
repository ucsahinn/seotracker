---
title: Proje bilgisi
description: Proje bilgisi, sizin ve bağladığınız ajanın kullanabileceği yerel notlardır. Her ajanın bunları okuduğu veya metnin doğrulandığı varsayılmaz.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-27
---

Proje bilgisi, sizin ve bağladığınız ajanın kullanabileceği yerel notlardır. Her ajanın bunları okuduğu veya metnin doğrulandığı varsayılmaz.

## Önce hedefinizi yazın

Üstte dolu ana bölüm sayısı ve kayıtlı hedef görünür. İlk boş bölüme bağlantı veya **Bölüme git** seçimiyle ilerleyin. İşin özeti, şu anki hedef, konumlandırma ve yazım tercihleri en fazla 4.000 karakterdir. Son yazan ve mutlak güncelleme zamanı her bölümde görünür. **Değişiklikleri kaydet** yalnızca değişen ana bölümleri kaydeder.

Rakipler ve önemli sayfalar isteğe bağlı kısa listelerdir; sıralama veya dönüşüm ölçümü değildir. Her listede en fazla 100 kayıt olabilir. Rakip alan adı 255, ad 120, not 500 karakterdir. Sayfa adresi 2.048, hedef konu 200, not 500 karakterdir. Roller sizin verdiğiniz etiketlerdir. Özel bölümleri ajan ekler; siz düzenleyip kaldırabilirsiniz. En fazla 20 özel bölüm, 120 karakter başlık ve 4.000 karakter içerik saklanır.

## Kaydetme ve yenileme

Yenileme notları ve kurulum durumunu yeniden okur. Yenileme hatasında kayıtlı bilgi ve taslaklar korunur, uyarı görünür. Kaydedilmemiş ana veya satır içi değişiklik varken sayfadan ayrılma uyarısı çıkar. Aynı bölümü eşzamanlı düzenleyen bir ajanla kayıt çakışmasını sunucu henüz engellemez; birlikte düzenliyorsanız kaydetmeden önce son metni karşılaştırın.

**Ajanla taslak hazırla** altındaki istem, ajandan kaydetmeden önce onay istemesini ister. Uygulama araçları ayrıca onay beklemeden hemen yazabilir. Proje kimliği okunamazsa istem hazırlanmaz.

**Araştırma günlüğü** son 90 gündeki en yeni 20 kaydı gösterir. Not tarihi sunucunun UTC günüdür; not en fazla 1.000 karakterdir. Eski kayıtlar yeni not eklenmese de listeden süzülür. Aynı aralıkta daha fazla kayıt varsa belirtilir. Görünen liste tüm geçmiş değildir.

Bir bölümü düzenlerken başka bir istemci aynı metni değiştirirse bütün kaydetme işlemi reddedilir ve taslağınız korunur. Düzenleme başındaki metni, son kaydı ve taslağınızı karşılaştırıp birleştirdikten sonra yeniden kaydedebilirsiniz. Ajanlar da `expectedContent` göndererek aynı korumayı kullanabilir; bunu göndermeyen eski istemciler uyumlu kalır.

**Kaynak ve kurulum** altı ortak yapılandırma sinyalini sayar. Eksik ve okunamayan ayrı gösterilir; rakipler ve önemli sayfalar sayılmaz. Bağlantı kaydı canlı veri testi, PageSpeed anahtarı kota garantisi, ajan araç çağrısı bu projeyi okuduğunun kanıtı değildir. Bu bir SEO başarı puanı değildir.

<!-- Sources: src/routes/_app/projects.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/project-context/; src/server/features/projects/services/ProjectOverviewService.ts; src/server/features/project-context/ -->
