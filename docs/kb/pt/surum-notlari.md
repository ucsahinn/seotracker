---
title: Notas da versão
description: O que mudou no seowatcher 2.4.1. Instalação com um único arquivo no Windows, um aplicativo que se atualiza sozinho, telas mais simples e um site em seis idiomas.
updated: 2026-10-23
---

A versão mais recente é a **2.4.1**, de 23 de outubro de 2026. Seus dados são mantidos na atualização; o pacote do Windows instala as novas versões sozinho.

## Destaques

- **Abre em qualquer computador.** O componente do Windows que faltava vem junto com o instalador, então o aplicativo abre de primeira mesmo em um computador recém-formatado.
- **Atualiza-se sozinho.** Baixa a nova versão, verifica e instala em segundo plano. **Güncelle** (Atualizar) no menu da barra de tarefas está sempre a um clique.
- **Telas mais simples.** Cada tela vazia mostra um único próximo passo; menus e textos têm leitura natural.
- **Um novo visual.** Fundo preto, destaque laranja e o logo de olho; o aplicativo e o site agora têm a mesma aparência.

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

O histórico completo está no [CHANGELOG.md](https://github.com/ucsahinn/seotracker/blob/seotracker-fork/CHANGELOG.md) no GitHub.
