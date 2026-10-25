---
title: Notas da versão
description: seowatcher 0.7.1 Alpha — compatibilidade dos avisos e diagnósticos mais claros.
updated: 2026-10-26
---

A versão mais recente é a **0.7.1 Alpha**, de 26 de outubro de 2026. Os dados são mantidos na atualização.

Para passar de 2.x para 0.x.x Alpha, execute o novo instalador manualmente; o atualizador antigo não reconhece o número menor como mais recente.

## 0.7.1 Alpha

- **Avisos:** o texto alternativo em inglês preenche os campos de idioma esperados pela aplicação 0.7.0.
- **Ajuda · Diagnóstico:** as auditorias falhadas indicam a etapa, uma mensagem sem dados sensíveis e os erros PageSpeed mais comuns. Os URLs das páginas são removidos dos resumos exportados.

## 0.7.0 Alpha

- **Arranque do Windows:** ficam visíveis a preparação do servidor e o progresso da transferência de atualizações.
- **Notificações do Windows:** atualizações e avisos aparecem na central de notificações se a opção estiver ativa.
- **Avisos:** os conteúdos são escritos em turco e inglês; os restantes idiomas da interface mostram o texto inglês.

## 0.6.0 Alpha

- Avisos em turco e inglês aparecem na aplicação. Prepare e publique os avisos na página de administração.
- A secção Próximos passos do painel apresenta tarefas e uma pontuação de preparação com base nas ligações Google, numa auditoria recente, no contexto do projeto e na configuração do agente. A pontuação não mede o desempenho de SEO.
- Os relatórios dos agentes analisam a auditoria, Search Console, oportunidades, histórico de posições, palavras-chave guardadas, Analytics, cobertura do índice e sitemaps para sugerir melhorias.
- O logótipo seowatcher no menu da aplicação abre seowatcher.io.

## 0.5.0 Alpha

- Use a interface em turco ou inglês. Os números e as datas seguem o idioma escolhido.
- O centro de notificações reúne auditorias, atualizações, ligações Google e relatórios. Os sons e as notificações do ambiente de trabalho têm definições separadas.
- As notas de versão têm uma entrada própria acima das notificações no menu lateral. As etiquetas coloridas mostram novidades e correções de cada versão.
- Em Ayarlar → Windows, pode ativar ou desativar o arranque com o Windows e a instalação automática de atualizações.
- As auditorias mostram o tempo decorrido e um resumo final. Junto de cada título de página encontra a ligação para o guia correspondente.
- A lista de países no formulário móvel e as explicações em janelas pequenas já não ficam cortadas. Escape fecha primeiro a lista de países e mantém o formulário aberto.
- As verificações simultâneas de indexação respeitam melhor o limite diário. Os resultados bem-sucedidos são guardados mesmo que outra verificação falhe.

## 0.4.3 Alpha — 2026-10-22

## Destaques

- **Abre em qualquer computador.** O componente do Windows que faltava vem junto com o instalador, então o aplicativo abre de primeira mesmo em um computador recém-formatado.
- **Atualiza-se sozinho.** Baixa a nova versão, verifica e instala em segundo plano. **Güncelle** (Atualizar) no menu da barra de tarefas está sempre a um clique.
- **Telas mais simples.** Cada tela vazia mostra um único próximo passo; menus e textos foram reescritos para ficar mais claros.
- **Um novo visual.** Fundo preto, destaque laranja e o logo de olho; o aplicativo e o site agora têm a mesma aparência.
- Na configuração do agente, "Sıfırdan kurulum" (Instalação do zero) agora vem primeiro para quem instala pela primeira vez.
- O item Güncelle mostra a verificação, a porcentagem do download e a instalação.

## Windows

- **Abre em um computador novo.** O instalador traz o runtime do Microsoft Visual C++ e o instala uma vez, com sua permissão, se ele estiver faltando.
- **Atualizar.** Sempre no menu da barra de tarefas. Instala a nova versão se houver uma; se não, mostra "Güncel" (Atualizado).
- **Reparar instalação.** Apaga arquivos temporários, verifica o pacote e abre o aplicativo de novo.
- **Relatar um problema.** Abre um relato já preenchido. Nomes de usuário, nomes de sites e e-mails são mascarados.
- **Instalador com versão.** O nome do arquivo e o assistente de instalação mostram a versão instalada.

## O aplicativo

- **Menu lateral.** Os grupos são "Arama ve site" (Busca e site) e "Ajan" (Assistente); Ajuda e Configurações ficam embaixo.
- **Configurar assistente.** Um único cartão e um único botão de copiar para Claude Code, Codex ou qualquer outro assistente.
- **Configurações.** A conexão com o Google é explicada em três passos; o tema é escuro por padrão.
- **Reconhece as duas instalações.** A ajuda e as instruções do assistente descrevem a barra de tarefas no Windows e os comandos `docker compose` no Docker.

## Site e guia

- **Seis idiomas.** Turco, inglês, alemão, francês, italiano e português, com um menu de bandeiras.
- **Texto claro.** Frases curtas, e cada termo técnico é explicado na primeira vez em que aparece.

## Correções

- O link de download do site apontava para a tag de versão errada.
- No Git Bash, o comando de configuração do Codex não removia a quebra de linha no fim da senha.
- Em um cartão da auditoria do site, os números saíam do quadro.
- Com apenas uma conta de serviço conectada, o painel dizia por engano que faltava a chave de acesso do Google.
- No celular, a auditoria do site e as Oportunidades rolavam para o lado.

O histórico completo está no [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) no GitHub.
