---
title: Infos du projet
description: Écrivez ici ce que l'application ne peut pas deviner : activité, objectif, concurrents, pages importantes. Votre assistant le lit avant de commencer.
screen: Proje bilgisi
route: /p/<proje>/context
updated: 2026-10-22
---

Vous présentez votre site une fois à votre assistant, et vous n'avez plus à le refaire.

Vous écrivez dans l'écran **Contexte du projet** ce que Google ne sait pas. Vous y dites ce que vous vendez, ce que vous visez maintenant, qui sont vos concurrents, quelles pages rapportent de l'argent et comment vous voulez qu'on écrive. Vous pouvez remplir l'écran, et votre assistant IA aussi (l'écran indique alors « l'agent », agent). L'assistant lit cet écran avant de commencer le travail et y écrit ce qu'il apprend. Si vous voyez une erreur, corrigez-la vous-même. Cet écran vous est utile même sans assistant. Si, dans six mois, vous vous demandez « pourquoi nous étions-nous concentrés sur cette page ? », la réponse sera ici.

## Ce que l'écran affiche

**Quatre sections principales.** Ce sont **Présentation de l'activité**, **Objectif actuel**, **Positionnement** (comment vous vous présentez sur le marché) et **Préférences de rédaction**. Vous écrivez librement dans chacune, et chacune accepte 4 000 caractères au plus. En dessous, on voit qui l'a mise à jour et quand.

**Sections personnalisées.** Si un sujet ne tient pas dans les quatre sections, vous ouvrez votre propre titre. Vous pouvez ouvrir 20 sections personnalisées au plus, et le titre fait 120 caractères au plus.

**Concurrents.** Écrire le nom de domaine est obligatoire. Écrire un nom et une note est facultatif. Vous pouvez ajouter 100 concurrents au plus, et la note fait 500 caractères au plus. L'application ne récupère pas les données du concurrent. La liste existe pour que vous et votre assistant vous en souveniez.

**Pages importantes.** Pour chaque page, vous écrivez l'adresse, le rôle, le sujet et une note. Les rôles sont :

- **Page pilier** : la page d'entrée d'un sujet.
- **Page de soutien** : la sous-page qui alimente la page pilier.
- **Page de conversion** : la page qui rapporte de l'argent ou qui contient un formulaire.
- **Autre**.

Vous pouvez ajouter 100 pages au plus. Les adresses sont corrigées pour commencer par https.

**Journal de recherche.** L'assistant y laisse des notes datées du genre « j'ai cherché ceci, voici le résultat ». Ces notes ne sont écrites que par l'assistant, et chaque note fait 1 000 caractères au plus. Vous pouvez les supprimer si vous le souhaitez. Les notes sont supprimées automatiquement au bout de 90 jours. L'écran affiche les 20 notes les plus récentes.

**Carte Ajan** (Assistant). La carte propose deux textes prêts : « Laissez votre agent le remplir » et « Faire relire par votre agent ». Vous cliquez sur **Copier l'invite** et collez le texte dans votre assistant. Si le projet est vide, le premier texte demande à l'assistant de vous poser quelques questions, puis de remplir les sections.

## Comment l'utiliser

1. Dès que vous ouvrez le projet, écrivez trois ou quatre phrases dans **Présentation de l'activité**. Dites ce que vous vendez, à qui, en quelles langues est votre site, et quelle est votre page de conversion. L'assistant prépare chaque rapport en fonction de ce paragraphe.
2. Écrivez **Objectif actuel** de façon concrète. N'écrivez pas « trafic ». Écrivez « que les pages de produits entrent dans l'index (la liste des pages de Google) » ou « cinq demandes par mois via le formulaire de démo ». L'assistant classe ses recommandations en fonction de cet objectif.
3. Dans **Pages clés**, ajoutez d'abord les pages de conversion, puis les pages piliers. L'assistant en déduit ce qu'il doit traiter en priorité.
4. Dans **Préférences de rédaction**, écrivez les mots que vous ne voulez pas voir employés et le ton. Par exemple « ne pas dire leader du secteur », « vouvoiement », « donner le numéro de version ». Les rapports de l'assistant respectent ces règles.
5. Si vous utilisez un assistant, copiez dès le premier jour le texte **Laissez votre agent le remplir** et collez-le. L'assistant remplit les sections en discutant avec vous. Une fois par mois, lisez le journal de recherche et corrigez ce qui vous paraît faux.

## Comment les chiffres sont calculés

Aucun chiffre n'est calculé dans cet écran, il n'y a que des limites. Elles sont indiquées plus haut.

L'assistant peut faire 50 modifications au plus en une fois. Chaque modification est écrite immédiatement, sans vous demander confirmation. Prenez donc l'habitude de dire à votre assistant « demande-moi avant d'écrire ». Les assistants bien configurés le font déjà.

L'adresse d'une page importante peut faire 2 048 caractères au plus. Le nom de domaine d'un concurrent fait 255 caractères au plus, le nom 120. La date des notes du journal est écrite par l'application, l'assistant ne peut pas inventer de date.

## Questions fréquentes

**L'assistant a écrit quelque chose de faux, que faire ?** Ouvrez la section et corrigez. Votre nom apparaît comme dernier auteur de la mise à jour. À la lecture suivante, l'assistant voit votre version.

**J'ai ajouté un concurrent, ses données ne sont pas arrivées.** Elles n'arriveront pas. L'application ne récupère pas de données de concurrents. La liste existe pour que l'assistant sache sur quoi se pencher quand il fait une recherche sur le web.

**Une note du journal a disparu.** Les notes de plus de 90 jours sont supprimées. Déplacez l'information durable dans les sections. Le journal est un carnet temporaire.

**Ces informations vont-elles à Google ?** Non. Ces informations restent sur cet ordinateur. Seul l'assistant que vous avez connecté les lit.

## Limites

L'écran est du texte libre. Il ne vérifie pas si ce que vous écrivez est cohérent. Si vous écrivez des choses contradictoires, l'assistant peut ne pas s'en apercevoir. Les concurrents et les pages importantes forment une liste de rappel, pas un outil de suivi. Seul l'assistant écrit dans le journal de recherche. Écrivez vos propres notes dans les sections.

<!-- Kaynaklar: src/routes/_project/p/$projectId/context.tsx; src/routes/_project/p/$projectId/settings/context.tsx; src/client/features/projects/context/sectionCopy.ts; src/server/features/project-context/*; src/types/schemas/projectContext.ts; src/server/mcp/server.ts (update_project_context) -->
