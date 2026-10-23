---
title: Instalar no Windows
description: Instale no Windows com um único arquivo: primeira abertura, atualização, desinstalação, backup e troca da porta. Sem Docker e sem terminal.
kind: nasil-yapilir
updated: 2026-10-23
---

A interface do aplicativo está em turco. Este guia mostra cada botão e cada nome de tela em turco, com o significado em português entre parênteses.

Ao fim desta página, o aplicativo estará instalado no seu computador e aberto no navegador. A instalação leva dois minutos. Ela é feita só para a sua conta de usuário e não exige direitos de administrador (a permissão é pedida uma única vez, se faltar o componente Visual C++).

## O que você precisa

- Windows 10 ou 11 (64 bits).
- Cerca de 350 MB de espaço livre. O instalador tem 81 MB e o aplicativo instalado ocupa 290 MB.
- Um navegador, como Edge, Chrome ou Firefox.
- Você não precisa de Docker, Node, terminal (janela de comandos) nem direitos de administrador.
- O motor do aplicativo precisa do pacote Visual C++ da Microsoft. Se o seu computador não o tiver, o instalador o instala para você e pede permissão de administrador uma vez.

## Passos

### Primeira instalação

1. Baixe o arquivo **seowatcher-setup.exe** na página de versões do GitHub. O endereço fixo é: `github.com/ucsahinn/seotracker/releases/latest/download/seowatcher-setup.exe`
2. Dê um duplo clique no arquivo.
3. Se o Windows disser "O Windows protegeu o computador", clique em **Mais informações** e depois em **Executar assim mesmo** (em um Windows em turco: "Daha fazla bilgi", "Yine de çalıştır"). O arquivo ainda não tem assinatura digital, por isso o Windows não reconhece o editor. Esse aviso é normal.
4. Se quiser, compare o hash SHA-256 do arquivo (a impressão digital do arquivo) com o `SHA256SUMS.txt` da página de versões.
5. No assistente de instalação, percorra as páginas nesta ordem:
   1. Página de boas-vindas: clique em **Avançar**.
   2. Página "instalar para": escolha **Somente para mim**. É a instalação por usuário, recomendada, em `%LOCALAPPDATA%\Programs\seowatcher`. "Todos os usuários" instala em `C:\Program Files\seowatcher` e pede permissão de administrador.
   3. Página de opções: **Iniciar o seowatcher quando o Windows iniciar** (em turco: "Windows açılınca seowatcher'ı başlat") e **Criar um atalho na área de trabalho** (em turco: "Masaüstüne kısayol ekle"). A primeira já vem marcada. Desmarque-a se não quiser que o aplicativo inicie em segundo plano. Clique em **Avançar**.
   4. Clique em **Instalar** (em um Windows em turco: **Kur**).
   5. A última página tem a caixa **Iniciar o seowatcher agora**. Deixe-a marcada e clique em **Concluir** (em um Windows em turco: **Bitti**). O aplicativo abre.
6. Aguarde. A primeira abertura leva de 20 a 30 segundos. Procure o ícone do seowatcher na área de notificação (a bandeja do sistema), à direita da barra de tarefas. Se o ícone não aparecer, clique na seta ^ da barra de tarefas. O texto do ícone muda em sequência para "Anahtarlar hazırlanıyor" (Preparando as chaves), "Veritabanı güncelleniyor" (Atualizando o banco de dados) e "Sunucu başlatılıyor" (Iniciando o servidor). Quando estiver pronto, o navegador abre sozinho. Quando o Windows inicia o aplicativo automaticamente, o navegador não abre; aparece um balão "seowatcher hazır" (o seowatcher está pronto).
7. O endereço `http://127.0.0.1:3001` abre sozinho no navegador. O 127.0.0.1 é o seu próprio computador e o 3001 é o número da porta.

O próximo passo é o guia da conexão com o Google.

### Menu da barra de tarefas

Clique com o botão direito no ícone (se ele não estiver visível, clique na seta ^ da barra de tarefas). O menu tem quatro partes. No topo ficam a abertura do aplicativo e a linha de status, depois a atualização e a reinicialização, depois duas configurações e, no fim, os itens de solução de problemas.

- **seowatcher'ı aç** (Abrir o seowatcher): abre o aplicativo no navegador. Um duplo clique no ícone faz o mesmo. Se o aplicativo ainda estiver iniciando, aparece o balão "seowatcher açılıyor" (o seowatcher está iniciando), e o navegador abre sozinho quando ele estiver pronto.
- Linha de status: "Çalışıyor: http://127.0.0.1:3001/" (Em execução: http://127.0.0.1:3001/), "Veritabanı güncelleniyor" (Atualizando o banco de dados) ou um texto de erro. Ela não é clicável. Se o texto for longo, deixe o mouse sobre ele para vê-lo inteiro.
- **Eksik Windows bileşenini kur** (Instalar o componente do Windows que falta): aparece só se o pacote Visual C++ estiver faltando. Ao clicar, ele instala o pacote e reinicia o aplicativo.
- **Güncelle** (Atualizar): fica sempre no menu. Ao clicar, ele consulta o GitHub na hora. Se houver uma versão nova, baixa e instala; senão diz "Güncel" (Atualizado). Durante a consulta o item mostra "Kontrol ediliyor…" (Verificando…) e, durante o download, "Güncelleme indiriliyor: X.Y.Z (%45)" (Baixando a atualização: X.Y.Z (45%)); nessa hora ele não é clicável. Quando uma versão nova já foi encontrada, o item mostra "Güncelle: X.Y.Z sürümü hazır" (Atualizar: a versão X.Y.Z está pronta); os números de versão são exemplos.
- **Yeniden başlat** (Reiniciar): fecha o aplicativo e o abre de novo. Se algo travar, tente isto primeiro.
- **Windows açılınca başlat** (Iniciar com o Windows): se estiver marcado, o aplicativo inicia em segundo plano quando o computador liga. Se um administrador ativou essa configuração numa instalação para todos os usuários do computador, o item aparece marcado e em cinza, e só um administrador pode desmarcá-lo.
- **Güncellemeleri kendiliğinden kur** (Instalar as atualizações automaticamente): se estiver marcado, o aplicativo instala sozinho uma versão nova quando a encontra.
- **Kurulumu onar** (Reparar a instalação): limpa os arquivos temporários, verifica se o pacote está completo e abre o aplicativo de novo. Durante o reparo, o item mostra "Onarılıyor…" (Reparando…).
- **Tanı bilgisini kopyala** (Copiar informações de diagnóstico): copia para a área de transferência a versão do Windows, o processador, a versão do Visual C++, um teste do motor, o módulo com falha do log de eventos do Windows, os arquivos de despejo de falhas e as últimas linhas do registro. As informações ficam prontas em alguns segundos, e então aparece o balão "Kopyalandı" (Copiado). Isso ajuda ao relatar um problema.
- **Sorunu bildir (GitHub)** (Relatar um problema (GitHub)): coloca as mesmas informações na área de transferência e abre no GitHub um relato já preenchido. Acrescente uma frase sobre o que você estava fazendo e envie.
- **Günlükleri aç** (Abrir os registros): abre a pasta de registros. Nela ficam `launcher.log`, `server.log` e `migrate.log`.
- **Veri klasörünü aç** (Abrir a pasta de dados): abre a pasta com o banco de dados e as chaves.
- Número da versão: a versão instalada. Não é clicável.
- **Çıkış** (Sair): fecha o aplicativo por completo. Enquanto ele estiver fechado, a página no navegador não funciona.

Se você iniciar o aplicativo uma segunda vez (pelo menu Iniciar ou pelo atalho da área de trabalho), nenhuma segunda cópia é aberta. O aplicativo que já está aberto abre a página no navegador; se ainda não estiver pronto, ele a abre quando estiver.

Se o servidor fechar sozinho durante o uso, o aplicativo o abre de novo e mostra o balão "seowatcher yeniden başlatılıyor" (o seowatcher está reiniciando). Se ele fechar três vezes em dez minutos, o aplicativo para de reabri-lo e a linha de status mostra "Sunucu 10 dakikada üç kez kapandı" (O servidor fechou três vezes em 10 minutos). Nesse caso, clique em **Kurulumu onar**.

### Atualização

O aplicativo se atualiza sozinho. Dois minutos depois de abrir, e depois uma vez por dia, ele consulta no GitHub a última versão. Se houver uma versão nova, ele a baixa, compara a impressão digital do arquivo (SHA-256) com o valor da página de versões, instala em silêncio e reabre. Nesse meio tempo, o texto do ícone mostra "Güncelleme indiriliyor" (Baixando a atualização) e "Güncelleme kuruluyor" (Instalando a atualização), e uma pequena janela de instalação aparece rapidamente. Quando o aplicativo reabre, aparece o balão "seowatcher X.Y.Z sürümüne güncellendi" (o seowatcher foi atualizado para a versão X.Y.Z); ao clicar nele, abre-se a lista de novidades. A seção **Ayarlar → Hakkında** (Configurações → Sobre) do aplicativo também avisa da versão nova e leva você ao item **Güncelle** do ícone.

- Se você não quiser que ele instale sozinho, desmarque **Güncellemeleri kendiliğinden kur** no menu. Quando sair uma versão nova, você verá um balão uma única vez, e o item do menu passará a mostrar "Güncelle: X.Y.Z sürümü hazır" (Atualizar: a versão X.Y.Z está pronta). Para instalar, clique no balão ou no item.
- Se não houver internet, ou se o GitHub não responder naquele momento, o aplicativo tenta de novo uma hora depois. Nas tentativas automáticas, ele avisa só uma vez por versão.
- Se a impressão digital do arquivo baixado não coincidir, a atualização não é instalada e a versão instalada continua funcionando.
- Uma instalação para todos os usuários do computador precisa de permissão de administrador para atualizar, então o aplicativo não se instala sozinho nesse caso. Quando sair uma versão nova, você verá um balão; ao clicar nele, o Windows pede a permissão de administrador.
- Para atualizar manualmente, baixe o novo instalador no mesmo endereço e execute-o. O assistente fecha o aplicativo em execução, troca os arquivos e o inicia de novo. A caixa **Iniciar o seowatcher quando o Windows iniciar** (em turco: "Windows açılınca seowatcher'ı başlat") do assistente mostra a configuração atual do menu.

Seus dados, sua conexão com o Google e suas configurações continuam como estão. Uma atualização automática não mexe na configuração **Windows açılınca başlat**.

### Implantação em empresas

Para equipes de TI que querem instalar para todos os usuários de um computador, ou instalar em silêncio com uma ferramenta de implantação (Intune, GPO, PDQ):

- **Para todos os usuários**: execute o instalador como administrador e escolha a opção "todos os usuários" no assistente. O aplicativo é instalado em `C:\Program Files\seowatcher` (a instalação por usuário vai para `%LOCALAPPDATA%\Programs\seowatcher`). Os dados de cada usuário continuam na pasta `%LOCALAPPDATA%\seowatcher` dele.
- **Instalação silenciosa**: `seowatcher-setup.exe /VERYSILENT /NORESTART` (um usuário) ou `seowatcher-setup.exe /VERYSILENT /ALLUSERS /NORESTART` (administrador, todos os usuários). Quando a instalação silenciosa termina, o aplicativo abre sozinho.
- **Registro da instalação**: cada instalação grava em `%LOCALAPPDATA%\seowatcher\logs\setup.log`. Com `/LOG="caminho"` você indica outro local.
- **Desinstalação silenciosa**: `unins000.exe /VERYSILENT` (na pasta de instalação: `%LOCALAPPDATA%\Programs\seowatcher` na instalação por usuário, `C:\Program Files\seowatcher` para todos os usuários).
- **Verificação**: antes de publicar cada versão, ela é instalada em um Windows limpo, aberta, testada até o endereço de verificação de saúde responder e desinstalada. Uma versão só é publicada depois de passar nesse teste.

### Reparo

Se algo travar, clique com o botão direito no ícone e em **Kurulumu onar** (Reparar a instalação); se o ícone não estiver visível, clique na seta ^ da barra de tarefas. O aplicativo limpa os arquivos temporários e verifica se o pacote está completo. Depois, ao abrir, ele executa de novo a atualização do banco de dados.

Se um arquivo do pacote tiver sido apagado (por exemplo, colocado em quarentena por um antivírus), o aplicativo baixa do GitHub o instalador da versão instalada, verifica a impressão digital e se reinstala. Seus dados não são tocados. Se não houver internet, ele avisa "Kurulum eksik" (Instalação incompleta) e abre a página de versões. Basta então baixar o instalador e executá-lo.

### Desinstalação

1. No Windows, em **Ayarlar → Uygulamalar → Yüklü uygulamalar** (Configurações → Aplicativos → Aplicativos instalados), encontre **seowatcher**.
2. Clique em **Kaldır** (Desinstalar).

O desinstalador remove o programa, o atalho do menu Iniciar o registro de "iniciar com o Windows" (inclusive se você o ativou pelo menu) e os arquivos de atualização baixados. Ele não mexe na pasta de dados, e a janela de desinstalação também avisa isso. Se você também quiser apagar o banco de dados, a conexão com o Google e os relatórios, apague a pasta de dados por conta própria.

### Onde ficam os dados e como fazer backup?

Tudo fica em uma única pasta: `%LOCALAPPDATA%\seowatcher`. Digite esse texto na barra de endereços do Explorador de Arquivos. O item de menu **Veri klasörünü aç** (Abrir a pasta de dados) também leva até lá. Dentro dela há:

- `data`: o banco de dados (projetos, arquivo do Search Console, auditorias, relatórios).
- `instance-secret`: a chave que criptografa as chaves de acesso do Google. Se ela se perder, você precisa refazer as conexões com o Google do zero.
- `mcp-token`: a senha que o seu assistente de IA usa ao se conectar ao aplicativo.
- `server.env`, `config.json`, `logs`.

Para fazer um backup:

1. Feche o aplicativo com **Çıkış** (Sair).
2. Copie a pasta inteira.

Para restaurar, feche o aplicativo, coloque a pasta de volta no lugar e inicie o aplicativo. Para mudar para outro computador, faça o mesmo. Se você levar também o arquivo `instance-secret`, as conexões com o Google continuam funcionando.

### Trocar o número da porta

O aplicativo usa o número 3001. Se outro programa o estiver usando, o aplicativo escolhe o primeiro número livre de 3002 a 3010, mas só para essa inicialização, e mostra o balão "3001 numarası dolu, 3002 kullanılıyor" (A porta 3001 está em uso, usando a 3002). Ele não grava esse número. Quando a 3001 ficar livre, o aplicativo volta a usar a 3001 na próxima inicialização, porque os endereços de redirecionamento no Google contêm esse número.

Se você quiser um número específico:

1. Feche o aplicativo.
2. Abra o arquivo `config.json`, na pasta de dados, com o Bloco de Notas.
3. Escreva isto nele:

```json
{
  "port": 3005
}
```

4. Salve e inicie o aplicativo. Se o arquivo tiver outras linhas (como `autoUpdate`), não as apague; troque apenas o valor de `port`.

Quando o número muda, atualize também no Google os dois endereços de redirecionamento, com o número novo. Esses endereços são explicados no guia da conexão com o Google.

## Verificação

- Ao passar o mouse sobre o ícone da barra de tarefas (se ele não aparecer, clique na seta ^), deve aparecer "seowatcher X.Y.Z: Çalışıyor: http://127.0.0.1:3001/" (seowatcher 2.3.7: Em execução: http://127.0.0.1:3001/). O número da versão é o da que você instalou.
- No navegador, o endereço `http://127.0.0.1:3001/api/health` deve mostrar um texto que começa com "status":"ok".
- Na tela **Yardım** (Ajuda), o cartão "Kurulumunuzun durumu" (Estado da sua instalação) deve dizer "Her şey yolunda." (Está tudo certo.). Antes de conectar o Google, a linha "Google girişi" (Login do Google) pede atenção. Isso é normal.

## Perguntas frequentes

**Por que ele abre no navegador?** O aplicativo roda no seu computador como um pequeno servidor. O navegador é a tela dele.

**O que acontece quando eu desligo o computador?** O aplicativo também fecha. Se **Windows açılınca başlat** (Iniciar com o Windows) estiver marcado, ele inicia sozinho na próxima vez que o computador ligar.

**Posso abri-lo de outro computador?** Não, e isso é de propósito. O aplicativo escuta apenas o endereço 127.0.0.1. Para abri-lo para a internet, você precisa colocar sua própria autenticação na frente.

**Posso migrar da versão Docker?** Sim, mas os dados não se movem sozinhos. Você cria os projetos de novo e conecta o Google de novo. O arquivo do Search Console é preenchido de novo na primeira abertura.

**Meu antivírus deu um aviso.** Como o arquivo não tem assinatura digital, alguns antivírus avisam. Baixe o arquivo somente da página de versões do GitHub e compare o hash SHA-256.

## Se algo der errado

- **O ícone diz "Hata: 3001 ve sonraki 9 adres numarası (port) dolu" (Erro: a porta 3001 e as 9 seguintes estão em uso).** Outro programa está usando esses números. Escreva outro número no arquivo `config.json`.
- **O ícone diz "Veritabanı güncellemesi başarısız" (A atualização do banco de dados falhou).** Clique em **Günlükleri aç** (Abrir os registros) e veja as últimas linhas de `migrate.log`. Na maioria das vezes o disco está cheio ou a pasta é somente leitura.
- **O ícone diz "Sunucu beklenmedik şekilde kapandı" (O servidor fechou de forma inesperada) ou "Sunucu 10 dakikada üç kez kapandı" (O servidor fechou três vezes em 10 minutos).** As últimas linhas de `server.log` dão o motivo. Tente **Yeniden başlat** (Reiniciar) e, se não resolver, **Kurulumu onar** (Reparar a instalação). Se ainda assim não resolver, clique em **Sorunu bildir (GitHub)** (Relatar um problema (GitHub)).
- **O ícone diz "Veritabanı güncellemesi 15 dakikada bitmedi" (A atualização do banco de dados não terminou em 15 minutos).** Outro programa pode ter bloqueado o arquivo do banco de dados (um programa de backup ou de sincronização). Pare esse programa e clique em **Yeniden başlat**.
- **O navegador não abriu.** Dê um duplo clique no ícone ou digite o endereço à mão: `http://127.0.0.1:3001`

<!-- Kaynaklar: packaging/windows/README.md; packaging/windows/launcher/SeoWatcher.cs (menü, port seçimi, dosyalar); packaging/windows/seowatcher.iss (kurulum yeri, görevler, kaldırma); .github/workflows/release-windows.yml (SHA256SUMS) -->
