---
title: Notas da versão
description: seowatcher 0.8.0 Alpha — auditoria do site refeita com 201 regras, resultados honestos, tarefas ordenadas por tráfego e a interface em seis idiomas.
updated: 2026-10-26
---

A versão mais recente é a **0.8.0 Alpha**, de 26 de outubro de 2026. Os dados são mantidos na atualização.

Para passar de 2.x para 0.x.x Alpha, execute o novo instalador manualmente; o atualizador antigo não reconhece o número menor como mais recente.

## 0.8.0 Alpha — 2026-10-26

- **Auditoria do site reconstruída:** 201 regras examinam as páginas e o site como um todo, incluindo cabeçalhos de segurança, registros de e-mail e de domínio, vencimento do SSL e do domínio, acesso de rastreadores de IA e resultados do Lighthouse.
- **Resultados honestos:** uma verificação impossível de medir deixa de contar como "aprovada", e uma consulta que não pôde ser feita não gera achado. Quando faltam dados, a tela diz isso com clareza.
- **Ordem das tarefas:** as correções são ordenadas pelo seu tráfego no Search Console, e a pontuação é ponderada por categoria.
- **Nova tela e novo relatório:** abas Verificações e Dados instantâneos, prévias de busca e de compartilhamento, histórico da pontuação e relatório para download redesenhado.
- **Interface em seis idiomas:** alemão, francês, italiano e português (Brasil) foram adicionados. Com o turco e o inglês, o aplicativo inteiro está disponível em seis idiomas.

### Auditoria do site

- **Verificações do site inteiro:** cabeçalhos de segurança (como HSTS), redirecionamentos, a resposta a uma página que não existe, o robots.txt, os registros SPF e DMARC e as datas de vencimento do certificado SSL e do domínio são consultados uma vez no início da auditoria. Cada consulta gera um único achado.
- **Rastreadores de IA:** a auditoria verifica se o seu robots.txt bloqueia rastreadores de IA como GPTBot, ClaudeBot e PerplexityBot e se você tem um arquivo llms.txt.
- **Achados do Lighthouse:** com a medição de velocidade ativada, as auditorias do Lighthouse aparecem como problemas, cada uma com a economia estimada.
- **Links externos e imagens:** opcionalmente, a auditoria verifica se os links externos abrem e se as imagens são maiores do que o necessário.
- **Mais regras:** 201 regras no total, com sinais de página e mais de 20 novos achados. O que cada regra significa e como corrigi-la está explicado no guia Regras de auditoria.
- **A fazer:** o que deve ser corrigido é ordenado pelo tráfego do Search Console. Se o Search Console não estiver conectado, a ordem considera apenas o impacto na pontuação.
- **Verificações e Dados instantâneos:** a aba Verificações lista também as verificações aprovadas e as que não puderam ser medidas. A aba Dados instantâneos mostra as informações do site medidas durante a auditoria e, quando houver, as Core Web Vitals.
- **Prévias:** prévia do resultado na Pesquisa Google, do cartão de compartilhamento (Open Graph) e da exibição no celular.
- **Histórico e relatório:** o histórico da pontuação mostra como ela mudou entre as auditorias. O relatório para download foi redesenhado.

### Outras funcionalidades

- **Idioma da interface:** escolha um dos seis idiomas em Configurações → Aparência → Idioma; números e datas seguem a sua escolha.
- **Orientações de instalação:** as diferenças entre o pacote do Windows e o Docker, como onde ficam as configurações e quais valem, são explicadas com clareza no guia e na Ajuda.
- **Ferramentas para agentes:** a nova ferramenta `get_audit_summary` devolve, em uma única chamada, a pontuação do site, as pontuações por categoria, a lista ordenada de tarefas e os dados instantâneos do site.
- **Guia:** a página Regras de auditoria explica as 201 regras uma a uma; o guia e as notas de versão estão disponíveis em seis idiomas.
- **seowatcher.io · privacidade:** no site, o Google Analytics 4 só funciona se houver um ID de medição definido e você escolher Aceitar; nada é enviado ao Google antes do seu consentimento. A página de privacidade está disponível em seis idiomas.

### Correções

- **Precisão da auditoria:** nove causas de resultados errados foram corrigidas depois de comparar auditorias com medições em sites reais.
- **Auditoria · celular:** a tela de auditoria e o relatório baixado não transbordam mais no celular.

## 0.7.1 Alpha — 2026-10-26

- **Avisos:** os avisos ao vivo aparecem na tela Avisos do aplicativo. São redigidos em turco e inglês; nos outros idiomas da interface, é exibida a versão em inglês. Prepare e publique os textos na página de administração protegida por senha.
- **Painel:** A seção Próximas etapas do painel oferece tarefas guiadas e uma pontuação de preparação baseada nas conexões com o Google, em uma auditoria recente, no contexto do projeto e na configuração do agente. Ela mede a preparação da configuração, não o desempenho de SEO nem as posições.
- **Relatórios do agente:** Os relatórios dos agentes agora usam uma lista de verificação de cobertura para auditorias e PageSpeed, Search Console, oportunidades, histórico de posições, palavras-chave salvas, Analytics, cobertura do índice e sitemaps, para gerar melhorias prioritárias.
- **Notificações:** A central de notificações reúne resultados de auditorias, novas versões, problemas de conexão com o Google e atualizações de relatórios. Os sons e os alertas no computador têm controles separados.
- **Notificações do Windows:** As atualizações do aplicativo e os avisos ao vivo aparecem na central de notificações do Windows quando a opção está ativada. A configuração fica em Configurações → Notificações.
- **Inicialização do Windows:** Ao iniciar o Windows, uma janela de progresso mostra a preparação do servidor; durante o download de uma atualização, exibe a porcentagem real.
- **Configurações do Windows:** Em Configurações → Windows, escolha se o aplicativo inicia com o Windows e se as atualizações são instaladas automaticamente. O aplicativo explica quando um administrador limita uma opção.
- **Auditoria do site:** Acompanhe o tempo decorrido e o progresso durante uma auditoria e, depois, veja o resumo da conclusão. O aplicativo também mostra o progresso ao preparar um relatório ou procurar atualizações.
- **Novo projeto:** No celular, a lista de países do formulário de novo projeto não fica mais cortada. A tecla Esc fecha primeiro a lista e mantém o formulário aberto.
- **Ajuda · Diagnóstico:** as auditorias com falha indicam a etapa, uma mensagem sem dados sensíveis e os erros do PageSpeed mais comuns. Os URLs das páginas são removidos dos resumos exportados.
- **Atualizações de segurança:** Foram aplicadas correções de segurança às dependências do aplicativo.

## 0.4.3 Alpha — 2026-10-23

- **Instalação do Windows:** instale no Windows com um único instalador, sem Docker nem terminal. Ele traz os componentes que faltam: o aplicativo abre já na primeira vez, mesmo em um computador limpo, cria as chaves necessárias, prepara o banco de dados e abre o navegador. Você o gerencia pelo ícone da barra de tarefas; desinstalar não apaga seus dados.
- **Atualizações do Windows:** o item Atualizar do menu da barra de tarefas está sempre lá. Ele baixa, verifica e instala a nova versão e mostra a verificação, a porcentagem do download e a etapa da instalação. Você pode deixar as atualizações serem instaladas automaticamente.
- **Windows · Recupera-se sozinho:** se o servidor parar de forma inesperada, o aplicativo o reinicia. Os arquivos de log deixam de crescer sem parar.
- **Ajuda · Diagnóstico:** Reparar instalação ajuda a resolver problemas de inicialização. Relatar um problema abre um registro já preenchido; nome de usuário, nomes de sites e e-mails são ocultados no relatório de diagnóstico.
- **Primeira configuração:** em Configuração do agente, Instalar do zero fica no topo, com um único cartão e um único botão de copiar para Claude Code, Codex e outros assistentes. As Configurações explicam a conexão com o Google em três passos.
- **Retorno ao usuário:** salvar, excluir e conectar dizem o que está acontecendo durante a espera, ao terminar e em caso de erro. Excluir e desconectar pedem confirmação antes.
- **Aparência do aplicativo:** menu, configurações e telas de primeira configuração foram simplificados, e mais de duzentos textos de tela foram reescritos em turco natural. O tema escuro é o padrão, e os temas claro e escuro combinam com o site.
- **Guia do usuário e site:** o seowatcher.io e o guia do usuário de 20 páginas estão disponíveis em seis idiomas. As páginas de solução de problemas usam caixas de Sintoma, Causa e Solução.
- **Conexão com o Google:** o aviso errado de "chave de acesso do Google ausente", exibido quando só uma conta de serviço está conectada, foi corrigido. Os erros vindos do Google agora apontam para a conexão com o Google.
- **Analytics:** os nomes de dispositivos, canais e países aparecem em turco, os valores de receita mostram a moeda e as porcentagens de variação têm o mesmo formato em todas as telas.
- **Auditoria · Oportunidades:** o transbordo lateral no celular nas telas de auditoria do site e de Oportunidades foi corrigido.

## 0.2.1 Alpha — 2026-10-04

- **Todos os dados em um só aplicativo:** os dados do Search Console, do Analytics, da auditoria do site e do PageSpeed ficam reunidos em um só aplicativo, no seu próprio computador. Você pode examinar os problemas do site, as páginas afetadas, os resultados de velocidade e o histórico de auditorias.
- **Acompanhamento e relatórios:** acompanhe o desempenho na busca e a posição das palavras-chave salvas e veja oportunidades de melhoria. Baixe e imprima os relatórios de auditoria e mantenha-os na mesma lista dos relatórios dos seus agentes. Tema claro e escuro, uso pelo teclado e suporte a leitores de tela estão incluídos.
- **Configuração do agente:** se você acabou de baixar o repositório, cole no seu agente o prompt de configuração da tela Configuração do agente; ele verifica, em ordem, o Docker, a conexão com o Google, a chave do PageSpeed, o projeto e a conexão do agente. Ele nunca pede que você cole segredos no chat. O mesmo prompt também está nas ações rápidas da Ajuda.
- **Suporte ao Codex:** a Configuração do agente tem instruções separadas para o Codex; ele se conecta com um único comando, instala as habilidades de SEO e as confere com uma chamada real.
- **Limites do Google e do sistema:** sua cota diária de inspeções de URL, a cota do Analytics, o número de medições de velocidade de hoje e os limites de relatórios aparecem nas telas correspondentes. Só são exibidos números realmente conhecidos, cada um com sua fonte e horário.
- **Visão ao vivo:** o progresso da auditoria mostra a varredura e a medição de velocidade em barras separadas, com uma estimativa do tempo restante. Com a redução de movimento ativada, nenhuma animação é exibida.
- **Auditoria:** auditorias interrompidas não bloqueiam mais novas auditorias para sempre, e as concluídas não ocupam mais a capacidade. Um agente que lê uma auditoria em andamento vê "auditoria em andamento" em vez de "sem problemas".
- **Auditoria · cálculos:** profundidade das páginas, cobertura do sitemap e detecção de páginas órfãs são calculadas com mais precisão. Endereços parecidos mas diferentes (http e https, www, barra final) agora contam como diferentes na comparação do endereço canônico, o que pode revelar divergências reais antes escondidas.
- **Projetos · Google:** os dados de um projeto antigo não se misturam mais quando a conta ou a propriedade do Google muda. Remover uma conta apaga apenas os dados dos projetos dessa conta.
- **Configurações · Google:** o cliente do Google informado nas Configurações também é usado ao renovar o acesso; o problema que pedia para reconectar depois de cerca de uma hora foi corrigido. As Configurações explicam qual conexão com o Google está em uso.
- **Relatórios:** um relatório baixado sempre abre com as suas próprias regras de proteção, de modo que uma página escrita com más intenções não consegue rodar antes da proteção.

## Numeração das versões

O seowatcher usa números 0.x Alpha até a 1.0. Um novo recurso perceptível aumenta o número do meio (0.7.1 → 0.8.0); uma versão só com correções aumenta o último (0.7.0 → 0.7.1). As versões de 0.0.0 a 0.4.3 foram publicadas primeiro com tags v2.x; a correspondência está na tabela no início do [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md).

O histórico completo está no [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) no GitHub.
