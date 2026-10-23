---
title: Controllo del sito
description: L'app visita il sito pagina per pagina, lo controlla con 95 regole e ordina i problemi per gravità. Accanto a ogni problema è scritto che cosa fare.
screen: Site denetimi
route: /p/<proje>/audit
updated: 2026-10-22
---

Qui si impara come trovare e correggere i problemi del sito.

L'app visita il sito con il proprio crawler (il programma che apre e legge le pagine una per una). Cerca collegamenti rotti, titoli mancanti e pagine lente. Alla fine si ottiene un punteggio e un elenco di problemi ordinati per gravità. Sotto ogni problema è scritto come correggerlo.

## Cosa c'è nella schermata

**Scheda "Avvia un nuovo controllo".** Ci sono tre campi.

- **Taranacak site adresi** (Indirizzo del sito da scansionare): il dominio del progetto è già compilato.
- **Kaç sayfa taransın?** (Quante pagine scansionare?): minimo 10, massimo 10.000, predefinito 50. Se si scrive un numero superiore a 500, l'app chiede conferma.
- **Sayfa hızını da ölç** (Misura anche la velocità delle pagine): è disattivata per impostazione predefinita. Se la si attiva, ogni pagina viene misurata su telefono e su computer. La misurazione è eseguita da Google Lighthouse (lo strumento di Google per misurare le pagine).

Senza la chiave PageSpeed (il codice gratuito che Google dà per la misurazione della velocità), la misurazione è limitata a 50 pagine al massimo. Per misurarle tutte, aggiungere una chiave gratuita in **Ayarlar** (Impostazioni).

**Controlli precedenti.** Di ogni controllo sono elencati data, stato, numero di pagine e numero di problemi. I numeri dei problemi sono ogni cento pagine, così si possono confrontare controlli da 50 e da 500 pagine. **Denetimi sil** (Elimina il controllo) nel menu della riga elimina tutto e non si può annullare.

**Dettaglio del controllo.** Se la scansione resta incompleta, compare un avviso giallo. Per esempio "Denetim bu siteyi tamamen tarayamadı." (Il controllo non è riuscito a scansionare tutto il sito.), perché la protezione anti-bot lo ha bloccato. I risultati vengono comunque mostrati. **Raporu indir** (Scarica il report) scarica un report HTML in un solo file e lo salva nella schermata **Raporlar** (Report).

**Punteggio del sito.** Si vede un numero da 0 a 100. Sotto, le tre azioni che farebbero guadagnare più punti sono scritte con "+N puan" (+N punti).

**Due grafici.** Uno mostra quale problema interessa più pagine, l'altro quanto sono gravi i problemi.

**Quattro schede.**

- **Sorunlu sayfalar** (Pagine con problemi): aprendo la scheda si vedono la causa e il riquadro **Nasıl düzeltilir?** (Come si corregge?). Pulsanti: **URL'leri kopyala** (Copia gli URL), **CSV indir** (Scarica il CSV), **Sayfalar sekmesinde göster** (Mostra nella scheda Pagine).
- **Sayfalar** (Pagine): ogni pagina scansionata. Filtri rapidi: **Dizine kapalı** (Esclusa dall'indice), **Yavaş** (Lenta, oltre 1 secondo), **Alt metni eksik** (Testo alternativo mancante), **Site haritasında yok** (Assente dalla mappa del sito).
- **Dizin durumu** (Stato dell'indice): la risposta di Google per ogni pagina. È spiegata in una guida a parte.
- **Hız** (Velocità): compare solo se la misurazione della velocità è attiva.

## Come si usa

1. Nel primo controllo lasciare il numero di pagine a 50. Tenere disattivata la misurazione della velocità. Finisce in un paio di minuti.
2. Iniziare con le tre azioni "+N puan" nella scheda del punteggio. Sono quelle che portano più punti con meno fatica.
3. Nella scheda **Sorunlu sayfalar** risolvere prima i problemi critici. Un problema critico impedisce a Google di vedere la pagina.
4. Con **URL'leri kopyala** prendere l'elenco e darlo a chi gestisce il sito. Il riquadro **Nasıl düzeltilir?** si può inoltrare così com'è.
5. Dopo le correzioni, fare clic su **Aynı ayarlarla yeniden başlat** (Riavvia con le stesse impostazioni). Nel Panel (Pannello) la scheda "Düzelenler" (Risolti) mostra che cosa è stato chiuso.
6. Attivare la misurazione della velocità una volta alla settimana, per le pagine importanti. Ogni pagina richiede circa dieci secondi e consuma la quota di Google.

## Come si calcolano i numeri

**Punteggio.** Ogni problema ha un peso diverso: critico 40, avviso 15, informazione 3. Più pagine interessa un problema, più toglie al punteggio. Il punteggio parte da 100 e non scende sotto zero. Anche con un solo problema, il punteggio è al massimo 99.

Le fasce del punteggio sono: 90 e oltre molto buono, 70 e oltre buono, 50 e oltre medio, sotto debole.

**Scansione.** L'app non appesantisce il sito. Invia al massimo due richieste alla volta. Se il sito risponde "troppe richieste" (429), attende. Se l'attesa totale supera 30 minuti, la scansione si ferma.

**Misurazione della velocità.** In un sito di 212 pagine l'intero controllo è durato 35 minuti. Circa 24 erano di misurazione della velocità. Se la quota giornaliera finisce, la misurazione si ferma e restano i risultati ottenuti fino a quel momento. Un problema viene segnalato nei casi seguenti:

- Il contenuto principale compare dopo più di 4 secondi (LCP).
- Il contenuto si sposta per più di 0,25 (CLS).
- La risposta a un clic arriva dopo più di 500 millisecondi (INP).
- Il punteggio SEO di Lighthouse è sotto 90.

## Domande frequenti

**Il controllo mostra ciò che vede Google?** No. Il crawler dell'app legge la pagina per conto suo. La risposta di Google è nella scheda **Dizin durumu**.

**Il punteggio è 98, perché non 100?** Anche un solo problema tiene il punteggio a 99.

**Che cosa significa l'avviso "Engellendik" (Siamo stati bloccati)?** La protezione anti-bot del sito ha fermato il crawler. Nel firewall consentire il nome "seotracker-audit".

**La misurazione della velocità si è interrotta a metà.** Di solito manca la chiave PageSpeed oppure la quota giornaliera è finita. La scheda della quota in **Ayarlar** ne indica il motivo.

**Quanti controlli girano nello stesso momento?** Al massimo tre. Due controlli che misurano la velocità si rallentano a vicenda.

## Limiti

Il crawler può non vedere il contenuto che JavaScript (il codice che gira nella pagina) aggiunge in un secondo momento. Un controllo scansiona al massimo 10.000 pagine. La misurazione della velocità è una misura di laboratorio di Google, non un dato di visitatori reali. Il controllo non cambia nulla nel sito. La correzione la fa l'utente o il suo assistente.

<!-- Kaynaklar: src/client/features/audit/launch/LaunchView.tsx; LaunchFormCard.tsx; useLaunchController.ts; AuditHistorySection.tsx; ProgressCard.tsx; ResultsView.tsx; ResultsTables.tsx; TabIntro.tsx; ScoreCard.tsx; IssueWorkloadChart.tsx; SeverityDonut.tsx; IssueCard.tsx; DownloadReportButton.tsx; export.ts; src/shared/auditScore.ts; src/shared/audit-limits.ts; src/shared/audit-issues/speed.ts; src/server/lib/audit/crawl-window.ts; crawl-throttle.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/audit/report/buildAuditReportHtml.ts -->
