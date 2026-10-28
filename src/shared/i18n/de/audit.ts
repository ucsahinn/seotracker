/* eslint-disable max-lines -- locale translation data */
import type { Catalog } from "@/shared/i18n";

/** German for the site audit: checks, findings, speed, site details and the audit report. */
export const deAudit: Catalog = {
  "Sayfadaki canonical adresi": "Canonical-URL auf der Seite",
  "robots etiketleri": "robots-Tags",
  "googlebot etiketleri": "googlebot-Tags",
  "Sayfa başlığı": "Seitentitel",
  "Başlıktaki anlamlı kelime": "Aussagekräftige Wörter im Titel",
  "Lighthouse denetimi": "Lighthouse-Prüfung",
  "Etkilenen öğe": "Betroffene Elemente",
  "Karşılanmayan koşul": "Bedingung nicht erfüllt",
  "Tahmini kazanç": "Geschätzte Einsparung",
  "Üçüncü taraf kodların ana iş parçacığı süresi":
    "Hauptthread-Zeit durch Code von Drittanbietern",
  "Toplam indirme boyutu": "Gesamte Downloadgröße",
  "Kırık dış bağlantı": "Defekter externer Link",
  Görseller: "Bilder",
  "Gömülü betik ve stil": "Inline-Skripte und -Styles",
  "Sayfaya yönlendirme olmadan ulaşılmıyor":
    "Die Seite ist nur über eine Weiterleitung erreichbar",
  "Sunucu ilk yanıtı hızlı vermiyor":
    "Die erste Antwort des Servers ist langsam",
  "Belge sıkıştırılmadan gönderiliyor":
    "Das Dokument wird unkomprimiert gesendet",
  'Ana görselde loading="lazy" var': 'Das Hauptbild hat loading="lazy"',
  "Ana görsel sayfanın ilk HTML'inde yok":
    "Das Hauptbild ist nicht im ursprünglichen HTML der Seite",
  'Ana görselde fetchpriority="high" yok':
    'Das Hauptbild hat kein fetchpriority="high"',
  "{count} güvensiz (http) görsel, video ya da çerçeve": {
    one: "{count} unsicheres (http) Bild, Video oder Frame",
    other: "{count} unsichere (http) Bilder, Videos oder Frames",
  },
  "{count} form bilgileri http adresine gönderiyor": {
    one: "{count} Formular sendet an eine http-Adresse",
    other: "{count} Formulare senden an eine http-Adresse",
  },
  "{count} e-posta adresi açıkta": {
    one: "{count} E-Mail-Adresse offen sichtbar",
    other: "{count} E-Mail-Adressen offen sichtbar",
  },
  "{count} iç bağlantı http:// ile veriliyor": {
    one: "{count} interner Link verwendet http://",
    other: "{count} interne Links verwenden http://",
  },
  "{count} görsel {limit}'tan büyük": {
    one: "{count} Bild größer als {limit}",
    other: "{count} Bilder größer als {limit}",
  },
  "{value} (iyi: en çok {good}, kötü: {poor} üstü)":
    "{value} (gut: bis {good}, schlecht: über {poor})",
  "{value} (kötü sınırı: {limit})": "{value} (schlecht über {limit})",
  "saha verisi (gerçek Chrome kullanıcıları)":
    "Felddaten (echte Chrome-Nutzer)",
  "laboratuvar ölçümü (PageSpeed Insights)":
    "Labormessung (PageSpeed Insights)",
  "alan adı bulunamadı": "Domain nicht gefunden",
  hata: "Fehler",
  "en az {size}": "mindestens {size}",
  'Sayfa "{text}" diyor, ama sunucu {status} döndürüyor':
    "Die Seite sagt „{text}“, aber der Server liefert {status}",
  "{size} (sınır {limit})": "{size} (Grenze {limit})",
  "Yazı olarak işaretlenmiş {count} sayfa": {
    one: "{count} Seite als Artikel ausgezeichnet",
    other: "{count} Seiten als Artikel ausgezeichnet",
  },
  "ve {count} tane daha": {
    one: "und {count} weitere",
    other: "und {count} weitere",
  },
  "Tahmini kazanç: {value}": "Geschätzte Einsparung: {value}",
  "{count} adres, bu sitede {onHost}": {
    one: "{count} URL, davon {onHost} auf dieser Website",
    other: "{count} URLs, davon {onHost} auf dieser Website",
  },
  "Lighthouse'un tahmini; en çok kazandıran sayfa için.":
    "Schätzung von Lighthouse für die Seite mit dem größten Gewinn.",
  "Lighthouse bu denetimde bu ölçümleri raporlamadı, ya da denetim bu kontroller eklenmeden önce yapıldı.":
    "Lighthouse hat diese Messwerte in diesem Audit nicht geliefert, oder das Audit lief, bevor diese Prüfungen hinzukamen.",
  "Dış bağlantı ve görsel boyutu kontrolü bu denetimde açık değildi ya da ölçülemedi.":
    "Die Prüfung externer Links und Bildgrößen war für dieses Audit ausgeschaltet oder konnte nicht gemessen werden.",
  "Bu kontroller denetimden sonra eklendi; yeni bir denetim onları da ölçer.":
    "Diese Prüfungen kamen nach diesem Audit hinzu; ein neues Audit misst sie mit.",
  "Orta. Kritik sorun yok; en çok puan getiren uyarılardan başlayın.":
    "Mittel. Keine kritischen Probleme; beginnen Sie mit den Warnungen, die die meisten Punkte bringen.",
  "Zayıf. Kritik sorun yok, ama birikmiş uyarılar puanı aşağı çekiyor.":
    "Schwach. Keine kritischen Probleme, aber die angesammelten Warnungen drücken den Score.",
  "Site haritasında başka bir siteye ait adresler var":
    "Die Sitemap listet Adressen einer anderen Website",
  "Site haritanız bu sitenin değil, başka bir alan adının adreslerini listeliyor. Google bir site haritasındaki adresleri yalnızca haritayla aynı sitedeyse kabul eder; diğer sitenin robots.txt dosyası bu haritayı göstermiyorsa ya da o site Search Console'da sizin adınıza doğrulanmamışsa bu adresleri yok sayar.":
    "Ihre Sitemap listet Adressen einer anderen Domain, nicht dieser Website. Google akzeptiert Sitemap-Einträge nur, wenn sie auf derselben Website wie die Sitemap liegen; sofern die robots.txt der anderen Website nicht auf diese Sitemap verweist oder die andere Website in Search Console für Sie bestätigt ist, ignoriert Google diese Adressen.",
  "Site haritasını, adreslerin ait olduğu sitede yayınlayın ya da haritayı üreten ayarda sitenin adresini düzeltin (çoğu zaman eski bir alan adı ya da önizleme adresi kalmıştır). Bilerek başka siteye ait adresleri listeliyorsanız o sitenin robots.txt dosyasına bu haritayı gösteren bir Sitemap satırı ekleyin.":
    "Veröffentlichen Sie die Sitemap auf der Website, zu der die Adressen gehören, oder korrigieren Sie die Website-Adresse in der Einstellung, die sie erzeugt (oft ist eine alte Domain oder eine Vorschauadresse übrig geblieben). Wenn Sie absichtlich Adressen einer anderen Website aufführen, ergänzen Sie in deren robots.txt eine Sitemap-Zeile, die auf diese Sitemap zeigt.",
  "robots.txt bazı yolları yalnızca Googlebot'a açıyor":
    "robots.txt öffnet einige Pfade nur für Googlebot",
  "robots.txt dosyanız bazı yolları tüm botlara (User-agent: *) kapatıyor ama Googlebot'a ayrıca izin veriyor. Bu araç Googlebot değil, o yüzden bu yollardaki sayfaları taramadı; denetimde görünmemeleri sorun olmadıkları anlamına gelmez. Google bu sayfaları tarayabilir.":
    "Ihre robots.txt sperrt einige Pfade für alle Bots (User-agent: *), erlaubt sie aber gesondert für Googlebot. Dieses Tool ist nicht Googlebot und hat die Seiten unter diesen Pfaden daher nicht gecrawlt; dass sie in diesem Audit fehlen, heißt nicht, dass mit ihnen alles in Ordnung ist. Google kann sie crawlen.",
  "Bir şey yapmanız gerekmiyor. Bu sayfaları da denetlemek istiyorsanız ayrıntıdaki kuralları gözden geçirin; yalnızca Googlebot'a açık bırakmanın bir nedeni yoksa kuralı tüm botlar için aynı yapın.":
    "Es muss nichts geändert werden. Wenn auch diese Seiten geprüft werden sollen, sehen Sie sich die Regeln in den Details an; gibt es keinen Grund, sie nur für Googlebot zu öffnen, machen Sie die Regel für alle Bots gleich.",
  "Sayfanın ilk görünümünü engelleyen dosyalar var":
    "Dateien blockieren die erste Darstellung der Seite",
  "Tarayıcı bazı CSS ve JavaScript dosyalarını indirip işlemeden sayfada hiçbir şey göstermiyor. Lighthouse, bunlar ertelenirse ilk içeriğin daha erken görüneceğini hesapladı; tahmini kazanç bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Der Browser zeigt nichts von der Seite an, bis er einige CSS- und JavaScript-Dateien geladen und verarbeitet hat. Lighthouse hat berechnet, dass der erste Inhalt früher erscheinen würde, wenn diese zurückgestellt würden; der geschätzte Gewinn steht in den Details des Befunds. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Sayfanın ilk ekranı için gerekmeyen betiklere defer ya da async ekleyin, ilk ekran için gereken küçük CSS'i sayfaya gömün, kalan CSS'i sonradan yükleyin. WordPress'te bir önbellek eklentisinin \"JavaScript'i ertele\" ve \"kritik CSS\" ayarları bu işi yapar.":
    "Ergänzen Sie defer oder async bei Skripten, die der erste Bildschirm nicht braucht, binden Sie das kleine CSS für den ersten Bildschirm inline ein und laden Sie das übrige CSS später. Unter WordPress erledigen das die Einstellungen „JavaScript verzögern“ und „Critical CSS“ eines Caching-Plugins.",
  "Sayfada kullanılmayan JavaScript yükleniyor":
    "Die Seite lädt JavaScript, das sie nicht nutzt",
  "Sayfa, açılışta hiç çalışmayan JavaScript kodunu da indiriyor. Telefonda bu hem veri hem işlemci harcar ve sayfayı yavaşlatır. Lighthouse'un tahmin ettiği tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Die Seite lädt zusätzlich JavaScript, das beim Öffnen nie ausgeführt wird. Auf dem Smartphone kostet das Datenvolumen und Rechenzeit und verlangsamt die Seite. Die von Lighthouse geschätzte Einsparung steht in den Details des Befunds. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Kullanılmayan eklentileri ve etiketleri kaldırın, büyük betik paketlerini sayfaya göre bölün ve yalnızca gereken sayfada yükleyin. Hangi dosyanın ne kadar boşa indiğini PageSpeed Insights raporunda görürsünüz.":
    "Entfernen Sie ungenutzte Plugins und Tags, teilen Sie große Skript-Bundles nach Seiten auf und laden Sie sie nur dort, wo sie gebraucht werden. PageSpeed Insights zeigt, wie viel von jeder Datei ungenutzt bleibt.",
  "Sayfada kullanılmayan CSS yükleniyor":
    "Die Seite lädt CSS, das sie nicht nutzt",
  "Sayfa, bu sayfada hiçbir öğeye uygulanmayan stil kurallarını da indiriyor. Genelde tüm siteye tek bir büyük tema dosyası yüklendiğinde olur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Die Seite lädt zusätzlich Stilregeln, die auf dieser Seite für nichts gelten. Das passiert meist, wenn eine große Theme-Datei auf der ganzen Website geladen wird. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Tema ya da eklentilerin kullanılmayan stil dosyalarını kapatın; bir derleme aracı kullanıyorsanız kullanılmayan CSS'i temizleyen adımı açın.":
    "Schalten Sie ungenutzte Stylesheets des Themes oder der Plugins ab; wenn Sie ein Build-Tool verwenden, aktivieren Sie dessen Schritt zum Entfernen ungenutzten CSS.",
  "JavaScript dosyaları sıkıştırılmamış (küçültülmemiş)":
    "JavaScript-Dateien sind nicht minifiziert",
  "Bazı JavaScript dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Küçültme dosyayı anlamını değiştirmeden küçültür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Einige JavaScript-Dateien werden mit Leerzeichen und Kommentaren ausgeliefert, ohne Minifizierung. Minifizieren macht eine Datei kleiner, ohne ihr Verhalten zu ändern. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Derleme aracınızda küçültmeyi (minify) açın ya da önbellek/CDN ayarlarından JavaScript küçültmeyi etkinleştirin.":
    "Aktivieren Sie die Minifizierung in Ihrem Build-Tool oder die JavaScript-Minifizierung in den Cache- bzw. CDN-Einstellungen.",
  "CSS dosyaları sıkıştırılmamış (küçültülmemiş)":
    "CSS-Dateien sind nicht minifiziert",
  "Bazı CSS dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Einige CSS-Dateien werden mit Leerzeichen und Kommentaren ausgeliefert, ohne Minifizierung. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Derleme aracınızda CSS küçültmeyi açın ya da önbellek/CDN ayarlarından CSS küçültmeyi etkinleştirin.":
    "Aktivieren Sie die CSS-Minifizierung in Ihrem Build-Tool oder in den Cache- bzw. CDN-Einstellungen.",
  "Görseller gereğinden büyük indiriliyor":
    "Bilder werden größer geladen als nötig",
  "Lighthouse sayfadaki bazı görsellerin daha küçük indirilebileceğini hesapladı: eski bir biçimde (JPEG, PNG) sunuluyorlar, sıkıştırılmamışlar ya da ekranda gösterildiklerinden çok daha büyük boyutta indiriliyorlar. Tahmini tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse hat berechnet, dass einige Bilder auf der Seite kleiner geladen werden könnten: Sie werden in einem alten Format (JPEG, PNG) ausgeliefert, sind nicht komprimiert oder werden viel größer geladen als angezeigt. Die geschätzte Einsparung steht in den Details des Befunds. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Görselleri WebP ya da AVIF'e çevirin, sıkıştırın ve ekrandaki boyutlarına göre küçültün; farklı ekranlar için srcset ile birden çok boyut sunun. Çoğu CMS'te bir görsel optimizasyon eklentisi bunu otomatik yapar.":
    "Wandeln Sie Bilder in WebP oder AVIF um, komprimieren Sie sie und bringen Sie sie auf ihre Anzeigegröße; liefern Sie mit srcset mehrere Größen für unterschiedliche Bildschirme. In den meisten CMS erledigt das ein Plugin zur Bildoptimierung automatisch.",
  "Dosyalar tarayıcıda yeterince uzun saklanmıyor":
    "Dateien bleiben nicht lange genug im Browser-Cache",
  "Görsel, betik ve stil dosyaları kısa bir önbellek süresiyle ya da hiç önbellek bilgisi olmadan sunuluyor. Ziyaretçi siteye dönünce aynı dosyaları yeniden indirir. Lighthouse'un tahmin ettiği tekrar ziyaret tasarrufu bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Bild-, Skript- und Style-Dateien werden mit kurzer Cache-Dauer oder ganz ohne Cache-Angabe ausgeliefert. Kommt ein Besucher zurück, lädt er dieselben Dateien erneut. Die von Lighthouse geschätzte Einsparung bei wiederholten Besuchen steht in den Details des Befunds. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  'Değişmeyen dosyalara uzun bir Cache-Control süresi verin (örneğin max-age=31536000) ve dosya değiştiğinde adını değiştirin. Barındırma panelinde ya da CDN\'de "tarayıcı önbelleği" ayarı genelde bunu yapar.':
    "Geben Sie unveränderlichen Dateien eine lange Cache-Control-Dauer (zum Beispiel max-age=31536000) und ändern Sie den Dateinamen, wenn sich der Inhalt ändert. Meist erledigt das eine Einstellung „Browser-Cache“ in Ihrem Hosting-Panel oder CDN.",
  "Sayfanın toplam indirme boyutu çok büyük":
    "Die gesamte Downloadgröße der Seite ist sehr groß",
  "Sayfayı açmak için indirilen her şeyin toplamı 2,5 MB'ı geçiyor. Mobil bağlantıda bu uzun bir yükleme ve ziyaretçinin veri paketinden harcama demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alles, was zum Öffnen der Seite geladen wird, ergibt zusammen mehr als 2,5 MB. Über eine Mobilverbindung bedeutet das lange Ladezeiten und verbrauchtes Datenvolumen des Besuchers. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "PageSpeed Insights raporunda en büyük dosyalara bakın. Genelde görseller, videolar ve büyük betik paketleridir: görselleri küçültün, videoyu tıklanınca yükleyin, gereksiz betikleri kaldırın.":
    "Sehen Sie sich die größten Dateien im PageSpeed-Insights-Bericht an. Meist sind es Bilder, Videos und große Skript-Bundles: Bilder verkleinern, Videos erst per Klick laden, unnötige Skripte entfernen.",
  "Tarayıcıda oluşan sayfa yapısı çok büyük":
    "Die im Browser aufgebaute Seitenstruktur ist sehr groß",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra oluşan HTML yapısının çok büyük olduğunu buldu. Bu, sayfanın kaynak kodunu sayan kontrolden farklıdır: JavaScript'in sonradan eklediği öğeleri de içerir. Büyük bir yapı stil hesaplamayı ve tıklamalara yanıtı yavaşlatır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse hat festgestellt, dass die HTML-Struktur, die die Seite nach dem Ausführen im Browser aufbaut, sehr groß ist. Das unterscheidet sich von der Prüfung, die den Quelltext der Seite zählt: Hier sind auch Elemente enthalten, die JavaScript später hinzufügt. Eine große Struktur verlangsamt die Stilberechnung und die Reaktion auf Tippen. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Görünmeyen içeriği (kapalı menüler, sekmeler, uzun listeler) gerektiğinde oluşturun ve sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.":
    "Bauen Sie verborgene Inhalte (geschlossene Menüs, Tabs, lange Listen) erst bei Bedarf auf und reduzieren Sie unnötige Wrapper-Ebenen des Page Builders.",
  "Sayfa açılmadan önce yönlendirme yapılıyor":
    "Die Seite leitet vor dem Öffnen weiter",
  "Lighthouse sayfanın ana belgesine ulaşmadan önce bir ya da daha fazla yönlendirmeden geçti. Her yönlendirme, içerik görünmeden önce fazladan bir istek demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse hat eine oder mehrere Weiterleitungen durchlaufen, bevor es das Hauptdokument der Seite erreichte. Jede Weiterleitung ist eine zusätzliche Anfrage, bevor Inhalt erscheint. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Bu sayfaya giden bağlantıları ve site haritasını doğrudan son adrese çevirin; yönlendirme gerekiyorsa tek adımda bitsin.":
    "Lassen Sie Links und die Sitemap direkt auf die endgültige Adresse zeigen; ist eine Weiterleitung nötig, dann in einem einzigen Schritt.",
  "Sunucu ilk yanıtı geç veriyor (Lighthouse)":
    "Der Server antwortet langsam (Lighthouse)",
  "Lighthouse'un ölçümünde sunucunun sayfanın ilk baytını göndermesi 600 milisaniyeden uzun sürdü. Sunucu yanıt vermeden tarayıcı hiçbir şey yapamaz; bu süre sayfanın tüm açılışına eklenir. Tarayıcımızın kendi ölçtüğü yanıt süresinden ayrı, Google'ın sunucularından yapılan bir ölçümdür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "In der Lighthouse-Messung brauchte der Server länger als 600 Millisekunden für das erste Byte der Seite. Solange der Server nicht antwortet, kann der Browser nichts tun; diese Zeit kommt also zur gesamten Ladezeit hinzu. Es ist eine Messung von Googles Servern aus, unabhängig von der Antwortzeit, die unser Crawler gemessen hat. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Sayfa önbelleğini (tam sayfa önbellek) açın, yavaş veritabanı sorgularını ve eklentileri bulun, gerekirse daha güçlü bir sunucuya ya da bir CDN'e geçin.":
    "Aktivieren Sie Seiten-Caching (Full-Page-Cache), suchen Sie langsame Datenbankabfragen und Plugins und wechseln Sie bei Bedarf zu einem stärkeren Server oder einem CDN.",
  "Sayfa sıkıştırılmadan gönderiliyor": "Die Seite wird unkomprimiert gesendet",
  "Lighthouse, sayfanın HTML belgesinin gzip ya da Brotli ile sıkıştırılmadan gönderildiğini gördü. Sıkıştırma metin dosyalarını genelde üçte bire indirir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse hat festgestellt, dass das HTML-Dokument der Seite ohne gzip- oder Brotli-Komprimierung gesendet wird. Komprimierung verkleinert Textdateien meist auf ein Drittel. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Sunucunuzda ya da CDN'de gzip veya Brotli sıkıştırmayı açın. Çoğu barındırma panelinde tek bir ayardır.":
    "Aktivieren Sie gzip- oder Brotli-Komprimierung auf Ihrem Server oder CDN. In den meisten Hosting-Panels ist das eine einzige Einstellung.",
  "Yazı tipleri yüklenirken metin görünmüyor":
    "Text ist unsichtbar, solange Schriften laden",
  "Özel yazı tipleri yüklenene kadar metin görünmez kalıyor. Lighthouse, metnin yedek yazı tipiyle hemen gösterilmesinin ilk görünümü hızlandıracağını hesapladı. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Text bleibt unsichtbar, bis eigene Schriften geladen sind. Lighthouse hat berechnet, dass die erste Darstellung schneller wäre, wenn der Text sofort in einer Ersatzschrift erschiene. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "@font-face kurallarına font-display: swap ekleyin. Google Fonts kullanıyorsanız adresin sonuna &display=swap ekleyin.":
    "Ergänzen Sie font-display: swap in Ihren @font-face-Regeln. Bei Google Fonts hängen Sie &display=swap an die URL an.",
  "Sayfanın ana görseli geç yüklenecek şekilde işaretlenmiş":
    "Das Hauptbild der Seite ist auf spätes Laden gesetzt",
  'Sayfanın en büyük öğesi (LCP) olan görselde loading="lazy" var. Tarayıcı bu görseli sayfa yerleşimi bitene kadar istemez, bu yüzden ana içerik geç görünür. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'Das Bild, das das größte Element der Seite ist (LCP), hat loading="lazy". Der Browser fordert es erst nach dem Layout an, daher erscheint der Hauptinhalt spät. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.',
  'Sayfanın ilk ekranındaki ana görselden loading="lazy" özniteliğini kaldırın. Geç yükleme yalnızca ilk ekranın altındaki görsellere uygulanmalı.':
    'Entfernen Sie loading="lazy" beim Hauptbild im ersten Bildschirm. Lazy Loading gehört nur zu Bildern unterhalb des ersten Bildschirms.',
  "Sayfanın ana görseli öncelikli istenmiyor":
    "Das Hauptbild der Seite wird nicht mit Priorität angefordert",
  "Sayfanın en büyük öğesi (LCP) olan görsel ya sayfanın ilk HTML'inde yer almıyor (tarayıcı onu geç keşfediyor) ya da fetchpriority=\"high\" ile öncelikli istenmiyor. Ayrıntıda hangisinin eksik olduğu yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    'Das Bild, das das größte Element der Seite ist (LCP), steht entweder nicht im ursprünglichen HTML (der Browser entdeckt es spät) oder wird nicht mit fetchpriority="high" angefordert. Die Details zeigen, was fehlt. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.',
  'Ana görseli sayfanın HTML\'inde doğrudan bir <img> olarak verin (yalnızca JavaScript ya da CSS arka planı ile değil) ve ona fetchpriority="high" ekleyin. Gerekirse <link rel="preload"> ile önceden yükleyin.':
    'Setzen Sie das Hauptbild direkt als <img> ins HTML der Seite (nicht nur per JavaScript oder als CSS-Hintergrund) und ergänzen Sie fetchpriority="high". Bei Bedarf laden Sie es mit <link rel="preload"> vor.',
  "Dosyalar eski HTTP/1.1 ile sunuluyor":
    "Dateien werden über das alte HTTP/1.1 ausgeliefert",
  "Sayfanın dosyalarının bir kısmı HTTP/2 ya da HTTP/3 yerine HTTP/1.1 ile geliyor. Eski protokolde tarayıcı aynı anda az sayıda dosya indirebilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Einige Dateien der Seite kommen über HTTP/1.1 statt über HTTP/2 oder HTTP/3. Mit dem alten Protokoll kann der Browser nur wenige Dateien gleichzeitig laden. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Sunucunuzda ya da CDN'de HTTP/2'yi (tercihen HTTP/3'ü) açın. Çoğu modern barındırma ve CDN bunu varsayılan olarak destekler.":
    "Aktivieren Sie HTTP/2 (besser HTTP/3) auf Ihrem Server oder CDN. Die meisten modernen Hoster und CDNs unterstützen es standardmäßig.",
  "Eski tarayıcılar için gereksiz JavaScript gönderiliyor":
    "Für alte Browser wird unnötiges JavaScript gesendet",
  "Sayfadaki betikler, güncel tarayıcıların zaten bildiği özellikler için eski tarayıcılara yönelik ek kod (polyfill, dönüştürme) içeriyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Die Skripte der Seite enthalten zusätzlichen Code für alte Browser (Polyfills, transpilierter Code) für Funktionen, die aktuelle Browser bereits haben. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Derleme aracınızın hedef tarayıcı ayarını (browserslist) güncel tarayıcılara çekin ve artık gerekmeyen polyfill'leri kaldırın.":
    "Stellen Sie die Zielbrowser Ihres Build-Tools (browserslist) auf aktuelle Browser um und entfernen Sie nicht mehr benötigte Polyfills.",
  "Üçüncü taraf kodlar tarayıcıyı uzun süre meşgul ediyor":
    "Code von Drittanbietern hält den Browser lange beschäftigt",
  "Reklam, sohbet, analiz ya da sosyal medya gibi başka sitelerden gelen betikler telefonda tarayıcının ana iş parçacığını toplam yarım saniyeden uzun meşgul etti. Bu sürede sayfa tıklamalara geç yanıt verir. Hangi hizmetin ne kadar sürdüğü bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Skripte anderer Websites wie Werbung, Chat, Analyse oder Social Media haben den Hauptthread des Browsers auf dem Smartphone insgesamt über eine halbe Sekunde beschäftigt. In dieser Zeit reagiert die Seite verzögert auf Tippen. Welcher Dienst wie lange brauchte, steht in den Details des Befunds. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Kullanmadığınız etiketleri kaldırın, kalanları sayfa açıldıktan sonra yükleyin; sohbet ya da video gibi ağır gömülü öğeleri tıklanınca yüklenen bir önizlemeyle değiştirin.":
    "Entfernen Sie ungenutzte Tags, laden Sie die übrigen erst nach dem Öffnen der Seite und ersetzen Sie schwere Einbettungen wie Chat oder Video durch eine Vorschau, die erst per Klick lädt.",
  "Ana içeriğin yüklenmesi iyileştirilebilir (LCP)":
    "Hauptinhalt könnte schneller laden (LCP)",
  "Sayfanın en büyük öğesi 2,5 ile 4 saniye arasında göründü. Google bu aralığı 'iyileştirilmeli' sayar; 2,5 saniye ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa PageSpeed Insights'ın laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.":
    "Das größte Element der Seite erschien nach 2,5 bis 4 Sekunden. Google bewertet diesen Bereich als „Optimierung erforderlich“; 2,5 Sekunden oder weniger gelten als „Gut“. Der Wert stammt aus Daten echter Chrome-Nutzer (Felddaten), sofern vorhanden, sonst aus der Labormessung von PageSpeed Insights; die Details zeigen, welche Quelle.",
  "En büyük öğe genelde kapak görseli ya da ana başlıktır: görseli küçültüp WebP gibi hafif bir biçime çevirin, geç yüklenmesini kapatın ve onu engelleyen betik ve yazı tiplerini erteleyin.":
    "Das größte Element ist meist das Titelbild oder die Hauptüberschrift: Bild verkleinern und in ein leichtes Format wie WebP umwandeln, Lazy Loading dafür abschalten und blockierende Skripte und Schriften zurückstellen.",
  "Yüklenirken içerik biraz kayıyor (CLS)":
    "Inhalt verschiebt sich beim Laden etwas (CLS)",
  "Sayfa yüklenirken içerik 0,1 ile 0,25 arasında kaydı. Google bu aralığı 'iyileştirilmeli' sayar; 0,1 ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.":
    "Beim Laden der Seite verschob sich der Inhalt um 0,1 bis 0,25. Google bewertet diesen Bereich als „Optimierung erforderlich“; 0,1 oder weniger gilt als „Gut“. Der Wert stammt aus Daten echter Chrome-Nutzer (Felddaten), sofern vorhanden, sonst aus der Labormessung; die Details zeigen, welche Quelle.",
  "Görsellere ve gömülü çerçevelere genişlik ile yükseklik verin, sonradan yüklenen afiş ve reklamlar için yer ayırın, özel yazı tipi için yerleşimi bozmayan bir yedek tanımlayın.":
    "Geben Sie Bildern und eingebetteten Frames Breite und Höhe, reservieren Sie Platz für später geladene Banner und Anzeigen und legen Sie für eigene Schriften eine Ersatzschrift fest, die das Layout nicht verschiebt.",
  "Tıklamalara yanıt iyileştirilebilir (INP)":
    "Reaktion auf Tippen könnte schneller sein (INP)",
  "Sayfa tıklama ve dokunuşlara 200 ile 500 milisaniye arasında yanıt verdi. Google bu aralığı 'iyileştirilmeli' sayar; 200 milisaniye ve altı 'iyi'dir. Laboratuvar testi etkileşimi taklit edemediği için bu değer Chrome kullanıcılarının gerçek (alan) verisidir.":
    "Die Seite reagierte auf Klicks und Tippen in 200 bis 500 Millisekunden. Google bewertet diesen Bereich als „Optimierung erforderlich“; 200 Millisekunden oder weniger gelten als „Gut“. Da ein Labortest keine Interaktion simulieren kann, stammt dieser Wert aus Daten echter Chrome-Nutzer (Felddaten).",
  "Tıklamada çalışan uzun betikleri bölün, üçüncü taraf etiketleri sayfa açıldıktan sonra yükleyin ve gereksiz olanları kaldırın.":
    "Teilen Sie lange Skripte, die bei einem Klick laufen, auf, laden Sie Tags von Drittanbietern erst nach dem Öffnen der Seite und entfernen Sie die, die Sie nicht brauchen.",
  "Bazı metinlerin renk karşıtlığı yetersiz":
    "Einige Texte haben zu wenig Farbkontrast",
  "Bazı metinler arka planlarıyla yeterince ayrışmıyor; az gören ziyaretçiler ve güneş altında telefon kullananlar onları zor okur. Kaç öğenin etkilendiği ayrıntıda yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Einige Texte heben sich nicht genug vom Hintergrund ab; Besucher mit Sehschwäche und Menschen, die ihr Smartphone im Sonnenlicht nutzen, können sie schwer lesen. Die Details zeigen, wie viele Elemente betroffen sind. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Normal metin için en az 4,5:1, büyük metin için 3:1 karşıtlık oranı sağlayın. Hangi öğelerin yetersiz kaldığını PageSpeed Insights'ın Erişilebilirlik bölümünde görürsünüz.":
    "Sorgen Sie für ein Kontrastverhältnis von mindestens 4,5:1 bei normalem und 3:1 bei großem Text. Der Abschnitt „Barrierefreiheit“ in PageSpeed Insights zeigt, welche Elemente das nicht erreichen.",
  "Görsellerde alternatif metin eksik (Lighthouse)":
    "Bildern fehlt der Alternativtext (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra alternatif metni (alt) olmayan görseller buldu. Bu, JavaScript'in sonradan eklediği görselleri de kapsar. Ekran okuyucular bu görselleri anlatamaz, Google da ne gösterdiklerini metinden öğrenemez. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse hat nach dem Ausführen der Seite im Browser Bilder ohne Alternativtext (alt) gefunden. Dazu zählen auch Bilder, die JavaScript später hinzufügt. Screenreader können diese Bilder nicht beschreiben, und Google kann nicht aus Text erfahren, was sie zeigen. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  'Her anlamlı görsele ne gösterdiğini anlatan kısa bir alt metni ekleyin; süs amaçlı görsellere boş alt="" verin.':
    'Geben Sie jedem aussagekräftigen Bild einen kurzen alt-Text, der beschreibt, was es zeigt; dekorative Bilder bekommen ein leeres alt="".',
  "Form alanlarının etiketi yok (Lighthouse)":
    "Formularfelder haben kein Label (Lighthouse)",
  "Bazı form alanlarına bağlı bir etiket yok. Ekran okuyucu kullanan ziyaretçi alana ne yazması gerektiğini duyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Einige Formularfelder haben kein zugeordnetes Label. Wer einen Screenreader nutzt, hört nicht, was in das Feld einzugeben ist. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Her alana for özniteliğiyle bağlı bir <label> ekleyin; görünür etiket istenmiyorsa aria-label kullanın.":
    "Ergänzen Sie für jedes Feld ein <label>, das über das for-Attribut verknüpft ist; soll kein sichtbares Label erscheinen, verwenden Sie aria-label.",
  "Bazı bağlantıların okunabilir adı yok":
    "Einige Links haben keinen lesbaren Namen",
  'Bazı bağlantılarda ne metin ne de erişilebilir bir ad var (örneğin yalnızca bir simge). Ekran okuyucu bunları yalnızca "bağlantı" diye okur; Google da bağlantının neye gittiğini metinden anlayamaz. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    "Einige Links haben weder Text noch einen zugänglichen Namen (zum Beispiel nur ein Symbol). Ein Screenreader liest sie nur als „Link“ vor, und Google kann aus dem Text nicht erkennen, wohin sie führen. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Bağlantıya görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.":
    "Geben Sie dem Link sichtbaren Text; ist es nur ein Symbol, beschreiben Sie seine Funktion mit aria-label.",
  "Bazı düğmelerin okunabilir adı yok":
    "Einige Schaltflächen haben keinen lesbaren Namen",
  'Bazı düğmelerde ne metin ne de erişilebilir bir ad var. Ekran okuyucu bunları yalnızca "düğme" diye okur. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    "Einige Schaltflächen haben weder Text noch einen zugänglichen Namen. Ein Screenreader liest sie nur als „Schaltfläche“ vor. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Düğmeye görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.":
    "Geben Sie der Schaltfläche sichtbaren Text; ist es nur ein Symbol, beschreiben Sie ihre Funktion mit aria-label.",
  "Sayfanın tarayıcıda başlığı yok (Lighthouse)":
    "Die Seite hat im Browser keinen Titel (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra bir <title> bulamadı. Sekmede ve arama sonucunda başlık olarak gösterilecek bir şey yok. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse hat nach dem Ausführen der Seite im Browser kein <title> gefunden. Im Tab und in den Suchergebnissen gibt es nichts, was als Titel angezeigt werden kann. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Sayfanın <head> bölümüne sayfayı anlatan benzersiz bir <title> ekleyin; başlığı JavaScript ile sonradan yazıyorsanız sunucunun gönderdiği HTML'e taşıyın.":
    "Ergänzen Sie im <head> der Seite einen eindeutigen <title>, der die Seite beschreibt; schreibt JavaScript den Titel erst später, verschieben Sie ihn in das HTML, das der Server sendet.",
  "Sayfanın dili tarayıcıda belirtilmemiş (Lighthouse)":
    "Die Sprache der Seite ist im Browser nicht angegeben (Lighthouse)",
  "Lighthouse, <html> öğesinde lang özniteliği bulamadı. Ekran okuyucular metni yanlış dilin kurallarıyla okuyabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse hat kein lang-Attribut am <html>-Element gefunden. Screenreader lesen den Text womöglich nach den Regeln einer falschen Sprache vor. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  'Sayfanın <html> etiketine dilini ekleyin, örneğin <html lang="tr">.':
    'Geben Sie die Sprache der Seite im <html>-Tag an, zum Beispiel <html lang="de">.',
  "Telefonda yakınlaştırma engellenmiş (Lighthouse)":
    "Zoomen ist auf Smartphones gesperrt (Lighthouse)",
  "Sayfanın viewport ayarı ziyaretçinin metni büyütmesini engelliyor (user-scalable=no ya da düşük bir maximum-scale). Az gören ziyaretçiler sayfayı okuyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Die Viewport-Einstellung der Seite hindert Besucher daran, den Text zu vergrößern (user-scalable=no oder ein niedriger maximum-scale). Besucher mit Sehschwäche können die Seite nicht lesen. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  'Viewport etiketinden user-scalable=no ve maximum-scale değerini kaldırın; content="width=device-width, initial-scale=1" yeterlidir.':
    'Entfernen Sie user-scalable=no und den maximum-scale-Wert aus dem Viewport-Tag; content="width=device-width, initial-scale=1" genügt.',
  "Dokunma hedefleri çok küçük ya da çok sık":
    "Tippziele sind zu klein oder liegen zu dicht beieinander",
  "Bazı düğme ve bağlantılar telefonda parmakla rahat dokunulamayacak kadar küçük ya da birbirine çok yakın. Ziyaretçi yanlış yere dokunur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Einige Schaltflächen und Links sind zu klein oder liegen zu dicht beieinander, um sie auf dem Smartphone bequem mit dem Finger zu treffen. Besucher tippen daneben. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Dokunulan öğelere en az 24×24 piksel alan verin ve aralarında boşluk bırakın; menü ve altbilgi bağlantıları genelde bunun için büyütülmelidir.":
    "Geben Sie antippbaren Elementen mindestens 24×24 Pixel und lassen Sie Abstand dazwischen; Menü- und Footer-Links müssen meist größer werden.",
  "Başlık sırası tarayıcıda atlıyor (Lighthouse)":
    "Die Überschriftenfolge überspringt im Browser Ebenen (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra başlık düzeylerinin sırayla gitmediğini gördü (örneğin H2'den H4'e atlama). Ekran okuyucu kullananlar sayfada başlıklarla gezinir ve atlanan düzey yapıyı bozar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse hat festgestellt, dass die Überschriftenebenen nach dem Ausführen der Seite im Browser nicht der Reihe nach folgen (zum Beispiel ein Sprung von H2 zu H4). Screenreader-Nutzer navigieren über Überschriften, und eine übersprungene Ebene zerstört die Struktur. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Başlıkları sırayla kullanın (H1, H2, H3); bir başlığı yalnızca küçük görünsün diye alt düzeyden seçmeyin, boyutu CSS ile ayarlayın.":
    "Verwenden Sie Überschriften der Reihe nach (H1, H2, H3); wählen Sie keine tiefere Ebene, nur damit eine Überschrift klein aussieht, sondern legen Sie die Größe per CSS fest.",
  "Sayfa güvensiz (http) istekler yapıyor":
    "Die Seite stellt unsichere (http) Anfragen",
  'Lighthouse, sayfanın kendisinin ya da yüklediği bazı dosyaların şifresiz http ile geldiğini gördü. Tarayıcı bu istekleri engelleyebilir ya da "Güvenli değil" uyarısı gösterebilir. Hangi adreslerin güvensiz olduğu ayrıntıda yazar. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    "Lighthouse hat festgestellt, dass die Seite selbst oder einige der von ihr geladenen Dateien unverschlüsselt über http kommen. Der Browser blockiert diese Anfragen womöglich oder zeigt die Warnung „Nicht sicher“. Die Details zeigen, welche Adressen unsicher sind. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Sayfayı ve yüklediği tüm dosyaları https adresinden sunun; sayfadaki http:// ile başlayan dosya adreslerini https:// yapın.":
    "Liefern Sie die Seite und jede von ihr geladene Datei über https aus; ändern Sie Dateiadressen auf der Seite, die mit http:// beginnen, in https://.",
  "Sayfa açılırken tarayıcı hata kaydediyor":
    "Der Browser protokolliert beim Öffnen der Seite Fehler",
  "Sayfa açılırken tarayıcının konsoluna hata düştü: yüklenemeyen bir dosya, çalışırken çöken bir betik ya da engellenen bir istek. Bazıları ziyaretçiye görünmez, bazıları bir özelliğin çalışmadığını gösterir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Beim Öffnen der Seite erschienen Fehler in der Browserkonsole: eine Datei, die nicht geladen werden konnte, ein Skript, das bei der Ausführung abstürzte, oder eine blockierte Anfrage. Manche sind für Besucher unsichtbar, manche bedeuten, dass eine Funktion nicht funktioniert. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Sayfayı Chrome'da açıp geliştirici araçlarının Konsol sekmesine bakın; ayrıntıdaki adreslerden başlayarak hataları giderin.":
    "Öffnen Sie die Seite in Chrome und sehen Sie sich in den Entwicklertools den Tab „Console“ an; beginnen Sie bei den Adressen in den Details.",
  "Sayfa tarayıcıların kaldıracağı özellikler kullanıyor":
    "Die Seite nutzt Funktionen, die Browser entfernen",
  "Sayfa, Chrome'un kullanımdan kaldırdığı ya da kaldıracağı özellikleri kullanıyor. Şimdi çalışıyor olabilir ama bir tarayıcı güncellemesinden sonra bozulabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Die Seite nutzt Funktionen, die Chrome als veraltet markiert hat oder entfernen wird. Sie mag jetzt funktionieren, kann aber nach einem Browser-Update ausfallen. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "PageSpeed Insights raporundaki listeye bakın; genelde eski bir eklenti ya da kütüphanedir ve güncellemek yeterlidir.":
    "Sehen Sie sich die Liste im PageSpeed-Insights-Bericht an; meist ist es ein altes Plugin oder eine alte Bibliothek, und ein Update genügt.",
  "Tarayıcı sayfada sorunlar bildiriyor":
    "Der Browser meldet Probleme auf der Seite",
  "Chrome'un geliştirici araçlarındaki \"Sorunlar\" bölümü bu sayfa için kayıt tuttu: örneğin engellenen çerezler, güvenlik başlığı sorunları ya da hatalı kaynak istekleri. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Das Panel „Issues“ in den Chrome-Entwicklertools hat für diese Seite Einträge protokolliert, zum Beispiel blockierte Cookies, Probleme mit Sicherheits-Headern oder fehlerhafte Ressourcenanfragen. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  'Sayfayı Chrome\'da açıp geliştirici araçlarının "Issues" (Sorunlar) sekmesine bakın ve listelenen sorunları giderin.':
    "Öffnen Sie die Seite in Chrome, sehen Sie sich in den Entwicklertools den Tab „Issues“ an und beheben Sie die aufgeführten Probleme.",
  "Bazı görseller yanlış oranla gösteriliyor":
    "Einige Bilder werden im falschen Seitenverhältnis angezeigt",
  "Bazı görseller, kendi en-boy oranlarından farklı bir oranda gösterildiği için basık ya da uzamış görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Einige Bilder wirken gestaucht oder gestreckt, weil sie in einem anderen Verhältnis als ihrem eigenen Seitenverhältnis angezeigt werden. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Görselin width ve height değerlerini kendi oranına uygun verin ya da CSS'te object-fit kullanın.":
    "Geben Sie dem Bild Breiten- und Höhenwerte, die zu seinem Seitenverhältnis passen, oder verwenden Sie object-fit in CSS.",
  "Bazı görseller ekran için düşük çözünürlüklü":
    "Einige Bilder haben eine zu geringe Auflösung für den Bildschirm",
  "Bazı görseller, telefonun ekran yoğunluğuna göre gereğinden küçük çözünürlükte sunuluyor ve bulanık görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Einige Bilder werden mit geringerer Auflösung ausgeliefert, als die Pixeldichte des Smartphone-Bildschirms erfordert, und wirken unscharf. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Görsellerin daha büyük sürümlerini srcset ile sunun, böylece tarayıcı ekrana uygun olanı seçer.":
    "Liefern Sie mit srcset größere Versionen der Bilder, damit der Browser die passende für den Bildschirm wählt.",
  "Bazı bağlantılar taranamıyor (Lighthouse)":
    "Einige Links können nicht gecrawlt werden (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra Google'ın izleyemeyeceği bağlantılar buldu: geçerli bir href'i olmayan ya da yalnızca JavaScript ile çalışan bağlantılar. Google yalnızca href'i gerçek bir adres olan <a> bağlantılarını izler. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Nach dem Ausführen der Seite im Browser hat Lighthouse Links gefunden, denen Google nicht folgen kann: Links ohne gültiges href oder solche, die nur mit JavaScript funktionieren. Google folgt nur <a>-Links, deren href eine echte Adresse ist. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Her bağlantıyı href özniteliği gerçek bir adres olan bir <a> etiketi yapın; javascript: ya da yalnızca onclick ile çalışan bağlantıları değiştirin.":
    "Machen Sie jeden Link zu einem <a>-Tag mit einer echten Adresse im href; ersetzen Sie Links, die nur über javascript: oder onclick funktionieren.",
  "Bağlantı metinleri açıklayıcı değil (Lighthouse)":
    "Linktexte sind nicht aussagekräftig (Lighthouse)",
  'Bazı bağlantıların metni "buraya tıklayın" ya da "devamı" gibi gittiği yeri anlatmayan sözlerden oluşuyor. Google bağlantı metninden hedef sayfanın konusunu öğrenir. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    "Der Text einiger Links besteht aus Wörtern wie „hier klicken“ oder „mehr lesen“, die nicht sagen, wohin sie führen. Google erschließt das Thema der Zielseite aus dem Linktext. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  'Bağlantı metnini gittiği sayfanın konusunu anlatacak şekilde yazın, örneğin "devamı" yerine "kargo ücretleri".':
    "Schreiben Sie Linktexte, die das Thema der Zielseite beschreiben, zum Beispiel „Versandkosten“ statt „mehr lesen“.",
  "Google sayfayı dizine alamıyor (Lighthouse)":
    "Google kann die Seite nicht indexieren (Lighthouse)",
  "Tarayıcımız bu sayfayı dizine alınabilir gördü, ama Lighthouse'un ölçümünde Google'ın sayfayı dizine almasını engelleyen bir kural vardı (robots.txt, noindex etiketi ya da X-Robots-Tag başlığı). Kural yalnızca Google'a ya da yalnızca bazı ziyaretçilere gösteriliyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Unser Crawler hat diese Seite als indexierbar eingestuft, aber in der Lighthouse-Messung hinderte eine Regel Google daran, sie zu indexieren (robots.txt, ein noindex-Tag oder ein X-Robots-Tag-Header). Die Regel wird womöglich nur Google oder nur manchen Besuchern ausgeliefert. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Sayfanın aramada görünmesi gerekiyorsa robots.txt'teki ilgili Disallow satırını ve sayfadaki noindex kuralını kaldırın; sunucunun Googlebot'a farklı bir yanıt vermediğini kontrol edin.":
    "Soll die Seite in der Suche erscheinen, entfernen Sie die passende Disallow-Zeile aus der robots.txt und die noindex-Regel auf der Seite; prüfen Sie, dass der Server Googlebot nicht anders antwortet.",
  "robots.txt dosyasında geçersiz satırlar var":
    "robots.txt enthält ungültige Zeilen",
  "Lighthouse sitenin robots.txt dosyasında kurallara uymayan satırlar buldu. Google geçersiz satırları yok sayar, yani yazdığınız bir kural uygulanmıyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse hat in der robots.txt der Website Zeilen gefunden, die nicht den Regeln entsprechen. Google ignoriert ungültige Zeilen, daher wird eine von Ihnen geschriebene Regel womöglich nicht angewendet. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  'robots.txt\'i açın ve PageSpeed Insights raporunda gösterilen satırları düzeltin; her satır "Alan: değer" biçiminde olmalı (User-agent, Disallow, Allow, Sitemap).':
    "Öffnen Sie die robots.txt und korrigieren Sie die im PageSpeed-Insights-Bericht gezeigten Zeilen; jede Zeile sollte die Form „Feld: Wert“ haben (User-agent, Disallow, Allow, Sitemap).",
  "hreflang etiketleri geçersiz (Lighthouse)":
    "hreflang-Tags sind ungültig (Lighthouse)",
  "Lighthouse, sayfadaki dil sürümü (hreflang) etiketlerinde geçersiz bir dil kodu ya da göreli bir adres buldu. Google geçersiz hreflang etiketlerini yok sayar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse hat in den Sprachversions-Tags (hreflang) der Seite einen ungültigen Sprachcode oder eine relative Adresse gefunden. Google ignoriert ungültige hreflang-Tags. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Her hreflang değerinin geçerli bir dil kodu (tr, en-GB gibi) ve adresin tam adres (https:// ile başlayan) olduğundan emin olun.":
    "Achten Sie darauf, dass jeder hreflang-Wert ein gültiger Sprachcode ist (de, de-AT usw.) und die Adresse vollständig ist (beginnend mit https://).",
  "canonical etiketi geçersiz (Lighthouse)":
    "Das Canonical-Tag ist ungültig (Lighthouse)",
  "Lighthouse sayfanın canonical etiketini geçersiz buldu: birbiriyle çelişen birden çok adres, geçersiz bir adres, başka bir alan adına ya da sitenin ana sayfasına işaret eden bir adres olabilir. Google böyle bir canonical'ı yok sayabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse hat das Canonical-Tag der Seite als ungültig eingestuft: Es enthält womöglich mehrere widersprüchliche Adressen, eine ungültige Adresse oder eine Adresse auf einer anderen Domain bzw. die Startseite der Website. Google ignoriert ein solches Canonical womöglich. Dieser Befund stammt aus dem Lighthouse-Bericht, den PageSpeed Insights bei der Messung der mobilen Version der Seite erstellt hat.",
  "Sayfada tek bir canonical etiketi bırakın ve onu sayfanın kendi tam adresine (ya da gerçekten asıl olan sayfaya) yönlendirin.":
    "Behalten Sie ein einziges Canonical-Tag auf der Seite und lassen Sie es auf die vollständige eigene Adresse der Seite zeigen (oder auf die Seite, die tatsächlich das Original ist).",
  "Güvenli sayfada güvensiz görsel, video ya da çerçeve":
    "Unsicheres Bild, Video oder Frame auf einer sicheren Seite",
  'Güvenli (https) sayfa bir görseli, videoyu, sesi ya da gömülü çerçeveyi (iframe) şifresiz http adresinden yüklüyor. Tarayıcılar böyle görsel ve medyayı https\'e çevirmeyi dener, olmazsa göstermez; http çerçeveleri ise doğrudan engeller. Ziyaretçi boş bir alan ya da "Güvenli değil" uyarısı görebilir.':
    "Die sichere (https) Seite lädt ein Bild, Video, Audio oder einen eingebetteten Frame (iframe) von einer unverschlüsselten http-Adresse. Browser versuchen, solche Bilder und Medien auf https umzustellen, und zeigen sie nicht an, wenn das scheitert; http-Frames werden direkt blockiert. Der Besucher sieht womöglich eine leere Fläche oder die Warnung „Nicht sicher“.",
  "Ayrıntıdaki adresleri https:// ile başlayacak şekilde değiştirin. Dosya kendi sitenizdeyse adresi göreli (/resimler/...) yazmak da yeter.":
    "Ändern Sie die Adressen in den Details so, dass sie mit https:// beginnen. Liegt die Datei auf Ihrer eigenen Website, funktioniert auch eine relative Adresse (/images/...).",
  "Form bilgileri şifresiz gönderiliyor":
    "Formulardaten werden unverschlüsselt gesendet",
  "Güvenli (https) sayfadaki bir form, doldurulan bilgileri şifresiz bir http adresine gönderiyor. Tarayıcılar gönderimden önce ziyaretçiyi uyarır ve bilgiler yolda okunabilir.":
    "Ein Formular auf der sicheren (https) Seite sendet die Eingaben an eine unverschlüsselte http-Adresse. Browser warnen den Besucher vor dem Absenden, und die Daten können unterwegs mitgelesen werden.",
  "Formun action adresini https:// ile başlayacak şekilde değiştirin ya da formu aynı sitedeki göreli bir adrese gönderin.":
    "Ändern Sie die action-Adresse des Formulars so, dass sie mit https:// beginnt, oder senden Sie das Formular an eine relative Adresse auf derselben Website.",
  "Sayfa meta refresh ile yönlendiriyor":
    "Die Seite leitet per Meta-Refresh weiter",
  'Sayfa, sunucu yönlendirmesi yerine HTML içindeki <meta http-equiv="refresh"> etiketiyle başka bir adrese gönderiyor. Google bunu anlar, ama sunucu tarafında bir 301 yönlendirmesini tercih eder; ziyaretçi de yönlendirmeden önce boş bir sayfa görebilir.':
    'Die Seite schickt Besucher mit einem <meta http-equiv="refresh">-Tag im HTML statt mit einer Server-Weiterleitung an eine andere Adresse. Google versteht das, bevorzugt aber eine serverseitige 301-Weiterleitung; der Besucher sieht vor der Weiterleitung womöglich eine leere Seite.',
  "Mümkünse yönlendirmeyi sunucuda (301 ya da 308) yapın ve meta refresh etiketini kaldırın.":
    "Leiten Sie wenn möglich auf dem Server weiter (301 oder 308) und entfernen Sie das Meta-Refresh-Tag.",
  "canonical adresi göreli yazılmış":
    "Die Canonical-Adresse ist relativ angegeben",
  "Sayfanın canonical etiketi tam adres yerine göreli bir yol (örneğin /urun) gösteriyor. Google göreli adresi çözebilir, ama tam adres kullanılmasını önerir; göreli yol, sayfa farklı bir adresten açıldığında yanlış yere işaret edebilir.":
    "Das Canonical-Tag der Seite zeigt einen relativen Pfad (zum Beispiel /produkt) statt einer vollständigen Adresse. Google kann relative Adressen auflösen, empfiehlt aber vollständige; ein relativer Pfad kann an die falsche Stelle zeigen, wenn die Seite unter einer anderen Adresse geöffnet wird.",
  "canonical adresini https:// ile başlayan tam adres olarak yazın.":
    "Geben Sie die Canonical-Adresse vollständig an, beginnend mit https://.",
  "canonical adresinde # parçası var":
    "Die Canonical-Adresse enthält ein #-Fragment",
  "Sayfanın canonical adresi # ile başlayan bir parça içeriyor. Google adresin # sonrasını dikkate almaz, bu yüzden bu parça bir işe yaramaz ve genelde bir şablon hatasının işaretidir.":
    "Die Canonical-Adresse der Seite enthält ein Fragment, das mit # beginnt. Google ignoriert alles nach dem #, daher bewirkt das Fragment nichts und deutet meist auf einen Fehler in der Vorlage hin.",
  "canonical adresinden # ve sonrasını kaldırın.":
    "Entfernen Sie das # und alles danach aus der Canonical-Adresse.",
  "canonical etiketi sayfanın gövdesinde":
    "Das Canonical-Tag steht im Seitenkörper",
  "Sayfanın tek canonical etiketi <head> bölümünde değil, <body> içinde. Google canonical etiketini yalnızca <head> içinde okur; gövdedeki etiket yok sayılır, yani sayfanın aslında canonical'ı yok.":
    "Das einzige Canonical-Tag der Seite steht im <body>, nicht im <head>-Bereich. Google liest das Canonical-Tag nur im <head>; das im Body wird ignoriert, die Seite hat also faktisch kein Canonical.",
  "canonical etiketini sayfanın <head> bölümüne taşıyın. Genelde bir eklentinin ya da şablonun etiketi yanlış yere yazmasından olur.":
    "Verschieben Sie das Canonical-Tag in den <head>-Bereich der Seite. Meist schreibt ein Plugin oder eine Vorlage das Tag an die falsche Stelle.",
  "robots etiketleri birbiriyle çelişiyor": "Robots-Tags widersprechen sich",
  "Sayfada birden fazla robots etiketi var ve biri izin verirken diğeri yasaklıyor (örneğin biri index, diğeri noindex). Google böyle bir çelişkide daha kısıtlayıcı olan kuralı uygular; yani sayfa büyük olasılıkla istediğinizden farklı işlenir.":
    "Die Seite hat mehr als ein Robots-Tag, und eines erlaubt, was ein anderes verbietet (zum Beispiel sagt eines index, ein anderes noindex). Bei einem solchen Konflikt wendet Google die strengere Regel an, die Seite wird also vermutlich anders behandelt, als Sie möchten.",
  "Sayfada tek bir robots etiketi bırakın. Genelde bir SEO eklentisi ile temanın aynı etiketi ayrı ayrı yazmasından olur.":
    "Behalten Sie ein einziges Robots-Tag auf der Seite. Meist schreiben ein SEO-Plugin und das Theme jeweils dasselbe Tag.",
  "Aramada sayfanın özeti gösterilmiyor":
    "Die Suche zeigt kein Snippet der Seite",
  "Sayfa dizine alınabilir, ama nosnippet ya da max-snippet:0 kuralı Google'ın arama sonucunda sayfanın metninden özet göstermesini engelliyor. Özetsiz bir sonuç daha az tıklanır. Bilerek yapılmış olabilir.":
    "Die Seite kann indexiert werden, aber eine nosnippet- oder max-snippet:0-Regel hindert Google daran, in den Suchergebnissen einen Textauszug der Seite zu zeigen. Ein Ergebnis ohne Snippet wird seltener angeklickt. Das kann gewollt sein.",
  "Bilerek değilse robots etiketinden ya da X-Robots-Tag başlığından nosnippet ve max-snippet:0 kuralını kaldırın.":
    "Ist es nicht gewollt, entfernen Sie nosnippet und max-snippet:0 aus dem Robots-Tag oder dem X-Robots-Tag-Header.",
  'Sayfa "bulunamadı" diyor ama başarılı yanıt veriyor':
    "Die Seite meldet „nicht gefunden“, antwortet aber erfolgreich",
  'Sayfanın başlığı ya da ana başlığı "404" ya da "sayfa bulunamadı" diyor, ama sunucu 200 (başarılı) kodu döndürüyor. Google böyle sayfaları "soft 404" sayar ve dizine almaz; ama taramaya zaman harcar ve gerçek bir hata sayfası olduğunu anlamakta gecikebilir.':
    "Titel oder Hauptüberschrift der Seite lauten „404“ oder „Seite nicht gefunden“, aber der Server liefert den Code 200 (Erfolg). Google behandelt solche Seiten als „Soft 404“ und indexiert sie nicht, verbraucht aber Crawling-Zeit dafür und erkennt womöglich erst spät, dass es eine Fehlerseite ist.",
  "Sayfa gerçekten yoksa sunucunun 404 ya da 410 kodu döndürmesini sağlayın. Varsa başlığını ve içeriğini düzeltin.":
    "Existiert die Seite tatsächlich nicht, lassen Sie den Server den Code 404 oder 410 liefern. Existiert sie, korrigieren Sie Titel und Inhalt.",
  "Sayfada yer tutucu metin (lorem ipsum) kalmış":
    "Platzhaltertext (Lorem ipsum) ist auf der Seite stehen geblieben",
  'Sayfanın görünen metninde "lorem ipsum" yer tutucu metni var. Tasarım aşamasından kalmış ve yayına unutulmuş içerik, ziyaretçiye ve Google\'a sayfanın bitmediğini söyler.':
    "Der sichtbare Text der Seite enthält den Platzhalter „Lorem ipsum“. Inhalt, der aus der Designphase übrig geblieben und versehentlich veröffentlicht wurde, zeigt Besuchern und Google, dass die Seite nicht fertig ist.",
  "Yer tutucu metni gerçek içerikle değiştirin ya da o bölümü kaldırın.":
    "Ersetzen Sie den Platzhaltertext durch echten Inhalt oder entfernen Sie den Abschnitt.",
  "E-posta adresi düz metin olarak açıkta":
    "Eine E-Mail-Adresse steht offen als Text da",
  "Sayfada düz metin ya da mailto bağlantısı olarak bir e-posta adresi var. Spam gönderenlerin botları sayfaları bu adresler için tarar. Ziyaretçinin size ulaşması için gerekliyse sorun değildir.":
    "Die Seite enthält eine E-Mail-Adresse als reinen Text oder als mailto-Link. Spam-Bots durchsuchen Seiten nach solchen Adressen. Das ist kein Problem, wenn Besucher Sie darüber erreichen sollen.",
  "İletişim için bir form kullanmayı düşünün ya da adresi spam filtresi güçlü bir kutuya yönlendirin.":
    "Erwägen Sie ein Kontaktformular oder leiten Sie die Adresse an ein Postfach mit starkem Spamfilter.",
  "Başlıktaki kelimeler sayfa içeriğinde geçmiyor":
    "Die Wörter des Titels kommen im Seiteninhalt nicht vor",
  "Sayfa başlığındaki (title) anlamlı kelimelerin hiçbiri ana başlıkta ya da sayfa metninde geçmiyor. Google başlığın sayfayı anlatıp anlatmadığına bakar; içerikle ilgisi olmayan bir başlığı arama sonucunda başka bir metinle değiştirebilir. Bu bir tahmindir: eş anlamlı kelimeler sayılmaz.":
    "Keines der aussagekräftigen Wörter im Seitentitel kommt in der Hauptüberschrift oder im Text der Seite vor. Google prüft, ob ein Titel die Seite beschreibt, und ersetzt einen Titel ohne Bezug zum Inhalt in den Suchergebnissen womöglich durch anderen Text. Das ist eine Heuristik: Synonyme werden nicht berücksichtigt.",
  "Başlığı sayfanın gerçekten anlattığı konuya göre yazın ya da başlıktaki ana kelimeyi ana başlıkta ve ilk paragrafta kullanın.":
    "Formulieren Sie den Titel um das, worum es auf der Seite wirklich geht, oder verwenden Sie das Hauptwort des Titels in der Hauptüberschrift und im ersten Absatz.",
  "Kuruluş yapısal verisinde sosyal profiller yok":
    "Strukturierte Daten zur Organisation nennen keine Social-Media-Profile",
  "Sayfadaki Organization yapısal verisinde sameAs özelliği yok. sameAs, kuruluşunuzun resmi sosyal medya ve kayıt profillerini (LinkedIn, Wikipedia gibi) gösterir; Google kuruluşu tanırken bu bağlantıları kullanır. Google bunu önerir, zorunlu tutmaz.":
    "Die strukturierten Organization-Daten der Seite haben keine sameAs-Eigenschaft. sameAs listet die offiziellen Social-Media- und Registerprofile Ihrer Organisation auf (LinkedIn, Wikipedia usw.); Google erkennt die Organisation anhand dieser Links. Google empfiehlt die Angabe, verlangt sie aber nicht.",
  'Organization yapısal verisine sameAs ekleyin ve içine resmi profil adreslerinizi liste olarak yazın, örneğin "sameAs": ["https://www.linkedin.com/company/..."].':
    'Ergänzen Sie in den strukturierten Organization-Daten sameAs mit Ihren offiziellen Profiladressen als Liste, zum Beispiel "sameAs": ["https://www.linkedin.com/company/..."].',
  "Derindeki sayfada içerik yolu (breadcrumb) yok":
    "Einer tief liegenden Seite fehlt die Breadcrumb-Navigation",
  "Ana sayfadan en az üç tıklama uzaktaki bu sayfada ne bir içerik yolu (breadcrumb) gezinmesi ne de BreadcrumbList yapısal verisi var. İçerik yolu ziyaretçiye nerede olduğunu gösterir; Google da arama sonucunda adres yerine bu yolu gösterebilir.":
    "Diese Seite, mindestens drei Klicks von der Startseite entfernt, hat weder eine Breadcrumb-Navigation noch strukturierte BreadcrumbList-Daten. Eine Breadcrumb zeigt Besuchern, wo sie sind, und Google kann sie in den Suchergebnissen statt der Adresse anzeigen.",
  "Sayfanın üstüne Ana sayfa > Kategori > Sayfa biçiminde bir içerik yolu ekleyin ve BreadcrumbList yapısal verisiyle işaretleyin. Çoğu SEO eklentisi ikisini birlikte ekler.":
    "Ergänzen Sie oben auf der Seite eine Breadcrumb-Navigation wie Startseite > Kategorie > Seite und zeichnen Sie sie mit strukturierten BreadcrumbList-Daten aus. Die meisten SEO-Plugins fügen beides zusammen hinzu.",
  "Sayfalamanın devam sayfası aramadan gizlenmiş":
    "Eine Folgeseite einer paginierten Liste ist von der Suche ausgeschlossen",
  "Bir listenin 2. ya da sonraki sayfası noindex ile aramadan gizlenmiş. Google'ın sayfalama rehberi her sayfanın kendi adresiyle dizine girebilmesini önerir. Uzun süre noindex kalan bir sayfadaki bağlantıları Google zamanla izlemeyi bırakabilir; o zaman yalnızca bu sayfalardan bağlantı alan ürün ya da yazılar bulunmaz olur.":
    "Seite 2 oder eine spätere Seite einer Liste ist mit noindex von der Suche ausgeschlossen. Googles Empfehlungen zur Paginierung sehen vor, dass jede Seite unter ihrer eigenen Adresse indexiert werden kann. Bleibt eine Seite lange auf noindex, folgt Google ihren Links womöglich irgendwann nicht mehr; Produkte oder Beiträge, die nur von diesen Seiten verlinkt sind, werden dann nicht gefunden.",
  "Sayfalama sayfalarından noindex'i kaldırın ve her birine kendi adresini canonical olarak verin.":
    "Entfernen Sie noindex von den paginierten Seiten und geben Sie jeder ihre eigene Adresse als Canonical.",
  "Güvenli sitede iç bağlantılar http adresine gidiyor":
    "Auf einer sicheren Website führen interne Links zu http-Adressen",
  "Site https ile çalışıyor, ama bu sayfadaki bazı bağlantılar sitenin kendi sayfalarına http:// ile veriliyor. Her tıklama önce bir yönlendirmeden geçer ya da ziyaretçi güvensiz sürüme düşer; Google da aynı sayfanın iki adresini görür.":
    "Die Website läuft über https, aber einige Links auf dieser Seite zeigen mit http:// auf eigene Seiten der Website. Jeder Klick geht erst über eine Weiterleitung oder landet auf der unsicheren Version, und Google sieht zwei Adressen für dieselbe Seite.",
  "Şablondaki ve içerikteki iç bağlantıları https:// ile ya da göreli (/sayfa) olarak yazın. Veritabanında eski http adreslerini toplu değiştirmek genelde en hızlı yoldur.":
    "Schreiben Sie interne Links in Vorlagen und Inhalten mit https:// oder relativ (/seite). Alte http-Adressen gesammelt in der Datenbank zu ersetzen, ist meist der schnellste Weg.",
  "Sayfanın içine gömülü kod çok büyük":
    "Der in die Seite eingebettete Code ist sehr groß",
  "Sayfanın HTML'ine doğrudan gömülmüş betik ve stil kodu 100 KB'ı geçiyor. Gömülü kod tarayıcı önbelleğinde saklanmaz ve her sayfa açılışında yeniden indirilir; sayfa da ilk içeriği göstermeden önce bu kodu okumak zorunda kalır.":
    "Direkt im HTML der Seite eingebetteter Skript- und Style-Code überschreitet 100 KB. Eingebetteter Code wird nicht im Browser-Cache gehalten und bei jedem Seitenaufruf neu geladen; außerdem muss die Seite ihn lesen, bevor sie den ersten Inhalt zeigt.",
  "Büyük gömülü betik ve stilleri ayrı dosyalara taşıyın; yalnızca ilk ekran için gereken küçük CSS'i gömülü bırakın.":
    "Verschieben Sie große eingebettete Skripte und Styles in eigene Dateien; eingebettet bleibt nur das kleine CSS, das der erste Bildschirm braucht.",
  "Blog var ama RSS/Atom akışı bildirilmemiş":
    "Es gibt einen Blog, aber keinen deklarierten RSS-/Atom-Feed",
  "Sitede yazı (Article, BlogPosting) olarak işaretlenmiş sayfalar var, ama taranan hiçbir sayfa bir RSS ya da Atom akışı bildirmiyor. Akış, okuyucuların ve haber toplayıcıların yeni yazılarınızı izlemesini sağlar; Google da yeni içeriği daha çabuk keşfedebilir.":
    "Die Website hat Seiten, die als Beiträge ausgezeichnet sind (Article, BlogPosting), aber keine gecrawlte Seite deklariert einen RSS- oder Atom-Feed. Mit einem Feed können Leser und Nachrichten-Aggregatoren Ihren neuen Beiträgen folgen, und Google entdeckt neue Inhalte womöglich schneller.",
  'Bir RSS ya da Atom akışı yayınlayın ve sayfaların <head> bölümüne <link rel="alternate" type="application/rss+xml" href="/feed"> ile bildirin. Çoğu blog altyapısında akış hazırdır, yalnızca etiketin eklenmesi gerekir.':
    'Veröffentlichen Sie einen RSS- oder Atom-Feed und deklarieren Sie ihn im <head> der Seiten mit <link rel="alternate" type="application/rss+xml" href="/feed">. Die meisten Blog-Plattformen haben bereits einen Feed; nur das Tag fehlt noch.',
  "Başka bir siteye verilen bağlantı kırık":
    "Ein Link zu einer anderen Website ist defekt",
  "Bu sayfadaki bir bağlantı başka bir sitede açılmayan bir adrese gidiyor: adres 404 ya da başka bir hata veriyor, ya da alan adı artık yok. Ziyaretçi bir hata sayfasına düşer ve sayfanız bakımsız görünür. Botlara kapalı siteler (sosyal ağlar gibi) ve yanıt vermeyen adresler kırık sayılmaz, kontrol edilmemiş sayılır.":
    "Ein Link auf dieser Seite führt zu einer Adresse auf einer anderen Website, die sich nicht öffnet: Die Adresse liefert 404 oder einen anderen Fehler, oder die Domain existiert nicht mehr. Der Besucher landet auf einer Fehlerseite, und Ihre Seite wirkt vernachlässigt. Websites, die Bots sperren (etwa soziale Netzwerke), und Adressen, die nicht antworten, gelten nicht als defekt, sondern als nicht geprüft.",
  "Bağlantıyı hedefin yeni adresine güncelleyin ya da kaldırın. Ayrıntıda hangi adresin hangi yanıtı verdiği yazar.":
    "Aktualisieren Sie den Link auf die neue Adresse des Ziels oder entfernen Sie ihn. Die Details zeigen, welche Adresse welche Antwort lieferte.",
  "Görsel dosyası çok büyük": "Bilddatei ist zu groß",
  "Sayfadaki bir ya da daha fazla görsel dosyası 200 KB'tan büyük (ayrıntıda 500 KB'ı geçenler ayrıca sayılır). Boyut, dosyanın kendisine istek gönderilerek ölçüldü. Büyük görseller özellikle mobil bağlantıda sayfayı yavaşlatır.":
    "Eine oder mehrere Bilddateien auf der Seite sind größer als 200 KB (Dateien über 500 KB werden in den Details gesondert gezählt). Die Größe wurde durch Abruf der Datei selbst gemessen. Große Bilder verlangsamen die Seite, besonders über Mobilverbindungen.",
  "Görseli gösterildiği boyuta küçültün, sıkıştırın ve WebP ya da AVIF biçimine çevirin. Çoğu fotoğraf bu işlemden sonra 100 KB'ın altına iner.":
    "Bringen Sie das Bild auf seine Anzeigegröße, komprimieren Sie es und wandeln Sie es in WebP oder AVIF um. Die meisten Fotos liegen danach unter 100 KB.",
  "Dış bağlantıları ve görsel boyutlarını da kontrol et":
    "Auch ausgehende Links und Bildgrößen prüfen",
  "Dış kontroller": "Externe Prüfungen",
  "Tarama bittikten sonra başka sitelere verilen bağlantıların açılıp açılmadığına ve sitenizdeki görsel dosyalarının boyutuna bakar. En çok 300 adres sorulur; sosyal ağlar gibi botları engelleyen siteler atlanır.":
    "Prüft nach dem Crawl, ob Links zu anderen Websites noch funktionieren, und misst die Bilddateien Ihrer Website. Höchstens 300 Adressen werden abgerufen; Websites, die Bots sperren, etwa soziale Netzwerke, werden übersprungen.",
  "Site hem www ile hem www'siz açılıyor":
    "Website öffnet sich mit und ohne www",
  "Sitenizin www'li ve www'siz adresi ikisi de sayfayı açıyor; biri ötekine yönlendirmiyor. Google bunları aynı içeriğin iki kopyası olarak görür, hangisini göstereceğini kendisi seçer ve bağlantıların değeri iki adres arasında bölünebilir.":
    "Sowohl die www- als auch die Adresse ohne www Ihrer Website liefern die Seite aus; keine leitet auf die andere weiter. Google sieht darin zwei Kopien desselben Inhalts, wählt selbst aus, welche angezeigt wird, und der Wert von Links kann sich auf beide Adressen verteilen.",
  'Bir adresi asıl seçin (genelde zaten kullandığınız) ve ötekinden ona kalıcı (301) yönlendirme verin. Barındırma panellerinde bu genelde "www\'ye yönlendir" ya da "www\'siz adrese yönlendir" ayarıdır.':
    "Wählen Sie eine Adresse als Hauptadresse (meist die, die Sie bereits verwenden), und leiten Sie die andere dauerhaft (301) dorthin weiter. In Hosting-Panels heißt das meist „auf www weiterleiten“ bzw. „auf ohne www weiterleiten“.",
  "Var olmayan sayfa 404 yerine 200 dönüyor":
    "Fehlende Seite liefert 200 statt 404",
  'Sitede olmayan rastgele bir adres istedik, sunucu "bulunamadı" (404) yerine "tamam" (200) yanıtı verdi. Google bunu yumuşak 404 sayar: silinen ya da yanlış yazılan adresler gerçek sayfa gibi görünür, tarama boşa gider ve boş sayfalar dizine girebilir.':
    "Wir haben eine zufällige, nicht existierende Adresse der Website abgerufen, und der Server antwortete mit „OK“ (200) statt „nicht gefunden“ (404). Google wertet das als Soft 404: Gelöschte oder vertippte Adressen sehen wie echte Seiten aus, Crawling wird verschwendet, und leere Seiten können indexiert werden.",
  'Sitenizin hata sayfası ayarını kontrol edin: olmayan adresler için 404 durum kodu dönmeli. İçerik yönetim sisteminizde "özel 404 sayfası" varsa sayfanın içeriği aynı kalabilir, yalnızca durum kodu 404 olmalı.':
    "Prüfen Sie die Einstellung für die Fehlerseite Ihrer Website: Nicht existierende Adressen müssen den Statuscode 404 liefern. Hat Ihr CMS eine „eigene 404-Seite“, kann deren Inhalt bleiben; nur der Statuscode muss 404 sein.",
  "Var olmayan sayfalar ana sayfaya yönlendiriliyor":
    "Fehlende Seiten leiten auf die Startseite weiter",
  "Sitede olmayan rastgele bir adres istedik, sunucu bizi ana sayfaya yönlendirdi. Google bunu genelde yumuşak 404 sayar ve yönlendirmeyi yok sayar; ziyaretçi de aradığını bulamadığını anlamadan ana sayfaya düşer.":
    "Wir haben eine zufällige, nicht existierende Adresse der Website abgerufen, und der Server hat uns auf die Startseite weitergeleitet. Google wertet das meist als Soft 404 und ignoriert die Weiterleitung; Besucher landen auf der Startseite, ohne zu merken, dass es das Gesuchte nicht gibt.",
  "Olmayan adreslerde 404 dönen, arama kutusu ya da önemli bağlantılar içeren bir hata sayfası gösterin. Yalnızca taşınan sayfaları yeni adreslerine yönlendirin.":
    "Zeigen Sie für nicht existierende Adressen eine Fehlerseite, die 404 liefert und ein Suchfeld oder wichtige Links anbietet. Leiten Sie nur Seiten weiter, die tatsächlich an eine neue Adresse umgezogen sind.",
  "Site simgesi (favicon) bulunamadı":
    "Website-Symbol (Favicon) nicht gefunden",
  "Sayfada bir site simgesi tanımlanmamış ve /favicon.ico adresi de bir simge döndürmüyor (ya da tanımlanan simge açılmıyor). Google mobil arama sonuçlarında sitenizin adının yanında bu simgeyi gösterir; yoksa genel bir simge çıkar ve sonuç daha az fark edilir.":
    "Die Seite deklariert kein Website-Symbol, und auch /favicon.ico liefert keines (oder das deklarierte Symbol lädt nicht). Google zeigt dieses Symbol in den mobilen Suchergebnissen neben dem Namen Ihrer Website; ohne es erscheint ein allgemeines Symbol, und das Ergebnis fällt weniger auf.",
  'En az 48x48 piksellik kare bir simge hazırlayın, sitenize yükleyin ve sayfaların <head> bölümüne `<link rel="icon" href="/favicon.ico">` ekleyin. Site oluşturucularda bu genelde "site simgesi" ayarıdır.':
    'Erstellen Sie ein quadratisches Symbol von mindestens 48x48 Pixeln, laden Sie es auf Ihre Website hoch und ergänzen Sie `<link rel="icon" href="/favicon.ico">` im <head> Ihrer Seiten. In Website-Baukästen ist das meist die Einstellung „Website-Symbol“.',
  "robots.txt tüm siteyi Google'a kapatıyor":
    "robots.txt sperrt die ganze Website für Google",
  "robots.txt dosyanız Googlebot'un ana sayfayı taramasını yasaklıyor (genelde `Disallow: /` satırı). Google sitenizi taramaz; sayfalar arama sonuçlarından zamanla düşer ya da açıklamasız görünür. Çoğu zaman geliştirme sırasında konup unutulmuş bir kuraldır.":
    "Ihre robots.txt verbietet Googlebot das Crawlen der Startseite (meist eine Zeile `Disallow: /`). Google crawlt Ihre Website nicht; Seiten fallen mit der Zeit aus der Suche oder erscheinen ohne Beschreibung. Oft ist es eine Regel aus der Entwicklungsphase, die vergessen wurde.",
  "robots.txt'teki `Disallow: /` satırını kaldırın ya da yalnızca gizli kalması gereken klasörlerle sınırlayın. Sonra Search Console'daki robots.txt raporundan Google'ın yeni dosyayı okuduğunu kontrol edin.":
    "Entfernen Sie die Zeile `Disallow: /` aus der robots.txt oder beschränken Sie sie auf die Ordner, die verborgen bleiben müssen. Prüfen Sie anschließend im robots.txt-Bericht von Search Console, dass Google die neue Datei gelesen hat.",
  "robots.txt site haritasını göstermiyor":
    "robots.txt verweist nicht auf die Sitemap",
  "robots.txt dosyanızda `Sitemap:` satırı yok. Arama motorları site haritasını bu satırdan da bulur; Search Console'a gönderdiyseniz Google için sorun değildir, ama Bing ve diğer tarayıcılar için en kolay yoldur.":
    "Ihre robots.txt hat keine `Sitemap:`-Zeile. Suchmaschinen finden die Sitemap auch über diese Zeile; haben Sie sie in Search Console eingereicht, ist das für Google kein Problem, für Bing und andere Crawler ist es aber der einfachste Weg.",
  "robots.txt'in sonuna site haritanızın tam adresiyle bir satır ekleyin, örneğin `Sitemap: https://alanadiniz.com/sitemap.xml`.":
    "Ergänzen Sie am Ende der robots.txt eine Zeile mit der vollständigen Adresse Ihrer Sitemap, zum Beispiel `Sitemap: https://ihredomain.de/sitemap.xml`.",
  "Bazı yapay zekâ tarayıcıları robots.txt ile engellenmiş":
    "Einige KI-Crawler werden per robots.txt blockiert",
  "robots.txt dosyanız bazı yapay zekâ tarayıcılarının (örneğin GPTBot, ClaudeBot, PerplexityBot) sitenizi taramasını yasaklıyor. Bu bir tercih: içeriğinizin yapay zekâ eğitiminde kullanılmasını istemiyorsanız doğrudur. Ama bu asistanların arama ve yanıt özelliklerinde sitenizin görünmesini de azaltabilir. Google araması etkilenmez.":
    "Ihre robots.txt verbietet einigen KI-Crawlern (zum Beispiel GPTBot, ClaudeBot, PerplexityBot), Ihre Website zu crawlen. Das ist eine Entscheidung: richtig, wenn Ihre Inhalte nicht für KI-Training genutzt werden sollen. Es kann aber auch dazu führen, dass Ihre Website seltener in den Such- und Antwortfunktionen dieser Assistenten erscheint. Die Google-Suche ist nicht betroffen.",
  "Bilerek engellediyseniz bir şey yapmanıza gerek yok. Yapay zekâ yanıtlarında görünmek istiyorsanız arama amaçlı tarayıcılara (OAI-SearchBot, Claude-SearchBot, PerplexityBot gibi) izin verip yalnızca eğitim tarayıcılarını (GPTBot, ClaudeBot, Google-Extended gibi) engelleyebilirsiniz.":
    "Haben Sie sie absichtlich blockiert, ist nichts zu tun. Wollen Sie in KI-Antworten erscheinen, können Sie die Such-Crawler (etwa OAI-SearchBot, Claude-SearchBot, PerplexityBot) erlauben und nur die Trainings-Crawler (etwa GPTBot, ClaudeBot, Google-Extended) blockieren.",
  "llms.txt dosyası yok (isteğe bağlı)": "Keine llms.txt-Datei (optional)",
  "Sitenizin kökünde llms.txt dosyası yok. Bu dosya yapay zekâ asistanlarına sitenin önemli sayfalarını kısa bir listeyle anlatmak için önerilen yeni bir biçimdir. Henüz bir standart değildir ve Google bunu kullanmaz; yoksa bir sorun yoktur.":
    "Im Stammverzeichnis Ihrer Website gibt es keine llms.txt-Datei. Diese Datei ist ein neu vorgeschlagenes Format, um KI-Assistenten die wichtigen Seiten einer Website in einer kurzen Liste zu beschreiben. Es ist noch kein Standard, und Google nutzt es nicht; das Fehlen ist kein Problem.",
  "İsterseniz sitenizin kökünde /llms.txt adresine, sitenin ne olduğunu bir paragrafta anlatan ve önemli sayfalarınızı bağlantılarıyla listeleyen düz metin (Markdown) bir dosya koyun.":
    "Wenn Sie möchten, legen Sie unter /llms.txt im Stammverzeichnis Ihrer Website eine Textdatei (Markdown) ab, die die Website in einem Absatz beschreibt und Ihre wichtigen Seiten mit Links aufführt.",
  "Başlangıç sayfasının HTML'i 2 MB'tan büyük":
    "HTML der Startseite ist größer als 2 MB",
  "Başlangıç sayfasının HTML'i 2 MB'ı aşıyor. Google bir HTML dosyasının yalnızca ilk 2 MB'ını işler; sonrasındaki içerik ve bağlantılar Google için yok sayılır. Büyük HTML ayrıca yavaş mobil bağlantılarda sayfayı geciktirir.":
    "Das HTML der Startseite überschreitet 2 MB. Google verarbeitet nur die ersten 2 MB einer HTML-Datei; Inhalte und Links danach ignoriert Google. Großes HTML verlangsamt die Seite außerdem über langsame Mobilverbindungen.",
  "HTML'in içine gömülü büyük verileri (satır içi görseller, büyük JSON, tekrar eden menüler) ayrı dosyalara taşıyın. Uzun listeleri sayfalara bölün.":
    "Verschieben Sie große, im HTML eingebettete Daten (Inline-Bilder, großes JSON, wiederholte Menüs) in eigene Dateien. Teilen Sie lange Listen auf mehrere Seiten auf.",
  "Başlangıç sayfası sıkıştırılmadan geldi": "Startseite kam unkomprimiert an",
  "Denetim başlangıç sayfasını gzip ve brotli kabul ettiğini söyleyerek istedi, ama yanıtta Content-Encoding başlığı yoktu: sayfa sıkıştırılmadan geldi. Sıkıştırma HTML'i genelde 4-5 kat küçültür ve sayfayı hızlandırır. Bazı ara sunucular ve CDN'ler sıkıştırmayı yalnızca tarayıcılara uyguladığı için tarayıcıda da doğrulayın.":
    "Das Audit hat die Startseite mit dem Hinweis angefordert, dass gzip und brotli akzeptiert werden, aber die Antwort hatte keinen Content-Encoding-Header: Die Seite kam unkomprimiert an. Komprimierung verkleinert HTML meist um das 4- bis 5-Fache und beschleunigt die Seite. Manche Proxys und CDNs komprimieren nur für Browser; prüfen Sie es daher auch im Browser.",
  "Sunucunuzda ya da CDN'de gzip veya brotli sıkıştırmayı açın. Sonucu tarayıcının geliştirici araçlarında, yanıt başlıklarında `content-encoding` satırına bakarak doğrulayın.":
    "Aktivieren Sie gzip- oder brotli-Komprimierung auf Ihrem Server oder CDN. Prüfen Sie das Ergebnis in den Entwicklertools des Browsers anhand der Zeile `content-encoding` in den Antwort-Headern.",
  "Sunucu ilk yanıtı geç veriyor (TTFB)":
    "Server sendet die erste Antwort langsam (TTFB)",
  "Başlangıç sayfasının ilk baytı 800 milisaniyeden geç geldi; web.dev bu sınırın altını önerir. Sunucu yanıtı geç başlarsa sayfadaki her şey o kadar geç başlar. Süre, denetimi çalıştıran bilgisayardan iki ayrı istekle ölçülür ve hızlı olanı esas alınır; yine de ağa göre değişebilir.":
    "Das erste Byte der Startseite kam nach mehr als 800 Millisekunden an; web.dev empfiehlt, darunter zu bleiben. Beginnt die Serverantwort spät, beginnt alles auf der Seite entsprechend später. Die Zeit wird mit zwei getrennten Anfragen vom Computer aus gemessen, auf dem das Audit läuft, und die schnellere zählt; sie kann dennoch je nach Netzwerk schwanken.",
  "Sayfa önbelleğini açın, yavaş veritabanı sorgularını ve eklentileri bulun, ziyaretçilerinize yakın bir CDN kullanın. Sorun sürerse barındırma paketinizi gözden geçirin.":
    "Aktivieren Sie Seiten-Caching, suchen Sie langsame Datenbankabfragen und Plugins und nutzen Sie ein CDN in der Nähe Ihrer Besucher. Besteht das Problem weiter, prüfen Sie Ihren Hosting-Tarif.",
  "http adresi https'e yönlendirilmiyor":
    "http-Adresse leitet nicht auf https weiter",
  'Sitenizin http:// ile başlayan adresi şifreli https sürümüne yönlendirmiyor, sayfayı düz http ile açıyor. Ziyaretçi adresi elle yazdığında ya da eski bir bağlantıdan geldiğinde güvenli olmayan sürümde kalır ve tarayıcı "Güvenli değil" uyarısı gösterir. Google da aynı içeriğin iki sürümünü görür.':
    "Die http://-Adresse Ihrer Website leitet nicht auf die verschlüsselte https-Version weiter, sondern öffnet die Seite über einfaches http. Wer die Adresse von Hand eintippt oder über einen alten Link kommt, bleibt auf der unsicheren Version, und der Browser zeigt die Warnung „Nicht sicher“. Google sieht außerdem zwei Versionen desselben Inhalts.",
  'Sunucunuzda ya da barındırma panelinizde "HTTPS\'e zorla" ayarını açın; yoksa tüm http isteklerini aynı adresin https karşılığına kalıcı (301) yönlendiren bir kural ekleyin.':
    "Aktivieren Sie die Einstellung „HTTPS erzwingen“ auf Ihrem Server oder im Hosting-Panel; andernfalls ergänzen Sie eine Regel, die jede http-Anfrage dauerhaft (301) auf die https-Entsprechung derselben Adresse weiterleitet.",
  "HSTS başlığı yok": "Kein HSTS-Header",
  'Sayfa https ile açılıyor ama Strict-Transport-Security (HSTS) başlığı göndermiyor. Bu başlık tarayıcıya "bu siteye bundan sonra hep https ile gel" der. Olmadığında ilk istek http ile gidebilir ve araya giren biri ziyaretçiyi güvensiz sürüme düşürebilir.':
    "Die Seite öffnet sich über https, sendet aber keinen Strict-Transport-Security-Header (HSTS). Dieser Header sagt dem Browser: „Ab jetzt diese Website immer über https aufrufen.“ Ohne ihn kann die erste Anfrage über http laufen, und jemand dazwischen kann den Besucher auf die unsichere Version herabstufen.",
  "Sunucu yanıtına `Strict-Transport-Security: max-age=31536000; includeSubDomains` başlığını ekleyin. Önce tüm alt alan adlarınızın https ile çalıştığından emin olun; tarayıcı bu süre boyunca http'yi denemez.":
    "Ergänzen Sie in der Serverantwort den Header `Strict-Transport-Security: max-age=31536000; includeSubDomains`. Stellen Sie zuerst sicher, dass alle Subdomains über https funktionieren; Browser versuchen es für diesen Zeitraum nicht mehr mit http.",
  "X-Content-Type-Options başlığı yok": "Kein X-Content-Type-Options-Header",
  "Sunucu `X-Content-Type-Options: nosniff` başlığını göndermiyor. Bu başlık tarayıcının dosya türünü tahmin etmesini engeller; yoksa yüklenen bir dosya betik gibi çalıştırılabilir. Sıralamayı etkilemez, sitenin güvenlik düzenini gösterir.":
    "Der Server sendet nicht den Header `X-Content-Type-Options: nosniff`. Dieser Header hindert den Browser daran, den Typ einer Datei zu erraten; ohne ihn könnte eine hochgeladene Datei als Skript ausgeführt werden. Er beeinflusst das Ranking nicht, zeigt aber, wie die Sicherheit der Website eingerichtet ist.",
  "Sunucu yanıtlarına `X-Content-Type-Options: nosniff` başlığını ekleyin. Çoğu barındırma panelinde ya da CDN'de güvenlik başlıkları ayarından tek tıkla açılır.":
    "Ergänzen Sie in den Serverantworten den Header `X-Content-Type-Options: nosniff`. In den meisten Hosting-Panels oder CDNs ist das eine Ein-Klick-Option in den Einstellungen für Sicherheits-Header.",
  "Sayfa başka sitelerin çerçevesine gömülebiliyor":
    "Seite kann in Frames anderer Websites eingebettet werden",
  "Ne X-Frame-Options başlığı ne de Content-Security-Policy içinde frame-ancestors kuralı var. Başka bir site sayfanızı görünmez bir çerçeveye koyup ziyaretçiyi istemediği bir yere tıklatabilir (clickjacking). Sıralamayı etkilemez.":
    "Es gibt weder einen X-Frame-Options-Header noch eine frame-ancestors-Regel in einer Content-Security-Policy. Eine andere Website könnte Ihre Seite in einen unsichtbaren Frame setzen und Besucher zu ungewollten Klicks verleiten (Clickjacking). Das Ranking ist nicht betroffen.",
  "Sayfanın başka sitelerde gösterilmesi gerekmiyorsa `Content-Security-Policy: frame-ancestors 'self'` ya da `X-Frame-Options: SAMEORIGIN` başlığını ekleyin.":
    "Muss die Seite nicht auf anderen Websites angezeigt werden, ergänzen Sie den Header `Content-Security-Policy: frame-ancestors 'self'` oder `X-Frame-Options: SAMEORIGIN`.",
  "Referrer-Policy başlığı yok": "Kein Referrer-Policy-Header",
  "Sunucu Referrer-Policy başlığı göndermiyor. Güncel tarayıcılar bu durumda güvenli bir varsayılan kullanır, yani acil bir sorun değil; ama başlık, ziyaretçi başka siteye geçtiğinde adresinizin ne kadarının paylaşılacağını sizin belirlemenizi sağlar.":
    "Der Server sendet keinen Referrer-Policy-Header. Aktuelle Browser verwenden dann einen sicheren Standard, es ist also nicht dringend; mit dem Header legen Sie aber selbst fest, wie viel Ihrer Adresse weitergegeben wird, wenn ein Besucher zu einer anderen Website wechselt.",
  "Sunucu yanıtlarına `Referrer-Policy: strict-origin-when-cross-origin` başlığını ekleyin.":
    "Ergänzen Sie in den Serverantworten den Header `Referrer-Policy: strict-origin-when-cross-origin`.",
  "SSL sertifikasının süresi 30 günden az":
    "SSL-Zertifikat läuft in weniger als 30 Tagen ab",
  "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 30 günden az kaldı. Süre dolarsa tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar ve ziyaretçilerin çoğu geri döner. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.":
    "Laut den öffentlichen Zertifikatsprotokollen (Certificate Transparency) läuft das neueste erfasste Zertifikat dieser Domain in weniger als 30 Tagen ab. Ist es abgelaufen, öffnen Browser die Website mit einer ganzseitigen Sicherheitswarnung, und die meisten Besucher kehren um. Der Server nutzt womöglich bereits ein neueres Zertifikat, das noch nicht in den Protokollen steht; prüfen Sie das Ablaufdatum über das Schloss in der Adressleiste des Browsers.",
  "Sertifikanın otomatik yenilendiğini barındırma panelinizden kontrol edin. Let's Encrypt gibi otomatik sertifikalar genelde bitmeden 30 gün önce yenilenir; yenilenmediyse yenilemeyi elle başlatın.":
    "Prüfen Sie im Hosting-Panel, ob sich das Zertifikat automatisch verlängert. Automatische Zertifikate wie Let's Encrypt werden meist 30 Tage vor Ablauf verlängert; ist das nicht passiert, starten Sie die Verlängerung manuell.",
  "SSL sertifikasının süresi dolmak üzere": "SSL-Zertifikat läuft bald ab",
  "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 14 günden az kaldı. Süre dolunca tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar; ziyaretçilerin çoğu siteye hiç giremez. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.":
    "Laut den öffentlichen Zertifikatsprotokollen (Certificate Transparency) läuft das neueste erfasste Zertifikat dieser Domain in weniger als 14 Tagen ab. Danach öffnen Browser die Website mit einer ganzseitigen Sicherheitswarnung; die meisten Besucher kommen gar nicht mehr hinein. Der Server nutzt womöglich bereits ein neueres Zertifikat, das noch nicht in den Protokollen steht; prüfen Sie das Ablaufdatum über das Schloss in der Adressleiste des Browsers.",
  "Sertifikayı hemen yenileyin ve sunucuya yükleyin. Otomatik yenileme varsa neden çalışmadığına bakın (DNS kaydı değişmiş, doğrulama dosyasına erişilemiyor gibi).":
    "Verlängern Sie das Zertifikat sofort und installieren Sie es auf dem Server. Ist eine automatische Verlängerung eingerichtet, finden Sie heraus, warum sie nicht funktioniert hat (etwa ein geänderter DNS-Eintrag oder eine nicht erreichbare Validierungsdatei).",
  "Alan adının süresi 30 günden az": "Domain läuft in weniger als 30 Tagen ab",
  "Alan adı kayıt bilgisine (RDAP) göre alan adınızın süresinin bitmesine 30 günden az kaldı. Yenilenmezse site ve e-postalar tamamen durur, alan adı başkasının eline geçebilir.":
    "Laut den Registrierungsdaten der Domain (RDAP) läuft Ihre Domain in weniger als 30 Tagen ab. Wird sie nicht verlängert, fallen Website und E-Mail komplett aus, und die Domain kann in fremde Hände geraten.",
  "Alan adını aldığınız firmadan süreyi uzatın ve otomatik yenilemeyi açın. Kayıttaki e-posta adresinin güncel olduğundan emin olun; hatırlatmalar oraya gider.":
    "Verlängern Sie die Registrierung beim Anbieter, bei dem Sie die Domain gekauft haben, und aktivieren Sie die automatische Verlängerung. Achten Sie darauf, dass die E-Mail-Adresse in der Registrierung aktuell ist; dorthin gehen die Erinnerungen.",
  "Alan adında SPF kaydı yok": "Kein SPF-Eintrag für die Domain",
  "Alan adınızın DNS'inde SPF kaydı (v=spf1 ile başlayan TXT kaydı) yok. SPF, alan adınız adına hangi sunucuların e-posta gönderebileceğini söyler. Yoksa başkaları sizin adınıza sahte e-posta gönderebilir ve sizin gerçek e-postalarınız spam klasörüne düşebilir. SEO'yu doğrudan etkilemez.":
    "Das DNS Ihrer Domain hat keinen SPF-Eintrag (einen TXT-Eintrag, der mit v=spf1 beginnt). SPF legt fest, welche Server im Namen Ihrer Domain E-Mails senden dürfen. Ohne ihn können andere gefälschte E-Mails in Ihrem Namen senden, und Ihre echten E-Mails landen womöglich im Spam. SEO ist nicht direkt betroffen.",
  "E-postanızı gönderen hizmetin (Google Workspace, Microsoft 365, barındırma firması) önerdiği SPF kaydını DNS'e TXT olarak ekleyin. Alan adından hiç e-posta gönderilmiyorsa `v=spf1 -all` yeterlidir.":
    "Ergänzen Sie im DNS den SPF-Eintrag als TXT-Eintrag, den Ihr E-Mail-Dienst empfiehlt (Google Workspace, Microsoft 365, Ihr Hoster). Werden von der Domain überhaupt keine E-Mails gesendet, genügt `v=spf1 -all`.",
  "Alan adında DMARC kaydı yok": "Kein DMARC-Eintrag für die Domain",
  "Alan adınızda DMARC kaydı (_dmarc alt adında v=DMARC1 ile başlayan TXT kaydı) yok. DMARC, SPF ve DKIM kontrolünden geçemeyen e-postalara ne yapılacağını söyler. Gmail ve Yahoo toplu gönderim yapan alan adlarından bu kaydı istiyor. SEO'yu doğrudan etkilemez.":
    "Ihre Domain hat keinen DMARC-Eintrag (einen TXT-Eintrag auf der Subdomain _dmarc, der mit v=DMARC1 beginnt). DMARC legt fest, was mit E-Mails geschieht, die die SPF- und DKIM-Prüfung nicht bestehen. Gmail und Yahoo verlangen ihn von Domains, die Massen-E-Mails senden. SEO ist nicht direkt betroffen.",
  "DNS'e `_dmarc` adıyla `v=DMARC1; p=none; rua=mailto:dmarc@alanadiniz.com` gibi bir TXT kaydı ekleyin. Raporları birkaç hafta izledikten sonra politikayı `quarantine` ya da `reject` yapın.":
    "Ergänzen Sie im DNS einen TXT-Eintrag namens `_dmarc`, etwa `v=DMARC1; p=none; rua=mailto:dmarc@ihredomain.de`. Beobachten Sie die Berichte einige Wochen lang und stellen Sie die Richtlinie dann auf `quarantine` oder `reject` um.",
  "Open Graph etiketleri eksik": "Open-Graph-Tags unvollständig",
  "Sayfada Open Graph etiketleri var ama başlık, açıklama ve görselden biri ya da birkaçı eksik. Bu etiketler sayfa Facebook, LinkedIn, WhatsApp gibi yerlerde paylaşıldığında görünen kartı belirler. Eksik olanı paylaşılan platform kendisi tahmin eder; çoğu zaman yanlış görsel ya da kesik bir metin çıkar. Google sıralamasını etkilemez.":
    "Die Seite hat Open-Graph-Tags, aber Titel, Beschreibung oder Bild fehlen. Diese Tags bestimmen die Karte, die beim Teilen der Seite auf Facebook, LinkedIn, WhatsApp und ähnlichen Plattformen erscheint. Was fehlt, errät die Plattform, oft mit falschem Bild oder abgeschnittenem Text. Das Google-Ranking ist nicht betroffen.",
  "Eksik etiketi ekleyin: og:title, og:description ve og:image üçü birlikte olmalı. Görsel en az 1200x630 piksel olsun. SEO eklentiniz varsa sosyal paylaşım bölümünü doldurmanız yeter.":
    "Ergänzen Sie das fehlende Tag: og:title, og:description und og:image gehören zusammen. Das Bild sollte mindestens 1200x630 Pixel groß sein. Nutzen Sie ein SEO-Plugin, genügt es, dessen Bereich für Social Sharing auszufüllen.",
  "X (Twitter) kart etiketi yok": "Kein X-(Twitter-)Card-Tag",
  "Sayfada Open Graph etiketleri var ama twitter:card etiketi yok. X başlık, açıklama ve görseli Open Graph'tan alabilir, ama kart türünü söyleyen bu etiket olmadan bağlantı kartsız, düz bir adres olarak görünebilir. Google sıralamasını etkilemez.":
    "Die Seite hat Open-Graph-Tags, aber kein twitter:card-Tag. X kann Titel, Beschreibung und Bild aus Open Graph übernehmen, doch ohne dieses Tag, das den Kartentyp festlegt, erscheint der Link womöglich als reine Adresse ohne Karte. Das Google-Ranking ist nicht betroffen.",
  'Sayfanın head bölümüne <meta name="twitter:card" content="summary_large_image"> ekleyin. Diğer twitter: etiketlerine gerek yok; X eksikleri Open Graph etiketlerinden tamamlar.':
    'Ergänzen Sie <meta name="twitter:card" content="summary_large_image"> im Head der Seite. Die übrigen twitter:-Tags sind nicht nötig; X übernimmt sie aus den Open-Graph-Tags.',
  "Başlık etiketi ile H1 aynı": "Title-Tag und H1 sind identisch",
  "Sayfanın başlık etiketi (<title>) ile H1 başlığı birebir aynı. Bu bir hata değil ve Google bunu cezalandırmaz. Ama iki farklı yer, iki farklı fırsat demek: başlık arama sonucunda tıklatmak için, H1 sayfaya gelen ziyaretçiye konuyu söylemek için yazılır. Aynı metin ikisinden birini boşa harcar.":
    "Title-Tag (<title>) und H1 der Seite sind exakt gleich. Das ist kein Fehler, und Google bestraft es nicht. Aber zwei Stellen bedeuten zwei Chancen: Der Title soll in den Suchergebnissen den Klick gewinnen, die H1 dem Besucher auf der Seite sagen, worum es geht. Derselbe Text verschenkt eine davon.",
  "Başlığı arama sonucu için yazın (ana kelime başta, marka sonda), H1'i sayfadaki okur için yazın. Konu aynı kalsın, ifade farklı olsun.":
    "Schreiben Sie den Title für das Suchergebnis (Hauptkeyword zuerst, Marke zuletzt) und die H1 für den Leser auf der Seite. Thema beibehalten, Formulierung variieren.",
  "Başlık arama sonucunda kesilebilir":
    "Titel wird in den Suchergebnissen womöglich abgeschnitten",
  "Başlık 60 karakterin altında ama geniş harfler yüzünden yaklaşık 580 pikseli aşıyor. Google başlığı karakter sayısına göre değil, genişliğe göre keser; geniş büyük harfler (W, M) ve sayılar başlığı daha erken taşırır. Ölçüm, Google'ın masaüstünde kullandığı 20 piksellik Arial yazı tipine göre yapılan bir tahmindir.":
    "Der Titel hat weniger als 60 Zeichen, aber breite Buchstaben schieben ihn über etwa 580 Pixel. Google kürzt Titel nach Breite, nicht nach Zeichenzahl; breite Großbuchstaben (W, M) und Ziffern füllen die Zeile schneller. Die Messung ist eine Schätzung auf Basis der 20-Pixel-Arial, die Google auf dem Desktop verwendet.",
  "Başlığı kısaltın ya da büyük harfle yazılmış sözcükleri normal yazıma çevirin. En önemli kelimeleri başa alın; kesilme olursa sondaki marka adı gitsin.":
    "Kürzen Sie den Titel oder schreiben Sie Wörter in Großbuchstaben normal. Stellen Sie die wichtigsten Wörter an den Anfang, damit bei einer Kürzung der Markenname am Ende wegfällt.",
  "Gereksiz meta keywords etiketi": "Unnötiges Meta-Keywords-Tag",
  "Sayfada meta keywords etiketi var. Google bu etiketi yıllardır hiç kullanmıyor; sıralamaya ne katkısı ne zararı var. Tek etkisi, hedeflediğiniz kelimeleri rakiplerin kaynak koduna bakarak görebilmesi.":
    "Die Seite hat ein Meta-Keywords-Tag. Google nutzt dieses Tag seit Jahren nicht mehr; es hilft dem Ranking nicht und schadet ihm nicht. Einziger Effekt: Wettbewerber sehen im Quelltext, auf welche Keywords Sie zielen.",
  "Etiketi şablondan ya da SEO eklentisinin ayarlarından kaldırın. Acil değil; zamanınız olduğunda temizleyin.":
    "Entfernen Sie das Tag aus der Vorlage oder in den Einstellungen Ihres SEO-Plugins. Es ist nicht dringend; räumen Sie es auf, wenn Sie Zeit haben.",
  "Sayfa yakınlaştırmayı engelliyor": "Seite sperrt das Zoomen",
  "Sayfanın viewport etiketi kullanıcının yakınlaştırmasını kapatıyor (user-scalable=no ya da 2'den küçük maximum-scale). Az gören ziyaretçiler telefonda metni büyütemez. Erişilebilirlik standardı (WCAG) metnin %200'e kadar büyütülebilmesini ister; Lighthouse da bunu hata sayar.":
    "Das Viewport-Tag der Seite schaltet das Zoomen ab (user-scalable=no oder ein maximum-scale unter 2). Besucher mit Sehschwäche können den Text auf dem Smartphone nicht vergrößern. Der Barrierefreiheitsstandard (WCAG) verlangt, dass Text bis 200 % vergrößert werden kann, und Lighthouse wertet das als Fehler.",
  'Viewport etiketinden user-scalable=no ve maximum-scale değerlerini kaldırın: <meta name="viewport" content="width=device-width, initial-scale=1"> yeterlidir.':
    'Entfernen Sie user-scalable=no und maximum-scale aus dem Viewport-Tag: <meta name="viewport" content="width=device-width, initial-scale=1"> genügt.',
  "En iyi uygulama: yeni sekmede açılan dış bağlantılarda noopener yok":
    "Best Practice: Externe Links öffnen sich ohne noopener in einem neuen Tab",
  'Sayfada target="_blank" ile yeni sekmede açılan ama rel="noopener" ya da rel="noreferrer" taşımayan dış bağlantılar var. Güncel tarayıcılar (Chrome 88, Firefox 79 ve Safari 12.1\'den beri) target="_blank" bağlantılara noopener\'ı kendiliğinden uygular; yani bu bir güvenlik açığı değil, eski tarayıcılar için bir en iyi uygulama notudur. Sıralamayı etkilemez.':
    'Die Seite hat externe Links, die sich mit target="_blank" in einem neuen Tab öffnen, aber weder rel="noopener" noch rel="noreferrer" tragen. Aktuelle Browser (seit Chrome 88, Firefox 79 und Safari 12.1) wenden noopener bei target="_blank"-Links selbst an; das ist also keine Sicherheitslücke, nur ein Best-Practice-Hinweis für ältere Browser. Das Ranking ist nicht betroffen.',
  'Bu bağlantılara rel="noopener" ekleyin. Çoğu zaman tek bir şablon ya da editör ayarıdır.':
    'Ergänzen Sie bei diesen Links rel="noopener". Meist ist das eine einzige Einstellung in der Vorlage oder im Editor.',
  'Adresi "javascript:" olan bağlantılar':
    "Links mit der Adresse „javascript:“",
  'Sayfada href değeri "javascript:" ile başlayan bağlantılar var. Google yalnızca gerçek bir adrese giden <a href> bağlantılarını izler; bunları izleyemez, yani gittikleri sayfaları bu yoldan bulamaz. Klavye ve ekran okuyucu kullananlar için de bunlar çoğu zaman çalışmaz.':
    "Die Seite hat Links, deren href mit „javascript:“ beginnt. Google folgt nur <a href>-Links, die zu einer echten Adresse führen; diesen kann es nicht folgen und findet die verlinkten Seiten auf diesem Weg daher nicht. Für Tastatur- und Screenreader-Nutzer funktionieren sie oft ebenfalls nicht.",
  "Bir sayfaya gidiyorsa href'e o sayfanın adresini yazın. Bir işlem yapıyorsa (menü açmak gibi) <a> yerine <button> kullanın.":
    "Führt der Link zu einer Seite, tragen Sie deren Adresse in href ein. Löst er eine Aktion aus (etwa ein Menü öffnen), verwenden Sie <button> statt <a>.",
  "Aşağıdaki görseller hemen yükleniyor": "Bilder weiter unten laden sofort",
  'Sayfada ilk ekranın altında kalan altıdan fazla görsel loading="lazy" olmadan, sayfa açılır açılmaz yükleniyor. Ziyaretçi o kısma inmeden bant genişliği harcanır ve sayfa yavaşlar. Tahmin, ilk üç içerik görselinin ilk ekranda olduğunu varsayar ve yalnızca ana içerikteki (<main>, <article>) ya da büyük boyutlu görselleri sayar; logolar ve simgeler sayılmaz. Gerçek ekran düzeni farklı olabilir.':
    'Mehr als sechs Bilder unterhalb des ersten Bildschirms laden direkt beim Öffnen der Seite, ohne loading="lazy". Bandbreite wird verbraucht, bevor der Besucher dorthin scrollt, und die Seite wird langsamer. Die Schätzung nimmt an, dass die ersten drei Inhaltsbilder im ersten Bildschirm liegen, und zählt nur Bilder im Hauptinhalt (<main>, <article>) oder mit großer Größe; Logos und Symbole zählen nicht. Das tatsächliche Layout kann abweichen.',
  'İlk ekranın altındaki görsellere loading="lazy" ekleyin. İlk ekrandaki ana görsele eklemeyin; o görsel hemen yüklenmeli.':
    'Ergänzen Sie loading="lazy" bei den Bildern unterhalb des ersten Bildschirms. Nicht beim Hauptbild im ersten Bildschirm; das soll sofort laden.',
  "Görseller eski biçimde": "Bilder in älteren Formaten",
  "Sayfadaki üç ya da daha fazla görsel JPEG, PNG ya da GIF biçiminde ve WebP ya da AVIF alternatifi yok (logolar, simgeler ve SVG'ler sayılmaz). Yeni biçimler aynı kalitede genelde %25-50 daha küçüktür; sayfa daha hızlı açılır. Tüm güncel tarayıcılar bu biçimleri destekler.":
    "Drei oder mehr Bilder auf der Seite sind JPEG, PNG oder GIF ohne WebP- oder AVIF-Alternative (Logos, Symbole und SVGs zählen nicht). Die neueren Formate sind bei gleicher Qualität meist 25–50 % kleiner, die Seite öffnet sich also schneller. Alle aktuellen Browser unterstützen sie.",
  "Görselleri WebP ya da AVIF'e çevirin, ya da <picture> içinde bu biçimlerde bir <source> ekleyin. Çoğu CMS ve görsel eklentisi bunu otomatik yapabilir.":
    "Wandeln Sie die Bilder in WebP oder AVIF um oder ergänzen Sie in einem <picture> ein <source> in diesen Formaten. Die meisten CMS und Bild-Plugins erledigen das automatisch.",
  "Etiketi olmayan form alanları": "Formularfelder ohne Label",
  'Sayfadaki bazı form alanlarının (metin kutusu, seçim listesi) etiketi yok: ne <label>, ne aria-label, ne title, ne de yer tutucu metin. Ekran okuyucu kullanan ziyaretçi alana gelince yalnızca "düzenleme alanı" duyar, ne yazacağını bilemez. Lighthouse\'un erişilebilirlik denetimi de bunu hata sayar.':
    "Einige Formularfelder auf der Seite (Textfelder, Auswahllisten) haben kein Label: kein <label>, kein aria-label, kein title und keinen Platzhalter. Wer einen Screenreader nutzt, hört am Feld nur „Text bearbeiten“ und weiß nicht, was einzugeben ist. Die Barrierefreiheitsprüfung von Lighthouse wertet das ebenfalls als Fehler.",
  'Her alana görünür bir <label for="alan-id"> ekleyin. Tasarım görünür etikete izin vermiyorsa aria-label="E-posta adresi" gibi bir etiket verin.':
    'Geben Sie jedem Feld ein sichtbares <label for="feld-id">. Lässt das Design kein sichtbares Label zu, ergänzen Sie eines wie aria-label="E-Mail-Adresse".',
  "Aynı id birden çok öğede": "Dieselbe id an mehreren Elementen",
  "Sayfada aynı id değerini taşıyan birden fazla öğe var. id sayfada tek olmalı; tekrar ettiğinde form etiketleri, sayfa içi bağlantılar ve erişilebilirlik bağlantıları yanlış öğeye gider. Sıralamayı etkilemez, ama genelde bir bileşenin aynı sayfada iki kez kullanılmasından kaynaklanan bir şablon hatasıdır.":
    "Mehrere Elemente auf der Seite teilen sich denselben id-Wert. Eine id muss auf einer Seite eindeutig sein; wiederholt sie sich, zeigen Formular-Labels, seiteninterne Links und Barrierefreiheitsverweise auf das falsche Element. Das Ranking ist nicht betroffen, meist ist es aber ein Vorlagenfehler, bei dem eine Komponente zweimal auf einer Seite verwendet wird.",
  "Tekrar eden id'leri bulun (tarayıcının geliştirici araçlarında document.querySelectorAll('[id]') ile) ve her birini benzersiz yapın; yalnızca stil için kullanılıyorsa class'a çevirin.":
    "Suchen Sie die doppelten ids (mit document.querySelectorAll('[id]') in den Entwicklertools des Browsers) und machen Sie jede eindeutig; dient eine nur dem Styling, machen Sie daraus eine Klasse.",
  "Sayfanın HTML yapısı çok büyük": "HTML-Struktur der Seite ist zu groß",
  "Sayfada 1.500'den fazla HTML öğesi var. Lighthouse bu sınırdan sonra uyarı verir: büyük bir sayfa yapısı daha çok bellek harcar, stil hesaplamayı ve etkileşimi yavaşlatır, özellikle telefonda. Genelde her sayfada tekrarlanan dev menülerden, gizli ama yüklenen içerikten ya da iç içe geçmiş sayfa oluşturucu katmanlarından olur.":
    "Die Seite hat mehr als 1.500 HTML-Elemente. Ab diesem Punkt warnt Lighthouse: Eine große Seitenstruktur braucht mehr Speicher und verlangsamt Stilberechnung und Interaktion, besonders auf Smartphones. Meist stammt sie von riesigen Menüs, die sich auf jeder Seite wiederholen, von verborgenen Inhalten, die trotzdem laden, oder von verschachtelten Page-Builder-Ebenen.",
  "Görünmeyen içeriği (kapalı menüler, sekmeler) gerektiğinde yükleyin, uzun listeleri sayfalara bölün, sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.":
    "Laden Sie nicht sichtbare Inhalte (geschlossene Menüs, Tabs) erst bei Bedarf, teilen Sie lange Listen auf mehrere Seiten auf und reduzieren Sie unnötige Wrapper-Ebenen des Page Builders.",
  "HTML öğeleri çok iç içe": "HTML-Elemente zu tief verschachtelt",
  "Sayfada 32 kattan derin iç içe geçmiş HTML öğeleri var. Çok derin yapı stil hesaplamayı yavaşlatır ve genelde sayfa oluşturucuların her bölümü birkaç gereksiz kutuya sarmasından kaynaklanır.":
    "Die Seite hat HTML-Elemente, die mehr als 32 Ebenen tief verschachtelt sind. Eine sehr tiefe Struktur verlangsamt die Stilberechnung und entsteht meist durch Page Builder, die jeden Abschnitt in mehrere unnötige Boxen packen.",
  "Şablonda gereksiz sarmalayıcı <div> katmanlarını kaldırın; sayfa oluşturucu kullanıyorsanız iç içe bölüm ve sütunları azaltın.":
    "Entfernen Sie unnötige <div>-Wrapper-Ebenen aus der Vorlage; wenn Sie einen Page Builder verwenden, reduzieren Sie verschachtelte Abschnitte und Spalten.",
  "Görünür metin, koda göre çok az":
    "Sehr wenig sichtbarer Text im Verhältnis zum Code",
  "Sayfanın görünür metni, HTML'nin onda birinden az. Bu tek başına bir sıralama sorunu değil; Google böyle bir oran ölçmez. Ama çoğu zaman sayfanın satır içi betik ve stil kodlarıyla şiştiğini ya da içeriğin ilk gelen HTML'de olmadığını gösterir.":
    "Der sichtbare Text der Seite macht weniger als ein Zehntel ihres HTML aus. Für sich genommen ist das kein Ranking-Problem; Google misst kein solches Verhältnis. Oft zeigt es aber, dass die Seite mit Inline-Skripten und -Styles aufgebläht ist oder der Inhalt nicht im zuerst ankommenden HTML steht.",
  "Satır içi büyük betik ve stilleri ayrı dosyalara taşıyın, kullanılmayan kodu kaldırın. İçerik JavaScript ile yükleniyorsa sayfa kaynağında da göründüğünden emin olun.":
    "Verschieben Sie große Inline-Skripte und -Styles in eigene Dateien und entfernen Sie ungenutzten Code. Wird der Inhalt per JavaScript geladen, stellen Sie sicher, dass er auch im Quelltext der Seite steht.",
  "Neredeyse aynı içerik": "Nahezu doppelter Inhalt",
  "Bu sayfaların ana içeriği neredeyse aynı; yalnızca birkaç kelime (şehir adı, renk, fiyat gibi) farklı. Menü, üst ve alt bilgi gibi her sayfada tekrar eden kısımlar karşılaştırmaya katılmaz. Google bu sayfalardan birini seçip diğerlerini arama sonucunda göstermeyebilir ve hangisini seçeceğine o karar verir. Genelde aynı şablonla çoğaltılmış konum, ürün çeşidi ya da etiket sayfalarında olur.":
    "Der Hauptinhalt dieser Seiten ist fast gleich; nur wenige Wörter (ein Ortsname, eine Farbe, ein Preis) unterscheiden sich. Teile, die sich auf jeder Seite wiederholen, etwa Menü, Header und Footer, bleiben beim Vergleich außen vor. Google wählt womöglich eine davon aus und lässt die anderen aus den Suchergebnissen weg, und Google entscheidet, welche. Meist betrifft das Standort-, Produktvarianten- oder Tag-Seiten aus derselben Vorlage.",
  "Her sayfaya kendine özgü, işe yarar içerik ekleyin. Gerçekten aynı şeyi anlatıyorlarsa tek sayfada birleştirin ya da diğerlerine asıl sayfayı gösteren bir canonical ekleyin.":
    "Geben Sie jeder Seite eigenen, nützlichen Inhalt. Sagen sie wirklich dasselbe, führen Sie sie zu einer Seite zusammen oder setzen Sie auf den anderen ein Canonical, das auf die Hauptseite zeigt.",
  "Yapılandırılmış veride zorunlu özellikler eksik":
    "Erforderliche Eigenschaften fehlen in strukturierten Daten",
  "Sayfadaki yapılandırılmış veri (JSON-LD) bir türü bildiriyor ama Google'ın o tür için zorunlu saydığı özelliklerden bazıları yok. Bu, Product, FAQPage, BreadcrumbList ve LocalBusiness türleri içindir; eksik olunca arama sonucunda zengin görünüm (yıldız, fiyat, içerik haritası) çıkmaz.":
    "Die strukturierten Daten der Seite (JSON-LD) deklarieren einen Typ, aber einige Eigenschaften, die Google dafür als erforderlich nennt, fehlen. Das betrifft Product, FAQPage, BreadcrumbList und LocalBusiness; ohne sie erscheint in der Suche kein Rich-Suchergebnis (Sterne, Preis, Breadcrumb).",
  "Ayrıntıdaki eksik özellikleri işaretlemeye ekleyin ve sonucu Google'ın Zengin Sonuç Testi ile kontrol edin. İşaretleme sayfada gerçekten görünen bilgiyi anlatmalı; sayfada olmayan bir fiyatı ya da yorumu işaretlemek Google kurallarına aykırıdır.":
    "Ergänzen Sie die in den Details aufgeführten fehlenden Eigenschaften im Markup und prüfen Sie das Ergebnis mit Googles Test für Rich-Suchergebnisse. Das Markup muss Informationen beschreiben, die auf der Seite tatsächlich sichtbar sind; einen Preis oder eine Bewertung auszuzeichnen, die nicht auf der Seite stehen, verstößt gegen Googles Richtlinien.",
  "Yapılandırılmış veride önerilen özellikler eksik":
    "Empfohlene Eigenschaften fehlen in strukturierten Daten",
  "Sayfadaki Article ya da Organization işaretlemesinde Google'ın önerdiği özelliklerden (başlık, görsel, tarih, yazar; ya da ad, web adresi, logo) bazıları yok. Google bu türler için zorunlu özellik saymaz, bu yüzden işaretleme geçerlidir ve zengin görünümü engellemez; önerilen özellikler yalnızca Google'ın sayfayı daha eksiksiz göstermesine yardım eder.":
    "Dem Article- oder Organization-Markup der Seite fehlen einige von Google empfohlene Eigenschaften (headline, image, Datum, author; bzw. name, URL, logo). Google nennt für diese Typen keine erforderlichen Eigenschaften, das Markup ist also gültig und verhindert kein Rich-Suchergebnis; die empfohlenen Eigenschaften helfen Google nur, die Seite vollständiger darzustellen.",
  "Ayrıntıdaki özellikleri, sayfada gerçekten görünen bilgiyle işaretlemeye ekleyin ve sonucu Google'ın Zengin Sonuç Testi ile kontrol edin. Acil değildir; zorunlu özellik eksiklerinden sonra gelir.":
    "Ergänzen Sie die in den Details aufgeführten Eigenschaften im Markup mit Informationen, die auf der Seite tatsächlich sichtbar sind, und prüfen Sie das Ergebnis mit Googles Test für Rich-Suchergebnisse. Es ist nicht dringend; es kommt nach fehlenden erforderlichen Eigenschaften.",
  "Sayfalarda Google Analytics etiketi bulunamadı":
    "Kein Google-Analytics-Tag auf den Seiten gefunden",
  "Taranan sayfaların HTML'sinde Google Analytics 4 (G-), Google Etiket Yöneticisi (GTM-) ya da Universal Analytics (UA-) kimliği bulunamadı. Ölçüm yoksa hangi sayfanın ziyaretçi ve dönüşüm getirdiğini göremezsiniz. Etiket bir çerez onay aracı ya da başka bir betik tarafından sonradan yükleniyorsa burada görünmez; o durumda bu bulguyu yok sayabilirsiniz.":
    "Im HTML der gecrawlten Seiten wurde keine ID von Google Analytics 4 (G-), Google Tag Manager (GTM-) oder Universal Analytics (UA-) gefunden. Ohne Messung sehen Sie nicht, welche Seiten Besucher und Conversions bringen. Lädt ein Cookie-Consent-Tool oder ein anderes Skript das Tag erst später, erscheint es hier nicht; dann können Sie diesen Befund ignorieren.",
  "Google Analytics 4'te bir web veri akışı oluşturun ve verdiği etiketi tüm sayfaların head bölümüne ekleyin; ya da Etiket Yöneticisi kullanıyorsanız kapsayıcı kodunu ekleyin. Sonra Analytics'teki gerçek zamanlı raporda ziyaretinizin göründüğünü kontrol edin.":
    "Erstellen Sie in Google Analytics 4 einen Web-Datenstream und fügen Sie das angezeigte Tag in den Head jeder Seite ein, oder fügen Sie den Container-Code ein, wenn Sie Tag Manager nutzen. Prüfen Sie dann, ob Ihr eigener Besuch im Echtzeitbericht von Analytics erscheint.",
  "Sayfalardaki Analytics kimliği bağlı mülkle eşleşmiyor":
    "Analytics-ID auf den Seiten passt nicht zur verbundenen Property",
  "Sayfalarda bulunan Google Analytics 4 ölçüm kimliği (G-), bu projeye bağlı Analytics mülkünün web veri akışlarındaki kimliklerden hiçbiriyle eşleşmiyor. Yani ziyaretçi verisi büyük olasılıkla başka bir mülke gidiyor ve buradaki Analytics raporları siteyi göstermiyor. Eski bir mülkün kodu ya da kopyalanmış bir şablon genelde nedendir.":
    "Die Mess-ID von Google Analytics 4 (G-) auf den Seiten passt zu keiner der IDs in den Web-Datenstreams der Analytics-Property, die mit diesem Projekt verbunden ist. Die Besucherdaten gehen also höchstwahrscheinlich an eine andere Property, und die Analytics-Berichte hier zeigen nicht diese Website. Meist ist der Code einer alten Property oder eine kopierte Vorlage die Ursache.",
  "Ayrıntıdaki iki kimlik listesini karşılaştırın. Doğru mülk bağlıysa sayfalardaki etiketi o mülkün ölçüm kimliğiyle değiştirin; sayfalardaki doğruysa Ayarlar'dan projeye o mülkü bağlayın.":
    "Vergleichen Sie die beiden ID-Listen in den Details. Ist die richtige Property verbunden, ersetzen Sie das Tag auf den Seiten durch die Mess-ID dieser Property; ist die auf den Seiten richtig, verbinden Sie diese Property in den Einstellungen mit dem Projekt.",
  "{count} kontrol aşamasından geçti": "{count} Prüfungen bestanden",
  Ölçülmedi: "Nicht gemessen",
  "Geçen {count} kontrol": "{count} bestandene Prüfungen",
  Geçti: "Bestanden",
  "{count} sayfada": "Auf {count} Seiten",
  "Başlangıç sayfası okunamadığı için önizleme yok.":
    "Keine Vorschau, weil die Startseite nicht gelesen werden konnte.",
  "Hız ölçülmedi": "Geschwindigkeit nicht gemessen",
  "Hız ölçülemedi": "Geschwindigkeit konnte nicht gemessen werden",
  "Başlangıç sayfası ölçülemedi; gösterilen, ölçülen en üst sayfa: {url}":
    "Die Startseite konnte nicht gemessen werden; angezeigt wird die am wenigsten tief liegende gemessene Seite: {url}",
  "Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok. Denetimi hız ölçümü açık başlatırsanız gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.":
    "Dieses Audit hat keine PageSpeed-Messung für die Startseite. Führen Sie das Audit mit eingeschalteten Geschwindigkeitstests aus, dann erscheinen hier Daten echter Nutzer (CrUX) und Laborergebnisse.",
  "Temel Web Verileri": "Core Web Vitals",
  "Gerçek kullanıcı verisi Chrome Kullanıcı Deneyimi Raporu'ndan (CrUX, son 28 gün, mobil); laboratuvar sütunu PageSpeed Insights'ın tek ölçümü.":
    "Daten echter Nutzer stammen aus dem Chrome User Experience Report (CrUX, letzte 28 Tage, mobil); die Laborspalte ist ein einzelner Lauf von PageSpeed Insights.",
  Metrik: "Messwert",
  "Bu sayfa, gerçek": "Diese Seite, echte Nutzer",
  "Tüm site, gerçek": "Gesamte Website, echte Nutzer",
  "Anlık veri": "Momentaufnahme",
  "Site puanı {score}/100, {word}": "Website-Score {score}/100, {word}",
  "Uyarı ve bilgi": "Warnungen und Hinweise",
  "Kategori puanları": "Kategorie-Scores",
  "Tüm kontroller": "Alle Prüfungen",
  "{passed}/{total} geçti": "{passed}/{total} bestanden",
  "Puan geçmişi": "Score-Verlauf",
  "Son {count} denetimin puanı": "Score der letzten {count} Audits",
  "Öncekiyle aynı": "Wie beim letzten Mal",
  "{value} puan, öncekine göre": "{value} Punkte seit dem letzten Audit",
  "Tarayıcı erişimi (robots.txt)": "Crawler-Zugriff (robots.txt)",
  "Arama motorları ve yapay zekâ tarayıcıları sitenin ana sayfasını okuyabiliyor mu?":
    "Können Suchmaschinen und KI-Crawler die Startseite der Website lesen?",
  "Arama motoru": "Suchmaschine",
  "Yapay zekâ": "KI",
  Engelli: "Blockiert",
  İzinli: "Erlaubt",
  "DNS kayıtları": "DNS-Einträge",
  "Bazı sorgular yanıt vermedi; liste eksik olabilir.":
    "Einige Abfragen blieben unbeantwortet; die Liste ist womöglich unvollständig.",
  "Ölçüm etiketleri": "Mess-Tags",
  "Sayfaların HTML'sinde bulunan Google Analytics ve Etiket Yöneticisi kimlikleri.":
    "Im HTML der Seiten gefundene IDs von Google Analytics und Tag Manager.",
  "Hiçbir sayfada etiket bulunamadı.":
    "Auf keiner Seite wurde ein Tag gefunden.",
  "Yapılandırılmış veri türleri": "Typen strukturierter Daten",
  "Sayfaların JSON-LD ile bildirdiği schema.org türleri.":
    "schema.org-Typen, die die Seiten in JSON-LD deklarieren.",
  "Hiçbir sayfada yapılandırılmış veri bulunamadı.":
    "Auf keiner Seite wurden strukturierte Daten gefunden.",
  "{date} (süresi doldu)": "{date} (abgelaufen)",
  "{date} ({count} gün kaldı)": "{date} (noch {count} Tage)",
  "Sunucu ve yanıt": "Server und Antwort",
  "{count} adım": "{count} Schritte",
  "İlk bayt (TTFB)": "Erstes Byte (TTFB)",
  "Toplam yanıt": "Gesamte Antwort",
  "HTML boyutu": "HTML-Größe",
  Sıkıştırma: "Komprimierung",
  Önbellek: "Caching",
  Sunucu: "Server",
  "Teknoloji ipucu": "Technologie-Hinweis",
  "Güvenlik başlıkları": "Sicherheits-Header",
  "http'den https'e yönlendirme": "Weiterleitung von http auf https",
  "Çerçeveye gömme koruması": "Schutz vor Einbettung",
  "Alan adı ve sertifika": "Domain und Zertifikat",
  "Sertifika bilgisi herkese açık Certificate Transparency kayıtlarından; alan adı bilgisi RDAP'tan.":
    "Zertifikatsangaben stammen aus den öffentlichen Certificate-Transparency-Protokollen, Domainangaben aus RDAP.",
  "Sertifikayı veren": "Zertifikatsaussteller",
  "Sertifika bitişi": "Zertifikat läuft ab",
  "Kayıt firması": "Registrar",
  "Kayıt tarihi": "Registriert",
  "Alan adı bitişi": "Domain läuft ab",
  "Diğer adres": "Anderer Host",
  "Asıl adrese yönleniyor": "Leitet auf den Haupthost weiter",
  "Ayrı açılıyor": "Öffnet sich separat",
  "Ana sayfaya yönleniyor": "Leitet auf die Startseite weiter",
  "Doğru: {status}": "Richtig: {status}",
  "Hatalı: {status} dönüyor": "Falsch: liefert {status}",
  "Dosyalar ve hata sayfası": "Dateien und Fehlerseite",
  "robots.txt içinde Sitemap satırı": "Sitemap-Zeile in der robots.txt",
  "Olmayan bir sayfa": "Eine nicht existierende Seite",
  "Bu denetim site bilgisi toplanmadan önce yapılmış. Sunucu, güvenlik başlıkları, DNS ve sertifika bilgisini görmek için denetimi yeniden çalıştırın.":
    "Dieses Audit lief, bevor Website-Details erfasst wurden. Führen Sie das Audit erneut aus, um Server, Sicherheits-Header, DNS und Zertifikat zu sehen.",
  "Google arama sonucu önizlemesi": "Vorschau des Google-Suchergebnisses",
  "(başlık yok)": "(kein Titel)",
  "(meta açıklama yok; Google sayfadan bir parça seçer)":
    "(keine Meta-Beschreibung; Google wählt eine Passage aus der Seite)",
  "Başlık {px} piksel; yaklaşık {max} pikselden sonrası kesiliyor.":
    "Der Titel ist {px} Pixel breit; alles jenseits von etwa {max} Pixeln wird abgeschnitten.",
  "Başlık {px} piksel, sığıyor.": "Der Titel ist {px} Pixel breit und passt.",
  "Sayfanın başlığı yok.": "Die Seite hat keinen Titel.",
  "Açıklama iki satıra sığmıyor; sonu kesilerek gösterilir.":
    "Die Beschreibung passt nicht auf zwei Zeilen; ihr Ende wird abgeschnitten.",
  "Paylaşım kartı önizlemesi (Open Graph)":
    "Vorschau der Teilen-Karte (Open Graph)",
  "Görsel açılamadı": "Bild konnte nicht geladen werden",
  "og:image yok": "Kein og:image",
  "Open Graph başlığı, açıklaması ve görseli tanımlı.":
    "Open-Graph-Titel, -Beschreibung und -Bild sind gesetzt.",
  "Eksik: {tags}. Paylaşım siteleri yerine sayfadan tahmin eder.":
    "Fehlt: {tags}. Plattformen, auf denen geteilt wird, erraten diese stattdessen aus der Seite.",
  "Twitter kartı: {card}": "Twitter-Card: {card}",
  "Twitter kartı tanımlı değil.": "Keine Twitter-Card gesetzt.",
  "{url}: {critical} kritik, {warning} uyarı, {info} bilgi":
    "{url}: {critical} kritisch, {warning} Warnungen, {info} Hinweise",
  "{count} tıklama": "{count} Klicks",
  "Son denetimden bu yana": "Seit dem letzten Audit",
  "{date} tarihli denetimle karşılaştırıldı.":
    "Verglichen mit dem Audit vom {date}.",
  "Düzeltilenler ({count})": "Behoben ({count})",
  "Önceki denetimdeki sorunların hiçbiri tamamen gitmedi.":
    "Keines der Probleme aus dem vorigen Audit ist vollständig verschwunden.",
  "Yeni çıkanlar ({count})": "Neu ({count})",
  "Yeni bir sorun türü çıkmadı.": "Keine neue Art von Problem aufgetreten.",
  "Search Console trafiği yükleniyor; sıralama birazdan güncellenebilir.":
    "Search-Console-Traffic wird geladen; die Reihenfolge kann sich gleich noch ändern.",
  "Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı ({start} – {end}).":
    "Reihenfolge: Auswirkung auf den Score, gewichtet mit den Search-Console-Klicks der betroffenen Seiten ({start} – {end}).",
  "Search Console bağlı değil ya da yanıt vermedi; sıralama yalnızca puan etkisine göre.":
    "Search Console ist nicht verbunden oder hat nicht geantwortet; die Reihenfolge richtet sich nur nach der Auswirkung auf den Score.",
  "İlk {count} işi göster": "Die ersten {count} Aufgaben anzeigen",
  "Tüm {count} işi göster": "Alle {count} Aufgaben anzeigen",
  "{clicks} tıklama, {impressions} gösterim":
    "{clicks} Klicks, {impressions} Impressionen",
  "ve {count} sayfa daha": "und {count} weitere Seiten",
  "Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı.":
    "Reihenfolge: Auswirkung auf den Score, gewichtet mit den Search-Console-Klicks der betroffenen Seiten.",
  Tarayıcılar: "Crawler",
  "Başlık arama sonucunda kesiliyor.":
    "Der Titel wird in den Suchergebnissen abgeschnitten.",
  "Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok; gerçek kullanıcı verisi (CrUX) ölçülmedi.":
    "Dieses Audit hat keine PageSpeed-Messung für die Startseite; Daten echter Nutzer (CrUX) wurden nicht gemessen.",
  "2. Anlık veri": "2. Momentaufnahme",
  "Siteniz hakkında denetim anında toplanan bilgiler: sunucu, güvenlik başlıkları, DNS, sertifika, robots.txt ve gerçek kullanıcı hızı.":
    "Was das Audit zum Zeitpunkt der Prüfung über Ihre Website erfasst hat: Server, Sicherheits-Header, DNS, Zertifikat, robots.txt und Geschwindigkeit bei echten Nutzern.",
  "Kategori başına 100 üzerinden puan": "Score von 100 je Kategorie",
  Sorunlu: "Nicht bestanden",
  "Puan etkisi": "Auswirkung auf den Score",
  "Puan etkisi, o kategorideki sorunların site puanından düşürdüğü puandır; hepsi düzelirse site puanına geri eklenir.":
    "Die Auswirkung auf den Score sind die Punkte, die die Probleme dieser Kategorie vom Website-Score abziehen; beheben Sie alle, kommen sie wieder hinzu.",
  "Denetim tarihine göre site puanı": "Website-Score nach Audit-Datum",
  "1. Puan dağılımı ve kontroller": "1. Score-Aufschlüsselung und Prüfungen",
  "Denetim, her sorun türünü bir kontrol olarak çalıştırır. Bulgusu olan kontrol sorunlu, ölçülüp temiz çıkan geçti sayılır; verisi toplanamayan kontrol ölçülmedi olarak kalır, ne geçti ne kaldı sayılır.":
    "Das Audit führt jede Problemart als Prüfung aus. Eine Prüfung mit Befunden ist nicht bestanden, eine gemessene ohne Befund ist bestanden, und eine, deren Daten nicht erfasst werden konnten, bleibt nicht gemessen: Sie zählt weder als bestanden noch als nicht bestanden.",
  "Ölçülmedi ({count})": "Nicht gemessen ({count})",
  "Ek C. Geçen ve ölçülemeyen kontroller":
    "Anhang C. Bestandene und nicht gemessene Prüfungen",
  "Sorun çıkmayan kontroller ve verisi toplanamadığı için sonuç verilmeyen kontroller.":
    "Prüfungen ohne Befund und Prüfungen ohne Ergebnis, weil ihre Daten nicht erfasst werden konnten.",
  "Ana içeriğin görünmesi": "Hauptinhalt erscheint",
  "Tıklamaya tepki": "Reaktion auf Tippen",
  "Görsel kayma": "Layoutverschiebung",
  "İlk içerik": "Erster Inhalt",
  "Sunucunun ilk yanıtı": "Erste Serverantwort",
  İyileştirilmeli: "Verbesserungsbedarf",
  Mükemmel: "Ausgezeichnet",
  "Yapılacak her iş tek listede, en çok kazandıranı üstte. Search Console bağlıysa trafik getiren sayfalardaki işler öne çıkar.":
    "Alle Aufgaben in einer Liste, die wertvollsten zuerst. Mit verbundener Search Console rücken Arbeiten an Seiten mit Traffic nach oben.",
  "Denetimin yaptığı her kontrol, kategorisine göre: geçenler, kalanlar ve ölçülemeyenler.":
    "Jede Prüfung des Audits nach Kategorie: bestanden, nicht bestanden und nicht gemessen.",
  "Küçük iş": "Kleine Aufgabe",
  "Orta iş": "Mittlere Aufgabe",
  "Büyük iş": "Große Aufgabe",
  "{url} adresinin telefondaki görünümü": "{url} auf dem Smartphone",
  "Mobil hız ölçümünün son ekran görüntüsü":
    "Letzter Screenshot aus dem mobilen Geschwindigkeitstest",
  "yaklaşık {duration} kaldı": "noch etwa {duration}",
  "Hız ölçümü: {pages} sayfa × {devices} cihaz, Google PageSpeed ile. Google dakikada sınırlı ölçüme izin verdiği için bu adım en uzunu.":
    "Geschwindigkeitstests: {pages} Seiten × {devices} Geräte, mit Google PageSpeed. Google erlaubt nur eine begrenzte Zahl von Tests pro Minute, daher ist das der längste Schritt.",
  "{done} / {total} ölçüm": "{done} / {total} Tests",
  "Site haritası ve ana sayfanın bağlantılarından adresler toplanıyor.":
    "Adressen aus der Sitemap und den Links der Startseite werden gesammelt.",
  "Her sayfa indirilip başlık, içerik, bağlantı ve teknik kontrollerden geçiriliyor.":
    "Jede Seite wird geladen; Titel, Inhalt, Links und Technik werden geprüft.",
  "Bulgular puanlanıyor ve sonuçlar hazırlanıyor.":
    "Befunde werden bewertet und die Ergebnisse vorbereitet.",
  "{shown} / {total} satır": "{shown} von {total} Zeilen",
  "{count} geçti": "{count} bestanden",
  "{count} sorunlu": "{count} mit Problemen",
  "{count} ölçülmedi": "{count} nicht gemessen",
  "{total} kontrol: {summary}": "{total} Prüfungen: {summary}",
  "Kısmi veri": "Unvollständige Daten",
  "{count} kontrol ölçülmedi: neden?": {
    one: "{count} Prüfung nicht gemessen: warum?",
    other: "{count} Prüfungen nicht gemessen: warum?",
  },
  "Düzeltilirse site puanına yaklaşık bu kadar eklenir; değerler toplanmaz.":
    "Ungefähr, was die Behebung zum Website-Score beiträgt; die Werte lassen sich nicht addieren.",
  "{points} puan kayıp": "{points} Punkte verloren",
  "Hız ölçümü (PageSpeed) bu denetimde sonuç vermedi; nedeni Hız sekmesinde.":
    "Der Geschwindigkeitstest (PageSpeed) lieferte in diesem Audit keine Ergebnisse; der Tab „Geschwindigkeit“ nennt den Grund.",
  "Sayfalar Google'da henüz kontrol edilmedi; Dizin durumu sekmesinden sorabilirsiniz.":
    "Die Seiten wurden noch nicht bei Google geprüft; Sie können das im Tab „Indexstatus“ anfragen.",
  "Karşılaştırma için bağlı bir Google Analytics mülkü ve sayfalarda bir G- etiketi gerekir.":
    "Für diesen Vergleich sind eine verbundene Google-Analytics-Property und ein G-Tag auf den Seiten nötig.",
  "Site hakkındaki bilginin bir kısmı (sertifika, alan adı kaydı, DNS) bu denetimde okunamadı.":
    "Einige Website-Informationen (Zertifikat, Domain-Registrierung, DNS) konnten in diesem Audit nicht gelesen werden.",
  "PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Ölçüm çalışınca gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.":
    "Der PageSpeed-Test lieferte in diesem Audit keine Ergebnisse: {error} Sobald er läuft, erscheinen hier Daten echter Nutzer (CrUX) und Laborergebnisse.",
  "Bu proje {auditedHost} için Google verisi okuyamıyor":
    "Dieses Projekt kann keine Google-Daten für {auditedHost} lesen",
  "Projenin Search Console bağlantısı {propertyHost} mülküne ait. Google'a {auditedHost} sayfalarını sormak günlük kotayı boşa harcardı, bu yüzden dizin durumu, site haritaları ve kota bu denetimde gösterilmiyor. {auditedHost} için ayrı bir proje açıp kendi mülküne bağlayın.":
    "Die Search-Console-Verbindung des Projekts gehört zur Property {propertyHost}. Google nach Seiten von {auditedHost} zu fragen, würde das Tageskontingent verschwenden; daher werden Indexstatus, Sitemaps und Kontingent für dieses Audit nicht angezeigt. Legen Sie für {auditedHost} ein eigenes Projekt an und verbinden Sie es mit der passenden Property.",
  "Siteyi ayrı proje olarak ekle": "Website als eigenes Projekt anlegen",
  "Henüz kontrol edilmedi": "Noch nicht geprüft",
  "Bu denetimin Google'a sorulmamış sayfaları. Son kontrol {date}":
    "Seiten aus diesem Audit, die noch nicht bei Google geprüft wurden. Letzte Prüfung {date}",
  "Bu denetimin Google'a sorulmamış sayfaları.":
    "Seiten aus diesem Audit, die noch nicht bei Google geprüft wurden.",
  "En çok sayfayı etkileyen {count} sorun türü; kalan {hidden} tür aşağıdaki listede.":
    "Die {count} Problemarten, die die meisten Seiten betreffen; die übrigen {hidden} stehen in der Liste unten.",
  "En çok sayfayı etkileyen {count} sorun türü.":
    "Die {count} Problemarten, die die meisten Seiten betreffen.",
  "Renklerin anlamı": "Was die Farben bedeuten",
  "Kısmi veri: {measured} / {total} ölçüm sonuç verdi. Ortalamalar yalnızca ölçülenlerden.":
    "Unvollständige Daten: {measured} von {total} Tests lieferten ein Ergebnis. Durchschnittswerte beruhen nur auf diesen.",
  "Ayarlar'dan ücretsiz bir PageSpeed anahtarı ekleyip denetimi yeniden başlatın.":
    "Hinterlegen Sie in den Einstellungen einen kostenlosen PageSpeed-Schlüssel und führen Sie das Audit erneut aus.",
  "PageSpeed anahtarı ekle": "PageSpeed-Schlüssel hinzufügen",
  "{count} ölçüm yapılamadı": {
    one: "{count} Test konnte nicht laufen",
    other: "{count} Tests konnten nicht laufen",
  },
  "Sayfa başına telefon ve bilgisayar ayrı ölçülür.":
    "Jede Seite wird auf Smartphone und Computer getrennt getestet.",
  Ölçülemedi: "Nicht gemessen",
  "Google'ın ücretsiz günlük ölçüm kotası doldu. Bu sitenizden kaynaklanmıyor: sayfalar yavaş sayılmadı, yalnızca ölçülemedi.":
    "Googles kostenloses Tageskontingent für Tests ist aufgebraucht. Das liegt nicht an Ihrer Website: Die Seiten wurden nicht als langsam eingestuft, sie konnten nur nicht gemessen werden.",
  "PageSpeed anahtarı olmadan Google'ın herkesle paylaşılan ücretsiz kotası kullanılıyor ve bu kota doldu. Bu sitenizden kaynaklanmıyor.":
    "Ohne PageSpeed-Schlüssel wird Googles kostenloses Kontingent genutzt, das sich alle teilen, und es ist aufgebraucht. Das liegt nicht an Ihrer Website.",
  "Google'ın dakikalık ölçüm sınırına takıldı. Bu sitenizden kaynaklanmıyor; bir süre sonra yeniden deneyin.":
    "Die Tests haben Googles Minutenlimit erreicht. Das liegt nicht an Ihrer Website; versuchen Sie es etwas später erneut.",
  "Google'ın ölçüm aracı bu sayfalar için sonuç döndürmedi. Ayrıntı aşağıdaki listede.":
    "Googles Testwerkzeug lieferte für diese Seiten keine Ergebnisse. Die Liste unten enthält die Details.",
  "Yapılacaklar ({count})": "Aufgaben ({count})",
  "Kontroller ({count})": "Prüfungen ({count})",
  "Hız ({measured}/{total})": "Geschwindigkeit ({measured}/{total})",
  "İlk denetim. Puanın seyri bir sonrakinde başlar.":
    "Erstes Audit. Der Score-Verlauf beginnt mit dem nächsten.",
  "Kritik sorun": "Kritische Probleme",
  İyileştirme: "Verbesserungen",
  "Geçen kontrol": "Bestandene Prüfungen",
  "Veri toplanamadı": "Keine Daten erfasst",
  "{measured}/{total} kontrol ölçüldü": "{measured}/{total} Prüfungen gemessen",
  "Bu denetimde veri toplanamadı": "In diesem Audit wurden keine Daten erfasst",
  "{category}: {state}. Kontrolleri aç":
    "{category}: {state}. Prüfungen öffnen",
  "{findings} bulgu, {types} sorun türü. Bulgu, bir sorunun bir sayfada görülmesidir. Bir gruba tıklayın, liste yalnızca onları göstersin.":
    "{findings} Befunde, {types} Problemarten. Ein Befund ist ein Problem auf einer Seite. Klicken Sie auf eine Gruppe, damit die Liste nur diese zeigt.",
  "{allowed}/{total} izinli": "{allowed}/{total} erlaubt",
  "{present}/{total} var": "{present}/{total} vorhanden",
  "Sertifikanın süresi doldu": "Zertifikat abgelaufen",
  "Sertifika {count} gün geçerli": {
    one: "Zertifikat noch {count} Tag gültig",
    other: "Zertifikat noch {count} Tage gültig",
  },
  "Site ya da kayıt servisi denetim sırasında bu bilgilere yanıt vermedi. Sitenizde bir sorun olduğu anlamına gelmez; denetimi yeniden çalıştırınca tekrar sorulur.":
    "Die Website oder die Registry hat diese Abfragen während des Audits nicht beantwortet. Das heißt nicht, dass mit Ihrer Website etwas nicht stimmt; sie werden beim nächsten Audit erneut gestellt.",
  "Çubuk, sayfadaki sorun türlerinin önem ağırlıklı toplamı: bir kritik sorun 40, bir uyarı 15, bir bilgi 3 sayılır. En uzun çubuk en çok iş çıkaran sayfa.":
    "Der Balken ist die nach Schweregrad gewichtete Summe der Problemarten der Seite: Ein kritisches Problem zählt 40, eine Warnung 15, ein Hinweis 3. Der längste Balken ist die Seite mit der meisten Arbeit.",
  "Önce bunlar:": "Hier anfangen:",
  "ilk {count} iş.": {
    one: "{count} Korrektur.",
    other: "die ersten {count} Korrekturen.",
  },
  "ilk {count} iş birlikte site puanını yaklaşık {points} puan yükseltir.": {
    one: "{count} Korrektur hebt den Website-Score um etwa {points} Punkte.",
    other:
      "zusammen heben die ersten {count} Korrekturen den Website-Score um etwa {points} Punkte.",
  },
  "ilk {count} iş, site puanını 1 puandan az yükseltir.": {
    one: "{count} Korrektur hebt den Website-Score um weniger als 1 Punkt.",
    other:
      "die ersten {count} Korrekturen heben den Website-Score um weniger als 1 Punkt.",
  },
  "Bu sorun tek başına düzeltilirse yaklaşık kazanç; değerler toplanmaz.":
    "Ungefähr, was die Behebung nur dieses Problems bringt; die Werte lassen sich nicht addieren.",
  "{points} puan": "{points} Punkte",
  "Yeni kontroller eklendi; bu karşılaştırma yalnızca iki denetimin de ölçtüğü kontrolleri kapsar.":
    "Neue Prüfungen kamen hinzu; dieser Vergleich umfasst nur Prüfungen, die beide Audits gemessen haben.",
  "Platform alan adı": "Plattform-Domain",
  "Site bir barındırma platformunun alt alan adında; kaydı ve DNS'i platforma ait olduğu için alan adı ve DNS kontrolleri yapılmadı.":
    "Die Website liegt auf einer Subdomain einer Hosting-Plattform; Registrierung und DNS gehören der Plattform, daher wurden die Domain- und DNS-Prüfungen übersprungen.",
  "sayı alınamadı (tarama sınırı)": "Anzahl nicht gelesen (Crawl-Limit)",
  "Twitter kartı: ölçülmedi.": "Twitter-Card: nicht gemessen.",
  "Google hizmet hesabı kullanılıyor (Ayarlar'da kayıtlı). Bir OAuth istemcisi de tanımlı; hizmet hesabı önce gelir.":
    "Das Google-Dienstkonto wird verwendet (in den Einstellungen gespeichert). Ein OAuth-Client ist ebenfalls eingerichtet; das Dienstkonto hat Vorrang.",
  "Google hizmet hesabı kullanılıyor (Ayarlar'da kayıtlı).":
    "Das Google-Dienstkonto wird verwendet (in den Einstellungen gespeichert).",
  "Google OAuth istemcisi kullanılıyor (Ayarlar'da kayıtlı).":
    "Der Google-OAuth-Client wird verwendet (in den Einstellungen gespeichert).",
  "Google OAuth istemcisi kullanılıyor (GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET ortam değişkenlerinden).":
    "Der Google-OAuth-Client wird verwendet (aus den Umgebungsvariablen GOOGLE_CLIENT_ID und GOOGLE_CLIENT_SECRET).",
  "Google erişimi henüz girilmedi: Ayarlar'a bir hizmet hesabı ya da OAuth istemcisi girin. Girmeden Search Console ve Analytics bağlanamaz.":
    "Noch kein Google-Zugang eingetragen: Fügen Sie in den Einstellungen ein Dienstkonto oder einen OAuth-Client hinzu. Ohne ihn können sich Search Console und Analytics nicht verbinden.",
  "Orta düzeyde. Kritik sorun yok; uyarı sorunları aramadaki performansı gölgeliyor.":
    "Mittel. Keine kritischen Probleme; Warnungen bremsen die Suchleistung.",
  "Zayıf. Kritik sorun yok, ama birikmiş uyarılar aramadaki performansı aşağı çekiyor; en çok puan getirenlerden başlayın.":
    "Schwach. Keine kritischen Probleme, aber angesammelte Warnungen bremsen die Suchleistung; beginnen Sie mit denen, die die meisten Punkte bringen.",
  "PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Gerçek kullanıcı verisi (CrUX) ölçülmedi.":
    "PageSpeed lieferte in diesem Audit kein Ergebnis: {error} Daten echter Nutzer (CrUX) wurden nicht gemessen.",
  "<strong>Laboratuvar ve gerçek kullanıcı verisi.</strong> Buradaki rakamlar Lighthouse'un laboratuvar ölçümüdür: tek bir sanal cihazda, kontrollü ağ ve işlemci koşulunda yapılır. Gerçek ziyaretçilerden toplanan alan verisi (Chrome Kullanıcı Deneyimi Raporu, CrUX), PageSpeed ölçümü varsa Anlık veri bölümündeki Temel Web Verileri tablosundadır. İkisi farklı çıkabilir. Google, sıralama sistemlerinde alan verisini (CrUX) kullanır; ama iyi bir değer tek başına sıralama garantisi vermez, içeriğin ilgili olması öncelik taşır.":
    "<strong>Labordaten und Daten echter Nutzer.</strong> Diese Werte sind Lighthouse-Labormessungen auf einem einzelnen simulierten Gerät unter kontrollierten Netzwerk- und CPU-Bedingungen. Felddaten echter Besucher (Chrome User Experience Report, CrUX) stehen in der Core-Web-Vitals-Tabelle im Abschnitt „Momentaufnahme“, sofern PageSpeed gemessen wurde. Beide können voneinander abweichen. Googles Rankingsysteme nutzen Felddaten (CrUX), doch ein guter Wert allein garantiert kein Ranking; relevante Inhalte kommen zuerst.",
  "Puanlar, o sorun tek başına tamamen düzeltilirse site puanına eklenecek yaklaşık değerdir; değerler toplanmaz.":
    "Die Punkte sind ungefähr das, was die vollständige Behebung nur dieses Problems zum Website-Score beiträgt; die Werte lassen sich nicht addieren.",
  Kapalı: "Aus",
  "{measured} / {total} ölçüm": "{measured} von {total} Messungen",
  "Denetim tarihi": "Audit-Datum",
  "{count} (üst sınır {max})": "{count} (Grenze {max})",
  "Google dizin verisi": "Google-Indexdaten",
  "Kritik kontrol": "Kritische Prüfungen",
  "Temiz çıkan": "Ohne Befund",
  // Audit failure and notice copy (auditFailureCopy.ts)
  "Denetim {phase} aşamasında durdu.":
    "Das Audit wurde in der Phase „{phase}“ beendet.",
  "Denetim tamamlanamadan durdu.": "Das Audit wurde vorzeitig beendet.",
  "adres keşfi": "URL-Erkennung",
  tarama: "Crawl",
  "hız ölçümü": "Geschwindigkeitsmessung",
  "sonuçların hazırlanması": "Ergebnisaufbereitung",
  "Bir adım zamanında bitmedi. Genelde site çok yavaş yanıt veriyor ya da bağlantıyı açık tutup bekletiyor.":
    "Ein Schritt wurde nicht rechtzeitig fertig. Meist antwortet die Website sehr langsam oder hält die Verbindung offen, ohne zu antworten.",
  "Birkaç dakika sonra yeniden deneyin. Yine olursa daha az sayfayla başlatın.":
    "Versuchen Sie es in ein paar Minuten erneut. Tritt es wieder auf, starten Sie mit weniger Seiten.",
  "Denetim, uygulamanın kullanabildiği belleğe sığmadı. Çok büyük sayfalar ya da çok fazla sayfa buna yol açar.":
    "Das Audit passte nicht in den Arbeitsspeicher, den die App nutzen kann. Sehr große Seiten oder zu viele Seiten verursachen das.",
  "Daha az sayfayla yeniden başlatın.":
    "Starten Sie es erneut mit weniger Seiten.",
  "Denetim, uygulamanın izin verdiği işlemci süresini aştı. Çok büyük ya da çok karmaşık sayfalar buna yol açar.":
    "Das Audit hat die Prozessorzeit überschritten, die die App erlaubt. Sehr große oder komplexe Seiten verursachen das.",
  "Sonuçlar uygulamanın veritabanına yazılırken hata oluştu. Disk dolu ya da veri dosyası başka bir programda kilitli olabilir.":
    "Beim Schreiben der Ergebnisse in die Datenbank der App ist ein Fehler aufgetreten. Möglicherweise ist die Festplatte voll oder die Datendatei von einem anderen Programm gesperrt.",
  "Diskte boş yer olduğunu kontrol edin, uygulamayı yeniden başlatın ve denetimi yeniden başlatın.":
    "Prüfen Sie, ob auf der Festplatte Platz frei ist, starten Sie die App neu und starten Sie dann das Audit erneut.",
  "Bir adımın sonucu uygulamanın saklayabildiği boyutu aştı. Çok büyük siteler buna yol açar.":
    "Das Ergebnis eines Schritts war größer, als die App speichern kann. Sehr große Websites verursachen das.",
  "Denetimi yürüten uygulamanın iç düzeni hata verdi.":
    "Die interne Audit-Engine der App hat einen Fehler gemeldet.",
  "Uygulamayı yeniden başlatın (tepsi menüsünde Yeniden başlat), sonra denetimi yeniden başlatın.":
    "Starten Sie die App neu (Neustart im Infobereichsmenü) und starten Sie dann das Audit erneut.",
  "Denetim yarıda kaldı. Uygulama denetimin ortasında kapanmış ya da yeniden başlamış olabilir.":
    "Das Audit wurde abgebrochen. Die App wurde möglicherweise mitten im Audit geschlossen oder neu gestartet.",
  "Uygulamanın açık kaldığından emin olun ve denetimi yeniden başlatın.":
    "Achten Sie darauf, dass die App geöffnet bleibt, und starten Sie das Audit erneut.",
  "Kayıtlı Google ve PageSpeed anahtarlarını açan kurulum anahtarı denetimi yürüten bölüme ulaşmamış. Anahtarlarınız silinmedi.":
    "Der Installationsschlüssel, der die gespeicherten Google- und PageSpeed-Schlüssel öffnet, hat den Teil der App, der Audits ausführt, nicht erreicht. Ihre Schlüssel wurden nicht gelöscht.",
  "Uygulamayı güncelleyin ya da yeniden başlatın, sonra denetimi yeniden başlatın.":
    "Aktualisieren oder starten Sie die App neu und starten Sie dann das Audit erneut.",
  "Denetim beklenmedik bir hatayla durdu.":
    "Das Audit wurde mit einem unerwarteten Fehler beendet.",
  "Denetimi yeniden başlatın. Tekrarlarsa Yardım'dan tanılama paketini indirip sorunu bildirin.":
    "Starten Sie das Audit erneut. Tritt es wieder auf, laden Sie in der Hilfe das Diagnosepaket herunter und melden Sie das Problem.",
  "Sorun sitenizde değil, uygulamada.":
    "Das Problem liegt in der App, nicht in Ihrer Website.",
  "Büyük olasılıkla sorun sitenizin yavaş yanıt vermesinde; uygulamada bir arıza yok.":
    "Wahrscheinlich antwortet Ihre Website langsam; die App ist in Ordnung.",
  "Nedeni belirlenemedi.": "Die Ursache konnte nicht ermittelt werden.",
  "{count} sayfa tarandı ve kaydedildi; aşağıdaki sonuçlar bu sayfalara dayanır.":
    {
      one: "{count} Seite wurde gecrawlt und gespeichert; die Ergebnisse unten beruhen darauf.",
      other:
        "{count} Seiten wurden gecrawlt und gespeichert; die Ergebnisse unten beruhen darauf.",
    },
  "Kayıtlı PageSpeed anahtarı okunamadı; hız ölçümü anahtarsız yapıldı.":
    "Der gespeicherte PageSpeed-Schlüssel konnte nicht gelesen werden; die Geschwindigkeitsmessung lief ohne Schlüssel.",
  "Tarama sonuçları etkilenmedi, ama hız ölçümü yalnızca ilk sayfalarla sınırlı kaldı. Uygulamayı güncelleyin ya da yeniden başlatın, sonra yeni bir denetim başlatın. Sürerse Ayarlar'dan PageSpeed anahtarını yeniden kaydedin.":
    "Die Crawl-Ergebnisse sind nicht betroffen, aber die Geschwindigkeitsmessung blieb auf die ersten Seiten beschränkt. Aktualisieren oder starten Sie die App neu und starten Sie dann ein neues Audit. Besteht das Problem weiter, speichern Sie den PageSpeed-Schlüssel in den Einstellungen erneut.",
  // Audit score standing: coverage, provisional score, tier caps
  "Kısmi puan": "Vorläufiger Score",
  "Gri çubuklar kısmi puandır: o denetimde kontrollerin önemli bir kısmı ölçülemedi.":
    "Graue Balken sind vorläufige Scores: Ein großer Teil der Prüfungen dieses Audits konnte nicht gemessen werden.",
  "{count} eksik denetim puansız olduğu için grafikte yok.": {
    one: "{count} unvollständiges Audit hat keinen Score und fehlt im Diagramm.",
    other:
      "{count} unvollständige Audits haben keinen Score und fehlen im Diagramm.",
  },
  "Kısmi puan — ölçüm kapsamı {percent}":
    "Vorläufiger Score — Messabdeckung {percent}",
  "Kontrollerin önemli bir kısmı ölçülemediği için bu puan kesin değil; derece verilmedi.":
    "Ein großer Teil der Prüfungen konnte nicht gemessen werden, daher ist dieser Score nicht endgültig und erhält keine Bewertung.",
  "Eksik denetim — puan verilmedi": "Unvollständiges Audit — kein Score",
  "Sorun listesi tam olmadığı için puan hesaplanmadı. Aşağıdaki bulgular taranan sayfalar için geçerli; tam bir puan için denetimi yeniden çalıştırın.":
    "Die Problemliste ist unvollständig, daher wurde kein Score berechnet. Die Befunde unten gelten für die gecrawlten Seiten; führen Sie das Audit für einen vollständigen Score erneut aus.",
  kısmi: "vorläufig",
  "{category} ölçülmedi: {reason}": "{category} nicht gemessen: {reason}",
  "{category} ölçülmedi.": "{category} nicht gemessen.",
  "{category} kontrollerinin çoğu ölçülmedi: {reason}":
    "{category}: die meisten Prüfungen nicht gemessen: {reason}",
  "{category} kontrollerinin çoğu ölçülmedi.":
    "{category}: die meisten Prüfungen nicht gemessen.",
  "hız ölçümü kapalıydı": "die Geschwindigkeitsmessung war ausgeschaltet",
  "PageSpeed kotası doldu": "das PageSpeed-Kontingent war aufgebraucht",
  "PageSpeed anahtarı yok": "kein PageSpeed-Schlüssel",
  "hız ölçümü yapılmadı": "es wurde keine Geschwindigkeitsmessung durchgeführt",
  "hız ölçümleri başarısız oldu": "die Geschwindigkeitsmessungen schlugen fehl",
  "Search Console'dan dizin verisi alınmadı":
    "keine Indexdaten aus der Search Console gelesen",
  "Puan, ölçülen {count} kontrolün sonucuna göre.": {
    one: "Score auf Grundlage der {count} gemessenen Prüfung.",
    other: "Score auf Grundlage der {count} gemessenen Prüfungen.",
  },
  "{count} kontrol ölçülemedi.": {
    one: "{count} Prüfung konnte nicht gemessen werden.",
    other: "{count} Prüfungen konnten nicht gemessen werden.",
  },
  "Her bulgu, önemine ve etkilediği sayfa oranına göre kendi kategorisinden puan düşer; site puanı yedi kategorinin ağırlıklı ortalamasıdır. Ölçülemeyen kontroller puanı ne artırır ne düşürür. Kontrollerin ağırlıklı kapsamı {coverage} değerinin altındaysa ya da Tarama, Dizine alma, İçerik veya Hız kategorisinde ölçülen kontrollerin oranı {heavy} değerinin altındaysa puan kısmidir ve derece verilmez. Kritik bir sorun varken puan en fazla {criticalCap}, {count} veya daha fazla uyarı varken en fazla {warningsCap} olur.":
    "Jeder Befund zieht in seiner Kategorie Punkte ab, je nach Schwere und Anteil der betroffenen Seiten; der Website-Score ist der gewichtete Durchschnitt der sieben Kategorien. Nicht messbare Prüfungen heben oder senken ihn nicht. Liegt die gewichtete Abdeckung unter {coverage} oder der gemessene Anteil von Crawling, Indexierung, Inhalt oder Geschwindigkeit unter {heavy}, ist der Score vorläufig und erhält keine Bewertung. Mit einem kritischen Problem beträgt der Score höchstens {criticalCap}, mit {count} oder mehr Warnungen höchstens {warningsCap}.",
  "Kritik sorun olduğu için puan en fazla {cap} olabilir. Önce kritik sorunlara bakın.":
    "Mit einem kritischen Problem kann der Score höchstens {cap} betragen. Beheben Sie zuerst die kritischen Probleme.",
  "{count} veya daha fazla uyarı olduğu için puan en fazla {cap} olabilir.":
    "Mit {count} oder mehr Warnungen kann der Score höchstens {cap} betragen.",
  "Denetim {count} sayfayla sınırlıydı; sitede daha fazla sayfa olabilir.": {
    one: "Das Audit war auf {count} Seite begrenzt; die Website kann mehr Seiten haben.",
    other:
      "Das Audit war auf {count} Seiten begrenzt; die Website kann mehr Seiten haben.",
  },
  "Bulunan adres: {found}, taranan: {crawled}":
    "Gefundene Adressen: {found}, gecrawlt: {crawled}",
  "Port: {actual} (ayarlanan: {configured})":
    "Port: {actual} (eingerichtet: {configured})",
  "seowatcher bu sefer {actual} numarasında çalışıyor çünkü {configured} başka bir program tarafından kullanılıyor (ör. eski bir Docker kopyası). Google bağlantısı {configured} için ayarlandı; o programı kapatıp seowatcher'ı yeniden başlatın.":
    "seowatcher läuft diesmal auf {actual}, weil ein anderes Programm {configured} belegt (z. B. eine alte Docker-Kopie). Die Google-Anmeldung ist für {configured} eingerichtet; schließen Sie dieses Programm und starten Sie seowatcher neu.",

  "Tüm sütunları ve işlemleri görmek için tabloyu yana kaydırın.":
    "Scrollen Sie seitlich, um alle Spalten und Aktionen zu sehen.",
  "Hız ölçümü istendi": "Geschwindigkeitsmessung angefordert",
};
