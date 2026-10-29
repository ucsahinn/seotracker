---
title: Configurações
description: O que vale para o navegador, para a instalação ou para o projeto: idioma, credenciais do Google, chave do PageSpeed, limites e atualizações.
screen: Ayarlar
route: /settings
updated: 2026-10-27
---

Nome, domínio e propriedades do Google de um projeto não ficam aqui: ficam em **Configurações do projeto**.

## A que cada configuração se aplica

| Configuração                                                             | Escopo                                     |
| ------------------------------------------------------------------------ | ------------------------------------------ |
| **Aparência**, **Idioma**                                                | este navegador                             |
| **Google**, **Conta de serviço**, **Testes de velocidade**, atualizações | a instalação inteira                       |
| **Limites do Google e do sistema**                                       | um projeto por vez                         |
| nome, domínio, país, idioma do mercado, propriedades do Google           | o projeto, em **Configurações do projeto** |

Escolha o idioma na lista e confirme com **Aplicar idioma**: navegar com as teclas de seta não recarrega a página. O idioma do mercado do projeto é uma configuração separada.

## Credenciais do Google

As credenciais valem para todos os projetos; se houver uma conta de serviço e um cliente OAuth salvos, a conta de serviço prevalece. Selecione o arquivo JSON da conta de serviço ou use o campo de colagem oculto e salve. A chave privada nunca é exibida. Credenciais salvas e propriedade selecionada não comprovam acesso aos dados. Se uma leitura falhar, a última configuração continua visível com o botão para tentar de novo. O passo a passo completo está em [Conectar ao Google](/docs/google-baglantisi/).

Em **Configurações do projeto**, alterar o domínio mantém a conexão com o Google e o histórico. País e idioma do projeto são os valores padrão de **Palavras-chave salvas**; **Desempenho da pesquisa** tem um filtro de país próprio.

## Windows, velocidade e limites

As preferências do **Windows** são lidas do aplicativo na bandeja do sistema. No Docker, a seção é apenas informativa, sem botões de ativação. Se o inicializador não responder, o estado é desconhecido, não desligado: tente de novo. Se um administrador bloqueou uma configuração, a tela explica o motivo.

Em **Testes de velocidade**, você salva a chave do PageSpeed. Sem chave, o aplicativo tenta no máximo 50 páginas por auditoria. Os detalhes estão em [Chave do PageSpeed](/docs/pagespeed-anahtari/).

Em **Limites do Google e do sistema**, os contadores valem para um projeto por vez: escolha-o primeiro em **Projeto cujos limites são exibidos**.

- **Inspeção de URL**: tentativas locais na propriedade nas últimas 24 horas.
- **PageSpeed**: auditorias iniciadas nas últimas 24 horas.
- **GA4**: cota restante da última resposta do Google; o teto das propriedades padrão é uma suposição.
- **Páginas**: vêm da última auditoria concluída do domínio do projeto.
- **Relatórios e modelos**: o projeto inteiro.

Um dado antigo ou ausente aparece como desconhecido.

## Atualizações

A verificação de versão no aplicativo consulta o GitHub no máximo a cada seis horas. O aplicativo do Windows pode verificar diariamente por conta própria; a instalação automática é definida nas preferências do Windows. A data da última verificação bem-sucedida mostra quão recente é a informação de versão. Em caso de limite ou restrição, aguarde e tente de novo; se a fonte estiver ausente, use o diagnóstico em **Ajuda**. Uma configuração ilegível não pode ser alterada.

## Notificações do Windows

Clique com o botão direito no ícone do seowatcher na bandeja do sistema e use **Windows bildirimleri** (Notificações do Windows), ativada por padrão. Enquanto o inicializador estiver em execução, auditorias concluídas ou com falha de todos os projetos e novos anúncios aparecem como notificações do Windows em cerca de 90 segundos, mesmo com o navegador fechado ou em segundo plano.

- Um clique na notificação abre a página correspondente; vários eventos são reunidos em um único resumo.
- Na primeira execução, eventos antigos são ignorados; reiniciar não repete os já exibidos.
- Eventos recebidos com as notificações desativadas não aparecem depois.
- As notificações de novas versões seguem a configuração de atualização.
- O modo Não incomodar do Windows pode ocultá-las.

Com o inicializador fechado, nenhuma notificação aparece. O recurso não existe no Docker.
