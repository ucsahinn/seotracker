---
title: Installation de l'assistant
description: Connectez Claude Code, Codex ou Cursor à l'application : adresse, mot de passe, 35 outils, 6 modèles de tâches et ceux qui consomment le quota Google.
kind: nasil-yapilir
updated: 2026-10-27
---

À la fin, votre assistant IA sera connecté à l'application et aura exécuté sa première commande. Une fois connecté, vous pouvez dire « audite le site et écris un rapport ». L'assistant lit les données de Search Console, lance l'audit et enregistre le rapport dans l'écran **Rapports**. Cette connexion repose sur MCP : l'assistant s'en sert pour appeler les outils de l'application (par exemple list_projects). Elle est facultative : sans elle, l'application reste entièrement utilisable.

## Ce qu'il vous faut

- L'application en marche et un projet relié à Search Console.
- L'un de ces assistants : Claude Code, Codex, Cursor, VS Code Copilot ou Gemini CLI. L'application fournit un texte d'installation prêt pour les trois premiers.
- L'écran **Configuration de l'agent** de l'application. Il se trouve dans le groupe **Agent** du menu de gauche.

## Étapes

1. Ouvrez l'écran **Configuration de l'agent**. Le badge du haut indique **Pas encore connecté** ou **Connecté**. S'il est connecté, un texte comme « Claude Code · dernier appel il y a 2 min » apparaît à côté. En dessous, il y a l'adresse de connexion et un bouton de copie : `http://127.0.0.1:3001/mcp` (avec Docker, `localhost`).
2. Trouvez le mot de passe. L'application protège la connexion contre les appels non autorisés avec un mot de passe, et elle ne l'affiche pas à l'écran. Avec le paquet Windows, le mot de passe est dans le fichier `mcp-token` du dossier de données. Dans le menu de la barre des tâches, cliquez sur **Veri klasörünü aç** (Ouvrir le dossier de données). Avec Docker, tapez cette commande : `docker compose exec -T seotracker cat /app/.wrangler/mcp-token` (dans Git Bash, ajoutez `MSYS_NO_PATHCONV=1` au début).
3. Suivez la section qui correspond à votre assistant.

### Claude Code

Dans le terminal (la fenêtre de commandes), tapez ceci. Remplacez `<parola>` par votre propre mot de passe :

```sh
claude mcp add --transport http --scope user seotracker http://127.0.0.1:3001/mcp --header "Authorization: Bearer <parola>"
```

Tapez ensuite `/mcp` dans Claude Code et choisissez **Reconnect**. Les modèles de tâches prêts à l'emploi s'appellent avec une barre oblique, comme `/seo-audit`.

### Codex

Tapez cette commande :

```sh
codex mcp add seotracker --url http://127.0.0.1:3001/mcp --bearer-token-env-var SEOTRACKER_MCP_AUTH
```

Écrivez ensuite le mot de passe dans une variable d'environnement (un réglage que l'ordinateur retient) nommée `SEOTRACKER_MCP_AUTH`. Sous Windows, avec PowerShell : `[Environment]::SetEnvironmentVariable('SEOTRACKER_MCP_AUTH', '<parola>', 'User')`. Les modèles s'appellent comme `$seo-audit`.

### Cursor

Écrivez ceci dans le fichier `.cursor/mcp.json` de votre projet :

```json
{
  "mcpServers": {
    "seotracker": {
      "url": "http://127.0.0.1:3001/mcp",
      "headers": { "Authorization": "Bearer ${env:SEOTRACKER_MCP_AUTH}" }
    }
  }
}
```

Définissez la variable d'environnement comme pour Codex. Ce réglage n'a pas encore été essayé sur une installation de Cursor. Si votre version de Cursor demande un autre champ, consultez la documentation de Cursor.

### Texte d'installation prêt à l'emploi

C'est la voie la plus simple. Obtenez le texte ainsi :

1. À l'écran, choisissez l'agent que vous utilisez, puis cliquez sur **Copier la commande de configuration**. Si Codex est sélectionné, le bouton copie le texte prévu pour Codex.
2. Collez le texte dans votre assistant. L'assistant établit la connexion, l'essaie avec « whoami » et « list_projects », vérifie avec « whoami » à quelle installation elle parle, puis charge les modèles.

Le bouton **Copier la commande de nouvelle installation** de la carte **Nouvelle installation** confie tout à l'assistant, du fonctionnement de l'application jusqu'à la connexion Google. Ce texte reconnaît le package Windows comme l'installation Docker.

### Charger les modèles de tâches prêts à l'emploi

L'onglet **Compétences** liste les six modèles de tâches prêts à l'emploi. Dites à l'assistant « installe les compétences seotracker ». Le texte d'installation sait où les copier. Pour mettre à jour, cliquez sur le bouton **Copier la commande de mise à jour**.

## Outils

Il y a 35 outils au total. La colonne « Écrit » marque ceux qui modifient des données de l'application, la colonne « Quota » ceux qui consomment le quota quotidien de Google. Les outils qui écrivent ne doivent pas être appelés sans votre accord. Les modèles bien construits demandent votre accord ; l'application, elle, ne le demande pas.

| Outil                                        | Ce qu'il fait                                                                                                                                                                                                                                                                                                          | Écrit | Quota                                          |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ---------------------------------------------- |
| `whoami`                                     | Indique le compte et l'installation avec laquelle vous parlez : version, type d'installation (Windows, Docker ou développement), numéro de port et, si connue, dernière version.                                                                                                                                       |       |                                                |
| `get_diagnostics`                            | Donne la version, quelle installation c'est, les contrôles d'installation, le nombre de lignes des tables, les 25 derniers audits et les compteurs de quota.                                                                                                                                                           |       |                                                |
| `list_projects`                              | Liste vos projets. Chaque outil demande un numéro de projet.                                                                                                                                                                                                                                                           |       |                                                |
| `create_project`                             | Crée un nouveau projet.                                                                                                                                                                                                                                                                                                | Oui   |                                                |
| `get_project_context`                        | Lit l'écran Infos du projet.                                                                                                                                                                                                                                                                                           |       |                                                |
| `update_project_context`                     | Modifie les infos du projet et laisse une note dans le journal de recherche.                                                                                                                                                                                                                                           | Oui   |                                                |
| `get_search_summary`                         | Donne l'écran Performances de recherche en un seul appel : la fenêtre des jours complets, les totaux du site propres à Search Console avec l'évolution par rapport à la période précédente et à l'an dernier, la part des clics venant de requêtes masquées et une liste de tâches classée par clics estimés. Gratuit. |       |                                                |
| `get_search_console_performance`             | Donne clics, impressions, taux et position par requête, page, pays, appareil ou date.                                                                                                                                                                                                                                  |       |                                                |
| `get_search_opportunities`                   | Établit la liste des opportunités à partir de Search Console et d'Analytics.                                                                                                                                                                                                                                           |       |                                                |
| `get_cannibalization`                        | Montre les pages qui se concurrencent sur la même recherche.                                                                                                                                                                                                                                                           |       |                                                |
| `get_ranking_history`                        | Donne les archives de classement de votre ordinateur ; elles gardent aussi les données plus anciennes que la limite de 16 mois de Google.                                                                                                                                                                              |       |                                                |
| `get_index_coverage`                         | Donne les réponses d'index Google déjà enregistrées, sans interroger Google.                                                                                                                                                                                                                                           |       |                                                |
| `inspect_urls`                               | Demande à Google l'état des pages, 10 adresses par appel.                                                                                                                                                                                                                                                              | Oui   | 2 000 par jour, par propriété                  |
| `get_sitemaps`                               | Affiche l'état des plans du site dans Search Console.                                                                                                                                                                                                                                                                  |       |                                                |
| `run_site_audit`                             | Lance l'audit du site.                                                                                                                                                                                                                                                                                                 | Oui   | PageSpeed, si la mesure de vitesse est activée |
| `get_audit_status`                           | Dit à quelle étape en est l'audit, peut marquer comme échoué un audit bloqué.                                                                                                                                                                                                                                          |       |                                                |
| `get_audit_summary`                          | Point de départ : score du site, scores par catégorie, liste de tâches classée et données instantanées du site.                                                                                                                                                                                                        |       |                                                |
| `get_audit_issues`                           | Donne les problèmes trouvés avec les étapes de correction.                                                                                                                                                                                                                                                             |       |                                                |
| `get_audit_pages`                            | Liste les pages explorées.                                                                                                                                                                                                                                                                                             |       |                                                |
| `get_google_analytics_organic_overview`      | Donne le résumé des visites venues de la recherche et la période précédente.                                                                                                                                                                                                                                           |       |                                                |
| `get_google_analytics_organic_landing_pages` | Liste les pages où arrivent d'abord les visiteurs venus de la recherche.                                                                                                                                                                                                                                               |       |                                                |
| `get_google_analytics_page_performance`      | Donne les vues et l'engagement des pages.                                                                                                                                                                                                                                                                              |       |                                                |
| `get_google_analytics_traffic_acquisition`   | Donne la répartition des visiteurs par canal, source et campagne.                                                                                                                                                                                                                                                      |       |                                                |
| `get_google_analytics_key_events`            | Donne les événements marqués comme clés dans Analytics.                                                                                                                                                                                                                                                                |       |                                                |
| `get_google_analytics_ecommerce_performance` | Donne les ventes de produits.                                                                                                                                                                                                                                                                                          |       |                                                |
| `get_google_analytics_site_search`           | Donne les termes que les visiteurs tapent dans la zone de recherche de votre site.                                                                                                                                                                                                                                     |       |                                                |
| `get_google_analytics_audience_breakdown`    | Répartit les visiteurs par appareil, pays, nouveaux et récurrents.                                                                                                                                                                                                                                                     |       |                                                |
| `get_google_analytics_measurement_health`    | Contrôle la configuration de la mesure, ne consomme pas le quota de rapports.                                                                                                                                                                                                                                          |       |                                                |
| `list_saved_keywords`                        | Liste les mots que vous avez enregistrés.                                                                                                                                                                                                                                                                              |       |                                                |
| `save_keywords`                              | Enregistre des mots.                                                                                                                                                                                                                                                                                                   | Oui   |                                                |
| `list_reports`                               | Liste vos rapports.                                                                                                                                                                                                                                                                                                    |       |                                                |
| `get_report`                                 | Lit un rapport, et donne aussi sa version HTML si on le demande.                                                                                                                                                                                                                                                       |       |                                                |
| `save_report`                                | Enregistre un rapport ou met à jour un rapport existant.                                                                                                                                                                                                                                                               | Oui   |                                                |
| `list_report_templates`                      | Lit les modèles de rapport.                                                                                                                                                                                                                                                                                            |       |                                                |
| `save_report_template`                       | Enregistre un modèle de rapport.                                                                                                                                                                                                                                                                                       | Oui   |                                                |

Les outils Analytics puisent dans le quota de rapports Analytics de Google (200 000 unités par jour sur une propriété standard). Vous suivez ce quota dans l'application, dans la section Limites de l'écran **Paramètres**.

## Modèles de tâches prêts à l'emploi (compétences)

| Modèle              | Quand l'utiliser                                                                                                                                           | Ce qu'il produit                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `seo-coach`         | Quand vous demandez « que dois-je faire ». Il explique le chemin et propose la prochaine étape.                                                            | Une conversation, au besoin une note de coaching         |
| `seo-project-setup` | Sur un nouveau projet. Il vous interroge sur votre activité, votre objectif, vos concurrents et vos pages importantes, et remplit l'écran Infos du projet. | Infos du projet remplies, mots-clés enregistrés          |
| `seo-audit`         | Quand vous dites « audite le site ». Il lance l'audit, le combine avec Search Console et choisit « la seule chose à faire cette semaine ».                 | Un rapport d'audit d'une page                            |
| `seo-triage`        | Quand les visites baissent. Il regarde si la baisse est réelle, où et quand elle a lieu.                                                                   | Un rapport d'analyse de la baisse                        |
| `seo-check-in`      | Une fois par mois. Il compare cette période à la précédente.                                                                                               | Un rapport de bilan mensuel ; on en accumule un par mois |
| `seo-report`        | Quand les autres modèles ont terminé. Il écrit et enregistre un rapport HTML en un seul fichier.                                                           | Un rapport dans l'écran **Rapports**                     |

## Vérification

- Dites à l'assistant « appelle l'outil whoami ». Il doit donner le compte, la version, le type d'installation et le numéro de port. Si l'un d'eux n'est pas ce que vous attendez, ou si la version est plus ancienne que la dernière, l'assistant doit vous prévenir avant d'utiliser des données. Une ancienne copie Docker peut répondre à la même adresse, et l'assistant lirait ses vieilles données en toute confiance. Si un autre programme occupe 3001, le paquet Windows passe sur un autre numéro ; whoami l'indique aussi.
- Le badge de l'écran **Configuration de l'agent** doit indiquer **Connecté** et l'heure du dernier appel doit apparaître.
- « list_projects » doit lister vos projets.

## Questions fréquentes

**L'assistant envoie-t-il mes données à l'extérieur ?** Les données vont là où va le modèle que l'assistant utilise. Cela dépend des conditions de confidentialité de l'assistant lui-même. L'application ne répond qu'à la connexion présente sur votre ordinateur.

**Cela fonctionne-t-il sans mot de passe ?** Avec Docker, oui, avec `MCP_TOKEN=off`. Avec le paquet Windows, le mot de passe est toujours actif. Avec une connexion sans mot de passe, n'importe quel programme du même ordinateur peut appeler les 35 outils.

**Me suis-je connecté à une ancienne copie ?** `whoami` et `get_diagnostics` disent avec quelle installation on parle : version, type d'installation, numéro de port et, sous Windows, la raison si le port a changé. Si la version est plus ancienne que la dernière ou si le port a changé, l'assistant doit vous le dire. Arrêtez l'ancienne copie Docker et redémarrez l'application.

**L'assistant peut-il épuiser mon quota Google ?** `inspect_urls` et `run_site_audit` en consomment. Les modèles interrogent au plus 20 adresses par tâche. Ils ne lancent l'audit que si vous le demandez. Imposez la même limite à votre assistant.

**Quel assistant est le meilleur ?** Peu importe, les outils sont les mêmes. Le texte d'installation est prêt pour Claude Code, Codex et Cursor. Les autres assistants fonctionnent avec la même adresse et le même mot de passe s'ils prennent en charge MCP.

## En cas de problème

- **L'assistant reçoit une erreur 401.** Le mot de passe est faux ou n'est pas envoyé. Copiez de nouveau la valeur du fichier. Il ne doit pas rester de caractère de fin de ligne à la fin.
- **La connexion est refusée.** L'application est fermée. Regardez l'icône de la barre des tâches ou la sortie de `docker compose ps`.
- **L'assistant dit « outil introuvable ».** Rechargez la connexion. Dans Claude Code, tapez `/mcp` et choisissez **Reconnect**.
- **Les modèles n'apparaissent pas.** Collez de nouveau le texte d'installation. Les modèles sont copiés dans le dossier propre à l'assistant (`$HOME/.agents/skills` pour Codex).

<!-- Kaynaklar: src/routes/_app/ai.tsx; src/client/features/ai-mcp/agentInstallPrompt.md; agentSetupPrompt.ts; src/server/mcp/server.ts (35 araç); src/server/mcp/token-auth.ts; transport.ts; .agents/skills/setup-seotracker/SKILL.md; .agents/skills/*/SKILL.md; packaging/windows/launcher/SeoWatcher.cs; docker-entrypoint.sh -->
