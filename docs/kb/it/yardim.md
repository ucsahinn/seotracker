---
title: Aiuto
description: Il primo posto da controllare quando qualcosa non funziona: stato dell'installazione, problemi comuni e pacchetto diagnostico.
screen: Yardım
route: /support
updated: 2026-10-27
---

La schermata controlla l'installazione, indica che cosa manca e porta all'impostazione da correggere. Controlla solo l'installazione: i problemi del sito si cercano in **Controllo del sito**, quelli lato Google in **Stato dell'indicizzazione**.

## Lingua dell'interfaccia

L'app è disponibile in sei lingue: turco, inglese, tedesco, francese, italiano e portoghese. La lingua si sceglie in **Impostazioni → Aspetto → Lingua**. In questa guida pulsanti e schermate hanno il nome dell'interfaccia italiana. Il menu dell'area di notifica di Windows esiste solo in turco: in questa guida il nome turco è seguito dalla traduzione tra parentesi.

## Che cosa contiene la schermata

**Azioni rapide** raccoglie i pulsanti in alto:

- **Controlla di nuovo lo stato**: aggiorna la scheda dello stato.
- **Scarica il pacchetto diagnostico**: scarica il file da allegare a una segnalazione. Non contiene valori segreti.
- **Apri la guida**: apre questa guida su seowatcher.io.
- **seowatcher.io**: apre il sito, con la pagina di download e la guida.
- **Note sulla versione**: apre la schermata delle note di versione (`/release-notes`).
- **Configurazione dell'agente**: apre la schermata per collegare un agente.

**Stato dell'app** verifica accesso, collegamento a Google, chiave PageSpeed, ambiente di esecuzione e database dell'installazione. Un controllo riuscito non garantisce un sito senza errori né dati Google aggiornati. Le impostazioni che non è stato possibile leggere non risultano verificate. Versione e ora del controllo identificano il risultato. **Copia riepilogo** copia lo stato come testo; **Apri le connessioni** porta alle connessioni del progetto.

**Progetti** mostra, per ogni progetto, lo stato del collegamento con Search Console e Analytics.

**Problemi comuni** contiene sei voci espandibili, ognuna con la soluzione e il link all'impostazione:

- La pagina non si apre o l'app non è in esecuzione
- La porta è in uso
- Il mio agente non riesce a connettersi (401)
- La misurazione della velocità si interrompe a metà (429)
- Nessun dato di query, grafici vuoti
- Ho cambiato un'impostazione e l'app non la vede

**Mostra limiti** indica a che punto sono i limiti giornalieri di Google.

In fondo alla pagina ci sono i collegamenti ai registri e all'**Endpoint di stato** (`/api/health`). Nel pacchetto Windows i registri si aprono anche con **Günlükleri aç** (Apri i registri) nel menu dell'area di notifica; con Docker si usa il comando copiato da **Copia comando**.

### Avviso sulla porta

Se un altro programma occupa la porta 3001 (per esempio una vecchia copia Docker), il pacchetto Windows si avvia su un'altra porta. In quel caso, in cima a ogni schermata compare una striscia gialla: "Questa volta seowatcher è in esecuzione su 3002 perché un altro programma usa 3001 (ad es. una vecchia copia Docker). L'accesso a Google è configurato per 3001; chiudi quel programma e riavvia seowatcher." La stessa frase compare nella scheda **Stato dell'app**, nel caso la notifica di Windows sia sfuggita.

L'accesso a Google rimanda sempre alla porta 3001, quindi non riesce se l'app è aperta sulla 3002. Per risolvere, chiuda il programma che occupa la 3001 e scelga **Yeniden başlat** (Riavvia) nel menu dell'area di notifica: l'app torna sulla 3001 e la striscia scompare. La X a destra della striscia la nasconde solo in questa scheda del browser.

## Procedura

1. Apra questa schermata e legga l'avviso nella scheda **Stato dell'app**.
2. Prema il pulsante accanto all'avviso, che porta all'impostazione da correggere. Apporti la modifica, torni qui e scelga **Controlla di nuovo lo stato**.
3. Se i controlli dell'installazione riescono ma il problema resta, consulti **Problemi comuni** e la schermata del progetto interessata.
4. Se il problema persiste, scelga **Scarica il pacchetto diagnostico** e alleghi il file alla segnalazione su GitHub. Nel pacchetto Windows, **Sorunu bildir (GitHub)** (Segnala un problema su GitHub) nel menu dell'area di notifica fa lo stesso con un clic.

## Domande frequenti

**Perché la riga dell'accesso a Google è gialla?** Non è ancora stata salvata una credenziale Google. La riga resta gialla finché Google non è collegato; segua la guida [Collegamento con Google](/docs/google-baglantisi/).

**La riga dell'accesso indica "utente singolo, senza password".** È normale: l'app si apre solo da questo computer. Per renderla raggiungibile dall'esterno occorre anteporle un proprio accesso protetto da password.

**Che cosa contiene il pacchetto diagnostico?** Versione, controlli dell'installazione, numero di righe delle tabelle e riepiloghi di fase ed errore degli ultimi 25 controlli del sito. Gli errori PageSpeed sono riepilogati senza gli URL delle pagine. Chiavi segrete e password sono escluse; possono comparire nomi dei progetti, domini e ID delle proprietà Google. Controlli i file prima di inviarli.

## Quale schermata usare

- Il [Pannello](/docs/panel/) riassume configurazione e dati del progetto scelto.
- [Opportunità](/docs/firsatlar/) aiuta a scegliere il lavoro a partire dai dati di Search Console.
- [Monitoraggio del posizionamento](/docs/siralama-takibi/) segue la posizione media delle query nell'archivio locale dei dati Google, non i risultati di ricerca in tempo reale.

Se mancano dati, controlli le connessioni del progetto, il periodo scelto e gli avvisi sulla copertura: lo stato dell'installazione non verifica questi report. Nei siti con poco traffico Google nasconde alcune query, quindi l'elenco può essere vuoto o mostrare meno clic dei totali per pagina. Questo, da solo, non indica un problema di connessione.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/quotas/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
