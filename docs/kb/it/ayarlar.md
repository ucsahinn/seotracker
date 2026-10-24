---
title: Impostazioni
description: Tema, chiave di accesso a Google, chiave PageSpeed, limiti d'uso e aggiornamenti. È l'unica schermata di impostazioni dell'intera installazione.
screen: Ayarlar
route: /settings
updated: 2026-10-24
---

Qui si gestiscono il collegamento con Google, la chiave per la misurazione della velocità e gli aggiornamenti.

Nella schermata **Ayarlar** (Impostazioni) si regola ciò che riguarda l'intera installazione. Le impostazioni specifiche del progetto (nome, dominio, proprietà di Search Console e di Analytics) stanno nella pagina **Proje ayarları** (Impostazioni del progetto) di ciascun progetto. Qui si gestiscono la chiave di accesso necessaria per collegarsi a Google, la chiave PageSpeed, il tema e il controllo degli aggiornamenti. A sinistra ci sono le sezioni **Görünüm** (Aspetto), **Google**, **Hizmet hesabı** (Account di servizio), **Hız ölçümü** (Misurazione della velocità), **Sınırlar** (Limiti), **Hakkında** (Informazioni) e **Windows**. Nel titolo di ogni sezione c'è un badge che ne mostra lo stato.

## Cosa c'è nella schermata

**Görünüm.** Per il **Tema** (Tema) ci sono le opzioni Sistem (Sistema), Açık (Chiaro) e Koyu (Scuro). La scelta è conservata in questo browser. In un altro browser o su un altro computer la si sceglie di nuovo.

**Lingua.** L’interfaccia dell’app è disponibile in turco e inglese. In **Ayarlar → Görünüm → Dil**, scegliere Türkçe o English. La pagina si ricarica; numeri e date seguono la lingua selezionata. La scelta viene salvata nel browser.

**Notifiche (Bildirimler).** La campanella mostra gli ultimi 50 eventi e il numero di messaggi non letti. **Tümünü okundu işaretle** segna tutto come letto senza eliminare la cronologia. In **Bildirimler** è possibile ascoltare il suono e attivare le notifiche desktop in background. Il permesso del browser viene richiesto solo all’attivazione.

**Windows.** Attiva o disattiva l’avvio con Windows e l’installazione automatica degli aggiornamenti. Sono le stesse preferenze salvate nel menu dell’icona di notifica. Le restrizioni dell’amministratore sono spiegate accanto al comando. I comandi sono disabilitati nelle installazioni Docker e di sviluppo; i vecchi launcher Windows richiedono l’aggiornamento del pacchetto.

**Google.** Il badge ha uno di tre valori: **Kayıtlı** (Registrata), **Ortamdan geliyor** (Arriva dall'ambiente; in un'installazione Docker è stata data con il file `.env`) oppure **Eksik** (Mancante). La sezione mostra i due indirizzi di reindirizzamento da aggiungere in Google Cloud Console (il pannello per sviluppatori di Google). Accanto ci sono i pulsanti di copia. Vanno aggiunti entrambi. Se non si aggiunge l'indirizzo di Analytics, si collega solo Search Console.

Ci sono due campi: **İstemci kimliği** (ID client) e **Gizli anahtar** (Chiave segreta). Entrambi sono parti della chiave di accesso ottenuta da Google. I pulsanti sono: **Kaydet** (Salva), **Vazgeç** (Annulla), **Değiştir** (Modifica) e **Sil** (Elimina). **Sil** interrompe i collegamenti esistenti. I passaggi dettagliati sono nella guida al collegamento con Google.

**Hizmet hesabı (strada più breve).** L'account di servizio è un account robot creato su Google per l'app. Nel campo **JSON anahtar dosyası** (File chiave JSON) si incolla il contenuto del file scaricato da Google Cloud. Se è registrato, si vede l'indirizzo e-mail dell'account. La schermata dice dove aggiungere questo indirizzo:

- Search Console: "Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle" (Impostazioni → Utenti e autorizzazioni → Aggiungi utente), autorizzazione Tam (Completa).
- Analytics: "Yönetici → Erişim yönetimi" (Amministrazione → Gestione degli accessi), autorizzazione Görüntüleyen (Visualizzatore).

Il badge dice **Kayıtlı** (Registrato) oppure **Kullanılmıyor** (Non in uso). Se esiste un account di servizio registrato, l'app lo preferisce alla chiave di accesso a Google. Eliminarlo lo toglie dall'app, ma non revoca la chiave su Google.

**Hız ölçümü.** Ci sono il campo **API anahtarı** (Chiave API) e il pulsante **Anahtarı test et** (Prova la chiave). La prova "consuma 1 misurazione". Si può premere ogni dieci secondi. Il badge dice **Anahtar kayıtlı** (Chiave registrata), **Ortam anahtarı** (Chiave dell'ambiente) oppure **Anahtar eksik** (Chiave mancante). I dettagli sono nella guida alla chiave PageSpeed.

**Sınırlar.** Nelle schede "Google ve sistem sınırları" (Limiti di Google e del sistema) ci sono:

- URL Denetimi (Controllo URL, Search Console): 2.000 al giorno.
- PageSpeed Insights.
- Unità di quota giornaliera e oraria di GA4 (Google Analytics): predefinite 200.000 e 40.000. Google non dichiara questo numero, dice solo quanto ne resta.
- Limite di pagine del controllo: 10.000.
- Report per progetto: 10.000, modelli: 10.
- Report più grande: 500.000 byte.

Lo stato di ogni scheda è **Yeterli** (Sufficiente), **Azalıyor** (In esaurimento, oltre il 70 per cento usato), **Neredeyse doldu** (Quasi esaurito, oltre il 90 per cento usato) oppure **Bilinmiyor** (Sconosciuto).

**Hakkında.** La riga **Sürüm** (Versione) mostra la versione (per esempio 0.5.0 Alpha). L'interruttore **Güncellemeleri kontrol et** (Controlla gli aggiornamenti) è attivo per impostazione predefinita. Se è attivo, l'app chiede a GitHub l'ultima versione al massimo una volta al giorno. In tal caso compare anche il pulsante **Şimdi kontrol et** (Controlla ora). Se c'è una versione nuova, compare il collegamento **Değişiklikler** (Modifiche). Per le installazioni Docker compare anche il comando da copiare: `git pull && docker compose up -d --build`. Nel pacchetto Windows la schermata rimanda a **Güncelle** (Aggiorna) nell'icona della barra delle applicazioni. Se l'aggiornamento automatico è attivo, la nuova versione si installa da sola.

**Sürüm notları.** Le note di versione hanno una pagina separata sopra le notifiche nel menu laterale. Le etichette colorate indicano novità, correzioni e modifiche di sicurezza.

## Come si usa

1. Alla prima installazione, inserire nella sezione **Google** l'ID client e la chiave segreta. Poi inserire la chiave PageSpeed nella sezione **Hız ölçümü**. Una volta salvate entrambe, si passa al progetto e si sceglie la proprietà.
2. Una volta al mese guardare la sezione **Sınırlar**. La quota che si vede "Azalıyor" è di solito il limite del controllo URL.
3. Nella sezione **Hakkında**, se c'è una versione nuova, aggiornare. Le note di versione dicono che cosa è cambiato. Il controllo degli aggiornamenti è l'unico collegamento in uscita dal computer verso un indirizzo diverso da Google. Per non usarla, disattivare l'interruttore.
4. Se bisogna cambiare la chiave di accesso a Google (per esempio con un nuovo progetto Cloud), fare clic su **Değiştir** e incollare i nuovi valori. I collegamenti esistenti non funzionano con la nuova chiave. Nei progetti serve **Yeniden bağlan** (Ricollega).

## Domande frequenti

**Perché la chiave segreta non si vede nella schermata?** L'app la conserva cifrata e non la rimanda al browser. La schermata mostra solo che è registrata e l'ID.

**Se il valore dato con `.env` in Docker e quello inserito nella schermata sono in conflitto?** Vince quello inserito nella schermata. Se si salva un valore mentre il badge dice "Ortamdan geliyor", da quel momento si usa quello.

**Che cosa invia il controllo degli aggiornamenti?** Non invia alcun dato. Legge l'elenco pubblico delle versioni di GitHub. La richiesta è anonima.

**Account di servizio o chiave di accesso a Google?** L'account di servizio non obbliga a passare dalla schermata di consenso e non scade. In cambio, bisogna dare a mano i permessi a quell'account in Search Console e in Analytics. In un'installazione per una sola persona vanno bene entrambi. Se si vede spesso "süresi doldu" (scaduto), passare all'account di servizio.

## Limiti

La schermata Impostazioni non cambia il numero di porta, la cartella dei dati né le impostazioni di rete. Si trovano nel file `config.json` nel pacchetto Windows e nel file `.env` con Docker. Non c'è la gestione di utenti e password: l'app è per un solo utente. Le schede della quota sono il conteggio dell'app stessa, non il contatore reale di Google. I controlli URL fatti a mano in Search Console qui non compaiono, ma consumano il limite di Google.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
