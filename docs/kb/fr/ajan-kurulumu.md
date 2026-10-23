---
title: Installation de l'assistant
description: Connectez Claude Code, Codex ou Cursor à l'application : adresse, mot de passe, 33 outils, 6 modèles de tâches et ceux qui consomment le quota Google.
kind: nasil-yapilir
updated: 2026-10-22
---

À la fin, votre assistant IA sera connecté à l'application et aura exécuté sa première commande. Une fois connecté, vous pouvez dire « audite le site et écris un rapport ». L'assistant lit les données de Search Console, lance l'audit et enregistre le rapport dans l'écran **Raporlar** (Rapports). Cette connexion repose sur MCP : l'assistant s'en sert pour appeler les outils de l'application (par exemple list_projects). Elle est facultative : sans elle, l'application reste entièrement utilisable.

## Ce qu'il vous faut

- L'application en marche et un projet relié à Search Console.
- L'un de ces assistants : Claude Code, Codex, Cursor, VS Code Copilot ou Gemini CLI. L'application fournit un texte d'installation prêt pour les trois premiers.
- L'écran **Ajan kurulumu** (Installation de l'assistant) de l'application. Il se trouve dans le groupe **Ajan** (Assistant) du menu de gauche.

## Étapes

1. Ouvrez l'écran **Ajan kurulumu**. Le badge du haut indique **Henüz bağlanmadı** (Pas encore connecté) ou **Bağlandı** (Connecté). S'il est connecté, un texte comme « Claude Code, son çağrı 2 dk önce » (Claude Code, dernier appel il y a 2 min) apparaît à côté. En dessous, il y a l'adresse de connexion et un bouton de copie : `http://127.0.0.1:3001/mcp` (avec Docker, `localhost`).
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

1. Cliquez sur le bouton **Ajan kurulum istemini kopyala** (Copier la consigne d'installation de l'assistant) à l'écran. Il existe un bouton séparé pour Codex.
2. Collez le texte dans votre assistant. L'assistant établit la connexion, l'essaie avec « whoami » et « list_projects », puis charge les modèles.

La **consigne d'installation** (version « depuis zéro ») confie tout à l'assistant, du fonctionnement de l'application jusqu'à la connexion Google. Elle reconnaît le paquet Windows comme l'installation Docker.

### Charger les modèles de tâches prêts à l'emploi

L'onglet **Beceriler** (Compétences) liste les six modèles de tâches prêts à l'emploi. Dites à l'assistant « installe les compétences seotracker ». Le texte d'installation sait où les copier. Pour mettre à jour, cliquez sur le bouton **Güncelleme istemini kopyala** (Copier la consigne de mise à jour).

## Outils

Il y a 33 outils au total. La colonne « Écrit » marque ceux qui modifient des données de l'application, la colonne « Quota » ceux qui consomment le quota quotidien de Google. Les outils qui écrivent ne doivent pas être appelés sans votre accord. Les modèles bien construits demandent votre accord ; l'application, elle, ne le demande pas.

| Outil                                        | Ce qu'il fait                                                                                                                             | Écrit | Quota                                          |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----- | ---------------------------------------------- |
| `whoami`                                     | Indique quelle installation et quel utilisateur vous utilisez.                                                                            |       |                                                |
| `get_diagnostics`                            | Donne la version, les contrôles d'installation, le nombre de lignes des tables, les 25 derniers audits et les compteurs de quota.         |       |                                                |
| `list_projects`                              | Liste vos projets. Chaque outil demande un numéro de projet.                                                                              |       |                                                |
| `create_project`                             | Crée un nouveau projet.                                                                                                                   | Oui   |                                                |
| `get_project_context`                        | Lit l'écran Infos du projet.                                                                                                              |       |                                                |
| `update_project_context`                     | Modifie les infos du projet et laisse une note dans le journal de recherche.                                                              | Oui   |                                                |
| `get_search_console_performance`             | Donne clics, impressions, taux et position par requête, page, pays, appareil ou date.                                                     |       |                                                |
| `get_search_opportunities`                   | Établit la liste des opportunités à partir de Search Console et d'Analytics.                                                              |       |                                                |
| `get_cannibalization`                        | Montre les pages qui se concurrencent sur la même recherche.                                                                              |       |                                                |
| `get_ranking_history`                        | Donne les archives de classement de votre ordinateur ; elles gardent aussi les données plus anciennes que la limite de 16 mois de Google. |       |                                                |
| `get_index_coverage`                         | Donne les réponses d'index Google déjà enregistrées, sans interroger Google.                                                              |       |                                                |
| `inspect_urls`                               | Demande à Google l'état des pages, 10 adresses par appel.                                                                                 | Oui   | 2 000 par jour, par propriété                  |
| `get_sitemaps`                               | Affiche l'état des plans du site dans Search Console.                                                                                     |       |                                                |
| `run_site_audit`                             | Lance l'audit du site.                                                                                                                    | Oui   | PageSpeed, si la mesure de vitesse est activée |
| `get_audit_status`                           | Dit à quelle étape en est l'audit, peut marquer comme échoué un audit bloqué.                                                             |       |                                                |
| `get_audit_issues`                           | Donne les problèmes trouvés avec les étapes de correction.                                                                                |       |                                                |
| `get_audit_pages`                            | Liste les pages explorées.                                                                                                                |       |                                                |
| `get_google_analytics_organic_overview`      | Donne le résumé des visites venues de la recherche et la période précédente.                                                              |       |                                                |
| `get_google_analytics_organic_landing_pages` | Liste les pages où arrivent d'abord les visiteurs venus de la recherche.                                                                  |       |                                                |
| `get_google_analytics_page_performance`      | Donne les vues et l'engagement des pages.                                                                                                 |       |                                                |
| `get_google_analytics_traffic_acquisition`   | Donne la répartition des visiteurs par canal, source et campagne.                                                                         |       |                                                |
| `get_google_analytics_key_events`            | Donne les événements marqués comme clés dans Analytics.                                                                                   |       |                                                |
| `get_google_analytics_ecommerce_performance` | Donne les ventes de produits.                                                                                                             |       |                                                |
| `get_google_analytics_site_search`           | Donne les termes que les visiteurs tapent dans la zone de recherche de votre site.                                                        |       |                                                |
| `get_google_analytics_audience_breakdown`    | Répartit les visiteurs par appareil, pays, nouveaux et récurrents.                                                                        |       |                                                |
| `get_google_analytics_measurement_health`    | Contrôle la configuration de la mesure, ne consomme pas le quota de rapports.                                                             |       |                                                |
| `list_saved_keywords`                        | Liste les mots que vous avez enregistrés.                                                                                                 |       |                                                |
| `save_keywords`                              | Enregistre des mots.                                                                                                                      | Oui   |                                                |
| `list_reports`                               | Liste vos rapports.                                                                                                                       |       |                                                |
| `get_report`                                 | Lit un rapport, et donne aussi sa version HTML si on le demande.                                                                          |       |                                                |
| `save_report`                                | Enregistre un rapport ou met à jour un rapport existant.                                                                                  | Oui   |                                                |
| `list_report_templates`                      | Lit les modèles de rapport.                                                                                                               |       |                                                |
| `save_report_template`                       | Enregistre un modèle de rapport.                                                                                                          | Oui   |                                                |

Les outils Analytics puisent dans le quota de rapports Analytics de Google (200 000 unités par jour sur une propriété standard). Vous suivez ce quota dans l'application, dans la section Limites de l'écran **Ayarlar** (Paramètres).

## Modèles de tâches prêts à l'emploi (compétences)

| Modèle              | Quand l'utiliser                                                                                                                                           | Ce qu'il produit                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `seo-coach`         | Quand vous demandez « que dois-je faire ». Il explique le chemin et propose la prochaine étape.                                                            | Une conversation, au besoin une note de coaching         |
| `seo-project-setup` | Sur un nouveau projet. Il vous interroge sur votre activité, votre objectif, vos concurrents et vos pages importantes, et remplit l'écran Infos du projet. | Infos du projet remplies, mots-clés enregistrés          |
| `seo-audit`         | Quand vous dites « audite le site ». Il lance l'audit, le combine avec Search Console et choisit « la seule chose à faire cette semaine ».                 | Un rapport d'audit d'une page                            |
| `seo-triage`        | Quand les visites baissent. Il regarde si la baisse est réelle, où et quand elle a lieu.                                                                   | Un rapport d'analyse de la baisse                        |
| `seo-check-in`      | Une fois par mois. Il compare cette période à la précédente.                                                                                               | Un rapport de bilan mensuel ; on en accumule un par mois |
| `seo-report`        | Quand les autres modèles ont terminé. Il écrit et enregistre un rapport HTML en un seul fichier.                                                           | Un rapport dans l'écran **Raporlar**                     |

## Vérification

- Dites à l'assistant « appelle l'outil whoami ». Il doit donner l'identité de l'installation.
- Le badge de l'écran **Ajan kurulumu** doit indiquer **Bağlandı** et l'heure du dernier appel doit apparaître.
- « list_projects » doit lister vos projets.

## Questions fréquentes

**L'assistant envoie-t-il mes données à l'extérieur ?** Les données vont là où va le modèle que l'assistant utilise. Cela dépend des conditions de confidentialité de l'assistant lui-même. L'application ne répond qu'à la connexion présente sur votre ordinateur.

**Cela fonctionne-t-il sans mot de passe ?** Avec Docker, oui, avec `MCP_TOKEN=off`. Avec le paquet Windows, le mot de passe est toujours actif. Avec une connexion sans mot de passe, n'importe quel programme du même ordinateur peut appeler les 33 outils.

**L'assistant peut-il épuiser mon quota Google ?** `inspect_urls` et `run_site_audit` en consomment. Les modèles interrogent au plus 20 adresses par tâche. Ils ne lancent l'audit que si vous le demandez. Imposez la même limite à votre assistant.

**Quel assistant est le meilleur ?** Peu importe, les outils sont les mêmes. Le texte d'installation est prêt pour Claude Code, Codex et Cursor. Les autres assistants fonctionnent avec la même adresse et le même mot de passe s'ils prennent en charge MCP.

## En cas de problème

- **L'assistant reçoit une erreur 401.** Le mot de passe est faux ou n'est pas envoyé. Copiez de nouveau la valeur du fichier. Il ne doit pas rester de caractère de fin de ligne à la fin.
- **La connexion est refusée.** L'application est fermée. Regardez l'icône de la barre des tâches ou la sortie de `docker compose ps`.
- **L'assistant dit « outil introuvable ».** Rechargez la connexion. Dans Claude Code, tapez `/mcp` et choisissez **Reconnect**.
- **Les modèles n'apparaissent pas.** Collez de nouveau le texte d'installation. Les modèles sont copiés dans le dossier propre à l'assistant (`$HOME/.agents/skills` pour Codex).

<!-- Kaynaklar: src/routes/_app/ai.tsx; src/client/features/ai-mcp/agentInstallPrompt.md; agentSetupPrompt.ts; src/server/mcp/server.ts (33 araç); src/server/mcp/token-auth.ts; transport.ts; .agents/skills/setup-seotracker/SKILL.md; .agents/skills/*/SKILL.md; packaging/windows/launcher/SeoWatcher.cs; docker-entrypoint.sh -->
