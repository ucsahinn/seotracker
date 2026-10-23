---
title: Projekte
description: Sie legen Projekte an, wählen Website und Land, ändern den Namen und verwalten die Google-Verbindung. Ein Projekt können Sie archivieren und wiederherstellen.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-22
---

Sie legen Projekte an, ändern ihre Einstellungen und entfernen sie bei Bedarf. Jede Website ist ein Projekt. Jedes Projekt hat seine eigene Google-Verbindung, seine eigenen Audits und seine eigenen Berichte.

## Was auf dem Bildschirm zu sehen ist

**Projektauswahl.** Ein Klick auf den Projektnamen oben links öffnet Ihre Projekte. Unten stehen **Yeni proje** (Neues Projekt) und **Projeleri yönet** (Projekte verwalten). Das Zahnradsymbol daneben öffnet **Proje ayarları** (Projekteinstellungen). Haben Sie acht oder mehr Projekte, erscheint in der Liste ein Suchfeld.

**Seite „Projeler“ (Projekte).** In jeder Zeile sehen Sie den Namen und die Website des Projekts. Ein Projekt ohne Website zeigt „Site belirlenmemiş“ (Keine Website festgelegt). Beim geöffneten Projekt steht die Markierung **Etkin** (Aktiv). Ein Klick auf die Zeile öffnet die Einstellungen dieses Projekts. Archivierte Projekte stehen ganz unten im Abschnitt **Arşivlendi** (Archiviert). Mit **Geri al** (Wiederherstellen) kehren sie in die Liste zurück.

**Fenster „Neues Projekt“.** Es hat vier Felder:

- **Ad** (Name) ist Pflicht. Nur Sie sehen ihn; er erscheint in der Überschrift der Berichte und in der Projektauswahl. An Google wird er nicht gesendet.
- **Alan adı (isteğe bağlı)** (Domain, optional) ist die Adresse Ihrer Website, zum Beispiel `example.com`. Ein vorangestelltes `https://` und `www.` werden automatisch entfernt. Subdomains werden der Hauptdomain zugeordnet; `blog.example.com` und `example.com` sind also dasselbe Projekt.
- **Ülke** (Land) und **Dil** (Sprache) bestimmen, für welchen Markt die gespeicherten Suchbegriffe verfolgt werden. Wechseln Sie das Land, springt die Sprache auf die Sprache dieses Landes. Beides können Sie später ändern.

**Projekteinstellungen.** Es gibt zwei Reiter. Im Reiter **Genel** (Allgemein) stehen Name, Domain, Land und Sprache sowie der Abschnitt **Projeyi arşivle** (Projekt archivieren). Im Reiter **Bağlantılar** (Verbindungen) stehen die Karten für Search Console und Analytics.

## So gehen Sie vor

1. Klicken Sie in der Projektauswahl auf **Yeni proje**.
2. Geben Sie einen Namen und die Adresse Ihrer Website ein, wählen Sie Land und Sprache und klicken Sie auf **Proje oluştur** (Projekt erstellen). Das Projekt öffnet sich, und die Übersicht (Panel) erscheint. Es werden noch keine Daten abgerufen.
3. Wechseln Sie zu **Proje ayarları → Bağlantılar** und verbinden Sie die Search Console. Die Schritte stehen in der Anleitung zur Google-Verbindung. Sobald die Verbindung steht, beginnen sich Panel, Arama performansı (Suchleistung), Fırsatlar (Chancen) und Dizin durumu (Indexstatus) zu füllen.
4. Möchten Sie auch Analytics verbinden, nutzen Sie die Karte **Analytics** im selben Reiter. Ein eigener Google-Schlüssel ist dafür nicht nötig.
5. Um Namen oder Website zu ändern, korrigieren Sie das Feld im Reiter **Genel** und klicken auf **Değişiklikleri kaydet** (Änderungen speichern). Die Schaltfläche wird erst aktiv, wenn sich etwas geändert hat.

### Google-Verbindung ändern

Klicken Sie auf der Karte im Reiter **Bağlantılar** auf **Mülkü veya hesabı değiştir** (Property oder Konto wechseln). Sie können eine andere Website (bei Google „Property“, auf Türkisch „mülk“) oder ein anderes Google-Konto wählen. **Bağlantıyı kes** (Verbindung trennen) entfernt nur die Verbindung dieses Projekts. Ihr Google-Konto bleibt gespeichert, und es wird nicht nachgefragt. Um ein Google-Konto vollständig zu entfernen, nutzen Sie **Hesabı kaldır** (Konto entfernen) im Auswahlfenster. Das Fenster sagt Ihnen, welche Projekte betroffen sind.

### Projekt archivieren

Projekte werden nicht gelöscht, sondern archiviert. Die Schaltfläche **Projeyi arşivle** unten im Reiter **Genel** nimmt das Projekt aus der Liste. Audits, Suchbegriffe und Berichte bleiben unverändert erhalten. **Geri al** auf der Seite Projeler holt das Projekt genau so zurück, wie es war. Haben Sie nur ein einziges Projekt, können Sie es nicht archivieren.

## Wie die Zahlen berechnet werden

Auf diesem Bildschirm gibt es keine Zahlen. Beim Speichern der Domain gelten diese Regeln: Leerzeichen und Großbuchstaben werden bereinigt, und die Adresse muss eine echte Domain sein (IP-Adressen, `localhost` oder erfundene Endungen werden nicht angenommen). Bei einer falschen Eingabe erscheint die Warnung „Geçerli bir alan adı girin, örneğin acme.com.“ (Geben Sie eine gültige Domain ein, zum Beispiel acme.com.).

## Häufige Fragen

**Kann ich ein Projekt ganz löschen?** Nein, Sie können es nur archivieren. Die Daten bleiben erhalten, und Sie können es jederzeit wiederherstellen.

**Kann ich einem Projekt zwei Websites zuordnen?** Nein. Ein Projekt hat eine Search-Console-Property und eine Analytics-Property. Legen Sie für die zweite Website ein zweites Projekt an.

**Es gibt ein Projekt namens „Default“. Was ist das?** Beim ersten Start legt die App ein leeres Projekt an, damit sich die Bildschirme öffnen lassen. Sie können es umbenennen und verwenden. Oder Sie legen ein neues Projekt an und archivieren dieses.

**Ich habe das falsche Land gewählt.** Ändern Sie es im Reiter Genel. Die Positionen Ihrer gespeicherten Suchbegriffe werden ab diesem Zeitpunkt für das neue Land verfolgt.

## Grenzen

Die Zahl der Projekte ist nicht begrenzt. Ein Projekt anzulegen, startet nichts. Daten kommen erst, wenn Google verbunden ist. Haben Sie keine Domain eingegeben, tippen Sie die Adresse beim Start eines Audits von Hand ein.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
