# Bilgi bankası

Her ekran ve her iş için birer kılavuz. Kaynak dosyalar `docs/kb/*.md`; web
sitesindeki `/docs/` sayfaları `node scripts/build-site-docs.mjs` ile bunlardan
üretilir ve `site/docs/` altına yazılır. Bir kılavuzu değiştirince betiği yeniden
çalıştırın.

İngilizce sürüm `docs/kb/en/` altında, aynı dosya adlarıyla durur; aynı betik
onları `site/en/docs/<ingilizce-slug>/` olarak üretir (slug eşlemesi
`scripts/site-locales.mjs` içinde). Bir Türkçe sayfayı değiştirince İngilizcesini
de güncelleyin; betik eşi olmayan sayfayı uyarı olarak yazar. Ana sayfanın
İngilizcesi `scripts/site-home.en.json` çeviri tablosundan
`node scripts/build-site-home.mjs build` ile üretilir (`pnpm run site:build`
üçünü birden çalıştırır). İngilizce metinde uygulamanın ekran adları Türkçe
kalır ve ilk geçtiği yerde parantez içinde İngilizcesi verilir, çünkü
uygulamanın arayüzü Türkçedir.

Her dosya YAML ön bilgisiyle başlar (`title`, `description`, ekran sayfalarında
`screen` ve `route`, kılavuzlarda `kind`, hepsinde `updated`). Sonunda, sayfaya
basılmayan bir HTML yorumu, metnin hangi kaynak dosyalara göre doğrulandığını
listeler.

## Başlangıç

- [Windows'a kurulum](kurulum-windows.md): kurma, güncelleme, kaldırma, yedekleme, port
- [Docker ile kurulum](kurulum-docker.md): Mac, Linux, Docker kullananlar
- [Google'a bağlanma](google-baglantisi.md): OAuth istemcisi adım adım, hizmet hesabı yolu
- [PageSpeed anahtarı](pagespeed-anahtari.md): hız ölçümü için ücretsiz anahtar

## Ekranlar

- [Panel](panel.md)
- [Arama performansı](arama-performansi.md)
- [Sıralama takibi](siralama-takibi.md)
- [Fırsatlar](firsatlar.md)
- [Kayıtlı kelimeler](kayitli-kelimeler.md)
- [Analytics](analytics.md)
- [Site denetimi](site-denetimi.md)
- [Dizin durumu](dizin-durumu.md)
- [Raporlar ve şablonlar](raporlar.md)
- [Proje bilgisi](proje-bilgisi.md)
- [Ayarlar](ayarlar.md)

## Başvuru

- [Denetim kuralları](denetim-kurallari.md): 95 kuralın tam listesi
- [Ajan kurulumu](ajan-kurulumu.md): MCP, 33 araç, 6 beceri
- [Sorun giderme](sorun-giderme.md): belirti, sebep, çözüm

## Yazım kuralları

Okur, sitesi olan ama SEO ya da yazılım bilmeyen biridir. Sayfayı açınca ilk
bakışta ne yapacağını anlamalıdır.

- Önce ne yapacağı, sonra kısaca neden. Cümle en çok 15 kelime, paragraf en çok
  3 cümle.
- "Siz" dili, şimdiki zaman, etken çatı. "Yapılmaktadır" yok, "yaparsınız" var.
- Her teknik terim ilk geçtiği yerde parantez içinde iki üç kelimeyle açıklanır:
  canonical (Google'a "asıl adres bu" demenin yolu), adres numarası (port).
  OAuth istemcisi "Google erişim anahtarı", MCP "asistan bağlantısı" diye geçer.
- Türkçesi olan kelimenin Türkçesi. Dosya adı, komut ve adres yalnızca kullanıcı
  yazacaksa geçer ve `kod` biçiminde yazılır.
- Uygulamanın ekrandaki etiketleri kalın ve birebir. Adımlar numaralı, her adım
  bir fiille başlar. Başlıklar okurun kendi sorusu ya da düz ifade.
- Her sayfa tek cümleyle açılır: bu sayfadan ne elde edeceksiniz.
- Uzun tire, orta nokta, ünlem, emoji yok. Sayı, sınır ya da Google davranışı
  yalnızca kaynak kodda ya da Google'ın belgesinde görülüyorsa yazılır; emin
  olunmayan şey yazılmaz.
