import type { Catalog } from "@/shared/i18n";

/** German for the cards and stats review: Opportunities, rankings, saved keywords and the setup verdict. */
export const deCards: Catalog = {
  "Etkilenen benzersiz sayfa: {pages} · Kontrol türü: {types}.":
    "Betroffene einzelne Seiten: {pages} · Prüfungsarten: {types}.",
  "Sayfa bulguları": "Befunde auf Seiten",
  "Her sayfa ve kontrol türü çifti bir bulgudur; aynı sayfa birden fazla kez sayılabilir.":
    "Jede Kombination aus Seite und Prüfungsart zählt als ein Befund; dieselbe Seite kann mehrfach gezählt werden.",
  "Site geneli kontroller": "Websiteweite Prüfungen",
  "Her sayfanın ayda kaç tıklama daha getirebileceği ve bunun için ne yapmanız gerektiği.":
    "Wie viele Klicks pro Monat jede Seite zusätzlich bringen könnte und was dafür zu tun ist.",
  "{start} – {end}": "{start} – {end}",
  "Son {days} gün · {period}. Search Console {lag} gün geriden gelir; Analytics oturumları da aynı günlerden okunur. Tahminler 30 güne ölçeklenir.":
    "Letzte {days} Tage · {period}. Search Console hinkt {lag} Tage hinterher; Analytics-Sitzungen werden für dieselben Tage gelesen. Schätzungen sind auf 30 Tage hochgerechnet.",
  "{count} sayfada · bu sayfalar bugün ayda {clicks} tıklama alıyor, kazanç bunun {share} kadarı":
    "Auf {count} Seiten · sie erhalten heute {clicks} Klicks pro Monat; der Gewinn entspricht {share} davon",
  "Önce şuna bakın": "Hier anfangen",
  "+{gain} tıklama/ay · {action}": "+{gain} Klicks/Monat · {action}",
  "Dönüşüm getiren sayfalar": "Seiten mit Conversions",
  "Analytics bağlanınca görünür": "Erscheint, sobald Analytics verbunden ist",
  "Listedeki sayfalardan dönüşüm gelmiyor":
    "Keine der aufgeführten Seiten konvertiert",
  "Kazanç gelirse ayda yaklaşık +{count} anahtar olay (tahmin) · listele":
    "Wenn der Gewinn eintritt, etwa +{count} Schlüsselereignisse pro Monat (Schätzung) · auflisten",
  "Kazanç beklenmeyen sayfalar": "Seiten ohne erwarteten Gewinn",
  "Zaten iyi sıradalar ve normal tıklanıyorlar ya da çok az gösterim aldılar; listede yoklar.":
    "Bereits gut platziert und normal geklickt oder zu selten gezeigt; sie stehen nicht in der Liste.",
  "Kazanç beklenen {total} sayfanın en büyük {count} tanesi listeleniyor; üstteki toplamlar hepsini kapsar.":
    "Die größten {count} von {total} Seiten mit Gewinn werden gezeigt; die Summen oben umfassen alle.",
  "Tahmin nasıl yapılır?": "Wie wird geschätzt?",
  "Marka aramaları": "Markensuchen",
  "Hesaba katılmadı ({terms}). Markanızı arayan sizi zaten bulur; onların yüksek tıklama oranı diğer aramaları haksız yere düşük gösterirdi.":
    "Nicht berücksichtigt ({terms}). Wer Ihre Marke sucht, findet Sie ohnehin; deren hohe Klickrate ließe alle anderen Suchen zu niedrig aussehen.",
  "Alan adınızdan tahmin edilen terimlerle ayrıldı ({terms}). Doğru terimleri Arama performansı ekranında onaylayabilirsiniz.":
    "Mit aus Ihrer Domain abgeleiteten Begriffen getrennt ({terms}). Die richtigen Begriffe können Sie in der Suchleistung bestätigen.",
  "Marka terimi tanımlı değil, bu yüzden marka aramaları da karşılaştırmaya dahil. Arama performansı ekranında tanımlayabilirsiniz.":
    "Keine Markenbegriffe festgelegt, daher fließen Markensuchen in den Vergleich ein. Sie können sie in der Suchleistung festlegen.",
  "Analytics ne katıyor?": "Was fügt Analytics hinzu?",
  "Analytics bağlı değil. Bağlarsanız her sayfanın dönüşüm getirip getirmediği tahminin yanında görünür.":
    "Analytics ist nicht verbunden. Verbinden Sie es, um neben jeder Schätzung zu sehen, ob die Seite konvertiert.",
  "Analytics bu kez yanıt vermedi; tahminler yalnızca Search Console'dan.":
    "Analytics hat diesmal nicht geantwortet; die Schätzungen stammen nur aus der Search Console.",
  "Tahmini değiştirmez; yanında bir etiket olarak durur. Bir sayfa en az {sessions} organik oturum aldıysa dönüşümlerine bakılır, daha azında oran gürültüdür. {matched} / {total} sayfanın Analytics karşılığı var.":
    "Es ändert die Schätzung nicht, sondern steht als Kennzeichnung daneben. Conversions einer Seite werden erst ab {sessions} organischen Sitzungen bewertet; darunter ist die Rate Rauschen. {matched} / {total} Seiten haben eine Analytics-Entsprechung.",
  "Hangi aramaların kazandıracağını görmek için bir satıra tıklayın.":
    "Klicken Sie auf eine Zeile, um zu sehen, aus welchen Suchen der Gewinn kommt.",
  "Seçtiğiniz iş türü ya da hızlı filtre bu dönemde hiçbir sayfayla eşleşmedi. Filtreleri kaldırın ya da dönemi genişletin.":
    "Die gewählte Arbeitsart oder der Schnellfilter passt in diesem Zeitraum zu keiner Seite. Filter entfernen oder Zeitraum erweitern.",
  "Sitenizin aynı sıradaki marka dışı aramaları: {ctr}":
    "Nicht-Marken-Suchen Ihrer Website an derselben Position: {ctr}",
  "site {ctr} · {value} puan": "Website {ctr} · {value} Pkt.",
  "Bu sayfanın aramaları sitenizin kendi tıklama oranlarına ulaşırsa ayda gelebilecek ek tıklama.":
    "Zusätzliche Klicks pro Monat, wenn die Suchen dieser Seite die Klickraten Ihrer eigenen Website erreichten.",
  "/ay": "/Mon.",
  "Gösterilenlerin yüzde kaçı tıklandı. Altındaki satır, sayfanın marka dışı aramalarını sitenizin aynı sıradaki aramalarıyla yüzde puan olarak karşılaştırır.":
    "Anteil der Impressionen, die geklickt wurden. Die Zeile darunter vergleicht die Nicht-Marken-Suchen der Seite mit denen Ihrer Website an derselben Position, in Prozentpunkten.",
  "Analytics'teki organik oturumlar, Search Console ile aynı günler için. Analytics ekranı dünü de saydığı için sayı orada biraz farklı olabilir.":
    "Organische Sitzungen in Analytics, für dieselben Tage wie die Search Console. Der Analytics-Bildschirm zählt bis gestern, daher kann die Zahl dort leicht abweichen.",
  "+{gain} tıklama/ay": "+{gain} Klicks/Monat",
  "Bugünkü dönüşüm oranıyla bu, ayda yaklaşık +{count} anahtar olay eder (tahmin).":
    "Bei heutiger Conversion-Rate sind das etwa +{count} Schlüsselereignisse pro Monat (Schätzung).",
  "ayda {count} gösterim": "{count} Impressionen pro Monat",
  "Değer (Analytics)": "Wert (Analytics)",
  Mesafe: "Abstand",
  "{position}. sıra → hedef {target}": "Position {position} → Ziel {target}",
  "Hangi aramalar?": "Welche Suchen?",
  "Kazanç/ay": "Gewinn/Monat",
  "hedef {ctr}": "Ziel {ctr}",
  "Ne yapmalı? {action}": "Was tun? {action}",
  "Ortalama {position}. sırada; {impressions} gösterimden {clicks} tıklama aldı. Aşağıdaki aramalar sitenizin kendi tıklama oranlarına ulaşırsa ayda yaklaşık {gain} tıklama daha gelir.":
    "Durchschnittliche Position {position}; {clicks} Klicks aus {impressions} Impressionen. Erreichten die Suchen unten die Klickraten Ihrer Website, kämen etwa {gain} Klicks pro Monat hinzu.",
  "{events} anahtar olay · dönüşen oturum oranı {rate}":
    "{events} Schlüsselereignisse · {rate} der Sitzungen konvertieren",
  "{sessions} oturum, hiç dönüşüm yok":
    "{sessions} Sitzungen, keine Conversions",
  "{sessions} oturum; değerini söylemek için az":
    "{sessions} Sitzungen; zu wenige, um den Wert zu beurteilen",
  "{sessions} oturum": "{sessions} Sitzungen",
  "Her sayfa için tek bir soru: ayda kaç tıklama daha getirebilir ve bunun için ne yapmalı? Tahmin, sitenizin kendi tıklama oranlarından yapılır. Kazancı olmayan sayfalar listede yer almaz. Bir satıra tıklayınca hangi aramaların bu kazancı getirdiğini görürsünüz.":
    "Eine Frage pro Seite: Wie viele Klicks pro Monat könnte sie zusätzlich bringen, und was ist dafür zu tun? Die Schätzung nutzt die Klickraten Ihrer eigenen Website. Seiten ohne Gewinn fehlen in der Liste. Ein Klick auf eine Zeile zeigt, aus welchen Suchen der Gewinn kommt.",
  "Fırsatlar için Search Console gerekir":
    "Chancen brauchen die Search Console",
  "Tahminler Search Console'daki aramalardan hesaplanır. Analytics'i de bağlarsanız hangi sayfaların dönüşüm getirdiği yanında görünür.":
    "Die Schätzungen werden aus Ihren Suchen in der Search Console berechnet. Verbinden Sie auch Analytics, um zu sehen, welche Seiten konvertieren.",
  "Tahmin için veri henüz az": "Noch zu wenig Daten für eine Schätzung",
  "{start} – {end} aralığında sitenizin tıklama oranını sıraya göre ölçecek kadar arama yok. Dönemi 90 güne genişletmeyi deneyin.":
    "Zwischen {start} und {end} gibt es nicht genug Suchen, um die Klickrate Ihrer Website nach Position zu messen. Erweitern Sie den Zeitraum auf 90 Tage.",
  "Bu dönemde kazanç beklenen sayfa yok":
    "In diesem Zeitraum hat keine Seite einen erwarteten Gewinn",
  "{start} – {end} aralığında {count} sayfanın hepsi ya zaten iyi sırada ve normal tıklanıyor ya da tahmin için çok az gösterim aldı.":
    "Zwischen {start} und {end} sind alle {count} Seiten entweder bereits gut platziert und normal geklickt oder hatten zu wenige Impressionen für eine Schätzung.",
  "Kazanç hangi işte?": "Wo liegt der Gewinn?",
  "Her satır, o işle ayda gelebilecek ek tıklama. Bir satıra basınca tablo o işe daralır.":
    "Jede Zeile zeigt die zusätzlichen Klicks pro Monat, die diese Arbeit bringen könnte. Ein Klick auf die Zeile filtert die Tabelle.",
  "İş türleri": "Arbeitsarten",
  "Bu türde kazanç beklenen sayfa yok.":
    "Keine Seite hat einen Gewinn aus dieser Arbeit.",
  "tıklama/ay": "Klicks/Monat",
  "Tahmini kazanç (tıklama/ay)": "Geschätzter Gewinn (Klicks/Monat)",
  "Yapılacak iş": "Zu erledigen",
  dönüşüyor: "konvertiert",
  "dönüşüm yok": "keine Conversions",
  "az trafik": "wenig Traffic",
  "Dönüşüm getirenler": "Mit Conversions",
  "Trafik var, dönüşüm yok": "Traffic, keine Conversions",
  "Başlık ve açıklama işi": "Titel und Beschreibung",
  "Başlığı ve açıklamayı yenileyin": "Titel und Beschreibung überarbeiten",
  "İlk sayfada ama sitenizin aynı sıradaki aramalarına göre az tıklanıyor. Sıra değişmeden tıklama artar.":
    "Auf Seite eins, aber seltener geklickt als Ihre Suchen an derselben Position. Mehr Klicks ohne Positionswechsel.",
  "aynı sıra, sitenizin tıklama oranı":
    "gleiche Position, Klickrate Ihrer Website",
  "Başlığı, aşağıdaki aramaların ilk kelimelerde karşılık bulacağı biçimde yeniden yazın.":
    "Schreiben Sie den Titel so um, dass die Suchen unten in den ersten Worten beantwortet werden.",
  "İki hafta sonra bu ekrana dönüp tahmini kazancın küçülüp küçülmediğine bakın.":
    "Kommen Sie in zwei Wochen zurück und prüfen Sie, ob der geschätzte Gewinn kleiner geworden ist.",
  "İlk sayfada, 4-10. sıra": "Auf Seite eins, Positionen 4-10",
  "İçeriği güçlendirin": "Inhalt stärken",
  "İçeriği, aşağıdaki aramalara rakiplerden daha eksiksiz yanıt verecek şekilde genişletin.":
    "Erweitern Sie den Inhalt, damit er die Suchen unten vollständiger beantwortet als die Konkurrenz.",
  "Sitenizdeki ilgili sayfalardan bu sayfaya, aramayı anlatan bir bağlantı metniyle iç bağlantı verin.":
    "Verlinken Sie diese Seite von verwandten Seiten Ihrer Website mit einem Linktext, der die Suche beschreibt.",
  "Başlıkta ve ilk paragrafta en çok kazandıracak aramayı açıkça geçirin.":
    "Nennen Sie die Suche mit dem größten Gewinn deutlich im Titel und im ersten Absatz.",
  "2. sayfada, 11-20. sıra": "Auf Seite zwei, Positionen 11-20",
  "İç bağlantı verin, içeriği genişletin": "Intern verlinken, Inhalt erweitern",
  "İlk sayfanın hemen arkasında. İlk sayfaya çıkana kadar neredeyse hiç tıklanmaz.":
    "Knapp hinter Seite eins. Bis sie Seite eins erreicht, wird sie kaum geklickt.",
  "ilk sayfa, 6-10. sıra": "Seite eins, Positionen 6-10",
  "Sayfanın bu aramalar için gerçekten doğru sayfa olduğunu kontrol edin; değilse doğru sayfaya yönlendirin.":
    "Prüfen Sie, ob dies wirklich die richtige Seite für diese Suchen ist; falls nicht, leiten Sie zur richtigen weiter.",
  "Eksik alt başlıkları, örnekleri ve sık sorulan soruları ekleyin.":
    "Ergänzen Sie fehlende Zwischenüberschriften, Beispiele und häufige Fragen.",
  "Ana menüden ya da güçlü sayfalardan bu sayfaya iç bağlantı verin.":
    "Verlinken Sie diese Seite aus dem Hauptmenü oder von starken Seiten.",
  "Derinde, 21. sıradan sonra": "Weit hinten, nach Position 20",
  "Birleştirin ya da bırakın": "Zusammenführen oder aufgeben",
  "Talep var ama sayfa çok geride. Genişletmek mi, başka bir sayfayla birleştirmek mi, bırakmak mı, karar verin.":
    "Es gibt Nachfrage, aber die Seite liegt weit hinten. Entscheiden Sie: erweitern, mit einer anderen Seite zusammenführen oder aufgeben.",
  "Aynı konuya değinen başka bir sayfanız varsa ikisini birleştirip eskisinden yönlendirme kurun.":
    "Wenn eine andere Seite dasselbe Thema behandelt, führen Sie beide zusammen und leiten Sie von der alten weiter.",
  "Sayfa bu konunun cevabıysa eksik bölümleri yazın ve iç bağlantı verin.":
    "Ist die Seite die Antwort auf dieses Thema, schreiben Sie die fehlenden Abschnitte und verlinken Sie sie intern.",
  "Tahmini kazanç küçükse sayfayı bırakın; emeği daha yakın fırsatlara harcayın.":
    "Ist der geschätzte Gewinn klein, lassen Sie die Seite und investieren Sie die Mühe in nähere Chancen.",
  "Bu bilgisayarda {start} – {end} arasının geçmişi saklı; Google'ın 16 ay sınırı buna uygulanmaz.":
    "Der Verlauf von {start} bis {end} ist auf diesem Computer gespeichert; Googles 16-Monats-Grenze gilt dafür nicht.",
  "{from} → {to}. sıra · {impressions} gösterim":
    "Position {from} → {to} · {impressions} Impressionen",
  "Önceki aynı uzunluktaki döneme göre, gösterimle tartılarak: çok aranan bir sorgunun küçük hareketi az arananın büyük hareketinden önce gelir.":
    "Gegenüber dem vorherigen gleich langen Zeitraum, gewichtet nach Impressionen: Eine kleine Bewegung einer häufig gesuchten Suchanfrage steht vor einer großen einer seltenen.",
  "{count} sorgunun ortalama sırası; sağdaki sayı önceki döneme göre değişim. Bir çubuğa tıklayınca tablo o gruba göre daralır.":
    "Durchschnittliche Position von {count} Suchanfragen; die Zahl rechts ist die Änderung gegenüber dem vorherigen Zeitraum. Ein Klick auf einen Balken filtert die Tabelle.",
  "Önceki döneme göre bu gruba giren ya da çıkan sorgu sayısı":
    "Suchanfragen, die seit dem vorherigen Zeitraum in diese Gruppe kamen oder sie verließen",
  "Bu listede en çok gösterim alan dörtte bir: {impressions} ve üstü gösterim.":
    "Das Viertel dieser Liste mit den meisten Impressionen: {impressions} oder mehr.",
  "{value} sıra yükseldi": "{value} Plätze gestiegen",
  "{value} sıra geriledi": "{value} Plätze gefallen",
  "Önceki {days} güne göre": "Gegenüber den vorherigen {days} Tagen",
  "Analytics {ga4} gün, Search Console {gsc} gün geriden gelir; bu yüzden buradaki günler üstteki tıklama kutularından farklıdır. Değişimler önceki aynı uzunluktaki döneme göredir.":
    "Analytics hinkt {ga4} Tag hinterher, die Search Console {gsc} Tage; daher weichen die Tage hier von den Klick-Kacheln oben ab. Änderungen beziehen sich auf den vorherigen gleich langen Zeitraum.",
  "Kurulum tamam": "Einrichtung vollständig",
  "Kurulum {done} / {total}": "Einrichtung {done} / {total}",
  "Kurulumda eksik: {items}.": "In der Einrichtung fehlt: {items}.",
  Tamamla: "Vervollständigen",
  "Güncel denetim": "Aktuelles Audit",
  "Yapay zeka ajanı": "KI-Agent",

  Denetle: "Prüfen",

  "öneri, sayılmaz": "Empfehlung, nicht gezählt",

  "Kullanılmıyor, hizmet hesabı bağlı":
    "Nicht verwendet, ein Dienstkonto ist verbunden",
  "Uygulamanın durumu": "Zustand der App",
  "Bu kurulumun kendisi. Bir projenin kurulum listesi Panel'de ve Proje bilgisi'nde.":
    "Diese Installation selbst. Die Einrichtungsliste eines Projekts finden Sie in der Übersicht und in der Projektinfo.",
  Site: "Website",
  "Bu projede {count} farklı site denetlenmiş:":
    "In diesem Projekt wurden {count} verschiedene Websites geprüft:",
  "Grafik ve değişim okları her zaman aynı sitenin denetimlerini karşılaştırır; birden çok site seçiliyken grafik gizlenir.":
    "Diagramm und Änderungspfeile vergleichen immer Audits derselben Website; bei mehreren Websites wird das Diagramm ausgeblendet.",
  "Ek tıklama tahmini": "Geschätzte Zusatzklicks",
  "Kontrol edilen {checked} sayfa içinde. Google başka bir adresi asıl saydı: bu sayfaların canonical etiketini ve iç bağlantılarını kontrol edin.":
    "Von {checked} geprüften Seiten. Google hat eine andere Adresse als Hauptseite gewählt: Prüfen Sie Canonical-Tag und interne Links dieser Seiten.",
  "Kontrol edilen {checked} sayfanın hiçbirinde Google başka bir adresi asıl saymadı.":
    "Bei keiner der {checked} geprüften Seiten hat Google eine andere Adresse als Hauptseite gewählt.",
  "En fazla kazanılabilecek tıklama / ay (üst sınır)":
    "Höchstens so viele Zusatzklicks / Monat (Obergrenze)",
  "Aramaların toplamı daha büyük; sayfanın tamamı hedef orana ulaşsa alacağı kadarla sınırlandı.":
    "Die Suchen ergeben zusammen mehr; begrenzt auf das, was die ganze Seite bei der Zielrate bekäme.",
  "2. sayfa, 11-20. sıra": "Seite zwei, Positionen 11-20",

  "Trafiği yüksek, dönüşümü düşük sayfa":
    "Seiten mit viel Traffic und wenig Conversions",
  "Listede gösteriliyor": "In der Liste gezeigt",
  Listele: "Auflisten",
  "“{query}” için bir basamak yükselme fırsatı":
    "Chance, „{query}“ eine Stufe nach oben zu bringen",
  "ilk {count} iş birlikte {days} günde en fazla {clicks} ek tıklama getirebilir (üst sınır).":
    "zusammen könnten die ersten {count} Aufgaben in {days} Tagen höchstens {clicks} Zusatzklicks bringen (Obergrenze).",

  "Ortalama sırası 4–20 olan {count} sorgu; her biri bir basamak yükselirse en fazla {clicks} ek tıklama (üst sınır).":
    "{count} Suchanfragen mit durchschnittlicher Position 4–20; steigt jede eine Stufe, höchstens {clicks} Zusatzklicks (Obergrenze).",
  "İlk sayfada ama ilk üçün altında. Bir basamak yükselmek (6-10'dan 4-5'e, 4-5'ten 2-3'e) tıklamayı belirgin artırır.":
    "Auf Seite eins, aber unter den ersten drei. Eine Stufe höher (6-10 auf 4-5, 4-5 auf 2-3) bringt spürbar mehr Klicks.",
  "bir basamak yukarı": "eine Stufe höher",
  "Her sayfanın Google'da çıktığı her arama ayrı ayrı ele alınır. İlk sayfadaki bir arama sitenizin aynı sıradaki aramalarının tıklama oranının %70'inin altındaysa kazanç o orana ulaşmaktır (başlık işi). Diğer her arama yalnızca bir basamak yükselir: 6-10. sıradan 4-5'in oranına, 4-5. sıradan 2-3'ün oranına, 2. sayfadan ilk sayfanın (6-10. sıra) oranına, daha geriden 2. sayfanın (11-20. sıra) oranına. Bir sayfanın toplamı, aramaları sıra gruplarına ayrılıp her grup bir basamak yükselse alacağı ek tıklamayı geçemez. Oranlar başka sitelerden değil, sizin sitenizden ölçülür; bu yüzden üstteki sayı bir üst sınırdır, söz değildir.":
    "Jede Suche, für die eine Seite erscheint, wird einzeln betrachtet. Liegt eine Suche auf Seite eins unter 70 % der Klickrate Ihrer Suchen an dieser Position, ist der Gewinn das Erreichen dieser Rate (Titelarbeit). Jede andere Suche steigt nur eine Stufe: von 6-10 auf die Rate von 4-5, von 4-5 auf die Rate von 2-3, von Seite zwei auf die Rate von Seite eins (6-10), von weiter hinten auf die Rate von Seite zwei (11-20). Die Summe einer Seite übersteigt nie, was ihre Suchen gewönnen, wenn jede Gruppe auf derselben Position eine Stufe aufstiege. Die Raten stammen von Ihrer Website; die Zahl oben ist eine Obergrenze, kein Versprechen.",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. Her biri bir basamak yükselirse (6-10'dan 4-5'e, 4-5'ten 2-3'e, 11-20'den ilk sayfaya) birlikte en fazla {clicks} ek tıklama getirebilir (üst sınır).":
    "{count} Suchanfragen mit durchschnittlicher Position 4 bis 20 und mindestens {impressions} Impressionen. Steigt jede eine Stufe (6-10 auf 4-5, 4-5 auf 2-3, 11-20 auf Seite eins), bringen sie zusammen höchstens {clicks} Zusatzklicks (Obergrenze).",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. Olası kazanç, sorgu bir basamak yükselirse (6-10'dan 4-5'e, 4-5'ten 2-3'e, 11-20'den ilk sayfaya) beklenen en fazla ek tıklamadır.":
    "{count} Suchanfragen mit durchschnittlicher Position 4 bis 20 und mindestens {impressions} Impressionen. Der mögliche Gewinn sind die höchstens zu erwartenden Zusatzklicks, wenn eine Suchanfrage eine Stufe steigt (6-10 auf 4-5, 4-5 auf 2-3, 11-20 auf Seite eins).",

  "Karşılaştırma yapılamadı: tarama kapsamları farklı veya bilinmiyor.":
    "Kein Vergleich möglich: Der Umfang der Crawls ist unterschiedlich oder unbekannt.",
  "{measured} / {total} kontrol ölçüldü.":
    "{measured} / {total} Prüfungen gemessen.",
  "Taranan kapsamda sorun bulunamadı.":
    "Im gecrawlten Bereich wurden keine Probleme gefunden.",
  "Ölçülmeyen kontroller var; tüm site için sağlıklı sonucu çıkarılamaz. Ayrıntılarda kapsamı kontrol edin.":
    "Einige Prüfungen wurden nicht gemessen. Eine Aussage zum Zustand der gesamten Website ist daher nicht möglich. Prüfen Sie den Umfang in den Details.",
  "+ {count} kontrol türü daha": "+ {count} weitere Prüfungsarten",
  "Google aramasından sitenize gelen tıklamalar.":
    "Klicks von der Google-Suche auf Ihre Website.",
  "Sitenizin Google sonuçlarında gösterilme sayısı.":
    "Wie oft Ihre Website in den Google-Ergebnissen angezeigt wurde.",
  "Kurulum tercihleri": "Einrichtungseinstellungen",
  Denetimler: "Audits",
  "Bağlantı durumu yenilenemedi":
    "Verbindungsstatus konnte nicht aktualisiert werden",
  "Google yapılandırması okunamadı. Yenile ile tekrar deneyin.":
    "Die Google-Konfiguration konnte nicht gelesen werden. Versuchen Sie es mit Aktualisieren erneut.",
  "Site seçilmedi": "Keine Website ausgewählt",
  "Kendi sitenizin denetimini göstermek için proje ayarlarına alan adını girin.":
    "Geben Sie die Domain in den Projekteinstellungen ein, um das Audit Ihrer Website zu sehen.",
  "Son denetim başarısız": "Letztes Audit fehlgeschlagen",
  "Arama verisi için Search Console bağlantısını kontrol edin.":
    "Prüfen Sie die Search Console-Verbindung, um Suchdaten zu sehen.",
  "Arama verisi şu an okunamadı. Yenile ile tekrar deneyin.":
    "Suchdaten können gerade nicht gelesen werden. Versuchen Sie es mit Aktualisieren erneut.",
  "Arama özeti": "Suchübersicht",
  "Son {days} günde Google aramalarından {clicks} tıklama aldınız.":
    "Sie haben in {days} Tagen {clicks} Klicks aus der Google-Suche erhalten.",
  "Son yenileme başarısız; önbellekteki veriler gösteriliyor.":
    "Die letzte Aktualisierung ist fehlgeschlagen. Gespeicherte Daten werden angezeigt.",
  "Önceki dönem: {start} – {end}.": "Vorheriger Zeitraum: {start} – {end}.",
  "Son veri günü: {date}. Son {count} gün toplamlara dahil değil.":
    "Letzter Datentag: {date}. Die letzten {count} Tage sind nicht in den Summen enthalten.",
  "Google tarih bildirmedi; son günler dışarıda.":
    "Google hat kein Datum zur Vollständigkeit gemeldet. Die letzten Tage sind ausgeschlossen.",
  "Sorgu listesi satır sınırında kesildi; tahminler yalnızca alınan sorguları kapsar.":
    "Die Suchanfragenliste hat das Zeilenlimit erreicht. Schätzungen gelten nur für abgerufene Suchanfragen.",
  "Google bazı sorguları gizler; sorgu listesi site toplamının tamamı değildir.":
    "Google blendet einige Suchanfragen aus. Die Liste bildet nicht die gesamte Website-Summe ab.",
  "{value} (para birimi bilinmiyor)": "{value} (Währung unbekannt)",
  "Satış ölçümü doğrulanmadı; sıfır satış, mağaza olmadığı anlamına gelmez.":
    "Die Umsatzmessung ist nicht bestätigt. Null Verkäufe bedeuten nicht, dass es keinen Shop gibt.",
  "Analytics verisi sınırlı veya eksik. Bilinmeyen değerler çizilmez; dönem karşılaştırması gösterilmez.":
    "Analytics-Daten sind eingeschränkt oder unvollständig. Unbekannte Werte bleiben Lücken; Zeiträume werden nicht verglichen.",
  "Saat dilimi bilinmiyor": "Zeitzone unbekannt",
  "Google arama tıklamaları ile organik oturumlar farklı ölçümlerdir; Analytics diğer arama motorlarını da kapsar.":
    "Klicks aus der Google-Suche und organische Sitzungen messen Verschiedenes. Analytics umfasst auch andere Suchmaschinen.",
  "Google gizlilik eşiği nedeniyle bazı verileri göstermiyor.":
    "Google hält einige Daten aufgrund von Datenschutzschwellen zurück.",
  "Google bu raporu örneklenmiş veriden hesapladı.":
    "Google hat diesen Bericht aus Stichprobendaten berechnet.",
  "Bazı ölçümler hesap erişim kısıtı nedeniyle okunamadı. Analytics mülkündeki yetkinizi kontrol edin.":
    "Einige Messwerte konnten wegen Zugriffsbeschränkungen nicht gelesen werden. Prüfen Sie Ihre Berechtigungen in der Analytics-Property.",
  "Bazı satırlar Google tarafından birleştirildi; ayrıntılar eksik olabilir.":
    "Google hat einige Zeilen zusammengefasst. Details können fehlen.",
  "Ölçülen bulgulara göre önce şu işleri değerlendirin.":
    "Prüfen Sie anhand der gemessenen Befunde zuerst diese Aufgaben.",
  "Kurulum durumu okunamayanlar: {items}. Yenile ile tekrar deneyin.":
    "Einrichtungsstatus nicht lesbar für: {items}. Versuchen Sie es mit Aktualisieren erneut.",
  "Ölçülen kapsamda öncelikli iş bulunmadı.":
    "Im gemessenen Bereich wurde keine vorrangige Aufgabe gefunden.",
  "Denetim özeti okunamadı":
    "Audit-Zusammenfassung konnte nicht gelesen werden",
  "İlk denetim olup olmadığı bilinmiyor. Denetim geçmişini açın veya Yenile ile tekrar deneyin.":
    "Es ist unbekannt, ob bereits ein Audit existiert. Öffnen Sie den Audit-Verlauf oder versuchen Sie es mit Aktualisieren erneut.",
  "Son denetim {when}. Denetim bulguları yalnızca bu taramaya dayanır.":
    "Letztes Audit: {when}. Die Befunde beziehen sich nur auf diesen Crawl.",
  "Bazı veriler yenilenemedi; önbellekteki tarihleri kontrol edin.":
    "Einige Daten konnten nicht aktualisiert werden. Prüfen Sie die gespeicherten Zeitangaben.",
  Yenilendi: "Aktualisiert",
  "Veri alındı: {time}": "Daten abgerufen: {time}",
  "Günlük tıklamalar; soluk çizgi önceki dönemi gösterir.":
    "Tägliche Klicks; die blasse Linie zeigt den vorherigen Zeitraum.",
  "Bir üst sıra bandına çıkabilecek sorgular":
    "Suchanfragen mit Potenzial für das nächsthöhere Rangband",
  "Marka adları onaylandı.": "Markenbegriffe bestätigt.",
  "Marka adları öneriye göre ayrıldı.":
    "Markensuchanfragen wurden anhand vorgeschlagener Begriffe getrennt.",
  "Marka ayrımı yapılmadı.": "Markensuchanfragen wurden nicht getrennt.",
  "Bu kapsamda uygun sorgu bulunmadı.":
    "Keine passenden Suchanfragen in diesem Bereich.",
  "{count} sorgu bir üst sıra bandı için değerlendirildi.":
    "{count} Suchanfragen für das nächsthöhere Rangband bewertet.",
  "Yeterli örnek yok; ek tıklama üst sınırı hesaplanamadı.":
    "Zu wenige Beobachtungen, um eine Obergrenze für zusätzliche Klicks zu berechnen.",
  "Hesaplanabilen {known} sorguda en fazla {clicks} ek tıklama (üst sınır); {unknown} sorguda hesaplanamadı.":
    "Höchstens {clicks} zusätzliche Klicks aus {known} schätzbaren Suchanfragen (Obergrenze); {unknown} Suchanfragen nicht schätzbar.",
  "Bu bir tahmindir; sayfa bazlı Fırsatlar toplamına eklenmez.":
    "Dies ist eine Schätzung. Sie wird nicht zur seitenbasierten Chancensumme addiert.",
  "{count} kritik kontrol türü": "{count} kritische Prüfungsarten",
  "{count} uyarı kontrol türü": "{count} Prüfungsarten mit Warnungen",
  "Site geneli": "Websiteweit",
  "Sorgu arşivi": "Suchanfragenarchiv",
  "Karşılaştırma yalnızca iki taramada da ölçülen kontrolleri kapsar; diğer kontroller için değişim bilinmiyor.":
    "Der Vergleich umfasst nur Prüfungen, die in beiden Crawls gemessen wurden. Änderungen bei anderen Prüfungen sind unbekannt.",
};
