---
title: Che cos'è seowatcher?
description: seowatcher è un'app SEO gratuita e open source che riunisce Search Console, GA4, controllo del sito e PageSpeed sul Suo computer.
kind: kavram
updated: 2026-10-29
---

Tutti i dati compaiono in un unico pannello e restano sul computer dell'utente, non nel cloud. Per Windows 10 e 11 basta un solo file di installazione; su Mac e Linux l'app gira in Docker. Su GitHub il progetto si chiama seotracker: è la stessa app.

## In breve

| Domanda                 | Risposta                                                                           |
| ----------------------- | ---------------------------------------------------------------------------------- |
| Prezzo                  | Gratuito. Nessun abbonamento, nessun account, nessuna carta                        |
| Licenza                 | Open source MIT, tutto il codice è su GitHub                                       |
| Piattaforme             | File di installazione per Windows 10/11 (64 bit); Docker su Mac e Linux            |
| Fonti dei dati          | Google Search Console, Google Analytics 4, il crawler dell'app, PageSpeed Insights |
| Controllo del sito      | 202 regole                                                                         |
| Collegamento IA         | Agenti come Claude Code, Codex, Cursor e Gemini CLI tramite MCP; 6 skill pronte    |
| Lingue dell'interfaccia | Turco, inglese, tedesco, francese, italiano, portoghese                            |
| Utenti                  | Un solo utente, accessibile solo dal Suo computer                                  |
| Dove stanno i dati      | `%LOCALAPPDATA%\seowatcher` su Windows, il volume `seotracker_data` in Docker      |
| Versione                | 0.8.7 Alpha, 29 ottobre 2026                                                       |
| Dimensione              | File di installazione 86 MB, 313 MB una volta installato                           |
| Basato su               | open-seo (every-app)                                                               |

## Che cosa fa seowatcher?

- **Rendimento della ricerca:** clic, impressioni, percentuale di clic e posizione media da Search Console, per query, pagina, paese e dispositivo. Google fornisce 16 mesi di storico; mentre è aperta la schermata Rendimento della ricerca o Monitoraggio del posizionamento, l'app lo copia anche in un proprio archivio.
- **Opportunità:** ordina le pagine che Google mostra già secondo il tetto di clic aggiuntivi, calcolato con la percentuale di clic del Suo sito, e suggerisce il lavoro da fare per ogni pagina.
- **Controllo del sito:** analizza il sito con 202 regole: link non funzionanti, titoli mancanti o troppo lunghi, pagine lente, pagine che Google non indicizza. Ogni risultato dice cosa fare.
- **Stato dell'indicizzazione:** legge con il Controllo URL la scheda che Google tiene per ogni pagina (indicizzata o no, perché, ultima scansione). Google limita il controllo a 2.000 URL per proprietà al giorno.
- **Analytics:** mostra visite, coinvolgimento ed eventi chiave di GA4 accanto ai dati di ricerca.
- **Report:** salva report HTML in un solo file, da aprire sul telefono, stampare o inviare per e-mail.
- **Agente IA:** tramite MCP un agente legge i numeri, avvia il controllo e scrive il report.

## Che cosa non fa seowatcher?

- Non stima il volume di ricerca: le impressioni mostrate vengono da Google.
- Non conta i siti che rimandano al Suo (backlink).
- Non segue il posizionamento dei concorrenti; legge solo i siti aggiunti come progetti.
- Non è un servizio cloud ospitato; non ci sono account di team né accesso multiutente.
- Non esistono ancora un'app mobile separata né un'estensione del browser.

## Che differenza c'è con Search Console?

Search Console fornisce i numeri; seowatcher li legge e ne ricava un elenco di lavoro, mostrando in un solo posto quale pagina guardare per prima, dove il sito non rispetta le 202 regole e che cosa ha misurato Analytics. Poiché conserva un archivio in locale, col tempo permette di guardare anche più indietro della finestra di 16 mesi di Google. I numeri vengono dalla stessa fonte, ma Google li fornisce con circa tre giorni di ritardo e nasconde le query molto rare; per questo il totale delle pagine e il totale del sito possono differire.

## Che differenza c'è con le suite SEO a pagamento?

Le suite SEO a pagamento vendono stime di volume di ricerca, backlink e posizionamento dei concorrenti ricavate dalle proprie scansioni e da dati acquistati. seowatcher non fa nulla di tutto ciò; usa solo i dati che Google fornisce già al proprietario del sito, più la propria scansione. Per questo è gratuito, e per questo non è pensato per le ricerche di mercato. È adatto a chi vuole seguire, correggere e documentare la presenza del proprio sito su Google.

## Per chi è?

Per proprietari di siti, team di contenuti e consulenti SEO freelance che vogliono vedere in un solo posto i dati Search Console e GA4 dei propri siti o di quelli dei clienti. Ogni progetto tiene separati proprietà Google, controlli e report.

## Domande frequenti

### È davvero gratuito?

Sì. È un progetto open source con licenza MIT. I servizi Google che usa restano nei limiti di utilizzo gratuito.

### Dove sono salvati i dati?

Su Windows nella cartella `%LOCALAPPDATA%\seowatcher`: il database, la chiave di accesso a Google e i log. La disinstallazione non tocca questa cartella. In Docker i dati stanno nel volume `seotracker_data`.

### A che cosa si collega l'app?

A Google (Search Console, Analytics, PageSpeed), al sito controllato e a GitHub per verificare le versioni. Se si collega un agente IA, i dati che legge possono arrivare al suo fornitore; questo collegamento è facoltativo.

### Funziona su Mac o Linux?

Sì, con Docker. Su Windows l'installazione con un solo file è più semplice.

### Perché serve una credenziale Google Cloud?

seowatcher non è un servizio cloud: funziona sul Suo computer e si collega direttamente a Google. Google vuole sapere a chi appartiene l'app che si collega. La credenziale si crea una sola volta.

### Occorre esporre l'app su Internet?

No. L'app si apre solo dal Suo computer.

## Da dove cominciare?

1. [Installazione su Windows](/docs/kurulum-windows/) o [installazione con Docker](/docs/kurulum-docker/).
2. [Collegamento con Google](/docs/google-baglantisi/).
3. Facoltativi: la [chiave PageSpeed](/docs/pagespeed-anahtari/) e la [configurazione dell'agente](/docs/ajan-kurulumu/).

<!-- Kaynaklar: scripts/site-home.tr.html (Kısaca, Sorular, Neler yapar); docs/kb/kurulum-windows.md; docs/kb/kurulum-docker.md; docs/kb/dizin-durumu.md; src/shared/i18n.ts (LOCALES); package.json (version) -->
