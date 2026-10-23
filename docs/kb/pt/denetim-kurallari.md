---
title: Regras de auditoria
description: A lista das 95 regras que a auditoria do site confere. Para cada regra, você encontra o que ela significa e como corrigir.
updated: 2026-10-22
---

A auditoria do site confere cada página e o site como um todo com 95 regras. As regras se dividem em três grupos. **Kritik** (Crítico, 10 regras): o Google não consegue ver ou entender a página, então corrija estas primeiro. **Uyarı** (Aviso, 48 regras): reduzem aos poucos as posições e os cliques. **Bilgi** (Informação, 37 regras): pequenas chances de melhoria. Na pontuação, crítico vale 40, aviso 15 e informação 3. O número de páginas que uma regra afeta também conta para a pontuação.

A tabela traz o nome da regra mostrado na tela, o que ela significa e o primeiro passo para corrigir. O texto completo da correção está no cartão da constatação na tela. A última coluna é o ID da regra, que aparece no arquivo CSV e nas respostas do assistente.

## Termos comuns

- **canonical** (canônico): um modo de dizer ao Google "este é o endereço principal".
- **noindex**: uma etiqueta que oculta uma página da busca.
- **hreflang**: a etiqueta da versão de idioma. Aponta para a mesma página em outros idiomas.
- **meta description** (meta descrição): o resumo em cinza abaixo do título em um resultado de busca.
- **structured data** (dados estruturados, JSON-LD): uma nota oculta que diz ao Google o que a página é (um produto, um artigo e assim por diante). Pode acrescentar extras ao resultado da busca, como estrelas ou uma imagem (resultado enriquecido).
- **robots.txt**: o arquivo que diz ao Google quais páginas ele pode visitar. Uma linha "Disallow" é uma linha que proíbe.
- **sitemap** (mapa do site): a lista das páginas do seu site. **lastmod**: a data em que a página mudou pela última vez.
- **redirect** (redirecionamento): enviar os visitantes de um endereço para outro endereço.
- **user agent** (agente de usuário): o nome que um navegador ou rastreador dá a si mesmo.
- **title** (etiqueta de título): o título mostrado na aba e na busca. **H1**: o título principal da página. **alt text** (texto alternativo): um texto curto que diz o que uma imagem mostra.
- **nofollow**: uma etiqueta que diz "não siga este link". **head**: a parte de cima do código-fonte da página.
- **LCP**: quanto tempo o conteúdo principal da página leva para aparecer. **CLS**: o conteúdo se deslocando enquanto a página carrega. **INP**: quanto tempo a página leva para responder a um clique.
- **Lighthouse**: a ferramenta do Google que mede páginas. **Certificado SSL**: o documento que torna o seu site https (um endereço seguro).

## Crítico

| Regra | O que significa | Como corrigir | ID |
| --- | --- | --- | --- |
| O rastreador foi bloqueado | A proteção contra robôs do seu site barrou o rastreador. O Google também pode estar bloqueado. | No seu firewall, permita o agente de usuário "seotracker-audit". | blocked-page |
| Erro de servidor (5xx) | A página retorna um erro de servidor. O Google remove essas páginas da busca. | Encontre nos registros do servidor o erro deste endereço e corrija-o. | server-error |
| O arquivo robots.txt retorna erro de servidor | Se o Google não conseguir ler o arquivo, ele pode parar de rastrear o site por completo. | Corrija o erro. Confira se o endereço do robots.txt abre normalmente. | robots-txt-server-error |
| O endereço inicial está bloqueado pelo robots.txt | O endereço de onde o rastreamento começa está proibido no robots.txt. | Se ele deve ser rastreado, apague a linha "Disallow" correspondente. | robots-txt-blocks-start-url |
| Página do mapa do site não abre | Uma página que você disse ao Google que existe retorna um erro. | Se a página deve existir, corrija o erro. Se não, remova-a do mapa do site. | sitemap-broken-page |
| Um arquivo de que a página precisa está bloqueado pelo robots.txt | O Google não consegue acessar o arquivo de design ou de código de que precisa para exibir a página. | Apague a regra do robots.txt que cobre esses arquivos. | blocked-resource |
| Arquivo inseguro em uma página segura | Uma página segura (https) carrega um arquivo de um endereço inseguro (http). Os navegadores bloqueiam isso. | Mude o endereço do arquivo para que comece com https. | mixed-content-resource |
| Uma página oculta é indicada como endereço principal | A página indicada como endereço principal está oculta da busca. As duas indicações se anulam. | Remova o noindex da página de destino, ou faça do endereço principal o próprio endereço da página. | canonical-to-noindex |
| O Google trata a página como vazia (soft 404) | O Google trata a página como "não existe" e a mantém fora da busca. | Se a página realmente não existe, retorne o código de erro 404 ou 410. Se existe, acrescente conteúdo real. | google-soft-404 |
| O Google não consegue rastrear a página por causa do robots.txt | Resposta do Google: o robots.txt a bloqueia. | Encontre e apague a linha "Disallow" do robots.txt que cobre este endereço. | google-blocked-by-robots |

## Aviso

| Regra | O que significa | Como corrigir | ID |
| --- | --- | --- | --- |
| Atingiu o limite de solicitações (429) | O site disse ao rastreador "muitas solicitações". | Aumente o limite de solicitações no servidor ou isente o "seotracker-audit" do limite. | rate-limited-page |
| Rastreamento interrompido cedo: limite de solicitações | O rastreamento parou quando a espera passou de 30 minutos. | Reinicie a auditoria quando o limite de solicitações do site for zerado. | crawl-rate-limited |
| Link interno quebrado | Um link do seu site leva a uma página que não abre. | Aponte o link para o endereço certo ou apague-o. | broken-internal-link |
| A página retorna erro ao abrir (4xx) | A página retorna um erro como "não encontrada". | Se a página deve existir, publique-a de novo. Se não, apague os links que levam a ela. | broken-page |
| Cadeia de redirecionamentos | O endereço redireciona várias vezes antes de chegar à página final. | Redirecione o primeiro endereço, e os links para ele, direto para a página final. | redirect-chain |
| Laço de redirecionamento | O endereço redireciona para si mesmo ou em círculo. | Siga as regras de redirecionamento e quebre o laço. | redirect-loop |
| Página para a qual nenhuma página aponta | A página existe só no mapa do site. O Google lhe dá pouco valor. | Coloque um link para ela no menu, em posts relacionados ou em uma página de categoria. | orphan-page |
| Não foi possível acessar o robots.txt | O arquivo não respondeu de forma alguma. | Abra o endereço do robots.txt em um navegador e confira se ele responde. | robots-txt-unreachable |
| O robots.txt passa do limite de 500 KB | O Google não lê o fim do arquivo. | Encurte o arquivo. | robots-txt-truncated |
| Página do mapa do site redireciona | O mapa do site tem um endereço que redireciona para outro endereço. | Coloque no mapa do site o endereço final para o qual ele redireciona. | sitemap-redirect-page |
| Endereço do mapa do site está bloqueado pelo robots.txt | O mapa do site diz "venha", o robots.txt diz "não venha". | Se ele deve aparecer na busca, remova o bloqueio. Se não, apague-o do mapa do site. | sitemap-disallowed-page |
| Arquivo do mapa do site grande demais para ler | O arquivo passa do limite de 10 MB. | Divida o mapa do site em partes. | sitemap-too-large |
| O mapa do site tem mais de 50.000 endereços | O Google aceita no máximo 50.000 endereços em um arquivo. | Divida o arquivo em partes abaixo de 50.000. Una as partes com um arquivo de mapa do site principal. | sitemap-too-many-urls |
| O mapa do site tem uma data lastmod no futuro | A data é posterior a hoje. O Google deixa de confiar nas datas. | Confira o que gera as datas. | sitemap-lastmod-future |
| A página abre por http inseguro | A página não é segura (https). | Peça à sua empresa de hospedagem que ative o certificado SSL gratuito. | not-https |
| Falta a etiqueta de título | A página não tem etiqueta de título (title). | Acrescente um título que descreva o assunto e seja específico da página. De 50 a 60 caracteres é um bom tamanho. | missing-title |
| Falta a meta descrição | Falta o resumo em cinza no resultado da busca. | Escreva uma descrição que resuma a página e leve as pessoas a clicar. | missing-meta-description |
| Imagens sem texto alternativo | Nada diz o que as imagens mostram. | Escreva um texto alternativo curto para cada imagem que tenha significado. | images-missing-alt |
| Mais de uma etiqueta de título na página | Há duas etiquetas de título. O Google escolhe uma ao acaso. | Procure "title" no código-fonte da página e mantenha apenas uma. | multiple-titles |
| Mais de uma meta descrição diferente na página | Há duas descrições. | Procure name="description" no código-fonte da página e mantenha apenas uma. | multiple-meta-descriptions |
| A etiqueta de título é um texto genérico | O título é algo como "Ana sayfa" (Página inicial) ou "Sem título". | Escreva o seu próprio título, que descreva o assunto da página. | placeholder-title |
| Título duplicado | Várias páginas usam o mesmo título. | Dê a cada página o seu próprio título, que descreva o conteúdo dela. | duplicate-title |
| Título principal (H1) duplicado | Várias páginas têm o mesmo título principal. | Escreva um H1 diferente para cada página. | duplicate-h1 |
| Meta descrição duplicada | Várias páginas usam a mesma descrição. | Escreva para cada página a sua própria descrição ou apague a repetida. | duplicate-meta-description |
| Conteúdo de página duplicado | Duas páginas têm o mesmo texto. | Escolha a página principal. Ligue a outra a ela com canonical. | duplicate-content |
| As declarações de endereço principal se contradizem | O HTML e a resposta do servidor indicam endereços principais diferentes. | Escolha um endereço principal e informe-o em um único lugar. | canonical-conflict |
| A página indicada como endereço principal não abre | A página indicada como endereço principal retorna um erro. | Mude o endereço principal para uma página que funcione ou publique de novo o destino. | canonical-to-broken |
| Uma página que redireciona é indicada como endereço principal | O endereço principal é um endereço que redireciona para outra página. | Faça do endereço principal a página final para a qual ele redireciona. | canonical-to-redirect |
| O Google vê uma etiqueta de ocultação (noindex) na página | Resposta do Google: ele viu noindex na página. | Compare o código-fonte da página com o que o Google vê. Um plugin ou um modelo pode estar acrescentando a etiqueta. | google-blocked-by-meta |
| O Google escolheu outro endereço principal | O Google não aceitou o seu endereço principal. | Olhe o endereço que o Google escolheu. Ou faça dele o endereço principal, ou deixe as duas páginas claramente diferentes. | google-chose-different-canonical |
| O código da versão de idioma (hreflang) é inválido | Foi escrito um código que não existe, como "en-UK". | Escreva o código certo. Para o Reino Unido, é "en-GB". | hreflang-invalid-code |
| A página não se lista entre as versões de idioma (hreflang) | A página lista os outros idiomas, mas não a si mesma. | Acrescente à lista o endereço da própria página, com o código do seu idioma. | hreflang-missing-self |
| A página desativa os seus links com uma diretiva de robôs | A página desativou o seguimento dos seus links (nofollow). | Se você quer que os links dela sejam seguidos, apague o texto "nofollow". | nofollow-page |
| Página paginada aponta para a primeira página como endereço principal | A página 2 indica a página 1 como endereço principal. O Google ignora a página 2. | Faça do endereço principal de cada página o seu próprio endereço. | paginated-canonical-to-first-page |
| As versões de idioma não apontam de volta umas para as outras (hreflang) | A página A aponta para B, mas B não aponta para A. | Acrescente à página B uma linha hreflang que aponte para A. | hreflang-no-return-tag |
| A versão de idioma aponta para uma página que não abre ou foi removida do índice | A versão de idioma para a qual aponta retorna um erro ou está oculta da busca. | Olhe o endereço nos detalhes. Corrija-o ou tire-o da lista. | hreflang-target-broken |
| O endereço principal (canonical) aponta para outro domínio ou para http | O endereço principal aponta para outro site ou para um endereço inseguro (http). | A menos que você tenha feito isso de propósito, faça do endereço principal o próprio endereço https da página. | canonical-cross-host-or-http |
| O bloco de dados estruturados está quebrado | O bloco de dados estruturados (JSON-LD) não pode ser lido. | Cole o bloco em um verificador de JSON. Em geral há uma vírgula a mais. | structured-data-invalid-json |
| O Google rastreou, mas não indexou | Resposta do Google: ele não achou o conteúdo bom o bastante. | Na "Ferramenta de inspeção de URL" do Google, confira se há noindex, arquivos bloqueados ou conteúdo que parece vazio. | google-crawled-not-indexed |
| O Google encontrou, mas ainda não rastreou | O Google conhece o endereço e o colocou na fila. | Esperar costuma bastar. Coloque links para ele a partir de páginas rastreadas com frequência. | google-discovered-not-indexed |
| O Google viu conteúdo duplicado e nenhum endereço principal está definido | O Google encontrou uma cópia da página e você não definiu um endereço principal. | Acrescente um canonical que aponte para o endereço principal em cada página do grupo de cópias. | google-duplicate-no-canonical |
| O Google não conhece este endereço de forma alguma | O endereço nunca chegou ao Google. | Acrescente-o ao mapa do site e envie o mapa do site ao Search Console. | google-url-unknown |
| O Google encontrou um erro nos dados estruturados | Falta um campo na marcação escrita para um resultado enriquecido. | Abra o endereço no Teste de resultados avançados do Google. Ele mostra ali o campo que falta. | google-rich-results-invalid |
| A página declara endereços principais que se contradizem | A página tem mais de uma etiqueta canonical. | Decida qual está certa. Desligue o plugin que produz a outra. | multiple-canonical-tags |
| O conteúdo principal da página carrega tarde (LCP) | O maior elemento chega depois de mais de 4 segundos. | Olhe o maior elemento no relatório do PageSpeed. Em geral é uma imagem. Deixe-a menor e converta-a para WebP. | cwv-lcp-poor |
| O conteúdo se desloca enquanto a página carrega (CLS) | A pontuação de deslocamento é maior que 0,25. | Dê largura e altura às imagens e às caixas incorporadas. | cwv-cls-poor |
| A página responde devagar aos cliques (INP) | A resposta a um clique leva mais de 500 milissegundos. | Encontre os trechos de código que mais cansam a página. Adie-os ou remova-os. | cwv-inp-poor |
| A pontuação da auditoria de SEO do Google é baixa | A pontuação de SEO do Lighthouse está abaixo de 90. | Abra a página no PageSpeed Insights. Olhe as verificações reprovadas na seção de SEO. | lighthouse-seo-low |

## Informação

| Regra | O que significa | Como corrigir | ID |
| --- | --- | --- | --- |
| A resposta do servidor é lenta | A primeira resposta do servidor chega tarde. | Olhe o tempo do servidor e do banco de dados. Ligue o cache (guardar cópias prontas). | slow-response |
| Página do mapa do site aponta para outra página como endereço principal | O mapa do site tem um endereço que é uma cópia. | Mantenha só endereços principais no mapa do site. | sitemap-canonicalized-page |
| Página do mapa do site está oculta dos resultados de busca | O mapa do site tem uma página oculta da busca. | Se ela deve aparecer na busca, remova o noindex. Se não, apague-a do mapa do site. | sitemap-noindex-page |
| A página está funda demais na estrutura do site | A página está a muitos cliques da página inicial. | Encurte o caminho com links de categorias, menus ou listas em destaque. | deep-page |
| O mapa do site não tem nenhuma data lastmod | O Google não sabe a data da última alteração. | Na configuração que gera o mapa do site, ative o lastmod para cada endereço. | sitemap-lastmod-missing |
| Link interno leva a um redirecionamento | O link leva a um endereço antigo e redireciona dali. | Troque o link pelo novo endereço para o qual ele redireciona. | internal-link-to-redirect |
| A codificação de caracteres não está declarada | Os caracteres turcos podem quebrar em alguns navegadores. | Acrescente a linha meta charset="utf-8" no início da seção head. | missing-charset |
| O endereço da página é longo demais | O endereço é longo e difícil de ler. | Mantenha o endereço curto e com sentido. | url-too-long |
| O endereço tem letras maiúsculas ou sublinhados | Podem aparecer duas grafias separadas da mesma página. | Escreva os endereços em minúsculas, com hifens. | url-uppercase-or-underscore |
| Falta o título H1 | A página não tem título principal. | Acrescente um único H1 que descreva o assunto. | missing-h1 |
| Mais de um título H1 | Há mais de um título principal. | Mantenha um único H1. Transforme os outros em H2 ou H3. | multiple-h1 |
| A página quase não tem texto | O rastreador não encontrou texto. O texto pode estar carregando depois, com JavaScript. | Confira no código-fonte da página se o texto aparece. | thin-content |
| A página não tem links para nenhum outro lugar | Uma página sem saída: não vai a nenhum outro lugar. | Acrescente links para páginas relacionadas, para a categoria superior ou para a página inicial. | no-outgoing-links |
| O título é longo demais | O Google corta o que passa de 60 caracteres. | Encurte o título para 50 a 60 caracteres. Coloque as palavras importantes primeiro. | title-too-long |
| O título é curto demais | O título não descreve a página. | Escreva um título de 30 a 60 caracteres que diga o que você oferece. | title-too-short |
| A meta descrição é longa demais | O Google corta o que passa de 160 caracteres. | Coloque a mensagem principal primeiro e encurte para 70 a 160 caracteres. | meta-description-too-long |
| A meta descrição é curta demais | A descrição não dá nenhum motivo para clicar. | Escreva de 70 a 160 caracteres que resumam a página. | meta-description-too-short |
| Os níveis de título são pulados | Pula direto de H1 para H3. | Use os títulos em ordem: H1, H2, H3. | heading-order-skip |
| Falta a etiqueta de visualização para celular (viewport) | A página aparece minúscula no celular. | Acrescente a linha viewport na seção head. | missing-viewport |
| O idioma da página não está declarado | Não diz em que idioma a página está (sem lang na etiqueta html). | Para uma página em turco, escreva html lang="tr". | missing-lang |
| As imagens não têm largura e altura | O conteúdo salta enquanto a página carrega. | Escreva o tamanho real da imagem em cada etiqueta img. | images-missing-dimensions |
| Texto longo sem subtítulos | O post longo é um único bloco. | Divida o texto por assunto. Dê a cada seção um título H2. | no-subheadings |
| O texto alternativo da imagem é um nome de arquivo | O texto alternativo é algo como "IMG_1234.jpg". | No texto alternativo, escreva o que há na imagem. | alt-is-filename |
| O texto alternativo da imagem é longo demais | O texto alternativo é do tamanho de um parágrafo. | Descreva a imagem em uma frase. Cerca de 125 caracteres bastam. | alt-too-long |
| O título principal (H1) é longo demais | O H1 é do tamanho de um parágrafo. | Reduza o H1 a um título curto, de uma frase. | h1-too-long |
| Links internos sem texto | O link não tem texto ou só tem um ícone. | Acrescente um texto visível ou um aria-label (um nome oculto para leitores de tela). | empty-anchor-text |
| Textos de link sem sentido, como "clique aqui" | O texto do link não diz para onde ele leva. | Troque o texto do link pelo assunto da página de destino. | generic-anchor-text |
| Links demais na página | A página tem centenas de links. | Limite o menu e o rodapé às páginas mais importantes. | too-many-links |
| Links nofollow para páginas do seu próprio site | Um link para as suas próprias páginas tem nofollow. | Apague rel="nofollow" desses links. | internal-nofollow-links |
| A página não tem etiqueta canonical (endereço principal) | O Google adivinha o endereço principal. | Acrescente na seção head uma linha canonical que aponte para o endereço completo da própria página. | missing-canonical |
| A página está oculta dos resultados de busca (noindex) | A página está oculta da busca, de propósito ou por engano. | Se ela deve aparecer na busca, remova o noindex. | noindex-page |
| A página aponta para outra página como endereço principal | A página se declara uma cópia. | Se ela deve aparecer na busca com o próprio nome, faça do endereço principal o seu próprio endereço. | canonicalized-page |
| As versões de idioma não têm versão padrão (x-default) | Não há versão padrão para os visitantes cujo idioma não corresponde. | Acrescente uma linha x-default à lista hreflang. | hreflang-missing-x-default |
| A resposta do Google sobre algumas páginas está desatualizada | As respostas do Google guardadas têm mais de 3 ou 14 dias. | Na aba **Dizin durumu** (Status de indexação), clique no botão "Google'da durumunu kontrol et" (Verificar o status no Google). | stale-google-verdicts |
| O site não tem etiquetas de compartilhamento em redes sociais (Open Graph) | Nenhuma imagem ou título aparece quando é compartilhado. | Na seção head do modelo, acrescente og:title, og:description e um og:image de 1200x630 pixels. | open-graph-missing-site |
| O site não tem nenhum dado estruturado | Não há chance de um resultado enriquecido aparecer na busca. | Comece por uma marcação que combine com o tipo de página (como Organization, Product ou Article). | structured-data-missing-site |
| O Google não rastreia esta página há muito tempo | A última visita do Google tem mais de 90 dias. | Coloque links para ela a partir de páginas rastreadas com frequência. Confira se a página está no mapa do site. | google-crawl-stale |

## Como as regras funcionam?

A maioria das regras roda por página e lista cada página que afeta. Algumas dizem respeito ao site inteiro e produzem uma única constatação. São as regras do robots.txt, as regras do mapa do site, "O site não tem etiquetas de compartilhamento em redes sociais" e "O site não tem nenhum dado estruturado".

As regras cujo nome começa com "Google" não vêm do rastreamento do aplicativo. Elas são produzidas a partir das respostas obtidas do Google na aba **Dizin durumu** (Status de indexação). Se você nunca fez uma pergunta nessa aba, essas regras nunca rodam. As regras de velocidade (LCP, CLS, INP, pontuação de SEO) rodam apenas quando "Sayfa hızını da ölç" (Medir também a velocidade das páginas) está ligado, e usam a medição de celular.

<!-- Kaynaklar: src/shared/audit-issues/crawl.ts (31 kural); content.ts (26); indexing.ts (34); speed.ts (4); src/shared/auditScore.ts; src/server/lib/audit/google-verdict-checks.ts -->
