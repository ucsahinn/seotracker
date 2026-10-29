---
title: Risoluzione dei problemi
description: I problemi più comuni, con sintomo, causa e soluzione: porta occupata, avviso di Windows, errori di Google, quota, controllo bloccato, assistente 401.
kind: sorun-giderme
updated: 2026-10-27
---

Se qualcosa non funziona, guardare prima nell'app la scheda "Stato dell'app" della schermata **Aiuto**. La scheda guarda questa installazione in sé e controlla accesso, collegamento con Google, chiave PageSpeed e database. Se dice "N cose richiedono attenzione", il pulsante accanto porta all'impostazione giusta. I problemi qui sotto sono ordinati dal più frequente al più raro.

L'interfaccia dell'app esiste in sei lingue: turco, inglese, tedesco, francese, italiano e portoghese. La lingua si sceglie in Impostazioni → Aspetto → Lingua. In questa guida pulsanti e schermate hanno il nome che portano nell'interfaccia in italiano. Il menu dell'area di notifica di Windows esiste solo in turco. Lì il nome turco è seguito dal significato italiano tra parentesi.

## La pagina non si apre

**Sintomo:** Il browser dice "bağlantı reddedildi" (connessione rifiutata).

**Causa:** L'app non è in funzione.

**Soluzione:** In Windows guardare l'icona nella barra delle applicazioni. Se l'icona non si vede, fare clic sulla freccia ^ nella barra delle applicazioni. Se non c'è, aprire seowatcher dal menu Start. Se l'icona dice "Errore", fare clic con il tasto destro e scegliere **Yeniden başlat** (Riavvia). Con Docker scrivere `docker compose ps`. Se lo stato non è healthy, scrivere `docker compose up -d`.

## Il numero di porta è occupato

**Sintomo:** In Windows, in alto in ogni schermata dell'app compare una striscia gialla: "Questa volta seowatcher è in esecuzione su 3002 perché un altro programma usa 3001 (ad es. una vecchia copia Docker). L'accesso a Google è configurato per 3001; chiudi quel programma e riavvia seowatcher." Il collegamento a Google dà un errore. Oppure l'icona dice "3001 ve sonraki 9 adres numarası (port) dolu" (la porta 3001 e le 9 successive sono occupate). La stessa frase è scritta nella scheda "Stato dell'app" della schermata **Aiuto**. Con Docker compare "Bind for 127.0.0.1:3001 failed".

**Causa:** Un altro programma usa lo stesso numero di porta. La causa più frequente è una vecchia copia di Docker avviata un tempo. Docker Desktop può riavviarla da solo all'avvio del computer. Gli indirizzi di reindirizzamento di Google riportano la 3001, quindi l'accesso a Google non funziona finché l'app è aperta sulla 3002.

**Soluzione:** Il pacchetto Windows di norma sceglie un numero libero tra 3002 e 3010, lo comunica con un fumetto e con la striscia in alto, e lo usa solo per quell'avvio. Chiudere prima il programma che occupa la 3001. Se è una vecchia copia di Docker, fermare il contenitore seotracker in Docker Desktop oppure eseguire `docker compose stop` nella cartella del progetto. Poi scegliere **Yeniden başlat** (Riavvia) nel menu. L'app torna alla 3001 e la striscia scompare. Chiudere la striscia la nasconde solo per quella scheda; non risolve nulla. Se sono tutti occupati, scrivere un altro numero nel file `config.json` della cartella dei dati. Con Docker mettere un `.env` con la riga `PORT=3002` e scrivere `docker compose up -d --force-recreate seotracker`. Quando il numero cambia, aggiornare anche gli indirizzi di reindirizzamento di Google.

## L'icona dice "Windows bileşeni eksik"

**Sintomo:** L'app non si apre. L'icona dice "Windows bileşeni eksik" (Componente di Windows mancante), oppure nel registro compaiono "Workers runtime failed to start" e "0xc0000005".

**Causa:** Il motore dell'app richiede il pacchetto Visual C++ di Microsoft (2015-2022, 64 bit). Su un Windows pulito questo pacchetto manca o è vecchio.

**Soluzione:** Fare clic sul fumetto che compare oppure fare clic con il tasto destro sull'icona e scegliere **Eksik Windows bileşenini kur** (Installa il componente di Windows mancante). Windows chiede una volta il permesso di amministratore. Al termine dell'installazione l'app si riavvia da sola. Se il pacchetto non c'è, scaricarlo dalla pagina di Microsoft: `https://aka.ms/vs/17/release/vc_redist.x64.exe`

## Il permesso di amministratore non è stato dato

**Sintomo:** Durante l'installazione è stato chiesto il permesso per Visual C++, è stato scelto **No**. L'installazione ha riportato "Microsoft Visual C++ çalışma zamanı kurulamadı" (Non è stato possibile installare il runtime Microsoft Visual C++).

**Causa:** Il componente di Windows necessario non è stato installato. Poiché l'app porta con sé una copia dei file che le servono, sulla maggior parte dei computer si avvia comunque.

**Soluzione:** Se l'app si è avviata, non serve fare nulla. Altrimenti fare clic con il tasto destro sull'icona nella barra delle applicazioni (se non si vede, fare clic sulla freccia ^). Scegliere **Eksik Windows bileşenini kur** e questa volta dare il permesso. Oppure scaricare e installare il componente da `https://aka.ms/vs/17/release/vc_redist.x64.exe`.

## L'icona dice "Uygulamanın motoru çöktü"

**Sintomo:** L'app non si apre. Nel registro ci sono "Workers runtime failed to start" e "0xc0000005", ma il pacchetto Visual C++ è installato.

**Causa:** Il motore dell'app (workerd) si blocca su un file di sistema di questo computer. All'avvio l'app prova il motore separatamente. Se dice "Tek başına da başlayamıyor" (Non riesce a partire nemmeno da solo), il problema è nel computer. Se dice "Tek başına çalışıyor" (Da solo funziona), il problema è nella cartella dei dati o nella configurazione.

**Soluzione:** Per prima cosa scegliere **Kurulumu onar** (Ripara l'installazione). Se non si risolve, fare clic con il tasto destro sull'icona e scegliere **Sorunu bildir (GitHub)** (Segnala un problema su GitHub). Le informazioni diagnostiche (versione di Windows, processore, nome del modulo che ha dato errore, file di dump degli arresti anomali) vengono aggiunte da sole alla segnalazione: basta inviarla. I file di dump sono nella cartella `%LOCALAPPDATA%\seowatcher\logs\dumps`. Volendo, aggiungere anche quelli alla segnalazione.

## Windows dice "ha protetto il PC"

**Sintomo:** Il file di installazione non si apre e compare una schermata di avviso blu.

**Causa:** Il file non è firmato. Windows mostra questa schermata per gli autori che non riconosce.

**Soluzione:** Fare clic sul testo **Ulteriori informazioni** nella schermata. Compare il pulsante **Esegui comunque**. Se si hanno dubbi, confrontare l'impronta SHA-256 del file con `SHA256SUMS.txt` nella pagina della versione.

## Google dice "redirect_uri_mismatch"

**Sintomo:** Premendo **Connetti**, Google mostra una pagina di errore.

**Causa:** L'indirizzo di reindirizzamento in Google Cloud Console non è identico a quello dell'app.

**Soluzione:** Con il pulsante di copia nella sezione **Impostazioni → Google** prendere i due indirizzi. In Cloud Console incollarli nel campo degli indirizzi della chiave di accesso a Google (il client OAuth). Fanno differenza localhost e 127.0.0.1, http e https, oppure la barra finale.

## "Chiave di accesso Google mancante"

**Sintomo:** Nelle impostazioni del progetto la scheda Connessioni mostra un avviso giallo.

**Causa:** In **Impostazioni → Google** non sono stati inseriti l'ID client e la chiave segreta. Oppure, con Docker, la chiave di cifratura è più corta di 32 caratteri.

**Soluzione:** Eseguire i passaggi 10 e 11 della guida al collegamento con Google. Con Docker, se `BETTER_AUTH_SECRET` è stata indicata a mano, allungarla. Se la si lascia vuota, l'app la genera da sola.

## Google dice "access_denied"

**Sintomo:** Dopo la schermata di consenso compare l'avviso "iptal edildi" (annullato).

**Causa:** L'account Google usato per l'accesso non è nell'elenco degli utenti di test della schermata di consenso.

**Soluzione:** In Cloud Console, nella sezione **Schermata consenso OAuth → Utenti di test**, aggiungere l'account. Poi scegliere di nuovo **Connetti**.

## Il collegamento è scaduto

**Sintomo:** Nella scheda dei collegamenti c'è scritto "La connessione è scaduta" e non arrivano dati.

**Causa:** Nelle app in stato "Test", Google può ridurre il permesso a sette giorni. Può anche essere cambiata la chiave di cifratura.

**Soluzione:** Nella scheda scegliere **Riconnetti**. Se si ripete spesso, portare la schermata di consenso in produzione oppure passare all'account di servizio (**Impostazioni → Account di servizio**).

## Nessun dato sulle query, grafici vuoti

**Sintomo:** Le schede del Panel (Pannello) sono a zero. Rendimento della ricerca dice "Ancora nessun dato per questo periodo".

**Causa:** Ci sono tre possibilità. Il sito è nuovo e Google non dà ancora impressioni. Oppure Search Console ha tre giorni di ritardo e il periodo scelto è troppo breve. Oppure è stata scelta la proprietà sbagliata.

**Soluzione:** Impostare il periodo su **Ultimi 3 mesi**. Nelle impostazioni del progetto verificare che la proprietà sia il sito giusto. La proprietà di dominio comprende tutti i sottodomini, la proprietà con prefisso URL no. In un sito nuovo le righe delle query possono arrivare dopo settimane. La tabella delle pagine si riempie prima.

## Il totale della tabella non corrisponde alla scheda

**Sintomo:** Sommando le impressioni nella tabella delle pagine si ottiene un numero più grande di quello nella scheda.

**Causa:** Non è un errore. Google conta separatamente ogni pagina che compare nella stessa ricerca. La scheda è il totale del sito.

**Soluzione:** Leggere il totale dalla scheda. Interpretare la tabella pagina per pagina.

## Il controllo è bloccato su "In corso"

**Sintomo:** Da mezz'ora non c'è avanzamento.

**Causa:** L'app può essere stata riavviata oppure l'operazione può essersi interrotta.

**Soluzione:** Attendere. L'app verifica i controlli che risultano "in corso" da più di 15 minuti. Se non c'è segno di vita, li chiude come "Non riuscito" e ne scrive il motivo. Poi scegliere **Esegui di nuovo con le stesse impostazioni**. Non avviare due controlli con la misurazione della velocità nello stesso momento: si rallentano a vicenda.

## Il controllo dice "Il controllo si è interrotto prima di terminare"

**Sintomo:** La schermata del controllo dice "La verifica si è interrotta nella fase «scansione»." oppure "Il controllo si è interrotto prima di terminare." Al posto del punteggio c'è scritto "Controllo incompleto — nessun punteggio".

**Causa:** La schermata dice tre cose: che cosa è successo, se il difetto è del sito o dell'app, e che cosa fare. Il titolo indica la fase in cui si è interrotta: individuazione degli URL, scansione, misurazione della velocità o preparazione dei risultati.

**Soluzione:** Seguire la frase sulla schermata.

- **Un passaggio non è terminato in tempo.** Di solito il sito risponde molto lentamente. Riprovare tra qualche minuto. Se si ripete, avviare con meno pagine.
- **La verifica non è rientrata nella memoria**, **ha superato il tempo di elaborazione** o **il risultato di un passaggio superava le dimensioni che l'app può salvare.** La causa sono pagine molto grandi o complesse. Riavviare con meno pagine.
- **Si è verificato un errore durante la scrittura dei risultati nel database.** Il disco potrebbe essere pieno o il file dei dati bloccato da un altro programma. Controllare che il disco abbia spazio, riavviare l'app e poi la verifica.
- **Il motore interno dei controlli dell'app ha segnalato un errore.** Scegliere **Yeniden başlat** (Riavvia) nel menu dell'area di notifica, poi riavviare la verifica.
- **La verifica è stata interrotta.** L'app potrebbe essere stata chiusa o riavviata a metà. Lasciare l'app aperta e riavviare la verifica.
- **La chiave di installazione non è arrivata alla parte che esegue le verifiche.** Le chiavi Google e PageSpeed salvate non sono state eliminate. Aggiornare o riavviare l'app, poi riavviare la verifica.
- **Un errore imprevisto.** Riavviare la verifica. Se si ripete, scaricare il pacchetto diagnostico dalla schermata **Aiuto** e segnalare il problema.

Il testo grezzo dell'errore non arriva sulla schermata. Resta nel pacchetto diagnostico.

## Il controllo dice "Punteggio provvisorio"

**Sintomo:** Accanto al punteggio non c'è nessuna parola di giudizio. C'è una riga come "Punteggio provvisorio — copertura delle misure 62%".

**Causa:** Una parte importante dei controlli non è stata misurata (la quota di controlli misurati è sotto il 70 per cento, oppure in Scansione, Indicizzazione, Contenuto o Velocità è stata misurata meno della metà dei controlli). Le righe sotto la scheda ne dicono i motivi: la quota PageSpeed era esaurita, manca la chiave PageSpeed, la misurazione della velocità era disattivata o da Search Console non si sono potuti ottenere i dati dell'indice.

**Soluzione:** Attivare la misurazione della velocità, aggiungere una chiave PageSpeed o collegare Search Console, poi eseguire di nuovo la verifica. Il punteggio riguarda ciò che è stato misurato. Sul resto non è stato dato alcun giudizio, né buono né cattivo.

## Il controllo dice "Controllo incompleto — nessun punteggio"

**Sintomo:** Questa frase sta al posto della scheda del punteggio. I risultati restano comunque mostrati sotto.

**Causa:** La verifica si è interrotta per un errore, è ancora in esecuzione oppure la scansione si è interrotta presto a causa del limite di velocità del sito. L'elenco dei problemi è incompleto, quindi non è stato calcolato alcun punteggio. Se non è stato possibile scansionare nessuna pagina, la scheda del punteggio non compare affatto.

**Soluzione:** Leggere il motivo nella sezione sopra. Eseguire di nuovo la verifica quando il limite di velocità si è azzerato o il problema è risolto. I risultati valgono per le pagine scansionate.

## Il controllo è finito ma dice "la misurazione della velocità è stata fatta senza chiave"

**Sintomo:** La verifica è terminata. Un avviso dice "La chiave PageSpeed salvata non è stata letta; la misurazione della velocità è stata fatta senza chiave." La scheda Velocità ha al massimo 50 pagine.

**Causa:** La parte che esegue le verifiche non ha ricevuto la chiave di installazione che apre la chiave salvata, quindi la misurazione della velocità è stata fatta senza. I risultati della scansione non ne risentono.

**Soluzione:** Aggiornare o riavviare l'app, poi avviare una nuova verifica. Se continua, salvare di nuovo la chiave PageSpeed in **Impostazioni**.

## Il controllo dice "Engellendik"

**Sintomo:** Compare un avviso giallo: "Il controllo non è riuscito a scansionare completamente il sito." oppure "N sayfada engellendik." (Siamo stati bloccati in N pagine.)

**Causa:** La protezione anti-bot del sito (Cloudflare o un firewall) ha fermato il crawler dell'app.

**Soluzione:** Nel firewall consentire lo user agent di nome `seotracker-audit` oppure mettere nell'elenco consentito l'indirizzo di rete (IP) del proprio computer. Se il sito non è dell'utente, non c'è nulla da fare. I risultati restano limitati alle pagine che si sono potute scansionare.

## La misurazione della velocità è incompleta o manca

**Sintomo:** La scheda Hız (Velocità) è vuota o ha pochissime righe. La scheda della quota dice "Quota esaurita", "Dakikalık sınır" (Limite al minuto) o "Anahtar yok" (Nessuna chiave).

**Causa:** Manca la chiave PageSpeed (si misurano al massimo 50 pagine). Oppure il limite giornaliero di Google è finito.

**Soluzione:** Ottenere una chiave gratuita seguendo la guida alla chiave PageSpeed. Se il limite giornaliero è finito, si completa domani con un nuovo controllo. Se all'avvio del controllo la misurazione della velocità era disattivata, quel controllo non può più essere misurato in seguito.

## Il controllo URL dice "limite giornaliero raggiunto"

**Sintomo:** Nella scheda Stato dell'indicizzazione il pulsante non funziona. C'è scritto "Google'ın günlük 2.000 adres sınırına ulaşıldı" (Raggiunto il limite giornaliero di 2.000 indirizzi di Google).

**Causa:** Per ogni proprietà ci sono 2.000 richieste al giorno. L'app, l'assistente e i controlli fatti a mano in Search Console consumano la stessa riserva.

**Soluzione:** Continuare domani. L'app richiede di nuovo solo le risposte invecchiate, quindi il limite non va sprecato.

## La scheda o il report di Analytics mostra un errore

**Sintomo:** La scheda del traffico organico nel Pannello, o la schermata Analytics, mostra una frase al posto dei dati, con i pulsanti **Ripristina la connessione** e **Riprova**.

**Causa:** La frase indica causa e soluzione. I casi principali sono questi.

- **Il collegamento è scaduto o è stato revocato.** Ricollegarlo in **Impostazioni**.
- **L'accesso a questa proprietà è stato rifiutato (HTTP 403).** Dare all'account collegato o all'account di servizio almeno il ruolo Visualizzatore sulla proprietà.
- **La proprietà non è stata trovata (HTTP 404).** Può essere stata eliminata o spostata. Sceglierla di nuovo in **Impostazioni**.
- **A questo progetto non è collegata nessuna proprietà.** Sceglierne una in **Impostazioni**.
- **La quota dei report è esaurita (HTTP 429).** La quota si rinnova ogni ora e ogni giorno. Riprovare più tardi.
- **La Google Analytics Data API è disattivata nel progetto Google Cloud.** Attivare "Google Analytics Data API" nella Google Cloud Console e riprovare.
- **Il report non è compatibile con la proprietà scelta (HTTP 400).** Controllare la proprietà o sceglierne un'altra.
- **Google ha restituito una risposta non valida o per ora non risponde.** Riprovare tra poco.
- **Google non è raggiungibile.** Controllare la connessione a internet di questo computer.

**Soluzione:** Fare il passo indicato dalla frase. Di solito **Ripristina la connessione** porta all'impostazione giusta.

## Una richiesta a Search Console mostra un errore

**Sintomo:** Rendimento della ricerca, Opportunità o Monitoraggio del posizionamento mostrano un errore di Search Console al posto dei dati.

**Causa:** La frase di errore indica la causa.

- **La richiesta è stata ritenuta non valida (HTTP 400).** Non è un problema di collegamento. La dimensione, il filtro o il tipo di ricerca scelto non si può usare su questa proprietà. Togliere i filtri.
- **L'accesso alla proprietà è stato rifiutato (HTTP 401 o 403).** Controllare che l'account abbia un'autorizzazione verificata sulla proprietà, oppure rinnovare il collegamento in **Impostazioni**.
- **La proprietà non è stata trovata (HTTP 404).** Può essere stata rimossa da Search Console. Sceglierla di nuovo in **Impostazioni**.
- **Il limite di richieste è esaurito (HTTP 429).** Riprovare tra qualche minuto.
- **Nessuna risposta in tempo.** Riprovare tra poco.
- **Per ora non risponde (altro codice HTTP).** Riprovare tra poco. Se continua, guardare la pagina di stato di Google.
- **Google non è raggiungibile.** La frase dà un dettaglio nella riga "Motivo". Se continua, controllare la connessione a internet di questo computer.

**Soluzione:** Fare il passo indicato dalla frase. Per i problemi di account e proprietà di solito basta rinnovare il collegamento in **Impostazioni**.

## In Analytics compare il traffico di localhost

**Sintomo:** Nella tabella delle pagine di ingresso, nella colonna Alan adı (Dominio) c'è scritto localhost o 127.0.0.1.

**Causa:** Anche la copia di prova del sito carica lo stesso tag di Analytics.

**Soluzione:** Impostare il tag in modo che si carichi solo sul dominio reale. Nella maggior parte degli strumenti c'è un'opzione di "controllo del dominio". L'app non filtra da sola queste righe. Nel frattempo, controllare la colonna Alan adı.

## L'assistente non riesce a collegarsi (401)

**Sintomo:** Claude Code o Codex dicono "Unauthorized".

**Causa:** La password non viene inviata oppure è sbagliata.

**Soluzione:** Copiare di nuovo la password. In Windows è nel file `mcp-token` nella cartella dei dati. Con Docker scrivere `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Eliminare il carattere di fine riga alla fine del valore. Per non usare il terminale, aprire il file con il Blocco note, selezionare tutta la riga e copiarla. Non lasciare il fine riga. In Claude Code scrivere `/mcp` e scegliere **Reconnect** (Ricollega).

## Docker è molto lento al primo avvio oppure risulta "unhealthy"

**Sintomo:** `docker compose ps` non dice healthy nemmeno dopo cinque minuti.

**Causa:** Al primo avvio l'app viene compilata dentro il container e richiede circa 2 GB di memoria. Se la memoria non basta, la compilazione cade.

**Soluzione:** Scrivere `docker compose logs --tail 50` e guardare le ultime righe. Se c'è un errore di memoria, dare più memoria ai container dalle impostazioni di Docker Desktop. Poi scrivere `docker compose up -d --build`.

## Dove sono i dati e i registri?

In Windows tutto è nella cartella `%LOCALAPPDATA%\seowatcher`: `data` (il database), `logs\launcher.log`, `logs\server.log`, `logs\migrate.log`, `instance-secret`, `mcp-token`, `config.json`. Quando un file di registro diventa troppo grande (`server.log` 5 MB, gli altri 1 MB), quello vecchio resta accanto con un nome come `server.old.log` e ne inizia uno nuovo. La cartella `logs\wrangler` contiene i registri dettagliati del motore; i file più vecchi di 30 giorni vengono eliminati automaticamente. Le voci **Günlükleri aç** (Apri i registri) e **Veri klasörünü aç** (Apri la cartella dei dati) del menu della barra delle applicazioni portano lì.

Con Docker i dati stanno nel volume `seotracker_data` (`/app/.wrangler`). I registri si vedono con il comando `docker compose logs -f`.

Per segnalare un problema, selezionare **Scarica il pacchetto diagnostico** nella schermata **Aiuto**. Il pacchetto riepiloga fase ed errori degli ultimi 25 controlli; gli URL delle pagine vengono rimossi dai messaggi PageSpeed. Può contenere nomi di progetti e domini. Controllare il file prima di allegarlo a una segnalazione GitHub.

## Un'impostazione di Windows non si può salvare

**Sintomo:** Cambiando un'opzione nella sezione Windows di **Impostazioni** compare un errore, oppure la sezione dice che le preferenze di Windows non sono disponibili.

**Causa:** Questa sezione parla con l'app nella barra delle applicazioni. La frase di errore dice quale di questi casi è.

- **L'app nell'area di notifica non ha risposto entro 4 secondi.** Se il computer si è appena riattivato, premere **Riprova** dopo qualche secondo. Se persiste, scegliere **Çıkış** (Esci) nel menu dell'area di notifica e riaprire l'app.
- **Impossibile connettersi al servizio impostazioni dell'app nell'area di notifica.** L'app potrebbe essersi chiusa. Riaprire seowatcher dal menu Start.
- **Questa impostazione è bloccata da un amministratore.** Solo l'amministratore del computer può modificarla.
- **L'app nell'area di notifica non ha riconosciuto questa richiesta.** Server e app potrebbero provenire da sessioni diverse. Scegliere **Çıkış** (Esci) nel menu e riaprire l'app.
- **L'app nell'area di notifica ha rifiutato la richiesta.** Riavviare l'app dal menu. Se persiste, aggiornare il pacchetto Windows.
- **L'app nell'area di notifica ha restituito una risposta non riconosciuta.** Le versioni potrebbero non corrispondere. Aggiornare il pacchetto Windows.

**Soluzione:** Fare il passo indicato dalla frase. Queste opzioni esistono solo nel pacchetto Windows. Con Docker il comportamento all'avvio si gestisce dal sistema operativo.

## Avvisi dell'avvio

Gli avvisi che compaiono nell'icona della barra delle applicazioni e che cosa fare:

- **"Sunucu 120 saniyede yanıt vermedi" (Il server non ha risposto in 120 secondi).** Dal menu scegliere **Yeniden başlat**. Se non basta, scegliere **Günlükleri aç** e guardare le ultime righe di `server.log`.
- **"seowatcher yeniden başlatılıyor" (seowatcher si sta riavviando).** Il server si è chiuso da solo e l'app lo sta riaprendo. Aggiornare la pagina aperta dopo qualche secondo.
- **"Sunucu 10 dakikada üç kez kapandı" (Il server si è chiuso tre volte in 10 minuti).** L'app ha smesso di riaprirlo. Scegliere **Kurulumu onar** e, se non basta, **Sorunu bildir (GitHub)**.
- **"Kurulum eksik" (Installazione incompleta).** **Kurulumu onar** rimette i file mancanti scaricando il file di installazione. Se non c'è internet, si apre la pagina delle versioni; scaricare il file di installazione ed eseguirlo.
- **"3001 numarası dolu, 3002 kullanılıyor" (La porta 3001 è occupata, si usa la 3002).** Un altro programma occupa la 3001, spesso una vecchia copia di Docker. Lo stesso avviso compare anche come striscia gialla nell'app. Se si riceve un errore collegandosi a Google, chiudere quel programma e scegliere **Yeniden başlat**. Vedere sopra "Il numero di porta è occupato".
- **"Güncelleme denetlenemedi" (Impossibile controllare l'aggiornamento) oppure "Güncelleme yapılamadı" (Aggiornamento non riuscito).** Il fumetto indica il motivo. Se dice "GitHub'a ulaşılamadı" (GitHub non raggiungibile), controllare la connessione a Internet. Se dice "GitHub şu an çok fazla istek alıyor" (GitHub sta ricevendo troppe richieste in questo momento), riprovare tra un'ora. Se l'impronta non corrisponde, scaricare il file di installazione dalla pagina delle versioni. In ogni caso la versione installata continua a funzionare.
- **"Güncelleme kurulmadı" (Aggiornamento non installato).** La finestra di installazione è stata chiusa oppure non è stato dato il permesso di amministratore. Riprovare dal menu con **Güncelle**.
- **"Windows bileşeni kurulamadı" (Componente di Windows non installato).** Dal menu scegliere **Eksik Windows bileşenini kur**.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
