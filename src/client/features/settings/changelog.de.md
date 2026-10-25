# Versionshinweise

Funktionen, Fehlerbehebungen und weitere Änderungen, neueste Version zuerst.

## [0.7.0] Alpha — 2026-10-25

### Funktionen

- Beim Windows-Start zeigt ein sichtbares Fortschrittsfenster die Servervorbereitung an; beim Herunterladen eines Updates wird der tatsächliche Prozentwert angezeigt.
- App-Updates und Live-Ankündigungen erscheinen bei aktivierter Option im Windows-Benachrichtigungscenter. Die Einstellung befindet sich unter Einstellungen → Benachrichtigungen.
- Live-Ankündigungen können in sechs Sprachen erstellt und in der ausgewählten Oberflächensprache angezeigt werden.

## [0.6.0] Alpha — 2026-10-24

### Funktionen

- Live-Ankündigungen erscheinen in der App. Erstellen und veröffentlichen Sie zweisprachige Mitteilungen über die passwortgeschützte Administrationsseite.
- Der Bereich „Nächste Schritte“ im Dashboard bietet geführte Aufgaben und einen Bereitschaftswert, der auf Google-Verbindungen, einem aktuellen Audit, Projektkontext und der Agenteneinrichtung basiert. Er misst die Einrichtungsbereitschaft, nicht die SEO-Leistung oder Rankings.
- Agentenberichte verwenden jetzt eine Abdeckungs-Checkliste für Audit und PageSpeed, Search Console, Chancen, Ranking-Verlauf, gespeicherte Keywords, Analytics, Indexabdeckung und Sitemaps, um priorisierte Verbesserungen zu erstellen.
- Der Markenlink in der Desktop- und Mobilnavigation öffnet seowatcher.io.

### Fehlerbehebungen

- Die Berichtsanleitung fordert Agenten auf, verfügbare Datenquellen anzugeben und auf fehlende Daten hinzuweisen.
- Der Markenbereich in der kompakten Navigation wird jetzt ohne Überlauf angezeigt.

### Sicherheit

- Der API-Zugriff von anderen Ursprüngen ist für die Administrations-API deaktiviert. Der öffentliche Feed erlaubt nur den Lesezugriff auf Ankündigungen.

## [0.5.0] Alpha — 2026-10-23

### Funktionen

- Verwenden Sie die Benutzeroberfläche auf Türkisch oder Englisch. Die Auswahl unter Einstellungen → Darstellung → Sprache ändert auch die Anzeige von Zahlen und Datumsangaben.
- Das Benachrichtigungscenter bündelt Auditergebnisse, neue Versionen, Probleme mit Google-Verbindungen und Berichtsaktualisierungen. Benachrichtigungstöne und Desktop-Benachrichtigungen lassen sich getrennt steuern.
- Versionshinweise haben einen eigenen Eintrag in der Seitenleiste, oberhalb der Benachrichtigungen. Farbige Kennzeichnungen zeigen Funktionen, Fehlerbehebungen und Sicherheitsänderungen jeder Version.
- Unter Einstellungen → Windows können Sie festlegen, ob die App mit Windows startet und Updates automatisch installiert werden. Die App weist darauf hin, wenn eine Einstellung durch Administratorrechte eingeschränkt ist.
- Verfolgen Sie während eines Audits die verstrichene Zeit und den Fortschritt und sehen Sie sich anschließend die Zusammenfassung an. Die App zeigt auch den Fortschritt beim Erstellen eines Berichts und bei der Suche nach Updates.
- Öffnen Sie den passenden Leitfaden über den Titel eines beliebigen Bildschirms.

### Fehlerbehebungen

- Auf Smartphones wird die Länderliste im Formular für neue Projekte nicht mehr abgeschnitten. Die Escape-Taste schließt zuerst die Liste und lässt das Formular geöffnet.
- Lange Hilfetexte passen jetzt auch in kleine und kompakte Fenster.
- Einstellungen markieren nun den ausgewählten Bereich korrekt. Die Windows-Steuerelemente haben größere Bedienflächen.
- Gleichzeitige Indexprüfungen schöpfen das tägliche Kontingent genauer aus. Erfolgreiche Ergebnisse bleiben erhalten, wenn eine andere Prüfung in der Gruppe fehlschlägt.

### Sicherheit

- Sicherheitslücken in Abhängigkeiten der Anwendung wurden behoben.

### Vor dem Update

Beim ersten Wechsel von Version 2.x auf die 0.x-Alpha-Reihe müssen Sie das neue Windows-Installationsprogramm manuell ausführen. Das alte Updateprogramm erkennt eine niedrigere Versionsnummer nicht als neuer. Ihre Daten und Google-Verbindungen bleiben erhalten.

## [0.4.3] Alpha — 2026-10-22

### Funktionen

- Das Windows-Installationsprogramm enthält jetzt fehlende Komponenten, damit die App auch auf einem sauberen Computer startet.
- Laden Sie neue Versionen über „Update“ im Taskleistenmenü herunter. Sie können auch die automatische Installation aktivieren.
- Die Installationsreparatur kann Startprobleme beheben. Persönliche Angaben werden in Diagnoseberichten maskiert, wenn Sie ein Problem melden.
- Menüs, Einstellungen und die Ersteinrichtung sind einfacher gestaltet. Helle und dunkle Designs stimmen jetzt in App und Website überein.
- Die Benutzeranleitung ist in sechs Sprachen verfügbar.

### Fehlerbehebungen

- Der horizontale Überlauf auf Smartphones in „Website-Audit“ und „Chancen“ wurde beseitigt.
- Eine falsche Warnung zur Google-Verbindung bei Verwendung eines Dienstkontos wurde behoben.
- Die Anzeige von Geräte-, Kanal- und Ländernamen sowie Währungen in Analytics wurde verbessert.
- Falsche Downloadlinks und leere Bildschirme bei unbekannten Adressen wurden behoben.

## [0.3.0] Alpha — 2026-10-21

### Funktionen

- Installieren Sie die Windows-App mit einem einzigen Installationsprogramm, ganz ohne Docker oder Terminal.
- Finden Sie Downloads, Produktinformationen und die Benutzeranleitung auf seowatcher.io.

### Fehlerbehebungen

- Zahlen liefen in der Karte mit der Fehlerzusammenfassung im Website-Audit nicht mehr über.

## [0.2.1] Alpha — 2026-10-04

### Fehlerbehebungen

- Ein Problem wurde behoben, durch das etwa eine Stunde nach dem Einrichten der Verbindung in den Einstellungen erneut eine Verbindung mit Google angefordert wurde.
- Bereits erfolgreiche Ergebnisse bleiben erhalten, wenn ein Audit mittendrin stoppt oder erneut versucht wird.
- Die Berechnungen für Seitentiefe, Sitemap-Abdeckung und verwaiste Seiten wurden verbessert.
- Nach einem Wechsel des Google-Kontos oder der Properties werden keine Daten aus dem vorherigen Projekt mehr mit dem neuen Projekt vermischt.
- Die Reihenfolge gespeicherter Keywords wurde korrigiert. CSV-Dateien mit türkischen Zeichen lassen sich nun korrekt in Excel öffnen.
- Texte in geöffneten Formularen bleiben erhalten, wenn eine Hintergrundaktualisierung fehlschlägt. Fehlermeldungen erklären jetzt deutlicher den nächsten sinnvollen Schritt.

### Sicherheit

- Die Sicherheitsprüfungen für heruntergeladene Berichte und gescannte Website-Adressen wurden verstärkt.

## [0.2.0] Alpha — 2026-10-03

### Funktionen

- Die Einrichtungsaufforderung auf der Seite „Agenteneinrichtung“ prüft eine Erstinstallation und die Google-Verbindung Schritt für Schritt.

### Fehlerbehebungen

- Der Analytics-Kontingentindikator, Berichtsdimensionen und Vergleiche im Auditverlauf wurden korrigiert.
- In den Einstellungen wird jetzt erklärt, welche Google-Verbindung verwendet wird.
- Die Anweisungen zur Agentenverbindung für Windows und Git Bash wurden korrigiert.

## [0.1.0] Alpha — 2026-10-02

### Funktionen

- Separate Verbindungsanweisungen für Codex wurden hinzugefügt.
- Google- und Systemgrenzen werden jetzt auf den passenden Bildschirmen angezeigt. Zähler ohne bekannte Daten sind klar gekennzeichnet.
- Die Hauptbildschirme erhielten eine Schaltfläche zum Aktualisieren und eine Anzeige des letzten Aktualisierungszeitpunkts.
- Diagnoseinformationen, häufige Probleme und Schnellaktionen wurden auf der Hilfeseite zusammengeführt.

### Fehlerbehebungen

- Ein unterbrochenes Audit blockiert ein neues Audit nicht mehr dauerhaft.
- Filter und Ergebnisse des vorherigen Projekts bleiben beim Projektwechsel nicht mehr sichtbar.
- Die Suche nach türkischen Keywords, Exporte und Schätzungen der verbleibenden Zeit wurden korrigiert.
- Aktionen zum Löschen und Trennen einer Google-Verbindung erfordern jetzt eine Bestätigung.
