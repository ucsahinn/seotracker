---
title: Chiave PageSpeed
description: Si ottiene una chiave PageSpeed gratuita di Google e la si inserisce nell'app. Senza chiave la misurazione della velocità si ferma a 50 pagine.
kind: nasil-yapilir
updated: 2026-10-22
---

Al termine la chiave PageSpeed gratuita sarà ottenuta, inserita nell'app e provata. Servono cinque minuti. L'opzione "Sayfa hızını da ölç" (Misura anche la velocità delle pagine) del controllo del sito misura ogni pagina su telefono e su computer con il servizio PageSpeed Insights di Google. Google offre questo servizio anche senza chiave, ma con una quota molto ridotta: dopo poche pagine arriva la risposta "429, çok fazla istek" (429, troppe richieste). Per questo, in un controllo senza chiave, l'app limita la misurazione a 50 pagine al massimo. La chiave gratuita toglie questo limite.

## Cosa serve

- Un account Google e un progetto in Google Cloud Console (la pagina per sviluppatori di Google). Se per il collegamento con Google è già stato creato un progetto, va bene lo stesso.
- Non servono carte né pagamenti. L'API di PageSpeed Insights (la porta di accesso al servizio) è gratuita.

## Passaggi

1. Su `console.cloud.google.com` scegliere il proprio progetto.
2. Aprire la pagina **API'ler ve Hizmetler → Kitaplık** (API e servizi → Libreria). Cercare **PageSpeed Insights API** e scegliere **Etkinleştir** (Abilita). Saltando questo passaggio la chiave esiste, ma ogni richiesta viene respinta con un errore 403.
3. Scegliere **API'ler ve Hizmetler → Kimlik bilgileri → Kimlik bilgisi oluştur → API anahtarı** (API e servizi → Credenziali → Crea credenziali → Chiave API). Compare una chiave che inizia con "AIza". Copiarla.
4. Facoltativo ma consigliato: scegliere **Anahtarı kısıtla** (Limita la chiave). Nelle limitazioni delle API selezionare solo **PageSpeed Insights API**. Se l'assistente di intelligenza artificiale deve consultare anche lo storico dei dati reali degli utenti (CrUX), aggiungere anche **Chrome UX Report API**.
5. Nell'app aprire la sezione **Ayarlar → Hız ölçümü** (Impostazioni → Misurazione della velocità). Incollare la chiave nel campo **API anahtarı** (Chiave API) e scegliere **Kaydet** (Salva). Compare l'avviso "PageSpeed anahtarı kaydedildi" (Chiave PageSpeed salvata). Non serve riavviare.
6. Nella stessa sezione premere **Anahtarı test et** (Prova la chiave). L'app esegue una sola misurazione reale per example.com (consuma 1 misurazione). La risposta attesa è: "Anahtar çalışıyor: Google PageSpeed Insights ölçümü kabul etti." (La chiave funziona: Google PageSpeed Insights ha accettato la misurazione.)

Con Docker la chiave si può indicare anche nel file `.env` come `PAGESPEED_API_KEY`. La schermata delle impostazioni è più comoda e il valore inserito lì ha la precedenza.

## Verifica

- Il badge di **Ayarlar → Hız ölçümü** deve dire **Anahtar kayıtlı** (Chiave registrata).
- Nella scheda di avvio del controllo del sito, con "Sayfa hızını da ölç" attivo, la stima della durata non deve più parlare del limite di "en çok 50 sayfa" (al massimo 50 pagine).
- La scheda "PageSpeed Insights" in **Ayarlar → Sınırlar** (Impostazioni → Limiti) deve dire "Anahtar tanımlı" (Chiave definita).

## Domande frequenti

**Quanto vale la quota?** Google non indica un numero ufficiale e lo cambia nel tempo. Il valore reale si vede in Cloud Console, in **API'ler ve Hizmetler → Kotalar** (API e servizi → Quote). In pratica esistono un limite al minuto e un limite al giorno. Ogni pagina consuma due misurazioni: telefono e computer.

**Che cosa succede se si supera il limite al minuto?** L'app attende e riprova. Il controllo rallenta, ma l'utente non deve fare nulla. Se finisce il limite giornaliero, la misurazione si ferma. I risultati ottenuti fino a quel momento restano. Il giorno dopo si completa con un nuovo controllo.

**E se due controlli misurano la velocità nello stesso momento?** Si dividono il limite al minuto ed entrambi rallentano del doppio. La misurazione della velocità di un sito di 212 pagine dura da sola circa 24 minuti, insieme a un altro controllo 48 minuti. L'intero controllo, scansione compresa, arriva a 35 minuti.

**Dove viene conservata la chiave?** Nel database su questo computer, cifrata. Non viene rimandata al browser. La schermata delle impostazioni mostra solo l'informazione "registrata".

**Senza chiave non si misura nulla?** Si misura, fino a 50 pagine. Spesso una parte fallisce con l'errore 429. Per un sito piccolo può bastare. Per i siti con più di 50 pagine la chiave è necessaria.

## Se qualcosa non va

- **La prova dice "restricted" o 403.** Manca il passaggio 2: l'API PageSpeed Insights non è abilitata oppure la chiave è limitata a un'altra API.
- **La prova dice "invalid_key".** La chiave è stata copiata in modo incompleto. Copiarla di nuovo da Cloud Console. L'app non controlla il formato della chiave: dice solo se Google la accetta o no.
- **La prova dice "quota_exhausted".** La quota di oggi è esaurita. Riprovare domani oppure controllare la quota in Cloud Console.
- **Nel controllo la colonna della velocità è vuota.** All'avvio del controllo "Sayfa hızını da ölç" era disattivato. Attivarlo nel nuovo controllo. Un controllo già concluso non può più essere misurato.
- **La scheda della quota dice "Anahtar yok" (Nessuna chiave) ma la chiave è stata inserita.** Aggiornare la pagina. La scheda considera i controlli delle ultime 24 ore. La nuova chiave si attiva dal controllo successivo.

<!-- Kaynaklar: docs/PAGESPEED_API_KEY.md; src/client/features/settings/PageSpeedKeySection.tsx; PageSpeedKeyTest.tsx; src/server/features/lighthouse/pagespeed-config.ts; PageSpeedKeyTestService.ts; src/shared/audit-limits.ts; src/server/features/quotas/QuotaService.ts -->
