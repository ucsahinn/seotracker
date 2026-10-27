/* eslint-disable max-lines -- locale translation data */
import type { Catalog } from "@/shared/i18n";

/** Brazilian Portuguese for audit checks and report screens, Google access, survey and setup help. */
export const ptCatalogContinued: Catalog = {
  "Yanıt gönderilemedi ({status})":
    "Não foi possível enviar sua resposta ({status})",
  "Yanıt gönderilemedi": "Não foi possível enviar sua resposta",
  "Bu kurulumdan daha önce yanıt verildi.": "Esta instalação já respondeu.",
  "Çok hızlı yanıt gönderildi. Biraz sonra yeniden deneyin.":
    "Muitas respostas. Tente novamente em instantes.",
  "Kişisel bilgi paylaşmayın": "Não inclua informações pessoais",
  "Adınız veya hesabınız alınmaz. Aynı tarayıcıda saklanan katılımcı anahtarıyla bir kez yanıt verilebilir; bu, kişi başına tek yanıt garantisi değildir. Yanıtınız yöneticiler tarafından görülebilir. Kişisel bilgi yazmayın.":
    "Não coletamos seu nome nem sua conta. É permitida uma resposta por chave de navegador salva; isso não garante uma resposta por pessoa. Os administradores podem ver sua resposta. Não inclua informações pessoais.",
  Yanıtla: "Enviar resposta",
  "Gönderiliyor…": "Enviando…",
  "Denetim uygulamadaki bir hata yüzünden durdu.":
    "A auditoria parou por causa de um erro no app.",
  "Sorun sitenizde değil. Denetimi yeniden başlatın. Tekrarlarsa Yardım ekranından tanı paketini indirip sorun kaydına ekleyin. Hata kodu: {code}":
    "O problema não é o seu site. Inicie a auditoria novamente. Se acontecer de novo, baixe o pacote de diagnóstico em Ajuda e anexe-o a um relatório de problema. Código do erro: {code}",
  "Sayfadaki canonical adresi": "URL canônico na página",
  "robots etiketleri": "Tags robots",
  "googlebot etiketleri": "Tags googlebot",
  "Sayfa başlığı": "Título da página",
  "Başlıktaki anlamlı kelime": "Palavras significativas no título",
  "Lighthouse denetimi": "Auditoria do Lighthouse",
  "Etkilenen öğe": "Elementos afetados",
  "Karşılanmayan koşul": "Condição não atendida",
  "Tahmini kazanç": "Economia estimada",
  "Üçüncü taraf kodların ana iş parçacığı süresi":
    "Tempo da linha de execução principal do código de terceiros",
  "Toplam indirme boyutu": "Tamanho total do download",
  "Kırık dış bağlantı": "Link externo quebrado",
  Görseller: "Imagens",
  "Gömülü betik ve stil": "Scripts e estilos inline",
  "Sayfaya yönlendirme olmadan ulaşılmıyor":
    "A página não é acessada sem um redirecionamento",
  "Sunucu ilk yanıtı hızlı vermiyor": "A primeira resposta do servidor é lenta",
  "Belge sıkıştırılmadan gönderiliyor": "O documento é enviado sem compactação",
  'Ana görselde loading="lazy" var': 'A imagem principal tem loading="lazy"',
  "Ana görsel sayfanın ilk HTML'inde yok":
    "A imagem principal não está no HTML inicial da página",
  'Ana görselde fetchpriority="high" yok':
    'A imagem principal não tem fetchpriority="high"',
  "{count} güvensiz (http) görsel, video ya da çerçeve": {
    one: "{count} imagem, vídeo ou frame não seguro (http)",
    other: "{count} imagens, vídeos ou frames não seguros (http)",
  },
  "{count} form bilgileri http adresine gönderiyor": {
    one: "{count} formulário envia para um endereço http",
    other: "{count} formulários enviam para um endereço http",
  },
  "{count} e-posta adresi açıkta": {
    one: "{count} endereço de e-mail exposto",
    other: "{count} endereços de e-mail expostos",
  },
  "{count} iç bağlantı http:// ile veriliyor": {
    one: "{count} link interno usa http://",
    other: "{count} links internos usam http://",
  },
  "{count} görsel {limit}'tan büyük": {
    one: "{count} imagem maior que {limit}",
    other: "{count} imagens maiores que {limit}",
  },
  "{value} (iyi: en çok {good}, kötü: {poor} üstü)":
    "{value} (bom: até {good}, ruim: acima de {poor})",
  "{value} (kötü sınırı: {limit})": "{value} (ruim acima de {limit})",
  "saha verisi (gerçek Chrome kullanıcıları)":
    "dados de campo (usuários reais do Chrome)",
  "laboratuvar ölçümü (PageSpeed Insights)":
    "medição de laboratório (PageSpeed Insights)",
  "alan adı bulunamadı": "domínio não encontrado",
  hata: "erro",
  "en az {size}": "pelo menos {size}",
  'Sayfa "{text}" diyor, ama sunucu {status} döndürüyor':
    'A página diz "{text}", mas o servidor retorna {status}',
  "{size} (sınır {limit})": "{size} (limite {limit})",
  "Yazı olarak işaretlenmiş {count} sayfa": {
    one: "{count} página marcada como artigo",
    other: "{count} páginas marcadas como artigos",
  },
  "ve {count} tane daha": { one: "e mais {count}", other: "e mais {count}" },
  "Tahmini kazanç: {value}": "Economia estimada: {value}",
  "{count} adres, bu sitede {onHost}": {
    one: "{count} URL, {onHost} neste site",
    other: "{count} URLs, {onHost} neste site",
  },
  "Lighthouse'un tahmini; en çok kazandıran sayfa için.":
    "Estimativa do Lighthouse, para a página que mais ganha.",
  "Lighthouse bu denetimde bu ölçümleri raporlamadı, ya da denetim bu kontroller eklenmeden önce yapıldı.":
    "O Lighthouse não informou essas medições nesta auditoria, ou a auditoria foi feita antes de essas verificações serem adicionadas.",
  "Dış bağlantı ve görsel boyutu kontrolü bu denetimde açık değildi ya da ölçülemedi.":
    "A verificação de links externos e do tamanho das imagens estava desativada nesta auditoria ou não pôde ser medida.",
  "Bu kontroller denetimden sonra eklendi; yeni bir denetim onları da ölçer.":
    "Essas verificações foram adicionadas depois desta auditoria; uma nova auditoria também as mede.",
  "Orta. Kritik sorun yok; en çok puan getiren uyarılardan başlayın.":
    "Razoável. Nenhum problema crítico; comece pelos avisos que valem mais pontos.",
  "Zayıf. Kritik sorun yok, ama birikmiş uyarılar puanı aşağı çekiyor.":
    "Ruim. Nenhum problema crítico, mas os avisos acumulados estão derrubando a pontuação.",
  "Site haritasında başka bir siteye ait adresler var":
    "O sitemap lista endereços de outro site",
  "Site haritanız bu sitenin değil, başka bir alan adının adreslerini listeliyor. Google bir site haritasındaki adresleri yalnızca haritayla aynı sitedeyse kabul eder; diğer sitenin robots.txt dosyası bu haritayı göstermiyorsa ya da o site Search Console'da sizin adınıza doğrulanmamışsa bu adresleri yok sayar.":
    "Seu sitemap lista endereços de outro domínio, não deste site. O Google só aceita entradas de sitemap que estejam no mesmo site do sitemap; a menos que o robots.txt do outro site aponte para este sitemap ou que esse site esteja verificado para você no Search Console, o Google ignora esses endereços.",
  "Site haritasını, adreslerin ait olduğu sitede yayınlayın ya da haritayı üreten ayarda sitenin adresini düzeltin (çoğu zaman eski bir alan adı ya da önizleme adresi kalmıştır). Bilerek başka siteye ait adresleri listeliyorsanız o sitenin robots.txt dosyasına bu haritayı gösteren bir Sitemap satırı ekleyin.":
    "Publique o sitemap no site ao qual os endereços pertencem ou corrija o endereço do site na configuração que o gera (muitas vezes sobra um domínio antigo ou um endereço de prévia). Se você lista endereços de outro site de propósito, adicione ao robots.txt desse site uma linha Sitemap apontando para este sitemap.",
  "robots.txt bazı yolları yalnızca Googlebot'a açıyor":
    "O robots.txt libera alguns caminhos só para o Googlebot",
  "robots.txt dosyanız bazı yolları tüm botlara (User-agent: *) kapatıyor ama Googlebot'a ayrıca izin veriyor. Bu araç Googlebot değil, o yüzden bu yollardaki sayfaları taramadı; denetimde görünmemeleri sorun olmadıkları anlamına gelmez. Google bu sayfaları tarayabilir.":
    "Seu robots.txt bloqueia alguns caminhos para todos os bots (User-agent: *), mas libera o Googlebot separadamente. Esta ferramenta não é o Googlebot, então não rastreou as páginas nesses caminhos; a ausência delas nesta auditoria não significa que estejam bem. O Google pode rastreá-las.",
  "Bir şey yapmanız gerekmiyor. Bu sayfaları da denetlemek istiyorsanız ayrıntıdaki kuralları gözden geçirin; yalnızca Googlebot'a açık bırakmanın bir nedeni yoksa kuralı tüm botlar için aynı yapın.":
    "Nada precisa mudar. Se quiser que essas páginas também sejam auditadas, revise as regras nos detalhes; se não houver motivo para liberá-las só para o Googlebot, deixe a regra igual para todos os bots.",
  "Sayfanın ilk görünümünü engelleyen dosyalar var":
    "Arquivos estão bloqueando a primeira renderização da página",
  "Tarayıcı bazı CSS ve JavaScript dosyalarını indirip işlemeden sayfada hiçbir şey göstermiyor. Lighthouse, bunlar ertelenirse ilk içeriğin daha erken görüneceğini hesapladı; tahmini kazanç bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O navegador não mostra nada da página até baixar e processar alguns arquivos CSS e JavaScript. O Lighthouse calculou que adiá-los faria o primeiro conteúdo aparecer mais cedo; o ganho estimado está nos detalhes da descoberta. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Sayfanın ilk ekranı için gerekmeyen betiklere defer ya da async ekleyin, ilk ekran için gereken küçük CSS'i sayfaya gömün, kalan CSS'i sonradan yükleyin. WordPress'te bir önbellek eklentisinin \"JavaScript'i ertele\" ve \"kritik CSS\" ayarları bu işi yapar.":
    'Adicione defer ou async aos scripts de que a primeira tela não precisa, coloque inline o pouco CSS que ela precisa e carregue o resto do CSS depois. No WordPress, as opções "adiar JavaScript" e "CSS crítico" de um plugin de cache fazem isso.',
  "Sayfada kullanılmayan JavaScript yükleniyor":
    "A página carrega JavaScript que não usa",
  "Sayfa, açılışta hiç çalışmayan JavaScript kodunu da indiriyor. Telefonda bu hem veri hem işlemci harcar ve sayfayı yavaşlatır. Lighthouse'un tahmin ettiği tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "A página também baixa JavaScript que nunca é executado enquanto ela abre. No celular, isso custa dados e tempo de processador e deixa a página mais lenta. A economia estimada pelo Lighthouse está nos detalhes da descoberta. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Kullanılmayan eklentileri ve etiketleri kaldırın, büyük betik paketlerini sayfaya göre bölün ve yalnızca gereken sayfada yükleyin. Hangi dosyanın ne kadar boşa indiğini PageSpeed Insights raporunda görürsünüz.":
    "Remova plugins e tags que não usa, divida pacotes grandes de scripts por página e carregue-os só onde são necessários. O PageSpeed Insights mostra quanto de cada arquivo é desperdiçado.",
  "Sayfada kullanılmayan CSS yükleniyor": "A página carrega CSS que não usa",
  "Sayfa, bu sayfada hiçbir öğeye uygulanmayan stil kurallarını da indiriyor. Genelde tüm siteye tek bir büyük tema dosyası yüklendiğinde olur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "A página também baixa regras de estilo que não se aplicam a nada nesta página. Isso costuma acontecer quando um único arquivo grande do tema é carregado no site inteiro. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Tema ya da eklentilerin kullanılmayan stil dosyalarını kapatın; bir derleme aracı kullanıyorsanız kullanılmayan CSS'i temizleyen adımı açın.":
    "Desative as folhas de estilo não usadas do tema ou dos plugins; se você usa uma ferramenta de build, ative a etapa que remove o CSS não usado.",
  "JavaScript dosyaları sıkıştırılmamış (küçültülmemiş)":
    "Os arquivos JavaScript não estão minificados",
  "Bazı JavaScript dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Küçültme dosyayı anlamını değiştirmeden küçültür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alguns arquivos JavaScript são servidos com espaços e comentários, sem minificação. Minificar deixa o arquivo menor sem mudar o que ele faz. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Derleme aracınızda küçültmeyi (minify) açın ya da önbellek/CDN ayarlarından JavaScript küçültmeyi etkinleştirin.":
    "Ative a minificação na sua ferramenta de build ou habilite a minificação de JavaScript nas configurações de cache ou CDN.",
  "CSS dosyaları sıkıştırılmamış (küçültülmemiş)":
    "Os arquivos CSS não estão minificados",
  "Bazı CSS dosyaları boşluklar ve açıklamalarla birlikte, küçültülmeden sunuluyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alguns arquivos CSS são servidos com espaços e comentários, sem minificação. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Derleme aracınızda CSS küçültmeyi açın ya da önbellek/CDN ayarlarından CSS küçültmeyi etkinleştirin.":
    "Ative a minificação de CSS na sua ferramenta de build ou habilite-a nas configurações de cache ou CDN.",
  "Görseller gereğinden büyük indiriliyor":
    "As imagens são baixadas maiores do que o necessário",
  "Lighthouse sayfadaki bazı görsellerin daha küçük indirilebileceğini hesapladı: eski bir biçimde (JPEG, PNG) sunuluyorlar, sıkıştırılmamışlar ya da ekranda gösterildiklerinden çok daha büyük boyutta indiriliyorlar. Tahmini tasarruf bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O Lighthouse calculou que algumas imagens da página poderiam ser baixadas menores: elas são servidas em formato antigo (JPEG, PNG), não estão compactadas ou são baixadas muito maiores do que aparecem. A economia estimada está nos detalhes da descoberta. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Görselleri WebP ya da AVIF'e çevirin, sıkıştırın ve ekrandaki boyutlarına göre küçültün; farklı ekranlar için srcset ile birden çok boyut sunun. Çoğu CMS'te bir görsel optimizasyon eklentisi bunu otomatik yapar.":
    "Converta as imagens para WebP ou AVIF, compacte-as e redimensione-as para o tamanho em que aparecem na tela; sirva vários tamanhos com srcset para telas diferentes. Na maioria dos CMSs, um plugin de otimização de imagens faz isso automaticamente.",
  "Dosyalar tarayıcıda yeterince uzun saklanmıyor":
    "Os arquivos não ficam no navegador por tempo suficiente",
  "Görsel, betik ve stil dosyaları kısa bir önbellek süresiyle ya da hiç önbellek bilgisi olmadan sunuluyor. Ziyaretçi siteye dönünce aynı dosyaları yeniden indirir. Lighthouse'un tahmin ettiği tekrar ziyaret tasarrufu bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Arquivos de imagem, script e estilo são servidos com cache curto ou sem nenhuma informação de cache. Quando o visitante volta, baixa os mesmos arquivos de novo. A economia estimada pelo Lighthouse em visitas repetidas está nos detalhes da descoberta. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  'Değişmeyen dosyalara uzun bir Cache-Control süresi verin (örneğin max-age=31536000) ve dosya değiştiğinde adını değiştirin. Barındırma panelinde ya da CDN\'de "tarayıcı önbelleği" ayarı genelde bunu yapar.':
    'Dê aos arquivos que não mudam um Cache-Control longo (por exemplo, max-age=31536000) e mude o nome do arquivo quando o conteúdo mudar. Uma opção de "cache do navegador" no painel da hospedagem ou na CDN costuma fazer isso.',
  "Sayfanın toplam indirme boyutu çok büyük":
    "O tamanho total de download da página é muito grande",
  "Sayfayı açmak için indirilen her şeyin toplamı 2,5 MB'ı geçiyor. Mobil bağlantıda bu uzun bir yükleme ve ziyaretçinin veri paketinden harcama demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Tudo o que é baixado para abrir a página soma mais de 2,5 MB. Em uma conexão móvel, isso significa carregamento longo e consumo do plano de dados do visitante. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "PageSpeed Insights raporunda en büyük dosyalara bakın. Genelde görseller, videolar ve büyük betik paketleridir: görselleri küçültün, videoyu tıklanınca yükleyin, gereksiz betikleri kaldırın.":
    "Veja os maiores arquivos no relatório do PageSpeed Insights. Geralmente são imagens, vídeos e pacotes grandes de scripts: reduza as imagens, carregue vídeos ao clicar e remova scripts desnecessários.",
  "Tarayıcıda oluşan sayfa yapısı çok büyük":
    "A estrutura da página montada no navegador é muito grande",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra oluşan HTML yapısının çok büyük olduğunu buldu. Bu, sayfanın kaynak kodunu sayan kontrolden farklıdır: JavaScript'in sonradan eklediği öğeleri de içerir. Büyük bir yapı stil hesaplamayı ve tıklamalara yanıtı yavaşlatır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O Lighthouse viu que a estrutura HTML que a página monta depois de rodar no navegador é muito grande. Isso é diferente da verificação que conta o código-fonte da página: inclui elementos que o JavaScript adiciona depois. Uma estrutura grande deixa mais lentos o cálculo de estilos e as respostas aos toques. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Görünmeyen içeriği (kapalı menüler, sekmeler, uzun listeler) gerektiğinde oluşturun ve sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.":
    "Monte o conteúdo oculto (menus fechados, abas, listas longas) só quando for necessário e reduza as camadas de contêiner desnecessárias do construtor de páginas.",
  "Sayfa açılmadan önce yönlendirme yapılıyor":
    "A página redireciona antes de abrir",
  "Lighthouse sayfanın ana belgesine ulaşmadan önce bir ya da daha fazla yönlendirmeden geçti. Her yönlendirme, içerik görünmeden önce fazladan bir istek demektir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O Lighthouse passou por um ou mais redirecionamentos antes de chegar ao documento principal da página. Cada redirecionamento é uma solicitação extra antes de qualquer conteúdo aparecer. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Bu sayfaya giden bağlantıları ve site haritasını doğrudan son adrese çevirin; yönlendirme gerekiyorsa tek adımda bitsin.":
    "Aponte links e o sitemap diretamente para o endereço final; se um redirecionamento for necessário, faça-o em uma única etapa.",
  "Sunucu ilk yanıtı geç veriyor (Lighthouse)":
    "O servidor demora a responder (Lighthouse)",
  "Lighthouse'un ölçümünde sunucunun sayfanın ilk baytını göndermesi 600 milisaniyeden uzun sürdü. Sunucu yanıt vermeden tarayıcı hiçbir şey yapamaz; bu süre sayfanın tüm açılışına eklenir. Tarayıcımızın kendi ölçtüğü yanıt süresinden ayrı, Google'ın sunucularından yapılan bir ölçümdür. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Na medição do Lighthouse, o servidor levou mais de 600 milissegundos para enviar o primeiro byte da página. O navegador não pode fazer nada até o servidor responder, então esse tempo se soma a todo o carregamento. É uma medição feita pelos servidores do Google, separada do tempo de resposta que nosso rastreador mediu. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Sayfa önbelleğini (tam sayfa önbellek) açın, yavaş veritabanı sorgularını ve eklentileri bulun, gerekirse daha güçlü bir sunucuya ya da bir CDN'e geçin.":
    "Ative o cache de página (full-page cache), encontre consultas ao banco de dados e plugins lentos e, se necessário, mude para um servidor mais forte ou uma CDN.",
  "Sayfa sıkıştırılmadan gönderiliyor": "A página é enviada sem compactação",
  "Lighthouse, sayfanın HTML belgesinin gzip ya da Brotli ile sıkıştırılmadan gönderildiğini gördü. Sıkıştırma metin dosyalarını genelde üçte bire indirir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O Lighthouse viu que o documento HTML da página é enviado sem compactação gzip ou Brotli. A compactação costuma reduzir arquivos de texto a um terço do tamanho. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Sunucunuzda ya da CDN'de gzip veya Brotli sıkıştırmayı açın. Çoğu barındırma panelinde tek bir ayardır.":
    "Ative a compactação gzip ou Brotli no servidor ou na CDN. Na maioria dos painéis de hospedagem, é uma única opção.",
  "Yazı tipleri yüklenirken metin görünmüyor":
    "O texto fica invisível enquanto as fontes carregam",
  "Özel yazı tipleri yüklenene kadar metin görünmez kalıyor. Lighthouse, metnin yedek yazı tipiyle hemen gösterilmesinin ilk görünümü hızlandıracağını hesapladı. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O texto fica invisível até as fontes personalizadas carregarem. O Lighthouse calculou que mostrar o texto na hora com uma fonte alternativa aceleraria a primeira renderização. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "@font-face kurallarına font-display: swap ekleyin. Google Fonts kullanıyorsanız adresin sonuna &display=swap ekleyin.":
    "Adicione font-display: swap às regras @font-face. Se você usa o Google Fonts, adicione &display=swap ao final do URL.",
  "Sayfanın ana görseli geç yüklenecek şekilde işaretlenmiş":
    "A imagem principal da página está marcada para carregar depois",
  'Sayfanın en büyük öğesi (LCP) olan görselde loading="lazy" var. Tarayıcı bu görseli sayfa yerleşimi bitene kadar istemez, bu yüzden ana içerik geç görünür. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'A imagem que é o maior elemento da página (LCP) tem loading="lazy". O navegador só a solicita depois que o layout termina, então o conteúdo principal aparece tarde. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.',
  'Sayfanın ilk ekranındaki ana görselden loading="lazy" özniteliğini kaldırın. Geç yükleme yalnızca ilk ekranın altındaki görsellere uygulanmalı.':
    'Remova loading="lazy" da imagem principal da primeira tela. O carregamento lento só serve para imagens abaixo da primeira tela.',
  "Sayfanın ana görseli öncelikli istenmiyor":
    "A imagem principal da página não é solicitada com prioridade",
  "Sayfanın en büyük öğesi (LCP) olan görsel ya sayfanın ilk HTML'inde yer almıyor (tarayıcı onu geç keşfediyor) ya da fetchpriority=\"high\" ile öncelikli istenmiyor. Ayrıntıda hangisinin eksik olduğu yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    'A imagem que é o maior elemento da página (LCP) não está no HTML inicial da página (o navegador a descobre tarde) ou não é solicitada com fetchpriority="high". Os detalhes dizem o que falta. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.',
  'Ana görseli sayfanın HTML\'inde doğrudan bir <img> olarak verin (yalnızca JavaScript ya da CSS arka planı ile değil) ve ona fetchpriority="high" ekleyin. Gerekirse <link rel="preload"> ile önceden yükleyin.':
    'Coloque a imagem principal diretamente no HTML da página como <img> (não só via JavaScript ou fundo CSS) e adicione fetchpriority="high". Se necessário, pré-carregue-a com <link rel="preload">.',
  "Dosyalar eski HTTP/1.1 ile sunuluyor":
    "Os arquivos são servidos pelo antigo HTTP/1.1",
  "Sayfanın dosyalarının bir kısmı HTTP/2 ya da HTTP/3 yerine HTTP/1.1 ile geliyor. Eski protokolde tarayıcı aynı anda az sayıda dosya indirebilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alguns arquivos da página chegam por HTTP/1.1 em vez de HTTP/2 ou HTTP/3. Com o protocolo antigo, o navegador só consegue baixar poucos arquivos por vez. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Sunucunuzda ya da CDN'de HTTP/2'yi (tercihen HTTP/3'ü) açın. Çoğu modern barındırma ve CDN bunu varsayılan olarak destekler.":
    "Ative o HTTP/2 (de preferência HTTP/3) no servidor ou na CDN. A maioria das hospedagens e CDNs modernas oferece suporte por padrão.",
  "Eski tarayıcılar için gereksiz JavaScript gönderiliyor":
    "JavaScript desnecessário é enviado para navegadores antigos",
  "Sayfadaki betikler, güncel tarayıcıların zaten bildiği özellikler için eski tarayıcılara yönelik ek kod (polyfill, dönüştürme) içeriyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Os scripts da página incluem código extra para navegadores antigos (polyfills, código transpilado) para recursos que os navegadores atuais já têm. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Derleme aracınızın hedef tarayıcı ayarını (browserslist) güncel tarayıcılara çekin ve artık gerekmeyen polyfill'leri kaldırın.":
    "Atualize os navegadores-alvo da sua ferramenta de build (browserslist) para os navegadores atuais e remova os polyfills de que não precisa mais.",
  "Üçüncü taraf kodlar tarayıcıyı uzun süre meşgul ediyor":
    "Código de terceiros deixa o navegador ocupado por muito tempo",
  "Reklam, sohbet, analiz ya da sosyal medya gibi başka sitelerden gelen betikler telefonda tarayıcının ana iş parçacığını toplam yarım saniyeden uzun meşgul etti. Bu sürede sayfa tıklamalara geç yanıt verir. Hangi hizmetin ne kadar sürdüğü bulgunun ayrıntısındadır. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Scripts de outros sites, como anúncios, chat, análise ou redes sociais, deixaram a linha de execução principal do navegador ocupada por mais de meio segundo no total em um celular. Nesse tempo, a página responde aos toques com atraso. Qual serviço levou quanto tempo está nos detalhes da descoberta. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Kullanmadığınız etiketleri kaldırın, kalanları sayfa açıldıktan sonra yükleyin; sohbet ya da video gibi ağır gömülü öğeleri tıklanınca yüklenen bir önizlemeyle değiştirin.":
    "Remova as tags que você não usa, carregue as demais depois que a página abrir e troque incorporações pesadas, como chat ou vídeo, por uma prévia que carrega ao clicar.",
  "Ana içeriğin yüklenmesi iyileştirilebilir (LCP)":
    "O carregamento do conteúdo principal poderia ser mais rápido (LCP)",
  "Sayfanın en büyük öğesi 2,5 ile 4 saniye arasında göründü. Google bu aralığı 'iyileştirilmeli' sayar; 2,5 saniye ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa PageSpeed Insights'ın laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.":
    'O maior elemento da página apareceu entre 2,5 e 4 segundos. O Google classifica essa faixa como "precisa de melhoria"; 2,5 segundos ou menos é "bom". O valor vem dos dados de campo de usuários reais do Chrome quando existem; caso contrário, da medição de laboratório do PageSpeed Insights. Os detalhes dizem qual.',
  "En büyük öğe genelde kapak görseli ya da ana başlıktır: görseli küçültüp WebP gibi hafif bir biçime çevirin, geç yüklenmesini kapatın ve onu engelleyen betik ve yazı tiplerini erteleyin.":
    "O maior elemento costuma ser a imagem de capa ou o título principal: reduza a imagem e converta-a para um formato leve como WebP, desative o carregamento lento dela e adie os scripts e fontes que a bloqueiam.",
  "Yüklenirken içerik biraz kayıyor (CLS)":
    "O conteúdo se desloca um pouco durante o carregamento (CLS)",
  "Sayfa yüklenirken içerik 0,1 ile 0,25 arasında kaydı. Google bu aralığı 'iyileştirilmeli' sayar; 0,1 ve altı 'iyi'dir. Değer, Chrome kullanıcılarının gerçek (alan) verisi varsa ondan, yoksa laboratuvar ölçümünden gelir; hangisi olduğu ayrıntıda yazar.":
    'O conteúdo se deslocou entre 0,1 e 0,25 enquanto a página carregava. O Google classifica essa faixa como "precisa de melhoria"; 0,1 ou menos é "bom". O valor vem dos dados de campo de usuários reais do Chrome quando existem; caso contrário, da medição de laboratório. Os detalhes dizem qual.',
  "Görsellere ve gömülü çerçevelere genişlik ile yükseklik verin, sonradan yüklenen afiş ve reklamlar için yer ayırın, özel yazı tipi için yerleşimi bozmayan bir yedek tanımlayın.":
    "Defina largura e altura para imagens e frames incorporados, reserve espaço para banners e anúncios que carregam depois e defina para as fontes personalizadas uma alternativa que não quebre o layout.",
  "Tıklamalara yanıt iyileştirilebilir (INP)":
    "As respostas aos toques poderiam ser mais rápidas (INP)",
  "Sayfa tıklama ve dokunuşlara 200 ile 500 milisaniye arasında yanıt verdi. Google bu aralığı 'iyileştirilmeli' sayar; 200 milisaniye ve altı 'iyi'dir. Laboratuvar testi etkileşimi taklit edemediği için bu değer Chrome kullanıcılarının gerçek (alan) verisidir.":
    'A página respondeu a cliques e toques em 200 a 500 milissegundos. O Google classifica essa faixa como "precisa de melhoria"; 200 milissegundos ou menos é "bom". Como um teste de laboratório não consegue simular interação, esse valor vem de dados de campo de usuários reais do Chrome.',
  "Tıklamada çalışan uzun betikleri bölün, üçüncü taraf etiketleri sayfa açıldıktan sonra yükleyin ve gereksiz olanları kaldırın.":
    "Divida scripts longos que rodam em um clique, carregue tags de terceiros depois que a página abrir e remova as que você não precisa.",
  "Bazı metinlerin renk karşıtlığı yetersiz":
    "Parte do texto tem pouco contraste de cor",
  "Bazı metinler arka planlarıyla yeterince ayrışmıyor; az gören ziyaretçiler ve güneş altında telefon kullananlar onları zor okur. Kaç öğenin etkilendiği ayrıntıda yazar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Parte do texto não se destaca o suficiente do fundo; visitantes com baixa visão e pessoas usando o celular sob o sol têm dificuldade para ler. Os detalhes dizem quantos elementos são afetados. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Normal metin için en az 4,5:1, büyük metin için 3:1 karşıtlık oranı sağlayın. Hangi öğelerin yetersiz kaldığını PageSpeed Insights'ın Erişilebilirlik bölümünde görürsünüz.":
    "Garanta uma taxa de contraste de pelo menos 4,5:1 para texto normal e 3:1 para texto grande. A seção Acessibilidade do PageSpeed Insights mostra quais elementos não atingem isso.",
  "Görsellerde alternatif metin eksik (Lighthouse)":
    "Faltam textos alternativos nas imagens (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra alternatif metni (alt) olmayan görseller buldu. Bu, JavaScript'in sonradan eklediği görselleri de kapsar. Ekran okuyucular bu görselleri anlatamaz, Google da ne gösterdiklerini metinden öğrenemez. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O Lighthouse encontrou imagens sem texto alternativo (alt) depois que a página rodou no navegador. Isso inclui imagens que o JavaScript adiciona depois. Leitores de tela não conseguem descrever essas imagens, e o Google não consegue saber pelo texto o que elas mostram. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  'Her anlamlı görsele ne gösterdiğini anlatan kısa bir alt metni ekleyin; süs amaçlı görsellere boş alt="" verin.':
    'Dê a cada imagem relevante um texto alt curto descrevendo o que ela mostra; dê às imagens decorativas um alt="" vazio.',
  "Form alanlarının etiketi yok (Lighthouse)":
    "Os campos do formulário não têm rótulo (Lighthouse)",
  "Bazı form alanlarına bağlı bir etiket yok. Ekran okuyucu kullanan ziyaretçi alana ne yazması gerektiğini duyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alguns campos do formulário não têm rótulo associado. Um visitante que usa leitor de tela não ouve o que digitar no campo. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Her alana for özniteliğiyle bağlı bir <label> ekleyin; görünür etiket istenmiyorsa aria-label kullanın.":
    "Adicione a cada campo um <label> associado pelo atributo for; se não quiser um rótulo visível, use aria-label.",
  "Bazı bağlantıların okunabilir adı yok": "Alguns links não têm nome legível",
  'Bazı bağlantılarda ne metin ne de erişilebilir bir ad var (örneğin yalnızca bir simge). Ekran okuyucu bunları yalnızca "bağlantı" diye okur; Google da bağlantının neye gittiğini metinden anlayamaz. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'Alguns links não têm texto nem nome acessível (por exemplo, só um ícone). Um leitor de tela os lê apenas como "link", e o Google não consegue saber pelo texto para onde eles levam. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.',
  "Bağlantıya görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.":
    "Adicione texto visível ao link; se for só um ícone, diga o que ele faz com aria-label.",
  "Bazı düğmelerin okunabilir adı yok": "Alguns botões não têm nome legível",
  'Bazı düğmelerde ne metin ne de erişilebilir bir ad var. Ekran okuyucu bunları yalnızca "düğme" diye okur. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'Alguns botões não têm texto nem nome acessível. Um leitor de tela os lê apenas como "botão". Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.',
  "Düğmeye görünür bir metin ekleyin; yalnızca simgeyse aria-label ile ne yaptığını yazın.":
    "Adicione texto visível ao botão; se for só um ícone, diga o que ele faz com aria-label.",
  "Sayfanın tarayıcıda başlığı yok (Lighthouse)":
    "A página não tem título no navegador (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra bir <title> bulamadı. Sekmede ve arama sonucunda başlık olarak gösterilecek bir şey yok. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O Lighthouse não encontrou um <title> depois que a página rodou no navegador. Não há nada para mostrar como título na aba ou nos resultados de pesquisa. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Sayfanın <head> bölümüne sayfayı anlatan benzersiz bir <title> ekleyin; başlığı JavaScript ile sonradan yazıyorsanız sunucunun gönderdiği HTML'e taşıyın.":
    "Adicione ao <head> um <title> único que descreva a página; se o JavaScript escreve o título depois, mova-o para o HTML que o servidor envia.",
  "Sayfanın dili tarayıcıda belirtilmemiş (Lighthouse)":
    "O idioma da página não está declarado no navegador (Lighthouse)",
  "Lighthouse, <html> öğesinde lang özniteliği bulamadı. Ekran okuyucular metni yanlış dilin kurallarıyla okuyabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O Lighthouse não encontrou o atributo lang no elemento <html>. Leitores de tela podem ler o texto com as regras do idioma errado. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  'Sayfanın <html> etiketine dilini ekleyin, örneğin <html lang="tr">.':
    'Adicione o idioma da página à tag <html>, por exemplo <html lang="pt-BR">.',
  "Telefonda yakınlaştırma engellenmiş (Lighthouse)":
    "O zoom está bloqueado no celular (Lighthouse)",
  "Sayfanın viewport ayarı ziyaretçinin metni büyütmesini engelliyor (user-scalable=no ya da düşük bir maximum-scale). Az gören ziyaretçiler sayfayı okuyamaz. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "A configuração de viewport da página impede os visitantes de ampliar o texto (user-scalable=no ou um maximum-scale baixo). Visitantes com baixa visão não conseguem ler a página. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  'Viewport etiketinden user-scalable=no ve maximum-scale değerini kaldırın; content="width=device-width, initial-scale=1" yeterlidir.':
    'Remova user-scalable=no e o valor maximum-scale da tag viewport; content="width=device-width, initial-scale=1" é suficiente.',
  "Dokunma hedefleri çok küçük ya da çok sık":
    "As áreas de toque são pequenas demais ou próximas demais",
  "Bazı düğme ve bağlantılar telefonda parmakla rahat dokunulamayacak kadar küçük ya da birbirine çok yakın. Ziyaretçi yanlış yere dokunur. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Alguns botões e links são pequenos demais ou próximos demais entre si para tocar com conforto com o dedo no celular. Os visitantes tocam no item errado. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Dokunulan öğelere en az 24×24 piksel alan verin ve aralarında boşluk bırakın; menü ve altbilgi bağlantıları genelde bunun için büyütülmelidir.":
    "Dê aos elementos tocáveis pelo menos 24×24 pixels e deixe espaço entre eles; os links do menu e do rodapé geralmente precisam ficar maiores.",
  "Başlık sırası tarayıcıda atlıyor (Lighthouse)":
    "A ordem dos títulos pula níveis no navegador (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra başlık düzeylerinin sırayla gitmediğini gördü (örneğin H2'den H4'e atlama). Ekran okuyucu kullananlar sayfada başlıklarla gezinir ve atlanan düzey yapıyı bozar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O Lighthouse viu que os níveis dos títulos não seguem a ordem depois que a página rodou no navegador (por exemplo, pulando de H2 para H4). Quem usa leitor de tela navega pelos títulos, e um nível pulado quebra a estrutura. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Başlıkları sırayla kullanın (H1, H2, H3); bir başlığı yalnızca küçük görünsün diye alt düzeyden seçmeyin, boyutu CSS ile ayarlayın.":
    "Use os títulos em ordem (H1, H2, H3); não escolha um nível mais baixo só para o título parecer pequeno, defina o tamanho com CSS.",
  "Sayfa güvensiz (http) istekler yapıyor":
    "A página faz solicitações não seguras (http)",
  'Lighthouse, sayfanın kendisinin ya da yüklediği bazı dosyaların şifresiz http ile geldiğini gördü. Tarayıcı bu istekleri engelleyebilir ya da "Güvenli değil" uyarısı gösterebilir. Hangi adreslerin güvensiz olduğu ayrıntıda yazar. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'O Lighthouse viu que a própria página ou alguns arquivos que ela carrega chegam sem criptografia por http. O navegador pode bloquear essas solicitações ou mostrar o aviso "Não seguro". Os detalhes dizem quais endereços não são seguros. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.',
  "Sayfayı ve yüklediği tüm dosyaları https adresinden sunun; sayfadaki http:// ile başlayan dosya adreslerini https:// yapın.":
    "Sirva a página e todos os arquivos que ela carrega por https; troque por https:// os endereços de arquivos na página que começam com http://.",
  "Sayfa açılırken tarayıcı hata kaydediyor":
    "O navegador registra erros enquanto a página abre",
  "Sayfa açılırken tarayıcının konsoluna hata düştü: yüklenemeyen bir dosya, çalışırken çöken bir betik ya da engellenen bir istek. Bazıları ziyaretçiye görünmez, bazıları bir özelliğin çalışmadığını gösterir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Apareceram erros no console do navegador enquanto a página abria: um arquivo que não carregou, um script que falhou ao rodar ou uma solicitação bloqueada. Alguns são invisíveis para os visitantes; outros significam que um recurso não funciona. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Sayfayı Chrome'da açıp geliştirici araçlarının Konsol sekmesine bakın; ayrıntıdaki adreslerden başlayarak hataları giderin.":
    "Abra a página no Chrome e veja a guia Console nas ferramentas para desenvolvedores; comece a corrigir pelos endereços nos detalhes.",
  "Sayfa tarayıcıların kaldıracağı özellikler kullanıyor":
    "A página usa recursos que os navegadores estão removendo",
  "Sayfa, Chrome'un kullanımdan kaldırdığı ya da kaldıracağı özellikleri kullanıyor. Şimdi çalışıyor olabilir ama bir tarayıcı güncellemesinden sonra bozulabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "A página usa recursos que o Chrome descontinuou ou vai remover. Pode funcionar agora, mas pode quebrar depois de uma atualização do navegador. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "PageSpeed Insights raporundaki listeye bakın; genelde eski bir eklenti ya da kütüphanedir ve güncellemek yeterlidir.":
    "Veja a lista no relatório do PageSpeed Insights; geralmente é um plugin ou biblioteca antiga, e basta atualizá-lo.",
  "Tarayıcı sayfada sorunlar bildiriyor":
    "O navegador relata problemas na página",
  "Chrome'un geliştirici araçlarındaki \"Sorunlar\" bölümü bu sayfa için kayıt tuttu: örneğin engellenen çerezler, güvenlik başlığı sorunları ya da hatalı kaynak istekleri. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    'O painel "Problemas" das ferramentas para desenvolvedores do Chrome registrou itens para esta página: por exemplo, cookies bloqueados, problemas de cabeçalhos de segurança ou solicitações de recursos com falha. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.',
  'Sayfayı Chrome\'da açıp geliştirici araçlarının "Issues" (Sorunlar) sekmesine bakın ve listelenen sorunları giderin.':
    'Abra a página no Chrome, veja a guia "Problemas" nas ferramentas para desenvolvedores e corrija os problemas listados.',
  "Bazı görseller yanlış oranla gösteriliyor":
    "Algumas imagens aparecem na proporção errada",
  "Bazı görseller, kendi en-boy oranlarından farklı bir oranda gösterildiği için basık ya da uzamış görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Algumas imagens parecem achatadas ou esticadas porque são exibidas em uma proporção diferente da sua. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Görselin width ve height değerlerini kendi oranına uygun verin ya da CSS'te object-fit kullanın.":
    "Dê à imagem valores de largura e altura que respeitem a proporção dela ou use object-fit no CSS.",
  "Bazı görseller ekran için düşük çözünürlüklü":
    "Algumas imagens têm resolução baixa para a tela",
  "Bazı görseller, telefonun ekran yoğunluğuna göre gereğinden küçük çözünürlükte sunuluyor ve bulanık görünüyor. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Algumas imagens são servidas em resolução menor do que a densidade da tela do celular exige e parecem borradas. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Görsellerin daha büyük sürümlerini srcset ile sunun, böylece tarayıcı ekrana uygun olanı seçer.":
    "Sirva versões maiores das imagens com srcset para que o navegador escolha a que combina com a tela.",
  "Bazı bağlantılar taranamıyor (Lighthouse)":
    "Alguns links não podem ser rastreados (Lighthouse)",
  "Lighthouse, sayfa tarayıcıda çalıştıktan sonra Google'ın izleyemeyeceği bağlantılar buldu: geçerli bir href'i olmayan ya da yalnızca JavaScript ile çalışan bağlantılar. Google yalnızca href'i gerçek bir adres olan <a> bağlantılarını izler. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Depois que a página rodou no navegador, o Lighthouse encontrou links que o Google não consegue seguir: links sem href válido ou que só funcionam com JavaScript. O Google só segue links <a> cujo href é um endereço real. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Her bağlantıyı href özniteliği gerçek bir adres olan bir <a> etiketi yapın; javascript: ya da yalnızca onclick ile çalışan bağlantıları değiştirin.":
    "Faça de cada link uma tag <a> cujo href seja um endereço real; substitua links que só funcionam com javascript: ou onclick.",
  "Bağlantı metinleri açıklayıcı değil (Lighthouse)":
    "Os textos dos links não são descritivos (Lighthouse)",
  'Bazı bağlantıların metni "buraya tıklayın" ya da "devamı" gibi gittiği yeri anlatmayan sözlerden oluşuyor. Google bağlantı metninden hedef sayfanın konusunu öğrenir. Bu bulgu, PageSpeed Insights\'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.':
    'O texto de alguns links é formado por palavras como "clique aqui" ou "leia mais", que não dizem para onde levam. O Google entende o assunto da página de destino pelo texto do link. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.',
  'Bağlantı metnini gittiği sayfanın konusunu anlatacak şekilde yazın, örneğin "devamı" yerine "kargo ücretleri".':
    'Escreva textos de link que descrevam o assunto da página de destino, por exemplo "custos de frete" em vez de "leia mais".',
  "Google sayfayı dizine alamıyor (Lighthouse)":
    "O Google não consegue indexar a página (Lighthouse)",
  "Tarayıcımız bu sayfayı dizine alınabilir gördü, ama Lighthouse'un ölçümünde Google'ın sayfayı dizine almasını engelleyen bir kural vardı (robots.txt, noindex etiketi ya da X-Robots-Tag başlığı). Kural yalnızca Google'a ya da yalnızca bazı ziyaretçilere gösteriliyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "Nosso rastreador considerou esta página indexável, mas na medição do Lighthouse havia uma regra impedindo o Google de indexá-la (robots.txt, uma tag noindex ou um cabeçalho X-Robots-Tag). A regra pode ser mostrada só ao Google ou só a alguns visitantes. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Sayfanın aramada görünmesi gerekiyorsa robots.txt'teki ilgili Disallow satırını ve sayfadaki noindex kuralını kaldırın; sunucunun Googlebot'a farklı bir yanıt vermediğini kontrol edin.":
    "Se a página deve aparecer na pesquisa, remova a linha Disallow correspondente do robots.txt e a regra noindex da página; verifique se o servidor não responde de forma diferente ao Googlebot.",
  "robots.txt dosyasında geçersiz satırlar var":
    "O robots.txt tem linhas inválidas",
  "Lighthouse sitenin robots.txt dosyasında kurallara uymayan satırlar buldu. Google geçersiz satırları yok sayar, yani yazdığınız bir kural uygulanmıyor olabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O Lighthouse encontrou no robots.txt do site linhas que não seguem as regras. O Google ignora linhas inválidas, então uma regra que você escreveu pode não ser aplicada. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  'robots.txt\'i açın ve PageSpeed Insights raporunda gösterilen satırları düzeltin; her satır "Alan: değer" biçiminde olmalı (User-agent, Disallow, Allow, Sitemap).':
    'Abra o robots.txt e corrija as linhas mostradas no relatório do PageSpeed Insights; cada linha deve estar no formato "Campo: valor" (User-agent, Disallow, Allow, Sitemap).',
  "hreflang etiketleri geçersiz (Lighthouse)":
    "As tags hreflang são inválidas (Lighthouse)",
  "Lighthouse, sayfadaki dil sürümü (hreflang) etiketlerinde geçersiz bir dil kodu ya da göreli bir adres buldu. Google geçersiz hreflang etiketlerini yok sayar. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O Lighthouse encontrou um código de idioma inválido ou um endereço relativo nas tags de versão de idioma (hreflang) da página. O Google ignora tags hreflang inválidas. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Her hreflang değerinin geçerli bir dil kodu (tr, en-GB gibi) ve adresin tam adres (https:// ile başlayan) olduğundan emin olun.":
    "Verifique se cada valor hreflang é um código de idioma válido (pt, pt-BR e assim por diante) e se o endereço é completo (começando com https://).",
  "canonical etiketi geçersiz (Lighthouse)":
    "A tag canonical é inválida (Lighthouse)",
  "Lighthouse sayfanın canonical etiketini geçersiz buldu: birbiriyle çelişen birden çok adres, geçersiz bir adres, başka bir alan adına ya da sitenin ana sayfasına işaret eden bir adres olabilir. Google böyle bir canonical'ı yok sayabilir. Bu bulgu, PageSpeed Insights'ın sayfanın mobil sürümünü ölçtüğü Lighthouse raporundan gelir.":
    "O Lighthouse considerou inválida a tag canonical da página: podem ser vários endereços conflitantes, um endereço inválido ou um endereço em outro domínio ou na página inicial do site. O Google pode ignorar uma canonical assim. Esta descoberta vem do relatório do Lighthouse que o PageSpeed Insights gerou ao medir a versão para dispositivos móveis da página.",
  "Sayfada tek bir canonical etiketi bırakın ve onu sayfanın kendi tam adresine (ya da gerçekten asıl olan sayfaya) yönlendirin.":
    "Mantenha uma única tag canonical na página e aponte-a para o endereço completo da própria página (ou para a página que é de fato a original).",
  "Güvenli sayfada güvensiz görsel, video ya da çerçeve":
    "Imagem, vídeo ou frame não seguro em uma página segura",
  'Güvenli (https) sayfa bir görseli, videoyu, sesi ya da gömülü çerçeveyi (iframe) şifresiz http adresinden yüklüyor. Tarayıcılar böyle görsel ve medyayı https\'e çevirmeyi dener, olmazsa göstermez; http çerçeveleri ise doğrudan engeller. Ziyaretçi boş bir alan ya da "Güvenli değil" uyarısı görebilir.':
    'A página segura (https) carrega uma imagem, vídeo, áudio ou frame incorporado (iframe) de um endereço http sem criptografia. Os navegadores tentam passar essas imagens e mídias para https e não as mostram se falhar; frames http são bloqueados diretamente. O visitante pode ver um espaço vazio ou o aviso "Não seguro".',
  "Ayrıntıdaki adresleri https:// ile başlayacak şekilde değiştirin. Dosya kendi sitenizdeyse adresi göreli (/resimler/...) yazmak da yeter.":
    "Mude os endereços nos detalhes para começar com https://. Se o arquivo estiver no seu próprio site, escrever o endereço como relativo (/images/...) também funciona.",
  "Form bilgileri şifresiz gönderiliyor":
    "Os dados do formulário são enviados sem criptografia",
  "Güvenli (https) sayfadaki bir form, doldurulan bilgileri şifresiz bir http adresine gönderiyor. Tarayıcılar gönderimden önce ziyaretçiyi uyarır ve bilgiler yolda okunabilir.":
    "Um formulário na página segura (https) envia o que foi preenchido para um endereço http sem criptografia. Os navegadores avisam o visitante antes do envio, e os dados podem ser lidos no caminho.",
  "Formun action adresini https:// ile başlayacak şekilde değiştirin ya da formu aynı sitedeki göreli bir adrese gönderin.":
    "Mude o endereço action do formulário para começar com https:// ou envie o formulário para um endereço relativo no mesmo site.",
  "Sayfa meta refresh ile yönlendiriyor":
    "A página redireciona com meta refresh",
  'Sayfa, sunucu yönlendirmesi yerine HTML içindeki <meta http-equiv="refresh"> etiketiyle başka bir adrese gönderiyor. Google bunu anlar, ama sunucu tarafında bir 301 yönlendirmesini tercih eder; ziyaretçi de yönlendirmeden önce boş bir sayfa görebilir.':
    'A página envia os visitantes para outro endereço com uma tag <meta http-equiv="refresh"> no HTML em vez de um redirecionamento do servidor. O Google entende, mas prefere um redirecionamento 301 no servidor; o visitante também pode ver uma página em branco antes do redirecionamento.',
  "Mümkünse yönlendirmeyi sunucuda (301 ya da 308) yapın ve meta refresh etiketini kaldırın.":
    "Se possível, redirecione no servidor (301 ou 308) e remova a tag meta refresh.",
  "canonical adresi göreli yazılmış":
    "O endereço canonical está escrito como relativo",
  "Sayfanın canonical etiketi tam adres yerine göreli bir yol (örneğin /urun) gösteriyor. Google göreli adresi çözebilir, ama tam adres kullanılmasını önerir; göreli yol, sayfa farklı bir adresten açıldığında yanlış yere işaret edebilir.":
    "A tag canonical da página mostra um caminho relativo (por exemplo, /produto) em vez de um endereço completo. O Google consegue resolver endereços relativos, mas recomenda os completos; um caminho relativo pode apontar para o lugar errado quando a página é aberta por outro endereço.",
  "canonical adresini https:// ile başlayan tam adres olarak yazın.":
    "Escreva o endereço canonical como um endereço completo começando com https://.",
  "canonical adresinde # parçası var":
    "O endereço canonical tem um fragmento #",
  "Sayfanın canonical adresi # ile başlayan bir parça içeriyor. Google adresin # sonrasını dikkate almaz, bu yüzden bu parça bir işe yaramaz ve genelde bir şablon hatasının işaretidir.":
    "O endereço canonical da página contém um fragmento que começa com #. O Google ignora tudo depois do #, então o fragmento não faz nada e costuma ser sinal de erro no template.",
  "canonical adresinden # ve sonrasını kaldırın.":
    "Remova do endereço canonical o # e tudo o que vem depois dele.",
  "canonical etiketi sayfanın gövdesinde":
    "A tag canonical está no corpo da página",
  "Sayfanın tek canonical etiketi <head> bölümünde değil, <body> içinde. Google canonical etiketini yalnızca <head> içinde okur; gövdedeki etiket yok sayılır, yani sayfanın aslında canonical'ı yok.":
    "A única tag canonical da página está dentro de <body>, não na seção <head>. O Google só lê a tag canonical no <head>; a que está no corpo é ignorada, então na prática a página não tem canonical.",
  "canonical etiketini sayfanın <head> bölümüne taşıyın. Genelde bir eklentinin ya da şablonun etiketi yanlış yere yazmasından olur.":
    "Mova a tag canonical para a seção <head> da página. Isso costuma acontecer quando um plugin ou template escreve a tag no lugar errado.",
  "robots etiketleri birbiriyle çelişiyor": "As tags robots se contradizem",
  "Sayfada birden fazla robots etiketi var ve biri izin verirken diğeri yasaklıyor (örneğin biri index, diğeri noindex). Google böyle bir çelişkide daha kısıtlayıcı olan kuralı uygular; yani sayfa büyük olasılıkla istediğinizden farklı işlenir.":
    "A página tem mais de uma tag robots, e uma permite o que outra proíbe (por exemplo, uma diz index e outra noindex). Nesse conflito, o Google aplica a regra mais restritiva, então a página provavelmente é tratada de um jeito diferente do que você quer.",
  "Sayfada tek bir robots etiketi bırakın. Genelde bir SEO eklentisi ile temanın aynı etiketi ayrı ayrı yazmasından olur.":
    "Mantenha uma única tag robots na página. Isso costuma acontecer quando um plugin de SEO e o tema escrevem a mesma tag.",
  "Aramada sayfanın özeti gösterilmiyor":
    "A pesquisa não mostra o snippet da página",
  "Sayfa dizine alınabilir, ama nosnippet ya da max-snippet:0 kuralı Google'ın arama sonucunda sayfanın metninden özet göstermesini engelliyor. Özetsiz bir sonuç daha az tıklanır. Bilerek yapılmış olabilir.":
    "A página pode ser indexada, mas uma regra nosnippet ou max-snippet:0 impede o Google de mostrar um snippet do texto da página nos resultados de pesquisa. Um resultado sem snippet recebe menos cliques. Pode ser intencional.",
  "Bilerek değilse robots etiketinden ya da X-Robots-Tag başlığından nosnippet ve max-snippet:0 kuralını kaldırın.":
    "Se não for intencional, remova nosnippet e max-snippet:0 da tag robots ou do cabeçalho X-Robots-Tag.",
  'Sayfa "bulunamadı" diyor ama başarılı yanıt veriyor':
    'A página diz "não encontrada", mas responde com sucesso',
  'Sayfanın başlığı ya da ana başlığı "404" ya da "sayfa bulunamadı" diyor, ama sunucu 200 (başarılı) kodu döndürüyor. Google böyle sayfaları "soft 404" sayar ve dizine almaz; ama taramaya zaman harcar ve gerçek bir hata sayfası olduğunu anlamakta gecikebilir.':
    'O título (title) ou o título principal da página diz "404" ou "página não encontrada", mas o servidor retorna o código 200 (sucesso). O Google trata essas páginas como "soft 404" e não as indexa, mas gasta tempo de rastreamento com elas e pode demorar a perceber que é uma página de erro.',
  "Sayfa gerçekten yoksa sunucunun 404 ya da 410 kodu döndürmesini sağlayın. Varsa başlığını ve içeriğini düzeltin.":
    "Se a página realmente não existe, faça o servidor retornar o código 404 ou 410. Se existe, corrija o título e o conteúdo.",
  "Sayfada yer tutucu metin (lorem ipsum) kalmış":
    "Ficou texto de preenchimento (lorem ipsum) na página",
  'Sayfanın görünen metninde "lorem ipsum" yer tutucu metni var. Tasarım aşamasından kalmış ve yayına unutulmuş içerik, ziyaretçiye ve Google\'a sayfanın bitmediğini söyler.':
    'O texto visível da página contém o texto de preenchimento "lorem ipsum". Conteúdo que sobrou da fase de design e foi publicado por engano mostra aos visitantes e ao Google que a página não está pronta.',
  "Yer tutucu metni gerçek içerikle değiştirin ya da o bölümü kaldırın.":
    "Substitua o texto de preenchimento por conteúdo real ou remova essa seção.",
  "E-posta adresi düz metin olarak açıkta":
    "Um endereço de e-mail está exposto como texto simples",
  "Sayfada düz metin ya da mailto bağlantısı olarak bir e-posta adresi var. Spam gönderenlerin botları sayfaları bu adresler için tarar. Ziyaretçinin size ulaşması için gerekliyse sorun değildir.":
    "A página tem um endereço de e-mail como texto simples ou como link mailto. Bots de spammers rastreiam páginas atrás desses endereços. Não é um problema se os visitantes precisam dele para falar com você.",
  "İletişim için bir form kullanmayı düşünün ya da adresi spam filtresi güçlü bir kutuya yönlendirin.":
    "Considere usar um formulário de contato ou direcionar o endereço para uma caixa de e-mail com filtro de spam forte.",
  "Başlıktaki kelimeler sayfa içeriğinde geçmiyor":
    "As palavras do título não aparecem no conteúdo da página",
  "Sayfa başlığındaki (title) anlamlı kelimelerin hiçbiri ana başlıkta ya da sayfa metninde geçmiyor. Google başlığın sayfayı anlatıp anlatmadığına bakar; içerikle ilgisi olmayan bir başlığı arama sonucunda başka bir metinle değiştirebilir. Bu bir tahmindir: eş anlamlı kelimeler sayılmaz.":
    "Nenhuma das palavras significativas do título da página aparece no título principal ou no texto da página. O Google verifica se um título descreve a página e pode substituir, nos resultados de pesquisa, um título sem relação com o conteúdo por outro texto. É uma heurística: sinônimos não são considerados.",
  "Başlığı sayfanın gerçekten anlattığı konuya göre yazın ya da başlıktaki ana kelimeyi ana başlıkta ve ilk paragrafta kullanın.":
    "Escreva o título com base no assunto real da página ou use a palavra principal do título no título principal e no primeiro parágrafo.",
  "Kuruluş yapısal verisinde sosyal profiller yok":
    "Os dados estruturados de Organization não listam perfis sociais",
  "Sayfadaki Organization yapısal verisinde sameAs özelliği yok. sameAs, kuruluşunuzun resmi sosyal medya ve kayıt profillerini (LinkedIn, Wikipedia gibi) gösterir; Google kuruluşu tanırken bu bağlantıları kullanır. Google bunu önerir, zorunlu tutmaz.":
    "Os dados estruturados de Organization da página não têm a propriedade sameAs. sameAs lista os perfis oficiais da sua organização em redes sociais e cadastros (LinkedIn, Wikipedia e assim por diante); o Google usa esses links para reconhecer a organização. O Google recomenda, mas não exige.",
  'Organization yapısal verisine sameAs ekleyin ve içine resmi profil adreslerinizi liste olarak yazın, örneğin "sameAs": ["https://www.linkedin.com/company/..."].':
    'Adicione sameAs aos dados estruturados de Organization com os endereços dos seus perfis oficiais em lista, por exemplo "sameAs": ["https://www.linkedin.com/company/..."].',
  "Derindeki sayfada içerik yolu (breadcrumb) yok":
    "Uma página profunda não tem trilha de navegação",
  "Ana sayfadan en az üç tıklama uzaktaki bu sayfada ne bir içerik yolu (breadcrumb) gezinmesi ne de BreadcrumbList yapısal verisi var. İçerik yolu ziyaretçiye nerede olduğunu gösterir; Google da arama sonucunda adres yerine bu yolu gösterebilir.":
    "Esta página, a pelo menos três cliques da página inicial, não tem trilha de navegação (breadcrumb) nem dados estruturados BreadcrumbList. A trilha mostra aos visitantes onde eles estão, e o Google pode mostrá-la no lugar do endereço nos resultados de pesquisa.",
  "Sayfanın üstüne Ana sayfa > Kategori > Sayfa biçiminde bir içerik yolu ekleyin ve BreadcrumbList yapısal verisiyle işaretleyin. Çoğu SEO eklentisi ikisini birlikte ekler.":
    "Adicione no topo da página uma trilha como Início > Categoria > Página e marque-a com dados estruturados BreadcrumbList. A maioria dos plugins de SEO adiciona os dois juntos.",
  "Sayfalamanın devam sayfası aramadan gizlenmiş":
    "Uma página seguinte de uma lista paginada está oculta da pesquisa",
  "Bir listenin 2. ya da sonraki sayfası noindex ile aramadan gizlenmiş. Google'ın sayfalama rehberi her sayfanın kendi adresiyle dizine girebilmesini önerir. Uzun süre noindex kalan bir sayfadaki bağlantıları Google zamanla izlemeyi bırakabilir; o zaman yalnızca bu sayfalardan bağlantı alan ürün ya da yazılar bulunmaz olur.":
    "A página 2 ou seguinte de uma lista está oculta da pesquisa com noindex. As orientações do Google sobre paginação recomendam que cada página possa ser indexada no próprio endereço. Com o tempo, o Google pode parar de seguir links de uma página que fica muito tempo com noindex; aí produtos ou posts linkados só por essas páginas não podem ser encontrados.",
  "Sayfalama sayfalarından noindex'i kaldırın ve her birine kendi adresini canonical olarak verin.":
    "Remova o noindex das páginas paginadas e dê a cada uma o próprio endereço como canonical.",
  "Güvenli sitede iç bağlantılar http adresine gidiyor":
    "Em um site seguro, os links internos apontam para endereços http",
  "Site https ile çalışıyor, ama bu sayfadaki bazı bağlantılar sitenin kendi sayfalarına http:// ile veriliyor. Her tıklama önce bir yönlendirmeden geçer ya da ziyaretçi güvensiz sürüme düşer; Google da aynı sayfanın iki adresini görür.":
    "O site roda em https, mas alguns links nesta página apontam para páginas do próprio site com http://. Cada clique passa primeiro por um redirecionamento ou leva o visitante à versão não segura, e o Google vê dois endereços para a mesma página.",
  "Şablondaki ve içerikteki iç bağlantıları https:// ile ya da göreli (/sayfa) olarak yazın. Veritabanında eski http adreslerini toplu değiştirmek genelde en hızlı yoldur.":
    "Escreva os links internos nos templates e no conteúdo com https:// ou como relativos (/pagina). Substituir em massa os endereços http antigos no banco de dados costuma ser o caminho mais rápido.",
  "Sayfanın içine gömülü kod çok büyük":
    "O código incorporado na página é muito grande",
  "Sayfanın HTML'ine doğrudan gömülmüş betik ve stil kodu 100 KB'ı geçiyor. Gömülü kod tarayıcı önbelleğinde saklanmaz ve her sayfa açılışında yeniden indirilir; sayfa da ilk içeriği göstermeden önce bu kodu okumak zorunda kalır.":
    "O código de script e estilo incorporado diretamente no HTML da página passa de 100 KB. Código incorporado não fica no cache do navegador e é baixado de novo a cada visualização; a página também precisa lê-lo antes de mostrar o primeiro conteúdo.",
  "Büyük gömülü betik ve stilleri ayrı dosyalara taşıyın; yalnızca ilk ekran için gereken küçük CSS'i gömülü bırakın.":
    "Mova scripts e estilos incorporados grandes para arquivos separados; mantenha incorporado só o pouco CSS de que a primeira tela precisa.",
  "Blog var ama RSS/Atom akışı bildirilmemiş":
    "Há um blog, mas nenhum feed RSS/Atom está declarado",
  "Sitede yazı (Article, BlogPosting) olarak işaretlenmiş sayfalar var, ama taranan hiçbir sayfa bir RSS ya da Atom akışı bildirmiyor. Akış, okuyucuların ve haber toplayıcıların yeni yazılarınızı izlemesini sağlar; Google da yeni içeriği daha çabuk keşfedebilir.":
    "O site tem páginas marcadas como posts (Article, BlogPosting), mas nenhuma página rastreada declara um feed RSS ou Atom. Um feed permite que leitores e agregadores de notícias acompanhem seus novos posts, e o Google pode descobrir conteúdo novo mais cedo.",
  'Bir RSS ya da Atom akışı yayınlayın ve sayfaların <head> bölümüne <link rel="alternate" type="application/rss+xml" href="/feed"> ile bildirin. Çoğu blog altyapısında akış hazırdır, yalnızca etiketin eklenmesi gerekir.':
    'Publique um feed RSS ou Atom e declare-o no <head> das páginas com <link rel="alternate" type="application/rss+xml" href="/feed">. A maioria das plataformas de blog já tem um feed pronto; só falta adicionar a tag.',
  "Başka bir siteye verilen bağlantı kırık":
    "Um link para outro site está quebrado",
  "Bu sayfadaki bir bağlantı başka bir sitede açılmayan bir adrese gidiyor: adres 404 ya da başka bir hata veriyor, ya da alan adı artık yok. Ziyaretçi bir hata sayfasına düşer ve sayfanız bakımsız görünür. Botlara kapalı siteler (sosyal ağlar gibi) ve yanıt vermeyen adresler kırık sayılmaz, kontrol edilmemiş sayılır.":
    "Um link nesta página leva a um endereço de outro site que não abre: o endereço retorna 404 ou outro erro, ou o domínio não existe mais. O visitante cai em uma página de erro e sua página parece abandonada. Sites fechados para bots (como redes sociais) e endereços que não respondem não contam como quebrados; contam como não verificados.",
  "Bağlantıyı hedefin yeni adresine güncelleyin ya da kaldırın. Ayrıntıda hangi adresin hangi yanıtı verdiği yazar.":
    "Atualize o link para o novo endereço do destino ou remova-o. Os detalhes dizem qual endereço deu qual resposta.",
  "Görsel dosyası çok büyük": "O arquivo de imagem é grande demais",
  "Sayfadaki bir ya da daha fazla görsel dosyası 200 KB'tan büyük (ayrıntıda 500 KB'ı geçenler ayrıca sayılır). Boyut, dosyanın kendisine istek gönderilerek ölçüldü. Büyük görseller özellikle mobil bağlantıda sayfayı yavaşlatır.":
    "Um ou mais arquivos de imagem na página passam de 200 KB (os acima de 500 KB são contados à parte nos detalhes). O tamanho foi medido solicitando o próprio arquivo. Imagens grandes deixam a página lenta, principalmente em conexões móveis.",
  "Görseli gösterildiği boyuta küçültün, sıkıştırın ve WebP ya da AVIF biçimine çevirin. Çoğu fotoğraf bu işlemden sonra 100 KB'ın altına iner.":
    "Redimensione a imagem para o tamanho em que ela aparece, compacte-a e converta-a para WebP ou AVIF. A maioria das fotos fica abaixo de 100 KB depois disso.",
  "Dış bağlantıları ve görsel boyutlarını da kontrol et":
    "Verificar também links de saída e tamanho das imagens",
  "Dış kontroller": "Verificações externas",
  "Tarama bittikten sonra başka sitelere verilen bağlantıların açılıp açılmadığına ve sitenizdeki görsel dosyalarının boyutuna bakar. En çok 300 adres sorulur; sosyal ağlar gibi botları engelleyen siteler atlanır.":
    "Depois do rastreamento, verifica se os links para outros sites ainda abrem e mede os arquivos de imagem do seu site. São solicitados no máximo 300 endereços; sites que bloqueiam bots, como redes sociais, são ignorados.",
  "Site hem www ile hem www'siz açılıyor": "O site abre com e sem www",
  "Sitenizin www'li ve www'siz adresi ikisi de sayfayı açıyor; biri ötekine yönlendirmiyor. Google bunları aynı içeriğin iki kopyası olarak görür, hangisini göstereceğini kendisi seçer ve bağlantıların değeri iki adres arasında bölünebilir.":
    "Tanto o endereço com www quanto o sem www do seu site mostram a página; nenhum redireciona para o outro. O Google os vê como duas cópias do mesmo conteúdo, escolhe sozinho qual mostrar, e o valor dos links pode se dividir entre os dois endereços.",
  'Bir adresi asıl seçin (genelde zaten kullandığınız) ve ötekinden ona kalıcı (301) yönlendirme verin. Barındırma panellerinde bu genelde "www\'ye yönlendir" ya da "www\'siz adrese yönlendir" ayarıdır.':
    'Escolha um endereço como principal (geralmente o que você já usa) e configure no outro um redirecionamento permanente (301) para ele. Nos painéis de hospedagem, isso costuma ser uma opção "redirecionar para www" ou "redirecionar para sem www".',
  "Var olmayan sayfa 404 yerine 200 dönüyor":
    "Página inexistente retorna 200 em vez de 404",
  'Sitede olmayan rastgele bir adres istedik, sunucu "bulunamadı" (404) yerine "tamam" (200) yanıtı verdi. Google bunu yumuşak 404 sayar: silinen ya da yanlış yazılan adresler gerçek sayfa gibi görünür, tarama boşa gider ve boş sayfalar dizine girebilir.':
    'Solicitamos um endereço aleatório que não existe no site, e o servidor respondeu "OK" (200) em vez de "não encontrado" (404). O Google conta isso como soft 404: endereços excluídos ou digitados errado parecem páginas reais, o rastreamento é desperdiçado e páginas vazias podem ser indexadas.',
  'Sitenizin hata sayfası ayarını kontrol edin: olmayan adresler için 404 durum kodu dönmeli. İçerik yönetim sisteminizde "özel 404 sayfası" varsa sayfanın içeriği aynı kalabilir, yalnızca durum kodu 404 olmalı.':
    'Verifique a configuração da página de erro do seu site: endereços que não existem devem retornar o código de status 404. Se o seu CMS tem uma "página 404 personalizada", o conteúdo pode continuar o mesmo; só o código de status precisa ser 404.',
  "Var olmayan sayfalar ana sayfaya yönlendiriliyor":
    "Páginas inexistentes redirecionam para a página inicial",
  "Sitede olmayan rastgele bir adres istedik, sunucu bizi ana sayfaya yönlendirdi. Google bunu genelde yumuşak 404 sayar ve yönlendirmeyi yok sayar; ziyaretçi de aradığını bulamadığını anlamadan ana sayfaya düşer.":
    "Solicitamos um endereço aleatório que não existe no site, e o servidor nos redirecionou para a página inicial. O Google geralmente conta isso como soft 404 e ignora o redirecionamento; os visitantes caem na página inicial sem perceber que o que procuravam não existe.",
  "Olmayan adreslerde 404 dönen, arama kutusu ya da önemli bağlantılar içeren bir hata sayfası gösterin. Yalnızca taşınan sayfaları yeni adreslerine yönlendirin.":
    "Para endereços que não existem, mostre uma página de erro que retorne 404 e ofereça uma caixa de pesquisa ou links principais. Redirecione só as páginas que realmente mudaram para os novos endereços.",
  "Site simgesi (favicon) bulunamadı": "Ícone do site (favicon) não encontrado",
  "Sayfada bir site simgesi tanımlanmamış ve /favicon.ico adresi de bir simge döndürmüyor (ya da tanımlanan simge açılmıyor). Google mobil arama sonuçlarında sitenizin adının yanında bu simgeyi gösterir; yoksa genel bir simge çıkar ve sonuç daha az fark edilir.":
    "A página não declara um ícone do site e /favicon.ico também não retorna um (ou o ícone declarado não carrega). O Google mostra esse ícone ao lado do nome do seu site nos resultados de pesquisa em dispositivos móveis; sem ele, aparece um ícone genérico e o resultado chama menos atenção.",
  'En az 48x48 piksellik kare bir simge hazırlayın, sitenize yükleyin ve sayfaların <head> bölümüne `<link rel="icon" href="/favicon.ico">` ekleyin. Site oluşturucularda bu genelde "site simgesi" ayarıdır.':
    'Crie um ícone quadrado de pelo menos 48x48 pixels, envie-o para o site e adicione `<link rel="icon" href="/favicon.ico">` ao <head> das páginas. Nos criadores de sites, isso costuma ser a opção "ícone do site".',
  "robots.txt tüm siteyi Google'a kapatıyor":
    "O robots.txt bloqueia o site inteiro para o Google",
  "robots.txt dosyanız Googlebot'un ana sayfayı taramasını yasaklıyor (genelde `Disallow: /` satırı). Google sitenizi taramaz; sayfalar arama sonuçlarından zamanla düşer ya da açıklamasız görünür. Çoğu zaman geliştirme sırasında konup unutulmuş bir kuraldır.":
    "Seu robots.txt proíbe o Googlebot de rastrear a página inicial (geralmente com uma linha `Disallow: /`). O Google não vai rastrear o site; com o tempo, as páginas saem da pesquisa ou aparecem sem descrição. Muitas vezes é uma regra adicionada durante o desenvolvimento e esquecida.",
  "robots.txt'teki `Disallow: /` satırını kaldırın ya da yalnızca gizli kalması gereken klasörlerle sınırlayın. Sonra Search Console'daki robots.txt raporundan Google'ın yeni dosyayı okuduğunu kontrol edin.":
    "Remova a linha `Disallow: /` do robots.txt ou limite-a às pastas que precisam ficar ocultas. Depois, confira no relatório de robots.txt do Search Console se o Google leu o novo arquivo.",
  "robots.txt site haritasını göstermiyor":
    "O robots.txt não aponta para o sitemap",
  "robots.txt dosyanızda `Sitemap:` satırı yok. Arama motorları site haritasını bu satırdan da bulur; Search Console'a gönderdiyseniz Google için sorun değildir, ama Bing ve diğer tarayıcılar için en kolay yoldur.":
    "Seu robots.txt não tem uma linha `Sitemap:`. Os mecanismos de pesquisa também encontram o sitemap por essa linha; se você o enviou no Search Console, não é problema para o Google, mas é o caminho mais fácil para o Bing e outros rastreadores.",
  "robots.txt'in sonuna site haritanızın tam adresiyle bir satır ekleyin, örneğin `Sitemap: https://alanadiniz.com/sitemap.xml`.":
    "Adicione ao final do robots.txt uma linha com o endereço completo do sitemap, por exemplo `Sitemap: https://seudominio.com.br/sitemap.xml`.",
  "Bazı yapay zekâ tarayıcıları robots.txt ile engellenmiş":
    "Alguns rastreadores de IA estão bloqueados pelo robots.txt",
  "robots.txt dosyanız bazı yapay zekâ tarayıcılarının (örneğin GPTBot, ClaudeBot, PerplexityBot) sitenizi taramasını yasaklıyor. Bu bir tercih: içeriğinizin yapay zekâ eğitiminde kullanılmasını istemiyorsanız doğrudur. Ama bu asistanların arama ve yanıt özelliklerinde sitenizin görünmesini de azaltabilir. Google araması etkilenmez.":
    "Seu robots.txt proíbe alguns rastreadores de IA (por exemplo, GPTBot, ClaudeBot, PerplexityBot) de rastrear o site. É uma escolha: faz sentido se você não quer que seu conteúdo seja usado para treinar IA. Mas também pode reduzir a frequência com que seu site aparece nos recursos de pesquisa e resposta desses assistentes. A Pesquisa Google não é afetada.",
  "Bilerek engellediyseniz bir şey yapmanıza gerek yok. Yapay zekâ yanıtlarında görünmek istiyorsanız arama amaçlı tarayıcılara (OAI-SearchBot, Claude-SearchBot, PerplexityBot gibi) izin verip yalnızca eğitim tarayıcılarını (GPTBot, ClaudeBot, Google-Extended gibi) engelleyebilirsiniz.":
    "Se você os bloqueou de propósito, não há nada a fazer. Se quiser aparecer nas respostas de IA, pode liberar os rastreadores de pesquisa (como OAI-SearchBot, Claude-SearchBot, PerplexityBot) e bloquear só os de treinamento (como GPTBot, ClaudeBot, Google-Extended).",
  "llms.txt dosyası yok (isteğe bağlı)": "Nenhum arquivo llms.txt (opcional)",
  "Sitenizin kökünde llms.txt dosyası yok. Bu dosya yapay zekâ asistanlarına sitenin önemli sayfalarını kısa bir listeyle anlatmak için önerilen yeni bir biçimdir. Henüz bir standart değildir ve Google bunu kullanmaz; yoksa bir sorun yoktur.":
    "Não há um arquivo llms.txt na raiz do seu site. Esse arquivo é um formato proposto recentemente para descrever a assistentes de IA as páginas importantes de um site em uma lista curta. Ainda não é padrão e o Google não o usa; não ter um não é problema.",
  "İsterseniz sitenizin kökünde /llms.txt adresine, sitenin ne olduğunu bir paragrafta anlatan ve önemli sayfalarınızı bağlantılarıyla listeleyen düz metin (Markdown) bir dosya koyun.":
    "Se quiser, coloque na raiz do site um arquivo de texto simples (Markdown) em /llms.txt que descreva o site em um parágrafo e liste as páginas importantes com links.",
  "Başlangıç sayfasının HTML'i 2 MB'tan büyük":
    "O HTML da página inicial passa de 2 MB",
  "Başlangıç sayfasının HTML'i 2 MB'ı aşıyor. Google bir HTML dosyasının yalnızca ilk 2 MB'ını işler; sonrasındaki içerik ve bağlantılar Google için yok sayılır. Büyük HTML ayrıca yavaş mobil bağlantılarda sayfayı geciktirir.":
    "O HTML da página inicial passa de 2 MB. O Google só processa os primeiros 2 MB de um arquivo HTML; o conteúdo e os links depois disso são ignorados. Um HTML grande também deixa a página lenta em conexões móveis lentas.",
  "HTML'in içine gömülü büyük verileri (satır içi görseller, büyük JSON, tekrar eden menüler) ayrı dosyalara taşıyın. Uzun listeleri sayfalara bölün.":
    "Mova para arquivos separados os dados grandes incorporados no HTML (imagens inline, JSON grande, menus repetidos). Divida listas longas em páginas.",
  "Başlangıç sayfası sıkıştırılmadan geldi":
    "A página inicial chegou sem compactação",
  "Denetim başlangıç sayfasını gzip ve brotli kabul ettiğini söyleyerek istedi, ama yanıtta Content-Encoding başlığı yoktu: sayfa sıkıştırılmadan geldi. Sıkıştırma HTML'i genelde 4-5 kat küçültür ve sayfayı hızlandırır. Bazı ara sunucular ve CDN'ler sıkıştırmayı yalnızca tarayıcılara uyguladığı için tarayıcıda da doğrulayın.":
    "A auditoria solicitou a página inicial informando que aceita gzip e brotli, mas a resposta não tinha o cabeçalho Content-Encoding: a página chegou sem compactação. A compactação costuma reduzir o HTML de 4 a 5 vezes e acelera a página. Alguns proxies e CDNs só compactam para navegadores, então confirme também em um navegador.",
  "Sunucunuzda ya da CDN'de gzip veya brotli sıkıştırmayı açın. Sonucu tarayıcının geliştirici araçlarında, yanıt başlıklarında `content-encoding` satırına bakarak doğrulayın.":
    "Ative a compactação gzip ou brotli no servidor ou na CDN. Confira o resultado nas ferramentas para desenvolvedores do navegador procurando a linha `content-encoding` nos cabeçalhos da resposta.",
  "Sunucu ilk yanıtı geç veriyor (TTFB)":
    "O servidor demora a enviar a primeira resposta (TTFB)",
  "Başlangıç sayfasının ilk baytı 800 milisaniyeden geç geldi; web.dev bu sınırın altını önerir. Sunucu yanıtı geç başlarsa sayfadaki her şey o kadar geç başlar. Süre, denetimi çalıştıran bilgisayardan iki ayrı istekle ölçülür ve hızlı olanı esas alınır; yine de ağa göre değişebilir.":
    "O primeiro byte da página inicial chegou depois de mais de 800 milissegundos; o web.dev recomenda ficar abaixo disso. Se a resposta do servidor começa tarde, tudo na página começa igualmente tarde. O tempo é medido com duas solicitações separadas a partir do computador que roda a auditoria, e conta a mais rápida; ainda assim pode variar com a rede.",
  "Sayfa önbelleğini açın, yavaş veritabanı sorgularını ve eklentileri bulun, ziyaretçilerinize yakın bir CDN kullanın. Sorun sürerse barındırma paketinizi gözden geçirin.":
    "Ative o cache de página, encontre consultas ao banco de dados e plugins lentos e use uma CDN perto dos seus visitantes. Se o problema continuar, revise seu plano de hospedagem.",
  "http adresi https'e yönlendirilmiyor":
    "O endereço http não redireciona para https",
  'Sitenizin http:// ile başlayan adresi şifreli https sürümüne yönlendirmiyor, sayfayı düz http ile açıyor. Ziyaretçi adresi elle yazdığında ya da eski bir bağlantıdan geldiğinde güvenli olmayan sürümde kalır ve tarayıcı "Güvenli değil" uyarısı gösterir. Google da aynı içeriğin iki sürümünü görür.':
    'O endereço http:// do seu site não redireciona para a versão criptografada https; ele abre a página por http simples. Quando os visitantes digitam o endereço à mão ou vêm de um link antigo, ficam na versão não segura e o navegador mostra o aviso "Não seguro". O Google também vê duas versões do mesmo conteúdo.',
  'Sunucunuzda ya da barındırma panelinizde "HTTPS\'e zorla" ayarını açın; yoksa tüm http isteklerini aynı adresin https karşılığına kalıcı (301) yönlendiren bir kural ekleyin.':
    'Ative a opção "Forçar HTTPS" no servidor ou no painel da hospedagem; caso contrário, adicione uma regra que redirecione permanentemente (301) toda solicitação http para o equivalente https do mesmo endereço.',
  "HSTS başlığı yok": "Sem cabeçalho HSTS",
  'Sayfa https ile açılıyor ama Strict-Transport-Security (HSTS) başlığı göndermiyor. Bu başlık tarayıcıya "bu siteye bundan sonra hep https ile gel" der. Olmadığında ilk istek http ile gidebilir ve araya giren biri ziyaretçiyi güvensiz sürüme düşürebilir.':
    'A página abre por https, mas não envia o cabeçalho Strict-Transport-Security (HSTS). Esse cabeçalho diz ao navegador "a partir de agora, sempre acesse este site por https". Sem ele, a primeira solicitação pode ir por http e alguém no meio pode rebaixar o visitante para a versão não segura.',
  "Sunucu yanıtına `Strict-Transport-Security: max-age=31536000; includeSubDomains` başlığını ekleyin. Önce tüm alt alan adlarınızın https ile çalıştığından emin olun; tarayıcı bu süre boyunca http'yi denemez.":
    "Adicione o cabeçalho `Strict-Transport-Security: max-age=31536000; includeSubDomains` à resposta do servidor. Antes, garanta que todos os subdomínios funcionem por https; os navegadores não vão tentar http durante esse período.",
  "X-Content-Type-Options başlığı yok": "Sem cabeçalho X-Content-Type-Options",
  "Sunucu `X-Content-Type-Options: nosniff` başlığını göndermiyor. Bu başlık tarayıcının dosya türünü tahmin etmesini engeller; yoksa yüklenen bir dosya betik gibi çalıştırılabilir. Sıralamayı etkilemez, sitenin güvenlik düzenini gösterir.":
    "O servidor não envia o cabeçalho `X-Content-Type-Options: nosniff`. Esse cabeçalho impede o navegador de adivinhar o tipo de um arquivo; sem ele, um arquivo enviado poderia ser executado como script. Não afeta o ranking; mostra a configuração de segurança do site.",
  "Sunucu yanıtlarına `X-Content-Type-Options: nosniff` başlığını ekleyin. Çoğu barındırma panelinde ya da CDN'de güvenlik başlıkları ayarından tek tıkla açılır.":
    "Adicione o cabeçalho `X-Content-Type-Options: nosniff` às respostas do servidor. Na maioria dos painéis de hospedagem ou CDNs, é uma opção de um clique nas configurações de cabeçalhos de segurança.",
  "Sayfa başka sitelerin çerçevesine gömülebiliyor":
    "A página pode ser incorporada em frames de outros sites",
  "Ne X-Frame-Options başlığı ne de Content-Security-Policy içinde frame-ancestors kuralı var. Başka bir site sayfanızı görünmez bir çerçeveye koyup ziyaretçiyi istemediği bir yere tıklatabilir (clickjacking). Sıralamayı etkilemez.":
    "Não há cabeçalho X-Frame-Options nem regra frame-ancestors em uma Content-Security-Policy. Outro site poderia colocar sua página em um frame invisível e enganar os visitantes para clicarem onde não pretendiam (clickjacking). Não afeta o ranking.",
  "Sayfanın başka sitelerde gösterilmesi gerekmiyorsa `Content-Security-Policy: frame-ancestors 'self'` ya da `X-Frame-Options: SAMEORIGIN` başlığını ekleyin.":
    "Se a página não precisa aparecer em outros sites, adicione o cabeçalho `Content-Security-Policy: frame-ancestors 'self'` ou `X-Frame-Options: SAMEORIGIN`.",
  "Referrer-Policy başlığı yok": "Sem cabeçalho Referrer-Policy",
  "Sunucu Referrer-Policy başlığı göndermiyor. Güncel tarayıcılar bu durumda güvenli bir varsayılan kullanır, yani acil bir sorun değil; ama başlık, ziyaretçi başka siteye geçtiğinde adresinizin ne kadarının paylaşılacağını sizin belirlemenizi sağlar.":
    "O servidor não envia um cabeçalho Referrer-Policy. Nesse caso, os navegadores atuais usam um padrão seguro, então não é urgente; mas o cabeçalho permite decidir quanto do seu endereço é compartilhado quando o visitante vai para outro site.",
  "Sunucu yanıtlarına `Referrer-Policy: strict-origin-when-cross-origin` başlığını ekleyin.":
    "Adicione o cabeçalho `Referrer-Policy: strict-origin-when-cross-origin` às respostas do servidor.",
  "SSL sertifikasının süresi 30 günden az":
    "O certificado SSL expira em menos de 30 dias",
  "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 30 günden az kaldı. Süre dolarsa tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar ve ziyaretçilerin çoğu geri döner. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.":
    "Segundo os registros públicos de certificados (Certificate Transparency), o certificado mais recente registrado para este domínio expira em menos de 30 dias. Se expirar, os navegadores abrem o site com um aviso de segurança de página inteira e a maioria dos visitantes desiste. O servidor pode já usar um certificado mais novo que ainda não chegou aos registros; confirme a data de validade pelo cadeado na barra de endereço do navegador.",
  "Sertifikanın otomatik yenilendiğini barındırma panelinizden kontrol edin. Let's Encrypt gibi otomatik sertifikalar genelde bitmeden 30 gün önce yenilenir; yenilenmediyse yenilemeyi elle başlatın.":
    "Confira no painel da hospedagem se o certificado é renovado automaticamente. Certificados automáticos como o Let's Encrypt costumam ser renovados 30 dias antes de expirar; se não foi renovado, inicie a renovação manualmente.",
  "SSL sertifikasının süresi dolmak üzere":
    "O certificado SSL está prestes a expirar",
  "Herkese açık sertifika kayıtlarına (Certificate Transparency) göre bu alan adı için kayıtlardaki en yeni sertifikanın bitmesine 14 günden az kaldı. Süre dolunca tarayıcılar siteyi tam sayfa güvenlik uyarısıyla açar; ziyaretçilerin çoğu siteye hiç giremez. Sunucu, kayıtlara henüz düşmemiş daha yeni bir sertifika kullanıyor olabilir; tarayıcıda adres çubuğundaki kilitten bitiş tarihine bakarak doğrulayın.":
    "Segundo os registros públicos de certificados (Certificate Transparency), o certificado mais recente registrado para este domínio expira em menos de 14 dias. Depois que expirar, os navegadores abrem o site com um aviso de segurança de página inteira; a maioria dos visitantes não consegue nem entrar. O servidor pode já usar um certificado mais novo que ainda não chegou aos registros; confirme a data de validade pelo cadeado na barra de endereço do navegador.",
  "Sertifikayı hemen yenileyin ve sunucuya yükleyin. Otomatik yenileme varsa neden çalışmadığına bakın (DNS kaydı değişmiş, doğrulama dosyasına erişilemiyor gibi).":
    "Renove o certificado agora e instale-o no servidor. Se a renovação automática estiver configurada, descubra por que ela não funcionou (por exemplo, um registro DNS alterado ou um arquivo de validação inacessível).",
  "Alan adının süresi 30 günden az": "O domínio expira em menos de 30 dias",
  "Alan adı kayıt bilgisine (RDAP) göre alan adınızın süresinin bitmesine 30 günden az kaldı. Yenilenmezse site ve e-postalar tamamen durur, alan adı başkasının eline geçebilir.":
    "Segundo os dados de registro do domínio (RDAP), seu domínio expira em menos de 30 dias. Se não for renovado, o site e o e-mail param completamente e o domínio pode acabar nas mãos de outra pessoa.",
  "Alan adını aldığınız firmadan süreyi uzatın ve otomatik yenilemeyi açın. Kayıttaki e-posta adresinin güncel olduğundan emin olun; hatırlatmalar oraya gider.":
    "Renove o registro com a empresa onde você comprou o domínio e ative a renovação automática. Garanta que o e-mail do registro esteja atualizado; os lembretes vão para ele.",
  "Alan adında SPF kaydı yok": "Nenhum registro SPF no domínio",
  "Alan adınızın DNS'inde SPF kaydı (v=spf1 ile başlayan TXT kaydı) yok. SPF, alan adınız adına hangi sunucuların e-posta gönderebileceğini söyler. Yoksa başkaları sizin adınıza sahte e-posta gönderebilir ve sizin gerçek e-postalarınız spam klasörüne düşebilir. SEO'yu doğrudan etkilemez.":
    "O DNS do seu domínio não tem registro SPF (um registro TXT que começa com v=spf1). O SPF diz quais servidores podem enviar e-mail em nome do seu domínio. Sem ele, outras pessoas podem enviar e-mails falsos em seu nome e seus e-mails reais podem cair no spam. Não afeta o SEO diretamente.",
  "E-postanızı gönderen hizmetin (Google Workspace, Microsoft 365, barındırma firması) önerdiği SPF kaydını DNS'e TXT olarak ekleyin. Alan adından hiç e-posta gönderilmiyorsa `v=spf1 -all` yeterlidir.":
    "Adicione ao DNS, como registro TXT, o SPF recomendado pelo serviço que envia seus e-mails (Google Workspace, Microsoft 365, sua empresa de hospedagem). Se o domínio não envia nenhum e-mail, `v=spf1 -all` é suficiente.",
  "Alan adında DMARC kaydı yok": "Nenhum registro DMARC no domínio",
  "Alan adınızda DMARC kaydı (_dmarc alt adında v=DMARC1 ile başlayan TXT kaydı) yok. DMARC, SPF ve DKIM kontrolünden geçemeyen e-postalara ne yapılacağını söyler. Gmail ve Yahoo toplu gönderim yapan alan adlarından bu kaydı istiyor. SEO'yu doğrudan etkilemez.":
    "Seu domínio não tem registro DMARC (um registro TXT que começa com v=DMARC1 no subdomínio _dmarc). O DMARC diz o que fazer com e-mails que falham nas verificações SPF e DKIM. Gmail e Yahoo exigem isso de domínios que enviam e-mail em massa. Não afeta o SEO diretamente.",
  "DNS'e `_dmarc` adıyla `v=DMARC1; p=none; rua=mailto:dmarc@alanadiniz.com` gibi bir TXT kaydı ekleyin. Raporları birkaç hafta izledikten sonra politikayı `quarantine` ya da `reject` yapın.":
    "Adicione ao DNS um registro TXT chamado `_dmarc`, como `v=DMARC1; p=none; rua=mailto:dmarc@seudominio.com.br`. Depois de acompanhar os relatórios por algumas semanas, mude a política para `quarantine` ou `reject`.",
  "Open Graph etiketleri eksik": "Tags Open Graph incompletas",
  "Sayfada Open Graph etiketleri var ama başlık, açıklama ve görselden biri ya da birkaçı eksik. Bu etiketler sayfa Facebook, LinkedIn, WhatsApp gibi yerlerde paylaşıldığında görünen kartı belirler. Eksik olanı paylaşılan platform kendisi tahmin eder; çoğu zaman yanlış görsel ya da kesik bir metin çıkar. Google sıralamasını etkilemez.":
    "A página tem tags Open Graph, mas falta o título, a descrição ou a imagem. Essas tags definem o card exibido quando a página é compartilhada no Facebook, LinkedIn, WhatsApp e lugares parecidos. A plataforma adivinha o que falta, o que muitas vezes significa a imagem errada ou um texto cortado. Não afetam o ranking no Google.",
  "Eksik etiketi ekleyin: og:title, og:description ve og:image üçü birlikte olmalı. Görsel en az 1200x630 piksel olsun. SEO eklentiniz varsa sosyal paylaşım bölümünü doldurmanız yeter.":
    "Adicione a tag que falta: og:title, og:description e og:image andam juntas. Use uma imagem de pelo menos 1200x630 pixels. Se você usa um plugin de SEO, basta preencher a seção de compartilhamento social dele.",
  "X (Twitter) kart etiketi yok": "Sem tag de card do X (Twitter)",
  "Sayfada Open Graph etiketleri var ama twitter:card etiketi yok. X başlık, açıklama ve görseli Open Graph'tan alabilir, ama kart türünü söyleyen bu etiket olmadan bağlantı kartsız, düz bir adres olarak görünebilir. Google sıralamasını etkilemez.":
    "A página tem tags Open Graph, mas não tem a tag twitter:card. O X pode pegar título, descrição e imagem do Open Graph, mas sem essa tag, que define o tipo de card, o link pode aparecer como um endereço simples, sem card. Não afeta o ranking no Google.",
  'Sayfanın head bölümüne <meta name="twitter:card" content="summary_large_image"> ekleyin. Diğer twitter: etiketlerine gerek yok; X eksikleri Open Graph etiketlerinden tamamlar.':
    'Adicione <meta name="twitter:card" content="summary_large_image"> ao head da página. As outras tags twitter: não são necessárias; o X as preenche a partir das tags Open Graph.',
  "Başlık etiketi ile H1 aynı": "A tag title e o H1 são idênticos",
  "Sayfanın başlık etiketi (<title>) ile H1 başlığı birebir aynı. Bu bir hata değil ve Google bunu cezalandırmaz. Ama iki farklı yer, iki farklı fırsat demek: başlık arama sonucunda tıklatmak için, H1 sayfaya gelen ziyaretçiye konuyu söylemek için yazılır. Aynı metin ikisinden birini boşa harcar.":
    "A tag title da página (<title>) e o H1 são exatamente iguais. Não é um erro e o Google não penaliza. Mas dois lugares são duas chances: o title é escrito para ganhar o clique nos resultados de pesquisa; o H1, para dizer ao visitante na página do que se trata. O mesmo texto desperdiça uma delas.",
  "Başlığı arama sonucu için yazın (ana kelime başta, marka sonda), H1'i sayfadaki okur için yazın. Konu aynı kalsın, ifade farklı olsun.":
    "Escreva o title para o resultado de pesquisa (palavra-chave principal primeiro, marca no fim) e o H1 para quem lê a página. Mantenha o assunto, varie as palavras.",
  "Başlık arama sonucunda kesilebilir":
    "O título pode ser cortado nos resultados de pesquisa",
  "Başlık 60 karakterin altında ama geniş harfler yüzünden yaklaşık 580 pikseli aşıyor. Google başlığı karakter sayısına göre değil, genişliğe göre keser; geniş büyük harfler (W, M) ve sayılar başlığı daha erken taşırır. Ölçüm, Google'ın masaüstünde kullandığı 20 piksellik Arial yazı tipine göre yapılan bir tahmindir.":
    "O título tem menos de 60 caracteres, mas letras largas o levam além de cerca de 580 pixels. O Google corta títulos pela largura, não pelo número de caracteres; maiúsculas largas (W, M) e dígitos enchem a linha mais rápido. A medida é uma estimativa baseada na fonte Arial de 20 pixels que o Google usa no computador.",
  "Başlığı kısaltın ya da büyük harfle yazılmış sözcükleri normal yazıma çevirin. En önemli kelimeleri başa alın; kesilme olursa sondaki marka adı gitsin.":
    "Encurte o título ou passe para minúsculas as palavras escritas em maiúsculas. Coloque as palavras mais importantes primeiro, para que, se algo for cortado, seja o nome da marca no final.",
  "Gereksiz meta keywords etiketi": "Tag meta keywords desnecessária",
  "Sayfada meta keywords etiketi var. Google bu etiketi yıllardır hiç kullanmıyor; sıralamaya ne katkısı ne zararı var. Tek etkisi, hedeflediğiniz kelimeleri rakiplerin kaynak koduna bakarak görebilmesi.":
    "A página tem uma tag meta keywords. O Google não usa essa tag há anos; ela não ajuda nem prejudica o ranking. O único efeito é que os concorrentes podem ver as palavras-chave que você mira olhando o código-fonte.",
  "Etiketi şablondan ya da SEO eklentisinin ayarlarından kaldırın. Acil değil; zamanınız olduğunda temizleyin.":
    "Remova a tag do template ou nas configurações do seu plugin de SEO. Não é urgente; limpe quando tiver tempo.",
  "Sayfa yakınlaştırmayı engelliyor": "A página bloqueia o zoom",
  "Sayfanın viewport etiketi kullanıcının yakınlaştırmasını kapatıyor (user-scalable=no ya da 2'den küçük maximum-scale). Az gören ziyaretçiler telefonda metni büyütemez. Erişilebilirlik standardı (WCAG) metnin %200'e kadar büyütülebilmesini ister; Lighthouse da bunu hata sayar.":
    "A tag viewport da página desativa o zoom (user-scalable=no ou um maximum-scale abaixo de 2). Visitantes com baixa visão não conseguem ampliar o texto no celular. O padrão de acessibilidade (WCAG) exige que o texto possa ser ampliado até 200%, e o Lighthouse conta isso como falha.",
  'Viewport etiketinden user-scalable=no ve maximum-scale değerlerini kaldırın: <meta name="viewport" content="width=device-width, initial-scale=1"> yeterlidir.':
    'Remova user-scalable=no e maximum-scale da tag viewport: <meta name="viewport" content="width=device-width, initial-scale=1"> é suficiente.',
  "En iyi uygulama: yeni sekmede açılan dış bağlantılarda noopener yok":
    "Boa prática: links externos que abrem em nova aba sem noopener",
  'Sayfada target="_blank" ile yeni sekmede açılan ama rel="noopener" ya da rel="noreferrer" taşımayan dış bağlantılar var. Güncel tarayıcılar (Chrome 88, Firefox 79 ve Safari 12.1\'den beri) target="_blank" bağlantılara noopener\'ı kendiliğinden uygular; yani bu bir güvenlik açığı değil, eski tarayıcılar için bir en iyi uygulama notudur. Sıralamayı etkilemez.':
    'A página tem links externos que abrem em nova aba com target="_blank", mas sem rel="noopener" nem rel="noreferrer". Os navegadores atuais (desde o Chrome 88, Firefox 79 e Safari 12.1) aplicam noopener sozinhos a links target="_blank", então não é uma falha de segurança, só uma nota de boa prática para navegadores antigos. Não afeta o ranking.',
  'Bu bağlantılara rel="noopener" ekleyin. Çoğu zaman tek bir şablon ya da editör ayarıdır.':
    'Adicione rel="noopener" a esses links. Geralmente é uma única configuração do template ou do editor.',
  'Adresi "javascript:" olan bağlantılar':
    'Links cujo endereço é "javascript:"',
  'Sayfada href değeri "javascript:" ile başlayan bağlantılar var. Google yalnızca gerçek bir adrese giden <a href> bağlantılarını izler; bunları izleyemez, yani gittikleri sayfaları bu yoldan bulamaz. Klavye ve ekran okuyucu kullananlar için de bunlar çoğu zaman çalışmaz.':
    'A página tem links cujo href começa com "javascript:". O Google só segue links <a href> que levam a um endereço real; ele não consegue seguir esses, então não encontra por eles as páginas para onde levam. Muitas vezes também não funcionam para quem usa teclado e leitor de tela.',
  "Bir sayfaya gidiyorsa href'e o sayfanın adresini yazın. Bir işlem yapıyorsa (menü açmak gibi) <a> yerine <button> kullanın.":
    "Se o link leva a uma página, coloque o endereço dela no href. Se ele executa uma ação (como abrir um menu), use um <button> em vez de um <a>.",
  "Aşağıdaki görseller hemen yükleniyor":
    "As imagens mais abaixo carregam imediatamente",
  'Sayfada ilk ekranın altında kalan altıdan fazla görsel loading="lazy" olmadan, sayfa açılır açılmaz yükleniyor. Ziyaretçi o kısma inmeden bant genişliği harcanır ve sayfa yavaşlar. Tahmin, ilk üç içerik görselinin ilk ekranda olduğunu varsayar ve yalnızca ana içerikteki (<main>, <article>) ya da büyük boyutlu görselleri sayar; logolar ve simgeler sayılmaz. Gerçek ekran düzeni farklı olabilir.':
    'Mais de seis imagens abaixo da primeira tela carregam assim que a página abre, sem loading="lazy". A banda é gasta antes de o visitante rolar até lá, e a página fica mais lenta. A estimativa considera que as três primeiras imagens de conteúdo estão na primeira tela e conta só imagens no conteúdo principal (<main>, <article>) ou de tamanho grande; logos e ícones não contam. O layout real pode ser diferente.',
  'İlk ekranın altındaki görsellere loading="lazy" ekleyin. İlk ekrandaki ana görsele eklemeyin; o görsel hemen yüklenmeli.':
    'Adicione loading="lazy" às imagens abaixo da primeira tela. Não adicione à imagem principal da primeira tela; essa deve carregar na hora.',
  "Görseller eski biçimde": "Imagens em formatos antigos",
  "Sayfadaki üç ya da daha fazla görsel JPEG, PNG ya da GIF biçiminde ve WebP ya da AVIF alternatifi yok (logolar, simgeler ve SVG'ler sayılmaz). Yeni biçimler aynı kalitede genelde %25-50 daha küçüktür; sayfa daha hızlı açılır. Tüm güncel tarayıcılar bu biçimleri destekler.":
    "Três ou mais imagens na página são JPEG, PNG ou GIF sem alternativa WebP ou AVIF (logos, ícones e SVGs não contam). Os formatos novos costumam ser de 25% a 50% menores com a mesma qualidade, então a página abre mais rápido. Todos os navegadores atuais oferecem suporte.",
  "Görselleri WebP ya da AVIF'e çevirin, ya da <picture> içinde bu biçimlerde bir <source> ekleyin. Çoğu CMS ve görsel eklentisi bunu otomatik yapabilir.":
    "Converta as imagens para WebP ou AVIF ou adicione um <source> nesses formatos dentro de um <picture>. A maioria dos CMSs e plugins de imagem faz isso automaticamente.",
  "Etiketi olmayan form alanları": "Campos de formulário sem rótulo",
  'Sayfadaki bazı form alanlarının (metin kutusu, seçim listesi) etiketi yok: ne <label>, ne aria-label, ne title, ne de yer tutucu metin. Ekran okuyucu kullanan ziyaretçi alana gelince yalnızca "düzenleme alanı" duyar, ne yazacağını bilemez. Lighthouse\'un erişilebilirlik denetimi de bunu hata sayar.':
    'Alguns campos de formulário na página (caixas de texto, listas de seleção) não têm rótulo: nem <label>, nem aria-label, nem title, nem placeholder. Um visitante que usa leitor de tela ouve só "editar texto" ao chegar no campo e não sabe o que digitar. A auditoria de acessibilidade do Lighthouse também conta isso como falha.',
  'Her alana görünür bir <label for="alan-id"> ekleyin. Tasarım görünür etikete izin vermiyorsa aria-label="E-posta adresi" gibi bir etiket verin.':
    'Dê a cada campo um <label for="id-do-campo"> visível. Se o design não permitir um rótulo visível, adicione um como aria-label="Endereço de e-mail".',
  "Aynı id birden çok öğede": "Mesmo id em vários elementos",
  "Sayfada aynı id değerini taşıyan birden fazla öğe var. id sayfada tek olmalı; tekrar ettiğinde form etiketleri, sayfa içi bağlantılar ve erişilebilirlik bağlantıları yanlış öğeye gider. Sıralamayı etkilemez, ama genelde bir bileşenin aynı sayfada iki kez kullanılmasından kaynaklanan bir şablon hatasıdır.":
    "Vários elementos da página compartilham o mesmo valor de id. Um id deve ser único na página; quando se repete, rótulos de formulário, links internos da página e referências de acessibilidade apontam para o elemento errado. Não afeta o ranking, mas geralmente é um bug de template em que um componente é usado duas vezes na mesma página.",
  "Tekrar eden id'leri bulun (tarayıcının geliştirici araçlarında document.querySelectorAll('[id]') ile) ve her birini benzersiz yapın; yalnızca stil için kullanılıyorsa class'a çevirin.":
    "Encontre os ids repetidos (com document.querySelectorAll('[id]') nas ferramentas para desenvolvedores do navegador) e torne cada um único; se um for usado só para estilo, transforme-o em classe.",
  "Sayfanın HTML yapısı çok büyük":
    "A estrutura HTML da página é grande demais",
  "Sayfada 1.500'den fazla HTML öğesi var. Lighthouse bu sınırdan sonra uyarı verir: büyük bir sayfa yapısı daha çok bellek harcar, stil hesaplamayı ve etkileşimi yavaşlatır, özellikle telefonda. Genelde her sayfada tekrarlanan dev menülerden, gizli ama yüklenen içerikten ya da iç içe geçmiş sayfa oluşturucu katmanlarından olur.":
    "A página tem mais de 1.500 elementos HTML. O Lighthouse avisa a partir desse ponto: uma estrutura grande usa mais memória e deixa mais lentos o cálculo de estilos e a interação, principalmente no celular. Geralmente vem de menus enormes repetidos em todas as páginas, conteúdo oculto que ainda carrega ou camadas aninhadas do construtor de páginas.",
  "Görünmeyen içeriği (kapalı menüler, sekmeler) gerektiğinde yükleyin, uzun listeleri sayfalara bölün, sayfa oluşturucunun gereksiz sarmalayıcı katmanlarını azaltın.":
    "Carregue o conteúdo que não está visível (menus fechados, abas) só quando necessário, divida listas longas em páginas e corte as camadas de contêiner desnecessárias do construtor de páginas.",
  "HTML öğeleri çok iç içe": "Elementos HTML aninhados profundamente demais",
  "Sayfada 32 kattan derin iç içe geçmiş HTML öğeleri var. Çok derin yapı stil hesaplamayı yavaşlatır ve genelde sayfa oluşturucuların her bölümü birkaç gereksiz kutuya sarmasından kaynaklanır.":
    "A página tem elementos HTML aninhados em mais de 32 níveis. Uma estrutura muito profunda deixa o cálculo de estilos mais lento e costuma vir de construtores de páginas que envolvem cada seção em várias caixas desnecessárias.",
  "Şablonda gereksiz sarmalayıcı <div> katmanlarını kaldırın; sayfa oluşturucu kullanıyorsanız iç içe bölüm ve sütunları azaltın.":
    "Remova do template as camadas de <div> desnecessárias; se usa um construtor de páginas, reduza seções e colunas aninhadas.",
  "Görünür metin, koda göre çok az":
    "Muito pouco texto visível em relação ao código",
  "Sayfanın görünür metni, HTML'nin onda birinden az. Bu tek başına bir sıralama sorunu değil; Google böyle bir oran ölçmez. Ama çoğu zaman sayfanın satır içi betik ve stil kodlarıyla şiştiğini ya da içeriğin ilk gelen HTML'de olmadığını gösterir.":
    "O texto visível da página é menos de um décimo do HTML. Por si só, isso não é problema de ranking; o Google não mede essa proporção. Mas muitas vezes mostra que a página está inchada com scripts e estilos inline ou que o conteúdo não está no HTML que chega primeiro.",
  "Satır içi büyük betik ve stilleri ayrı dosyalara taşıyın, kullanılmayan kodu kaldırın. İçerik JavaScript ile yükleniyorsa sayfa kaynağında da göründüğünden emin olun.":
    "Mova scripts e estilos inline grandes para arquivos separados e remova código não usado. Se o conteúdo é carregado com JavaScript, garanta que ele também apareça no código-fonte da página.",
  "Neredeyse aynı içerik": "Conteúdo quase duplicado",
  "Bu sayfaların ana içeriği neredeyse aynı; yalnızca birkaç kelime (şehir adı, renk, fiyat gibi) farklı. Menü, üst ve alt bilgi gibi her sayfada tekrar eden kısımlar karşılaştırmaya katılmaz. Google bu sayfalardan birini seçip diğerlerini arama sonucunda göstermeyebilir ve hangisini seçeceğine o karar verir. Genelde aynı şablonla çoğaltılmış konum, ürün çeşidi ya da etiket sayfalarında olur.":
    "O conteúdo principal destas páginas é quase igual; só algumas palavras (um nome de cidade, uma cor, um preço) mudam. Partes repetidas em todas as páginas, como menu, cabeçalho e rodapé, ficam fora da comparação. O Google pode escolher uma delas e deixar as outras fora dos resultados de pesquisa, e é ele quem decide qual. Isso costuma acontecer com páginas de localidade, variante de produto ou tag copiadas do mesmo template.",
  "Her sayfaya kendine özgü, işe yarar içerik ekleyin. Gerçekten aynı şeyi anlatıyorlarsa tek sayfada birleştirin ya da diğerlerine asıl sayfayı gösteren bir canonical ekleyin.":
    "Dê a cada página um conteúdo útil próprio. Se elas realmente dizem a mesma coisa, junte-as em uma página ou adicione nas outras uma canonical apontando para a página principal.",
  "Yapılandırılmış veride zorunlu özellikler eksik":
    "Faltam propriedades obrigatórias nos dados estruturados",
  "Sayfadaki yapılandırılmış veri (JSON-LD) bir türü bildiriyor ama Google'ın o tür için zorunlu saydığı özelliklerden bazıları yok. Bu, Product, FAQPage, BreadcrumbList ve LocalBusiness türleri içindir; eksik olunca arama sonucunda zengin görünüm (yıldız, fiyat, içerik haritası) çıkmaz.":
    "Os dados estruturados (JSON-LD) da página declaram um tipo, mas não têm algumas das propriedades que o Google considera obrigatórias para ele. Isso vale para Product, FAQPage, BreadcrumbList e LocalBusiness; sem elas, nenhum resultado aprimorado (estrelas, preço, trilha de navegação) aparece na pesquisa.",
  "Ayrıntıdaki eksik özellikleri işaretlemeye ekleyin ve sonucu Google'ın Zengin Sonuç Testi ile kontrol edin. İşaretleme sayfada gerçekten görünen bilgiyi anlatmalı; sayfada olmayan bir fiyatı ya da yorumu işaretlemek Google kurallarına aykırıdır.":
    "Adicione à marcação as propriedades que faltam listadas nos detalhes e confira o resultado no Teste de pesquisa aprimorada do Google. A marcação deve descrever informações realmente visíveis na página; marcar um preço ou avaliação que não está na página vai contra as diretrizes do Google.",
  "Yapılandırılmış veride önerilen özellikler eksik":
    "Faltam propriedades recomendadas nos dados estruturados",
  "Sayfadaki Article ya da Organization işaretlemesinde Google'ın önerdiği özelliklerden (başlık, görsel, tarih, yazar; ya da ad, web adresi, logo) bazıları yok. Google bu türler için zorunlu özellik saymaz, bu yüzden işaretleme geçerlidir ve zengin görünümü engellemez; önerilen özellikler yalnızca Google'ın sayfayı daha eksiksiz göstermesine yardım eder.":
    "A marcação Article ou Organization da página não tem algumas das propriedades que o Google recomenda (headline, image, data, autor; ou nome, URL, logo). O Google não lista propriedades obrigatórias para esses tipos, então a marcação é válida e não impede um resultado aprimorado; as propriedades recomendadas só ajudam o Google a mostrar a página de forma mais completa.",
  "Ayrıntıdaki özellikleri, sayfada gerçekten görünen bilgiyle işaretlemeye ekleyin ve sonucu Google'ın Zengin Sonuç Testi ile kontrol edin. Acil değildir; zorunlu özellik eksiklerinden sonra gelir.":
    "Adicione à marcação as propriedades listadas nos detalhes, usando informações realmente visíveis na página, e confira o resultado no Teste de pesquisa aprimorada do Google. Não é urgente; vem depois das propriedades obrigatórias que faltam.",
  "Sayfalarda Google Analytics etiketi bulunamadı":
    "Nenhuma tag do Google Analytics encontrada nas páginas",
  "Taranan sayfaların HTML'sinde Google Analytics 4 (G-), Google Etiket Yöneticisi (GTM-) ya da Universal Analytics (UA-) kimliği bulunamadı. Ölçüm yoksa hangi sayfanın ziyaretçi ve dönüşüm getirdiğini göremezsiniz. Etiket bir çerez onay aracı ya da başka bir betik tarafından sonradan yükleniyorsa burada görünmez; o durumda bu bulguyu yok sayabilirsiniz.":
    "Nenhum ID do Google Analytics 4 (G-), Google Tag Manager (GTM-) ou Universal Analytics (UA-) foi encontrado no HTML das páginas rastreadas. Sem medição, você não vê quais páginas trazem visitantes e conversões. Se a tag for carregada depois por uma ferramenta de consentimento de cookies ou outro script, ela não aparece aqui; nesse caso, pode ignorar esta descoberta.",
  "Google Analytics 4'te bir web veri akışı oluşturun ve verdiği etiketi tüm sayfaların head bölümüne ekleyin; ya da Etiket Yöneticisi kullanıyorsanız kapsayıcı kodunu ekleyin. Sonra Analytics'teki gerçek zamanlı raporda ziyaretinizin göründüğünü kontrol edin.":
    "Crie um fluxo de dados da Web no Google Analytics 4 e adicione a tag fornecida ao head de todas as páginas ou adicione o código do contêiner se usar o Tag Manager. Depois, confira se sua própria visita aparece no relatório Tempo real do Analytics.",
  "Sayfalardaki Analytics kimliği bağlı mülkle eşleşmiyor":
    "O ID do Analytics nas páginas não corresponde à propriedade conectada",
  "Sayfalarda bulunan Google Analytics 4 ölçüm kimliği (G-), bu projeye bağlı Analytics mülkünün web veri akışlarındaki kimliklerden hiçbiriyle eşleşmiyor. Yani ziyaretçi verisi büyük olasılıkla başka bir mülke gidiyor ve buradaki Analytics raporları siteyi göstermiyor. Eski bir mülkün kodu ya da kopyalanmış bir şablon genelde nedendir.":
    "O ID de métricas do Google Analytics 4 (G-) encontrado nas páginas não corresponde a nenhum dos IDs nos fluxos de dados da Web da propriedade do Analytics conectada a este projeto. Então, muito provavelmente os dados de visitantes estão indo para outra propriedade, e os relatórios do Analytics aqui não mostram este site. O código de uma propriedade antiga ou um template copiado é a causa mais comum.",
  "Ayrıntıdaki iki kimlik listesini karşılaştırın. Doğru mülk bağlıysa sayfalardaki etiketi o mülkün ölçüm kimliğiyle değiştirin; sayfalardaki doğruysa Ayarlar'dan projeye o mülkü bağlayın.":
    "Compare as duas listas de IDs nos detalhes. Se a propriedade certa está conectada, troque a tag nas páginas pelo ID de métricas dessa propriedade; se o das páginas está certo, conecte essa propriedade ao projeto em Configurações.",
  "{count} kontrol aşamasından geçti": "{count} verificações aprovadas",
  Ölçülmedi: "Não medido",
  "Geçen {count} kontrol": "{count} verificações aprovadas",
  Geçti: "Aprovado",
  "{count} sayfada": "Em {count} páginas",
  "Başlangıç sayfası okunamadığı için önizleme yok.":
    "Sem prévia, porque não foi possível ler a página inicial.",
  "Hız ölçülmedi": "Velocidade não medida",
  "Hız ölçülemedi": "Não foi possível medir a velocidade",
  "Başlangıç sayfası ölçülemedi; gösterilen, ölçülen en üst sayfa: {url}":
    "Não foi possível medir a página inicial; mostrando a página medida mais próxima da raiz: {url}",
  "Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok. Denetimi hız ölçümü açık başlatırsanız gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.":
    "Esta auditoria não tem medição do PageSpeed para a página inicial. Rode a auditoria com os testes de velocidade ativados, e os dados de usuários reais (CrUX) e os resultados de laboratório aparecem aqui.",
  "Temel Web Verileri": "Core Web Vitals",
  "Gerçek kullanıcı verisi Chrome Kullanıcı Deneyimi Raporu'ndan (CrUX, son 28 gün, mobil); laboratuvar sütunu PageSpeed Insights'ın tek ölçümü.":
    "Os dados de usuários reais vêm do Chrome User Experience Report (CrUX, últimos 28 dias, dispositivos móveis); a coluna de laboratório é uma única execução do PageSpeed Insights.",
  Metrik: "Métrica",
  "Bu sayfa, gerçek": "Esta página, usuários reais",
  "Tüm site, gerçek": "Site inteiro, usuários reais",
  "Anlık veri": "Dados instantâneos",
  "Site puanı {score}/100, {word}": "Pontuação do site {score}/100, {word}",
  "Uyarı ve bilgi": "Avisos e observações",
  "Kategori puanları": "Pontuações por categoria",
  "Tüm kontroller": "Todas as verificações",
  "{passed}/{total} geçti": "{passed}/{total} aprovadas",
  "Puan geçmişi": "Histórico da pontuação",
  "Son {count} denetimin puanı": "Pontuação das últimas {count} auditorias",
  "Öncekiyle aynı": "Igual à última vez",
  "{value} puan, öncekine göre": "{value} pontos desde a última auditoria",
  "Tarayıcı erişimi (robots.txt)": "Acesso dos rastreadores (robots.txt)",
  "Arama motorları ve yapay zekâ tarayıcıları sitenin ana sayfasını okuyabiliyor mu?":
    "Mecanismos de pesquisa e rastreadores de IA conseguem ler a página inicial do site?",
  "Arama motoru": "Mecanismo de pesquisa",
  "Yapay zekâ": "IA",
  Engelli: "Bloqueado",
  İzinli: "Permitido",
  "DNS kayıtları": "Registros DNS",
  "Bazı sorgular yanıt vermedi; liste eksik olabilir.":
    "Algumas consultas não responderam; a lista pode estar incompleta.",
  "Ölçüm etiketleri": "Tags de medição",
  "Sayfaların HTML'sinde bulunan Google Analytics ve Etiket Yöneticisi kimlikleri.":
    "IDs do Google Analytics e do Tag Manager encontrados no HTML das páginas.",
  "Hiçbir sayfada etiket bulunamadı.":
    "Nenhuma tag encontrada em nenhuma página.",
  "Yapılandırılmış veri türleri": "Tipos de dados estruturados",
  "Sayfaların JSON-LD ile bildirdiği schema.org türleri.":
    "Tipos do schema.org que as páginas declaram em JSON-LD.",
  "Hiçbir sayfada yapılandırılmış veri bulunamadı.":
    "Nenhum dado estruturado encontrado em nenhuma página.",
  "{date} (süresi doldu)": "{date} (expirado)",
  "{date} ({count} gün kaldı)": "{date} (faltam {count} dias)",
  "Sunucu ve yanıt": "Servidor e resposta",
  "{count} adım": "{count} saltos",
  "İlk bayt (TTFB)": "Primeiro byte (TTFB)",
  "Toplam yanıt": "Resposta total",
  "HTML boyutu": "Tamanho do HTML",
  Sıkıştırma: "Compactação",
  Önbellek: "Cache",
  Sunucu: "Servidor",
  "Teknoloji ipucu": "Indício de tecnologia",
  "Güvenlik başlıkları": "Cabeçalhos de segurança",
  "http'den https'e yönlendirme": "Redirecionamento de http para https",
  "Çerçeveye gömme koruması": "Proteção contra frames",
  "Alan adı ve sertifika": "Domínio e certificado",
  "Sertifika bilgisi herkese açık Certificate Transparency kayıtlarından; alan adı bilgisi RDAP'tan.":
    "Os detalhes do certificado vêm dos registros públicos de Certificate Transparency; os do domínio, do RDAP.",
  "Sertifikayı veren": "Emissor do certificado",
  "Sertifika bitişi": "Validade do certificado",
  "Kayıt firması": "Registrador",
  "Kayıt tarihi": "Registrado em",
  "Alan adı bitişi": "Validade do domínio",
  "Diğer adres": "Outro host",
  "Asıl adrese yönleniyor": "Redireciona para o host principal",
  "Ayrı açılıyor": "Abre separadamente",
  "Ana sayfaya yönleniyor": "Redireciona para a página inicial",
  "Doğru: {status}": "Correto: {status}",
  "Hatalı: {status} dönüyor": "Errado: retorna {status}",
  "Dosyalar ve hata sayfası": "Arquivos e página de erro",
  "robots.txt içinde Sitemap satırı": "Linha Sitemap no robots.txt",
  "Olmayan bir sayfa": "Uma página que não existe",
  "Bu denetim site bilgisi toplanmadan önce yapılmış. Sunucu, güvenlik başlıkları, DNS ve sertifika bilgisini görmek için denetimi yeniden çalıştırın.":
    "Esta auditoria foi feita antes de os detalhes do site serem coletados. Rode a auditoria novamente para ver o servidor, os cabeçalhos de segurança, o DNS e os detalhes do certificado.",
  "Google arama sonucu önizlemesi": "Prévia do resultado na Pesquisa Google",
  "(başlık yok)": "(sem título)",
  "(meta açıklama yok; Google sayfadan bir parça seçer)":
    "(sem meta descrição; o Google escolhe um trecho da página)",
  "Başlık {px} piksel; yaklaşık {max} pikselden sonrası kesiliyor.":
    "O título tem {px} pixels; o que passar de cerca de {max} pixels é cortado.",
  "Başlık {px} piksel, sığıyor.": "O título tem {px} pixels e cabe.",
  "Sayfanın başlığı yok.": "A página não tem título.",
  "Açıklama iki satıra sığmıyor; sonu kesilerek gösterilir.":
    "A descrição não cabe em duas linhas; o final é cortado.",
  "Paylaşım kartı önizlemesi (Open Graph)":
    "Prévia do card de compartilhamento (Open Graph)",
  "Görsel açılamadı": "Não foi possível carregar a imagem",
  "og:image yok": "Sem og:image",
  "Open Graph başlığı, açıklaması ve görseli tanımlı.":
    "Título, descrição e imagem do Open Graph estão definidos.",
  "Eksik: {tags}. Paylaşım siteleri yerine sayfadan tahmin eder.":
    "Faltam: {tags}. Os sites de compartilhamento os deduzem da página.",
  "Twitter kartı: {card}": "Card do Twitter: {card}",
  "Twitter kartı tanımlı değil.": "Nenhum card do Twitter definido.",
  "{url}: {critical} kritik, {warning} uyarı, {info} bilgi":
    "{url}: {critical} críticos, {warning} avisos, {info} observações",
  "{count} tıklama": "{count} cliques",
  "Son denetimden bu yana": "Desde a última auditoria",
  "{date} tarihli denetimle karşılaştırıldı.":
    "Comparado com a auditoria de {date}.",
  "Düzeltilenler ({count})": "Corrigidos ({count})",
  "Önceki denetimdeki sorunların hiçbiri tamamen gitmedi.":
    "Nenhum dos problemas da auditoria anterior sumiu por completo.",
  "Yeni çıkanlar ({count})": "Novos ({count})",
  "Yeni bir sorun türü çıkmadı.": "Nenhum tipo novo de problema apareceu.",
  "Search Console trafiği yükleniyor; sıralama birazdan güncellenebilir.":
    "Carregando o tráfego do Search Console; a ordem pode mudar em instantes.",
  "Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı ({start} – {end}).":
    "Ordem: impacto na pontuação, ponderado pelos cliques do Search Console das páginas afetadas ({start} – {end}).",
  "Search Console bağlı değil ya da yanıt vermedi; sıralama yalnızca puan etkisine göre.":
    "O Search Console não está conectado ou não respondeu; a ordem é só pelo impacto na pontuação.",
  "İlk {count} işi göster": "Mostrar as primeiras {count} tarefas",
  "Tüm {count} işi göster": "Mostrar todas as {count} tarefas",
  "{clicks} tıklama, {impressions} gösterim":
    "{clicks} cliques, {impressions} impressões",
  "ve {count} sayfa daha": "e mais {count} páginas",
  "Sıralama: puan etkisi, etkilenen sayfaların Search Console tıklamalarıyla ağırlıklandırıldı.":
    "Ordem: impacto na pontuação, ponderado pelos cliques do Search Console das páginas afetadas.",
  Tarayıcılar: "Rastreadores",
  "Başlık arama sonucunda kesiliyor.":
    "O título é cortado nos resultados de pesquisa.",
  "Bu denetimde başlangıç sayfası için PageSpeed ölçümü yok; gerçek kullanıcı verisi (CrUX) ölçülmedi.":
    "Esta auditoria não tem medição do PageSpeed para a página inicial; os dados de usuários reais (CrUX) não foram medidos.",
  "2. Anlık veri": "2. Dados instantâneos",
  "Siteniz hakkında denetim anında toplanan bilgiler: sunucu, güvenlik başlıkları, DNS, sertifika, robots.txt ve gerçek kullanıcı hızı.":
    "O que a auditoria coletou sobre seu site naquele momento: servidor, cabeçalhos de segurança, DNS, certificado, robots.txt e velocidade para usuários reais.",
  "Kategori başına 100 üzerinden puan": "Pontuação de 0 a 100 por categoria",
  Sorunlu: "Com problemas",
  "Puan etkisi": "Impacto na pontuação",
  "Puan etkisi, o kategorideki sorunların site puanından düşürdüğü puandır; hepsi düzelirse site puanına geri eklenir.":
    "O impacto na pontuação são os pontos que os problemas daquela categoria tiram da pontuação do site; corrija todos e eles voltam.",
  "Denetim tarihine göre site puanı": "Pontuação do site por data da auditoria",
  "1. Puan dağılımı ve kontroller": "1. Composição da pontuação e verificações",
  "Denetim, her sorun türünü bir kontrol olarak çalıştırır. Bulgusu olan kontrol sorunlu, ölçülüp temiz çıkan geçti sayılır; verisi toplanamayan kontrol ölçülmedi olarak kalır, ne geçti ne kaldı sayılır.":
    "A auditoria roda cada tipo de problema como uma verificação. Uma verificação com descobertas está com problemas, uma que foi medida e saiu limpa foi aprovada, e uma cujos dados não puderam ser coletados fica como não medida: não conta como aprovada nem como com problemas.",
  "Ölçülmedi ({count})": "Não medidas ({count})",
  "Ek C. Geçen ve ölçülemeyen kontroller":
    "Apêndice C. Verificações aprovadas e não medidas",
  "Sorun çıkmayan kontroller ve verisi toplanamadığı için sonuç verilmeyen kontroller.":
    "Verificações que não encontraram nada e verificações sem resultado porque os dados não puderam ser coletados.",
  "Ana içeriğin görünmesi": "Exibição do conteúdo principal",
  "Tıklamaya tepki": "Resposta a um toque",
  "Görsel kayma": "Deslocamento de layout",
  "İlk içerik": "Primeiro conteúdo",
  "Sunucunun ilk yanıtı": "Primeira resposta do servidor",
  İyileştirilmeli: "Precisa melhorar",
  Mükemmel: "Excelente",
  "Yapılacak her iş tek listede, en çok kazandıranı üstte. Search Console bağlıysa trafik getiren sayfalardaki işler öne çıkar.":
    "Todas as tarefas em uma lista, as mais valiosas primeiro. Com o Search Console conectado, o trabalho em páginas que trazem tráfego sobe na lista.",
  "Denetimin yaptığı her kontrol, kategorisine göre: geçenler, kalanlar ve ölçülemeyenler.":
    "Cada verificação que a auditoria fez, por categoria: aprovadas, com problemas e não medidas.",
  "Küçük iş": "Tarefa pequena",
  "Orta iş": "Tarefa média",
  "Büyük iş": "Tarefa grande",
  "{url} adresinin telefondaki görünümü": "{url} como aparece no celular",
  "Mobil hız ölçümünün son ekran görüntüsü":
    "Última captura de tela do teste de velocidade em dispositivos móveis",
  "yaklaşık {duration} kaldı": "cerca de {duration} restantes",
  "Hız ölçümü: {pages} sayfa × {devices} cihaz, Google PageSpeed ile. Google dakikada sınırlı ölçüme izin verdiği için bu adım en uzunu.":
    "Testes de velocidade: {pages} páginas × {devices} dispositivos, com o Google PageSpeed. O Google permite só um certo número de testes por minuto, então esta é a etapa mais longa.",
  "{done} / {total} ölçüm": "{done} / {total} testes",
  "Site haritası ve ana sayfanın bağlantılarından adresler toplanıyor.":
    "Coletando endereços do sitemap e dos links da página inicial.",
  "Her sayfa indirilip başlık, içerik, bağlantı ve teknik kontrollerden geçiriliyor.":
    "Baixando cada página e rodando as verificações de título, conteúdo, links e parte técnica.",
  "Bulgular puanlanıyor ve sonuçlar hazırlanıyor.":
    "Pontuando as descobertas e preparando os resultados.",
  "{shown} / {total} satır": "{shown} de {total} linhas",
  "{count} geçti": "{count} aprovadas",
  "{count} sorunlu": "{count} com problemas",
  "{count} ölçülmedi": "{count} não medidas",
  "{total} kontrol: {summary}": "{total} verificações: {summary}",
  "Kısmi veri": "Dados parciais",
  "{count} kontrol ölçülmedi: neden?": {
    one: "{count} verificação não medida: por quê?",
    other: "{count} verificações não medidas: por quê?",
  },
  "Düzeltilirse site puanına yaklaşık bu kadar eklenir; değerler toplanmaz.":
    "Quanto a correção adiciona, aproximadamente, à pontuação do site; os valores não se somam.",
  "{points} puan kayıp": "{points} pontos perdidos",
  "Hız ölçümü (PageSpeed) bu denetimde sonuç vermedi; nedeni Hız sekmesinde.":
    "O teste de velocidade (PageSpeed) não retornou resultados nesta auditoria; a aba Velocidade explica por quê.",
  "Sayfalar Google'da henüz kontrol edilmedi; Dizin durumu sekmesinden sorabilirsiniz.":
    "As páginas ainda não foram verificadas no Google; você pode pedir isso na aba Status de indexação.",
  "Karşılaştırma için bağlı bir Google Analytics mülkü ve sayfalarda bir G- etiketi gerekir.":
    "Esta comparação precisa de uma propriedade do Google Analytics conectada e de uma tag G- nas páginas.",
  "Site hakkındaki bilginin bir kısmı (sertifika, alan adı kaydı, DNS) bu denetimde okunamadı.":
    "Algumas informações do site (certificado, registro do domínio, DNS) não puderam ser lidas nesta auditoria.",
  "PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Ölçüm çalışınca gerçek kullanıcı verisi (CrUX) ve laboratuvar sonuçları burada görünür.":
    "O teste do PageSpeed não retornou resultados nesta auditoria: {error} Quando ele rodar, os dados de usuários reais (CrUX) e os resultados de laboratório aparecem aqui.",
  "Bu proje {auditedHost} için Google verisi okuyamıyor":
    "Este projeto não consegue ler dados do Google para {auditedHost}",
  "Projenin Search Console bağlantısı {propertyHost} mülküne ait. Google'a {auditedHost} sayfalarını sormak günlük kotayı boşa harcardı, bu yüzden dizin durumu, site haritaları ve kota bu denetimde gösterilmiyor. {auditedHost} için ayrı bir proje açıp kendi mülküne bağlayın.":
    "A conexão do Search Console do projeto pertence à propriedade {propertyHost}. Consultar o Google sobre páginas de {auditedHost} desperdiçaria a cota diária, então status de indexação, sitemaps e cota não aparecem nesta auditoria. Crie um projeto separado para {auditedHost} e conecte-o à propriedade dele.",
  "Siteyi ayrı proje olarak ekle": "Adicionar o site como projeto próprio",
  "Henüz kontrol edilmedi": "Ainda não verificado",
  "Bu denetimin Google'a sorulmamış sayfaları. Son kontrol {date}":
    "Páginas desta auditoria ainda não verificadas no Google. Última verificação {date}",
  "Bu denetimin Google'a sorulmamış sayfaları.":
    "Páginas desta auditoria ainda não verificadas no Google.",
  "En çok sayfayı etkileyen {count} sorun türü; kalan {hidden} tür aşağıdaki listede.":
    "Os {count} tipos de problema que afetam mais páginas; os outros {hidden} estão na lista abaixo.",
  "En çok sayfayı etkileyen {count} sorun türü.":
    "Os {count} tipos de problema que afetam mais páginas.",
  "Renklerin anlamı": "O que as cores significam",
  "Kısmi veri: {measured} / {total} ölçüm sonuç verdi. Ortalamalar yalnızca ölçülenlerden.":
    "Dados parciais: {measured} de {total} testes retornaram resultado. As médias usam só esses.",
  "Ayarlar'dan ücretsiz bir PageSpeed anahtarı ekleyip denetimi yeniden başlatın.":
    "Adicione uma chave gratuita do PageSpeed em Configurações e rode a auditoria novamente.",
  "PageSpeed anahtarı ekle": "Adicionar chave do PageSpeed",
  "{count} ölçüm yapılamadı": {
    one: "{count} teste não pôde ser feito",
    other: "{count} testes não puderam ser feitos",
  },
  "Sayfa başına telefon ve bilgisayar ayrı ölçülür.":
    "Cada página é testada separadamente no celular e no computador.",
  Ölçülemedi: "Não medido",
  "Google'ın ücretsiz günlük ölçüm kotası doldu. Bu sitenizden kaynaklanmıyor: sayfalar yavaş sayılmadı, yalnızca ölçülemedi.":
    "A cota diária gratuita de testes do Google acabou. Isso não é causado pelo seu site: as páginas não foram consideradas lentas, só não puderam ser medidas.",
  "PageSpeed anahtarı olmadan Google'ın herkesle paylaşılan ücretsiz kotası kullanılıyor ve bu kota doldu. Bu sitenizden kaynaklanmıyor.":
    "Sem uma chave do PageSpeed, é usada a cota gratuita do Google compartilhada por todos, e ela acabou. Isso não é causado pelo seu site.",
  "Google'ın dakikalık ölçüm sınırına takıldı. Bu sitenizden kaynaklanmıyor; bir süre sonra yeniden deneyin.":
    "Os testes atingiram o limite por minuto do Google. Isso não é causado pelo seu site; tente de novo um pouco mais tarde.",
  "Google'ın ölçüm aracı bu sayfalar için sonuç döndürmedi. Ayrıntı aşağıdaki listede.":
    "A ferramenta de testes do Google não retornou resultados para essas páginas. A lista abaixo tem os detalhes.",
  "Yapılacaklar ({count})": "A fazer ({count})",
  "Kontroller ({count})": "Verificações ({count})",
  "Hız ({measured}/{total})": "Velocidade ({measured}/{total})",
  "İlk denetim. Puanın seyri bir sonrakinde başlar.":
    "Primeira auditoria. A evolução da pontuação começa na próxima.",
  "Kritik sorun": "Problemas críticos",
  İyileştirme: "Melhorias",
  "Geçen kontrol": "Verificações aprovadas",
  "Veri toplanamadı": "Nenhum dado coletado",
  "{measured}/{total} kontrol ölçüldü":
    "{measured}/{total} verificações medidas",
  "Bu denetimde veri toplanamadı": "Nenhum dado coletado nesta auditoria",
  "{category}: {state}. Kontrolleri aç":
    "{category}: {state}. Abrir as verificações",
  "{findings} bulgu, {types} sorun türü. Bulgu, bir sorunun bir sayfada görülmesidir. Bir gruba tıklayın, liste yalnızca onları göstersin.":
    "{findings} descobertas, {types} tipos de problema. Uma descoberta é um problema visto em uma página. Clique em um grupo para mostrar só esses na lista.",
  "{allowed}/{total} izinli": "{allowed}/{total} permitidos",
  "{present}/{total} var": "{present}/{total} presentes",
  "Sertifikanın süresi doldu": "Certificado expirado",
  "Sertifika {count} gün geçerli": {
    one: "Certificado válido por {count} dia",
    other: "Certificado válido por {count} dias",
  },
  "Site ya da kayıt servisi denetim sırasında bu bilgilere yanıt vermedi. Sitenizde bir sorun olduğu anlamına gelmez; denetimi yeniden çalıştırınca tekrar sorulur.":
    "O site ou o serviço de registro não responderam a essas consultas durante a auditoria. Isso não significa que há algo errado com seu site; elas são feitas de novo quando você rodar a auditoria outra vez.",
  "Çubuk, sayfadaki sorun türlerinin önem ağırlıklı toplamı: bir kritik sorun 40, bir uyarı 15, bir bilgi 3 sayılır. En uzun çubuk en çok iş çıkaran sayfa.":
    "A barra é o total, ponderado pela gravidade, dos tipos de problema da página: um problema crítico conta 40, um aviso 15 e uma observação 3. A barra mais longa é a página com mais trabalho.",
  "Önce bunlar:": "Comece por aqui:",
  "ilk {count} iş.": {
    one: "{count} correção.",
    other: "as primeiras {count} correções.",
  },
  "ilk {count} iş birlikte site puanını yaklaşık {points} puan yükseltir.": {
    one: "{count} correção aumenta a pontuação do site em cerca de {points} pontos.",
    other:
      "juntas, as primeiras {count} correções aumentam a pontuação do site em cerca de {points} pontos.",
  },
  "ilk {count} iş, site puanını 1 puandan az yükseltir.": {
    one: "{count} correção aumenta a pontuação do site em menos de 1 ponto.",
    other:
      "as primeiras {count} correções aumentam a pontuação do site em menos de 1 ponto.",
  },
  "Bu sorun tek başına düzeltilirse yaklaşık kazanç; değerler toplanmaz.":
    "Quanto se ganha, aproximadamente, corrigindo só este problema; os valores não se somam.",
  "{points} puan": "{points} pontos",
  "Yeni kontroller eklendi; bu karşılaştırma yalnızca iki denetimin de ölçtüğü kontrolleri kapsar.":
    "Novas verificações foram adicionadas; esta comparação cobre só as verificações medidas pelas duas auditorias.",
  "Platform alan adı": "Domínio da plataforma",
  "Site bir barındırma platformunun alt alan adında; kaydı ve DNS'i platforma ait olduğu için alan adı ve DNS kontrolleri yapılmadı.":
    "O site está em um subdomínio de uma plataforma de hospedagem; o registro e o DNS pertencem à plataforma, então as verificações de domínio e DNS foram puladas.",
  "sayı alınamadı (tarama sınırı)":
    "contagem não lida (limite de rastreamento)",
  "Twitter kartı: ölçülmedi.": "Card do Twitter: não medido.",
  "Google hizmet hesabı kullanılıyor (Ayarlar'da kayıtlı). Bir OAuth istemcisi de tanımlı; hizmet hesabı önce gelir.":
    "Usando a conta de serviço do Google (salva em Configurações). Também há um cliente OAuth configurado; a conta de serviço tem prioridade.",
  "Google hizmet hesabı kullanılıyor (Ayarlar'da kayıtlı).":
    "Usando a conta de serviço do Google (salva em Configurações).",
  "Google OAuth istemcisi kullanılıyor (Ayarlar'da kayıtlı).":
    "Usando o cliente OAuth do Google (salvo em Configurações).",
  "Google OAuth istemcisi kullanılıyor (GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET ortam değişkenlerinden).":
    "Usando o cliente OAuth do Google (das variáveis de ambiente GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET).",
  "Google erişimi henüz girilmedi: Ayarlar'a bir hizmet hesabı ya da OAuth istemcisi girin. Girmeden Search Console ve Analytics bağlanamaz.":
    "Nenhum acesso do Google informado ainda: adicione uma conta de serviço ou um cliente OAuth em Configurações. O Search Console e o Analytics não conseguem se conectar sem isso.",
  "Orta düzeyde. Kritik sorun yok; uyarı sorunları aramadaki performansı gölgeliyor.":
    "Razoável. Nenhum problema crítico; os avisos estão segurando o desempenho na pesquisa.",
  "Zayıf. Kritik sorun yok, ama birikmiş uyarılar aramadaki performansı aşağı çekiyor; en çok puan getirenlerden başlayın.":
    "Ruim. Nenhum problema crítico, mas os avisos acumulados estão segurando o desempenho na pesquisa; comece pelos que valem mais pontos.",
  "PageSpeed ölçümü bu denetimde sonuç vermedi: {error} Gerçek kullanıcı verisi (CrUX) ölçülmedi.":
    "O PageSpeed não retornou resultados nesta auditoria: {error} Os dados de usuários reais (CrUX) não foram medidos.",
  "<strong>Laboratuvar ve gerçek kullanıcı verisi.</strong> Buradaki rakamlar Lighthouse'un laboratuvar ölçümüdür: tek bir sanal cihazda, kontrollü ağ ve işlemci koşulunda yapılır. Gerçek ziyaretçilerden toplanan alan verisi (Chrome Kullanıcı Deneyimi Raporu, CrUX), PageSpeed ölçümü varsa Anlık veri bölümündeki Temel Web Verileri tablosundadır. İkisi farklı çıkabilir. Google, sıralama sistemlerinde alan verisini (CrUX) kullanır; ama iyi bir değer tek başına sıralama garantisi vermez, içeriğin ilgili olması öncelik taşır.":
    "<strong>Dados de laboratório e dados de usuários reais.</strong> Estes números são medições de laboratório do Lighthouse, feitas em um único dispositivo simulado com rede e CPU controladas. Os dados de campo coletados de visitantes reais (Chrome User Experience Report, CrUX) estão na tabela Core Web Vitals da seção Dados instantâneos, quando o PageSpeed foi medido. Os dois podem ser diferentes. Os sistemas de classificação do Google usam dados de campo (CrUX), mas um bom valor sozinho não garante posição; conteúdo relevante vem primeiro.",
  "Puanlar, o sorun tek başına tamamen düzeltilirse site puanına eklenecek yaklaşık değerdir; değerler toplanmaz.":
    "Os pontos indicam aproximadamente quanto corrigir totalmente só aquele problema adiciona à pontuação do site; os valores não se somam.",
  Kapalı: "Desativado",
  "{measured} / {total} ölçüm": "{measured} de {total} medições",
  "Denetim tarihi": "Data da auditoria",
  "{count} (üst sınır {max})": "{count} (limite {max})",
  "Google dizin verisi": "Dados de indexação do Google",
  "Kritik kontrol": "Verificações críticas",
  "Temiz çıkan": "Saíram limpas",
  "Bir ayarı değiştirdim, uygulama görmüyor":
    "Mudei uma configuração e o app não reconhece",
  "Google erişimi, PageSpeed anahtarı ve dil Ayarlar ekranında girilir ve hemen geçerli olur. Windows paketinde .env dosyası ve ortam değişkeni yoktur.":
    "O acesso do Google, a chave do PageSpeed e o idioma são informados na tela Configurações e valem na hora. O pacote para Windows não tem arquivo .env nem variáveis de ambiente.",
  "Elle değiştirilebilen tek dosya {config}: adres numarası (port) ve kendiliğinden güncelleme. {dataFolder} ile açın, değiştirin, sonra {restart} deyin. Yanındaki {serverEnv} dosyasını düzenlemeyin; uygulama her açılışta onu yeniden yazar.":
    "O único arquivo que você edita à mão é {config}: a porta e as atualizações automáticas. Abra-o com {dataFolder} (Abrir pasta de dados), altere e depois escolha {restart} (Reiniciar). Não edite o arquivo {serverEnv} ao lado; o app o reescreve a cada inicialização.",
  "Ayarlar ekranında girilenler hemen geçerli olur. {env} dosyasındaki değişkenler (örneğin {port}, {host}, {token}) ise yalnızca konteyner yeniden oluşturulunca okunur: {command}":
    "O que você informa na tela Configurações vale na hora. As variáveis do arquivo {env} (por exemplo, {port}, {host}, {token}) só são lidas quando o contêiner é recriado: {command}",
  "Yalnızca yeniden başlatmak için: {command} Bu, .env değişikliğini uygulamaz. {docs}":
    "Só para reiniciar: {command} Isso não aplica uma mudança no .env. {docs}",
  "Ortam değişkenleri": "Variáveis de ambiente",
  "Rapor hazırlanıyor…": "Preparando o relatório…",
  "Dizin durumu kontrol ediliyor": "Verificando o status de indexação",
  "Sosyal ve yapılandırılmış veri": "Social e dados estruturados",
  // Audit failure and notice copy (auditFailureCopy.ts)
  "Denetim {phase} aşamasında durdu.": 'A auditoria parou na fase "{phase}".',
  "Denetim tamamlanamadan durdu.": "A auditoria parou antes de terminar.",
  "adres keşfi": "descoberta de URLs",
  tarama: "rastreamento",
  "hız ölçümü": "medição de velocidade",
  "sonuçların hazırlanması": "preparação dos resultados",
  "Bir adım zamanında bitmedi. Genelde site çok yavaş yanıt veriyor ya da bağlantıyı açık tutup bekletiyor.":
    "Uma etapa não terminou a tempo. Em geral, o site responde muito devagar ou mantém a conexão aberta sem responder.",
  "Birkaç dakika sonra yeniden deneyin. Yine olursa daha az sayfayla başlatın.":
    "Tente novamente em alguns minutos. Se voltar a acontecer, inicie com menos páginas.",
  "Denetim, uygulamanın kullanabildiği belleğe sığmadı. Çok büyük sayfalar ya da çok fazla sayfa buna yol açar.":
    "A auditoria não coube na memória que o aplicativo pode usar. Páginas muito grandes ou páginas demais causam isso.",
  "Daha az sayfayla yeniden başlatın.": "Inicie novamente com menos páginas.",
  "Denetim, uygulamanın izin verdiği işlemci süresini aştı. Çok büyük ya da çok karmaşık sayfalar buna yol açar.":
    "A auditoria passou do tempo de processador que o aplicativo permite. Páginas muito grandes ou complexas causam isso.",
  "Sonuçlar uygulamanın veritabanına yazılırken hata oluştu. Disk dolu ya da veri dosyası başka bir programda kilitli olabilir.":
    "Ocorreu um erro ao gravar os resultados no banco de dados do aplicativo. O disco pode estar cheio ou o arquivo de dados pode estar bloqueado por outro programa.",
  "Diskte boş yer olduğunu kontrol edin, uygulamayı yeniden başlatın ve denetimi yeniden başlatın.":
    "Verifique se há espaço livre no disco, reinicie o aplicativo e inicie a auditoria de novo.",
  "Bir adımın sonucu uygulamanın saklayabildiği boyutu aştı. Çok büyük siteler buna yol açar.":
    "O resultado de uma etapa passou do tamanho que o aplicativo consegue guardar. Sites muito grandes causam isso.",
  "Denetimi yürüten uygulamanın iç düzeni hata verdi.":
    "O mecanismo interno de auditoria do aplicativo informou um erro.",
  "Uygulamayı yeniden başlatın (tepsi menüsünde Yeniden başlat), sonra denetimi yeniden başlatın.":
    "Reinicie o aplicativo (Reiniciar no menu da bandeja) e inicie a auditoria de novo.",
  "Denetim yarıda kaldı. Uygulama denetimin ortasında kapanmış ya da yeniden başlamış olabilir.":
    "A auditoria foi interrompida. O aplicativo pode ter sido fechado ou reiniciado no meio dela.",
  "Uygulamanın açık kaldığından emin olun ve denetimi yeniden başlatın.":
    "Mantenha o aplicativo aberto e inicie a auditoria de novo.",
  "Kayıtlı Google ve PageSpeed anahtarlarını açan kurulum anahtarı denetimi yürüten bölüme ulaşmamış. Anahtarlarınız silinmedi.":
    "A chave de instalação que abre as chaves Google e PageSpeed salvas não chegou à parte do aplicativo que executa as auditorias. Suas chaves não foram apagadas.",
  "Uygulamayı güncelleyin ya da yeniden başlatın, sonra denetimi yeniden başlatın.":
    "Atualize ou reinicie o aplicativo e inicie a auditoria de novo.",
  "Denetim beklenmedik bir hatayla durdu.":
    "A auditoria parou com um erro inesperado.",
  "Denetimi yeniden başlatın. Tekrarlarsa Yardım'dan tanılama paketini indirip sorunu bildirin.":
    "Inicie a auditoria de novo. Se continuar, baixe o pacote de diagnóstico na Ajuda e relate o problema.",
  "Sorun sitenizde değil, uygulamada.":
    "O problema está no aplicativo, não no seu site.",
  "Büyük olasılıkla sorun sitenizin yavaş yanıt vermesinde; uygulamada bir arıza yok.":
    "Provavelmente o seu site está respondendo devagar; o aplicativo não tem defeito.",
  "Nedeni belirlenemedi.": "Não foi possível determinar a causa.",
  "{count} sayfa tarandı ve kaydedildi; aşağıdaki sonuçlar bu sayfalara dayanır.":
    {
      one: "{count} página foi rastreada e salva; os resultados abaixo se baseiam nela.",
      other:
        "{count} páginas foram rastreadas e salvas; os resultados abaixo se baseiam nelas.",
    },
  "Kayıtlı PageSpeed anahtarı okunamadı; hız ölçümü anahtarsız yapıldı.":
    "Não foi possível ler a chave PageSpeed salva; a medição de velocidade foi feita sem chave.",
  "Tarama sonuçları etkilenmedi, ama hız ölçümü yalnızca ilk sayfalarla sınırlı kaldı. Uygulamayı güncelleyin ya da yeniden başlatın, sonra yeni bir denetim başlatın. Sürerse Ayarlar'dan PageSpeed anahtarını yeniden kaydedin.":
    "Os resultados do rastreamento não foram afetados, mas a medição de velocidade ficou limitada às primeiras páginas. Atualize ou reinicie o aplicativo e inicie uma nova auditoria. Se continuar, salve a chave PageSpeed de novo em Configurações.",
  // Audit score standing: coverage, provisional score, tier caps
  "Kısmi puan": "Pontuação provisória",
  "Gri çubuklar kısmi puandır: o denetimde kontrollerin önemli bir kısmı ölçülemedi.":
    "As barras cinzas são pontuações provisórias: grande parte das verificações daquela auditoria não pôde ser medida.",
  "{count} eksik denetim puansız olduğu için grafikte yok.": {
    one: "{count} auditoria incompleta não tem pontuação e não aparece no gráfico.",
    other:
      "{count} auditorias incompletas não têm pontuação e não aparecem no gráfico.",
  },
  "Kısmi puan — ölçüm kapsamı {percent}":
    "Pontuação provisória — cobertura das medições {percent}",
  "Kontrollerin önemli bir kısmı ölçülemediği için bu puan kesin değil; derece verilmedi.":
    "Grande parte das verificações não pôde ser medida, então esta pontuação não é definitiva e não recebe classificação.",
  "Eksik denetim — puan verilmedi": "Auditoria incompleta — sem pontuação",
  "Sorun listesi tam olmadığı için puan hesaplanmadı. Aşağıdaki bulgular taranan sayfalar için geçerli; tam bir puan için denetimi yeniden çalıştırın.":
    "A lista de problemas está incompleta, por isso nenhuma pontuação foi calculada. Os resultados abaixo valem para as páginas rastreadas; execute a auditoria de novo para obter uma pontuação completa.",
  kısmi: "provisória",
  "{category} ölçülmedi: {reason}": "{category} não medida: {reason}",
  "{category} ölçülmedi.": "{category} não medida.",
  "{category} kontrollerinin çoğu ölçülmedi: {reason}":
    "{category}: a maioria das verificações não foi medida: {reason}",
  "{category} kontrollerinin çoğu ölçülmedi.":
    "{category}: a maioria das verificações não foi medida.",
  "hız ölçümü kapalıydı": "a medição de velocidade estava desligada",
  "PageSpeed kotası doldu": "a cota do PageSpeed acabou",
  "PageSpeed anahtarı yok": "sem chave do PageSpeed",
  "hız ölçümü yapılmadı": "nenhuma medição de velocidade foi feita",
  "hız ölçümleri başarısız oldu": "as medições de velocidade falharam",
  "Search Console'dan dizin verisi alınmadı":
    "nenhum dado de indexação lido do Search Console",
  "Puan, ölçülen {count} kontrolün sonucuna göre.": {
    one: "Pontuação baseada na {count} verificação medida.",
    other: "Pontuação baseada nas {count} verificações medidas.",
  },
  "{count} kontrol ölçülemedi.": {
    one: "{count} verificação não pôde ser medida.",
    other: "{count} verificações não puderam ser medidas.",
  },
  "Her bulgu, önemine ve etkilediği sayfa oranına göre kendi kategorisinden puan düşer; site puanı yedi kategorinin ağırlıklı ortalamasıdır. Ölçülemeyen kontroller puanı ne artırır ne düşürür. Kontrollerin ağırlıklı kapsamı {coverage} değerinin altındaysa ya da Tarama, Dizine alma, İçerik veya Hız kategorisinde ölçülen kontrollerin oranı {heavy} değerinin altındaysa puan kısmidir ve derece verilmez. Kritik bir sorun varken puan en fazla {criticalCap}, {count} veya daha fazla uyarı varken en fazla {warningsCap} olur.":
    "Cada problema tira pontos da própria categoria conforme a gravidade e a parcela de páginas afetadas; a pontuação do site é a média ponderada das sete categorias. Verificações não medidas não a aumentam nem a reduzem. Se a cobertura ponderada ficar abaixo de {coverage}, ou a parcela medida de Rastreamento, Indexação, Conteúdo ou Velocidade ficar abaixo de {heavy}, a pontuação é provisória e não recebe classificação. Com um problema crítico a pontuação é no máximo {criticalCap}; com {count} ou mais avisos, no máximo {warningsCap}.",
  "Kritik sorun olduğu için puan en fazla {cap} olabilir. Önce kritik sorunlara bakın.":
    "Com um problema crítico a pontuação pode ser no máximo {cap}. Comece pelos problemas críticos.",
  "{count} veya daha fazla uyarı olduğu için puan en fazla {cap} olabilir.":
    "Com {count} ou mais avisos a pontuação pode ser no máximo {cap}.",
  "Denetim {count} sayfayla sınırlıydı; sitede daha fazla sayfa olabilir.": {
    one: "A auditoria estava limitada a {count} página; o site pode ter mais páginas.",
    other:
      "A auditoria estava limitada a {count} páginas; o site pode ter mais páginas.",
  },
  "Bulunan adres: {found}, taranan: {crawled}":
    "Endereços encontrados: {found}, rastreados: {crawled}",
  "Port: {actual} (ayarlanan: {configured})":
    "Porta: {actual} (configurada: {configured})",
  "seowatcher bu sefer {actual} numarasında çalışıyor çünkü {configured} başka bir program tarafından kullanılıyor (ör. eski bir Docker kopyası). Google bağlantısı {configured} için ayarlandı; o programı kapatıp seowatcher'ı yeniden başlatın.":
    "Desta vez o seowatcher está rodando em {actual} porque outro programa está usando {configured} (por exemplo, uma cópia antiga do Docker). O login do Google está configurado para {configured}; feche esse programa e reinicie o seowatcher.",
};
