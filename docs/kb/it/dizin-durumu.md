---
title: Stato dell'indicizzazione
description: Google ha inserito ogni pagina nell'indice? Se no, perché, e quando l'ha scansionata l'ultima volta? Al massimo 2.000 richieste al giorno.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

Il controllo del sito verifica che una pagina si apra, ma non può sapere se Google l'ha inserita nel proprio indice. La scheda **Stato dell'indicizzazione**, dentro **Controllo del sito**, lo chiede a Google tramite il Controllo URL di Search Console e conserva le risposte su questo computer. Una pagina viene richiesta di nuovo solo quando la sua risposta è invecchiata.

Il risparmio conta: Google concede 2.000 richieste al giorno per proprietà Search Console, e l'app e l'agente collegato si dividono la stessa quota.

## Che cosa contiene la scheda

**Anello "Che cosa ha fatto Google con queste pagine?"** Divide le pagine scansionate in tre gruppi:

- **Su Google**: la pagina può comparire nella ricerca.
- **Non indicizzato**: Google l'ha esaminata ma non l'ha inclusa.
- **In attesa di una risposta**: la pagina non è ancora stata richiesta oppure Google non ha risposto.

**Riquadri di riepilogo.** Indicano quante pagine sono state richieste, quante sono nell'indice, quante no e quante attendono. **Pagine in cui Google ha scelto un canonico diverso** conta le pagine per cui l'indirizzo scelto da Google è diverso dal canonical dichiarato sul sito. Conta anche una differenza nella sola barra finale. **Pagine di questo controllo non ancora verificate con Google** indica quante pagine restano da richiedere.

**Controlla lo stato su Google.** Ogni clic richiede al massimo 25 pagine, partendo da quelle mai richieste e poi da quelle con la risposta scaduta da più tempo. Quando la quota giornaliera è esaurita compare un avviso. Il pulsante è disattivato se:

- Search Console non è collegato;
- non restano pagine da richiedere;
- il dominio controllato non appartiene alla proprietà collegata, per esempio perché è stato controllato un altro sito.

**Tabella.** Le colonne sono **Pagina**, **Stato**, **Motivo**, **URL canonico selezionato da Google** e **Ultima scansione di Google**. Lo stato è "Su Google", "Non controllato", "Nessuna risposta", "Errore" oppure uno dei 18 stati di Google, tradotto. Alcuni esempi:

- "Rilevato, al momento non indicizzato"
- "Escluso dal tag 'noindex'"
- "Bloccato da robots.txt"
- "Soft 404"
- "URL sconosciuto a Google"

La tabella si può scaricare in formato CSV.

## Procedura

1. A controllo concluso apra la scheda. Se molte pagine sono **In attesa di una risposta**, prema **Controlla lo stato su Google**: ogni clic avanza di 25 pagine, e per un sito piccolo bastano pochi clic.
2. Esamini prima il gruppo **Non indicizzato**. La colonna **Motivo** riporta la spiegazione di Google, che spesso indica già il rimedio:
   - "Bloccato da robots.txt": rimuova il blocco.
   - "Escluso dal tag 'noindex'": rimuova il tag.
   - "Rilevato, al momento non indicizzato": di solito basta attendere.
3. Aggiunga alla sitemap le pagine importanti marcate "URL sconosciuto a Google" e invii la sitemap in Search Console. Per alcune pagine particolarmente importanti, usi in Search Console il comando "Richiedi indicizzazione".
4. Se il riquadro dei canonici diversi non è a zero, legga la colonna **URL canonico selezionato da Google**: Google non ha accettato l'indirizzo principale dichiarato. Corregga il canonical oppure adotti l'indirizzo scelto da Google.
5. Ripeta la richiesta dopo qualche giorno. Vengono richieste solo le risposte invecchiate, quindi la quota non va sprecata.

## Come si calcolano i numeri

Se Google risponde "nell'indice", la pagina è **Su Google**. Qualsiasi altra risposta di Google ("non nell'indice" o incerta) porta la pagina in **Non indicizzato**. Senza risposta, la pagina resta **In attesa di una risposta**.

Una risposta invecchia dopo 14 giorni per una pagina nell'indice e dopo 3 giorni per una pagina non indicizzata o con errore. Una pagina mai richiesta è sempre pronta per la richiesta. La quota giornaliera si calcola sulle richieste delle ultime 24 ore. L'app conta solo le proprie richieste: i controlli fatti a mano in Search Console non entrano nel contatore, ma riducono la quota reale di Google.

Se l'ultima scansione di Google risale a più di 90 giorni prima, il controllo del sito registra il problema "Google non esegue la scansione di questa pagina da molto tempo". Le risposte invecchiate sono riunite in un unico problema, "Le risposte di Google per alcune pagine non sono aggiornate".

## Domande frequenti

**A chi appartiene il limite di 2.000?** Alla proprietà. Due progetti collegati alla stessa proprietà e l'agente attingono alla stessa quota.

**Che cosa fare con una pagina "Rilevato, al momento non indicizzato"?** Spesso nulla: nei siti nuovi Google può impiegare settimane. Un link dalle pagine scansionate più spesso può accelerare il processo.

**La scheda segnala a Google le pagine nuove?** No, si limita a chiedere. Per segnalare pagine nuove si usano la sitemap e "Richiedi indicizzazione" in Search Console.

## Limiti

La scheda riporta solo ciò che Google risponde, e Google può lasciare vuoti alcuni campi. Il limite di 2.000 richieste al giorno non si può superare: verificare un sito di 10.000 pagine richiede cinque giorni. Vengono richieste solo le pagine scansionate dal controllo; gli indirizzi esclusi dal controllo non compaiono.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
