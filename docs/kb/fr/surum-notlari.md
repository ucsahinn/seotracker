---
title: Notes de version
description: Les nouveautés de seowatcher 2.4.2 : installation en un seul fichier sous Windows, mise à jour automatique, écrans plus simples et site en six langues.
updated: 2026-10-23
---

La dernière version est la **2.4.2**, du 23 octobre 2026. Vos données sont conservées lors de la mise à jour ; le paquet Windows installe lui-même les nouvelles versions.

## L'essentiel

- **S'ouvre sur tous les ordinateurs.** Le composant Windows manquant est fourni avec le programme d'installation : l'application démarre du premier coup, même sur une machine neuve.
- **Se met à jour seule.** Elle télécharge la nouvelle version, la vérifie et l'installe en silence. **Güncelle** (Mettre à jour) reste à un clic dans le menu de la barre des tâches.
- **Des écrans plus simples.** Chaque écran vide indique une seule étape suivante ; menus et textes sont plus clairs.
- **Un nouveau visage.** Fond noir, accent orange et logo en forme d'œil ; l'application et le site ont désormais la même apparence.

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
