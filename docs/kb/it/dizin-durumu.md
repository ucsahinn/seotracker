---
title: Stato dell'indice
description: Google ha incluso ogni pagina nella ricerca? Se no, perché, e quando è passato l'ultima volta? Si possono fare al massimo 2.000 richieste al giorno.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

Qui si scopre quali pagine del sito Google ha incluso nella ricerca.

Il controllo del sito dice se la pagina si apre. Non può dire se Google l'ha davvero inserita nel proprio indice (l'elenco delle pagine di Google). La scheda **Dizin durumu** (Stato dell'indice) lo chiede a Google e conserva la risposta su questo computer. Non pone la stessa domanda più volte: richiede solo le risposte invecchiate. È importante, perché Google concede 2.000 richieste al giorno per ogni proprietà (la registrazione del sito in Search Console). L'app e l'assistente dell'utente si dividono questo limite.

## Cosa c'è nella schermata

**Anello "Google bu sayfalarla ne yapmış?" (Che cosa ha fatto Google con queste pagine?).** Le pagine scansionate sono divise in tre gruppi:

- **Google'da** (Su Google): può comparire nella ricerca.
- **Dizinde değil** (Non nell'indice): Google l'ha guardata ma non l'ha inclusa.
- **Yanıt bekleyen** (In attesa di risposta): non ancora richiesta, oppure risposta non ottenuta.

**Riquadri di riepilogo.** Si vede per quante pagine è stata fatta la richiesta, quante sono nell'indice, quante no e quante sono in attesa. Il riquadro "Google'ın farklı adresi seçtiği sayfalar" (Pagine per cui Google ha scelto un indirizzo diverso) conta le pagine per cui Google ha scelto un indirizzo diverso dal canonical (la dichiarazione dell'indirizzo principale) indicato dall'utente. Il riquadro "Bu denetimde henüz sorulmamış" (Non ancora richieste in questo controllo) è il numero di pagine in attesa di essere richieste.

**Pulsante "Google'da durumunu kontrol et" (Controlla lo stato su Google).** A ogni pressione chiede al massimo 25 pagine. Chiede prima quelle che non ricevono risposta da più tempo. Se il limite giornaliero si esaurisce, compare l'avviso "Google'ın günlük 2.000 adres sınırına ulaşıldı" (Raggiunto il limite giornaliero di 2.000 indirizzi di Google). Se Search Console non è collegato, il pulsante è disattivato. È disattivato anche se il dominio controllato non appartiene alla proprietà collegata.

**Tabella.** Le colonne sono: **Sayfa** (Pagina), **Durum** (Stato), **Sebep** (Motivo), **Google'ın seçtiği adres** (Indirizzo scelto da Google), **Google'ın son ziyareti** (Ultima visita di Google). Nella cella dello stato si legge "Google'da" (Su Google), "Kontrol edilmedi" (Non controllata), "Yanıt alınamadı" (Nessuna risposta), "Hata" (Errore) oppure la traduzione turca dello stato di Google. Ci sono 18 stati tradotti in turco. Alcuni esempi:

- "Keşfedildi, henüz taranmadı" (Individuata, non ancora scansionata)
- "'noindex' etiketiyle dışlandı" (Esclusa dall'etichetta "noindex"; la pagina è nascosta alla ricerca)
- "robots.txt engelliyor" (Bloccata da robots.txt; robots.txt è il file che dice a Google a quali pagine può accedere)
- "Yumuşak 404" (Soft 404; la pagina esiste ma Google la considera vuota)
- "Google bu adresi bilmiyor" (Google non conosce questo indirizzo)

La tabella si può scaricare come CSV.

## Come si usa

1. Quando il controllo è finito, aprire la scheda. Se il numero "Yanıt bekleyen" è alto, premere **Google'da durumunu kontrol et**. A ogni pressione si avanza di 25 pagine. In un sito piccolo bastano poche pressioni.
2. Guardare prima il gruppo "Dizinde değil". La colonna **Sebep** è la motivazione di Google e spesso dice che cosa fare. Se è "robots.txt engelliyor", togliere il blocco. Se è "'noindex' etiketiyle dışlandı", eliminare l'etichetta. Se è "Keşfedildi, henüz taranmadı", di solito basta attendere.
3. Aggiungere alla mappa del sito le pagine importanti per cui Google dice "Google bu adresi bilmiyor". Inviare la mappa a Search Console. Per tre o cinque pagine molto importanti, in Search Console scegliere a mano "Dizine eklenmesini iste" (Richiedi l'indicizzazione).
4. Se il riquadro "Google'ın farklı adresi seçtiği sayfalar" non è zero, guardare la colonna **Google'ın seçtiği adres**. A Google non è piaciuto l'indirizzo principale dichiarato dall'utente. Correggere il proprio oppure rendere principale quello scelto da Google.
5. Premere di nuovo dopo qualche giorno. Vengono richieste di nuovo solo le risposte invecchiate, quindi la quota non va sprecata.

## Come si calcolano i numeri

Se Google dice "nell'indice", la pagina conta come "Google'da". Se dice "non nell'indice" o "incerto", conta come "Dizinde değil". Se non c'è risposta, la pagina diventa "Yanıt bekleyen".

Dopo un certo tempo una risposta è considerata vecchia e viene richiesta di nuovo. Per una pagina nell'indice sono 14 giorni. Per una risposta di pagina non indicizzata o con errore sono 3 giorni. Una pagina mai richiesta è sempre pronta per essere richiesta. Il limite giornaliero si calcola sul numero di richieste delle ultime 24 ore. L'app conta solo le proprie richieste. Le ricerche fatte a mano in Search Console non entrano in questo contatore, ma riducono il limite reale di Google.

La discordanza dell'indirizzo principale è il caso in cui l'indirizzo scelto da Google e quello dichiarato dall'utente sono diversi. Conta anche la differenza di barra finale.

Se l'ultima scansione di Google risale a più di 90 giorni fa, il controllo scrive il problema "Google bu sayfayı uzun süredir taramadı" (Google non scansiona questa pagina da molto tempo). Le risposte invecchiate sono raccolte in un unico problema, "Google'ın bazı sayfalar hakkındaki yanıtı eskimiş" (La risposta di Google su alcune pagine è invecchiata).

## Domande frequenti

**Perché il pulsante è disattivato?** Possono esserci tre motivi. Search Console non è collegato. Non sono rimaste pagine da richiedere. Oppure il dominio controllato non appartiene alla proprietà collegata. Succede se si è controllato un altro sito.

**Di chi è il limite di 2.000?** Della proprietà. Due progetti collegati alla stessa proprietà e l'assistente dell'utente attingono dalla stessa riserva.

**Che cosa si può fare per una pagina "Keşfedildi, henüz taranmadı"?** Spesso niente. Nei siti nuovi Google può far aspettare per settimane. Inserire un collegamento dalle pagine del sito scansionate più spesso accelera il processo.

**Questa scheda segnala a Google le pagine nuove?** No, si limita a chiedere. Per segnalare ci sono la mappa del sito e "Dizine eklenmesini iste" in Search Console.

## Limiti

Le risposte sono solo quelle che dà Google. Google può lasciare vuoti alcuni campi. Non si possono superare le 2.000 richieste al giorno. Chiedere tutto per un sito da 10.000 pagine richiede cinque giorni. La scheda chiede solo le pagine scansionate. Gli indirizzi che non sono entrati nel controllo non compaiono nell'elenco.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
