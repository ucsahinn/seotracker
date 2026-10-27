---
title: Rendimento della ricerca
description: Si vede quante volte si compare su Google, quanti clic si ottengono e cosa correggere per primo. I numeri arrivano da Search Console. I guadagni sono un limite superiore.
screen: Arama performansı
route: /p/<proje>/search-performance
updated: 2026-10-27
---

Qui si vede quante volte si compare su Google, quanti clic si ottengono e cosa correggere per primo.

Clic, impressioni, CTR e posizione arrivano direttamente da Search Console. L'app non ne stima nessuno. Le stime ci sono solo nelle cifre del "guadagno possibile", e sono sempre segnate come "limite superiore".

I filtri scelti vengono scritti nella barra degli indirizzi. Volendo, si condivide quella vista come link o la si aggiunge ai preferiti.

## Tre termini

**Giorno definitivo.** Search Console continua a contare un giorno per diversi giorni. Totali e confronti usano solo i giorni il cui conteggio è finito. I giorni seguono l'ora del Pacifico che usa Google. I giorni ancora in conteggio compaiono tratteggiati nel grafico e non entrano nei totali.

**Query nascosta.** Google non elenca le query cercate molto raramente, per privacy. Ma ne somma i clic al totale del sito. Per questo la tabella delle query dà meno del totale del sito. La differenza sono le query nascoste.

**Limite superiore.** Una cifra di guadagno significa "al massimo tanto". Sono i clic in più che una ricerca otterrebbe salendo di un gradino, con i tassi di clic del sito stesso. Il risultato reale dipende dai concorrenti e da Google e di solito è più piccolo.

## Cosa c'è nella schermata

**Barra in alto.** In alto a destra ci sono quattro cose.

- **Aggiorna**: chiede dati freschi a Search Console. Di norma l'app riusa una risposta di qualche minuto prima.
- **Scarica report**: trasforma la vista mostrata in un report stampabile in un solo file, lo salva e lo scarica. Il report sta anche nella schermata **Report**.
- Il menu di esportazione: **Query (CSV)**, **Pagine (CSV)**, **Query vicine ai primi tre (CSV)**, **Esporta le query in Fogli**, **Esporta le pagine in Fogli**. Le esportazioni seguono i filtri della schermata. Se nella scheda Query o Pagine c'è una ricerca o un filtro rapido, finisce anche nel file.

**Filtri.** Una barra di una riga riassume i filtri scelti: "(Web, Tutti i dispositivi, Tutti i paesi, Ultimi 28 giorni, Con il periodo precedente)". Aprendola si vedono: **Tipo di ricerca** (Web, Immagine, Video, Notizie), **Filtro dispositivo** (Tutti i dispositivi, Mobili, Desktop, Tablet), **Filtro paese** (i paesi che Google segnala per quel periodo), **Intervallo di date** (Ultimi 7 giorni, Ultimi 28 giorni, Ultimi 3 mesi) e **Confronto** (Con il periodo precedente, Con l'anno scorso, Nessun confronto).

**Stato dei dati.** Una striscia che dice su cosa poggiano i numeri. Per esempio "I dati sono definitivi fino al 24 ott.; gli ultimi 3 giorni sono ancora in conteggio (tratteggiati nel grafico)." La stessa striscia dice con quali giorni si fa il confronto e il nome della proprietà Search Console. Un clic sul nome porta alle impostazioni di collegamento del progetto. Se è scelto il confronto con l'anno scorso e Google non fornisce più quei giorni, la striscia lo dice (Google arriva al massimo a 16 mesi). In **Informazioni sui dati** si vedono: la data dei giorni definitivi, quanti giorni sono ancora in conteggio e la data degli ultimi dati, la quota di clic da query nascoste, se le tabelle sono state lette per intero (Google restituisce un numero limitato di righe alla volta) e se questa vista ha inviato nuove richieste a Google o ha usato una risposta presa qualche minuto prima.

**Frase di riepilogo.** Una o due frasi sopra i riquadri dicono cosa è successo. Per esempio "Negli ultimi 28 giorni i clic sono aumentati del 6,1% rispetto al periodo precedente. Il CTR è sceso di 0,3 punti." Poi dice quanti clic in più potrebbero portare insieme i primi tre lavori, con la dicitura "(limite superiore)". Il collegamento **Da fare** porta a quella scheda.

**Quattro riquadri.** **Clic**, **Impressioni**, **CTR** (che percentuale delle impressioni è stata cliccata) e **Posizione media**. Tutti sono totali dei giorni definitivi. Ogni riquadro mostra la variazione rispetto al confronto scelto e una piccola linea. La variazione di clic e impressioni è scritta in percentuale, quella del CTR in punti, quella della posizione in posti. Per la posizione media un numero piccolo è buono, 1 è il primo posto. La direzione di una variazione è indicata anche da una freccia, oltre che dal colore.

**Grafico Nel tempo.** Disegna i valori giornalieri.

- Il selettore in alto a destra permette di passare da una misura all'altra: clic, impressioni, CTR, posizione media. Nel grafico della posizione, in alto c'è la posizione migliore.
- I pulsanti **Giorno**, **Settimana** e **Mese** cambiano l'unità di tempo. La linea di confronto (tratteggiata) compare solo nella vista per giorno.
- L'area tratteggiata sono i giorni che Google sta ancora contando. Un punto vuoto indica un periodo incompleto o non ancora definitivo.
- Indicatori numerati sopra la linea mostrano tre cose: gli aggiornamenti di posizionamento annunciati da Google ("Aggiornamento Google"), i giorni in cui sono finite le verifiche del sito ("Controllo del sito completato") e le note personali. Sotto il grafico ogni numero è spiegato.
- **Aggiungi una nota** lascia una nota personale a una data, per esempio "Nuovi titoli delle pagine pubblicati". Una nota è di al massimo 280 caratteri. Aiuta a ricordare più tardi il motivo di un calo o di un aumento. Le note fuori dal periodo scelto sono raccolte sotto "Note fuori da questo periodo (N)".

**Striscia Inizia da queste.** Tra il grafico e le schede stanno affiancati i primi tre lavori. Ognuno ha titolo, guadagno possibile e un pulsante. **Tutte le attività (N)** porta alla scheda Da fare.

**Schede.** Sono sette: **Da fare (N)**, **Query (N)**, **Pagine (N)**, **Opportunità di posizionamento (N)**, **Variazioni**, **Sovrapposizioni** e **Distribuzione**. Il numero tra parentesi è il numero di righe o risultati nella scheda. Se ci sono query o pagine in calo, la scheda dice "Variazioni (N in calo)". Cambiando scheda, la casella di ricerca e il filtro rapido si azzerano.

### Da fare

L'app ordina per guadagno stimato i lavori che trova nei dati di Search Console. I lavori sono raggruppati per tipo, e il titolo di ogni gruppo dice quanti sono:

- "N query vicine alle prime tre": ricerche con posizione media tra 4 e 20 e impressioni sufficienti. Le ricerche di brand non entrano in questo elenco. Rafforzare la pagina per quella ricerca.
- "N risultati ricevono pochi clic per la loro posizione": ricerche cliccate meno delle altre ricerche del sito nella stessa posizione. Riscrivere titolo e descrizione.
- "I clic sono calati per N query" e "I clic sono calati per N pagine": un calo netto rispetto al periodo precedente. Se è scesa anche la posizione, aggiornare il contenuto. Se la posizione regge, rivedere titolo e descrizione.
- "N pagine stanno perdendo forza": pagine che nell'ultimo trimestre sono scese molto sotto il migliore dei quattro trimestri precedenti. Rinfrescare la pagina.
- "N pagine sono viste ma mai cliccate". Qui la stima del guadagno è prudente: usa il CTR della fascia di posizioni sotto quella della pagina, non quello della sua fascia. Per le pagine dalla seconda pagina in poi non c'è stima.
- "Non comparite più per N query": ricerche che nel periodo precedente avevano clic e ora nessuna impressione.
- "Siete indietro su N tipi di dispositivo" e "Siete indietro in N paesi".
- "Cali insoliti in N giorni": i clic o le impressioni di quel giorno erano insolitamente bassi rispetto allo stesso giorno della settimana nelle settimane precedenti.
- "Imposta il nome del tuo brand": compare quando non è impostato alcun nome del brand, per separare le ricerche di brand. Se l'app le separa con nomi suggeriti dal dominio, l'attività si chiama invece "Conferma il nome del brand". Confermare i suggerimenti se sono giusti, altrimenti inserire il nome del brand.

Sotto il titolo di ogni gruppo, **Perché, e cosa fare** dà il motivo e cosa fare. Una riga mostra il numero d'ordine, il risultato, la prova (per esempio "Posizione 8,2 · 640 impressioni · 12 clic"), il guadagno possibile scritto "≈ +N clic" e un'etichetta di affidabilità (**Affidabilità: alta**, media o bassa). Di ogni gruppo sono visibili i primi quattro lavori, il resto si apre con **Mostra tutto (N)**.

Un lavoro si segna con **Fatto**. I lavori segnati vanno sotto "Segnate come fatte (N)" e tornano con **Ripristina**. I segni "fatto" restano solo in questo browser. **Dettagli** (o **Apri questa ripartizione**) su una riga apre il dettaglio di quella ricerca, pagina, dispositivo o paese. Se ci sono più lavori per la stessa ricerca o pagina, il totale in alto la conta una sola volta.

### Query e Pagine

Una tabella per ricerche o per pagine. Le colonne sono **Query** (o **Pagina**), **Clic**, **Differenza di clic** (rispetto al confronto), **Impressioni**, **CTR** e **Posizione**. Un clic sull'intestazione ordina. La barra dietro una riga è la sua quota dei clic di questa tabella. La casella in alto cerca tra le righe. Accanto c'è scritto "{mostrate} / {totale} righe".

**Filtri rapidi.** Per le query: **Tra i primi 10**, **Posizione 4-10**, **Posizione 11-20**, **CTR basso**, **Nessun clic**. Per le pagine: **Tra i primi 10**, **Con clic**, **CTR basso**, **Nessun clic**. CTR basso significa una riga in prima pagina con almeno 100 impressioni e un tasso di clic sotto il 2 per cento.

**Menu della riga.** Nei tre puntini: **Apri la pagina in una nuova scheda**, **Copia URL**, **Copia parola chiave**, **Salva come parola chiave**. Ciò che si salva va nella schermata delle parole chiave salvate. Un clic su una riga apre il pannello di dettaglio.

La nota sotto la tabella dice la base: "lette N query, N clic. Il totale del sito è di N clic; la differenza viene dalle query che Google nasconde." Se è stato raggiunto il limite di righe di Google, l'estremità meno cliccata manca nell'elenco e la nota lo dice.

### Opportunità di posizionamento

Ci sono quattro sezioni.

- **Query vicine ai primi tre.** Ricerche con posizione media tra 4 e 20. Le ricerche di brand non sono incluse. È scritto quanti clic in più potrebbero portare insieme se ciascuna salisse di un gradino (da 6-10 a 4-5, da 4-5 a 2-3, da 11-20 alla prima pagina). È un limite superiore. Il totale comprende tutte le query di questa fascia, non solo le righe elencate, ed è seguito dalle date a cui si riferisce, per esempio "Periodo: 27 set 2026 – 24 ott 2026." Se sono elencati solo i guadagni maggiori, una nota sotto dice "Sono elencate le N con il guadagno maggiore." La tabella mostra **Query**, **Pagina di destinazione**, **Posizione**, **Impressioni**, **Clic** e **Guadagno possibile**. La pagina di destinazione è quella che Google mostra più spesso per quella ricerca. Le ricerche selezionate si prendono con **Copia parole chiave** o **Salva come parola chiave**.
- **Risultati cliccati meno di quanto la posizione farebbe pensare.** Ricerche il cui tasso di clic è sotto il 70 per cento del tasso del sito per i risultati nella stessa posizione. Il guadagno arriva senza cambiare posizione, solo riscrivendo titolo e descrizione. La tabella mostra il tasso della ricerca, il tasso **Atteso in questa posizione** e il guadagno possibile.
- **Pagine visibili ma mai cliccate.** Pagine che nel periodo hanno avuto almeno 100 impressioni (per 28 giorni) e nemmeno un clic.
- **CTR del tuo sito per posizione.** Il metro dei guadagni sopra. È il tasso di clic dei risultati del sito stesso in ogni posizione, non di altri siti. Se una posizione ha troppe poche ricerche o impressioni, c'è scritto "Dati insufficienti" e per quella non si fa alcuna stima. Se sono stati definiti i nomi del brand, questi tassi sono calcolati dalle ricerche non di brand.

### Variazioni

Confrontano il periodo scelto con il precedente.

- **Le variazioni maggiori rispetto al periodo precedente.** Due elenchi: **In calo (N)** e **In crescita (N)**. Perché una ricerca o una pagina entri in un elenco, i suoi clic devono muoversi di almeno 3 clic e del 20 per cento del valore precedente. I piccoli movimenti non entrano. Una riga mostra clic, impressioni e posizione prima e dopo.
- **Nuove** e **Perse (con i valori del periodo precedente).** Solo le ricerche che hanno avuto almeno 50 impressioni (per 28 giorni) in un solo periodo. Se la tabella di un periodo è incompleta per il limite di righe, non si può sapere quale ricerca è nuova o persa, e la schermata lo dice.
- **Pagine che perdono terreno.** Pagine i cui clic dell'ultimo trimestre (91 giorni) sono scesi sotto il 70 per cento del migliore dei quattro trimestri precedenti e che sono indietro anche rispetto allo stesso trimestre dell'anno scorso. Questo confronto richiede più di un anno di dati. Se Search Console non ha fornito dati così vecchi o c'è un filtro attivo, la schermata lo dice.
- **Lungo periodo: clic mensili.** Search Console arriva a 16 mesi. L'app conserva più a lungo i totali giornalieri su questo computer. Le barre mostrano i clic mensili. Una barra con il contorno tratteggiato è un mese che l'archivio non ha per intero. Se l'archivio si sta ancora riempiendo, la schermata dice "Ancora nessun giorno nell'archivio" o indica la data di inizio. Questa sezione segue il filtro dispositivo, non il filtro paese.

### Sovrapposizioni

Mostra i casi in cui più pagine del sito compaiono per la stessa ricerca. Le pagine possono dividersi i clic. Di solito basta farne una la pagina principale e collegare le altre a essa. Il titolo della scheda è "Più pagine per la stessa query".

- Tre riquadri: **Query con pagine in concorrenza**, **Impressioni andate alle altre pagine** e il riquadro della query che fa perdere di più. Un clic sull'ultimo riquadro restringe l'elenco a quella query.
- La tabella **Pagine in competizione per la stessa query** mostra, per ogni query, le sue pagine con clic, impressioni e posizioni. La pagina che Google mostra più spesso per quella query conta come "preferita". La quota di impressioni che va alle altre è scritta "fuori quota".
- Questa analisi guarda 28 giorni. Se è scelto 7 giorni, per l'analisi sale a 28 e viene scritto l'intervallo reale di date. Si esaminano solo le ricerche con almeno 100 impressioni. Perché una pagina entri nella competizione servono almeno 10 impressioni e il 20 per cento di quota su quella ricerca.
- Se la ricerca raggiunge il limite di righe di Search Console, la schermata avvisa che alcune query non si sono potute esaminare.

### Distribuzione

- **Distribuzione delle posizioni.** Mostra per gruppi in quali posizioni compaiono le ricerche. Se l'archivio contiene almeno due settimane, sotto compare **Query per settimana**. Questo grafico riguarda solo le ricerche Web. Se come tipo di ricerca è scelto Immagine, Video o Notizie, al suo posto compare "La distribuzione settimanale è solo per le ricerche Web." Questo grafico mostra la quota dei gruppi di posizione settimana per settimana. Viene dall'archivio delle query sul computer. Non si mostra con un filtro dispositivo o paese, perché l'archivio non conserva queste ripartizioni.
- **Ricerche di brand e non di brand.** Le ricerche che arrivano con il nome e quelle di chi non conosceva il sito sono misurate separatamente: **Ricerche di brand** e **Ricerche non di brand**. Per ciascuna sono scritti numero di query, clic, CTR e posizione media. Se non è definito alcun nome del brand, c'è scritto "Ricerche del brand non separate" e compare il pulsante **Aggiungi il nome del brand**. Se l'app ha suggerito nomi del brand dal dominio, c'è scritto "Non confermato." La misura è allora fatta con i nomi suggeriti. Fare clic su **Conferma i suggerimenti** o usare **Modifica i nomi del brand**. Le quote riguardano le query lette, le query nascoste non sono incluse.
- **Dispositivi** e **Paesi.** Un clic su un dispositivo o paese restringe tutta la schermata a quello.
- **Aspetto nella ricerca.** In quali formati speciali compaiono i risultati su Google (risultati avanzati, video e così via). Un risultato avanzato è un risultato che compare con informazioni in più, come un prodotto o un video. Google somma questa ripartizione per pagina. Se Google non ha segnalato alcun formato speciale, la schermata lo dice.
- **Ricerche a domanda.** Ricerche in forma di domanda e ricerche di quattro o più parole. Sono la fonte più chiara di idee per i contenuti.

**Nomi del brand.** I nomi del brand si inseriscono con **Modifica i nomi del brand**. Scrivere il nome del sito e il modo in cui la gente lo scrive, per esempio il nome e la sua forma breve. Le ricerche che contengono queste parole contano come ricerche di brand. Ci sono i pulsanti **Salva** e **Annulla**, e la riga **Suggerimenti:** aggiunge un nome con un clic. Definire i nomi del brand non cambia solo questa schermata, ma anche la stima del guadagno nella schermata **Opportunità**, perché quella stima lascia fuori le ricerche di brand.

**Pannello di dettaglio.** Un clic su una ricerca o una pagina (in una tabella, in Da fare, in Opportunità di posizionamento o in Variazioni) lo apre da destra. In alto ci sono l'intervallo di date e "giorni definitivi". Poi quattro numeri (Clic, Impressioni, CTR, Posizione media) e la loro variazione rispetto al confronto scelto. Sotto la linea **Clic giornalieri**. Per una pagina compare un elenco "Query di questa pagina (N)"; per una ricerca, "Pagine mostrate per questa query (N)". Ogni riga dà clic e posizione. Se per una pagina non è elencata nessuna ricerca, i suoi clic possono venire da query che Google nasconde. Le query possono sommare meno del totale della pagina, perché quelle nascoste non sono elencate. **Apri pagina** apre la pagina in una nuova scheda. **Salva come parola chiave** aggiunge la ricerca alle parole chiave salvate.

## Come si usa

1. Leggere prima la frase di riepilogo in alto. Dice se i clic salgono o scendono.
2. Guardare la striscia **Inizia da queste** o la scheda **Da fare**. I primi tre lavori sono quelli che rendono di più.
3. Se c'è un grosso calo, portare l'**Intervallo di date** su **Ultimi 3 mesi**. Trovare nel grafico il giorno in cui il calo è iniziato. Se in quel giorno cade un aggiornamento di Google o una modifica fatta dal sito, compare negli indicatori.
4. Nella scheda **Opportunità di posizionamento**, guardare le **Query vicine ai primi tre**. Aprire la pagina delle tre ricerche più mostrate. Adattare titolo e primo paragrafo a quella ricerca.
5. Nella scheda **Query**, premere il pulsante **CTR basso**. La posizione è buona ma nessuno clicca. Il problema sta quasi certamente in titolo e descrizione.
6. Nella scheda **Variazioni**, guardare **In calo**. Fare clic sulla ricerca in cima e leggere nel pannello di dettaglio il giorno in cui il calo è iniziato.
7. Se nella scheda **Sovrapposizioni** si vedono pagine in competizione per la stessa ricerca, decidere prima quale pagina deve rispondere. Poi orientare i link interni verso quella pagina.
8. Dopo una correzione, scrivere la sua data nel grafico con **Aggiungi una nota**. Due settimane dopo se ne vede l'effetto nel grafico.
9. Quando un lavoro è finito, dire **Fatto**. L'elenco si accorcia.
10. A fine mese, salvare la vista con **Scarica report**.

## Come si calcolano i numeri

Google fornisce i dati con tre giorni di ritardo. L'intervallo quindi non finisce oggi, ma tre giorni prima. Gli ultimi giorni possono ancora cambiare per qualche giorno. L'app non li include nei totali. Il periodo precedente è il periodo della stessa durata subito prima di questo intervallo. Per il confronto con l'anno scorso si prendono gli stessi giorni dell'anno scorso. La variazione di clic e impressioni si vede in percentuale, quella del CTR in punti.

I riquadri sono i veri totali del sito. Le tabelle contano separatamente ogni pagina che compare per la stessa ricerca. Sommando la tabella delle pagine si ottiene un numero più grande del riquadro. Non è un errore. Sommando la tabella delle query si ottiene un numero più piccolo del riquadro, perché le query nascoste non sono elencate.

Google dà al massimo 1.000 righe alla volta. Se il limite di righe è stato raggiunto, l'estremità meno cliccata manca nell'elenco e la schermata lo dice.

**Guadagno possibile.** L'app applica a ogni ricerca il tasso di clic proprio del sito. Prende il tasso un gradino sopra la posizione in cui si trova la ricerca, lo moltiplica per le impressioni della ricerca e sottrae i clic attuali. Le ricerche con pochissime impressioni non contano (almeno 50 impressioni per 28 giorni). Per i problemi di titolo, il metro è che la ricerca raggiunga il tasso del sito nella stessa posizione. Le ricerche di brand sono escluse. Per questo ogni guadagno è un limite superiore. Lo stesso calcolo vale nella schermata **Opportunità**.

**Etichetta di affidabilità.** L'etichetta accanto a ogni lavoro mostra quanto sono solidi i dati dietro il risultato: alta, media o bassa.

## Domande frequenti

**Perché gli ultimi tre giorni sono tratteggiati nel grafico?** Google li sta ancora contando. Non entrano nei totali. Diventano definitivi in qualche giorno.

**Il totale della tabella non corrisponde al riquadro.** È normale. Il riquadro è il totale del sito. La tabella delle query e quella delle pagine differiscono per le query nascoste e perché contano separatamente più pagine.

**La mia posizione è diversa quando cerco su Google.** La posizione qui è la media del periodo. Non rispecchia una singola ricerca.

**La query che cerco non è nell'elenco.** Google nasconde le query cercate molto raramente. Sui siti piccoli possono non esserci affatto righe di query.

**Perché un lavoro è sparito dall'elenco Da fare?** Se lo si è segnato come fatto, sta sotto "Segnate come fatte". I segni restano solo in questo browser. In un altro browser o su un altro computer lo si rivede.

**Se le pagine si sovrappongono, vanno unite?** Di solito no. Decidere prima quale pagina deve rispondere. Poi orientare i link interni verso quella pagina. Se le pagine rispondono davvero alla stessa domanda, unirle.

**Bisogna inserire un nome del brand?** No, ma senza, chi cerca il nome del sito falsa il calcolo del CTR e le opportunità risultano incomplete. La schermata lo ricorda con l'attività "Imposta il nome del tuo brand". Se l'app usa nomi suggeriti dal dominio, l'attività si chiama "Conferma il nome del brand".

## Limiti

I tipi di ricerca Discover e Google Notizie non sono inclusi. Non ci sono volume di ricerca né posizioni dei concorrenti. I dati di Google non risalgono oltre i 16 mesi. Per il più vecchio, guardare l'archivio su questo computer: il grafico di lungo periodo nella scheda **Variazioni** e la schermata **Monitoraggio del posizionamento** leggono da lì. I segni "fatto" e le note restano solo su questa installazione.

<!-- Fonti: src/routes/_project/p/$projectId/search-performance.tsx; src/client/features/search-performance/SearchPerformancePage.tsx; SearchPageParts.tsx; SearchFilters.tsx; DataTrustStrip.tsx; SearchVerdict.tsx; KpiTiles.tsx; SearchTrendChart.tsx; TrendParts.tsx; SearchNotes.tsx; LongTermTrend.tsx; TodoTab.tsx; DimensionTab.tsx; DimensionTableParts.tsx; OpportunitiesTab.tsx; StrikingTable.tsx; ChangesTab.tsx; CannibalizationSummary.tsx; CannibalizationTable.tsx; DistributionTab.tsx; PositionDistribution.tsx; DrilldownPanel.tsx; BrandTerms.tsx; SearchReportButton.tsx; src/shared/searchInsights.ts; src/shared/searchTodoCopy.ts; src/shared/searchQuickFilters.ts; src/shared/dataFreshness.ts; src/serverFunctions/searchPerformance.ts; src/server/features/gsc/cannibalization.ts -->

I collegamenti da Opportunità e Monitoraggio posizioni aprono i dettagli dell’URL o della query esatta nelle date originali. I totali generali restano relativi alla proprietà; i valori dell’elemento scelto sono nel pannello dei dettagli. I periodi non leggibili non vengono sostituiti in silenzio. Scegliere un periodo predefinito rimuove le date fissate. Il rapporto invia al server le date visualizzate ed è disabilitato durante l’aggiornamento. Le date restano fisse; Google può correggere le misurazioni rilette.
