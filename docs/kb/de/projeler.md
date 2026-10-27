---
title: Projekte
description: Projekte anlegen, Website und Land wählen, Namen ändern, Google-Verbindung verwalten, Projekte archivieren und wiederherstellen.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-27
---

Sie legen Projekte an, ändern ihre Einstellungen und entfernen sie bei Bedarf. Jede Website ist ein Projekt. Jedes Projekt hat seine eigene Google-Verbindung, seine eigenen Audits und seine eigenen Berichte.

## Was auf dem Bildschirm zu sehen ist

**Projektauswahl.** Ein Klick auf den Projektnamen oben links öffnet Ihre Projekte. Unten stehen **Neues Projekt** und **Projekte verwalten**. Das Zahnradsymbol daneben öffnet **Projekteinstellungen**. Haben Sie acht oder mehr Projekte, erscheint in der Liste ein Suchfeld.

**Seite „Projekte“.** In jeder Zeile sehen Sie den Namen und die Website des Projekts. Ein Projekt ohne Website zeigt „Keine Website hinzugefügt“. Haben Sie mehrere Projekte, trägt das geöffnete die Markierung **Aktiv**. Unter jeder Zeile steht eine kurze Übersicht des Projekts: die Klicks der letzten 28 Tage und die Veränderung gegenüber den vorherigen 28 (mit einer kleinen Linie), der Zeitpunkt der letzten Prüfung („Letzte Prüfung vor 3 Tagen“ oder „Noch keine Audits“) und ob Search Console und Analytics verbunden sind. Ein gefüllter Punkt heißt verbunden, ein leerer nicht verbunden. Die Klickzahl stammt aus dem Archiv auf diesem Computer. Hat das Archiv keine Suchdaten, steht dort „Keine Suchdaten im Archiv“. Fahren Sie über die Zahl, sehen Sie, welche Daten sie abdeckt. Ein Klick auf die Zeile öffnet das Projekt. Die Schaltfläche **Einstellungen** rechts öffnet die Projekteinstellungen. Bei einem Projekt ohne Website heißt sie **Website hinzufügen**. Archivierte Projekte stehen ganz unten im Abschnitt **Archiviert**. Mit **Wiederherstellen** kehren sie in die Liste zurück.

**Fenster „Neues Projekt“.** Es hat vier Felder:

- **Name** ist Pflicht. Nur Sie sehen ihn; er erscheint in der Überschrift der Berichte und in der Projektauswahl. An Google wird er nicht gesendet.
- **Domain, optional** ist die Adresse Ihrer Website, zum Beispiel `example.com`. Ein vorangestelltes `https://` und `www.` werden automatisch entfernt. Subdomains werden der Hauptdomain zugeordnet; `blog.example.com` und `example.com` sind also dasselbe Projekt.
- **Land** und **Sprache** bestimmen, für welchen Markt die gespeicherten Suchbegriffe verfolgt werden. Wechseln Sie das Land, springt die Sprache auf die Sprache dieses Landes. Beides können Sie später ändern.

**Projekteinstellungen.** Es gibt zwei Reiter. Im Reiter **Allgemein** stehen Name, Domain, Land und Sprache sowie der Abschnitt **Projekt archivieren**. Im Reiter **Verbindungen** stehen die Karten für Search Console und Analytics.

## So gehen Sie vor

1. Klicken Sie in der Projektauswahl auf **Neues Projekt**.
2. Geben Sie einen Namen und die Adresse Ihrer Website ein, wählen Sie Land und Sprache und klicken Sie auf **Projekt erstellen**. Das Projekt öffnet sich, und die Übersicht (Panel) erscheint. Es werden noch keine Daten abgerufen.
3. Wechseln Sie zu **Projekteinstellungen → Verbindungen** und verbinden Sie die Search Console. Die Schritte stehen in der Anleitung zur Google-Verbindung. Sobald die Verbindung steht, beginnen sich Panel, Suchleistung, Chancen und Indexstatus zu füllen.
4. Möchten Sie auch Analytics verbinden, nutzen Sie die Karte **Analytics** im selben Reiter. Ein eigener Google-Schlüssel ist dafür nicht nötig.
5. Um Namen oder Website zu ändern, korrigieren Sie das Feld im Reiter **Allgemein** und klicken auf **Änderungen speichern**. Die Schaltfläche wird erst aktiv, wenn sich etwas geändert hat.

### Google-Verbindung ändern

Klicken Sie auf der Karte im Reiter **Verbindungen** auf **Property oder Konto ändern**. Sie können eine andere Website (bei Google „Property“, auf Türkisch „mülk“) oder ein anderes Google-Konto wählen. **Verbindung trennen** entfernt nur die Verbindung dieses Projekts. Ihr Google-Konto bleibt gespeichert, und die App fragt nicht nach. Um ein Google-Konto vollständig zu entfernen, nutzen Sie **Konto entfernen** im Auswahlfenster. Das Fenster nennt die betroffenen Projekte.

### Projekt archivieren

Projekte werden nicht gelöscht, sondern archiviert. Die Schaltfläche **Projekt archivieren** unten im Reiter **Allgemein** nimmt das Projekt aus der Liste. Audits, Suchbegriffe und Berichte bleiben unverändert erhalten. **Wiederherstellen** auf der Seite Projeler holt das Projekt genau so zurück, wie es war. Haben Sie nur ein einziges Projekt, können Sie es nicht archivieren.

## Regeln für die Domain-Eingabe

Auf diesem Bildschirm gibt es keine Zahlen. Beim Speichern der Domain gelten diese Regeln: Leerzeichen und Großbuchstaben werden bereinigt, und die Adresse muss eine echte Domain sein (IP-Adressen, `localhost` oder erfundene Endungen werden nicht angenommen). Bei einer falschen Eingabe erscheint die Warnung „Geben Sie eine gültige Domain ein, zum Beispiel acme.com.“.

## Häufige Fragen

**Kann ich ein Projekt ganz löschen?** Nein, Sie können es nur archivieren. Die Daten bleiben erhalten, und Sie können es jederzeit wiederherstellen.

**Kann ich einem Projekt zwei Websites zuordnen?** Nein. Ein Projekt hat eine Search-Console-Property und eine Analytics-Property. Legen Sie für die zweite Website ein zweites Projekt an.

**Es gibt ein Projekt namens „Default“. Was ist das?** Beim ersten Start legt die App ein leeres Projekt an, damit sich die Bildschirme öffnen lassen. Sie können es umbenennen und weiterverwenden oder ein neues Projekt anlegen und dieses archivieren.

**Ich habe das falsche Land gewählt.** Ändern Sie es im Reiter Genel. Die Positionen Ihrer gespeicherten Suchbegriffe werden ab diesem Zeitpunkt für das neue Land verfolgt.

## Grenzen

Die Zahl der Projekte ist nicht begrenzt. Ein neues Projekt startet nichts; Daten kommen erst, wenn Google verbunden ist. Haben Sie keine Domain eingegeben, tippen Sie die Adresse beim Start eines Audits von Hand ein.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
