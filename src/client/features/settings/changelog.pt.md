# Notas da versão

Funcionalidades, correções e outras alterações, da versão mais recente para a mais antiga.

## [0.7.0] Alpha — 2026-10-25

### Funcionalidades

- Ao iniciar o Windows, uma janela de progresso mostra a preparação do servidor; durante a transferência de uma atualização, apresenta a percentagem real.
- As atualizações da aplicação e os avisos ao vivo aparecem na central de notificações do Windows quando a opção está ativa. A definição fica em Configurações → Notificações.
- Os avisos ao vivo podem ser preparados em seis idiomas e apresentados no idioma de interface selecionado.

## [0.6.0] Alpha — 2026-10-24

### Funcionalidades

- Os avisos ao vivo aparecem na aplicação. Prepare e publique comunicados bilingues na página de administração protegida por palavra-passe.
- A secção Próximas etapas do painel oferece tarefas guiadas e uma pontuação de prontidão baseada nas ligações Google, numa auditoria recente, no contexto do projeto e na configuração do agente. Mede a prontidão da configuração, não o desempenho de SEO nem as posições.
- Os relatórios dos agentes agora usam uma lista de verificação de cobertura para auditorias e PageSpeed, Search Console, oportunidades, histórico de posições, palavras-chave guardadas, Analytics, cobertura do índice e sitemaps, para gerar melhorias prioritárias.
- A ligação da marca na navegação para computador e telemóvel abre seowatcher.io.

### Correções

- As instruções dos relatórios pedem aos agentes que indiquem quais as fontes de dados disponíveis e que assinalem as que faltam.
- A área da marca na navegação compacta agora cabe sem transbordar.

### Segurança

- O acesso entre origens está desativado para a API de administração; o feed público permite apenas a leitura dos avisos.

## [0.5.0] Alpha — 2026-10-23

### Funcionalidades

- Use a interface em turco ou inglês. O idioma escolhido em Definições → Aspeto → Idioma também altera a apresentação de números e datas.
- O centro de notificações reúne resultados de auditorias, novas versões, problemas de ligação Google e atualizações de relatórios. Os sons e os alertas no computador têm controlos separados.
- As notas da versão têm uma entrada própria na barra lateral, acima das Notificações. Etiquetas coloridas mostram funcionalidades, correções e alterações de segurança em cada versão.
- Em Definições → Windows, escolha se a aplicação arranca com o Windows e se as atualizações são instaladas automaticamente. A aplicação explica quando um administrador limita uma opção.
- Acompanhe o tempo decorrido e o progresso durante uma auditoria e, depois, consulte o resumo da conclusão. A aplicação também mostra o progresso ao preparar um relatório ou procurar atualizações.
- Abra o guia relevante a partir do título de qualquer ecrã.

### Correções

- Nos telemóveis, a lista de países no formulário de novo projeto já não fica cortada. A tecla Esc fecha primeiro a lista e mantém o formulário aberto.
- As mensagens de ajuda longas cabem em janelas pequenas e compactas.
- As Definições agora realçam corretamente a secção selecionada. Os controlos do Windows têm áreas de toque maiores.
- As verificações simultâneas do índice usam a quota diária com maior precisão. Os resultados bem-sucedidos são preservados se outra verificação do grupo falhar.

### Segurança

- Foram aplicadas correções de segurança às dependências da aplicação.

### Antes de atualizar

Na primeira mudança da versão 2.x para a série 0.x Alpha, execute manualmente o novo instalador do Windows. O atualizador antigo não reconhece um número de versão inferior como mais recente. Os seus dados e ligações Google são mantidos.

## [0.4.3] Alpha — 2026-10-22

### Funcionalidades

- O instalador do Windows inclui os componentes em falta, para que a aplicação também abra num computador limpo.
- Transfira novas versões em Atualização no menu da barra de tarefas. Também pode escolher a instalação automática.
- A reparação da instalação pode resolver problemas de arranque. As informações pessoais são ocultadas nos relatórios de diagnóstico quando comunica um problema.
- Os menus, as definições e os ecrãs iniciais são mais simples. Os temas claro e escuro agora correspondem entre a aplicação e o site.
- O guia do utilizador está disponível em seis idiomas.

### Correções

- Removido o transbordo horizontal nos telemóveis em Auditoria do site e Oportunidades.
- Corrigido um aviso incorreto de ligação Google quando a aplicação usa apenas uma conta de serviço.
- Melhorada a apresentação de dispositivos, canais, países e moedas no Analytics.
- Corrigidas as ligações de transferência incorretas e os ecrãs em branco para endereços não reconhecidos.

## [0.3.0] Alpha — 2026-10-21

### Funcionalidades

- Instale a aplicação do Windows com um único instalador, sem Docker nem terminal.
- Encontre transferências, informações do produto e o guia do utilizador em seowatcher.io.

### Correções

- Corrigido o texto que ultrapassava o cartão de resumo de problemas em Auditoria do site.

## [0.2.1] Alpha — 2026-10-04

### Correções

- Corrigido o problema que pedia para voltar a ligar o Google cerca de uma hora após configurar a ligação em Definições.
- Mantidos os resultados anteriores bem-sucedidos quando uma auditoria para a meio ou é repetida.
- Melhorados os cálculos de profundidade das páginas, cobertura do sitemap e páginas órfãs.
- Impedido que os dados do projeto anterior se misturassem com os do novo após alterar contas ou propriedades Google.
- Corrigida a ordem das palavras-chave guardadas e dos ficheiros CSV que o Excel abria com caracteres turcos incorretos.
- Mantido o texto nos formulários abertos quando uma atualização em segundo plano falha. Os erros agora explicam com maior clareza o próximo passo útil.

### Segurança

- Reforçadas as verificações de segurança para relatórios transferidos e endereços de sites analisados.

## [0.2.0] Alpha — 2026-10-03

### Funcionalidades

- A instrução de configuração no ecrã Configuração do agente verifica passo a passo uma primeira instalação e a ligação Google.

### Correções

- Corrigidos o indicador de quota do Analytics, as dimensões dos relatórios e as comparações no histórico de auditorias.
- As definições agora indicam qual ligação Google está a ser usada.
- Corrigidas as instruções de ligação do agente para Windows e Git Bash.

## [0.1.0] Alpha — 2026-10-02

### Funcionalidades

- Adicionadas instruções de ligação específicas para o Codex.
- Os limites do Google e do sistema aparecem agora nos ecrãs relevantes. Os contadores sem dados conhecidos são identificados claramente.
- Adicionados um botão Atualizar e a hora da última atualização aos ecrãs principais.
- Reunidas as informações de diagnóstico, os problemas comuns e as ações rápidas no ecrã Ajuda.

### Correções

- Uma auditoria interrompida já não impede indefinidamente o início de uma nova auditoria.
- Os filtros e resultados do projeto anterior deixam de permanecer visíveis ao mudar de projeto.
- Corrigidas a pesquisa de palavras-chave em turco, as exportações e as estimativas de tempo restante.
- As ações de eliminação e de desligação do Google pedem agora confirmação.
