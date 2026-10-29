---
title: Conectar ao Google
description: Como conectar o Search Console e o GA4 com uma conta de serviço do Google Cloud ou um cliente OAuth e escolher as propriedades de cada projeto.
kind: nasil-yapilir
updated: 2026-10-27
---

A credencial é salva uma única vez e vale para toda a instalação. Já a propriedade é escolhida em cada projeto: uma do Search Console e uma do Google Analytics 4.

## Credenciais e propriedades

As credenciais do Google salvas em **Configurações** (seções **Google** e **Conta de serviço**) valem para a instalação inteira. A propriedade escolhida em **Configurações do projeto → Conexões** vale só para aquele projeto. Os estados "salva" e "propriedade selecionada" confirmam a configuração, não o acesso aos dados. Para verificar o acesso, abra **Desempenho da pesquisa** ou **Analytics**. Escolher uma propriedade não instala nenhum código de rastreamento no site.

## Conta de serviço

É o caminho mais rápido.

1. No Google Cloud, ative a Search Console API e, para o Analytics, a Admin API e a Data API.
2. Crie uma conta de serviço e baixe a chave JSON dela.
3. Em **Configurações → Conta de serviço**, selecione o arquivo ou use **Colar conteúdo JSON de forma oculta** e salve. A chave privada nunca é exibida.
4. Adicione o e-mail da conta exibido ao Search Console como usuário com acesso total e ao Analytics com a função Leitor.
5. Escolha a propriedade em cada projeto.

## OAuth como alternativa

No Google Cloud, crie um cliente OAuth do tipo "Aplicativo da Web". Registre exatamente os dois URLs de redirecionamento exibidos em **Configurações**. Salve o **ID do cliente** e o **Segredo do cliente**, autorize a conta do Google em **Conexões** do projeto e escolha a propriedade. Se também houver uma conta de serviço salva, ela tem prioridade sobre o OAuth.

## Se algo não funcionar

Se a atualização da lista falhar, as propriedades anteriores continuam visíveis. Uma lista vazia, sozinha, não prova falta de acesso.

- **Autorização expirada**: conecte a conta de novo.
- **Acesso negado**: confira as permissões da propriedade.
- **API desativada**: ative-a no projeto do Google Cloud.
- **Limite de solicitações**: aguarde e tente de novo.
- **Erro desconhecido**: tente de novo e abra o diagnóstico em **Ajuda**.

Remover uma credencial aqui não a revoga no Google. Alterar o domínio do projeto mantém a propriedade vinculada e o histórico.

## Última leitura

O cartão de conexão mostra a data da última leitura do Google já observada com a credencial e a propriedade atuais. Depois de uma falha temporária, continua a data da última leitura bem-sucedida; sem histórico, o acesso fica como não verificado. O cartão também mostra o fuso horário e a moeda da propriedade do Analytics. Abrir as configurações não envia consultas ao Google. Depois de trocar a credencial, as evidências antigas de acesso e de cota não passam para a nova identidade: atualize os relatórios.
