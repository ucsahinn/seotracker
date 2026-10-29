---
title: Hilfe
description: Der Bildschirm prüft Ihre Installation, zeigt Lösungen für häufige Probleme und bereitet die Datei für eine Problemmeldung vor.
screen: Yardım
route: /support
updated: 2026-10-27
---

Wenn etwas nicht funktioniert, beginnen Sie hier. Jede Warnung nennt, was fehlt, und führt zur passenden Einstellung.

Die Oberfläche der App gibt es in sechs Sprachen: Türkisch, Englisch, Deutsch, Französisch, Italienisch und Portugiesisch. Die Sprache lässt sich unter Einstellungen → Darstellung → Sprache ändern. Diese Anleitung nennt Schaltflächen und Bildschirme so, wie sie in der deutschen Oberfläche heißen. Das Windows-Tray-Menü gibt es nur auf Türkisch. Dort steht der türkische Name mit der deutschen Bedeutung in Klammern.

## Was auf dem Bildschirm zu sehen ist

**Schnellaktionen.** Die Schaltflächen oben:

- **Status erneut prüfen**: aktualisiert die Karte darunter.
- **Diagnosepaket herunterladen**: lädt die Datei herunter, die Sie bei einer Problemmeldung senden. Sie enthält keine geheimen Werte.
- **Anleitung öffnen**: öffnet die Anleitung auf seowatcher.io.
- **seowatcher.io**: öffnet die Website der App; dort liegen die Download-Seite und die Anleitung.
- **Versionshinweise**: öffnet den eigenen Bildschirm für Versionshinweise (`/release-notes`).
- **Agent-Einrichtung**: öffnet den Bildschirm, auf dem Sie einen KI-Agenten verbinden.

**Zustand der App.** Die Karte prüft Zugriff, Google-Verbindungseinstellungen, PageSpeed-Schlüssel, Laufzeitumgebung und Datenbank dieser Installation. Bestandene Prüfungen bestätigen weder eine fehlerfreie Website noch aktuelle Google-Daten. Eine Einstellung, die nicht gelesen werden konnte, gilt nicht als bestanden; lesen Sie dann die Warnung und wählen Sie **Status erneut prüfen**. Version und Prüfzeit stehen neben dem Ergebnis. **Zusammenfassung kopieren** kopiert den Status als Text.

**Hinweis zur Portnummer.** Öffnet sich das Windows-Paket auf einer anderen Portnummer, weil ein anderes Programm 3001 belegt (zum Beispiel eine alte Docker-Kopie), erscheint oben auf jedem Bildschirm der App ein gelber Streifen: „seowatcher läuft diesmal auf 3002, weil ein anderes Programm 3001 belegt (z. B. eine alte Docker-Kopie). Die Google-Anmeldung ist für 3001 eingerichtet; schließen Sie dieses Programm und starten Sie seowatcher neu.“ Derselbe Satz steht in der Karte **Zustand der App**, falls Sie die Meldung in der Taskleiste übersehen haben. Die Google-Anmeldung leitet nach 3001 zurück und schlägt deshalb fehl, solange die App auf 3002 läuft. Schließen Sie das Programm, das 3001 belegt, und wählen Sie im Tray-Menü **Yeniden başlat** (Neu starten). Die App kehrt zu 3001 zurück, und der Streifen verschwindet. Die Schließen-Schaltfläche im Streifen blendet ihn nur für diesen Tab aus.

**Projekte.** Sie sehen den Zustand der Search-Console- und der Analytics-Verbindung jedes Projekts. **Verbindungen öffnen** führt Sie zu den Projekteinstellungen.

**Häufige Probleme.** Sechs aufklappbare Abschnitte behandeln diese Fälle: Die Seite öffnet sich nicht oder die App ist geschlossen; der Port ist belegt; der Agent kann sich nicht verbinden (401); die Geschwindigkeitsmessung bricht ab (429); es gibt keine Suchanfragedaten; eine geänderte Einstellung wird nicht übernommen. Jeder Abschnitt nennt die Lösung und verlinkt die passende Einstellung.

**Google- und Systemlimits.** Mit **Limits anzeigen** sehen Sie, wo Sie bei Googles Tagesgrenzen gerade stehen.

**Untere Liste.** Sie enthält Abkürzungen zu den Protokolldateien und zur Statusadresse (`/api/health`). Beim Windows-Paket öffnen Sie die Protokolle über **Günlükleri aç** (Protokolle öffnen) im Menü der Taskleiste. Bei Docker verwenden Sie den Befehl, den **Befehl kopieren** liefert.

## So gehen Sie vor

1. Funktioniert etwas nicht, öffnen Sie zuerst diesen Bildschirm und lesen Sie die Warnung auf der Karte.
2. Klicken Sie auf die Schaltfläche neben der Warnung. Ändern Sie die Einstellung, kehren Sie zurück und klicken Sie auf **Status erneut prüfen**.
3. Bestehen die Installationsprüfungen, das Problem bleibt aber bestehen, lesen Sie **Häufige Probleme** und öffnen Sie den betreffenden Projektbildschirm.
4. Ist es immer noch nicht gelöst, klicken Sie auf **Diagnosepaket herunterladen** und hängen Sie die Datei an den Fehlerbericht auf GitHub. Beim Windows-Paket erledigt **Sorunu bildir (GitHub)** (Problem melden (GitHub)) im Menü der Taskleiste dasselbe mit einem Klick.

## Häufige Fragen

**Warum ist die Zeile „Google-Anmeldung“ gelb?** Es sind noch keine Google-Zugangsdaten gespeichert. Die Zeile bleibt gelb, bis Google verbunden ist; folgen Sie der Anleitung [Mit Google verbinden](/docs/google-baglantisi/).

**In der Zeile „Anmeldung und Zugriff“ steht „ein Benutzer ohne Passwort“.** Das ist so vorgesehen: Die App ist nur auf Ihrem eigenen Computer erreichbar. Wollen Sie sie im Netzwerk freigeben, schalten Sie selbst eine gesicherte Anmeldung davor.

**Was steht im Diagnosepaket?** Version, Installationsprüfungen, Tabellenzahlen sowie Phasen- und Fehlerzusammenfassungen der letzten 25 Audits. PageSpeed-Fehler werden ohne Seiten-URLs zusammengefasst. Geheimnisse und Passwörter sind nicht enthalten, Projektnamen, Domains und Google-Property-IDs dagegen schon. Prüfen Sie die Datei vor dem Senden.

## Grenzen

Dieser Bildschirm prüft nur die Installation. Probleme auf Ihrer Website zeigt das **Website-Audit**, Probleme bei der Aufnahme in Google der Reiter **Indexstatus**.

## Welcher Bildschirm hilft?

Die [Übersicht](/docs/panel/) fasst Einrichtung und Daten des ausgewählten Projekts zusammen. [Chancen](/docs/firsatlar/) hilft bei der Auswahl von Aufgaben anhand von Search-Console-Daten. Die [Ranking-Verfolgung](/docs/siralama-takibi/) zeigt durchschnittliche Positionen Ihrer Suchanfragen aus dem lokalen Archiv, keine Live-Suchergebnisse. Fehlen Daten, prüfen Sie Projektverbindungen, Zeitraum und die Hinweise zur Datenabdeckung; ein guter Installationsstatus bestätigt diese Berichte nicht.

Bei Websites mit wenig Suchverkehr blendet Google manche Suchanfragen aus. Die Liste kann leer sein oder weniger Klicks als die Seitensummen zeigen. Das allein bedeutet keinen Verbindungsfehler.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/quotas/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
