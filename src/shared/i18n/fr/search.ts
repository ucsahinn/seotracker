/* eslint-disable max-lines -- locale translation data */
import type { Catalog } from "@/shared/i18n";

/** French for the Search performance screen, its to-do copy and the printable report. */
export const frSearch: Catalog = {
  "Arşivde en çok gösterim": "Le plus d’impressions dans cette archive",
  "{date} tarihli geçmiş bu bilgisayarda saklı; Google'ın 16 ay sınırı buna uygulanmaz.":
    "L’historique du {date} est conservé sur cet ordinateur ; la limite de 16 mois de Google ne s’y applique pas.",
  "Marka adları kaydedildi": "Noms de marque enregistrés",
  "Marka adları kaydedilemedi": "Impossible d'enregistrer les noms de marque",
  "Sitenizin adını ve insanların onu nasıl yazdığını girin. Bu kelimeleri içeren aramalar marka araması sayılır.":
    "Saisissez le nom de votre site et les façons dont on l'écrit. Les recherches contenant ces mots comptent comme recherches de marque.",
  "Marka adları": "Noms de marque",
  "{term} adını kaldır": "Retirer {term}",
  "Marka adı ekle": "Ajouter un nom de marque",
  "Örnek: örnek site": "Exemple : monsite",
  Ekle: "Ajouter",
  "Öneriler:": "Suggestions :",
  "Eşiği aşan değişim yok.": "Aucun changement au-dessus du seuil.",
  "{previous} → {current} tıklama": "{previous} → {current} clics",
  "sıra {position}": "position {position}",
  "Düşenler ({count})": "En baisse ({count})",
  "Yükselenler ({count})": "En hausse ({count})",
  "Arşivde henüz gün yok. Bu ekran her açıldığında Search Console'dan günlük toplamları alıp bu bilgisayarda saklar; ay ay eğilim birkaç gün içinde burada görünür.":
    "Aucun jour dans l'archive pour l'instant. À chaque ouverture, cet écran enregistre les totaux quotidiens de Search Console sur cet ordinateur ; la tendance mois par mois apparaîtra ici d'ici quelques jours.",
  "Arşiv {date} tarihinden başlıyor; iki ay dolunca eğilim burada görünür.":
    "L'archive commence le {date} ; la tendance apparaîtra quand elle couvrira deux mois.",
  "{count} aylık tıklama, {start} – {end}.":
    "Clics sur {count} mois, {start} – {end}.",
  "Aylık tıklama": "Clics mensuels",
  Ay: "Mois",
  "Arşivdeki gün": "Jours dans l'archive",
  "Bu bilgisayardaki arşivden, cihaz filtresine göre (ülke filtresi uygulanmaz). Kesik çizgili çubuk: arşivin o ayın tamamını tutmadığı ay.":
    "Depuis l'archive de cet ordinateur, selon le filtre d'appareil (le filtre de pays ne s'applique pas). Barre en pointillé : un mois que l'archive ne couvre pas entièrement.",
  "Önceki döneme göre en çok değişenler":
    "Plus fortes variations depuis la période précédente",
  "{start} – {end} ile karşılaştırma. En az {clicks} tıklamalık ve {share} oranında bir değişim aranır.":
    "Comparé à {start} – {end}. On cherche une variation d'au moins {clicks} clics et de {share}.",
  "Satır sınırı yüzünden bir dönemin tablosu eksik; yalnızca iki dönemde de görünen satırlar karşılaştırıldı.":
    "Le tableau d'une période est incomplet à cause de la limite de lignes ; seules les lignes présentes dans les deux périodes ont été comparées.",
  "Yeni ve kaybolan sorgular": "Requêtes nouvelles et perdues",
  "Yalnızca bir dönemde en az {impressions} gösterim alan sorgular.":
    "Requêtes avec au moins {impressions} impressions dans une seule des deux périodes.",
  "Yeni görünenler": "Nouvellement visibles",
  "Önceki dönemin tablosu satır sınırında kesildiği için hangi sorguların yeni olduğu bilinemiyor.":
    "Impossible de savoir quelles requêtes sont nouvelles : le tableau de la période précédente a été coupé à la limite de lignes.",
  "Bu dönemde yeni görünen sorgu yok.":
    "Aucune requête nouvellement visible sur cette période.",
  "Kaybolanlar (önceki dönemdeki değerleriyle)":
    "Perdues (avec leurs chiffres de la période précédente)",
  "Bu dönemin tablosu satır sınırında kesildiği için hangi sorguların kaybolduğu bilinemiyor.":
    "Impossible de savoir quelles requêtes ont été perdues : le tableau de cette période a été coupé à la limite de lignes.",
  "Kaybolan sorgu yok.": "Aucune requête perdue.",
  "Gücünü kaybeden sayfalar": "Pages qui perdent du terrain",
  "Son çeyrekteki tıklamaları, önceki dört çeyreğin en iyisinin {share} kadarından aza düşen ve geçen yılın aynı çeyreğinden de geride kalan sayfalar.":
    "Pages dont les clics du dernier trimestre sont passés sous {share} de leur meilleur des quatre trimestres précédents, et qui restent aussi derrière le même trimestre de l'an dernier.",
  "Bu karşılaştırma bir yılı aşkın veri ister; Search Console bu mülk için o kadar eski veri vermedi ya da filtre uygulanmış.":
    "Cette comparaison demande plus d'un an de données ; Search Console n'en a pas fourni autant pour cette propriété, ou un filtre est actif.",
  "Belirgin biçimde gücünü kaybeden sayfa yok.":
    "Aucune page ne perd nettement de terrain.",
  "Son çeyrek {clicks} · en iyisi {peak} tıklama":
    "Dernier trimestre {clicks} · meilleur : {peak} clics",
  "Uzun dönem: aylık tıklama": "Long terme : clics mensuels",
  "Search Console en fazla 16 ay geriye gider; bu arşiv günlük toplamları bu bilgisayarda daha uzun saklar.":
    "Search Console remonte au plus 16 mois ; cette archive garde les totaux quotidiens plus longtemps sur cet ordinateur.",
  sorgular: "requêtes",
  sayfalar: "pages",
  "sorgu-sayfa eşleşmeleri": "paires requête-page",
  "Geçen yıl karşılaştırılamıyor: Google bu günleri artık vermiyor (en fazla 16 ay).":
    "Comparaison avec l'an dernier impossible : Google ne fournit plus ces jours (16 mois au plus).",
  "Önceki dönem karşılaştırılamıyor: Google bu günleri vermiyor.":
    "Comparaison avec la période précédente impossible : Google ne fournit pas ces jours.",
  "Verinin durumu": "État des données",

  "Kesinleşmemiş gün yok.": "Aucun jour encore en cours de comptage.",
  "Son veri: {date}.": "Dernières données : {date}.",
  "Bu dönem için Google'dan hiç satır gelmedi.":
    "Google n'a renvoyé aucune ligne pour cette période.",
  "Gizli sorgular": "Requêtes masquées",
  "Gizli sorgu payı hesaplanamadı (tıklama yok).":
    "Part des requêtes masquées non calculable (aucun clic).",
  "Satır sınırına ulaşıldı ({tables}); en az tıklanan uç eksik. Daraltmak için filtre kullanın.":
    "Limite de lignes atteinte ({tables}) ; la queue la moins cliquée manque. Utilisez un filtre pour réduire.",
  "Tablolar tam: {queries} sorgu, {pages} sayfa okundu.":
    "Tableaux complets : {queries} requêtes et {pages} pages lues.",
  "Sıra 4-10": "Position 4-10",
  "İlk sayfada ama ilk üçte değil: en çok tıklama kazandıran adım ilk üçe çıkmaktır.":
    "En première page mais hors du top trois : entrer dans le top trois rapporte le plus de clics.",
  "Bu dönem için satır yok": "Aucune ligne pour cette période",
  "Search Console bu dönem ve filtreler için satır vermedi. Dönemi genişletmeyi ya da filtreleri kaldırmayı deneyin.":
    "Search Console n'a renvoyé aucune ligne pour cette période et ces filtres. Choisissez une période plus longue ou retirez les filtres.",
  "Taban: okunan {rows} sorgu, {clicks} tıklama. Sitenin toplamı {site} tıklama; aradaki fark Google'ın gizlediği sorgulardan.":
    "Base : {rows} requêtes lues, {clicks} clics. Le total du site est de {site} clics ; l'écart vient des requêtes masquées par Google.",
  "Taban: okunan {rows} sayfa, {clicks} tıklama. Google sayfa satırlarını sayfa bazında topladığı için site toplamından ({site}) biraz farklı olabilir.":
    "Base : {rows} pages lues, {clicks} clics. Google totalise les lignes de pages par page, ce qui peut différer légèrement du total du site ({site}).",
  "Çubuk, satırın bu tablodaki tıklama payı.":
    "La barre est la part de clics de la ligne dans ce tableau.",
  "Google'ın satır sınırına ulaşıldı; en az tıklanan uç listede yok.":
    "La limite de lignes de Google a été atteinte ; la queue la moins cliquée n'est pas listée.",
  "Önceki dönem tablosu da kesildi; değişimi bilinmeyen satırlarda – yazar.":
    "Le tableau de la période précédente a aussi été coupé ; les lignes à variation inconnue affichent –.",
  "Önceki dönemde bilinmiyor": "Inconnu pour la période précédente",
  "Sıra {range}": "Position {range}",
  "Paylar sitenin toplamına göre: {clicks} tıklama, {impressions} gösterim.":
    "Parts du total du site : {clicks} clics, {impressions} impressions.",
  "Bu kırılımda filtre olduğu için paylar satırların toplamına göre: {clicks} tıklama.":
    "Un filtre est actif sur cette répartition, les parts portent donc sur le total des lignes : {clicks} clics.",
  "{name} filtresini kaldır": "Retirer le filtre {name}",
  "Tüm ekranı {name} ile daralt": "Restreindre tout l'écran à {name}",
  "Daha az göster": "Afficher moins",
  "Tümünü göster ({count})": "Tout afficher ({count})",
  "Google'ın satır sınırına ulaşıldı; liste tam değil.":
    "La limite de lignes de Google a été atteinte ; la liste est incomplète.",
  "{clicks} tıklama": "{clicks} clics",
  "Okunan {count} sorgunun ortalama sırasına göre. Google'ın gizlediği sorgular burada yok.":
    "Selon la position moyenne des {count} requêtes lues. Les requêtes masquées par Google ne sont pas incluses.",
  "Haftalara göre sorgu dağılımı": "Requêtes par semaine",
  "{count} haftada, sıra aralıklarının sorgular içindeki payı.":
    "Part des tranches de position parmi les requêtes, sur {count} semaines.",
  Hafta: "Semaine",
  "{date} haftası": "Semaine du {date}",
  "Her hafta, o hafta görünen sorguların sıra aralıklarına dağılımı (pay). Bu bilgisayardaki sorgu arşivinden, kesin verilerle; tüm cihaz ve ülkeler.":
    "Chaque semaine, la répartition des requêtes visibles cette semaine-là entre tranches de position (part). Depuis l'archive des requêtes de cet ordinateur, données définitives ; tous appareils et pays.",
  "Haftalık dağılım için sorgu arşivi doluyor; Sıralama takibi ekranı ya da bu ekran açıldıkça tamamlanır.":
    "L'archive des requêtes se remplit encore pour la répartition hebdomadaire ; elle se complète à l'ouverture de cet écran ou du Suivi des classements.",
  "Haftalık dağılım cihaz ya da ülke filtresiyle gösterilmez: arşiv bu kırılımları tutmaz.":
    "La répartition hebdomadaire ne s'affiche pas avec un filtre d'appareil ou de pays : l'archive ne conserve pas ces répartitions.",
  "Haftalık dağılım için en az iki hafta gerekir.":
    "La répartition hebdomadaire nécessite au moins deux semaines.",
  "{count} sorgu · {clicks} tıklama": "{count} requêtes · {clicks} clics",
  "(sorgu tıklamalarının {share} kadarı)": "({share} des clics des requêtes)",
  "Tıklama oranı {ctr} · ortalama sıra {position}":
    "CTR {ctr} · position moyenne {position}",
  "Marka aramaları": "Recherches de marque",
  "Marka dışı aramalar": "Recherches hors marque",
  "{count} sorgu · tıklama oranı {ctr} · ortalama sıra {position}":
    "{count} requêtes · CTR {ctr} · position moyenne {position}",
  "Marka adları: {terms}. Paylar okunan sorgulara göre; gizli sorgular dahil değil.":
    "Noms de marque : {terms}. Parts des requêtes lues ; les requêtes masquées ne sont pas incluses.",
  "Marka adlarını düzenle": "Modifier les noms de marque",
  "Sorgularınız Google'da hangi sıralarda görünüyor.":
    "À quelles positions vos requêtes apparaissent sur Google.",
  "Marka ve marka dışı aramalar": "Recherches de marque et hors marque",
  "Adınızla gelen aramalar ile sizi bilmeden bulanlar ayrı ölçülür.":
    "Les recherches de votre nom et celles de personnes qui ne vous connaissaient pas sont mesurées séparément.",
  "Bir cihaza tıklayınca tüm ekran o cihaza göre daralır.":
    "Cliquez sur un appareil pour restreindre tout l'écran à celui-ci.",
  "Bir ülkeye tıklayınca tüm ekran o ülkeye göre daralır.":
    "Cliquez sur un pays pour restreindre tout l'écran à celui-ci.",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü. Google bu dökümü sayfa bazında toplar.":
    "Les formats spéciaux sous lesquels vos résultats sont apparus sur Google. Google totalise cette répartition par page.",
  "Google bu dönem için özel bir sonuç biçimi (zengin sonuç, video vb.) bildirmedi.":
    "Google n'a signalé aucun format de résultat spécial (résultat enrichi, vidéo, etc.) pour cette période.",
  "Soru ve uzun aramalar": "Questions et recherches longues",
  "Soru kalıbındaki aramalar ve {words} ya da daha çok kelimeli aramalar: içerik fikirlerinin en net kaynağı.":
    "Les recherches formulées en question et celles de {words} mots ou plus : la source d'idées de contenu la plus claire.",
  "Soru aramaları": "Recherches en question",
  "Uzun aramalar": "Recherches longues",
  "Paneli kapat": "Fermer le panneau",
  "Ayrıntı yüklenemedi": "Impossible de charger le détail",
  "Search Console bağlantısı yok.": "La Search Console n'est pas connectée.",
  "{start} – {end}, kesin günler": "{start} – {end}, jours définitifs",
  "{key} için günlük tıklama, toplam {total}.":
    "Clics quotidiens pour {key}, {total} au total.",
  "Bu sayfanın sorguları ({count})": "Requêtes de cette page ({count})",
  "Bu sorguda görünen sayfalar ({count})":
    "Pages affichées pour cette requête ({count})",
  "Bu sayfa için listelenen sorgu yok; tıklamaları Google'ın gizlediği sorgulardan geliyor olabilir.":
    "Aucune requête listée pour cette page ; ses clics viennent peut-être de requêtes masquées par Google.",
  "Bu sorgu için sayfa satırı yok.": "Aucune ligne de page pour cette requête.",
  "Sorgu-sayfa tablosu satır sınırında kesildi; bazı eşleşmeler eksik olabilir.":
    "Le tableau requête-page a été coupé à la limite de lignes ; certaines paires peuvent manquer.",
  "Sorgu satırlarının toplamı sayfanın toplamından küçük olabilir: gizli sorgular listelenmez.":
    "Les lignes de requêtes de cette page peuvent totaliser moins que son total : les requêtes masquées ne sont pas listées.",
  "Hedef sayfa": "Page cible",
  "{count} sayfa bu sorguda": "{count} pages sur cette requête",
  "Olası kazanç": "Gain possible",
  "Yetersiz veri": "Données insuffisantes",
  "Sıra 4-20 arasındaki sorgular": "Requêtes en position 4-20",
  "Marka dışı sorgularınızın her sıradaki tıklama oranı. Bir sırada en az {queries} sorgu ve {impressions} gösterim yoksa o sıra hesaba katılmaz; tahmin yapılmaz.":
    "Le CTR de vos requêtes hors marque à chaque position. Une position ne compte qu'avec au moins {queries} requêtes et {impressions} impressions ; rien n'est estimé.",
  "Sorgularınızın her sıradaki tıklama oranı (marka adları tanımlanmadığı için marka aramaları dahil). Bir sırada en az {queries} sorgu ve {impressions} gösterim yoksa o sıra hesaba katılmaz; tahmin yapılmaz.":
    "Le CTR de vos requêtes à chaque position (recherches de marque incluses, aucun nom de marque n'étant défini). Une position ne compte qu'avec au moins {queries} requêtes et {impressions} impressions ; rien n'est estimé.",
  "İlk üçe yakın sorgular": "Requêtes proches du top trois",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. İlk üçe çıkarlarsa birlikte yaklaşık {clicks} ek tıklama getirebilir.":
    "{count} requêtes avec une position moyenne entre 4 et 20 et au moins {impressions} impressions. Atteindre le top trois pourrait rapporter ensemble environ {clicks} clics de plus.",
  "En büyük kazançlı {shown} tanesi listeleniyor.":
    "Les {shown} au plus fort gain sont listées.",
  "Sırasına göre az tıklanan sonuçlar":
    "Résultats moins cliqués que leur position ne le laisse attendre",
  "Tıklama oranı, sitenizde aynı sıradaki sonuçların ortalamasının {share} kadarından az olan ve en az {impressions} gösterim alan sorgular. Başlık ve açıklama yeniden yazılarak kazanılabilir.":
    "Requêtes dont le CTR est inférieur à {share} de celui de vos résultats à la même position, avec au moins {impressions} impressions. Un titre et une description réécrits peuvent gagner ces clics.",
  "Sırasına göre belirgin biçimde az tıklanan sonuç yok ya da karşılaştırma için yeterli veri yok.":
    "Aucun résultat n'est nettement sous-cliqué pour sa position, ou les données manquent pour comparer.",
  "Bu sırada beklenen": "Attendu à cette position",
  "Görünen ama hiç tıklanmayan sayfalar": "Pages visibles mais jamais cliquées",
  "Bu dönemde en az {impressions} gösterim alıp tek tıklama almayan sayfalar.":
    "Pages avec au moins {impressions} impressions et aucun clic sur cette période.",
  "{shown} / {total} sayfa listeleniyor.": "{shown} pages listées sur {total}.",
  "Gösterim alıp hiç tıklanmayan sayfa yok.":
    "Aucune page n'a reçu d'impressions sans clic.",
  "Sitenizin sıraya göre tıklama oranı": "CTR de votre site par position",
  "Yukarıdaki kazançların ölçüsü: başka sitelerin değil, sizin sonuçlarınızın her sıradaki tıklama oranı.":
    "L'étalon des gains ci-dessus : le CTR de vos propres résultats à chaque position, pas celui d'autres sites.",
  Web: "Web",
  Video: "Vidéo",
  "Google güncellemesi": "Mise à jour Google",
  Not: "Note",
  "Site denetimi tamamlandı": "Audit du site terminé",
  "Not eklendi": "Note ajoutée",
  "Not eklenemedi": "Impossible d'ajouter la note",
  "Not silindi": "Note supprimée",
  "Not silinemedi": "Impossible de supprimer la note",
  "Grafikteki işaretler": "Repères du graphique",
  "Notu sil: {note}": "Supprimer la note : {note}",
  "Örnek: Yeni sayfa başlıkları yayına alındı":
    "Exemple : nouveaux titres de pages en ligne",
  "Notu ekle": "Ajouter la note",
  "Not ekle": "Ajouter une note",
  "Bu dönemin dışındaki notlar ({count})":
    "Notes hors de cette période ({count})",
  "Önceki dönemle": "Avec la période précédente",
  "Geçen yılla": "Avec l'an dernier",
  "Karşılaştırma yok": "Sans comparaison",
  Yenilenemedi: "Échec de l'actualisation",
  "Google'da kaç kez göründüğünüz, kaç tıklama aldığınız ve önce neyi düzeltmeniz gerektiği.":
    "À quelle fréquence vous apparaissez sur Google, combien de clics vous obtenez et que corriger en premier.",
  "Sorgular (CSV)": "Requêtes (CSV)",
  "Sayfalar (CSV)": "Pages (CSV)",
  "İlk üçe yakın sorgular (CSV)": "Requêtes proches du top trois (CSV)",
  "Sorguları E-Tablolar'a aktar": "Exporter les requêtes vers Google Sheets",
  "Sayfaları E-Tablolar'a aktar": "Exporter les pages vers Google Sheets",
  Karşılaştırma: "Comparaison",
  "Mülk: {site}": "Propriété : {site}",
  "Bu dönemde hiç gösterim yok": "Aucune impression sur cette période",
  "Seçili cihaz, ülke ya da arama türü için Google bu günlerde sitenizi hiç göstermedi. Filtreleri genişletmeyi deneyin.":
    "Google n'a pas affiché votre site pour l'appareil, le pays ou le type de recherche choisi ces jours-là. Élargissez les filtres.",
  "Google bu günlerde sitenizi arama sonuçlarında göstermedi. Yeni bir siteyse birkaç gün sonra tekrar bakın; değilse dizin durumunu Site denetimi'nden kontrol edin.":
    "Google n'a pas affiché votre site dans les résultats ces jours-là. Si le site est nouveau, revenez dans quelques jours ; sinon, vérifiez l'état de l'indexation dans l'Audit du site.",
  "Aynı sorguda birden çok sayfanızın göründüğü durumlar. Sayfalar birbirinin tıklamasını bölebilir; birini ana sayfa yapıp diğerlerinden ona bağlantı vermek çoğu zaman yeter.":
    "Requêtes où plusieurs de vos pages apparaissent. Les pages peuvent se partager les clics ; faire de l'une la page principale et y renvoyer depuis les autres suffit souvent.",
  "Sorgular ({count})": "Requêtes ({count})",
  "Değişimler ({count} düşüş)": "Évolutions ({count} en baisse)",
  Değişimler: "Évolutions",
  Çakışmalar: "Chevauchements",
  "Geçen yıl": "L'an dernier",
  "Önceki dönem": "Période précédente",
  "Zaman içinde": "Dans le temps",
  "Zaman birimi": "Unité de temps",
  "Bu zaman biriminde çizilecek kadar dönem yok.":
    "Pas assez de périodes à tracer dans cette unité de temps.",
  "{metric} ({grain})": "{metric} ({grain})",
  Kesinleşmedi: "Non définitif",
  "Gösterim yok": "Aucune impression",
  Kesin: "Définitif",
  "{count} dönemlik {metric} grafiği. En iyi dönem {day}, {value}.":
    "Graphique {metric} sur {count} périodes. Meilleure période {day}, {value}.",
  "{metric} grafiği": "Graphique {metric}",
  "Eksik dönem": "Période incomplète",
  Gösterge: "Légende",
  "Taralı günler: Google hâlâ sayıyor, toplamlara katılmadı":
    "Jours hachurés : Google les compte encore ; exclus des totaux",
  "İçi boş nokta: eksik ya da kesinleşmemiş dönem":
    "Point vide : période incomplète ou pas encore définitive",
  "Karşılaştırma çizgisi yalnızca gün görünümünde.":
    "La ligne de comparaison n'apparaît qu'en vue par jour.",
  "Şu an önerilecek iş yok": "Rien à recommander pour l'instant",
  "Search Console verisinde eşiği aşan bir fırsat ya da düşüş bulunmadı. Daha uzun bir dönem seçmek ya da birkaç gün sonra tekrar bakmak yeni bulgular çıkarabilir.":
    "Aucune opportunité ni baisse au-dessus des seuils dans les données Search Console. Une période plus longue, ou un nouveau regard dans quelques jours, peut faire apparaître de nouveaux résultats.",
  "ilk {count} iş birlikte {days} günde yaklaşık {clicks} ek tıklama getirebilir (tahmin).":
    "les {count} premières tâches pourraient ensemble rapporter environ {clicks} clics de plus en {days} jours (estimation).",
  "Listedeki işlerin hepsini yapıldı olarak işaretlediniz.":
    "Vous avez marqué toutes les tâches de la liste comme faites.",
  "Yapıldı olarak işaretlenenler ({count})": "Marquées comme faites ({count})",
  "Tıklama kazançları, sitenizin kendi sıra ve tıklama oranlarından hesaplanan yaklaşık değerlerdir. Aynı sorgu ya da sayfa için birden çok iş varsa üstteki özet onu bir kez sayar. Yapıldı işaretleri yalnızca bu tarayıcıda saklanır.":
    "Les gains de clics sont des estimations tirées des positions et CTR propres à votre site. Quand plusieurs tâches portent sur la même requête ou page, le résumé ci-dessus ne la compte qu'une fois. Les marques « fait » ne sont conservées que dans ce navigateur.",
  "{rank}. sıradaki iş:": "Tâche {rank} :",
  "Marka adını gir": "Saisir le nom de marque",
  "Bu kırılımı aç": "Ouvrir cette répartition",
  Yapıldı: "Fait",
  Tablet: "Tablette",
  "Önceki dönem tıklama": "Clics de la période précédente",
  "Tıklama değişimi": "Variation des clics",
  "Önceki dönem sıra": "Position de la période précédente",
  "↑{value} sıra": "↑{value} places",
  "↓{value} sıra": "↓{value} places",
  "“{query}” için ilk üçe çıkma fırsatı":
    "Une chance pour « {query} » d'atteindre le top trois",
  "Sıra {position} · {impressions} gösterim · {clicks} tıklama":
    "Position {position} · {impressions} impressions · {clicks} clics",
  "Hedef sayfayı bu sorguya göre güçlendirin: başlıkta ve ilk paragrafta sorgunun cevabını verin, ilgili sayfalarınızdan bu sayfaya bağlantı ekleyin.":
    "Renforcez la page cible pour cette requête : répondez-y dans le titre et le premier paragraphe, et liez la page depuis vos pages connexes.",
  "“{query}” görülüyor ama az tıklanıyor": "« {query} » est vu mais peu cliqué",
  "Tıklama oranı {ctr}; sitenizde bu sıradaki sonuçların oranı {expected} · sıra {position} · {impressions} gösterim":
    "CTR {ctr} ; vos résultats à cette position obtiennent {expected} · position {position} · {impressions} impressions",
  "Sayfa başlığını ve açıklamasını aramadaki niyete göre yeniden yazın: sorgunun kelimelerini kullanın, bir sayı, yıl ya da açık bir fayda ekleyin.":
    "Réécrivez le titre et la description de la page selon l'intention de recherche : reprenez les mots de la requête, ajoutez un chiffre, une année ou un bénéfice clair.",
  "“{query}” sorgusundan gelen tıklamalar düştü":
    "Les clics depuis « {query} » ont baissé",
  "{page} sayfasının tıklamaları düştü": "Les clics vers {page} ont baissé",
  "Sıra da düştü: içeriği güncelleyin, aramadaki sorulara bugünkü cevabı verin ve sayfaya iç bağlantıları artırın.":
    "La position a aussi baissé : mettez le contenu à jour, répondez à la question telle qu'elle se pose aujourd'hui et ajoutez des liens internes vers la page.",
  "Sıra yerinde, tıklama düştü: talep azalmış ya da sonuç sayfasına yeni bir öğe gelmiş olabilir. Başlığı ve açıklamayı gözden geçirin.":
    "Position stable, clics en baisse : la demande a pu baisser ou un nouvel élément est apparu sur la page de résultats. Revoyez le titre et la description.",
  "{page} eski gücünü kaybediyor": "{page} perd du terrain",
  "Son çeyrekte {clicks} tıklama; en iyi çeyreği {peak} tıklama ({start} – {end})":
    "{clicks} clics au dernier trimestre ; son meilleur trimestre en avait {peak} ({start} – {end})",
  "Sayfayı tazeleyin: eskiyen bilgileri düzeltin, yeni çıkan soruları ekleyin ve güncellediğiniz tarihi sayfada gösterin.":
    "Rafraîchissez la page : corrigez les informations dépassées, répondez aux nouvelles questions et affichez la date de mise à jour.",
  "{page} görünüyor ama hiç tıklanmıyor":
    "{page} est visible mais jamais cliquée",
  "{impressions} gösterim, 0 tıklama · sıra {position}":
    "{impressions} impressions, 0 clic · position {position}",
  "İkinci sayfadan sonrasında görünüyor: önce sırasını yükseltin; içeriği derinleştirin ve diğer sayfalarınızdan bağlantı verin.":
    "Elle apparaît après la première page : améliorez d'abord sa position ; approfondissez le contenu et liez-la depuis vos autres pages.",
  "İlk sayfada olduğu hâlde tıklanmıyor: başlık ve açıklama aramayla örtüşmüyor olabilir, yeniden yazın.":
    "Elle est en première page mais n'est pas cliquée : le titre et la description ne correspondent peut-être pas à la recherche ; réécrivez-les.",
  "“{query}” sorgusunda artık görünmüyorsunuz":
    "Vous n'apparaissez plus pour « {query} »",
  "Önceki dönemde {clicks} tıklama, {impressions} gösterim; bu dönemde gösterim yok":
    "{clicks} clics et {impressions} impressions sur la période précédente ; aucune impression sur celle-ci",
  "Bu sorguyu karşılayan sayfa hâlâ yayında ve dizinde mi bakın; içerik değiştiyse sorgunun cevabını sayfaya geri ekleyin.":
    "Vérifiez que la page répondant à cette requête est toujours en ligne et indexée ; si le contenu a changé, rajoutez la réponse.",
  "Tıklama oranı {ctr} (site geneli {site})":
    "CTR {ctr} (ensemble du site {site})",
  "sıra {position} (site geneli {site})":
    "position {position} (ensemble du site {site})",
  "{device} aramalarında geride kalıyorsunuz":
    "Vous êtes en retrait sur les recherches {device}",
  "{country} aramalarında geride kalıyorsunuz":
    "Vous êtes en retrait sur les recherches depuis {country}",
  "Sayfalarınızı bu cihazda açıp okunurluğu ve hızı kontrol edin; Site denetimi'ndeki hız sonuçları nereden başlanacağını gösterir.":
    "Ouvrez vos pages sur cet appareil et vérifiez lisibilité et vitesse ; les résultats de vitesse de l'Audit du site indiquent par où commencer.",
  "Bu ülkedeki aramalara uygun dilde ve içerikte sayfanız var mı bakın; çok dilli bir siteyse hreflang ayarlarını gözden geçirin.":
    "Vérifiez que vous avez des pages dans la bonne langue et le bon contenu pour les recherches depuis ce pays ; pour un site multilingue, revoyez les réglages hreflang.",
  "{date} günü tıklamalarda olağan dışı düşüş":
    "Baisse inhabituelle des clics le {date}",
  "{date} günü gösterimlerde olağan dışı düşüş":
    "Baisse inhabituelle des impressions le {date}",
  "{value}; önceki haftaların aynı gününde ortası {expected}":
    "{value} ; la médiane du même jour de semaine les semaines précédentes est {expected}",
  "O gün sitede bir değişiklik, kesinti ya da Google güncellemesi oldu mu bakın; grafikteki işaretler yardımcı olur.":
    "Vérifiez si le site a changé, a été indisponible ou si une mise à jour Google a eu lieu ce jour-là ; les repères du graphique aident.",
  "Marka adınızı tanımlayın": "Définissez votre nom de marque",
  "Marka sorguları ayrılmadan sitenin tıklama oranı beklentisi şişer ve fırsatlar eksik çıkar.":
    "Sans séparer les recherches de marque, le CTR attendu de votre site est gonflé et des opportunités sont manquées.",
  "Marka adınızı ve yazılışlarını ekleyin; marka ve marka dışı aramalar ayrı ölçülür.":
    "Ajoutez votre nom de marque et ses graphies ; les recherches de marque et hors marque sont alors mesurées séparément.",
  "Güven: yüksek": "Confiance : élevée",
  "Güven: orta": "Confiance : moyenne",
  "Güven: düşük": "Confiance : faible",
  Podcast: "Podcast",
  "{start} – {end} ({days} gün)": "{start} – {end} ({days} jours)",
  "{start} – {end}": "{start} – {end}",
  "Son veri": "Dernières données",
  Oluşturulma: "Créé",
  "Arama performansı raporu": "Rapport de performances de recherche",
  "Değişimler önceki {days} güne göre. Sıra değişimi yer olarak verilir (↑ yükseldi); tıklama oranı değişimi puan olarak.":
    "Variations par rapport aux {days} jours précédents. Variation de position en places (↑ en hausse) ; variation du CTR en points.",
  "Önceki dönem Google'da olmadığı için değişim gösterilmez.":
    "Aucune variation affichée car Google n'a pas la période précédente.",
  "Son günler hâlâ sayılıyor ({clicks} tıklama); toplamlara ve karşılaştırmalara katılmadı.":
    "Les derniers jours sont encore en cours de comptage ({clicks} clics) ; exclus des totaux et des comparaisons.",
  "Google'ın gizlediği sorgulardan gelen tıklama: {share}. Bu yüzden sorgu tablolarının toplamı site toplamından küçüktür.":
    "Clics issus des requêtes masquées par Google : {share}. C'est pourquoi les tableaux de requêtes totalisent moins que le site.",

  Yapılacaklar: "À faire",
  "Search Console verisinde eşiği aşan bir fırsat ya da düşüş bulunmadı.":
    "Aucune opportunité ni baisse au-dessus des seuils dans les données Search Console.",
  "Önce bunlar": "Commencez par celles-ci",
  "İlk {count} iş, kazancı tahmin edilemeyen işler.":
    "Les {count} premières tâches, au gain non estimable.",
  "İlk {count} iş birlikte {days} günde yaklaşık {clicks} ek tıklama getirebilir (tahmin).":
    "Les {count} premières tâches pourraient ensemble rapporter environ {clicks} clics de plus en {days} jours (estimation).",
  "Tıklama kazançları, sitenizin kendi sıra ve tıklama oranlarından hesaplanan yaklaşık değerlerdir. Aynı sorgu ya da sayfa için birden çok iş varsa özet onu bir kez sayar.":
    "Les gains de clics sont des estimations tirées des positions et CTR propres à votre site. Quand plusieurs tâches portent sur la même requête ou page, le résumé ne la compte qu'une fois.",
  "Günlük tıklama": "Clics quotidiens",
  "Bu dönem": "Cette période",
  "Hâlâ sayılan günler": "Jours encore en cours de comptage",
  "{days} günde {clicks} tıklama; en iyi gün {day}, {best} tıklama.":
    "{clicks} clics en {days} jours ; meilleur jour {day}, {best} clics.",
  "Bu dönemde tıklama yok.": "Aucun clic sur cette période.",
  İşaretler: "Repères",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. Olası kazanç, ilk üçe çıkarsa beklenen ek tıklamadır.":
    "{count} requêtes avec une position moyenne entre 4 et 20 et au moins {impressions} impressions. Le gain possible correspond aux clics supplémentaires attendus si elles atteignent le top trois.",
  "Bu aralıkta sorgu yok.": "Aucune requête dans cette tranche.",

  "Belirgin biçimde az tıklanan sonuç yok.":
    "Aucun résultat n'est nettement sous-cliqué.",
  "Beklenen oran: sitenizde aynı sıradaki sonuçların tıklama oranı.":
    "Taux attendu : le CTR de vos résultats à la même position.",

  "En az {queries} sorgu ve {impressions} gösterim olmayan sıralar için oran hesaplanmaz.":
    "Les positions sans au moins {queries} requêtes et {impressions} impressions n'ont pas de taux.",
  Önceki: "Avant",

  "Önceki dönem: {start} – {end}. Tıklama sayıları.":
    "Période précédente : {start} – {end}. Nombre de clics.",
  "Tıklaması düşen sorgular": "Requêtes aux clics en baisse",
  "Tıklaması düşen sayfalar": "Pages aux clics en baisse",
  "Tıklaması artan sorgular": "Requêtes aux clics en hausse",
  "Tıklaması artan sayfalar": "Pages aux clics en hausse",
  "Yeni görünen sorgular": "Requêtes nouvellement visibles",

  "Kaybolan sorgular (önceki dönemdeki değerleriyle)":
    "Requêtes perdues (avec leurs chiffres de la période précédente)",

  "Çeyrek: 91 gün.": "Trimestre : 91 jours.",
  "Son çeyrek": "Dernier trimestre",
  "En iyi çeyrek": "Meilleur trimestre",

  "Google'ın tercih ettiği sayfa": "Page préférée par Google",

  "Paylar sitenin toplamına göre.": "Parts du total du site.",
  "Paylar satırların toplamına göre.": "Parts du total des lignes.",
  "İlk {limit} / {total}.": "{limit} premiers sur {total}.",
  "Bilinmiyor: marka adları tanımlanmadı.":
    "Inconnu : aucun nom de marque défini.",
  "Marka adları: {terms}.": "Noms de marque : {terms}.",
  "Okunan sorguların ortalama sırasına göre.":
    "Selon la position moyenne des requêtes lues.",

  "Paylar okunan sorguların tıklamasına göre.":
    "Parts des clics des requêtes lues.",
  "{words}+ kelimeli aramalar": "Recherches de {words}+ mots",
  "Google Search Console API, bu mülk için. Başka bir veri kaynağı, tahmini hacim ya da rakip verisi kullanılmadı.":
    "L'API Google Search Console, pour cette propriété. Aucune autre source de données, aucun volume estimé ni donnée de concurrents.",

  "Site toplamları": "Totaux du site",
  "Site toplamı tarihe göre istenen toplamdan gelir, sorgu ya da sayfa satırlarının toplamından değil. Ortalama sıra gösterime göre ağırlıklıdır; tıklama oranı tıklama bölü gösterimdir.":
    "Le total du site vient de la requête groupée par date, pas de l'addition des lignes de requêtes ou de pages. La position moyenne est pondérée par les impressions ; le CTR est clics divisés par impressions.",

  "Kazanç tahminleri": "Estimations de gain",
  "Sitenizin kendi sıra-tıklama oranı eğrisinden hesaplanır; yeterli veri olmayan sıralar için tahmin yapılmaz.":
    "Tirées de la courbe position-CTR propre à votre site ; les positions sans assez de données n'ont pas d'estimation.",
  "Google istekleri": "Requêtes Google",

  "Yöntem ve sınırlar": "Méthode et limites",
  "{host} arama performansı, {start} – {end}{filters}":
    "Performances de recherche de {host}, {start} – {end}{filters}",
  "{days} günde {clicks} tıklama, {impressions} gösterim.":
    "{clicks} clics et {impressions} impressions en {days} jours.",
  "Tıklama oranı {ctr}, ortalama sıra {position}.":
    "CTR {ctr}, position moyenne {position}.",
  "İlk iş: {title}.": "Première tâche : {title}.",
  "Arama performansı raporu saklama sınırını aşıyor. Daha kısa bir dönem ya da filtre seçip yeniden deneyin.":
    "Le rapport de performances de recherche dépasse la limite de stockage. Choisissez une période plus courte ou un filtre et réessayez.",
  "Şu an 4. ile 20. sıra arasında yeterli gösterimi olan sorgu yok. Sorgular bu aralığa girdikçe burada listelenir.":
    "Aucune requête avec assez d'impressions n'est actuellement entre les positions 4 et 20. Les requêtes apparaissent ici en entrant dans cette tranche.",
  "Ortalama sırası 4–20 olan {count} sorgu; ilk üçe çıkarlarsa yaklaşık {clicks} ek tıklama.":
    "{count} requêtes en position moyenne 4–20 ; atteindre le top trois pourrait rapporter environ {clicks} clics de plus.",
  "Onaylanmadı.": "Non confirmé.",
  "Alan adından önerilen adlar: {terms}.":
    "Noms suggérés d'après votre domaine : {terms}.",
  "Önerileri onayla": "Confirmer les suggestions",
  "Alan adından önerilen marka adlarıyla ölçüldü: {terms}. Onaylayın ya da düzeltin.":
    "Mesuré avec des noms de marque suggérés d'après votre domaine : {terms}. Confirmez-les ou corrigez-les.",
  // Search performance review, 2026-10-26
  "Aynı sorgu, birden çok sayfa": "Plusieurs pages pour une même requête",
  "Birden çok sayfanın yarıştığı sorgu":
    "Requêtes où vos pages se concurrencent",
  "{count} / {total}": "{count} / {total}",
  "incelenen sorguların {share} kadarı": "{share} des requêtes examinées",
  "Ana sayfa dışına giden gösterim": "Impressions captées par les autres pages",
  "incelenen gösterimlerin {share} kadarı": "{share} des impressions examinées",
  "2. sayfa {share} gösterim alıyor":
    "la deuxième page reçoit {share} des impressions",
  "Diğer {count} sayfa {share} gösterim alıyor": {
    one: "{count} autre page reçoit {share} des impressions",
    other: "les {count} autres pages reçoivent {share} des impressions",
  },
  "{impressions} gösterim · {clicks} tıklama":
    "{impressions} impressions · {clicks} clics",
  "1 yıl önce": "Il y a un an",
  "Çeyrek başına tıklama, eskiden yeniye: {values}":
    "Clics par trimestre, du plus ancien au plus récent : {values}",
  "Yalnızca bir dönemde en az {impressions} gösterim alan sorgular, en çok gösterimden aza.":
    "Requêtes ayant au moins {impressions} impressions dans une seule des deux périodes, les plus vues en premier.",
  "{count} tanesi hiç tıklama almadı.": {
    one: "{count} d'entre elles n'a reçu aucun clic.",
    other: "{count} d'entre elles n'ont reçu aucun clic.",
  },
  "Veriler {date} tarihine kadar kesin; son {count} gün hâlâ sayılıyor (grafikte taralı).":
    {
      one: "Les données sont définitives jusqu'au {date} ; Google compte encore le dernier jour ({count}), hachuré sur le graphique.",
      other:
        "Les données sont définitives jusqu'au {date} ; Google compte encore les {count} derniers jours (hachurés sur le graphique).",
    },
  "Veriler {date} tarihine kadar kesin.":
    "Les données sont définitives jusqu'au {date}.",
  "Karşılaştırma: geçen yılın aynı günleri ({start} – {end}).":
    "Comparé aux mêmes jours l'an dernier ({start} – {end}).",
  "Karşılaştırma: önceki {days} gün ({start} – {end}).":
    "Comparé aux {days} jours précédents ({start} – {end}).",
  "Search Console mülkü: {site}": "Propriété Search Console : {site}",
  "Veri hakkında": "À propos des données",
  "Kesin günler: {start} – {end} ({days} gün). Search Console bir günü birkaç gün boyunca saymaya devam eder; toplamlar ve karşılaştırmalar yalnızca sayımı bitmiş günleri kullanır. Günler Google'ın kullandığı Pasifik saatine göredir.":
    "Jours définitifs : {start} – {end} ({days} jours). Search Console continue de compter un jour pendant plusieurs jours ; les totaux et comparaisons n'utilisent que les jours entièrement comptés. Les jours suivent l'heure du Pacifique, comme chez Google.",
  "Son {count} gün hâlâ sayılıyor olabilir (Google tarih bildirmedi); toplamlara katılmadı.":
    {
      one: "Google compte peut-être encore le dernier jour ({count}) faute de date fournie ; il est exclu des totaux.",
      other:
        "Google compte peut-être encore les {count} derniers jours (aucune date fournie) ; ils sont exclus des totaux.",
    },
  "Son {count} gün hâlâ sayılıyor; toplamlara katılmadı.": {
    one: "Google compte encore le dernier jour ({count}) ; il est exclu des totaux.",
    other:
      "Google compte encore les {count} derniers jours ; ils sont exclus des totaux.",
  },
  "Tıklamaların {share} kadarı ({clicks}) Google'ın gizlilik nedeniyle göstermediği aramalardan geliyor. Site toplamına dahil, sorgu tablosunda yok; bu yüzden sorgu tablosunun toplamı daha küçüktür.":
    "{share} des clics ({clicks}) viennent de recherches que Google ne montre pas pour des raisons de confidentialité. Ils comptent dans le total du site mais pas dans le tableau des requêtes, d'où un total plus faible dans ce tableau.",
  "Tıklamaların {share} kadarı, Google'ın gizlilik nedeniyle göstermediği ya da satır sınırının dışında kalan aramalardan geliyor. Site toplamına dahil, sorgu tablosunda yok.":
    "{share} des clics viennent de recherches que Google ne montre pas pour des raisons de confidentialité ou qui dépassent la limite de lignes. Ils comptent dans le total du site mais pas dans le tableau des requêtes.",
  "Bu görünüm için Google'a {count} istek gönderildi.": {
    one: "Cette vue a envoyé {count} requête à Google.",
    other: "Cette vue a envoyé {count} requêtes à Google.",
  },
  "Bu görünüm birkaç dakika içinde alınmış yanıtlardan geldi; Google'a yeni istek gönderilmedi.":
    "Cette vue provient de réponses obtenues ces dernières minutes ; aucune nouvelle requête n'a été envoyée à Google.",
  "Marka aramaları ayrılmadı": "Recherches de marque non séparées",
  "Marka adınızı girmeden hangi aramaların sizi adınızla bulduğu bilinemez.":
    "Sans votre nom de marque, impossible de savoir quelles recherches vous ont trouvé par votre nom.",
  "Marka adını ekle": "Ajouter le nom de marque",
  "Önceki dönemle karşılaştırılamadı.":
    "Comparaison avec la période précédente impossible.",
  "Bu ay henüz tamamlanmadı ({days} gün)":
    "Ce mois n'est pas encore terminé ({days} jours)",
  "Son çubuk kesik çizgili: bu ay henüz tamamlanmadı.":
    "La dernière barre est en pointillés : ce mois n'est pas encore terminé.",
  "Sıra {position} · tıklama oranı {ctr} (bu sırada {expected}) · {gain}":
    "Position {position} · CTR {ctr} ({expected} à cette position) · {gain}",
  "Olası kazanç (en fazla)": "Gain possible (au plus)",
  "{share} tıklama": "{share} des clics",
  "Sorgu sayısı": "Nombre de requêtes",
  "Tıklama payı": "Part des clics",
  "{date} (eksik veri)": "{date} (données incomplètes)",
  "Arşivde eksik; paylar karşılaştırılamaz":
    "Incomplet dans l'archive ; parts non comparables",
  "Arşiv {count} haftalık; soluk çubuklu haftalar eksik veri, paylar onlarla karşılaştırılamaz.":
    {
      one: "L'archive couvre {count} semaine complète ; les semaines estompées ont des données incomplètes et leurs parts ne sont pas comparables.",
      other:
        "L'archive couvre {count} semaines complètes ; les semaines estompées ont des données incomplètes et leurs parts ne sont pas comparables.",
    },
  "Arşivde henüz tam bir hafta yok; soluk çubuklar eksik veri, paylar karşılaştırılamaz.":
    "L'archive ne contient encore aucune semaine complète ; les barres estompées ont des données incomplètes, parts non comparables.",
  "Sıralama fırsatları ({count})": "Opportunités de classement ({count})",
  "Google hâlâ sayıyor; bu gün toplamlara katılmadı":
    "Google compte encore ; ce jour n'est pas dans les totaux",
  "Son {days} günde {clicks} tıklama, {impressions} gösterim.":
    "{clicks} clics et {impressions} impressions sur les {days} derniers jours.",
  "Son {days} günde tıklamalar geçen yılın aynı günleriyle aynı.":
    "Sur les {days} derniers jours, les clics égalent ceux des mêmes jours l'an dernier.",
  "Son {days} günde tıklamalar geçen yıla göre {share} arttı.":
    "Sur les {days} derniers jours, les clics sont en hausse de {share} par rapport à l'an dernier.",
  "Son {days} günde tıklamalar geçen yıla göre {share} azaldı.":
    "Sur les {days} derniers jours, les clics sont en baisse de {share} par rapport à l'an dernier.",
  "Son {days} günde tıklamalar önceki dönemle aynı.":
    "Sur les {days} derniers jours, les clics égalent ceux de la période précédente.",
  "Son {days} günde tıklamalar önceki döneme göre {share} arttı.":
    "Sur les {days} derniers jours, les clics sont en hausse de {share} par rapport à la période précédente.",
  "Son {days} günde tıklamalar önceki döneme göre {share} azaldı.":
    "Sur les {days} derniers jours, les clics sont en baisse de {share} par rapport à la période précédente.",
  "Tıklama oranı {points} puan arttı.": "Le CTR a gagné {points} points.",
  "Tıklama oranı {points} puan düştü.": "Le CTR a perdu {points} points.",
  "Ortalama sıra {places} basamak yükseldi.":
    "La position moyenne a gagné {places} place(s).",
  "Ortalama sıra {places} basamak geriledi.":
    "La position moyenne a perdu {places} place(s).",
  "Önce yapılacak {count} iş hazır.": {
    one: "La première tâche ({count}) est prête.",
    other: "Les {count} premières tâches sont prêtes.",
  },
  "Önce yapılacak {count} iş birlikte en fazla {clicks} ek tıklama getirebilir (üst sınır).":
    {
      one: "La première tâche ({count}) pourrait apporter au plus {clicks} clics de plus (plafond).",
      other:
        "Les {count} premières tâches pourraient apporter ensemble au plus {clicks} clics de plus (plafond).",
    },
  "Tüm yapılacaklar ({count})": "Toutes les tâches ({count})",
  "en fazla +{count} tıklama": {
    one: "au plus +{count} clic",
    other: "au plus +{count} clics",
  },
  "Sıra {position}": "Position {position}",
  "Neden ve ne yapmalı": "Pourquoi, et que faire",
  "Bu iş yapılırsa aynı uzunlukta bir dönemde beklenen en fazla ek tıklama (üst sınır).":
    "Le maximum de clics supplémentaires à attendre sur une période de même durée si c'est fait (plafond).",
  "Değişmedi (±{value} sıra)": "Inchangée (±{value} places)",
  "≈ +{count} tıklama": { one: "≈ +{count} clic", other: "≈ +{count} clics" },
  "{count} sorgu ilk üçe yakın": {
    one: "{count} requête proche du top 3",
    other: "{count} requêtes proches du top 3",
  },
  "{count} sonuç sırasına göre az tıklanıyor": {
    one: "{count} résultat est peu cliqué pour sa position",
    other: "{count} résultats sont peu cliqués pour leur position",
  },
  "{count} sorgudan gelen tıklama düştü": {
    one: "Les clics ont baissé pour {count} requête",
    other: "Les clics ont baissé pour {count} requêtes",
  },
  "{count} sayfanın tıklaması düştü": {
    one: "Les clics ont baissé pour {count} page",
    other: "Les clics ont baissé pour {count} pages",
  },
  "{count} sayfa eski gücünü kaybediyor": {
    one: "{count} page perd de sa force",
    other: "{count} pages perdent de leur force",
  },
  "{count} sayfa görünüyor ama hiç tıklanmıyor": {
    one: "{count} page est vue mais jamais cliquée",
    other: "{count} pages sont vues mais jamais cliquées",
  },
  "{count} sorguda artık görünmüyorsunuz": {
    one: "Vous n'apparaissez plus pour {count} requête",
    other: "Vous n'apparaissez plus pour {count} requêtes",
  },
  "{count} cihazda geride kalıyorsunuz": {
    one: "Vous êtes en retrait sur {count} type d'appareil",
    other: "Vous êtes en retrait sur {count} types d'appareils",
  },
  "{count} ülkede geride kalıyorsunuz": {
    one: "Vous êtes en retrait dans {count} pays",
    other: "Vous êtes en retrait dans {count} pays",
  },
  "{count} günde olağan dışı düşüş": {
    one: "Baisse inhabituelle sur {count} jour",
    other: "Baisses inhabituelles sur {count} jours",
  },
  "{date}: tıklama": "{date} : clics",
  "{date}: gösterim": "{date} : impressions",
  "Tıklama farkı": "Écart de clics",
  sürüyor: "en cours",
  Oran: "CTR",
  // Search performance review fixes: brand confirmation, windows, archive lag
  "Marka adları: {terms} (önerilen, onaylanmadı).":
    "Noms de marque : {terms} (suggérés, non confirmés).",
  "Marka adını onayla": "Confirmer le nom de votre marque",
  "Marka aramaları şimdilik alan adından önerilen adlarla ayrılıyor: {terms}. Onaylanana kadar bu ayrım bir tahmin.":
    "Pour l'instant, les recherches de marque sont séparées avec des noms suggérés à partir de votre domaine : {terms}. Tant que vous ne les confirmez pas, cette séparation reste une estimation.",
  "Önerilen adlar doğruysa onaylayın; değilse markanızın adını ve yazılışlarını girin.":
    "Si les noms suggérés sont justes, confirmez-les ; sinon, saisissez le nom de votre marque et ses graphies.",
  "Dönem: {start} – {end}.": "Période : {start} – {end}.",
  "Ayın son günleri henüz gelmedi ({days} gün)":
    "Les derniers jours du mois ne sont pas encore arrivés ({days} jours)",
  "Son çubuk kesik çizgili: ayın son günleri Search Console'dan henüz gelmedi.":
    "La dernière barre est en pointillés : les derniers jours du mois ne sont pas encore arrivés de la Search Console.",
  "Haftalık dağılım yalnızca Web aramaları için.":
    "La répartition hebdomadaire ne concerne que la recherche Web.",
  "Marka aramaları dahil değildir.": "Les recherches de marque sont exclues.",
  "Tam günler Google tarafından doğrulandı":
    "Jours complets confirmés par Google",
  "Tam gün sınırı veri gecikmesine göre varsayıldı":
    "Limite des jours complets estimée selon le délai des données",
  "Önceki sonuç gösteriliyor; seçili dönem henüz yüklenmedi.":
    "Le résultat précédent est affiché ; la période choisie n’a pas encore été chargée.",
  "En fazla +{gain} tıklama / 30 gün (üst sınır)":
    "Jusqu’à +{gain} clics / 30 jours (limite haute)",
  "{count} sayfada · bu sayfaların tüm tıklamaları 30 güne ölçekli: {clicks}; üst sınırın bu tabana oranı {share}":
    "Sur {count} pages · tous les clics de ces pages ramenés à 30 jours : {clicks} ; limite haute rapportée à cette base : {share}",
  "Eksik sorgu, yetersiz gösterim veya eksik hedef oranı; kazanç yok anlamına gelmez.":
    "Requêtes manquantes, impressions insuffisantes ou taux cible inconnu : cela ne signifie pas qu’il n’y a aucun potentiel.",
  "Analytics bu kez okunamadı; aşağıdaki kaynak notunu kontrol edin.":
    "Analytics n’a pas pu être lu cette fois ; consultez la note sur la source ci-dessous.",
  "Analytics verisi sınırlı; eksik ölçümler sıfır değildir ve dönüşüm yorumu yapılamayabilir.":
    "Les données Analytics sont limitées ; les mesures absentes ne sont pas des zéros et ne permettent pas toujours de conclure sur les conversions.",
  "Hesaplanabilen tüm sayfalardaki ölçülmüş dönüşüm sinyali · listele":
    "Signal de conversion mesuré sur toutes les pages évaluables · afficher",
  "İş listesi: {shown} / {total} eşleşen sayfa":
    "Liste de travail : {shown} / {total} pages correspondantes",
  "Analytics değeri bilinmiyor; bağlantı, eşleşme ve kaynak kısıtlarını kontrol edin.":
    "Valeur Analytics inconnue ; vérifiez la connexion, la correspondance des URL et les limites de la source.",
  "Ölçülen gösterim (30 güne ölçekli)":
    "Impressions mesurées (ramenées à 30 jours)",
  "Analytics bu adres grubunu birlikte ölçüyor; oturumları farklı URL satırları arasında toplamayın.":
    "Analytics mesure ce groupe d’URL ensemble ; ne cumulez pas ses sessions entre les lignes d’URL.",
  "Karşılaştırılabilen marka dışı gösterim: {known}; oranı bilinmeyen: {unknown}.":
    "Impressions hors marque comparables : {known} ; impressions sans taux connu : {unknown}.",
  "Diğer aramalar (dağıtılmış kalan)": "Autres requêtes (solde réparti)",
  "Değişikliği not edin; aynı kapsamlı dönemlerde ölçülen tıklama, tıklama oranı ve sırayı Arama performansında karşılaştırın.":
    "Notez la modification ; comparez les clics, le CTR et la position mesurés sur des périodes de même périmètre dans Performance de recherche.",
  "Arama niyetini ve sayfanın kapsamını inceleyin":
    "Examinez l’intention de recherche et les sujets couverts par la page",
  "Gösterimler ölçüldü; düşük sıra tek başına sayfayı silmek veya birleştirmek için kanıt değildir.":
    "Les impressions ont été mesurées ; une mauvaise position ne suffit pas à justifier la suppression ou la fusion d’une page.",
  "Birleştirmeyi yalnızca sayfaların aynı ihtiyacı karşıladığını doğrularsanız değerlendirin.":
    "N’envisagez une fusion qu’après avoir confirmé que les pages répondent au même besoin.",
  "Önceliği ölçülen sorgulara göre belirleyin; düşük tahmin tek başına içerik kaldırma gerekçesi değildir.":
    "Priorisez selon les requêtes mesurées ; une estimation faible ne justifie pas à elle seule de supprimer du contenu.",
  "Ortalama {position}. sıra; {impressions} gösterim, {clicks} tıklama ölçüldü. Hesaplanabilen aramalarda 30 güne ölçekli en fazla +{gain} tıklama (üst sınır); gerçekleşme sözü değildir.":
    "Position moyenne {position} ; {impressions} impressions et {clicks} clics mesurés. Jusqu’à +{gain} clics ramenés à 30 jours pour les requêtes évaluables (limite haute), sans garantie de résultat.",
  "Hesaplanan kazanç yalnızca alınan ve tanımlanabilen aramaları kapsar; gizli sorguların payı bilinmiyor. Panelin sorgu tahminiyle toplanmaz.":
    "L’estimation couvre uniquement les requêtes reçues et identifiables ; la part des requêtes masquées est inconnue. Ne l’ajoutez pas à l’estimation par requête du tableau de bord.",
  "Ölçülen sıfır: {zero}; yetersiz gösterim: {small}; eksik hedef oranı: {curve}; Google'ın aramalarını gizlediği sayfa: {pairs}.":
    "Zéro mesuré : {zero} ; trop peu d'impressions : {small} ; taux cible manquant : {curve} ; pages dont Google masque les recherches : {pairs}.",
  "Search Console satır sınırına ulaşıldı; toplamlar tüm siteyi kapsamaz.":
    "Limite de lignes Search Console atteinte ; les totaux ne couvrent pas tout le site.",
  "Aynı takvim günleri farklı saat dilimlerinde aynı an aralığı değildir. Analytics, tüm Organic Search kanalını kapsar.":
    "Les mêmes jours dans des fuseaux horaires différents ne couvrent pas les mêmes instants. Analytics couvre tout le canal Organic Search.",
  "Analytics kotası doldu. Bir süre bekleyip Yenile’ye basın.":
    "Quota Analytics épuisé. Patientez, puis cliquez sur Actualiser.",
  "Analytics izni veya mülk erişimi yok. Bağlantıları ayarla ekranında erişimi doğrulayın.":
    "Autorisation Analytics ou accès à la propriété manquant. Vérifiez l’accès dans les paramètres de connexion.",
  "Analytics yanıtı okunamadı. İnternet bağlantısını kontrol edip Yenile’ye basın.":
    "La réponse Analytics n’a pas pu être lue. Vérifiez votre connexion Internet et cliquez sur Actualiser.",
  "{start} – {end} aralığında bu mülk için sayfa satırı dönmedi. Bu, hiç gösterim olmadığı anlamına gelmez; Arama performansında mülkü kontrol edin veya dönemi genişletin.":
    "Aucune ligne de page reçue pour cette propriété du {start} au {end}. Cela ne signifie pas qu’il n’y a eu aucune impression ; vérifiez la propriété dans Performance de recherche ou élargissez la période.",
  "{start} – {end} aralığında hesaplanabilen {count} sayfada ek kazanç hesaplanmadı. Bu, yapılacak iş olmadığı anlamına gelmez.":
    "Aucun gain supplémentaire calculé pour {count} pages évaluables du {start} au {end}. Cela ne signifie pas qu’il n’y a rien à faire.",
  "30 güne ölçekli üst sınır; çubuklar en büyük iş türüne göredir. Bir sayfa birden fazla işte sayılabilir. Seçim tüm hesaplanabilir sayfalara uygulanır.":
    "Limite haute ramenée à 30 jours ; les barres sont relatives à la catégorie la plus importante. Une page peut compter dans plusieurs catégories. La sélection s’applique à toutes les pages évaluables.",
  "Hesaplanamayan kapsam": "Périmètre non calculable",
  Sırala: "Trier",
  "Daha uzun bir dönem seçmek daha çok arama gösterebilir.":
    "Une période plus longue peut afficher davantage de recherches.",
  "Google bu sayfaların aramalarını göstermiyor":
    "Google n'affiche pas les recherches de ces pages",
  "{hidden} sayfa gösterim aldı ama Search Console hangi aramalardan geldiğini vermedi: Google az aranan sorguları gizlilik için gizler. Arama bilinmeden kazanç hesaplanmaz. Bu bir hata değildir; site daha çok gösterim aldıkça tahminler kendiliğinden çıkar.":
    "{hidden} pages ont reçu des impressions, mais la Search Console n'a pas indiqué de quelles recherches elles provenaient : Google masque les requêtes rarement recherchées pour protéger la vie privée. Sans les recherches, aucun gain ne peut être estimé. Ce n'est pas une erreur ; les estimations apparaîtront d'elles-mêmes à mesure que le site recevra plus d'impressions.",
  "{count} sayfanın aramaları tahmin için yeterli gösterim almadı ya da sitenizde karşılaştırılacak sıra verisi yok.":
    "Les recherches de {count} pages ont reçu trop peu d'impressions pour une estimation, ou votre site n'a pas de données de position à comparer.",
  "Tahmini değiştirmez; yanında bir etiket olarak durur. Bu dönemde tahmin edilebilen sayfa olmadığı için eşleştirilecek bir şey yok.":
    "Cela ne modifie pas l'estimation ; c'est une étiquette à côté. Aucune page n'a pu être estimée sur cette période, il n'y a donc rien à rapprocher.",

  // Rankings archive scope and comparison evidence.
  "Son 5 yıllık arşiv": "Les 5 dernières années d’archive",
  "Daha fazla hareket göster": "Afficher plus de variations",
  "Kayıtlı geçmiş korunur. Bağlantıyı ve kotayı kontrol edin, sonra yeniden deneyin.":
    "L’historique enregistré est conservé. Vérifiez la connexion et le quota, puis réessayez.",
  "Kalan günler için devam edin; birden fazla çalıştırma gerekebilir.":
    "Continuez pour récupérer les jours restants ; plusieurs passages peuvent être nécessaires.",
  "Google taranan tarihler için sorgu satırı döndürmedi. Bu, arama yapılmadığını kanıtlamaz. Kalan tarihler varsa arşivi doldurmaya devam edin; toplam trafik için Arama performansını açın.":
    "Google n’a renvoyé aucune ligne de requête pour les dates analysées. Cela ne prouve pas l’absence de recherches. Continuez pour les dates restantes ; consultez Performance de recherche pour le trafic total.",
  "Öncelik: mutlak sıra değişimi × kayıtlı gösterim. Bu bir inceleme sırasıdır, kayıp tıklama tahmini değildir.":
    "Priorité : variation absolue de position × impressions enregistrées. Ce classement guide l’analyse et n’estime pas les clics perdus.",
  "{count} sorgu; aynı {paired} sorguda net değişim. Çubuklar en büyük gruba görelidir.":
    "{count} requêtes ; variation nette sur les mêmes {paired} requêtes. Les barres sont relatives au plus grand groupe.",
  "Aynı sorgu kümesinde net değişim; giriş veya çıkış sayısı değildir.":
    "Variation nette du même ensemble de requêtes, pas le nombre d’entrées ou de sorties.",
  "Bu gün sorgu gözlenmedi; API yanıtı tamamlandı.":
    "Aucune observation de cette requête ce jour ; réponse API entièrement reçue.",
  "Bu gün arşiv kapsamı eksik veya bilinmiyor.":
    "La couverture de l’archive est incomplète ou inconnue pour ce jour.",
  "Boşluklar doldurulmaz; sıra sıfır kabul edilmez. Ok tuşlarıyla günleri inceleyin.":
    "Les lacunes restent vides ; la position n’est jamais supposée nulle. Parcourez les jours avec les flèches.",
  "Gözlenen gün": "Jours observés",
  "Dönem ortalaması": "Moyenne de la période",
  "İlk/son kayıtlı gün": "Premier/dernier jour enregistré",
  "Günlük değerler": "Valeurs quotidiennes",
  "Arama performansında metin ara (tarih ve birebir sorgu korunmaz)":
    "Rechercher le texte dans Performance de recherche (dates et requête exacte non conservées)",
  "GSC Web · Ortalama sıra, sabit bir Google sırası değildir. Konum ve cihazla değişebilir.":
    "GSC Web · La position moyenne n’est pas un rang Google fixe. Elle varie selon le lieu et l’appareil.",
  "Karşılaştırılabilen {count} sorguda {up} yükseldi, {down} geriledi.":
    "Sur {count} requêtes comparables, {up} progressent et {down} reculent.",
  "Önce {query} sorgusunu inceleyin.": "Examinez d’abord {query}.",
  "Karşılaştırılabilen sorgularda belirgin düşüş yok.":
    "Aucun recul notable parmi les requêtes comparables.",
  "Karşılaştırması bilinmeyen: {count}. Belirgin hareket eşiği: 0,5 sıra.":
    "Comparaisons inconnues : {count}. Seuil de variation notable : 0,5 position.",
  "Arşiv kapsamı kısmi veya bilinmiyor. Hareketler yalnızca kayıtlı gözlemleri karşılaştırır; sitenin tamamını temsil etmez.":
    "La couverture de l’archive est partielle ou inconnue. Les variations comparent uniquement les observations enregistrées, sans représenter tout le site.",
  "Tarih sonu üç günlük gecikme varsayımıdır; canlı tamlık doğrulaması değildir. Google gizli sorguları ve bazı üst sınır dışı satırları döndürmez.":
    "La date de fin suppose un délai de trois jours ; ce n’est pas une vérification de complétude en direct. Google omet les requêtes masquées et certaines lignes au-delà de ses limites.",
  "API yanıtı tamamlanan / sınırlı / başarısız / bilinmeyen gün: {complete} / {limited} / {failed} / {unknown}":
    "Jours avec réponse API complète / limitée / échouée / inconnue : {complete} / {limited} / {failed} / {unknown}",
  "Önceki dönem API yanıtı tamamlanan gün: {complete} / {days}":
    "Jours avec réponse API complète sur la période précédente : {complete} / {days}",
  "Haftalık çizgilerde uç haftalar kısmi olabilir. Gün sayısı yalnızca sorgunun gözlendiği günleri sayar.":
    "Les semaines aux extrémités peuvent être partielles. Seuls les jours où la requête est observée sont comptés.",
  "Arşivi doldurmaya devam et": "Continuer à remplir l’archive",
  "Arşivde sorgu ara": "Rechercher dans les requêtes archivées",
  "Tüm filtreleri kaldır": "Effacer tous les filtres",
  "Dönem ortalaması ilk 10": "Moyenne de la période dans le top 10",
  "Yalnızca iki dönemde de gözlenen sorgular.":
    "Uniquement les requêtes observées sur les deux périodes.",
  "Gösterime göre üst çeyrek eşiği; eşitlikler dahil: {count}":
    "Seuil du quart supérieur des impressions, égalités incluses : {count}",
  "Filtreyle eşleşen sorgular: {matching} / {total}":
    "Requêtes correspondant aux filtres : {matching} / {total}",
  "Filtreleri kaldırın, dönemi genişletin veya arşivi doldurmaya devam edin.":
    "Effacez les filtres, élargissez la période ou continuez à remplir l’archive.",
  "Bu dönemde gözlenmeyen: {count}. Bu, sıra kaybı anlamına gelmez.":
    "Non observées sur cette période : {count}. Cela ne signifie pas une perte de position.",
  "En çok gösterim alan ilk 25 kayıt; arama kutusu bu listede de geçerlidir.":
    "Les 25 premiers enregistrements par impressions ; le champ de recherche filtre aussi cette liste.",
  "Google kotası doldu. Kota yenilendiğinde yeniden deneyin.":
    "Le quota Google est épuisé. Réessayez après sa réinitialisation.",
  "Ağ bağlantısı kurulamadı. İnternet bağlantınızı kontrol edip yeniden deneyin.":
    "La connexion réseau a échoué. Vérifiez votre connexion Internet et réessayez.",
  "Taranan son gün: {date}": "Analyse jusqu’au : {date}",
  "Karşılaştırması bilinmeyen: {count}. Belirgin hareket eşiği: {threshold} sıra.":
    "Comparaisons inconnues : {count}. Seuil de variation notable : {threshold} position.",
  "En çok gösterim alan ilk {count} kayıt; arama kutusu bu listede de geçerlidir.":
    "Les {count} premiers enregistrements par impressions ; le champ de recherche filtre aussi cette liste.",
  "Bağlantı yok; gösterilen özet kayıtlı tarihsel gözlemlerdir.":
    "Connexion absente ; le résumé montre les observations historiques enregistrées.",
  "Seçilen dönem Search Console'un okunabilir kesin günleri dışında. Kullanılabilir dönem: {start} – {end}.":
    "La période sélectionnée dépasse les jours complets accessibles dans Search Console. Période disponible : {start} – {end}.",
  "Search Console yalnızca {start} ve sonrasını okuyabilir. Bu arşiv dönemi bütünüyle açılamaz.":
    "Search Console ne peut lire les données qu’à partir du {start}. Cette période d’archive ne peut pas être ouverte intégralement.",
  // Real-data dashboard and search explanations.
  "Önceki dönemde {clicks} tıklama, {impressions} gösterim vardı.":
    "La période précédente comptait {clicks} clics et {impressions} impressions.",
  "Geçen yıl aynı dönemde {clicks} tıklama, {impressions} gösterim vardı.":
    "La même période l’an dernier comptait {clicks} clics et {impressions} impressions.",
  "Az veride yüzdeler ve ortalamalar hızla değişir; tek başına büyüme veya kayıp kanıtı değildir.":
    "Avec peu de données, les pourcentages et moyennes varient vite ; ils ne prouvent pas à eux seuls une croissance ou une perte.",
  "Bu liste, ortalama sırası yuvarlanarak 4–20 aralığında olan ve bu dönemde en az {count} gösterim alan sorguları kapsar. Eşiğin altındaki sorgular Sorgular sekmesinde incelenebilir.":
    "Cette liste comprend les requêtes dont la position moyenne arrondie est de 4 à 20 et qui ont reçu au moins {count} impressions sur la période. Consultez les requêtes sous le seuil dans l’onglet Requêtes.",
  "Marka sorguları bu listeden çıkarılır.":
    "Les requêtes de marque sont exclues de cette liste.",
  "Google az aranan sorguları gizlilik için gizleyebilir. Sorgu listesi boşken de site toplamında gösterim olabilir. Toplamları ve Sayfalar sekmesini inceleyin.":
    "Google peut masquer les requêtes rares pour protéger la confidentialité. Les totaux du site peuvent contenir des impressions même si la liste est vide. Consultez les totaux et l’onglet Pages.",
  "Alınan veride öneri eşiklerini geçen bir fırsat ya da düşüş bulunmadı. Bu, sitenizde yapılacak iş olmadığı anlamına gelmez. Google bazı sorguları gizlilik için gizler; görünen sorguları ve sayfaları inceleyin.":
    "Aucune opportunité ni baisse n’a atteint les seuils de recommandation dans les données reçues. Cela ne signifie pas qu’il n’y a rien à faire. Google masque certaines requêtes pour protéger la confidentialité ; examinez les requêtes et pages visibles.",
  "Bu bulgular hız, kullanılabilirlik veya arama görünürlüğü ile ilgili olabilir. Ayrıntılarda etkilenen sayfaları inceleyin.":
    "Ces constats peuvent concerner la vitesse, l’ergonomie ou la visibilité dans les recherches. Consultez les pages concernées dans les détails.",
  "Oturum sayısı bilinmiyor. Analytics raporunu açarak kaynak uyarılarını inceleyin; bağlantı erişimini ve sitedeki Analytics etiketini kontrol edin.":
    "Le nombre de sessions est inconnu. Ouvrez le rapport Analytics pour examiner les avertissements de la source ; vérifiez les droits d’accès et la balise Analytics sur le site.",
  "İki dönemde de gözlenen sorgu yok. Yükseliş veya düşüş henüz hesaplanamaz; mevcut sıraları aşağıdaki listeden inceleyin.":
    "Aucune requête n’a été observée sur les deux périodes. Les hausses et baisses ne peuvent pas encore être calculées ; consultez les positions actuelles ci-dessous.",
  "Seçili dönemdeki ortalama sıralar: {count} sorgu. Önceki dönemle karşılaştırılabilecek sorgu yok.":
    {
      one: "Positions moyennes sur la période sélectionnée pour {count} requête. Aucune requête ne peut être comparée à la période précédente.",
      other:
        "Positions moyennes sur la période sélectionnée pour {count} requêtes. Aucune requête ne peut être comparée à la période précédente.",
    },
  "Tüm kayıtlı kelimeler bu dönemde gözlendi.":
    "Tous les mots-clés enregistrés ont été observés sur cette période.",
  "Ek kazanç hesaplanmayan: {zero}; gösterimi yetersiz: {small}; karşılaştırılacak tıklama oranı olmayan: {curve}; tahmine uygun araması olmayan sayfa: {pairs}.":
    "Pages sans gain calculé : {zero} ; impressions insuffisantes : {small} ; aucun taux de clics comparable : {curve} ; aucune requête utilisable : {pairs}.",
  "{start} – {end} aralığında sayfa verisi alınamadı. Bu, hiç gösterim olmadığı anlamına gelmez; Arama performansında bağlı mülkü ve tarihleri kontrol edin.":
    "Aucune donnée de page reçue pour {start} – {end}. Cela ne signifie pas une absence d’impressions ; vérifiez la propriété et les dates dans Performances de recherche.",
  "Bu sayfalar için tahmin edilebilir arama yok":
    "Aucune requête utilisable pour estimer ces pages",
  "{hidden} sayfa gösterim aldı; alınan veride tahmine uygun marka dışı arama bulunamadı. Google'ın gizlediği sorgular, marka ayrımı veya veri sınırları buna yol açabilir. Bu sayfalarda kazanç sıfır değil, bilinmiyor.":
    "{hidden} pages ont reçu des impressions, mais aucune requête hors marque utilisable ne figure dans les données reçues. Les requêtes masquées, l’exclusion de la marque ou les limites de données peuvent l’expliquer. Le gain potentiel est inconnu, pas nul.",
  "{start} – {end} aralığında sitenizin tıklama oranını sıraya göre ölçecek kadar arama yok. Arama performansında gösterim alan sorguları inceleyin; daha fazla veri birikince tahmin yeniden hesaplanabilir.":
    "Il y a trop peu de requêtes du {start} au {end} pour mesurer le taux de clics par position. Consultez les requêtes avec impressions dans Performances de recherche ; l’estimation pourra être recalculée avec davantage de données.",
  "Kaydettiğiniz aramaların ortalama sırasını ve dönemler arasındaki değişimini inceleyin.":
    "Consultez les positions moyennes de vos requêtes enregistrées et leur évolution entre les périodes.",
  "Liste güncellendi: {date}": "Liste mise à jour : {date}",
  "{count} kontrolde kritik sorun":
    "Problèmes critiques dans {count} contrôles",
  "{count} kontrolde uyarı": "Avertissements dans {count} contrôles",
  "Google anonim sorguları gizler ve günlük satırları sınırlar; bu arşiv tüm aramaları içermez.":
    "Google masque les requêtes anonymisées et limite les lignes quotidiennes ; cette archive ne contient pas toutes les recherches.",
  "Bu sayfa açıkken kalan günler otomatik yüklenir; bağlantı veya kota hatasında beklenir.":
    "Les jours restants se chargent automatiquement tant que cette page est ouverte ; une erreur de connexion ou de quota suspend la synchronisation.",
  "Google verisi alındı: {date}": "Données Google récupérées : {date}",
  "Google anonim sorguları gizler. API, arama türü başına günde en fazla {limit} satır sunar; sorgu ve sayfa ayrıntılarında başka satırları da atlayabilir. Tam sayfalama, tüm aramaların listelendiği anlamına gelmez.":
    "Google masque les requêtes anonymisées. L’API fournit au plus {limit} lignes par jour et par type de recherche et peut omettre d’autres détails sur les requêtes et les pages. Une pagination complète ne signifie pas que toutes les recherches sont répertoriées.",
  // Dashboard source scope and measured next steps.
  "Toplamların son günü: {date}.": "Totaux jusqu’au : {date}.",
  "Geçici verinin son günü: {date}.": "Données provisoires jusqu’au : {date}.",
  "Bu dönemden sonra geçici veri alınmadı.":
    "Aucune donnée provisoire reçue après cette période.",
  "{start} – {end} toplamlara dahil değil.":
    "La période du {start} au {end} est exclue des totaux.",
  "Search Console veri kapsamı": "Périmètre des données Search Console",
  "{issue} — {scope}": "{issue} — {scope}",
  "{count} uyarı türünü inceleyin": "Examiner {count} types d’avertissements",
  "Uyarı bulgularını inceleyin": "Examiner les avertissements",
  "{types} uyarı türü / {findings} sayfa bulgusu. Etkilenen sayfaları inceleyin.":
    "{types} types d’avertissements / {findings} constats sur les pages. Examinez les pages concernées.",
  "{findings} sayfa bulgusu. Etkilenen sayfaları inceleyin.":
    "{findings} constats sur les pages. Examinez les pages concernées.",
  "{value} yüzde puan": "{value} points de pourcentage",
  "Oran değişimi yüzde puanla gösterilir: iki dönemin yüzdeleri arasındaki farktır.":
    "La variation du taux est exprimée en points de pourcentage : la différence entre les pourcentages des deux périodes.",
};
