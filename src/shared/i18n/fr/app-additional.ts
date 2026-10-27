import type { Catalog } from "@/shared/i18n";

/** Additional app-wide labels. */
export const frAppAdditional: Catalog = {
  "Arşiv seçilen dönemin sonuna ulaşmadı. Sıralamalar'dan arşivi güncelleyin.":
    "Les archives n'atteignent pas la fin de la période sélectionnée. Actualisez-les dans Suivi des classements.",
  "Bu tarihlerde okunan arşivde eşleşen sorgu yok. Bu, Google'da görünmediğiniz anlamına gelmez.":
    "Aucune requête correspondante dans les archives lues sur ces dates. Cela ne signifie pas que vous n'apparaissez pas sur Google.",
  "Sıralar, kaydedilen nihai Google yanıtlarından hesaplanan ortalamalardır; bugünkü sabit sıranız değildir.":
    "Les positions sont des moyennes calculées à partir des réponses définitives de Google enregistrées ; ce ne sont pas vos positions fixes d'aujourd'hui.",
  "Bağlantı okunamadı; yeniden dene":
    "Impossible de lire la connexion ; réessayer",
  "Seçilen etiketlerden herhangi biri; sayılar tüm kayıtlı kelimelerdeki etiket atamalarıdır.":
    "N'importe laquelle des étiquettes sélectionnées ; les nombres comptent les affectations d'étiquettes sur tous les mots-clés enregistrés.",
  "En fazla {count} etiket seçin.":
    "Sélectionnez au maximum {count} étiquettes.",
  "Liste veya arşiv değişti. Listeyi yenileyip aktarımı yeniden başlatın.":
    "La liste ou les archives ont changé. Actualisez la liste et relancez l'export.",
  "Google kimlikleri bu kurulumdaki tüm projelerde kullanılır. Hizmet hesabı kayıtlıysa önceliklidir. Projenizin mülkünü Proje ayarları → Bağlantılar bölümünden seçin.":
    "Les identifiants Google sont utilisés par tous les projets de cette installation. Un compte de service enregistré est prioritaire. Sélectionnez la propriété du projet dans Paramètres du projet → Connexions.",
  "Kullanılan kimlik okunamadı. Google kimlik durumunu yeniden yükleyin.":
    "Impossible de lire les identifiants utilisés. Rechargez l'état des identifiants Google.",
  "Kimlik kayıt tarihi: {date}":
    "Date d'enregistrement des identifiants : {date}",
  "Google kurulum adımları": "Étapes de configuration Google",
  "{service} yönlendirme adresini kopyala":
    "Copier l'adresse de redirection de {service}",
  "Mülk izinlerini ayarla": "Configurer les autorisations de la propriété",
  "JSON dosyası çok büyük. Google Cloud'dan indirdiğiniz hizmet hesabı anahtarını seçin.":
    "Le fichier JSON est trop volumineux. Sélectionnez la clé de compte de service téléchargée depuis Google Cloud.",
  "Dosya okunamadı. Dosyayı yeniden seçin.":
    "Impossible de lire le fichier. Sélectionnez-le à nouveau.",
  "JSON içeriğini gizli yapıştır": "Coller le contenu JSON en le masquant",
  "Hizmet hesabı kurulum adımları":
    "Étapes de configuration du compte de service",
  "Yukarıdaki Google erişim anahtarı yerine bunu kullanabilirsiniz. Hizmet hesabında izin ekranı, test kullanıcısı ve yönlendirme adresi adımları yok. Google Cloud'da hesabı açıp JSON dosyasını indirin ve burada seçin, sonra hesabın e-posta adresini Search Console'da mülkünüze, bir meslektaşınızı eklermiş gibi kullanıcı olarak ekleyin.":
    "Vous pouvez utiliser cette méthode à la place de la clé d'accès Google ci-dessus. Un compte de service ne nécessite ni écran de consentement, ni utilisateur test, ni adresse de redirection. Créez le compte dans Google Cloud, téléchargez le fichier JSON et sélectionnez-le ici, puis ajoutez l'adresse e-mail du compte comme utilisateur de votre propriété dans Search Console, comme vous le feriez pour un collègue.",
  "Anahtarsız ölçüm sınırlıdır; bu uygulama denetim başına en fazla {count} sayfayı dener. Google daha önce sınır koyabilir. Anahtar başarı garantisi vermez.":
    "Les mesures sans clé sont limitées ; cette application tente au maximum {count} pages par audit. Google peut imposer une limite plus tôt. Une clé ne garantit pas la réussite.",
  "Anahtar bu kurulumdan silinir; hız ölçümü denetim başına uygulamanın anahtarsız sayfa sınırına döner. Google daha erken sınır koyabilir. İstediğiniz zaman yeniden girebilirsiniz.":
    "La clé sera supprimée de cette installation ; les mesures de vitesse reviendront à la limite de pages sans clé de l'application par audit. Google peut imposer une limite plus tôt. Vous pourrez saisir la clé à nouveau à tout moment.",
  "example.com için 1 mobil istek; denetim ölçüm sayacına eklenmez.":
    "1 requête mobile pour example.com ; non comptée dans le compteur de mesures de l'audit.",
  "Test tarihi: {date}": "Date du test : {date}",
  "Diğer ayar bölümleri için yana kaydırın.":
    "Faites défiler horizontalement pour voir les autres sections des paramètres.",
  "Dili uygula": "Appliquer la langue",
  "Arayüz dili bu tarayıcıda saklanır; projenin varsayılan pazar dilini değiştirmez.":
    "La langue de l'interface est enregistrée dans ce navigateur ; elle ne modifie pas la langue du marché par défaut du projet.",
  "GitHub istek sınırı veya erişim kısıtı bildirdi. Bir süre bekleyip tekrar deneyin; Yardım tanılamasını kontrol edin.":
    "GitHub a signalé une limite de requêtes ou une restriction d'accès. Patientez et réessayez ; consultez le diagnostic dans Aide.",
  "GitHub sürüm bilgisi okunamadı. Biraz bekleyip yeniden deneyin; sürerse Yardım ekranından tanılama alın.":
    "Impossible de lire les informations de version GitHub. Patientez et réessayez ; si le problème persiste, lancez un diagnostic dans Aide.",
  "Uygulama içi sürüm kontrolü kapalı. Windows tepsisi bağımsız olarak günlük sürüm kontrolü yapabilir.":
    "La vérification de version dans l'application est désactivée. L'icône Windows peut effectuer une vérification quotidienne indépendamment.",
  "Sürüm kontrolü ayarı okunamadı. Son kayıt güncel olmayabilir.":
    "Impossible de lire le paramètre de vérification de version. Le dernier enregistrement peut être obsolète.",
  "Son başarılı sürüm kontrolü: {date}":
    "Dernière vérification de version réussie : {date}",
  "Windows otomatik kurulum ayarları":
    "Paramètres d'installation automatique Windows",
  "Uygulama içi sürüm kontrolü": "Vérification de version dans l'application",
  "Açıkken uygulama içi kontrol en çok altı saatte bir GitHub sürüm listesine bakar. Bu tercih Windows tepsisinin günlük kontrolünü ve otomatik kurulum tercihini değiştirmez.":
    "Lorsqu'elle est activée, la vérification dans l'application consulte la liste des versions GitHub au maximum toutes les six heures. Ce choix ne modifie ni la vérification quotidienne de l'icône Windows ni la préférence d'installation automatique.",
  "Bu pakette sürüm notu bulunmuyor.":
    "Ce paquet ne contient pas de notes de version.",
  "Notlar uygulama paketiyle birlikte gelir. Yayınlanan notları kılavuzdan kontrol edebilirsiniz; bu durum kurulum kontrolü değildir.":
    "Les notes sont fournies avec le paquet de l'application. Consultez les notes publiées dans le guide ; il ne s'agit pas d'une vérification de l'installation.",
  "Bu kurulu sürüm için sürüm notu bulunmuyor. Aşağıda bu paketle gelen son notlar var.":
    "Aucune note de version pour la version installée. Les dernières notes fournies avec ce paquet figurent ci-dessous.",
  "Son doğrulanan Windows ayarları gösteriliyor; yeniden okunana kadar değiştirilemez.":
    "Les derniers paramètres Windows vérifiés sont affichés ; ils ne peuvent pas être modifiés avant une nouvelle lecture.",
  "Google bağlantı ayarı henüz doğrulanamadı. Okuma tamamlanmazsa durumu yeniden kontrol edin.":
    "Le paramètre de connexion Google n'a pas encore pu être vérifié. Revérifiez l'état si la lecture n'aboutit pas.",
  "Kurulum türü henüz doğrulanamadı. Üstteki durumu kontrol edin ve gerekirse yeniden deneyin.":
    "Le type d'installation n'a pas encore pu être vérifié. Consultez l'état ci-dessus et réessayez si nécessaire.",
  "Sürümünüz v{version}. Güncelleme kontrolü başarısız oldu; yeni sürüm olup olmadığı doğrulanamadı. Ayarlar'daki güncelleme bölümünden yeniden deneyin.":
    "Votre version est v{version}. La vérification des mises à jour a échoué ; la disponibilité d'une nouvelle version n'a pas pu être confirmée. Réessayez dans la section des mises à jour des Paramètres.",
  "Kurulum kontrolü sonucu alınamadı. Durumu yeniden kontrol edin.":
    "Impossible d'obtenir le résultat du contrôle de l'installation. Vérifiez à nouveau l'état.",
  "Kurulum kontrollerinde sorun bulunmadı.":
    "Les contrôles de l'installation n'ont détecté aucun problème.",
  "{count} kurulum kontrolü dikkat istiyor.":
    "{count} contrôles de l'installation demandent votre attention.",
  "Ajan araçları bu kurulumdaki projelere erişir. Son çağrı geçmiş kullanım kaydıdır; sürekli çevrimiçi bağlantı anlamına gelmez.":
    "Les outils de l'agent accèdent aux projets de cette installation. Le dernier appel est une trace d'utilisation passée ; il ne signifie pas une connexion permanente en ligne.",
  "Durumu yeniden oku": "Relire l'état",
  "Bağlantıyı doğrula": "Vérifier la connexion",
  "Durum okunamadı. Yeniden deneyin; bağlantının başarısız olduğu sonucuna varılamaz.":
    "Impossible de lire l'état. Réessayez ; cela ne permet pas de conclure que la connexion a échoué.",
  "Yeni araç çağrısı doğrulandı.": "Nouvel appel d'outil vérifié.",
  "Yeni araç çağrısı görülmedi. Ajanınızın MCP durumunu kontrol edip bir araç çağrısı yapın, sonra yeniden doğrulayın.":
    "Aucun nouvel appel d'outil détecté. Vérifiez l'état MCP de votre agent, effectuez un appel d'outil, puis vérifiez à nouveau.",
  "Yeni araç çağrısı bekleniyor. Ajanınızdan seowatcher araçlarını kullanmasını isteyin.":
    "En attente d'un nouvel appel d'outil. Demandez à votre agent d'utiliser les outils seowatcher.",
  "Sitelerinizi açın; arşiv verisini, son denetimi ve eksik bağlantıları burada görün.":
    "Ouvrez vos sites ; consultez ici les données archivées, le dernier audit et les connexions manquantes.",
  "Proje ara": "Rechercher un projet",
  "Ad veya alan adı": "Nom ou domaine",
  "Liste yenilenemedi; son alınan projeler gösteriliyor. Yeniden deneyin.":
    "Impossible d'actualiser la liste ; les derniers projets récupérés sont affichés. Réessayez.",
  "Proje verileri yenilenemedi. Listeyi yenileyerek yeniden deneyin.":
    "Impossible d'actualiser les données du projet. Actualisez la liste et réessayez.",
  "Bu aramayla eşleşen proje yok. Aramayı değiştirin.":
    "Aucun projet ne correspond à cette recherche. Modifiez la recherche.",
  "Site eklenmedi. Bu proje için bir site seçin.":
    "Aucun site ajouté. Choisissez un site pour ce projet.",
  "Son açılan": "Ouvert récemment",
  "Search Console bağla": "Connecter Search Console",
  "Paneli aç": "Ouvrir le tableau de bord",
  "Arşivlenen liste yenilenemedi; son alınan liste gösteriliyor":
    "Impossible d'actualiser la liste archivée ; la dernière liste récupérée est affichée",
  "Görünüm ve dil bu tarayıcıya, Google kimlikleri bu kurulumdaki tüm projelere, Windows tercihleri başlatıcıya uygulanır. Önce kullanacağınız Google kimliğini seçin, sonra proje bağlantılarından mülkünüzü belirleyin.":
    "L'apparence et la langue s'appliquent à ce navigateur, les identifiants Google à tous les projets de cette installation, et les préférences Windows au lanceur. Choisissez d'abord les identifiants Google à utiliser, puis votre propriété dans les connexions du projet.",
  "Kurulum türü okunamadı. Durumu yeniden kontrol edin; günlük konumu kurulum türü belirlendiğinde gösterilir.":
    "Impossible de lire le type d'installation. Vérifiez à nouveau l'état ; l'emplacement des journaux sera affiché une fois le type d'installation déterminé.",
  "Proje kimliği okunuyor…": "Lecture de l'identifiant du projet…",
  "Proje kimliği okunamadı. Proje listesini yeniden yükleyin.":
    "Impossible de lire l'identifiant du projet. Rechargez la liste des projets.",
  "Yazdırma sekmesi tarayıcı tarafından engellendi. Bu site için açılır pencerelere izin verin veya raporu yeni sekmede açıp Yazdır kullanın.":
    "Le navigateur a bloqué l'onglet d'impression. Autorisez les fenêtres contextuelles pour ce site ou ouvrez le rapport dans un nouvel onglet et utilisez Imprimer.",
  "Kaynak ve kayıt bilgileri": "Informations sur la source et l'enregistrement",
  "Rapor bilgileri yenilenemedi. Son alınan kayıt gösteriliyor; sayfayı yenileyerek tekrar deneyin.":
    "Impossible d'actualiser les informations du rapport. Le dernier enregistrement est affiché ; actualisez la page et réessayez.",
  "Rapor kaydedildiği dilde ve verilerle açılır. Güncel veri veya başka dil için kaynak ekrandan bilinçli olarak yeniden hazırlayın.":
    "Le rapport s'ouvre avec la langue et les données enregistrées. Pour des données récentes ou une autre langue, préparez-le à nouveau volontairement depuis l'écran source.",
  "Arama raporu hazırla": "Préparer un rapport de recherche",
  "Denetim raporu hazırla": "Préparer un rapport d'audit",
  "Liste yenilenemedi. Son alınan kayıtlar gösteriliyor; Yenile ile tekrar deneyin.":
    "Impossible d'actualiser la liste. Les derniers enregistrements sont affichés ; réessayez avec Actualiser.",
  "Filtreler uygulanıyor. Yeni sonuçlar gelene kadar önceki liste gösteriliyor.":
    "Application des filtres. La liste précédente reste affichée jusqu'à l'arrivée des nouveaux résultats.",
  "Proje alan adı: {domain} · Search Console mülkü: {property}":
    "Domaine du projet : {domain} · Propriété Search Console : {property}",
  "Alan adı belirtilmedi": "Domaine non précisé",
  "Mülk seçilmedi": "Aucune propriété sélectionnée",
  "Seçilen Search Console mülkü proje alan adını kapsamıyor. Ayrı bir mülkü bilerek seçtiyseniz koruyabilirsiniz; değiştirmek için aşağıdaki mülk seçimini kullanın.":
    "La propriété Search Console sélectionnée ne couvre pas le domaine du projet. Si vous avez choisi volontairement une autre propriété, vous pouvez la conserver ; pour la modifier, utilisez la sélection ci-dessous.",
  "{name} · {domain}. Değişiklikler yalnızca bu projeye uygulanır.":
    "{name} · {domain}. Les modifications s'appliquent uniquement à ce projet.",
  "PageSpeed Insights · yalnızca denetimler":
    "PageSpeed Insights · audits uniquement",
  "Standart mülk sınırı varsayımı":
    "Hypothèse de limite d'une propriété standard",
  "Son gözlenen kalan gösteriliyor; kota penceresi güncelliği doğrulanamadı. Yeni rapor yanıtı gelene kadar güncel kapasite bilinmiyor.":
    "Le dernier solde observé est affiché ; la fraîcheur de la fenêtre de quota n'a pas pu être vérifiée. La capacité actuelle reste inconnue jusqu'à la prochaine réponse de rapport.",
  "Bir denetim en çok {count} sayfa tarar; gösterilen sayı proje alan adındaki son tamamlanan denetime aittir. Tarih denetimin başlangıcıdır.":
    "Un audit explore au maximum {count} pages ; le nombre affiché provient du dernier audit terminé sur le domaine du projet. La date correspond au début de l'audit.",
  "Proje alan adındaki son tamamlanan denetim":
    "Dernier audit terminé sur le domaine du projet",
  "Son denetim girişimi": "Dernière tentative d'audit",
  "Proje alan adındaki son denetim girişimi":
    "Dernière tentative d'audit sur le domaine du projet",
  "Son denetim sürüyor. Sayfa sınırı için son tamamlanan denetim ayrı gösterilir.":
    "Le dernier audit est en cours. Le dernier audit terminé est affiché séparément pour la limite de pages.",
  "Son denetim tamamlanamadı. Son tamamlanan denetimin sayfa sayısı korunur; ayrıntıyı Denetim ekranından kontrol edin.":
    "Le dernier audit n'a pas pu aboutir. Le nombre de pages du dernier audit terminé est conservé ; consultez les détails dans l'écran Audit.",
  "Rapor dönemi": "Période du rapport",
  "Google'ın tamamlandığını bildirdiği günler kullanıldı. Dönem sonu: {date}. Günler Pasifik saatine göredir.":
    "Les jours déclarés complets par Google ont été utilisés. Fin de la période : {date}. Les jours suivent l'heure du Pacifique.",
  "Son günler gecikme varsayımıyla dışarıda bırakıldı; Google kesinleşme sınırı bildirmedi. Günler Pasifik saatine göredir.":
    "Les derniers jours ont été exclus selon un décalage supposé ; Google n'a pas indiqué de limite de données définitives. Les jours suivent l'heure du Pacifique.",
  "Gösterilen: {shown} / {observed} gözlenen kayıt. Kaynak satır sınırları nedeniyle tüm siteyi temsil etmeyebilir.":
    "Affichés : {shown} / {observed} enregistrements observés. Les limites de lignes de la source peuvent empêcher de représenter tout le site.",
  "Okunan satırlar: {queries} sorgu, {pages} sayfa, {pairs} sorgu×sayfa. Listelerden türetilen fırsatlar bu kapsamla sınırlıdır.":
    "Lignes lues : {queries} requêtes, {pages} pages, {pairs} requête×page. Les opportunités tirées des listes se limitent à cette couverture.",
  "Listelenmeyen sorguların tıklama payı: {share}. Gizlenen ve satır sınırı dışında kalan sorgular birlikte hesaplanır.":
    "Part des clics des requêtes non listées : {share}. Les requêtes masquées et celles au-delà de la limite de lignes sont calculées ensemble.",
  "Google'ın satır sınırına ulaşıldı; sorgu, sayfa veya sorgu×sayfa listeleri eksik olabilir. Bu listelerden üretilen fırsatlar tam site envanteri değildir.":
    "La limite de lignes Google est atteinte ; les listes de requêtes, de pages ou de requête×page peuvent être incomplètes. Les opportunités qui en découlent ne sont pas un inventaire complet du site.",
  "İlk {count} işin {known} tanesinde kazanç hesaplanabildi; {unknown} tanesinde bilinmiyor. Hesaplanabilen işler için {days} günde en fazla {clicks} ek tıklama (üst sınır).":
    "Le gain a pu être calculé pour {known} des {count} premières actions ; il est inconnu pour {unknown}. Pour les actions calculables, au maximum {clicks} clics supplémentaires sur {days} jours (plafond).",
  "Okunan sayfalarda eşiği aşan, gösterim alıp hiç tıklanmayan sayfa bulunmadı.":
    "Parmi les pages lues, aucune ne dépasse le seuil avec des impressions mais aucun clic.",
  "Önceki tıklama": "Clics précédents",
  "Şimdiki tıklama": "Clics actuels",
  "Okunan sorgularda bu koşulu sağlayan kayıt bulunmadı.":
    "Aucun enregistrement répondant à cette condition parmi les requêtes lues.",
  "Önceki dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Yeni sorgu sayısı bu veriden belirlenemez.":
    "La comparaison avec la période précédente est indisponible ou la couverture des lignes est incomplète. Le nombre de nouvelles requêtes ne peut pas être déterminé à partir de ces données.",
  "Dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Kaybolan sorgu sayısı bu veriden belirlenemez.":
    "La comparaison des périodes est indisponible ou la couverture des lignes est incomplète. Le nombre de requêtes disparues ne peut pas être déterminé à partir de ces données.",
  "Uzun dönem karşılaştırması alınamadı. Yeterli geçmiş olmayabilir veya kaynak isteği başarısız olmuş olabilir; geçmiş veriyi kontrol edip raporu yeniden hazırlayın.":
    "Impossible d'obtenir la comparaison à long terme. L'historique peut être insuffisant ou la requête source peut avoir échoué ; vérifiez l'historique et préparez à nouveau le rapport.",
  "Çakışma analizi alınamadı. Diğer bölümler kullanılabilir; Arama performansında çakışmaları kontrol edip raporu yeniden hazırlayın.":
    "Impossible d'obtenir l'analyse des chevauchements. Les autres sections restent disponibles ; vérifiez les chevauchements dans Performances de recherche et préparez à nouveau le rapport.",
  "Çakışma dönemi: {start} – {end}. İncelenen: {count} sorgu. Eşik: sorguda 100 gösterim; sayfada 10 gösterim ve yüzde 20 pay. Bu dönem ana rapordan farklı olabilir.":
    "Période des chevauchements : {start} – {end}. Examinées : {count} requêtes. Seuil : 100 impressions par requête ; 10 impressions et 20 pour cent de part par page. Cette période peut différer du rapport principal.",
  "Kaynak satır sınırına ulaştı. Okunmayan sorgularda başka çok sayfalı sonuçlar olabilir.":
    "La source a atteint sa limite de lignes. D'autres résultats à plusieurs pages peuvent exister parmi les requêtes non lues.",
  "Sonuçlar yalnızca okunan ve eşikleri geçen sorguları kapsar.":
    "Les résultats couvrent uniquement les requêtes lues dépassant les seuils.",
  "Okunan sorgularda eşiği aşan çok sayfalı sonuç bulunmadı.":
    "Aucun résultat à plusieurs pages dépassant le seuil parmi les requêtes lues.",
  "Diğer sayfa sayısı": "Nombre d'autres pages",
  "Bölünen gösterim payı": "Part des impressions répartie",
  "Bir sorguda birden çok sayfanın görünmesi kayıp tıklama veya SEO zararı kanıtı değildir. Sayfaların aynı ihtiyacı karşılayıp karşılamadığını inceleyin.":
    "L'apparition de plusieurs pages pour une requête ne prouve ni une perte de clics ni un préjudice SEO. Vérifiez si ces pages répondent au même besoin.",
  "Kaynak satır sınırına ulaştı; dağılım eksik olabilir.":
    "La source a atteint sa limite de lignes ; la répartition peut être incomplète.",
  "Özel sonuç görünümü verisi alınamadı veya kayıt dönmedi. Kaynak bu iki durumu ayırmadığı için yokluk sonucu çıkarılamaz; Arama performansını kontrol edin.":
    "Les données d'apparence spéciale dans les résultats n'ont pas pu être obtenues ou n'ont renvoyé aucun enregistrement. La source ne distinguant pas ces cas, on ne peut pas conclure à une absence ; consultez Performances de recherche.",
  "Okunan görünüm tablosunda bu döneme ait kayıt bulunmadı.":
    "Aucun enregistrement pour cette période dans la table d'apparence lue.",
  "Kaydedilmiş belge": "Document enregistré",
  "Rapor hazırlanırken veriler sunucudan yeniden okundu; Google geçmiş değerleri düzeltebilir. Aynı dönem etiketi önceki ekran görüntüsüyle birebir ölçüm eşitliğini garanti etmez. Başlık dili değiştiğinde ayrı bir belge oluşabilir.":
    "Les données ont été relues depuis le serveur lors de la préparation du rapport ; Google peut corriger les valeurs passées. Une même période affichée ne garantit pas des mesures identiques à une capture antérieure. Un changement de langue du titre peut créer un document distinct.",
  "Sorgu tabloları gizlilik nedeniyle gizlenen satırları içermez. Satır sınırı varsa listelenmeyen pay, sınır dışında kalan sorguları da içerir.":
    "Les tableaux de requêtes n'incluent pas les lignes masquées pour confidentialité. En cas de limite de lignes, la part non listée comprend aussi les requêtes au-delà de cette limite.",
  "Arama görünümünün istek bütçesi: {count}. Ek çakışma analizi dahil değildir; önbellek kullanımı gerçek ağ isteği sayısını değiştirir.":
    "Budget de requêtes pour l'apparence dans les résultats : {count}. L'analyse supplémentaire des chevauchements n'est pas incluse ; le cache modifie le nombre réel de requêtes réseau.",
  Özet: "Résumé",
  "Uygulama raporu, tür kaydedilmemiş":
    "Rapport de l'application, type non enregistré",
};
