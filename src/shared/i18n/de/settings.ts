import type { Catalog } from "@/shared/i18n";

/** German for settings, support, agent setup and quota screens. */
export const deSettings: Catalog = {
  "Her sürümde nelerin eklendiğini ve düzeltildiğini burada bulabilirsiniz.":
    "Hier sehen Sie, was in jeder Version hinzugefügt und behoben wurde.",
  Yenilik: "Neuerung",
  Güvenlik: "Sicherheit",
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
  Dil: "Sprache",

  "Ayar bölümleri": "Einstellungsbereiche",
  Google: "Google",
  "Hizmet hesabı": "Dienstkonto",
  "Hız ölçümü": "Geschwindigkeitstests",
  Sınırlar: "Limits",
  Hakkında: "Info",
  "Sürüm notları": "Versionshinweise",
  Kayıtlı: "Gespeichert",
  "Kurulum dosyasından geliyor": "Aus der Installationsdatei übernommen",
  Eksik: "Fehlt",
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
  Ulaşılamadı: "Nicht erreichbar",
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
  "Tekrar dene": "Erneut versuchen",
  "Ortam değişkenlerinden geliyor": "Aus Umgebungsvariablen übernommen",
  "{id} ve {secret} ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.":
    "{id} und {secret} sind festgelegt. Wenn Sie hier einen Wert speichern, wird dieser verwendet.",
  Değiştir: "Ändern",
  Sil: "Löschen",
  "İstemci kimliği": "Client-ID",
  "Google Cloud Console'da APIs & Services → Credentials listesinde, OAuth 2.0 Client IDs altında görünür. {suffix} ile biter, gizli değildir.":
    "Sie finden die ID in der Google Cloud Console unter APIs & Services → Credentials in der Liste OAuth 2.0 Client IDs. Sie endet auf {suffix} und ist nicht geheim.",
  "Gizli anahtar": "Client-Secret",
  "Aynı OAuth client'ı açınca sağdaki panelde. Google bunu yalnızca oluşturduğunuz anda tam gösterir. Kaçırdıysanız yeni bir gizli anahtar üretin. Burada sunucuda şifrelenir, bir daha tarayıcıya gönderilmez.":
    "Sie finden es rechts, wenn Sie denselben OAuth-Client öffnen. Google zeigt es nur beim Erstellen vollständig an. Falls Sie es verpasst haben, erstellen Sie ein neues Secret. Hier wird es auf dem Server verschlüsselt und nie wieder an den Browser gesendet.",
  Kaydet: "Speichern",
  Vazgeç: "Abbrechen",
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
  "Güncelleme komutu kopyalandı": "Updatebefehl kopiert",
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
  "Komutu kopyala": "Befehl kopieren",
  "Komut kopyalandı": "Befehl kopiert",
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
  "PageSpeed anahtarı Ayarlar'da kayıtlı.":
    "Der PageSpeed-Schlüssel ist in den Einstellungen gespeichert.",
  "Giriş koruması ayarlı.": "Anmeldeschutz ist eingerichtet.",
  "Bu kurulum parolasız ama dışarıdan erişime açık görünüyor; açan herkes yönetici olur. Önüne kendi giriş korumanızı koyun ya da uygulamayı yalnızca bu bilgisayara (127.0.0.1) açık tutun.":
    "Diese Installation hat kein Passwort und scheint von außen erreichbar zu sein; jeder, der sie öffnet, wäre Administrator. Richten Sie einen eigenen Anmeldeschutz davor ein oder beschränken Sie den Zugriff auf diesen Computer (127.0.0.1).",
  "Giriş ayarı eksik ya da geçersiz. Görev çubuğu menüsünden Kurulumu onar deyin; düzelmezse Sorunu bildir.":
    "Die Anmeldeeinstellung fehlt oder ist ungültig. Wählen Sie im Infobereichsmenü Kurulumu onar (Installation reparieren). Falls das nicht hilft, wählen Sie Sorunu bildir (Problem melden).",
  "Giriş ayarı eksik ya da geçersiz. AUTH_MODE, TEAM_DOMAIN ve POLICY_AUD değerlerini docs/ENVIRONMENT.md'ye göre kontrol edin.":
    "Die Anmeldeeinstellung fehlt oder ist ungültig. Prüfen Sie AUTH_MODE, TEAM_DOMAIN und POLICY_AUD anhand von docs/ENVIRONMENT.md.",
  "Yerel veritabanı yanıt veriyor.": "Die lokale Datenbank antwortet.",
};
