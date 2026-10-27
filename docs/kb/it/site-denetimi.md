---
title: Controllo del sito
description: L'app visita il sito pagina per pagina, lo controlla con 202 regole e ordina i problemi per gravità. Il punteggio dice anche quanto è stato possibile misurare. Una verifica interrotta non ha punteggio.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-27
---

Qui si trovano i problemi del sito e si vede come correggerli.

L'app visita il sito con il proprio crawler (il programma che apre e legge le pagine una per una). Cerca collegamenti rotti, titoli mancanti e pagine lente. Alla fine si ottiene un punteggio e un elenco di problemi ordinati per gravità, ciascuno con le istruzioni per correggerlo. Il punteggio mostra anche quanti controlli è stato possibile misurare. Una verifica interrotta a metà non riceve punteggio.

## Cosa c'è nella schermata

**Scheda per avviare un nuovo audit.** Ha questi campi.

- **Il campo dell'indirizzo del sito**: il dominio del progetto è già compilato.
- **Scansione fino a N pagine**: minimo 10, massimo 10.000, predefinito 50. Se si scrive un numero superiore a 500, l'app chiede conferma.
- **Misura anche la velocità della pagina**: è disattivata per impostazione predefinita. Se la si attiva, ogni pagina viene misurata su telefono e su computer. La misurazione è eseguita da Google Lighthouse (lo strumento di Google che misura le pagine). La scheda indica in anticipo il tempo minimo che ci vorrà.
- **Controlla anche i link in uscita e le dimensioni delle immagini**: dopo la scansione controlla se i link verso altri siti si aprono e quanto pesano i file delle immagini. Si interrogano al massimo 300 indirizzi. I siti che bloccano i bot vengono saltati.

Senza la chiave PageSpeed (il codice gratuito che Google dà per la misurazione della velocità), la misurazione è limitata a 50 pagine. Per misurarle tutte, aggiungere una chiave gratuita in **Impostazioni**. **Avvia controllo** avvia la verifica. La sezione **Quote** sotto è chiusa. Aprendola si vede lo stato attuale delle quote PageSpeed e dell'ispezione URL.

**Controlli precedenti.** Di ogni verifica sono elencati data, indirizzo, stato, numero di pagine e numero di problemi. Il numero di problemi è riferito a ogni cento pagine, il totale è tra parentesi. Così si possono confrontare verifiche da 50 e da 500 pagine. Se nel progetto sono stati controllati più siti, sopra l'elenco compare un selettore del sito. Il grafico e le frecce di variazione confrontano sempre verifiche dello stesso sito. Con più siti selezionati il grafico è nascosto. **Visualizza** su una riga apre la verifica. Il menu della riga ha **Esegui di nuovo con le stesse impostazioni** e **Elimina controllo**. Eliminare cancella anche le pagine, i problemi e le misurazioni di velocità della verifica e non si può annullare.

**Dettaglio della verifica.** In alto, **Scarica report** scarica un rapporto HTML in un solo file e lo salva in **Report**. Sotto compaiono, se serve, avvisi gialli (vedi più avanti). Poi viene la scheda del punteggio.

**Scheda del punteggio.** Mostra queste cose.

- Al centro, il **Punteggio del sito** e accanto una parola di giudizio: **Eccellente**, **Buono**, **Medio** o **Scarso**.
- Sotto, la riga di copertura: "Punteggio basato sui 142 controlli misurati. 38 controlli non sono stati misurati." Il punto interrogativo accanto spiega come si calcola il punteggio.
- Una frase di giudizio. Se il punteggio è trattenuto da un limite, ne dice il motivo.
- **Indirizzi trovati: N, scansionati: M**. Quanti indirizzi la scansione ha trovato nel sito e quanti ne ha aperti. Se la verifica si è fermata al limite di pagine scelto, una nota dice "La verifica era limitata a N pagine; il sito può averne di più." In questo caso il punteggio resta valido.
- Righe per le categorie pesanti che non è stato possibile misurare. Per esempio "Velocità non misurata: la quota PageSpeed era esaurita".
- Quattro contatori: **Problemi critici**, **Miglioramenti** (avvisi e informative), **Verifiche superate** e **Non misurato**.
- **Punteggi per categoria**: Scansione in corso, Contenuto, Indicizzazione, Velocità, Sicurezza, Accessibilità, Social e dati strutturati. La più bassa è in alto. Un clic su una categoria apre la scheda **Controlli** su quella categoria. Una categoria in cui non si è potuto misurare nulla dice "Non misurato". Una misurata in parte dice "Dati parziali".
- **Cronologia del punteggio**: i punteggi delle ultime verifiche dello stesso sito. Compare quando due verifiche hanno un punteggio. Le barre grigie sono punteggi provvisori. Le verifiche senza punteggio non sono nel grafico e una riga sotto dice quante sono.

**Schede.**

- **Da fare (N)**: i lavori, a partire da quello che dà più punti. Ogni lavoro mostra i punti che si guadagnano, un'etichetta "Attività piccola", "Attività media" o "Attività grande" e un riquadro **Come risolverlo**. Se Search Console è collegato, l'ordine tiene conto anche dei clic delle pagine interessate.
- **Verifiche (N)**: tutti i controlli, per categoria. Ognuno compare come superato, fallito o non misurato. Per quelli non misurati è scritto il motivo.
- **Dati immediati**: il sito al di là delle sue pagine. Per esempio il certificato, la registrazione del dominio, il DNS e un'anteprima del sito.
- **Pagine con problemi (N)**: raggruppa i problemi. Aprendo una scheda si vedono la causa, gli indirizzi interessati e il riquadro **Come risolverlo**. Si può cercare negli indirizzi.
- **Pagine (N)**: ogni pagina scansionata. Filtri rapidi: **Indicizzazione bloccata**, **Lento** (oltre 1 secondo), **Testo alternativo mancante**, **Non nella sitemap**.
- **Stato dell'indicizzazione**: la risposta di Google per ogni pagina. È descritta in una guida a parte. Se il sito controllato non appartiene alla proprietà Search Console del progetto, questa scheda non mostra dati di Google e la schermata ne spiega il motivo.
- **Velocità (N)**: compare solo se la misurazione della velocità era attiva. Se alcune pagine non sono state misurate, il numero è scritto come "10/12".

Il menu **Esporta** in alto a destra dà l'elenco della scheda aperta come **Esporta in Fogli Google**, **CSV** o **JSON**. Se un filtro è attivo, partono solo le righe visibili.

## I tre stati del punteggio

**Punteggio completo.** Quando la maggior parte dei controlli è stata misurata, arriva con una parola di giudizio. Il punteggio si legge così: da 90 Eccellente, da 70 Buono, da 50 Media, sotto Scarso.

**Punteggio provvisorio.** Se la quota di controlli misurati scende sotto il 70 per cento, il punteggio è provvisorio. Lo è anche se in Scansione in corso, Indicizzazione, Contenuto o Velocità è stata misurata meno della metà dei controlli. La scheda scrive "Punteggio provvisorio, copertura delle misure 62%", non dà parole di giudizio ed è di colore neutro. Il numero riguarda solo i controlli che si sono potuti vedere. Sul resto non è stato dato alcun giudizio, né buono né cattivo. I motivi di solito sono questi: la quota PageSpeed era esaurita, manca la chiave PageSpeed, la misurazione della velocità era disattivata o da Search Console non si sono potuti ottenere i dati dell'indice.

**Nessun punteggio.** In questi casi la scheda scrive "Verifica incompleta, nessun punteggio" al posto del punteggio.

- La verifica si è interrotta per un errore.
- La verifica è ancora in esecuzione.
- La scansione si è interrotta presto a causa del limite di velocità del sito. L'elenco dei problemi è incompleto, un punteggio sarebbe solo una supposizione.
- Non è stato possibile scansionare nessuna pagina. In questo caso la scheda del punteggio non compare affatto.

I risultati vengono comunque mostrati e valgono per le pagine scansionate. Per un punteggio completo, eseguire di nuovo la verifica.

## Se la verifica si è interrotta, cosa c'è scritto

Quando una verifica fallisce, la schermata dice tre cose: che cosa è successo, se il difetto è del sito o dell'app, e che cosa fare. Il titolo indica la fase in cui si è interrotta: **individuazione degli URL**, **scansione**, **misurazione della velocità** o **preparazione dei risultati**.

| Cosa dice la schermata                                                                                            | Da che parte          | Cosa fare                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------ |
| Un passaggio non è terminato in tempo                                                                             | Probabilmente il sito | Riprovare tra qualche minuto. Se si ripete, avviare con meno pagine                              |
| La verifica non è rientrata nella memoria che l'app può usare                                                     | L'app                 | Riavviare con meno pagine                                                                        |
| La verifica ha superato il tempo di elaborazione consentito                                                       | L'app                 | Riavviare con meno pagine                                                                        |
| Errore durante la scrittura dei risultati nel database                                                            | L'app                 | Controllare che il disco abbia spazio, riavviare l'app e poi la verifica                         |
| Il risultato di un passaggio superava le dimensioni che l'app può salvare                                         | L'app                 | Riavviare con meno pagine                                                                        |
| Il motore interno delle verifiche dell'app ha segnalato un errore                                                 | L'app                 | Scegliere **Yeniden başlat** (Riavvia) nel menu dell'area di notifica, poi riavviare la verifica |
| La verifica è stata interrotta                                                                                    | L'app                 | Lasciare l'app aperta e riavviare la verifica                                                    |
| La chiave di installazione non è arrivata alla parte che esegue le verifiche (le chiavi non sono state eliminate) | L'app                 | Aggiornare o riavviare l'app, poi riavviare la verifica                                          |
| La verifica si è interrotta per un errore imprevisto                                                              | Non stabilito         | Riavviare. Se continua, scaricare il pacchetto diagnostico da **Aiuto**                          |

Il testo grezzo dell'errore non arriva sulla schermata. Resta nel pacchetto diagnostico.

## Avvisi gialli durante la scansione

- **Il controllo non è riuscito a scansionare completamente il sito.** La protezione anti-bot del sito ha fermato il crawler. I risultati vengono comunque mostrati. Consentire "seotracker-audit" nel firewall oppure provare uno dei crawler desktop che la guida suggerisce.
- **N pagine non sono state recuperate (errore di rete).** La connessione non si è stabilita neanche al nuovo tentativo. Queste pagine non sono state controllate e non sono contate come rotte. Spesso è temporaneo. Eseguire di nuovo la verifica. Se continua, controllare che il sito si apra da questo computer.
- **Il sito ha limitato la velocità su N pagine.** Il sito ha risposto "troppe richieste". Quelle pagine non si sono potute controllare. Riavviare dopo che il limite si è azzerato.
- **La scansione si è interrotta in anticipo a causa del limite di richieste del sito.** L'attesa richiesta superava la durata consentita alla verifica. Il rapporto è incompleto e non ha punteggio.
- **La chiave PageSpeed salvata non è stata letta; la misurazione della velocità è stata fatta senza chiave.** La verifica è terminata, ma la misurazione della velocità è stata fatta senza chiave. I risultati della scansione non ne risentono. La misurazione della velocità è rimasta limitata alle prime pagine. Aggiornare o riavviare l'app, poi avviare una nuova verifica. Se continua, salvare di nuovo la chiave PageSpeed in **Impostazioni**.

## Come usarlo

1. Alla prima verifica lasciare il numero di pagine a 50. Tenere disattivata la misurazione della velocità. Finisce in uno o due minuti. Con la misurazione della velocità disattivata il punteggio può risultare provvisorio. È normale.
2. Leggere la riga di copertura sulla scheda del punteggio. Se c'è scritto **Punteggio provvisorio**, le righe sotto dicono il motivo.
3. Nella scheda **Da fare** partire dai primi tre lavori. Danno più punti con meno fatica.
4. Nella scheda **Pagine con problemi** finire prima i problemi critici. Un problema critico impedisce a Google di vedere la pagina.
5. Prendere l'elenco con **Esporta** e consegnarlo a chi gestisce il sito. Il riquadro **Come risolverlo** si può passare così com'è.
6. Dopo la correzione, fare clic su **Esegui di nuovo con le stesse impostazioni**. Le frecce nell'elenco **Controlli precedenti** e la **Cronologia del punteggio** mostrano che cosa è stato corretto.
7. Attivare la misurazione della velocità una volta a settimana, per le pagine importanti. Ogni pagina richiede circa dieci secondi e consuma quota di Google.

## Come si calcolano i numeri

**Punteggio.** Ogni risultato toglie punti alla propria categoria. Quanti dipende dall'importanza del risultato e dalla quota di pagine coinvolte. I pesi sono: critico 40, avviso 15, informativa 3. Il punteggio del sito è la media ponderata di sette categorie. Scansione e Indicizzazione pesano di più, Social e dati strutturati di meno. Un controllo che non si è potuto misurare non alza né abbassa il punteggio. Per questo la copertura è mostrata a parte.

**Limiti massimi.** Se c'è anche un solo problema, il punteggio è al massimo 99. Se c'è un problema critico, al massimo 69. Con 5 avvisi o più, al massimo 89. Così una singola pagina bloccata all'indicizzazione su un sito grande non si nasconde sotto un punteggio alto. Se un limite trattiene il punteggio, la scheda lo scrive. Anche il "+N punti" accanto a un lavoro tiene conto del limite. Correggere l'unico problema critico toglie tutto il limite. Correggere un avviso mentre un limite è attivo dà pochissimo.

**Scansione.** L'app non affatica il sito. Invia al massimo due richieste alla volta. Se il sito risponde "troppe richieste" (429), aspetta. Se l'attesa totale supera i 30 minuti, la scansione si ferma e la verifica resta senza punteggio.

**Misurazione della velocità.** Su un sito da 212 pagine, l'intera verifica è durata 35 minuti. Circa 24 erano di misurazione della velocità. Se la quota giornaliera si esaurisce, la misurazione si ferma, i risultati ottenuti restano e il punteggio può essere provvisorio. In questi casi viene scritto un problema:

- Il contenuto principale compare dopo più di 4 secondi (LCP).
- Il contenuto si sposta più di 0,25 (CLS).
- La risposta a un clic impiega più di 500 millisecondi (INP).
- Il punteggio SEO di Lighthouse è sotto 90.

## Domande frequenti

**La verifica mostra ciò che vede Google?** No. Il crawler dell'app legge la pagina da sé. La risposta di Google è nella scheda **Stato dell'indicizzazione**.

**Il punteggio è 98, perché non 100?** Anche un solo problema tiene il punteggio a 99 o meno.

**Perché il punteggio è fermo a 69?** C'è un problema critico. Finché non lo si corregge, il punteggio non può superare 69. La scheda lo scrive.

**Perché c'è scritto "Punteggio provvisorio"?** Una parte importante dei controlli non è stata misurata. La riga di copertura e quelle sotto ne dicono il motivo. Attivare la misurazione della velocità o collegare Search Console di solito aumenta la copertura.

**Perché c'è scritto "Verifica incompleta" al posto del punteggio?** La verifica si è fermata a metà o troppo presto. L'elenco dei problemi è incompleto, quindi non c'è punteggio. Esegui di nuovo la verifica.

**Cosa significa l'avviso "bloccato"?** La protezione anti-bot del sito ha fermato il crawler. Consentire "seotracker-audit" nel firewall.

**La misurazione della velocità si è fermata a metà.** Di solito manca la chiave PageSpeed o la quota giornaliera è esaurita. La scheda delle quote in **Impostazioni** ne dice il motivo.

**Quante verifiche girano insieme?** Al massimo tre. Due verifiche che misurano la velocità si rallentano a vicenda.

## Limiti

Il crawler può non vedere il contenuto che JavaScript (il codice che gira nella pagina) aggiunge dopo. Una verifica scansiona al massimo 10.000 pagine. La misurazione della velocità è la misura di laboratorio di Google, non dati di visitatori reali. La verifica non cambia nulla nel sito. Le correzioni le fa chi gestisce il sito o il suo assistente.

<!-- Fonti: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; AuditSiteFilter.tsx; ProgressCard.tsx; src/client/features/audit/results/ResultsView.tsx; ResultsHeader.tsx; ScoreOverview.tsx; ScoreGauge.tsx; WithheldScore.tsx; scoreWords.ts; auditFailureCopy.ts; ChecksView.tsx; TodoView.tsx; IssuesView.tsx; QuickFilters.tsx; ForeignPropertyNotice.tsx; DownloadReportButton.tsx; src/routes/_project/p/$projectId/audit/index.tsx; src/shared/auditStanding.ts; src/shared/auditScore.ts; src/shared/auditCategory.ts; src/shared/audit-limits.ts; src/server/lib/audit/crawl-throttle.ts -->
