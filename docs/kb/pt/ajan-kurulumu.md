---
title: Configuração do agente
description: Como conectar um agente de IA ao seowatcher por MCP, verificar a conexão, proteger o token e usar as skills em auditorias e relatórios.
kind: nasil-yapilir
updated: 2026-10-27
---

Pelo MCP (Model Context Protocol), um agente de IA como Claude Code, Codex ou Cursor se conecta ao aplicativo instalado neste computador. O agente lê os dados do Search Console, do Analytics e das auditorias, inicia auditorias e escreve relatórios. O que o agente lê pode ser enviado ao fornecedor dele.

## Conecte o agente

1. Abra **Configuração do agente** na barra lateral.
2. Em **Conecte seu agente**, escolha **Claude Code**, **Codex** ou **Outro**. As teclas de seta, Home e End mudam a escolha sem copiar nada.
3. Copie as instruções com **Copiar comando de configuração** e cole-as no agente.

As instruções não contêm o token real: o agente usa o segredo salvo localmente. **Nova instalação** é uma opção separada, para uma primeira instalação ou uma verificação do zero.

## Verifique uma nova chamada

Clique em **Verificar conexão** e peça ao agente que chame uma ferramenta do seowatcher. A página lê o registro local a cada cinco segundos, por no máximo 60 segundos. Uma chamada registrada antes não confirma uma configuração nova. Se a aba ficar oculta, ocorrer um erro ou você cancelar, a verificação para.

Se nenhuma chamada nova aparecer, confira o status do MCP no cliente e tente de novo: a falta da chamada não prova um defeito. **Chamada de ferramenta recebida** e o horário da última chamada descrevem um uso passado, não uma sessão sempre aberta. Se o status for desconhecido, use **Ler status novamente**. As ferramentas atuam na instalação inteira, não em um único projeto.

## Proteja o token

Prefira as instruções guiadas. Na configuração manual (**Se quiser conectar manualmente**), use `Authorization: Bearer <token>` apenas no campo secreto local do cliente. Estes comandos do PowerShell copiam o token para a área de transferência sem exibi-lo:

Windows: `(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

Docker: `(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

Cole o token no campo local e depois limpe a área de transferência. Nunca coloque o token em um chat, na saída do terminal, em capturas de tela ou no código. No Windows, **Veri klasörünü aç** (Abrir a pasta de dados), no menu da bandeja, abre a pasta que contém o token.

## Skills e solução de problemas

A aba **Skills** lista os fluxos de trabalho de SEO prontos. As instruções de configuração os instalam; **Copiar comando de atualização** os renova sem alterar as configurações de conexão. No Claude Code, chame com `/seo-audit`; no Codex, com `$seo-audit`.

- **Erro 401**: confira o cabeçalho `Authorization` no campo secreto do cliente.
- **Conexão recusada**: verifique se o aplicativo está aberto e se o endereço está correto.

Depois de corrigir, atualize o status do MCP no cliente e verifique uma nova chamada.
