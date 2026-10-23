---
title: Versionshinweise
description: Neu in seowatcher 2.4.3: Windows-Installation mit einer Datei, Selbstaktualisierung, schlichtere Bildschirme und eine Website in sechs Sprachen.
updated: 2026-10-23
---

Die neueste Version ist **2.4.3** vom 23. Oktober 2026. Beim Aktualisieren bleiben Ihre Daten erhalten; das Windows-Paket installiert neue Versionen selbst.

## Das Wichtigste

- **Startet auch auf einem frischen Computer.** Die fehlende Windows-Komponente liegt dem Installationsprogramm bei; die App läuft deshalb schon beim ersten Start.
- **Aktualisiert sich selbst.** Sie lädt die neue Version herunter, prüft sie und installiert sie im Hintergrund. **Güncelle** (Aktualisieren) steht im Taskleistenmenü jederzeit bereit.
- **Schlichtere Bildschirme.** Jeder leere Bildschirm zeigt genau einen nächsten Schritt; Menüs und Texte wurden sprachlich überarbeitet.
- **Neues Aussehen.** Schwarze Flächen, ein orangefarbener Akzent und das Augen-Logo; App und Website sehen jetzt gleich aus.
- In der Assistenten-Einrichtung steht „Sıfırdan kurulum“ (Neuinstallation) für Erstnutzer jetzt ganz oben.
- Der Eintrag Güncelle zeigt Prüfung, Download-Prozent und Installation.

## Windows

- **Start auf einem frischen Computer.** Das Installationsprogramm bringt die Microsoft Visual C++ Runtime mit und installiert sie einmal mit Ihrer Erlaubnis, falls sie fehlt.
- **Aktualisieren.** Immer im Taskleistenmenü. Gibt es eine neue Version, wird sie installiert, sonst meldet die App „Güncel“ (Aktuell).
- **Installation reparieren.** Löscht temporäre Dateien, prüft das Paket und öffnet die App neu.
- **Problem melden.** Öffnet einen vorbereiteten Eintrag. Benutzernamen, Website-Namen und E-Mail-Adressen werden maskiert.
- **Installationsprogramm mit Versionsnummer.** Dateiname und Einrichtungsassistent zeigen die installierte Version.

## Die App

- **Seitenmenü.** Die Gruppen heißen „Arama ve site“ (Suche und Website) und „Ajan“ (Assistent); Hilfe und Einstellungen stehen unten.
- **Assistent einrichten.** Eine Karte und eine Kopierschaltfläche für Claude Code, Codex oder jeden anderen Assistenten.
- **Einstellungen.** Die Google-Verbindung wird in drei Schritten erklärt; das Design ist standardmäßig dunkel.
- **Für beide Installationsarten.** Hilfe und Assistenten-Anleitungen beschreiben unter Windows die Taskleiste und unter Docker die `docker compose`-Befehle.

## Website und Anleitung

- **Sechs Sprachen.** Türkisch, Englisch, Deutsch, Französisch, Italienisch und Portugiesisch, mit Flaggenmenü.
- **Klare Sprache.** Kurze Sätze, und jeder Fachbegriff wird beim ersten Vorkommen erklärt.

## Korrekturen

- Der Download-Link auf der Website zeigte auf das falsche Release-Tag.
- Unter Git Bash entfernte der Codex-Einrichtungsbefehl den Zeilenumbruch am Ende des Passworts nicht.
- Auf einer Karte des Website-Audits liefen die Zahlen über den Rand.
- Wenn nur ein Dienstkonto verbunden war, meldete die Übersicht fälschlich einen fehlenden Google-Zugriffsschlüssel.
- Auf dem Smartphone ließen sich das Website-Audit und die Chancen seitlich verschieben.

Die vollständige Historie steht in [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) auf GitHub.
