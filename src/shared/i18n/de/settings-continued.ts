import type { Catalog } from "@/shared/i18n";

/** Additional German settings and support labels. */
export const deSettingsContinued: Catalog = {
  "Veritabanı yanıt vermiyor. {logs}": "Die Datenbank antwortet nicht. {logs}",
  "Çalışma ortamı hazır.": "Laufzeitumgebung ist bereit.",
  "Çalışma ortamında bir sorun var. {logs}":
    "Es gibt ein Problem mit der Laufzeitumgebung. {logs}",
  "Giriş ve erişim": "Anmeldung und Zugriff",
  "Google girişi": "Google-Anmeldung",
  "Ayarları aç": "Einstellungen öffnen",
  "PageSpeed anahtarı": "PageSpeed-Schlüssel",
  "Anahtar gir": "Schlüssel eingeben",
  "Çalışma ortamı": "Laufzeitumgebung",
  Veritabanı: "Datenbank",
  "Sorun yok": "Alles in Ordnung",
  Dikkat: "Achtung",
  Hata: "Fehler",
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
  "Özeti kopyala": "Zusammenfassung kopieren",
  "Özet kopyalandı. İçinde gizli değer yok.":
    "Zusammenfassung kopiert. Sie enthält keine Geheimnisse.",
  Projeler: "Projekte",
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
  Ayrıntılar: "Details",
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
  "Tanılama paketi indir": "Diagnosepaket herunterladen",
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
  yok: "keine",
  "Tarayıcıda yakalanan hata: {n}": "Im Browser erfasste Fehler: {n}",
  "Hızlı işlemler": "Schnellaktionen",
  "Durumu yeniden kontrol et": "Status erneut prüfen",
  "Kılavuzu aç": "Anleitung öffnen",
  "(yeni sekmede açılır)": "(wird in einem neuen Tab geöffnet)",
  "Ajan kurulumu": "Agent-Einrichtung",
  "Becerileri /seo-audit diye çağırırsınız.":
    "Rufen Sie Skills mit /seo-audit auf.",
  "Komut, Codex'in kendi bağlama adımlarını kullanır. Becerileri $seo-audit diye çağırırsınız.":
    "Der Befehl verwendet Codex' eigene Verbindungsschritte. Rufen Sie Skills mit $seo-audit auf.",
  Diğer: "Andere",
  "Genel komut. Beceriyi aracınızın kendi yöntemiyle çağırın.":
    "Allgemeiner Befehl. Rufen Sie den Skill mit der Methode Ihres Tools auf.",
  "Ajanınızı bağlayın": "Agent verbinden",
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
  Bilinmiyor: "Unbekannt",
  "{count} sorgu": {
    one: "{count} Suchanfrage",
    other: "{count} Suchanfragen",
  },
  "{count} ölçüm": { one: "{count} Messung", other: "{count} Messungen" },
  "{count} puan": { one: "{count} Punkt", other: "{count} Punkte" },
  "{count} sayfa": { one: "{count} Seite", other: "{count} Seiten" },
  "{count} rapor": { one: "{count} Bericht", other: "{count} Berichte" },
  "{count} şablon": { one: "{count} Vorlage", other: "{count} Vorlagen" },
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
  "Güncel durum": "Aktueller Status",
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
  "İlgili ayarlar": "Verwandte Einstellungen",
  Kaynaklar: "Ressourcen",
  "{count} okunmamış": "{count} ungelesen",
};
