---
title: Progetti
description: Si crea un progetto, si sceglie il sito e il paese, si cambia il nome e si gestisce il collegamento con Google. Un progetto si può anche archiviare e ripristinare.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-22
---

Si apre un progetto, se ne cambiano le impostazioni e, se serve, lo si rimuove. Ogni sito è un progetto. Ogni progetto ha il proprio collegamento con Google, i propri controlli e i propri report.

## Cosa c'è nella schermata

**Selettore dei progetti.** Facendo clic sul nome del progetto in alto a sinistra si apre l'elenco dei progetti. In fondo ci sono **Yeni proje** (Nuovo progetto) e **Projeleri yönet** (Gestisci i progetti). L'icona a forma di ingranaggio accanto apre **Proje ayarları** (Impostazioni del progetto). Con otto o più progetti compare nell'elenco una casella di ricerca.

**Pagina dei progetti.** Ogni riga mostra il nome del progetto e il suo sito. Un progetto senza sito dice "Site belirlenmemiş" (Sito non definito). Il progetto aperto ha l'etichetta **Etkin** (Attivo). Facendo clic sulla riga si aprono le impostazioni di quel progetto. I progetti archiviati stanno in fondo, nella sezione **Arşivlendi** (Archiviati). Con **Geri al** (Ripristina) tornano nell'elenco.

**Finestra del nuovo progetto.** Ha quattro campi:

- **Ad** (Nome) è obbligatorio. Lo vede solo l'utente: compare nel titolo dei report e nel selettore dei progetti. Non va a Google.
- **Alan adı (isteğe bağlı)** (Dominio, facoltativo) è l'indirizzo del sito, per esempio `example.com`. Il `https://` e il `www.` iniziali vengono tolti da soli. I sottodomini sono ricondotti al dominio principale: `blog.example.com` ed `example.com` sono lo stesso progetto.
- **Ülke** (Paese) e **Dil** (Lingua) stabiliscono per quale mercato vengono monitorate le parole chiave salvate. Quando si cambia il paese, la lingua passa a quella del paese. Entrambi si possono cambiare in seguito.

**Impostazioni del progetto.** Ci sono due schede. La scheda **Genel** (Generale) contiene nome, dominio, paese e lingua, e la sezione **Projeyi arşivle** (Archivia il progetto). La scheda **Bağlantılar** (Collegamenti) contiene le schede di Search Console e di Analytics.

## Come si usa

1. Nel selettore dei progetti scegliere **Yeni proje**.
2. Scrivere un nome, inserire l'indirizzo del sito, scegliere paese e lingua e premere **Proje oluştur** (Crea il progetto). Il progetto si apre e compare il Panel (Pannello). Non viene ancora scaricato alcun dato.
3. Passare a **Proje ayarları → Bağlantılar** e collegare Search Console. I passaggi sono nella guida al collegamento con Google. Una volta collegato, Panel, Arama performansı (Prestazioni di ricerca), Fırsatlar (Opportunità) e Dizin durumu (Stato dell'indice) cominciano a riempirsi.
4. Per collegare anche Analytics, usare la scheda **Analytics** nella stessa pagina. Non serve un'altra chiave di Google.
5. Per cambiare il nome o il sito, correggere il campo nella scheda **Genel** e premere **Değişiklikleri kaydet** (Salva le modifiche). Il pulsante si attiva solo quando qualcosa è cambiato.

### Cambiare il collegamento con Google

Nella scheda della pagina **Bağlantılar** premere **Mülkü veya hesabı değiştir** (Cambia proprietà o account). Si può scegliere un altro sito (per Google, una "proprietà") o un altro account Google. **Bağlantıyı kes** (Scollega) rimuove solo il collegamento di questo progetto. L'account Google resta registrato e non viene chiesta alcuna conferma. Per rimuovere del tutto un account Google, usare **Hesabı kaldır** (Rimuovi l'account) nella finestra di scelta. La finestra indica quali progetti saranno interessati.

### Archiviare un progetto

I progetti non si eliminano, si archiviano. Il pulsante **Projeyi arşivle** in fondo alla scheda **Genel** toglie il progetto dall'elenco. Controlli, parole chiave e report restano come sono. **Geri al** nella pagina dei progetti riporta il progetto esattamente com'era. Se si ha un solo progetto, non si può archiviare.

## Come si calcolano i numeri

In questa schermata non ci sono numeri. Quando si salva il dominio valgono queste regole: spazi e lettere maiuscole vengono ripuliti e l'indirizzo deve essere un vero nome di dominio (non sono accettati indirizzi IP, `localhost` o estensioni inventate). Se si inserisce un valore errato, compare l'avviso "Geçerli bir alan adı girin, örneğin acme.com." (Inserire un dominio valido, per esempio acme.com.).

## Domande frequenti

**Si può eliminare del tutto un progetto?** No, lo si può solo archiviare. I dati restano e lo si può ripristinare quando si vuole.

**Si possono collegare due siti a un progetto?** No. In un progetto c'è una proprietà di Search Console e una di Analytics. Per un secondo sito, aprire un secondo progetto.

**C'è un progetto di nome "Default". Che cos'è?** Al primo avvio l'app crea un progetto vuoto, perché le schermate possano aprirsi. Lo si può rinominare e usare. Se si preferisce, creare un nuovo progetto e archiviare quello.

**È stato scelto il paese sbagliato.** Cambiarlo nella scheda Genel. Le posizioni delle parole chiave salvate sono monitorate secondo il nuovo paese da quel momento in poi.

## Limiti

Il numero di progetti non ha limiti. Creare un progetto non avvia nulla. I dati arrivano solo quando Google è collegato. Se non è stato inserito il dominio, l'indirizzo si scrive a mano quando si avvia un controllo.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
