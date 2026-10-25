---
title: Solução de problemas
description: Problemas mais comuns, com sintoma, causa e solução: porta em uso, aviso do Windows, erros do Google, cota, auditoria travada, gráficos vazios, erro 401.
kind: sorun-giderme
updated: 2026-10-23
---

A interface do aplicativo está disponível em turco e inglês. O idioma é escolhido em Ayarlar → Görünüm → Dil. Este guia mostra cada botão e cada nome de tela em turco, com o significado em português entre parênteses.

Esta página diz, em poucas palavras, o que fazer quando algo não funciona. Primeiro, olhe o cartão "Kurulumunuzun durumu" (Estado da sua instalação) na tela **Yardım** (Ajuda) do aplicativo. O cartão confere quatro coisas: login e acesso, login do Google, a chave do PageSpeed e o banco de dados. Se ele disser "N şey dikkat istiyor" (N coisas pedem atenção), o botão ao lado leva à configuração certa. A lista abaixo vai do problema mais comum ao mais raro.

## A página não abre

**Sintoma:** O navegador diz "conexão recusada".

**Causa:** O aplicativo não está em execução.

**Solução:** No Windows, procure o ícone na barra de tarefas. Se o ícone não aparecer, clique na seta ^ da barra de tarefas. Se ele não estiver lá, abra o seowatcher pelo menu Iniciar. Se o ícone disser "Hata" (Erro), clique nele com o botão direito e escolha **Yeniden başlat** (Reiniciar). No Docker, execute `docker compose ps`. Se o estado não for healthy, execute `docker compose up -d`.

## O número da porta está em uso

**Sintoma:** No Windows, o ícone diz "3001 ve sonraki 9 adres numarası (port) dolu" (a porta 3001 e as 9 seguintes estão em uso). No Docker, você vê "Bind for 127.0.0.1:3001 failed".

**Causa:** Outro programa está usando o mesmo número de porta.

**Solução:** O pacote Windows normalmente escolhe um número livre entre 3002 e 3010, avisa com um balão e o usa só nessa inicialização. Quando a 3001 ficar livre, escolha **Yeniden başlat** e o aplicativo volta à 3001. Se todos estiverem em uso, escreva outro número no arquivo `config.json` da pasta de dados. No Docker, crie um arquivo `.env` com a linha `PORT=3002` e execute `docker compose up -d --force-recreate seotracker`. Quando o número muda, atualize também os endereços de redirecionamento do Google.

## O ícone diz "Windows bileşeni eksik"

**Sintoma:** O aplicativo não abre. O ícone diz "Windows bileşeni eksik" (Falta um componente do Windows), ou o registro mostra "Workers runtime failed to start" e "0xc0000005".

**Causa:** O motor do aplicativo precisa do pacote Visual C++ da Microsoft (2015-2022, 64 bits). Em um Windows recém-instalado, esse pacote está ausente ou desatualizado.

**Solução:** Clique no balão que aparece, ou clique com o botão direito no ícone (se o ícone não aparecer, clique na seta ^ da barra de tarefas) e escolha **Eksik Windows bileşenini kur** (Instalar o componente do Windows que falta). O Windows pede permissão de administrador uma vez. Quando a instalação termina, o aplicativo reinicia sozinho. Se você não tiver o pacote, baixe-o da página da Microsoft: `https://aka.ms/vs/17/release/vc_redist.x64.exe`

## A permissão de administrador foi recusada

**Sintoma:** O instalador pediu permissão para instalar o Visual C++, você clicou em Não. O instalador avisou "Microsoft Visual C++ çalışma zamanı kurulamadı" (Não foi possível instalar o runtime do Microsoft Visual C++).

**Causa:** O componente Visual C++ não foi instalado. Como o aplicativo traz uma cópia dos arquivos de que precisa, ele inicia mesmo assim na maioria dos computadores.

**Solução:** Se o aplicativo iniciou, você não precisa fazer nada. Se não, no menu da bandeja, escolha **Eksik Windows bileşenini kur** (Instalar o componente do Windows que falta) e permita desta vez. Se o ícone não aparecer, clique na seta ^ da barra de tarefas. Ou instale você mesmo o componente em `https://aka.ms/vs/17/release/vc_redist.x64.exe`.

## O ícone diz "Uygulamanın motoru çöktü"

**Sintoma:** O aplicativo não abre. O registro tem "Workers runtime failed to start" e "0xc0000005", mas o pacote Visual C++ está instalado.

**Causa:** O motor do aplicativo (workerd) trava em um arquivo de sistema deste computador. Na inicialização, o aplicativo testa o motor sozinho. Se ele disser que o motor também não inicia sozinho, o problema está no computador. Se disser que funciona sozinho, o problema está na pasta de dados ou na configuração.

**Solução:** Primeiro escolha **Kurulumu onar** (Reparar a instalação). Se isso não ajudar, clique com o botão direito no ícone e escolha **Sorunu bildir (GitHub)** (Relatar um problema no GitHub). As informações de diagnóstico (versão do Windows, processador, nome do módulo com falha, despejo de falha) são adicionadas ao relato automaticamente, e você só o envia. Os despejos de falha ficam na pasta `%LOCALAPPDATA%\seowatcher\logs\dumps`. Você pode anexá-los ao relato, se quiser.

## O Windows diz "protegeu o computador"

**Sintoma:** O arquivo de instalação não abre e aparece uma tela de aviso azul.

**Causa:** O arquivo não tem assinatura digital. O Windows mostra essa tela para editores que não conhece.

**Solução:** Clique no texto **Mais informações** na tela (em um Windows em turco: "Daha fazla bilgi"). O botão **Executar assim mesmo** (em turco: "Yine de çalıştır") aparece. Se estiver preocupado, compare o hash SHA-256 do arquivo (a impressão digital dele) com o `SHA256SUMS.txt` da página de versões.

## O Google diz "redirect_uri_mismatch"

**Sintoma:** Ao escolher **Bağlan** (Conectar), o Google mostra uma página de erro.

**Causa:** O endereço de redirecionamento no Google Cloud Console não é exatamente igual ao do aplicativo.

**Solução:** No aplicativo, vá a **Ayarlar → Google** (Configurações → Google) e copie os dois endereços com os botões de copiar. Cole-os no campo de endereços da chave de acesso do Google (o cliente OAuth) no Cloud Console. localhost no lugar de 127.0.0.1, http no lugar de https ou uma barra no fim fazem diferença.

## "Google erişim anahtarı eksik"

**Sintoma:** Nas configurações do projeto, a aba Bağlantılar (Conexões) mostra um aviso amarelo dizendo "Google erişim anahtarı eksik" (falta a chave de acesso do Google).

**Causa:** O ID do cliente e a chave secreta não foram informados em **Ayarlar → Google**. Ou, no Docker, a chave de criptografia tem menos de 32 caracteres.

**Solução:** Faça os passos 10 e 11 do guia da conexão com o Google. No Docker, se você definiu `BETTER_AUTH_SECRET` à mão, deixe-a mais longa. Se a deixar vazia, o aplicativo cria uma sozinho.

## O Google diz "access_denied"

**Sintoma:** Depois da tela de permissão, aparece um aviso "iptal edildi" (cancelado).

**Causa:** A conta Google com que você entrou não está na lista de usuários de teste da tela de consentimento.

**Solução:** No Cloud Console, adicione a conta em **OAuth izin ekranı → Test kullanıcıları** (Tela de consentimento OAuth → Usuários de teste). Depois escolha **Bağlan** (Conectar) de novo.

## A conexão expirou

**Sintoma:** O cartão da integração diz "Bağlantının süresi doldu" (A conexão expirou) e nenhum dado chega.

**Causa:** Em aplicativos com estado "Teste", o Google pode derrubar a permissão depois de sete dias. A chave de criptografia também pode ter mudado.

**Solução:** No cartão, escolha **Yeniden bağlan** (Reconectar). Se continuar acontecendo, passe a tela de consentimento para produção ou troque para uma conta de serviço (**Ayarlar → Hizmet hesabı**, Configurações → Conta de serviço).

## Não há dados de consultas e os gráficos estão vazios

**Sintoma:** Os cartões do Panel (Painel) estão em zero. Arama performansı (Desempenho de busca) diz "Bu dönem için henüz veri yok" (Ainda não há dados para este período).

**Causa:** Há três possibilidades. O site é novo e o Google ainda não informa impressões. Ou o Search Console está três dias atrasado e o período escolhido é curto demais. Ou a propriedade errada está selecionada.

**Solução:** Defina o período como **Son 3 ay** (Últimos 3 meses). Nas configurações do projeto, confira se a propriedade é o site certo. Uma propriedade de domínio abrange todos os subdomínios, mas uma propriedade de prefixo de URL não. Em um site novo, as linhas de consultas podem levar semanas para chegar. A tabela de páginas se preenche antes.

## O total da tabela não bate com o cartão

**Sintoma:** Ao somar as impressões da tabela de páginas, o resultado é maior que o número do cartão.

**Causa:** Isso não é um defeito. O Google conta separadamente cada página que aparece na mesma busca. O cartão é o total do site.

**Solução:** Leia o total no cartão. Leia a tabela página por página.

## Uma auditoria está parada em "Sürüyor"

**Sintoma:** Não há progresso há meia hora.

**Causa:** O aplicativo pode ter reiniciado, ou a tarefa pode ter caído.

**Solução:** Espere. O aplicativo confere toda auditoria que parece "sürüyor" (em andamento) há mais de 15 minutos. Se não houver sinais de vida, ele encerra a auditoria como "Başarısız" (Falhou) e escreve o motivo. Depois escolha **Aynı ayarlarla yeniden başlat** (Reiniciar com as mesmas configurações). Não inicie duas auditorias com medição de velocidade ao mesmo tempo. Elas se atrasam mutuamente.

## A auditoria diz "Engellendik"

**Sintoma:** Aparece um aviso amarelo: "Denetim bu siteyi tamamen tarayamadı." (A auditoria não conseguiu rastrear este site por completo.) ou "N sayfada engellendik." (Fomos bloqueados em N páginas.)

**Causa:** A proteção contra robôs do site (Cloudflare ou um firewall) barrou o rastreador de sites do aplicativo.

**Solução:** No firewall, permita o agente de usuário chamado `seotracker-audit`, ou adicione o endereço de rede (IP) do seu computador à lista de permissões. Se o site não for seu, não há nada que você possa fazer. Os resultados ficam limitados às páginas que puderam ser rastreadas.

## A medição de velocidade está incompleta ou ausente

**Sintoma:** A aba Hız (Velocidade) está vazia ou tem muito poucas linhas. O cartão de cota diz "Kota doldu" (Cota esgotada), "Dakikalık sınır" (Limite por minuto) ou "Anahtar yok" (Sem chave).

**Causa:** Não há uma chave do PageSpeed (no máximo 50 páginas são medidas). Ou a cota diária do Google acabou.

**Solução:** Obtenha uma chave gratuita seguindo o guia da chave do PageSpeed. Se a cota diária acabou, a medição se completa em uma nova auditoria amanhã. Se a medição de velocidade estava desligada quando a auditoria começou, ela não é feita depois para essa auditoria.

## A URL Inspection diz "limite diário atingido"

**Sintoma:** Na aba Dizin durumu (Status de indexação), o botão não funciona. Ele diz "Google'ın günlük 2.000 adres sınırına ulaşıldı" (O limite diário de 2.000 endereços do Google foi atingido).

**Causa:** Há uma cota de 2.000 perguntas por dia por propriedade. O aplicativo, o seu assistente e as verificações que você faz à mão no Search Console usam o mesmo conjunto.

**Solução:** Continue amanhã. O aplicativo só pergunta de novo as respostas que ficaram velhas, então a sua cota não é desperdiçada.

## O tráfego de localhost aparece no Analytics

**Sintoma:** Na tabela de páginas de entrada, a coluna Alan adı (Domínio) mostra localhost ou 127.0.0.1.

**Causa:** Uma cópia de teste do seu site carrega a mesma tag do Analytics.

**Solução:** Configure a tag para carregar apenas no domínio real. A maioria das ferramentas tem uma opção de "verificação de domínio". O aplicativo não filtra essas linhas sozinho. Até lá, leia a tabela com a coluna Alan adı (Domínio) à vista.

## O assistente não consegue se conectar (401)

**Sintoma:** O Claude Code ou o Codex diz "Unauthorized".

**Causa:** A senha não está sendo enviada, ou está errada.

**Solução:** Copie a senha de novo. No Windows, ela está no arquivo `mcp-token` da pasta de dados. No Docker, execute `docker compose exec -T seotracker cat /app/.wrangler/mcp-token`. Apague o caractere de quebra de linha no fim do valor. Sem terminal: abra o arquivo no Bloco de Notas, selecione a linha inteira e copie; não inclua a quebra de linha. No Claude Code, digite `/mcp` e escolha **Reconnect**.

## O Docker demora muito na primeira inicialização ou fica "unhealthy"

**Sintoma:** `docker compose ps` ainda não diz healthy depois de cinco minutos.

**Causa:** Na primeira inicialização, o aplicativo é construído dentro do contêiner e precisa de cerca de 2 GB de memória. Se a memória não bastar, a construção falha.

**Solução:** Execute `docker compose logs --tail 50` e olhe as últimas linhas. Se houver um erro de memória, dê mais memória aos contêineres nas configurações do Docker Desktop. Depois execute `docker compose up -d --build`.

## Onde estão os meus dados e os registros?

No Windows, tudo fica na pasta `%LOCALAPPDATA%\seowatcher`: `data` (o banco de dados), `logs\launcher.log`, `logs\server.log`, `logs\migrate.log`, `instance-secret`, `mcp-token`, `config.json`. Quando um arquivo de registro cresce demais (`server.log` 5 MB, os outros 1 MB), o antigo fica ao lado com um nome como `server.old.log` e um novo começa do zero. A pasta `logs\wrangler` guarda os registros detalhados do motor; arquivos com mais de 30 dias são apagados automaticamente. **Günlükleri aç** (Abrir os registros) e **Veri klasörünü aç** (Abrir a pasta de dados), no menu da barra de tarefas, levam você até lá.

No Docker, os dados estão no volume `seotracker_data` (`/app/.wrangler`). Você vê os registros com o comando `docker compose logs -f`.

Ao relatar um problema, clique em **Tanılama paketi indir** (Baixar o pacote de diagnóstico) na tela **Yardım**. O pacote resume as etapas e os erros das últimas 25 auditorias; os URLs das páginas são removidos das mensagens do PageSpeed. Nomes de projetos e domínios podem aparecer. Revise o arquivo antes de anexá-lo a um relato no GitHub.

## Mensagens do iniciador

Estas mensagens aparecem no ícone do Windows ou em uma caixa de diálogo. O iniciador do Windows é o pequeno programa que inicia o aplicativo.

- **"Sunucu 120 saniyede yanıt vermedi"** (O servidor não respondeu em 120 segundos): escolha **Yeniden başlat** (Reiniciar). Se falhar, escolha **Günlükleri aç** (Abrir os registros) e leia o `server.log`.
- **"seowatcher yeniden başlatılıyor"** (o seowatcher está reiniciando): o servidor fechou sozinho e o aplicativo o está reabrindo. Atualize a página aberta depois de alguns segundos.
- **"Sunucu 10 dakikada üç kez kapandı"** (O servidor fechou três vezes em 10 minutos): o aplicativo parou de reabri-lo. Escolha **Kurulumu onar** e, se não resolver, **Sorunu bildir (GitHub)**.
- **"Kurulum eksik"** (Instalação incompleta): **Kurulumu onar** devolve os arquivos que faltam baixando o instalador. Se não houver internet, a página de versões abre; baixe o instalador e execute-o.
- **"3001 numarası dolu, 3002 kullanılıyor"** (A porta 3001 está em uso, usando a 3002): outro programa está usando a 3001. Se você receber um erro ao conectar ao Google, feche esse programa e escolha **Yeniden başlat**.
- **"Güncelleme denetlenemedi"** (Não foi possível verificar a atualização) ou **"Güncelleme yapılamadı"** (A atualização falhou): o balão diz o motivo. Se disser "GitHub'a ulaşılamadı" (não foi possível acessar o GitHub), confira a sua conexão com a internet. Se disser "GitHub şu an çok fazla istek alıyor" (o GitHub está recebendo requisições demais agora), tente de novo em uma hora. Se a impressão digital não coincidir, baixe o instalador na página de versões. Em qualquer caso, a versão instalada continua funcionando.
- **"Güncelleme kurulmadı"** (A atualização não foi instalada): a janela de instalação foi fechada ou a permissão de administrador não foi dada. Tente de novo em **Güncelle** no menu.
- **"Windows bileşeni kurulamadı"** (Não foi possível instalar o componente do Windows): escolha **Eksik Windows bileşenini kur** (Instalar o componente do Windows que falta) no menu.

<!-- Kaynaklar: src/routes/_app/support.tsx; src/client/features/support/CommonProblems.tsx; SetupStatusPanel.tsx; DiagnosticsBundleButton.tsx; src/client/features/integrations/googleAuthErrorCopy.ts; src/server/features/audit/services/auditReconciler.ts; src/server/features/gsc/indexCoverage.ts; src/server/features/ga4/services/Ga4ReportEnhancements.ts; packaging/windows/launcher/SeoWatcher.cs; docs/SELF_HOSTING_DOCKER.md; README.md -->
