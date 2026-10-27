---
title: Monitoraggio del posizionamento
description: Posizione media delle ricerche su Google, quali salgono o scendono e come cambiano i gruppi di posizioni, anche oltre il limite di 16 mesi di Google, perché i dati restano su questo computer.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-27
---

Qui si vede come le ricerche salgono e scendono nel tempo e quale movimento conta di più. Google Search Console limita lo storico a 16 mesi. Non dice nemmeno in che posizione fosse una ricerca in un dato giorno.

L'app preleva questi dati giorno per giorno e li salva su questo computer. L'archivio cresce a ogni apertura della schermata. Con il tempo si arriva più indietro di quanto mostri Google.

## Cosa c'è nella schermata

**Intervallo di tempo.** Le scelte sono 30 giorni, 90 giorni (predefinito), 6 mesi, 16 mesi e Intero archivio. L'intervallo scelto resta nella barra degli indirizzi. Finisce tre giorni prima di oggi. In alto una riga dice quali date sono mostrate.

**Riga dello stato dell'archivio.** Dice quali date copre l'archivio. A ogni apertura la schermata completa da Google i giorni mancanti. Se una nota dice che in questa visita sono stati aggiunti dei giorni, nell'archivio sono entrati giorni nuovi. Se dice che i giorni rimanenti saranno completati alla prossima apertura, il lavoro continua alla visita successiva.

**In salita e in discesa.** Due brevi elenchi: **Maggiori salite** e **Maggiori discese**. Ogni riga mostra la ricerca, la posizione vecchia e nuova come "Posizione 6,2 → 4,1", le impressioni e di quante posizioni si è mossa. Gli elenchi non sono ordinati solo in base al movimento. Il movimento è moltiplicato per le impressioni. Una query molto cercata che ha guadagnato due posizioni viene prima di una poco cercata che ne ha guadagnate quattro. Un clic su una riga apre sotto la tabella lo storico di quella ricerca. Le ricerche senza dati nel periodo precedente non entrano in questi elenchi. Se non è possibile alcun confronto, una nota al posto della sezione ne dice il motivo.

**Distribuzione delle posizioni.** Quattro barre mostrano quante ricerche si trovano nei gruppi 1-3, 4-10, 11-20 e 21+, in base alla posizione media. Accanto a ogni barra ci sono il numero di ricerche e la quota. Il numero all'estrema destra indica quante ricerche sono entrate in quel gruppo o ne sono uscite rispetto al periodo precedente, con freccia e segno. Nei primi tre gruppi un aumento è una buona notizia. Nel gruppo 21+ è una cattiva notizia. Un clic su una barra restringe la tabella a quel gruppo. Un altro clic toglie il filtro.

**Casella di ricerca e filtri.** La casella **Query di ricerca** restringe l'elenco. Sotto ci sono due gruppi di filtri.

- **Cambia filtri**: **In salita** e **In calo** mostrano le ricerche che si sono mosse di almeno mezza posizione rispetto al periodo precedente. Qui ci sono anche **Ora tra le prime 10** ed **Uscite dalle prime 10**.
- **Filtri rapidi**: **Impressioni elevate** e **Nessun clic**. Impressioni elevate è il quarto dell'elenco più mostrato. Non c'è un numero fisso, perché un numero fisso selezionerebbe ogni riga su un intervallo breve.

Un filtro che non restringe davvero l'elenco non viene mostrato. Un pulsante che non selezionerebbe nessuna riga, o tutte, non dice nulla.

**Tabella.** Le colonne sono **Query**, **Posizione media**, **Modifica**, **Impressioni**, **Clic** e a volte **Giorno**. Un clic sull'intestazione ordina. All'inizio è ordinata per impressioni. La cella **Posizione media** ha una piccola linea a sinistra. Mostra la posizione settimana per settimana nell'intervallo. Se la linea sale, la posizione migliora. Su uno schermo piccolo la linea è nascosta. Una posizione in prima pagina è scritta in verde, in seconda pagina in giallo. Il colore da solo non porta mai l'informazione, perché il numero è sempre scritto. La cella **Modifica** dice "salita di 2,4 posizioni", "scesa di 1,1 posizioni" o "Nessuna variazione". Per una ricerca senza dati nel periodo precedente dice "Nessun dato nel periodo precedente". La colonna **Giorno** compare solo se alcune ricerche mancavano in alcuni giorni. Una ricerca che compare solo 3 giorni su 90 è poco cercata. Il menu della riga ha tre voci: **Copia parola chiave**, **Aggiungi alle parole chiave salvate**, **Cerca in Rendimento della ricerca**. La tabella è divisa in pagine da 25, 50 o 100 righe.

**Storico della ricerca.** Un clic su una riga apre la linea di posizione giorno per giorno di quella ricerca. Sulla linea l'alto è una posizione migliore. Passandoci sopra si legge posizione, clic e impressioni del giorno. Il collegamento **Apri in Rendimento della ricerca** mostra la stessa ricerca nell'altra schermata.

**Stati vuoti.** Se Search Console non è collegato, compare il pulsante **Collega Search Console**. Se l'archivio è vuoto, c'è scritto "Le parole chiave con cui le persone ti cercano non sono ancora visibili" e compare il pulsante **Apri Rendimento della ricerca**. L'elenco è limitato alle 100 ricerche più mostrate. Se ce ne sono di più, una nota sotto lo dice.

## Come si usa

1. Alla prima apertura della schermata, attendere che la riga dell'archivio indichi che sono stati aggiunti dei giorni.
2. Il primo riempimento risale fino a 480 giorni. Può richiedere alcune visite.
3. Guardare **In salita e in discesa**. La prima ricerca in calo è il movimento che danneggia di più il traffico.
4. Guardare le barre della **Distribuzione delle posizioni**. Se accanto al gruppo 21+ c'è un aumento in rosso, delle ricerche scivolano oltre la seconda pagina.
5. Se si cerca un calo, premere il filtro **In calo**. Poi usare **Impressioni elevate** per scartare le meno importanti.
6. Fare clic sulla ricerca in cima. Nel grafico dello storico si legge il giorno in cui il calo è iniziato.
7. Segnare le ricerche da seguire con **Aggiungi alle parole chiave salvate**.

## Come si calcolano i numeri

L'archivio si riempie solo con i dati che Google ha reso definitivi. A ogni apertura gli ultimi tre giorni vengono prelevati di nuovo, perché Google può correggere quei giorni in seguito. Così i giorni corretti vengono riscritti nell'archivio. Aprire la schermata consuma quota di Search Console. Se la schermata viene riaperta entro 15 minuti dall'ultimo riempimento, riusa quindi lo stesso risultato.

Clic e impressioni sono totali. Nella **Posizione media** i giorni con più impressioni pesano di più. **Giorno** è il numero di giorni con dati.

La variazione si calcola così: si sottrae la posizione di questo periodo dalla posizione media del periodo precedente. Se il risultato è positivo, si è saliti. Il periodo precedente ha la stessa durata e termina subito prima di questo. Il confronto si fa solo per le ricerche che hanno dati in entrambi i periodi. Una ricerca che si muove di meno di mezza posizione non conta né come "in salita" né come "in calo".

L'elenco degli alti e bassi è ordinato in base alla differenza di posizione moltiplicata per le impressioni. Ogni elenco ha al massimo cinque righe.

I gruppi di posizioni si tagliano sulla posizione arrotondata. 3,4 conta come "intorno alla terza", 3,5 come "intorno alla quarta". Per questo una ricerca a 3,4 sta nel gruppo 1-3 e una a 3,5 nel gruppo 4-10.

L'elenco preleva le 100 ricerche più mostrate.

## Domande frequenti

**Perché è diverso dal numero di Search Console?** L'archivio tiene solo i giorni definitivi e arriva fino a tre giorni fa. Se in Search Console si è scelto un intervallo che comprende oggi, i numeri non coincidono.

**La ricerca è nell'elenco ma il suo storico di posizione è vuoto.** La ricerca può essere comparsa in pochi giorni. Lo si vede dalla colonna **Giorno**.

**Perché c'è scritto che la modifica non può essere mostrata?** L'archivio non ha registrazioni di queste ricerche nel periodo precedente. Scegliere un intervallo più breve o attendere che l'archivio si riempia.

**Perché l'archivio resta fermo allo stesso giorno?** L'app non preleva dati in background. Aprire la schermata e attendere la nota che indica che sono stati aggiunti dei giorni.

**Si può vedere la posizione di un concorrente?** No. Search Console dà solo i dati del proprio sito.

**Cosa significa posizione 1,0?** Che in ogni impressione del periodo si era al primo posto. Se un giorno si fosse scesi al 3º posto, la media sarebbe superiore a 1.

## Limiti

L'archivio contiene solo i giorni visti da questa installazione. Se l'installazione è recente, alla prima apertura si può risalire al massimo di 480 giorni. Le ricerche rare che Google nasconde non entrano nemmeno nell'archivio. Se l'archivio viene eliminato, lo storico va perso. Eliminare l'archivio dati di Docker o la cartella dei dati ne è un esempio. Fare i backup spetta a chi gestisce il sito.

<!-- Fonti: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; PositionSparkline.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; positionBands.ts; rankingMoves.ts; src/shared/positionBands.ts; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
