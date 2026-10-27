---
title: Analytics
description: Che cosa fanno sul sito le persone arrivate dalla ricerca: rapporti di Google Analytics 4, eventi chiave e stato della misurazione.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-22
---

Qui si vede che cosa fanno dopo le persone che arrivano sul sito. Search Console racconta che cosa succede su Google. Analytics racconta che cosa fa il visitatore sul sito.

Ci sono sette rapporti di Google Analytics 4. Per impostazione predefinita la schermata mostra solo chi arriva dalla ricerca (ricerca organica). L'ottava scheda controlla la misurazione stessa: se il contatore funziona e se è definito un evento chiave.

## Cosa c'è nella schermata

**Schede.** **Pagine di destinazione**, **Pagine e schermate**, **Acquisizione del traffico**, **Eventi chiave**, **E-commerce**, **Ricerca nel sito**, **Pubblico** e **Stato della misurazione**. Sotto ogni scheda c'è una breve domanda. La pagina di ingresso è la prima pagina in cui il visitatore entra nel sito. L'evento chiave è un'azione che si considera importante.

**Controlli.** In **Periodo** si sceglie Son 7 gün (Ultimi 7 giorni), Son 28 gün (Ultimi 28 giorni) o Son 3 ay (Ultimi 3 mesi). In **Canale** si sceglie Organik arama (Ricerca organica, predefinito) o Tüm trafik (Tutto il traffico). **Righe** è 50, 100 o 200. Nella scheda del pubblico si scelgono **Dispositivo**, **Paese** e **Nuovi / di ritorno**. Nella scheda del traffico si scelgono **Gruppo di canali**, **Sorgente / mezzo** e **Campagna**. Le scelte vengono scritte nella barra degli indirizzi.

**Pannello delle sessioni organiche.** Nella scheda Pagine di ingresso sta sopra la tabella. Una sessione è una visita intera. Il pannello ha la linea delle sessioni giornaliere e le schede **Sessioni** ed **Tasso di coinvolgimento**. Se si misurano i ricavi, compare anche **Ricavi organici**. Tutte mostrano anche la variazione rispetto al periodo precedente.

**Tabella.** Le colonne cambiano secondo il rapporto. Per esempio **Dominio**, **Pagina di destinazione**, **Pagina**, **Nome evento**, **Canale**, **Dispositivo**, **Paese**, **Articolo**, **Termine di ricerca**. Le misure sono: **Sessioni**, **Utenti attivi**, **Tasso di coinvolgimento**, **Eventi chiave**, **Ricavi**, **Visualizzazioni**. Se non è definito alcun evento chiave, risulta sempre 0.

**Riga sotto la tabella.** Indica quante righe sono mostrate. Se Google ha campionato i dati, si aggiunge "campionate"; se ha nascosto righe per motivi di privacy, si aggiunge "righe sotto le soglie nascoste".

**Filtri rapidi.** **Solo organico**, **Basso coinvolgimento** (sotto il 50 per cento), **Con conversioni**, **Con ricavi**, **Tempo di coinvolgimento basso**, **Traffico elevato, conversione bassa**.

**Schede di riepilogo.** Le schede Eventi chiave, E-commerce e Ricerca nel sito hanno ciascuna le proprie schede di riepilogo.

**Scheda Stato della misurazione.** Ci sono quattro schede: **Stream di dati web**, **Eventi chiave**, **Dimensioni personalizzate**, **Risultati**. Il problema rilevato può essere uno di questi: "Nessuno stream di dati web", "Misurazione avanzata disattivata", "La ricerca nel sito non viene misurata", "Nessun evento chiave impostato", "L'inventario potrebbe essere incompleto". Le sette opzioni della misurazione avanzata compaiono una per una: Scorrimenti, Clic in uscita, Ricerca nel sito, Video, Download di file, Form, Modifiche alla pagina. Se non ci sono problemi, scrive "Non manca nulla nell'impostazione della misurazione.".

**Stati vuoti.** Se non ci sono dati, la schermata scrive "Nessun dato in questo periodo" e compaiono due scorciatoie: **Visualizza tutto il traffico**, **Controlla lo stato della misurazione**. Se Analytics non è collegato, scrive "Google Analytics non è connesso".

## Come si usa

1. Guardare prima la scheda **Stato della misurazione**. Se scrive "Nessun evento chiave impostato", le colonne delle conversioni restano sempre a zero. Definire prima un evento chiave in Analytics.
2. Nella scheda **Pagine di destinazione** guardare la colonna **Dominio**. Se compare localhost o 127.0.0.1, un sito di prova sul proprio computer sta inviando dati. Quelle righe non sono visite reali. L'app non le filtra al posto dell'utente.
3. Se il traffico è calato, aprire la scheda **Acquisizione del traffico** con **Gruppo di canali**. Se il calo riguarda solo la ricerca, il problema è nella ricerca. Se il calo è in tutti i canali, il problema è nella misurazione o nel sito.
4. Il pulsante **Traffico elevato, conversione bassa** mostra i punti in cui Google manda visitatori ma la pagina non riesce a trattenerli. Che cosa fare si trova nella schermata Opportunità.

## Come si calcolano i numeri

L'intervallo termina ieri, nel fuso orario dell'account. Analytics fornisce i dati con un giorno di ritardo. Se è scelto "Ricerca organica", vengono contate solo le visite che arrivano da Google o da un altro motore di ricerca.

Ogni rapporto chiede al massimo 200 righe. Lo stato della misurazione legge le impostazioni di Analytics e non consuma la quota dei rapporti. Se la quota dei rapporti finisce, compare l'errore "Google Analytics reporting quota is exhausted." (la quota dei rapporti di Analytics è esaurita). La quota si segue nella sezione dei limiti di **Impostazioni**.

## Domande frequenti

**Perché il numero di sessioni è diverso dai clic di Search Console?** Contano cose diverse. Search Console conta i clic su Google. Analytics conta le sessioni che arrivano sul sito. Un visitatore che non dà il consenso ai cookie non arriva mai in Analytics.

**Il numero di righe si ferma a 200.** Per volta si chiedono al massimo 200 righe. Accorciare il periodo o cambiare la suddivisione.

**Perché la quota è finita?** Un account standard dispone di 200.000 token (l'unità di quota) al giorno e 40.000 all'ora. Ogni rapporto consuma alcuni token. Premere **Aggiorna** più volte di seguito consuma la quota.

## Limiti

Ciò che Analytics non misura, questa schermata non può mostrarlo. Rientrano qui le visite senza consenso ai cookie, gli eventi chiave non definiti e la misurazione avanzata disattivata. La schermata non filtra da sola il traffico di localhost. Analytics e Search Console riportano i dati in fusi orari diversi. Gli abbinamenti giornalieri possono slittare di un giorno.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
