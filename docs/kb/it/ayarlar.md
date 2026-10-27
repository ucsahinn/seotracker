---
title: Impostazioni
description: Tema, chiave di accesso a Google, chiave PageSpeed, limiti d'uso e aggiornamenti. È l'unica schermata di impostazioni dell'intera installazione.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Qui si gestiscono il collegamento con Google, la chiave per la misurazione della velocità e gli aggiornamenti.

Nella schermata **Impostazioni** si regola ciò che riguarda l'intera installazione. Le impostazioni specifiche del progetto (nome, dominio, proprietà di Search Console e di Analytics) stanno nella pagina **Impostazioni progetto** di ciascun progetto. Qui si gestiscono la chiave di accesso necessaria per collegarsi a Google, la chiave PageSpeed, il tema e il controllo degli aggiornamenti. A sinistra ci sono le sezioni **Aspetto**, **Google**, **Account di servizio**, **Test di velocità**, **Limiti**, **Informazioni** e **Windows**. Nel titolo di ogni sezione c'è un badge che ne mostra lo stato.

## Cosa c'è nella schermata

**Aspetto.** Per il **Tema** ci sono le opzioni Sistema, Chiaro e Scuro. La scelta è conservata in questo browser. In un altro browser o su un altro computer la si sceglie di nuovo.

**Lingua.** L'interfaccia dell'app è disponibile in turco, inglese, tedesco, francese, italiano e portoghese. In **Impostazioni → Aspetto → Lingua** si sceglie **Türkçe**, **English**, **Deutsch**, **Français**, **Italiano** o **Português**; la pagina si ricarica nella nuova lingua. Ogni lingua è scritta con il proprio nome, così si trova la propria anche se non si legge quella attuale. Finché non si sceglie, l'app segue la lingua del browser. Se il browser non chiede nessuna di queste lingue, l'app si apre in inglese. Se il browser non indica alcuna lingua, si apre in turco. La scelta è salvata in questo browser, come il tema. Cambia solo l'interfaccia dell'app. Il menu dell'area di notifica di Windows resta in turco.

**Notifiche.** La campanella nella barra laterale mostra gli ultimi 50 eventi e il numero di messaggi non letti. **Segna tutto come letto** conserva la cronologia. Qui compaiono risultati dei controlli, nuove versioni, problemi di collegamento a Google, report e richieste all'indice. Finché l'app è aperta, un nuovo evento compare in una piccola finestra propria dell'app. Quando la scheda è in secondo piano, l'evento resta solo nella cronologia della campanella. L'app non invia notifiche di Windows né del browser, così lo stesso evento non compare mai in due finestre sovrapposte. Se si sta guardando la schermata di un controllo, la finestra di fine di quel controllo non viene mostrata in più, perché la schermata mostra già la fine. **Suono delle notifiche** riproduce un breve suono per gli eventi importanti; con **Ascolta il suono** lo si prova. **Prova la notifica nell'app** crea una notifica di prova e il suo suono. Le animazioni visive seguono la preferenza di sistema per la riduzione del movimento; il suono ha un'impostazione a parte.

**Windows.** Qui si attivano o disattivano l'avvio con Windows e l'installazione automatica degli aggiornamenti. Sono le stesse preferenze salvate del menu dell'area di notifica. Le restrizioni dell'amministratore sono spiegate accanto all'opzione. I comandi sono disattivati nelle installazioni Docker e di sviluppo; i vecchi programmi di avvio di Windows chiedono di aggiornare il pacchetto.

Se una preferenza non si può salvare, la schermata dice perché e cosa fare. Poiché questa sezione parla con l'app nella barra delle applicazioni, gli errori vengono da quell'app:

- **L'app nell'area di notifica non ha risposto entro 4 secondi.** Se il computer si è appena riattivato dalla sospensione, premere **Riprova** dopo qualche secondo. Se persiste, scegliere **Çıkış** (Esci) nel menu dell'area di notifica e riaprire l'app.
- **Impossibile connettersi al servizio impostazioni dell'app nell'area di notifica.** L'app potrebbe essersi chiusa. Riaprire seowatcher dal menu Start.
- **Questa impostazione è bloccata da un amministratore.** Solo l'amministratore del computer può modificarla. È normale se l'installazione è stata fatta per tutti gli utenti.
- **L'app nell'area di notifica non ha riconosciuto questa richiesta.** Server e app potrebbero provenire da sessioni diverse. Scegliere **Çıkış** (Esci) nel menu e riaprire l'app.
- **L'app nell'area di notifica ha rifiutato la richiesta.** Riavviare l'app dal menu. Se persiste, aggiornare il pacchetto Windows.
- **L'app nell'area di notifica ha restituito una risposta non riconosciuta.** Le versioni potrebbero non corrispondere. Aggiornare il pacchetto Windows.

Se la sezione non si apre affatto e dice che le preferenze di Windows non sono disponibili, controllare che l'app nell'area di notifica sia in esecuzione.

**Google.** Il badge ha uno di tre valori: **Salvato**, **Proviene dalle variabili d'ambiente** (Arriva dall'ambiente; in un'installazione Docker è stata data con il file `.env`) oppure **Mancante**. La sezione mostra i due indirizzi di reindirizzamento da aggiungere in Google Cloud Console (il pannello per sviluppatori di Google). Accanto ci sono i pulsanti di copia. Vanno aggiunti entrambi. Se non si aggiunge l'indirizzo di Analytics, si collega solo Search Console.

Ci sono due campi: **ID client** e **Segreto client**. Entrambi sono parti della chiave di accesso ottenuta da Google. I pulsanti sono: **Salva**, **Annulla**, **Cambia** e **Elimina**. **Elimina** interrompe i collegamenti esistenti. I passaggi dettagliati sono nella guida al collegamento con Google.

**Hizmet hesabı (strada più breve).** L'account di servizio è un account robot creato su Google per l'app. Nel campo **File della chiave dell'account di servizio (JSON)** si incolla il contenuto del file scaricato da Google Cloud. Se è registrato, si vede l'indirizzo e-mail dell'account. La schermata dice dove aggiungere questo indirizzo:

- Search Console: "Impostazioni → Utenti e autorizzazioni → Aggiungi utente", autorizzazione Tam (Completa).
- Analytics: "Amministrazione → Gestione dell'accesso", autorizzazione Görüntüleyen (Visualizzatore).

Il badge dice **Salvato** oppure **Non utilizzato**. Se esiste un account di servizio registrato, l'app lo preferisce alla chiave di accesso a Google. Eliminarlo lo toglie dall'app, ma non revoca la chiave su Google. Se nella sezione **Google** non è inserito l'ID client ma è collegato un account di servizio, il badge della sezione **Google** dice un neutro **Non usato, è collegato un account di servizio** invece del giallo **Mancante**. Google funziona allora con l'account di servizio.

**Test di velocità.** Ci sono il campo **Chiave API** e il pulsante **Prova la chiave**. La prova "consuma 1 misurazione". Si può premere ogni dieci secondi. Il badge dice **Chiave salvata**, **Proveniente da una variabile di ambiente** oppure **Chiave mancante**. I dettagli sono nella guida alla chiave PageSpeed.

**Limiti.** Nelle schede "Limiti di Google e di sistema" ci sono:

- URL Denetimi (Controllo URL, Search Console): 2.000 al giorno.
- PageSpeed Insights.
- Unità di quota giornaliera e oraria di GA4 (Google Analytics): predefinite 200.000 e 40.000. Google non dichiara questo numero, dice solo quanto ne resta.
- Limite di pagine del controllo: 10.000.
- Report per progetto: 10.000, modelli: 10.
- Report più grande: 500.000 byte.

Lo stato di ogni scheda è **Ancora sufficiente**, **In esaurimento** (oltre il 70 per cento usato), **Quasi esaurito** (oltre il 90 per cento usato) oppure **Sconosciuto**.

**Informazioni.** La riga **Versione** mostra la versione installata (per esempio 0.8.0 Alpha). L'interruttore **Controlla aggiornamenti** è attivo per impostazione predefinita. Se è attivo, l'app chiede a GitHub l'ultima versione ogni sei ore. Compare allora anche il pulsante **Controlla ora**. L'app dell'area di notifica del pacchetto Windows fa inoltre un proprio controllo, una volta al giorno. Se c'è una versione nuova, compare il collegamento **Cosa è cambiato** e, per le installazioni Docker, un comando da copiare: `git pull && docker compose up -d --build`. Per il pacchetto Windows la schermata rimanda a **Güncelle** (Aggiorna) nel menu dell'icona nella barra delle applicazioni (quel menu esiste solo in turco). Se l'aggiornamento automatico è attivo, la nuova versione si installa da sola.

Il controllo dice una di queste cose: è uscita una versione nuova, "Hai la versione più recente." oppure un problema. Se GitHub non è raggiungibile, la schermata dice "GitHub non è stato raggiunto durante l'ultimo controllo" e riporta l'ultima versione nota con la data dell'ultimo controllo riuscito. Significa che non si è potuto confermare che la versione sia aggiornata. Controllare la connessione a internet e riprovare. Se la schermata dice "Impossibile raggiungere la fonte delle versioni: il repository non esiste o è privato (GitHub 404)", il problema non è di chi usa l'app. Scaricare il pacchetto di diagnostica dalla schermata **Aiuto** e segnalarlo. Se l'interruttore è spento, la schermata dice "I controlli di aggiornamento sono disattivati, quindi nessuna richiesta viene inviata a GitHub."

**Note sulla versione.** Le note di versione hanno una pagina separata sopra le notifiche nel menu laterale. Le etichette colorate indicano novità, correzioni e modifiche di sicurezza.

## Come si usa

1. Alla prima installazione, inserire nella sezione **Google** l'ID client e la chiave segreta. Poi inserire la chiave PageSpeed nella sezione **Test di velocità**. Una volta salvate entrambe, si passa al progetto e si sceglie la proprietà.
2. Una volta al mese guardare la sezione **Limiti**. La quota che si vede "In esaurimento" è di solito il limite del controllo URL.
3. Nella sezione **Informazioni**, se c'è una versione nuova, aggiornare. Le note di versione dicono che cosa è cambiato. Il controllo degli aggiornamenti è l'unico collegamento in uscita dal computer verso un indirizzo diverso da Google. Per non usarla, disattivare l'interruttore.
4. Se bisogna cambiare la chiave di accesso a Google (per esempio con un nuovo progetto Cloud), fare clic su **Cambia** e incollare i nuovi valori. I collegamenti esistenti non funzionano con la nuova chiave. Nei progetti serve **Riconnetti**.

## Domande frequenti

**Perché la chiave segreta non si vede nella schermata?** L'app la conserva cifrata e non la rimanda al browser. La schermata mostra solo che è registrata e l'ID.

**Se il valore dato con `.env` in Docker e quello inserito nella schermata sono in conflitto?** Vince quello inserito nella schermata. Se si salva un valore mentre il badge dice "Proviene dalle variabili d'ambiente", da quel momento si usa quello.

**Che cosa invia il controllo degli aggiornamenti?** Non invia alcun dato. Legge l'elenco pubblico delle versioni di GitHub. La richiesta è anonima.

**Account di servizio o chiave di accesso a Google?** L'account di servizio non obbliga a passare dalla schermata di consenso e non scade. In cambio, bisogna dare a mano i permessi a quell'account in Search Console e in Analytics. In un'installazione per una sola persona vanno bene entrambi. Se si vede spesso "süresi doldu" (scaduto), passare all'account di servizio.

## Limiti

La schermata Impostazioni non cambia il numero di porta, la cartella dei dati né le impostazioni di rete. Si trovano nel file `config.json` nel pacchetto Windows e nel file `.env` con Docker. Non c'è la gestione di utenti e password: l'app è per un solo utente. Le schede della quota sono il conteggio dell'app stessa, non il contatore reale di Google. I controlli URL fatti a mano in Search Console qui non compaiono, ma consumano il limite di Google.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
