---
title: Proje bilgisi
description: Sitenizle ilgili yazılı olmayan bilgileri yazdığınız yer: işin özeti, hedef, rakipler, önemli sayfalar. Asistanınız işe başlamadan burayı okur.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-22
---

Bu sayfada sitenizi asistanınıza bir kez anlatmayı, sonra tekrar anlatmamayı öğrenirsiniz.

**Proje bilgisi** ekranı, Google'ın bilmediği şeyleri yazdığınız yerdir. Ne sattığınızı, şimdi neyi hedeflediğinizi, rakibinizin kim olduğunu, hangi sayfaların para kazandırdığını ve nasıl yazılmasını istediğinizi buraya yazarsınız. Ekranı siz ya da yapay zekâ asistanınız (ekranda "ajan" yazar) doldurur. Asistan işe başlamadan önce burayı okur, öğrendiklerini buraya yazar. Yanlış bir şey görürseniz kendiniz düzeltin. Asistan kullanmasanız da işe yarar. Altı ay sonra "neden bu sayfaya odaklanmıştık" sorusunun cevabı buradadır.

## Ekranda neler var

**Dört ana bölüm.** **İşin özeti**, **Şu anki hedef**, **Konumlandırma** (kendinizi pazarda nasıl anlattığınız) ve **Yazım tercihleri**. Her biri serbest yazıdır, en çok 4.000 karakter. Altında kimin ne zaman güncellediği yazar.

**Özel bölümler.** Dört bölüme sığmayan konular için kendi başlığınızı açarsınız. En çok 20 özel bölüm olur, başlık en çok 120 karakterdir.

**Rakipler.** Alan adı zorunludur, ad ve not yazmak isteğe bağlıdır. En çok 100 rakip eklenir, not en çok 500 karakterdir. Uygulama rakibin verisini çekmez. Liste sizin ve asistanınızın hatırlaması içindir.

**Önemli sayfalar.** Adres, rol, konu ve not yazarsınız. Roller şunlardır:

- **Merkez sayfa**: bir konunun giriş sayfası.
- **Destek sayfası**: merkez sayfayı besleyen alt sayfa.
- **Dönüşüm sayfası**: para kazandıran ya da form olan sayfa.
- **Diğer**.

En çok 100 sayfa eklenir. Adresler https ile başlayacak şekilde düzeltilir.

**Araştırma günlüğü.** Asistanın "şunu araştırdım, şu çıktı" diye bıraktığı tarihli notlardır. Yalnızca asistan yazar, her not en çok 1.000 karakterdir. Siz silebilirsiniz. Notlar 90 gün sonra kendiliğinden silinir. Ekranda en yeni 20 not görünür.

**Ajan kartı.** İki hazır metin sunar: "Ajanınıza doldurtun" ve "Ajanınıza gözden geçirtin". **İstemi kopyala** ile kopyalayıp asistanınıza yapıştırırsınız. Boş projede ilk metin, asistanın size birkaç soru sorup bölümleri doldurmasını sağlar.

## Nasıl kullanılır

1. Projeyi açar açmaz **İşin özeti**'ne üç beş cümle yazın. Ne sattığınızı, kime sattığınızı, sitenizin dillerini ve dönüşüm sayfanızı yazın. Asistanın her raporu bu paragrafa dayanır.
2. **Şu anki hedef**'i somut yazın. "Trafik" yazmayın. "Ürün sayfalarının dizine (Google'ın sayfa listesine) girmesi" ya da "demo formundan ayda beş talep" yazın. Asistan önerilerini buna göre sıralar.
3. **Önemli sayfalar**'a önce dönüşüm sayfalarını, sonra merkez sayfaları ekleyin. Asistan hangi işe öncelik vereceğini buradan anlar.
4. **Yazım tercihleri**'ne kullanılmayacak kelimeleri ve tonu yazın. Örnekler: "sektör lideri deme", "siz dili", "sürüm numarası ver". Asistanın raporları bu kurallara uyar.
5. Asistan kullanıyorsanız ilk gün **Ajanınıza doldurtun** metnini kopyalayıp yapıştırın. Asistan bölümleri sizinle konuşarak doldurur. Ayda bir araştırma günlüğünü okuyup yanlışları düzeltin.

## Sayılar nasıl hesaplanır

Bu ekranda hesaplanan sayı yoktur, yalnızca sınırlar vardır. Bunlar yukarıda yazıldı.

Asistan tek seferde en çok 50 değişiklik yapabilir. Her değişiklik hemen yazılır, onay sorulmaz. Bu yüzden asistanınıza "yazmadan önce bana sor" demeyi alışkanlık yapın. İyi kurulmuş asistan becerileri zaten sorar.

Önemli sayfa adresi en çok 2.048 karakter olur. Rakip alan adı en çok 255, ad 120 karakterdir. Günlük notlarının tarihini uygulama yazar, asistan tarih uyduramaz.

## Sık sorulanlar

**Asistan yanlış bir şey yazmış, ne yapayım?** Bölümü açıp düzeltin. Son güncelleyen "siz" olur. Asistan bir sonraki okumada sizin halinizi görür.

**Rakip ekledim, verisi gelmedi.** Gelmez. Uygulama rakip verisi çekmez. Liste, asistanın web araması yaparken neye bakacağını bilmesi içindir.

**Günlükteki not kayboldu.** 90 günden eski notlar silinir. Kalıcı bilgiyi bölümlere taşıyın. Günlük geçici bir defterdir.

**Bu bilgiler Google'a gider mi?** Hayır. Bu bilgiler bu bilgisayarda saklanır. Yalnızca bağladığınız asistan okur.

## Sınırlar

Ekran serbest yazıdır. Yazdıklarınızın tutarlı olup olmadığını denetlemez. Çelişkili yazarsanız asistan çelişkiyi fark etmeyebilir. Rakipler ve önemli sayfalar bir hatırlatma listesidir, izleme aracı değildir. Araştırma günlüğünü yalnızca asistan yazar. Kendi notlarınızı bölümlere yazın.

<!-- Kaynaklar: src/routes/_project/p/$projectId/context.tsx; src/routes/_project/p/$projectId/settings/context.tsx; src/client/features/projects/context/sectionCopy.ts; src/server/features/project-context/*; src/types/schemas/projectContext.ts; src/server/mcp/server.ts (update_project_context) -->
