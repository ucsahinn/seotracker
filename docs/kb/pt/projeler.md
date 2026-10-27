---
title: Projetos
description: Criar um projeto novo, escolher o site e o país, renomear, gerenciar as conexões com o Google e arquivar e restaurar um projeto.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-27
---

Nesta página você cria um projeto, altera as configurações dele e, se precisar, o remove. Cada site é um projeto. Cada projeto tem a sua própria conexão com o Google, as suas próprias auditorias e os seus próprios relatórios.

## O que há na tela

**Proje seçici** (Seletor de projetos). Clique no nome do projeto no canto superior esquerdo e os seus projetos aparecem em uma lista. No fim estão **Novo projeto** e **Gerenciar projetos**. O ícone de engrenagem ao lado abre **Configurações do projeto**. Quando você tem oito projetos ou mais, uma caixa de busca aparece na lista.

Página **Projetos**. Cada linha mostra o nome do projeto e o site dele. Um projeto sem site mostra "Nenhum site adicionado". Se você tem mais de um projeto, o aberto leva o rótulo **Ativo**. Abaixo de cada linha há um resumo curto do projeto: os cliques dos últimos 28 dias e a variação em relação aos 28 anteriores (com uma linha pequena), o momento da última auditoria ("Última auditoria há 3 dias" ou "Nenhuma auditoria ainda") e se o Search Console e o Analytics estão conectados. Ponto cheio quer dizer conectado, ponto vazio não conectado. O número de cliques vem do arquivo deste computador. Se o arquivo não tem dados de pesquisa, aparece "Sem dados de pesquisa no arquivo". Passando o mouse sobre o número, você vê as datas que ele cobre. Clicar na linha abre o projeto. O botão **Configurações** à direita abre as configurações do projeto. Em um projeto sem site, o botão diz **Adicionar site**. Os projetos arquivados ficam no fim, na seção **Arquivado**. **Restaurar** os traz de volta.

**Janela de novo projeto.** Tem quatro campos:

- **Nome**: obrigatório. Só você o vê. Aparece nos títulos dos relatórios e no seletor de projetos. Não vai para o Google.
- **Domínio (opcional)**: o endereço do seu site, como `example.com`. O `https://` e o `www.` do início são removidos automaticamente. Os subdomínios se juntam ao domínio principal: `blog.example.com` e `example.com` são o mesmo projeto.
- **País** e **Idioma**: definem para qual mercado as palavras-chave que você salva são acompanhadas. Quando você muda o país, o idioma volta ao idioma desse país. Você pode alterá-los depois.

**Configurações do projeto.** Há duas abas. A aba **Geral** tem o nome, o domínio, o país e o idioma, além da seção **Arquivar projeto**. A aba **Conexões** tem os cartões do Search Console e do Analytics.

## Como usar

1. No seletor de projetos, clique em **Novo projeto**.
2. Digite um nome, informe o endereço do seu site, escolha o país e o idioma e clique em **Criar projeto**. O projeto abre e aparece o Painel. Nenhum dado é buscado ainda.
3. Vá a **Configurações do projeto → Conexões** e conecte o Search Console. Os passos estão no guia para conectar ao Google. Depois de conectado, Panel (Painel), Desempenho da pesquisa, Oportunidades e Status de indexação começam a se preencher.
4. Se você também quiser conectar o Analytics, faça isso no cartão **Analytics** da mesma aba. Você não precisa de outra chave do Google.
5. Para mudar o nome ou o site, corrija o campo na aba **Geral** e clique em **Salvar alterações**. O botão só fica ativo quando algo mudou.

### Alterar a conexão com o Google

No cartão da aba **Conexões**, **Alterar propriedade ou conta** permite escolher outro site (o que o Google chama de "propriedade") ou outra conta Google. **Desconectar** remove apenas a conexão deste projeto. Sua conta Google continua salva, e não é pedida confirmação. Para remover uma conta Google por completo, use **Remover conta** na janela de seleção. A janela informa quais projetos serão afetados.

### Arquivar um projeto

Os projetos não são apagados, são arquivados. O botão **Arquivar projeto** no fim da aba **Geral** tira o projeto da lista. Auditorias, palavras-chave e relatórios continuam como estão. **Restaurar** na página Projeler o traz de volta exatamente como era. Se você tem apenas um projeto, não é possível arquivá-lo.

## Como os números são calculados

Não há números nesta tela. Quando um domínio é salvo, valem estas regras: espaços e letras maiúsculas são limpos, e o endereço precisa ser um domínio real (um endereço IP, `localhost` ou uma extensão inventada não é aceito). Se o texto estiver errado, aparece o aviso "Insira um domínio válido, por exemplo acme.com.".

## Perguntas frequentes

**Posso apagar um projeto por completo?** Não, só é possível arquivá-lo. Os dados dele ficam guardados e você pode restaurá-lo quando quiser.

**Posso conectar dois sites a um projeto?** Não. Um projeto tem uma propriedade do Search Console e uma do Analytics. Abra um segundo projeto para o segundo site.

**Existe um projeto chamado "Default". O que é isso?** Na primeira abertura, o aplicativo cria um projeto vazio para que as telas possam abrir. Você pode renomeá-lo e usá-lo, ou abrir um projeto novo e arquivar esse.

**Escolhi o país errado.** Mude-o na aba Geral. A partir desse momento, as posições das palavras-chave que você salvou passam a ser acompanhadas para o novo país.

## Limites

Não há limite para o número de projetos. Criar um projeto não inicia nada. Os dados só chegam depois que o Google é conectado. Se você não informou um domínio, digite o endereço à mão ao iniciar uma auditoria.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectFacts.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
