---
title: Installation unter Windows
description: seowatcher mit einer einzigen Datei installieren, ohne Docker und ohne Terminal. Dazu Update, Deinstallation, Sicherung und Portnummer.
kind: nasil-yapilir
updated: 2026-10-23
---

Am Ende ist die App auf Ihrem Computer installiert und im Browser geöffnet. Die Installation dauert zwei Minuten und gilt nur für Ihr eigenes Benutzerkonto. Administratorrechte sind nicht nötig.

Die Oberfläche der App gibt es in sechs Sprachen: Türkisch, Englisch, Deutsch, Französisch, Italienisch und Portugiesisch. Die Sprache lässt sich unter Einstellungen → Darstellung → Sprache ändern. Diese Anleitung nennt Schaltflächen und Bildschirme so, wie sie in der deutschen Oberfläche heißen. Den Installationsassistenten gibt es nur auf Türkisch und Englisch, das Tray-Menü in der Taskleiste nur auf Türkisch. Dort steht der Name, den Sie sehen, mit der deutschen Bedeutung in Klammern.

## Voraussetzungen

- Windows 10 oder 11 (64 Bit).
- Etwa 400 MB freier Speicherplatz. Die Installationsdatei ist 86 MB groß, installiert belegt die App 313 MB.
- Ein Browser wie Edge, Chrome oder Firefox.
- Docker, Node oder ein Terminal (Eingabeaufforderung) brauchen Sie nicht.
- Die App benötigt das Visual-C++-Paket von Microsoft. Fehlt es auf dem Computer, installiert das Setup es selbst und fragt dafür einmal nach der Administratorerlaubnis. Die App wird in den Ordner `%LOCALAPPDATA%\Programs\seowatcher` installiert.

## Schritte

### Erstinstallation

1. Laden Sie die Datei **seowatcher-setup.exe** von der GitHub-Seite mit den Versionen herunter. Die feste Adresse lautet: `github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
2. Doppelklicken Sie auf die Datei.
3. Meldet Windows „Der Computer wurde durch Windows geschützt“, klicken Sie auf **Weitere Informationen** und dann auf **Trotzdem ausführen**. Die Datei ist noch nicht signiert, daher kennt Windows den Herausgeber nicht. Diese Warnung ist normal.
4. Wenn Sie möchten, vergleichen Sie die SHA-256-Prüfsumme der Datei (ihren Fingerabdruck) mit der Datei `SHA256SUMS.txt` auf der Versionsseite.
5. Das Setup gibt es auf Türkisch und Englisch. Fragt es nach der Sprache, wählen Sie **English**; die folgenden Schritte nennen die englischen Namen. Klicken Sie auf der Willkommensseite auf **Next** (Weiter).
6. Bei der Frage, für wen installiert werden soll, wählen Sie **Install for me only** (Nur für mich installieren). Das ist die empfohlene Wahl; die Installation gilt dann nur für Ihr Konto. Die Option **Install for all users** (Für alle Benutzer installieren) verlangt Administratorrechte.
7. Der Assistent bietet zwei Optionen an: **Start seowatcher when Windows starts** (seowatcher mit Windows starten) und **Create a desktop shortcut** (Verknüpfung auf dem Desktop anlegen). Die erste ist vorausgewählt. Soll die App nicht automatisch im Hintergrund starten, entfernen Sie das Häkchen. Klicken Sie dann auf **Next** (Weiter).
8. Klicken Sie auf **Install** (Installieren).
9. Auf der letzten Seite finden Sie das Kästchen **Start seowatcher now** (seowatcher jetzt starten). Lassen Sie es angekreuzt und klicken Sie auf **Finish** (Fertigstellen).
10. Der erste Start dauert 20 bis 30 Sekunden. Der Text am Symbol in der Taskleiste wechselt nacheinander zu „Anahtarlar hazırlanıyor“ (Schlüssel werden vorbereitet), „Veritabanı güncelleniyor“ (Datenbank wird aktualisiert) und „Sunucu başlatılıyor“ (Server wird gestartet). Ist das Symbol nicht zu sehen, klicken Sie in der Taskleiste auf den Pfeil ^. Sobald alles bereit ist, öffnet sich Ihr Browser. Startet die App automatisch mit Windows, öffnet sich der Browser nicht; stattdessen erscheint die Sprechblase „seowatcher hazır“ (seowatcher ist bereit).
11. Der Browser zeigt `http://127.0.0.1:3001`. 127.0.0.1 ist die Adresse Ihres eigenen Computers, 3001 ist die Portnummer (Port).

Weiter geht es mit der Anleitung zur Google-Verbindung.

### Menü in der Taskleiste

Klicken Sie mit der rechten Maustaste auf das Symbol. Ist es nicht zu sehen, klicken Sie in der Taskleiste auf den Pfeil ^. Das Menü hat vier Abschnitte: Ganz oben stehen das Öffnen der App und die Statuszeile, danach Update und Neustart, danach zwei Einstellungen, ganz unten die Einträge zur Fehlerbehebung.

- **seowatcher'ı aç** (seowatcher öffnen): öffnet die App im Browser. Ein Doppelklick auf das Symbol tut dasselbe. Startet die App noch, erscheint die Sprechblase „seowatcher açılıyor“ (seowatcher startet); sobald sie bereit ist, öffnet sich der Browser von selbst.
- Statuszeile: „Çalışıyor: http://127.0.0.1:3001/“ (Läuft: http://127.0.0.1:3001/), „Veritabanı güncelleniyor“ (Datenbank wird aktualisiert) oder ein Fehlertext. Sie ist nicht anklickbar. Ist der Text lang, sehen Sie ihn vollständig, wenn Sie die Maus darüber halten.
- **Eksik Windows bileşenini kur** (Fehlende Windows-Komponente installieren): erscheint nur, wenn das Visual-C++-Paket fehlt. Ein Klick installiert das Paket und startet die App neu.
- **Güncelle** (Aktualisieren): steht immer im Menü. Ein Klick prüft sofort auf GitHub. Gibt es eine neue Version, wird sie heruntergeladen und installiert, sonst erscheint „Güncel“ (Aktuell). Beim Prüfen lautet der Eintrag „Wird geprüft …“, beim Herunterladen „Güncelleme indiriliyor: X.Y.Z (%45)“ (Update wird heruntergeladen: X.Y.Z (45 %)); dann ist er nicht anklickbar. Wurde bereits eine neue Version gefunden, lautet der Eintrag „Güncelle: X.Y.Z sürümü hazır“ (Aktualisieren: Version X.Y.Z ist bereit); die Versionsnummern sind Beispiele.
- **Yeniden başlat** (Neu starten): schließt die App und öffnet sie wieder. Wenn etwas hängt, versuchen Sie zuerst diesen Eintrag.
- **Windows açılınca başlat** (Mit Windows starten): ist der Eintrag angekreuzt, startet die App beim Einschalten des Computers im Hintergrund. Hat ein Administrator diese Einstellung bei einer Installation für alle Benutzer des Computers aktiviert, ist der Eintrag angekreuzt und grau; nur ein Administrator kann ihn ausschalten.
- **Güncellemeleri kendiliğinden kur** (Updates automatisch installieren): ist der Eintrag angekreuzt, installiert die App eine neue Version selbst, sobald sie eine findet.
- **Kurulumu onar** (Installation reparieren): löscht temporäre Dateien, prüft, ob das Paket vollständig ist, und öffnet die App neu. Während der Reparatur lautet der Eintrag „Onarılıyor…“ (Wird repariert…).
- **Tanı bilgisini kopyala** (Diagnoseinformationen kopieren): kopiert die Windows-Version, den Prozessor, die Visual-C++-Version, einen Testlauf des Programmkerns, das fehlerhafte Modul aus dem Windows-Ereignisprotokoll, Absturzabbilder und die letzten Protokollzeilen in die Zwischenablage. Die Angaben sind nach einigen Sekunden bereit, dann erscheint die Sprechblase „Kopiert“. Das hilft Ihnen beim Melden eines Problems.
- **Sorunu bildir (GitHub)** (Problem melden (GitHub)): legt dieselben Angaben in die Zwischenablage und öffnet auf GitHub einen vorausgefüllten Fehlerbericht. Ergänzen Sie in einem Satz, was Sie getan haben, und senden Sie ihn ab.
- **Günlükleri aç** (Protokolle öffnen): öffnet den Ordner mit den Protokolldateien. Darin liegen `launcher.log`, `server.log` und `migrate.log`.
- **Veri klasörünü aç** (Datenordner öffnen): öffnet den Ordner mit der Datenbank und den Schlüsseln.
- Versionsnummer: die installierte Version. Nicht anklickbar.
- **Çıkış** (Beenden): schließt die App vollständig. Solange sie geschlossen ist, funktioniert die Seite im Browser nicht.

Starten Sie die App ein zweites Mal (über das Startmenü oder die Desktop-Verknüpfung), öffnet sich keine neue Kopie. Die bereits laufende App öffnet die Seite im Browser; ist sie noch nicht bereit, öffnet sie die Seite, sobald sie bereit ist.

Beendet sich der Server im laufenden Betrieb von selbst, startet die App ihn neu und zeigt die Sprechblase „seowatcher yeniden başlatılıyor“ (seowatcher wird neu gestartet). Beendet er sich dreimal innerhalb von zehn Minuten, gibt die App das Neustarten auf und schreibt in die Statuszeile „Sunucu 10 dakikada üç kez kapandı“ (Der Server wurde in 10 Minuten dreimal beendet). Wählen Sie dann **Kurulumu onar**.

### Update

Die App aktualisiert sich selbst: Zwei Minuten nach dem Start und danach einmal pro Tag prüft sie auf GitHub, ob es eine neuere Version gibt. Findet sie eine, lädt sie diese herunter, vergleicht den Fingerabdruck der Datei (SHA-256) mit dem Wert auf der Versionsseite, installiert sie im Hintergrund und startet neu. Der Text am Symbol lautet dabei „Güncelleme indiriliyor“ (Update wird heruntergeladen) und „Güncelleme kuruluyor“ (Update wird installiert); kurz erscheint ein kleines Installationsfenster. Startet die App wieder, erscheint die Sprechblase „seowatcher X.Y.Z sürümüne güncellendi“ (seowatcher wurde auf Version X.Y.Z aktualisiert); ein Klick darauf öffnet die Liste der Neuerungen. Auch der Bereich **Einstellungen → Info** in der App zeigt die neue Version an und verweist auf **Güncelle** am Symbol.

- Soll die App nicht selbst installieren, entfernen Sie im Menü das Häkchen bei **Güncellemeleri kendiliğinden kur**. Erscheint dann eine neue Version, sehen Sie einmal eine Sprechblase, und der Menüeintrag lautet „Güncelle: X.Y.Z sürümü hazır“ (Aktualisieren: Version X.Y.Z ist bereit). Klicken Sie zum Installieren auf die Sprechblase oder den Eintrag.
- Gibt es keine Internetverbindung oder antwortet GitHub gerade nicht, versucht es die App nach einer Stunde erneut. Bei automatischen Versuchen warnt sie pro Version nur einmal.
- Stimmt der Fingerabdruck der heruntergeladenen Datei nicht, wird das Update nicht installiert, und die installierte Version läuft weiter.
- Bei einer Installation für alle Benutzer des Computers braucht das Update Administratorrechte. Deshalb installiert die App dort nicht automatisch. Erscheint eine neue Version, sehen Sie eine Sprechblase; ein Klick darauf lässt Windows nach der Administratorerlaubnis fragen.
- Für ein manuelles Update laden Sie die neue Installationsdatei von derselben Adresse herunter und führen sie aus. Der Assistent schließt die laufende App selbst, ersetzt die Dateien und startet sie neu. Das Kontrollkästchen **Windows açılınca seowatcher'ı başlat** (seowatcher mit Windows starten) im Assistenten zeigt Ihre aktuelle Einstellung aus dem Menü.

Daten, Google-Verbindung und Einstellungen bleiben erhalten. Ein automatisches Update lässt die Einstellung **Windows açılınca başlat** unberührt.

### Verteilung im Unternehmen

Hinweise für IT-Teams, die für alle Benutzer eines Computers oder mit einem Verteilungswerkzeug (Intune, GPO, PDQ) unbeaufsichtigt installieren:

- **Für alle Benutzer**: Führen Sie die Installationsdatei als Administrator aus und wählen Sie im Assistenten die Option „alle Benutzer“. Die App wird unter `C:\Program Files\seowatcher` installiert (bei der Installation für einen einzelnen Benutzer ist der Ordner `%LOCALAPPDATA%\Programs\seowatcher`); die Daten jedes Benutzers bleiben weiterhin in dessen eigenem Ordner `%LOCALAPPDATA%\seowatcher`.
- **Stille Installation**: `seowatcher-setup.exe /VERYSILENT /NORESTART` (ein Benutzer) oder `seowatcher-setup.exe /VERYSILENT /ALLUSERS /NORESTART` (Administrator, alle Benutzer). Nach der stillen Installation startet die App von selbst.
- **Installationsprotokoll**: Jede Installation schreibt in die Datei `%LOCALAPPDATA%\seowatcher\logs\setup.log`. Mit `/LOG="yol"` (yol = Pfad) geben Sie einen anderen Ort an.
- **Stille Deinstallation**: `unins000.exe /VERYSILENT` (im Installationsordner: `%LOCALAPPDATA%\Programs\seowatcher`, bei der Installation für alle Benutzer `C:\Program Files\seowatcher`).
- **Prüfung**: Vor der Veröffentlichung wird jede Version auf einem sauberen Windows-Rechner installiert und gestartet. Sobald die Statusadresse (health) antwortet, wird sie wieder deinstalliert. Besteht eine Version diese Prüfung nicht, wird sie nicht veröffentlicht.

### Reparieren

Wenn etwas hängt, klicken Sie mit der rechten Maustaste auf das Symbol und wählen Sie **Kurulumu onar** (Installation reparieren); ist das Symbol nicht zu sehen, klicken Sie in der Taskleiste auf den Pfeil ^. Die App löscht temporäre Dateien und prüft, ob das Paket vollständig ist. Beim anschließenden Start führt sie das Datenbank-Update erneut aus.

Wurde eine Datei aus dem Paket gelöscht (zum Beispiel, weil ein Virenschutzprogramm sie in Quarantäne verschoben hat), lädt die App die Installationsdatei der installierten Version von GitHub herunter, prüft den Fingerabdruck und installiert sich neu. Ihre Daten bleiben unberührt. Gibt es keine Internetverbindung, meldet sie „Kurulum eksik“ (Installation unvollständig) und öffnet die Versionsseite; laden Sie dann die Installationsdatei herunter und führen Sie sie aus.

### Deinstallation

1. Suchen Sie in Windows unter **Einstellungen → Apps → Installierte Apps** den Eintrag **seowatcher**.
2. Klicken Sie auf **Deinstallieren**.

Das Deinstallationsprogramm entfernt das Programm, die Verknüpfung im Startmenü und den Eintrag „Mit Windows starten“ (auch wenn Sie ihn über das Menü eingeschaltet haben) und heruntergeladene Update-Dateien. Den Datenordner lässt es unberührt; das Deinstallationsfenster sagt das ebenfalls. Möchten Sie auch Datenbank, Google-Verbindung und Berichte löschen, löschen Sie den Datenordner selbst.

### Wo liegen die Daten, und wie sichere ich sie?

Alles liegt in einem einzigen Ordner: `%LOCALAPPDATA%\seowatcher`. Geben Sie diesen Pfad in die Adresszeile des Datei-Explorers ein; auch der Menüeintrag **Veri klasörünü aç** (Datenordner öffnen) führt dorthin. Darin liegen:

- `data`: die Datenbank (Projekte, Search-Console-Archiv, Audits, Berichte).
- `instance-secret`: der Schlüssel, der die Google-Zugangsschlüssel verschlüsselt. Geht er verloren, müssen Sie die Google-Verbindungen neu einrichten.
- `mcp-token`: das Passwort, mit dem sich Ihr KI-Assistent mit der App verbindet.
- `server.env`, `config.json`, `logs`.

So sichern Sie die Daten:

1. Schließen Sie die App mit **Çıkış** (Beenden).
2. Kopieren Sie den ganzen Ordner.

Zum Wiederherstellen schließen Sie die App, legen den Ordner an seinen Platz zurück und starten die App erneut. Der Umzug auf einen anderen Computer funktioniert genauso. Kopieren Sie `instance-secret` mit, bleiben die Google-Verbindungen erhalten.

### Portnummer ändern

Die App verwendet die Nummer 3001. Belegt ein anderes Programm diese Nummer, wählt die App die erste freie zwischen 3002 und 3010, aber nur für diesen einen Start, und zeigt die Sprechblase „3001 numarası dolu, 3002 kullanılıyor“ (Port 3001 ist belegt, 3002 wird verwendet). Die Nummer wird nicht gespeichert. Sobald 3001 wieder frei ist, verwendet die App beim nächsten Start wieder 3001, weil die Weiterleitungsadressen bei Google diese Nummer enthalten.

Wenn Sie eine bestimmte Nummer möchten:

1. Schließen Sie die App.
2. Öffnen Sie die Datei `config.json` im Datenordner mit dem Editor (Notepad).
3. Schreiben Sie Folgendes hinein:

```json
{
  "port": 3005
}
```

4. Speichern Sie die Datei und starten Sie die App. Stehen in der Datei weitere Zeilen (zum Beispiel `autoUpdate`), löschen Sie diese nicht; ändern Sie nur den Wert von `port`.

Ändert sich die Nummer, tragen Sie sie auch in den beiden Weiterleitungsadressen bei Google ein. Die Adressen stehen in der Anleitung zur Google-Verbindung.

## Kontrolle

- Fahren Sie mit der Maus über das Symbol in der Taskleiste. Es sollte „seowatcher X.Y.Z: Çalışıyor: http://127.0.0.1:3001/“ (seowatcher X.Y.Z: Läuft: http://127.0.0.1:3001/) erscheinen. Die Zahl am Anfang ist Ihre installierte Version; 0.5.0 Alpha ist nur ein Beispiel.
- Im Browser sollte die Adresse `http://127.0.0.1:3001/api/health` einen Text anzeigen, der mit "status":"ok" beginnt.
- Auf dem Bildschirm **Hilfe** sollte die Karte „Status Ihrer Installation“ „Alles ist in Ordnung.“ anzeigen. Solange Google nicht verbunden ist, ist die Zeile „Google-Anmeldung“ als „braucht Aufmerksamkeit“ markiert. Das ist normal.

## Häufige Fragen

**Warum öffnet sich die App im Browser?** Die App läuft auf Ihrem Computer wie ein kleiner Server, und der Browser dient als ihr Bildschirm.

**Was passiert, wenn ich den Computer ausschalte?** Dann schließt sich auch die App. Ist **Windows açılınca başlat** (Mit Windows starten) angekreuzt, startet sie beim nächsten Einschalten von selbst.

**Kann ich sie von einem anderen Computer aus öffnen?** Nein, das ist Absicht. Die App hört nur auf die Adresse 127.0.0.1. Wollen Sie sie im Internet erreichbar machen, müssen Sie selbst eine Anmeldung davorschalten.

**Kann ich von der Docker-Version wechseln?** Ja, aber die Daten ziehen nicht von selbst um. Sie legen die Projekte neu an und verbinden Google erneut. Das Search-Console-Archiv füllt sich beim ersten Start wieder.

**Mein Virenschutz hat eine Warnung ausgegeben.** Da die Datei nicht signiert ist, warnen manche Virenschutzprogramme. Laden Sie die Datei nur von der GitHub-Seite mit den Versionen herunter und vergleichen Sie die SHA-256-Prüfsumme.

## Wenn etwas nicht klappt

Ist das Symbol nicht zu sehen, klicken Sie in der Taskleiste auf den Pfeil ^.

- **Das Symbol zeigt „Hata: 3001 ve sonraki 9 adres numarası (port) dolu“ (Fehler: 3001 und die nächsten 9 Portnummern sind belegt).** Ein anderes Programm belegt diese Nummern. Tragen Sie in die Datei `config.json` eine andere Nummer ein.
- **Das Symbol zeigt „Veritabanı güncellemesi başarısız“ (Datenbank-Update fehlgeschlagen).** Klicken Sie auf **Günlükleri aç** (Protokolle öffnen) und sehen Sie sich die letzten Zeilen von `migrate.log` an. Meist ist die Festplatte voll oder der Ordner schreibgeschützt.
- **Das Symbol zeigt „Sunucu beklenmedik şekilde kapandı“ (Der Server wurde unerwartet beendet) oder „Sunucu 10 dakikada üç kez kapandı“ (Der Server wurde in 10 Minuten dreimal beendet).** Die letzten Zeilen von `server.log` nennen den Grund. Versuchen Sie **Yeniden başlat** (Neu starten), und wenn das nicht hilft, **Kurulumu onar** (Installation reparieren). Hilft auch das nicht, wählen Sie **Sorunu bildir (GitHub)** (Problem melden (GitHub)).
- **Das Symbol zeigt „Veritabanı güncellemesi 15 dakikada bitmedi“ (Das Datenbank-Update war nach 15 Minuten nicht fertig).** Möglicherweise sperrt ein anderes Programm die Datenbankdatei (ein Backup- oder Synchronisierungsprogramm). Beenden Sie dieses Programm und wählen Sie **Yeniden başlat**.
- **Der Browser hat sich nicht geöffnet.** Doppelklicken Sie auf das Symbol oder tippen Sie die Adresse von Hand ein: `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->

## Windows-Benachrichtigungen

Klicken Sie mit der rechten Maustaste auf das seowatcher-Symbol im Infobereich und wählen Sie **Windows bildirimleri** (standardmäßig aktiv). Solange der Starter läuft, erscheinen abgeschlossene oder fehlgeschlagene Prüfungen aller Projekte und neue Ankündigungen nach etwa 90 Sekunden als Windows-Sprechblase, auch bei geschlossenem Browser oder im Hintergrund. Ein Klick öffnet die zugehörige Seite; mehrere Ereignisse werden zusammengefasst. Der erste Start überspringt alte Ereignisse; ein Neustart wiederholt erfasste Ereignisse nicht. Bei ausgeschalteten Meldungen empfangene Ereignisse werden nicht nachgeholt. Neue Versionen folgen weiterhin der Update-Einstellung. Der Windows-Fokusmodus kann Meldungen ausblenden. Bei geschlossenem Starter erscheinen keine Meldungen. Diese Funktion ist in Docker nicht verfügbar.
