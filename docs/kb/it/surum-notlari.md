---
title: Note di versione
description: seowatcher 0.7.1 Alpha — annunci compatibili e diagnostica più chiara.
updated: 2026-10-26
---

L’ultima versione è la **0.7.1 Alpha**, del 26 ottobre 2026. I dati restano intatti durante l’aggiornamento.

Per passare da 2.x a 0.x.x Alpha, avviare manualmente il nuovo programma di installazione; il vecchio aggiornamento non riconosce il numero inferiore come più recente.

Le modifiche non ancora rilasciate si trovano in una sezione separata in alto.

## Non rilasciato — 0.8.0 Alpha

- **Verifica del sito riscritta:** 201 regole esaminano le pagine e il sito nel suo insieme, tra cui intestazioni di sicurezza, record di e-mail e dominio, scadenza di SSL e dominio, accesso dei crawler IA e risultati di Lighthouse.
- **Risultati onesti:** un controllo non misurabile non conta più come «superato» e un sondaggio che non ha potuto girare non produce segnalazioni. Se mancano i dati, la schermata lo dice chiaramente.
- **Ordine delle attività:** le correzioni sono ordinate in base al tuo traffico di Search Console e il punteggio è ponderato per categoria.
- **Nuova schermata e nuovo report:** schede Controlli e Dati immediati, anteprime di ricerca e condivisione, cronologia del punteggio e report scaricabile ridisegnato.
- **Interfaccia in sei lingue:** sono arrivati tedesco, francese, italiano e portoghese (Brasile). Insieme a turco e inglese, tutta l’app è disponibile in sei lingue.

### Verifica del sito

- **Controlli sull’intero sito:** intestazioni di sicurezza (come HSTS), reindirizzamenti, la risposta a una pagina inesistente, robots.txt, record SPF e DMARC e le date di scadenza del certificato SSL e del dominio vengono interrogati una sola volta all’inizio della verifica. Ognuno produce una sola segnalazione.
- **Crawler IA:** la verifica controlla se il tuo robots.txt blocca crawler IA come GPTBot, ClaudeBot e PerplexityBot e se hai un file llms.txt.
- **Risultati di Lighthouse:** con la misurazione della velocità attiva, i controlli di Lighthouse compaiono come problemi, ciascuno con il risparmio stimato.
- **Link esterni e immagini:** su richiesta, la verifica controlla se i link esterni si aprono e se le immagini sono più pesanti del necessario.
- **Più regole:** 201 regole in totale, con segnali di pagina e più di 20 nuove segnalazioni. Cosa significa ogni regola e come correggerla è spiegato nella guida Regole di verifica.
- **Punteggio:** il punteggio è calcolato con pesi per categoria.
- **Da fare:** le cose da correggere sono ordinate in base al traffico di Search Console. Se Search Console non è collegato, l’ordine tiene conto solo dell’effetto sul punteggio.
- **Controlli e Dati immediati:** la scheda Controlli elenca anche i controlli superati e quelli non misurabili. La scheda Dati immediati mostra le informazioni del sito misurate durante la verifica e, se disponibili, i Core Web Vitals.
- **Anteprime:** anteprima del risultato di ricerca Google, della scheda di condivisione (Open Graph) e della visualizzazione mobile.
- **Cronologia e report:** la cronologia del punteggio mostra come cambia tra una verifica e l’altra. Il report scaricabile è stato ridisegnato.

### Altre funzionalità

- **Lingua dell’interfaccia:** scegli una delle sei lingue in Impostazioni → Aspetto → Lingua; numeri e date seguono la tua scelta.
- **Guida all’installazione:** le differenze tra il pacchetto Windows e Docker, per esempio dove si trovano le impostazioni e quali valgono, sono spiegate con chiarezza nella guida e nell’Aiuto.
- **Strumenti per gli agenti:** il nuovo strumento `get_audit_summary` restituisce in una sola chiamata il punteggio del sito, i punteggi per categoria, l’elenco ordinato delle attività e i dati immediati del sito.
- **Guida:** la pagina Regole di verifica descrive una per una tutte le 201 regole; la guida e le note di rilascio sono disponibili in sei lingue.
- **seowatcher.io · privacy:** sul sito web Google Analytics 4 funziona solo se è impostato un ID di misurazione e scegli Accetta; prima del tuo consenso non viene inviato nulla a Google. La pagina sulla privacy è disponibile in sei lingue.
- **Notifiche:** i popup di sistema di Windows e del browser sono disattivati. Gli annunci compaiono nel popup dell’app quando è visibile e restano nella cronologia delle notifiche in background. Gli avvisi importanti possono riprodurre il suono dell’app.

### Correzioni

- **Affidabilità della verifica:** sono state corrette nove cause di risultati errati dopo aver confrontato le verifiche con misurazioni su siti reali.
- **Verifica · telefono:** la schermata di verifica e il report scaricato non escono più dai margini sul telefono.

## 0.7.1 Alpha — 2026-10-26

- **Annunci:** il testo inglese di riserva completa i campi lingua richiesti dall’app 0.7.0.
- **Aiuto · Diagnostica:** le verifiche non riuscite mostrano la fase d’interruzione, un messaggio ripulito e gli errori PageSpeed più frequenti. Gli URL delle pagine vengono rimossi dai riepiloghi esportati.

## 0.7.0 Alpha — 2026-10-25

- **Avvio di Windows:** All’avvio di Windows, una finestra di avanzamento mostra la preparazione del server; durante il download di un aggiornamento viene mostrata la percentuale effettiva.
- **Notifiche di Windows:** Gli aggiornamenti dell’app e gli annunci in tempo reale appaiono nel centro notifiche di Windows quando l’opzione è attiva. Si può gestire in Impostazioni → Notifiche.
- **Annunci:** Gli annunci sono redatti in turco e inglese. Nelle altre lingue dell’interfaccia viene mostrata la versione inglese.

## 0.6.0 Alpha — 2026-10-24

- **Annunci:** Gli annunci in tempo reale vengono mostrati nell’app. Prepara e pubblica avvisi bilingui dalla pagina di amministrazione protetta da password.
- **Dashboard:** La sezione Prossimi passi del pannello propone attività guidate e un punteggio di preparazione basato sulle connessioni Google, su una verifica recente, sul contesto del progetto e sulla configurazione dell’agente. Misura la preparazione della configurazione, non il rendimento SEO o le posizioni.
- **Report degli agenti:** I report degli agenti ora usano una lista di controllo della copertura per verifiche e PageSpeed, Search Console, opportunità, cronologia delle posizioni, parole chiave salvate, Analytics, copertura dell’indice e sitemap, così da proporre miglioramenti prioritari.
- **Navigazione:** Il collegamento del marchio nella navigazione desktop e mobile apre seowatcher.io.
- **Report degli agenti:** Le istruzioni per i report chiedono agli agenti di indicare quali fonti di dati sono disponibili e di segnalare quelle mancanti.
- **Navigazione:** L’area del marchio nella navigazione compatta ora si adatta senza fuoriuscire.
- **Annunci:** L’accesso cross-origin è disabilitato per l’API amministrativa; il feed pubblico consente la sola lettura degli annunci.

## 0.5.0 Alpha — 2026-10-23

- **Lingua:** Usa l’interfaccia in turco o inglese. La lingua scelta in Impostazioni → Aspetto → Lingua modifica anche la visualizzazione di numeri e date.
- **Notifiche:** Il centro notifiche riunisce risultati delle verifiche, nuove versioni, problemi di connessione Google e aggiornamenti dei report. I suoni e gli avvisi desktop hanno controlli separati.
- **Note di rilascio:** Le note di rilascio hanno una voce dedicata nella barra laterale, sopra le Notifiche. Etichette colorate mostrano funzionalità, correzioni e modifiche di sicurezza per ogni versione.
- **Impostazioni Windows:** In Impostazioni → Windows, scegli se avviare l’app con Windows e se installare automaticamente gli aggiornamenti. L’app spiega quando un amministratore limita un’opzione.
- **Verifica del sito:** Segui il tempo trascorso e l’avanzamento durante una verifica, poi consulta il riepilogo finale. L’app mostra l’avanzamento anche mentre prepara un report o controlla gli aggiornamenti.
- **Aiuto:** Apri la guida pertinente dal titolo di ogni schermata.
- **Nuovo progetto:** Sui telefoni, l’elenco dei paesi nel modulo di un nuovo progetto non viene più tagliato. Esc chiude prima l’elenco e lascia aperto il modulo.
- **Aiuto:** I messaggi di aiuto lunghi si adattano alle finestre piccole e compatte.
- **Impostazioni:** Le impostazioni ora evidenziano correttamente la sezione selezionata. I controlli Windows hanno aree di tocco più ampie.
- **Stato di indicizzazione:** I controlli simultanei dell’indice usano con maggiore precisione la quota giornaliera. I risultati riusciti vengono conservati se un altro controllo del gruppo non riesce.
- **Aggiornamenti di sicurezza:** Sono state applicate correzioni di sicurezza alle dipendenze dell’applicazione.

## 0.4.3 Alpha — 2026-10-22

Tutte le versioni intermedie dopo la 0.3.0 sono riunite in questa versione.

- **Installazione Windows:** il programma di installazione porta con sé i componenti mancanti, così l’app si apre al primo avvio anche su un computer pulito. Il nome del file e la procedura guidata indicano la versione installata; la disinstallazione non elimina i tuoi dati.
- **Aggiornamenti Windows:** la voce Aggiornamento nel menu della barra delle applicazioni c’è sempre. Scarica, verifica e installa la nuova versione e mostra il controllo, la percentuale di download e il passaggio di installazione. Puoi lasciare che gli aggiornamenti si installino da soli.
- **Windows · Si ripara da sola:** se il server si ferma in modo imprevisto, l’app lo riavvia. I file di log non continuano più a crescere.
- **Aiuto · Diagnostica:** la riparazione dell’installazione può risolvere problemi di avvio. Segnala un problema apre una segnalazione già compilata; nome utente, nomi dei siti ed e-mail vengono oscurati nel report diagnostico.
- **Prima configurazione:** in Configurazione dell’agente, Configura da zero è in cima, con una sola scheda e un solo pulsante di copia per Claude Code, Codex e altri assistenti. Le impostazioni spiegano il collegamento a Google in tre passaggi.
- **Riscontro:** salvare, eliminare e collegare dicono cosa succede durante l’attesa, alla fine e in caso di errore. Eliminare e scollegare chiedono prima una conferma.
- **Aspetto dell’app:** menu, impostazioni e schermate iniziali sono state semplificate e più di duecento testi sono stati riscritti in un turco naturale. Il tema scuro è quello predefinito; i temi chiaro e scuro sono coerenti con il sito.
- **Windows e Docker:** l’Aiuto e le istruzioni per gli agenti riconoscono entrambe le installazioni. Descrivono la barra delle applicazioni su Windows e i comandi `docker compose` con Docker.
- **Guida per l’utente e sito:** seowatcher.io e la guida per l’utente di 20 pagine sono disponibili in sei lingue. Le pagine di risoluzione dei problemi usano riquadri Sintomo, Causa e Soluzione.
- **Verifica del sito · Opportunità:** corretta la fuoriuscita laterale sul telefono in Verifica del sito e Opportunità.
- **Connessione Google:** corretta l’avvertenza errata «chiave di accesso Google mancante» mostrata quando è collegato solo un account di servizio. Gli errori che arrivano da Google ora indicano il collegamento a Google.
- **Analytics:** i nomi di dispositivi, canali e paesi compaiono in turco, gli importi dei ricavi mostrano la valuta e le percentuali di variazione hanno lo stesso formato in ogni schermata.
- **Sito · download:** il link di download punta alla versione giusta. Un indirizzo sconosciuto apre una schermata Pagina non trovata con un link per tornare alla dashboard, invece di una pagina vuota.

## 0.3.0 Alpha — 2026-10-21

- **Installazione Windows:** installa l’app su Windows con un solo programma di installazione, senza Docker né terminale. Al primo avvio l’app crea le chiavi necessarie, prepara il proprio database e apre il browser; la gestisci dall’icona nella barra delle applicazioni. La disinstallazione non elimina i tuoi dati.
- **Sito:** su seowatcher.io trovi i link di download, le informazioni sul prodotto e la guida per l’utente.
- **Guida per l’utente:** installazione, funzionalità, competenze pronte all’uso e strumenti per gli agenti sono stati riscritti da zero, con schermate dell’app.
- **Verifica del sito:** corretti i numeri che uscivano dalla scheda di riepilogo dei problemi in Verifica del sito.

## 0.2.1 Alpha — 2026-10-04

La 0.2.0 è stata riunita a questa versione. Riguarda soprattutto la pulizia degli errori; i tuoi dati vengono conservati durante l’aggiornamento.

- **Configurazione dell’agente:** se hai appena scaricato il repository, incolla nel tuo agente il prompt di configurazione della schermata Configurazione dell’agente; controlla in ordine Docker, il collegamento a Google, la chiave PageSpeed, il progetto e il collegamento dell’agente. Non ti chiede mai di incollare segreti nella chat. Lo stesso prompt è anche nelle azioni rapide dell’Aiuto.
- **Impostazioni · Google:** il client Google inserito in Impostazioni viene usato anche per rinnovare l’accesso; il problema che chiedeva di ricollegarsi dopo circa un’ora è risolto. Le impostazioni spiegano quale collegamento a Google è in uso.
- **Verifica del sito:** i risultati riusciti in precedenza, misurazioni di velocità comprese, vengono conservati quando una verifica si interrompe o viene ripetuta.
- **Verifica · calcoli:** profondità delle pagine, copertura della sitemap e rilevamento delle pagine orfane sono calcolati con più precisione. Indirizzi simili ma diversi (http e https, www, barra finale) ora contano come diversi nel confronto dell’indirizzo canonico, e questo può far emergere discrepanze reali prima nascoste.
- **Progetti · Google:** i dati di un vecchio progetto non si mescolano più quando cambi account o proprietà Google. Rimuovere un account elimina solo i dati dei progetti di quell’account.
- **Analytics:** la scheda della quota mostra l’uso corretto («231 / 200.000»). Le dimensioni dei report usano ovunque la stessa unità. Le colonne della cronologia delle verifiche indicano che sono «ogni cento pagine».
- **Parole chiave salvate · CSV:** corretti l’ordine delle parole chiave salvate e l’apertura in Excel dei file CSV con caratteri turchi. Si possono salvare più di 500 query in una volta.
- **Moduli · errori:** se un aggiornamento in background non riesce, quello che hai scritto in un modulo aperto viene conservato. I messaggi di errore dicono cosa è successo e cosa puoi fare dopo.
- **Configurazione dell’agente:** corrette le istruzioni di collegamento per Windows e Git Bash e il comando di Codex. Le descrizioni degli strumenti ora dicono chiaramente che salvare parole chiave e scrivere le informazioni del progetto avviene senza chiedere conferma.
- **Report:** un report scaricato si apre sempre con le proprie regole di protezione, così una pagina scritta con cattive intenzioni non può girare prima della protezione.
- **Indirizzi analizzati:** il dominio con e senza www viene verificato separatamente prima della scansione. Nome utente e password scritti in un indirizzo vengono rifiutati e nascosti sullo schermo.
- **Docker:** la chiave di cifratura e la password MCP vengono scritte in modo sicuro; una chiave esistente non viene mai sovrascritta.

## 0.1.0 Alpha — 2026-10-02

- **Supporto a Codex:** Configurazione dell’agente ha istruzioni separate per Codex; si collega con un solo comando, installa le competenze SEO e le verifica con una chiamata reale.
- **Limiti di Google e del sistema:** la tua quota giornaliera di ispezioni URL, la quota di Analytics, il numero di misurazioni di velocità di oggi e i limiti dei report compaiono nelle schermate pertinenti. Sono mostrati solo i numeri davvero noti, ciascuno con fonte e ora.
- **Azioni rapide:** le schermate principali hanno un pulsante Aggiorna, l’ora dell’ultimo aggiornamento e la scorciatoia r.
- **Vista in tempo reale:** l’avanzamento della verifica mostra scansione e misurazione della velocità con barre separate e una stima del tempo rimasto. Con la riduzione del movimento attiva, nessuna animazione parte.
- **Aiuto:** ricontrollo dello stato, pacchetto diagnostico, documentazione e note di rilascio sono ora in un’unica barra. I problemi comuni riguardano Docker, una porta occupata, la password MCP, il limite di PageSpeed e l’assenza di dati sulle query.
- **Impostazioni:** salto rapido tra le sezioni, un badge di stato su ogni sezione e un pulsante Prova la chiave per la chiave PageSpeed.
- **Verifica del sito:** le verifiche interrotte non bloccano più per sempre le nuove e quelle concluse non riempiono più la capacità. Un agente che legge una verifica in corso vede «verifica in corso» invece di «nessun problema».
- **Progetti · Google:** filtri e risultati del progetto precedente non restano più sullo schermo quando cambi progetto. Cambiare la proprietà di Search Console o scollegarla non mescola più la cronologia di due proprietà. Opportunità, Monitoraggio delle posizioni e Analytics non conservano più vecchi dati quando cambia il collegamento a Google.
- **Parole chiave salvate:** corrette la ricerca con caratteri turchi («çay», «istanbul»), l’esportazione e la stima del tempo rimasto.
- **Impostazioni:** il modulo non viene più nascosto quando il client Google arriva da una variabile d’ambiente e il formato dell’ID client Google viene controllato. Un controllo degli aggiornamenti non riuscito non dice più «aggiornato».
- **Eliminazione · scollegamento:** eliminare e rimuovere il collegamento a Google, compresa l’eliminazione delle credenziali, chiedono conferma.
- **Campo di ricerca · appunti:** il campo di ricerca non aggiunge più una voce di cronologia a ogni tasto e non perde lettere. La copia negli appunti funziona anche su indirizzi non sicuri.

## Numeri di versione

seowatcher usa numeri 0.x Alpha fino alla 1.0. Una nuova funzionalità visibile aumenta il numero centrale (0.7.1 → 0.8.0); una versione con sole correzioni aumenta l’ultimo (0.7.0 → 0.7.1). Le versioni da 0.0.0 a 0.4.3 sono state pubblicate in origine con tag v2.x; la corrispondenza è nella tabella all’inizio di [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md).

La cronologia completa è in [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) su GitHub.
