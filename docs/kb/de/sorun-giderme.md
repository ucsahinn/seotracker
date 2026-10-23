---
title: Fehlerbehebung
description: Die häufigsten Probleme mit Symptom, Ursache und Lösung. Belegte Portnummer, Windows-Warnung, Google-Fehler, Kontingent, hängendes Audit, leere Diagramme und Assistent 401 stehen hier.
kind: sorun-giderme
updated: 2026-10-22
---

Die Oberfläche der App ist auf Türkisch. Diese Anleitung nennt jede Schaltfläche und jeden Bildschirmnamen auf Türkisch, mit der deutschen Bedeutung in Klammern.

Wenn etwas nicht funktioniert, sehen Sie zuerst in der App auf dem Bildschirm **Yardım** (Hilfe) auf die Karte „Kurulumunuzun durumu“ (Zustand Ihrer Installation). Die Karte prüft Anmeldung und Zugriff, die Google-Anmeldung, den PageSpeed-Schlüssel und die Datenbank. Sagt sie „N şey dikkat istiyor“ (N Dinge brauchen Aufmerksamkeit), führt Sie die Schaltfläche daneben zur richtigen Einstellung. Die folgenden Probleme sind vom häufigsten zum seltensten geordnet.

## Die Seite öffnet sich nicht

**Symptom:** Der Browser meldet „Verbindung abgelehnt“ („bağlantı reddedildi“).

**Ursache:** Die App läuft nicht.

**Lösung:** Sehen Sie unter Windows auf das Symbol in der Taskleiste. Ist es nicht zu sehen, klicken Sie in der Taskleiste auf den Pfeil ^. Fehlt es, öffnen Sie seowatcher über das Startmenü. Steht am Symbol „Hata“ (Fehler), klicken Sie mit der rechten Maustaste darauf und wählen **Yeniden başlat** (Neu starten). Geben Sie bei Docker `docker compose ps` ein. Ist der Status nicht healthy, geben Sie `docker compose up -d` ein.

## Die Portnummer ist belegt

**Symptom:** Unter Windows meldet das Symbol „3001 ve sonraki 9 adres numarası (port) dolu“ (3001 und die nächsten 9 Portnummern sind belegt). Bei Docker steht „Bind for 127.0.0.1:3001 failed“.

**Ursache:** Ein anderes Programm verwendet dieselbe Portnummer.

**Lösung:** Das Windows-Paket wählt normalerweise eine freie Nummer zwischen 3002 und 3010. Sind alle belegt, schreiben Sie eine andere Nummer in die Datei `config.json` im Datenordner. Legen Sie bei Docker eine `.env` mit der Zeile `PORT=3002` an und geben Sie `docker compose up -d --force-recreate seotracker` ein. Ändert sich die Nummer, aktualisieren Sie auch die Weiterleitungsadressen bei Google.

## Das Symbol meldet „Windows bileşeni eksik“

**Symptom:** Die App öffnet sich nicht. Am Symbol steht „Windows bileşeni eksik“ (Windows-Komponente fehlt), oder im Protokoll stehen „Workers runtime failed to start“ und „0xc0000005“.

**Ursache:** Der Motor der App benötigt das Visual-C++-Paket von Microsoft (2015-2022, 64 Bit). Auf einem frisch installierten Windows fehlt dieses Paket oder ist veraltet.

**Lösung:** Klicken Sie auf die erscheinende Sprechblase oder klicken Sie mit der rechten Maustaste auf das Symbol und wählen Sie **Eksik Windows bileşenini kur** (Fehlende Windows-Komponente installieren). Windows fragt einmal nach der Administratorerlaubnis. Nach der Installation startet die App von selbst neu. Haben Sie das Paket nicht, laden Sie es von der Seite von Microsoft herunter: `https://aka.ms/vs/17/release/vc_redist.x64.exe`

## Die Administratorerlaubnis wurde nicht erteilt

**Symptom:** Bei der Installation wurde für Visual C++ um Erlaubnis gebeten, Sie haben **Hayır** (Nein) gewählt, und die App ist nicht gestartet.

**Ursache:** Die benötigte Windows-Komponente konnte nicht installiert werden.

**Lösung:** Klicken Sie mit der rechten Maustaste auf das Symbol in der Taskleiste (ist es nicht zu sehen, klicken Sie auf den Pfeil ^). Wählen Sie **Eksik Windows bileşenini kur** und erlauben Sie es diesmal. Oder laden Sie die Komponente von `https://aka.ms/vs/17/release/vc_redist.x64.exe` herunter und installieren Sie sie.

## Das Symbol meldet „Uygulamanın motoru çöktü“

**Symptom:** Die App öffnet sich nicht. Im Protokoll stehen „Workers runtime failed to start“ und „0xc0000005“, aber das Visual-C++-Paket ist installiert.

**Ursache:** Der Motor der App (workerd) bleibt auf diesem Computer an einer Systemdatei hängen. Die App probiert den Motor beim Start allein aus. Sagt sie „Tek başına da başlayamıyor“ (Startet auch allein nicht), liegt das Problem am Computer. Sagt sie „Tek başına çalışıyor“ (Läuft allein), liegt das Problem im Datenordner oder in der Konfiguration.

**Lösung:** Wählen Sie zuerst **Kurulumu onar** (Installation reparieren). Hilft das nicht, klicken Sie mit der rechten Maustaste auf das Symbol und wählen **Sorunu bildir (GitHub)** (Problem melden (GitHub)). Die Diagnoseinformationen (Windows-Version, Prozessor, Name des fehlerhaften Moduls, Absturzabbild) werden automatisch an die Meldung angehängt, Sie müssen sie nur absenden. Die Absturzabbilder liegen im Ordner `%LOCALAPPDATA%\seowatcher\logs\dumps`. Wenn Sie möchten, hängen Sie sie auch an die Meldung an.

## Windows meldet „Der Computer wurde geschützt“

**Symptom:** Die Installationsdatei öffnet sich nicht, es erscheint ein blauer Warnbildschirm („bilgisayarınızı korudu“).

**Ursache:** Die Datei ist nicht signiert. Windows zeigt diesen Bildschirm bei Herausgebern, die es nicht kennt.

**Lösung:** Klicken Sie auf dem Bildschirm auf den Text **Daha fazla bilgi** (Weitere Informationen). Die Schaltfläche **Yine de çalıştır** (Trotzdem ausführen) erscheint. Wenn Sie Bedenken haben, vergleichen Sie die SHA-256-Prüfsumme (den Fingerabdruck) der Datei mit `SHA256SUMS.txt` auf der Versionsseite.

## Google meldet „redirect_uri_mismatch“

**Symptom:** Nach einem Klick auf **Bağlan** (Verbinden) zeigt Google eine Fehlerseite.

**Ursache:** Die Weiterleitungsadresse in der Google Cloud Console ist nicht Zeichen für Zeichen dieselbe wie in der App.

**Lösung:** Kopieren Sie die beiden Adressen mit der Kopierschaltfläche im Bereich **Ayarlar → Google** (Einstellungen → Google). Fügen Sie sie in der Cloud Console in das Adressfeld des Google-Zugangsschlüssels (des OAuth-Clients) ein. Localhost statt 127.0.0.1, http statt https oder ein Schrägstrich am Ende machen den Unterschied.

## „Google erişim anahtarı eksik“

**Symptom:** Der Reiter Bağlantılar (Verbindungen) in den Projekteinstellungen zeigt eine gelbe Warnung.

**Ursache:** Im Bereich **Ayarlar → Google** wurden Client-ID und geheimer Schlüssel nicht eingetragen. Oder bei Docker ist der Verschlüsselungsschlüssel kürzer als 32 Zeichen.

**Lösung:** Führen Sie Schritt 10 und 11 der Anleitung zur Google-Verbindung aus. Haben Sie bei Docker `BETTER_AUTH_SECRET` von Hand angegeben, verlängern Sie den Wert. Lassen Sie ihn leer, erzeugt die App ihn selbst.

## Google meldet „access_denied“

**Symptom:** Nach dem Freigabebildschirm erscheint die Meldung „iptal edildi“ (abgebrochen).

**Ursache:** Das Google-Konto, mit dem Sie sich angemeldet haben, steht nicht in der Liste der Testnutzer auf dem Freigabebildschirm.

**Lösung:** Fügen Sie das Konto in der Cloud Console unter **OAuth izin ekranı → Test kullanıcıları** (OAuth-Zustimmungsbildschirm → Testnutzer) hinzu. Klicken Sie dann erneut auf **Bağlan**.

## Die Verbindung ist abgelaufen

**Symptom:** Auf der Karte der Verbindungen steht „Bağlantının süresi doldu“ (Die Verbindung ist abgelaufen), und es kommen keine Daten.

**Ursache:** Bei Apps im Status „Test“ kann Google die Freigabe schon nach sieben Tagen entziehen. Möglich ist auch, dass sich der Verschlüsselungsschlüssel geändert hat.

**Lösung:** Klicken Sie auf der Karte auf **Yeniden bağlan** (Neu verbinden). Wiederholt sich das oft, stellen Sie den Freigabebildschirm auf Produktion oder wechseln Sie zum Dienstkonto (**Ayarlar → Hizmet hesabı**).

## Keine Suchanfragedaten, die Diagramme sind leer

**Symptom:** Die Karten im Panel (Übersicht) zeigen null. Arama performansı (Suchleistung) meldet „Bu dönem için henüz veri yok“ (Für diesen Zeitraum liegen noch keine Daten vor).

**Ursache:** Es gibt drei Möglichkeiten. Die Website ist neu, und Google liefert noch keine Impressionen. Oder die Search Console hat drei Tage Verzögerung, und der gewählte Zeitraum ist zu kurz. Oder es wurde die falsche Property gewählt.

**Lösung:** Stellen Sie den Zeitraum auf **Son 3 ay** (Letzte 3 Monate). Prüfen Sie in den Projekteinstellungen, ob die Property die richtige Website ist. Eine Domain-Property umfasst alle Subdomains, eine URL-Präfix-Property nicht. Bei einer neuen Website können die Zeilen mit Suchanfragen erst nach Wochen kommen. Die Seitentabelle füllt sich früher.

## Die Tabellensumme stimmt nicht mit der Karte überein

**Symptom:** Addieren Sie die Impressionen in der Seitentabelle, kommt eine größere Zahl heraus als auf der Karte.

**Ursache:** Das ist kein Fehler. Google zählt jede Seite, die bei derselben Suche erscheint, einzeln. Die Karte ist die Summe der Website.

**Lösung:** Lesen Sie die Summe von der Karte ab. Deuten Sie die Tabelle Seite für Seite.

## Das Audit hängt bei „Sürüyor“ (Läuft)

**Symptom:** Seit einer halben Stunde gibt es keinen Fortschritt.

**Ursache:** Die App wurde möglicherweise neu gestartet, oder der Vorgang ist abgebrochen.

**Lösung:** Warten Sie. Die App prüft Audits, die länger als 15 Minuten als „läuft“ erscheinen. Gibt es kein Lebenszeichen, schließt sie das Audit als „Başarısız“ (Fehlgeschlagen) ab und nennt den Grund. Klicken Sie dann auf **Aynı ayarlarla yeniden başlat** (Mit denselben Einstellungen neu starten). Starten Sie nicht zwei Audits gleichzeitig mit Geschwindigkeitsmessung, sie bremsen sich gegenseitig.

## Das Audit meldet „Engellendik“ (Wir wurden blockiert)

**Symptom:** Es erscheint eine gelbe Warnung: „Denetim bu siteyi tamamen tarayamadı.“ (Das Audit konnte diese Website nicht vollständig crawlen.) oder „N sayfada engellendik.“ (Auf N Seiten wurden wir blockiert.)

**Ursache:** Der Bot-Schutz der Website (Cloudflare oder eine Firewall) hat den Crawler der App gestoppt.

**Lösung:** Erlauben Sie in der Firewall den User-Agent namens `seotracker-audit` oder setzen Sie die Netzwerkadresse (IP) Ihres Computers auf die Liste der erlaubten Adressen. Gehört die Website nicht Ihnen, können Sie nichts tun. Die Ergebnisse bleiben auf die Seiten beschränkt, die gecrawlt werden konnten.

## Die Geschwindigkeitsmessung ist unvollständig oder fehlt ganz

**Symptom:** Der Reiter Hız (Geschwindigkeit) ist leer oder hat nur wenige Zeilen. Die Kontingentkarte meldet „Kota doldu“ (Kontingent voll), „Dakikalık sınır“ (Minutengrenze) oder „Anahtar yok“ (Kein Schlüssel).

**Ursache:** Es gibt keinen PageSpeed-Schlüssel (es werden höchstens 50 Seiten gemessen). Oder Googles Tageskontingent ist aufgebraucht.

**Lösung:** Holen Sie sich nach der Anleitung zum PageSpeed-Schlüssel einen kostenlosen Schlüssel. Ist das Tageskontingent aufgebraucht, wird es morgen in einem neuen Audit vervollständigt. War die Geschwindigkeitsmessung beim Start des Audits ausgeschaltet, wird sie für dieses Audit nicht nachgeholt.

## URL-Prüfung: „Tagesgrenze erreicht“

**Symptom:** Im Reiter Dizin durumu (Indexstatus) funktioniert die Schaltfläche nicht. Es steht „Google'ın günlük 2.000 adres sınırına ulaşıldı“ (Googles Tagesgrenze von 2.000 Adressen ist erreicht).

**Ursache:** Pro Property gibt es 2.000 Fragen am Tag. Die App, Ihr Assistent und die Abfragen, die Sie in der Search Console von Hand stellen, verbrauchen aus demselben Vorrat.

**Lösung:** Machen Sie morgen weiter. Die App fragt nur veraltete Antworten neu ab, Ihr Kontingent geht nicht verloren.

## In Analytics erscheint Localhost-Traffic

**Symptom:** In der Tabelle der Einstiegsseiten steht in der Spalte Alan adı (Domain) localhost oder 127.0.0.1.

**Ursache:** Auch die Testkopie Ihrer Website lädt dasselbe Analytics-Tag.

**Lösung:** Stellen Sie das Tag so ein, dass es nur auf der echten Domain geladen wird. In den meisten Werkzeugen gibt es dafür die Option „Domainprüfung“. Die App filtert diese Zeilen nicht von selbst heraus. Bis dahin lesen Sie die Tabelle mit Blick auf die Spalte Alan adı.

## Der Assistent kann sich nicht verbinden (401)

**Symptom:** Claude Code oder Codex meldet „Unauthorized“.

**Ursache:** Das Passwort wird nicht gesendet oder ist falsch.

**Lösung:** Kopieren Sie das Passwort erneut. Unter Windows steht es in der Datei `mcp-token` im Datenordner. Geben Sie bei Docker `docker compose exec -T seotracker cat /app/.wrangler/mcp-token` ein. Löschen Sie das Zeilenende-Zeichen am Ende des Wertes. Möchten Sie kein Terminal benutzen, öffnen Sie die Datei mit dem Editor (Notepad), markieren die ganze Zeile und kopieren sie. Lassen Sie kein Zeilenende stehen. Geben Sie in Claude Code `/mcp` ein und wählen Sie **Reconnect**.

## Docker braucht beim ersten Start sehr lange oder meldet „unhealthy“

**Symptom:** `docker compose ps` meldet auch nach fünf Minuten nicht healthy.

**Ursache:** Beim ersten Start wird die App in der Box (dem Container) gebaut und braucht etwa 2 GB Arbeitsspeicher. Reicht der Arbeitsspeicher nicht, bricht der Bau ab.

**Lösung:** Geben Sie `docker compose logs --tail 50` ein und sehen Sie sich die letzten Zeilen an. Gibt es einen Speicherfehler, geben Sie den Boxen in den Einstellungen von Docker Desktop mehr Arbeitsspeicher. Geben Sie dann `docker compose up -d --build` ein.

## Wo liegen Daten und Protokolle?

Unter Windows liegt alles im Ordner `%LOCALAPPDATA%\seowatcher`: `data` (Datenbank), `logs\server.log`, `logs\migrate.log`, `instance-secret`, `mcp-token`, `config.json`. **Günlükleri aç** (Protokolle öffnen) und **Veri klasörünü aç** (Datenordner öffnen) im Menü der Taskleiste führen dorthin.

Bei Docker liegen die Daten im Datenspeicher `seotracker_data` (`/app/.wrangler`). Die Protokolle sehen Sie mit dem Befehl `docker compose logs -f`.

Bei einer Problemmeldung klicken Sie auf dem Bildschirm **Yardım** auf **Tanılama paketi indir** (Diagnosepaket herunterladen). Die Datei enthält die Version, die Installationsprüfungen und die letzten 25 Audits, aber keine Geheimnisse. Hängen Sie die Datei an den Fehlerbericht auf GitHub an.

## Warnungen des Starters

Warnungen, die am Symbol in der Taskleiste erscheinen, und was Sie tun:

- **„Sunucu 120 saniyede yanıt vermedi“ (Der Server hat nicht innerhalb von 120 Sekunden geantwortet).** Wählen Sie im Menü **Yeniden başlat**. Hilft das nicht, wählen Sie **Günlükleri aç** und sehen Sie sich die letzten Zeilen von `server.log` an.
- **„Kurulum eksik“ (Installation unvollständig).** Führen Sie die Installationsdatei erneut aus.
- **„Güncelleme yapılamadı“ (Das Update war nicht möglich).** Prüfen Sie Ihre Internetverbindung und versuchen Sie es im Menü mit **Güncelle** (Aktualisieren) noch einmal. Die installierte Version läuft weiter.
- **„Windows bileşeni kurulamadı“ (Die Windows-Komponente konnte nicht installiert werden).** Wählen Sie im Menü **Eksik Windows bileşenini kur**.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
