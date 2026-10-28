import type { Catalog } from "@/shared/i18n";

/** French for the cards and stats review: Opportunities, rankings, saved keywords and the setup verdict. */
export const frCards: Catalog = {
  "Etkilenen benzersiz sayfa: {pages} · Kontrol türü: {types}.":
    "Pages distinctes concernées : {pages} · Types de contrôles : {types}.",
  "Sayfa bulguları": "Constats sur les pages",
  "Her sayfa ve kontrol türü çifti bir bulgudur; aynı sayfa birden fazla kez sayılabilir.":
    "Chaque paire page et type de contrôle compte pour un constat ; une même page peut être comptée plusieurs fois.",
  "Site geneli kontroller": "Contrôles à l’échelle du site",
  "Her sayfanın ayda kaç tıklama daha getirebileceği ve bunun için ne yapmanız gerektiği.":
    "Combien de clics par mois chaque page pourrait apporter en plus, et ce qu'il faut faire pour les obtenir.",
  "{start} – {end}": "{start} – {end}",
  "Son {days} gün · {period}. Search Console {lag} gün geriden gelir; Analytics oturumları da aynı günlerden okunur. Tahminler 30 güne ölçeklenir.":
    "{days} derniers jours · {period}. Search Console a {lag} jours de retard ; les sessions Analytics sont lues sur les mêmes jours. Les estimations sont ramenées à 30 jours.",
  "{count} sayfada · bu sayfalar bugün ayda {clicks} tıklama alıyor, kazanç bunun {share} kadarı":
    "Sur {count} pages · elles reçoivent {clicks} clics par mois aujourd'hui ; le gain en représente {share}",
  "Önce şuna bakın": "Commencez ici",
  "+{gain} tıklama/ay · {action}": "+{gain} clics/mois · {action}",
  "Dönüşüm getiren sayfalar": "Pages qui convertissent",
  "Analytics bağlanınca görünür": "S'affiche une fois Analytics connecté",
  "Listedeki sayfalardan dönüşüm gelmiyor":
    "Aucune des pages listées ne convertit",
  "Kazanç gelirse ayda yaklaşık +{count} anahtar olay (tahmin) · listele":
    "Si le gain se réalise, environ +{count} événements clés par mois (estimation) · lister",
  "Kazanç beklenmeyen sayfalar": "Pages sans gain attendu",
  "Zaten iyi sıradalar ve normal tıklanıyorlar ya da çok az gösterim aldılar; listede yoklar.":
    "Déjà bien classées et cliquées normalement, ou trop peu affichées ; elles ne sont pas listées.",
  "Kazanç beklenen {total} sayfanın en büyük {count} tanesi listeleniyor; üstteki toplamlar hepsini kapsar.":
    "Les {count} plus grandes des {total} pages avec un gain sont listées ; les totaux ci-dessus les couvrent toutes.",
  "Tahmin nasıl yapılır?": "Comment est-ce estimé ?",
  "Marka aramaları": "Recherches de marque",
  "Hesaba katılmadı ({terms}). Markanızı arayan sizi zaten bulur; onların yüksek tıklama oranı diğer aramaları haksız yere düşük gösterirdi.":
    "Exclues ({terms}). Qui cherche votre marque vous trouve de toute façon ; leur taux de clic élevé ferait paraître toutes les autres recherches trop faibles.",
  "Alan adınızdan tahmin edilen terimlerle ayrıldı ({terms}). Doğru terimleri Arama performansı ekranında onaylayabilirsiniz.":
    "Séparées avec des termes devinés à partir de votre domaine ({terms}). Vous pouvez confirmer les bons termes dans Performances de recherche.",
  "Marka terimi tanımlı değil, bu yüzden marka aramaları da karşılaştırmaya dahil. Arama performansı ekranında tanımlayabilirsiniz.":
    "Aucun terme de marque défini, les recherches de marque entrent donc dans la comparaison. Vous pouvez les définir dans Performances de recherche.",
  "Analytics ne katıyor?": "Qu'apporte Analytics ?",
  "Analytics bağlı değil. Bağlarsanız her sayfanın dönüşüm getirip getirmediği tahminin yanında görünür.":
    "Analytics n'est pas connecté. Connectez-le pour voir à côté de chaque estimation si la page convertit.",
  "Analytics bu kez yanıt vermedi; tahminler yalnızca Search Console'dan.":
    "Analytics n'a pas répondu cette fois ; les estimations viennent uniquement de Search Console.",
  "Tahmini değiştirmez; yanında bir etiket olarak durur. Bir sayfa en az {sessions} organik oturum aldıysa dönüşümlerine bakılır, daha azında oran gürültüdür. {matched} / {total} sayfanın Analytics karşılığı var.":
    "Il ne change pas l'estimation ; il l'accompagne comme étiquette. Les conversions d'une page ne sont jugées qu'à partir de {sessions} sessions organiques ; en dessous, le taux est du bruit. {matched} / {total} pages ont une correspondance Analytics.",
  "Hangi aramaların kazandıracağını görmek için bir satıra tıklayın.":
    "Cliquez sur une ligne pour voir de quelles recherches vient le gain.",
  "Seçtiğiniz iş türü ya da hızlı filtre bu dönemde hiçbir sayfayla eşleşmedi. Filtreleri kaldırın ya da dönemi genişletin.":
    "Le type de travail ou le filtre rapide choisi ne correspond à aucune page sur cette période. Retirez les filtres ou élargissez la période.",
  "Sitenizin aynı sıradaki marka dışı aramaları: {ctr}":
    "Recherches hors marque de votre site à la même position : {ctr}",
  "site {ctr} · {value} puan": "site {ctr} · {value} pts",
  "Bu sayfanın aramaları sitenizin kendi tıklama oranlarına ulaşırsa ayda gelebilecek ek tıklama.":
    "Clics supplémentaires par mois si les recherches de cette page atteignaient les taux de clic de votre site.",
  "/ay": "/mois",
  "Gösterilenlerin yüzde kaçı tıklandı. Altındaki satır, sayfanın marka dışı aramalarını sitenizin aynı sıradaki aramalarıyla yüzde puan olarak karşılaştırır.":
    "Part des impressions cliquées. La ligne en dessous compare les recherches hors marque de la page à celles de votre site à la même position, en points.",
  "Analytics'teki organik oturumlar, Search Console ile aynı günler için. Analytics ekranı dünü de saydığı için sayı orada biraz farklı olabilir.":
    "Sessions organiques dans Analytics, pour les mêmes jours que Search Console. L'écran Analytics compte jusqu'à hier, son chiffre peut donc légèrement différer.",
  "+{gain} tıklama/ay": "+{gain} clics/mois",
  "Bugünkü dönüşüm oranıyla bu, ayda yaklaşık +{count} anahtar olay eder (tahmin).":
    "Au taux de conversion actuel, cela fait environ +{count} événements clés par mois (estimation).",
  "ayda {count} gösterim": "{count} impressions par mois",
  "Değer (Analytics)": "Valeur (Analytics)",
  Mesafe: "Distance",
  "{position}. sıra → hedef {target}": "Position {position} → cible {target}",
  "Hangi aramalar?": "Quelles recherches ?",
  "Kazanç/ay": "Gain/mois",
  "hedef {ctr}": "cible {ctr}",
  "Ne yapmalı? {action}": "Que faire ? {action}",
  "Ortalama {position}. sırada; {impressions} gösterimden {clicks} tıklama aldı. Aşağıdaki aramalar sitenizin kendi tıklama oranlarına ulaşırsa ayda yaklaşık {gain} tıklama daha gelir.":
    "Position moyenne {position} ; {clicks} clics pour {impressions} impressions. Si les recherches ci-dessous atteignaient les taux de clic de votre site, environ {gain} clics de plus par mois arriveraient.",
  "{events} anahtar olay · dönüşen oturum oranı {rate}":
    "{events} événements clés · {rate} des sessions convertissent",
  "{sessions} oturum, hiç dönüşüm yok":
    "{sessions} sessions, aucune conversion",
  "{sessions} oturum; değerini söylemek için az":
    "{sessions} sessions ; trop peu pour juger sa valeur",
  "{sessions} oturum": "{sessions} sessions",
  "Her sayfa için tek bir soru: ayda kaç tıklama daha getirebilir ve bunun için ne yapmalı? Tahmin, sitenizin kendi tıklama oranlarından yapılır. Kazancı olmayan sayfalar listede yer almaz. Bir satıra tıklayınca hangi aramaların bu kazancı getirdiğini görürsünüz.":
    "Une question par page : combien de clics de plus par mois pourrait-elle apporter, et que faire pour les obtenir ? L'estimation utilise les taux de clic de votre site. Les pages sans gain ne sont pas listées. Cliquez sur une ligne pour voir de quelles recherches vient le gain.",
  "Fırsatlar için Search Console gerekir":
    "Les opportunités nécessitent Search Console",
  "Tahminler Search Console'daki aramalardan hesaplanır. Analytics'i de bağlarsanız hangi sayfaların dönüşüm getirdiği yanında görünür.":
    "Les estimations sont calculées à partir de vos recherches dans Search Console. Connectez aussi Analytics pour voir quelles pages convertissent.",
  "Tahmin için veri henüz az": "Pas encore assez de données pour estimer",
  "{start} – {end} aralığında sitenizin tıklama oranını sıraya göre ölçecek kadar arama yok. Dönemi 90 güne genişletmeyi deneyin.":
    "Entre le {start} et le {end}, il n'y a pas assez de recherches pour mesurer le taux de clic de votre site par position. Essayez d'élargir la période à 90 jours.",
  "Bu dönemde kazanç beklenen sayfa yok":
    "Aucune page n'a de gain attendu sur cette période",
  "{start} – {end} aralığında {count} sayfanın hepsi ya zaten iyi sırada ve normal tıklanıyor ya da tahmin için çok az gösterim aldı.":
    "Entre le {start} et le {end}, les {count} pages sont toutes déjà bien classées et cliquées normalement, ou ont eu trop peu d'impressions pour estimer.",
  "Kazanç hangi işte?": "Où est le gain ?",
  "Her satır, o işle ayda gelebilecek ek tıklama. Bir satıra basınca tablo o işe daralır.":
    "Chaque ligne indique les clics supplémentaires par mois que ce travail pourrait apporter. Appuyez sur une ligne pour filtrer le tableau.",
  "İş türleri": "Types de travail",
  "Bu türde kazanç beklenen sayfa yok.":
    "Aucune page n'a de gain avec ce travail.",
  "tıklama/ay": "clics/mois",
  "Tahmini kazanç (tıklama/ay)": "Gain estimé (clics/mois)",
  "Yapılacak iş": "Travail à faire",
  dönüşüyor: "convertit",
  "dönüşüm yok": "aucune conversion",
  "az trafik": "peu de trafic",
  "Dönüşüm getirenler": "Qui convertissent",
  "Trafik var, dönüşüm yok": "Du trafic, aucune conversion",
  "Başlık ve açıklama işi": "Titre et description",
  "Başlığı ve açıklamayı yenileyin": "Réécrivez le titre et la description",
  "İlk sayfada ama sitenizin aynı sıradaki aramalarına göre az tıklanıyor. Sıra değişmeden tıklama artar.":
    "En première page, mais moins cliquée que vos recherches à la même position. Les clics augmentent sans changer de position.",
  "aynı sıra, sitenizin tıklama oranı":
    "même position, taux de clic de votre site",
  "Başlığı, aşağıdaki aramaların ilk kelimelerde karşılık bulacağı biçimde yeniden yazın.":
    "Réécrivez le titre pour que les recherches ci-dessous y trouvent réponse dès les premiers mots.",
  "İki hafta sonra bu ekrana dönüp tahmini kazancın küçülüp küçülmediğine bakın.":
    "Revenez sur cet écran dans deux semaines et vérifiez si le gain estimé a diminué.",
  "İlk sayfada, 4-10. sıra": "En première page, positions 4-10",
  "İçeriği güçlendirin": "Renforcez le contenu",
  "İçeriği, aşağıdaki aramalara rakiplerden daha eksiksiz yanıt verecek şekilde genişletin.":
    "Étoffez le contenu pour qu'il réponde aux recherches ci-dessous plus complètement que les concurrents.",
  "Sitenizdeki ilgili sayfalardan bu sayfaya, aramayı anlatan bir bağlantı metniyle iç bağlantı verin.":
    "Faites des liens vers cette page depuis des pages liées de votre site, avec un texte d'ancre qui décrit la recherche.",
  "Başlıkta ve ilk paragrafta en çok kazandıracak aramayı açıkça geçirin.":
    "Mentionnez clairement la recherche au plus fort gain dans le titre et le premier paragraphe.",
  "2. sayfada, 11-20. sıra": "En deuxième page, positions 11-20",
  "İç bağlantı verin, içeriği genişletin":
    "Ajoutez des liens internes, étoffez le contenu",
  "İlk sayfanın hemen arkasında. İlk sayfaya çıkana kadar neredeyse hiç tıklanmaz.":
    "Juste derrière la première page. Elle n'est presque pas cliquée tant qu'elle n'y est pas.",
  "ilk sayfa, 6-10. sıra": "première page, positions 6-10",
  "Sayfanın bu aramalar için gerçekten doğru sayfa olduğunu kontrol edin; değilse doğru sayfaya yönlendirin.":
    "Vérifiez que c'est bien la bonne page pour ces recherches ; sinon, redirigez vers la bonne.",
  "Eksik alt başlıkları, örnekleri ve sık sorulan soruları ekleyin.":
    "Ajoutez les sous-titres, exemples et questions fréquentes manquants.",
  "Ana menüden ya da güçlü sayfalardan bu sayfaya iç bağlantı verin.":
    "Faites un lien vers cette page depuis le menu principal ou des pages fortes.",
  "Derinde, 21. sıradan sonra": "Loin, au-delà de la position 20",
  "Birleştirin ya da bırakın": "Fusionnez ou abandonnez",
  "Talep var ama sayfa çok geride. Genişletmek mi, başka bir sayfayla birleştirmek mi, bırakmak mı, karar verin.":
    "Il y a de la demande mais la page est loin. Décidez : l'étoffer, la fusionner avec une autre ou l'abandonner.",
  "Aynı konuya değinen başka bir sayfanız varsa ikisini birleştirip eskisinden yönlendirme kurun.":
    "Si une autre page traite du même sujet, fusionnez les deux et redirigez depuis l'ancienne.",
  "Sayfa bu konunun cevabıysa eksik bölümleri yazın ve iç bağlantı verin.":
    "Si la page répond à ce sujet, rédigez les sections manquantes et ajoutez des liens internes.",
  "Tahmini kazanç küçükse sayfayı bırakın; emeği daha yakın fırsatlara harcayın.":
    "Si le gain estimé est faible, laissez la page et consacrez l'effort à des opportunités plus proches.",
  "Bu bilgisayarda {start} – {end} arasının geçmişi saklı; Google'ın 16 ay sınırı buna uygulanmaz.":
    "L'historique du {start} au {end} est stocké sur cet ordinateur ; la limite de 16 mois de Google ne s'y applique pas.",
  "{from} → {to}. sıra · {impressions} gösterim":
    "Position {from} → {to} · {impressions} impressions",
  "Önceki aynı uzunluktaki döneme göre, gösterimle tartılarak: çok aranan bir sorgunun küçük hareketi az arananın büyük hareketinden önce gelir.":
    "Par rapport à la période précédente de même durée, pondéré par les impressions : un petit mouvement d'une requête très recherchée passe avant un grand mouvement d'une requête rare.",
  "{count} sorgunun ortalama sırası; sağdaki sayı önceki döneme göre değişim. Bir çubuğa tıklayınca tablo o gruba göre daralır.":
    "Position moyenne de {count} requêtes ; le chiffre à droite est l'évolution par rapport à la période précédente. Cliquez sur une barre pour filtrer le tableau.",
  "Önceki döneme göre bu gruba giren ya da çıkan sorgu sayısı":
    "Requêtes entrées dans ce groupe ou sorties depuis la période précédente",
  "Bu listede en çok gösterim alan dörtte bir: {impressions} ve üstü gösterim.":
    "Le quart de cette liste avec le plus d'impressions : {impressions} ou plus.",
  "{value} sıra yükseldi": "{value} places gagnées",
  "{value} sıra geriledi": "{value} places perdues",
  "Önceki {days} güne göre": "Par rapport aux {days} jours précédents",
  "Analytics {ga4} gün, Search Console {gsc} gün geriden gelir; bu yüzden buradaki günler üstteki tıklama kutularından farklıdır. Değişimler önceki aynı uzunluktaki döneme göredir.":
    "Analytics a {ga4} jour de retard et Search Console {gsc} jours ; les jours ici diffèrent donc des tuiles de clics ci-dessus. Les évolutions portent sur la période précédente de même durée.",
  "Kurulum tamam": "Configuration terminée",
  "Kurulum {done} / {total}": "Configuration {done} / {total}",
  "Kurulumda eksik: {items}.": "Manque dans la configuration : {items}.",
  Tamamla: "Compléter",
  "Güncel denetim": "Audit récent",
  "Yapay zeka ajanı": "Agent IA",

  Denetle: "Auditer",

  "öneri, sayılmaz": "conseil, non compté",

  "Kullanılmıyor, hizmet hesabı bağlı":
    "Non utilisé, un compte de service est connecté",
  "Uygulamanın durumu": "État de l'application",
  "Bu kurulumun kendisi. Bir projenin kurulum listesi Panel'de ve Proje bilgisi'nde.":
    "Cette installation elle-même. La liste de configuration d'un projet est dans le Tableau de bord et les Infos du projet.",
  Site: "Site",
  "Bu projede {count} farklı site denetlenmiş:":
    "Ce projet contient des audits de {count} sites différents :",
  "Grafik ve değişim okları her zaman aynı sitenin denetimlerini karşılaştırır; birden çok site seçiliyken grafik gizlenir.":
    "Le graphique et les flèches comparent toujours les audits d'un même site ; le graphique est masqué quand plusieurs sites sont affichés.",
  "Ek tıklama tahmini": "Clics supplémentaires estimés",
  "Kontrol edilen {checked} sayfa içinde. Google başka bir adresi asıl saydı: bu sayfaların canonical etiketini ve iç bağlantılarını kontrol edin.":
    "Sur {checked} pages vérifiées. Google a choisi une autre adresse comme principale : vérifiez la balise canonical et les liens internes de ces pages.",
  "Kontrol edilen {checked} sayfanın hiçbirinde Google başka bir adresi asıl saymadı.":
    "Pour aucune des {checked} pages vérifiées Google n'a choisi une autre adresse comme principale.",
  "En fazla kazanılabilecek tıklama / ay (üst sınır)":
    "Au plus ce nombre de clics en plus / mois (plafond)",
  "Aramaların toplamı daha büyük; sayfanın tamamı hedef orana ulaşsa alacağı kadarla sınırlandı.":
    "Les recherches totalisent davantage ; plafonné à ce que la page entière obtiendrait au taux cible.",
  "2. sayfa, 11-20. sıra": "deuxième page, positions 11-20",

  "Trafiği yüksek, dönüşümü düşük sayfa":
    "pages à fort trafic et faible conversion",
  "Listede gösteriliyor": "Affiché dans la liste",
  Listele: "Lister",
  "“{query}” için bir basamak yükselme fırsatı":
    "Occasion de faire monter « {query} » d'un cran",
  "ilk {count} iş birlikte {days} günde en fazla {clicks} ek tıklama getirebilir (üst sınır).":
    "ensemble, les {count} premières tâches pourraient apporter au plus {clicks} clics supplémentaires en {days} jours (plafond).",

  "Ortalama sırası 4–20 olan {count} sorgu; her biri bir basamak yükselirse en fazla {clicks} ek tıklama (üst sınır).":
    "{count} requêtes en position moyenne 4–20 ; si chacune monte d'un cran, au plus {clicks} clics supplémentaires (plafond).",
  "İlk sayfada ama ilk üçün altında. Bir basamak yükselmek (6-10'dan 4-5'e, 4-5'ten 2-3'e) tıklamayı belirgin artırır.":
    "En première page mais sous les trois premiers. Monter d'un cran (6-10 vers 4-5, 4-5 vers 2-3) augmente nettement les clics.",
  "bir basamak yukarı": "un cran plus haut",
  "Her sayfanın Google'da çıktığı her arama ayrı ayrı ele alınır. İlk sayfadaki bir arama sitenizin aynı sıradaki aramalarının tıklama oranının %70'inin altındaysa kazanç o orana ulaşmaktır (başlık işi). Diğer her arama yalnızca bir basamak yükselir: 6-10. sıradan 4-5'in oranına, 4-5. sıradan 2-3'ün oranına, 2. sayfadan ilk sayfanın (6-10. sıra) oranına, daha geriden 2. sayfanın (11-20. sıra) oranına. Bir sayfanın toplamı, aramaları sıra gruplarına ayrılıp her grup bir basamak yükselse alacağı ek tıklamayı geçemez. Oranlar başka sitelerden değil, sizin sitenizden ölçülür; bu yüzden üstteki sayı bir üst sınırdır, söz değildir.":
    "Chaque recherche pour laquelle une page apparaît est traitée séparément. Si une recherche en première page obtient moins de 70 % du taux de clic de vos recherches à cette position, le gain consiste à atteindre ce taux (travail sur le titre). Toute autre recherche ne monte que d'un cran : de 6-10 au taux de 4-5, de 4-5 au taux de 2-3, de la deuxième page au taux de la première (6-10), de plus loin au taux de la deuxième page (11-20). Le total d'une page ne dépasse jamais ce que ses recherches gagneraient si chaque groupe à la même position montait d'un cran. Les taux viennent de votre site ; le chiffre ci-dessus est un plafond, pas une promesse.",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. Her biri bir basamak yükselirse (6-10'dan 4-5'e, 4-5'ten 2-3'e, 11-20'den ilk sayfaya) birlikte en fazla {clicks} ek tıklama getirebilir (üst sınır).":
    "{count} requêtes en position moyenne 4 à 20 avec au moins {impressions} impressions. Si chacune monte d'un cran (6-10 vers 4-5, 4-5 vers 2-3, 11-20 vers la première page), elles pourraient apporter ensemble au plus {clicks} clics supplémentaires (plafond).",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. Olası kazanç, sorgu bir basamak yükselirse (6-10'dan 4-5'e, 4-5'ten 2-3'e, 11-20'den ilk sayfaya) beklenen en fazla ek tıklamadır.":
    "{count} requêtes en position moyenne 4 à 20 avec au moins {impressions} impressions. Le gain possible est le maximum de clics supplémentaires attendu si une requête monte d'un cran (6-10 vers 4-5, 4-5 vers 2-3, 11-20 vers la première page).",

  "Karşılaştırma yapılamadı: tarama kapsamları farklı veya bilinmiyor.":
    "Comparaison impossible : les périmètres des explorations diffèrent ou sont inconnus.",
  "{measured} / {total} kontrol ölçüldü.":
    "{measured} / {total} contrôles mesurés.",
  "Taranan kapsamda sorun bulunamadı.":
    "Aucun problème trouvé dans le périmètre exploré.",
  "Ölçülmeyen kontroller var; tüm site için sağlıklı sonucu çıkarılamaz. Ayrıntılarda kapsamı kontrol edin.":
    "Certains contrôles n’ont pas été mesurés ; l’état du site entier ne peut pas être confirmé. Consultez le périmètre dans les détails.",
  "+ {count} kontrol türü daha": "+ {count} autres types de contrôles",
  "Google aramasından sitenize gelen tıklamalar.":
    "Clics vers votre site depuis la recherche Google.",
  "Sitenizin Google sonuçlarında gösterilme sayısı.":
    "Nombre d’affichages de votre site dans les résultats Google.",
  "Kurulum tercihleri": "Préférences de configuration",
  Denetimler: "Audits",
  "Bağlantı durumu yenilenemedi":
    "Impossible d’actualiser l’état de la connexion",
  "Google yapılandırması okunamadı. Yenile ile tekrar deneyin.":
    "Impossible de lire la configuration Google. Réessayez avec Actualiser.",
  "Site seçilmedi": "Aucun site sélectionné",
  "Kendi sitenizin denetimini göstermek için proje ayarlarına alan adını girin.":
    "Saisissez le domaine dans les paramètres du projet pour afficher l’audit de votre site.",
  "Son denetim başarısız": "Échec du dernier audit",
  "Arama verisi için Search Console bağlantısını kontrol edin.":
    "Vérifiez la connexion Search Console pour consulter les données de recherche.",
  "Arama verisi şu an okunamadı. Yenile ile tekrar deneyin.":
    "Impossible de lire les données de recherche pour le moment. Réessayez avec Actualiser.",
  "Arama özeti": "Résumé de recherche",
  "Son {days} günde Google aramalarından {clicks} tıklama aldınız.":
    "Vous avez reçu {clicks} clics depuis la recherche Google sur {days} jours.",
  "Son yenileme başarısız; önbellekteki veriler gösteriliyor.":
    "La dernière actualisation a échoué ; les données en cache sont affichées.",
  "Önceki dönem: {start} – {end}.": "Période précédente : {start} – {end}.",
  "Son veri günü: {date}. Son {count} gün toplamlara dahil değil.":
    "Dernier jour de données : {date}. Les {count} derniers jours sont exclus des totaux.",
  "Google tarih bildirmedi; son günler dışarıda.":
    "Google n’a pas indiqué de date de complétude ; les jours récents sont exclus.",
  "Sorgu listesi satır sınırında kesildi; tahminler yalnızca alınan sorguları kapsar.":
    "La liste a atteint sa limite de lignes ; les estimations couvrent uniquement les requêtes récupérées.",
  "Google bazı sorguları gizler; sorgu listesi site toplamının tamamı değildir.":
    "Google masque certaines requêtes ; la liste ne représente pas le total complet du site.",
  "{value} (para birimi bilinmiyor)": "{value} (devise inconnue)",
  "Satış ölçümü doğrulanmadı; sıfır satış, mağaza olmadığı anlamına gelmez.":
    "Le suivi des ventes n’est pas confirmé ; zéro vente ne signifie pas l’absence de boutique.",
  "Analytics verisi sınırlı veya eksik. Bilinmeyen değerler çizilmez; dönem karşılaştırması gösterilmez.":
    "Les données Analytics sont limitées ou incomplètes. Les valeurs inconnues restent vides ; les comparaisons sont masquées.",
  "Saat dilimi bilinmiyor": "Fuseau horaire inconnu",
  "Google arama tıklamaları ile organik oturumlar farklı ölçümlerdir; Analytics diğer arama motorlarını da kapsar.":
    "Les clics Google et les sessions organiques mesurent des choses différentes ; Analytics inclut aussi d’autres moteurs de recherche.",
  "Google gizlilik eşiği nedeniyle bazı verileri göstermiyor.":
    "Google masque certaines données en raison de seuils de confidentialité.",
  "Google bu raporu örneklenmiş veriden hesapladı.":
    "Google a calculé ce rapport à partir de données échantillonnées.",
  "Bazı ölçümler hesap erişim kısıtı nedeniyle okunamadı. Analytics mülkündeki yetkinizi kontrol edin.":
    "Certaines métriques sont illisibles à cause de restrictions d’accès. Vérifiez vos droits sur la propriété Analytics.",
  "Bazı satırlar Google tarafından birleştirildi; ayrıntılar eksik olabilir.":
    "Google a regroupé certaines lignes ; des détails peuvent manquer.",
  "Ölçülen bulgulara göre önce şu işleri değerlendirin.":
    "Examinez d’abord ces tâches, selon les constats mesurés.",
  "Kurulum durumu okunamayanlar: {items}. Yenile ile tekrar deneyin.":
    "État de configuration illisible pour : {items}. Réessayez avec Actualiser.",
  "Ölçülen kapsamda öncelikli iş bulunmadı.":
    "Aucune tâche prioritaire dans le périmètre mesuré.",
  "Denetim özeti okunamadı": "Impossible de lire le résumé de l’audit",
  "İlk denetim olup olmadığı bilinmiyor. Denetim geçmişini açın veya Yenile ile tekrar deneyin.":
    "Impossible de savoir si un audit existe déjà. Ouvrez l’historique ou réessayez avec Actualiser.",
  "Son denetim {when}. Denetim bulguları yalnızca bu taramaya dayanır.":
    "Dernier audit : {when}. Les constats reposent uniquement sur cette exploration.",
  "Bazı veriler yenilenemedi; önbellekteki tarihleri kontrol edin.":
    "Certaines données n’ont pas pu être actualisées ; vérifiez les dates en cache.",
  Yenilendi: "Actualisé",
  "Veri alındı: {time}": "Données reçues : {time}",
  "Günlük tıklamalar; soluk çizgi önceki dönemi gösterir.":
    "Clics quotidiens ; la ligne pâle représente la période précédente.",
  "Bir üst sıra bandına çıkabilecek sorgular":
    "Requêtes pouvant gagner une tranche de positions",
  "Marka adları onaylandı.": "Termes de marque confirmés.",
  "Marka adları öneriye göre ayrıldı.":
    "Les requêtes de marque sont séparées selon les termes suggérés.",
  "Marka ayrımı yapılmadı.": "Les requêtes de marque ne sont pas séparées.",
  "Bu kapsamda uygun sorgu bulunmadı.":
    "Aucune requête admissible dans ce périmètre.",
  "{count} sorgu bir üst sıra bandı için değerlendirildi.":
    "{count} requêtes évaluées pour la tranche de positions supérieure.",
  "Yeterli örnek yok; ek tıklama üst sınırı hesaplanamadı.":
    "Pas assez d’observations pour calculer un plafond de clics supplémentaires.",
  "Hesaplanabilen {known} sorguda en fazla {clicks} ek tıklama (üst sınır); {unknown} sorguda hesaplanamadı.":
    "Au plus {clicks} clics supplémentaires pour {known} requêtes estimables (plafond) ; {unknown} requêtes sans estimation.",
  "Bu bir tahmindir; sayfa bazlı Fırsatlar toplamına eklenmez.":
    "C’est une estimation ; ne l’ajoutez pas au total des opportunités par page.",
  "{count} kritik kontrol türü": "{count} types de contrôles critiques",
  "{count} uyarı kontrol türü":
    "{count} types de contrôles avec avertissements",
  "Site geneli": "À l’échelle du site",
  "Sorgu arşivi": "Archives des requêtes",
  "Karşılaştırma yalnızca iki taramada da ölçülen kontrolleri kapsar; diğer kontroller için değişim bilinmiyor.":
    "La comparaison couvre uniquement les contrôles mesurés dans les deux explorations ; les autres changements sont inconnus.",
};
