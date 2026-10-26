# Note di rilascio

Funzionalità, correzioni e altre modifiche, dalla versione più recente.

## [0.8.0] Alpha — 2026-10-26

### In evidenza

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

### Correzioni

- **Affidabilità della verifica:** sono state corrette nove cause di risultati errati dopo aver confrontato le verifiche con misurazioni su siti reali.
- **Verifica · telefono:** la schermata di verifica e il report scaricato non escono più dai margini sul telefono.

## [0.7.1] Alpha — 2026-10-26

### Funzionalità

- **Annunci:** gli annunci in tempo reale compaiono nella schermata Annunci dell’app. Sono redatti in turco e inglese; le altre lingue dell’interfaccia mostrano la versione inglese. Prepara e pubblica i testi dalla pagina di amministrazione protetta da password.
- **Dashboard:** La sezione Prossimi passi del pannello propone attività guidate e un punteggio di preparazione basato sulle connessioni Google, su una verifica recente, sul contesto del progetto e sulla configurazione dell’agente. Misura la preparazione della configurazione, non il rendimento SEO o le posizioni.
- **Report degli agenti:** I report degli agenti ora usano una lista di controllo della copertura per verifiche e PageSpeed, Search Console, opportunità, cronologia delle posizioni, parole chiave salvate, Analytics, copertura dell’indice e sitemap, così da proporre miglioramenti prioritari.
- **Notifiche:** Il centro notifiche riunisce risultati delle verifiche, nuove versioni, problemi di connessione Google e aggiornamenti dei report. I suoni e gli avvisi desktop hanno controlli separati.
- **Notifiche di Windows:** Gli aggiornamenti dell’app e gli annunci in tempo reale appaiono nel centro notifiche di Windows quando l’opzione è attiva. Si può gestire in Impostazioni → Notifiche.
- **Avvio di Windows:** All’avvio di Windows, una finestra di avanzamento mostra la preparazione del server; durante il download di un aggiornamento viene mostrata la percentuale effettiva.
- **Impostazioni Windows:** In Impostazioni → Windows, scegli se avviare l’app con Windows e se installare automaticamente gli aggiornamenti. L’app spiega quando un amministratore limita un’opzione.
- **Verifica del sito:** Segui il tempo trascorso e l’avanzamento durante una verifica, poi consulta il riepilogo finale. L’app mostra l’avanzamento anche mentre prepara un report o controlla gli aggiornamenti.

### Correzioni

- **Nuovo progetto:** Sui telefoni, l’elenco dei paesi nel modulo di un nuovo progetto non viene più tagliato. Esc chiude prima l’elenco e lascia aperto il modulo.
- **Aiuto · Diagnostica:** le verifiche non riuscite mostrano la fase d’interruzione, un messaggio ripulito e gli errori PageSpeed più frequenti. Gli URL delle pagine vengono rimossi dai riepiloghi esportati.

### Sicurezza

- **Aggiornamenti di sicurezza:** Sono state applicate correzioni di sicurezza alle dipendenze dell’applicazione.

## [0.4.3] Alpha — 2026-10-23

### Funzionalità

- **Installazione Windows:** installa l’app su Windows con un solo programma di installazione, senza Docker né terminale. Porta con sé i componenti mancanti: l’app si apre al primo avvio anche su un computer pulito, crea le chiavi necessarie, prepara il proprio database e apre il browser. Si gestisce dall’icona nella barra delle applicazioni; la disinstallazione non elimina i tuoi dati.
- **Aggiornamenti Windows:** la voce Aggiornamento nel menu della barra delle applicazioni c’è sempre. Scarica, verifica e installa la nuova versione e mostra il controllo, la percentuale di download e il passaggio di installazione. Puoi lasciare che gli aggiornamenti si installino da soli.
- **Windows · Si ripara da sola:** se il server si ferma in modo imprevisto, l’app lo riavvia. I file di log non continuano più a crescere.
- **Aiuto · Diagnostica:** la riparazione dell’installazione può risolvere problemi di avvio. Segnala un problema apre una segnalazione già compilata; nome utente, nomi dei siti ed e-mail vengono oscurati nel report diagnostico.
- **Prima configurazione:** in Configurazione dell’agente, Configura da zero è in cima, con una sola scheda e un solo pulsante di copia per Claude Code, Codex e altri assistenti. Le impostazioni spiegano il collegamento a Google in tre passaggi.
- **Riscontro:** salvare, eliminare e collegare dicono cosa succede durante l’attesa, alla fine e in caso di errore. Eliminare e scollegare chiedono prima una conferma.
- **Aspetto dell’app:** menu, impostazioni e schermate iniziali sono state semplificate e più di duecento testi sono stati riscritti in un turco naturale. Il tema scuro è quello predefinito; i temi chiaro e scuro sono coerenti con il sito.
- **Guida per l’utente e sito:** seowatcher.io e la guida per l’utente di 20 pagine sono disponibili in sei lingue. Le pagine di risoluzione dei problemi usano riquadri Sintomo, Causa e Soluzione.

### Correzioni

- **Connessione Google:** corretta l’avvertenza errata «chiave di accesso Google mancante» mostrata quando è collegato solo un account di servizio. Gli errori che arrivano da Google ora indicano il collegamento a Google.
- **Analytics:** i nomi di dispositivi, canali e paesi compaiono in turco, gli importi dei ricavi mostrano la valuta e le percentuali di variazione hanno lo stesso formato in ogni schermata.
- **Verifica del sito · Opportunità:** corretta la fuoriuscita laterale sul telefono in Verifica del sito e Opportunità.

## [0.2.1] Alpha — 2026-10-04

### In evidenza

- **Tutti i dati in un’unica app:** i dati di Search Console, Analytics, della verifica del sito e di PageSpeed sono riuniti in un’unica app sul tuo computer. Puoi esaminare i problemi del sito, le pagine interessate, i risultati di velocità e la cronologia delle verifiche.
- **Monitoraggio e report:** monitora le prestazioni di ricerca e la posizione delle parole chiave salvate e individua le opportunità di miglioramento. Scarica e stampa i report delle verifiche e tienili nello stesso elenco dei report dei tuoi agenti. Sono inclusi tema chiaro e scuro, uso da tastiera e supporto per i lettori di schermo.

### Funzionalità

- **Configurazione dell’agente:** se hai appena scaricato il repository, incolla nel tuo agente il prompt di configurazione della schermata Configurazione dell’agente; controlla in ordine Docker, il collegamento a Google, la chiave PageSpeed, il progetto e il collegamento dell’agente. Non ti chiede mai di incollare segreti nella chat. Lo stesso prompt è anche nelle azioni rapide dell’Aiuto.
- **Supporto a Codex:** Configurazione dell’agente ha istruzioni separate per Codex; si collega con un solo comando, installa le competenze SEO e le verifica con una chiamata reale.
- **Limiti di Google e del sistema:** la tua quota giornaliera di ispezioni URL, la quota di Analytics, il numero di misurazioni di velocità di oggi e i limiti dei report compaiono nelle schermate pertinenti. Sono mostrati solo i numeri davvero noti, ciascuno con fonte e ora.
- **Vista in tempo reale:** l’avanzamento della verifica mostra scansione e misurazione della velocità con barre separate e una stima del tempo rimasto. Con la riduzione del movimento attiva, nessuna animazione parte.

### Correzioni

- **Verifica del sito:** le verifiche interrotte non bloccano più per sempre le nuove e quelle concluse non riempiono più la capacità. Un agente che legge una verifica in corso vede «verifica in corso» invece di «nessun problema».
- **Verifica · calcoli:** profondità delle pagine, copertura della sitemap e rilevamento delle pagine orfane sono calcolati con più precisione. Indirizzi simili ma diversi (http e https, www, barra finale) ora contano come diversi nel confronto dell’indirizzo canonico, e questo può far emergere discrepanze reali prima nascoste.
- **Progetti · Google:** i dati di un vecchio progetto non si mescolano più quando cambi account o proprietà Google. Rimuovere un account elimina solo i dati dei progetti di quell’account.
- **Impostazioni · Google:** il client Google inserito in Impostazioni viene usato anche per rinnovare l’accesso; il problema che chiedeva di ricollegarsi dopo circa un’ora è risolto. Le impostazioni spiegano quale collegamento a Google è in uso.

### Sicurezza

- **Report:** un report scaricato si apre sempre con le proprie regole di protezione, così una pagina scritta con cattive intenzioni non può girare prima della protezione.
