---
title: Aiuto
description: Se qualcosa va storto, guardare prima qui: controlla l'installazione, propone soluzioni ai problemi comuni e prepara il file per la segnalazione.
screen: Yardım
route: /support
updated: 2026-10-27
---

L'interfaccia dell'app esiste in sei lingue: turco, inglese, tedesco, francese, italiano e portoghese. La lingua si sceglie in Impostazioni → Aspetto → Lingua. In questa guida pulsanti e schermate hanno il nome che portano nell'interfaccia in italiano. Il menu dell'area di notifica di Windows esiste solo in turco. Lì il nome turco è seguito dal significato italiano tra parentesi.

Se qualcosa va storto, guardare prima qui. La schermata controlla l'installazione, dice che cosa manca e porta all'impostazione giusta.

## Cosa c'è nella schermata

**Azioni rapide**. I pulsanti in alto:

- **Controlla di nuovo lo stato**: aggiorna la scheda qui sotto.
- **Scarica il pacchetto diagnostico**: scarica il file da inviare quando si segnala un problema. Non contiene valori segreti.
- **Apri la guida**: apre la guida su seowatcher.io.
- **seowatcher.io**: apre il sito dell'app, dove ci sono la pagina di download e la guida.
- **Note sulla versione**: porta alle note di versione in Impostazioni.
- **Copia prompt di configurazione**: copia il testo di configurazione da incollare nell'assistente di intelligenza artificiale (nell'app chiamato "l’agente").
- **Configurazione dell’agente**: porta alla schermata del collegamento con l'assistente.

**Stato dell'app.** La scheda guarda questa installazione in sé. La checklist di configurazione di un progetto sta nel Pannello e in Info progetto, non qui. La scheda controlla quattro cose: **Accesso e autorizzazioni**, **Accesso a Google**, **Chiave PageSpeed**, **Database**. In alto c'è scritto "Sembra tutto a posto." oppure "N cose richiedono attenzione.". Sotto compaiono la riga della versione, "Sürüm X, güncel." (Versione X, aggiornata) oppure "yeni sürüm Y var" (c'è una nuova versione Y), e l'ora dell'ultimo controllo. Il pulsante accanto a una riga con problemi porta all'impostazione giusta: **Apri Impostazioni** oppure **Inserisci chiave**. **Copia riepilogo** mette il testo della scheda negli appunti.

**Avviso sul numero di porta.** Se il pacchetto Windows si apre su un altro numero di porta perché un altro programma occupa la 3001 (per esempio una vecchia copia di Docker), in alto in ogni schermata dell'app compare una striscia gialla: "Questa volta seowatcher è in esecuzione su 3002 perché un altro programma usa 3001 (ad es. una vecchia copia Docker). L'accesso a Google è configurato per 3001; chiudi quel programma e riavvia seowatcher." La striscia c'è nel caso in cui la notifica nella barra delle applicazioni sia sfuggita. L'accesso a Google torna all'indirizzo 3001 e fallisce se l'app è stata aperta su 3002. Il pulsante di chiusura a destra della striscia la nasconde per questa scheda. La stessa frase è scritta anche nella scheda **Stato dell'app**. Per risolvere, chiudere il programma che occupa la 3001, poi scegliere **Yeniden başlat** (Riavvia) nel menu dell'area di notifica. L'app torna sulla 3001 e la striscia scompare. Se nessun altro programma la usa, l'app torna comunque sulla 3001 al prossimo avvio.

**Progetti**. Si vede lo stato del collegamento di ogni progetto con Search Console e Analytics. **Apri le connessioni** porta alle impostazioni del progetto.

**Problemi comuni.** Ci sono sei voci espandibili: la pagina non si apre o l'app non è in esecuzione, la porta è in uso, il mio agente non riesce a connettersi (401), la misurazione della velocità si interrompe a metà (429), nessun dato di query e ho cambiato un'impostazione e l'app non la vede. In ciascuna è scritto che cosa fare, con il collegamento all'impostazione corrispondente.

**Limiti di Google e di sistema**. Con **Mostra limiti** si vede a che punto si è dei limiti giornalieri di Google.

**Elenco in fondo.** Ci sono scorciatoie verso i file di registro e verso l'indirizzo di stato (`/api/health`). Nel pacchetto Windows i registri si aprono con **Günlükleri aç** (Apri i registri) nel menu della barra delle applicazioni. Con Docker si usa il comando indicato da **Copia comando**.

## Come si usa

1. Se qualcosa non funziona, aprire prima questa schermata e leggere l'avviso nella scheda.
2. Premere il pulsante accanto all'avviso: porta all'impostazione giusta. Fare la modifica, tornare e scegliere **Controlla di nuovo lo stato**.
3. Se la scheda dice "Sembra tutto a posto." ma il problema continua, guardare i titoli di **Problemi comuni**.
4. Se ancora non si risolve, scegliere **Scarica il pacchetto diagnostico** e aggiungere il file alla segnalazione su GitHub. Nel pacchetto Windows, **Sorunu bildir (GitHub)** (Segnala un problema su GitHub) nel menu della barra delle applicazioni fa lo stesso con un solo clic.

## Domande frequenti

**Perché la riga "Accesso a Google" è gialla?** Non è ancora stata inserita una chiave di accesso a Google. La riga resta gialla finché Google non è collegato. Seguire la guida al collegamento con Google.

**Nella riga "Accesso e autorizzazioni" c'è scritto "utente singolo, senza password".** È normale. L'app si apre solo dal proprio computer. Per aprirla all'esterno bisogna metterle davanti un proprio accesso protetto da password.

**Che cosa c'è nel pacchetto diagnostico?** La versione, i controlli dell'installazione, il numero di righe delle tabelle e i riepiloghi di fase ed errore degli ultimi 25 controlli. Gli errori PageSpeed sono riepilogati senza gli URL delle pagine. Chiavi segrete e password sono escluse; possono comparire nomi dei progetti, domini e ID delle proprietà Google. Controllare i file prima di inviarli.

## Limiti

La schermata controlla solo l'installazione stessa. Per trovare un problema nel sito, guardare la schermata Controllo del sito; per vedere un problema dal lato di Google, la schermata Stato dell'indicizzazione.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/support/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
