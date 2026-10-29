---
title: Suchleistung
description: Klicks, Impressionen und Positionen aus der Search Console verstehen. Seiten priorisieren und die Grenzen geschätzter Gewinne erkennen.
screen: Arama performansı
route: /p/<proje>/search-performance
updated: 2026-10-28
---

Klicks, Impressionen, CTR und Position kommen unverändert aus der Search Console. Geschätzt wird nur der „mögliche Gewinn“, und diese Zahlen sind immer als „Obergrenze“ gekennzeichnet.

Die gewählten Filter stehen in der Adresse; Sie können eine Ansicht also als Link teilen oder als Lesezeichen speichern.

## Drei Begriffe

**Endgültiger Tag.** Die Search Console zählt einen Tag noch mehrere Tage lang nach. Summen und Vergleiche nutzen nur Tage, deren Zählung abgeschlossen ist; die Tage folgen der pazifischen Zeit, die Google verwendet. Noch nicht endgültige Tage erscheinen im Diagramm schraffiert.

**Verborgene Suchanfrage.** Sehr selten gesuchte Suchanfragen listet Google aus Datenschutzgründen nicht einzeln auf, rechnet ihre Klicks aber in die Summe der Website ein. Die Tabelle der Suchanfragen ergibt deshalb weniger als die Summe; die Differenz sind verborgene Suchanfragen.

**Obergrenze.** Eine Gewinnzahl bedeutet „höchstens so viel“: die Zusatzklicks, die eine Suchanfrage bei einem Aufstieg um eine Positionsstufe und den Klickraten Ihrer eigenen Website bekäme. Das tatsächliche Ergebnis hängt von Mitbewerbern und von Google ab und fällt meist kleiner aus.

## Was auf dem Bildschirm zu sehen ist

**Obere Leiste.** Rechts oben stehen:

- **Aktualisieren**: holt frische Daten aus der Search Console. Sonst nutzt die App eine höchstens zehn Minuten alte Antwort.
- **Bericht herunterladen**: speichert die aktuelle Ansicht als druckbaren Bericht in einer Datei und lädt ihn herunter. Der Bericht erscheint auch unter **Berichte**. Während einer Aktualisierung ist der Download gesperrt. Die App liest die Daten für den Bericht neu; der Zeitraum bleibt fest, Google kann einzelne Werte aber inzwischen korrigiert haben.
- Das Exportmenü: **Suchanfragen (CSV)**, **Seiten (CSV)**, **Suchanfragen nahe den Top drei (CSV)**, **Suchanfragen nach Google Tabellen exportieren**, **Seiten nach Google Tabellen exportieren**. Exporte folgen den Filtern auf dem Bildschirm, einschließlich Suchtext und Schnellfilter in den Reitern Suchanfragen und Seiten.

**Filter.** Eine Leiste fasst die gewählten Filter in einer Zeile zusammen: „(Web, Alle Geräte, Alle Länder, Letzte 28 Tage, Mit Vorzeitraum)“. Klappen Sie sie auf, sehen Sie: **Suchtyp** (Web, Bild, Video, Nachrichten), **Gerätefilter** (Alle Geräte, Mobil, Desktop, Tablet), **Länderfilter** (die Länder, die Google für diesen Zeitraum meldet), **Zeitraum** (Letzte 7 Tage, Letzte 28 Tage, Letzte 3 Monate) und **Vergleich** (Mit Vorzeitraum, Mit Vorjahr, Kein Vergleich). Wählen Sie einen dieser Zeiträume, ersetzt er fest übernommene Daten aus einem Link.

**Datenstand.** Diese Leiste nennt die Grundlage der Zahlen, zum Beispiel „Die Daten sind bis 24. Okt. endgültig; die letzten 3 Tage werden noch gezählt (im Diagramm schraffiert).“ Sie nennt außerdem die Vergleichstage und den Namen Ihrer Search-Console-Property; ein Klick darauf führt zu den Verbindungseinstellungen. Liefert Google die Vorjahrestage nicht mehr (Google reicht höchstens 16 Monate zurück), sagt die Leiste das. Unter **Zu den Daten** sehen Sie: das Datum der endgültigen Tage, wie viele Tage noch gezählt werden und das Datum der letzten Daten, den Klickanteil verborgener Suchanfragen, ob die Tabellen vollständig gelesen wurden (Google liefert pro Abruf nur begrenzt viele Zeilen) und ob diese Ansicht neue Anfragen an Google geschickt oder eine Antwort von vor einigen Minuten genutzt hat.

**Zusammenfassung.** Ein bis zwei Sätze über den Kacheln beschreiben die Entwicklung, zum Beispiel „Die Klicks sind in den letzten 28 Tagen gegenüber dem Vorzeitraum um 6,1 % gestiegen. Die CTR ist um 0,3 Punkte gesunken.“ Danach folgt, wie viele Zusatzklicks die ersten drei Aufgaben zusammen bringen könnten, gekennzeichnet mit „(Obergrenze)“; der Link **Aufgaben** führt zum gleichnamigen Reiter.

**Vier Kacheln.** **Klicks**, **Impressionen**, **CTR** (Anteil der Impressionen mit Klick) und **Durchschnittliche Position**, jeweils über die endgültigen Tage. Jede Kachel zeigt eine kleine Verlaufslinie und die Veränderung gegenüber dem Vergleich: bei Klicks und Impressionen in Prozent, bei der CTR in Prozentpunkten, bei der Position in Plätzen. Bei der Position ist ein kleinerer Wert besser; 1 ist ganz oben. Die Richtung zeigt neben der Farbe immer auch ein Pfeil.

**Diagramm „Im Zeitverlauf“.** Es zeigt die Tageswerte:

- Mit der Auswahl rechts oben wechseln Sie zwischen vier Messwerten: Klicks, Impressionen, CTR und Durchschnittsposition. Im Positionsdiagramm bedeutet oben die bessere Position.
- Die Schaltflächen **Tag**, **Woche** und **Monat** ändern die Zeiteinheit. Die Vergleichslinie (gestrichelt) erscheint nur in der Tagesansicht.
- Der schraffierte Bereich sind Tage, die Google noch zählt. Ein hohler Punkt steht für einen unvollständigen oder noch nicht endgültigen Zeitraum.
- Nummerierte Markierungen über der Linie zeigen drei Dinge: von Google angekündigte Ranking-Updates („Google-Update“), die Tage, an denen Website-Audits fertig wurden („Website-Audit abgeschlossen“) und Ihre eigenen Notizen. Unter dem Diagramm steht, was jede Nummer bedeutet.
- Mit **Notiz hinzufügen** hinterlassen Sie an einem Datum eine eigene Notiz, zum Beispiel „Neue Seitentitel veröffentlicht“. Eine Notiz fasst höchstens 280 Zeichen und hilft später, Anstiege und Rückgänge zu erklären. Notizen außerhalb des gewählten Zeitraums stehen unter „Notizen außerhalb dieses Zeitraums (N)“.

**Leiste „Damit anfangen“.** Zwischen Diagramm und Reitern stehen die ersten drei Aufgaben mit Titel, möglichem Gewinn und Schaltfläche. **Alle Aufgaben (N)** führt zum Reiter Aufgaben.

**Reiter.** Es gibt sieben Reiter: **Aufgaben (N)**, **Suchanfragen (N)**, **Seiten (N)**, **Ranking-Chancen (N)**, **Veränderungen**, **Überschneidungen** und **Verteilung**. Die Zahl in Klammern ist die Zahl der Zeilen oder Befunde im Reiter. Fallen Suchanfragen oder Seiten, steht beim Reiter „Veränderungen (N fallend)“. Beim Wechsel des Reiters werden Suchfeld und Schnellfilter zurückgesetzt.

### Aufgaben

Die App ordnet die Aufgaben, die sie in den Search-Console-Daten findet, nach geschätztem Gewinn. Sie sind nach Art gruppiert; jede Gruppenüberschrift nennt die Anzahl:

- „N Suchanfragen knapp unter den Top drei“: Suchen mit einer Durchschnittsposition zwischen 4 und 20 und ausreichend Impressionen. Markensuchen sind ausgenommen. Stärken Sie die Seite für diese Suchanfrage.
- „N Ergebnisse werden für ihre Position selten geklickt“: Suchen, die weniger geklickt werden als die anderen Suchen Ihrer Website auf derselben Position. Überarbeiten Sie Titel und Beschreibung.
- „Klicks sind bei N Suchanfragen gesunken“ und „Klicks sind bei N Seiten gesunken“: ein deutlicher Rückgang gegenüber dem Vorzeitraum. Ist auch die Position gefallen, aktualisieren Sie den Inhalt. Blieb die Position, prüfen Sie Titel und Beschreibung.
- „N Seiten verlieren ihre frühere Stärke“: Seiten, die im letzten Quartal weit unter das beste der vier Quartale davor gefallen sind. Aktualisieren Sie die Seite.
- „N Seiten werden gesehen, aber nie geklickt“. Die Gewinnschätzung ist hier vorsichtig: Sie rechnet mit der Klickrate der Positionsgruppe unterhalb der Seite, nicht mit ihrer eigenen. Für Seiten, die erst auf der zweiten Ergebnisseite oder später erscheinen, gibt es keine Schätzung.
- „Bei N Suchanfragen erscheinen Sie nicht mehr“: Suchen, die im Vorzeitraum Klicks bekamen und jetzt keine Impression mehr.
- „Auf N Gerätetypen liegen Sie zurück“ und „In N Ländern liegen Sie zurück“.
- „Ungewöhnliche Rückgänge an N Tagen“: Klicks oder Impressionen dieses Tages waren im Vergleich zum selben Wochentag früherer Wochen auffallend niedrig.
- „Legen Sie Ihren Markennamen fest“: erscheint, wenn kein Markenname eingetragen ist, damit Markensuchen getrennt werden. Trennt die App sie mit Namen, die sie aus Ihrer Domain vorgeschlagen hat, heißt die Aufgabe stattdessen „Markennamen bestätigen“. Bestätigen Sie die Vorschläge, wenn sie stimmen, sonst tragen Sie den Namen Ihrer Marke ein.

Unter jeder Gruppenüberschrift erklärt **Warum, und was zu tun ist** Ursache und Maßnahme. Jede Zeile zeigt ihre Rangnummer, den Befund, den Beleg (zum Beispiel „Position 8,2 · 640 Impressionen · 12 Klicks“), den möglichen Gewinn als „≈ +N Klicks“ und ein Vertrauensetikett (**Vertrauen: hoch**, mittel oder niedrig). Je Gruppe sind die ersten vier Aufgaben sichtbar, der Rest öffnet sich mit **Alle anzeigen (N)**.

Erledigte Aufgaben markieren Sie mit **Erledigt**. Sie wandern unter „Als erledigt markiert (N)“ und kommen mit **Wiederherstellen** zurück. Die Markierungen speichert nur dieser Browser; in einem anderen Browser erscheinen die Aufgaben wieder. **Details** (oder **Diese Aufschlüsselung öffnen**) in einer Zeile öffnet die Details dieser Suche, Seite, dieses Geräts oder Landes. Betreffen mehrere Aufgaben dieselbe Suchanfrage oder Seite, zählt die Summe oben sie nur einmal.

### Suchanfragen und Seiten

Eine Tabelle nach Suchanfragen oder nach Seiten. Die Spalten sind **Suchanfrage** (oder **Seite**), **Klicks**, **Klickdifferenz** (gegenüber dem Vergleich), **Impressionen**, **CTR** und **Position**. Mit einem Klick auf die Überschrift sortieren Sie. Der Balken hinter einer Zeile zeigt ihren Anteil an den Klicks der Tabelle. Das Suchfeld oben durchsucht die Zeilen; daneben steht „{angezeigt} / {gesamt} Zeilen“.

**Schnellfilter.** Für Suchanfragen: **In den Top 10**, **Position 4-10**, **Position 11-20**, **Niedrige CTR**, **Keine Klicks**. Für Seiten: **In den Top 10**, **Angeklickt**, **Niedrige CTR**, **Keine Klicks**. **Niedrige CTR** heißt: Position auf der ersten Ergebnisseite, mindestens 100 Impressionen und eine Klickrate unter 2 Prozent.

**Zeilenmenü.** Hinter den drei Punkten: **Seite in einem neuen Tab öffnen**, **URL kopieren**, **Keyword kopieren**, **Als Keyword speichern**. Gespeicherte Keywords erscheinen unter **Gespeicherte Keywords**. Ein Klick auf eine Zeile öffnet das Detailfenster.

Der Hinweis unter der Tabelle nennt die Grundlage: „gelesen N Suchanfragen, N Klicks. Die Summe der Website beträgt N Klicks; der Unterschied stammt von den Suchanfragen, die Google verbirgt.“ Wurde Googles Zeilengrenze erreicht, weist der Hinweis darauf hin.

### Ranking-Chancen

Der Reiter hat vier Abschnitte:

- **Suchanfragen nahe den Top drei.** Suchanfragen ohne Markenbezug mit einer Durchschnittsposition zwischen 4 und 20. Der Abschnitt nennt als Obergrenze, wie viele Zusatzklicks sie zusammen bringen könnten, wenn jede eine Stufe aufstiege (von 6–10 auf 4–5, von 4–5 auf 2–3, von 11–20 auf Seite eins). Die Summe umfasst alle Suchanfragen in diesem Bereich, nicht nur die aufgelisteten, und nennt ihren Zeitraum, zum Beispiel „Zeitraum: 27. Sept. 2026 – 24. Okt. 2026.“ Werden nur die größten Gewinne aufgelistet, steht darunter „Die N mit dem größten Gewinn werden gezeigt.“ Die Tabelle zeigt **Suchanfrage**, **Zielseite**, **Position**, **Impressionen**, **Klicks** und **Möglicher Gewinn**. Die Zielseite ist die Seite, die Google für diese Suche am häufigsten zeigt. Ausgewählte Suchanfragen übernehmen Sie mit **Keywords kopieren** oder **Als Keyword speichern**.
- **Ergebnisse mit weniger Klicks, als ihre Position erwarten lässt.** Suchen, deren Klickrate unter 70 Prozent der Rate Ihrer Website für Ergebnisse auf derselben Position liegt. Der Gewinn entsteht ohne Positionswechsel, allein durch bessere Titel und Beschreibungen. Die Tabelle zeigt die Rate der Suche, die **Erwartet auf dieser Position** und den möglichen Gewinn.
- **Seiten, die erscheinen, aber nie geklickt werden.** Seiten, die im Zeitraum mindestens 100 Impressionen (für 28 Tage) und keinen einzigen Klick hatten.
- **CTR Ihrer Website nach Position.** Der Maßstab für die Gewinne oben: die Klickrate Ihrer eigenen Ergebnisse je Position, nicht die anderer Websites. Hat eine Position zu wenige Suchen oder Impressionen, steht dort „Zu wenig Daten“, und für sie wird nicht geschätzt. Sind Markennamen festgelegt, beruhen diese Raten nur auf Nicht-Marken-Suchen.

### Veränderungen

Verglichen wird der gewählte Zeitraum mit dem vorherigen.

- **Größte Veränderungen gegenüber dem Vorzeitraum.** Zwei Listen: **Fallend (N)** und **Steigend (N)**. Aufgenommen werden Suchanfragen und Seiten, deren Klicks sich um mindestens 3 und zugleich um mindestens 20 Prozent des früheren Werts verändert haben. Eine Zeile zeigt frühere und neue Klicks, Impressionen und Position.
- **Neu sichtbar** und **Verloren (mit Werten aus dem Vorzeitraum).** Nur Suchanfragen, die in genau einem der beiden Zeiträume mindestens 50 Impressionen (bezogen auf 28 Tage) hatten. Ist die Tabelle eines Zeitraums wegen der Zeilengrenze unvollständig, lässt sich nicht erkennen, welche Suche neu oder verloren ist, und der Bildschirm sagt das.
- **Seiten, die an Boden verlieren.** Seiten, deren Klicks im letzten Quartal (91 Tage) unter 70 Prozent des besten der vier Quartale davor fielen und die auch hinter dem gleichen Quartal des Vorjahres liegen. Dafür sind mehr als ein Jahr Daten nötig. Liefert die Search Console keine so alten Daten oder ist ein Filter aktiv, sagt der Bildschirm das.
- **Langfristig: monatliche Klicks.** Die Search Console reicht 16 Monate zurück. Die App bewahrt die Tagessummen auf diesem Computer länger auf; die Balken zeigen die Klicks je Monat. Ein Balken mit gestricheltem Rand ist ein Monat, den das Archiv nicht vollständig enthält. Füllt sich das Archiv noch, steht dort „Noch keine Tage im Archiv“ oder das Startdatum. Dieser Abschnitt folgt dem Gerätefilter, nicht dem Länderfilter.

### Überschneidungen

Dieser Reiter zeigt Suchanfragen, bei denen mehrere Ihrer Seiten erscheinen und sich die Klicks teilen.

- Drei Kacheln: **Suchanfragen mit konkurrierenden Seiten**, **Impressionen auf den anderen Seiten** und **Suchanfrage mit dem größten Verlust**. Ein Klick auf die letzte Kachel grenzt die Liste auf diese Suchanfrage ein.
- Die Tabelle **Seiten, die um dieselbe Suchanfrage konkurrieren** zeigt zu jeder Suchanfrage ihre Seiten mit Klicks, Impressionen und Positionen. Die Seite, die Google bei dieser Suchanfrage am häufigsten zeigt, gilt als die „bevorzugte“. Der Impressionsanteil der anderen steht als „außerhalb des Anteils“.
- Die Analyse betrachtet mindestens 28 Tage; ist „Letzte 7 Tage“ gewählt, nutzt sie 28 Tage und nennt den tatsächlichen Zeitraum. Geprüft werden Suchanfragen ab 100 Impressionen. Eine Seite zählt mit, wenn sie bei der Suchanfrage mindestens 10 Impressionen und 20 Prozent Anteil hat.
- Stößt die Abfrage an die Zeilengrenze der Search Console, warnt der Bildschirm, dass einige Suchanfragen nicht geprüft werden konnten.

### Verteilung

- **Positionsverteilung.** Zeigt, in welchen Positionsgruppen Ihre Suchanfragen erscheinen. Enthält das lokale Archiv mindestens zwei Wochen, folgt **Suchanfragen nach Woche** mit dem Anteil der Positionsgruppen je Woche. Dieses Diagramm gibt es nur für die Websuche und ohne Geräte- oder Länderfilter, weil das Archiv diese Aufschlüsselungen nicht speichert.
- **Marken- und Nicht-Marken-Suchen.** Suchanfragen mit Ihrem Markennamen und alle übrigen werden getrennt ausgewertet, jeweils mit Zahl der Suchanfragen, Klicks, CTR und durchschnittlicher Position. Ist kein Markenname festgelegt, steht dort „Markensuchen sind nicht getrennt“, und die Schaltfläche **Markennamen hinzufügen** erscheint. Hat die App Markennamen aus Ihrer Domain abgeleitet, steht dort „Nicht bestätigt.“, und gerechnet wurde mit diesen Vorschlägen. Klicken Sie auf **Vorschläge bestätigen** oder nutzen Sie **Markennamen bearbeiten**. Die Anteile beziehen sich auf die abgerufenen Suchanfragen ohne verborgene.
- **Geräte** und **Länder.** Ein Klick auf ein Gerät oder Land grenzt den ganzen Bildschirm darauf ein.
- **Darstellung in der Suche.** In welchen besonderen Formaten Ihre Ergebnisse erscheinen, etwa als Rich Result mit Zusatzangaben wie Produktdaten oder als Video. Google summiert diese Aufschlüsselung nach Seite. Hat Google kein besonderes Format gemeldet, sagt der Bildschirm das.
- **Fragesuchen.** Suchanfragen in Frageform und mit vier oder mehr Wörtern, eine gute Quelle für Inhaltsideen.

**Markennamen.** Unter **Markennamen bearbeiten** tragen Sie den Namen Ihrer Website und gängige Schreibweisen ein, etwa eine Kurzform. Suchanfragen mit diesen Wörtern gelten als Markensuchen. Über die Zeile **Vorschläge:** übernehmen Sie einen Namen mit einem Klick. Die Markennamen wirken auch auf die Gewinnschätzung unter **Chancen**, die Markensuchen auslässt.

**Detailfenster.** Ein Klick auf eine Suchanfrage oder Seite in einer Tabelle, bei Aufgaben, Ranking-Chancen oder Veränderungen öffnet es rechts. Es zeigt Zeitraum, die vier Kennzahlen mit Veränderung und die Linie **Tägliche Klicks**. Bei einer Seite erscheint eine Liste „Suchanfragen dieser Seite (N)“, bei einer Suche „Seiten für diese Suchanfrage (N)“. Jede Zeile nennt Klicks und Position. Ergeben die Suchanfragen einer Seite weniger als ihre Summe oder fehlen sie ganz, stammen die Klicks aus verborgenen Suchanfragen. **Seite öffnen** öffnet die Seite in einem neuen Tab. **Als Keyword speichern** legt die Suchanfrage unter **Gespeicherte Keywords** ab. Links aus Chancen und Ranking-Verfolgung öffnen dieses Fenster direkt für die exakte URL oder Suchanfrage und deren Zeitraum; ein nicht lesbarer Zeitraum wird nie stillschweigend ersetzt.

## So gehen Sie vor

1. Lesen Sie zuerst die Zusammenfassung: Steigen oder fallen die Klicks?
2. Sehen Sie sich **Damit anfangen** oder den Reiter **Aufgaben** an. Die ersten drei Aufgaben bringen am meisten.
3. Gibt es einen großen Rückgang, stellen Sie den **Zeitraum** auf **Letzte 3 Monate**. Suchen Sie im Diagramm den Tag, an dem der Rückgang begann; die Markierungen zeigen, ob dort ein Google-Update oder eine eigene Änderung liegt.
4. Sehen Sie sich im Reiter **Ranking-Chancen** die **Suchanfragen nahe den Top drei** an. Öffnen Sie die Seiten der drei Suchanfragen mit den meisten Impressionen und richten Sie Titel und ersten Absatz auf die jeweilige Suchanfrage aus.
5. Wählen Sie im Reiter **Suchanfragen** den Schnellfilter **Niedrige CTR**. Diese Ergebnisse stehen gut, werden aber kaum geklickt; meist liegt es an Titel und Beschreibung.
6. Sehen Sie sich im Reiter **Veränderungen** **Fallend** an. Öffnen Sie die oberste Suchanfrage und lesen Sie im Detailfenster ab, wann der Rückgang begann.
7. Konkurrieren im Reiter **Überschneidungen** mehrere Seiten um dieselbe Suchanfrage, legen Sie eine Hauptseite fest und richten Sie die internen Links auf sie aus.
8. Halten Sie jede Korrektur mit **Notiz hinzufügen** im Diagramm fest. Nach etwa zwei Wochen sehen Sie dort ihre Wirkung.
9. Markieren Sie fertige Aufgaben mit **Erledigt**.
10. Speichern Sie am Monatsende die Ansicht mit **Bericht herunterladen**.

## Wie die Zahlen berechnet werden

Google liefert die Daten mit etwa drei Tagen Verzögerung; der Zeitraum endet deshalb drei Tage vor heute. Der Vorzeitraum ist der gleich lange Zeitraum direkt davor, der Vorjahresvergleich nutzt dieselben Tage des Vorjahres.

Die Kacheln zeigen die tatsächlichen Summen der Website. Die Seitentabelle zählt jede Seite, die bei derselben Suche erscheint, einzeln; ihre Summe ist deshalb größer als die Kachel. Die Summe der Suchanfragen-Tabelle ist kleiner, weil verborgene Suchanfragen fehlen. Beides ist kein Fehler.

Die App liest die Tabellen für Suchanfragen, Seiten und Suchanfrage-Seite-Paare in Abschnitten von 25.000 Zeilen, bis Google keine neuen Zeilen mehr liefert. Google stellt pro Tag und Suchtyp höchstens 50.000 Zeilen bereit und kann einzelne Zeilen auslassen; auch vollständig gelesene Abschnitte enthalten also nicht jede Suche. Ist die Grenze erreicht, fehlen die Zeilen mit den wenigsten Klicks, und der Bildschirm weist darauf hin. Die Summen der Website stammen nicht aus diesen Tabellen, sondern aus Googles eigener Gesamtzahl.

Die App startet höchstens zehn Anfragen pro Sekunde an Google. Meldet Google einen Kontingentfehler, warten neue Abrufe fünfzehn Minuten. Quellen: [Googles Anleitung zum Abruf aller Daten](https://developers.google.com/webmaster-tools/v1/how-tos/all-your-data), [API-Kontingente](https://developers.google.com/webmaster-tools/limits).

**Möglicher Gewinn.** Die App nimmt die Klickrate Ihrer Website für die nächsthöhere Positionsstufe, multipliziert sie mit den Impressionen der Suchanfrage und zieht die aktuellen Klicks ab. Suchanfragen unter 50 Impressionen (bezogen auf 28 Tage) zählen nicht, Markensuchen ebenfalls nicht. Bei Titelproblemen ist der Maßstab die Klickrate Ihrer Website auf derselben Position. Dieselbe Rechnung nutzt der Bildschirm **Chancen**.

**Vertrauensetikett.** Es zeigt, wie belastbar die Daten hinter einem Befund sind: hoch, mittel oder niedrig.

## Häufige Fragen

**Meine Position ist bei einer Google-Suche anders.** Die Position hier ist ein Durchschnitt über den Zeitraum, nicht das Ergebnis einer einzelnen Suche.

**Die gesuchte Suchanfrage steht nicht in der Liste.** Google verbirgt sehr selten gesuchte Suchanfragen. Bei kleinen Websites gibt es womöglich gar keine Suchanfragenzeilen.

**Warum ist eine Aufgabe verschwunden?** Wenn Sie sie als erledigt markiert haben, steht sie unter „Als erledigt markiert“.

**Soll ich Seiten zusammenführen, wenn sie sich überschneiden?** Meist nicht. Legen Sie eine Hauptseite fest und richten Sie die internen Links auf sie aus. Nur wenn die Seiten wirklich dieselbe Frage beantworten, führen Sie sie zusammen.

**Muss ich einen Markennamen eintragen?** Nein. Ohne Markennamen verzerren Suchen nach Ihrem eigenen Namen jedoch die CTR-Werte, und die Chancen werden ungenau. Daran erinnert die Aufgabe „Legen Sie Ihren Markennamen fest“ bzw. „Markennamen bestätigen“.

## Wenig Daten

Liegen die Klicks des Vergleichszeitraums unter der Analyseschwelle, nennt die Zusammenfassung zuerst die tatsächlichen Klicks und Impressionen; Prozentsätze und Mittelwerte belegen dann weder Wachstum noch Verlust. Eine leere Liste der Ranking-Chancen heißt nicht, dass keine Suchanfrage auf Position 4 bis 20 steht: Auch die zeitraumabhängige Impressionsschwelle und der Ausschluss von Markensuchen wirken. Ist die Aufgabenliste leer, öffnen Sie die sichtbaren Suchanfragen; sind bereits die letzten drei Monate gewählt, schlägt die App keinen längeren Zeitraum vor.

## Grenzen

Die Suchtypen Discover und Google News sind nicht enthalten. Es gibt weder Suchvolumen noch Positionen von Mitbewerbern. Google liefert höchstens 16 Monate. Ältere Daten stehen im lokalen Archiv: Das Langzeit-Diagramm im Reiter **Veränderungen** und der Bildschirm **Ranking-Verfolgung** lesen daraus. Das Archiv füllt sich nur, solange dieser Bildschirm oder die Ranking-Verfolgung geöffnet ist.

<!-- Quellen: src/routes/_project/p/$projectId/search-performance.tsx; src/client/features/search-performance/SearchPerformancePage.tsx; SearchPageParts.tsx; SearchFilters.tsx; DataTrustStrip.tsx; SearchVerdict.tsx; KpiTiles.tsx; SearchTrendChart.tsx; TrendParts.tsx; SearchNotes.tsx; LongTermTrend.tsx; TodoTab.tsx; DimensionTab.tsx; DimensionTableParts.tsx; OpportunitiesTab.tsx; StrikingTable.tsx; ChangesTab.tsx; CannibalizationSummary.tsx; CannibalizationTable.tsx; DistributionTab.tsx; PositionDistribution.tsx; DrilldownPanel.tsx; BrandTerms.tsx; SearchReportButton.tsx; src/shared/searchInsights.ts; src/shared/searchTodoCopy.ts; src/shared/searchQuickFilters.ts; src/shared/dataFreshness.ts; src/serverFunctions/searchPerformance.ts; src/server/features/gsc/cannibalization.ts -->
