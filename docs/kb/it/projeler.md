---
title: Progetti
description: Si crea un progetto, si sceglie sito e paese, si cambia il nome e si gestisce il collegamento con Google. Un progetto si può archiviare e ripristinare.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-27
---

Si apre un progetto, se ne cambiano le impostazioni e, se serve, lo si rimuove. Ogni sito è un progetto. Ogni progetto ha il proprio collegamento con Google, i propri controlli e i propri report.

## Cosa c'è nella schermata

**Selettore dei progetti.** Facendo clic sul nome del progetto in alto a sinistra si apre l'elenco dei progetti. In fondo ci sono **Nuovo progetto** e **Gestisci progetti**. L'icona a forma di ingranaggio accanto apre **Impostazioni progetto**. Con otto o più progetti compare nell'elenco una casella di ricerca.

**Pagina dei progetti.** Ogni riga mostra il nome del progetto e il suo sito. Un progetto senza sito dice "Nessun sito aggiunto". Se i progetti sono più di uno, quello aperto ha l'etichetta **Attivo**. Sotto ogni riga c'è un breve riepilogo del progetto: i clic degli ultimi 28 giorni e la variazione rispetto ai 28 precedenti (con una piccola linea), il momento dell'ultimo controllo ("Ultimo audit 3 giorni fa" oppure "Ancora nessun controllo") e se Search Console e Analytics sono collegati. Un punto pieno significa collegato, un punto vuoto non collegato. Il numero di clic viene dall'archivio di questo computer. Se l'archivio non ha dati di ricerca, c'è scritto "Nessun dato di ricerca nell'archivio". Passando sopra il numero si vedono le date che copre. Un clic sulla riga apre il progetto. Il pulsante **Impostazioni** a destra apre le impostazioni del progetto. Per un progetto senza sito il pulsante dice **Aggiungi sito**. I progetti archiviati stanno in fondo, nella sezione **Archiviato**. Con **Ripristina** tornano nell'elenco.

**Finestra del nuovo progetto.** Ha quattro campi:

- **Nome** è obbligatorio. Lo vede solo l'utente: compare nel titolo dei report e nel selettore dei progetti. Non va a Google.
- **Dominio, facoltativo** è l'indirizzo del sito, per esempio `example.com`. Il `https://` e il `www.` iniziali vengono tolti da soli. I sottodomini sono ricondotti al dominio principale: `blog.example.com` ed `example.com` sono lo stesso progetto.
- **Paese** e **Lingua** stabiliscono per quale mercato vengono monitorate le parole chiave salvate. Quando si cambia il paese, la lingua passa a quella del paese. Entrambi si possono cambiare in seguito.

**Impostazioni del progetto.** Ci sono due schede. La scheda **Generale** contiene nome, dominio, paese e lingua, e la sezione **Archivia progetto**. La scheda **Connessioni** contiene le schede di Search Console e di Analytics.

## Come si usa

1. Nel selettore dei progetti scegliere **Nuovo progetto**.
2. Scrivere un nome, inserire l'indirizzo del sito, scegliere paese e lingua e premere **Crea progetto**. Il progetto si apre e compare il Panel (Pannello). Non viene ancora scaricato alcun dato.
3. Passare a **Impostazioni progetto → Connessioni** e collegare Search Console. I passaggi sono nella guida al collegamento con Google. Una volta collegato, Panel, Rendimento della ricerca, Opportunità e Stato dell'indicizzazione cominciano a riempirsi.
4. Per collegare anche Analytics, usare la scheda **Analytics** nella stessa pagina. Non serve un'altra chiave di Google.
5. Per cambiare il nome o il sito, correggere il campo nella scheda **Generale** e premere **Salva modifiche**. Il pulsante si attiva solo quando qualcosa è cambiato.

### Cambiare il collegamento con Google

Nella scheda della pagina **Connessioni** premere **Cambia proprietà o account**. Si può scegliere un altro sito (per Google, una "proprietà") o un altro account Google. **Disconnetti** rimuove solo il collegamento di questo progetto. L'account Google resta registrato e non viene chiesta alcuna conferma. Per rimuovere del tutto un account Google, usare **Rimuovi account** nella finestra di scelta. La finestra indica quali progetti saranno interessati.

### Archiviare un progetto

I progetti non si eliminano, si archiviano. Il pulsante **Archivia progetto** in fondo alla scheda **Generale** toglie il progetto dall'elenco. Controlli, parole chiave e report restano come sono. **Ripristina** nella pagina dei progetti riporta il progetto esattamente com'era. Se si ha un solo progetto, non si può archiviare.

## Come si calcolano i numeri

In questa schermata non ci sono numeri. Quando si salva il dominio valgono queste regole: spazi e lettere maiuscole vengono ripuliti e l'indirizzo deve essere un vero nome di dominio (non sono accettati indirizzi IP, `localhost` o estensioni inventate). Se si inserisce un valore errato, compare l'avviso "Inserisci un dominio valido, ad esempio acme.com.".

## Domande frequenti

**Si può eliminare del tutto un progetto?** No, lo si può solo archiviare. I dati restano e lo si può ripristinare quando si vuole.

**Si possono collegare due siti a un progetto?** No. In un progetto c'è una proprietà di Search Console e una di Analytics. Per un secondo sito, aprire un secondo progetto.

**C'è un progetto di nome "Default". Che cos'è?** Al primo avvio l'app crea un progetto vuoto, perché le schermate possano aprirsi. Lo si può rinominare e usare. Se si preferisce, creare un nuovo progetto e archiviare quello.

**È stato scelto il paese sbagliato.** Cambiarlo nella scheda Genel. Le posizioni delle parole chiave salvate sono monitorate secondo il nuovo paese da quel momento in poi.

## Limiti

Il numero di progetti non ha limiti. Creare un progetto non avvia nulla. I dati arrivano solo quando Google è collegato. Se non è stato inserito il dominio, l'indirizzo si scrive a mano quando si avvia un controllo.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
