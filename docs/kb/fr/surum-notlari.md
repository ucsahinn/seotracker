---
title: Notes de version
description: seowatcher 0.5.0 Alpha — Interface turque et anglaise, notifications, sons et progression plus claire.
updated: 2026-10-24
---

La dernière version est la **0.5.0 Alpha**, du 23 octobre 2026. Vos données sont conservées lors de la mise à jour.

Pour passer de 2.x à 0.x.x Alpha, lancez le nouvel installateur manuellement ; l’ancien outil ne reconnaît pas le numéro inférieur comme plus récent.

## 0.5.0 Alpha

- Utilisez l’interface en turc ou en anglais. Les nombres et les dates suivent la langue choisie.
- Le centre de notifications regroupe audits, mises à jour, connexions Google et rapports. Les sons et notifications de bureau se règlent séparément.
- Les notes de version ont leur propre entrée au-dessus des notifications dans le menu latéral. Les étiquettes colorées indiquent les nouveautés et corrections.
- Dans Ayarlar → Windows, activez ou désactivez le démarrage avec Windows et l’installation automatique des mises à jour.
- Les audits affichent le temps écoulé et un résumé final. Chaque titre de page donne accès au guide correspondant.
- La liste des pays du formulaire mobile et les explications dans les petites fenêtres ne sont plus coupées. Échap ferme d’abord la liste des pays et laisse le formulaire ouvert.
- Les vérifications simultanées d’indexation respectent mieux la limite quotidienne. Les résultats réussis sont conservés même si une autre vérification échoue.

## 0.4.3 Alpha — 2026-10-22

## L'essentiel

- **S'ouvre sur tous les ordinateurs.** Le composant Windows manquant est fourni avec le programme d'installation : l'application démarre du premier coup, même sur une machine neuve.
- **Se met à jour seule.** Elle télécharge la nouvelle version, la vérifie et l'installe en silence. **Güncelle** (Mettre à jour) reste à un clic dans le menu de la barre des tâches.
- **Des écrans plus simples.** Chaque écran vide indique une seule étape suivante ; menus et textes sont plus clairs.
- **Un nouveau visage.** Fond noir, accent orange et logo en forme d'œil ; l'application et le site ont désormais la même apparence.
- Dans l'installation de l'assistant, « Sıfırdan kurulum » (Installation complète) passe en premier pour une première installation.
- L'élément Güncelle affiche la vérification, le pourcentage de téléchargement et l'installation.

## Windows

- **Démarrage sur un ordinateur neuf.** Le programme d'installation contient le runtime Microsoft Visual C++ et l'installe une fois, avec votre accord, s'il manque.
- **Mettre à jour.** Toujours présent dans le menu de la barre des tâches. Installe la nouvelle version s'il y en a une, sinon affiche « Güncel » (À jour).
- **Réparer l'installation.** Supprime les fichiers temporaires, vérifie le paquet et rouvre l'application.
- **Signaler un problème.** Ouvre un ticket prêt à envoyer. Noms d'utilisateur, noms de sites et adresses e-mail sont masqués.
- **Programme d'installation numéroté.** Le nom du fichier et l'assistant d'installation affichent la version installée.

## L'application

- **Menu latéral.** Les groupes s'appellent « Arama ve site » (Recherche et site) et « Ajan » (Assistant) ; Aide et Paramètres sont en bas.
- **Configuration de l'assistant.** Une seule carte et un seul bouton de copie pour Claude Code, Codex ou tout autre assistant.
- **Paramètres.** La connexion Google est expliquée en trois étapes ; le thème est sombre par défaut.
- **Aide adaptée à chaque installation.** L'aide et les instructions de l'assistant décrivent la barre des tâches sous Windows et les commandes `docker compose` sous Docker.

## Site et guide

- **Six langues.** Turc, anglais, allemand, français, italien et portugais, avec un menu à drapeaux.
- **Une écriture claire.** Des phrases courtes, et chaque terme technique est expliqué à sa première apparition.

## Corrections

- Le lien de téléchargement du site pointait vers la mauvaise étiquette de version.
- Sous Git Bash, la commande d'installation de Codex ne supprimait pas le saut de ligne à la fin du mot de passe.
- Sur une carte de l'audit du site, les chiffres débordaient du cadre.
- Avec un compte de service seul, le tableau de bord indiquait à tort qu'il manquait la clé d'accès Google.
- Sur téléphone, l'audit du site et les Opportunités débordaient sur le côté.

L'historique complet se trouve dans [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) sur GitHub.
