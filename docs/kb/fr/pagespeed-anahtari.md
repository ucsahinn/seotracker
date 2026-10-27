---
title: Clé PageSpeed
description: Enregistrer une clé PageSpeed et comprendre les tests et compteurs d’audit.
kind: nasil-yapilir
updated: 2026-10-27
---

## Ajouter une clé

Activez PageSpeed Insights API dans Google Cloud, créez une clé et limitez-la à cette API. Enregistrez-la dans Paramètres → Mesure de vitesse. La clé est chiffrée et jamais affichée. Docker accepte PAGESPEED_API_KEY; la valeur des Paramètres est prioritaire.

## Sens du test

Le test envoie une requête mobile réelle pour example.com. Il ne mesure pas votre site et n'augmente pas le compteur d'audit. Le résultat et la date apparaissent. Le bouton reste désactivé pendant la requête et au moins dix secondes après le clic. Changer de clé retire l'ancien résultat.

## Limites et récupération

Sans clé, l'application tente au plus 50 pages par audit. Google peut limiter plus tôt; une clé ne garantit pas le succès. Le quota réel se consulte dans Google Cloud. Le compteur PageSpeed ne couvre que les audits commencés dans les dernières 24 heures, sans tests ni autres programmes.

Clé invalide : recopiez-la. Pour 403, vérifiez l'activation de l'API et les restrictions. Attendez en cas de limite journalière ou de débit, puis consultez les quotas Cloud. Réessayez après une erreur réseau. Enregistré décrit la configuration; un test réussi confirme seulement cette requête.
