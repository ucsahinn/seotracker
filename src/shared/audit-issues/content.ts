/** Titles, descriptions, headings, images and body content. */
import type { AuditIssueDescriptor } from "../audit-issue-types";

export const CONTENT_ISSUES = {
  "missing-title": {
    severity: "critical",
    title: "Başlık etiketi yok",
    explanation:
      "Sayfanın <title> etiketi yok. Başlık, sayfanın konusunu anlatan en güçlü sinyal ve arama sonuçlarında görünen manşettir. Yoksa arama motoru kendi üretir, genelde kötü bir şekilde.",
    howToFix:
      "Sayfanın ana konusunu içeren, yaklaşık 50-60 karakterlik benzersiz ve açıklayıcı bir <title> ekleyin.",
  },
  "missing-meta-description": {
    severity: "warning",
    title: "Meta açıklama yok",
    explanation:
      "Sayfanın meta açıklaması yok. Arama motoru özeti sayfa metninden derler; bu genelde daha az çekici olur ve tıklama oranını düşürür.",
    howToFix:
      "Sayfayı özetleyen ve tıklamak için bir sebep veren, yaklaşık 70-160 karakterlik bir meta açıklama ekleyin.",
  },
  "missing-h1": {
    severity: "warning",
    title: "H1 başlığı yok",
    explanation:
      "Sayfada H1 yok. H1, sayfanın ne hakkında olduğunu hem kullanıcıya hem arama motoruna söyler; H1'i olmayan sayfaların konu netliği zayıf kalır.",
    howToFix:
      "Sayfanın ana konusunu belirten, başlık etiketiyle tutarlı tek bir H1 ekleyin.",
  },
  "multiple-h1": {
    severity: "info",
    title: "Birden çok H1 başlığı",
    explanation:
      "Sayfada birden fazla H1 var. Bu tek başına bir hata değildir; Google birden çok H1’i sorunsuz işler. Ancak çoğu zaman bir şablon hatasının işaretidir (logo ile manşetin ikisinin de H1 olması gibi), o yüzden bakmaya değer.",
    howToFix:
      "Ana başlık için tek bir H1 bırakın, diğerlerini H2/H3 yapın. Logo gibi başlık olmayan öğeleri başlık etiketinden çıkarın.",
  },
  "thin-content": {
    severity: "info",
    title: "Sayfada neredeyse hiç metin yok",
    explanation:
      "Bu adreste çok az görünür metin bulundu. Genelde bunun anlamı, içeriğin JavaScript ile geldiği ve sunucudan gelen HTML'de yer almadığıdır. Kelime sayısı bir kalite ölçüsü değildir: kısa olması sorun değil, boş olması sorundur.",
    howToFix:
      'Sayfayı tarayıcıda açıp metnin göründüğünü, sonra "kaynağı görüntüle" ile aynı metnin HTML\'de de olduğunu doğrulayın. Yoksa sunucu tarafında oluşturun. Sayfa gerçekten boşsa noindex yapın ya da daha güçlü bir sayfayla birleştirin.',
  },
  "images-missing-alt": {
    severity: "warning",
    title: "Alt metni olmayan görseller",
    explanation:
      "Sayfadaki bir veya daha fazla görselin alt niteliği yok. Alt metni hem erişilebilirlik gereğidir hem de arama motorunun görseli anlamasının başlıca yoludur.",
    howToFix:
      'Anlam taşıyan görsellere açıklayıcı alt metni yazın; yalnız süs amaçlı olanlarda boş alt (alt="") kullanın.',
  },
  "no-outgoing-links": {
    severity: "info",
    title: "Sayfadan hiç bağlantı çıkmıyor",
    explanation:
      "Sayfadan hiçbir yere bağlantı çıkmıyor, yani bir çıkmaz sokak. Tarayıcının buradan gidecek yeri olmaz ve kullanıcı geri düğmesine uzanır.",
    howToFix:
      "İlgili sayfalara, üst kategoriye ya da ana sayfaya bağlantı ekleyin. Menü JavaScript ile oluşuyorsa sunucudan gelen HTML'de de bulunduğundan emin olun.",
  },
  "title-too-long": {
    severity: "info",
    title: "Başlık çok uzun",
    explanation:
      "Başlık yaklaşık 60 karakteri aşıyor, bu yüzden arama sonuçlarında kesilecek ve sonu yarıda kalabilecek.",
    howToFix:
      "Başlığı yaklaşık 50-60 karaktere indirin ve en önemli kelimeleri başa alın.",
  },
  "title-too-short": {
    severity: "info",
    title: "Başlık çok kısa",
    explanation:
      "Başlık yaklaşık 10 karakterin altında. Bu kadar kısa bir başlık sayfayı anlatmak ya da tıklama çekmek için genelde fazla genel kalır.",
    howToFix:
      "Başlığı, sayfanın ne sunduğunu söyleyen açıklayıcı bir ifadeye genişletin (yaklaşık 30-60 karakter).",
  },
  "meta-description-too-long": {
    severity: "info",
    title: "Meta açıklama çok uzun",
    explanation:
      "Meta açıklama yaklaşık 160 karakteri aşıyor, bu yüzden arama motoru özeti kesecek.",
    howToFix:
      "Ana mesajı ve tıklama çağrısını koruyarak açıklamayı yaklaşık 70-160 karaktere indirin.",
  },
  "meta-description-too-short": {
    severity: "info",
    title: "Meta açıklama çok kısa",
    explanation:
      "Meta açıklama yaklaşık 70 karakterin altında. Kısa açıklamalar arama sonucunun size verdiği alanı boşa harcar ve arama motorları çoğu zaman bunları yok sayıp sayfadan metin çeker.",
    howToFix:
      "Açıklamayı, sayfayı özetleyen ve tıklamak için sebep veren yaklaşık 70-160 karaktere genişletin.",
  },
  "heading-order-skip": {
    severity: "info",
    title: "Başlık seviyeleri atlanmış",
    explanation:
      "Başlık sıralaması seviye atlıyor (H2'den sonra doğrudan H4 gibi). Bu, erişilebilirlik araçları ve içerik ayrıştırma için belge yapısını zayıflatabilir. Menü ve altbilgi başlıkları da bu sıralamaya karıştığı için yanlış alarm olabilir.",
    howToFix:
      "Başlık seviyelerini atlamadan birer birer inecek şekilde düzeltin (H1 → H2 → H3).",
  },
} as const satisfies Record<string, AuditIssueDescriptor>;
