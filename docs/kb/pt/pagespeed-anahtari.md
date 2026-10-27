---
title: Chave do PageSpeed
description: Guardar uma chave PageSpeed e compreender testes e contadores de auditoria.
kind: nasil-yapilir
updated: 2026-10-27
---

## Adicionar uma chave

Ative PageSpeed Insights API no Google Cloud, crie uma chave e restrinja-a a esta API. Guarde em Definições → Medição de velocidade. A chave é cifrada e nunca mostrada. Docker aceita PAGESPEED_API_KEY; o valor guardado tem prioridade.

## O que o teste prova

O teste envia um pedido móvel real para example.com. Não mede o seu site nem aumenta o contador de auditorias. Apresenta resultado e data. O botão permanece desativado durante o pedido e pelo menos dez segundos após o clique. Alterar a chave remove o resultado antigo.

## Limites e recuperação

Sem chave a aplicação tenta no máximo 50 páginas por auditoria. O Google pode limitar antes; uma chave não garante sucesso. Consulte a quota real no Google Cloud. O contador PageSpeed abrange apenas auditorias iniciadas nas últimas 24 horas, sem testes ou outros programas.

Chave inválida: copie novamente. Para 403 confirme API ativa e restrições. Aguarde perante limites diários ou de frequência e consulte as quotas Cloud. Repita falhas de rede. Guardado indica configuração; um teste bem-sucedido confirma apenas esse pedido.
