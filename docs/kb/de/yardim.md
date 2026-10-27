---
title: Hilfe
description: Der Bildschirm prüft Ihre Installation, zeigt Lösungen für häufige Probleme und bereitet die Datei für eine Problemmeldung vor.
screen: Yardım
route: /support
updated: 2026-10-27
---

Die Oberfläche der App gibt es in sechs Sprachen: Türkisch, Englisch, Deutsch, Französisch, Italienisch und Portugiesisch. Die Sprache lässt sich unter Einstellungen → Darstellung → Sprache ändern. Diese Anleitung nennt Schaltflächen und Bildschirme so, wie sie in der deutschen Oberfläche heißen. Das Windows-Tray-Menü gibt es nur auf Türkisch. Dort steht der türkische Name mit der deutschen Bedeutung in Klammern.

Wenn etwas schiefgeht, sehen Sie zuerst hier nach. Dieser Bildschirm prüft Ihre Installation, sagt, was fehlt, und führt Sie zur richtigen Einstellung.

## Was auf dem Bildschirm zu sehen ist

**Schnellaktionen.** Die Schaltflächen oben:

- **Status erneut prüfen**: aktualisiert die Karte darunter.
- **Diagnosepaket herunterladen**: lädt die Datei herunter, die Sie bei einer Problemmeldung senden. Sie enthält keine geheimen Werte.
- **Anleitung öffnen**: öffnet die Anleitung auf seowatcher.io.
- **seowatcher.io**: öffnet die Website der App; dort liegen die Download-Seite und die Anleitung.
- **Versionshinweise**: führt zu den Versionshinweisen in den Einstellungen (Einstellungen).
- **Einrichtungs-Prompt kopieren**: kopiert den Text, den Sie in Ihren KI-Assistenten (in der App „der Agent“, Agent) einfügen.
- **Agent-Einrichtung**: führt zum Bildschirm für die Assistenten-Verbindung.

**Zustand der App.** Die Karte betrachtet diese Installation selbst. Die Einrichtungsliste eines Projekts steht in der Übersicht und in den Projektinfos, nicht hier. Die Karte prüft vier Dinge: **Anmeldung und Zugriff**, **Google-Anmeldung**, **PageSpeed-Schlüssel**, **Datenbank**. Oben steht „Alles ist in Ordnung.“ oder „N Punkte erfordern Ihre Aufmerksamkeit.“. Darunter sehen Sie die Versionszeile („Sürüm X, güncel.“ (Version X, aktuell.) oder „yeni sürüm Y var“ (neue Version Y verfügbar)) und die Zeit der letzten Prüfung. Die Schaltfläche neben einer auffälligen Zeile führt Sie zur passenden Einstellung: **Einstellungen öffnen** oder **Schlüssel eingeben**. **Zusammenfassung kopieren** legt den Text der Karte in die Zwischenablage.

**Hinweis zur Portnummer.** Öffnet sich das Windows-Paket auf einer anderen Portnummer, weil ein anderes Programm 3001 belegt (zum Beispiel eine alte Docker-Kopie), erscheint oben auf jedem Bildschirm der App ein gelber Streifen: „seowatcher läuft diesmal auf 3002, weil ein anderes Programm 3001 belegt (z. B. eine alte Docker-Kopie). Die Google-Anmeldung ist für 3001 eingerichtet; schließen Sie dieses Programm und starten Sie seowatcher neu.“ Der Streifen ist da, falls Sie die Meldung in der Taskleiste übersehen haben. Die Google-Anmeldung kehrt zur Adresse 3001 zurück und schlägt fehl, wenn Sie die App auf 3002 geöffnet haben. Die Schließen-Schaltfläche rechts im Streifen blendet ihn für diesen Reiter aus. Derselbe Satz steht auch in der Karte **Zustand der App**. Zur Lösung schließen Sie das Programm, das 3001 belegt, und wählen dann im Tray-Menü **Yeniden başlat** (Neu starten). Die App kehrt zu 3001 zurück und der Streifen verschwindet. Nutzt kein anderes Programm den Port, kehrt die App beim nächsten Start ohnehin zu 3001 zurück.

**Projekte.** Sie sehen den Zustand der Search-Console- und der Analytics-Verbindung jedes Projekts. **Verbindungen öffnen** führt Sie zu den Projekteinstellungen.

**Häufige Probleme.** Es gibt sechs aufklappbare Überschriften: Seite öffnet sich nicht oder die App ist geschlossen, der Port ist belegt, mein Agent kann keine Verbindung herstellen (401), Geschwindigkeitsmessung bricht ab (429), keine Suchanfragedaten und ich habe eine Einstellung geändert, und die App übernimmt sie nicht. Bei jeder steht, was Sie tun, mit einem Link zur passenden Einstellung.

**Google- und Systemgrenzen.** Mit **Limits anzeigen** sehen Sie, wo Sie bei Googles Tagesgrenzen gerade stehen.

**Untere Liste.** Es gibt Abkürzungen zu den Protokolldateien und zur Statusadresse (`/api/health`). Beim Windows-Paket öffnen Sie die Protokolle über **Günlükleri aç** (Protokolle öffnen) im Menü der Taskleiste. Bei Docker verwenden Sie den Befehl, den **Befehl kopieren** liefert.

## So gehen Sie vor

1. Funktioniert etwas nicht, öffnen Sie zuerst diesen Bildschirm und lesen Sie die Warnung auf der Karte.
2. Klicken Sie auf die Schaltfläche neben der Warnung, sie führt Sie zur richtigen Einstellung. Nehmen Sie die Einstellung vor, kehren Sie zurück und klicken Sie auf **Status erneut prüfen**.
3. Sagt die Karte „Alles ist in Ordnung.“, das Problem besteht aber weiter, sehen Sie in die Überschriften unter **Häufige Probleme**.
4. Ist es immer noch nicht gelöst, klicken Sie auf **Diagnosepaket herunterladen** und hängen Sie die Datei an den Fehlerbericht auf GitHub. Beim Windows-Paket erledigt **Sorunu bildir (GitHub)** (Problem melden (GitHub)) im Menü der Taskleiste dasselbe mit einem Klick.

## Häufige Fragen

**Warum ist die Zeile „Google-Anmeldung“ gelb?** Es wurde noch kein Google-Zugangsschlüssel eingetragen. Solange Google nicht verbunden ist, bleibt die Zeile gelb. Folgen Sie der Anleitung zur Google-Verbindung.

**In der Zeile „Anmeldung und Zugriff“ steht „ein Benutzer ohne Passwort“.** Das ist normal. Die App öffnet sich nur von Ihrem eigenen Computer aus. Wollen Sie sie im Netz erreichbar machen, müssen Sie selbst eine gesicherte Anmeldung davorschalten.

**Was steht im Diagnosepaket?** Version, Installationsprüfungen, Tabellenzahlen sowie Phasen- und Fehlerzusammenfassungen der letzten 25 Audits. PageSpeed-Fehler werden ohne Seiten-URLs zusammengefasst. Geheimnisse und Passwörter fehlen; Projektnamen, Domains und Google-Property-IDs können enthalten sein. Prüfen Sie die Dateien vor dem Senden.

## Grenzen

Dieser Bildschirm prüft nur die Installation selbst. Ein Problem auf Ihrer Website finden Sie mit dem Bildschirm **Website-Audit**, ein Problem auf Googles Seite mit dem Bildschirm **Indexstatus**.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/support/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
