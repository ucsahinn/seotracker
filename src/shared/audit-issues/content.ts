/** Titles, descriptions, headings, images and body content. */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const CONTENT_ISSUES = {
  "missing-title": {
    severity: "critical",
    title: "Başlık etiketi yok",
    explanation:
      "Sayfanın başlık etiketi (<title>) yok. Başlık, arama sonucunda mavi bağlantı olarak görünen yazıdır ve Google sayfanın konusunu en çok buradan anlar. Yoksa Google kendisi bir başlık üretir, genelde de kötü olur.",
    howToFix:
      "Sayfaya konusunu anlatan, sayfaya özgü bir <title> ekleyin (yaklaşık 50-60 karakter). SEO eklentisi ya da site oluşturucunuz varsa başlık alanını doldurmanız yeter.",
  },
  "missing-meta-description": {
    severity: "warning",
    title: "Meta açıklama yok",
    explanation:
      "Sayfanın meta açıklaması yok. Bu, arama sonucunda başlığın altında görünen kısa özet yazısıdır. Yoksa Google özeti sayfa metninden kendisi seçer; çoğu zaman daha az çekici olur ve tıklama oranını düşürür.",
    howToFix:
      "Sayfayı özetleyen ve tıklamak için bir neden veren 70-160 karakterlik bir meta açıklama yazın.",
  },
  "missing-h1": {
    severity: "warning",
    title: "H1 başlığı yok",
    explanation:
      "Sayfada H1 (sayfanın ana başlığı) yok. H1, hem ziyaretçiye hem Google'a sayfanın ne hakkında olduğunu ilk bakışta söyler.",
    howToFix:
      "Sayfaya konusunu anlatan tek bir H1 ekleyin; başlık etiketiyle uyumlu olsun.",
  },
  "multiple-h1": {
    severity: "info",
    title: "Birden çok H1 başlığı",
    explanation:
      "Sayfada birden fazla H1 var. Google bunu sorun etmez, yani ceza yok. Ama çoğu zaman şablon hatasının işaretidir; örneğin logo ile sayfa başlığının ikisi de H1 olmuştur.",
    howToFix:
      "Ana başlık için tek H1 bırakın, diğerlerini H2 ya da H3 yapın. Logo gibi başlık olmayan öğelerden H1 etiketini kaldırın.",
  },
  "thin-content": {
    severity: "info",
    title: "Sayfada neredeyse hiç metin yok",
    explanation:
      "Bu sayfada neredeyse hiç görünür metin bulunamadı. Genelde içeriğin JavaScript ile sonradan yüklenmesi ve ilk gelen HTML'de yer almaması yüzünden olur. Metnin kısa olması sorun değil; sorun sayfanın boş görünmesi, çünkü Google boş sayfayı dizine almak istemez.",
    howToFix:
      "Sayfayı açıp metnin göründüğünü, sonra sağ tık > Sayfa kaynağını görüntüle ile aynı metnin orada da olduğunu kontrol edin. Yoksa içeriği sunucu tarafında üretin. Sayfa gerçekten boşsa noindex ekleyin ya da daha dolu bir sayfayla birleştirin.",
  },
  "images-missing-alt": {
    severity: "warning",
    title: "Alt metni olmayan görseller",
    explanation:
      "Sayfadaki bazı görsellerin alt metni (görseli anlatan kısa yazı) yok. Alt metin, görmeyen kullanıcılar için gereklidir ve Google'ın görselin ne olduğunu anlamasının başlıca yoludur.",
    howToFix:
      'Anlam taşıyan her görsele ne gösterdiğini anlatan kısa bir alt metin yazın. Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").',
  },
  "no-outgoing-links": {
    severity: "info",
    title: "Sayfadan başka hiçbir yere bağlantı yok",
    explanation:
      "Bu sayfadan başka hiçbir sayfaya bağlantı verilmiyor, yani ziyaretçi ve Google için çıkmaz sokak. Google siteyi bağlantıları izleyerek gezer; buradan yeni bir yere gidemez.",
    howToFix:
      "İlgili sayfalara, üst kategoriye ya da ana sayfaya bağlantı ekleyin. Menü JavaScript ile oluşuyorsa, bağlantıların ilk gelen HTML'de de bulunduğundan emin olun.",
  },
  "title-too-long": {
    severity: "info",
    title: "Başlık çok uzun",
    explanation:
      "Başlık yaklaşık 60 karakteri aşıyor. Google sonucu gösterirken sonunu keser, yani en önemli kısım görünmeyebilir.",
    howToFix:
      "Başlığı 50-60 karaktere indirin ve en önemli kelimeleri başa koyun.",
  },
  "title-too-short": {
    severity: "info",
    title: "Başlık çok kısa",
    explanation:
      "Başlık 10 karakterden kısa. Bu kadar kısa bir başlık sayfanın ne sunduğunu anlatmaya ve tıklatmaya yetmez.",
    howToFix:
      "Başlığı, sayfanın ne sunduğunu söyleyen bir ifadeye genişletin (yaklaşık 30-60 karakter).",
  },
  "meta-description-too-long": {
    severity: "info",
    title: "Meta açıklama çok uzun",
    explanation:
      "Meta açıklama yaklaşık 160 karakteri aşıyor. Google arama sonucunda özeti kesecek, sonundaki mesaj görünmeyecek.",
    howToFix: "Ana mesajı başta tutarak açıklamayı 70-160 karaktere indirin.",
  },
  "meta-description-too-short": {
    severity: "info",
    title: "Meta açıklama çok kısa",
    explanation:
      "Meta açıklama 70 karakterden kısa. Bu kadar kısa yazılar arama sonucundaki alanı boşa harcar ve Google çoğu zaman bunun yerine sayfadan kendi seçtiği bir metni gösterir.",
    howToFix:
      "Açıklamayı, sayfayı özetleyen ve tıklamak için bir neden veren 70-160 karaktere genişletin.",
  },
  "heading-order-skip": {
    severity: "info",
    title: "Başlık seviyeleri atlanmış",
    explanation:
      "Başlık seviyeleri atlanmış, örneğin H2'den sonra doğrudan H4 gelmiş. Bu, sayfanın bölüm yapısını ekran okuyucular ve arama motorları için karıştırır. Menü ve altbilgi başlıkları da bu sıralamaya dahil olduğundan bazen yanlış alarm olabilir.",
    howToFix:
      "Başlıkları sırayla kullanın: H1, sonra H2, sonra H3. Seviye atlayan başlığı bir kademe yukarı çekin. Atlamanın menü ya da altbilgiden geldiğini görürseniz orada başlık etiketi yerine düz metin kullanın.",
  },
  "missing-viewport": {
    severity: "info",
    title: "Mobil görünüm etiketi (viewport) yok",
    explanation:
      'Sayfada mobil görünüm etiketi (`<meta name="viewport">`) yok. Google siteleri telefon sürümü üzerinden değerlendirir; bu etiket yoksa sayfa telefonda masaüstü genişliğinde açılır ve okumak için yakınlaştırmak gerekir. Bu denetim taranan her sayfaya bakar, bu yüzden bozuk bir şablon gözden kaçmaz.',
    howToFix:
      'Sayfanın `<head>` bölümüne `<meta name="viewport" content="width=device-width, initial-scale=1">` satırını ekleyin. Hemen her site için doğru değer budur.',
  },
  "missing-lang": {
    severity: "info",
    title: "Sayfa dili belirtilmemiş",
    explanation:
      "Sayfanın `<html>` etiketinde `lang` (sayfa dili) yok. Ekran okuyucular doğru telaffuz için, tarayıcılar çeviri önerisi için buna bakar. Google dili içerikten de anlar, ama açıkça yazmak belirsizliği ortadan kaldırır.",
    howToFix:
      'Sayfanın başındaki `<html>` etiketine dilinizi ekleyin; Türkçe bir sayfa için `<html lang="tr">`. Sayfalar tek şablondan üretiliyorsa şablonda bir kez düzeltmek hepsine yeter.',
  },
  "no-subheadings": {
    severity: "info",
    title: "Uzun metinde alt başlık yok",
    explanation:
      "Sayfada epey uzun metin var ama H1 dışında hiç başlık yok. Alt başlıklar uzun metni taranabilir yapar ve Google'ın sayfanın hangi konuları kapsadığını anlamasına yardım eder.",
    howToFix:
      "Metni konularına göre bölün ve her bölüme bir H2 başlığı verin. Başlıklar bölümün ne anlattığını söylesin; anahtar kelime doldurmayın.",
  },
  "alt-is-filename": {
    severity: "info",
    title: "Görselin alt metni bir dosya adı",
    explanation:
      "Bir görselin alt metni dosya adı ya da kamera çıktısı gibi duruyor (IMG_2231.jpg, DSC0043, ekran-goruntusu-1.png). Alt metin, görseli göremeyen birine ne olduğunu anlatmalıdır; dosya adı bunu yapmaz. Google'ın görselin konusunu anlamasına da yardım etmez.",
    howToFix:
      'Alt metne görselde ne olduğunu yazın, örneğin "kırmızı koltukta oturan kadın". Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").',
  },
  "alt-too-long": {
    severity: "info",
    title: "Görsel alt metni çok uzun",
    explanation:
      "Bir görselin alt metni 250 karakteri aşıyor. Ekran okuyucular alt metni sonuna kadar okur; bu kadar uzun olunca görsel anlatımı paragrafa döner ve dinleyen sayfanın akışını kaybeder.",
    howToFix:
      "Görselin ne olduğunu bir cümleyle anlatın (yaklaşık 125 karakter). Daha fazla anlatılacak şey varsa onu sayfanın metnine ya da görselin açıklama yazısına taşıyın.",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
