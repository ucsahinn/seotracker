/* eslint-disable max-lines -- locale dictionary */
// Complete de UI catalog; existing translations are preserved.
/* eslint-disable max-lines -- locale translation data */
export const deCatalog = {
  // installed-0.8.0 diagnostics: Google/Windows/audit failure causes
  "Bağlantıyı düzelt": "Verbindung reparieren",
  "Sürüm kaynağına ulaşılamadı: depo bulunamadı ya da gizli.":
    "Die Versionsquelle ist nicht erreichbar: Das Repository wurde nicht gefunden oder ist privat.",
  "Sürüm kaynağına ulaşılamadı: depo bulunamadı ya da gizli (GitHub 404). Yardım ekranından tanılama paketini indirip sorunu bildirin.":
    "Die Versionsquelle ist nicht erreichbar: Das Repository wurde nicht gefunden oder ist privat (GitHub 404). Laden Sie auf der Hilfeseite das Diagnosepaket herunter und melden Sie das Problem.",
  "{host} site denetimi (eksik)": "Website-Audit für {host} (unvollständig)",
  "Eksik rapor: {why} Sorun listesi tam değil.":
    "Unvollständiger Bericht: {why} Die Liste der Probleme ist nicht vollständig.",
  "Tepsi uygulaması 4 saniye içinde yanıt vermedi (zaman aşımı). Bilgisayar uykudan yeni uyandıysa birkaç saniye sonra Tekrar dene'ye basın; sürerse tepsi menüsünden Çıkış deyip uygulamayı yeniden açın.":
    "Die App im Infobereich hat nicht innerhalb von 4 Sekunden geantwortet (Zeitüberschreitung). Wenn der Computer gerade aus dem Ruhezustand kommt, klicken Sie in ein paar Sekunden auf Erneut versuchen; bleibt der Fehler, wählen Sie im Infobereichsmenü Beenden und öffnen Sie die App erneut.",
  "Tepsi uygulamasının ayar servisine bağlanılamadı. Tepsi uygulaması kapanmış olabilir; seowatcher'ı Başlat menüsünden yeniden açın.":
    "Keine Verbindung zum Einstellungsdienst der App im Infobereich. Die App wurde möglicherweise beendet; öffnen Sie seowatcher erneut über das Startmenü.",
  "Bu ayar yönetici tarafından kilitlenmiş (HTTP 409). Yalnızca bilgisayarın yöneticisi değiştirebilir.":
    "Diese Einstellung wurde von einem Administrator gesperrt (HTTP 409). Nur der Administrator des Computers kann sie ändern.",
  "Tepsi uygulaması bu isteği tanımadı (HTTP 403); sunucu ile tepsi uygulaması farklı oturumlardan kalmış olabilir. Tepsi menüsünden Çıkış deyip uygulamayı yeniden açın.":
    "Die App im Infobereich hat diese Anfrage nicht erkannt (HTTP 403); Server und Infobereichs-App stammen möglicherweise aus verschiedenen Sitzungen. Wählen Sie im Infobereichsmenü Beenden und öffnen Sie die App erneut.",
  "Tepsi uygulaması ayar isteğini reddetti (HTTP {status}). Uygulamayı tepsi menüsünden yeniden başlatın; sürerse Windows paketini güncelleyin.":
    "Die App im Infobereich hat die Einstellungsanfrage abgelehnt (HTTP {status}). Starten Sie die App über das Infobereichsmenü neu; bleibt der Fehler, aktualisieren Sie das Windows-Paket.",
  "Tepsi uygulaması tanınmayan bir yanıt döndürdü; uygulama ile tepsi sürümü uyuşmuyor olabilir. Windows paketini güncelleyin.":
    "Die App im Infobereich hat eine unbekannte Antwort geliefert; die Versionen von App und Infobereichs-App passen möglicherweise nicht zusammen. Aktualisieren Sie das Windows-Paket.",
  "Google Analytics geçersiz bir yanıt döndürdü. Birazdan tekrar deneyin.":
    "Google Analytics hat eine ungültige Antwort geliefert. Versuchen Sie es gleich noch einmal.",
  "Google'a bağlanılamadı, birazdan tekrar deneyin. Neden: {reason}. Sürerse bu bilgisayarın internet bağlantısını kontrol edin.":
    "Keine Verbindung zu Google, versuchen Sie es gleich noch einmal. Grund: {reason}. Bleibt der Fehler, prüfen Sie die Internetverbindung dieses Computers.",
  bilinmiyor: "unbekannt",
  "Search Console isteği geçersiz buldu (HTTP 400). Bu bir bağlantı sorunu değil; seçili boyut, filtre ya da arama türü bu mülkte kullanılamıyor.":
    "Search Console hat die Anfrage abgelehnt (HTTP 400). Das ist kein Verbindungsproblem; die gewählte Dimension, der Filter oder der Suchtyp ist für diese Property nicht verfügbar.",
  "Search Console bu mülke erişimi reddetti (HTTP {status}). Hesabın mülkte doğrulanmış yetkisi olduğunu kontrol edin ya da Ayarlar'dan bağlantıyı yenileyin.":
    "Search Console hat den Zugriff auf diese Property verweigert (HTTP {status}). Prüfen Sie, ob das Konto eine bestätigte Berechtigung für die Property hat, oder erneuern Sie die Verbindung in den Einstellungen.",
  "Search Console mülkü bulunamadı (HTTP 404). Mülk Search Console'dan kaldırılmış olabilir; Ayarlar'dan yeniden seçin.":
    "Search-Console-Property nicht gefunden (HTTP 404). Sie wurde möglicherweise aus der Search Console entfernt; wählen Sie sie in den Einstellungen erneut aus.",
  "Search Console istek sınırı doldu (HTTP 429). Birkaç dakika sonra tekrar deneyin.":
    "Anfragelimit der Search Console erreicht (HTTP 429). Versuchen Sie es in ein paar Minuten erneut.",
  "Search Console zamanında yanıt vermedi. Birazdan tekrar deneyin.":
    "Die Search Console hat nicht rechtzeitig geantwortet. Versuchen Sie es gleich noch einmal.",
  "Search Console geçici olarak yanıt vermiyor (HTTP {status}). Birazdan tekrar deneyin; sürerse Google'ın durum sayfasına bakın.":
    "Die Search Console antwortet vorübergehend nicht (HTTP {status}). Versuchen Sie es gleich noch einmal; bleibt der Fehler, sehen Sie auf der Statusseite von Google nach.",
  'Google Analytics Data API bu Google Cloud projesinde kapalı. Google Cloud Console\'da "Google Analytics Data API"yi etkinleştirip tekrar deneyin.':
    'Die Google Analytics Data API ist in diesem Google-Cloud-Projekt deaktiviert. Aktivieren Sie "Google Analytics Data API" in der Google Cloud Console und versuchen Sie es erneut.',
  "Bu rapor seçili Google Analytics mülküyle uyumlu değil (HTTP 400).":
    "Dieser Bericht ist mit der ausgewählten Google-Analytics-Property nicht kompatibel (HTTP 400).",
  "Google Analytics bağlantısının süresi dolmuş ya da iptal edilmiş. Ayarlar'dan yeniden bağlayın.":
    "Die Google-Analytics-Verbindung ist abgelaufen oder wurde widerrufen. Verbinden Sie sie in den Einstellungen neu.",
  "Google Analytics bu mülke erişimi reddetti (HTTP 403). Bağlı hesaba ya da hizmet hesabına mülkte en az Görüntüleyen yetkisi verin.":
    "Google Analytics hat den Zugriff auf diese Property verweigert (HTTP 403). Geben Sie dem verbundenen Konto oder Dienstkonto mindestens Betrachter-Zugriff auf die Property.",
  "Google Analytics mülkü bulunamadı (HTTP 404). Mülk silinmiş ya da taşınmış olabilir; Ayarlar'dan yeniden seçin.":
    "Google-Analytics-Property nicht gefunden (HTTP 404). Sie wurde möglicherweise gelöscht oder verschoben; wählen Sie sie in den Einstellungen erneut aus.",
  "Google Analytics raporlama kotası doldu (HTTP 429). Kota saatlik ve günlük yenilenir; daha sonra tekrar deneyin.":
    "Das Berichtskontingent von Google Analytics ist aufgebraucht (HTTP 429). Es erneuert sich stündlich und täglich; versuchen Sie es später erneut.",
  "Google Analytics geçici olarak yanıt vermiyor (HTTP {status}{reason}). Birazdan tekrar deneyin.":
    "Google Analytics antwortet vorübergehend nicht (HTTP {status}{reason}). Versuchen Sie es gleich noch einmal.",
  "Bu projeye bağlı bir Google Analytics mülkü yok. Ayarlar'dan bir mülk seçin.":
    "Mit diesem Projekt ist keine Google-Analytics-Property verbunden. Wählen Sie eine in den Einstellungen aus.",
  "Google Analytics geçici olarak yanıt vermiyor. Birazdan tekrar deneyin.":
    "Google Analytics antwortet vorübergehend nicht. Versuchen Sie es gleich noch einmal.",
  "{count} sayfa alınamadı (ağ hatası).": {
    one: "{count} Seite konnte nicht abgerufen werden (Netzwerkfehler).",
    other: "{count} Seiten konnten nicht abgerufen werden (Netzwerkfehler).",
  },
  "Bağlantı yeniden denemede de kurulamadı, bu sayfalar denetlenmedi ve bozuk sayılmadı. Çoğu zaman geçicidir; denetimi yeniden çalıştırın. Sürerse sitenin bu bilgisayardan açıldığını kontrol edin.":
    "Die Verbindung schlug auch beim erneuten Versuch fehl; diese Seiten wurden nicht geprüft und nicht als defekt gezählt. Meist ist das vorübergehend; führen Sie das Audit erneut aus. Bleibt es so, prüfen Sie, ob sich die Website von diesem Computer aus öffnen lässt.",
  "Sunucudan yanıt alınamadı (bağlantı koptu ya da adres çözülemedi). Sayfa denetlenmedi ve bozuk sayılmadı; denetimi yeniden çalıştırın.":
    "Keine Antwort vom Server (Verbindung abgebrochen oder Adresse nicht auflösbar). Die Seite wurde nicht geprüft und nicht als defekt gezählt; führen Sie das Audit erneut aus.",
  "alınamadı (ağ hatası)": "nicht abgerufen (Netzwerkfehler)",
  "Toplam {count} site haritası dosyası okunamadı": {
    one: "Insgesamt konnte {count} Sitemap-Datei nicht gelesen werden",
    other: "Insgesamt konnten {count} Sitemap-Dateien nicht gelesen werden",
  },
  "Site haritası dosyası okunamadı":
    "Eine Sitemap-Datei konnte nicht gelesen werden",
  "robots.txt dosyanızın ya da bir site haritası dizininin gösterdiği bir site haritası dosyasından hiç adres okunamadı. Ayrıntıda hangi dosya olduğu ve nedeni yazıyor: hata kodu, zaman aşımı, bağlantı hatası, siteden çıkan yönlendirme, XML olmayan içerik ya da boş liste. O dosyadaki sayfalar bu denetime site haritasından girmedi; Google da aynı hatayı görüyorsa onları da okuyamıyor olabilir.":
    "Aus einer Sitemap-Datei, auf die Ihre robots.txt oder ein Sitemap-Index verweist, konnte keine Adresse gelesen werden. Die Details nennen die Datei und den Grund: Fehlercode, Zeitüberschreitung, Verbindungsfehler, Weiterleitung von der Website weg, Inhalt, der kein XML ist, oder eine leere Liste. Die Seiten dieser Datei kamen nicht über die Sitemap in dieses Audit; sieht Google denselben Fehler, kann es sie womöglich auch nicht lesen.",
  "Ayrıntıdaki adresi tarayıcıda açın. Hata kodu ya da yönlendirme varsa dosyayı doğru adreste yayınlayın veya robots.txt ve site haritası dizinindeki satırı düzeltin. Zaman aşımı ya da bağlantı hatası çoğu zaman geçicidir; denetimi yeniden çalıştırın, sürerse sunucunun yanıt süresine bakın. Search Console'daki Site Haritaları raporu Google'ın gördüğünü gösterir.":
    "Öffnen Sie die Adresse aus den Details im Browser. Bei einem Fehlercode oder einer Weiterleitung veröffentlichen Sie die Datei unter der richtigen Adresse oder korrigieren die Zeile in robots.txt und im Sitemap-Index. Zeitüberschreitung oder Verbindungsfehler sind meist vorübergehend; führen Sie das Audit erneut aus und prüfen Sie bei Fortbestehen die Antwortzeit des Servers. Der Sitemaps-Bericht in der Search Console zeigt, was Google sieht.",
  "Sunucu HTTP {status} döndürdü": "Der Server antwortete mit HTTP {status}",
  "Sunucu zamanında yanıt vermedi (zaman aşımı, yeniden denendi)":
    "Der Server hat nicht rechtzeitig geantwortet (Zeitüberschreitung, erneut versucht)",
  "Bağlantı kurulamadı (ağ hatası, yeniden denendi)":
    "Keine Verbindung möglich (Netzwerkfehler, erneut versucht)",
  "Başka bir siteye ya da döngüye yönlendiriyor":
    "Es leitet auf eine andere Website oder im Kreis weiter",
  "Dönen içerik site haritası XML'i değil":
    "Der zurückgegebene Inhalt ist kein Sitemap-XML",
  "Dosya okundu ama hiç adres listelemiyor":
    "Die Datei wurde gelesen, listet aber keine Adressen",
  "Hazırlık puanı": "Bereitschaftsbewertung",
  "{completed} / {total} hazır": "{completed} / {total} bereit",
  "Puan; Google bağlantıları, güncel denetim, proje bilgisi ve ajan kurulumunun hazır olup olmadığını gösterir. Arama sırası ya da SEO başarısı değildir.":
    "Diese Bewertung zeigt, ob Google-Verbindungen, ein aktuelles Audit, der Projektkontext und Ihr Agent bereit sind. Es handelt sich nicht um ein Ranking oder eine SEO-Leistungsbewertung.",
  "Denetimi yeniden başlatın": "Audit erneut ausführen",
  "Önceki denetim tamamlanamadı. Yeniden deneyin.":
    "Das vorherige Audit wurde nicht abgeschlossen. Versuchen Sie es erneut.",
  "Yeniden denetle": "Erneut ausführen",
  "Denetim sürüyor": "Audit läuft",
  "İlerlemeyi ve bitiş özetini denetim ekranında izleyin.":
    "Verfolgen Sie den Fortschritt und die Abschlusszusammenfassung auf dem Audit-Bildschirm.",
  "İlerlemeyi gör": "Fortschritt anzeigen",
  "Sizin 'önemli' saydığınız hareket, örneğin form gönderme ya da satın alma. Tanımlı değilse hep 0 görünür.":
    "Eine Aktion, die Sie als wichtig erachten, z. B. das Absenden eines Formulars oder ein Kauf. Zeigt 0, bis eine solche Aktion eingerichtet ist.",
  "Oturumların yüzde kaçında önemli saydığınız bir hareket (anahtar olay) gerçekleşti. Anahtar olay tanımlı değilse hep %0 görünür.":
    "Der Anteil der Sitzungen, in denen eine von Ihnen als wichtig erachtete Aktion (ein Schlüsselereignis) stattgefunden hat. Zeigt 0 % an, bis ein Schlüsselereignis eingerichtet wird.",
  "Ziyaretçinin sayfada vakit geçirip bir şey yaptığı oturumların yüzdesi.":
    "Der Anteil der Sitzungen, in denen der Besucher Zeit auf der Seite verbracht oder etwas getan hat.",
  "Seçilen aralıkta siteyle gerçekten etkileşime giren (sayfada vakit geçiren ya da bir şey yapan) kişi sayısı.":
    "Personen, die im ausgewählten Zeitraum tatsächlich mit der Website interagiert haben (Zeit auf einer Seite verbracht oder etwas getan haben).",
  "Anahtar olay": "Schlüsselereignisse",
  "Olay türü": "Ereignistypen",
  "En çok tetiklenen": "Am häufigsten ausgelöst",
  "{count} kez, {share} pay": {
    one: "{count}-mal, Anteil {share}",
    other: "{count}-mal, Anteil {share}",
  },
  "Tetikleyen kullanıcı": "Nutzer, die es ausgelöst haben",
  "En çok tetiklenen olayda": "Beim am häufigsten ausgelösten Ereignis",
  "Ürün geliri": "Artikelumsatz",
  "Satılan ürün": "Gekaufte Artikel",
  "Sepete eklenen": "In den Warenkorb gelegte Artikel",
  "Görüntülenen ürün": "Angesehene Artikel",
  Arama: "Suchvorgänge",
  "Farklı terim": "Verschiedene Begriffe",
  "En çok aranan": "Am häufigsten gesucht",
  "{count} kez": { one: "{count}-mal", other: "{count}-mal" },
  "Yalnızca bir kez aranan": "Nur einmal gesucht",
  "Pay: {share}": "Anteil: {share}",
  "Google Analytics bağlı değil": "Google Analytics ist nicht verbunden",
  "Raporlar, Analytics'teki sitenizden gelir. Önce bağlantıyı kurun.":
    "Die Berichte stammen aus Analytics für Ihre Website. Verbinden Sie Analytics zuerst.",
  "Analytics'i bağla": "Analytics verbinden",
  "{title}: toplam {total} {unit}.": "{title}: insgesamt {total} {unit}.",
  "En büyük pay {label}, {share}.": "Größter Anteil: {label}, {share}.",
  "Birine tıklayın, aşağıdaki tablo o satırlara daralsın.":
    "Klicken Sie auf eine Schaltfläche, um die Tabelle unten auf diese Zeilen einzugrenzen.",
  "Organik oturum grafiği yüklenemedi":
    "Das Diagramm der organischen Sitzungen konnte nicht geladen werden",
  "{start} – {end} dönemine göre": "Verglichen mit {start} – {end}",
  "Organik oturumlar": "Organische Sitzungen",
  "Seçtiğiniz aralık, gün gün.": "Ihr ausgewählter Zeitraum, Tag für Tag.",
  Oturum: "Sitzungen",
  "Etkileşim oranı": "Interaktionsrate",
  "Organik gelir": "Organischer Umsatz",
  "Günlük organik oturumlar": "Organische Sitzungen pro Tag",
  "Bu aralıkta organik oturum yok, grafik boş.":
    "Keine organischen Sitzungen in diesem Zeitraum, daher ist das Diagramm leer.",
  "{days} günde toplam {total} organik oturum. En yüksek gün {day}, {peak} oturum.":
    "{total} organische Sitzungen in {days} Tagen. Spitzentag {day} mit {peak} Sitzungen.",
  oturum: "Sitzungen",
  "{dimension} bazında oturum payı": "Anteil der Sitzungen nach {dimension}",
  "{dimension} bazında kullanıcı payı": "Anteil der Nutzer nach {dimension}",
  kullanıcı: "Nutzer",
  "Giriş sayfaları, oturuma göre": "Landingpages nach Sitzungen",
  "Sayfalar, görüntülenmeye göre": "Seiten nach Aufrufen",
  görüntülenme: "Aufrufe",
  "Olaylar, tetiklenme sayısına göre": "Ereignisse nach Anzahl der Auslösungen",
  "anahtar olay": "Schlüsselereignisse",
  "Ürünler, gelire göre": "Artikel nach Umsatz",
  gelir: "Umsatz",
  "Ürünler, satış adedine göre": "Artikel nach verkaufter Menge",
  "satılan ürün": "gekaufte Artikel",
  "Ürünler, görüntülenmeye göre": "Artikel nach Aufrufen",
  "ürün görüntüleme": "Artikelaufrufe",
  "Arama terimleri, arama sayısına göre": "Suchbegriffe nach Suchvorgängen",
  arama: "Suchvorgänge",
  "Dönüşüm (anahtar olay) tanımlı olmadığı için bu filtre kullanılamıyor":
    "Dieser Filter ist nicht verfügbar, da keine Conversion (Schlüsselereignis) eingerichtet ist",
  "Etkileşimi düşük": "Geringe Interaktion",
  "Etkileşim oranı yüzde 50'nin altında olan satırlar.":
    "Zeilen mit einer Interaktionsrate unter 50 %.",
  "Dönüşümü olan": "Mit Conversions",
  "En az bir anahtar olay getirmiş satırlar.":
    "Zeilen, die mindestens ein Schlüsselereignis brachten.",
  "Geliri olan": "Mit Umsatz",
  "Gelir getirmiş ürünler.": "Artikel, die Umsatz gebracht haben.",
  "Etkileşim süresi düşük": "Kurze Interaktionsdauer",
  "Kullanıcı başına etkileşim süresi {bar} altında kalan sayfalar (listenin ortancası {median}, yarısı {bar}).":
    "Seiten mit einer Interaktionsdauer pro Nutzer unter {bar} (der Median der Liste ist {median}; die Hälfte davon ist {bar}).",
  "Trafiği yüksek, dönüşümü düşük": "Viel Traffic, wenig Conversions",
  "Oturumu ortancanın ({sessions}) üstünde ama oturum başına anahtar olay oranı ortancanın ({rate}) altında kalan sayfalar, bir de hiç olay getirmeyenler.":
    "Seiten mit Sitzungen über dem Median ({sessions}), aber einer Schlüsselereignisrate pro Sitzung unter dem Median ({rate}), dazu Seiten ganz ohne Schlüsselereignisse.",
  Diğer: "Andere",
  "Bu dönemde anahtar olay kaydı yok":
    "In diesem Zeitraum wurden keine Schlüsselereignisse erfasst",
  "Mülkte hiçbir olay anahtar olay işaretli olmayabilir ya da işaretli olaylar bu aralıkta hiç olmamış olabilir.":
    "Möglicherweise sind in der Property keine Ereignisse als Schlüsselereignisse markiert, oder die markierten Ereignisse sind in diesem Zeitraum nicht aufgetreten.",
  "Anahtar olay nasıl tanımlanır": "So richten Sie Schlüsselereignisse ein",
  "Bu dönemde ürün verisi yok": "Keine Artikeldaten in diesem Zeitraum",
  "Mülk e-ticaret olayı (ürün görüntüleme, sepete ekleme, satın alma) göndermiyor olabilir. Mağazası olmayan bir sitede bu normal.":
    "Die Property sendet möglicherweise keine E-Commerce-Ereignisse (Artikelaufrufe, In den Warenkorb legen, Käufe). Das ist normal für eine Website ohne Shop.",
  "GA4 e-ticaret ölçümü": "GA4-E-Commerce-Messung",
  "Bu dönemde site içi arama kaydı yok":
    "In diesem Zeitraum wurden keine internen Suchvorgänge erfasst",
  "Sitede arama kutusu yoksa ya da site içi arama ölçümü kapalıysa bu rapor boş kalır. Açıkken de kimse bir şey aramadıysa boştur.":
    "Dieser Bericht bleibt leer, wenn die Website kein Suchfeld hat oder die Messung der internen Suche deaktiviert ist. Er ist auch leer, wenn sie aktiviert ist, aber niemand gesucht hat.",
  "Gelişmiş ölçüm ve site içi arama": "Erweiterte Messung und interne Suche",
  "Bu dönemde veri yok": "Keine Daten in diesem Zeitraum",
  "Google hiç satır vermedi ({reason}).":
    "Google hat keine Zeilen zurückgegeben ({reason}).",
  "Google bu aralık için satır vermedi. Mülkü yeni bağladıysanız veri birkaç gün sonra görünür.":
    "Google hat für diesen Zeitraum keine Zeilen zurückgegeben. Wenn Sie die Property erst kürzlich verbunden haben, erscheinen die Daten nach einigen Tagen.",
  "Şu an yalnızca Google organik aramadan gelen ziyaretler sayılıyor; tüm trafiğe bakmak sonucu değiştirebilir.":
    "Derzeit werden nur Besuche aus der organischen Google-Suche gezählt; bei Betrachtung des gesamten Traffics kann sich das Ergebnis ändern.",
  "Google'ın verdiği not: {reason}.": "Hinweis von Google: {reason}.",
  "Tüm trafiğe bak": "Gesamten Traffic anzeigen",
  "Ölçüm durumunu kontrol et": "Messzustand überprüfen",
  "Listelenen {count} satırdan": {
    one: "Von {count} aufgeführten Zeile",
    other: "Von {count} aufgeführten Zeilen",
  },
  "Analytics mülkü": "Analytics-Property",
  "{shown} / {count} satır": {
    one: "{shown} / {count} Zeile",
    other: "{shown} / {count} Zeilen",
  },
  "{count} satır": {
    one: "{count} Zeile",
    other: "{count} Zeilen",
  },
  örneklenmiş: "Stichprobe",
  "eşik altı satırlar gizlendi":
    "Zeilen unterhalb der Schwellenwerte ausgeblendet",
  "Hızlı filtreler": "Schnellfilter",
  "Yalnızca Google organik aramadan gelen ziyaretleri gösterir.":
    "Zeigt nur Besuche aus der organischen Google-Suche an.",
  "Sadece organik": "Nur organisch",
  "Sayılar, listelenen tüm satırlara göre hesaplanır. Birden fazla filtre seçerseniz satırın hepsine uyması gerekir.":
    "Die Zahlen beziehen sich auf alle aufgeführten Zeilen. Wenn Sie mehrere Filter auswählen, muss eine Zeile alle erfüllen.",
  "Filtreleri temizle": "Filter löschen",
  "E-Tablolar'a aktar ({count} satır)": {
    one: "Nach Google Tabellen exportieren ({count} Zeile)",
    other: "Nach Google Tabellen exportieren ({count} Zeilen)",
  },
  "CSV ({count} satır)": {
    one: "CSV ({count} Zeile)",
    other: "CSV ({count} Zeilen)",
  },
  "Bu filtrelere uyan satır yok": "Keine Zeilen entsprechen diesen Filtern",
  "Seçtiğiniz filtrelerle hiçbir satır eşleşmiyor.":
    "Keine Zeile entspricht den ausgewählten Filtern.",
  "Kanal grubu": "Kanalgruppe",
  "Organik arama": "Organische Suche",
  "Tüm trafik": "Gesamter Traffic",
  "Ziyaretçiler siteye hangi sayfadan giriyor ve o sayfada kalıp bir sonuca ulaşıyor mu?":
    "Auf welcher Seite betreten Besucher die Website, und bleiben sie dort und erreichen ein Ziel?",
  "Hangi sayfalar en çok görüntüleniyor ve okurlar orada ne kadar vakit geçiriyor?":
    "Welche Seiten werden am häufigsten aufgerufen, und wie lange verweilen die Leser dort?",
  "Ziyaretçiler hangi kanallardan geliyor ve hangi kanal gerçekten sonuç getiriyor?":
    "Aus welchen Kanälen kommen Besucher und welcher bringt tatsächlich Ergebnisse?",
  "Sonuç saydığınız olaylar ne sıklıkla gerçekleşiyor ve kaç kişi tetikliyor?":
    "Wie oft finden die Ereignisse statt, die Sie als Ergebnisse zählen, und wie viele Menschen lösen sie aus?",
  "Hangi ürünler görüntüleniyor, sepete ekleniyor ve gelir getiriyor? Mülkte e-ticaret ölçümü yoksa bu sekme boş kalır.":
    "Welche Artikel werden angesehen, in den Warenkorb gelegt und bringen Umsatz? Dieser Tab bleibt leer, wenn die Property keinen E-Commerce misst.",
  "Ziyaretçiler sitenizde ne arıyor? Bulamadıkları içerik, yazacağınız yeni sayfaların ipucudur.":
    "Wonach suchen Besucher auf Ihrer Website? Inhalte, die sie nicht finden, zeigen, welche neuen Seiten Sie schreiben sollten.",
  "Ziyaretçileriniz hangi cihazlardan geliyor ve cihaza göre deneyim nasıl değişiyor?":
    "Welche Geräte nutzen Ihre Besucher und wie verändert sich das Erlebnis je nach Gerät?",
  "Ziyaretçiler siteye hangi sayfadan giriyor, orada ne yapıyor.":
    "Auf welcher Seite betreten Besucher die Website und was tun sie dort?",
  "Ölçüm durumu": "Messzustand",
  "Satır sayısı": "Zeilen",
  "Analytics gerçekten ölçüyor mu? Mülkünüzün kurulum ayarlarını okur, rapor kotanızdan harcamaz.":
    "Misst Analytics tatsächlich? Dazu wird die Einrichtung Ihrer Property gelesen; Ihr Berichtskontingent wird nicht belastet.",
  "Kitleyi neye göre böl": "Zielgruppe aufteilen nach",
  "Trafiği neye göre böl": "Traffic aufteilen nach",
  "Rapor alınamadı": "Der Bericht konnte nicht geladen werden",
  "Web veri akışı yok": "Kein Web-Datenstream",
  "Bu mülke bir web veri akışı eklenmeden site trafiği hiç ölçülmez.":
    "Der Website-Traffic wird überhaupt nicht gemessen, solange diese Property keinen Web-Datenstream hat.",
  "Gelişmiş ölçüm kapalı": "Erweiterte Messung aus",
  "Kaydırma, dış bağlantı ve dosya indirme gibi olaylar toplanmıyor. Akış ayarlarından açabilirsiniz.":
    "Ereignisse wie Scrollen, ausgehende Klicks und Dateidownloads werden nicht erfasst. Sie können sie in den Stream-Einstellungen aktivieren.",
  "Site içi arama ölçülmüyor": "Die interne Suche wird nicht gemessen",
  "Sitenizde arama kutusu varsa, ziyaretçilerin ne aradığını göremezsiniz.":
    "Wenn Ihre Website über ein Suchfeld verfügt, können Sie nicht sehen, wonach Besucher suchen.",
  "Anahtar olay tanımlı değil": "Keine Schlüsselereignisse eingerichtet",
  "Anahtar olay olmadan trafiğin sonuca dönüşüp dönüşmediği ölçülemez; her rapor oturum sayısında kalır.":
    "Ohne Schlüsselereignisse lässt sich nicht feststellen, ob Traffic zu Ergebnissen führt; jeder Bericht endet bei der Anzahl der Sitzungen.",
  "Envanter eksik olabilir": "Das Inventar ist möglicherweise unvollständig",
  'Google bu mülkün listesini eksik verdi. Sayımlara ve "eksik yok" sonucuna tam güvenmeyin.':
    "Google hat für diese Property eine unvollständige Liste zurückgegeben. Verlassen Sie sich nicht vollständig auf die Zahlen oder auf ein Ergebnis „nichts fehlt“.",
  Kaydırma: "Scrolls",
  "Dış bağlantı": "Ausgehende Klicks",
  "Dosya indirme": "Dateidownloads",
  "Sayfa geçişleri": "Seitenänderungen",
  "Her tetiklemede sayılır": "Einmal pro Ereignis",
  "Oturumda bir kez sayılır": "Einmal pro Sitzung",
  "Android uygulaması": "Android-App",
  "iOS uygulaması": "iOS-App",
  "Ölçüm durumu okunamadı": "Messzustand konnte nicht gelesen werden",
  "Web veri akışı": "Web-Datenstreams",
  "{count} akıştan web olanlar": {
    one: "Web-Streams von insgesamt {count} Stream",
    other: "Web-Streams von insgesamt {count} Streams",
  },
  "Web akışı yok": "Kein Web-Stream",
  "Tüm akışlar web": "Alle Streams sind Web-Streams",
  "Önemli saydığınız hareket, örneğin form gönderme ya da satın alma. Tanımlı değilse rapor hep 0 gösterir.":
    "Eine Aktion, die Sie als wichtig erachten, z. B. das Absenden eines Formulars oder ein Kauf. Berichte zeigen 0, bis eine solche Aktion eingerichtet ist.",
  "Özel boyut": "Benutzerdefinierte Dimensionen",
  "{count} özel metrik": {
    one: "{count} benutzerdefinierte Metrik",
    other: "{count} benutzerdefinierte Metriken",
  },
  Bulgu: "Befunde",
  "Kurulum eksiksiz": "Einrichtung ist vollständig",
  "Aşağıda açıklanıyor": "Unten erklärt",
  "Ölçüm kurulumunda eksik yok.": "Im Messaufbau fehlt nichts.",
  "adres yok": "keine Adresse",
  "Gelişmiş ölçüm açık": "Erweiterte Messung an",
  "{on} / {count} otomatik olay açık":
    "{on} / {count} automatische Ereignisse an",
  "Gelişmiş ölçüm": "Erweiterte Messung",
  "Gelişmiş ölçüm; kaydırma, dış bağlantı tıklaması ve dosya indirme gibi olayları koda dokunmadan toplar. Kapalı olanlar raporlarda hiç görünmez.":
    "Die erweiterte Messung erfasst Ereignisse wie Scrollen, ausgehende Klicks und Dateidownloads, ohne den Code zu berühren. Ereignisse, die deaktiviert sind, erscheinen nie in Berichten.",
  "açık:": "an:",
  "kapalı:": "aus:",
  "Uygulama veri akışları": "App-Datenstreams",
  "Bu mülke bağlı, web dışındaki akışlar. Buradaki raporlar yalnızca web trafiğini kapsamaz; uygulama verisi de toplamlara karışır.":
    "Nicht-Web-Streams, die mit dieser Property verknüpft sind. Die Berichte hier beschränken sich nicht auf Web-Traffic; App-Daten fließen ebenfalls in die Gesamtwerte ein.",
  "Sayım yöntemi": "Zählmethode",
  "Sayım yöntemi, aynı oturumda tekrarlanan bir olayın kaç kez sayılacağını belirler. Dönüşüm rakamlarını karşılaştırırken bu ayara bakın.":
    "Die Zählmethode entscheidet, wie oft ein in einer Sitzung wiederholtes Ereignis gezählt wird. Überprüfen Sie dies beim Vergleich der Conversion-Zahlen.",
  "Google Analytics bağlandı": "Google Analytics verbunden",
  "Google Analytics bağlantısı kesildi": "Google Analytics getrennt",
  "Bağlantı yükleniyor": "Verbindung wird geladen",
  "Bu projenin bağlantısı kontrol edilemedi.":
    "Die Verbindung dieses Projekts konnte nicht überprüft werden.",
  "Tekrar dene": "Erneut versuchen",
  Vazgeç: "Abbrechen",
  "Bağlantıyı değiştirmek için Ayarlar'daki Google kurulumunu kontrol edin.":
    "Um die Verbindung zu ändern, prüfen Sie die Google-Einrichtung in den Einstellungen.",
  Gizle: "Ausblenden",
  "Search Console bağlandı": "Search Console verbunden",
  "Search Console bağlantısı kesildi": "Search Console getrennt",
  "Google erişim anahtarı eksik": "Google-Zugriffsschlüssel fehlt",
  "Search Console'u bağlamak için önce Ayarlar'a Google erişim anahtarınızı girin.":
    "Um Search Console zu verbinden, geben Sie zunächst Ihren Google-Zugriffsschlüssel in den Einstellungen ein.",
  "Ayarlar'ı aç": "Einstellungen öffnen",
  "Kurulum kılavuzunu aç": "Einrichtungsanleitung öffnen",
  görsel: "Bild",
  haber: "Nachrichten",
  "{count} adres": {
    one: "{count} URL",
    other: "{count} URLs",
  },
  "{list} gönderilmiş": "{list} eingereicht",
  "Site haritaları okunamadı": "Sitemaps konnten nicht gelesen werden",
  "Search Console bağlı değil": "Search Console ist nicht verbunden",
  "Site haritalarınızı Google'ın gözünden görmek için Search Console bağlantısı gerekir.":
    "Verbinden Sie Search Console, um Ihre Sitemaps so zu sehen wie Google.",
  Bağlantılar: "Verbindungen",
  "Google bu mülkün site haritalarını vermedi. Hesabınızın Search Console'da site haritası gönderme yetkisi yoksa, mülke erişseniz bile bu listeyi göremezsiniz.":
    "Google hat die Sitemaps dieser Property nicht zurückgegeben. Wenn Ihr Konto keine Sitemaps in der Search Console einreichen kann, können Sie diese Liste auch mit Zugriff auf die Property nicht sehen.",
  "Gönderilmiş site haritası yok": "Keine Sitemaps eingereicht",
  "Google site haritası olmadan da sayfa bulur. Ama site haritası, hangi sayfaları önemsediğinizi ona doğrudan söylemenin yoludur.":
    "Google findet auch Seiten ohne Sitemap. Aber mit einer Sitemap sagen Sie direkt, welche Seiten Sie interessieren.",
  "Site haritaları": "Sitemaps",
  "Google'a gönderdikleriniz ve Google'ın onlarla ne yaptığı.":
    "Was Sie bei Google eingereicht haben und was Google damit gemacht hat.",
  "dizin dosyası": "Sitemap-Index",
  "son indirme {date}": "zuletzt gelesen am {date}",
  "Google hiç indirmedi": "Google hat sie nie gelesen",
  "{count} hata": {
    one: "{count} Fehler",
    other: "{count} Fehler",
  },
  "{count} uyarı": {
    one: "{count} Warnung",
    other: "{count} Warnungen",
  },
  Hatalı: "Fehlerhaft",
  İşlenmedi: "Ausstehend",
  Okundu: "Gelesen",
  İndirilmedi: "Nicht gelesen",
  "{provider} bağlantısı tamamlanmadı":
    "{provider}-Verbindung wurde nicht abgeschlossen",
  "Google girişi tamamlanmadı": "Google-Anmeldung wurde nicht abgeschlossen",
  "Deneme zaman aşımına uğradı ya da yarıda kesildi. Tek bir tarayıcı sekmesinde yeniden deneyin ve Google adımlarını 10 dakika içinde bitirin. Tekrar ederse tarayıcınızın bu site için çerezlere izin verdiğinden emin olun.":
    "Der Versuch ist abgelaufen oder wurde unterbrochen. Versuchen Sie es erneut in einem einzelnen Browser-Tab und schließen Sie die Google-Schritte innerhalb von 10 Minuten ab. Wenn das Problem erneut auftritt, stellen Sie sicher, dass Ihr Browser Cookies für diese Website zulässt.",
  "{provider} bağlantısı iptal edildi":
    "{provider}-Verbindung wurde abgebrochen",
  "Google girişi iptal edildi": "Google-Anmeldung wurde abgebrochen",
  "Google'ın izin ekranı kapatıldı ya da reddedildi. Hazır olduğunuzda yeniden deneyebilirsiniz.":
    "Der Zustimmungsbildschirm von Google wurde geschlossen oder abgelehnt. Sie können es jederzeit erneut versuchen.",
  "Google hesabı zaten bağlı": "Google-Konto bereits verknüpft",
  'Bu Google hesabı zaten başka bir kayıtta bağlı görünüyor. {provider} mülk seçicisini açıp hesabın yanındaki "Hesabı kaldır"a basın, sonra yeniden bağlayın.':
    "Dieses Google-Konto scheint bereits mit einem anderen Datensatz verknüpft zu sein. Öffnen Sie die {provider}-Property-Auswahl, klicken Sie neben dem Konto auf „Konto entfernen“ und verbinden Sie es dann erneut.",
  "Bu Google hesabı zaten başka bir kayıtta bağlı görünüyor. Ayarlar'daki mülk seçicisinden hesabı kaldırıp yeniden bağlayın.":
    "Dieses Google-Konto scheint bereits mit einem anderen Datensatz verknüpft zu sein. Entfernen Sie das Konto in den Einstellungen aus der Property-Auswahl und verbinden Sie es dann erneut.",
  "Google ile konuşurken bir şeyler ters gitti. Yeniden deneyin. Sürerse hatanın ayrıntısı Yardım ekranındaki günlüklerde.":
    "Bei der Kommunikation mit Google ist ein Fehler aufgetreten. Versuchen Sie es erneut. Wenn es weiterhin auftritt, finden Sie die Fehlerdetails in den Protokollen auf dem Hilfebildschirm.",
  "{integration} için önce Ayarlar'a Google erişim anahtarınızı girin.":
    "Um {integration} zu verwenden, geben Sie zunächst Ihren Google-Zugriffsschlüssel in den Einstellungen ein.",
  Bağlı: "Verbunden",
  "Bağlı değil": "Nicht verbunden",
  "Bu projenin bağlantısını tamamlamak için bir {name} mülkü seçin.":
    "Wählen Sie eine {name}-Property, um die Verbindung dieses Projekts abzuschließen.",
  "Bu projenin verisini görmek için {name} bağlayın.":
    "Verbinden Sie {name}, um die Daten dieses Projekts anzuzeigen.",
  "Google açılıyor…": "Google wird geöffnet…",
  "Mülk seç": "Property auswählen",
  Bağlan: "Verbinden",
  "Google hesaplarını yönet": "Google-Konten verwalten",
  Kapat: "Schließen",
  "Alan adı mülkü: tüm alt alan adlarını ve http/https adreslerini kapsar.":
    "Domain-Property: umfasst alle Subdomains sowie http- und https-URLs.",
  "Mülkü veya hesabı değiştir": "Property oder Konto ändern",
  "Bağlantıyı kes": "Verbindung trennen",
  "Bağlantı kesilirse bu projenin bu kaynağa bağlı ekranları boş kalır. Veriler silinmez; mülkü yeniden seçerek geri bağlayabilirsiniz.":
    "Wenn Sie die Verbindung trennen, bleiben die Bildschirme dieses Projekts, die diese Quelle nutzen, leer. Es werden keine Daten gelöscht; wählen Sie die Property erneut aus, um die Verbindung wiederherzustellen.",
  "Bağlantı kesiliyor…": "Verbindung wird getrennt…",
  "Google hesabı kaldırıldı": "Google-Konto entfernt",
  "Google hesabı kaldırılsın mı?": "Google-Konto entfernen?",
  "Bu hesabın {name} bağlantısı seowatcher'dan kaldırılır. İstediğiniz zaman yeniden bağlayabilirsiniz.":
    "Die {name}-Verbindung dieses Kontos wird aus seowatcher entfernt. Sie können es jederzeit wieder verbinden.",
  "Bağlı projeler kontrol ediliyor": "Verknüpfte Projekte werden überprüft",
  "Bağlı projeler kontrol edilemedi.":
    "Verknüpfte Projekte konnten nicht überprüft werden.",
  "Bu işlem {name} bağlantısını {count} projeden de kaldırır.": {
    one: "Dadurch wird die {name}-Verbindung auch aus {count} Projekt entfernt.",
    other:
      "Dadurch wird die {name}-Verbindung auch aus {count} Projekten entfernt.",
  },
  "Hiçbir proje etkilenmeyecek.": "Es sind keine Projekte betroffen.",
  "Hesap kaldırılamadı. Tekrar deneyin.":
    "Das Konto konnte nicht entfernt werden. Versuchen Sie es erneut.",
  "Kaldırılıyor…": "Wird entfernt…",
  "Hesabı kaldır": "Konto entfernen",
  "Google hesabı · {id}": "Google-Konto · {id}",
  "Bir mülk seçin…": "Property auswählen…",
  "Google mülkleri": "Google-Properties",
  "Mülk veya hesap ara": "Properties oder Konten durchsuchen",
  "Mülk veya hesap ara…": "Properties oder Konten durchsuchen…",
  "Mülkler yüklenemedi.": "Properties konnten nicht geladen werden.",
  "{account} hesabını kaldır": "Konto {account} entfernen",
  "Bağlantının süresi doldu": "Die Verbindung ist abgelaufen",
  "{account} hesabını yeniden bağla": "Konto {account} erneut verbinden",
  "Yeniden bağlan": "Erneut verbinden",
  "Bu hesabın görebildiği bir GA4 mülkü yok. Henüz mülk oluşturmadıysanız analytics.google.com'dan oluşturun, sonra bu hesabı ona Görüntüleyen olarak ekleyin.":
    "Dieses Konto sieht keine GA4-Property. Falls Sie noch keine erstellt haben, erstellen Sie sie unter analytics.google.com und fügen Sie dieses Konto dann als Betrachter hinzu.",
  "Bu hesabın görebildiği bir Search Console mülkü yok. Mülkü doğruladıysanız bu hesabı search.google.com/search-console adresinden kullanıcı olarak ekleyin.":
    "Dieses Konto sieht keine Search-Console-Property. Wenn Sie die Property bestätigt haben, fügen Sie dieses Konto unter search.google.com/search-console als Nutzer hinzu.",
  "Doğrulanmış erişim yok": "Kein bestätigter Zugriff",
  "Eşleşen mülk veya hesap yok": "Keine passenden Properties oder Konten",
  "Mülkleri bulmak için bir Google hesabı ekleyin.":
    "Fügen Sie ein Google-Konto hinzu, um Properties zu finden.",
  "Google hesabı ekle": "Google-Konto hinzufügen",
  "Kaydediliyor…": "Wird gespeichert…",
  "Mülkü kaydet": "Property speichern",
  "Sıradaki adımlar": "Nächste Schritte",
  "En hızlı kazandıracak işten başlayın.":
    "Beginnen Sie mit dem, was sich am schnellsten auszahlt.",
  "Acil bir iş görünmüyor. Denetim güncel ve kritik sorun yok.":
    "Nichts Dringendes. Das Audit ist aktuell und es gibt keine kritischen Probleme.",
  "Search Console'u bağlayın": "Search Console verbinden",
  "Hangi kelimede kaçıncı sırada olduğunuzu yalnızca Google bilir. Bağlantı ücretsiz.":
    "Nur Google weiß, wo Sie für jedes Keyword ranken. Die Verbindung ist kostenlos.",
  Bağla: "Verbinden",
  "İlk denetimi başlatın": "Führen Sie Ihr erstes Audit durch",
  "Sitenizi tarar, teknik sorunları önem sırasına göre listeler.":
    "Crawlt Ihre Website und listet technische Probleme nach Schweregrad auf.",
  Başlat: "Starten",
  "{count} kritik sorun var": {
    one: "{count} kritisches Problem",
    other: "{count} kritische Probleme",
  },
  "Kritik sorunlar Google'ın sayfayı taramasını ya da dizine almasını engelleyebilir.":
    "Kritische Probleme können Google daran hindern, eine Seite zu crawlen oder zu indexieren.",
  Gör: "Ansehen",
  "Fırsatlara bakın": "Chancen ansehen",
  "Sayfalarınız, sıralarına göre değil, üzerinde çalışmaya ne kadar değdiğine göre sıralı.":
    "Ihre Seiten, geordnet danach, wie lohnend die Arbeit an ihnen ist – nicht nach Position.",
  Aç: "Öffnen",
  "Denetimi tazeleyin": "Audit aktualisieren",
  "Son denetim {when}. Bu ekrandaki sayılar o denetimden geliyor.":
    "Das letzte Audit lief {when}. Die Zahlen auf diesem Bildschirm stammen daraus.",
  "{count} uyarı var": {
    one: "{count} Warnung",
    other: "{count} Warnungen",
  },
  "Kritik değil ama Google'ın sayfayı anlamasını zorlaştırıyor.":
    "Nicht kritisch, aber es macht die Seite für Google schwieriger zu verstehen.",
  "Sitenizi ekleyin": "Fügen Sie Ihre Website hinzu",
  "Bu proje için siteyi ve ülkeyi belirleyin.":
    "Legen Sie Website und Land für dieses Projekt fest.",
  "Başka sitelerinizi de ekleyin": "Fügen Sie Ihre anderen Websites hinzu",
  "Her site için ayrı proje açın.":
    "Erstellen Sie für jede Website ein separates Projekt.",
  "Yapay zeka ajanınızı bağlayın": "Verbinden Sie Ihren KI-Agenten",
  "seowatcher'ı Claude ya da tercih ettiğiniz ajanın içinden kullanın.":
    "Nutzen Sie seowatcher direkt in Claude oder in Ihrem bevorzugten Agenten.",
  "Gerçek tıklamalarınızı ve sorgularınızı buraya getirin.":
    "Holen Sie Ihre echten Klicks und Suchanfragen hierher.",
  "Projeyi anlatın": "Beschreiben Sie das Projekt",
  "Ajanınız ve raporlarınız siteyi tanısın.":
    "Helfen Sie Ihrem Agenten und Ihren Berichten, sich mit der Website vertraut zu machen.",
  "Tercihiniz kaydedilemedi. Tekrar deneyin.":
    "Ihre Auswahl konnte nicht gespeichert werden. Versuchen Sie es erneut.",
  "Kurulum listesi": "Einrichtungs-Checkliste",
  "Çalışma alanınızı kurun": "Richten Sie Ihren Arbeitsbereich ein",
  "Bir adım kaldı.": "Noch ein Schritt übrig.",
  "{count} adım kaldı.": {
    one: "{count} Schritt übrig.",
    other: "{count} Schritte übrig.",
  },
  "Hepsi isteğe bağlı, istediğiniz zaman dönebilirsiniz.":
    "Alles optional; Sie können jederzeit zurückkommen.",
  "Tek proje bana yeter": "Ein Projekt reicht mir",
  "Şimdilik geç": "Vorerst überspringen",
  "{count} adım sonraya bırakıldı": {
    one: "{count} Schritt verschoben",
    other: "{count} Schritte verschoben",
  },
  "{step} adımını geri al": "Schritt {step} wiederherstellen",
  "Geri al": "Wiederherstellen",
  "{count} tamamlandı": "{count} abgeschlossen",
  "Önceki döneme göre yüzde {percent} yüksek.":
    "{percent} % höher als im vorherigen Zeitraum.",
  "Önceki döneme göre yüzde {percent} düşük.":
    "{percent} % niedriger als im vorherigen Zeitraum.",
  "Aramada görünürlüğü doğrudan bozan sorunlar; önce bunlar.":
    "Probleme, die die Sichtbarkeit in der Suche direkt beeinträchtigen; beheben Sie diese zuerst.",
  "Sıralamayı zamanla aşındıran, ama acil olmayan sorunlar.":
    "Probleme, die das Ranking im Laufe der Zeit beeinträchtigen, aber nicht dringend sind.",
  "Küçük iyileştirme fırsatları.": "Kleine Verbesserungsmöglichkeiten.",
  "{count} kritik": "{count} kritisch",
  "{count} bilgi": "{count} Info",
  "{severity}: {count} bulgu. {hint}": {
    one: "{severity}: {count} Befund. {hint}",
    other: "{severity}: {count} Befunde. {hint}",
  },
  "Önem düzeyi": "Schweregrad",
  "Kritik sorunlar sayfanın aramada görünmesini engelleyebilir, uyarılar sıralamayı zamanla aşındırır, bilgi notları ise küçük iyileştirmelerdir. Çubuğa ya da altındaki etiketlerden birine tıklarsanız sorun listesine geçersiniz.":
    "Kritische Probleme können eine Seite aus der Suche fernhalten, Warnungen verschlechtern das Ranking mit der Zeit, und Info-Hinweise sind kleine Verbesserungen. Klicken Sie auf den Balken oder eine der Beschriftungen darunter, um die Problemliste zu öffnen.",
  "Son denetimin ne kadar eski olduğu okunamadı.":
    "Das Alter des letzten Audits konnte nicht ermittelt werden.",
  "Son denetimin üzerinden {count} gün geçti. Sitede değişiklik yaptıysanız yeni bir denetim başlatmak iyi olur.":
    {
      one: "Seit dem letzten Audit ist {count} Tag vergangen. Wenn Sie die Website geändert haben, lohnt sich ein neues Audit.",
      other:
        "Seit dem letzten Audit sind {count} Tage vergangen. Wenn Sie die Website geändert haben, lohnt sich ein neues Audit.",
    },
  "Denetimi başlat": "Audit starten",
  "Son denetimde yeni çıkanlar": "Neu im letzten Audit",
  "Yeni sorun yok.": "Keine neuen Probleme.",
  Düzelenler: "Behoben",
  "Düzelen sorun yok.": "Keine behobenen Probleme.",
  "{count} sayfa": {
    one: "{count} Seite",
    other: "{count} Seiten",
  },
  "Site denetimi": "Website-Audit",
  "Kırık bağlantılar, eksik etiketler ve dizine girme sorunları için sitenizi tarayın.":
    "Crawlen Sie Ihre Website, um defekte Links, fehlende Tags und Indexierungsprobleme zu finden.",
  "{count} sayfa tarandı · {date}": {
    one: "{count} Seite gecrawlt · {date}",
    other: "{count} Seiten gecrawlt · {date}",
  },
  "denetim sürüyor": "Audit läuft",
  "son denetim başarısız": "letztes Audit fehlgeschlagen",
  Ayrıntılar: "Details",
  "Denetim sürüyor, sonuçlar bittiğinde görünecek.":
    "Das Audit läuft; die Ergebnisse erscheinen nach Abschluss.",
  "Son denetim tamamlanamadı, bu yüzden sonuç yok.":
    "Das letzte Audit konnte nicht abgeschlossen werden, daher gibt es keine Ergebnisse.",
  "Sorun bulunamadı, siteniz sağlıklı görünüyor.":
    "Keine Probleme gefunden; Ihre Website sieht fehlerfrei aus.",
  "+ {count} sorun daha": {
    one: "+ {count} weiteres Problem",
    other: "+ {count} weitere Probleme",
  },
  "En çok sorunu olan sayfalar": "Seiten mit den meisten Problemen",
  "{count} sorun": {
    one: "{count} Problem",
    other: "{count} Probleme",
  },
  "Son {days} gün": "Letzte {days} Tage",
  "Search Console verisi alınamadı":
    "Search-Console-Daten konnten nicht geladen werden",
  "Bağlanınca görünür":
    "Wird angezeigt, sobald die Verbindung hergestellt wurde",
  "Bu dönemde gösterim yok": "Keine Impressionen in diesem Zeitraum",
  Tıklama: "Klicks",
  Gösterim: "Impressionen",
  "Tıklama oranı": "CTR",
  "Ortalama sıra": "Durchschnittliche Position",
  "{period} · düşük sayı daha iyi: 1, listenin en üstü demek":
    "{period} · niedriger ist besser: 1 ist der erste Platz der Liste",
  Panel: "Übersicht",
  "Panel yüklenemedi": "Die Übersicht konnte nicht geladen werden",
  "Denetim özeti yüklenemedi":
    "Die Audit-Zusammenfassung konnte nicht geladen werden",
  "Bu istemi ajanınıza yapıştırın; seowatcher'ı sizin için kendiliğinden kuracak.":
    "Fügen Sie diesen Prompt in Ihren Agenten ein; er richtet seowatcher für Sie ein.",
  "seowatcher eklentisi": "seowatcher-Plugin",
  "Ajan bağlantısı (MCP) ve hazır SEO görevleri":
    "Agent-Verbindung (MCP) und vorgefertigte SEO-Aufgaben",
  "Kurulum istemini kopyala": "Einrichtungs-Prompt kopieren",
  "Kurulum istemi kopyalandı": "Einrichtungs-Prompt kopiert",
  "Kurulumu elle yapın": "Manuell einrichten",
  "Ne sattığınız, kimi hedeflediğiniz ve hangi sayfaların para kazandırdığı burada duruyor. Rapor şablonları ve bağladığınız ajan bu bilgiyi okuyor; boşken ikisi de siteyi tanımadan yorum yapıyor.":
    "Hier erfassen Sie, was Sie verkaufen, wen Sie ansprechen und mit welchen Seiten Sie Geld verdienen. Berichtsvorlagen und Ihr verbundener Agent lesen diese Angaben; solange sie fehlen, kommentieren beide, ohne die Website zu kennen.",
  "Proje bilgisini doldurun": "Projektkontext ausfüllen",
  'Her sitenin araştırmasını, sıralamalarını ve bağlantılarını kendi projesinde tutun. Yan menüdeki proje değiştiriciden "Yeni proje" diyerek istediğiniz zaman ekleyebilirsiniz.':
    "Halten Sie Recherchen, Rankings und Verbindungen jeder Website in einem eigenen Projekt. Mit „Neues Projekt“ im Projektwechsler in der Seitenleiste können Sie jederzeit eines hinzufügen.",
  "Başka bir proje oluştur": "Weiteres Projekt erstellen",
  "Bir site listeniz mi var? Ajanınız hepsini kursun.":
    "Haben Sie eine Liste von Websites? Lassen Sie Ihren Agenten alle einrichten.",
  "{link}, sonra site listenizle birlikte bu istemi yapıştırın.":
    "{link} und fügen Sie dann diesen Prompt zusammen mit Ihrer Website-Liste ein.",
  "Ajanınızı bağlayın": "Agent verbinden",
  "Proje istemini kopyala": "Projekt-Prompt kopieren",
  "Proje istemi kopyalandı": "Projekt-Prompt kopiert",
  "Site kaydedildi": "Website gespeichert",
  "Siteniz kaydedilemedi. Tekrar deneyin.":
    "Ihre Website konnte nicht gespeichert werden. Versuchen Sie es erneut.",
  "Bu projenin sitesini ekleyin ve müşterilerinizin arama yaptığı ülkeyi seçin. İkisini de proje ayarlarından istediğiniz zaman değiştirebilirsiniz.":
    "Fügen Sie die Website dieses Projekts hinzu und wählen Sie das Land aus, in dem Ihre Kunden suchen. Sie können beides jederzeit in den Projekteinstellungen ändern.",
  "Site adresi": "Website-Adresse",
  "Siteyi kaydet": "Website speichern",
  "{count} oturum": { one: "{count} Sitzung", other: "{count} Sitzungen" },
  "Organik trafik": "Organischer Traffic",
  Raporlar: "Berichte",
  Yönet: "Verwalten",
  "Google Analytics verileri yüklenemedi.":
    "Google-Analytics-Daten konnten nicht geladen werden.",
  "Bu aralıkta organik arama trafiği kaydedilmemiş.":
    "In diesem Zeitraum wurde kein organischer Such-Traffic erfasst.",
  "Aktif kullanıcı": "Aktive Nutzer",
  Sipariş: "Transaktionen",
  "Gösterilecek oturum verisi yok.": "Keine Sitzungsdaten vorhanden.",
  "{days} günde toplam {total} oturum. En yüksek gün {day}, {peak} oturum.":
    "{total} Sitzungen in {days} Tagen. Spitzentag {day} mit {peak} Sitzungen.",
  "Kart gizlenemedi. Tekrar deneyin.":
    "Die Karte konnte nicht ausgeblendet werden. Versuchen Sie es erneut.",
  "Search Console ve Analytics aynı erişim anahtarını kullanır. Önce onu Ayarlar'a girin.":
    "Search Console und Analytics verwenden denselben Zugriffsschlüssel. Geben Sie ihn zuerst in den Einstellungen ein.",
  "Google erişim anahtarını Ayarlar'a girin":
    "Geben Sie den Google-Zugriffsschlüssel in den Einstellungen ein",
  "Tıklama eğilimi": "Klicktrend",
  "Sorguları aç": "Suchanfragen öffnen",
  "tıklama, son {days} gün": "Klicks, letzte {days} Tage",
  "önceki döneme göre": "vs. vorheriger Zeitraum",
  "Son {days} günde {total} tıklama.":
    "{total} Klicks in den letzten {days} Tagen.",
  "En yüksek gün {day}, {clicks} tıklama.":
    "Spitzentag {day} mit {clicks} Klicks.",
  tıklama: "Klicks",
  "Sıra 5-20 arası sorgular": "Suchanfragen auf Position 5–20",
  "Tümünü gör": "Alle anzeigen",
  "Şu an 5. ile 20. sıra arasında sorgu yok. Sorgular bu aralığa girdikçe burada listelenir.":
    "Im Moment liegen keine Suchanfragen zwischen den Positionen 5 und 20. Sie werden hier aufgelistet, sobald sie diesen Bereich betreten.",
  "{impressions} gösterim · sıra {position}":
    "{impressions} Impressionen · Position {position}",
  "seowatcher.io sitesini yeni sekmede aç":
    "seowatcher.io in einem neuen Tab öffnen",
  Duyurular: "Ankündigungen",
  "seowatcher ekibinden ürün, bakım ve güvenlik güncellemeleri.":
    "Produkt-, Wartungs- und Sicherheitsupdates vom seowatcher-Team.",
  "Duyurular şu anda alınamıyor": "Ankündigungen sind derzeit nicht verfügbar",
  "Duyurular alınamadı ({status})":
    "Ankündigungen konnten nicht geladen werden ({status})",
  "Bağlantınızı kontrol edip yeniden deneyin.":
    "Überprüfen Sie Ihre Verbindung und versuchen Sie es erneut.",
  "Şimdilik yeni duyuru yok": "Noch keine neuen Ankündigungen",
  "Yeni bir duyuru yayımlandığında burada görünecek.":
    "Neue Ankündigungen werden hier angezeigt, wenn sie veröffentlicht werden.",
  "Ürün yeniliği": "Produkt-Update",
  Bakım: "Wartung",
  Güvenlik: "Sicherheit",
  Yeni: "Neu",
  "Sıralama takibi": "Ranking-Verfolgung",
  Fırsatlar: "Chancen",
  "Kayıtlı kelimeler": "Gespeicherte Keywords",
  "Arama performansı": "Suchleistung",
  "Proje bilgisi": "Projektkontext",
  "Ajan kurulumu": "Agent-Einrichtung",
  Ajan: "Agent",
  "Arama ve site": "Suche und Website",
  "Kenar çubuğunu kapat": "Seitenleiste schließen",
  "Ana gezinme": "Hauptnavigation",
  Yardım: "Hilfe",
  Ayarlar: "Einstellungen",
  Kopyala: "Kopieren",
  "Pano kullanılamıyor": "Zwischenablage ist nicht verfügbar",
  "Panoya kopyalanamadı": "Kopieren in die Zwischenablage nicht möglich",
  Kopyalandı: "Kopiert",
  "Bir şeyler ters gitti. Lütfen yeniden deneyin.":
    "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
  "Yeniden dene": "Erneut versuchen",
  "Ana sayfa": "Startseite",
  "Geri dön": "Zurück",
  "Sayfa bulunamadı": "Seite nicht gefunden",
  "Bu adreste bir sayfa yok": "Unter dieser Adresse gibt es keine Seite",
  "Adres yanlış yazılmış ya da sayfa kaldırılmış olabilir. Panelden devam edebilir ya da Yardım'a bakabilirsiniz.":
    "Die Adresse ist möglicherweise falsch eingegeben, oder die Seite wurde entfernt. Sie können in der Übersicht weitermachen oder in der Hilfe nachsehen.",
  "Panele dön": "Zurück zur Übersicht",
  "{label} hakkında açıklama": "Info zu {label}",
  "Ülke: {country}": "Land: {country}",
  seçilmedi: "nicht ausgewählt",
  "Ülke seçin": "Land auswählen",
  "Ülke ara": "Länder durchsuchen",
  "“{query}” ile eşleşen ülke yok": "Kein Land entspricht „{query}“",
  arttı: "gestiegen",
  azaldı: "gesunken",
  Sürüyor: "In Bearbeitung",
  Tamamlandı: "Fertig",
  Uyarı: "Warnung",
  Hata: "Fehler",
  bekliyor: "wartet",
  "Bu bölüm yüklenemedi": "Dieser Abschnitt konnte nicht geladen werden",
  "Uygulamaya ulaşılamadı. Uygulamanın açık olduğunu kontrol edip yeniden deneyin.":
    "Die App ist nicht erreichbar. Prüfen Sie, ob sie läuft, und versuchen Sie es erneut.",
  Yenile: "Aktualisieren",
  Güncellendi: "Aktualisiert",
  "Güncellendi: {time}": "Aktualisiert {time}",
  Güncelleniyor: "Wird aktualisiert",
  "Giriş gerekli": "Anmeldung erforderlich",
  "Bu kurulum dışarıdan bir giriş korumasının arkasında. Sayfayı yenileyip tekrar deneyin.":
    "Diese Installation befindet sich hinter einer externen Anmeldung. Laden Sie die Seite neu und versuchen Sie es erneut.",
  "Seçimi kaldır": "Auswahl aufheben",
  "{total} {totalLabel}; en büyük pay {lead}, {share}.":
    "{total} {totalLabel}; der größte Anteil ist {lead}, {share}.",
  "{total} {totalLabel}.": "{total} {totalLabel}.",
  "Satırı seç: {name}": "Zeile auswählen: {name}",
  "Satırı seç": "Zeile auswählen",
  "Tüm satırları seç": "Alle Zeilen auswählen",
  "{count} satır panoya kopyalandı": {
    one: "{count} Zeile in die Zwischenablage kopiert",
    other: "{count} Zeilen in die Zwischenablage kopiert",
  },
  "Google E-Tablolar'da yeni bir dosya açıp yapıştırın.":
    "Öffnen Sie eine neue Datei in Google Tabellen und fügen Sie die Daten ein.",
  "Google E-Tablolar'da yeni dosya aç": "Neue Datei in Google Tabellen öffnen",
  "{label} sütununa göre sırala (şu an artan)":
    "Sortieren nach {label} (derzeit aufsteigend)",
  "{label} sütununa göre sırala (şu an azalan)":
    "Sortieren nach {label} (derzeit absteigend)",
  "{label} sütununa göre sırala": "Sortieren nach {label}",
  seçili: "ausgewählt",
  "Toplu işlemler": "Massenaktionen",
  "Seçili satırları dışa aktar": "Ausgewählte Zeilen exportieren",
  "Dışa aktar": "Exportieren",
  "Dışa aktarma seçenekleri": "Exportoptionen",
  "Sayfa başına satır": "Zeilen pro Seite",
  "Sayfa {page} / {total}": "Seite {page} von {total}",
  "Sayfa {page}": "Seite {page}",
  "Önceki sayfa": "Vorherige Seite",
  "Sonraki sayfa": "Nächste Seite",
  "Adresi kopyala": "URL kopieren",
  "Adres kopyalandı": "URL kopiert",
  "Oturumunuz doğrulanamadı. Sayfayı yenileyip tekrar deneyin.":
    "Ihre Sitzung konnte nicht überprüft werden. Laden Sie die Seite neu und versuchen Sie es erneut.",
  "Giriş ayarı eksik. Yardım ekranındaki kurulum belgelerine bakın.":
    "Die Anmeldung ist nicht konfiguriert. Sehen Sie sich die Einrichtungsanleitung auf dem Hilfebildschirm an.",
  "Bu işlem için yetkiniz yok.": "Sie haben keine Berechtigung dazu.",
  "Kayıt bulunamadı.": "Datensatz nicht gefunden.",
  "Şu an çok fazla denetim çalışıyor. Biri bitince yeniden deneyin.":
    "Derzeit laufen zu viele Audits. Versuchen Sie es erneut, wenn eines abgeschlossen ist.",
  "Bir denetim en çok {max} sayfa tarayabilir.":
    "Ein Audit kann maximal {max} Seiten crawlen.",
  "Aynı anda çalışabilecek denetim sayısına ulaştınız. Biri bitene kadar bekleyin ya da çalışan birini silin.":
    "Es laufen bereits so viele Audits gleichzeitig wie möglich. Warten Sie, bis eines abgeschlossen ist, oder löschen Sie ein laufendes.",
  "Girdiğiniz bilgileri kontrol edip tekrar deneyin.":
    "Überprüfen Sie, was Sie eingegeben haben, und versuchen Sie es erneut.",
  "Güvenlik nedeniyle bu adres taranamaz.":
    "Diese Adresse kann aus Sicherheitsgründen nicht gecrawlt werden.",
  "Çok fazla istek gönderildi. Biraz bekleyip tekrar deneyin.":
    "Zu viele Anfragen. Warten Sie einen Moment und versuchen Sie es erneut.",
  "Google bu isteği yanıtlamadı. Birazdan tekrar deneyin; sürerse Ayarlar'dan Google bağlantısını kontrol edin.":
    "Google hat auf diese Anfrage nicht geantwortet. Versuchen Sie es gleich noch einmal; wenn das Problem weiterhin besteht, prüfen Sie die Google-Verbindung in den Einstellungen.",
  "Bu, zaten var olan bir kayıtla çakışıyor.":
    "Dies steht in Konflikt mit einem vorhandenen Datensatz.",
  "Bir şeyler ters gitti. Yardım ekranından tanılama paketini indirip sorunu bildirin.":
    "Es ist ein Fehler aufgetreten. Laden Sie das Diagnosepaket vom Hilfebildschirm herunter und melden Sie das Problem.",
  "Dışa aktarılacak veri yok": "Es sind keine Daten zum Exportieren vorhanden",
  "Bir site adresi girin, örneğin example.com.":
    "Geben Sie eine Website-Adresse ein, zum Beispiel example.com.",
  "Bu bir site adresine benzemiyor.":
    "Das sieht nicht wie eine Website-Adresse aus.",
  "Geçerli bir alan adı girin, örneğin example.com.":
    "Geben Sie eine gültige Domain ein, zum Beispiel example.com.",
  "Bu tarayıcıda pano erişimi yok.":
    "Dieser Browser hat keinen Zugriff auf die Zwischenablage.",
  "Ana içeriğe geç": "Zum Hauptinhalt springen",
  "Kenar çubuğunu aç": "Seitenleiste öffnen",
  "Ana menü": "Hauptmenü",
  "Proje yüklenemedi": "Das Projekt konnte nicht geladen werden",
  "Proje bulunamadı": "Projekt nicht gefunden",
  "Bu proje silinmiş ya da arşivlenmiş olabilir.":
    "Dieses Projekt wurde möglicherweise gelöscht oder archiviert.",
  "Proje güncellendi": "Projekt aktualisiert",
  "Proje güncellenemedi": "Das Projekt konnte nicht aktualisiert werden",
  "Proje adı gerekli": "Ein Projektname ist erforderlich",
  "Temel bilgiler": "Grundlagen",

  Ad: "Name",
  "Yalnızca sizin içindir. Proje değiştiricide ve raporların başlığında görünür, Google'a gitmez.":
    "Nur für Sie. Er erscheint im Projektwechsler und in Berichtstiteln und wird nie an Google gesendet.",
  "Alan adı": "Domain",
  "(isteğe bağlı)": "(optional)",

  "Kaydettiğiniz anahtar kelimeler bu ülke ve dile göre saklanır.":
    "Keywords, die Sie speichern, werden für dieses Land und diese Sprache gespeichert.",
  "Değişiklikleri kaydet": "Änderungen speichern",
  "Proje arşivlendi": "Projekt archiviert",
  "Proje arşivlenemedi": "Das Projekt konnte nicht archiviert werden",
  "Projeyi arşivle": "Projekt archivieren",
  "Arşivlenen proje kenar çubuğundan kalkar ama hiçbir verisi silinmez. Denetimler, kelimeler ve raporlar durur, geri alınca aynen döner.":
    "Ein archiviertes Projekt verschwindet aus der Seitenleiste, aber keine seiner Daten werden gelöscht. Audits, Keywords und Berichte pausieren und kehren bei der Wiederherstellung unverändert zurück.",
  "{name} projesini arşivlerseniz çalışma alanınızdan kaldırılır. Daha sonra Projeler sayfasından geri alabilirsiniz.":
    "Durch die Archivierung von {name} wird es aus Ihrem Arbeitsbereich entfernt. Sie können es später über die Seite „Projekte“ wiederherstellen.",
  "Evet, projeyi arşivle": "Ja, Projekt archivieren",
  "Bu projeyi arşivleyerek çalışma alanınızdan kaldırabilirsiniz.":
    "Archivieren Sie dieses Projekt, um es aus Ihrem Arbeitsbereich zu entfernen.",
  "Tek projenizi arşivleyemezsiniz.":
    "Sie können Ihr einziges Projekt nicht archivieren.",
  "Proje değiştir": "Projekt wechseln",
  "Proje ayarları": "Projekteinstellungen",
  "Proje ara…": "Projekte suchen…",
  "Projeleri filtrele": "Projekte filtern",
  Projeler: "Projekte",
  "“{query}” ile eşleşen proje yok": "Kein Projekt entspricht „{query}“",
  "Yeni proje": "Neues Projekt",
  "Projeleri yönet": "Projekte verwalten",
  "Projeler yüklenemedi.": "Projekte konnten nicht geladen werden.",
  "Projeler yükleniyor": "Projekte werden geladen",
  "Proje seçin": "Projekt auswählen",
  "Proje oluşturuldu": "Projekt erstellt",
  "Proje oluşturulamadı": "Das Projekt konnte nicht erstellt werden",
  "Projeyi oluşturduktan sonra Search Console'u bağlayın; arama ve sıralama verileri oradan gelir.":
    "Verbinden Sie nach dem Erstellen des Projekts die Search Console. Such- und Rankingdaten stammen von dort.",
  "Kaydettiğiniz anahtar kelimeler bu ülke ve dile göre saklanır. Sonradan proje ayarlarından değiştirebilirsiniz.":
    "Keywords, die Sie speichern, werden für dieses Land und diese Sprache gespeichert. Sie können das später in den Projekteinstellungen ändern.",
  "Proje oluştur": "Projekt erstellen",
  Ülke: "Land",
  Dil: "Sprache",
  "Proje tanımı": "Projektdefinition",
  "{count} bölümün hepsi dolu.": {
    one: "{count} Abschnitt ist ausgefüllt.",
    other: "Alle {count} Abschnitte sind ausgefüllt.",
  },
  "{total} bölümün {filled} tanesi dolu. Boş olan: {missing}.":
    "{filled} von {total} Abschnitten ausgefüllt. Leer: {missing}.",
  "Gözden geçir": "Überprüfen",
  Doldur: "Ausfüllen",
  Rakipler: "Mitbewerber",
  "{count} rakip kayıtlı.": {
    one: "{count} Mitbewerber gespeichert.",
    other: "{count} Mitbewerber gespeichert.",
  },

  "Rakip ekle": "Mitbewerber hinzufügen",
  "Önemli sayfalar": "Schlüsselseiten",
  "{count} önemli sayfa kayıtlı.": {
    one: "{count} Schlüsselseite gespeichert.",
    other: "{count} Schlüsselseiten gespeichert.",
  },

  "Sayfa ekle": "Seite hinzufügen",

  "Bağlı değil. Sıralama, arama performansı ve fırsatlar bu bağlantıya dayanır.":
    "Nicht verbunden. Ranking-Verfolgung, Suchleistung und Chancen hängen von dieser Verbindung ab.",

  "PageSpeed anahtarı": "PageSpeed-Schlüssel",

  "Anahtar gir": "Schlüssel eingeben",
  "İşin özeti": "Geschäftsüberblick",
  "Şu anki hedef": "Aktuelles Ziel",
  Konumlandırma: "Positionierung",
  "Yazım tercihleri": "Schreibpräferenzen",
  "Ne satıyorsunuz, kim alıyor, nerede.":
    "Was Sie verkaufen, wer es kauft und wo.",
  "Şu anda neyin peşindesiniz ve ne zamana kadar.":
    "Was Sie gerade erreichen wollen und bis wann.",
  "Biri neden alternatifler yerine sizi seçsin.":
    "Warum jemand Sie den Alternativen vorziehen sollte.",
  "Üslup, kullanılmayacak kelimeler, girilmeyecek konular.":
    "Ton, zu vermeidende Wörter, Themen, von denen Sie sich fernhalten sollten.",
  "örn. Bağımsız restoranlar için rezervasyon yazılımı. Alıcılar pazarlamacı değil, işletme sahipleri.":
    "z. B. Buchungssoftware für unabhängige Restaurants. Die Käufer sind Inhaber, keine Marketingleute.",
  "örn. Dördüncü çeyreğe kadar organik üyelikleri ikiye katlamak. Karşılaştırma sayfaları şu anki öncelik.":
    "z. B. Organische Anmeldungen bis zum vierten Quartal verdoppeln. Vergleichsseiten haben derzeit Priorität.",
  "örn. Bir öğleden sonrada kurulan tek rezervasyon aracı. Mevcut rakiplerden ucuz, kendin yap çözümlerden basit.":
    "z. B. Das einzige Buchungstool, das Sie an einem Nachmittag einrichten. Günstiger als etablierte Anbieter, einfacher als Eigenbau.",
  "örn. Sade ve doğrudan, abartı yok. “Kusursuz” ya da “devrim niteliğinde” yazmayın. Rakip fiyatlarına girmeyin.":
    "z. B. Schlicht und direkt, kein Hype. Nicht „nahtlos“ oder „revolutionär“ schreiben. Nicht auf Preise der Konkurrenz eingehen.",

  "Proje bilgisi yüklenemedi": "Der Projektkontext konnte nicht geladen werden",
  "Henüz boş. Kendiniz doldurabilir ya da ajanınıza sitenizden taslak çıkarttırıp onaylayabilirsiniz.":
    "Vorerst leer. Füllen Sie es selbst aus, oder lassen Sie Ihren Agenten anhand Ihrer Website einen Entwurf erstellen und geben Sie ihn frei.",
  Boş: "Leer",
  "{count} bölüm kaydedilmedi": {
    one: "{count} Abschnitt nicht gespeichert",
    other: "{count} Abschnitte nicht gespeichert",
  },
  "Özel bölümler": "Benutzerdefinierte Abschnitte",
  "Bir ajanın not aldığı, yukarıdaki bölümlere sığmayan her şey.":
    "Alles, was ein Agent notiert hat und nicht in die obigen Abschnitte passt.",
  "Burada henüz bir şey yok. Ajanlar başka yere sığmayan önemli bir şey öğrendiklerinde buraya bir bölüm ekler.":
    "Hier ist noch nichts. Wenn Agenten etwas Wichtiges lernen, das nirgendwo anders hinpasst, fügen sie hier einen Abschnitt hinzu.",
  "{title} bölümünü düzenle": "Abschnitt {title} bearbeiten",
  "{title} bölümünü sil": "Abschnitt {title} löschen",
  "Bölüm başlığı": "Abschnittstitel",
  "Bölüm içeriği": "Abschnittsinhalt",
  "Merkez sayfa": "Hub-Seite",
  "Destek sayfası": "Unterstützende Seite",
  "Dönüşüm sayfası": "Conversion-Seite",
  "Sitenin en önemli sayfaları. Tam liste olması gerekmez.":
    "Die wichtigsten Seiten der Website. Es muss keine vollständige Liste sein.",
  "Henüz önemli sayfa yok. Sıralamada olması gereken birkaç sayfayı ekleyin, ya da bir ajan son site denetiminizden bunları önersin.":
    "Noch keine Schlüsselseiten. Fügen Sie einige Seiten hinzu, die ranken sollen, oder lassen Sie einen Agenten sie aus Ihrem letzten Website-Audit vorschlagen.",
  "Hedef: {topic}": "Ziel: {topic}",
  "{url} sayfasını düzenle": "Seite {url} bearbeiten",
  "{url} sayfasını kaldır": "Seite {url} entfernen",
  "Sayfa adresi": "Seiten-URL",
  "Sayfa rolü": "Seitenrolle",
  "Hedef konu (isteğe bağlı)": "Zielthema (optional)",
  "Hedef konu": "Zielthema",
  "Notlar (isteğe bağlı)": "Notizen (optional)",
  "Sayfa notları": "Seitennotizen",
  "Kendinizi kıyasladığınız siteler.":
    "Websites, mit denen Sie sich vergleichen.",
  "Henüz rakip yok. Rekabet ettiğiniz siteleri ekleyin, ya da bağladığınız ajandan bunları bulup buraya kaydetmesini isteyin.":
    "Noch keine Konkurrenten. Fügen Sie die Websites hinzu, mit denen Sie konkurrieren, oder bitten Sie Ihren verbundenen Agenten, sie zu finden und hier zu speichern.",
  "{domain} rakibini düzenle": "Mitbewerber {domain} bearbeiten",
  "{domain} rakibini kaldır": "Mitbewerber {domain} entfernen",
  "Rakip alan adı": "Mitbewerber-Domain",
  "Ad (isteğe bağlı)": "Name (optional)",
  "Rakip adı": "Name des Mitbewerbers",
  "Neden önemliler? Örn. her karşılaştırma aramasında önde (isteğe bağlı)":
    "Warum sind sie wichtig? Z. B. bei jeder Vergleichssuche vorn (optional)",
  "Rakip notları": "Mitbewerbernotizen",
  "Proje bilgisi güncellendi": "Projektkontext aktualisiert",
  "Değişiklikleriniz kaydedilemedi":
    "Ihre Änderungen konnten nicht gespeichert werden",
  siz: "Sie",
  ajan: "der Agent",
  "yapay zeka istemciniz": "Ihr KI-Client",
  "{author} güncelledi · {time}": "Aktualisiert von {author} · {time}",
  "{author} ekledi": "Hinzugefügt von {author}",
  Kaldır: "Entfernen",
  Kaydet: "Speichern",
  "Ajanınıza doldurtabilirsiniz": "Von Ihrem Agenten ausfüllen lassen",
  "Ajanınıza gözden geçirtin": "Von Ihrem Agenten überprüfen lassen",

  "İstemi kopyala": "Prompt kopieren",
  "İstem kopyalandı": "Prompt kopiert",
  "Araştırma günlüğü": "Rechercheprotokoll",

  "Henüz kayıt yok. Bağladığınız ajan bir araştırma yaptıkça buraya yazar.":
    "Noch keine Einträge. Ihr verbundener Agent schreibt hier, während er recherchiert.",
  "{date} tarihli kaydı sil": "Eintrag vom {date} löschen",
  "Kurulum durumu": "Einrichtungsstatus",

  Tamam: "Erledigt",
  Eksik: "Fehlt",
  "Kontrol ediliyor": "Wird geprüft",
  Denetlenemedi: "Prüfung nicht möglich",
  "Durum okunuyor…": "Status wird gelesen…",
  "Durum okunamadı. Yeniden deneyin.":
    "Der Status konnte nicht gelesen werden. Versuchen Sie es erneut.",
  "Şablona bir ad verin.": "Geben Sie der Vorlage einen Namen.",
  "Bu şablonun ne zaman kullanılacağını tek cümleyle yazın.":
    "Schreiben Sie in einem Satz, wann diese Vorlage verwendet werden soll.",
  "Raporun kime yazıldığını ve hangi bölümlerden oluştuğunu yazın.":
    "Schreiben Sie, für wen der Bericht bestimmt ist und welche Abschnitte er enthält.",
  "Kitle: müşterinin pazarlama sorumlusu, teknik biri değil.\nBölümler, sırayla: Neredeyiz / Bu ay ne yaptık / Ne değişti / Sırada ne var.\nÜslup: sade ve kendinden emin. Her SEO terimini açıkla. Ünlem kullanma.\nİmza: Acme SEO\nVurgu rengi: #1C4ED8":
    "Zielgruppe: die Marketingleitung des Kunden, keine technische Person.\nAbschnitte in dieser Reihenfolge: Wo wir stehen / Was wir diesen Monat getan haben / Was sich geändert hat / Wie es weitergeht.\nTon: schlicht und selbstbewusst. Jeden SEO-Begriff erklären. Keine Ausrufezeichen.\nSignatur: Acme SEO\nAkzentfarbe: #1C4ED8",
  "Şablon oluşturuldu": "Vorlage erstellt",
  "Şablon kaydedildi": "Vorlage gespeichert",
  "Şablon kaydedilemedi": "Vorlage konnte nicht gespeichert werden",
  "Şablonu düzenle": "Vorlage bearbeiten",
  "Yeni şablon": "Neue Vorlage",
  "Aylık müşteri değerlendirmesi": "Monatlicher Kundenbericht",
  Açıklama: "Beschreibung",
  "Ne zaman kullanılacağını anlatan tek cümle. Bir ajan kararını buna bakarak verir.":
    "Ein Satz zur Verwendung. Ein Agent entscheidet auf dieser Grundlage.",
  "Sürekli çalıştığımız müşterilere gönderdiğimiz aylık güncelleme.":
    "Das monatliche Update, das wir an unsere laufenden Kunden senden.",
  Yönerge: "Anweisungen",
  "Projenin geneline ait marka dili Proje bilgisi › Yazım tercihleri altında tutulur.":
    "Die Markenstimme für das gesamte Projekt finden Sie unter Projektkontext › Schreibpräferenzen.",
  "Şablon oluştur": "Vorlage erstellen",
  Rapor: "Berichte",
  "Son 7 gün": "Letzte 7 Tage",
  "Bu sürede güncellenen": "In diesem Zeitraum aktualisiert",
  "Son güncelleme": "Letzte Aktualisierung",
  "{date} · raporu aç": "{date} · Bericht öffnen",
  "Türe göre raporlar": "Berichte nach Typ",

  rapor: "Berichte",
  Belirtilmemiş: "Nicht angegeben",
  "Site denetimi raporu": "Website-Audit-Bericht",
  "SEO denetimi": "SEO-Audit",
  "Dönem karşılaştırması": "Zeitraumvergleich",
  "Trafik düşüşü incelemesi": "Analyse eines Traffic-Rückgangs",
  "SEO raporu": "SEO-Bericht",
  "Koçluk notu": "Coaching-Notiz",
  "Proje kurulumu": "Projekteinrichtung",
  "Diğer türler": "Sonstige Typen",
  Tümü: "Alle",

  "Henüz rapor yok": "Noch keine Berichte",

  "Rapor komutunu kopyala": "Berichts-Prompt kopieren",
  "Komut kopyalandı. Ajanınıza yapıştırın":
    "Prompt kopiert. Fügen Sie ihn in Ihren Agenten ein",

  "Raporlarda ara": "Berichte suchen",
  "Aramanıza uyan rapor yok": "Keine Berichte entsprechen Ihrer Suche",

  Tür: "Typ",
  Oluşturuldu: "Erstellt",
  Boyut: "Größe",
  İşlemler: "Aktionen",
  "{title} için işlemler": "Aktionen für {title}",
  Sil: "Löschen",

  "Henüz şablon yok": "Noch keine Vorlagen",
  "Şablon olmadan da rapor alabilirsiniz. Her seferinde aynı biçimde rapor istiyorsanız (örneğin yöneticiye aylık özet) sağ üstteki düğmeyle ilk şablonunuzu oluşturun.":
    "Sie können Berichte ohne Vorlage erhalten. Wenn Sie jedes Mal das gleiche Format wünschen (z. B. eine monatliche Zusammenfassung für Ihren Manager), erstellen Sie Ihre erste Vorlage mit der Schaltfläche oben rechts.",
  "{count} şablon": {
    one: "{count} Vorlage",
    other: "{count} Vorlagen",
  },
  "son güncelleme": "letzte Aktualisierung",
  "Şablonlarda ara": "Vorlagen suchen",
  "{name} şablonunu düzenle": "Vorlage {name} bearbeiten",
  Düzenle: "Bearbeiten",
  "Aramanıza uyan şablon yok": "Keine Vorlage passt zu Ihrer Suche",
  "Başka bir sözcükle deneyin.": "Versuchen Sie es mit einem anderen Wort.",
  "Nasıl çalışır?": "Wie funktioniert es?",
  "Ajanın yazdığı raporlar": "Berichte, die Ihr Agent schreibt",
  "Claude Code ya da Codex projenizi inceler ve raporu buraya kaydeder. “Rapor komutunu kopyala” ajanınıza yapıştıracağınız komutu kopyalar.":
    "Claude Code oder Codex prüft Ihr Projekt und speichert den Bericht hier. „Berichts-Prompt kopieren“ kopiert den Prompt, den Sie in Ihren Agenten einfügen.",
  "Site denetimi ekranındaki “Raporu indir” hem bilgisayarınıza indirir hem burada saklar. Ajan gerekmez.":
    "„Bericht herunterladen“ auf dem Bildschirm „Website-Audit“ lädt ihn auf Ihren Computer herunter und bewahrt ihn hier auf. Kein Agent erforderlich.",
  "Rapor önizlemesi: {title}": "Berichtsvorschau: {title}",
  "HTML olarak indir": "Als HTML herunterladen",
  "Tam ekrandan çık": "Vollbild beenden",
  İndir: "Herunterladen",
  "Rapor indirildi": "Bericht heruntergeladen",
  "Rapor indirilemedi.": "Der Bericht konnte nicht heruntergeladen werden.",
  "Rapor silindi": "Bericht gelöscht",
  "Rapor silinemedi": "Der Bericht konnte nicht gelöscht werden",
  "“{title}” silinsin mi?": "„{title}“ löschen?",
  "Bu geri alınamaz.": "Dies kann nicht rückgängig gemacht werden.",
  "Raporu sil": "Bericht löschen",

  "Sıra {band}": "Position {band}",

  "Sıraya göre hızlı filtreler": "Schnellfilter nach Position",
  "İlk 10": "Top 10",
  "Ortalama sırası 10 veya daha iyi olan kelimeler; yani Google'ın ilk sayfası.":
    "Keywords mit einer durchschnittlichen Position von 10 oder besser; das heißt, die erste Seite von Google.",
  "Ortalama sırası 11 ile 20 arasında olanlar, yani ikinci sayfadakiler. Küçük bir iyileştirme ilk sayfaya taşıyabilir.":
    "Keywords mit einer durchschnittlichen Position zwischen 11 und 20, also auf der zweiten Seite. Eine kleine Verbesserung kann sie auf die erste Seite verschieben.",
  "Sıra dağılımı": "Positionsverteilung",

  kelime: "Keywords",
  Bilgi: "Info",
  Ticari: "Kommerziell",
  İşlem: "Transaktional",
  Gezinme: "Navigationsbezogen",
  "Bilgi amaçlı": "Informativ",
  "Ticari araştırma": "Kommerzielle Recherche",
  "İşlem odaklı": "Transaktional",
  Yönlendirici: "Navigationsbezogen",
  Bilinmiyor: "Unbekannt",
  "Arayan kişi bilgi ya da cevap arıyor. Eğitici içerikler, rehberler ve sade açıklayıcı yazılar için uygun.":
    "Der Suchende möchte Informationen oder eine Antwort. Passt zu Bildungsinhalten, Leitfäden und einfachen Erklärungen.",
  "Arayan kişi satın almadan önce seçenekleri inceliyor. Karşılaştırma, alternatif ve ürün sayfaları bu aramaya uyar.":
    "Der Suchende wägt vor dem Kauf Optionen ab. Vergleichs-, Alternativen- und Produktseiten passen zu dieser Suche.",
  "Arayan kişi bir eylemi, çoğunlukla satın almayı tamamlamaya hazır. Net teklifleri, fiyatları, denemeleri ve dönüşüm yollarını öne çıkarın.":
    "Der Suchende ist bereit zu handeln, meist zu kaufen. Stellen Sie klare Angebote, Preise, Testversionen und Conversion-Pfade in den Vordergrund.",
  "Arayan kişi belirli bir siteyi, markayı ya da sayfayı arıyor. Bu aramalarda beklenen siteyle birebir eşleşen sayfa öne çıkar.":
    "Der Suchende sucht nach einer bestimmten Website, Marke oder Seite. Bei diesen Suchvorgängen steht die Seite, die genau mit der erwarteten Website übereinstimmt, an erster Stelle.",
  "Bu kelime için arama amacı bilinmiyor; içerik kararlarınızı yalnızca bu rozete bakarak vermeyin.":
    "Die Suchabsicht für dieses Keyword ist unbekannt; treffen Sie Inhaltsentscheidungen nicht allein anhand dieser Kennzeichnung.",
  "Arama amacı bilinmiyor": "Suchabsicht unbekannt",
  "{intent} arama amacı": "Suchabsicht: {intent}",
  "Etiketleri güncelle": "Tags aktualisieren",
  "Seçili {count} kelimeye etiket ekleyin ya da bunlardan etiket kaldırın.": {
    one: "Fügen Sie dem {count} ausgewählten Keyword Tags hinzu oder entfernen Sie Tags davon.",
    other:
      "Fügen Sie den {count} ausgewählten Keywords Tags hinzu oder entfernen Sie Tags davon.",
  },
  "Etiket ekle": "Tags hinzufügen",
  "Etiket kaldır": "Tags entfernen",
  "Seçimden çıkar": "Aus Auswahl entfernen",
  "Etiket ara": "Tags suchen",
  "Ara ya da oluştur…": "Suchen oder erstellen…",
  "Oluştur {name}": "{name} erstellen",
  "Henüz etiket yok. Yukarıya bir ad yazıp oluşturun.":
    "Noch keine Tags. Geben Sie oben einen Namen ein, um einen zu erstellen.",
  "Bu aramaya uyan etiket yok.": "Keine Tags stimmen mit dieser Suche überein.",
  "Seçili kelimelerde kaldırılacak etiket yok.":
    "Die ausgewählten Keywords haben keine Tags zum Entfernen.",
  Kaldırılacak: "Wird entfernt",
  "Kaldırmak için tıklayın": "Zum Entfernen anklicken",
  "Seçili kelimelerden {count} etiket kaldırılacak.": {
    one: "{count} Tag wird von den ausgewählten Keywords entfernt.",
    other: "{count} Tags werden von den ausgewählten Keywords entfernt.",
  },
  Uygula: "Anwenden",
  Kelime: "Keyword",

  Amaç: "Absicht",
  Etiketler: "Tags",
  Eklenme: "Hinzugefügt",
  "Kelimeyi kopyala": "Keyword kopieren",
  "Kelime kopyalandı": "Keyword kopiert",

  "Kelimeyi sil": "Keyword löschen",
  "Bu filtrelere uyan kelime yok": "Keine Keywords entsprechen diesen Filtern",
  "Filtreleri gevşetin ya da temizleyin.":
    "Lockern oder löschen Sie die Filter.",
  "Henüz kayıtlı kelime yok": "Noch keine gespeicherten Keywords",
  "Arama performansı ekranında bir ya da birkaç sorguyu seçip “Kelime olarak kaydet” deyin. Kaydettikleriniz burada etiketlenir, sıralamayla birlikte listelenir ve dışa aktarılır.":
    "Wählen Sie auf dem Bildschirm „Suchleistung“ eine oder mehrere Suchanfragen aus und klicken Sie auf „Als Keyword speichern“. Was Sie speichern, wird hier mit Tags versehen, mit seiner Position aufgelistet und kann exportiert werden.",
  "Search Console'u bağla": "Search Console verbinden",
  "Sorgulara göz at": "Suchanfragen durchsuchen",
  "Sonuçları filtrele": "Ergebnisse filtern",
  "{count} etkin": "{count} aktiv",
  "Tümünü temizle": "Alle entfernen",
  İçeren: "Enthält",
  "örn. denetim": "z. B. Audit",
  İçermeyen: "Enthält nicht",
  "örn. iş ilanı": "z. B. Stellenanzeige",
  "{term} terimini kaldır": "Begriff {term} entfernen",
  Gri: "Grau",
  Pembe: "Rosa",
  Turuncu: "Orange",
  "Fıstık yeşili": "Limette",
  Yeşil: "Grün",
  Mavi: "Blau",
  Mor: "Lila",
  Fuşya: "Fuchsia",
  "Yeniden adlandır": "Umbenennen",
  Renk: "Farbe",
  "Etiket kalıcı olarak silinir. Kelimelere dokunulmaz.":
    "Das Tag wird dauerhaft gelöscht. Keywords sind nicht betroffen.",
  "Etiketi sil": "Tag löschen",
  "Filtreyi kaldır": "Filter löschen",
  Temizle: "Löschen",
  "Etiket ara…": "Tags suchen…",
  "Aramayı temizle": "Suche löschen",
  "Henüz etiket yok. Kelimeleri seçip etiket ekleyin.":
    "Noch keine Tags. Wählen Sie Keywords aus und fügen Sie Tags hinzu.",
  "{count} seçili": "{count} ausgewählt",
  "{name} etiketini yönet": "Tag {name} verwalten",
  "Etiket güncellendi": "Tag aktualisiert",
  "Etiket artık yok. Liste yenilendi.":
    "Das Tag existiert nicht mehr. Die Liste wurde aktualisiert.",
  "Etiket güncellenemedi": "Das Tag konnte nicht aktualisiert werden",
  "Etiket zaten silinmiş. Liste yenilendi.":
    "Das Tag wurde bereits gelöscht. Die Liste wurde aktualisiert.",
  "Etiket silindi": "Tag gelöscht",
  "Etiket silinemedi": "Tag konnte nicht gelöscht werden",
  "Dışa aktarılacak kelime yok":
    "Es sind keine Keywords zum Exportieren vorhanden",
  "CSV dışa aktarılamadı": "CSV konnte nicht exportiert werden",
  "E-Tablolar'a aktarılamadı": "Export nach Google Tabellen nicht möglich",
  "{count} kelime kaldırıldı": {
    one: "{count} Keyword entfernt",
    other: "{count} Keywords entfernt",
  },
  "Kelimeler kaldırılamadı": "Die Keywords konnten nicht entfernt werden",
  "{count} kelimenin etiketleri güncellendi": {
    one: "Tags für {count} Keyword aktualisiert",
    other: "Tags für {count} Keywords aktualisiert",
  },
  "Etiketler güncellenemedi": "Die Tags konnten nicht aktualisiert werden",
  "Kelime silinsin mi?": "Keyword löschen?",
  "Kelimeler silinsin mi?": "Keywords löschen?",
  "{keyword} kalıcı olarak silinir. İsterseniz Arama performansından yeniden kaydedebilirsiniz.":
    "{keyword} wird dauerhaft gelöscht. Sie können es unter Suchleistung erneut speichern.",
  "Kayıtlı {count} kelime kalıcı olarak silinecek. Bu geri alınamaz.": {
    one: "{count} gespeichertes Keyword wird dauerhaft gelöscht. Dies kann nicht rückgängig gemacht werden.",
    other:
      "{count} gespeicherte Keywords werden dauerhaft gelöscht. Dies kann nicht rückgängig gemacht werden.",
  },
  "Kelimeler silinemedi. Tekrar deneyin.":
    "Die Keywords konnten nicht gelöscht werden. Versuchen Sie es erneut.",
  "{count} kelimeyi sil": {
    one: "{count} Keyword löschen",
    other: "{count} Keywords löschen",
  },

  "E-Tablolar'a aktar": "Nach Google Tabellen exportieren",
  "CSV indir": "CSV herunterladen",
  "Tablo filtrelerini aç/kapat": "Tabellenfilter anzeigen oder ausblenden",
  Filtreler: "Filter",
  Etiketle: "Tags vergeben",
  "Kelimeleri kopyala": "Keywords kopieren",
  "Nerede durduğunuzu anlatır ve sıradaki adımı seçer.":
    "Erklärt, wo Sie stehen, und wählt den nächsten Schritt.",
  "Hedeflerinizi, rakiplerinizi ve önemli sayfalarınızı bir kez kaydeder; diğer beceriler bunu hep bilir.":
    "Speichert Ihre Ziele, Mitbewerber und Schlüsselseiten einmalig; die anderen Skills kennen sie dann immer.",
  "Sitenizi denetler ve bu hafta yapılacak tek bir işi öne çıkarır.":
    "Prüft Ihre Website und schlägt die eine Sache vor, die diese Woche zu tun ist.",
  "Bu dönemi öncekiyle karşılaştırır. Ne değişti, ne zaman değişti, önemli mi, söyler.":
    "Vergleicht diesen Zeitraum mit dem letzten. Gibt an, was sich wann geändert hat und ob es wichtig ist.",
  "Trafik düştüyse önce şuna bakar. Düşüş gerçek mi, nerede ve ne zaman oldu?":
    "Wenn der Traffic gesunken ist, prüft er das zuerst: Ist der Rückgang echt, wo ist er passiert und wann?",
  "Yukarıdakilerden birinin sonucunu Raporlar sayfasına kaydeder.":
    "Speichert das Ergebnis jedes der obigen Skills auf der Seite „Berichte“.",
  "Ajanınızı kurun": "Agent einrichten",
  Beceriler: "Skills",
  "seowatcher'ı yapay zeka ajanınızla kullanabilirsiniz. Bir kez bağlayın, sonra ne istiyorsanız ona sorun.":
    "Sie können seowatcher mit Ihrem KI-Agenten nutzen. Verbinden Sie ihn einmal und fragen Sie ihn dann, was Sie brauchen.",
  "Durum okunamadı": "Status konnte nicht gelesen werden",
  Bağlandı: "Verbunden",
  "{client} · son çağrı {time}": "{client} · letzter Aufruf {time}",
  "Bir ajan": "Ein Agent",
  "Henüz bağlanmadı": "Noch nicht verbunden",
  "Kurulum adımları yükleniyor": "Einrichtungsschritte werden geladen",
  "Becerileri güncelleyin": "Skills aktualisieren",
  "Ajanınızı daha önce kurduysanız güncelleme komutunu yapıştırın. Beceriler yenilenir, bağlantı ayarlarınız ve kendi düzenlemeleriniz olduğu gibi kalır.":
    "Wenn Sie Ihren Agenten bereits eingerichtet haben, fügen Sie den Update-Prompt ein. Die Skills werden aktualisiert; Ihre Verbindungseinstellungen und eigenen Änderungen bleiben unverändert.",
  "Güncelleme komutunu kopyala": "Update-Befehl kopieren",
  "Güncelleme komutu kopyalandı": "Updatebefehl kopiert",
  "Bu kurulum Cloudflare Access arkasında. Ajanın bağlanabilmesi için Access uygulamanızda Managed OAuth'u açın.":
    "Diese Installation befindet sich hinter Cloudflare Access. Aktivieren Sie Managed OAuth in Ihrer Access-Anwendung, damit der Agent eine Verbindung herstellen kann.",
  "Elle bağlamak istiyorsanız": "Manuell verbinden",
  "Bu kurulumun MCP adresi:": "Die MCP-Adresse dieser Installation:",
  "MCP adresi kopyalandı": "MCP-Adresse kopiert",
  "Bu adres {token} ile, yani bir parola (token) ile korunuyor. Aracınıza şu başlığı ekletin:":
    "Diese Adresse ist durch {token}, ein Passwort (Token), geschützt. Lassen Sie Ihr Tool diesen Header senden:",
  "Windows paketinde parola bir dosyadır (görev çubuğu menüsünde {menu}):":
    "Im Windows-Paket ist das Passwort eine Datei ({menu} im Infobereichsmenü):",
  "Veri klasörünü aç": "Datenordner öffnen",
  "Panoya kopyalamak için PowerShell (değer ekrana yazılmaz):":
    "So kopieren Sie es in PowerShell in die Zwischenablage (der Wert wird nicht ausgegeben):",
  "Değeri sohbete ya da ekrana yazmayın. Yapıştırdıktan sonra panoyu temizleyin (Win+V, Tümünü temizle).":
    "Geben Sie den Wert nicht in einen Chat ein und zeigen Sie ihn nicht auf dem Bildschirm an. Leeren Sie die Zwischenablage nach dem Einfügen (Win+V, Alles löschen).",

  "Windows'ta Git Bash için komutun başına {prefix} ekleyin, yoksa parola boş çıkar (PowerShell'de bu önek hata verir).":
    "Fügen Sie in Git Bash unter Windows {prefix} vor dem Befehl ein, sonst bleibt das Passwort leer (in PowerShell verursacht dieses Präfix einen Fehler).",
  "Bu adres parola istemez. Bilgisayarınızdaki başka bir programın araçları çalıştırmasını önlemek için {token} adıyla bir parola ayarlayın ve aracınıza şu başlığı ekletin:":
    "Diese Adresse verlangt kein Passwort. Um zu verhindern, dass andere Programme auf Ihrem Computer die Tools ausführen, legen Sie ein Passwort mit dem Namen {token} fest und lassen Sie Ihr Tool diesen Header senden:",
  "Kurulum komutu bunları kurar. Kısa cevap yerine tam bir çıktı istiyorsanız beceriyi adıyla çağırın.":
    "Der Einrichtungs-Prompt installiert diese. Wenn Sie statt einer kurzen Antwort eine vollständige Ausgabe möchten, rufen Sie den Skill mit seinem Namen auf.",
  "{name} adını kopyala": "Namen {name} kopieren",
  "Beceri adı kopyalandı": "Skill-Name kopiert",
  "Bir şey ters giderse önce aşağıdaki duruma bakın. Çözüm çoğu zaman satırın yanındaki düğmededir.":
    "Wenn etwas nicht funktioniert, prüfen Sie zuerst den Status unten. Die Lösung ist meist die Schaltfläche neben der Zeile.",
  Günlükler: "Protokolle",
  "Konteyner günlüğü": "Containerprotokoll",
  "Kurulum türü anlaşılıyor. Günlüklerin yeri birazdan burada görünür.":
    "Installationstyp wird ermittelt. Wo sich die Protokolle befinden, erscheint hier in Kürze.",
  "Görev çubuğundaki seowatcher simgesine sağ tıklayıp {menu} deyin. Açılış kontrolleri {launcherLog}, sunucu satırları {serverLog} dosyasındadır.":
    "Klicken Sie mit der rechten Maustaste auf das seowatcher-Symbol im Infobereich und wählen Sie {menu}. Startprüfungen stehen in {launcherLog}, Servermeldungen in {serverLog}.",
  "Günlükleri aç": "Protokolle öffnen",
  "Açılış kontrolleri uygulama başlamadan önce yazılır. Komut:":
    "Startprüfungen werden vor dem Start der App geschrieben. Befehl:",
  "Komutu kopyala": "Befehl kopieren",
  "Komut kopyalandı": "Befehl kopiert",
  "Sağlık adresi:": "Health-Endpunkt:",
  "{link} hangi bağlantıların ayarlı olduğunu ve veritabanının yanıt verip vermediğini gösterir.":
    "{link} zeigt an, welche Verbindungen konfiguriert sind und ob die Datenbank antwortet.",
  "Kurulum belgeleri": "Einrichtungsdokumentation",
  "Windows paketi, Docker, Search Console, Analytics ve PageSpeed kurulumu kılavuzda anlatılıyor. Üstteki “{button}” düğmesi sizi oraya götürür.":
    "Die Anleitung erklärt die Einrichtung des Windows-Pakets, von Docker, Search Console, Analytics und PageSpeed. Über die Schaltfläche „{button}“ oben gelangen Sie dorthin.",
  "Kılavuzu aç": "Anleitung öffnen",
  "Sorun bildirmek için": "Ein Problem melden",
  "Üstteki “{download}” düğmesi tek bir arşiv indirir. İçinde sürüm, kurulum kontrolleri, tablo büyüklükleri, bağlı Google mülkleri, son denetimlerin durumu ve bu sekmede yakalanan tarayıcı hataları var. Gizli değer yok. Parolalar ve anahtarlar toplanmaz, yalnızca ayarlı olup olmadıkları yazılır. Kısa bir not yeterliyse durum panelindeki “{summary}” düğmesi aynı özeti metin olarak verir. Arşivdeki {readme} içindekileri ve sizi tanımlayan şeyleri satır satır anlatır.":
    "Mit der Schaltfläche „{download}“ oben laden Sie ein einzelnes Archiv herunter. Es enthält die Version, Installationsprüfungen, Tabellengrößen, verbundene Google-Properties, den Status der letzten Audits und in diesem Tab erfasste Browserfehler. Keine geheimen Werte: Passwörter und Schlüssel werden nicht erfasst, nur ob sie festgelegt sind. Wenn eine kurze Notiz genügt, liefert die Schaltfläche „{summary}“ im Statusbereich dieselbe Zusammenfassung als Text. Die {readme} im Archiv erklärt Zeile für Zeile, was darin enthalten ist und was Sie identifizieren könnte.",
  "Tanılama paketi indir": "Diagnosepaket herunterladen",
  "Özeti kopyala": "Zusammenfassung kopieren",
  "Proje GitHub'da": "Projekt auf GitHub",

  "Henüz proje yok": "Noch keine Projekte",
  "Bir proje oluşturun, sonra sitesini ekleyin.":
    "Erstellen Sie ein Projekt und fügen Sie dann seine Website hinzu.",

  "Site eklenmedi": "Keine Website hinzugefügt",
  "Site ekle": "Website hinzufügen",
  "Proje geri alındı": "Projekt wiederhergestellt",
  "Proje geri alınamadı": "Projekt konnte nicht wiederhergestellt werden",
  Arşivlendi: "Archiviert",
  "Arşivlenen projeler yüklenemedi":
    "Archivierte Projekte konnten nicht geladen werden",
  "Bu çalışma alanına girişiniz doğrulanamadı.":
    "Ihr Zugriff auf diesen Arbeitsbereich konnte nicht überprüft werden.",
  "Bir şeyler ters gitti. Yardım ekranındaki günlüklere bakın.":
    "Es ist ein Fehler aufgetreten. Überprüfen Sie die Protokolle auf dem Hilfebildschirm.",
  "Bu denetim bulunamadı. Silinmiş olabilir.":
    "Dieses Audit wurde nicht gefunden. Möglicherweise wurde es gelöscht.",
  "Denetime bağlanılamadı": "Das Audit konnte nicht geladen werden",
  "Tüm denetimler": "Alle Audits",
  "Site denetimi · {time}": "Website-Audit · {time}",
  "Denetim bu siteyi tamamen tarayamadı.":
    "Das Audit konnte diese Website nicht vollständig crawlen.",
  "Sitenin bot koruması tarayıcımızı engelledi ve şu an aşmanın bir yolu yok. Bilgisayarınızda çalışan masaüstü tarayıcılar genelde geçer. Şunları deneyin: {libreCrawl} (ücretsiz, açık kaynak) ya da {screamingFrog} (500 adrese kadar ücretsiz).":
    "Der Bot-Schutz der Website hat unseren Crawler blockiert, und derzeit gibt es keinen Weg daran vorbei. Desktop-Crawler, die auf Ihrem Computer laufen, kommen meist durch. Versuchen Sie {libreCrawl} (kostenlos, Open Source) oder {screamingFrog} (kostenlos bis 500 URLs).",
  "Denetim {count} sayfadan sonra erken durdu.": {
    one: "Das Audit wurde nach {count} Seite vorzeitig beendet.",
    other: "Das Audit wurde nach {count} Seiten vorzeitig beendet.",
  },
  "Aşağıdaki sonuçlar, tarama durmadan önce bakılan her şeyi içerir. Yeniden denemek için yeni bir denetim başlatın. Yine olursa Yardım'dan tanılama paketini indirip sorunu bildirin.":
    "Die Ergebnisse unten umfassen alles, was vor dem Abbruch des Crawls geprüft wurde. Starten Sie ein neues Audit, um es erneut zu versuchen. Passiert es wieder, laden Sie unter „Hilfe“ das Diagnosepaket herunter und melden Sie das Problem.",
  "Denetim sonuçları yüklenemedi":
    "Die Audit-Ergebnisse konnten nicht geladen werden",
  "Bu rapor bulunamadı. Silinmiş olabilir ya da başka bir projeye ait olabilir.":
    "Dieser Bericht wurde nicht gefunden. Möglicherweise wurde er gelöscht oder gehört zu einem anderen Projekt.",
  "Rapor yüklenemedi": "Der Bericht konnte nicht geladen werden",
  Oluşturan: "Erstellt von",
  "PDF olarak kaydet (yazdır)": "Als PDF speichern (drucken)",
  "Yeni sekmede aç": "In neuem Tab öffnen",
  "Diğer işlemler": "Weitere Aktionen",
  "Tam ekran": "Vollbild",
  "Bağlantı kopyalanamadı": "Der Link konnte nicht kopiert werden",
  "Bağlantı kopyalandı": "Link kopiert",
  "Bağlantıyı kopyala": "Link kopieren",
  "Hazırlanan raporlar. Her raporu açabilir, indirebilir ya da silebilirsiniz.":
    "Erstellte Berichte. Sie können jeden öffnen, herunterladen oder löschen.",
  Şablonlar: "Vorlagen",
  "Raporlar yüklenemedi": "Berichte konnten nicht geladen werden",
  "Şablon silindi": "Vorlage gelöscht",
  "Şablon silinemedi": "Vorlage konnte nicht gelöscht werden",
  "Rapor şablonları": "Berichtsvorlagen",
  "Şablon, ajanınıza raporu nasıl yazacağını söyler. Kim okuyacak, hangi bölümler olacak, hangi dilde yazılacak, hepsi burada durur. Ajan rapor yazarken uygun olanı seçer.":
    "Eine Vorlage sagt Ihrem Agenten, wie er einen Bericht schreiben soll: wer ihn liest, welche Abschnitte er hat und in welcher Sprache er verfasst ist. Beim Schreiben eines Berichts wählt der Agent die passende Vorlage.",
  "Şablonlar yüklenemedi": "Vorlagen konnten nicht geladen werden",
  "Bu şablondan üretilmiş raporlar etkilenmez.":
    "Berichte, die mit dieser Vorlage erstellt wurden, sind nicht betroffen.",
  "Şablonu sil": "Vorlage löschen",
  "Bu rapor yok ya da erişiminiz bulunmuyor.":
    "Dieser Bericht existiert nicht oder Sie haben keinen Zugriff darauf.",
  "Bu raporu okumak için oturum açın.":
    "Melden Sie sich an, um diesen Bericht zu lesen.",
  "Bu proje arşivde, bu yüzden raporları gizli. Okumak için {name} projesini geri alın.":
    "Dieses Projekt ist archiviert, sodass seine Berichte ausgeblendet sind. Stellen Sie {name} wieder her, um sie lesen zu können.",
  "Kayıtlı kelimeler yüklenemedi":
    "Gespeicherte Keywords konnten nicht geladen werden",
  "{count} kelime kopyalandı": {
    one: "{count} Keyword kopiert",
    other: "{count} Keywords kopiert",
  },

  Genel: "Allgemein",
  "Ayar bölümleri": "Einstellungsbereiche",
  "Projeler yüklenemedi": "Projekte konnten nicht geladen werden",
  Bitti: "Fertig",
  Başarısız: "Fehlgeschlagen",
  "Sitenizde düzeltmeniz gereken her şey, önem sırasına göre. Bir satıra tıklayın. Neden önemli olduğunu, nasıl düzelteceğinizi ve hangi sayfaların etkilendiğini adresleriyle görürsünüz.":
    "Alles auf Ihrer Website, was behoben werden muss, das Wichtigste zuerst. Klicken Sie auf eine Zeile, um zu sehen, warum es wichtig ist, wie Sie es beheben und welche Seiten betroffen sind – mit Adressen.",
  "Taranan her sayfa ve sunucunun ona verdiği yanıt. Hatalı, yavaş ya da derinde kalmış sayfaları buradan bulun.":
    "Jede gecrawlte Seite und wie der Server darauf reagiert hat. Finden Sie hier fehlerhafte, langsame oder tief vergrabene Seiten.",
  "Google bu sayfaları gerçekten dizinine almış mı? Almadıysa nedenini burada görürsünüz.":
    "Hat Google diese Seiten tatsächlich indexiert? Wenn nicht, sehen Sie hier den Grund.",
  "Sayfalarınız telefonda ve bilgisayarda ne kadar hızlı açılıyor? Ölçüm, Google'ın kullandığı Lighthouse ile yapılır.":
    "Wie schnell werden Ihre Seiten auf Telefonen und Computern geladen? Gemessen mit Lighthouse, dem Tool, das Google verwendet.",
  "Rapor oluşturulamadı": "Der Bericht konnte nicht erstellt werden",
  "Raporu indir": "Bericht herunterladen",
  "{count} {band}": "{count} {band}",
  "Mobilde ölçülen {measured} sayfadan {parts}.":
    "Von {measured} Seiten, die auf Mobilgeräten gemessen wurden: {parts}.",
  Kritik: "Kritisch",
  "Sitenizi tarar, bulduğu sorunları önem sırasına göre sıralar.":
    "Crawlt Ihre Website und ordnet die gefundenen Probleme nach Wichtigkeit.",
  Kotalar: "Kontingente",
  "Güncel durum": "Aktueller Status",
  '"{url}" denetimi silinsin mi?': "Audit von „{url}“ löschen?",
  "{date} · {count} sayfa. Denetimin sayfaları, sorunları ve hız ölçümleri de silinir. Bu geri alınamaz.":
    {
      one: "{date} · {count} Seite. Die Seiten, Probleme und Geschwindigkeitsmessungen des Audits werden ebenfalls gelöscht. Dies kann nicht rückgängig gemacht werden.",
      other:
        "{date} · {count} Seiten. Die Seiten, Probleme und Geschwindigkeitsmessungen des Audits werden ebenfalls gelöscht. Dies kann nicht rückgängig gemacht werden.",
    },
  "Denetimi sil": "Audit löschen",
  Hızlı: "Schnell",
  Orta: "Durchschnittlich",
  Yavaş: "Langsam",
  "{score} ve üzeri": "{score} und höher",
  "Kota doldu": "Kontingent aufgebraucht",
  "{marker}; {measured} sayfa ölçüldü, {left} sayfa ölçülemedi. Google'ın ücretsiz günlük ölçüm sınırı bitti, sayfalarınızda bir sorun yok. Ayarlar'dan bir PageSpeed anahtarı ekleyin ya da kota yenilenince denetimi yeniden başlatın.":
    "{marker}: gemessene Seiten {measured}, nicht gemessen {left}. Das kostenlose tägliche Messlimit von Google ist aufgebraucht; mit Ihren Seiten ist alles in Ordnung. Fügen Sie in den Einstellungen einen PageSpeed-Schlüssel hinzu oder führen Sie das Audit erneut aus, sobald das Kontingent zurückgesetzt ist.",
  "PageSpeed anahtarı girilmediği için {count} ölçüm yapılamadı: Google'ın ortak ücretsiz kotası doldu, sayfalarınızda bir sorun yok. Ayarlar'dan ücretsiz bir anahtar ekleyip denetimi yeniden başlatın.":
    {
      one: "{count} Messung konnte nicht ausgeführt werden, da kein PageSpeed-Schlüssel festgelegt ist: Das gemeinsame kostenlose Kontingent von Google ist aufgebraucht; mit Ihren Seiten ist alles in Ordnung. Fügen Sie in den Einstellungen einen kostenlosen Schlüssel hinzu und führen Sie das Audit erneut aus.",
      other:
        "{count} Messungen konnten nicht ausgeführt werden, da kein PageSpeed-Schlüssel festgelegt ist: Das gemeinsame kostenlose Kontingent von Google ist aufgebraucht; mit Ihren Seiten ist alles in Ordnung. Fügen Sie in den Einstellungen einen kostenlosen Schlüssel hinzu und führen Sie das Audit erneut aus.",
    },
  "Google'ın dakikalık sınırı yüzünden {count} ölçüm yapılamadı; denetimi daha sonra yeniden başlatın veya Ayarlar'dan anahtarınızın kotasını kontrol edin.":
    {
      one: "{count} Messung konnte wegen des Minutenlimits von Google nicht ausgeführt werden. Führen Sie das Audit später erneut aus oder prüfen Sie das Kontingent Ihres Schlüssels in den Einstellungen.",
      other:
        "{count} Messungen konnten wegen des Minutenlimits von Google nicht ausgeführt werden. Führen Sie das Audit später erneut aus oder prüfen Sie das Kontingent Ihres Schlüssels in den Einstellungen.",
    },
  "Taranacak site adresini girin.":
    "Geben Sie die Adresse der zu crawlenden Website ein.",
  "{pages} sayfa taranacak. Biraz zaman alabilir. Devam edelim mi?":
    "{pages} Seiten werden gecrawlt. Das kann eine Weile dauern. Fortfahren?",
  "Denetim başlatıldı": "Audit gestartet",
  "Denetim başlatılamadı": "Audit konnte nicht gestartet werden",
  "Denetim silindi": "Audit gelöscht",
  "Denetim silinemedi": "Audit konnte nicht gelöscht werden",
  "Yeni denetim başlat": "Neues Audit starten",
  "Taranacak site adresi": "Adresse der zu crawlenden Website",
  "Başlatılıyor…": "Wird gestartet…",
  "En fazla {input} sayfa tara": "Bis zu {input} Seiten crawlen",
  "En çok taranacak sayfa sayısı": "Maximale Anzahl der zu crawlenden Seiten",
  "{min} ile {max} arasında bir sayı girin.":
    "Geben Sie eine Zahl zwischen {min} und {max} ein.",
  "Taranan her sayfanın hızı telefonda ve bilgisayarda ölçülür. En çok {pages} sayfa, yani {checks} ölçüm. Hız aşaması en az yaklaşık {minutes} dakika sürer, Google sınırına takılırsa daha uzun.":
    "Die Geschwindigkeit jeder gecrawlten Seite wird auf Mobilgeräten und Desktops gemessen. Bis zu {pages} Seiten, also {checks} Messungen. Die Geschwindigkeitsphase dauert mindestens etwa {minutes} Minuten, länger, wenn das Limit von Google erreicht wird.",
  "PageSpeed anahtarınız yok. Google'ın ücretsiz kotası küçük olduğu için en çok {pages} sayfa ({checks} ölçüm) ölçülür. Hız aşaması en az yaklaşık {minutes} dakika sürer, Google sınırına takılırsa daha uzun sürer.":
    "Sie haben keinen PageSpeed-Schlüssel. Das kostenlose Kontingent von Google ist gering, daher werden höchstens {pages} Seiten ({checks} Messungen) gemessen. Die Geschwindigkeitsphase dauert mindestens etwa {minutes} Minuten, länger, wenn das Limit von Google erreicht wird.",
  "Tüm sayfaları ölçmek için {settings}'dan ücretsiz bir PageSpeed anahtarı ekleyin.":
    "Um jede Seite zu messen, fügen Sie in den {settings} einen kostenlosen PageSpeed-Schlüssel hinzu.",
  "Sayfa hızını da ölç": "Auch die Seitengeschwindigkeit messen",
  "Hız ölçümü": "Geschwindigkeitstests",
  "Google Lighthouse ile taranan her sayfanın telefonda ve bilgisayarda ne kadar hızlı açıldığını ölçer, yavaşlatan sorunları listeler.":
    "Misst mit Google Lighthouse, wie schnell jede gecrawlte Seite auf Mobilgeräten und Desktop lädt, und listet auf, was sie bremst.",
  "Daha uzun sürer.": "Dauert länger.",
  "Sayfa bulma": "Seiten werden gesucht",
  Taranıyor: "Crawling",
  Tarama: "Crawling",
  Tamamlanıyor: "Wird abgeschlossen",
  Çalışıyor: "In Arbeit",
  "Lighthouse kontrolleri çalışıyor": "Lighthouse-Prüfungen laufen",
  "Sayfalar taranıyor": "Seiten werden gecrawlt",
  "{count} ölçüm başarısız oldu; kalanlar sürüyor.": {
    one: "{count} Messung fehlgeschlagen; der Rest läuft noch.",
    other: "{count} Messungen fehlgeschlagen; der Rest läuft noch.",
  },
  "Adresler bulunuyor…": "Adressen werden gesucht…",
  "{done} / {total} kontrol ({failed} başarısız)":
    "{done} / {total} Prüfungen ({failed} fehlgeschlagen)",
  "{done} / {total} kontrol": "{done} / {total} Prüfungen",
  "{done} / {total} sayfa": "{done} / {total} Seiten",
  "Taranan sayfalar ({count})": "Gecrawlte Seiten ({count})",
  "Güncellendi {date}": "Aktualisiert am {date}",
  "Denetimler arası değişim": "Änderung zwischen Audits",
  "Yüz sayfa başına sorun sayısı. Farklı büyüklükteki taramalar bu ölçüyle karşılaştırılabilir.":
    "Probleme pro hundert Seiten, sodass Crawls unterschiedlicher Größe verglichen werden können.",
  "Bu {count} denetimin hiçbirinde kritik sorun ya da uyarı çıkmadı, grafik boş. Bilgi düzeyindeki bulgular denetimlerin kendi sayfalarında.":
    "Keines dieser {count} Audits hat kritische Probleme oder Warnungen gefunden, daher ist das Diagramm leer. Befunde der Stufe Info finden Sie auf der Seite des jeweiligen Audits.",
  "Denetim başına sayfa yoğunluğu: yüz sayfa başına sorun":
    "Dichte pro Audit: Probleme pro hundert Seiten",
  Tarih: "Datum",
  Sayfa: "Seite",
  "{total} toplam": "{total} insgesamt",
  "{date} · {count} sayfa": {
    one: "{date} · {count} Seite",
    other: "{date} · {count} Seiten",
  },
  "{density} / 100 sayfa ({total} toplam)":
    "{density} / 100 Seiten ({total} insgesamt)",
  "kritik sorun": "kritische Probleme",
  uyarı: "Warnungen",
  değişmedi: "unverändert",
  "{count} denetim. Yüz sayfa başına {series}, {fromDate} tarihinde {from} idi, {toDate} tarihinde {to} oldu ({direction}).":
    {
      one: "{count} Audit. Pro hundert Seiten ging {series} von {from} am {fromDate} auf {to} am {toDate} ({direction}).",
      other:
        "{count} Audits. Pro hundert Seiten ging {series} von {from} am {fromDate} auf {to} am {toDate} ({direction}).",
    },
  "Denetim geçmişi yüklenemedi":
    "Der Audit-Verlauf konnte nicht geladen werden",
  "Henüz denetim yok": "Noch keine Audits",
  "Henüz denetim yapılmadı. Yukarıya site adresinizi yazıp başlatın; geçmiş burada listelenir.":
    "Sie haben noch kein Audit durchgeführt. Geben Sie oben die Adresse Ihrer Website ein und starten Sie eines; frühere Audits werden hier aufgelistet.",
  "Önceki denetimler": "Vorherige Audits",
  Durum: "Status",
  "Yüz sayfa başına (toplam ayrıca parantezde)":
    "Pro hundert Seiten (Gesamtzahl in Klammern)",
  Evet: "Ja",
  "{date} denetimini görüntüle": "Audit vom {date} ansehen",
  Görüntüle: "Ansehen",
  "Aynı siteye ait bir önceki denetime göre":
    "Verglichen mit dem vorherigen Audit derselben Website",
  "{url} denetimi için işlemler": "Aktionen für das Audit von {url}",
  "Aynı ayarlarla yeniden başlat":
    "Erneut mit den gleichen Einstellungen ausführen",
  "Bir denetim zaten başlatılıyor": "Ein Audit wird bereits gestartet",
  "Google'da": "Bei Google",
  "Aramada çıkabilir": "Kann in der Suche angezeigt werden",
  "Dizinde değil": "Nicht indexiert",
  "Google baktı ama almadı": "Google hat sie gesehen, aber nicht indexiert",
  "Yanıt bekleyen": "Wartet auf Antwort",
  "Google'a sorduk ama yanıt gelmedi ya da hiç sorulmadı":
    "Google gefragt, aber keine Antwort erhalten, oder nie gefragt",
  "Google bu sayfalarla ne yapmış?":
    "Was hat Google mit diesen Seiten gemacht?",
  "Bir gruba tıklayın, aşağıdaki liste yalnızca o sayfaları göstersin.":
    "Klicken Sie auf eine Gruppe, um nur die Seiten in der Liste unten anzuzeigen.",
  sayfa: "Seiten",
  "Google siteyi anlayamıyor": "Google versteht die Website nicht",
  "Sıralamayı ve tıklamayı düşürür": "Kostet Rankings und Klicks",
  "Küçük iyileştirme fırsatları": "Kleine Verbesserungschancen",
  "Sorunlar ne kadar ciddi?": "Wie ernst sind die Probleme?",
  bulgu: "Befunde",
  "Bu sorun için kayıtlı adres yok.":
    "Für dieses Problem wurden keine Adressen erfasst.",
  "{title}: etkilenen adresler": "{title}: betroffene Adressen",
  "Adres ara": "Adressen durchsuchen",
  "{title}: adreslerde ara": "{title}: Adressen durchsuchen",
  "Aramayla eşleşen adres yok.": "Keine Adresse entspricht Ihrer Suche.",
  "{total} adres içinden {shown} tanesi gösteriliyor.":
    "{shown} von {total} Adressen werden angezeigt.",
  "{total} sayfa içinden {shown} tanesi gösteriliyor.":
    "{shown} von {total} Seiten werden angezeigt.",
  "Daha fazla göster ({left} kaldı)": "Mehr anzeigen (noch {left})",
  "Bu sayfada {count} kayıt var": {
    one: "{count} Datensatz auf dieser Seite",
    other: "{count} Datensätze auf dieser Seite",
  },
  "{title}, {count}": "{title}, {count}",
  "Nasıl düzeltilir?": "So beheben Sie das Problem",
  "Bu sorun tek bir sayfayla değil, sitenin tamamıyla ilgili.":
    "Dieses Problem betrifft die gesamte Website, nicht eine einzelne Seite.",
  "URL'leri kopyala ({count})": "URLs kopieren ({count})",
  "Sayfalar sekmesinde göster": "Im Tab „Seiten“ anzeigen",
  "{count} adres kopyalandı": {
    one: "{count} Adresse kopiert",
    other: "{count} Adressen kopiert",
  },
  "Bu denetimde kayıtlı sorun yok.": "Dieses Audit hat keine Probleme erfasst.",
  "Site gerçekten iyi durumda olabilir ya da bu denetim, sorun kontrolleri eklenmeden önce çalıştırılmış olabilir. Tam raporu görmek için yeni bir denetim başlatın.":
    "Die Website ist möglicherweise wirklich in gutem Zustand, oder dieses Audit lief, bevor die Problemprüfungen hinzugefügt wurden. Starten Sie ein neues Audit, um den vollständigen Bericht zu erhalten.",
  "Yalnızca {url}": "Nur {url}",
  "Tüm sayfaları göster": "Alle Seiten anzeigen",
  "Gösterilen:": "Wird angezeigt:",
  "Seçtiğiniz kombinasyonda sorun yok.":
    "Keine Probleme stimmen mit der von Ihnen gewählten Kombination überein.",
  "Bu sayfada kayıtlı sorun yok.":
    "Für diese Seite wurden keine Probleme erfasst.",
  "{label} seçimini kaldır": "Filter {label} entfernen",
  "Durum kodu": "Statuscode",
  "Uzunluk (karakter)": "Länge (Zeichen)",
  "Kelime sayısı": "Wortanzahl",
  "H1 sayısı": "H1-Anzahl",
  "Ana sayfadan uzaklık (tık)": "Klicks von der Startseite",
  "Yanıt süresi": "Antwortzeit",
  "Asıl adres": "Canonical-URL",
  "Sayfadaki asıl adres": "Canonical-URL in der Seite",
  "Başlıktaki asıl adres": "Canonical-URL im HTTP-Header",
  "Yönlendirdiği adres": "Leitet weiter zu",
  "Son adres": "Endgültige URL",
  "Aynı içerikteki sayfa sayısı": "Seiten mit demselben Inhalt",
  "Aynı içerikteki diğer sayfalar": "Andere Seiten mit demselben Inhalt",
  "Karşılıklı bağlanmayan alternatif": "Alternative ohne Rückverweis",
  "Dil kodu": "Sprachcode",
  "Dil kodları": "Sprachcodes",
  Neden: "Grund",
  "Erişim sonucu": "Abrufergebnis",
  "Robots meta etiketi": "Robots-Meta-Tag",
  "Googlebot meta etiketi": "Googlebot-Meta-Tag",
  "X-Robots-Tag başlığı": "X-Robots-Tag-Header",
  Adet: "Anzahl",
  Örnek: "Beispiel",
  Sınır: "Limit",
  "Alt metni eksik görsel": "Bilder ohne Alternativtext",
  "Toplam görsel": "Bilder insgesamt",
  "Engellenen kaynaklar": "Blockierte Ressourcen",
  "Engellenen kaynak sayısı": "Anzahl blockierter Ressourcen",
  Örnekler: "Beispiele",
  "Sizin belirttiğiniz adres": "Vom Nutzer angegebene kanonische URL",
  "Google'ın seçtiği adres": "Von Google ausgewählte kanonische URL",
  "Google'ın kararı": "Googles Ergebnis",
  "Google'ın son tarama tarihi": "Letzter Crawl von Google",
  "Kontrol tarihi": "Geprüft am",
  "Eşik (gün)": "Schwellenwert (Tage)",
  "Kontrol edilen sayfa": "Geprüfte Seiten",
  "Adres sayısı": "Anzahl der URLs",
  Hayır: "Nein",
  "{shown} ve {rest} tane daha": "{shown} und {rest} weitere",
  "Tüm site": "Gesamte Website",
  "{count} sayfa · {findings} bulgu": {
    one: "{count} Seite · {findings} Befunde",
    other: "{count} Seiten · {findings} Befunde",
  },
  Önem: "Schweregrad",
  Sorun: "Problem",
  Adres: "URL",
  Ayrıntı: "Details",
  "Nasıl düzeltilir": "Behebung",
  "En çok sayfayı hangi sorun etkiliyor?":
    "Welches Problem betrifft die meisten Seiten?",
  "Bir çubuğa tıklayıp listeyi daraltın.":
    "Klicken Sie auf einen Balken, um die Liste einzugrenzen.",
  "En çok sayfayı etkileyen sorun: {title}, {pages} sayfa. Grafikte {count} tür var.":
    {
      one: "Das Problem mit den meisten betroffenen Seiten: {title}, {pages} Seiten. Das Diagramm zeigt {count} Typ.",
      other:
        "Das Problem mit den meisten betroffenen Seiten: {title}, {pages} Seiten. Das Diagramm zeigt {count} Typen.",
    },
  "Sorun türüne göre etkilenen sayfa sayısı":
    "Betroffene Seiten nach Problemtyp",
  "Etkilenen sayfa": "Betroffene Seiten",
  "Sorun türüne göre filtre": "Nach Problemtyp filtern",
  Başlık: "Titel",
  Görsel: "Bild",
  "Alt metni eksik": "Fehlender Alternativtext",
  "Yanıt süresi (ms)": "Antwortzeit (ms)",
  Cihaz: "Gerät",
  Performans: "Leistung",
  Erişilebilirlik: "Barrierefreiheit",
  Karar: "Ergebnis",
  "Kapsam durumu": "Abdeckungsstatus",
  "Google'ın seçtiği asıl adres": "Von Google ausgewählte kanonische URL",
  "Sizin belirttiğiniz asıl adres": "Vom Nutzer angegebene kanonische URL",
  "Asıl adres uyuşmazlığı": "Abweichende kanonische URL",
  "Son tarama": "Letzter Crawl",
  Sorgulandı: "Geprüft",
  evet: "ja",
  hayır: "nein",
  "Dizine kapalı": "Für die Indexierung gesperrt",
  "Google'ın dizine almasına izin verilmeyen sayfalar":
    "Seiten, die Google nicht indexieren darf",
  "Sunucu yanıtı 1 saniyeden uzun süren sayfalar":
    "Seiten, deren Serverantwort länger als 1 Sekunde dauert",
  "En az bir görselinde alt metni olmayan sayfalar":
    "Seiten mit mindestens einem Bild ohne Alternativtext",
  "Site haritasında yok": "Nicht in der Sitemap",
  "Taranan ama site haritasına girmemiş sayfalar":
    "Gecrawlte Seiten, die nicht in der Sitemap sind",
  '"Site haritasında yok" kullanılamıyor: bu denetimde site haritası bulunamadı.':
    "„Nicht in der Sitemap“ ist nicht verfügbar: Dieses Audit hat keine Sitemap gefunden.",
  "Eksiksiz. Düzeltilecek bir şey kalmadı.":
    "Makellos. Nichts mehr zu beheben.",
  "Çok iyi. Birkaç küçük iş kaldı.":
    "Sehr gut. Es bleiben ein paar kleine Aufgaben.",
  "İyi. Birkaç düzeltme puanı yükseltir.":
    "Gut. Ein paar Korrekturen erhöhen den Score.",
  "Orta. Önce kritik sorunlara bakın.":
    "Ausreichend. Beginnen Sie mit den kritischen Problemen.",
  "Zayıf. Google'ın sitenizi anlamasını engelleyen sorunlar var.":
    "Schlecht. Einige Probleme verhindern, dass Google Ihre Website versteht.",
  "Site puanı": "Website-Score",
  "Google'ın ücretsiz ölçüm kotası dolmuş; sayfalarınızda bir sorun yok. Ayarlar'dan PageSpeed anahtarı ekleyin ya da kota yenilenince denetimi yeniden başlatın.":
    "Das kostenlose Messkontingent von Google ist erschöpft; mit Ihren Seiten ist alles in Ordnung. Fügen Sie in den Einstellungen einen PageSpeed-Schlüssel hinzu oder führen Sie das Audit erneut aus, sobald das Kontingent zurückgesetzt ist.",
  Hız: "Geschwindigkeit",
  "Ortalama puanlar": "Durchschnittswerte",
  "Mobilde hız dağılımı": "Geschwindigkeitsverteilung auf Mobilgeräten",
  "Ortalama tek başına yanıltır. Bir gruba tıklayıp o sayfaları listeleyin.":
    "Ein Durchschnitt allein ist irreführend. Klicken Sie auf eine Gruppe, um diese Seiten aufzulisten.",
  "Sayfalar nasıl yanıt verdi?": "Wie haben die Seiten reagiert?",
  "Bir çubuğa tıklayarak tabloyu daraltın.":
    "Klicken Sie auf einen Balken, um die Tabelle einzugrenzen.",
  "Ortalama yanıt süresi {duration}. Bir çubuğa tıklayarak tabloyu daraltın.":
    "Durchschnittliche Antwortzeit {duration}. Klicken Sie auf einen Balken, um die Tabelle einzugrenzen.",
  "{count} sayfanın yanıt durumuna göre dağılımı.": {
    one: "{count} Seite nach Antwortstatus.",
    other: "{count} Seiten nach Antwortstatus.",
  },
  "Ana sayfadan kaç tık uzakta?": "Wie viele Klicks von der Startseite aus?",
  "{count} sayfaya hiçbir bağlantı verilmemiş, bu yüzden çubuklarda yok.": {
    one: "{count} Seite hat keine eingehenden Links, daher erscheint sie nicht in den Balken.",
    other:
      "{count} Seiten haben keine eingehenden Links, daher erscheinen sie nicht in den Balken.",
  },
  "Derindeki sayfaları Google geç bulur ve daha az değer verir.":
    "Google findet tiefe Seiten spät und bewertet sie weniger.",
  "En derin sayfalar {depth} uzaklığında.":
    "Die tiefsten Seiten sind {depth} entfernt.",
  "Derinlik bilgisi yok.": "Keine Tiefendaten.",
  Sorunsuz: "OK",
  "2xx: sayfa açıldı": "2xx: Seite geladen",
  Yönlendirme: "Weiterleitung",
  "3xx: başka adrese gidiyor": "3xx: führt zu einer anderen URL",
  "4xx / 5xx: sayfa açılmadı": "4xx / 5xx: Seite wurde nicht geladen",
  Ulaşılamadı: "Nicht erreichbar",
  "Sunucudan yanıt gelmedi": "Keine Antwort vom Server",
  "1 tık": "1 Klick",
  "2 tık": "2 Klicks",
  "3 tık": "3 Klicks",
  "4+ tık": "4+ Klicks",
  "robots.txt izin veriyor": "Durch robots.txt zugelassen",
  "robots.txt engelliyor": "Durch robots.txt blockiert",
  "Google henüz bakmadı": "Google hat noch nicht geprüft",
  "Dizine almaya izin var": "Indexierung erlaubt",
  "Gizleme etiketi (noindex) engelliyor":
    "Durch das noindex-Meta-Tag blockiert",
  "Sunucu başlığı (X-Robots-Tag) engelliyor":
    "Durch den X-Robots-Tag-HTTP-Header blockiert",
  "Sayfa alındı": "Seite abgerufen",
  "Boş sayfa, hata vermeden açılıyor (soft 404)":
    "Leere Seite, die ohne Fehler geladen wird (Soft 404)",
  "robots.txt engelledi": "Durch robots.txt blockiert",
  "404, sayfa yok": "404, Seite nicht gefunden",
  "401 yetkisiz": "401 nicht autorisiert",
  "403 yasak": "403 verboten",
  "Sunucu hatası": "Serverfehler",
  "Yönlendirme hatası": "Weiterleitungsfehler",
  "Zaman aşımı": "Zeitüberschreitung",
  "Google tarafında tarama hatası": "Crawling-Fehler auf Seiten von Google",
  "Geçersiz adres": "Ungültige URL",
  "Google henüz almadı": "Google hat sie noch nicht abgerufen",
  "Zengin sonuç verisi geçerli": "Daten für Rich-Suchergebnisse sind gültig",
  "Zengin sonuç verisinde uyarı var":
    "Daten für Rich-Suchergebnisse enthalten Warnungen",
  "Zengin sonuç verisi geçersiz": "Daten für Rich-Suchergebnisse sind ungültig",
  "Zengin sonuç verisi yok": "Keine Daten für Rich-Suchergebnisse",
  "Google henüz değerlendirmedi": "Google hat sie noch nicht ausgewertet",
  "{count} sayfada engellendik.": {
    one: "Wir wurden auf {count} Seite blockiert.",
    other: "Wir wurden auf {count} Seiten blockiert.",
  },
  "Sitenin bot koruması tarayıcımızı durdurdu, o sayfalar denetlenemedi. Henüz bir çözümümüz yok. Masaüstü tarayıcılar sizin bilgisayarınızdan çalıştığı için genelde geçer. Şunları deneyin: {librecrawl} (ücretsiz, açık kaynak) ya da {screamingfrog} (500 adrese kadar ücretsiz).":
    "Der Bot-Schutz der Website hat unseren Crawler gestoppt, sodass diese Seiten nicht überprüft werden konnten. Wir haben noch keine Problemumgehung. Desktop-Crawler kommen in der Regel durch, weil sie auf Ihrem eigenen Computer ausgeführt werden. Probieren Sie {librecrawl} (kostenlos, Open Source) oder {screamingfrog} (kostenlos bis zu 500 URLs).",
  "Tarama, sitenin istek sınırı yüzünden erken durdu.":
    "Der Crawl wurde wegen der Ratenbegrenzung der Website vorzeitig gestoppt.",
  "Site {count} sayfada istek sınırı uyguladı.": {
    one: "Die Website hat {count} Seite per Ratenbegrenzung blockiert.",
    other: "Die Website hat {count} Seiten per Ratenbegrenzung blockiert.",
  },
  "İstenen bekleme süresi denetim süresini aştı, bazı adresler ziyaret edilmedi. Bu rapor eksik.":
    "Die von der Website verlangte Wartezeit hat das Zeitlimit des Audits überschritten, daher wurden einige URLs nicht besucht. Dieser Bericht ist unvollständig.",
  'Sunucunun "çok fazla istek" (429) yanıtı verdiği sayfalar denetlenemedi.':
    "Seiten, auf denen der Server mit „zu viele Anfragen“ (429) antwortete, konnten nicht geprüft werden.",
  'İstek sınırı sıfırlandıktan sonra denetimi yeniden başlatın, ya da site sahibinden "seotracker-audit" tarayıcısına izin vermesini isteyin.':
    "Führen Sie das Audit erneut aus, sobald die Ratenbegrenzung zurückgesetzt ist, oder bitten Sie den Websitebetreiber, den Crawler „seotracker-audit“ zuzulassen.",
  "başka bir mülk": "andere Property",
  "Sorunlu sayfalar ({count})": "Seiten mit Problemen ({count})",
  "Sayfalar ({count})": "Seiten ({count})",
  "Dizin durumu": "Indexstatus",
  "Dizin durumu ({count})": "Indexstatus ({count})",
  "Hız ({count})": "Geschwindigkeit ({count})",
  "{issue} sorunu olan sayfalar": "Seiten mit: {issue}",
  "Taranan sayfalar": "Gecrawlte Seiten",
  "Bu denetim hiçbir sayfa taramadı.":
    "Dieses Audit hat keine Seiten gecrawlt.",
  "Bu filtrelerle eşleşen sayfa yok.":
    "Keine Seiten stimmen mit diesen Filtern überein.",
  "Sayfa hızı ölçümleri": "Seitengeschwindigkeitsmessungen",
  "Bu denetimde Lighthouse sonucu yok.":
    "Dieses Audit hat keine Lighthouse-Ergebnisse.",
  "Bu filtrelerle eşleşen performans sonucu yok.":
    "Keine Leistungsergebnisse stimmen mit diesen Filtern überein.",
  "Hız puanı (0-100)": "Leistungsbewertung (0–100)",
  "Erişilebilirlik puanı (0-100)": "Barrierefreiheitsbewertung (0–100)",
  "Arama motoru uyumu puanı (0-100)":
    "Suchmaschinenbereitschaftsbewertung (0-100)",
  "Ana içeriğin görünme süresi": "Zeit bis zum Erscheinen des Hauptinhalts",
  "Sayfanın ne kadar kaydığı": "Um wie viel sich die Seite verschiebt",
  "Tıklamaya yanıt süresi": "Reaktionszeit auf einen Klick",
  "Sunucunun ilk yanıt süresi": "Zeit bis zur ersten Antwort des Servers",
  Sorunlar: "Probleme",
  "Sorunları gör": "Probleme ansehen",
  "JSON ({count} satır)": {
    one: "JSON ({count} Zeile)",
    other: "JSON ({count} Zeilen)",
  },
  "{count} sorunu göster": {
    one: "{count} Problem anzeigen",
    other: "{count} Probleme anzeigen",
  },
  yönlendirme: "Weiterleitung",
  eksik: "fehlt",
  "Sayfadaki kelime sayısı": "Anzahl der Wörter auf der Seite",
  "Sayfadaki görsel sayısı. Renkli sayı, alt metni (açıklaması) eksik görsellerin sayısıdır.":
    "Anzahl der Bilder auf der Seite. Die farbige Zahl zählt Bilder ohne Alternativtext (ihre Beschreibung).",
  Bağlantı: "Links",
  "Bu sayfadan çıkan bağlantılar. Önce site içi, sonra dışarı giden sayısı yazar. Site içi bağlantısı olmayan sayfa, sitenin geri kalanına yönlendirmiyor demektir.":
    "Links, die diese Seite verlassen: zuerst intern, dann extern. Eine Seite ohne interne Links führt nirgendwo anders auf der Website hin.",
  Dizin: "Index",
  Derinlik: "Tiefe",
  "Ana sayfadan kaç tıkla ulaşılıyor":
    "Klicks von der Startseite aus erforderlich",
  Harita: "Sitemap",
  "Site haritasında var mı": "Ob sie in der Sitemap ist",
  Var: "Gelistet",
  Yok: "Keine",
  Ara: "Suche",
  "Adres, başlık, açıklama": "URL, Titel, Beschreibung",
  "Alt metni": "Alternativtext",
  "Alt metni yok": "Fehlender Alternativtext",
  "Alt metni tam": "Alternativtext vollständig",
  Dizinlenebilir: "Indexierbar",
  "Hayır (noindex)": "Nein (noindex)",
  "Site haritası": "Sitemap",
  Haritada: "In Sitemap",
  "Haritada yok": "Nicht in Sitemap",
  "En çok LCP (sn)": "Max. LCP (s)",
  "Filtreleri aç/kapat": "Filter anzeigen oder ausblenden",
  "En az": "Min.",
  "En fazla": "Max.",
  "{label} en az": "{label} Minimum",
  "{label} en fazla": "{label} Maximum",
  "Search Console bağlı değil. Sayfaların Google'daki durumunu görmek için önce bağlayın.":
    "Die Search Console ist nicht verbunden. Verbinden Sie sie zuerst, um zu sehen, wie Google Ihre Seiten behandelt.",
  "Google'ın günlük {limit} adres sınırı doldu. {count} sayfa sırada, sınır birkaç saat içinde yenilenir.":
    {
      one: "Googles Tageslimit von {limit} URLs ist aufgebraucht. {count} Seite wartet; das Limit wird innerhalb weniger Stunden zurückgesetzt.",
      other:
        "Googles Tageslimit von {limit} URLs ist aufgebraucht. {count} Seiten warten; das Limit wird innerhalb weniger Stunden zurückgesetzt.",
    },
  "Tüm sayfalar güncel, sorulacak bir şey yok.":
    "Alle Seiten sind auf dem neuesten Stand; es gibt nichts zu prüfen.",
  "{count} sayfa soruldu.": {
    one: "{count} Seite geprüft.",
    other: "{count} Seiten geprüft.",
  },
  "{count} sayfa kaldı.": {
    one: "Noch {count} Seite.",
    other: "Noch {count} Seiten.",
  },
  "Bugünkü kotadan {count} sorgu kaldı.": {
    one: "Noch {count} Prüfung im heutigen Kontingent.",
    other: "Noch {count} Prüfungen im heutigen Kontingent.",
  },
  "Google'daki durum sorulamadı. Birazdan tekrar deneyin.":
    "Der Status konnte bei Google nicht überprüft werden. Versuchen Sie es in Kürze noch einmal.",
  "Dizin durumu yüklenemedi": "Der Indexstatus konnte nicht geladen werden",
  "Sorulacak sayfa yok": "Keine Seiten zum Überprüfen",
  "Bu denetimde Google'ın dizine alabileceği bir sayfa yok.":
    "Dieses Audit enthält keine Seiten, die Google indexieren könnte.",
  "Google'ın farklı adresi seçtiği sayfalar":
    "Seiten, für die Google eine andere kanonische URL ausgewählt hat",
  "Üstteki grafikte seçtiğiniz gruptan bağımsız, kontrol edilen tüm sayfalar. Google, sizin seçtiğiniz adres yerine başka bir sayfayı asıl sayfa saydı.":
    "Zählt jede geprüfte Seite, unabhängig von der Gruppe, die Sie im Diagramm oben ausgewählt haben. Google hat statt der von Ihnen angegebenen Seite eine andere als kanonisch behandelt.",
  "Üstteki grafikte seçtiğiniz gruptan bağımsız, kontrol edilen tüm sayfalar.":
    "Zählt jede geprüfte Seite, unabhängig von der Gruppe, die Sie im Diagramm oben ausgewählt haben.",
  "Google günde en çok {limit} adres sormanıza izin verir. Her seferde {batch} sayfa kontrol edilir. Önce hiç sorulmamış olanlara, sonra Google'ın dizine almadıklarına bakılır.":
    "Google erlaubt die Prüfung von bis zu {limit} URLs pro Tag. Jeder Durchlauf prüft {batch} Seiten: zuerst nie geprüfte, dann von Google nicht indexierte.",
  "Google'da durumunu kontrol et": "Status bei Google prüfen",
  "Taradığınız sayfaların gerçekten dizine girip girmediğini görmek için yukarıdaki düğmeyi kullanın.":
    "Über die Schaltfläche oben können Sie sehen, ob Ihre gecrawlten Seiten tatsächlich indexiert sind.",
  "{count} sayfa gösteriliyor": {
    one: "{count} Seite wird angezeigt",
    other: "{count} Seiten werden angezeigt",
  },
  "Tümünü göster": "Alle anzeigen",
  Sebep: "Grund",
  "Google'ın son ziyareti": "Letzter Crawl von Google",
  "Sizin seçtiğiniz: {url}": "Ihre Wahl: {url}",
  "{url} adresini Search Console'da aç": "{url} in der Search Console öffnen",
  "Search Console'da aç": "In der Search Console öffnen",
  "Google bu adres için yanıt vermedi ({error}). Google'da durumunu kontrol et düğmesiyle yeniden sorabilirsiniz.":
    "Google hat für diese URL nicht geantwortet ({error}). Mit der Schaltfläche „Status bei Google prüfen“ können Sie erneut nachfragen.",
  Sorulamadı: "Prüfung fehlgeschlagen",
  "Kontrol edilmedi": "Nicht geprüft",
  "Yanıt alınamadı": "Keine Antwort",
  iyi: "gut",
  geliştirilmeli: "Optimierung erforderlich",
  zayıf: "schlecht",
  "düşüyor, yani iyileşiyor": "sinkend, also besser",
  "yükseliyor, yani kötüleşiyor": "steigend, also schlechter",
  "yatay seyrediyor": "stabil",
  "{metric} son {count} haftada {start} değerinden {now} değerine geldi, {trend}; şu an {rating}.":
    {
      one: "{metric} ging in der letzten {count} Woche von {start} auf {now}, {trend}; derzeit {rating}.",
      other:
        "{metric} ging in den letzten {count} Wochen von {start} auf {now}, {trend}; derzeit {rating}.",
    },
  "Gerçek kullanıcı hızı, son haftalar":
    "Geschwindigkeit bei echten Nutzern, letzte Wochen",
  "Cihaz türü": "Gerätetyp",
  Telefon: "Smartphone",
  Bilgisayar: "Desktop",
  "Google'a ulaşılamadı.": "Google ist nicht erreichbar.",
  "Bu geçmiş için PageSpeed anahtarı gerekiyor.":
    "Dieser Verlauf erfordert einen PageSpeed-Schlüssel.",
  "Ayarlar'a git": "Zu den Einstellungen",
  "Google bu site için yeterli ziyaretçi verisine sahip değil. Siteye Chrome ile gelen ziyaretçi arttıkça burada görünür.":
    "Google verfügt noch nicht über genügend Besucherdaten für diese Website. Sie erscheinen hier, sobald mehr Besucher mit Chrome kommen.",
  "Google bu site için yeterli ziyaretçi verisine sahip değil.":
    "Google verfügt nicht über genügend Besucherdaten für diese Website.",
  "Her nokta, o haftada biten 28 günde ziyaretçilerin yüzde 75'inin gördüğü değerdir (p75). Kesikli çizgiler iyi ile zayıf arasındaki sınırlardır.":
    "Jeder Punkt ist der Wert, den 75 % der Besucher in den 28 Tagen bis zum Ende dieser Woche gesehen haben (p75). Die gestrichelten Linien markieren die Schwellenwerte für gut und schlecht.",
  "Son pencere {date} tarihinde bitiyor.":
    "Das letzte Zeitfenster endet am {date}.",
  Kategori: "Kategorie",
  Puan: "Score",
  "Görünen değer": "Angezeigter Wert",
  "Etki (ms)": "Auswirkung (ms)",
  "Etki (bayt)": "Auswirkung (Byte)",
  "Etkilenen öğeler": "Betroffene Elemente",
  "En iyi uygulamalar": "Best Practices",
  "Tüm sorunlar": "Alle Probleme",
  "Tüm sorunları": "alle Probleme",
  "Performans sorunları": "Leistungsprobleme",
  "Performans sorunlarını": "Leistungsprobleme",
  "Erişilebilirlik sorunları": "Barrierefreiheitsprobleme",
  "Erişilebilirlik sorunlarını": "Barrierefreiheitsprobleme",
  "En iyi uygulama sorunları": "Best-Practices-Probleme",
  "En iyi uygulama sorunlarını": "Best-Practices-Probleme",
  "SEO sorunları": "SEO-Probleme",
  "SEO sorunlarını": "SEO-Probleme",
  "Bu kategoride işlem gerektiren sorun yok.":
    "Kein Problem in dieser Kategorie erfordert Maßnahmen.",
  Etki: "Auswirkung",
  "Ayrıntıları gizle": "Details ausblenden",
  "Ayrıntıları göster": "Details anzeigen",
  "Etkilenen öğeler ({count})": "Betroffene Elemente ({count})",
  "{label} sayfasına dön": "Zurück zu {label}",
  "{date} tarihinde tarandı": "Gescannt am {date}",
  "Sayfa hızı sorunları (Lighthouse)":
    "Probleme mit der Seitengeschwindigkeit (Lighthouse)",
  "Lighthouse sorunlarını dışa aktar": "Lighthouse-Probleme exportieren",
  "{issues} E-Tablolar'da aç": "{issues}: in Google Tabellen öffnen",
  "İşlem gerektiren tüm sorunları E-Tablolar'da aç":
    "Alle Probleme, die Maßnahmen erfordern, in Google Tabellen öffnen",
  "{issues} kopyalandı": "{issues} kopiert",
  "{issues} kopyala": "{issues} kopieren",
  "İşlem gerektiren tüm sorunlar kopyalandı":
    "Alle Probleme, die Maßnahmen erfordern, kopiert",
  "İşlem gerektiren tüm sorunları kopyala":
    "Alle Probleme, die Maßnahmen erfordern, kopieren",
  "Kayıtlı Lighthouse verisi kopyalandı":
    "Gespeicherte Lighthouse-Daten kopiert",
  "Kayıtlı Lighthouse verisini kopyala":
    "Gespeicherte Lighthouse-Daten kopieren",
  "JSON indir": "JSON herunterladen",
  "{issues} indir": "{issues} herunterladen",
  "İşlem gerektiren tüm sorunları indir":
    "Alle Probleme herunterladen, die Maßnahmen erfordern",
  "Kayıtlı Lighthouse verisini indir":
    "Gespeicherte Lighthouse-Daten herunterladen",
  "{category} ({count})": "{category} ({count})",
  "Lighthouse sorunları yüklenemedi.":
    "Die Lighthouse-Probleme konnten nicht geladen werden.",
  "Bu denetim, Lighthouse sorun ayrıntıları olmadan kaydedilmiş. Bu ekranı doldurmak için denetimi yeniden başlatın.":
    "Dieses Audit wurde ohne Lighthouse-Problemdetails gespeichert. Führen Sie das Audit erneut aus, um diesen Bildschirm zu füllen.",
  "Bu Lighthouse çalışması, sorun ayrıntıları saklanmaya başlamadan önce kaydedilmiş. Kategori sayılarını ve sorun kartlarını görmek için denetimi yeniden başlatın.":
    "Dieser Lighthouse-Lauf wurde gespeichert, bevor Problemdetails erfasst wurden. Führen Sie das Audit erneut aus, um die Anzahl pro Kategorie und die Problemkarten zu sehen.",
  "İndirme başladı": "Download gestartet",
  "Veri dışa aktarılamadı. Birazdan tekrar deneyin.":
    "Die Daten konnten nicht exportiert werden. Versuchen Sie es in Kürze noch einmal.",
  "CSV indirmesi başladı": "CSV-Download gestartet",
  "Veri kopyalanamadı. Tekrar deneyin.":
    "Die Daten konnten nicht kopiert werden. Versuchen Sie es erneut.",
  "Gerçek kullanıcı verisi · site geneli · son 28 gün":
    "Echte Nutzerdaten · gesamte Website · letzte 28 Tage",
  "Gerçek kullanıcı verisi · bu sayfa · son 28 gün":
    "Echte Nutzerdaten · diese Seite · letzte 28 Tage",
  "Yukarıdaki puanlar Google'ın test makinesinde ölçüldü. Bunlar sitenizi gerçekten ziyaret eden Chrome kullanıcılarından geliyor.":
    "Die oben genannten Ergebnisse wurden auf dem Testcomputer von Google gemessen. Diese stammen von Chrome-Nutzern, die Ihre Website tatsächlich besuchen.",
  "Bu sayfanın kendi ziyaretçi sayısı Google'ın eşiğinin altında kaldığı için sitenizin tamamının ortalaması gösteriliyor.":
    "Diese Seite hat zu wenige eigene Besucher, um den Schwellenwert von Google zu erreichen. Daher wird der Durchschnitt für Ihre gesamte Website angezeigt.",
  "Laboratuvar ↔ gerçek kullanıcı": "Labor ↔ echte Nutzer",
  "Test ortamında sitenizin hızı ziyaretçilerinkinden iyi çıkıyor. Google sıralamada sağdaki sütunu kullanır.":
    "Ihre Website sieht in der Testumgebung schneller aus als für Besucher. Google verwendet die rechte Spalte für das Ranking.",
  "Gerçek ziyaretçiler sitenizi test ortamından daha hızlı görüyor. Google sıralamada sağdaki sütunu kullanır.":
    "Echte Besucher sehen Ihre Website schneller als die Testumgebung. Google verwendet die rechte Spalte für das Ranking.",
  "İki ölçüm birbirini tutuyor. Laboratuvar puanı ziyaretçilerin gördüğüne yakın.":
    "Die beiden Messungen stimmen überein. Der Laborwert kommt dem, was Besucher erleben, nahe.",
  Ölçüm: "Metrik",
  Laboratuvar: "Labor",
  "Gerçek kullanıcı": "Echte Nutzer",
  Fark: "Unterschied",
  Tutuyor: "Stimmt überein",
  "{gap} daha yavaş": "{gap} langsamer",
  "{gap} daha hızlı": "{gap} schneller",
  "en büyük içerik": "größter Inhalt",
  "ilk içerik": "erster Inhalt",
  "sunucu yanıtı": "Serverantwort",
  "düzen kayması": "Layoutverschiebung",
  "Tarama robotu engellendi": "Crawler wurde blockiert",
  "Sayfa yerine bir bot doğrulaması ya da erişim engeli döndü (Cloudflare doğrulaması ya da 403 gibi), bu yüzden sayfa denetlenemedi. Google'ın tarayıcısı da benzer bir engele takılıyor olabilir; takılırsa sayfa aramada çıkmaz.":
    "Statt der Seite hat der Server eine Bot-Prüfung oder eine Zugriffssperre zurückgegeben (z. B. eine Cloudflare-Challenge oder einen 403), daher konnte die Seite nicht geprüft werden. Der Googlebot stößt möglicherweise auf eine ähnliche Sperre; ist das der Fall, erscheint die Seite nicht in der Suche.",
  'Site sizinse güvenlik duvarınızda ya da bot korumanızda "seotracker-audit" kullanıcı aracısına izin verin (Cloudflare\'de: kullanıcı aracısı "seotracker-audit" içerdiğinde bot korumasını atlayan bir WAF kuralı). Sonra denetimi yeniden başlatın.':
    "Wenn die Website Ihnen gehört, lassen Sie den User-Agent „seotracker-audit“ in Ihrer Firewall oder Ihrem Bot-Schutz zu (in Cloudflare: eine WAF-Regel, die den Bot-Schutz überspringt, wenn der User-Agent „seotracker-audit“ enthält). Führen Sie dann das Audit erneut aus.",
  "İstek sınırına takıldı (429)": "Ratenlimit (429) erreicht",
  "Sunucu 429 (çok fazla istek) yanıtı verdi, bu yüzden sayfa denetlenemedi. Sitenin istediği bekleme süresi denetimin süresine sığıyorsa tarayıcı bekleyip yeniden dener.":
    "Der Server hat mit 429 geantwortet (zu viele Anfragen), daher konnte die Seite nicht geprüft werden. Wenn die von der Website verlangte Wartezeit in die Laufzeit des Audits passt, wartet der Crawler und versucht es erneut.",
  'Sunucunuzda ya da güvenlik duvarınızda istek sınırını yükseltin veya "seotracker-audit" kullanıcı aracısını sınırın dışında tutun. Sonra denetimi yeniden başlatın. Sınır çok katıysa denetimi daha az sayfayla başlatmak da işe yarar.':
    "Erhöhen Sie das Ratenlimit auf Ihrem Server oder in Ihrer Firewall oder nehmen Sie den User-Agent „seotracker-audit“ davon aus. Führen Sie dann das Audit erneut aus. Wenn das Limit sehr streng ist, hilft es auch, das Audit mit weniger Seiten zu starten.",
  "Tarama erken durdu: istek sınırı":
    "Crawling vorzeitig gestoppt: Ratenbegrenzung",
  "Site, tarayıcıdan denetimin süresinden uzun beklemesini istedi, biz de sayfa istemeyi bıraktık. Bu rapor eksik; çekemediğimiz adresler kırık ya da sınırlanmış diye kaydedilmedi.":
    "Die Website hat den Crawler gebeten, länger zu warten, als das Audit zulässt, daher haben wir keine weiteren Seiten angefordert. Dieser Bericht ist unvollständig; die URLs, die wir nicht abrufen konnten, wurden weder als defekt noch als ratenbegrenzt erfasst.",
  "Sitenin istek sınırı sıfırlandıktan sonra denetimi yeniden başlatın. Sorun sürerse site yöneticisinden seotracker-audit tarayıcısına izin vermesini isteyin.":
    "Führen Sie das Audit erneut aus, nachdem die Ratenbegrenzung der Website zurückgesetzt wurde. Wenn das Problem weiter auftritt, bitten Sie den Website-Administrator, den Crawler seotracker-audit zuzulassen.",
  "Sunucu hatası (5xx)": "Serverfehler (5xx)",
  "Sayfa 5xx sunucu hatası verdi. Google sürekli hata veren siteyi daha seyrek tarar ve sayfayı dizinden çıkarabilir.":
    "Die Seite hat einen 5xx-Serverfehler zurückgegeben. Google crawlt eine Website, die immer wieder Fehler liefert, seltener und entfernt die Seite möglicherweise aus dem Index.",
  "Sunucu günlüklerinde bu adrese ait hatayı bulup giderin. Sayfa bilerek kaldırıldıysa hata yerine 404 ya da 410 döndürün veya ilgili bir sayfaya yönlendirin.":
    "Suchen Sie den Fehler für diese URL in den Serverprotokollen und beheben Sie ihn. Wenn die Seite absichtlich entfernt wurde, geben Sie anstelle eines Fehlers 404 oder 410 zurück oder leiten Sie zu einer verwandten Seite weiter.",
  "Kırık iç bağlantı": "Defekter interner Link",
  "Bu sayfa, hata veren (4xx ya da 5xx) başka bir sayfaya bağlantı veriyor. Kırık bağlantı ziyaretçiyi çıkmaza sokar ve Google'ın sayfaya ulaşmasını engeller; çok büyük sitelerde taramayı da boşa harcar.":
    "Diese Seite verlinkt auf eine andere Seite, die einen Fehler zurückgibt (4xx oder 5xx). Ein defekter Link führt Besucher in eine Sackgasse und verhindert, dass Google die Seite erreicht; auf sehr großen Websites verschwendet er außerdem Crawling-Kapazität.",
  "Bağlantıyı çalışan doğru adrese çevirin ya da kaldırın. Hedef taşındıysa yönlendirmeye güvenmeyin, doğrudan yeni adrese bağlanın.":
    "Lassen Sie den Link auf die richtige, funktionierende URL zeigen oder entfernen Sie ihn. Wenn das Ziel umgezogen ist, verlassen Sie sich nicht auf eine Weiterleitung: Verlinken Sie direkt auf die neue URL.",
  "Sayfa açılırken hata veriyor (4xx)": "Seite gibt einen Fehler zurück (4xx)",
  "Bu adres hata döndürdü (404 gibi). Site haritanızda ya da başka sayfalarda geçiyorsa Google boşuna istek yapmaya devam eder; bu, esas olarak çok büyük sitelerde tarama bütçesi açısından önemlidir.":
    "Diese URL hat einen Fehler zurückgegeben (z. B. 404). Wenn sie in Ihrer Sitemap oder auf anderen Seiten erscheint, fordert Google sie ständig umsonst an; das ist vor allem für das Crawling-Budget sehr großer Websites von Bedeutung.",
  "Sayfa var olmalıysa geri yayınlayın. Bilerek kaldırıldıysa site haritasından ve iç bağlantılardan çıkarın; yerine geçecek bir sayfa varsa oraya 301 (kalıcı) yönlendirme verin.":
    "Wenn die Seite existieren sollte, veröffentlichen Sie sie erneut. Wenn Sie sie absichtlich entfernt haben, nehmen Sie sie aus der Sitemap und den internen Links; wenn eine andere Seite sie ersetzt, richten Sie dorthin eine 301-Weiterleitung (dauerhaft) ein.",
  "Yönlendirme zinciri": "Weiterleitungskette",
  "Son sayfaya ulaşmak için art arda iki ya da daha fazla yönlendirme gerekiyor. Her adım sayfayı yavaşlatır ve tarama bütçesinden (Google'ın siteniz için ayırdığı tarama zamanından) harcar; bu, esas olarak çok büyük siteler için önemlidir. Çok uzun zincirler (10 adımdan fazla) Google'ın takip ettiği kadarıyla hiç izlenmez.":
    "Um die endgültige Seite zu erreichen, sind zwei oder mehr Weiterleitungen hintereinander nötig. Jede Weiterleitung verlangsamt die Seite und verbraucht Crawling-Budget (die Crawling-Zeit, die Google für Ihre Website vorsieht); das ist vor allem bei sehr großen Websites wichtig. Sehr lange Ketten (mehr als 10 Weiterleitungen) verfolgt Google gar nicht.",
  "İlk adresi ve ona bağlantı veren sayfaları doğrudan son hedefe yönlendirin; en fazla tek yönlendirme kalsın.":
    "Leiten Sie die erste URL und die darauf verlinkenden Seiten direkt zum endgültigen Ziel weiter, sodass höchstens eine Weiterleitung verbleibt.",
  "Yönlendirme döngüsü": "Weiterleitungsschleife",
  "Bu adresin yönlendirmesi dönüp dolaşıp kendine geliyor, yani sayfa hiç açılmıyor. Tarayıcılar ve Google hata verip vazgeçer.":
    "Die Weiterleitungen dieser URL führen im Kreis zu ihr selbst zurück, daher lädt die Seite nie. Browser und Google geben mit einem Fehler auf.",
  "Bu adresin yönlendirme kurallarını izleyip döngüyü kırın; zincir gerçekten açılan bir sayfada (200) bitmeli.":
    "Gehen Sie den Weiterleitungsregeln dieser URL nach und durchbrechen Sie die Schleife; die Kette sollte auf einer Seite enden, die tatsächlich lädt (200).",
  "Hiçbir sayfadan bağlantı almayan sayfa":
    "Seite, auf die keine Links verweisen",
  "Taranan hiçbir sayfa bu adrese bağlantı vermiyor. Google sayfaları bağlantıları izleyerek bulur, bu yüzden böyle bir sayfa daha seyrek taranır ve ziyaretçi gezinerek ona ulaşamaz.":
    "Keine gecrawlte Seite verlinkt auf diese URL. Google findet Seiten, indem es Links folgt; eine solche Seite wird daher seltener gecrawlt, und Besucher erreichen sie beim Navigieren nicht.",
  "İlgili sayfalardan buraya bağlantı verin (menü, ilgili yazılar, kategori sayfası). Sayfanın aramada çıkması gerekmiyorsa site haritasından da çıkarın.":
    "Verlinken Sie sie von verwandten Seiten aus (Menü, ähnliche Beiträge, eine Kategorieseite). Wenn die Seite nicht in der Suche erscheinen muss, entfernen Sie sie auch aus der Sitemap.",
  "Sunucu yanıtı yavaş": "Langsame Serverantwort",
  "Sunucu sayfanın HTML'ini 600 milisaniyeden geç verdi; Lighthouse de aynı eşiği kullanır. Bu gecikme sayfanın geri kalan tüm hız ölçümlerini de aşağı çeker. Süre, denetimi çalıştıran bilgisayardan ölçülür, ziyaretçilerinizin bağlantısından değil.":
    "Der Server hat länger als 600 Millisekunden gebraucht, um das HTML der Seite auszuliefern; Lighthouse verwendet denselben Schwellenwert. Diese Verzögerung verschlechtert auch alle anderen Geschwindigkeitsmessungen der Seite. Die Zeit wird von dem Computer aus gemessen, auf dem das Audit läuft, nicht über die Verbindungen Ihrer Besucher.",
  "Bu sayfa için sunucu ve veritabanı süresine bakın, önbelleği açın. Önbelleğe alınmış ya da önceden üretilmiş (statik) HTML sunmak genelde sorunu çözer.":
    "Sehen Sie sich die Server- und Datenbankzeit für diese Seite an und aktivieren Sie das Caching. Die Bereitstellung von zwischengespeichertem oder vorgefertigtem (statischem) HTML löst das Problem normalerweise.",
  "robots.txt dosyası sunucu hatası veriyor":
    "robots.txt gibt einen Serverfehler zurück",
  "robots.txt dosyanız 5xx sunucu hatası veriyor. Google'ın belgelerine göre bu durumda ilk 12 saat siteyi hiç taramaz, sonra 30 gün boyunca dosyanın son çalışan kopyasını kullanır. Yani bu tek dosyanın hatası tüm sitenin taranmasını etkiler.":
    "Ihre robots.txt-Datei gibt einen 5xx-Serverfehler zurück. Laut der Dokumentation von Google crawlt Google die Website dann in den ersten 12 Stunden überhaupt nicht und verwendet in den folgenden 30 Tagen die letzte funktionierende Kopie der Datei. Ein Fehler in dieser einen Datei wirkt sich also auf das Crawling der gesamten Website aus.",
  "Sunucu hatasını giderin ve robots.txt adresinin normal açıldığını doğrulayın. Dosya hiç yoksa 404 döndürmesi sorun değildir; Google bunu 'kısıtlama yok' diye okur.":
    "Beheben Sie den Serverfehler und prüfen Sie, ob die robots.txt-URL normal lädt. Wenn die Datei gar nicht existiert, ist ein 404 in Ordnung; Google versteht das als „keine Einschränkungen“.",
  "robots.txt'ye ulaşılamadı": "robots.txt nicht erreichbar",
  "robots.txt isteği tamamlanmadı (zaman aşımı, DNS ya da TLS hatası). Bu denetim dosyayı okuyamadığı için siteyi tamamen taranabilir saydı; gerçek robots.txt farklı kurallar içeriyor olabilir.":
    "Die robots.txt-Anfrage wurde nicht abgeschlossen (Zeitüberschreitung, DNS- oder TLS-Fehler). Da dieses Audit die Datei nicht lesen konnte, wurde die gesamte Website als crawlbar behandelt; die echte robots.txt kann andere Regeln enthalten.",
  "robots.txt adresini tarayıcıda açıp yanıt verdiğini kontrol edin. Yanıt veriyorsa hata geçici bir ağ sorunuydu, denetimi yeniden başlatın.":
    "Öffnen Sie die robots.txt-URL in einem Browser und prüfen Sie, ob sie antwortet. Wenn ja, war der Fehler ein vorübergehendes Netzwerkproblem; führen Sie das Audit erneut aus.",
  "robots.txt 500 KiB sınırını aşıyor":
    "robots.txt überschreitet die 500-KiB-Grenze",
  "Google robots.txt dosyasının yalnızca ilk 500 KiB'ını okur, gerisini yok sayar. Dosyanız bu sınırı aştığı için sondaki kurallar Google için yokmuş gibi davranır.":
    "Google liest nur die ersten 500 KiB einer robots.txt-Datei und ignoriert den Rest. Ihre Datei überschreitet diese Grenze, sodass die Regeln am Ende für Google nicht gelten.",
  "Dosyayı kısaltın. Tek tek adresleri engellemek yerine klasör kalıpları kullanın. Aramada çıkmaması gereken sayfalar için robots.txt yerine noindex daha kesin bir yoldur. Ama noindex'in çalışması için sayfanın robots.txt ile engellenmemiş olması gerekir; Google engellenmiş sayfadaki noindex'i göremez.":
    "Kürzen Sie die Datei. Verwenden Sie Ordnermuster, statt URLs einzeln zu blockieren. Für Seiten, die nicht in der Suche erscheinen sollen, ist noindex ein zuverlässigeres Mittel als robots.txt. Damit noindex wirkt, darf die Seite jedoch nicht durch robots.txt blockiert sein; Google kann ein noindex auf einer blockierten Seite nicht sehen.",
  "Başlangıç adresi robots.txt ile engellenmiş":
    "Start-URL wird durch robots.txt blockiert",
  "Denetimi başlattığınız adresi sitenizin kendi robots.txt dosyası taramaya kapatıyor. Google da bu kurala uyar, yani bu sayfayı taramaz. Bu denetim de aynı nedenle o sayfadan başlayamadı.":
    "Die robots.txt Ihrer Website blockiert das Crawlen der URL, von der aus Sie das Audit gestartet haben. Google befolgt diese Regel ebenfalls und crawlt diese Seite daher nicht. Aus demselben Grund konnte dieses Audit dort nicht beginnen.",
  "Sayfanın taranması gerekiyorsa robots.txt'teki ilgili Disallow satırını kaldırın. Engel bilerek konduysa denetimi taranabilir bir adresten başlatın.":
    "Wenn die Seite gecrawlt werden soll, entfernen Sie die passende Disallow-Zeile aus robots.txt. Wenn die Sperre beabsichtigt ist, starten Sie das Audit von einer crawlbaren URL aus.",
  "Site haritasındaki sayfa açılmıyor": "Sitemap-Seite wird nicht geladen",
  "Bu adres site haritanızda listelenmiş ama hata veriyor. Site haritası Google'a 'şu sayfaları tara' demenin yoludur; açılmayan adres listelemek Google'ı boşa gönderir ve haritanıza güveni azaltır.":
    "Diese URL ist in Ihrer Sitemap aufgeführt, gibt aber einen Fehler zurück. Mit einer Sitemap sagen Sie Google „crawle diese Seiten“; URLs aufzuführen, die nicht laden, schickt Google auf vergebliche Wege und macht Ihre Sitemap weniger vertrauenswürdig.",
  "Sayfa var olmalıysa hatayı giderin. Kaldırıldıysa adresi site haritasından çıkarın. Harita otomatik üretiliyorsa, silinen sayfaları listelememesi için üreticinin ayarını kontrol edin.":
    "Wenn die Seite vorhanden sein sollte, beheben Sie den Fehler. Wenn sie entfernt wurde, entfernen Sie die URL aus der Sitemap. Wenn die Sitemap automatisch generiert wird, überprüfen Sie die Einstellungen des Generators, damit gelöschte Seiten nicht mehr aufgelistet werden.",
  "Site haritasındaki sayfa yönlendiriyor": "Sitemap-Seite leitet weiter",
  "Bu adres site haritanızda listelenmiş ama başka bir adrese yönlendiriyor. Google site haritasındaki adresleri 'asıl adres' önerisi sayar (asıl adres: aynı sayfanın aramada gösterilmesini istediğiniz tek adres). Yani asıl olmadığını kendiniz söylediğiniz bir adresi öneriyorsunuz.":
    "Diese URL wird in Ihrer Sitemap aufgeführt, leitet jedoch zu einer anderen URL weiter. Google behandelt Sitemap-URLs als kanonische Vorschläge (die kanonische URL ist die URL, die bei der Suche nach einer Seite angezeigt werden soll). Sie schlagen also eine URL vor, von der Sie selbst sagen, dass sie nicht kanonisch ist.",
  "Site haritasında yönlendirmenin kaynağını değil, vardığı hedef adresi listeleyin.":
    "Führen Sie die Ziel-URL der Weiterleitung in der Sitemap auf, nicht ihre Quelle.",
  "Site haritasındaki adres robots.txt ile engellenmiş":
    "Sitemap-URL wird von robots.txt blockiert",
  "Bu adres için iki kural çelişiyor: site haritası Google'a 'bunu tara' derken robots.txt 'tarama' diyor. Google robots.txt'ye uyar ve sayfayı taramaz; başka sitelerden bağlantı alıyorsa içeriğini görmeden yine de dizine alabilir.":
    "Für diese URL widersprechen sich zwei Regeln: Die Sitemap sagt Google „crawle das“, robots.txt dagegen „nicht“. Google folgt robots.txt und crawlt die Seite nicht; wenn andere Websites darauf verlinken, indexiert Google sie möglicherweise trotzdem, ohne ihren Inhalt zu sehen.",
  "Sayfanın aramada çıkmasını istiyorsanız robots.txt engelini kaldırın. İstemiyorsanız adresi site haritasından çıkarın.":
    "Wenn Sie die Seite in der Suche haben möchten, entfernen Sie die Sperre in robots.txt. Wenn nicht, entfernen Sie die URL aus der Sitemap.",
  "Site haritasındaki sayfa, asıl adres olarak başka sayfayı gösteriyor":
    "Sitemap-Seite nennt eine andere Seite als kanonisch",
  "Bu sayfa site haritasında listelenmiş ama kendi içinde asıl adres olarak başka bir adresi gösteriyor. Aynı sayfa için iki farklı öneri göndermiş oluyorsunuz; Google birini seçer. Bilerek yaptıysanız sorun yok.":
    "Diese Seite ist in der Sitemap aufgeführt, ihr eigenes Canonical-Tag verweist jedoch auf eine andere URL. Sie senden zwei verschiedene Vorschläge für dieselbe Seite, und Google wählt einen aus. Wenn Sie das absichtlich so eingerichtet haben, ist es in Ordnung.",
  "Site haritasında yalnızca asıl adresler olmalı: bu adresi haritadan çıkarın ya da sayfanın canonical (asıl adres) etiketini sayfanın kendi adresine çevirin.":
    "Eine Sitemap sollte nur kanonische URLs enthalten: Entfernen Sie diese URL aus der Sitemap oder ändern Sie das Canonical-Tag der Seite auf ihre eigene URL.",
  "Site haritasındaki sayfa arama sonuçlarından gizlenmiş":
    "Sitemap-Seite ist aus den Suchergebnissen ausgeblendet",
  "Bu sayfa site haritasında listelenmiş ama noindex ile aramadan gizlenmiş. Yani hem 'bunu tara' hem 'bunu gösterme' diyorsunuz. Sayfayı yeni gizlediyseniz bu geçici olabilir: Google noindex'i görmek için sayfayı bir kez daha taramalı.":
    "Diese Seite ist in der Sitemap aufgeführt, aber per noindex aus der Suche ausgeblendet. Sie sagen also sowohl „crawle das“ als auch „zeige das nicht“. Wenn Sie die Seite gerade erst ausgeblendet haben, ist das möglicherweise vorübergehend: Google muss die Seite noch einmal crawlen, um das noindex zu sehen.",
  "Sayfa aramada çıkacaksa noindex'i kaldırın. Kalıcı olarak gizli kalacaksa, Google noindex'i gördükten sonra adresi site haritasından çıkarın.":
    "Wenn die Seite in der Suche erscheinen soll, entfernen Sie das noindex. Soll sie dauerhaft ausgeblendet bleiben, entfernen Sie die URL aus der Sitemap, sobald Google das noindex erkannt hat.",
  "Sayfa site yapısında çok derinde":
    "Seite liegt tief in der Website-Struktur",
  "Bu sayfa ana sayfadan 5 ya da daha fazla tık uzakta. Derin sayfalar Google tarafından daha seyrek taranabilir ve ziyaretçinin bulması zorlaşır.":
    "Diese Seite ist 5 oder mehr Klicks von der Startseite entfernt. Google crawlt tiefe Seiten möglicherweise seltener und Besucher haben es schwerer, sie zu finden.",
  "Kategori sayfaları, menü ya da öne çıkan listeler gibi üst sayfalardan buraya bağlantı vererek yolu kısaltın.":
    "Verkürzen Sie den Pfad, indem Sie von übergeordneten Seiten wie Kategorieseiten, dem Menü oder Feature-Listen hierher verlinken.",
  "Site haritası dosyası okunamayacak kadar büyük":
    "Sitemap-Datei ist zu groß zum Lesen",
  "Site haritası parçalarından biri bu aracın okuma sınırını (10 MB) aştı, bu yüzden içindeki adresler bu denetime girmedi. Google'ın sınırı 50 MB olduğundan dosya Google için geçerli olabilir; ama buradaki sayfa listesi eksik.":
    "Eine der Sitemap-Dateien hat das Leselimit dieses Tools (10 MB) überschritten, daher wurden die darin enthaltenen URLs in diesem Audit nicht berücksichtigt. Das Limit von Google liegt bei 50 MB; die Datei ist für Google also möglicherweise gültig, die Seitenliste hier ist jedoch unvollständig.",
  "Site haritanızı daha küçük parçalara bölün ve bir site haritası dizini (sitemapindex) ile birbirine bağlayın. Her parça 50 MB ve 50.000 adresin altında kalmalı; daha küçük parçalar iki tarafın da işine yarar.":
    "Teilen Sie Ihre Sitemap in kleinere Dateien auf und fassen Sie sie mit einem Sitemap-Index (sitemapindex) zusammen. Halten Sie jede Datei unter 50 MB und 50.000 URLs; kleinere Dateien funktionieren für beide Tools besser.",
  "Site haritasında 50.000'den fazla adres var":
    "Sitemap hat mehr als 50.000 URLs",
  "Google bir site haritası dosyasında en fazla 50.000 adrese izin verir. Bu parça sınırı aşıyor; Google dosyayı reddedebilir ya da bir kısmını yok sayabilir.":
    "Google erlaubt höchstens 50.000 URLs in einer Sitemap-Datei. Diese Datei überschreitet das Limit; Google lehnt sie möglicherweise ab oder ignoriert einen Teil davon.",
  "Dosyayı her biri 50.000 adresin altında kalan parçalara bölün ve hepsini bir site haritası dizini (sitemapindex) dosyasında listeleyin. Search Console'a parçaları tek tek değil, yalnızca dizin dosyasını gönderin.":
    "Teilen Sie die Datei in Teile mit jeweils weniger als 50.000 URLs auf und führen Sie alle in einer Sitemap-Indexdatei (sitemapindex) auf. Reichen Sie in der Search Console nur die Indexdatei ein, nicht jeden Teil.",
  "Site haritasında hiç lastmod tarihi yok": "Sitemap hat keine lastmod-Daten",
  "Site haritasındaki adreslerin hiçbirinde <lastmod> (son değişiklik tarihi) yok. Google bu alan doğru olduğu sürece hangi sayfayı ne zaman yeniden tarayacağını buna göre seçer. Yoksa yeniden tarama Google'ın kendi takvimine kalır; güncellediğiniz sayfanın fark edilmesi günler sürebilir.":
    "Keine der URLs in der Sitemap hat ein <lastmod> (Datum der letzten Änderung). Solange dieses Feld korrekt ist, entscheidet Google damit, welche Seiten wann erneut gecrawlt werden. Ohne dieses Feld folgt das erneute Crawlen Googles eigenem Zeitplan, und es kann Tage dauern, bis eine aktualisierte Seite bemerkt wird.",
  "Site haritasını üreten ayarda ya da eklentide her adres için <lastmod> açın ve içeriğin gerçekten değiştiği tarihi yazdırın. Yayın tarihini ya da her derlemedeki anı yazmayın; bu alanı değersiz kılar.":
    "Aktivieren Sie <lastmod> für jede URL in der Einstellung oder dem Plugin, das Ihre Sitemap erzeugt, und lassen Sie das Datum eintragen, an dem sich der Inhalt tatsächlich geändert hat. Tragen Sie nicht das Veröffentlichungsdatum oder den Zeitpunkt jedes Builds ein; das macht das Feld wertlos.",
  "Site haritasında gelecek tarihli lastmod var":
    "Sitemap hat ein lastmod-Datum in der Zukunft",
  "En az bir adresin <lastmod> (son değişiklik tarihi) değeri gelecekte. Bu doğru olamaz; Google bir sitenin tarihlerini tutarsız bulursa alanı o site için tümden yok sayar, yani doğru tarihleriniz de işe yaramaz.":
    "Mindestens eine URL hat ein <lastmod> (Datum der letzten Änderung) in der Zukunft. Das kann nicht stimmen; wenn Google die Datumsangaben einer Website für unzuverlässig hält, ignoriert es das Feld für die gesamte Website, sodass auch Ihre korrekten Daten nicht mehr helfen.",
  "Tarihleri üreten yeri kontrol edin. Genelde sunucu saatinin ileri olmasından ya da tarih alanına içerik tarihi yerine yayın planı tarihinin yazılmasından olur; düzeltip site haritasını yeniden üretin.":
    "Prüfen Sie, was die Datumsangaben erzeugt. Meist ist es eine vorgehende Serveruhr oder ein geplantes Veröffentlichungsdatum, das statt des Inhaltsdatums in das Feld geschrieben wird. Beheben Sie das und erzeugen Sie die Sitemap neu.",
  "Sayfanın ihtiyaç duyduğu dosya robots.txt ile engellenmiş":
    "Eine Datei, die die Seite benötigt, wird von robots.txt blockiert",
  "Sayfa taranabiliyor ama içindeki bir JavaScript ya da CSS dosyası robots.txt ile kapatılmış. Google engellenen dosyadaki JavaScript'i çalıştırmaz ve CSS'i okuyamaz; içerik JavaScript ile geliyorsa Google boş bir sayfa görür. Klasik örnek `Disallow: /wp-includes/` kuralıdır.":
    "Die Seite kann gecrawlt werden, aber eine von ihr verwendete JavaScript- oder CSS-Datei wird von robots.txt blockiert. Google führt kein JavaScript aus einer blockierten Datei aus und kann deren CSS nicht lesen; wenn Inhalte per JavaScript geladen werden, sieht Google eine leere Seite. Das klassische Beispiel ist eine `Disallow: /wp-includes/`-Regel.",
  "robots.txt'den bu dosyaları kapsayan kuralı kaldırın. Sayfayı gizlemek istiyorsanız sayfanın kendisini engelleyin; onu oluşturan dosyaları engellemek sayfayı gizlemez, yalnızca Google'ın yanlış görmesine yol açar.":
    "Entfernen Sie die robots.txt-Regel, die diese Dateien erfasst. Wenn Sie die Seite ausblenden möchten, blockieren Sie die Seite selbst; das Blockieren der Dateien, aus denen sie aufgebaut ist, blendet sie nicht aus, sondern führt nur dazu, dass Google sie falsch sieht.",
  "İç bağlantı yönlendirmeye gidiyor":
    "Interner Link verweist auf eine Weiterleitung",
  "Bu sayfa sitenizdeki bir adrese bağlantı veriyor ama o adres başka bir yere yönlendiriyor. Bağlantı çalışır ama fazladan bir adım atılır: ziyaretçi bekler ve Google yönlendirmeyi de izlemek zorunda kalır (tarama bütçesi esas olarak çok büyük sitelerde önemlidir). Genelde adresler değişip iç bağlantılar eskisinde kalınca olur.":
    "Diese Seite verlinkt auf eine URL auf Ihrer Website, diese URL leitet jedoch an eine andere Stelle weiter. Der Link funktioniert, allerdings mit einem zusätzlichen Schritt: Besucher warten, und auch Google muss der Weiterleitung folgen (Crawling-Budget spielt vor allem bei sehr großen Websites eine Rolle). Dies geschieht normalerweise, wenn sich URLs ändern und interne Links die alte beibehalten.",
  "Bağlantıyı yönlendirmenin vardığı yeni adresle değiştirin. Yönlendirmenin kendisi kalsın; dışarıdan gelen bağlantılar için gerekli. Düzeltilecek olan kendi sitenizin içinden verdiğiniz adrestir.":
    "Ersetzen Sie den Link durch die neue URL, zu der die Weiterleitung führt. Behalten Sie die Weiterleitung selbst bei; Links von anderen Websites brauchen sie weiterhin. Korrigiert werden muss die URL, auf die Sie innerhalb Ihrer eigenen Website verlinken.",
  "Sayfa güvenli olmayan http ile açılıyor":
    "Seite wird über unsicheres http geladen",
  'Sayfa şifreli (https) yerine düz http ile sunuluyor. Tarayıcılar adres çubuğunda "Güvenli değil" uyarısı gösterir, formlara girilen bilgiler başkalarınca görülebilir ve Google https\'i hafif bir sıralama işareti sayar. Aynı içeriğin iki sürümü varsa https olanı tercih eder.':
    "Die Seite wird über einfaches http statt über verschlüsseltes https bereitgestellt. Browser zeigen in der Adressleiste eine Warnung „Nicht sicher“ an, in Formulare eingegebene Informationen können von anderen gesehen werden und Google behandelt https als schwaches Ranking-Signal. Wenn in beiden Versionen derselbe Inhalt vorhanden ist, bevorzugt Google die https-Version.",
  'Barındırma firmanızdan ya da site oluşturucunuzun ayarlarından ücretsiz bir SSL sertifikası açın. Sonra tüm http adreslerini kalıcı yönlendirmeyle (301) https karşılığına gönderin; "http://siteniz.com/hakkimizda" açılınca "https://siteniz.com/hakkimizda" adresine geçilsin.':
    "Aktivieren Sie bei Ihrem Hosting-Anbieter oder in den Einstellungen Ihres Website-Baukastens ein kostenloses SSL-Zertifikat. Leiten Sie dann jede http-URL mit einer dauerhaften Weiterleitung (301) auf ihr https-Gegenstück um, sodass „http://yoursite.com/about“ zu „https://yoursite.com/about“ führt.",
  "Güvenli sayfada güvensiz kaynak":
    "Unsichere Ressource auf einer sicheren Seite",
  "Bu https sayfa, http ile yüklenen bir betik ya da stil dosyası istiyor. Tarayıcılar bunu engeller: betik çalışmaz, stil uygulanmaz. Google'ın sayfayı işlerken bu dosyayı yükleyememesi de mümkündür; bu yüzden sayfa sizin gördüğünüzden farklı işlenebilir. Adres çubuğundaki kilit de bozulur.":
    "Diese https-Seite lädt ein Skript oder Stylesheet über http. Browser blockieren es: Das Skript wird nicht ausgeführt und die Stile werden nicht angewendet. Möglicherweise kann auch Google die Datei beim Rendern nicht laden, sodass die Seite anders verarbeitet wird, als Sie sie sehen. Auch das Schloss-Symbol in der Adressleiste verschwindet.",
  "Dosyanın adresini https'e çevirin. Dosya https sunmuyorsa kendi sunucunuza alın ya da https sunan bir alternatifle değiştirin.":
    "Ändern Sie die URL der Datei in https. Wenn die Datei nicht über https verfügbar ist, hosten Sie sie auf Ihrem eigenen Server oder ersetzen Sie sie durch eine Alternative, die https unterstützt.",
  "Karakter kodlaması belirtilmemiş":
    "Die Zeichenkodierung ist nicht deklariert",
  "Ne sunucu yanıtında ne de sayfanın ilk 1024 baytında karakter kodlaması (charset) belirtilmiş. Bu durumda tarayıcı ve Google kodlamayı tahmin eder; yanlış tahmin ettiğinde Türkçe karakterler (ş, ğ, ı) bozuk görünür.":
    "Weder die Serverantwort noch die ersten 1024 Bytes der Seite deklarieren eine Zeichenkodierung (Charset). Browser und Google raten dann die Kodierung; wenn sie falsch raten, werden nicht-englische Zeichen (wie ş, ğ, ı) verstümmelt angezeigt.",
  'Sayfanın <head> bölümünün en başına `<meta charset="utf-8">` ekleyin. Şablondan üretiliyorsa şablonda bir kez eklemeniz yeter.':
    'Fügen Sie `<meta charset="utf-8">` ganz am Anfang des <head> der Seite hinzu. Wenn Seiten aus einer Vorlage stammen, genügt es, das Tag einmal in der Vorlage einzufügen.',
  "Sayfa adresi çok uzun": "Seiten-URL ist zu lang",
  "Sayfanın adresi 115 karakterden uzun. Google için katı bir sınır yok ve sıralamayı etkilemez; ama uzun adres paylaşırken kırılır, arama sonucunda kısalarak görünür ve yazarken hata yapılmasına yol açar. Çoğu zaman adrese sorgu parametreleri ya da gereksiz klasörler eklenmiştir.":
    "Die URL der Seite ist länger als 115 Zeichen. Google hat kein festes Limit, und es wirkt sich nicht auf das Ranking aus, aber eine lange URL bricht beim Teilen, erscheint in den Suchergebnissen gekürzt und lädt zu Tippfehlern ein. Meist wurden Abfrageparameter oder unnötige Ordner hinzugefügt.",
  "Adresi kısa ve anlamlı tutun: klasör derinliğini azaltın, gereksiz kelimeleri ve parametreleri çıkarın. Adresi değiştirirseniz eskisinden yenisine 301 yönlendirme verin.":
    "Halten Sie URLs kurz und aussagekräftig: Reduzieren Sie die Ordnertiefe und löschen Sie unnötige Wörter und Parameter. Wenn Sie eine URL ändern, fügen Sie eine 301-Weiterleitung von der alten zur neuen hinzu.",
  "Adreste büyük harf ya da alt çizgi var":
    "URL enthält Großbuchstaben oder Unterstriche",
  "Sayfa adresinin yol kısmında büyük harf ya da alt çizgi (_) var. Adresler büyük/küçük harfe duyarlıdır: /Hakkimizda ile /hakkimizda Google'a iki ayrı sayfa gibi görünebilir ve içerik çift dizine girer. Google ayrıca kelimeleri ayırmak için tire (-) kullanılmasını önerir.":
    "Der Pfad der URL der Seite enthält Großbuchstaben oder Unterstriche (_). URLs unterscheiden zwischen Groß- und Kleinschreibung: /About und /about können für Google wie zwei getrennte Seiten aussehen, und der Inhalt wird doppelt indexiert. Google empfiehlt außerdem Bindestriche (-) zur Worttrennung.",
  "Adresleri küçük harf ve tireyle yazın. Büyük harfli adrese gelenleri küçük harfli adrese 301 ile yönlendirin ve asıl adresi (canonical) küçük harfli olarak belirtin.":
    "Schreiben Sie URLs in Kleinbuchstaben mit Bindestrichen. Leiten Sie Besucher, die über eine URL mit Großbuchstaben kommen, per 301 auf die kleingeschriebene URL um, und deklarieren Sie die kleingeschriebene URL als kanonisch.",
  "Başlık etiketi yok": "Kein Titel-Tag",
  "Sayfanın başlık etiketi (<title>) yok. Başlık, arama sonucunda mavi bağlantı olarak görünen yazıdır. Yoksa Google başlığı sayfadaki başlıklardan ya da başka bağlantı metinlerinden türetir; bu, sizin seçmeyeceğiniz bir metin olabilir.":
    "Die Seite hat kein Titel-Tag (<title>). Der Titel ist der Text, der in den Suchergebnissen als blauer Link erscheint. Ohne Titel bildet Google einen aus den Überschriften der Seite oder anderem Linktext, und das ist möglicherweise nicht der Text, den Sie wählen würden.",
  "Sayfaya konusunu anlatan, sayfaya özgü bir <title> ekleyin (yaklaşık 50-60 karakter bir ölçüttür, kural değil). SEO eklentisi ya da site oluşturucunuz varsa başlık alanını doldurmanız yeter.":
    "Fügen Sie ein <title> hinzu, das nur für diese Seite gilt und ihr Thema beschreibt (etwa 50–60 Zeichen sind ein Richtwert, keine Regel). Wenn Sie ein SEO-Plugin oder einen Website-Baukasten verwenden, genügt es, dessen Titelfeld auszufüllen.",
  "Meta açıklama yok": "Keine Meta-Beschreibung",
  "Sayfanın meta açıklaması yok. Bu, arama sonucunda başlığın altında görünen kısa özet yazısıdır. Yoksa Google özeti sayfa metninden kendisi seçer; bu özet sizin vermek istediğiniz mesaj olmayabilir.":
    "Die Seite hat keine Meta-Beschreibung. Das ist die kurze Zusammenfassung, die in den Suchergebnissen unter dem Titel erscheint. Ohne sie wählt Google selbst einen Ausschnitt aus dem Seitentext, und das ist möglicherweise nicht die Botschaft, die Sie vermitteln möchten.",
  "Sayfayı özetleyen ve tıklamak için bir neden veren bir meta açıklama yazın. Yaklaşık 70-160 karakter bir ölçüttür, kural değil; Google sınır koymaz, kesilme ekran genişliğine göre değişir.":
    "Schreiben Sie eine Meta-Beschreibung, die die Seite zusammenfasst und einen Grund zum Klicken gibt. Etwa 70–160 Zeichen sind ein Richtwert, keine Regel; Google legt kein Limit fest, und wo sie abgeschnitten wird, hängt von der Bildschirmbreite ab.",
  "H1 başlığı yok": "Keine H1-Überschrift",
  "Sayfada H1 (ana başlık) yok. Google H1'i zorunlu tutmaz, ama başlıklar ziyaretçinin sayfanın konusunu ilk bakışta anlamasını ve ekran okuyucuyla gezinmeyi kolaylaştırır; Google da başlıkları sayfanın yapısını anlamak için kullanabilir.":
    "Die Seite hat keine H1 (Hauptüberschrift). Google verlangt kein H1, aber Überschriften helfen den Besuchern, das Thema der Seite auf einen Blick zu erfassen und erleichtern die Navigation mit dem Screenreader. Google verwendet möglicherweise auch Überschriften, um die Struktur der Seite zu verstehen.",
  "Sayfaya konusunu anlatan tek bir H1 ekleyin; başlık etiketiyle uyumlu olsun.":
    "Fügen Sie ein einzelnes H1 hinzu, das das Thema der Seite entsprechend dem Titel-Tag beschreibt.",
  "Birden çok H1 başlığı": "Mehrere H1-Überschriften",
  "Sayfada birden fazla H1 var. Google bunu sorun etmez, yani ceza yok. Ama çoğu zaman şablon hatasının işaretidir; örneğin logo ile sayfa başlığının ikisi de H1 olmuştur.":
    "Die Seite hat mehr als ein H1. Da Google nichts dagegen hat, gibt es keine Strafe. Aber es ist oft ein Zeichen für einen Vorlagenfehler, etwa wenn sowohl das Logo als auch der Seitentitel H1s sind.",
  "Ana başlık için tek H1 bırakın, diğerlerini H2 ya da H3 yapın. Logo gibi başlık olmayan öğelerden H1 etiketini kaldırın.":
    "Behalten Sie eine H1 für die Hauptüberschrift und machen Sie die anderen H2 oder H3. Entfernen Sie das H1-Tag von Elementen, die keine Überschriften sind, wie zum Beispiel dem Logo.",
  "Sayfada neredeyse hiç metin yok": "Seite enthält fast keinen Text",
  "Bu sayfada neredeyse hiç görünür metin bulunamadı. Genelde içeriğin JavaScript ile sonradan yüklenmesi ve ilk gelen HTML'de yer almaması yüzünden olur. Metnin kısa olması sorun değil; sorun sayfanın boş görünmesi, çünkü Google boş sayfayı dizine almak istemez.":
    "Auf dieser Seite wurde fast kein sichtbarer Text gefunden. Das passiert meist, wenn Inhalte später per JavaScript geladen werden und nicht im ursprünglichen HTML stehen. Kurzer Text ist nicht das Problem; das Problem ist, dass die Seite leer wirkt, denn Google möchte keine leeren Seiten indexieren.",
  "Sayfayı açıp metnin göründüğünü, sonra sağ tık > Sayfa kaynağını görüntüle ile aynı metnin orada da olduğunu kontrol edin. Yoksa içeriği sunucu tarafında üretin. Sayfa gerçekten boşsa noindex ekleyin ya da daha dolu bir sayfayla birleştirin.":
    "Öffnen Sie die Seite und prüfen Sie, ob der Text angezeigt wird; prüfen Sie dann über Rechtsklick > Seitenquelltext anzeigen, ob derselbe Text auch dort steht. Wenn nicht, rendern Sie den Inhalt auf dem Server. Wenn die Seite wirklich leer ist, fügen Sie noindex hinzu oder führen Sie sie mit einer umfangreicheren Seite zusammen.",
  "Alt metni olmayan görseller": "Bilder ohne Alternativtext",
  "Sayfadaki bazı görsellerin alt metni (görseli anlatan kısa yazı) yok. Alt metin, görmeyen kullanıcılar için gereklidir ve Google'ın görselin ne olduğunu anlamasının başlıca yoludur.":
    "Einige Bilder auf der Seite haben keinen Alternativtext (eine kurze Beschreibung des Bildes). Alternativtext ist für blinde Nutzer unerlässlich und der wichtigste Weg, auf dem Google versteht, was ein Bild zeigt.",
  'Anlam taşıyan her görsele ne gösterdiğini anlatan kısa bir alt metin yazın. Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").':
    'Geben Sie jedem aussagekräftigen Bild einen kurzen Alternativtext, der beschreibt, was es zeigt. Lassen Sie den Alternativtext nur bei rein dekorativen Bildern leer (alt="").',
  "Sayfadan başka hiçbir yere bağlantı yok": "Seite verlinkt nirgendwo anders",
  "Bu sayfadan başka hiçbir sayfaya bağlantı verilmiyor, yani ziyaretçi ve Google için çıkmaz sokak. Google siteyi bağlantıları izleyerek gezer; buradan yeni bir yere gidemez.":
    "Diese Seite verlinkt auf keine andere Seite und ist damit eine Sackgasse für Besucher und für Google. Google bewegt sich durch eine Website, indem es Links folgt; von hier aus kommt es nirgendwohin weiter.",
  "İlgili sayfalara, üst kategoriye ya da ana sayfaya bağlantı ekleyin. Menü JavaScript ile oluşuyorsa, bağlantıların ilk gelen HTML'de de bulunduğundan emin olun.":
    "Fügen Sie Links zu verwandten Seiten, der übergeordneten Kategorie oder der Startseite hinzu. Wenn das Menü mit JavaScript erstellt wurde, stellen Sie sicher, dass sich seine Links auch im anfänglichen HTML-Code befinden.",
  "Başlık çok uzun": "Titel ist zu lang",
  "Başlık yaklaşık 60 karakteri aşıyor. Bu bir ölçüt, kural değil: Google karakter sınırı koymaz, arama sonucunda kesilme ekran genişliğine göre değişir. Uzun başlıkta en önemli kısım görünmeyebilir.":
    "Der Titel ist länger als etwa 60 Zeichen. Das ist ein Richtwert, keine Regel: Google legt keine Zeichenbegrenzung fest, und wo der Titel in den Suchergebnissen abgeschnitten wird, hängt von der Bildschirmbreite ab. Bei einem langen Titel wird der wichtigste Teil möglicherweise nicht angezeigt.",
  "Başlığı yaklaşık 50-60 karaktere indirin ve en önemli kelimeleri başa koyun.":
    "Kürzen Sie den Titel auf etwa 50–60 Zeichen und stellen Sie die wichtigsten Wörter an den Anfang.",
  "Başlık çok kısa": "Der Titel ist zu kurz",
  "Başlık 10 karakterden kısa. Bu kadar kısa bir başlık sayfanın ne sunduğunu anlatmaya ve tıklatmaya yetmez.":
    "Der Titel ist kürzer als 10 Zeichen. Ein so kurzer Titel kann weder sagen, was die Seite bietet, noch einen Klick gewinnen.",
  "Başlığı, sayfanın ne sunduğunu söyleyen bir ifadeye genişletin (yaklaşık 30-60 karakter).":
    "Erweitern Sie den Titel zu einer Formulierung, die sagt, was die Seite bietet (etwa 30–60 Zeichen).",
  "Meta açıklama çok uzun": "Meta-Beschreibung ist zu lang",
  "Meta açıklama yaklaşık 160 karakteri aşıyor. Bu bir ölçüt, kural değil: Google sınır koymaz, arama sonucunda kesilme ekran genişliğine göre değişir. Uzun açıklamada sondaki mesaj görünmeyebilir.":
    "Die Meta-Beschreibung ist länger als etwa 160 Zeichen. Das ist ein Richtwert, keine Regel: Google legt kein Limit fest, und wo sie in den Suchergebnissen abgeschnitten wird, hängt von der Bildschirmbreite ab. Bei einer langen Beschreibung wird die Botschaft am Ende möglicherweise nicht angezeigt.",
  "Ana mesajı başta tutarak açıklamayı yaklaşık 70-160 karaktere indirin.":
    "Kürzen Sie die Beschreibung auf etwa 70–160 Zeichen und behalten Sie die Kernaussage am Anfang.",
  "Meta açıklama çok kısa": "Meta-Beschreibung ist zu kurz",
  "Meta açıklama yaklaşık 70 karakterden kısa. Bu bir ölçüt, kural değil; ama bu kadar kısa yazı arama sonucundaki alanı boşa harcar ve Google bunun yerine sayfadan kendi seçtiği bir metni gösterebilir.":
    "Die Meta-Beschreibung ist kürzer als etwa 70 Zeichen. Das ist ein Richtwert, keine Regel; aber so kurzer Text verschenkt Platz in den Suchergebnissen, und Google zeigt stattdessen möglicherweise einen selbst gewählten Ausschnitt der Seite an.",
  "Açıklamayı, sayfayı özetleyen ve tıklamak için bir neden veren yaklaşık 70-160 karaktere genişletin.":
    "Erweitern Sie die Beschreibung auf etwa 70–160 Zeichen, die die Seite zusammenfassen und einen Grund zum Klicken geben.",
  "Başlık seviyeleri atlanmış": "Überschriftenebenen werden übersprungen",
  "Başlık seviyeleri atlanmış, örneğin H2'den sonra doğrudan H4 gelmiş. Bu, ekran okuyucuyla gezinen ziyaretçiler için sayfa yapısını karıştırır; Google için sıralama kuralı yoktur. Menü ve altbilgi başlıkları da bu sıralamaya dahil olduğundan bazen yanlış alarm olabilir.":
    "Überschriftenebenen werden übersprungen, zum Beispiel folgt ein H4 direkt auf ein H2. Das verwirrt die Seitenstruktur für Besucher, die mit einem Screenreader navigieren; Google hat keine Regel zur Reihenfolge. Überschriften in Menü und Fußzeile zählen ebenfalls zur Reihenfolge, daher kann es manchmal ein Fehlalarm sein.",
  "Başlıkları sırayla kullanın: H1, sonra H2, sonra H3. Seviye atlayan başlığı bir kademe yukarı çekin. Atlamanın menü ya da altbilgiden geldiğini görürseniz orada başlık etiketi yerine düz metin kullanın.":
    "Verwenden Sie die Überschriften in der Reihenfolge: H1, dann H2, dann H3. Verschieben Sie die Überschrift, die eine Ebene überspringt, um einen Schritt nach oben. Wenn das Überspringen aus dem Menü oder der Fußzeile stammt, verwenden Sie dort einfachen Text anstelle eines Überschriften-Tags.",
  "Mobil görünüm etiketi (viewport) yok": "Kein mobiles Viewport-Tag",
  'Sayfada mobil görünüm etiketi (`<meta name="viewport">`) yok. Google siteleri telefon sürümü üzerinden değerlendirir; bu etiket yoksa sayfa telefonda masaüstü genişliğinde açılır ve okumak için yakınlaştırmak gerekir. Bu denetim taranan her sayfaya bakar, bu yüzden bozuk bir şablon gözden kaçmaz.':
    'Die Seite hat kein mobiles Viewport-Tag (`<meta name="viewport">`). Google bewertet Websites anhand ihrer mobilen Version; ohne dieses Tag öffnet sich die Seite auf dem Smartphone in Desktop-Breite und muss zum Lesen vergrößert werden. Dieses Audit prüft jede gecrawlte Seite, damit eine fehlerhafte Vorlage nicht durchrutscht.',
  'Sayfanın `<head>` bölümüne `<meta name="viewport" content="width=device-width, initial-scale=1">` satırını ekleyin. Hemen her site için doğru değer budur.':
    'Fügen Sie `<meta name="viewport" content="width=device-width, initial-scale=1">` in den `<head>` der Seite ein. Das ist der richtige Wert für fast jede Website.',
  "Sayfa dili belirtilmemiş": "Seitensprache ist nicht deklariert",
  "Sayfanın `<html>` etiketinde `lang` (sayfa dili) yok. Ekran okuyucular doğru telaffuz için, tarayıcılar çeviri önerisi için buna bakar. Google dili içerikten de anlar, ama açıkça yazmak belirsizliği ortadan kaldırır.":
    "Das `<html>`-Tag der Seite hat kein `lang` (Seitensprache). Screenreader nutzen es für die korrekte Aussprache, Browser für Übersetzungsangebote. Google kann die Sprache auch am Inhalt erkennen, aber die Angabe beseitigt jeden Zweifel.",
  'Sayfanın başındaki `<html>` etiketine dilinizi ekleyin; Türkçe bir sayfa için `<html lang="tr">`. Sayfalar tek şablondan üretiliyorsa şablonda bir kez düzeltmek hepsine yeter.':
    'Fügen Sie Ihre Sprache dem `<html>`-Tag oben auf der Seite hinzu, zum Beispiel `<html lang="en">` für eine englische Seite. Wenn die Seiten aus einer Vorlage stammen, deckt eine einmalige Korrektur der Vorlage alle ab.',
  "Görsellerde genişlik ve yükseklik yok": "Bilder haben keine Breite und Höhe",
  "Sayfada genişlik (width) ve yükseklik (height) belirtilmemiş üç ya da daha fazla görsel var. Tarayıcı görsel inmeden ona ne kadar yer ayıracağını bilemez; görsel gelince yazılar aşağı kayar ve okuyan kişi yerini kaybeder.":
    "Die Seite enthält drei oder mehr Bilder ohne festgelegte Breite und Höhe. Der Browser kann nicht wissen, wie viel Platz er reservieren muss, bevor ein Bild geladen ist; kommt es an, springt der Text nach unten und der Leser verliert die Stelle.",
  'Her `<img>` etiketine görselin gerçek boyutunu yazın: `<img src="..." width="800" height="600">`. CSS ile küçültüyorsanız bu değerler oranı korur, yine de yazın. SVG görsellerde gerek yok.':
    'Geben Sie jedem `<img>`-Tag die tatsächliche Größe des Bildes: `<img src="..." width="800" height="600">`. Wenn Sie es per CSS verkleinern, erhalten diese Werte das Seitenverhältnis, also legen Sie sie trotzdem fest. SVG-Bilder brauchen sie nicht.',
  "Uzun metinde alt başlık yok": "Langer Text hat keine Unterüberschriften",
  "Sayfada epey uzun metin var ama H1 dışında hiç başlık yok. Alt başlıklar uzun metni taranabilir yapar ve Google'ın sayfanın hangi konuları kapsadığını anlamasına yardım eder.":
    "Die Seite hat ziemlich viel Text, aber außer der H1 keine Überschriften. Zwischenüberschriften machen lange Texte leicht überfliegbar und helfen Google zu verstehen, welche Themen die Seite behandelt.",
  "Metni konularına göre bölün ve her bölüme bir H2 başlığı verin. Başlıklar bölümün ne anlattığını söylesin; anahtar kelime doldurmayın.":
    "Teilen Sie den Text nach Themen auf und geben Sie jedem Abschnitt eine H2-Überschrift. Lassen Sie jede Überschrift sagen, worum es im Abschnitt geht; stopfen Sie sie nicht mit Keywords voll.",
  "Görselin alt metni bir dosya adı":
    "Alternativtext eines Bildes ist ein Dateiname",
  "Bir görselin alt metni dosya adı ya da kamera çıktısı gibi duruyor (IMG_2231.jpg, DSC0043, ekran-goruntusu-1.png). Alt metin, görseli göremeyen birine ne olduğunu anlatmalıdır; dosya adı bunu yapmaz. Google'ın görselin konusunu anlamasına da yardım etmez.":
    "Der Alternativtext eines Bildes sieht aus wie ein Dateiname oder eine Kamerabezeichnung (IMG_2231.jpg, DSC0043, screenshot-1.png). Alternativtext soll jemandem, der das Bild nicht sehen kann, sagen, was es zeigt; ein Dateiname tut das nicht. Er hilft auch Google nicht, das Motiv des Bildes zu verstehen.",
  'Alt metne görselde ne olduğunu yazın, örneğin "kırmızı koltukta oturan kadın". Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").':
    'Schreiben Sie in den Alternativtext, was das Bild zeigt, zum Beispiel „Frau sitzt auf einem roten Sessel“. Lassen Sie den Alternativtext nur bei rein dekorativen Bildern leer (alt="").',
  "Görsel alt metni çok uzun": "Alternativtext eines Bildes ist zu lang",
  "Bir görselin alt metni 250 karakteri aşıyor. Ekran okuyucular alt metni sonuna kadar okur; bu kadar uzun olunca görsel anlatımı paragrafa döner ve dinleyen sayfanın akışını kaybeder.":
    "Der Alternativtext eines Bildes ist länger als 250 Zeichen. Screenreader lesen Alternativtext bis zum Ende vor; bei dieser Länge wird die Bildbeschreibung zum Absatz, und der Hörer verliert den Faden der Seite.",
  "Görselin ne olduğunu bir cümleyle anlatın (yaklaşık 125 karakter). Daha fazla anlatılacak şey varsa onu sayfanın metnine ya da görselin açıklama yazısına taşıyın.":
    "Beschreiben Sie in einem Satz, was das Bild zeigt (etwa 125 Zeichen). Wenn es mehr zu sagen gibt, verschieben Sie es in den Seitentext oder die Bildunterschrift.",
  "Sayfada birden fazla başlık etiketi (<title>)":
    "Die Seite hat mehr als ein Titel-Tag (<title>)",
  "Sayfada birden fazla <title> etiketi var. Bir sayfanın tek başlığı olur; Google hangisini alacağını kendisi seçer ve seçtiği, arama sonucunda görmek istediğiniz olmayabilir. Genelde şablon ile SEO eklentisinin ikisi birden başlık yazınca olur.":
    "Die Seite hat mehr als ein <title>-Tag. Eine Seite hat einen Titel; Google wählt aus, welcher verwendet wird, und das ist möglicherweise nicht der, den Sie in den Suchergebnissen haben möchten. Das passiert meist, wenn sowohl die Vorlage als auch ein SEO-Plugin einen Titel schreiben.",
  "Sayfa kaynağında <title> araması yapın ve yalnızca birini bırakın. İkisi farklı yerden geliyorsa (şablon ve eklenti) birini kapatın.":
    "Suchen Sie im Seitenquelltext nach <title> und behalten Sie nur einen. Wenn sie aus verschiedenen Quellen stammen (Vorlage und Plugin), deaktivieren Sie eine davon.",
  "Sayfada birbirinden farklı birden fazla meta açıklama":
    "Seite hat mehrere verschiedene Meta-Beschreibungen",
  "Sayfada içeriği farklı iki ya da daha fazla meta açıklama var. Google hangisini özet olarak göstereceğini kendisi seçer, yani arama sonucunda çıkan yazı sizin yazdığınız olmayabilir. Şablon ile SEO eklentisinin ikisi birden yazınca olur.":
    "Die Seite hat zwei oder mehr Meta-Beschreibungen mit unterschiedlichem Inhalt. Google wählt aus, welche als Snippet angezeigt wird, daher ist der Text in den Suchergebnissen möglicherweise nicht der, den Sie geschrieben haben. Das passiert, wenn sowohl die Vorlage als auch ein SEO-Plugin eine schreiben.",
  'Sayfa kaynağında name="description" araması yapın ve yalnızca birini bırakın. İki kaynak varsa (şablon ve eklenti) birini kapatın.':
    'Suchen Sie im Seitenquelltext nach name="description" und behalten Sie nur eine. Wenn es zwei Quellen gibt (Vorlage und Plugin), deaktivieren Sie eine davon.',
  "Başlık etiketi yer tutucu bir yazı": "Titel-Tag ist Platzhaltertext",
  'Sayfanın başlığı "Untitled", "Başlıksız" ya da "New Page" gibi kimsenin yazmadığı bir yer tutucu. Arama sonucunda mavi bağlantı olarak bu çıkabilir; kimse tıklamak istemez. Google da bazen bu başlığı kullanmayıp başka bir metinle değiştirir.':
    "Der Titel der Seite ist ein Platzhalter, den niemand geschrieben hat, z. B. „Ohne Titel“, „Başlıksız“ oder „Neue Seite“. Das kann als blauer Link in den Suchergebnissen erscheinen und niemand möchte darauf klicken. Manchmal ersetzt Google einen solchen Titel auch durch anderen Text.",
  "Sayfanın konusunu anlatan kendi başlığını yazın (yaklaşık 50-60 karakter bir ölçüttür). Sayfa sonradan doldurulacaksa dolana kadar noindex ile dizin dışında tutun.":
    "Schreiben Sie einen echten Titel, der das Thema der Seite beschreibt (etwa 50–60 Zeichen sind ein Richtwert). Wenn die Seite erst später gefüllt wird, halten Sie sie bis dahin mit noindex aus dem Index.",
  "Ana başlık (H1) çok uzun": "Hauptüberschrift (H1) ist zu lang",
  "Sayfanın ana başlığı (H1) 70 karakterden uzun. Google için bir sınır yok ve sıralamayı etkilemez; ama uzun başlık bir bakışta okunmaz, genelde de başlığa metin paragrafı yazılmıştır.":
    "Die Hauptüberschrift (H1) der Seite ist länger als 70 Zeichen. Google hat keine Begrenzung, und es wirkt sich nicht auf das Ranking aus, aber eine lange Überschrift lässt sich nicht auf einen Blick erfassen, und meist wurde ein ganzer Absatz in die Überschrift gepackt.",
  "H1'i bir cümlelik, sayfanın konusunu söyleyen kısa bir başlığa indirin. Geri kalan açıklamayı başlığın altındaki paragrafa taşıyın.":
    "Kürzen Sie die H1 auf eine kurze, einzeilige Überschrift, die das Thema der Seite nennt. Verschieben Sie den Rest der Beschreibung in den Absatz darunter.",
  "Metni olmayan iç bağlantılar": "Interne Links ohne Text",
  'Sayfada içinde yazı, görsel ya da erişilebilirlik etiketi (aria-label) olmayan iç bağlantılar var. Google bir bağlantının nereye gittiğini bağlantı metninden anlar; boş bağlantı hiçbir şey söylemez. Ekran okuyucu kullanan ziyaretçi için de bağlantı sadece "bağlantı" diye okunur.':
    "Die Seite enthält interne Links ohne Text, Bild oder Barrierefreiheitsbeschriftung (aria-label). Google versteht anhand des Ankertexts, wohin ein Link führt; ein leerer Link sagt nichts. Für Besucher mit Screenreader wird der Link nur als „Link“ vorgelesen.",
  'Bağlantıya görünür bir yazı ekleyin ya da yalnızca simge ise `aria-label="Sepet"` gibi ne yaptığını söyleyen bir etiket ekleyin. Kullanılmayan boş `<a>` etiketlerini silin.':
    'Fügen Sie dem Link sichtbaren Text hinzu oder, wenn er nur aus einem Symbol besteht, eine Beschriftung, die sagt, was er tut, z. B. `aria-label="Cart"`. Löschen Sie leere `<a>`-Tags, die nicht verwendet werden.',
  '"Buraya tıklayın" gibi anlamsız bağlantı metinleri':
    "Bedeutungsloser Linktext wie „Hier klicken“",
  'Sayfada "buraya tıklayın", "devamı", "daha fazla", "click here" gibi hedefi anlatmayan iç bağlantı metinleri var (üç ya da daha fazla). Google, bağlantı metnini hedef sayfanın konusunu anlamak için kullanır; bu metinler o bilgiyi vermez. Ekran okuyucu kullanan biri bağlantı listesini açtığında hepsini aynı duyar.':
    "Die Seite enthält interne Linktexte, die das Ziel nicht beschreiben, etwa „hier klicken“, „weiterlesen“ oder „mehr“ (drei oder mehr davon). Google nutzt den Ankertext, um das Thema der Zielseite zu verstehen; diese Formulierungen liefern diese Information nicht. Wer einen Screenreader nutzt, hört beim Öffnen der Linkliste lauter gleichlautende Einträge.",
  'Bağlantı metnini hedefin konusuyla değiştirin: "buraya tıklayın" yerine "2026 fiyat listesini indirin". Kart şablonlarında "Devamı" yazısına yazı başlığını ekleyin ya da görünmeyen bir aria-label ile tamamlayın.':
    "Ersetzen Sie den Linktext durch das Thema des Ziels: Schreiben Sie statt „hier klicken“ lieber „Preisliste 2026 herunterladen“. Ergänzen Sie in Kartenvorlagen „Weiterlesen“ um den Beitragstitel oder vervollständigen Sie es mit einem versteckten aria-label.",
  "Sayfada çok fazla bağlantı": "Zu viele Links auf der Seite",
  "Sayfada 300'den fazla farklı adrese bağlantı var. Google'ın sabit bir sınırı yok ve bu tek başına sıralamayı düşürmez; ama bu kadar bağlantı ziyaretçinin seçim yapmasını zorlaştırır ve Google'ın önemli bağlantıyı ayırt etmesini güçleştirir. Genelde büyük bir menü ya da kategori listesinin her sayfada tekrarlanması yüzünden olur.":
    "Die Seite verlinkt zu mehr als 300 verschiedenen URLs. Google hat kein festes Limit und dies allein führt nicht zu schlechteren Rankings, aber die vielen Links erschweren den Besuchern die Auswahl und machen es für Google schwieriger zu erkennen, welche Links wichtig sind. Normalerweise handelt es sich um ein großes Menü oder eine Kategorieliste, die auf jeder Seite wiederholt wird.",
  "Menüyü ve alt bilgiyi (footer) en önemli sayfalarla sınırlayın. Uzun listeleri sayfalara bölün ya da kategori sayfalarına indirin.":
    "Beschränken Sie das Menü und die Fußzeile auf Ihre wichtigsten Seiten. Teilen Sie lange Listen auf mehrere Seiten auf oder verschieben Sie sie nach unten auf Kategorieseiten.",
  "Kendi sitenizin sayfalarına nofollow bağlantılar":
    "Nofollow-Links zu Ihren eigenen Seiten",
  'Sayfada kendi sitenizin sayfalarına giden üç ya da daha fazla bağlantıda rel="nofollow" var. nofollow, Google\'a "bu bağlantıya güvenme" demek içindir ve iç bağlantıda genelde gerek yoktur. Google bu bağlantıları takip etmeyebilir; yani sayfaya başka yolla ulaşılamıyorsa hedef sayfa dizine geç girer ya da hiç girmez.':
    'Drei oder mehr Links auf der Seite, die zu Ihrer eigenen Website führen, tragen rel="nofollow". nofollow sagt Google „vertraue diesem Link nicht“, und interne Links brauchen das selten. Google folgt diesen Links möglicherweise nicht; wenn die Zielseite nicht auf anderem Weg erreichbar ist, wird sie spät oder gar nicht indexiert.',
  'Kendi sayfalarınıza verdiğiniz bağlantılardan rel="nofollow" özelliğini kaldırın. Sayfanın dizine girmesini istemiyorsanız bağlantıyı değil sayfayı noindex ile işaretleyin.':
    'Entfernen Sie rel="nofollow" aus Links zu Ihren eigenen Seiten. Wenn eine Seite nicht indexiert werden soll, kennzeichnen Sie die Seite selbst mit noindex, nicht den Link.',
  "Tekrarlanan başlık": "Doppelter Titel",
  "Birden çok sayfa aynı başlığı (<title>) kullanıyor. Aynı başlıkla arama sonucunda sayfalar birbirine benzer görünür ve ziyaretçi hangisine tıklayacağını seçemez.":
    "Mehrere Seiten verwenden denselben Titel (<title>). Mit gleichem Titel sehen die Seiten in den Suchergebnissen gleich aus, und Besucher können nicht erkennen, welche sie anklicken sollen.",
  "Her sayfaya kendi içeriğini anlatan farklı bir başlık yazın. Şablondan üretilen sayfalarda ayırt edici bilgiyi (ürün adı, kategori, şehir) başlık şablonuna ekleyin.":
    "Geben Sie für jede Seite einen anderen Titel, der ihren eigenen Inhalt beschreibt. Fügen Sie für aus einer Vorlage generierte Seiten die Unterscheidungsdetails (Produktname, Kategorie, Stadt) zur Titelvorlage hinzu.",
  "Tekrarlanan ana başlık (H1)": "Doppelte Hauptüberschrift (H1)",
  "Birden çok sayfa aynı ana başlığı (H1) kullanıyor. Başlık, ziyaretçiye ve Google'a sayfanın ne hakkında olduğunu söyler; aynı başlık farklı sayfaları ayırt etmeyi zorlaştırır. Sitenin her sayfasında logo ya da site adı H1 olarak yazılmışsa bu uyarı genelde ondan gelir.":
    "Mehrere Seiten verwenden dieselbe Hauptüberschrift (H1). Die Überschrift sagt Besuchern und Google, worum es auf der Seite geht; dieselbe Überschrift macht verschiedene Seiten schwer unterscheidbar. Wenn das Logo oder der Website-Name auf jeder Seite die H1 ist, kommt diese Warnung meist daher.",
  "Her sayfanın H1'ini o sayfanın konusunu anlatan kendi cümlesiyle yazın. Logo ya da site adı H1 ise onu H1 olmayan bir etikete çevirin ve sayfa başlığını H1 yapın.":
    "Geben Sie jeder Seite eine eigene H1, die ihr Thema nennt. Wenn das Logo oder der Website-Name die H1 ist, ändern Sie dessen Tag und machen Sie den Seitentitel zur H1.",
  "Tekrarlanan meta açıklama": "Doppelte Meta-Beschreibung",
  "Birden çok sayfa aynı meta açıklamayı (arama sonucunda başlığın altındaki özet) kullanıyor. Aramada hepsi aynı özetle çıkar ve ziyaretçi sayfaları ayırt edemez.":
    "Mehrere Seiten verwenden dieselbe Meta-Beschreibung (die Zusammenfassung unter dem Titel in den Suchergebnissen). Sie erscheinen alle mit dem gleichen Snippet in der Suche und Besucher können die Seiten nicht voneinander unterscheiden.",
  "Her sayfaya kendi açıklamasını yazın ya da yinelenen açıklamayı tamamen silin. Açıklama yoksa Google sayfa metninden bir özet seçer; bu, yanlış bir kopyadan iyidir.":
    "Schreiben Sie für jede Seite eine eigene Beschreibung oder löschen Sie die doppelte Beschreibung ganz. Ohne sie wählt Google einen Ausschnitt aus dem Seitentext, und das ist besser als eine falsche Kopie.",
  "Tekrarlanan sayfa içeriği": "Doppelter Seiteninhalt",
  "İki ya da daha fazla adres birebir aynı metni gösteriyor. Google bunlardan birini seçip dizine alır ve seçtiği sizin istediğiniz olmayabilir. Ceza değildir, ama sıralama gücü adresler arasında bölünür.":
    "Zwei oder mehr URLs zeigen genau denselben Text. Google wählt eine davon zum Indexieren aus, und die Auswahl ist möglicherweise nicht die gewünschte. Es handelt sich nicht um eine Strafe, aber die Rankingstärke wird zwischen den URLs aufgeteilt.",
  "Asıl adresi (aramada görünmesini istediğiniz tek adres) seçin. Kopya adres kullanıcıya gerekmiyorsa 301 ile asıl adrese yönlendirin; kopya adres açık kalacaksa (parametreli sayfa gibi) canonical (asıl adres) etiketiyle asıl adresi gösterin. Sık nedenler: sonda eğik çizgi farkı, adrese eklenen parametreler, http/https ya da www farkı.":
    "Wählen Sie die kanonische URL (die eine URL, die in der Suche erscheinen soll). Wenn Besucher die doppelte URL nicht brauchen, leiten Sie sie per 301 auf die kanonische um; wenn das Duplikat erreichbar bleiben muss (z. B. eine Seite mit Parametern), verweisen Sie mit einem Canonical-Tag auf die kanonische URL. Häufige Ursachen: ein abschließender Schrägstrich, an die URL angehängte Parameter oder Unterschiede bei http/https bzw. www.",
  "Sayfada canonical (asıl adres) etiketi yok": "Seite hat kein Canonical-Tag",
  "Sayfa, kendi asıl adresini belirtmiyor. Aynı sayfa birden çok adresten açılabilir: sonunda eğik çizgi olan ve olmayan, ?utm_source gibi eklerle gelen, www'lu ve www'suz adresler. Etiket yoksa Google bunlardan hangisini göstereceğine kendi karar verir. Google bu etiketi zorunlu değil, önerilen bir işaret sayar; bu yüzden bu yalnızca bir öneridir.":
    "Die Seite gibt keine eigene kanonische URL an. Dieselbe Seite lässt sich oft über mehrere URLs öffnen: mit und ohne abschließenden Schrägstrich, mit Zusätzen wie ?utm_source, mit und ohne www. Ohne das Tag entscheidet Google, welche angezeigt wird. Google behandelt dieses Tag als empfohlenes Signal, nicht als Pflicht; dies ist also nur ein Vorschlag.",
  'Sayfanın `<head>` bölümüne kendi tam adresini gösteren şu satırı ekleyin: `<link rel="canonical" href="https://www.siteniz.com/hakkimizda">`. Adres, aramada görünmesini istediğiniz adres olsun. Çoğu site oluşturucu ve SEO eklentisi bunu tek ayarla tüm sayfalara ekler.':
    'Fügen Sie diese Zeile mit der vollständigen eigenen URL der Seite in den `<head>` der Seite ein: `<link rel="canonical" href="https://www.yoursite.com/about">`. Verwenden Sie die URL, die in der Suche erscheinen soll. Die meisten Website-Baukästen und SEO-Plugins fügen sie mit einer einzigen Einstellung jeder Seite hinzu.',
  "Asıl adres bildirimleri birbiriyle çelişiyor":
    "Canonical-Angaben widersprechen sich",
  "Sayfa, asıl adresi iki yerde farklı söylüyor: HTML içindeki asıl adres etiketinde bir adres, HTTP Link başlığında başka bir adres. Sinyaller çelişince Google ikisini de bırakıp kendi seçimini yapar.":
    "Die Seite gibt ihre kanonische URL an zwei Stellen unterschiedlich an: eine URL im Canonical-Tag im HTML, eine andere im HTTP-Link-Header. Wenn sich die Signale widersprechen, ignoriert Google beide und trifft seine eigene Wahl.",
  "Tek bir asıl adres seçin ve onu yalnızca bir yerde bildirin (genelde HTML head). Diğerini kaldırın ya da aynı adrese çevirin.":
    "Wählen Sie eine kanonische URL und deklarieren Sie sie nur an einer Stelle (normalerweise im HTML-Kopf). Entfernen Sie die andere oder ändern Sie sie in dieselbe URL.",
  "Sayfa arama sonuçlarından gizlenmiş (noindex)":
    "Seite ist aus den Suchergebnissen ausgeblendet (noindex)",
  "Sayfa, arama motorlarından kendisini dizine almamalarını istiyor (robots meta etiketi ya da X-Robots-Tag başlığıyla). Yani sayfa aramada çıkmaz. Çoğu zaman bilerek yapılır; bu bir hata değil, bilgi notudur.":
    "Die Seite fordert Suchmaschinen auf, sie nicht zu indexieren (per Robots-Meta-Tag oder X-Robots-Tag-Header). Daher erscheint die Seite nicht in der Suche. Das ist meist beabsichtigt; es ist ein Hinweis, kein Fehler.",
  "Sayfa aramada çıkmalıysa noindex yönergesini kaldırın. Bilerek konduysa (yönetim paneli, teşekkür, filtre sayfaları gibi) yapmanız gereken bir şey yok.":
    "Wenn die Seite in der Suche erscheinen soll, entfernen Sie die noindex-Direktive. Wenn sie absichtlich hinzugefügt wurde (Administratorseiten, Dankeschön-Seiten, Filterseiten und dergleichen), gibt es nichts zu tun.",
  "Sayfa, asıl adres olarak başka bir sayfayı gösteriyor":
    "Seite nennt eine andere Seite als kanonisch",
  "Sayfa asıl adres olarak başka bir adresi gösteriyor, yani Google'dan onun yerine o adresi dizine almasını istiyor. Bilerek yaptıysanız sorun yok (parametreli sayfalar gibi); ama bu sayfanın aramada çıkmasını istiyorsanız sorundur.":
    "Die Seite nennt eine andere URL als kanonisch und fordert Google damit auf, stattdessen diese URL zu indexieren. Das ist in Ordnung, wenn Sie es absichtlich so eingerichtet haben (z. B. bei Seiten mit Parametern), aber ein Problem, wenn diese Seite selbst in der Suche erscheinen soll.",
  "Bu sayfa kendi adıyla aramada çıkacaksa asıl adres etiketini sayfanın kendi adresine çevirin. Aksi halde yapılacak bir şey yok.":
    "Wenn diese Seite unter ihrer eigenen URL in der Suche erscheinen soll, ändern Sie das Canonical-Tag auf die eigene URL der Seite. Andernfalls ist nichts zu tun.",
  "Asıl adres olarak gösterilen sayfa açılmıyor":
    "Canonical verweist auf eine Seite, die nicht geladen wird",
  "Sayfa, asıl adres olarak hata veren (404 ya da 5xx) bir adresi gösteriyor. Asıl adres etiketi güçlü bir işarettir ama gösterdiği adres yayında değilse Google onu kullanamaz ve asıl adresi kendi seçer. Sonuç, hiç asıl adres vermemişsiniz gibi olur.":
    "Die Seite nennt eine URL, die einen Fehler (404 oder 5xx) zurückgibt, als kanonisch. Ein Canonical-Tag ist ein starkes Signal, aber wenn die URL, auf die es verweist, nicht live ist, kann Google es nicht verwenden und wählt das Canonical selbst aus. Das Ergebnis ist, als hätten Sie überhaupt kein Canonical angegeben.",
  "Asıl adres etiketini çalışan bir adrese çevirin ya da hedef sayfayı yeniden yayınlayın. Hedef gerçekten kaldırıldıysa etiket sayfanın kendi adresini göstersin.":
    "Lassen Sie das Canonical-Tag auf eine funktionierende URL verweisen oder veröffentlichen Sie die Zielseite erneut. Wenn das Ziel wirklich entfernt wurde, lassen Sie das Tag auf die eigene URL der Seite verweisen.",
  "Asıl adres olarak yönlendiren bir sayfa gösterilmiş":
    "Canonical verweist auf eine Weiterleitungsseite",
  "Sayfa, asıl adres olarak başka yere yönlendiren (3xx) bir adresi gösteriyor. Yönlendirmenin kendisi zaten hedefin asıl olduğunu söyler; yani bu sayfa, asıl olmadığı bilinen bir adresi asıl diye öneriyor.":
    "Die Seite nennt eine URL als kanonisch, die weiterleitet (3xx). Die Weiterleitung selbst sagt bereits, dass das Ziel die kanonische URL ist; diese Seite schlägt also eine URL als kanonisch vor, die bekanntermaßen keine ist.",
  "Asıl adres etiketini yönlendirmenin vardığı son adrese çevirin; bildirdiğiniz adres ile açılan adres aynı olsun.":
    "Lassen Sie das Canonical-Tag auf die endgültige URL verweisen, zu der die Weiterleitung führt, damit die angegebene und die geladene URL identisch sind.",
  "Asıl adres olarak gizlenmiş bir sayfa gösterilmiş":
    "Canonical zeigt auf eine ausgeblendete Seite",
  "Sayfa, asıl adres olarak noindex ile gizlenmiş bir sayfayı gösteriyor. Noindex kesin bir yönergedir, asıl adres etiketi ise yalnızca bir işarettir; yani bu sayfa, Google'ın hiçbir zaman gösteremeyeceği bir adresi öneriyor ve kendisi de aramadan düşebilir.":
    "Die Seite nennt eine per noindex ausgeblendete Seite als kanonisch. noindex ist eine verbindliche Anweisung, ein Canonical-Tag nur ein Signal; diese Seite schlägt also eine URL vor, die Google nie anzeigen kann, und kann selbst aus der Suche verschwinden.",
  "İki yoldan biri: hedef sayfadaki noindex'i kaldırın ya da bu sayfanın asıl adres etiketini sayfanın kendi adresine çevirin.":
    "Tun Sie eines von beidem: Entfernen Sie das noindex von der Zielseite oder ändern Sie das Canonical-Tag dieser Seite auf ihre eigene URL.",
  "Google sayfayı boş sayıyor (soft 404)":
    "Google behandelt die Seite als leer (Soft 404)",
  "Sayfa normal açılıyor (200) ama Google onu 'bulunamadı' sayıyor (soft 404) ve dizine almıyor. Bunu yalnızca Google söyleyebilir; durum kodu sağlıklı göründüğü için tarayıcılar fark etmez. En sık boş sonuç sayfalarında, silinmiş ürünlerde ve 'kayıt bulunamadı' gösteren şablonlarda olur.":
    "Die Seite lädt normal (200), aber Google behandelt sie als „nicht gefunden“ (Soft 404) und indexiert sie nicht. Das kann Ihnen nur Google sagen; Browser bemerken es nicht, weil der Statuscode gesund aussieht. Am häufigsten passiert das bei leeren Ergebnisseiten, gelöschten Produkten und Vorlagen, die „Keine Einträge gefunden“ anzeigen.",
  "Sayfa gerçekten yoksa 404 ya da 410 döndürün. Varsa, içeriğinin gerçek ve dolu olduğundan emin olun; boş liste şablonları en sık nedendir.":
    "Wenn die Seite wirklich nicht existiert, geben Sie einen 404 oder 410 zurück. Wenn sie existiert, sorgen Sie für echten, substanziellen Inhalt; leere Listenvorlagen sind die häufigste Ursache.",
  "Google sayfayı robots.txt yüzünden tarayamıyor":
    "Google kann die Seite wegen robots.txt nicht crawlen",
  "Google'ın URL Denetleme Aracı bu adresi robots.txt'nin engellediğini söylüyor. Bizim tarayıcımız sayfaya ulaşabildiği halde Google ulaşamıyorsa, iki tarayıcıya farklı kurallar uygulanıyor demektir.":
    "Laut dem Tool „URL-Prüfung“ von Google blockiert robots.txt diese URL. Wenn unser Crawler die Seite erreicht, Google aber nicht, erhalten die beiden Crawler unterschiedliche Regeln.",
  "robots.txt'te bu adresi kapsayan Disallow satırını bulup kaldırın. Googlebot'a özel bir kural (User-agent: Googlebot) olup olmadığına da bakın; çoğu zaman sorun genel kuralda değil, ona özel satırdadır.":
    "Suchen und entfernen Sie die Disallow-Zeile in robots.txt, die diese URL erfasst. Prüfen Sie auch, ob es eine Regel nur für Googlebot gibt (User-agent: Googlebot); das Problem liegt oft in dieser speziellen Zeile statt in der allgemeinen Regel.",
  "Google sayfada gizleme etiketi (noindex) görüyor":
    "Google sieht auf der Seite ein noindex-Tag",
  "Google bu sayfada noindex (aramada gösterme) yönergesi gördüğünü söylüyor. Bizim tarayıcımız sayfayı dizine alınabilir görüyorsa, iki tarayıcı sayfanın farklı sürümlerini okuyor demektir; örneğin yönerge yalnızca JavaScript çalışınca ekleniyor olabilir.":
    "Google meldet auf dieser Seite eine noindex-Anweisung (nicht in der Suche anzeigen). Wenn unser Crawler die Seite als indexierbar sieht, lesen die beiden Crawler unterschiedliche Versionen der Seite; zum Beispiel wird die Anweisung möglicherweise erst beim Ausführen von JavaScript hinzugefügt.",
  "Sayfanın kaynak kodunu Google'ın gördüğü haliyle karşılaştırın: Search Console'da URL Denetleme > Canlı URL'yi test et > Taranan sayfayı görüntüle > HTML ekranı işlenmiş HTML'i gösterir. Noindex'in nereden geldiğini bulup kaldırın.":
    "Vergleichen Sie den Seitenquelltext mit dem, was Google sieht: In der Search Console zeigt URL-Prüfung > Live-URL testen > Getestete Seite anzeigen > HTML das gerenderte HTML. Finden Sie heraus, woher das noindex kommt, und entfernen Sie es.",
  "Google başka bir adresi asıl adres seçti":
    "Google hat eine andere kanonische URL ausgewählt",
  "Sayfa bir asıl adres bildiriyor ama Google başka bir adresi seçti. Asıl adres etiketi bir emir değil, öneridir; Google içerik benzerliğine, iç bağlantılara ve site haritasına bakıp farklı karar verebilir. Sonuçta aramada sizin seçtiğiniz adres çıkmaz.":
    "Die Seite gibt eine kanonische URL an, Google hat jedoch eine andere ausgewählt. Ein Canonical-Tag ist ein Vorschlag, keine Anweisung; Google kann anhand von Inhaltsähnlichkeit, internen Links und Sitemap anders entscheiden. Daher erscheint die von Ihnen gewählte URL nicht in der Suche.",
  "Google'ın seçtiği adrese bakın. Sayfalar gerçekten aynıysa iç bağlantılarınızı ve site haritanızı istediğiniz adrese çevirin. Farklıysa aradaki farkı içerikte belirginleştirin.":
    "Sehen Sie sich die von Google ausgewählte URL an. Wenn die Seiten wirklich identisch sind, lassen Sie Ihre internen Links und Ihre Sitemap auf die gewünschte URL verweisen. Wenn sie sich unterscheiden, machen Sie den Unterschied im Inhalt deutlicher.",
  "Dil sürümü kodu (hreflang) geçersiz":
    "Sprachversionscode (hreflang) ist ungültig",
  'Dil sürümü bağlantısındaki (hreflang) kod Google\'ın beklediği biçimde değil. Google dil için ISO 639-1 kodunu (tr, en), istenirse bölge için ISO 3166-1 ülke kodunu bekler ve ikisini tire ile ayırır; zh-Hans gibi yazı sistemi eki de geçerlidir. "UK", "EU" ve "UN" gibi ayrılmış kodlarda Google bölge kısmını yok sayar (en-UK, en gibi okunur); es-419 gibi bölge kodları da desteklenmez. Geçersiz kod, o dil sürümünün yok sayılması demektir.':
    "Der Code in einem Sprachversionslink (hreflang) hat nicht das von Google erwartete Format. Google erwartet einen ISO-639-1-Sprachcode (tr, en), optional gefolgt von einem ISO-3166-1-Ländercode für die Region, getrennt durch einen Bindestrich; ein Schriftsuffix wie zh-Hans ist ebenfalls gültig. Bei reservierten Codes wie „UK“, „EU“ und „UN“ ignoriert Google den Regionsteil (en-UK wird als en gelesen), und Regionscodes wie es-419 werden nicht unterstützt. Ein ungültiger Code bedeutet, dass diese Sprachversion ignoriert wird.",
  'Birleşik Krallık için "en-GB" yazın; "en-UK" geçerli bir bölge kodu değil. Latin Amerika İspanyolcası için es-419 yerine "es" yazın. Ayırıcı alt çizgi değil tire olmalı ("en_US" değil "en-US"). "x-default" geçerlidir, olduğu gibi bırakın.':
    "Schreiben Sie „en-GB“ für das Vereinigte Königreich; „en-UK“ ist kein gültiger Regionscode. Für lateinamerikanisches Spanisch schreiben Sie „es“ statt es-419. Das Trennzeichen muss ein Bindestrich sein, kein Unterstrich („en-US“, nicht „en_US“). „x-default“ ist gültig; lassen Sie es, wie es ist.",
  "Dil sürümleri arasında sayfa kendini listelemiyor (hreflang)":
    "Seite führt sich nicht selbst unter ihren Sprachversionen auf (hreflang)",
  "Bu sayfa, dil sürümü bağlantılarında (hreflang) diğer dilleri listeliyor ama kendisini listelemiyor. Google'ın belgelerine göre her dil sürümü kendisini de listelemeli; yoksa Google dil sürümlerini birbirine bağlamayabilir.":
    "Diese Seite führt in ihren Sprachversionslinks (hreflang) andere Sprachen auf, aber nicht sich selbst. Laut der Dokumentation von Google sollte jede Sprachversion auch sich selbst aufführen; andernfalls verknüpft Google die Sprachversionen möglicherweise nicht.",
  "Sayfanın kendi adresini, kendi dil koduyla dil sürümü listesine ekleyin. Şablonlarda sorun çoğu zaman listenin geçerli sayfayı atlayarak üretilmesinden kaynaklanır.":
    "Fügen Sie die eigene URL der Seite mit ihrem eigenen Sprachcode zur Liste der Sprachversionen hinzu. In Vorlagen liegt das Problem normalerweise darin, dass die Liste ohne die aktuelle Seite generiert wird.",
  "Sayfa robots yönergesiyle bağlantılarını kapatıyor":
    "Seite deaktiviert ihre Links mit einer Robots-Direktive",
  'Sayfada "nofollow" (ya da "none") yönergesi var; yani Google bu sayfadaki bağlantıları izlemez. Google yeni sayfaları çoğunlukla bağlantı izleyerek bulur; sayfa aramada çıkıyor olsa bile ondan çıkan yollar kapalıdır.':
    "Die Seite hat eine „nofollow“-Anweisung (oder „none“), daher folgt Google den Links darauf nicht. Google findet neue Seiten meist, indem es Links folgt; selbst wenn diese Seite in der Suche erscheint, sind die Wege von ihr aus verschlossen.",
  'Bağlantıların izlenmesini istiyorsanız yönergeden "nofollow" ifadesini kaldırın. Giriş, filtre ya da kullanıcı içeriği sayfalarında bu bilerek yapılmış olabilir; o durumda yapmanız gereken bir şey yok.':
    "Wenn den Links gefolgt werden soll, entfernen Sie „nofollow“ aus der Anweisung. Auf Anmelde-, Filter- oder Nutzerinhaltsseiten kann das beabsichtigt sein; in diesem Fall ist nichts zu tun.",
  "Sayfalanmış sayfa, asıl adres olarak ilk sayfayı gösteriyor":
    "Paginierte Seite nennt die erste Seite als kanonisch",
  "Adres bir sayfa numarası taşıyor (2. sayfa gibi) ama asıl adres olarak numarasız ilk sayfayı gösteriyor. Google bunu sayfalama belgelerinde hata sayar: her sayfa kendi adresini asıl adres olarak vermeli. Aksi halde 2. ve sonraki sayfalardaki içerik aramadan düşer.":
    "Die URL enthält eine Seitenzahl (z. B. Seite 2), nennt aber die erste Seite ohne Nummer als kanonisch. Die Paginierungsdokumentation von Google bezeichnet das als Fehler: Jede Seite sollte ihre eigene URL als kanonisch angeben. Sonst verschwindet der Inhalt ab Seite 2 aus der Suche.",
  "Her sayfalama adımının asıl adres etiketini o sayfanın kendi adresine çevirin. Tüm içeriği tek sayfada gösteren bir sürümünüz varsa Google onun asıl adres olmasına izin verir.":
    "Ändern Sie das Canonical-Tag jeder paginierten Seite auf deren eigene URL. Wenn Sie eine Version haben, die den gesamten Inhalt auf einer Seite zeigt, darf laut Google diese kanonisch sein.",
  "Dil sürümlerinde varsayılan sürüm (x-default) yok":
    "Sprachversionen haben keine Standardversion (x-default)",
  "Sayfa dil sürümlerini bildiriyor (hreflang) ama varsayılan bir sürüm (x-default) belirtmiyor. x-default, listelenen dillerin hiçbirine uymayan ziyaretçiye hangi sürümün gösterileceğini söyler; yoksa Google seçimi kendisi yapar.":
    "Die Seite gibt Sprachversionen (hreflang) an, aber keine Standardversion (x-default). x-default sagt Google, welche Version Besuchern gezeigt wird, die zu keiner der aufgeführten Sprachen passen; ohne sie trifft Google die Wahl selbst.",
  'Dil sürümü listesine `<link rel="alternate" hreflang="x-default" href="...">` satırını ekleyin. Genelde dil seçme sayfası ya da ana pazarınızın sürümü gösterilir.':
    'Fügen Sie `<link rel="alternate" hreflang="x-default" href="...">` zur Liste der Sprachversionen hinzu. Meist verweist es auf eine Sprachauswahlseite oder auf die Version für Ihren Hauptmarkt.',
  "Dil sürümü karşılıklı bağlanmamış (hreflang)":
    "Sprachversion ist nicht zurückverlinkt (hreflang)",
  "Bu sayfa başka bir adresi dil sürümü (hreflang) olarak gösteriyor ama o adres bu sayfayı geri göstermiyor. Dil sürümü bağlantısı iki taraflı çalışır; karşılığı olmayan bildirim yok sayılır, yani iki sayfa da bundan fayda görmez.":
    "Diese Seite nennt eine andere URL als Sprachversion (hreflang), aber diese URL verweist nicht zurück auf diese Seite. Sprachversionslinks wirken in beide Richtungen; eine Angabe ohne Gegenstück wird ignoriert, sodass keine der beiden Seiten profitiert.",
  "Hedef sayfaya bu sayfayı gösteren bir dil sürümü bağlantısı ekleyin. Gruptaki her sayfa, kendisi dahil tüm sayfaları listelemeli.":
    "Fügen Sie auf der Zielseite einen Link zur Sprachversion hinzu, der auf diese Seite verweist. Jede Seite in der Gruppe sollte alle Seiten auflisten, einschließlich sich selbst.",
  "Dil sürümü açılmayan ya da dizinden çıkarılmış bir sayfayı gösteriyor":
    "Die Sprachversion verweist auf eine Seite, die nicht geladen wird oder nicht indexierbar ist",
  "Bu sayfa başka bir adresi dil sürümü (hreflang) olarak gösteriyor ama o adres hata veriyor (404, 500 gibi), başka yere yönlendiriyor ya da noindex ile dizinden çıkarılmış. Google böyle bir adresi dil sürümü olarak kullanamaz, bildirim boşa gider.":
    "Diese Seite benennt eine andere URL als Sprachversion (hreflang), aber diese URL gibt einen Fehler zurück (404, 500 und dergleichen), leitet an eine andere Stelle weiter oder wird mit „noindex“ aus dem Index ausgeschlossen. Google kann eine solche URL nicht als Sprachversion verwenden, daher ist die Deklaration verschwendet.",
  "Ayrıntılardaki adrese bakın. Hata veriyorsa sayfayı düzeltin ya da bu bildirimi kaldırın; yönlendiriyorsa bildirimi son adrese çevirin; noindex ise ya noindex'i kaldırın ya da bildirimi silin.":
    "Sehen Sie sich die URL in den Details an. Wenn sie einen Fehler zurückgibt, reparieren Sie die Seite oder entfernen Sie diese Angabe; wenn sie weiterleitet, lassen Sie die Angabe auf die endgültige URL verweisen; wenn sie noindex hat, entfernen Sie entweder das noindex oder löschen Sie die Angabe.",
  "Asıl adres (canonical) başka bir alan adını ya da http'yi gösteriyor":
    "Canonical verweist auf eine andere Domain oder auf http",
  "Sayfanın asıl adresi (yani Google'a bu içeriğin ana adresi olarak bildirdiğiniz adres) ya güvensiz http:// ile başlıyor ya da başka bir alan adına gidiyor. Bu, sayfanın kendisini dizinde istemediğinizi söyler. Başka sitede yayımlanan içeriği bilerek böyle işaretliyorsanız bu uyarıyı yok sayabilirsiniz.":
    "Die kanonische URL der Seite (die URL, die Sie Google als Hauptadresse dieses Inhalts nennen) beginnt entweder mit unsicherem http:// oder führt zu einer anderen Domain. Damit sagen Sie Google, dass diese Seite selbst nicht in den Index soll. Wenn Sie so absichtlich Inhalte kennzeichnen, die auf einer anderen Website veröffentlicht wurden, können Sie diese Warnung ignorieren.",
  "Bilerek yapmadıysanız asıl adresi sayfanın kendi https:// adresine çevirin. Şablon ya da SEO eklentisindeki site adresi ayarı genelde yanlış yazılmıştır; oradan bir kez düzeltmek hepsine yeter.":
    "Wenn es nicht beabsichtigt war, ändern Sie die kanonische URL auf die eigene https://-URL der Seite. Meist ist die Einstellung der Website-URL in der Vorlage oder im SEO-Plugin falsch; wenn Sie sie dort einmal korrigieren, ist jede Seite korrigiert.",
  "Yapısal veri bloğu bozuk": "Strukturierter Datenblock ist defekt",
  "Sayfadaki yapısal veri bloklarından (ld+json) en az biri okunamıyor ya da içinde tür (@type) yok. Bozuk blok Google tarafından yok sayılır, yani o işaretlemeden beklediğiniz ek bilgiler (ürün, makale, kırıntı yolu) aramada çıkmaz.":
    "Mindestens ein strukturierter Datenblock (ld+json) auf der Seite kann nicht gelesen werden oder hat keinen Typ (@type). Google ignoriert einen defekten Block, sodass die zusätzlichen Details, die Sie von diesem Markup erwarten (Produkt, Artikel, Breadcrumb), nicht in der Suche angezeigt werden.",
  'Bloğu bir JSON denetleyicisine yapıştırın; genelde fazladan virgül ya da kapanmamış tırnak çıkar. Sonra bloğa en az bir tür ekleyin, örneğin "@type": "Article". Eklentiyle üretiliyorsa eklentiyi güncelleyin.':
    'Fügen Sie den Block in einen JSON-Validator ein; meist ist es ein überzähliges Komma oder ein nicht geschlossenes Anführungszeichen. Geben Sie dem Block dann mindestens einen Typ, zum Beispiel "@type": "Article". Wenn ein Plugin ihn erzeugt, aktualisieren Sie das Plugin.',
  "Bazı sayfalar için Google'ın yanıtı eski":
    "Die Antworten von Google für einige Seiten sind veraltet",
  "Bu sayfalar için saklanan Google yanıtları eskidi. Yanıt, sorulduğu andaki durumu anlatır; sayfa o zamandan beri düzelmiş ya da bozulmuş olabilir. Eski yanıtı güncelmiş gibi göstermemek için bu sayfaların Google yanıtları bu denetimde bulgu sayılmadı.":
    "Die für diese Seiten gespeicherten Google-Antworten sind veraltet. Eine Antwort beschreibt den Zustand zum Zeitpunkt der Abfrage; die Seite wurde seitdem möglicherweise repariert oder beschädigt. Damit keine alte Antwort als aktuell erscheint, wurden die Google-Antworten dieser Seiten in diesem Audit nicht als Befunde gezählt.",
  'Dizin durumu sekmesindeki "Google\'da durumunu kontrol et" düğmesine basın; en eski yanıtlı sayfalar yeniden sorulur. Google bir sitede günde en fazla 2.000 adres incelemeye izin verir, bu yüzden her tıklamada 25 sayfa sorulur; birkaç tıkla liste yenilenir.':
    "Klicken Sie im Tab „Indexstatus“ auf die Schaltfläche „Status bei Google prüfen“; die Seiten mit den ältesten Antworten werden erneut geprüft. Google erlaubt höchstens 2.000 URL-Prüfungen pro Website und Tag, daher prüft jeder Klick 25 Seiten; mit ein paar Klicks ist die Liste aktuell.",
  "Google taradı ama dizine almadı":
    "Von Google gecrawlt, aber nicht indexiert",
  "Google sayfayı çekti ama dizine almadı; yeniden istek göndermeniz gerekmez, sonradan dizine girebilir de girmeyebilir de. Google nedenini söylemez. Sık görülen olasılıklar: sayfanın başka bir sayfayla büyük ölçüde aynı olması, çok az özgün içerik taşıması ya da siteden az bağlantı alması.":
    "Google hat die Seite abgerufen, aber nicht indexiert; Sie müssen sie nicht erneut einreichen, und sie wird später vielleicht indexiert, vielleicht auch nicht. Einen Grund nennt Google nicht. Häufige Möglichkeiten: Die Seite gleicht weitgehend einer anderen Seite, enthält sehr wenig eigenen Inhalt oder erhält nur wenige Links innerhalb der Website.",
  "Önce URL Denetleme Aracı'nda noindex, engellenen kaynak ya da boş görünen içerik olup olmadığına bakın. Sorun yoksa sayfanın kendine ait bir sorusu ve cevabı olduğundan emin olun. Yakın konulu başka sayfalarla örtüşüyorsa birleştirip tek adrese yönlendirin. Sayfa kalacaksa içeriği derinleştirin ve ilgili sayfalardan buraya bağlantı verin.":
    "Prüfen Sie zunächst im Tool „URL-Prüfung“, ob ein noindex, blockierte Ressourcen oder leer wirkende Inhalte vorliegen. Trifft nichts davon zu, sorgen Sie dafür, dass die Seite eine eigene Frage beantwortet. Wenn sie sich mit anderen Seiten zu einem ähnlichen Thema überschneidet, führen Sie diese zusammen und leiten Sie auf eine einzige URL weiter. Bleibt die Seite bestehen, vertiefen Sie ihren Inhalt und verlinken Sie von verwandten Seiten auf sie.",
  "Google keşfetti ama henüz taramadı":
    "Von Google gefunden, aber noch nicht gecrawlt",
  "Google bu adresi biliyor ama sayfayı henüz çekmedi. Google'ın belgelerine göre bu genelde siteyi aşırı yüklememek için taramanın ertelenmesidir; sayfa hakkında bir kalite kararı değildir. Büyük sitelerde ve az bağlantı alan sayfalarda daha sık görülür.":
    "Google kennt diese URL, hat die Seite aber noch nicht abgerufen. Laut der Dokumentation von Google bedeutet das meist, dass das Crawling verschoben wurde, um die Website nicht zu überlasten; es ist kein Qualitätsurteil über die Seite. Häufiger kommt das bei großen Websites und bei Seiten mit wenigen Links vor.",
  "Çoğu durumda beklemek yeterlidir. Sayfa önemliyse sık taranan sayfalardan bağlantı verin, site haritasında olduğundan emin olun ve Search Console'dan dizine ekleme isteyin. Sunucunuz yavaşsa onu da iyileştirin.":
    "In den meisten Fällen reicht es aus, zu warten. Wenn die Seite wichtig ist, verlinken Sie von häufig gecrawlten Seiten darauf, stellen Sie sicher, dass sie in der Sitemap enthalten ist, und fordern Sie die Indexierung in der Search Console an. Wenn Ihr Server langsam ist, verbessern Sie auch das.",
  "Google yinelenen içerik gördü, asıl adres belirtilmemiş":
    "Google hat doppelten Inhalt ohne angegebene kanonische URL gefunden",
  "Google bu sayfayı başka bir sayfanın kopyası saydı ve hangisinin asıl olduğunu siz söylemediğiniz için kendisi seçti. Seçtiği sayfa sizin istediğiniz olmayabilir; sıralama gücü de seçtiği adreste toplanır.":
    "Google hat diese Seite als Kopie einer anderen Seite behandelt und, weil Sie nicht angegeben haben, welche kanonisch ist, selbst eine ausgewählt. Diese Wahl ist möglicherweise nicht die gewünschte, und die Ranking-Stärke sammelt sich auf der gewählten URL.",
  "Kopya grubundaki her sayfaya, asıl saydığınız adresi gösteren bir canonical (asıl adres) etiketi ekleyin. Kopyalar gereksizse asıl sayfaya yönlendirin.":
    "Fügen Sie jeder Seite der Duplikatgruppe ein Canonical-Tag hinzu, das auf die URL verweist, die Sie für kanonisch halten. Wenn die Kopien nicht benötigt werden, leiten Sie sie auf die kanonische Seite um.",
  "Google bu adresi hiç bilmiyor": "Google kennt diese URL überhaupt nicht",
  "Google bu adresi hiç duymamış: ne keşfetmiş ne taramış. Yani sayfaya giden bir yol yok ve dizine girmeyen sayfa aramada hiç çıkmaz.":
    "Google hat noch nie von dieser URL gehört: Sie wurde weder gefunden noch gecrawlt. Es führt also kein Weg zu der Seite, und eine nicht indexierte Seite erscheint nie in der Suche.",
  "Adresi site haritasına ekleyin ve site haritasını Search Console'a gönderin. Ayrıca sitenizin taranan sayfalarından bu sayfaya bağlantı verin; Google sayfaları bağlantıları izleyerek bulur.":
    "Fügen Sie die URL Ihrer Sitemap hinzu und reichen Sie die Sitemap in der Search Console ein. Verlinken Sie diese Seite außerdem von gecrawlten Seiten Ihrer Website aus; Google findet Seiten, indem es Links folgt.",
  "Google yapısal veride hata buldu":
    "Google hat Fehler in den strukturierten Daten gefunden",
  "Sayfadaki yapısal veri (Google'a sayfanın ürün, makale, tarif gibi ne olduğunu anlatan işaretleme) Google'ın zengin sonuç denetiminden geçemedi. Zengin sonuç, aramada yıldız puanı, fiyat ya da stok durumu gibi ek bilgilerin çıkmasıdır; hatalı işaretleme bunları kapatır. Bu kararı yalnızca Google verebilir; bizim tarayıcımız işaretlemenin var olup olmadığını görür, geçerli olup olmadığını göremez.":
    "Die strukturierten Daten auf der Seite (Markup, das Google sagt, was die Seite ist, z. B. ein Produkt, ein Artikel oder ein Rezept) haben die Prüfungen von Google für Rich-Suchergebnisse nicht bestanden. Rich-Suchergebnisse sind Extras in der Suche wie Sternebewertungen, Preise oder Lagerbestand; defektes Markup schaltet sie ab. Nur Google kann das beurteilen; unser Crawler sieht, ob das Markup vorhanden ist, nicht, ob es gültig ist.",
  "Adresi Google'ın Zengin Sonuç Testi'nde açın; hangi alanın eksik ya da yanlış türde olduğunu adıyla söyler. Çoğunlukla zorunlu bir alan boştur ya da sayfada görünmeyen bir şey işaretlenmiştir; düzeltin.":
    "Öffnen Sie die URL im Test für Rich-Suchergebnisse von Google; er nennt das Feld, das fehlt oder den falschen Typ hat. Meist ist ein Pflichtfeld leer, oder es wurde etwas ausgezeichnet, das auf der Seite nicht sichtbar ist. Beheben Sie das.",
  "Sitede sosyal medya paylaşım etiketleri (Open Graph) yok":
    "Website hat keine Social-Sharing-Tags (Open Graph)",
  "Taranan sayfaların hiçbirinde og:title ya da og:image yok. Bu etiketler Google sıralamasını etkilemez; bağlantınız WhatsApp, LinkedIn, Slack ya da X'te paylaşılınca ne görüneceğini belirler. Yoksa bağlantı çıplak adres olarak görünür ve paylaşımdan gelen tıklama düşer. Bu bulgu sayfa başına değil, site genelinde bir şablon eksiğini gösterir.":
    "Keine der gecrawlten Seiten hat og:title oder og:image. Diese Tags wirken sich nicht auf das Google-Ranking aus; sie bestimmen, was erscheint, wenn Ihr Link auf WhatsApp, LinkedIn, Slack oder X geteilt wird. Ohne sie erscheint der Link als bloße URL, und Klicks über geteilte Links gehen zurück. Dieser Befund deutet auf eine Lücke in der Vorlage der gesamten Website hin, nicht auf einzelne Seiten.",
  "Şablonun <head> bölümüne og:title, og:description ve tam adresli bir og:image (en az 1200x630 piksel) ekleyin. Tek bir şablon düzeltmesi tüm sayfaları kapatır; SEO eklentileri bunu hazır ayar olarak sunar.":
    "Fügen Sie og:title, og:description und ein og:image mit vollständiger URL (mindestens 1200 × 630 Pixel) in den <head> der Vorlage ein. Eine Korrektur in der Vorlage deckt jede Seite ab; SEO-Plugins bieten das als fertige Einstellung an.",
  "Sitede hiç yapısal veri yok": "Website hat keine strukturierten Daten",
  "Taranan hiçbir sayfada yapısal veri (Google'a sayfanın ürün, makale, kurum gibi ne olduğunu anlatan işaretleme) yok. Yapısal veri sıralamayı doğrudan etkilemez; bazı türler (ürün, makale, kırıntı yolu, kurum, etkinlik) aramada fiyat, puan ya da yol gibi ek bilgilerle görünmeyi mümkün kılar. Hangi türlerin gösterildiğini Google belirler ve zaman zaman kaldırır; garanti yoktur.":
    "Keine gecrawlte Seite hat strukturierte Daten (Markup, das Google sagt, was die Seite ist, z. B. ein Produkt, ein Artikel oder eine Organisation). Strukturierte Daten wirken sich nicht direkt auf Rankings aus; einige Typen (Produkt, Artikel, Navigationspfad, Organisation, Veranstaltung) ermöglichen einen Auftritt in der Suche mit Extras wie Preisen, Bewertungen oder einem Navigationspfad. Google entscheidet, welche Typen angezeigt werden, und streicht von Zeit zu Zeit welche; nichts ist garantiert.",
  "Sayfa türüne uyan işaretlemeyle başlayın: yazılar için Article, her yerde BreadcrumbList, ürün sayfası için Product, ana sayfa için Organization. Google'ın desteklediği türleri Search Gallery'den kontrol edin; FAQPage ve HowTo artık arama sonucunda zengin görünüm üretmez. İşaretleme sayfada gerçekten görünen içeriği anlatmalı; görünmeyeni işaretlemek Google kurallarına aykırıdır.":
    "Beginnen Sie mit Markup, das zum Seitentyp passt: Article für Beiträge, BreadcrumbList überall, Product für Produktseiten, Organization für die Startseite. Prüfen Sie die von Google unterstützten Typen in der Suchgalerie; FAQPage und HowTo erzeugen keine Rich-Suchergebnisse mehr. Markup muss tatsächlich auf der Seite sichtbaren Inhalt beschreiben; Unsichtbares auszuzeichnen verstößt gegen die Richtlinien von Google.",
  "Sayfa birbiriyle çelişen asıl adresler bildiriyor":
    "Seite deklariert widersprüchliche Canonicals",
  "Sayfanın head bölümünde farklı adresleri gösteren birden çok canonical (asıl adres) etiketi var. Bu, iki farklı söz demektir, daha güçlü bir söz değil; Google çelişkiyi kendi seçimini yaparak çözer. Genelde şablon bir adres, bir eklenti başka bir adres yazınca olur.":
    "Der <head> der Seite enthält mehrere Canonical-Tags, die auf verschiedene URLs verweisen. Das sind zwei verschiedene Aussagen, keine stärkere; Google löst den Konflikt, indem es selbst entscheidet. Das passiert meist, wenn die Vorlage eine URL schreibt und ein Plugin eine andere.",
  "Sayfa kaynağında asıl adres etiketlerini bulun, hangisinin doğru olduğuna karar verin ve diğerini üreten ayarı ya da eklentiyi kapatın. Aynı adresi iki kez yazan kurulum sorun değildir; bulgu yalnızca adresler farklıyken çıkar.":
    "Suchen Sie die Canonical-Tags im Seitenquelltext, entscheiden Sie, welches richtig ist, und deaktivieren Sie die Einstellung oder das Plugin, das das andere schreibt. Eine Einrichtung, die dieselbe URL zweimal schreibt, ist in Ordnung; dieser Befund erscheint nur, wenn sich die URLs unterscheiden.",
  "Google bu sayfayı uzun süredir taramadı":
    "Google hat diese Seite schon lange nicht mehr gecrawlt",
  "Google bu adresi en son aylar önce ziyaret etmiş. Sayfa dizinde olabilir ama Google'ın gördüğü sürüm o tarihteki sürüm: sonradan yaptığınız değişiklikler aramaya yansımamıştır. Nadiren taranan sayfalar genelde siteden yeterince bağlantı almayan ya da Google'ın önemsiz bulduğu sayfalardır.":
    "Google hat diese URL zuletzt vor Monaten besucht. Die Seite ist möglicherweise indexiert, aber Google hat die Version von diesem Datum: Änderungen, die Sie seitdem vorgenommen haben, sind in der Suche nicht berücksichtigt. Selten gecrawlte Seiten erhalten meist zu wenige Links innerhalb der Website oder gelten bei Google als unwichtig.",
  "Sayfaya sık taranan sayfalardan bağlantı verin ve site haritasında olduğundan emin olun. İçerik gerçekten güncellendiyse Search Console'dan dizine ekleme isteyebilirsiniz; ama kalıcı çözüm sayfayı siteye daha iyi bağlamaktır.":
    "Verlinken Sie die Seite von häufig gecrawlten Seiten aus und stellen Sie sicher, dass sie in der Sitemap steht. Wenn der Inhalt tatsächlich aktualisiert wurde, können Sie in der Search Console die Indexierung beantragen; die dauerhafte Lösung ist jedoch, die Seite besser in die Website einzubinden.",
  "Sayfanın ana içeriği geç yükleniyor (LCP)":
    "Der Hauptinhalt der Seite wird spät geladen (LCP)",
  "Sayfanın en büyük öğesi (genelde kapak görseli ya da ana başlık) 4 saniyeden geç göründü. Google bu süreyi 'zayıf' sayar. Google, sıralama sistemlerinde alan verisini (CrUX) kullanır; ama iyi bir değer tek başına sıralama garantisi vermez, içeriğin ilgili olması öncelik taşır. Bu, PageSpeed Insights'ın laboratuvar ölçümüdür; ziyaretçilerinizin gerçek süresi değil, ama onun güvenilir bir göstergesidir.":
    "Das größte Element der Seite (meist das Hero-Bild oder die Hauptüberschrift) erschien erst nach mehr als 4 Sekunden. Google bewertet diese Zeit als „schlecht“. Google nutzt Felddaten (CrUX) in seinen Ranking-Systemen, aber ein guter Wert allein garantiert keine Rankings; relevanter Inhalt kommt zuerst. Dies ist eine Labormessung von PageSpeed Insights: nicht die tatsächliche Zeit Ihrer Besucher, aber ein zuverlässiger Indikator dafür.",
  "PageSpeed Insights raporunda en büyük öğenin ne olduğuna bakın. Genelde bir görseldir: görseli küçültüp WebP gibi hafif bir biçime çevirin, ilk ekrandaki görselin geç yüklenmesini kapatın ve sayfayı yavaşlatan betik ve yazı tiplerini erteleyin.":
    "Prüfen Sie im PageSpeed-Insights-Bericht, welches das größte Element ist. Meist ist es ein Bild: Verkleinern Sie es, wandeln Sie es in ein leichteres Format wie WebP um, deaktivieren Sie Lazy Loading für das Bild im ersten sichtbaren Bereich, und laden Sie Skripte und Schriftarten, die die Seite bremsen, verzögert.",
  "Sayfa yüklenirken içerik kayıyor (CLS)":
    "Inhalt verschiebt sich, während die Seite geladen wird (CLS)",
  "Sayfa yüklenirken içerik 0,25'ten fazla kaydı; Google bu değeri 'zayıf' sayar. Okurken metin kayınca ziyaretçi yanlış yere tıklar. Bu, laboratuvar ölçümüdür.":
    "Der Inhalt hat sich beim Laden der Seite um mehr als 0,25 verschoben; Google bewertet diesen Wert als „schlecht“. Wenn sich Text bewegt, während jemand liest, klickt er auf das Falsche. Dies ist eine Labormessung.",
  "Görsellere ve gömülü çerçevelere genişlik ile yükseklik verin, reklam ve afiş alanları için yer ayırın, özel yazı tipi için yerleşimi bozmayan bir yedek yazı tipi tanımlayın.":
    "Geben Sie Bildern und eingebetteten Rahmen eine Breite und Höhe, reservieren Sie Platz für Anzeigen- und Bannerplätze und definieren Sie eine Ersatzschriftart für benutzerdefinierte Schriftarten, die das Layout nicht beeinträchtigt.",
  "Sayfa tıklamalara geç yanıt veriyor (INP)":
    "Seite reagiert langsam auf Klicks (INP)",
  "Sayfa bir tıklamaya ya da dokunuşa 500 milisaniyeden geç yanıt verdi; Google bu süreyi 'zayıf' sayar. Bu ölçü (INP) 2024'ten beri Core Web Vitals'ın parçasıdır. Laboratuvar testi etkileşimi taklit edemediği için bu değer Chrome kullanıcılarından toplanan gerçek (alan) veridir.":
    "Die Seite brauchte länger als 500 Millisekunden, um auf einen Klick oder ein Tippen zu reagieren; Google bewertet diese Zeit als „schlecht“. Diese Metrik (INP) gehört seit 2024 zu den Core Web Vitals. Da ein Labortest keine Interaktion simulieren kann, ist dieser Wert ein echter Felddatenwert, erhoben bei Chrome-Nutzern.",
  "Sayfayı en çok meşgul eden betikleri bulun; genelde üçüncü taraf etiketler (reklam, sohbet, takip kodu) ve büyük betik paketleridir. Gereksizleri kaldırın, kalanları sayfa açıldıktan sonra yükleyin.":
    "Finden Sie die Skripte, die die Seite am stärksten auslasten; meist sind es Tags von Drittanbietern (Anzeigen, Chat, Tracking-Code) und große Skriptpakete. Entfernen Sie die unnötigen und laden Sie den Rest, nachdem die Seite geöffnet ist.",
  "Google'ın SEO denetim puanı düşük": "Niedriger SEO-Audit-Score von Google",
  "PageSpeed Insights'ın SEO denetimi bu sayfaya 90'ın altında puan verdi. Bu denetim başlık, meta açıklama, bağlantı metinleri, taranabilirlik (robots, HTTP durum kodu), geçerli canonical ve hreflang gibi temel kontrollere bakar. Puanın kendisi sıralamayı etkilemez; hangi kontrollerin başarısız olduğunu gösterir.":
    "Das SEO-Audit von PageSpeed Insights hat dieser Seite einen Score unter 90 gegeben. Das Audit prüft Grundlegendes wie Titel, Meta-Beschreibung, Linktext, Crawlbarkeit (Robots, HTTP-Statuscode), ein gültiges Canonical und hreflang. Der Score selbst wirkt sich nicht auf das Ranking aus; er zeigt, welche Prüfungen fehlgeschlagen sind.",
  "Sayfayı PageSpeed Insights'ta açın ve SEO bölümünde başarısız görünen kontrollere bakın. Her biri neyin eksik olduğunu adıyla söyler; başarısız kontroller düzelince puan yükselir.":
    "Öffnen Sie die Seite in PageSpeed Insights und sehen Sie sich im SEO-Bereich die fehlgeschlagenen Prüfungen an. Jede nennt, was fehlt; der Score steigt, sobald die fehlgeschlagenen Prüfungen behoben sind.",
  "AMP sayfası": "AMP-Artikel",
  "AMP haber kutusu": "AMP-Top-Storys",
  "AMP hikayesi": "AMP-Story",
  "Gezinme yolu (breadcrumb)": "Navigationspfad",
  "Etkinlik ayrıntısı": "Veranstaltungsdetails",
  "Etkinlik listesi": "Veranstaltungsliste",
  "Sık sorulan sorular": "FAQ",
  "Nasıl yapılır": "Anleitung",
  "İş ilanı ayrıntısı": "Stellendetails",
  "İş ilanı listesi": "Stellenanzeige",
  "Ürün listesi": "Händlereinträge",
  "Ürün özeti": "Produkt-Snippets",
  "Alıştırma sorusu": "Übungsaufgaben",
  "Matematik çözücü": "Mathe-Löser",
  "Tarif kutusu": "Rezeptfunktion",
  "Tarif özeti": "Rezept-Rich-Snippet",
  "Değerlendirme özeti": "Rezensions-Snippet",
  "Site içi arama kutusu": "Sitelinks-Suchfeld",
  "Soru ve cevap": "Fragen und Antworten",
  "Video bölümleri": "Videokapitel",
  "Web hikayesi": "Web Story",
  "Ücretsiz alışveriş listesi": "Shopping-Einträge",
  "Çevrilmiş sonuç": "Übersetztes Ergebnis",
  "Diğer görünümler": "Weitere Darstellungen",
  "Sayfanın en üstü": "Seitenanfang",
  "İlk sayfanın geri kalanı": "Rest der ersten Seite",
  "İkinci sayfa": "Seite zwei",
  "21 ve sonrası": "21 und darüber hinaus",
  "Pek görülmeyen yerler": "Selten gesehen",
  "Hiç tıklanmayan": "Keine Klicks",
  "Görünüyor ama açılmıyor": "Gesehen, aber nicht geöffnet",
  "1-9 tıklama": "1-9 Klicks",
  "10-99 tıklama": "10-99 Klicks",
  "100+ tıklama": "100+ Klicks",
  "Trafiği taşıyanlar": "Die mit Traffic",
  "Sıra 5-10": "Position 5-10",
  "Sıra 11-20": "Position 11-20",
  "İlk sayfanın alt yarısı": "Untere Hälfte von Seite eins",
  "Ortalama sırası 5 ile 20 arasında olan sorgular. 5-10 arası ilk sayfanın alt yarısı, 11-20 ikinci sayfa; küçük bir iyileştirme ikisini de üste taşıyabilir. Gösterime göre sıralı.":
    "Suchanfragen mit einer durchschnittlichen Position zwischen 5 und 20. Positionen 5–10 sind die untere Hälfte von Seite eins, 11–20 sind Seite zwei; eine kleine Verbesserung kann beide nach oben bringen. Sortiert nach Impressionen.",
  "İnsanların sizi hangi aramalarla bulduğu; her sorgunun tıklama, gösterim ve ortalama sırasıyla.":
    "Die Suchanfragen, mit denen Sie gefunden werden, jeweils mit Klicks, Impressionen und durchschnittlicher Position.",
  "Google'da en çok görünen ve tıklanan sayfalarınız.":
    "Ihre Seiten, die bei Google am häufigsten angezeigt und angeklickt werden.",
  "Aynı arama için birden fazla sayfanızın birbiriyle yarıştığı yerler.":
    "Hier konkurrieren mehrere Ihrer Seiten um dieselbe Suche.",
  "Bu gruba uyan sorgu yok": "Keine Suchanfragen in dieser Gruppe",
  "Seçimi kaldırarak sıra 4-20 arasındaki tüm sorgulara dönün.":
    "Heben Sie die Auswahl auf, um wieder alle Suchanfragen auf den Positionen 4–20 zu sehen.",
  "Bu dönemde 4-20. sırada kelime yok":
    "Keine Keywords auf den Positionen 4–20 in diesem Zeitraum",
  "Hiçbir kelimeniz 4-20. sırada değil. Bu aralıktaki kelimeler küçük bir iyileştirmeyle üst sıralara çıkabilir; olunca burada listelenir.":
    "Keines Ihrer Keywords befindet sich auf den Positionen 4–20. Keywords in diesem Bereich können mit einer kleinen Verbesserung höher steigen; sobald es welche gibt, werden sie hier aufgelistet.",
  "Bu seçimde sorgu verisi yok": "Keine Suchanfragedaten für diese Auswahl",
  "Seçili ülke ya da cihaz için Search Console sorgu verisi paylaşmadı. Filtreyi kaldırarak tüm trafiğe bakın.":
    "Die Search Console hat für das ausgewählte Land oder Gerät keine Suchanfragedaten bereitgestellt. Entfernen Sie den Filter, um den gesamten Traffic zu sehen.",
  "Kelime düzeyinde veri henüz gelmedi": "Noch keine Daten auf Keyword-Ebene",
  "Search Console, hangi kelimeyle arandığınızı bu dönem için henüz paylaşmadı. Az trafikli sitelerde bu normaldir. Veri gelince 4-20. sıradaki kelimeler burada listelenir.":
    "Die Search Console hat noch nicht mitgeteilt, nach welchen Keywords in diesem Zeitraum gesucht wurde. Bei Websites mit wenig Traffic ist das normal. Sobald Daten eintreffen, werden Keywords auf den Positionen 4–20 hier aufgelistet.",
  Mobil: "Mobil",
  "Akıllı TV": "Smart TV",
  "{value} puan": "{value} Prozentpunkte",
  "{start} - {end} dönemine göre": "Verglichen mit {start} - {end}",
  "Gösterimlerin yüzde kaçı tıklamaya döndü.":
    "Der Anteil der Impressionen, die zu einem Klick führten.",
  "Düşük sayı daha iyi: 1, listenin en üstü demek.":
    "Niedriger ist besser: 1 ist der erste Platz der Ergebnisse.",
  Cihazlar: "Geräte",
  "Tıklamaların hangi cihazlardan geldiği. Bir cihaza tıklayarak tüm sayfayı o cihaza göre daraltabilirsiniz.":
    "Von welchen Geräten die Klicks kamen. Klicken Sie auf ein Gerät, um die gesamte Seite darauf einzugrenzen.",
  gösterim: "Impressionen",
  "Arama görünümü": "Darstellung in der Suche",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü (tıklama sayısına göre). Google bu dökümü başka bir ölçüyle birleştirmez.":
    "In welchen speziellen Formaten Ihre Ergebnisse bei Google erschienen sind (nach Klicks). Google kombiniert diese Aufschlüsselung mit keiner anderen Dimension.",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü (gösterim sayısına göre). Google bu dökümü başka bir ölçüyle birleştirmez.":
    "In welchen speziellen Formaten Ihre Ergebnisse bei Google erschienen sind (nach Impressionen). Google kombiniert diese Aufschlüsselung mit keiner anderen Dimension.",
  "Son 28 gün": "Letzte 28 Tage",
  "Son 3 ay": "Letzte 3 Monate",
  Haber: "News",
  "Arama türü": "Suchtyp",
  "Cihaz filtresi": "Gerätefilter",
  "Tüm cihazlar": "Alle Geräte",
  "Ülke filtresi": "Länderfilter",
  "Tüm ülkeler": "Alle Länder",
  "Tarih aralığı": "Zeitraum",
  "İlk 10'da": "In den Top 10",
  "Ortalama sırası 10 veya daha iyi olanlar; yani Google'ın ilk sayfası.":
    "Durchschnittliche Position 10 oder besser, d. h. die erste Seite von Google.",
  "Gösterilmiş ama bir kez bile tıklanmamış satırlar.":
    "Zeilen, die angezeigt, aber nie angeklickt wurden.",
  "Tıklama oranı düşük": "Niedrige CTR",
  "İlk sayfada olup {impressions} veya daha fazla gösterim alan ve tıklama oranı {ctr} altında kalan satırlar. Başlığı ve açıklamayı iyileştirmeye değer.":
    "Zeilen auf Seite eins mit {impressions} oder mehr Impressionen und einer CTR unter {ctr}. Ihr Titel und ihre Beschreibung sind verbesserungswürdig.",
  Tıklanan: "Angeklickt",
  "En az bir tıklama almış satırlar.": "Zeilen mit mindestens einem Klick.",
  "İlk sayfanın alt yarısı. Küçük bir iyileştirme ilk üçe taşıyabilir.":
    "Die untere Hälfte der ersten Seite. Eine kleine Verbesserung kann diese unter die ersten drei bringen.",
  "İkinci sayfa. İlk sayfaya girmek tıklamayı en çok artıran adımdır.":
    "Seite zwei. Das Erreichen von Seite eins ist der Schritt, der die meisten Klicks hinzufügt.",
  Ülkeler: "Länder",
  "{country} filtresini kaldır": "Filter „{country}“ entfernen",
  "Tıklamaların hangi ülkelerden geldiği. Halkadan ya da tablodan bir ülkeye tıklayarak tüm sayfayı o ülkeye göre daraltabilirsiniz.":
    "Aus welchen Ländern kamen die Klicks? Klicken Sie auf ein Land im Ring oder in der Tabelle, um die gesamte Seite darauf einzugrenzen.",
  "Diğer ülkeler": "Andere Länder",
  Dağılım: "Verteilung",
  Pay: "Anteil",
  "Ort. sıra": "Ø Position",
  "{count} ülke daha": {
    one: "{count} weiteres Land",
    other: "{count} weitere Länder",
  },
  "Toplam {total} tıklamanın {share} kadarı {country} kaynaklı.":
    "{share} der {total} Klicks kamen aus {country}.",
  "Toplam {count} tıklama.": {
    one: "{count} Klick insgesamt.",
    other: "{count} Klicks insgesamt.",
  },
  Sıra: "Position",
  "{value} için işlemler": "Aktionen für {value}",
  "Sayfayı yeni sekmede aç": "Seite in einem neuen Tab öffnen",
  "Kelime olarak kaydet": "Als Keyword speichern",
  Sorgu: "Suchanfrage",
  "tıklama oranı": "CTR",
  "ortalama sıra": "durchschnittliche Position",
  "Günlük {metric}": "{metric} pro Tag",
  Gün: "Tag",
  "{days} günde toplam {total} {metric}. En yüksek gün {day}, {peak}.":
    "{total} {metric} insgesamt in {days} Tagen. Höchster Tag: {day}, {peak}.",
  "{days} günde ortalama {average} {metric}. En iyi gün {day}, {peak}.":
    "In {days} Tagen lag {metric} im Durchschnitt bei {average}. Bester Tag: {day}, {peak}.",
  "Günlük değişim": "Tagestrend",
  "Yukarıdaki toplamların günlere dağılımı.":
    "Die Gesamtwerte oben, aufgeschlüsselt nach Tag.",
  "Grafik ölçüsü": "Diagrammmetrik",
  "Bu dönemde hiç gösterim yok, grafik boş. Search Console sayfalarınızı arama sonuçlarında göstermeye başlayınca günlük dağılım burada görünür.":
    "Keine Impressionen in diesem Zeitraum, daher ist das Diagramm leer. Sobald die Search Console beginnt, Ihre Seiten in den Suchergebnissen anzuzeigen, wird hier die tägliche Aufschlüsselung angezeigt.",
  "Sorgular kaç sırada?": "Wo rangieren Ihre Suchanfragen?",
  "Bu filtrelerle Search Console sorgu vermedi, bu yüzden dağılım çizilemiyor.":
    "Die Search Console hat für diese Filter keine Suchanfragen zurückgegeben, daher gibt es keine zu zeichnende Verteilung.",
  "{total} sorgunun {firstPage} tanesi ilk sayfada (sıra 1-10). Bir çubuğa tıklayarak tabloyu daraltın.":
    "{firstPage} von {total} Suchanfragen stehen auf Seite eins (Positionen 1–10). Klicken Sie auf einen Balken, um die Tabelle einzugrenzen.",
  "{total} sorgunun ortalama sıraya göre dağılımı; {firstPage} tanesi ilk sayfada.":
    "{total} Suchanfragen nach durchschnittlicher Position; {firstPage} davon stehen auf der ersten Seite.",
  "Tıklamalar sayfalara nasıl dağılıyor?":
    "Wie verteilen sich die Klicks auf die Seiten?",
  "Bu filtrelerle Search Console sayfa vermedi, bu yüzden dağılım çizilemiyor.":
    "Die Search Console hat für diese Filter keine Seiten zurückgegeben, daher gibt es keine zu zeichnende Verteilung.",
  "{total} sayfanın {clicked} tanesi tıklama aldı.":
    "{clicked} von {total} Seiten haben Klicks erhalten.",
  "En çok tıklanan 5 sayfanın tıklamalardaki payı: {share}.":
    "Die 5 am häufigsten angeklickten Seiten erhielten {share} aller Klicks.",
  "{lead} Bir çubuğa tıklayarak tabloyu daraltın.":
    "{lead} Klicken Sie auf einen Balken, um die Tabelle einzugrenzen.",
  "{total} sayfanın aldığı tıklamaya göre dağılımı. {lead}":
    "{total} Seiten nach erhaltenen Klicks. {lead}",
  "Sıra 5-20 fırsatı": "Chancen auf den Positionen 5–20",
  "Sıralaması 5 ile 20 arasında kalan sorgu olmadığı için pay hesaplanamıyor.":
    "Keine Suchanfrage rankt zwischen 5 und 20, daher lässt sich kein Anteil berechnen.",
  "{queries} sorgu toplam {impressions} gösterim alıyor ama ilk üçün dışında kalıyor. Çubuklar gösterim payını gösterir; birine tıklayarak tabloyu daraltın.":
    "{queries} Suchanfragen erzielen insgesamt {impressions} Impressionen, liegen aber außerhalb der ersten drei. Die Balken zeigen den Anteil jeder Gruppe an den Impressionen; klicken Sie auf einen, um die Tabelle einzugrenzen.",
  "Sıra 5-20 arasındaki {queries} sorgunun {impressions} gösterimi, sıra 5-10 ve 11-20 olarak bölünmüş.":
    "{impressions} Impressionen aus {queries} Suchanfragen auf den Positionen 5–20, aufgeteilt in die Positionen 5–10 und 11–20.",
  "Search Console bu dönem için sorgu vermedi, bu yüzden karşılaştırılacak bir şey yok.":
    "Die Search Console hat für diesen Zeitraum keine Suchanfragen zurückgegeben, daher gibt es nichts zu vergleichen.",
  "Hiçbir sorguda iki sayfanız birbiriyle yarışmıyor, bu yüzden özetlenecek bir şey yok.":
    "Bei keiner Suchanfrage konkurrieren zwei Ihrer Seiten miteinander, daher gibt es nichts zusammenzufassen.",
  "{count} sorgu incelendi.": {
    one: "{count} Suchanfrage analysiert.",
    other: "{count} Suchanfragen analysiert.",
  },
  "{queries} sorguda birden fazla sayfanız yarışıyor; {impressions} gösterim risk altında.":
    "Bei {queries} Suchanfragen konkurriert mehr als eine Ihrer Seiten; {impressions} Impressionen sind gefährdet.",
  "En çok kaybettiren sorgu": "Suchanfrage mit dem größten Verlust",
  "Listeyi bu sorguya daraltır": "Grenzt die Liste auf diese Suchanfrage ein",
  "{impressions} gösterim bölünüyor · {pages} sayfa":
    "{impressions} Impressionen aufgeteilt · {pages} Seiten",
  "Çakışma raporu yüklenemedi":
    "Der Kannibalisierungsbericht konnte nicht geladen werden",
  "Çakışma araması yapılamadı": "Prüfung auf Kannibalisierung nicht möglich",
  "Çakışma bulunamadı": "Keine Kannibalisierung gefunden",
  "Search Console bu dönem için sorgu vermedi, karşılaştırılacak bir şey yok. Daha geniş bir tarih aralığı deneyin.":
    "Die Search Console hat für diesen Zeitraum keine Suchanfragen zurückgegeben, daher gibt es nichts zu vergleichen. Versuchen Sie es mit einem längeren Zeitraum.",
  "İncelenen {count} sorguda çakışma yok. Ancak Search Console satır sınırına takıldık, yani bakamadığımız sorgular kaldı.":
    {
      one: "Keine Kannibalisierung bei {count} analysierten Suchanfrage. Wir haben jedoch das Zeilenlimit der Search Console erreicht, daher wurden einige Suchanfragen nicht geprüft.",
      other:
        "Keine Kannibalisierung bei den {count} analysierten Suchanfragen. Wir haben jedoch das Zeilenlimit der Search Console erreicht, daher wurden einige Suchanfragen nicht geprüft.",
    },
  "İncelenen {count} sorgunun hiçbirinde iki sayfanız birbiriyle yarışmıyor.": {
    one: "Bei {count} analysierten Suchanfrage konkurrieren keine Ihrer Seiten miteinander.",
    other:
      "Bei keiner der {count} analysierten Suchanfragen konkurrieren zwei Ihrer Seiten miteinander.",
  },
  "{queries} sorguda birden fazla sayfanız yarışıyor ve bu yüzden {impressions} Google'ın tercih ettiği sayfa dışında kalıyor. Önce hangi sayfayı hedeflediğinize karar verin ve iç bağlantıları ona yöneltin; sayfalar gerçekten aynı soruyu yanıtlıyorsa birleştirin.":
    "Bei {queries} Suchanfragen konkurriert mehr als eine Ihrer Seiten, daher gehen {impressions} an andere Seiten als die von Google bevorzugte. Entscheiden Sie zuerst, auf welche Seite Sie abzielen, und lassen Sie interne Links auf sie verweisen; wenn die Seiten wirklich dieselbe Frage beantworten, führen Sie sie zusammen.",
  "{impressions} gösterim": "{impressions} Impressionen",
  "{start} – {end} · {queries} sorgu incelendi":
    "{start} – {end} · {queries} analysierte Suchanfragen",
  "Search Console tek seferde sınırlı satır döndürür ve bu sınıra takıldık. Listede olmayan çakışmalar olabilir.":
    "Die Search Console gibt eine begrenzte Anzahl von Zeilen gleichzeitig zurück, und wir haben dieses Limit erreicht. Möglicherweise liegt eine Kannibalisierung vor, die in dieser Liste nicht angezeigt wird.",
  '"{search}" geçen {count} sorgu gösteriliyor.': {
    one: "{count} Suchanfrage mit „{search}“ wird angezeigt.",
    other: "{count} Suchanfragen mit „{search}“ werden angezeigt.",
  },
  "Google'ın tercih ettiği sayfa dışında kalan gösterim payı":
    "Anteil der Impressionen, die zu anderen als den von Google bevorzugten Seiten gingen",
  "Aynı sorguya yarışan sayfalar":
    "Seiten, die um dieselbe Suchanfrage konkurrieren",
  "Google bu sorguda en çok bu sayfayı gösteriyor":
    "Google zeigt diese Seite am häufigsten für diese Suchanfrage an",
  "Tercih edilen": "Bevorzugt",
  "Dışa aktarılamadı": "Export nicht möglich",
  "Google Search Console'dan gelen tıklama, gösterim, tıklama oranı ve ortalama sıra.":
    "Klicks, Impressionen, CTR und durchschnittliche Position aus der Google Search Console.",
  "Mülkü değiştir": "Property ändern",
  "Arama performansı yüklenemedi": "Suchleistung konnte nicht geladen werden",
  "Arama türü: {type}": "Suchtyp: {type}",
  "Sıra 5-20 ({count})": "Positionen 5–20 ({count})",
  Sorgular: "Suchanfragen",
  Sayfalar: "Seiten",
  "Sayfa çakışmaları": "Kannibalisierung",
  "Bu analiz için 7 günlük seçim 28 güne çıkarılır. Gerçek tarih aralığı aşağıda yazar.":
    "Für diese Analyse wird eine 7-Tage-Auswahl auf 28 Tage erweitert. Der tatsächliche Datumsbereich wird unten angezeigt.",
  "Tablo yüklenemedi": "Die Tabelle konnte nicht geladen werden",
  "{column} içinde ara": "{column} durchsuchen",
  "Arama performansı: {column}": "Suchleistung: {column}",
  "Aramanıza uyan satır yok": "Keine Zeilen stimmen mit Ihrer Suche überein",
  "Bu hızlı filtreye uyan satır yok":
    "Keine Zeilen entsprechen diesem Schnellfilter",
  "Bu filtrelerle eşleşen satır yok": "Keine Zeilen entsprechen diesen Filtern",
  "Bu dönem için henüz veri yok": "Noch keine Daten für diesen Zeitraum",
  '"{search}" hiçbir satırda geçmiyor. Aramayı temizleyin ya da başka bir terim deneyin.':
    "Keine Zeile enthält „{search}“. Leeren Sie die Suche oder versuchen Sie es mit einem anderen Begriff.",
  "Hızlı filtreyi kaldırarak tüm satırlara dönün.":
    "Entfernen Sie den Schnellfilter, um wieder alle Zeilen zu sehen.",
  "Arama türü, cihaz ya da ülke filtresini genişletmeyi deneyin.":
    "Versuchen Sie, den Suchtyp-, Geräte- oder Länderfilter zu erweitern.",
  "Search Console verisi birkaç gün gecikmeli gelir. Mülkü yeni bağladıysanız biraz daha beklemeniz gerekebilir.":
    "Search-Console-Daten treffen mit einigen Tagen Verzögerung ein. Wenn Sie die Property gerade erst verbunden haben, müssen Sie möglicherweise etwas länger warten.",
  "Google tek seferde en fazla bu kadar satır verir ve sınıra ulaşıldı, liste tam değil. Daraltmak için filtreleri kullanın.":
    "Google gibt höchstens so viele Zeilen auf einmal zurück, und das Limit wurde erreicht; die Liste ist daher unvollständig. Grenzen Sie sie mit den Filtern ein.",
  "{count} kelime kayıtlı": {
    one: "{count} Keyword gespeichert",
    other: "{count} Keywords gespeichert",
  },
  "Kelimeler kaydedilemedi": "Keywords konnten nicht gespeichert werden",
  "Kelime kayıtlı": "Keyword gespeichert",
  "Kelime kaydedilemedi": "Keyword konnte nicht gespeichert werden",
  "Önceki dönemde bu sorgu için veri yok.":
    "Keine Daten für diese Suchanfrage im vorherigen Zeitraum.",
  "Önceki dönemde veri yok": "Keine Daten im vorherigen Zeitraum",
  Değişmedi: "Keine Änderung",
  "Yükseldi {value}": "Gestiegen um {value}",
  "Düştü {value}": "Gesunken um {value}",
  "Takip edilen sorgular ortalama sırasına göre gruplanır. Bir çubuğa tıklayınca tablo o gruba daralır.":
    "Verfolgte Suchanfragen sind nach durchschnittlicher Position gruppiert. Klicken Sie auf einen Balken, um die Tabelle auf diese Gruppe einzugrenzen.",
  "{count} sorgunun ortalama sırası. Bir çubuğa tıklayınca tablo o gruba göre daralır.":
    {
      one: "Durchschnittliche Position von {count} Suchanfrage. Klicken Sie auf einen Balken, um die Tabelle auf diese Gruppe einzugrenzen.",
      other:
        "Durchschnittliche Position von {count} Suchanfragen. Klicken Sie auf einen Balken, um die Tabelle auf diese Gruppe einzugrenzen.",
    },
  "Sıra grupları": "Positionsgruppen",
  "Sıra {band}: {count} sorgu": {
    one: "Position {band}: {count} Suchanfrage",
    other: "Position {band}: {count} Suchanfragen",
  },
  "Sırası {band} olan sorguları göster":
    "Suchanfragen auf den Positionen {band} anzeigen",
  "Arşiv durumu okunamadı": "Archivstatus konnte nicht gelesen werden",
  "Sıralama arşivi Search Console verisinden doldurulur. Bağladığınızda geçmiş günler kendiliğinden birikmeye başlar.":
    "Das Ranking-Archiv wird aus Search-Console-Daten gefüllt. Sobald Sie die Search Console verbinden, füllen sich die vergangenen Tage von selbst.",
  "Arşiv güncellenemedi: {error}":
    "Das Archiv konnte nicht aktualisiert werden: {error}",
  "{date} tarihine kadar kontrol edildi, kelime verisi bulunamadı.":
    "Geprüft bis {date}; es wurden keine Keyword-Daten gefunden.",
  "Veri yükleme henüz başlamadı.":
    "Das Laden der Daten hat noch nicht begonnen.",
  "Kalan günler sonraki açılışlarda yüklenecek.":
    "Die verbleibenden Tage werden geladen, wenn Sie diese Seite das nächste Mal öffnen.",
  "Arşiv {start} – {end} arasını kapsıyor, {rows} satır.":
    "Das Archiv umfasst {start} – {end}, {rows} Zeilen.",
  "Arşiv {rows} satır.": "Das Archiv enthält {rows} Zeilen.",
  "Bu açılışta {count} gün eklendi.": {
    one: "{count} Tag bei diesem Besuch hinzugefügt.",
    other: "{count} Tage bei diesem Besuch hinzugefügt.",
  },
  "Kalan günler sonraki açılışta tamamlanacak.":
    "Die verbleibenden Tage werden ergänzt, wenn Sie diese Seite das nächste Mal öffnen.",
  "Hangi kelimelerle arandığınız henüz görünmüyor":
    "Mit welchen Keywords nach Ihnen gesucht wird, ist noch nicht sichtbar",
  "Sitenizin hangi aramalarda kaçıncı sırada çıktığını burada izlersiniz. Search Console kelime bazında veri verdikçe birikir. Az ziyaretçisi olan sitelerde birkaç hafta sürebilir. O zamana kadar toplam tıklama ve gösterime Arama performansı'ndan bakın.":
    "Hier verfolgen Sie, auf welcher Position Ihre Website bei jeder Suche erscheint. Die Daten bauen sich auf, sobald die Search Console Daten auf Keyword-Ebene bereitstellt; bei Websites mit wenig Traffic kann das einige Wochen dauern. Prüfen Sie bis dahin die Gesamtzahl der Klicks und Impressionen in der Suchleistung.",
  "Arama performansını aç": "Suchleistung öffnen",
  "Henüz sıralama verisi yok": "Noch keine Ranking-Daten",
  "Search Console'u bağlayınca geçmiş günler kendiliğinden birikir.":
    "Sobald Sie die Search Console verbinden, füllen sich die vergangenen Tage von selbst.",
  "Yükselenler ve düşenler": "Aufsteiger und Absteiger",
  "En çok yükselenler": "Größte Aufsteiger",
  "Bu dönemde belirgin yükselen sorgu yok.":
    "In diesem Zeitraum ist keine Suchanfrage merklich gestiegen.",
  "En çok düşenler": "Größte Absteiger",
  "Bu dönemde belirgin düşen sorgu yok.":
    "In diesem Zeitraum ist keine Suchanfrage merklich gefallen.",
  "Sıra geçmişi: {best} ile {worst} arasında":
    "Positionsverlauf: zwischen {best} und {worst}",
  "En iyi {value}": "Beste: {value}",
  "En kötü {value}": "Schlechteste: {value}",
  "{date} · Sıra {position} · {clicks} tıklama · {impressions} gösterim":
    "{date} · Position {position} · {clicks} Klicks · {impressions} Impressionen",
  "Günlük değeri görmek için grafiğin üzerine gelin ya da grafiğe odaklanıp sol ve sağ ok tuşlarını kullanın.":
    "Bewegen Sie den Mauszeiger über das Diagramm, um den Wert eines Tages zu sehen, oder fokussieren Sie es und verwenden Sie die Pfeiltasten links und rechts.",
  "Sorgu geçmişi yüklenemedi":
    "Verlauf der Suchanfrage konnte nicht geladen werden",
  "Bu sorgu için kayıtlı gün yok.":
    "Für diese Suchanfrage wurden keine Tage erfasst.",
  "{start} – {end} · {count} gün kayıtlı": {
    one: "{start} – {end} · {count} Tag erfasst",
    other: "{start} – {end} · {count} Tage erfasst",
  },
  "Toplam tıklama / gösterim: {clicks} / {impressions}":
    "Klicks / Impressionen insgesamt: {clicks} / {impressions}",
  "Arama performansında aç": "In der Suchleistung öffnen",
  Değişim: "Ändern",
  "Bir önceki, aynı uzunluktaki dönemle karşılaştırılır. Sıra numarası küçüldüyse (12'den 8'e gibi) kelime yükselmiştir ve yeşil “Yükseldi” yazar. Büyüdüyse kırmızı “Düştü” yazar.":
    "Verglichen mit dem vorherigen gleich langen Zeitraum. Wurde die Positionszahl kleiner (z. B. von 12 auf 8), ist das Keyword gestiegen und zeigt ein grünes „Gestiegen“. Wurde sie größer, erscheint ein rotes „Gesunken“.",
  "Sorgular yüklenemedi": "Suchanfragen konnten nicht geladen werden",
  "Kayıtlı kelimelere ekle": "Zu gespeicherten Keywords hinzufügen",
  "30 gün": "30 Tage",
  "90 gün": "90 Tage",
  "6 ay": "6 Monate",
  "16 ay": "16 Monate",
  "Arşivin tamamı": "Gesamtes Archiv",
  "Aramanıza uyan sorgu yok": "Keine Suchanfragen entsprechen Ihrer Suche",
  "Bu filtreye uyan sorgu yok": "Keine Suchanfragen entsprechen diesem Filter",
  "Bu aralıkta kayıtlı sorgu yok":
    "Keine Suchanfragen in diesem Zeitraum erfasst",
  "Arama kutusunu temizleyin ya da başka bir sorgu deneyin.":
    "Leeren Sie das Suchfeld oder versuchen Sie es mit einer anderen Suchanfrage.",
  "Sıra dağılımındaki çubuğu ya da hızlı filtreyi kaldırın.":
    "Heben Sie die Auswahl in der Positionsverteilung oder den Schnellfilter auf.",
  "Daha geniş bir dönem seçmeyi deneyin.":
    "Versuchen Sie, einen längeren Zeitraum auszuwählen.",
  "Sorgularınızın Google'daki ortalama sırası. Arşiv bu bilgisayarda tutulduğu için Google'ın 16 aylık sınırından daha eskiye de bakabilirsiniz.":
    "Die durchschnittliche Position Ihrer Suchanfragen bei Google. Das Archiv wird auf diesem Computer gespeichert, sodass Sie über das 16-Monats-Limit von Google hinaus zurückblicken können.",
  "Zaman aralığı": "Zeitraum",
  "Değişim gösterilemiyor. Arşivde önceki dönem ({start} – {end}) için bu sorgulara ait kayıt yok. Karşılaştırma, iki dönemde de verisi olan sorgular için yapılır. Daha kısa bir aralık seçin ya da arşivin dolmasını bekleyin.":
    "Die Änderung kann nicht angezeigt werden. Das Archiv enthält keine Datensätze für diese Suchanfragen im vorherigen Zeitraum ({start} – {end}). Der Vergleich umfasst nur Suchanfragen mit Daten in beiden Zeiträumen. Wählen Sie einen kürzeren Zeitraum oder warten Sie, bis sich das Archiv füllt.",
  "Sorgu içinde ara": "Suchanfragen",
  "Değişim filtreleri": "Filter ändern",
  Yükselenler: "Aufsteiger",
  "Önceki döneme göre en az yarım sıra yükselen sorgular.":
    "Suchanfragen, die gegenüber dem vorherigen Zeitraum um mindestens eine halbe Position gestiegen sind.",
  Düşenler: "Absteiger",
  "Önceki döneme göre en az yarım sıra düşen sorgular.":
    "Suchanfragen, die gegenüber dem vorherigen Zeitraum um mindestens eine halbe Position gefallen sind.",
  "Şu an ilk 10'da": "Jetzt in den Top 10",
  "Şimdi ortalama sırası 10 ya da daha iyi olan sorgular, ilk 10'a yeni girenler dahil. Önceki dönemde de verisi olanlar sayılır. Üstteki çubuk ise şu anki tüm sorguları sayar.":
    "Suchanfragen, deren durchschnittliche Position jetzt 10 oder besser ist, einschließlich Neueinsteigern in den Top 10. Nur Suchanfragen mit Daten aus dem vorherigen Zeitraum zählen; der Balken oben zählt jede aktuelle Suchanfrage.",
  "İlk 10'dan çıkanlar": "Aus den Top 10 ausgeschieden",
  "Önceki dönemde ilk 10'da olup şimdi ilk 10'un dışına çıkan sorgular.":
    "Suchanfragen, die im vorherigen Zeitraum in den Top 10 waren und jetzt außerhalb liegen.",
  "Gösterimi yüksek": "Viele Impressionen",
  "{impressions} veya daha fazla gösterim alan sorgular.":
    "Suchanfragen mit {impressions} oder mehr Impressionen.",
  "Gösterilmiş ama hiç tıklanmamış sorgular.":
    "Suchanfragen, die angezeigt, aber nie angeklickt wurden.",
  "Arşivde daha fazla sorgu var. Bu liste en çok gösterim alan {count} tanesiyle sınırlı. Aralığı daraltarak farklı sorguları görebilirsiniz.":
    "Das Archiv enthält weitere Suchanfragen. Diese Liste ist auf die {count} mit den meisten Impressionen beschränkt. Grenzen Sie den Zeitraum ein, um andere Suchanfragen zu sehen.",
  "Az tıklanan": "Wenige Klicks",
  "Sıralaması iyi ama tıklama oranı, sitenizdeki benzer sıralı sayfaların altında. Başlığı ve açıklamayı yeniden yazmaya değer.":
    "Gutes Ranking, aber die CTR liegt unter der von Seiten Ihrer Website mit ähnlichem Ranking. Es lohnt sich, Titel und Beschreibung neu zu schreiben.",
  "Başlığı, kullanıcının aradığı şeyi ilk kelimelerde karşılayacak biçimde yeniden yazın.":
    "Schreiben Sie den Titel so um, dass seine ersten Wörter das beantworten, wonach der Suchende sucht.",
  "Meta açıklamayı, tıklamaya değeceğini gösteren tek bir somut vaatle güncelleyin.":
    "Aktualisieren Sie die Meta-Beschreibung mit einem konkreten Versprechen, das zeigt, dass sich der Klick lohnt.",
  "Yayına aldıktan iki hafta sonra bu ekrana dönüp tıklama oranına bakın.":
    "Kehren Sie zwei Wochen nach der Veröffentlichung zu diesem Bildschirm zurück und überprüfen Sie die CTR.",
  "İlk sıralarda": "Ganz oben",
  "Zaten ilk üçte; yükselecek yer az. Tıklama oranı düşükse başlığa ve açıklamaya bakın, değilse içeriği güncel tutmak yeterli.":
    "Bereits unter den ersten drei, mit wenig Luft nach oben. Wenn die CTR niedrig ist, sehen Sie sich Titel und Beschreibung an; andernfalls genügt es, den Inhalt aktuell zu halten.",
  "İçeriği güncel tutun; tarih, fiyat ve örnekleri yılda en az bir kez gözden geçirin.":
    "Halten Sie den Inhalt aktuell; prüfen Sie Daten, Preise und Beispiele mindestens einmal im Jahr.",
  "Bu sayfadan öne çıkarmak istediğiniz diğer sayfalara iç bağlantı verin.":
    "Verlinken Sie von dieser Seite auf die anderen Seiten, die Sie stärken möchten.",
  "Tıklama oranı beklediğinizden düşükse başlığı ve meta açıklamayı yeniden yazın.":
    "Wenn die CTR niedriger ist als erwartet, schreiben Sie den Titel und die Meta-Beschreibung neu.",
  "Yükselmeye yakın": "Kurz vor dem Aufstieg",
  "İlk sayfaya çok yakın ya da hemen üstünde. Küçük bir iyileştirme sıra kazandırabilir.":
    "Sehr nah an Seite eins oder direkt darauf. Eine kleine Verbesserung kann Positionen gewinnen.",
  "İçeriği, bu sayfanın öne çıktığı aramalara daha eksiksiz yanıt verecek şekilde güçlendirin.":
    "Stärken Sie den Inhalt, damit er die Suchanfragen, für die diese Seite angezeigt wird, umfassender beantwortet.",
  "Sitenizdeki ilgili sayfalardan, doğal bir bağlam içinde bu sayfaya iç bağlantı verin.":
    "Verlinken Sie diese Seite in natürlichem Kontext von verwandten Seiten Ihrer Website.",
  "Başlıkta ve ilk paragrafta hedef aramayı açıkça geçirin.":
    "Erwähnen Sie die Zielsuche deutlich im Titel und im ersten Absatz.",
  "Derinde kalan": "Tief vergraben",
  "20. sıranın gerisinde ama bu arama için bir talep var. Sayfayı genişletip genişletmeyeceğinize ya da başka bir sayfayla birleştirip birleştirmeyeceğinize karar verin.":
    "Jenseits von Position 20, aber es gibt Nachfrage nach dieser Suche. Entscheiden Sie, ob Sie die Seite erweitern oder mit einer anderen zusammenführen.",
  "Sayfa gerçekten bu konunun cevabı mı? Değilse hangi bölümler eksik, yazın.":
    "Ist die Seite wirklich die Antwort auf dieses Thema? Wenn nicht, schreiben Sie die fehlenden Abschnitte.",
  "Aynı konuya değinen başka sayfanız varsa birleştirmeyi ve yönlendirme kurmayı düşünün.":
    "Wenn eine andere Ihrer Seiten dasselbe Thema behandelt, ziehen Sie in Betracht, sie zusammenzuführen und eine Weiterleitung einzurichten.",
  "Genişletmeye değmiyorsa sayfayı bırakın; emeği daha yakın fırsatlara harcayın.":
    "Wenn sich das Erweitern nicht lohnt, lassen Sie die Seite, wie sie ist, und investieren Sie die Mühe in nähere Chancen.",
  "Analytics'te karşılığı olanlar": "In Analytics gefunden",
  "Analytics'te karşılığı yok": "In Analytics nicht gefunden",
  "En çok gösterim alan 10": "Top 10 nach Impressionen",
  "Analytics'te aynı dönemde {sessions} oturum getirmiş.":
    "In Analytics brachte sie im selben Zeitraum {sessions} Sitzungen.",
  "Ortalama {position}. sırada {impressions} kez gösterildi ama yalnızca {clicks} tıklama aldı (tıklama oranı {ctr}).":
    "{impressions}-mal auf durchschnittlicher Position {position} angezeigt, aber nur {clicks} Klicks erhalten (CTR {ctr}).",
  "Ortalama {position}. sırada {impressions} kez gösterildi ama yalnızca {clicks} tıklama aldı (tıklama oranı {ctr}, sitenizde bu sıradaki sayfaların ortancasından {gap} yüzde puan daha düşük).":
    "{impressions}-mal auf durchschnittlicher Position {position} angezeigt, aber nur {clicks} Klicks erhalten (CTR {ctr}, {gap} Prozentpunkte unter dem Median für Seiten auf dieser Position Ihrer Website).",
  "Tıklama oranını ({ctr}) kıyaslayacak kadar veri yok; düşük görünüyorsa başlığı ve açıklamayı gözden geçirin.":
    "Es gibt nicht genug Daten, um die CTR ({ctr}) zu vergleichen; wenn sie niedrig wirkt, prüfen Sie Titel und Beschreibung.",
  "Tıklama oranı sitenizdeki benzer sıradaki sayfalarla uyumlu; içeriği ve başlığı güçlü tutmak yeterli.":
    "Die CTR entspricht der von Seiten Ihrer Website mit ähnlichem Ranking; es genügt, Inhalt und Titel stark zu halten.",
  "Ortalama {position}. sırada, yani zaten ilk sıralarda. {impressions} gösterimden {clicks} tıklama aldı.":
    "Durchschnittliche Position {position}, also bereits ganz oben. Sie erhielt {clicks} Klicks aus {impressions} Impressionen.",
  "Ortalama {position}. sırada; ilk sayfaya çok yakın. {impressions} gösterimden {clicks} tıklama aldı, birkaç basamak yükselmek bunu belirgin şekilde artırabilir.":
    "Durchschnittliche Position {position}, sehr nah an Seite eins. Sie erhielt {clicks} Klicks aus {impressions} Impressionen; ein paar Plätze höher könnte das spürbar steigern.",
  "Ortalama {position}. sırada, yani çoğu kullanıcının görmediği yerde; yine de {impressions} gösterim aldı. Bu sayfaya bir talep var.":
    "Durchschnittliche Position {position}, wo die meisten Suchenden nie hinschauen, und trotzdem {impressions} Impressionen. Es gibt Nachfrage nach dieser Seite.",
  Talep: "Nachfrage",
  "İş değeri": "Geschäftswert",
  "Yükselme kolaylığı": "Leichtigkeit des Aufstiegs",
  "Bu sayfa için arama talebi yüksek.":
    "Die Suchnachfrage nach dieser Seite ist hoch.",
  "Arama talebi orta.": "Die Suchnachfrage ist mäßig.",
  "Arama talebi düşük.": "Die Suchnachfrage ist gering.",
  "Sitenize gelen ziyaretçiler bu sayfada değerli işlemler yapıyor.":
    "Besucher Ihrer Website führen auf dieser Seite wertvolle Aktionen aus.",
  "İş değeri orta.": "Der Geschäftswert ist mäßig.",
  "Ziyaretçilerin bu sayfada yaptığı işlem az.":
    "Besucher führen auf dieser Seite nur wenige Aktionen aus.",
  "İlk sıralara çok yakın; emek çabuk karşılık verir.":
    "Sehr nah an der Spitze; der Aufwand zahlt sich schnell aus.",
  "İlk sıralara makul uzaklıkta.": "Ein mittlerer Abstand zur Spitze.",
  "İlk sıralardan uzak; sonuç almak zaman alır.":
    "Weit von der Spitze entfernt; Ergebnisse brauchen Zeit.",
  "Fırsat türleri": "Chancentypen",
  "{kind} · {count} sayfa": {
    one: "{kind} · {count} Seite",
    other: "{kind} · {count} Seiten",
  },
  "Şu an bu türde sayfa yok. {hint}":
    "Im Moment gibt es keine Seiten dieses Typs. {hint}",
  "Analytics'te trafiği olan sayfa yok; Analytics bağlı değilse önce bağlayın.":
    "Keine Seite hat Traffic in Analytics; wenn Analytics nicht verbunden ist, verbinden Sie es zuerst.",
  "Her sayfanın Analytics'te karşılığı var; eşleşmeyen sayfa kalmadı.":
    "Jede Seite hat eine Entsprechung in Analytics; es sind keine Seiten ohne Entsprechung übrig.",
  "Listelenecek sayfa yok.": "Keine Seiten zum Auflisten.",
  "Fırsatların dağılımı": "Aufschlüsselung der Chancen",
  "Fırsat nerede toplanıyor?": "Wo konzentrieren sich die Chancen?",
  "Kutular neye göre hesaplansın?": "Was sollen die Kacheln messen?",
  "toplam {unit}": "insgesamt {unit}",
  "Toplam {total} {unit} içinde en büyük pay {kind} kümesinde ({share}).":
    "Von {total} {unit} insgesamt liegt der größte Anteil in der Gruppe {kind} ({share}).",
  "Analytics oturumu": "Analytics-Sitzungen",
  "Puanın dökümü": "Score-Aufschlüsselung",
  "Puan nereden geliyor?": "Woher kommt der Score?",
  "Puan {score} nereden geliyor?": "Woher kommt der Score von {score}?",
  "Ne yapmalı?": "Was zu tun ist",
  "Sayfayı aç": "Seite öffnen",
  "Burası ne işe yarar?": "Wozu dient diese Seite?",
  "Google'ın sayfanızı gösterdiği ama az tıklandığı ya da birkaç basamak yükselince çok daha fazla ziyaretçi getirecek sayfaları burada topluyoruz. Bir satıra tıklayınca nedenini ve ne yapmanız gerektiğini görürsünüz.":
    "Diese Seite sammelt die Seiten, die Google anzeigt, die aber nur wenige anklicken, und diejenigen, die deutlich mehr Besucher brächten, wenn sie ein paar Plätze aufstiegen. Klicken Sie auf eine Zeile, um zu sehen, warum sie hier steht und was zu tun ist.",
  "Fırsatlar için Search Console ve Analytics gerekir":
    "Chancen brauchen Search Console und Analytics",
  "Sıralamalar Search Console'dan, sayfaların kazandırdığı Analytics'ten gelir. İkisini de bağlayınca fırsatlar puanlanır.":
    "Rankings stammen aus der Search Console, was Seiten einbringen, aus Analytics. Sobald beide verbunden sind, werden Chancen bewertet.",
  "Bağlantıları ayarla": "Verbindungen einrichten",
  "Search Console bu dönem için veri vermedi":
    "Die Search Console hat für diesen Zeitraum keine Daten zurückgegeben",
  "{start} – {end} aralığında hiçbir sayfanız arama sonuçlarında görünmedi. Mülkü yeni bağladıysanız Google'ın veriyi doldurması birkaç gün sürer.":
    "Keine Ihrer Seiten ist zwischen {start} und {end} in den Suchergebnissen erschienen. Wenn Sie die Property gerade erst verbunden haben, dauert es ein paar Tage, bis Google die Daten liefert.",
  "Bu dönemde fırsat çıkmadı": "Keine Chancen in diesem Zeitraum",
  "{start} – {end} aralığında puanlanacak bir sayfa çıkmadı. Dönemi genişletmeyi deneyin.":
    "Keine Seiten zum Bewerten zwischen {start} und {end}. Versuchen Sie es mit einem längeren Zeitraum.",
  "Ayrıntı ve öneriler için bir satıra tıklayın.":
    "Klicken Sie auf eine Zeile, um Details und Vorschläge anzuzeigen.",
  "E-Tablolar'a aktar ({rows} satır)":
    "Nach Google Tabellen exportieren ({rows} Zeilen)",
  "CSV ({rows} satır)": "CSV ({rows} Zeilen)",
  "Bu filtreye uyan sayfa yok":
    "Keine Seiten stimmen mit diesem Filter überein",
  "Seçtiğiniz tür ya da hızlı filtre bu dönemde hiçbir sayfayla eşleşmedi. Filtreleri kaldırın ya da dönemi genişletin.":
    "Der gewählte Typ oder Schnellfilter passt in diesem Zeitraum zu keiner Seite. Entfernen Sie die Filter oder wählen Sie einen längeren Zeitraum.",
  "Filtreleri kaldır": "Filter löschen",
  "Google'da kaçıncı sırada çıktığınız; küçük olan iyidir. 1, sonuçların en üstü demek.":
    "Wo Sie bei Google angezeigt werden; niedriger ist besser. 1 bedeutet ganz oben in den Ergebnissen.",
  "Sayfanızın arama sonuçlarında kaç kez göründüğü.":
    "Wie oft Ihre Seite in den Suchergebnissen erschien.",
  "Aramalardan sayfanıza kaç kez tıklandığı.":
    "Wie oft Nutzer über die Suche auf Ihre Seite geklickt haben.",
  "Gösterilenlerin yüzde kaçı tıklandı. Altındaki ok, sayfanın sitenizde aynı sıradaki sayfalara göre farkını gösterir.":
    "Der Anteil der Impressionen, die einen Klick erhalten haben. Der Pfeil unten zeigt, wie die Seite im Vergleich zu Seiten an derselben Position auf Ihrer Website abschneidet.",
  "Analytics'ten, Search Console ile aynı tarih aralığı için alınır; Analytics ekranındaki aralıktan farklı olabilir.":
    "Aus Analytics, für denselben Zeitraum wie die Search Console; er kann vom Zeitraum auf dem Analytics-Bildschirm abweichen.",
  "Son 90 gün": "Letzte 90 Tage",
  "Google'da görünen sayfalarınız, üzerinde çalışmaya en değer olandan başlayarak.":
    "Ihre Seiten, die bei Google angezeigt werden, beginnend mit denen, an denen sich die Arbeit am meisten lohnt.",
  "Fırsatlar yüklenemedi": "Chancen konnten nicht geladen werden",
  Dönem: "Zeitraum",
  "Search Console tek seferde sınırlı sayıda satır verir ve bu sınıra ulaşıldı; gerçekte daha fazla aday sayfa olabilir.":
    "Die Search Console gibt jeweils nur eine begrenzte Anzahl von Zeilen zurück, und dieses Limit wurde erreicht; möglicherweise gibt es weitere Kandidatenseiten.",
  "Search Console ve Analytics farklı saat dilimlerinde raporluyor; günlük eşleşmeler bir gün kayabilir.":
    "Search Console und Analytics berichten in unterschiedlichen Zeitzonen, daher können tägliche Zuordnungen um einen Tag abweichen.",
  Listelenen: "Gelistet",
  "Filtreye uyan · {rows} satır içinde":
    "Entspricht dem Filter · von {rows} Zeilen",
  "{candidates} aday sayfanın en iyileri":
    "Die besten von {candidates} Kandidatenseiten",
  "Tüm aday sayfalar ({candidates})": "Alle Kandidatenseiten ({candidates})",
  "{analytics}'te karşılığı var": "In {analytics} gefunden",
  "{candidates} aday içinde": "Von {candidates} Kandidaten",
  "{analytics}'te karşılığı yok": "In {analytics} nicht gefunden",
  "Listedeki her sayfanın Analytics karşılığı var":
    "Jede aufgeführte Seite hat eine Entsprechung in Analytics",
  "Listelenen {rows} sayfanın {count} tanesi · listele":
    "{count} von {rows} aufgeführten Seiten · anzeigen",
  "En yüksek puan": "Top-Score",
  "{page} · ayrıntı": "{page} · Details",
  "Puan nasıl hesaplanır?": "Wie wird der Score berechnet?",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri dönüşüm tanımlı olmadığı için etkileşim oranına göre hesaplanır.":
    "Nachfrage (50 %) + Geschäftswert (30 %) + Leichtigkeit des Aufstiegs (20 %). Der Geschäftswert basiert auf der Interaktionsrate, da keine Schlüsselereignisse eingerichtet sind.",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri etkileşim oranına göre hesaplanır.":
    "Nachfrage (50 %) + Geschäftswert (30 %) + Leichtigkeit des Aufstiegs (20 %). Der Geschäftswert basiert auf der Interaktionsrate.",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri dönüşümlere göre hesaplanır.":
    "Nachfrage (50 %) + Geschäftswert (30 %) + Leichtigkeit des Aufstiegs (20 %). Der Geschäftswert basiert auf Schlüsselereignissen.",
  "Analytics'te karşılığı yok ne demek?":
    "Was bedeutet „nicht in Analytics gefunden“?",
  "Analytics o sayfaya hiç ziyaret görmemiş ya da adresi farklı yazılmış olabilir. Bu sayfalar da puanlanır. İş değerinde haksız yere sıfır almasınlar diye ortada bir değer verilir.":
    "Analytics hat möglicherweise keine Besuche auf dieser Seite festgestellt oder ihre Adresse anders erfasst. Auch diese Seiten werden bewertet; sie erhalten einen mittleren Geschäftswert, damit sie nicht unfair mit null bewertet werden.",
  "Bu seçenek yalnızca Windows paketinde kullanılabilir.":
    "Diese Option ist nur in der Windows-App verfügbar.",
  "Windows ayarı kaydedilemedi. Tepsi uygulamasının açık olduğunu ve ayarın yönetici tarafından kilitlenmediğini kontrol edip tekrar deneyin.":
    "Die Windows-Einstellung konnte nicht gespeichert werden. Prüfen Sie, ob die App im Infobereich läuft und die Einstellung nicht von einem Administrator gesperrt ist, und versuchen Sie es dann erneut.",
  "Giriş yok: uygulama yalnızca bu bilgisayarda kullanılır. İnternete açacaksanız önüne kendi girişinizi koyun.":
    "Keine Anmeldung: Die App ist nur für die Nutzung auf diesem Computer gedacht. Wenn Sie sie im Internet erreichbar machen, schalten Sie Ihre eigene Anmeldung davor.",
  "Cloudflare Access belirteci reddedildi: hedef kitle uyuşmuyor. POLICY_AUD, Access uygulamanızın AUD etiketiyle aynı değil — Zero Trust -> Access controls -> Applications -> Configure -> Additional settings yolundan kopyalayın.":
    "Cloudflare-Access-Token abgelehnt: Die Zielgruppe stimmt nicht überein. POLICY_AUD stimmt nicht mit dem AUD-Tag Ihrer Access-Anwendung überein – kopieren Sie es aus Zero Trust -> Access controls -> Applications -> Configure -> Additional settings.",
  "Cloudflare Access belirteci reddedildi: veren taraf uyuşmuyor. TEAM_DOMAIN, belirteci veren Cloudflare ekibiyle aynı değil — Zero Trust ayarlarındaki ekip alan adınızla karşılaştırın.":
    "Cloudflare-Access-Token abgelehnt: Der Aussteller stimmt nicht überein. TEAM_DOMAIN passt nicht zu dem Cloudflare-Team, das das Token ausgestellt hat – vergleichen Sie es mit der Team-Domain in Ihren Zero-Trust-Einstellungen.",
  "Cloudflare Access belirteci TEAM_DOMAIN'in imza anahtarlarıyla doğrulanamadı. TEAM_DOMAIN'in ekibinizin https://<team>.cloudflareaccess.com adresi olduğundan emin olun.":
    "Das Cloudflare-Access-Token konnte nicht mit den Signaturschlüsseln von TEAM_DOMAIN verifiziert werden. Stellen Sie sicher, dass TEAM_DOMAIN die Adresse https://<team>.cloudflareaccess.com Ihres Teams ist.",
  "Bu projede böyle bir denetim bulunamadı.":
    "Dieses Projekt hat kein solches Audit.",
  "Denetim ayarları geçersiz.": "Die Audit-Einstellungen sind ungültig.",
  "Çalışan denetimin durumu doğrulanamadı; silme iptal edildi. Lütfen tekrar deneyin.":
    "Der Status des laufenden Audits konnte nicht bestätigt werden, daher wurde es nicht gelöscht. Bitte versuchen Sie es erneut.",
  "Çalışan denetim durdurulamadı.":
    "Das laufende Audit konnte nicht gestoppt werden.",
  "Bu denetim şu an silinemiyor. Bitmesini bekleyip yeniden deneyin.":
    "Dieses Audit kann derzeit nicht gelöscht werden. Warten Sie, bis es abgeschlossen ist, und versuchen Sie es erneut.",
  "Denetimin Lighthouse çıktıları silinemedi; denetim silinmedi. Lütfen tekrar deneyin.":
    "Die Lighthouse-Ergebnisse des Audits konnten nicht gelöscht werden, daher wurde das Audit nicht gelöscht. Bitte versuchen Sie es erneut.",
  "Google Analytics bu hizmet hesabına izin vermedi. İki şey gerekiyor: Google Cloud projenizde Google Analytics Admin API etkin olmalı, ve GA4 mülkünüzde Yönetici → Erişim yönetimi altında {email} adresi Görüntüleyen olarak ekli olmalı.":
    "Google Analytics hat diesem Dienstkonto den Zugriff verweigert. Zwei Dinge sind nötig: Die Google Analytics Admin API muss in Ihrem Google-Cloud-Projekt aktiviert sein, und {email} muss in Ihrer GA4-Property unter Verwaltung → Zugriffsverwaltung als Betrachter hinzugefügt werden.",
  "Google Analytics bu hizmet hesabına izin vermedi. Google Analytics Admin API'yi etkinleştirin ve hesabın adresini GA4 mülkünüze Görüntüleyen olarak ekleyin.":
    "Google Analytics hat diesem Dienstkonto den Zugriff verweigert. Aktivieren Sie die Google Analytics Admin API und fügen Sie die Adresse des Kontos Ihrer GA4-Property als Betrachter hinzu.",
  "Bu Google hesabı seowatcher hesabınıza bağlı değil.":
    "Dieses Google-Konto ist nicht mit Ihrem seowatcher-Konto verbunden.",
  "Bu Google Analytics mülkü bağlı Google hesabınızda bulunmuyor.":
    "Diese Google-Analytics-Property gehört nicht zu Ihrem verbundenen Google-Konto.",
  "Google kimlik bilgisini döndürmedi. Bağlantıyı yeniden deneyin.":
    "Google hat kein Identitätstoken zurückgegeben. Versuchen Sie erneut, eine Verbindung herzustellen.",
  "Google, {name} yetkilendirme kodunu reddetti. Bağlantıyı yeniden deneyin.":
    "Google hat den Autorisierungscode {name} abgelehnt. Versuchen Sie erneut, eine Verbindung herzustellen.",
  "{name} yapılandırılmamış. GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET ve BETTER_AUTH_SECRET değerlerini ayarlayın.":
    "{name} ist nicht konfiguriert. Legen Sie GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET und BETTER_AUTH_SECRET fest.",
  "{name} bağlantı isteği geçersiz. Bağlantıyı yeniden başlatın.":
    "Die {name}-Verbindungsanfrage ist ungültig. Starten Sie die Verbindung erneut.",
  "{name} bağlantı isteğinin süresi doldu. Bağlantıyı yeniden başlatın.":
    "Die {name}-Verbindungsanfrage ist abgelaufen. Starten Sie die Verbindung erneut.",
  "Search Console bağlantısının yenilenmesi gerekiyor.":
    "Die Search-Console-Verbindung muss erneuert werden.",
  "Search Console isteği başarısız oldu.":
    "Die Search-Console-Anfrage ist fehlgeschlagen.",
  "Bu Search Console mülkü bağlı Google hesabınızda bulunmuyor.":
    "Diese Search-Console-Property gehört nicht zu Ihrem verbundenen Google-Konto.",
  "Bu Search Console mülkü için doğrulanmış erişiminiz yok.":
    "Sie haben keinen bestätigten Zugriff auf diese Search-Console-Property.",
  "En fazla {count} etikete göre filtreleyebilirsiniz.": {
    one: "Sie können nach höchstens {count} Tag filtern.",
    other: "Sie können nach höchstens {count} Tags filtern.",
  },
  "Bu adda bir etiket zaten var. Farklı bir ad seçin.":
    "Ein Tag mit diesem Namen ist bereits vorhanden. Wählen Sie einen anderen Namen.",
  "Etiket {count} kelimeye bağlı. Önce bu kelimelerden kaldırıp tekrar deneyin.":
    {
      one: "Dieses Tag ist {count} Keyword zugewiesen. Entfernen Sie es zuerst von diesem Keyword und versuchen Sie es dann erneut.",
      other:
        "Dieses Tag ist {count} Keywords zugewiesen. Entfernen Sie es zuerst von diesen Keywords und versuchen Sie es dann erneut.",
    },
  "Anahtar çalışıyor: Google PageSpeed Insights ölçümü kabul etti.":
    "Der Schlüssel funktioniert: Google PageSpeed Insights hat die Messung akzeptiert.",
  "Kayıtlı bir anahtar yok; test edilecek bir şey yok. Önce anahtarı kaydedin.":
    "Es ist kein Schlüssel gespeichert, daher gibt es nichts zu testen. Speichern Sie zuerst den Schlüssel.",
  "Google anahtarı geçersiz buldu. Anahtarı Google Cloud Console'dan yeniden kopyalayıp kaydedin.":
    "Google hat festgestellt, dass der Schlüssel ungültig ist. Kopieren Sie ihn erneut aus der Google Cloud Console und speichern Sie ihn.",
  "Anahtar tanınıyor ama PageSpeed Insights için kullanılamıyor: API etkin değil ya da anahtarın kısıtlamaları buna izin vermiyor. Google Cloud Console'da API'yi etkinleştirin ve anahtar kısıtlamasını kontrol edin.":
    "Der Schlüssel wird erkannt, kann aber nicht für PageSpeed Insights verwendet werden: Die API ist nicht aktiviert, oder die Einschränkungen des Schlüssels lassen es nicht zu. Aktivieren Sie die API in der Google Cloud Console und prüfen Sie die Einschränkungen des Schlüssels.",
  "Anahtar geçerli ama Google'ın günlük kotası dolmuş. Yarın yeniden deneyin ya da Google Cloud Console'dan kotayı kontrol edin.":
    "Der Schlüssel ist gültig, aber das tägliche Kontingent von Google ist aufgebraucht. Versuchen Sie es morgen erneut oder überprüfen Sie das Kontingent in der Google Cloud Console.",
  "Anahtar geçerli ama Google dakikalık sınıra takıldı. Bir dakika bekleyip yeniden deneyin.":
    "Der Schlüssel ist gültig, aber Google hat sein Minutenlimit erreicht. Warten Sie eine Minute und versuchen Sie es erneut.",
  "Google'a ulaşılamadı. İnternet bağlantısını kontrol edip yeniden deneyin; anahtar hakkında bir sonuç alınamadı.":
    "Google konnte nicht erreicht werden, daher gibt es kein Ergebnis für den Schlüssel. Überprüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
  "Google beklenmeyen bir yanıt verdi; anahtar hakkında bir sonuç alınamadı. Birazdan yeniden deneyin.":
    "Google hat eine unerwartete Antwort gesendet, daher gibt es kein Ergebnis für den Schlüssel. Versuchen Sie es gleich noch einmal.",
  'Alan adı olmayan "Default" adında bir proje zaten var. Farklı bir ad seçin ya da bir alan adı ekleyin.':
    "Es existiert bereits ein Projekt namens „Default“ ohne Domain. Wählen Sie einen anderen Namen oder fügen Sie eine Domain hinzu.",
  "Geçerli bir alan adı girin, örneğin acme.com.":
    "Geben Sie eine gültige Domain ein, zum Beispiel acme.com.",
  'Alan adı olmayan, "Default" adında etkin bir proje zaten var. Önce onu yeniden adlandırın, sonra bunu geri yükleyin.':
    "Es existiert bereits ein aktives Projekt namens „Default“ ohne Domain. Benennen Sie es zuerst um und stellen Sie dann dieses wieder her.",
  "Geçerli bir alan adı girin.": "Geben Sie eine gültige Domain ein.",
  "Adresin nereye çözümlendiği doğrulanamadı, bu yüzden tarama başlatılmadı. Uygulamanın cloudflare-dns.com adresine erişebildiğinden emin olun.":
    "Die Auflösung dieser Adresse konnte nicht bestätigt werden, daher wurde der Crawl nicht gestartet. Stellen Sie sicher, dass die App cloudflare-dns.com erreichen kann.",
  "Adres herkese açık DNS'te çözümlenmiyor, bu yüzden tarama başlatılmadı.":
    "Diese Adresse wird im öffentlichen DNS nicht aufgelöst, daher wurde der Crawl nicht gestartet.",
  "Kullanıcı adı veya parola içeren adresler taranamaz.":
    "Adressen, die einen Benutzernamen oder ein Passwort enthalten, können nicht gecrawlt werden.",
  "Google beklenmedik bir yanıt verdi.":
    "Google hat eine unerwartete Antwort gesendet.",
  "Google'ın istek sınırı doldu.":
    "Das Anfragelimit von Google wurde erreicht.",
  'Anahtarın API kısıtlaması "Chrome UX Report API"yi dışarıda bırakıyor. Google Cloud Console\'da anahtarın kısıtlamasına ekleyip tekrar deneyin.':
    "Die API-Einschränkungen des Schlüssels schließen die „Chrome UX Report API“ aus. Fügen Sie sie in der Google Cloud Console den Einschränkungen des Schlüssels hinzu und versuchen Sie es erneut.",
  'Anahtarın Google Cloud projesinde "Chrome UX Report API" etkin değil. Google Cloud Console\'da API bölümünden etkinleştirip tekrar deneyin.':
    "Die „Chrome UX Report API“ ist im Google-Cloud-Projekt des Schlüssels nicht aktiviert. Aktivieren Sie sie unter „APIs“ in der Google Cloud Console und versuchen Sie es erneut.",
  'Google bu anahtara izin vermedi{reason}. Anahtarın Google Cloud projesinde "Chrome UX Report API" etkin olmalı ve anahtarın kısıtlamasında yer almalı.':
    "Google hat diesen Schlüssel abgelehnt{reason}. Die „Chrome UX Report API“ muss im Google-Cloud-Projekt des Schlüssels aktiviert und in den Einschränkungen des Schlüssels enthalten sein.",
  "Google yanıt vermedi (HTTP {status}). Birazdan tekrar deneyin.":
    "Google hat nicht geantwortet (HTTP {status}). Versuchen Sie es gleich noch einmal.",
  "Hizmet hesabı Google Analytics için erişim anahtarı alamadı.":
    "Das Dienstkonto konnte kein Zugriffstoken für Google Analytics erhalten.",
  "Google Analytics erişim anahtarı alınamadı (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Es konnte kein Zugriffstoken für Google Analytics abgerufen werden (der Zugriff wurde möglicherweise widerrufen oder ist abgelaufen).",
  "Google Analytics erişim anahtarı döndürmedi (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Google Analytics hat kein Zugriffstoken zurückgegeben (der Zugriff wurde möglicherweise widerrufen oder ist abgelaufen).",
  'Bu bir hizmet hesabı anahtarı değil. Dosyada "type": "service_account" yazmalı.':
    'Dies ist kein Dienstkontoschlüssel. Die Datei sollte "type": "service_account" enthalten.',
  "client_email bir e-posta adresi olmalı.":
    "client_email muss eine E-Mail-Adresse sein.",
  "private_key alanı eksik ya da bozuk.":
    "Das Feld „private_key“ fehlt oder ist beschädigt.",
  "Geçerli bir JSON değil. Google'dan indirdiğiniz dosyanın tamamını yapıştırın.":
    "Dies ist kein gültiges JSON. Fügen Sie die gesamte Datei ein, die Sie von Google heruntergeladen haben.",
  "Anahtar dosyası okunamadı.":
    "Die Schlüsseldatei konnte nicht gelesen werden.",
  "Hizmet hesabı tanımlı değil ya da saklanan anahtar okunamıyor.":
    "Es ist kein Dienstkonto eingerichtet oder der gespeicherte Schlüssel kann nicht gelesen werden.",
  "Hizmet hesabı için izin verilmeyen kapsam: {scope}":
    "Bereich für das Dienstkonto nicht zulässig: {scope}",
  "Hizmet hesabı anahtarı imzalanamadı; dosya bozuk olabilir.":
    "Signieren mit dem Dienstkontoschlüssel nicht möglich; die Datei ist möglicherweise beschädigt.",
  "Google hizmet hesabı için erişim anahtarı vermedi ({status}). {detail}":
    "Google hat kein Zugriffstoken für das Dienstkonto ausgestellt ({status}). {detail}",
  "Google beklenmeyen bir erişim anahtarı yanıtı döndürdü.":
    "Google hat eine unerwartete Zugriffstoken-Antwort zurückgegeben.",
  "Hizmet hesabı Search Console'a bağlanamadı. Anahtar dosyasını yeniden yükleyin.":
    "Das Dienstkonto konnte keine Verbindung zur Search Console herstellen. Laden Sie die Schlüsseldatei erneut hoch.",
  "Search Console erişim anahtarı alınamadı (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Es konnte kein Search-Console-Zugriffstoken abgerufen werden (der Zugriff wurde möglicherweise widerrufen oder ist abgelaufen).",
  "Search Console erişim anahtarı döndürmedi (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Die Search Console hat kein Zugriffstoken zurückgegeben (der Zugriff wurde möglicherweise widerrufen oder ist abgelaufen).",
  "PageSpeed anahtarı Ayarlar'da kayıtlı.":
    "Der PageSpeed-Schlüssel ist in den Einstellungen gespeichert.",
  "Denetim hâlâ çalışıyor. Rapor, denetim bitince oluşturulabilir.":
    "Das Audit läuft noch. Der Bericht kann erstellt werden, sobald es abgeschlossen ist.",
  "Bu denetim raporu, sorun listeleri en aza indirilse bile saklama sınırını aşıyor. Raporu oluşturmak için denetimi daha az sayfa veya daha kısa adreslerle yeniden çalıştırın.":
    "Dieser Audit-Bericht überschreitet das Speicherlimit, selbst wenn die Problemlisten auf ein Minimum gekürzt sind. Um ihn zu erstellen, führen Sie das Audit mit weniger Seiten oder kürzeren Adressen erneut aus.",
  "URL Denetimi (Search Console)": "URL-Prüfung (Search Console)",
  "Mülk başına günlük {count} sorgu; son 24 saatte bu uygulamanın kaydettiği sorgular sayılır. Google'ın sıfırlanma saati doğrulanmadı.":
    "{count} Anfragen pro Property und Tag; gezählt werden die Anfragen, die diese App in den letzten 24 Stunden protokolliert hat. Der Zeitpunkt des Zurücksetzens bei Google ist nicht bestätigt.",
  "Uygulamanın kendi kaydı": "Das eigene Protokoll der App",
  "Anahtar tanımlı.": "Ein Schlüssel ist festgelegt.",
  "PageSpeed anahtarı yok: denetimde en fazla {count} sayfanın hızı ölçülür. Anahtarı Ayarlar > Hız ölçümü bölümünden girebilirsiniz.":
    {
      one: "Kein PageSpeed-Schlüssel: Ein Audit misst die Geschwindigkeit von höchstens {count} Seite. Unter Einstellungen > Geschwindigkeitstests können Sie einen Schlüssel eingeben.",
      other:
        "Kein PageSpeed-Schlüssel: Ein Audit misst die Geschwindigkeit von höchstens {count} Seiten. Unter Einstellungen > Geschwindigkeitstests können Sie einen Schlüssel eingeben.",
    },
  "{count} ölçüm günlük sınır nedeniyle yapılamadı": {
    one: "{count} Messung wurde wegen des Tageslimits übersprungen",
    other: "{count} Messungen wurden wegen des Tageslimits übersprungen",
  },
  "{count} ölçüm dakikalık sınıra takıldı": {
    one: "{count} Messung hat das Minutenlimit erreicht",
    other: "{count} Messungen haben das Minutenlimit erreicht",
  },
  "Son 24 saatte başlayan denetimlerde {events}.":
    "Bei Audits, die in den letzten 24 Stunden gestartet wurden: {events}.",
  "Son 24 saatte başlayan denetimlerde sınır olayı yok.":
    "Bei Audits, die in den letzten 24 Stunden gestartet wurden, wurde kein Grenzwert erreicht.",
  "{key} Sayılar, son 24 saatte başlayan denetimlere aittir (tek tek ölçüm saati kaydedilmez). {lastEvent} Google'ın günlük toplamı doğrulanmadı; gerçek kota Google Cloud Console > PageSpeed Insights API > Quotas bölümünde.":
    "{key} Die Zahlen beziehen sich auf Audits, die in den letzten 24 Stunden gestartet wurden (einzelne Messzeitpunkte werden nicht erfasst). {lastEvent} Die tägliche Gesamtsumme bei Google ist nicht bestätigt; das tatsächliche Kontingent finden Sie in Google Cloud Console > PageSpeed Insights API > Quotas.",
  "Google yanıtındaki son kota bilgisi":
    "Neueste Kontingentinformationen in der Antwort von Google",
  "Uygulama yeniden başladığından ya da GA4 bağlantısı değiştiğinden beri bu bağlantıyla GA4 raporu çalışmadı; sayaç bir rapor çalışınca dolar.":
    "Seit dem Neustart der App oder der Änderung der GA4-Verbindung wurde über diese Verbindung kein GA4-Bericht ausgeführt; der Zähler füllt sich, sobald ein Bericht läuft.",
  "Son istek: {count} puan.": {
    one: "Letzte Anfrage: {count} Punkt.",
    other: "Letzte Anfrage: {count} Punkte.",
  },
  "günlük {count}": "{count} pro Tag",
  "saatlik {count}": "{count} pro Stunde",
  "Kalan değer standart mülk sınırını ({limit}) aşıyor; mülk büyük olasılıkla Analytics 360, sınır 10 kat. Gerçek sınır Google'dan gelmez, bu yüzden çubuk gösterilmez. {lastCost}":
    "Der verbleibende Wert übersteigt das Limit einer Standard-Property ({limit}), daher handelt es sich höchstwahrscheinlich um eine Analytics-360-Property mit 10-fachem Limit. Google meldet das tatsächliche Limit nicht, daher wird kein Balken angezeigt. {lastCost}",
  "Google yalnızca kalanı bildirir. Sınır varsayımdır: standart mülk için {limit}; 360 mülklerde 10 kat. Kullanılan = varsayılan sınır − kalan. {lastCost} Sıfırlanma saati doğrulanmadı.":
    "Google meldet nur, was übrig ist. Das Limit ist eine Annahme: {limit} für eine Standard-Property, das 10-Fache für 360-Properties. Verbraucht = angenommenes Limit − verbleibend. {lastCost} Der Zeitpunkt des Zurücksetzens ist nicht bestätigt.",
  "Analytics (GA4) günlük kota puanı":
    "Tägliche Kontingentpunkte für Analytics (GA4)",
  "Analytics (GA4) saatlik kota puanı":
    "Stündliche Kontingentpunkte für Analytics (GA4)",
  "Denetim sayfa sınırı": "Audit-Seitenlimit",

  "Uygulamanın veritabanı": "Die Datenbank der App",
  "Proje başına rapor": "Berichte pro Projekt",
  "Takılan bir döngüye karşı koruma; gerçek bir iş akışı buna yaklaşmaz.":
    "Ein Schutz vor einer Endlosschleife; ein echter Arbeitsablauf kommt nie in die Nähe.",
  "Proje başına rapor şablonu": "Berichtsvorlagen pro Projekt",
  "Doluysa yeni şablon için birini silmek gerekir.":
    "Wenn das Limit erreicht ist, löschen Sie eine, um eine neue Vorlage hinzuzufügen.",
  "En büyük raporun boyutu": "Größe des größten Berichts",
  "Tek bir rapor bu boyutu aşarsa kaydedilmez; genelde gömülü görseller yüzünden olur.":
    "Ein einzelner Bericht über dieser Größe wird nicht gespeichert; meist sind eingebettete Bilder die Ursache.",
  "Denetim tamamlanmadığı için puan hesaplanmadı.":
    "Das Audit wurde nicht abgeschlossen, daher wurde kein Score berechnet.",
  "Taranan sayfa olmadığı için puan hesaplanamadı.":
    "Es wurden keine Seiten gecrawlt, daher konnte kein Score berechnet werden.",
  "Kayıtlı hiçbir sorun yok. Site temiz görünüyor.":
    "Es wurden keine Probleme erfasst. Die Website sieht sauber aus.",
  "Site sağlıklı. Kalan birkaç düzeltme puanı yukarı çeker.":
    "Die Website ist in gutem Zustand. Ein paar verbleibende Korrekturen erhöhen den Score.",
  "Temel sağlam, ama düzeltilmesi gereken belirgin sorunlar var.":
    "Die Grundlage ist solide, aber es gibt klare Probleme, die behoben werden müssen.",
  "Orta düzeyde. Kritik ve uyarı sorunları aramadaki performansı gölgeliyor.":
    "Ausreichend. Kritische Probleme und Warnungen bremsen die Suchleistung.",
  "Zayıf. Önce kritik sorunlar düzeltilmeli; bunlar sayfaların aramada görünmesini engelleyebilir.":
    "Schlecht. Beheben Sie zuerst die kritischen Probleme; sie können verhindern, dass Seiten in der Suche erscheinen.",
  'Denetim tamamlanmadığı ya da hiç sayfa taranamadığı için sorun listesi eksik olabilir; bu yüzden "sorun yok" denmiyor.':
    "Das Audit wurde nicht abgeschlossen oder es konnten keine Seiten gecrawlt werden, daher ist die Problemliste möglicherweise unvollständig; deshalb steht hier nicht „keine Probleme“.",
  "Yanıt yok": "Keine Antwort",
  İçerik: "Inhalt",
  "Dizine alma": "Indexierung",
  "ve {count} adres daha (boyutu makul tutmak için burada kesildi).": {
    one: "und {count} weitere Adresse (hier gekürzt, um die Dateigröße in Grenzen zu halten).",
    other:
      "und {count} weitere Adressen (hier gekürzt, um die Dateigröße in Grenzen zu halten).",
  },
  "ve {count} sayfa daha (boyutu makul tutmak için burada kesildi).": {
    one: "und {count} weitere Seite (hier gekürzt, um die Dateigröße in Grenzen zu halten).",
    other:
      "und {count} weitere Seiten (hier gekürzt, um die Dateigröße in Grenzen zu halten).",
  },
  "ve {count} kayıt daha (boyutu makul tutmak için burada kesildi).": {
    one: "und {count} weiterer Datensatz (hier gekürzt, um die Dateigröße in Grenzen zu halten).",
    other:
      "und {count} weitere Datensätze (hier gekürzt, um die Dateigröße in Grenzen zu halten).",
  },
  "ve {count} sorun türü daha (boyutu makul tutmak için burada kesildi).": {
    one: "und {count} weiterer Problemtyp (hier gekürzt, um die Dateigröße in Grenzen zu halten).",
    other:
      "und {count} weitere Problemtypen (hier gekürzt, um die Dateigröße in Grenzen zu halten).",
  },
  "Puan yok": "Kein Score",
  "Site puanı 100 üzerinden {score}": "Website-Score {score} von 100",
  "{host} site denetimi": "Website-Audit für {host}",
  "{host} için {count} sayfa tarandı.": {
    one: "{count} Seite auf {host} gecrawlt.",
    other: "{count} Seiten auf {host} gecrawlt.",
  },
  "Site puanı {count}/100.": "Website-Score {count}/100.",
  "Kayıtlı sorun yok.": "Es wurden keine Probleme erfasst.",
  "Denetim tamamlanmadığı için sorun listesi eksik olabilir.":
    "Das Audit wurde nicht abgeschlossen, daher ist die Problemliste möglicherweise unvollständig.",
  "{count} sorun türü bulundu: {critical} kritik, {warning} uyarı, {info} bilgi.":
    {
      one: "{count} Problemtyp gefunden: {critical} kritisch, {warning} Warnung, {info} info.",
      other:
        "{count} Problemtypen gefunden: {critical} kritisch, {warning} Warnungen, {info} info.",
    },
  "En çok sayfayı etkileyen: {title} ({count} sayfa).": {
    one: "Betrifft die meisten Seiten: {title} ({count} Seite).",
    other: "Betrifft die meisten Seiten: {title} ({count} Seiten).",
  },
  "Site denetim raporu": "Website-Audit-Bericht",
  "seowatcher ile üretildi. Bu dosya kendi kendine yeter: açmak için internet bağlantısı gerekmez. PDF için tarayıcıdan Yazdır seçeneğini kullanın.":
    "Erstellt mit seowatcher. Diese Datei ist eigenständig: Sie wird ohne Internetverbindung geöffnet. Für ein PDF verwenden Sie „Drucken“ in Ihrem Browser.",
  "3. Genel görünüm": "3. Übersicht",
  "4. Sorunlar": "4. Probleme",
  "5. Hız ölçümü": "5. Geschwindigkeitstests",
  "6. Google dizin durumu": "6. Google-Indexstatus",
  "7. Site haritası": "7. Sitemap",
  "8. Yöntem ve sınırlar": "8. Methode und Grenzen",
  "Ek A. Kalan etkilenen adresler":
    "Anhang A. Verbleibende betroffene Adressen",
  "Ek B. Taranan sayfalar": "Anhang B. Gecrawlte Seiten",
  K: "C",
  U: "W",
  B: "I",
  "K kritik, U uyarı, B bilgi.": "C = kritisch, W = Warnung, I = Info.",
  "Sorun türleri": "Problemtypen",
  İçindekiler: "Inhalt",
  "Sorun sayısı bilinmiyor.": "Die Anzahl der Probleme ist unbekannt.",
  "{severity} sorun türü": "Problemtypen: {severity}",
  "Önem derecesine göre sorun türleri": "Problemtypen nach Schweregrad",
  tür: "Typen",
  "Önem derecesine göre sorun türü dağılımı":
    "Verteilung der Problemtypen nach Schweregrad",
  "Kategoriye göre sorun türleri": "Problemtypen nach Kategorie",
  "Kategori ve önem derecesine göre sorun türü sayısı":
    "Anzahl der Problemtypen nach Kategorie und Schweregrad",
  "En çok sayfayı etkileyen 10 sorun türü":
    "10 Problemtypen, die die meisten Seiten betreffen",
  "Etkilenen sayfa sayısına göre ilk on sorun türü":
    "Die zehn häufigsten Problemtypen nach betroffenen Seiten",
  "HTTP durum kodları": "HTTP-Statuscodes",
  "Durum kodu dağılımı": "Statuscodeverteilung",
  "Tarama derinliği (ana sayfadan kaç tıklama)":
    "Crawl-Tiefe (Klicks von der Startseite)",
  "Tarama derinliği dağılımı": "Verteilung der Crawl-Tiefe",
  "Başlık uzunluğu (karakter)": "Titellänge (Zeichen)",
  "Yaklaşık 30-60 karakter, başlığın arama sonucunda kısaltılmadan görünmesi için bir ölçüttür; Google sabit bir sınır koymaz.":
    "Als Faustregel gelten etwa 30–60 Zeichen, damit ein Titel in den Suchergebnissen angezeigt wird, ohne abgeschnitten zu werden. Google legt kein festes Limit fest.",
  "Sayfa başlığı uzunluğu dağılımı": "Verteilung der Seitentitellänge",
  "Sunucu yanıt süresi": "Serverantwortzeit",
  "Yanıt süresi dağılımı": "Verteilung der Antwortzeiten",
  "Dizine girebilir": "Indexierbar",
  "Site haritasında": "In der Sitemap",
  "Başlığı yok": "Kein Titel",
  "Meta açıklaması yok": "Keine Meta-Beschreibung",
  "%{value}": "{value} %",
  "{count} taranan sayfaya oranla.": {
    one: "Bezogen auf {count} gecrawlte Seite.",
    other: "Bezogen auf {count} gecrawlte Seiten.",
  },
  "Sayfa durumu": "Seitenstatus",
  "Sayfa durumu özeti": "Zusammenfassung des Seitenstatus",
  "Her grafiğin altında aynı veriler yazıyla da verilir.":
    "Die Daten jedes Diagramms werden auch in Worten darunter angezeigt.",
  "tüm site": "gesamte Website",
  "Etkilenen: tüm site": "Betroffen: die gesamte Website",
  "ve {count} sayfa daha (ayrıntı sorun bölümünde)": {
    one: "und {count} weitere Seite (Details im Abschnitt „Probleme“)",
    other: "und {count} weitere Seiten (Details im Abschnitt „Probleme“)",
  },
  "Ne yapılmalı:": "Was ist zu tun:",
  "Neden:": "Warum:",
  "Bu hafta yapılacaklar": "Für diese Woche",
  "Düzeltilecek kayıtlı sorun yok.": "Keine erfassten Probleme zu beheben.",
  "Düzeltilecek sorun listesi eksik olabilir.":
    "Die Liste der zu behebenden Probleme ist möglicherweise unvollständig.",
  "Bu hafta yapılacak {count} şey": {
    one: "{count} Aufgabe für diese Woche",
    other: "{count} Aufgaben für diese Woche",
  },
  "Sıralama, düzeltildiğinde site puanına en çok puan kazandıranlara göre.":
    "Geordnet danach, wie viele Punkte jede Korrektur zum Website-Score beiträgt.",
  Sonrasında: "Danach",
  "Denetim hata verip durdu.": "Das Audit wurde mit einem Fehler beendet.",
  "Denetim hâlâ çalışıyor.": "Das Audit läuft noch.",
  "Hiç sayfa taranamadı.": "Es konnten keine Seiten gecrawlt werden.",
  "{count} sayfa tarandı": {
    one: "{count} gecrawlte Seite",
    other: "{count} gecrawlte Seiten",
  },
  "Rapor eksik olabilir.": "Der Bericht ist möglicherweise unvollständig.",
  "{count} sorun türü: {critical} kritik, {warning} uyarı, {info} bilgi.": {
    one: "{count} Problemtyp: {critical} kritisch, {warning} Warnung, {info} Info.",
    other:
      "{count} Problemtypen: {critical} kritisch, {warning} Warnungen, {info} Info.",
  },
  "Taranan sayfa": "Gecrawlte Seiten",
  "Ortalama yanıt": "Durchschnittliche Antwort",
  Dizinde: "Indexiert",
  Kısmen: "Teilweise",
  Nötr: "Neutral",
  "Bu denetimin sayfaları için Search Console URL Denetleme Aracı sonucu kayıtlı değil, bu yüzden Google'ın hangi sayfaları dizine aldığı rapora girmiyor. Dizin Kapsamı ekranından inceleme çalıştırıldıktan sonra rapor yeniden oluşturulursa bu bölüm dolar.":
    "Für die Seiten dieses Audits sind keine Ergebnisse der URL-Prüfung der Search Console gespeichert, daher kann der Bericht nicht sagen, welche Seiten Google indexiert hat. Führen Sie im Bildschirm „Indexstatus“ eine Prüfung aus und erstellen Sie den Bericht erneut, um diesen Abschnitt zu füllen.",
  "Kaynak: Search Console URL Denetleme Aracı. Sonuçlar kayıtlıdır, bu rapor Google'a yeni istek atmaz; son inceleme {date}.":
    "Quelle: URL-Prüfung der Search Console. Die Ergebnisse sind gespeichert, daher sendet dieser Bericht keine neuen Anfragen an Google; letzte Prüfung am {date}.",
  "Kaynak: Search Console URL Denetleme Aracı. Sonuçlar kayıtlıdır, bu rapor Google'a yeni istek atmaz.":
    "Quelle: URL-Prüfung der Search Console. Die Ergebnisse sind gespeichert, daher sendet dieser Bericht keine neuen Anfragen an Google.",
  "Dizine girebilen {count} sayfadan {checked} tanesi için Google yanıt verdi ({percent}).":
    {
      one: "Google hat für {checked} von {count} indexierbaren Seite geantwortet ({percent}).",
      other:
        "Google hat für {checked} von {count} indexierbaren Seiten geantwortet ({percent}).",
    },
  "Google dizin durumu dağılımı": "Verteilung des Google-Indexstatus",
  "Google'ın verdiği durumlar": "Von Google gemeldete Status",
  "Kapsam durumu dağılımı": "Verteilung des Abdeckungsstatus",
  "Dikkat isteyen sayfalar": "Seiten, die Aufmerksamkeit erfordern",
  Sonuç: "Ergebnis",
  "Hata: {error}": "Fehler: {error}",
  Aynı: "Gleich",
  "Dizinde değil olarak işaretlenen ya da asıl adresi farklı seçilen sayfa yok.":
    "Keine Seite ist als nicht indexiert markiert oder hat eine andere ausgewählte kanonische URL.",
  "Taranan {count} sayfanın {inMap} tanesi ({percent}) site haritasında. Haritanın kendisi (toplam adres sayısı, dosya boyutu) rapora girmez; yalnızca taranan sayfaların harita durumu ve haritayla ilgili bulunan sorunlar gösterilir.":
    {
      one: "{inMap} von {count} gecrawlten Seite ({percent}) ist in der Sitemap. Die Sitemap selbst (Gesamtzahl der Adressen, Dateigröße) wird nicht betrachtet; gezeigt werden nur der Sitemap-Status der gecrawlten Seiten und die gefundenen Sitemap-Probleme.",
      other:
        "{inMap} von {count} gecrawlten Seiten ({percent}) sind in der Sitemap. Die Sitemap selbst (Gesamtzahl der Adressen, Dateigröße) wird nicht betrachtet; gezeigt werden nur der Sitemap-Status der gecrawlten Seiten und die gefundenen Sitemap-Probleme.",
    },
  "Haritayla ilgili sorun": "Sitemap-Problem",
  "Haritayla ilgili kayıtlı sorun yok.": "Keine Sitemap-Probleme erfasst.",
  "Dizine girebilen ama haritada olmayan sayfalar ({count})":
    "Indexierbare Seiten, die in der Sitemap fehlen ({count})",
  "Etkilenen adres": "Betroffene Adresse",
  "Tüm siteyi ilgilendiriyor": "Betrifft die gesamte Website",
  "Ne demek, neden önemli:": "Was es bedeutet und warum es wichtig ist:",
  "Nasıl düzeltilir:": "So beheben Sie das Problem:",
  'Kalan adresler raporun sonundaki <a href="#ek-adresler">Ek A</a> bölümünde.':
    'Die übrigen Adressen stehen in <a href="#ek-adresler">Anhang A</a> am Ende des Berichts.',
  "Sorun listesi eksik olabilir (denetim tamamlanmadı).":
    "Die Problemliste ist möglicherweise unvollständig (das Audit wurde nicht abgeschlossen).",
  "{count} tür": {
    one: "{count} Typ",
    other: "{count} Typen",
  },
  "{count} sorun türü": {
    one: "{count} Problemtyp",
    other: "{count} Problemtypen",
  },
  "Önem derecesine, sonra kategoriye, sonra etkilenen sayfa sayısına göre sıralı. Her sorun için en fazla {count} adres yazılır.":
    {
      one: "Sortiert nach Schweregrad, dann Kategorie, dann betroffenen Seiten. Pro Problem wird höchstens {count} Adresse aufgeführt.",
      other:
        "Sortiert nach Schweregrad, dann Kategorie, dann betroffenen Seiten. Pro Problem werden höchstens {count} Adressen aufgeführt.",
    },
  "{take} / {count} adres": {
    one: "{take} / {count} Adresse",
    other: "{take} / {count} Adressen",
  },
  "Sorunların altında gösterilen ilk {count} adresin ötesindekiler.": {
    one: "Adressen jenseits der ersten {count}, die unter jedem Problem gezeigt wird.",
    other:
      "Adressen jenseits der ersten {count}, die unter jedem Problem gezeigt werden.",
  },
  "{count} sayfa tarandı, başlangıç adresi {url}.": {
    one: "{count} Seite gecrawlt, beginnend bei {url}.",
    other: "{count} Seiten gecrawlt, beginnend bei {url}.",
  },
  "Tarama üst sınırı {count} sayfaydı; sınıra ulaşıldı, yani site bundan büyük olabilir ve görülmeyen sayfalardaki sorunlar rapora girmedi.":
    {
      one: "Das Crawling-Limit lag bei {count} Seite und wurde erreicht; die Website ist daher möglicherweise größer, und Probleme auf nicht erfassten Seiten fehlen im Bericht.",
      other:
        "Das Crawling-Limit lag bei {count} Seiten und wurde erreicht; die Website ist daher möglicherweise größer, und Probleme auf nicht erfassten Seiten fehlen im Bericht.",
    },
  "Tarama üst sınırı {count} sayfaydı.": {
    one: "Das Crawling-Limit lag bei {count} Seite.",
    other: "Das Crawling-Limit lag bei {count} Seiten.",
  },
  "Hız ölçümü bu denetimde kapalıydı.":
    "Die Geschwindigkeitsmessung war für dieses Audit deaktiviert.",
  "Hiçbir sayfa için hız puanı kaydedilmedi.":
    "Für keine Seite wurde ein Geschwindigkeitswert erfasst.",
  "{count} sayfa Lighthouse ile ölçüldü (laboratuvar verisi, tek sanal cihaz). Ölçülmeyen sayfalar hakkında hız bilgisi yoktur.":
    {
      one: "{count} Seite wurde mit Lighthouse gemessen (Labordaten, ein einzelnes simuliertes Gerät). Es liegen keine Geschwindigkeitsdaten für Seiten vor, die nicht gemessen wurden.",
      other:
        "{count} Seiten wurden mit Lighthouse gemessen (Labordaten, ein einzelnes simuliertes Gerät). Es liegen keine Geschwindigkeitsdaten für Seiten vor, die nicht gemessen wurden.",
    },
  "Başlangıç {start}.": "Begonnen am {start}.",
  "Başlangıç {start}, bitiş {end}, süre {duration}.":
    "Begonnen am {start}, beendet am {end}, dauerte {duration}.",
  "Başlangıç {start}, bitiş {end}.": "Begonnen am {start}, beendet am {end}.",
  "Rapor o andaki durumu gösterir; site sonradan değişmiş olabilir.":
    "Der Bericht zeigt die Website so, wie sie damals war; sie kann sich seitdem verändert haben.",
  "Google dizin durumu": "Google-Indexstatus",
  "Search Console URL Denetleme Aracı'nın kayıtlı yanıtları; {count} sayfa için Google yanıt verdi. Rapor Google'a yeni istek atmaz.":
    {
      one: "Gespeicherte Antworten der URL-Prüfung der Search Console; Google hat für {count} Seite geantwortet. Der Bericht sendet keine neuen Anfragen an Google.",
      other:
        "Gespeicherte Antworten der URL-Prüfung der Search Console; Google hat für {count} Seiten geantwortet. Der Bericht sendet keine neuen Anfragen an Google.",
    },
  "Bu denetim için kayıtlı Google yanıtı yok, bölüm boş.":
    "Für dieses Audit sind keine Google-Antworten gespeichert, daher ist der Abschnitt leer.",
  "Listelerdeki kesintiler": "Kürzungen in den Listen",
  "Dosya boyutunu makul tutmak için her sorunun altında en fazla {issuePages} adres, sayfa tablosunda {pages} sayfa, hız tablosunda {speed} sayfa yazılır; kesilen her listenin altında kaç kaydın dışarıda kaldığı belirtilir. Tam kayıtlar denetim ekranındadır.":
    "Um die Dateigröße in Grenzen zu halten, führt jedes Problem höchstens {issuePages} Adressen auf, die Seitentabelle {pages} Seiten und die Geschwindigkeitstabelle {speed} Seiten; jede gekürzte Liste nennt, wie viele Einträge ausgelassen wurden. Die vollständigen Daten finden Sie auf dem Audit-Bildschirm.",
  "Bu raporda ölçülmeyenler": "In diesem Bericht nicht gemessen",
  "Arama sıralaması, tıklama ve trafik: bu rapor Search Console ya da Analytics trafiğini içermez.":
    "Suchrankings, Klicks und Traffic: Dieser Bericht enthält keinen Search-Console- oder Analytics-Traffic.",
  "Geri bağlantılar ve rakip siteler.":
    "Backlinks und konkurrierende Websites.",
  "İçeriğin kalitesi, arama niyetine uygunluğu ve özgünlüğü; yalnızca kelime sayısı gibi yapısal sinyallere bakılır.":
    "Inhaltsqualität, Passung zur Suchabsicht und Originalität; geprüft werden nur strukturelle Signale wie die Wortanzahl.",
  "Gerçek kullanıcı hız verisi (CrUX); yalnızca laboratuvar ölçümü vardır.":
    "Geschwindigkeitsdaten echter Nutzer (CrUX); es gibt nur Labormessungen.",
  "Giriş gerektiren sayfalar ve taramanın ulaşamadığı adresler.":
    "Seiten, die eine Anmeldung erfordern, und Adressen, die der Crawl nicht erreichen konnte.",
  "Kayıtlı sayfa yok.": "Keine Seiten erfasst.",
  '{count} sayfa; en çok sorunu olanlar üstte. "Başlık" başlığın karakter sayısıdır.':
    {
      one: "{count} Seite; diejenigen mit den meisten Problemen zuerst. „Titel“ ist die Länge des Titels in Zeichen.",
      other:
        "{count} Seiten; diejenigen mit den meisten Problemen zuerst. „Titel“ ist die Länge des Titels in Zeichen.",
    },
  "Dizine girer": "Indexierbar",
  Yanıt: "Antwort",
  "Yönlenir: {url}": "Leitet weiter zu: {url}",
  yok: "keine",
  İyi: "Gut",
  Zayıf: "Schlecht",
  orta: "durchschnittlich",
  "Bu metrik ölçülmedi.": "Diese Metrik wurde nicht gemessen.",
  "{metric}: en kötü 5": "{metric}: schlechteste 5",
  "LCP (en büyük içerik)": "LCP (größter Inhalt)",
  "Sayfanın ana görselinin ya da başlığının ekranda belirmesi ne kadar sürdü. 2,5 saniye altı iyi.":
    "Wie lange es gedauert hat, bis das Hauptbild oder die Überschrift der Seite auf dem Bildschirm angezeigt wurde. Unter 2,5 Sekunden ist gut.",
  "CLS (görsel kayma)": "CLS (Layoutverschiebung)",
  "Sayfa yüklenirken içerik ne kadar yer değiştirdi; yanlış tıklamaya yol açan kayma. 0,1 altı iyi.":
    "Wie viel Inhalt sich beim Laden der Seite verschoben hat – die Art Verschiebung, die zu Fehlklicks führt. Unter 0,1 ist gut.",
  "INP (tepki süresi)": "INP (Reaktionsfähigkeit)",
  "Bir tıklamaya ya da dokunmaya sayfa ne kadar çabuk karşılık verdi. 200 ms altı iyi.":
    "Wie schnell die Seite auf einen Klick oder Tipp reagiert hat. Unter 200 ms ist gut.",
  İ: "G",
  O: "A",
  Z: "P",
  "İ iyi, O orta, Z zayıf; her sayfa yalnızca ölçülen metrikte sayılır.":
    "G = gut, A = durchschnittlich, P = schlecht; jede Seite zählt nur für die bei ihr gemessenen Metriken.",
  "Temel Web Verileri: sayfaların dağılımı (mobil)":
    "Core Web Vitals: Verteilung der Seiten (mobil)",
  "Her metrik için iyi, orta ve zayıf sayfa sayısı":
    "Gute, durchschnittliche und schlechte Seiten für jede Metrik",
  "Bu denetimde hız ölçümü kapalıydı, bu yüzden sayfa hızı hakkında bir şey söylenmiyor.":
    "Die Geschwindigkeitsmessung war für dieses Audit deaktiviert, daher enthält der Bericht keine Aussage zur Seitengeschwindigkeit.",
  "Bu denetimde kayıtlı Lighthouse sonucu yok: hız ölçümü kapalıydı ya da ölçümler tamamlanamadı (ör. ölçüm servisi istek sınırına takıldı). Hız ölçülmediği için bu rapor hız hakkında bir şey söylemez.":
    "Für dieses Audit sind keine Lighthouse-Ergebnisse gespeichert: Die Geschwindigkeitsmessung war deaktiviert, oder die Messungen konnten nicht abgeschlossen werden (z. B. weil der Messdienst sein Anfragelimit erreicht hat). Da die Geschwindigkeit nicht gemessen wurde, sagt dieser Bericht nichts darüber.",
  "(adres bulunamadı)": "(Adresse nicht gefunden)",
  "İyi (90-100)": "Gut (90-100)",
  "Orta (50-89)": "Durchschnittlich (50-89)",
  "Zayıf (0-49)": "Schlecht (0-49)",
  "{category} (mobil ort.)": "{category} (mobiler Durchschnitt)",
  "Mobil puan": "Mobile-Bewertung",
  "Masaüstü puan": "Desktop-Bewertung",
  "Ölçüm hatası: {error}": "Messfehler: {error}",
  "{count} sayfa mobilde ölçüldü": {
    one: "{count} Seite auf Mobilgeräten gemessen",
    other: "{count} Seiten auf Mobilgeräten gemessen",
  },
  " (taranan {count} sayfanın {percent}'i)": {
    one: " ({percent} von {count} gecrawlten Seite)",
    other: " ({percent} von {count} gecrawlten Seiten)",
  },
  "; {count} ölçüm hata verdi": {
    one: "; {count} Messung fehlgeschlagen",
    other: "; {count} Messungen fehlgeschlagen",
  },
  '<strong>{measured}</strong>{share}{failed}. Ortalama tek bir sayı "her sayfa orta" ile "yarısı mükemmel yarısı felaket"i aynı gösterdiği için dağılım veriliyor.':
    "<strong>{measured}</strong>{share}{failed}. Die Verteilung wird gezeigt, weil ein einzelner Durchschnitt „alle Seiten mittelmäßig“ genauso aussehen lässt wie „die Hälfte sehr gut, die Hälfte sehr schlecht“.",
  "{planned} sayfanın ölçülmesi planlandı, {measured} tanesi puan verdi{failed}. Aşağıdaki dağılım yalnızca ölçülen sayfaları yansıtır; ölçülmeyenler iyi ya da kötü sayılmadı.":
    "{planned} Seiten waren für die Messung geplant, und {measured} lieferten eine Bewertung{failed}. Die Verteilung unten berücksichtigt nur die gemessenen Seiten; der Rest wurde weder als gut noch als schlecht gezählt.",
  "; kalanlar hata verdi ya da ölçüm servisinin istek sınırına takılmış olabilir":
    "; der Rest ist fehlgeschlagen oder hat möglicherweise das Anfragelimit des Messdienstes erreicht",
  "Ölçüm kısmi.": "Teilmessung.",
  "Mobil performans puanı dağılımı":
    "Verteilung der mobilen Leistungsbewertung",
  "Lighthouse performans puanı histogramı":
    "Lighthouse-Leistungsbewertungshistogramm",
  "Puan bandı": "Bewertungsbereich",
  "İyi, orta, zayıf sayfa sayısı":
    "Anzahl guter, durchschnittlicher und schlechter Seiten",
  "Lighthouse kategorileri": "Lighthouse-Kategorien",
  "Kategori başına mobil ortalama puan":
    "Mobile Durchschnittsbewertung pro Kategorie",
  "Sayfa sayfa sonuçlar": "Ergebnisse nach Seite",
  "Mobil performans puanı en düşük sayfalar üstte. Metrikler mobil ölçümden.":
    "Seiten mit der niedrigsten mobilen Leistungsbewertung zuerst. Die Messwerte stammen aus der mobilen Messung.",
  'Eşikler Google\'ın yayımladığı değerlerdir: LCP 2,5 sn altı iyi, 4 sn üstü zayıf; CLS 0,1 altı iyi, 0,25 üstü zayıf; INP 200 ms altı iyi, 500 ms üstü zayıf. INP laboratuvarda çoğu zaman ölçülemez ("--" görünür).':
    "Die Schwellenwerte sind die von Google veröffentlichten Werte: LCP unter 2,5 s ist gut und über 4 s schlecht; CLS unter 0,1 ist gut und über 0,25 schlecht; INP unter 200 ms ist gut und über 500 ms schlecht. INP kann im Labor oft nicht gemessen werden (es zeigt „--“).",
  "Her sürümde nelerin eklendiğini ve düzeltildiğini burada bulabilirsiniz.":
    "Hier sehen Sie, was in jeder Version hinzugefügt und behoben wurde.",
  Yenilik: "Neuerung",
  Düzeltme: "Fehlerbehebung",
  "Acil düzeltme": "Hotfix",
  "Windows açılınca başlat": "Mit Windows starten",
  "Windows ayarı kaydedildi": "Windows-Einstellung gespeichert",
  "Bu tercihler Windows uygulamasına kaydedilir ve tepsi menüsüyle aynı ayarları kullanır.":
    "Diese Einstellungen werden in der Windows-App gespeichert und gelten auch für das Infobereichsmenü.",
  "Windows ayarları okunuyor…": "Windows-Einstellungen werden gelesen …",
  "Bu seçenekler Windows paketinde kullanılabilir. Docker veya geliştirici kurulumunda başlangıç davranışını işletim sisteminizden yönetin.":
    "Diese Optionen sind im Windows-Paket verfügbar. Bei Docker- oder Entwicklerinstallationen verwalten Sie das Startverhalten über Ihr Betriebssystem.",
  "Bu Windows başlatıcısı uygulama içinden ayar değiştirmeyi desteklemiyor. Windows paketini güncelleyin; bu sırada tepsi menüsündeki seçenekleri kullanabilirsiniz.":
    "Dieser Windows-Launcher unterstützt keine Einstellungsänderungen in der App. Aktualisieren Sie das Windows-Paket; bis dahin können Sie die Optionen im Infobereichsmenü verwenden.",
  "Windows ayarlarına ulaşılamadı. Tepsi uygulamasının açık olduğunu kontrol edip yeniden deneyin.":
    "Die Windows-Einstellungen sind nicht erreichbar. Prüfen Sie, ob die App im Infobereich läuft, und versuchen Sie es erneut.",
  "Windows oturumu açıldığında arka planda başlar. Kapalıyken uygulamayı kendiniz açarsınız.":
    "Die App startet im Hintergrund, wenn Sie sich bei Windows anmelden. Ist die Option aus, öffnen Sie die App selbst.",
  "Bu ayar yönetici tarafından tüm kullanıcılar için açılmış. Yalnızca yönetici kapatabilir.":
    "Diese Einstellung wurde von einem Administrator für alle Benutzer aktiviert. Nur ein Administrator kann sie deaktivieren.",
  "Otomatik güncelleme kurulumu": "Updates automatisch installieren",
  "Yeni sürümü indirir, doğrular ve kurar. Kapalıyken tepsi menüsünden Güncelle seçeneğiyle kurabilirsiniz.":
    "Lädt neue Versionen herunter, prüft sie und installiert sie. Ist die Option aus, können Sie das Update über Aktualisieren im Infobereichsmenü installieren.",
  "Tüm kullanıcılar için kurulumda güncellemeyi yönetici kurar. Uygulama yeni sürümü haber verir.":
    "Bei einer Installation für alle Benutzer installiert ein Administrator Updates. Die App informiert Sie über neue Versionen.",
  "Tarayıcı sekmesini kapatmak uygulamayı durdurmaz. Tamamen kapatmak için tepsi menüsünden Çıkış deyin. Bilgisayar uyurken denetimler çalışmaz.":
    "Wenn Sie den Browser-Tab schließen, läuft die App weiter. Zum vollständigen Beenden wählen Sie Beenden im Infobereichsmenü. Während der Computer im Ruhezustand ist, laufen keine Audits.",
  Görünüm: "Darstellung",
  "Varsayılan koyu tema seowatcher.io ile aynı görünür. Sistem, işletim sisteminizin tercihini izler. Seçim bu tarayıcıda saklanır.":
    "Das dunkle Standarddesign entspricht seowatcher.io. System folgt der Einstellung Ihres Betriebssystems. Ihre Auswahl wird in diesem Browser gespeichert.",
  Tema: "Design",
  "Tema tercihi": "Designeinstellung",
  Sistem: "System",
  Açık: "Hell",
  Koyu: "Dunkel",

  Google: "Google",
  "Hizmet hesabı": "Dienstkonto",
  Sınırlar: "Limits",
  Hakkında: "Info",
  "Sürüm notları": "Versionshinweise",
  Kayıtlı: "Gespeichert",
  "Kurulum dosyasından geliyor": "Aus der Installationsdatei übernommen",
  Kullanılmıyor: "Nicht verwendet",
  "Şu an kullanılan: hizmet hesabı": "Derzeit verwendet: Dienstkonto",
  "Şu an kullanılan: Google erişim anahtarı":
    "Derzeit verwendet: Google-Zugriffsschlüssel",
  "Şu an kullanılmıyor (hizmet hesabı öncelikli): Google erişim anahtarı":
    "Derzeit nicht verwendet (Dienstkonto hat Vorrang): Google-Zugriffsschlüssel",
  "Şu an kullanılmıyor (Google erişim anahtarı öncelikli): hizmet hesabı":
    "Derzeit nicht verwendet (Google-Zugriffsschlüssel hat Vorrang): Dienstkonto",
  "Anahtar kayıtlı": "Schlüssel gespeichert",
  "Anahtar eksik": "Schlüssel fehlt",
  "Yeni sürüm {version}": "Neue Version {version}",
  "Kontrol kapalı": "Prüfung deaktiviert",
  Güncel: "Aktuell",
  Denetlenmedi: "Nicht geprüft",
  Okunamadı: "Nicht lesbar",
  "Kimlikte boşluk olamaz.": "Die Client-ID darf keine Leerzeichen enthalten.",
  "Kimlik {suffix} ile bitmeli. Gizli anahtarı değil, OAuth client ID'yi yapıştırın.":
    "Die Client-ID muss auf {suffix} enden. Fügen Sie die OAuth-Client-ID ein, nicht das Client-Secret.",
  "Anahtarı test et": "Schlüssel testen",

  "Google erişim anahtarı kaydedildi": "Google-Zugriffsschlüssel gespeichert",
  "Google erişim anahtarı kaydedilemedi. Değerleri kontrol edip tekrar deneyin.":
    "Google-Zugriffsschlüssel konnte nicht gespeichert werden. Prüfen Sie die Werte und versuchen Sie es erneut.",
  "Google erişim anahtarı silindi": "Google-Zugriffsschlüssel gelöscht",
  "Google erişim anahtarı silinemedi. Tekrar deneyin.":
    "Google-Zugriffsschlüssel konnte nicht gelöscht werden. Versuchen Sie es erneut.",
  "Google bağlantısı": "Google-Verbindung",
  "Uygulama Google'a sizin adınıza bağlanır. Bunun için Google'dan aldığınız erişim anahtarını (OAuth client ID) buraya girin. Gizli kısmı şifrelenir ve bir daha tarayıcıya gönderilmez. Search Console ve Analytics aynı anahtarı kullanır.":
    "Die App verbindet sich in Ihrem Namen mit Google. Geben Sie dazu hier den von Google erhaltenen Zugriffsschlüssel (OAuth-Client-ID) ein. Der geheime Teil wird verschlüsselt und nie wieder an den Browser gesendet. Search Console und Analytics verwenden denselben Schlüssel.",
  "{console}'da bir OAuth client oluşturun (tür: {type}).":
    "Erstellen Sie in {console} einen OAuth-Client (Typ: {type}).",
  "Şu iki adresi {field} alanına ekleyin.":
    "Fügen Sie diese beiden Adressen unter {field} hinzu.",
  "Adresler harfi harfine aynı olmalı, aksi halde Google {code} hatası verir. İkisini de ekleyin: biri Search Console, biri Analytics için.":
    "Die Adressen müssen exakt übereinstimmen, sonst meldet Google den Fehler {code}. Fügen Sie beide hinzu: eine für Search Console, eine für Analytics.",
  "{service} yönlendirme adresi kopyalandı":
    "Weiterleitungs-URI für {service} kopiert",
  "Kimliği ve gizli anahtarı aşağıya yazın.":
    "Geben Sie unten die Client-ID und das Client-Secret ein.",
  "Google erişim anahtarının durumu okunamadı.":
    "Status des Google-Zugriffsschlüssels konnte nicht gelesen werden.",
  "Ortam değişkenlerinden geliyor": "Aus Umgebungsvariablen übernommen",
  "{id} ve {secret} ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.":
    "{id} und {secret} sind festgelegt. Wenn Sie hier einen Wert speichern, wird dieser verwendet.",
  Değiştir: "Ändern",
  "İstemci kimliği": "Client-ID",
  "Google Cloud Console'da APIs & Services → Credentials listesinde, OAuth 2.0 Client IDs altında görünür. {suffix} ile biter, gizli değildir.":
    "Sie finden die ID in der Google Cloud Console unter APIs & Services → Credentials in der Liste OAuth 2.0 Client IDs. Sie endet auf {suffix} und ist nicht geheim.",
  "Gizli anahtar": "Client-Secret",
  "Aynı OAuth client'ı açınca sağdaki panelde. Google bunu yalnızca oluşturduğunuz anda tam gösterir. Kaçırdıysanız yeni bir gizli anahtar üretin. Burada sunucuda şifrelenir, bir daha tarayıcıya gönderilmez.":
    "Sie finden es rechts, wenn Sie denselben OAuth-Client öffnen. Google zeigt es nur beim Erstellen vollständig an. Falls Sie es verpasst haben, erstellen Sie ein neues Secret. Hier wird es auf dem Server verschlüsselt und nie wieder an den Browser gesendet.",
  "Google erişim anahtarı silinsin mi?": "Google-Zugriffsschlüssel löschen?",
  "Kimlik ve gizli anahtar bu kurulumdan silinir. Mevcut Search Console ve Analytics bağlantıları yerinde kalır ama anahtar yeniden girilene kadar çalışmaz.":
    "Client-ID und Secret werden aus dieser Installation entfernt. Bestehende Search-Console- und Analytics-Verbindungen bleiben erhalten, funktionieren aber erst wieder, wenn Sie den Schlüssel erneut eingeben.",
  "Anahtarı sil": "Schlüssel löschen",
  "Hizmet hesabı kaydedildi": "Dienstkonto gespeichert",
  "Hizmet hesabı kaydedilemedi. Tekrar deneyin.":
    "Dienstkonto konnte nicht gespeichert werden. Versuchen Sie es erneut.",
  "Hizmet hesabı bu kurulumdan silindi. Anahtarı gerçekten iptal etmek için Google Cloud'dan da silin.":
    "Das Dienstkonto wurde aus dieser Installation entfernt. Um den Schlüssel wirklich zu widerrufen, löschen Sie ihn auch in Google Cloud.",
  "Hizmet hesabı silinemedi. Tekrar deneyin.":
    "Dienstkonto konnte nicht gelöscht werden. Versuchen Sie es erneut.",
  "Hizmet hesabı (daha kısa yol)": "Dienstkonto (der einfachere Weg)",

  "Hizmet hesapları": "Dienstkonten",
  "Hizmet hesabı durumu okunamadı.":
    "Status des Dienstkontos konnte nicht gelesen werden.",
  "Bu adresi Search Console'da {path} ile mülkünüze ekleyin (yetki: {level}). Eklemeden veri gelmez. Analytics için de GA4 mülkünde {gaPath}'ne aynı adresi Görüntüleyen olarak ekleyin.":
    "Fügen Sie diese Adresse in Search Console unter {path} Ihrer Property hinzu (Berechtigung: {level}). Vorher werden keine Daten geladen. Fügen Sie dieselbe Adresse für Analytics in der GA4-Property unter {gaPath} als Betrachter hinzu.",
  "Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle":
    "Einstellungen → Nutzer und Berechtigungen → Nutzer hinzufügen",
  Tam: "Vollzugriff",
  "Yönetici → Erişim yönetimi": "Verwaltung → Zugriffsverwaltung",
  "Hizmet hesabı adresi kopyalandı": "Adresse des Dienstkontos kopiert",
  "Hizmet hesabı dosyası (JSON)": "Schlüsseldatei des Dienstkontos (JSON)",
  "Anahtar sunucuda şifrelenir ve bir daha tarayıcıya gönderilmez.":
    "Der Schlüssel wird auf dem Server verschlüsselt und nie wieder an den Browser gesendet.",
  "Hizmet hesabı silinsin mi?": "Dienstkonto löschen?",
  "JSON anahtarı bu kurulumdan silinir ve Search Console ile Analytics bu hesapla veri çekemez. Anahtarı Google tarafında da iptal etmek için Google Cloud'dan silmeniz gerekir.":
    "Der JSON-Schlüssel wird aus dieser Installation entfernt. Search Console und Analytics können mit diesem Konto keine Daten mehr abrufen. Um den Schlüssel auch bei Google zu widerrufen, löschen Sie ihn in Google Cloud.",
  "Hesabı sil": "Konto löschen",
  "PageSpeed anahtarı kaydedildi": "PageSpeed-Schlüssel gespeichert",
  "PageSpeed anahtarı kaydedilemedi. Anahtarı kontrol edip tekrar deneyin.":
    "PageSpeed-Schlüssel konnte nicht gespeichert werden. Prüfen Sie den Schlüssel und versuchen Sie es erneut.",
  "PageSpeed anahtarı silindi": "PageSpeed-Schlüssel gelöscht",
  "PageSpeed anahtarı silinemedi. Tekrar deneyin.":
    "PageSpeed-Schlüssel konnte nicht gelöscht werden. Versuchen Sie es erneut.",

  "Anahtar durumu okunamadı.": "Schlüsselstatus konnte nicht gelesen werden.",
  "Ortam değişkeninden geliyor": "Aus einer Umgebungsvariablen übernommen",
  "{name} ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.":
    "{name} ist festgelegt. Wenn Sie hier einen Wert speichern, wird dieser verwendet.",
  "API anahtarı": "API-Schlüssel",
  "Google Cloud Console → Credentials → Create credentials → API key. Önce aynı projede PageSpeed Insights API'sini etkinleştirin, yoksa anahtar 403 hatası verir.":
    "Google Cloud Console → Credentials → Create credentials → API key. Aktivieren Sie zuerst im selben Projekt die PageSpeed Insights API, sonst meldet der Schlüssel den Fehler 403.",
  "PageSpeed anahtarı silinsin mi?": "PageSpeed-Schlüssel löschen?",

  "GitHub'a ulaşılamadı; son bilinen sürüm {version}":
    "GitHub ist nicht erreichbar; die letzte bekannte Version ist {version}",
  "En güncel sürümü kullanıyorsunuz": "Sie verwenden die neueste Version",
  "Güncelleme kontrol edilemedi. Birazdan tekrar deneyin.":
    "Updates konnten nicht geprüft werden. Versuchen Sie es gleich noch einmal.",
  "Güncelleme kontrolü açıldı": "Updateprüfung aktiviert",
  "Güncelleme kontrolü kapatıldı": "Updateprüfung deaktiviert",
  "Ayar kaydedilemedi. Tekrar deneyin.":
    "Einstellung konnte nicht gespeichert werden. Versuchen Sie es erneut.",
  "Uygulama yeni sürümü fark eder ve ne yapacağınızı söyler. Windows paketi güncellemeyi kendisi kurar, Docker'da verilen komutu siz çalıştırırsınız. Docker'da kontrolü kapatırsanız GitHub'a istek gitmez. Windows paketinde görev çubuğu uygulaması günde bir kez GitHub'a bakar. Kendiliğinden kurup kurmayacağını menüdeki {option} seçeneği belirler.":
    "Die App erkennt neue Versionen und sagt Ihnen, was zu tun ist. Das Windows-Paket installiert Updates selbst; bei Docker führen Sie den angezeigten Befehl aus. Wenn Sie die Prüfung bei Docker deaktivieren, werden keine Anfragen an GitHub gesendet. Das Windows-Symbol im Infobereich prüft GitHub einmal täglich. Mit {option} im Menü legen Sie fest, ob Updates automatisch installiert werden.",
  "Güncellemeleri kendiliğinden kur": "Updates automatisch installieren",
  Sürüm: "Version",
  "Site ve kılavuz": "Website und Anleitung",
  "{version} yayımlandı.": "{version} ist verfügbar.",
  Değişiklikler: "Änderungen",
  "Windows paketi güncellemeyi kendisi kurar: görev çubuğundaki seowatcher simgesi yeni sürümü indirir, doğrular ve sessizce kurar. Kendiliğinden kurmayı istemiyorsanız simgeye sağ tıklayıp {option} işaretini kaldırın; o zaman yeni sürüm hazır olunca menüde {item} maddesi çıkar, tıklayınca kurulur. Verileriniz ve Google bağlantınız olduğu gibi kalır.":
    "Das Windows-Paket installiert Updates selbst: Das seowatcher-Symbol im Infobereich lädt neue Versionen herunter, prüft sie und installiert sie im Hintergrund. Wenn Sie das nicht möchten, klicken Sie mit der rechten Maustaste auf das Symbol und deaktivieren Sie {option}. Sobald ein Update bereitsteht, erscheint {item} im Menü und wird beim Anklicken installiert. Ihre Daten und Google-Verbindung bleiben erhalten.",
  "Güncelle: sürüm hazır": "Aktualisieren: Version bereit",
  "Proje klasöründe çalıştırın. Verileriniz Docker biriminde ({volume}) kalır, güncelleme onu silmez.":
    "Führen Sie den Befehl im Projektordner aus. Ihre Daten bleiben im Docker-Volume ({volume}); das Update löscht sie nicht.",
  "En güncel sürümü kullanıyorsunuz.": "Sie verwenden die neueste Version.",

  "Son kontrol başarısız oldu: GitHub'a ulaşılamadı. Son bilinen sürüm {version} (son başarılı kontrol: {date}); güncel olup olmadığı doğrulanamadı.":
    "Die letzte Prüfung ist fehlgeschlagen: GitHub ist nicht erreichbar. Die letzte bekannte Version ist {version} (letzte erfolgreiche Prüfung: {date}); ob Sie aktuell sind, konnte nicht bestätigt werden.",
  "Son kontrol başarısız oldu: GitHub'a ulaşılamadı. Son bilinen sürüm {version}; güncel olup olmadığı doğrulanamadı.":
    "Die letzte Prüfung ist fehlgeschlagen: GitHub ist nicht erreichbar. Die letzte bekannte Version ist {version}; ob Sie aktuell sind, konnte nicht bestätigt werden.",
  "Son kontrolde GitHub'a ulaşılamadı.":
    "GitHub war bei der letzten Prüfung nicht erreichbar.",

  "Şimdi kontrol et": "Jetzt prüfen",
  "Kontrol açıkken uygulama, bir sekmede açık olduğu sürece en çok altı saatte bir GitHub'a bağlanıp en son sürümü sorar. GitHub bu istekte yalnızca genel IP adresinizi, uygulama adını ve sürümü görür; siteleriniz, Google hesabınız ya da denetimleriniz gönderilmez.":
    "Ist die Prüfung eingeschaltet, fragt die App GitHub höchstens alle sechs Stunden nach der neuesten Version, solange sie in einem Browser-Tab geöffnet ist. GitHub sieht dabei nur Ihre öffentliche IP-Adresse, den App-Namen und die Version; Ihre Websites, Ihr Google-Konto und Ihre Audits werden nie übertragen.",
  "Son kontrol: {date}.": "Zuletzt geprüft: {date}.",
  "Kurulu sürüm": "Installierte Version",
  "Görev çubuğu menüsünden Günlükleri aç deyip server.log dosyasına bakın; düzelmezse Kurulumu onar.":
    "Wählen Sie im Infobereichsmenü Günlükleri aç (Protokolle öffnen) und prüfen Sie server.log. Falls das nicht hilft, wählen Sie Kurulumu onar (Installation reparieren).",
  "Ayrıntı için docker compose logs --tail 50 çıktısına bakın.":
    "Weitere Informationen finden Sie in der Ausgabe von docker compose logs --tail 50.",
  "Search Console ve Analytics kapalı. Uygulamanın şifreleme anahtarı (veri klasöründeki instance-secret dosyası) eksik ya da bozuk. Görev çubuğu menüsünden Kurulumu onar deyin.":
    "Search Console und Analytics sind deaktiviert. Der Verschlüsselungsschlüssel der App (Datei instance-secret im Datenordner) fehlt oder ist beschädigt. Wählen Sie im Infobereichsmenü Kurulumu onar (Installation reparieren).",
  "Search Console ve Analytics kapalı. Google bağlantılarını şifreleyen gizli kurulum anahtarı (BETTER_AUTH_SECRET) eksik ya da çok kısa. Uygulama bu anahtarı kendisi üretir; elle kısa bir değer girdiyseniz silin.":
    "Search Console und Analytics sind deaktiviert. Der geheime Installationsschlüssel (BETTER_AUTH_SECRET), der Google-Verbindungen verschlüsselt, fehlt oder ist zu kurz. Die App erzeugt ihn selbst. Wenn Sie manuell einen kurzen Wert eingetragen haben, entfernen Sie ihn.",
  "GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET'ten yalnızca biri tanımlı. İkisi de gerekir. Ya da ikisini de boş bırakıp Google erişim anahtarını Ayarlar'dan girin.":
    "Nur GOOGLE_CLIENT_ID oder GOOGLE_CLIENT_SECRET ist festgelegt. Beide Werte sind erforderlich. Lassen Sie alternativ beide leer und geben Sie den Google-Zugriffsschlüssel in den Einstellungen ein.",
  "Google erişim anahtarı ya da hizmet hesabı henüz girilmedi. Girmeden Search Console ve Analytics bağlanamaz.":
    "Es wurde noch kein Google-Zugriffsschlüssel und kein Dienstkonto eingetragen. Ohne eines davon können Search Console und Analytics nicht verbunden werden.",
  "Google erişim anahtarı ortam değişkenlerinden geliyor.":
    "Der Google-Zugriffsschlüssel stammt aus Umgebungsvariablen.",

  "Google erişimi hazır.": "Google-Zugriff ist bereit.",
  "PageSpeed anahtarı kontrol edilemedi. {logs}":
    "PageSpeed-Schlüssel konnte nicht geprüft werden. {logs}",
  "Anahtar yok. Hız ölçümü Google'ın anahtarsız kotasıyla çalışır ve çoğu zaman 429 ile yarım kalır. Tarama ve diğer SEO kontrolleri etkilenmez.":
    "Kein Schlüssel vorhanden. Geschwindigkeitsmessungen verwenden Googles Limit ohne Schlüssel und brechen oft mit Fehler 429 ab. Crawling und andere SEO-Prüfungen sind davon nicht betroffen.",
  "PageSpeed anahtarı ortam değişkeninden geliyor.":
    "Der PageSpeed-Schlüssel stammt aus einer Umgebungsvariablen.",
  "Giriş koruması ayarlı.": "Anmeldeschutz ist eingerichtet.",
  "Bu kurulum parolasız ama dışarıdan erişime açık görünüyor; açan herkes yönetici olur. Önüne kendi giriş korumanızı koyun ya da uygulamayı yalnızca bu bilgisayara (127.0.0.1) açık tutun.":
    "Diese Installation hat kein Passwort und scheint von außen erreichbar zu sein; jeder, der sie öffnet, wäre Administrator. Richten Sie einen eigenen Anmeldeschutz davor ein oder beschränken Sie den Zugriff auf diesen Computer (127.0.0.1).",
  "Giriş ayarı eksik ya da geçersiz. Görev çubuğu menüsünden Kurulumu onar deyin; düzelmezse Sorunu bildir.":
    "Die Anmeldeeinstellung fehlt oder ist ungültig. Wählen Sie im Infobereichsmenü Kurulumu onar (Installation reparieren). Falls das nicht hilft, wählen Sie Sorunu bildir (Problem melden).",
  "Giriş ayarı eksik ya da geçersiz. AUTH_MODE, TEAM_DOMAIN ve POLICY_AUD değerlerini docs/ENVIRONMENT.md'ye göre kontrol edin.":
    "Die Anmeldeeinstellung fehlt oder ist ungültig. Prüfen Sie AUTH_MODE, TEAM_DOMAIN und POLICY_AUD anhand von docs/ENVIRONMENT.md.",
  "Yerel veritabanı yanıt veriyor.": "Die lokale Datenbank antwortet.",
  "Veritabanı yanıt vermiyor. {logs}": "Die Datenbank antwortet nicht. {logs}",
  "Çalışma ortamı hazır.": "Laufzeitumgebung ist bereit.",
  "Çalışma ortamında bir sorun var. {logs}":
    "Es gibt ein Problem mit der Laufzeitumgebung. {logs}",
  "Giriş ve erişim": "Anmeldung und Zugriff",
  "Google girişi": "Google-Anmeldung",
  "Ayarları aç": "Einstellungen öffnen",
  "Çalışma ortamı": "Laufzeitumgebung",
  Veritabanı: "Datenbank",
  "Sorun yok": "Alles in Ordnung",
  Dikkat: "Achtung",
  "Kurulum durumu okunamadı": "Installationsstatus konnte nicht gelesen werden",
  "Sürümünüz v{version}.": "Ihre Version: v{version}.",
  "Yeni sürüm {version} çıktı": "Version {version} ist erschienen",
  "Sürümünüz v{version}. Güncelleme kontrolü başarısız oldu; son bilinen sürüm {latest}.":
    "Ihre Version: v{version}. Die Updateprüfung ist fehlgeschlagen; die letzte bekannte Version ist {latest}.",
  "Sürümünüz v{version}, güncel.": "Ihre Version: v{version}; sie ist aktuell.",
  "Sürümünüz v{version}. Güncelleme kontrolü kapalı.":
    "Ihre Version: v{version}. Die Updateprüfung ist deaktiviert.",
  "Kurulumunuzun durumu": "Status Ihrer Installation",

  "Son kontrol: {date}": "Zuletzt geprüft: {date}",
  "Özet kopyalandı. İçinde gizli değer yok.":
    "Zusammenfassung kopiert. Sie enthält keine Geheimnisse.",
  "Henüz proje yok. {link}.": "Noch keine Projekte. {link}.",
  "Proje ekleyin": "Projekt hinzufügen",
  "Search Console {gsc} · Analytics {ga4}":
    "Search Console {gsc} · Analytics {ga4}",
  bağlı: "verbunden",
  "bağlı değil": "nicht verbunden",
  "Bağlantıları aç": "Verbindungen öffnen",

  "Sık sorunlar": "Häufige Probleme",
  "Sayfa açılmıyor ya da uygulama kapalı":
    "Die Seite öffnet sich nicht oder die App läuft nicht",
  "Görev çubuğundaki seowatcher simgesine bakın; üzerine gelince {running} yazmalı. Simge yoksa Başlat menüsünden seowatcher'ı açın. Simgede {error} yazıyorsa sağ tıklayıp {restart}, olmazsa {repair} deyin.":
    "Prüfen Sie das seowatcher-Symbol im Infobereich. Beim Darüberfahren sollte {running} angezeigt werden. Falls das Symbol fehlt, starten Sie seowatcher über das Startmenü. Wenn das Symbol {error} zeigt, klicken Sie mit der rechten Maustaste darauf und wählen Sie {restart}; falls das nicht hilft, {repair}.",
  "Hâlâ açılmıyorsa {logs} ile {launcher} ve {server} dosyalarının son satırlarına bakın; {report} bunları hazır bir kayda koyar.":
    "Falls sich die App weiterhin nicht öffnet, prüfen Sie mit {logs} die letzten Zeilen der Dateien {launcher} und {server}. Mit {report} werden diese Informationen für eine Meldung zusammengestellt.",
  "Windows kurulum kılavuzu": "Windows-Installationsanleitung",
  "Sayfa açılmıyor ya da Docker kapalı":
    "Die Seite öffnet sich nicht oder Docker läuft nicht",
  "Önce Docker Desktop'ın çalıştığına bakın; Windows'ta tepsideki simge \"running\" demeli. Sonra durumu görün: {command} Durum {healthy} olana kadar bekleyin; ilk açılış birkaç dakika sürebilir.":
    "Prüfen Sie zuerst, ob Docker Desktop läuft. Unter Windows sollte das Symbol im Infobereich „running“ anzeigen. Prüfen Sie dann den Status: {command} Warten Sie, bis der Status {healthy} lautet; der erste Start kann einige Minuten dauern.",
  "Hâlâ açılmıyorsa son günlük satırları nedeni yazar: {command}":
    "Falls sich die App weiterhin nicht öffnet, finden Sie die Ursache in den letzten Protokollzeilen: {command}",
  "Docker kurulum belgesi": "Docker-Installationsanleitung",
  "Adres numarası (port) dolu": "Der Port ist belegt",
  "Adres numarası (port) dolu (Bind for 127.0.0.1:3001 failed)":
    "Der Port ist belegt (Bindung an 127.0.0.1:3001 fehlgeschlagen)",
  "Windows paketi 3001 doluysa o açılış için 3002 ile 3010 arasında boş bir numara kullanır; bunu bir bildirimle ve simgenin yazısında söyler. Numarayı kalıcı yapmak istiyorsanız {dataFolder} deyip {config} içindeki {port} değerini değiştirin, sonra {restart} deyin.":
    "Wenn Port 3001 belegt ist, verwendet das Windows-Paket für diesen Start einen freien Port zwischen 3002 und 3010. Die App zeigt dies in einer Benachrichtigung und im Infobereichssymbol an. Um den Port dauerhaft festzulegen, öffnen Sie {dataFolder}, ändern Sie den Wert {port} in {config} und wählen Sie anschließend {restart}.",
  "3001 numaralı adresi (port) başka bir program kullanıyor. Proje klasöründe {line} satırı olan bir {env} dosyası oluşturup konteyneri yeniden oluşturun: {command}":
    "Port 3001 wird von einem anderen Programm verwendet. Erstellen Sie im Projektordner eine Datei {env} mit der Zeile {line} und erstellen Sie den Container neu: {command}",
  "Adres numarası (port) değişince Google'a verdiğiniz yönlendirme adresleri de değişir. Yenilerini {link} kopyalayıp Google Cloud Console'da güncelleyin.":
    "Wenn sich der Port ändert, ändern sich auch die bei Google hinterlegten Weiterleitungs-URIs. Kopieren Sie die neuen URIs unter {link} und aktualisieren Sie sie in der Google Cloud Console.",
  "Ayarlar'daki Google bölümünden": "im Google-Bereich der Einstellungen",
  "Ajanım bağlanamıyor (401)":
    "Mein Agent kann keine Verbindung herstellen (401)",
  "Ajan bağlantısı bir parola (token) ister. Windows paketinde bu parola {path} dosyasındadır ({dataFolder}). Panoya kopyalamak için PowerShell (değer ekrana yazılmaz): {command} Değeri sohbete yazmayın; yapıştırdıktan sonra panoyu temizleyin (Win+V, Tümünü temizle).":
    "Die Agent-Verbindung benötigt ein Passwort (Token). Im Windows-Paket befindet es sich in der Datei {path} ({dataFolder}). So kopieren Sie es mit PowerShell in die Zwischenablage, ohne es auf dem Bildschirm anzuzeigen: {command} Geben Sie den Wert nicht in einen Chat ein und leeren Sie die Zwischenablage nach dem Einfügen (Win+V, Alles löschen).",
  "Ajan bağlantısı varsayılan olarak bir parola ister. Parola ilk açılışta üretilir ve veri biriminde durur; okumak için (PowerShell ve cmd): {command}":
    "Die Agent-Verbindung ist standardmäßig durch ein Passwort geschützt. Es wird beim ersten Start erstellt und im Daten-Volume gespeichert. So lesen Sie es aus (PowerShell und cmd): {command}",
  "Git Bash (Windows): {command} Önek olmadan Git Bash yolu bozar ve parola boş çıkar; PowerShell'de önek hata verir.":
    "Git Bash (Windows): {command} Ohne Präfix beschädigt Git Bash den Pfad und das Passwort bleibt leer; in PowerShell führt das Präfix zu einem Fehler.",
  "Adres: {command} Aracınız {header} başlığını göndermezse bağlantı 401 döner.":
    "Adresse: {command} Wenn Ihr Tool den Header {header} nicht sendet, antwortet die Verbindung mit 401.",
  "{link} aracınız için hazır komutu verir. {details}":
    "Unter {link} finden Sie einen fertigen Befehl für Ihr Tool. {details}",
  "Ajan kurulumu sayfası": "Seite zur Agent-Einrichtung",
  "Hız ölçümü yarım kalıyor (429)": "Geschwindigkeitsmessung bricht ab (429)",
  "{code} genellikle anahtar girilmediğini gösterir: Google'ın anahtarsız kotası birkaç sayfada dolar. Ücretsiz bir anahtar girin: {link}.":
    "{code} bedeutet meist, dass kein Schlüssel eingetragen wurde: Googles Limit ohne Schlüssel ist nach wenigen Seiten erreicht. Geben Sie einen kostenlosen Schlüssel ein: {link}.",
  '429 / "çok fazla istek"': "429 / „zu viele Anfragen“",
  "Ayarlar, Hız ölçümü": "Einstellungen, Geschwindigkeitstests",
  "Anahtar varken de olabilir: dakikalık sınır aşılırsa denetim bekleyip yeniden dener. {daily} dolarsa ölçülenler korunur ve ölçüm durur; ertesi gün yeniden denetleyin. Kendi kotanızı Google Cloud Console'da APIs & Services, PageSpeed Insights API, Quotas altında görebilirsiniz.":
    "Das kann auch mit Schlüssel passieren: Wird das Minutenlimit überschritten, wartet das Audit und versucht es erneut. Ist {daily} ausgeschöpft, bleiben die bisherigen Messungen erhalten und weitere Messungen stoppen; führen Sie das Audit am nächsten Tag erneut aus. Ihr Kontingent finden Sie in der Google Cloud Console unter APIs & Services, PageSpeed Insights API, Quotas.",
  "Günlük sınır": "Tageslimit",
  "PageSpeed anahtarı belgesi": "Anleitung zum PageSpeed-Schlüssel",
  "Sorgu verisi yok, grafikler boş": "Keine Suchanfragedaten, Diagramme leer",
  "Önce projede Search Console'un bağlı olduğunu ve bir mülk seçildiğini doğrulayın. Hizmet hesabı kullanıyorsanız hesabın e-postasını Search Console'da mülke kullanıcı olarak eklemiş olmanız gerekir; eklemeden veri gelmez.":
    "Prüfen Sie zuerst, ob Search Console im Projekt verbunden und eine Property ausgewählt ist. Wenn Sie ein Dienstkonto verwenden, muss dessen E-Mail-Adresse in Search Console als Nutzer der Property hinzugefügt sein. Vorher werden keine Daten geladen.",
  "Mülk yeni doğrulandıysa Google'ın veri vermesi birkaç gün sürebilir.":
    "Wenn die Property erst kürzlich bestätigt wurde, kann es einige Tage dauern, bis Google Daten bereitstellt.",
  "Projenin bağlantılarını aç": "Projektverbindungen öffnen",
  "Projelere git": "Zu Projekten",
  "Search Console belgesi": "Search-Console-Anleitung",
  "seowatcher-tanilama-{date}.zip": "seowatcher-diagnose-{date}.zip",
  "Tanılama paketi indirildi": "Diagnosepaket heruntergeladen",
  "Paket oluşturulamadı": "Paket konnte nicht erstellt werden",
  "seowatcher tanılama paketi\nOluşturulma: {generatedAt}\n\nİçindekiler\n  summary.txt        Tek sayfalık özet.\n  diagnostics.json   Sürüm, kurulum kontrolleri, tablo satır sayıları,\n                     projeler, bağlı Google mülkleri ve son 25 denetim.\n  client-log.json    Bu sekmede yakalanan tarayıcı hataları.\n  browser.json       Tarayıcı ve ekran bilgisi.\n\nİçinde OLMAYAN şeyler\n  Gizli değer yok: Google erişim ve yenileme anahtarları, Google erişim\n  anahtarının gizli kısmı, PageSpeed API anahtarı, ajan parolası (MCP token)\n  ve oturum çerezleri toplanmaz. Yalnızca her birinin ayarlı olup olmadığı yazar.\n  Taranan sayfaların içeriği de yok, yalnızca sayıları var.\n\nİçinde OLAN, sizi tanımlayan şeyler\n  Proje adlarınız, alan adlarınız, bağlı Search Console mülkünüz ve GA4\n  mülk kimliğiniz. Bunlar olmadan bir sorun teşhis edilemez. Göndermeden\n  önce dosyaları açıp okuyun; karar sizin.\n":
    "seowatcher-Diagnosepaket\nErstellt: {generatedAt}\n\nInhalt\n  summary.txt        Einseitige Zusammenfassung.\n  diagnostics.json   Version, Installationsprüfungen, Tabellenzeilen,\n                     Projekte, verbundene Google-Properties und letzte 25 Audits.\n  client-log.json    Browserfehler, die in diesem Tab erfasst wurden.\n  browser.json       Browser- und Bildschirminformationen.\n\nWas NICHT enthalten ist\n  Keine Geheimnisse: Google-Zugriffs- und Aktualisierungstokens, der geheime\n  Teil des Google-Zugriffsschlüssels, der PageSpeed-API-Schlüssel, das Agentenpasswort\n  (MCP-Token) und Sitzungscookies werden nicht erfasst. Es wird nur vermerkt, ob\n  diese Werte festgelegt sind. Auch Inhalte gecrawlter Seiten fehlen; enthalten sind nur Zähler.\n\nWas enthalten ist und Sie identifizieren kann\n  Ihre Projektnamen, Domains, verbundene Search-Console-Property und GA4-Property-ID.\n  Ohne diese Angaben lässt sich ein Problem nicht diagnostizieren. Öffnen und lesen\n  Sie die Dateien vor dem Senden; Sie entscheiden.\n",
  "{pages} sayfa  {issues} bulgu": "{pages} Seiten  {issues} Probleme",
  "Oluşturulma: {date}": "Erstellt: {date}",
  "Kurulum kontrolleri": "Installationsprüfungen",
  "hepsi ok": "alles in Ordnung",
  Tablolar: "Tabellen",
  "Projeler: {n}": "Projekte: {n}",
  "Search Console bağlantısı: {n}": "Search-Console-Verbindungen: {n}",
  "Analytics bağlantısı: {n}": "Analytics-Verbindungen: {n}",
  "Son denetimler": "Letzte Audits",
  "Tarayıcıda yakalanan hata: {n}": "Im Browser erfasste Fehler: {n}",
  "Hızlı işlemler": "Schnellaktionen",
  "Durumu yeniden kontrol et": "Status erneut prüfen",
  "(yeni sekmede açılır)": "(wird in einem neuen Tab geöffnet)",
  "Becerileri /seo-audit diye çağırırsınız.":
    "Rufen Sie Skills mit /seo-audit auf.",
  "Komut, Codex'in kendi bağlama adımlarını kullanır. Becerileri $seo-audit diye çağırırsınız.":
    "Der Befehl verwendet Codex' eigene Verbindungsschritte. Rufen Sie Skills mit $seo-audit auf.",
  "Genel komut. Beceriyi aracınızın kendi yöntemiyle çağırın.":
    "Allgemeiner Befehl. Rufen Sie den Skill mit der Methode Ihres Tools auf.",
  "Uygulama kurulu, Google ve PageSpeed hazırsa yalnızca bu adım yeter.":
    "Wenn die App installiert sowie Google und PageSpeed eingerichtet sind, genügt dieser Schritt.",
  "Komutu ajanınıza yapıştırın. Ajan seowatcher'ı bağlar, SEO becerilerini kurar, elle yapacağınız adımlarda size yol gösterir.":
    "Fügen Sie den Befehl in Ihren Agenten ein. Er verbindet seowatcher, installiert die SEO-Skills und führt Sie durch die Schritte, die Sie selbst erledigen müssen.",
  "Hangi ajanı kullanıyorsunuz?": "Welchen Agenten verwenden Sie?",
  "Ajan bağlantıyı kurar, becerileri kopyalar ve doğrular. Parolayı sohbete yazmaz, bilgisayarınızdan okur.":
    "Der Agent richtet die Verbindung ein, kopiert die Skills und prüft sie. Das Passwort liest er von Ihrem Computer, statt es in den Chat zu schreiben.",
  "Kurulum komutunu kopyala": "Einrichtungsbefehl kopieren",
  "Kurulum komutu kopyalandı": "Einrichtungsbefehl kopiert",
  "Bağlandıktan sonra ajanınızdan {skill} becerisini kullanmasını isteyin; sıradaki adımı birlikte seçersiniz.":
    "Bitten Sie Ihren Agenten nach dem Verbinden, den Skill {skill} zu verwenden. Den nächsten Schritt wählen Sie gemeinsam.",
  "Ajanınız seowatcher'a ilk kez istek attığında yukarıdaki durum değişir.":
    "Der Status oben ändert sich, sobald Ihr Agent zum ersten Mal eine Anfrage an seowatcher sendet.",
  "Claude Code, Codex, Cursor, ChatGPT ve MCP destekleyen diğer uygulamalarla çalışır.":
    "Funktioniert mit Claude Code, Codex, Cursor, ChatGPT und anderen MCP-fähigen Anwendungen.",
  "İlk kez mi kuruyorsunuz? Buradan başlayın.":
    "Richten Sie es zum ersten Mal ein? Beginnen Sie hier.",
  "Sıfırdan kurulum": "Neueinrichtung",
  "Uygulamayı yeni kurduysanız ilk adım bu.":
    "Wenn Sie die App gerade installiert haben, beginnen Sie mit diesem Schritt.",
  "Yeni bir kurulum ya da baştan kontrol için.":
    "Für eine neue Installation oder eine vollständige Prüfung von Anfang an.",
  "Ajanınız kurulumu, Google bağlantısını, PageSpeed anahtarını ve ilk projenizi sırayla kontrol eder, sonra kendini bağlar. Windows paketini de Docker'ı da tanır. Google Cloud'daki adımları siz yaparsınız. Anahtarlar sohbete değil, yalnızca Ayarlar'a girilir.":
    "Ihr Agent prüft nacheinander die Installation, die Google-Verbindung, den PageSpeed-Schlüssel und Ihr erstes Projekt und verbindet sich anschließend selbst. Er kennt sowohl das Windows-Paket als auch Docker. Die Schritte in Google Cloud führen Sie selbst aus. Schlüssel werden nur in den Einstellungen eingegeben, niemals im Chat.",
  "Sıfırdan kurulum komutunu kopyala": "Befehl für Neueinrichtung kopieren",
  Yeterli: "Ausreichend",
  Azalıyor: "Wird knapp",
  "Neredeyse doldu": "Fast aufgebraucht",
  "{count} sorgu": {
    one: "{count} Suchanfrage",
    other: "{count} Suchanfragen",
  },
  "{count} ölçüm": {
    one: "{count} Messung",
    other: "{count} Messungen",
  },
  "{count} puan": {
    one: "{count} Punkt",
    other: "{count} Punkte",
  },
  "{count} rapor": {
    one: "{count} Bericht",
    other: "{count} Berichte",
  },
  "Kalan: {amount}": "Verbleibend: {amount}",
  "Veri yok": "Keine Daten",
  "Sınır: {amount}": "Limit: {amount}",
  "{amount} kaldı": "Noch {amount}",
  "Durum: {state}": "Status: {state}",
  "Son güncelleme: {date}": "Zuletzt aktualisiert: {date}",
  "Henüz veri yok": "Noch keine Daten",
  "Sabit sınır": "Festes Limit",
  "Kaynak: {source}. {freshness}": "Quelle: {source}. {freshness}",
  "Kota ve sınırlar": "Kontingente und Limits",
  "Kota bilgisi yüklenemedi":
    "Kontingentinformationen konnten nicht geladen werden",
  "Gösterilecek sınır yok": "Keine Limits anzuzeigen",
  "Bu bölümde izlenen bir kota yok.":
    "In diesem Bereich wird kein Kontingent überwacht.",
  "Google ve sistem sınırları": "Google- und Systemlimits",
  "Search Console, GA4 ve PageSpeed'in günlük sınırları, bir de denetim ve rapor üst sınırları. Rakamlar uygulamanın kendi kaydından gelir, Google'a ek istek gitmez. Sınırlar proje başına gösterilir.":
    "Die Tageslimits von Search Console, GA4 und PageSpeed sowie die Höchstzahlen für Audits und Berichte. Die Werte stammen aus den eigenen Aufzeichnungen der App; es werden keine zusätzlichen Anfragen an Google gesendet. Limits werden pro Projekt angezeigt.",
  "Projeler okunamadı": "Projekte konnten nicht gelesen werden",
  "Henüz bir proje yok": "Noch keine Projekte",
  "Sınırlar proje başına gösterilir. Proje listesi yüklenince burada görünür.":
    "Limits werden pro Projekt angezeigt. Sie erscheinen hier, sobald die Projektliste geladen ist.",
  "Sınırlar proje başına gösterilir. Bir proje oluşturunca burada görünür.":
    "Limits werden pro Projekt angezeigt. Sie erscheinen hier, sobald Sie ein Projekt erstellen.",
  "Sınırları göster": "Limits anzeigen",
  "Bu ekranın kılavuzunu aç": "Anleitung für diesen Bildschirm öffnen",
  Yükleniyor: "Wird geladen",
  "Geçen süre: {duration}": "Verstrichen: {duration}",
  "Rapor hazır": "Bericht ist fertig",
  "Google'dan yanıt bekleniyor…": "Warten auf Antwort von Google …",
  "Bildirimler ({count} okunmamış)": "Benachrichtigungen ({count} ungelesen)",
  Bildirimler: "Benachrichtigungen",
  "Tümünü okundu işaretle": "Alle als gelesen markieren",
  "Henüz bildirim yok. İşlemler tamamlandığında burada görünür.":
    "Noch keine Benachrichtigungen. Abgeschlossene Vorgänge erscheinen hier.",
  Okunmamış: "Ungelesen",
  "Bildirim sesi": "Benachrichtigungston",
  "Sesi dinle": "Ton anhören",
  "Yeni sürüm yayımlandı: {version}": "Neue Version veröffentlicht: {version}",
  "Ayarlar'daki Hakkında bölümü nasıl güncelleyeceğinizi söyler.":
    "Unter Einstellungen → Info erfahren Sie, wie Sie das Update installieren.",
  "{service} bağlantısı yenilenmeli": "{service}-Verbindung erneuern",
  "Google erişim izni geçersiz ya da geri alınmış. Hesabı yeniden bağlayın.":
    "Der Google-Zugriff ist abgelaufen oder wurde widerrufen. Verbinden Sie Ihr Konto erneut.",
  "Denetim bitti: {pages} sayfa, {issues} bulgu":
    "Audit abgeschlossen: {pages} Seiten, {issues} Befunde",
  "Denetim tamamlanamadı": "Audit fehlgeschlagen",
  "Kontrol ediliyor…": "Wird geprüft …",
  "Rapor kaydedildi ancak indirilemedi. Raporlar ekranından tekrar deneyin.":
    "Der Bericht wurde gespeichert, konnte aber nicht heruntergeladen werden. Versuchen Sie es erneut auf der Berichte-Seite.",
  Denetim: "Audit",
  "{start} – {end}. Search Console verisi {count} gün geriden gelir, bu yüzden son gün bugün olmaz.":
    {
      one: "{start} – {end}. Die Search-Console-Daten liegen {count} Tag zurück, deshalb ist der letzte Tag nie heute.",
      other:
        "{start} – {end}. Die Search-Console-Daten liegen {count} Tage zurück, deshalb ist der letzte Tag nie heute.",
    },
  "TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı":
    "TEAM_DOMAIN muss eine vollständige HTTPS-Adresse sein, zum Beispiel https://ihr-team.cloudflareaccess.com",
  'TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı — "{value}" değerinin başına https:// ekleyin':
    'TEAM_DOMAIN muss eine vollständige HTTPS-Adresse sein, zum Beispiel https://ihr-team.cloudflareaccess.com — fügen Sie https:// am Anfang von "{value}" ein',
  "Site haritasında var, dizine alındı":
    "In der Sitemap eingereicht und indexiert",
  "Dizine alındı, site haritasında yok":
    "Indexiert, nicht in der Sitemap eingereicht",
  "Dizine alındı, site haritasına eklemeyi düşünün":
    "Indexiert; fügen Sie die Seite gegebenenfalls einer Sitemap hinzu",
  "Tarandı, şu an dizine alınmadı": "Gecrawlt – zurzeit nicht indexiert",
  "Keşfedildi, henüz taranmadı": "Gefunden – zurzeit nicht indexiert",
  "Yinelenen içerik, canonical belirtilmemiş":
    "Duplikat ohne ausgewählte Canonical-URL",
  "Yinelenen içerik, Google başka bir canonical seçti":
    "Duplikat; Google hat eine andere Canonical-URL gewählt",
  "Yinelenen içerik, gönderilen adres canonical seçilmedi":
    "Duplikat; die eingereichte URL wurde nicht als Canonical ausgewählt",
  "Alternatif sayfa, canonical doğru":
    "Alternative Seite mit korrektem Canonical-Tag",
  "'noindex' etiketiyle dışlandı": "Durch das noindex-Tag ausgeschlossen",
  "401 nedeniyle engellendi":
    "Wegen nicht autorisierter Anfrage blockiert (401)",
  "403 nedeniyle engellendi":
    "Wegen fehlender Zugriffsberechtigung blockiert (403)",
  "Bulunamadı (404)": "Nicht gefunden (404)",
  "Yumuşak 404": "Soft-404",
  "Yönlendirme yapan sayfa": "Seite mit Weiterleitung",
  "Google bu adresi bilmiyor": "Google ist diese URL nicht bekannt",
  "Giriş sayfaları": "Landingpages",
  "Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm.":
    "Seiten, auf denen Besuche beginnen: Sitzungen, Interaktionen und Conversions.",
  "Sayfa performansı": "Seiten und Bildschirme",
  "Görüntülenme ve sayfada geçirilen süre.":
    "Aufrufe und Verweildauer auf der Seite.",
  "Trafik kaynakları": "Traffic-Akquisition",
  "Ziyaretçiler nereden geliyor.": "Woher Ihre Besucher kommen.",
  "Anahtar olaylar": "Schlüsselereignisse",
  "Dönüşüm saydığınız olaylar ve kaç kişi tetikledi.":
    "Die Ereignisse, die als Conversions zählen, und wie oft sie ausgelöst wurden.",
  "E-ticaret": "E-Commerce",
  "Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.":
    "Produkte und Umsatz; Daten erscheinen, wenn die Property E-Commerce erfasst.",
  "Site içi arama": "Interne Suche",
  "Ziyaretçilerin sitenizde ne aradığı.":
    "Wonach Besucher auf Ihrer Website suchen.",
  "Kitle dağılımı": "Zielgruppe",
  "Cihaz, ülke, yeni ve geri dönen ziyaretçi.":
    "Geräte, Länder sowie neue und wiederkehrende Besucher.",
  "Ana makine adı": "Hostname",
  "Giriş sayfası": "Landingpage",
  Olay: "Ereignisname",
  Kanal: "Kanal",
  Kaynak: "Quelle",
  Ortam: "Medium",
  "Kaynak / ortam": "Quelle / Medium",
  Kampanya: "Kampagne",
  "Yeni / geri dönen": "Neu / wiederkehrend",
  Ürün: "Artikel",
  "Ürün kodu": "Artikel-ID",
  "Arama terimi": "Suchbegriff",
  Kullanıcı: "Nutzer",
  "Etkileşimli oturum": "Sitzungen mit Interaktionen",
  "Olay oranı": "Schlüsselereignisrate",
  "Satın alma işlemleri": "Transaktionen",
  Gelir: "Umsatz",
  Görüntülenme: "Aufrufe",
  "Etkileşim süresi": "Interaktionsdauer",
  "Ürün görüntüleme": "Angesehene Artikel",
  "Sepete eklenen ürün": "In den Warenkorb gelegte Artikel",
  "Arama sayısı": "Suchvorgänge",
  "Başarısız denetimler, hangi aşamada durduğunu ve URL/kimlik bilgileri ayıklanmış hata açıklamasını içerir. PageSpeed ölçüm hataları URL'ler çıkarılarak özetlenir.":
    "Fehlgeschlagene Audits zeigen die Phase und eine bereinigte Fehlermeldung. PageSpeed-Messfehler werden ohne Seiten-URLs zusammengefasst.",
  "PageSpeed ölçüm hatası ({count}): {message}":
    "PageSpeed-Messfehler ({count}): {message}",
  İndirildi: "Heruntergeladen",
  "{count} sayfa soruluyor": "Google wird zu {count} Seiten befragt",
  "{pages} sayfa tarandı, {issues} bulgu":
    "{pages} Seiten gecrawlt, {issues} Befunde",
  "Bu dönemde hiç oturum kaydedilmedi.":
    "In diesem Zeitraum wurden keine Sitzungen erfasst.",
  "Başlık veya özet": "Titel oder Zusammenfassung",
  "Tarama bittikten sonra çalışır.": "Läuft nach Abschluss des Crawls.",
} as const;
