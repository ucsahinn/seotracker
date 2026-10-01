# Değişiklik günlüğü

Yayında tek sürüm tutuluyor, bu yüzden burada tek not var. Eski notlar
`git log CHANGELOG.md` içinde.

## [Yayınlanmamış]

## [2.0.0] — 2026-10-01

seotracker, kendi bilgisayarınızda çalışan, tek kişilik ve ücretsiz bir SEO
aracıdır. Google Search Console, Google Analytics, kendi site tarayıcısı ve
Google PageSpeed verisini tek yerde toplar; hiçbir ücretli veri kaynağına
bağlanmaz. Bu, her ekranın gerçek veriyle çalıştığı ilk ana sürümdür.

### Neler sunuyor

- **Site denetimi.** Sitenizi tarar, geniş bir kontrol listesiyle sorunları bulur ve 0 ile 100 arası bir puan verir. Her sorunun hangi sayfaları etkilediği adresleriyle görünür; adresleri kopyalayabilir, sorunları CSV olarak indirebilirsiniz.
- **Hız ölçümü.** Taranan her sayfa telefonda ve bilgisayarda ölçülür. Gerçek ziyaretçilerin son haftalardaki hız gidişatı da görünür.
- **Dizin durumu.** Google'ın hangi sayfaları dizine aldığını, almadıysa nedenini gösterir.
- **Denetim raporu.** Kapak, puan, grafikler, her sorun için etkilenen adresler, hız ve dizin durumuyla tek dosya olarak indirilir ve A4 yazdırılabilir.
- **Denetim geçmişi.** Eski denetimlere dönebilir, önceki denetime göre neyin düzeldiğini ya da kötüleştiğini görebilirsiniz.
- **Fırsatlar.** Google'da görünen ama daha çok tıklanabilecek sayfaları puanla sıralar. Bir satıra tıklayınca neden listede olduğunu ve ne yapacağınızı yazar.
- **Arama performansı.** Tıklama, gösterim ve sıra; ülke, cihaz ve arama türüne göre. Grafiklere tıklayarak tabloyu süzersiniz.
- **Sıralama takibi ve kayıtlı kelimeler.** Kelimelerinizin sırasını izler, yükselenleri ve düşenleri ayrı gösterir.
- **Analytics.** Ziyaretçi, kaynak, cihaz ve ülke dağılımı; Fırsatlar'da Search Console verisiyle eşleştirilir.
- **Panel.** Sıradaki adımları, tıklama eğilimini ve birinci sayfaya yakın kelimeleri tek bakışta verir.
- **Ajan bağlantısı.** Yapay zekâ ajanlarınız aynı verileri okuyabilir. Bağlantı bir şifreyle korunur.
- **Sade kullanım.** Her ekranda ne işe yaradığı yazar, tablo başlıklarının yanında açıklama vardır, hızlı filtre düğmeleri ve tıklanabilir grafikler listeyi süzer. Açık ve koyu tema, klavye ve ekran okuyucu desteği vardır.

### Başlamadan önce

- Ajanları bağlamak için şifreyi şu komutla görün ve ajan ayarlarınıza `Authorization: Bearer <şifre>` olarak ekleyin:

```
docker compose exec seotracker cat /app/.wrangler/mcp-token
```

- Şifre istemiyorsanız `.env` dosyanıza `MCP_TOKEN=off` yazıp `docker compose up -d --force-recreate seotracker` çalıştırın.
- Ayarlar'a bir PageSpeed anahtarı girin; anahtar yokken hız ölçümü en çok 50 sayfayla sınırlıdır. Gerçek ziyaretçi hız gidişatı için Google Cloud projenizde "Chrome UX Report API" açık olmalı; değilse ekran bunu söyler.
