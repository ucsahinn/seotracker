# Notas da versão

Funcionalidades, correções e outras alterações, da versão mais recente para a mais antiga.

## [0.7.1] Alpha — 2026-10-26

### Correções

- **Avisos:** o feed inclui texto alternativo em inglês para os restantes campos de idioma esperados pela versão 0.7.0.
- **Notificações:** os pop-ups de sistema do Windows e do navegador foram desativados. Os avisos aparecem no pop-up da própria aplicação enquanto ela está visível e ficam no histórico de notificações em segundo plano. Alertas importantes podem tocar o som da aplicação.
- **Ajuda · Diagnóstico:** as auditorias falhadas indicam a etapa, uma mensagem sem dados sensíveis e os erros PageSpeed mais comuns. Os URLs das páginas são removidos dos resumos exportados.

## [0.7.0] Alpha — 2026-10-25

### Funcionalidades

- **Arranque do Windows:** Ao iniciar o Windows, uma janela de progresso mostra a preparação do servidor; durante a transferência de uma atualização, apresenta a percentagem real.
- **Notificações do Windows:** As atualizações da aplicação e os avisos ao vivo aparecem na central de notificações do Windows quando a opção está ativa. A definição fica em Configurações → Notificações.
- **Avisos:** Os avisos são redigidos em turco e inglês. Nos outros idiomas da interface, é apresentada a versão em inglês.

## [0.6.0] Alpha — 2026-10-24

### Funcionalidades

- **Avisos:** Os avisos ao vivo aparecem na aplicação. Prepare e publique comunicados bilingues na página de administração protegida por palavra-passe.
- **Painel:** A secção Próximas etapas do painel oferece tarefas guiadas e uma pontuação de prontidão baseada nas ligações Google, numa auditoria recente, no contexto do projeto e na configuração do agente. Mede a prontidão da configuração, não o desempenho de SEO nem as posições.
- **Relatórios do agente:** Os relatórios dos agentes agora usam uma lista de verificação de cobertura para auditorias e PageSpeed, Search Console, oportunidades, histórico de posições, palavras-chave guardadas, Analytics, cobertura do índice e sitemaps, para gerar melhorias prioritárias.
- **Navegação:** A ligação da marca na navegação para computador e telemóvel abre seowatcher.io.

### Correções

- **Relatórios do agente:** As instruções dos relatórios pedem aos agentes que indiquem quais as fontes de dados disponíveis e que assinalem as que faltam.
- **Navegação:** A área da marca na navegação compacta agora cabe sem transbordar.

### Segurança

- **Avisos:** O acesso entre origens está desativado para a API de administração; o feed público permite apenas a leitura dos avisos.

## [0.5.0] Alpha — 2026-10-23

### Funcionalidades

- **Idioma:** Use a interface em turco ou inglês. O idioma escolhido em Definições → Aspeto → Idioma também altera a apresentação de números e datas.
- **Notificações:** O centro de notificações reúne resultados de auditorias, novas versões, problemas de ligação Google e atualizações de relatórios. Os sons e os alertas no computador têm controlos separados.
- **Notas de versão:** As notas da versão têm uma entrada própria na barra lateral, acima das Notificações. Etiquetas coloridas mostram funcionalidades, correções e alterações de segurança em cada versão.
- **Definições do Windows:** Em Definições → Windows, escolha se a aplicação arranca com o Windows e se as atualizações são instaladas automaticamente. A aplicação explica quando um administrador limita uma opção.
- **Auditoria do site:** Acompanhe o tempo decorrido e o progresso durante uma auditoria e, depois, consulte o resumo da conclusão. A aplicação também mostra o progresso ao preparar um relatório ou procurar atualizações.
- **Ajuda:** Abra o guia relevante a partir do título de qualquer ecrã.

### Correções

- **Novo projeto:** Nos telemóveis, a lista de países no formulário de novo projeto já não fica cortada. A tecla Esc fecha primeiro a lista e mantém o formulário aberto.
- **Ajuda:** As mensagens de ajuda longas cabem em janelas pequenas e compactas.
- **Definições:** As Definições agora realçam corretamente a secção selecionada. Os controlos do Windows têm áreas de toque maiores.
- **Estado de indexação:** As verificações simultâneas do índice usam a quota diária com maior precisão. Os resultados bem-sucedidos são preservados se outra verificação do grupo falhar.

### Segurança

- **Atualizações de segurança:** Foram aplicadas correções de segurança às dependências da aplicação.

### Antes de atualizar

Na primeira mudança da versão 2.x para a série 0.x Alpha, execute manualmente o novo instalador do Windows. O atualizador antigo não reconhece um número de versão inferior como mais recente. Os seus dados e ligações Google são mantidos.

## [0.4.3] Alpha — 2026-10-22

### Funcionalidades

- **Instalação do Windows:** O instalador do Windows inclui os componentes em falta, para que a aplicação também abra num computador limpo.
- **Atualizações do Windows:** Transfira novas versões em Atualização no menu da barra de tarefas. Também pode escolher a instalação automática.
- **Ajuda · Diagnóstico:** A reparação da instalação pode resolver problemas de arranque. As informações pessoais são ocultadas nos relatórios de diagnóstico quando comunica um problema.
- **Aspeto da aplicação:** Os menus, as definições e os ecrãs iniciais são mais simples. Os temas claro e escuro agora correspondem entre a aplicação e o site.
- **Guia do utilizador:** O guia do utilizador está disponível em seis idiomas.

### Correções

- **Auditoria · Oportunidades:** Removido o transbordo horizontal nos telemóveis em Auditoria do site e Oportunidades.
- **Ligações Google:** Corrigido um aviso incorreto de ligação Google quando a aplicação usa apenas uma conta de serviço.
- **Analytics:** Melhorada a apresentação de dispositivos, canais, países e moedas no Analytics.
- **Site · transferências:** Corrigidas as ligações de transferência incorretas e os ecrãs em branco para endereços não reconhecidos.

## [0.3.0] Alpha — 2026-10-21

### Funcionalidades

- **Instalação do Windows:** Instale a aplicação do Windows com um único instalador, sem Docker nem terminal.
- **Site:** Encontre transferências, informações do produto e o guia do utilizador em seowatcher.io.

### Correções

- **Auditoria do site:** Corrigido o texto que ultrapassava o cartão de resumo de problemas em Auditoria do site.

## [0.2.1] Alpha — 2026-10-04

### Correções

- **Definições · Google:** Corrigido o problema que pedia para voltar a ligar o Google cerca de uma hora após configurar a ligação em Definições.
- **Auditoria do site:** Mantidos os resultados anteriores bem-sucedidos quando uma auditoria para a meio ou é repetida.
- **Auditoria do site:** Melhorados os cálculos de profundidade das páginas, cobertura do sitemap e páginas órfãs.
- **Projetos · Google:** Impedido que os dados do projeto anterior se misturassem com os do novo após alterar contas ou propriedades Google.
- **Palavras-chave guardadas · CSV:** Corrigida a ordem das palavras-chave guardadas e dos ficheiros CSV que o Excel abria com caracteres turcos incorretos.
- **Formulários · atualização:** Mantido o texto nos formulários abertos quando uma atualização em segundo plano falha. Os erros agora explicam com maior clareza o próximo passo útil.

### Segurança

- **Relatórios · rastreio:** Reforçadas as verificações de segurança para relatórios transferidos e endereços de sites analisados.

## [0.2.0] Alpha — 2026-10-03

### Funcionalidades

- **Configuração do agente:** A instrução de configuração no ecrã Configuração do agente verifica passo a passo uma primeira instalação e a ligação Google.

### Correções

- **Analytics:** Corrigidos o indicador de quota do Analytics, as dimensões dos relatórios e as comparações no histórico de auditorias.
- **Definições:** As definições agora indicam qual ligação Google está a ser usada.
- **Configuração do agente:** Corrigidas as instruções de ligação do agente para Windows e Git Bash.

## [0.1.0] Alpha — 2026-10-02

### Funcionalidades

- **Configuração do agente:** Adicionadas instruções de ligação específicas para o Codex.
- **Ligações Google:** Os limites do Google e do sistema aparecem agora nos ecrãs relevantes. Os contadores sem dados conhecidos são identificados claramente.
- **Ecrãs principais:** Adicionados um botão Atualizar e a hora da última atualização aos ecrãs principais.
- **Ajuda:** Reunidas as informações de diagnóstico, os problemas comuns e as ações rápidas no ecrã Ajuda.

### Correções

- **Auditoria do site:** Uma auditoria interrompida já não impede indefinidamente o início de uma nova auditoria.
- **Projetos:** Os filtros e resultados do projeto anterior deixam de permanecer visíveis ao mudar de projeto.
- **Palavras-chave guardadas:** Corrigidas a pesquisa de palavras-chave em turco, as exportações e as estimativas de tempo restante.
- **Eliminar · desligar:** As ações de eliminação e de desligação do Google pedem agora confirmação.
