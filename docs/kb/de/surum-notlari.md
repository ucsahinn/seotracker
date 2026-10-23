---
title: Versionshinweise
description: Was sich in seowatcher 2.4.1 geändert hat. Installation mit einer Datei unter Windows, eine App, die sich selbst aktualisiert, schlichtere Bildschirme und eine Website in sechs Sprachen.
updated: 2026-10-23
---

Die neueste Version ist **2.4.1** vom 23. Oktober 2026. Beim Aktualisieren bleiben Ihre Daten erhalten; das Windows-Paket installiert neue Versionen selbst.

## Das Wichtigste

- **Startet auf jedem Computer.** Die fehlende Windows-Komponente ist im Installationsprogramm enthalten, die App läuft also auch auf einem frischen Rechner beim ersten Mal.
- **Aktualisiert sich selbst.** Sie lädt die neue Version herunter, prüft sie und installiert sie im Hintergrund. **Güncelle** (Aktualisieren) im Taskleistenmenü ist immer einen Klick entfernt.
- **Schlichtere Bildschirme.** Jeder leere Bildschirm zeigt genau einen nächsten Schritt; Menüs und Texte lesen sich natürlich.
- **Ein neues Gesicht.** Schwarze Flächen, ein orangefarbener Akzent und das Augen-Logo; App und Website sehen jetzt gleich aus.

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
- **Kennt beide Installationen.** Hilfe und Assistenten-Anleitungen beschreiben unter Windows die Taskleiste und unter Docker die `docker compose`-Befehle.

## Website und Anleitung

- **Sechs Sprachen.** Türkisch, Englisch, Deutsch, Französisch, Italienisch und Portugiesisch, mit Flaggenmenü.
- **Klare Sprache.** Kurze Sätze, und jeder Fachbegriff wird beim ersten Vorkommen erklärt.

## Korrekturen

- Der Download-Link auf der Website zeigte auf das falsche Release-Tag.
- Unter Git Bash entfernte der Codex-Einrichtungsbefehl den Zeilenumbruch am Ende des Passworts nicht.
- Auf einer Karte des Website-Audits liefen die Zahlen über den Rand.

Die vollständige Historie steht in [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) auf GitHub.
