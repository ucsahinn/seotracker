# Versionshinweise

Funktionen, Fehlerbehebungen und weitere Änderungen, neueste Version zuerst.

## [Yayınlanmamış] — erscheint als 0.8.0 Alpha

Änderungen seit 0.7.1, die noch nicht veröffentlicht sind. Am Veröffentlichungstag wird diese Überschrift durch Versionsnummer und Datum ersetzt.

### Highlights

- **Website-Audit neu gebaut:** 201 Regeln prüfen Seiten und die gesamte Website, darunter Sicherheits-Header, E-Mail- und Domain-Einträge, SSL- und Domain-Ablauf, den Zugriff von KI-Crawlern und Lighthouse-Ergebnisse.
- **Ehrliche Ergebnisse:** Eine nicht messbare Prüfung zählt nicht mehr als „bestanden“, und eine Abfrage, die nicht laufen konnte, erzeugt kein Ergebnis. Fehlen Daten, sagt die Anzeige das deutlich.
- **Reihenfolge der Aufgaben:** Korrekturen werden nach Ihrem Search-Console-Traffic sortiert, und der Score wird nach Kategorien gewichtet.
- **Neue Ansicht und neuer Bericht:** Tabs „Prüfungen“ und „Momentaufnahme“, Vorschauen für Suche und Teilen, Score-Verlauf und ein neu gestalteter Bericht zum Herunterladen.
- **Oberfläche in sechs Sprachen:** Deutsch, Französisch, Italienisch und Portugiesisch (Brasilien) sind dazugekommen. Zusammen mit Türkisch und Englisch ist die ganze App in sechs Sprachen verfügbar.

### Website-Audit

- **Prüfungen der ganzen Website:** Sicherheits-Header (etwa HSTS), Weiterleitungen, die Antwort auf eine nicht vorhandene Seite, robots.txt, SPF- und DMARC-Einträge sowie das Ablaufdatum von SSL-Zertifikat und Domain werden einmal zu Beginn des Audits abgefragt. Jede Abfrage ergibt höchstens ein Ergebnis.
- **KI-Crawler:** Das Audit prüft, ob Ihre robots.txt KI-Crawler wie GPTBot, ClaudeBot und PerplexityBot aussperrt und ob es eine llms.txt-Datei gibt.
- **Lighthouse-Ergebnisse:** Bei aktivierter Geschwindigkeitsmessung werden die Lighthouse-Prüfungen als Probleme aufgelistet, jeweils mit der geschätzten Einsparung.
- **Externe Links und Bilder:** Auf Wunsch wird geprüft, ob externe Links erreichbar sind und ob Bilder größer sind als nötig.
- **Mehr Regeln:** Insgesamt 201 Regeln, mit Seitensignalen und mehr als 20 neuen Ergebnissen. Was jede Regel bedeutet und wie Sie sie beheben, steht in der Anleitung „Audit-Regeln“.
- **Score:** Der Score wird nach Kategorien gewichtet berechnet.
- **Aufgaben:** Was zu beheben ist, wird nach Search-Console-Traffic sortiert. Ist die Search Console nicht verbunden, richtet sich die Reihenfolge nur nach dem Einfluss auf den Score.
- **Prüfungen und Momentaufnahme:** Der Tab „Prüfungen“ listet auch bestandene und nicht messbare Prüfungen auf. Der Tab „Momentaufnahme“ zeigt die beim Audit gemessenen Website-Informationen und, wenn vorhanden, die Core Web Vitals.
- **Vorschauen:** Vorschau des Google-Suchergebnisses, der Teilen-Karte (Open Graph) und der mobilen Ansicht.
- **Verlauf und Bericht:** Der Score-Verlauf zeigt, wie sich der Score zwischen den Audits verändert hat. Der Bericht zum Herunterladen wurde neu gestaltet.

### Weitere Funktionen

- **Oberflächensprache:** Wählen Sie unter Einstellungen → Darstellung → Sprache eine von sechs Sprachen; Zahlen und Datumsangaben folgen Ihrer Wahl.
- **Einrichtungshinweise:** Die Unterschiede zwischen dem Windows-Paket und Docker, etwa wo Einstellungen liegen und welche gelten, werden in der Anleitung und in der Hilfe klar erklärt.
- **Agent-Werkzeuge:** Das neue Werkzeug `get_audit_summary` liefert Website-Score, Kategorie-Scores, die sortierte Aufgabenliste und die Momentaufnahme der Website in einem Aufruf.
- **Anleitung:** Die Seite „Audit-Regeln“ erklärt alle 201 Regeln einzeln; Anleitung und Versionshinweise gibt es in sechs Sprachen.
- **seowatcher.io · Datenschutz:** Auf der Website läuft Google Analytics 4 nur, wenn eine Mess-ID gesetzt ist und Sie „Akzeptieren“ wählen; vor Ihrer Zustimmung geht nichts an Google. Die Datenschutzseite gibt es in sechs Sprachen.
- **Benachrichtigungen:** System-Popups von Windows und Browser sind abgeschaltet. Ankündigungen erscheinen im eigenen Popup der App, solange sie sichtbar ist, und bleiben im Hintergrund im Benachrichtigungsverlauf. Wichtige Hinweise können den App-Ton abspielen.

### Fehlerbehebungen

- **Audit-Genauigkeit:** Neun Ursachen für falsche Ergebnisse wurden behoben, nachdem Audits mit Messungen an echten Websites verglichen wurden.
- **Audit · Smartphone:** Die Audit-Ansicht und der heruntergeladene Bericht laufen auf dem Smartphone nicht mehr über.

## [0.7.1] Alpha — 2026-10-26

### Fehlerbehebungen

- **Ankündigungen:** Der Feed ergänzt die zusätzlichen Sprachfelder, die Version 0.7.0 erwartet, mit englischem Ersatztext.
- **Hilfe · Diagnosepaket:** Fehlgeschlagene Audits zeigen jetzt die Abbruchphase, eine bereinigte Fehlermeldung und die häufigsten PageSpeed-Messfehler. Seiten-URLs werden aus exportierten Zusammenfassungen entfernt.

## [0.7.0] Alpha — 2026-10-25

### Funktionen

- **Windows-Start:** Beim Windows-Start zeigt ein sichtbares Fortschrittsfenster die Servervorbereitung an; beim Herunterladen eines Updates wird der tatsächliche Prozentwert angezeigt.
- **Windows-Benachrichtigungen:** App-Updates und Live-Ankündigungen erscheinen bei aktivierter Option im Windows-Benachrichtigungscenter. Die Einstellung befindet sich unter Einstellungen → Benachrichtigungen.
- **Ankündigungen:** Ankündigungen werden auf Türkisch und Englisch verfasst. In anderen Oberflächensprachen wird die englische Fassung angezeigt.

## [0.6.0] Alpha — 2026-10-24

### Funktionen

- **Ankündigungen:** Live-Ankündigungen erscheinen in der App. Erstellen und veröffentlichen Sie zweisprachige Mitteilungen über die passwortgeschützte Administrationsseite.
- **Dashboard:** Der Bereich „Nächste Schritte“ im Dashboard bietet geführte Aufgaben und einen Bereitschaftswert, der auf Google-Verbindungen, einem aktuellen Audit, Projektkontext und der Agenteneinrichtung basiert. Er misst die Einrichtungsbereitschaft, nicht die SEO-Leistung oder Rankings.
- **Agentenberichte:** Agentenberichte verwenden jetzt eine Abdeckungs-Checkliste für Audit und PageSpeed, Search Console, Chancen, Ranking-Verlauf, gespeicherte Keywords, Analytics, Indexabdeckung und Sitemaps, um priorisierte Verbesserungen zu erstellen.
- **Navigation:** Der Markenlink in der Desktop- und Mobilnavigation öffnet seowatcher.io.

### Fehlerbehebungen

- **Agentenberichte:** Die Berichtsanleitung fordert Agenten auf, verfügbare Datenquellen anzugeben und auf fehlende Daten hinzuweisen.
- **Navigation:** Der Markenbereich in der kompakten Navigation wird jetzt ohne Überlauf angezeigt.

### Sicherheit

- **Ankündigungen:** Der API-Zugriff von anderen Ursprüngen ist für die Administrations-API deaktiviert. Der öffentliche Feed erlaubt nur den Lesezugriff auf Ankündigungen.

## [0.5.0] Alpha — 2026-10-23

### Funktionen

- **Spracheinstellungen:** Verwenden Sie die Benutzeroberfläche auf Türkisch oder Englisch. Die Auswahl unter Einstellungen → Darstellung → Sprache ändert auch die Anzeige von Zahlen und Datumsangaben.
- **Benachrichtigungen:** Das Benachrichtigungscenter bündelt Auditergebnisse, neue Versionen, Probleme mit Google-Verbindungen und Berichtsaktualisierungen. Benachrichtigungstöne und Desktop-Benachrichtigungen lassen sich getrennt steuern.
- **Versionshinweise:** Versionshinweise haben einen eigenen Eintrag in der Seitenleiste, oberhalb der Benachrichtigungen. Farbige Kennzeichnungen zeigen Funktionen, Fehlerbehebungen und Sicherheitsänderungen jeder Version.
- **Windows-Einstellungen:** Unter Einstellungen → Windows können Sie festlegen, ob die App mit Windows startet und Updates automatisch installiert werden. Die App weist darauf hin, wenn eine Einstellung durch Administratorrechte eingeschränkt ist.
- **Website-Audit:** Verfolgen Sie während eines Audits die verstrichene Zeit und den Fortschritt und sehen Sie sich anschließend die Zusammenfassung an. Die App zeigt auch den Fortschritt beim Erstellen eines Berichts und bei der Suche nach Updates.
- **Hilfe:** Öffnen Sie den passenden Leitfaden über den Titel eines beliebigen Bildschirms.

### Fehlerbehebungen

- **Neues Projekt:** Auf Smartphones wird die Länderliste im Formular für neue Projekte nicht mehr abgeschnitten. Die Escape-Taste schließt zuerst die Liste und lässt das Formular geöffnet.
- **Hilfe:** Lange Hilfetexte passen jetzt auch in kleine und kompakte Fenster.
- **Einstellungen:** Einstellungen markieren nun den ausgewählten Bereich korrekt. Die Windows-Steuerelemente haben größere Bedienflächen.
- **Indexstatus:** Gleichzeitige Indexprüfungen schöpfen das tägliche Kontingent genauer aus. Erfolgreiche Ergebnisse bleiben erhalten, wenn eine andere Prüfung in der Gruppe fehlschlägt.

### Sicherheit

- **Sicherheitsupdates:** Sicherheitslücken in Abhängigkeiten der Anwendung wurden behoben.

### Vor dem Update

Beim ersten Wechsel von Version 2.x auf die 0.x-Alpha-Reihe müssen Sie das neue Windows-Installationsprogramm manuell ausführen. Das alte Updateprogramm erkennt eine niedrigere Versionsnummer nicht als neuer. Ihre Daten und Google-Verbindungen bleiben erhalten.

## [0.4.3] Alpha — 2026-10-22

Alle Zwischenversionen seit 0.3.0 sind in dieser Version zusammengefasst.

### Funktionen

- **Windows-Installation:** Das Installationsprogramm bringt fehlende Komponenten mit, sodass die App auch auf einem sauberen Computer gleich beim ersten Mal startet. Dateiname und Einrichtungsassistent nennen die installierte Version; beim Deinstallieren bleiben Ihre Daten erhalten.
- **Windows-Updates:** Der Eintrag „Update“ im Taskleistenmenü ist immer da. Er lädt eine neue Version herunter, prüft und installiert sie und zeigt Prüfung, Download-Fortschritt und Installationsschritt an. Auf Wunsch werden Updates automatisch installiert.
- **Windows · Selbstheilung:** Beendet sich der Server unerwartet, startet ihn die App neu. Protokolldateien wachsen nicht mehr an.
- **Hilfe · Diagnose:** Die Installationsreparatur kann Startprobleme beheben. „Problem melden“ öffnet einen vorbereiteten Eintrag; Benutzername, Websitenamen und E-Mail-Adressen werden im Diagnosebericht maskiert.
- **Ersteinrichtung:** In der Agenteneinrichtung steht „Von Grund auf einrichten“ ganz oben, mit einer Karte und einer Kopierschaltfläche für Claude Code, Codex und andere Assistenten. Die Einstellungen erklären die Google-Verbindung in drei Schritten.
- **Rückmeldung:** Speichern, Löschen und Verbinden sagen beim Warten, am Ende und bei Fehlern, was passiert. Löschen und Trennen fragen vorher nach.
- **App-Design:** Menü, Einstellungen und Ersteinrichtung wurden vereinfacht, und mehr als zweihundert Bildschirmtexte wurden in natürlichem Türkisch neu geschrieben. Dunkel ist das Standarddesign, Hell und Dunkel passen zur Website.
- **Windows und Docker:** Hilfe und Agent-Anweisungen kennen beide Installationen. Sie beschreiben unter Windows die Taskleiste und bei Docker die `docker compose`-Befehle.
- **Benutzerhandbuch und Website:** seowatcher.io und das Benutzerhandbuch mit 20 Seiten gibt es in sechs Sprachen. Die Fehlerbehebungsseiten nutzen Kästen für Symptom, Ursache und Lösung.

### Fehlerbehebungen

- **Website-Audit · Chancen:** Der seitliche Überlauf in Website-Audit und Chancen auf dem Smartphone wurde behoben.
- **Google-Verbindung:** Die falsche Warnung „Google-Zugriffsschlüssel fehlt“ bei reiner Dienstkonto-Verbindung wurde behoben. Fehler, die von Google kommen, verweisen jetzt auf die Google-Verbindung.
- **Analytics:** Geräte-, Kanal- und Ländernamen erscheinen auf Türkisch, Umsatzbeträge zeigen ihre Währung, und Veränderungsprozente sehen auf allen Seiten gleich aus.
- **Website · Downloads:** Der Downloadlink zeigt die richtige Version. Eine unbekannte Adresse öffnet statt einer leeren Seite die Meldung „Seite nicht gefunden“ mit einem Link zurück zur Übersicht.

## [0.3.0] Alpha — 2026-10-21

### Funktionen

- **Windows-Installation:** Installieren Sie die App unter Windows mit einem einzigen Installationsprogramm, ganz ohne Docker oder Terminal. Beim ersten Start erzeugt die App die nötigen Schlüssel, bereitet ihre Datenbank vor und öffnet den Browser; verwaltet wird sie über das Taskleistensymbol. Beim Deinstallieren bleiben Ihre Daten erhalten.
- **Website:** Auf seowatcher.io finden Sie Download-Links, Produktinformationen und das Benutzerhandbuch.
- **Benutzerhandbuch:** Einrichtung, Funktionen, fertige Skills und Agent-Werkzeuge wurden neu geschrieben, mit Screenshots aus der App.

### Fehlerbehebungen

- **Website-Audit:** Zahlen, die aus der Karte mit der Problemzusammenfassung im Website-Audit herausragten, wurden korrigiert.

## [0.2.1] Alpha — 2026-10-04

0.2.0 wurde in diese Version aufgenommen. Sie dient vor allem der Fehlerbereinigung; Ihre Daten bleiben beim Update erhalten.

### Funktionen

- **Agenteneinrichtung:** Haben Sie das Repository gerade erst heruntergeladen, fügen Sie die Einrichtungsaufforderung aus der Agenteneinrichtung in Ihren Agenten ein; sie prüft nacheinander Docker, die Google-Verbindung, den PageSpeed-Schlüssel, das Projekt und die Agentenverbindung. Sie müssen keine Geheimnisse in den Chat einfügen. Dieselbe Aufforderung finden Sie auch bei den Schnellaktionen in der Hilfe.

### Fehlerbehebungen

- **Einstellungen · Google:** Der in den Einstellungen eingegebene Google-Client wird auch beim Erneuern des Zugriffs verwendet; das Problem, dass nach etwa einer Stunde eine neue Verbindung verlangt wurde, ist behoben. Die Einstellungen erklären, welche Google-Verbindung verwendet wird.
- **Website-Audit:** Frühere erfolgreiche Ergebnisse, einschließlich der Geschwindigkeitsmessung, bleiben erhalten, wenn ein Audit abbricht oder wiederholt wird.
- **Website-Audit · Berechnungen:** Seitentiefe, Sitemap-Abdeckung und verwaiste Seiten werden genauer berechnet. Ähnlich aussehende, aber verschiedene Adressen (http und https, www, abschließender Schrägstrich) gelten beim Vergleich der kanonischen Adresse jetzt als verschieden; dadurch können echte Abweichungen sichtbar werden, die vorher verdeckt waren.
- **Projekte · Google:** Beim Wechsel des Google-Kontos oder der Property vermischen sich Daten alter Projekte nicht mehr. Das Entfernen eines Kontos löscht nur die Daten der Projekte dieses Kontos.
- **Analytics:** Die Kontingentkarte zeigt die richtige Nutzung („231 / 200.000“). Berichtsgrößen verwenden überall dieselbe Einheit. Die Spalten im Audit-Verlauf nennen sich „pro hundert Seiten“.
- **Gespeicherte Keywords · CSV:** Die Reihenfolge gespeicherter Keywords und das Öffnen von CSV-Dateien mit türkischen Zeichen in Excel wurden korrigiert. Mehr als 500 Suchanfragen lassen sich auf einmal speichern.
- **Formulare · Fehler:** Schlägt eine Aktualisierung im Hintergrund fehl, bleibt Ihr Text im geöffneten Formular erhalten. Fehlermeldungen sagen, was passiert ist und was Sie als Nächstes tun können.
- **Agenteneinrichtung:** Die Verbindungsanweisungen für Windows und Git Bash sowie der Codex-Befehl wurden korrigiert. Die Werkzeugbeschreibungen sagen jetzt klar, dass das Speichern von Keywords und das Schreiben von Projektinfos ohne Rückfrage ausgeführt werden.

### Sicherheit

- **Berichte:** Ein heruntergeladener Bericht öffnet sich immer mit seinen eigenen Schutzregeln, sodass eine bösartig geschriebene Seite nicht vor dem Schutz laufen kann.
- **Gescannte Adressen:** Die Domain mit und ohne www wird vor dem Scan getrennt geprüft. In eine Adresse geschriebene Benutzernamen und Passwörter werden abgelehnt und in der Anzeige verborgen.
- **Docker:** Der Verschlüsselungsschlüssel und das MCP-Passwort werden sicher geschrieben; ein vorhandener Schlüssel wird nie überschrieben.

## [0.1.0] Alpha — 2026-10-02

### Funktionen

- **Codex-Unterstützung:** Die Agenteneinrichtung hat eigene Anweisungen für Codex; sie verbindet sich mit einem Befehl, installiert die SEO-Skills und prüft sie mit einem echten Aufruf.
- **Google- und Systemgrenzen:** Ihr tägliches Kontingent für URL-Prüfungen, das Analytics-Kontingent, die heutige Zahl der Geschwindigkeitsmessungen und die Berichtsgrenzen erscheinen auf den passenden Seiten. Angezeigt werden nur Zahlen, die wirklich bekannt sind, jeweils mit Quelle und Zeitpunkt.
- **Schnellaktionen:** Die Hauptseiten haben eine Schaltfläche „Aktualisieren“, den Zeitpunkt der letzten Aktualisierung und die Kurztaste r.
- **Live-Ansicht:** Der Audit-Fortschritt zeigt Crawling und Geschwindigkeitsmessung mit getrennten Balken und einer Schätzung der Restzeit. Ist „Bewegung reduzieren“ aktiv, läuft keine Animation.
- **Hilfe:** Statusprüfung, Diagnosepaket, Dokumentation und Versionshinweise sind jetzt in einer Leiste vereint. Häufige Probleme behandeln Docker, einen belegten Port, das MCP-Passwort, das PageSpeed-Limit und fehlende Suchanfragen-Daten.
- **Einstellungen:** Schnelles Springen zwischen den Abschnitten, ein Statusabzeichen an jedem Abschnitt und eine Schaltfläche „Schlüssel testen“ für den PageSpeed-Schlüssel.

### Fehlerbehebungen

- **Website-Audit:** Unterbrochene Audits blockieren neue Audits nicht mehr dauerhaft, und beendete Audits füllen die Kapazität nicht mehr. Ein Agent, der ein laufendes Audit liest, sieht „Audit läuft“ statt „keine Probleme“.
- **Projekte · Google:** Filter und Ergebnisse des vorherigen Projekts bleiben beim Projektwechsel nicht mehr sichtbar. Beim Wechsel der Search-Console-Property oder beim Trennen vermischt sich der Verlauf zweier Properties nicht mehr. Chancen, Ranking-Verfolgung und Analytics behalten bei einem Wechsel der Google-Verbindung keine alten Daten.
- **Gespeicherte Keywords:** Die Suche mit türkischen Zeichen („çay“, „istanbul“), der Export und die Schätzung der Restzeit wurden korrigiert.
- **Einstellungen:** Das Formular wird nicht mehr ausgeblendet, wenn der Google-Client aus einer Umgebungsvariablen stammt, und das Format der Google-Client-ID wird geprüft. Eine fehlgeschlagene Update-Prüfung meldet nicht mehr „aktuell“.
- **Löschen · Verbindung trennen:** Löschen und das Entfernen der Google-Verbindung, einschließlich des Löschens von Zugangsdaten, erfordern eine Bestätigung.
- **Suchfeld · Zwischenablage:** Das Suchfeld legt nicht mehr bei jedem Tastendruck einen Verlaufseintrag an und verliert keine Buchstaben. Kopieren in die Zwischenablage funktioniert auch bei unsicheren Adressen.
