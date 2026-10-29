---
title: Capire i dati di Analytics
description: Leggere sessioni, coinvolgimento, eventi chiave ed entrate GA4 del sito, controllare la misurazione ed esportare le righe necessarie.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-27
---

La schermata **Analytics** legge la proprietà GA4 collegata al progetto. In alto c'è un riepilogo di sessioni, tasso di coinvolgimento, eventi chiave ed entrate da acquisti. Sotto, il selettore dei report offre **Pagine di destinazione**, **Pagine e schermate**, **Acquisizione del traffico**, **Eventi chiave**, **E-commerce**, **Ricerca nel sito**, **Pubblico** e **Stato della misurazione**. Le note su come leggere i numeri sono raccolte nella sezione chiusa **Capire i dati di Analytics**; ambito, date e avvisi restano sempre visibili.

## Ambito: canale, proprietà e date

Il canale predefinito è **Ricerca organica**, che comprende tutti i motori di ricerca, non solo Google. **Tutto il traffico** cambia insieme il riepilogo e il report. **Ricerca nel sito** copre sempre tutto il traffico e non ha un selettore di canale.

I dati comprendono tutti gli host e gli stream della proprietà. Se un altro sito o un'app inviano dati alla stessa proprietà, anche quei dati sono inclusi.

I periodi di 7, 28 e 90 giorni terminano ieri, nel fuso orario della proprietà. La schermata mostra le date correnti, il periodo precedente di uguale durata e il fuso orario. Ieri è un giorno concluso, ma GA4 può ancora rielaborare i giorni recenti. Un link può impostare date esatte con `startDate` ed `endDate`; una data finale nel futuro viene riportata a ieri, con un avviso.

GA4 e Search Console usano calendari diversi (fuso della proprietà contro ora del Pacifico) e misure diverse. Le stesse date possono quindi coprire ore diverse.

## Leggere il riepilogo

- Gli **eventi chiave** contano eventi, non clienti unici.
- Il **tempo di coinvolgimento** è un totale, non una media per utente.
- **Entrate** pari a zero non provano che il sito non abbia un negozio. Una valuta sconosciuta è indicata accanto all'importo.
- I valori giornalieri distinguono un giorno sconosciuto da un giorno con valore zero.

Se un valore non si può leggere, la schermata mostra **Non è stato possibile determinare il traffico di questo periodo** e conserva i valori letti. Le limitazioni segnalate da Google, come campionamento o soglie di privacy, compaiono accanto alle metriche; una causa sconosciuta viene dichiarata come tale. I dati limitati non vengono usati per confronti o consigli certi. Se Google ha troncato i dati nel periodo scelto, riepilogo e report riportano motivo e date indicati da Google, e il confronto tra periodi non viene mostrato.

Per risolvere un errore di lettura, scelga **Riprova** o apra **Stato della misurazione**. Cambiare canale non risolve il problema.

## Lavorare con le righe del report

Il report mostra 50, 100 o 200 righe per pagina; **Pagina precedente** e **Pagina successiva** scorrono le altre. Filtri, ordinamento, riepiloghi ed esportazioni si applicano alla pagina di righe visibile. Un clic su una barra del grafico filtra la tabella senza cambiare il riepilogo.

- Lo stesso utente può comparire in più categorie: non sommi gli utenti delle categorie per ottenere gli utenti unici.
- Lo stesso percorso su host diversi, e prodotti con lo stesso nome ma ID diversi, restano su righe separate.
- I grafici delle quote di entrate non compaiono se un valore è negativo o sconosciuto.

Il filtro **Traffico elevato, conversione bassa** è un punto di partenza per un'indagine. Richiede almeno quattro pagine elencate con almeno 30 sessioni ciascuna e non stima le vendite perse. Una pagina senza eventi chiave non prova un problema di monitoraggio, e le ricerche frequenti nel sito non provano che manchino contenuti.

## Gruppi di indirizzi da Opportunità

**Esamina il gruppo di indirizzi Analytics** nella schermata [Opportunità](/docs/firsatlar/) apre **Pagine di destinazione** filtrate su un gruppo di indirizzi, con le date dei dati di origine. Il server legge da Google tutte le righe delle pagine di destinazione organiche prima di dividerle in pagine, quindi l'intero gruppo viene abbinato. Parametri di query e barre finali rientrano nello stesso gruppo; host diversi e percorsi con maiuscole diverse restano separati. Se un limite della fonte o una restrizione dei dati impedisce un abbinamento completo, la schermata lo segnala; un risultato vuoto non prova l'assenza di traffico. Il riepilogo mantiene l'ambito dell'intera proprietà. **Rimuovi filtro del gruppo di indirizzi** riporta al report completo.

## Link ed esportazioni

Report, canale, date, suddivisione, dimensione e posizione della pagina restano nell'URL: un link o il pulsante Indietro ripristinano la stessa vista. Il filtro esatto per host e percorso riguarda solo le righe elencate e non unisce le varianti di URL.

**CSV** ed **Esporta in Fogli Google** esportano le righe filtrate con i valori numerici grezzi. La colonna `ga4_scope_json` registra fonte, proprietà, date, fuso orario, valuta, qualità dei dati, pagina e filtri.

## Stato della misurazione

**Stato della misurazione** legge le impostazioni Admin della proprietà: stream di dati web, misurazione avanzata, eventi chiave e definizioni personalizzate. Non modifica nulla nell'account. "Nessuna lacuna nelle impostazioni controllate" non prova che il tag invii dati; per questo servono le verifiche di raccolta collegate. Se la misurazione avanzata è disattivata, nessuno dei suoi eventi automatici è attivo. I conteggi indicati come "almeno" provengono da un inventario che può essere incompleto.

## Quota

La sezione chiusa della quota mostra i token di reporting rimasti secondo l'ultima risposta, non il consumo nel periodo scelto. Il limite delle proprietà standard usato come confronto è un'ipotesi. **Aggiorna** richiede di nuovo i report visibili e consuma token.
