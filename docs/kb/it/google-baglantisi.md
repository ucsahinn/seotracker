---
title: Collegamento con Google
description: Si ottiene una volta una chiave di accesso da Google, la si incolla nell'app e si sceglie il sito. Arrivano così i dati di Search Console e Analytics 4.
kind: nasil-yapilir
updated: 2026-10-22
---

L'interfaccia dell'app è disponibile in turco e in inglese. La lingua si sceglie in Ayarlar → Görünüm → Dil. In questa guida ogni nome di pulsante e di schermata è riportato in turco, con il significato italiano tra parentesi.

Al termine l'app sarà collegata a Google a nome dell'utente e leggerà i dati del sito. Per questo si ottiene una sola volta da Google una "chiave di accesso a Google". Servono circa dieci minuti e non si deve più rifare. Esiste anche una strada più breve (l'account di servizio), alla fine della pagina. Per la maggior parte delle persone è quella consigliata.

## Cosa serve

- Un sito verificato in Search Console (una "proprietà"). Se non è verificato, l'app non lo vede nell'elenco.
- Per Analytics 4, almeno il ruolo **Görüntüleyen** (Visualizzatore) su quella proprietà. È facoltativo: Search Console da solo basta.
- Un account Google. Google Cloud Console (la pagina per sviluppatori di Google) è gratuita e non chiede carte di pagamento.
- L'app aperta. Da lì si copiano i due indirizzi di reindirizzamento (gli indirizzi a cui Google riporta all'app dopo il consenso).

## Passaggi

1. Nell'app aprire la sezione **Ayarlar → Google** (Impostazioni → Google). Si vedono due indirizzi. Uno termina con `/api/gsc/oauth/callback` (Search Console), l'altro con `/api/ga4/oauth/callback` (Analytics). Nel pacchetto per Windows gli indirizzi iniziano con `http://127.0.0.1:3001`, con Docker con `http://localhost:3001`. Annotare entrambi.
2. Nel browser andare su `console.cloud.google.com`. Nel selettore dei progetti in alto scegliere **Yeni proje** (Nuovo progetto). Il nome non conta: si può scrivere "seowatcher".
3. Aprire la pagina **API'ler ve Hizmetler → Kitaplık** (API e servizi → Libreria). Nella casella di ricerca scrivere **Google Search Console API**, fare clic e scegliere **Etkinleştir** (Abilita). Se si collega anche Analytics, fare lo stesso per **Google Analytics Admin API** e **Google Analytics Data API**.
4. Aprire la pagina **API'ler ve Hizmetler → OAuth izin ekranı** (API e servizi → Schermata di consenso OAuth). Come tipo di utente scegliere **Harici** (Esterno). Come nome dell'app va bene un nome qualsiasi; nei campi e-mail scrivere il proprio indirizzo. Lo stato di pubblicazione può restare "Test".
5. Nella stessa pagina, nella sezione **Test kullanıcıları** (Utenti di test), aggiungere il proprio account Google. Google non richiede un'ulteriore approvazione.
6. Nella pagina **API'ler ve Hizmetler → Kimlik bilgileri** (API e servizi → Credenziali) scegliere **Kimlik bilgisi oluştur** (Crea credenziali) e poi **OAuth istemci kimliği** (ID client OAuth). È la chiave di accesso a Google.
7. Come tipo di applicazione scegliere **Web uygulaması** (Applicazione web).
8. Nella sezione **Yetkilendirilmiş yönlendirme URI'leri** (URI di reindirizzamento autorizzati) aggiungere i due indirizzi del passaggio 1. Non aggiungere la barra finale. Basta un carattere di differenza perché Google dia l'errore "redirect_uri_mismatch" (l'indirizzo non corrisponde).
9. Scegliere **Oluştur** (Crea). Google mostra un ID client e una chiave segreta.
10. Tornare all'app. In **Ayarlar → Google**, nel campo **İstemci kimliği** (ID client) incollare l'ID che termina con `.apps.googleusercontent.com`. Nel campo **Gizli anahtar** (Chiave segreta) incollare la chiave che inizia con `GOCSPX-`.
11. Scegliere **Kaydet** (Salva). Compare l'avviso "Google erişim anahtarı kaydedildi" (Chiave di accesso a Google salvata). Non serve riavviare. Se l'ID viene incollato nel campo sbagliato, l'app avvisa: "Kimlik .apps.googleusercontent.com ile bitmeli. Gizli anahtarı değil, istemci kimliğini yapıştırın." (L'ID deve terminare con .apps.googleusercontent.com. Incollare l'ID client, non la chiave segreta.)
12. Se non c'è ancora un progetto, crearne prima uno con **Yeni proje**. Per i dettagli, vedere la guida [Projeler](/docs/projeler/).
13. Andare al progetto: **Proje ayarları → Bağlantılar** (Impostazioni del progetto → Collegamenti). Nella scheda **Google Search Console** scegliere **Bağlan** (Collega).
14. Nella schermata di consenso di Google scegliere l'account aggiunto come utente di test e concedere il permesso. Tornando all'app compare l'avviso "Search Console bağlandı" (Search Console collegato).
15. Dall'elenco **Mülk seç** (Scegli la proprietà) scegliere il sito e poi **Mülkü kaydet** (Salva la proprietà). Se si sceglie una proprietà di dominio, la scheda scrive "Alan adı mülkü: tüm alt alan adlarını ve http/https adreslerini kapsar." (Proprietà di dominio: comprende tutti i sottodomini e gli indirizzi http/https.)
16. Per Analytics, nella stessa schermata scegliere **Bağlan** nella scheda **Google Analytics**, concedere il permesso e scegliere la proprietà. I due collegamenti richiedono permessi separati. Uno non comprende l'altro.

### Strada più breve: l'account di servizio

L'account di servizio è un account speciale che si collega a Google al posto dell'utente. Non servono la schermata di consenso né l'indirizzo di reindirizzamento. Per la maggior parte delle persone è la strada consigliata. Se si vuole entrare nell'app con il proprio account Google, seguire invece la strada descritta sopra.

1. Aprire `console.cloud.google.com`. Nello stesso progetto Cloud verificare che le API del passaggio 3 siano abilitate. Andare a **IAM ve Yönetici → Hizmet hesapları** (IAM e amministrazione → Account di servizio).
2. Scegliere **Hizmet hesabı oluştur** (Crea account di servizio). Dare un nome. Saltare i passaggi sui ruoli e creare l'account.
3. Nella riga dell'account aprire la scheda **Anahtarlar** (Chiavi). Scegliere **Anahtar ekle → Yeni anahtar oluştur** (Aggiungi chiave → Crea nuova chiave).
4. Come tipo di chiave scegliere **JSON** e poi **Oluştur**. Sul computer viene scaricato un file.
5. Nell'app aprire la sezione **Ayarlar → Hizmet hesabı** (Impostazioni → Account di servizio). Aprire il file scaricato con il Blocco note, incollare tutto il contenuto nel campo e salvare. La schermata mostra l'indirizzo e-mail dell'account.
6. In Search Console scegliere **Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle** (Impostazioni → Utenti e autorizzazioni → Aggiungi utente). Scrivere questo indirizzo e-mail e come permesso scegliere **Tam** (Completo).
7. Per usare Analytics, in Google Analytics aprire nella proprietà la sezione **Yönetici → Erişim yönetimi** (Amministrazione → Gestione degli accessi). Aggiungere lo stesso indirizzo e-mail con il permesso **Görüntüleyen**.

Se è registrato un account di servizio, l'app usa quello. La riga "Şu an kullanılan" (In uso ora) nella schermata **Ayarlar** indica quale dei due è attivo.

## Verifica

- Nelle schede di **Proje ayarları → Bağlantılar** il badge deve dire **Bağlı** (Collegato).
- Le quattro schede numeriche della schermata **Panel** (Pannello) devono riempirsi in pochi secondi. In un sito nuovo i numeri possono essere zero. Non è un errore di collegamento.
- Il badge nella sezione **Ayarlar → Google** deve dire **Kayıtlı** (Registrata).

## Domande frequenti

**Dove viene conservata la chiave segreta?** Nel database su questo computer, cifrata. La chiave che la cifra è il file `instance-secret` (su Windows nella cartella dei dati, con Docker nel volume di dati). La chiave non viene mai inviata al browser.

**Si può usare la stessa chiave di accesso in più progetti?** Sì. Ne basta una per installazione. Ogni progetto sceglie la propria proprietà.

**Dopo qualche giorno il collegamento è caduto.** Nelle app in stato "Test", Google può limitare il permesso a sette giorni. La scheda dice "Bağlantının süresi doldu" (Il collegamento è scaduto). Basta scegliere **Yeniden bağlan** (Ricollega). La soluzione definitiva è portare la schermata di consenso in "Üretim" (Produzione) oppure passare all'account di servizio.

**Quali permessi richiede?** Per Search Console solo lettura (`webmasters.readonly`), per Analytics solo lettura (`analytics.readonly`). L'app non può cambiare nulla su Google.

## Se qualcosa non va

- **Google dice "redirect_uri_mismatch".** L'indirizzo di reindirizzamento in Cloud Console non è identico a quello dell'app. Usare il pulsante di copia nella schermata **Ayarlar**. Bastano http al posto di https, 127.0.0.1 al posto di localhost o una barra finale per causare l'errore.
- **Compare l'avviso "Google erişim anahtarı eksik" (Chiave di accesso a Google mancante).** I passaggi 10 e 11 sono stati saltati oppure il salvataggio non è riuscito. Nella schermata **Ayarlar** il badge deve dire **Kayıtlı**.
- **Google dice "access_denied".** L'account usato per l'accesso non è nell'elenco degli utenti di test della schermata di consenso. Aggiungerlo all'elenco oppure scegliere l'account giusto.
- **L'elenco delle proprietà è vuoto.** Questo account non ha un sito verificato in Search Console né un permesso in Analytics. Verificare prima il sito.
- **Compaiono "Bağlantısı tamamlanmadı" (Collegamento non completato) e "state_mismatch".** La schermata di consenso è stata aperta in due schede, oppure si è aspettato più di dieci minuti. Riprovare da capo in una sola scheda. Se i cookie del browser (piccoli file che i siti salvano nel browser) sono disattivati, attivarli.
- **Compare "Google hesabı zaten bağlı" (L'account Google è già collegato).** L'account era già stato collegato a un'altra voce. Con **Hesabı kaldır** (Rimuovi l'account) nel selettore delle proprietà togliere il vecchio e ricollegare.
- **Dopo un aggiornamento i collegamenti si sono interrotti.** La chiave di cifratura è cambiata (con Docker è stato aggiunto `BETTER_AUTH_SECRET` oppure il volume di dati è stato ricreato). Nelle schede scegliere **Yeniden bağlan**.

<!-- Kaynaklar: docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md; docs/SELF_HOSTING_GOOGLE_ANALYTICS.md; src/client/features/settings/GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; googleClientId.ts; src/client/features/integrations/IntegrationConnectionCard.tsx; GooglePropertyPicker.tsx; googleAuthErrorCopy.ts; src/server/features/google/selfHostedOAuth.ts; oauth-config.ts; src/shared/gsc.ts; src/shared/ga4.ts -->
