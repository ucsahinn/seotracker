---
title: Informazioni sul progetto
description: Qui si scrive ciò che l'app non può sapere: attività, obiettivo, concorrenti, pagine importanti. L'assistente la legge prima di lavorare.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-22
---

Il sito si racconta all'assistente una volta sola, poi non serve più ripeterlo.

Nella schermata **Proje bilgisi** (Informazioni sul progetto) si scrive ciò che Google non sa. Si racconta che cosa si vende, qual è l'obiettivo attuale, chi sono i concorrenti, quali pagine fanno guadagnare e come si desidera che si scriva. La schermata può essere compilata dall'utente o dall'assistente di intelligenza artificiale (nella schermata compare come "ajan"). L'assistente la legge prima di cominciare e vi scrive ciò che impara. Se si nota qualcosa di sbagliato, lo si corregge di persona. Serve anche a chi non usa un assistente. Se tra sei mesi ci si chiede "perché ci eravamo concentrati su questa pagina", la risposta sarà qui.

## Cosa c'è nella schermata

**Quattro sezioni principali.** Sono **İşin özeti** (Sintesi dell'attività), **Şu anki hedef** (Obiettivo attuale), **Konumlandırma** (Posizionamento: come ci si descrive sul mercato) e **Yazım tercihleri** (Preferenze di scrittura). In tutte si scrive liberamente e ognuna accetta al massimo 4.000 caratteri. Sotto si vede chi l'ha aggiornata e quando.

**Sezioni personalizzate.** Se un argomento non rientra nelle quattro sezioni, si apre un titolo proprio. Si possono aprire al massimo 20 sezioni personalizzate e il titolo è al massimo di 120 caratteri.

**Concorrenti.** Il nome di dominio è obbligatorio. Nome e nota sono facoltativi. Si possono aggiungere al massimo 100 concorrenti e la nota è al massimo di 500 caratteri. L'app non scarica i dati del concorrente. L'elenco serve a ricordare, per l'utente e per l'assistente.

**Pagine importanti.** Per ogni pagina si scrivono indirizzo, ruolo, argomento e nota. I ruoli sono:

- **Merkez sayfa** (Pagina centrale): la pagina di ingresso di un argomento.
- **Destek sayfası** (Pagina di supporto): una sottopagina che alimenta la pagina centrale.
- **Dönüşüm sayfası** (Pagina di conversione): la pagina che fa guadagnare o che contiene un modulo.
- **Diğer** (Altro).

Si possono aggiungere al massimo 100 pagine. Gli indirizzi vengono completati in modo che inizino con https.

**Registro delle ricerche.** L'assistente lascia note datate del tipo "ho cercato questo, è uscito questo". Queste note le scrive soltanto l'assistente e ognuna è al massimo di 1.000 caratteri. Volendo, le si può eliminare. Le note si cancellano da sole dopo 90 giorni. Nella schermata si vedono le 20 più recenti.

**Scheda dell'assistente.** Nella scheda ci sono due testi pronti: "Ajanınıza doldurtun" (Far compilare all'assistente) e "Ajanınıza gözden geçirtin" (Far rivedere all'assistente). Premendo **İstemi kopyala** (Copia il testo) lo si incolla nell'assistente. Se il progetto è vuoto, il primo testo chiede all'assistente di porre all'utente alcune domande e poi di compilare le sezioni.

## Come si usa

1. Appena aperto il progetto, scrivere in **İşin özeti** tre o cinque frasi. Dire che cosa si vende, a chi, in quali lingue è il sito e qual è la pagina di conversione. L'assistente prepara ogni report in base a questo paragrafo.
2. Scrivere **Şu anki hedef** in modo concreto. Non scrivere "traffico". Scrivere "far entrare le pagine dei prodotti nell'indice (l'elenco delle pagine di Google)" oppure "cinque richieste al mese dal modulo per la demo". L'assistente ordina i suggerimenti di conseguenza.
3. In **Önemli sayfalar** (Pagine importanti) aggiungere prima le pagine di conversione, poi le pagine centrali. L'assistente capisce da qui che cosa mettere in priorità.
4. In **Yazım tercihleri** scrivere le parole che non si vogliono usare e il tono. Per esempio "non dire leader del settore", "dare del lei", "indicare il numero di versione". I report dell'assistente rispettano queste regole.
5. Se si usa un assistente, il primo giorno copiare e incollare il testo **Ajanınıza doldurtun**. L'assistente compila le sezioni parlando con l'utente. Una volta al mese leggere il registro delle ricerche e correggere ciò che risulta sbagliato.

## Come si calcolano i numeri

In questa schermata non ci sono numeri calcolati, ma solo limiti. Sono scritti qui sopra.

L'assistente può fare al massimo 50 modifiche per volta. Ogni modifica viene scritta subito, senza chiedere conferma all'utente. Per questo conviene prendere l'abitudine di dire all'assistente "chiedimelo prima di scrivere". Le skill dell'assistente ben configurate di solito lo chiedono già.

L'indirizzo di una pagina importante può essere lungo al massimo 2.048 caratteri. Il dominio di un concorrente è al massimo di 255 caratteri, il nome di 120. La data delle note del registro la scrive l'app: l'assistente non può inventarla.

## Domande frequenti

**L'assistente ha scritto qualcosa di sbagliato, che cosa si fa?** Aprire la sezione e correggerla. Come ultimo aggiornamento compare il nome dell'utente. Alla lettura successiva l'assistente vede la versione dell'utente.

**È stato aggiunto un concorrente, ma non sono arrivati dati.** Non arrivano. L'app non scarica dati dei concorrenti. L'elenco serve all'assistente per sapere che cosa guardare quando fa ricerche sul web.

**Una nota del registro è sparita.** Le note con più di 90 giorni vengono eliminate. Spostare le informazioni durature nelle sezioni. Il registro è un quaderno temporaneo.

**Queste informazioni vanno a Google?** No. Restano su questo computer. Le legge solo l'assistente collegato.

## Limiti

La schermata è testo libero. Non controlla se ciò che si scrive è coerente. Se si scrivono cose contraddittorie, l'assistente può non accorgersene. Concorrenti e pagine importanti sono un elenco promemoria, non uno strumento di monitoraggio. Nel registro delle ricerche scrive solo l'assistente. Le proprie note vanno scritte nelle sezioni.

<!-- Kaynaklar: src/routes/_project/p/$projectId/context.tsx; src/routes/_project/p/$projectId/settings/context.tsx; src/client/features/projects/context/sectionCopy.ts; src/server/features/project-context/*; src/types/schemas/projectContext.ts; src/server/mcp/server.ts (update_project_context) -->
