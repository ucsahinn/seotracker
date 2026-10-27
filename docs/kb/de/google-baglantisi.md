---
title: Mit Google verbinden
description: Zugangsschlüssel bei Google holen, in die App einfügen und die Website wählen. So kommen Search Console und Analytics 4 in die App.
kind: nasil-yapilir
updated: 2026-10-22
---

Die Oberfläche der App gibt es in sechs Sprachen: Türkisch, Englisch, Deutsch, Französisch, Italienisch und Portugiesisch. Die Sprache lässt sich unter Einstellungen → Darstellung → Sprache ändern. Diese Anleitung nennt Schaltflächen und Bildschirme so, wie sie in der deutschen Oberfläche heißen. Für die Seiten von Google stehen die Namen, die Google bei deutscher Spracheinstellung zeigt.

Am Ende verbindet sich die App in Ihrem Namen mit Google und liest die Daten Ihrer Website. Dafür holen Sie einmalig einen „Google-Zugangsschlüssel“ bei Google. Das dauert etwa zehn Minuten und muss nur einmal geschehen. Am Ende der Seite steht ein kürzerer Weg, das Dienstkonto, den wir den meisten empfehlen.

## Voraussetzungen

- Eine in der Search Console bestätigte Website (Property). Ist sie nicht bestätigt, sieht die App sie nicht in der Liste.
- Für Analytics 4 mindestens die Berechtigung „Betrachter“ (Görüntüleyen) für diese Property. Das ist optional; die Search Console allein genügt.
- Ein Google-Konto. Die Google Cloud Console (Googles Seite für Entwickler) ist kostenlos und verlangt keine Zahlungskarte.
- Die geöffnete App. Von dort kopieren Sie die beiden Weiterleitungsadressen (die Adressen, über die Google Sie nach der Freigabe in die App zurückbringt).

## Schritte

1. Öffnen Sie in der App den Bereich **Einstellungen → Google**. Sie sehen zwei Adressen. Die eine endet auf `/api/gsc/oauth/callback` (Search Console), die andere auf `/api/ga4/oauth/callback` (Analytics). Im Windows-Paket beginnen die Adressen mit `http://127.0.0.1:3001`, bei Docker mit `http://localhost:3001`. Notieren Sie beide.
2. Gehen Sie im Browser zu `console.cloud.google.com`. Wählen Sie in der Projektauswahl oben **Neues Projekt**. Der Name ist beliebig, zum Beispiel „seowatcher“.
3. Öffnen Sie die Seite **APIs & Dienste → Bibliothek**. Geben Sie in das Suchfeld **Google Search Console API** ein, klicken Sie darauf und wählen Sie **Aktivieren**. Wenn Sie auch Analytics verbinden, tun Sie dasselbe für die **Google Analytics Admin API** und die **Google Analytics Data API**.
4. Öffnen Sie die Seite **APIs & Dienste → OAuth-Zustimmungsbildschirm**. Wählen Sie als Nutzertyp **Extern**. Als Anwendungsname geben Sie einen beliebigen Namen ein, in die E-Mail-Felder Ihre eigene E-Mail-Adresse. Der Veröffentlichungsstatus kann „Test“ bleiben.
5. Fügen Sie auf derselben Seite im Abschnitt **Testnutzer** Ihr eigenes Google-Konto hinzu. Google muss nichts zusätzlich genehmigen.
6. Wählen Sie auf der Seite **APIs & Dienste → Anmeldedaten** **Anmeldedaten erstellen** und dann **OAuth-Client-ID**. Das ist Ihr Google-Zugangsschlüssel.
7. Wählen Sie als Anwendungstyp **Webanwendung**.
8. Tragen Sie im Abschnitt **Autorisierte Weiterleitungs-URIs** die beiden Adressen aus Schritt 1 ein. Setzen Sie keinen Schrägstrich ans Ende. Schon ein einziges abweichendes Zeichen löst bei Google den Fehler „redirect_uri_mismatch“ (Adresse stimmt nicht überein) aus.
9. Klicken Sie auf **Erstellen**. Google zeigt eine Client-ID und einen geheimen Schlüssel an.
10. Kehren Sie zur App zurück. Fügen Sie im Bereich **Einstellungen → Google** im Feld **Client-ID** die Kennung ein, die auf `.apps.googleusercontent.com` endet. Fügen Sie im Feld **Client-Secret** den Schlüssel ein, der mit `GOCSPX-` beginnt.
11. Klicken Sie auf **Speichern**. Es erscheint die Meldung „Google-Zugriffsschlüssel gespeichert“. Ein Neustart ist nicht nötig. Fügen Sie den Schlüssel in das falsche Feld ein, warnt die App: „Die Client-ID muss auf .apps.googleusercontent.com enden. Fügen Sie die OAuth-Client-ID ein, nicht das Client-Secret.“
12. Haben Sie in der App noch kein Projekt, legen Sie zuerst mit **Neues Projekt** eines an. Einzelheiten stehen in der Anleitung [Projeler](/docs/projeler/).
13. Gehen Sie zu Ihrem Projekt: **Projekteinstellungen → Verbindungen**. Klicken Sie auf der Karte **Google Search Console** auf **Verbinden**.
14. Wählen Sie auf Googles Zustimmungsbildschirm das Konto, das Sie als Testnutzer hinzugefügt haben, und erlauben Sie den Zugriff. Zurück in der App erscheint die Meldung „Search Console verbunden“.
15. Wählen Sie Ihre Website in der Liste **Property auswählen** und klicken Sie auf **Property speichern**. Wählen Sie eine Domain-Property, steht auf der Karte „Domain-Property: umfasst alle Subdomains sowie http- und https-URLs.“
16. Für Analytics klicken Sie auf demselben Bildschirm auf der Karte **Google Analytics** auf **Verbinden**, erlauben den Zugriff und wählen die Property. Die beiden Verbindungen brauchen getrennte Freigaben; die eine schließt die andere nicht ein.

### Der kürzere Weg: das Dienstkonto

Ein Dienstkonto (Dienstkonto) ist ein besonderes Konto, das sich an Ihrer Stelle mit Google verbindet. Sie brauchen weder den Zustimmungsbildschirm noch eine Weiterleitungsadresse. Möchten Sie sich in der App stattdessen mit Ihrem eigenen Google-Konto anmelden, folgen Sie dem Weg oben.

1. Öffnen Sie `console.cloud.google.com`. Die APIs aus Schritt 3 müssen im selben Cloud-Projekt aktiviert sein. Gehen Sie zur Seite **IAM & Verwaltung → Dienstkonten**.
2. Klicken Sie auf **Dienstkonto erstellen**. Geben Sie einen Namen ein. Überspringen Sie die Schritte zu den Rollen und erstellen Sie das Konto.
3. Öffnen Sie in der Zeile des Kontos den Reiter **Schlüssel**. Wählen Sie **Schlüssel hinzufügen → Neuen Schlüssel erstellen**.
4. Wählen Sie als Schlüsseltyp **JSON** und klicken Sie auf **Erstellen**. Eine Datei wird auf Ihren Computer heruntergeladen.
5. Öffnen Sie in der App den Bereich **Einstellungen → Dienstkonto**. Öffnen Sie die heruntergeladene Datei mit dem Editor (Notepad), fügen Sie den gesamten Inhalt in das Feld ein und speichern Sie. Der Bildschirm zeigt die E-Mail-Adresse des Kontos an.
6. Wählen Sie in der Search Console **Einstellungen → Nutzer und Berechtigungen → Nutzer hinzufügen**. Geben Sie diese E-Mail-Adresse ein und wählen Sie als Berechtigung **Uneingeschränkt**.
7. Wenn Sie Analytics nutzen, öffnen Sie in Google Analytics bei der Property **Verwaltung → Zugriffsverwaltung**. Fügen Sie dieselbe E-Mail-Adresse mit der Berechtigung **Betrachter** hinzu.

Ist ein Dienstkonto gespeichert, verwendet die App es. Die Zeile „Aktuell in Verwendung“ auf dem Bildschirm **Einstellungen** zeigt, welche Variante gerade aktiv ist.

## Kontrolle

- Auf den Karten unter **Projekteinstellungen → Verbindungen** muss das Kennzeichen **Verbunden** stehen.
- Die vier Zahlenkarten auf dem Bildschirm **Übersicht** sollten sich in wenigen Sekunden füllen. Bei einer neuen Website können die Zahlen noch bei null stehen. Das ist kein Verbindungsfehler.
- Das Kennzeichen im Bereich **Einstellungen → Google** sollte **Gespeichert** anzeigen.

## Häufige Fragen

**Wo wird der geheime Schlüssel gespeichert?** In der Datenbank auf diesem Computer, verschlüsselt. Der Schlüssel dafür ist die Datei `instance-secret` (unter Windows im Datenordner, bei Docker im Datenspeicher). Er wird nicht an den Browser gesendet.

**Kann ich denselben Zugangsschlüssel in mehreren Projekten verwenden?** Ja. Ein Schlüssel pro Installation genügt; jedes Projekt wählt seine eigene Property.

**Nach einigen Tagen ist die Verbindung abgebrochen.** Bei Apps im Status „Test“ kann Google die Freigabe auf sieben Tage begrenzen. Die Karte meldet „Die Verbindung ist abgelaufen“. Ein Klick auf **Erneut verbinden** genügt. Dauerhaft beheben Sie das, indem Sie den Zustimmungsbildschirm auf „Üretim“ (Produktion) stellen oder auf das Dienstkonto wechseln.

**Welche Berechtigungen verlangt die App?** Für die Search Console nur Lesen (`webmasters.readonly`), für Analytics nur Lesen (`analytics.readonly`). Die App kann bei Google nichts ändern.

## Wenn etwas nicht klappt

- **Google meldet „redirect_uri_mismatch“.** Die Weiterleitungsadresse in der Cloud Console ist nicht Zeichen für Zeichen dieselbe wie in der App. Nutzen Sie die Kopierschaltfläche auf dem Bildschirm **Einstellungen**. Schon http statt https, 127.0.0.1 statt localhost oder ein Schrägstrich am Ende lösen den Fehler aus.
- **Es erscheint die Warnung „Google-Zugriffsschlüssel fehlt“.** Schritt 10 und 11 wurden übersprungen oder das Speichern ist fehlgeschlagen. Auf dem Bildschirm **Einstellungen** muss das Kennzeichen **Gespeichert** stehen.
- **Google meldet „access_denied“.** Das Konto, mit dem Sie sich angemeldet haben, steht nicht in der Liste der Testnutzer auf dem Zustimmungsbildschirm. Fügen Sie das Konto der Liste hinzu oder wählen Sie das richtige Konto.
- **Die Property-Liste ist leer.** Dieses Konto hat keine bestätigte Website in der Search Console und keine Berechtigung in Analytics. Bestätigen Sie zuerst die Website.
- **Es erscheint „Verbindung nicht abgeschlossen“ mit „state_mismatch“.** Sie haben den Zustimmungsbildschirm in zwei Reitern geöffnet oder länger als zehn Minuten gewartet. Versuchen Sie es von vorn in einem einzigen Reiter. Sind die Cookies des Browsers (kleine Datendateien) ausgeschaltet, schalten Sie sie ein.
- **Es erscheint „Google-Konto bereits verknüpft“.** Das Konto war schon mit einem anderen Eintrag verbunden. Entfernen Sie den alten Eintrag über **Konto entfernen** in der Property-Auswahl und verbinden Sie neu.
- **Nach einem Update sind die Verbindungen getrennt.** Der Verschlüsselungsschlüssel hat sich geändert (bei Docker wurde `BETTER_AUTH_SECRET` hinzugefügt, oder der Datenspeicher wurde neu erstellt). Klicken Sie auf den Karten auf **Erneut verbinden**.

<!-- Kaynaklar: docs/SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md; docs/SELF_HOSTING_GOOGLE_ANALYTICS.md; src/client/features/settings/GoogleOAuthClientSection.tsx; GoogleServiceAccountSection.tsx; googleClientId.ts; src/client/features/integrations/IntegrationConnectionCard.tsx; GooglePropertyPicker.tsx; googleAuthErrorCopy.ts; src/server/features/google/selfHostedOAuth.ts; oauth-config.ts; src/shared/gsc.ts; src/shared/ga4.ts -->
