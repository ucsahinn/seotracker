import type { Catalog } from "@/shared/i18n";

/** French for app-wide labels: Google access status, settings help, feedback form and audit errors. */
export const frApp: Catalog = {
  "Sosyal ve yapılandırılmış veri": "Réseaux sociaux et données structurées",
  "Bir ayarı değiştirdim, uygulama görmüyor":
    "J'ai modifié un réglage et l'application ne le voit pas",
  "Google erişimi, PageSpeed anahtarı ve dil Ayarlar ekranında girilir ve hemen geçerli olur. Windows paketinde .env dosyası ve ortam değişkeni yoktur.":
    "L'accès Google, la clé PageSpeed et la langue se saisissent dans l'écran Paramètres et s'appliquent immédiatement. Le package Windows n'a ni fichier .env ni variables d'environnement.",
  "Elle değiştirilebilen tek dosya {config}: adres numarası (port) ve kendiliğinden güncelleme. {dataFolder} ile açın, değiştirin, sonra {restart} deyin. Yanındaki {serverEnv} dosyasını düzenlemeyin; uygulama her açılışta onu yeniden yazar.":
    "Le seul fichier à modifier à la main est {config} : le port et les mises à jour automatiques. Ouvrez-le avec {dataFolder} (Ouvrir le dossier de données), modifiez-le, puis choisissez {restart} (Redémarrer). Ne modifiez pas le fichier {serverEnv} à côté ; l'application le réécrit à chaque démarrage.",
  "Ayarlar ekranında girilenler hemen geçerli olur. {env} dosyasındaki değişkenler (örneğin {port}, {host}, {token}) ise yalnızca konteyner yeniden oluşturulunca okunur: {command}":
    "Ce que vous saisissez dans l'écran Paramètres s'applique immédiatement. Les variables du fichier {env} (par exemple {port}, {host}, {token}) ne sont lues qu'à la recréation du conteneur : {command}",
  "Yalnızca yeniden başlatmak için: {command} Bu, .env değişikliğini uygulamaz. {docs}":
    "Pour seulement redémarrer : {command} Cela n'applique pas une modification du .env. {docs}",
  "Ortam değişkenleri": "Variables d'environnement",
  "Rapor hazırlanıyor…": "Préparation du rapport…",
  "Dizin durumu kontrol ediliyor": "Vérification de l'état de l'index",
  "Yanıt gönderilemedi ({status})":
    "Impossible d'envoyer votre réponse ({status})",
  "Yanıt gönderilemedi": "Impossible d'envoyer votre réponse",
  "Bu kurulumdan daha önce yanıt verildi.":
    "Cette installation a déjà répondu.",
  "Çok hızlı yanıt gönderildi. Biraz sonra yeniden deneyin.":
    "Trop de réponses. Réessayez dans un instant.",
  "Kişisel bilgi paylaşmayın": "N'indiquez aucune donnée personnelle",
  "Adınız veya hesabınız alınmaz. Aynı tarayıcıda saklanan katılımcı anahtarıyla bir kez yanıt verilebilir; bu, kişi başına tek yanıt garantisi değildir. Yanıtınız yöneticiler tarafından görülebilir. Kişisel bilgi yazmayın.":
    "Nous ne collectons ni votre nom ni de compte. Une seule réponse est autorisée par clé de navigateur enregistrée ; cela ne garantit pas une réponse par personne. Les administrateurs peuvent consulter votre réponse. N'indiquez aucune donnée personnelle.",
  Yanıtla: "Envoyer la réponse",
  "Gönderiliyor…": "Envoi…",
  "Denetim uygulamadaki bir hata yüzünden durdu.":
    "L'audit s'est arrêté à cause d'une erreur dans l'application.",
  "Sorun sitenizde değil. Denetimi yeniden başlatın. Tekrarlarsa Yardım ekranından tanı paketini indirip sorun kaydına ekleyin. Hata kodu: {code}":
    "Votre site n'est pas en cause. Relancez l'audit. Si cela se reproduit, téléchargez le paquet de diagnostic depuis l'Aide et joignez-le à un ticket. Code d'erreur : {code}",
};
