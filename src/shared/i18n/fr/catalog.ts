/* eslint-disable max-lines -- locale dictionary */
// Complete fr UI catalog; existing translations are preserved.
/* eslint-disable max-lines -- locale translation data */
export const frCatalog = {
  // installed-0.8.0 diagnostics: Google/Windows/audit failure causes
  "Bağlantıyı düzelt": "Réparer la connexion",
  "Sürüm kaynağına ulaşılamadı: depo bulunamadı ya da gizli.":
    "Source des versions injoignable : le dépôt est introuvable ou privé.",
  "Sürüm kaynağına ulaşılamadı: depo bulunamadı ya da gizli (GitHub 404). Yardım ekranından tanılama paketini indirip sorunu bildirin.":
    "Source des versions injoignable : le dépôt est introuvable ou privé (GitHub 404). Téléchargez le paquet de diagnostic depuis l'écran Aide et signalez le problème.",
  "{host} site denetimi (eksik)": "Audit du site {host} (partiel)",
  "Eksik rapor: {why} Sorun listesi tam değil.":
    "Rapport partiel : {why} La liste des problèmes est incomplète.",
  "Tepsi uygulaması 4 saniye içinde yanıt vermedi (zaman aşımı). Bilgisayar uykudan yeni uyandıysa birkaç saniye sonra Tekrar dene'ye basın; sürerse tepsi menüsünden Çıkış deyip uygulamayı yeniden açın.":
    "L'application de la zone de notification n'a pas répondu en 4 secondes (délai dépassé). Si l'ordinateur sort de veille, cliquez sur Réessayer dans quelques secondes ; si cela persiste, choisissez Quitter dans le menu de la zone de notification et rouvrez l'application.",
  "Tepsi uygulamasının ayar servisine bağlanılamadı. Tepsi uygulaması kapanmış olabilir; seowatcher'ı Başlat menüsünden yeniden açın.":
    "Impossible de joindre le service de réglages de l'application de la zone de notification. Elle s'est peut-être fermée ; rouvrez seowatcher depuis le menu Démarrer.",
  "Bu ayar yönetici tarafından kilitlenmiş (HTTP 409). Yalnızca bilgisayarın yöneticisi değiştirebilir.":
    "Ce réglage est verrouillé par un administrateur (HTTP 409). Seul l'administrateur de l'ordinateur peut le modifier.",
  "Tepsi uygulaması bu isteği tanımadı (HTTP 403); sunucu ile tepsi uygulaması farklı oturumlardan kalmış olabilir. Tepsi menüsünden Çıkış deyip uygulamayı yeniden açın.":
    "L'application de la zone de notification n'a pas reconnu cette requête (HTTP 403) ; le serveur et l'application proviennent peut-être de sessions différentes. Choisissez Quitter dans le menu de la zone de notification et rouvrez l'application.",
  "Tepsi uygulaması ayar isteğini reddetti (HTTP {status}). Uygulamayı tepsi menüsünden yeniden başlatın; sürerse Windows paketini güncelleyin.":
    "L'application de la zone de notification a refusé la requête de réglage (HTTP {status}). Redémarrez l'application depuis le menu de la zone de notification ; si cela persiste, mettez à jour le package Windows.",
  "Tepsi uygulaması tanınmayan bir yanıt döndürdü; uygulama ile tepsi sürümü uyuşmuyor olabilir. Windows paketini güncelleyin.":
    "L'application de la zone de notification a renvoyé une réponse non reconnue ; les versions ne correspondent peut-être pas. Mettez à jour le package Windows.",
  "Google Analytics geçersiz bir yanıt döndürdü. Birazdan tekrar deneyin.":
    "Google Analytics a renvoyé une réponse invalide. Réessayez dans un instant.",
  "Google'a bağlanılamadı, birazdan tekrar deneyin. Neden: {reason}. Sürerse bu bilgisayarın internet bağlantısını kontrol edin.":
    "Impossible de joindre Google, réessayez dans un instant. Raison : {reason}. Si cela persiste, vérifiez la connexion Internet de cet ordinateur.",
  bilinmiyor: "inconnue",
  "Search Console isteği geçersiz buldu (HTTP 400). Bu bir bağlantı sorunu değil; seçili boyut, filtre ya da arama türü bu mülkte kullanılamıyor.":
    "Search Console a rejeté la requête (HTTP 400). Ce n'est pas un problème de connexion ; la dimension, le filtre ou le type de recherche choisi n'est pas disponible pour cette propriété.",
  "Search Console bu mülke erişimi reddetti (HTTP {status}). Hesabın mülkte doğrulanmış yetkisi olduğunu kontrol edin ya da Ayarlar'dan bağlantıyı yenileyin.":
    "Search Console a refusé l'accès à cette propriété (HTTP {status}). Vérifiez que le compte dispose d'une autorisation validée sur la propriété, ou renouvelez la connexion dans les Paramètres.",
  "Search Console mülkü bulunamadı (HTTP 404). Mülk Search Console'dan kaldırılmış olabilir; Ayarlar'dan yeniden seçin.":
    "Propriété Search Console introuvable (HTTP 404). Elle a peut-être été supprimée de Search Console ; sélectionnez-la à nouveau dans les Paramètres.",
  "Search Console istek sınırı doldu (HTTP 429). Birkaç dakika sonra tekrar deneyin.":
    "Limite de requêtes Search Console atteinte (HTTP 429). Réessayez dans quelques minutes.",
  "Search Console zamanında yanıt vermedi. Birazdan tekrar deneyin.":
    "Search Console n'a pas répondu à temps. Réessayez dans un instant.",
  "Search Console geçici olarak yanıt vermiyor (HTTP {status}). Birazdan tekrar deneyin; sürerse Google'ın durum sayfasına bakın.":
    "Search Console ne répond pas pour le moment (HTTP {status}). Réessayez dans un instant ; si cela persiste, consultez la page d'état de Google.",
  'Google Analytics Data API bu Google Cloud projesinde kapalı. Google Cloud Console\'da "Google Analytics Data API"yi etkinleştirip tekrar deneyin.':
    "L'API Google Analytics Data est désactivée dans ce projet Google Cloud. Activez « Google Analytics Data API » dans la Google Cloud Console puis réessayez.",
  "Bu rapor seçili Google Analytics mülküyle uyumlu değil (HTTP 400).":
    "Ce rapport n'est pas compatible avec la propriété Google Analytics sélectionnée (HTTP 400).",
  "Google Analytics bağlantısının süresi dolmuş ya da iptal edilmiş. Ayarlar'dan yeniden bağlayın.":
    "La connexion Google Analytics a expiré ou a été révoquée. Reconnectez-la dans les Paramètres.",
  "Google Analytics bu mülke erişimi reddetti (HTTP 403). Bağlı hesaba ya da hizmet hesabına mülkte en az Görüntüleyici yetkisi verin.":
    "Google Analytics a refusé l'accès à cette propriété (HTTP 403). Accordez au compte connecté ou au compte de service au moins le rôle Lecteur sur la propriété.",
  "Google Analytics mülkü bulunamadı (HTTP 404). Mülk silinmiş ya da taşınmış olabilir; Ayarlar'dan yeniden seçin.":
    "Propriété Google Analytics introuvable (HTTP 404). Elle a peut-être été supprimée ou déplacée ; sélectionnez-la à nouveau dans les Paramètres.",
  "Google Analytics raporlama kotası doldu (HTTP 429). Kota saatlik ve günlük yenilenir; daha sonra tekrar deneyin.":
    "Le quota de rapports Google Analytics est épuisé (HTTP 429). Il se renouvelle chaque heure et chaque jour ; réessayez plus tard.",
  "Google Analytics geçici olarak yanıt vermiyor (HTTP {status}{reason}). Birazdan tekrar deneyin.":
    "Google Analytics ne répond pas pour le moment (HTTP {status}{reason}). Réessayez dans un instant.",
  "Bu projeye bağlı bir Google Analytics mülkü yok. Ayarlar'dan bir mülk seçin.":
    "Aucune propriété Google Analytics n'est connectée à ce projet. Choisissez-en une dans les Paramètres.",
  "Google Analytics geçici olarak yanıt vermiyor. Birazdan tekrar deneyin.":
    "Google Analytics ne répond pas pour le moment. Réessayez dans un instant.",
  "{count} sayfa alınamadı (ağ hatası).": {
    one: "{count} page n'a pas pu être récupérée (erreur réseau).",
    other: "{count} pages n'ont pas pu être récupérées (erreur réseau).",
  },
  "Bağlantı yeniden denemede de kurulamadı, bu sayfalar denetlenmedi ve bozuk sayılmadı. Çoğu zaman geçicidir; denetimi yeniden çalıştırın. Sürerse sitenin bu bilgisayardan açıldığını kontrol edin.":
    "La connexion a de nouveau échoué lors de la nouvelle tentative ; ces pages n'ont pas été auditées et ne sont pas comptées comme cassées. C'est généralement temporaire ; relancez l'audit. Si cela persiste, vérifiez que le site s'ouvre depuis cet ordinateur.",
  "Sunucudan yanıt alınamadı (bağlantı koptu ya da adres çözülemedi). Sayfa denetlenmedi ve bozuk sayılmadı; denetimi yeniden çalıştırın.":
    "Aucune réponse du serveur (connexion interrompue ou adresse non résolue). La page n'a pas été auditée et n'est pas comptée comme cassée ; relancez l'audit.",
  "alınamadı (ağ hatası)": "non récupérée (erreur réseau)",
  "Toplam {count} site haritası dosyası okunamadı": {
    one: "{count} fichier sitemap n'a pas pu être lu au total",
    other: "{count} fichiers sitemap n'ont pas pu être lus au total",
  },
  "Site haritası dosyası okunamadı": "Un fichier sitemap n'a pas pu être lu",
  "robots.txt dosyanızın ya da bir site haritası dizininin gösterdiği bir site haritası dosyasından hiç adres okunamadı. Ayrıntıda hangi dosya olduğu ve nedeni yazıyor: hata kodu, zaman aşımı, bağlantı hatası, siteden çıkan yönlendirme, XML olmayan içerik ya da boş liste. O dosyadaki sayfalar bu denetime site haritasından girmedi; Google da aynı hatayı görüyorsa onları da okuyamıyor olabilir.":
    "Aucune adresse n'a pu être lue dans un fichier sitemap indiqué par votre robots.txt ou par un index de sitemaps. Le détail nomme le fichier et la raison : code d'erreur, délai dépassé, erreur de connexion, redirection hors du site, contenu qui n'est pas du XML ou liste vide. Les pages de ce fichier ne sont pas entrées dans cet audit par le sitemap ; si Google voit la même erreur, il ne peut peut-être pas les lire non plus.",
  "Ayrıntıdaki adresi tarayıcıda açın. Hata kodu ya da yönlendirme varsa dosyayı doğru adreste yayınlayın veya robots.txt ve site haritası dizinindeki satırı düzeltin. Zaman aşımı ya da bağlantı hatası çoğu zaman geçicidir; denetimi yeniden çalıştırın, sürerse sunucunun yanıt süresine bakın. Search Console'daki Site Haritaları raporu Google'ın gördüğünü gösterir.":
    "Ouvrez l'adresse indiquée dans le détail dans un navigateur. En cas de code d'erreur ou de redirection, publiez le fichier à la bonne adresse ou corrigez la ligne dans robots.txt et dans l'index de sitemaps. Un délai dépassé ou une erreur de connexion est généralement temporaire ; relancez l'audit et, si cela persiste, regardez le temps de réponse du serveur. Le rapport Sitemaps de Search Console montre ce que voit Google.",
  "Sunucu HTTP {status} döndürdü": "Le serveur a renvoyé HTTP {status}",
  "Sunucu zamanında yanıt vermedi (zaman aşımı, yeniden denendi)":
    "Le serveur n'a pas répondu à temps (délai dépassé, nouvelle tentative faite)",
  "Bağlantı kurulamadı (ağ hatası, yeniden denendi)":
    "Connexion impossible (erreur réseau, nouvelle tentative faite)",
  "Başka bir siteye ya da döngüye yönlendiriyor":
    "Il redirige vers un autre site ou en boucle",
  "Dönen içerik site haritası XML'i değil":
    "Le contenu renvoyé n'est pas du XML de sitemap",
  "Dosya okundu ama hiç adres listelemiyor":
    "Le fichier a été lu mais ne liste aucune adresse",
  "Hazırlık puanı": "Score de préparation",
  "{completed} / {total} hazır": "{completed} / {total} prêts",
  "Puan; Google bağlantıları, güncel denetim, proje bilgisi ve ajan kurulumunun hazır olup olmadığını gösterir. Arama sırası ya da SEO başarısı değildir.":
    "Ce score indique si les connexions Google, un audit récent, le contexte du projet et votre agent sont prêts. Il ne s'agit pas d'un classement ou d'un score de performance SEO.",
  "Denetimi yeniden başlatın": "Relancer l'audit",
  "Önceki denetim tamamlanamadı. Yeniden deneyin.":
    "L'audit précédent n'est pas terminé. Réessayez.",
  "Yeniden denetle": "Relancer",
  "Denetim sürüyor": "Audit en cours",
  "İlerlemeyi ve bitiş özetini denetim ekranında izleyin.":
    "Suivez sa progression et son récapitulatif final sur l'écran d'audit.",
  "İlerlemeyi gör": "Afficher la progression",
  "Sizin 'önemli' saydığınız hareket, örneğin form gönderme ya da satın alma. Tanımlı değilse hep 0 görünür.":
    "Une action que vous considérez comme importante, comme l'envoi d'un formulaire ou un achat. Affiche 0 tant qu'aucune n'est configurée.",
  "Oturumların yüzde kaçında önemli saydığınız bir hareket (anahtar olay) gerçekleşti. Anahtar olay tanımlı değilse hep %0 görünür.":
    "La part des sessions au cours desquelles une action que vous considérez comme importante (un événement clé) s'est produite. Affiche 0 % jusqu'à ce qu'un événement clé soit configuré.",
  "Ziyaretçinin sayfada vakit geçirip bir şey yaptığı oturumların yüzdesi.":
    "Part de sessions au cours desquelles le visiteur a passé du temps sur la page ou a fait quelque chose.",
  "Seçilen aralıkta siteyle gerçekten etkileşime giren (sayfada vakit geçiren ya da bir şey yapan) kişi sayısı.":
    "Personnes qui ont réellement interagi avec le site sur la période sélectionnée (temps passé sur une page ou action effectuée).",
  "Anahtar olay": "Événements clés",
  "Olay türü": "Types d'événements",
  "En çok tetiklenen": "Les plus déclenchés",
  "{count} kez, {share} pay": {
    one: "{count} fois, part {share}",
    other: "{count} fois, part {share}",
  },
  "Tetikleyen kullanıcı": "Utilisateurs qui l'ont déclenché",
  "En çok tetiklenen olayda": "Sur l'événement le plus déclenché",
  "Ürün geliri": "Revenus des articles",
  "Satılan ürün": "Articles achetés",
  "Sepete eklenen": "Articles ajoutés au panier",
  "Görüntülenen ürün": "Articles consultés",
  Arama: "Recherches",
  "Farklı terim": "Termes distincts",
  "En çok aranan": "Les plus recherchés",
  "{count} kez": { one: "{count} fois", other: "{count} fois" },
  "Yalnızca bir kez aranan": "Recherché une seule fois",
  "Pay: {share}": "Part : {share}",
  "Google Analytics bağlı değil": "Google Analytics n'est pas connecté",
  "Raporlar, Analytics'teki sitenizden gelir. Önce bağlantıyı kurun.":
    "Les rapports proviennent des données Analytics de votre site. Connectez Analytics d'abord.",
  "Analytics'i bağla": "Connecter Analytics",
  "{title}: toplam {total} {unit}.": "{title} : {total} {unit} au total.",
  "En büyük pay {label}, {share}.":
    "Part la plus importante : {label}, {share}.",
  "Birine tıklayın, aşağıdaki tablo o satırlara daralsın.":
    "Cliquez sur l'un d'eux pour limiter le tableau ci-dessous à ces lignes.",
  "Organik oturum grafiği yüklenemedi":
    "Impossible de charger le graphique des sessions organiques",
  "{start} – {end} dönemine göre":
    "Par rapport à la période du {start} au {end}",
  "Organik oturumlar": "Sessions organiques",
  "Seçtiğiniz aralık, gün gün.": "La période sélectionnée, jour par jour.",
  Oturum: "Sessions",
  "Etkileşim oranı": "Taux d'engagement",
  "Organik gelir": "Revenus organiques",
  "Günlük organik oturumlar": "Sessions organiques par jour",
  "Bu aralıkta organik oturum yok, grafik boş.":
    "Aucune session organique sur cette période, le graphique est donc vide.",
  "{days} günde toplam {total} organik oturum. En yüksek gün {day}, {peak} oturum.":
    "{total} sessions organiques sur {days} jours. Jour de pointe : {day}, avec {peak} sessions.",
  oturum: "sessions",
  "{dimension} bazında oturum payı": "Part des sessions par {dimension}",
  "{dimension} bazında kullanıcı payı": "Part des utilisateurs par {dimension}",
  kullanıcı: "utilisateurs",
  "Giriş sayfaları, oturuma göre": "Pages de destination par sessions",
  "Sayfalar, görüntülenmeye göre": "Pages par vues",
  görüntülenme: "vues",
  "Olaylar, tetiklenme sayısına göre":
    "Événements par nombre de déclenchements",
  "anahtar olay": "événements clés",
  "Ürünler, gelire göre": "Articles par revenus",
  gelir: "revenus",
  "Ürünler, satış adedine göre": "Articles par quantité vendue",
  "satılan ürün": "articles achetés",
  "Ürünler, görüntülenmeye göre": "Articles par vues",
  "ürün görüntüleme": "vues d'articles",
  "Arama terimleri, arama sayısına göre": "Termes de recherche par recherches",
  arama: "recherches",
  "Dönüşüm (anahtar olay) tanımlı olmadığı için bu filtre kullanılamıyor":
    "Ce filtre n'est pas disponible car aucune conversion (événement clé) n'est configurée",
  "Etkileşimi düşük": "Engagement faible",
  "Etkileşim oranı yüzde 50'nin altında olan satırlar.":
    "Lignes avec un taux d'engagement inférieur à 50 %.",
  "Dönüşümü olan": "Qui convertissent",
  "En az bir anahtar olay getirmiş satırlar.":
    "Lignes ayant généré au moins un événement clé.",
  "Geliri olan": "Avec revenus",
  "Gelir getirmiş ürünler.": "Articles ayant généré des revenus.",
  "Etkileşim süresi düşük": "Durée d'engagement faible",
  "Kullanıcı başına etkileşim süresi {bar} altında kalan sayfalar (listenin ortancası {median}, yarısı {bar}).":
    "Pages où la durée d'engagement par utilisateur est inférieure à {bar} (la médiane de la liste est {median} ; sa moitié est {bar}).",
  "Trafiği yüksek, dönüşümü düşük": "Trafic élevé, faible conversion",
  "Oturumu ortancanın ({sessions}) üstünde ama oturum başına anahtar olay oranı ortancanın ({rate}) altında kalan sayfalar, bir de hiç olay getirmeyenler.":
    "Pages avec des sessions supérieures à la médiane ({sessions}) mais un taux d'événements clés de session inférieur à la médiane ({rate}), plus celles sans aucun événement clé.",
  Diğer: "Autre",
  "Bu dönemde anahtar olay kaydı yok":
    "Aucun événement clé enregistré au cours de cette période",
  "Mülkte hiçbir olay anahtar olay işaretli olmayabilir ya da işaretli olaylar bu aralıkta hiç olmamış olabilir.":
    "La propriété n'a peut-être aucun événement marqué comme événement clé, ou les événements marqués ne se sont pas produits sur cette période.",
  "Anahtar olay nasıl tanımlanır": "Comment configurer les événements clés",
  "Bu dönemde ürün verisi yok":
    "Aucune donnée d'article au cours de cette période",
  "Mülk e-ticaret olayı (ürün görüntüleme, sepete ekleme, satın alma) göndermiyor olabilir. Mağazası olmayan bir sitede bu normal.":
    "La propriété n'envoie peut-être pas d'événements d'e-commerce (vues d'articles, ajouts au panier, achats). C'est normal pour un site sans boutique.",
  "GA4 e-ticaret ölçümü": "Mesure de l'e-commerce GA4",
  "Bu dönemde site içi arama kaydı yok":
    "Aucune recherche sur le site enregistrée sur cette période",
  "Sitede arama kutusu yoksa ya da site içi arama ölçümü kapalıysa bu rapor boş kalır. Açıkken de kimse bir şey aramadıysa boştur.":
    "Ce rapport reste vide si le site n'a pas de champ de recherche ou si la mesure de la recherche sur le site est désactivée. Il est également vide lorsqu'elle est activée mais que personne n'a effectué de recherche.",
  "Gelişmiş ölçüm ve site içi arama":
    "Mesures améliorées et recherche sur le site",
  "Bu dönemde veri yok": "Aucune donnée au cours de cette période",
  "Google hiç satır vermedi ({reason}).":
    "Google n'a renvoyé aucune ligne ({reason}).",
  "Google bu aralık için satır vermedi. Mülkü yeni bağladıysanız veri birkaç gün sonra görünür.":
    "Google n'a renvoyé aucune ligne pour cette période. Si vous avez connecté la propriété récemment, les données apparaissent après quelques jours.",
  "Şu an yalnızca Google organik aramadan gelen ziyaretler sayılıyor; tüm trafiğe bakmak sonucu değiştirebilir.":
    "Seules les visites issues de la recherche organique Google sont comptabilisées pour le moment ; l'examen de l'ensemble du trafic peut modifier le résultat.",
  "Google'ın verdiği not: {reason}.": "Remarque de Google : {reason}.",
  "Tüm trafiğe bak": "Afficher tout le trafic",
  "Ölçüm durumunu kontrol et": "Vérifier l'état des mesures",
  "Listelenen {count} satırdan": {
    one: "Sur la {count} ligne listée",
    other: "Sur les {count} lignes listées",
  },
  "Analytics mülkü": "Propriété Analytics",
  "{shown} / {count} satır": {
    one: "{shown} / {count} ligne",
    other: "{shown} / {count} lignes",
  },
  "{count} satır": { one: "{count} ligne", other: "{count} lignes" },
  örneklenmiş: "échantillonné",
  "eşik altı satırlar gizlendi": "lignes inférieures aux seuils masquées",
  "Hızlı filtreler": "Filtres rapides",
  "Yalnızca Google organik aramadan gelen ziyaretleri gösterir.":
    "Affiche uniquement les visites issues de la recherche organique Google.",
  "Sadece organik": "Organique uniquement",
  "Sayılar, listelenen tüm satırlara göre hesaplanır. Birden fazla filtre seçerseniz satırın hepsine uyması gerekir.":
    "Les décomptes portent sur toutes les lignes listées. Si vous choisissez plusieurs filtres, une ligne doit tous les respecter.",
  "Filtreleri temizle": "Effacer les filtres",
  "E-Tablolar'a aktar ({count} satır)": {
    one: "Exporter vers Google Sheets ({count} ligne)",
    other: "Exporter vers Google Sheets ({count} lignes)",
  },
  "CSV ({count} satır)": {
    one: "CSV ({count} ligne)",
    other: "CSV ({count} lignes)",
  },
  "Bu filtrelere uyan satır yok": "Aucune ligne ne correspond à ces filtres",
  "Seçtiğiniz filtrelerle hiçbir satır eşleşmiyor.":
    "Aucune ligne ne correspond aux filtres choisis.",
  "Kanal grubu": "Groupe de canaux",
  "Organik arama": "Recherche organique",
  "Tüm trafik": "Tout le trafic",
  "Ziyaretçiler siteye hangi sayfadan giriyor ve o sayfada kalıp bir sonuca ulaşıyor mu?":
    "Sur quelle page les visiteurs accèdent-ils au site, y restent-ils et parviennent-ils à un résultat ?",
  "Hangi sayfalar en çok görüntüleniyor ve okurlar orada ne kadar vakit geçiriyor?":
    "Quelles pages obtiennent le plus de vues, et combien de temps les lecteurs y passent-ils ?",
  "Ziyaretçiler hangi kanallardan geliyor ve hangi kanal gerçekten sonuç getiriyor?":
    "De quels canaux proviennent les visiteurs et lequel apporte réellement des résultats ?",
  "Sonuç saydığınız olaylar ne sıklıkla gerçekleşiyor ve kaç kişi tetikliyor?":
    "À quelle fréquence les événements que vous considérez comme des résultats se produisent-ils et combien de personnes les déclenchent ?",
  "Hangi ürünler görüntüleniyor, sepete ekleniyor ve gelir getiriyor? Mülkte e-ticaret ölçümü yoksa bu sekme boş kalır.":
    "Quels articles sont consultés, ajoutés au panier et génèrent des revenus ? Cet onglet reste vide si la propriété ne mesure pas l'e-commerce.",
  "Ziyaretçiler sitenizde ne arıyor? Bulamadıkları içerik, yazacağınız yeni sayfaların ipucudur.":
    "Que recherchent les visiteurs sur votre site ? Le contenu qu'ils ne trouvent pas donne des indices sur les nouvelles pages à écrire.",
  "Ziyaretçileriniz hangi cihazlardan geliyor ve cihaza göre deneyim nasıl değişiyor?":
    "Quels appareils vos visiteurs utilisent-ils et comment l'expérience change-t-elle selon l'appareil ?",
  "Ziyaretçiler siteye hangi sayfadan giriyor, orada ne yapıyor.":
    "Sur quelle page les visiteurs accèdent au site et ce qu'ils y font.",
  "Ölçüm durumu": "État des mesures",
  "Satır sayısı": "Lignes",
  "Analytics gerçekten ölçüyor mu? Mülkünüzün kurulum ayarlarını okur, rapor kotanızdan harcamaz.":
    "Analytics mesure-t-il vraiment ? Cette vérification lit la configuration de votre propriété et n'utilise pas votre quota de rapports.",
  "Kitleyi neye göre böl": "Répartir l'audience par",
  "Trafiği neye göre böl": "Répartir le trafic par",
  "Rapor alınamadı": "Impossible de charger le rapport",
  "Web veri akışı yok": "Aucun flux de données Web",
  "Bu mülke bir web veri akışı eklenmeden site trafiği hiç ölçülmez.":
    "Le trafic du site n'est pas mesuré du tout tant que cette propriété n'a pas de flux de données Web.",
  "Gelişmiş ölçüm kapalı": "Mesure améliorée désactivée",
  "Kaydırma, dış bağlantı ve dosya indirme gibi olaylar toplanmıyor. Akış ayarlarından açabilirsiniz.":
    "Les événements tels que les défilements, les clics sortants et les téléchargements de fichiers ne sont pas collectés. Vous pouvez les activer dans les paramètres du flux.",
  "Site içi arama ölçülmüyor": "La recherche sur site n'est pas mesurée",
  "Sitenizde arama kutusu varsa, ziyaretçilerin ne aradığını göremezsiniz.":
    "Si votre site dispose d'un champ de recherche, vous ne pouvez pas voir ce que les visiteurs recherchent.",
  "Anahtar olay tanımlı değil": "Aucun événement clé configuré",
  "Anahtar olay olmadan trafiğin sonuca dönüşüp dönüşmediği ölçülemez; her rapor oturum sayısında kalır.":
    "Sans événements clés, il n'y a aucun moyen de savoir si le trafic se transforme en résultats ; chaque rapport s'arrête au nombre de sessions.",
  "Envanter eksik olabilir": "L'inventaire est peut-être incomplet",
  'Google bu mülkün listesini eksik verdi. Sayımlara ve "eksik yok" sonucuna tam güvenmeyin.':
    "Google a renvoyé une liste incomplète pour cette propriété. Ne vous fiez pas entièrement aux décomptes ni à un résultat « rien ne manque ».",
  Kaydırma: "Défilements",
  "Dış bağlantı": "Clics sortants",
  "Dosya indirme": "Téléchargements de fichiers",
  "Sayfa geçişleri": "Changements de page",
  "Her tetiklemede sayılır": "Une fois par événement",
  "Oturumda bir kez sayılır": "Une fois par session",
  "Android uygulaması": "Application Android",
  "iOS uygulaması": "Application iOS",
  "Ölçüm durumu okunamadı": "Impossible de lire l'état des mesures",
  "Web veri akışı": "Flux de données Web",
  "{count} akıştan web olanlar": {
    one: "Les flux Web sur {count} flux",
    other: "Les flux Web sur {count} flux",
  },
  "Web akışı yok": "Aucun flux Web",
  "Tüm akışlar web": "Tous les flux sont Web",
  "Önemli saydığınız hareket, örneğin form gönderme ya da satın alma. Tanımlı değilse rapor hep 0 gösterir.":
    "Une action que vous considérez comme importante, comme l'envoi d'un formulaire ou un achat. Les rapports affichent 0 tant qu'aucune n'est configurée.",
  "Özel boyut": "Dimensions personnalisées",
  "{count} özel metrik": {
    one: "{count} métrique personnalisée",
    other: "{count} métriques personnalisées",
  },
  Bulgu: "Constats",
  "Kurulum eksiksiz": "La configuration est complète",
  "Aşağıda açıklanıyor": "Expliqué ci-dessous",
  "Ölçüm kurulumunda eksik yok.":
    "Rien ne manque dans la configuration de mesure.",
  "adres yok": "aucune adresse",
  "Gelişmiş ölçüm açık": "Mesures améliorées activées",
  "{on} / {count} otomatik olay açık":
    "{on} / {count} événements automatiques activés",
  "Gelişmiş ölçüm": "Mesures améliorées",
  "Gelişmiş ölçüm; kaydırma, dış bağlantı tıklaması ve dosya indirme gibi olayları koda dokunmadan toplar. Kapalı olanlar raporlarda hiç görünmez.":
    "Les mesures améliorées collectent des événements tels que les défilements, les clics sortants et les téléchargements de fichiers sans toucher au code. Les événements désactivés n'apparaissent jamais dans les rapports.",
  "açık:": "activés :",
  "kapalı:": "désactivés :",
  "Uygulama veri akışları": "Flux de données d'application",
  "Bu mülke bağlı, web dışındaki akışlar. Buradaki raporlar yalnızca web trafiğini kapsamaz; uygulama verisi de toplamlara karışır.":
    "Flux non Web liés à cette propriété. Les rapports présentés ici ne se limitent pas au trafic Web ; les données de l'application sont également incluses dans les totaux.",
  "Sayım yöntemi": "Méthode de comptage",
  "Sayım yöntemi, aynı oturumda tekrarlanan bir olayın kaç kez sayılacağını belirler. Dönüşüm rakamlarını karşılaştırırken bu ayara bakın.":
    "La méthode de comptage décide combien de fois un événement répété au cours d'une session est compté. Vérifiez-le lorsque vous comparez les nombres de conversions.",
  "Google Analytics bağlandı": "Google Analytics connecté",
  "Google Analytics bağlantısı kesildi": "Google Analytics déconnecté",
  "Bağlantı yükleniyor": "Chargement de la connexion",
  "Bu projenin bağlantısı kontrol edilemedi.":
    "Impossible de vérifier la connexion de ce projet.",
  "Tekrar dene": "Réessayer",
  Vazgeç: "Annuler",
  "Bağlantıyı değiştirmek için Ayarlar'daki Google kurulumunu kontrol edin.":
    "Pour modifier la connexion, vérifiez la configuration Google dans les Paramètres.",
  Gizle: "Masquer",
  "Search Console bağlandı": "Search Console connectée",
  "Search Console bağlantısı kesildi": "Search Console déconnectée",
  "Google erişim anahtarı eksik": "Clé d'accès Google manquante",
  "Search Console'u bağlamak için önce Ayarlar'a Google erişim anahtarınızı girin.":
    "Pour connecter la Search Console, saisissez d'abord votre clé d'accès Google dans les Paramètres.",
  "Ayarlar'ı aç": "Ouvrir les Paramètres",
  "Kurulum kılavuzunu aç": "Ouvrir le guide de configuration",
  görsel: "image",
  haber: "actualités",
  "{count} adres": {
    one: "{count} URL",
    other: "{count} URL",
  },
  "{list} gönderilmiş": "Envoi : {list}",
  "Site haritaları okunamadı": "Impossible de lire les sitemaps",
  "Search Console bağlı değil": "La Search Console n'est pas connectée",
  "Site haritalarınızı Google'ın gözünden görmek için Search Console bağlantısı gerekir.":
    "Connectez la Search Console pour voir vos sitemaps comme Google les voit.",
  Bağlantılar: "Connexions",
  "Google bu mülkün site haritalarını vermedi. Hesabınızın Search Console'da site haritası gönderme yetkisi yoksa, mülke erişseniz bile bu listeyi göremezsiniz.":
    "Google n'a pas renvoyé les sitemaps de cette propriété. Si votre compte ne peut pas envoyer de sitemaps dans la Search Console, vous ne pouvez pas voir cette liste, même avec un accès à la propriété.",
  "Gönderilmiş site haritası yok": "Aucun sitemap envoyé",
  "Google site haritası olmadan da sayfa bulur. Ama site haritası, hangi sayfaları önemsediğinizi ona doğrudan söylemenin yoludur.":
    "Google trouve aussi des pages sans sitemap. Mais un sitemap vous permet de lui indiquer directement les pages qui comptent pour vous.",
  "Site haritaları": "Sitemaps",
  "Google'a gönderdikleriniz ve Google'ın onlarla ne yaptığı.":
    "Ce que vous avez envoyé à Google et ce que Google en a fait.",
  "dizin dosyası": "index de sitemaps",
  "son indirme {date}": "dernière lecture {date}",
  "Google hiç indirmedi": "Google ne l'a jamais lu",
  "{count} hata": {
    one: "{count} erreur",
    other: "{count} erreurs",
  },
  "{count} uyarı": {
    one: "{count} avertissement",
    other: "{count} avertissements",
  },
  Hatalı: "Contient des erreurs",
  İşlenmedi: "En attente",
  Okundu: "Lu",
  İndirilmedi: "Non lu",
  "{provider} bağlantısı tamamlanmadı":
    "La connexion à {provider} n'a pas abouti",
  "Google girişi tamamlanmadı": "La connexion à Google n'a pas abouti",
  "Deneme zaman aşımına uğradı ya da yarıda kesildi. Tek bir tarayıcı sekmesinde yeniden deneyin ve Google adımlarını 10 dakika içinde bitirin. Tekrar ederse tarayıcınızın bu site için çerezlere izin verdiğinden emin olun.":
    "La tentative a expiré ou a été interrompue. Réessayez dans un seul onglet du navigateur et terminez les étapes Google dans les 10 minutes. Si cela se reproduit, assurez-vous que votre navigateur autorise les cookies pour ce site.",
  "{provider} bağlantısı iptal edildi":
    "La connexion à {provider} a été annulée",
  "Google girişi iptal edildi": "La connexion à Google a été annulée",
  "Google'ın izin ekranı kapatıldı ya da reddedildi. Hazır olduğunuzda yeniden deneyebilirsiniz.":
    "L'écran de consentement de Google a été fermé ou refusé. Vous pouvez réessayer dès que vous êtes prêt.",
  "Google hesabı zaten bağlı": "Compte Google déjà lié",
  'Bu Google hesabı zaten başka bir kayıtta bağlı görünüyor. {provider} mülk seçicisini açıp hesabın yanındaki "Hesabı kaldır"a basın, sonra yeniden bağlayın.':
    "Ce compte Google semble déjà lié à un autre enregistrement. Ouvrez le sélecteur de propriétés {provider}, cliquez sur « Supprimer le compte » à côté du compte, puis reconnectez-le.",
  "Bu Google hesabı zaten başka bir kayıtta bağlı görünüyor. Ayarlar'daki mülk seçicisinden hesabı kaldırıp yeniden bağlayın.":
    "Ce compte Google semble déjà lié à un autre enregistrement. Supprimez le compte du sélecteur de propriétés dans les Paramètres, puis reconnectez-le.",
  "Google ile konuşurken bir şeyler ters gitti. Yeniden deneyin. Sürerse hatanın ayrıntısı Yardım ekranındaki günlüklerde.":
    "Une erreur s'est produite lors de l'échange avec Google. Réessayez. Si cela persiste, les détails de l'erreur figurent dans les journaux de l'écran Aide.",
  "{integration} için önce Ayarlar'a Google erişim anahtarınızı girin.":
    "Pour utiliser {integration}, saisissez d'abord votre clé d'accès Google dans les Paramètres.",
  Bağlı: "Connecté",
  "Bağlı değil": "Non connecté",
  "Bu projenin bağlantısını tamamlamak için bir {name} mülkü seçin.":
    "Choisissez une propriété {name} pour terminer la connexion de ce projet.",
  "Bu projenin verisini görmek için {name} bağlayın.":
    "Connectez {name} pour voir les données de ce projet.",
  "Google açılıyor…": "Ouverture de Google…",
  "Mülk seç": "Choisir une propriété",
  Bağlan: "Connecter",
  "Google hesaplarını yönet": "Gérer les comptes Google",
  Kapat: "Fermer",
  "Alan adı mülkü: tüm alt alan adlarını ve http/https adreslerini kapsar.":
    "Propriété de domaine : couvre tous les sous-domaines et les URL http et https.",
  "Mülkü veya hesabı değiştir": "Modifier la propriété ou le compte",
  "Bağlantıyı kes": "Déconnecter",
  "Bağlantı kesilirse bu projenin bu kaynağa bağlı ekranları boş kalır. Veriler silinmez; mülkü yeniden seçerek geri bağlayabilirsiniz.":
    "Si vous vous déconnectez, les écrans de ce projet qui dépendent de cette source deviennent vides. Aucune donnée n'est supprimée ; choisissez à nouveau la propriété pour vous reconnecter.",
  "Bağlantı kesiliyor…": "Déconnexion…",
  "Google hesabı kaldırıldı": "Compte Google supprimé",
  "Google hesabı kaldırılsın mı?": "Supprimer le compte Google ?",
  "Bu hesabın {name} bağlantısı seowatcher'dan kaldırılır. İstediğiniz zaman yeniden bağlayabilirsiniz.":
    "La connexion {name} de ce compte sera supprimée de seowatcher. Vous pourrez le reconnecter à tout moment.",
  "Bağlı projeler kontrol ediliyor": "Vérification des projets liés",
  "Bağlı projeler kontrol edilemedi.":
    "Impossible de vérifier les projets liés.",
  "Bu işlem {name} bağlantısını {count} projeden de kaldırır.": {
    one: "Cela supprime également la connexion {name} de {count} projet.",
    other: "Cela supprime également la connexion {name} de {count} projets.",
  },
  "Hiçbir proje etkilenmeyecek.": "Aucun projet ne sera affecté.",
  "Hesap kaldırılamadı. Tekrar deneyin.":
    "Impossible de supprimer le compte. Réessayez.",
  "Kaldırılıyor…": "Suppression…",
  "Hesabı kaldır": "Supprimer le compte",
  "Google hesabı · {id}": "Compte Google · {id}",
  "Bir mülk seçin…": "Choisir une propriété…",
  "Google mülkleri": "Propriétés Google",
  "Mülk veya hesap ara": "Rechercher des propriétés ou comptes",
  "Mülk veya hesap ara…": "Rechercher des propriétés ou des comptes…",
  "Mülkler yüklenemedi.": "Impossible de charger les propriétés.",
  "{account} hesabını kaldır": "Supprimer le compte {account}",
  "Bağlantının süresi doldu": "La connexion a expiré",
  "{account} hesabını yeniden bağla": "Reconnecter le compte {account}",
  "Yeniden bağlan": "Reconnecter",
  "Bu hesabın görebildiği bir GA4 mülkü yok. Henüz mülk oluşturmadıysanız analytics.google.com'dan oluşturun, sonra bu hesabı ona Görüntüleyici olarak ekleyin.":
    "Ce compte ne voit aucune propriété GA4. Si vous n'en avez pas encore créé, créez-la sur analytics.google.com, puis ajoutez-y ce compte avec le rôle Lecteur.",
  "Bu hesabın görebildiği bir Search Console mülkü yok. Mülkü doğruladıysanız bu hesabı search.google.com/search-console adresinden kullanıcı olarak ekleyin.":
    "Ce compte ne peut voir aucune propriété de la Search Console. Si vous avez vérifié la propriété, ajoutez ce compte en tant qu'utilisateur sur search.google.com/search-console.",
  "Doğrulanmış erişim yok": "Aucun accès vérifié",
  "Eşleşen mülk veya hesap yok": "Aucune propriété ou compte correspondant",
  "Mülkleri bulmak için bir Google hesabı ekleyin.":
    "Ajoutez un compte Google pour rechercher des propriétés.",
  "Google hesabı ekle": "Ajouter un compte Google",
  "Kaydediliyor…": "Enregistrement…",
  "Mülkü kaydet": "Enregistrer la propriété",
  "Sıradaki adımlar": "Étapes suivantes",
  "En hızlı kazandıracak işten başlayın.":
    "Commencez par ce qui rapporte le plus rapidement.",
  "Acil bir iş görünmüyor. Denetim güncel ve kritik sorun yok.":
    "Rien d'urgent. L'audit est à jour et il n'y a aucun problème critique.",
  "Search Console'u bağlayın": "Connecter la Search Console",
  "Hangi kelimede kaçıncı sırada olduğunuzu yalnızca Google bilir. Bağlantı ücretsiz.":
    "Seul Google sait où vous vous classez pour chaque mot-clé. La connexion est gratuite.",
  Bağla: "Connecter",
  "İlk denetimi başlatın": "Lancez votre premier audit",
  "Sitenizi tarar, teknik sorunları önem sırasına göre listeler.":
    "Explore votre site et répertorie les problèmes techniques par gravité.",
  Başlat: "Démarrer",
  "{count} kritik sorun var": {
    one: "{count} problème critique",
    other: "{count} problèmes critiques",
  },
  "Kritik sorunlar Google'ın sayfayı taramasını ya da dizine almasını engelleyebilir.":
    "Des problèmes critiques peuvent empêcher Google d'explorer ou d'indexer une page.",
  Gör: "Afficher",
  "Fırsatlara bakın": "Examiner les opportunités",
  "Sayfalarınız, sıralarına göre değil, üzerinde çalışmaya ne kadar değdiğine göre sıralı.":
    "Vos pages, classées selon l'intérêt de les travailler plutôt que selon leur position.",
  Aç: "Ouvrir",
  "Denetimi tazeleyin": "Actualiser l'audit",
  "Son denetim {when}. Bu ekrandaki sayılar o denetimden geliyor.":
    "Le dernier audit a eu lieu {when}. Les chiffres de cet écran en proviennent.",
  "{count} uyarı var": {
    one: "{count} avertissement",
    other: "{count} avertissements",
  },
  "Kritik değil ama Google'ın sayfayı anlamasını zorlaştırıyor.":
    "Pas critique, mais cela rend la page plus difficile à comprendre pour Google.",
  "Sitenizi ekleyin": "Ajoutez votre site",
  "Bu proje için siteyi ve ülkeyi belirleyin.":
    "Définissez le site et le pays de ce projet.",
  "Başka sitelerinizi de ekleyin": "Ajoutez vos autres sites",
  "Her site için ayrı proje açın.":
    "Créez un projet distinct pour chaque site.",
  "Yapay zeka ajanınızı bağlayın": "Connectez votre agent IA",
  "seowatcher'ı Claude ya da tercih ettiğiniz ajanın içinden kullanın.":
    "Utilisez seowatcher depuis Claude ou l'agent que vous préférez.",
  "Gerçek tıklamalarınızı ve sorgularınızı buraya getirin.":
    "Importez ici vos vrais clics et vos vraies requêtes.",
  "Projeyi anlatın": "Décrivez le projet",
  "Ajanınız ve raporlarınız siteyi tanısın.":
    "Aidez votre agent et vos rapports à connaître le site.",
  "Tercihiniz kaydedilemedi. Tekrar deneyin.":
    "Impossible d'enregistrer votre choix. Réessayez.",
  "Kurulum listesi": "Liste de configuration",
  "Çalışma alanınızı kurun": "Configurez votre espace de travail",
  "Bir adım kaldı.": "Plus qu'une étape.",
  "{count} adım kaldı.": {
    one: "Plus que {count} étape.",
    other: "Plus que {count} étapes.",
  },
  "Hepsi isteğe bağlı, istediğiniz zaman dönebilirsiniz.":
    "Tout est facultatif ; revenez quand vous voulez.",
  "Tek proje bana yeter": "Un projet me suffit",
  "Şimdilik geç": "Passer pour l'instant",
  "{count} adım sonraya bırakıldı": {
    one: "{count} étape reportée",
    other: "{count} étapes reportées",
  },
  "{step} adımını geri al": "Rétablir l’étape {step}",
  "Geri al": "Rétablir",
  "{count} tamamlandı": "Terminées : {count}",
  "Önceki döneme göre yüzde {percent} yüksek.":
    "{percent} % de plus que sur la période précédente.",
  "Önceki döneme göre yüzde {percent} düşük.":
    "{percent} % de moins que sur la période précédente.",
  "Aramada görünürlüğü doğrudan bozan sorunlar; önce bunlar.":
    "Problèmes qui nuisent directement à la visibilité dans la recherche ; corrigez-les en premier.",
  "Sıralamayı zamanla aşındıran, ama acil olmayan sorunlar.":
    "Problèmes qui altèrent les classements au fil du temps mais ne sont pas urgents.",
  "Küçük iyileştirme fırsatları.": "Petites opportunités d'amélioration.",
  "{count} kritik": "{count} critiques",
  "{count} bilgi": "{count} informations",
  "{severity}: {count} bulgu. {hint}": {
    one: "{severity} : {count} constat. {hint}",
    other: "{severity} : {count} constats. {hint}",
  },
  "Önem düzeyi": "Gravité",
  "Kritik sorunlar sayfanın aramada görünmesini engelleyebilir, uyarılar sıralamayı zamanla aşındırır, bilgi notları ise küçük iyileştirmelerdir. Çubuğa ya da altındaki etiketlerden birine tıklarsanız sorun listesine geçersiniz.":
    "Les problèmes critiques peuvent exclure une page de la recherche, les avertissements dégradent les classements au fil du temps et les informations signalent de petites améliorations. Cliquez sur la barre ou sur l'un des libellés en dessous pour ouvrir la liste des problèmes.",
  "Son denetimin ne kadar eski olduğu okunamadı.":
    "Impossible de déterminer l'âge du dernier audit.",
  "Son denetimin üzerinden {count} gün geçti. Sitede değişiklik yaptıysanız yeni bir denetim başlatmak iyi olur.":
    {
      one: "{count} jour s'est écoulé depuis le dernier audit. Si vous avez modifié le site, il vaut la peine d'en lancer un nouveau.",
      other:
        "{count} jours se sont écoulés depuis le dernier audit. Si vous avez modifié le site, il vaut la peine d'en lancer un nouveau.",
    },
  "Denetimi başlat": "Démarrer l'audit",
  "Son denetimde yeni çıkanlar": "Nouveau lors du dernier audit",
  "Yeni sorun yok.": "Aucun nouveau problème.",
  Düzelenler: "Corrigé",
  "Düzelen sorun yok.": "Aucun problème corrigé.",
  "{count} sayfa": { one: "{count} page", other: "{count} pages" },
  "Site denetimi": "Audit du site",
  "Kırık bağlantılar, eksik etiketler ve dizine girme sorunları için sitenizi tarayın.":
    "Explorez votre site à la recherche de liens rompus, de balises manquantes et de problèmes d'indexation.",
  "{count} sayfa tarandı · {date}": {
    one: "{count} page explorée · {date}",
    other: "{count} pages explorées · {date}",
  },
  "denetim sürüyor": "audit en cours",
  "son denetim başarısız": "échec du dernier audit",
  Ayrıntılar: "Détails",
  "Denetim sürüyor, sonuçlar bittiğinde görünecek.":
    "L'audit est en cours ; les résultats apparaissent une fois l'audit terminé.",
  "Son denetim tamamlanamadı, bu yüzden sonuç yok.":
    "Le dernier audit n'a pas pu se terminer, il n'y a donc aucun résultat.",
  "Sorun bulunamadı, siteniz sağlıklı görünüyor.":
    "Aucun problème trouvé ; votre site semble en bonne santé.",
  "+ {count} sorun daha": {
    one: "+ {count} autre problème",
    other: "+ {count} autres problèmes",
  },
  "En çok sorunu olan sayfalar": "Pages avec le plus de problèmes",
  "{count} sorun": { one: "{count} problème", other: "{count} problèmes" },
  "Son {days} gün": "{days} derniers jours",
  "Search Console verisi alınamadı":
    "Impossible de charger les données de la Search Console",
  "Bağlanınca görünür": "S'affiche une fois connecté",
  "Bu dönemde gösterim yok": "Aucune impression sur cette période",
  Tıklama: "Clics",
  Gösterim: "Impressions",
  "Tıklama oranı": "CTR",
  "Ortalama sıra": "Position moyenne",
  "{period} · düşük sayı daha iyi: 1, listenin en üstü demek":
    "{period} · plus le chiffre est bas, mieux c’est : 1 correspond à la première place",
  Panel: "Tableau de bord",
  "Panel yüklenemedi": "Impossible de charger le tableau de bord",
  "Denetim özeti yüklenemedi": "Impossible de charger le résumé d'audit",
  "Bu istemi ajanınıza yapıştırın; seowatcher'ı sizin için kendiliğinden kuracak.":
    "Collez cette invite dans votre agent ; il configure seowatcher pour vous.",
  "seowatcher eklentisi": "seowatcher plugin",
  "Ajan bağlantısı (MCP) ve hazır SEO görevleri":
    "Connexion de l'agent (MCP) et tâches SEO prêtes à l'emploi",
  "Kurulum istemini kopyala": "Copier l'invite de configuration",
  "Kurulum istemi kopyalandı": "Invite de configuration copiée",
  "Kurulumu elle yapın": "Configurer manuellement",
  "Ne sattığınız, kimi hedeflediğiniz ve hangi sayfaların para kazandırdığı burada duruyor. Rapor şablonları ve bağladığınız ajan bu bilgiyi okuyor; boşken ikisi de siteyi tanımadan yorum yapıyor.":
    "C'est ici que vous indiquez ce que vous vendez, qui vous ciblez et quelles pages rapportent de l'argent. Les modèles de rapport et votre agent connecté lisent ces informations ; tant qu'elles sont vides, tous deux commentent sans connaître le site.",
  "Proje bilgisini doldurun": "Remplir le contexte du projet",
  'Her sitenin araştırmasını, sıralamalarını ve bağlantılarını kendi projesinde tutun. Yan menüdeki proje değiştiriciden "Yeni proje" diyerek istediğiniz zaman ekleyebilirsiniz.':
    "Conservez les recherches, les classements et les connexions de chaque site dans son propre projet. Ajoutez-en un à tout moment avec « Nouveau projet » dans le sélecteur de projets de la barre latérale.",
  "Başka bir proje oluştur": "Créer un autre projet",
  "Bir site listeniz mi var? Ajanınız hepsini kursun.":
    "Vous avez une liste de sites ? Laissez votre agent les configurer tous.",
  "{link}, sonra site listenizle birlikte bu istemi yapıştırın.":
    "{link}, puis collez cette invite avec votre liste de sites.",
  "Ajanınızı bağlayın": "Connectez votre agent",
  "Proje istemini kopyala": "Copier l'invite du projet",
  "Proje istemi kopyalandı": "Invite du projet copiée",
  "Site kaydedildi": "Site enregistré",
  "Siteniz kaydedilemedi. Tekrar deneyin.":
    "Impossible d'enregistrer votre site. Réessayez.",
  "Bu projenin sitesini ekleyin ve müşterilerinizin arama yaptığı ülkeyi seçin. İkisini de proje ayarlarından istediğiniz zaman değiştirebilirsiniz.":
    "Ajoutez le site de ce projet et choisissez le pays depuis lequel vos clients effectuent leurs recherches. Vous pouvez modifier les deux à tout moment dans les paramètres du projet.",
  "Site adresi": "Adresse du site",
  "Siteyi kaydet": "Enregistrer le site",
  "{count} oturum": { one: "{count} session", other: "{count} sessions" },
  "Organik trafik": "Trafic organique",
  Raporlar: "Rapports",
  Yönet: "Gérer",
  "Google Analytics verileri yüklenemedi.":
    "Impossible de charger les données Google Analytics.",
  "Bu aralıkta organik arama trafiği kaydedilmemiş.":
    "Aucun trafic de recherche organique n'a été enregistré sur cette période.",
  "Aktif kullanıcı": "Utilisateurs actifs",
  Sipariş: "Transactions",
  "Gösterilecek oturum verisi yok.": "Aucune donnée de session à afficher.",
  "{days} günde toplam {total} oturum. En yüksek gün {day}, {peak} oturum.":
    "{total} sessions sur {days} jours. Jour de pointe : {day}, avec {peak} sessions.",
  "Kart gizlenemedi. Tekrar deneyin.":
    "Impossible de masquer la carte. Réessayez.",
  "Search Console ve Analytics aynı erişim anahtarını kullanır. Önce onu Ayarlar'a girin.":
    "Search Console et Analytics utilisent la même clé d'accès. Saisissez-la d'abord dans les Paramètres.",
  "Google erişim anahtarını Ayarlar'a girin":
    "Saisissez la clé d'accès Google dans les Paramètres",
  "Tıklama eğilimi": "Tendance des clics",
  "Sorguları aç": "Ouvrir les requêtes",
  "tıklama, son {days} gün": "clics, {days} derniers jours",
  "önceki döneme göre": "vs. période précédente",
  "Son {days} günde {total} tıklama.":
    "{total} clics au cours des {days} derniers jours.",
  "En yüksek gün {day}, {clicks} tıklama.":
    "Jour de pointe {day}, avec {clicks} clics.",
  tıklama: "clics",
  "Sıra 5-20 arası sorgular": "Requêtes en positions 5 à 20",
  "Tümünü gör": "Tout afficher",
  "Şu an 5. ile 20. sıra arasında sorgu yok. Sorgular bu aralığa girdikçe burada listelenir.":
    "Aucune requête ne se classe entre les positions 5 et 20 pour le moment. Elles sont listées ici dès qu'elles entrent dans cette plage.",
  "{impressions} gösterim · sıra {position}":
    "{impressions} impressions · position {position}",
  "seowatcher.io sitesini yeni sekmede aç":
    "Ouvrir le site seowatcher.io dans un nouvel onglet",
  Duyurular: "Annonces",
  "seowatcher ekibinden ürün, bakım ve güvenlik güncellemeleri.":
    "Mises à jour produit, maintenance et sécurité de l'équipe seowatcher.",
  "Duyurular şu anda alınamıyor":
    "Les annonces ne sont pas disponibles pour le moment",
  "Duyurular alınamadı ({status})":
    "Impossible de charger les annonces ({status})",
  "Bağlantınızı kontrol edip yeniden deneyin.":
    "Vérifiez votre connexion et réessayez.",
  "Şimdilik yeni duyuru yok": "Aucune nouvelle annonce pour l'instant",
  "Yeni bir duyuru yayımlandığında burada görünecek.":
    "Les nouvelles annonces apparaîtront ici dès leur publication.",
  "Ürün yeniliği": "Mise à jour du produit",
  Bakım: "Maintenance",
  Güvenlik: "Sécurité",
  Yeni: "Nouveau",
  "Sıralama takibi": "Suivi des classements",
  Fırsatlar: "Opportunités",
  "Kayıtlı kelimeler": "Mots-clés enregistrés",
  "Arama performansı": "Performances de recherche",
  "Proje bilgisi": "Contexte du projet",
  "Ajan kurulumu": "Configuration de l'agent",
  Ajan: "Agent",
  "Arama ve site": "Recherche et site",
  "Kenar çubuğunu kapat": "Fermer la barre latérale",
  "Ana gezinme": "Navigation principale",
  Yardım: "Aide",
  Ayarlar: "Paramètres",
  Kopyala: "Copier",
  "Pano kullanılamıyor": "Le presse-papiers n'est pas disponible",
  "Panoya kopyalanamadı": "Impossible de copier dans le presse-papiers",
  Kopyalandı: "Copié",
  "Bir şeyler ters gitti. Lütfen yeniden deneyin.":
    "Une erreur s'est produite. Veuillez réessayer.",
  "Yeniden dene": "Réessayer",
  "Ana sayfa": "Accueil",
  "Geri dön": "Retour",
  "Sayfa bulunamadı": "Page introuvable",
  "Bu adreste bir sayfa yok": "Il n'y a pas de page à cette adresse",
  "Adres yanlış yazılmış ya da sayfa kaldırılmış olabilir. Panelden devam edebilir ya da Yardım'a bakabilirsiniz.":
    "L'adresse est peut-être mal saisie, ou la page a été supprimée. Vous pouvez continuer depuis le Tableau de bord ou consulter l'Aide.",
  "Panele dön": "Retour au Tableau de bord",
  "{label} hakkında açıklama": "À propos de {label}",
  "Ülke: {country}": "Pays : {country}",
  seçilmedi: "non sélectionné",
  "Ülke seçin": "Sélectionnez un pays",
  "Ülke ara": "Rechercher des pays",
  "“{query}” ile eşleşen ülke yok": "Aucun pays ne correspond à « {query} »",
  arttı: "en hausse",
  azaldı: "en baisse",
  Sürüyor: "En cours",
  Tamamlandı: "Terminé",
  Uyarı: "Avertissement",
  Hata: "Erreur",
  bekliyor: "en attente",
  "Bu bölüm yüklenemedi": "Cette section n'a pas pu être chargée",
  "Uygulamaya ulaşılamadı. Uygulamanın açık olduğunu kontrol edip yeniden deneyin.":
    "Impossible d'accéder à l'application. Vérifiez qu'elle est en cours d'exécution et réessayez.",
  Yenile: "Actualiser",
  Güncellendi: "Mis à jour",
  "Güncellendi: {time}": "Mis à jour {time}",
  Güncelleniyor: "Mise à jour en cours",
  "Giriş gerekli": "Connexion requise",
  "Bu kurulum dışarıdan bir giriş korumasının arkasında. Sayfayı yenileyip tekrar deneyin.":
    "Cette installation se trouve derrière une connexion externe. Rechargez la page et réessayez.",
  "Seçimi kaldır": "Effacer la sélection",
  "{total} {totalLabel}; en büyük pay {lead}, {share}.":
    "{total} {totalLabel} ; la plus grande part est {lead}, {share}.",
  "{total} {totalLabel}.": "{total} {totalLabel}.",
  "Satırı seç: {name}": "Sélectionner la ligne : {name}",
  "Satırı seç": "Sélectionner la ligne",
  "Tüm satırları seç": "Sélectionner toutes les lignes",
  "{count} satır panoya kopyalandı": {
    one: "{count} ligne copiée dans le presse-papiers",
    other: "{count} lignes copiées dans le presse-papiers",
  },
  "Google E-Tablolar'da yeni bir dosya açıp yapıştırın.":
    "Ouvrez un nouveau fichier dans Google Sheets et collez les données.",
  "Google E-Tablolar'da yeni dosya aç":
    "Ouvrir un nouveau fichier dans Google Sheets",
  "{label} sütununa göre sırala (şu an artan)":
    "Trier par {label} (actuellement croissant)",
  "{label} sütununa göre sırala (şu an azalan)":
    "Trier par {label} (actuellement décroissant)",
  "{label} sütununa göre sırala": "Trier par {label}",
  seçili: "sélectionné",
  "Toplu işlemler": "Actions groupées",
  "Seçili satırları dışa aktar": "Exporter les lignes sélectionnées",
  "Dışa aktar": "Exporter",
  "Dışa aktarma seçenekleri": "Options d'export",
  "Sayfa başına satır": "Lignes par page",
  "Sayfa {page} / {total}": "Page {page} sur {total}",
  "Sayfa {page}": "Page {page}",
  "Önceki sayfa": "Page précédente",
  "Sonraki sayfa": "Page suivante",
  "Adresi kopyala": "Copier l'URL",
  "Adres kopyalandı": "URL copiée",
  "Oturumunuz doğrulanamadı. Sayfayı yenileyip tekrar deneyin.":
    "Votre session n'a pas pu être vérifiée. Actualisez la page et réessayez.",
  "Giriş ayarı eksik. Yardım ekranındaki kurulum belgelerine bakın.":
    "La connexion n'est pas configurée. Consultez le guide de configuration sur l'écran d'aide.",
  "Bu işlem için yetkiniz yok.":
    "Vous n'êtes pas autorisé à effectuer cette action.",
  "Kayıt bulunamadı.": "Enregistrement introuvable.",
  "Şu an çok fazla denetim çalışıyor. Biri bitince yeniden deneyin.":
    "Trop d'audits sont en cours en ce moment. Réessayez lorsque l'un d'eux sera terminé.",
  "Bir denetim en çok {max} sayfa tarayabilir.":
    "Un audit peut explorer au maximum {max} pages.",
  "Aynı anda çalışabilecek denetim sayısına ulaştınız. Biri bitene kadar bekleyin ya da çalışan birini silin.":
    "Vous avez atteint le nombre d'audits pouvant s'exécuter simultanément. Attendez qu'un audit se termine ou supprimez-en un en cours.",
  "Girdiğiniz bilgileri kontrol edip tekrar deneyin.":
    "Vérifiez ce que vous avez saisi et réessayez.",
  "Güvenlik nedeniyle bu adres taranamaz.":
    "Cette adresse ne peut pas être explorée pour des raisons de sécurité.",
  "Çok fazla istek gönderildi. Biraz bekleyip tekrar deneyin.":
    "Trop de requêtes. Attendez un moment et réessayez.",
  "Google bu isteği yanıtlamadı. Birazdan tekrar deneyin; sürerse Ayarlar'dan Google bağlantısını kontrol edin.":
    "Google n'a pas répondu à cette requête. Réessayez dans un instant ; si le problème persiste, vérifiez la connexion Google dans les Paramètres.",
  "Bu, zaten var olan bir kayıtla çakışıyor.":
    "Ceci est en conflit avec un enregistrement existant.",
  "Bir şeyler ters gitti. Yardım ekranından tanılama paketini indirip sorunu bildirin.":
    "Une erreur s'est produite. Téléchargez le paquet de diagnostic depuis l'écran Aide et signalez le problème.",
  "Dışa aktarılacak veri yok": "Il n'y a aucune donnée à exporter",
  "Bir site adresi girin, örneğin example.com.":
    "Entrez une adresse de site, par exemple exemple.com.",
  "Bu bir site adresine benzemiyor.":
    "Cela ne ressemble pas à une adresse de site.",
  "Geçerli bir alan adı girin, örneğin example.com.":
    "Saisissez un domaine valide, par exemple example.com.",
  "Bu tarayıcıda pano erişimi yok.":
    "Ce navigateur n'a pas accès au presse-papiers.",
  "Ana içeriğe geç": "Passer au contenu principal",
  "Kenar çubuğunu aç": "Ouvrir la barre latérale",
  "Ana menü": "Menu principal",
  "Proje yüklenemedi": "Impossible de charger le projet",
  "Proje bulunamadı": "Projet introuvable",
  "Bu proje silinmiş ya da arşivlenmiş olabilir.":
    "Ce projet a peut-être été supprimé ou archivé.",
  "Proje güncellendi": "Projet mis à jour",
  "Proje güncellenemedi": "Impossible de mettre à jour le projet",
  "Proje adı gerekli": "Un nom de projet est requis",
  "Temel bilgiler": "Informations de base",

  Ad: "Nom",
  "Yalnızca sizin içindir. Proje değiştiricide ve raporların başlığında görünür, Google'a gitmez.":
    "Juste pour vous. Il apparaît dans le sélecteur de projet et dans les titres des rapports, et n'est jamais envoyé à Google.",
  "Alan adı": "Domaine",
  "(isteğe bağlı)": "(facultatif)",

  "Kaydettiğiniz anahtar kelimeler bu ülke ve dile göre saklanır.":
    "Les mots-clés que vous enregistrez sont stockés pour ce pays et cette langue.",
  "Değişiklikleri kaydet": "Enregistrer les modifications",
  "Proje arşivlendi": "Projet archivé",
  "Proje arşivlenemedi": "Impossible d'archiver le projet",
  "Projeyi arşivle": "Archiver le projet",
  "Arşivlenen proje kenar çubuğundan kalkar ama hiçbir verisi silinmez. Denetimler, kelimeler ve raporlar durur, geri alınca aynen döner.":
    "Un projet archivé disparaît de la barre latérale, mais aucune de ses données n'est supprimée. Les audits, mots-clés et rapports sont suspendus et reviennent inchangés lorsque vous le restaurez.",
  "{name} projesini arşivlerseniz çalışma alanınızdan kaldırılır. Daha sonra Projeler sayfasından geri alabilirsiniz.":
    "L'archivage de {name} le supprime de votre espace de travail. Vous pourrez le restaurer ultérieurement à partir de la page Projets.",
  "Evet, projeyi arşivle": "Oui, archiver le projet",
  "Bu projeyi arşivleyerek çalışma alanınızdan kaldırabilirsiniz.":
    "Archivez ce projet pour le retirer de votre espace de travail.",
  "Tek projenizi arşivleyemezsiniz.":
    "Vous ne pouvez pas archiver votre seul projet.",
  "Proje değiştir": "Changer de projet",
  "Proje ayarları": "Paramètres du projet",
  "Proje ara…": "Rechercher des projets…",
  "Projeleri filtrele": "Filtrer les projets",
  Projeler: "Projets",
  "“{query}” ile eşleşen proje yok": "Aucun projet ne correspond à « {query} »",
  "Yeni proje": "Nouveau projet",
  "Projeleri yönet": "Gérer les projets",
  "Projeler yüklenemedi.": "Impossible de charger les projets.",
  "Projeler yükleniyor": "Chargement des projets",
  "Proje seçin": "Sélectionner un projet",
  "Proje oluşturuldu": "Projet créé",
  "Proje oluşturulamadı": "Impossible de créer le projet",
  "Projeyi oluşturduktan sonra Search Console'u bağlayın; arama ve sıralama verileri oradan gelir.":
    "Après avoir créé le projet, connectez la Search Console ; les données de recherche et de classement proviennent de là.",
  "Kaydettiğiniz anahtar kelimeler bu ülke ve dile göre saklanır. Sonradan proje ayarlarından değiştirebilirsiniz.":
    "Les mots-clés que vous enregistrez sont stockés pour ce pays et cette langue. Vous pourrez modifier cela plus tard dans les paramètres du projet.",
  "Proje oluştur": "Créer un projet",
  Ülke: "Pays",
  Dil: "Langue",
  "Proje tanımı": "Définition du projet",
  "{count} bölümün hepsi dolu.": {
    one: "{count} section est remplie.",
    other: "Les {count} sections sont toutes remplies.",
  },
  "{total} bölümün {filled} tanesi dolu. Boş olan: {missing}.":
    "{filled} sections remplies sur {total}. Vides : {missing}.",
  "Gözden geçir": "Vérifier",
  Doldur: "Remplir",
  Rakipler: "Concurrents",
  "{count} rakip kayıtlı.": {
    one: "{count} concurrent enregistré.",
    other: "{count} concurrents enregistrés.",
  },

  "Rakip ekle": "Ajouter un concurrent",
  "Önemli sayfalar": "Pages clés",
  "{count} önemli sayfa kayıtlı.": {
    one: "{count} page clé enregistrée.",
    other: "{count} pages clés enregistrées.",
  },

  "Sayfa ekle": "Ajouter une page",

  "Bağlı değil. Sıralama, arama performansı ve fırsatlar bu bağlantıya dayanır.":
    "Non connecté. Le suivi des classements, les performances de recherche et les opportunités dépendent de cette connexion.",

  "PageSpeed anahtarı": "Clé PageSpeed",

  "Anahtar gir": "Saisir la clé",
  "İşin özeti": "Présentation de l'activité",
  "Şu anki hedef": "Objectif actuel",
  Konumlandırma: "Positionnement",
  "Yazım tercihleri": "Préférences de rédaction",
  "Ne satıyorsunuz, kim alıyor, nerede.":
    "Ce que vous vendez, qui l'achète et où.",
  "Şu anda neyin peşindesiniz ve ne zamana kadar.":
    "Ce que vous visez en ce moment, et pour quand.",
  "Biri neden alternatifler yerine sizi seçsin.":
    "Pourquoi vous choisir plutôt que les alternatives.",
  "Üslup, kullanılmayacak kelimeler, girilmeyecek konular.":
    "Ton, mots à éviter, sujets à ne pas aborder.",
  "örn. Bağımsız restoranlar için rezervasyon yazılımı. Alıcılar pazarlamacı değil, işletme sahipleri.":
    "Par ex. Logiciel de réservation pour restaurants indépendants. Les acheteurs sont les propriétaires, pas des marketeurs.",
  "örn. Dördüncü çeyreğe kadar organik üyelikleri ikiye katlamak. Karşılaştırma sayfaları şu anki öncelik.":
    "Par ex. Doubler les inscriptions organiques d'ici le quatrième trimestre. Les pages comparatives sont la priorité actuelle.",
  "örn. Bir öğleden sonrada kurulan tek rezervasyon aracı. Mevcut rakiplerden ucuz, kendin yap çözümlerden basit.":
    "Par ex. Le seul outil de réservation que vous pouvez mettre en place en un après-midi. Moins cher que les acteurs établis, plus simple que le fait-maison.",
  "örn. Sade ve doğrudan, abartı yok. “Kusursuz” ya da “devrim niteliğinde” yazmayın. Rakip fiyatlarına girmeyin.":
    "Par ex. Simple et direct, sans emphase. N'écrivez pas « fluide » ni « révolutionnaire ». N'abordez pas les prix des concurrents.",

  "Proje bilgisi yüklenemedi": "Impossible de charger le contexte du projet",
  "Henüz boş. Kendiniz doldurabilir ya da ajanınıza sitenizden taslak çıkarttırıp onaylayabilirsiniz.":
    "Vide pour l'instant. Remplissez-le vous-même ou demandez à votre agent de le rédiger à partir de votre site et de l'approuver.",
  Boş: "Vide",
  "{count} bölüm kaydedilmedi": {
    one: "{count} section non enregistrée",
    other: "{count} sections non enregistrées",
  },
  "Özel bölümler": "Sections personnalisées",
  "Bir ajanın not aldığı, yukarıdaki bölümlere sığmayan her şey.":
    "Tout ce qu'un agent a noté qui ne correspond pas aux sections ci-dessus.",
  "Burada henüz bir şey yok. Ajanlar başka yere sığmayan önemli bir şey öğrendiklerinde buraya bir bölüm ekler.":
    "Rien ici pour l'instant. Lorsque les agents apprennent quelque chose d'important qui ne convient nulle part ailleurs, ils ajoutent une section ici.",
  "{title} bölümünü düzenle": "Modifier la section {title}",
  "{title} bölümünü sil": "Supprimer la section {title}",
  "Bölüm başlığı": "Titre de la section",
  "Bölüm içeriği": "Contenu de la section",
  "Merkez sayfa": "Page pilier",
  "Destek sayfası": "Page de soutien",
  "Dönüşüm sayfası": "Page de conversion",
  "Sitenin en önemli sayfaları. Tam liste olması gerekmez.":
    "Les pages les plus importantes du site. Il n'est pas nécessaire qu'il s'agisse d'une liste complète.",
  "Henüz önemli sayfa yok. Sıralamada olması gereken birkaç sayfayı ekleyin, ya da bir ajan son site denetiminizden bunları önersin.":
    "Aucune page clé pour l'instant. Ajoutez quelques pages qui devraient se positionner, ou demandez à un agent de les suggérer à partir de votre dernier audit du site.",
  "Hedef: {topic}": "Cible : {topic}",
  "{url} sayfasını düzenle": "Modifier la page {url}",
  "{url} sayfasını kaldır": "Supprimer la page {url}",
  "Sayfa adresi": "URL de la page",
  "Sayfa rolü": "Rôle de la page",
  "Hedef konu (isteğe bağlı)": "Sujet cible (facultatif)",
  "Hedef konu": "Sujet cible",
  "Notlar (isteğe bağlı)": "Notes (facultatif)",
  "Sayfa notları": "Notes de page",
  "Kendinizi kıyasladığınız siteler.":
    "Sites avec lesquels vous vous comparez.",
  "Henüz rakip yok. Rekabet ettiğiniz siteleri ekleyin, ya da bağladığınız ajandan bunları bulup buraya kaydetmesini isteyin.":
    "Aucun concurrent pour l'instant. Ajoutez les sites avec lesquels vous êtes en concurrence ou demandez à votre agent connecté de les trouver et de les enregistrer ici.",
  "{domain} rakibini düzenle": "Modifier le concurrent {domain}",
  "{domain} rakibini kaldır": "Supprimer le concurrent {domain}",
  "Rakip alan adı": "Domaine du concurrent",
  "Ad (isteğe bağlı)": "Nom (facultatif)",
  "Rakip adı": "Nom du concurrent",
  "Neden önemliler? Örn. her karşılaştırma aramasında önde (isteğe bağlı)":
    "Pourquoi sont-ils importants ? Par ex. devant dans chaque recherche comparative (facultatif)",
  "Rakip notları": "Notes des concurrents",
  "Proje bilgisi güncellendi": "Contexte du projet mis à jour",
  "Değişiklikleriniz kaydedilemedi":
    "Impossible d'enregistrer vos modifications",
  siz: "vous",
  ajan: "l'agent",
  "yapay zeka istemciniz": "votre client IA",
  "{author} güncelledi · {time}": "Mis à jour par {author} · {time}",
  "{author} ekledi": "Ajouté par {author}",
  Kaldır: "Supprimer",
  Kaydet: "Enregistrer",
  "Ajanınıza doldurtabilirsiniz": "Laissez votre agent le remplir",
  "Ajanınıza gözden geçirtin": "Faire relire par votre agent",

  "İstemi kopyala": "Copier l'invite",
  "İstem kopyalandı": "Invite copiée",
  "Araştırma günlüğü": "Journal de recherche",

  "Henüz kayıt yok. Bağladığınız ajan bir araştırma yaptıkça buraya yazar.":
    "Aucune entrée pour l'instant. Votre agent connecté écrit ici pendant qu'il effectue des recherches.",
  "{date} tarihli kaydı sil": "Supprimer l'entrée du {date}",
  "Kurulum durumu": "État de la configuration",

  Tamam: "Terminé",
  Eksik: "Manquant",
  "Kontrol ediliyor": "Vérification",
  Denetlenemedi: "Vérification impossible",
  "Durum okunuyor…": "Lecture de l'état…",
  "Durum okunamadı. Yeniden deneyin.": "Impossible de lire l'état. Réessayez.",
  "Şablona bir ad verin.": "Donnez un nom au modèle.",
  "Bu şablonun ne zaman kullanılacağını tek cümleyle yazın.":
    "Écrivez en une phrase quand ce modèle doit être utilisé.",
  "Raporun kime yazıldığını ve hangi bölümlerden oluştuğunu yazın.":
    "Écrivez à qui le rapport est destiné et quelles sections il contient.",
  "Kitle: müşterinin pazarlama sorumlusu, teknik biri değil.\nBölümler, sırayla: Neredeyiz / Bu ay ne yaptık / Ne değişti / Sırada ne var.\nÜslup: sade ve kendinden emin. Her SEO terimini açıkla. Ünlem kullanma.\nİmza: Acme SEO\nVurgu rengi: #1C4ED8":
    "Audience : le responsable marketing du client, pas une personne technique.\nSections, dans l'ordre : Où nous en sommes / Ce que nous avons fait ce mois-ci / Ce qui a changé / La suite.\nTon : simple et assuré. Expliquez chaque terme SEO. Pas de points d'exclamation.\nSignature : Acme SEO\nCouleur d'accent : #1C4ED8",
  "Şablon oluşturuldu": "Modèle créé",
  "Şablon kaydedildi": "Modèle enregistré",
  "Şablon kaydedilemedi": "Impossible d'enregistrer le modèle",
  "Şablonu düzenle": "Modifier le modèle",
  "Yeni şablon": "Nouveau modèle",
  "Aylık müşteri değerlendirmesi": "Bilan mensuel client",
  Açıklama: "Description",
  "Ne zaman kullanılacağını anlatan tek cümle. Bir ajan kararını buna bakarak verir.":
    "Une phrase expliquant quand l'utiliser. Un agent décide en fonction de cela.",
  "Sürekli çalıştığımız müşterilere gönderdiğimiz aylık güncelleme.":
    "La mise à jour mensuelle que nous envoyons à nos clients actuels.",
  Yönerge: "Instructions",
  "Projenin geneline ait marka dili Proje bilgisi › Yazım tercihleri altında tutulur.":
    "La voix de la marque pour l'ensemble du projet se trouve dans Contexte du projet › Préférences de rédaction.",
  "Şablon oluştur": "Créer un modèle",
  Rapor: "Rapports",
  "Son 7 gün": "7 derniers jours",
  "Bu sürede güncellenen": "Mis à jour sur cette période",
  "Son güncelleme": "Dernière mise à jour",
  "{date} · raporu aç": "{date} · ouvrir le rapport",
  "Türe göre raporlar": "Rapports par type",

  rapor: "rapports",
  Belirtilmemiş: "Non spécifié",
  "Site denetimi raporu": "Rapport d'audit du site",
  "SEO denetimi": "Audit SEO",
  "Dönem karşılaştırması": "Comparaison de périodes",
  "Trafik düşüşü incelemesi": "Revue des baisses de trafic",
  "SEO raporu": "Rapport SEO",
  "Koçluk notu": "Note de coaching",
  "Proje kurulumu": "Configuration du projet",
  "Diğer türler": "Autres types",
  Tümü: "Tous",

  "Henüz rapor yok": "Aucun rapport pour l'instant",

  "Rapor komutunu kopyala": "Copier l'invite du rapport",
  "Komut kopyalandı. Ajanınıza yapıştırın":
    "Invite copiée. Collez-la dans votre agent",

  "Raporlarda ara": "Rechercher des rapports",
  "Aramanıza uyan rapor yok": "Aucun rapport ne correspond à votre recherche",

  Tür: "Type",
  Oluşturuldu: "Créé",
  Boyut: "Taille",
  İşlemler: "Actions",
  "{title} için işlemler": "Actions pour {title}",
  Sil: "Supprimer",

  "Henüz şablon yok": "Aucun modèle pour l'instant",
  "Şablon olmadan da rapor alabilirsiniz. Her seferinde aynı biçimde rapor istiyorsanız (örneğin yöneticiye aylık özet) sağ üstteki düğmeyle ilk şablonunuzu oluşturun.":
    "Vous pouvez obtenir des rapports sans modèle. Si vous souhaitez à chaque fois le même format (par exemple un récapitulatif mensuel pour votre manager), créez votre premier modèle avec le bouton en haut à droite.",
  "{count} şablon": {
    one: "{count} template",
    other: "{count} templates",
  },
  "son güncelleme": "dernière mise à jour",
  "Şablonlarda ara": "Rechercher des modèles",
  "{name} şablonunu düzenle": "Modifier le modèle {name}",
  Düzenle: "Modifier",
  "Aramanıza uyan şablon yok": "Aucun modèle ne correspond à votre recherche",
  "Başka bir sözcükle deneyin.": "Essayez un autre mot.",
  "Nasıl çalışır?": "Comment ça marche ?",
  "Ajanın yazdığı raporlar": "Rapports écrits par votre agent",
  "Claude Code ya da Codex projenizi inceler ve raporu buraya kaydeder. “Rapor komutunu kopyala” ajanınıza yapıştıracağınız komutu kopyalar.":
    "Claude Code ou Codex examine votre projet et enregistre le rapport ici. « Copier l'invite du rapport » copie l'invite que vous collez dans votre agent.",
  "Site denetimi ekranındaki “Raporu indir” hem bilgisayarınıza indirir hem burada saklar. Ajan gerekmez.":
    "« Télécharger le rapport » sur l'écran d'audit du site le télécharge sur votre ordinateur et le conserve ici. Aucun agent requis.",
  "Rapor önizlemesi: {title}": "Aperçu du rapport : {title}",
  "HTML olarak indir": "Télécharger au format HTML",
  "Tam ekrandan çık": "Quitter le plein écran",
  İndir: "Télécharger",
  "Rapor indirildi": "Rapport téléchargé",
  "Rapor indirilemedi.": "Impossible de télécharger le rapport.",
  "Rapor silindi": "Rapport supprimé",
  "Rapor silinemedi": "Impossible de supprimer le rapport",
  "“{title}” silinsin mi?": "Supprimer « {title} » ?",
  "Bu geri alınamaz.": "Cette opération est irréversible.",
  "Raporu sil": "Supprimer le rapport",

  "Sıra {band}": "Position {band}",

  "Sıraya göre hızlı filtreler": "Filtres rapides par position",
  "İlk 10": "Top 10",
  "Ortalama sırası 10 veya daha iyi olan kelimeler; yani Google'ın ilk sayfası.":
    "Mots-clés avec une position moyenne de 10 ou mieux, c'est-à-dire la première page de Google.",
  "Ortalama sırası 11 ile 20 arasında olanlar, yani ikinci sayfadakiler. Küçük bir iyileştirme ilk sayfaya taşıyabilir.":
    "Mots-clés avec une position moyenne entre 11 et 20, c'est-à-dire en deuxième page. Une légère amélioration peut les faire passer en première page.",
  "Sıra dağılımı": "Distribution des positions",

  kelime: "mots-clés",
  Bilgi: "Infos",
  Ticari: "Commercial",
  İşlem: "Transactionnel",
  Gezinme: "Navigationnel",
  "Bilgi amaçlı": "Informationnel",
  "Ticari araştırma": "Recherche commerciale",
  "İşlem odaklı": "Transactionnel",
  Yönlendirici: "Navigationnel",
  Bilinmiyor: "Inconnu",
  "Arayan kişi bilgi ya da cevap arıyor. Eğitici içerikler, rehberler ve sade açıklayıcı yazılar için uygun.":
    "L'internaute veut une information ou une réponse. Convient aux contenus pédagogiques, aux guides et aux explications simples.",
  "Arayan kişi satın almadan önce seçenekleri inceliyor. Karşılaştırma, alternatif ve ürün sayfaları bu aramaya uyar.":
    "L'internaute compare les options avant d'acheter. Les comparatifs, les pages d'alternatives et les pages produits correspondent à cette recherche.",
  "Arayan kişi bir eylemi, çoğunlukla satın almayı tamamlamaya hazır. Net teklifleri, fiyatları, denemeleri ve dönüşüm yollarını öne çıkarın.":
    "L'internaute est prêt à agir, généralement à acheter. Mettez en avant des offres claires, des prix, des essais et des parcours de conversion.",
  "Arayan kişi belirli bir siteyi, markayı ya da sayfayı arıyor. Bu aramalarda beklenen siteyle birebir eşleşen sayfa öne çıkar.":
    "L'internaute recherche un site, une marque ou une page spécifique. Dans ces recherches, la page qui correspond exactement au site attendu vient en premier.",
  "Bu kelime için arama amacı bilinmiyor; içerik kararlarınızı yalnızca bu rozete bakarak vermeyin.":
    "L'intention de recherche de ce mot-clé est inconnue ; ne fondez pas vos décisions de contenu sur ce seul badge.",
  "Arama amacı bilinmiyor": "Intention de recherche inconnue",
  "{intent} arama amacı": "Intention de recherche {intent}",
  "Etiketleri güncelle": "Mettre à jour les étiquettes",
  "Seçili {count} kelimeye etiket ekleyin ya da bunlardan etiket kaldırın.": {
    one: "Ajoutez des étiquettes au {count} mot-clé sélectionné ou retirez-en.",
    other:
      "Ajoutez des étiquettes aux {count} mots-clés sélectionnés ou retirez-en.",
  },
  "Etiket ekle": "Ajouter des étiquettes",
  "Etiket kaldır": "Retirer des étiquettes",
  "Seçimden çıkar": "Retirer de la sélection",
  "Etiket ara": "Rechercher des étiquettes",
  "Ara ya da oluştur…": "Rechercher ou créer…",
  "Oluştur {name}": "Créer {name}",
  "Henüz etiket yok. Yukarıya bir ad yazıp oluşturun.":
    "Aucune étiquette pour l'instant. Saisissez un nom ci-dessus pour en créer une.",
  "Bu aramaya uyan etiket yok.":
    "Aucune étiquette ne correspond à cette recherche.",
  "Seçili kelimelerde kaldırılacak etiket yok.":
    "Les mots-clés sélectionnés n'ont aucune étiquette à retirer.",
  Kaldırılacak: "Sera retirée",
  "Kaldırmak için tıklayın": "Cliquez pour retirer",
  "Seçili kelimelerden {count} etiket kaldırılacak.": {
    one: "{count} étiquette sera retirée des mots-clés sélectionnés.",
    other: "{count} étiquettes seront retirées des mots-clés sélectionnés.",
  },
  Uygula: "Appliquer",
  Kelime: "Mot-clé",

  Amaç: "Intention",
  Etiketler: "Étiquettes",
  Eklenme: "Ajouté",
  "Kelimeyi kopyala": "Copier le mot-clé",
  "Kelime kopyalandı": "Mot-clé copié",

  "Kelimeyi sil": "Supprimer le mot-clé",
  "Bu filtrelere uyan kelime yok": "Aucun mot-clé ne correspond à ces filtres",
  "Filtreleri gevşetin ya da temizleyin.": "Élargissez ou effacez les filtres.",
  "Henüz kayıtlı kelime yok": "Aucun mot-clé enregistré pour l'instant",
  "Arama performansı ekranında bir ya da birkaç sorguyu seçip “Kelime olarak kaydet” deyin. Kaydettikleriniz burada etiketlenir, sıralamayla birlikte listelenir ve dışa aktarılır.":
    "Sur l'écran Performances de recherche, sélectionnez une ou plusieurs requêtes et choisissez « Enregistrer comme mot-clé ». Ce que vous enregistrez reçoit ici des étiquettes, est listé avec sa position et peut être exporté.",
  "Search Console'u bağla": "Connecter la Search Console",
  "Sorgulara göz at": "Parcourir les requêtes",
  "Sonuçları filtrele": "Filtrer les résultats",
  "{count} etkin": "{count} actifs",
  "Tümünü temizle": "Tout effacer",
  İçeren: "Contient",
  "örn. denetim": "par ex. audit",
  İçermeyen: "Ne contient pas",
  "örn. iş ilanı": "par ex. offre d'emploi",
  "{term} terimini kaldır": "Supprimer le terme {term}",
  Gri: "Gris",
  Pembe: "Rose",
  Turuncu: "Orange",
  "Fıstık yeşili": "Citron vert",
  Yeşil: "Vert",
  Mavi: "Bleu",
  Mor: "Violet",
  Fuşya: "Fuchsia",
  "Yeniden adlandır": "Renommer",
  Renk: "Couleur",
  "Etiket kalıcı olarak silinir. Kelimelere dokunulmaz.":
    "L'étiquette est supprimée définitivement. Les mots-clés ne sont pas affectés.",
  "Etiketi sil": "Supprimer l'étiquette",
  "Filtreyi kaldır": "Effacer le filtre",
  Temizle: "Effacer",
  "Etiket ara…": "Rechercher des étiquettes…",
  "Aramayı temizle": "Effacer la recherche",
  "Henüz etiket yok. Kelimeleri seçip etiket ekleyin.":
    "Aucune étiquette pour l'instant. Sélectionnez des mots-clés et ajoutez des étiquettes.",
  "{count} seçili": "{count} sélectionnés",
  "{name} etiketini yönet": "Gérer l'étiquette {name}",
  "Etiket güncellendi": "Étiquette mise à jour",
  "Etiket artık yok. Liste yenilendi.":
    "L'étiquette n'existe plus. La liste a été actualisée.",
  "Etiket güncellenemedi": "Impossible de mettre à jour l'étiquette",
  "Etiket zaten silinmiş. Liste yenilendi.":
    "L'étiquette a déjà été supprimée. La liste a été actualisée.",
  "Etiket silindi": "Étiquette supprimée",
  "Etiket silinemedi": "Impossible de supprimer l'étiquette",
  "Dışa aktarılacak kelime yok": "Il n'y a aucun mot-clé à exporter",
  "CSV dışa aktarılamadı": "Impossible d'exporter au format CSV",
  "E-Tablolar'a aktarılamadı": "Impossible d'exporter vers Google Sheets",
  "{count} kelime kaldırıldı": {
    one: "{count} mot-clé supprimé",
    other: "{count} mots-clés supprimés",
  },
  "Kelimeler kaldırılamadı": "Impossible de supprimer les mots-clés",
  "{count} kelimenin etiketleri güncellendi": {
    one: "Étiquettes mises à jour pour {count} mot-clé",
    other: "Étiquettes mises à jour pour {count} mots-clés",
  },
  "Etiketler güncellenemedi": "Impossible de mettre à jour les étiquettes",
  "Kelime silinsin mi?": "Supprimer le mot-clé ?",
  "Kelimeler silinsin mi?": "Supprimer les mots-clés ?",
  "{keyword} kalıcı olarak silinir. İsterseniz Arama performansından yeniden kaydedebilirsiniz.":
    "{keyword} sera supprimé définitivement. Vous pourrez l’ajouter à nouveau depuis Performances de recherche.",
  "Kayıtlı {count} kelime kalıcı olarak silinecek. Bu geri alınamaz.": {
    one: "{count} mot-clé enregistré sera supprimé définitivement. Cette opération est irréversible.",
    other:
      "{count} mots-clés enregistrés seront supprimés définitivement. Cette opération est irréversible.",
  },
  "Kelimeler silinemedi. Tekrar deneyin.":
    "Impossible de supprimer les mots-clés. Réessayez.",
  "{count} kelimeyi sil": {
    one: "Supprimer {count} mot-clé",
    other: "Supprimer {count} mots-clés",
  },

  "E-Tablolar'a aktar": "Exporter vers Google Sheets",
  "CSV indir": "Télécharger au format CSV",
  "Tablo filtrelerini aç/kapat": "Afficher ou masquer les filtres de tableau",
  Filtreler: "Filtres",
  Etiketle: "Étiqueter",
  "Kelimeleri kopyala": "Copier les mots-clés",
  "Nerede durduğunuzu anlatır ve sıradaki adımı seçer.":
    "Explique où vous en êtes et choisit l'étape suivante.",
  "Hedeflerinizi, rakiplerinizi ve önemli sayfalarınızı bir kez kaydeder; diğer beceriler bunu hep bilir.":
    "Enregistre une fois vos objectifs, vos concurrents et vos pages clés ; les autres compétences les connaissent toujours.",
  "Sitenizi denetler ve bu hafta yapılacak tek bir işi öne çıkarır.":
    "Audite votre site et propose la seule chose à faire cette semaine.",
  "Bu dönemi öncekiyle karşılaştırır. Ne değişti, ne zaman değişti, önemli mi, söyler.":
    "Compare cette période avec la dernière. Indique ce qui a changé, quand cela a changé et si cela est important.",
  "Trafik düştüyse önce şuna bakar. Düşüş gerçek mi, nerede ve ne zaman oldu?":
    "Si le trafic a baissé, elle vérifie d'abord ceci : la baisse est-elle réelle, où et quand s'est-elle produite ?",
  "Yukarıdakilerden birinin sonucunu Raporlar sayfasına kaydeder.":
    "Enregistre le résultat de chacune des compétences ci-dessus dans la page Rapports.",
  "Ajanınızı kurun": "Configurez votre agent",
  Beceriler: "Compétences",
  "seowatcher'ı yapay zeka ajanınızla kullanabilirsiniz. Bir kez bağlayın, sonra ne istiyorsanız ona sorun.":
    "Vous pouvez utiliser seowatcher avec votre agent IA. Connectez-le une fois, puis demandez-lui ce dont vous avez besoin.",
  "Durum okunamadı": "Impossible de lire l'état",
  Bağlandı: "Connecté",
  "{client} · son çağrı {time}": "{client} · dernier appel {time}",
  "Bir ajan": "Un agent",
  "Henüz bağlanmadı": "Pas encore connecté",
  "Kurulum adımları yükleniyor": "Chargement des étapes de configuration",
  "Becerileri güncelleyin": "Mettre à jour les compétences",
  "Ajanınızı daha önce kurduysanız güncelleme komutunu yapıştırın. Beceriler yenilenir, bağlantı ayarlarınız ve kendi düzenlemeleriniz olduğu gibi kalır.":
    "Si vous avez déjà configuré votre agent, collez l'invite de mise à jour. Les compétences sont rafraîchies ; vos paramètres de connexion et vos propres modifications restent tels qu'ils sont.",
  "Güncelleme komutunu kopyala": "Copier la commande de mise à jour",
  "Güncelleme komutu kopyalandı": "Commande de mise à jour copiée",
  "Bu kurulum Cloudflare Access arkasında. Ajanın bağlanabilmesi için Access uygulamanızda Managed OAuth'u açın.":
    "Cette installation est derrière Cloudflare Access. Activez Managed OAuth dans votre application Access pour que l'agent puisse se connecter.",
  "Elle bağlamak istiyorsanız": "Si vous souhaitez vous connecter manuellement",
  "Bu kurulumun MCP adresi:": "Adresse MCP de cette installation :",
  "MCP adresi kopyalandı": "Adresse MCP copiée",
  "Bu adres {token} ile, yani bir parola (token) ile korunuyor. Aracınıza şu başlığı ekletin:":
    "Cette adresse est protégée par {token}, un mot de passe (jeton). Demandez à votre outil d'envoyer cet en-tête :",
  "Windows paketinde parola bir dosyadır (görev çubuğu menüsünde {menu}):":
    "Dans le package Windows, le mot de passe est un fichier ({menu} dans le menu de la zone de notification) :",
  "Veri klasörünü aç": "Ouvrir le dossier de données",
  "Panoya kopyalamak için PowerShell (değer ekrana yazılmaz):":
    "Pour le copier dans le presse-papiers avec PowerShell (la valeur n'est pas affichée) :",
  "Değeri sohbete ya da ekrana yazmayın. Yapıştırdıktan sonra panoyu temizleyin (Win+V, Tümünü temizle).":
    "Ne saisissez pas la valeur dans une discussion et ne l'affichez pas à l'écran. Effacez le presse-papiers après l'avoir collée (Win+V, Tout effacer).",

  "Windows'ta Git Bash için komutun başına {prefix} ekleyin, yoksa parola boş çıkar (PowerShell'de bu önek hata verir).":
    "Dans Git Bash sous Windows, mettez {prefix} devant la commande, sinon le mot de passe apparaît vide (en PowerShell, ce préfixe provoque une erreur).",
  "Bu adres parola istemez. Bilgisayarınızdaki başka bir programın araçları çalıştırmasını önlemek için {token} adıyla bir parola ayarlayın ve aracınıza şu başlığı ekletin:":
    "Cette adresse ne demande aucun mot de passe. Pour empêcher d'autres programmes sur votre ordinateur d'exécuter les outils, définissez un mot de passe nommé {token} et demandez à votre outil d'envoyer cet en-tête :",
  "Kurulum komutu bunları kurar. Kısa cevap yerine tam bir çıktı istiyorsanız beceriyi adıyla çağırın.":
    "L'invite de configuration les installe. Si vous voulez un résultat complet plutôt qu'une réponse courte, appelez la compétence par son nom.",
  "{name} adını kopyala": "Copier le nom {name}",
  "Beceri adı kopyalandı": "Nom de la compétence copié",
  "Bir şey ters giderse önce aşağıdaki duruma bakın. Çözüm çoğu zaman satırın yanındaki düğmededir.":
    "En cas de problème, vérifiez d'abord l'état ci-dessous. La solution est généralement le bouton à côté de la ligne.",
  Günlükler: "Journaux",
  "Konteyner günlüğü": "Journal du conteneur",
  "Kurulum türü anlaşılıyor. Günlüklerin yeri birazdan burada görünür.":
    "Détection du type d'installation. L'emplacement des journaux apparaîtra ici sous peu.",
  "Görev çubuğundaki seowatcher simgesine sağ tıklayıp {menu} deyin. Açılış kontrolleri {launcherLog}, sunucu satırları {serverLog} dosyasındadır.":
    "Cliquez avec le bouton droit sur l'icône seowatcher dans la zone de notification et choisissez {menu}. Les contrôles de démarrage se trouvent dans {launcherLog}, les lignes du serveur dans {serverLog}.",
  "Günlükleri aç": "Ouvrir les journaux",
  "Açılış kontrolleri uygulama başlamadan önce yazılır. Komut:":
    "Les contrôles de démarrage sont écrits avant le démarrage de l'application. Commande :",
  "Komutu kopyala": "Copier la commande",
  "Komut kopyalandı": "Commande copiée",
  "Sağlık adresi:": "Point de terminaison de santé :",
  "{link} hangi bağlantıların ayarlı olduğunu ve veritabanının yanıt verip vermediğini gösterir.":
    "{link} indique quelles connexions sont configurées et si la base de données répond.",
  "Kurulum belgeleri": "Documentation de configuration",
  "Windows paketi, Docker, Search Console, Analytics ve PageSpeed kurulumu kılavuzda anlatılıyor. Üstteki “{button}” düğmesi sizi oraya götürür.":
    "Le guide couvre la configuration du package Windows, de Docker, de Search Console, d'Analytics et de PageSpeed. Le bouton « {button} » en haut vous y mène.",
  "Kılavuzu aç": "Ouvrir le guide",
  "Sorun bildirmek için": "Signaler un problème",
  "Üstteki “{download}” düğmesi tek bir arşiv indirir. İçinde sürüm, kurulum kontrolleri, tablo büyüklükleri, bağlı Google mülkleri, son denetimlerin durumu ve bu sekmede yakalanan tarayıcı hataları var. Gizli değer yok. Parolalar ve anahtarlar toplanmaz, yalnızca ayarlı olup olmadıkları yazılır. Kısa bir not yeterliyse durum panelindeki “{summary}” düğmesi aynı özeti metin olarak verir. Arşivdeki {readme} içindekileri ve sizi tanımlayan şeyleri satır satır anlatır.":
    "Le bouton « {download} » en haut télécharge une archive unique. Elle contient la version, les vérifications de configuration, la taille des tables, les propriétés Google connectées, l'état des audits récents et les erreurs du navigateur détectées dans cet onglet. Aucune valeur secrète : les mots de passe et les clés ne sont pas collectés, seule leur présence est indiquée. Si un bref résumé suffit, le bouton « {summary} » du panneau d'état fournit le même contenu en texte. Le fichier {readme} de l'archive détaille, ligne par ligne, son contenu et les éléments susceptibles de vous identifier.",
  "Tanılama paketi indir": "Télécharger le paquet de diagnostic",
  "Özeti kopyala": "Copier le résumé",
  "Proje GitHub'da": "Projet sur GitHub",

  "Henüz proje yok": "Aucun projet pour l'instant",
  "Bir proje oluşturun, sonra sitesini ekleyin.":
    "Créez un projet, puis ajoutez son site.",

  "Site eklenmedi": "Aucun site ajouté",
  "Site ekle": "Ajouter un site",
  "Proje geri alındı": "Projet restauré",
  "Proje geri alınamadı": "Impossible de restaurer le projet",
  Arşivlendi: "Archivé",
  "Arşivlenen projeler yüklenemedi":
    "Impossible de charger les projets archivés",
  "Bu çalışma alanına girişiniz doğrulanamadı.":
    "Votre accès à cet espace de travail n'a pas pu être vérifié.",
  "Bir şeyler ters gitti. Yardım ekranındaki günlüklere bakın.":
    "Une erreur s'est produite. Consultez les journaux sur l'écran Aide.",
  "Bu denetim bulunamadı. Silinmiş olabilir.":
    "Cet audit est introuvable. Il a peut-être été supprimé.",
  "Denetime bağlanılamadı": "Impossible de charger l'audit",
  "Tüm denetimler": "Tous les audits",
  "Site denetimi · {time}": "Audit du site · {time}",
  "Denetim bu siteyi tamamen tarayamadı.":
    "L'audit n'a pas pu explorer complètement ce site.",
  "Sitenin bot koruması tarayıcımızı engelledi ve şu an aşmanın bir yolu yok. Bilgisayarınızda çalışan masaüstü tarayıcılar genelde geçer. Şunları deneyin: {libreCrawl} (ücretsiz, açık kaynak) ya da {screamingFrog} (500 adrese kadar ücretsiz).":
    "La protection anti-robots du site a bloqué notre robot d'exploration, et il n'existe aucun moyen de la contourner pour le moment. Les robots d'exploration de bureau, qui tournent sur votre ordinateur, passent généralement. Essayez {libreCrawl} (gratuit, open source) ou {screamingFrog} (gratuit jusqu'à 500 URL).",
  "Denetim {count} sayfadan sonra erken durdu.": {
    one: "L'audit s'est arrêté prématurément après {count} page.",
    other: "L'audit s'est arrêté prématurément après {count} pages.",
  },
  "Aşağıdaki sonuçlar, tarama durmadan önce bakılan her şeyi içerir. Yeniden denemek için yeni bir denetim başlatın. Yine olursa Yardım'dan tanılama paketini indirip sorunu bildirin.":
    "Les résultats ci-dessous incluent tout ce qui a été vérifié avant l'arrêt de l'exploration. Lancez un nouvel audit pour réessayer. Si cela se reproduit, téléchargez le paquet de diagnostic depuis l'Aide et signalez le problème.",
  "Denetim sonuçları yüklenemedi":
    "Impossible de charger les résultats de l'audit",
  "Bu rapor bulunamadı. Silinmiş olabilir ya da başka bir projeye ait olabilir.":
    "Ce rapport est introuvable. Il a peut-être été supprimé ou appartient à un autre projet.",
  "Rapor yüklenemedi": "Impossible de charger le rapport",
  Oluşturan: "Créé par",
  "PDF olarak kaydet (yazdır)": "Enregistrer au format PDF (imprimer)",
  "Yeni sekmede aç": "Ouvrir dans un nouvel onglet",
  "Diğer işlemler": "Plus d'actions",
  "Tam ekran": "Plein écran",
  "Bağlantı kopyalanamadı": "Impossible de copier le lien",
  "Bağlantı kopyalandı": "Lien copié",
  "Bağlantıyı kopyala": "Copier le lien",
  "Hazırlanan raporlar. Her raporu açabilir, indirebilir ya da silebilirsiniz.":
    "Rapports préparés. Vous pouvez ouvrir, télécharger ou supprimer chacun d'entre eux.",
  Şablonlar: "Modèles",
  "Raporlar yüklenemedi": "Impossible de charger les rapports",
  "Şablon silindi": "Modèle supprimé",
  "Şablon silinemedi": "Impossible de supprimer le modèle",
  "Rapor şablonları": "Modèles de rapport",
  "Şablon, ajanınıza raporu nasıl yazacağını söyler. Kim okuyacak, hangi bölümler olacak, hangi dilde yazılacak, hepsi burada durur. Ajan rapor yazarken uygun olanı seçer.":
    "Un modèle indique à votre agent comment rédiger un rapport : qui le lira, quelles sections il contient, dans quelle langue il est rédigé. Lorsqu'il rédige un rapport, l'agent choisit le modèle qui convient.",
  "Şablonlar yüklenemedi": "Impossible de charger les modèles",
  "Bu şablondan üretilmiş raporlar etkilenmez.":
    "Les rapports créés à partir de ce modèle ne sont pas affectés.",
  "Şablonu sil": "Supprimer le modèle",
  "Bu rapor yok ya da erişiminiz bulunmuyor.":
    "Ce rapport n'existe pas ou vous n'y avez pas accès.",
  "Bu raporu okumak için oturum açın.": "Connectez-vous pour lire ce rapport.",
  "Bu proje arşivde, bu yüzden raporları gizli. Okumak için {name} projesini geri alın.":
    "Ce projet est archivé, ses rapports sont donc masqués. Restaurez {name} pour les lire.",
  "Kayıtlı kelimeler yüklenemedi":
    "Impossible de charger les mots-clés enregistrés",
  "{count} kelime kopyalandı": {
    one: "{count} mot-clé copié",
    other: "{count} mots-clés copiés",
  },

  Genel: "Général",
  "Ayar bölümleri": "Sections des paramètres",
  "Projeler yüklenemedi": "Impossible de charger les projets",
  Bitti: "Terminé",
  Başarısız: "Échec",
  "Sitenizde düzeltmeniz gereken her şey, önem sırasına göre. Bir satıra tıklayın. Neden önemli olduğunu, nasıl düzelteceğinizi ve hangi sayfaların etkilendiğini adresleriyle görürsünüz.":
    "Tout ce qui doit être corrigé sur votre site, le plus important en premier. Cliquez sur une ligne pour voir pourquoi c'est important, comment le corriger et quelles pages sont concernées, avec leurs adresses.",
  "Taranan her sayfa ve sunucunun ona verdiği yanıt. Hatalı, yavaş ya da derinde kalmış sayfaları buradan bulun.":
    "Chaque page explorée et la réponse du serveur. Repérez ici les pages cassées, lentes ou profondément enfouies.",
  "Google bu sayfaları gerçekten dizinine almış mı? Almadıysa nedenini burada görürsünüz.":
    "Google a-t-il réellement indexé ces pages ? Si ce n'est pas le cas, vous pouvez voir pourquoi ici.",
  "Sayfalarınız telefonda ve bilgisayarda ne kadar hızlı açılıyor? Ölçüm, Google'ın kullandığı Lighthouse ile yapılır.":
    "À quelle vitesse vos pages se chargent-elles sur les téléphones et les ordinateurs ? Mesuré avec Lighthouse, l'outil utilisé par Google.",
  "Rapor oluşturulamadı": "Impossible de créer le rapport",
  "Raporu indir": "Télécharger le rapport",
  "{count} {band}": "{count} {band}",
  "Mobilde ölçülen {measured} sayfadan {parts}.":
    "Sur {measured} pages mesurées sur mobile : {parts}.",
  Kritik: "Critique",
  "Sitenizi tarar, bulduğu sorunları önem sırasına göre sıralar.":
    "Explore votre site et classe les problèmes détectés par importance.",
  Kotalar: "Quotas",
  "Güncel durum": "État actuel",
  '"{url}" denetimi silinsin mi?': "Supprimer l'audit de « {url} » ?",
  "{date} · {count} sayfa. Denetimin sayfaları, sorunları ve hız ölçümleri de silinir. Bu geri alınamaz.":
    {
      one: "{date} · {count} page. Les pages de l'audit, les problèmes et les mesures de vitesse sont également supprimés. Cette opération est irréversible.",
      other:
        "{date} · {count} pages. Les pages de l'audit, les problèmes et les mesures de vitesse sont également supprimés. Cette opération est irréversible.",
    },
  "Denetimi sil": "Supprimer l'audit",
  Hızlı: "Rapide",
  Orta: "Moyenne",
  Yavaş: "Lent",
  "{score} ve üzeri": "{score} et plus",
  "Kota doldu": "Quota épuisé",
  "{marker}; {measured} sayfa ölçüldü, {left} sayfa ölçülemedi. Google'ın ücretsiz günlük ölçüm sınırı bitti, sayfalarınızda bir sorun yok. Ayarlar'dan bir PageSpeed anahtarı ekleyin ya da kota yenilenince denetimi yeniden başlatın.":
    "{marker} : {measured} pages mesurées, {left} non mesurées. La limite quotidienne gratuite de Google est atteinte ; vos pages n'ont aucun problème. Ajoutez une clé PageSpeed dans les Paramètres ou relancez l'audit lorsque le quota sera réinitialisé.",
  "PageSpeed anahtarı girilmediği için {count} ölçüm yapılamadı: Google'ın ortak ücretsiz kotası doldu, sayfalarınızda bir sorun yok. Ayarlar'dan ücretsiz bir anahtar ekleyip denetimi yeniden başlatın.":
    {
      one: "{count} mesure n'a pas pu être exécutée, car aucune clé PageSpeed n'est définie : le quota gratuit partagé de Google est épuisé ; vos pages n'ont aucun problème. Ajoutez une clé gratuite dans les Paramètres et relancez l'audit.",
      other:
        "{count} mesures n'ont pas pu être exécutées, car aucune clé PageSpeed n'est définie : le quota gratuit partagé de Google est épuisé ; vos pages n'ont aucun problème. Ajoutez une clé gratuite dans les Paramètres et relancez l'audit.",
    },
  "Google'ın dakikalık sınırı yüzünden {count} ölçüm yapılamadı; denetimi daha sonra yeniden başlatın veya Ayarlar'dan anahtarınızın kotasını kontrol edin.":
    {
      one: "{count} mesure n'a pas pu être exécutée en raison de la limite par minute de Google. Relancez l'audit plus tard ou vérifiez le quota de votre clé dans les Paramètres.",
      other:
        "{count} mesures n'ont pas pu être exécutées en raison de la limite par minute de Google. Relancez l'audit plus tard ou vérifiez le quota de votre clé dans les Paramètres.",
    },
  "Taranacak site adresini girin.": "Saisissez l'adresse du site à explorer.",
  "{pages} sayfa taranacak. Biraz zaman alabilir. Devam edelim mi?":
    "{pages} pages seront explorées. Cela peut prendre un certain temps. Continuer ?",
  "Denetim başlatıldı": "Audit démarré",
  "Denetim başlatılamadı": "Impossible de démarrer l'audit",
  "Denetim silindi": "Audit supprimé",
  "Denetim silinemedi": "Impossible de supprimer l'audit",
  "Yeni denetim başlat": "Démarrer un nouvel audit",
  "Taranacak site adresi": "Adresse du site à explorer",
  "Başlatılıyor…": "Démarrage…",
  "En fazla {input} sayfa tara": "Explorer jusqu'à {input} pages",
  "En çok taranacak sayfa sayısı": "Nombre maximum de pages à explorer",
  "{min} ile {max} arasında bir sayı girin.":
    "Saisissez un nombre compris entre {min} et {max}.",
  "Taranan her sayfanın hızı telefonda ve bilgisayarda ölçülür. En çok {pages} sayfa, yani {checks} ölçüm. Hız aşaması en az yaklaşık {minutes} dakika sürer, Google sınırına takılırsa daha uzun.":
    "La vitesse de chaque page explorée est mesurée sur mobile et ordinateur. Jusqu’à {pages} pages, soit {checks} mesures. Cette étape dure au moins {minutes} minutes et davantage si la limite de Google est atteinte.",
  "PageSpeed anahtarınız yok. Google'ın ücretsiz kotası küçük olduğu için en çok {pages} sayfa ({checks} ölçüm) ölçülür. Hız aşaması en az yaklaşık {minutes} dakika sürer, Google sınırına takılırsa daha uzun sürer.":
    "Vous n'avez pas de clé PageSpeed. Le quota gratuit de Google est faible, donc au maximum {pages} pages ({checks} mesures) sont mesurées. La mesure de vitesse prend au moins environ {minutes} minutes, davantage si la limite de Google est atteinte.",
  "Tüm sayfaları ölçmek için {settings}'dan ücretsiz bir PageSpeed anahtarı ekleyin.":
    "Pour mesurer toutes les pages, ajoutez une clé PageSpeed gratuite dans {settings}.",
  "Sayfa hızını da ölç": "Mesurer aussi la vitesse des pages",
  "Hız ölçümü": "Tests de vitesse",
  "Google Lighthouse ile taranan her sayfanın telefonda ve bilgisayarda ne kadar hızlı açıldığını ölçer, yavaşlatan sorunları listeler.":
    "Utilise Google Lighthouse pour mesurer la vitesse de chargement de chaque page explorée sur mobile et sur ordinateur, et liste ce qui la ralentit.",
  "Daha uzun sürer.": "Prend plus de temps.",
  "Sayfa bulma": "Recherche des pages",
  Taranıyor: "Exploration",
  Tarama: "Exploration",
  Tamamlanıyor: "Finalisation",
  Çalışıyor: "En cours",
  "Lighthouse kontrolleri çalışıyor": "Vérifications Lighthouse en cours",
  "Sayfalar taranıyor": "Exploration des pages",
  "{count} ölçüm başarısız oldu; kalanlar sürüyor.": {
    one: "{count} mesure a échoué ; les autres sont toujours en cours.",
    other: "{count} mesures ont échoué ; les autres sont toujours en cours.",
  },
  "Adresler bulunuyor…": "Recherche d'adresses…",
  "{done} / {total} kontrol ({failed} başarısız)":
    "{done} / {total} vérifications ({failed} en échec)",
  "{done} / {total} kontrol": "{done} / {total} vérifications",
  "{done} / {total} sayfa": "{done} / {total} pages",
  "Taranan sayfalar ({count})": "Pages explorées ({count})",
  "Güncellendi {date}": "Mis à jour le {date}",
  "Denetimler arası değişim": "Évolution entre les audits",
  "Yüz sayfa başına sorun sayısı. Farklı büyüklükteki taramalar bu ölçüyle karşılaştırılabilir.":
    "Problèmes pour cent pages, afin de comparer des explorations de tailles différentes.",
  "Bu {count} denetimin hiçbirinde kritik sorun ya da uyarı çıkmadı, grafik boş. Bilgi düzeyindeki bulgular denetimlerin kendi sayfalarında.":
    "Aucun de ces {count} audits n'a détecté de problème critique ni d'avertissement ; le graphique est donc vide. Les constats de niveau Infos figurent sur la page de chaque audit.",
  "Denetim başına sayfa yoğunluğu: yüz sayfa başına sorun":
    "Densité par audit : problèmes pour cent pages",
  Tarih: "Date",
  Sayfa: "Page",
  "{total} toplam": "{total} au total",
  "{date} · {count} sayfa": {
    one: "{date} · {count} page",
    other: "{date} · {count} pages",
  },
  "{density} / 100 sayfa ({total} toplam)":
    "{density} / 100 pages ({total} au total)",
  "kritik sorun": "problèmes critiques",
  uyarı: "avertissements",
  değişmedi: "inchangé",
  "{count} denetim. Yüz sayfa başına {series}, {fromDate} tarihinde {from} idi, {toDate} tarihinde {to} oldu ({direction}).":
    {
      one: "{count} audit. Pour cent pages, {series} est passé de {from} le {fromDate} à {to} le {toDate} ({direction}).",
      other:
        "{count} audits. Pour cent pages, {series} est passé de {from} le {fromDate} à {to} le {toDate} ({direction}).",
    },
  "Denetim geçmişi yüklenemedi": "Impossible de charger l'historique d'audit",
  "Henüz denetim yok": "Aucun audit pour l'instant",
  "Henüz denetim yapılmadı. Yukarıya site adresinizi yazıp başlatın; geçmiş burada listelenir.":
    "Vous n'avez pas encore lancé d'audit. Saisissez l'adresse de votre site ci-dessus et lancez-en un ; les audits passés sont listés ici.",
  "Önceki denetimler": "Audits précédents",
  Durum: "État",
  "Yüz sayfa başına (toplam ayrıca parantezde)":
    "Par cent pages (total entre parenthèses)",
  Evet: "Oui",
  "{date} denetimini görüntüle": "Afficher l'audit du {date}",
  Görüntüle: "Afficher",
  "Aynı siteye ait bir önceki denetime göre":
    "Par rapport à l'audit précédent du même site",
  "{url} denetimi için işlemler": "Actions pour l'audit de {url}",
  "Aynı ayarlarla yeniden başlat": "Relancer avec les mêmes paramètres",
  "Bir denetim zaten başlatılıyor": "Un audit est déjà en cours de démarrage",
  "Google'da": "Sur Google",
  "Aramada çıkabilir": "Peut apparaître dans la recherche",
  "Dizinde değil": "Non indexé",
  "Google baktı ama almadı": "Google l'a vue mais ne l'a pas indexée",
  "Yanıt bekleyen": "En attente d'une réponse",
  "Google'a sorduk ama yanıt gelmedi ya da hiç sorulmadı":
    "Demandé à Google sans réponse, ou jamais demandé",
  "Google bu sayfalarla ne yapmış?": "Qu'a fait Google avec ces pages ?",
  "Bir gruba tıklayın, aşağıdaki liste yalnızca o sayfaları göstersin.":
    "Cliquez sur un groupe pour afficher uniquement ces pages dans la liste ci-dessous.",
  sayfa: "pages",
  "Google siteyi anlayamıyor": "Google ne parvient pas à comprendre le site",
  "Sıralamayı ve tıklamayı düşürür": "Coûte des classements et des clics",
  "Küçük iyileştirme fırsatları": "Petites chances d'amélioration",
  "Sorunlar ne kadar ciddi?": "Quelle est la gravité des problèmes ?",
  bulgu: "constats",
  "Bu sorun için kayıtlı adres yok.":
    "Aucune adresse enregistrée pour ce problème.",
  "{title}: etkilenen adresler": "{title} : adresses concernées",
  "Adres ara": "Rechercher des adresses",
  "{title}: adreslerde ara": "{title} : rechercher des adresses",
  "Aramayla eşleşen adres yok.":
    "Aucune adresse ne correspond à votre recherche.",
  "{total} adres içinden {shown} tanesi gösteriliyor.":
    "{shown} adresses affichées sur {total}.",
  "{total} sayfa içinden {shown} tanesi gösteriliyor.":
    "{shown} pages affichées sur {total}.",
  "Daha fazla göster ({left} kaldı)": "Afficher plus ({left} restantes)",
  "Bu sayfada {count} kayıt var": {
    one: "{count} enregistrement sur cette page",
    other: "{count} enregistrements sur cette page",
  },
  "{title}, {count}": "{title}, {count}",
  "Nasıl düzeltilir?": "Comment le corriger",
  "Bu sorun tek bir sayfayla değil, sitenin tamamıyla ilgili.":
    "Ce problème concerne l'ensemble du site, pas une seule page.",
  "URL'leri kopyala ({count})": "Copier les URL ({count})",
  "Sayfalar sekmesinde göster": "Afficher dans l'onglet Pages",
  "{count} adres kopyalandı": {
    one: "{count} adresse copiée",
    other: "{count} adresses copiées",
  },
  "Bu denetimde kayıtlı sorun yok.": "Cet audit n'a enregistré aucun problème.",
  "Site gerçekten iyi durumda olabilir ya da bu denetim, sorun kontrolleri eklenmeden önce çalıştırılmış olabilir. Tam raporu görmek için yeni bir denetim başlatın.":
    "Le site est peut-être vraiment en bon état, ou cet audit a peut-être été exécuté avant l'ajout des vérifications des problèmes. Démarrez un nouvel audit pour obtenir le rapport complet.",
  "Yalnızca {url}": "Seulement {url}",
  "Tüm sayfaları göster": "Afficher toutes les pages",
  "Gösterilen:": "Affichage :",
  "Seçtiğiniz kombinasyonda sorun yok.":
    "Aucun problème ne correspond à la combinaison que vous avez choisie.",
  "Bu sayfada kayıtlı sorun yok.": "Aucun problème enregistré pour cette page.",
  "{label} seçimini kaldır": "Supprimer le filtre {label}",
  "Durum kodu": "Code d'état",
  "Uzunluk (karakter)": "Longueur (caractères)",
  "Kelime sayısı": "Nombre de mots",
  "H1 sayısı": "Nombre de H1",
  "Ana sayfadan uzaklık (tık)": "Clics depuis la page d'accueil",
  "Yanıt süresi": "Temps de réponse",
  "Asıl adres": "URL canonique",
  "Sayfadaki asıl adres": "URL canonique dans la page",
  "Başlıktaki asıl adres": "URL canonique dans l'en-tête HTTP",
  "Yönlendirdiği adres": "Redirige vers",
  "Son adres": "URL finale",
  "Aynı içerikteki sayfa sayısı": "Pages avec le même contenu",
  "Aynı içerikteki diğer sayfalar": "Autres pages avec le même contenu",
  "Karşılıklı bağlanmayan alternatif":
    "Version alternative sans lien de retour",
  "Dil kodu": "Code de langue",
  "Dil kodları": "Codes de langue",
  Neden: "Raison",
  "Erişim sonucu": "Résultat de la récupération",
  "Robots meta etiketi": "Balise meta robots",
  "Googlebot meta etiketi": "Balise meta Googlebot",
  "X-Robots-Tag başlığı": "En-tête X-Robots-Tag",
  Adet: "Nombre",
  Örnek: "Exemple",
  Sınır: "Limite",
  "Alt metni eksik görsel": "Images sans texte alternatif",
  "Toplam görsel": "Nombre total d'images",
  "Engellenen kaynaklar": "Ressources bloquées",
  "Engellenen kaynak sayısı": "Nombre de ressources bloquées",
  Örnekler: "Exemples",
  "Sizin belirttiğiniz adres": "URL canonique déclarée par l'utilisateur",
  "Google'ın seçtiği adres": "URL canonique sélectionnée par Google",
  "Google'ın kararı": "Verdict de Google",
  "Google'ın son tarama tarihi": "Dernière exploration par Google",
  "Kontrol tarihi": "Vérifié le",
  "Eşik (gün)": "Seuil (jours)",
  "Kontrol edilen sayfa": "Pages vérifiées",
  "Adres sayısı": "Nombre d'URL",
  Hayır: "Non",
  "{shown} ve {rest} tane daha": "{shown} et {rest} autres",
  "Tüm site": "Tout le site",
  "{count} sayfa · {findings} bulgu": {
    one: "{count} page · {findings} constats",
    other: "{count} pages · {findings} constats",
  },
  Önem: "Gravité",
  Sorun: "Problème",
  Adres: "URL",
  Ayrıntı: "Détails",
  "Nasıl düzeltilir": "Correction",
  "En çok sayfayı hangi sorun etkiliyor?":
    "Quel problème touche le plus de pages ?",
  "Bir çubuğa tıklayıp listeyi daraltın.":
    "Cliquez sur une barre pour affiner la liste.",
  "En çok sayfayı etkileyen sorun: {title}, {pages} sayfa. Grafikte {count} tür var.":
    {
      one: "Problème touchant le plus de pages : {title}, {pages} pages. Le graphique affiche {count} type.",
      other:
        "Problème touchant le plus de pages : {title}, {pages} pages. Le graphique affiche {count} types.",
    },
  "Sorun türüne göre etkilenen sayfa sayısı":
    "Pages affectées par type de problème",
  "Etkilenen sayfa": "Pages concernées",
  "Sorun türüne göre filtre": "Filtrer par type de problème",
  Başlık: "Titre",
  Görsel: "Image",
  "Alt metni eksik": "Texte alternatif manquant",
  "Yanıt süresi (ms)": "Temps de réponse (ms)",
  Cihaz: "Appareil",
  Performans: "Performances",
  Erişilebilirlik: "Accessibilité",
  Karar: "Verdict",
  "Kapsam durumu": "État de couverture",
  "Google'ın seçtiği asıl adres": "URL canonique sélectionnée par Google",
  "Sizin belirttiğiniz asıl adres": "URL canonique déclarée par l'utilisateur",
  "Asıl adres uyuşmazlığı": "URL canoniques différentes",
  "Son tarama": "Dernière exploration",
  Sorgulandı: "Vérifié",
  evet: "oui",
  hayır: "non",
  "Dizine kapalı": "Indexation bloquée",
  "Google'ın dizine almasına izin verilmeyen sayfalar":
    "Pages que Google n'est pas autorisé à indexer",
  "Sunucu yanıtı 1 saniyeden uzun süren sayfalar":
    "Pages dont la réponse du serveur prend plus d'une seconde",
  "En az bir görselinde alt metni olmayan sayfalar":
    "Pages avec au moins une image sans texte alternatif",
  "Site haritasında yok": "Absente du sitemap",
  "Taranan ama site haritasına girmemiş sayfalar":
    "Pages explorées absentes du sitemap",
  '"Site haritasında yok" kullanılamıyor: bu denetimde site haritası bulunamadı.':
    "« Absente du sitemap » n'est pas disponible : cet audit n'a trouvé aucun sitemap.",
  "Eksiksiz. Düzeltilecek bir şey kalmadı.":
    "Impeccable. Plus rien à corriger.",
  "Çok iyi. Birkaç küçük iş kaldı.":
    "Très bien. Il reste quelques petites tâches.",
  "İyi. Birkaç düzeltme puanı yükseltir.":
    "Bien. Quelques corrections feront monter le score.",
  "Orta. Önce kritik sorunlara bakın.":
    "Passable. Commencez par les problèmes critiques.",
  "Zayıf. Google'ın sitenizi anlamasını engelleyen sorunlar var.":
    "Faible. Certains problèmes empêchent Google de comprendre votre site.",
  "Site puanı": "Score du site",
  "Google'ın ücretsiz ölçüm kotası dolmuş; sayfalarınızda bir sorun yok. Ayarlar'dan PageSpeed anahtarı ekleyin ya da kota yenilenince denetimi yeniden başlatın.":
    "Le quota de mesures gratuites de Google est épuisé ; vos pages n'ont aucun problème. Ajoutez une clé PageSpeed dans les Paramètres ou relancez l'audit une fois le quota réinitialisé.",
  Hız: "Vitesse",
  "Ortalama puanlar": "Scores moyens",
  "Mobilde hız dağılımı": "Répartition de la vitesse sur mobile",
  "Ortalama tek başına yanıltır. Bir gruba tıklayıp o sayfaları listeleyin.":
    "Une moyenne seule est trompeuse. Cliquez sur un groupe pour lister ces pages.",
  "Sayfalar nasıl yanıt verdi?": "Comment les pages ont-elles répondu ?",
  "Bir çubuğa tıklayarak tabloyu daraltın.":
    "Cliquez sur une barre pour filtrer le tableau.",
  "Ortalama yanıt süresi {duration}. Bir çubuğa tıklayarak tabloyu daraltın.":
    "Temps de réponse moyen : {duration}. Cliquez sur une barre pour filtrer le tableau.",
  "{count} sayfanın yanıt durumuna göre dağılımı.": {
    one: "{count} page par état de réponse.",
    other: "{count} pages par état de réponse.",
  },
  "Ana sayfadan kaç tık uzakta?": "Combien de clics depuis la page d'accueil ?",
  "{count} sayfaya hiçbir bağlantı verilmemiş, bu yüzden çubuklarda yok.": {
    one: "{count} page ne reçoit aucun lien, elle ne figure donc pas dans les barres.",
    other:
      "{count} pages ne reçoivent aucun lien, elles ne figurent donc pas dans les barres.",
  },
  "Derindeki sayfaları Google geç bulur ve daha az değer verir.":
    "Google trouve les pages profondes plus tard et les valorise moins.",
  "En derin sayfalar {depth} uzaklığında.":
    "Les pages les plus profondes sont à {depth}.",
  "Derinlik bilgisi yok.": "Aucune donnée de profondeur.",
  Sorunsuz: "OK",
  "2xx: sayfa açıldı": "2xx : page chargée",
  Yönlendirme: "Redirection",
  "3xx: başka adrese gidiyor": "3xx : va vers une autre URL",
  "4xx / 5xx: sayfa açılmadı": "4xx / 5xx : la page ne s'est pas chargée",
  Ulaşılamadı: "Inaccessible",
  "Sunucudan yanıt gelmedi": "Aucune réponse du serveur",
  "1 tık": "1 clic",
  "2 tık": "2 clics",
  "3 tık": "3 clics",
  "4+ tık": "4+ clics",
  "robots.txt izin veriyor": "Autorisé par robots.txt",
  "robots.txt engelliyor": "Bloquée par robots.txt",
  "Google henüz bakmadı": "Google n'a pas encore vérifié",
  "Dizine almaya izin var": "Indexation autorisée",
  "Gizleme etiketi (noindex) engelliyor": "Bloqué par la balise meta noindex",
  "Sunucu başlığı (X-Robots-Tag) engelliyor":
    "Bloqué par l'en-tête HTTP X-Robots-Tag",
  "Sayfa alındı": "Page récupérée",
  "Boş sayfa, hata vermeden açılıyor (soft 404)":
    "Page vide qui se charge sans erreur (soft 404)",
  "robots.txt engelledi": "Bloqué par robots.txt",
  "404, sayfa yok": "404, page introuvable",
  "401 yetkisiz": "401 non autorisé",
  "403 yasak": "403 interdit",
  "Sunucu hatası": "Erreur de serveur",
  "Yönlendirme hatası": "Erreur de redirection",
  "Zaman aşımı": "Délai expiré",
  "Google tarafında tarama hatası": "Erreur d'exploration du côté de Google",
  "Geçersiz adres": "URL invalide",
  "Google henüz almadı": "Google ne l'a pas encore récupéré",
  "Zengin sonuç verisi geçerli":
    "Les données de résultats enrichis sont valides",
  "Zengin sonuç verisinde uyarı var":
    "Les données de résultats enrichis contiennent des avertissements",
  "Zengin sonuç verisi geçersiz":
    "Les données de résultats enrichis ne sont pas valides",
  "Zengin sonuç verisi yok": "Aucune donnée de résultats enrichis",
  "Google henüz değerlendirmedi": "Google ne l'a pas encore évaluée",
  "{count} sayfada engellendik.": {
    one: "Nous avons été bloqués sur {count} page.",
    other: "Nous avons été bloqués sur {count} pages.",
  },
  "Sitenin bot koruması tarayıcımızı durdurdu, o sayfalar denetlenemedi. Henüz bir çözümümüz yok. Masaüstü tarayıcılar sizin bilgisayarınızdan çalıştığı için genelde geçer. Şunları deneyin: {librecrawl} (ücretsiz, açık kaynak) ya da {screamingfrog} (500 adrese kadar ücretsiz).":
    "La protection contre les robots du site a arrêté notre robot d'exploration, ces pages n'ont donc pas pu être auditées. Nous n’avons pas encore de solution de contournement. Les robots d'exploration de bureau réussissent généralement parce qu'ils s'exécutent à partir de votre propre ordinateur. Essayez {librecrawl} (gratuit, open source) ou {screamingfrog} (gratuit jusqu'à 500 URL).",
  "Tarama, sitenin istek sınırı yüzünden erken durdu.":
    "L'exploration s'est arrêtée prématurément en raison de la limite de débit du site.",
  "Site {count} sayfada istek sınırı uyguladı.": {
    one: "Le site a limité le débit de {count} page.",
    other: "Le site a limité le débit de {count} pages.",
  },
  "İstenen bekleme süresi denetim süresini aştı, bazı adresler ziyaret edilmedi. Bu rapor eksik.":
    "L'attente demandée par le site a dépassé la limite de temps de l'audit, de sorte que certaines URL n'ont pas été visitées. Ce rapport est incomplet.",
  'Sunucunun "çok fazla istek" (429) yanıtı verdiği sayfalar denetlenemedi.':
    "Les pages pour lesquelles le serveur a répondu « trop de requêtes » (429) n'ont pas pu être auditées.",
  'İstek sınırı sıfırlandıktan sonra denetimi yeniden başlatın, ya da site sahibinden "seotracker-audit" tarayıcısına izin vermesini isteyin.':
    "Relancez l'audit une fois la limite de débit réinitialisée, ou demandez au propriétaire du site d'autoriser le robot d'exploration « seotracker-audit ».",
  "başka bir mülk": "une autre propriété",
  "Sorunlu sayfalar ({count})": "Pages présentant des problèmes ({count})",
  "Sayfalar ({count})": "Pages ({count})",
  "Dizin durumu": "État de l'indexation",
  "Dizin durumu ({count})": "État de l'indexation ({count})",
  "Hız ({count})": "Vitesse ({count})",
  "{issue} sorunu olan sayfalar": "Pages concernées : {issue}",
  "Taranan sayfalar": "Pages explorées",
  "Bu denetim hiçbir sayfa taramadı.": "Cet audit n'a exploré aucune page.",
  "Bu filtrelerle eşleşen sayfa yok.":
    "Aucune page ne correspond à ces filtres.",
  "Sayfa hızı ölçümleri": "Mesures de vitesse de page",
  "Bu denetimde Lighthouse sonucu yok.":
    "Cet audit n'a donné aucun résultat Lighthouse.",
  "Bu filtrelerle eşleşen performans sonucu yok.":
    "Aucun résultat de performance ne correspond à ces filtres.",
  "Hız puanı (0-100)": "Score de performance (0-100)",
  "Erişilebilirlik puanı (0-100)": "Score d'accessibilité (0-100)",
  "Arama motoru uyumu puanı (0-100)":
    "Score de préparation aux moteurs de recherche (0-100)",
  "Ana içeriğin görünme süresi":
    "Délai jusqu'à ce que le contenu principal apparaisse",
  "Sayfanın ne kadar kaydığı": "Degré de décalage de la page",
  "Tıklamaya yanıt süresi": "Délai de réponse à un clic",
  "Sunucunun ilk yanıt süresi": "Délai jusqu'à la première réponse du serveur",
  Sorunlar: "Problèmes",
  "Sorunları gör": "Voir les problèmes",
  "JSON ({count} satır)": {
    one: "JSON ({count} ligne)",
    other: "JSON ({count} lignes)",
  },
  "{count} sorunu göster": {
    one: "Afficher {count} problème",
    other: "Afficher {count} problèmes",
  },
  yönlendirme: "redirection",
  eksik: "manquant",
  "Sayfadaki kelime sayısı": "Nombre de mots sur la page",
  "Sayfadaki görsel sayısı. Renkli sayı, alt metni (açıklaması) eksik görsellerin sayısıdır.":
    "Nombre d'images sur la page. Le nombre coloré compte les images sans texte alternatif (leur description).",
  Bağlantı: "Liens",
  "Bu sayfadan çıkan bağlantılar. Önce site içi, sonra dışarı giden sayısı yazar. Site içi bağlantısı olmayan sayfa, sitenin geri kalanına yönlendirmiyor demektir.":
    "Liens sortant de cette page : internes d'abord, puis externes. Une page sans liens internes ne mène nulle part ailleurs sur le site.",
  Dizin: "Index",
  Derinlik: "Profondeur",
  "Ana sayfadan kaç tıkla ulaşılıyor":
    "Clics nécessaires depuis la page d'accueil",
  Harita: "Sitemap",
  "Site haritasında var mı": "Présence dans le sitemap",
  Var: "Listée",
  Yok: "Aucun",
  Ara: "Recherche",
  "Adres, başlık, açıklama": "URL, titre, description",
  "Alt metni": "Texte alternatif",
  "Alt metni yok": "Texte alternatif manquant",
  "Alt metni tam": "Texte alternatif complet",
  Dizinlenebilir: "Indexable",
  "Hayır (noindex)": "Non (noindex)",
  "Site haritası": "Sitemap",
  Haritada: "Dans le sitemap",
  "Haritada yok": "Absente du sitemap",
  "En çok LCP (sn)": "LCP max. (s)",
  "Filtreleri aç/kapat": "Afficher ou masquer les filtres",
  "En az": "Min.",
  "En fazla": "Max.",
  "{label} en az": "Minimum : {label}",
  "{label} en fazla": "Maximum : {label}",
  "Search Console bağlı değil. Sayfaların Google'daki durumunu görmek için önce bağlayın.":
    "La Search Console n'est pas connectée. Connectez-la d'abord pour voir comment Google traite vos pages.",
  "Google'ın günlük {limit} adres sınırı doldu. {count} sayfa sırada, sınır birkaç saat içinde yenilenir.":
    {
      one: "La limite quotidienne de {limit} URL de Google est épuisée. {count} page est en attente ; la limite se réinitialise d'ici quelques heures.",
      other:
        "La limite quotidienne de {limit} URL de Google est épuisée. {count} pages sont en attente ; la limite se réinitialise d'ici quelques heures.",
    },
  "Tüm sayfalar güncel, sorulacak bir şey yok.":
    "Toutes les pages sont à jour ; il n'y a rien à vérifier.",
  "{count} sayfa soruldu.": {
    one: "{count} page vérifiée.",
    other: "{count} pages vérifiées.",
  },
  "{count} sayfa kaldı.": {
    one: "{count} page restante.",
    other: "{count} pages restantes.",
  },
  "Bugünkü kotadan {count} sorgu kaldı.": {
    one: "{count} vérification restante dans le quota du jour.",
    other: "{count} vérifications restantes dans le quota du jour.",
  },
  "Google'daki durum sorulamadı. Birazdan tekrar deneyin.":
    "Impossible de vérifier l'état sur Google. Réessayez dans un instant.",
  "Dizin durumu yüklenemedi": "Impossible de charger l'état de l'indexation",
  "Sorulacak sayfa yok": "Aucune page à vérifier",
  "Bu denetimde Google'ın dizine alabileceği bir sayfa yok.":
    "Cet audit ne comporte aucune page que Google pourrait indexer.",
  "Google'ın farklı adresi seçtiği sayfalar":
    "Pages pour lesquelles Google a choisi une autre URL canonique",
  "Üstteki grafikte seçtiğiniz gruptan bağımsız, kontrol edilen tüm sayfalar. Google, sizin seçtiğiniz adres yerine başka bir sayfayı asıl sayfa saydı.":
    "Compte chaque page vérifiée, quel que soit le groupe que vous avez choisi dans le graphique ci-dessus. Google a traité une page différente comme canonique au lieu de celle que vous avez déclarée.",
  "Üstteki grafikte seçtiğiniz gruptan bağımsız, kontrol edilen tüm sayfalar.":
    "Compte chaque page vérifiée, quel que soit le groupe que vous avez sélectionné dans le graphique ci-dessus.",
  "Google günde en çok {limit} adres sormanıza izin verir. Her seferde {batch} sayfa kontrol edilir. Önce hiç sorulmamış olanlara, sonra Google'ın dizine almadıklarına bakılır.":
    "Google vous permet de vérifier jusqu'à {limit} URL par jour. Chaque passage vérifie {batch} pages : d'abord celles jamais vérifiées, puis celles que Google n'a pas indexées.",
  "Google'da durumunu kontrol et": "Vérifier l'état sur Google",
  "Taradığınız sayfaların gerçekten dizine girip girmediğini görmek için yukarıdaki düğmeyi kullanın.":
    "Utilisez le bouton ci-dessus pour voir si vos pages explorées sont réellement indexées.",
  "{count} sayfa gösteriliyor": {
    one: "Affichage de {count} page",
    other: "Affichage de {count} pages",
  },
  "Tümünü göster": "Afficher tout",
  Sebep: "Raison",
  "Google'ın son ziyareti": "Dernière exploration par Google",
  "Sizin seçtiğiniz: {url}": "Votre choix : {url}",
  "{url} adresini Search Console'da aç": "Ouvrir {url} dans la Search Console",
  "Search Console'da aç": "Ouvrir dans la Search Console",
  "Google bu adres için yanıt vermedi ({error}). Google'da durumunu kontrol et düğmesiyle yeniden sorabilirsiniz.":
    "Google n'a pas répondu pour cette URL ({error}). Vous pouvez demander à nouveau avec le bouton Vérifier l'état sur Google.",
  Sorulamadı: "Échec de la vérification",
  "Kontrol edilmedi": "Non vérifié",
  "Yanıt alınamadı": "Pas de réponse",
  iyi: "bon",
  geliştirilmeli: "à améliorer",
  zayıf: "médiocre",
  "düşüyor, yani iyileşiyor": "en baisse, donc en amélioration",
  "yükseliyor, yani kötüleşiyor": "en hausse, donc en dégradation",
  "yatay seyrediyor": "stable",
  "{metric} son {count} haftada {start} değerinden {now} değerine geldi, {trend}; şu an {rating}.":
    {
      one: "{metric} est passé de {start} à {now} en {count} semaine, {trend} ; actuellement {rating}.",
      other:
        "{metric} est passé de {start} à {now} au cours des {count} dernières semaines, {trend} ; actuellement {rating}.",
    },
  "Gerçek kullanıcı hızı, son haftalar":
    "Vitesse pour les utilisateurs réels, dernières semaines",
  "Cihaz türü": "Type d'appareil",
  Telefon: "Téléphone",
  Bilgisayar: "Ordinateur",
  "Google'a ulaşılamadı.": "Impossible de joindre Google.",
  "Bu geçmiş için PageSpeed anahtarı gerekiyor.":
    "Cet historique nécessite une clé PageSpeed.",
  "Ayarlar'a git": "Accéder aux Paramètres",
  "Google bu site için yeterli ziyaretçi verisine sahip değil. Siteye Chrome ile gelen ziyaretçi arttıkça burada görünür.":
    "Google ne dispose pas encore de suffisamment de données sur les visiteurs de ce site. Elles apparaîtront ici à mesure que davantage de visiteurs utilisant Chrome arriveront.",
  "Google bu site için yeterli ziyaretçi verisine sahip değil.":
    "Google ne dispose pas de suffisamment de données sur les visiteurs pour ce site.",
  "Her nokta, o haftada biten 28 günde ziyaretçilerin yüzde 75'inin gördüğü değerdir (p75). Kesikli çizgiler iyi ile zayıf arasındaki sınırlardır.":
    "Chaque point correspond à la valeur vue par 75 % des visiteurs au cours des 28 jours se terminant cette semaine-là (p75). Les lignes pointillées marquent les seuils « bon » et « médiocre ».",
  "Son pencere {date} tarihinde bitiyor.":
    "La dernière période se termine le {date}.",
  Kategori: "Catégorie",
  Puan: "Score",
  "Görünen değer": "Valeur affichée",
  "Etki (ms)": "Impact (ms)",
  "Etki (bayt)": "Impact (octets)",
  "Etkilenen öğeler": "Éléments concernés",
  "En iyi uygulamalar": "Bonnes pratiques",
  "Tüm sorunlar": "Tous les problèmes",
  "Tüm sorunları": "tous les problèmes",
  "Performans sorunları": "Problèmes de performances",
  "Performans sorunlarını": "problèmes de performances",
  "Erişilebilirlik sorunları": "Problèmes d'accessibilité",
  "Erişilebilirlik sorunlarını": "problèmes d'accessibilité",
  "En iyi uygulama sorunları": "Problèmes de bonnes pratiques",
  "En iyi uygulama sorunlarını": "problèmes de bonnes pratiques",
  "SEO sorunları": "Problèmes SEO",
  "SEO sorunlarını": "Problèmes SEO",
  "Bu kategoride işlem gerektiren sorun yok.":
    "Aucun problème dans cette catégorie ne nécessite d'action.",
  Etki: "Impact",
  "Ayrıntıları gizle": "Masquer les détails",
  "Ayrıntıları göster": "Afficher les détails",
  "Etkilenen öğeler ({count})": "Éléments concernés ({count})",
  "{label} sayfasına dön": "Retour à {label}",
  "{date} tarihinde tarandı": "Analysé le {date}",
  "Sayfa hızı sorunları (Lighthouse)":
    "Problèmes de vitesse de page (Lighthouse)",
  "Lighthouse sorunlarını dışa aktar": "Exporter les problèmes Lighthouse",
  "{issues} E-Tablolar'da aç": "{issues} : ouvrir dans Google Sheets",
  "İşlem gerektiren tüm sorunları E-Tablolar'da aç":
    "Ouvrir dans Google Sheets tous les problèmes nécessitant une action",
  "{issues} kopyalandı": "{issues} copiés",
  "{issues} kopyala": "Copier {issues}",
  "İşlem gerektiren tüm sorunlar kopyalandı":
    "Tous les problèmes nécessitant une action copiés",
  "İşlem gerektiren tüm sorunları kopyala":
    "Copier tous les problèmes nécessitant une action",
  "Kayıtlı Lighthouse verisi kopyalandı":
    "Données Lighthouse enregistrées copiées",
  "Kayıtlı Lighthouse verisini kopyala":
    "Copier les données Lighthouse enregistrées",
  "JSON indir": "Télécharger JSON",
  "{issues} indir": "Télécharger {issues}",
  "İşlem gerektiren tüm sorunları indir":
    "Télécharger tous les problèmes nécessitant une action",
  "Kayıtlı Lighthouse verisini indir":
    "Télécharger les données Lighthouse enregistrées",
  "{category} ({count})": "{category} ({count})",
  "Lighthouse sorunları yüklenemedi.":
    "Impossible de charger les problèmes Lighthouse.",
  "Bu denetim, Lighthouse sorun ayrıntıları olmadan kaydedilmiş. Bu ekranı doldurmak için denetimi yeniden başlatın.":
    "Cet audit a été enregistré sans le détail des problèmes Lighthouse. Relancez l'audit pour remplir cet écran.",
  "Bu Lighthouse çalışması, sorun ayrıntıları saklanmaya başlamadan önce kaydedilmiş. Kategori sayılarını ve sorun kartlarını görmek için denetimi yeniden başlatın.":
    "Cette exécution Lighthouse a été enregistrée avant que le détail des problèmes ne soit stocké. Relancez l'audit pour voir le nombre par catégorie et les fiches de problèmes.",
  "İndirme başladı": "Téléchargement démarré",
  "Veri dışa aktarılamadı. Birazdan tekrar deneyin.":
    "Impossible d'exporter les données. Réessayez dans un instant.",
  "CSV indirmesi başladı": "Le téléchargement CSV a démarré",
  "Veri kopyalanamadı. Tekrar deneyin.":
    "Impossible de copier les données. Réessayez.",
  "Gerçek kullanıcı verisi · site geneli · son 28 gün":
    "Données d'utilisateurs réels · tout le site · 28 derniers jours",
  "Gerçek kullanıcı verisi · bu sayfa · son 28 gün":
    "Données d'utilisateurs réels · cette page · 28 derniers jours",
  "Yukarıdaki puanlar Google'ın test makinesinde ölçüldü. Bunlar sitenizi gerçekten ziyaret eden Chrome kullanıcılarından geliyor.":
    "Les scores ci-dessus ont été mesurés sur la machine de test de Google. Ceux-ci proviennent d'utilisateurs Chrome qui visitent réellement votre site.",
  "Bu sayfanın kendi ziyaretçi sayısı Google'ın eşiğinin altında kaldığı için sitenizin tamamının ortalaması gösteriliyor.":
    "Cette page compte trop peu de visiteurs pour atteindre le seuil de Google. La moyenne de l'ensemble de votre site est donc affichée.",
  "Laboratuvar ↔ gerçek kullanıcı": "Labo ↔ utilisateurs réels",
  "Test ortamında sitenizin hızı ziyaretçilerinkinden iyi çıkıyor. Google sıralamada sağdaki sütunu kullanır.":
    "Votre site semble plus rapide dans l'environnement de test que chez les visiteurs. Google utilise la colonne de droite pour le classement.",
  "Gerçek ziyaretçiler sitenizi test ortamından daha hızlı görüyor. Google sıralamada sağdaki sütunu kullanır.":
    "Les vrais visiteurs voient votre site plus rapidement que l'environnement de test. Google utilise la colonne de droite pour le classement.",
  "İki ölçüm birbirini tutuyor. Laboratuvar puanı ziyaretçilerin gördüğüne yakın.":
    "Les deux mesures concordent. Le score du laboratoire est proche de celui ressenti par les visiteurs.",
  Ölçüm: "Métrique",
  Laboratuvar: "Labo",
  "Gerçek kullanıcı": "Utilisateurs réels",
  Fark: "Différence",
  Tutuyor: "Concordent",
  "{gap} daha yavaş": "{gap} plus lent",
  "{gap} daha hızlı": "{gap} plus rapide",
  "en büyük içerik": "plus grand contenu",
  "ilk içerik": "premier contenu",
  "sunucu yanıtı": "réponse du serveur",
  "düzen kayması": "décalage de mise en page",
  "Tarama robotu engellendi": "Robot d'exploration bloqué",
  "Sayfa yerine bir bot doğrulaması ya da erişim engeli döndü (Cloudflare doğrulaması ya da 403 gibi), bu yüzden sayfa denetlenemedi. Google'ın tarayıcısı da benzer bir engele takılıyor olabilir; takılırsa sayfa aramada çıkmaz.":
    "Au lieu de la page, le serveur a renvoyé une vérification de robot ou un blocage d'accès (un défi Cloudflare ou un 403, par exemple), de sorte que la page n'a pas pu être auditée. Googlebot rencontre peut-être un blocage similaire ; si c'est le cas, la page n'apparaîtra pas dans la recherche.",
  'Site sizinse güvenlik duvarınızda ya da bot korumanızda "seotracker-audit" kullanıcı aracısına izin verin (Cloudflare\'de: kullanıcı aracısı "seotracker-audit" içerdiğinde bot korumasını atlayan bir WAF kuralı). Sonra denetimi yeniden başlatın.':
    "Si le site vous appartient, autorisez l'agent utilisateur « seotracker-audit » dans votre pare-feu ou votre protection anti-robots (dans Cloudflare : une règle WAF qui contourne la protection anti-robots lorsque l'agent utilisateur contient « seotracker-audit »). Relancez ensuite l'audit.",
  "İstek sınırına takıldı (429)": "Limite de débit atteinte (429)",
  "Sunucu 429 (çok fazla istek) yanıtı verdi, bu yüzden sayfa denetlenemedi. Sitenin istediği bekleme süresi denetimin süresine sığıyorsa tarayıcı bekleyip yeniden dener.":
    "Le serveur a répondu 429 (trop de requêtes), la page n'a donc pas pu être auditée. Si l'attente demandée par le site tient dans la durée de l'audit, le robot attend et réessaie.",
  'Sunucunuzda ya da güvenlik duvarınızda istek sınırını yükseltin veya "seotracker-audit" kullanıcı aracısını sınırın dışında tutun. Sonra denetimi yeniden başlatın. Sınır çok katıysa denetimi daha az sayfayla başlatmak da işe yarar.':
    "Augmentez la limite de débit sur votre serveur ou votre pare-feu, ou exemptez-en l'agent utilisateur « seotracker-audit ». Relancez ensuite l'audit. Si la limite est très stricte, lancer l'audit avec moins de pages aide aussi.",
  "Tarama erken durdu: istek sınırı":
    "Exploration arrêtée prématurément : limite de débit",
  "Site, tarayıcıdan denetimin süresinden uzun beklemesini istedi, biz de sayfa istemeyi bıraktık. Bu rapor eksik; çekemediğimiz adresler kırık ya da sınırlanmış diye kaydedilmedi.":
    "Le site a demandé au robot d'attendre plus longtemps que ne le permet l'audit ; nous avons donc cessé de demander des pages. Ce rapport est incomplet ; les URL que nous n'avons pas pu récupérer n'ont été enregistrées ni comme cassées ni comme limitées en débit.",
  "Sitenin istek sınırı sıfırlandıktan sonra denetimi yeniden başlatın. Sorun sürerse site yöneticisinden seotracker-audit tarayıcısına izin vermesini isteyin.":
    "Relancez l'audit après la réinitialisation de la limite de débit du site. Si cela persiste, demandez à l'administrateur du site d'autoriser le robot d'exploration seotracker-audit.",
  "Sunucu hatası (5xx)": "Erreur serveur (5xx)",
  "Sayfa 5xx sunucu hatası verdi. Google sürekli hata veren siteyi daha seyrek tarar ve sayfayı dizinden çıkarabilir.":
    "La page a renvoyé une erreur serveur 5xx. Google explore moins souvent un site qui génère des erreurs à répétition et peut retirer la page de son index.",
  "Sunucu günlüklerinde bu adrese ait hatayı bulup giderin. Sayfa bilerek kaldırıldıysa hata yerine 404 ya da 410 döndürün veya ilgili bir sayfaya yönlendirin.":
    "Recherchez l'erreur pour cette URL dans les journaux du serveur et corrigez-la. Si la page a été supprimée volontairement, renvoyez un 404 ou 410 au lieu d'une erreur, ou redirigez vers une page associée.",
  "Kırık iç bağlantı": "Lien interne rompu",
  "Bu sayfa, hata veren (4xx ya da 5xx) başka bir sayfaya bağlantı veriyor. Kırık bağlantı ziyaretçiyi çıkmaza sokar ve Google'ın sayfaya ulaşmasını engeller; çok büyük sitelerde taramayı da boşa harcar.":
    "Cette page contient un lien vers une autre page qui renvoie une erreur (4xx ou 5xx). Un lien rompu mène les visiteurs dans une impasse et empêche Google d'atteindre la page ; sur les très grands sites, il gaspille aussi de l'exploration.",
  "Bağlantıyı çalışan doğru adrese çevirin ya da kaldırın. Hedef taşındıysa yönlendirmeye güvenmeyin, doğrudan yeni adrese bağlanın.":
    "Faites pointer le lien vers l'URL correcte qui fonctionne, ou supprimez-le. Si la cible a été déplacée, ne comptez pas sur une redirection : faites un lien direct vers la nouvelle URL.",
  "Sayfa açılırken hata veriyor (4xx)": "La page renvoie une erreur (4xx)",
  "Bu adres hata döndürdü (404 gibi). Site haritanızda ya da başka sayfalarda geçiyorsa Google boşuna istek yapmaya devam eder; bu, esas olarak çok büyük sitelerde tarama bütçesi açısından önemlidir.":
    "Cette URL a renvoyé une erreur (par exemple 404). Si elle apparaît dans votre sitemap ou sur d'autres pages, Google continue de la demander pour rien ; cela compte surtout pour le budget d'exploration des très grands sites.",
  "Sayfa var olmalıysa geri yayınlayın. Bilerek kaldırıldıysa site haritasından ve iç bağlantılardan çıkarın; yerine geçecek bir sayfa varsa oraya 301 (kalıcı) yönlendirme verin.":
    "Si la page doit exister, publiez-la à nouveau. Si vous l'avez supprimée volontairement, retirez-la du sitemap et des liens internes ; si une autre page la remplace, ajoutez une redirection 301 (permanente) vers celle-ci.",
  "Yönlendirme zinciri": "Chaîne de redirection",
  "Son sayfaya ulaşmak için art arda iki ya da daha fazla yönlendirme gerekiyor. Her adım sayfayı yavaşlatır ve tarama bütçesinden (Google'ın siteniz için ayırdığı tarama zamanından) harcar; bu, esas olarak çok büyük siteler için önemlidir. Çok uzun zincirler (10 adımdan fazla) Google'ın takip ettiği kadarıyla hiç izlenmez.":
    "Atteindre la page finale nécessite deux redirections ou plus d'affilée. Chaque redirection ralentit la page et consomme du budget d'exploration (le temps que Google consacre à l'exploration de votre site) ; cela compte surtout pour les très grands sites. Les chaînes très longues (plus de 10 redirections) ne sont pas suivies du tout par Google.",
  "İlk adresi ve ona bağlantı veren sayfaları doğrudan son hedefe yönlendirin; en fazla tek yönlendirme kalsın.":
    "Redirigez la première URL et les pages qui y renvoient, directement vers la destination finale, de sorte qu'il reste au plus une redirection.",
  "Yönlendirme döngüsü": "Boucle de redirection",
  "Bu adresin yönlendirmesi dönüp dolaşıp kendine geliyor, yani sayfa hiç açılmıyor. Tarayıcılar ve Google hata verip vazgeçer.":
    "Les redirections de cette URL reviennent vers elle-même, de sorte que la page ne se charge jamais. Les navigateurs et Google abandonnent avec une erreur.",
  "Bu adresin yönlendirme kurallarını izleyip döngüyü kırın; zincir gerçekten açılan bir sayfada (200) bitmeli.":
    "Remontez les règles de redirection de cette URL et cassez la boucle ; la chaîne doit se terminer sur une page qui se charge réellement (200).",
  "Hiçbir sayfadan bağlantı almayan sayfa": "Page sans lien pointant vers elle",
  "Taranan hiçbir sayfa bu adrese bağlantı vermiyor. Google sayfaları bağlantıları izleyerek bulur, bu yüzden böyle bir sayfa daha seyrek taranır ve ziyaretçi gezinerek ona ulaşamaz.":
    "Aucune page explorée ne contient de lien vers cette URL. Google trouve les pages en suivant les liens ; une page comme celle-ci est donc explorée moins souvent, et les visiteurs ne peuvent pas l'atteindre en naviguant.",
  "İlgili sayfalardan buraya bağlantı verin (menü, ilgili yazılar, kategori sayfası). Sayfanın aramada çıkması gerekmiyorsa site haritasından da çıkarın.":
    "Ajoutez des liens vers elle depuis des pages associées (menu, articles associés, page de catégorie). Si la page n'a pas besoin d'apparaître dans la recherche, retirez-la aussi du sitemap.",
  "Sunucu yanıtı yavaş": "Réponse lente du serveur",
  "Sunucu sayfanın HTML'ini 600 milisaniyeden geç verdi; Lighthouse de aynı eşiği kullanır. Bu gecikme sayfanın geri kalan tüm hız ölçümlerini de aşağı çeker. Süre, denetimi çalıştıran bilgisayardan ölçülür, ziyaretçilerinizin bağlantısından değil.":
    "Le serveur a mis plus de 600 millisecondes à fournir le HTML de la page ; Lighthouse utilise le même seuil. Ce délai pénalise aussi toutes les autres mesures de vitesse de la page. Le temps est mesuré depuis l'ordinateur qui exécute l'audit, et non depuis les connexions de vos visiteurs.",
  "Bu sayfa için sunucu ve veritabanı süresine bakın, önbelleği açın. Önbelleğe alınmış ya da önceden üretilmiş (statik) HTML sunmak genelde sorunu çözer.":
    "Examinez le temps du serveur et de la base de données pour cette page, puis activez la mise en cache. Servir du HTML en cache ou pré-généré (statique) résout généralement le problème.",
  "robots.txt dosyası sunucu hatası veriyor":
    "robots.txt renvoie une erreur de serveur",
  "robots.txt dosyanız 5xx sunucu hatası veriyor. Google'ın belgelerine göre bu durumda ilk 12 saat siteyi hiç taramaz, sonra 30 gün boyunca dosyanın son çalışan kopyasını kullanır. Yani bu tek dosyanın hatası tüm sitenin taranmasını etkiler.":
    "Votre fichier robots.txt renvoie une erreur serveur 5xx. D'après la documentation de Google, Google n'explore alors pas du tout le site pendant les 12 premières heures, puis utilise pendant les 30 jours suivants la dernière copie fonctionnelle du fichier. Une erreur dans ce seul fichier affecte donc l'exploration de tout le site.",
  "Sunucu hatasını giderin ve robots.txt adresinin normal açıldığını doğrulayın. Dosya hiç yoksa 404 döndürmesi sorun değildir; Google bunu 'kısıtlama yok' diye okur.":
    "Corrigez l'erreur serveur et vérifiez que l'URL du robots.txt se charge normalement. Si le fichier n'existe pas du tout, un 404 convient ; Google l'interprète comme « aucune restriction ».",
  "robots.txt'ye ulaşılamadı": "Impossible de joindre robots.txt",
  "robots.txt isteği tamamlanmadı (zaman aşımı, DNS ya da TLS hatası). Bu denetim dosyayı okuyamadığı için siteyi tamamen taranabilir saydı; gerçek robots.txt farklı kurallar içeriyor olabilir.":
    "La requête robots.txt n'a pas abouti (délai d'expiration, erreur DNS ou TLS). Cet audit n'ayant pas pu lire le fichier, il a traité l'ensemble du site comme étant explorable ; le vrai robots.txt peut contenir des règles différentes.",
  "robots.txt adresini tarayıcıda açıp yanıt verdiğini kontrol edin. Yanıt veriyorsa hata geçici bir ağ sorunuydu, denetimi yeniden başlatın.":
    "Ouvrez l'URL du robots.txt dans un navigateur et vérifiez qu'il répond. Si c'est le cas, l'erreur était un problème de réseau temporaire ; relancez l'audit.",
  "robots.txt 500 KiB sınırını aşıyor":
    "robots.txt dépasse la limite de 500 Kio",
  "Google robots.txt dosyasının yalnızca ilk 500 KiB'ını okur, gerisini yok sayar. Dosyanız bu sınırı aştığı için sondaki kurallar Google için yokmuş gibi davranır.":
    "Google ne lit que les 500 premiers Kio d'un fichier robots.txt et ignore le reste. Votre fichier dépasse cette limite, donc les règles à la fin n'existent pas en ce qui concerne Google.",
  "Dosyayı kısaltın. Tek tek adresleri engellemek yerine klasör kalıpları kullanın. Aramada çıkmaması gereken sayfalar için robots.txt yerine noindex daha kesin bir yoldur. Ama noindex'in çalışması için sayfanın robots.txt ile engellenmemiş olması gerekir; Google engellenmiş sayfadaki noindex'i göremez.":
    "Raccourcissez le fichier. Utilisez des modèles de dossiers au lieu de bloquer les URL une par une. Pour les pages qui ne devraient pas apparaître dans la recherche, noindex est un outil plus fiable que robots.txt. Mais pour que noindex fonctionne, la page ne doit pas être bloquée par robots.txt ; Google ne peut pas voir de noindex sur une page bloquée.",
  "Başlangıç adresi robots.txt ile engellenmiş":
    "L'URL de départ est bloquée par robots.txt",
  "Denetimi başlattığınız adresi sitenizin kendi robots.txt dosyası taramaya kapatıyor. Google da bu kurala uyar, yani bu sayfayı taramaz. Bu denetim de aynı nedenle o sayfadan başlayamadı.":
    "Le fichier robots.txt de votre site bloque l'exploration de l'URL à partir de laquelle vous avez démarré l'audit. Google suit également cette règle et n'explore donc pas cette page. Pour la même raison, cet audit n'a pas pu démarrer à partir de là.",
  "Sayfanın taranması gerekiyorsa robots.txt'teki ilgili Disallow satırını kaldırın. Engel bilerek konduysa denetimi taranabilir bir adresten başlatın.":
    "Si la page doit être explorée, supprimez la ligne Disallow correspondante du fichier robots.txt. Si le blocage est intentionnel, démarrez l'audit à partir d'une URL explorable.",
  "Site haritasındaki sayfa açılmıyor": "Une page du sitemap ne se charge pas",
  "Bu adres site haritanızda listelenmiş ama hata veriyor. Site haritası Google'a 'şu sayfaları tara' demenin yoludur; açılmayan adres listelemek Google'ı boşa gönderir ve haritanıza güveni azaltır.":
    "Cette URL figure dans votre sitemap mais renvoie une erreur. Un sitemap sert à dire à Google « explore ces pages » ; y lister des URL qui ne se chargent pas envoie Google sur de fausses pistes et rend votre sitemap moins fiable.",
  "Sayfa var olmalıysa hatayı giderin. Kaldırıldıysa adresi site haritasından çıkarın. Harita otomatik üretiliyorsa, silinen sayfaları listelememesi için üreticinin ayarını kontrol edin.":
    "Si la page doit exister, corrigez l'erreur. Si elle a été supprimée, retirez l'URL du sitemap. Si le sitemap est généré automatiquement, vérifiez les paramètres du générateur afin qu'il cesse de lister les pages supprimées.",
  "Site haritasındaki sayfa yönlendiriyor": "Une page du sitemap redirige",
  "Bu adres site haritanızda listelenmiş ama başka bir adrese yönlendiriyor. Google site haritasındaki adresleri 'asıl adres' önerisi sayar (asıl adres: aynı sayfanın aramada gösterilmesini istediğiniz tek adres). Yani asıl olmadığını kendiniz söylediğiniz bir adresi öneriyorsunuz.":
    "Cette URL figure dans votre sitemap mais redirige vers une autre URL. Google traite les URL du sitemap comme des suggestions d'URL canonique (l'URL canonique est la seule URL que vous voulez voir affichée dans la recherche pour une page). Vous suggérez donc une URL dont vous dites vous-même qu'elle n'est pas canonique.",
  "Site haritasında yönlendirmenin kaynağını değil, vardığı hedef adresi listeleyin.":
    "Indiquez dans le sitemap l'URL de destination de la redirection, et non sa source.",
  "Site haritasındaki adres robots.txt ile engellenmiş":
    "Une URL du sitemap est bloquée par robots.txt",
  "Bu adres için iki kural çelişiyor: site haritası Google'a 'bunu tara' derken robots.txt 'tarama' diyor. Google robots.txt'ye uyar ve sayfayı taramaz; başka sitelerden bağlantı alıyorsa içeriğini görmeden yine de dizine alabilir.":
    "Deux règles se contredisent pour cette URL : le sitemap dit à Google « explore ceci » tandis que robots.txt dit « non ». Google suit robots.txt et n'explore pas la page ; si d'autres sites pointent vers elle, Google peut quand même l'indexer sans voir son contenu.",
  "Sayfanın aramada çıkmasını istiyorsanız robots.txt engelini kaldırın. İstemiyorsanız adresi site haritasından çıkarın.":
    "Si vous voulez que la page apparaisse dans la recherche, supprimez le blocage dans robots.txt. Sinon, retirez l'URL du sitemap.",
  "Site haritasındaki sayfa, asıl adres olarak başka sayfayı gösteriyor":
    "Une page du sitemap désigne une autre page comme canonique",
  "Bu sayfa site haritasında listelenmiş ama kendi içinde asıl adres olarak başka bir adresi gösteriyor. Aynı sayfa için iki farklı öneri göndermiş oluyorsunuz; Google birini seçer. Bilerek yaptıysanız sorun yok.":
    "Cette page figure dans le sitemap, mais sa propre balise canonique pointe vers une autre URL. Vous envoyez deux suggestions différentes pour la même page, et Google en choisit une. Si c'est voulu, ce n'est pas un problème.",
  "Site haritasında yalnızca asıl adresler olmalı: bu adresi haritadan çıkarın ya da sayfanın canonical (asıl adres) etiketini sayfanın kendi adresine çevirin.":
    "Un sitemap ne doit contenir que des URL canoniques : retirez cette URL du sitemap ou modifiez la balise canonique de la page pour qu'elle pointe vers sa propre URL.",
  "Site haritasındaki sayfa arama sonuçlarından gizlenmiş":
    "Une page du sitemap est masquée des résultats de recherche",
  "Bu sayfa site haritasında listelenmiş ama noindex ile aramadan gizlenmiş. Yani hem 'bunu tara' hem 'bunu gösterme' diyorsunuz. Sayfayı yeni gizlediyseniz bu geçici olabilir: Google noindex'i görmek için sayfayı bir kez daha taramalı.":
    "Cette page figure dans le sitemap mais est masquée de la recherche par noindex. Vous dites donc à la fois « explore ceci » et « n'affiche pas ceci ». Si vous venez de masquer la page, cela peut être temporaire : Google doit explorer la page une fois de plus pour voir le noindex.",
  "Sayfa aramada çıkacaksa noindex'i kaldırın. Kalıcı olarak gizli kalacaksa, Google noindex'i gördükten sonra adresi site haritasından çıkarın.":
    "Si la page doit apparaître dans la recherche, supprimez le noindex. Si elle doit rester masquée définitivement, retirez l'URL du sitemap une fois que Google a vu le noindex.",
  "Sayfa site yapısında çok derinde":
    "La page est profondément enfouie dans la structure du site",
  "Bu sayfa ana sayfadan 5 ya da daha fazla tık uzakta. Derin sayfalar Google tarafından daha seyrek taranabilir ve ziyaretçinin bulması zorlaşır.":
    "Cette page se trouve à 5 clics ou plus de la page d'accueil. Google peut explorer les pages profondes moins souvent et les visiteurs ont plus de mal à les trouver.",
  "Kategori sayfaları, menü ya da öne çıkan listeler gibi üst sayfalardan buraya bağlantı vererek yolu kısaltın.":
    "Raccourcissez le chemin en ajoutant des liens vers cette page depuis des pages de niveau supérieur, comme les pages de catégorie, le menu ou les listes mises en avant.",
  "Site haritası dosyası okunamayacak kadar büyük":
    "Le fichier sitemap est trop volumineux pour être lu",
  "Site haritası parçalarından biri bu aracın okuma sınırını (10 MB) aştı, bu yüzden içindeki adresler bu denetime girmedi. Google'ın sınırı 50 MB olduğundan dosya Google için geçerli olabilir; ama buradaki sayfa listesi eksik.":
    "L'un des fichiers sitemap a dépassé la limite de lecture de cet outil (10 Mo) ; les URL qu'il contient n'ont donc pas été incluses dans cet audit. La limite de Google est de 50 Mo : le fichier peut donc rester valide pour Google, mais la liste des pages ici est incomplète.",
  "Site haritanızı daha küçük parçalara bölün ve bir site haritası dizini (sitemapindex) ile birbirine bağlayın. Her parça 50 MB ve 50.000 adresin altında kalmalı; daha küçük parçalar iki tarafın da işine yarar.":
    "Divisez votre sitemap en fichiers plus petits et regroupez-les à l'aide d'un index de sitemaps (sitemapindex). Gardez chaque fichier sous 50 Mo et 50 000 URL ; des fichiers plus petits fonctionnent mieux pour les deux outils.",
  "Site haritasında 50.000'den fazla adres var":
    "Le sitemap contient plus de 50 000 URL",
  "Google bir site haritası dosyasında en fazla 50.000 adrese izin verir. Bu parça sınırı aşıyor; Google dosyayı reddedebilir ya da bir kısmını yok sayabilir.":
    "Google autorise au maximum 50 000 URL dans un fichier sitemap. Ce fichier dépasse la limite ; Google peut le rejeter ou en ignorer une partie.",
  "Dosyayı her biri 50.000 adresin altında kalan parçalara bölün ve hepsini bir site haritası dizini (sitemapindex) dosyasında listeleyin. Search Console'a parçaları tek tek değil, yalnızca dizin dosyasını gönderin.":
    "Divisez le fichier en parties de moins de 50 000 URL chacune et listez-les toutes dans un fichier d'index de sitemaps (sitemapindex). Envoyez uniquement le fichier d'index dans la Search Console, pas chaque partie.",
  "Site haritasında hiç lastmod tarihi yok":
    "Le sitemap n'a aucune date lastmod",
  "Site haritasındaki adreslerin hiçbirinde <lastmod> (son değişiklik tarihi) yok. Google bu alan doğru olduğu sürece hangi sayfayı ne zaman yeniden tarayacağını buna göre seçer. Yoksa yeniden tarama Google'ın kendi takvimine kalır; güncellediğiniz sayfanın fark edilmesi günler sürebilir.":
    "Aucune URL du sitemap n'a de <lastmod> (date de dernière modification). Tant que ce champ est exact, Google l'utilise pour décider quelles pages réexplorer et quand. Sans ce champ, la réexploration suit le propre calendrier de Google, et une page mise à jour peut mettre des jours à être remarquée.",
  "Site haritasını üreten ayarda ya da eklentide her adres için <lastmod> açın ve içeriğin gerçekten değiştiği tarihi yazdırın. Yayın tarihini ya da her derlemedeki anı yazmayın; bu alanı değersiz kılar.":
    "Activez <lastmod> pour chaque URL dans le paramètre ou le plugin qui génère votre sitemap, et faites-lui écrire la date à laquelle le contenu a réellement changé. N'écrivez pas la date de publication ni l'heure de chaque build ; cela rend le champ inutile.",
  "Site haritasında gelecek tarihli lastmod var":
    "Le sitemap contient une date lastmod dans le futur",
  "En az bir adresin <lastmod> (son değişiklik tarihi) değeri gelecekte. Bu doğru olamaz; Google bir sitenin tarihlerini tutarsız bulursa alanı o site için tümden yok sayar, yani doğru tarihleriniz de işe yaramaz.":
    "Au moins une URL a un <lastmod> (date de dernière modification) dans le futur. C'est forcément faux ; lorsque Google juge les dates d'un site peu fiables, il ignore ce champ pour tout le site, et vos dates correctes ne servent plus à rien non plus.",
  "Tarihleri üreten yeri kontrol edin. Genelde sunucu saatinin ileri olmasından ya da tarih alanına içerik tarihi yerine yayın planı tarihinin yazılmasından olur; düzeltip site haritasını yeniden üretin.":
    "Vérifiez ce qui génère les dates. Il s'agit généralement d'une horloge serveur en avance ou d'une date de publication planifiée écrite dans le champ à la place de la date du contenu. Corrigez-la et régénérez le sitemap.",
  "Sayfanın ihtiyaç duyduğu dosya robots.txt ile engellenmiş":
    "Un fichier dont la page a besoin est bloqué par robots.txt",
  "Sayfa taranabiliyor ama içindeki bir JavaScript ya da CSS dosyası robots.txt ile kapatılmış. Google engellenen dosyadaki JavaScript'i çalıştırmaz ve CSS'i okuyamaz; içerik JavaScript ile geliyorsa Google boş bir sayfa görür. Klasik örnek `Disallow: /wp-includes/` kuralıdır.":
    "La page peut être explorée, mais un fichier JavaScript ou CSS qu'elle utilise est bloqué par robots.txt. Google n'exécute pas JavaScript à partir d'un fichier bloqué et ne peut pas lire son CSS ; si le contenu est chargé avec JavaScript, Google voit une page vide. L'exemple classique est une règle `Disallow: /wp-includes/`.",
  "robots.txt'den bu dosyaları kapsayan kuralı kaldırın. Sayfayı gizlemek istiyorsanız sayfanın kendisini engelleyin; onu oluşturan dosyaları engellemek sayfayı gizlemez, yalnızca Google'ın yanlış görmesine yol açar.":
    "Supprimez la règle robots.txt qui couvre ces fichiers. Si vous voulez masquer la page, bloquez la page elle-même ; bloquer les fichiers qui la construisent ne la masque pas, cela fait seulement que Google la voit mal.",
  "İç bağlantı yönlendirmeye gidiyor":
    "Le lien interne pointe vers une redirection",
  "Bu sayfa sitenizdeki bir adrese bağlantı veriyor ama o adres başka bir yere yönlendiriyor. Bağlantı çalışır ama fazladan bir adım atılır: ziyaretçi bekler ve Google yönlendirmeyi de izlemek zorunda kalır (tarama bütçesi esas olarak çok büyük sitelerde önemlidir). Genelde adresler değişip iç bağlantılar eskisinde kalınca olur.":
    "Cette page contient un lien vers une URL de votre site, mais cette URL redirige ailleurs. Le lien fonctionne, mais avec une étape de plus : les visiteurs attendent, et Google doit aussi suivre la redirection (le budget d'exploration compte surtout pour les très grands sites). Cela arrive généralement lorsque des URL changent et que les liens internes conservent l'ancienne.",
  "Bağlantıyı yönlendirmenin vardığı yeni adresle değiştirin. Yönlendirmenin kendisi kalsın; dışarıdan gelen bağlantılar için gerekli. Düzeltilecek olan kendi sitenizin içinden verdiğiniz adrestir.":
    "Remplacez le lien par la nouvelle URL vers laquelle mène la redirection. Conservez la redirection elle-même ; les liens d'autres sites en ont encore besoin. Ce qu'il faut corriger, c'est l'URL vers laquelle vous faites un lien depuis votre propre site.",
  "Sayfa güvenli olmayan http ile açılıyor":
    "La page se charge en http non sécurisé",
  'Sayfa şifreli (https) yerine düz http ile sunuluyor. Tarayıcılar adres çubuğunda "Güvenli değil" uyarısı gösterir, formlara girilen bilgiler başkalarınca görülebilir ve Google https\'i hafif bir sıralama işareti sayar. Aynı içeriğin iki sürümü varsa https olanı tercih eder.':
    "La page est servie en http simple au lieu de https chiffré. Les navigateurs affichent un avertissement « Non sécurisé » dans la barre d'adresse, les informations saisies dans les formulaires peuvent être vues par d'autres, et Google traite https comme un léger signal de classement. Lorsque le même contenu existe dans les deux versions, Google préfère la version https.",
  'Barındırma firmanızdan ya da site oluşturucunuzun ayarlarından ücretsiz bir SSL sertifikası açın. Sonra tüm http adreslerini kalıcı yönlendirmeyle (301) https karşılığına gönderin; "http://siteniz.com/hakkimizda" açılınca "https://siteniz.com/hakkimizda" adresine geçilsin.':
    "Activez un certificat SSL gratuit auprès de votre hébergeur ou dans les paramètres de votre créateur de site. Redirigez ensuite chaque URL http vers son équivalent https avec une redirection permanente (301), de sorte que « http://votresite.com/about » mène à « https://votresite.com/about ».",
  "Güvenli sayfada güvensiz kaynak":
    "Ressource non sécurisée sur une page sécurisée",
  "Bu https sayfa, http ile yüklenen bir betik ya da stil dosyası istiyor. Tarayıcılar bunu engeller: betik çalışmaz, stil uygulanmaz. Google'ın sayfayı işlerken bu dosyayı yükleyememesi de mümkündür; bu yüzden sayfa sizin gördüğünüzden farklı işlenebilir. Adres çubuğundaki kilit de bozulur.":
    "Cette page https charge un script ou une feuille de style en http. Les navigateurs le bloquent : le script ne s'exécute pas et les styles ne sont pas appliqués. Google peut aussi ne pas réussir à charger le fichier lors du rendu, et traiter la page différemment de ce que vous voyez. Le cadenas de la barre d'adresse disparaît également.",
  "Dosyanın adresini https'e çevirin. Dosya https sunmuyorsa kendi sunucunuza alın ya da https sunan bir alternatifle değiştirin.":
    "Changez l'URL du fichier en https. Si le fichier n'est pas disponible via https, hébergez-le sur votre propre serveur ou remplacez-le par une alternative prenant en charge https.",
  "Karakter kodlaması belirtilmemiş":
    "L'encodage des caractères n'est pas déclaré",
  "Ne sunucu yanıtında ne de sayfanın ilk 1024 baytında karakter kodlaması (charset) belirtilmiş. Bu durumda tarayıcı ve Google kodlamayı tahmin eder; yanlış tahmin ettiğinde Türkçe karakterler (ş, ğ, ı) bozuk görünür.":
    "Ni la réponse du serveur ni les 1024 premiers octets de la page ne déclarent d'encodage de caractères (charset). Les navigateurs et Google devinent alors l'encodage ; lorsqu'ils se trompent, les caractères non anglais (comme ş, ğ, ı) s'affichent de façon illisible.",
  'Sayfanın <head> bölümünün en başına `<meta charset="utf-8">` ekleyin. Şablondan üretiliyorsa şablonda bir kez eklemeniz yeter.':
    "Ajoutez `<meta charset=\"utf-8\">` tout au début du <head> de la page. Si les pages proviennent d'un modèle, il suffit de l'ajouter une fois dans le modèle.",
  "Sayfa adresi çok uzun": "L'URL de la page est trop longue",
  "Sayfanın adresi 115 karakterden uzun. Google için katı bir sınır yok ve sıralamayı etkilemez; ama uzun adres paylaşırken kırılır, arama sonucunda kısalarak görünür ve yazarken hata yapılmasına yol açar. Çoğu zaman adrese sorgu parametreleri ya da gereksiz klasörler eklenmiştir.":
    "L'URL de la page comporte plus de 115 caractères. Google n'a pas de limite stricte et cela n'affecte pas le classement, mais une URL longue se coupe lorsqu'elle est partagée, apparaît tronquée dans les résultats de recherche et favorise les fautes de frappe. Généralement, des paramètres de requête ou des dossiers inutiles y ont été ajoutés.",
  "Adresi kısa ve anlamlı tutun: klasör derinliğini azaltın, gereksiz kelimeleri ve parametreleri çıkarın. Adresi değiştirirseniz eskisinden yenisine 301 yönlendirme verin.":
    "Gardez les URL courtes et significatives : réduisez la profondeur du dossier et supprimez les mots et paramètres inutiles. Si vous modifiez une URL, ajoutez une redirection 301 de l'ancienne vers la nouvelle.",
  "Adreste büyük harf ya da alt çizgi var":
    "L'URL contient des lettres majuscules ou des traits de soulignement",
  "Sayfa adresinin yol kısmında büyük harf ya da alt çizgi (_) var. Adresler büyük/küçük harfe duyarlıdır: /Hakkimizda ile /hakkimizda Google'a iki ayrı sayfa gibi görünebilir ve içerik çift dizine girer. Google ayrıca kelimeleri ayırmak için tire (-) kullanılmasını önerir.":
    "Le chemin de l'URL de la page contient des lettres majuscules ou des traits de soulignement (_). Les URL sont sensibles à la casse : /About et /about peuvent ressembler à deux pages distinctes pour Google, et le contenu est indexé deux fois. Google recommande également l'utilisation de tirets (-) pour séparer les mots.",
  "Adresleri küçük harf ve tireyle yazın. Büyük harfli adrese gelenleri küçük harfli adrese 301 ile yönlendirin ve asıl adresi (canonical) küçük harfli olarak belirtin.":
    "Écrivez les URL en minuscules avec des tirets. Redirigez avec un 301 les visiteurs arrivant sur une URL en majuscules vers l'URL en minuscules, et déclarez l'URL en minuscules comme canonique.",
  "Başlık etiketi yok": "Aucune balise de titre",
  "Sayfanın başlık etiketi (<title>) yok. Başlık, arama sonucunda mavi bağlantı olarak görünen yazıdır. Yoksa Google başlığı sayfadaki başlıklardan ya da başka bağlantı metinlerinden türetir; bu, sizin seçmeyeceğiniz bir metin olabilir.":
    "La page n'a pas de balise de titre (<title>). Le titre est le texte affiché sous forme de lien bleu dans les résultats de recherche. Sans titre, Google en crée un à partir des titres de la page ou d'un autre texte de lien, qui n'est peut-être pas celui que vous choisiriez.",
  "Sayfaya konusunu anlatan, sayfaya özgü bir <title> ekleyin (yaklaşık 50-60 karakter bir ölçüttür, kural değil). SEO eklentisi ya da site oluşturucunuz varsa başlık alanını doldurmanız yeter.":
    "Ajoutez un <title> propre à la page qui décrit son sujet (environ 50 à 60 caractères est un repère, pas une règle). Si vous utilisez un plugin SEO ou un créateur de site, remplir son champ de titre suffit.",
  "Meta açıklama yok": "Aucune méta-description",
  "Sayfanın meta açıklaması yok. Bu, arama sonucunda başlığın altında görünen kısa özet yazısıdır. Yoksa Google özeti sayfa metninden kendisi seçer; bu özet sizin vermek istediğiniz mesaj olmayabilir.":
    "La page n'a pas de méta-description. C'est le court résumé affiché sous le titre dans les résultats de recherche. Sans elle, Google choisit lui-même un extrait du texte de la page, qui n'est peut-être pas le message que vous voulez transmettre.",
  "Sayfayı özetleyen ve tıklamak için bir neden veren bir meta açıklama yazın. Yaklaşık 70-160 karakter bir ölçüttür, kural değil; Google sınır koymaz, kesilme ekran genişliğine göre değişir.":
    "Rédigez une méta-description qui résume la page et donne aux internautes une raison de cliquer. Environ 70 à 160 caractères est un repère, pas une règle ; Google ne fixe aucune limite, et l'endroit où elle est coupée dépend de la largeur de l'écran.",
  "H1 başlığı yok": "Pas de titre H1",
  "Sayfada H1 (ana başlık) yok. Google H1'i zorunlu tutmaz, ama başlıklar ziyaretçinin sayfanın konusunu ilk bakışta anlamasını ve ekran okuyucuyla gezinmeyi kolaylaştırır; Google da başlıkları sayfanın yapısını anlamak için kullanabilir.":
    "La page n'a pas de H1 (titre principal). Google n'exige pas de H1, mais les titres aident les visiteurs à comprendre le sujet de la page en un coup d'œil et facilitent la navigation avec le lecteur d'écran ; Google peut également utiliser des titres pour comprendre la structure de la page.",
  "Sayfaya konusunu anlatan tek bir H1 ekleyin; başlık etiketiyle uyumlu olsun.":
    "Ajoutez un seul H1 qui décrit le sujet de la page, conformément à sa balise de titre.",
  "Birden çok H1 başlığı": "Plusieurs titres H1",
  "Sayfada birden fazla H1 var. Google bunu sorun etmez, yani ceza yok. Ama çoğu zaman şablon hatasının işaretidir; örneğin logo ile sayfa başlığının ikisi de H1 olmuştur.":
    "La page comporte plusieurs H1. Cela ne dérange pas Google, il n'y a donc aucune pénalité. Mais c'est souvent le signe d'une erreur de modèle, par exemple lorsque le logo et le titre de la page sont tous deux des H1.",
  "Ana başlık için tek H1 bırakın, diğerlerini H2 ya da H3 yapın. Logo gibi başlık olmayan öğelerden H1 etiketini kaldırın.":
    "Conservez un H1 pour le titre principal et faites les autres H2 ou H3. Supprimez la balise H1 des éléments qui ne sont pas des titres, tels que le logo.",
  "Sayfada neredeyse hiç metin yok": "La page ne contient presque aucun texte",
  "Bu sayfada neredeyse hiç görünür metin bulunamadı. Genelde içeriğin JavaScript ile sonradan yüklenmesi ve ilk gelen HTML'de yer almaması yüzünden olur. Metnin kısa olması sorun değil; sorun sayfanın boş görünmesi, çünkü Google boş sayfayı dizine almak istemez.":
    "Presque aucun texte visible n'a été trouvé sur cette page. Cela se produit généralement lorsque le contenu est chargé ultérieurement avec JavaScript et ne figure pas dans le code HTML initial. Le texte court n'est pas le problème ; le problème est que la page semble vide, car Google ne souhaite pas indexer les pages vides.",
  "Sayfayı açıp metnin göründüğünü, sonra sağ tık > Sayfa kaynağını görüntüle ile aynı metnin orada da olduğunu kontrol edin. Yoksa içeriği sunucu tarafında üretin. Sayfa gerçekten boşsa noindex ekleyin ya da daha dolu bir sayfayla birleştirin.":
    "Ouvrez la page et vérifiez que le texte s'affiche, puis utilisez clic droit > Afficher le code source de la page pour vérifier que le même texte s'y trouve aussi. Si ce n'est pas le cas, générez le contenu côté serveur. Si la page est vraiment vide, ajoutez noindex ou fusionnez-la avec une page plus complète.",
  "Alt metni olmayan görseller": "Images sans texte alternatif",
  "Sayfadaki bazı görsellerin alt metni (görseli anlatan kısa yazı) yok. Alt metin, görmeyen kullanıcılar için gereklidir ve Google'ın görselin ne olduğunu anlamasının başlıca yoludur.":
    "Certaines images de la page n'ont pas de texte alternatif (une brève description de l'image). Le texte alternatif est essentiel pour les utilisateurs aveugles et constitue le principal moyen par lequel Google comprend ce qu'une image montre.",
  'Anlam taşıyan her görsele ne gösterdiğini anlatan kısa bir alt metin yazın. Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").':
    'Donnez à chaque image significative un court texte alternatif décrivant ce qu\'elle montre. Laissez le texte alternatif vide (alt="") uniquement sur les images purement décoratives.',
  "Sayfadan başka hiçbir yere bağlantı yok":
    "La page ne renvoie nulle part ailleurs",
  "Bu sayfadan başka hiçbir sayfaya bağlantı verilmiyor, yani ziyaretçi ve Google için çıkmaz sokak. Google siteyi bağlantıları izleyerek gezer; buradan yeni bir yere gidemez.":
    "Cette page ne renvoie vers aucune autre page ; c'est donc une impasse pour les visiteurs et pour Google. Google se déplace sur un site en suivant les liens ; à partir d'ici, il ne peut aller nulle part ailleurs.",
  "İlgili sayfalara, üst kategoriye ya da ana sayfaya bağlantı ekleyin. Menü JavaScript ile oluşuyorsa, bağlantıların ilk gelen HTML'de de bulunduğundan emin olun.":
    "Ajoutez des liens vers des pages associées, la catégorie parent ou la page d'accueil. Si le menu est construit avec JavaScript, assurez-vous que ses liens sont également dans le HTML initial.",
  "Başlık çok uzun": "Le titre est trop long",
  "Başlık yaklaşık 60 karakteri aşıyor. Bu bir ölçüt, kural değil: Google karakter sınırı koymaz, arama sonucunda kesilme ekran genişliğine göre değişir. Uzun başlıkta en önemli kısım görünmeyebilir.":
    "Le titre dépasse environ 60 caractères. C'est un repère, pas une règle : Google ne fixe aucune limite de caractères, et l'endroit où il est coupé dans les résultats de recherche dépend de la largeur de l'écran. Dans un titre long, la partie la plus importante peut ne pas s'afficher.",
  "Başlığı yaklaşık 50-60 karaktere indirin ve en önemli kelimeleri başa koyun.":
    "Réduisez le titre à environ 50 à 60 caractères et placez les mots les plus importants en premier.",
  "Başlık çok kısa": "Le titre est trop court",
  "Başlık 10 karakterden kısa. Bu kadar kısa bir başlık sayfanın ne sunduğunu anlatmaya ve tıklatmaya yetmez.":
    "Le titre comporte moins de 10 caractères. Un titre aussi court ne peut pas dire ce que propose la page ni générer un clic.",
  "Başlığı, sayfanın ne sunduğunu söyleyen bir ifadeye genişletin (yaklaşık 30-60 karakter).":
    "Développez le titre en une formulation qui dit ce que propose la page (environ 30 à 60 caractères).",
  "Meta açıklama çok uzun": "La méta-description est trop longue",
  "Meta açıklama yaklaşık 160 karakteri aşıyor. Bu bir ölçüt, kural değil: Google sınır koymaz, arama sonucunda kesilme ekran genişliğine göre değişir. Uzun açıklamada sondaki mesaj görünmeyebilir.":
    "La méta-description dépasse environ 160 caractères. C'est un repère, pas une règle : Google ne fixe aucune limite, et l'endroit où elle est coupée dans les résultats de recherche dépend de la largeur de l'écran. Dans une description longue, le message de la fin peut ne pas s'afficher.",
  "Ana mesajı başta tutarak açıklamayı yaklaşık 70-160 karaktere indirin.":
    "Réduisez la description à environ 70-160 caractères, en conservant le message principal au début.",
  "Meta açıklama çok kısa": "La méta-description est trop courte",
  "Meta açıklama yaklaşık 70 karakterden kısa. Bu bir ölçüt, kural değil; ama bu kadar kısa yazı arama sonucundaki alanı boşa harcar ve Google bunun yerine sayfadan kendi seçtiği bir metni gösterebilir.":
    "La méta-description fait moins d'environ 70 caractères. C'est un repère, pas une règle ; mais un texte aussi court gaspille de l'espace dans les résultats de recherche, et Google peut afficher à la place un extrait de la page choisi par lui-même.",
  "Açıklamayı, sayfayı özetleyen ve tıklamak için bir neden veren yaklaşık 70-160 karaktere genişletin.":
    "Allongez la description à environ 70 à 160 caractères qui résument la page et donnent une raison de cliquer.",
  "Başlık seviyeleri atlanmış": "Les niveaux de titre sont ignorés",
  "Başlık seviyeleri atlanmış, örneğin H2'den sonra doğrudan H4 gelmiş. Bu, ekran okuyucuyla gezinen ziyaretçiler için sayfa yapısını karıştırır; Google için sıralama kuralı yoktur. Menü ve altbilgi başlıkları da bu sıralamaya dahil olduğundan bazen yanlış alarm olabilir.":
    "Des niveaux de titre sont sautés, par exemple un H4 suit directement un H2. Cela brouille la structure de la page pour les visiteurs qui naviguent avec un lecteur d'écran ; Google n'impose pas d'ordre. Les titres du menu et du pied de page comptent aussi dans l'ordre, ce qui peut parfois donner une fausse alerte.",
  "Başlıkları sırayla kullanın: H1, sonra H2, sonra H3. Seviye atlayan başlığı bir kademe yukarı çekin. Atlamanın menü ya da altbilgiden geldiğini görürseniz orada başlık etiketi yerine düz metin kullanın.":
    "Utilisez les titres dans l'ordre : H1, puis H2, puis H3. Remontez d'un niveau le titre qui en saute un. Si le saut vient du menu ou du pied de page, utilisez-y du texte simple au lieu d'une balise de titre.",
  "Mobil görünüm etiketi (viewport) yok": "Aucune balise viewport mobile",
  'Sayfada mobil görünüm etiketi (`<meta name="viewport">`) yok. Google siteleri telefon sürümü üzerinden değerlendirir; bu etiket yoksa sayfa telefonda masaüstü genişliğinde açılır ve okumak için yakınlaştırmak gerekir. Bu denetim taranan her sayfaya bakar, bu yüzden bozuk bir şablon gözden kaçmaz.':
    "La page n'a pas de balise viewport mobile (`<meta name=\"viewport\">`). Google évalue les sites d'après leur version mobile ; sans cette balise, la page s'ouvre à la largeur d'un ordinateur sur un téléphone et il faut zoomer pour la lire. Cet audit vérifie chaque page explorée afin qu'un modèle défectueux ne passe pas inaperçu.",
  'Sayfanın `<head>` bölümüne `<meta name="viewport" content="width=device-width, initial-scale=1">` satırını ekleyin. Hemen her site için doğru değer budur.':
    'Ajoutez `<meta name="viewport" content="width=device-width, initial-scale=1">` au `<head>` de la page. C\'est la bonne valeur pour presque tous les sites.',
  "Sayfa dili belirtilmemiş": "La langue de la page n'est pas déclarée",
  "Sayfanın `<html>` etiketinde `lang` (sayfa dili) yok. Ekran okuyucular doğru telaffuz için, tarayıcılar çeviri önerisi için buna bakar. Google dili içerikten de anlar, ama açıkça yazmak belirsizliği ortadan kaldırır.":
    "La balise `<html>` de la page n'a pas de `lang` (langue de la page). Les lecteurs d'écran l'utilisent pour la prononciation correcte et les navigateurs pour les offres de traduction. Google peut également déterminer la langue à partir du contenu, mais l'indiquer supprime tout doute.",
  'Sayfanın başındaki `<html>` etiketine dilinizi ekleyin; Türkçe bir sayfa için `<html lang="tr">`. Sayfalar tek şablondan üretiliyorsa şablonda bir kez düzeltmek hepsine yeter.':
    'Ajoutez votre langue à la balise `<html>` en haut de la page, par exemple `<html lang="en">` pour une page en anglais. Si les pages proviennent d\'un seul modèle, corriger le modèle une fois suffit pour toutes.',
  "Görsellerde genişlik ve yükseklik yok":
    "Les images n'ont ni largeur ni hauteur",
  "Sayfada genişlik (width) ve yükseklik (height) belirtilmemiş üç ya da daha fazla görsel var. Tarayıcı görsel inmeden ona ne kadar yer ayıracağını bilemez; görsel gelince yazılar aşağı kayar ve okuyan kişi yerini kaybeder.":
    "La page contient trois images ou plus sans largeur ni hauteur définies. Le navigateur ne peut pas savoir combien d'espace réserver avant le téléchargement d'une image ; quand elle arrive, le texte saute vers le bas et le lecteur perd le fil.",
  'Her `<img>` etiketine görselin gerçek boyutunu yazın: `<img src="..." width="800" height="600">`. CSS ile küçültüyorsanız bu değerler oranı korur, yine de yazın. SVG görsellerde gerek yok.':
    'Donnez à chaque balise `<img>` la taille réelle de l\'image : `<img src="..." width="800" height="600">`. Si vous la réduisez en CSS, ces valeurs conservent les proportions ; définissez-les donc quand même. Les images SVG n\'en ont pas besoin.',
  "Uzun metinde alt başlık yok": "Le texte long n'a pas de sous-titres",
  "Sayfada epey uzun metin var ama H1 dışında hiç başlık yok. Alt başlıklar uzun metni taranabilir yapar ve Google'ın sayfanın hangi konuları kapsadığını anlamasına yardım eder.":
    "La page contient beaucoup de texte mais aucun titre autre que le H1. Les sous-titres facilitent la lecture en diagonale des textes longs et aident Google à comprendre les sujets abordés par la page.",
  "Metni konularına göre bölün ve her bölüme bir H2 başlığı verin. Başlıklar bölümün ne anlattığını söylesin; anahtar kelime doldurmayın.":
    "Divisez le texte par sujet et attribuez à chaque section un titre H2. Que chaque titre dise ce que couvre sa section ; ne le remplissez pas de mots-clés.",
  "Görselin alt metni bir dosya adı":
    "Le texte alternatif de l'image est un nom de fichier",
  "Bir görselin alt metni dosya adı ya da kamera çıktısı gibi duruyor (IMG_2231.jpg, DSC0043, ekran-goruntusu-1.png). Alt metin, görseli göremeyen birine ne olduğunu anlatmalıdır; dosya adı bunu yapmaz. Google'ın görselin konusunu anlamasına da yardım etmez.":
    "Le texte alternatif d'une image ressemble à un nom de fichier ou à un nom généré par l'appareil photo (IMG_2231.jpg, DSC0043, screenshot-1.png). Le texte alternatif doit dire à quelqu'un qui ne voit pas l'image ce qu'elle montre ; un nom de fichier ne le fait pas. Il n'aide pas non plus Google à comprendre le sujet de l'image.",
  'Alt metne görselde ne olduğunu yazın, örneğin "kırmızı koltukta oturan kadın". Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").':
    'Écrivez dans le texte alternatif ce que montre l\'image, par exemple « femme assise sur un fauteuil rouge ». Laissez le texte alternatif vide (alt="") uniquement pour les images purement décoratives.',
  "Görsel alt metni çok uzun": "Le texte alternatif de l'image est trop long",
  "Bir görselin alt metni 250 karakteri aşıyor. Ekran okuyucular alt metni sonuna kadar okur; bu kadar uzun olunca görsel anlatımı paragrafa döner ve dinleyen sayfanın akışını kaybeder.":
    "Le texte alternatif d'une image dépasse 250 caractères. Les lecteurs d'écran lisent le texte alternatif jusqu'au bout ; à cette longueur, la description de l'image devient un paragraphe et l'auditeur perd le fil de la page.",
  "Görselin ne olduğunu bir cümleyle anlatın (yaklaşık 125 karakter). Daha fazla anlatılacak şey varsa onu sayfanın metnine ya da görselin açıklama yazısına taşıyın.":
    "Décrivez en une phrase ce que montre l'image (environ 125 caractères). S'il y a plus à dire, déplacez-le dans le texte de la page ou dans la légende de l'image.",
  "Sayfada birden fazla başlık etiketi (<title>)":
    "La page comporte plusieurs balises de titre (<title>)",
  "Sayfada birden fazla <title> etiketi var. Bir sayfanın tek başlığı olur; Google hangisini alacağını kendisi seçer ve seçtiği, arama sonucunda görmek istediğiniz olmayabilir. Genelde şablon ile SEO eklentisinin ikisi birden başlık yazınca olur.":
    "La page comporte plusieurs balises <title>. Une page a un titre ; Google choisit lequel utiliser, et son choix n'est peut-être pas celui que vous souhaitez dans les résultats de recherche. Cela se produit généralement lorsque le modèle et un plugin SEO écrivent un titre.",
  "Sayfa kaynağında <title> araması yapın ve yalnızca birini bırakın. İkisi farklı yerden geliyorsa (şablon ve eklenti) birini kapatın.":
    "Recherchez <title> dans le code source de la page et n'en conservez qu'une seule. Si elles proviennent d'endroits différents (modèle et plugin), désactivez l'un des deux.",
  "Sayfada birbirinden farklı birden fazla meta açıklama":
    "La page contient plusieurs méta-descriptions différentes",
  "Sayfada içeriği farklı iki ya da daha fazla meta açıklama var. Google hangisini özet olarak göstereceğini kendisi seçer, yani arama sonucunda çıkan yazı sizin yazdığınız olmayabilir. Şablon ile SEO eklentisinin ikisi birden yazınca olur.":
    "La page contient au moins deux méta-descriptions au contenu différent. Google choisit laquelle afficher comme extrait ; le texte dans les résultats de recherche n'est donc peut-être pas celui que vous avez écrit. Cela arrive lorsque le modèle et un plugin SEO en écrivent chacun une.",
  'Sayfa kaynağında name="description" araması yapın ve yalnızca birini bırakın. İki kaynak varsa (şablon ve eklenti) birini kapatın.':
    "Recherchez name=\"description\" dans le code source de la page et n'en conservez qu'une seule. S'il y a deux sources (modèle et plugin), désactivez l'une d'elles.",
  "Başlık etiketi yer tutucu bir yazı":
    "La balise de titre est un texte provisoire",
  'Sayfanın başlığı "Untitled", "Başlıksız" ya da "New Page" gibi kimsenin yazmadığı bir yer tutucu. Arama sonucunda mavi bağlantı olarak bu çıkabilir; kimse tıklamak istemez. Google da bazen bu başlığı kullanmayıp başka bir metinle değiştirir.':
    "Le titre de la page est un texte provisoire que personne n'a rédigé, comme « Sans titre », « Başlıksız » ou « Nouvelle page ». Il peut apparaître comme lien bleu dans les résultats de recherche, et personne ne voudra cliquer dessus. Google remplace aussi parfois un tel titre par un autre texte.",
  "Sayfanın konusunu anlatan kendi başlığını yazın (yaklaşık 50-60 karakter bir ölçüttür). Sayfa sonradan doldurulacaksa dolana kadar noindex ile dizin dışında tutun.":
    "Écrivez un vrai titre qui décrit le sujet de la page (environ 50 à 60 caractères est un repère). Si la page doit être remplie plus tard, maintenez-la hors de l'index avec noindex d'ici là.",
  "Ana başlık (H1) çok uzun": "Le titre principal (H1) est trop long",
  "Sayfanın ana başlığı (H1) 70 karakterden uzun. Google için bir sınır yok ve sıralamayı etkilemez; ama uzun başlık bir bakışta okunmaz, genelde de başlığa metin paragrafı yazılmıştır.":
    "Le titre principal de la page (H1) comporte plus de 70 caractères. Google n'a pas de limite et cela n'affecte pas les classements, mais un long titre ne peut pas être lu d'un seul coup d'œil, et généralement un paragraphe de texte a été placé dans le titre.",
  "H1'i bir cümlelik, sayfanın konusunu söyleyen kısa bir başlığa indirin. Geri kalan açıklamayı başlığın altındaki paragrafa taşıyın.":
    "Réduisez le H1 en un titre court d'une seule ligne qui indique le sujet de la page. Déplacez le reste de la description dans le paragraphe situé en dessous.",
  "Metni olmayan iç bağlantılar": "Liens internes sans texte",
  'Sayfada içinde yazı, görsel ya da erişilebilirlik etiketi (aria-label) olmayan iç bağlantılar var. Google bir bağlantının nereye gittiğini bağlantı metninden anlar; boş bağlantı hiçbir şey söylemez. Ekran okuyucu kullanan ziyaretçi için de bağlantı sadece "bağlantı" diye okunur.':
    "La page contient des liens internes sans texte, image ou étiquette d'accessibilité (aria-label) à l'intérieur. Google comprend où va un lien à partir de son texte d'ancrage ; un lien vide ne dit rien. Pour les visiteurs utilisant un lecteur d'écran, le lien est lu comme un simple \"lien\".",
  'Bağlantıya görünür bir yazı ekleyin ya da yalnızca simge ise `aria-label="Sepet"` gibi ne yaptığını söyleyen bir etiket ekleyin. Kullanılmayan boş `<a>` etiketlerini silin.':
    "Ajoutez du texte visible au lien ou, s'il ne s'agit que d'une icône, un libellé indiquant ce qu'il fait, comme `aria-label=\"Cart\"`. Supprimez les balises `<a>` vides qui ne servent pas.",
  '"Buraya tıklayın" gibi anlamsız bağlantı metinleri':
    'Texte de lien dénué de sens tel que "Cliquez ici"',
  'Sayfada "buraya tıklayın", "devamı", "daha fazla", "click here" gibi hedefi anlatmayan iç bağlantı metinleri var (üç ya da daha fazla). Google, bağlantı metnini hedef sayfanın konusunu anlamak için kullanır; bu metinler o bilgiyi vermez. Ekran okuyucu kullanan biri bağlantı listesini açtığında hepsini aynı duyar.':
    "La page contient des textes de liens internes qui ne décrivent pas la cible, comme « cliquez ici », « en savoir plus » ou « plus » (trois ou plus). Google utilise le texte d'ancrage pour comprendre le sujet de la page cible ; ces formulations ne donnent pas cette information. Une personne utilisant un lecteur d'écran les entend toutes à l'identique lorsqu'elle ouvre la liste des liens.",
  'Bağlantı metnini hedefin konusuyla değiştirin: "buraya tıklayın" yerine "2026 fiyat listesini indirin". Kart şablonlarında "Devamı" yazısına yazı başlığını ekleyin ya da görünmeyen bir aria-label ile tamamlayın.':
    "Remplacez le texte du lien par le sujet de la cible : au lieu de « cliquez ici », écrivez « télécharger la grille tarifaire 2026 ». Dans les modèles de cartes, ajoutez le titre de l'article à « En savoir plus » ou complétez-le avec un aria-label masqué.",
  "Sayfada çok fazla bağlantı": "Trop de liens sur la page",
  "Sayfada 300'den fazla farklı adrese bağlantı var. Google'ın sabit bir sınırı yok ve bu tek başına sıralamayı düşürmez; ama bu kadar bağlantı ziyaretçinin seçim yapmasını zorlaştırır ve Google'ın önemli bağlantıyı ayırt etmesini güçleştirir. Genelde büyük bir menü ya da kategori listesinin her sayfada tekrarlanması yüzünden olur.":
    "La page renvoie vers plus de 300 URL différentes. Google n'a pas de limite fixe et cela seul ne fait pas baisser le classement, mais autant de liens compliquent le choix des visiteurs et rendent plus difficile pour Google de savoir quels liens comptent. Cela vient généralement d'un grand menu ou d'une liste de catégories répétés sur chaque page.",
  "Menüyü ve alt bilgiyi (footer) en önemli sayfalarla sınırlayın. Uzun listeleri sayfalara bölün ya da kategori sayfalarına indirin.":
    "Limitez le menu et le pied de page à vos pages les plus importantes. Divisez les longues listes sur plusieurs pages ou déplacez-les vers des pages de catégorie.",
  "Kendi sitenizin sayfalarına nofollow bağlantılar":
    "Liens nofollow vers vos propres pages",
  'Sayfada kendi sitenizin sayfalarına giden üç ya da daha fazla bağlantıda rel="nofollow" var. nofollow, Google\'a "bu bağlantıya güvenme" demek içindir ve iç bağlantıda genelde gerek yoktur. Google bu bağlantıları takip etmeyebilir; yani sayfaya başka yolla ulaşılamıyorsa hedef sayfa dizine geç girer ya da hiç girmez.':
    'Trois liens ou plus sur la page qui mènent à votre propre site portent rel="nofollow". nofollow dit à Google « ne fais pas confiance à ce lien », et les liens internes en ont rarement besoin. Google peut ne pas suivre ces liens ; si la page cible n\'est pas accessible autrement, elle est indexée tardivement, voire pas du tout.',
  'Kendi sayfalarınıza verdiğiniz bağlantılardan rel="nofollow" özelliğini kaldırın. Sayfanın dizine girmesini istemiyorsanız bağlantıyı değil sayfayı noindex ile işaretleyin.':
    'Supprimez rel="nofollow" des liens vers vos propres pages. Si vous ne souhaitez pas qu\'une page soit indexée, marquez la page elle-même avec noindex, pas le lien.',
  "Tekrarlanan başlık": "Titre en double",
  "Birden çok sayfa aynı başlığı (<title>) kullanıyor. Aynı başlıkla arama sonucunda sayfalar birbirine benzer görünür ve ziyaretçi hangisine tıklayacağını seçemez.":
    "Plusieurs pages utilisent le même titre (<title>). Avec le même titre, les pages se ressemblent dans les résultats de recherche et les visiteurs ne savent pas sur laquelle cliquer.",
  "Her sayfaya kendi içeriğini anlatan farklı bir başlık yazın. Şablondan üretilen sayfalarda ayırt edici bilgiyi (ürün adı, kategori, şehir) başlık şablonuna ekleyin.":
    "Écrivez un titre différent pour chaque page qui décrit son propre contenu. Pour les pages générées à partir d'un modèle, ajoutez le détail distinctif (nom du produit, catégorie, ville) au modèle de titre.",
  "Tekrarlanan ana başlık (H1)": "Titre principal (H1) en double",
  "Birden çok sayfa aynı ana başlığı (H1) kullanıyor. Başlık, ziyaretçiye ve Google'a sayfanın ne hakkında olduğunu söyler; aynı başlık farklı sayfaları ayırt etmeyi zorlaştırır. Sitenin her sayfasında logo ya da site adı H1 olarak yazılmışsa bu uyarı genelde ondan gelir.":
    "Plusieurs pages utilisent le même titre principal (H1). Le titre indique aux visiteurs et à Google de quoi parle la page ; le même titre rend les différentes pages difficiles à distinguer. Si le logo ou le nom du site est le H1 sur chaque page, c'est généralement de là que vient cet avertissement.",
  "Her sayfanın H1'ini o sayfanın konusunu anlatan kendi cümlesiyle yazın. Logo ya da site adı H1 ise onu H1 olmayan bir etikete çevirin ve sayfa başlığını H1 yapın.":
    "Attribuez à chaque page son propre H1 qui indique le sujet de cette page. Si le logo ou le nom du site est le H1, remplacez-le par une balise non-H1 et faites du titre de la page le H1.",
  "Tekrarlanan meta açıklama": "Méta-description en double",
  "Birden çok sayfa aynı meta açıklamayı (arama sonucunda başlığın altındaki özet) kullanıyor. Aramada hepsi aynı özetle çıkar ve ziyaretçi sayfaları ayırt edemez.":
    "Plusieurs pages utilisent la même méta-description (le résumé sous le titre dans les résultats de recherche). Elles apparaissent toutes avec le même extrait dans la recherche, et les visiteurs ne peuvent pas les distinguer.",
  "Her sayfaya kendi açıklamasını yazın ya da yinelenen açıklamayı tamamen silin. Açıklama yoksa Google sayfa metninden bir özet seçer; bu, yanlış bir kopyadan iyidir.":
    "Écrivez une description pour chaque page ou supprimez entièrement la description en double. Sans elle, Google choisit un extrait du texte de la page, ce qui vaut mieux qu'une copie erronée.",
  "Tekrarlanan sayfa içeriği": "Contenu de la page en double",
  "İki ya da daha fazla adres birebir aynı metni gösteriyor. Google bunlardan birini seçip dizine alır ve seçtiği sizin istediğiniz olmayabilir. Ceza değildir, ama sıralama gücü adresler arasında bölünür.":
    "Deux URL ou plus affichent exactement le même texte. Google en choisit une à indexer, et son choix n'est peut-être pas celui que vous souhaitez. Ce n'est pas une pénalité, mais la force de classement est répartie entre les URL.",
  "Asıl adresi (aramada görünmesini istediğiniz tek adres) seçin. Kopya adres kullanıcıya gerekmiyorsa 301 ile asıl adrese yönlendirin; kopya adres açık kalacaksa (parametreli sayfa gibi) canonical (asıl adres) etiketiyle asıl adresi gösterin. Sık nedenler: sonda eğik çizgi farkı, adrese eklenen parametreler, http/https ya da www farkı.":
    "Choisissez l'URL canonique (la seule URL que vous voulez voir affichée dans la recherche). Si les visiteurs n'ont pas besoin de l'URL en double, redirigez-la vers l'URL canonique avec un 301 ; si le doublon doit rester accessible (une page avec des paramètres, par exemple), faites pointer vers l'URL canonique avec une balise canonique. Causes fréquentes : barre oblique finale, paramètres ajoutés à l'URL, ou différences http/https ou www.",
  "Sayfada canonical (asıl adres) etiketi yok":
    "La page n'a pas de balise canonique",
  "Sayfa, kendi asıl adresini belirtmiyor. Aynı sayfa birden çok adresten açılabilir: sonunda eğik çizgi olan ve olmayan, ?utm_source gibi eklerle gelen, www'lu ve www'suz adresler. Etiket yoksa Google bunlardan hangisini göstereceğine kendi karar verir. Google bu etiketi zorunlu değil, önerilen bir işaret sayar; bu yüzden bu yalnızca bir öneridir.":
    "La page ne déclare pas sa propre URL canonique. La même page peut souvent être ouverte à partir de plusieurs URL : avec et sans barre oblique finale, avec des ajouts tels que ?utm_source, avec et sans www. Sans la balise, Google décide laquelle afficher. Google considère cette balise comme un signal recommandé plutôt que comme une exigence. Il ne s'agit donc que d'une suggestion.",
  'Sayfanın `<head>` bölümüne kendi tam adresini gösteren şu satırı ekleyin: `<link rel="canonical" href="https://www.siteniz.com/hakkimizda">`. Adres, aramada görünmesini istediğiniz adres olsun. Çoğu site oluşturucu ve SEO eklentisi bunu tek ayarla tüm sayfalara ekler.':
    'Ajoutez cette ligne, qui pointe vers l\'URL complète de la page, dans le `<head>` de la page : `<link rel="canonical" href="https://www.yoursite.com/about">`. Utilisez l\'URL que vous voulez voir affichée dans la recherche. La plupart des créateurs de sites et des plugins SEO l\'ajoutent à chaque page avec un seul réglage.',
  "Asıl adres bildirimleri birbiriyle çelişiyor":
    "Les déclarations d'URL canonique se contredisent",
  "Sayfa, asıl adresi iki yerde farklı söylüyor: HTML içindeki asıl adres etiketinde bir adres, HTTP Link başlığında başka bir adres. Sinyaller çelişince Google ikisini de bırakıp kendi seçimini yapar.":
    "La page indique son URL canonique différemment à deux endroits : une URL dans la balise canonique du HTML, une autre dans l'en-tête HTTP Link. Lorsque les signaux se contredisent, Google ignore les deux et fait son propre choix.",
  "Tek bir asıl adres seçin ve onu yalnızca bir yerde bildirin (genelde HTML head). Diğerini kaldırın ya da aynı adrese çevirin.":
    "Choisissez une URL canonique et déclarez-la à un seul endroit (généralement le head HTML). Supprimez l'autre ou remplacez-la par la même URL.",
  "Sayfa arama sonuçlarından gizlenmiş (noindex)":
    "La page est masquée des résultats de recherche (noindex)",
  "Sayfa, arama motorlarından kendisini dizine almamalarını istiyor (robots meta etiketi ya da X-Robots-Tag başlığıyla). Yani sayfa aramada çıkmaz. Çoğu zaman bilerek yapılır; bu bir hata değil, bilgi notudur.":
    "La page demande aux moteurs de recherche de ne pas l'indexer (par une balise meta robots ou un en-tête X-Robots-Tag). La page n'apparaîtra donc pas dans la recherche. C'est généralement voulu ; c'est une remarque, pas une erreur.",
  "Sayfa aramada çıkmalıysa noindex yönergesini kaldırın. Bilerek konduysa (yönetim paneli, teşekkür, filtre sayfaları gibi) yapmanız gereken bir şey yok.":
    "Si la page doit apparaître dans la recherche, supprimez la directive noindex. Si elle a été ajoutée volontairement (pages d'administration, pages de remerciement, pages de filtrage, etc.), il n'y a rien à faire.",
  "Sayfa, asıl adres olarak başka bir sayfayı gösteriyor":
    "La page désigne une autre page comme canonique",
  "Sayfa asıl adres olarak başka bir adresi gösteriyor, yani Google'dan onun yerine o adresi dizine almasını istiyor. Bilerek yaptıysanız sorun yok (parametreli sayfalar gibi); ama bu sayfanın aramada çıkmasını istiyorsanız sorundur.":
    "La page désigne une autre URL comme canonique, ce qui demande à Google d'indexer plutôt cette URL. C'est normal si c'est voulu (des pages avec paramètres, par exemple), mais c'est un problème si vous voulez que cette page elle-même apparaisse dans la recherche.",
  "Bu sayfa kendi adıyla aramada çıkacaksa asıl adres etiketini sayfanın kendi adresine çevirin. Aksi halde yapılacak bir şey yok.":
    "Si cette page doit apparaître dans la recherche sous sa propre URL, modifiez la balise canonique pour qu'elle pointe vers l'URL de la page. Sinon, il n'y a rien à faire.",
  "Asıl adres olarak gösterilen sayfa açılmıyor":
    "L'URL canonique pointe vers une page qui ne se charge pas",
  "Sayfa, asıl adres olarak hata veren (404 ya da 5xx) bir adresi gösteriyor. Asıl adres etiketi güçlü bir işarettir ama gösterdiği adres yayında değilse Google onu kullanamaz ve asıl adresi kendi seçer. Sonuç, hiç asıl adres vermemişsiniz gibi olur.":
    "La page désigne comme canonique une URL qui renvoie une erreur (404 ou 5xx). Une balise canonique est un signal fort, mais si l'URL ciblée n'est pas en ligne, Google ne peut pas l'utiliser et choisit lui-même l'URL canonique. C'est comme si vous n'aviez indiqué aucune URL canonique.",
  "Asıl adres etiketini çalışan bir adrese çevirin ya da hedef sayfayı yeniden yayınlayın. Hedef gerçekten kaldırıldıysa etiket sayfanın kendi adresini göstersin.":
    "Faites pointer la balise canonique vers une URL qui fonctionne, ou republiez la page cible. Si la cible a vraiment été supprimée, faites pointer la balise vers l'URL de la page elle-même.",
  "Asıl adres olarak yönlendiren bir sayfa gösterilmiş":
    "L'URL canonique pointe vers une page qui redirige",
  "Sayfa, asıl adres olarak başka yere yönlendiren (3xx) bir adresi gösteriyor. Yönlendirmenin kendisi zaten hedefin asıl olduğunu söyler; yani bu sayfa, asıl olmadığı bilinen bir adresi asıl diye öneriyor.":
    "La page désigne comme canonique une URL qui redirige ailleurs (3xx). La redirection elle-même indique déjà que la cible est l'URL canonique ; cette page suggère donc comme canonique une URL dont on sait qu'elle ne l'est pas.",
  "Asıl adres etiketini yönlendirmenin vardığı son adrese çevirin; bildirdiğiniz adres ile açılan adres aynı olsun.":
    "Faites pointer la balise canonique vers l'URL finale de la redirection, afin que l'URL que vous déclarez et l'URL qui se charge soient identiques.",
  "Asıl adres olarak gizlenmiş bir sayfa gösterilmiş":
    "L'URL canonique pointe vers une page masquée",
  "Sayfa, asıl adres olarak noindex ile gizlenmiş bir sayfayı gösteriyor. Noindex kesin bir yönergedir, asıl adres etiketi ise yalnızca bir işarettir; yani bu sayfa, Google'ın hiçbir zaman gösteremeyeceği bir adresi öneriyor ve kendisi de aramadan düşebilir.":
    "La page désigne comme canonique une page masquée par noindex. noindex est une directive ferme alors qu'une balise canonique n'est qu'un signal ; cette page suggère donc une URL que Google ne pourra jamais afficher, et elle peut elle-même disparaître de la recherche.",
  "İki yoldan biri: hedef sayfadaki noindex'i kaldırın ya da bu sayfanın asıl adres etiketini sayfanın kendi adresine çevirin.":
    "Faites l'une des deux choses : supprimez le noindex de la page cible, ou modifiez la balise canonique de cette page pour qu'elle pointe vers sa propre URL.",
  "Google sayfayı boş sayıyor (soft 404)":
    "Google traite la page comme vide (soft 404)",
  "Sayfa normal açılıyor (200) ama Google onu 'bulunamadı' sayıyor (soft 404) ve dizine almıyor. Bunu yalnızca Google söyleyebilir; durum kodu sağlıklı göründüğü için tarayıcılar fark etmez. En sık boş sonuç sayfalarında, silinmiş ürünlerde ve 'kayıt bulunamadı' gösteren şablonlarda olur.":
    "La page se charge normalement (200), mais Google la traite comme « introuvable » (soft 404) et ne l'indexe pas. Seul Google peut vous le dire ; les navigateurs ne le remarquent pas, car le code d'état semble sain. Cela arrive surtout sur les pages de résultats vides, les produits supprimés et les modèles qui affichent « aucun enregistrement trouvé ».",
  "Sayfa gerçekten yoksa 404 ya da 410 döndürün. Varsa, içeriğinin gerçek ve dolu olduğundan emin olun; boş liste şablonları en sık nedendir.":
    "Si la page n'existe vraiment pas, renvoyez un 404 ou un 410. Si elle existe, assurez-vous que son contenu est réel et substantiel ; les modèles de liste vides sont la cause la plus fréquente.",
  "Google sayfayı robots.txt yüzünden tarayamıyor":
    "Google ne peut pas explorer la page à cause du fichier robots.txt",
  "Google'ın URL Denetleme Aracı bu adresi robots.txt'nin engellediğini söylüyor. Bizim tarayıcımız sayfaya ulaşabildiği halde Google ulaşamıyorsa, iki tarayıcıya farklı kurallar uygulanıyor demektir.":
    "L'outil d'inspection d'URL de Google indique que robots.txt bloque cette URL. Si notre robot d'exploration peut accéder à la page mais pas Google, les deux robots d'exploration obtiennent des règles différentes.",
  "robots.txt'te bu adresi kapsayan Disallow satırını bulup kaldırın. Googlebot'a özel bir kural (User-agent: Googlebot) olup olmadığına da bakın; çoğu zaman sorun genel kuralda değil, ona özel satırdadır.":
    "Trouvez et supprimez la ligne Disallow du fichier robots.txt qui couvre cette URL. Vérifiez aussi s'il existe une règle propre à Googlebot (User-agent: Googlebot) ; le problème se trouve souvent dans cette ligne précise plutôt que dans la règle générale.",
  "Google sayfada gizleme etiketi (noindex) görüyor":
    "Google voit une balise noindex sur la page",
  "Google bu sayfada noindex (aramada gösterme) yönergesi gördüğünü söylüyor. Bizim tarayıcımız sayfayı dizine alınabilir görüyorsa, iki tarayıcı sayfanın farklı sürümlerini okuyor demektir; örneğin yönerge yalnızca JavaScript çalışınca ekleniyor olabilir.":
    "Google indique qu'il voit une directive noindex (ne pas afficher dans la recherche) sur cette page. Si notre robot considère la page comme indexable, les deux robots lisent des versions différentes de la page ; par exemple, la directive peut être ajoutée uniquement lorsque JavaScript s'exécute.",
  "Sayfanın kaynak kodunu Google'ın gördüğü haliyle karşılaştırın: Search Console'da URL Denetleme > Canlı URL'yi test et > Taranan sayfayı görüntüle > HTML ekranı işlenmiş HTML'i gösterir. Noindex'in nereden geldiğini bulup kaldırın.":
    "Comparez le code source de la page avec ce que voit Google : dans la Search Console, Inspection de l'URL > Tester l'URL en direct > Afficher la page testée > HTML affiche le HTML rendu. Trouvez d'où vient le noindex et supprimez-le.",
  "Google başka bir adresi asıl adres seçti":
    "Google a choisi une autre URL canonique",
  "Sayfa bir asıl adres bildiriyor ama Google başka bir adresi seçti. Asıl adres etiketi bir emir değil, öneridir; Google içerik benzerliğine, iç bağlantılara ve site haritasına bakıp farklı karar verebilir. Sonuçta aramada sizin seçtiğiniz adres çıkmaz.":
    "La page déclare une URL canonique, mais Google en a choisi une autre. Une balise canonique est une suggestion, pas un ordre ; Google peut en décider autrement selon la similarité du contenu, les liens internes et le sitemap. Résultat : l'URL que vous avez choisie n'apparaît pas dans la recherche.",
  "Google'ın seçtiği adrese bakın. Sayfalar gerçekten aynıysa iç bağlantılarınızı ve site haritanızı istediğiniz adrese çevirin. Farklıysa aradaki farkı içerikte belirginleştirin.":
    "Regardez l'URL choisie par Google. Si les pages sont vraiment identiques, faites pointer vos liens internes et votre sitemap vers l'URL souhaitée. Si elles sont différentes, rendez la différence plus nette dans le contenu.",
  "Dil sürümü kodu (hreflang) geçersiz":
    "Le code de version de langue (hreflang) n'est pas valide",
  'Dil sürümü bağlantısındaki (hreflang) kod Google\'ın beklediği biçimde değil. Google dil için ISO 639-1 kodunu (tr, en), istenirse bölge için ISO 3166-1 ülke kodunu bekler ve ikisini tire ile ayırır; zh-Hans gibi yazı sistemi eki de geçerlidir. "UK", "EU" ve "UN" gibi ayrılmış kodlarda Google bölge kısmını yok sayar (en-UK, en gibi okunur); es-419 gibi bölge kodları da desteklenmez. Geçersiz kod, o dil sürümünün yok sayılması demektir.':
    "Le code dans un lien de version de langue (hreflang) n'est pas au format attendu par Google. Google attend un code de langue ISO 639-1 (tr, en), éventuellement suivi d'un code de pays ISO 3166-1 pour la région, séparé par un trait d'union ; un suffixe de script tel que zh-Hans est également valide. Pour les codes réservés tels que « UK », « EU » et « UN », Google ignore la partie région (en-UK est lu comme en) et les codes régionaux tels que es-419 ne sont pas pris en charge. Un code non valide signifie que la version linguistique est ignorée.",
  'Birleşik Krallık için "en-GB" yazın; "en-UK" geçerli bir bölge kodu değil. Latin Amerika İspanyolcası için es-419 yerine "es" yazın. Ayırıcı alt çizgi değil tire olmalı ("en_US" değil "en-US"). "x-default" geçerlidir, olduğu gibi bırakın.':
    "Écrivez « en-GB » pour le Royaume-Uni ; « en-UK » n'est pas un code de région valide. Pour l'espagnol d'Amérique latine, écrivez « es » au lieu de es-419. Le séparateur doit être un trait d'union, pas un trait de soulignement (« en-US », et non « en_US »). « x-default » est valide ; laissez-le tel quel.",
  "Dil sürümleri arasında sayfa kendini listelemiyor (hreflang)":
    "La page ne figure pas parmi ses propres versions linguistiques (hreflang)",
  "Bu sayfa, dil sürümü bağlantılarında (hreflang) diğer dilleri listeliyor ama kendisini listelemiyor. Google'ın belgelerine göre her dil sürümü kendisini de listelemeli; yoksa Google dil sürümlerini birbirine bağlamayabilir.":
    "Cette page répertorie d'autres langues dans ses liens de versions linguistiques (hreflang), mais pas elle-même. Selon la documentation de Google, chaque version linguistique devrait également se répertorier ; sinon, Google risque de ne pas connecter les versions linguistiques.",
  "Sayfanın kendi adresini, kendi dil koduyla dil sürümü listesine ekleyin. Şablonlarda sorun çoğu zaman listenin geçerli sayfayı atlayarak üretilmesinden kaynaklanır.":
    "Ajoutez la propre URL de la page, avec son propre code de langue, à la liste des versions linguistiques. Dans les modèles, le problème vient généralement du fait que la liste est générée sans la page courante.",
  "Sayfa robots yönergesiyle bağlantılarını kapatıyor":
    "La page désactive ses liens avec une directive robots",
  'Sayfada "nofollow" (ya da "none") yönergesi var; yani Google bu sayfadaki bağlantıları izlemez. Google yeni sayfaları çoğunlukla bağlantı izleyerek bulur; sayfa aramada çıkıyor olsa bile ondan çıkan yollar kapalıdır.':
    "La page comporte une directive « nofollow » (ou « none »), donc Google ne suit pas les liens qu'elle contient. Google trouve les nouvelles pages surtout en suivant les liens ; même si cette page apparaît dans la recherche, les chemins qui en partent sont fermés.",
  'Bağlantıların izlenmesini istiyorsanız yönergeden "nofollow" ifadesini kaldırın. Giriş, filtre ya da kullanıcı içeriği sayfalarında bu bilerek yapılmış olabilir; o durumda yapmanız gereken bir şey yok.':
    "Si vous voulez que les liens soient suivis, retirez « nofollow » de la directive. Sur les pages de connexion, de filtrage ou de contenu utilisateur, cela peut être voulu ; dans ce cas, il n'y a rien à faire.",
  "Sayfalanmış sayfa, asıl adres olarak ilk sayfayı gösteriyor":
    "La page paginée désigne la première page comme canonique",
  "Adres bir sayfa numarası taşıyor (2. sayfa gibi) ama asıl adres olarak numarasız ilk sayfayı gösteriyor. Google bunu sayfalama belgelerinde hata sayar: her sayfa kendi adresini asıl adres olarak vermeli. Aksi halde 2. ve sonraki sayfalardaki içerik aramadan düşer.":
    "L'URL comporte un numéro de page (page 2, par exemple) mais désigne la première page non numérotée comme canonique. La documentation de Google sur la pagination qualifie cela d'erreur : chaque page doit indiquer sa propre URL comme canonique. Sinon, le contenu des pages 2 et suivantes disparaît de la recherche.",
  "Her sayfalama adımının asıl adres etiketini o sayfanın kendi adresine çevirin. Tüm içeriği tek sayfada gösteren bir sürümünüz varsa Google onun asıl adres olmasına izin verir.":
    "Modifiez la balise canonique de chaque page paginée pour qu'elle pointe vers sa propre URL. Si vous avez une version qui affiche tout le contenu sur une seule page, Google accepte que celle-ci soit la version canonique.",
  "Dil sürümlerinde varsayılan sürüm (x-default) yok":
    "Les versions linguistiques n'ont pas de version par défaut (x-default)",
  "Sayfa dil sürümlerini bildiriyor (hreflang) ama varsayılan bir sürüm (x-default) belirtmiyor. x-default, listelenen dillerin hiçbirine uymayan ziyaretçiye hangi sürümün gösterileceğini söyler; yoksa Google seçimi kendisi yapar.":
    "La page déclare des versions linguistiques (hreflang) mais pas de version par défaut (x-default). x-default indique à Google quelle version afficher aux visiteurs qui ne correspondent à aucune des langues listées ; sans elle, Google choisit lui-même.",
  'Dil sürümü listesine `<link rel="alternate" hreflang="x-default" href="...">` satırını ekleyin. Genelde dil seçme sayfası ya da ana pazarınızın sürümü gösterilir.':
    'Ajoutez `<link rel="alternate" hreflang="x-default" href="...">` à la liste des versions linguistiques. Il pointe généralement vers une page de sélection de langue ou vers la version correspondant à votre marché principal.',
  "Dil sürümü karşılıklı bağlanmamış (hreflang)":
    "La version linguistique ne renvoie pas vers cette page (hreflang)",
  "Bu sayfa başka bir adresi dil sürümü (hreflang) olarak gösteriyor ama o adres bu sayfayı geri göstermiyor. Dil sürümü bağlantısı iki taraflı çalışır; karşılığı olmayan bildirim yok sayılır, yani iki sayfa da bundan fayda görmez.":
    "Cette page désigne une autre URL comme version linguistique (hreflang), mais cette URL ne désigne pas cette page en retour. Les liens de versions linguistiques fonctionnent dans les deux sens ; une déclaration sans réciproque est ignorée, et aucune des deux pages n'en profite.",
  "Hedef sayfaya bu sayfayı gösteren bir dil sürümü bağlantısı ekleyin. Gruptaki her sayfa, kendisi dahil tüm sayfaları listelemeli.":
    "Ajoutez un lien de version linguistique sur la page cible qui pointe vers cette page. Chaque page du groupe doit répertorier toutes les pages, elle-même incluse.",
  "Dil sürümü açılmayan ya da dizinden çıkarılmış bir sayfayı gösteriyor":
    "La version linguistique pointe vers une page qui ne se charge pas ou n'est pas indexable",
  "Bu sayfa başka bir adresi dil sürümü (hreflang) olarak gösteriyor ama o adres hata veriyor (404, 500 gibi), başka yere yönlendiriyor ya da noindex ile dizinden çıkarılmış. Google böyle bir adresi dil sürümü olarak kullanamaz, bildirim boşa gider.":
    "Cette page désigne une autre URL comme version linguistique (hreflang), mais cette URL renvoie une erreur (404, 500, etc.), redirige ailleurs ou est exclue de l'index par noindex. Google ne peut pas utiliser une telle URL comme version linguistique ; la déclaration est donc inutile.",
  "Ayrıntılardaki adrese bakın. Hata veriyorsa sayfayı düzeltin ya da bu bildirimi kaldırın; yönlendiriyorsa bildirimi son adrese çevirin; noindex ise ya noindex'i kaldırın ya da bildirimi silin.":
    "Regardez l'URL dans les détails. Si elle renvoie une erreur, corrigez la page ou supprimez cette déclaration ; si elle redirige, faites pointer la déclaration vers l'URL finale ; si elle est en noindex, supprimez le noindex ou la déclaration.",
  "Asıl adres (canonical) başka bir alan adını ya da http'yi gösteriyor":
    "L'URL canonique pointe vers un autre domaine ou vers http",
  "Sayfanın asıl adresi (yani Google'a bu içeriğin ana adresi olarak bildirdiğiniz adres) ya güvensiz http:// ile başlıyor ya da başka bir alan adına gidiyor. Bu, sayfanın kendisini dizinde istemediğinizi söyler. Başka sitede yayımlanan içeriği bilerek böyle işaretliyorsanız bu uyarıyı yok sayabilirsiniz.":
    "L'URL canonique de la page (l'URL que vous indiquez à Google comme adresse principale de ce contenu) commence par http:// non sécurisé ou mène à un autre domaine. Vous dites ainsi à Google que vous ne voulez pas que cette page elle-même figure dans l'index. Si vous signalez volontairement de cette manière un contenu publié sur un autre site, vous pouvez ignorer cet avertissement.",
  "Bilerek yapmadıysanız asıl adresi sayfanın kendi https:// adresine çevirin. Şablon ya da SEO eklentisindeki site adresi ayarı genelde yanlış yazılmıştır; oradan bir kez düzeltmek hepsine yeter.":
    "Si ce n'était pas voulu, remplacez l'URL canonique par l'URL https:// de la page elle-même. En général, le paramètre d'URL du site dans le modèle ou le plugin SEO est erroné ; le corriger là une fois corrige toutes les pages.",
  "Yapısal veri bloğu bozuk": "Le bloc de données structurées est cassé",
  "Sayfadaki yapısal veri bloklarından (ld+json) en az biri okunamıyor ya da içinde tür (@type) yok. Bozuk blok Google tarafından yok sayılır, yani o işaretlemeden beklediğiniz ek bilgiler (ürün, makale, kırıntı yolu) aramada çıkmaz.":
    "Au moins un bloc de données structurées (ld+json) de la page ne peut pas être lu ou n'a pas de type (@type). Google ignore un bloc cassé ; les détails supplémentaires attendus de ce balisage (produit, article, fil d'Ariane) n'apparaissent donc pas dans la recherche.",
  'Bloğu bir JSON denetleyicisine yapıştırın; genelde fazladan virgül ya da kapanmamış tırnak çıkar. Sonra bloğa en az bir tür ekleyin, örneğin "@type": "Article". Eklentiyle üretiliyorsa eklentiyi güncelleyin.':
    'Collez le bloc dans un validateur JSON ; il s\'agit généralement d\'une virgule en trop ou d\'un guillemet non fermé. Donnez ensuite au bloc au moins un type, par exemple "@type": "Article". Si un plugin le génère, mettez à jour le plugin.',
  "Bazı sayfalar için Google'ın yanıtı eski":
    "Les réponses de Google pour certaines pages sont obsolètes",
  "Bu sayfalar için saklanan Google yanıtları eskidi. Yanıt, sorulduğu andaki durumu anlatır; sayfa o zamandan beri düzelmiş ya da bozulmuş olabilir. Eski yanıtı güncelmiş gibi göstermemek için bu sayfaların Google yanıtları bu denetimde bulgu sayılmadı.":
    "Les réponses de Google enregistrées pour ces pages sont obsolètes. Une réponse décrit l'état au moment de la demande ; la page a pu être corrigée ou cassée depuis. Pour ne pas présenter une ancienne réponse comme actuelle, les réponses de Google pour ces pages n'ont pas été comptées comme constats dans cet audit.",
  'Dizin durumu sekmesindeki "Google\'da durumunu kontrol et" düğmesine basın; en eski yanıtlı sayfalar yeniden sorulur. Google bir sitede günde en fazla 2.000 adres incelemeye izin verir, bu yüzden her tıklamada 25 sayfa sorulur; birkaç tıkla liste yenilenir.':
    "Cliquez sur le bouton « Vérifier l'état sur Google » dans l'onglet État de l'indexation ; les pages dont les réponses sont les plus anciennes sont revérifiées. Google autorise au maximum 2 000 inspections d'URL par site et par jour ; chaque clic vérifie donc 25 pages, et quelques clics suffisent à actualiser la liste.",
  "Google taradı ama dizine almadı": "Explorée par Google mais non indexée",
  "Google sayfayı çekti ama dizine almadı; yeniden istek göndermeniz gerekmez, sonradan dizine girebilir de girmeyebilir de. Google nedenini söylemez. Sık görülen olasılıklar: sayfanın başka bir sayfayla büyük ölçüde aynı olması, çok az özgün içerik taşıması ya da siteden az bağlantı alması.":
    "Google a récupéré la page mais ne l'a pas indexée ; vous n'avez pas besoin de la renvoyer, et elle sera peut-être indexée plus tard, ou pas. Google n'en donne pas la raison. Possibilités fréquentes : la page ressemble beaucoup à une autre, contient très peu de contenu original ou reçoit peu de liens depuis le site.",
  "Önce URL Denetleme Aracı'nda noindex, engellenen kaynak ya da boş görünen içerik olup olmadığına bakın. Sorun yoksa sayfanın kendine ait bir sorusu ve cevabı olduğundan emin olun. Yakın konulu başka sayfalarla örtüşüyorsa birleştirip tek adrese yönlendirin. Sayfa kalacaksa içeriği derinleştirin ve ilgili sayfalardan buraya bağlantı verin.":
    "Vérifiez d'abord dans l'outil d'inspection d'URL la présence d'un noindex, de ressources bloquées ou d'un contenu qui semble vide. Si rien de cela ne s'applique, assurez-vous que la page répond à une question qui lui est propre. Si elle recoupe d'autres pages sur un sujet proche, fusionnez-les et redirigez vers une seule URL. Si la page reste, approfondissez son contenu et ajoutez des liens vers elle depuis des pages associées.",
  "Google keşfetti ama henüz taramadı":
    "Détectée par Google mais pas encore explorée",
  "Google bu adresi biliyor ama sayfayı henüz çekmedi. Google'ın belgelerine göre bu genelde siteyi aşırı yüklememek için taramanın ertelenmesidir; sayfa hakkında bir kalite kararı değildir. Büyük sitelerde ve az bağlantı alan sayfalarda daha sık görülür.":
    "Google connaît cette URL mais n'a pas encore récupéré la page. Selon la documentation de Google, cela signifie généralement que l'exploration a été reportée pour éviter de surcharger le site ; ce n'est pas un verdict de qualité sur la page. C'est plus courant sur les grands sites et sur les pages contenant peu de liens.",
  "Çoğu durumda beklemek yeterlidir. Sayfa önemliyse sık taranan sayfalardan bağlantı verin, site haritasında olduğundan emin olun ve Search Console'dan dizine ekleme isteyin. Sunucunuz yavaşsa onu da iyileştirin.":
    "Dans la plupart des cas, attendre suffit. Si la page est importante, ajoutez des liens vers elle depuis des pages souvent explorées, vérifiez qu'elle figure dans le sitemap et demandez l'indexation dans la Search Console. Si votre serveur est lent, améliorez-le aussi.",
  "Google yinelenen içerik gördü, asıl adres belirtilmemiş":
    "Google a trouvé du contenu en double sans URL canonique déclarée",
  "Google bu sayfayı başka bir sayfanın kopyası saydı ve hangisinin asıl olduğunu siz söylemediğiniz için kendisi seçti. Seçtiği sayfa sizin istediğiniz olmayabilir; sıralama gücü de seçtiği adreste toplanır.":
    "Google a traité cette page comme une copie d'une autre page et, comme vous n'avez pas dit laquelle est canonique, en a choisi une lui-même. Son choix n'est peut-être pas celui que vous souhaitez, et la force de classement s'accumule sur l'URL qu'il a choisie.",
  "Kopya grubundaki her sayfaya, asıl saydığınız adresi gösteren bir canonical (asıl adres) etiketi ekleyin. Kopyalar gereksizse asıl sayfaya yönlendirin.":
    "Ajoutez une balise canonique à chaque page du groupe en double, pointant vers l'URL que vous considérez comme canonique. Si les copies ne sont pas nécessaires, redirigez-les vers la page canonique.",
  "Google bu adresi hiç bilmiyor": "Google ne connaît pas du tout cette URL",
  "Google bu adresi hiç duymamış: ne keşfetmiş ne taramış. Yani sayfaya giden bir yol yok ve dizine girmeyen sayfa aramada hiç çıkmaz.":
    "Google n'a jamais entendu parler de cette URL : il ne l'a ni détectée ni explorée. Aucun chemin ne mène donc à la page, et une page non indexée n'apparaît jamais dans la recherche.",
  "Adresi site haritasına ekleyin ve site haritasını Search Console'a gönderin. Ayrıca sitenizin taranan sayfalarından bu sayfaya bağlantı verin; Google sayfaları bağlantıları izleyerek bulur.":
    "Ajoutez l'URL à votre sitemap et envoyez le sitemap dans la Search Console. Ajoutez aussi des liens vers cette page depuis des pages explorées de votre site ; Google trouve les pages en suivant les liens.",
  "Google yapısal veride hata buldu":
    "Google a trouvé des erreurs dans les données structurées",
  "Sayfadaki yapısal veri (Google'a sayfanın ürün, makale, tarif gibi ne olduğunu anlatan işaretleme) Google'ın zengin sonuç denetiminden geçemedi. Zengin sonuç, aramada yıldız puanı, fiyat ya da stok durumu gibi ek bilgilerin çıkmasıdır; hatalı işaretleme bunları kapatır. Bu kararı yalnızca Google verebilir; bizim tarayıcımız işaretlemenin var olup olmadığını görür, geçerli olup olmadığını göremez.":
    "Les données structurées de la page (balisage indiquant à Google ce qu'est la page : produit, article, recette, etc.) ont échoué aux vérifications de Google pour les résultats enrichis. Les résultats enrichis sont des éléments supplémentaires dans la recherche, comme les notes, les prix ou la disponibilité ; un balisage cassé les désactive. Seul Google peut en juger ; notre robot d'exploration peut voir si le balisage existe, mais pas s'il est valide.",
  "Adresi Google'ın Zengin Sonuç Testi'nde açın; hangi alanın eksik ya da yanlış türde olduğunu adıyla söyler. Çoğunlukla zorunlu bir alan boştur ya da sayfada görünmeyen bir şey işaretlenmiştir; düzeltin.":
    "Ouvrez l'URL dans le test des résultats enrichis de Google ; il indique le champ manquant ou de type incorrect. En général, un champ obligatoire est vide ou un élément non visible sur la page a été balisé. Corrigez-le.",
  "Sitede sosyal medya paylaşım etiketleri (Open Graph) yok":
    "Le site n'a pas de balises de partage social (Open Graph)",
  "Taranan sayfaların hiçbirinde og:title ya da og:image yok. Bu etiketler Google sıralamasını etkilemez; bağlantınız WhatsApp, LinkedIn, Slack ya da X'te paylaşılınca ne görüneceğini belirler. Yoksa bağlantı çıplak adres olarak görünür ve paylaşımdan gelen tıklama düşer. Bu bulgu sayfa başına değil, site genelinde bir şablon eksiğini gösterir.":
    "Aucune des pages explorées n'a d'og:title ni d'og:image. Ces balises n'affectent pas le classement Google ; elles déterminent ce qui s'affiche lorsque votre lien est partagé sur WhatsApp, LinkedIn, Slack ou X. Sans elles, le lien apparaît comme une simple URL et les clics issus des partages diminuent. Ce constat révèle une lacune du modèle à l'échelle du site, et non page par page.",
  "Şablonun <head> bölümüne og:title, og:description ve tam adresli bir og:image (en az 1200x630 piksel) ekleyin. Tek bir şablon düzeltmesi tüm sayfaları kapatır; SEO eklentileri bunu hazır ayar olarak sunar.":
    "Ajoutez og:title, og:description et une og:image avec une URL complète (au moins 1200 × 630 pixels) dans le <head> du modèle. Une seule correction du modèle couvre toutes les pages ; les plugins SEO proposent ce réglage tout prêt.",
  "Sitede hiç yapısal veri yok": "Le site ne contient aucune donnée structurée",
  "Taranan hiçbir sayfada yapısal veri (Google'a sayfanın ürün, makale, kurum gibi ne olduğunu anlatan işaretleme) yok. Yapısal veri sıralamayı doğrudan etkilemez; bazı türler (ürün, makale, kırıntı yolu, kurum, etkinlik) aramada fiyat, puan ya da yol gibi ek bilgilerle görünmeyi mümkün kılar. Hangi türlerin gösterildiğini Google belirler ve zaman zaman kaldırır; garanti yoktur.":
    "Aucune page explorée ne contient de données structurées (balisage indiquant à Google ce qu'est la page, comme un produit, un article ou une organisation). Les données structurées n'affectent pas directement les classements ; certains types (produit, article, fil d'Ariane, organisation, événement) permettent d'apparaître dans la recherche avec des extras comme des prix, des notes ou un fil d'Ariane. Google décide quels types sont affichés et en supprime de temps en temps ; rien n'est garanti.",
  "Sayfa türüne uyan işaretlemeyle başlayın: yazılar için Article, her yerde BreadcrumbList, ürün sayfası için Product, ana sayfa için Organization. Google'ın desteklediği türleri Search Gallery'den kontrol edin; FAQPage ve HowTo artık arama sonucunda zengin görünüm üretmez. İşaretleme sayfada gerçekten görünen içeriği anlatmalı; görünmeyeni işaretlemek Google kurallarına aykırıdır.":
    "Commencez par un balisage adapté au type de page : Article pour les articles de blog, BreadcrumbList partout, Product pour les pages produits, Organization pour la page d'accueil. Vérifiez les types pris en charge par Google dans la galerie de recherche ; FAQPage et HowTo ne produisent plus de résultats enrichis dans la recherche. Le balisage doit décrire un contenu réellement visible sur la page ; baliser ce qui n'est pas visible est contraire aux consignes de Google.",
  "Sayfa birbiriyle çelişen asıl adresler bildiriyor":
    "La page déclare des URL canoniques contradictoires",
  "Sayfanın head bölümünde farklı adresleri gösteren birden çok canonical (asıl adres) etiketi var. Bu, iki farklı söz demektir, daha güçlü bir söz değil; Google çelişkiyi kendi seçimini yaparak çözer. Genelde şablon bir adres, bir eklenti başka bir adres yazınca olur.":
    "Le <head> de la page contient plusieurs balises canoniques pointant vers des URL différentes. Ce sont deux déclarations différentes, pas une déclaration plus forte ; Google résout le conflit en faisant son propre choix. Cela arrive généralement lorsque le modèle écrit une URL et un plugin une autre.",
  "Sayfa kaynağında asıl adres etiketlerini bulun, hangisinin doğru olduğuna karar verin ve diğerini üreten ayarı ya da eklentiyi kapatın. Aynı adresi iki kez yazan kurulum sorun değildir; bulgu yalnızca adresler farklıyken çıkar.":
    "Trouvez les balises canoniques dans le code source de la page, décidez laquelle est la bonne et désactivez le réglage ou le plugin qui écrit l'autre. Une configuration qui écrit deux fois la même URL convient ; ce constat n'apparaît que lorsque les URL diffèrent.",
  "Google bu sayfayı uzun süredir taramadı":
    "Google n'a pas exploré cette page depuis longtemps",
  "Google bu adresi en son aylar önce ziyaret etmiş. Sayfa dizinde olabilir ama Google'ın gördüğü sürüm o tarihteki sürüm: sonradan yaptığınız değişiklikler aramaya yansımamıştır. Nadiren taranan sayfalar genelde siteden yeterince bağlantı almayan ya da Google'ın önemsiz bulduğu sayfalardır.":
    "Google a visité cette URL pour la dernière fois il y a des mois. La page est peut-être indexée, mais la version dont dispose Google est celle de cette date : les modifications que vous avez apportées depuis ne sont pas reflétées dans la recherche. Les pages rarement explorées sont généralement celles qui reçoivent trop peu de liens du site ou que Google considère comme sans importance.",
  "Sayfaya sık taranan sayfalardan bağlantı verin ve site haritasında olduğundan emin olun. İçerik gerçekten güncellendiyse Search Console'dan dizine ekleme isteyebilirsiniz; ama kalıcı çözüm sayfayı siteye daha iyi bağlamaktır.":
    "Ajoutez des liens vers la page depuis des pages souvent explorées et vérifiez qu'elle figure dans le sitemap. Si le contenu a vraiment été mis à jour, vous pouvez demander l'indexation dans la Search Console ; mais la solution durable est de mieux intégrer la page au maillage du site.",
  "Sayfanın ana içeriği geç yükleniyor (LCP)":
    "Le contenu principal de la page se charge tardivement (LCP)",
  "Sayfanın en büyük öğesi (genelde kapak görseli ya da ana başlık) 4 saniyeden geç göründü. Google bu süreyi 'zayıf' sayar. Google, sıralama sistemlerinde alan verisini (CrUX) kullanır; ama iyi bir değer tek başına sıralama garantisi vermez, içeriğin ilgili olması öncelik taşır. Bu, PageSpeed Insights'ın laboratuvar ölçümüdür; ziyaretçilerinizin gerçek süresi değil, ama onun güvenilir bir göstergesidir.":
    "Le plus grand élément de la page (généralement l'image principale ou le titre principal) est apparu après plus de 4 secondes. Google juge ce temps « médiocre ». Google utilise des données de terrain (CrUX) dans ses systèmes de classement, mais une bonne valeur ne garantit pas à elle seule le classement ; le contenu pertinent passe en premier. Il s'agit d'une mesure de laboratoire de PageSpeed Insights : ce n'est pas le temps réel de vos visiteurs, mais un indicateur fiable de celui-ci.",
  "PageSpeed Insights raporunda en büyük öğenin ne olduğuna bakın. Genelde bir görseldir: görseli küçültüp WebP gibi hafif bir biçime çevirin, ilk ekrandaki görselin geç yüklenmesini kapatın ve sayfayı yavaşlatan betik ve yazı tiplerini erteleyin.":
    "Vérifiez dans le rapport PageSpeed Insights quel est le plus grand élément. C'est généralement une image : réduisez-la et convertissez-la dans un format plus léger comme WebP, désactivez le chargement différé pour l'image du premier écran, et différez les scripts et polices qui ralentissent la page.",
  "Sayfa yüklenirken içerik kayıyor (CLS)":
    "Le contenu se déplace pendant le chargement de la page (CLS)",
  "Sayfa yüklenirken içerik 0,25'ten fazla kaydı; Google bu değeri 'zayıf' sayar. Okurken metin kayınca ziyaretçi yanlış yere tıklar. Bu, laboratuvar ölçümüdür.":
    "Le contenu s'est décalé de plus de 0,25 pendant le chargement de la page ; Google juge cette valeur « médiocre ». Lorsque le texte bouge pendant la lecture, on clique au mauvais endroit. Il s'agit d'une mesure de laboratoire.",
  "Görsellere ve gömülü çerçevelere genişlik ile yükseklik verin, reklam ve afiş alanları için yer ayırın, özel yazı tipi için yerleşimi bozmayan bir yedek yazı tipi tanımlayın.":
    "Attribuez une largeur et une hauteur aux images et aux cadres intégrés, réservez de l'espace pour les emplacements publicitaires et les bannières, et définissez une police de secours pour les polices personnalisées qui ne perturbe pas la mise en page.",
  "Sayfa tıklamalara geç yanıt veriyor (INP)":
    "La page répond lentement aux clics (INP)",
  "Sayfa bir tıklamaya ya da dokunuşa 500 milisaniyeden geç yanıt verdi; Google bu süreyi 'zayıf' sayar. Bu ölçü (INP) 2024'ten beri Core Web Vitals'ın parçasıdır. Laboratuvar testi etkileşimi taklit edemediği için bu değer Chrome kullanıcılarından toplanan gerçek (alan) veridir.":
    "La page a mis plus de 500 millisecondes à répondre à un clic ou à un appui ; Google juge ce temps « médiocre ». Cette métrique (INP) fait partie des Core Web Vitals depuis 2024. Comme un test en laboratoire ne peut pas simuler d'interaction, cette valeur provient de données réelles (de terrain) collectées auprès des utilisateurs de Chrome.",
  "Sayfayı en çok meşgul eden betikleri bulun; genelde üçüncü taraf etiketler (reklam, sohbet, takip kodu) ve büyük betik paketleridir. Gereksizleri kaldırın, kalanları sayfa açıldıktan sonra yükleyin.":
    "Trouvez les scripts qui occupent le plus la page ; il s'agit généralement de balises tierces (publicités, chat, code de suivi) et de gros paquets de scripts. Supprimez ceux qui sont inutiles et chargez le reste après l'ouverture de la page.",
  "Google'ın SEO denetim puanı düşük": "Faible score d'audit SEO de Google",
  "PageSpeed Insights'ın SEO denetimi bu sayfaya 90'ın altında puan verdi. Bu denetim başlık, meta açıklama, bağlantı metinleri, taranabilirlik (robots, HTTP durum kodu), geçerli canonical ve hreflang gibi temel kontrollere bakar. Puanın kendisi sıralamayı etkilemez; hangi kontrollerin başarısız olduğunu gösterir.":
    "L'audit SEO de PageSpeed Insights a attribué à cette page un score inférieur à 90. L'audit porte sur des vérifications de base comme le titre, la méta-description, le texte des liens, l'explorabilité (robots, code d'état HTTP), une URL canonique valide et hreflang. Le score lui-même n'affecte pas le classement ; il montre quelles vérifications ont échoué.",
  "Sayfayı PageSpeed Insights'ta açın ve SEO bölümünde başarısız görünen kontrollere bakın. Her biri neyin eksik olduğunu adıyla söyler; başarısız kontroller düzelince puan yükselir.":
    "Ouvrez la page dans PageSpeed Insights et examinez les vérifications échouées de la section SEO. Chacune indique ce qui manque ; le score augmente une fois ces vérifications corrigées.",
  "AMP sayfası": "Article AMP",
  "AMP haber kutusu": "Top Stories AMP",
  "AMP hikayesi": "Histoire AMP",
  "Gezinme yolu (breadcrumb)": "Fil d'Ariane",
  "Etkinlik ayrıntısı": "Détails de l'événement",
  "Etkinlik listesi": "Liste d'événements",
  "Sık sorulan sorular": "FAQ",
  "Nasıl yapılır": "Comment faire",
  "İş ilanı ayrıntısı": "Détails de l'offre d'emploi",
  "İş ilanı listesi": "Offres d'emploi",
  "Ürün listesi": "Fiches marchands",
  "Ürün özeti": "Extraits de produits",
  "Alıştırma sorusu": "Exercices pratiques",
  "Matematik çözücü": "Résolution de problèmes mathématiques",
  "Tarif kutusu": "Fonctionnalité de recette",
  "Tarif özeti": "Extrait enrichi de recette",
  "Değerlendirme özeti": "Extrait d'avis",
  "Site içi arama kutusu": "Champ de recherche des liens annexes",
  "Soru ve cevap": "Questions et réponses",
  "Video bölümleri": "Chapitres vidéo",
  "Web hikayesi": "Web Story",
  "Ücretsiz alışveriş listesi": "Fiches Shopping",
  "Çevrilmiş sonuç": "Résultat traduit",
  "Diğer görünümler": "Autres types d'apparence",
  "Sayfanın en üstü": "Haut de la page",
  "İlk sayfanın geri kalanı": "Reste de la première page",
  "İkinci sayfa": "Page deux",
  "21 ve sonrası": "21 et au-delà",
  "Pek görülmeyen yerler": "Rarement vu",
  "Hiç tıklanmayan": "Aucun clic",
  "Görünüyor ama açılmıyor": "Vu mais pas ouvert",
  "1-9 tıklama": "1 à 9 clics",
  "10-99 tıklama": "10 à 99 clics",
  "100+ tıklama": "100+ clics",
  "Trafiği taşıyanlar": "Celles qui apportent du trafic",
  "Sıra 5-10": "Positions 5–10",
  "Sıra 11-20": "Positions 11–20",
  "İlk sayfanın alt yarısı": "Moitié inférieure de la première page",
  "Ortalama sırası 5 ile 20 arasında olan sorgular. 5-10 arası ilk sayfanın alt yarısı, 11-20 ikinci sayfa; küçük bir iyileştirme ikisini de üste taşıyabilir. Gösterime göre sıralı.":
    "Requêtes dont la position moyenne est comprise entre 5 et 20. Les positions 5 à 10 forment la moitié inférieure de la première page, 11 à 20 la deuxième page ; une petite amélioration peut faire monter les unes comme les autres. Triées par impressions.",
  "İnsanların sizi hangi aramalarla bulduğu; her sorgunun tıklama, gösterim ve ortalama sırasıyla.":
    "Les recherches avec lesquelles les internautes vous trouvent, chacune avec ses clics, ses impressions et sa position moyenne.",
  "Google'da en çok görünen ve tıklanan sayfalarınız.":
    "Vos pages qui s'affichent et qui obtiennent le plus de clics sur Google.",
  "Aynı arama için birden fazla sayfanızın birbiriyle yarıştığı yerler.":
    "Là où plusieurs de vos pages sont en concurrence pour la même recherche.",
  "Bu gruba uyan sorgu yok": "Aucune requête dans ce groupe",
  "Seçimi kaldırarak sıra 4-20 arasındaki tüm sorgulara dönün.":
    "Effacez la sélection pour revenir à toutes les requêtes en positions 4 à 20.",
  "Bu dönemde 4-20. sırada kelime yok":
    "Aucun mot-clé en positions 4 à 20 sur cette période",
  "Hiçbir kelimeniz 4-20. sırada değil. Bu aralıktaki kelimeler küçük bir iyileştirmeyle üst sıralara çıkabilir; olunca burada listelenir.":
    "Aucun de vos mots-clés n'est en positions 4 à 20. Les mots-clés de cette plage peuvent monter avec une légère amélioration ; lorsqu'il y en a, ils sont listés ici.",
  "Bu seçimde sorgu verisi yok":
    "Aucune donnée de requête pour cette sélection",
  "Seçili ülke ya da cihaz için Search Console sorgu verisi paylaşmadı. Filtreyi kaldırarak tüm trafiğe bakın.":
    "La Search Console n'a partagé aucune donnée de requête pour le pays ou l'appareil sélectionné. Effacez le filtre pour voir tout le trafic.",
  "Kelime düzeyinde veri henüz gelmedi":
    "Pas encore de données au niveau des mots-clés",
  "Search Console, hangi kelimeyle arandığınızı bu dönem için henüz paylaşmadı. Az trafikli sitelerde bu normaldir. Veri gelince 4-20. sıradaki kelimeler burada listelenir.":
    "La Search Console n'a pas encore indiqué quels mots-clés les internautes ont recherchés sur cette période. C'est normal pour les sites à faible trafic. Une fois les données arrivées, les mots-clés en positions 4 à 20 sont listés ici.",
  Mobil: "Mobile",
  "Akıllı TV": "Smart TV",
  "{value} puan": "{value} pts",
  "{start} - {end} dönemine göre": "Par rapport à {start} - {end}",
  "Gösterimlerin yüzde kaçı tıklamaya döndü.":
    "Part des impressions ayant abouti à un clic.",
  "Düşük sayı daha iyi: 1, listenin en üstü demek.":
    "Plus c'est bas, mieux c'est : 1 correspond au haut des résultats.",
  Cihazlar: "Appareils",
  "Tıklamaların hangi cihazlardan geldiği. Bir cihaza tıklayarak tüm sayfayı o cihaza göre daraltabilirsiniz.":
    "De quels appareils proviennent les clics. Cliquez sur un appareil pour limiter toute la page à celui-ci.",
  gösterim: "impressions",
  "Arama görünümü": "Apparence dans les résultats de recherche",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü (tıklama sayısına göre). Google bu dökümü başka bir ölçüyle birleştirmez.":
    "Dans quels formats spéciaux vos résultats sont apparus sur Google (par clics). Google ne combine cette répartition avec aucune autre dimension.",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü (gösterim sayısına göre). Google bu dökümü başka bir ölçüyle birleştirmez.":
    "Dans quels formats spéciaux vos résultats sont apparus sur Google (par impressions). Google ne combine cette répartition avec aucune autre dimension.",
  "Son 28 gün": "28 derniers jours",
  "Son 3 ay": "3 derniers mois",
  Haber: "Actualités",
  "Arama türü": "Type de recherche",
  "Cihaz filtresi": "Filtre par appareil",
  "Tüm cihazlar": "Tous les appareils",
  "Ülke filtresi": "Filtre par pays",
  "Tüm ülkeler": "Tous les pays",
  "Tarih aralığı": "Période",
  "İlk 10'da": "Dans le top 10",
  "Ortalama sırası 10 veya daha iyi olanlar; yani Google'ın ilk sayfası.":
    "Position moyenne de 10 ou mieux, c'est-à-dire la première page de Google.",
  "Gösterilmiş ama bir kez bile tıklanmamış satırlar.":
    "Lignes affichées mais jamais cliquées.",
  "Tıklama oranı düşük": "CTR faible",
  "İlk sayfada olup {impressions} veya daha fazla gösterim alan ve tıklama oranı {ctr} altında kalan satırlar. Başlığı ve açıklamayı iyileştirmeye değer.":
    "Lignes de la première page avec {impressions} ou plus d'impressions et un CTR inférieur à {ctr}. Leur titre et leur description méritent d'être améliorés.",
  Tıklanan: "Cliquées",
  "En az bir tıklama almış satırlar.": "Lignes avec au moins un clic.",
  "İlk sayfanın alt yarısı. Küçük bir iyileştirme ilk üçe taşıyabilir.":
    "La moitié inférieure de la première page. Une petite amélioration peut les hisser parmi les trois premiers.",
  "İkinci sayfa. İlk sayfaya girmek tıklamayı en çok artıran adımdır.":
    "Page deux. Atteindre la première page est l'étape qui génère le plus de clics.",
  Ülkeler: "Pays",
  "{country} filtresini kaldır": "Supprimer le filtre {country}",
  "Tıklamaların hangi ülkelerden geldiği. Halkadan ya da tablodan bir ülkeye tıklayarak tüm sayfayı o ülkeye göre daraltabilirsiniz.":
    "De quels pays proviennent les clics. Cliquez sur un pays dans l'anneau ou dans le tableau pour y limiter la page entière.",
  "Diğer ülkeler": "Autres pays",
  Dağılım: "Répartition",
  Pay: "Part",
  "Ort. sıra": "Pos. moy.",
  "{count} ülke daha": {
    one: "{count} autre pays",
    other: "{count} autres pays",
  },
  "Toplam {total} tıklamanın {share} kadarı {country} kaynaklı.":
    "{share} des {total} clics provenaient de {country}.",
  "Toplam {count} tıklama.": {
    one: "{count} clic au total.",
    other: "{count} clics au total.",
  },
  Sıra: "Position",
  "{value} için işlemler": "Actions pour {value}",
  "Sayfayı yeni sekmede aç": "Ouvrir la page dans un nouvel onglet",
  "Kelime olarak kaydet": "Enregistrer comme mot-clé",
  Sorgu: "Requête",
  "tıklama oranı": "CTR",
  "ortalama sıra": "position moyenne",
  "Günlük {metric}": "{metric} par jour",
  Gün: "Jour",
  "{days} günde toplam {total} {metric}. En yüksek gün {day}, {peak}.":
    "{total} {metric} au total sur {days} jours. Jour le plus élevé : {day}, {peak}.",
  "{days} günde ortalama {average} {metric}. En iyi gün {day}, {peak}.":
    "Sur {days} jours, {metric} a atteint en moyenne {average}. Meilleur jour : {day}, {peak}.",
  "Günlük değişim": "Tendance quotidienne",
  "Yukarıdaki toplamların günlere dağılımı.":
    "Totaux ci-dessus, ventilés par jour.",
  "Grafik ölçüsü": "Métrique du graphique",
  "Bu dönemde hiç gösterim yok, grafik boş. Search Console sayfalarınızı arama sonuçlarında göstermeye başlayınca günlük dağılım burada görünür.":
    "Aucune impression au cours de cette période, le graphique est donc vide. Une fois que la Search Console commence à afficher vos pages dans les résultats de recherche, la répartition quotidienne apparaît ici.",
  "Sorgular kaç sırada?": "Où se situent vos requêtes ?",
  "Bu filtrelerle Search Console sorgu vermedi, bu yüzden dağılım çizilemiyor.":
    "La Search Console n'a renvoyé aucune requête pour ces filtres ; il n'y a donc aucune répartition à afficher.",
  "{total} sorgunun {firstPage} tanesi ilk sayfada (sıra 1-10). Bir çubuğa tıklayarak tabloyu daraltın.":
    "{firstPage} requêtes sur {total} se trouvent en première page (positions 1 à 10). Cliquez sur une barre pour filtrer le tableau.",
  "{total} sorgunun ortalama sıraya göre dağılımı; {firstPage} tanesi ilk sayfada.":
    "{total} requêtes par position moyenne ; {firstPage} d'entre elles se trouvent sur la première page.",
  "Tıklamalar sayfalara nasıl dağılıyor?":
    "Comment les clics sont-ils répartis sur les pages ?",
  "Bu filtrelerle Search Console sayfa vermedi, bu yüzden dağılım çizilemiyor.":
    "La Search Console n'a renvoyé aucune page pour ces filtres ; il n'y a donc aucune répartition à afficher.",
  "{total} sayfanın {clicked} tanesi tıklama aldı.":
    "{clicked} pages sur {total} ont reçu des clics.",
  "En çok tıklanan 5 sayfanın tıklamalardaki payı: {share}.":
    "Les 5 pages les plus cliquées ont obtenu {share} de tous les clics.",
  "{lead} Bir çubuğa tıklayarak tabloyu daraltın.":
    "{lead} Cliquez sur une barre pour filtrer le tableau.",
  "{total} sayfanın aldığı tıklamaya göre dağılımı. {lead}":
    "{total} pages selon les clics obtenus. {lead}",
  "Sıra 5-20 fırsatı": "Opportunités en positions 5 à 20",
  "Sıralaması 5 ile 20 arasında kalan sorgu olmadığı için pay hesaplanamıyor.":
    "Aucune requête n'est classée entre 5 et 20, il n'y a donc aucune part à calculer.",
  "{queries} sorgu toplam {impressions} gösterim alıyor ama ilk üçün dışında kalıyor. Çubuklar gösterim payını gösterir; birine tıklayarak tabloyu daraltın.":
    "{queries} requêtes totalisent {impressions} impressions, mais restent hors du top 3. Les barres indiquent la part des impressions de chaque groupe ; cliquez-en une pour filtrer le tableau.",
  "Sıra 5-20 arasındaki {queries} sorgunun {impressions} gösterimi, sıra 5-10 ve 11-20 olarak bölünmüş.":
    "{impressions} impressions proviennent de {queries} requêtes classées entre les positions 5 et 20, réparties entre les positions 5–10 et 11–20.",
  "Search Console bu dönem için sorgu vermedi, bu yüzden karşılaştırılacak bir şey yok.":
    "La Search Console n'a renvoyé aucune requête pour cette période ; il n'y a donc rien à comparer.",
  "Hiçbir sorguda iki sayfanız birbiriyle yarışmıyor, bu yüzden özetlenecek bir şey yok.":
    "Aucune requête ne met en concurrence deux de vos pages, il n'y a donc rien à résumer.",
  "{count} sorgu incelendi.": {
    one: "{count} requête analysée.",
    other: "{count} requêtes analysées.",
  },
  "{queries} sorguda birden fazla sayfanız yarışıyor; {impressions} gösterim risk altında.":
    "Plusieurs de vos pages se font concurrence sur {queries} requêtes ; {impressions} impressions sont menacées.",
  "En çok kaybettiren sorgu": "Requête qui perd le plus",
  "Listeyi bu sorguya daraltır": "Limite la liste à cette requête",
  "{impressions} gösterim bölünüyor · {pages} sayfa":
    "{impressions} impressions partagées · {pages} pages",
  "Çakışma raporu yüklenemedi":
    "Impossible de charger le rapport de cannibalisation",
  "Çakışma araması yapılamadı": "Impossible de rechercher une cannibalisation",
  "Çakışma bulunamadı": "Aucune cannibalisation trouvée",
  "Search Console bu dönem için sorgu vermedi, karşılaştırılacak bir şey yok. Daha geniş bir tarih aralığı deneyin.":
    "La Search Console n'a renvoyé aucune requête pour cette période ; il n'y a donc rien à comparer. Essayez une période plus longue.",
  "İncelenen {count} sorguda çakışma yok. Ancak Search Console satır sınırına takıldık, yani bakamadığımız sorgular kaldı.":
    {
      one: "Aucune cannibalisation dans la {count} requête analysée. Nous avons toutefois atteint la limite de lignes de la Search Console ; certaines requêtes n'ont donc pas été vérifiées.",
      other:
        "Aucune cannibalisation dans les {count} requêtes analysées. Nous avons toutefois atteint la limite de lignes de la Search Console ; certaines requêtes n'ont donc pas été vérifiées.",
    },
  "İncelenen {count} sorgunun hiçbirinde iki sayfanız birbiriyle yarışmıyor.": {
    one: "Dans la {count} requête analysée, aucune de vos pages ne se fait concurrence.",
    other:
      "Dans aucune des {count} requêtes analysées, deux de vos pages ne se font concurrence.",
  },
  "{queries} sorguda birden fazla sayfanız yarışıyor ve bu yüzden {impressions} Google'ın tercih ettiği sayfa dışında kalıyor. Önce hangi sayfayı hedeflediğinize karar verin ve iç bağlantıları ona yöneltin; sayfalar gerçekten aynı soruyu yanıtlıyorsa birleştirin.":
    "Plusieurs de vos pages se font concurrence sur {queries} requêtes ; {impressions} vont donc à d'autres pages que celle que Google préfère. Décidez d'abord quelle page vous ciblez et faites-y pointer vos liens internes ; si les pages répondent vraiment à la même question, fusionnez-les.",
  "{impressions} gösterim": "{impressions} impressions",
  "{start} – {end} · {queries} sorgu incelendi":
    "{start} – {end} · {queries} requêtes analysées",
  "Search Console tek seferde sınırlı satır döndürür ve bu sınıra takıldık. Listede olmayan çakışmalar olabilir.":
    "La Search Console renvoie un nombre limité de lignes à la fois, et nous avons atteint cette limite. Il peut exister une cannibalisation absente de cette liste.",
  '"{search}" geçen {count} sorgu gösteriliyor.': {
    one: "Affichage de {count} requête contenant « {search} ».",
    other: "Affichage de {count} requêtes contenant « {search} ».",
  },
  "Google'ın tercih ettiği sayfa dışında kalan gösterim payı":
    "Part des impressions allées à d'autres pages que celle que Google préfère",
  "Aynı sorguya yarışan sayfalar": "Pages en concurrence pour la même requête",
  "Google bu sorguda en çok bu sayfayı gösteriyor":
    "Google affiche cette page le plus souvent pour cette requête",
  "Tercih edilen": "Préférée",
  "Dışa aktarılamadı": "Impossible d'exporter",
  "Google Search Console'dan gelen tıklama, gösterim, tıklama oranı ve ortalama sıra.":
    "Clics, impressions, CTR et position moyenne issus de Google Search Console.",
  "Mülkü değiştir": "Modifier la propriété",
  "Arama performansı yüklenemedi":
    "Impossible de charger les performances de recherche",
  "Arama türü: {type}": "Type de recherche : {type}",
  "Sıra 5-20 ({count})": "Positions 5 à 20 ({count})",
  Sorgular: "Requêtes",
  Sayfalar: "Pages",
  "Sayfa çakışmaları": "Cannibalisation",
  "Bu analiz için 7 günlük seçim 28 güne çıkarılır. Gerçek tarih aralığı aşağıda yazar.":
    "Pour cette analyse, une sélection de 7 jours est élargie à 28 jours. La période réelle est indiquée ci-dessous.",
  "Tablo yüklenemedi": "Impossible de charger le tableau",
  "{column} içinde ara": "Rechercher dans {column}",
  "Arama performansı: {column}": "Performances de recherche : {column}",
  "Aramanıza uyan satır yok": "Aucune ligne ne correspond à votre recherche",
  "Bu hızlı filtreye uyan satır yok":
    "Aucune ligne ne correspond à ce filtre rapide",
  "Bu filtrelerle eşleşen satır yok":
    "Aucune ligne ne correspond à ces filtres",
  "Bu dönem için henüz veri yok":
    "Aucune donnée pour cette période pour l'instant",
  '"{search}" hiçbir satırda geçmiyor. Aramayı temizleyin ya da başka bir terim deneyin.':
    "Aucune ligne ne contient « {search} ». Effacez la recherche ou essayez un autre terme.",
  "Hızlı filtreyi kaldırarak tüm satırlara dönün.":
    "Supprimez le filtre rapide pour revenir à toutes les lignes.",
  "Arama türü, cihaz ya da ülke filtresini genişletmeyi deneyin.":
    "Essayez d'élargir le filtre de type de recherche, d'appareil ou de pays.",
  "Search Console verisi birkaç gün gecikmeli gelir. Mülkü yeni bağladıysanız biraz daha beklemeniz gerekebilir.":
    "Les données de la Search Console arrivent avec quelques jours de retard. Si vous venez de connecter la propriété, vous devrez peut-être attendre un peu plus longtemps.",
  "Google tek seferde en fazla bu kadar satır verir ve sınıra ulaşıldı, liste tam değil. Daraltmak için filtreleri kullanın.":
    "Google renvoie au maximum ce nombre de lignes à la fois et la limite a été atteinte ; la liste est donc incomplète. Utilisez les filtres pour la restreindre.",
  "{count} kelime kayıtlı": {
    one: "{count} mot-clé enregistré",
    other: "{count} mots-clés enregistrés",
  },
  "Kelimeler kaydedilemedi": "Impossible d'enregistrer les mots-clés",
  "Kelime kayıtlı": "Mot-clé enregistré",
  "Kelime kaydedilemedi": "Impossible d'enregistrer le mot-clé",
  "Önceki dönemde bu sorgu için veri yok.":
    "Aucune donnée pour cette requête dans la période précédente.",
  "Önceki dönemde veri yok": "Aucune donnée dans la période précédente",
  Değişmedi: "Aucun changement",
  "Yükseldi {value}": "En hausse de {value}",
  "Düştü {value}": "En baisse de {value}",
  "Takip edilen sorgular ortalama sırasına göre gruplanır. Bir çubuğa tıklayınca tablo o gruba daralır.":
    "Les requêtes suivies sont regroupées par position moyenne. Cliquez sur une barre pour limiter le tableau à ce groupe.",
  "{count} sorgunun ortalama sırası. Bir çubuğa tıklayınca tablo o gruba göre daralır.":
    {
      one: "Position moyenne de {count} requête. Cliquez sur une barre pour limiter le tableau à ce groupe.",
      other:
        "Position moyenne de {count} requêtes. Cliquez sur une barre pour limiter le tableau à ce groupe.",
    },
  "Sıra grupları": "Groupes de positions",
  "Sıra {band}: {count} sorgu": {
    one: "Position {band} : {count} requête",
    other: "Position {band} : {count} requêtes",
  },
  "Sırası {band} olan sorguları göster":
    "Afficher les requêtes en positions {band}",
  "Arşiv durumu okunamadı": "Impossible de lire l'état de l'archive",
  "Sıralama arşivi Search Console verisinden doldurulur. Bağladığınızda geçmiş günler kendiliğinden birikmeye başlar.":
    "L'archive de classement est alimentée par les données de la Search Console. Une fois celle-ci connectée, les jours passés s'accumulent d'eux-mêmes.",
  "Arşiv güncellenemedi: {error}":
    "Impossible de mettre à jour l'archive : {error}",
  "{date} tarihine kadar kontrol edildi, kelime verisi bulunamadı.":
    "Vérifié jusqu'au {date} ; aucune donnée de mot-clé trouvée.",
  "Veri yükleme henüz başlamadı.":
    "Le chargement des données n'a pas encore commencé.",
  "Kalan günler sonraki açılışlarda yüklenecek.":
    "Les jours restants seront chargés la prochaine fois que vous ouvrirez cette page.",
  "Arşiv {start} – {end} arasını kapsıyor, {rows} satır.":
    "L'archive couvre {start} – {end}, {rows} lignes.",
  "Arşiv {rows} satır.": "L'archive contient {rows} lignes.",
  "Bu açılışta {count} gün eklendi.": {
    one: "{count} jour ajouté lors de cette visite.",
    other: "{count} jours ajoutés lors de cette visite.",
  },
  "Kalan günler sonraki açılışta tamamlanacak.":
    "Les jours restants seront ajoutés la prochaine fois que vous ouvrirez cette page.",
  "Hangi kelimelerle arandığınız henüz görünmüyor":
    "Les mots-clés avec lesquels les internautes vous recherchent ne sont pas encore visibles",
  "Sitenizin hangi aramalarda kaçıncı sırada çıktığını burada izlersiniz. Search Console kelime bazında veri verdikçe birikir. Az ziyaretçisi olan sitelerde birkaç hafta sürebilir. O zamana kadar toplam tıklama ve gösterime Arama performansı'ndan bakın.":
    "C'est ici que vous suivez la position à laquelle votre site apparaît pour chaque recherche. Elle se remplit à mesure que la Search Console partage des données au niveau des mots-clés, ce qui peut prendre quelques semaines pour les sites à faible trafic. En attendant, consultez le total des clics et des impressions dans Performances de recherche.",
  "Arama performansını aç": "Ouvrir Performances de recherche",
  "Henüz sıralama verisi yok": "Aucune donnée de classement pour l'instant",
  "Search Console'u bağlayınca geçmiş günler kendiliğinden birikir.":
    "Une fois la Search Console connectée, les jours passés s'accumulent d'eux-mêmes.",
  "Yükselenler ve düşenler": "Hausses et baisses",
  "En çok yükselenler": "Plus fortes hausses",
  "Bu dönemde belirgin yükselen sorgu yok.":
    "Aucune requête n'a augmenté de manière notable au cours de cette période.",
  "En çok düşenler": "Plus fortes baisses",
  "Bu dönemde belirgin düşen sorgu yok.":
    "Aucune requête n'a diminué de manière notable au cours de cette période.",
  "Sıra geçmişi: {best} ile {worst} arasında":
    "Historique des positions : entre {best} et {worst}",
  "En iyi {value}": "Meilleure : {value}",
  "En kötü {value}": "Pire : {value}",
  "{date} · Sıra {position} · {clicks} tıklama · {impressions} gösterim":
    "{date} · Position {position} · {clicks} clics · {impressions} impressions",
  "Günlük değeri görmek için grafiğin üzerine gelin ya da grafiğe odaklanıp sol ve sağ ok tuşlarını kullanın.":
    "Survolez le graphique pour voir la valeur d'un jour, ou donnez-lui le focus et utilisez les flèches gauche et droite.",
  "Sorgu geçmişi yüklenemedi":
    "Impossible de charger l'historique de la requête",
  "Bu sorgu için kayıtlı gün yok.": "Aucun jour enregistré pour cette requête.",
  "{start} – {end} · {count} gün kayıtlı": {
    one: "{start} – {end} · {count} jour enregistré",
    other: "{start} – {end} · {count} jours enregistrés",
  },
  "Toplam tıklama / gösterim: {clicks} / {impressions}":
    "Total de clics/impressions : {clicks} / {impressions}",
  "Arama performansında aç": "Ouvrir dans Performances de recherche",
  Değişim: "Variation",
  "Bir önceki, aynı uzunluktaki dönemle karşılaştırılır. Sıra numarası küçüldüyse (12'den 8'e gibi) kelime yükselmiştir ve yeşil “Yükseldi” yazar. Büyüdüyse kırmızı “Düştü” yazar.":
    "Par rapport à la période précédente de même durée. Si le numéro de position a diminué (par exemple de 12 à 8), le mot-clé a progressé et affiche « En hausse » en vert. S'il a augmenté, il affiche « En baisse » en rouge.",
  "Sorgular yüklenemedi": "Impossible de charger les requêtes",
  "Kayıtlı kelimelere ekle": "Ajouter aux mots-clés enregistrés",
  "30 gün": "30 jours",
  "90 gün": "90 jours",
  "6 ay": "6 mois",
  "16 ay": "16 mois",
  "Arşivin tamamı": "Toute l'archive",
  "Aramanıza uyan sorgu yok": "Aucune requête ne correspond à votre recherche",
  "Bu filtreye uyan sorgu yok": "Aucune requête ne correspond à ce filtre",
  "Bu aralıkta kayıtlı sorgu yok":
    "Aucune requête enregistrée sur cette période",
  "Arama kutusunu temizleyin ya da başka bir sorgu deneyin.":
    "Effacez la zone de recherche ou essayez une autre requête.",
  "Sıra dağılımındaki çubuğu ya da hızlı filtreyi kaldırın.":
    "Désélectionnez la barre de répartition des positions ou le filtre rapide.",
  "Daha geniş bir dönem seçmeyi deneyin.":
    "Essayez de choisir une période plus longue.",
  "Sorgularınızın Google'daki ortalama sırası. Arşiv bu bilgisayarda tutulduğu için Google'ın 16 aylık sınırından daha eskiye de bakabilirsiniz.":
    "La position moyenne de vos requêtes sur Google. L'archive est conservée sur cet ordinateur ; vous pouvez donc remonter au-delà de la limite de 16 mois de Google.",
  "Zaman aralığı": "Période",
  "Değişim gösterilemiyor. Arşivde önceki dönem ({start} – {end}) için bu sorgulara ait kayıt yok. Karşılaştırma, iki dönemde de verisi olan sorgular için yapılır. Daha kısa bir aralık seçin ya da arşivin dolmasını bekleyin.":
    "L'évolution ne peut pas être affichée. L'archive ne contient aucun enregistrement pour ces requêtes sur la période précédente ({start} – {end}). La comparaison ne couvre que les requêtes ayant des données sur les deux périodes. Choisissez une période plus courte ou attendez que l'archive se remplisse.",
  "Sorgu içinde ara": "Rechercher dans les requêtes",
  "Değişim filtreleri": "Modifier les filtres",
  Yükselenler: "En hausse",
  "Önceki döneme göre en az yarım sıra yükselen sorgular.":
    "Requêtes qui ont progressé d'au moins une demi-position par rapport à la période précédente.",
  Düşenler: "En baisse",
  "Önceki döneme göre en az yarım sıra düşen sorgular.":
    "Requêtes qui ont reculé d'au moins une demi-position par rapport à la période précédente.",
  "Şu an ilk 10'da": "Maintenant dans le top 10",
  "Şimdi ortalama sırası 10 ya da daha iyi olan sorgular, ilk 10'a yeni girenler dahil. Önceki dönemde de verisi olanlar sayılır. Üstteki çubuk ise şu anki tüm sorguları sayar.":
    "Requêtes dont la position moyenne est maintenant de 10 ou mieux, y compris les nouvelles entrées dans le top 10. Seules les requêtes avec des données dans la période précédente comptent ; la barre ci-dessus compte chaque requête en cours.",
  "İlk 10'dan çıkanlar": "Sorties du top 10",
  "Önceki dönemde ilk 10'da olup şimdi ilk 10'un dışına çıkan sorgular.":
    "Requêtes qui figuraient dans le top 10 au cours de la période précédente et qui en sont désormais exclues.",
  "Gösterimi yüksek": "Impressions élevées",
  "{impressions} veya daha fazla gösterim alan sorgular.":
    "Requêtes avec {impressions} impressions ou plus.",
  "Gösterilmiş ama hiç tıklanmamış sorgular.":
    "Requêtes affichées mais jamais cliquées.",
  "Arşivde daha fazla sorgu var. Bu liste en çok gösterim alan {count} tanesiyle sınırlı. Aralığı daraltarak farklı sorguları görebilirsiniz.":
    "L'archive contient davantage de requêtes. Cette liste est limitée aux {count} ayant le plus d'impressions. Réduisez la période pour afficher d'autres requêtes.",
  "Az tıklanan": "Peu de clics",
  "Sıralaması iyi ama tıklama oranı, sitenizdeki benzer sıralı sayfaların altında. Başlığı ve açıklamayı yeniden yazmaya değer.":
    "Bien classée, mais son CTR est inférieur à celui des pages de votre site classées de façon similaire. Il vaut la peine de réécrire le titre et la description.",
  "Başlığı, kullanıcının aradığı şeyi ilk kelimelerde karşılayacak biçimde yeniden yazın.":
    "Réécrivez le titre pour que ses premiers mots répondent à ce que cherche l'internaute.",
  "Meta açıklamayı, tıklamaya değeceğini gösteren tek bir somut vaatle güncelleyin.":
    "Mettez à jour la méta-description avec une promesse concrète qui montre que le clic en vaut la peine.",
  "Yayına aldıktan iki hafta sonra bu ekrana dönüp tıklama oranına bakın.":
    "Deux semaines après la publication, revenez à cet écran et vérifiez le CTR.",
  "İlk sıralarda": "Tout en haut",
  "Zaten ilk üçte; yükselecek yer az. Tıklama oranı düşükse başlığa ve açıklamaya bakın, değilse içeriği güncel tutmak yeterli.":
    "Déjà dans le top 3, avec peu de marge de progression. Si le CTR est faible, revoyez le titre et la description ; sinon, il suffit de garder le contenu à jour.",
  "İçeriği güncel tutun; tarih, fiyat ve örnekleri yılda en az bir kez gözden geçirin.":
    "Gardez le contenu à jour ; examinez les dates, les prix et les exemples au moins une fois par an.",
  "Bu sayfadan öne çıkarmak istediğiniz diğer sayfalara iç bağlantı verin.":
    "Ajoutez depuis cette page des liens vers les autres pages que vous souhaitez mettre en avant.",
  "Tıklama oranı beklediğinizden düşükse başlığı ve meta açıklamayı yeniden yazın.":
    "Si le CTR est inférieur à vos attentes, réécrivez le titre et la méta-description.",
  "Yükselmeye yakın": "Sur le point de progresser",
  "İlk sayfaya çok yakın ya da hemen üstünde. Küçük bir iyileştirme sıra kazandırabilir.":
    "Très proche de la première page, ou tout juste dessus. Une petite amélioration peut faire gagner des positions.",
  "İçeriği, bu sayfanın öne çıktığı aramalara daha eksiksiz yanıt verecek şekilde güçlendirin.":
    "Renforcez le contenu pour qu'il réponde plus complètement aux recherches pour lesquelles cette page s'affiche.",
  "Sitenizdeki ilgili sayfalardan, doğal bir bağlam içinde bu sayfaya iç bağlantı verin.":
    "Ajoutez des liens vers cette page depuis des pages connexes de votre site, dans un contexte naturel.",
  "Başlıkta ve ilk paragrafta hedef aramayı açıkça geçirin.":
    "Mentionnez clairement la recherche cible dans le titre et le premier paragraphe.",
  "Derinde kalan": "Profondément enfouie",
  "20. sıranın gerisinde ama bu arama için bir talep var. Sayfayı genişletip genişletmeyeceğinize ya da başka bir sayfayla birleştirip birleştirmeyeceğinize karar verin.":
    "Au-delà de la position 20, mais il existe une demande pour cette recherche. Décidez si vous souhaitez développer la page ou la fusionner avec une autre.",
  "Sayfa gerçekten bu konunun cevabı mı? Değilse hangi bölümler eksik, yazın.":
    "La page est-elle vraiment la réponse à ce sujet ? Sinon, écrivez les sections manquantes.",
  "Aynı konuya değinen başka sayfanız varsa birleştirmeyi ve yönlendirme kurmayı düşünün.":
    "Si une autre de vos pages couvre le même sujet, envisagez de les fusionner et de configurer une redirection.",
  "Genişletmeye değmiyorsa sayfayı bırakın; emeği daha yakın fırsatlara harcayın.":
    "Si cela ne vaut pas la peine de la développer, laissez la page telle quelle et consacrez vos efforts à des opportunités plus proches.",
  "Analytics'te karşılığı olanlar": "Trouvée dans Analytics",
  "Analytics'te karşılığı yok": "Introuvable dans Analytics",
  "En çok gösterim alan 10": "Top 10 par impressions",
  "Analytics'te aynı dönemde {sessions} oturum getirmiş.":
    "Dans Analytics, elle a généré {sessions} sessions sur la même période.",
  "Ortalama {position}. sırada {impressions} kez gösterildi ama yalnızca {clicks} tıklama aldı (tıklama oranı {ctr}).":
    "Affichée {impressions} fois à une position moyenne de {position}, mais n'a obtenu que {clicks} clics (CTR {ctr}).",
  "Ortalama {position}. sırada {impressions} kez gösterildi ama yalnızca {clicks} tıklama aldı (tıklama oranı {ctr}, sitenizde bu sıradaki sayfaların ortancasından {gap} yüzde puan daha düşük).":
    "Affichée {impressions} fois à une position moyenne de {position}, mais n'a obtenu que {clicks} clics (CTR {ctr}, {gap} points de pourcentage sous la médiane des pages à cette position sur votre site).",
  "Tıklama oranını ({ctr}) kıyaslayacak kadar veri yok; düşük görünüyorsa başlığı ve açıklamayı gözden geçirin.":
    "Il n'y a pas suffisamment de données pour comparer son CTR ({ctr}) ; s'il semble faible, examinez le titre et la description.",
  "Tıklama oranı sitenizdeki benzer sıradaki sayfalarla uyumlu; içeriği ve başlığı güçlü tutmak yeterli.":
    "Son CTR est conforme à celui des pages classées de manière similaire sur votre site ; il suffit de garder le contenu et le titre forts.",
  "Ortalama {position}. sırada, yani zaten ilk sıralarda. {impressions} gösterimden {clicks} tıklama aldı.":
    "Position moyenne {position} : elle est donc déjà en haut. Elle a obtenu {clicks} clics pour {impressions} impressions.",
  "Ortalama {position}. sırada; ilk sayfaya çok yakın. {impressions} gösterimden {clicks} tıklama aldı, birkaç basamak yükselmek bunu belirgin şekilde artırabilir.":
    "Position moyenne {position}, très proche de la première page. Elle a obtenu {clicks} clics pour {impressions} impressions ; gagner quelques places pourrait augmenter sensiblement ce chiffre.",
  "Ortalama {position}. sırada, yani çoğu kullanıcının görmediği yerde; yine de {impressions} gösterim aldı. Bu sayfaya bir talep var.":
    "Position moyenne {position}, là où la plupart des internautes ne regardent jamais, et pourtant elle a obtenu {impressions} impressions. Il existe une demande pour cette page.",
  Talep: "Demande",
  "İş değeri": "Valeur commerciale",
  "Yükselme kolaylığı": "Facilité de progression",
  "Bu sayfa için arama talebi yüksek.":
    "La demande de recherche pour cette page est élevée.",
  "Arama talebi orta.": "La demande de recherche est modérée.",
  "Arama talebi düşük.": "La demande de recherche est faible.",
  "Sitenize gelen ziyaretçiler bu sayfada değerli işlemler yapıyor.":
    "Les visiteurs de votre site effectuent des actions utiles sur cette page.",
  "İş değeri orta.": "La valeur commerciale est modérée.",
  "Ziyaretçilerin bu sayfada yaptığı işlem az.":
    "Les visiteurs effectuent peu d'actions sur cette page.",
  "İlk sıralara çok yakın; emek çabuk karşılık verir.":
    "Très proche du sommet ; l'effort est vite récompensé.",
  "İlk sıralara makul uzaklıkta.": "Une distance raisonnable du sommet.",
  "İlk sıralardan uzak; sonuç almak zaman alır.":
    "Loin du sommet ; les résultats prendront du temps.",
  "Fırsat türleri": "Types d'opportunités",
  "{kind} · {count} sayfa": {
    one: "{kind} · {count} page",
    other: "{kind} · {count} pages",
  },
  "Şu an bu türde sayfa yok. {hint}":
    "Aucune page de ce type pour le moment. {hint}",
  "Analytics'te trafiği olan sayfa yok; Analytics bağlı değilse önce bağlayın.":
    "Aucune page n'a de trafic dans Analytics ; si Analytics n'est pas connecté, connectez-le d'abord.",
  "Her sayfanın Analytics'te karşılığı var; eşleşmeyen sayfa kalmadı.":
    "Chaque page a une correspondance dans Analytics ; il ne reste aucune page sans correspondance.",
  "Listelenecek sayfa yok.": "Aucune page à lister.",
  "Fırsatların dağılımı": "Répartition des opportunités",
  "Fırsat nerede toplanıyor?": "Où sont concentrées les opportunités ?",
  "Kutular neye göre hesaplansın?": "Que doivent mesurer les vignettes ?",
  "toplam {unit}": "{unit} au total",
  "Toplam {total} {unit} içinde en büyük pay {kind} kümesinde ({share}).":
    "Sur {total} {unit} au total, la part la plus importante se trouve dans le groupe {kind} ({share}).",
  "Analytics oturumu": "Sessions Analytics",
  "Puanın dökümü": "Répartition des scores",
  "Puan nereden geliyor?": "D'où vient le score ?",
  "Puan {score} nereden geliyor?": "D'où vient le score de {score} ?",
  "Ne yapmalı?": "Que faire",
  "Sayfayı aç": "Ouvrir la page",
  "Burası ne işe yarar?": "À quoi sert cette page ?",
  "Google'ın sayfanızı gösterdiği ama az tıklandığı ya da birkaç basamak yükselince çok daha fazla ziyaretçi getirecek sayfaları burada topluyoruz. Bir satıra tıklayınca nedenini ve ne yapmanız gerektiğini görürsünüz.":
    "Cette page rassemble les pages que Google affiche mais sur lesquelles peu de personnes cliquent, et celles qui attireraient beaucoup plus de visiteurs si elles gagnaient quelques places. Cliquez sur une ligne pour voir pourquoi elle est là et quoi faire.",
  "Fırsatlar için Search Console ve Analytics gerekir":
    "Les opportunités nécessitent la Search Console et Analytics",
  "Sıralamalar Search Console'dan, sayfaların kazandırdığı Analytics'ten gelir. İkisini de bağlayınca fırsatlar puanlanır.":
    "Les classements proviennent de la Search Console, et ce que rapportent les pages provient d'Analytics. Une fois les deux connectés, les opportunités reçoivent un score.",
  "Bağlantıları ayarla": "Configurer les connexions",
  "Search Console bu dönem için veri vermedi":
    "La Search Console n'a renvoyé aucune donnée pour cette période",
  "{start} – {end} aralığında hiçbir sayfanız arama sonuçlarında görünmedi. Mülkü yeni bağladıysanız Google'ın veriyi doldurması birkaç gün sürer.":
    "Aucune de vos pages n’est apparue dans les résultats de recherche entre le {start} et le {end}. Si vous venez de connecter la propriété, Google peut mettre quelques jours à afficher les données.",
  "Bu dönemde fırsat çıkmadı": "Aucune opportunité au cours de cette période",
  "{start} – {end} aralığında puanlanacak bir sayfa çıkmadı. Dönemi genişletmeyi deneyin.":
    "Aucune page à évaluer entre le {start} et le {end}. Essayez une période plus longue.",
  "Ayrıntı ve öneriler için bir satıra tıklayın.":
    "Cliquez sur une ligne pour obtenir des détails et des suggestions.",
  "E-Tablolar'a aktar ({rows} satır)":
    "Exporter vers Google Sheets ({rows} lignes)",
  "CSV ({rows} satır)": "CSV ({rows} lignes)",
  "Bu filtreye uyan sayfa yok": "Aucune page ne correspond à ce filtre",
  "Seçtiğiniz tür ya da hızlı filtre bu dönemde hiçbir sayfayla eşleşmedi. Filtreleri kaldırın ya da dönemi genişletin.":
    "Le type ou le filtre rapide choisi ne correspond à aucune page sur cette période. Effacez les filtres ou choisissez une période plus longue.",
  "Filtreleri kaldır": "Effacer les filtres",
  "Google'da kaçıncı sırada çıktığınız; küçük olan iyidir. 1, sonuçların en üstü demek.":
    "Où vous apparaissez sur Google ; plus c'est bas, mieux c'est. 1 correspond au haut des résultats.",
  "Sayfanızın arama sonuçlarında kaç kez göründüğü.":
    "Combien de fois votre page est apparue dans les résultats de recherche.",
  "Aramalardan sayfanıza kaç kez tıklandığı.":
    "Combien de fois les internautes ont cliqué vers votre page depuis la recherche.",
  "Gösterilenlerin yüzde kaçı tıklandı. Altındaki ok, sayfanın sitenizde aynı sıradaki sayfalara göre farkını gösterir.":
    "La part des impressions qui ont généré un clic. La flèche ci-dessous montre comment la page se compare aux pages situées à la même position sur votre site.",
  "Analytics'ten, Search Console ile aynı tarih aralığı için alınır; Analytics ekranındaki aralıktan farklı olabilir.":
    "Depuis Analytics, pour la même période que la Search Console ; elle peut différer de la période affichée sur l'écran Analytics.",
  "Son 90 gün": "90 derniers jours",
  "Google'da görünen sayfalarınız, üzerinde çalışmaya en değer olandan başlayarak.":
    "Vos pages qui s'affichent sur Google, en commençant par celles sur lesquelles il vaut le plus la peine de travailler.",
  "Fırsatlar yüklenemedi": "Impossible de charger les opportunités",
  Dönem: "Période",
  "Search Console tek seferde sınırlı sayıda satır verir ve bu sınıra ulaşıldı; gerçekte daha fazla aday sayfa olabilir.":
    "La Search Console renvoie un nombre limité de lignes à la fois et cette limite a été atteinte ; il peut y avoir davantage de pages candidates.",
  "Search Console ve Analytics farklı saat dilimlerinde raporluyor; günlük eşleşmeler bir gün kayabilir.":
    "Search Console et Analytics utilisent des fuseaux horaires différents ; les correspondances quotidiennes peuvent donc être décalées d'un jour.",
  Listelenen: "Listées",
  "Filtreye uyan · {rows} satır içinde":
    "Correspondant au filtre · sur {rows} lignes",
  "{candidates} aday sayfanın en iyileri":
    "Les meilleures des {candidates} pages candidates",
  "Tüm aday sayfalar ({candidates})":
    "Toutes les pages candidates ({candidates})",
  "{analytics}'te karşılığı var": "Trouvées dans {analytics}",
  "{candidates} aday içinde": "Sur {candidates} candidates",
  "{analytics}'te karşılığı yok": "Introuvables dans {analytics}",
  "Listedeki her sayfanın Analytics karşılığı var":
    "Chaque page répertoriée a une correspondance dans Analytics",
  "Listelenen {rows} sayfanın {count} tanesi · listele":
    "{count} des {rows} pages listées · les afficher",
  "En yüksek puan": "Meilleur score",
  "{page} · ayrıntı": "{page} · détails",
  "Puan nasıl hesaplanır?": "Comment le score est-il calculé ?",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri dönüşüm tanımlı olmadığı için etkileşim oranına göre hesaplanır.":
    "Demande (50 %) + valeur commerciale (30 %) + facilité de progression (20 %). La valeur commerciale repose sur le taux d'engagement, car aucun événement clé n'est configuré.",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri etkileşim oranına göre hesaplanır.":
    "Demande (50 %) + valeur commerciale (30 %) + facilité de progression (20 %). La valeur commerciale repose sur le taux d'engagement.",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri dönüşümlere göre hesaplanır.":
    "Demande (50 %) + valeur commerciale (30 %) + facilité de progression (20 %). La valeur commerciale repose sur les événements clés.",
  "Analytics'te karşılığı yok ne demek?":
    "Que signifie « introuvable dans Analytics » ?",
  "Analytics o sayfaya hiç ziyaret görmemiş ya da adresi farklı yazılmış olabilir. Bu sayfalar da puanlanır. İş değerinde haksız yere sıfır almasınlar diye ortada bir değer verilir.":
    "Analytics n'a peut-être enregistré aucune visite sur cette page, ou a noté son adresse différemment. Ces pages reçoivent aussi un score ; elles obtiennent une valeur commerciale moyenne afin de ne pas tomber injustement à zéro.",
  "Bu seçenek yalnızca Windows paketinde kullanılabilir.":
    "Cette option est uniquement disponible dans l'application Windows.",
  "Windows ayarı kaydedilemedi. Tepsi uygulamasının açık olduğunu ve ayarın yönetici tarafından kilitlenmediğini kontrol edip tekrar deneyin.":
    "La préférence Windows n'a pas pu être enregistrée. Vérifiez que l'application de la zone de notification est en cours d'exécution et que la préférence n'est pas verrouillée par un administrateur, puis réessayez.",
  "Giriş yok: uygulama yalnızca bu bilgisayarda kullanılır. İnternete açacaksanız önüne kendi girişinizi koyun.":
    "Aucune connexion : l'application est conçue pour être utilisée uniquement sur cet ordinateur. Si vous l'exposez à Internet, placez votre propre système de connexion devant.",
  "Cloudflare Access belirteci reddedildi: hedef kitle uyuşmuyor. POLICY_AUD, Access uygulamanızın AUD etiketiyle aynı değil — Zero Trust -> Access controls -> Applications -> Configure -> Additional settings yolundan kopyalayın.":
    "Jeton Cloudflare Access rejeté : audience non concordante. POLICY_AUD ne correspond pas à la balise AUD de votre application Access ; copiez-la depuis Zero Trust -> Access controls -> Applications -> Configure -> Additional settings.",
  "Cloudflare Access belirteci reddedildi: veren taraf uyuşmuyor. TEAM_DOMAIN, belirteci veren Cloudflare ekibiyle aynı değil — Zero Trust ayarlarındaki ekip alan adınızla karşılaştırın.":
    "Jeton Cloudflare Access rejeté : émetteur non concordant. TEAM_DOMAIN ne correspond pas à l'équipe Cloudflare qui a émis le jeton ; comparez-le avec le domaine d'équipe dans vos paramètres Zero Trust.",
  "Cloudflare Access belirteci TEAM_DOMAIN'in imza anahtarlarıyla doğrulanamadı. TEAM_DOMAIN'in ekibinizin https://<team>.cloudflareaccess.com adresi olduğundan emin olun.":
    "Le jeton Cloudflare Access n'a pas pu être vérifié avec les clés de signature de TEAM_DOMAIN. Assurez-vous que TEAM_DOMAIN est l'adresse https://<team>.cloudflareaccess.com de votre équipe.",
  "Bu projede böyle bir denetim bulunamadı.":
    "Ce projet ne contient pas cet audit.",
  "Denetim ayarları geçersiz.": "Les paramètres d'audit ne sont pas valides.",
  "Çalışan denetimin durumu doğrulanamadı; silme iptal edildi. Lütfen tekrar deneyin.":
    "Impossible de confirmer l'état de l'audit en cours, il n'a donc pas été supprimé. Veuillez réessayer.",
  "Çalışan denetim durdurulamadı.": "Impossible d'arrêter l'audit en cours.",
  "Bu denetim şu an silinemiyor. Bitmesini bekleyip yeniden deneyin.":
    "Cet audit ne peut pas être supprimé pour le moment. Attendez qu'il se termine et réessayez.",
  "Denetimin Lighthouse çıktıları silinemedi; denetim silinmedi. Lütfen tekrar deneyin.":
    "Impossible de supprimer les résultats Lighthouse de l'audit, l'audit n'a donc pas été supprimé. Veuillez réessayer.",
  "Google Analytics bu hizmet hesabına izin vermedi. İki şey gerekiyor: Google Cloud projenizde Google Analytics Admin API etkin olmalı, ve GA4 mülkünüzde Yönetici → Erişim yönetimi altında {email} adresi Görüntüleyici olarak ekli olmalı.":
    "Google Analytics a refusé l'accès à ce compte de service. Deux conditions sont nécessaires : l'API Google Analytics Admin doit être activée dans votre projet Google Cloud, et {email} doit être ajouté avec le rôle Lecteur sous Administration → Gestion des accès dans votre propriété GA4.",
  "Google Analytics bu hizmet hesabına izin vermedi. Google Analytics Admin API'yi etkinleştirin ve hesabın adresini GA4 mülkünüze Görüntüleyici olarak ekleyin.":
    "Google Analytics a refusé l'accès à ce compte de service. Activez l'API Google Analytics Admin et ajoutez l'adresse du compte à votre propriété GA4 avec le rôle Lecteur.",
  "Bu Google hesabı seowatcher hesabınıza bağlı değil.":
    "Ce compte Google n'est pas connecté à votre compte seowatcher.",
  "Bu Google Analytics mülkü bağlı Google hesabınızda bulunmuyor.":
    "Cette propriété Google Analytics ne figure pas dans votre compte Google connecté.",
  "Google kimlik bilgisini döndürmedi. Bağlantıyı yeniden deneyin.":
    "Google n'a pas renvoyé de jeton d'identité. Essayez de vous connecter à nouveau.",
  "Google, {name} yetkilendirme kodunu reddetti. Bağlantıyı yeniden deneyin.":
    "Google a rejeté le code d'autorisation {name}. Essayez de vous connecter à nouveau.",
  "{name} yapılandırılmamış. GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET ve BETTER_AUTH_SECRET değerlerini ayarlayın.":
    "{name} n'est pas configuré. Définissez GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET et BETTER_AUTH_SECRET.",
  "{name} bağlantı isteği geçersiz. Bağlantıyı yeniden başlatın.":
    "La demande de connexion {name} n'est pas valide. Recommencez la connexion.",
  "{name} bağlantı isteğinin süresi doldu. Bağlantıyı yeniden başlatın.":
    "La demande de connexion {name} a expiré. Recommencez la connexion.",
  "Search Console bağlantısının yenilenmesi gerekiyor.":
    "La connexion à la Search Console doit être renouvelée.",
  "Search Console isteği başarısız oldu.":
    "La requête de la Search Console a échoué.",
  "Bu Search Console mülkü bağlı Google hesabınızda bulunmuyor.":
    "Cette propriété de la Search Console ne figure pas dans votre compte Google connecté.",
  "Bu Search Console mülkü için doğrulanmış erişiminiz yok.":
    "Vous n'avez pas d'accès validé à cette propriété Search Console.",
  "En fazla {count} etikete göre filtreleyebilirsiniz.": {
    one: "Vous pouvez filtrer par {count} étiquette au maximum.",
    other: "Vous pouvez filtrer par {count} étiquettes au maximum.",
  },
  "Bu adda bir etiket zaten var. Farklı bir ad seçin.":
    "Une étiquette portant ce nom existe déjà. Choisissez un autre nom.",
  "Etiket {count} kelimeye bağlı. Önce bu kelimelerden kaldırıp tekrar deneyin.":
    {
      one: "Cette étiquette est appliquée à {count} mot-clé. Retirez-la d'abord de ce mot-clé, puis réessayez.",
      other:
        "Cette étiquette est appliquée à {count} mots-clés. Retirez-la d'abord de ces mots-clés, puis réessayez.",
    },
  "Anahtar çalışıyor: Google PageSpeed Insights ölçümü kabul etti.":
    "La clé fonctionne : Google PageSpeed Insights a accepté la mesure.",
  "Kayıtlı bir anahtar yok; test edilecek bir şey yok. Önce anahtarı kaydedin.":
    "Aucune clé n'est enregistrée, il n'y a donc rien à tester. Enregistrez d'abord la clé.",
  "Google anahtarı geçersiz buldu. Anahtarı Google Cloud Console'dan yeniden kopyalayıp kaydedin.":
    "Google a jugé la clé non valide. Copiez-la à nouveau depuis la Google Cloud Console et enregistrez-la.",
  "Anahtar tanınıyor ama PageSpeed Insights için kullanılamıyor: API etkin değil ya da anahtarın kısıtlamaları buna izin vermiyor. Google Cloud Console'da API'yi etkinleştirin ve anahtar kısıtlamasını kontrol edin.":
    "La clé est reconnue mais ne peut pas être utilisée pour PageSpeed Insights : l'API n'est pas activée, ou les restrictions de la clé ne le permettent pas. Activez l'API dans la Google Cloud Console et vérifiez les restrictions de la clé.",
  "Anahtar geçerli ama Google'ın günlük kotası dolmuş. Yarın yeniden deneyin ya da Google Cloud Console'dan kotayı kontrol edin.":
    "La clé est valide, mais le quota quotidien de Google est épuisé. Réessayez demain ou vérifiez le quota dans la Google Cloud Console.",
  "Anahtar geçerli ama Google dakikalık sınıra takıldı. Bir dakika bekleyip yeniden deneyin.":
    "La clé est valide, mais Google a atteint sa limite par minute. Attendez une minute et réessayez.",
  "Google'a ulaşılamadı. İnternet bağlantısını kontrol edip yeniden deneyin; anahtar hakkında bir sonuç alınamadı.":
    "Impossible de joindre Google, il n'y a donc aucun résultat pour la clé. Vérifiez votre connexion Internet et réessayez.",
  "Google beklenmeyen bir yanıt verdi; anahtar hakkında bir sonuç alınamadı. Birazdan yeniden deneyin.":
    "Google a envoyé une réponse inattendue, il n'y a donc aucun résultat pour la clé. Réessayez dans quelques instants.",
  'Alan adı olmayan "Default" adında bir proje zaten var. Farklı bir ad seçin ya da bir alan adı ekleyin.':
    "Un projet nommé « Default » sans domaine existe déjà. Choisissez un autre nom ou ajoutez un domaine.",
  "Geçerli bir alan adı girin, örneğin acme.com.":
    "Saisissez un domaine valide, par exemple acme.com.",
  'Alan adı olmayan, "Default" adında etkin bir proje zaten var. Önce onu yeniden adlandırın, sonra bunu geri yükleyin.':
    "Un projet actif nommé « Default » sans domaine existe déjà. Renommez-le d'abord, puis restaurez celui-ci.",
  "Geçerli bir alan adı girin.": "Saisissez un domaine valide.",
  "Adresin nereye çözümlendiği doğrulanamadı, bu yüzden tarama başlatılmadı. Uygulamanın cloudflare-dns.com adresine erişebildiğinden emin olun.":
    "Impossible de confirmer vers où cette adresse est résolue ; l'exploration n'a donc pas démarré. Assurez-vous que l'application peut joindre cloudflare-dns.com.",
  "Adres herkese açık DNS'te çözümlenmiyor, bu yüzden tarama başlatılmadı.":
    "Cette adresse n'est pas résolue dans le DNS public, l'exploration n'a donc pas démarré.",
  "Kullanıcı adı veya parola içeren adresler taranamaz.":
    "Les adresses contenant un nom d'utilisateur ou un mot de passe ne peuvent pas être explorées.",
  "Google beklenmedik bir yanıt verdi.":
    "Google a envoyé une réponse inattendue.",
  "Google'ın istek sınırı doldu.":
    "La limite de requêtes de Google a été atteinte.",
  'Anahtarın API kısıtlaması "Chrome UX Report API"yi dışarıda bırakıyor. Google Cloud Console\'da anahtarın kısıtlamasına ekleyip tekrar deneyin.':
    "Les restrictions d'API de la clé excluent « Chrome UX Report API ». Ajoutez-la aux restrictions de la clé dans la Google Cloud Console et réessayez.",
  'Anahtarın Google Cloud projesinde "Chrome UX Report API" etkin değil. Google Cloud Console\'da API bölümünden etkinleştirip tekrar deneyin.':
    "« Chrome UX Report API » n'est pas activée dans le projet Google Cloud de la clé. Activez-la sous API dans la Google Cloud Console et réessayez.",
  'Google bu anahtara izin vermedi{reason}. Anahtarın Google Cloud projesinde "Chrome UX Report API" etkin olmalı ve anahtarın kısıtlamasında yer almalı.':
    "Google a refusé cette clé{reason}. « Chrome UX Report API » doit être activée dans le projet Google Cloud de la clé et incluse dans les restrictions de la clé.",
  "Google yanıt vermedi (HTTP {status}). Birazdan tekrar deneyin.":
    "Google n'a pas répondu (HTTP {status}). Réessayez dans quelques instants.",
  "Hizmet hesabı Google Analytics için erişim anahtarı alamadı.":
    "Le compte de service n'a pas pu obtenir de jeton d'accès pour Google Analytics.",
  "Google Analytics erişim anahtarı alınamadı (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Impossible d'obtenir un jeton d'accès Google Analytics (l'accès a peut-être été révoqué ou a expiré).",
  "Google Analytics erişim anahtarı döndürmedi (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Google Analytics n'a pas renvoyé de jeton d'accès (l'accès a peut-être été révoqué ou a expiré).",
  'Bu bir hizmet hesabı anahtarı değil. Dosyada "type": "service_account" yazmalı.':
    'Ce n\'est pas une clé de compte de service. Le fichier doit contenir "type": "service_account".',
  "client_email bir e-posta adresi olmalı.":
    "client_email doit être une adresse e-mail.",
  "private_key alanı eksik ya da bozuk.":
    "Le champ private_key est manquant ou endommagé.",
  "Geçerli bir JSON değil. Google'dan indirdiğiniz dosyanın tamamını yapıştırın.":
    "Ce n'est pas un JSON valide. Collez l'intégralité du fichier que vous avez téléchargé depuis Google.",
  "Anahtar dosyası okunamadı.": "Impossible de lire le fichier de clé.",
  "Hizmet hesabı tanımlı değil ya da saklanan anahtar okunamıyor.":
    "Aucun compte de service n'est configuré ou la clé stockée ne peut pas être lue.",
  "Hizmet hesabı için izin verilmeyen kapsam: {scope}":
    "Portée non autorisée pour le compte de service : {scope}",
  "Hizmet hesabı anahtarı imzalanamadı; dosya bozuk olabilir.":
    "Impossible de signer avec la clé du compte de service ; le fichier est peut-être endommagé.",
  "Google hizmet hesabı için erişim anahtarı vermedi ({status}). {detail}":
    "Google n’a pas fourni de jeton d’accès au compte de service ({status}). {detail}",
  "Google beklenmeyen bir erişim anahtarı yanıtı döndürdü.":
    "Google a renvoyé une réponse de jeton d'accès inattendue.",
  "Hizmet hesabı Search Console'a bağlanamadı. Anahtar dosyasını yeniden yükleyin.":
    "Le compte de service n'a pas pu se connecter à la Search Console. Importez à nouveau le fichier de clé.",
  "Search Console erişim anahtarı alınamadı (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Impossible d'obtenir un jeton d'accès à la Search Console (l'accès a peut-être été révoqué ou expiré).",
  "Search Console erişim anahtarı döndürmedi (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "La Search Console n'a pas renvoyé de jeton d'accès (l'accès a peut-être été révoqué ou expiré).",
  "PageSpeed anahtarı Ayarlar'da kayıtlı.":
    "La clé PageSpeed est enregistrée dans les Paramètres.",
  "Denetim hâlâ çalışıyor. Rapor, denetim bitince oluşturulabilir.":
    "L'audit est toujours en cours. Le rapport pourra être créé une fois l'audit terminé.",
  "Bu denetim raporu, sorun listeleri en aza indirilse bile saklama sınırını aşıyor. Raporu oluşturmak için denetimi daha az sayfa veya daha kısa adreslerle yeniden çalıştırın.":
    "Ce rapport d'audit dépasse la limite de stockage même avec des listes de problèmes réduites au minimum. Pour le créer, relancez l'audit avec moins de pages ou des adresses plus courtes.",
  "URL Denetimi (Search Console)": "Inspection de l'URL (Search Console)",
  "Mülk başına günlük {count} sorgu; son 24 saatte bu uygulamanın kaydettiği sorgular sayılır. Google'ın sıfırlanma saati doğrulanmadı.":
    "{count} requêtes par propriété et par jour ; compte les requêtes enregistrées par cette application au cours des dernières 24 heures. L'heure de réinitialisation chez Google n'est pas confirmée.",
  "Uygulamanın kendi kaydı": "Journal propre à l'application",
  "Anahtar tanımlı.": "Une clé est définie.",
  "PageSpeed anahtarı yok: denetimde en fazla {count} sayfanın hızı ölçülür. Anahtarı Ayarlar > Hız ölçümü bölümünden girebilirsiniz.":
    {
      one: "Aucune clé PageSpeed : un audit mesure la vitesse d'au plus {count} page. Vous pouvez saisir une clé sous Paramètres > Tests de vitesse.",
      other:
        "Aucune clé PageSpeed : un audit mesure la vitesse d'au plus {count} pages. Vous pouvez saisir une clé sous Paramètres > Tests de vitesse.",
    },
  "{count} ölçüm günlük sınır nedeniyle yapılamadı": {
    one: "{count} mesure a été ignorée en raison de la limite quotidienne",
    other:
      "{count} mesures ont été ignorées en raison de la limite quotidienne",
  },
  "{count} ölçüm dakikalık sınıra takıldı": {
    one: "{count} mesure a atteint la limite par minute",
    other: "{count} mesures ont atteint la limite par minute",
  },
  "Son 24 saatte başlayan denetimlerde {events}.":
    "Dans les audits lancés au cours des dernières 24 heures : {events}.",
  "Son 24 saatte başlayan denetimlerde sınır olayı yok.":
    "Aucune limite n'a été atteinte dans les audits commencés au cours des dernières 24 heures.",
  "{key} Sayılar, son 24 saatte başlayan denetimlere aittir (tek tek ölçüm saati kaydedilmez). {lastEvent} Google'ın günlük toplamı doğrulanmadı; gerçek kota Google Cloud Console > PageSpeed Insights API > Quotas bölümünde.":
    "{key} Ces chiffres concernent les audits démarrés au cours des dernières 24 heures (l’heure de chaque mesure n’est pas enregistrée). {lastEvent} Le total quotidien de Google n’est pas vérifié ; consultez le quota réel dans Google Cloud Console > PageSpeed Insights API > Quotas.",
  "Google yanıtındaki son kota bilgisi":
    "Dernières informations sur le quota dans la réponse de Google",
  "Uygulama yeniden başladığından ya da GA4 bağlantısı değiştiğinden beri bu bağlantıyla GA4 raporu çalışmadı; sayaç bir rapor çalışınca dolar.":
    "Aucun rapport GA4 n'a été exécuté sur cette connexion depuis le redémarrage de l'application ou la modification de la connexion GA4 ; le compteur se remplit une fois le rapport exécuté.",
  "Son istek: {count} puan.": {
    one: "Dernière requête : {count} point.",
    other: "Dernière requête : {count} points.",
  },
  "günlük {count}": "{count} par jour",
  "saatlik {count}": "{count} par heure",
  "Kalan değer standart mülk sınırını ({limit}) aşıyor; mülk büyük olasılıkla Analytics 360, sınır 10 kat. Gerçek sınır Google'dan gelmez, bu yüzden çubuk gösterilmez. {lastCost}":
    "Ce qui reste dépasse la limite d'une propriété standard ({limit}) ; il s'agit donc très probablement d'une propriété Analytics 360, dont la limite est 10 fois supérieure. Google n'indique pas la limite réelle, aucune barre n'est donc affichée. {lastCost}",
  "Google yalnızca kalanı bildirir. Sınır varsayımdır: standart mülk için {limit}; 360 mülklerde 10 kat. Kullanılan = varsayılan sınır − kalan. {lastCost} Sıfırlanma saati doğrulanmadı.":
    "Google n'indique que ce qui reste. La limite est une hypothèse : {limit} pour une propriété standard, 10 fois plus pour les propriétés 360. Utilisé = limite supposée − restant. {lastCost} L'heure de réinitialisation n'est pas confirmée.",
  "Analytics (GA4) günlük kota puanı":
    "Points de quota quotidiens Analytics (GA4)",
  "Analytics (GA4) saatlik kota puanı":
    "Points de quota horaire Analytics (GA4)",
  "Denetim sayfa sınırı": "Limite de pages d'audit",

  "Uygulamanın veritabanı": "La base de données de l'application",
  "Proje başına rapor": "Rapports par projet",
  "Takılan bir döngüye karşı koruma; gerçek bir iş akışı buna yaklaşmaz.":
    "Une protection contre une boucle incontrôlée ; un vrai flux de travail n'en approche jamais.",
  "Proje başına rapor şablonu": "Modèles de rapport par projet",
  "Doluysa yeni şablon için birini silmek gerekir.":
    "Lorsque la limite est atteinte, supprimez-en un pour ajouter un nouveau modèle.",
  "En büyük raporun boyutu": "Taille du plus grand rapport",
  "Tek bir rapor bu boyutu aşarsa kaydedilmez; genelde gömülü görseller yüzünden olur.":
    "Un rapport individuel dépassant cette taille n'est pas enregistré ; les images intégrées en sont la cause habituelle.",
  "Denetim tamamlanmadığı için puan hesaplanmadı.":
    "L'audit ne s'est pas terminé, aucun score n'a donc été calculé.",
  "Taranan sayfa olmadığı için puan hesaplanamadı.":
    "Aucune page n'a été explorée, donc aucun score n'a pu être calculé.",
  "Kayıtlı hiçbir sorun yok. Site temiz görünüyor.":
    "Aucun problème enregistré. Le site semble propre.",
  "Site sağlıklı. Kalan birkaç düzeltme puanı yukarı çeker.":
    "Le site est en bonne santé. Quelques dernières corrections feront monter le score.",
  "Temel sağlam, ama düzeltilmesi gereken belirgin sorunlar var.":
    "La base est solide, mais il y a des problèmes évidents à résoudre.",
  "Orta düzeyde. Kritik ve uyarı sorunları aramadaki performansı gölgeliyor.":
    "Passable. Des problèmes critiques et des avertissements freinent les performances de recherche.",
  "Zayıf. Önce kritik sorunlar düzeltilmeli; bunlar sayfaların aramada görünmesini engelleyebilir.":
    "Faible. Corrigez d'abord les problèmes critiques ; ils peuvent empêcher les pages d'apparaître dans la recherche.",
  'Denetim tamamlanmadığı ya da hiç sayfa taranamadığı için sorun listesi eksik olabilir; bu yüzden "sorun yok" denmiyor.':
    "L'audit ne s'est pas terminé ou aucune page n'a pu être explorée ; la liste des problèmes peut donc être incomplète. C'est pourquoi il n'est pas indiqué « aucun problème ».",
  "Yanıt yok": "Aucune réponse",
  İçerik: "Contenu",
  "Dizine alma": "Indexation",
  "ve {count} adres daha (boyutu makul tutmak için burada kesildi).": {
    one: "et {count} autre adresse (liste coupée ici pour garder une taille de fichier raisonnable).",
    other:
      "et {count} autres adresses (liste coupée ici pour garder une taille de fichier raisonnable).",
  },
  "ve {count} sayfa daha (boyutu makul tutmak için burada kesildi).": {
    one: "et {count} autre page (liste coupée ici pour garder une taille de fichier raisonnable).",
    other:
      "et {count} autres pages (liste coupée ici pour garder une taille de fichier raisonnable).",
  },
  "ve {count} kayıt daha (boyutu makul tutmak için burada kesildi).": {
    one: "et {count} autre enregistrement (liste coupée ici pour garder une taille de fichier raisonnable).",
    other:
      "et {count} autres enregistrements (liste coupée ici pour garder une taille de fichier raisonnable).",
  },
  "ve {count} sorun türü daha (boyutu makul tutmak için burada kesildi).": {
    one: "et {count} autre type de problème (liste coupée ici pour garder une taille de fichier raisonnable).",
    other:
      "et {count} autres types de problèmes (liste coupée ici pour garder une taille de fichier raisonnable).",
  },
  "Puan yok": "Aucun score",
  "Site puanı 100 üzerinden {score}": "Score du site : {score} sur 100",
  "{host} site denetimi": "Audit du site {host}",
  "{host} için {count} sayfa tarandı.": {
    one: "{count} page explorée sur {host}.",
    other: "{count} pages explorées sur {host}.",
  },
  "Site puanı {count}/100.": "Score du site {count}/100.",
  "Kayıtlı sorun yok.": "Aucun problème enregistré.",
  "Denetim tamamlanmadığı için sorun listesi eksik olabilir.":
    "L'audit n'est pas terminé, la liste des problèmes peut donc être incomplète.",
  "{count} sorun türü bulundu: {critical} kritik, {warning} uyarı, {info} bilgi.":
    {
      one: "{count} type de problème trouvé : {critical} critique, {warning} avertissement, {info} info.",
      other:
        "{count} types de problèmes trouvés : {critical} critiques, {warning} avertissements, {info} infos.",
    },
  "En çok sayfayı etkileyen: {title} ({count} sayfa).": {
    one: "Touchant le plus de pages : {title} ({count} page).",
    other: "Touchant le plus de pages : {title} ({count} pages).",
  },
  "Site denetim raporu": "Rapport d'audit du site",
  "seowatcher ile üretildi. Bu dosya kendi kendine yeter: açmak için internet bağlantısı gerekmez. PDF için tarayıcıdan Yazdır seçeneğini kullanın.":
    "Réalisé avec seowatcher. Ce fichier est autonome : il s'ouvre sans connexion Internet. Pour un PDF, utilisez Imprimer dans votre navigateur.",
  "3. Genel görünüm": "3. Présentation",
  "4. Sorunlar": "4. Problèmes",
  "5. Hız ölçümü": "5. Tests de vitesse",
  "6. Google dizin durumu": "6. État de l'index Google",
  "7. Site haritası": "7. Sitemap",
  "8. Yöntem ve sınırlar": "8. Méthode et limites",
  "Ek A. Kalan etkilenen adresler": "Annexe A. Adresses concernées restantes",
  "Ek B. Taranan sayfalar": "Annexe B. Pages explorées",
  K: "C",
  U: "W",
  B: "I",
  "K kritik, U uyarı, B bilgi.": "C = critique, W = avertissement, I = info.",
  "Sorun türleri": "Types de problèmes",
  İçindekiler: "Contenu",
  "Sorun sayısı bilinmiyor.": "Le nombre de problèmes est inconnu.",
  "{severity} sorun türü": "Types de problèmes : {severity}",
  "Önem derecesine göre sorun türleri": "Types de problèmes par gravité",
  tür: "types",
  "Önem derecesine göre sorun türü dağılımı":
    "Répartition des types de problèmes par gravité",
  "Kategoriye göre sorun türleri": "Types de problèmes par catégorie",
  "Kategori ve önem derecesine göre sorun türü sayısı":
    "Nombre de types de problèmes par catégorie et gravité",
  "En çok sayfayı etkileyen 10 sorun türü":
    "10 types de problèmes touchant le plus de pages",
  "Etkilenen sayfa sayısına göre ilk on sorun türü":
    "Dix principaux types de problèmes par pages concernées",
  "HTTP durum kodları": "Codes d'état HTTP",
  "Durum kodu dağılımı": "Répartition des codes d'état",
  "Tarama derinliği (ana sayfadan kaç tıklama)":
    "Profondeur d'exploration (clics depuis la page d'accueil)",
  "Tarama derinliği dağılımı": "Répartition de la profondeur d'exploration",
  "Başlık uzunluğu (karakter)": "Longueur du titre (caractères)",
  "Yaklaşık 30-60 karakter, başlığın arama sonucunda kısaltılmadan görünmesi için bir ölçüttür; Google sabit bir sınır koymaz.":
    "En règle générale, un titre d'environ 30 à 60 caractères s'affiche dans les résultats de recherche sans être coupé ; Google ne fixe aucune limite stricte.",
  "Sayfa başlığı uzunluğu dağılımı":
    "Répartition de la longueur du titre de la page",
  "Sunucu yanıt süresi": "Temps de réponse du serveur",
  "Yanıt süresi dağılımı": "Répartition du temps de réponse",
  "Dizine girebilir": "Indexable",
  "Site haritasında": "Dans le sitemap",
  "Başlığı yok": "Aucun titre",
  "Meta açıklaması yok": "Aucune méta-description",
  "%{value}": "{value} %",
  "{count} taranan sayfaya oranla.": {
    one: "Par rapport à {count} page explorée.",
    other: "Par rapport à {count} pages explorées.",
  },
  "Sayfa durumu": "État de la page",
  "Sayfa durumu özeti": "Résumé de l'état des pages",
  "Her grafiğin altında aynı veriler yazıyla da verilir.":
    "Les données de chaque graphique sont également indiquées en mots en dessous.",
  "tüm site": "tout le site",
  "Etkilenen: tüm site": "Concerné : l'ensemble du site",
  "ve {count} sayfa daha (ayrıntı sorun bölümünde)": {
    one: "et {count} autre page (détails dans la section Problèmes)",
    other: "et {count} autres pages (détails dans la section Problèmes)",
  },
  "Ne yapılmalı:": "Que faire :",
  "Neden:": "Pourquoi :",
  "Bu hafta yapılacaklar": "À faire cette semaine",
  "Düzeltilecek kayıtlı sorun yok.": "Aucun problème enregistré à résoudre.",
  "Düzeltilecek sorun listesi eksik olabilir.":
    "La liste des problèmes à résoudre est peut-être incomplète.",
  "Bu hafta yapılacak {count} şey": {
    one: "{count} chose à faire cette semaine",
    other: "{count} choses à faire cette semaine",
  },
  "Sıralama, düzeltildiğinde site puanına en çok puan kazandıranlara göre.":
    "Classées selon le nombre de points que chaque correction ajoute au score du site.",
  Sonrasında: "Après cela",
  "Denetim hata verip durdu.": "L'audit s'est arrêté avec une erreur.",
  "Denetim hâlâ çalışıyor.": "L'audit est toujours en cours.",
  "Hiç sayfa taranamadı.": "Aucune page n'a pu être explorée.",
  "{count} sayfa tarandı": {
    one: "{count} page explorée",
    other: "{count} pages explorées",
  },
  "Rapor eksik olabilir.": "Le rapport est peut-être incomplet.",
  "{count} sorun türü: {critical} kritik, {warning} uyarı, {info} bilgi.": {
    one: "{count} type de problème : {critical} critique, {warning} avertissement, {info} info.",
    other:
      "{count} types de problèmes : {critical} critiques, {warning} avertissements, {info} infos.",
  },
  "Taranan sayfa": "Pages explorées",
  "Ortalama yanıt": "Réponse moyenne",
  Dizinde: "Indexée",
  Kısmen: "Partiel",
  Nötr: "Neutre",
  "Bu denetimin sayfaları için Search Console URL Denetleme Aracı sonucu kayıtlı değil, bu yüzden Google'ın hangi sayfaları dizine aldığı rapora girmiyor. Dizin Kapsamı ekranından inceleme çalıştırıldıktan sonra rapor yeniden oluşturulursa bu bölüm dolar.":
    "Aucun résultat d'inspection d'URL de la Search Console n'est enregistré pour les pages de cet audit ; le rapport ne peut donc pas indiquer quelles pages Google a indexées. Lancez une inspection depuis l'écran État de l'indexation et recréez le rapport pour remplir cette section.",
  "Kaynak: Search Console URL Denetleme Aracı. Sonuçlar kayıtlıdır, bu rapor Google'a yeni istek atmaz; son inceleme {date}.":
    "Source : inspection d'URL de la Search Console. Les résultats sont enregistrés ; ce rapport n'envoie donc aucune nouvelle requête à Google. Dernière inspection : {date}.",
  "Kaynak: Search Console URL Denetleme Aracı. Sonuçlar kayıtlıdır, bu rapor Google'a yeni istek atmaz.":
    "Source : inspection d'URL de la Search Console. Les résultats sont enregistrés ; ce rapport n'envoie donc aucune nouvelle requête à Google.",
  "Dizine girebilen {count} sayfadan {checked} tanesi için Google yanıt verdi ({percent}).":
    {
      one: "Google a répondu pour {checked} sur {count} page indexable ({percent}).",
      other:
        "Google a répondu pour {checked} des {count} pages indexables ({percent}).",
    },
  "Google dizin durumu dağılımı": "Répartition de l'état d'indexation Google",
  "Google'ın verdiği durumlar": "États signalés par Google",
  "Kapsam durumu dağılımı": "Répartition de l'état de couverture",
  "Dikkat isteyen sayfalar": "Pages nécessitant une attention",
  Sonuç: "Résultat",
  "Hata: {error}": "Erreur : {error}",
  Aynı: "Idem",
  "Dizinde değil olarak işaretlenen ya da asıl adresi farklı seçilen sayfa yok.":
    "Aucune page n'est marquée comme non indexée ni n'a une autre URL canonique sélectionnée.",
  "Taranan {count} sayfanın {inMap} tanesi ({percent}) site haritasında. Haritanın kendisi (toplam adres sayısı, dosya boyutu) rapora girmez; yalnızca taranan sayfaların harita durumu ve haritayla ilgili bulunan sorunlar gösterilir.":
    {
      one: "{inMap} sur {count} page explorée ({percent}) figure dans le sitemap. Le sitemap lui-même (nombre total d'adresses, taille du fichier) n'est pas couvert ; seuls la présence des pages explorées dans le sitemap et les problèmes de sitemap détectés sont affichés.",
      other:
        "{inMap} des {count} pages explorées ({percent}) figurent dans le sitemap. Le sitemap lui-même (nombre total d'adresses, taille du fichier) n'est pas couvert ; seuls la présence des pages explorées dans le sitemap et les problèmes de sitemap détectés sont affichés.",
    },
  "Haritayla ilgili sorun": "Problème de sitemap",
  "Haritayla ilgili kayıtlı sorun yok.":
    "Aucun problème de sitemap enregistré.",
  "Dizine girebilen ama haritada olmayan sayfalar ({count})":
    "Pages indexables absentes du sitemap ({count})",
  "Etkilenen adres": "Adresse concernée",
  "Tüm siteyi ilgilendiriyor": "Concerne tout le site",
  "Ne demek, neden önemli:":
    "Ce que cela signifie et pourquoi c'est important :",
  "Nasıl düzeltilir:": "Comment corriger :",
  'Kalan adresler raporun sonundaki <a href="#ek-adresler">Ek A</a> bölümünde.':
    'Les adresses restantes se trouvent dans l\'<a href="#ek-adresler">Annexe A</a> à la fin du rapport.',
  "Sorun listesi eksik olabilir (denetim tamamlanmadı).":
    "La liste des problèmes est peut-être incomplète (l'audit n'est pas terminé).",
  "{count} tür": {
    one: "{count} type",
    other: "{count} types",
  },
  "{count} sorun türü": {
    one: "{count} type de problème",
    other: "{count} types de problèmes",
  },
  "Önem derecesine, sonra kategoriye, sonra etkilenen sayfa sayısına göre sıralı. Her sorun için en fazla {count} adres yazılır.":
    {
      one: "Trié par gravité, puis par catégorie, puis par pages concernées. Au maximum {count} adresse est listée par problème.",
      other:
        "Trié par gravité, puis par catégorie, puis par pages concernées. Au maximum {count} adresses sont listées par problème.",
    },
  "{take} / {count} adres": {
    one: "{take} / {count} adresse",
    other: "{take} / {count} adresses",
  },
  "Sorunların altında gösterilen ilk {count} adresin ötesindekiler.": {
    one: "Adresses au-delà de la première ({count}) affichée sous chaque problème.",
    other:
      "Adresses au-delà des {count} premières affichées sous chaque problème.",
  },
  "{count} sayfa tarandı, başlangıç adresi {url}.": {
    one: "{count} page explorée, à partir de {url}.",
    other: "{count} pages explorées, à partir de {url}.",
  },
  "Tarama üst sınırı {count} sayfaydı; sınıra ulaşıldı, yani site bundan büyük olabilir ve görülmeyen sayfalardaki sorunlar rapora girmedi.":
    {
      one: "La limite d'exploration était de {count} page et elle a été atteinte ; le site est peut-être plus grand, et les problèmes des pages non explorées ne figurent pas dans le rapport.",
      other:
        "La limite d'exploration était de {count} pages et elle a été atteinte ; le site est peut-être plus grand, et les problèmes des pages non explorées ne figurent pas dans le rapport.",
    },
  "Tarama üst sınırı {count} sayfaydı.": {
    one: "La limite d'exploration était de {count} page.",
    other: "La limite d'exploration était de {count} pages.",
  },
  "Hız ölçümü bu denetimde kapalıydı.":
    "La mesure de la vitesse était désactivée pour cet audit.",
  "Hiçbir sayfa için hız puanı kaydedilmedi.":
    "Aucun score de vitesse n'a été enregistré pour les pages.",
  "{count} sayfa Lighthouse ile ölçüldü (laboratuvar verisi, tek sanal cihaz). Ölçülmeyen sayfalar hakkında hız bilgisi yoktur.":
    {
      one: "{count} page a été mesurée avec Lighthouse (données de laboratoire, un seul appareil simulé). Il n'existe aucune donnée de vitesse pour les pages qui n'ont pas été mesurées.",
      other:
        "{count} pages ont été mesurées avec Lighthouse (données de laboratoire, un seul appareil simulé). Il n'existe aucune donnée de vitesse pour les pages qui n'ont pas été mesurées.",
    },
  "Başlangıç {start}.": "Démarré le {start}.",
  "Başlangıç {start}, bitiş {end}, süre {duration}.":
    "Démarré le {start}, terminé le {end}, durée : {duration}.",
  "Başlangıç {start}, bitiş {end}.": "Démarré le {start}, terminé le {end}.",
  "Rapor o andaki durumu gösterir; site sonradan değişmiş olabilir.":
    "Le rapport montre le site tel qu'il était alors ; il a peut-être changé depuis.",
  "Google dizin durumu": "État de l'index Google",
  "Search Console URL Denetleme Aracı'nın kayıtlı yanıtları; {count} sayfa için Google yanıt verdi. Rapor Google'a yeni istek atmaz.":
    {
      one: "Réponses enregistrées de l'inspection d'URL de la Search Console ; Google a répondu pour {count} page. Le rapport n'envoie aucune nouvelle requête à Google.",
      other:
        "Réponses enregistrées de l'inspection d'URL de la Search Console ; Google a répondu pour {count} pages. Le rapport n'envoie aucune nouvelle requête à Google.",
    },
  "Bu denetim için kayıtlı Google yanıtı yok, bölüm boş.":
    "Aucune réponse Google n'est stockée pour cet audit, la section est donc vide.",
  "Listelerdeki kesintiler": "Listes tronquées",
  "Dosya boyutunu makul tutmak için her sorunun altında en fazla {issuePages} adres, sayfa tablosunda {pages} sayfa, hız tablosunda {speed} sayfa yazılır; kesilen her listenin altında kaç kaydın dışarıda kaldığı belirtilir. Tam kayıtlar denetim ekranındadır.":
    "Pour garder une taille de fichier raisonnable, chaque problème liste au maximum {issuePages} adresses, le tableau des pages {pages} pages et le tableau de vitesse {speed} pages ; chaque liste tronquée indique combien d'enregistrements ont été omis. Les données complètes se trouvent sur l'écran d'audit.",
  "Bu raporda ölçülmeyenler": "Non mesuré dans ce rapport",
  "Arama sıralaması, tıklama ve trafik: bu rapor Search Console ya da Analytics trafiğini içermez.":
    "Classements de recherche, clics et trafic : ce rapport n'inclut pas le trafic de la Search Console ou d'Analytics.",
  "Geri bağlantılar ve rakip siteler.": "Backlinks et sites concurrents.",
  "İçeriğin kalitesi, arama niyetine uygunluğu ve özgünlüğü; yalnızca kelime sayısı gibi yapısal sinyallere bakılır.":
    "Qualité du contenu, adéquation à l'intention de recherche et originalité ; seuls des signaux structurels comme le nombre de mots sont vérifiés.",
  "Gerçek kullanıcı hız verisi (CrUX); yalnızca laboratuvar ölçümü vardır.":
    "Données de vitesse d'utilisateurs réels (CrUX) ; il n'y a que des mesures de laboratoire.",
  "Giriş gerektiren sayfalar ve taramanın ulaşamadığı adresler.":
    "Pages qui nécessitent une connexion et adresses que l'exploration n'a pas pu atteindre.",
  "Kayıtlı sayfa yok.": "Aucune page enregistrée.",
  '{count} sayfa; en çok sorunu olanlar üstte. "Başlık" başlığın karakter sayısıdır.':
    {
      one: "{count} page ; celles qui ont le plus de problèmes d'abord. « Titre » est la longueur du titre en caractères.",
      other:
        "{count} pages ; celles qui ont le plus de problèmes d'abord. « Titre » est la longueur du titre en caractères.",
    },
  "Dizine girer": "Indexable",
  Yanıt: "Réponse",
  "Yönlenir: {url}": "Redirige vers : {url}",
  yok: "aucun",
  İyi: "Bon",
  Zayıf: "Médiocre",
  orta: "moyen",
  "Bu metrik ölçülmedi.": "Cette statistique n'a pas été mesurée.",
  "{metric}: en kötü 5": "{metric} : les 5 pires",
  "LCP (en büyük içerik)": "LCP (plus grand contenu)",
  "Sayfanın ana görselinin ya da başlığının ekranda belirmesi ne kadar sürdü. 2,5 saniye altı iyi.":
    "Temps d'apparition à l'écran de l'image principale ou du titre de la page. Moins de 2,5 secondes, c'est bon.",
  "CLS (görsel kayma)": "CLS (décalage de mise en page)",
  "Sayfa yüklenirken içerik ne kadar yer değiştirdi; yanlış tıklamaya yol açan kayma. 0,1 altı iyi.":
    "Quantité de contenu déplacée pendant le chargement de la page, le genre de décalage qui provoque des clics erronés. Moins de 0,1, c'est bon.",
  "INP (tepki süresi)": "INP (réactivité)",
  "Bir tıklamaya ya da dokunmaya sayfa ne kadar çabuk karşılık verdi. 200 ms altı iyi.":
    "Rapidité avec laquelle la page a répondu à un clic ou à un appui. Moins de 200 ms, c'est bon.",
  İ: "G",
  O: "A",
  Z: "P",
  "İ iyi, O orta, Z zayıf; her sayfa yalnızca ölçülen metrikte sayılır.":
    "G = bon, A = moyen, P = médiocre ; chaque page ne compte que pour les métriques mesurées sur elle.",
  "Temel Web Verileri: sayfaların dağılımı (mobil)":
    "Core Web Vitals : répartition des pages (mobile)",
  "Her metrik için iyi, orta ve zayıf sayfa sayısı":
    "Pages bonnes, moyennes et médiocres pour chaque métrique",
  "Bu denetimde hız ölçümü kapalıydı, bu yüzden sayfa hızı hakkında bir şey söylenmiyor.":
    "La mesure de la vitesse était désactivée pour cet audit ; ce rapport ne dit donc rien de la vitesse des pages.",
  "Bu denetimde kayıtlı Lighthouse sonucu yok: hız ölçümü kapalıydı ya da ölçümler tamamlanamadı (ör. ölçüm servisi istek sınırına takıldı). Hız ölçülmediği için bu rapor hız hakkında bir şey söylemez.":
    "Cet audit ne contient aucun résultat Lighthouse stocké : la mesure de la vitesse était désactivée ou les mesures n'ont pas pu se terminer (par exemple, le service de mesure a atteint sa limite de requêtes). Puisque la vitesse n'a pas été mesurée, ce rapport n'en dit rien.",
  "(adres bulunamadı)": "(adresse introuvable)",
  "İyi (90-100)": "Bon (90-100)",
  "Orta (50-89)": "Moyen (50-89)",
  "Zayıf (0-49)": "Médiocre (0-49)",
  "{category} (mobil ort.)": "{category} (moyenne mobile)",
  "Mobil puan": "Score mobile",
  "Masaüstü puan": "Score ordinateur",
  "Ölçüm hatası: {error}": "Erreur de mesure : {error}",
  "{count} sayfa mobilde ölçüldü": {
    one: "{count} page mesurée sur mobile",
    other: "{count} pages mesurées sur mobile",
  },
  " (taranan {count} sayfanın {percent}'i)": {
    one: " ({percent} de {count} page explorée)",
    other: " ({percent} des {count} pages explorées)",
  },
  "; {count} ölçüm hata verdi": {
    one: "; {count} mesure a échoué",
    other: "; {count} mesures ont échoué",
  },
  '<strong>{measured}</strong>{share}{failed}. Ortalama tek bir sayı "her sayfa orta" ile "yarısı mükemmel yarısı felaket"i aynı gösterdiği için dağılım veriliyor.':
    "<strong>{measured}</strong>{share}{failed}. La répartition est affichée, car une moyenne unique rend « toutes les pages sont passables » identique à « moitié excellentes, moitié catastrophiques ».",
  "{planned} sayfanın ölçülmesi planlandı, {measured} tanesi puan verdi{failed}. Aşağıdaki dağılım yalnızca ölçülen sayfaları yansıtır; ölçülmeyenler iyi ya da kötü sayılmadı.":
    "{planned} pages devaient être mesurées et {measured} ont obtenu un score{failed}. La répartition ci-dessous ne concerne que les pages mesurées ; les autres ne sont classées ni bonnes ni mauvaises.",
  "; kalanlar hata verdi ya da ölçüm servisinin istek sınırına takılmış olabilir":
    "; le reste a échoué ou a peut-être atteint la limite de requêtes du service de mesure",
  "Ölçüm kısmi.": "Mesure partielle.",
  "Mobil performans puanı dağılımı":
    "Répartition des scores de performances mobiles",
  "Lighthouse performans puanı histogramı":
    "Histogramme des scores de performances Lighthouse",
  "Puan bandı": "Tranche de score",
  "İyi, orta, zayıf sayfa sayısı":
    "Nombre de pages bonnes, moyennes et médiocres",
  "Lighthouse kategorileri": "Catégories Lighthouse",
  "Kategori başına mobil ortalama puan": "Score moyen mobile par catégorie",
  "Sayfa sayfa sonuçlar": "Résultats par page",
  "Mobil performans puanı en düşük sayfalar üstte. Metrikler mobil ölçümden.":
    "Pages avec le score de performances mobile le plus bas en premier. Les métriques proviennent de la mesure mobile.",
  'Eşikler Google\'ın yayımladığı değerlerdir: LCP 2,5 sn altı iyi, 4 sn üstü zayıf; CLS 0,1 altı iyi, 0,25 üstü zayıf; INP 200 ms altı iyi, 500 ms üstü zayıf. INP laboratuvarda çoğu zaman ölçülemez ("--" görünür).':
    "Les seuils sont les valeurs publiées par Google : un LCP inférieur à 2,5 s est bon et supérieur à 4 s médiocre ; un CLS inférieur à 0,1 est bon et supérieur à 0,25 médiocre ; un INP inférieur à 200 ms est bon et supérieur à 500 ms médiocre. L'INP ne peut souvent pas être mesuré en laboratoire (il affiche « -- »).",
  "Her sürümde nelerin eklendiğini ve düzeltildiğini burada bulabilirsiniz.":
    "Découvrez ce qui a été ajouté et corrigé dans chaque version.",
  Yenilik: "Fonctionnalité",
  Düzeltme: "Correction",
  "Acil düzeltme": "Hotfix",
  "Windows açılınca başlat": "Démarrer avec Windows",
  "Windows ayarı kaydedildi": "Préférences Windows enregistrées",
  "Bu tercihler Windows uygulamasına kaydedilir ve tepsi menüsüyle aynı ayarları kullanır.":
    "Ces préférences sont enregistrées dans l'application Windows et partagées avec le menu de la zone de notification.",
  "Windows ayarları okunuyor…": "Lecture des préférences Windows…",
  "Bu seçenekler Windows paketinde kullanılabilir. Docker veya geliştirici kurulumunda başlangıç davranışını işletim sisteminizden yönetin.":
    "Ces options sont disponibles dans l'application Windows. Pour les installations Docker ou de développement, gérez le démarrage via votre système d'exploitation.",
  "Bu Windows başlatıcısı uygulama içinden ayar değiştirmeyi desteklemiyor. Windows paketini güncelleyin; bu sırada tepsi menüsündeki seçenekleri kullanabilirsiniz.":
    "Ce lanceur Windows ne permet pas de modifier les préférences depuis l'application. Mettez à jour le package Windows ; en attendant, utilisez les options du menu de la zone de notification.",
  "Windows ayarlarına ulaşılamadı. Tepsi uygulamasının açık olduğunu kontrol edip yeniden deneyin.":
    "Les préférences Windows ne sont pas disponibles. Vérifiez que l'application de la zone de notification est en cours d'exécution et réessayez.",
  "Windows oturumu açıldığında arka planda başlar. Kapalıyken uygulamayı kendiniz açarsınız.":
    "Démarre en arrière-plan lorsque vous ouvrez votre session Windows. Lorsque l'option est désactivée, vous ouvrez l'application vous-même.",
  "Bu ayar yönetici tarafından tüm kullanıcılar için açılmış. Yalnızca yönetici kapatabilir.":
    "Un administrateur a activé cette option pour tous les utilisateurs. Seul un administrateur peut la désactiver.",
  "Otomatik güncelleme kurulumu": "Installer les mises à jour automatiquement",
  "Yeni sürümü indirir, doğrular ve kurar. Kapalıyken tepsi menüsünden Güncelle seçeneğiyle kurabilirsiniz.":
    "Télécharge, vérifie et installe les nouvelles versions. Lorsque l'option est désactivée, utilisez Mettre à jour dans le menu de la zone de notification pour les installer.",
  "Tüm kullanıcılar için kurulumda güncellemeyi yönetici kurar. Uygulama yeni sürümü haber verir.":
    "Pour les installations pour tous les utilisateurs, un administrateur installe les mises à jour. L'application vous informe des nouvelles versions.",
  "Tarayıcı sekmesini kapatmak uygulamayı durdurmaz. Tamamen kapatmak için tepsi menüsünden Çıkış deyin. Bilgisayar uyurken denetimler çalışmaz.":
    "Fermer l'onglet du navigateur n'arrête pas l'application. Pour la fermer complètement, choisissez Quitter dans le menu de la zone de notification. Les audits ne s'exécutent pas lorsque l'ordinateur est en veille.",
  Görünüm: "Apparence",
  "Varsayılan koyu tema seowatcher.io ile aynı görünür. Sistem, işletim sisteminizin tercihini izler. Seçim bu tarayıcıda saklanır.":
    "Le thème sombre par défaut correspond à seowatcher.io. L'option Système suit les préférences de votre système d'exploitation. Votre choix est enregistré dans ce navigateur.",
  Tema: "Thème",
  "Tema tercihi": "Préférence de thème",
  Sistem: "Système",
  Açık: "Clair",
  Koyu: "Sombre",

  Google: "Google",
  "Hizmet hesabı": "Compte de service",
  Sınırlar: "Limites",
  Hakkında: "À propos",
  "Sürüm notları": "Notes de version",
  Kayıtlı: "Enregistré",
  "Kurulum dosyasından geliyor": "Depuis le fichier de configuration",
  Kullanılmıyor: "Non utilisé",
  "Şu an kullanılan: hizmet hesabı": "Utilisé : compte de service",
  "Şu an kullanılan: Google erişim anahtarı": "Utilisé : clé d'accès Google",
  "Şu an kullanılmıyor (hizmet hesabı öncelikli): Google erişim anahtarı":
    "Non utilisé (le compte de service est prioritaire) : clé d'accès Google",
  "Şu an kullanılmıyor (Google erişim anahtarı öncelikli): hizmet hesabı":
    "Non utilisé (la clé d'accès Google est prioritaire) : compte de service",
  "Anahtar kayıtlı": "Clé enregistrée",
  "Anahtar eksik": "Clé manquante",
  "Yeni sürüm {version}": "Nouvelle version {version}",
  "Kontrol kapalı": "Vérifications désactivées",
  Güncel: "À jour",
  Denetlenmedi: "Non vérifié",
  Okunamadı: "Illisible",
  "Kimlikte boşluk olamaz.": "L'ID client ne peut pas contenir d'espaces.",
  "Kimlik {suffix} ile bitmeli. Gizli anahtarı değil, OAuth client ID'yi yapıştırın.":
    "L'ID client doit se terminer par {suffix}. Collez l'ID client OAuth, pas le secret client.",
  "Anahtarı test et": "Tester la clé",

  "Google erişim anahtarı kaydedildi": "Clé d'accès Google enregistrée",
  "Google erişim anahtarı kaydedilemedi. Değerleri kontrol edip tekrar deneyin.":
    "Impossible d'enregistrer la clé d'accès Google. Vérifiez les valeurs et réessayez.",
  "Google erişim anahtarı silindi": "Clé d'accès Google supprimée",
  "Google erişim anahtarı silinemedi. Tekrar deneyin.":
    "Impossible de supprimer la clé d'accès Google. Réessayez.",
  "Google bağlantısı": "Connexion Google",
  "Uygulama Google'a sizin adınıza bağlanır. Bunun için Google'dan aldığınız erişim anahtarını (OAuth client ID) buraya girin. Gizli kısmı şifrelenir ve bir daha tarayıcıya gönderilmez. Search Console ve Analytics aynı anahtarı kullanır.":
    "L'application se connecte à Google en votre nom. Pour cela, saisissez ici la clé d'accès (ID client OAuth) que vous avez obtenue de Google. La partie secrète est chiffrée et n'est jamais renvoyée au navigateur. La Search Console et Analytics utilisent la même clé.",
  "{console}'da bir OAuth client oluşturun (tür: {type}).":
    "Créez un client OAuth dans {console} (type : {type}).",
  "Şu iki adresi {field} alanına ekleyin.":
    "Ajoutez ces deux adresses sous {field}.",
  "Adresler harfi harfine aynı olmalı, aksi halde Google {code} hatası verir. İkisini de ekleyin: biri Search Console, biri Analytics için.":
    "Les adresses doivent correspondre exactement, sinon Google renvoie une erreur {code}. Ajoutez les deux : l'une est destinée à la Search Console, l'autre à Analytics.",
  "{service} yönlendirme adresi kopyalandı":
    "URI de redirection {service} copiée",
  "Kimliği ve gizli anahtarı aşağıya yazın.":
    "Saisissez l'ID client et le secret client ci-dessous.",
  "Google erişim anahtarının durumu okunamadı.":
    "Impossible de lire l'état de la clé d'accès Google.",
  "Ortam değişkenlerinden geliyor": "Provenant de variables d'environnement",
  "{id} ve {secret} ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.":
    "{id} et {secret} sont définis. Si vous enregistrez une valeur ici, elle est utilisée à la place.",
  Değiştir: "Modifier",
  "İstemci kimliği": "ID client",
  "Google Cloud Console'da APIs & Services → Credentials listesinde, OAuth 2.0 Client IDs altında görünür. {suffix} ile biter, gizli değildir.":
    "Dans Google Cloud Console, sous API et services → Identifiants, dans la liste des ID client OAuth 2.0. Il se termine par {suffix} et n'est pas secret.",
  "Gizli anahtar": "Secret client",
  "Aynı OAuth client'ı açınca sağdaki panelde. Google bunu yalnızca oluşturduğunuz anda tam gösterir. Kaçırdıysanız yeni bir gizli anahtar üretin. Burada sunucuda şifrelenir, bir daha tarayıcıya gönderilmez.":
    "Dans le panneau de droite lorsque vous ouvrez le même client OAuth. Google ne l'affiche en entier qu'au moment de sa création ; si vous l'avez manqué, ajoutez un nouveau secret. Ici, il est chiffré sur le serveur et n'est jamais renvoyé au navigateur.",
  "Google erişim anahtarı silinsin mi?": "Supprimer la clé d'accès Google ?",
  "Kimlik ve gizli anahtar bu kurulumdan silinir. Mevcut Search Console ve Analytics bağlantıları yerinde kalır ama anahtar yeniden girilene kadar çalışmaz.":
    "L'ID client et le secret sont supprimés de cette installation. Les connexions Search Console et Analytics existantes restent en place, mais cessent de fonctionner jusqu'à ce que la clé soit à nouveau saisie.",
  "Anahtarı sil": "Supprimer la clé",
  "Hizmet hesabı kaydedildi": "Compte de service enregistré",
  "Hizmet hesabı kaydedilemedi. Tekrar deneyin.":
    "Impossible d'enregistrer le compte de service. Réessayez.",
  "Hizmet hesabı bu kurulumdan silindi. Anahtarı gerçekten iptal etmek için Google Cloud'dan da silin.":
    "Le compte de service a été supprimé de cette installation. Pour révoquer réellement la clé, supprimez-la aussi dans Google Cloud.",
  "Hizmet hesabı silinemedi. Tekrar deneyin.":
    "Impossible de supprimer le compte de service. Réessayez.",
  "Hizmet hesabı (daha kısa yol)": "Compte de service (la voie la plus simple)",

  "Hizmet hesapları": "Comptes de service",
  "Hizmet hesabı durumu okunamadı.":
    "Impossible de lire l'état du compte de service.",
  "Bu adresi Search Console'da {path} ile mülkünüze ekleyin (yetki: {level}). Eklemeden veri gelmez. Analytics için de GA4 mülkünde {gaPath}'ne aynı adresi Görüntüleyici olarak ekleyin.":
    "Dans la Search Console, ajoutez cette adresse à votre propriété sous {path} (autorisation : {level}). Aucune donnée n'arrivera tant que ce ne sera pas fait. Pour Analytics, ajoutez aussi la même adresse avec le rôle Lecteur dans la propriété GA4 sous {gaPath}.",
  "Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle":
    "Paramètres → Utilisateurs et autorisations → Ajouter un utilisateur",
  Tam: "Total",
  "Yönetici → Erişim yönetimi": "Administration → Gestion des accès",
  "Hizmet hesabı adresi kopyalandı": "Adresse du compte de service copiée",
  "Hizmet hesabı dosyası (JSON)": "Fichier de clé du compte de service (JSON)",
  "Anahtar sunucuda şifrelenir ve bir daha tarayıcıya gönderilmez.":
    "La clé est chiffrée sur le serveur et n'est jamais renvoyée au navigateur.",
  "Hizmet hesabı silinsin mi?": "Supprimer le compte de service ?",
  "JSON anahtarı bu kurulumdan silinir ve Search Console ile Analytics bu hesapla veri çekemez. Anahtarı Google tarafında da iptal etmek için Google Cloud'dan silmeniz gerekir.":
    "La clé JSON est supprimée de cette installation, et Search Console et Analytics ne peuvent plus récupérer de données avec ce compte. Pour révoquer la clé chez Google également, supprimez-la dans Google Cloud.",
  "Hesabı sil": "Supprimer le compte",
  "PageSpeed anahtarı kaydedildi": "Clé PageSpeed enregistrée",
  "PageSpeed anahtarı kaydedilemedi. Anahtarı kontrol edip tekrar deneyin.":
    "Impossible d'enregistrer la clé PageSpeed. Vérifiez la clé et réessayez.",
  "PageSpeed anahtarı silindi": "Clé PageSpeed supprimée",
  "PageSpeed anahtarı silinemedi. Tekrar deneyin.":
    "Impossible de supprimer la clé PageSpeed. Réessayez.",

  "Anahtar durumu okunamadı.": "Impossible de lire l'état de la clé.",
  "Ortam değişkeninden geliyor": "Provenant d'une variable d'environnement",
  "{name} ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.":
    "{name} est défini. Si vous enregistrez une valeur ici, elle est utilisée à la place.",
  "API anahtarı": "Clé API",
  "Google Cloud Console → Credentials → Create credentials → API key. Önce aynı projede PageSpeed Insights API'sini etkinleştirin, yoksa anahtar 403 hatası verir.":
    "Google Cloud Console → Identifiants → Créer des identifiants → Clé API. Activez d'abord l'API PageSpeed Insights dans le même projet, sinon la clé renvoie une erreur 403.",
  "PageSpeed anahtarı silinsin mi?": "Supprimer la clé PageSpeed ?",

  "GitHub'a ulaşılamadı; son bilinen sürüm {version}":
    "Impossible d'accéder à GitHub ; la dernière version connue est {version}",
  "En güncel sürümü kullanıyorsunuz": "Vous utilisez la dernière version",
  "Güncelleme kontrol edilemedi. Birazdan tekrar deneyin.":
    "Impossible de rechercher des mises à jour. Réessayez dans quelques instants.",
  "Güncelleme kontrolü açıldı": "Vérifications de mise à jour activées",
  "Güncelleme kontrolü kapatıldı": "Vérifications de mise à jour désactivées",
  "Ayar kaydedilemedi. Tekrar deneyin.":
    "Impossible d'enregistrer le paramètre. Réessayez.",
  "Uygulama yeni sürümü fark eder ve ne yapacağınızı söyler. Windows paketi güncellemeyi kendisi kurar, Docker'da verilen komutu siz çalıştırırsınız. Docker'da kontrolü kapatırsanız GitHub'a istek gitmez. Windows paketinde görev çubuğu uygulaması günde bir kez GitHub'a bakar. Kendiliğinden kurup kurmayacağını menüdeki {option} seçeneği belirler.":
    "L'application détecte une nouvelle version et vous indique quoi faire. Le package Windows installe lui-même la mise à jour ; sous Docker, vous exécutez la commande affichée. Sous Docker, désactiver les vérifications signifie qu'aucune requête n'est envoyée à GitHub. Dans le package Windows, l'application de la zone de notification vérifie GitHub une fois par jour, et l'option {option} de son menu détermine si elle installe elle-même la mise à jour.",
  "Güncellemeleri kendiliğinden kur":
    "Installer les mises à jour automatiquement",
  Sürüm: "Version",
  "Site ve kılavuz": "Site Web et guide",
  "{version} yayımlandı.": "{version} est disponible.",
  Değişiklikler: "Nouveautés",
  "Windows paketi güncellemeyi kendisi kurar: görev çubuğundaki seowatcher simgesi yeni sürümü indirir, doğrular ve sessizce kurar. Kendiliğinden kurmayı istemiyorsanız simgeye sağ tıklayıp {option} işaretini kaldırın; o zaman yeni sürüm hazır olunca menüde {item} maddesi çıkar, tıklayınca kurulur. Verileriniz ve Google bağlantınız olduğu gibi kalır.":
    "Le package Windows installe lui-même la mise à jour : l'icône seowatcher de la zone de notification télécharge la nouvelle version, la vérifie et l'installe discrètement. Si vous préférez éviter cela, faites un clic droit sur l'icône et décochez {option} ; lorsqu'une nouvelle version sera prête, un élément {item} apparaîtra dans le menu et l'installera d'un clic. Vos données et votre connexion Google restent inchangées.",
  "Güncelle: sürüm hazır":
    "Güncelle : sürüm hazır (Mise à jour : version prête)",
  "Proje klasöründe çalıştırın. Verileriniz Docker biriminde ({volume}) kalır, güncelleme onu silmez.":
    "Exécutez-la dans le dossier du projet. Vos données restent dans le volume Docker ({volume}) ; la mise à jour ne les supprime pas.",
  "En güncel sürümü kullanıyorsunuz.": "Vous utilisez la dernière version.",

  "Son kontrol başarısız oldu: GitHub'a ulaşılamadı. Son bilinen sürüm {version} (son başarılı kontrol: {date}); güncel olup olmadığı doğrulanamadı.":
    "La dernière vérification a échoué : GitHub est injoignable. La dernière version connue est {version} (dernière vérification réussie : {date}) ; impossible de confirmer que vous êtes à jour.",
  "Son kontrol başarısız oldu: GitHub'a ulaşılamadı. Son bilinen sürüm {version}; güncel olup olmadığı doğrulanamadı.":
    "La dernière vérification a échoué : GitHub est injoignable. La dernière version connue est {version} ; impossible de confirmer que vous êtes à jour.",
  "Son kontrolde GitHub'a ulaşılamadı.":
    "GitHub était injoignable lors de la dernière vérification.",

  "Şimdi kontrol et": "Vérifier maintenant",
  "Kontrol açıkken uygulama, bir sekmede açık olduğu sürece en çok altı saatte bir GitHub'a bağlanıp en son sürümü sorar. GitHub bu istekte yalnızca genel IP adresinizi, uygulama adını ve sürümü görür; siteleriniz, Google hesabınız ya da denetimleriniz gönderilmez.":
    "Lorsque la vérification est activée, l'application demande la dernière version à GitHub au plus toutes les six heures, tant qu'elle est ouverte dans un onglet. GitHub ne voit que votre adresse IP publique, le nom de l'application et sa version ; vos sites, votre compte Google et vos audits ne sont jamais envoyés.",
  "Son kontrol: {date}.": "Dernière vérification : {date}.",
  "Kurulu sürüm": "Version installée",
  "Görev çubuğu menüsünden Günlükleri aç deyip server.log dosyasına bakın; düzelmezse Kurulumu onar.":
    "Dans le menu de la zone de notification, cliquez sur Günlükleri aç (Ouvrir les journaux) et consultez server.log ; si cela ne suffit pas, utilisez Kurulumu onar (Réparer l'installation).",
  "Ayrıntı için docker compose logs --tail 50 çıktısına bakın.":
    "Pour plus de détails, consultez la sortie de docker compose logs --tail 50.",
  "Search Console ve Analytics kapalı. Uygulamanın şifreleme anahtarı (veri klasöründeki instance-secret dosyası) eksik ya da bozuk. Görev çubuğu menüsünden Kurulumu onar deyin.":
    "La Search Console et Analytics sont désactivés. La clé de chiffrement de l'application (le fichier instance-secret du dossier de données) est manquante ou endommagée. Dans le menu de la zone de notification, cliquez sur Kurulumu onar (Réparer l'installation).",
  "Search Console ve Analytics kapalı. Google bağlantılarını şifreleyen gizli kurulum anahtarı (BETTER_AUTH_SECRET) eksik ya da çok kısa. Uygulama bu anahtarı kendisi üretir; elle kısa bir değer girdiyseniz silin.":
    "Search Console et Analytics sont désactivés. La clé d'installation secrète qui chiffre les connexions Google (BETTER_AUTH_SECRET) est manquante ou trop courte. L'application génère elle-même cette clé ; si vous avez saisi une valeur courte à la main, supprimez-la.",
  "GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET'ten yalnızca biri tanımlı. İkisi de gerekir. Ya da ikisini de boş bırakıp Google erişim anahtarını Ayarlar'dan girin.":
    "Un seul des deux, GOOGLE_CLIENT_ID ou GOOGLE_CLIENT_SECRET, est défini. Les deux sont nécessaires. Vous pouvez aussi laisser les deux vides et saisir la clé d'accès Google dans les Paramètres.",
  "Google erişim anahtarı ya da hizmet hesabı henüz girilmedi. Girmeden Search Console ve Analytics bağlanamaz.":
    "Aucune clé d'accès Google ni aucun compte de service n'a encore été saisi. La Search Console et Analytics ne peuvent pas se connecter sans l'un des deux.",
  "Google erişim anahtarı ortam değişkenlerinden geliyor.":
    "La clé d'accès Google provient de variables d'environnement.",

  "Google erişimi hazır.": "L'accès Google est prêt.",
  "PageSpeed anahtarı kontrol edilemedi. {logs}":
    "Impossible de vérifier la clé PageSpeed. {logs}",
  "Anahtar yok. Hız ölçümü Google'ın anahtarsız kotasıyla çalışır ve çoğu zaman 429 ile yarım kalır. Tarama ve diğer SEO kontrolleri etkilenmez.":
    "Aucune clé. La mesure de vitesse utilise le quota sans clé de Google et s'arrête souvent en cours de route avec une erreur 429. L'exploration et les autres vérifications SEO ne sont pas affectées.",
  "PageSpeed anahtarı ortam değişkeninden geliyor.":
    "La clé PageSpeed provient d'une variable d'environnement.",
  "Giriş koruması ayarlı.": "La protection de connexion est configurée.",
  "Bu kurulum parolasız ama dışarıdan erişime açık görünüyor; açan herkes yönetici olur. Önüne kendi giriş korumanızı koyun ya da uygulamayı yalnızca bu bilgisayara (127.0.0.1) açık tutun.":
    "Cette installation n'a pas de mot de passe mais semble accessible de l'extérieur ; quiconque l'ouvre est administrateur. Placez votre propre protection de connexion devant, ou limitez l'accès à cet ordinateur (127.0.0.1).",
  "Giriş ayarı eksik ya da geçersiz. Görev çubuğu menüsünden Kurulumu onar deyin; düzelmezse Sorunu bildir.":
    "Le paramètre de connexion est manquant ou non valide. Dans le menu de la zone de notification, cliquez sur Kurulumu onar (Réparer l'installation) ; si cela ne suffit pas, utilisez Sorunu bildir (Signaler un problème).",
  "Giriş ayarı eksik ya da geçersiz. AUTH_MODE, TEAM_DOMAIN ve POLICY_AUD değerlerini docs/ENVIRONMENT.md'ye göre kontrol edin.":
    "Le paramètre de connexion est manquant ou non valide. Vérifiez AUTH_MODE, TEAM_DOMAIN et POLICY_AUD par rapport à docs/ENVIRONMENT.md.",
  "Yerel veritabanı yanıt veriyor.": "La base de données locale répond.",
  "Veritabanı yanıt vermiyor. {logs}":
    "La base de données ne répond pas. {logs}",
  "Çalışma ortamı hazır.": "L'environnement d'exécution est prêt.",
  "Çalışma ortamında bir sorun var. {logs}":
    "Un problème est survenu avec l'environnement d'exécution. {logs}",
  "Giriş ve erişim": "Connexion et accès",
  "Google girişi": "Connexion Google",
  "Ayarları aç": "Ouvrir les Paramètres",
  "Çalışma ortamı": "Environnement d'exécution",
  Veritabanı: "Base de données",
  "Sorun yok": "OK",
  Dikkat: "Attention",
  "Kurulum durumu okunamadı": "Impossible de lire l'état de la configuration",
  "Sürümünüz v{version}.": "Vous utilisez la v{version}.",
  "Yeni sürüm {version} çıktı": "La version {version} est disponible",
  "Sürümünüz v{version}. Güncelleme kontrolü başarısız oldu; son bilinen sürüm {latest}.":
    "Vous utilisez la version v{version}. La vérification des mises à jour a échoué ; la dernière version connue est {latest}.",
  "Sürümünüz v{version}, güncel.":
    "Vous utilisez la v{version}, la plus récente.",
  "Sürümünüz v{version}. Güncelleme kontrolü kapalı.":
    "Vous utilisez la v{version}. Les vérifications de mise à jour sont désactivées.",
  "Kurulumunuzun durumu": "L'état de votre configuration",

  "Son kontrol: {date}": "Dernière vérification : {date}",
  "Özet kopyalandı. İçinde gizli değer yok.":
    "Résumé copié. Il ne contient aucun secret.",
  "Henüz proje yok. {link}.": "Aucun projet pour l'instant. {link}.",
  "Proje ekleyin": "Ajouter un projet",
  "Search Console {gsc} · Analytics {ga4}":
    "Search Console {gsc} · Analytics {ga4}",
  bağlı: "connecté",
  "bağlı değil": "non connecté",
  "Bağlantıları aç": "Ouvrir les connexions",

  "Sık sorunlar": "Problèmes courants",
  "Sayfa açılmıyor ya da uygulama kapalı":
    "La page ne s'ouvre pas ou l'application ne fonctionne pas",
  "Görev çubuğundaki seowatcher simgesine bakın; üzerine gelince {running} yazmalı. Simge yoksa Başlat menüsünden seowatcher'ı açın. Simgede {error} yazıyorsa sağ tıklayıp {restart}, olmazsa {repair} deyin.":
    "Regardez l'icône seowatcher dans la zone de notification ; en la survolant, {running} (En cours d'exécution) devrait s'afficher. S'il n'y a pas d'icône, ouvrez seowatcher depuis le menu Démarrer. Si l'icône indique {error} (Erreur), faites un clic droit dessus et choisissez {restart} (Redémarrer) ou, si cela ne suffit pas, {repair} (Réparer l'installation).",
  "Hâlâ açılmıyorsa {logs} ile {launcher} ve {server} dosyalarının son satırlarına bakın; {report} bunları hazır bir kayda koyar.":
    "Si elle ne s'ouvre toujours pas, choisissez {logs} (Ouvrir les journaux) et consultez les dernières lignes de {launcher} et {server} ; {report} (Signaler un problème) les regroupe dans un ticket prêt à envoyer.",
  "Windows kurulum kılavuzu": "Guide d'installation Windows",
  "Sayfa açılmıyor ya da Docker kapalı":
    "La page ne s'ouvre pas ou Docker ne fonctionne pas",
  "Önce Docker Desktop'ın çalıştığına bakın; Windows'ta tepsideki simge \"running\" demeli. Sonra durumu görün: {command} Durum {healthy} olana kadar bekleyin; ilk açılış birkaç dakika sürebilir.":
    "Vérifiez d'abord que Docker Desktop est en cours d'exécution ; sous Windows, son icône dans la zone de notification doit indiquer « running ». Vérifiez ensuite l'état : {command} Attendez que l'état soit {healthy} ; le premier démarrage peut prendre quelques minutes.",
  "Hâlâ açılmıyorsa son günlük satırları nedeni yazar: {command}":
    "Si elle ne s'ouvre toujours pas, les dernières lignes du journal en donnent la raison : {command}",
  "Docker kurulum belgesi": "Guide d'installation Docker",
  "Adres numarası (port) dolu": "Le port est déjà utilisé",
  "Adres numarası (port) dolu (Bind for 127.0.0.1:3001 failed)":
    "Le port est déjà utilisé (échec de la liaison à 127.0.0.1:3001)",
  "Windows paketi 3001 doluysa o açılış için 3002 ile 3010 arasında boş bir numara kullanır; bunu bir bildirimle ve simgenin yazısında söyler. Numarayı kalıcı yapmak istiyorsanız {dataFolder} deyip {config} içindeki {port} değerini değiştirin, sonra {restart} deyin.":
    "Si le port 3001 est occupé, le package Windows choisit un port libre entre 3002 et 3010 pour ce démarrage et l'indique dans une notification et dans le texte de l'icône. Pour rendre le port permanent, choisissez {dataFolder} (Ouvrir le dossier de données), modifiez la valeur {port} dans {config}, puis choisissez {restart} (Redémarrer).",
  "3001 numaralı adresi (port) başka bir program kullanıyor. Proje klasöründe {line} satırı olan bir {env} dosyası oluşturup konteyneri yeniden oluşturun: {command}":
    "Un autre programme utilise le port 3001. Dans le dossier du projet, créez un fichier {env} avec la ligne {line}, puis recréez le conteneur : {command}",
  "Adres numarası (port) değişince Google'a verdiğiniz yönlendirme adresleri de değişir. Yenilerini {link} kopyalayıp Google Cloud Console'da güncelleyin.":
    "Lorsque le port change, les URI de redirection que vous avez indiquées à Google changent aussi. Copiez les nouvelles depuis {link} et mettez-les à jour dans la Google Cloud Console.",
  "Ayarlar'daki Google bölümünden": "la section Google des Paramètres",
  "Ajanım bağlanamıyor (401)": "Mon agent ne parvient pas à se connecter (401)",
  "Ajan bağlantısı bir parola (token) ister. Windows paketinde bu parola {path} dosyasındadır ({dataFolder}). Panoya kopyalamak için PowerShell (değer ekrana yazılmaz): {command} Değeri sohbete yazmayın; yapıştırdıktan sonra panoyu temizleyin (Win+V, Tümünü temizle).":
    "La connexion de l'agent demande un mot de passe (jeton). Dans le package Windows, il se trouve dans le fichier {path} ({dataFolder}, Ouvrir le dossier de données). Pour le copier dans le presse-papiers avec PowerShell (la valeur n'est pas affichée à l'écran) : {command} Ne saisissez pas la valeur dans une discussion ; effacez le presse-papiers après l'avoir collée (Win+V, Tout effacer).",
  "Ajan bağlantısı varsayılan olarak bir parola ister. Parola ilk açılışta üretilir ve veri biriminde durur; okumak için (PowerShell ve cmd): {command}":
    "Par défaut, la connexion de l'agent demande un mot de passe. Il est généré au premier démarrage et conservé dans le volume de données ; pour le lire (PowerShell et cmd) : {command}",
  "Git Bash (Windows): {command} Önek olmadan Git Bash yolu bozar ve parola boş çıkar; PowerShell'de önek hata verir.":
    "Git Bash (Windows) : {command} Sans le préfixe, Git Bash déforme le chemin et le mot de passe apparaît vide ; dans PowerShell, le préfixe provoque une erreur.",
  "Adres: {command} Aracınız {header} başlığını göndermezse bağlantı 401 döner.":
    "Adresse : {command} Si votre outil n'envoie pas l'en-tête {header}, la connexion renvoie 401.",
  "{link} aracınız için hazır komutu verir. {details}":
    "{link} fournit une commande prête à l’emploi pour votre outil. {details}",
  "Ajan kurulumu sayfası": "La page de configuration de l'agent",
  "Hız ölçümü yarım kalıyor (429)":
    "La mesure de vitesse s'arrête en cours de route (429)",
  "{code} genellikle anahtar girilmediğini gösterir: Google'ın anahtarsız kotası birkaç sayfada dolar. Ücretsiz bir anahtar girin: {link}.":
    "{code} signifie généralement qu'aucune clé n'a été saisie : le quota sans clé de Google s'épuise en quelques pages. Saisissez une clé gratuite : {link}.",
  '429 / "çok fazla istek"': "429 / « trop de requêtes »",
  "Ayarlar, Hız ölçümü": "Paramètres, tests de vitesse",
  "Anahtar varken de olabilir: dakikalık sınır aşılırsa denetim bekleyip yeniden dener. {daily} dolarsa ölçülenler korunur ve ölçüm durur; ertesi gün yeniden denetleyin. Kendi kotanızı Google Cloud Console'da APIs & Services, PageSpeed Insights API, Quotas altında görebilirsiniz.":
    "Cela peut aussi arriver avec une clé : si la limite par minute est dépassée, l'audit attend et réessaie. Si la {daily} est atteinte, ce qui a déjà été mesuré est conservé et la mesure s'arrête ; relancez l'audit le lendemain. Vous pouvez consulter votre propre quota dans la Google Cloud Console sous API et services, PageSpeed Insights API, Quotas.",
  "Günlük sınır": "limite quotidienne",
  "PageSpeed anahtarı belgesi": "Guide de la clé PageSpeed",
  "Sorgu verisi yok, grafikler boş":
    "Aucune donnée de requête, graphiques vides",
  "Önce projede Search Console'un bağlı olduğunu ve bir mülk seçildiğini doğrulayın. Hizmet hesabı kullanıyorsanız hesabın e-postasını Search Console'da mülke kullanıcı olarak eklemiş olmanız gerekir; eklemeden veri gelmez.":
    "Assurez-vous d'abord que la Search Console est connectée au projet et qu'une propriété est sélectionnée. Si vous utilisez un compte de service, son adresse e-mail doit être ajoutée comme utilisateur de la propriété dans la Search Console ; aucune donnée n'arrive tant que ce n'est pas fait.",
  "Mülk yeni doğrulandıysa Google'ın veri vermesi birkaç gün sürebilir.":
    "Si la propriété a été vérifiée récemment, Google peut prendre quelques jours pour fournir les données.",
  "Projenin bağlantılarını aç": "Ouvrir les connexions du projet",
  "Projelere git": "Accéder aux projets",
  "Search Console belgesi": "Search Console guide",
  "seowatcher-tanilama-{date}.zip": "seowatcher-diagnostic-{date}.zip",
  "Tanılama paketi indirildi": "Paquet de diagnostic téléchargé",
  "Paket oluşturulamadı": "Impossible de créer le paquet",
  "seowatcher tanılama paketi\nOluşturulma: {generatedAt}\n\nİçindekiler\n  summary.txt        Tek sayfalık özet.\n  diagnostics.json   Sürüm, kurulum kontrolleri, tablo satır sayıları,\n                     projeler, bağlı Google mülkleri ve son 25 denetim.\n  client-log.json    Bu sekmede yakalanan tarayıcı hataları.\n  browser.json       Tarayıcı ve ekran bilgisi.\n\nİçinde OLMAYAN şeyler\n  Gizli değer yok: Google erişim ve yenileme anahtarları, Google erişim\n  anahtarının gizli kısmı, PageSpeed API anahtarı, ajan parolası (MCP token)\n  ve oturum çerezleri toplanmaz. Yalnızca her birinin ayarlı olup olmadığı yazar.\n  Taranan sayfaların içeriği de yok, yalnızca sayıları var.\n\nİçinde OLAN, sizi tanımlayan şeyler\n  Proje adlarınız, alan adlarınız, bağlı Search Console mülkünüz ve GA4\n  mülk kimliğiniz. Bunlar olmadan bir sorun teşhis edilemez. Göndermeden\n  önce dosyaları açıp okuyun; karar sizin.\n":
    "Paquet de diagnostic seowatcher\nCréé : {generatedAt}\n\nContenu\n  summary.txt        Un résumé d'une page.\n  diagnostics.json   Version, vérifications de configuration, nombre de lignes des tables,\n                     projets, propriétés Google connectées et 25 derniers audits.\n  client-log.json    Erreurs du navigateur détectées dans cet onglet.\n  browser.json       Détails du navigateur et de l'écran.\n\nCe qui n'y figure PAS\n  Aucun secret : les jetons d'accès et d'actualisation Google, le secret de la\n  clé d'accès Google, la clé API PageSpeed, le mot de passe de l'agent (jeton MCP)\n  et les cookies de session ne sont pas collectés. Seule leur présence est notée.\n  Le contenu des pages explorées n'est pas inclus non plus, seulement leur nombre.\n\nCe qui y figure ET vous identifie\n  Les noms de vos projets, vos domaines, la propriété Search Console connectée et\n  l'ID de propriété GA4. Un problème ne peut pas être diagnostiqué sans eux. Ouvrez\n  et lisez les fichiers avant de les envoyer ; la décision vous appartient.\n",
  "{pages} sayfa  {issues} bulgu": "{pages} pages  {issues} problèmes",
  "Oluşturulma: {date}": "Créé : {date}",
  "Kurulum kontrolleri": "Vérifications de configuration",
  "hepsi ok": "tout est OK",
  Tablolar: "Tables",
  "Projeler: {n}": "Projets : {n}",
  "Search Console bağlantısı: {n}": "Connexions à la Search Console : {n}",
  "Analytics bağlantısı: {n}": "Connexions Analytics : {n}",
  "Son denetimler": "Audits récents",
  "Tarayıcıda yakalanan hata: {n}":
    "Erreurs détectées dans le navigateur : {n}",
  "Hızlı işlemler": "Actions rapides",
  "Durumu yeniden kontrol et": "Revérifier l'état",
  "(yeni sekmede açılır)": "(s'ouvre dans un nouvel onglet)",
  "Becerileri /seo-audit diye çağırırsınız.":
    "Vous appelez les compétences avec /seo-audit.",
  "Komut, Codex'in kendi bağlama adımlarını kullanır. Becerileri $seo-audit diye çağırırsınız.":
    "La commande utilise les propres étapes de connexion de Codex. Vous appelez les compétences avec $seo-audit.",
  "Genel komut. Beceriyi aracınızın kendi yöntemiyle çağırın.":
    "Une commande générale. Appelez la compétence comme le fait votre outil.",
  "Uygulama kurulu, Google ve PageSpeed hazırsa yalnızca bu adım yeter.":
    "Si l'application est installée et que Google et PageSpeed sont prêts, cette étape suffit.",
  "Komutu ajanınıza yapıştırın. Ajan seowatcher'ı bağlar, SEO becerilerini kurar, elle yapacağınız adımlarda size yol gösterir.":
    "Collez la commande dans votre agent. Il connecte seowatcher, installe les compétences SEO et vous guide dans les étapes que vous effectuez manuellement.",
  "Hangi ajanı kullanıyorsunuz?": "Quel agent utilisez-vous ?",
  "Ajan bağlantıyı kurar, becerileri kopyalar ve doğrular. Parolayı sohbete yazmaz, bilgisayarınızdan okur.":
    "L'agent établit la connexion, copie les compétences et les vérifie. Il lit le mot de passe sur votre ordinateur au lieu de l'écrire dans le chat.",
  "Kurulum komutunu kopyala": "Copier la commande de configuration",
  "Kurulum komutu kopyalandı": "Commande de configuration copiée",
  "Bağlandıktan sonra ajanınızdan {skill} becerisini kullanmasını isteyin; sıradaki adımı birlikte seçersiniz.":
    "Une fois connecté, demandez à votre agent d'utiliser la compétence {skill} ; vous choisirez ensemble l'étape suivante.",
  "Ajanınız seowatcher'a ilk kez istek attığında yukarıdaki durum değişir.":
    "Le statut ci-dessus change la première fois que votre agent envoie une requête à seowatcher.",
  "Claude Code, Codex, Cursor, ChatGPT ve MCP destekleyen diğer uygulamalarla çalışır.":
    "Fonctionne avec Claude Code, Codex, Cursor, ChatGPT et d'autres applications prenant en charge MCP.",
  "İlk kez mi kuruyorsunuz? Buradan başlayın.":
    "Première configuration ? Commencez ici.",
  "Sıfırdan kurulum": "Nouvelle installation",
  "Uygulamayı yeni kurduysanız ilk adım bu.":
    "Si vous venez d'installer l'application, ceci est la première étape.",
  "Yeni bir kurulum ya da baştan kontrol için.":
    "Pour une nouvelle installation ou une vérification complète depuis le début.",
  "Ajanınız kurulumu, Google bağlantısını, PageSpeed anahtarını ve ilk projenizi sırayla kontrol eder, sonra kendini bağlar. Windows paketini de Docker'ı da tanır. Google Cloud'daki adımları siz yaparsınız. Anahtarlar sohbete değil, yalnızca Ayarlar'a girilir.":
    "Votre agent vérifie tour à tour l'installation, la connexion Google, la clé PageSpeed et votre premier projet, puis se connecte. Il connaît à la fois le package Windows et Docker. Vous effectuez vous-même les étapes dans Google Cloud. Les clés se saisissent uniquement dans les Paramètres, jamais dans le chat.",
  "Sıfırdan kurulum komutunu kopyala":
    "Copier la commande de nouvelle installation",
  Yeterli: "Marge suffisante",
  Azalıyor: "Bientôt épuisé",
  "Neredeyse doldu": "Presque épuisé",
  "{count} sorgu": {
    one: "{count} requête",
    other: "{count} requêtes",
  },
  "{count} ölçüm": {
    one: "{count} mesure",
    other: "{count} mesures",
  },
  "{count} puan": {
    one: "{count} point",
    other: "{count} points",
  },
  "{count} rapor": {
    one: "{count} rapport",
    other: "{count} rapports",
  },
  "Kalan: {amount}": "Restant : {amount}",
  "Veri yok": "Aucune donnée",
  "Sınır: {amount}": "Limite : {amount}",
  "{amount} kaldı": "Reste : {amount}",
  "Durum: {state}": "État : {state}",
  "Son güncelleme: {date}": "Dernière mise à jour : {date}",
  "Henüz veri yok": "Aucune donnée pour l'instant",
  "Sabit sınır": "Limite fixe",
  "Kaynak: {source}. {freshness}": "Source : {source}. {freshness}",
  "Kota ve sınırlar": "Quotas et limites",
  "Kota bilgisi yüklenemedi":
    "Impossible de charger les informations sur les quotas",
  "Gösterilecek sınır yok": "Aucune limite à afficher",
  "Bu bölümde izlenen bir kota yok.":
    "Aucun quota n'est suivi dans cette section.",
  "Google ve sistem sınırları": "Limites de Google et du système",
  "Search Console, GA4 ve PageSpeed'in günlük sınırları, bir de denetim ve rapor üst sınırları. Rakamlar uygulamanın kendi kaydından gelir, Google'a ek istek gitmez. Sınırlar proje başına gösterilir.":
    "Les limites quotidiennes de Search Console, GA4 et PageSpeed, ainsi que les plafonds d'audits et de rapports. Les chiffres proviennent des propres enregistrements de l'application ; aucune requête supplémentaire n'est donc envoyée à Google. Les limites sont affichées par projet.",
  "Projeler okunamadı": "Impossible de lire les projets",
  "Henüz bir proje yok": "Aucun projet pour l'instant",
  "Sınırlar proje başına gösterilir. Proje listesi yüklenince burada görünür.":
    "Les limites sont affichées par projet. Elles apparaissent ici une fois la liste des projets chargée.",
  "Sınırlar proje başına gösterilir. Bir proje oluşturunca burada görünür.":
    "Les limites sont affichées par projet. Elles apparaissent ici une fois que vous avez créé un projet.",
  "Sınırları göster": "Afficher les limites",
  "Bu ekranın kılavuzunu aç": "Ouvrir le guide de cet écran",
  Yükleniyor: "Chargement",
  "Geçen süre: {duration}": "Temps écoulé : {duration}",
  "Rapor hazır": "Rapport prêt",
  "Google'dan yanıt bekleniyor…": "En attente de Google…",
  "Bildirimler ({count} okunmamış)": "Notifications ({count} non lues)",
  Bildirimler: "Notifications",
  "Tümünü okundu işaretle": "Marquer tout comme lu",
  "Henüz bildirim yok. İşlemler tamamlandığında burada görünür.":
    "Aucune notification pour l'instant. Les tâches terminées apparaîtront ici.",
  Okunmamış: "Non lue",
  "Bildirim sesi": "Son des notifications",
  "Sesi dinle": "Écouter le son",
  "Yeni sürüm yayımlandı: {version}": "Nouvelle version publiée : {version}",
  "Ayarlar'daki Hakkında bölümü nasıl güncelleyeceğinizi söyler.":
    "Voir Paramètres → À propos pour les instructions de mise à jour.",
  "{service} bağlantısı yenilenmeli": "Reconnecter {service}",
  "Google erişim izni geçersiz ya da geri alınmış. Hesabı yeniden bağlayın.":
    "L'accès à Google a expiré ou a été révoqué. Reconnectez votre compte.",
  "Denetim bitti: {pages} sayfa, {issues} bulgu":
    "Audit terminé : {pages} pages, {issues} constats",
  "Denetim tamamlanamadı": "Échec de l'audit",
  "Kontrol ediliyor…": "Vérification…",
  "Rapor kaydedildi ancak indirilemedi. Raporlar ekranından tekrar deneyin.":
    "Le rapport a été enregistré mais n'a pas pu être téléchargé. Réessayez depuis Rapports.",
  Denetim: "Audit",
  "{start} – {end}. Search Console verisi {count} gün geriden gelir, bu yüzden son gün bugün olmaz.":
    {
      one: "{start} – {end}. Les données de Search Console ont {count} jour de retard ; le dernier jour ne peut donc jamais être aujourd'hui.",
      other:
        "{start} – {end}. Les données de Search Console ont {count} jours de retard ; le dernier jour ne peut donc jamais être aujourd'hui.",
    },
  "TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı":
    "TEAM_DOMAIN doit être une adresse HTTPS complète, par exemple https://votre-equipe.cloudflareaccess.com",
  'TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı — "{value}" değerinin başına https:// ekleyin':
    "TEAM_DOMAIN doit être une adresse HTTPS complète, par exemple https://votre-equipe.cloudflareaccess.com — ajoutez https:// au début de « {value} »",
  "Site haritasında var, dizine alındı": "Envoyée et indexée",
  "Dizine alındı, site haritasında yok":
    "Indexée, mais non envoyée via un sitemap",
  "Dizine alındı, site haritasına eklemeyi düşünün":
    "Indexée ; pensez à l'ajouter à un sitemap",
  "Tarandı, şu an dizine alınmadı": "Explorée, actuellement non indexée",
  "Keşfedildi, henüz taranmadı": "Détectée, actuellement non indexée",
  "Yinelenen içerik, canonical belirtilmemiş":
    "Page en double sans URL canonique sélectionnée par l'utilisateur",
  "Yinelenen içerik, Google başka bir canonical seçti":
    "Page en double : Google n'a pas choisi la même URL canonique que l'utilisateur",
  "Yinelenen içerik, gönderilen adres canonical seçilmedi":
    "Page en double : l'URL envoyée n'a pas été sélectionnée comme URL canonique",
  "Alternatif sayfa, canonical doğru":
    "Autre page avec balise canonique correcte",
  "'noindex' etiketiyle dışlandı": "Exclue par la balise « noindex »",
  "401 nedeniyle engellendi":
    "Bloquée en raison d'une requête non autorisée (401)",
  "403 nedeniyle engellendi": "Bloquée en raison d'un accès interdit (403)",
  "Bulunamadı (404)": "Introuvable (404)",
  "Yumuşak 404": "Soft 404",
  "Yönlendirme yapan sayfa": "Page avec redirection",
  "Google bu adresi bilmiyor": "Google ne connaît pas cette URL",
  "Giriş sayfaları": "Pages de destination",
  "Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm.":
    "Pages où les visites commencent : sessions, engagement et conversions.",
  "Sayfa performansı": "Pages et écrans",
  "Görüntülenme ve sayfada geçirilen süre.": "Vues et temps passé sur la page.",
  "Trafik kaynakları": "Acquisition du trafic",
  "Ziyaretçiler nereden geliyor.": "D'où viennent vos visiteurs.",
  "Anahtar olaylar": "Événements clés",
  "Dönüşüm saydığınız olaylar ve kaç kişi tetikledi.":
    "Les événements comptés comme conversions et le nombre de personnes qui les ont déclenchés.",
  "E-ticaret": "E-commerce",
  "Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.":
    "Articles et revenus ; les données apparaissent si la propriété mesure l'e-commerce.",
  "Site içi arama": "Recherche sur le site",
  "Ziyaretçilerin sitenizde ne aradığı.":
    "Ce que les visiteurs recherchent sur votre site.",
  "Kitle dağılımı": "Audience",
  "Cihaz, ülke, yeni ve geri dönen ziyaretçi.":
    "Appareils, pays, nouveaux visiteurs et visiteurs connus.",
  "Ana makine adı": "Nom d'hôte",
  "Giriş sayfası": "Page de destination",
  Olay: "Nom de l'événement",
  Kanal: "Canal",
  Kaynak: "Source",
  Ortam: "Support",
  "Kaynak / ortam": "Source / support",
  Kampanya: "Campagne",
  "Yeni / geri dönen": "Nouveaux / connus",
  Ürün: "Article",
  "Ürün kodu": "Identifiant de l'article",
  "Arama terimi": "Terme de recherche",
  Kullanıcı: "Utilisateurs",
  "Etkileşimli oturum": "Sessions avec engagement",
  "Olay oranı": "Taux d'événements clés",
  "Satın alma işlemleri": "Transactions",
  Gelir: "Revenus",
  Görüntülenme: "Vues",
  "Etkileşim süresi": "Durée d'engagement",
  "Ürün görüntüleme": "Articles consultés",
  "Sepete eklenen ürün": "Articles ajoutés au panier",
  "Arama sayısı": "Recherches",
  "Başarısız denetimler, hangi aşamada durduğunu ve URL/kimlik bilgileri ayıklanmış hata açıklamasını içerir. PageSpeed ölçüm hataları URL'ler çıkarılarak özetlenir.":
    "Les audits en échec indiquent l'étape où ils se sont arrêtés et un résumé expurgé de l'erreur. Les erreurs de mesure PageSpeed sont résumées sans URL de page.",
  "PageSpeed ölçüm hatası ({count}): {message}":
    "Erreur de mesure PageSpeed ({count}) : {message}",
  İndirildi: "Téléchargé",
  "{count} sayfa soruluyor": "Interrogation de Google sur {count} pages",
  "{pages} sayfa tarandı, {issues} bulgu":
    "{pages} pages explorées, {issues} constats",
  "Bu dönemde hiç oturum kaydedilmedi.":
    "Aucune session n’a été enregistrée sur cette période.",
  "Başlık veya özet": "Titre ou résumé",
  "Tarama bittikten sonra çalışır.":
    "S’exécute une fois l’exploration terminée.",
} as const;
