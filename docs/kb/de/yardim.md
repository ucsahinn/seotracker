---
title: Hilfe
description: Der Bildschirm prüft Ihre Installation, zeigt Lösungen für häufige Probleme und bereitet die Datei für eine Problemmeldung vor.
screen: Yardım
route: /support
updated: 2026-10-27
---

Wenn etwas schiefgeht, sehen Sie zuerst hier nach. Dieser Bildschirm prüft Ihre Installation, sagt, was fehlt, und führt Sie zur richtigen Einstellung.

Die Oberfläche der App gibt es in sechs Sprachen: Türkisch, Englisch, Deutsch, Französisch, Italienisch und Portugiesisch. Die Sprache lässt sich unter Einstellungen → Darstellung → Sprache ändern. Diese Anleitung nennt Schaltflächen und Bildschirme so, wie sie in der deutschen Oberfläche heißen. Das Windows-Tray-Menü gibt es nur auf Türkisch. Dort steht der türkische Name mit der deutschen Bedeutung in Klammern.

## Was auf dem Bildschirm zu sehen ist

**Schnellaktionen.** Die Schaltflächen oben:

- **Status erneut prüfen**: aktualisiert die Karte darunter.
- **Diagnosepaket herunterladen**: lädt die Datei herunter, die Sie bei einer Problemmeldung senden. Sie enthält keine geheimen Werte.
- **Anleitung öffnen**: öffnet die Anleitung auf seowatcher.io.
- **seowatcher.io**: öffnet die Website der App; dort liegen die Download-Seite und die Anleitung.
- **Versionshinweise**: öffnet den eigenen Bildschirm für Versionshinweise (`/release-notes`).
- **Agent-Einrichtung**: führt zum Bildschirm für die Assistenten-Verbindung.

**Zustand der App.** Die Karte prüft Zugriff, Google-Verbindungseinstellungen, PageSpeed-Schlüssel, Laufzeitumgebung und Datenbank dieser Installation. Erfolgreiche Prüfungen bestätigen weder eine fehlerfreie Website noch aktuelle Google-Daten. Nicht gelesene Einstellungen gelten nicht als erfolgreich geprüft. Lesen Sie die Warnung und wählen Sie **Status erneut prüfen**. Version und Prüfzeit ordnen das Ergebnis ein. **Zusammenfassung kopieren** kopiert den Status als Text; **Verbindungen öffnen** führt zu den Projektverbindungen.

**Hinweis zur Portnummer.** Öffnet sich das Windows-Paket auf einer anderen Portnummer, weil ein anderes Programm 3001 belegt (zum Beispiel eine alte Docker-Kopie), erscheint oben auf jedem Bildschirm der App ein gelber Streifen: „seowatcher läuft diesmal auf 3002, weil ein anderes Programm 3001 belegt (z. B. eine alte Docker-Kopie). Die Google-Anmeldung ist für 3001 eingerichtet; schließen Sie dieses Programm und starten Sie seowatcher neu.“ Der Streifen ist da, falls Sie die Meldung in der Taskleiste übersehen haben. Die Google-Anmeldung kehrt zur Adresse 3001 zurück und schlägt fehl, wenn Sie die App auf 3002 geöffnet haben. Die Schließen-Schaltfläche rechts im Streifen blendet ihn für diesen Reiter aus. Derselbe Satz steht auch in der Karte **Zustand der App**. Zur Lösung schließen Sie das Programm, das 3001 belegt, und wählen dann im Tray-Menü **Yeniden başlat** (Neu starten). Die App kehrt zu 3001 zurück und der Streifen verschwindet. Nutzt kein anderes Programm den Port, kehrt die App beim nächsten Start ohnehin zu 3001 zurück.

**Projekte.** Sie sehen den Zustand der Search-Console- und der Analytics-Verbindung jedes Projekts. **Verbindungen öffnen** führt Sie zu den Projekteinstellungen.

**Häufige Probleme.** Es gibt sechs aufklappbare Überschriften: Seite öffnet sich nicht oder die App ist geschlossen, der Port ist belegt, mein Agent kann keine Verbindung herstellen (401), Geschwindigkeitsmessung bricht ab (429), keine Suchanfragedaten und ich habe eine Einstellung geändert, und die App übernimmt sie nicht. Bei jeder steht, was Sie tun, mit einem Link zur passenden Einstellung.

**Google- und Systemgrenzen.** Mit **Limits anzeigen** sehen Sie, wo Sie bei Googles Tagesgrenzen gerade stehen.

**Untere Liste.** Es gibt Abkürzungen zu den Protokolldateien und zur Statusadresse (`/api/health`). Beim Windows-Paket öffnen Sie die Protokolle über **Günlükleri aç** (Protokolle öffnen) im Menü der Taskleiste. Bei Docker verwenden Sie den Befehl, den **Befehl kopieren** liefert.

## So gehen Sie vor

1. Funktioniert etwas nicht, öffnen Sie zuerst diesen Bildschirm und lesen Sie die Warnung auf der Karte.
2. Klicken Sie auf die Schaltfläche neben der Warnung, sie führt Sie zur richtigen Einstellung. Nehmen Sie die Einstellung vor, kehren Sie zurück und klicken Sie auf **Status erneut prüfen**.
3. Bestehen die Installationsprüfungen, das Problem bleibt aber bestehen, lesen Sie **Häufige Probleme** und öffnen Sie den betreffenden Projektbildschirm.
4. Ist es immer noch nicht gelöst, klicken Sie auf **Diagnosepaket herunterladen** und hängen Sie die Datei an den Fehlerbericht auf GitHub. Beim Windows-Paket erledigt **Sorunu bildir (GitHub)** (Problem melden (GitHub)) im Menü der Taskleiste dasselbe mit einem Klick.

## Häufige Fragen

**Warum ist die Zeile „Google-Anmeldung“ gelb?** Es wurde noch kein Google-Zugangsschlüssel eingetragen. Solange Google nicht verbunden ist, bleibt die Zeile gelb. Folgen Sie der Anleitung zur Google-Verbindung.

**In der Zeile „Anmeldung und Zugriff“ steht „ein Benutzer ohne Passwort“.** Das ist normal. Die App öffnet sich nur von Ihrem eigenen Computer aus. Wollen Sie sie im Netz erreichbar machen, müssen Sie selbst eine gesicherte Anmeldung davorschalten.

**Was steht im Diagnosepaket?** Version, Installationsprüfungen, Tabellenzahlen sowie Phasen- und Fehlerzusammenfassungen der letzten 25 Audits. PageSpeed-Fehler werden ohne Seiten-URLs zusammengefasst. Geheimnisse und Passwörter fehlen; Projektnamen, Domains und Google-Property-IDs können enthalten sein. Prüfen Sie die Dateien vor dem Senden.

## Grenzen

Dieser Bildschirm prüft nur die Installation selbst. Ein Problem auf Ihrer Website finden Sie mit dem Bildschirm **Website-Audit**, ein Problem auf Googles Seite mit dem Bildschirm **Indexstatus**.

## Welcher Bildschirm hilft?

Die [Übersicht](/docs/panel/) fasst Einrichtung und Daten des ausgewählten Projekts zusammen. [Chancen](/docs/firsatlar/) hilft bei der Auswahl von Aufgaben anhand von Search-Console-Daten. Die [Ranking-Verfolgung](/docs/siralama-takibi/) zeigt die durchschnittlichen Positionen gespeicherter Suchbegriffe in Google-Daten, keine Live-Suchergebnisse. Bei fehlenden Daten prüfen Sie Projektverbindungen, Zeitraum und Hinweise zur Datenabdeckung. Der Installationsstatus bestätigt diese Berichte nicht.

Bei Websites mit wenig Suchverkehr blendet Google manche Suchanfragen aus. Die Liste kann leer sein oder weniger Klicks als die Seitensummen zeigen. Das allein bedeutet keinen Verbindungsfehler.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/quotas/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
