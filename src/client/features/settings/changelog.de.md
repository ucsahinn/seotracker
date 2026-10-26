# Versionshinweise

Funktionen, Fehlerbehebungen und weitere Änderungen, neueste Version zuerst.

## [0.8.0] Alpha — 2026-10-26

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

### Fehlerbehebungen

- **Audit-Genauigkeit:** Neun Ursachen für falsche Ergebnisse wurden behoben, nachdem Audits mit Messungen an echten Websites verglichen wurden.
- **Audit · Smartphone:** Die Audit-Ansicht und der heruntergeladene Bericht laufen auf dem Smartphone nicht mehr über.

## [0.7.1] Alpha — 2026-10-26

### Funktionen

- **Ankündigungen:** Live-Ankündigungen erscheinen im Bildschirm „Ankündigungen“ der App. Sie werden auf Türkisch und Englisch verfasst; in den übrigen Sprachen der Oberfläche wird die englische Fassung angezeigt. Die Texte bereiten Sie im passwortgeschützten Verwaltungsbildschirm vor und veröffentlichen sie dort.
- **Dashboard:** Der Bereich „Nächste Schritte“ im Dashboard bietet geführte Aufgaben und einen Bereitschaftswert, der auf Google-Verbindungen, einem aktuellen Audit, Projektkontext und der Agenteneinrichtung basiert. Er misst die Einrichtungsbereitschaft, nicht die SEO-Leistung oder Rankings.
- **Agentenberichte:** Agentenberichte verwenden jetzt eine Abdeckungs-Checkliste für Audit und PageSpeed, Search Console, Chancen, Ranking-Verlauf, gespeicherte Keywords, Analytics, Indexabdeckung und Sitemaps, um priorisierte Verbesserungen zu erstellen.
- **Benachrichtigungen:** Das Benachrichtigungscenter bündelt Auditergebnisse, neue Versionen, Probleme mit Google-Verbindungen und Berichtsaktualisierungen. Benachrichtigungstöne und Desktop-Benachrichtigungen lassen sich getrennt steuern.
- **Windows-Benachrichtigungen:** App-Updates und Live-Ankündigungen erscheinen bei aktivierter Option im Windows-Benachrichtigungscenter. Die Einstellung befindet sich unter Einstellungen → Benachrichtigungen.
- **Windows-Start:** Beim Windows-Start zeigt ein sichtbares Fortschrittsfenster die Servervorbereitung an; beim Herunterladen eines Updates wird der tatsächliche Prozentwert angezeigt.
- **Windows-Einstellungen:** Unter Einstellungen → Windows können Sie festlegen, ob die App mit Windows startet und Updates automatisch installiert werden. Die App weist darauf hin, wenn eine Einstellung durch Administratorrechte eingeschränkt ist.
- **Website-Audit:** Verfolgen Sie während eines Audits die verstrichene Zeit und den Fortschritt und sehen Sie sich anschließend die Zusammenfassung an. Die App zeigt auch den Fortschritt beim Erstellen eines Berichts und bei der Suche nach Updates.

### Fehlerbehebungen

- **Neues Projekt:** Auf Smartphones wird die Länderliste im Formular für neue Projekte nicht mehr abgeschnitten. Die Escape-Taste schließt zuerst die Liste und lässt das Formular geöffnet.
- **Hilfe · Diagnosepaket:** Fehlgeschlagene Audits zeigen jetzt die Abbruchphase, eine bereinigte Fehlermeldung und die häufigsten PageSpeed-Messfehler. Seiten-URLs werden aus exportierten Zusammenfassungen entfernt.

### Sicherheit

- **Sicherheitsupdates:** Sicherheitslücken in Abhängigkeiten der Anwendung wurden behoben.

## [0.4.3] Alpha — 2026-10-23

### Funktionen

- **Windows-Installation:** Unter Windows installieren Sie mit einer einzigen Installationsdatei, ohne Docker oder Terminal. Sie bringt fehlende Komponenten mit, sodass die App auch auf einem sauberen Computer gleich beim ersten Mal startet, die nötigen Schlüssel erzeugt, die Datenbank vorbereitet und den Browser öffnet. Verwaltet wird sie über das Symbol in der Taskleiste; die Deinstallation löscht Ihre Daten nicht.
- **Windows-Updates:** Der Eintrag „Update“ im Taskleistenmenü ist immer da. Er lädt eine neue Version herunter, prüft und installiert sie und zeigt Prüfung, Download-Fortschritt und Installationsschritt an. Auf Wunsch werden Updates automatisch installiert.
- **Windows · Selbstheilung:** Beendet sich der Server unerwartet, startet ihn die App neu. Protokolldateien wachsen nicht mehr an.
- **Hilfe · Diagnose:** Die Installationsreparatur kann Startprobleme beheben. „Problem melden“ öffnet einen vorbereiteten Eintrag; Benutzername, Websitenamen und E-Mail-Adressen werden im Diagnosebericht maskiert.
- **Ersteinrichtung:** In der Agenteneinrichtung steht „Von Grund auf einrichten“ ganz oben, mit einer Karte und einer Kopierschaltfläche für Claude Code, Codex und andere Assistenten. Die Einstellungen erklären die Google-Verbindung in drei Schritten.
- **Rückmeldung:** Speichern, Löschen und Verbinden sagen beim Warten, am Ende und bei Fehlern, was passiert. Löschen und Trennen fragen vorher nach.
- **App-Design:** Menü, Einstellungen und Ersteinrichtung wurden vereinfacht, und mehr als zweihundert Bildschirmtexte wurden in natürlichem Türkisch neu geschrieben. Dunkel ist das Standarddesign, Hell und Dunkel passen zur Website.
- **Benutzerhandbuch und Website:** seowatcher.io und das Benutzerhandbuch mit 20 Seiten gibt es in sechs Sprachen. Die Fehlerbehebungsseiten nutzen Kästen für Symptom, Ursache und Lösung.

### Fehlerbehebungen

- **Google-Verbindung:** Die falsche Warnung „Google-Zugriffsschlüssel fehlt“ bei reiner Dienstkonto-Verbindung wurde behoben. Fehler, die von Google kommen, verweisen jetzt auf die Google-Verbindung.
- **Analytics:** Geräte-, Kanal- und Ländernamen erscheinen auf Türkisch, Umsatzbeträge zeigen ihre Währung, und Veränderungsprozente sehen auf allen Seiten gleich aus.
- **Website-Audit · Chancen:** Der seitliche Überlauf in Website-Audit und Chancen auf dem Smartphone wurde behoben.

## [0.2.1] Alpha — 2026-10-04

### Highlights

- **Alle Daten in einer App:** Daten aus Search Console, Analytics, Website-Audit und PageSpeed laufen auf Ihrem eigenen Computer in einer App zusammen. Sie können Website-Probleme, betroffene Seiten, Geschwindigkeitsergebnisse und den Audit-Verlauf einsehen.
- **Beobachten und Berichte:** Sie verfolgen die Suchleistung und das Ranking gespeicherter Keywords und sehen Verbesserungschancen. Audit-Berichte lassen sich herunterladen und drucken und liegen in derselben Liste wie die Berichte Ihrer Agenten. Helles und dunkles Design, Tastaturbedienung und Screenreader-Unterstützung sind dabei.

### Funktionen

- **Agenteneinrichtung:** Haben Sie das Repository gerade erst heruntergeladen, fügen Sie die Einrichtungsaufforderung aus der Agenteneinrichtung in Ihren Agenten ein; sie prüft nacheinander Docker, die Google-Verbindung, den PageSpeed-Schlüssel, das Projekt und die Agentenverbindung. Sie müssen keine Geheimnisse in den Chat einfügen. Dieselbe Aufforderung finden Sie auch bei den Schnellaktionen in der Hilfe.
- **Codex-Unterstützung:** Die Agenteneinrichtung hat eigene Anweisungen für Codex; sie verbindet sich mit einem Befehl, installiert die SEO-Skills und prüft sie mit einem echten Aufruf.
- **Google- und Systemgrenzen:** Ihr tägliches Kontingent für URL-Prüfungen, das Analytics-Kontingent, die heutige Zahl der Geschwindigkeitsmessungen und die Berichtsgrenzen erscheinen auf den passenden Seiten. Angezeigt werden nur Zahlen, die wirklich bekannt sind, jeweils mit Quelle und Zeitpunkt.
- **Live-Ansicht:** Der Audit-Fortschritt zeigt Crawling und Geschwindigkeitsmessung mit getrennten Balken und einer Schätzung der Restzeit. Ist „Bewegung reduzieren“ aktiv, läuft keine Animation.

### Fehlerbehebungen

- **Website-Audit:** Unterbrochene Audits blockieren neue Audits nicht mehr dauerhaft, und beendete Audits füllen die Kapazität nicht mehr. Ein Agent, der ein laufendes Audit liest, sieht „Audit läuft“ statt „keine Probleme“.
- **Website-Audit · Berechnungen:** Seitentiefe, Sitemap-Abdeckung und verwaiste Seiten werden genauer berechnet. Ähnlich aussehende, aber verschiedene Adressen (http und https, www, abschließender Schrägstrich) gelten beim Vergleich der kanonischen Adresse jetzt als verschieden; dadurch können echte Abweichungen sichtbar werden, die vorher verdeckt waren.
- **Projekte · Google:** Beim Wechsel des Google-Kontos oder der Property vermischen sich Daten alter Projekte nicht mehr. Das Entfernen eines Kontos löscht nur die Daten der Projekte dieses Kontos.
- **Einstellungen · Google:** Der in den Einstellungen eingegebene Google-Client wird auch beim Erneuern des Zugriffs verwendet; das Problem, dass nach etwa einer Stunde eine neue Verbindung verlangt wurde, ist behoben. Die Einstellungen erklären, welche Google-Verbindung verwendet wird.

### Sicherheit

- **Berichte:** Ein heruntergeladener Bericht öffnet sich immer mit seinen eigenen Schutzregeln, sodass eine bösartig geschriebene Seite nicht vor dem Schutz laufen kann.
