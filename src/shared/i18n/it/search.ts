/* eslint-disable max-lines -- locale translation data */
import type { Catalog } from "@/shared/i18n";

/** Italian for the Search performance screen, its to-do copy and the printable report. */
export const itSearch: Catalog = {
  "{count} sorgu gözlendi.": "Ricerche osservate: {count}.",
  "En çok gösterilenler": "Ricerche più visualizzate",
  "Tam yanıtlı gün: {current}/{days}; önceki dönem: {previous}/{days}.":
    "Giorni con risposta completa: {current}/{days}; periodo precedente: {previous}/{days}.",
  "Arşivde en çok gösterim": "Più impressioni in questo archivio",
  "{date} tarihli geçmiş bu bilgisayarda saklı; Google'ın 16 ay sınırı buna uygulanmaz.":
    "Lo storico del {date} è conservato su questo computer; il limite di 16 mesi di Google non si applica.",
  "Marka adları kaydedildi": "Nomi del brand salvati",
  "Marka adları kaydedilemedi": "Impossibile salvare i nomi del brand",
  "Sitenizin adını ve insanların onu nasıl yazdığını girin. Bu kelimeleri içeren aramalar marka araması sayılır.":
    "Inserisci il nome del tuo sito e i modi in cui le persone lo scrivono. Le ricerche che contengono queste parole contano come ricerche di brand.",
  "Marka adları": "Nomi del brand",
  "{term} adını kaldır": "Rimuovi {term}",
  "Marka adı ekle": "Aggiungi un nome del brand",
  "Örnek: örnek site": "Esempio: sito di esempio",
  Ekle: "Aggiungi",
  "Öneriler:": "Suggerimenti:",
  "Eşiği aşan değişim yok.": "Nessuna variazione sopra la soglia.",
  "{previous} → {current} tıklama": "{previous} → {current} clic",
  "sıra {position}": "posizione {position}",
  "Düşenler ({count})": "In calo ({count})",
  "Yükselenler ({count})": "In crescita ({count})",
  "Arşivde henüz gün yok. Bu ekran her açıldığında Search Console'dan günlük toplamları alıp bu bilgisayarda saklar; ay ay eğilim birkaç gün içinde burada görünür.":
    "Ancora nessun giorno nell'archivio. A ogni apertura questa schermata salva su questo computer i totali giornalieri di Search Console; l'andamento mese per mese apparirà qui entro pochi giorni.",
  "Arşiv {date} tarihinden başlıyor; iki ay dolunca eğilim burada görünür.":
    "L'archivio parte dal {date}; l'andamento apparirà quando conterrà due mesi.",
  "{count} aylık tıklama, {start} – {end}.":
    "Clic in {count} mesi, {start} – {end}.",
  "Aylık tıklama": "Clic mensili",
  Ay: "Mese",
  "Arşivdeki gün": "Giorni nell'archivio",
  "Bu bilgisayardaki arşivden, cihaz filtresine göre (ülke filtresi uygulanmaz). Kesik çizgili çubuk: arşivin o ayın tamamını tutmadığı ay.":
    "Dall'archivio su questo computer, secondo il filtro dispositivo (il filtro paese non si applica). Barra tratteggiata: un mese che l'archivio non contiene per intero.",
  "Önceki döneme göre en çok değişenler":
    "Le variazioni maggiori rispetto al periodo precedente",
  "{start} – {end} ile karşılaştırma. En az {clicks} tıklamalık ve {share} oranında bir değişim aranır.":
    "Confronto con {start} – {end}. Si cerca una variazione di almeno {clicks} clic e del {share}.",
  "Satır sınırı yüzünden bir dönemin tablosu eksik; yalnızca iki dönemde de görünen satırlar karşılaştırıldı.":
    "La tabella di un periodo è incompleta per il limite di righe; sono state confrontate solo le righe presenti in entrambi i periodi.",
  "Yeni ve kaybolan sorgular": "Query nuove e perse",
  "Yalnızca bir dönemde en az {impressions} gösterim alan sorgular.":
    "Query con almeno {impressions} impressioni in uno solo dei due periodi.",
  "Yeni görünenler": "Nuove",
  "Önceki dönemin tablosu satır sınırında kesildiği için hangi sorguların yeni olduğu bilinemiyor.":
    "Non si può sapere quali query siano nuove: la tabella del periodo precedente è stata troncata al limite di righe.",
  "Bu dönemde yeni görünen sorgu yok.":
    "Nessuna nuova query in questo periodo.",
  "Kaybolanlar (önceki dönemdeki değerleriyle)":
    "Perse (con i valori del periodo precedente)",
  "Bu dönemin tablosu satır sınırında kesildiği için hangi sorguların kaybolduğu bilinemiyor.":
    "Non si può sapere quali query siano state perse: la tabella di questo periodo è stata troncata al limite di righe.",
  "Kaybolan sorgu yok.": "Nessuna query persa.",
  "Gücünü kaybeden sayfalar": "Pagine che perdono terreno",
  "Son çeyrekteki tıklamaları, önceki dört çeyreğin en iyisinin {share} kadarından aza düşen ve geçen yılın aynı çeyreğinden de geride kalan sayfalar.":
    "Pagine i cui clic dell'ultimo trimestre sono scesi sotto il {share} del migliore dei quattro trimestri precedenti e restano indietro anche rispetto allo stesso trimestre dell'anno scorso.",
  "Bu karşılaştırma bir yılı aşkın veri ister; Search Console bu mülk için o kadar eski veri vermedi ya da filtre uygulanmış.":
    "Questo confronto richiede più di un anno di dati; Search Console non ne ha forniti tanti per questa proprietà, oppure è attivo un filtro.",
  "Belirgin biçimde gücünü kaybeden sayfa yok.":
    "Nessuna pagina sta chiaramente perdendo terreno.",
  "Son çeyrek {clicks} · en iyisi {peak} tıklama":
    "Ultimo trimestre {clicks} · migliore {peak} clic",
  "Uzun dönem: aylık tıklama": "Lungo periodo: clic mensili",
  "Search Console en fazla 16 ay geriye gider; bu arşiv günlük toplamları bu bilgisayarda daha uzun saklar.":
    "Search Console risale al massimo a 16 mesi; questo archivio conserva più a lungo i totali giornalieri su questo computer.",
  sorgular: "query",
  sayfalar: "pagine",
  "sorgu-sayfa eşleşmeleri": "coppie query-pagina",
  "Geçen yıl karşılaştırılamıyor: Google bu günleri artık vermiyor (en fazla 16 ay).":
    "Impossibile confrontare con l'anno scorso: Google non fornisce più quei giorni (massimo 16 mesi).",
  "Önceki dönem karşılaştırılamıyor: Google bu günleri vermiyor.":
    "Impossibile confrontare con il periodo precedente: Google non fornisce quei giorni.",
  "Verinin durumu": "Stato dei dati",

  "Kesinleşmemiş gün yok.": "Nessun giorno ancora in conteggio.",
  "Son veri: {date}.": "Ultimi dati: {date}.",
  "Bu dönem için Google'dan hiç satır gelmedi.":
    "Google non ha restituito righe per questo periodo.",
  "Gizli sorgular": "Query nascoste",
  "Gizli sorgu payı hesaplanamadı (tıklama yok).":
    "Quota di query nascoste non calcolabile (nessun clic).",
  "Satır sınırına ulaşıldı ({tables}); en az tıklanan uç eksik. Daraltmak için filtre kullanın.":
    "Limite di righe raggiunto ({tables}); manca la coda meno cliccata. Usa un filtro per restringere.",
  "Tablolar tam: {queries} sorgu, {pages} sayfa okundu.":
    "Tabelle complete: lette {queries} query e {pages} pagine.",
  "Sıra 4-10": "Posizione 4-10",
  "İlk sayfada ama ilk üçte değil: en çok tıklama kazandıran adım ilk üçe çıkmaktır.":
    "In prima pagina ma non tra i primi tre: entrare tra i primi tre porta più clic di tutto.",
  "Bu dönem için satır yok": "Nessuna riga per questo periodo",
  "Search Console bu dönem ve filtreler için satır vermedi. Dönemi genişletmeyi ya da filtreleri kaldırmayı deneyin.":
    "Search Console non ha restituito righe per questo periodo e questi filtri. Scegli un periodo più lungo o rimuovi i filtri.",
  "Taban: okunan {rows} sorgu, {clicks} tıklama. Sitenin toplamı {site} tıklama; aradaki fark Google'ın gizlediği sorgulardan.":
    "Base: {rows} query lette, {clicks} clic. Il totale del sito è {site} clic; la differenza sono le query nascoste da Google.",
  "Taban: okunan {rows} sayfa, {clicks} tıklama. Google sayfa satırlarını sayfa bazında topladığı için site toplamından ({site}) biraz farklı olabilir.":
    "Base: {rows} pagine lette, {clicks} clic. Google somma le righe delle pagine per pagina, quindi può differire leggermente dal totale del sito ({site}).",
  "Çubuk, satırın bu tablodaki tıklama payı.":
    "La barra è la quota di clic della riga in questa tabella.",
  "Google'ın satır sınırına ulaşıldı; en az tıklanan uç listede yok.":
    "Raggiunto il limite di righe di Google; la coda meno cliccata non è elencata.",
  "Önceki dönem tablosu da kesildi; değişimi bilinmeyen satırlarda – yazar.":
    "Anche la tabella del periodo precedente è stata troncata; le righe con variazione sconosciuta mostrano –.",
  "Önceki dönemde bilinmiyor": "Sconosciuto per il periodo precedente",
  "Sıra {range}": "Posizione {range}",
  "Paylar sitenin toplamına göre: {clicks} tıklama, {impressions} gösterim.":
    "Quote sul totale del sito: {clicks} clic, {impressions} impressioni.",
  "Bu kırılımda filtre olduğu için paylar satırların toplamına göre: {clicks} tıklama.":
    "Su questa ripartizione è attivo un filtro, quindi le quote sono sul totale delle righe: {clicks} clic.",
  "{name} filtresini kaldır": "Rimuovi il filtro {name}",
  "Tüm ekranı {name} ile daralt": "Restringi tutta la schermata a {name}",
  "Daha az göster": "Mostra meno",
  "Tümünü göster ({count})": "Mostra tutto ({count})",
  "Google'ın satır sınırına ulaşıldı; liste tam değil.":
    "Raggiunto il limite di righe di Google; l'elenco non è completo.",
  "{clicks} tıklama": "{clicks} clic",
  "Okunan {count} sorgunun ortalama sırasına göre. Google'ın gizlediği sorgular burada yok.":
    "In base alla posizione media delle {count} query lette. Le query nascoste da Google non sono incluse.",
  "Haftalara göre sorgu dağılımı": "Query per settimana",
  "{count} haftada, sıra aralıklarının sorgular içindeki payı.":
    "Quota delle fasce di posizione tra le query, su {count} settimane.",
  Hafta: "Settimana",
  "{date} haftası": "Settimana del {date}",
  "Her hafta, o hafta görünen sorguların sıra aralıklarına dağılımı (pay). Bu bilgisayardaki sorgu arşivinden, kesin verilerle; tüm cihaz ve ülkeler.":
    "Ogni settimana, come le query visibili in quella settimana si distribuiscono tra le fasce di posizione (quota). Dall'archivio query di questo computer, dati definitivi; tutti i dispositivi e paesi.",
  "Haftalık dağılım için sorgu arşivi doluyor; Sıralama takibi ekranı ya da bu ekran açıldıkça tamamlanır.":
    "L'archivio query si sta ancora riempiendo per la ripartizione settimanale; si completa aprendo questa schermata o Monitoraggio del posizionamento.",
  "Haftalık dağılım cihaz ya da ülke filtresiyle gösterilmez: arşiv bu kırılımları tutmaz.":
    "La ripartizione settimanale non appare con un filtro dispositivo o paese: l'archivio non conserva queste ripartizioni.",
  "Haftalık dağılım için en az iki hafta gerekir.":
    "La ripartizione settimanale richiede almeno due settimane.",
  "{count} sorgu · {clicks} tıklama": "{count} query · {clicks} clic",
  "(sorgu tıklamalarının {share} kadarı)": "({share} dei clic delle query)",
  "Tıklama oranı {ctr} · ortalama sıra {position}":
    "CTR {ctr} · posizione media {position}",
  "Marka aramaları": "Ricerche di brand",
  "Marka dışı aramalar": "Ricerche non di brand",
  "{count} sorgu · tıklama oranı {ctr} · ortalama sıra {position}":
    "{count} query · CTR {ctr} · posizione media {position}",
  "Marka adları: {terms}. Paylar okunan sorgulara göre; gizli sorgular dahil değil.":
    "Nomi del brand: {terms}. Quote sulle query lette; le query nascoste non sono incluse.",
  "Marka adlarını düzenle": "Modifica i nomi del brand",
  "Sorgularınız Google'da hangi sıralarda görünüyor.":
    "In quali posizioni compaiono le tue query su Google.",
  "Marka ve marka dışı aramalar": "Ricerche di brand e non di brand",
  "Adınızla gelen aramalar ile sizi bilmeden bulanlar ayrı ölçülür.":
    "Le ricerche del tuo nome e quelle di chi non ti conosceva vengono misurate separatamente.",
  "Bir cihaza tıklayınca tüm ekran o cihaza göre daralır.":
    "Fai clic su un dispositivo per restringere tutta la schermata.",
  "Bir ülkeye tıklayınca tüm ekran o ülkeye göre daralır.":
    "Fai clic su un paese per restringere tutta la schermata.",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü. Google bu dökümü sayfa bazında toplar.":
    "I formati speciali in cui i tuoi risultati sono apparsi su Google. Google somma questa ripartizione per pagina.",
  "Google bu dönem için özel bir sonuç biçimi (zengin sonuç, video vb.) bildirmedi.":
    "Google non ha segnalato formati di risultato speciali (risultati avanzati, video e simili) per questo periodo.",
  "Soru ve uzun aramalar": "Domande e ricerche lunghe",
  "Soru kalıbındaki aramalar ve {words} ya da daha çok kelimeli aramalar: içerik fikirlerinin en net kaynağı.":
    "Ricerche formulate come domanda e ricerche di {words} o più parole: la fonte più chiara di idee per i contenuti.",
  "Soru aramaları": "Ricerche a domanda",
  "Uzun aramalar": "Ricerche lunghe",
  "Paneli kapat": "Chiudi pannello",
  "Ayrıntı yüklenemedi": "Impossibile caricare i dettagli",
  "Search Console bağlantısı yok.": "Search Console non è collegato.",
  "{start} – {end}, kesin günler": "{start} – {end}, giorni definitivi",
  "{key} için günlük tıklama, toplam {total}.":
    "Clic giornalieri per {key}, {total} in totale.",
  "Bu sayfanın sorguları ({count})": "Query di questa pagina ({count})",
  "Bu sorguda görünen sayfalar ({count})":
    "Pagine mostrate per questa query ({count})",
  "Bu sayfa için listelenen sorgu yok; tıklamaları Google'ın gizlediği sorgulardan geliyor olabilir.":
    "Nessuna query elencata per questa pagina; i suoi clic potrebbero venire da query nascoste da Google.",
  "Bu sorgu için sayfa satırı yok.": "Nessuna riga di pagina per questa query.",
  "Sorgu-sayfa tablosu satır sınırında kesildi; bazı eşleşmeler eksik olabilir.":
    "La tabella query-pagina è stata troncata al limite di righe; alcune coppie potrebbero mancare.",
  "Sorgu satırlarının toplamı sayfanın toplamından küçük olabilir: gizli sorgular listelenmez.":
    "Le righe di query di questa pagina possono sommare meno del suo totale: le query nascoste non sono elencate.",
  "Hedef sayfa": "Pagina obiettivo",
  "{count} sayfa bu sorguda": "{count} pagine su questa query",
  "Olası kazanç": "Guadagno possibile",
  "Yetersiz veri": "Dati insufficienti",
  "Sıra 4-20 arasındaki sorgular": "Query in posizione 4-20",
  "Marka dışı sorgularınızın her sıradaki tıklama oranı. Bir sırada en az {queries} sorgu ve {impressions} gösterim yoksa o sıra hesaba katılmaz; tahmin yapılmaz.":
    "Il CTR delle tue query non di brand per posizione. Una posizione conta solo con almeno {queries} query e {impressions} impressioni; nulla viene stimato.",
  "Sorgularınızın her sıradaki tıklama oranı (marka adları tanımlanmadığı için marka aramaları dahil). Bir sırada en az {queries} sorgu ve {impressions} gösterim yoksa o sıra hesaba katılmaz; tahmin yapılmaz.":
    "Il CTR delle tue query per posizione (ricerche di brand incluse, perché non sono impostati nomi del brand). Una posizione conta solo con almeno {queries} query e {impressions} impressioni; nulla viene stimato.",
  "İlk üçe yakın sorgular": "Query vicine ai primi tre",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. İlk üçe çıkarlarsa birlikte yaklaşık {clicks} ek tıklama getirebilir.":
    "{count} query con posizione media tra 4 e 20 e almeno {impressions} impressioni. Arrivare tra i primi tre potrebbe portare insieme circa {clicks} clic in più.",
  "En büyük kazançlı {shown} tanesi listeleniyor.":
    "Sono elencate le {shown} con il guadagno maggiore.",
  "Sırasına göre az tıklanan sonuçlar":
    "Risultati cliccati meno di quanto la posizione farebbe pensare",
  "Tıklama oranı, sitenizde aynı sıradaki sonuçların ortalamasının {share} kadarından az olan ve en az {impressions} gösterim alan sorgular. Başlık ve açıklama yeniden yazılarak kazanılabilir.":
    "Query con CTR inferiore al {share} di quello dei tuoi risultati nella stessa posizione e almeno {impressions} impressioni. Un titolo e una descrizione riscritti possono conquistare questi clic.",
  "Sırasına göre belirgin biçimde az tıklanan sonuç yok ya da karşılaştırma için yeterli veri yok.":
    "Nessun risultato è chiaramente poco cliccato per la sua posizione, oppure mancano dati per il confronto.",
  "Bu sırada beklenen": "Atteso in questa posizione",
  "Görünen ama hiç tıklanmayan sayfalar": "Pagine visibili ma mai cliccate",
  "Bu dönemde en az {impressions} gösterim alıp tek tıklama almayan sayfalar.":
    "Pagine con almeno {impressions} impressioni e nessun clic in questo periodo.",
  "{shown} / {total} sayfa listeleniyor.":
    "{shown} di {total} pagine elencate.",
  "Gösterim alıp hiç tıklanmayan sayfa yok.":
    "Nessuna pagina ha ricevuto impressioni senza clic.",
  "Sitenizin sıraya göre tıklama oranı": "CTR del tuo sito per posizione",
  "Yukarıdaki kazançların ölçüsü: başka sitelerin değil, sizin sonuçlarınızın her sıradaki tıklama oranı.":
    "Il metro dei guadagni qui sopra: il CTR dei tuoi risultati in ogni posizione, non quello di altri siti.",
  Web: "Web",
  Video: "Video",
  "Google güncellemesi": "Aggiornamento Google",
  Not: "Nota",
  "Site denetimi tamamlandı": "Controllo del sito completato",
  "Not eklendi": "Nota aggiunta",
  "Not eklenemedi": "Impossibile aggiungere la nota",
  "Not silindi": "Nota eliminata",
  "Not silinemedi": "Impossibile eliminare la nota",
  "Grafikteki işaretler": "Indicatori del grafico",
  "Notu sil: {note}": "Elimina nota: {note}",
  "Örnek: Yeni sayfa başlıkları yayına alındı":
    "Esempio: nuovi titoli delle pagine pubblicati",
  "Notu ekle": "Aggiungi la nota",
  "Not ekle": "Aggiungi una nota",
  "Bu dönemin dışındaki notlar ({count})":
    "Note fuori da questo periodo ({count})",
  "Önceki dönemle": "Con il periodo precedente",
  "Geçen yılla": "Con l'anno scorso",
  "Karşılaştırma yok": "Nessun confronto",
  Yenilenemedi: "Aggiornamento non riuscito",
  "Google'da kaç kez göründüğünüz, kaç tıklama aldığınız ve önce neyi düzeltmeniz gerektiği.":
    "Quanto spesso compari su Google, quanti clic ricevi e cosa sistemare per primo.",
  "Sorgular (CSV)": "Query (CSV)",
  "Sayfalar (CSV)": "Pagine (CSV)",
  "İlk üçe yakın sorgular (CSV)": "Query vicine ai primi tre (CSV)",
  "Sorguları E-Tablolar'a aktar": "Esporta le query in Fogli",
  "Sayfaları E-Tablolar'a aktar": "Esporta le pagine in Fogli",
  Karşılaştırma: "Confronto",
  "Mülk: {site}": "Proprietà: {site}",
  "Bu dönemde hiç gösterim yok": "Nessuna impressione in questo periodo",
  "Seçili cihaz, ülke ya da arama türü için Google bu günlerde sitenizi hiç göstermedi. Filtreleri genişletmeyi deneyin.":
    "Google non ha mostrato il tuo sito per il dispositivo, il paese o il tipo di ricerca scelti in quei giorni. Prova ad allargare i filtri.",
  "Google bu günlerde sitenizi arama sonuçlarında göstermedi. Yeni bir siteyse birkaç gün sonra tekrar bakın; değilse dizin durumunu Site denetimi'nden kontrol edin.":
    "Google non ha mostrato il tuo sito nei risultati in quei giorni. Se il sito è nuovo, ricontrolla tra qualche giorno; altrimenti verifica lo stato di indicizzazione in Controllo del sito.",
  "Aynı sorguda birden çok sayfanızın göründüğü durumlar. Sayfalar birbirinin tıklamasını bölebilir; birini ana sayfa yapıp diğerlerinden ona bağlantı vermek çoğu zaman yeter.":
    "Query per cui compare più di una delle tue pagine. Le pagine possono dividersi i clic; spesso basta renderne una la pagina principale e collegarla dalle altre.",
  "Sorgular ({count})": "Query ({count})",
  "Değişimler ({count} düşüş)": "Variazioni ({count} in calo)",
  Değişimler: "Variazioni",
  Çakışmalar: "Sovrapposizioni",
  "Geçen yıl": "Anno scorso",
  "Önceki dönem": "Periodo precedente",
  "Zaman içinde": "Nel tempo",
  "Zaman birimi": "Unità di tempo",
  "Bu zaman biriminde çizilecek kadar dönem yok.":
    "Periodi insufficienti da tracciare in questa unità di tempo.",
  "{metric} ({grain})": "{metric} ({grain})",
  Kesinleşmedi: "Non definitivo",
  "Gösterim yok": "Nessuna impressione",
  Kesin: "Definitivo",
  "{count} dönemlik {metric} grafiği. En iyi dönem {day}, {value}.":
    "Grafico {metric} su {count} periodi. Periodo migliore {day}, {value}.",
  "{metric} grafiği": "Grafico {metric}",
  "Eksik dönem": "Periodo incompleto",
  Gösterge: "Legenda",
  "Taralı günler: Google hâlâ sayıyor, toplamlara katılmadı":
    "Giorni tratteggiati: Google li sta ancora contando; esclusi dai totali",
  "İçi boş nokta: eksik ya da kesinleşmemiş dönem":
    "Punto vuoto: periodo incompleto o non ancora definitivo",
  "Karşılaştırma çizgisi yalnızca gün görünümünde.":
    "La linea di confronto compare solo nella vista per giorno.",
  "Şu an önerilecek iş yok": "Per ora nulla da consigliare",
  "Search Console verisinde eşiği aşan bir fırsat ya da düşüş bulunmadı. Daha uzun bir dönem seçmek ya da birkaç gün sonra tekrar bakmak yeni bulgular çıkarabilir.":
    "Nei dati di Search Console non c'è nessuna opportunità o calo sopra le soglie. Un periodo più lungo, o un controllo tra qualche giorno, può portare nuovi risultati.",
  "ilk {count} iş birlikte {days} günde yaklaşık {clicks} ek tıklama getirebilir (tahmin).":
    "le prime {count} attività potrebbero portare insieme circa {clicks} clic in più in {days} giorni (stima).",
  "Listedeki işlerin hepsini yapıldı olarak işaretlediniz.":
    "Hai segnato come fatte tutte le attività dell'elenco.",
  "Yapıldı olarak işaretlenenler ({count})": "Segnate come fatte ({count})",
  "Tıklama kazançları, sitenizin kendi sıra ve tıklama oranlarından hesaplanan yaklaşık değerlerdir. Aynı sorgu ya da sayfa için birden çok iş varsa üstteki özet onu bir kez sayar. Yapıldı işaretleri yalnızca bu tarayıcıda saklanır.":
    "I clic guadagnati sono stime basate su posizioni e CTR del tuo sito. Se più attività riguardano la stessa query o pagina, il riepilogo qui sopra la conta una volta. I segni «fatto» restano solo in questo browser.",
  "{rank}. sıradaki iş:": "Attività {rank}:",
  "Marka adını gir": "Inserisci il nome del brand",
  "Bu kırılımı aç": "Apri questa ripartizione",
  Yapıldı: "Fatto",
  Tablet: "Tablet",
  "Önceki dönem tıklama": "Clic del periodo precedente",
  "Tıklama değişimi": "Variazione dei clic",
  "Önceki dönem sıra": "Posizione del periodo precedente",
  "↑{value} sıra": "↑{value} posizioni",
  "↓{value} sıra": "↓{value} posizioni",
  "“{query}” için ilk üçe çıkma fırsatı":
    "Un'occasione per «{query}» di arrivare tra i primi tre",
  "Sıra {position} · {impressions} gösterim · {clicks} tıklama":
    "Posizione {position} · {impressions} impressioni · {clicks} clic",
  "Hedef sayfayı bu sorguya göre güçlendirin: başlıkta ve ilk paragrafta sorgunun cevabını verin, ilgili sayfalarınızdan bu sayfaya bağlantı ekleyin.":
    "Rafforza la pagina obiettivo per questa query: rispondi nel titolo e nel primo paragrafo e collegala dalle pagine correlate.",
  "“{query}” görülüyor ama az tıklanıyor": "«{query}» è vista ma poco cliccata",
  "Tıklama oranı {ctr}; sitenizde bu sıradaki sonuçların oranı {expected} · sıra {position} · {impressions} gösterim":
    "CTR {ctr}; i tuoi risultati in questa posizione ottengono {expected} · posizione {position} · {impressions} impressioni",
  "Sayfa başlığını ve açıklamasını aramadaki niyete göre yeniden yazın: sorgunun kelimelerini kullanın, bir sayı, yıl ya da açık bir fayda ekleyin.":
    "Riscrivi titolo e descrizione della pagina secondo l'intento di ricerca: usa le parole della query, aggiungi un numero, un anno o un vantaggio chiaro.",
  "“{query}” sorgusundan gelen tıklamalar düştü":
    "I clic da «{query}» sono calati",
  "{page} sayfasının tıklamaları düştü": "I clic su {page} sono calati",
  "Sıra da düştü: içeriği güncelleyin, aramadaki sorulara bugünkü cevabı verin ve sayfaya iç bağlantıları artırın.":
    "Anche la posizione è scesa: aggiorna il contenuto, rispondi alla domanda come si pone oggi e aggiungi link interni alla pagina.",
  "Sıra yerinde, tıklama düştü: talep azalmış ya da sonuç sayfasına yeni bir öğe gelmiş olabilir. Başlığı ve açıklamayı gözden geçirin.":
    "Posizione stabile, clic in calo: la domanda può essere diminuita o nella pagina dei risultati è comparso qualcosa di nuovo. Rivedi titolo e descrizione.",
  "{page} eski gücünü kaybediyor": "{page} sta perdendo terreno",
  "Son çeyrekte {clicks} tıklama; en iyi çeyreği {peak} tıklama ({start} – {end})":
    "{clicks} clic nell'ultimo trimestre; il trimestre migliore ne aveva {peak} ({start} – {end})",
  "Sayfayı tazeleyin: eskiyen bilgileri düzeltin, yeni çıkan soruları ekleyin ve güncellediğiniz tarihi sayfada gösterin.":
    "Rinfresca la pagina: correggi le informazioni superate, rispondi alle nuove domande e mostra la data di aggiornamento.",
  "{page} görünüyor ama hiç tıklanmıyor":
    "{page} compare ma non viene mai cliccata",
  "{impressions} gösterim, 0 tıklama · sıra {position}":
    "{impressions} impressioni, 0 clic · posizione {position}",
  "İkinci sayfadan sonrasında görünüyor: önce sırasını yükseltin; içeriği derinleştirin ve diğer sayfalarınızdan bağlantı verin.":
    "Compare oltre la prima pagina: migliora prima la posizione; approfondisci il contenuto e collegala dalle altre pagine.",
  "İlk sayfada olduğu hâlde tıklanmıyor: başlık ve açıklama aramayla örtüşmüyor olabilir, yeniden yazın.":
    "È in prima pagina ma non viene cliccata: titolo e descrizione forse non corrispondono alla ricerca; riscrivili.",
  "“{query}” sorgusunda artık görünmüyorsunuz": "Non compari più per «{query}»",
  "Önceki dönemde {clicks} tıklama, {impressions} gösterim; bu dönemde gösterim yok":
    "{clicks} clic e {impressions} impressioni nel periodo precedente; nessuna impressione in questo",
  "Bu sorguyu karşılayan sayfa hâlâ yayında ve dizinde mi bakın; içerik değiştiyse sorgunun cevabını sayfaya geri ekleyin.":
    "Verifica che la pagina che risponde a questa query sia ancora online e indicizzata; se il contenuto è cambiato, aggiungi di nuovo la risposta.",
  "Tıklama oranı {ctr} (site geneli {site})": "CTR {ctr} (intero sito {site})",
  "sıra {position} (site geneli {site})":
    "posizione {position} (intero sito {site})",
  "{device} aramalarında geride kalıyorsunuz":
    "Stai restando indietro nelle ricerche da {device}",
  "{country} aramalarında geride kalıyorsunuz":
    "Stai restando indietro nelle ricerche da {country}",
  "Sayfalarınızı bu cihazda açıp okunurluğu ve hızı kontrol edin; Site denetimi'ndeki hız sonuçları nereden başlanacağını gösterir.":
    "Apri le tue pagine su questo dispositivo e controlla leggibilità e velocità; i risultati di velocità in Controllo del sito indicano da dove partire.",
  "Bu ülkedeki aramalara uygun dilde ve içerikte sayfanız var mı bakın; çok dilli bir siteyse hreflang ayarlarını gözden geçirin.":
    "Verifica di avere pagine nella lingua e con i contenuti giusti per le ricerche da questo paese; per un sito multilingue, rivedi le impostazioni hreflang.",
  "{date} günü tıklamalarda olağan dışı düşüş":
    "Calo insolito dei clic il {date}",
  "{date} günü gösterimlerde olağan dışı düşüş":
    "Calo insolito delle impressioni il {date}",
  "{value}; önceki haftaların aynı gününde ortası {expected}":
    "{value}; la mediana dello stesso giorno della settimana nelle settimane precedenti è {expected}",
  "O gün sitede bir değişiklik, kesinti ya da Google güncellemesi oldu mu bakın; grafikteki işaretler yardımcı olur.":
    "Controlla se quel giorno il sito è cambiato, è stato irraggiungibile o c'è stato un aggiornamento Google; gli indicatori del grafico aiutano.",
  "Marka adınızı tanımlayın": "Imposta il nome del tuo brand",
  "Marka sorguları ayrılmadan sitenin tıklama oranı beklentisi şişer ve fırsatlar eksik çıkar.":
    "Senza separare le ricerche di brand, il CTR atteso del sito risulta gonfiato e si perdono opportunità.",
  "Marka adınızı ve yazılışlarını ekleyin; marka ve marka dışı aramalar ayrı ölçülür.":
    "Aggiungi il nome del brand e le sue grafie; le ricerche di brand e non di brand vengono così misurate separatamente.",
  "Güven: yüksek": "Affidabilità: alta",
  "Güven: orta": "Affidabilità: media",
  "Güven: düşük": "Affidabilità: bassa",
  Podcast: "Podcast",
  "{start} – {end} ({days} gün)": "{start} – {end} ({days} giorni)",
  "{start} – {end}": "{start} – {end}",
  "Son veri": "Ultimi dati",
  Oluşturulma: "Creato",
  "Arama performansı raporu": "Report sul rendimento della ricerca",
  "Değişimler önceki {days} güne göre. Sıra değişimi yer olarak verilir (↑ yükseldi); tıklama oranı değişimi puan olarak.":
    "Variazioni rispetto ai {days} giorni precedenti. La variazione di posizione è in posizioni (↑ salita); quella del CTR in punti.",
  "Önceki dönem Google'da olmadığı için değişim gösterilmez.":
    "Nessuna variazione mostrata perché Google non ha il periodo precedente.",
  "Son günler hâlâ sayılıyor ({clicks} tıklama); toplamlara ve karşılaştırmalara katılmadı.":
    "Gli ultimi giorni sono ancora in conteggio ({clicks} clic); esclusi da totali e confronti.",
  "Google'ın gizlediği sorgulardan gelen tıklama: {share}. Bu yüzden sorgu tablolarının toplamı site toplamından küçüktür.":
    "Clic da query nascoste da Google: {share}. Per questo le tabelle delle query sommano meno del totale del sito.",

  Yapılacaklar: "Da fare",
  "Search Console verisinde eşiği aşan bir fırsat ya da düşüş bulunmadı.":
    "Nei dati di Search Console non c'è nessuna opportunità o calo sopra le soglie.",
  "Önce bunlar": "Inizia da queste",
  "İlk {count} iş, kazancı tahmin edilemeyen işler.":
    "Le prime {count} attività, con guadagno non stimabile.",
  "İlk {count} iş birlikte {days} günde yaklaşık {clicks} ek tıklama getirebilir (tahmin).":
    "Le prime {count} attività potrebbero portare insieme circa {clicks} clic in più in {days} giorni (stima).",
  "Tıklama kazançları, sitenizin kendi sıra ve tıklama oranlarından hesaplanan yaklaşık değerlerdir. Aynı sorgu ya da sayfa için birden çok iş varsa özet onu bir kez sayar.":
    "I clic guadagnati sono stime basate su posizioni e CTR del tuo sito. Se più attività riguardano la stessa query o pagina, il riepilogo la conta una volta.",
  "Günlük tıklama": "Clic giornalieri",
  "Bu dönem": "Questo periodo",
  "Hâlâ sayılan günler": "Giorni ancora in conteggio",
  "{days} günde {clicks} tıklama; en iyi gün {day}, {best} tıklama.":
    "{clicks} clic in {days} giorni; giorno migliore {day}, {best} clic.",
  "Bu dönemde tıklama yok.": "Nessun clic in questo periodo.",
  İşaretler: "Indicatori",
  "Ortalama sırası 4 ile 20 arasında, en az {impressions} gösterim alan {count} sorgu. Olası kazanç, ilk üçe çıkarsa beklenen ek tıklamadır.":
    "{count} query con posizione media tra 4 e 20 e almeno {impressions} impressioni. Il guadagno possibile sono i clic in più attesi se arrivano tra i primi tre.",
  "Bu aralıkta sorgu yok.": "Nessuna query in questa fascia.",

  "Belirgin biçimde az tıklanan sonuç yok.":
    "Nessun risultato è chiaramente poco cliccato.",
  "Beklenen oran: sitenizde aynı sıradaki sonuçların tıklama oranı.":
    "Tasso atteso: il CTR dei tuoi risultati nella stessa posizione.",

  "En az {queries} sorgu ve {impressions} gösterim olmayan sıralar için oran hesaplanmaz.":
    "Le posizioni senza almeno {queries} query e {impressions} impressioni non hanno un tasso.",
  Önceki: "Prima",

  "Önceki dönem: {start} – {end}. Tıklama sayıları.":
    "Periodo precedente: {start} – {end}. Numero di clic.",
  "Tıklaması düşen sorgular": "Query con clic in calo",
  "Tıklaması düşen sayfalar": "Pagine con clic in calo",
  "Tıklaması artan sorgular": "Query con clic in crescita",
  "Tıklaması artan sayfalar": "Pagine con clic in crescita",
  "Yeni görünen sorgular": "Nuove query",

  "Kaybolan sorgular (önceki dönemdeki değerleriyle)":
    "Query perse (con i valori del periodo precedente)",

  "Çeyrek: 91 gün.": "Trimestre: 91 giorni.",
  "Son çeyrek": "Ultimo trimestre",
  "En iyi çeyrek": "Trimestre migliore",

  "Google'ın tercih ettiği sayfa": "Pagina preferita da Google",

  "Paylar sitenin toplamına göre.": "Quote sul totale del sito.",
  "Paylar satırların toplamına göre.": "Quote sul totale delle righe.",
  "İlk {limit} / {total}.": "Prime {limit} di {total}.",
  "Bilinmiyor: marka adları tanımlanmadı.":
    "Sconosciuto: nessun nome del brand impostato.",
  "Marka adları: {terms}.": "Nomi del brand: {terms}.",
  "Okunan sorguların ortalama sırasına göre.":
    "In base alla posizione media delle query lette.",

  "Paylar okunan sorguların tıklamasına göre.":
    "Quote sui clic delle query lette.",
  "{words}+ kelimeli aramalar": "Ricerche di {words}+ parole",
  "Google Search Console API, bu mülk için. Başka bir veri kaynağı, tahmini hacim ya da rakip verisi kullanılmadı.":
    "L'API di Google Search Console, per questa proprietà. Nessun'altra fonte di dati, nessun volume stimato né dato sui concorrenti.",

  "Site toplamları": "Totali del sito",
  "Site toplamı tarihe göre istenen toplamdan gelir, sorgu ya da sayfa satırlarının toplamından değil. Ortalama sıra gösterime göre ağırlıklıdır; tıklama oranı tıklama bölü gösterimdir.":
    "Il totale del sito viene dalla richiesta raggruppata per data, non dalla somma delle righe di query o pagine. La posizione media è ponderata per impressioni; il CTR è clic diviso impressioni.",

  "Kazanç tahminleri": "Stime di guadagno",
  "Sitenizin kendi sıra-tıklama oranı eğrisinden hesaplanır; yeterli veri olmayan sıralar için tahmin yapılmaz.":
    "Ricavate dalla curva posizione-CTR del tuo sito; le posizioni senza dati sufficienti non hanno stima.",
  "Google istekleri": "Richieste a Google",

  "Yöntem ve sınırlar": "Metodo e limiti",
  "{host} arama performansı, {start} – {end}{filters}":
    "Rendimento della ricerca di {host}, {start} – {end}{filters}",
  "{days} günde {clicks} tıklama, {impressions} gösterim.":
    "{clicks} clic e {impressions} impressioni in {days} giorni.",
  "Tıklama oranı {ctr}, ortalama sıra {position}.":
    "CTR {ctr}, posizione media {position}.",
  "İlk iş: {title}.": "Prima attività: {title}.",
  "Arama performansı raporu saklama sınırını aşıyor. Daha kısa bir dönem ya da filtre seçip yeniden deneyin.":
    "Il report sul rendimento della ricerca supera il limite di archiviazione. Scegli un periodo più breve o un filtro e riprova.",
  "Şu an 4. ile 20. sıra arasında yeterli gösterimi olan sorgu yok. Sorgular bu aralığa girdikçe burada listelenir.":
    "Al momento nessuna query con impressioni sufficienti è tra le posizioni 4 e 20. Le query compaiono qui quando entrano in quella fascia.",
  "Ortalama sırası 4–20 olan {count} sorgu; ilk üçe çıkarlarsa yaklaşık {clicks} ek tıklama.":
    "{count} query in posizione media 4–20; arrivare tra i primi tre potrebbe portare circa {clicks} clic in più.",
  "Onaylanmadı.": "Non confermato.",
  "Alan adından önerilen adlar: {terms}.":
    "Nomi suggeriti dal tuo dominio: {terms}.",
  "Önerileri onayla": "Conferma i suggerimenti",
  "Alan adından önerilen marka adlarıyla ölçüldü: {terms}. Onaylayın ya da düzeltin.":
    "Misurato con nomi del brand suggeriti dal tuo dominio: {terms}. Confermali o correggili.",
  // Search performance review, 2026-10-26
  "Aynı sorgu, birden çok sayfa": "Più pagine per la stessa query",
  "Birden çok sayfanın yarıştığı sorgu": "Query con pagine in concorrenza",
  "{count} / {total}": "{count} / {total}",
  "incelenen sorguların {share} kadarı": "il {share} delle query esaminate",
  "Ana sayfa dışına giden gösterim": "Impressioni andate alle altre pagine",
  "incelenen gösterimlerin {share} kadarı":
    "il {share} delle impressioni esaminate",
  "2. sayfa {share} gösterim alıyor":
    "la seconda pagina riceve il {share} delle impressioni",
  "Diğer {count} sayfa {share} gösterim alıyor": {
    one: "{count} altra pagina riceve il {share} delle impressioni",
    other: "le altre {count} pagine ricevono il {share} delle impressioni",
  },
  "{impressions} gösterim · {clicks} tıklama":
    "{impressions} impressioni · {clicks} clic",
  "1 yıl önce": "Un anno fa",
  "Çeyrek başına tıklama, eskiden yeniye: {values}":
    "Clic per trimestre, dal più vecchio al più recente: {values}",
  "Yalnızca bir dönemde en az {impressions} gösterim alan sorgular, en çok gösterimden aza.":
    "Query con almeno {impressions} impressioni in uno solo dei due periodi, dalle più viste.",
  "{count} tanesi hiç tıklama almadı.": {
    one: "{count} di queste non ha ricevuto clic.",
    other: "{count} di queste non hanno ricevuto clic.",
  },
  "Veriler {date} tarihine kadar kesin; son {count} gün hâlâ sayılıyor (grafikte taralı).":
    {
      one: "I dati sono definitivi fino al {date}; Google sta ancora contando l'ultimo {count} giorno (tratteggiato nel grafico).",
      other:
        "I dati sono definitivi fino al {date}; Google sta ancora contando gli ultimi {count} giorni (tratteggiati nel grafico).",
    },
  "Veriler {date} tarihine kadar kesin.":
    "I dati sono definitivi fino al {date}.",
  "Karşılaştırma: geçen yılın aynı günleri ({start} – {end}).":
    "Confronto con gli stessi giorni dell'anno scorso ({start} – {end}).",
  "Karşılaştırma: önceki {days} gün ({start} – {end}).":
    "Confronto con i {days} giorni precedenti ({start} – {end}).",
  "Search Console mülkü: {site}": "Proprietà Search Console: {site}",
  "Veri hakkında": "Informazioni sui dati",
  "Kesin günler: {start} – {end} ({days} gün). Search Console bir günü birkaç gün boyunca saymaya devam eder; toplamlar ve karşılaştırmalar yalnızca sayımı bitmiş günleri kullanır. Günler Google'ın kullandığı Pasifik saatine göredir.":
    "Giorni definitivi: {start} – {end} ({days} giorni). Search Console continua a contare un giorno per diversi giorni; totali e confronti usano solo i giorni già conteggiati. I giorni seguono l'ora del Pacifico, come fa Google.",
  "Son {count} gün hâlâ sayılıyor olabilir (Google tarih bildirmedi); toplamlara katılmadı.":
    {
      one: "Google potrebbe ancora contare l'ultimo {count} giorno (nessuna data fornita); è escluso dai totali.",
      other:
        "Google potrebbe ancora contare gli ultimi {count} giorni (nessuna data fornita); sono esclusi dai totali.",
    },
  "Son {count} gün hâlâ sayılıyor; toplamlara katılmadı.": {
    one: "Google sta ancora contando l'ultimo {count} giorno; è escluso dai totali.",
    other:
      "Google sta ancora contando gli ultimi {count} giorni; sono esclusi dai totali.",
  },
  "Tıklamaların {share} kadarı ({clicks}) Google'ın gizlilik nedeniyle göstermediği aramalardan geliyor. Site toplamına dahil, sorgu tablosunda yok; bu yüzden sorgu tablosunun toplamı daha küçüktür.":
    "Il {share} dei clic ({clicks}) arriva da ricerche che Google non mostra per motivi di privacy. Sono nel totale del sito ma non nella tabella delle query, che per questo somma meno.",
  "Tıklamaların {share} kadarı, Google'ın gizlilik nedeniyle göstermediği ya da satır sınırının dışında kalan aramalardan geliyor. Site toplamına dahil, sorgu tablosunda yok.":
    "Il {share} dei clic arriva da ricerche che Google non mostra per privacy o che superano il limite di righe. Sono nel totale del sito ma non nella tabella delle query.",
  "Bu görünüm için Google'a {count} istek gönderildi.": {
    one: "Questa vista ha inviato {count} richiesta a Google.",
    other: "Questa vista ha inviato {count} richieste a Google.",
  },
  "Bu görünüm birkaç dakika içinde alınmış yanıtlardan geldi; Google'a yeni istek gönderilmedi.":
    "Questa vista viene da risposte ottenute negli ultimi minuti; nessuna nuova richiesta a Google.",
  "Marka aramaları ayrılmadı": "Ricerche del brand non separate",
  "Marka adınızı girmeden hangi aramaların sizi adınızla bulduğu bilinemez.":
    "Senza il nome del brand non si può sapere quali ricerche ti hanno trovato per nome.",
  "Marka adını ekle": "Aggiungi il nome del brand",
  "Önceki dönemle karşılaştırılamadı.":
    "Impossibile confrontare con il periodo precedente.",
  "Bu ay henüz tamamlanmadı ({days} gün)":
    "Questo mese non è ancora finito ({days} giorni finora)",
  "Son çubuk kesik çizgili: bu ay henüz tamamlanmadı.":
    "L'ultima barra è tratteggiata: questo mese non è ancora finito.",
  "Sıra {position} · tıklama oranı {ctr} (bu sırada {expected}) · {gain}":
    "Posizione {position} · CTR {ctr} ({expected} in questa posizione) · {gain}",
  "Olası kazanç (en fazla)": "Guadagno possibile (al massimo)",
  "{share} tıklama": "{share} dei clic",
  "Sorgu sayısı": "Numero di query",
  "Tıklama payı": "Quota di clic",
  "{date} (eksik veri)": "{date} (dati incompleti)",
  "Arşivde eksik; paylar karşılaştırılamaz":
    "Incompleta nell'archivio; quote non confrontabili",
  "Arşiv {count} haftalık; soluk çubuklu haftalar eksik veri, paylar onlarla karşılaştırılamaz.":
    {
      one: "L'archivio copre {count} settimana completa; le settimane sbiadite hanno dati incompleti e le loro quote non sono confrontabili.",
      other:
        "L'archivio copre {count} settimane complete; le settimane sbiadite hanno dati incompleti e le loro quote non sono confrontabili.",
    },
  "Arşivde henüz tam bir hafta yok; soluk çubuklar eksik veri, paylar karşılaştırılamaz.":
    "L'archivio non ha ancora una settimana completa; le barre sbiadite hanno dati incompleti, quote non confrontabili.",
  "Sıralama fırsatları ({count})": "Opportunità di posizionamento ({count})",
  "Google hâlâ sayıyor; bu gün toplamlara katılmadı":
    "Google sta ancora contando; questo giorno non è nei totali",
  "Son {days} günde {clicks} tıklama, {impressions} gösterim.":
    "{clicks} clic e {impressions} impressioni negli ultimi {days} giorni.",
  "Son {days} günde tıklamalar geçen yılın aynı günleriyle aynı.":
    "Negli ultimi {days} giorni i clic sono pari a quelli degli stessi giorni dell'anno scorso.",
  "Son {days} günde tıklamalar geçen yıla göre {share} arttı.":
    "Negli ultimi {days} giorni i clic sono aumentati del {share} rispetto all'anno scorso.",
  "Son {days} günde tıklamalar geçen yıla göre {share} azaldı.":
    "Negli ultimi {days} giorni i clic sono diminuiti del {share} rispetto all'anno scorso.",
  "Son {days} günde tıklamalar önceki dönemle aynı.":
    "Negli ultimi {days} giorni i clic sono pari al periodo precedente.",
  "Son {days} günde tıklamalar önceki döneme göre {share} arttı.":
    "Negli ultimi {days} giorni i clic sono aumentati del {share} rispetto al periodo precedente.",
  "Son {days} günde tıklamalar önceki döneme göre {share} azaldı.":
    "Negli ultimi {days} giorni i clic sono diminuiti del {share} rispetto al periodo precedente.",
  "Tıklama oranı {points} puan arttı.": "Il CTR è salito di {points} punti.",
  "Tıklama oranı {points} puan düştü.": "Il CTR è sceso di {points} punti.",
  "Ortalama sıra {places} basamak yükseldi.":
    "La posizione media è migliorata di {places}.",
  "Ortalama sıra {places} basamak geriledi.":
    "La posizione media è peggiorata di {places}.",
  "Önce yapılacak {count} iş hazır.": {
    one: "{count} prima attività è pronta.",
    other: "Le prime {count} attività sono pronte.",
  },
  "Önce yapılacak {count} iş birlikte en fazla {clicks} ek tıklama getirebilir (üst sınır).":
    {
      one: "La prima {count} attività potrebbe portare al massimo {clicks} clic in più (limite massimo).",
      other:
        "Le prime {count} attività insieme potrebbero portare al massimo {clicks} clic in più (limite massimo).",
    },
  "Tüm yapılacaklar ({count})": "Tutte le attività ({count})",
  "en fazla +{count} tıklama": {
    one: "al massimo +{count} clic",
    other: "al massimo +{count} clic",
  },
  "Sıra {position}": "Posizione {position}",
  "Neden ve ne yapmalı": "Perché, e cosa fare",
  "Bu iş yapılırsa aynı uzunlukta bir dönemde beklenen en fazla ek tıklama (üst sınır).":
    "Il massimo di clic in più da attendersi in un periodo della stessa durata se lo si fa (limite massimo).",
  "Değişmedi (±{value} sıra)": "Invariata (±{value} posizioni)",
  "≈ +{count} tıklama": { one: "≈ +{count} clic", other: "≈ +{count} clic" },
  "{count} sorgu ilk üçe yakın": {
    one: "{count} query vicina alle prime tre",
    other: "{count} query vicine alle prime tre",
  },
  "{count} sonuç sırasına göre az tıklanıyor": {
    one: "{count} risultato riceve pochi clic per la sua posizione",
    other: "{count} risultati ricevono pochi clic per la loro posizione",
  },
  "{count} sorgudan gelen tıklama düştü": {
    one: "I clic sono calati per {count} query",
    other: "I clic sono calati per {count} query",
  },
  "{count} sayfanın tıklaması düştü": {
    one: "I clic sono calati per {count} pagina",
    other: "I clic sono calati per {count} pagine",
  },
  "{count} sayfa eski gücünü kaybediyor": {
    one: "{count} pagina sta perdendo forza",
    other: "{count} pagine stanno perdendo forza",
  },
  "{count} sayfa görünüyor ama hiç tıklanmıyor": {
    one: "{count} pagina è vista ma mai cliccata",
    other: "{count} pagine sono viste ma mai cliccate",
  },
  "{count} sorguda artık görünmüyorsunuz": {
    one: "Non compari più per {count} query",
    other: "Non compari più per {count} query",
  },
  "{count} cihazda geride kalıyorsunuz": {
    one: "Sei indietro su {count} tipo di dispositivo",
    other: "Sei indietro su {count} tipi di dispositivo",
  },
  "{count} ülkede geride kalıyorsunuz": {
    one: "Sei indietro in {count} paese",
    other: "Sei indietro in {count} paesi",
  },
  "{count} günde olağan dışı düşüş": {
    one: "Calo insolito in {count} giorno",
    other: "Cali insoliti in {count} giorni",
  },
  "{date}: tıklama": "{date}: clic",
  "{date}: gösterim": "{date}: impressioni",
  "Tıklama farkı": "Differenza di clic",
  sürüyor: "in corso",
  Oran: "CTR",
  // Search performance review fixes: brand confirmation, windows, archive lag
  "Marka adları: {terms} (önerilen, onaylanmadı).":
    "Nomi del brand: {terms} (suggeriti, non confermati).",
  "Marka adını onayla": "Conferma il nome del brand",
  "Marka aramaları şimdilik alan adından önerilen adlarla ayrılıyor: {terms}. Onaylanana kadar bu ayrım bir tahmin.":
    "Per ora le ricerche di brand sono separate con nomi suggeriti dal tuo dominio: {terms}. Finché non li confermi, questa separazione è una stima.",
  "Önerilen adlar doğruysa onaylayın; değilse markanızın adını ve yazılışlarını girin.":
    "Se i nomi suggeriti sono giusti, confermali; altrimenti inserisci il nome del tuo brand e i modi in cui viene scritto.",
  "Dönem: {start} – {end}.": "Periodo: {start} – {end}.",
  "Ayın son günleri henüz gelmedi ({days} gün)":
    "Gli ultimi giorni del mese non sono ancora arrivati ({days} giorni)",
  "Son çubuk kesik çizgili: ayın son günleri Search Console'dan henüz gelmedi.":
    "L'ultima barra è tratteggiata: gli ultimi giorni del mese non sono ancora arrivati da Search Console.",
  "Haftalık dağılım yalnızca Web aramaları için.":
    "La distribuzione settimanale è solo per le ricerche Web.",
  "Marka aramaları dahil değildir.": "Le ricerche di brand sono escluse.",
  "Tam günler Google tarafından doğrulandı":
    "Giorni completi confermati da Google",
  "Tam gün sınırı veri gecikmesine göre varsayıldı":
    "Limite dei giorni completi stimato dal ritardo dei dati",
  "Önceki sonuç gösteriliyor; seçili dönem henüz yüklenmedi.":
    "È mostrato il risultato precedente; il periodo selezionato non è ancora stato caricato.",
  "En fazla +{gain} tıklama / 30 gün (üst sınır)":
    "Fino a +{gain} clic / 30 giorni (limite massimo)",
  "{count} sayfada · bu sayfaların tüm tıklamaları 30 güne ölçekli: {clicks}; üst sınırın bu tabana oranı {share}":
    "Su {count} pagine · tutti i clic di queste pagine su base di 30 giorni: {clicks}; limite massimo rispetto a questa base: {share}",
  "Eksik sorgu, yetersiz gösterim veya eksik hedef oranı; kazanç yok anlamına gelmez.":
    "Query mancanti, impressioni insufficienti o tasso obiettivo assente: non significa che non ci siano opportunità.",
  "Analytics bu kez okunamadı; aşağıdaki kaynak notunu kontrol edin.":
    "Non è stato possibile leggere Analytics; consulta la nota sulla fonte qui sotto.",
  "Analytics verisi sınırlı; eksik ölçümler sıfır değildir ve dönüşüm yorumu yapılamayabilir.":
    "I dati Analytics sono limitati; le misure mancanti non sono zeri e potrebbero non consentire valutazioni sulle conversioni.",
  "Hesaplanabilen tüm sayfalardaki ölçülmüş dönüşüm sinyali · listele":
    "Segnale di conversione misurato su tutte le pagine valutabili · mostra pagine",
  "İş listesi: {shown} / {total} eşleşen sayfa":
    "Elenco di lavoro: {shown} / {total} pagine corrispondenti",
  "Analytics değeri bilinmiyor; bağlantı, eşleşme ve kaynak kısıtlarını kontrol edin.":
    "Valore Analytics sconosciuto; controlla connessione, corrispondenza URL e limiti della fonte.",
  "Ölçülen gösterim (30 güne ölçekli)":
    "Impressioni misurate (su base di 30 giorni)",
  "Analytics bu adres grubunu birlikte ölçüyor; oturumları farklı URL satırları arasında toplamayın.":
    "Analytics misura insieme questo gruppo di URL; non sommare le sessioni delle diverse righe URL.",
  "Karşılaştırılabilen marka dışı gösterim: {known}; oranı bilinmeyen: {unknown}.":
    "Impressioni non di marca confrontabili: {known}; impressioni senza tasso noto: {unknown}.",
  "Diğer aramalar (dağıtılmış kalan)": "Altre query (quota residua assegnata)",
  "Değişikliği not edin; aynı kapsamlı dönemlerde ölçülen tıklama, tıklama oranı ve sırayı Arama performansında karşılaştırın.":
    "Annota la modifica; confronta clic, CTR e posizione misurati in periodi con lo stesso ambito in Rendimento di ricerca.",
  "Arama niyetini ve sayfanın kapsamını inceleyin":
    "Esamina intento di ricerca e argomenti coperti dalla pagina",
  "Gösterimler ölçüldü; düşük sıra tek başına sayfayı silmek veya birleştirmek için kanıt değildir.":
    "Le impressioni sono state misurate; una posizione bassa da sola non giustifica eliminare o unire una pagina.",
  "Birleştirmeyi yalnızca sayfaların aynı ihtiyacı karşıladığını doğrularsanız değerlendirin.":
    "Valuta l’unione solo dopo aver verificato che le pagine rispondano alla stessa esigenza.",
  "Önceliği ölçülen sorgulara göre belirleyin; düşük tahmin tek başına içerik kaldırma gerekçesi değildir.":
    "Stabilisci le priorità in base alle query misurate; una stima bassa da sola non giustifica rimuovere contenuti.",
  "Ortalama {position}. sıra; {impressions} gösterim, {clicks} tıklama ölçüldü. Hesaplanabilen aramalarda 30 güne ölçekli en fazla +{gain} tıklama (üst sınır); gerçekleşme sözü değildir.":
    "Posizione media {position}; {impressions} impressioni e {clicks} clic misurati. Fino a +{gain} clic su base di 30 giorni per le query valutabili (limite massimo), senza garanzia di risultato.",
  "Hesaplanan kazanç yalnızca alınan ve tanımlanabilen aramaları kapsar; gizli sorguların payı bilinmiyor. Panelin sorgu tahminiyle toplanmaz.":
    "La stima copre solo le query ricevute e identificabili; la quota delle query nascoste è sconosciuta. Non sommarla alla stima per query del pannello.",
  "Ölçülen sıfır: {zero}; yetersiz gösterim: {small}; eksik hedef oranı: {curve}; Google'ın aramalarını gizlediği sayfa: {pairs}.":
    "Zero misurato: {zero}; impressioni insufficienti: {small}; tasso obiettivo mancante: {curve}; pagine di cui Google nasconde le ricerche: {pairs}.",
  "Search Console satır sınırına ulaşıldı; toplamlar tüm siteyi kapsamaz.":
    "Raggiunto il limite di righe Search Console; i totali non coprono l’intero sito.",
  "Aynı takvim günleri farklı saat dilimlerinde aynı an aralığı değildir. Analytics, tüm Organic Search kanalını kapsar.":
    "Gli stessi giorni in fusi orari diversi non coprono lo stesso intervallo temporale. Analytics include l’intero canale Organic Search.",
  "Analytics kotası doldu. Bir süre bekleyip Yenile’ye basın.":
    "Quota Analytics esaurita. Attendi e poi seleziona Aggiorna.",
  "Analytics izni veya mülk erişimi yok. Bağlantıları ayarla ekranında erişimi doğrulayın.":
    "Manca l’autorizzazione Analytics o l’accesso alla proprietà. Verifica l’accesso nelle impostazioni di connessione.",
  "Analytics yanıtı okunamadı. İnternet bağlantısını kontrol edip Yenile’ye basın.":
    "Impossibile leggere la risposta Analytics. Controlla la connessione Internet e seleziona Aggiorna.",
  "{start} – {end} aralığında bu mülk için sayfa satırı dönmedi. Bu, hiç gösterim olmadığı anlamına gelmez; Arama performansında mülkü kontrol edin veya dönemi genişletin.":
    "Nessuna riga pagina ricevuta per questa proprietà dal {start} al {end}. Non significa che non ci siano state impressioni; verifica la proprietà in Rendimento di ricerca o amplia il periodo.",
  "{start} – {end} aralığında hesaplanabilen {count} sayfada ek kazanç hesaplanmadı. Bu, yapılacak iş olmadığı anlamına gelmez.":
    "Nessun guadagno aggiuntivo calcolato per {count} pagine valutabili dal {start} al {end}. Non significa che non ci sia lavoro da fare.",
  "30 güne ölçekli üst sınır; çubuklar en büyük iş türüne göredir. Bir sayfa birden fazla işte sayılabilir. Seçim tüm hesaplanabilir sayfalara uygulanır.":
    "Limite massimo su base di 30 giorni; le barre sono relative alla categoria principale. Una pagina può rientrare in più categorie. La selezione riguarda tutte le pagine valutabili.",
  "Hesaplanamayan kapsam": "Ambito non calcolabile",
  Sırala: "Ordina",
  "Daha uzun bir dönem seçmek daha çok arama gösterebilir.":
    "Un periodo più lungo può mostrare più ricerche.",
  "Google bu sayfaların aramalarını göstermiyor":
    "Google non mostra le ricerche di queste pagine",
  "{hidden} sayfa gösterim aldı ama Search Console hangi aramalardan geldiğini vermedi: Google az aranan sorguları gizlilik için gizler. Arama bilinmeden kazanç hesaplanmaz. Bu bir hata değildir; site daha çok gösterim aldıkça tahminler kendiliğinden çıkar.":
    "{hidden} pagine hanno ricevuto impressioni, ma Search Console non ha indicato da quali ricerche: Google nasconde le query poco cercate per tutelare la privacy. Senza le ricerche non è possibile stimare alcun guadagno. Non è un errore; le stime compariranno da sole quando il sito riceverà più impressioni.",
  "{count} sayfanın aramaları tahmin için yeterli gösterim almadı ya da sitenizde karşılaştırılacak sıra verisi yok.":
    "Le ricerche di {count} pagine hanno ricevuto troppe poche impressioni per una stima, oppure il tuo sito non ha dati di posizione con cui confrontarle.",
  "Tahmini değiştirmez; yanında bir etiket olarak durur. Bu dönemde tahmin edilebilen sayfa olmadığı için eşleştirilecek bir şey yok.":
    "Non modifica la stima; è un'etichetta accanto. In questo periodo nessuna pagina è stimabile, quindi non c'è nulla da abbinare.",

  // Rankings archive scope and comparison evidence.
  "Son 5 yıllık arşiv": "Ultimi 5 anni di archivio",
  "Daha fazla hareket göster": "Mostra altre variazioni",
  "Kayıtlı geçmiş korunur. Bağlantıyı ve kotayı kontrol edin, sonra yeniden deneyin.":
    "La cronologia salvata viene conservata. Controlla connessione e quota, poi riprova.",
  "Kalan günler için devam edin; birden fazla çalıştırma gerekebilir.":
    "Continua per recuperare i giorni restanti; potrebbero servire più esecuzioni.",
  "Google taranan tarihler için sorgu satırı döndürmedi. Bu, arama yapılmadığını kanıtlamaz. Kalan tarihler varsa arşivi doldurmaya devam edin; toplam trafik için Arama performansını açın.":
    "Google non ha restituito righe di query per le date esaminate. Questo non dimostra l’assenza di ricerche. Continua con le date restanti; apri Rendimento di ricerca per il traffico totale.",
  "Öncelik: mutlak sıra değişimi × kayıtlı gösterim. Bu bir inceleme sırasıdır, kayıp tıklama tahmini değildir.":
    "Priorità: variazione assoluta della posizione × impressioni registrate. È un ordine di analisi, non una stima dei clic persi.",
  "{count} sorgu; aynı {paired} sorguda net değişim. Çubuklar en büyük gruba görelidir.":
    "{count} query; variazione netta sulle stesse {paired} query. Barre proporzionali al gruppo più grande.",
  "Aynı sorgu kümesinde net değişim; giriş veya çıkış sayısı değildir.":
    "Variazione netta nello stesso insieme di query, non il numero di ingressi o uscite.",
  "Bu gün sorgu gözlenmedi; API yanıtı tamamlandı.":
    "Nessuna osservazione della query in questo giorno; risposta API completata.",
  "Bu gün arşiv kapsamı eksik veya bilinmiyor.":
    "Copertura dell’archivio incompleta o sconosciuta per questo giorno.",
  "Boşluklar doldurulmaz; sıra sıfır kabul edilmez. Ok tuşlarıyla günleri inceleyin.":
    "Le lacune restano vuote; la posizione non è mai considerata zero. Esamina i giorni con le frecce.",
  "Gözlenen gün": "Giorni osservati",
  "Dönem ortalaması": "Media del periodo",
  "İlk/son kayıtlı gün": "Primo/ultimo giorno registrato",
  "Günlük değerler": "Valori giornalieri",
  "Arama performansında metin ara (tarih ve birebir sorgu korunmaz)":
    "Cerca il testo in Rendimento di ricerca (date e query esatta non mantenute)",
  "GSC Web · Ortalama sıra, sabit bir Google sırası değildir. Konum ve cihazla değişebilir.":
    "GSC Web · La posizione media non è un ranking Google fisso. Può variare per luogo e dispositivo.",
  "Karşılaştırılabilen {count} sorguda {up} yükseldi, {down} geriledi.":
    "Su {count} query confrontabili, {up} sono salite e {down} sono scese.",
  "Önce {query} sorgusunu inceleyin.": "Esamina prima {query}.",
  "Karşılaştırılabilen sorgularda belirgin düşüş yok.":
    "Nessun calo significativo tra le query confrontabili.",
  "Karşılaştırması bilinmeyen: {count}. Belirgin hareket eşiği: 0,5 sıra.":
    "Confronti sconosciuti: {count}. Soglia di variazione significativa: 0,5 posizioni.",
  "Arşiv kapsamı kısmi veya bilinmiyor. Hareketler yalnızca kayıtlı gözlemleri karşılaştırır; sitenin tamamını temsil etmez.":
    "Copertura dell’archivio parziale o sconosciuta. Le variazioni confrontano solo osservazioni registrate e non rappresentano tutto il sito.",
  "Tarih sonu üç günlük gecikme varsayımıdır; canlı tamlık doğrulaması değildir. Google gizli sorguları ve bazı üst sınır dışı satırları döndürmez.":
    "La data finale presume tre giorni di ritardo; non è una verifica di completezza in tempo reale. Google omette query nascoste e alcune righe oltre i propri limiti.",
  "API yanıtı tamamlanan / sınırlı / başarısız / bilinmeyen gün: {complete} / {limited} / {failed} / {unknown}":
    "Giorni con risposta API completa / limitata / fallita / sconosciuta: {complete} / {limited} / {failed} / {unknown}",
  "Önceki dönem API yanıtı tamamlanan gün: {complete} / {days}":
    "Giorni con risposta API completa nel periodo precedente: {complete} / {days}",
  "Haftalık çizgilerde uç haftalar kısmi olabilir. Gün sayısı yalnızca sorgunun gözlendiği günleri sayar.":
    "Le settimane ai margini possono essere parziali. Si contano solo i giorni in cui la query è stata osservata.",
  "Arşivi doldurmaya devam et": "Continua a riempire l’archivio",
  "Arşivde sorgu ara": "Cerca nelle query archiviate",
  "Tüm filtreleri kaldır": "Rimuovi tutti i filtri",
  "Dönem ortalaması ilk 10": "Media del periodo nelle prime 10",
  "Yalnızca iki dönemde de gözlenen sorgular.":
    "Solo le query osservate in entrambi i periodi.",
  "Gösterime göre üst çeyrek eşiği; eşitlikler dahil: {count}":
    "Soglia del quartile superiore per impressioni, parità incluse: {count}",
  "Filtreyle eşleşen sorgular: {matching} / {total}":
    "Query corrispondenti ai filtri: {matching} / {total}",
  "Filtreleri kaldırın, dönemi genişletin veya arşivi doldurmaya devam edin.":
    "Rimuovi i filtri, amplia il periodo o continua a riempire l’archivio.",
  "Bu dönemde gözlenmeyen: {count}. Bu, sıra kaybı anlamına gelmez.":
    "Non osservate in questo periodo: {count}. Non significa una perdita di posizione.",
  "En çok gösterim alan ilk 25 kayıt; arama kutusu bu listede de geçerlidir.":
    "Primi 25 record per impressioni; la ricerca filtra anche questo elenco.",
  "Google kotası doldu. Kota yenilendiğinde yeniden deneyin.":
    "La quota Google è esaurita. Riprova dopo il ripristino.",
  "Ağ bağlantısı kurulamadı. İnternet bağlantınızı kontrol edip yeniden deneyin.":
    "Connessione di rete non riuscita. Controlla Internet e riprova.",
  "Taranan son gün: {date}": "Esaminato fino al: {date}",
  "Karşılaştırması bilinmeyen: {count}. Belirgin hareket eşiği: {threshold} sıra.":
    "Confronti sconosciuti: {count}. Soglia di variazione significativa: {threshold} posizioni.",
  "En çok gösterim alan ilk {count} kayıt; arama kutusu bu listede de geçerlidir.":
    "Primi {count} record per impressioni; la ricerca filtra anche questo elenco.",
  "Bağlantı yok; gösterilen özet kayıtlı tarihsel gözlemlerdir.":
    "Connessione assente; il riepilogo mostra le osservazioni storiche salvate.",
  "Seçilen dönem Search Console'un okunabilir kesin günleri dışında. Kullanılabilir dönem: {start} – {end}.":
    "Il periodo selezionato non rientra nei giorni completi leggibili in Search Console. Periodo disponibile: {start} – {end}.",
  "Search Console yalnızca {start} ve sonrasını okuyabilir. Bu arşiv dönemi bütünüyle açılamaz.":
    "Search Console può leggere solo i dati dal {start} in poi. Questo periodo di archivio non può essere aperto per intero.",
  // Real-data dashboard and search explanations.
  "Önceki dönemde {clicks} tıklama, {impressions} gösterim vardı.":
    "Il periodo precedente aveva {clicks} clic e {impressions} impressioni.",
  "Geçen yıl aynı dönemde {clicks} tıklama, {impressions} gösterim vardı.":
    "Lo stesso periodo dello scorso anno aveva {clicks} clic e {impressions} impressioni.",
  "Az veride yüzdeler ve ortalamalar hızla değişir; tek başına büyüme veya kayıp kanıtı değildir.":
    "Con pochi dati, percentuali e medie cambiano rapidamente; da sole non dimostrano una crescita o una perdita.",
  "Bu liste, ortalama sırası yuvarlanarak 4–20 aralığında olan ve bu dönemde en az {count} gösterim alan sorguları kapsar. Eşiğin altındaki sorgular Sorgular sekmesinde incelenebilir.":
    "Questo elenco include le query con posizione media arrotondata tra 4 e 20 e almeno {count} impressioni nel periodo. Esamina le query sotto la soglia nella scheda Query.",
  "Marka sorguları bu listeden çıkarılır.":
    "Le query di marca sono escluse da questo elenco.",
  "Google az aranan sorguları gizlilik için gizleyebilir. Sorgu listesi boşken de site toplamında gösterim olabilir. Toplamları ve Sayfalar sekmesini inceleyin.":
    "Google può nascondere le query rare per tutelare la privacy. I totali del sito possono includere impressioni anche con un elenco vuoto. Esamina i totali e la scheda Pagine.",
  "Alınan veride öneri eşiklerini geçen bir fırsat ya da düşüş bulunmadı. Bu, sitenizde yapılacak iş olmadığı anlamına gelmez. Google bazı sorguları gizlilik için gizler; görünen sorguları ve sayfaları inceleyin.":
    "Nessuna opportunità o calo ha superato le soglie di raccomandazione nei dati ricevuti. Ciò non significa che non ci sia nulla da fare. Google nasconde alcune query per privacy; esamina quelle visibili e le pagine.",
  "Bu bulgular hız, kullanılabilirlik veya arama görünürlüğü ile ilgili olabilir. Ayrıntılarda etkilenen sayfaları inceleyin.":
    "Questi risultati possono riguardare velocità, usabilità o visibilità nella ricerca. Esamina le pagine interessate nei dettagli.",
  "Oturum sayısı bilinmiyor. Analytics raporunu açarak kaynak uyarılarını inceleyin; bağlantı erişimini ve sitedeki Analytics etiketini kontrol edin.":
    "Il numero di sessioni è sconosciuto. Apri il report Analytics per leggere gli avvisi della fonte; controlla i permessi della connessione e il tag Analytics sul sito.",
  "İki dönemde de gözlenen sorgu yok. Yükseliş veya düşüş henüz hesaplanamaz; seçili dönemin ortalama sıralarını aşağıdaki listeden inceleyin.":
    "Nessuna query è stata osservata in entrambi i periodi. Non è ancora possibile calcolare salite e discese; consulta qui sotto le posizioni medie del periodo selezionato.",
  "Seçili dönemdeki ortalama sıralar: {count} sorgu. Önceki dönemle karşılaştırılabilecek sorgu yok.":
    "Posizioni medie nel periodo selezionato per {count} query. Nessuna query è confrontabile con il periodo precedente.",
  "Tüm kayıtlı kelimeler bu dönemde gözlendi.":
    "Tutte le parole chiave salvate sono state osservate in questo periodo.",
  "Ek kazanç hesaplanmayan: {zero}; gösterimi yetersiz: {small}; karşılaştırılacak tıklama oranı olmayan: {curve}; tahmine uygun araması olmayan sayfa: {pairs}.":
    "Pagine senza guadagno calcolato: {zero}; impressioni insufficienti: {small}; nessun tasso di clic confrontabile: {curve}; nessuna query utilizzabile: {pairs}.",
  "{start} – {end} aralığında sayfa verisi alınamadı. Bu, hiç gösterim olmadığı anlamına gelmez; Arama performansında bağlı mülkü ve tarihleri kontrol edin.":
    "Nessun dato sulle pagine ricevuto per {start} – {end}. Non significa che non ci siano state impressioni; controlla proprietà e date in Rendimento della ricerca.",
  "Bu sayfalar için tahmin edilebilir arama yok":
    "Nessuna query utilizzabile per stimare queste pagine",
  "{hidden} sayfa gösterim aldı; alınan veride tahmine uygun marka dışı arama bulunamadı. Google'ın gizlediği sorgular, marka ayrımı veya veri sınırları buna yol açabilir. Bu sayfalarda kazanç sıfır değil, bilinmiyor.":
    "{hidden} pagine hanno ricevuto impressioni, ma i dati non contengono query non di marca utilizzabili. Query nascoste, esclusioni del marchio o limiti dei dati possono spiegarlo. Il guadagno potenziale è sconosciuto, non zero.",
  "{start} – {end} aralığında sitenizin tıklama oranını sıraya göre ölçecek kadar arama yok. Arama performansında gösterim alan sorguları inceleyin; daha fazla veri birikince tahmin yeniden hesaplanabilir.":
    "Le query del periodo {start} – {end} non bastano a misurare il tasso di clic per posizione. Esamina le query con impressioni in Rendimento della ricerca; la stima potrà essere ricalcolata con più dati.",
  "Kaydettiğiniz aramaların ortalama sırasını ve dönemler arasındaki değişimini inceleyin.":
    "Esamina le posizioni medie delle query salvate e come cambiano tra i periodi.",
  "Liste güncellendi: {date}": "Elenco aggiornato: {date}",
  "{count} kontrolde kritik sorun": "Problemi critici in {count} controlli",
  "{count} kontrolde uyarı": "Avvisi in {count} controlli",
  "Google anonim sorguları gizler ve günlük satırları sınırlar; bu arşiv tüm aramaları içermez.":
    "Google nasconde le query anonimizzate e limita le righe giornaliere; questo archivio non contiene tutte le ricerche.",
  "Bu sayfa açıkken kalan günler otomatik yüklenir; bağlantı veya kota hatasında beklenir.":
    "I giorni rimanenti vengono caricati automaticamente mentre questa pagina è aperta; gli errori di connessione o quota sospendono la sincronizzazione.",
  "Google verisi alındı: {date}": "Dati Google acquisiti: {date}",
  "Google anonim sorguları gizler. API, arama türü başına günde en fazla {limit} satır sunar; sorgu ve sayfa ayrıntılarında başka satırları da atlayabilir. Tam sayfalama, tüm aramaların listelendiği anlamına gelmez.":
    "Google nasconde le query anonimizzate. L’API fornisce al massimo {limit} righe al giorno per tipo di ricerca e può omettere altri dettagli su query e pagine. La paginazione completa non significa che ogni ricerca sia elencata.",
  // Dashboard source scope and measured next steps.
  Dönem: "Periodo",
  "Ölçüler ne demek?": "Cosa significano queste misure?",
  "Kesin veri": "Dati definitivi",
  "Geçici veri": "Dati provvisori",
  "Google son günleri sonradan düzeltebilir.":
    "Google può ancora correggere gli ultimi giorni.",
  Yok: "Nessuno",
  "Toplamların son günü: {date}.": "Totali fino al: {date}.",
  "Geçici verinin son günü: {date}.": "Dati provvisori fino al: {date}.",
  "Bu dönemden sonra geçici veri alınmadı.":
    "Non sono stati ricevuti dati provvisori dopo questo periodo.",
  "{start} – {end} toplamlara dahil değil.":
    "Il periodo {start} – {end} è escluso dai totali.",
  "Search Console veri kapsamı": "Ambito dei dati di Search Console",
  "{issue} — {scope}": "{issue} — {scope}",
  "{count} uyarı türünü inceleyin": "Esamina {count} tipi di avvisi",
  "Uyarı bulgularını inceleyin": "Esamina gli avvisi rilevati",
  "{types} uyarı türü / {findings} sayfa bulgusu. Etkilenen sayfaları inceleyin.":
    "{types} tipi di avvisi / {findings} riscontri sulle pagine. Esamina le pagine interessate.",
  "{findings} sayfa bulgusu. Etkilenen sayfaları inceleyin.":
    "{findings} riscontri sulle pagine. Esamina le pagine interessate.",
  "{value} yüzde puan": "{value} punti percentuali",
  "Oran değişimi yüzde puanla gösterilir: iki dönemin yüzdeleri arasındaki farktır.":
    "La variazione del tasso è espressa in punti percentuali: la differenza tra le percentuali dei due periodi.",
  "Sayfayı inceleyin": "Esamina questa pagina",
  "Önce ölçülen aramalarla başlığın ve içeriğin uyumunu kontrol edin; yalnızca bir sorun doğrularsanız değişiklik yapın.":
    "Verifica prima che titolo e contenuti corrispondano alle ricerche osservate; modifica la pagina solo se confermi un problema.",
  "Bu sayfa için eşleşen Analytics verisi dönmedi.":
    "Non sono stati restituiti dati Analytics corrispondenti per questa pagina.",
  "Analytics eşleşmesi doğrulanamadı; nedeni bilinmiyor.":
    "La corrispondenza Analytics non è verificabile; il motivo è sconosciuto.",
  "İş türüne göre sayfalar": "Pagine per tipo di intervento",
  "Aday sayfa yok": "Nessuna pagina candidata",
  "Ölçülen aramaları incelemek için bir satıra tıklayın.":
    "Fai clic su una riga per esaminare le ricerche osservate.",
  "Gözlenen sayfalar ve olası işler; kazanç henüz hesaplanamıyor.":
    "Pagine osservate e possibili interventi; il guadagno non è ancora stimabile.",
  "Gözlenen sayfalar, olası işler ve hesaplanabilen ek tıklamalar.":
    "Pagine osservate, possibili interventi e clic aggiuntivi stimabili.",
  "Fırsatların kaynağı": "Fonti delle opportunità",
  "Dönüşüm bilgisi bilinmiyor.": "I dati sulle conversioni sono sconosciuti.",
  "Doğrulanmış dönüşüm: {count} sayfa":
    "Conversioni confermate: {count} pagine",
  "Eşleşen veride doğrulanmış dönüşüm yok.":
    "Nessuna conversione confermata nei dati corrispondenti.",
  "Eşleşen: {matched} / {total} sayfa":
    "Corrispondenze: {matched} / {total} pagine",
  "Dönüşüm durumu bilinmeyen: {count} sayfa":
    "Stato delle conversioni sconosciuto: {count} pagine",
  "Dönüşüm getirenleri göster": "Mostra le pagine con conversioni",
  "Bazı sayfalarda kazanç bilinmiyor; bu, sıfır kazanç demek değildir.":
    "Il guadagno è sconosciuto per alcune pagine; non significa che sia zero.",
  "Günlük tıklamalar; kesikli çizgi önceki dönemi gösterir.":
    "Clic giornalieri; la linea tratteggiata mostra il periodo precedente.",
  "Toplamların son günü": "Ultimo giorno dei totali",
  "Google'ın kesinleştirdiği veri": "Dati definitivi confermati da Google",
  "Gecikme varsayıldı": "Ritardo presunto",
  "Google kesinleşme tarihi bildirmedi; son günler gecikme varsayımıyla toplamların dışında tutuldu.":
    "Google non ha indicato una data di finalizzazione; gli ultimi giorni sono stati esclusi dai totali in base a un ritardo presunto.",
  "Toplamlara dahil günler: {start} – {end} ({days} gün). Günler Google'ın kullandığı Pasifik saatine göredir.":
    "Giorni inclusi nei totali: {start} – {end} ({days} giorni). Le date seguono il fuso orario del Pacifico usato da Google.",
  "Veri durumu": "Stato dei dati",
  "Analytics bağlantısı için rapor tarihleri eksik.":
    "Mancano le date del rapporto per il collegamento Analytics.",
  "Sayfa adresi Analytics bağlantısı için doğrulanamadı.":
    "Non è stato possibile verificare l’indirizzo della pagina per il collegamento Analytics.",
};
