---
title: PageSpeed-Schlüssel
description: Um die Seitengeschwindigkeit messen zu können, holen Sie sich einen kostenlosen Google-PageSpeed-Schlüssel und tragen ihn in die App ein. Ohne Schlüssel bleibt die Messung auf 50 Seiten begrenzt.
kind: nasil-yapilir
updated: 2026-10-22
---

Am Ende dieser Seite haben Sie Ihren kostenlosen PageSpeed-Schlüssel geholt, in die App eingetragen und ausprobiert. Das dauert fünf Minuten. Die Option **Sayfa hızını da ölç** (Seitengeschwindigkeit auch messen) im Website-Audit misst jede Seite mit Googles Dienst PageSpeed Insights auf dem Smartphone und auf dem Computer. Google bietet diesen Dienst auch ohne Schlüssel an, aber mit sehr kleinem Kontingent. Nach wenigen Seiten kommt die Antwort „429, zu viele Anfragen“. Deshalb begrenzt die App die Messung bei einem Audit ohne Schlüssel auf höchstens 50 Seiten. Ein kostenloser Schlüssel hebt diese Grenze auf.

## Voraussetzungen

- Ein Google-Konto und ein Projekt in der Google Cloud Console (Googles Seite für Entwickler). Haben Sie für die Google-Verbindung bereits ein Projekt angelegt, nehmen Sie dasselbe.
- Sie brauchen keine Karte und zahlen nichts. Die PageSpeed Insights API (der Zugang zum Dienst) ist kostenlos.

## Schritte

1. Wählen Sie auf `console.cloud.google.com` Ihr Projekt aus.
2. Öffnen Sie die Seite **API'ler ve Hizmetler → Kitaplık** (APIs und Dienste → Bibliothek). Suchen Sie nach **PageSpeed Insights API** und klicken Sie auf **Etkinleştir** (Aktivieren). Überspringen Sie diesen Schritt, haben Sie zwar einen Schlüssel, aber jede Anfrage wird mit 403 abgelehnt.
3. Wählen Sie **API'ler ve Hizmetler → Kimlik bilgileri → Kimlik bilgisi oluştur → API anahtarı** (APIs und Dienste → Anmeldedaten → Anmeldedaten erstellen → API-Schlüssel). Es erscheint ein Schlüssel, der mit „AIza“ beginnt. Kopieren Sie ihn.
4. Optional, aber empfohlen: Klicken Sie auf **Anahtarı kısıtla** (Schlüssel einschränken). Wählen Sie bei der API-Einschränkung nur die **PageSpeed Insights API**. Soll Ihr KI-Assistent auch den Verlauf echter Nutzerdaten (CrUX) ansehen, fügen Sie die **Chrome UX Report API** hinzu.
5. Öffnen Sie in der App den Bereich **Ayarlar → Hız ölçümü** (Einstellungen → Geschwindigkeitsmessung). Fügen Sie den Schlüssel in das Feld **API anahtarı** (API-Schlüssel) ein. Klicken Sie auf **Kaydet** (Speichern). Es erscheint die Meldung „PageSpeed anahtarı kaydedildi“ (PageSpeed-Schlüssel gespeichert). Ein Neustart ist nicht nötig.
6. Klicken Sie im selben Bereich auf die Schaltfläche **Anahtarı test et** (Schlüssel testen). Die App führt eine einzige echte Messung für example.com durch (sie verbraucht 1 Messung). Sie sollten diese Antwort sehen: „Anahtar çalışıyor: Google PageSpeed Insights ölçümü kabul etti.“ (Der Schlüssel funktioniert: Google PageSpeed Insights hat die Messung angenommen.)

Bei Docker können Sie den Schlüssel auch in der Datei `.env` als `PAGESPEED_API_KEY` angeben. Der Bildschirm Ayarlar ist einfacher, und der dort eingetragene Wert hat Vorrang.

## Kontrolle

- Das Kennzeichen unter **Ayarlar → Hız ölçümü** sollte **Anahtar kayıtlı** (Schlüssel gespeichert) anzeigen.
- Ist auf der Karte zum Starten des Website-Audits „Sayfa hızını da ölç“ eingeschaltet, sollte die Zeitschätzung die Grenze „höchstens 50 Seiten“ nicht mehr erwähnen.
- Die Karte „PageSpeed Insights“ unter **Ayarlar → Sınırlar** (Einstellungen → Grenzen) sollte „Anahtar tanımlı“ (Schlüssel hinterlegt) anzeigen.

## Häufige Fragen

**Wie groß ist das Kontingent (die Quote)?** Google nennt keine offizielle Zahl und ändert sie mit der Zeit. Den tatsächlichen Wert sehen Sie in der Cloud Console unter **API'ler ve Hizmetler → Kotalar** (APIs und Dienste → Kontingente). In der Praxis gibt es eine Grenze pro Minute und eine pro Tag. Jede Seite verbraucht zwei Messungen: Smartphone und Computer.

**Was passiert, wenn ich an die Minutengrenze stoße?** Die App wartet und versucht es erneut. Das Audit wird langsamer, aber Sie müssen nichts tun. Ist die Tagesgrenze erreicht, bricht die Messung ab. Die bis dahin erzielten Ergebnisse bleiben. Am nächsten Tag wird sie in einem neuen Audit vervollständigt.

**Was, wenn zwei Audits gleichzeitig die Geschwindigkeit messen?** Sie teilen sich die Minutengrenze, und beide werden doppelt so langsam. Die Geschwindigkeitsmessung einer Website mit 212 Seiten dauert allein etwa 24 Minuten, zusammen mit einem anderen Audit 48 Minuten. Das gesamte Audit inklusive Crawl kommt auf bis zu 35 Minuten.

**Wo wird der Schlüssel gespeichert?** In der Datenbank auf diesem Computer, verschlüsselt. Er wird nicht an den Browser zurückgesendet. Der Bildschirm Ayarlar zeigt nur an, dass er „gespeichert“ ist.

**Wird ohne Schlüssel gar nicht gemessen?** Doch, bis zu 50 Seiten. Oft scheitert ein Teil davon mit 429. Für eine kleine Website kann das reichen. Für Websites mit mehr als 50 Seiten brauchen Sie den Schlüssel.

## Wenn etwas nicht klappt

- **Der Test meldet „restricted“ oder 403.** Schritt 2 fehlt. Die PageSpeed Insights API ist nicht aktiviert, oder der Schlüssel ist auf eine andere API eingeschränkt.
- **Der Test meldet „invalid_key“.** Der Schlüssel wurde unvollständig kopiert. Kopieren Sie ihn noch einmal aus der Cloud Console. Die App prüft das Format des Schlüssels nicht, sie sagt nur, ob Google ihn akzeptiert.
- **Der Test meldet „quota_exhausted“.** Das heutige Kontingent ist aufgebraucht. Versuchen Sie es morgen noch einmal oder sehen Sie in der Cloud Console bei den Kontingenten nach.
- **Im Audit ist die Geschwindigkeitsspalte leer.** Beim Start des Audits war „Sayfa hızını da ölç“ ausgeschaltet. Schalten Sie es im neuen Audit ein. Ein altes Audit wird nicht nachträglich gemessen.
- **Die Kontingentkarte meldet „Anahtar yok“ (kein Schlüssel), obwohl ich einen eingetragen habe.** Laden Sie die Seite neu. Die Karte betrachtet die Audits der letzten 24 Stunden. Der neue Schlüssel greift ab dem nächsten Audit.

<!-- Kaynaklar: docs/PAGESPEED_API_KEY.md; src/client/features/settings/PageSpeedKeySection.tsx; PageSpeedKeyTest.tsx; src/server/features/lighthouse/pagespeed-config.ts; PageSpeedKeyTestService.ts; src/shared/audit-limits.ts; src/server/features/quotas/QuotaService.ts -->
