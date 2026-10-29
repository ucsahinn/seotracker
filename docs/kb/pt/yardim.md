---
title: Ajuda
description: O primeiro lugar a conferir quando algo não funciona: status da instalação, problemas comuns e pacote de diagnóstico para relatar falhas.
screen: Yardım
route: /support
updated: 2026-10-27
---

A tela confere a instalação, mostra o que está faltando e leva à configuração que precisa ser corrigida. Ela verifica apenas a instalação: problemas do site ficam em **Auditoria do site**, e problemas do lado do Google, em **Status de indexação**.

## Idioma da interface

O aplicativo está disponível em seis idiomas: turco, inglês, alemão, francês, italiano e português. O idioma é escolhido em **Configurações → Aparência → Idioma**. Neste guia, botões e telas aparecem com o nome da interface em português. O menu da bandeja do Windows só existe em turco: neste guia, o nome em turco vem seguido da tradução entre parênteses.

## O que a tela contém

**Ações rápidas** reúne os botões do topo:

- **Verificar o status novamente**: atualiza o cartão de status.
- **Baixar pacote de diagnóstico**: baixa o arquivo para anexar a um relato de problema. Ele não contém valores secretos.
- **Abrir guia**: abre este guia no seowatcher.io.
- **seowatcher.io**: abre o site, com a página de download e o guia.
- **Notas de versão**: abre a tela de notas de versão (`/release-notes`).
- **Configuração do agente**: abre a tela para conectar um agente.

**Status do app** verifica acesso, conexão com o Google, chave do PageSpeed, ambiente de execução e banco de dados da instalação. Uma verificação bem-sucedida não garante um site sem erros nem dados do Google atualizados. Configurações que não puderam ser lidas não contam como verificadas. A versão e a hora da verificação identificam o resultado. **Copiar resumo** copia o status como texto; **Abrir conexões** leva às conexões do projeto.

**Projetos** mostra, para cada projeto, o estado da conexão com o Search Console e o Analytics.

**Problemas comuns** tem seis itens expansíveis, cada um com a solução e o link para a configuração:

- A página não abre ou o aplicativo não está em execução
- A porta está em uso
- Meu agente não consegue se conectar (401)
- A medição de velocidade para no meio (429)
- Nenhum dado de consulta, gráficos vazios
- Mudei uma configuração e o app não reconhece

**Mostrar limites** indica a situação dos limites diários do Google.

No fim da página ficam os links para os registros e para o **Endereço de status** (`/api/health`). No pacote do Windows, os registros também abrem com **Günlükleri aç** (Abrir os registros) no menu da bandeja; no Docker, use o comando copiado por **Copiar comando**.

### Aviso sobre a porta

Se outro programa ocupar a porta 3001 (por exemplo, uma cópia antiga do Docker), o pacote do Windows abre em outra porta. Nesse caso, uma faixa amarela aparece no topo de todas as telas: "Desta vez o seowatcher está rodando em 3002 porque outro programa está usando 3001 (por exemplo, uma cópia antiga do Docker). O login do Google está configurado para 3001; feche esse programa e reinicie o seowatcher." A mesma frase aparece no cartão **Status do app**, caso a notificação do Windows tenha passado despercebida.

O login do Google sempre retorna para a porta 3001, então falha se o aplicativo estiver aberto na 3002. Para resolver, feche o programa que ocupa a 3001 e escolha **Yeniden başlat** (Reiniciar) no menu da bandeja: o aplicativo volta para a 3001 e a faixa some. O X à direita da faixa a oculta apenas nesta aba do navegador.

## Passo a passo

1. Abra esta tela e leia o aviso no cartão **Status do app**.
2. Clique no botão ao lado do aviso, que leva à configuração a corrigir. Faça a alteração, volte e clique em **Verificar o status novamente**.
3. Se as verificações da instalação passarem, mas o problema continuar, consulte **Problemas comuns** e a tela do projeto afetado.
4. Se o problema persistir, clique em **Baixar pacote de diagnóstico** e anexe o arquivo ao relato no GitHub. No pacote do Windows, **Sorunu bildir (GitHub)** (Relatar um problema no GitHub), no menu da bandeja, faz o mesmo com um clique.

## Perguntas frequentes

**Por que a linha de login no Google está amarela?** Nenhuma credencial do Google foi salva ainda. A linha fica amarela até o Google ser conectado; siga o guia [Conectar ao Google](/docs/google-baglantisi/).

**A linha de acesso diz "um só usuário, sem senha".** É normal: o aplicativo só abre neste computador. Para torná-lo acessível de fora, é preciso colocar na frente dele um login próprio protegido por senha.

**O que há no pacote de diagnóstico?** Versão, verificações da instalação, contagem de linhas das tabelas e resumos de etapa e erro das últimas 25 auditorias. Os erros do PageSpeed são resumidos sem os URLs das páginas. Segredos e senhas ficam de fora; nomes de projetos, domínios e IDs de propriedades do Google podem aparecer. Revise os arquivos antes de enviá-los.

## Qual tela usar

- O [Painel](/docs/panel/) resume a configuração e os dados do projeto escolhido.
- [Oportunidades](/docs/firsatlar/) ajuda a escolher o trabalho a partir dos dados do Search Console.
- [Acompanhamento de posições](/docs/siralama-takibi/) acompanha a posição média das consultas no arquivo local de dados do Google, não resultados de busca ao vivo.

Se faltarem dados, confira as conexões do projeto, o período escolhido e os avisos de cobertura: o status da instalação não valida esses relatórios. Em sites com pouco tráfego, o Google oculta algumas consultas, então a lista pode ficar vazia ou mostrar menos cliques que os totais por página. Isso, sozinho, não indica falha na conexão.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/QuickActions.tsx; src/client/features/support/SetupStatusPanel.tsx; src/client/features/support/checkCopy.ts; src/client/features/support/CommonProblems.tsx; src/client/features/quotas/SystemLimitsSection.tsx; src/server/lib/setup-status.ts -->
