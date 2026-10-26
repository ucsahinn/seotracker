/* eslint-disable max-lines -- locale translation data */
import type { Catalog } from "@/shared/i18n";

/** French for the site audit: checks, findings, speed, site details and the audit report. */
export const frAudit: Catalog = {
  "Sayfadaki canonical adresi": "URL canonique dans la page",
  "robots etiketleri": "Balises robots",
  "googlebot etiketleri": "Balises googlebot",
  "Sayfa başlığı": "Titre de la page",
  "Başlıktaki anlamlı kelime": "Mots significatifs du titre",
  "Lighthouse denetimi": "Audit Lighthouse",
  "Etkilenen öğe": "Éléments concernés",
  "Karşılanmayan koşul": "Condition non remplie",
  "Tahmini kazanç": "Économie estimée",
  "Üçüncü taraf kodların ana iş parçacığı süresi":
    "Temps du thread principal pris par le code tiers",
  "Toplam indirme boyutu": "Taille totale téléchargée",
  "Kırık dış bağlantı": "Lien externe cassé",
  Görseller: "Images",
  "Gömülü betik ve stil": "Scripts et styles intégrés",
  "Sayfaya yönlendirme olmadan ulaşılmıyor":
    "La page n'est atteinte qu'après une redirection",
  "Sunucu ilk yanıtı hızlı vermiyor":
    "La première réponse du serveur est lente",
  "Belge sıkıştırılmadan gönderiliyor":
    "Le document est envoyé sans compression",
  'Ana görselde loading="lazy" var': 'L\'image principale a loading="lazy"',
  "Ana görsel sayfanın ilk HTML'inde yok":
    "L'image principale n'est pas dans le HTML initial de la page",
  'Ana görselde fetchpriority="high" yok':
    "L'image principale n'a pas fetchpriority=\"high\"",
  "{count} güvensiz (http) görsel, video ya da çerçeve": {
    one: "{count} image, vidéo ou cadre non sécurisé (http)",
    other: "{count} images, vidéos ou cadres non sécurisés (http)",
  },
  "{count} form bilgileri http adresine gönderiyor": {
    one: "{count} formulaire envoie vers une adresse http",
    other: "{count} formulaires envoient vers une adresse http",
  },
  "{count} e-posta adresi açıkta": {
    one: "{count} adresse e-mail visible en clair",
    other: "{count} adresses e-mail visibles en clair",
  },
  "{count} iç bağlantı http:// ile veriliyor": {
    one: "{count} lien interne utilise http://",
    other: "{count} liens internes utilisent http://",
  },
  "{count} görsel {limit}'tan büyük": {
    one: "{count} image dépasse {limit}",
    other: "{count} images dépassent {limit}",
  },
  "{value} (iyi: en çok {good}, kötü: {poor} üstü)":
    "{value} (bon : jusqu'à {good}, mauvais : au-delà de {poor})",
  "{value} (kötü sınırı: {limit})": "{value} (mauvais au-delà de {limit})",
  "saha verisi (gerçek Chrome kullanıcıları)":
    "données terrain (vrais utilisateurs de Chrome)",
  "laboratuvar ölçümü (PageSpeed Insights)":
    "mesure de laboratoire (PageSpeed Insights)",
  "alan adı bulunamadı": "domaine introuvable",
  hata: "erreur",
  "en az {size}": "au moins {size}",
  'Sayfa "{text}" diyor, ama sunucu {status} döndürüyor':
    "La page indique « {text} », mais le serveur renvoie {status}",
  "{size} (sınır {limit})": "{size} (limite {limit})",
  "Yazı olarak işaretlenmiş {count} sayfa": {
    one: "{count} page balisée comme article",
    other: "{count} pages balisées comme articles",
  },
  "ve {count} tane daha": {
    one: "et {count} de plus",
    other: "et {count} de plus",
  },
  "Tahmini kazanç: {value}": "Économie estimée : {value}",
  "{count} adres, bu sitede {onHost}": {
    one: "{count} URL, dont {onHost} sur ce site",
    other: "{count} URL, dont {onHost} sur ce site",
  },
  "Lighthouse'un tahmini; en çok kazandıran sayfa için.":
    "Estimation de Lighthouse, pour la page qui y gagne le plus.",
  "Lighthouse bu denetimde bu ölçümleri raporlamadı, ya da denetim bu kontroller eklenmeden önce yapıldı.":
    "Lighthouse n'a pas fourni ces mesures dans cet audit, ou l'audit a été lancé avant l'ajout de ces vérifications.",
  "Dış bağlantı ve görsel boyutu kontrolü bu denetimde açık değildi ya da ölçülemedi.":
    "La vérification des liens externes et de la taille des images était désactivée pour cet audit ou n'a pas pu être mesurée.",
  "Bu kontroller denetimden sonra eklendi; yeni bir denetim onları da ölçer.":
    "Ces vérifications ont été ajoutées après cet audit ; un nouvel audit les mesure aussi.",
  "Orta. Kritik sorun yok; en çok puan getiren uyarılardan başlayın.":
    "Moyen. Aucun problème critique ; commencez par les avertissements qui rapportent le plus de points.",
  "Zayıf. Kritik sorun yok, ama birikmiş uyarılar puanı aşağı çekiyor.":
    "Faible. Aucun problème critique, mais l'accumulation d'avertissements tire le score vers le bas.",
  "Site haritasında başka bir siteye ait adresler var":
    "Le sitemap liste des adresses d'un autre site",
  "Site haritanız bu sitenin değil, başka bir alan adının adreslerini listeliyor. Google bir site haritasındaki adresleri yalnızca haritayla aynı sitedeyse kabul eder; diğer sitenin robots.txt dosyası bu haritayı göstermiyorsa ya da o site Search Console'da sizin adınıza doğrulanmamışsa bu adresleri yok sayar.":
    "Votre sitemap liste des adresses d'un autre domaine, pas de ce site. Google n'accepte les entrées d'un sitemap que si elles sont sur le même site que le sitemap ; sauf si le robots.txt de l'autre site pointe vers ce sitemap ou si cet autre site est validé pour vous dans la Search Console, Google ignore ces adresses.",
  "Site haritasını, adreslerin ait olduğu sitede yayınlayın ya da haritayı üreten ayarda sitenin adresini düzeltin (çoğu zaman eski bir alan adı ya da önizleme adresi kalmıştır). Bilerek başka siteye ait adresleri listeliyorsanız o sitenin robots.txt dosyasına bu haritayı gösteren bir Sitemap satırı ekleyin.":
    "Publiez le sitemap sur le site auquel appartiennent les adresses, ou corrigez l'adresse du site dans le réglage qui le génère (il reste souvent un ancien domaine ou une adresse de prévisualisation). Si vous listez volontairement les adresses d'un autre site, ajoutez au robots.txt de ce site une ligne Sitemap qui pointe vers ce sitemap.",
  "robots.txt bazı yolları yalnızca Googlebot'a açıyor":
    "robots.txt n'ouvre certains chemins qu'à Googlebot",
  "robots.txt dosyanız bazı yolları tüm botlara (User-agent: *) kapatıyor ama Googlebot'a ayrıca izin veriyor. Bu araç Googlebot değil, o yüzden bu yollardaki sayfaları taramadı; denetimde görünmemeleri sorun olmadıkları anlamına gelmez. Google bu sayfaları tarayabilir.":
    "Votre robots.txt ferme certains chemins à tous les robots (User-agent: *) mais les autorise séparément pour Googlebot. Cet outil n'est pas Googlebot : il n'a donc pas exploré les pages sous ces chemins, et leur absence de cet audit ne signifie pas qu'elles vont bien. Google peut les explorer.",
  "Bir şey yapmanız gerekmiyor. Bu sayfaları da denetlemek istiyorsanız ayrıntıdaki kuralları gözden geçirin; yalnızca Googlebot'a açık bırakmanın bir nedeni yoksa kuralı tüm botlar için aynı yapın.":
    "Rien à changer. Si vous voulez aussi auditer ces pages, revoyez les règles dans les détails ; s'il n'y a aucune raison de les ouvrir uniquement à Googlebot, appliquez la même règle à tous les robots.",
  "Sayfanın ilk görünümünü engelleyen dosyalar var":
    "Des fichiers bloquent le premier affichage de la page",
  "Tarayıcı bazı CSS ve JavaScript dosyalarını indirip işlemeden sayfada hiçbir şey göstermiyor. Lighthouse, bunlar ertelenirse ilk içeriğin daha erken görüneceğini hesapladı; tahmini kazanç bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Le navigateur n'affiche rien de la page tant qu'il n'a pas téléchargé et traité certains fichiers CSS et JavaScript. Lighthouse a calculé que les différer ferait apparaître le premier contenu plus tôt ; le gain estimé figure dans les détails du constat. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Sayfanın ilk ekranı için gerekmeyen betiklere defer ya da async ekleyin, ilk ekran için gereken küçük CSS'i sayfaya gömün, kalan CSS'i sonradan yükleyin. WordPress'te bir önbellek eklentisinin \"JavaScript'i ertele\" ve \"kritik CSS\" ayarları bu işi yapar.":
    "Ajoutez defer ou async aux scripts dont le premier écran n'a pas besoin, intégrez directement le petit CSS nécessaire au premier écran et chargez le reste du CSS plus tard. Sur WordPress, les réglages « différer le JavaScript » et « CSS critique » d'une extension de cache s'en chargent.",
  "Sayfada kullanılmayan JavaScript yükleniyor":
    "La page charge du JavaScript qu'elle n'utilise pas",
  "Sayfa, açılışta hiç çalışmayan JavaScript kodunu da indiriyor. Telefonda bu hem veri hem işlemci harcar ve sayfayı yavaşlatır. Lighthouse'un tahmin ettiği tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "La page télécharge aussi du JavaScript qui ne s'exécute jamais à l'ouverture. Sur un téléphone, cela coûte des données et du temps de processeur, et ralentit la page. L'économie estimée par Lighthouse figure dans les détails du constat. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Kullanılmayan eklentileri ve etiketleri kaldırın, büyük betik paketlerini sayfaya göre bölün ve yalnızca gereken sayfada yükleyin. Hangi dosyanın ne kadar boşa indiğini PageSpeed Insights raporunda görürsünüz.":
    "Supprimez les extensions et balises inutilisées, découpez les gros bundles de scripts par page et ne les chargez que là où ils servent. PageSpeed Insights indique la part inutilisée de chaque fichier.",
  "Sayfada kullanılmayan CSS yükleniyor":
    "La page charge du CSS qu'elle n'utilise pas",
  "Sayfa, bu sayfada hiçbir öğeye uygulanmayan stil kurallarını da indiriyor. Genelde tüm siteye tek bir büyük tema dosyası yüklendiğinde olur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "La page télécharge aussi des règles de style qui ne s'appliquent à rien sur cette page. Cela arrive généralement quand un gros fichier de thème est chargé sur tout le site. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Tema ya da eklentilerin kullanılmayan stil dosyalarını kapatın; bir derleme aracı kullanıyorsanız kullanılmayan CSS'i temizleyen adımı açın.":
    "Désactivez les feuilles de style inutilisées du thème ou des extensions ; si vous utilisez un outil de build, activez son étape de suppression du CSS inutilisé.",
  "JavaScript dosyaları sıkıştırılmamış (küçültülmemiş)":
    "Les fichiers JavaScript ne sont pas minifiés",
  "Bazı JavaScript dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Küçültme dosyayı anlamını değiştirmeden küçültür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Certains fichiers JavaScript sont servis avec leurs espaces et commentaires, sans minification. La minification réduit la taille d'un fichier sans changer ce qu'il fait. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Derleme aracınızda küçültmeyi (minify) açın ya da önbellek/CDN ayarlarından JavaScript küçültmeyi etkinleştirin.":
    "Activez la minification dans votre outil de build, ou la minification JavaScript dans les réglages de votre cache ou CDN.",
  "CSS dosyaları sıkıştırılmamış (küçültülmemiş)":
    "Les fichiers CSS ne sont pas minifiés",
  "Bazı CSS dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Certains fichiers CSS sont servis avec leurs espaces et commentaires, sans minification. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Derleme aracınızda CSS küçültmeyi açın ya da önbellek/CDN ayarlarından CSS küçültmeyi etkinleştirin.":
    "Activez la minification CSS dans votre outil de build, ou dans les réglages de votre cache ou CDN.",
  "Görseller gereğinden büyük indiriliyor":
    "Les images sont téléchargées plus grandes que nécessaire",
  "Lighthouse sayfadaki bazı görsellerin daha küçük indirilebileceğini hesapladı: eski bir biçimde (JPEG, PNG) sunuluyorlar, sıkıştırılmamışlar ya da ekranda gösterildiklerinden çok daha büyük boyutta indiriliyorlar. Tahmini tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse a calculé que certaines images de la page pourraient être téléchargées plus légères : elles sont servies dans un ancien format (JPEG, PNG), ne sont pas compressées ou sont téléchargées bien plus grandes qu'affichées. L'économie estimée figure dans les détails du constat. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Görselleri WebP ya da AVIF'e çevirin, sıkıştırın ve ekrandaki boyutlarına göre küçültün; farklı ekranlar için srcset ile birden çok boyut sunun. Çoğu CMS'te bir görsel optimizasyon eklentisi bunu otomatik yapar.":
    "Convertissez les images en WebP ou AVIF, compressez-les et redimensionnez-les à leur taille d'affichage ; servez plusieurs tailles avec srcset selon les écrans. Dans la plupart des CMS, une extension d'optimisation d'images le fait automatiquement.",
  "Dosyalar tarayıcıda yeterince uzun saklanmıyor":
    "Les fichiers ne restent pas assez longtemps dans le cache du navigateur",
  "Görsel, betik ve stil dosyaları kısa bir önbellek süresiyle ya da hiç önbellek bilgisi olmadan sunuluyor. Ziyaretçi siteye dönünce aynı dosyaları yeniden indirir. Lighthouse'un tahmin ettiği tekrar ziyaret tasarrufu bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Les images, scripts et feuilles de style sont servis avec une courte durée de cache, ou sans aucune information de cache. Quand un visiteur revient, il retélécharge les mêmes fichiers. L'économie estimée par Lighthouse pour les visites répétées figure dans les détails du constat. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  'Değişmeyen dosyalara uzun bir Cache-Control süresi verin (örneğin max-age=31536000) ve dosya değiştiğinde adını değiştirin. Barındırma panelinde ya da CDN\'de "tarayıcı önbelleği" ayarı genelde bunu yapar.':
    "Donnez aux fichiers qui ne changent pas une longue durée Cache-Control (par exemple max-age=31536000) et changez le nom d'un fichier quand son contenu change. Un réglage « cache navigateur » dans votre panneau d'hébergement ou votre CDN s'en charge généralement.",
  "Sayfanın toplam indirme boyutu çok büyük":
    "Le poids total de la page est très élevé",
  "Sayfayı açmak için indirilen her şeyin toplamı 2,5 MB'ı geçiyor. Mobil bağlantıda bu uzun bir yükleme ve ziyaretçinin veri paketinden harcama demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Tout ce qui est téléchargé pour ouvrir la page dépasse au total 2,5 Mo. Sur une connexion mobile, cela signifie un long chargement et des données prises sur le forfait du visiteur. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "PageSpeed Insights raporunda en büyük dosyalara bakın. Genelde görseller, videolar ve büyük betik paketleridir: görselleri küçültün, videoyu tıklanınca yükleyin, gereksiz betikleri kaldırın.":
    "Regardez les fichiers les plus lourds dans le rapport PageSpeed Insights. Ce sont généralement des images, des vidéos et de gros bundles de scripts : allégez les images, chargez les vidéos au clic, supprimez les scripts inutiles.",
  "Tarayıcıda oluşan sayfa yapısı çok büyük":
    "La structure de la page construite dans le navigateur est très volumineuse",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra oluşan HTML yapısının çok büyük olduğunu buldu. Bu, sayfanın kaynak kodunu sayan kontrolden farklıdır: JavaScript'in sonradan eklediği öğeleri de içerir. Büyük bir yapı stil hesaplamayı ve tıklamalara yanıtı yavaşlatır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse a constaté que la structure HTML construite par la page après son exécution dans le navigateur est très volumineuse. Cela diffère de la vérification qui compte la source de la page : elle inclut les éléments que JavaScript ajoute ensuite. Une grande structure ralentit le calcul des styles et les réponses aux appuis. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Görünmeyen içeriği (kapalı menüler, sekmeler, uzun listeler) gerektiğinde oluşturun ve sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.":
    "Ne construisez le contenu masqué (menus fermés, onglets, longues listes) qu'au besoin, et réduisez les couches d'enveloppe inutiles du constructeur de pages.",
  "Sayfa açılmadan önce yönlendirme yapılıyor":
    "La page redirige avant de s'ouvrir",
  "Lighthouse sayfanın ana belgesine ulaşmadan önce bir ya da daha fazla yönlendirmeden geçti. Her yönlendirme, içerik görünmeden önce fazladan bir istek demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse est passé par une ou plusieurs redirections avant d'atteindre le document principal de la page. Chaque redirection est une requête supplémentaire avant que le moindre contenu n'apparaisse. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Bu sayfaya giden bağlantıları ve site haritasını doğrudan son adrese çevirin; yönlendirme gerekiyorsa tek adımda bitsin.":
    "Faites pointer les liens et le sitemap directement vers l'adresse finale ; si une redirection est nécessaire, faites-la en une seule étape.",
  "Sunucu ilk yanıtı geç veriyor (Lighthouse)":
    "Le serveur répond lentement (Lighthouse)",
  "Lighthouse'un ölçümünde sunucunun sayfanın ilk baytını göndermesi 600 milisaniyeden uzun sürdü. Sunucu yanıt vermeden tarayıcı hiçbir şey yapamaz; bu süre sayfanın tüm açılışına eklenir. Tarayıcımızın kendi ölçtüğü yanıt süresinden ayrı, Google'ın sunucularından yapılan bir ölçümdür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Dans la mesure de Lighthouse, le serveur a mis plus de 600 millisecondes à envoyer le premier octet de la page. Le navigateur ne peut rien faire tant que le serveur ne répond pas : ce temps s'ajoute donc à tout le chargement. C'est une mesure faite depuis les serveurs de Google, distincte du temps de réponse mesuré par notre robot. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Sayfa önbelleğini (tam sayfa önbellek) açın, yavaş veritabanı sorgularını ve eklentileri bulun, gerekirse daha güçlü bir sunucuya ya da bir CDN'e geçin.":
    "Activez la mise en cache des pages (cache de page complète), repérez les requêtes de base de données et extensions lentes et, si besoin, passez à un serveur plus puissant ou à un CDN.",
  "Sayfa sıkıştırılmadan gönderiliyor": "La page est envoyée sans compression",
  "Lighthouse, sayfanın HTML belgesinin gzip ya da Brotli ile sıkıştırılmadan gönderildiğini gördü. Sıkıştırma metin dosyalarını genelde üçte bire indirir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse a constaté que le document HTML de la page est envoyé sans compression gzip ni Brotli. La compression réduit généralement les fichiers texte au tiers de leur taille. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Sunucunuzda ya da CDN'de gzip veya Brotli sıkıştırmayı açın. Çoğu barındırma panelinde tek bir ayardır.":
    "Activez la compression gzip ou Brotli sur votre serveur ou CDN. Dans la plupart des panneaux d'hébergement, c'est un seul réglage.",
  "Yazı tipleri yüklenirken metin görünmüyor":
    "Le texte est invisible pendant le chargement des polices",
  "Özel yazı tipleri yüklenene kadar metin görünmez kalıyor. Lighthouse, metnin yedek yazı tipiyle hemen gösterilmesinin ilk görünümü hızlandıracağını hesapladı. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Le texte reste invisible jusqu'au chargement des polices personnalisées. Lighthouse a calculé qu'afficher le texte tout de suite dans une police de secours accélérerait le premier affichage. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "@font-face kurallarına font-display: swap ekleyin. Google Fonts kullanıyorsanız adresin sonuna &display=swap ekleyin.":
    "Ajoutez font-display: swap à vos règles @font-face. Avec Google Fonts, ajoutez &display=swap à la fin de l'URL.",
  "Sayfanın ana görseli geç yüklenecek şekilde işaretlenmiş":
    "L'image principale de la page est réglée pour se charger tard",
  'Sayfanın en büyük öğesi (LCP) olan görselde loading="lazy" var. Tarayıcı bu görseli sayfa yerleşimi bitene kadar istemez, bu yüzden ana içerik geç görünür. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    "L'image qui est le plus grand élément de la page (LCP) a loading=\"lazy\". Le navigateur ne la demande qu'une fois la mise en page terminée, si bien que le contenu principal apparaît tard. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  'Sayfanın ilk ekranındaki ana görselden loading="lazy" özniteliğini kaldırın. Geç yükleme yalnızca ilk ekranın altındaki görsellere uygulanmalı.':
    "Retirez loading=\"lazy\" de l'image principale du premier écran. Le chargement différé ne convient qu'aux images situées sous le premier écran.",
  "Sayfanın ana görseli öncelikli istenmiyor":
    "L'image principale de la page n'est pas demandée en priorité",
  "Sayfanın en büyük öğesi (LCP) olan görsel ya sayfanın ilk HTML'inde yer almıyor (tarayıcı onu geç keşfediyor) ya da fetchpriority=\"high\" ile öncelikli istenmiyor. Ayrıntıda hangisinin eksik olduğu yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "L'image qui est le plus grand élément de la page (LCP) soit n'est pas dans le HTML initial (le navigateur la découvre tard), soit n'est pas demandée avec fetchpriority=\"high\". Les détails indiquent ce qui manque. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  'Ana görseli sayfanın HTML\'inde doğrudan bir <img> olarak verin (yalnızca JavaScript ya da CSS arka planı ile değil) ve ona fetchpriority="high" ekleyin. Gerekirse <link rel="preload"> ile önceden yükleyin.':
    'Placez l\'image principale directement dans le HTML de la page sous forme de <img> (pas seulement via JavaScript ou un fond CSS) et ajoutez fetchpriority="high". Si besoin, préchargez-la avec <link rel="preload">.',
  "Dosyalar eski HTTP/1.1 ile sunuluyor":
    "Des fichiers sont servis via l'ancien HTTP/1.1",
  "Sayfanın dosyalarının bir kısmı HTTP/2 ya da HTTP/3 yerine HTTP/1.1 ile geliyor. Eski protokolde tarayıcı aynı anda az sayıda dosya indirebilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Certains fichiers de la page arrivent via HTTP/1.1 au lieu de HTTP/2 ou HTTP/3. Avec l'ancien protocole, le navigateur ne peut télécharger que quelques fichiers à la fois. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Sunucunuzda ya da CDN'de HTTP/2'yi (tercihen HTTP/3'ü) açın. Çoğu modern barındırma ve CDN bunu varsayılan olarak destekler.":
    "Activez HTTP/2 (de préférence HTTP/3) sur votre serveur ou CDN. La plupart des hébergeurs et CDN modernes le prennent en charge par défaut.",
  "Eski tarayıcılar için gereksiz JavaScript gönderiliyor":
    "Du JavaScript inutile est envoyé pour les anciens navigateurs",
  "Sayfadaki betikler, güncel tarayıcıların zaten bildiği özellikler için eski tarayıcılara yönelik ek kod (polyfill, dönüştürme) içeriyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Les scripts de la page contiennent du code supplémentaire pour les anciens navigateurs (polyfills, code transpilé) pour des fonctionnalités que les navigateurs actuels ont déjà. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Derleme aracınızın hedef tarayıcı ayarını (browserslist) güncel tarayıcılara çekin ve artık gerekmeyen polyfill'leri kaldırın.":
    "Réglez les navigateurs cibles de votre outil de build (browserslist) sur les navigateurs actuels et supprimez les polyfills devenus inutiles.",
  "Üçüncü taraf kodlar tarayıcıyı uzun süre meşgul ediyor":
    "Du code tiers occupe longtemps le navigateur",
  "Reklam, sohbet, analiz ya da sosyal medya gibi başka sitelerden gelen betikler telefonda tarayıcının ana iş parçacığını toplam yarım saniyeden uzun meşgul etti. Bu sürede sayfa tıklamalara geç yanıt verir. Hangi hizmetin ne kadar sürdüğü bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Des scripts d'autres sites (publicité, chat, analytics, réseaux sociaux) ont occupé le thread principal du navigateur plus d'une demi-seconde au total sur un téléphone. Pendant ce temps, la page réagit tardivement aux appuis. Le temps pris par chaque service figure dans les détails du constat. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Kullanmadığınız etiketleri kaldırın, kalanları sayfa açıldıktan sonra yükleyin; sohbet ya da video gibi ağır gömülü öğeleri tıklanınca yüklenen bir önizlemeyle değiştirin.":
    "Supprimez les balises inutilisées, chargez les autres après l'ouverture de la page et remplacez les intégrations lourdes, comme un chat ou une vidéo, par un aperçu qui se charge au clic.",
  "Ana içeriğin yüklenmesi iyileştirilebilir (LCP)":
    "Le contenu principal pourrait se charger plus vite (LCP)",
  "Sayfanın en büyük öğesi 2,5 ile 4 saniye arasında göründü. Google bu aralığı 'iyileştirilmeli' sayar; 2,5 saniye ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa PageSpeed Insights'ın laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.":
    "Le plus grand élément de la page est apparu entre 2,5 et 4 secondes. Google classe cette plage « À améliorer » ; 2,5 secondes ou moins est « Bon ». La valeur provient des données de vrais utilisateurs de Chrome (données terrain) quand il y en a, sinon de la mesure de laboratoire de PageSpeed Insights ; les détails précisent laquelle.",
  "En büyük öğe genelde kapak görseli ya da ana başlıktır: görseli küçültüp WebP gibi hafif bir biçime çevirin, geç yüklenmesini kapatın ve onu engelleyen betik ve yazı tiplerini erteleyin.":
    "Le plus grand élément est généralement l'image de couverture ou le titre principal : allégez l'image et convertissez-la dans un format léger comme WebP, désactivez son chargement différé et différez les scripts et polices qui la bloquent.",
  "Yüklenirken içerik biraz kayıyor (CLS)":
    "Le contenu se décale un peu pendant le chargement (CLS)",
  "Sayfa yüklenirken içerik 0,1 ile 0,25 arasında kaydı. Google bu aralığı 'iyileştirilmeli' sayar; 0,1 ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.":
    "Le contenu s'est décalé de 0,1 à 0,25 pendant le chargement de la page. Google classe cette plage « À améliorer » ; 0,1 ou moins est « Bon ». La valeur provient des données de vrais utilisateurs de Chrome (données terrain) quand il y en a, sinon de la mesure de laboratoire ; les détails précisent laquelle.",
  "Görsellere ve gömülü çerçevelere genişlik ile yükseklik verin, sonradan yüklenen afiş ve reklamlar için yer ayırın, özel yazı tipi için yerleşimi bozmayan bir yedek tanımlayın.":
    "Donnez une largeur et une hauteur aux images et cadres intégrés, réservez l'espace des bannières et publicités chargées plus tard, et définissez pour les polices personnalisées une police de secours qui ne casse pas la mise en page.",
  "Tıklamalara yanıt iyileştirilebilir (INP)":
    "Les réponses aux appuis pourraient être plus rapides (INP)",
  "Sayfa tıklama ve dokunuşlara 200 ile 500 milisaniye arasında yanıt verdi. Google bu aralığı 'iyileştirilmeli' sayar; 200 milisaniye ve altı 'iyi'dir. Laboratuvar testi etkileşimi taklit edemediği için bu değer Chrome kullanıcılarının gerçek (alan) verisidir.":
    "La page a répondu aux clics et aux appuis en 200 à 500 millisecondes. Google classe cette plage « À améliorer » ; 200 millisecondes ou moins est « Bon ». Comme un test de laboratoire ne peut pas simuler d'interaction, cette valeur provient des données de vrais utilisateurs de Chrome (données terrain).",
  "Tıklamada çalışan uzun betikleri bölün, üçüncü taraf etiketleri sayfa açıldıktan sonra yükleyin ve gereksiz olanları kaldırın.":
    "Découpez les longs scripts exécutés au clic, chargez les balises tierces après l'ouverture de la page et supprimez celles dont vous n'avez pas besoin.",
  "Bazı metinlerin renk karşıtlığı yetersiz":
    "Certains textes manquent de contraste",
  "Bazı metinler arka planlarıyla yeterince ayrışmıyor; az gören ziyaretçiler ve güneş altında telefon kullananlar onları zor okur. Kaç öğenin etkilendiği ayrıntıda yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Certains textes ne se détachent pas assez de leur arrière-plan ; les visiteurs malvoyants et ceux qui utilisent leur téléphone en plein soleil ont du mal à les lire. Les détails indiquent combien d'éléments sont concernés. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Normal metin için en az 4,5:1, büyük metin için 3:1 karşıtlık oranı sağlayın. Hangi öğelerin yetersiz kaldığını PageSpeed Insights'ın Erişilebilirlik bölümünde görürsünüz.":
    "Assurez un rapport de contraste d'au moins 4,5:1 pour le texte normal et 3:1 pour le grand texte. La section Accessibilité de PageSpeed Insights indique les éléments insuffisants.",
  "Görsellerde alternatif metin eksik (Lighthouse)":
    "Des images n'ont pas de texte alternatif (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra alternatif metni (alt) olmayan görseller buldu. Bu, JavaScript'in sonradan eklediği görselleri de kapsar. Ekran okuyucular bu görselleri anlatamaz, Google da ne gösterdiklerini metinden öğrenemez. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse a trouvé des images sans texte alternatif (alt) après l'exécution de la page dans le navigateur. Cela inclut les images ajoutées ensuite par JavaScript. Les lecteurs d'écran ne peuvent pas décrire ces images, et Google ne peut pas apprendre par le texte ce qu'elles montrent. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  'Her anlamlı görsele ne gösterdiğini anlatan kısa bir alt metni ekleyin; süs amaçlı görsellere boş alt="" verin.':
    'Donnez à chaque image porteuse de sens un court texte alt décrivant ce qu\'elle montre ; donnez aux images décoratives un alt="" vide.',
  "Form alanlarının etiketi yok (Lighthouse)":
    "Des champs de formulaire n'ont pas de libellé (Lighthouse)",
  "Bazı form alanlarına bağlı bir etiket yok. Ekran okuyucu kullanan ziyaretçi alana ne yazması gerektiğini duyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Certains champs de formulaire n'ont aucun libellé associé. Un visiteur qui utilise un lecteur d'écran n'entend pas ce qu'il doit saisir. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Her alana for özniteliğiyle bağlı bir <label> ekleyin; görünür etiket istenmiyorsa aria-label kullanın.":
    "Ajoutez à chaque champ un <label> relié par l'attribut for ; si vous ne voulez pas de libellé visible, utilisez aria-label.",
  "Bazı bağlantıların okunabilir adı yok":
    "Certains liens n'ont pas de nom lisible",
  'Bazı bağlantılarda ne metin ne de erişilebilir bir ad var (örneğin yalnızca bir simge). Ekran okuyucu bunları yalnızca "bağlantı" diye okur; Google da bağlantının neye gittiğini metinden anlayamaz. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    "Certains liens n'ont ni texte ni nom accessible (par exemple une simple icône). Un lecteur d'écran les annonce seulement comme « lien », et Google ne peut pas déduire du texte où ils mènent. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Bağlantıya görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.":
    "Ajoutez un texte visible au lien ; si c'est une simple icône, indiquez ce qu'il fait avec aria-label.",
  "Bazı düğmelerin okunabilir adı yok":
    "Certains boutons n'ont pas de nom lisible",
  'Bazı düğmelerde ne metin ne de erişilebilir bir ad var. Ekran okuyucu bunları yalnızca "düğme" diye okur. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    "Certains boutons n'ont ni texte ni nom accessible. Un lecteur d'écran les annonce seulement comme « bouton ». Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Düğmeye görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.":
    "Ajoutez un texte visible au bouton ; si c'est une simple icône, indiquez ce qu'il fait avec aria-label.",
  "Sayfanın tarayıcıda başlığı yok (Lighthouse)":
    "La page n'a pas de titre dans le navigateur (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra bir <title> bulamadı. Sekmede ve arama sonucunda başlık olarak gösterilecek bir şey yok. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse n'a trouvé aucun <title> après l'exécution de la page dans le navigateur. Rien ne peut s'afficher comme titre dans l'onglet ni dans les résultats de recherche. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Sayfanın <head> bölümüne sayfayı anlatan benzersiz bir <title> ekleyin; başlığı JavaScript ile sonradan yazıyorsanız sunucunun gönderdiği HTML'e taşıyın.":
    "Ajoutez dans le <head> un <title> unique qui décrit la page ; si JavaScript écrit le titre plus tard, placez-le dans le HTML envoyé par le serveur.",
  "Sayfanın dili tarayıcıda belirtilmemiş (Lighthouse)":
    "La langue de la page n'est pas déclarée dans le navigateur (Lighthouse)",
  "Lighthouse, <html> öğesinde lang özniteliği bulamadı. Ekran okuyucular metni yanlış dilin kurallarıyla okuyabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse n'a trouvé aucun attribut lang sur l'élément <html>. Les lecteurs d'écran risquent de lire le texte avec les règles d'une autre langue. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  'Sayfanın <html> etiketine dilini ekleyin, örneğin <html lang="tr">.':
    'Indiquez la langue de la page dans sa balise <html>, par exemple <html lang="fr">.',
  "Telefonda yakınlaştırma engellenmiş (Lighthouse)":
    "Le zoom est bloqué sur téléphone (Lighthouse)",
  "Sayfanın viewport ayarı ziyaretçinin metni büyütmesini engelliyor (user-scalable=no ya da düşük bir maximum-scale). Az gören ziyaretçiler sayfayı okuyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Le réglage viewport de la page empêche les visiteurs d'agrandir le texte (user-scalable=no ou un maximum-scale faible). Les visiteurs malvoyants ne peuvent pas lire la page. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  'Viewport etiketinden user-scalable=no ve maximum-scale değerini kaldırın; content="width=device-width, initial-scale=1" yeterlidir.':
    'Retirez user-scalable=no et la valeur maximum-scale de la balise viewport ; content="width=device-width, initial-scale=1" suffit.',
  "Dokunma hedefleri çok küçük ya da çok sık":
    "Les zones tactiles sont trop petites ou trop rapprochées",
  "Bazı düğme ve bağlantılar telefonda parmakla rahat dokunulamayacak kadar küçük ya da birbirine çok yakın. Ziyaretçi yanlış yere dokunur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Certains boutons et liens sont trop petits ou trop proches les uns des autres pour être touchés confortablement du doigt sur un téléphone. Les visiteurs appuient à côté. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Dokunulan öğelere en az 24×24 piksel alan verin ve aralarında boşluk bırakın; menü ve altbilgi bağlantıları genelde bunun için büyütülmelidir.":
    "Donnez aux éléments tactiles au moins 24×24 pixels et laissez de l'espace entre eux ; les liens du menu et du pied de page doivent généralement être agrandis.",
  "Başlık sırası tarayıcıda atlıyor (Lighthouse)":
    "L'ordre des titres saute des niveaux dans le navigateur (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra başlık düzeylerinin sırayla gitmediğini gördü (örneğin H2'den H4'e atlama). Ekran okuyucu kullananlar sayfada başlıklarla gezinir ve atlanan düzey yapıyı bozar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse a constaté que les niveaux de titre ne se suivent pas après l'exécution de la page dans le navigateur (par exemple un saut de H2 à H4). Les utilisateurs de lecteurs d'écran naviguent par les titres, et un niveau sauté casse la structure. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Başlıkları sırayla kullanın (H1, H2, H3); bir başlığı yalnızca küçük görünsün diye alt düzeyden seçmeyin, boyutu CSS ile ayarlayın.":
    "Utilisez les titres dans l'ordre (H1, H2, H3) ; ne choisissez pas un niveau inférieur juste pour qu'un titre paraisse petit, réglez sa taille en CSS.",
  "Sayfa güvensiz (http) istekler yapıyor":
    "La page fait des requêtes non sécurisées (http)",
  'Lighthouse, sayfanın kendisinin ya da yüklediği bazı dosyaların şifresiz http ile geldiğini gördü. Tarayıcı bu istekleri engelleyebilir ya da "Güvenli değil" uyarısı gösterebilir. Hangi adreslerin güvensiz olduğu ayrıntıda yazar. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    "Lighthouse a constaté que la page elle-même ou certains fichiers qu'elle charge arrivent sans chiffrement via http. Le navigateur peut bloquer ces requêtes ou afficher l'avertissement « Non sécurisé ». Les détails indiquent les adresses non sécurisées. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Sayfayı ve yüklediği tüm dosyaları https adresinden sunun; sayfadaki http:// ile başlayan dosya adreslerini https:// yapın.":
    "Servez la page et chaque fichier qu'elle charge en https ; remplacez par https:// les adresses de fichiers de la page qui commencent par http://.",
  "Sayfa açılırken tarayıcı hata kaydediyor":
    "Le navigateur enregistre des erreurs à l'ouverture de la page",
  "Sayfa açılırken tarayıcının konsoluna hata düştü: yüklenemeyen bir dosya, çalışırken çöken bir betik ya da engellenen bir istek. Bazıları ziyaretçiye görünmez, bazıları bir özelliğin çalışmadığını gösterir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Des erreurs sont apparues dans la console du navigateur à l'ouverture de la page : un fichier qui n'a pas pu se charger, un script qui a planté à l'exécution ou une requête bloquée. Certaines sont invisibles pour les visiteurs, d'autres signifient qu'une fonctionnalité ne marche pas. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Sayfayı Chrome'da açıp geliştirici araçlarının Konsol sekmesine bakın; ayrıntıdaki adreslerden başlayarak hataları giderin.":
    "Ouvrez la page dans Chrome et regardez l'onglet Console des outils de développement ; commencez par les adresses indiquées dans les détails.",
  "Sayfa tarayıcıların kaldıracağı özellikler kullanıyor":
    "La page utilise des fonctionnalités que les navigateurs suppriment",
  "Sayfa, Chrome'un kullanımdan kaldırdığı ya da kaldıracağı özellikleri kullanıyor. Şimdi çalışıyor olabilir ama bir tarayıcı güncellemesinden sonra bozulabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "La page utilise des fonctionnalités que Chrome a rendues obsolètes ou va supprimer. Elle peut fonctionner aujourd'hui mais casser après une mise à jour du navigateur. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "PageSpeed Insights raporundaki listeye bakın; genelde eski bir eklenti ya da kütüphanedir ve güncellemek yeterlidir.":
    "Consultez la liste dans le rapport PageSpeed Insights ; il s'agit généralement d'une ancienne extension ou bibliothèque, et la mettre à jour suffit.",
  "Tarayıcı sayfada sorunlar bildiriyor":
    "Le navigateur signale des problèmes sur la page",
  "Chrome'un geliştirici araçlarındaki \"Sorunlar\" bölümü bu sayfa için kayıt tuttu: örneğin engellenen çerezler, güvenlik başlığı sorunları ya da hatalı kaynak istekleri. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Le panneau « Issues » des outils de développement de Chrome a enregistré des entrées pour cette page : par exemple des cookies bloqués, des problèmes d'en-têtes de sécurité ou des requêtes de ressources défaillantes. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  'Sayfayı Chrome\'da açıp geliştirici araçlarının "Issues" (Sorunlar) sekmesine bakın ve listelenen sorunları giderin.':
    "Ouvrez la page dans Chrome, consultez l'onglet « Issues » des outils de développement et corrigez les problèmes listés.",
  "Bazı görseller yanlış oranla gösteriliyor":
    "Certaines images s'affichent dans de mauvaises proportions",
  "Bazı görseller, kendi en-boy oranlarından farklı bir oranda gösterildiği için basık ya da uzamış görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Certaines images paraissent écrasées ou étirées, car elles sont affichées dans un rapport différent de leurs propres proportions. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Görselin width ve height değerlerini kendi oranına uygun verin ya da CSS'te object-fit kullanın.":
    "Donnez à l'image une largeur et une hauteur qui respectent ses proportions, ou utilisez object-fit en CSS.",
  "Bazı görseller ekran için düşük çözünürlüklü":
    "Certaines images ont une résolution trop faible pour l'écran",
  "Bazı görseller, telefonun ekran yoğunluğuna göre gereğinden küçük çözünürlükte sunuluyor ve bulanık görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Certaines images sont servies dans une résolution inférieure à ce qu'exige la densité de l'écran du téléphone, et paraissent floues. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Görsellerin daha büyük sürümlerini srcset ile sunun, böylece tarayıcı ekrana uygun olanı seçer.":
    "Servez des versions plus grandes des images avec srcset pour que le navigateur choisisse celle qui convient à l'écran.",
  "Bazı bağlantılar taranamıyor (Lighthouse)":
    "Certains liens ne peuvent pas être explorés (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra Google'ın izleyemeyeceği bağlantılar buldu: geçerli bir href'i olmayan ya da yalnızca JavaScript ile çalışan bağlantılar. Google yalnızca href'i gerçek bir adres olan <a> bağlantılarını izler. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Après l'exécution de la page dans le navigateur, Lighthouse a trouvé des liens que Google ne peut pas suivre : des liens sans href valide ou qui ne fonctionnent qu'avec JavaScript. Google ne suit que les liens <a> dont le href est une vraie adresse. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Her bağlantıyı href özniteliği gerçek bir adres olan bir <a> etiketi yapın; javascript: ya da yalnızca onclick ile çalışan bağlantıları değiştirin.":
    "Faites de chaque lien une balise <a> dont le href est une vraie adresse ; remplacez les liens qui ne fonctionnent qu'avec javascript: ou onclick.",
  "Bağlantı metinleri açıklayıcı değil (Lighthouse)":
    "Les textes de lien ne sont pas descriptifs (Lighthouse)",
  'Bazı bağlantıların metni "buraya tıklayın" ya da "devamı" gibi gittiği yeri anlatmayan sözlerden oluşuyor. Google bağlantı metninden hedef sayfanın konusunu öğrenir. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    "Le texte de certains liens se compose de mots comme « cliquez ici » ou « en savoir plus », qui ne disent pas où ils mènent. Google déduit le sujet de la page cible à partir du texte du lien. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  'Bağlantı metnini gittiği sayfanın konusunu anlatacak şekilde yazın, örneğin "devamı" yerine "kargo ücretleri".':
    "Rédigez des textes de lien qui décrivent le sujet de la page cible, par exemple « frais de livraison » plutôt que « en savoir plus ».",
  "Google sayfayı dizine alamıyor (Lighthouse)":
    "Google ne peut pas indexer la page (Lighthouse)",
  "Tarayıcımız bu sayfayı dizine alınabilir gördü, ama Lighthouse'un ölçümünde Google'ın sayfayı dizine almasını engelleyen bir kural vardı (robots.txt, noindex etiketi ya da X-Robots-Tag başlığı). Kural yalnızca Google'a ya da yalnızca bazı ziyaretçilere gösteriliyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Notre robot a jugé cette page indexable, mais dans la mesure de Lighthouse une règle empêchait Google de l'indexer (robots.txt, une balise noindex ou un en-tête X-Robots-Tag). La règle n'est peut-être servie qu'à Google ou qu'à certains visiteurs. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Sayfanın aramada görünmesi gerekiyorsa robots.txt'teki ilgili Disallow satırını ve sayfadaki noindex kuralını kaldırın; sunucunun Googlebot'a farklı bir yanıt vermediğini kontrol edin.":
    "Si la page doit apparaître dans la recherche, retirez la ligne Disallow correspondante du robots.txt et la règle noindex de la page ; vérifiez que le serveur ne répond pas différemment à Googlebot.",
  "robots.txt dosyasında geçersiz satırlar var":
    "robots.txt contient des lignes invalides",
  "Lighthouse sitenin robots.txt dosyasında kurallara uymayan satırlar buldu. Google geçersiz satırları yok sayar, yani yazdığınız bir kural uygulanmıyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse a trouvé dans le robots.txt du site des lignes qui ne respectent pas les règles. Google ignore les lignes invalides : une règle que vous avez écrite peut donc ne pas s'appliquer. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  'robots.txt\'i açın ve PageSpeed Insights raporunda gösterilen satırları düzeltin; her satır "Alan: değer" biçiminde olmalı (User-agent, Disallow, Allow, Sitemap).':
    "Ouvrez robots.txt et corrigez les lignes indiquées dans le rapport PageSpeed Insights ; chaque ligne doit avoir la forme « Champ: valeur » (User-agent, Disallow, Allow, Sitemap).",
  "hreflang etiketleri geçersiz (Lighthouse)":
    "Les balises hreflang sont invalides (Lighthouse)",
  "Lighthouse, sayfadaki dil sürümü (hreflang) etiketlerinde geçersiz bir dil kodu ya da göreli bir adres buldu. Google geçersiz hreflang etiketlerini yok sayar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse a trouvé un code de langue invalide ou une adresse relative dans les balises de version linguistique (hreflang) de la page. Google ignore les balises hreflang invalides. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Her hreflang değerinin geçerli bir dil kodu (tr, en-GB gibi) ve adresin tam adres (https:// ile başlayan) olduğundan emin olun.":
    "Vérifiez que chaque valeur hreflang est un code de langue valide (fr, fr-CA, etc.) et que l'adresse est complète (commençant par https://).",
  "canonical etiketi geçersiz (Lighthouse)":
    "La balise canonique est invalide (Lighthouse)",
  "Lighthouse sayfanın canonical etiketini geçersiz buldu: birbiriyle çelişen birden çok adres, geçersiz bir adres, başka bir alan adına ya da sitenin ana sayfasına işaret eden bir adres olabilir. Google böyle bir canonical'ı yok sayabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse a jugé invalide la balise canonique de la page : il peut s'agir de plusieurs adresses contradictoires, d'une adresse invalide, ou d'une adresse sur un autre domaine ou sur la page d'accueil du site. Google peut ignorer une telle balise canonique. Ce constat provient du rapport Lighthouse produit par PageSpeed Insights lors de la mesure de la version mobile de la page.",
  "Sayfada tek bir canonical etiketi bırakın ve onu sayfanın kendi tam adresine (ya da gerçekten asıl olan sayfaya) yönlendirin.":
    "Gardez une seule balise canonique sur la page et faites-la pointer vers l'adresse complète de la page elle-même (ou vers la page qui est réellement l'original).",
  "Güvenli sayfada güvensiz görsel, video ya da çerçeve":
    "Image, vidéo ou cadre non sécurisé sur une page sécurisée",
  'Güvenli (https) sayfa bir görseli, videoyu, sesi ya da gömülü çerçeveyi (iframe) şifresiz http adresinden yüklüyor. Tarayıcılar böyle görsel ve medyayı https\'e çevirmeyi dener, olmazsa göstermez; http çerçeveleri ise doğrudan engeller. Ziyaretçi boş bir alan ya da "Güvenli değil" uyarısı görebilir.':
    "La page sécurisée (https) charge une image, une vidéo, un son ou un cadre intégré (iframe) depuis une adresse http non chiffrée. Les navigateurs tentent de passer ces images et médias en https et ne les affichent pas en cas d'échec ; les cadres http sont bloqués d'office. Le visiteur peut voir un espace vide ou l'avertissement « Non sécurisé ».",
  "Ayrıntıdaki adresleri https:// ile başlayacak şekilde değiştirin. Dosya kendi sitenizdeyse adresi göreli (/resimler/...) yazmak da yeter.":
    "Modifiez les adresses indiquées dans les détails pour qu'elles commencent par https://. Si le fichier est sur votre propre site, une adresse relative (/images/...) fonctionne aussi.",
  "Form bilgileri şifresiz gönderiliyor":
    "Les données du formulaire sont envoyées sans chiffrement",
  "Güvenli (https) sayfadaki bir form, doldurulan bilgileri şifresiz bir http adresine gönderiyor. Tarayıcılar gönderimden önce ziyaretçiyi uyarır ve bilgiler yolda okunabilir.":
    "Un formulaire de la page sécurisée (https) envoie ce qui est saisi vers une adresse http non chiffrée. Les navigateurs avertissent le visiteur avant l'envoi, et les données peuvent être lues en transit.",
  "Formun action adresini https:// ile başlayacak şekilde değiştirin ya da formu aynı sitedeki göreli bir adrese gönderin.":
    "Modifiez l'adresse action du formulaire pour qu'elle commence par https://, ou envoyez le formulaire vers une adresse relative du même site.",
  "Sayfa meta refresh ile yönlendiriyor": "La page redirige par meta refresh",
  'Sayfa, sunucu yönlendirmesi yerine HTML içindeki <meta http-equiv="refresh"> etiketiyle başka bir adrese gönderiyor. Google bunu anlar, ama sunucu tarafında bir 301 yönlendirmesini tercih eder; ziyaretçi de yönlendirmeden önce boş bir sayfa görebilir.':
    'La page envoie les visiteurs vers une autre adresse avec une balise <meta http-equiv="refresh"> dans le HTML au lieu d\'une redirection serveur. Google la comprend mais préfère une redirection 301 côté serveur ; le visiteur peut aussi voir une page blanche avant la redirection.',
  "Mümkünse yönlendirmeyi sunucuda (301 ya da 308) yapın ve meta refresh etiketini kaldırın.":
    "Si possible, redirigez côté serveur (301 ou 308) et supprimez la balise meta refresh.",
  "canonical adresi göreli yazılmış":
    "L'adresse canonique est écrite en relatif",
  "Sayfanın canonical etiketi tam adres yerine göreli bir yol (örneğin /urun) gösteriyor. Google göreli adresi çözebilir, ama tam adres kullanılmasını önerir; göreli yol, sayfa farklı bir adresten açıldığında yanlış yere işaret edebilir.":
    "La balise canonique de la page indique un chemin relatif (par exemple /produit) au lieu d'une adresse complète. Google sait résoudre les adresses relatives mais recommande des adresses complètes ; un chemin relatif peut pointer au mauvais endroit si la page est ouverte depuis une autre adresse.",
  "canonical adresini https:// ile başlayan tam adres olarak yazın.":
    "Écrivez l'adresse canonique en entier, en commençant par https://.",
  "canonical adresinde # parçası var":
    "L'adresse canonique contient un fragment #",
  "Sayfanın canonical adresi # ile başlayan bir parça içeriyor. Google adresin # sonrasını dikkate almaz, bu yüzden bu parça bir işe yaramaz ve genelde bir şablon hatasının işaretidir.":
    "L'adresse canonique de la page contient un fragment commençant par #. Google ignore tout ce qui suit le #, le fragment n'a donc aucun effet et signale généralement une erreur de modèle.",
  "canonical adresinden # ve sonrasını kaldırın.":
    "Supprimez le # et tout ce qui le suit de l'adresse canonique.",
  "canonical etiketi sayfanın gövdesinde":
    "La balise canonique est dans le corps de la page",
  "Sayfanın tek canonical etiketi <head> bölümünde değil, <body> içinde. Google canonical etiketini yalnızca <head> içinde okur; gövdedeki etiket yok sayılır, yani sayfanın aslında canonical'ı yok.":
    "L'unique balise canonique de la page se trouve dans <body>, pas dans la section <head>. Google ne lit la balise canonique que dans <head> ; celle du corps est ignorée, et la page n'a donc en pratique aucune canonique.",
  "canonical etiketini sayfanın <head> bölümüne taşıyın. Genelde bir eklentinin ya da şablonun etiketi yanlış yere yazmasından olur.":
    "Déplacez la balise canonique dans la section <head> de la page. Cela arrive généralement quand une extension ou un modèle écrit la balise au mauvais endroit.",
  "robots etiketleri birbiriyle çelişiyor":
    "Les balises robots se contredisent",
  "Sayfada birden fazla robots etiketi var ve biri izin verirken diğeri yasaklıyor (örneğin biri index, diğeri noindex). Google böyle bir çelişkide daha kısıtlayıcı olan kuralı uygular; yani sayfa büyük olasılıkla istediğinizden farklı işlenir.":
    "La page a plusieurs balises robots, et l'une autorise ce qu'une autre interdit (par exemple l'une dit index, l'autre noindex). En cas de conflit, Google applique la règle la plus restrictive : la page est donc probablement traitée autrement que vous ne le souhaitez.",
  "Sayfada tek bir robots etiketi bırakın. Genelde bir SEO eklentisi ile temanın aynı etiketi ayrı ayrı yazmasından olur.":
    "Gardez une seule balise robots sur la page. Cela arrive généralement quand une extension SEO et le thème écrivent chacun la même balise.",
  "Aramada sayfanın özeti gösterilmiyor":
    "La recherche n'affiche pas d'extrait de la page",
  "Sayfa dizine alınabilir, ama nosnippet ya da max-snippet:0 kuralı Google'ın arama sonucunda sayfanın metninden özet göstermesini engelliyor. Özetsiz bir sonuç daha az tıklanır. Bilerek yapılmış olabilir.":
    "La page peut être indexée, mais une règle nosnippet ou max-snippet:0 empêche Google d'afficher un extrait de son texte dans les résultats de recherche. Un résultat sans extrait reçoit moins de clics. C'est peut-être voulu.",
  "Bilerek değilse robots etiketinden ya da X-Robots-Tag başlığından nosnippet ve max-snippet:0 kuralını kaldırın.":
    "Si ce n'est pas voulu, retirez nosnippet et max-snippet:0 de la balise robots ou de l'en-tête X-Robots-Tag.",
  'Sayfa "bulunamadı" diyor ama başarılı yanıt veriyor':
    "La page dit « introuvable » mais répond avec succès",
  'Sayfanın başlığı ya da ana başlığı "404" ya da "sayfa bulunamadı" diyor, ama sunucu 200 (başarılı) kodu döndürüyor. Google böyle sayfaları "soft 404" sayar ve dizine almaz; ama taramaya zaman harcar ve gerçek bir hata sayfası olduğunu anlamakta gecikebilir.':
    "Le titre ou le titre principal de la page indique « 404 » ou « page introuvable », mais le serveur renvoie un code 200 (succès). Google traite ces pages comme des « soft 404 » et ne les indexe pas, mais il y consacre du temps d'exploration et peut mettre du temps à comprendre qu'il s'agit d'une page d'erreur.",
  "Sayfa gerçekten yoksa sunucunun 404 ya da 410 kodu döndürmesini sağlayın. Varsa başlığını ve içeriğini düzeltin.":
    "Si la page n'existe vraiment pas, faites renvoyer au serveur un code 404 ou 410. Si elle existe, corrigez son titre et son contenu.",
  "Sayfada yer tutucu metin (lorem ipsum) kalmış":
    "Un texte de remplissage (lorem ipsum) est resté sur la page",
  'Sayfanın görünen metninde "lorem ipsum" yer tutucu metni var. Tasarım aşamasından kalmış ve yayına unutulmuş içerik, ziyaretçiye ve Google\'a sayfanın bitmediğini söyler.':
    "Le texte visible de la page contient le texte de remplissage « lorem ipsum ». Un contenu resté de la phase de conception et publié par erreur montre aux visiteurs et à Google que la page n'est pas terminée.",
  "Yer tutucu metni gerçek içerikle değiştirin ya da o bölümü kaldırın.":
    "Remplacez le texte de remplissage par un vrai contenu ou supprimez cette section.",
  "E-posta adresi düz metin olarak açıkta":
    "Une adresse e-mail est exposée en texte clair",
  "Sayfada düz metin ya da mailto bağlantısı olarak bir e-posta adresi var. Spam gönderenlerin botları sayfaları bu adresler için tarar. Ziyaretçinin size ulaşması için gerekliyse sorun değildir.":
    "La page contient une adresse e-mail en texte brut ou sous forme de lien mailto. Les robots des spammeurs parcourent les pages à la recherche de ces adresses. Ce n'est pas un problème si les visiteurs en ont besoin pour vous joindre.",
  "İletişim için bir form kullanmayı düşünün ya da adresi spam filtresi güçlü bir kutuya yönlendirin.":
    "Envisagez un formulaire de contact, ou redirigez l'adresse vers une boîte dotée d'un filtre anti-spam efficace.",
  "Başlıktaki kelimeler sayfa içeriğinde geçmiyor":
    "Les mots du titre n'apparaissent pas dans le contenu de la page",
  "Sayfa başlığındaki (title) anlamlı kelimelerin hiçbiri ana başlıkta ya da sayfa metninde geçmiyor. Google başlığın sayfayı anlatıp anlatmadığına bakar; içerikle ilgisi olmayan bir başlığı arama sonucunda başka bir metinle değiştirebilir. Bu bir tahmindir: eş anlamlı kelimeler sayılmaz.":
    "Aucun des mots significatifs du titre de la page n'apparaît dans le titre principal ni dans le texte. Google vérifie qu'un titre décrit la page et peut remplacer, dans les résultats de recherche, un titre sans rapport avec le contenu par un autre texte. C'est une heuristique : les synonymes ne sont pas pris en compte.",
  "Başlığı sayfanın gerçekten anlattığı konuya göre yazın ya da başlıktaki ana kelimeyi ana başlıkta ve ilk paragrafta kullanın.":
    "Rédigez le titre autour du vrai sujet de la page, ou reprenez le mot principal du titre dans le titre principal et le premier paragraphe.",
  "Kuruluş yapısal verisinde sosyal profiller yok":
    "Les données structurées Organization ne listent aucun profil social",
  "Sayfadaki Organization yapısal verisinde sameAs özelliği yok. sameAs, kuruluşunuzun resmi sosyal medya ve kayıt profillerini (LinkedIn, Wikipedia gibi) gösterir; Google kuruluşu tanırken bu bağlantıları kullanır. Google bunu önerir, zorunlu tutmaz.":
    "Les données structurées Organization de la page n'ont pas de propriété sameAs. sameAs liste les profils officiels de votre organisation sur les réseaux sociaux et dans les registres (LinkedIn, Wikipédia, etc.) ; Google s'appuie sur ces liens pour reconnaître l'organisation. Google la recommande sans l'exiger.",
  'Organization yapısal verisine sameAs ekleyin ve içine resmi profil adreslerinizi liste olarak yazın, örneğin "sameAs": ["https://www.linkedin.com/company/..."].':
    'Ajoutez sameAs aux données structurées Organization avec vos adresses de profil officielles sous forme de liste, par exemple "sameAs": ["https://www.linkedin.com/company/..."].',
  "Derindeki sayfada içerik yolu (breadcrumb) yok":
    "Une page profonde n'a pas de fil d'Ariane",
  "Ana sayfadan en az üç tıklama uzaktaki bu sayfada ne bir içerik yolu (breadcrumb) gezinmesi ne de BreadcrumbList yapısal verisi var. İçerik yolu ziyaretçiye nerede olduğunu gösterir; Google da arama sonucunda adres yerine bu yolu gösterebilir.":
    "Cette page, à au moins trois clics de la page d'accueil, n'a ni fil d'Ariane ni données structurées BreadcrumbList. Un fil d'Ariane montre aux visiteurs où ils se trouvent, et Google peut l'afficher à la place de l'adresse dans les résultats de recherche.",
  "Sayfanın üstüne Ana sayfa > Kategori > Sayfa biçiminde bir içerik yolu ekleyin ve BreadcrumbList yapısal verisiyle işaretleyin. Çoğu SEO eklentisi ikisini birlikte ekler.":
    "Ajoutez en haut de la page un fil d'Ariane du type Accueil > Catégorie > Page et balisez-le avec des données structurées BreadcrumbList. La plupart des extensions SEO ajoutent les deux à la fois.",
  "Sayfalamanın devam sayfası aramadan gizlenmiş":
    "Une page suivante d'une liste paginée est masquée de la recherche",
  "Bir listenin 2. ya da sonraki sayfası noindex ile aramadan gizlenmiş. Google'ın sayfalama rehberi her sayfanın kendi adresiyle dizine girebilmesini önerir. Uzun süre noindex kalan bir sayfadaki bağlantıları Google zamanla izlemeyi bırakabilir; o zaman yalnızca bu sayfalardan bağlantı alan ürün ya da yazılar bulunmaz olur.":
    "La page 2 ou une page suivante d'une liste est masquée de la recherche par noindex. Les recommandations de Google sur la pagination préconisent que chaque page puisse être indexée à sa propre adresse. Sur une page qui reste longtemps en noindex, Google peut finir par ne plus suivre les liens ; les produits ou articles liés uniquement depuis ces pages deviennent alors introuvables.",
  "Sayfalama sayfalarından noindex'i kaldırın ve her birine kendi adresini canonical olarak verin.":
    "Retirez noindex des pages paginées et donnez à chacune sa propre adresse comme canonique.",
  "Güvenli sitede iç bağlantılar http adresine gidiyor":
    "Sur un site sécurisé, des liens internes pointent vers des adresses http",
  "Site https ile çalışıyor, ama bu sayfadaki bazı bağlantılar sitenin kendi sayfalarına http:// ile veriliyor. Her tıklama önce bir yönlendirmeden geçer ya da ziyaretçi güvensiz sürüme düşer; Google da aynı sayfanın iki adresini görür.":
    "Le site fonctionne en https, mais certains liens de cette page pointent vers ses propres pages en http://. Chaque clic passe d'abord par une redirection ou fait tomber le visiteur sur la version non sécurisée, et Google voit deux adresses pour la même page.",
  "Şablondaki ve içerikteki iç bağlantıları https:// ile ya da göreli (/sayfa) olarak yazın. Veritabanında eski http adreslerini toplu değiştirmek genelde en hızlı yoldur.":
    "Écrivez les liens internes des modèles et du contenu en https:// ou en relatif (/page). Remplacer en masse les anciennes adresses http dans la base de données est généralement le plus rapide.",
  "Sayfanın içine gömülü kod çok büyük":
    "Le code intégré à la page est très volumineux",
  "Sayfanın HTML'ine doğrudan gömülmüş betik ve stil kodu 100 KB'ı geçiyor. Gömülü kod tarayıcı önbelleğinde saklanmaz ve her sayfa açılışında yeniden indirilir; sayfa da ilk içeriği göstermeden önce bu kodu okumak zorunda kalır.":
    "Le code de script et de style intégré directement dans le HTML de la page dépasse 100 Ko. Le code intégré n'est pas conservé dans le cache du navigateur et est retéléchargé à chaque affichage ; la page doit aussi le lire avant d'afficher le premier contenu.",
  "Büyük gömülü betik ve stilleri ayrı dosyalara taşıyın; yalnızca ilk ekran için gereken küçük CSS'i gömülü bırakın.":
    "Déplacez les gros scripts et styles intégrés dans des fichiers séparés ; ne gardez intégré que le petit CSS nécessaire au premier écran.",
  "Blog var ama RSS/Atom akışı bildirilmemiş":
    "Il y a un blog mais aucun flux RSS/Atom déclaré",
  "Sitede yazı (Article, BlogPosting) olarak işaretlenmiş sayfalar var, ama taranan hiçbir sayfa bir RSS ya da Atom akışı bildirmiyor. Akış, okuyucuların ve haber toplayıcıların yeni yazılarınızı izlemesini sağlar; Google da yeni içeriği daha çabuk keşfedebilir.":
    "Le site a des pages balisées comme articles (Article, BlogPosting), mais aucune page explorée ne déclare de flux RSS ou Atom. Un flux permet aux lecteurs et aux agrégateurs d'actualités de suivre vos nouveaux articles, et Google peut découvrir plus vite les nouveaux contenus.",
  'Bir RSS ya da Atom akışı yayınlayın ve sayfaların <head> bölümüne <link rel="alternate" type="application/rss+xml" href="/feed"> ile bildirin. Çoğu blog altyapısında akış hazırdır, yalnızca etiketin eklenmesi gerekir.':
    'Publiez un flux RSS ou Atom et déclarez-le dans le <head> des pages avec <link rel="alternate" type="application/rss+xml" href="/feed">. La plupart des plateformes de blog ont déjà un flux ; il ne manque que la balise.',
  "Başka bir siteye verilen bağlantı kırık":
    "Un lien vers un autre site est cassé",
  "Bu sayfadaki bir bağlantı başka bir sitede açılmayan bir adrese gidiyor: adres 404 ya da başka bir hata veriyor, ya da alan adı artık yok. Ziyaretçi bir hata sayfasına düşer ve sayfanız bakımsız görünür. Botlara kapalı siteler (sosyal ağlar gibi) ve yanıt vermeyen adresler kırık sayılmaz, kontrol edilmemiş sayılır.":
    "Un lien de cette page mène à une adresse d'un autre site qui ne s'ouvre pas : l'adresse renvoie 404 ou une autre erreur, ou le domaine n'existe plus. Le visiteur tombe sur une page d'erreur et votre page paraît laissée à l'abandon. Les sites fermés aux robots (comme les réseaux sociaux) et les adresses qui ne répondent pas ne sont pas comptés comme cassés, mais comme non vérifiés.",
  "Bağlantıyı hedefin yeni adresine güncelleyin ya da kaldırın. Ayrıntıda hangi adresin hangi yanıtı verdiği yazar.":
    "Mettez à jour le lien vers la nouvelle adresse de la cible ou supprimez-le. Les détails indiquent quelle adresse a donné quelle réponse.",
  "Görsel dosyası çok büyük": "Fichier image trop lourd",
  "Sayfadaki bir ya da daha fazla görsel dosyası 200 KB'tan büyük (ayrıntıda 500 KB'ı geçenler ayrıca sayılır). Boyut, dosyanın kendisine istek gönderilerek ölçüldü. Büyük görseller özellikle mobil bağlantıda sayfayı yavaşlatır.":
    "Un ou plusieurs fichiers image de la page dépassent 200 Ko (ceux de plus de 500 Ko sont comptés à part dans les détails). La taille a été mesurée en demandant le fichier lui-même. Les images lourdes ralentissent la page, surtout sur les connexions mobiles.",
  "Görseli gösterildiği boyuta küçültün, sıkıştırın ve WebP ya da AVIF biçimine çevirin. Çoğu fotoğraf bu işlemden sonra 100 KB'ın altına iner.":
    "Redimensionnez l'image à sa taille d'affichage, compressez-la et convertissez-la en WebP ou AVIF. La plupart des photos passent alors sous 100 Ko.",
  "Dış bağlantıları ve görsel boyutlarını da kontrol et":
    "Vérifier aussi les liens sortants et le poids des images",
  "Dış kontroller": "Vérifications externes",
  "Tarama bittikten sonra başka sitelere verilen bağlantıların açılıp açılmadığına ve sitenizdeki görsel dosyalarının boyutuna bakar. En çok 300 adres sorulur; sosyal ağlar gibi botları engelleyen siteler atlanır.":
    "Après l'exploration, vérifie que les liens vers d'autres sites s'ouvrent encore et mesure les fichiers image de votre site. 300 adresses au plus sont demandées ; les sites qui bloquent les robots, comme les réseaux sociaux, sont ignorés.",
  "Site hem www ile hem www'siz açılıyor": "Le site s'ouvre avec et sans www",
  "Sitenizin www'li ve www'siz adresi ikisi de sayfayı açıyor; biri ötekine yönlendirmiyor. Google bunları aynı içeriğin iki kopyası olarak görür, hangisini göstereceğini kendisi seçer ve bağlantıların değeri iki adres arasında bölünebilir.":
    "L'adresse avec www et celle sans www de votre site servent toutes deux la page ; aucune ne redirige vers l'autre. Google y voit deux copies du même contenu, choisit lui-même laquelle afficher, et la valeur des liens peut se répartir entre les deux adresses.",
  'Bir adresi asıl seçin (genelde zaten kullandığınız) ve ötekinden ona kalıcı (301) yönlendirme verin. Barındırma panellerinde bu genelde "www\'ye yönlendir" ya da "www\'siz adrese yönlendir" ayarıdır.':
    "Choisissez une adresse principale (généralement celle que vous utilisez déjà) et redirigez l'autre vers elle de façon permanente (301). Dans les panneaux d'hébergement, c'est généralement un réglage « rediriger vers www » ou « rediriger vers sans www ».",
  "Var olmayan sayfa 404 yerine 200 dönüyor":
    "Une page inexistante renvoie 200 au lieu de 404",
  'Sitede olmayan rastgele bir adres istedik, sunucu "bulunamadı" (404) yerine "tamam" (200) yanıtı verdi. Google bunu yumuşak 404 sayar: silinen ya da yanlış yazılan adresler gerçek sayfa gibi görünür, tarama boşa gider ve boş sayfalar dizine girebilir.':
    "Nous avons demandé une adresse aléatoire inexistante sur le site, et le serveur a répondu « OK » (200) au lieu de « introuvable » (404). Google compte cela comme un soft 404 : les adresses supprimées ou mal saisies ressemblent à de vraies pages, l'exploration est gaspillée et des pages vides peuvent être indexées.",
  'Sitenizin hata sayfası ayarını kontrol edin: olmayan adresler için 404 durum kodu dönmeli. İçerik yönetim sisteminizde "özel 404 sayfası" varsa sayfanın içeriği aynı kalabilir, yalnızca durum kodu 404 olmalı.':
    "Vérifiez le réglage de la page d'erreur de votre site : les adresses inexistantes doivent renvoyer le code d'état 404. Si votre CMS propose une « page 404 personnalisée », son contenu peut rester tel quel ; seul le code d'état doit être 404.",
  "Var olmayan sayfalar ana sayfaya yönlendiriliyor":
    "Les pages inexistantes redirigent vers la page d'accueil",
  "Sitede olmayan rastgele bir adres istedik, sunucu bizi ana sayfaya yönlendirdi. Google bunu genelde yumuşak 404 sayar ve yönlendirmeyi yok sayar; ziyaretçi de aradığını bulamadığını anlamadan ana sayfaya düşer.":
    "Nous avons demandé une adresse aléatoire inexistante sur le site, et le serveur nous a redirigés vers la page d'accueil. Google compte généralement cela comme un soft 404 et ignore la redirection ; les visiteurs arrivent sur la page d'accueil sans comprendre que ce qu'ils cherchaient n'existe pas.",
  "Olmayan adreslerde 404 dönen, arama kutusu ya da önemli bağlantılar içeren bir hata sayfası gösterin. Yalnızca taşınan sayfaları yeni adreslerine yönlendirin.":
    "Affichez pour les adresses inexistantes une page d'erreur qui renvoie 404 et propose un champ de recherche ou des liens clés. Ne redirigez que les pages réellement déplacées vers leur nouvelle adresse.",
  "Site simgesi (favicon) bulunamadı": "Icône du site (favicon) introuvable",
  "Sayfada bir site simgesi tanımlanmamış ve /favicon.ico adresi de bir simge döndürmüyor (ya da tanımlanan simge açılmıyor). Google mobil arama sonuçlarında sitenizin adının yanında bu simgeyi gösterir; yoksa genel bir simge çıkar ve sonuç daha az fark edilir.":
    "La page ne déclare aucune icône de site et /favicon.ico n'en renvoie pas non plus (ou l'icône déclarée ne se charge pas). Google affiche cette icône à côté du nom de votre site dans les résultats de recherche mobiles ; sans elle, une icône générique apparaît et le résultat se remarque moins.",
  'En az 48x48 piksellik kare bir simge hazırlayın, sitenize yükleyin ve sayfaların <head> bölümüne `<link rel="icon" href="/favicon.ico">` ekleyin. Site oluşturucularda bu genelde "site simgesi" ayarıdır.':
    'Créez une icône carrée d\'au moins 48x48 pixels, mettez-la en ligne sur votre site et ajoutez `<link rel="icon" href="/favicon.ico">` dans le <head> de vos pages. Dans les créateurs de sites, c\'est généralement le réglage « icône du site ».',
  "robots.txt tüm siteyi Google'a kapatıyor":
    "robots.txt ferme tout le site à Google",
  "robots.txt dosyanız Googlebot'un ana sayfayı taramasını yasaklıyor (genelde `Disallow: /` satırı). Google sitenizi taramaz; sayfalar arama sonuçlarından zamanla düşer ya da açıklamasız görünür. Çoğu zaman geliştirme sırasında konup unutulmuş bir kuraldır.":
    "Votre robots.txt interdit à Googlebot d'explorer la page d'accueil (généralement une ligne `Disallow: /`). Google n'explore pas votre site ; les pages disparaissent de la recherche avec le temps ou apparaissent sans description. Il s'agit souvent d'une règle ajoutée pendant le développement puis oubliée.",
  "robots.txt'teki `Disallow: /` satırını kaldırın ya da yalnızca gizli kalması gereken klasörlerle sınırlayın. Sonra Search Console'daki robots.txt raporundan Google'ın yeni dosyayı okuduğunu kontrol edin.":
    "Retirez la ligne `Disallow: /` du robots.txt ou limitez-la aux dossiers qui doivent rester masqués. Vérifiez ensuite dans le rapport robots.txt de la Search Console que Google a lu le nouveau fichier.",
  "robots.txt site haritasını göstermiyor":
    "robots.txt ne pointe pas vers le sitemap",
  "robots.txt dosyanızda `Sitemap:` satırı yok. Arama motorları site haritasını bu satırdan da bulur; Search Console'a gönderdiyseniz Google için sorun değildir, ama Bing ve diğer tarayıcılar için en kolay yoldur.":
    "Votre robots.txt n'a pas de ligne `Sitemap:`. Les moteurs de recherche trouvent aussi le sitemap grâce à cette ligne ; si vous l'avez envoyé dans la Search Console, ce n'est pas un problème pour Google, mais c'est le moyen le plus simple pour Bing et les autres robots.",
  "robots.txt'in sonuna site haritanızın tam adresiyle bir satır ekleyin, örneğin `Sitemap: https://alanadiniz.com/sitemap.xml`.":
    "Ajoutez à la fin du robots.txt une ligne avec l'adresse complète de votre sitemap, par exemple `Sitemap: https://votredomaine.fr/sitemap.xml`.",
  "Bazı yapay zekâ tarayıcıları robots.txt ile engellenmiş":
    "Certains robots d'IA sont bloqués par robots.txt",
  "robots.txt dosyanız bazı yapay zekâ tarayıcılarının (örneğin GPTBot, ClaudeBot, PerplexityBot) sitenizi taramasını yasaklıyor. Bu bir tercih: içeriğinizin yapay zekâ eğitiminde kullanılmasını istemiyorsanız doğrudur. Ama bu asistanların arama ve yanıt özelliklerinde sitenizin görünmesini de azaltabilir. Google araması etkilenmez.":
    "Votre robots.txt interdit à certains robots d'IA (GPTBot, ClaudeBot, PerplexityBot, par exemple) d'explorer votre site. C'est un choix : il est justifié si vous ne voulez pas que votre contenu serve à entraîner des IA. Mais il peut aussi réduire la présence de votre site dans les fonctions de recherche et de réponse de ces assistants. La recherche Google n'est pas concernée.",
  "Bilerek engellediyseniz bir şey yapmanıza gerek yok. Yapay zekâ yanıtlarında görünmek istiyorsanız arama amaçlı tarayıcılara (OAI-SearchBot, Claude-SearchBot, PerplexityBot gibi) izin verip yalnızca eğitim tarayıcılarını (GPTBot, ClaudeBot, Google-Extended gibi) engelleyebilirsiniz.":
    "Si vous les avez bloqués volontairement, rien à faire. Si vous voulez apparaître dans les réponses des IA, vous pouvez autoriser les robots de recherche (comme OAI-SearchBot, Claude-SearchBot, PerplexityBot) et ne bloquer que les robots d'entraînement (comme GPTBot, ClaudeBot, Google-Extended).",
  "llms.txt dosyası yok (isteğe bağlı)": "Aucun fichier llms.txt (facultatif)",
  "Sitenizin kökünde llms.txt dosyası yok. Bu dosya yapay zekâ asistanlarına sitenin önemli sayfalarını kısa bir listeyle anlatmak için önerilen yeni bir biçimdir. Henüz bir standart değildir ve Google bunu kullanmaz; yoksa bir sorun yoktur.":
    "Il n'y a pas de fichier llms.txt à la racine de votre site. Ce fichier est un format récemment proposé pour décrire en une courte liste les pages importantes d'un site aux assistants d'IA. Ce n'est pas encore un standard et Google ne l'utilise pas ; ne pas en avoir n'est pas un problème.",
  "İsterseniz sitenizin kökünde /llms.txt adresine, sitenin ne olduğunu bir paragrafta anlatan ve önemli sayfalarınızı bağlantılarıyla listeleyen düz metin (Markdown) bir dosya koyun.":
    "Si vous le souhaitez, placez à la racine de votre site un fichier texte (Markdown) /llms.txt qui décrit le site en un paragraphe et liste vos pages importantes avec leurs liens.",
  "Başlangıç sayfasının HTML'i 2 MB'tan büyük":
    "Le HTML de la page de départ dépasse 2 Mo",
  "Başlangıç sayfasının HTML'i 2 MB'ı aşıyor. Google bir HTML dosyasının yalnızca ilk 2 MB'ını işler; sonrasındaki içerik ve bağlantılar Google için yok sayılır. Büyük HTML ayrıca yavaş mobil bağlantılarda sayfayı geciktirir.":
    "Le HTML de la page de départ dépasse 2 Mo. Google ne traite que les 2 premiers Mo d'un fichier HTML ; le contenu et les liens au-delà sont ignorés. Un HTML volumineux ralentit aussi la page sur les connexions mobiles lentes.",
  "HTML'in içine gömülü büyük verileri (satır içi görseller, büyük JSON, tekrar eden menüler) ayrı dosyalara taşıyın. Uzun listeleri sayfalara bölün.":
    "Déplacez dans des fichiers séparés les données volumineuses intégrées au HTML (images inline, gros JSON, menus répétés). Découpez les longues listes en plusieurs pages.",
  "Başlangıç sayfası sıkıştırılmadan geldi":
    "La page de départ est arrivée sans compression",
  "Denetim başlangıç sayfasını gzip ve brotli kabul ettiğini söyleyerek istedi, ama yanıtta Content-Encoding başlığı yoktu: sayfa sıkıştırılmadan geldi. Sıkıştırma HTML'i genelde 4-5 kat küçültür ve sayfayı hızlandırır. Bazı ara sunucular ve CDN'ler sıkıştırmayı yalnızca tarayıcılara uyguladığı için tarayıcıda da doğrulayın.":
    "L'audit a demandé la page de départ en indiquant qu'il accepte gzip et brotli, mais la réponse n'avait pas d'en-tête Content-Encoding : la page est arrivée sans compression. La compression réduit généralement le HTML de 4 à 5 fois et accélère la page. Certains proxys et CDN ne compressent que pour les navigateurs : vérifiez-le aussi dans un navigateur.",
  "Sunucunuzda ya da CDN'de gzip veya brotli sıkıştırmayı açın. Sonucu tarayıcının geliştirici araçlarında, yanıt başlıklarında `content-encoding` satırına bakarak doğrulayın.":
    "Activez la compression gzip ou brotli sur votre serveur ou CDN. Vérifiez le résultat dans les outils de développement du navigateur en cherchant la ligne `content-encoding` dans les en-têtes de réponse.",
  "Sunucu ilk yanıtı geç veriyor (TTFB)":
    "Le serveur tarde à envoyer sa première réponse (TTFB)",
  "Başlangıç sayfasının ilk baytı 800 milisaniyeden geç geldi; web.dev bu sınırın altını önerir. Sunucu yanıtı geç başlarsa sayfadaki her şey o kadar geç başlar. Süre, denetimi çalıştıran bilgisayardan iki ayrı istekle ölçülür ve hızlı olanı esas alınır; yine de ağa göre değişebilir.":
    "Le premier octet de la page de départ est arrivé après plus de 800 millisecondes ; web.dev recommande de rester en dessous. Si la réponse du serveur commence tard, tout le reste de la page commence d'autant plus tard. Le temps est mesuré par deux requêtes distinctes depuis l'ordinateur qui exécute l'audit, et la plus rapide compte ; il peut tout de même varier selon le réseau.",
  "Sayfa önbelleğini açın, yavaş veritabanı sorgularını ve eklentileri bulun, ziyaretçilerinize yakın bir CDN kullanın. Sorun sürerse barındırma paketinizi gözden geçirin.":
    "Activez la mise en cache des pages, repérez les requêtes de base de données et extensions lentes, et utilisez un CDN proche de vos visiteurs. Si le problème persiste, revoyez votre offre d'hébergement.",
  "http adresi https'e yönlendirilmiyor":
    "L'adresse http ne redirige pas vers https",
  'Sitenizin http:// ile başlayan adresi şifreli https sürümüne yönlendirmiyor, sayfayı düz http ile açıyor. Ziyaretçi adresi elle yazdığında ya da eski bir bağlantıdan geldiğinde güvenli olmayan sürümde kalır ve tarayıcı "Güvenli değil" uyarısı gösterir. Google da aynı içeriğin iki sürümünü görür.':
    "L'adresse http:// de votre site ne redirige pas vers la version chiffrée en https ; elle ouvre la page en http simple. Les visiteurs qui tapent l'adresse à la main ou viennent d'un ancien lien restent sur la version non sécurisée, et le navigateur affiche l'avertissement « Non sécurisé ». Google voit aussi deux versions du même contenu.",
  'Sunucunuzda ya da barındırma panelinizde "HTTPS\'e zorla" ayarını açın; yoksa tüm http isteklerini aynı adresin https karşılığına kalıcı (301) yönlendiren bir kural ekleyin.':
    "Activez le réglage « Forcer HTTPS » sur votre serveur ou votre panneau d'hébergement ; sinon, ajoutez une règle qui redirige de façon permanente (301) chaque requête http vers l'équivalent https de la même adresse.",
  "HSTS başlığı yok": "Pas d'en-tête HSTS",
  'Sayfa https ile açılıyor ama Strict-Transport-Security (HSTS) başlığı göndermiyor. Bu başlık tarayıcıya "bu siteye bundan sonra hep https ile gel" der. Olmadığında ilk istek http ile gidebilir ve araya giren biri ziyaretçiyi güvensiz sürüme düşürebilir.':
    "La page s'ouvre en https mais n'envoie pas d'en-tête Strict-Transport-Security (HSTS). Cet en-tête dit au navigateur : « désormais, viens toujours sur ce site en https ». Sans lui, la première requête peut passer en http, et un intermédiaire peut rabattre le visiteur vers la version non sécurisée.",
  "Sunucu yanıtına `Strict-Transport-Security: max-age=31536000; includeSubDomains` başlığını ekleyin. Önce tüm alt alan adlarınızın https ile çalıştığından emin olun; tarayıcı bu süre boyunca http'yi denemez.":
    "Ajoutez l'en-tête `Strict-Transport-Security: max-age=31536000; includeSubDomains` à la réponse du serveur. Assurez-vous d'abord que tous vos sous-domaines fonctionnent en https ; les navigateurs n'essaieront plus http pendant cette durée.",
  "X-Content-Type-Options başlığı yok": "Pas d'en-tête X-Content-Type-Options",
  "Sunucu `X-Content-Type-Options: nosniff` başlığını göndermiyor. Bu başlık tarayıcının dosya türünü tahmin etmesini engeller; yoksa yüklenen bir dosya betik gibi çalıştırılabilir. Sıralamayı etkilemez, sitenin güvenlik düzenini gösterir.":
    "Le serveur n'envoie pas l'en-tête `X-Content-Type-Options: nosniff`. Cet en-tête empêche le navigateur de deviner le type d'un fichier ; sans lui, un fichier envoyé pourrait être exécuté comme un script. Il n'influe pas sur le classement ; il reflète la configuration de sécurité du site.",
  "Sunucu yanıtlarına `X-Content-Type-Options: nosniff` başlığını ekleyin. Çoğu barındırma panelinde ya da CDN'de güvenlik başlıkları ayarından tek tıkla açılır.":
    "Ajoutez l'en-tête `X-Content-Type-Options: nosniff` aux réponses du serveur. Dans la plupart des panneaux d'hébergement ou CDN, c'est une option en un clic dans les réglages des en-têtes de sécurité.",
  "Sayfa başka sitelerin çerçevesine gömülebiliyor":
    "La page peut être intégrée dans les cadres d'autres sites",
  "Ne X-Frame-Options başlığı ne de Content-Security-Policy içinde frame-ancestors kuralı var. Başka bir site sayfanızı görünmez bir çerçeveye koyup ziyaretçiyi istemediği bir yere tıklatabilir (clickjacking). Sıralamayı etkilemez.":
    "Il n'y a ni en-tête X-Frame-Options ni règle frame-ancestors dans une Content-Security-Policy. Un autre site pourrait placer votre page dans un cadre invisible et piéger les visiteurs pour qu'ils cliquent là où ils ne le voulaient pas (clickjacking). Cela n'influe pas sur le classement.",
  "Sayfanın başka sitelerde gösterilmesi gerekmiyorsa `Content-Security-Policy: frame-ancestors 'self'` ya da `X-Frame-Options: SAMEORIGIN` başlığını ekleyin.":
    "Si la page n'a pas à s'afficher sur d'autres sites, ajoutez l'en-tête `Content-Security-Policy: frame-ancestors 'self'` ou `X-Frame-Options: SAMEORIGIN`.",
  "Referrer-Policy başlığı yok": "Pas d'en-tête Referrer-Policy",
  "Sunucu Referrer-Policy başlığı göndermiyor. Güncel tarayıcılar bu durumda güvenli bir varsayılan kullanır, yani acil bir sorun değil; ama başlık, ziyaretçi başka siteye geçtiğinde adresinizin ne kadarının paylaşılacağını sizin belirlemenizi sağlar.":
    "Le serveur n'envoie pas d'en-tête Referrer-Policy. Les navigateurs actuels appliquent alors une valeur par défaut sûre, ce n'est donc pas urgent ; mais l'en-tête vous permet de décider quelle part de votre adresse est transmise quand un visiteur passe sur un autre site.",
  "Sunucu yanıtlarına `Referrer-Policy: strict-origin-when-cross-origin` başlığını ekleyin.":
    "Ajoutez l'en-tête `Referrer-Policy: strict-origin-when-cross-origin` aux réponses du serveur.",
  "SSL sertifikasının süresi 30 günden az":
    "Le certificat SSL expire dans moins de 30 jours",
  "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 30 günden az kaldı. Süre dolarsa tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar ve ziyaretçilerin çoğu geri döner. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.":
    "D'après les journaux publics de certificats (Certificate Transparency), le certificat le plus récent enregistré pour ce domaine expire dans moins de 30 jours. S'il expire, les navigateurs ouvrent le site avec un avertissement de sécurité en pleine page et la plupart des visiteurs font demi-tour. Le serveur utilise peut-être déjà un certificat plus récent qui n'apparaît pas encore dans les journaux ; vérifiez la date d'expiration via le cadenas de la barre d'adresse du navigateur.",
  "Sertifikanın otomatik yenilendiğini barındırma panelinizden kontrol edin. Let's Encrypt gibi otomatik sertifikalar genelde bitmeden 30 gün önce yenilenir; yenilenmediyse yenilemeyi elle başlatın.":
    "Vérifiez dans votre panneau d'hébergement que le certificat se renouvelle automatiquement. Les certificats automatiques comme Let's Encrypt se renouvellent généralement 30 jours avant expiration ; s'il ne l'a pas été, lancez le renouvellement manuellement.",
  "SSL sertifikasının süresi dolmak üzere":
    "Le certificat SSL est sur le point d'expirer",
  "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 14 günden az kaldı. Süre dolunca tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar; ziyaretçilerin çoğu siteye hiç giremez. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.":
    "D'après les journaux publics de certificats (Certificate Transparency), le certificat le plus récent enregistré pour ce domaine expire dans moins de 14 jours. Une fois expiré, les navigateurs ouvrent le site avec un avertissement de sécurité en pleine page ; la plupart des visiteurs ne peuvent plus y accéder. Le serveur utilise peut-être déjà un certificat plus récent qui n'apparaît pas encore dans les journaux ; vérifiez la date d'expiration via le cadenas de la barre d'adresse du navigateur.",
  "Sertifikayı hemen yenileyin ve sunucuya yükleyin. Otomatik yenileme varsa neden çalışmadığına bakın (DNS kaydı değişmiş, doğrulama dosyasına erişilemiyor gibi).":
    "Renouvelez le certificat immédiatement et installez-le sur le serveur. Si le renouvellement automatique est configuré, cherchez pourquoi il n'a pas fonctionné (un enregistrement DNS modifié ou un fichier de validation inaccessible, par exemple).",
  "Alan adının süresi 30 günden az": "Le domaine expire dans moins de 30 jours",
  "Alan adı kayıt bilgisine (RDAP) göre alan adınızın süresinin bitmesine 30 günden az kaldı. Yenilenmezse site ve e-postalar tamamen durur, alan adı başkasının eline geçebilir.":
    "D'après les données d'enregistrement du domaine (RDAP), votre domaine expire dans moins de 30 jours. S'il n'est pas renouvelé, le site et les e-mails s'arrêtent complètement et le domaine peut passer entre d'autres mains.",
  "Alan adını aldığınız firmadan süreyi uzatın ve otomatik yenilemeyi açın. Kayıttaki e-posta adresinin güncel olduğundan emin olun; hatırlatmalar oraya gider.":
    "Prolongez l'enregistrement auprès de la société qui vous a vendu le domaine et activez le renouvellement automatique. Vérifiez que l'adresse e-mail de l'enregistrement est à jour : c'est là que partent les rappels.",
  "Alan adında SPF kaydı yok": "Aucun enregistrement SPF sur le domaine",
  "Alan adınızın DNS'inde SPF kaydı (v=spf1 ile başlayan TXT kaydı) yok. SPF, alan adınız adına hangi sunucuların e-posta gönderebileceğini söyler. Yoksa başkaları sizin adınıza sahte e-posta gönderebilir ve sizin gerçek e-postalarınız spam klasörüne düşebilir. SEO'yu doğrudan etkilemez.":
    "Le DNS de votre domaine n'a pas d'enregistrement SPF (un enregistrement TXT commençant par v=spf1). SPF indique quels serveurs peuvent envoyer des e-mails au nom de votre domaine. Sans lui, d'autres peuvent envoyer de faux e-mails en votre nom et vos vrais e-mails peuvent finir en spam. Cela n'influe pas directement sur le SEO.",
  "E-postanızı gönderen hizmetin (Google Workspace, Microsoft 365, barındırma firması) önerdiği SPF kaydını DNS'e TXT olarak ekleyin. Alan adından hiç e-posta gönderilmiyorsa `v=spf1 -all` yeterlidir.":
    "Ajoutez au DNS, en enregistrement TXT, l'enregistrement SPF recommandé par le service qui envoie vos e-mails (Google Workspace, Microsoft 365, votre hébergeur). Si aucun e-mail n'est envoyé depuis le domaine, `v=spf1 -all` suffit.",
  "Alan adında DMARC kaydı yok": "Aucun enregistrement DMARC sur le domaine",
  "Alan adınızda DMARC kaydı (_dmarc alt adında v=DMARC1 ile başlayan TXT kaydı) yok. DMARC, SPF ve DKIM kontrolünden geçemeyen e-postalara ne yapılacağını söyler. Gmail ve Yahoo toplu gönderim yapan alan adlarından bu kaydı istiyor. SEO'yu doğrudan etkilemez.":
    "Votre domaine n'a pas d'enregistrement DMARC (un enregistrement TXT commençant par v=DMARC1 sur le sous-domaine _dmarc). DMARC indique que faire des e-mails qui échouent aux vérifications SPF et DKIM. Gmail et Yahoo l'exigent des domaines qui envoient des e-mails en masse. Cela n'influe pas directement sur le SEO.",
  "DNS'e `_dmarc` adıyla `v=DMARC1; p=none; rua=mailto:dmarc@alanadiniz.com` gibi bir TXT kaydı ekleyin. Raporları birkaç hafta izledikten sonra politikayı `quarantine` ya da `reject` yapın.":
    "Ajoutez au DNS un enregistrement TXT nommé `_dmarc`, par exemple `v=DMARC1; p=none; rua=mailto:dmarc@votredomaine.fr`. Après avoir observé les rapports quelques semaines, passez la politique à `quarantine` ou `reject`.",
  "Open Graph etiketleri eksik": "Balises Open Graph incomplètes",
  "Sayfada Open Graph etiketleri var ama başlık, açıklama ve görselden biri ya da birkaçı eksik. Bu etiketler sayfa Facebook, LinkedIn, WhatsApp gibi yerlerde paylaşıldığında görünen kartı belirler. Eksik olanı paylaşılan platform kendisi tahmin eder; çoğu zaman yanlış görsel ya da kesik bir metin çıkar. Google sıralamasını etkilemez.":
    "La page a des balises Open Graph, mais le titre, la description ou l'image manque. Ces balises déterminent la carte affichée quand la page est partagée sur Facebook, LinkedIn, WhatsApp et ailleurs. La plateforme devine ce qui manque, ce qui donne souvent une mauvaise image ou un texte coupé. Elles n'influent pas sur le classement Google.",
  "Eksik etiketi ekleyin: og:title, og:description ve og:image üçü birlikte olmalı. Görsel en az 1200x630 piksel olsun. SEO eklentiniz varsa sosyal paylaşım bölümünü doldurmanız yeter.":
    "Ajoutez la balise manquante : og:title, og:description et og:image vont ensemble. L'image doit faire au moins 1200x630 pixels. Si vous utilisez une extension SEO, il suffit de remplir sa section de partage social.",
  "X (Twitter) kart etiketi yok": "Pas de balise de carte X (Twitter)",
  "Sayfada Open Graph etiketleri var ama twitter:card etiketi yok. X başlık, açıklama ve görseli Open Graph'tan alabilir, ama kart türünü söyleyen bu etiket olmadan bağlantı kartsız, düz bir adres olarak görünebilir. Google sıralamasını etkilemez.":
    "La page a des balises Open Graph mais pas de balise twitter:card. X peut reprendre le titre, la description et l'image d'Open Graph, mais sans cette balise, qui indique le type de carte, le lien peut s'afficher comme une simple adresse sans carte. Cela n'influe pas sur le classement Google.",
  'Sayfanın head bölümüne <meta name="twitter:card" content="summary_large_image"> ekleyin. Diğer twitter: etiketlerine gerek yok; X eksikleri Open Graph etiketlerinden tamamlar.':
    'Ajoutez <meta name="twitter:card" content="summary_large_image"> dans le head de la page. Les autres balises twitter: ne sont pas nécessaires ; X les complète à partir des balises Open Graph.',
  "Başlık etiketi ile H1 aynı": "La balise title et le H1 sont identiques",
  "Sayfanın başlık etiketi (<title>) ile H1 başlığı birebir aynı. Bu bir hata değil ve Google bunu cezalandırmaz. Ama iki farklı yer, iki farklı fırsat demek: başlık arama sonucunda tıklatmak için, H1 sayfaya gelen ziyaretçiye konuyu söylemek için yazılır. Aynı metin ikisinden birini boşa harcar.":
    "La balise title (<title>) et le H1 de la page sont exactement identiques. Ce n'est pas une erreur et Google ne le pénalise pas. Mais deux emplacements, c'est deux occasions : le title sert à obtenir le clic dans les résultats de recherche, le H1 à dire au visiteur de quoi parle la page. Le même texte en gâche une.",
  "Başlığı arama sonucu için yazın (ana kelime başta, marka sonda), H1'i sayfadaki okur için yazın. Konu aynı kalsın, ifade farklı olsun.":
    "Écrivez le title pour le résultat de recherche (mot-clé principal en tête, marque en fin) et le H1 pour le lecteur sur la page. Gardez le sujet, variez la formulation.",
  "Başlık arama sonucunda kesilebilir":
    "Le titre risque d'être coupé dans les résultats de recherche",
  "Başlık 60 karakterin altında ama geniş harfler yüzünden yaklaşık 580 pikseli aşıyor. Google başlığı karakter sayısına göre değil, genişliğe göre keser; geniş büyük harfler (W, M) ve sayılar başlığı daha erken taşırır. Ölçüm, Google'ın masaüstünde kullandığı 20 piksellik Arial yazı tipine göre yapılan bir tahmindir.":
    "Le titre fait moins de 60 caractères, mais des lettres larges le font dépasser environ 580 pixels. Google coupe les titres selon leur largeur, pas leur nombre de caractères ; les majuscules larges (W, M) et les chiffres remplissent la ligne plus vite. La mesure est une estimation basée sur la police Arial de 20 pixels utilisée par Google sur ordinateur.",
  "Başlığı kısaltın ya da büyük harfle yazılmış sözcükleri normal yazıma çevirin. En önemli kelimeleri başa alın; kesilme olursa sondaki marka adı gitsin.":
    "Raccourcissez le titre ou remettez en casse normale les mots écrits en majuscules. Placez les mots les plus importants en premier, pour que ce soit le nom de marque en fin de titre qui soit coupé le cas échéant.",
  "Gereksiz meta keywords etiketi": "Balise meta keywords inutile",
  "Sayfada meta keywords etiketi var. Google bu etiketi yıllardır hiç kullanmıyor; sıralamaya ne katkısı ne zararı var. Tek etkisi, hedeflediğiniz kelimeleri rakiplerin kaynak koduna bakarak görebilmesi.":
    "La page a une balise meta keywords. Google n'utilise plus cette balise depuis des années ; elle n'aide ni ne nuit au classement. Son seul effet : vos concurrents peuvent voir les mots-clés que vous visez en regardant le code source.",
  "Etiketi şablondan ya da SEO eklentisinin ayarlarından kaldırın. Acil değil; zamanınız olduğunda temizleyin.":
    "Retirez la balise du modèle ou dans les réglages de votre extension SEO. Ce n'est pas urgent ; faites le ménage quand vous aurez le temps.",
  "Sayfa yakınlaştırmayı engelliyor": "La page bloque le zoom",
  "Sayfanın viewport etiketi kullanıcının yakınlaştırmasını kapatıyor (user-scalable=no ya da 2'den küçük maximum-scale). Az gören ziyaretçiler telefonda metni büyütemez. Erişilebilirlik standardı (WCAG) metnin %200'e kadar büyütülebilmesini ister; Lighthouse da bunu hata sayar.":
    "La balise viewport de la page désactive le zoom (user-scalable=no ou un maximum-scale inférieur à 2). Les visiteurs malvoyants ne peuvent pas agrandir le texte sur leur téléphone. La norme d'accessibilité (WCAG) exige que le texte puisse être agrandi jusqu'à 200 %, et Lighthouse compte cela comme un échec.",
  'Viewport etiketinden user-scalable=no ve maximum-scale değerlerini kaldırın: <meta name="viewport" content="width=device-width, initial-scale=1"> yeterlidir.':
    'Retirez user-scalable=no et maximum-scale de la balise viewport : <meta name="viewport" content="width=device-width, initial-scale=1"> suffit.',
  "En iyi uygulama: yeni sekmede açılan dış bağlantılarda noopener yok":
    "Bonne pratique : des liens externes s'ouvrent dans un nouvel onglet sans noopener",
  'Sayfada target="_blank" ile yeni sekmede açılan ama rel="noopener" ya da rel="noreferrer" taşımayan dış bağlantılar var. Güncel tarayıcılar (Chrome 88, Firefox 79 ve Safari 12.1\'den beri) target="_blank" bağlantılara noopener\'ı kendiliğinden uygular; yani bu bir güvenlik açığı değil, eski tarayıcılar için bir en iyi uygulama notudur. Sıralamayı etkilemez.':
    'La page a des liens externes qui s\'ouvrent dans un nouvel onglet avec target="_blank" mais sans rel="noopener" ni rel="noreferrer". Les navigateurs actuels (depuis Chrome 88, Firefox 79 et Safari 12.1) appliquent d\'eux-mêmes noopener aux liens target="_blank" : ce n\'est donc pas une faille de sécurité, seulement une note de bonne pratique pour les anciens navigateurs. Cela n\'influe pas sur le classement.',
  'Bu bağlantılara rel="noopener" ekleyin. Çoğu zaman tek bir şablon ya da editör ayarıdır.':
    "Ajoutez rel=\"noopener\" à ces liens. C'est généralement un seul réglage du modèle ou de l'éditeur.",
  'Adresi "javascript:" olan bağlantılar':
    "Liens dont l'adresse est « javascript: »",
  'Sayfada href değeri "javascript:" ile başlayan bağlantılar var. Google yalnızca gerçek bir adrese giden <a href> bağlantılarını izler; bunları izleyemez, yani gittikleri sayfaları bu yoldan bulamaz. Klavye ve ekran okuyucu kullananlar için de bunlar çoğu zaman çalışmaz.':
    "La page a des liens dont le href commence par « javascript: ». Google ne suit que les liens <a href> qui mènent à une vraie adresse ; il ne peut pas suivre ceux-ci et ne trouve donc pas par ce biais les pages vers lesquelles ils mènent. Souvent, ils ne fonctionnent pas non plus au clavier ni avec un lecteur d'écran.",
  "Bir sayfaya gidiyorsa href'e o sayfanın adresini yazın. Bir işlem yapıyorsa (menü açmak gibi) <a> yerine <button> kullanın.":
    "Si le lien mène à une page, mettez l'adresse de cette page dans href. S'il déclenche une action (comme ouvrir un menu), utilisez un <button> plutôt qu'un <a>.",
  "Aşağıdaki görseller hemen yükleniyor":
    "Les images plus bas dans la page se chargent tout de suite",
  'Sayfada ilk ekranın altında kalan altıdan fazla görsel loading="lazy" olmadan, sayfa açılır açılmaz yükleniyor. Ziyaretçi o kısma inmeden bant genişliği harcanır ve sayfa yavaşlar. Tahmin, ilk üç içerik görselinin ilk ekranda olduğunu varsayar ve yalnızca ana içerikteki (<main>, <article>) ya da büyük boyutlu görselleri sayar; logolar ve simgeler sayılmaz. Gerçek ekran düzeni farklı olabilir.':
    "Plus de six images situées sous le premier écran se chargent dès l'ouverture de la page, sans loading=\"lazy\". La bande passante est consommée avant que le visiteur n'y fasse défiler, et la page ralentit. L'estimation suppose que les trois premières images de contenu sont dans le premier écran et ne compte que les images du contenu principal (<main>, <article>) ou de grande taille ; les logos et icônes ne sont pas comptés. La mise en page réelle peut différer.",
  'İlk ekranın altındaki görsellere loading="lazy" ekleyin. İlk ekrandaki ana görsele eklemeyin; o görsel hemen yüklenmeli.':
    "Ajoutez loading=\"lazy\" aux images situées sous le premier écran. Ne l'ajoutez pas à l'image principale du premier écran : celle-ci doit se charger immédiatement.",
  "Görseller eski biçimde": "Images dans d'anciens formats",
  "Sayfadaki üç ya da daha fazla görsel JPEG, PNG ya da GIF biçiminde ve WebP ya da AVIF alternatifi yok (logolar, simgeler ve SVG'ler sayılmaz). Yeni biçimler aynı kalitede genelde %25-50 daha küçüktür; sayfa daha hızlı açılır. Tüm güncel tarayıcılar bu biçimleri destekler.":
    "Trois images ou plus de la page sont en JPEG, PNG ou GIF sans alternative WebP ou AVIF (logos, icônes et SVG non comptés). Les formats récents sont généralement 25 à 50 % plus légers à qualité égale, la page s'ouvre donc plus vite. Tous les navigateurs actuels les prennent en charge.",
  "Görselleri WebP ya da AVIF'e çevirin, ya da <picture> içinde bu biçimlerde bir <source> ekleyin. Çoğu CMS ve görsel eklentisi bunu otomatik yapabilir.":
    "Convertissez les images en WebP ou AVIF, ou ajoutez dans un <picture> un <source> dans ces formats. La plupart des CMS et extensions d'images savent le faire automatiquement.",
  "Etiketi olmayan form alanları": "Champs de formulaire sans libellé",
  'Sayfadaki bazı form alanlarının (metin kutusu, seçim listesi) etiketi yok: ne <label>, ne aria-label, ne title, ne de yer tutucu metin. Ekran okuyucu kullanan ziyaretçi alana gelince yalnızca "düzenleme alanı" duyar, ne yazacağını bilemez. Lighthouse\'un erişilebilirlik denetimi de bunu hata sayar.':
    "Certains champs de formulaire de la page (zones de texte, listes déroulantes) n'ont aucun libellé : ni <label>, ni aria-label, ni title, ni texte indicatif. Un visiteur qui utilise un lecteur d'écran entend seulement « modifier le texte » en arrivant sur le champ et ne sait pas quoi saisir. L'audit d'accessibilité de Lighthouse compte aussi cela comme un échec.",
  'Her alana görünür bir <label for="alan-id"> ekleyin. Tasarım görünür etikete izin vermiyorsa aria-label="E-posta adresi" gibi bir etiket verin.':
    'Donnez à chaque champ un <label for="id-du-champ"> visible. Si le design ne permet pas de libellé visible, ajoutez-en un comme aria-label="Adresse e-mail".',
  "Aynı id birden çok öğede": "Même id sur plusieurs éléments",
  "Sayfada aynı id değerini taşıyan birden fazla öğe var. id sayfada tek olmalı; tekrar ettiğinde form etiketleri, sayfa içi bağlantılar ve erişilebilirlik bağlantıları yanlış öğeye gider. Sıralamayı etkilemez, ama genelde bir bileşenin aynı sayfada iki kez kullanılmasından kaynaklanan bir şablon hatasıdır.":
    "Plusieurs éléments de la page partagent la même valeur id. Un id doit être unique dans une page ; s'il se répète, les libellés de formulaire, les liens internes à la page et les références d'accessibilité pointent vers le mauvais élément. Cela n'influe pas sur le classement, mais c'est généralement un bug de modèle où un composant est utilisé deux fois sur une même page.",
  "Tekrar eden id'leri bulun (tarayıcının geliştirici araçlarında document.querySelectorAll('[id]') ile) ve her birini benzersiz yapın; yalnızca stil için kullanılıyorsa class'a çevirin.":
    "Repérez les id répétés (avec document.querySelectorAll('[id]') dans les outils de développement du navigateur) et rendez chacun unique ; si l'un ne sert qu'au style, transformez-le en classe.",
  "Sayfanın HTML yapısı çok büyük":
    "La structure HTML de la page est trop volumineuse",
  "Sayfada 1.500'den fazla HTML öğesi var. Lighthouse bu sınırdan sonra uyarı verir: büyük bir sayfa yapısı daha çok bellek harcar, stil hesaplamayı ve etkileşimi yavaşlatır, özellikle telefonda. Genelde her sayfada tekrarlanan dev menülerden, gizli ama yüklenen içerikten ya da iç içe geçmiş sayfa oluşturucu katmanlarından olur.":
    "La page compte plus de 1 500 éléments HTML. Lighthouse avertit à partir de ce seuil : une grande structure de page consomme plus de mémoire et ralentit le calcul des styles et l'interaction, surtout sur téléphone. Elle vient généralement d'énormes menus répétés sur chaque page, de contenu masqué qui se charge quand même ou de couches imbriquées du constructeur de pages.",
  "Görünmeyen içeriği (kapalı menüler, sekmeler) gerektiğinde yükleyin, uzun listeleri sayfalara bölün, sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.":
    "Chargez au besoin le contenu non visible (menus fermés, onglets), découpez les longues listes en plusieurs pages et réduisez les couches d'enveloppe inutiles du constructeur de pages.",
  "HTML öğeleri çok iç içe": "Éléments HTML trop profondément imbriqués",
  "Sayfada 32 kattan derin iç içe geçmiş HTML öğeleri var. Çok derin yapı stil hesaplamayı yavaşlatır ve genelde sayfa oluşturucuların her bölümü birkaç gereksiz kutuya sarmasından kaynaklanır.":
    "La page contient des éléments HTML imbriqués sur plus de 32 niveaux. Une structure très profonde ralentit le calcul des styles et vient généralement de constructeurs de pages qui enveloppent chaque section dans plusieurs boîtes inutiles.",
  "Şablonda gereksiz sarmalayıcı <div> katmanlarını kaldırın; sayfa oluşturucu kullanıyorsanız iç içe bölüm ve sütunları azaltın.":
    "Supprimez du modèle les couches de <div> d'enveloppe inutiles ; si vous utilisez un constructeur de pages, réduisez les sections et colonnes imbriquées.",
  "Görünür metin, koda göre çok az":
    "Très peu de texte visible par rapport au code",
  "Sayfanın görünür metni, HTML'nin onda birinden az. Bu tek başına bir sıralama sorunu değil; Google böyle bir oran ölçmez. Ama çoğu zaman sayfanın satır içi betik ve stil kodlarıyla şiştiğini ya da içeriğin ilk gelen HTML'de olmadığını gösterir.":
    "Le texte visible de la page représente moins d'un dixième de son HTML. En soi, ce n'est pas un problème de classement ; Google ne mesure pas un tel ratio. Mais cela montre souvent que la page est alourdie par des scripts et styles intégrés, ou que le contenu ne figure pas dans le HTML reçu en premier.",
  "Satır içi büyük betik ve stilleri ayrı dosyalara taşıyın, kullanılmayan kodu kaldırın. İçerik JavaScript ile yükleniyorsa sayfa kaynağında da göründüğünden emin olun.":
    "Déplacez les gros scripts et styles intégrés dans des fichiers séparés et supprimez le code inutilisé. Si le contenu est chargé en JavaScript, vérifiez qu'il apparaît aussi dans le code source de la page.",
  "Neredeyse aynı içerik": "Contenu quasi dupliqué",
  "Bu sayfaların ana içeriği neredeyse aynı; yalnızca birkaç kelime (şehir adı, renk, fiyat gibi) farklı. Menü, üst ve alt bilgi gibi her sayfada tekrar eden kısımlar karşılaştırmaya katılmaz. Google bu sayfalardan birini seçip diğerlerini arama sonucunda göstermeyebilir ve hangisini seçeceğine o karar verir. Genelde aynı şablonla çoğaltılmış konum, ürün çeşidi ya da etiket sayfalarında olur.":
    "Le contenu principal de ces pages est presque identique ; seuls quelques mots (un nom de ville, une couleur, un prix) diffèrent. Les parties répétées sur chaque page, comme le menu, l'en-tête et le pied de page, sont exclues de la comparaison. Google peut en choisir une et écarter les autres des résultats de recherche, et c'est lui qui décide laquelle. Cela arrive généralement avec des pages de lieu, de variante de produit ou de tag copiées depuis le même modèle.",
  "Her sayfaya kendine özgü, işe yarar içerik ekleyin. Gerçekten aynı şeyi anlatıyorlarsa tek sayfada birleştirin ya da diğerlerine asıl sayfayı gösteren bir canonical ekleyin.":
    "Donnez à chaque page un contenu propre et utile. Si elles disent vraiment la même chose, fusionnez-les en une seule page ou ajoutez sur les autres une canonique pointant vers la page principale.",
  "Yapılandırılmış veride zorunlu özellikler eksik":
    "Propriétés obligatoires manquantes dans les données structurées",
  "Sayfadaki yapılandırılmış veri (JSON-LD) bir türü bildiriyor ama Google'ın o tür için zorunlu saydığı özelliklerden bazıları yok. Bu, Product, FAQPage, BreadcrumbList ve LocalBusiness türleri içindir; eksik olunca arama sonucunda zengin görünüm (yıldız, fiyat, içerik haritası) çıkmaz.":
    "Les données structurées de la page (JSON-LD) déclarent un type mais n'ont pas certaines des propriétés que Google exige pour ce type. Cela concerne Product, FAQPage, BreadcrumbList et LocalBusiness ; sans elles, aucun résultat enrichi (étoiles, prix, fil d'Ariane) n'apparaît dans la recherche.",
  "Ayrıntıdaki eksik özellikleri işaretlemeye ekleyin ve sonucu Google'ın Zengin Sonuç Testi ile kontrol edin. İşaretleme sayfada gerçekten görünen bilgiyi anlatmalı; sayfada olmayan bir fiyatı ya da yorumu işaretlemek Google kurallarına aykırıdır.":
    "Ajoutez au balisage les propriétés manquantes listées dans les détails et vérifiez le résultat avec le test des résultats enrichis de Google. Le balisage doit décrire des informations réellement visibles sur la page ; baliser un prix ou un avis absent de la page enfreint les consignes de Google.",
  "Yapılandırılmış veride önerilen özellikler eksik":
    "Propriétés recommandées manquantes dans les données structurées",
  "Sayfadaki Article ya da Organization işaretlemesinde Google'ın önerdiği özelliklerden (başlık, görsel, tarih, yazar; ya da ad, web adresi, logo) bazıları yok. Google bu türler için zorunlu özellik saymaz, bu yüzden işaretleme geçerlidir ve zengin görünümü engellemez; önerilen özellikler yalnızca Google'ın sayfayı daha eksiksiz göstermesine yardım eder.":
    "Le balisage Article ou Organization de la page n'a pas certaines des propriétés recommandées par Google (headline, image, date, author ; ou name, URL, logo). Google ne liste aucune propriété obligatoire pour ces types : le balisage est donc valide et n'empêche aucun résultat enrichi ; les propriétés recommandées aident seulement Google à présenter la page de façon plus complète.",
  "Ayrıntıdaki özellikleri, sayfada gerçekten görünen bilgiyle işaretlemeye ekleyin ve sonucu Google'ın Zengin Sonuç Testi ile kontrol edin. Acil değildir; zorunlu özellik eksiklerinden sonra gelir.":
    "Ajoutez au balisage les propriétés listées dans les détails, avec des informations réellement visibles sur la page, et vérifiez le résultat avec le test des résultats enrichis de Google. Ce n'est pas urgent ; cela vient après les propriétés obligatoires manquantes.",
  "Sayfalarda Google Analytics etiketi bulunamadı":
    "Aucune balise Google Analytics trouvée sur les pages",
  "Taranan sayfaların HTML'sinde Google Analytics 4 (G-), Google Etiket Yöneticisi (GTM-) ya da Universal Analytics (UA-) kimliği bulunamadı. Ölçüm yoksa hangi sayfanın ziyaretçi ve dönüşüm getirdiğini göremezsiniz. Etiket bir çerez onay aracı ya da başka bir betik tarafından sonradan yükleniyorsa burada görünmez; o durumda bu bulguyu yok sayabilirsiniz.":
    "Aucun identifiant Google Analytics 4 (G-), Google Tag Manager (GTM-) ou Universal Analytics (UA-) n'a été trouvé dans le HTML des pages explorées. Sans mesure, vous ne voyez pas quelles pages apportent des visiteurs et des conversions. Si la balise est chargée plus tard par un outil de consentement aux cookies ou un autre script, elle n'apparaît pas ici ; dans ce cas, vous pouvez ignorer ce constat.",
  "Google Analytics 4'te bir web veri akışı oluşturun ve verdiği etiketi tüm sayfaların head bölümüne ekleyin; ya da Etiket Yöneticisi kullanıyorsanız kapsayıcı kodunu ekleyin. Sonra Analytics'teki gerçek zamanlı raporda ziyaretinizin göründüğünü kontrol edin.":
    "Créez un flux de données Web dans Google Analytics 4 et ajoutez la balise fournie dans le head de chaque page, ou ajoutez le code du conteneur si vous utilisez Tag Manager. Vérifiez ensuite que votre propre visite apparaît dans le rapport Temps réel d'Analytics.",
  "Sayfalardaki Analytics kimliği bağlı mülkle eşleşmiyor":
    "L'identifiant Analytics des pages ne correspond pas à la propriété connectée",
  "Sayfalarda bulunan Google Analytics 4 ölçüm kimliği (G-), bu projeye bağlı Analytics mülkünün web veri akışlarındaki kimliklerden hiçbiriyle eşleşmiyor. Yani ziyaretçi verisi büyük olasılıkla başka bir mülke gidiyor ve buradaki Analytics raporları siteyi göstermiyor. Eski bir mülkün kodu ya da kopyalanmış bir şablon genelde nedendir.":
    "L'ID de mesure Google Analytics 4 (G-) trouvé sur les pages ne correspond à aucun des ID des flux de données Web de la propriété Analytics connectée à ce projet. Les données des visiteurs partent donc très probablement vers une autre propriété, et les rapports Analytics affichés ici ne montrent pas ce site. Le code d'une ancienne propriété ou un modèle copié en est la cause habituelle.",
  "Ayrıntıdaki iki kimlik listesini karşılaştırın. Doğru mülk bağlıysa sayfalardaki etiketi o mülkün ölçüm kimliğiyle değiştirin; sayfalardaki doğruysa Ayarlar'dan projeye o mülkü bağlayın.":
    "Comparez les deux listes d'ID dans les détails. Si la bonne propriété est connectée, remplacez la balise des pages par l'ID de mesure de cette propriété ; si celle des pages est la bonne, connectez cette propriété au projet dans les Paramètres.",
  "{count} kontrol aşamasından geçti": "{count} vérifications réussies",
  Ölçülmedi: "Non mesuré",
  "Geçen {count} kontrol": "{count} vérifications réussies",
  Geçti: "Réussi",
  "{count} sayfada": "Sur {count} pages",
  "Başlangıç sayfası okunamadığı için önizleme yok.":
    "Pas d'aperçu, car la page de départ n'a pas pu être lue.",
  "Hız ölçülmedi": "Vitesse non mesurée",
  "Hız ölçülemedi": "La vitesse n'a pas pu être mesurée",
  "Başlangıç sayfası ölçülemedi; gösterilen, ölçülen en üst sayfa: {url}":
    "La page de départ n'a pas pu être mesurée ; affichage de la page mesurée la moins profonde : {url}",
  "Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok. Denetimi hız ölçümü açık başlatırsanız gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.":
    "Cet audit n'a pas de mesure PageSpeed pour la page de départ. Lancez l'audit avec les tests de vitesse activés : les données de vrais utilisateurs (CrUX) et les résultats de laboratoire apparaîtront ici.",
  "Temel Web Verileri": "Signaux Web essentiels",
  "Gerçek kullanıcı verisi Chrome Kullanıcı Deneyimi Raporu'ndan (CrUX, son 28 gün, mobil); laboratuvar sütunu PageSpeed Insights'ın tek ölçümü.":
    "Les données de vrais utilisateurs proviennent du Chrome User Experience Report (CrUX, 28 derniers jours, mobile) ; la colonne laboratoire correspond à une seule exécution de PageSpeed Insights.",
  Metrik: "Métrique",
  "Bu sayfa, gerçek": "Cette page, vrais utilisateurs",
  "Tüm site, gerçek": "Tout le site, vrais utilisateurs",
  "Anlık veri": "Instantané",
  "Site puanı {score}/100, {word}": "Score du site {score}/100, {word}",
  "Uyarı ve bilgi": "Avertissements et remarques",
  "Kategori puanları": "Scores par catégorie",
  "Tüm kontroller": "Toutes les vérifications",
  "{passed}/{total} geçti": "{passed}/{total} réussies",
  "Puan geçmişi": "Historique du score",
  "Son {count} denetimin puanı": "Score des {count} derniers audits",
  "Öncekiyle aynı": "Identique à la dernière fois",
  "{value} puan, öncekine göre": "{value} points depuis le dernier audit",
  "Tarayıcı erişimi (robots.txt)": "Accès des robots (robots.txt)",
  "Arama motorları ve yapay zekâ tarayıcıları sitenin ana sayfasını okuyabiliyor mu?":
    "Les moteurs de recherche et les robots d'IA peuvent-ils lire la page d'accueil du site ?",
  "Arama motoru": "Moteur de recherche",
  "Yapay zekâ": "IA",
  Engelli: "Bloqué",
  İzinli: "Autorisé",
  "DNS kayıtları": "Enregistrements DNS",
  "Bazı sorgular yanıt vermedi; liste eksik olabilir.":
    "Certaines requêtes n'ont pas répondu ; la liste peut être incomplète.",
  "Ölçüm etiketleri": "Balises de mesure",
  "Sayfaların HTML'sinde bulunan Google Analytics ve Etiket Yöneticisi kimlikleri.":
    "Identifiants Google Analytics et Tag Manager trouvés dans le HTML des pages.",
  "Hiçbir sayfada etiket bulunamadı.": "Aucune balise trouvée sur les pages.",
  "Yapılandırılmış veri türleri": "Types de données structurées",
  "Sayfaların JSON-LD ile bildirdiği schema.org türleri.":
    "Types schema.org déclarés par les pages en JSON-LD.",
  "Hiçbir sayfada yapılandırılmış veri bulunamadı.":
    "Aucune donnée structurée trouvée sur les pages.",
  "{date} (süresi doldu)": "{date} (expiré)",
  "{date} ({count} gün kaldı)": "{date} ({count} jours restants)",
  "Sunucu ve yanıt": "Serveur et réponse",
  "{count} adım": "{count} étapes",
  "İlk bayt (TTFB)": "Premier octet (TTFB)",
  "Toplam yanıt": "Réponse complète",
  "HTML boyutu": "Taille du HTML",
  Sıkıştırma: "Compression",
  Önbellek: "Mise en cache",
  Sunucu: "Serveur",
  "Teknoloji ipucu": "Indice technologique",
  "Güvenlik başlıkları": "En-têtes de sécurité",
  "http'den https'e yönlendirme": "Redirection de http vers https",
  "Çerçeveye gömme koruması": "Protection contre l'intégration",
  "Alan adı ve sertifika": "Domaine et certificat",
  "Sertifika bilgisi herkese açık Certificate Transparency kayıtlarından; alan adı bilgisi RDAP'tan.":
    "Les informations du certificat proviennent des journaux publics Certificate Transparency ; celles du domaine, de RDAP.",
  "Sertifikayı veren": "Émetteur du certificat",
  "Sertifika bitişi": "Expiration du certificat",
  "Kayıt firması": "Bureau d'enregistrement",
  "Kayıt tarihi": "Enregistré le",
  "Alan adı bitişi": "Expiration du domaine",
  "Diğer adres": "Autre hôte",
  "Asıl adrese yönleniyor": "Redirige vers l'hôte principal",
  "Ayrı açılıyor": "S'ouvre séparément",
  "Ana sayfaya yönleniyor": "Redirige vers la page d'accueil",
  "Doğru: {status}": "Correct : {status}",
  "Hatalı: {status} dönüyor": "Incorrect : renvoie {status}",
  "Dosyalar ve hata sayfası": "Fichiers et page d'erreur",
  "robots.txt içinde Sitemap satırı": "Ligne Sitemap dans robots.txt",
  "Olmayan bir sayfa": "Une page qui n'existe pas",
  "Bu denetim site bilgisi toplanmadan önce yapılmış. Sunucu, güvenlik başlıkları, DNS ve sertifika bilgisini görmek için denetimi yeniden çalıştırın.":
    "Cet audit a été lancé avant la collecte des détails du site. Relancez l'audit pour voir le serveur, les en-têtes de sécurité, le DNS et le certificat.",
  "Google arama sonucu önizlemesi": "Aperçu du résultat de recherche Google",
  "(başlık yok)": "(aucun titre)",
  "(meta açıklama yok; Google sayfadan bir parça seçer)":
    "(aucune meta description ; Google choisit un passage de la page)",
  "Başlık {px} piksel; yaklaşık {max} pikselden sonrası kesiliyor.":
    "Le titre fait {px} pixels ; au-delà d'environ {max} pixels, il est coupé.",
  "Başlık {px} piksel, sığıyor.": "Le titre fait {px} pixels et tient.",
  "Sayfanın başlığı yok.": "La page n'a pas de titre.",
  "Açıklama iki satıra sığmıyor; sonu kesilerek gösterilir.":
    "La description ne tient pas sur deux lignes ; sa fin est coupée.",
  "Paylaşım kartı önizlemesi (Open Graph)":
    "Aperçu de la carte de partage (Open Graph)",
  "Görsel açılamadı": "Impossible de charger l'image",
  "og:image yok": "Pas d'og:image",
  "Open Graph başlığı, açıklaması ve görseli tanımlı.":
    "Le titre, la description et l'image Open Graph sont définis.",
  "Eksik: {tags}. Paylaşım siteleri yerine sayfadan tahmin eder.":
    "Manquant : {tags}. Les sites de partage les devinent à partir de la page.",
  "Twitter kartı: {card}": "Carte Twitter : {card}",
  "Twitter kartı tanımlı değil.": "Aucune carte Twitter définie.",
  "{url}: {critical} kritik, {warning} uyarı, {info} bilgi":
    "{url} : {critical} critiques, {warning} avertissements, {info} remarques",
  "{count} tıklama": "{count} clics",
  "Son denetimden bu yana": "Depuis le dernier audit",
  "{date} tarihli denetimle karşılaştırıldı.":
    "Par rapport à l'audit du {date}.",
  "Düzeltilenler ({count})": "Corrigés ({count})",
  "Önceki denetimdeki sorunların hiçbiri tamamen gitmedi.":
    "Aucun des problèmes de l'audit précédent n'a entièrement disparu.",
  "Yeni çıkanlar ({count})": "Nouveaux ({count})",
  "Yeni bir sorun türü çıkmadı.":
    "Aucun nouveau type de problème n'est apparu.",
  "Search Console trafiği yükleniyor; sıralama birazdan güncellenebilir.":
    "Chargement du trafic Search Console ; l'ordre peut changer dans un instant.",
  "Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı ({start} – {end}).":
    "Ordre : impact sur le score, pondéré par les clics Search Console des pages concernées ({start} – {end}).",
  "Search Console bağlı değil ya da yanıt vermedi; sıralama yalnızca puan etkisine göre.":
    "La Search Console n'est pas connectée ou n'a pas répondu ; l'ordre suit uniquement l'impact sur le score.",
  "İlk {count} işi göster": "Afficher les {count} premières tâches",
  "Tüm {count} işi göster": "Afficher les {count} tâches",
  "{clicks} tıklama, {impressions} gösterim":
    "{clicks} clics, {impressions} impressions",
  "ve {count} sayfa daha": "et {count} autres pages",
  "Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı.":
    "Ordre : impact sur le score, pondéré par les clics Search Console des pages concernées.",
  Tarayıcılar: "Robots d'exploration",
  "Başlık arama sonucunda kesiliyor.":
    "Le titre est coupé dans les résultats de recherche.",
  "Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok; gerçek kullanıcı verisi (CrUX) ölçülmedi.":
    "Cet audit n'a pas de mesure PageSpeed pour la page de départ ; les données de vrais utilisateurs (CrUX) n'ont pas été mesurées.",
  "2. Anlık veri": "2. Instantané",
  "Siteniz hakkında denetim anında toplanan bilgiler: sunucu, güvenlik başlıkları, DNS, sertifika, robots.txt ve gerçek kullanıcı hızı.":
    "Ce que l'audit a recueilli sur votre site à ce moment-là : serveur, en-têtes de sécurité, DNS, certificat, robots.txt et vitesse chez les vrais utilisateurs.",
  "Kategori başına 100 üzerinden puan": "Score sur 100 par catégorie",
  Sorunlu: "En échec",
  "Puan etkisi": "Impact sur le score",
  "Puan etkisi, o kategorideki sorunların site puanından düşürdüğü puandır; hepsi düzelirse site puanına geri eklenir.":
    "L'impact sur le score correspond aux points que les problèmes de cette catégorie retirent au score du site ; corrigez-les tous et ils sont rajoutés.",
  "Denetim tarihine göre site puanı": "Score du site par date d'audit",
  "1. Puan dağılımı ve kontroller": "1. Détail du score et vérifications",
  "Denetim, her sorun türünü bir kontrol olarak çalıştırır. Bulgusu olan kontrol sorunlu, ölçülüp temiz çıkan geçti sayılır; verisi toplanamayan kontrol ölçülmedi olarak kalır, ne geçti ne kaldı sayılır.":
    "L'audit exécute chaque type de problème comme une vérification. Une vérification avec des constats est en échec, une vérification mesurée sans constat est réussie, et une vérification dont les données n'ont pas pu être collectées reste non mesurée : elle ne compte ni comme réussie ni comme en échec.",
  "Ölçülmedi ({count})": "Non mesurées ({count})",
  "Ek C. Geçen ve ölçülemeyen kontroller":
    "Annexe C. Vérifications réussies et non mesurées",
  "Sorun çıkmayan kontroller ve verisi toplanamadığı için sonuç verilmeyen kontroller.":
    "Les vérifications sans constat, et celles sans résultat parce que leurs données n'ont pas pu être collectées.",
  "Ana içeriğin görünmesi": "Affichage du contenu principal",
  "Tıklamaya tepki": "Réponse à un appui",
  "Görsel kayma": "Décalage de mise en page",
  "İlk içerik": "Premier contenu",
  "Sunucunun ilk yanıtı": "Première réponse du serveur",
  İyileştirilmeli: "À améliorer",
  Mükemmel: "Excellent",
  "Yapılacak her iş tek listede, en çok kazandıranı üstte. Search Console bağlıysa trafik getiren sayfalardaki işler öne çıkar.":
    "Toutes les tâches dans une seule liste, les plus utiles d'abord. Avec la Search Console connectée, le travail sur les pages qui apportent du trafic remonte.",
  "Denetimin yaptığı her kontrol, kategorisine göre: geçenler, kalanlar ve ölçülemeyenler.":
    "Chaque vérification de l'audit, par catégorie : réussie, en échec et non mesurée.",
  "Küçük iş": "Petite tâche",
  "Orta iş": "Tâche moyenne",
  "Büyük iş": "Grosse tâche",
  "{url} adresinin telefondaki görünümü": "{url} sur un téléphone",
  "Mobil hız ölçümünün son ekran görüntüsü":
    "Dernière capture d'écran du test de vitesse mobile",
  "yaklaşık {duration} kaldı": "environ {duration} restantes",
  "Hız ölçümü: {pages} sayfa × {devices} cihaz, Google PageSpeed ile. Google dakikada sınırlı ölçüme izin verdiği için bu adım en uzunu.":
    "Tests de vitesse : {pages} pages × {devices} appareils, avec Google PageSpeed. Google limite le nombre de tests par minute ; c'est donc l'étape la plus longue.",
  "{done} / {total} ölçüm": "{done} / {total} tests",
  "Site haritası ve ana sayfanın bağlantılarından adresler toplanıyor.":
    "Collecte des adresses à partir du sitemap et des liens de la page d'accueil.",
  "Her sayfa indirilip başlık, içerik, bağlantı ve teknik kontrollerden geçiriliyor.":
    "Téléchargement de chaque page et vérification du titre, du contenu, des liens et de la technique.",
  "Bulgular puanlanıyor ve sonuçlar hazırlanıyor.":
    "Notation des constats et préparation des résultats.",
  "{shown} / {total} satır": "{shown} lignes sur {total}",
  "{count} geçti": "{count} réussies",
  "{count} sorunlu": "{count} avec problèmes",
  "{count} ölçülmedi": "{count} non mesurées",
  "{total} kontrol: {summary}": "{total} vérifications : {summary}",
  "Kısmi veri": "Données partielles",
  "{count} kontrol ölçülmedi: neden?": {
    one: "{count} vérification non mesurée : pourquoi ?",
    other: "{count} vérifications non mesurées : pourquoi ?",
  },
  "Düzeltilirse site puanına yaklaşık bu kadar eklenir; değerler toplanmaz.":
    "Ce que la correction ajoute à peu près au score du site ; les valeurs ne s'additionnent pas.",
  "{points} puan kayıp": "{points} points perdus",
  "Hız ölçümü (PageSpeed) bu denetimde sonuç vermedi; nedeni Hız sekmesinde.":
    "Le test de vitesse (PageSpeed) n'a renvoyé aucun résultat dans cet audit ; l'onglet Vitesse en donne la raison.",
  "Sayfalar Google'da henüz kontrol edilmedi; Dizin durumu sekmesinden sorabilirsiniz.":
    "Les pages n'ont pas encore été vérifiées auprès de Google ; vous pouvez le demander depuis l'onglet État de l'index.",
  "Karşılaştırma için bağlı bir Google Analytics mülkü ve sayfalarda bir G- etiketi gerekir.":
    "Cette comparaison nécessite une propriété Google Analytics connectée et une balise G- sur les pages.",
  "Site hakkındaki bilginin bir kısmı (sertifika, alan adı kaydı, DNS) bu denetimde okunamadı.":
    "Certaines informations du site (certificat, enregistrement du domaine, DNS) n'ont pas pu être lues dans cet audit.",
  "PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Ölçüm çalışınca gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.":
    "Le test PageSpeed n'a renvoyé aucun résultat dans cet audit : {error} Une fois qu'il aura tourné, les données de vrais utilisateurs (CrUX) et les résultats de laboratoire apparaîtront ici.",
  "Bu proje {auditedHost} için Google verisi okuyamıyor":
    "Ce projet ne peut pas lire les données Google de {auditedHost}",
  "Projenin Search Console bağlantısı {propertyHost} mülküne ait. Google'a {auditedHost} sayfalarını sormak günlük kotayı boşa harcardı, bu yüzden dizin durumu, site haritaları ve kota bu denetimde gösterilmiyor. {auditedHost} için ayrı bir proje açıp kendi mülküne bağlayın.":
    "La connexion Search Console du projet appartient à la propriété {propertyHost}. Interroger Google sur les pages de {auditedHost} gaspillerait le quota quotidien : l'état de l'index, les sitemaps et le quota ne sont donc pas affichés pour cet audit. Créez un projet distinct pour {auditedHost} et connectez-le à sa propre propriété.",
  "Siteyi ayrı proje olarak ekle": "Ajouter le site comme projet distinct",
  "Henüz kontrol edilmedi": "Pas encore vérifié",
  "Bu denetimin Google'a sorulmamış sayfaları. Son kontrol {date}":
    "Pages de cet audit pas encore vérifiées auprès de Google. Dernière vérification {date}",
  "Bu denetimin Google'a sorulmamış sayfaları.":
    "Pages de cet audit pas encore vérifiées auprès de Google.",
  "En çok sayfayı etkileyen {count} sorun türü; kalan {hidden} tür aşağıdaki listede.":
    "Les {count} types de problèmes qui touchent le plus de pages ; les {hidden} autres figurent dans la liste ci-dessous.",
  "En çok sayfayı etkileyen {count} sorun türü.":
    "Les {count} types de problèmes qui touchent le plus de pages.",
  "Renklerin anlamı": "Signification des couleurs",
  "Kısmi veri: {measured} / {total} ölçüm sonuç verdi. Ortalamalar yalnızca ölçülenlerden.":
    "Données partielles : {measured} tests sur {total} ont donné un résultat. Les moyennes ne reposent que sur ceux-ci.",
  "Ayarlar'dan ücretsiz bir PageSpeed anahtarı ekleyip denetimi yeniden başlatın.":
    "Ajoutez une clé PageSpeed gratuite dans les Paramètres et relancez l'audit.",
  "PageSpeed anahtarı ekle": "Ajouter une clé PageSpeed",
  "{count} ölçüm yapılamadı": {
    one: "{count} test n'a pas pu être exécuté",
    other: "{count} tests n'ont pas pu être exécutés",
  },
  "Sayfa başına telefon ve bilgisayar ayrı ölçülür.":
    "Chaque page est testée séparément sur téléphone et sur ordinateur.",
  Ölçülemedi: "Non mesuré",
  "Google'ın ücretsiz günlük ölçüm kotası doldu. Bu sitenizden kaynaklanmıyor: sayfalar yavaş sayılmadı, yalnızca ölçülemedi.":
    "Le quota quotidien gratuit de tests de Google est épuisé. Votre site n'y est pour rien : les pages n'ont pas été jugées lentes, elles n'ont simplement pas pu être mesurées.",
  "PageSpeed anahtarı olmadan Google'ın herkesle paylaşılan ücretsiz kotası kullanılıyor ve bu kota doldu. Bu sitenizden kaynaklanmıyor.":
    "Sans clé PageSpeed, c'est le quota gratuit de Google partagé par tous qui est utilisé, et il est épuisé. Votre site n'y est pour rien.",
  "Google'ın dakikalık ölçüm sınırına takıldı. Bu sitenizden kaynaklanmıyor; bir süre sonra yeniden deneyin.":
    "Les tests ont atteint la limite par minute de Google. Votre site n'y est pour rien ; réessayez un peu plus tard.",
  "Google'ın ölçüm aracı bu sayfalar için sonuç döndürmedi. Ayrıntı aşağıdaki listede.":
    "L'outil de test de Google n'a renvoyé aucun résultat pour ces pages. La liste ci-dessous donne les détails.",
  "Yapılacaklar ({count})": "À faire ({count})",
  "Kontroller ({count})": "Vérifications ({count})",
  "Hız ({measured}/{total})": "Vitesse ({measured}/{total})",
  "İlk denetim. Puanın seyri bir sonrakinde başlar.":
    "Premier audit. L'évolution du score commence au prochain.",
  "Kritik sorun": "Problèmes critiques",
  İyileştirme: "Améliorations",
  "Geçen kontrol": "Vérifications réussies",
  "Veri toplanamadı": "Aucune donnée collectée",
  "{measured}/{total} kontrol ölçüldü":
    "{measured}/{total} vérifications mesurées",
  "Bu denetimde veri toplanamadı": "Aucune donnée collectée dans cet audit",
  "{category}: {state}. Kontrolleri aç":
    "{category} : {state}. Ouvrir les vérifications",
  "{findings} bulgu, {types} sorun türü. Bulgu, bir sorunun bir sayfada görülmesidir. Bir gruba tıklayın, liste yalnızca onları göstersin.":
    "{findings} constats, {types} types de problèmes. Un constat est un problème vu sur une page. Cliquez sur un groupe pour n'afficher que ceux-là dans la liste.",
  "{allowed}/{total} izinli": "{allowed}/{total} autorisés",
  "{present}/{total} var": "{present}/{total} présents",
  "Sertifikanın süresi doldu": "Certificat expiré",
  "Sertifika {count} gün geçerli": {
    one: "Certificat valide encore {count} jour",
    other: "Certificat valide encore {count} jours",
  },
  "Site ya da kayıt servisi denetim sırasında bu bilgilere yanıt vermedi. Sitenizde bir sorun olduğu anlamına gelmez; denetimi yeniden çalıştırınca tekrar sorulur.":
    "Le site ou le registre n'a pas répondu à ces requêtes pendant l'audit. Cela ne signifie pas que votre site a un problème ; elles seront relancées au prochain audit.",
  "Çubuk, sayfadaki sorun türlerinin önem ağırlıklı toplamı: bir kritik sorun 40, bir uyarı 15, bir bilgi 3 sayılır. En uzun çubuk en çok iş çıkaran sayfa.":
    "La barre est le total, pondéré par gravité, des types de problèmes de la page : un problème critique compte 40, un avertissement 15, une remarque 3. La barre la plus longue correspond à la page qui demande le plus de travail.",
  "Önce bunlar:": "Commencez par :",
  "ilk {count} iş.": {
    one: "{count} correction.",
    other: "les {count} premières corrections.",
  },
  "ilk {count} iş birlikte site puanını yaklaşık {points} puan yükseltir.": {
    one: "{count} correction augmente le score du site d'environ {points} points.",
    other:
      "ensemble, les {count} premières corrections augmentent le score du site d'environ {points} points.",
  },
  "ilk {count} iş, site puanını 1 puandan az yükseltir.": {
    one: "{count} correction augmente le score du site de moins de 1 point.",
    other:
      "les {count} premières corrections augmentent le score du site de moins de 1 point.",
  },
  "Bu sorun tek başına düzeltilirse yaklaşık kazanç; değerler toplanmaz.":
    "Ce que rapporte à peu près la correction de ce seul problème ; les valeurs ne s'additionnent pas.",
  "{points} puan": "{points} points",
  "Yeni kontroller eklendi; bu karşılaştırma yalnızca iki denetimin de ölçtüğü kontrolleri kapsar.":
    "De nouvelles vérifications ont été ajoutées ; cette comparaison ne porte que sur celles mesurées par les deux audits.",
  "Platform alan adı": "Domaine de plateforme",
  "Site bir barındırma platformunun alt alan adında; kaydı ve DNS'i platforma ait olduğu için alan adı ve DNS kontrolleri yapılmadı.":
    "Le site est sur un sous-domaine d'une plateforme d'hébergement ; son enregistrement et son DNS appartiennent à la plateforme, les vérifications du domaine et du DNS ont donc été ignorées.",
  "sayı alınamadı (tarama sınırı)": "nombre non lu (limite d'exploration)",
  "Twitter kartı: ölçülmedi.": "Carte Twitter : non mesurée.",
  "Google hizmet hesabı kullanılıyor (Ayarlar'da kayıtlı). Bir OAuth istemcisi de tanımlı; hizmet hesabı önce gelir.":
    "Utilisation du compte de service Google (enregistré dans les Paramètres). Un client OAuth est aussi configuré ; le compte de service est prioritaire.",
  "Google hizmet hesabı kullanılıyor (Ayarlar'da kayıtlı).":
    "Utilisation du compte de service Google (enregistré dans les Paramètres).",
  "Google OAuth istemcisi kullanılıyor (Ayarlar'da kayıtlı).":
    "Utilisation du client OAuth Google (enregistré dans les Paramètres).",
  "Google OAuth istemcisi kullanılıyor (GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET ortam değişkenlerinden).":
    "Utilisation du client OAuth Google (depuis les variables d'environnement GOOGLE_CLIENT_ID et GOOGLE_CLIENT_SECRET).",
  "Google erişimi henüz girilmedi: Ayarlar'a bir hizmet hesabı ya da OAuth istemcisi girin. Girmeden Search Console ve Analytics bağlanamaz.":
    "Aucun accès Google saisi : ajoutez un compte de service ou un client OAuth dans les Paramètres. Sans cela, la Search Console et Analytics ne peuvent pas se connecter.",
  "Orta düzeyde. Kritik sorun yok; uyarı sorunları aramadaki performansı gölgeliyor.":
    "Moyen. Aucun problème critique ; les avertissements freinent les performances dans la recherche.",
  "Zayıf. Kritik sorun yok, ama birikmiş uyarılar aramadaki performansı aşağı çekiyor; en çok puan getirenlerden başlayın.":
    "Faible. Aucun problème critique, mais l'accumulation d'avertissements freine les performances dans la recherche ; commencez par ceux qui rapportent le plus de points.",
  "PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Gerçek kullanıcı verisi (CrUX) ölçülmedi.":
    "PageSpeed n'a renvoyé aucun résultat dans cet audit : {error} Les données de vrais utilisateurs (CrUX) n'ont pas été mesurées.",
  "<strong>Laboratuvar ve gerçek kullanıcı verisi.</strong> Buradaki rakamlar Lighthouse'un laboratuvar ölçümüdür: tek bir sanal cihazda, kontrollü ağ ve işlemci koşulunda yapılır. Gerçek ziyaretçilerden toplanan alan verisi (Chrome Kullanıcı Deneyimi Raporu, CrUX), PageSpeed ölçümü varsa Anlık veri bölümündeki Temel Web Verileri tablosundadır. İkisi farklı çıkabilir. Google, sıralama sistemlerinde alan verisini (CrUX) kullanır; ama iyi bir değer tek başına sıralama garantisi vermez, içeriğin ilgili olması öncelik taşır.":
    "<strong>Données de laboratoire et données de vrais utilisateurs.</strong> Ces chiffres sont des mesures de laboratoire Lighthouse, réalisées sur un seul appareil simulé dans des conditions de réseau et de processeur contrôlées. Les données terrain recueillies auprès de vrais visiteurs (Chrome User Experience Report, CrUX) figurent dans le tableau des Signaux Web essentiels de la section Instantané quand PageSpeed a été mesuré. Les deux peuvent différer. Les systèmes de classement de Google utilisent les données terrain (CrUX), mais une bonne valeur seule ne garantit pas le classement ; un contenu pertinent passe avant tout.",
  "Puanlar, o sorun tek başına tamamen düzeltilirse site puanına eklenecek yaklaşık değerdir; değerler toplanmaz.":
    "Les points correspondent à peu près à ce que la correction complète de ce seul problème ajoute au score du site ; les valeurs ne s'additionnent pas.",
  Kapalı: "Désactivé",
  "{measured} / {total} ölçüm": "{measured} mesures sur {total}",
  "Denetim tarihi": "Date de l'audit",
  "{count} (üst sınır {max})": "{count} (limite {max})",
  "Google dizin verisi": "Données d'index Google",
  "Kritik kontrol": "Vérifications critiques",
  "Temiz çıkan": "Sans constat",
};
