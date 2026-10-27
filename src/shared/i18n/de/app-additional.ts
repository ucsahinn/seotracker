import type { Catalog } from "@/shared/i18n";

/** Additional app-wide labels. */
export const deAppAdditional: Catalog = {
  "Arşiv seçilen dönemin sonuna ulaşmadı. Sıralamalar'dan arşivi güncelleyin.":
    "Das Archiv reicht nicht bis zum Ende des ausgewählten Zeitraums. Aktualisieren Sie es unter „Ranking-Verfolgung“.",
  "Bu tarihlerde okunan arşivde eşleşen sorgu yok. Bu, Google'da görünmediğiniz anlamına gelmez.":
    "Keine passende Suchanfrage in den für diese Daten gelesenen Archivdaten. Das bedeutet nicht, dass Sie bei Google nicht erscheinen.",
  "Sıralar, kaydedilen nihai Google yanıtlarından hesaplanan ortalamalardır; bugünkü sabit sıranız değildir.":
    "Die Positionen sind Durchschnittswerte aus gespeicherten endgültigen Google-Antworten; sie sind keine festen aktuellen Positionen.",
  "Bağlantı okunamadı; yeniden dene":
    "Verbindung konnte nicht gelesen werden; erneut versuchen",
  "Seçilen etiketlerden herhangi biri; sayılar tüm kayıtlı kelimelerdeki etiket atamalarıdır.":
    "Mindestens eines der ausgewählten Tags; die Zahlen zählen Tagzuweisungen für alle gespeicherten Suchbegriffe.",
  "En fazla {count} etiket seçin.": "Wählen Sie höchstens {count} Tags.",
  "Liste veya arşiv değişti. Listeyi yenileyip aktarımı yeniden başlatın.":
    "Die Liste oder das Archiv hat sich geändert. Aktualisieren Sie die Liste und starten Sie den Export erneut.",
  "Google kimlikleri bu kurulumdaki tüm projelerde kullanılır. Hizmet hesabı kayıtlıysa önceliklidir. Projenizin mülkünü Proje ayarları → Bağlantılar bölümünden seçin.":
    "Die Google-Anmeldedaten gelten für alle Projekte dieser Installation. Ein gespeichertes Dienstkonto hat Vorrang. Wählen Sie die Property Ihres Projekts unter „Projekteinstellungen → Verbindungen“.",
  "Kullanılan kimlik okunamadı. Google kimlik durumunu yeniden yükleyin.":
    "Die verwendeten Anmeldedaten konnten nicht gelesen werden. Laden Sie den Status der Google-Anmeldedaten neu.",
  "Kimlik kayıt tarihi: {date}": "Anmeldedaten gespeichert am: {date}",
  "Google kurulum adımları": "Schritte zur Google-Einrichtung",
  "{service} yönlendirme adresini kopyala":
    "Weiterleitungsadresse für {service} kopieren",
  "Mülk izinlerini ayarla": "Property-Berechtigungen festlegen",
  "JSON dosyası çok büyük. Google Cloud'dan indirdiğiniz hizmet hesabı anahtarını seçin.":
    "Die JSON-Datei ist zu groß. Wählen Sie den Dienstkontoschlüssel, den Sie von Google Cloud heruntergeladen haben.",
  "Dosya okunamadı. Dosyayı yeniden seçin.":
    "Die Datei konnte nicht gelesen werden. Wählen Sie sie erneut aus.",
  "JSON içeriğini gizli yapıştır": "JSON-Inhalt verdeckt einfügen",
  "Hizmet hesabı kurulum adımları": "Schritte zur Dienstkonto-Einrichtung",
  "Yukarıdaki Google erişim anahtarı yerine bunu kullanabilirsiniz. Hizmet hesabında izin ekranı, test kullanıcısı ve yönlendirme adresi adımları yok. Google Cloud'da hesabı açıp JSON dosyasını indirin ve burada seçin, sonra hesabın e-posta adresini Search Console'da mülkünüze, bir meslektaşınızı eklermiş gibi kullanıcı olarak ekleyin.":
    "Sie können dies anstelle des obigen Google-Zugangsschlüssels verwenden. Ein Dienstkonto benötigt weder Zustimmungsbildschirm noch Testnutzer oder Weiterleitungsadresse. Erstellen Sie das Konto in Google Cloud, laden Sie die JSON-Datei herunter und wählen Sie sie hier aus. Fügen Sie dann die E-Mail-Adresse des Kontos in Search Console als Nutzer Ihrer Property hinzu, so wie einen Kollegen.",
  "Anahtarsız ölçüm sınırlıdır; bu uygulama denetim başına en fazla {count} sayfayı dener. Google daha önce sınır koyabilir. Anahtar başarı garantisi vermez.":
    "Messungen ohne Schlüssel sind begrenzt; diese Anwendung versucht höchstens {count} Seiten pro Audit. Google kann früher eingreifen. Ein Schlüssel garantiert keinen Erfolg.",
  "Anahtar bu kurulumdan silinir; hız ölçümü denetim başına uygulamanın anahtarsız sayfa sınırına döner. Google daha erken sınır koyabilir. İstediğiniz zaman yeniden girebilirsiniz.":
    "Der Schlüssel wird aus dieser Installation gelöscht; Geschwindigkeitsmessungen unterliegen dann wieder dem Seitenlimit der Anwendung ohne Schlüssel pro Audit. Google kann früher eingreifen. Sie können den Schlüssel jederzeit erneut eingeben.",
  "example.com için 1 mobil istek; denetim ölçüm sayacına eklenmez.":
    "1 mobile Anfrage für example.com; zählt nicht zum Messzähler des Audits.",
  "Test tarihi: {date}": "Testdatum: {date}",
  "Diğer ayar bölümleri için yana kaydırın.":
    "Für weitere Einstellungsbereiche seitlich scrollen.",
  "Dili uygula": "Sprache anwenden",
  "Arayüz dili bu tarayıcıda saklanır; projenin varsayılan pazar dilini değiştirmez.":
    "Die Oberflächensprache wird in diesem Browser gespeichert; die Standardsprache des Projektmarkts bleibt unverändert.",
  "GitHub istek sınırı veya erişim kısıtı bildirdi. Bir süre bekleyip tekrar deneyin; Yardım tanılamasını kontrol edin.":
    "GitHub hat ein Anfrage- oder Zugriffslimit gemeldet. Warten Sie etwas und versuchen Sie es erneut; prüfen Sie die Diagnose unter „Hilfe“.",
  "GitHub sürüm bilgisi okunamadı. Biraz bekleyip yeniden deneyin; sürerse Yardım ekranından tanılama alın.":
    "Die GitHub-Versionsinformationen konnten nicht gelesen werden. Warten Sie etwas und versuchen Sie es erneut; bleibt das Problem bestehen, führen Sie unter „Hilfe“ eine Diagnose durch.",
  "Uygulama içi sürüm kontrolü kapalı. Windows tepsisi bağımsız olarak günlük sürüm kontrolü yapabilir.":
    "Die Versionsprüfung in der Anwendung ist deaktiviert. Das Windows-Taskleistensymbol kann unabhängig davon täglich nach Versionen suchen.",
  "Sürüm kontrolü ayarı okunamadı. Son kayıt güncel olmayabilir.":
    "Die Einstellung zur Versionsprüfung konnte nicht gelesen werden. Der letzte Stand ist möglicherweise nicht aktuell.",
  "Son başarılı sürüm kontrolü: {date}":
    "Letzte erfolgreiche Versionsprüfung: {date}",
  "Windows otomatik kurulum ayarları":
    "Einstellungen zur automatischen Installation unter Windows",
  "Uygulama içi sürüm kontrolü": "Versionsprüfung in der Anwendung",
  "Açıkken uygulama içi kontrol en çok altı saatte bir GitHub sürüm listesine bakar. Bu tercih Windows tepsisinin günlük kontrolünü ve otomatik kurulum tercihini değiştirmez.":
    "Wenn aktiviert, prüft die Anwendung höchstens alle sechs Stunden die GitHub-Versionsliste. Diese Einstellung verändert weder die tägliche Prüfung über das Windows-Taskleistensymbol noch die Einstellung zur automatischen Installation.",
  "Bu pakette sürüm notu bulunmuyor.":
    "Dieses Paket enthält keine Versionshinweise.",
  "Notlar uygulama paketiyle birlikte gelir. Yayınlanan notları kılavuzdan kontrol edebilirsiniz; bu durum kurulum kontrolü değildir.":
    "Die Hinweise werden mit dem Anwendungspaket geliefert. Veröffentlichte Hinweise finden Sie im Handbuch; dies ist keine Installationsprüfung.",
  "Bu kurulu sürüm için sürüm notu bulunmuyor. Aşağıda bu paketle gelen son notlar var.":
    "Für diese installierte Version gibt es keine Versionshinweise. Unten stehen die neuesten Hinweise aus diesem Paket.",
  "Son doğrulanan Windows ayarları gösteriliyor; yeniden okunana kadar değiştirilemez.":
    "Die zuletzt bestätigten Windows-Einstellungen werden angezeigt; sie können erst nach erneutem Lesen geändert werden.",
  "Google bağlantı ayarı henüz doğrulanamadı. Okuma tamamlanmazsa durumu yeniden kontrol edin.":
    "Die Google-Verbindungseinstellung konnte noch nicht bestätigt werden. Prüfen Sie den Status erneut, falls das Lesen nicht abgeschlossen wird.",
  "Kurulum türü henüz doğrulanamadı. Üstteki durumu kontrol edin ve gerekirse yeniden deneyin.":
    "Die Installationsart konnte noch nicht bestätigt werden. Prüfen Sie den Status oben und versuchen Sie es bei Bedarf erneut.",
  "Sürümünüz v{version}. Güncelleme kontrolü başarısız oldu; yeni sürüm olup olmadığı doğrulanamadı. Ayarlar'daki güncelleme bölümünden yeniden deneyin.":
    "Ihre Version ist v{version}. Die Updateprüfung ist fehlgeschlagen; eine neue Version konnte nicht bestätigt werden. Versuchen Sie es im Updatebereich der Einstellungen erneut.",
  "Kurulum kontrolü sonucu alınamadı. Durumu yeniden kontrol edin.":
    "Das Ergebnis der Installationsprüfung konnte nicht abgerufen werden. Prüfen Sie den Status erneut.",
  "Kurulum kontrollerinde sorun bulunmadı.":
    "Die Installationsprüfungen haben keine Probleme gefunden.",
  "{count} kurulum kontrolü dikkat istiyor.":
    "{count} Installationsprüfungen erfordern Aufmerksamkeit.",
  "Ajan araçları bu kurulumdaki projelere erişir. Son çağrı geçmiş kullanım kaydıdır; sürekli çevrimiçi bağlantı anlamına gelmez.":
    "Die Agentenwerkzeuge greifen auf die Projekte dieser Installation zu. Der letzte Aufruf ist ein früherer Nutzungseintrag und bedeutet keine dauerhafte Online-Verbindung.",
  "Durumu yeniden oku": "Status erneut lesen",
  "Bağlantıyı doğrula": "Verbindung bestätigen",
  "Durum okunamadı. Yeniden deneyin; bağlantının başarısız olduğu sonucuna varılamaz.":
    "Der Status konnte nicht gelesen werden. Versuchen Sie es erneut; daraus lässt sich kein Verbindungsfehler ableiten.",
  "Yeni araç çağrısı doğrulandı.": "Neuer Werkzeugaufruf bestätigt.",
  "Yeni araç çağrısı görülmedi. Ajanınızın MCP durumunu kontrol edip bir araç çağrısı yapın, sonra yeniden doğrulayın.":
    "Kein neuer Werkzeugaufruf erkannt. Prüfen Sie den MCP-Status Ihres Agenten, führen Sie einen Werkzeugaufruf aus und bestätigen Sie erneut.",
  "Yeni araç çağrısı bekleniyor. Ajanınızdan seowatcher araçlarını kullanmasını isteyin.":
    "Neuer Werkzeugaufruf erwartet. Bitten Sie Ihren Agenten, die seowatcher-Werkzeuge zu verwenden.",
  "Sitelerinizi açın; arşiv verisini, son denetimi ve eksik bağlantıları burada görün.":
    "Öffnen Sie Ihre Websites; hier sehen Sie Archivdaten, das letzte Audit und fehlende Verbindungen.",
  "Proje ara": "Projekt suchen",
  "Ad veya alan adı": "Name oder Domain",
  "Liste yenilenemedi; son alınan projeler gösteriliyor. Yeniden deneyin.":
    "Die Liste konnte nicht aktualisiert werden; die zuletzt abgerufenen Projekte werden angezeigt. Versuchen Sie es erneut.",
  "Proje verileri yenilenemedi. Listeyi yenileyerek yeniden deneyin.":
    "Die Projektdaten konnten nicht aktualisiert werden. Aktualisieren Sie die Liste und versuchen Sie es erneut.",
  "Bu aramayla eşleşen proje yok. Aramayı değiştirin.":
    "Kein Projekt entspricht dieser Suche. Ändern Sie die Suche.",
  "Site eklenmedi. Bu proje için bir site seçin.":
    "Keine Website hinzugefügt. Wählen Sie eine Website für dieses Projekt.",
  "Son açılan": "Zuletzt geöffnet",
  "Search Console bağla": "Search Console verbinden",
  "Paneli aç": "Dashboard öffnen",
  "Arşivlenen liste yenilenemedi; son alınan liste gösteriliyor":
    "Die Archivliste konnte nicht aktualisiert werden; die zuletzt abgerufene Liste wird angezeigt",
  "Görünüm ve dil bu tarayıcıya, Google kimlikleri bu kurulumdaki tüm projelere, Windows tercihleri başlatıcıya uygulanır. Önce kullanacağınız Google kimliğini seçin, sonra proje bağlantılarından mülkünüzü belirleyin.":
    "Darstellung und Sprache gelten für diesen Browser, Google-Anmeldedaten für alle Projekte dieser Installation und Windows-Einstellungen für den Starter. Wählen Sie zuerst die Google-Anmeldedaten, danach Ihre Property unter den Projektverbindungen.",
  "Kurulum türü okunamadı. Durumu yeniden kontrol edin; günlük konumu kurulum türü belirlendiğinde gösterilir.":
    "Die Installationsart konnte nicht gelesen werden. Prüfen Sie den Status erneut; der Speicherort der Protokolle erscheint, sobald die Installationsart feststeht.",
  "Proje kimliği okunuyor…": "Projekt-ID wird gelesen…",
  "Proje kimliği okunamadı. Proje listesini yeniden yükleyin.":
    "Die Projekt-ID konnte nicht gelesen werden. Laden Sie die Projektliste neu.",
  "Yazdırma sekmesi tarayıcı tarafından engellendi. Bu site için açılır pencerelere izin verin veya raporu yeni sekmede açıp Yazdır kullanın.":
    "Der Browser hat den Druck-Tab blockiert. Erlauben Sie Pop-ups für diese Website oder öffnen Sie den Bericht in einem neuen Tab und verwenden Sie „Drucken“.",
  "Kaynak ve kayıt bilgileri": "Quellen- und Speicherinformationen",
  "Rapor bilgileri yenilenemedi. Son alınan kayıt gösteriliyor; sayfayı yenileyerek tekrar deneyin.":
    "Die Berichtsinformationen konnten nicht aktualisiert werden. Der letzte Eintrag wird angezeigt; laden Sie die Seite neu und versuchen Sie es erneut.",
  "Rapor kaydedildiği dilde ve verilerle açılır. Güncel veri veya başka dil için kaynak ekrandan bilinçli olarak yeniden hazırlayın.":
    "Der Bericht öffnet sich mit der Sprache und den Daten, mit denen er gespeichert wurde. Erstellen Sie ihn für aktuelle Daten oder eine andere Sprache bewusst im Quellbildschirm neu.",
  "Arama raporu hazırla": "Suchbericht erstellen",
  "Denetim raporu hazırla": "Auditbericht erstellen",
  "Liste yenilenemedi. Son alınan kayıtlar gösteriliyor; Yenile ile tekrar deneyin.":
    "Die Liste konnte nicht aktualisiert werden. Die letzten Einträge werden angezeigt; versuchen Sie es mit „Aktualisieren“ erneut.",
  "Filtreler uygulanıyor. Yeni sonuçlar gelene kadar önceki liste gösteriliyor.":
    "Filter werden angewendet. Bis neue Ergebnisse vorliegen, wird die vorherige Liste angezeigt.",
  "Proje alan adı: {domain} · Search Console mülkü: {property}":
    "Projektdomain: {domain} · Search Console-Property: {property}",
  "Alan adı belirtilmedi": "Keine Domain angegeben",
  "Mülk seçilmedi": "Keine Property ausgewählt",
  "Seçilen Search Console mülkü proje alan adını kapsamıyor. Ayrı bir mülkü bilerek seçtiyseniz koruyabilirsiniz; değiştirmek için aşağıdaki mülk seçimini kullanın.":
    "Die ausgewählte Search Console-Property deckt die Projektdomain nicht ab. Haben Sie bewusst eine andere Property gewählt, können Sie sie beibehalten; zum Ändern verwenden Sie die Property-Auswahl unten.",
  "{name} · {domain}. Değişiklikler yalnızca bu projeye uygulanır.":
    "{name} · {domain}. Änderungen gelten nur für dieses Projekt.",
  "PageSpeed Insights · yalnızca denetimler": "PageSpeed Insights · nur Audits",
  "Standart mülk sınırı varsayımı": "Annahme des Standard-Property-Limits",
  "Son gözlenen kalan gösteriliyor; kota penceresi güncelliği doğrulanamadı. Yeni rapor yanıtı gelene kadar güncel kapasite bilinmiyor.":
    "Der zuletzt beobachtete Rest wird angezeigt; die Aktualität des Kontingentzeitfensters konnte nicht bestätigt werden. Bis zur nächsten Berichtsantwort ist die aktuelle Kapazität unbekannt.",
  "Bir denetim en çok {count} sayfa tarar; gösterilen sayı proje alan adındaki son tamamlanan denetime aittir. Tarih denetimin başlangıcıdır.":
    "Ein Audit crawlt höchstens {count} Seiten; die angezeigte Zahl stammt aus dem letzten abgeschlossenen Audit der Projektdomain. Das Datum bezeichnet den Auditbeginn.",
  "Proje alan adındaki son tamamlanan denetim":
    "Letztes abgeschlossenes Audit der Projektdomain",
  "Son denetim girişimi": "Letzter Auditversuch",
  "Proje alan adındaki son denetim girişimi":
    "Letzter Auditversuch für die Projektdomain",
  "Son denetim sürüyor. Sayfa sınırı için son tamamlanan denetim ayrı gösterilir.":
    "Das letzte Audit läuft. Für das Seitenlimit wird das letzte abgeschlossene Audit separat angezeigt.",
  "Son denetim tamamlanamadı. Son tamamlanan denetimin sayfa sayısı korunur; ayrıntıyı Denetim ekranından kontrol edin.":
    "Das letzte Audit konnte nicht abgeschlossen werden. Die Seitenzahl des letzten abgeschlossenen Audits bleibt erhalten; prüfen Sie die Details im Audit-Bildschirm.",
  "Rapor dönemi": "Berichtszeitraum",
  "Google'ın tamamlandığını bildirdiği günler kullanıldı. Dönem sonu: {date}. Günler Pasifik saatine göredir.":
    "Es wurden die von Google als abgeschlossen gemeldeten Tage verwendet. Ende des Zeitraums: {date}. Die Tage richten sich nach pazifischer Zeit.",
  "Son günler gecikme varsayımıyla dışarıda bırakıldı; Google kesinleşme sınırı bildirmedi. Günler Pasifik saatine göredir.":
    "Die letzten Tage wurden wegen einer angenommenen Verzögerung ausgeschlossen; Google hat keine Grenze für endgültige Daten gemeldet. Die Tage richten sich nach pazifischer Zeit.",
  "Gösterilen: {shown} / {observed} gözlenen kayıt. Kaynak satır sınırları nedeniyle tüm siteyi temsil etmeyebilir.":
    "Angezeigt: {shown} / {observed} beobachtete Einträge. Wegen der Zeilenlimits der Quelle bilden sie möglicherweise nicht die gesamte Website ab.",
  "Okunan satırlar: {queries} sorgu, {pages} sayfa, {pairs} sorgu×sayfa. Listelerden türetilen fırsatlar bu kapsamla sınırlıdır.":
    "Gelesene Zeilen: {queries} Suchanfragen, {pages} Seiten, {pairs} Suchanfrage×Seite. Aus den Listen abgeleitete Chancen beschränken sich auf diesen Umfang.",
  "Listelenmeyen sorguların tıklama payı: {share}. Gizlenen ve satır sınırı dışında kalan sorgular birlikte hesaplanır.":
    "Klickanteil nicht aufgeführter Suchanfragen: {share}. Ausgeblendete Suchanfragen und solche jenseits des Zeilenlimits werden gemeinsam berechnet.",
  "Google'ın satır sınırına ulaşıldı; sorgu, sayfa veya sorgu×sayfa listeleri eksik olabilir. Bu listelerden üretilen fırsatlar tam site envanteri değildir.":
    "Das Google-Zeilenlimit wurde erreicht; die Listen der Suchanfragen, Seiten oder Suchanfrage×Seite können unvollständig sein. Daraus abgeleitete Chancen sind kein vollständiges Website-Inventar.",
  "İlk {count} işin {known} tanesinde kazanç hesaplanabildi; {unknown} tanesinde bilinmiyor. Hesaplanabilen işler için {days} günde en fazla {clicks} ek tıklama (üst sınır).":
    "Für {known} der ersten {count} Aufgaben ließ sich der Zugewinn berechnen; für {unknown} ist er unbekannt. Für berechenbare Aufgaben höchstens {clicks} zusätzliche Klicks in {days} Tagen (Obergrenze).",
  "Okunan sayfalarda eşiği aşan, gösterim alıp hiç tıklanmayan sayfa bulunmadı.":
    "Unter den gelesenen Seiten wurde keine Seite oberhalb des Schwellenwerts gefunden, die Impressionen, aber keine Klicks erhielt.",
  "Önceki tıklama": "Vorherige Klicks",
  "Şimdiki tıklama": "Aktuelle Klicks",
  "Okunan sorgularda bu koşulu sağlayan kayıt bulunmadı.":
    "Unter den gelesenen Suchanfragen wurde kein passender Eintrag gefunden.",
  "Önceki dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Yeni sorgu sayısı bu veriden belirlenemez.":
    "Der Vergleich zum vorherigen Zeitraum fehlt oder die Zeilenabdeckung ist unvollständig. Die Zahl neuer Suchanfragen lässt sich daraus nicht bestimmen.",
  "Dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Kaybolan sorgu sayısı bu veriden belirlenemez.":
    "Der Zeitraumvergleich fehlt oder die Zeilenabdeckung ist unvollständig. Die Zahl verschwundener Suchanfragen lässt sich daraus nicht bestimmen.",
  "Uzun dönem karşılaştırması alınamadı. Yeterli geçmiş olmayabilir veya kaynak isteği başarısız olmuş olabilir; geçmiş veriyi kontrol edip raporu yeniden hazırlayın.":
    "Der langfristige Vergleich konnte nicht abgerufen werden. Möglicherweise fehlt ausreichender Verlauf oder die Quellanfrage ist fehlgeschlagen; prüfen Sie die historischen Daten und erstellen Sie den Bericht erneut.",
  "Çakışma analizi alınamadı. Diğer bölümler kullanılabilir; Arama performansında çakışmaları kontrol edip raporu yeniden hazırlayın.":
    "Die Überschneidungsanalyse konnte nicht abgerufen werden. Die anderen Abschnitte sind verfügbar; prüfen Sie die Überschneidungen unter „Suchleistung“ und erstellen Sie den Bericht erneut.",
  "Çakışma dönemi: {start} – {end}. İncelenen: {count} sorgu. Eşik: sorguda 100 gösterim; sayfada 10 gösterim ve yüzde 20 pay. Bu dönem ana rapordan farklı olabilir.":
    "Überschneidungszeitraum: {start} – {end}. Geprüft: {count} Suchanfragen. Schwelle: 100 Impressionen je Suchanfrage; 10 Impressionen und 20 Prozent Anteil je Seite. Dieser Zeitraum kann vom Hauptbericht abweichen.",
  "Kaynak satır sınırına ulaştı. Okunmayan sorgularda başka çok sayfalı sonuçlar olabilir.":
    "Das Zeilenlimit der Quelle wurde erreicht. Unter den nicht gelesenen Suchanfragen können weitere Ergebnisse mit mehreren Seiten sein.",
  "Sonuçlar yalnızca okunan ve eşikleri geçen sorguları kapsar.":
    "Die Ergebnisse umfassen nur gelesene Suchanfragen, die die Schwellen überschreiten.",
  "Okunan sorgularda eşiği aşan çok sayfalı sonuç bulunmadı.":
    "Unter den gelesenen Suchanfragen wurden keine Ergebnisse mit mehreren Seiten oberhalb des Schwellenwerts gefunden.",
  "Diğer sayfa sayısı": "Anzahl anderer Seiten",
  "Bölünen gösterim payı": "Aufgeteilter Impressionenanteil",
  "Bir sorguda birden çok sayfanın görünmesi kayıp tıklama veya SEO zararı kanıtı değildir. Sayfaların aynı ihtiyacı karşılayıp karşılamadığını inceleyin.":
    "Mehrere Seiten für eine Suchanfrage belegen weder verlorene Klicks noch einen SEO-Schaden. Prüfen Sie, ob die Seiten denselben Bedarf erfüllen.",
  "Kaynak satır sınırına ulaştı; dağılım eksik olabilir.":
    "Das Zeilenlimit der Quelle wurde erreicht; die Verteilung kann unvollständig sein.",
  "Özel sonuç görünümü verisi alınamadı veya kayıt dönmedi. Kaynak bu iki durumu ayırmadığı için yokluk sonucu çıkarılamaz; Arama performansını kontrol edin.":
    "Daten zur speziellen Suchdarstellung konnten nicht abgerufen werden oder lieferten keine Einträge. Da die Quelle diese Fälle nicht unterscheidet, lässt sich daraus keine Abwesenheit ableiten; prüfen Sie die Suchleistung.",
  "Okunan görünüm tablosunda bu döneme ait kayıt bulunmadı.":
    "In der gelesenen Darstellungstabelle wurde kein Eintrag für diesen Zeitraum gefunden.",
  "Kaydedilmiş belge": "Gespeichertes Dokument",
  "Rapor hazırlanırken veriler sunucudan yeniden okundu; Google geçmiş değerleri düzeltebilir. Aynı dönem etiketi önceki ekran görüntüsüyle birebir ölçüm eşitliğini garanti etmez. Başlık dili değiştiğinde ayrı bir belge oluşabilir.":
    "Bei der Berichtserstellung wurden die Daten erneut vom Server gelesen; Google kann frühere Werte korrigieren. Dieselbe Zeitraumbezeichnung garantiert keine identischen Messwerte wie ein früherer Screenshot. Eine geänderte Titelsprache kann ein separates Dokument erzeugen.",
  "Sorgu tabloları gizlilik nedeniyle gizlenen satırları içermez. Satır sınırı varsa listelenmeyen pay, sınır dışında kalan sorguları da içerir.":
    "Die Suchanfragetabellen enthalten keine aus Datenschutzgründen ausgeblendeten Zeilen. Bei einem Zeilenlimit umfasst der nicht aufgeführte Anteil auch Suchanfragen jenseits dieses Limits.",
  "Arama görünümünün istek bütçesi: {count}. Ek çakışma analizi dahil değildir; önbellek kullanımı gerçek ağ isteği sayısını değiştirir.":
    "Anfragebudget für die Suchdarstellung: {count}. Zusätzliche Überschneidungsanalysen sind nicht enthalten; die Cache-Nutzung verändert die tatsächliche Zahl der Netzwerkanfragen.",
  Özet: "Zusammenfassung",
  "Uygulama raporu, tür kaydedilmemiş":
    "Anwendungsbericht, Typ nicht gespeichert",
};
