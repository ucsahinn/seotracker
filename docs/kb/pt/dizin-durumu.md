---
title: Status de indexação
description: A resposta do Google para cada página: se está indexada, por que não está e quando foi visitada pela última vez. Até 2.000 consultas por dia.
screen: Site denetimi, Dizin durumu sekmesi
route: /p/<proje>/audit?auditId=<denetim>&tab=index
updated: 2026-10-22
---

Esta página mostra como descobrir quais das suas páginas o Google colocou na busca.

A auditoria do site informa que uma página pode ser aberta. Ela não consegue dizer se o Google realmente a adicionou ao seu índice (a lista de páginas do Google). A aba **Dizin durumu** (Status de indexação) pergunta isso ao Google e guarda a resposta. As respostas ficam guardadas neste computador. A mesma pergunta não é repetida sem necessidade. Só as respostas que ficaram velhas são perguntadas outra vez. Isso importa porque o Google concede 2.000 perguntas por dia para cada propriedade (o registro do seu site no Search Console). O aplicativo e o seu assistente dividem essa cota.

## O que há na tela

**O anel "Google bu sayfalarla ne yapmış?" (O que o Google fez com estas páginas?).** As páginas rastreadas são divididas em três grupos:

- **Google'da** (No Google): podem aparecer na busca.
- **Dizinde değil** (Fora do índice): o Google olhou, mas não a incluiu.
- **Yanıt bekleyen** (Aguardando resposta): a página ainda não foi consultada, ou o Google não deu resposta.

**Caixas de resumo.** Mostram quantas páginas foram consultadas, quantas estão no índice, quantas não estão e quantas aguardam. A caixa "Google'ın farklı adresi seçtiği sayfalar" (Páginas em que o Google escolheu outro endereço) conta as páginas em que o Google escolheu um endereço diferente do canônico que você declarou (a etiqueta que diz qual é o endereço principal da página). A caixa "Bu denetimde henüz sorulmamış" (Ainda não consultadas nesta auditoria) é o número de páginas que faltam consultar.

**O botão "Google'da durumunu kontrol et" (Verificar o status no Google).** Cada clique consulta no máximo 25 páginas. As páginas que estão há mais tempo sem resposta vêm primeiro. Se o limite diário estiver cheio, aparece o aviso "Google'ın günlük 2.000 adres sınırına ulaşıldı" (O limite diário de 2.000 endereços do Google foi atingido). Se o Search Console não estiver conectado, o botão fica desativado. Ele também fica desativado se o domínio auditado não estiver dentro da propriedade conectada.

**Tabela.** Colunas: **Sayfa** (Página), **Durum** (Status), **Sebep** (Motivo), **Google'ın seçtiği adres** (Endereço escolhido pelo Google), **Google'ın son ziyareti** (Última visita do Google). A célula de status mostra "Google'da", "Kontrol edilmedi" (Não verificada), "Yanıt alınamadı" (Sem resposta), "Hata" (Erro), ou a versão em turco do próprio status do Google. No total, 18 status são traduzidos para o turco. Exemplos:

- "Keşfedildi, henüz taranmadı" (Descoberta, ainda não rastreada)
- "'noindex' etiketiyle dışlandı" (Excluída pela etiqueta 'noindex') (a página fica fora da busca)
- "robots.txt engelliyor" (O robots.txt bloqueia) (robots.txt: o arquivo que diz ao Google em quais páginas ele pode entrar)
- "Yumuşak 404" (404 suave) (a página existe, mas o Google a considera vazia)
- "Google bu adresi bilmiyor" (O Google não conhece este endereço)

Você pode baixar a tabela como CSV.

## Como usar

1. Quando a auditoria terminar, abra a aba. Se o número de "Yanıt bekleyen" for alto, clique em **Google'da durumunu kontrol et**. Cada clique avança 25 páginas. Em um site pequeno, alguns cliques bastam.
2. Olhe primeiro o grupo "Dizinde değil". A coluna **Sebep** é o motivo do Google e muitas vezes diz o que fazer. Se disser "robots.txt engelliyor", remova o bloqueio. Se disser "'noindex' etiketiyle dışlandı", apague a etiqueta. Se disser "Keşfedildi, henüz taranmadı", esperar costuma bastar.
3. Adicione ao mapa do site (sitemap) as páginas importantes que dizem "Google bu adresi bilmiyor". Envie o mapa do site ao Search Console. Para as três ou quatro páginas mais importantes, clique à mão em "Dizine eklenmesini iste" (Solicitar indexação) no Search Console.
4. Se a caixa "Google'ın farklı adresi seçtiği sayfalar" não for zero, olhe a coluna **Google'ın seçtiği adres**. O Google preferiu outro endereço. Corrija o seu endereço principal ou adote o que o Google escolheu.
5. Clique de novo depois de alguns dias. Só as respostas velhas são perguntadas outra vez, então a sua cota não é desperdiçada.

## Como os números são calculados

Se o Google disser "indexada", a página conta como "Google'da". Se disser "não indexada" ou "desconhecida", a página conta como "Dizinde değil". Se não houver resposta, a página é "Yanıt bekleyen".

Uma resposta é considerada velha depois de um tempo definido e é perguntada de novo. Para uma página no índice, esse tempo é de 14 dias. Para uma página fora do índice, ou uma resposta com erro, é de 3 dias. Uma página que nunca foi consultada está sempre pronta para ser consultada. O limite diário é calculado a partir do número de perguntas das últimas 24 horas. O aplicativo conta apenas as suas próprias perguntas. As consultas que você faz à mão no Search Console não entram nesse contador, mas contam para o limite real do Google.

Uma divergência de canônico significa que o endereço que o Google escolheu e o endereço que você declarou são diferentes. Uma diferença de barra no fim também conta.

Se o último rastreamento do Google tiver mais de 90 dias, a auditoria relata o problema "Google bu sayfayı uzun süredir taramadı" (O Google não rastreia esta página há muito tempo). As respostas velhas são reunidas em um único problema, "Google'ın bazı sayfalar hakkındaki yanıtı eskimiş" (A resposta do Google sobre algumas páginas está desatualizada).

## Perguntas frequentes

**Por que o botão está desativado?** Pode haver três motivos. O Search Console não está conectado. Não restam páginas a consultar. Ou o domínio que você auditou não está dentro da propriedade conectada. Isso acontece se você auditou outro site.

**De quem é o limite de 2.000?** Da propriedade. Dois projetos conectados à mesma propriedade e o seu assistente gastam do mesmo conjunto.

**O que devo fazer com uma página que diz "Keşfedildi, henüz taranmadı"?** Na maioria das vezes, nada. Em sites novos, o Google pode fazer as páginas esperarem semanas. Colocar um link para a página a partir de páginas do site que são rastreadas com frequência acelera o processo.

**Esta aba avisa o Google sobre páginas novas?** Não, ela apenas pergunta. Para avisar o Google, há o mapa do site e "Dizine eklenmesini iste" no Search Console.

## Limites

As respostas são tão boas quanto o que o Google fornece. O Google pode deixar alguns campos vazios. Não é possível passar de 2.000 perguntas por dia. Consultar por completo um site de 10.000 páginas leva cinco dias. A aba consulta apenas as páginas rastreadas. Endereços que não fizeram parte da auditoria não aparecem na lista.

<!-- Kaynaklar: src/client/features/audit/IndexCoverageView.tsx; CoverageTable.tsx; CoverageVerdictDonut.tsx; coverageBuckets.ts; coverageReasons.ts; export.ts; src/server/features/gsc/indexCoverage.ts; src/server/lib/audit/google-verdict-checks.ts; src/shared/gsc-coverage-states.ts; src/db/gsc-inspection.schema.ts; src/server/features/quotas/QuotaService.ts -->
