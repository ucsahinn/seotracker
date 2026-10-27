---
title: Configurazione dell'assistente
description: Si collega Claude Code, Codex o Cursor all'app: indirizzo, password, 35 strumenti, 6 attività pronte e quali consumano il limite di Google.
kind: nasil-yapilir
updated: 2026-10-27
---

Al termine l'assistente di intelligenza artificiale sarà collegato all'app e avrà eseguito il suo primo comando. Una volta collegato, si può dire "controlla il sito e scrivi un report". L'assistente legge i dati di Search Console, esegue il controllo e salva il report nella schermata **Report**. Il collegamento avviene tramite MCP, il protocollo con cui l'assistente richiama gli strumenti dell'app (per esempio list_projects). Collegarlo non è obbligatorio. Se non lo si collega, all'app non manca nulla.

## Cosa serve

- L'app in funzione e un progetto con Search Console collegato.
- Uno tra Claude Code, Codex, Cursor, VS Code Copilot o Gemini CLI. L'app fornisce il testo di configurazione già pronto per i primi tre.
- La schermata **Configurazione dell’agente** dell'app. Nel menu a sinistra, nel gruppo **Agente**.

## Passaggi

1. Aprire la schermata **Configurazione dell’agente**. Il badge in alto dice **Non ancora connesso** oppure **Connesso**. Se è collegato, accanto compare un testo come "Claude Code · ultima richiesta 2 min fa". Sotto ci sono l'indirizzo di collegamento e il pulsante di copia: `http://127.0.0.1:3001/mcp` (con Docker `localhost`).
2. Trovare la password. L'app protegge il collegamento dalle chiamate non autorizzate con una password e non la mostra nella schermata. Nel pacchetto Windows la password è nel file `mcp-token` nella cartella dei dati. Dal menu della barra delle applicazioni scegliere **Veri klasörünü aç** (Apri la cartella dei dati). Con Docker scrivere questo comando: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token` (con Git Bash aggiungere all'inizio `MSYS_NO_PATHCONV=1`).
3. Seguire la sezione adatta al proprio assistente.

### Claude Code

Nel terminale (la finestra dei comandi) scrivere quanto segue. Al posto di `<parola>` (in turco "password") mettere la propria password:

```sh
claude mcp add --transport http --scope user seotracker http://127.0.0.1:3001/mcp --header "Authorization: Bearer <parola>"
```

Poi, dentro Claude Code, scrivere `/mcp` e scegliere **Reconnect** (Ricollega). Le attività pronte si richiamano con la barra, come `/seo-audit`.

### Codex

Scrivere questo comando:

```sh
codex mcp add seotracker --url http://127.0.0.1:3001/mcp --bearer-token-env-var SEOTRACKER_MCP_AUTH
```

Poi scrivere la password nella variabile d'ambiente (un'impostazione che il computer ricorda) chiamata `SEOTRACKER_MCP_AUTH`. In Windows, con PowerShell: `[Environment]::SetEnvironmentVariable('SEOTRACKER_MCP_AUTH', '<parola>', 'User')`. Le attività si richiamano come `$seo-audit`.

### Cursor

Nel file `.cursor/mcp.json` del progetto scrivere quanto segue:

```json
{
  "mcpServers": {
    "seotracker": {
      "url": "http://127.0.0.1:3001/mcp",
      "headers": { "Authorization": "Bearer ${env:SEOTRACKER_MCP_AUTH}" }
    }
  }
}
```

Impostare la variabile d'ambiente come per Codex. Questa impostazione non è ancora stata provata su un'installazione di Cursor. Se la versione di Cursor richiede un altro campo, consultare la documentazione di Cursor.

### Testo di configurazione pronto

È la strada più semplice. Per ottenere il testo:

1. Nella schermata scegliere l'agente che si usa, poi premere **Copia comando di configurazione**. Se è scelto Codex, il pulsante copia il testo pensato per Codex.
2. Incollare il testo nell'assistente. L'assistente imposta il collegamento, lo prova con "whoami" e "list_projects", verifica con "whoami" con quale installazione sta parlando e carica le attività pronte.

Il pulsante **Copia il comando per la nuova installazione** nella scheda **Nuova installazione** fa fare all'assistente tutto, dall'avvio dell'app al collegamento con Google. Riconosce sia il pacchetto Windows sia l'installazione Docker.

### Caricare le attività pronte

La scheda **Skill** elenca le sei attività pronte. Dire all'assistente "installa le skill di seotracker". Il testo di configurazione sa dove copiarle. Per aggiornarle, premere il pulsante **Copia il comando di aggiornamento**.

## Strumenti

In totale ci sono 35 strumenti. La colonna "Scrive" indica quelli che modificano i dati dell'app, la colonna "Quota" quelli che consumano il limite giornaliero di Google. Gli strumenti che scrivono non dovrebbero essere richiamati senza l'approvazione dell'utente. Le attività ben configurate lo chiedono, ma l'app no.

| Strumento                                    | Che cosa fa                                                                                                                                                                                                                                                                                                              | Scrive | Quota                                                |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------- |
| `whoami`                                     | Dice con quale account e quale installazione si sta parlando: versione, tipo di installazione (Windows, Docker o sviluppo), numero di porta e, se nota, l'ultima versione.                                                                                                                                               |        |                                                      |
| `get_diagnostics`                            | Fornisce la versione, quale installazione è, i controlli dell'installazione, il numero di righe delle tabelle, gli ultimi 25 controlli e i contatori delle quote.                                                                                                                                                        |        |                                                      |
| `list_projects`                              | Elenca i progetti. Ogni strumento richiede un numero di progetto.                                                                                                                                                                                                                                                        |        |                                                      |
| `create_project`                             | Crea un nuovo progetto.                                                                                                                                                                                                                                                                                                  | Sì     |                                                      |
| `get_project_context`                        | Legge la schermata Informazioni sul progetto.                                                                                                                                                                                                                                                                            |        |                                                      |
| `update_project_context`                     | Modifica le informazioni sul progetto e lascia una nota nel registro delle ricerche.                                                                                                                                                                                                                                     | Sì     |                                                      |
| `get_search_summary`                         | Fornisce la schermata Rendimento della ricerca in una sola chiamata: la finestra dei giorni completi, i totali del sito propri di Search Console con la variazione rispetto al periodo precedente e all'anno scorso, la quota di clic da query nascoste e un elenco di cose da fare ordinato per clic stimati. Gratuito. |        |                                                      |
| `get_search_console_performance`             | Fornisce clic, impressioni, percentuale e posizione per query, pagina, paese, dispositivo o data.                                                                                                                                                                                                                        |        |                                                      |
| `get_search_opportunities`                   | Ricava l'elenco delle opportunità da Search Console e Analytics.                                                                                                                                                                                                                                                         |        |                                                      |
| `get_cannibalization`                        | Mostra le pagine che competono tra loro per la stessa ricerca.                                                                                                                                                                                                                                                           |        |                                                      |
| `get_ranking_history`                        | Fornisce l'archivio delle posizioni sul computer, che conserva anche i dati più vecchi del limite di 16 mesi di Google.                                                                                                                                                                                                  |        |                                                      |
| `get_index_coverage`                         | Fornisce le risposte di Google sull'indice già registrate, senza chiedere a Google.                                                                                                                                                                                                                                      |        |                                                      |
| `inspect_urls`                               | Chiede a Google lo stato delle pagine, 10 indirizzi per chiamata.                                                                                                                                                                                                                                                        | Sì     | 2.000 al giorno, per proprietà                       |
| `get_sitemaps`                               | Mostra lo stato della mappa del sito in Search Console.                                                                                                                                                                                                                                                                  |        |                                                      |
| `run_site_audit`                             | Avvia il controllo del sito.                                                                                                                                                                                                                                                                                             | Sì     | PageSpeed, se la misurazione della velocità è attiva |
| `get_audit_status`                           | Dice a che punto è il controllo; può segnalare come fallito un controllo bloccato.                                                                                                                                                                                                                                       |        |                                                      |
| `get_audit_summary`                          | Punto di partenza: punteggio del sito, punteggi per categoria, elenco di attività ordinato e dati istantanei del sito.                                                                                                                                                                                                   |        |                                                      |
| `get_audit_issues`                           | Fornisce i problemi trovati con i passaggi di correzione.                                                                                                                                                                                                                                                                |        |                                                      |
| `get_audit_pages`                            | Elenca le pagine scansionate.                                                                                                                                                                                                                                                                                            |        |                                                      |
| `get_google_analytics_organic_overview`      | Fornisce il riepilogo delle visite dalla ricerca e il periodo precedente.                                                                                                                                                                                                                                                |        |                                                      |
| `get_google_analytics_organic_landing_pages` | Elenca le pagine in cui entra per prima chi arriva dalla ricerca.                                                                                                                                                                                                                                                        |        |                                                      |
| `get_google_analytics_page_performance`      | Fornisce visualizzazioni e coinvolgimento delle pagine.                                                                                                                                                                                                                                                                  |        |                                                      |
| `get_google_analytics_traffic_acquisition`   | Fornisce la distribuzione dei visitatori per canale, origine e campagna.                                                                                                                                                                                                                                                 |        |                                                      |
| `get_google_analytics_key_events`            | Fornisce gli eventi contrassegnati come chiave in Analytics.                                                                                                                                                                                                                                                             |        |                                                      |
| `get_google_analytics_ecommerce_performance` | Fornisce le vendite dei prodotti.                                                                                                                                                                                                                                                                                        |        |                                                      |
| `get_google_analytics_site_search`           | Fornisce i termini che i visitatori scrivono nella casella di ricerca del sito.                                                                                                                                                                                                                                          |        |                                                      |
| `get_google_analytics_audience_breakdown`    | Divide i visitatori per dispositivo, paese, nuovi e di ritorno.                                                                                                                                                                                                                                                          |        |                                                      |
| `get_google_analytics_measurement_health`    | Controlla la configurazione della misurazione, non consuma la quota dei rapporti.                                                                                                                                                                                                                                        |        |                                                      |
| `list_saved_keywords`                        | Elenca le parole chiave salvate.                                                                                                                                                                                                                                                                                         |        |                                                      |
| `save_keywords`                              | Salva parole chiave.                                                                                                                                                                                                                                                                                                     | Sì     |                                                      |
| `list_reports`                               | Elenca i report.                                                                                                                                                                                                                                                                                                         |        |                                                      |
| `get_report`                                 | Legge un report e, su richiesta, ne fornisce anche la versione HTML.                                                                                                                                                                                                                                                     |        |                                                      |
| `save_report`                                | Salva un report o aggiorna uno esistente.                                                                                                                                                                                                                                                                                | Sì     |                                                      |
| `list_report_templates`                      | Legge i modelli di report.                                                                                                                                                                                                                                                                                               |        |                                                      |
| `save_report_template`                       | Salva un modello di report.                                                                                                                                                                                                                                                                                              | Sì     |                                                      |

Gli strumenti di Analytics consumano la quota dei rapporti di Google Analytics (in una proprietà standard 200.000 unità al giorno). Questa quota si segue nell'app, nella sezione Limiti della schermata **Impostazioni**.

## Attività pronte (skill)

| Attività            | Quando si usa                                                                                                                                          | Che cosa produce                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `seo-coach`         | Quando si chiede "che cosa devo fare". Spiega il percorso e suggerisce il passo successivo.                                                            | Conversazione, se serve una nota di coaching               |
| `seo-project-setup` | In un progetto nuovo. Chiede dell'attività, dell'obiettivo, dei concorrenti, delle pagine importanti e compila la schermata Informazioni sul progetto. | Informazioni sul progetto compilate, parole chiave salvate |
| `seo-audit`         | Quando si dice "controlla il sito". Esegue il controllo, lo unisce a Search Console e sceglie "l'unica cosa da fare questa settimana".                 | Report di controllo di una pagina                          |
| `seo-triage`        | Quando le visite calano. Verifica se il calo è reale, dove e quando è avvenuto.                                                                        | Report sull'indagine del calo                              |
| `seo-check-in`      | Una volta al mese. Confronta questo periodo con il precedente.                                                                                         | Report di controllo mensile; ogni mese se ne accumula uno  |
| `seo-report`        | Dopo le altre attività. Scrive e salva un report HTML in un solo file.                                                                                 | Un report nella schermata **Report**                       |

## Verifica

- Dire all'assistente "richiama lo strumento whoami". Deve indicare l'account, la versione, il tipo di installazione e il numero di porta. Se uno di questi non è quello atteso, o la versione è più vecchia dell'ultima uscita, l'assistente deve avvisare prima di usare i dati. Allo stesso indirizzo potrebbe rispondere una vecchia copia di Docker e l'assistente leggerebbe i suoi dati vecchi con piena fiducia. Se un altro programma occupa la 3001, il pacchetto Windows passa a un altro numero; whoami lo dice anche.
- Il badge nella schermata **Configurazione dell’agente** deve dire **Connesso** e deve comparire l'ora dell'ultima chiamata.
- "list_projects" deve elencare i progetti.

## Domande frequenti

**L'assistente invia i dati all'esterno?** I dati vanno al modello di intelligenza artificiale che l'assistente usa. Dipende dalle condizioni di privacy dell'assistente stesso. L'app risponde soltanto al collegamento sul proprio computer.

**Funziona senza password?** Con Docker funziona con `MCP_TOKEN=off`. Nel pacchetto Windows la password è sempre attiva. Con un collegamento senza password, qualsiasi programma sullo stesso computer può richiamare i 35 strumenti.

**Mi sono collegato a una vecchia copia?** `whoami` e `get_diagnostics` dicono con quale installazione si sta parlando: versione, tipo di installazione, numero di porta e, in Windows, il motivo se la porta è cambiata. Se la versione è più vecchia dell'ultima o la porta è cambiata, l'assistente deve dirlo. Fermare la vecchia copia di Docker e riavviare l'app.

**L'assistente può esaurire il limite di Google?** Lo consumano `inspect_urls` e `run_site_audit`. Le attività chiedono al massimo 20 indirizzi ciascuna. Avviano il controllo solo quando lo si chiede. Dare la stessa regola anche al proprio assistente.

**Quale assistente è migliore?** Non fa differenza, gli strumenti sono gli stessi. Il testo di configurazione è pronto per Claude Code, Codex e Cursor. Gli altri assistenti, se supportano MCP, funzionano con lo stesso indirizzo e la stessa password.

## Se qualcosa non va

- **L'assistente riceve un errore 401.** La password è sbagliata o non viene inviata. Copiare di nuovo il valore dal file. Non deve restare un carattere di fine riga alla fine.
- **Il collegamento viene rifiutato.** L'app è chiusa. Guardare l'icona nella barra delle applicazioni oppure l'output di `docker compose ps`.
- **L'assistente dice "strumento non trovato".** Ricaricare il collegamento. In Claude Code scrivere `/mcp` e scegliere **Reconnect**.
- **Le attività non compaiono.** Incollare di nuovo il testo di configurazione. Vengono copiate nella cartella dell'assistente (in Codex `$HOME/.agents/skills`).

<!-- Kaynaklar: src/routes/_app/ai.tsx; src/client/features/ai-mcp/agentInstallPrompt.md; agentSetupPrompt.ts; src/server/mcp/server.ts (35 araç); src/server/mcp/token-auth.ts; transport.ts; .agents/skills/setup-seotracker/SKILL.md; .agents/skills/*/SKILL.md; packaging/windows/launcher/SeoWatcher.cs; docker-entrypoint.sh -->
