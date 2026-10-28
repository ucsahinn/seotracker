import type { Catalog } from "@/shared/i18n";

/** Additional app-wide labels. */
export const itAppSupplemental: Catalog = {
  "Mülk izinlerini ayarla": "Configura le autorizzazioni della proprietà",
  "JSON dosyası çok büyük. Google Cloud'dan indirdiğiniz hizmet hesabı anahtarını seçin.":
    "Il file JSON è troppo grande. Seleziona la chiave dell’account di servizio scaricata da Google Cloud.",
  "Dosya okunamadı. Dosyayı yeniden seçin.":
    "Impossibile leggere il file. Selezionalo di nuovo.",
  "JSON içeriğini gizli yapıştır":
    "Incolla il contenuto JSON mantenendolo nascosto",
  "Hizmet hesabı kurulum adımları":
    "Passaggi di configurazione dell’account di servizio",
  "Yukarıdaki Google erişim anahtarı yerine bunu kullanabilirsiniz. Hizmet hesabında izin ekranı, test kullanıcısı ve yönlendirme adresi adımları yok. Google Cloud'da hesabı açıp JSON dosyasını indirin ve burada seçin, sonra hesabın e-posta adresini Search Console'da mülkünüze, bir meslektaşınızı eklermiş gibi kullanıcı olarak ekleyin.":
    "Puoi usarlo al posto della chiave di accesso Google indicata sopra. L’account di servizio non richiede schermata di consenso, utente di test o indirizzo di reindirizzamento. Crea l’account in Google Cloud, scarica il file JSON e selezionalo qui. Poi aggiungi l’indirizzo email dell’account come utente alla tua proprietà Search Console, come faresti con un collega.",
  "Anahtarsız ölçüm sınırlıdır; bu uygulama denetim başına en fazla {count} sayfayı dener. Google daha önce sınır koyabilir. Anahtar başarı garantisi vermez.":
    "La misurazione senza chiave è limitata; questa app prova al massimo {count} pagine per audit. Google potrebbe imporre un limite prima. La chiave non garantisce il successo.",
  "Anahtar bu kurulumdan silinir; hız ölçümü denetim başına uygulamanın anahtarsız sayfa sınırına döner. Google daha erken sınır koyabilir. İstediğiniz zaman yeniden girebilirsiniz.":
    "La chiave verrà eliminata da questa installazione; la misurazione della velocità tornerà al limite di pagine senza chiave per audit previsto dall’app. Google potrebbe imporre un limite prima. Puoi reinserirla in qualsiasi momento.",
  "example.com için 1 mobil istek; denetim ölçüm sayacına eklenmez.":
    "1 richiesta mobile per example.com; non viene aggiunta al contatore delle misurazioni dell’audit.",
  "Test tarihi: {date}": "Data del test: {date}",
  "Diğer ayar bölümleri için yana kaydırın.":
    "Scorri lateralmente per vedere le altre sezioni delle impostazioni.",
  "Dili uygula": "Applica lingua",
  "Arayüz dili bu tarayıcıda saklanır; projenin varsayılan pazar dilini değiştirmez.":
    "La lingua dell’interfaccia è salvata in questo browser; non modifica la lingua del mercato predefinito del progetto.",
  "GitHub istek sınırı veya erişim kısıtı bildirdi. Bir süre bekleyip tekrar deneyin; Yardım tanılamasını kontrol edin.":
    "GitHub ha segnalato un limite di richieste o una restrizione di accesso. Attendi e riprova; consulta la diagnostica in Aiuto.",
  "GitHub sürüm bilgisi okunamadı. Biraz bekleyip yeniden deneyin; sürerse Yardım ekranından tanılama alın.":
    "Impossibile leggere le informazioni sulla versione da GitHub. Attendi e riprova; se il problema persiste, ottieni la diagnostica dalla schermata Aiuto.",
  "Uygulama içi sürüm kontrolü kapalı. Windows tepsisi bağımsız olarak günlük sürüm kontrolü yapabilir.":
    "Il controllo della versione nell’app è disattivato. L’icona nell’area di notifica di Windows può verificare le versioni ogni giorno in modo indipendente.",
  "Sürüm kontrolü ayarı okunamadı. Son kayıt güncel olmayabilir.":
    "Impossibile leggere l’impostazione del controllo versione. L’ultimo record potrebbe non essere aggiornato.",
  "Son başarılı sürüm kontrolü: {date}":
    "Ultimo controllo versione riuscito: {date}",
  "Windows otomatik kurulum ayarları":
    "Impostazioni di installazione automatica di Windows",
  "Uygulama içi sürüm kontrolü": "Controllo della versione nell’app",
  "Açıkken uygulama içi kontrol en çok altı saatte bir GitHub sürüm listesine bakar. Bu tercih Windows tepsisinin günlük kontrolünü ve otomatik kurulum tercihini değiştirmez.":
    "Quando è attivo, il controllo nell’app consulta l’elenco delle versioni GitHub al massimo una volta ogni sei ore. Questa preferenza non modifica il controllo giornaliero dell’icona nell’area di notifica di Windows né la preferenza di installazione automatica.",
  "Bu pakette sürüm notu bulunmuyor.":
    "Questo pacchetto non contiene note di rilascio.",
  "Notlar uygulama paketiyle birlikte gelir. Yayınlanan notları kılavuzdan kontrol edebilirsiniz; bu durum kurulum kontrolü değildir.":
    "Le note sono incluse nel pacchetto dell’app. Puoi consultare le note pubblicate nella guida; questo stato non è un controllo dell’installazione.",
  "Bu kurulu sürüm için sürüm notu bulunmuyor. Aşağıda bu paketle gelen son notlar var.":
    "Non ci sono note di rilascio per questa versione installata. Qui sotto trovi le note più recenti incluse nel pacchetto.",
  "Son doğrulanan Windows ayarları gösteriliyor; yeniden okunana kadar değiştirilemez.":
    "Sono mostrate le ultime impostazioni Windows verificate; non possono essere modificate finché non vengono rilette.",
  "Google bağlantı ayarı henüz doğrulanamadı. Okuma tamamlanmazsa durumu yeniden kontrol edin.":
    "La configurazione della connessione Google non è ancora stata verificata. Se la lettura non termina, controlla di nuovo lo stato.",
  "Kurulum türü henüz doğrulanamadı. Üstteki durumu kontrol edin ve gerekirse yeniden deneyin.":
    "Il tipo di installazione non è ancora stato verificato. Controlla lo stato qui sopra e riprova se necessario.",
  "Sürümünüz v{version}. Güncelleme kontrolü başarısız oldu; yeni sürüm olup olmadığı doğrulanamadı. Ayarlar'daki güncelleme bölümünden yeniden deneyin.":
    "La tua versione è v{version}. Il controllo degli aggiornamenti non è riuscito; non è stato possibile verificare se esiste una nuova versione. Riprova dalla sezione aggiornamenti nelle Impostazioni.",
  "Kurulum kontrolü sonucu alınamadı. Durumu yeniden kontrol edin.":
    "Impossibile ottenere il risultato del controllo dell’installazione. Controlla di nuovo lo stato.",
  "Kurulum kontrollerinde sorun bulunmadı.":
    "I controlli dell’installazione non hanno rilevato problemi.",
  "{count} kurulum kontrolü dikkat istiyor.":
    "{count} controlli dell’installazione richiedono attenzione.",
  "Ajan araçları bu kurulumdaki projelere erişir. Son çağrı geçmiş kullanım kaydıdır; sürekli çevrimiçi bağlantı anlamına gelmez.":
    "Gli strumenti dell’agente accedono ai progetti di questa installazione. L’ultima chiamata è un record di utilizzo passato; non indica una connessione sempre attiva.",
  "Durumu yeniden oku": "Rileggi stato",
  "Bağlantıyı doğrula": "Verifica connessione",
  "Durum okunamadı. Yeniden deneyin; bağlantının başarısız olduğu sonucuna varılamaz.":
    "Impossibile leggere lo stato. Riprova; non si può concludere che la connessione non sia riuscita.",
  "Yeni araç çağrısı doğrulandı.": "Nuova chiamata a uno strumento verificata.",
  "Yeni araç çağrısı görülmedi. Ajanınızın MCP durumunu kontrol edip bir araç çağrısı yapın, sonra yeniden doğrulayın.":
    "Non è stata rilevata una nuova chiamata a uno strumento. Controlla lo stato MCP del tuo agente, esegui una chiamata e verifica di nuovo.",
  "Yeni araç çağrısı bekleniyor. Ajanınızdan seowatcher araçlarını kullanmasını isteyin.":
    "In attesa di una nuova chiamata a uno strumento. Chiedi al tuo agente di usare gli strumenti seowatcher.",
  "Sitelerinizi açın; arşiv verisini, son denetimi ve eksik bağlantıları burada görün.":
    "Apri i tuoi siti; qui trovi i dati dell’archivio, l’ultimo audit e le connessioni mancanti.",
  "Proje ara": "Cerca progetto",
  "Ad veya alan adı": "Nome o dominio",
  "Liste yenilenemedi; son alınan projeler gösteriliyor. Yeniden deneyin.":
    "Impossibile aggiornare l’elenco; sono mostrati gli ultimi progetti ricevuti. Riprova.",
  "Proje verileri yenilenemedi. Listeyi yenileyerek yeniden deneyin.":
    "Impossibile aggiornare i dati del progetto. Aggiorna l’elenco per riprovare.",
  "Bu aramayla eşleşen proje yok. Aramayı değiştirin.":
    "Nessun progetto corrisponde alla ricerca. Modifica la ricerca.",
  "Site eklenmedi. Bu proje için bir site seçin.":
    "Nessun sito aggiunto. Seleziona un sito per questo progetto.",
  "Son açılan": "Ultimo aperto",
  "Search Console bağla": "Collega Search Console",
  "Paneli aç": "Apri dashboard",
  "Arşivlenen liste yenilenemedi; son alınan liste gösteriliyor":
    "Impossibile aggiornare l’elenco archiviato; è mostrato l’ultimo elenco ricevuto",
  "Görünüm ve dil bu tarayıcıya, Google kimlikleri bu kurulumdaki tüm projelere, Windows tercihleri başlatıcıya uygulanır. Önce kullanacağınız Google kimliğini seçin, sonra proje bağlantılarından mülkünüzü belirleyin.":
    "L’aspetto e la lingua si applicano a questo browser, le credenziali Google a tutti i progetti di questa installazione e le preferenze Windows al programma di avvio. Scegli prima le credenziali Google da usare, poi seleziona la proprietà nelle connessioni del progetto.",
  "Kurulum türü okunamadı. Durumu yeniden kontrol edin; günlük konumu kurulum türü belirlendiğinde gösterilir.":
    "Impossibile leggere il tipo di installazione. Controlla di nuovo lo stato; il percorso dei log sarà mostrato quando il tipo di installazione sarà determinato.",
  "Proje kimliği okunuyor…": "Lettura dell’ID del progetto…",
  "Proje kimliği okunamadı. Proje listesini yeniden yükleyin.":
    "Impossibile leggere l’ID del progetto. Ricarica l’elenco dei progetti.",
  "Yazdırma sekmesi tarayıcı tarafından engellendi. Bu site için açılır pencerelere izin verin veya raporu yeni sekmede açıp Yazdır kullanın.":
    "Il browser ha bloccato la scheda di stampa. Consenti i popup per questo sito oppure apri il report in una nuova scheda e usa Stampa.",
  "Kaynak ve kayıt bilgileri": "Informazioni su origine e salvataggio",
  "Rapor bilgileri yenilenemedi. Son alınan kayıt gösteriliyor; sayfayı yenileyerek tekrar deneyin.":
    "Impossibile aggiornare le informazioni del report. È mostrato l’ultimo record ricevuto; aggiorna la pagina per riprovare.",
  "Rapor kaydedildiği dilde ve verilerle açılır. Güncel veri veya başka dil için kaynak ekrandan bilinçli olarak yeniden hazırlayın.":
    "Il report si apre con la lingua e i dati con cui è stato salvato. Per dati aggiornati o un’altra lingua, rigeneralo esplicitamente dalla schermata di origine.",
  "Arama raporu hazırla": "Prepara report di ricerca",
  "Denetim raporu hazırla": "Prepara report di audit",
  "Liste yenilenemedi. Son alınan kayıtlar gösteriliyor; Yenile ile tekrar deneyin.":
    "Impossibile aggiornare l’elenco. Sono mostrati gli ultimi record ricevuti; usa Aggiorna per riprovare.",
  "Filtreler uygulanıyor. Yeni sonuçlar gelene kadar önceki liste gösteriliyor.":
    "Applicazione dei filtri. L’elenco precedente resta visibile fino all’arrivo dei nuovi risultati.",
  "Proje alan adı: {domain} · Search Console mülkü: {property}":
    "Dominio del progetto: {domain} · Proprietà Search Console: {property}",
  "Alan adı belirtilmedi": "Dominio non specificato",
  "Mülk seçilmedi": "Nessuna proprietà selezionata",
  "Seçilen Search Console mülkü proje alan adını kapsamıyor. Ayrı bir mülkü bilerek seçtiyseniz koruyabilirsiniz; değiştirmek için aşağıdaki mülk seçimini kullanın.":
    "La proprietà Search Console selezionata non copre il dominio del progetto. Se hai scelto intenzionalmente una proprietà diversa, puoi mantenerla; per cambiarla, usa il selettore qui sotto.",
  "{name} · {domain}. Değişiklikler yalnızca bu projeye uygulanır.":
    "{name} · {domain}. Le modifiche si applicano solo a questo progetto.",
  "PageSpeed Insights · yalnızca denetimler": "PageSpeed Insights · solo audit",
  "Standart mülk sınırı varsayımı":
    "Limite presunto per una proprietà standard",
  "Son gözlenen kalan gösteriliyor; kota penceresi güncelliği doğrulanamadı. Yeni rapor yanıtı gelene kadar güncel kapasite bilinmiyor.":
    "È mostrata l’ultima quota residua osservata; non è stato possibile verificare se la finestra della quota sia aggiornata. La capacità attuale resta sconosciuta fino alla risposta di un nuovo report.",
  "Bir denetim en çok {count} sayfa tarar; gösterilen sayı proje alan adındaki son tamamlanan denetime aittir. Tarih denetimin başlangıcıdır.":
    "Un audit analizza al massimo {count} pagine; il numero mostrato si riferisce all’ultimo audit completato sul dominio del progetto. La data indica l’inizio dell’audit.",
  "Proje alan adındaki son tamamlanan denetim":
    "Ultimo audit completato sul dominio del progetto",
  "Son denetim girişimi": "Ultimo tentativo di audit",
  "Proje alan adındaki son denetim girişimi":
    "Ultimo tentativo di audit sul dominio del progetto",
  "Son denetim sürüyor. Sayfa sınırı için son tamamlanan denetim ayrı gösterilir.":
    "L’ultimo audit è in corso. L’ultimo audit completato viene mostrato separatamente per il limite di pagine.",
  "Son denetim tamamlanamadı. Son tamamlanan denetimin sayfa sayısı korunur; ayrıntıyı Denetim ekranından kontrol edin.":
    "L’ultimo audit non è stato completato. Il numero di pagine dell’ultimo audit completato viene mantenuto; consulta i dettagli nella schermata Audit.",
  "Rapor dönemi": "Periodo del report",
  "Google'ın tamamlandığını bildirdiği günler kullanıldı. Dönem sonu: {date}. Günler Pasifik saatine göredir.":
    "Sono stati usati i giorni che Google ha indicato come definitivi. Fine del periodo: {date}. I giorni seguono il fuso orario del Pacifico.",
  "Son günler gecikme varsayımıyla dışarıda bırakıldı; Google kesinleşme sınırı bildirmedi. Günler Pasifik saatine göredir.":
    "I giorni più recenti sono stati esclusi in base a un ritardo presunto; Google non ha indicato il limite dei dati definitivi. I giorni seguono il fuso orario del Pacifico.",
  "Gösterilen: {shown} / {observed} gözlenen kayıt. Kaynak satır sınırları nedeniyle tüm siteyi temsil etmeyebilir.":
    "Mostrati: {shown} / {observed} record osservati. A causa dei limiti di righe dell’origine, potrebbero non rappresentare l’intero sito.",
  "Okunan satırlar: {queries} sorgu, {pages} sayfa, {pairs} sorgu×sayfa. Listelerden türetilen fırsatlar bu kapsamla sınırlıdır.":
    "Righe lette: {queries} query, {pages} pagine, {pairs} query×pagina. Le opportunità ricavate dagli elenchi sono limitate a questa copertura.",
  "Listelenmeyen sorguların tıklama payı: {share}. Gizlenen ve satır sınırı dışında kalan sorgular birlikte hesaplanır.":
    "Quota di clic delle query non elencate: {share}. Le query nascoste e quelle oltre il limite di righe vengono conteggiate insieme.",
  "Google'ın satır sınırına ulaşıldı; sorgu, sayfa veya sorgu×sayfa listeleri eksik olabilir. Bu listelerden üretilen fırsatlar tam site envanteri değildir.":
    "È stato raggiunto il limite di righe di Google; gli elenchi di query, pagine o query×pagina potrebbero essere incompleti. Le opportunità ricavate da questi elenchi non sono un inventario completo del sito.",
  "İlk {count} işin {known} tanesinde kazanç hesaplanabildi; {unknown} tanesinde bilinmiyor. Hesaplanabilen işler için {days} günde en fazla {clicks} ek tıklama (üst sınır).":
    "Il guadagno è stato calcolato per {known} delle prime {count} attività; è sconosciuto per {unknown}. Per le attività calcolabili, al massimo {clicks} clic aggiuntivi in {days} giorni (limite superiore).",
  "Okunan sayfalarda eşiği aşan, gösterim alıp hiç tıklanmayan sayfa bulunmadı.":
    "Tra le pagine lette non sono state trovate pagine sopra la soglia con impressioni ma nessun clic.",
  "Önceki tıklama": "Clic precedenti",
  "Şimdiki tıklama": "Clic attuali",
  "Okunan sorgularda bu koşulu sağlayan kayıt bulunmadı.":
    "Tra le query lette non sono stati trovati record che soddisfano questa condizione.",
  "Önceki dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Yeni sorgu sayısı bu veriden belirlenemez.":
    "Il confronto con il periodo precedente non è disponibile o la copertura delle righe è incompleta. Il numero di nuove query non può essere determinato da questi dati.",
  "Dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Kaybolan sorgu sayısı bu veriden belirlenemez.":
    "Il confronto tra periodi non è disponibile o la copertura delle righe è incompleta. Il numero di query scomparse non può essere determinato da questi dati.",
  "Uzun dönem karşılaştırması alınamadı. Yeterli geçmiş olmayabilir veya kaynak isteği başarısız olmuş olabilir; geçmiş veriyi kontrol edip raporu yeniden hazırlayın.":
    "Impossibile ottenere il confronto a lungo termine. Potrebbe mancare uno storico sufficiente oppure la richiesta all’origine potrebbe essere fallita; controlla i dati storici e rigenera il report.",
  "Çakışma analizi alınamadı. Diğer bölümler kullanılabilir; Arama performansında çakışmaları kontrol edip raporu yeniden hazırlayın.":
    "Impossibile ottenere l’analisi delle sovrapposizioni. Le altre sezioni sono disponibili; controlla le sovrapposizioni in Rendimento della ricerca e rigenera il report.",
  "Çakışma dönemi: {start} – {end}. İncelenen: {count} sorgu. Eşik: sorguda 100 gösterim; sayfada 10 gösterim ve yüzde 20 pay. Bu dönem ana rapordan farklı olabilir.":
    "Periodo delle sovrapposizioni: {start} – {end}. Esaminate: {count} query. Soglia: 100 impressioni per query; 10 impressioni e quota del 20% per pagina. Questo periodo può differire da quello del report principale.",
  "Kaynak satır sınırına ulaştı. Okunmayan sorgularda başka çok sayfalı sonuçlar olabilir.":
    "L’origine ha raggiunto il limite di righe. Le query non lette potrebbero contenere altri risultati con più pagine.",
  "Sonuçlar yalnızca okunan ve eşikleri geçen sorguları kapsar.":
    "I risultati coprono solo le query lette che superano le soglie.",
  "Okunan sorgularda eşiği aşan çok sayfalı sonuç bulunmadı.":
    "Tra le query lette non sono stati trovati risultati con più pagine sopra la soglia.",
  "Diğer sayfa sayısı": "Numero di altre pagine",
  "Bölünen gösterim payı": "Quota di impressioni suddivisa",
  "Bir sorguda birden çok sayfanın görünmesi kayıp tıklama veya SEO zararı kanıtı değildir. Sayfaların aynı ihtiyacı karşılayıp karşılamadığını inceleyin.":
    "La presenza di più pagine per una query non dimostra una perdita di clic o un danno SEO. Verifica se le pagine rispondono alla stessa esigenza.",
  "Kaynak satır sınırına ulaştı; dağılım eksik olabilir.":
    "L’origine ha raggiunto il limite di righe; la distribuzione potrebbe essere incompleta.",
  "Özel sonuç görünümü verisi alınamadı veya kayıt dönmedi. Kaynak bu iki durumu ayırmadığı için yokluk sonucu çıkarılamaz; Arama performansını kontrol edin.":
    "Impossibile ottenere i dati sull’aspetto speciale dei risultati oppure non sono stati restituiti record. L’origine non distingue i due casi, quindi non si può dedurne l’assenza; controlla Rendimento della ricerca.",
  "Okunan görünüm tablosunda bu döneme ait kayıt bulunmadı.":
    "Nessun record per questo periodo nella tabella dell’aspetto nella ricerca letta.",
  "Kaydedilmiş belge": "Documento salvato",
  "Rapor hazırlanırken veriler sunucudan yeniden okundu; Google geçmiş değerleri düzeltebilir. Aynı dönem etiketi önceki ekran görüntüsüyle birebir ölçüm eşitliğini garanti etmez. Başlık dili değiştiğinde ayrı bir belge oluşabilir.":
    "Durante la preparazione del report i dati sono stati riletti dal server; Google può correggere i valori storici. La stessa etichetta del periodo non garantisce misurazioni identiche a una precedente schermata. Una lingua diversa del titolo può generare un documento separato.",
  "Sorgu tabloları gizlilik nedeniyle gizlenen satırları içermez. Satır sınırı varsa listelenmeyen pay, sınır dışında kalan sorguları da içerir.":
    "Le tabelle delle query non includono le righe nascoste per motivi di privacy. Se esiste un limite di righe, la quota non elencata include anche le query oltre tale limite.",
  "Arama görünümünün istek bütçesi: {count}. Ek çakışma analizi dahil değildir; önbellek kullanımı gerçek ağ isteği sayısını değiştirir.":
    "Budget di richieste per l’aspetto nella ricerca: {count}. Non include l’analisi aggiuntiva delle sovrapposizioni; l’uso della cache cambia il numero effettivo di richieste di rete.",
  Özet: "Riepilogo",
  "Uygulama raporu, tür kaydedilmemiş": "Report dell’app, tipo non salvato",
  "Sayılar kaydedilen tüm bulgulardır: sayfa bulguları ve site geneli kontroller birlikte; aynı sayfada birden çok bulgu olabilir.":
    "I conteggi includono tutti i problemi registrati: quelli delle pagine e i controlli sull’intero sito; una pagina può averne più di uno.",
  "Tarama sınırı: {count} sayfa": "Limite di scansione: {count} pagine",
  "Tarama sınırı kaydedilmemiş.":
    "Il limite di scansione non è stato registrato.",
  "Kapsam ayrıntıları": "Dettagli sull’ambito",
};
