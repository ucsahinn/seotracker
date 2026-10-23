---
title: Monitoraggio delle posizioni
description: La posizione media delle ricerche su Google, giorno per giorno. I dati restano sul computer, quindi si può guardare oltre i 16 mesi di Google.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-22
---

Qui si vede come le ricerche salgono e scendono nel tempo. Google Search Console limita lo storico a 16 mesi. Non mostra nemmeno in quale giorno una ricerca è scesa e a quale posizione.

L'app scarica questi dati giorno per giorno e li conserva su questo computer. Più si apre la schermata, più l'archivio cresce. Col tempo si può guardare più indietro di quanto permetta Google.

## Cosa c'è nella schermata

**Intervallo di tempo.** Le opzioni sono 30 gün (30 giorni), 90 gün (90 giorni, predefinito), 6 ay (6 mesi), 16 ay (16 mesi) e Arşivin tamamı (Tutto l'archivio). L'intervallo è contato da oggi fino a tre giorni prima.

**Riga di stato dell'archivio.** Dice quanti giorni e quante righe ci sono nell'archivio. A ogni apertura la schermata completa da Google i giorni mancanti. Se scrive "Bu açılışta N gün eklendi." (A questa apertura sono stati aggiunti N giorni.), sono arrivati giorni nuovi. Se scrive "Kalan günler sonraki açılışta tamamlanacak." (I giorni rimanenti saranno completati alla prossima apertura.), il lavoro prosegue alla prossima apertura.

La casella **Sorgu içinde ara** (Cerca nelle query) restringe l'elenco.

**Filtri di variazione.** **Yükselenler** (In salita) e **Düşenler** (In discesa) mostrano le ricerche che si sono mosse di almeno mezza posizione. Ci sono anche **Şu an ilk 10'da** (Ora nei primi 10) e **İlk 10'dan çıkanlar** (Usciti dai primi 10). Ci sono altri due filtri rapidi: **Gösterimi yüksek** (Molte impressioni, almeno 100) e **Hiç tıklanmayan** (Mai cliccate).

**Distribuzione delle posizioni.** Le barre mostrano quante ricerche sono nelle fasce 1-3, 4-10, 11-20 e 21+.

**In salita e in discesa.** Si vedono due brevi elenchi: "En çok yükselenler" (Più in salita) e "En çok düşenler" (Più in discesa).

**Tabella.** Le colonne sono: **Sorgu** (Query), **Ort. sıra** (Posizione media), **Değişim** (Variazione), **Gösterim** (Impressioni), **Tıklama** (Clic), **Gün** (Giorni). La colonna **Gün** dice per quanti giorni la ricerca è comparsa nell'intervallo scelto. Una ricerca che in 90 giorni compare solo 3 giorni viene cercata di rado. Nella cella della variazione si legge "Yükseldi 2,4" (Salita di 2,4) oppure "Düştü 1,1" (Scesa di 1,1). Il menu della riga ha tre opzioni: **Kelimeyi kopyala** (Copia la parola), **Kayıtlı kelimelere ekle** (Aggiungi alle parole chiave salvate), **Arama performansında ara** (Cerca nelle prestazioni di ricerca).

**Storico della query.** Facendo clic su una riga si apre la linea giornaliera delle posizioni di quella ricerca. Il collegamento **Arama performansında aç** (Apri nelle prestazioni di ricerca) mostra la stessa ricerca nell'altra schermata.

**Stati vuoti.** Se l'archivio è vuoto, la schermata scrive "Henüz hangi kelimeyle arandığınız bilinmiyor" (Non è ancora noto con quali parole viene cercato il sito) e compare il pulsante **Arama performansını aç** (Apri le prestazioni di ricerca). L'elenco è limitato alle 100 ricerche più mostrate. Se ce ne sono di più, sotto compare una nota che lo dice.

## Come si usa

1. Alla prima apertura della schermata, attendere che nella riga dell'archivio compaia "eklendi" (aggiunti).
2. Il primo caricamento arriva fino a 480 giorni indietro. Può richiedere alcune aperture.
3. Per cercare un calo, premere **Düşenler**. Poi con **Gösterimi yüksek** eliminare le ricerche irrilevanti.
4. Fare clic sulla ricerca più in alto. Nel grafico dello storico leggere il giorno in cui è iniziato il calo.
5. Segnare le ricerche da seguire con **Kayıtlı kelimelere ekle**.
6. Una volta al mese guardare gli elenchi "En çok yükselenler" e "En çok düşenler". Per un quadro generale basta questo.

## Come si calcolano i numeri

L'archivio si riempie solo con i dati che Google ha reso definitivi. A ogni apertura vengono scaricati di nuovo gli ultimi tre giorni, perché Google può correggerli in seguito. Così i giorni corretti vengono riscritti nell'archivio.

Clic e impressioni sono totali. **Ort. sıra** dà più peso ai giorni con molte impressioni. **Gün** è il numero di giorni con dati.

La variazione si ottiene così: dalla posizione media del periodo precedente si sottrae quella di questo periodo. Se il risultato è positivo, si è saliti. Il periodo precedente ha la stessa lunghezza e termina subito prima di questo.

L'elenco porta le 100 ricerche più mostrate. Nel browser è diviso in pagine da 25, 50 o 100.

## Domande frequenti

**Perché è diverso dal numero in Search Console?** L'archivio conserva solo i giorni definitivi e arriva fino a tre giorni fa. Se in Search Console è stato scelto un intervallo che comprende oggi, i numeri non corrispondono.

**La ricerca è nell'elenco ma lo storico delle posizioni è vuoto.** Quella ricerca può essere comparsa per pochi giorni. Guardare la colonna **Gün**.

**Perché l'archivio è fermo allo stesso giorno?** L'app non scarica dati in secondo piano. Aprire la schermata e attendere la nota "eklendi".

**Si può vedere la posizione di un concorrente?** No. Search Console fornisce solo i dati del proprio sito.

**Che cosa significa posizione 1,0?** Che nel periodo il sito è comparso sempre al primo posto. Se un giorno fosse sceso alla 3ª posizione, la media sarebbe salita sopra 1.

## Limiti

L'archivio contiene solo i giorni visti da questa installazione. Se l'app è stata installata da poco, alla prima apertura si può tornare indietro al massimo di 480 giorni. Le ricerche rare che Google nasconde non entrano nemmeno nell'archivio. Se l'archivio viene cancellato, lo storico va perso. Eliminare il volume di Docker o la cartella dei dati ne è un esempio. La copia di sicurezza spetta all'utente.

<!-- Kaynaklar: src/routes/_project/p/$projectId/rankings.tsx; src/client/features/rankings/RankingsPage.tsx; TrackedQueriesTable.tsx; PositionChange.tsx; PositionBandBars.tsx; MoversCard.tsx; ArchiveStatus.tsx; EmptyArchivePanel.tsx; QueryHistoryCard.tsx; src/serverFunctions/gscHistory.ts; src/server/features/gsc/services/GscHistoryService.ts; src/server/features/gsc/repositories/GscHistoryRepository.ts; src/shared/rankingChange.ts; src/db/gsc-history.schema.ts -->
