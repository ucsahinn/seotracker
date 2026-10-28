import type { Catalog } from "@/shared/i18n";

/** German for app-wide labels: Google access status, settings help, feedback form and audit errors. */
export const deApp: Catalog = {
  "Bu bölüm başka bir yerde değişti. Metinleri karşılaştırıp taslağınızı birleştirin.":
    "Dieser Abschnitt wurde anderswo geändert. Vergleichen Sie die Texte und führen Sie Ihren Entwurf zusammen.",
  "Düzenleme başındaki metin": "Text zu Beginn der Bearbeitung",
  "Son kayıtlı metin": "Zuletzt gespeicherter Text",
  "Karşılaştırdım, birleştirilmiş taslağı kullan":
    "Verglichen; zusammengeführten Entwurf verwenden",
  "Son doksan gündeki en yeni yirmi kayıt gösterilir. Tarihi sunucu UTC gününe göre belirler.":
    "Die neuesten zwanzig Einträge der letzten neunzig Tage werden angezeigt. Das Datum folgt dem UTC-Tag des Servers.",
  "Bu zaman aralığında gösterilmeyen daha eski kayıtlar var.":
    "Ältere Einträge in diesem Zeitraum werden nicht angezeigt.",
  "Önceki: {previous} → {current}": "Vorher: {previous} → {current}",
  "Sosyal ve yapılandırılmış veri": "Social Media und strukturierte Daten",
  "Bir ayarı değiştirdim, uygulama görmüyor":
    "Ich habe eine Einstellung geändert, und die App übernimmt sie nicht",
  "Google erişimi, PageSpeed anahtarı ve dil Ayarlar ekranında girilir ve hemen geçerli olur. Windows paketinde .env dosyası ve ortam değişkeni yoktur.":
    "Google-Zugang, PageSpeed-Schlüssel und Sprache werden im Bildschirm „Einstellungen“ eingetragen und gelten sofort. Das Windows-Paket hat keine .env-Datei und keine Umgebungsvariablen.",
  "Elle değiştirilebilen tek dosya {config}: adres numarası (port) ve kendiliğinden güncelleme. {dataFolder} ile açın, değiştirin, sonra {restart} deyin. Yanındaki {serverEnv} dosyasını düzenlemeyin; uygulama her açılışta onu yeniden yazar.":
    "Die einzige Datei, die Sie von Hand bearbeiten, ist {config}: Port und automatische Updates. Öffnen Sie sie über {dataFolder} (Datenordner öffnen), ändern Sie sie und wählen Sie dann {restart} (Neu starten). Bearbeiten Sie nicht die Datei {serverEnv} daneben; die App schreibt sie bei jedem Start neu.",
  "Ayarlar ekranında girilenler hemen geçerli olur. {env} dosyasındaki değişkenler (örneğin {port}, {host}, {token}) ise yalnızca konteyner yeniden oluşturulunca okunur: {command}":
    "Was Sie im Bildschirm „Einstellungen“ eintragen, gilt sofort. Variablen in der Datei {env} (zum Beispiel {port}, {host}, {token}) werden nur gelesen, wenn der Container neu erstellt wird: {command}",
  "Yalnızca yeniden başlatmak için: {command} Bu, .env değişikliğini uygulamaz. {docs}":
    "Nur neu starten: {command} Damit wird eine Änderung an der .env nicht übernommen. {docs}",
  "Ortam değişkenleri": "Umgebungsvariablen",
  "Rapor hazırlanıyor…": "Bericht wird erstellt…",
  "Dizin durumu kontrol ediliyor": "Indexstatus wird geprüft",
  "Yanıt gönderilemedi ({status})":
    "Ihre Antwort konnte nicht gesendet werden ({status})",
  "Yanıt gönderilemedi": "Ihre Antwort konnte nicht gesendet werden",
  "Bu kurulumdan daha önce yanıt verildi.":
    "Diese Installation hat bereits geantwortet.",
  "Çok hızlı yanıt gönderildi. Biraz sonra yeniden deneyin.":
    "Zu viele Antworten. Versuchen Sie es gleich noch einmal.",
  "Kişisel bilgi paylaşmayın": "Keine personenbezogenen Daten angeben",
  "Adınız veya hesabınız alınmaz. Aynı tarayıcıda saklanan katılımcı anahtarıyla bir kez yanıt verilebilir; bu, kişi başına tek yanıt garantisi değildir. Yanıtınız yöneticiler tarafından görülebilir. Kişisel bilgi yazmayın.":
    "Wir erfassen weder Ihren Namen noch ein Konto. Pro gespeichertem Browser-Schlüssel ist eine Antwort möglich; das garantiert nicht eine Antwort pro Person. Administratoren können Ihre Antwort einsehen. Geben Sie keine personenbezogenen Daten an.",
  Yanıtla: "Antwort senden",
  "Gönderiliyor…": "Wird gesendet…",
  "Denetim uygulamadaki bir hata yüzünden durdu.":
    "Das Audit wurde wegen eines Fehlers in der App angehalten.",
  "Sorun sitenizde değil. Denetimi yeniden başlatın. Tekrarlarsa Yardım ekranından tanı paketini indirip sorun kaydına ekleyin. Hata kodu: {code}":
    "Ihre Website ist nicht das Problem. Starten Sie das Audit erneut. Passiert es wieder, laden Sie unter „Hilfe“ das Diagnosepaket herunter und hängen Sie es an ein Issue an. Fehlercode: {code}",
  "Yanıtınız alındı": "Ihre Antwort wurde gespeichert",
  "{count} yanıt": { one: "{count} Antwort", other: "{count} Antworten" },
  "PowerShell: parolayı ekrana yazdırmadan panoya kopyalayın. Yalnızca MCP istemcinizin yerel gizli başlık alanına yapıştırın, ardından panoyu temizleyin. Sohbete yapıştırmayın.":
    "PowerShell: Kopieren Sie das Passwort ohne Bildschirmausgabe in die Zwischenablage. Fügen Sie es nur in das lokale geheime Header-Feld Ihres MCP-Clients ein und leeren Sie danach die Zwischenablage. Fügen Sie es nicht in den Chat ein.",
  "Google Analytics mülkü seçildi": "Google Analytics-Property ausgewählt",
  "Mülk seçim tarihi: {date}": "Property ausgewählt am: {date}",
  "Kimlik yöntemi: hizmet hesabı": "Anmeldemethode: Dienstkonto",
  "Kimlik yöntemi: Google OAuth": "Anmeldemethode: Google OAuth",
  "Saat dilimi: {timezone} · Para birimi: {currency}":
    "Zeitzone: {timezone} · Währung: {currency}",
  "Search Console mülkü seçildi": "Search Console-Property ausgewählt",
  "Bağlantı ayarları yenilenemedi. Son kayıt gösteriliyor; erişim durumu bilinmiyor.":
    "Die Verbindungseinstellungen konnten nicht aktualisiert werden. Der letzte Stand wird angezeigt; der Zugriffsstatus ist unbekannt.",
  "Google izni geçersiz veya süresi dolmuş. İlgili Google hesabını yeniden bağlayın.":
    "Die Google-Berechtigung ist ungültig oder abgelaufen. Verbinden Sie das betreffende Google-Konto erneut.",
  "Google bu mülke erişimi reddetti. Seçilen hesabın mülk izinlerini kontrol edin.":
    "Google hat den Zugriff auf diese Property verweigert. Prüfen Sie die Property-Berechtigungen des ausgewählten Kontos.",
  "Google API etkin değil. Google Cloud projesinde ilgili API'yi etkinleştirip yeniden deneyin.":
    "Die Google API ist nicht aktiviert. Aktivieren Sie die betreffende API im Google Cloud-Projekt und versuchen Sie es erneut.",
  "Google istek sınırına ulaşıldı. Bir süre bekleyin ve Google Cloud kota ekranını kontrol edin.":
    "Das Google-Anfragelimit wurde erreicht. Warten Sie etwas und prüfen Sie die Kontingente in Google Cloud.",
  "Google zamanında yanıt vermedi. Bağlantıyı kontrol edip yeniden deneyin; mevcut mülk seçimi korunur.":
    "Google hat nicht rechtzeitig geantwortet. Prüfen Sie die Verbindung und versuchen Sie es erneut; die ausgewählte Property bleibt erhalten.",
  "Google bağlantı yanıtı okunamadı; erişiminizin olmadığı sonucu çıkarılamaz. Yeniden deneyin. Sürerse Yardım ekranından tanılama paketini alıp sorunu bildirin.":
    "Die Google-Verbindungsantwort konnte nicht gelesen werden; daraus lässt sich kein fehlender Zugriff ableiten. Versuchen Sie es erneut. Bleibt das Problem bestehen, laden Sie unter „Hilfe“ das Diagnosepaket herunter und melden Sie den Fehler.",
  "Mülk seçimi kayıtlıdır. Veri erişimi bu ayar okumasıyla doğrulanmaz; son veri durumunu ilgili rapordan kontrol edin.":
    "Die Property-Auswahl ist gespeichert. Das Lesen dieser Einstellung bestätigt keinen Datenzugriff; prüfen Sie den letzten Datenstand im jeweiligen Bericht.",
  "Kurulumun Google kimlik ayarları": "Google-Anmeldedaten dieser Installation",
  "Google mülk listesi okunamadı. Bu durum erişiminiz olmadığı anlamına gelmez. Son liste korunur; yeniden deneyin veya Yardım tanılamasını kontrol edin.":
    "Die Google-Property-Liste konnte nicht gelesen werden. Das bedeutet nicht, dass Sie keinen Zugriff haben. Die letzte Liste bleibt erhalten; versuchen Sie es erneut oder prüfen Sie die Diagnose unter „Hilfe“.",
  "Mülk seçili": "Property ausgewählt",
  "En fazla {count} karakter": "Höchstens {count} Zeichen",
  "İsteğe bağlı rakip notu eklenmemiş. Bu liste rakip sıralaması ölçmez.":
    "Keine optionale Wettbewerbernotiz hinzugefügt. Diese Liste misst keine Wettbewerber-Rankings.",
  "İsteğe bağlı sayfa listesi boş. Sayfa rolleri sizin notlarınızdır; ölçülen dönüşüm değildir.":
    "Die optionale Seitenliste ist leer. Die Seitenrollen sind Ihre Notizen, keine gemessenen Conversions.",
  "Search Console bağlantısı kayıtlı. Veri durumunu Arama performansında görün.":
    "Die Search Console-Verbindung ist gespeichert. Den Datenstand sehen Sie unter „Suchleistung“.",
  "Analytics bağlantısı kayıtlı. Veri durumunu Analytics ekranında görün.":
    "Die Analytics-Verbindung ist gespeichert. Den Datenstand sehen Sie im Analytics-Bildschirm.",
  "Bağlı değil. Oturum ve dönüşüm analizi için Analytics bağlayın; arama tıklamalarını Search Console ile inceleyebilirsiniz.":
    "Nicht verbunden. Verbinden Sie Analytics für Sitzungs- und Conversion-Analysen; Suchklicks können Sie mit Search Console untersuchen.",
  "Anahtar kayıtlı. Google kotası veya hizmet hatası hız ölçümünü yine engelleyebilir.":
    "Der Schlüssel ist gespeichert. Google-Kontingente oder Dienstfehler können Geschwindigkeitsmessungen dennoch verhindern.",
  "Anahtar yok. Ortak Google kotası hız ölçümünü sınırlayabilir; Ayarlar’dan kendi anahtarınızı ekleyin.":
    "Kein Schlüssel. Das gemeinsame Google-Kontingent kann Geschwindigkeitsmessungen einschränken; fügen Sie unter „Einstellungen“ Ihren eigenen Schlüssel hinzu.",
  "Son yedi günde başlatılıp tamamlanmış bu siteye ait denetim var.":
    "Für diese Website gibt es ein Audit, das in den letzten sieben Tagen gestartet und abgeschlossen wurde.",
  "Son yedi günde başlatılıp tamamlanmış bu-site denetimi yok. Site denetiminden yeni bir denetim başlatın.":
    "Für diese Website gibt es kein Audit, das in den letzten sieben Tagen gestartet und abgeschlossen wurde. Starten Sie unter „Website-Audit“ ein neues Audit.",
  "Bu kurulumda bir ajan en az bir araç kullandı.":
    "Ein Agent hat in dieser Installation mindestens ein Werkzeug verwendet.",
  "Bu kurulumda kayıtlı araç çağrısı yok. Ajan kurulumu adımlarını izleyin.":
    "Für diese Installation ist kein Werkzeugaufruf gespeichert. Folgen Sie den Schritten zur Agenteneinrichtung.",
  "Kayıtlı bağlantılar ve proje notları. Bu liste bir SEO başarı puanı veya canlı bağlantı testi değildir.":
    "Gespeicherte Verbindungen und Projektnotizen. Diese Liste ist weder ein SEO-Erfolgswert noch ein Live-Verbindungstest.",
  "Kurulum ve proje notları farklı anlarda okundu. Tutarlı durum için bilgiyi yenileyin.":
    "Installation und Projektnotizen wurden zu unterschiedlichen Zeitpunkten gelesen. Aktualisieren Sie die Angaben für einen konsistenten Stand.",
  "{done}/{total} kayıtlı · {missing} eksik · {unknown} okunamadı":
    "{done}/{total} gespeichert · {missing} fehlen · {unknown} nicht lesbar",
  "Kurulum yenilenemedi; son alınan durum gösteriliyor. Yeniden deneyin.":
    "Die Installation konnte nicht aktualisiert werden; der letzte Stand wird angezeigt. Versuchen Sie es erneut.",
  "Kaydedilmemiş değişiklikleriniz var. Bu sayfadan ayrılmak istiyor musunuz?":
    "Sie haben ungespeicherte Änderungen. Möchten Sie diese Seite verlassen?",
  "İstemi kopyalayıp Claude Code ya da Codex'e yapıştırın. Bu istem ajandan kaydetmeden önce onayınızı istemesini ister. Araç çağrıları bilgiyi hemen kaydedebilir; onay davranışı ajanınıza bağlıdır.":
    "Kopieren Sie die Anweisung und fügen Sie sie in Claude Code oder Codex ein. Sie fordert den Agenten auf, vor dem Speichern Ihre Zustimmung einzuholen. Werkzeugaufrufe können Angaben sofort speichern; das Einholen der Zustimmung hängt von Ihrem Agenten ab.",
  "İstemi kopyalayıp ajana yapıştırın. Bu istem ajandan mevcut notları gözden geçirmesini ve kaydetmeden önce onayınızı istemesini ister. Uygulama araçları ayrıca bir onay kapısı uygulamaz.":
    "Kopieren Sie die Anweisung und fügen Sie sie beim Agenten ein. Sie fordert ihn auf, bestehende Notizen zu prüfen und vor dem Speichern Ihre Zustimmung einzuholen. Die Anwendungswerkzeuge erzwingen keine zusätzliche Freigabe.",
  "Ajanın kullanabileceği kayıtlı proje notları. Kaydedilen bilgiyi, son yazanı ve eksikleri gözden geçirin.":
    "Gespeicherte Projektnotizen für den Agenten. Prüfen Sie die Angaben, den letzten Bearbeiter und die Lücken.",
  "Son kayıtlı bilgi gösteriliyor; yenileme başarısız. Taslaklarınız korunuyor.":
    "Die letzten gespeicherten Angaben werden angezeigt; die Aktualisierung ist fehlgeschlagen. Ihre Entwürfe bleiben erhalten.",
  "{filled}/{total} bölüm dolu": "{filled}/{total} Abschnitte ausgefüllt",
  "Şu anki hedef kayıtlı değil. Hedef bölümüne bu dönem başarmak istediğinizi yazın.":
    "Das aktuelle Ziel ist nicht gespeichert. Tragen Sie unter „Ziel“ ein, was Sie in diesem Zeitraum erreichen möchten.",
  "İlk boş bölümü doldur": "Ersten leeren Abschnitt ausfüllen",
  "Bölüme git": "Zum Abschnitt",
  "Bölüm seçin": "Abschnitt auswählen",
  "Ajanla taslak hazırla": "Entwurf mit dem Agenten erstellen",
  "Proje kimliği okunmadan istem hazırlanamaz. Proje listesini yeniden yükleyin.":
    "Ohne gelesene Projekt-ID kann keine Anweisung erstellt werden. Laden Sie die Projektliste neu.",
  "Kaynak ve kurulum": "Quelle und Installation",
  "En yeni en fazla yirmi kayıt gösterilir. Tarihi sunucu UTC gününe göre belirler. Doksan günden eski kayıtlar yeni kayıt eklenirken temizlenir; bu liste eksiksiz geçmiş değildir.":
    "Es werden höchstens die zwanzig neuesten Einträge angezeigt. Das Datum richtet sich nach dem UTC-Tag des Servers. Einträge, die älter als neunzig Tage sind, werden beim Hinzufügen neuer Einträge gelöscht; diese Liste ist kein vollständiger Verlauf.",
  "Bilgi kaydedilemedi. Taslağınız korunuyor; alanları kontrol edip yeniden kaydedin.":
    "Die Angaben konnten nicht gespeichert werden. Ihr Entwurf bleibt erhalten; prüfen Sie die Felder und speichern Sie erneut.",
  "Proje verileri okunamadı. Listeyi yenileyerek yeniden deneyin.":
    "Die Projektdaten konnten nicht gelesen werden. Aktualisieren Sie die Liste und versuchen Sie es erneut.",
  "Bazı kaynaklar okunamadı; gösterilen diğer bilgiler korunuyor.":
    "Einige Quellen konnten nicht gelesen werden; die übrigen angezeigten Angaben bleiben erhalten.",
  "Arama arşivi · Web · tüm cihazlar ve ülkeler":
    "Sucharchiv · Web · alle Geräte und Länder",
  "{observed}/{total} gün kayıtlı; toplam yalnızca kayıtlı günleri içerir.":
    "{observed}/{total} Tage gespeichert; die Summe enthält nur gespeicherte Tage.",
  "Kayıtlı günlerde ölçülen tıklama sayısı sıfır.":
    "An den gespeicherten Tagen wurden null Klicks gemessen.",
  "Önceki dönem: {start} – {end} · {observed}/{total} gün kayıtlı":
    "Vorheriger Zeitraum: {start} – {end} · {observed}/{total} Tage gespeichert",
  "İki dönemin de tüm günleri kayıtlı olmadığı için değişim hesaplanmadı.":
    "Die Veränderung wurde nicht berechnet, weil mindestens ein Zeitraum nicht vollständig gespeichert ist.",
  "Arşiv kaynağı": "Archivquelle",
  "Son kayıtlı gün: {date}": "Letzter gespeicherter Tag: {date}",
  "Son arşiv okuması: {date}": "Archiv zuletzt gelesen: {date}",
  "Kesinleşme kaynağı arşivde kayıtlı değil":
    "Die Quelle der Datenfinalisierung ist im Archiv nicht gespeichert",
  "Bu kurulumda henüz arama arşivi yok. Arama performansını açarak veriyi okuyun.":
    "Diese Installation hat noch kein Sucharchiv. Öffnen Sie die Suchleistung, um Daten abzurufen.",
  "Son tamamlanan bu-site denetimi":
    "Letztes abgeschlossenes Audit dieser Website",
  "Başlangıç: {date}": "Beginn: {date}",
  "Tamamlanma: {date}": "Abschluss: {date}",
  "Bu denetim en az yedi gün önce başlatıldı. Güncel durum için yeni denetim başlatın.":
    "Dieses Audit wurde vor mindestens sieben Tagen gestartet. Starten Sie ein neues Audit für den aktuellen Stand.",
  "Denetimi aç": "Audit öffnen",
  "Bu site için tamamlanmış denetim yok. Siteyi seçip denetim başlatın.":
    "Für diese Website gibt es kein abgeschlossenes Audit. Wählen Sie die Website aus und starten Sie ein Audit.",
  "Son deneme başarısız": "Letzter Versuch fehlgeschlagen",
  "Son denetim sürüyor": "Letztes Audit läuft",
  "Son deneme tamamlanmadı": "Letzter Versuch nicht abgeschlossen",
  "Bağlantı kaydı, verinin başarıyla okunduğunu göstermez.":
    "Eine gespeicherte Verbindung bestätigt keinen erfolgreichen Datenabruf.",
  "Bağlantı kayıtlı": "Verbindung gespeichert",
  "Ülke ve dil, kaydettiğiniz kelimelerin varsayılan pazarıdır. Arama performansında ülkeyi filtrelerden seçersiniz; bu ayar geçmiş veriyi değiştirmez.":
    "Land und Sprache bilden den Standardmarkt Ihrer gespeicherten Suchbegriffe. In der Suchleistung wählen Sie das Land über die Filter; diese Einstellung ändert keine historischen Daten.",
  "Denetim bu adresten başlar. Google mülkünü Bağlantılar bölümünden ayrıca seçersiniz. https:// olmadan yazın, örneğin example.com.":
    "Das Audit beginnt an dieser Adresse. Die Google-Property wählen Sie separat unter „Verbindungen“. Geben Sie die Adresse ohne https:// ein, zum Beispiel example.com.",
  "Alan adı değişikliği Google mülk seçimini ve geçmiş kayıtları değiştirmez. Kaydetmeden önce Bağlantılar bölümündeki mülkün bu siteye ait olduğunu kontrol edin.":
    "Eine Domainänderung verändert weder die Google-Property-Auswahl noch historische Einträge. Prüfen Sie vor dem Speichern unter „Verbindungen“, ob die Property zu dieser Website gehört.",
  "Marka terimlerini Arama performansında düzenleyin":
    "Markenbegriffe in der Suchleistung bearbeiten",
  "Google mülk seçimi ve geçmiş korunarak alan adının değiştirilmesini onaylıyorum.":
    "Ich bestätige die Domainänderung unter Beibehaltung der Google-Property-Auswahl und der bisherigen Einträge.",
  "Sınırları gösterilen proje": "Projekt, dessen Limits angezeigt werden",
  "Sınırlar yenilenemedi; son kayıt gösteriliyor":
    "Limits konnten nicht aktualisiert werden; der letzte Stand wird angezeigt",
  "{state} · {count} kaynak bilinmiyor": "{state} · {count} Quellen unbekannt",
  "Bilinen sınırlarda sorun yok": "Keine Probleme bei den bekannten Limits",
  "Rapor indirmesi bağlantı hatası veya zaman aşımı nedeniyle tamamlanamadı. Bağlantınızı kontrol edip yeniden indirin.":
    "Der Bericht konnte wegen eines Verbindungsfehlers oder einer Zeitüberschreitung nicht vollständig heruntergeladen werden. Prüfen Sie Ihre Verbindung und laden Sie ihn erneut herunter.",
  "Rapor indirmesi başka bir sayfaya yönlendirildi. Uygulamayı yenileyip erişiminizi kontrol edin.":
    "Der Berichtdownload wurde auf eine andere Seite umgeleitet. Aktualisieren Sie die Anwendung und prüfen Sie Ihren Zugriff.",
  "Rapor bulunamadı veya erişiminiz yok. Listeyi yenileyip raporu yeniden seçin.":
    "Der Bericht wurde nicht gefunden oder Sie haben keinen Zugriff. Aktualisieren Sie die Liste und wählen Sie den Bericht erneut aus.",
  "Rapor erişimi doğrulanamadı. Uygulamayı yenileyip yeniden indirin.":
    "Der Berichtzugriff konnte nicht bestätigt werden. Aktualisieren Sie die Anwendung und laden Sie ihn erneut herunter.",
  "Rapor sunucusu indirmeyi tamamlayamadı. Biraz sonra yeniden indirin.":
    "Der Berichtsserver konnte den Download nicht abschließen. Laden Sie ihn später erneut herunter.",
  "Kaydedildi: {date}": "Gespeichert: {date}",
  "Arama performansı ekranında dönem ve süzgeçleri seçip Raporu indir düğmesini kullanın. Kaydedilmiş raporlar kaynak bağlantısı kesilse de okunabilir.":
    "Wählen Sie im Bildschirm „Suchleistung“ Zeitraum und Filter und verwenden Sie „Bericht herunterladen“. Gespeicherte Berichte bleiben auch lesbar, wenn die Quellverbindung getrennt wird.",
  Sıralama: "Sortierung",
  "Oluşturulma zamanı": "Erstellungszeit",
  "{matching} sonuç / projedeki {total} rapor":
    "{matching} Ergebnisse / {total} Berichte im Projekt",
  "Son 7 gün, bu sürede kaydedilen veya güncellenen ayrı dosyaları süzer; kaynak verinin güncelliğini göstermez. Arama başlık ve kayıtlı özeti tarar.":
    "„Letzte 7 Tage“ filtert einzelne Dateien, die in diesem Zeitraum gespeichert oder aktualisiert wurden; dies sagt nichts über die Aktualität der Quelldaten aus. Die Suche durchsucht Titel und gespeicherte Zusammenfassungen.",
  "Tür sayıları arama ve Son 7 gün süzgecine göredir; seçili türden önce hesaplanır.":
    "Die Anzahlen je Typ berücksichtigen die Suche und den Filter „Letzte 7 Tage“; sie werden vor dem ausgewählten Typ berechnet.",
  "Aramayı veya türü temizleyerek kayıtlı raporları görün.":
    "Löschen Sie die Suche oder den Typfilter, um gespeicherte Berichte zu sehen.",
  "Arama performansı veya Site denetimi ekranından rapor hazırlayın ya da rapor komutunu ajanınıza yapıştırın.":
    "Erstellen Sie einen Bericht unter „Suchleistung“ oder „Website-Audit“ oder fügen Sie Ihrem Agenten den Berichtsbefehl ein.",
  "Veri dönemi: raporun içinde kontrol edin.":
    "Datenzeitraum: im Bericht prüfen.",
  Şablon: "Vorlage",
  "{start}–{end} / {total}": "{start}–{end} / {total}",
  Sonraki: "Weiter",
  "Saklama durumu": "Speicherstatus",
  "Saklama bilgileri alınamadı. Bu durum boş alan olduğunu göstermez; bağlantıyı kontrol edip yeniden deneyin.":
    "Die Speicherinformationen konnten nicht abgerufen werden. Das bedeutet nicht, dass Speicherplatz frei ist; prüfen Sie die Verbindung und versuchen Sie es erneut.",
  "Son güncellenen rapor": "Zuletzt aktualisierter Bericht",
  "Bu rapora özet kaydedilmemiş. Bulguları ve ilk adımı raporun içinde kontrol edin.":
    "Für diesen Bericht wurde keine Zusammenfassung gespeichert. Prüfen Sie die Ergebnisse und den ersten Schritt im Bericht.",
  "Kaydedildi: {date}. Bu zaman, kaynak verinin ölçüm tarihi değildir.":
    "Gespeichert: {date}. Dies ist nicht der Messzeitpunkt der Quelldaten.",
  "Bu raporun veri dönemi yapılandırılmış olarak kaydedilmemiş. Dönemi ve veri sınırlarını raporun içinde kontrol edin.":
    "Der Datenzeitraum dieses Berichts wurde nicht strukturiert gespeichert. Prüfen Sie Zeitraum und Datengrenzen im Bericht.",
  "Raporu aç": "Bericht öffnen",
  "Rapor belgesi bulunamadı veya erişiminiz yok. Listeyi yenileyip raporu yeniden seçin.":
    "Das Berichtsdokument wurde nicht gefunden oder Sie haben keinen Zugriff. Aktualisieren Sie die Liste und wählen Sie den Bericht erneut aus.",
  "Raporun kullanılabilirliği doğrulanamadı. Sunucuya veya bağlantınıza erişilemiyor; yeniden deneyin.":
    "Die Verfügbarkeit des Berichts konnte nicht bestätigt werden. Der Server oder Ihre Verbindung ist nicht erreichbar; versuchen Sie es erneut.",
  "Rapor önizlemesi zamanında açılmadı. Bağlantıyı kontrol edin; yeniden deneyin veya yeni sekmede açın.":
    "Die Berichtsvorschau wurde nicht rechtzeitig geöffnet. Prüfen Sie die Verbindung; versuchen Sie es erneut oder öffnen Sie den Bericht in einem neuen Tab.",
  "Arşiv ayrıntısı": "Archivdetails",
  "Dönem: {start} – {end}": "Zeitraum: {start} – {end}",
  "Sıra bilinmiyor": "Position unbekannt",
  "Önceki dönem: {start} – {end}": "Vorheriger Zeitraum: {start} – {end}",
  "Önceki ortalama sıra": "Vorherige durchschnittliche Position",
  Gösterimler: "Impressionen",
  "Sıra arşivi okunamadı. Liste kayıtlı; sıra bilgisi için yeniden deneyin.":
    "Das Positionsarchiv konnte nicht gelesen werden. Die Liste ist gespeichert; versuchen Sie es für die Positionsdaten erneut.",
  "Eksik arşiv nedeniyle gözlem yokluğu doğrulanamaz":
    "Wegen unvollständiger Archivdaten lässt sich das Fehlen von Beobachtungen nicht bestätigen",
  "Okunan arşivde eşleşen gözlem yok":
    "Keine passende Beobachtung in den gelesenen Archivdaten",
  "Eşleşen ham sorgular; gösterimle ağırlıklandırılır":
    "Passende Originalsuchanfragen; nach Impressionen gewichtet",
  "Önceki dönemin ham sorguları":
    "Originalsuchanfragen des vorherigen Zeitraums",
  "Gözlem yok": "Keine Beobachtung",
  "Konum ve dil kayıt bilgisi olarak korunur. Arşiv tüm ülkeleri ve cihazları kapsar. Türkçe büyük/küçük harf ve birden fazla boşluk eşleştirilir; ham sorgular gösterimle ağırlıklandırılır. Google bazı nadir sorguları döndürmeyebilir.":
    "Standort und Sprache bleiben als gespeicherte Angaben erhalten. Das Archiv umfasst alle Länder und Geräte. Türkische Groß-/Kleinschreibung und mehrfache Leerzeichen werden beim Abgleich berücksichtigt; Originalsuchanfragen werden nach Impressionen gewichtet. Google liefert manche seltenen Suchanfragen möglicherweise nicht.",
  "Kayıtlı pazar (arşiv filtresi değil)":
    "Gespeicherter Markt (kein Archivfilter)",
  "Eski kayıt bilgisi: {intent}; tarih: {date}":
    "Frühere gespeicherte Angabe: {intent}; Datum: {date}",
  "Arama amacı ölçülmedi": "Suchabsicht nicht gemessen",
  "Canlı arama son 28 günü ve metni içeren sorguları açar; bu arşiv ortalamasıyla aynı dönem veya tam eşleşme değildir.":
    "Die Live-Suche öffnet die letzten 28 Tage und Suchanfragen, die den Text enthalten; Zeitraum und Abgleich entsprechen nicht dem Archivdurchschnitt oder einer exakten Übereinstimmung.",
  "Arama performansında ara (canlı dönem)":
    "In der Suchleistung suchen (Live-Zeitraum)",
  "Günlük arşiv gözlemlerini göster": "Tägliche Archivbeobachtungen anzeigen",
  "Günlük arşiv okunamadı veya liste değişti. Ayrıntıyı kapatıp listeyi yenileyin; ardından yeniden açın.":
    "Das Tagesarchiv konnte nicht gelesen werden oder die Liste hat sich geändert. Schließen Sie die Details, aktualisieren Sie die Liste und öffnen Sie die Details erneut.",
  "Bu tarihlerde eşleşen günlük gözlem yok; eksik günler sıfır sayılmaz.":
    "Keine passenden täglichen Beobachtungen für diese Daten; fehlende Tage werden nicht als null gezählt.",
  "Eklenen terimlerin tümü eşleşmelidir.":
    "Alle hinzugefügten Begriffe müssen übereinstimmen.",
  "Eklenen terimlerden hiçbiri bulunmamalıdır.":
    "Keiner der hinzugefügten Begriffe darf vorkommen.",
  "En fazla {count} terim.": "Höchstens {count} Begriffe.",
  "Terim sınırı aşıldı. Eklemek için önce bir terimi kaldırın.":
    "Begriffslimit überschritten. Entfernen Sie zuerst einen Begriff, um einen weiteren hinzuzufügen.",
  "Seçtiğiniz kelimelerin arşiv gözlemlerini, karşılaştırılabilir hareketlerini ve eksik kanıtlarını inceleyin.":
    "Prüfen Sie Archivbeobachtungen, vergleichbare Veränderungen und fehlende Belege für Ihre ausgewählten Suchbegriffe.",
  "Liste yanıtı: {date}": "Listenantwort: {date}",
  "Arşiv dönemi": "Archivzeitraum",
  "{count} gün": "{count} Tage",
  "Listeyi yenile": "Liste aktualisieren",
  "Filtrelenen {count} kelimeyi aktar":
    "{count} gefilterte Suchbegriffe exportieren",
  "Kelime ara; tüm terimler eşleşir":
    "Suchbegriffe suchen; alle Begriffe müssen übereinstimmen",
  "Terimleri virgülle ayırın": "Begriffe durch Kommas trennen",
  "Filtre uygulanıyor…": "Filter wird angewendet…",
  "En fazla {count} terim girin; fazla terimleri kaldırın.":
    "Geben Sie höchstens {count} Begriffe ein; entfernen Sie überzählige Begriffe.",
  "Etkin sıra grubu: {band}": "Aktive Positionsgruppe: {band}",
  "Belirgin gerileyenler": "Deutlich gesunken",
  "Sıra özeti okunamadı; kayıtlı liste kullanılabilir":
    "Die Positionsübersicht konnte nicht gelesen werden; die gespeicherte Liste ist verfügbar",
  "Sıra grubu uygulanamadı; sıra arşivi okunamadı. Yeniden deneyin veya grubu temizleyin.":
    "Die Positionsgruppe konnte nicht angewendet werden; das Positionsarchiv konnte nicht gelesen werden. Versuchen Sie es erneut oder entfernen Sie die Gruppe.",
  "Sıra 1–3": "Position 1–3",
  "Sıra 4–10": "Position 4–10",
  "Sıra 11–20": "Position 11–20",
  "Sıra 21+": "Position 21+",
  "Gözlenen kelimeler": "Beobachtete Suchbegriffe",
  "{shown} / {total} kayıtlı kelime; seçim yalnızca bu sayfada":
    "{shown} / {total} gespeicherte Suchbegriffe; Auswahl nur auf dieser Seite",
  "Kayıtlı kelimelerin arşiv özeti":
    "Archivübersicht gespeicherter Suchbegriffe",
  "Kelimeler kayıtlı; sıra karşılaştırması şu anda kullanılamıyor.":
    "Die Suchbegriffe sind gespeichert; ein Positionsvergleich ist derzeit nicht verfügbar.",
  "Kaydettiğiniz {saved} kelimenin {observed} tanesi bu aralıkta arşivde gözlendi.":
    "Von Ihren {saved} gespeicherten Suchbegriffen wurden {observed} in diesem Zeitraum im Archiv beobachtet.",
  "Google Web · tüm ülkeler ve cihazlar · {zone}":
    "Google Web · alle Länder und Geräte · {zone}",
  "Eşleşen kelimelerde gözlenen gün: {observed} / {requested}":
    "Beobachtete Tage für passende Suchbegriffe: {observed} / {requested}",
  "Son doğrulanmış yanıt gösteriliyor; liste yenilenirken işlem yapmayın.":
    "Die letzte bestätigte Antwort wird angezeigt; nehmen Sie während der Listenaktualisierung keine Änderungen vor.",
  "Sıralama takibi'nde arşivi güncelle":
    "Archiv unter „Ranking-Verfolgung“ aktualisieren",
  "Gerileyenleri incele": "Rückgänge prüfen",
  "Metin ve etiket filtresine uyan kayıtlar":
    "Einträge, die den Text- und Tagfiltern entsprechen",
  "{count} kayıtlı kelime içinde": "Unter {count} gespeicherten Suchbegriffen",
  "Belirgin hareket ≥{value} sıra": "Deutliche Veränderung ≥{value} Positionen",
  "↑ {up} · ↓ {down}": "↑ {up} · ↓ {down}",
  "Karşılaştırılabilen: {comparable} / {total}":
    "Vergleichbar: {comparable} / {total}",
  "Önceki dönem okunamadı; karşılaştırma için yeniden deneyin.":
    "Der vorherige Zeitraum konnte nicht gelesen werden; versuchen Sie es für den Vergleich erneut.",
  "Belirgin değişmedi: {stable}; önceki gözlem yok: {previous}; güncel gözlem yok: {current}.":
    "Keine deutliche Veränderung: {stable}; keine vorherige Beobachtung: {previous}; keine aktuelle Beobachtung: {current}.",
  "Sıra gruplarının tabanı: {count} kayıtlı kelime (sıra grubu uygulanmadan önce).":
    "Basis der Positionsgruppen: {count} gespeicherte Suchbegriffe (vor Anwendung der Positionsgruppe).",
  "Sıra grupları; metin ve etiket filtresi sonrası tüm kayıtlar":
    "Positionsgruppen; alle Einträge nach Text- und Tagfilter",
  "Veri kapsamı ve hesaplama": "Datenumfang und Berechnung",
  "Son arşiv aktarımı: {date}": "Letzter Archivimport: {date}",
  "Tam yanıt: {complete}; sınırlı: {limited}; başarısız: {failed}; doğrulanmamış gün: {unknown}.":
    "Vollständige Antwort: {complete}; begrenzt: {limited}; fehlgeschlagen: {failed}; unbestätigte Tage: {unknown}.",
  "Önceki dönemde tam yanıt: {complete} / {days}; eşleşen gözlem günü: {observed}.":
    "Vollständige Antworten im vorherigen Zeitraum: {complete} / {days}; Tage mit passenden Beobachtungen: {observed}.",
  "Listeyi yenile yalnızca yerel veritabanını okur; Google'dan yeni veri almaz. Tarihler Pasifik takviminde üç günlük gecikme varsayımıyla seçilir; bu, tam arşiv kanıtı değildir.":
    "„Liste aktualisieren“ liest nur die lokale Datenbank; es werden keine neuen Daten von Google abgerufen. Die Daten werden nach dem pazifischen Kalender mit einer angenommenen Verzögerung von drei Tagen gewählt; dies belegt kein vollständiges Archiv.",
  "Arşiv aktarım durumu okunamadı. Son aktarım bilgisi için yeniden deneyin.":
    "Der Archivimportstatus konnte nicht gelesen werden. Versuchen Sie es für die Angaben zum letzten Import erneut.",
  "Search Console bağlantısı okunamadı. Bağlantıyı denetleyin veya yeniden deneyin.":
    "Die Search Console-Verbindung konnte nicht gelesen werden. Prüfen Sie die Verbindung oder versuchen Sie es erneut.",
  "Kelimeleriniz kayıtlı. Güncel sıra verisi için Search Console bağlantısı gerekiyor.":
    "Ihre Suchbegriffe sind gespeichert. Für aktuelle Positionsdaten ist eine Search Console-Verbindung erforderlich.",
  "Search Console bağlı; bu aralık henüz arşive alınmadı. Sıralama takibi'nden arşivi güncelleyin.":
    "Search Console ist verbunden; dieser Zeitraum ist noch nicht archiviert. Aktualisieren Sie das Archiv unter „Ranking-Verfolgung“.",
  "Son arşiv aktarımı tamamlanamadı. Sıralamalar ekranında hatayı inceleyip yeniden deneyin.":
    "Der letzte Archivimport konnte nicht abgeschlossen werden. Prüfen Sie den Fehler unter „Ranking-Verfolgung“ und versuchen Sie es erneut.",
  "Arşiv bu tarihlerin tümünü doğrulamıyor. Eksik veya sınırlı günler için Sıralama takibi'nden arşivi güncelleyin.":
    "Das Archiv bestätigt nicht alle diese Tage. Aktualisieren Sie es unter „Ranking-Verfolgung“ für fehlende oder eingeschränkte Tage.",

  "Bu sitenin son tamamlanan denetimi":
    "Letztes abgeschlossenes Audit dieser Website",
  "Bunlar kaydedilen pazar tercihleridir. Arşivdeki sıralamalar tüm ülkeleri ve cihazları kapsar; bu tercihler sıralamaları filtrelemez.":
    "Dies sind gespeicherte Markteinstellungen. Archivierte Positionen umfassen alle Länder und Geräte; diese Einstellungen filtern die Rankings nicht.",
  "Dil, seçilen ülkeye göre belirlenir. Bu, arayüz dilini değiştirmez.":
    "Die Sprache richtet sich nach dem ausgewählten Land. Die Sprache der Benutzeroberfläche bleibt gleich.",
  "Hedefinizi ekleyin": "Ziel hinzufügen",
  "Tarayıcı sekmesini kapatmak uygulamayı durdurmaz. Tamamen kapatmak için kurulumunuza göre Docker kapsayıcısını veya geliştirici sunucusunu durdurun. Bilgisayar uyurken denetimler çalışmaz.":
    "Das Schließen des Browser-Tabs beendet die App nicht. Beenden Sie je nach Installation den Docker-Container oder den Entwicklungsserver. Im Ruhezustand des Computers laufen keine Prüfungen.",
  "Burada kayıtlı mülk seçimleri gösterilir; Google erişimi bu kontrolde sınanmaz. Güncel bir okuma denemek için Bağlantıları açın, seçili mülkün raporuna gidin ve Yenile düğmesine basın.":
    "Hier sehen Sie gespeicherte Property-Auswahlen; dieser Check prüft den Google-Zugriff nicht. Für einen aktuellen Leseversuch öffnen Sie Verbindungen, gehen zum Bericht der ausgewählten Property und klicken auf Aktualisieren.",
  "Kaydedilmiş rapor": "Gespeicherter Bericht",
  "Eski rapor · kaynak ve tarih doğrulanmamış":
    "Älterer Bericht · Quelle und Datum nicht bestätigt",
  "Kaynak site: {domain}": "Quellwebsite: {domain}",
  "Kaynak site doğrulanamadı. Bu rapor başka bir siteye ait olabilir.":
    "Die Quellwebsite konnte nicht bestätigt werden. Dieser Bericht kann eine andere Website betreffen.",
  "Bu rapor projenin sitesine ait değil: {domain}.":
    "Dieser Bericht betrifft nicht die Projektwebsite: {domain}.",
  "Dosya kaydı: {date}": "Datei gespeichert: {date}",
  "Bugün karar vermeden önce raporun içindeki siteyi, ölçüm tarihini ve veri sınırlarını kontrol edin.":
    "Prüfen Sie die Website, das Messdatum und die Datengrenzen im Bericht, bevor Sie heute Entscheidungen treffen.",
  "Güncel bir denetim raporu oluştur": "Aktuellen Prüfbericht erstellen",
};
