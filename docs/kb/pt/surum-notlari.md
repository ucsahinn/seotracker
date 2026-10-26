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
- **Pontuação:** a pontuação é calculada com pesos por categoria.
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

- **Avisos:** o texto alternativo em inglês preenche os campos de idioma esperados pelo aplicativo 0.7.0.
- **Ajuda · Diagnóstico:** as auditorias com falha indicam a etapa, uma mensagem sem dados sensíveis e os erros do PageSpeed mais comuns. Os URLs das páginas são removidos dos resumos exportados.

## 0.7.0 Alpha — 2026-10-25

- **Inicialização do Windows:** Ao iniciar o Windows, uma janela de progresso mostra a preparação do servidor; durante o download de uma atualização, exibe a porcentagem real.
- **Notificações do Windows:** As atualizações do aplicativo e os avisos ao vivo aparecem na central de notificações do Windows quando a opção está ativada. A configuração fica em Configurações → Notificações.
- **Avisos:** Os avisos são redigidos em turco e inglês. Nos outros idiomas da interface, é exibida a versão em inglês.

## 0.6.0 Alpha — 2026-10-24

- **Avisos:** Os avisos ao vivo aparecem no aplicativo. Prepare e publique comunicados bilíngues na página de administração protegida por senha.
- **Painel:** A seção Próximas etapas do painel oferece tarefas guiadas e uma pontuação de preparação baseada nas conexões com o Google, em uma auditoria recente, no contexto do projeto e na configuração do agente. Ela mede a preparação da configuração, não o desempenho de SEO nem as posições.
- **Relatórios do agente:** Os relatórios dos agentes agora usam uma lista de verificação de cobertura para auditorias e PageSpeed, Search Console, oportunidades, histórico de posições, palavras-chave salvas, Analytics, cobertura do índice e sitemaps, para gerar melhorias prioritárias.
- **Navegação:** O link da marca na navegação para computador e celular abre o seowatcher.io.
- **Relatórios do agente:** As instruções dos relatórios pedem que os agentes indiquem quais fontes de dados estão disponíveis e apontem as que faltam.
- **Navegação:** A área da marca na navegação compacta agora cabe sem transbordar.
- **Avisos:** O acesso entre origens está desativado para a API de administração; o feed público permite apenas a leitura dos avisos.

## 0.5.0 Alpha — 2026-10-23

- **Idioma:** Use a interface em turco ou inglês. O idioma escolhido em Configurações → Aparência → Idioma também altera a exibição de números e datas.
- **Notificações:** A central de notificações reúne resultados de auditorias, novas versões, problemas de conexão com o Google e atualizações de relatórios. Os sons e os alertas no computador têm controles separados.
- **Notas de versão:** As notas de versão têm uma entrada própria na barra lateral, acima de Notificações. Etiquetas coloridas mostram funcionalidades, correções e mudanças de segurança de cada versão.
- **Configurações do Windows:** Em Configurações → Windows, escolha se o aplicativo inicia com o Windows e se as atualizações são instaladas automaticamente. O aplicativo explica quando um administrador limita uma opção.
- **Auditoria do site:** Acompanhe o tempo decorrido e o progresso durante uma auditoria e, depois, veja o resumo da conclusão. O aplicativo também mostra o progresso ao preparar um relatório ou procurar atualizações.
- **Ajuda:** Abra o guia correspondente a partir do título de qualquer tela.
- **Novo projeto:** No celular, a lista de países do formulário de novo projeto não fica mais cortada. A tecla Esc fecha primeiro a lista e mantém o formulário aberto.
- **Ajuda:** As mensagens de ajuda longas cabem em janelas pequenas e compactas.
- **Configurações:** As Configurações agora destacam corretamente a seção selecionada. Os controles do Windows têm áreas de toque maiores.
- **Status de indexação:** As verificações simultâneas do índice usam a cota diária com mais precisão. Os resultados bem-sucedidos são preservados se outra verificação do grupo falhar.
- **Atualizações de segurança:** Foram aplicadas correções de segurança às dependências do aplicativo.

## 0.4.3 Alpha — 2026-10-22

Todas as versões intermediárias desde a 0.3.0 estão reunidas nesta versão.

- **Instalação do Windows:** o instalador traz os componentes que faltam, então o aplicativo abre já na primeira vez, mesmo em um computador limpo. O nome do arquivo e o assistente mostram a versão instalada; desinstalar não apaga os seus dados.
- **Atualizações do Windows:** o item Atualizar do menu da barra de tarefas está sempre lá. Ele baixa, verifica e instala a nova versão e mostra a verificação, a porcentagem do download e a etapa da instalação. Você pode deixar as atualizações serem instaladas automaticamente.
- **Windows · Recupera-se sozinho:** se o servidor parar de forma inesperada, o aplicativo o reinicia. Os arquivos de log deixam de crescer sem parar.
- **Ajuda · Diagnóstico:** Reparar instalação ajuda a resolver problemas de inicialização. Relatar um problema abre um registro já preenchido; nome de usuário, nomes de sites e e-mails são ocultados no relatório de diagnóstico.
- **Primeira configuração:** em Configuração do agente, Instalar do zero fica no topo, com um único cartão e um único botão de copiar para Claude Code, Codex e outros assistentes. As Configurações explicam a conexão com o Google em três passos.
- **Retorno ao usuário:** salvar, excluir e conectar dizem o que está acontecendo durante a espera, ao terminar e em caso de erro. Excluir e desconectar pedem confirmação antes.
- **Aparência do aplicativo:** menu, configurações e telas de primeira configuração foram simplificados, e mais de duzentos textos de tela foram reescritos em turco natural. O tema escuro é o padrão, e os temas claro e escuro combinam com o site.
- **Windows e Docker:** a Ajuda e as instruções para agentes reconhecem as duas instalações. Elas falam da barra de tarefas no Windows e dos comandos `docker compose` no Docker.
- **Guia do usuário e site:** o seowatcher.io e o guia do usuário de 20 páginas estão disponíveis em seis idiomas. As páginas de solução de problemas usam caixas de Sintoma, Causa e Solução.
- **Auditoria · Oportunidades:** o transbordo lateral no celular nas telas de auditoria do site e de Oportunidades foi corrigido.
- **Conexão com o Google:** o aviso errado de "chave de acesso do Google ausente", exibido quando só uma conta de serviço está conectada, foi corrigido. Os erros vindos do Google agora apontam para a conexão com o Google.
- **Analytics:** os nomes de dispositivos, canais e países aparecem em turco, os valores de receita mostram a moeda e as porcentagens de variação têm o mesmo formato em todas as telas.
- **Site · downloads:** o link de download aponta para a versão certa. Um endereço desconhecido abre uma tela Página não encontrada com um link de volta ao painel, em vez de uma página em branco.

## 0.3.0 Alpha — 2026-10-21

- **Instalação do Windows:** instale no Windows com um único instalador, sem Docker nem terminal. Na primeira abertura, o aplicativo cria as chaves necessárias, prepara o banco de dados e abre o navegador; você o gerencia pelo ícone da barra de tarefas. Desinstalar não apaga os seus dados.
- **Site:** no seowatcher.io você encontra os links de download, as informações do produto e o guia do usuário.
- **Guia do usuário:** instalação, funcionalidades, habilidades prontas e ferramentas para agentes foram reescritas do zero, com capturas de tela do aplicativo.
- **Auditoria:** os números que saíam do cartão de resumo de problemas na auditoria do site foram corrigidos.

## 0.2.1 Alpha — 2026-10-04

A 0.2.0 foi incorporada a esta versão. O foco é a limpeza de erros; seus dados são mantidos na atualização.

- **Configuração do agente:** se você acabou de baixar o repositório, cole no seu agente o prompt de configuração da tela Configuração do agente; ele verifica, em ordem, o Docker, a conexão com o Google, a chave do PageSpeed, o projeto e a conexão do agente. Ele nunca pede que você cole segredos no chat. O mesmo prompt também está nas ações rápidas da Ajuda.
- **Configurações · Google:** o cliente do Google informado nas Configurações também é usado ao renovar o acesso; o problema que pedia para reconectar depois de cerca de uma hora foi corrigido. As Configurações explicam qual conexão com o Google está em uso.
- **Auditoria:** os resultados bem-sucedidos anteriores, inclusive as medições de velocidade, são mantidos quando uma auditoria é interrompida ou repetida.
- **Auditoria · cálculos:** profundidade das páginas, cobertura do sitemap e detecção de páginas órfãs são calculadas com mais precisão. Endereços parecidos mas diferentes (http e https, www, barra final) agora contam como diferentes na comparação do endereço canônico, o que pode revelar divergências reais antes escondidas.
- **Projetos · Google:** os dados de um projeto antigo não se misturam mais quando a conta ou a propriedade do Google muda. Remover uma conta apaga apenas os dados dos projetos dessa conta.
- **Analytics:** o cartão de cota mostra o uso correto ("231 / 200.000"). Os tamanhos de relatório usam a mesma unidade em todo lugar. As colunas do histórico de auditorias informam que são "a cada cem páginas".
- **Palavras-chave salvas · CSV:** a ordem das palavras-chave salvas e a abertura no Excel de arquivos CSV com caracteres turcos foram corrigidas. É possível salvar mais de 500 consultas de uma vez.
- **Formulários · erros:** se uma atualização em segundo plano falhar, o que você digitou em um formulário aberto é mantido. As mensagens de erro dizem o que aconteceu e o que fazer em seguida.
- **Configuração do agente:** as instruções de conexão para Windows e Git Bash e o comando do Codex foram corrigidos. As descrições das ferramentas agora dizem com clareza que salvar palavras-chave e gravar informações do projeto acontece sem pedir confirmação.
- **Relatórios:** um relatório baixado sempre abre com as suas próprias regras de proteção, de modo que uma página escrita com más intenções não consegue rodar antes da proteção.
- **Endereços analisados:** o domínio com e sem www é verificado separadamente antes da varredura. Nome de usuário e senha escritos em um endereço são recusados e ocultados na tela.
- **Docker:** a chave de criptografia e a senha do MCP são gravadas com segurança; uma chave existente nunca é sobrescrita.

## 0.1.0 Alpha — 2026-10-02

- **Suporte ao Codex:** a Configuração do agente tem instruções separadas para o Codex; ele se conecta com um único comando, instala as habilidades de SEO e as confere com uma chamada real.
- **Limites do Google e do sistema:** sua cota diária de inspeções de URL, a cota do Analytics, o número de medições de velocidade de hoje e os limites de relatórios aparecem nas telas correspondentes. Só são exibidos números realmente conhecidos, cada um com sua fonte e horário.
- **Ações rápidas:** as telas principais têm um botão Atualizar, o horário da última atualização e o atalho r.
- **Visão ao vivo:** o progresso da auditoria mostra a varredura e a medição de velocidade em barras separadas, com uma estimativa do tempo restante. Com a redução de movimento ativada, nenhuma animação é exibida.
- **Ajuda:** nova verificação de status, pacote de diagnóstico, documentação e notas de versão agora ficam em uma única barra. Os problemas comuns cobrem Docker, porta ocupada, senha do MCP, limite do PageSpeed e falta de dados de consultas.
- **Configurações:** salto rápido entre as seções, um selo de status em cada seção e um botão Testar chave para a chave do PageSpeed.
- **Auditoria:** auditorias interrompidas não bloqueiam mais novas auditorias para sempre, e as concluídas não ocupam mais a capacidade. Um agente que lê uma auditoria em andamento vê "auditoria em andamento" em vez de "sem problemas".
- **Projetos · Google:** filtros e resultados do projeto anterior não ficam mais na tela ao trocar de projeto. Trocar a propriedade do Search Console ou desconectar não mistura mais o histórico de duas propriedades. Oportunidades, Acompanhamento de posições e Analytics não guardam mais dados antigos quando a conexão com o Google muda.
- **Palavras-chave salvas:** a busca com caracteres turcos ("çay", "istanbul"), a exportação e a estimativa do tempo restante foram corrigidas.
- **Configurações:** o formulário não fica mais oculto quando o cliente do Google vem de uma variável de ambiente, e o formato do ID do cliente do Google é verificado. Uma verificação de atualização com falha não diz mais "atualizado".
- **Exclusão · desconexão:** excluir e remover a conexão com o Google, inclusive excluir credenciais, pedem confirmação.
- **Campo de busca · área de transferência:** o campo de busca não adiciona mais uma entrada de histórico a cada tecla nem perde letras. Copiar para a área de transferência também funciona em endereços não seguros.

## Numeração das versões

O seowatcher usa números 0.x Alpha até a 1.0. Um novo recurso perceptível aumenta o número do meio (0.7.1 → 0.8.0); uma versão só com correções aumenta o último (0.7.0 → 0.7.1). As versões de 0.0.0 a 0.4.3 foram publicadas primeiro com tags v2.x; a correspondência está na tabela no início do [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md).

O histórico completo está no [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) no GitHub.
