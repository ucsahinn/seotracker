import type { Catalog } from "@/shared/i18n";

/** German for app-wide labels: Google access status, settings help, feedback form and audit errors. */
export const deApp: Catalog = {
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
};
