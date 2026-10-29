---
title: Clé PageSpeed
description: Créer une clé d’API PageSpeed Insights gratuite, l’enregistrer dans Paramètres, la tester et lire les compteurs de quota des audits.
kind: nasil-yapilir
updated: 2026-10-27
---

L’audit du site mesure la vitesse des pages avec Google PageSpeed Insights. La clé d’API est gratuite et facultative. Sans clé, l’application mesure au plus 50 pages par audit, et Google interrompt souvent plus tôt les requêtes sans clé avec une erreur 429 (trop de requêtes). L’exploration et les autres contrôles n’ont pas besoin de clé.

## Créer et enregistrer une clé

1. Dans la console Google Cloud, activez **PageSpeed Insights API**.
2. Créez une clé d’API et limitez-la à PageSpeed Insights API.
3. Dans seowatcher, ouvrez **Paramètres → Tests de vitesse**, collez la clé et cliquez sur **Enregistrer**.

L’application chiffre la clé et ne l’affiche plus jamais. Avec Docker, vous pouvez utiliser la variable `PAGESPEED_API_KEY` ; une clé enregistrée dans Paramètres est prioritaire.

## Tester la clé

**Tester la clé** envoie une vraie requête mobile pour example.com. Le test ne mesure pas votre site et n’entre pas dans le compteur des audits. Le résultat et sa date s’affichent à côté du bouton. Le bouton reste désactivé pendant le test et au moins dix secondes après le clic. Enregistrer une autre clé efface l’ancien résultat.

Un test réussi prouve seulement que cette requête a abouti. Une clé ne garantit pas que chaque mesure d’audit réussira ; consultez votre quota réel dans la console Google Cloud.

## Compteurs de quota

Le compteur PageSpeed de **Paramètres → Limites** compte les mesures des audits lancés au cours des dernières 24 heures. Il ne compte ni les tests de clé ni les autres programmes qui utilisent la même clé.

## Résoudre un échec

| Résultat                       | Que faire                                                                           |
| ------------------------------ | ----------------------------------------------------------------------------------- |
| Clé invalide                   | Recopiez la clé depuis la console Google Cloud et enregistrez-la.                   |
| 403 ou clé restreinte          | Vérifiez que l’API est activée et que les restrictions de la clé l’autorisent.      |
| 429 ou quota quotidien atteint | Attendez la réinitialisation du quota, puis consultez les quotas dans Google Cloud. |
| Erreur réseau                  | Vérifiez la connexion internet et relancez le test.                                 |
