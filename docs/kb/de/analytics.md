---
title: Analytics
description: Was Besucher aus der Suche danach auf der Website tun: Berichte aus Google Analytics 4, Schlüsselereignisse und die Prüfung der Messung.
screen: Analytics
route: /p/<proje>/analytics
updated: 2026-10-22
---

Hier sehen Sie, was die Personen, die auf Ihre Website kommen, danach tun. Die Search Console zeigt, was bei Google passiert; Analytics zeigt, was Besucher auf der Website tun.

Sie sehen sieben Berichte aus Ihrem Google-Analytics-4-Konto. Der Bildschirm zeigt standardmäßig nur Besucher aus der Suche (organische Suche). Ein achter Reiter prüft die Messung selbst. Er prüft, ob der Zähler läuft und ob ein Schlüsselereignis definiert ist.

## Was auf dem Bildschirm zu sehen ist

**Reiter.** **Landingpages**, **Seiten und Bildschirme**, **Traffic-Akquisition**, **Schlüsselereignisse**, **E-Commerce**, **Interne Suche**, **Zielgruppe** und **Messzustand**. Unter jedem Reiter steht eine kurze Frage. Eine Einstiegsseite ist die Seite, auf der ein Besucher zuerst auf die Website kommt. Ein Schlüsselereignis ist eine Handlung, die Sie für wichtig erklärt haben.

**Steuerelemente.** Bei **Zeitraum** wählen Sie Letzte 7 Tage, Letzte 28 Tage oder Letzte 3 Monate. Bei **Kanal** wählen Sie Organische Suche (Standard) oder Gesamter Traffic. **Zeilen** steht für 50, 100 oder 200. Im Reiter Zielgruppe wählen Sie **Gerät**, **Land** und **Neu / wiederkehrend**. Im Reiter Traffic wählen Sie **Kanalgruppe**, **Quelle / Medium** und **Kampagne**. Die Auswahl wird in die Adressleiste geschrieben.

**Bereich Organische Sitzungen.** Er steht im Reiter Landingpages über der Tabelle. Eine Sitzung ist ein ganzer Besuch. Der Bereich hat eine Linie der täglichen Sitzungen sowie die Karten **Sitzungen** und **Interaktionsrate**. Wird Umsatz gemessen, erscheint auch **Organischer Umsatz**. Alle zeigen auch die Veränderung gegenüber dem vorherigen Zeitraum.

**Tabelle.** Die Spalten hängen vom Bericht ab. Zum Beispiel **Domain**, **Landingpage**, **Seite**, **Ereignisname**, **Kanal**, **Gerät**, **Land**, **Artikel**, **Suchbegriff**. Die Messwerte sind: **Sitzungen**, **Aktive Nutzer**, **Interaktionsrate**, **Schlüsselereignisse**, **Umsatz**, **Aufrufe**. Ist kein Schlüsselereignis definiert, steht dort immer 0.

**Zeile unter der Tabelle.** Sie nennt, wie viele Zeilen angezeigt werden. Hat Google die Daten stichprobenartig erhoben, steht dort „Stichprobe“. Wurden Zeilen aus Datenschutzgründen zurückgehalten, kommt „Zeilen unterhalb der Schwellenwerte ausgeblendet“ hinzu.

**Schnellfilter.** **Nur organisch**, **Geringe Interaktion** (unter 50 Prozent), **Mit Conversions**, **Mit Umsatz**, **Kurze Interaktionsdauer**, **Viel Traffic, wenig Conversions**.

**Zusammenfassungskarten.** Die Reiter Schlüsselereignisse, E-Commerce und Websitesuche haben jeweils eigene Zusammenfassungskarten.

**Reiter Messungsstatus.** Er hat vier Karten: **Web-Datenstreams**, **Schlüsselereignisse**, **Benutzerdefinierte Dimensionen**, **Befunde**. Ein Befund kann einer von diesen sein: „Kein Web-Datenstream“, „Erweiterte Messung aus“, „Die interne Suche wird nicht gemessen“, „Keine Schlüsselereignisse eingerichtet“, „Das Inventar ist möglicherweise unvollständig“. Die sieben Optionen der erweiterten Messung erscheinen einzeln: Scrolls, Ausgehende Klicks, Interne Suche, Video, Dateidownloads, Form, Seitenänderungen. Gibt es kein Problem, steht dort „Im Messaufbau fehlt nichts.“

**Leere Zustände.** Gibt es keine Daten, steht dort „Keine Daten in diesem Zeitraum“, und zwei Abkürzungen erscheinen: **Gesamten Traffic anzeigen**, **Messzustand überprüfen**. Ist Analytics nicht verbunden, steht dort „Google Analytics ist nicht verbunden“.

## So gehen Sie vor

1. Sehen Sie zuerst in den Reiter **Messzustand**. Steht dort „Keine Schlüsselereignisse eingerichtet“, bleiben die Conversion-Spalten immer null. Definieren Sie zuerst in Analytics ein Schlüsselereignis.
2. Sehen Sie im Reiter **Landingpages** auf die Spalte **Domain**. Sehen Sie localhost oder 127.0.0.1, sendet eine Testwebsite auf Ihrem eigenen Computer Daten. Diese Zeilen sind keine echten Besuche. Die App filtert das nicht für Sie heraus.
3. Ist der Traffic gesunken, öffnen Sie den Reiter **Traffic-Akquisition** mit **Kanalgruppe**. Ist nur der Suchkanal gesunken, liegt die Ursache bei der Suche. Ist jeder Kanal gesunken, liegt das Problem bei der Messung oder auf der Website.
4. Die Schaltfläche **Viel Traffic, wenig Conversions** zeigt Stellen, an denen Google Besucher schickt, die Seite sie aber nicht halten kann. Was zu tun ist, steht auf dem Bildschirm **Chancen**.

## Wie die Zahlen berechnet werden

Der Zeitraum endet in der Zeitzone des Kontos gestern. Analytics liefert die Daten einen Tag später. Ist „Organische Suche“ gewählt, werden nur Besuche von Google oder einer anderen Suchmaschine gezählt.

Jeder Bericht fragt höchstens 200 Zeilen an. Der Messungsstatus liest die Analytics-Einstellungen und verbraucht kein Berichtskontingent. Ist das Berichtskontingent aufgebraucht, sehen Sie den Fehler „Google Analytics reporting quota is exhausted.“ (Das Berichtskontingent von Analytics ist aufgebraucht). Ihr Kontingent sehen Sie unter **Einstellungen → Limits**.

## Häufige Fragen

**Warum weicht die Zahl der Sitzungen von den Klicks in der Search Console ab?** Beide zählen Unterschiedliches. Die Search Console zählt Klicks bei Google. Analytics zählt Sitzungen auf der Website. Besucher, die der Cookie-Abfrage nicht zustimmen, tauchen in Analytics gar nicht auf.

**Die Zeilenzahl bleibt bei 200 stehen.** Pro Abruf werden höchstens 200 Zeilen angefordert. Verkürzen Sie den Zeitraum oder ändern Sie die Aufschlüsselung.

**Warum ist das Kontingent aufgebraucht?** Ein Standardkonto erhält 200.000 Tokens (Kontingenteinheiten) pro Tag und 40.000 pro Stunde. Jeder Bericht verbraucht einige Tokens. Wiederholtes Klicken auf **Aktualisieren** verbraucht das Kontingent.

## Grenzen

Was Analytics nicht misst, kann auch dieser Bildschirm nicht zeigen. Dazu gehören Besuche ohne Cookie-Zustimmung, nicht definierte Schlüsselereignisse und eine ausgeschaltete erweiterte Messung. Der Bildschirm filtert Localhost-Traffic nicht von selbst heraus. Analytics und Search Console berichten in unterschiedlichen Zeitzonen. Tägliche Zuordnungen können sich um einen Tag verschieben.

<!-- Kaynaklar: src/routes/_project/p/$projectId/analytics.tsx; src/client/features/analytics/AnalyticsPage.tsx; ReportView.tsx; ReportTable.tsx; ReportEmptyState.tsx; OrganicTrendPanel.tsx; MeasurementHealthPanel.tsx; metricHelp.ts; reportInsights.ts; reportKpis.ts; src/shared/ga4-reports.ts; src/server/features/ga4/services/Ga4ReportDefinitions.ts; Ga4ReportingService.ts; Ga4ReportEnhancements.ts; src/serverFunctions/ga4Reports.ts; src/serverFunctions/ga4MeasurementHealth.ts -->
