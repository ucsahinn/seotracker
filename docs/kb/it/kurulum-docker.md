---
title: Installazione con Docker
description: Si installa con Docker su Mac, Linux e Windows. Basta un solo comando e non serve il file .env. I dati restano nel volume di dati di Docker.
kind: nasil-yapilir
updated: 2026-10-22
---

Al termine l'app sarà in funzione in Docker (il programma che esegue le applicazioni in ambienti isolati, detti container) e aperta all'indirizzo `http://localhost:3001`. Chi usa Windows trova molto più semplice l'installazione con un solo file. Questa strada è per chi usa Mac o Linux e per chi usa già Docker. Il primo avvio richiede alcuni minuti, perché l'app viene compilata dentro il container. I successivi richiedono pochi secondi.

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

Tutto qui. Il file `.env` non serve. La chiave di cifratura e la password dell'assistente vengono generate da sole al primo avvio e conservate nel volume di dati di Docker.

3. Per vedere l'avanzamento, scrivere:

```sh
docker compose logs -f
```

4. Attendere. La riga "Building client + server" nel registro indica la prima compilazione. Aspettare che nell'output di `docker compose ps` lo stato diventi **healthy**, poi aprire nel browser `http://localhost:3001`.

Il passaggio successivo è la guida al collegamento con Google. Con Docker i due indirizzi di reindirizzamento da dare a Google sono questi:

- `http://localhost:3001/api/gsc/oauth/callback`
- `http://localhost:3001/api/ga4/oauth/callback`

### Aggiornamento

Scrivere questi due comandi:

```sh
git pull
docker compose up -d --build
```

La sezione **Ayarlar → Hakkında** (Impostazioni → Informazioni) segnala la nuova versione e mostra questi due comandi. I dati restano nel volume di nome `seotracker_data`, quindi l'aggiornamento non li cancella.

### Arresto e rimozione

- Per fermare: `docker compose stop`
- Per riavviare: `docker compose up -d`
- Per rimuovere il container conservando i dati: `docker compose down`
- Per cancellare anche i dati: `docker compose down -v`. Questo comando elimina in modo permanente il database, i collegamenti con Google e i report.

### Copia di sicurezza

I dati sono nel volume `seotracker_data`, al percorso `/app/.wrangler` dentro il container. Per la copia di sicurezza, scrivere in ordine tre comandi:

```sh
docker compose stop
docker run --rm -v seotracker_data:/data -v "$PWD":/backup alpine tar czf /backup/seotracker-yedek.tgz -C /data .
docker compose up -d
```

Per ripristinare, nello stesso comando usare `tar xzf` al posto di `tar czf`. Il file `instance-secret` nel volume è la chiave che cifra i collegamenti con Google. Se manca dalla copia, l'app si apre ma i collegamenti con Google vanno rifatti.

### Impostazioni (facoltative)

Nessuna impostazione è obbligatoria. Per cambiarne una, mettere un file `.env` nella cartella del progetto. Poi scrivere `docker compose up -d --force-recreate seotracker`.

| Nome dell'impostazione                 | A cosa serve                                                                                                                  |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| PORT                                   | Numero di porta, predefinito 3001. Se cambia, cambiano anche gli indirizzi di reindirizzamento di Google                      |
| ALLOWED_HOST                           | Nome visibile dall'esterno, se l'app sta dietro a un altro server. Se è vuoto, solo localhost                                 |
| AUTH_MODE                              | `local_noauth` (predefinito) oppure `cloudflare_access`                                                                       |
| BETTER_AUTH_SECRET                     | Chiave di cifratura. Lasciarla vuota: l'app la genera. Se la si indica a mano, almeno 32 caratteri, e poi non cambiarla       |
| GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET | Alternativa all'inserimento nella schermata Ayarlar (Impostazioni). Il valore inserito nella schermata ha la precedenza       |
| PAGESPEED_API_KEY                      | Alternativa all'inserimento nella schermata Ayarlar                                                                           |
| MCP_TOKEN                              | Se è vuoto, viene generato al primo avvio. Con `off` non viene chiesta la password. Qualsiasi altro valore è usato così com'è |

## Verifica

- Nell'output di `docker compose ps` lo stato deve essere **healthy**. Al primo avvio può servire fino a cinque minuti.
- L'output di `curl.exe http://127.0.0.1:3001/api/health` (su Windows; su Mac e Linux `curl`) deve iniziare con "status":"ok". Lo stesso indirizzo si può aprire anche nel browser.
- Nel browser deve aprirsi `http://localhost:3001`. La scheda di stato nella schermata **Yardım** (Aiuto) deve dire "Her şey yolunda." (Tutto a posto.). Finché Google non è collegato, la riga "Google girişi" (Accesso a Google) segnala un problema. È normale.

## Domande frequenti

**Perché il primo avvio è lungo?** L'app viene compilata dentro il container. Negli avvii successivi la compilazione viene saltata.

**Dov'è il file `.env.example`?** Non c'è. Quello ereditato dal progetto di origine descriveva cose che questa versione non ha. L'elenco completo è nella tabella qui sopra e nel file `docs/ENVIRONMENT.md`.

**Si può aprire a Internet?** L'app non chiede a nessuno di identificarsi. Non aprirla senza mettere davanti una propria autenticazione. Se si imposta `ALLOWED_HOST`, l'app lo segnala nel controllo di stato.

**Dove si trova la password dell'assistente?** La schermata **Ajan kurulumu** (Configurazione dell'assistente) dell'app mostra il comando: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Con Git Bash, aggiungere all'inizio `MSYS_NO_PATHCONV=1`.

## Se qualcosa non va

- **Compare "Bind for 127.0.0.1:3001 failed".** Il numero di porta è occupato. Mettere nella cartella del progetto un file `.env` con la riga `PORT=3002` e ricreare il container. Su Windows il Blocco note può salvare il file come `.env.txt`. In PowerShell, `Set-Content -Encoding ascii .env 'PORT=3002'` è sicuro.
- **Lo stato è "unhealthy".** `docker compose logs --tail 50` mostra le ultime righe. Se durante la compilazione è finita la memoria, dare più memoria a Docker Desktop.
- **Il collegamento con Google dice "yapılandırılmamış" (non configurata).** Se `BETTER_AUTH_SECRET` è più corta di 32 caratteri, Google resta disattivato. Se la si è indicata a mano, allungarla. Altrimenti il file `instance-secret` nel volume potrebbe essere danneggiato.
- **Dopo l'aggiornamento il collegamento con Google si è interrotto.** `BETTER_AUTH_SECRET` è cambiata oppure il volume è stato ricreato. Nelle impostazioni del progetto scegliere **Yeniden bağlan** (Ricollega).

<!-- Kaynaklar: docs/SELF_HOSTING_DOCKER.md; docs/ENVIRONMENT.md; compose.yaml; docker-entrypoint.sh; src/lib/selfhost-preflight.ts; src/routes/_app/ai.tsx -->
