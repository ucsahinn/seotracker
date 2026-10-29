---
title: Chave do PageSpeed
description: Como salvar a chave da API do PageSpeed Insights, entender o teste da chave e acompanhar cotas e contadores da auditoria do site.
kind: nasil-yapilir
updated: 2026-10-27
---

Com uma chave da API do PageSpeed Insights, a auditoria do site mede a velocidade das páginas pelo serviço do Google. A chave é gratuita e opcional: sem ela, o aplicativo tenta medir no máximo 50 páginas por auditoria, e o Google pode interromper as solicitações antes disso.

## Adicione uma chave

1. No Google Cloud, ative a PageSpeed Insights API.
2. Crie uma chave de API e restrinja-a a essa API.
3. Salve-a em **Configurações → Testes de velocidade**.

A chave é criptografada e nunca é exibida. No Docker, também é possível usar a variável `PAGESPEED_API_KEY`; o valor salvo em **Configurações** tem prioridade.

## O que o teste comprova

**Testar chave** envia uma solicitação real de dispositivo móvel para example.com. Ele não mede o seu site nem aumenta o contador de auditorias. Ao final, aparecem o resultado e a data. O botão fica desativado durante a solicitação e por pelo menos dez segundos após o clique. Ao trocar a chave, o resultado anterior é removido.

Uma chave salva confirma apenas a configuração; um teste bem-sucedido confirma apenas aquela solicitação.

## Cotas e problemas

Uma chave não garante que todas as medições funcionem. A cota real fica no Google Cloud. O contador do PageSpeed em **Configurações** inclui apenas as auditorias iniciadas nas últimas 24 horas; não inclui os testes da chave nem outros programas.

- **Chave inválida**: copie-a de novo.
- **Erro 403 ou acesso restrito**: confira se a API está ativa e revise as restrições da chave.
- **Limite diário ou de frequência**: aguarde e consulte as cotas no Google Cloud.
- **Erro de rede**: tente de novo.
