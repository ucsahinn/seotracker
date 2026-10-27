---
title: Stato dell'indice
description: Google ha incluso ogni pagina nella ricerca? Se no, perché, e quando l'ha visitata l'ultima volta? Si possono fare al massimo 2.000 richieste al giorno.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

Qui si scopre quali pagine del sito Google ha incluso nella ricerca.

Il controllo del sito dice se la pagina si apre. Non può dire se Google l'ha davvero inserita nel proprio indice (l'elenco delle pagine di Google). La scheda **Stato dell'indicizzazione** lo chiede a Google e conserva la risposta su questo computer. Non pone la stessa domanda più volte: richiede solo le risposte invecchiate. Conta, perché Google concede 2.000 richieste al giorno per ogni proprietà (la registrazione del sito in Search Console). L'app e l'assistente dell'utente si dividono questo limite.

## Cosa c'è nella schermata

**Anello "Che cosa ha fatto Google con queste pagine?".** Le pagine scansionate sono divise in tre gruppi:

- **Su Google**: la pagina può comparire nella ricerca.
- **Non indicizzato**: Google l'ha guardata ma non l'ha inclusa.
- **In attesa di una risposta**: non ancora richiesta, oppure risposta non ottenuta.

**Riquadri di riepilogo.** Si vede per quante pagine è stata fatta la richiesta, quante sono nell'indice, quante no e quante sono in attesa. Il riquadro "Pagine in cui Google ha scelto un canonico diverso" conta le pagine per cui l'indirizzo scelto da Google differisce dal canonical (l'indirizzo principale dichiarato dall'utente). Il riquadro "Non ancora richieste in questo controllo" è il numero di pagine in attesa di essere richieste.

**Pulsante "Controlla lo stato su Google".** A ogni pressione chiede al massimo 25 pagine. Chiede prima quelle che non ricevono risposta da più tempo. Se il limite giornaliero si esaurisce, compare l'avviso "Raggiunto il limite giornaliero di 2.000 indirizzi di Google". Se Search Console non è collegato, il pulsante è disattivato. È disattivato anche se il dominio controllato non appartiene alla proprietà collegata.

**Tabella.** Le colonne sono: **Pagina**, **Stato**, **Motivo**, **URL canonico selezionato da Google**, **Ultima scansione di Google**. Nella cella dello stato si legge "Su Google", "Non controllato", "Nessuna risposta", "Errore" oppure la traduzione turca dello stato di Google. Ci sono 18 stati tradotti in turco. Alcuni esempi:

- "Rilevato, al momento non indicizzato"
- "Escluso dal tag 'noindex'"
- "Bloccato da robots.txt"
- "Soft 404"
- "URL sconosciuto a Google"

La tabella si può scaricare come CSV.

## Come si usa

1. Quando il controllo è finito, aprire la scheda. Se il numero "In attesa di una risposta" è alto, premere **Controlla lo stato su Google**. A ogni pressione si avanza di 25 pagine. In un sito piccolo bastano poche pressioni.
2. Guardare prima il gruppo "Non indicizzato". La colonna **Motivo** è la motivazione di Google e spesso dice che cosa fare. Se è "Bloccato da robots.txt", togliere il blocco. Se è "Escluso dal tag 'noindex'", eliminare l'etichetta. Se è "Rilevato, al momento non indicizzato", di solito basta attendere.
3. Aggiungere alla mappa del sito le pagine importanti per cui Google dice "URL sconosciuto a Google". Inviare la mappa a Search Console. Per tre o cinque pagine molto importanti, in Search Console scegliere a mano "Dizine eklenmesini iste" (Richiedi l'indicizzazione).
4. Se il riquadro "Pagine in cui Google ha scelto un canonico diverso" non è zero, guardare la colonna **URL canonico selezionato da Google**. Google non ha accettato l'indirizzo principale dichiarato dall'utente. Correggere il proprio oppure rendere principale quello scelto da Google.
5. Premere di nuovo dopo qualche giorno. Vengono richieste di nuovo solo le risposte invecchiate, quindi la quota non va sprecata.

## Come si calcolano i numeri

Se Google dice "nell'indice", la pagina conta come "Su Google". Se dice "non nell'indice" o "incerto", conta come "Non indicizzato". Se non c'è risposta, la pagina diventa "In attesa di una risposta".

Dopo un certo tempo una risposta è considerata vecchia e viene richiesta di nuovo. Per una pagina nell'indice sono 14 giorni. Per una risposta di pagina non indicizzata o con errore sono 3 giorni. Una pagina mai richiesta è sempre pronta per essere richiesta. Il limite giornaliero si calcola sul numero di richieste delle ultime 24 ore. L'app conta solo le proprie richieste. Le ricerche fatte a mano in Search Console non entrano in questo contatore, ma riducono il limite reale di Google.

La discordanza dell'indirizzo principale è il caso in cui l'indirizzo scelto da Google e quello dichiarato dall'utente sono diversi. Conta anche la differenza di barra finale.

Se l'ultima scansione di Google risale a più di 90 giorni fa, il controllo scrive il problema "Google non esegue la scansione di questa pagina da molto tempo". Le risposte invecchiate sono raccolte in un unico problema, "La risposta di Google su alcune pagine è invecchiata".

## Domande frequenti

**Perché il pulsante è disattivato?** Possono esserci tre motivi. Search Console non è collegato. Non sono rimaste pagine da richiedere. Oppure il dominio controllato non appartiene alla proprietà collegata. Succede se si è controllato un altro sito.

**Di chi è il limite di 2.000?** Della proprietà. Due progetti collegati alla stessa proprietà e l'assistente dell'utente attingono dalla stessa riserva.

**Che cosa si può fare per una pagina "Rilevato, al momento non indicizzato"?** Spesso niente. Nei siti nuovi Google può far aspettare per settimane. Inserire un collegamento dalle pagine del sito scansionate più spesso accelera il processo.

**Questa scheda segnala a Google le pagine nuove?** No, si limita a chiedere. Per segnalare ci sono la mappa del sito e "Dizine eklenmesini iste" in Search Console.

## Limiti

Le risposte sono solo quelle che dà Google. Google può lasciare vuoti alcuni campi. Non si possono superare le 2.000 richieste al giorno. Chiedere tutto per un sito da 10.000 pagine richiede cinque giorni. La scheda chiede solo le pagine scansionate. Gli indirizzi che non sono entrati nel controllo non compaiono nell'elenco.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
