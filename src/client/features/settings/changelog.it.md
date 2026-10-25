# Note di rilascio

Funzionalità, correzioni e altre modifiche, dalla versione più recente.

## [0.7.0] Alpha — 2026-10-25

### Funzionalità

- All’avvio di Windows, una finestra di avanzamento mostra la preparazione del server; durante il download di un aggiornamento viene mostrata la percentuale effettiva.
- Gli aggiornamenti dell’app e gli annunci in tempo reale appaiono nel centro notifiche di Windows quando l’opzione è attiva. Si può gestire in Impostazioni → Notifiche.
- Gli annunci in tempo reale possono essere preparati in sei lingue e mostrati nella lingua dell’interfaccia selezionata.

## [0.6.0] Alpha — 2026-10-24

### Funzionalità

- Gli annunci in tempo reale vengono mostrati nell’app. Prepara e pubblica avvisi bilingui dalla pagina di amministrazione protetta da password.
- La sezione Prossimi passi del pannello propone attività guidate e un punteggio di preparazione basato sulle connessioni Google, su una verifica recente, sul contesto del progetto e sulla configurazione dell’agente. Misura la preparazione della configurazione, non il rendimento SEO o le posizioni.
- I report degli agenti ora usano una lista di controllo della copertura per verifiche e PageSpeed, Search Console, opportunità, cronologia delle posizioni, parole chiave salvate, Analytics, copertura dell’indice e sitemap, così da proporre miglioramenti prioritari.
- Il collegamento del marchio nella navigazione desktop e mobile apre seowatcher.io.

### Correzioni

- Le istruzioni per i report chiedono agli agenti di indicare quali fonti di dati sono disponibili e di segnalare quelle mancanti.
- L’area del marchio nella navigazione compatta ora si adatta senza fuoriuscire.

### Sicurezza

- L’accesso cross-origin è disabilitato per l’API amministrativa; il feed pubblico consente la sola lettura degli annunci.

## [0.5.0] Alpha — 2026-10-23

### Funzionalità

- Usa l’interfaccia in turco o inglese. La lingua scelta in Impostazioni → Aspetto → Lingua modifica anche la visualizzazione di numeri e date.
- Il centro notifiche riunisce risultati delle verifiche, nuove versioni, problemi di connessione Google e aggiornamenti dei report. I suoni e gli avvisi desktop hanno controlli separati.
- Le note di rilascio hanno una voce dedicata nella barra laterale, sopra le Notifiche. Etichette colorate mostrano funzionalità, correzioni e modifiche di sicurezza per ogni versione.
- In Impostazioni → Windows, scegli se avviare l’app con Windows e se installare automaticamente gli aggiornamenti. L’app spiega quando un amministratore limita un’opzione.
- Segui il tempo trascorso e l’avanzamento durante una verifica, poi consulta il riepilogo finale. L’app mostra l’avanzamento anche mentre prepara un report o controlla gli aggiornamenti.
- Apri la guida pertinente dal titolo di ogni schermata.

### Correzioni

- Sui telefoni, l’elenco dei paesi nel modulo di un nuovo progetto non viene più tagliato. Esc chiude prima l’elenco e lascia aperto il modulo.
- I messaggi di aiuto lunghi si adattano alle finestre piccole e compatte.
- Le impostazioni ora evidenziano correttamente la sezione selezionata. I controlli Windows hanno aree di tocco più ampie.
- I controlli simultanei dell’indice usano con maggiore precisione la quota giornaliera. I risultati riusciti vengono conservati se un altro controllo del gruppo non riesce.

### Sicurezza

- Sono state applicate correzioni di sicurezza alle dipendenze dell’applicazione.

### Prima dell’aggiornamento

Per il primo passaggio dalla versione 2.x alla serie 0.x Alpha, esegui manualmente il nuovo programma di installazione di Windows. Il vecchio aggiornamento non riconosce una versione inferiore come più recente. I dati e le connessioni Google vengono conservati.

## [0.4.3] Alpha — 2026-10-22

### Funzionalità

- Il programma di installazione Windows include i componenti mancanti, così l’app si avvia anche su un computer pulito.
- Scarica le nuove versioni da Aggiornamento nel menu della barra delle applicazioni. Puoi anche scegliere l’installazione automatica.
- La riparazione dell’installazione può risolvere problemi di avvio. Le informazioni personali vengono oscurate nei report diagnostici quando segnali un problema.
- Menu, impostazioni e schermate iniziali sono più semplici. I temi chiaro e scuro ora sono coerenti tra app e sito.
- La guida per l’utente è disponibile in sei lingue.

### Correzioni

- Rimossa la fuoriuscita orizzontale sui telefoni da Verifica del sito e Opportunità.
- Corretta un’avvertenza errata sulla connessione Google quando l’app usa solo un account di servizio.
- Migliorata la visualizzazione di dispositivi, canali, paesi e valute in Analytics.
- Corretti i collegamenti di download errati e le schermate vuote per gli indirizzi non riconosciuti.

## [0.3.0] Alpha — 2026-10-21

### Funzionalità

- Installa l’app Windows con un solo programma di installazione, senza Docker né terminale.
- Trova download, informazioni sul prodotto e guida per l’utente su seowatcher.io.

### Correzioni

- Corretto il testo che fuoriusciva dalla scheda di riepilogo dei problemi in Verifica del sito.

## [0.2.1] Alpha — 2026-10-04

### Correzioni

- Corretto il problema che chiedeva di riconnettere Google circa un’ora dopo aver configurato la connessione in Impostazioni.
- Conservati i risultati riusciti in precedenza quando una verifica si interrompe a metà o viene ripetuta.
- Migliorati i calcoli della profondità delle pagine, della copertura delle sitemap e delle pagine orfane.
- Evitata la mescolanza dei dati del progetto precedente con quelli del nuovo dopo aver cambiato account Google o proprietà.
- Corretto l’ordine delle parole chiave salvate e dei file CSV, che Excel apriva con caratteri turchi errati.
- Conservato il testo nei moduli aperti quando un aggiornamento in background non riesce. Gli errori ora indicano più chiaramente il passo successivo utile.

### Sicurezza

- Rafforzati i controlli di sicurezza per i report scaricati e gli indirizzi dei siti sottoposti a scansione.

## [0.2.0] Alpha — 2026-10-03

### Funzionalità

- La procedura guidata nella schermata Configurazione agente controlla passo dopo passo la prima installazione e la connessione Google.

### Correzioni

- Corretti l’indicatore della quota Analytics, le dimensioni dei report e i confronti nella cronologia delle verifiche.
- Ora le impostazioni indicano quale connessione Google viene usata.
- Corrette le istruzioni di connessione dell’agente per Windows e Git Bash.

## [0.1.0] Alpha — 2026-10-02

### Funzionalità

- Aggiunte istruzioni di connessione separate per Codex.
- I limiti di Google e del sistema sono visibili nelle schermate pertinenti. I contatori senza dati noti sono segnalati chiaramente.
- Aggiunti un pulsante Aggiorna e l’ora dell’ultimo aggiornamento alle schermate principali.
- Riunite nella schermata Guida le informazioni diagnostiche, i problemi comuni e le azioni rapide.

### Correzioni

- Un audit interrotto non impedisce più indefinitamente di avviarne uno nuovo.
- I filtri e i risultati del progetto precedente non restano più visibili quando si cambia progetto.
- Corretti la ricerca di parole chiave in turco, le esportazioni e le stime del tempo rimanente.
- Le azioni di eliminazione e disconnessione da Google richiedono ora una conferma.
