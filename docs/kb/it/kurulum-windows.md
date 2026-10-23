---
title: Installazione su Windows
description: Si installa su Windows con un solo file, senza Docker né terminale. Nella stessa pagina: aggiornamento, disinstallazione, copia di sicurezza, porta.
kind: nasil-yapilir
updated: 2026-10-23
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

Il passaggio successivo è la guida al collegamento con Google.

### Menu della barra delle applicazioni

Fare clic con il tasto destro sull'icona. Se non si vede, fare clic sulla freccia ^ nella barra delle applicazioni. Il menu è diviso in quattro parti. In alto ci sono l'apertura dell'app e la riga di stato, poi l'aggiornamento e il riavvio, poi due impostazioni, e in fondo le voci per la risoluzione dei problemi.

- **seowatcher'ı aç** (Apri seowatcher): apre l'app nel browser. Un doppio clic sull'icona fa lo stesso. Se l'app si sta ancora avviando, compare il fumetto "seowatcher açılıyor" (seowatcher si sta avviando) e il browser si apre da solo quando è pronta.
- Riga di stato: "Çalışıyor: http://127.0.0.1:3001/" (In esecuzione: http://127.0.0.1:3001/), "Veritabanı güncelleniyor" (Aggiornamento del database) oppure un messaggio di errore. Non si può fare clic. Se il testo è lungo, tenere il mouse sopra per vederlo per intero.
- **Eksik Windows bileşenini kur** (Installa il componente Windows mancante): compare solo se manca il pacchetto Visual C++. Un clic installa il pacchetto e riavvia l'app.
- **Güncelle** (Aggiorna): è sempre nel menu. Un clic controlla subito GitHub. Se c'è una nuova versione la scarica e la installa, altrimenti dice "Güncel" (Aggiornato). Durante il controllo la voce riporta "Kontrol ediliyor…" (Controllo in corso…), durante lo scaricamento "Güncelleme indiriliyor: X.Y.Z (%45)" (Scaricamento dell'aggiornamento: X.Y.Z (45%)); in quel momento non si può fare clic. Quando una nuova versione è già stata trovata, la voce riporta "Güncelle: X.Y.Z sürümü hazır" (Aggiorna: la versione X.Y.Z è pronta); i numeri di versione sono esempi.
- **Yeniden başlat** (Riavvia): chiude l'app e la riapre. Se qualcosa si blocca, provare prima questa voce.
- **Windows açılınca başlat** (Avvia all'avvio di Windows): se è spuntata, l'app parte in secondo piano all'accensione del computer. Se un amministratore ha attivato questa impostazione durante un'installazione per tutti gli utenti del computer, la voce è spuntata e disattivata (grigia), e solo un amministratore può toglierla.
- **Güncellemeleri kendiliğinden kur** (Installa gli aggiornamenti automaticamente): se è spuntata, l'app installa da sola una nuova versione quando ne trova una.
- **Kurulumu onar** (Ripara l'installazione): elimina i file temporanei, controlla che il pacchetto sia completo e riapre l'app. Durante la riparazione la voce riporta "Onarılıyor…" (Riparazione in corso…).
- **Tanı bilgisini kopyala** (Copia le informazioni di diagnostica): copia negli appunti la versione di Windows, il processore, la versione di Visual C++, una prova del motore, il modulo difettoso del registro eventi di Windows, i file di dump dei crash e le ultime righe del registro. Le informazioni sono pronte in pochi secondi, poi compare il fumetto "Kopyalandı" (Copiato). Torna utile quando si segnala un problema.
- **Sorunu bildir (GitHub)** (Segnala un problema (GitHub)): mette le stesse informazioni negli appunti e apre su GitHub una segnalazione già compilata. Aggiungere una frase su ciò che si stava facendo e inviarla.
- **Günlükleri aç** (Apri i registri): apre la cartella dei registri. Contiene `launcher.log`, `server.log` e `migrate.log`.
- **Veri klasörünü aç** (Apri la cartella dei dati): apre la cartella con il database e le chiavi.
- Numero di versione: la versione installata. Non si può fare clic.
- **Çıkış** (Esci): chiude completamente l'app. Finché è chiusa, la pagina nel browser non funziona.

Se si avvia l'app una seconda volta (dal menu Start o dal collegamento sul desktop), non si apre una seconda copia. L'app già aperta apre la pagina nel browser; se non è ancora pronta, la apre appena lo è.

Se il server si chiude da solo mentre è in esecuzione, l'app lo riapre e mostra il fumetto "seowatcher yeniden başlatılıyor" (seowatcher si sta riavviando). Se si chiude tre volte in dieci minuti, l'app smette di riaprirlo e la riga di stato riporta "Sunucu 10 dakikada üç kez kapandı" (Il server si è chiuso tre volte in 10 minuti). In quel caso scegliere **Kurulumu onar**.

### Aggiornamento

L'app si aggiorna da sola. Due minuti dopo l'apertura, e poi una volta al giorno, controlla su GitHub l'ultima versione. Se ce n'è una nuova, la scarica, confronta l'impronta del file (SHA-256) con il valore indicato nella pagina delle versioni, la installa in silenzio e si riapre. In questa fase il testo dell'icona riporta "Güncelleme indiriliyor" (Scaricamento dell'aggiornamento) e "Güncelleme kuruluyor" (Installazione dell'aggiornamento), e per un attimo compare una piccola finestra di installazione. Quando l'app si riapre, compare il fumetto "seowatcher X.Y.Z sürümüne güncellendi" (seowatcher è stato aggiornato alla versione X.Y.Z); un clic apre l'elenco delle novità. Anche la sezione **Ayarlar → Hakkında** (Impostazioni → Informazioni) dell'app segnala la nuova versione e rimanda alla voce **Güncelle** dell'icona.

- Se non si vuole che si installi da sola, togliere la spunta a **Güncellemeleri kendiliğinden kur** nel menu. Quando esce una nuova versione si vede allora un fumetto una sola volta, e la voce del menu riporta "Güncelle: X.Y.Z sürümü hazır" (Aggiorna: la versione X.Y.Z è pronta). Per installare, fare clic sul fumetto o sulla voce.
- Se non c'è internet, o GitHub in quel momento non risponde, l'app riprova dopo un'ora. Nei tentativi automatici avvisa una sola volta per ogni versione.
- Se l'impronta del file scaricato non corrisponde, l'aggiornamento non viene installato e la versione installata continua a funzionare.
- Un'installazione per tutti gli utenti del computer richiede i permessi di amministratore per aggiornarsi, perciò lì l'app non si installa da sola. Quando esce una nuova versione si vede un fumetto; facendo clic, Windows chiede il permesso di amministratore.
- Per aggiornare a mano, scaricare dallo stesso indirizzo il nuovo file di installazione ed eseguirlo. La procedura guidata chiude da sé l'app aperta, sostituisce i file e la riavvia. La casella **Windows açılınca seowatcher'ı başlat** (Avvia seowatcher all'avvio di Windows) della procedura mostra l'impostazione attuale del menu.

I dati, il collegamento con Google e le impostazioni restano come sono. Un aggiornamento automatico non tocca l'impostazione **Windows açılınca başlat**.

### Distribuzione aziendale

Note per i team IT che vogliono installare per tutti gli utenti di un computer o distribuire in silenzio con uno strumento di gestione (Intune, GPO, PDQ):

- **Per tutti gli utenti**: eseguire il file di installazione come amministratore e scegliere nella procedura l'opzione "tutti gli utenti". L'app viene installata in `C:\Program Files\seowatcher` (con l'installazione per un solo utente la cartella è `%LOCALAPPDATA%\Programs\seowatcher`); i dati di ogni utente restano comunque nella sua cartella `%LOCALAPPDATA%\seowatcher`.
- **Installazione silenziosa**: `seowatcher-setup.exe /VERYSILENT /NORESTART` (un solo utente) oppure `seowatcher-setup.exe /VERYSILENT /ALLUSERS /NORESTART` (amministratore, tutti gli utenti). Al termine dell'installazione silenziosa l'app si avvia da sola.
- **Registro dell'installazione**: ogni installazione scrive nel file `%LOCALAPPDATA%\seowatcher\logs\setup.log`. Con `/LOG="yol"` (yol significa percorso) si può indicare un altro file.
- **Disinstallazione silenziosa**: `unins000.exe /VERYSILENT` (nella cartella di installazione: `%LOCALAPPDATA%\Programs\seowatcher`, oppure `C:\Program Files\seowatcher` se è stata fatta per tutti gli utenti).
- **Verifica**: prima della pubblicazione, ogni versione viene installata su un Windows pulito, avviata, attesa finché l'indirizzo di stato non risponde, e infine disinstallata. Una versione che non supera questa prova non viene pubblicata.

### Riparazione

Se qualcosa si blocca, fare clic con il tasto destro sull'icona e scegliere **Kurulumu onar** (Ripara l'installazione); se l'icona non si vede, fare clic sulla freccia ^ nella barra delle applicazioni. L'app elimina i file temporanei e controlla che il pacchetto sia completo. Poi, aprendosi, esegue di nuovo l'aggiornamento del database.

Se un file del pacchetto è stato eliminato (per esempio messo in quarantena da un antivirus), l'app scarica da GitHub il file di installazione della versione installata, ne verifica l'impronta e si reinstalla. I dati non vengono toccati. Se non c'è internet, riporta "Kurulum eksik" (Installazione incompleta) e apre la pagina delle versioni. Basta allora scaricare il file di installazione ed eseguirlo.

### Disinstallazione

1. In Windows, nell'elenco **Ayarlar → Uygulamalar → Yüklü uygulamalar** (Impostazioni → App → App installate), cercare **seowatcher**.
2. Scegliere **Kaldır** (Disinstalla).

Il programma di disinstallazione elimina il programma, il collegamento nel menu Start la voce "avvia con Windows" (anche se è stata attivata dal menu) e i file di aggiornamento scaricati. Non tocca la cartella dei dati, e la finestra di disinstallazione lo dice. Per eliminare anche il database, il collegamento con Google e i report, cancellare a mano la cartella dei dati.

### Dove sono i dati e come si fa la copia di sicurezza

Tutto si trova in una sola cartella: `%LOCALAPPDATA%\seowatcher`. Scrivere questo testo nella barra degli indirizzi di Esplora file. Anche la voce di menu **Veri klasörünü aç** (Apri la cartella dei dati) porta lì. Dentro ci sono:

- `data`: il database (progetti, archivio di Search Console, controlli, report).
- `instance-secret`: la chiave che cifra gli accessi a Google. Se si perde, il collegamento con Google va rifatto da capo.
- `mcp-token`: la password che l'assistente di intelligenza artificiale usa per collegarsi all'app.
- `server.env`, `config.json`, `logs`.

Per fare la copia di sicurezza:

1. Chiudere l'app con **Çıkış** (Esci).
2. Copiare l'intera cartella.

Per ripristinare, chiudere l'app, rimettere la cartella al suo posto e avviare l'app. Lo spostamento su un altro computer funziona allo stesso modo. Portando anche il file `instance-secret`, i collegamenti con Google continuano a funzionare.

### Cambiare il numero di porta

L'app usa il numero 3001. Se un altro programma lo occupa, l'app sceglie il primo numero libero tra 3002 e 3010 solo per quell'avvio e mostra il fumetto "3001 numarası dolu, 3002 kullanılıyor" (La porta 3001 è occupata, si usa la 3002). Non salva questo numero. Quando la 3001 torna libera, all'avvio successivo l'app usa di nuovo la 3001, perché gli indirizzi di reindirizzamento su Google contengono questo numero.

Per un numero preciso:

1. Chiudere l'app.
2. Aprire con il Blocco note il file `config.json` nella cartella dei dati.
3. Scrivere questo contenuto:

```json
{
  "port": 3005
}
```

4. Salvare e avviare l'app. Se nel file ci sono altre righe (come `autoUpdate`), non cancellarle; cambiare solo il valore di `port`.

Quando il numero cambia, aggiornare con il nuovo numero anche i due indirizzi di reindirizzamento su Google. Sono descritti nella guida al collegamento con Google.

## Verifica

- Passando il mouse sull'icona nella barra delle applicazioni deve comparire "seowatcher X.Y.Z: Çalışıyor: http://127.0.0.1:3001/". Il numero iniziale è la versione installata. 2.3.7 è un esempio.
- Nel browser l'indirizzo `http://127.0.0.1:3001/api/health` deve mostrare un testo che inizia con "status":"ok".
- Nella schermata **Yardım** (Aiuto) la scheda "Kurulumunuzun durumu" (Stato dell'installazione) deve dire "Her şey yolunda." (Tutto a posto.). Finché Google non è collegato, la riga "Google girişi" (Accesso a Google) segnala un problema. È normale.

## Domande frequenti

**Perché si apre nel browser?** L'app funziona sul computer come un piccolo server. Il suo schermo è il browser.

**Che cosa succede se si spegne il computer?** Si chiude anche l'app. Se **Windows açılınca başlat** (Avvia all'avvio di Windows) è spuntata, alla prossima accensione parte da sola.

**Si può aprire da un altro computer?** No, ed è voluto. L'app ascolta solo l'indirizzo 127.0.0.1. Per aprirla a Internet bisogna metterle davanti una propria autenticazione.

**Si può passare dalla versione Docker a questa?** Sì, ma i dati non vengono spostati da soli. I progetti si ricreano e Google si ricollega. L'archivio di Search Console si riempie di nuovo al primo avvio.

**L'antivirus ha dato un avviso.** Poiché il file non è firmato, alcuni antivirus segnalano un avviso. Scaricare il file solo dalla pagina delle versioni su GitHub e confrontare l'impronta SHA-256.

## Se qualcosa non va

Se l'icona non si vede, fare clic sulla freccia ^ nella barra delle applicazioni.

- **L'icona dice "Hata: 3001 ve sonraki 9 adres numarası (port) dolu" (Errore: la porta 3001 e le 9 successive sono occupate).** Un altro programma occupa questi numeri. Scrivere un altro numero nel file `config.json`.
- **L'icona dice "Veritabanı güncellemesi başarısız" (Aggiornamento del database non riuscito).** Scegliere **Günlükleri aç** e guardare le ultime righe del file `migrate.log`. Spesso il disco è pieno oppure la cartella è di sola lettura.
- **L'icona dice "Sunucu beklenmedik şekilde kapandı" (Il server si è chiuso in modo imprevisto) oppure "Sunucu 10 dakikada üç kez kapandı" (Il server si è chiuso tre volte in 10 minuti).** Le ultime righe di `server.log` ne indicano la causa. Provare **Yeniden başlat** e, se non basta, **Kurulumu onar**. Se non si risolve nemmeno così, scegliere **Sorunu bildir (GitHub)**.
- **L'icona dice "Veritabanı güncellemesi 15 dakikada bitmedi" (L'aggiornamento del database non è terminato in 15 minuti).** Un altro programma potrebbe aver bloccato il file del database (un programma di backup o di sincronizzazione). Fermare quel programma e scegliere **Yeniden başlat**.
- **Il browser non si è aperto.** Fare doppio clic sull'icona oppure scrivere a mano l'indirizzo: `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->
