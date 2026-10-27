---
title: Fehlerbehebung
description: Häufige Probleme mit Symptom, Ursache und Lösung: Port, Windows-Warnung, Google-Fehler, Kontingent, hängendes Audit, leere Diagramme, Assistent 401.
kind: sorun-giderme
updated: 2026-10-27
---

Die Oberfläche der App gibt es in sechs Sprachen: Türkisch, Englisch, Deutsch, Französisch, Italienisch und Portugiesisch. Die Sprache lässt sich unter Einstellungen → Darstellung → Sprache ändern. Diese Anleitung nennt Schaltflächen und Bildschirme so, wie sie in der deutschen Oberfläche heißen. Das Windows-Tray-Menü gibt es nur auf Türkisch. Dort steht der türkische Name mit der deutschen Bedeutung in Klammern.

Wenn etwas nicht funktioniert, sehen Sie zuerst in der App auf dem Bildschirm **Hilfe** auf die Karte „Zustand der App“. Die Karte betrachtet diese Installation selbst und prüft Anmeldung und Zugriff, die Google-Anmeldung, den PageSpeed-Schlüssel und die Datenbank. Sagt sie „N Punkte erfordern Ihre Aufmerksamkeit“, führt Sie die Schaltfläche daneben zur richtigen Einstellung. Die folgenden Probleme sind vom häufigsten zum seltensten geordnet.

## Die Seite öffnet sich nicht

**Symptom:** Der Browser meldet „Verbindung abgelehnt“.

**Ursache:** Die App läuft nicht.

**Lösung:** Sehen Sie unter Windows auf das Symbol in der Taskleiste. Ist es nicht zu sehen, klicken Sie in der Taskleiste auf den Pfeil ^. Fehlt es, öffnen Sie seowatcher über das Startmenü. Steht am Symbol „Fehler“, klicken Sie mit der rechten Maustaste darauf und wählen **Yeniden başlat** (Neu starten). Geben Sie bei Docker `docker compose ps` ein. Ist der Status nicht healthy, geben Sie `docker compose up -d` ein.

## Die Portnummer ist belegt

**Symptom:** Unter Windows erscheint oben auf jedem Bildschirm der App ein gelber Streifen: „seowatcher läuft diesmal auf 3002, weil ein anderes Programm 3001 belegt (z. B. eine alte Docker-Kopie). Die Google-Anmeldung ist für 3001 eingerichtet; schließen Sie dieses Programm und starten Sie seowatcher neu.“ Beim Verbinden mit Google kommt ein Fehler. Oder das Symbol meldet „3001 ve sonraki 9 adres numarası (port) dolu“ (3001 und die nächsten 9 Portnummern sind belegt). Derselbe Satz steht in der Karte „Zustand der App“ auf dem Bildschirm **Hilfe**. Bei Docker steht „Bind for 127.0.0.1:3001 failed“.

**Ursache:** Ein anderes Programm verwendet dieselbe Portnummer. Am häufigsten ist es eine alte Docker-Kopie, die Sie einmal gestartet haben. Docker Desktop kann sie beim Start des Computers selbst wieder starten. Die Weiterleitungsadressen von Google nennen 3001, deshalb funktioniert die Google-Anmeldung nicht, solange die App auf 3002 geöffnet ist.

**Lösung:** Das Windows-Paket wählt normalerweise eine freie Nummer zwischen 3002 und 3010, nennt sie in einer Sprechblase und im Streifen oben und nutzt sie nur für diesen einen Start. Schließen Sie zuerst das Programm, das 3001 belegt. Ist es eine alte Docker-Kopie, stoppen Sie den Container seotracker in Docker Desktop oder führen Sie im Projektordner `docker compose stop` aus. Wählen Sie dann im Menü **Yeniden başlat** (Neu starten). Die App kehrt zu 3001 zurück und der Streifen verschwindet. Den Streifen zu schließen, blendet ihn nur für diesen Reiter aus und behebt nichts. Sind alle belegt, schreiben Sie eine andere Nummer in die Datei `config.json` im Datenordner. Legen Sie bei Docker eine `.env` mit der Zeile `PORT=3002` an und geben Sie `docker compose up -d --force-recreate seotracker` ein. Ändert sich die Nummer, aktualisieren Sie auch die Weiterleitungsadressen bei Google.

## Das Symbol meldet „Windows bileşeni eksik“

**Symptom:** Die App öffnet sich nicht. Am Symbol steht „Windows bileşeni eksik“ (Windows-Komponente fehlt), oder im Protokoll stehen „Workers runtime failed to start“ und „0xc0000005“.

**Ursache:** Die App benötigt das Visual-C++-Paket von Microsoft (2015-2022, 64 Bit). Auf einem frisch installierten Windows fehlt dieses Paket oder ist veraltet.

**Lösung:** Klicken Sie auf die erscheinende Sprechblase oder klicken Sie mit der rechten Maustaste auf das Symbol und wählen Sie **Eksik Windows bileşenini kur** (Fehlende Windows-Komponente installieren). Windows fragt einmal nach der Administratorerlaubnis. Nach der Installation startet die App von selbst neu. Haben Sie das Paket nicht, laden Sie es von der Seite von Microsoft herunter: `https://aka.ms/vs/17/release/vc_redist.x64.exe`

## Die Administratorerlaubnis wurde nicht erteilt

**Symptom:** Bei der Installation wurde für Visual C++ um Erlaubnis gebeten, Sie haben **Nein** gewählt. Die Installation meldete „Microsoft Visual C++ çalışma zamanı kurulamadı“ (Die Microsoft-Visual-C++-Laufzeit konnte nicht installiert werden).

**Ursache:** Die benötigte Windows-Komponente konnte nicht installiert werden. Da die App eine Kopie der nötigen Dateien mitbringt, startet sie auf den meisten Computern trotzdem.

**Lösung:** Ist die App gestartet, müssen Sie nichts tun. Wenn nicht, klicken Sie mit der rechten Maustaste auf das Symbol in der Taskleiste (ist es nicht zu sehen, klicken Sie auf den Pfeil ^). Wählen Sie **Eksik Windows bileşenini kur** und erlauben Sie es diesmal. Oder laden Sie die Komponente von `https://aka.ms/vs/17/release/vc_redist.x64.exe` herunter und installieren Sie sie.

## Das Symbol meldet „Uygulamanın motoru çöktü“ (Der Programmkern ist abgestürzt)

**Symptom:** Die App öffnet sich nicht. Im Protokoll stehen „Workers runtime failed to start“ und „0xc0000005“, aber das Visual-C++-Paket ist installiert.

**Ursache:** Der Programmkern der App (workerd) bleibt auf diesem Computer an einer Systemdatei hängen. Die App testet ihn beim Start einzeln. Sagt sie „Tek başına da başlayamıyor“ (Startet auch allein nicht), liegt das Problem am Computer. Sagt sie „Tek başına çalışıyor“ (Läuft allein), liegt das Problem im Datenordner oder in der Konfiguration.

**Lösung:** Wählen Sie zuerst **Kurulumu onar** (Installation reparieren). Hilft das nicht, klicken Sie mit der rechten Maustaste auf das Symbol und wählen **Sorunu bildir (GitHub)** (Problem melden (GitHub)). Die Diagnoseinformationen (Windows-Version, Prozessor, Name des fehlerhaften Moduls, Absturzabbild) werden automatisch an die Meldung angehängt, Sie müssen sie nur absenden. Die Absturzabbilder liegen im Ordner `%LOCALAPPDATA%\seowatcher\logs\dumps`. Wenn Sie möchten, hängen Sie sie auch an die Meldung an.

## Windows meldet „Der Computer wurde durch Windows geschützt“

**Symptom:** Die Installationsdatei öffnet sich nicht, es erscheint ein blauer Warnbildschirm.

**Ursache:** Die Datei ist nicht signiert. Windows zeigt diesen Bildschirm bei Herausgebern, die es nicht kennt.

**Lösung:** Klicken Sie auf dem Bildschirm auf den Text **Weitere Informationen**. Die Schaltfläche **Trotzdem ausführen** erscheint. Wenn Sie Bedenken haben, vergleichen Sie die SHA-256-Prüfsumme (den Fingerabdruck) der Datei mit `SHA256SUMS.txt` auf der Versionsseite.

## Google meldet „redirect_uri_mismatch“

**Symptom:** Nach einem Klick auf **Verbinden** zeigt Google eine Fehlerseite.

**Ursache:** Die Weiterleitungsadresse in der Google Cloud Console ist nicht Zeichen für Zeichen dieselbe wie in der App.

**Lösung:** Kopieren Sie die beiden Adressen mit der Kopierschaltfläche im Bereich **Einstellungen → Google**. Fügen Sie sie in der Cloud Console in das Adressfeld des Google-Zugangsschlüssels (des OAuth-Clients) ein. Schon localhost statt 127.0.0.1, http statt https oder ein Schrägstrich am Ende lösen den Fehler aus.

## „Google-Zugriffsschlüssel fehlt“

**Symptom:** Der Reiter Verbindungen in den Projekteinstellungen zeigt eine gelbe Warnung.

**Ursache:** Im Bereich **Einstellungen → Google** wurden Client-ID und geheimer Schlüssel nicht eingetragen. Oder bei Docker ist der Verschlüsselungsschlüssel kürzer als 32 Zeichen.

**Lösung:** Führen Sie Schritt 10 und 11 der Anleitung zur Google-Verbindung aus. Haben Sie bei Docker `BETTER_AUTH_SECRET` von Hand angegeben, verlängern Sie den Wert. Lassen Sie ihn leer, erzeugt die App ihn selbst.

## Google meldet „access_denied“

**Symptom:** Nach dem Zustimmungsbildschirm erscheint die Meldung „iptal edildi“ (abgebrochen).

**Ursache:** Das Google-Konto, mit dem Sie sich angemeldet haben, steht nicht in der Liste der Testnutzer auf dem Zustimmungsbildschirm.

**Lösung:** Fügen Sie das Konto in der Cloud Console unter **OAuth-Zustimmungsbildschirm → Testnutzer** hinzu. Klicken Sie dann erneut auf **Verbinden**.

## Die Verbindung ist abgelaufen

**Symptom:** Auf der Karte der Verbindungen steht „Die Verbindung ist abgelaufen“, und es kommen keine Daten.

**Ursache:** Bei Apps im Status „Test“ kann Google die Freigabe schon nach sieben Tagen entziehen. Möglich ist auch, dass sich der Verschlüsselungsschlüssel geändert hat.

**Lösung:** Klicken Sie auf der Karte auf **Erneut verbinden**. Wiederholt sich das oft, stellen Sie den Zustimmungsbildschirm auf Produktion oder wechseln Sie zum Dienstkonto (**Einstellungen → Dienstkonto**).

## Keine Suchanfragedaten, die Diagramme sind leer

**Symptom:** Die Karten im Panel (Übersicht) zeigen null. Suchleistung meldet „Noch keine Daten für diesen Zeitraum“.

**Ursache:** Es gibt drei Möglichkeiten. Die Website ist neu, und Google liefert noch keine Impressionen. Oder die Search Console hat drei Tage Verzögerung, und der gewählte Zeitraum ist zu kurz. Oder es wurde die falsche Property gewählt.

**Lösung:** Stellen Sie den Zeitraum auf **Letzte 3 Monate**. Prüfen Sie in den Projekteinstellungen, ob die Property die richtige Website ist. Eine Domain-Property umfasst alle Subdomains, eine URL-Präfix-Property nicht. Bei einer neuen Website können die Zeilen mit Suchanfragen erst nach Wochen kommen. Die Seitentabelle füllt sich früher.

## Die Tabellensumme stimmt nicht mit der Karte überein

**Symptom:** Addieren Sie die Impressionen in der Seitentabelle, kommt eine größere Zahl heraus als auf der Karte.

**Ursache:** Das ist kein Fehler. Google zählt jede Seite, die bei derselben Suche erscheint, einzeln. Die Karte zeigt die Summe der Website.

**Lösung:** Lesen Sie die Summe von der Karte ab. Lesen Sie die Tabelle Seite für Seite.

## Das Audit hängt bei „In Bearbeitung“

**Symptom:** Seit einer halben Stunde gibt es keinen Fortschritt.

**Ursache:** Die App wurde möglicherweise neu gestartet, oder der Vorgang ist abgebrochen.

**Lösung:** Warten Sie. Die App prüft Audits, die länger als 15 Minuten als „läuft“ erscheinen. Gibt es kein Lebenszeichen, schließt sie das Audit als „Fehlgeschlagen“ ab und nennt den Grund. Klicken Sie dann auf **Erneut mit den gleichen Einstellungen ausführen**. Starten Sie nicht zwei Audits gleichzeitig mit Geschwindigkeitsmessung, weil sie sich gegenseitig bremsen.

## Das Audit meldet „Das Audit wurde vorzeitig beendet“

**Symptom:** Der Audit-Bildschirm meldet „Die Prüfung wurde in der Phase „Crawl“ beendet.“ oder „Das Audit wurde vorzeitig beendet.“ Anstelle der Punktzahl steht „Unvollständiges Audit — kein Score“.

**Ursache:** Der Bildschirm sagt drei Dinge: was passiert ist, ob der Fehler bei Ihrer Website oder bei der App liegt, und was zu tun ist. Der Titel nennt die Phase, in der es endete: URL-Erkennung, Crawl, Geschwindigkeitsmessung oder Ergebnisaufbereitung.

**Lösung:** Folgen Sie dem Satz auf dem Bildschirm.

- **Ein Schritt wurde nicht rechtzeitig fertig.** Meist antwortet die Website sehr langsam. Versuchen Sie es in ein paar Minuten erneut. Tritt es wieder auf, starten Sie mit weniger Seiten.
- **Die Prüfung passte nicht in den Arbeitsspeicher**, **hat die Prozessorzeit überschritten** oder **das Ergebnis eines Schritts war größer, als die App speichern kann.** Sehr große oder komplexe Seiten verursachen das. Starten Sie mit weniger Seiten erneut.
- **Beim Schreiben der Ergebnisse in die Datenbank ist ein Fehler aufgetreten.** Die Festplatte ist womöglich voll oder die Datendatei von einem anderen Programm gesperrt. Prüfen Sie, ob auf der Festplatte Platz ist, starten Sie die App neu und dann das Audit.
- **Die interne Audit-Engine der App hat einen Fehler gemeldet.** Wählen Sie im Tray-Menü **Yeniden başlat** (Neu starten) und starten Sie das Audit neu.
- **Die Prüfung wurde abgebrochen.** Die App wurde möglicherweise mitten in der Prüfung geschlossen oder neu gestartet. Lassen Sie die App geöffnet und starten Sie das Audit neu.
- **Der Installationsschlüssel hat den Teil, der Prüfungen ausführt, nicht erreicht.** Ihre gespeicherten Google- und PageSpeed-Schlüssel wurden nicht gelöscht. Aktualisieren Sie die App oder starten Sie sie neu, dann das Audit neu.
- **Ein unerwarteter Fehler.** Starten Sie das Audit neu. Tritt es wieder auf, laden Sie auf dem Bildschirm **Hilfe** das Diagnosepaket herunter und melden Sie das Problem.

Der rohe Fehlertext gelangt nicht auf den Bildschirm. Er bleibt im Diagnosepaket.

## Das Audit meldet „Vorläufiger Score“

**Symptom:** Neben der Punktzahl steht kein Bewertungswort. Eine Zeile wie „Vorläufiger Score — Messabdeckung 62 %“ ist da.

**Ursache:** Ein großer Teil der Prüfungen konnte nicht gemessen werden (der Anteil gemessener Prüfungen liegt unter 70 Prozent, oder in Crawling, Indizierung, Inhalt oder Geschwindigkeit wurde weniger als die Hälfte gemessen). Die Zeilen unter der Karte nennen die Gründe: Das PageSpeed-Kontingent war aufgebraucht, es gibt keinen PageSpeed-Schlüssel, die Geschwindigkeitsmessung war aus oder aus der Search Console konnten keine Indexdaten geholt werden.

**Lösung:** Schalten Sie die Geschwindigkeitsmessung ein, tragen Sie einen PageSpeed-Schlüssel ein oder verbinden Sie die Search Console, und führen Sie das Audit erneut aus. Die Punktzahl bezieht sich auf das Gemessene. Über den Rest wurde weder gut noch schlecht entschieden.

## Das Audit meldet „Unvollständiges Audit — kein Score“

**Symptom:** Dieser Satz steht dort, wo die Punktzahlkarte wäre. Die Befunde werden darunter trotzdem gezeigt.

**Ursache:** Das Audit wurde mit einem Fehler beendet, läuft noch oder der Crawl wurde wegen der Ratenbegrenzung der Website vorzeitig gestoppt. Die Problemliste ist unvollständig, deshalb wurde keine Punktzahl berechnet. Konnte keine Seite gecrawlt werden, erscheint die Punktzahlkarte gar nicht.

**Lösung:** Lesen Sie den Grund im Abschnitt oben. Führen Sie das Audit erneut aus, wenn die Ratenbegrenzung zurückgesetzt oder das Problem behoben ist. Die Befunde gelten für die gecrawlten Seiten.

## Das Audit ist fertig, meldet aber „die Geschwindigkeitsmessung lief ohne Schlüssel“

**Symptom:** Das Audit ist abgeschlossen. Eine Warnung sagt „Der gespeicherte PageSpeed-Schlüssel konnte nicht gelesen werden; die Geschwindigkeitsmessung lief ohne Schlüssel.“ Der Reiter Geschwindigkeit hat höchstens 50 Seiten.

**Ursache:** Der Teil, der Prüfungen ausführt, hat den Installationsschlüssel, der den gespeicherten Schlüssel öffnet, nicht erhalten, die Geschwindigkeitsmessung lief deshalb ohne ihn. Die Crawl-Ergebnisse sind nicht betroffen.

**Lösung:** Aktualisieren Sie die App oder starten Sie sie neu und starten Sie ein neues Audit. Hält es an, speichern Sie den PageSpeed-Schlüssel unter **Einstellungen** neu.

## Das Audit meldet „Engellendik“ (Wir wurden blockiert)

**Symptom:** Es erscheint eine gelbe Warnung: „Das Audit konnte diese Website nicht vollständig crawlen.“ oder „N sayfada engellendik.“ (Auf N Seiten wurden wir blockiert.)

**Ursache:** Der Bot-Schutz der Website (Cloudflare oder eine Firewall) hat den Crawler der App gestoppt.

**Lösung:** Erlauben Sie in der Firewall den User-Agent namens `seotracker-audit` oder setzen Sie die Netzwerkadresse (IP) Ihres Computers auf die Liste der erlaubten Adressen. Gehört die Website nicht Ihnen, können Sie nichts tun. Die Ergebnisse bleiben auf die Seiten beschränkt, die gecrawlt werden konnten.

## Die Geschwindigkeitsmessung ist unvollständig oder fehlt ganz

**Symptom:** Der Reiter Hız (Geschwindigkeit) ist leer oder hat nur wenige Zeilen. Die Kontingentkarte meldet „Kontingent aufgebraucht“, „Dakikalık sınır“ (Minutengrenze) oder „Anahtar yok“ (Kein Schlüssel).

**Ursache:** Es gibt keinen PageSpeed-Schlüssel (es werden höchstens 50 Seiten gemessen). Oder Googles Tageskontingent ist aufgebraucht.

**Lösung:** Holen Sie sich nach der Anleitung zum PageSpeed-Schlüssel einen kostenlosen Schlüssel. Ist das Tageskontingent aufgebraucht, können Sie die Messung morgen in einem neuen Audit vervollständigen. War die Geschwindigkeitsmessung beim Start des Audits ausgeschaltet, wird sie für dieses Audit nicht nachgeholt.

## URL-Prüfung: „Tagesgrenze erreicht“

**Symptom:** Im Reiter Indexstatus funktioniert die Schaltfläche nicht. Es steht „Google'ın günlük 2.000 adres sınırına ulaşıldı“ (Googles Tagesgrenze von 2.000 Adressen ist erreicht).

**Ursache:** Pro Property gibt es 2.000 Fragen am Tag. Die App, Ihr Assistent und die Abfragen, die Sie in der Search Console von Hand stellen, verbrauchen aus demselben Vorrat.

**Lösung:** Machen Sie morgen weiter. Die App fragt nur veraltete Antworten neu ab, es wird also kein Kontingent verschwendet.

## Die Analytics-Karte oder der Bericht zeigt einen Fehler

**Symptom:** Die Karte Organischer Traffic in der Übersicht oder der Analytics-Bildschirm zeigt statt Daten einen Satz, mit den Schaltflächen **Verbindung reparieren** und **Erneut versuchen**.

**Ursache:** Der Satz nennt Ursache und Lösung. Die wichtigsten Fälle sind:

- **Die Verbindung ist abgelaufen oder widerrufen.** Verbinden Sie sie unter **Einstellungen** neu.
- **Der Zugriff auf diese Property wurde verweigert (HTTP 403).** Geben Sie dem verbundenen Konto oder Dienstkonto mindestens die Rolle Betrachter für die Property.
- **Die Property wurde nicht gefunden (HTTP 404).** Sie wurde womöglich gelöscht oder verschoben. Wählen Sie sie unter **Einstellungen** neu.
- **Mit diesem Projekt ist keine Property verbunden.** Wählen Sie unter **Einstellungen** eine aus.
- **Das Berichtskontingent ist aufgebraucht (HTTP 429).** Das Kontingent erneuert sich stündlich und täglich. Versuchen Sie es später erneut.
- **Die Google Analytics Data API ist im Google-Cloud-Projekt ausgeschaltet.** Schalten Sie in der Google Cloud Console „Google Analytics Data API“ ein und versuchen Sie es erneut.
- **Der Bericht passt nicht zur gewählten Property (HTTP 400).** Prüfen Sie die Property oder wählen Sie eine andere.
- **Google lieferte eine ungültige Antwort oder antwortet vorübergehend nicht.** Versuchen Sie es gleich noch einmal.
- **Google ist nicht erreichbar.** Prüfen Sie die Internetverbindung dieses Computers.

**Lösung:** Tun Sie, was der Satz nennt. Meist führt **Verbindung reparieren** zur richtigen Einstellung.

## Eine Anfrage an die Search Console zeigt einen Fehler

**Symptom:** Suchleistung, Gelegenheiten oder Rangverfolgung zeigen statt Daten einen Fehler der Search Console.

**Ursache:** Der Fehlersatz nennt die Ursache.

- **Die Anfrage wurde als ungültig befunden (HTTP 400).** Das ist kein Verbindungsproblem. Die gewählte Dimension, der Filter oder der Suchtyp lässt sich für diese Property nicht nutzen. Entfernen Sie die Filter.
- **Der Zugriff auf die Property wurde verweigert (HTTP 401 oder 403).** Prüfen Sie, ob das Konto eine bestätigte Berechtigung für die Property hat, oder erneuern Sie die Verbindung unter **Einstellungen**.
- **Die Property wurde nicht gefunden (HTTP 404).** Sie wurde womöglich aus der Search Console entfernt. Wählen Sie sie unter **Einstellungen** neu.
- **Das Anfragelimit ist aufgebraucht (HTTP 429).** Versuchen Sie es in ein paar Minuten erneut.
- **Keine Antwort rechtzeitig.** Versuchen Sie es gleich noch einmal.
- **Antwortet vorübergehend nicht (anderer HTTP-Code).** Versuchen Sie es gleich noch einmal. Hält es an, sehen Sie auf Googles Statusseite nach.
- **Google ist nicht erreichbar.** Der Satz nennt in der Zeile „Grund“ ein Detail. Hält es an, prüfen Sie die Internetverbindung dieses Computers.

**Lösung:** Tun Sie, was der Satz nennt. Bei Konto- und Property-Problemen genügt meist die Erneuerung der Verbindung unter **Einstellungen**.

## In Analytics erscheint Localhost-Traffic

**Symptom:** In der Tabelle der Einstiegsseiten steht in der Spalte Alan adı (Domain) localhost oder 127.0.0.1.

**Ursache:** Auch die Testkopie Ihrer Website lädt dasselbe Analytics-Tag.

**Lösung:** Stellen Sie das Tag so ein, dass es nur auf der echten Domain geladen wird. In den meisten Werkzeugen gibt es dafür die Option „Domainprüfung“. Die App filtert diese Zeilen nicht von selbst heraus. Bis dahin beachten Sie in der Tabelle die Spalte Alan adı.

## Der Assistent kann sich nicht verbinden (401)

**Symptom:** Claude Code oder Codex meldet „Unauthorized“.

**Ursache:** Das Passwort wird nicht gesendet oder ist falsch.

**Lösung:** Kopieren Sie das Passwort erneut. Unter Windows steht es in der Datei `mcp-token` im Datenordner. Geben Sie bei Docker `docker compose exec -T seotracker cat /app/.wrangler/mcp-token` ein. Entfernen Sie den Zeilenumbruch am Ende des Wertes. Möchten Sie kein Terminal benutzen, öffnen Sie die Datei mit dem Editor (Notepad), markieren die ganze Zeile und kopieren sie. Achten Sie darauf, dass kein Zeilenumbruch mitkopiert wird. Geben Sie in Claude Code `/mcp` ein und wählen Sie **Reconnect**.

## Docker braucht beim ersten Start sehr lange oder meldet „unhealthy“

**Symptom:** `docker compose ps` meldet auch nach fünf Minuten nicht healthy.

**Ursache:** Beim ersten Start wird die App im Container gebaut und braucht etwa 2 GB Arbeitsspeicher. Reicht der Arbeitsspeicher nicht, bricht der Bau ab.

**Lösung:** Geben Sie `docker compose logs --tail 50` ein und sehen Sie sich die letzten Zeilen an. Gibt es einen Speicherfehler, geben Sie Docker Desktop in den Einstellungen mehr Arbeitsspeicher. Geben Sie dann `docker compose up -d --build` ein.

## Wo liegen Daten und Protokolle?

Unter Windows liegt alles im Ordner `%LOCALAPPDATA%\seowatcher`: `data` (Datenbank), `logs\launcher.log`, `logs\server.log`, `logs\migrate.log`, `instance-secret`, `mcp-token`, `config.json`. Wird eine Protokolldatei zu groß (`server.log` 5 MB, die übrigen 1 MB), bleibt die alte Datei unter einem Namen wie `server.old.log` daneben liegen, und eine neue beginnt von vorn. Im Ordner `logs\wrangler` liegen die ausführlichen Protokolle des Programmkerns; Dateien, die älter als 30 Tage sind, werden automatisch gelöscht. **Günlükleri aç** (Protokolle öffnen) und **Veri klasörünü aç** (Datenordner öffnen) im Menü der Taskleiste führen dorthin.

Bei Docker liegen die Daten im Datenspeicher `seotracker_data` (`/app/.wrangler`). Die Protokolle sehen Sie mit dem Befehl `docker compose logs -f`.

Klicken Sie bei einer Problemmeldung im Bildschirm **Hilfe** auf **Diagnosepaket herunterladen**. Das Paket enthält Phasen- und Fehlerzusammenfassungen der letzten 25 Audits; Seiten-URLs werden aus PageSpeed-Fehlertexten entfernt. Projektnamen und Domains können enthalten sein. Prüfen Sie die Datei vor dem Anhängen an einen GitHub-Fehlerbericht.

## Eine Windows-Einstellung lässt sich nicht speichern

**Symptom:** Beim Ändern einer Option im Bereich Windows unter **Einstellungen** kommt ein Fehler, oder der Bereich meldet, die Windows-Einstellungen seien nicht erreichbar.

**Ursache:** Dieser Bereich spricht mit der App in der Taskleiste. Der Fehlersatz nennt, welcher dieser Fälle es ist.

- **Die Tray-App hat nicht innerhalb von 4 Sekunden geantwortet.** Kommt der Computer gerade aus dem Ruhezustand, klicken Sie nach ein paar Sekunden auf **Erneut versuchen**. Bleibt der Fehler, wählen Sie im Tray-Menü **Çıkış** (Beenden) und öffnen die App erneut.
- **Keine Verbindung zum Einstellungsdienst der Tray-App.** Die Tray-App wurde möglicherweise beendet. Öffnen Sie seowatcher erneut über das Startmenü.
- **Diese Einstellung wurde von einem Administrator gesperrt.** Nur der Administrator des Computers kann sie ändern.
- **Die Tray-App hat diese Anfrage nicht erkannt.** Server und Tray-App stammen möglicherweise aus verschiedenen Sitzungen. Wählen Sie im Tray-Menü **Çıkış** (Beenden) und öffnen die App erneut.
- **Die Tray-App hat die Einstellungsanfrage abgelehnt.** Starten Sie die App über das Tray-Menü neu. Bleibt der Fehler, aktualisieren Sie das Windows-Paket.
- **Die Tray-App hat eine unbekannte Antwort geliefert.** App- und Tray-Version passen möglicherweise nicht zusammen. Aktualisieren Sie das Windows-Paket.

**Lösung:** Tun Sie, was der Satz nennt. Diese Optionen gibt es nur im Windows-Paket. Bei Docker steuern Sie das Startverhalten über Ihr Betriebssystem.

## Warnungen des Starters

Warnungen, die am Symbol in der Taskleiste erscheinen, und was Sie tun:

- **„Sunucu 120 saniyede yanıt vermedi“ (Der Server hat nicht innerhalb von 120 Sekunden geantwortet).** Wählen Sie im Menü **Yeniden başlat**. Hilft das nicht, wählen Sie **Günlükleri aç** und sehen Sie sich die letzten Zeilen von `server.log` an.
- **„seowatcher yeniden başlatılıyor“ (seowatcher wird neu gestartet).** Der Server hat sich von selbst beendet, und die App startet ihn neu. Laden Sie die geöffnete Seite nach einigen Sekunden neu.
- **„Sunucu 10 dakikada üç kez kapandı“ (Der Server wurde in 10 Minuten dreimal beendet).** Die App startet ihn nicht mehr neu. Wählen Sie **Kurulumu onar**, und wenn das nicht hilft, **Sorunu bildir (GitHub)**.
- **„Kurulum eksik“ (Installation unvollständig).** **Kurulumu onar** legt fehlende Dateien zurück, indem es die Installationsdatei herunterlädt. Ohne Internetverbindung öffnet sich die Versionsseite; laden Sie die Installationsdatei herunter und führen Sie sie aus.
- **„3001 numarası dolu, 3002 kullanılıyor“ (Port 3001 ist belegt, 3002 wird verwendet).** Ein anderes Programm belegt 3001, oft eine alte Docker-Kopie. Dieselbe Warnung erscheint auch als gelber Streifen in der App. Erhalten Sie beim Verbinden mit Google einen Fehler, beenden Sie dieses Programm und wählen Sie **Yeniden başlat**. Siehe oben „Die Portnummer ist belegt“.
- **„Güncelleme denetlenemedi“ (Das Update konnte nicht geprüft werden) oder „Güncelleme yapılamadı“ (Das Update war nicht möglich).** Die Sprechblase nennt den Grund. Heißt es „GitHub'a ulaşılamadı“ (GitHub war nicht erreichbar), prüfen Sie Ihre Internetverbindung. Heißt es „GitHub şu an çok fazla istek alıyor“ (GitHub erhält gerade zu viele Anfragen), versuchen Sie es in einer Stunde noch einmal. Stimmt der Fingerabdruck nicht, laden Sie die Installationsdatei von der Versionsseite herunter. In jedem Fall läuft die installierte Version weiter.
- **„Güncelleme kurulmadı“ (Das Update wurde nicht installiert).** Das Installationsfenster wurde geschlossen, oder die Administratorerlaubnis wurde nicht erteilt. Versuchen Sie es im Menü mit **Güncelle** noch einmal.
- **„Windows bileşeni kurulamadı“ (Die Windows-Komponente konnte nicht installiert werden).** Wählen Sie im Menü **Eksik Windows bileşenini kur**.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
