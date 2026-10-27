---
title: Einstellungen
description: Design, Google-Zugangsschlüssel, PageSpeed-Schlüssel, Nutzungsgrenzen und Update-Prüfung, gültig für die gesamte Installation.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Auf dem Bildschirm **Einstellungen** stellen Sie alles ein, was die gesamte Installation betrifft. Einstellungen, die nur ein Projekt betreffen (Name, Domain, Property in der Search Console und in Analytics), stehen auf der Seite **Projekteinstellungen** jedes Projekts. Hier verwalten Sie den Zugangsschlüssel für die Verbindung mit Google, den PageSpeed-Schlüssel, das Design und die Update-Prüfung. Links gibt es die Bereiche **Darstellung**, **Google**, **Dienstkonto**, **Geschwindigkeitstests**, **Limits**, **Info** und **Windows**. In der Überschrift jedes Bereichs steht ein Kennzeichen, das seinen Zustand zeigt.

## Was auf dem Bildschirm zu sehen ist

**Darstellung.** Für das **Design** gibt es System, Hell und Dunkel. Die Wahl wird in diesem Browser gespeichert. In einem anderen Browser oder auf einem anderen Computer wählen Sie sie gesondert.

**Sprache.** Die App bietet Türkisch, Englisch, Deutsch, Französisch, Italienisch und Portugiesisch. Unter **Einstellungen → Darstellung → Sprache** wählen Sie **Türkçe**, **English**, **Deutsch**, **Français**, **Italiano** oder **Português**; die Seite lädt in der neuen Sprache neu. Jede Sprache steht unter ihrem eigenen Namen, Sie finden Ihre also auch, wenn Sie die aktuelle nicht lesen können. Solange Sie nichts wählen, folgt die App der Sprache Ihres Browsers. Wünscht der Browser keine dieser Sprachen, öffnet sich die App auf Englisch. Gibt der Browser gar keine Sprache an, öffnet sie sich auf Türkisch. Die Wahl wird wie das Design in diesem Browser gespeichert. Es ändert sich nur die Oberfläche der App. Das Windows-Tray-Menü bleibt türkisch.

**Benachrichtigungen.** Die Glocke in der Seitenleiste zeigt die letzten 50 Ereignisse und die Zahl ungelesener Meldungen. **Alle als gelesen markieren** lässt den Verlauf bestehen. Prüfergebnisse, neue Versionen, Probleme mit der Google-Verbindung, Berichte und Indexabfragen erscheinen hier. Solange die App geöffnet ist, erscheint ein neues Ereignis in einem eigenen kleinen Fenster der App. Steht der Reiter im Hintergrund, bleibt das Ereignis nur im Verlauf der Glocke. Die App sendet keine Windows- oder Browser-Benachrichtigungen, damit dasselbe Ereignis nie in zwei überlappenden Fenstern erscheint. Sehen Sie sich gerade den Bildschirm eines Audits an, wird dessen Abschlussfenster nicht zusätzlich gezeigt, weil der Bildschirm das Ende ohnehin zeigt. **Benachrichtigungston** spielt bei wichtigen Ereignissen einen kurzen Ton; mit **Ton anhören** probieren Sie ihn aus. **In-App-Benachrichtigung testen** erzeugt eine Testbenachrichtigung samt Ton. Visuelle Animationen folgen der Systemeinstellung für reduzierte Bewegung; der Ton hat eine eigene Einstellung.

**Windows.** Hier können Sie den Start mit Windows und die automatische Update-Installation ein- oder ausschalten. Es sind dieselben gespeicherten Einstellungen wie im Tray-Menü. Administratorbeschränkungen werden neben der Option erklärt. In Docker- und Entwickler-Installationen sind die Optionen deaktiviert; ältere Windows-Starter zeigen einen Hinweis zum Paket-Update.

Lässt sich eine Einstellung nicht speichern, nennt der Bildschirm den Grund und was zu tun ist. Da dieser Bereich mit der App in der Taskleiste spricht, kommen die Fehler von dieser App:

- **Die Tray-App hat nicht innerhalb von 4 Sekunden geantwortet.** Kommt der Computer gerade aus dem Ruhezustand, klicken Sie nach ein paar Sekunden auf **Erneut versuchen**. Bleibt der Fehler, wählen Sie im Tray-Menü **Çıkış** (Beenden) und öffnen die App erneut.
- **Keine Verbindung zum Einstellungsdienst der Tray-App.** Die Tray-App wurde möglicherweise beendet. Öffnen Sie seowatcher erneut über das Startmenü.
- **Diese Einstellung wurde von einem Administrator gesperrt.** Nur der Administrator des Computers kann sie ändern. Das ist normal, wenn die Installation für alle Benutzer erfolgte.
- **Die Tray-App hat diese Anfrage nicht erkannt.** Server und Tray-App stammen möglicherweise aus verschiedenen Sitzungen. Wählen Sie im Tray-Menü **Çıkış** (Beenden) und öffnen die App erneut.
- **Die Tray-App hat die Einstellungsanfrage abgelehnt.** Starten Sie die App über das Tray-Menü neu. Bleibt der Fehler, aktualisieren Sie das Windows-Paket.
- **Die Tray-App hat eine unbekannte Antwort geliefert.** App- und Tray-Version passen möglicherweise nicht zusammen. Aktualisieren Sie das Windows-Paket.

Öffnet sich der Bereich gar nicht und meldet, die Windows-Einstellungen seien nicht erreichbar, prüfen Sie, ob die Tray-App läuft.

**Google.** Das Kennzeichen hat einen von drei Werten: **Gespeichert**, **Aus Umgebungsvariablen übernommen** (Kommt aus der Umgebung; bei Docker über die Datei `.env` angegeben) oder **Fehlt**. Der Bereich zeigt die beiden Weiterleitungsadressen, die Sie in der Google Cloud Console (Googles Entwicklerbereich) eintragen. Daneben stehen Schaltflächen zum Kopieren. Sie müssen beide eintragen. Tragen Sie die Analytics-Adresse nicht ein, wird nur die Search Console verbunden.

Es gibt zwei Felder: **Client-ID** und **Client-Secret**. Beide sind Teile des Zugangsschlüssels, den Sie von Google erhalten. Die Schaltflächen sind: **Speichern**, **Abbrechen**, **Ändern** und **Löschen**. **Löschen** trennt bestehende Verbindungen. Die Einrichtung Schritt für Schritt finden Sie in der Anleitung zur Google-Verbindung.

**Dienstkonto (der kürzere Weg).** Ein Dienstkonto ist ein technisches Konto, das bei Google für die App angelegt wird. In das Feld **Schlüsseldatei des Dienstkontos (JSON)** fügen Sie den Inhalt der Datei ein, die Sie aus Google Cloud heruntergeladen haben. Ist es gespeichert, sehen Sie die E-Mail-Adresse des Kontos. Der Bildschirm nennt, wo Sie diese Adresse eintragen:

- Search Console: „Einstellungen → Nutzer und Berechtigungen → Nutzer hinzufügen“, Berechtigung Tam (Voll).
- Analytics: „Verwaltung → Zugriffsverwaltung“, Berechtigung Görüntüleyen (Betrachter).

Das Kennzeichen lautet **Gespeichert** oder **Nicht verwendet**. Gibt es ein gespeichertes Dienstkonto, bevorzugt die App es gegenüber dem Google-Zugangsschlüssel. Löschen entfernt das Konto aus der App, widerruft aber nicht den Schlüssel bei Google. Ist im Abschnitt **Google** keine Client-ID eingetragen, aber ein Dienstkonto verbunden, zeigt das Kennzeichen des Abschnitts **Google** ein neutrales **Nicht verwendet, ein Dienstkonto ist verbunden** statt eines gelben **Fehlt**. Google arbeitet dann über das Dienstkonto.

**Geschwindigkeitsmessung.** Es gibt das Feld **API-Schlüssel** und die Schaltfläche **Schlüssel testen**. Der Test „verbraucht 1 Messung“. Sie können ihn alle zehn Sekunden anklicken. Das Kennzeichen lautet **Schlüssel gespeichert**, **Aus einer Umgebungsvariablen übernommen** oder **Schlüssel fehlt**. Einzelheiten stehen in der Anleitung zum PageSpeed-Schlüssel.

**Grenzen.** Auf den Karten „Google- und Systemlimits“ stehen:

- URL-Prüfung (Search Console): 2.000 pro Tag.
- PageSpeed Insights.
- GA4 (Google Analytics), tägliche und stündliche Kontingenteinheiten: standardmäßig 200.000 und 40.000. Google nennt nicht den Verbrauch, sondern nur, wie viel übrig ist.
- Seitengrenze pro Audit: 10.000.
- Berichte pro Projekt: 10.000, Vorlagen: 10.
- Größter Bericht: 500.000 Byte.

Der Zustand jeder Karte ist **Ausreichend**, **Wird knapp** (ab 70 Prozent), **Fast aufgebraucht** (ab 90 Prozent) oder **Unbekannt**.

**Info.** Die Zeile **Version** zeigt die installierte Version (zum Beispiel 0.8.0 Alpha). Der Schalter **Nach Updates suchen** ist standardmäßig eingeschaltet. Ist er an, fragt die App alle sechs Stunden bei GitHub nach der neuesten Version. Dann erscheint auch die Schaltfläche **Jetzt prüfen**. Die Tray-App des Windows-Pakets führt zusätzlich eine eigene Prüfung durch, einmal am Tag. Gibt es eine neue Version, erscheint ein Link **Änderungen** und bei Docker-Installationen ein Befehl zum Kopieren: `git pull && docker compose up -d --build`. Beim Windows-Paket verweist der Bildschirm auf **Güncelle** (Aktualisieren) im Menü des Taskleisten-Symbols (das Tray-Menü gibt es nur auf Türkisch). Ist das automatische Update an, wird die neue Version von selbst installiert.

Die Prüfung meldet eines davon: eine neue Version ist erschienen, „Sie verwenden die neueste Version.“ oder ein Problem. Ist GitHub nicht erreichbar, steht dort „GitHub war bei der letzten Prüfung nicht erreichbar“, dazu die zuletzt bekannte Version mit dem Datum der letzten erfolgreichen Prüfung. Das heißt, es konnte nicht bestätigt werden, ob Ihre Version aktuell ist. Prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut. Steht dort „Die Versionsquelle ist nicht erreichbar: Das Repository wurde nicht gefunden oder ist privat (GitHub 404)“, liegt das Problem nicht bei Ihnen. Laden Sie auf dem Bildschirm **Hilfe** das Diagnosepaket herunter und melden Sie es. Ist der Schalter aus, steht dort „Die Updateprüfung ist deaktiviert; es werden keine Anfragen an GitHub gesendet.“

**Versionshinweise.** Die Versionshinweise stehen als eigene Seite über den Benachrichtigungen im Seitenmenü. Farbige Etiketten zeigen Neuerungen, Korrekturen und Sicherheitsänderungen.

## So gehen Sie vor

1. Tragen Sie bei der ersten Einrichtung zuerst im Bereich **Google** die Client-ID und den geheimen Schlüssel ein. Tragen Sie dann im Bereich **Geschwindigkeitstests** den PageSpeed-Schlüssel ein. Sind beide gespeichert, wechseln Sie ins Projekt und wählen die Property.
2. Sehen Sie einmal im Monat in den Bereich **Limits**. Das Kontingent, das „Wird knapp“ zeigt, ist meist die Grenze der URL-Prüfung.
3. Gibt es im Bereich **Info** eine neue Version, aktualisieren Sie. Die Versionshinweise sagen, was sich geändert hat. Die Update-Prüfung ist die einzige Verbindung Ihres Computers nach außen, die nicht zu Google führt. Wollen Sie das nicht, schalten Sie den Schalter aus.
4. Müssen Sie den Google-Zugangsschlüssel ändern (zum Beispiel bei einem neuen Cloud-Projekt), klicken Sie auf **Ändern** und fügen die neuen Werte ein. Bestehende Verbindungen funktionieren mit dem neuen Schlüssel nicht; in den Projekten müssen Sie **Erneut verbinden** wählen.

## Häufige Fragen

**Warum sehe ich meinen geheimen Schlüssel nicht auf dem Bildschirm?** Die App speichert ihn verschlüsselt und sendet ihn nicht an den Browser zurück. Der Bildschirm zeigt nur, dass er gespeichert ist, und die Client-ID.

**Welcher Wert gilt, wenn `.env` (Docker) und der Bildschirm unterschiedliche Angaben enthalten?** Der Wert vom Bildschirm hat Vorrang. Speichern Sie einen Wert, während das Kennzeichen „Aus Umgebungsvariablen übernommen“ zeigt, wird ab dann dieser verwendet.

**Was sendet die Update-Prüfung?** Sie sendet keine Daten. Sie liest die öffentliche Versionsliste von GitHub. Die Anfrage ist anonym.

**Dienstkonto oder Google-Zugangsschlüssel?** Das Dienstkonto erspart Ihnen den Zustimmungsbildschirm und läuft nicht ab. Dafür müssen Sie diesem Konto in der Search Console und in Analytics von Hand die Berechtigung geben. Für eine Installation mit einer Person geht beides. Sehen Sie oft „süresi doldu“ (abgelaufen), wechseln Sie zum Dienstkonto.

## Grenzen

Der Bildschirm **Einstellungen** ändert nicht die Portnummer, den Datenordner oder Netzwerkeinstellungen. Diese stehen beim Windows-Paket in `config.json`, bei Docker in der Datei `.env`. Eine Verwaltung von Benutzern und Passwörtern gibt es nicht, die App ist für eine Person gedacht. Die Kontingentkarten sind nicht Googles echter Zähler, sondern die eigene Zählung der App. URL-Prüfungen, die Sie in der Search Console von Hand vornehmen, erscheinen hier nicht, verbrauchen aber Googles Grenze.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
