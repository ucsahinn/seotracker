# Değişiklik günlüğü

Her sürümün notu burada, en yenisi en üstte.

## [Yayınlanmamış]

## [2.1.0] — 2026-10-02

Bu sürüm Codex'i ilk sınıf istemci yapıyor, Google sınırlarınızı ekranda
gösteriyor, her ekrana hızlı eylemler ekliyor ve bulunan hataları temizliyor.

### Eklendi

- **Codex desteği.** Ajan kurulumu ekranında Codex için ayrı bir kurulum istemi var: tek komutla bağlanır, altı SEO becerisini Codex'in beceri klasörüne kurar ve gerçek bir çağrıyla doğrular. Depodaki `AGENTS.md` Codex ajanlarının kurallarını tek başına anlatır.
- **Google ve sistem sınırları.** Günlük URL denetimi hakkınız, Analytics API kotanız, bugünkü hız ölçümü sayınız ve rapor limitleriniz Site denetimi, Dizin durumu, Analytics, Raporlar, Yardım ve Ayarlar ekranlarında görünür. Yalnızca gerçekten bildiğimiz sayılar gösterilir; her sayının kaynağı ve zamanı yazar.
- **Hızlı eylemler.** Panel, Fırsatlar, Arama performansı, Sıralama takibi, Kayıtlı kelimeler, Site denetimi, Analytics, Raporlar, Proje bilgisi ve Yardım ekranlarında "Yenile" düğmesi ve son güncelleme saati var; `r` tuşu da aynı işi yapar.
- **Canlı görünüm.** Denetim ilerlemesi taramayı ve hız ölçümünü ayrı çubuklarla, kalan süre tahminiyle gösterir. Sayılar ilk açılışta sayarak gelir, kartlar sırayla belirir. Hareketi azaltma ayarı açıksa hiçbiri oynamaz.
- **Yardım ekranı.** Durumu yeniden kontrol et, tanılama paketi, belgeler ve sürüm notları tek çubukta. "Sık sorunlar" bölümü Docker, dolu port, MCP şifresi, PageSpeed sınırı ve sorgu verisi yok durumlarını anlatır.
- **Ayarlar ekranı.** Bölümler arasında hızlı geçiş, her bölümde durum rozeti, PageSpeed anahtarı için "Anahtarı test et" düğmesi.

### Düzeltildi

- Yeniden başlatma sırasında yarıda kalan denetimler artık ilk kontrolde "yarım kaldı" olarak işaretlenir; üç tanesi yeni denetim başlatmayı kalıcı engelleyemez.
- Search Console mülkünü değiştirince ya da bağlantıyı kesince eski sorgu arşivi ve URL denetimi kaydı temizlenir. Önceden iki mülkün geçmişi karışıyordu.
- Projeler arasında geçince önceki projenin verisi ve filtreleri ekranda kalmaz.
- Google bağlantısını değiştirince Fırsatlar, Sıralama takibi ve Analytics beş dakika eski kalmaz.
- Tamamlanmış denetimler artık yeni denetim kapasitesini doldurmaz; yalnızca çalışanlar sayılır.
- Türkçe karakterli kelime araması çalışıyor ("çay", "istanbul"); kayıtlı kelimelerin niyet bilgisi kaybolmuyor.
- Denetim silinince hız ölçümü dosyaları da silinir.
- Kalan süre tahmini saat dilimi yüzünden saatlerce şişiyordu, düzeldi.
- Arama kutusu her tuşta geçmişe yeni kayıt eklemiyor, harf kaybı yok. Dışa aktarma ekrandaki filtreyi izliyor. Pano kopyalama güvenli olmayan adreslerde de hata vermiyor.
- Sayfa derinliği, tekrar denenen tarama parçaları ve boş URL denetimi sonuçlarında veri kaybı düzeltildi.
- Çalışan bir denetimin sonuçlarını okuyan ajan artık "sorun yok" yerine "denetim sürüyor" görür.
- Ayarlar: Google istemcisi ortam değişkeninden gelirken form gizleniyordu; kimlik bilgisi silmeler artık onay istiyor; Google istemci kimliği biçimi kontrol ediliyor; güncelleme denetimi başarısız olunca "en güncel" demiyor.

### Çıkarıldı

- Yardım ekranındaki kaynak depo satırı kaldırıldı.

## [2.0.0] — 2026-10-01

seotracker, kendi bilgisayarınızda çalışan, tek kişilik ve ücretsiz bir SEO
aracıdır. Google Search Console, Google Analytics, kendi site tarayıcısı ve
Google PageSpeed verisini tek yerde toplar; hiçbir ücretli veri kaynağına
bağlanmaz. Bu, her ekranın gerçek veriyle çalıştığı ilk ana sürümdür.

### Neler sunuyor

- **Site denetimi.** Sitenizi tarar, geniş bir kontrol listesiyle sorunları bulur ve 0 ile 100 arası bir puan verir. Her sorunun hangi sayfaları etkilediği adresleriyle görünür; adresleri kopyalayabilir, sorunları CSV olarak indirebilirsiniz.
- **Hız ölçümü.** Taranan her sayfa telefonda ve bilgisayarda ölçülür. Gerçek ziyaretçilerin son haftalardaki hız gidişatı da görünür.
- **Dizin durumu.** Google'ın hangi sayfaları dizine aldığını, almadıysa nedenini gösterir.
- **Denetim raporu.** Kapak ve puan, "Bu hafta yapılacak 3 şey", grafikler, her sorun için etkilenen adresler, hız, dizin durumu ve ölçüm sınırları; tek dosya olarak indirilir ve A4 yazdırılabilir.
- **Raporlar.** Hem ajanların yazdığı hem denetimden indirilen raporlar tek listede: her satırda görünür İndir düğmesi, arama, tür filtresi, PDF olarak kaydetme ve tam ekran görüntüleme. Ajana rapor yazdırmak için hazır, ayrıntılı bir istem var.
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
