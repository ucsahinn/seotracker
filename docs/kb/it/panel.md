---
title: Pannello
description: È la prima schermata che si vede aprendo il progetto. I numeri di ricerca degli ultimi 28 giorni, il riepilogo dell'ultimo controllo e le cose da fare stanno qui.
screen: Panel
route: /p/<proje>
updated: 2026-10-22
---

Qui si vede lo stato più recente del sito e si scopre qual è la prossima cosa da fare. È la prima schermata che compare aprendo il progetto.

I numeri di ricerca arrivano da Search Console di Google. I numeri dei visitatori arrivano da Google Analytics. Il riepilogo del controllo arriva dal crawler (il programma che visita le pagine) dell'app stessa. Il pulsante **Yenile** (Aggiorna) in alto aggiorna tutto. **Denetimi başlat** (Avvia il controllo) porta alla schermata del controllo.

## Cosa c'è nella schermata

**Quattro schede numeriche.** Le schede sono **Tıklama** (Clic), **Gösterim** (Impressioni), **Tıklama oranı** (Percentuale di clic) e **Ortalama sıra** (Posizione media). Tutte mostrano gli ultimi 28 giorni. In ogni scheda c'è una freccia che confronta con i 28 giorni precedenti. Nella posizione media un numero piccolo è buono, perché 1 è la posizione più alta. Per questo un calo è una buona notizia e la freccia prende il colore corrispondente. Se Search Console non è collegato, la scheda scrive "Search Console'u bağlayın" (Collegare Search Console).

**Prossimi passi.** L'app suggerisce al massimo tre cose da fare. I suggerimenti arrivano in quest'ordine:

- Se Search Console non è collegato, **Search Console'u bağla** (Collega Search Console).
- Se non c'è alcun controllo o l'ultimo ha più di sette giorni, **Denetimi başlat**.
- Se ci sono problemi gravi, **Kritik sorunları gör** (Vedi i problemi critici).
- Poi **Fırsatları aç** (Apri le opportunità) e **Uyarıları gör** (Vedi gli avvisi).

Quando il compito è fatto, la voce sparisce dall'elenco.

**Novità dell'ultimo controllo e Düzelenler (Risolti).** Confronta gli ultimi due controlli. Si vede quale problema è comparso in quante pagine e quale è diminuito. Se non c'è nulla di risolto, la scheda scrive "Düzelen sorun yok." (Nessun problema risolto.).

**Andamento dei clic.** I clic giornalieri degli ultimi 28 giorni compaiono come una linea. Se ci sono dati per meno di quattro giorni, la linea non viene disegnata. Il collegamento **Sorguları aç** (Apri le query) porta alla schermata Arama performansı (Prestazioni di ricerca).

**Query in posizione 5-20.** Qui stanno le prime quattro ricerche per cui Google mostra il sito tra la 5ª e la 20ª posizione. Con un po' di lavoro possono salire alla prima pagina o nelle prime posizioni. **Tümünü gör** (Vedi tutto) apre l'elenco completo.

**Scheda del controllo del sito.** La scheda mostra quante pagine sono state scansionate, i tre problemi più frequenti e le cinque pagine con più problemi. Mentre il controllo è in corso, la scheda si aggiorna ogni cinque secondi. L'icona del punto interrogativo spiega i tre livelli di gravità:

- Kritik (Critico): compromette direttamente la visibilità nelle ricerche.
- Uyarı (Avviso): nel tempo erode le posizioni, ma non è urgente.
- Bilgi (Informazione): piccole occasioni di miglioramento.

**Scheda del traffico organico.** Compare se Google Analytics è collegato. Per i visitatori che arrivano dalla ricerca mostra **Oturum** (Sessioni), **Aktif kullanıcı** (Utenti attivi), **Etkileşim oranı** (Percentuale di coinvolgimento) e **Anahtar olay** (Eventi chiave). Se il sito misura le vendite, si aggiungono **Organik gelir** (Ricavi organici) e **Sipariş** (Ordini).

## Come si usa

1. Aprirlo una volta alla settimana e guardare le frecce nelle quattro schede.
2. Fare la prima cosa nel riquadro **Sıradaki adımlar** (Prossimi passi). Se il riquadro è vuoto, non ci sono lavori urgenti.
3. Se l'ultimo controllo ha più di sette giorni, scegliere **Denetimi başlat**.
4. Rivedere titolo e descrizione delle pagine nella scheda **Sıra 5-20 arası sorgular** (Query in posizione 5-20). Qui di solito c'è il guadagno più facile.

## Come si calcolano i numeri

Le quattro schede arrivano da un solo rapporto di Search Console. Google fornisce i dati con tre giorni di ritardo. Per questo l'intervallo di 28 giorni non termina oggi, ma tre giorni fa. Il periodo precedente è composto dai 28 giorni immediatamente prima di questo intervallo. Se il periodo precedente è zero, la freccia non viene mostrata.

La posizione media dà più peso alle ricerche con molte impressioni. Questi quattro numeri sono il totale reale del sito. Sommando le righe della tabella nella schermata Arama performansı si ottiene un valore più alto, perché Google conta separatamente ogni pagina che compare nella stessa ricerca.

## Domande frequenti

**Perché mancano i dati di oggi?** Google non fornisce ancora gli ultimi tre giorni. Non manca nulla: attendere.

**La posizione media è aumentata, è un bene?** No. Passare da 3 a 7 significa scendere. Per questo la freccia diventa rossa.

**La scheda del controllo mostra ciò che vede Google?** No. Mostra ciò che ha trovato la scansione dell'app. Quali pagine Google ha registrato si vede nella scheda **Dizin durumu** (Stato dell'indice) della schermata del controllo.

**La scheda del traffico organico non c'è.** In Impostazioni del progetto Google Analytics non è collegato. Collegarlo è una scelta dell'utente.

## Limiti

Il Panel non mostra volumi di ricerca, backlink (collegamenti da altri siti verso il suo) né posizioni dei concorrenti. Questi dati non sono nell'app. Le query cercate pochissimo vengono nascoste in Search Console. Per vedere i dettagli si passa alla schermata corrispondente.

<!-- Kaynaklar: src/routes/_project/p/$projectId/index.tsx; src/client/features/dashboard/DashboardPage.tsx; DashboardMetrics.tsx; SearchInsights.tsx; DashboardCards.tsx; SeverityBar.tsx; Ga4Card.tsx; NextStepsCard.tsx; AuditFreshnessCard.tsx; src/client/features/dashboard/dashboardGscReport.ts; src/server/features/dashboard/services/DashboardService.ts; src/server/features/gsc/searchPerformanceReport.ts; src/shared/dataFreshness.ts; src/shared/delta.ts -->
