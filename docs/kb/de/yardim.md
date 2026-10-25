---
title: Hilfe
description: Der Bildschirm prüft Ihre Installation, zeigt Lösungen für häufige Probleme und bereitet die Datei für eine Problemmeldung vor.
screen: Yardım
route: /support
updated: 2026-10-22
---

Die Oberfläche der App ist auf Türkisch und Englisch verfügbar. Die Sprache lässt sich unter Ayarlar → Görünüm → Dil ändern. Diese Anleitung nennt jede Schaltfläche und jeden Bildschirmnamen auf Türkisch, mit der deutschen Bedeutung in Klammern.

Wenn etwas schiefgeht, sehen Sie zuerst hier nach. Dieser Bildschirm prüft Ihre Installation, sagt, was fehlt, und führt Sie zur richtigen Einstellung.

## Was auf dem Bildschirm zu sehen ist

**Schnellaktionen.** Die Schaltflächen oben:

- **Durumu yeniden kontrol et** (Status erneut prüfen): aktualisiert die Karte darunter.
- **Tanılama paketi indir** (Diagnosepaket herunterladen): lädt die Datei herunter, die Sie bei einer Problemmeldung senden. Sie enthält keine geheimen Werte.
- **Kılavuzu aç** (Anleitung öffnen): öffnet die Anleitung auf seowatcher.io.
- **seowatcher.io**: öffnet die Website der App; dort liegen die Download-Seite und die Anleitung.
- **Sürüm notları** (Versionshinweise): führt zu den Versionshinweisen in den Einstellungen (Ayarlar).
- **Kurulum istemini kopyala** (Einrichtungstext kopieren): kopiert den Text, den Sie in Ihren KI-Assistenten (in der App „ajan“, Agent) einfügen.
- **Ajan kurulumu** (Assistent einrichten): führt zum Bildschirm für die Assistenten-Verbindung.

**Zustand Ihrer Installation (Kurulumunuzun durumu).** Die Karte prüft vier Dinge: **Giriş ve erişim** (Anmeldung und Zugriff), **Google girişi** (Google-Anmeldung), **PageSpeed anahtarı** (PageSpeed-Schlüssel), **Veritabanı** (Datenbank). Oben steht „Her şey yolunda.“ (Alles in Ordnung.) oder „N şey dikkat istiyor.“ (N Dinge brauchen Aufmerksamkeit.). Darunter sehen Sie die Versionszeile („Sürüm X, güncel.“ (Version X, aktuell.) oder „yeni sürüm Y var“ (neue Version Y verfügbar)) und die Zeit der letzten Prüfung. Die Schaltfläche neben einer auffälligen Zeile führt Sie zur passenden Einstellung: **Ayarları aç** (Einstellungen öffnen) oder **Anahtar gir** (Schlüssel eingeben). **Özeti kopyala** (Zusammenfassung kopieren) legt den Text der Karte in die Zwischenablage.

**Projeler (Projekte).** Sie sehen den Zustand der Search-Console- und der Analytics-Verbindung jedes Projekts. **Bağlantıları aç** (Verbindungen öffnen) führt Sie zu den Projekteinstellungen.

**Häufige Probleme.** Es gibt fünf aufklappbare Überschriften: Seite öffnet sich nicht, Portnummer belegt, Assistent kann sich nicht verbinden (401), PageSpeed-Grenze, keine Suchanfragedaten. Bei jeder steht, was Sie tun, mit einem Link zur passenden Einstellung.

**Google- und Systemgrenzen.** Mit **Sınırları göster** (Grenzen anzeigen) sehen Sie, wo Sie bei Googles Tagesgrenzen gerade stehen.

**Untere Liste.** Es gibt Abkürzungen zu den Protokolldateien und zur Statusadresse (`/api/health`). Beim Windows-Paket öffnen Sie die Protokolle über **Günlükleri aç** (Protokolle öffnen) im Menü der Taskleiste. Bei Docker verwenden Sie den Befehl, den **Komutu kopyala** (Befehl kopieren) liefert.

## So gehen Sie vor

1. Funktioniert etwas nicht, öffnen Sie zuerst diesen Bildschirm und lesen Sie die Warnung auf der Karte.
2. Klicken Sie auf die Schaltfläche neben der Warnung, sie führt Sie zur richtigen Einstellung. Nehmen Sie die Einstellung vor, kehren Sie zurück und klicken Sie auf **Durumu yeniden kontrol et**.
3. Sagt die Karte „Her şey yolunda.“, das Problem besteht aber weiter, sehen Sie in die Überschriften unter **Sık sorunlar** (Häufige Probleme).
4. Ist es immer noch nicht gelöst, klicken Sie auf **Tanılama paketi indir** und hängen Sie die Datei an den Fehlerbericht auf GitHub. Beim Windows-Paket erledigt **Sorunu bildir (GitHub)** (Problem melden (GitHub)) im Menü der Taskleiste dasselbe mit einem Klick.

## Häufige Fragen

**Warum ist die Zeile „Google girişi“ gelb?** Es wurde noch kein Google-Zugangsschlüssel eingetragen. Solange Google nicht verbunden ist, bleibt die Zeile gelb. Folgen Sie der Anleitung zur Google-Verbindung.

**In der Zeile „Giriş ve erişim“ steht „parolasız tek kullanıcı“ (ein Benutzer ohne Passwort).** Das ist normal. Die App öffnet sich nur von Ihrem eigenen Computer aus. Wollen Sie sie im Netz erreichbar machen, müssen Sie selbst eine gesicherte Anmeldung davorschalten.

**Was steht im Diagnosepaket?** Version, Installationsprüfungen, Tabellenzahlen sowie Phasen- und Fehlerzusammenfassungen der letzten 25 Audits. PageSpeed-Fehler werden ohne Seiten-URLs zusammengefasst. Geheimnisse und Passwörter fehlen; Projektnamen, Domains und Google-Property-IDs können enthalten sein. Prüfen Sie die Dateien vor dem Senden.

## Grenzen

Dieser Bildschirm prüft nur die Installation selbst. Ein Problem auf Ihrer Website finden Sie mit dem Bildschirm **Site denetimi** (Website-Audit), ein Problem auf Googles Seite mit dem Bildschirm **Dizin durumu** (Indexstatus).

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/support/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
