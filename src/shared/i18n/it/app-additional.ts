import type { Catalog } from "@/shared/i18n";

/** Additional app-wide labels. */
export const itAppAdditional: Catalog = {
  Yönerge: "Istruzioni",
  "Projenin geneline ait marka dili Proje bilgisi › Yazım tercihleri altında tutulur.":
    "La voce del marchio per l’intero progetto si trova in Contesto del progetto › Preferenze di scrittura.",
  "Şablon oluştur": "Crea modello",
  Rapor: "Report",
  "Son 7 gün": "Ultimi 7 giorni",
  "Yanıtınız alındı": "La tua risposta è stata registrata",
  "{count} yanıt": { one: "{count} risposta", other: "{count} risposte" },
  "PowerShell: parolayı ekrana yazdırmadan panoya kopyalayın. Yalnızca MCP istemcinizin yerel gizli başlık alanına yapıştırın, ardından panoyu temizleyin. Sohbete yapıştırmayın.":
    "PowerShell: copia la password negli appunti senza mostrarla sullo schermo. Incollala solo nel campo locale riservato alle intestazioni segrete del client MCP, quindi svuota gli appunti. Non incollarla nella chat.",
  "Google Analytics mülkü seçildi": "Proprietà Google Analytics selezionata",
  "Mülk seçim tarihi: {date}": "Data di selezione della proprietà: {date}",
  "Kimlik yöntemi: hizmet hesabı":
    "Metodo di autenticazione: account di servizio",
  "Kimlik yöntemi: Google OAuth": "Metodo di autenticazione: Google OAuth",
  "Saat dilimi: {timezone} · Para birimi: {currency}":
    "Fuso orario: {timezone} · Valuta: {currency}",
  "Search Console mülkü seçildi": "Proprietà Search Console selezionata",
  "Bağlantı ayarları yenilenemedi. Son kayıt gösteriliyor; erişim durumu bilinmiyor.":
    "Impossibile aggiornare le impostazioni di connessione. È mostrato l’ultimo record; lo stato dell’accesso è sconosciuto.",
  "Google izni geçersiz veya süresi dolmuş. İlgili Google hesabını yeniden bağlayın.":
    "L’autorizzazione Google non è valida o è scaduta. Ricollega l’account Google interessato.",
  "Google bu mülke erişimi reddetti. Seçilen hesabın mülk izinlerini kontrol edin.":
    "Google ha negato l’accesso a questa proprietà. Controlla le autorizzazioni dell’account selezionato per la proprietà.",
  "Google API etkin değil. Google Cloud projesinde ilgili API'yi etkinleştirip yeniden deneyin.":
    "L’API Google non è attiva. Attiva l’API corrispondente nel progetto Google Cloud e riprova.",
  "Google istek sınırına ulaşıldı. Bir süre bekleyin ve Google Cloud kota ekranını kontrol edin.":
    "È stato raggiunto il limite di richieste Google. Attendi e controlla la schermata delle quote di Google Cloud.",
  "Google zamanında yanıt vermedi. Bağlantıyı kontrol edip yeniden deneyin; mevcut mülk seçimi korunur.":
    "Google non ha risposto in tempo. Controlla la connessione e riprova; la proprietà selezionata viene mantenuta.",
  "Google bağlantı yanıtı okunamadı; erişiminizin olmadığı sonucu çıkarılamaz. Yeniden deneyin. Sürerse Yardım ekranından tanılama paketini alıp sorunu bildirin.":
    "Impossibile leggere la risposta della connessione Google; questo non significa che tu non abbia accesso. Riprova. Se il problema persiste, scarica il pacchetto diagnostico dalla schermata Aiuto e segnala il problema.",
  "Mülk seçimi kayıtlıdır. Veri erişimi bu ayar okumasıyla doğrulanmaz; son veri durumunu ilgili rapordan kontrol edin.":
    "La proprietà selezionata è salvata. La lettura di questa impostazione non verifica l’accesso ai dati; controlla lo stato più recente nel report corrispondente.",
  "Kurulumun Google kimlik ayarları":
    "Impostazioni delle credenziali Google dell’installazione",
  "Google mülk listesi okunamadı. Bu durum erişiminiz olmadığı anlamına gelmez. Son liste korunur; yeniden deneyin veya Yardım tanılamasını kontrol edin.":
    "Impossibile leggere l’elenco delle proprietà Google. Questo non significa che tu non abbia accesso. L’ultimo elenco viene mantenuto; riprova o consulta la diagnostica in Aiuto.",
  "Mülk seçili": "Proprietà selezionata",
  "En fazla {count} karakter": "Massimo {count} caratteri",
  "İsteğe bağlı rakip notu eklenmemiş. Bu liste rakip sıralaması ölçmez.":
    "Non sono state aggiunte note facoltative sui concorrenti. Questo elenco non misura il loro posizionamento.",
  "İsteğe bağlı sayfa listesi boş. Sayfa rolleri sizin notlarınızdır; ölçülen dönüşüm değildir.":
    "L’elenco facoltativo delle pagine è vuoto. I ruoli delle pagine sono tue annotazioni, non conversioni misurate.",
  "Search Console bağlantısı kayıtlı. Veri durumunu Arama performansında görün.":
    "La connessione a Search Console è salvata. Controlla lo stato dei dati in Rendimento della ricerca.",
  "Analytics bağlantısı kayıtlı. Veri durumunu Analytics ekranında görün.":
    "La connessione ad Analytics è salvata. Controlla lo stato dei dati nella schermata Analytics.",
  "Bağlı değil. Oturum ve dönüşüm analizi için Analytics bağlayın; arama tıklamalarını Search Console ile inceleyebilirsiniz.":
    "Non collegato. Collega Analytics per analizzare sessioni e conversioni; puoi esaminare i clic dalla ricerca con Search Console.",
  "Anahtar kayıtlı. Google kotası veya hizmet hatası hız ölçümünü yine engelleyebilir.":
    "Chiave salvata. La quota Google o un errore del servizio possono comunque impedire la misurazione della velocità.",
  "Anahtar yok. Ortak Google kotası hız ölçümünü sınırlayabilir; Ayarlar’dan kendi anahtarınızı ekleyin.":
    "Nessuna chiave. La quota Google condivisa può limitare la misurazione della velocità; aggiungi la tua chiave nelle Impostazioni.",
  "Son yedi günde başlatılıp tamamlanmış bu siteye ait denetim var.":
    "Esiste un audit di questo sito avviato e completato negli ultimi sette giorni.",
  "Son yedi günde başlatılıp tamamlanmış bu-site denetimi yok. Site denetiminden yeni bir denetim başlatın.":
    "Non esistono audit di questo sito avviati e completati negli ultimi sette giorni. Avviane uno da Controllo del sito.",
  "Bu kurulumda bir ajan en az bir araç kullandı.":
    "Un agente ha usato almeno uno strumento in questa installazione.",
  "Bu kurulumda kayıtlı araç çağrısı yok. Ajan kurulumu adımlarını izleyin.":
    "Non ci sono chiamate a strumenti registrate in questa installazione. Segui i passaggi di configurazione dell’agente.",
  "Kayıtlı bağlantılar ve proje notları. Bu liste bir SEO başarı puanı veya canlı bağlantı testi değildir.":
    "Connessioni salvate e note del progetto. Questo elenco non è un punteggio di successo SEO né un test della connessione in tempo reale.",
  "Kurulum ve proje notları farklı anlarda okundu. Tutarlı durum için bilgiyi yenileyin.":
    "Lo stato dell’installazione e le note del progetto sono stati letti in momenti diversi. Aggiorna le informazioni per ottenere uno stato coerente.",
  "{done}/{total} kayıtlı · {missing} eksik · {unknown} okunamadı":
    "{done}/{total} salvati · {missing} mancanti · {unknown} illeggibili",
  "Kurulum yenilenemedi; son alınan durum gösteriliyor. Yeniden deneyin.":
    "Impossibile aggiornare l’installazione; è mostrato l’ultimo stato ricevuto. Riprova.",
  "Kaydedilmemiş değişiklikleriniz var. Bu sayfadan ayrılmak istiyor musunuz?":
    "Hai modifiche non salvate. Vuoi uscire da questa pagina?",
  "İstemi kopyalayıp Claude Code ya da Codex'e yapıştırın. Bu istem ajandan kaydetmeden önce onayınızı istemesini ister. Araç çağrıları bilgiyi hemen kaydedebilir; onay davranışı ajanınıza bağlıdır.":
    "Copia il prompt e incollalo in Claude Code o Codex. Il prompt chiede all’agente di ottenere la tua conferma prima di salvare. Le chiamate agli strumenti possono salvare subito le informazioni; il comportamento di conferma dipende dal tuo agente.",
  "İstemi kopyalayıp ajana yapıştırın. Bu istem ajandan mevcut notları gözden geçirmesini ve kaydetmeden önce onayınızı istemesini ister. Uygulama araçları ayrıca bir onay kapısı uygulamaz.":
    "Copia il prompt e incollalo nell’agente. Il prompt gli chiede di rivedere le note esistenti e di ottenere la tua conferma prima di salvare. Gli strumenti dell’app non impongono un ulteriore passaggio di approvazione.",
  "Ajanın kullanabileceği kayıtlı proje notları. Kaydedilen bilgiyi, son yazanı ve eksikleri gözden geçirin.":
    "Note salvate del progetto disponibili per l’agente. Rivedi le informazioni, l’ultimo autore e le parti mancanti.",
  "Son kayıtlı bilgi gösteriliyor; yenileme başarısız. Taslaklarınız korunuyor.":
    "Sono mostrate le ultime informazioni salvate; l’aggiornamento non è riuscito. Le tue bozze vengono conservate.",
  "{filled}/{total} bölüm dolu": "{filled}/{total} sezioni compilate",
  "Şu anki hedef kayıtlı değil. Hedef bölümüne bu dönem başarmak istediğinizi yazın.":
    "L’obiettivo attuale non è salvato. Nella sezione Obiettivo, scrivi cosa vuoi ottenere in questo periodo.",
  "İlk boş bölümü doldur": "Compila la prima sezione vuota",
  "Bölüme git": "Vai alla sezione",
  "Bölüm seçin": "Seleziona una sezione",
  "Ajanla taslak hazırla": "Prepara una bozza con l’agente",
  "Proje kimliği okunmadan istem hazırlanamaz. Proje listesini yeniden yükleyin.":
    "Impossibile preparare il prompt prima di leggere l’ID del progetto. Ricarica l’elenco dei progetti.",
  "Kaynak ve kurulum": "Origine e installazione",
  "En yeni en fazla yirmi kayıt gösterilir. Tarihi sunucu UTC gününe göre belirler. Doksan günden eski kayıtlar yeni kayıt eklenirken temizlenir; bu liste eksiksiz geçmiş değildir.":
    "Sono mostrati al massimo i venti record più recenti. La data segue il giorno UTC del server. I record più vecchi di novanta giorni vengono rimossi quando se ne aggiunge uno nuovo; questo elenco non è una cronologia completa.",
  "Bilgi kaydedilemedi. Taslağınız korunuyor; alanları kontrol edip yeniden kaydedin.":
    "Impossibile salvare le informazioni. La bozza viene conservata; controlla i campi e salva di nuovo.",
  "Proje verileri okunamadı. Listeyi yenileyerek yeniden deneyin.":
    "Impossibile leggere i dati del progetto. Aggiorna l’elenco per riprovare.",
  "Bazı kaynaklar okunamadı; gösterilen diğer bilgiler korunuyor.":
    "Impossibile leggere alcune origini; le altre informazioni mostrate vengono conservate.",
  "Arama arşivi · Web · tüm cihazlar ve ülkeler":
    "Archivio di ricerca · Web · tutti i dispositivi e paesi",
  "{observed}/{total} gün kayıtlı; toplam yalnızca kayıtlı günleri içerir.":
    "{observed}/{total} giorni registrati; il totale include solo i giorni registrati.",
  "Kayıtlı günlerde ölçülen tıklama sayısı sıfır.":
    "Nei giorni registrati sono stati misurati zero clic.",
  "Önceki dönem: {start} – {end} · {observed}/{total} gün kayıtlı":
    "Periodo precedente: {start} – {end} · {observed}/{total} giorni registrati",
  "İki dönemin de tüm günleri kayıtlı olmadığı için değişim hesaplanmadı.":
    "La variazione non è stata calcolata perché almeno uno dei due periodi non ha tutti i giorni registrati.",
  "Arşiv kaynağı": "Origine dell’archivio",
  "Son kayıtlı gün: {date}": "Ultimo giorno registrato: {date}",
  "Son arşiv okuması: {date}": "Ultima lettura dell’archivio: {date}",
  "Kesinleşme kaynağı arşivde kayıtlı değil":
    "L’origine della conferma dei dati definitivi non è registrata nell’archivio",
  "Bu kurulumda henüz arama arşivi yok. Arama performansını açarak veriyi okuyun.":
    "Questa installazione non ha ancora un archivio di ricerca. Apri Rendimento della ricerca per leggere i dati.",
  "Son tamamlanan bu-site denetimi": "Ultimo audit completato di questo sito",
  "Başlangıç: {date}": "Inizio: {date}",
  "Tamamlanma: {date}": "Completamento: {date}",
  "Bu denetim en az yedi gün önce başlatıldı. Güncel durum için yeni denetim başlatın.":
    "Questo audit è stato avviato almeno sette giorni fa. Avviane uno nuovo per conoscere lo stato attuale.",
  "Denetimi aç": "Apri audit",
  "Bu site için tamamlanmış denetim yok. Siteyi seçip denetim başlatın.":
    "Non ci sono audit completati per questo sito. Seleziona il sito e avvia un audit.",
  "Son deneme başarısız": "Ultimo tentativo non riuscito",
  "Son denetim sürüyor": "Ultimo audit in corso",
  "Son deneme tamamlanmadı": "Ultimo tentativo non completato",
  "Bağlantı kaydı, verinin başarıyla okunduğunu göstermez.":
    "Una connessione salvata non dimostra che i dati siano stati letti correttamente.",
  "Bağlantı kayıtlı": "Connessione salvata",
  "Ülke ve dil, kaydettiğiniz kelimelerin varsayılan pazarıdır. Arama performansında ülkeyi filtrelerden seçersiniz; bu ayar geçmiş veriyi değiştirmez.":
    "Il paese e la lingua sono il mercato predefinito delle parole chiave salvate. In Rendimento della ricerca scegli il paese dai filtri; questa impostazione non modifica i dati storici.",
  "Denetim bu adresten başlar. Google mülkünü Bağlantılar bölümünden ayrıca seçersiniz. https:// olmadan yazın, örneğin example.com.":
    "L’audit parte da questo indirizzo. La proprietà Google si seleziona separatamente in Connessioni. Scrivi senza https://, ad esempio example.com.",
  "Alan adı değişikliği Google mülk seçimini ve geçmiş kayıtları değiştirmez. Kaydetmeden önce Bağlantılar bölümündeki mülkün bu siteye ait olduğunu kontrol edin.":
    "La modifica del dominio non cambia la proprietà Google selezionata né i record storici. Prima di salvare, controlla che la proprietà in Connessioni appartenga a questo sito.",
  "Marka terimlerini Arama performansında düzenleyin":
    "Modifica i termini del marchio in Rendimento della ricerca",
  "Google mülk seçimi ve geçmiş korunarak alan adının değiştirilmesini onaylıyorum.":
    "Confermo la modifica del dominio mantenendo la proprietà Google selezionata e la cronologia.",
  "Sınırları gösterilen proje": "Progetto di cui sono mostrati i limiti",
  "Sınırlar yenilenemedi; son kayıt gösteriliyor":
    "Impossibile aggiornare i limiti; è mostrato l’ultimo record",
  "{state} · {count} kaynak bilinmiyor":
    "{state} · {count} origini sconosciute",
  "Bilinen sınırlarda sorun yok": "Nessun problema nei limiti conosciuti",
  "Rapor indirmesi bağlantı hatası veya zaman aşımı nedeniyle tamamlanamadı. Bağlantınızı kontrol edip yeniden indirin.":
    "Il download del report non è stato completato a causa di un errore di connessione o di un timeout. Controlla la connessione e scaricalo di nuovo.",
  "Rapor indirmesi başka bir sayfaya yönlendirildi. Uygulamayı yenileyip erişiminizi kontrol edin.":
    "Il download del report è stato reindirizzato a un’altra pagina. Aggiorna l’app e verifica l’accesso.",
  "Rapor bulunamadı veya erişiminiz yok. Listeyi yenileyip raporu yeniden seçin.":
    "Report non trovato o accesso non consentito. Aggiorna l’elenco e seleziona di nuovo il report.",
  "Rapor erişimi doğrulanamadı. Uygulamayı yenileyip yeniden indirin.":
    "Impossibile verificare l’accesso al report. Aggiorna l’app e scaricalo di nuovo.",
  "Rapor sunucusu indirmeyi tamamlayamadı. Biraz sonra yeniden indirin.":
    "Il server dei report non ha completato il download. Scaricalo di nuovo tra poco.",
  "Kaydedildi: {date}": "Salvato: {date}",
  "Arama performansı ekranında dönem ve süzgeçleri seçip Raporu indir düğmesini kullanın. Kaydedilmiş raporlar kaynak bağlantısı kesilse de okunabilir.":
    "Seleziona il periodo e i filtri in Rendimento della ricerca, poi usa Scarica report. I report salvati restano leggibili anche se l’origine viene scollegata.",
  Sıralama: "Ordinamento",
  "Oluşturulma zamanı": "Data di creazione",
  "{matching} sonuç / projedeki {total} rapor":
    "{matching} risultati / {total} report nel progetto",
  "Son 7 gün, bu sürede kaydedilen veya güncellenen ayrı dosyaları süzer; kaynak verinin güncelliğini göstermez. Arama başlık ve kayıtlı özeti tarar.":
    "Ultimi 7 giorni filtra i singoli file salvati o aggiornati in questo periodo; non indica quanto siano recenti i dati di origine. La ricerca esamina il titolo e il riepilogo salvato.",
  "Tür sayıları arama ve Son 7 gün süzgecine göredir; seçili türden önce hesaplanır.":
    "I conteggi per tipo seguono la ricerca e il filtro Ultimi 7 giorni; vengono calcolati prima di applicare il tipo selezionato.",
  "Aramayı veya türü temizleyerek kayıtlı raporları görün.":
    "Cancella la ricerca o il tipo per vedere i report salvati.",
  "Arama performansı veya Site denetimi ekranından rapor hazırlayın ya da rapor komutunu ajanınıza yapıştırın.":
    "Prepara un report da Rendimento della ricerca o Controllo del sito, oppure incolla il comando del report nel tuo agente.",
  "Veri dönemi: raporun içinde kontrol edin.":
    "Periodo dei dati: controllalo nel report.",
  Şablon: "Modello",
  "{start}–{end} / {total}": "{start}–{end} / {total}",
  Sonraki: "Successivo",
  "Saklama durumu": "Stato dell’archiviazione",
  "Saklama bilgileri alınamadı. Bu durum boş alan olduğunu göstermez; bağlantıyı kontrol edip yeniden deneyin.":
    "Impossibile ottenere le informazioni di archiviazione. Questo non indica che ci sia spazio libero; controlla la connessione e riprova.",
  "Son güncellenen rapor": "Ultimo report aggiornato",
  "Bu rapora özet kaydedilmemiş. Bulguları ve ilk adımı raporun içinde kontrol edin.":
    "Non è stato salvato un riepilogo per questo report. Controlla i risultati e il primo passo nel report.",
  "Kaydedildi: {date}. Bu zaman, kaynak verinin ölçüm tarihi değildir.":
    "Salvato: {date}. Questo orario non è la data di misurazione dei dati di origine.",
  "Bu raporun veri dönemi yapılandırılmış olarak kaydedilmemiş. Dönemi ve veri sınırlarını raporun içinde kontrol edin.":
    "Il periodo dei dati di questo report non è stato salvato in forma strutturata. Controlla il periodo e i limiti dei dati nel report.",
  "Raporu aç": "Apri report",
  "Rapor belgesi bulunamadı veya erişiminiz yok. Listeyi yenileyip raporu yeniden seçin.":
    "Documento del report non trovato o accesso non consentito. Aggiorna l’elenco e seleziona di nuovo il report.",
  "Raporun kullanılabilirliği doğrulanamadı. Sunucuya veya bağlantınıza erişilemiyor; yeniden deneyin.":
    "Impossibile verificare la disponibilità del report. Il server o la connessione non sono raggiungibili; riprova.",
  "Rapor önizlemesi zamanında açılmadı. Bağlantıyı kontrol edin; yeniden deneyin veya yeni sekmede açın.":
    "L’anteprima del report non si è aperta in tempo. Controlla la connessione; riprova o aprila in una nuova scheda.",
  "Arşiv ayrıntısı": "Dettagli dell’archivio",
  "Dönem: {start} – {end}": "Periodo: {start} – {end}",
  "Sıra bilinmiyor": "Posizione sconosciuta",
  "Önceki dönem: {start} – {end}": "Periodo precedente: {start} – {end}",
  "Önceki ortalama sıra": "Posizione media precedente",
  Gösterimler: "Impressioni",
  "Sıra arşivi okunamadı. Liste kayıtlı; sıra bilgisi için yeniden deneyin.":
    "Impossibile leggere l’archivio delle posizioni. L’elenco è salvato; riprova per ottenere le posizioni.",
  "Eksik arşiv nedeniyle gözlem yokluğu doğrulanamaz":
    "L’archivio incompleto non permette di confermare l’assenza di osservazioni",
  "Okunan arşivde eşleşen gözlem yok":
    "Nessuna osservazione corrispondente nell’archivio letto",
  "Eşleşen ham sorgular; gösterimle ağırlıklandırılır":
    "Query originali corrispondenti; ponderate per le impressioni",
  "Önceki dönemin ham sorguları": "Query originali del periodo precedente",
  "Gözlem yok": "Nessuna osservazione",
  "Konum ve dil kayıt bilgisi olarak korunur. Arşiv tüm ülkeleri ve cihazları kapsar. Türkçe büyük/küçük harf ve birden fazla boşluk eşleştirilir; ham sorgular gösterimle ağırlıklandırılır. Google bazı nadir sorguları döndürmeyebilir.":
    "La località e la lingua restano informazioni del record. L’archivio copre tutti i paesi e i dispositivi. La corrispondenza gestisce maiuscole e minuscole turche e spazi multipli; le query originali sono ponderate per le impressioni. Google potrebbe non restituire alcune query rare.",
  "Kayıtlı pazar (arşiv filtresi değil)":
    "Mercato salvato (non è un filtro dell’archivio)",
  "Eski kayıt bilgisi: {intent}; tarih: {date}":
    "Informazioni del vecchio record: {intent}; data: {date}",
  "Arama amacı ölçülmedi": "Intento di ricerca non misurato",
  "Canlı arama son 28 günü ve metni içeren sorguları açar; bu arşiv ortalamasıyla aynı dönem veya tam eşleşme değildir.":
    "La ricerca in tempo reale apre gli ultimi 28 giorni e le query che contengono il testo; non usa lo stesso periodo della media dell’archivio né una corrispondenza esatta.",
  "Arama performansında ara (canlı dönem)":
    "Cerca in Rendimento della ricerca (periodo attuale)",
  "Günlük arşiv gözlemlerini göster":
    "Mostra le osservazioni giornaliere dell’archivio",
  "Günlük arşiv okunamadı veya liste değişti. Ayrıntıyı kapatıp listeyi yenileyin; ardından yeniden açın.":
    "Impossibile leggere l’archivio giornaliero oppure l’elenco è cambiato. Chiudi i dettagli, aggiorna l’elenco e riaprili.",
  "Bu tarihlerde eşleşen günlük gözlem yok; eksik günler sıfır sayılmaz.":
    "Nessuna osservazione giornaliera corrispondente in queste date; i giorni mancanti non vengono conteggiati come zero.",
  "Eklenen terimlerin tümü eşleşmelidir.":
    "Tutti i termini aggiunti devono corrispondere.",
  "Eklenen terimlerden hiçbiri bulunmamalıdır.":
    "Nessuno dei termini aggiunti deve essere presente.",
  "En fazla {count} terim.": "Massimo {count} termini.",
  "Terim sınırı aşıldı. Eklemek için önce bir terimi kaldırın.":
    "Limite di termini superato. Rimuovi un termine prima di aggiungerne un altro.",
  "Seçtiğiniz kelimelerin arşiv gözlemlerini, karşılaştırılabilir hareketlerini ve eksik kanıtlarını inceleyin.":
    "Esamina le osservazioni nell’archivio, i movimenti confrontabili e le informazioni mancanti per le parole chiave selezionate.",
  "Liste yanıtı: {date}": "Risposta dell’elenco: {date}",
  "Arşiv dönemi": "Periodo dell’archivio",
  "{count} gün": "{count} giorni",
  "Listeyi yenile": "Aggiorna elenco",
  "Filtrelenen {count} kelimeyi aktar":
    "Esporta le {count} parole chiave filtrate",
  "Kelime ara; tüm terimler eşleşir":
    "Cerca parole chiave; tutti i termini devono corrispondere",
  "Terimleri virgülle ayırın": "Separa i termini con virgole",
  "Filtre uygulanıyor…": "Applicazione del filtro…",
  "En fazla {count} terim girin; fazla terimleri kaldırın.":
    "Inserisci al massimo {count} termini; rimuovi quelli in eccesso.",
  "Etkin sıra grubu: {band}": "Gruppo di posizioni attivo: {band}",
  "Belirgin gerileyenler": "Cali significativi",
  "Sıra özeti okunamadı; kayıtlı liste kullanılabilir":
    "Impossibile leggere il riepilogo delle posizioni; l’elenco salvato è disponibile",
  "Sıra grubu uygulanamadı; sıra arşivi okunamadı. Yeniden deneyin veya grubu temizleyin.":
    "Impossibile applicare il gruppo di posizioni: l’archivio delle posizioni non è leggibile. Riprova o rimuovi il gruppo.",
  "Sıra 1–3": "Posizioni 1–3",
  "Sıra 4–10": "Posizioni 4–10",
  "Sıra 11–20": "Posizioni 11–20",
  "Sıra 21+": "Posizioni 21+",
  "Gözlenen kelimeler": "Parole chiave osservate",
  "{shown} / {total} kayıtlı kelime; seçim yalnızca bu sayfada":
    "{shown} / {total} parole chiave salvate; la selezione vale solo per questa pagina",
  "Kayıtlı kelimelerin arşiv özeti":
    "Riepilogo dell’archivio delle parole chiave salvate",
  "Kelimeler kayıtlı; sıra karşılaştırması şu anda kullanılamıyor.":
    "Le parole chiave sono salvate; il confronto delle posizioni al momento non è disponibile.",
  "Kaydettiğiniz {saved} kelimenin {observed} tanesi bu aralıkta arşivde gözlendi.":
    "Delle {saved} parole chiave salvate, {observed} sono state osservate nell’archivio in questo intervallo.",
  "Google Web · tüm ülkeler ve cihazlar · {zone}":
    "Google Web · tutti i paesi e dispositivi · {zone}",
  "Eşleşen kelimelerde gözlenen gün: {observed} / {requested}":
    "Giorni osservati per le parole chiave corrispondenti: {observed} / {requested}",
  "Son doğrulanmış yanıt gösteriliyor; liste yenilenirken işlem yapmayın.":
    "È mostrata l’ultima risposta verificata; non eseguire operazioni durante l’aggiornamento dell’elenco.",
  "Sıralamalar'da arşivi güncelle":
    "Aggiorna l’archivio in Monitoraggio del posizionamento",
  "Gerileyenleri incele": "Esamina i cali",
  "Metin ve etiket filtresine uyan kayıtlar":
    "Record che corrispondono ai filtri di testo ed etichette",
  "{count} kayıtlı kelime içinde": "Tra {count} parole chiave salvate",
  "Belirgin hareket ≥{value} sıra":
    "Movimento significativo ≥{value} posizioni",
  "↑ {up} · ↓ {down}": "↑ {up} · ↓ {down}",
  "Karşılaştırılabilen: {comparable} / {total}":
    "Confrontabili: {comparable} / {total}",
  "Önceki dönem okunamadı; karşılaştırma için yeniden deneyin.":
    "Impossibile leggere il periodo precedente; riprova per effettuare il confronto.",
  "Belirgin değişmedi: {stable}; önceki gözlem yok: {previous}; güncel gözlem yok: {current}.":
    "Nessuna variazione significativa: {stable}; nessuna osservazione precedente: {previous}; nessuna osservazione attuale: {current}.",
  "Sıra gruplarının tabanı: {count} kayıtlı kelime (sıra grubu uygulanmadan önce).":
    "Base dei gruppi di posizioni: {count} parole chiave salvate (prima di applicare il gruppo).",
  "Sıra grupları; metin ve etiket filtresi sonrası tüm kayıtlar":
    "Gruppi di posizioni; tutti i record dopo i filtri di testo ed etichette",
  "Veri kapsamı ve hesaplama": "Copertura dei dati e calcolo",
  "Son arşiv aktarımı: {date}": "Ultima importazione nell’archivio: {date}",
  "Tam yanıt: {complete}; sınırlı: {limited}; başarısız: {failed}; doğrulanmamış gün: {unknown}.":
    "Risposte complete: {complete}; limitate: {limited}; non riuscite: {failed}; giorni non verificati: {unknown}.",
  "Önceki dönemde tam yanıt: {complete} / {days}; eşleşen gözlem günü: {observed}.":
    "Risposte complete nel periodo precedente: {complete} / {days}; giorni con osservazioni corrispondenti: {observed}.",
  "Listeyi yenile yalnızca yerel veritabanını okur; Google'dan yeni veri almaz. Tarihler Pasifik takviminde üç günlük gecikme varsayımıyla seçilir; bu, tam arşiv kanıtı değildir.":
    "Aggiorna elenco legge solo il database locale; non recupera nuovi dati da Google. Le date seguono il calendario del Pacifico con un ritardo presunto di tre giorni; questo non dimostra che l’archivio sia completo.",
  "Arşiv aktarım durumu okunamadı. Son aktarım bilgisi için yeniden deneyin.":
    "Impossibile leggere lo stato dell’importazione nell’archivio. Riprova per conoscere l’ultima importazione.",
  "Search Console bağlantısı okunamadı. Bağlantıyı denetleyin veya yeniden deneyin.":
    "Impossibile leggere la connessione a Search Console. Controlla la connessione o riprova.",
  "Kelimeleriniz kayıtlı. Güncel sıra verisi için Search Console bağlantısı gerekiyor.":
    "Le parole chiave sono salvate. Per dati aggiornati sulle posizioni è necessaria la connessione a Search Console.",
  "Search Console bağlı; bu aralık henüz arşive alınmadı. Sıralamalar'dan arşivi güncelleyin.":
    "Search Console è collegato; questo intervallo non è ancora archiviato. Aggiorna l’archivio da Monitoraggio del posizionamento.",
  "Son arşiv aktarımı tamamlanamadı. Sıralamalar ekranında hatayı inceleyip yeniden deneyin.":
    "L’ultima importazione nell’archivio non è stata completata. Esamina l’errore in Monitoraggio del posizionamento e riprova.",
  "Arşiv bu tarihlerin tümünü doğrulamıyor. Eksik veya sınırlı günler için Sıralamalar'dan arşivi güncelleyin.":
    "L’archivio non conferma tutte queste date. Aggiornalo da Monitoraggio del posizionamento per i giorni mancanti o limitati.",
  "Arşiv seçilen dönemin sonuna ulaşmadı. Sıralamalar'dan arşivi güncelleyin.":
    "L’archivio non ha raggiunto la fine del periodo selezionato. Aggiornalo da Monitoraggio del posizionamento.",
  "Bu tarihlerde okunan arşivde eşleşen sorgu yok. Bu, Google'da görünmediğiniz anlamına gelmez.":
    "Nessuna query corrispondente nell’archivio letto per queste date. Questo non significa che tu non compaia su Google.",
  "Sıralar, kaydedilen nihai Google yanıtlarından hesaplanan ortalamalardır; bugünkü sabit sıranız değildir.":
    "Le posizioni sono medie calcolate dalle risposte definitive di Google salvate; non rappresentano la tua posizione fissa di oggi.",
  "Bağlantı okunamadı; yeniden dene":
    "Impossibile leggere la connessione; riprova",
  "Seçilen etiketlerden herhangi biri; sayılar tüm kayıtlı kelimelerdeki etiket atamalarıdır.":
    "Una qualsiasi delle etichette selezionate; i numeri indicano le assegnazioni delle etichette in tutte le parole chiave salvate.",
  "En fazla {count} etiket seçin.": "Seleziona al massimo {count} etichette.",
  "Liste veya arşiv değişti. Listeyi yenileyip aktarımı yeniden başlatın.":
    "L’elenco o l’archivio sono cambiati. Aggiorna l’elenco e riavvia l’esportazione.",
  "Google kimlikleri bu kurulumdaki tüm projelerde kullanılır. Hizmet hesabı kayıtlıysa önceliklidir. Projenizin mülkünü Proje ayarları → Bağlantılar bölümünden seçin.":
    "Le credenziali Google sono usate da tutti i progetti di questa installazione. Se è salvato un account di servizio, ha la precedenza. Seleziona la proprietà del progetto in Impostazioni progetto → Connessioni.",
  "Kullanılan kimlik okunamadı. Google kimlik durumunu yeniden yükleyin.":
    "Impossibile leggere le credenziali in uso. Ricarica lo stato delle credenziali Google.",
  "Kimlik kayıt tarihi: {date}":
    "Data di salvataggio delle credenziali: {date}",
  "Google kurulum adımları": "Passaggi di configurazione Google",
  "{service} yönlendirme adresini kopyala":
    "Copia l’indirizzo di reindirizzamento di {service}",
};
