---
title: Aiuto
description: Se qualcosa va storto, guardare prima qui: controlla l'installazione, propone soluzioni ai problemi comuni e prepara il file per la segnalazione.
screen: Yardım
route: /support
updated: 2026-10-22
---

L'interfaccia dell'app è in turco. In questa guida ogni nome di pulsante e di schermata è riportato in turco, con il significato italiano tra parentesi.

Se qualcosa va storto, guardare prima qui. La schermata controlla l'installazione, dice che cosa manca e porta all'impostazione giusta.

## Cosa c'è nella schermata

**Hızlı işlemler** (Azioni rapide). I pulsanti in alto:

- **Durumu yeniden kontrol et** (Ricontrolla lo stato): aggiorna la scheda qui sotto.
- **Tanılama paketi indir** (Scarica il pacchetto diagnostico): scarica il file da inviare quando si segnala un problema. Non contiene valori segreti.
- **Kılavuzu aç** (Apri la guida): apre la guida su seowatcher.io.
- **seowatcher.io**: apre il sito dell'app, dove ci sono la pagina di download e la guida.
- **Sürüm notları** (Note di versione): porta alle note di versione in Ayarlar (Impostazioni).
- **Kurulum istemini kopyala** (Copia il testo di configurazione): copia il testo di configurazione da incollare nell'assistente di intelligenza artificiale (nell'app chiamato "ajan").
- **Ajan kurulumu** (Configurazione dell'assistente): porta alla schermata del collegamento con l'assistente.

**Kurulumunuzun durumu** (Stato dell'installazione). La scheda controlla quattro cose: **Giriş ve erişim** (Accesso), **Google girişi** (Accesso a Google), **PageSpeed anahtarı** (Chiave PageSpeed), **Veritabanı** (Database). In alto c'è scritto "Her şey yolunda." (Tutto a posto.) oppure "N şey dikkat istiyor." (N cose richiedono attenzione.). Sotto compaiono la riga della versione, "Sürüm X, güncel." (Versione X, aggiornata) oppure "yeni sürüm Y var" (c'è una nuova versione Y), e l'ora dell'ultimo controllo. Il pulsante accanto a una riga con problemi porta all'impostazione giusta: **Ayarları aç** (Apri le impostazioni) oppure **Anahtar gir** (Inserisci la chiave). **Özeti kopyala** (Copia il riepilogo) mette il testo della scheda negli appunti.

**Projeler** (Progetti). Si vede lo stato del collegamento di ogni progetto con Search Console e Analytics. **Bağlantıları aç** (Apri i collegamenti) porta alle impostazioni del progetto.

**Sık sorunlar** (Problemi comuni). Ci sono cinque voci espandibili: la pagina non si apre, il numero di porta è occupato, l'assistente non riesce a collegarsi (401), il limite di PageSpeed, nessun dato sulle query. In ciascuno è scritto che cosa fare, con il collegamento all'impostazione corrispondente.

**Google ve sistem sınırları** (Limiti di Google e del sistema). Con **Sınırları göster** (Mostra i limiti) si vede a che punto si è dei limiti giornalieri di Google.

**Elenco in fondo.** Ci sono scorciatoie verso i file di registro e verso l'indirizzo di stato (`/api/health`). Nel pacchetto Windows i registri si aprono con **Günlükleri aç** (Apri i registri) nel menu della barra delle applicazioni. Con Docker si usa il comando indicato da **Komutu kopyala** (Copia il comando).

## Come si usa

1. Se qualcosa non funziona, aprire prima questa schermata e leggere l'avviso nella scheda.
2. Premere il pulsante accanto all'avviso: porta all'impostazione giusta. Fare la modifica, tornare e scegliere **Durumu yeniden kontrol et**.
3. Se la scheda dice "Her şey yolunda." ma il problema continua, guardare i titoli di **Sık sorunlar**.
4. Se ancora non si risolve, scegliere **Tanılama paketi indir** e aggiungere il file alla segnalazione su GitHub. Nel pacchetto Windows, **Sorunu bildir (GitHub)** (Segnala un problema su GitHub) nel menu della barra delle applicazioni fa lo stesso con un solo clic.

## Domande frequenti

**Perché la riga "Google girişi" è gialla?** Non è ancora stata inserita una chiave di accesso a Google. La riga resta gialla finché Google non è collegato. Seguire la guida al collegamento con Google.

**Nella riga "Giriş ve erişim" c'è scritto "parolasız tek kullanıcı" (utente singolo, senza password).** È normale. L'app si apre solo dal proprio computer. Per aprirla all'esterno bisogna metterle davanti un proprio accesso protetto da password.

**Che cosa c'è nel pacchetto diagnostico?** La versione, i controlli dell'installazione, il numero di righe delle tabelle e un riepilogo degli ultimi controlli. Non ci sono chiavi di Google, password né dati personali.

## Limiti

La schermata controlla solo l'installazione stessa. Per trovare un problema nel sito, guardare la schermata Site denetimi (Controllo del sito); per vedere un problema dal lato di Google, la schermata Dizin durumu (Stato dell'indice).

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/support/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
