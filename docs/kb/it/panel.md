---
title: Pannello
description: La prima schermata del progetto: numeri di ricerca degli ultimi 28 giorni, stato della configurazione, prossimi passi e riepilogo dell'ultimo controllo.
screen: Panel
route: /p/<proje>
updated: 2026-10-27
---

È la prima schermata di un progetto. Mostra lo stato più recente del sito e cosa fare dopo.

I numeri di ricerca arrivano da Google Search Console. I numeri dei visitatori arrivano da Google Analytics. Il riepilogo del controllo arriva dal crawler (il programma che visita le pagine) dell'app stessa. Il pulsante **Aggiorna** in alto aggiorna tutto. Se il progetto ha almeno un controllo, accanto compare **Avvia controllo**, che porta alla schermata del controllo. Sotto il titolo c'è il dominio del progetto.

## Cosa c'è nella schermata

**Quattro schede di numeri.** **Clic**, **Impressioni**, **CTR** e **Posizione media** coprono gli ultimi 28 giorni. Ogni scheda ha una freccia rispetto ai 28 giorni precedenti. Per la posizione media un numero piccolo è buono, perché 1 è il primo posto. Se il numero scende, quindi, la notizia è buona e la freccia si colora di conseguenza. Se Search Console non è collegato, la scheda dice "Compare dopo la connessione". Se è collegato ma nel periodo non ci sono state impressioni, dice "Nessuna impressione in questo periodo".

**Prossimi passi.** Accanto al titolo un'etichetta indica lo stato della configurazione: "Configurazione 4 / 6" oppure, a lavoro finito, "Configurazione completa". Si contano sei voci: Search Console, Analytics, un audit recente, la descrizione del progetto, la chiave PageSpeed e l'agente IA. Le stesse sei voci sono nella schermata **Contesto del progetto**, quindi le due schermate mostrano lo stesso numero. Un audit recente è un controllo del sito stesso del progetto, concluso negli ultimi sette giorni. Il controllo di un altro sito non conta. Ciò che manca è elencato nella riga "Manca nella configurazione: ..." e il collegamento **Completa** accanto porta alla schermata Contesto del progetto. La configurazione non dice nulla sul sito in sé. È solo un elenco di cose da fare.

L'app propone al massimo tre attività. L'ordine è questo:

- Se Search Console non è collegato: **Collega Search Console** (pulsante: **Connetti**). Se la chiave di accesso Google non è ancora stata inserita, al posto di questa riga compare un avviso "Chiave di accesso Google mancante" con il pulsante **Inserisci la chiave di accesso Google in Impostazioni**.
- Se non c'è nessun controllo: **Esegui il tuo primo controllo** (pulsante: **Avvia**). L'elenco finisce qui.
- Se l'ultimo controllo è fallito: **Esegui nuovamente il controllo** (pulsante: **Esegui di nuovo**). Sotto ci sono la causa, se il difetto è del sito o dell'app, e cosa fare. Se un controllo è in corso: **Controllo in corso** (pulsante: **Visualizza l'avanzamento**).
- Se ci sono problemi critici: "N problemi critici" (pulsante: **Visualizza**).
- Se Search Console è collegato: **Esamina le opportunità** (pulsante: **Apri**).
- Se l'ultimo controllo ha più di sette giorni: **Aggiorna il controllo** (pulsante: **Avvia**).
- Se ci sono avvisi: "N avvisi" (pulsante: **Visualizza**).

Quando un'attività è fatta, esce dall'elenco. Se l'elenco è vuoto, c'è scritto "Niente di urgente. Il controllo è aggiornato e non ci sono problemi critici."

**Novità nell'ultimo controllo** e **Risolto**. Questa scheda compare solo quando ha qualcosa da dire. Se l'ultimo controllo ha più di sette giorni, dice quanti giorni sono passati e propone il pulsante **Avvia controllo**. Se tra gli ultimi due controlli i problemi sono cambiati, compaiono due elenchi. **Novità nell'ultimo controllo** mostra quali problemi sono stati visti per la prima volta, **Risolto** quali sono stati chiusi. Se non è stato risolto nulla, la scheda indica che nessun problema è stato risolto. Se non c'è né l'uno né l'altro, la scheda non compare affatto.

**Tendenza dei clic.** Una linea dei clic giornalieri degli ultimi 28 giorni. Riporta il totale, la variazione rispetto al periodo precedente e il giorno più forte. Se ci sono meno di quattro giorni di dati, la linea non viene tracciata. Il collegamento sotto il grafico apre la schermata **Rendimento della ricerca**.

**Query vicine ai primi tre.** Qui stanno le ricerche con posizione media tra 4 e 20 e impressioni sufficienti. La scheda dice quanti clic in più potrebbero portare insieme se ciascuna salisse di un gradino. È un limite superiore. Ogni riga mostra la posizione della ricerca e il guadagno possibile. Un clic su una riga apre quella ricerca nella schermata Rendimento della ricerca. **Mostra tutto** apre la scheda Opportunità di posizionamento della schermata Rendimento della ricerca. Se nessuna ricerca ha impressioni sufficienti, la scheda lo dice.

**Scheda Controllo del sito.** Mostra quante pagine sono state scansionate e in che data, i problemi più frequenti e le pagine con più problemi. Mentre un controllo è in corso, dice che l'audit è in corso e i risultati compariranno alla fine, e la scheda si aggiorna ogni cinque secondi. Se il controllo non è stato completato, dice che quindi non ci sono risultati. Se non sono stati trovati problemi, dice che il sito sembra integro. Sotto i problemi una barra mostra i livelli di gravità. Il punto interrogativo spiega i tre livelli: i problemi critici possono impedire a una pagina di comparire nella ricerca, gli avvisi erodono il posizionamento col tempo, le informative sono piccoli miglioramenti. Un clic sulla barra o su una delle etichette sotto porta all'elenco dei problemi. In fondo c'è l'elenco **Pagine con il maggior numero di problemi**. Se non c'è nessun controllo, questa scheda non compare, perché "Prossimi passi" propone già il primo controllo. **Dettagli** apre la scheda delle pagine con problemi del controllo.

**Scheda del traffico organico.** Compare se Google Analytics è collegato. Per i visitatori arrivati dalla ricerca mostra le **Sessioni**, gli **Utenti attivi**, il **Tasso di coinvolgimento** e gli **Eventi chiave**. Se il sito misura le vendite, si aggiungono le entrate organiche e le **Transazioni**. In alto nella scheda, **Report** apre la schermata Analytics e **Gestisci** le impostazioni di collegamento di Analytics. Una nota in fondo dice che Analytics arriva con 1 giorno di ritardo e Search Console con 3. Per questo i giorni di questa scheda sono diversi dai riquadri dei clic in alto. Se Analytics non è collegato, al posto della scheda c'è un invito a collegarlo. Se lo si chiude, non ricompare.

Se la scheda non riesce a leggere i dati, mostra una frase che indica causa e soluzione e offre due pulsanti: **Ripristina la connessione** (apre le impostazioni di Analytics) e **Riprova**. Le cause principali sono queste:

- Il collegamento è scaduto o è stato revocato. Ricollegarlo in **Impostazioni**.
- L'account collegato non raggiunge più la proprietà. Dare all'account o all'account di servizio almeno il ruolo Visualizzatore sulla proprietà.
- La proprietà è stata eliminata o spostata. Sceglierla di nuovo in **Impostazioni**.
- A questo progetto non è collegata nessuna proprietà Analytics. Sceglierne una in **Impostazioni**.
- La quota dei report è esaurita. La quota si rinnova ogni ora e ogni giorno, riprovare più tardi.
- La Google Analytics Data API è disattivata nel progetto Google Cloud. Attivare "Google Analytics Data API" nella Google Cloud Console.
- Google non è raggiungibile. Controllare la connessione a internet di questo computer.
- Google per ora non risponde. Riprovare tra poco.

Se la scheda non ha sessioni organiche, dice che in questo intervallo non è stato registrato traffico di ricerca organico. Non c'è nessun guasto. In quel periodo non ci sono state visite dalla ricerca.

**Configura il tuo spazio di lavoro.** In fondo alla pagina i passi di configurazione da fare stanno in un riquadro chiuso. I passi: aggiungere il sito, aggiungere gli altri siti, collegare l'agente IA, collegare Search Console e descrivere il progetto. C'è scritto "N passi rimasti. Tutto facoltativo". Un passo si rimanda con **Salta per ora**. I passi rimandati e quelli finiti sono contati sotto il riquadro, e **Ripristina** li riporta. Quando tutto è fatto, il riquadro scompare.

## Come si usa

1. Aprirlo una volta a settimana e guardare le frecce delle quattro schede.
2. Fare la prima attività del riquadro **Prossimi passi**. Se il riquadro è vuoto, non c'è nulla di urgente.
3. Se l'etichetta di configurazione mostra qualcosa di mancante, fare clic su **Completa**. Le voci mancanti si chiudono in fretta.
4. Se l'ultimo controllo ha più di sette giorni, fare clic su **Avvia controllo**.
5. Rivedere titolo e descrizione delle pagine della scheda **Query vicine ai primi tre**. Il guadagno più facile di solito è qui.
6. Se compare la scheda **Novità nell'ultimo controllo** e **Risolto**, dare la priorità ai problemi visti per la prima volta. Si vede a colpo d'occhio il cambiamento di una settimana.

## Come si calcolano i numeri

Le quattro schede arrivano da un unico report di Search Console. Google fornisce i dati con tre giorni di ritardo. L'intervallo di 28 giorni quindi non termina oggi, ma tre giorni prima. Il periodo precedente sono i 28 giorni subito prima di questo intervallo. Se il periodo precedente è zero, la freccia non viene mostrata.

Nella posizione media le ricerche con molte impressioni pesano di più. Questi quattro numeri sono i veri totali del sito. Sommando le righe della tabella nella schermata **Rendimento della ricerca** si ottiene un numero più grande, perché Google conta separatamente ogni pagina che compare per la stessa ricerca.

Il guadagno della scheda **Query vicine ai primi tre** è un limite superiore. Sono i clic in più che ogni ricerca otterrebbe salendo di un gradino. Lo stesso calcolo vale nella schermata Opportunità. Le due schermate danno lo stesso numero.

L'etichetta di configurazione è un numero, non una percentuale né un punteggio. Mostra quante delle sei voci sono fatte.

## Domande frequenti

**Perché non ci sono dati di oggi?** Google non ha ancora fornito gli ultimi tre giorni. Non è un guasto.

**La posizione media è aumentata. È un bene?** No. Passare da 3 a 7 è un calo. Per questo la freccia diventa rossa.

**La scheda del controllo mostra ciò che vede Google?** No. Mostra ciò che ha trovato la scansione dell'app stessa. Quali pagine Google ha indicizzato si vede nella scheda **Stato dell'indicizzazione** della schermata del controllo.

**Manca la scheda del traffico organico.** Google Analytics non è collegato nelle impostazioni del progetto, oppure la scheda è stata chiusa. Collegarlo è facoltativo.

**Perché la configurazione dice 5 / 6 se credevo di aver fatto tutto?** La riga "Manca nella configurazione" dice quale voce manca. Di solito è una chiave PageSpeed o un controllo degli ultimi sette giorni.

**La scheda di Analytics mostra un errore.** La frase sulla scheda indica la causa. Di solito basta rinnovare il collegamento in **Impostazioni**.

## Limiti

Il pannello non mostra volume di ricerca, backlink (collegamenti che arrivano da altri siti) né posizioni dei concorrenti. Questi dati nell'app non ci sono. Search Console nasconde le query cercate molto raramente. Per i dettagli si passa alla schermata corrispondente.

<!-- Fonti: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; Ga4ConnectCard.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; DashboardOnboarding.tsx; dashboardSteps.ts; GoogleSetupBanner.tsx; src/client/features/projects/projectSetupQuery.ts; src/shared/projectSetup.ts; src/server/lib/errors.ts; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
