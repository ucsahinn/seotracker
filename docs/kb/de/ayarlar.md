---
title: Einstellungen
description: Design, Google-Zugangsschlüssel, PageSpeed-Schlüssel, Nutzungsgrenzen und Update-Prüfung, gültig für die gesamte Installation.
screen: Ayarlar
route: /settings
updated: 2026-10-22
---

Auf dem Bildschirm **Ayarlar** (Einstellungen) stellen Sie alles ein, was die gesamte Installation betrifft. Einstellungen, die nur ein Projekt betreffen (Name, Domain, Property in der Search Console und in Analytics), stehen auf der Seite **Proje ayarları** (Projekteinstellungen) jedes Projekts. Hier verwalten Sie den Zugangsschlüssel für die Verbindung mit Google, den PageSpeed-Schlüssel, das Design und die Update-Prüfung. Links gibt es die Bereiche **Görünüm** (Darstellung), **Google**, **Hizmet hesabı** (Dienstkonto), **Hız ölçümü** (Geschwindigkeitsmessung), **Sınırlar** (Grenzen), **Hakkında** (Über) und **Sürüm notları** (Versionshinweise). In der Überschrift jedes Bereichs steht ein Kennzeichen, das seinen Zustand zeigt.

## Was auf dem Bildschirm zu sehen ist

**Görünüm.** Für das **Tema** (Design) gibt es System, Hell (Açık) und Dunkel (Koyu). Die Wahl wird in diesem Browser gespeichert. In einem anderen Browser oder auf einem anderen Computer wählen Sie sie gesondert.

**Google.** Das Kennzeichen hat einen von drei Werten: **Kayıtlı** (Gespeichert), **Ortamdan geliyor** (Kommt aus der Umgebung; bei Docker über die Datei `.env` angegeben) oder **Eksik** (Fehlt). Der Bereich zeigt die beiden Weiterleitungsadressen, die Sie in der Google Cloud Console (Googles Entwicklerbereich) eintragen. Daneben stehen Schaltflächen zum Kopieren. Sie müssen beide eintragen. Tragen Sie die Analytics-Adresse nicht ein, wird nur die Search Console verbunden.

Es gibt zwei Felder: **İstemci kimliği** (Client-ID) und **Gizli anahtar** (Geheimer Schlüssel). Beide sind Teile des Zugangsschlüssels, den Sie von Google erhalten. Die Schaltflächen sind: **Kaydet** (Speichern), **Vazgeç** (Abbrechen), **Değiştir** (Ändern) und **Sil** (Löschen). **Sil** trennt bestehende Verbindungen. Die Einrichtung Schritt für Schritt finden Sie in der Anleitung zur Google-Verbindung.

**Dienstkonto (der kürzere Weg).** Ein Dienstkonto ist ein technisches Konto, das bei Google für die App angelegt wird. In das Feld **JSON anahtar dosyası** (JSON-Schlüsseldatei) fügen Sie den Inhalt der Datei ein, die Sie aus Google Cloud heruntergeladen haben. Ist es gespeichert, sehen Sie die E-Mail-Adresse des Kontos. Der Bildschirm nennt, wo Sie diese Adresse eintragen:

- Search Console: „Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle“ (Einstellungen → Nutzer und Berechtigungen → Nutzer hinzufügen), Berechtigung Tam (Voll).
- Analytics: „Yönetici → Erişim yönetimi“ (Verwaltung → Zugriffsverwaltung), Berechtigung Görüntüleyen (Betrachter).

Das Kennzeichen lautet **Kayıtlı** oder **Kullanılmıyor** (Wird nicht verwendet). Gibt es ein gespeichertes Dienstkonto, bevorzugt die App es gegenüber dem Google-Zugangsschlüssel. Löschen entfernt das Konto aus der App, widerruft aber nicht den Schlüssel bei Google.

**Geschwindigkeitsmessung.** Es gibt das Feld **API anahtarı** (API-Schlüssel) und die Schaltfläche **Anahtarı test et** (Schlüssel testen). Der Test „verbraucht 1 Messung“. Sie können ihn alle zehn Sekunden anklicken. Das Kennzeichen lautet **Anahtar kayıtlı** (Schlüssel gespeichert), **Ortam anahtarı** (Schlüssel aus der Umgebung) oder **Anahtar eksik** (Schlüssel fehlt). Einzelheiten stehen in der Anleitung zum PageSpeed-Schlüssel.

**Grenzen.** Auf den Karten „Google ve sistem sınırları“ (Google- und Systemgrenzen) stehen:

- URL-Prüfung (Search Console): 2.000 pro Tag.
- PageSpeed Insights.
- GA4 (Google Analytics), tägliche und stündliche Kontingenteinheiten: standardmäßig 200.000 und 40.000. Google nennt nicht den Verbrauch, sondern nur, wie viel übrig ist.
- Seitengrenze pro Audit: 10.000.
- Berichte pro Projekt: 10.000, Vorlagen: 10.
- Größter Bericht: 500.000 Byte.

Der Zustand jeder Karte ist **Yeterli** (Ausreichend), **Azalıyor** (Wird knapp; ab 70 Prozent), **Neredeyse doldu** (Fast voll; ab 90 Prozent) oder **Bilinmiyor** (Unbekannt).

**Hakkında.** Die Zeile **Sürüm** (Version) zeigt die Version (zum Beispiel v2.3.0). Der Schalter **Güncellemeleri kontrol et** (Updates prüfen) ist standardmäßig eingeschaltet. Ist er an, fragt die App höchstens einmal am Tag auf GitHub nach der neuesten Version. Dann erscheint auch die Schaltfläche **Şimdi kontrol et** (Jetzt prüfen). Gibt es eine neue Version, erscheint der Link **Değişiklikler** (Änderungen). Bei Docker-Installationen erscheint außerdem der Befehl zum Kopieren: `git pull && docker compose up -d --build`. Beim Windows-Paket verweist der Bildschirm Sie auf **Güncelle** (Aktualisieren) am Symbol in der Taskleiste. Ist die automatische Aktualisierung an, wird die neue Version von selbst installiert.

**Sürüm notları.** Der Bereich listet auf, was sich in jeder Version geändert hat.

## So gehen Sie vor

1. Tragen Sie bei der ersten Einrichtung zuerst im Bereich **Google** die Client-ID und den geheimen Schlüssel ein. Tragen Sie dann im Bereich **Hız ölçümü** den PageSpeed-Schlüssel ein. Sind beide gespeichert, wechseln Sie ins Projekt und wählen die Property.
2. Sehen Sie einmal im Monat in den Bereich **Sınırlar**. Das Kontingent, das „Azalıyor“ zeigt, ist meist die Grenze der URL-Prüfung.
3. Gibt es im Bereich **Hakkında** eine neue Version, aktualisieren Sie. Die Versionshinweise sagen, was sich geändert hat. Die Update-Prüfung ist die einzige Verbindung Ihres Computers nach außen, die nicht zu Google führt. Wollen Sie das nicht, schalten Sie den Schalter aus.
4. Müssen Sie den Google-Zugangsschlüssel ändern (zum Beispiel bei einem neuen Cloud-Projekt), klicken Sie auf **Değiştir** und fügen die neuen Werte ein. Bestehende Verbindungen funktionieren mit dem neuen Schlüssel nicht; in den Projekten müssen Sie **Yeniden bağlan** (Neu verbinden) wählen.

## Häufige Fragen

**Warum sehe ich meinen geheimen Schlüssel nicht auf dem Bildschirm?** Die App speichert ihn verschlüsselt und sendet ihn nicht an den Browser zurück. Der Bildschirm zeigt nur, dass er gespeichert ist, und die Client-ID.

**Welcher Wert gilt, wenn `.env` (Docker) und der Bildschirm unterschiedliche Angaben enthalten?** Der Wert vom Bildschirm hat Vorrang. Speichern Sie einen Wert, während das Kennzeichen „Ortamdan geliyor“ zeigt, wird ab dann dieser verwendet.

**Was sendet die Update-Prüfung?** Sie sendet keine Daten. Sie liest die öffentliche Versionsliste von GitHub. Die Anfrage ist anonym.

**Dienstkonto oder Google-Zugangsschlüssel?** Das Dienstkonto erspart Ihnen den Zustimmungsbildschirm und läuft nicht ab. Dafür müssen Sie diesem Konto in der Search Console und in Analytics von Hand die Berechtigung geben. Für eine Installation mit einer Person geht beides. Sehen Sie oft „süresi doldu“ (abgelaufen), wechseln Sie zum Dienstkonto.

## Grenzen

Der Bildschirm **Ayarlar** ändert nicht die Portnummer, den Datenordner oder Netzwerkeinstellungen. Diese stehen beim Windows-Paket in `config.json`, bei Docker in der Datei `.env`. Eine Verwaltung von Benutzern und Passwörtern gibt es nicht, die App ist für eine Person gedacht. Die Kontingentkarten sind nicht Googles echter Zähler, sondern die eigene Zählung der App. URL-Prüfungen, die Sie in der Search Console von Hand vornehmen, erscheinen hier nicht, verbrauchen aber Googles Grenze.

<!-- Kaynaklar: src/routes/_app/settings.tsx; src/routes/_app/settings/index.tsx; src/client/features/settings/SettingsIndex.tsx; sectionStatus.ts; ThemeSection.tsx; GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; PageSpeedKeySection.tsx; UpdateSection.tsx; WhatsNewSection.tsx; src/client/features/quotas/*; src/server/features/updates/UpdateCheckService.ts; src/server/features/quotas/QuotaService.ts; src/server/lib/secretBox.ts -->
