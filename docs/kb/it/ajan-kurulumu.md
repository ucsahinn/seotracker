---
title: Configurazione dell'agente
description: Collegare un agente IA a seowatcher tramite MCP, verificare la connessione, proteggere il token e usare le skill per controlli e report.
kind: nasil-yapilir
updated: 2026-10-27
---

Tramite MCP (Model Context Protocol) un agente IA come Claude Code, Codex o Cursor si collega all'app installata su questo computer. L'agente legge i dati di Search Console, Analytics e dei controlli, avvia controlli e scrive report. Ciò che l'agente legge può essere inviato al suo fornitore.

## Collegare l'agente

1. Apra **Configurazione dell'agente** nella barra laterale.
2. In **Collega il tuo agente** scelga **Claude Code**, **Codex** o **Altro**. I tasti freccia, Home e Fine cambiano la scelta senza copiare nulla.
3. Copi le istruzioni con **Copia comando di configurazione** e le incolli nell'agente.

Le istruzioni non contengono il token reale: l'agente usa il segreto salvato in locale. **Nuova installazione** è un'opzione separata, per una prima installazione o un controllo da capo.

## Verificare una nuova chiamata

Prema **Verifica connessione** e chieda all'agente di chiamare uno strumento di seowatcher. La pagina legge il registro locale ogni cinque secondi, per al massimo 60 secondi. Una chiamata registrata in precedenza non conferma una configurazione nuova. Se la scheda viene nascosta, si verifica un errore o si annulla, il controllo si ferma.

Se non compare una nuova chiamata, controlli lo stato MCP nel client e riprovi: l'assenza della chiamata non prova un guasto. **Chiamata allo strumento ricevuta** e l'orario dell'ultima chiamata descrivono un uso passato, non una sessione sempre aperta. Se lo stato è sconosciuto, usi **Rileggi stato**. Gli strumenti agiscono sull'intera installazione, non su un singolo progetto.

## Proteggere il token

Preferisca le istruzioni guidate. Per una configurazione manuale (**Se vuoi collegarti manualmente**) inserisca `Authorization: Bearer <token>` solo nel campo segreto locale del client. Questi comandi PowerShell copiano il token negli appunti senza mostrarlo:

Windows: `(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

Docker: `(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

Incolli il token nel campo locale, poi svuoti gli appunti. Non inserisca mai il token in una chat, nell'output del terminale, in una schermata o nel codice. Su Windows, **Veri klasörünü aç** (Apri la cartella dei dati) nel menu dell'area di notifica apre la cartella che contiene il token.

## Skill e soluzione dei problemi

La scheda **Skill** elenca i flussi di lavoro SEO pronti. Le istruzioni di configurazione le installano; **Copia il comando di aggiornamento** le rinnova senza toccare le impostazioni di connessione. In Claude Code si avviano con `/seo-audit`, in Codex con `$seo-audit`.

- **Errore 401**: controlli l'intestazione `Authorization` nel campo segreto del client.
- **Connessione rifiutata**: verifichi che l'app sia aperta e che l'indirizzo sia corretto.

Dopo la correzione, aggiorni lo stato MCP nel client e verifichi una nuova chiamata.
