---
title: Configurar o agente
description: Conecte o Claude Code, o Codex ou o Cursor ao aplicativo: endereço, senha, as 35 ferramentas, os 6 modelos de tarefa e quais deles gastam a cota do Google.
kind: nasil-yapilir
updated: 2026-10-27
---

Ao fim desta página, o seu assistente de IA estará conectado ao aplicativo e terá executado o primeiro comando. Depois de conectado, você pode dizer "audite o site e escreva um relatório". O assistente lê os dados do Search Console, executa a auditoria e salva o relatório na tela **Relatórios**. Essa conexão se chama conexão do assistente (MCP). Ela permite que o assistente chame as ferramentas do aplicativo (por exemplo, list_projects). Conectar é opcional. Se você pular esta etapa, o aplicativo continua completo.

## O que você precisa

- Um aplicativo em execução e um projeto conectado ao Search Console.
- Um destes: Claude Code, Codex, Cursor, VS Code Copilot ou Gemini CLI. O aplicativo fornece textos de configuração prontos para os três primeiros.
- A tela **Configuração do agente** do aplicativo. Ela fica no menu da esquerda, no grupo **Agente**.

## Passos

1. Abra a tela **Configuração do agente**. O selo no alto diz **Ainda não conectado** ou **Conectado**. Se estiver conectado, mostra também um texto como "Claude Code, última chamada há 2 min". Abaixo você vê o endereço de conexão e um botão de copiar: `http://127.0.0.1:3001/mcp` (`localhost` no Docker).
2. Encontre a senha. O aplicativo protege a conexão contra chamadas não autorizadas com uma senha e não a mostra na tela. No pacote Windows, a senha está no arquivo `mcp-token` da pasta de dados. No menu da barra de tarefas, escolha **Veri klasörünü aç** (Abrir a pasta de dados). No Docker, execute este comando: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token` (no Git Bash, coloque `MSYS_NO_PATHCONV=1` na frente).
3. Siga a seção do seu assistente.

### Claude Code

No terminal (a janela de comandos), execute o seguinte. Troque `<parola>` pela sua própria senha:

```sh
claude mcp add --transport http --scope user seotracker http://127.0.0.1:3001/mcp --header "Authorization: Bearer <parola>"
```

Depois digite `/mcp` dentro do Claude Code e escolha **Reconnect**. Você chama os modelos de tarefa prontos com uma barra, como `/seo-audit`.

### Codex

Execute este comando:

```sh
codex mcp add seotracker --url http://127.0.0.1:3001/mcp --bearer-token-env-var SEOTRACKER_MCP_AUTH
```

Depois coloque a senha em uma variável de ambiente (uma configuração que o seu computador memoriza) chamada `SEOTRACKER_MCP_AUTH`. No Windows, com o PowerShell: `[Environment]::SetEnvironmentVariable('SEOTRACKER_MCP_AUTH', '<parola>', 'User')`. Você chama os modelos como `$seo-audit`.

### Cursor

Escreva isto no arquivo `.cursor/mcp.json` do seu projeto:

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

Defina a variável de ambiente do mesmo modo que no Codex. Esta configuração ainda não foi testada em uma instalação do Cursor. Se a sua versão do Cursor pedir um campo diferente, consulte a documentação do Cursor.

### Texto de configuração pronto

Este é o caminho mais fácil:

1. Na tela, escolha o agente que você usa e clique em **Copiar comando de configuração**. Com o Codex selecionado, o botão copia o texto feito para o Codex.
2. Cole o texto no seu assistente. O assistente configura a conexão, a testa com "whoami" e "list_projects", confere com "whoami" com qual instalação está falando e instala os modelos.

O botão **Copiar comando de nova instalação**, no cartão **Nova instalação**, faz o assistente executar toda a configuração por você, desde colocar o aplicativo para funcionar até a conexão com o Google. Ele conhece tanto o pacote Windows quanto a instalação Docker.

### Instalar os modelos de tarefa prontos

A aba **Skills** descreve os seis modelos de tarefa prontos. Diga ao assistente "instale as skills do seotracker". O texto de configuração sabe onde copiá-las. Para atualizar, clique no botão **Copiar comando de atualização**.

## Ferramentas

São 35 ferramentas no total. A coluna "Grava" mostra as ferramentas que alteram dados no aplicativo. A coluna "Cota" mostra as ferramentas que gastam a cota diária do Google. As ferramentas que gravam não devem ser chamadas sem a sua aprovação. Modelos bem construídos perguntam antes, mas o aplicativo não.

| Ferramenta                                   | O que faz                                                                                                                                                                                                                                                                                                   | Grava | Cota                                                 |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- | ---------------------------------------------------- |
| `whoami`                                     | Informa com qual conta e qual instalação você está falando: versão, tipo de instalação (Windows, Docker ou desenvolvimento), número da porta e, se conhecida, a última versão.                                                                                                                              |       |                                                      |
| `get_diagnostics`                            | Informa a versão, qual instalação é, as verificações da instalação, as contagens das tabelas, as últimas 25 auditorias e os contadores de cota.                                                                                                                                                             |       |                                                      |
| `list_projects`                              | Lista os seus projetos. Toda ferramenta pede um número de projeto.                                                                                                                                                                                                                                          |       |                                                      |
| `create_project`                             | Cria um projeto novo.                                                                                                                                                                                                                                                                                       | Sim   |                                                      |
| `get_project_context`                        | Lê a tela Contexto do projeto.                                                                                                                                                                                                                                                                              |       |                                                      |
| `update_project_context`                     | Altera as informações do projeto e acrescenta uma nota ao registro de pesquisas.                                                                                                                                                                                                                            | Sim   |                                                      |
| `get_search_summary`                         | Entrega a tela Desempenho da pesquisa em uma só chamada: a janela de dias completos, os totais do site do próprio Search Console com a variação em relação ao período anterior e ao ano passado, a parcela de cliques de consultas ocultas e uma lista de tarefas ordenada por cliques estimados. Gratuito. |       |                                                      |
| `get_search_console_performance`             | Informa cliques, impressões, taxa e posição por consulta, página, país, dispositivo ou data.                                                                                                                                                                                                                |       |                                                      |
| `get_search_opportunities`                   | Monta uma lista de oportunidades a partir do Search Console e do Analytics.                                                                                                                                                                                                                                 |       |                                                      |
| `get_cannibalization`                        | Mostra páginas que competem entre si pela mesma busca.                                                                                                                                                                                                                                                      |       |                                                      |
| `get_ranking_history`                        | Informa o arquivo de posições no seu computador. Ele também guarda dados mais antigos que o limite de 16 meses do Google.                                                                                                                                                                                   |       |                                                      |
| `get_index_coverage`                         | Informa as respostas do índice do Google salvas antes. Não pergunta ao Google.                                                                                                                                                                                                                              |       |                                                      |
| `inspect_urls`                               | Pergunta ao Google o status das páginas, 10 endereços por chamada.                                                                                                                                                                                                                                          | Sim   | 2.000 por dia, por propriedade                       |
| `get_sitemaps`                               | Mostra o estado do mapa do site no Search Console.                                                                                                                                                                                                                                                          |       |                                                      |
| `run_site_audit`                             | Inicia a auditoria do site.                                                                                                                                                                                                                                                                                 | Sim   | PageSpeed, se a medição de velocidade estiver ligada |
| `get_audit_status`                           | Diz em que etapa a auditoria está. Pode marcar como falha uma auditoria travada.                                                                                                                                                                                                                            |       |                                                      |
| `get_audit_summary`                          | Ponto de partida: pontuação do site, pontuações por categoria, lista de tarefas priorizada e dados instantâneos do site.                                                                                                                                                                                    |       |                                                      |
| `get_audit_issues`                           | Informa os problemas encontrados, com os passos para corrigi-los.                                                                                                                                                                                                                                           |       |                                                      |
| `get_audit_pages`                            | Lista as páginas que foram rastreadas.                                                                                                                                                                                                                                                                      |       |                                                      |
| `get_google_analytics_organic_overview`      | Informa um resumo das visitas vindas da busca e do período anterior.                                                                                                                                                                                                                                        |       |                                                      |
| `get_google_analytics_organic_landing_pages` | Lista as primeiras páginas em que caem os visitantes vindos da busca.                                                                                                                                                                                                                                       |       |                                                      |
| `get_google_analytics_page_performance`      | Informa as visualizações e o engajamento das páginas.                                                                                                                                                                                                                                                       |       |                                                      |
| `get_google_analytics_traffic_acquisition`   | Informa a divisão dos visitantes por canal, origem e campanha.                                                                                                                                                                                                                                              |       |                                                      |
| `get_google_analytics_key_events`            | Informa os eventos marcados como chave no Analytics.                                                                                                                                                                                                                                                        |       |                                                      |
| `get_google_analytics_ecommerce_performance` | Informa as vendas de produtos.                                                                                                                                                                                                                                                                              |       |                                                      |
| `get_google_analytics_site_search`           | Informa os termos que os visitantes digitaram na caixa de busca do seu site.                                                                                                                                                                                                                                |       |                                                      |
| `get_google_analytics_audience_breakdown`    | Divide os visitantes por dispositivo, país e novos ou recorrentes.                                                                                                                                                                                                                                          |       |                                                      |
| `get_google_analytics_measurement_health`    | Confere a configuração da medição. Não usa a cota de relatórios.                                                                                                                                                                                                                                            |       |                                                      |
| `list_saved_keywords`                        | Lista as palavras-chave que você salvou.                                                                                                                                                                                                                                                                    |       |                                                      |
| `save_keywords`                              | Salva palavras-chave.                                                                                                                                                                                                                                                                                       | Sim   |                                                      |
| `list_reports`                               | Lista os seus relatórios.                                                                                                                                                                                                                                                                                   |       |                                                      |
| `get_report`                                 | Lê um relatório. Também pode dar a versão HTML, se você pedir.                                                                                                                                                                                                                                              |       |                                                      |
| `save_report`                                | Salva um relatório ou atualiza um existente.                                                                                                                                                                                                                                                                | Sim   |                                                      |
| `list_report_templates`                      | Lê os modelos de relatório.                                                                                                                                                                                                                                                                                 |       |                                                      |
| `save_report_template`                       | Salva um modelo de relatório.                                                                                                                                                                                                                                                                               | Sim   |                                                      |

As ferramentas do Analytics usam a cota de relatórios do Google Analytics (200.000 unidades por dia em uma propriedade padrão). Você pode acompanhar essa cota no aplicativo, na seção Limites da tela **Configurações**.

## Modelos de tarefa prontos (skills)

| Modelo              | Quando usar                                                                                                                             | O que produz                                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `seo-coach`         | Quando você pergunta "o que devo fazer". Explica o caminho à frente e sugere o próximo passo.                                           | Uma conversa e, se preciso, uma nota de orientação              |
| `seo-project-setup` | Em um projeto novo. Pergunta sobre o seu negócio, o objetivo, os concorrentes e as páginas-chave e preenche a tela Contexto do projeto. | Informações do projeto preenchidas, palavras-chave salvas       |
| `seo-audit`         | Quando você diz "audite o site". Executa a auditoria, combina com o Search Console e escolhe "a única coisa a fazer esta semana".       | Um relatório de auditoria de uma página                         |
| `seo-triage`        | Quando as visitas caem. Confere se a queda é real, e onde e quando ocorreu.                                                             | Um relatório de análise da queda                                |
| `seo-check-in`      | Uma vez por mês. Compara este período com o anterior.                                                                                   | Um relatório mensal de acompanhamento; um se acumula a cada mês |
| `seo-report`        | Depois que os outros modelos terminam. Escreve e salva um relatório HTML de arquivo único.                                              | Um relatório na tela **Relatórios**                             |

## Verificação

- Diga ao assistente "chame a ferramenta whoami". Ele deve informar a conta, a versão, o tipo de instalação e o número da porta. Se algum desses não for o que você espera, ou a versão for mais antiga que a última lançada, o assistente deve avisar antes de usar os dados. Uma cópia antiga do Docker pode estar respondendo no mesmo endereço, e o assistente leria os dados velhos dela com toda a confiança. Se outro programa ocupar a 3001, o pacote Windows muda para outro número; o whoami diz isso também.
- O selo na tela **Configuração do agente** deve dizer **Conectado**, e a hora da última chamada deve aparecer.
- "list_projects" deve listar os seus projetos.

## Perguntas frequentes

**O assistente envia os meus dados para fora?** Seus dados vão para o modelo que o assistente usa. Isso depende dos termos de privacidade do próprio assistente. O aplicativo apenas responde à conexão no seu computador.

**Funciona sem senha?** No Docker, funciona com `MCP_TOKEN=off`. No pacote Windows, a senha está sempre ligada. Em uma conexão sem senha, qualquer programa no mesmo computador pode chamar as 35 ferramentas.

**Conectei a uma cópia antiga?** `whoami` e `get_diagnostics` dizem com qual instalação você está falando: versão, tipo de instalação, número da porta e, no Windows, o motivo se a porta mudou. Se a versão for mais antiga que a última ou a porta tiver mudado, o assistente deve avisar. Pare a cópia antiga do Docker e reinicie o aplicativo.

**O assistente pode esgotar a minha cota do Google?** `inspect_urls` e `run_site_audit` a usam. Os modelos consultam no máximo 20 endereços por tarefa. Eles só iniciam uma auditoria quando você pede. Aplique o mesmo limite ao seu assistente.

**Qual assistente é melhor?** Não faz diferença, as ferramentas são as mesmas. O texto de configuração está pronto para o Claude Code, o Codex e o Cursor. Outros assistentes funcionam com o mesmo endereço e a mesma senha, se oferecerem suporte a MCP.

## Se algo der errado

- **O assistente recebe um erro 401.** A senha está errada ou não está sendo enviada. Copie o valor do arquivo de novo. Confira que não sobrou um caractere de quebra de linha no fim.
- **A conexão é recusada.** O aplicativo não está em execução. Veja o ícone da barra de tarefas ou a saída de `docker compose ps`.
- **O assistente diz "tool not found".** Recarregue a conexão. No Claude Code, digite `/mcp` e escolha **Reconnect**.
- **Os modelos não aparecem.** Cole o texto de configuração de novo. Os modelos são copiados para a pasta do próprio assistente (`$HOME/.agents/skills` no Codex).

<!-- Kaynaklar: src/routes/_app/ai.tsx; src/client/features/ai-mcp/agentInstallPrompt.md; agentSetupPrompt.ts; src/server/mcp/server.ts (35 araç); src/server/mcp/token-auth.ts; transport.ts; .agents/skills/setup-seotracker/SKILL.md; .agents/skills/*/SKILL.md; packaging/windows/launcher/SeoWatcher.cs; docker-entrypoint.sh -->
