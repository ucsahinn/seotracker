---
title: Indexstatus
description: Ob Google Ihre Seiten indexiert hat, warum nicht und wann Google sie zuletzt gecrawlt hat. Höchstens 2.000 Abfragen pro Property und Tag.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

Das Website-Audit zeigt, ob sich eine Seite öffnen lässt. Ob Google sie tatsächlich in seinen Index aufgenommen hat, kann es nicht sagen. Dafür fragt der Reiter **Indexstatus** Google über die URL-Prüfung und speichert jede Antwort auf diesem Computer. Neu gefragt wird nur, wenn eine Antwort veraltet ist. Das spart Kontingent: Google erlaubt pro Property (Ihrer Website in der Search Console) 2.000 Abfragen am Tag, und die App und Ihr KI-Agent teilen sich diesen Vorrat.

## Was auf dem Bildschirm zu sehen ist

**Ring „Was hat Google mit diesen Seiten gemacht?“.** Die gecrawlten Seiten werden in drei Gruppen geteilt:

- **Bei Google**: kann in der Suche erscheinen.
- **Nicht indexiert**: Google hat sie angesehen, aber nicht aufgenommen.
- **Wartet auf Antwort**: noch nicht gefragt oder keine Antwort erhalten.

**Zusammenfassungskästen.** Sie zeigen, für wie viele Seiten Google gefragt wurde, wie viele im Index sind, wie viele nicht und wie viele noch warten. Der Kasten „Seiten, für die Google eine andere kanonische URL ausgewählt hat“ zählt Seiten, bei denen Google eine andere Hauptadresse gewählt hat als die von Ihnen per Canonical-Tag angegebene. Der Kasten „In diesem Audit noch nicht gefragt“ zählt die Seiten, deren Abfrage noch aussteht.

**Schaltfläche „Status bei Google prüfen“.** Bei jedem Klick werden höchstens 25 Seiten abgefragt. Zuerst kommen die, die am längsten keine Antwort erhalten haben. Ist die Tagesgrenze erreicht, erscheint die Warnung „Googles Tagesgrenze von 2.000 Adressen ist erreicht“. Die Schaltfläche ist deaktiviert, wenn die Search Console nicht verbunden ist oder die geprüfte Domain nicht zur verbundenen Property gehört.

**Tabelle.** Die Spalten sind: **Seite**, **Status**, **Grund**, **Von Google ausgewählte kanonische URL**, **Letzter Crawl von Google**. Die Spalte Status zeigt „Bei Google“, „Nicht geprüft“, „Keine Antwort“, „Fehler“ oder Googles eigenen Status in deutscher Fassung. Die App übersetzt 18 solcher Status, zum Beispiel:

- „Gefunden – zurzeit nicht indexiert“
- „Durch das noindex-Tag ausgeschlossen“
- „Durch robots.txt blockiert“
- „Soft-404“
- „Google ist diese URL nicht bekannt“

Die Tabelle können Sie als CSV herunterladen.

## So gehen Sie vor

1. Öffnen Sie den Reiter, wenn das Audit fertig ist. Ist die Zahl bei „Wartet auf Antwort“ hoch, klicken Sie auf **Status bei Google prüfen**. Jeder Klick fragt 25 weitere Seiten ab; bei einer kleinen Website genügen wenige Klicks.
2. Prüfen Sie zuerst die Gruppe „Nicht indexiert“. Die Spalte **Grund** ist Googles Begründung und sagt oft, was zu tun ist. Bei „Durch robots.txt blockiert“ heben Sie die Sperre auf. Bei „Durch das noindex-Tag ausgeschlossen“ entfernen Sie das Tag, falls die Seite in die Suche soll. Bei „Gefunden – zurzeit nicht indexiert“ genügt meist Abwarten.
3. Nehmen Sie wichtige Seiten, bei denen „Google ist diese URL nicht bekannt“ steht, in die Sitemap auf und reichen Sie die Sitemap in der Search Console ein. Für einige besonders wichtige Seiten wählen Sie in der Search Console zusätzlich „Indexierung beantragen“.
4. Steht im Kasten „Seiten, für die Google eine andere kanonische URL ausgewählt hat“ mehr als null, sehen Sie in die Spalte **Von Google ausgewählte kanonische URL**. Google folgt dort Ihrer Angabe nicht. Korrigieren Sie entweder Ihr Canonical-Tag oder übernehmen Sie die von Google gewählte Adresse als Hauptadresse.
5. Klicken Sie nach einigen Tagen erneut auf **Status bei Google prüfen**.

## Wie die Zahlen berechnet werden

Meldet Google „im Index“, zählt die Seite als „Bei Google“. Meldet Google „nicht im Index“ oder „unklar“, zählt sie als „Nicht indexiert“. Ohne Antwort zählt sie als „Wartet auf Antwort“.

Eine Antwort veraltet für eine Seite im Index nach 14 Tagen, für „nicht im Index“ oder einen Fehler nach 3 Tagen. Eine Seite, für die noch nie gefragt wurde, kommt immer infrage. Für die Tagesgrenze zählt die App ihre eigenen Abfragen der letzten 24 Stunden. Abfragen, die Sie von Hand in der Search Console stellen, gehen nicht in diesen Zähler ein, verringern aber Googles tatsächliches Limit.

Ein Canonical-Konflikt liegt vor, sobald die von Google gewählte und die von Ihnen angegebene Adresse voneinander abweichen, auch nur durch einen abschließenden Schrägstrich.

Liegt Googles letzter Crawl einer Seite länger als 90 Tage zurück, meldet das Audit das Problem „Google hat diese Seite schon lange nicht mehr gecrawlt“. Veraltete Antworten fasst das Problem „Die Antworten von Google für einige Seiten sind veraltet“ zusammen.

## Häufige Fragen

**Warum ist die Schaltfläche deaktiviert?** Entweder ist die Search Console nicht verbunden, es ist keine Seite mehr abzufragen, oder die geprüfte Domain gehört nicht zur verbundenen Property, etwa weil Sie eine andere Website geprüft haben.

**Für wen gilt die Grenze von 2.000?** Für die Property. Zwei Projekte mit derselben Property und Ihr KI-Agent verbrauchen denselben Vorrat.

**Was soll ich bei einer Seite mit „Gefunden – zurzeit nicht indexiert“ tun?** Meist nichts. Bei neuen Websites kann Google wochenlang warten. Ein Link von einer häufig gecrawlten Seite Ihrer Website beschleunigt den Vorgang.

**Meldet dieser Reiter Google neue Seiten?** Nein, er fragt nur ab. Neue Seiten melden Sie über die Sitemap oder in der Search Console mit „Indexierung beantragen“.

## Grenzen

Die App zeigt Googles Antworten unverändert; manche Felder lässt Google leer. Mehr als 2.000 Abfragen am Tag sind nicht möglich, eine Website mit 10.000 Seiten braucht also fünf Tage. Abgefragt werden nur Seiten, die das Audit gecrawlt hat; andere Adressen erscheinen nicht in der Liste.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
