---
title: Risoluzione dei problemi
description: I problemi più comuni, con sintomo, causa e soluzione: porta occupata, avviso di Windows, errori di Google, quota, controllo bloccato, assistente 401.
kind: sorun-giderme
updated: 2026-10-23
---

L'interfaccia dell'app è disponibile in turco e in inglese. La lingua si sceglie in Ayarlar → Görünüm → Dil. In questa guida ogni nome di pulsante e di schermata è riportato in turco, con il significato italiano tra parentesi.

Se qualcosa non funziona, guardare prima nell'app la scheda "Kurulumunuzun durumu" (Stato dell'installazione) della schermata **Yardım** (Aiuto). La scheda controlla accesso, collegamento con Google, chiave PageSpeed e database. Se dice "N şey dikkat istiyor" (N cose richiedono attenzione), il pulsante accanto porta all'impostazione giusta. I problemi qui sotto sono ordinati dal più frequente al più raro.

## La pagina non si apre

**Sintomo:** Il browser dice "bağlantı reddedildi" (connessione rifiutata).

**Causa:** L'app non è in funzione.

**Soluzione:** In Windows guardare l'icona nella barra delle applicazioni. Se l'icona non si vede, fare clic sulla freccia ^ nella barra delle applicazioni. Se non c'è, aprire seowatcher dal menu Start. Se l'icona dice "Hata" (Errore), fare clic con il tasto destro e scegliere **Yeniden başlat** (Riavvia). Con Docker scrivere `docker compose ps`. Se lo stato non è healthy, scrivere `docker compose up -d`.

## Il numero di porta è occupato

**Sintomo:** In Windows l'icona dice "3001 ve sonraki 9 adres numarası (port) dolu" (la porta 3001 e le 9 successive sono occupate). Con Docker compare "Bind for 127.0.0.1:3001 failed".

**Causa:** Un altro programma usa lo stesso numero di porta.

**Soluzione:** Il pacchetto Windows di norma sceglie un numero libero tra 3002 e 3010, lo comunica con un fumetto e lo usa solo per quell'avvio. Quando la 3001 torna libera, scegliere **Yeniden başlat** e l'app torna alla 3001. Se sono tutti occupati, scrivere un altro numero nel file `config.json` della cartella dei dati. Con Docker mettere un `.env` con la riga `PORT=3002` e scrivere `docker compose up -d --force-recreate seotracker`. Quando il numero cambia, aggiornare anche gli indirizzi di reindirizzamento di Google.

## L'icona dice "Windows bileşeni eksik"

**Sintomo:** L'app non si apre. L'icona dice "Windows bileşeni eksik" (Componente di Windows mancante), oppure nel registro compaiono "Workers runtime failed to start" e "0xc0000005".

**Causa:** Il motore dell'app richiede il pacchetto Visual C++ di Microsoft (2015-2022, 64 bit). Su un Windows pulito questo pacchetto manca o è vecchio.

**Soluzione:** Fare clic sul fumetto che compare oppure fare clic con il tasto destro sull'icona e scegliere **Eksik Windows bileşenini kur** (Installa il componente di Windows mancante). Windows chiede una volta il permesso di amministratore. Al termine dell'installazione l'app si riavvia da sola. Se il pacchetto non c'è, scaricarlo dalla pagina di Microsoft: `https://aka.ms/vs/17/release/vc_redist.x64.exe`

## Il permesso di amministratore non è stato dato

**Sintomo:** Durante l'installazione è stato chiesto il permesso per Visual C++, è stato scelto **Hayır** (No). L'installazione ha riportato "Microsoft Visual C++ çalışma zamanı kurulamadı" (Non è stato possibile installare il runtime Microsoft Visual C++).

**Causa:** Il componente di Windows necessario non è stato installato. Poiché l'app porta con sé una copia dei file che le servono, sulla maggior parte dei computer si avvia comunque.

**Soluzione:** Se l'app si è avviata, non serve fare nulla. Altrimenti fare clic con il tasto destro sull'icona nella barra delle applicazioni (se non si vede, fare clic sulla freccia ^). Scegliere **Eksik Windows bileşenini kur** e questa volta dare il permesso. Oppure scaricare e installare il componente da `https://aka.ms/vs/17/release/vc_redist.x64.exe`.

## L'icona dice "Uygulamanın motoru çöktü"

**Sintomo:** L'app non si apre. Nel registro ci sono "Workers runtime failed to start" e "0xc0000005", ma il pacchetto Visual C++ è installato.

**Causa:** Il motore dell'app (workerd) si blocca su un file di sistema di questo computer. All'avvio l'app prova il motore separatamente. Se dice "Tek başına da başlayamıyor" (Non riesce a partire nemmeno da solo), il problema è nel computer. Se dice "Tek başına çalışıyor" (Da solo funziona), il problema è nella cartella dei dati o nella configurazione.

**Soluzione:** Per prima cosa scegliere **Kurulumu onar** (Ripara l'installazione). Se non si risolve, fare clic con il tasto destro sull'icona e scegliere **Sorunu bildir (GitHub)** (Segnala un problema su GitHub). Le informazioni diagnostiche (versione di Windows, processore, nome del modulo che ha dato errore, file di dump degli arresti anomali) vengono aggiunte da sole alla segnalazione: basta inviarla. I file di dump sono nella cartella `%LOCALAPPDATA%\seowatcher\logs\dumps`. Volendo, aggiungere anche quelli alla segnalazione.

## Windows dice "ha protetto il PC"

**Sintomo:** Il file di installazione non si apre e compare una schermata di avviso blu.

**Causa:** Il file non è firmato. Windows mostra questa schermata per gli autori che non riconosce.

**Soluzione:** Fare clic sul testo **Daha fazla bilgi** (Maggiori informazioni) nella schermata. Compare il pulsante **Yine de çalıştır** (Esegui comunque). Se si hanno dubbi, confrontare l'impronta SHA-256 del file con `SHA256SUMS.txt` nella pagina della versione.

## Google dice "redirect_uri_mismatch"

**Sintomo:** Premendo **Bağlan** (Collega), Google mostra una pagina di errore.

**Causa:** L'indirizzo di reindirizzamento in Google Cloud Console non è identico a quello dell'app.

**Soluzione:** Con il pulsante di copia nella sezione **Ayarlar → Google** (Impostazioni → Google) prendere i due indirizzi. In Cloud Console incollarli nel campo degli indirizzi della chiave di accesso a Google (il client OAuth). Fanno differenza localhost e 127.0.0.1, http e https, oppure la barra finale.

## "Google erişim anahtarı eksik"

**Sintomo:** Nelle impostazioni del progetto la scheda Bağlantılar (Collegamenti) mostra un avviso giallo.

**Causa:** In **Ayarlar → Google** non sono stati inseriti l'ID client e la chiave segreta. Oppure, con Docker, la chiave di cifratura è più corta di 32 caratteri.

**Soluzione:** Eseguire i passaggi 10 e 11 della guida al collegamento con Google. Con Docker, se `BETTER_AUTH_SECRET` è stata indicata a mano, allungarla. Se la si lascia vuota, l'app la genera da sola.

## Google dice "access_denied"

**Sintomo:** Dopo la schermata di consenso compare l'avviso "iptal edildi" (annullato).

**Causa:** L'account Google usato per l'accesso non è nell'elenco degli utenti di test della schermata di consenso.

**Soluzione:** In Cloud Console, nella sezione **OAuth izin ekranı → Test kullanıcıları** (Schermata di consenso OAuth → Utenti di test), aggiungere l'account. Poi scegliere di nuovo **Bağlan**.

## Il collegamento è scaduto

**Sintomo:** Nella scheda dei collegamenti c'è scritto "Bağlantının süresi doldu" (Il collegamento è scaduto) e non arrivano dati.

**Causa:** Nelle app in stato "Test", Google può ridurre il permesso a sette giorni. Può anche essere cambiata la chiave di cifratura.

**Soluzione:** Nella scheda scegliere **Yeniden bağlan** (Ricollega). Se si ripete spesso, portare la schermata di consenso in produzione oppure passare all'account di servizio (**Ayarlar → Hizmet hesabı**).

## Nessun dato sulle query, grafici vuoti

**Sintomo:** Le schede del Panel (Pannello) sono a zero. Arama performansı (Prestazioni di ricerca) dice "Bu dönem için henüz veri yok" (Ancora nessun dato per questo periodo).

**Causa:** Ci sono tre possibilità. Il sito è nuovo e Google non dà ancora impressioni. Oppure Search Console ha tre giorni di ritardo e il periodo scelto è troppo breve. Oppure è stata scelta la proprietà sbagliata.

**Soluzione:** Impostare il periodo su **Son 3 ay** (Ultimi 3 mesi). Nelle impostazioni del progetto verificare che la proprietà sia il sito giusto. La proprietà di dominio comprende tutti i sottodomini, la proprietà con prefisso URL no. In un sito nuovo le righe delle query possono arrivare dopo settimane. La tabella delle pagine si riempie prima.

## Il totale della tabella non corrisponde alla scheda

**Sintomo:** Sommando le impressioni nella tabella delle pagine si ottiene un numero più grande di quello nella scheda.

**Causa:** Non è un errore. Google conta separatamente ogni pagina che compare nella stessa ricerca. La scheda è il totale del sito.

**Soluzione:** Leggere il totale dalla scheda. Interpretare la tabella pagina per pagina.

## Il controllo è bloccato su "Sürüyor"

**Sintomo:** Da mezz'ora non c'è avanzamento.

**Causa:** L'app può essere stata riavviata oppure l'operazione può essersi interrotta.

**Soluzione:** Attendere. L'app verifica i controlli che risultano "sürüyor" (in corso) da più di 15 minuti. Se non c'è segno di vita, li chiude come "Başarısız" (Fallito) e ne scrive il motivo. Poi scegliere **Aynı ayarlarla yeniden başlat** (Riavvia con le stesse impostazioni). Non avviare due controlli con la misurazione della velocità nello stesso momento: si rallentano a vicenda.

## Il controllo dice "Engellendik"

**Sintomo:** Compare un avviso giallo: "Denetim bu siteyi tamamen tarayamadı." (Il controllo non è riuscito a scansionare tutto il sito.) oppure "N sayfada engellendik." (Siamo stati bloccati in N pagine.)

**Causa:** La protezione anti-bot del sito (Cloudflare o un firewall) ha fermato il crawler dell'app.

**Soluzione:** Nel firewall consentire lo user agent di nome `seotracker-audit` oppure mettere nell'elenco consentito l'indirizzo di rete (IP) del proprio computer. Se il sito non è dell'utente, non c'è nulla da fare. I risultati restano limitati alle pagine che si sono potute scansionare.

## La misurazione della velocità è incompleta o manca

**Sintomo:** La scheda Hız (Velocità) è vuota o ha pochissime righe. La scheda della quota dice "Kota doldu" (Quota esaurita), "Dakikalık sınır" (Limite al minuto) o "Anahtar yok" (Nessuna chiave).

**Causa:** Manca la chiave PageSpeed (si misurano al massimo 50 pagine). Oppure il limite giornaliero di Google è finito.

**Soluzione:** Ottenere una chiave gratuita seguendo la guida alla chiave PageSpeed. Se il limite giornaliero è finito, si completa domani con un nuovo controllo. Se all'avvio del controllo la misurazione della velocità era disattivata, quel controllo non può più essere misurato in seguito.

## Il controllo URL dice "limite giornaliero raggiunto"

**Sintomo:** Nella scheda Dizin durumu (Stato dell'indice) il pulsante non funziona. C'è scritto "Google'ın günlük 2.000 adres sınırına ulaşıldı" (Raggiunto il limite giornaliero di 2.000 indirizzi di Google).

**Causa:** Per ogni proprietà ci sono 2.000 richieste al giorno. L'app, l'assistente e i controlli fatti a mano in Search Console consumano la stessa riserva.

**Soluzione:** Continuare domani. L'app richiede di nuovo solo le risposte invecchiate, quindi il limite non va sprecato.

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

Quando si segnala un problema, premere il pulsante **Tanılama paketi indir** (Scarica il pacchetto diagnostico) della schermata **Yardım**. Il file contiene versione, controlli dell'installazione e gli ultimi 25 controlli, nessun dato segreto. Aggiungere il file alla segnalazione su GitHub.

## Avvisi dell'avvio

Gli avvisi che compaiono nell'icona della barra delle applicazioni e che cosa fare:

- **"Sunucu 120 saniyede yanıt vermedi" (Il server non ha risposto in 120 secondi).** Dal menu scegliere **Yeniden başlat**. Se non basta, scegliere **Günlükleri aç** e guardare le ultime righe di `server.log`.
- **"seowatcher yeniden başlatılıyor" (seowatcher si sta riavviando).** Il server si è chiuso da solo e l'app lo sta riaprendo. Aggiornare la pagina aperta dopo qualche secondo.
- **"Sunucu 10 dakikada üç kez kapandı" (Il server si è chiuso tre volte in 10 minuti).** L'app ha smesso di riaprirlo. Scegliere **Kurulumu onar** e, se non basta, **Sorunu bildir (GitHub)**.
- **"Kurulum eksik" (Installazione incompleta).** **Kurulumu onar** rimette i file mancanti scaricando il file di installazione. Se non c'è internet, si apre la pagina delle versioni; scaricare il file di installazione ed eseguirlo.
- **"3001 numarası dolu, 3002 kullanılıyor" (La porta 3001 è occupata, si usa la 3002).** Un altro programma occupa la 3001. Se si riceve un errore collegandosi a Google, chiudere quel programma e scegliere **Yeniden başlat**.
- **"Güncelleme denetlenemedi" (Impossibile controllare l'aggiornamento) oppure "Güncelleme yapılamadı" (Aggiornamento non riuscito).** Il fumetto indica il motivo. Se dice "GitHub'a ulaşılamadı" (GitHub non raggiungibile), controllare la connessione a Internet. Se dice "GitHub şu an çok fazla istek alıyor" (GitHub sta ricevendo troppe richieste in questo momento), riprovare tra un'ora. Se l'impronta non corrisponde, scaricare il file di installazione dalla pagina delle versioni. In ogni caso la versione installata continua a funzionare.
- **"Güncelleme kurulmadı" (Aggiornamento non installato).** La finestra di installazione è stata chiusa oppure non è stato dato il permesso di amministratore. Riprovare dal menu con **Güncelle**.
- **"Windows bileşeni kurulamadı" (Componente di Windows non installato).** Dal menu scegliere **Eksik Windows bileşenini kur**.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
