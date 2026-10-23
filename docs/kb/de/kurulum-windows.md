---
title: Installation unter Windows
description: Sie installieren seowatcher mit einer einzigen Datei, Docker oder ein Terminal brauchen Sie nicht. Update, Deinstallation, Sicherung und Änderung der Portnummer stehen auf derselben Seite.
kind: nasil-yapilir
updated: 2026-10-22
---

Die Oberfläche der App ist auf Türkisch. Diese Anleitung nennt jede Schaltfläche und jeden Bildschirmnamen auf Türkisch, mit der deutschen Bedeutung in Klammern.

Am Ende ist die App auf Ihrem Computer installiert und im Browser geöffnet. Die Installation dauert zwei Minuten. Sie wird nur für Ihr eigenes Benutzerkonto eingerichtet und braucht keine Administratorrechte. Fehlt die Komponente Visual C++, werden Sie einmal um Erlaubnis gefragt.

## Voraussetzungen

- Windows 10 oder 11 (64 Bit).
- Etwa 350 MB freier Speicherplatz. Die Installationsdatei ist 81 MB groß, installiert belegt die App 290 MB.
- Ein Browser wie Edge, Chrome oder Firefox.
- Sie brauchen weder Docker noch Node noch ein Terminal (Eingabeaufforderung). Auch Administratorrechte sind nicht nötig; nur wenn die Komponente Visual C++ fehlt, werden Sie einmal gefragt.
- Der Motor der App benötigt das Visual-C++-Paket von Microsoft. Fehlt es auf dem Computer, installiert das Setup es selbst und fragt einmal nach der Administratorerlaubnis. Die App wird in den Ordner `%LOCALAPPDATA%\Programs\seowatcher` installiert.

## Schritte

### Erstinstallation

1. Laden Sie die Datei **seowatcher-setup.exe** von der GitHub-Seite mit den Versionen herunter. Die feste Adresse lautet: `github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
2. Doppelklicken Sie auf die Datei.
3. Meldet Windows „Der Computer wurde durch Windows geschützt“, klicken Sie auf **Daha fazla bilgi** (Weitere Informationen) und dann auf **Yine de çalıştır** (Trotzdem ausführen). Die Datei ist noch nicht signiert, daher kennt Windows den Herausgeber nicht. Diese Warnung ist normal.
4. Wenn Sie möchten, vergleichen Sie die SHA-256-Prüfsumme der Datei (ihren Fingerabdruck) mit der Datei `SHA256SUMS.txt` auf der Versionsseite.
5. Klicken Sie auf der Willkommensseite auf **Sonraki** (Weiter).
6. Bei der Frage „Für wen soll installiert werden?“ wählen Sie **Yalnızca ben** (Nur für mich). Das ist die empfohlene Wahl, die Installation gilt dann nur für Ihr Konto. Die Option **Tüm kullanıcılar** (Alle Benutzer) verlangt Administratorrechte.
7. Sehen Sie sich die beiden Optionen an: **Windows açılınca seowatcher'ı başlat** (seowatcher mit Windows starten) und **Masaüstüne kısayol ekle** (Verknüpfung auf dem Desktop anlegen). Die erste ist vorausgewählt. Wenn die App nicht im Hintergrund starten soll, entfernen Sie das Häkchen. Klicken Sie dann auf **Sonraki** (Weiter).
8. Klicken Sie auf **Kur** (Installieren).
9. Auf der letzten Seite finden Sie das Kästchen **seowatcher'ı şimdi başlat** (seowatcher jetzt starten). Lassen Sie es angekreuzt und klicken Sie auf **Bitti** (Fertig). Die App öffnet sich.
10. Warten Sie. Der erste Start dauert 20 bis 30 Sekunden. Der Text am Symbol in der Taskleiste wechselt nacheinander zu „Anahtarlar hazırlanıyor“ (Schlüssel werden vorbereitet), „Veritabanı güncelleniyor“ (Datenbank wird aktualisiert) und „Sunucu başlatılıyor“ (Server wird gestartet). Ist das Symbol nicht zu sehen, klicken Sie in der Taskleiste auf den Pfeil ^. Sobald alles bereit ist, öffnet sich Ihr Browser von selbst. Startet die App automatisch mit Windows, öffnet sich der Browser nicht; stattdessen erscheint die Sprechblase „seowatcher hazır“ (seowatcher ist bereit).
11. Im Browser öffnet sich `http://127.0.0.1:3001` von selbst. 127.0.0.1 ist die Adresse Ihres eigenen Computers, 3001 ist die Portnummer (Port).

Der nächste Schritt ist die Anleitung zur Google-Verbindung.

### Menü in der Taskleiste

Klicken Sie mit der rechten Maustaste auf das Symbol. Ist es nicht zu sehen, klicken Sie in der Taskleiste auf den Pfeil ^. Das Menü enthält diese Einträge:

- **seowatcher'ı aç** (seowatcher öffnen): öffnet die App im Browser. Ein Doppelklick auf das Symbol tut dasselbe.
- **Yeniden başlat** (Neu starten): schließt die App und öffnet sie wieder. Wenn etwas hängt, versuchen Sie zuerst das.
- **Günlükleri aç** (Protokolle öffnen): öffnet den Ordner mit den Protokolldateien. Darin liegen `launcher.log`, `server.log` und `migrate.log`.
- **Tanı bilgisini kopyala** (Diagnoseinformationen kopieren): kopiert die Windows-Version, den Prozessor, die Visual-C++-Version, einen Probelauf des Motors, das fehlerhafte Modul aus dem Windows-Ereignisprotokoll, Absturzabbilder und die letzten Protokollzeilen in die Zwischenablage.
- **Sorunu bildir (GitHub)** (Problem melden (GitHub)): legt dieselben Angaben in die Zwischenablage und öffnet auf GitHub einen vorausgefüllten Fehlerbericht. Ergänzen Sie in einem Satz, was Sie getan haben, und senden Sie ihn ab.
- **Eksik Windows bileşenini kur** (Fehlende Windows-Komponente installieren): erscheint nur, wenn das Visual-C++-Paket fehlt. Ein Klick installiert das Paket und startet die App neu.
- **Kurulumu onar** (Installation reparieren): löscht temporäre Dateien, prüft das Paket und öffnet die App neu.
- **Güncelle** (Aktualisieren): steht immer im Menü. Ein Klick prüft sofort GitHub; gibt es eine neue Version, wird sie heruntergeladen und installiert, sonst erscheint „Güncel“ (Aktuell). Wurde bereits eine neue Version gefunden und ist sie bereit, lautet der Eintrag „Güncelle: X.Y.Z sürümü hazır“ (Aktualisieren: Version X.Y.Z ist bereit); die Versionsnummer ist ein Beispiel.
- **Güncellemeleri kendiliğinden kur** (Updates automatisch installieren): Ist der Eintrag angekreuzt, installiert die App eine neue Version selbst, sobald sie eine findet.
- **Veri klasörünü aç** (Datenordner öffnen): öffnet den Ordner mit der Datenbank und den Schlüsseln.
- **Windows açılınca başlat** (Mit Windows starten): Ist der Eintrag angekreuzt, startet die App beim Einschalten des Computers im Hintergrund.
- **Çıkış** (Beenden): schließt die App vollständig. Solange sie geschlossen ist, funktioniert die Seite im Browser nicht.

Im Menü sehen Sie außerdem eine Statuszeile („Çalışıyor: http://127.0.0.1:3001/“ (Läuft: http://127.0.0.1:3001/) oder einen Fehlertext) und die Versionsnummer.

Starten Sie die App ein zweites Mal, öffnet sich keine neue Kopie. Es öffnet sich nur die Seite im Browser.

### Update

Die App aktualisiert sich selbst. Zwei Minuten nach dem Start und danach einmal pro Tag prüft sie auf GitHub, ob es eine neuere Version gibt. Gibt es eine, lädt sie sie herunter, vergleicht den Fingerabdruck der Datei (SHA-256) mit dem Wert auf der Versionsseite, installiert sie dann im Hintergrund und startet neu. Der Text am Symbol lautet dabei „Güncelleme indiriliyor“ (Update wird heruntergeladen) und „Güncelleme kuruluyor“ (Update wird installiert). Auch der Bereich **Ayarlar → Hakkında** (Einstellungen → Über) in der App weist auf die neue Version hin und verweist Sie auf **Güncelle** am Symbol.

- Soll die App nicht selbst installieren, entfernen Sie im Menü das Häkchen bei **Güncellemeleri kendiliğinden kur**. Erscheint dann eine neue Version, sehen Sie eine Sprechblase, und im Menü taucht der Eintrag **Güncelle** auf.
- Für ein manuelles Update laden Sie die neue Installationsdatei von derselben Adresse herunter und führen sie aus. Der Assistent schließt die laufende App selbst, ersetzt die Dateien und startet sie neu.

Ihre Daten, Ihre Google-Verbindung und Ihre Einstellungen bleiben unverändert.

### Verteilung im Unternehmen

Hinweise für IT-Teams, die für alle Benutzer eines Computers installieren oder mit einem Verteilungswerkzeug (Intune, GPO, PDQ) im Hintergrund installieren möchten:

- **Für alle Benutzer**: Führen Sie die Installationsdatei als Administrator aus und wählen Sie im Assistenten die Option „alle Benutzer“. Die App wird unter `C:\Program Files\seowatcher` installiert (bei der Installation für einen einzelnen Benutzer ist der Ordner `%LOCALAPPDATA%\Programs\seowatcher`); die Daten jedes Benutzers bleiben weiterhin in dessen eigenem Ordner `%LOCALAPPDATA%\seowatcher`.
- **Stille Installation**: `seowatcher-setup.exe /VERYSILENT /NORESTART` (ein Benutzer) oder `seowatcher-setup.exe /VERYSILENT /ALLUSERS /NORESTART` (Administrator, alle Benutzer). Ist die stille Installation fertig, öffnet sich die App von selbst.
- **Installationsprotokoll**: Jede Installation schreibt in die Datei `%LOCALAPPDATA%\seowatcher\logs\setup.log`. Mit `/LOG="yol"` können Sie einen anderen Ort angeben.
- **Stille Deinstallation**: `unins000.exe /VERYSILENT` (im Installationsordner: `%LOCALAPPDATA%\Programs\seowatcher`, bei der Installation für alle Benutzer `C:\Program Files\seowatcher`).
- **Prüfung**: Vor der Veröffentlichung wird jede Version auf einem sauberen Windows-Rechner installiert, geöffnet, so lange beobachtet, bis die Statusadresse (health) antwortet, und wieder deinstalliert. Eine Version, die diese Prüfung nicht besteht, wird nicht veröffentlicht.

### Reparieren

Wenn etwas hängt, klicken Sie mit der rechten Maustaste auf das Symbol und wählen Sie **Kurulumu onar** (Installation reparieren); ist das Symbol nicht zu sehen, klicken Sie in der Taskleiste auf den Pfeil ^. Die App löscht temporäre Dateien, prüft, ob das Paket vollständig ist, prüft die Datenbank erneut und öffnet sich. Fehlt eine Datei, sagt sie es Ihnen und öffnet die Versionsseite. Dann genügt es, die Installationsdatei erneut auszuführen.

### Deinstallation

1. Suchen Sie in Windows unter **Ayarlar → Uygulamalar → Yüklü uygulamalar** (Einstellungen → Apps → Installierte Apps) den Eintrag **seowatcher**.
2. Klicken Sie auf **Kaldır** (Deinstallieren).

Das Deinstallationsprogramm entfernt das Programm, die Verknüpfung im Startmenü und den Eintrag „Mit Windows starten“. Den Datenordner lässt es unberührt. Wenn Sie auch Ihre Datenbank, Ihre Google-Verbindung und Ihre Berichte löschen möchten, löschen Sie den Datenordner selbst.

### Wo liegen die Daten, und wie sichere ich sie?

Alles liegt in einem einzigen Ordner: `%LOCALAPPDATA%\seowatcher`. Tippen Sie diesen Text in die Adresszeile des Datei-Explorers. Das Menü **Veri klasörünü aç** (Datenordner öffnen) führt ebenfalls dorthin. Darin liegen:

- `data`: die Datenbank (Projekte, Search-Console-Archiv, Prüfungen, Berichte).
- `instance-secret`: der Schlüssel, der die Google-Zugangsschlüssel verschlüsselt. Geht er verloren, müssen Sie die Google-Verbindungen von Grund auf neu einrichten.
- `mcp-token`: das Passwort, mit dem sich Ihr KI-Assistent mit der App verbindet.
- `server.env`, `config.json`, `logs`.

So sichern Sie die Daten:

1. Schließen Sie die App mit **Çıkış** (Beenden).
2. Kopieren Sie den ganzen Ordner.

Zum Wiederherstellen schließen Sie die App, legen den Ordner an seinen Platz zurück und starten die App. Der Umzug auf einen anderen Computer läuft genauso. Nehmen Sie auch die Datei `instance-secret` mit, funktionieren die Google-Verbindungen weiter.

### Portnummer ändern

Die App verwendet die Nummer 3001. Belegt ein anderes Programm sie, wählt die App die erste freie Nummer zwischen 3002 und 3010. Die gewählte Nummer schreibt sie in die Datei `config.json`.

Wenn Sie eine bestimmte Nummer möchten:

1. Schließen Sie die App.
2. Öffnen Sie die Datei `config.json` im Datenordner mit dem Editor (Notepad).
3. Schreiben Sie Folgendes hinein:

```json
{
  "port": 3005
}
```

4. Speichern Sie die Datei und starten Sie die App.

Ändert sich die Nummer, aktualisieren Sie auch die beiden Weiterleitungsadressen bei Google mit der neuen Nummer. Diese Adressen sind in der Anleitung zur Google-Verbindung beschrieben.

## Kontrolle

- Fahren Sie mit der Maus über das Symbol in der Taskleiste. Es sollte „seowatcher X.Y.Z: Çalışıyor: http://127.0.0.1:3001/“ (seowatcher X.Y.Z: Läuft: http://127.0.0.1:3001/) erscheinen. Die Versionsnummer am Anfang ist die Version, die Sie installiert haben. 2.3.7 ist ein Beispiel.
- Im Browser sollte die Adresse `http://127.0.0.1:3001/api/health` einen Text anzeigen, der mit "status":"ok" beginnt.
- Auf dem Bildschirm **Yardım** (Hilfe) sollte die Karte „Kurulumunuzun durumu“ (Zustand Ihrer Installation) „Her şey yolunda.“ (Alles in Ordnung.) anzeigen. Bevor Google verbunden ist, verlangt die Zeile „Google girişi“ (Google-Anmeldung) Aufmerksamkeit. Das ist normal.

## Häufige Fragen

**Warum öffnet sich die App im Browser?** Die App läuft auf Ihrem Computer wie ein kleiner Server. Der Browser ist ihr Bildschirm.

**Was passiert, wenn ich den Computer ausschalte?** Dann schließt sich auch die App. Ist „Windows ile başlat“ (Mit Windows starten) angekreuzt, startet sie beim nächsten Einschalten von selbst.

**Kann ich sie von einem anderen Computer aus öffnen?** Nein, das ist Absicht. Die App hört nur auf die Adresse 127.0.0.1. Wollen Sie sie ins Internet öffnen, müssen Sie eine eigene Anmeldung davorsetzen.

**Kann ich von der Docker-Version wechseln?** Ja, aber die Daten ziehen nicht von selbst um. Sie legen die Projekte neu an und verbinden Google neu. Das Search-Console-Archiv füllt sich beim ersten Start wieder.

**Mein Virenschutz hat eine Warnung ausgegeben.** Weil die Datei nicht signiert ist, warnen manche Virenschutzprogramme. Laden Sie die Datei nur von der GitHub-Seite mit den Versionen herunter und vergleichen Sie die SHA-256-Prüfsumme.

## Wenn etwas nicht klappt

Ist das Symbol nicht zu sehen, klicken Sie in der Taskleiste auf den Pfeil ^.

- **Das Symbol zeigt „Hata: 3001 ve sonraki 9 adres numarası (port) dolu“ (Fehler: 3001 und die nächsten 9 Portnummern sind belegt).** Ein anderes Programm belegt diese Nummern. Tragen Sie in die Datei `config.json` eine andere Nummer ein.
- **Das Symbol zeigt „Veritabanı güncellemesi başarısız“ (Datenbank-Update fehlgeschlagen).** Klicken Sie auf **Günlükleri aç** (Protokolle öffnen) und sehen Sie sich die letzten Zeilen von `migrate.log` an. Meist ist die Festplatte voll, oder der Ordner ist schreibgeschützt.
- **Das Symbol zeigt „Sunucu beklenmedik şekilde kapandı“ (Der Server wurde unerwartet beendet).** Die letzten Zeilen von `server.log` nennen den Grund. Versuchen Sie **Yeniden başlat** (Neu starten). Hilft das nicht, teilen Sie das Protokoll in einem Fehlerbericht auf GitHub.
- **Der Browser hat sich nicht geöffnet.** Doppelklicken Sie auf das Symbol oder tippen Sie die Adresse von Hand ein: `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->
