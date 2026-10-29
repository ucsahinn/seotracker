---
title: Che cos'è seowatcher?
description: seowatcher è un'app SEO gratuita e open source che riunisce Search Console, GA4, controllo del sito e PageSpeed sul tuo computer.
kind: kavram
updated: 2026-10-29
---

seowatcher è un'app SEO gratuita, open source e con licenza MIT, che mostra Google Search Console, Google Analytics 4, il proprio crawler del sito e PageSpeed Insights in un unico pannello. Funziona sul tuo computer, non nel cloud: un solo file di installazione per Windows 10 e 11, Docker su Mac e Linux. Su GitHub si chiama seotracker; è la stessa app.

## In breve

| Domanda                 | Risposta                                                                               |
| ----------------------- | -------------------------------------------------------------------------------------- |
| Prezzo                  | Gratuito. Nessun abbonamento, nessun account, nessuna carta                            |
| Licenza                 | Open source MIT, tutto il codice è su GitHub                                           |
| Piattaforme             | File di installazione per Windows 10/11 (64 bit); Docker su Mac e Linux                |
| Fonti dei dati          | Google Search Console, Google Analytics 4, il crawler dell'app, PageSpeed Insights     |
| Controllo del sito      | 202 regole                                                                             |
| Collegamento IA         | Assistenti come Claude Code, Codex, Cursor e Gemini CLI tramite MCP; 6 attività pronte |
| Lingue dell'interfaccia | Turco, inglese, tedesco, francese, italiano, portoghese                                |
| Utenti                  | Un solo utente, accessibile solo dal tuo computer                                      |
| Dove stanno i dati      | `%LOCALAPPDATA%\seowatcher` su Windows, il volume `seotracker_data` in Docker          |
| Versione                | 0.8.6 Alpha, 29 ottobre 2026                                                           |
| Dimensione              | File di installazione 86 MB, 313 MB una volta installato                               |
| Basato su               | open-seo (every-app)                                                                   |

## Che cosa fa seowatcher?

- **Prestazioni di ricerca:** clic, impressioni, percentuale di clic e posizione media dalla Search Console, per query, pagina, paese e dispositivo. Google fornisce 16 mesi di storico; l'app costruisce anche un proprio archivio.
- **Opportunità:** ordina le pagine che Google mostra già in base a quanti clic in più potrebbero portare con la percentuale di clic del tuo sito, e suggerisce il lavoro da fare per ogni pagina.
- **Controllo del sito:** analizza il sito con 202 regole: link non funzionanti, titoli mancanti o troppo lunghi, pagine lente, pagine che Google non indicizza. Ogni risultato dice cosa fare.
- **Stato dell'indice:** legge con il Controllo URL la scheda che Google tiene per ogni pagina (indicizzata o no, perché, ultima scansione). Google limita il controllo a 2.000 URL per proprietà al giorno.
- **Analisi:** mostra visite, coinvolgimento ed eventi chiave di GA4 accanto ai dati di ricerca.
- **Report:** salva report HTML in un solo file, da aprire sul telefono, stampare o inviare per e-mail.
- **Assistente IA:** tramite MCP il tuo assistente legge i numeri, avvia il controllo e scrive il report.

## Che cosa non fa seowatcher?

- Non stima il volume di ricerca. Le impressioni vengono da Google e non sono volume di ricerca.
- Non conta i siti che rimandano a te (backlink).
- Non segue il posizionamento dei concorrenti; legge solo i siti che aggiungi come progetti.
- Non è un servizio cloud ospitato; non ci sono account di team né accesso multiutente.
- Non esistono ancora un'app mobile separata né un'estensione del browser.

## Che differenza c'è con la Search Console?

La Search Console è la fonte dei dati; seowatcher li legge e ci costruisce sopra un elenco di lavoro. La Search Console ti mostra i numeri; seowatcher mostra in un solo posto quale pagina guardare per prima, dove il sito non rispetta le 202 regole e che cosa ha misurato Analytics. Poiché conserva un archivio sul tuo computer, col tempo puoi guardare anche più indietro della finestra di 16 mesi di Google. I numeri vengono dalla stessa fonte, ma Google li fornisce con circa tre giorni di ritardo e nasconde le query molto rare; per questo il totale delle pagine e il totale del sito possono differire.

## Che differenza c'è con le suite SEO a pagamento?

Le suite SEO a pagamento vendono stime di volume di ricerca, backlink e posizionamento dei concorrenti ricavate dalle proprie scansioni e da dati acquistati. seowatcher non fa nulla di tutto ciò; usa solo i dati che Google ti dà già come proprietario del sito, più la propria scansione. Per questo è gratuito, e per questo non è pensato per le ricerche di mercato. È adatto se vuoi seguire, correggere e documentare la presenza del tuo sito su Google.

## Per chi è?

Per proprietari di siti, team di contenuti e consulenti SEO freelance che vogliono vedere in un solo posto i dati Search Console e GA4 dei propri siti o di quelli dei clienti. Ogni progetto tiene separati proprietà Google, controlli e report.

## Domande frequenti

### È davvero gratuito?

Sì. È un progetto open source con licenza MIT. I servizi Google che usa restano nei limiti di utilizzo gratuito.

### Dove sono salvati i miei dati?

Su Windows nella cartella `%LOCALAPPDATA%\seowatcher`: il database, la chiave di accesso a Google e i log. La disinstallazione non tocca questa cartella. In Docker i dati stanno nel volume `seotracker_data`.

### A che cosa si collega l'app?

A Google (Search Console, Analytics, PageSpeed), al sito che controlli e a GitHub per verificare le versioni. Se colleghi un assistente IA, i dati che legge possono arrivare al suo fornitore; questo collegamento è facoltativo.

### Funziona su Mac o Linux?

Sì, con Docker. Su Windows l'installazione con un solo file è più semplice.

### Perché devo creare una credenziale Google Cloud?

seowatcher non è un servizio cloud; funziona sul tuo computer e si collega direttamente a Google. Google vuole sapere a chi appartiene l'app che si collega. Lo fai una sola volta.

### Devo esporre l'app su Internet?

No. L'app si apre solo dal tuo computer.

## Da dove cominciare?

1. [Installazione su Windows](/docs/kurulum-windows/) o [installazione con Docker](/docs/kurulum-docker/).
2. [Collegamento con Google](/docs/google-baglantisi/).
3. Se vuoi, la [chiave PageSpeed](/docs/pagespeed-anahtari/) e la [configurazione dell'assistente](/docs/ajan-kurulumu/).

<!-- Kaynaklar: scripts/site-home.tr.html (Kısaca, Sorular, Neler yapar); docs/kb/kurulum-windows.md; docs/kb/kurulum-docker.md; docs/kb/dizin-durumu.md; src/shared/i18n.ts (LOCALES); package.json (version) -->
