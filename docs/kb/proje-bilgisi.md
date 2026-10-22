---
title: Proje bilgisi
description: Projenin ortak hafızası. İşin özeti, hedef, konumlandırma, yazım tercihleri, rakipler, önemli sayfalar ve ajanın araştırma günlüğü. Ajanlar işe başlamadan burayı okur.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-22
---

Proje bilgisi, sitenizle ilgili "yazılı olmayan" bilgilerin yazıldığı yerdir: ne satıyorsunuz, şu an neyi hedefliyorsunuz, rakibiniz kim, hangi sayfalar para kazandırıyor, nasıl bir dille yazılmasını istersiniz. Sayılar Google'dan gelir ama bunlar gelmez; bu ekranı siz ya da ajanınız doldurur. Ekranın girişi amacı söyler: "Claude Code ve bağladığınız diğer MCP istemcilerinin bu proje hakkında bildikleri. Ajanlar işe başlamadan önce burayı okur, öğrendiklerini buraya yazar. Yanlış bir şey görürseniz kendiniz düzeltin." Ajan kullanmıyorsanız da işe yarar: altı ay sonra "neden bu sayfaya odaklanmıştık" sorusunun cevabı buradadır.

## Ekranda neler var

**Dört ana bölüm.** **İşin özeti**, **Şu anki hedef**, **Konumlandırma**, **Yazım tercihleri**. Her biri serbest metindir, en fazla 4.000 karakter. Bölümün altında kimin ne zaman güncellediği yazar: "siz", "yapay zeka istemciniz" ya da eski kayıtlarda "ajan", yanında zaman.

**Özel bölümler.** Dört bölüme sığmayan konular için kendi başlıklarınızı açarsınız; en fazla 20 özel bölüm, başlık en fazla 120 karakter.

**Rakipler.** Alan adı (zorunlu), ad ve not alanları; en fazla 100 rakip, not en fazla 500 karakter. Uygulama rakibin verisini çekmez; bu liste ajanın ve sizin aklınızda tutmanız için var.

**Önemli sayfalar.** Adres, rol, konu ve not. Roller: **Merkez sayfa** (bir bölümün giriş sayfası), **Destek sayfası** (merkezi besleyen alt sayfa), **Dönüşüm sayfası** (para kazandıran, form olan sayfa), **Diğer**. En fazla 100 sayfa; adresler https'e normalize edilir.

**Araştırma günlüğü.** Ajanın "şunu araştırdım, şu çıktı" diye bıraktığı tarihli notlar. Yalnızca ajan yazar (her not en fazla 1.000 karakter), siz silebilirsiniz. Notlar 90 gün sonra kendiliğinden temizlenir ve ekranda en yeni 20 tanesi görünür. Amacı, ajanın aynı şeyi ikinci kez araştırmaması.

**Ajan kartı.** "Ajanınıza doldurtun" ve "Ajanınıza gözden geçirtin" istemleri, **İstemi kopyala** düğmesiyle. Boş bir projede ilk istem ajanın size birkaç soru sorup bölümleri doldurmasını sağlar.

## Nasıl kullanılır

1. Projeyi açar açmaz **İşin özeti** bölümüne üç beş cümle yazın: ne satıyorsunuz, kime, siteniz hangi dillerde, dönüşüm noktası hangi sayfa. Bu paragraf ajanın her raporunun temelidir.
2. **Şu anki hedef** bölümünü somut tutun: "trafik" değil, "ürün sayfalarının dizine girmesi" ya da "demo formundan ayda beş talep". Ajan önerilerini buna göre sıralar.
3. **Önemli sayfalar** listesine önce dönüşüm sayfalarını, sonra merkez sayfaları ekleyin. Fırsatlar ve denetim bulguları arasında hangisine öncelik verileceğini ajan buradan anlar.
4. **Yazım tercihleri** bölümüne kullanılmayacak kelimeleri ve tonu yazın ("sektör lideri deme", "siz dili", "sürüm numarası ver"). Ajanın yazdığı raporlar bu kurallara uyar.
5. Ajanla çalışıyorsanız ilk gün **Ajanınıza doldurtun** istemini kopyalayıp yapıştırın; ajan bölümleri sizinle konuşarak doldurur. Sonra ayda bir araştırma günlüğünü okuyup yanlış gördüğünüzü düzeltin.

## Sayılar nasıl hesaplanır

Bu ekranda hesaplanan bir sayı yoktur; sınırlar vardır. Bölüm başına 4.000 karakter, 20 özel bölüm, 100 rakip, 100 önemli sayfa, günlük notu 1.000 karakter. Ajan, MCP'deki "update_project_context" aracıyla tek çağrıda en fazla 50 değişiklik yapabilir; her değişiklik hemen yazılır, onay adımı yoktur. Bu yüzden ajanınıza "yazmadan önce bana sor" demeyi alışkanlık edinin; iyi kurulmuş ajan becerileri zaten sorar.

Önemli sayfa adresleri kaydedilirken https'e çevrilir ve 2.048 karakterle sınırlıdır. Rakip alan adı 255, ad 120, not 500 karakterdir. Araştırma günlüğü girdilerine tarihi sunucu basar; ajan tarih uyduramaz.

## Sık sorulanlar

**Ajan yanlış bir şey yazmış, ne yapayım?** Bölümü açıp düzeltin. Son güncelleyen "siz" olur ve ajan bir sonraki okumada sizin halinizi görür.

**Rakip ekledim, verisi gelmedi.** Gelmez. Uygulama rakip verisi çekmez; liste ajanın web araması yaparken neye bakacağını bilmesi içindir.

**Günlükteki not kayboldu.** 90 günden eski notlar silinir. Kalıcı bilgiyi bölümlere taşıyın; günlük geçici bir defterdir.

**Özel bölümü ne için kullanayım?** Dört bölüme sığmayan, ama ajanın bilmesi gereken şeyler: "İndeksleme durumu", "Ölçüm kurulumu", "Site yapısı" gibi. Bir konu üç cümleyi geçiyorsa özel bölüm olmalı.

**Bu bilgiler Google'a gider mi?** Hayır. Bu ekran bu bilgisayardaki veritabanındadır ve yalnızca bağladığınız ajan okur.

## Sınırlar

Ekran serbest metindir; yapısal doğrulama yoktur, çelişkili yazarsanız ajan çelişkiyi fark etmeyebilir. Rakipler ve önemli sayfalar bir hatırlatma listesidir, izleme aracı değildir. Araştırma günlüğünü yalnızca ajan yazar; kendi notunuzu bölümlere yazın.

<!-- Kaynaklar: src/routes/_project/p/$projectId/context.tsx; src/routes/_project/p/$projectId/settings/context.tsx; src/client/features/projects/context/sectionCopy.ts; src/server/features/project-context/*; src/types/schemas/projectContext.ts; src/server/mcp/server.ts (update_project_context) -->
