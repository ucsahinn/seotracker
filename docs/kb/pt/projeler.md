---
title: Projetos
description: Criar um projeto novo, escolher o site e o país, renomear, gerenciar as conexões com o Google e arquivar e restaurar um projeto.
screen: Projeler, Proje ayarları
route: /projects, /p/{proje}/settings
updated: 2026-10-22
---

Nesta página você cria um projeto, altera as configurações dele e, se precisar, o remove. Cada site é um projeto. Cada projeto tem a sua própria conexão com o Google, as suas próprias auditorias e os seus próprios relatórios.

## O que há na tela

**Proje seçici** (Seletor de projetos). Clique no nome do projeto no canto superior esquerdo e os seus projetos aparecem em uma lista. No fim estão **Yeni proje** (Novo projeto) e **Projeleri yönet** (Gerenciar projetos). O ícone de engrenagem ao lado abre **Proje ayarları** (Configurações do projeto). Quando você tem oito projetos ou mais, uma caixa de busca aparece na lista.

Página **Projeler** (Projetos). Cada linha mostra o nome do projeto e o site dele. Um projeto sem site mostra "Site belirlenmemiş" (Nenhum site definido). O projeto aberto leva o rótulo **Etkin** (Ativo). Clique em uma linha e as configurações desse projeto se abrem. Os projetos arquivados ficam no fim, na seção **Arşivlendi** (Arquivados). **Geri al** (Restaurar) os traz de volta.

**Janela de novo projeto.** Tem quatro campos:

- **Ad** (Nome): obrigatório. Só você o vê. Aparece nos títulos dos relatórios e no seletor de projetos. Não vai para o Google.
- **Alan adı (isteğe bağlı)** (Domínio (opcional)): o endereço do seu site, como `example.com`. O `https://` e o `www.` do início são removidos automaticamente. Os subdomínios se juntam ao domínio principal: `blog.example.com` e `example.com` são o mesmo projeto.
- **Ülke** (País) e **Dil** (Idioma): definem para qual mercado as palavras-chave que você salva são acompanhadas. Quando você muda o país, o idioma volta ao idioma desse país. Você pode alterá-los depois.

**Configurações do projeto.** Há duas abas. A aba **Genel** (Geral) tem o nome, o domínio, o país e o idioma, além da seção **Projeyi arşivle** (Arquivar projeto). A aba **Bağlantılar** (Conexões) tem os cartões do Search Console e do Analytics.

## Como usar

1. No seletor de projetos, clique em **Yeni proje**.
2. Digite um nome, informe o endereço do seu site, escolha o país e o idioma e clique em **Proje oluştur** (Criar projeto). O projeto abre e aparece o Painel. Nenhum dado é buscado ainda.
3. Vá a **Proje ayarları → Bağlantılar** (Configurações do projeto → Conexões) e conecte o Search Console. Os passos estão no guia para conectar ao Google. Depois de conectado, Panel (Painel), Arama performansı (Desempenho de busca), Fırsatlar (Oportunidades) e Dizin durumu (Status de indexação) começam a se preencher.
4. Se você também quiser conectar o Analytics, faça isso no cartão **Analytics** da mesma aba. Você não precisa de outra chave do Google.
5. Para mudar o nome ou o site, corrija o campo na aba **Genel** e clique em **Değişiklikleri kaydet** (Salvar alterações). O botão só fica ativo quando algo mudou.

### Alterar a conexão com o Google

No cartão da aba **Bağlantılar**, **Mülkü veya hesabı değiştir** (Alterar propriedade ou conta) permite escolher outro site (o que o Google chama de "propriedade") ou outra conta Google. **Bağlantıyı kes** (Desconectar) remove apenas a conexão deste projeto. Sua conta Google continua salva, e não é pedida confirmação. Para remover uma conta Google por completo, use **Hesabı kaldır** (Remover conta) na janela de seleção. A janela informa quais projetos serão afetados.

### Arquivar um projeto

Os projetos não são apagados, são arquivados. O botão **Projeyi arşivle** no fim da aba **Genel** tira o projeto da lista. Auditorias, palavras-chave e relatórios continuam como estão. **Geri al** na página Projeler o traz de volta exatamente como era. Se você tem apenas um projeto, não é possível arquivá-lo.

## Como os números são calculados

Não há números nesta tela. Quando um domínio é salvo, valem estas regras: espaços e letras maiúsculas são limpos, e o endereço precisa ser um domínio real (um endereço IP, `localhost` ou uma extensão inventada não é aceito). Se o texto estiver errado, aparece o aviso "Geçerli bir alan adı girin, örneğin acme.com." (Informe um domínio válido, por exemplo acme.com.).

## Perguntas frequentes

**Posso apagar um projeto por completo?** Não, só é possível arquivá-lo. Os dados dele ficam guardados e você pode restaurá-lo quando quiser.

**Posso conectar dois sites a um projeto?** Não. Um projeto tem uma propriedade do Search Console e uma do Analytics. Abra um segundo projeto para o segundo site.

**Existe um projeto chamado "Default". O que é isso?** Na primeira abertura, o aplicativo cria um projeto vazio para que as telas possam abrir. Você pode renomeá-lo e usá-lo, ou abrir um projeto novo e arquivar esse.

**Escolhi o país errado.** Mude-o na aba Geral. A partir desse momento, as posições das palavras-chave que você salvou passam a ser acompanhadas para o novo país.

## Limites

Não há limite para o número de projetos. Criar um projeto não inicia nada. Os dados só chegam depois que o Google é conectado. Se você não informou um domínio, digite o endereço à mão ao iniciar uma auditoria.

<!-- Kaynaklar: src/routes/_app/projects.tsx; src/routes/_app/index.tsx; src/client/features/projects/CreateProjectModal.tsx; src/client/features/projects/ProjectGeneralSettings.tsx; src/client/features/projects/ProjectSwitcher.tsx; src/routes/_project/p/$projectId/settings.tsx; src/routes/_project/p/$projectId/settings/integrations.tsx; src/client/features/integrations/*; src/server/lib/domainUtils.ts; src/server/features/projects/services/projects.ts -->
