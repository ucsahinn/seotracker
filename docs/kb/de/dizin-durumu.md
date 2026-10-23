---
title: Indexstatus
description: Ob Google Ihre Seiten in die Suche aufgenommen hat, warum nicht und wann es zuletzt vorbeikam. Höchstens 2.000 Abfragen pro Tag.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

Dieser Reiter zeigt, welche Ihrer Seiten Google in die Suche aufgenommen hat.

Das Website-Audit sagt, ob sich eine Seite öffnen lässt. Es kann nicht sagen, ob Google die Seite tatsächlich in den Index (Googles Liste der Seiten) aufgenommen hat. Der Reiter **Dizin durumu** (Indexstatus) fragt Google danach und speichert die Antwort auf diesem Computer. Dieselbe Frage wird nicht ständig wiederholt; nur veraltete Antworten werden neu abgefragt. Das ist wichtig, weil Google erlaubt pro Property (Ihren Website-Eintrag in der Search Console) 2.000 Fragen am Tag. Die App und Ihr Assistent teilen sich dieses Kontingent.

## Was auf dem Bildschirm zu sehen ist

**Ring „Was hat Google mit diesen Seiten gemacht?“ („Google bu sayfalarla ne yapmış?“).** Die gecrawlten Seiten werden in drei Gruppen geteilt:

- **Google'da** (Bei Google): kann in der Suche erscheinen.
- **Dizinde değil** (Nicht im Index): Google hat sie angesehen, aber nicht aufgenommen.
- **Yanıt bekleyen** (Antwort ausstehend): noch nicht gefragt oder keine Antwort erhalten.

**Zusammenfassungskästen.** Sie sehen, bei wie vielen Seiten nachgefragt wurde, wie viele im Index sind, wie viele nicht und wie viele warten. Der Kasten „Google'ın farklı adresi seçtiği sayfalar“ (Seiten, bei denen Google eine andere Adresse gewählt hat) zählt die Seiten, bei denen Google eine andere Adresse gewählt hat als den von Ihnen gemeldeten Canonical (die Hauptadresse einer Seite). Der Kasten „Bu denetimde henüz sorulmamış“ (In diesem Audit noch nicht gefragt) ist die Zahl der Seiten, die auf ihre Abfrage warten.

**Schaltfläche „Google'da durumunu kontrol et“ (Status bei Google prüfen).** Bei jedem Klick werden höchstens 25 Seiten abgefragt. Zuerst kommen die, die am längsten keine Antwort erhalten haben. Ist die Tagesgrenze erreicht, erscheint die Warnung „Google'ın günlük 2.000 adres sınırına ulaşıldı“ (Googles Tagesgrenze von 2.000 Adressen ist erreicht). Ist die Search Console nicht verbunden, ist die Schaltfläche deaktiviert. Sie ist auch deaktiviert, wenn die geprüfte Domain nicht zur verbundenen Property gehört.

**Tabelle.** Die Spalten sind: **Sayfa** (Seite), **Durum** (Status), **Sebep** (Grund), **Google'ın seçtiği adres** (Von Google gewählte Adresse), **Google'ın son ziyareti** (Letzter Besuch von Google). In der Zelle Status steht „Google'da“ (Bei Google), „Kontrol edilmedi“ (Nicht geprüft), „Yanıt alınamadı“ (Keine Antwort erhalten), „Hata“ (Fehler) oder die türkische Fassung von Googles eigenem Status. Für insgesamt 18 Status gibt es eine türkische Fassung. Einige Beispiele:

- „Keşfedildi, henüz taranmadı“ (Entdeckt, noch nicht gecrawlt)
- „'noindex' etiketiyle dışlandı“ (Durch das Tag „noindex“ ausgeschlossen; die Seite ist vor der Suche versteckt)
- „robots.txt engelliyor“ (robots.txt blockiert; robots.txt ist die Datei, die Google sagt, welche Seiten es betreten darf)
- „Yumuşak 404“ (Soft 404; die Seite existiert, aber Google hält sie für leer)
- „Google bu adresi bilmiyor“ (Google kennt diese Adresse nicht)

Die Tabelle können Sie als CSV herunterladen.

## So gehen Sie vor

1. Öffnen Sie den Reiter, wenn das Audit fertig ist. Ist die Zahl bei „Yanıt bekleyen“ hoch, klicken Sie auf **Google'da durumunu kontrol et**. Bei jedem Klick kommen 25 Seiten voran. Bei einer kleinen Website genügen wenige Klicks.
2. Sehen Sie zuerst in die Gruppe „Dizinde değil“. Die Spalte **Sebep** ist Googles Begründung und sagt oft, was zu tun ist. Bei „robots.txt engelliyor“ heben Sie die Sperre auf. Bei „'noindex' etiketiyle dışlandı“ löschen Sie das Tag. Bei „Keşfedildi, henüz taranmadı“ genügt meist Abwarten.
3. Nehmen Sie wichtige Seiten, bei denen „Google bu adresi bilmiyor“ steht, in die Sitemap (die Karte Ihrer Website) auf. Senden Sie die Sitemap an die Search Console. Für drei bis fünf besonders wichtige Seiten wählen Sie in der Search Console von Hand „Dizine eklenmesini iste“ (Indexierung beantragen).
4. Ist der Kasten „Google'ın farklı adresi seçtiği sayfalar“ nicht null, sehen Sie in die Spalte **Google'ın seçtiği adres**. Google folgt der von Ihnen gemeldeten Hauptadresse nicht. Korrigieren Sie entweder Ihre Adresse oder machen Sie die von Google gewählte zur Hauptadresse.
5. Klicken Sie nach einigen Tagen erneut. Nur veraltete Antworten werden neu abgefragt, es wird also kein Kontingent verschwendet.

## Wie die Zahlen berechnet werden

Sagt Google „im Index“, gilt die Seite als „Google'da“. Sagt es „nicht im Index“ oder „unklar“, zählt sie als „Dizinde değil“. Gibt es keine Antwort, ist die Seite „Yanıt bekleyen“.

Eine Antwort gilt nach einer bestimmten Zeit als veraltet und wird neu abgefragt. Für eine Seite im Index sind das 14 Tage. Für eine Antwort „nicht im Index“ oder mit Fehler sind es 3 Tage. Eine Seite, nach der nie gefragt wurde, ist immer bereit zur Abfrage. Die Tagesgrenze wird anhand der Zahl der Fragen der letzten 24 Stunden berechnet. Die App zählt nur ihre eigenen Fragen. Abfragen, die Sie von Hand in der Search Console stellen, gehen nicht in diesen Zähler ein, verringern aber Googles tatsächliches Limit.

Ein Konflikt bei der Hauptadresse liegt vor, wenn die von Google gewählte Adresse und die von Ihnen gemeldete verschieden sind. Auch ein Unterschied beim Schrägstrich am Ende zählt.

Liegt Googles letzter Crawl länger als 90 Tage zurück, trägt das Audit das Problem „Google bu sayfayı uzun süredir taramadı“ (Google hat diese Seite lange nicht gecrawlt) ein. Veraltete Antworten werden in dem einen Problem „Google'ın bazı sayfalar hakkındaki yanıtı eskimiş“ (Googles Antwort zu einigen Seiten ist veraltet) zusammengefasst.

## Häufige Fragen

**Warum ist die Schaltfläche deaktiviert?** Es gibt drei mögliche Gründe. Die Search Console ist nicht verbunden. Es ist keine Seite mehr abzufragen. Oder die geprüfte Domain gehört nicht zur verbundenen Property. Das passiert, wenn Sie eine andere Website geprüft haben.

**Für wen gilt die Grenze von 2.000?** Für die Property. Zwei Projekte, die mit derselben Property verbunden sind, und Ihr Assistent verbrauchen aus demselben Vorrat.

**Was soll ich bei einer Seite mit „Keşfedildi, henüz taranmadı“ tun?** Meist nichts. Bei neuen Websites kann Google wochenlang warten. Ein Link von einer häufig gecrawlten Seite Ihrer Website beschleunigt den Vorgang.

**Meldet dieser Reiter Google neue Seiten?** Nein, er fragt nur. Zum Melden gibt es die Sitemap und in der Search Console „Dizine eklenmesini iste“.

## Grenzen

Die Antworten sind so, wie Google sie gibt. Google kann einige Felder leer lassen. Mehr als 2.000 Fragen am Tag sind nicht möglich. Eine Website mit 10.000 Seiten vollständig abzufragen, dauert fünf Tage. Der Reiter fragt nur gecrawlte Seiten ab. Adressen, die nicht ins Audit gelangt sind, erscheinen nicht in der Liste.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
