---
title: Installazione su Windows
description: Si installa su Windows con un solo file, senza Docker né terminale. Nella stessa pagina: aggiornamento, disinstallazione, copia di sicurezza e cambio del numero di porta.
kind: nasil-yapilir
updated: 2026-10-22
---

L'interfaccia dell'app è in turco. In questa guida ogni nome di pulsante e di schermata è riportato in turco, con il significato italiano tra parentesi.

Al termine l'app sarà installata sul computer e aperta nel browser. L'installazione richiede due minuti. Viene installata solo per il proprio account utente e non servono i permessi di amministratore. Se manca il componente Visual C++, il permesso viene chiesto una sola volta.

## Cosa serve

- Windows 10 o 11 (64 bit).
- Circa 350 MB di spazio libero. Il file di installazione pesa 81 MB, l'app installata 290 MB.
- Un browser come Edge, Chrome o Firefox.
- Non servono Docker, Node né il terminale (la finestra dei comandi). Non servono nemmeno i diritti di amministratore: vengono chiesti una sola volta, e solo se manca il componente Visual C++.
- Il motore dell'app richiede il pacchetto Visual C++ di Microsoft. Se il computer non lo ha, l'installazione lo aggiunge da sé e chiede una volta il permesso di amministratore. L'app viene installata nella cartella `%LOCALAPPDATA%\Programs\seowatcher`.

## Passaggi

### Prima installazione

1. Scaricare il file **seowatcher-setup.exe** dalla pagina delle versioni su GitHub. Indirizzo fisso: `github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
2. Fare doppio clic sul file.
3. Se Windows mostra "Windows ha protetto il PC", scegliere **Maggiori informazioni** e poi **Esegui comunque** (in un Windows in turco: **Daha fazla bilgi**, **Yine de çalıştır**). Il file non è ancora firmato e Windows non riconosce l'autore. L'avviso è normale.
4. Se si desidera, confrontare l'impronta SHA-256 del file (la sua impronta digitale) con quella di `SHA256SUMS.txt` nella pagina delle versioni.
5. Nella pagina di benvenuto scegliere **Sonraki** (Avanti).
6. Alla domanda "per chi installare" scegliere **Yalnızca ben** (Solo per me). È l'opzione consigliata: l'installazione riguarda solo il proprio account. L'opzione **Tüm kullanıcılar** (Tutti gli utenti) richiede il permesso di amministratore.
7. Guardare le due opzioni **Windows açılınca seowatcher'ı başlat** (Avvia seowatcher all'avvio di Windows) e **Masaüstüne kısayol ekle** (Aggiungi un collegamento sul desktop). La prima è già spuntata. Se non si vuole che parta in secondo piano, togliere la spunta. Poi scegliere **Sonraki**.
8. Scegliere **Kur** (Installa).
9. Nell'ultima pagina c'è la casella **seowatcher'ı şimdi başlat** (Avvia seowatcher ora). Lasciarla spuntata e scegliere **Bitti** (Fine). L'app si apre.
10. Attendere. Il primo avvio dura 20-30 secondi. Il testo dell'icona nella barra delle applicazioni cambia in ordine: "Anahtarlar hazırlanıyor" (Preparazione delle chiavi), "Veritabanı güncelleniyor" (Aggiornamento del database), "Sunucu başlatılıyor" (Avvio del server). Se l'icona non si vede, fare clic sulla freccia ^ nella barra delle applicazioni. Quando è tutto pronto, il browser si apre da solo. Se invece l'app parte con Windows, il browser non si apre e compare un fumetto "seowatcher hazır" (seowatcher è pronto).
11. Nel browser si apre da solo `http://127.0.0.1:3001`. 127.0.0.1 è il computer stesso, 3001 è il numero di porta (l'indirizzo interno del servizio).

Il passo successivo è la guida alla connessione con Google.

### Menu della barra delle applicazioni

Fare clic con il tasto destro sull'icona. Se non si vede, fare clic sulla freccia ^ nella barra delle applicazioni. Nel menu ci sono queste voci:

- **seowatcher'ı aç** (Apri seowatcher): apre l'app nel browser. Un doppio clic sull'icona fa la stessa cosa.
- **Yeniden başlat** (Riavvia): chiude e riapre l'app. Se qualcosa si blocca, provare prima questa voce.
- **Günlükleri aç** (Apri i registri): apre la cartella dei registri. Contiene `launcher.log`, `server.log` e `migrate.log`.
- **Tanı bilgisini kopyala** (Copia le informazioni diagnostiche): copia negli appunti la versione di Windows, il processore, la versione di Visual C++, la prova del motore, il modulo con errore nel registro eventi di Windows, i dump di arresto anomalo e le ultime righe dei registri.
- **Sorunu bildir (GitHub)** (Segnala un problema (GitHub)): copia le stesse informazioni negli appunti e apre su GitHub una segnalazione già compilata. Aggiungere una frase su ciò che si stava facendo e inviare.
- **Eksik Windows bileşenini kur** (Installa il componente di Windows mancante): compare solo se manca il pacchetto Visual C++. Con un clic installa il pacchetto e riavvia l'app.
- **Kurulumu onar** (Ripara l'installazione): elimina i file temporanei, controlla il pacchetto e riapre l'app.
- **Güncelle** (Aggiorna): è sempre presente nel menu. Con un clic controlla subito GitHub; se c'è una versione nuova la scarica e la installa, altrimenti risponde "Güncel" (Aggiornato). Se una versione nuova è già stata trovata, il testo completo della voce quando è pronta è "Güncelle: X.Y.Z sürümü hazır" (Aggiorna: versione X.Y.Z pronta). Il numero di versione è un esempio.
- **Güncellemeleri kendiliğinden kur** (Installa gli aggiornamenti automaticamente): se è spuntata, la nuova versione viene installata da sola quando è trovata.
- **Veri klasörünü aç** (Apri la cartella dei dati): apre la cartella del database e delle chiavi.
- **Windows açılınca başlat** (Avvia all'avvio di Windows): se è spuntata, l'app parte in secondo piano all'accensione del computer.
- **Çıkış** (Esci): chiude l'app del tutto. Con l'app chiusa, la pagina nel browser non funziona.

Nel menu compaiono anche una riga di stato ("Çalışıyor: http://127.0.0.1:3001/" (In funzione) oppure il testo di un errore) e il numero di versione.

Se si avvia l'app una seconda volta, non si apre una nuova copia: si apre soltanto la pagina nel browser.

### Aggiornamento

L'app si aggiorna da sola. Due minuti dopo l'avvio, e poi una volta al giorno, controlla su GitHub l'ultima versione. Se ce n'è una nuova, la scarica, confronta l'impronta del file (SHA-256) con il valore indicato nella pagina della versione, la installa in silenzio e si riapre. In quel momento il testo dell'icona diventa "Güncelleme indiriliyor" (Download dell'aggiornamento) e "Güncelleme kuruluyor" (Installazione dell'aggiornamento). Anche la sezione **Ayarlar → Hakkında** (Impostazioni → Informazioni) dell'app segnala la nuova versione e rimanda a **Güncelle** (Aggiorna) nell'icona.

- Se non si vuole l'installazione automatica, togliere la spunta da **Güncellemeleri kendiliğinden kur** nel menu. Quando esce una versione nuova compare un fumetto e nel menu appare la voce **Güncelle**.
- Per aggiornare a mano, scaricare dallo stesso indirizzo il nuovo file di installazione ed eseguirlo. La procedura guidata chiude da sé l'app aperta, sostituisce i file e la riavvia.

I dati, la connessione con Google e le impostazioni restano com'erano.

### Distribuzione aziendale

Note per i team IT che vogliono installare per tutti gli utenti di un computer o distribuire in silenzio con uno strumento di gestione (Intune, GPO, PDQ):

- **Per tutti gli utenti**: eseguire il file di installazione come amministratore e scegliere nella procedura l'opzione "tutti gli utenti". L'app viene installata in `C:\Program Files\seowatcher` (con l'installazione per un solo utente la cartella è `%LOCALAPPDATA%\Programs\seowatcher`); i dati di ogni utente restano comunque nella sua cartella `%LOCALAPPDATA%\seowatcher`.
- **Installazione silenziosa**: `seowatcher-setup.exe /VERYSILENT /NORESTART` (un solo utente) oppure `seowatcher-setup.exe /VERYSILENT /ALLUSERS /NORESTART` (amministratore, tutti gli utenti). Al termine dell'installazione silenziosa l'app si avvia da sola.
- **Registro dell'installazione**: ogni installazione scrive nel file `%LOCALAPPDATA%\seowatcher\logs\setup.log`. Con `/LOG="yol"` si può indicare un altro percorso.
- **Disinstallazione silenziosa**: `unins000.exe /VERYSILENT` (nella cartella di installazione: `%LOCALAPPDATA%\Programs\seowatcher`, oppure `C:\Program Files\seowatcher` se è stata fatta per tutti gli utenti).
- **Verifica**: prima della pubblicazione, ogni versione viene installata su un Windows pulito, avviata, attesa finché l'indirizzo di stato non risponde, e infine disinstallata. Una versione che non supera questa prova non viene pubblicata.

### Riparazione

Se qualcosa si blocca, fare clic con il tasto destro sull'icona e scegliere **Kurulumu onar** (Ripara l'installazione); se l'icona non si vede, fare clic sulla freccia ^ nella barra delle applicazioni. L'app elimina i file temporanei, controlla che il pacchetto sia completo, ricontrolla il database e si apre. Se manca un file, lo segnala e apre la pagina delle versioni. Basta eseguire di nuovo il file di installazione.

### Disinstallazione

1. In Windows, nell'elenco **Ayarlar → Uygulamalar → Yüklü uygulamalar** (Impostazioni → App → App installate), cercare **seowatcher**.
2. Scegliere **Kaldır** (Disinstalla).

Il programma di disinstallazione elimina il programma, il collegamento nel menu Start e la voce "avvia con Windows". Non tocca la cartella dei dati. Per eliminare anche il database, la connessione con Google e i report, cancellare da sé la cartella dei dati.

### Dove sono i dati e come si fa la copia di sicurezza

Tutto si trova in una sola cartella: `%LOCALAPPDATA%\seowatcher`. Scrivere questo testo nella barra degli indirizzi di Esplora file. Anche la voce di menu **Veri klasörünü aç** (Apri la cartella dei dati) porta lì. Dentro ci sono:

- `data`: il database (progetti, archivio di Search Console, controlli, report).
- `instance-secret`: la chiave che cifra gli accessi a Google. Se si perde, la connessione con Google va rifatta da capo.
- `mcp-token`: la password che l'assistente di intelligenza artificiale usa per collegarsi all'app.
- `server.env`, `config.json`, `logs`.

Per fare la copia di sicurezza:

1. Chiudere l'app con **Çıkış** (Esci).
2. Copiare l'intera cartella.

Per ripristinare, chiudere l'app, rimettere la cartella al suo posto e avviare l'app. Lo spostamento su un altro computer funziona allo stesso modo. Portando anche il file `instance-secret`, le connessioni con Google continuano a funzionare.

### Cambiare il numero di porta

L'app usa il numero 3001. Se un altro programma lo occupa, l'app sceglie il primo numero libero tra 3002 e 3010 e lo scrive nel file `config.json`.

Per un numero preciso:

1. Chiudere l'app.
2. Aprire con il Blocco note il file `config.json` nella cartella dei dati.
3. Scrivere questo contenuto:

```json
{
  "port": 3005
}
```

4. Salvare e avviare l'app.

Quando il numero cambia, aggiornare con il nuovo numero anche i due indirizzi di reindirizzamento su Google. Sono descritti nella guida alla connessione con Google.

## Verifica

- Passando il mouse sull'icona nella barra delle applicazioni deve comparire "seowatcher X.Y.Z: Çalışıyor: http://127.0.0.1:3001/". Il numero iniziale è la versione installata. 2.3.7 è un esempio.
- Nel browser l'indirizzo `http://127.0.0.1:3001/api/health` deve mostrare un testo che inizia con "status":"ok".
- Nella schermata **Yardım** (Aiuto) la scheda "Kurulumunuzun durumu" (Stato dell'installazione) deve dire "Her şey yolunda." (Tutto a posto.). Prima del collegamento con Google, la riga "Google girişi" (Accesso a Google) richiede attenzione. È normale.

## Domande frequenti

**Perché si apre nel browser?** L'app funziona sul computer come un piccolo server. Il suo schermo è il browser.

**Che cosa succede se si spegne il computer?** Si chiude anche l'app. Se **Windows açılınca başlat** è spuntata, alla prossima accensione parte da sola.

**Si può aprire da un altro computer?** No, ed è voluto. L'app ascolta solo l'indirizzo 127.0.0.1. Per aprirla a Internet bisogna metterle davanti una propria autenticazione.

**Si può passare dalla versione Docker?** Sì, ma i dati non vengono spostati da soli. I progetti si ricreano e Google si ricollega. L'archivio di Search Console si riempie di nuovo al primo avvio.

**L'antivirus ha dato un avviso.** Poiché il file non è firmato, alcuni antivirus segnalano un avviso. Scaricare il file solo dalla pagina delle versioni su GitHub e confrontare l'impronta SHA-256.

## Se qualcosa non va

Se l'icona non si vede, fare clic sulla freccia ^ nella barra delle applicazioni.

- **L'icona dice "Hata: 3001 ve sonraki 9 adres numarası (port) dolu" (Errore: la porta 3001 e le 9 successive sono occupate).** Un altro programma occupa questi numeri. Scrivere un altro numero nel file `config.json`.
- **L'icona dice "Veritabanı güncellemesi başarısız" (Aggiornamento del database non riuscito).** Scegliere **Günlükleri aç** e guardare le ultime righe del file `migrate.log`. Spesso il disco è pieno oppure la cartella è di sola lettura.
- **L'icona dice "Sunucu beklenmedik şekilde kapandı" (Il server si è chiuso in modo imprevisto).** Le ultime righe di `server.log` ne indicano la causa. Provare **Yeniden başlat**. Se non si risolve, condividere il registro con una segnalazione su GitHub.
- **Il browser non si è aperto.** Fare doppio clic sull'icona oppure scrivere a mano l'indirizzo: `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->
