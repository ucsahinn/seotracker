---
title: Conectar ao Google
description: Conecte o Search Console e o GA4 com a sua conta de serviço do Google Cloud ou cliente OAuth e escolha as propriedades de cada projeto.
kind: nasil-yapilir
updated: 2026-10-27
---

O seowatcher lê o Search Console e o Google Analytics 4 com a sua própria credencial do Google Cloud: uma conta de serviço ou um cliente OAuth. Você salva a credencial uma vez para toda a instalação e depois escolhe uma propriedade do Search Console e uma do GA4 para cada projeto.

## Credenciais e propriedades

As credenciais Google nas Definições aplicam-se à instalação. A propriedade em Definições do projeto → Ligações aplica-se a um projeto. Guardado e Propriedade selecionada confirmam apenas a configuração. Verifique os dados nos relatórios Desempenho de pesquisa ou Analytics. Analytics mostra fuso horário e moeda junto da propriedade. A seleção não instala rastreio no site.

## Conta de serviço ou OAuth

Ative Search Console API e, para Analytics, Admin API e Data API no Google Cloud. Crie uma conta de serviço e descarregue a chave JSON. Em Definições → Conta de serviço selecione o ficheiro ou use a colagem oculta e guarde. A chave privada permanece invisível. Adicione o endereço mostrado com acesso Total no Search Console e Leitor no Analytics. Escolha depois a propriedade no projeto.

Para OAuth crie um cliente Web application. Registe exatamente os dois endereços de retorno apresentados, guarde ID e segredo e autorize a conta nas ligações do projeto. Uma conta de serviço guardada tem prioridade.

## Recuperação

Uma falha conserva a lista anterior; uma lista vazia não prova falta de permissões. Volte a ligar autorizações expiradas, verifique permissões em acessos negados e o projeto Cloud para APIs inativas. Aguarde perante limites. Para falhas desconhecidas repita e use o diagnóstico da Ajuda. Remover credenciais aqui não as revoga no Google. Alterar domínio mantém ligação e histórico.

O cartão de conexão mostra a data da última leitura do Google já observada para as credenciais e a propriedade atuais. Após uma falha temporária, mantém a data da leitura anterior bem-sucedida. Sem histórico, o acesso permanece não verificado. Abrir as configurações não faz consultas ao Google. Alterar as credenciais não transfere evidências antigas de acesso ou cota para a nova identidade; atualize os relatórios explicitamente.
