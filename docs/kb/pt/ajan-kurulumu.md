---
title: Configurar o agente
description: Conecte um assistente SEO com segurança, verifique uma nova chamada e use as habilidades para auditar o site e escrever relatórios com dados locais.
kind: nasil-yapilir
updated: 2026-10-27
---

## Ligar o agente

Abra a configuração do agente. Escolha Claude Code, Codex ou Outro e copie as instruções. Setas, Home e End alteram a seleção sem copiar. O texto não contém o token real; o agente usa o segredo local. A instalação de raiz é uma opção separada.

## Verificar uma nova chamada

Inicie a verificação e peça uma chamada a uma ferramenta seowatcher. A página consulta o registo local a cada cinco segundos, durante no máximo 60 segundos. Uma chamada antiga não verifica uma nova configuração. Separador oculto, erro ou cancelamento interrompem a consulta. Sem nova chamada, verifique o estado MCP do cliente e tente novamente; isso não prova uma falha.

Ligado e a data da última chamada descrevem uso passado, não uma sessão permanente. Repita uma leitura desconhecida. As ferramentas têm acesso ao âmbito da instalação.

## Proteger o token

Prefira as instruções guiadas. Na configuração manual, use `Authorization: Bearer <token>` apenas no campo secreto local do cliente. O PowerShell copia sem mostrar:

Windows: `(Get-Content "$env:LOCALAPPDATA\seowatcher\mcp-token").Trim() | Set-Clipboard`

Docker: `(docker compose exec -T seotracker cat /app/.wrangler/mcp-token).Trim() | Set-Clipboard`

Cole no campo local e limpe a área de transferência. Não coloque o token no chat, saída do terminal, capturas ou código. O menu Windows permite abrir a pasta de dados.

## Competências e recuperação

O separador Competências lista fluxos SEO. As instruções instalam-nos; o texto de atualização renova-os. Claude Code: /seo-audit; Codex: $seo-audit. Para 401 verifique o cabeçalho local; para ligação recusada confirme aplicação e endereço. Atualize o estado MCP e verifique uma nova chamada.
