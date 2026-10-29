import type { Catalog } from "@/shared/i18n";

/** French for app-wide labels: Google access status, settings help, feedback form and audit errors. */
export const frApp: Catalog = {
  "Arşiv özeti": "Résumé de l’archive",
  "{observed}/{days} gün gözlem; {complete}/{days} gün tam yanıt.":
    "Observations sur {observed}/{days} jours ; réponses complètes sur {complete}/{days} jours.",
  "Arşiv kapsamını incele": "Examiner la couverture de l’archive",
  "Bu bölüm başka bir yerde değişti. Metinleri karşılaştırıp taslağınızı birleştirin.":
    "Cette section a été modifiée ailleurs. Comparez les textes et fusionnez votre brouillon.",
  "Düzenleme başındaki metin": "Texte au début de la modification",
  "Son kayıtlı metin": "Dernier texte enregistré",
  "Karşılaştırdım, birleştirilmiş taslağı kullan":
    "Comparaison faite ; utiliser le brouillon fusionné",
  "Son doksan gündeki en yeni yirmi kayıt gösterilir. Tarihi sunucu UTC gününe göre belirler.":
    "Les vingt entrées les plus récentes des quatre-vingt-dix derniers jours sont affichées. Les dates suivent le jour UTC du serveur.",
  "Bu zaman aralığında gösterilmeyen daha eski kayıtlar var.":
    "Des entrées plus anciennes de cette période ne sont pas affichées.",
  "Önceki: {previous} → {current}": "Avant : {previous} → {current}",
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
  "Yanıtınız alındı": "Votre réponse a été enregistrée",
  "{count} yanıt": { one: "{count} réponse", other: "{count} réponses" },
  "PowerShell: parolayı ekrana yazdırmadan panoya kopyalayın. Yalnızca MCP istemcinizin yerel gizli başlık alanına yapıştırın, ardından panoyu temizleyin. Sohbete yapıştırmayın.":
    "PowerShell : copiez le mot de passe dans le presse-papiers sans l'afficher. Collez-le uniquement dans le champ d'en-tête secret local de votre client MCP, puis videz le presse-papiers. Ne le collez pas dans la conversation.",
  "Google Analytics mülkü seçildi": "Propriété Google Analytics sélectionnée",
  "Mülk seçim tarihi: {date}": "Date de sélection de la propriété : {date}",
  "Kimlik yöntemi: hizmet hesabı":
    "Méthode d'authentification : compte de service",
  "Kimlik yöntemi: Google OAuth": "Méthode d'authentification : Google OAuth",
  "Saat dilimi: {timezone} · Para birimi: {currency}":
    "Fuseau horaire : {timezone} · Devise : {currency}",
  "Search Console mülkü seçildi": "Propriété Search Console sélectionnée",
  "Bağlantı ayarları yenilenemedi. Son kayıt gösteriliyor; erişim durumu bilinmiyor.":
    "Impossible d'actualiser les paramètres de connexion. Le dernier enregistrement est affiché ; l'état de l'accès est inconnu.",
  "Google izni geçersiz veya süresi dolmuş. İlgili Google hesabını yeniden bağlayın.":
    "L'autorisation Google est invalide ou a expiré. Reconnectez le compte Google concerné.",
  "Google bu mülke erişimi reddetti. Seçilen hesabın mülk izinlerini kontrol edin.":
    "Google a refusé l'accès à cette propriété. Vérifiez les autorisations du compte sélectionné pour cette propriété.",
  "Google API etkin değil. Google Cloud projesinde ilgili API'yi etkinleştirip yeniden deneyin.":
    "L'API Google n'est pas activée. Activez l'API concernée dans le projet Google Cloud, puis réessayez.",
  "Google istek sınırına ulaşıldı. Bir süre bekleyin ve Google Cloud kota ekranını kontrol edin.":
    "La limite de requêtes Google est atteinte. Patientez et consultez les quotas dans Google Cloud.",
  "Google zamanında yanıt vermedi. Bağlantıyı kontrol edip yeniden deneyin; mevcut mülk seçimi korunur.":
    "Google n'a pas répondu à temps. Vérifiez la connexion et réessayez ; la propriété sélectionnée est conservée.",
  "Google bağlantı yanıtı okunamadı; erişiminizin olmadığı sonucu çıkarılamaz. Yeniden deneyin. Sürerse Yardım ekranından tanılama paketini alıp sorunu bildirin.":
    "La réponse de connexion Google n'a pas pu être lue ; cela ne permet pas de conclure que vous n'avez pas accès. Réessayez. Si le problème persiste, récupérez le paquet de diagnostic dans l'écran Aide et signalez le problème.",
  "Mülk seçimi kayıtlıdır. Veri erişimi bu ayar okumasıyla doğrulanmaz; son veri durumunu ilgili rapordan kontrol edin.":
    "La sélection de la propriété est enregistrée. La lecture de ce paramètre ne vérifie pas l'accès aux données ; consultez leur dernier état dans le rapport concerné.",
  "Kurulumun Google kimlik ayarları":
    "Identifiants Google de cette installation",
  "Google mülk listesi okunamadı. Bu durum erişiminiz olmadığı anlamına gelmez. Son liste korunur; yeniden deneyin veya Yardım tanılamasını kontrol edin.":
    "Impossible de lire la liste des propriétés Google. Cela ne signifie pas que vous n'avez pas accès. La dernière liste est conservée ; réessayez ou consultez le diagnostic dans l'écran Aide.",
  "Mülk seçili": "Propriété sélectionnée",
  "En fazla {count} karakter": "{count} caractères maximum",
  "İsteğe bağlı rakip notu eklenmemiş. Bu liste rakip sıralaması ölçmez.":
    "Aucune note facultative sur les concurrents. Cette liste ne mesure pas leur classement.",
  "İsteğe bağlı sayfa listesi boş. Sayfa rolleri sizin notlarınızdır; ölçülen dönüşüm değildir.":
    "La liste facultative des pages est vide. Les rôles des pages sont vos notes, pas des conversions mesurées.",
  "Search Console bağlantısı kayıtlı. Veri durumunu Arama performansında görün.":
    "La connexion Search Console est enregistrée. Consultez l'état des données dans Performances de recherche.",
  "Analytics bağlantısı kayıtlı. Veri durumunu Analytics ekranında görün.":
    "La connexion Analytics est enregistrée. Consultez l'état des données dans l'écran Analytics.",
  "Bağlı değil. Oturum ve dönüşüm analizi için Analytics bağlayın; arama tıklamalarını Search Console ile inceleyebilirsiniz.":
    "Non connecté. Connectez Analytics pour analyser les sessions et les conversions ; vous pouvez étudier les clics de recherche avec Search Console.",
  "Anahtar kayıtlı. Google kotası veya hizmet hatası hız ölçümünü yine engelleyebilir.":
    "La clé est enregistrée. Les quotas Google ou une erreur du service peuvent tout de même empêcher la mesure de vitesse.",
  "Anahtar yok. Ortak Google kotası hız ölçümünü sınırlayabilir; Ayarlar’dan kendi anahtarınızı ekleyin.":
    "Aucune clé. Le quota Google partagé peut limiter les mesures de vitesse ; ajoutez votre propre clé dans Paramètres.",
  "Son yedi günde başlatılıp tamamlanmış bu siteye ait denetim var.":
    "Un audit de ce site a été lancé et terminé au cours des sept derniers jours.",
  "Son yedi günde başlatılıp tamamlanmış bu-site denetimi yok. Site denetiminden yeni bir denetim başlatın.":
    "Aucun audit de ce site n'a été lancé et terminé au cours des sept derniers jours. Lancez-en un depuis Audit du site.",
  "Bu kurulumda bir ajan en az bir araç kullandı.":
    "Un agent a utilisé au moins un outil dans cette installation.",
  "Bu kurulumda kayıtlı araç çağrısı yok. Ajan kurulumu adımlarını izleyin.":
    "Aucun appel d'outil n'est enregistré dans cette installation. Suivez les étapes de configuration de l'agent.",
  "Kayıtlı bağlantılar ve proje notları. Bu liste bir SEO başarı puanı veya canlı bağlantı testi değildir.":
    "Connexions et notes de projet enregistrées. Cette liste n'est ni un score de réussite SEO ni un test de connexion en direct.",
  "Kurulum ve proje notları farklı anlarda okundu. Tutarlı durum için bilgiyi yenileyin.":
    "L'installation et les notes du projet ont été lues à des moments différents. Actualisez les informations pour obtenir un état cohérent.",
  "{done}/{total} kayıtlı · {missing} eksik · {unknown} okunamadı":
    "{done}/{total} enregistrés · {missing} manquants · {unknown} illisibles",
  "Kurulum yenilenemedi; son alınan durum gösteriliyor. Yeniden deneyin.":
    "Impossible d'actualiser l'installation ; le dernier état reçu est affiché. Réessayez.",
  "Kaydedilmemiş değişiklikleriniz var. Bu sayfadan ayrılmak istiyor musunuz?":
    "Vous avez des modifications non enregistrées. Voulez-vous quitter cette page ?",
  "İstemi kopyalayıp Claude Code ya da Codex'e yapıştırın. Bu istem ajandan kaydetmeden önce onayınızı istemesini ister. Araç çağrıları bilgiyi hemen kaydedebilir; onay davranışı ajanınıza bağlıdır.":
    "Copiez l'instruction et collez-la dans Claude Code ou Codex. Elle demande à l'agent d'obtenir votre accord avant d'enregistrer. Les appels d'outils peuvent enregistrer les informations immédiatement ; la demande d'accord dépend de votre agent.",
  "İstemi kopyalayıp ajana yapıştırın. Bu istem ajandan mevcut notları gözden geçirmesini ve kaydetmeden önce onayınızı istemesini ister. Uygulama araçları ayrıca bir onay kapısı uygulamaz.":
    "Copiez l'instruction et collez-la dans votre agent. Elle lui demande de relire les notes existantes et d'obtenir votre accord avant d'enregistrer. Les outils de l'application n'imposent pas de validation supplémentaire.",
  "Ajanın kullanabileceği kayıtlı proje notları. Kaydedilen bilgiyi, son yazanı ve eksikleri gözden geçirin.":
    "Notes de projet enregistrées, utilisables par l'agent. Vérifiez les informations, le dernier auteur et les éléments manquants.",
  "Son kayıtlı bilgi gösteriliyor; yenileme başarısız. Taslaklarınız korunuyor.":
    "Les dernières informations enregistrées sont affichées ; l'actualisation a échoué. Vos brouillons sont conservés.",
  "{filled}/{total} bölüm dolu": "{filled}/{total} sections remplies",
  "Şu anki hedef kayıtlı değil. Hedef bölümüne bu dönem başarmak istediğinizi yazın.":
    "L'objectif actuel n'est pas enregistré. Indiquez dans la section Objectif ce que vous souhaitez accomplir sur cette période.",
  "İlk boş bölümü doldur": "Remplir la première section vide",
  "Bölüme git": "Aller à la section",
  "Bölüm seçin": "Choisir une section",
  "Ajanla taslak hazırla": "Préparer un brouillon avec l'agent",
  "Proje kimliği okunmadan istem hazırlanamaz. Proje listesini yeniden yükleyin.":
    "Impossible de préparer l'instruction sans avoir lu l'identifiant du projet. Rechargez la liste des projets.",
  "Kaynak ve kurulum": "Source et installation",
  "En yeni en fazla yirmi kayıt gösterilir. Tarihi sunucu UTC gününe göre belirler. Doksan günden eski kayıtlar yeni kayıt eklenirken temizlenir; bu liste eksiksiz geçmiş değildir.":
    "Seuls les vingt enregistrements les plus récents sont affichés. La date suit le jour UTC du serveur. Les enregistrements de plus de quatre-vingt-dix jours sont supprimés lors de l'ajout d'un nouveau ; cette liste n'est pas un historique complet.",
  "Bilgi kaydedilemedi. Taslağınız korunuyor; alanları kontrol edip yeniden kaydedin.":
    "Impossible d'enregistrer les informations. Votre brouillon est conservé ; vérifiez les champs et enregistrez à nouveau.",
  "Proje verileri okunamadı. Listeyi yenileyerek yeniden deneyin.":
    "Impossible de lire les données du projet. Actualisez la liste et réessayez.",
  "Bazı kaynaklar okunamadı; gösterilen diğer bilgiler korunuyor.":
    "Certaines sources n'ont pas pu être lues ; les autres informations affichées sont conservées.",
  "Arama arşivi · Web · tüm cihazlar ve ülkeler":
    "Archives de recherche · Web · tous les appareils et pays",
  "{observed}/{total} gün kayıtlı; toplam yalnızca kayıtlı günleri içerir.":
    "{observed}/{total} jours enregistrés ; le total ne comprend que les jours enregistrés.",
  "Kayıtlı günlerde ölçülen tıklama sayısı sıfır.":
    "Le nombre de clics mesurés sur les jours enregistrés est nul.",
  "Önceki dönem: {start} – {end} · {observed}/{total} gün kayıtlı":
    "Période précédente : {start} – {end} · {observed}/{total} jours enregistrés",
  "İki dönemin de tüm günleri kayıtlı olmadığı için değişim hesaplanmadı.":
    "L'évolution n'a pas été calculée, car au moins une des périodes n'est pas entièrement enregistrée.",
  "Arşiv kaynağı": "Source des archives",
  "Son kayıtlı gün: {date}": "Dernier jour enregistré : {date}",
  "Son arşiv okuması: {date}": "Dernière lecture des archives : {date}",
  "Kesinleşme kaynağı arşivde kayıtlı değil":
    "La source de confirmation des données définitives n'est pas enregistrée dans les archives",
  "Bu kurulumda henüz arama arşivi yok. Arama performansını açarak veriyi okuyun.":
    "Cette installation n'a pas encore d'archives de recherche. Ouvrez Performances de recherche pour lire les données.",
  "Son tamamlanan bu-site denetimi": "Dernier audit terminé de ce site",
  "Başlangıç: {date}": "Début : {date}",
  "Tamamlanma: {date}": "Fin : {date}",
  "Bu denetim en az yedi gün önce başlatıldı. Güncel durum için yeni denetim başlatın.":
    "Cet audit a été lancé il y a au moins sept jours. Lancez-en un nouveau pour connaître l'état actuel.",
  "Denetimi aç": "Ouvrir l'audit",
  "Bu site için tamamlanmış denetim yok. Siteyi seçip denetim başlatın.":
    "Aucun audit terminé pour ce site. Sélectionnez le site et lancez un audit.",
  "Son deneme başarısız": "Dernière tentative échouée",
  "Son denetim sürüyor": "Dernier audit en cours",
  "Son deneme tamamlanmadı": "Dernière tentative non terminée",
  "Bağlantı kaydı, verinin başarıyla okunduğunu göstermez.":
    "Une connexion enregistrée ne confirme pas que les données ont été lues correctement.",
  "Bağlantı kayıtlı": "Connexion enregistrée",
  "Ülke ve dil, kaydettiğiniz kelimelerin varsayılan pazarıdır. Arama performansında ülkeyi filtrelerden seçersiniz; bu ayar geçmiş veriyi değiştirmez.":
    "Le pays et la langue définissent le marché par défaut de vos mots-clés enregistrés. Dans Performances de recherche, choisissez le pays dans les filtres ; ce paramètre ne modifie pas les données historiques.",
  "Denetim bu adresten başlar. Google mülkünü Bağlantılar bölümünden ayrıca seçersiniz. https:// olmadan yazın, örneğin example.com.":
    "L'audit commence à cette adresse. Sélectionnez séparément la propriété Google dans Connexions. Saisissez l'adresse sans https://, par exemple example.com.",
  "Alan adı değişikliği Google mülk seçimini ve geçmiş kayıtları değiştirmez. Kaydetmeden önce Bağlantılar bölümündeki mülkün bu siteye ait olduğunu kontrol edin.":
    "Changer le domaine ne modifie ni la propriété Google sélectionnée ni les enregistrements historiques. Avant d'enregistrer, vérifiez dans Connexions que la propriété correspond à ce site.",
  "Marka terimlerini Arama performansında düzenleyin":
    "Modifier les termes de marque dans Performances de recherche",
  "Google mülk seçimi ve geçmiş korunarak alan adının değiştirilmesini onaylıyorum.":
    "Je confirme le changement de domaine en conservant la propriété Google sélectionnée et les enregistrements historiques.",
  "Sınırları gösterilen proje": "Projet dont les limites sont affichées",
  "Sınırlar yenilenemedi; son kayıt gösteriliyor":
    "Impossible d'actualiser les limites ; le dernier enregistrement est affiché",
  "{state} · {count} kaynak bilinmiyor": "{state} · {count} sources inconnues",
  "Bilinen sınırlarda sorun yok": "Aucun problème avec les limites connues",
  "Rapor indirmesi bağlantı hatası veya zaman aşımı nedeniyle tamamlanamadı. Bağlantınızı kontrol edip yeniden indirin.":
    "Le téléchargement du rapport a échoué à cause d'une erreur de connexion ou d'un délai dépassé. Vérifiez votre connexion et relancez le téléchargement.",
  "Rapor indirmesi başka bir sayfaya yönlendirildi. Uygulamayı yenileyip erişiminizi kontrol edin.":
    "Le téléchargement du rapport a été redirigé vers une autre page. Actualisez l'application et vérifiez votre accès.",
  "Rapor bulunamadı veya erişiminiz yok. Listeyi yenileyip raporu yeniden seçin.":
    "Rapport introuvable ou accès refusé. Actualisez la liste et sélectionnez à nouveau le rapport.",
  "Rapor erişimi doğrulanamadı. Uygulamayı yenileyip yeniden indirin.":
    "Impossible de vérifier l'accès au rapport. Actualisez l'application et relancez le téléchargement.",
  "Rapor sunucusu indirmeyi tamamlayamadı. Biraz sonra yeniden indirin.":
    "Le serveur de rapports n'a pas pu terminer le téléchargement. Réessayez plus tard.",
  "Kaydedildi: {date}": "Enregistré le : {date}",
  "Arama performansı ekranında dönem ve süzgeçleri seçip Raporu indir düğmesini kullanın. Kaydedilmiş raporlar kaynak bağlantısı kesilse de okunabilir.":
    "Dans Performances de recherche, sélectionnez la période et les filtres, puis utilisez Télécharger le rapport. Les rapports enregistrés restent lisibles même si la source est déconnectée.",
  Sıralama: "Tri",
  "Oluşturulma zamanı": "Date de création",
  "{matching} sonuç / projedeki {total} rapor":
    "{matching} résultats / {total} rapports dans le projet",
  "Son 7 gün, bu sürede kaydedilen veya güncellenen ayrı dosyaları süzer; kaynak verinin güncelliğini göstermez. Arama başlık ve kayıtlı özeti tarar.":
    "Les 7 derniers jours filtrent les fichiers distincts enregistrés ou modifiés pendant cette période ; cela n'indique pas la fraîcheur des données sources. La recherche porte sur les titres et les résumés enregistrés.",
  "Tür sayıları arama ve Son 7 gün süzgecine göredir; seçili türden önce hesaplanır.":
    "Les nombres par type tiennent compte de la recherche et du filtre 7 derniers jours ; ils sont calculés avant le filtre du type sélectionné.",
  "Aramayı veya türü temizleyerek kayıtlı raporları görün.":
    "Effacez la recherche ou le type pour voir les rapports enregistrés.",
  "Arama performansı veya Site denetimi ekranından rapor hazırlayın ya da rapor komutunu ajanınıza yapıştırın.":
    "Préparez un rapport depuis Performances de recherche ou Audit du site, ou collez la commande de rapport dans votre agent.",
  "Veri dönemi: raporun içinde kontrol edin.":
    "Période des données : à vérifier dans le rapport.",
  Şablon: "Modèle",
  "{start}–{end} / {total}": "{start}–{end} / {total}",
  Sonraki: "Suivant",
  "Saklama durumu": "État du stockage",
  "Saklama bilgileri alınamadı. Bu durum boş alan olduğunu göstermez; bağlantıyı kontrol edip yeniden deneyin.":
    "Impossible de récupérer les informations de stockage. Cela ne signifie pas qu'il reste de l'espace libre ; vérifiez la connexion et réessayez.",
  "Son güncellenen rapor": "Dernier rapport mis à jour",
  "Bu rapora özet kaydedilmemiş. Bulguları ve ilk adımı raporun içinde kontrol edin.":
    "Aucun résumé n'est enregistré pour ce rapport. Consultez les constats et la première action dans le rapport.",
  "Kaydedildi: {date}. Bu zaman, kaynak verinin ölçüm tarihi değildir.":
    "Enregistré le : {date}. Cette date n'est pas celle de la mesure des données sources.",
  "Bu raporun veri dönemi yapılandırılmış olarak kaydedilmemiş. Dönemi ve veri sınırlarını raporun içinde kontrol edin.":
    "La période des données de ce rapport n'a pas été enregistrée sous forme structurée. Vérifiez la période et les limites des données dans le rapport.",
  "Raporu aç": "Ouvrir le rapport",
  "Rapor belgesi bulunamadı veya erişiminiz yok. Listeyi yenileyip raporu yeniden seçin.":
    "Document du rapport introuvable ou accès refusé. Actualisez la liste et sélectionnez à nouveau le rapport.",
  "Raporun kullanılabilirliği doğrulanamadı. Sunucuya veya bağlantınıza erişilemiyor; yeniden deneyin.":
    "Impossible de vérifier la disponibilité du rapport. Le serveur ou votre connexion est inaccessible ; réessayez.",
  "Rapor önizlemesi zamanında açılmadı. Bağlantıyı kontrol edin; yeniden deneyin veya yeni sekmede açın.":
    "L'aperçu du rapport ne s'est pas ouvert à temps. Vérifiez la connexion ; réessayez ou ouvrez-le dans un nouvel onglet.",
  "Arşiv ayrıntısı": "Détails des archives",
  "Dönem: {start} – {end}": "Période : {start} – {end}",
  "Sıra bilinmiyor": "Position inconnue",
  "Önceki dönem: {start} – {end}": "Période précédente : {start} – {end}",
  "Önceki ortalama sıra": "Position moyenne précédente",
  Gösterimler: "Impressions",
  "Sıra arşivi okunamadı. Liste kayıtlı; sıra bilgisi için yeniden deneyin.":
    "Impossible de lire les archives des positions. La liste est enregistrée ; réessayez pour obtenir les positions.",
  "Eksik arşiv nedeniyle gözlem yokluğu doğrulanamaz":
    "L'absence d'observations ne peut pas être confirmée car les archives sont incomplètes",
  "Okunan arşivde eşleşen gözlem yok":
    "Aucune observation correspondante dans les archives lues",
  "Eşleşen ham sorgular; gösterimle ağırlıklandırılır":
    "Requêtes brutes correspondantes ; pondérées par les impressions",
  "Önceki dönemin ham sorguları": "Requêtes brutes de la période précédente",
  "Gözlem yok": "Aucune observation",
  "Konum ve dil kayıt bilgisi olarak korunur. Arşiv tüm ülkeleri ve cihazları kapsar. Türkçe büyük/küçük harf ve birden fazla boşluk eşleştirilir; ham sorgular gösterimle ağırlıklandırılır. Google bazı nadir sorguları döndürmeyebilir.":
    "Le lieu et la langue sont conservés comme informations d'enregistrement. Les archives couvrent tous les pays et appareils. La correspondance tient compte de la casse turque et des espaces multiples ; les requêtes brutes sont pondérées par les impressions. Google peut omettre certaines requêtes rares.",
  "Kayıtlı pazar (arşiv filtresi değil)":
    "Marché enregistré (pas un filtre des archives)",
  "Eski kayıt bilgisi: {intent}; tarih: {date}":
    "Ancienne information enregistrée : {intent} ; date : {date}",
  "Arama amacı ölçülmedi": "Intention de recherche non mesurée",
  "Canlı arama son 28 günü ve metni içeren sorguları açar; bu arşiv ortalamasıyla aynı dönem veya tam eşleşme değildir.":
    "La recherche en direct ouvre les 28 derniers jours et les requêtes contenant le texte ; elle ne correspond ni à la période de la moyenne archivée ni à une correspondance exacte.",
  "Arama performansında ara (canlı dönem)":
    "Rechercher dans Performances de recherche (période en direct)",
  "Günlük arşiv gözlemlerini göster":
    "Afficher les observations quotidiennes des archives",
  "Günlük arşiv okunamadı veya liste değişti. Ayrıntıyı kapatıp listeyi yenileyin; ardından yeniden açın.":
    "Impossible de lire les archives quotidiennes, ou la liste a changé. Fermez les détails, actualisez la liste, puis rouvrez-les.",
  "Bu tarihlerde eşleşen günlük gözlem yok; eksik günler sıfır sayılmaz.":
    "Aucune observation quotidienne correspondante sur ces dates ; les jours manquants ne comptent pas comme des zéros.",
  "Eklenen terimlerin tümü eşleşmelidir.":
    "Tous les termes ajoutés doivent correspondre.",
  "Eklenen terimlerden hiçbiri bulunmamalıdır.":
    "Aucun des termes ajoutés ne doit être présent.",
  "En fazla {count} terim.": "{count} termes maximum.",
  "Terim sınırı aşıldı. Eklemek için önce bir terimi kaldırın.":
    "Limite de termes dépassée. Retirez d'abord un terme pour en ajouter un.",
  "Seçtiğiniz kelimelerin arşiv gözlemlerini, karşılaştırılabilir hareketlerini ve eksik kanıtlarını inceleyin.":
    "Examinez les observations archivées, les évolutions comparables et les éléments manquants pour les mots-clés choisis.",
  "Liste yanıtı: {date}": "Réponse de la liste : {date}",
  "Arşiv dönemi": "Période des archives",
  "{count} gün": "{count} jours",
  "Listeyi yenile": "Actualiser la liste",
  "Filtrelenen {count} kelimeyi aktar":
    "Exporter les {count} mots-clés filtrés",
  "Kelime ara; tüm terimler eşleşir":
    "Rechercher des mots-clés ; tous les termes doivent correspondre",
  "Terimleri virgülle ayırın": "Séparez les termes par des virgules",
  "Filtre uygulanıyor…": "Application du filtre…",
  "En fazla {count} terim girin; fazla terimleri kaldırın.":
    "Saisissez au maximum {count} termes ; retirez les termes en trop.",
  "Etkin sıra grubu: {band}": "Groupe de positions actif : {band}",
  "Belirgin gerileyenler": "Baisses marquées",
  "Sıra özeti okunamadı; kayıtlı liste kullanılabilir":
    "Impossible de lire le résumé des positions ; la liste enregistrée reste disponible",
  "Sıra grubu uygulanamadı; sıra arşivi okunamadı. Yeniden deneyin veya grubu temizleyin.":
    "Impossible d'appliquer le groupe de positions ; les archives des positions n'ont pas pu être lues. Réessayez ou effacez le groupe.",
  "Sıra 1–3": "Positions 1–3",
  "Sıra 4–10": "Positions 4–10",
  "Sıra 11–20": "Positions 11–20",
  "Sıra 21+": "Positions 21 et plus",
  "Gözlenen kelimeler": "Mots-clés observés",
  "{shown} / {total} kayıtlı kelime; seçim yalnızca bu sayfada":
    "{shown} / {total} mots-clés enregistrés ; sélection limitée à cette page",
  "Kayıtlı kelimelerin arşiv özeti":
    "Résumé des archives des mots-clés enregistrés",
  "Kelimeler kayıtlı; sıra karşılaştırması şu anda kullanılamıyor.":
    "Les mots-clés sont enregistrés ; la comparaison des positions est actuellement indisponible.",
  "Kaydettiğiniz {saved} kelimenin {observed} tanesi bu aralıkta arşivde gözlendi.":
    "Parmi vos {saved} mots-clés enregistrés, {observed} ont été observés dans les archives sur cette période.",
  "Google Web · tüm ülkeler ve cihazlar · {zone}":
    "Google Web · tous les pays et appareils · {zone}",
  "Eşleşen kelimelerde gözlenen gün: {observed} / {requested}":
    "Jours observés pour les mots-clés correspondants : {observed} / {requested}",
  "Son doğrulanmış yanıt gösteriliyor; liste yenilenirken işlem yapmayın.":
    "La dernière réponse vérifiée est affichée ; n'effectuez aucune opération pendant l'actualisation de la liste.",
  "Sıralama takibi'nde arşivi güncelle":
    "Actualiser les archives dans Suivi des classements",
  "Gerileyenleri incele": "Examiner les baisses",
  "Metin ve etiket filtresine uyan kayıtlar":
    "Enregistrements correspondant aux filtres de texte et d'étiquettes",
  "{count} kayıtlı kelime içinde": "Parmi {count} mots-clés enregistrés",
  "Belirgin hareket ≥{value} sıra": "Évolution marquée ≥{value} positions",
  "↑ {up} · ↓ {down}": "↑ {up} · ↓ {down}",
  "Karşılaştırılabilen: {comparable} / {total}":
    "Comparables : {comparable} / {total}",
  "Önceki dönem okunamadı; karşılaştırma için yeniden deneyin.":
    "Impossible de lire la période précédente ; réessayez pour obtenir la comparaison.",
  "Belirgin değişmedi: {stable}; önceki gözlem yok: {previous}; güncel gözlem yok: {current}.":
    "Pas d'évolution marquée : {stable} ; sans observation précédente : {previous} ; sans observation actuelle : {current}.",
  "Sıra gruplarının tabanı: {count} kayıtlı kelime (sıra grubu uygulanmadan önce).":
    "Base des groupes de positions : {count} mots-clés enregistrés (avant application du groupe de positions).",
  "Sıra grupları; metin ve etiket filtresi sonrası tüm kayıtlar":
    "Groupes de positions ; tous les enregistrements après les filtres de texte et d'étiquettes",
  "Veri kapsamı ve hesaplama": "Couverture des données et calcul",
  "Son arşiv aktarımı: {date}": "Dernier import des archives : {date}",
  "Tam yanıt: {complete}; sınırlı: {limited}; başarısız: {failed}; doğrulanmamış gün: {unknown}.":
    "Réponses complètes : {complete} ; limitées : {limited} ; en échec : {failed} ; jours non vérifiés : {unknown}.",
  "Önceki dönemde tam yanıt: {complete} / {days}; eşleşen gözlem günü: {observed}.":
    "Réponses complètes sur la période précédente : {complete} / {days} ; jours d'observations correspondantes : {observed}.",
  "Listeyi yenile yalnızca yerel veritabanını okur; Google'dan yeni veri almaz. Tarihler Pasifik takviminde üç günlük gecikme varsayımıyla seçilir; bu, tam arşiv kanıtı değildir.":
    "Actualiser la liste lit uniquement la base locale ; aucune nouvelle donnée n'est récupérée auprès de Google. Les dates suivent le calendrier du Pacifique avec un décalage supposé de trois jours ; cela ne prouve pas que les archives sont complètes.",
  "Arşiv aktarım durumu okunamadı. Son aktarım bilgisi için yeniden deneyin.":
    "Impossible de lire l'état de l'import des archives. Réessayez pour obtenir les informations du dernier import.",
  "Search Console bağlantısı okunamadı. Bağlantıyı denetleyin veya yeniden deneyin.":
    "Impossible de lire la connexion Search Console. Vérifiez la connexion ou réessayez.",
  "Kelimeleriniz kayıtlı. Güncel sıra verisi için Search Console bağlantısı gerekiyor.":
    "Vos mots-clés sont enregistrés. Une connexion Search Console est nécessaire pour obtenir des positions récentes.",
  "Search Console bağlı; bu aralık henüz arşive alınmadı. Sıralama takibi'nden arşivi güncelleyin.":
    "Search Console est connecté ; cette période n'est pas encore archivée. Actualisez les archives dans Suivi des classements.",
  "Son arşiv aktarımı tamamlanamadı. Sıralamalar ekranında hatayı inceleyip yeniden deneyin.":
    "Le dernier import des archives n'a pas pu aboutir. Consultez l'erreur dans Suivi des classements et réessayez.",
  "Arşiv bu tarihlerin tümünü doğrulamıyor. Eksik veya sınırlı günler için Sıralama takibi'nden arşivi güncelleyin.":
    "Les archives ne confirment pas tous ces jours. Actualisez-les dans Suivi des classements pour les jours manquants ou limités.",

  "Bu sitenin son tamamlanan denetimi": "Dernier audit terminé pour ce site",
  "Bunlar kaydedilen pazar tercihleridir. Arşivdeki sıralamalar tüm ülkeleri ve cihazları kapsar; bu tercihler sıralamaları filtrelemez.":
    "Il s’agit de préférences de marché enregistrées. Les positions archivées couvrent tous les pays et appareils ; ces préférences ne filtrent pas les classements.",
  "Dil, seçilen ülkeye göre belirlenir. Bu, arayüz dilini değiştirmez.":
    "La langue dépend du pays sélectionné. Cela ne change pas la langue de l’interface.",
  "Hedefinizi ekleyin": "Ajouter votre objectif",
  "Tarayıcı sekmesini kapatmak uygulamayı durdurmaz. Tamamen kapatmak için kurulumunuza göre Docker kapsayıcısını veya geliştirici sunucusunu durdurun. Bilgisayar uyurken denetimler çalışmaz.":
    "Fermer l’onglet du navigateur n’arrête pas l’application. Pour l’arrêter, arrêtez le conteneur Docker ou le serveur de développement, selon votre installation. Les audits ne s’exécutent pas lorsque l’ordinateur est en veille.",
  "Burada kayıtlı mülk seçimleri gösterilir; Google erişimi bu kontrolde sınanmaz. Güncel bir okuma denemek için Bağlantıları açın, seçili mülkün raporuna gidin ve Yenile düğmesine basın.":
    "Les propriétés affichées sont celles enregistrées ; ce contrôle ne teste pas l’accès à Google. Pour tenter une lecture actuelle, ouvrez Connexions, accédez au rapport de la propriété sélectionnée et cliquez sur Actualiser.",
  "Kaydedilmiş rapor": "Rapport enregistré",
  "Eski rapor": "Ancien rapport",
  "Dosya kaydı": "Fichier enregistré",
  Doğrulanmadı: "Non vérifié",
  "Eski rapor · kaynak ve tarih doğrulanmamış":
    "Ancien rapport · source et date non vérifiées",
  "Kaynak site: {domain}": "Site source : {domain}",
  "Kaynak site doğrulanamadı. Bu rapor başka bir siteye ait olabilir.":
    "Le site source n’a pas pu être vérifié. Ce rapport peut concerner un autre site.",
  "Bu rapor projenin sitesine ait değil: {domain}.":
    "Ce rapport ne concerne pas le site du projet : {domain}.",
  "Dosya kaydı: {date}": "Fichier enregistré le {date}",
  "Bugün karar vermeden önce raporun içindeki siteyi, ölçüm tarihini ve veri sınırlarını kontrol edin.":
    "Avant de prendre une décision aujourd’hui, vérifiez le site, la date des mesures et les limites des données dans le rapport.",
  "Güncel bir denetim raporu oluştur": "Créer un rapport d’audit à jour",
};
