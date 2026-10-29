---
title: Configurazione dell'assistente
description: Collegare un assistente SEO in sicurezza, verificare una nuova chiamata e usare le competenze per controllare il sito e scrivere report.
kind: nasil-yapilir
updated: 2026-10-27
---

La configurazione dell'assistente collega a seowatcher un assistente IA come Claude Code, Codex o Cursor tramite MCP (Model Context Protocol). Una volta collegato, l'assistente legge i dati di Search Console, Analytics e dei controlli dall'app sul tuo computer, avvia controlli e scrive report. Ciò che l'assistente legge può arrivare al suo fornitore.

## Collegare l'agente

Apri Configurazione agente. Scegli Claude Code, Codex o Altro e copia le istruzioni. Frecce, Home e Fine cambiano selezione senza copiare. Il testo non contiene il token reale; l'agente usa il segreto locale. L'installazione da zero resta un'opzione separata.

## Verificare una nuova chiamata

Avvia la verifica e chiedi una chiamata a uno strumento seowatcher. La pagina legge il registro locale ogni cinque secondi, per un massimo di 60 secondi. Una chiamata storica non verifica una nuova configurazione. Scheda nascosta, errore o annullamento fermano il controllo. Se non appare una nuova chiamata, controlla lo stato MCP del client e riprova: non è prova di un guasto.

Collegato e la data dell'ultima chiamata descrivono uso passato, non una sessione permanente. Riprova uno stato sconosciuto. Gli strumenti operano sull'installazione.

## Proteggere il token

Preferisci le istruzioni guidate. Per la configurazione manuale usa `Authorization: Bearer <token>` solo nel campo segreto locale del client. PowerShell copia senza visualizzare:

Windows: `(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

Docker: `(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

Incolla nel campo locale e svuota gli appunti. Non inserire il token in chat, output del terminale, schermate o codice. Il menu Windows permette di aprire la cartella dati.

## Competenze e recupero

La scheda Competenze elenca i flussi SEO. Le istruzioni li installano; il testo di aggiornamento li rinnova. Claude Code: /seo-audit; Codex: $seo-audit. Per 401 verifica l'header locale; se la connessione è rifiutata controlla app e indirizzo. Aggiorna lo stato MCP e verifica una nuova chiamata.
