---
title: Clé PageSpeed
description: Obtenez une clé Google PageSpeed gratuite et saisissez-la dans l'application pour mesurer la vitesse des pages. Sans clé, la mesure s'arrête à 50 pages.
kind: nasil-yapilir
updated: 2026-10-22
---

À la fin de cette page, vous aurez obtenu votre clé PageSpeed gratuite, vous l'aurez saisie dans l'application et vous l'aurez essayée. Cela prend cinq minutes. L'option « Mesurer aussi la vitesse des pages » de l'audit du site mesure chaque page avec le service PageSpeed Insights de Google, sur téléphone et sur ordinateur. Google fournit ce service même sans clé, mais le quota est très faible. Après quelques pages, Google répond « 429 » (trop de requêtes). C'est pourquoi, pour un audit sans clé, l'application limite la mesure à 50 pages au maximum. La clé gratuite lève cette limite.

## Ce qu'il vous faut

- Un compte Google et un projet dans Google Cloud Console (la page des développeurs de Google). Si vous avez déjà créé un projet pour la connexion à Google, c'est le même.
- Aucune carte bancaire ni aucun paiement n'est nécessaire. L'API PageSpeed Insights (la porte d'accès au service) est gratuite.

## Étapes

1. Sur `console.cloud.google.com`, choisissez votre projet.
2. Ouvrez la page **API et services → Bibliothèque**. Cherchez **PageSpeed Insights API** et cliquez sur **Activer**. Si vous sautez cette étape, vous aurez une clé, mais chaque requête sera refusée avec l'erreur 403.
3. Cliquez sur **API et services → Identifiants → Créer des identifiants → Clé API**. Une clé qui commence par « AIza » apparaît. Copiez-la.
4. Facultatif mais recommandé : cliquez sur **Restreindre la clé**. Dans la restriction d'API, choisissez uniquement **PageSpeed Insights API**. Si votre assistant IA doit aussi consulter l'historique des données de vrais utilisateurs (CrUX), ajoutez aussi **Chrome UX Report API**.
5. Dans l'application, ouvrez **Paramètres → Tests de vitesse**. Collez la clé dans le champ **Clé API**. Cliquez sur **Enregistrer**. La notification « Clé PageSpeed enregistrée » apparaît. Aucun redémarrage n'est nécessaire.
6. Dans la même section, cliquez sur le bouton **Tester la clé**. L'application effectue une seule vraie mesure pour example.com (elle consomme 1 mesure). Vous devez voir cette réponse : « La clé fonctionne : Google PageSpeed Insights a accepté la mesure. »

Si vous utilisez Docker, vous pouvez aussi donner la clé dans le fichier `.env` sous le nom `PAGESPEED_API_KEY`. L'écran Paramètres est plus simple, et la valeur qu'on y saisit est prioritaire.

## Vérification

- Le badge de **Paramètres → Tests de vitesse** doit indiquer **Clé enregistrée**.
- Dans la carte de lancement de l'audit du site, quand « Mesurer aussi la vitesse des pages » est activé, l'estimation de durée ne doit plus parler de la limite de « 50 pages au maximum ».
- La carte « PageSpeed Insights » de **Paramètres → Limites** doit indiquer « Une clé est définie ».

## Questions fréquentes

**Quel est le quota ?** Google ne donne pas de chiffre officiel et le modifie avec le temps. Vous voyez la valeur réelle dans Cloud Console, dans **API et services → Quotas**. En pratique, il existe une limite par minute et une limite par jour. Chaque page consomme deux mesures : téléphone et ordinateur.

**Que se passe-t-il si j'atteins la limite par minute ?** L'application attend et réessaie. L'audit ralentit, mais vous n'avez rien à faire. Si la limite quotidienne est atteinte, la mesure s'arrête. Les résultats obtenus jusque-là sont conservés. Le reste est complété lors d'un nouvel audit le lendemain.

**Et si deux audits mesurent la vitesse en même temps ?** Ils se partagent la limite par minute et ralentissent tous les deux de moitié. La mesure de vitesse d'un site de 212 pages dure environ 24 minutes seule, 48 minutes avec un autre audit en parallèle. L'audit complet, exploration comprise, peut atteindre 35 minutes.

**Où la clé est-elle stockée ?** Dans la base de données de cet ordinateur, chiffrée. Elle n'est pas renvoyée au navigateur. L'écran Paramètres n'affiche que l'information « enregistrée ».

**Sans clé, aucune mesure n'est-elle faite ?** Si, jusqu'à 50 pages. Souvent, une partie échoue avec l'erreur 429. Cela peut suffire pour un petit site. Pour un site de plus de 50 pages, la clé est nécessaire.

## En cas de problème

- **Le test indique « restricted » ou 403.** L'étape 2 a été oubliée. L'API PageSpeed Insights n'est pas activée, ou la clé est restreinte à une autre API.
- **Le test indique « invalid_key ».** La clé a été mal copiée. Copiez-la de nouveau depuis Cloud Console. L'application ne vérifie pas la forme de la clé, elle dit seulement si Google l'accepte.
- **Le test indique « quota_exhausted ».** Le quota du jour est épuisé. Réessayez demain ou regardez le quota dans Cloud Console.
- **La colonne de vitesse est vide dans l'audit.** L'option « Mesurer aussi la vitesse des pages » était désactivée au lancement de l'audit. Activez-la pour le prochain audit. Un ancien audit n'est pas mesuré après coup.
- **La carte de quota indique « Anahtar yok » (Pas de clé) alors que j'ai saisi une clé.** Actualisez la page. La carte regarde les audits des dernières 24 heures. La nouvelle clé entre en jeu à l'audit suivant.

<!-- Kaynaklar: docs/PAGESPEED_API_KEY.md; src/client/features/settings/PageSpeedKeySection.tsx; PageSpeedKeyTest.tsx; src/server/features/lighthouse/pagespeed-config.ts; PageSpeedKeyTestService.ts; src/shared/audit-limits.ts; src/server/features/quotas/QuotaService.ts -->
