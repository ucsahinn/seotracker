---
title: Suivi des classements
description: Suivre les positions moyennes Google de vos requêtes et leur évolution. L’archive locale conserve les données au-delà de la limite de 16 mois.
screen: Sıralama takibi
route: /p/<proje>/rankings
updated: 2026-10-28
---

Cet écran présente l’historique des requêtes Web de Search Console accumulé sur cet ordinateur. Google conserve ces données 16 mois ; l’archive locale de seowatcher garde au-delà de cette limite les jours qu’elle a déjà importés.

Deux notions à distinguer d’emblée. La position moyenne n’est pas une place fixe que vous retrouverez à chaque recherche : elle varie selon le pays, l’appareil et le contexte. Les impressions ne sont pas non plus un volume de recherche.

## Par où commencer

En haut s’affichent le nombre de requêtes observées sur les deux périodes et celles qui ont gagné ou perdu au moins une demi-position. Les requêtes impossibles à comparer sont comptées à part.

Commencez par la suggestion « Examinez d’abord … ». Elle retient la requête dont la variation de position multipliée par les impressions est la plus forte. C’est un ordre d’examen, pas une estimation de clics perdus.

Les listes **Hausses et baisses** affichent d’abord trois requêtes, cinq une fois développées. Le bouton pour développer n’apparaît qu’au-delà de trois mouvements. Si aucune requête n’est observée sur les deux périodes, les mouvements ne sont pas calculables et la carte le dit, au lieu d’afficher zéro mouvement.

## Période

Choisissez 30, 90, 180, 480 ou 1825 jours. L’option la plus longue couvre les cinq dernières années, pas davantage. Les libellés en mois sont approximatifs ; les dates exactes figurent dans la section **Couverture des données et calcul**.

Les dates suivent l’heure du Pacifique utilisée par Google (America/Los_Angeles). Le dernier jour est choisi en supposant trois jours de retard, sans confirmation en direct de Google. Seules les données finalisées par Google entrent dans l’archive.

## Remplissage de l’archive

Tant que cet écran est ouvert, les jours manquants se chargent automatiquement ; **Performances de recherche** met aussi l’archive à jour quand il est ouvert, comme l’indique la note « Les jours restants se chargent automatiquement tant que cette page est ouverte ; une erreur de connexion ou de quota suspend la synchronisation. »

- Après chaque import partiel, l’application attend 15 secondes avant de demander la tranche suivante.
- Une fois l’archive à jour, elle vérifie toutes les 15 minutes.
- Après une erreur de connexion ou de quota, elle attend 15 minutes avant de réessayer.
- Après une erreur d’autorisation, vous devez renouveler la connexion vous-même.
- Rien n’est importé quand les deux écrans, ou l’application, sont fermés. **Continuer à remplir l’archive** relance l’import à la main.

Le premier import part du début de la fenêtre de 16 mois de Google. Si l’ordinateur est resté longtemps éteint, les jours manquants sont complétés tant que Google les fournit encore ; ceux qu’il ne fournit plus sont perdus. Les archives commencées avec l’ancienne limite de 480 jours ne sont pas réexplorées automatiquement depuis le début.

Chaque passage traite au plus quatre fenêtres de temps. Les fenêtres très chargées sont découpées par jour et reprises aux passages suivants. Pour un jour donné, 50 000 lignes au plus sont lues ; un jour qui reste incomplet malgré cela est marqué comme tel.

## Couverture de l’archive

Les jours sont répartis en quatre groupes : réponse complète de Google, limite de l’application atteinte, échec et inconnu. Les anciens jours de l’archive ne deviennent pas complets après coup.

« Analyse jusqu’au » et la date de la dernière observation sont deux informations différentes. **Dernière vérification** ne signifie pas non plus que tous les jours sont complets. L’historique existant reste consultable pendant l’import.

Même une réponse complète ne couvre pas toutes les recherches : Google ne renvoie jamais les requêtes anonymisées ni certaines lignes rares. L’archive n’est pas la liste de toutes les recherches.

## Distribution des positions

**Distribution des positions** répartit en groupes toutes les requêtes observées sur la période. Les positions sont arrondies : 3,4 tombe dans le premier groupe, 3,5 dans le deuxième. La longueur des barres est relative au plus grand groupe ; le pourcentage indique la part de chaque groupe parmi les requêtes observées. La variation nette ne porte que sur les requêtes observées sur les deux périodes. Sans comparaison, aucun zéro n’est affiché.

## Liste des requêtes et filtres

**Rechercher dans les requêtes archivées** et les filtres portent sur toute l’archive, pas seulement sur les cent premières requêtes. Les compteurs tiennent compte de tous les filtres actifs.

| Filtre                          | Requêtes affichées                                                           |
| ------------------------------- | ---------------------------------------------------------------------------- |
| **Top 10**                      | Moyenne de la période dans le top 10, y compris sans observation antérieure. |
| **Sorties du top 10**           | Observées sur les deux périodes et sorties du top 10.                        |
| **Requêtes les plus affichées** | Impressions égales ou supérieures au seuil du quart supérieur.               |
| **Aucun clic**                  | Affichées mais jamais cliquées.                                              |

**Effacer tous les filtres** les retire d’un coup. Une page affiche 25, 50 ou 100 requêtes ; les résumés ne dépendent pas de la taille de page.

Les requêtes vues lors de la période précédente mais absentes de la période actuelle forment une liste à part. Cette liste ne prouve pas que la position est tombée à zéro ou que la requête a disparu. Les 25 premières, par impressions, sont affichées, et la recherche s’y applique aussi.

## Historique d’une requête

Les positions moyennes sont pondérées par les impressions. La variation est la différence entre la moyenne précédente et la moyenne actuelle. Sous 0,05 position, elle est neutre ; un mouvement est marqué à partir de 0,5. **Premier/dernier jour enregistré** est une information distincte, qui ne remplace pas la comparaison des périodes.

Le nombre de **Jours observés** est toujours indiqué : 10 jours observés sur 90 ne constituent pas une couverture complète. Le graphique quotidien suit les dates réelles et la ligne s’interrompt sur les jours manquants. Les touches fléchées, Début et Fin parcourent les jours ; **Valeurs quotidiennes** les donne sous forme de texte. En vue hebdomadaire, les semaines sans aucune donnée restent vides, et la première et la dernière semaine peuvent être partielles.

**Ouvrir dans Performances de recherche** conserve la requête et les dates de l’archive. Si la période dépasse la fenêtre de 16 mois de Google, la première date disponible remplace le lien.

**Ajouter aux mots-clés enregistrés** ajoute la requête à l’écran [Mots-clés enregistrés](/docs/kayitli-kelimeler/).

Cet écran ne propose ni classement des concurrents, ni volume de recherche, ni prévision de trafic.
