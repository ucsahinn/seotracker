---
title: Collegamento con Google
description: Si ottiene una volta una chiave di accesso da Google, la si incolla nell'app e si sceglie il sito. Arrivano così i dati di Search Console e Analytics 4.
kind: nasil-yapilir
updated: 2026-10-22
---

L'interfaccia dell'app esiste in sei lingue: turco, inglese, tedesco, francese, italiano e portoghese. La lingua si sceglie in Impostazioni → Aspetto → Lingua. In questa guida pulsanti e schermate hanno il nome che portano nell'interfaccia in italiano. Per le pagine di Google si usano i nomi che Google mostra con l'account in italiano.

Al termine l'app sarà collegata a Google a nome dell'utente e leggerà i dati del sito. Per questo si ottiene una sola volta da Google una "chiave di accesso a Google". Servono circa dieci minuti e non si deve più rifare. Esiste anche una strada più breve (l'account di servizio), alla fine della pagina. Per la maggior parte delle persone è quella consigliata.

## Cosa serve

- Un sito verificato in Search Console (una "proprietà"). Se non è verificato, l'app non lo vede nell'elenco.
- Per Analytics 4, almeno il ruolo **Visualizzatore** su quella proprietà. È facoltativo: Search Console da solo basta.
- Un account Google. Google Cloud Console (la pagina per sviluppatori di Google) è gratuita e non chiede carte di pagamento.
- L'app aperta. Da lì si copiano i due indirizzi di reindirizzamento (gli indirizzi a cui Google riporta all'app dopo il consenso).

## Passaggi

1. Nell'app aprire la sezione **Impostazioni → Google**. Si vedono due indirizzi. Uno termina con `/api/gsc/oauth/callback` (Search Console), l'altro con `/api/ga4/oauth/callback` (Analytics). Nel pacchetto per Windows gli indirizzi iniziano con `http://127.0.0.1:3001`, con Docker con `http://localhost:3001`. Annotare entrambi.
2. Nel browser andare su `console.cloud.google.com`. Nel selettore dei progetti in alto scegliere **Nuovo progetto**. Il nome non conta: si può scrivere "seowatcher".
3. Aprire la pagina **API e servizi → Libreria**. Nella casella di ricerca scrivere **Google Search Console API**, fare clic e scegliere **Abilita**. Se si collega anche Analytics, fare lo stesso per **Google Analytics Admin API** e **Google Analytics Data API**.
4. Aprire la pagina **API e servizi → Schermata consenso OAuth**. Come tipo di utente scegliere **Esterno**. Come nome dell'app va bene un nome qualsiasi; nei campi e-mail scrivere il proprio indirizzo. Lo stato di pubblicazione può restare "Test".
5. Nella stessa pagina, nella sezione **Utenti di test**, aggiungere il proprio account Google. Google non richiede un'ulteriore approvazione.
6. Nella pagina **API e servizi → Credenziali** scegliere **Crea credenziali** e poi **ID client OAuth**. È la chiave di accesso a Google.
7. Come tipo di applicazione scegliere **Applicazione web**.
8. Nella sezione **URI di reindirizzamento autorizzati** aggiungere i due indirizzi del passaggio 1. Non aggiungere la barra finale. Basta un carattere di differenza perché Google dia l'errore "redirect_uri_mismatch" (l'indirizzo non corrisponde).
9. Scegliere **Crea**. Google mostra un ID client e una chiave segreta.
10. Tornare all'app. In **Impostazioni → Google**, nel campo **ID client** incollare l'ID che termina con `.apps.googleusercontent.com`. Nel campo **Segreto client** incollare la chiave che inizia con `GOCSPX-`.
11. Scegliere **Salva**. Compare l'avviso "Chiave di accesso Google salvata". Non serve riavviare. Se l'ID viene incollato nel campo sbagliato, l'app avvisa: "L'ID client deve terminare con .apps.googleusercontent.com. Incolla l'ID client OAuth, non il segreto client."
12. Se non c'è ancora un progetto, crearne prima uno con **Nuovo progetto**. Per i dettagli, vedere la guida [Projeler](/docs/projeler/).
13. Andare al progetto: **Impostazioni progetto → Connessioni**. Nella scheda **Google Search Console** scegliere **Connetti**.
14. Nella schermata di consenso di Google scegliere l'account aggiunto come utente di test e concedere il permesso. Tornando all'app compare l'avviso "Search Console connesso".
15. Dall'elenco **Scegli proprietà** scegliere il sito e poi **Salva proprietà**. Se si sceglie una proprietà di dominio, la scheda scrive "Proprietà dominio: include tutti i sottodomini e gli URL sia http sia https."
16. Per Analytics, nella stessa schermata scegliere **Connetti** nella scheda **Google Analytics**, concedere il permesso e scegliere la proprietà. I due collegamenti richiedono permessi separati. Uno non comprende l'altro.

### Strada più breve: l'account di servizio

L'account di servizio è un account speciale che si collega a Google al posto dell'utente. Non servono la schermata di consenso né l'indirizzo di reindirizzamento. Per la maggior parte delle persone è la strada consigliata. Se si vuole entrare nell'app con il proprio account Google, seguire invece la strada descritta sopra.

1. Aprire `console.cloud.google.com`. Nello stesso progetto Cloud verificare che le API del passaggio 3 siano abilitate. Andare a **IAM e amministrazione → Account di servizio**.
2. Scegliere **Crea account di servizio**. Dare un nome. Saltare i passaggi sui ruoli e creare l'account.
3. Nella riga dell'account aprire la scheda **Chiavi**. Scegliere **Aggiungi chiave → Crea nuova chiave**.
4. Come tipo di chiave scegliere **JSON** e poi **Crea**. Sul computer viene scaricato un file.
5. Nell'app aprire la sezione **Impostazioni → Account di servizio**. Aprire il file scaricato con il Blocco note, incollare tutto il contenuto nel campo e salvare. La schermata mostra l'indirizzo e-mail dell'account.
6. In Search Console scegliere **Impostazioni → Utenti e autorizzazioni → Aggiungi utente**. Scrivere questo indirizzo e-mail e come permesso scegliere **Completa**.
7. Per usare Analytics, in Google Analytics aprire nella proprietà la sezione **Amministrazione → Gestione dell'accesso**. Aggiungere lo stesso indirizzo e-mail con il permesso **Visualizzatore**.

Se è registrato un account di servizio, l'app usa quello. La riga "In uso ora" nella schermata **Impostazioni** indica quale dei due è attivo.

## Verifica

- Nelle schede di **Impostazioni progetto → Connessioni** il badge deve dire **Connesso**.
- Le quattro schede numeriche della schermata **Pannello** devono riempirsi in pochi secondi. In un sito nuovo i numeri possono essere zero. Non è un errore di collegamento.
- Il badge nella sezione **Impostazioni → Google** deve dire **Salvato**.

## Domande frequenti

**Dove viene conservata la chiave segreta?** Nel database su questo computer, cifrata. La chiave che la cifra è il file `instance-secret` (su Windows nella cartella dei dati, con Docker nel volume di dati). La chiave non viene mai inviata al browser.

**Si può usare la stessa chiave di accesso in più progetti?** Sì. Ne basta una per installazione. Ogni progetto sceglie la propria proprietà.

**Dopo qualche giorno il collegamento è caduto.** Nelle app in stato "Test", Google può limitare il permesso a sette giorni. La scheda dice "La connessione è scaduta". Basta scegliere **Riconnetti**. La soluzione definitiva è portare la schermata di consenso in "Üretim" (Produzione) oppure passare all'account di servizio.

**Quali permessi richiede?** Per Search Console solo lettura (`webmasters.readonly`), per Analytics solo lettura (`analytics.readonly`). L'app non può cambiare nulla su Google.

## Se qualcosa non va

- **Google dice "redirect_uri_mismatch".** L'indirizzo di reindirizzamento in Cloud Console non è identico a quello dell'app. Usare il pulsante di copia nella schermata **Impostazioni**. Bastano http al posto di https, 127.0.0.1 al posto di localhost o una barra finale per causare l'errore.
- **Compare l'avviso "Chiave di accesso Google mancante".** I passaggi 10 e 11 sono stati saltati oppure il salvataggio non è riuscito. Nella schermata **Impostazioni** il badge deve dire **Salvato**.
- **Google dice "access_denied".** L'account usato per l'accesso non è nell'elenco degli utenti di test della schermata di consenso. Aggiungerlo all'elenco oppure scegliere l'account giusto.
- **L'elenco delle proprietà è vuoto.** Questo account non ha un sito verificato in Search Console né un permesso in Analytics. Verificare prima il sito.
- **Compaiono "Collegamento non completato" e "state_mismatch".** La schermata di consenso è stata aperta in due schede, oppure si è aspettato più di dieci minuti. Riprovare da capo in una sola scheda. Se i cookie del browser (piccoli file che i siti salvano nel browser) sono disattivati, attivarli.
- **Compare "Account Google già collegato".** L'account era già stato collegato a un'altra voce. Con **Rimuovi account** nel selettore delle proprietà togliere il vecchio e ricollegare.
- **Dopo un aggiornamento i collegamenti si sono interrotti.** La chiave di cifratura è cambiata (con Docker è stato aggiunto `BETTER_AUTH_SECRET` oppure il volume di dati è stato ricreato). Nelle schede scegliere **Riconnetti**.

<!-- Kaynaklar: docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md; docs/SELF_HOSTING_GOOGLE_ANALYTICS.md; src/client/features/settings/GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; googleClientId.ts; src/client/features/integrations/IntegrationConnectionCard.tsx; GooglePropertyPicker.tsx; googleAuthErrorCopy.ts; src/server/features/google/selfHostedOAuth.ts; oauth-config.ts; src/shared/gsc.ts; src/shared/ga4.ts -->
