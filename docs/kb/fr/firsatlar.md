---
title: Opportunités
description: Quelle page travailler d’abord ? Vos pages visibles dans Google, classées par plafond de clics supplémentaires, avec le travail suggéré.
screen: Fırsatlar
route: /p/<proje>/opportunities
updated: 2026-10-27
---

Le calcul repose sur vos données Search Console et sur les taux de clics de votre propre site. Chaque page reçoit un travail suggéré et le plafond de clics supplémentaires que ce travail pourrait apporter. Ce plafond n’est ni un résultat attendu ni une garantie.

## Par où commencer

La carte **Commencez ici** ouvre la page dont le plafond calculable est le plus élevé. Ce classement ne mesure pas la facilité ni la rapidité du travail ; il montre seulement l’ampleur du gain possible.

## Quatre types de travail

Chaque page est rangée dans un type de travail d’après ses recherches mesurées :

| Type de travail                       | Situation                                                                                 | Suggestion                                                               |
| ------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Titre et description**              | En première page, mais moins cliquée que les recherches de votre site à la même position. | **Réécrivez le titre et la description**                                 |
| **En première page, positions 4-10**  | Sous les trois premiers résultats. Gagner une place augmente nettement les clics.         | **Renforcez le contenu**                                                 |
| **En deuxième page, positions 11-20** | Juste derrière la première page ; peu de clics tant qu’elle n’y est pas.                  | **Ajoutez des liens internes, étoffez le contenu**                       |
| **Loin, au-delà de la position 20**   | Des impressions, mais une position basse.                                                 | **Examinez l’intention de recherche et les sujets couverts par la page** |

Une position basse ne justifie pas à elle seule de supprimer ou de fusionner une page. N’envisagez une fusion qu’après avoir vérifié que deux pages répondent au même besoin.

## Période et plafond sur 30 jours

Choisissez une période de 7, 28 ou 90 jours. Seuls les jours que Google déclare complets sont utilisés, selon le calendrier du Pacifique de Search Console. Si Google ne fournit pas cette limite, l’application suppose un délai et l’indique à l’écran. Les dates réelles de début et de fin restent toujours visibles.

**Au plus ce nombre de clics en plus / mois (plafond)** ramène le gain de la période choisie à 30 jours. Ce n’est ni une prévision pour un mois calendaire, ni une garantie, ni un volume de recherche. Il ne couvre que les recherches fournies par Google, identifiables et suffisamment documentées. La part des requêtes masquées par Google reste inconnue.

L’estimation par requête du tableau de bord suit un autre calcul : n’additionnez pas les deux nombres.

## Liste, filtres et détails

Le filtre **Types de travail** et le filtre de conversion se combinent : seules les pages qui satisfont les deux sont listées. Le serveur applique les filtres à toutes les pages candidates, puis affiche les 25, 50 ou 100 premières. Les totaux du haut ne dépendent ni du nombre de lignes ni des filtres. Une page peut figurer dans plusieurs types de travail : n’additionnez pas leurs nombres de pages. La période, le nombre de lignes et les filtres sont conservés dans la barre d’adresse.

Sur ordinateur, la liste est un tableau triable ; sur téléphone, des lignes où l’adresse passe à la ligne. **Détails** ouvre les recherches mesurées de la page : impressions, position, position cible et part du gain attribuée à chaque recherche. Les dix recherches les plus rentables ont chacune leur ligne, le reste est regroupé sous **Autres requêtes (solde réparti)** ; ensemble, elles redonnent le gain de la page. L’écart de CTR n’est calculé que sur les recherches hors marque comparables, en points de pourcentage.

Les pages dont le gain n’est pas calculable sont aussi listées : d’abord les pages avec estimation, par gain, puis les pages en **Gain inconnu**, par impressions. Pour ces dernières, la suggestion ne repose que sur la position : 1 à 5, titre et description ; 6 à 10, contenu ; 11 à 20, liens internes et contenu ; au-delà, intention de recherche. Un gain inconnu n’est pas un gain nul et n’entre pas dans les totaux. Si aucun gain n’est connu, les types de travail affichent le nombre de pages candidates au lieu de barres.

## Périmètre non calculable

La section **Périmètre non calculable** compte séparément les raisons pour lesquelles un gain n’a pas pu être calculé : requête sans correspondance, impressions insuffisantes, taux cible absent. Un gain mesuré à zéro est un autre cas. Que Google ne renvoie aucune ligne ne prouve pas non plus l’absence d’impressions.

Avec peu de données, l’écran ne compte pas le gain comme nul. S’il n’y a aucune recherche hors marque utilisable, la cause peut être les requêtes masquées, la séparation de la marque ou les limites de données. Si la période la plus longue n’est pas sélectionnée, l’écran en propose une plus longue. **Ouvrir Performances de recherche** montre les recherches qui ont reçu des impressions. Le détail du calcul figure dans la section **Couverture des données et calcul**.

Pour une page au gain inconnu, examinez d’abord la page et ses recherches mesurées. Ne modifiez le titre ou le contenu que si vous constatez un décalage entre la page et ces recherches.

## Apport d’Analytics

Si Analytics est connecté, chaque page reçoit ses sessions organiques, ses événements clés et sa part de sessions avec conversion, tels que mesurés. Aucune conversion future n’est déduite des clics supplémentaires, et une mesure restreinte n’est jamais convertie en zéro.

- Le résumé des conversions compte à part les pages correspondantes et celles dont l’état de conversion est inconnu. Sans couverture Analytics, l’écran n’affirme pas zéro conversion.
- Le filtre **Afficher les pages avec conversions** n’apparaît que si des conversions sont confirmées.
- Plusieurs variantes d’une adresse peuvent tomber dans le même groupe Analytics : n’additionnez pas ces sessions d’une ligne à l’autre.
- La raison d’une donnée Analytics sans correspondance est expliquée une seule fois, dans les détails.

**Examiner le groupe d’adresses Analytics** ouvre Analytics sur le groupe d’adresses de la page, avec les mêmes dates de source. Le groupe est filtré parmi les 1 000 lignes de source au plus qu’utilise Opportunités. Si l’adresse ou les dates ne peuvent pas être mises en correspondance, une explication remplace le lien.

Analytics utilise le fuseau horaire de la propriété, Search Console le calendrier du Pacifique : une même date peut couvrir des intervalles différents dans les deux sources.

En cas de quota épuisé, patientez puis actualisez ; en cas de refus d’autorisation, vérifiez la connexion avec **Configurer les connexions**. Si une actualisation échoue, le résultat précédent reste affiché avec ses dates et un avertissement.

## Export

**CSV** et **Exporter vers Google Sheets** n’exportent que les lignes affichées et filtrées. S’y ajoutent les dates de mesure, l’unité du plafond sur 30 jours, le modèle, la propriété, la séparation de la marque, les limites de source et le groupe d’adresses Analytics. Un gain inconnu reste vide ; l’état, la raison, l’indicateur de marque et les recherches mesurées sont renseignés. L’écriture dans Google Sheets ne se fait que si vous la lancez depuis le menu.

## Mesurer l’effet d’une modification

**Ouvrir dans Performances de recherche** ouvre le détail de l’adresse exacte dans Performances de recherche, avec les mêmes dates de début et de fin. Si la période n’est plus disponible, l’écran ne bascule pas sur d’autres jours : il indique la période utilisable.

Notez la date de chaque modification. Comparez ensuite les clics, le CTR et la position mesurés sur des périodes de même durée. Une baisse du plafond dans Opportunités ne prouve pas à elle seule le succès.
