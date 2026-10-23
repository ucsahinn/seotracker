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

**Schede.** **Giriş sayfaları** (Pagine di ingresso), **Sayfa performansı** (Prestazioni delle pagine), **Trafik kaynakları** (Origini del traffico), **Anahtar olaylar** (Eventi chiave), **E-ticaret** (E-commerce), **Site içi arama** (Ricerca nel sito), **Kitle dağılımı** (Distribuzione del pubblico) e **Ölçüm durumu** (Stato della misurazione). Sotto ogni scheda c'è una breve domanda. La pagina di ingresso è la prima pagina in cui il visitatore entra nel sito. L'evento chiave è un'azione che si considera importante.

**Controlli.** In **Dönem** (Periodo) si sceglie Son 7 gün (Ultimi 7 giorni), Son 28 gün (Ultimi 28 giorni) o Son 3 ay (Ultimi 3 mesi). In **Kanal** (Canale) si sceglie Organik arama (Ricerca organica, predefinito) o Tüm trafik (Tutto il traffico). **Satır** (Righe) è 50, 100 o 200. Nella scheda del pubblico si scelgono **Cihaz** (Dispositivo), **Ülke** (Paese) e **Yeni / geri dönen** (Nuovi / di ritorno). Nella scheda del traffico si scelgono **Kanal grubu** (Gruppo di canali), **Kaynak / ortam** (Origine / mezzo) e **Kampanya** (Campagna). Le scelte vengono scritte nella barra degli indirizzi.

**Pannello delle sessioni organiche.** Nella scheda Pagine di ingresso sta sopra la tabella. Una sessione è una visita intera. Il pannello ha la linea delle sessioni giornaliere e le schede **Oturum** (Sessioni) ed **Etkileşim oranı** (Percentuale di coinvolgimento). Se si misurano i ricavi, compare anche **Organik gelir** (Ricavi organici). Tutte mostrano anche la variazione rispetto al periodo precedente.

**Tabella.** Le colonne cambiano secondo il rapporto. Per esempio **Alan adı** (Dominio), **Giriş sayfası** (Pagina di ingresso), **Sayfa** (Pagina), **Olay** (Evento), **Kanal** (Canale), **Cihaz** (Dispositivo), **Ülke** (Paese), **Ürün** (Prodotto), **Arama terimi** (Termine di ricerca). Le misure sono: **Oturum** (Sessioni), **Aktif kullanıcı** (Utenti attivi), **Etkileşim oranı** (Percentuale di coinvolgimento), **Anahtar olay** (Eventi chiave), **Gelir** (Ricavi), **Görüntülenme** (Visualizzazioni). Se non è definito alcun evento chiave, risulta sempre 0.

**Riga sotto la tabella.** Indica quante righe sono mostrate. Se Google ha campionato i dati, si aggiunge "örneklenmiş" (campionati); se ha nascosto righe per motivi di privacy, si aggiunge "eşik altı satırlar gizlendi" (righe sotto soglia nascoste).

**Filtri rapidi.** **Sadece organik** (Solo organico), **Etkileşimi düşük** (Coinvolgimento basso, sotto il 50 per cento), **Dönüşümü olan** (Con conversioni), **Geliri olan** (Con ricavi), **Etkileşim süresi düşük** (Tempo di coinvolgimento basso), **Trafiği yüksek, dönüşümü düşük** (Molto traffico, poche conversioni).

**Schede di riepilogo.** Le schede Eventi chiave, E-commerce e Ricerca nel sito hanno ciascuna le proprie schede di riepilogo.

**Scheda Stato della misurazione.** Ci sono quattro schede: **Web veri akışı** (Flusso di dati web), **Anahtar olay**, **Özel boyut** (Dimensione personalizzata), **Bulgu** (Problema rilevato). Il problema rilevato può essere uno di questi: "Web veri akışı yok" (Nessun flusso di dati web), "Gelişmiş ölçüm kapalı" (Misurazione avanzata disattivata), "Site içi arama ölçülmüyor" (La ricerca nel sito non è misurata), "Anahtar olay tanımlı değil" (Nessun evento chiave definito), "Envanter eksik olabilir" (L'inventario potrebbe essere incompleto). Le sette opzioni della misurazione avanzata compaiono una per una: Kaydırma (Scorrimento), Dış bağlantı (Collegamento esterno), Site içi arama (Ricerca nel sito), Video, Dosya indirme (Download di file), Form (Modulo), Sayfa geçişleri (Cambi di pagina). Se non ci sono problemi, scrive "Ölçüm kurulumunda eksik bulunamadı." (Nessuna mancanza trovata nella configurazione della misurazione.).

**Stati vuoti.** Se non ci sono dati, la schermata scrive "Bu dönemde veri yok" (Nessun dato in questo periodo) e compaiono due scorciatoie: **Tüm trafiğe bak** (Guarda tutto il traffico), **Ölçüm durumunu kontrol et** (Controlla lo stato della misurazione). Se Analytics non è collegato, scrive "Google Analytics bağlı değil" (Google Analytics non è collegato).

## Come si usa

1. Guardare prima la scheda **Ölçüm durumu**. Se scrive "Anahtar olay tanımlı değil", le colonne delle conversioni restano sempre a zero. Definire prima un evento chiave in Analytics.
2. Nella scheda **Giriş sayfaları** guardare la colonna **Alan adı**. Se compare localhost o 127.0.0.1, un sito di prova sul proprio computer sta inviando dati. Quelle righe non sono visite reali. L'app non le filtra al posto dell'utente.
3. Se il traffico è calato, aprire la scheda **Trafik kaynakları** con **Kanal grubu**. Se il calo riguarda solo la ricerca, il problema è nella ricerca. Se il calo è in tutti i canali, il problema è nella misurazione o nel sito.
4. Il pulsante **Trafiği yüksek, dönüşümü düşük** mostra i punti in cui Google manda visitatori ma la pagina non riesce a trattenerli. Che cosa fare si trova nella schermata Fırsatlar (Opportunità).

## Come si calcolano i numeri

L'intervallo termina ieri, nel fuso orario dell'account. Analytics fornisce i dati con un giorno di ritardo. Se è scelto "Organik arama", vengono contate solo le visite che arrivano da Google o da un altro motore di ricerca.

Ogni rapporto chiede al massimo 200 righe. Lo stato della misurazione legge le impostazioni di Analytics e non consuma la quota dei rapporti. Se la quota dei rapporti finisce, compare l'errore "Google Analytics reporting quota is exhausted." (la quota dei rapporti di Analytics è esaurita). La quota si segue nella sezione dei limiti di **Ayarlar** (Impostazioni).

## Domande frequenti

**Perché il numero di sessioni è diverso dai clic di Search Console?** Contano cose diverse. Search Console conta i clic su Google. Analytics conta le sessioni che arrivano sul sito. Un visitatore che non dà il consenso ai cookie non arriva mai in Analytics.

**Il numero di righe si ferma a 200.** Per volta si chiedono al massimo 200 righe. Accorciare il periodo o cambiare la suddivisione.

**Perché la quota è finita?** Un account standard dispone di 200.000 token (l'unità di quota) al giorno e 40.000 all'ora. Ogni rapporto consuma alcuni token. Premere **Yenile** più volte di seguito consuma la quota.

## Limiti

Ciò che Analytics non misura, questa schermata non può mostrarlo. Rientrano qui le visite senza consenso ai cookie, gli eventi chiave non definiti e la misurazione avanzata disattivata. La schermata non filtra da sola il traffico di localhost. Analytics e Search Console riportano i dati in fusi orari diversi. Gli abbinamenti giornalieri possono slittare di un giorno.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
