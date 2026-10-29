---
title: Installazione con Docker
description: Si installa con Docker su Mac, Linux e Windows. Basta un solo comando e non serve il file .env. I dati restano nel volume di dati di Docker.
kind: nasil-yapilir
updated: 2026-10-22
---

Docker esegue le applicazioni in ambienti isolati, detti container. Al termine di questa procedura l'app risponde all'indirizzo `http://localhost:3001`. La procedura è pensata per Mac, Linux e per chi usa già Docker; su Windows l'[installazione con un solo file](/docs/kurulum-windows/) è più semplice. Il primo avvio richiede alcuni minuti, perché l'app viene compilata dentro il container; i successivi pochi secondi.

## Cosa serve

- Docker Desktop (Mac, Windows) oppure Docker Engine con Docker Compose (Linux). Su Windows, Docker Desktop richiede WSL 2 (il componente che fa funzionare Linux dentro Windows) e la virtualizzazione attiva.
- Git. In alternativa va bene **Code → Download ZIP** nella pagina di GitHub.
- Circa 2 GB di disco libero e 2 GB di memoria libera durante la prima compilazione.

## Passaggi

1. Scaricare il repository (i file del progetto) ed entrare nella sua cartella:

```sh
git clone https://github.com/ucsahinn/seotracker.git
cd seotracker
```

2. Avviare l'app:

```sh
docker compose up -d
```

Non serve altro, nemmeno un file `.env`. La chiave di cifratura e il token MCP dell'agente vengono generati al primo avvio e conservati nel volume di dati di Docker.

3. Per seguire l'avanzamento:

```sh
docker compose logs -f
```

4. La riga "Building client + server" nel registro indica la prima compilazione. Attendere che `docker compose ps` mostri lo stato **healthy**, poi aprire `http://localhost:3001` nel browser.

Il passaggio successivo è il [collegamento con Google](/docs/google-baglantisi/). Con Docker gli indirizzi di reindirizzamento da registrare in Google sono:

- `http://localhost:3001/api/gsc/oauth/callback`
- `http://localhost:3001/api/ga4/oauth/callback`

### Aggiornamento

Eseguire:

```sh
git pull
docker compose up -d --build
```

**Impostazioni → Informazioni** segnala la nuova versione e mostra gli stessi comandi. I dati restano nel volume `seotracker_data`: l'aggiornamento non li cancella.

### Arresto e rimozione

- Per fermare: `docker compose stop`
- Per riavviare: `docker compose up -d`
- Per rimuovere il container conservando i dati: `docker compose down`
- Per cancellare anche i dati: `docker compose down -v`. Questo comando elimina in modo permanente il database, i collegamenti con Google e i report.

### Copia di sicurezza

I dati sono nel volume `seotracker_data`, al percorso `/app/.wrangler` dentro il container. Per creare una copia di sicurezza, eseguire in ordine:

```sh
docker compose stop
docker run --rm -v seotracker_data:/data -v "$PWD":/backup alpine tar czf /backup/seotracker-yedek.tgz -C /data .
docker compose up -d
```

Per il ripristino si usa lo stesso comando con `tar xzf` al posto di `tar czf`. Il file `instance-secret` nel volume è la chiave che cifra i collegamenti con Google. Se manca dalla copia, l'app si apre ma i collegamenti con Google vanno rifatti.

### Impostazioni (facoltative)

Nessuna impostazione è obbligatoria. Per cambiarne una, creare un file `.env` nella cartella del progetto ed eseguire `docker compose up -d --force-recreate seotracker`.

| Nome dell'impostazione                 | A cosa serve                                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| PORT                                   | Numero di porta, predefinito 3001. Se cambia, cambiano anche gli indirizzi di reindirizzamento di Google                        |
| ALLOWED_HOST                           | Nome visibile dall'esterno, se l'app sta dietro a un altro server. Se è vuoto, solo localhost                                   |
| AUTH_MODE                              | `local_noauth` (predefinito) oppure `cloudflare_access`                                                                         |
| BETTER_AUTH_SECRET                     | Chiave di cifratura. Lasciarla vuota: l'app la genera. Se la si indica a mano, almeno 32 caratteri, e poi non cambiarla         |
| GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Alternativa all'inserimento nella schermata Impostazioni. Il valore inserito nella schermata ha la precedenza                   |
| PAGESPEED_API_KEY                      | Alternativa all'inserimento nella schermata Impostazioni                                                                        |
| MCP_TOKEN                              | Se è vuoto, viene generato al primo avvio. Con `off` non viene richiesto alcun token. Qualsiasi altro valore è usato così com'è |

## Verifica

- Nell'output di `docker compose ps` lo stato deve essere **healthy**. Al primo avvio possono servire fino a cinque minuti.
- L'output di `curl.exe http://127.0.0.1:3001/api/health` (su Windows; su Mac e Linux `curl`) deve iniziare con "status":"ok". Lo stesso indirizzo si può aprire anche nel browser.
- Nel browser deve aprirsi `http://localhost:3001`. Nella schermata **Aiuto**, la scheda **Stato dell'app** non deve segnalare errori. Finché Google non è collegato, la riga dell'accesso a Google resta in avviso: è normale.

## Domande frequenti

**Perché il primo avvio è lungo?** L'app viene compilata dentro il container. Negli avvii successivi la compilazione viene saltata.

**Dov'è il file `.env.example`?** Non c'è. Quello ereditato dal progetto di origine descriveva cose che questa versione non ha. L'elenco completo è nella tabella qui sopra e nel file `docs/ENVIRONMENT.md`.

**Si può esporre su Internet?** L'app non chiede a nessuno di identificarsi. Non va esposta senza anteporle un proprio sistema di autenticazione. Se si imposta `ALLOWED_HOST`, l'app lo segnala nel controllo di stato.

**Dove si trova il token MCP dell'agente?** La schermata **Configurazione dell'agente** mostra il comando: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Con Git Bash, aggiungere all'inizio `MSYS_NO_PATHCONV=1`.

## Se qualcosa non va

- **Compare "Bind for 127.0.0.1:3001 failed".** Il numero di porta è occupato. Mettere nella cartella del progetto un file `.env` con la riga `PORT=3002` e ricreare il container. Su Windows il Blocco note può salvare il file come `.env.txt`. In PowerShell è più sicuro `Set-Content -Encoding ascii .env 'PORT=3002'`.
- **Lo stato è "unhealthy".** `docker compose logs --tail 50` mostra le ultime righe. Se durante la compilazione è finita la memoria, dare più memoria a Docker Desktop.
- **Il collegamento con Google risulta non configurato.** Se `BETTER_AUTH_SECRET` è più corta di 32 caratteri, Google resta disattivato. Se la si è indicata a mano, allungarla. Altrimenti il file `instance-secret` nel volume potrebbe essere danneggiato.
- **Dopo l'aggiornamento il collegamento con Google si è interrotto.** `BETTER_AUTH_SECRET` è cambiata oppure il volume è stato ricreato. Nelle impostazioni del progetto scegliere **Riconnetti**.

<!-- Kaynaklar: docs/SELF_HOSTING_DOCKER.md; docs/ENVIRONMENT.md; compose.yaml; docker-entrypoint.sh; src/lib/selfhost-preflight.ts; src/routes/_app/ai.tsx -->
