---
title: État de l'index
description: Google a-t-il mis chacune de vos pages dans la recherche, sinon pourquoi, et quand les a-t-il explorées pour la dernière fois ? Vous pouvez l'interroger sur 2 000 pages par jour au plus.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

Cet onglet dit quelles pages Google a mises dans la recherche.

L'audit du site dit si la page s'ouvre. Il ne peut pas dire si Google a vraiment pris la page dans son index (la liste des pages de Google). L'onglet **Dizin durumu** (État de l'index) pose la question à Google et conserve la réponse sur cet ordinateur. Il ne repose pas sans cesse la même question : seules les réponses anciennes sont redemandées. C'est important, car Google accorde 2 000 questions par jour pour chaque propriété (l'enregistrement de votre site dans Search Console). L'application et votre assistant se partagent ce quota.

## Ce que l'écran affiche

**L'anneau « Google bu sayfalarla ne yapmış? » (Qu'a fait Google de ces pages ?).** Les pages explorées sont réparties en trois groupes :

- **Google'da** (Dans Google) : elle peut apparaître dans la recherche.
- **Dizinde değil** (Pas dans l'index) : Google l'a regardée mais ne l'a pas prise.
- **Yanıt bekleyen** (En attente de réponse) : elle n'a pas encore été interrogée, ou aucune réponse n'a pu être obtenue.

**Encadrés de synthèse.** Vous voyez combien de pages ont été interrogées, combien sont dans l'index, combien ne le sont pas et combien attendent. L'encadré « Google'ın farklı adresi seçtiği sayfalar » (Pages pour lesquelles Google a choisi une autre adresse) compte les pages pour lesquelles Google a choisi une adresse différente de la canonical (l'indication de l'adresse principale) que vous avez déclarée. L'encadré « Bu denetimde henüz sorulmamış » (Pas encore interrogées dans cet audit) est le nombre de pages qui attendent d'être interrogées.

**Bouton « Google'da durumunu kontrol et » (Vérifier l'état dans Google).** À chaque clic, il interroge 25 pages au maximum. Il commence par celles qui n'ont pas reçu de réponse depuis le plus longtemps. Si la limite quotidienne est atteinte, l'avertissement « Google'ın günlük 2.000 adres sınırına ulaşıldı » (La limite quotidienne de 2 000 adresses de Google est atteinte) apparaît. Si Search Console n'est pas connecté, le bouton est désactivé. Il l'est aussi si le nom de domaine audité n'est pas dans la propriété connectée.

**Tableau.** Les colonnes sont : **Sayfa** (Page), **Durum** (État), **Sebep** (Raison), **Google'ın seçtiği adres** (Adresse choisie par Google), **Google'ın son ziyareti** (Dernière visite de Google). La cellule d'état indique « Google'da » (Dans Google), « Kontrol edilmedi » (Non vérifiée), « Yanıt alınamadı » (Pas de réponse), « Hata » (Erreur), ou l'un des 18 états de Google, affiché en turc. Quelques exemples :

- « Keşfedildi, henüz taranmadı » (Découverte, pas encore explorée)
- « 'noindex' etiketiyle dışlandı » (Exclue par la balise « noindex » : la page est cachée de la recherche)
- « robots.txt engelliyor » (Bloquée par robots.txt : robots.txt est le fichier qui dit à Google à quelles pages il peut accéder)
- « Yumuşak 404 » (Soft 404 : la page existe mais Google la considère comme vide)
- « Google bu adresi bilmiyor » (Google ne connaît pas cette adresse)

Vous pouvez télécharger le tableau en CSV.

## Comment l'utiliser

1. Quand l'audit est terminé, ouvrez l'onglet. Si le nombre « Yanıt bekleyen » est élevé, cliquez sur **Google'da durumunu kontrol et**. Chaque clic fait avancer de 25 pages. Sur un petit site, quelques clics suffisent.
2. Regardez d'abord le groupe « Dizinde değil ». La colonne **Sebep** donne la justification de Google et, le plus souvent, elle dit ce qu'il faut faire. Si c'est « robots.txt engelliyor », levez le blocage. Si c'est « 'noindex' etiketiyle dışlandı », supprimez la balise. Si c'est « Keşfedildi, henüz taranmadı », attendre suffit généralement.
3. Ajoutez au plan du site (sitemap) les pages importantes qui indiquent « Google bu adresi bilmiyor ». Envoyez le plan à Search Console. Pour trois ou quatre pages très importantes, cliquez à la main sur « Demander l'indexation » (« Dizine eklenmesini iste » dans la version turque) dans Search Console.
4. Si l'encadré « Google'ın farklı adresi seçtiği sayfalar » n'est pas à zéro, regardez la colonne **Google'ın seçtiği adres**. Google n'a pas retenu l'adresse principale que vous avez déclarée. Corrigez la vôtre, ou faites de l'adresse choisie par Google l'adresse principale.
5. Recliquez quelques jours plus tard. Seules les réponses devenues anciennes sont reposées, et votre quota n'est pas gaspillé.

## Comment les chiffres sont calculés

Si Google répond « dans l'index », la page est comptée « Google'da ». S'il répond « pas dans l'index » ou « indéterminé », elle est comptée « Dizinde değil ». S'il n'y a pas de réponse, la page devient « Yanıt bekleyen ».

Une réponse devient ancienne après un certain délai ; elle est alors redemandée. Pour une page dans l'index, ce délai est de 14 jours. Pour une réponse « pas dans l'index » ou en erreur, il est de 3 jours. Une page jamais interrogée est toujours prête à l'être. La limite quotidienne est calculée avec le nombre de questions des 24 dernières heures. L'application ne compte que ses propres questions. Les requêtes que vous faites à la main dans Search Console n'entrent pas dans ce compteur, mais elles comptent dans la vraie limite de Google.

Un décalage d'adresse principale signifie que l'adresse choisie par Google est différente de celle que vous avez déclarée. Une différence de barre oblique finale compte aussi.

Si la dernière exploration de Google date de plus de 90 jours, l'audit écrit le problème « Google bu sayfayı uzun süredir taramadı » (Google n'a pas exploré cette page depuis longtemps). Les réponses périmées sont regroupées dans un seul problème : « Google'ın bazı sayfalar hakkındaki yanıtı eskimiş » (La réponse de Google sur certaines pages est périmée).

## Questions fréquentes

**Pourquoi le bouton est-il désactivé ?** Il y a trois raisons possibles. Search Console n'est pas connecté. Il ne reste aucune page à interroger. Ou le nom de domaine que vous auditez n'est pas dans la propriété connectée. Cela arrive si vous avez audité un autre site.

**À qui appartient la limite de 2 000 ?** À la propriété. Deux projets rattachés à la même propriété et votre assistant puisent dans la même réserve.

**Que faire pour une page « Keşfedildi, henüz taranmadı » ?** Le plus souvent, rien. Sur les sites récents, Google peut faire attendre des semaines. Placer un lien depuis les pages du site que Google explore souvent accélère les choses.

**Cet onglet signale-t-il de nouvelles pages à Google ?** Non, il ne fait que poser la question. Pour signaler, il y a le plan du site et « Demander l'indexation » dans Search Console.

## Limites

Les réponses sont celles de Google, rien de plus. Google peut laisser certains champs vides. Vous ne pouvez pas dépasser 2 000 questions par jour. Interroger entièrement un site de 10 000 pages prend cinq jours. L'onglet n'interroge que les pages explorées. Les adresses qui n'entrent pas dans l'audit n'apparaissent pas dans la liste.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
