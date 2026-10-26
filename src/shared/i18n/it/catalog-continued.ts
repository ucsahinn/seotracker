/* eslint-disable max-lines -- locale translation data */
import type { Catalog } from "@/shared/i18n";

/** Italian for audit checks and report screens, Google access, survey and setup help. */
export const itCatalogContinued: Catalog = {
  "Yanıt gönderilemedi ({status})":
    "Impossibile inviare la risposta ({status})",
  "Yanıt gönderilemedi": "Impossibile inviare la risposta",
  "Bu kurulumdan daha önce yanıt verildi.":
    "Questa installazione ha già risposto.",
  "Çok hızlı yanıt gönderildi. Biraz sonra yeniden deneyin.":
    "Troppe risposte. Riprova tra poco.",
  "Kişisel bilgi paylaşmayın": "Non includere dati personali",
  "Adınız veya hesabınız alınmaz. Aynı tarayıcıda saklanan katılımcı anahtarıyla bir kez yanıt verilebilir; bu, kişi başına tek yanıt garantisi değildir. Yanıtınız yöneticiler tarafından görülebilir. Kişisel bilgi yazmayın.":
    "Non raccogliamo il tuo nome né il tuo account. È consentita una risposta per ogni chiave del browser salvata; questo non garantisce una sola risposta per persona. Gli amministratori possono vedere la tua risposta. Non includere dati personali.",
  Yanıtla: "Invia risposta",
  "Gönderiliyor…": "Invio…",
  "Denetim uygulamadaki bir hata yüzünden durdu.":
    "L'audit si è interrotto per un errore dell'app.",
  "Sorun sitenizde değil. Denetimi yeniden başlatın. Tekrarlarsa Yardım ekranından tanı paketini indirip sorun kaydına ekleyin. Hata kodu: {code}":
    "Il problema non è il tuo sito. Avvia di nuovo l'audit. Se succede ancora, scarica il pacchetto diagnostico da Aiuto e allegalo a una segnalazione. Codice errore: {code}",
  "Sayfadaki canonical adresi": "URL canonico nella pagina",
  "robots etiketleri": "Tag robots",
  "googlebot etiketleri": "Tag googlebot",
  "Sayfa başlığı": "Titolo della pagina",
  "Başlıktaki anlamlı kelime": "Parole significative nel titolo",
  "Lighthouse denetimi": "Audit Lighthouse",
  "Etkilenen öğe": "Elementi interessati",
  "Karşılanmayan koşul": "Condizione non soddisfatta",
  "Tahmini kazanç": "Risparmio stimato",
  "Üçüncü taraf kodların ana iş parçacığı süresi":
    "Tempo del thread principale del codice di terze parti",
  "Toplam indirme boyutu": "Dimensione totale del download",
  "Kırık dış bağlantı": "Link esterno non funzionante",
  Görseller: "Immagini",
  "Gömülü betik ve stil": "Script e stili inline",
  "Sayfaya yönlendirme olmadan ulaşılmıyor":
    "La pagina non si raggiunge senza un reindirizzamento",
  "Sunucu ilk yanıtı hızlı vermiyor": "La prima risposta del server è lenta",
  "Belge sıkıştırılmadan gönderiliyor":
    "Il documento viene inviato senza compressione",
  'Ana görselde loading="lazy" var': 'L\'immagine principale ha loading="lazy"',
  "Ana görsel sayfanın ilk HTML'inde yok":
    "L'immagine principale non è nell'HTML iniziale della pagina",
  'Ana görselde fetchpriority="high" yok':
    'L\'immagine principale non ha fetchpriority="high"',
  "{count} güvensiz (http) görsel, video ya da çerçeve": {
    one: "{count} immagine, video o frame non sicuro (http)",
    other: "{count} immagini, video o frame non sicuri (http)",
  },
  "{count} form bilgileri http adresine gönderiyor": {
    one: "{count} modulo invia a un indirizzo http",
    other: "{count} moduli inviano a un indirizzo http",
  },
  "{count} e-posta adresi açıkta": {
    one: "{count} indirizzo email in chiaro",
    other: "{count} indirizzi email in chiaro",
  },
  "{count} iç bağlantı http:// ile veriliyor": {
    one: "{count} link interno usa http://",
    other: "{count} link interni usano http://",
  },
  "{count} görsel {limit}'tan büyük": {
    one: "{count} immagine più grande di {limit}",
    other: "{count} immagini più grandi di {limit}",
  },
  "{value} (iyi: en çok {good}, kötü: {poor} üstü)":
    "{value} (buono: fino a {good}, scarso: oltre {poor})",
  "{value} (kötü sınırı: {limit})": "{value} (scarso oltre {limit})",
  "saha verisi (gerçek Chrome kullanıcıları)":
    "dati sul campo (utenti reali di Chrome)",
  "laboratuvar ölçümü (PageSpeed Insights)":
    "misurazione di laboratorio (PageSpeed Insights)",
  "alan adı bulunamadı": "dominio non trovato",
  hata: "errore",
  "en az {size}": "almeno {size}",
  'Sayfa "{text}" diyor, ama sunucu {status} döndürüyor':
    'La pagina dice "{text}", ma il server restituisce {status}',
  "{size} (sınır {limit})": "{size} (limite {limit})",
  "Yazı olarak işaretlenmiş {count} sayfa": {
    one: "{count} pagina contrassegnata come articolo",
    other: "{count} pagine contrassegnate come articoli",
  },
  "ve {count} tane daha": { one: "e {count} altro", other: "e altri {count}" },
  "Tahmini kazanç: {value}": "Risparmio stimato: {value}",
  "{count} adres, bu sitede {onHost}": {
    one: "{count} URL, {onHost} su questo sito",
    other: "{count} URL, {onHost} su questo sito",
  },
  "Lighthouse'un tahmini; en çok kazandıran sayfa için.":
    "Stima di Lighthouse, per la pagina che ne trae più vantaggio.",
  "Lighthouse bu denetimde bu ölçümleri raporlamadı, ya da denetim bu kontroller eklenmeden önce yapıldı.":
    "Lighthouse non ha riportato queste misurazioni in questo audit, oppure l'audit è stato eseguito prima che questi controlli venissero aggiunti.",
  "Dış bağlantı ve görsel boyutu kontrolü bu denetimde açık değildi ya da ölçülemedi.":
    "Il controllo dei link esterni e delle dimensioni delle immagini era disattivato per questo audit o non è stato possibile misurarlo.",
  "Bu kontroller denetimden sonra eklendi; yeni bir denetim onları da ölçer.":
    "Questi controlli sono stati aggiunti dopo questo audit; un nuovo audit li misura.",
  "Orta. Kritik sorun yok; en çok puan getiren uyarılardan başlayın.":
    "Discreto. Nessun problema critico; inizia dagli avvisi che valgono più punti.",
  "Zayıf. Kritik sorun yok, ama birikmiş uyarılar puanı aşağı çekiyor.":
    "Scarso. Nessun problema critico, ma gli avvisi accumulati abbassano il punteggio.",
  "Site haritasında başka bir siteye ait adresler var":
    "La sitemap elenca indirizzi di un altro sito",
  "Site haritanız bu sitenin değil, başka bir alan adının adreslerini listeliyor. Google bir site haritasındaki adresleri yalnızca haritayla aynı sitedeyse kabul eder; diğer sitenin robots.txt dosyası bu haritayı göstermiyorsa ya da o site Search Console'da sizin adınıza doğrulanmamışsa bu adresleri yok sayar.":
    "La tua sitemap elenca indirizzi di un altro dominio, non di questo sito. Google accetta le voci di una sitemap solo se sono sullo stesso sito della sitemap; a meno che il robots.txt dell'altro sito non punti a questa sitemap o quel sito non sia verificato per te in Search Console, Google ignora questi indirizzi.",
  "Site haritasını, adreslerin ait olduğu sitede yayınlayın ya da haritayı üreten ayarda sitenin adresini düzeltin (çoğu zaman eski bir alan adı ya da önizleme adresi kalmıştır). Bilerek başka siteye ait adresleri listeliyorsanız o sitenin robots.txt dosyasına bu haritayı gösteren bir Sitemap satırı ekleyin.":
    "Pubblica la sitemap sul sito a cui appartengono gli indirizzi, oppure correggi l'indirizzo del sito nell'impostazione che la genera (spesso resta un vecchio dominio o un indirizzo di anteprima). Se elenchi di proposito gli indirizzi di un altro sito, aggiungi al robots.txt di quel sito una riga Sitemap che punti a questa sitemap.",
  "robots.txt bazı yolları yalnızca Googlebot'a açıyor":
    "robots.txt apre alcuni percorsi solo a Googlebot",
  "robots.txt dosyanız bazı yolları tüm botlara (User-agent: *) kapatıyor ama Googlebot'a ayrıca izin veriyor. Bu araç Googlebot değil, o yüzden bu yollardaki sayfaları taramadı; denetimde görünmemeleri sorun olmadıkları anlamına gelmez. Google bu sayfaları tarayabilir.":
    "Il tuo robots.txt chiude alcuni percorsi a tutti i bot (User-agent: *) ma consente separatamente Googlebot. Questo strumento non è Googlebot, quindi non ha scansionato le pagine sotto quei percorsi; la loro assenza da questo audit non significa che vadano bene. Google può scansionarle.",
  "Bir şey yapmanız gerekmiyor. Bu sayfaları da denetlemek istiyorsanız ayrıntıdaki kuralları gözden geçirin; yalnızca Googlebot'a açık bırakmanın bir nedeni yoksa kuralı tüm botlar için aynı yapın.":
    "Non serve cambiare nulla. Se vuoi che anche queste pagine vengano analizzate, controlla le regole nei dettagli; se non c'è motivo di aprirle solo a Googlebot, rendi la regola uguale per tutti i bot.",
  "Sayfanın ilk görünümünü engelleyen dosyalar var":
    "Alcuni file bloccano il primo rendering della pagina",
  "Tarayıcı bazı CSS ve JavaScript dosyalarını indirip işlemeden sayfada hiçbir şey göstermiyor. Lighthouse, bunlar ertelenirse ilk içeriğin daha erken görüneceğini hesapladı; tahmini kazanç bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Il browser non mostra nulla della pagina finché non ha scaricato ed elaborato alcuni file CSS e JavaScript. Lighthouse ha calcolato che rimandarli farebbe apparire prima i primi contenuti; il guadagno stimato è nei dettagli del risultato. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Sayfanın ilk ekranı için gerekmeyen betiklere defer ya da async ekleyin, ilk ekran için gereken küçük CSS'i sayfaya gömün, kalan CSS'i sonradan yükleyin. WordPress'te bir önbellek eklentisinin \"JavaScript'i ertele\" ve \"kritik CSS\" ayarları bu işi yapar.":
    'Aggiungi defer o async agli script che non servono alla prima schermata, inserisci inline il poco CSS che le serve e carica il resto del CSS più tardi. Su WordPress lo fanno le impostazioni "rimanda JavaScript" e "CSS critico" di un plugin di cache.',
  "Sayfada kullanılmayan JavaScript yükleniyor":
    "La pagina carica JavaScript che non usa",
  "Sayfa, açılışta hiç çalışmayan JavaScript kodunu da indiriyor. Telefonda bu hem veri hem işlemci harcar ve sayfayı yavaşlatır. Lighthouse'un tahmin ettiği tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "La pagina scarica anche JavaScript che non viene mai eseguito durante l'apertura. Su un telefono costa sia dati sia tempo di processore e rallenta la pagina. Il risparmio stimato da Lighthouse è nei dettagli del risultato. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Kullanılmayan eklentileri ve etiketleri kaldırın, büyük betik paketlerini sayfaya göre bölün ve yalnızca gereken sayfada yükleyin. Hangi dosyanın ne kadar boşa indiğini PageSpeed Insights raporunda görürsünüz.":
    "Rimuovi plugin e tag inutilizzati, dividi i bundle di script grandi per pagina e caricali solo dove servono. PageSpeed Insights mostra quanta parte di ogni file è sprecata.",
  "Sayfada kullanılmayan CSS yükleniyor": "La pagina carica CSS che non usa",
  "Sayfa, bu sayfada hiçbir öğeye uygulanmayan stil kurallarını da indiriyor. Genelde tüm siteye tek bir büyük tema dosyası yüklendiğinde olur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "La pagina scarica anche regole di stile che non si applicano a nulla in questa pagina. Di solito succede quando un unico grande file del tema viene caricato su tutto il sito. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Tema ya da eklentilerin kullanılmayan stil dosyalarını kapatın; bir derleme aracı kullanıyorsanız kullanılmayan CSS'i temizleyen adımı açın.":
    "Disattiva i fogli di stile inutilizzati del tema o dei plugin; se usi uno strumento di build, attiva il passaggio che rimuove il CSS inutilizzato.",
  "JavaScript dosyaları sıkıştırılmamış (küçültülmemiş)":
    "I file JavaScript non sono minimizzati",
  "Bazı JavaScript dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Küçültme dosyayı anlamını değiştirmeden küçültür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alcuni file JavaScript vengono serviti con spazi e commenti, senza minimizzazione. La minimizzazione rende un file più piccolo senza cambiarne il comportamento. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Derleme aracınızda küçültmeyi (minify) açın ya da önbellek/CDN ayarlarından JavaScript küçültmeyi etkinleştirin.":
    "Attiva la minimizzazione nel tuo strumento di build, oppure abilita la minimizzazione JavaScript nelle impostazioni di cache o CDN.",
  "CSS dosyaları sıkıştırılmamış (küçültülmemiş)":
    "I file CSS non sono minimizzati",
  "Bazı CSS dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alcuni file CSS vengono serviti con spazi e commenti, senza minimizzazione. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Derleme aracınızda CSS küçültmeyi açın ya da önbellek/CDN ayarlarından CSS küçültmeyi etkinleştirin.":
    "Attiva la minimizzazione CSS nel tuo strumento di build, oppure abilitala nelle impostazioni di cache o CDN.",
  "Görseller gereğinden büyük indiriliyor":
    "Le immagini vengono scaricate più grandi del necessario",
  "Lighthouse sayfadaki bazı görsellerin daha küçük indirilebileceğini hesapladı: eski bir biçimde (JPEG, PNG) sunuluyorlar, sıkıştırılmamışlar ya da ekranda gösterildiklerinden çok daha büyük boyutta indiriliyorlar. Tahmini tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse ha calcolato che alcune immagini della pagina potrebbero essere scaricate più leggere: sono servite in un formato vecchio (JPEG, PNG), non sono compresse o vengono scaricate molto più grandi di come sono mostrate. Il risparmio stimato è nei dettagli del risultato. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Görselleri WebP ya da AVIF'e çevirin, sıkıştırın ve ekrandaki boyutlarına göre küçültün; farklı ekranlar için srcset ile birden çok boyut sunun. Çoğu CMS'te bir görsel optimizasyon eklentisi bunu otomatik yapar.":
    "Converti le immagini in WebP o AVIF, comprimile e ridimensionale alla dimensione a schermo; servi più dimensioni con srcset per schermi diversi. Nella maggior parte dei CMS lo fa automaticamente un plugin di ottimizzazione delle immagini.",
  "Dosyalar tarayıcıda yeterince uzun saklanmıyor":
    "I file non restano nel browser abbastanza a lungo",
  "Görsel, betik ve stil dosyaları kısa bir önbellek süresiyle ya da hiç önbellek bilgisi olmadan sunuluyor. Ziyaretçi siteye dönünce aynı dosyaları yeniden indirir. Lighthouse'un tahmin ettiği tekrar ziyaret tasarrufu bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "File di immagini, script e stili vengono serviti con una durata di cache breve o senza alcuna informazione di cache. Quando un visitatore torna, scarica di nuovo gli stessi file. Il risparmio stimato da Lighthouse per le visite successive è nei dettagli del risultato. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  'Değişmeyen dosyalara uzun bir Cache-Control süresi verin (örneğin max-age=31536000) ve dosya değiştiğinde adını değiştirin. Barındırma panelinde ya da CDN\'de "tarayıcı önbelleği" ayarı genelde bunu yapar.':
    'Assegna ai file che non cambiano una durata Cache-Control lunga (ad esempio max-age=31536000) e cambia il nome di un file quando ne cambia il contenuto. Di solito lo fa un\'impostazione "cache del browser" nel pannello di hosting o nella CDN.',
  "Sayfanın toplam indirme boyutu çok büyük":
    "La dimensione totale del download della pagina è molto grande",
  "Sayfayı açmak için indirilen her şeyin toplamı 2,5 MB'ı geçiyor. Mobil bağlantıda bu uzun bir yükleme ve ziyaretçinin veri paketinden harcama demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Tutto ciò che viene scaricato per aprire la pagina supera i 2,5 MB. Su una connessione mobile significa un caricamento lungo e dati consumati dal piano del visitatore. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "PageSpeed Insights raporunda en büyük dosyalara bakın. Genelde görseller, videolar ve büyük betik paketleridir: görselleri küçültün, videoyu tıklanınca yükleyin, gereksiz betikleri kaldırın.":
    "Guarda i file più grandi nel report di PageSpeed Insights. Di solito sono immagini, video e grandi bundle di script: riduci le immagini, carica i video al clic, rimuovi gli script non necessari.",
  "Tarayıcıda oluşan sayfa yapısı çok büyük":
    "La struttura della pagina costruita nel browser è molto grande",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra oluşan HTML yapısının çok büyük olduğunu buldu. Bu, sayfanın kaynak kodunu sayan kontrolden farklıdır: JavaScript'in sonradan eklediği öğeleri de içerir. Büyük bir yapı stil hesaplamayı ve tıklamalara yanıtı yavaşlatır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse ha rilevato che la struttura HTML costruita dalla pagina dopo l'esecuzione nel browser è molto grande. È diverso dal controllo che conta il sorgente della pagina: include gli elementi aggiunti in seguito da JavaScript. Una struttura grande rallenta il calcolo degli stili e le risposte ai tocchi. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Görünmeyen içeriği (kapalı menüler, sekmeler, uzun listeler) gerektiğinde oluşturun ve sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.":
    "Costruisci i contenuti nascosti (menu chiusi, schede, elenchi lunghi) solo quando servono e riduci i livelli contenitore superflui del page builder.",
  "Sayfa açılmadan önce yönlendirme yapılıyor":
    "La pagina reindirizza prima di aprirsi",
  "Lighthouse sayfanın ana belgesine ulaşmadan önce bir ya da daha fazla yönlendirmeden geçti. Her yönlendirme, içerik görünmeden önce fazladan bir istek demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse ha attraversato uno o più reindirizzamenti prima di raggiungere il documento principale della pagina. Ogni reindirizzamento è una richiesta in più prima che appaia qualsiasi contenuto. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Bu sayfaya giden bağlantıları ve site haritasını doğrudan son adrese çevirin; yönlendirme gerekiyorsa tek adımda bitsin.":
    "Fai puntare link e sitemap direttamente all'indirizzo finale; se serve un reindirizzamento, fallo in un solo passaggio.",
  "Sunucu ilk yanıtı geç veriyor (Lighthouse)":
    "Il server risponde lentamente (Lighthouse)",
  "Lighthouse'un ölçümünde sunucunun sayfanın ilk baytını göndermesi 600 milisaniyeden uzun sürdü. Sunucu yanıt vermeden tarayıcı hiçbir şey yapamaz; bu süre sayfanın tüm açılışına eklenir. Tarayıcımızın kendi ölçtüğü yanıt süresinden ayrı, Google'ın sunucularından yapılan bir ölçümdür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Nella misurazione di Lighthouse, il server ha impiegato più di 600 millisecondi per inviare il primo byte della pagina. Il browser non può fare nulla finché il server non risponde, quindi questo tempo si somma all'intero caricamento. È una misurazione dai server di Google, separata dal tempo di risposta misurato dal nostro crawler. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Sayfa önbelleğini (tam sayfa önbellek) açın, yavaş veritabanı sorgularını ve eklentileri bulun, gerekirse daha güçlü bir sunucuya ya da bir CDN'e geçin.":
    "Attiva la cache delle pagine (full-page cache), individua query di database e plugin lenti e, se serve, passa a un server più potente o a una CDN.",
  "Sayfa sıkıştırılmadan gönderiliyor":
    "La pagina viene inviata senza compressione",
  "Lighthouse, sayfanın HTML belgesinin gzip ya da Brotli ile sıkıştırılmadan gönderildiğini gördü. Sıkıştırma metin dosyalarını genelde üçte bire indirir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse ha visto che il documento HTML della pagina viene inviato senza compressione gzip o Brotli. La compressione di solito riduce i file di testo a un terzo. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Sunucunuzda ya da CDN'de gzip veya Brotli sıkıştırmayı açın. Çoğu barındırma panelinde tek bir ayardır.":
    "Attiva la compressione gzip o Brotli sul server o sulla CDN. Nella maggior parte dei pannelli di hosting è una singola impostazione.",
  "Yazı tipleri yüklenirken metin görünmüyor":
    "Il testo è invisibile mentre si caricano i font",
  "Özel yazı tipleri yüklenene kadar metin görünmez kalıyor. Lighthouse, metnin yedek yazı tipiyle hemen gösterilmesinin ilk görünümü hızlandıracağını hesapladı. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Il testo resta invisibile finché non si caricano i font personalizzati. Lighthouse ha calcolato che mostrare subito il testo con un font di riserva velocizzerebbe il primo rendering. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "@font-face kurallarına font-display: swap ekleyin. Google Fonts kullanıyorsanız adresin sonuna &display=swap ekleyin.":
    "Aggiungi font-display: swap alle regole @font-face. Se usi Google Fonts, aggiungi &display=swap alla fine dell'URL.",
  "Sayfanın ana görseli geç yüklenecek şekilde işaretlenmiş":
    "L'immagine principale della pagina è impostata per caricarsi tardi",
  'Sayfanın en büyük öğesi (LCP) olan görselde loading="lazy" var. Tarayıcı bu görseli sayfa yerleşimi bitene kadar istemez, bu yüzden ana içerik geç görünür. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    "L'immagine che è l'elemento più grande della pagina (LCP) ha loading=\"lazy\". Il browser non la richiede finché il layout non è completo, quindi il contenuto principale appare tardi. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  'Sayfanın ilk ekranındaki ana görselden loading="lazy" özniteliğini kaldırın. Geç yükleme yalnızca ilk ekranın altındaki görsellere uygulanmalı.':
    'Rimuovi loading="lazy" dall\'immagine principale nella prima schermata. Il caricamento differito serve solo per le immagini sotto la prima schermata.',
  "Sayfanın ana görseli öncelikli istenmiyor":
    "L'immagine principale della pagina non viene richiesta con priorità",
  "Sayfanın en büyük öğesi (LCP) olan görsel ya sayfanın ilk HTML'inde yer almıyor (tarayıcı onu geç keşfediyor) ya da fetchpriority=\"high\" ile öncelikli istenmiyor. Ayrıntıda hangisinin eksik olduğu yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "L'immagine che è l'elemento più grande della pagina (LCP) non è nell'HTML iniziale della pagina (il browser la scopre tardi) oppure non viene richiesta con fetchpriority=\"high\". I dettagli indicano cosa manca. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  'Ana görseli sayfanın HTML\'inde doğrudan bir <img> olarak verin (yalnızca JavaScript ya da CSS arka planı ile değil) ve ona fetchpriority="high" ekleyin. Gerekirse <link rel="preload"> ile önceden yükleyin.':
    'Inserisci l\'immagine principale direttamente nell\'HTML della pagina come <img> (non solo tramite JavaScript o uno sfondo CSS) e aggiungi fetchpriority="high". Se serve, precaricala con <link rel="preload">.',
  "Dosyalar eski HTTP/1.1 ile sunuluyor":
    "I file vengono serviti con il vecchio HTTP/1.1",
  "Sayfanın dosyalarının bir kısmı HTTP/2 ya da HTTP/3 yerine HTTP/1.1 ile geliyor. Eski protokolde tarayıcı aynı anda az sayıda dosya indirebilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alcuni file della pagina arrivano tramite HTTP/1.1 invece di HTTP/2 o HTTP/3. Con il vecchio protocollo il browser può scaricare solo pochi file alla volta. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Sunucunuzda ya da CDN'de HTTP/2'yi (tercihen HTTP/3'ü) açın. Çoğu modern barındırma ve CDN bunu varsayılan olarak destekler.":
    "Attiva HTTP/2 (meglio HTTP/3) sul server o sulla CDN. La maggior parte degli hosting e delle CDN moderni lo supporta di default.",
  "Eski tarayıcılar için gereksiz JavaScript gönderiliyor":
    "Viene inviato JavaScript superfluo per i browser vecchi",
  "Sayfadaki betikler, güncel tarayıcıların zaten bildiği özellikler için eski tarayıcılara yönelik ek kod (polyfill, dönüştürme) içeriyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Gli script della pagina includono codice extra per i browser vecchi (polyfill, codice transpilato) per funzionalità che i browser attuali hanno già. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Derleme aracınızın hedef tarayıcı ayarını (browserslist) güncel tarayıcılara çekin ve artık gerekmeyen polyfill'leri kaldırın.":
    "Imposta i browser di destinazione del tuo strumento di build (browserslist) sui browser attuali e rimuovi i polyfill che non ti servono più.",
  "Üçüncü taraf kodlar tarayıcıyı uzun süre meşgul ediyor":
    "Il codice di terze parti tiene il browser occupato a lungo",
  "Reklam, sohbet, analiz ya da sosyal medya gibi başka sitelerden gelen betikler telefonda tarayıcının ana iş parçacığını toplam yarım saniyeden uzun meşgul etti. Bu sürede sayfa tıklamalara geç yanıt verir. Hangi hizmetin ne kadar sürdüğü bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Script di altri siti, come annunci, chat, analytics o social media, hanno tenuto occupato il thread principale del browser per più di mezzo secondo in totale su un telefono. In quel tempo la pagina risponde in ritardo ai tocchi. Quale servizio ha impiegato quanto tempo è nei dettagli del risultato. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Kullanmadığınız etiketleri kaldırın, kalanları sayfa açıldıktan sonra yükleyin; sohbet ya da video gibi ağır gömülü öğeleri tıklanınca yüklenen bir önizlemeyle değiştirin.":
    "Rimuovi i tag che non usi, carica gli altri dopo l'apertura della pagina e sostituisci gli embed pesanti come chat o video con un'anteprima che si carica al clic.",
  "Ana içeriğin yüklenmesi iyileştirilebilir (LCP)":
    "Il caricamento del contenuto principale potrebbe essere più rapido (LCP)",
  "Sayfanın en büyük öğesi 2,5 ile 4 saniye arasında göründü. Google bu aralığı 'iyileştirilmeli' sayar; 2,5 saniye ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa PageSpeed Insights'ın laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.":
    'L\'elemento più grande della pagina è apparso tra 2,5 e 4 secondi. Google classifica questo intervallo come "da migliorare"; 2,5 secondi o meno è "buono". Il valore proviene dai dati sul campo degli utenti reali di Chrome quando ci sono, altrimenti dalla misurazione di laboratorio di PageSpeed Insights; i dettagli indicano quale.',
  "En büyük öğe genelde kapak görseli ya da ana başlıktır: görseli küçültüp WebP gibi hafif bir biçime çevirin, geç yüklenmesini kapatın ve onu engelleyen betik ve yazı tiplerini erteleyin.":
    "L'elemento più grande di solito è l'immagine di copertina o il titolo principale: riduci l'immagine e convertila in un formato leggero come WebP, disattiva il suo caricamento differito e rimanda script e font che la bloccano.",
  "Yüklenirken içerik biraz kayıyor (CLS)":
    "I contenuti si spostano un po' durante il caricamento (CLS)",
  "Sayfa yüklenirken içerik 0,1 ile 0,25 arasında kaydı. Google bu aralığı 'iyileştirilmeli' sayar; 0,1 ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.":
    'I contenuti si sono spostati tra 0,1 e 0,25 durante il caricamento della pagina. Google classifica questo intervallo come "da migliorare"; 0,1 o meno è "buono". Il valore proviene dai dati sul campo degli utenti reali di Chrome quando ci sono, altrimenti dalla misurazione di laboratorio; i dettagli indicano quale.',
  "Görsellere ve gömülü çerçevelere genişlik ile yükseklik verin, sonradan yüklenen afiş ve reklamlar için yer ayırın, özel yazı tipi için yerleşimi bozmayan bir yedek tanımlayın.":
    "Assegna larghezza e altezza a immagini e frame incorporati, riserva spazio a banner e annunci che si caricano dopo e imposta per i font personalizzati un font di riserva che non rompa il layout.",
  "Tıklamalara yanıt iyileştirilebilir (INP)":
    "Le risposte ai tocchi potrebbero essere più rapide (INP)",
  "Sayfa tıklama ve dokunuşlara 200 ile 500 milisaniye arasında yanıt verdi. Google bu aralığı 'iyileştirilmeli' sayar; 200 milisaniye ve altı 'iyi'dir. Laboratuvar testi etkileşimi taklit edemediği için bu değer Chrome kullanıcılarının gerçek (alan) verisidir.":
    'La pagina ha risposto a clic e tocchi in 200-500 millisecondi. Google classifica questo intervallo come "da migliorare"; 200 millisecondi o meno è "buono". Poiché un test di laboratorio non può simulare l\'interazione, questo valore proviene dai dati sul campo degli utenti reali di Chrome.',
  "Tıklamada çalışan uzun betikleri bölün, üçüncü taraf etiketleri sayfa açıldıktan sonra yükleyin ve gereksiz olanları kaldırın.":
    "Dividi gli script lunghi che vengono eseguiti al clic, carica i tag di terze parti dopo l'apertura della pagina e rimuovi quelli che non ti servono.",
  "Bazı metinlerin renk karşıtlığı yetersiz":
    "Parte del testo ha un contrasto di colore insufficiente",
  "Bazı metinler arka planlarıyla yeterince ayrışmıyor; az gören ziyaretçiler ve güneş altında telefon kullananlar onları zor okur. Kaç öğenin etkilendiği ayrıntıda yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Parte del testo non si distingue abbastanza dallo sfondo; i visitatori ipovedenti e chi usa il telefono sotto il sole fanno fatica a leggerlo. I dettagli indicano quanti elementi sono interessati. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Normal metin için en az 4,5:1, büyük metin için 3:1 karşıtlık oranı sağlayın. Hangi öğelerin yetersiz kaldığını PageSpeed Insights'ın Erişilebilirlik bölümünde görürsünüz.":
    "Garantisci un rapporto di contrasto di almeno 4,5:1 per il testo normale e 3:1 per il testo grande. La sezione Accessibilità di PageSpeed Insights mostra quali elementi non sono sufficienti.",
  "Görsellerde alternatif metin eksik (Lighthouse)":
    "Mancano testi alternativi nelle immagini (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra alternatif metni (alt) olmayan görseller buldu. Bu, JavaScript'in sonradan eklediği görselleri de kapsar. Ekran okuyucular bu görselleri anlatamaz, Google da ne gösterdiklerini metinden öğrenemez. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse ha trovato immagini senza testo alternativo (alt) dopo l'esecuzione della pagina nel browser. Sono incluse le immagini aggiunte in seguito da JavaScript. Gli screen reader non possono descriverle e Google non può capire dal testo cosa mostrano. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  'Her anlamlı görsele ne gösterdiğini anlatan kısa bir alt metni ekleyin; süs amaçlı görsellere boş alt="" verin.':
    'Dai a ogni immagine significativa un breve testo alt che descriva cosa mostra; alle immagini decorative dai un alt="" vuoto.',
  "Form alanlarının etiketi yok (Lighthouse)":
    "I campi del modulo non hanno un'etichetta (Lighthouse)",
  "Bazı form alanlarına bağlı bir etiket yok. Ekran okuyucu kullanan ziyaretçi alana ne yazması gerektiğini duyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alcuni campi del modulo non hanno un'etichetta associata. Un visitatore che usa uno screen reader non sente cosa digitare nel campo. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Her alana for özniteliğiyle bağlı bir <label> ekleyin; görünür etiket istenmiyorsa aria-label kullanın.":
    "Aggiungi a ogni campo un <label> collegato con l'attributo for; se non vuoi un'etichetta visibile, usa aria-label.",
  "Bazı bağlantıların okunabilir adı yok":
    "Alcuni link non hanno un nome leggibile",
  'Bazı bağlantılarda ne metin ne de erişilebilir bir ad var (örneğin yalnızca bir simge). Ekran okuyucu bunları yalnızca "bağlantı" diye okur; Google da bağlantının neye gittiğini metinden anlayamaz. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'Alcuni link non hanno né testo né un nome accessibile (ad esempio solo un\'icona). Uno screen reader li legge solo come "link" e Google non può capire dal testo dove portano. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.',
  "Bağlantıya görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.":
    "Aggiungi un testo visibile al link; se è solo un'icona, indica cosa fa con aria-label.",
  "Bazı düğmelerin okunabilir adı yok":
    "Alcuni pulsanti non hanno un nome leggibile",
  'Bazı düğmelerde ne metin ne de erişilebilir bir ad var. Ekran okuyucu bunları yalnızca "düğme" diye okur. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'Alcuni pulsanti non hanno né testo né un nome accessibile. Uno screen reader li legge solo come "pulsante". Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.',
  "Düğmeye görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.":
    "Aggiungi un testo visibile al pulsante; se è solo un'icona, indica cosa fa con aria-label.",
  "Sayfanın tarayıcıda başlığı yok (Lighthouse)":
    "La pagina non ha un titolo nel browser (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra bir <title> bulamadı. Sekmede ve arama sonucunda başlık olarak gösterilecek bir şey yok. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse non ha trovato un <title> dopo l'esecuzione della pagina nel browser. Non c'è nulla da mostrare come titolo nella scheda o nei risultati di ricerca. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Sayfanın <head> bölümüne sayfayı anlatan benzersiz bir <title> ekleyin; başlığı JavaScript ile sonradan yazıyorsanız sunucunun gönderdiği HTML'e taşıyın.":
    "Aggiungi nell'<head> un <title> univoco che descriva la pagina; se JavaScript scrive il titolo in seguito, spostalo nell'HTML inviato dal server.",
  "Sayfanın dili tarayıcıda belirtilmemiş (Lighthouse)":
    "La lingua della pagina non è dichiarata nel browser (Lighthouse)",
  "Lighthouse, <html> öğesinde lang özniteliği bulamadı. Ekran okuyucular metni yanlış dilin kurallarıyla okuyabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse non ha trovato l'attributo lang nell'elemento <html>. Gli screen reader potrebbero leggere il testo con le regole di una lingua sbagliata. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  'Sayfanın <html> etiketine dilini ekleyin, örneğin <html lang="tr">.':
    'Aggiungi la lingua della pagina al tag <html>, ad esempio <html lang="it">.',
  "Telefonda yakınlaştırma engellenmiş (Lighthouse)":
    "Lo zoom è bloccato sui telefoni (Lighthouse)",
  "Sayfanın viewport ayarı ziyaretçinin metni büyütmesini engelliyor (user-scalable=no ya da düşük bir maximum-scale). Az gören ziyaretçiler sayfayı okuyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "L'impostazione viewport della pagina impedisce ai visitatori di ingrandire il testo (user-scalable=no o un maximum-scale basso). I visitatori ipovedenti non riescono a leggere la pagina. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  'Viewport etiketinden user-scalable=no ve maximum-scale değerini kaldırın; content="width=device-width, initial-scale=1" yeterlidir.':
    'Rimuovi user-scalable=no e il valore maximum-scale dal tag viewport; basta content="width=device-width, initial-scale=1".',
  "Dokunma hedefleri çok küçük ya da çok sık":
    "Le aree di tocco sono troppo piccole o troppo vicine",
  "Bazı düğme ve bağlantılar telefonda parmakla rahat dokunulamayacak kadar küçük ya da birbirine çok yakın. Ziyaretçi yanlış yere dokunur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alcuni pulsanti e link sono troppo piccoli o troppo vicini tra loro per essere toccati comodamente con un dito su un telefono. I visitatori toccano l'elemento sbagliato. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Dokunulan öğelere en az 24×24 piksel alan verin ve aralarında boşluk bırakın; menü ve altbilgi bağlantıları genelde bunun için büyütülmelidir.":
    "Dai agli elementi toccabili almeno 24×24 pixel e lascia spazio tra loro; di solito vanno ingranditi i link del menu e del footer.",
  "Başlık sırası tarayıcıda atlıyor (Lighthouse)":
    "L'ordine dei titoli salta livelli nel browser (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra başlık düzeylerinin sırayla gitmediğini gördü (örneğin H2'den H4'e atlama). Ekran okuyucu kullananlar sayfada başlıklarla gezinir ve atlanan düzey yapıyı bozar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse ha visto che, dopo l'esecuzione della pagina nel browser, i livelli dei titoli non seguono l'ordine (ad esempio si passa da H2 a H4). Chi usa uno screen reader naviga per titoli e un livello saltato rompe la struttura. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Başlıkları sırayla kullanın (H1, H2, H3); bir başlığı yalnızca küçük görünsün diye alt düzeyden seçmeyin, boyutu CSS ile ayarlayın.":
    "Usa i titoli in ordine (H1, H2, H3); non scegliere un livello inferiore solo perché un titolo sembri piccolo, impostane la dimensione con il CSS.",
  "Sayfa güvensiz (http) istekler yapıyor":
    "La pagina effettua richieste non sicure (http)",
  'Lighthouse, sayfanın kendisinin ya da yüklediği bazı dosyaların şifresiz http ile geldiğini gördü. Tarayıcı bu istekleri engelleyebilir ya da "Güvenli değil" uyarısı gösterebilir. Hangi adreslerin güvensiz olduğu ayrıntıda yazar. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'Lighthouse ha visto che la pagina stessa o alcuni file che carica arrivano non cifrati tramite http. Il browser può bloccare queste richieste o mostrare l\'avviso "Non sicuro". I dettagli indicano quali indirizzi non sono sicuri. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.',
  "Sayfayı ve yüklediği tüm dosyaları https adresinden sunun; sayfadaki http:// ile başlayan dosya adreslerini https:// yapın.":
    "Servi la pagina e ogni file che carica tramite https; cambia in https:// gli indirizzi dei file nella pagina che iniziano con http://.",
  "Sayfa açılırken tarayıcı hata kaydediyor":
    "Il browser registra errori durante l'apertura della pagina",
  "Sayfa açılırken tarayıcının konsoluna hata düştü: yüklenemeyen bir dosya, çalışırken çöken bir betik ya da engellenen bir istek. Bazıları ziyaretçiye görünmez, bazıları bir özelliğin çalışmadığını gösterir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Durante l'apertura della pagina sono comparsi errori nella console del browser: un file che non si è caricato, uno script che si è bloccato durante l'esecuzione o una richiesta bloccata. Alcuni sono invisibili ai visitatori, altri significano che una funzione non funziona. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Sayfayı Chrome'da açıp geliştirici araçlarının Konsol sekmesine bakın; ayrıntıdaki adreslerden başlayarak hataları giderin.":
    "Apri la pagina in Chrome e guarda la scheda Console negli strumenti per sviluppatori; inizia a correggere dagli indirizzi nei dettagli.",
  "Sayfa tarayıcıların kaldıracağı özellikler kullanıyor":
    "La pagina usa funzionalità che i browser stanno rimuovendo",
  "Sayfa, Chrome'un kullanımdan kaldırdığı ya da kaldıracağı özellikleri kullanıyor. Şimdi çalışıyor olabilir ama bir tarayıcı güncellemesinden sonra bozulabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "La pagina usa funzionalità che Chrome ha deprecato o rimuoverà. Ora può funzionare, ma può rompersi dopo un aggiornamento del browser. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "PageSpeed Insights raporundaki listeye bakın; genelde eski bir eklenti ya da kütüphanedir ve güncellemek yeterlidir.":
    "Guarda l'elenco nel report di PageSpeed Insights; di solito si tratta di un vecchio plugin o di una libreria e basta aggiornarli.",
  "Tarayıcı sayfada sorunlar bildiriyor":
    "Il browser segnala problemi nella pagina",
  "Chrome'un geliştirici araçlarındaki \"Sorunlar\" bölümü bu sayfa için kayıt tuttu: örneğin engellenen çerezler, güvenlik başlığı sorunları ya da hatalı kaynak istekleri. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    'Il pannello "Problemi" degli strumenti per sviluppatori di Chrome ha registrato voci per questa pagina: ad esempio cookie bloccati, problemi con le intestazioni di sicurezza o richieste di risorse errate. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.',
  'Sayfayı Chrome\'da açıp geliştirici araçlarının "Issues" (Sorunlar) sekmesine bakın ve listelenen sorunları giderin.':
    'Apri la pagina in Chrome, guarda la scheda "Problemi" negli strumenti per sviluppatori e correggi i problemi elencati.',
  "Bazı görseller yanlış oranla gösteriliyor":
    "Alcune immagini sono mostrate con proporzioni sbagliate",
  "Bazı görseller, kendi en-boy oranlarından farklı bir oranda gösterildiği için basık ya da uzamış görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alcune immagini sembrano schiacciate o allungate perché vengono mostrate con proporzioni diverse dalle loro. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Görselin width ve height değerlerini kendi oranına uygun verin ya da CSS'te object-fit kullanın.":
    "Dai all'immagine valori di larghezza e altezza che rispettino le sue proporzioni, oppure usa object-fit nel CSS.",
  "Bazı görseller ekran için düşük çözünürlüklü":
    "Alcune immagini hanno una risoluzione bassa per lo schermo",
  "Bazı görseller, telefonun ekran yoğunluğuna göre gereğinden küçük çözünürlükte sunuluyor ve bulanık görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alcune immagini vengono servite a una risoluzione inferiore a quella richiesta dalla densità dello schermo del telefono e appaiono sfocate. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Görsellerin daha büyük sürümlerini srcset ile sunun, böylece tarayıcı ekrana uygun olanı seçer.":
    "Servi versioni più grandi delle immagini con srcset, così il browser sceglie quella adatta allo schermo.",
  "Bazı bağlantılar taranamıyor (Lighthouse)":
    "Alcuni link non possono essere scansionati (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra Google'ın izleyemeyeceği bağlantılar buldu: geçerli bir href'i olmayan ya da yalnızca JavaScript ile çalışan bağlantılar. Google yalnızca href'i gerçek bir adres olan <a> bağlantılarını izler. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Dopo l'esecuzione della pagina nel browser, Lighthouse ha trovato link che Google non può seguire: link senza un href valido o che funzionano solo con JavaScript. Google segue solo i link <a> il cui href è un indirizzo reale. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Her bağlantıyı href özniteliği gerçek bir adres olan bir <a> etiketi yapın; javascript: ya da yalnızca onclick ile çalışan bağlantıları değiştirin.":
    "Rendi ogni link un tag <a> con un href che sia un indirizzo reale; sostituisci i link che funzionano solo con javascript: o onclick.",
  "Bağlantı metinleri açıklayıcı değil (Lighthouse)":
    "I testi dei link non sono descrittivi (Lighthouse)",
  'Bazı bağlantıların metni "buraya tıklayın" ya da "devamı" gibi gittiği yeri anlatmayan sözlerden oluşuyor. Google bağlantı metninden hedef sayfanın konusunu öğrenir. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'Il testo di alcuni link è composto da parole come "clicca qui" o "leggi di più" che non dicono dove portano. Google capisce l\'argomento della pagina di destinazione dal testo del link. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.',
  'Bağlantı metnini gittiği sayfanın konusunu anlatacak şekilde yazın, örneğin "devamı" yerine "kargo ücretleri".':
    'Scrivi testi dei link che descrivano l\'argomento della pagina di destinazione, ad esempio "costi di spedizione" invece di "leggi di più".',
  "Google sayfayı dizine alamıyor (Lighthouse)":
    "Google non può indicizzare la pagina (Lighthouse)",
  "Tarayıcımız bu sayfayı dizine alınabilir gördü, ama Lighthouse'un ölçümünde Google'ın sayfayı dizine almasını engelleyen bir kural vardı (robots.txt, noindex etiketi ya da X-Robots-Tag başlığı). Kural yalnızca Google'a ya da yalnızca bazı ziyaretçilere gösteriliyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Il nostro crawler ha trovato questa pagina indicizzabile, ma nella misurazione di Lighthouse c'era una regola che impediva a Google di indicizzarla (robots.txt, un tag noindex o un'intestazione X-Robots-Tag). La regola potrebbe essere mostrata solo a Google o solo ad alcuni visitatori. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Sayfanın aramada görünmesi gerekiyorsa robots.txt'teki ilgili Disallow satırını ve sayfadaki noindex kuralını kaldırın; sunucunun Googlebot'a farklı bir yanıt vermediğini kontrol edin.":
    "Se la pagina deve comparire nella ricerca, rimuovi la riga Disallow corrispondente dal robots.txt e la regola noindex nella pagina; verifica che il server non risponda in modo diverso a Googlebot.",
  "robots.txt dosyasında geçersiz satırlar var":
    "robots.txt ha righe non valide",
  "Lighthouse sitenin robots.txt dosyasında kurallara uymayan satırlar buldu. Google geçersiz satırları yok sayar, yani yazdığınız bir kural uygulanmıyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse ha trovato nel robots.txt del sito righe che non rispettano le regole. Google ignora le righe non valide, quindi una regola che hai scritto potrebbe non essere applicata. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  'robots.txt\'i açın ve PageSpeed Insights raporunda gösterilen satırları düzeltin; her satır "Alan: değer" biçiminde olmalı (User-agent, Disallow, Allow, Sitemap).':
    'Apri il robots.txt e correggi le righe indicate nel report di PageSpeed Insights; ogni riga deve avere la forma "Campo: valore" (User-agent, Disallow, Allow, Sitemap).',
  "hreflang etiketleri geçersiz (Lighthouse)":
    "I tag hreflang non sono validi (Lighthouse)",
  "Lighthouse, sayfadaki dil sürümü (hreflang) etiketlerinde geçersiz bir dil kodu ya da göreli bir adres buldu. Google geçersiz hreflang etiketlerini yok sayar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse ha trovato un codice lingua non valido o un indirizzo relativo nei tag delle versioni linguistiche (hreflang) della pagina. Google ignora i tag hreflang non validi. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Her hreflang değerinin geçerli bir dil kodu (tr, en-GB gibi) ve adresin tam adres (https:// ile başlayan) olduğundan emin olun.":
    "Assicurati che ogni valore hreflang sia un codice lingua valido (it, it-CH e così via) e che l'indirizzo sia completo (inizi con https://).",
  "canonical etiketi geçersiz (Lighthouse)":
    "Il tag canonical non è valido (Lighthouse)",
  "Lighthouse sayfanın canonical etiketini geçersiz buldu: birbiriyle çelişen birden çok adres, geçersiz bir adres, başka bir alan adına ya da sitenin ana sayfasına işaret eden bir adres olabilir. Google böyle bir canonical'ı yok sayabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Lighthouse ha trovato non valido il tag canonical della pagina: potrebbero esserci più indirizzi in conflitto, un indirizzo non valido o un indirizzo su un altro dominio o sulla home page del sito. Google può ignorare un canonical di questo tipo. Questo risultato proviene dal report Lighthouse generato da PageSpeed Insights durante la misurazione della versione mobile della pagina.",
  "Sayfada tek bir canonical etiketi bırakın ve onu sayfanın kendi tam adresine (ya da gerçekten asıl olan sayfaya) yönlendirin.":
    "Mantieni un solo tag canonical nella pagina e fallo puntare all'indirizzo completo della pagina stessa (o alla pagina che è davvero l'originale).",
  "Güvenli sayfada güvensiz görsel, video ya da çerçeve":
    "Immagine, video o frame non sicuro in una pagina sicura",
  'Güvenli (https) sayfa bir görseli, videoyu, sesi ya da gömülü çerçeveyi (iframe) şifresiz http adresinden yüklüyor. Tarayıcılar böyle görsel ve medyayı https\'e çevirmeyi dener, olmazsa göstermez; http çerçeveleri ise doğrudan engeller. Ziyaretçi boş bir alan ya da "Güvenli değil" uyarısı görebilir.':
    "La pagina sicura (https) carica un'immagine, un video, un audio o un frame incorporato (iframe) da un indirizzo http non cifrato. I browser provano a passare a https queste immagini e questi contenuti multimediali e non li mostrano se non ci riescono; i frame http vengono bloccati direttamente. Il visitatore potrebbe vedere uno spazio vuoto o l'avviso \"Non sicuro\".",
  "Ayrıntıdaki adresleri https:// ile başlayacak şekilde değiştirin. Dosya kendi sitenizdeyse adresi göreli (/resimler/...) yazmak da yeter.":
    "Cambia gli indirizzi nei dettagli in modo che inizino con https://. Se il file è sul tuo sito, funziona anche scrivere l'indirizzo in forma relativa (/images/...).",
  "Form bilgileri şifresiz gönderiliyor":
    "I dati del modulo vengono inviati non cifrati",
  "Güvenli (https) sayfadaki bir form, doldurulan bilgileri şifresiz bir http adresine gönderiyor. Tarayıcılar gönderimden önce ziyaretçiyi uyarır ve bilgiler yolda okunabilir.":
    "Un modulo nella pagina sicura (https) invia i dati inseriti a un indirizzo http non cifrato. I browser avvisano il visitatore prima dell'invio e i dati possono essere letti durante il trasferimento.",
  "Formun action adresini https:// ile başlayacak şekilde değiştirin ya da formu aynı sitedeki göreli bir adrese gönderin.":
    "Cambia l'indirizzo action del modulo in modo che inizi con https://, oppure invia il modulo a un indirizzo relativo sullo stesso sito.",
  "Sayfa meta refresh ile yönlendiriyor":
    "La pagina reindirizza con meta refresh",
  'Sayfa, sunucu yönlendirmesi yerine HTML içindeki <meta http-equiv="refresh"> etiketiyle başka bir adrese gönderiyor. Google bunu anlar, ama sunucu tarafında bir 301 yönlendirmesini tercih eder; ziyaretçi de yönlendirmeden önce boş bir sayfa görebilir.':
    'La pagina manda i visitatori a un altro indirizzo con un tag <meta http-equiv="refresh"> nell\'HTML invece di un reindirizzamento del server. Google lo capisce, ma preferisce un reindirizzamento 301 lato server; inoltre il visitatore potrebbe vedere una pagina vuota prima del reindirizzamento.',
  "Mümkünse yönlendirmeyi sunucuda (301 ya da 308) yapın ve meta refresh etiketini kaldırın.":
    "Se possibile, reindirizza dal server (301 o 308) e rimuovi il tag meta refresh.",
  "canonical adresi göreli yazılmış":
    "L'indirizzo canonical è scritto in forma relativa",
  "Sayfanın canonical etiketi tam adres yerine göreli bir yol (örneğin /urun) gösteriyor. Google göreli adresi çözebilir, ama tam adres kullanılmasını önerir; göreli yol, sayfa farklı bir adresten açıldığında yanlış yere işaret edebilir.":
    "Il tag canonical della pagina riporta un percorso relativo (ad esempio /prodotto) invece di un indirizzo completo. Google può risolvere gli indirizzi relativi ma consiglia quelli completi; un percorso relativo può puntare nel posto sbagliato quando la pagina viene aperta da un indirizzo diverso.",
  "canonical adresini https:// ile başlayan tam adres olarak yazın.":
    "Scrivi l'indirizzo canonical come indirizzo completo che inizia con https://.",
  "canonical adresinde # parçası var":
    "L'indirizzo canonical contiene un frammento #",
  "Sayfanın canonical adresi # ile başlayan bir parça içeriyor. Google adresin # sonrasını dikkate almaz, bu yüzden bu parça bir işe yaramaz ve genelde bir şablon hatasının işaretidir.":
    "L'indirizzo canonical della pagina contiene un frammento che inizia con #. Google ignora tutto ciò che segue il #, quindi il frammento non ha effetto e di solito è segno di un errore nel template.",
  "canonical adresinden # ve sonrasını kaldırın.":
    "Rimuovi dall'indirizzo canonical il # e tutto ciò che lo segue.",
  "canonical etiketi sayfanın gövdesinde":
    "Il tag canonical è nel corpo della pagina",
  "Sayfanın tek canonical etiketi <head> bölümünde değil, <body> içinde. Google canonical etiketini yalnızca <head> içinde okur; gövdedeki etiket yok sayılır, yani sayfanın aslında canonical'ı yok.":
    "L'unico tag canonical della pagina è dentro <body>, non nella sezione <head>. Google legge il tag canonical solo in <head>; quello nel corpo viene ignorato, quindi di fatto la pagina non ha un canonical.",
  "canonical etiketini sayfanın <head> bölümüne taşıyın. Genelde bir eklentinin ya da şablonun etiketi yanlış yere yazmasından olur.":
    "Sposta il tag canonical nella sezione <head> della pagina. Di solito succede quando un plugin o un template scrive il tag nel posto sbagliato.",
  "robots etiketleri birbiriyle çelişiyor": "I tag robots si contraddicono",
  "Sayfada birden fazla robots etiketi var ve biri izin verirken diğeri yasaklıyor (örneğin biri index, diğeri noindex). Google böyle bir çelişkide daha kısıtlayıcı olan kuralı uygular; yani sayfa büyük olasılıkla istediğinizden farklı işlenir.":
    "La pagina ha più di un tag robots e uno consente ciò che un altro vieta (ad esempio uno dice index, un altro noindex). In caso di conflitto Google applica la regola più restrittiva, quindi la pagina viene probabilmente trattata in modo diverso da come vuoi.",
  "Sayfada tek bir robots etiketi bırakın. Genelde bir SEO eklentisi ile temanın aynı etiketi ayrı ayrı yazmasından olur.":
    "Mantieni un solo tag robots nella pagina. Di solito succede quando un plugin SEO e il tema scrivono entrambi lo stesso tag.",
  "Aramada sayfanın özeti gösterilmiyor":
    "La ricerca non mostra lo snippet della pagina",
  "Sayfa dizine alınabilir, ama nosnippet ya da max-snippet:0 kuralı Google'ın arama sonucunda sayfanın metninden özet göstermesini engelliyor. Özetsiz bir sonuç daha az tıklanır. Bilerek yapılmış olabilir.":
    "La pagina può essere indicizzata, ma una regola nosnippet o max-snippet:0 impedisce a Google di mostrare uno snippet del testo della pagina nei risultati di ricerca. Un risultato senza snippet riceve meno clic. Potrebbe essere voluto.",
  "Bilerek değilse robots etiketinden ya da X-Robots-Tag başlığından nosnippet ve max-snippet:0 kuralını kaldırın.":
    "Se non è voluto, rimuovi nosnippet e max-snippet:0 dal tag robots o dall'intestazione X-Robots-Tag.",
  'Sayfa "bulunamadı" diyor ama başarılı yanıt veriyor':
    'La pagina dice "non trovata" ma risponde con successo',
  'Sayfanın başlığı ya da ana başlığı "404" ya da "sayfa bulunamadı" diyor, ama sunucu 200 (başarılı) kodu döndürüyor. Google böyle sayfaları "soft 404" sayar ve dizine almaz; ama taramaya zaman harcar ve gerçek bir hata sayfası olduğunu anlamakta gecikebilir.':
    'Il titolo o il titolo principale della pagina dice "404" o "pagina non trovata", ma il server restituisce un codice 200 (successo). Google tratta queste pagine come "soft 404" e non le indicizza, ma ci spende tempo di scansione e può impiegare tempo a capire che si tratta di una pagina di errore.',
  "Sayfa gerçekten yoksa sunucunun 404 ya da 410 kodu döndürmesini sağlayın. Varsa başlığını ve içeriğini düzeltin.":
    "Se la pagina davvero non esiste, fai restituire al server un codice 404 o 410. Se esiste, correggi il titolo e il contenuto.",
  "Sayfada yer tutucu metin (lorem ipsum) kalmış":
    "Nella pagina è rimasto testo segnaposto (lorem ipsum)",
  'Sayfanın görünen metninde "lorem ipsum" yer tutucu metni var. Tasarım aşamasından kalmış ve yayına unutulmuş içerik, ziyaretçiye ve Google\'a sayfanın bitmediğini söyler.':
    'Il testo visibile della pagina contiene il segnaposto "lorem ipsum". Contenuti rimasti dalla fase di design e pubblicati per errore dicono ai visitatori e a Google che la pagina non è finita.',
  "Yer tutucu metni gerçek içerikle değiştirin ya da o bölümü kaldırın.":
    "Sostituisci il testo segnaposto con contenuti reali o rimuovi quella sezione.",
  "E-posta adresi düz metin olarak açıkta":
    "Un indirizzo email è esposto come testo semplice",
  "Sayfada düz metin ya da mailto bağlantısı olarak bir e-posta adresi var. Spam gönderenlerin botları sayfaları bu adresler için tarar. Ziyaretçinin size ulaşması için gerekliyse sorun değildir.":
    "La pagina contiene un indirizzo email come testo semplice o come link mailto. I bot degli spammer scansionano le pagine alla ricerca di questi indirizzi. Non è un problema se ai visitatori serve per contattarti.",
  "İletişim için bir form kullanmayı düşünün ya da adresi spam filtresi güçlü bir kutuya yönlendirin.":
    "Valuta un modulo di contatto, oppure indirizza l'email a una casella con un buon filtro antispam.",
  "Başlıktaki kelimeler sayfa içeriğinde geçmiyor":
    "Le parole del titolo non compaiono nel contenuto della pagina",
  "Sayfa başlığındaki (title) anlamlı kelimelerin hiçbiri ana başlıkta ya da sayfa metninde geçmiyor. Google başlığın sayfayı anlatıp anlatmadığına bakar; içerikle ilgisi olmayan bir başlığı arama sonucunda başka bir metinle değiştirebilir. Bu bir tahmindir: eş anlamlı kelimeler sayılmaz.":
    "Nessuna delle parole significative del titolo della pagina compare nel titolo principale o nel testo della pagina. Google verifica se un titolo descrive la pagina e può sostituire nei risultati di ricerca un titolo slegato dal contenuto con un altro testo. È un'euristica: i sinonimi non vengono considerati.",
  "Başlığı sayfanın gerçekten anlattığı konuya göre yazın ya da başlıktaki ana kelimeyi ana başlıkta ve ilk paragrafta kullanın.":
    "Scrivi il titolo in base all'argomento reale della pagina, oppure usa la parola principale del titolo nel titolo principale e nel primo paragrafo.",
  "Kuruluş yapısal verisinde sosyal profiller yok":
    "I dati strutturati Organization non elencano profili social",
  "Sayfadaki Organization yapısal verisinde sameAs özelliği yok. sameAs, kuruluşunuzun resmi sosyal medya ve kayıt profillerini (LinkedIn, Wikipedia gibi) gösterir; Google kuruluşu tanırken bu bağlantıları kullanır. Google bunu önerir, zorunlu tutmaz.":
    "I dati strutturati Organization della pagina non hanno la proprietà sameAs. sameAs elenca i profili ufficiali social e di registro della tua organizzazione (LinkedIn, Wikipedia e così via); Google usa questi link per riconoscere l'organizzazione. Google la consiglia ma non la richiede.",
  'Organization yapısal verisine sameAs ekleyin ve içine resmi profil adreslerinizi liste olarak yazın, örneğin "sameAs": ["https://www.linkedin.com/company/..."].':
    'Aggiungi sameAs ai dati strutturati Organization con gli indirizzi dei tuoi profili ufficiali come elenco, ad esempio "sameAs": ["https://www.linkedin.com/company/..."].',
  "Derindeki sayfada içerik yolu (breadcrumb) yok":
    "Una pagina profonda non ha breadcrumb",
  "Ana sayfadan en az üç tıklama uzaktaki bu sayfada ne bir içerik yolu (breadcrumb) gezinmesi ne de BreadcrumbList yapısal verisi var. İçerik yolu ziyaretçiye nerede olduğunu gösterir; Google da arama sonucunda adres yerine bu yolu gösterebilir.":
    "Questa pagina, ad almeno tre clic dalla home page, non ha né una navigazione breadcrumb né dati strutturati BreadcrumbList. Un breadcrumb mostra ai visitatori dove si trovano e Google può mostrare il percorso al posto dell'indirizzo nei risultati di ricerca.",
  "Sayfanın üstüne Ana sayfa > Kategori > Sayfa biçiminde bir içerik yolu ekleyin ve BreadcrumbList yapısal verisiyle işaretleyin. Çoğu SEO eklentisi ikisini birlikte ekler.":
    "Aggiungi in cima alla pagina un breadcrumb come Home > Categoria > Pagina e contrassegnalo con i dati strutturati BreadcrumbList. La maggior parte dei plugin SEO aggiunge entrambi insieme.",
  "Sayfalamanın devam sayfası aramadan gizlenmiş":
    "Una pagina successiva di un elenco paginato è nascosta dalla ricerca",
  "Bir listenin 2. ya da sonraki sayfası noindex ile aramadan gizlenmiş. Google'ın sayfalama rehberi her sayfanın kendi adresiyle dizine girebilmesini önerir. Uzun süre noindex kalan bir sayfadaki bağlantıları Google zamanla izlemeyi bırakabilir; o zaman yalnızca bu sayfalardan bağlantı alan ürün ya da yazılar bulunmaz olur.":
    "La pagina 2 o successiva di un elenco è nascosta dalla ricerca con noindex. Le indicazioni di Google sulla paginazione consigliano che ogni pagina sia indicizzabile al proprio indirizzo. Con il tempo Google può smettere di seguire i link di una pagina che resta a lungo in noindex; a quel punto prodotti o articoli collegati solo da queste pagine non possono essere trovati.",
  "Sayfalama sayfalarından noindex'i kaldırın ve her birine kendi adresini canonical olarak verin.":
    "Rimuovi noindex dalle pagine paginate e dai a ciascuna il proprio indirizzo come canonical.",
  "Güvenli sitede iç bağlantılar http adresine gidiyor":
    "In un sito sicuro, i link interni puntano a indirizzi http",
  "Site https ile çalışıyor, ama bu sayfadaki bazı bağlantılar sitenin kendi sayfalarına http:// ile veriliyor. Her tıklama önce bir yönlendirmeden geçer ya da ziyaretçi güvensiz sürüme düşer; Google da aynı sayfanın iki adresini görür.":
    "Il sito funziona su https, ma alcuni link in questa pagina puntano alle pagine del sito con http://. Ogni clic passa prima da un reindirizzamento o porta il visitatore alla versione non sicura, e Google vede due indirizzi per la stessa pagina.",
  "Şablondaki ve içerikteki iç bağlantıları https:// ile ya da göreli (/sayfa) olarak yazın. Veritabanında eski http adreslerini toplu değiştirmek genelde en hızlı yoldur.":
    "Scrivi i link interni nei template e nei contenuti con https:// o in forma relativa (/pagina). Sostituire in blocco i vecchi indirizzi http nel database di solito è la via più rapida.",
  "Sayfanın içine gömülü kod çok büyük":
    "Il codice incorporato nella pagina è molto grande",
  "Sayfanın HTML'ine doğrudan gömülmüş betik ve stil kodu 100 KB'ı geçiyor. Gömülü kod tarayıcı önbelleğinde saklanmaz ve her sayfa açılışında yeniden indirilir; sayfa da ilk içeriği göstermeden önce bu kodu okumak zorunda kalır.":
    "Il codice di script e stili incorporato direttamente nell'HTML della pagina supera i 100 KB. Il codice incorporato non resta nella cache del browser e viene riscaricato a ogni visualizzazione; inoltre la pagina deve leggerlo prima di mostrare i primi contenuti.",
  "Büyük gömülü betik ve stilleri ayrı dosyalara taşıyın; yalnızca ilk ekran için gereken küçük CSS'i gömülü bırakın.":
    "Sposta script e stili incorporati di grandi dimensioni in file separati; tieni incorporato solo il poco CSS che serve alla prima schermata.",
  "Blog var ama RSS/Atom akışı bildirilmemiş":
    "C'è un blog ma nessun feed RSS/Atom è dichiarato",
  "Sitede yazı (Article, BlogPosting) olarak işaretlenmiş sayfalar var, ama taranan hiçbir sayfa bir RSS ya da Atom akışı bildirmiyor. Akış, okuyucuların ve haber toplayıcıların yeni yazılarınızı izlemesini sağlar; Google da yeni içeriği daha çabuk keşfedebilir.":
    "Il sito ha pagine contrassegnate come articoli (Article, BlogPosting), ma nessuna pagina scansionata dichiara un feed RSS o Atom. Un feed permette a lettori e aggregatori di notizie di seguire i tuoi nuovi articoli, e Google può scoprire prima i nuovi contenuti.",
  'Bir RSS ya da Atom akışı yayınlayın ve sayfaların <head> bölümüne <link rel="alternate" type="application/rss+xml" href="/feed"> ile bildirin. Çoğu blog altyapısında akış hazırdır, yalnızca etiketin eklenmesi gerekir.':
    'Pubblica un feed RSS o Atom e dichiaralo nell\'<head> delle pagine con <link rel="alternate" type="application/rss+xml" href="/feed">. La maggior parte delle piattaforme di blog ha già un feed pronto; basta aggiungere il tag.',
  "Başka bir siteye verilen bağlantı kırık":
    "Un link a un altro sito non funziona",
  "Bu sayfadaki bir bağlantı başka bir sitede açılmayan bir adrese gidiyor: adres 404 ya da başka bir hata veriyor, ya da alan adı artık yok. Ziyaretçi bir hata sayfasına düşer ve sayfanız bakımsız görünür. Botlara kapalı siteler (sosyal ağlar gibi) ve yanıt vermeyen adresler kırık sayılmaz, kontrol edilmemiş sayılır.":
    "Un link in questa pagina porta a un indirizzo di un altro sito che non si apre: l'indirizzo restituisce 404 o un altro errore, oppure il dominio non esiste più. Il visitatore finisce su una pagina di errore e la tua pagina sembra trascurata. I siti chiusi ai bot (come i social network) e gli indirizzi che non rispondono non vengono contati come non funzionanti, ma come non verificati.",
  "Bağlantıyı hedefin yeni adresine güncelleyin ya da kaldırın. Ayrıntıda hangi adresin hangi yanıtı verdiği yazar.":
    "Aggiorna il link al nuovo indirizzo della destinazione o rimuovilo. I dettagli indicano quale indirizzo ha dato quale risposta.",
  "Görsel dosyası çok büyük": "Il file immagine è troppo grande",
  "Sayfadaki bir ya da daha fazla görsel dosyası 200 KB'tan büyük (ayrıntıda 500 KB'ı geçenler ayrıca sayılır). Boyut, dosyanın kendisine istek gönderilerek ölçüldü. Büyük görseller özellikle mobil bağlantıda sayfayı yavaşlatır.":
    "Uno o più file immagine nella pagina superano i 200 KB (quelli oltre i 500 KB sono conteggiati a parte nei dettagli). La dimensione è stata misurata richiedendo il file stesso. Le immagini grandi rallentano la pagina, soprattutto sulle connessioni mobili.",
  "Görseli gösterildiği boyuta küçültün, sıkıştırın ve WebP ya da AVIF biçimine çevirin. Çoğu fotoğraf bu işlemden sonra 100 KB'ın altına iner.":
    "Ridimensiona l'immagine alla dimensione con cui viene mostrata, comprimila e convertila in WebP o AVIF. Dopo questo, la maggior parte delle foto scende sotto i 100 KB.",
  "Dış bağlantıları ve görsel boyutlarını da kontrol et":
    "Controlla anche i link in uscita e le dimensioni delle immagini",
  "Dış kontroller": "Controlli esterni",
  "Tarama bittikten sonra başka sitelere verilen bağlantıların açılıp açılmadığına ve sitenizdeki görsel dosyalarının boyutuna bakar. En çok 300 adres sorulur; sosyal ağlar gibi botları engelleyen siteler atlanır.":
    "Dopo la scansione, verifica se i link ad altri siti si aprono ancora e misura i file immagine del tuo sito. Vengono richiesti al massimo 300 indirizzi; i siti che bloccano i bot, come i social network, vengono saltati.",
  "Site hem www ile hem www'siz açılıyor":
    "Il sito si apre sia con sia senza www",
  "Sitenizin www'li ve www'siz adresi ikisi de sayfayı açıyor; biri ötekine yönlendirmiyor. Google bunları aynı içeriğin iki kopyası olarak görür, hangisini göstereceğini kendisi seçer ve bağlantıların değeri iki adres arasında bölünebilir.":
    "Sia l'indirizzo con www sia quello senza www del tuo sito mostrano la pagina; nessuno dei due reindirizza all'altro. Google li vede come due copie dello stesso contenuto, sceglie da solo quale mostrare e il valore dei link può dividersi tra i due indirizzi.",
  'Bir adresi asıl seçin (genelde zaten kullandığınız) ve ötekinden ona kalıcı (301) yönlendirme verin. Barındırma panellerinde bu genelde "www\'ye yönlendir" ya da "www\'siz adrese yönlendir" ayarıdır.':
    'Scegli un indirizzo come principale (di solito quello che usi già) e imposta sull\'altro un reindirizzamento permanente (301) verso di esso. Nei pannelli di hosting di solito è un\'impostazione "reindirizza a www" o "reindirizza a non-www".',
  "Var olmayan sayfa 404 yerine 200 dönüyor":
    "Una pagina inesistente restituisce 200 invece di 404",
  'Sitede olmayan rastgele bir adres istedik, sunucu "bulunamadı" (404) yerine "tamam" (200) yanıtı verdi. Google bunu yumuşak 404 sayar: silinen ya da yanlış yazılan adresler gerçek sayfa gibi görünür, tarama boşa gider ve boş sayfalar dizine girebilir.':
    'Abbiamo richiesto un indirizzo casuale che non esiste sul sito e il server ha risposto "OK" (200) invece di "non trovato" (404). Google lo considera un soft 404: gli indirizzi eliminati o digitati male sembrano pagine reali, la scansione viene sprecata e le pagine vuote possono essere indicizzate.',
  'Sitenizin hata sayfası ayarını kontrol edin: olmayan adresler için 404 durum kodu dönmeli. İçerik yönetim sisteminizde "özel 404 sayfası" varsa sayfanın içeriği aynı kalabilir, yalnızca durum kodu 404 olmalı.':
    'Controlla l\'impostazione della pagina di errore del sito: gli indirizzi che non esistono devono restituire il codice di stato 404. Se il CMS ha una "pagina 404 personalizzata", il contenuto può restare lo stesso; deve essere 404 solo il codice di stato.',
  "Var olmayan sayfalar ana sayfaya yönlendiriliyor":
    "Le pagine inesistenti reindirizzano alla home page",
  "Sitede olmayan rastgele bir adres istedik, sunucu bizi ana sayfaya yönlendirdi. Google bunu genelde yumuşak 404 sayar ve yönlendirmeyi yok sayar; ziyaretçi de aradığını bulamadığını anlamadan ana sayfaya düşer.":
    "Abbiamo richiesto un indirizzo casuale che non esiste sul sito e il server ci ha reindirizzato alla home page. Google di solito lo considera un soft 404 e ignora il reindirizzamento; i visitatori arrivano alla home page senza capire che ciò che cercavano non c'è.",
  "Olmayan adreslerde 404 dönen, arama kutusu ya da önemli bağlantılar içeren bir hata sayfası gösterin. Yalnızca taşınan sayfaları yeni adreslerine yönlendirin.":
    "Per gli indirizzi inesistenti mostra una pagina di errore che restituisca 404 e offra una casella di ricerca o i link principali. Reindirizza solo le pagine che si sono davvero spostate ai loro nuovi indirizzi.",
  "Site simgesi (favicon) bulunamadı": "Icona del sito (favicon) non trovata",
  "Sayfada bir site simgesi tanımlanmamış ve /favicon.ico adresi de bir simge döndürmüyor (ya da tanımlanan simge açılmıyor). Google mobil arama sonuçlarında sitenizin adının yanında bu simgeyi gösterir; yoksa genel bir simge çıkar ve sonuç daha az fark edilir.":
    "La pagina non dichiara un'icona del sito e nemmeno /favicon.ico ne restituisce una (oppure l'icona dichiarata non si carica). Google mostra questa icona accanto al nome del sito nei risultati di ricerca da mobile; senza, compare un'icona generica e il risultato si nota meno.",
  'En az 48x48 piksellik kare bir simge hazırlayın, sitenize yükleyin ve sayfaların <head> bölümüne `<link rel="icon" href="/favicon.ico">` ekleyin. Site oluşturucularda bu genelde "site simgesi" ayarıdır.':
    'Crea un\'icona quadrata di almeno 48x48 pixel, caricala sul sito e aggiungi `<link rel="icon" href="/favicon.ico">` all\'<head> delle pagine. Nei site builder di solito è l\'impostazione "icona del sito".',
  "robots.txt tüm siteyi Google'a kapatıyor":
    "robots.txt chiude l'intero sito a Google",
  "robots.txt dosyanız Googlebot'un ana sayfayı taramasını yasaklıyor (genelde `Disallow: /` satırı). Google sitenizi taramaz; sayfalar arama sonuçlarından zamanla düşer ya da açıklamasız görünür. Çoğu zaman geliştirme sırasında konup unutulmuş bir kuraldır.":
    "Il tuo robots.txt vieta a Googlebot di scansionare la home page (di solito con una riga `Disallow: /`). Google non scansionerà il sito; con il tempo le pagine escono dalla ricerca o compaiono senza descrizione. Spesso è una regola aggiunta durante lo sviluppo e dimenticata.",
  "robots.txt'teki `Disallow: /` satırını kaldırın ya da yalnızca gizli kalması gereken klasörlerle sınırlayın. Sonra Search Console'daki robots.txt raporundan Google'ın yeni dosyayı okuduğunu kontrol edin.":
    "Rimuovi la riga `Disallow: /` dal robots.txt o limitala alle cartelle che devono restare nascoste. Poi verifica nel rapporto robots.txt di Search Console che Google abbia letto il nuovo file.",
  "robots.txt site haritasını göstermiyor": "robots.txt non indica la sitemap",
  "robots.txt dosyanızda `Sitemap:` satırı yok. Arama motorları site haritasını bu satırdan da bulur; Search Console'a gönderdiyseniz Google için sorun değildir, ama Bing ve diğer tarayıcılar için en kolay yoldur.":
    "Il tuo robots.txt non ha una riga `Sitemap:`. Anche tramite questa riga i motori di ricerca trovano la sitemap; se l'hai inviata in Search Console non è un problema per Google, ma è la strada più semplice per Bing e gli altri crawler.",
  "robots.txt'in sonuna site haritanızın tam adresiyle bir satır ekleyin, örneğin `Sitemap: https://alanadiniz.com/sitemap.xml`.":
    "Aggiungi alla fine del robots.txt una riga con l'indirizzo completo della sitemap, ad esempio `Sitemap: https://tuodominio.it/sitemap.xml`.",
  "Bazı yapay zekâ tarayıcıları robots.txt ile engellenmiş":
    "Alcuni crawler di IA sono bloccati dal robots.txt",
  "robots.txt dosyanız bazı yapay zekâ tarayıcılarının (örneğin GPTBot, ClaudeBot, PerplexityBot) sitenizi taramasını yasaklıyor. Bu bir tercih: içeriğinizin yapay zekâ eğitiminde kullanılmasını istemiyorsanız doğrudur. Ama bu asistanların arama ve yanıt özelliklerinde sitenizin görünmesini de azaltabilir. Google araması etkilenmez.":
    "Il tuo robots.txt vieta ad alcuni crawler di IA (ad esempio GPTBot, ClaudeBot, PerplexityBot) di scansionare il sito. È una scelta: va bene se non vuoi che i tuoi contenuti siano usati per addestrare l'IA. Ma può anche ridurre quanto spesso il sito compare nelle funzioni di ricerca e risposta di questi assistenti. La Ricerca Google non ne è influenzata.",
  "Bilerek engellediyseniz bir şey yapmanıza gerek yok. Yapay zekâ yanıtlarında görünmek istiyorsanız arama amaçlı tarayıcılara (OAI-SearchBot, Claude-SearchBot, PerplexityBot gibi) izin verip yalnızca eğitim tarayıcılarını (GPTBot, ClaudeBot, Google-Extended gibi) engelleyebilirsiniz.":
    "Se li hai bloccati di proposito, non c'è nulla da fare. Se vuoi comparire nelle risposte dell'IA, puoi consentire i crawler di ricerca (come OAI-SearchBot, Claude-SearchBot, PerplexityBot) e bloccare solo quelli di addestramento (come GPTBot, ClaudeBot, Google-Extended).",
  "llms.txt dosyası yok (isteğe bağlı)": "Nessun file llms.txt (facoltativo)",
  "Sitenizin kökünde llms.txt dosyası yok. Bu dosya yapay zekâ asistanlarına sitenin önemli sayfalarını kısa bir listeyle anlatmak için önerilen yeni bir biçimdir. Henüz bir standart değildir ve Google bunu kullanmaz; yoksa bir sorun yoktur.":
    "Nella radice del sito non c'è un file llms.txt. Questo file è un formato proposto di recente per descrivere agli assistenti IA le pagine importanti di un sito in un breve elenco. Non è ancora uno standard e Google non lo usa; non averlo non è un problema.",
  "İsterseniz sitenizin kökünde /llms.txt adresine, sitenin ne olduğunu bir paragrafta anlatan ve önemli sayfalarınızı bağlantılarıyla listeleyen düz metin (Markdown) bir dosya koyun.":
    "Se vuoi, metti nella radice del sito un file di testo semplice (Markdown) in /llms.txt che descriva il sito in un paragrafo ed elenchi le pagine importanti con i link.",
  "Başlangıç sayfasının HTML'i 2 MB'tan büyük":
    "L'HTML della pagina iniziale supera i 2 MB",
  "Başlangıç sayfasının HTML'i 2 MB'ı aşıyor. Google bir HTML dosyasının yalnızca ilk 2 MB'ını işler; sonrasındaki içerik ve bağlantılar Google için yok sayılır. Büyük HTML ayrıca yavaş mobil bağlantılarda sayfayı geciktirir.":
    "L'HTML della pagina iniziale supera i 2 MB. Google elabora solo i primi 2 MB di un file HTML; contenuti e link successivi vengono ignorati. Un HTML grande rallenta anche la pagina sulle connessioni mobili lente.",
  "HTML'in içine gömülü büyük verileri (satır içi görseller, büyük JSON, tekrar eden menüler) ayrı dosyalara taşıyın. Uzun listeleri sayfalara bölün.":
    "Sposta in file separati i dati grandi incorporati nell'HTML (immagini inline, JSON grandi, menu ripetuti). Dividi gli elenchi lunghi in pagine.",
  "Başlangıç sayfası sıkıştırılmadan geldi":
    "La pagina iniziale è arrivata senza compressione",
  "Denetim başlangıç sayfasını gzip ve brotli kabul ettiğini söyleyerek istedi, ama yanıtta Content-Encoding başlığı yoktu: sayfa sıkıştırılmadan geldi. Sıkıştırma HTML'i genelde 4-5 kat küçültür ve sayfayı hızlandırır. Bazı ara sunucular ve CDN'ler sıkıştırmayı yalnızca tarayıcılara uyguladığı için tarayıcıda da doğrulayın.":
    "L'audit ha richiesto la pagina iniziale dichiarando di accettare gzip e brotli, ma la risposta non aveva l'intestazione Content-Encoding: la pagina è arrivata senza compressione. La compressione di solito riduce l'HTML di 4-5 volte e velocizza la pagina. Alcuni proxy e CDN comprimono solo per i browser, quindi verificalo anche in un browser.",
  "Sunucunuzda ya da CDN'de gzip veya brotli sıkıştırmayı açın. Sonucu tarayıcının geliştirici araçlarında, yanıt başlıklarında `content-encoding` satırına bakarak doğrulayın.":
    "Attiva la compressione gzip o brotli sul server o sulla CDN. Verifica il risultato negli strumenti per sviluppatori del browser cercando la riga `content-encoding` nelle intestazioni della risposta.",
  "Sunucu ilk yanıtı geç veriyor (TTFB)":
    "Il server è lento a inviare la prima risposta (TTFB)",
  "Başlangıç sayfasının ilk baytı 800 milisaniyeden geç geldi; web.dev bu sınırın altını önerir. Sunucu yanıtı geç başlarsa sayfadaki her şey o kadar geç başlar. Süre, denetimi çalıştıran bilgisayardan iki ayrı istekle ölçülür ve hızlı olanı esas alınır; yine de ağa göre değişebilir.":
    "Il primo byte della pagina iniziale è arrivato dopo più di 800 millisecondi; web.dev consiglia di restare sotto questa soglia. Se la risposta del server parte tardi, tutto nella pagina parte altrettanto tardi. Il tempo viene misurato con due richieste separate dal computer che esegue l'audit e conta la più veloce; può comunque variare in base alla rete.",
  "Sayfa önbelleğini açın, yavaş veritabanı sorgularını ve eklentileri bulun, ziyaretçilerinize yakın bir CDN kullanın. Sorun sürerse barındırma paketinizi gözden geçirin.":
    "Attiva la cache delle pagine, individua query di database e plugin lenti e usa una CDN vicina ai tuoi visitatori. Se il problema persiste, rivedi il piano di hosting.",
  "http adresi https'e yönlendirilmiyor":
    "L'indirizzo http non reindirizza a https",
  'Sitenizin http:// ile başlayan adresi şifreli https sürümüne yönlendirmiyor, sayfayı düz http ile açıyor. Ziyaretçi adresi elle yazdığında ya da eski bir bağlantıdan geldiğinde güvenli olmayan sürümde kalır ve tarayıcı "Güvenli değil" uyarısı gösterir. Google da aynı içeriğin iki sürümünü görür.':
    "L'indirizzo http:// del tuo sito non reindirizza alla versione cifrata https; apre la pagina su http semplice. Quando i visitatori digitano l'indirizzo a mano o arrivano da un vecchio link, restano sulla versione non sicura e il browser mostra l'avviso \"Non sicuro\". Inoltre Google vede due versioni dello stesso contenuto.",
  'Sunucunuzda ya da barındırma panelinizde "HTTPS\'e zorla" ayarını açın; yoksa tüm http isteklerini aynı adresin https karşılığına kalıcı (301) yönlendiren bir kural ekleyin.':
    "Attiva l'impostazione \"Forza HTTPS\" sul server o nel pannello di hosting; altrimenti aggiungi una regola che reindirizzi in modo permanente (301) ogni richiesta http all'equivalente https dello stesso indirizzo.",
  "HSTS başlığı yok": "Nessuna intestazione HSTS",
  'Sayfa https ile açılıyor ama Strict-Transport-Security (HSTS) başlığı göndermiyor. Bu başlık tarayıcıya "bu siteye bundan sonra hep https ile gel" der. Olmadığında ilk istek http ile gidebilir ve araya giren biri ziyaretçiyi güvensiz sürüme düşürebilir.':
    "La pagina si apre su https ma non invia l'intestazione Strict-Transport-Security (HSTS). Questa intestazione dice al browser \"d'ora in poi visita sempre questo sito tramite https\". Senza, la prima richiesta può passare su http e qualcuno nel mezzo può riportare il visitatore alla versione non sicura.",
  "Sunucu yanıtına `Strict-Transport-Security: max-age=31536000; includeSubDomains` başlığını ekleyin. Önce tüm alt alan adlarınızın https ile çalıştığından emin olun; tarayıcı bu süre boyunca http'yi denemez.":
    "Aggiungi l'intestazione `Strict-Transport-Security: max-age=31536000; includeSubDomains` alla risposta del server. Prima assicurati che tutti i sottodomini funzionino su https; per quel periodo i browser non proveranno http.",
  "X-Content-Type-Options başlığı yok":
    "Nessuna intestazione X-Content-Type-Options",
  "Sunucu `X-Content-Type-Options: nosniff` başlığını göndermiyor. Bu başlık tarayıcının dosya türünü tahmin etmesini engeller; yoksa yüklenen bir dosya betik gibi çalıştırılabilir. Sıralamayı etkilemez, sitenin güvenlik düzenini gösterir.":
    "Il server non invia l'intestazione `X-Content-Type-Options: nosniff`. Questa intestazione impedisce al browser di indovinare il tipo di un file; senza, un file caricato potrebbe essere eseguito come script. Non incide sul posizionamento; mostra la configurazione di sicurezza del sito.",
  "Sunucu yanıtlarına `X-Content-Type-Options: nosniff` başlığını ekleyin. Çoğu barındırma panelinde ya da CDN'de güvenlik başlıkları ayarından tek tıkla açılır.":
    "Aggiungi l'intestazione `X-Content-Type-Options: nosniff` alle risposte del server. Nella maggior parte dei pannelli di hosting o delle CDN è un'opzione con un clic nelle impostazioni delle intestazioni di sicurezza.",
  "Sayfa başka sitelerin çerçevesine gömülebiliyor":
    "La pagina può essere incorporata nei frame di altri siti",
  "Ne X-Frame-Options başlığı ne de Content-Security-Policy içinde frame-ancestors kuralı var. Başka bir site sayfanızı görünmez bir çerçeveye koyup ziyaretçiyi istemediği bir yere tıklatabilir (clickjacking). Sıralamayı etkilemez.":
    "Non ci sono né un'intestazione X-Frame-Options né una regola frame-ancestors in una Content-Security-Policy. Un altro sito potrebbe inserire la tua pagina in un frame invisibile e indurre i visitatori a fare clic dove non intendevano (clickjacking). Non incide sul posizionamento.",
  "Sayfanın başka sitelerde gösterilmesi gerekmiyorsa `Content-Security-Policy: frame-ancestors 'self'` ya da `X-Frame-Options: SAMEORIGIN` başlığını ekleyin.":
    "Se la pagina non deve essere mostrata su altri siti, aggiungi l'intestazione `Content-Security-Policy: frame-ancestors 'self'` o `X-Frame-Options: SAMEORIGIN`.",
  "Referrer-Policy başlığı yok": "Nessuna intestazione Referrer-Policy",
  "Sunucu Referrer-Policy başlığı göndermiyor. Güncel tarayıcılar bu durumda güvenli bir varsayılan kullanır, yani acil bir sorun değil; ama başlık, ziyaretçi başka siteye geçtiğinde adresinizin ne kadarının paylaşılacağını sizin belirlemenizi sağlar.":
    "Il server non invia un'intestazione Referrer-Policy. In questo caso i browser attuali usano un'impostazione predefinita sicura, quindi non è urgente; ma l'intestazione ti permette di decidere quanta parte del tuo indirizzo viene condivisa quando un visitatore passa a un altro sito.",
  "Sunucu yanıtlarına `Referrer-Policy: strict-origin-when-cross-origin` başlığını ekleyin.":
    "Aggiungi l'intestazione `Referrer-Policy: strict-origin-when-cross-origin` alle risposte del server.",
  "SSL sertifikasının süresi 30 günden az":
    "Il certificato SSL scade tra meno di 30 giorni",
  "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 30 günden az kaldı. Süre dolarsa tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar ve ziyaretçilerin çoğu geri döner. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.":
    "Secondo i registri pubblici dei certificati (Certificate Transparency), il certificato più recente registrato per questo dominio scade tra meno di 30 giorni. Se scade, i browser aprono il sito con un avviso di sicurezza a tutta pagina e la maggior parte dei visitatori torna indietro. Il server potrebbe già usare un certificato più recente non ancora arrivato nei registri; verifica la data di scadenza dal lucchetto nella barra degli indirizzi del browser.",
  "Sertifikanın otomatik yenilendiğini barındırma panelinizden kontrol edin. Let's Encrypt gibi otomatik sertifikalar genelde bitmeden 30 gün önce yenilenir; yenilenmediyse yenilemeyi elle başlatın.":
    "Verifica nel pannello di hosting che il certificato si rinnovi automaticamente. I certificati automatici come Let's Encrypt di solito si rinnovano 30 giorni prima della scadenza; se non si è rinnovato, avvia il rinnovo manualmente.",
  "SSL sertifikasının süresi dolmak üzere":
    "Il certificato SSL sta per scadere",
  "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 14 günden az kaldı. Süre dolunca tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar; ziyaretçilerin çoğu siteye hiç giremez. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.":
    "Secondo i registri pubblici dei certificati (Certificate Transparency), il certificato più recente registrato per questo dominio scade tra meno di 14 giorni. Una volta scaduto, i browser aprono il sito con un avviso di sicurezza a tutta pagina; la maggior parte dei visitatori non riesce proprio a entrare. Il server potrebbe già usare un certificato più recente non ancora arrivato nei registri; verifica la data di scadenza dal lucchetto nella barra degli indirizzi del browser.",
  "Sertifikayı hemen yenileyin ve sunucuya yükleyin. Otomatik yenileme varsa neden çalışmadığına bakın (DNS kaydı değişmiş, doğrulama dosyasına erişilemiyor gibi).":
    "Rinnova subito il certificato e installalo sul server. Se il rinnovo automatico è configurato, scopri perché non ha funzionato (ad esempio un record DNS cambiato o un file di convalida non raggiungibile).",
  "Alan adının süresi 30 günden az": "Il dominio scade tra meno di 30 giorni",
  "Alan adı kayıt bilgisine (RDAP) göre alan adınızın süresinin bitmesine 30 günden az kaldı. Yenilenmezse site ve e-postalar tamamen durur, alan adı başkasının eline geçebilir.":
    "Secondo i dati di registrazione del dominio (RDAP), il tuo dominio scade tra meno di 30 giorni. Se non viene rinnovato, sito ed email smettono completamente di funzionare e il dominio può finire nelle mani di qualcun altro.",
  "Alan adını aldığınız firmadan süreyi uzatın ve otomatik yenilemeyi açın. Kayıttaki e-posta adresinin güncel olduğundan emin olun; hatırlatmalar oraya gider.":
    "Prolunga la registrazione presso la società da cui hai acquistato il dominio e attiva il rinnovo automatico. Assicurati che l'indirizzo email della registrazione sia aggiornato; i promemoria arrivano lì.",
  "Alan adında SPF kaydı yok": "Nessun record SPF sul dominio",
  "Alan adınızın DNS'inde SPF kaydı (v=spf1 ile başlayan TXT kaydı) yok. SPF, alan adınız adına hangi sunucuların e-posta gönderebileceğini söyler. Yoksa başkaları sizin adınıza sahte e-posta gönderebilir ve sizin gerçek e-postalarınız spam klasörüne düşebilir. SEO'yu doğrudan etkilemez.":
    "Il DNS del tuo dominio non ha un record SPF (un record TXT che inizia con v=spf1). SPF indica quali server possono inviare email per conto del tuo dominio. Senza, altri possono inviare email false a tuo nome e le tue email reali possono finire nello spam. Non incide direttamente sulla SEO.",
  "E-postanızı gönderen hizmetin (Google Workspace, Microsoft 365, barındırma firması) önerdiği SPF kaydını DNS'e TXT olarak ekleyin. Alan adından hiç e-posta gönderilmiyorsa `v=spf1 -all` yeterlidir.":
    "Aggiungi al DNS come record TXT il record SPF consigliato dal servizio che invia le tue email (Google Workspace, Microsoft 365, la tua società di hosting). Se dal dominio non parte alcuna email, basta `v=spf1 -all`.",
  "Alan adında DMARC kaydı yok": "Nessun record DMARC sul dominio",
  "Alan adınızda DMARC kaydı (_dmarc alt adında v=DMARC1 ile başlayan TXT kaydı) yok. DMARC, SPF ve DKIM kontrolünden geçemeyen e-postalara ne yapılacağını söyler. Gmail ve Yahoo toplu gönderim yapan alan adlarından bu kaydı istiyor. SEO'yu doğrudan etkilemez.":
    "Il tuo dominio non ha un record DMARC (un record TXT che inizia con v=DMARC1 sul sottodominio _dmarc). DMARC indica cosa fare con le email che non superano i controlli SPF e DKIM. Gmail e Yahoo lo richiedono ai domini che inviano email in massa. Non incide direttamente sulla SEO.",
  "DNS'e `_dmarc` adıyla `v=DMARC1; p=none; rua=mailto:dmarc@alanadiniz.com` gibi bir TXT kaydı ekleyin. Raporları birkaç hafta izledikten sonra politikayı `quarantine` ya da `reject` yapın.":
    "Aggiungi al DNS un record TXT chiamato `_dmarc`, ad esempio `v=DMARC1; p=none; rua=mailto:dmarc@tuodominio.it`. Dopo aver osservato i report per qualche settimana, cambia la policy in `quarantine` o `reject`.",
  "Open Graph etiketleri eksik": "Tag Open Graph incompleti",
  "Sayfada Open Graph etiketleri var ama başlık, açıklama ve görselden biri ya da birkaçı eksik. Bu etiketler sayfa Facebook, LinkedIn, WhatsApp gibi yerlerde paylaşıldığında görünen kartı belirler. Eksik olanı paylaşılan platform kendisi tahmin eder; çoğu zaman yanlış görsel ya da kesik bir metin çıkar. Google sıralamasını etkilemez.":
    "La pagina ha tag Open Graph, ma manca il titolo, la descrizione o l'immagine. Questi tag decidono la scheda mostrata quando la pagina viene condivisa su Facebook, LinkedIn, WhatsApp e simili. La piattaforma indovina ciò che manca, il che spesso significa l'immagine sbagliata o un testo tagliato. Non incidono sul posizionamento in Google.",
  "Eksik etiketi ekleyin: og:title, og:description ve og:image üçü birlikte olmalı. Görsel en az 1200x630 piksel olsun. SEO eklentiniz varsa sosyal paylaşım bölümünü doldurmanız yeter.":
    "Aggiungi il tag mancante: og:title, og:description e og:image vanno insieme. Usa un'immagine di almeno 1200x630 pixel. Se usi un plugin SEO, basta compilare la sua sezione di condivisione social.",
  "X (Twitter) kart etiketi yok": "Nessun tag card di X (Twitter)",
  "Sayfada Open Graph etiketleri var ama twitter:card etiketi yok. X başlık, açıklama ve görseli Open Graph'tan alabilir, ama kart türünü söyleyen bu etiket olmadan bağlantı kartsız, düz bir adres olarak görünebilir. Google sıralamasını etkilemez.":
    "La pagina ha tag Open Graph ma nessun tag twitter:card. X può prendere titolo, descrizione e immagine da Open Graph, ma senza questo tag, che indica il tipo di scheda, il link potrebbe apparire come un semplice indirizzo senza scheda. Non incide sul posizionamento in Google.",
  'Sayfanın head bölümüne <meta name="twitter:card" content="summary_large_image"> ekleyin. Diğer twitter: etiketlerine gerek yok; X eksikleri Open Graph etiketlerinden tamamlar.':
    'Aggiungi <meta name="twitter:card" content="summary_large_image"> all\'head della pagina. Gli altri tag twitter: non servono; X li ricava dai tag Open Graph.',
  "Başlık etiketi ile H1 aynı": "Il tag title e l'H1 sono identici",
  "Sayfanın başlık etiketi (<title>) ile H1 başlığı birebir aynı. Bu bir hata değil ve Google bunu cezalandırmaz. Ama iki farklı yer, iki farklı fırsat demek: başlık arama sonucunda tıklatmak için, H1 sayfaya gelen ziyaretçiye konuyu söylemek için yazılır. Aynı metin ikisinden birini boşa harcar.":
    "Il tag title della pagina (<title>) e il suo H1 sono esattamente uguali. Non è un errore e Google non lo penalizza. Ma due posti significano due occasioni: il title si scrive per ottenere il clic nei risultati di ricerca, l'H1 per dire al visitatore nella pagina di cosa si tratta. Lo stesso testo ne spreca una.",
  "Başlığı arama sonucu için yazın (ana kelime başta, marka sonda), H1'i sayfadaki okur için yazın. Konu aynı kalsın, ifade farklı olsun.":
    "Scrivi il title per il risultato di ricerca (parola chiave principale prima, brand alla fine) e l'H1 per chi legge la pagina. Mantieni l'argomento, varia la formulazione.",
  "Başlık arama sonucunda kesilebilir":
    "Il titolo potrebbe essere tagliato nei risultati di ricerca",
  "Başlık 60 karakterin altında ama geniş harfler yüzünden yaklaşık 580 pikseli aşıyor. Google başlığı karakter sayısına göre değil, genişliğe göre keser; geniş büyük harfler (W, M) ve sayılar başlığı daha erken taşırır. Ölçüm, Google'ın masaüstünde kullandığı 20 piksellik Arial yazı tipine göre yapılan bir tahmindir.":
    "Il titolo ha meno di 60 caratteri, ma le lettere larghe lo portano oltre circa 580 pixel. Google taglia i titoli in base alla larghezza, non al numero di caratteri; maiuscole larghe (W, M) e cifre riempiono prima la riga. La misura è una stima basata sul font Arial a 20 pixel che Google usa su desktop.",
  "Başlığı kısaltın ya da büyük harfle yazılmış sözcükleri normal yazıma çevirin. En önemli kelimeleri başa alın; kesilme olursa sondaki marka adı gitsin.":
    "Accorcia il titolo o riporta in minuscolo le parole scritte in maiuscolo. Metti per prime le parole più importanti, così se qualcosa viene tagliato è il nome del brand alla fine.",
  "Gereksiz meta keywords etiketi": "Tag meta keywords superfluo",
  "Sayfada meta keywords etiketi var. Google bu etiketi yıllardır hiç kullanmıyor; sıralamaya ne katkısı ne zararı var. Tek etkisi, hedeflediğiniz kelimeleri rakiplerin kaynak koduna bakarak görebilmesi.":
    "La pagina ha un tag meta keywords. Google non usa questo tag da anni; non aiuta né danneggia il posizionamento. L'unico effetto è che i concorrenti possono vedere le parole chiave a cui punti guardando il codice sorgente.",
  "Etiketi şablondan ya da SEO eklentisinin ayarlarından kaldırın. Acil değil; zamanınız olduğunda temizleyin.":
    "Rimuovi il tag dal template o nelle impostazioni del plugin SEO. Non è urgente; sistemalo quando hai tempo.",
  "Sayfa yakınlaştırmayı engelliyor": "La pagina blocca lo zoom",
  "Sayfanın viewport etiketi kullanıcının yakınlaştırmasını kapatıyor (user-scalable=no ya da 2'den küçük maximum-scale). Az gören ziyaretçiler telefonda metni büyütemez. Erişilebilirlik standardı (WCAG) metnin %200'e kadar büyütülebilmesini ister; Lighthouse da bunu hata sayar.":
    "Il tag viewport della pagina disattiva lo zoom (user-scalable=no o un maximum-scale inferiore a 2). I visitatori ipovedenti non possono ingrandire il testo sul telefono. Lo standard di accessibilità (WCAG) richiede che il testo sia ridimensionabile fino al 200% e Lighthouse lo considera un errore.",
  'Viewport etiketinden user-scalable=no ve maximum-scale değerlerini kaldırın: <meta name="viewport" content="width=device-width, initial-scale=1"> yeterlidir.':
    'Rimuovi user-scalable=no e maximum-scale dal tag viewport: basta <meta name="viewport" content="width=device-width, initial-scale=1">.',
  "En iyi uygulama: yeni sekmede açılan dış bağlantılarda noopener yok":
    "Buona pratica: link esterni che si aprono in una nuova scheda senza noopener",
  'Sayfada target="_blank" ile yeni sekmede açılan ama rel="noopener" ya da rel="noreferrer" taşımayan dış bağlantılar var. Güncel tarayıcılar (Chrome 88, Firefox 79 ve Safari 12.1\'den beri) target="_blank" bağlantılara noopener\'ı kendiliğinden uygular; yani bu bir güvenlik açığı değil, eski tarayıcılar için bir en iyi uygulama notudur. Sıralamayı etkilemez.':
    'La pagina ha link esterni che si aprono in una nuova scheda con target="_blank" ma non hanno né rel="noopener" né rel="noreferrer". I browser attuali (da Chrome 88, Firefox 79 e Safari 12.1) applicano da soli noopener ai link target="_blank", quindi non è una falla di sicurezza, solo una nota di buona pratica per i browser più vecchi. Non incide sul posizionamento.',
  'Bu bağlantılara rel="noopener" ekleyin. Çoğu zaman tek bir şablon ya da editör ayarıdır.':
    "Aggiungi rel=\"noopener\" a questi link. Di solito è un'unica impostazione del template o dell'editor.",
  'Adresi "javascript:" olan bağlantılar':
    'Link il cui indirizzo è "javascript:"',
  'Sayfada href değeri "javascript:" ile başlayan bağlantılar var. Google yalnızca gerçek bir adrese giden <a href> bağlantılarını izler; bunları izleyemez, yani gittikleri sayfaları bu yoldan bulamaz. Klavye ve ekran okuyucu kullananlar için de bunlar çoğu zaman çalışmaz.':
    'La pagina ha link il cui href inizia con "javascript:". Google segue solo i link <a href> che portano a un indirizzo reale; questi non può seguirli, quindi non può trovare in questo modo le pagine a cui portano. Spesso non funzionano nemmeno per chi usa tastiera e screen reader.',
  "Bir sayfaya gidiyorsa href'e o sayfanın adresini yazın. Bir işlem yapıyorsa (menü açmak gibi) <a> yerine <button> kullanın.":
    "Se il link porta a una pagina, metti l'indirizzo di quella pagina nell'href. Se esegue un'azione (come aprire un menu), usa un <button> invece di un <a>.",
  "Aşağıdaki görseller hemen yükleniyor":
    "Le immagini più in basso si caricano subito",
  'Sayfada ilk ekranın altında kalan altıdan fazla görsel loading="lazy" olmadan, sayfa açılır açılmaz yükleniyor. Ziyaretçi o kısma inmeden bant genişliği harcanır ve sayfa yavaşlar. Tahmin, ilk üç içerik görselinin ilk ekranda olduğunu varsayar ve yalnızca ana içerikteki (<main>, <article>) ya da büyük boyutlu görselleri sayar; logolar ve simgeler sayılmaz. Gerçek ekran düzeni farklı olabilir.':
    'Più di sei immagini sotto la prima schermata si caricano appena si apre la pagina, senza loading="lazy". La banda viene consumata prima che il visitatore scorra fin lì e la pagina rallenta. La stima presuppone che le prime tre immagini di contenuto siano nella prima schermata e conta solo le immagini nel contenuto principale (<main>, <article>) o di grandi dimensioni; loghi e icone non sono conteggiati. Il layout reale può essere diverso.',
  'İlk ekranın altındaki görsellere loading="lazy" ekleyin. İlk ekrandaki ana görsele eklemeyin; o görsel hemen yüklenmeli.':
    'Aggiungi loading="lazy" alle immagini sotto la prima schermata. Non aggiungerlo all\'immagine principale della prima schermata; quella deve caricarsi subito.',
  "Görseller eski biçimde": "Immagini in formati meno recenti",
  "Sayfadaki üç ya da daha fazla görsel JPEG, PNG ya da GIF biçiminde ve WebP ya da AVIF alternatifi yok (logolar, simgeler ve SVG'ler sayılmaz). Yeni biçimler aynı kalitede genelde %25-50 daha küçüktür; sayfa daha hızlı açılır. Tüm güncel tarayıcılar bu biçimleri destekler.":
    "Tre o più immagini nella pagina sono JPEG, PNG o GIF senza un'alternativa WebP o AVIF (loghi, icone e SVG non sono conteggiati). I formati più recenti sono di solito più leggeri del 25-50% a parità di qualità, quindi la pagina si apre più velocemente. Tutti i browser attuali li supportano.",
  "Görselleri WebP ya da AVIF'e çevirin, ya da <picture> içinde bu biçimlerde bir <source> ekleyin. Çoğu CMS ve görsel eklentisi bunu otomatik yapabilir.":
    "Converti le immagini in WebP o AVIF, oppure aggiungi un <source> in quei formati dentro un <picture>. La maggior parte dei CMS e dei plugin per immagini può farlo automaticamente.",
  "Etiketi olmayan form alanları": "Campi del modulo senza etichetta",
  'Sayfadaki bazı form alanlarının (metin kutusu, seçim listesi) etiketi yok: ne <label>, ne aria-label, ne title, ne de yer tutucu metin. Ekran okuyucu kullanan ziyaretçi alana gelince yalnızca "düzenleme alanı" duyar, ne yazacağını bilemez. Lighthouse\'un erişilebilirlik denetimi de bunu hata sayar.':
    "Alcuni campi del modulo nella pagina (caselle di testo, elenchi a discesa) non hanno un'etichetta: né <label>, né aria-label, né title, né placeholder. Un visitatore che usa uno screen reader sente solo \"modifica testo\" quando arriva al campo e non capisce cosa digitare. Anche l'audit di accessibilità di Lighthouse lo considera un errore.",
  'Her alana görünür bir <label for="alan-id"> ekleyin. Tasarım görünür etikete izin vermiyorsa aria-label="E-posta adresi" gibi bir etiket verin.':
    'Dai a ogni campo un <label for="id-campo"> visibile. Se il design non consente un\'etichetta visibile, aggiungine una come aria-label="Indirizzo email".',
  "Aynı id birden çok öğede": "Stesso id su più elementi",
  "Sayfada aynı id değerini taşıyan birden fazla öğe var. id sayfada tek olmalı; tekrar ettiğinde form etiketleri, sayfa içi bağlantılar ve erişilebilirlik bağlantıları yanlış öğeye gider. Sıralamayı etkilemez, ama genelde bir bileşenin aynı sayfada iki kez kullanılmasından kaynaklanan bir şablon hatasıdır.":
    "Più elementi della pagina condividono lo stesso valore id. Un id deve essere unico nella pagina; quando si ripete, etichette dei moduli, link interni alla pagina e riferimenti di accessibilità puntano all'elemento sbagliato. Non incide sul posizionamento, ma di solito è un bug del template in cui un componente è usato due volte nella stessa pagina.",
  "Tekrar eden id'leri bulun (tarayıcının geliştirici araçlarında document.querySelectorAll('[id]') ile) ve her birini benzersiz yapın; yalnızca stil için kullanılıyorsa class'a çevirin.":
    "Trova gli id ripetuti (con document.querySelectorAll('[id]') negli strumenti per sviluppatori del browser) e rendili unici; se uno serve solo per lo stile, trasformalo in una classe.",
  "Sayfanın HTML yapısı çok büyük":
    "La struttura HTML della pagina è troppo grande",
  "Sayfada 1.500'den fazla HTML öğesi var. Lighthouse bu sınırdan sonra uyarı verir: büyük bir sayfa yapısı daha çok bellek harcar, stil hesaplamayı ve etkileşimi yavaşlatır, özellikle telefonda. Genelde her sayfada tekrarlanan dev menülerden, gizli ama yüklenen içerikten ya da iç içe geçmiş sayfa oluşturucu katmanlarından olur.":
    "La pagina ha più di 1.500 elementi HTML. Lighthouse avvisa da questa soglia: una struttura grande usa più memoria e rallenta il calcolo degli stili e l'interazione, soprattutto sui telefoni. Di solito deriva da menu enormi ripetuti su ogni pagina, contenuti nascosti che vengono comunque caricati o livelli annidati del page builder.",
  "Görünmeyen içeriği (kapalı menüler, sekmeler) gerektiğinde yükleyin, uzun listeleri sayfalara bölün, sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.":
    "Carica i contenuti non visibili (menu chiusi, schede) quando servono, dividi gli elenchi lunghi in pagine e riduci i livelli contenitore superflui del page builder.",
  "HTML öğeleri çok iç içe": "Elementi HTML annidati troppo in profondità",
  "Sayfada 32 kattan derin iç içe geçmiş HTML öğeleri var. Çok derin yapı stil hesaplamayı yavaşlatır ve genelde sayfa oluşturucuların her bölümü birkaç gereksiz kutuya sarmasından kaynaklanır.":
    "La pagina ha elementi HTML annidati per più di 32 livelli. Una struttura molto profonda rallenta il calcolo degli stili e di solito deriva dai page builder che avvolgono ogni sezione in più contenitori superflui.",
  "Şablonda gereksiz sarmalayıcı <div> katmanlarını kaldırın; sayfa oluşturucu kullanıyorsanız iç içe bölüm ve sütunları azaltın.":
    "Rimuovi dal template i livelli <div> contenitore superflui; se usi un page builder, riduci sezioni e colonne annidate.",
  "Görünür metin, koda göre çok az":
    "Pochissimo testo visibile rispetto al codice",
  "Sayfanın görünür metni, HTML'nin onda birinden az. Bu tek başına bir sıralama sorunu değil; Google böyle bir oran ölçmez. Ama çoğu zaman sayfanın satır içi betik ve stil kodlarıyla şiştiğini ya da içeriğin ilk gelen HTML'de olmadığını gösterir.":
    "Il testo visibile della pagina è meno di un decimo del suo HTML. Di per sé non è un problema di posizionamento; Google non misura un rapporto del genere. Ma spesso indica che la pagina è appesantita da script e stili inline, o che il contenuto non è nell'HTML che arriva per primo.",
  "Satır içi büyük betik ve stilleri ayrı dosyalara taşıyın, kullanılmayan kodu kaldırın. İçerik JavaScript ile yükleniyorsa sayfa kaynağında da göründüğünden emin olun.":
    "Sposta script e stili inline di grandi dimensioni in file separati e rimuovi il codice inutilizzato. Se il contenuto viene caricato con JavaScript, assicurati che compaia anche nel sorgente della pagina.",
  "Neredeyse aynı içerik": "Contenuti quasi duplicati",
  "Bu sayfaların ana içeriği neredeyse aynı; yalnızca birkaç kelime (şehir adı, renk, fiyat gibi) farklı. Menü, üst ve alt bilgi gibi her sayfada tekrar eden kısımlar karşılaştırmaya katılmaz. Google bu sayfalardan birini seçip diğerlerini arama sonucunda göstermeyebilir ve hangisini seçeceğine o karar verir. Genelde aynı şablonla çoğaltılmış konum, ürün çeşidi ya da etiket sayfalarında olur.":
    "Il contenuto principale di queste pagine è quasi identico; cambiano solo poche parole (il nome di una città, un colore, un prezzo). Le parti ripetute su ogni pagina, come menu, intestazione e footer, sono escluse dal confronto. Google potrebbe sceglierne una e lasciare le altre fuori dai risultati di ricerca, decidendo da solo quale. Di solito succede con pagine di località, varianti di prodotto o tag copiate dallo stesso template.",
  "Her sayfaya kendine özgü, işe yarar içerik ekleyin. Gerçekten aynı şeyi anlatıyorlarsa tek sayfada birleştirin ya da diğerlerine asıl sayfayı gösteren bir canonical ekleyin.":
    "Dai a ogni pagina contenuti utili propri. Se dicono davvero la stessa cosa, uniscile in una sola pagina o aggiungi alle altre un canonical che punti alla pagina principale.",
  "Yapılandırılmış veride zorunlu özellikler eksik":
    "Proprietà obbligatorie mancanti nei dati strutturati",
  "Sayfadaki yapılandırılmış veri (JSON-LD) bir türü bildiriyor ama Google'ın o tür için zorunlu saydığı özelliklerden bazıları yok. Bu, Product, FAQPage, BreadcrumbList ve LocalBusiness türleri içindir; eksik olunca arama sonucunda zengin görünüm (yıldız, fiyat, içerik haritası) çıkmaz.":
    "I dati strutturati (JSON-LD) della pagina dichiarano un tipo ma mancano di alcune proprietà che Google considera obbligatorie per esso. Vale per Product, FAQPage, BreadcrumbList e LocalBusiness; senza di esse nella ricerca non compare alcun risultato multimediale (stelle, prezzo, breadcrumb).",
  "Ayrıntıdaki eksik özellikleri işaretlemeye ekleyin ve sonucu Google'ın Zengin Sonuç Testi ile kontrol edin. İşaretleme sayfada gerçekten görünen bilgiyi anlatmalı; sayfada olmayan bir fiyatı ya da yorumu işaretlemek Google kurallarına aykırıdır.":
    "Aggiungi al markup le proprietà mancanti elencate nei dettagli e verifica il risultato con il Test dei risultati multimediali di Google. Il markup deve descrivere informazioni realmente visibili nella pagina; contrassegnare un prezzo o una recensione che non sono nella pagina viola le linee guida di Google.",
  "Yapılandırılmış veride önerilen özellikler eksik":
    "Proprietà consigliate mancanti nei dati strutturati",
  "Sayfadaki Article ya da Organization işaretlemesinde Google'ın önerdiği özelliklerden (başlık, görsel, tarih, yazar; ya da ad, web adresi, logo) bazıları yok. Google bu türler için zorunlu özellik saymaz, bu yüzden işaretleme geçerlidir ve zengin görünümü engellemez; önerilen özellikler yalnızca Google'ın sayfayı daha eksiksiz göstermesine yardım eder.":
    "Il markup Article o Organization della pagina non ha alcune delle proprietà consigliate da Google (headline, image, data, autore; oppure nome, URL, logo). Google non indica proprietà obbligatorie per questi tipi, quindi il markup è valido e non blocca un risultato multimediale; le proprietà consigliate aiutano solo Google a mostrare la pagina in modo più completo.",
  "Ayrıntıdaki özellikleri, sayfada gerçekten görünen bilgiyle işaretlemeye ekleyin ve sonucu Google'ın Zengin Sonuç Testi ile kontrol edin. Acil değildir; zorunlu özellik eksiklerinden sonra gelir.":
    "Aggiungi al markup le proprietà elencate nei dettagli, usando informazioni realmente visibili nella pagina, e verifica il risultato con il Test dei risultati multimediali di Google. Non è urgente; viene dopo le proprietà obbligatorie mancanti.",
  "Sayfalarda Google Analytics etiketi bulunamadı":
    "Nessun tag di Google Analytics trovato nelle pagine",
  "Taranan sayfaların HTML'sinde Google Analytics 4 (G-), Google Etiket Yöneticisi (GTM-) ya da Universal Analytics (UA-) kimliği bulunamadı. Ölçüm yoksa hangi sayfanın ziyaretçi ve dönüşüm getirdiğini göremezsiniz. Etiket bir çerez onay aracı ya da başka bir betik tarafından sonradan yükleniyorsa burada görünmez; o durumda bu bulguyu yok sayabilirsiniz.":
    "Nell'HTML delle pagine scansionate non è stato trovato alcun ID di Google Analytics 4 (G-), Google Tag Manager (GTM-) o Universal Analytics (UA-). Senza misurazione non puoi vedere quali pagine portano visitatori e conversioni. Se il tag viene caricato in seguito da uno strumento di consenso cookie o da un altro script, qui non compare; in quel caso puoi ignorare questo risultato.",
  "Google Analytics 4'te bir web veri akışı oluşturun ve verdiği etiketi tüm sayfaların head bölümüne ekleyin; ya da Etiket Yöneticisi kullanıyorsanız kapsayıcı kodunu ekleyin. Sonra Analytics'teki gerçek zamanlı raporda ziyaretinizin göründüğünü kontrol edin.":
    "Crea uno stream di dati web in Google Analytics 4 e aggiungi il tag che ti fornisce all'head di ogni pagina, oppure aggiungi il codice del contenitore se usi Tag Manager. Poi verifica che la tua visita compaia nel report In tempo reale di Analytics.",
  "Sayfalardaki Analytics kimliği bağlı mülkle eşleşmiyor":
    "L'ID di Analytics nelle pagine non corrisponde alla proprietà collegata",
  "Sayfalarda bulunan Google Analytics 4 ölçüm kimliği (G-), bu projeye bağlı Analytics mülkünün web veri akışlarındaki kimliklerden hiçbiriyle eşleşmiyor. Yani ziyaretçi verisi büyük olasılıkla başka bir mülke gidiyor ve buradaki Analytics raporları siteyi göstermiyor. Eski bir mülkün kodu ya da kopyalanmış bir şablon genelde nedendir.":
    "L'ID di misurazione di Google Analytics 4 (G-) trovato nelle pagine non corrisponde a nessuno degli ID negli stream di dati web della proprietà Analytics collegata a questo progetto. Quindi è molto probabile che i dati dei visitatori vadano a un'altra proprietà e che i report di Analytics qui non mostrino questo sito. Di solito la causa è il codice di una vecchia proprietà o un template copiato.",
  "Ayrıntıdaki iki kimlik listesini karşılaştırın. Doğru mülk bağlıysa sayfalardaki etiketi o mülkün ölçüm kimliğiyle değiştirin; sayfalardaki doğruysa Ayarlar'dan projeye o mülkü bağlayın.":
    "Confronta i due elenchi di ID nei dettagli. Se è collegata la proprietà giusta, sostituisci il tag nelle pagine con l'ID di misurazione di quella proprietà; se è giusto quello nelle pagine, collega quella proprietà al progetto in Impostazioni.",
  "{count} kontrol aşamasından geçti": "{count} controlli superati",
  Ölçülmedi: "Non misurato",
  "Geçen {count} kontrol": "{count} controlli superati",
  Geçti: "Superato",
  "{count} sayfada": "Su {count} pagine",
  "Başlangıç sayfası okunamadığı için önizleme yok.":
    "Nessuna anteprima, perché non è stato possibile leggere la pagina iniziale.",
  "Hız ölçülmedi": "Velocità non misurata",
  "Hız ölçülemedi": "Impossibile misurare la velocità",
  "Başlangıç sayfası ölçülemedi; gösterilen, ölçülen en üst sayfa: {url}":
    "Impossibile misurare la pagina iniziale; viene mostrata la pagina misurata meno profonda: {url}",
  "Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok. Denetimi hız ölçümü açık başlatırsanız gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.":
    "Questo audit non ha una misurazione PageSpeed per la pagina iniziale. Esegui l'audit con i test di velocità attivi: qui compariranno i dati degli utenti reali (CrUX) e i risultati di laboratorio.",
  "Temel Web Verileri": "Segnali web essenziali",
  "Gerçek kullanıcı verisi Chrome Kullanıcı Deneyimi Raporu'ndan (CrUX, son 28 gün, mobil); laboratuvar sütunu PageSpeed Insights'ın tek ölçümü.":
    "I dati degli utenti reali provengono dal Chrome User Experience Report (CrUX, ultimi 28 giorni, mobile); la colonna di laboratorio è una singola esecuzione di PageSpeed Insights.",
  Metrik: "Metrica",
  "Bu sayfa, gerçek": "Questa pagina, utenti reali",
  "Tüm site, gerçek": "Intero sito, utenti reali",
  "Anlık veri": "Dati immediati",
  "Site puanı {score}/100, {word}": "Punteggio del sito {score}/100, {word}",
  "Uyarı ve bilgi": "Avvisi e note",
  "Kategori puanları": "Punteggi per categoria",
  "Tüm kontroller": "Tutti i controlli",
  "{passed}/{total} geçti": "{passed}/{total} superati",
  "Puan geçmişi": "Cronologia del punteggio",
  "Son {count} denetimin puanı": "Punteggio degli ultimi {count} audit",
  "Öncekiyle aynı": "Uguale all'ultima volta",
  "{value} puan, öncekine göre": "{value} punti dall'ultimo audit",
  "Tarayıcı erişimi (robots.txt)": "Accesso dei crawler (robots.txt)",
  "Arama motorları ve yapay zekâ tarayıcıları sitenin ana sayfasını okuyabiliyor mu?":
    "I motori di ricerca e i crawler di IA possono leggere la home page del sito?",
  "Arama motoru": "Motore di ricerca",
  "Yapay zekâ": "IA",
  Engelli: "Bloccato",
  İzinli: "Consentito",
  "DNS kayıtları": "Record DNS",
  "Bazı sorgular yanıt vermedi; liste eksik olabilir.":
    "Alcune ricerche non hanno risposto; l'elenco potrebbe essere incompleto.",
  "Ölçüm etiketleri": "Tag di misurazione",
  "Sayfaların HTML'sinde bulunan Google Analytics ve Etiket Yöneticisi kimlikleri.":
    "ID di Google Analytics e Tag Manager trovati nell'HTML delle pagine.",
  "Hiçbir sayfada etiket bulunamadı.": "Nessun tag trovato in alcuna pagina.",
  "Yapılandırılmış veri türleri": "Tipi di dati strutturati",
  "Sayfaların JSON-LD ile bildirdiği schema.org türleri.":
    "Tipi schema.org che le pagine dichiarano in JSON-LD.",
  "Hiçbir sayfada yapılandırılmış veri bulunamadı.":
    "Nessun dato strutturato trovato in alcuna pagina.",
  "{date} (süresi doldu)": "{date} (scaduto)",
  "{date} ({count} gün kaldı)": "{date} ({count} giorni rimanenti)",
  "Sunucu ve yanıt": "Server e risposta",
  "{count} adım": "{count} passaggi",
  "İlk bayt (TTFB)": "Primo byte (TTFB)",
  "Toplam yanıt": "Risposta totale",
  "HTML boyutu": "Dimensione HTML",
  Sıkıştırma: "Compressione",
  Önbellek: "Cache",
  Sunucu: "Server",
  "Teknoloji ipucu": "Indizio sulla tecnologia",
  "Güvenlik başlıkları": "Intestazioni di sicurezza",
  "http'den https'e yönlendirme": "Reindirizzamento da http a https",
  "Çerçeveye gömme koruması": "Protezione dai frame",
  "Alan adı ve sertifika": "Dominio e certificato",
  "Sertifika bilgisi herkese açık Certificate Transparency kayıtlarından; alan adı bilgisi RDAP'tan.":
    "I dettagli del certificato provengono dai registri pubblici di Certificate Transparency; quelli del dominio da RDAP.",
  "Sertifikayı veren": "Emittente del certificato",
  "Sertifika bitişi": "Scadenza del certificato",
  "Kayıt firması": "Registrar",
  "Kayıt tarihi": "Registrato",
  "Alan adı bitişi": "Scadenza del dominio",
  "Diğer adres": "Altro host",
  "Asıl adrese yönleniyor": "Reindirizza all'host principale",
  "Ayrı açılıyor": "Si apre separatamente",
  "Ana sayfaya yönleniyor": "Reindirizza alla home page",
  "Doğru: {status}": "Corretto: {status}",
  "Hatalı: {status} dönüyor": "Errato: restituisce {status}",
  "Dosyalar ve hata sayfası": "File e pagina di errore",
  "robots.txt içinde Sitemap satırı": "Riga Sitemap nel robots.txt",
  "Olmayan bir sayfa": "Una pagina che non esiste",
  "Bu denetim site bilgisi toplanmadan önce yapılmış. Sunucu, güvenlik başlıkları, DNS ve sertifika bilgisini görmek için denetimi yeniden çalıştırın.":
    "Questo audit è stato eseguito prima che venissero raccolti i dettagli del sito. Esegui di nuovo l'audit per vedere server, intestazioni di sicurezza, DNS e dettagli del certificato.",
  "Google arama sonucu önizlemesi": "Anteprima del risultato di ricerca Google",
  "(başlık yok)": "(nessun titolo)",
  "(meta açıklama yok; Google sayfadan bir parça seçer)":
    "(nessuna meta description; Google sceglie un passaggio dalla pagina)",
  "Başlık {px} piksel; yaklaşık {max} pikselden sonrası kesiliyor.":
    "Il titolo è di {px} pixel; oltre circa {max} pixel viene tagliato.",
  "Başlık {px} piksel, sığıyor.": "Il titolo è di {px} pixel e ci sta.",
  "Sayfanın başlığı yok.": "La pagina non ha un titolo.",
  "Açıklama iki satıra sığmıyor; sonu kesilerek gösterilir.":
    "La descrizione non sta in due righe; la parte finale viene tagliata.",
  "Paylaşım kartı önizlemesi (Open Graph)":
    "Anteprima della scheda di condivisione (Open Graph)",
  "Görsel açılamadı": "Impossibile caricare l'immagine",
  "og:image yok": "Nessun og:image",
  "Open Graph başlığı, açıklaması ve görseli tanımlı.":
    "Titolo, descrizione e immagine Open Graph sono impostati.",
  "Eksik: {tags}. Paylaşım siteleri yerine sayfadan tahmin eder.":
    "Mancano: {tags}. I siti di condivisione li ricavano invece dalla pagina.",
  "Twitter kartı: {card}": "Scheda Twitter: {card}",
  "Twitter kartı tanımlı değil.": "Nessuna scheda Twitter impostata.",
  "{url}: {critical} kritik, {warning} uyarı, {info} bilgi":
    "{url}: {critical} critici, {warning} avvisi, {info} note",
  "{count} tıklama": "{count} clic",
  "Son denetimden bu yana": "Dall'ultimo audit",
  "{date} tarihli denetimle karşılaştırıldı.":
    "Confronto con l'audit del {date}.",
  "Düzeltilenler ({count})": "Risolti ({count})",
  "Önceki denetimdeki sorunların hiçbiri tamamen gitmedi.":
    "Nessuno dei problemi dell'audit precedente è del tutto scomparso.",
  "Yeni çıkanlar ({count})": "Nuovi ({count})",
  "Yeni bir sorun türü çıkmadı.":
    "Non è comparso nessun nuovo tipo di problema.",
  "Search Console trafiği yükleniyor; sıralama birazdan güncellenebilir.":
    "Caricamento del traffico di Search Console; l'ordine potrebbe aggiornarsi tra un attimo.",
  "Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı ({start} – {end}).":
    "Ordine: impatto sul punteggio, ponderato per i clic di Search Console delle pagine interessate ({start} – {end}).",
  "Search Console bağlı değil ya da yanıt vermedi; sıralama yalnızca puan etkisine göre.":
    "Search Console non è collegato o non ha risposto; l'ordine è solo per impatto sul punteggio.",
  "İlk {count} işi göster": "Mostra le prime {count} attività",
  "Tüm {count} işi göster": "Mostra tutte le {count} attività",
  "{clicks} tıklama, {impressions} gösterim":
    "{clicks} clic, {impressions} impressioni",
  "ve {count} sayfa daha": "e altre {count} pagine",
  "Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı.":
    "Ordine: impatto sul punteggio, ponderato per i clic di Search Console delle pagine interessate.",
  Tarayıcılar: "Crawler",
  "Başlık arama sonucunda kesiliyor.":
    "Il titolo viene tagliato nei risultati di ricerca.",
  "Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok; gerçek kullanıcı verisi (CrUX) ölçülmedi.":
    "Questo audit non ha una misurazione PageSpeed per la pagina iniziale; i dati degli utenti reali (CrUX) non sono stati misurati.",
  "2. Anlık veri": "2. Dati immediati",
  "Siteniz hakkında denetim anında toplanan bilgiler: sunucu, güvenlik başlıkları, DNS, sertifika, robots.txt ve gerçek kullanıcı hızı.":
    "Ciò che l'audit ha raccolto sul tuo sito in quel momento: server, intestazioni di sicurezza, DNS, certificato, robots.txt e velocità per gli utenti reali.",
  "Kategori başına 100 üzerinden puan": "Punteggio su 100 per categoria",
  Sorunlu: "Non superato",
  "Puan etkisi": "Impatto sul punteggio",
  "Puan etkisi, o kategorideki sorunların site puanından düşürdüğü puandır; hepsi düzelirse site puanına geri eklenir.":
    "L'impatto sul punteggio è il numero di punti che i problemi di quella categoria tolgono al punteggio del sito; se li risolvi tutti, vengono restituiti.",
  "Denetim tarihine göre site puanı": "Punteggio del sito per data dell'audit",
  "1. Puan dağılımı ve kontroller": "1. Ripartizione del punteggio e controlli",
  "Denetim, her sorun türünü bir kontrol olarak çalıştırır. Bulgusu olan kontrol sorunlu, ölçülüp temiz çıkan geçti sayılır; verisi toplanamayan kontrol ölçülmedi olarak kalır, ne geçti ne kaldı sayılır.":
    "L'audit esegue ogni tipo di problema come un controllo. Un controllo con risultati non è superato, uno misurato e risultato pulito è superato, e uno i cui dati non è stato possibile raccogliere resta non misurato: non conta né come superato né come non superato.",
  "Ölçülmedi ({count})": "Non misurati ({count})",
  "Ek C. Geçen ve ölçülemeyen kontroller":
    "Appendice C. Controlli superati e non misurati",
  "Sorun çıkmayan kontroller ve verisi toplanamadığı için sonuç verilmeyen kontroller.":
    "Controlli che non hanno trovato nulla e controlli senza risultato perché non è stato possibile raccoglierne i dati.",
  "Ana içeriğin görünmesi": "Comparsa del contenuto principale",
  "Tıklamaya tepki": "Risposta a un tocco",
  "Görsel kayma": "Spostamento del layout",
  "İlk içerik": "Primo contenuto",
  "Sunucunun ilk yanıtı": "Prima risposta del server",
  İyileştirilmeli: "Da migliorare",
  Mükemmel: "Eccellente",
  "Yapılacak her iş tek listede, en çok kazandıranı üstte. Search Console bağlıysa trafik getiren sayfalardaki işler öne çıkar.":
    "Tutte le attività in un unico elenco, le più utili per prime. Con Search Console collegato, salgono le attività sulle pagine che portano traffico.",
  "Denetimin yaptığı her kontrol, kategorisine göre: geçenler, kalanlar ve ölçülemeyenler.":
    "Ogni controllo eseguito dall'audit, per categoria: superati, non superati e non misurati.",
  "Küçük iş": "Attività piccola",
  "Orta iş": "Attività media",
  "Büyük iş": "Attività grande",
  "{url} adresinin telefondaki görünümü": "{url} come appare su un telefono",
  "Mobil hız ölçümünün son ekran görüntüsü":
    "Ultimo screenshot del test di velocità mobile",
  "yaklaşık {duration} kaldı": "circa {duration} rimanenti",
  "Hız ölçümü: {pages} sayfa × {devices} cihaz, Google PageSpeed ile. Google dakikada sınırlı ölçüme izin verdiği için bu adım en uzunu.":
    "Test di velocità: {pages} pagine × {devices} dispositivi, con Google PageSpeed. Google consente solo un certo numero di test al minuto, quindi questo è il passaggio più lungo.",
  "{done} / {total} ölçüm": "{done} / {total} test",
  "Site haritası ve ana sayfanın bağlantılarından adresler toplanıyor.":
    "Raccolta degli indirizzi dalla sitemap e dai link della home page.",
  "Her sayfa indirilip başlık, içerik, bağlantı ve teknik kontrollerden geçiriliyor.":
    "Download di ogni pagina ed esecuzione dei controlli su titolo, contenuto, link e aspetti tecnici.",
  "Bulgular puanlanıyor ve sonuçlar hazırlanıyor.":
    "Assegnazione dei punteggi ai risultati e preparazione dei risultati.",
  "{shown} / {total} satır": "{shown} di {total} righe",
  "{count} geçti": "{count} superati",
  "{count} sorunlu": "{count} con problemi",
  "{count} ölçülmedi": "{count} non misurati",
  "{total} kontrol: {summary}": "{total} controlli: {summary}",
  "Kısmi veri": "Dati parziali",
  "{count} kontrol ölçülmedi: neden?": {
    one: "{count} controllo non misurato: perché?",
    other: "{count} controlli non misurati: perché?",
  },
  "Düzeltilirse site puanına yaklaşık bu kadar eklenir; değerler toplanmaz.":
    "Quanto aggiunge circa la correzione al punteggio del sito; i valori non si sommano.",
  "{points} puan kayıp": "{points} punti persi",
  "Hız ölçümü (PageSpeed) bu denetimde sonuç vermedi; nedeni Hız sekmesinde.":
    "Il test di velocità (PageSpeed) non ha restituito risultati in questo audit; la scheda Velocità spiega perché.",
  "Sayfalar Google'da henüz kontrol edilmedi; Dizin durumu sekmesinden sorabilirsiniz.":
    "Le pagine non sono ancora state verificate con Google; puoi chiederlo dalla scheda Stato indice.",
  "Karşılaştırma için bağlı bir Google Analytics mülkü ve sayfalarda bir G- etiketi gerekir.":
    "Questo confronto richiede una proprietà Google Analytics collegata e un tag G- nelle pagine.",
  "Site hakkındaki bilginin bir kısmı (sertifika, alan adı kaydı, DNS) bu denetimde okunamadı.":
    "Alcune informazioni sul sito (certificato, registrazione del dominio, DNS) non sono state lette in questo audit.",
  "PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Ölçüm çalışınca gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.":
    "Il test PageSpeed non ha restituito risultati in questo audit: {error} Quando verrà eseguito, qui compariranno i dati degli utenti reali (CrUX) e i risultati di laboratorio.",
  "Bu proje {auditedHost} için Google verisi okuyamıyor":
    "Questo progetto non può leggere i dati Google per {auditedHost}",
  "Projenin Search Console bağlantısı {propertyHost} mülküne ait. Google'a {auditedHost} sayfalarını sormak günlük kotayı boşa harcardı, bu yüzden dizin durumu, site haritaları ve kota bu denetimde gösterilmiyor. {auditedHost} için ayrı bir proje açıp kendi mülküne bağlayın.":
    "La connessione Search Console del progetto appartiene alla proprietà {propertyHost}. Chiedere a Google delle pagine di {auditedHost} sprecherebbe la quota giornaliera, quindi stato dell'indice, sitemap e quota non vengono mostrati per questo audit. Crea un progetto separato per {auditedHost} e collegalo alla sua proprietà.",
  "Siteyi ayrı proje olarak ekle": "Aggiungi il sito come progetto a sé",
  "Henüz kontrol edilmedi": "Non ancora verificato",
  "Bu denetimin Google'a sorulmamış sayfaları. Son kontrol {date}":
    "Pagine di questo audit non ancora verificate con Google. Ultima verifica {date}",
  "Bu denetimin Google'a sorulmamış sayfaları.":
    "Pagine di questo audit non ancora verificate con Google.",
  "En çok sayfayı etkileyen {count} sorun türü; kalan {hidden} tür aşağıdaki listede.":
    "I {count} tipi di problema che interessano più pagine; gli altri {hidden} sono nell'elenco qui sotto.",
  "En çok sayfayı etkileyen {count} sorun türü.":
    "I {count} tipi di problema che interessano più pagine.",
  "Renklerin anlamı": "Cosa significano i colori",
  "Kısmi veri: {measured} / {total} ölçüm sonuç verdi. Ortalamalar yalnızca ölçülenlerden.":
    "Dati parziali: {measured} test su {total} hanno restituito un risultato. Le medie usano solo quelli.",
  "Ayarlar'dan ücretsiz bir PageSpeed anahtarı ekleyip denetimi yeniden başlatın.":
    "Aggiungi una chiave PageSpeed gratuita in Impostazioni ed esegui di nuovo l'audit.",
  "PageSpeed anahtarı ekle": "Aggiungi una chiave PageSpeed",
  "{count} ölçüm yapılamadı": {
    one: "{count} test non è stato eseguito",
    other: "{count} test non sono stati eseguiti",
  },
  "Sayfa başına telefon ve bilgisayar ayrı ölçülür.":
    "Ogni pagina viene testata separatamente su telefono e computer.",
  Ölçülemedi: "Non misurato",
  "Google'ın ücretsiz günlük ölçüm kotası doldu. Bu sitenizden kaynaklanmıyor: sayfalar yavaş sayılmadı, yalnızca ölçülemedi.":
    "La quota giornaliera gratuita di test di Google è esaurita. Non dipende dal tuo sito: le pagine non sono state giudicate lente, semplicemente non è stato possibile misurarle.",
  "PageSpeed anahtarı olmadan Google'ın herkesle paylaşılan ücretsiz kotası kullanılıyor ve bu kota doldu. Bu sitenizden kaynaklanmıyor.":
    "Senza una chiave PageSpeed viene usata la quota gratuita di Google condivisa da tutti, che si è esaurita. Non dipende dal tuo sito.",
  "Google'ın dakikalık ölçüm sınırına takıldı. Bu sitenizden kaynaklanmıyor; bir süre sonra yeniden deneyin.":
    "I test hanno raggiunto il limite al minuto di Google. Non dipende dal tuo sito; riprova un po' più tardi.",
  "Google'ın ölçüm aracı bu sayfalar için sonuç döndürmedi. Ayrıntı aşağıdaki listede.":
    "Lo strumento di test di Google non ha restituito risultati per queste pagine. L'elenco qui sotto contiene i dettagli.",
  "Yapılacaklar ({count})": "Da fare ({count})",
  "Kontroller ({count})": "Controlli ({count})",
  "Hız ({measured}/{total})": "Velocità ({measured}/{total})",
  "İlk denetim. Puanın seyri bir sonrakinde başlar.":
    "Primo audit. L'andamento del punteggio parte dal prossimo.",
  "Kritik sorun": "Problemi critici",
  İyileştirme: "Miglioramenti",
  "Geçen kontrol": "Controlli superati",
  "Veri toplanamadı": "Nessun dato raccolto",
  "{measured}/{total} kontrol ölçüldü": "{measured}/{total} controlli misurati",
  "Bu denetimde veri toplanamadı": "Nessun dato raccolto in questo audit",
  "{category}: {state}. Kontrolleri aç":
    "{category}: {state}. Apri i controlli",
  "{findings} bulgu, {types} sorun türü. Bulgu, bir sorunun bir sayfada görülmesidir. Bir gruba tıklayın, liste yalnızca onları göstersin.":
    "{findings} risultati, {types} tipi di problema. Un risultato è un problema rilevato in una pagina. Fai clic su un gruppo per mostrare solo quelli nell'elenco.",
  "{allowed}/{total} izinli": "{allowed}/{total} consentiti",
  "{present}/{total} var": "{present}/{total} presenti",
  "Sertifikanın süresi doldu": "Certificato scaduto",
  "Sertifika {count} gün geçerli": {
    one: "Certificato valido per {count} giorno",
    other: "Certificato valido per {count} giorni",
  },
  "Site ya da kayıt servisi denetim sırasında bu bilgilere yanıt vermedi. Sitenizde bir sorun olduğu anlamına gelmez; denetimi yeniden çalıştırınca tekrar sorulur.":
    "Il sito o il registro non hanno risposto a queste richieste durante l'audit. Non significa che il tuo sito abbia un problema; verranno richieste di nuovo quando ripeterai l'audit.",
  "Çubuk, sayfadaki sorun türlerinin önem ağırlıklı toplamı: bir kritik sorun 40, bir uyarı 15, bir bilgi 3 sayılır. En uzun çubuk en çok iş çıkaran sayfa.":
    "La barra è il totale ponderato per gravità dei tipi di problema della pagina: un problema critico vale 40, un avviso 15, una nota 3. La barra più lunga è la pagina con più lavoro da fare.",
  "Önce bunlar:": "Inizia da qui:",
  "ilk {count} iş.": {
    one: "{count} correzione.",
    other: "le prime {count} correzioni.",
  },
  "ilk {count} iş birlikte site puanını yaklaşık {points} puan yükseltir.": {
    one: "{count} correzione alza il punteggio del sito di circa {points} punti.",
    other:
      "insieme, le prime {count} correzioni alzano il punteggio del sito di circa {points} punti.",
  },
  "ilk {count} iş, site puanını 1 puandan az yükseltir.": {
    one: "{count} correzione alza il punteggio del sito di meno di 1 punto.",
    other:
      "le prime {count} correzioni alzano il punteggio del sito di meno di 1 punto.",
  },
  "Bu sorun tek başına düzeltilirse yaklaşık kazanç; değerler toplanmaz.":
    "Quanto si guadagna circa correggendo solo questo problema; i valori non si sommano.",
  "{points} puan": "{points} punti",
  "Yeni kontroller eklendi; bu karşılaştırma yalnızca iki denetimin de ölçtüğü kontrolleri kapsar.":
    "Sono stati aggiunti nuovi controlli; questo confronto copre solo i controlli misurati da entrambi gli audit.",
  "Platform alan adı": "Dominio della piattaforma",
  "Site bir barındırma platformunun alt alan adında; kaydı ve DNS'i platforma ait olduğu için alan adı ve DNS kontrolleri yapılmadı.":
    "Il sito è su un sottodominio di una piattaforma di hosting; registrazione e DNS appartengono alla piattaforma, quindi i controlli su dominio e DNS sono stati saltati.",
  "sayı alınamadı (tarama sınırı)": "conteggio non letto (limite di scansione)",
  "Twitter kartı: ölçülmedi.": "Scheda Twitter: non misurata.",
  "Google hizmet hesabı kullanılıyor (Ayarlar'da kayıtlı). Bir OAuth istemcisi de tanımlı; hizmet hesabı önce gelir.":
    "Viene usato l'account di servizio Google (salvato in Impostazioni). È configurato anche un client OAuth; l'account di servizio ha la precedenza.",
  "Google hizmet hesabı kullanılıyor (Ayarlar'da kayıtlı).":
    "Viene usato l'account di servizio Google (salvato in Impostazioni).",
  "Google OAuth istemcisi kullanılıyor (Ayarlar'da kayıtlı).":
    "Viene usato il client OAuth di Google (salvato in Impostazioni).",
  "Google OAuth istemcisi kullanılıyor (GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET ortam değişkenlerinden).":
    "Viene usato il client OAuth di Google (dalle variabili d'ambiente GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET).",
  "Google erişimi henüz girilmedi: Ayarlar'a bir hizmet hesabı ya da OAuth istemcisi girin. Girmeden Search Console ve Analytics bağlanamaz.":
    "Nessun accesso Google ancora inserito: aggiungi un account di servizio o un client OAuth in Impostazioni. Search Console e Analytics non possono collegarsi senza.",
  "Orta düzeyde. Kritik sorun yok; uyarı sorunları aramadaki performansı gölgeliyor.":
    "Discreto. Nessun problema critico; gli avvisi frenano le prestazioni nella ricerca.",
  "Zayıf. Kritik sorun yok, ama birikmiş uyarılar aramadaki performansı aşağı çekiyor; en çok puan getirenlerden başlayın.":
    "Scarso. Nessun problema critico, ma gli avvisi accumulati frenano le prestazioni nella ricerca; inizia da quelli che valgono più punti.",
  "PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Gerçek kullanıcı verisi (CrUX) ölçülmedi.":
    "PageSpeed non ha restituito risultati in questo audit: {error} I dati degli utenti reali (CrUX) non sono stati misurati.",
  "<strong>Laboratuvar ve gerçek kullanıcı verisi.</strong> Buradaki rakamlar Lighthouse'un laboratuvar ölçümüdür: tek bir sanal cihazda, kontrollü ağ ve işlemci koşulunda yapılır. Gerçek ziyaretçilerden toplanan alan verisi (Chrome Kullanıcı Deneyimi Raporu, CrUX), PageSpeed ölçümü varsa Anlık veri bölümündeki Temel Web Verileri tablosundadır. İkisi farklı çıkabilir. Google, sıralama sistemlerinde alan verisini (CrUX) kullanır; ama iyi bir değer tek başına sıralama garantisi vermez, içeriğin ilgili olması öncelik taşır.":
    "<strong>Dati di laboratorio e dati degli utenti reali.</strong> Questi valori sono misurazioni di laboratorio di Lighthouse, effettuate su un unico dispositivo simulato con condizioni di rete e CPU controllate. I dati sul campo raccolti dai visitatori reali (Chrome User Experience Report, CrUX) si trovano nella tabella Segnali web essenziali della sezione Dati immediati, quando PageSpeed è stato misurato. I due possono differire. I sistemi di ranking di Google usano i dati sul campo (CrUX), ma un buon valore da solo non garantisce il posizionamento; i contenuti pertinenti vengono prima.",
  "Puanlar, o sorun tek başına tamamen düzeltilirse site puanına eklenecek yaklaşık değerdir; değerler toplanmaz.":
    "I punti indicano circa quanto aggiungerebbe al punteggio del sito la correzione completa di quel solo problema; i valori non si sommano.",
  Kapalı: "Disattivato",
  "{measured} / {total} ölçüm": "{measured} misurazioni su {total}",
  "Denetim tarihi": "Data dell'audit",
  "{count} (üst sınır {max})": "{count} (limite {max})",
  "Google dizin verisi": "Dati dell'indice Google",
  "Kritik kontrol": "Controlli critici",
  "Temiz çıkan": "Risultati puliti",
  "Bir ayarı değiştirdim, uygulama görmüyor":
    "Ho cambiato un'impostazione e l'app non la vede",
  "Google erişimi, PageSpeed anahtarı ve dil Ayarlar ekranında girilir ve hemen geçerli olur. Windows paketinde .env dosyası ve ortam değişkeni yoktur.":
    "Accesso Google, chiave PageSpeed e lingua si inseriscono nella schermata Impostazioni e si applicano subito. Il pacchetto Windows non ha un file .env né variabili d'ambiente.",
  "Elle değiştirilebilen tek dosya {config}: adres numarası (port) ve kendiliğinden güncelleme. {dataFolder} ile açın, değiştirin, sonra {restart} deyin. Yanındaki {serverEnv} dosyasını düzenlemeyin; uygulama her açılışta onu yeniden yazar.":
    "L'unico file da modificare a mano è {config}: porta e aggiornamenti automatici. Aprilo con {dataFolder} (Apri la cartella dei dati), modificalo, poi scegli {restart} (Riavvia). Non modificare il file {serverEnv} accanto; l'app lo riscrive a ogni avvio.",
  "Ayarlar ekranında girilenler hemen geçerli olur. {env} dosyasındaki değişkenler (örneğin {port}, {host}, {token}) ise yalnızca konteyner yeniden oluşturulunca okunur: {command}":
    "Ciò che inserisci nella schermata Impostazioni si applica subito. Le variabili nel file {env} (ad esempio {port}, {host}, {token}) vengono lette solo quando il container viene ricreato: {command}",
  "Yalnızca yeniden başlatmak için: {command} Bu, .env değişikliğini uygulamaz. {docs}":
    "Solo per riavviare: {command} Questo non applica una modifica al .env. {docs}",
  "Ortam değişkenleri": "Variabili d'ambiente",
  "Rapor hazırlanıyor…": "Preparazione del report…",
  "Dizin durumu kontrol ediliyor": "Verifica dello stato dell'indice",
  "Sosyal ve yapılandırılmış veri": "Social e dati strutturati",
};
