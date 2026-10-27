/* eslint-disable max-lines -- locale dictionary */
// Complete pt UI catalog; existing translations are preserved.
/* eslint-disable max-lines -- locale translation data */
export const ptCatalog = {
  // installed-0.8.0 diagnostics: Google/Windows/audit failure causes
  "Bağlantıyı düzelt": "Corrigir a conexão",
  "Sürüm kaynağına ulaşılamadı: depo bulunamadı ya da gizli.":
    "Não foi possível acessar a fonte das versões: o repositório não foi encontrado ou é privado.",
  "Sürüm kaynağına ulaşılamadı: depo bulunamadı ya da gizli (GitHub 404). Yardım ekranından tanılama paketini indirip sorunu bildirin.":
    "Não foi possível acessar a fonte das versões: o repositório não foi encontrado ou é privado (GitHub 404). Baixe o pacote de diagnóstico na tela Ajuda e informe o problema.",
  "{host} site denetimi (eksik)": "Auditoria do site {host} (parcial)",
  "Eksik rapor: {why} Sorun listesi tam değil.":
    "Relatório parcial: {why} A lista de problemas está incompleta.",
  "Tepsi uygulaması 4 saniye içinde yanıt vermedi (zaman aşımı). Bilgisayar uykudan yeni uyandıysa birkaç saniye sonra Tekrar dene'ye basın; sürerse tepsi menüsünden Çıkış deyip uygulamayı yeniden açın.":
    "O aplicativo da bandeja não respondeu em 4 segundos (tempo esgotado). Se o computador acabou de sair da suspensão, clique em Tentar novamente em alguns segundos; se persistir, escolha Sair no menu da bandeja e abra o aplicativo de novo.",
  "Tepsi uygulamasının ayar servisine bağlanılamadı. Tepsi uygulaması kapanmış olabilir; seowatcher'ı Başlat menüsünden yeniden açın.":
    "Não foi possível conectar ao serviço de configurações do aplicativo da bandeja. Ele pode ter sido fechado; abra o seowatcher de novo pelo menu Iniciar.",
  "Bu ayar yönetici tarafından kilitlenmiş (HTTP 409). Yalnızca bilgisayarın yöneticisi değiştirebilir.":
    "Esta configuração está bloqueada por um administrador (HTTP 409). Só o administrador do computador pode alterá-la.",
  "Tepsi uygulaması bu isteği tanımadı (HTTP 403); sunucu ile tepsi uygulaması farklı oturumlardan kalmış olabilir. Tepsi menüsünden Çıkış deyip uygulamayı yeniden açın.":
    "O aplicativo da bandeja não reconheceu esta solicitação (HTTP 403); o servidor e o aplicativo podem ser de sessões diferentes. Escolha Sair no menu da bandeja e abra o aplicativo de novo.",
  "Tepsi uygulaması ayar isteğini reddetti (HTTP {status}). Uygulamayı tepsi menüsünden yeniden başlatın; sürerse Windows paketini güncelleyin.":
    "O aplicativo da bandeja recusou a solicitação (HTTP {status}). Reinicie o aplicativo pelo menu da bandeja; se persistir, atualize o pacote do Windows.",
  "Tepsi uygulaması tanınmayan bir yanıt döndürdü; uygulama ile tepsi sürümü uyuşmuyor olabilir. Windows paketini güncelleyin.":
    "O aplicativo da bandeja devolveu uma resposta não reconhecida; as versões podem não corresponder. Atualize o pacote do Windows.",
  "Google Analytics geçersiz bir yanıt döndürdü. Birazdan tekrar deneyin.":
    "O Google Analytics devolveu uma resposta inválida. Tente novamente em instantes.",
  "Google'a bağlanılamadı, birazdan tekrar deneyin. Neden: {reason}. Sürerse bu bilgisayarın internet bağlantısını kontrol edin.":
    "Não foi possível conectar ao Google, tente novamente em instantes. Motivo: {reason}. Se persistir, verifique a conexão de internet deste computador.",
  bilinmiyor: "desconhecido",
  "Search Console isteği geçersiz buldu (HTTP 400). Bu bir bağlantı sorunu değil; seçili boyut, filtre ya da arama türü bu mülkte kullanılamıyor.":
    "O Search Console rejeitou a solicitação (HTTP 400). Não é um problema de conexão; a dimensão, o filtro ou o tipo de pesquisa escolhido não está disponível para esta propriedade.",
  "Search Console bu mülke erişimi reddetti (HTTP {status}). Hesabın mülkte doğrulanmış yetkisi olduğunu kontrol edin ya da Ayarlar'dan bağlantıyı yenileyin.":
    "O Search Console negou acesso a esta propriedade (HTTP {status}). Verifique se a conta tem permissão verificada na propriedade ou renove a conexão em Configurações.",
  "Search Console mülkü bulunamadı (HTTP 404). Mülk Search Console'dan kaldırılmış olabilir; Ayarlar'dan yeniden seçin.":
    "Propriedade do Search Console não encontrada (HTTP 404). Ela pode ter sido removida do Search Console; selecione-a de novo em Configurações.",
  "Search Console istek sınırı doldu (HTTP 429). Birkaç dakika sonra tekrar deneyin.":
    "Limite de solicitações do Search Console atingido (HTTP 429). Tente novamente em alguns minutos.",
  "Search Console zamanında yanıt vermedi. Birazdan tekrar deneyin.":
    "O Search Console não respondeu a tempo. Tente novamente em instantes.",
  "Search Console geçici olarak yanıt vermiyor (HTTP {status}). Birazdan tekrar deneyin; sürerse Google'ın durum sayfasına bakın.":
    "O Search Console não está respondendo no momento (HTTP {status}). Tente novamente em instantes; se persistir, consulte a página de status do Google.",
  'Google Analytics Data API bu Google Cloud projesinde kapalı. Google Cloud Console\'da "Google Analytics Data API"yi etkinleştirip tekrar deneyin.':
    'A Google Analytics Data API está desativada neste projeto do Google Cloud. Ative "Google Analytics Data API" no Google Cloud Console e tente novamente.',
  "Bu rapor seçili Google Analytics mülküyle uyumlu değil (HTTP 400).":
    "Este relatório não é compatível com a propriedade do Google Analytics selecionada (HTTP 400).",
  "Google Analytics bağlantısının süresi dolmuş ya da iptal edilmiş. Ayarlar'dan yeniden bağlayın.":
    "A conexão com o Google Analytics expirou ou foi revogada. Reconecte em Configurações.",
  "Google Analytics bu mülke erişimi reddetti (HTTP 403). Bağlı hesaba ya da hizmet hesabına mülkte en az Görüntüleyen yetkisi verin.":
    "O Google Analytics negou acesso a esta propriedade (HTTP 403). Dê à conta conectada ou à conta de serviço pelo menos acesso de Leitor na propriedade.",
  "Google Analytics mülkü bulunamadı (HTTP 404). Mülk silinmiş ya da taşınmış olabilir; Ayarlar'dan yeniden seçin.":
    "Propriedade do Google Analytics não encontrada (HTTP 404). Ela pode ter sido excluída ou movida; selecione-a de novo em Configurações.",
  "Google Analytics raporlama kotası doldu (HTTP 429). Kota saatlik ve günlük yenilenir; daha sonra tekrar deneyin.":
    "A cota de relatórios do Google Analytics se esgotou (HTTP 429). Ela é renovada a cada hora e a cada dia; tente novamente mais tarde.",
  "Google Analytics geçici olarak yanıt vermiyor (HTTP {status}{reason}). Birazdan tekrar deneyin.":
    "O Google Analytics não está respondendo no momento (HTTP {status}{reason}). Tente novamente em instantes.",
  "Bu projeye bağlı bir Google Analytics mülkü yok. Ayarlar'dan bir mülk seçin.":
    "Nenhuma propriedade do Google Analytics está conectada a este projeto. Escolha uma em Configurações.",
  "Google Analytics geçici olarak yanıt vermiyor. Birazdan tekrar deneyin.":
    "O Google Analytics não está respondendo no momento. Tente novamente em instantes.",
  "{count} sayfa alınamadı (ağ hatası).": {
    one: "{count} página não pôde ser obtida (erro de rede).",
    other: "{count} páginas não puderam ser obtidas (erro de rede).",
  },
  "Bağlantı yeniden denemede de kurulamadı, bu sayfalar denetlenmedi ve bozuk sayılmadı. Çoğu zaman geçicidir; denetimi yeniden çalıştırın. Sürerse sitenin bu bilgisayardan açıldığını kontrol edin.":
    "A conexão falhou de novo na nova tentativa; estas páginas não foram auditadas e não contam como quebradas. Geralmente é temporário; execute a auditoria de novo. Se persistir, verifique se o site abre neste computador.",
  "Sunucudan yanıt alınamadı (bağlantı koptu ya da adres çözülemedi). Sayfa denetlenmedi ve bozuk sayılmadı; denetimi yeniden çalıştırın.":
    "Sem resposta do servidor (a conexão caiu ou o endereço não foi resolvido). A página não foi auditada e não conta como quebrada; execute a auditoria de novo.",
  "alınamadı (ağ hatası)": "não obtida (erro de rede)",
  "Toplam {count} site haritası dosyası okunamadı": {
    one: "No total, {count} arquivo de sitemap não pôde ser lido",
    other: "No total, {count} arquivos de sitemap não puderam ser lidos",
  },
  "Site haritası dosyası okunamadı": "Um arquivo de sitemap não pôde ser lido",
  "robots.txt dosyanızın ya da bir site haritası dizininin gösterdiği bir site haritası dosyasından hiç adres okunamadı. Ayrıntıda hangi dosya olduğu ve nedeni yazıyor: hata kodu, zaman aşımı, bağlantı hatası, siteden çıkan yönlendirme, XML olmayan içerik ya da boş liste. O dosyadaki sayfalar bu denetime site haritasından girmedi; Google da aynı hatayı görüyorsa onları da okuyamıyor olabilir.":
    "Nenhum endereço pôde ser lido de um arquivo de sitemap indicado pelo seu robots.txt ou por um índice de sitemaps. Os detalhes informam o arquivo e o motivo: código de erro, tempo esgotado, erro de conexão, redirecionamento para fora do site, conteúdo que não é XML ou lista vazia. As páginas desse arquivo não entraram nesta auditoria pelo sitemap; se o Google vê o mesmo erro, talvez também não consiga lê-las.",
  "Ayrıntıdaki adresi tarayıcıda açın. Hata kodu ya da yönlendirme varsa dosyayı doğru adreste yayınlayın veya robots.txt ve site haritası dizinindeki satırı düzeltin. Zaman aşımı ya da bağlantı hatası çoğu zaman geçicidir; denetimi yeniden çalıştırın, sürerse sunucunun yanıt süresine bakın. Search Console'daki Site Haritaları raporu Google'ın gördüğünü gösterir.":
    "Abra no navegador o endereço indicado nos detalhes. Se houver código de erro ou redirecionamento, publique o arquivo no endereço certo ou corrija a linha no robots.txt e no índice de sitemaps. Tempo esgotado ou erro de conexão geralmente é temporário; execute a auditoria de novo e, se persistir, verifique o tempo de resposta do servidor. O relatório Sitemaps do Search Console mostra o que o Google vê.",
  "Sunucu HTTP {status} döndürdü": "O servidor devolveu HTTP {status}",
  "Sunucu zamanında yanıt vermedi (zaman aşımı, yeniden denendi)":
    "O servidor não respondeu a tempo (tempo esgotado, nova tentativa feita)",
  "Bağlantı kurulamadı (ağ hatası, yeniden denendi)":
    "Não foi possível conectar (erro de rede, nova tentativa feita)",
  "Başka bir siteye ya da döngüye yönlendiriyor":
    "Redireciona para outro site ou em loop",
  "Dönen içerik site haritası XML'i değil":
    "O conteúdo devolvido não é XML de sitemap",
  "Dosya okundu ama hiç adres listelemiyor":
    "O arquivo foi lido, mas não lista nenhum endereço",
  "Hazırlık puanı": "Pontuação de preparação",
  "{completed} / {total} hazır": "{completed} / {total} prontos",
  "Puan; Google bağlantıları, güncel denetim, proje bilgisi ve ajan kurulumunun hazır olup olmadığını gösterir. Arama sırası ya da SEO başarısı değildir.":
    "Esta pontuação reflete se as conexões do Google, uma auditoria recente, o contexto do projeto e seu agente estão prontos. Não é uma classificação nem uma pontuação de desempenho de SEO.",
  "Denetimi yeniden başlatın": "Executar a auditoria novamente",
  "Önceki denetim tamamlanamadı. Yeniden deneyin.":
    "A auditoria anterior não foi concluída. Tente novamente.",
  "Yeniden denetle": "Executar novamente",
  "Denetim sürüyor": "Auditoria em andamento",
  "İlerlemeyi ve bitiş özetini denetim ekranında izleyin.":
    "Acompanhe o progresso e o resumo da conclusão na tela da auditoria.",
  "İlerlemeyi gör": "Ver progresso",
  "Sizin 'önemli' saydığınız hareket, örneğin form gönderme ya da satın alma. Tanımlı değilse hep 0 görünür.":
    "Uma ação que você considera importante, como o envio de um formulário ou uma compra. Mostra 0 até que uma seja configurada.",
  "Oturumların yüzde kaçında önemli saydığınız bir hareket (anahtar olay) gerçekleşti. Anahtar olay tanımlı değilse hep %0 görünür.":
    "A parcela de sessões em que ocorreu uma ação que você considera importante (um evento principal). Mostra 0% até que um evento principal seja configurado.",
  "Ziyaretçinin sayfada vakit geçirip bir şey yaptığı oturumların yüzdesi.":
    "A parcela de sessões em que o visitante passou algum tempo na página ou fez algo.",
  "Seçilen aralıkta siteyle gerçekten etkileşime giren (sayfada vakit geçiren ya da bir şey yapan) kişi sayısı.":
    "Pessoas que realmente interagiram com o site no intervalo selecionado (passaram algum tempo em uma página ou fizeram algo).",
  "Anahtar olay": "Eventos principais",
  "Olay türü": "Tipos de eventos",
  "En çok tetiklenen": "Mais acionados",
  "{count} kez, {share} pay": {
    one: "{count} vez, parcela de {share}",
    other: "{count} vezes, parcela de {share}",
  },
  "Tetikleyen kullanıcı": "Usuários que o acionaram",
  "En çok tetiklenen olayda": "No evento mais acionado",
  "Ürün geliri": "Receita de itens",
  "Satılan ürün": "Itens comprados",
  "Sepete eklenen": "Itens adicionados ao carrinho",
  "Görüntülenen ürün": "Itens visualizados",
  Arama: "Pesquisas",
  "Farklı terim": "Termos distintos",
  "En çok aranan": "Mais pesquisados",
  "{count} kez": { one: "{count} vez", other: "{count} vezes" },
  "Yalnızca bir kez aranan": "Pesquisado apenas uma vez",
  "Pay: {share}": "Parcela: {share}",
  "Google Analytics bağlı değil": "O Google Analytics não está conectado",
  "Raporlar, Analytics'teki sitenizden gelir. Önce bağlantıyı kurun.":
    "Os relatórios vêm do seu site no Analytics. Conecte-o primeiro.",
  "Analytics'i bağla": "Conectar Analytics",
  "{title}: toplam {total} {unit}.": "{title}: {total} {unit} no total.",
  "En büyük pay {label}, {share}.": "Maior parcela: {label}, {share}.",
  "Birine tıklayın, aşağıdaki tablo o satırlara daralsın.":
    "Clique em um item para restringir a tabela abaixo a essas linhas.",
  "Organik oturum grafiği yüklenemedi":
    "Não foi possível carregar o gráfico de sessões orgânicas",
  "{start} – {end} dönemine göre": "Em comparação com {start} – {end}",
  "Organik oturumlar": "Sessões orgânicas",
  "Seçtiğiniz aralık, gün gün.": "O intervalo selecionado, dia a dia.",
  Oturum: "Sessões",
  "Etkileşim oranı": "Taxa de engajamento",
  "Organik gelir": "Receita orgânica",
  "Bu aralıkta organik oturum yok, grafik boş.":
    "Não há sessões orgânicas neste intervalo, portanto o gráfico está vazio.",
  "{days} günde toplam {total} organik oturum. En yüksek gün {day}, {peak} oturum.":
    "{total} sessões orgânicas em {days} dias. Dia de pico: {day}, com {peak} sessões.",
  oturum: "sessões",
  "{dimension} bazında oturum payı": "Parcela de sessões por {dimension}",
  "{dimension} bazında kullanıcı payı": "Parcela de usuários por {dimension}",
  kullanıcı: "usuários",
  "Giriş sayfaları, oturuma göre": "Páginas de destino por sessões",
  "Sayfalar, görüntülenmeye göre": "Páginas por visualizações",
  görüntülenme: "visualizações",
  "Olaylar, tetiklenme sayısına göre": "Eventos por número de acionamentos",
  "anahtar olay": "eventos principais",
  "Ürünler, gelire göre": "Itens por receita",
  gelir: "receita",
  "Ürünler, satış adedine göre": "Itens por quantidade vendida",
  "satılan ürün": "itens comprados",
  "Ürünler, görüntülenmeye göre": "Itens por visualizações",
  "ürün görüntüleme": "visualizações de itens",
  "Arama terimleri, arama sayısına göre": "Termos de pesquisa por pesquisas",
  arama: "pesquisas",
  "Dönüşüm (anahtar olay) tanımlı olmadığı için bu filtre kullanılamıyor":
    "Este filtro está indisponível porque nenhuma conversão (evento principal) está configurada",
  "Etkileşimi düşük": "Engajamento baixo",
  "Etkileşim oranı yüzde 50'nin altında olan satırlar.":
    "Linhas com taxa de engajamento abaixo de 50%.",
  "Dönüşümü olan": "Com conversões",
  "En az bir anahtar olay getirmiş satırlar.":
    "Linhas que geraram pelo menos um evento principal.",
  "Geliri olan": "Com receita",
  "Gelir getirmiş ürünler.": "Itens que geraram receita.",
  "Etkileşim süresi düşük": "Baixo tempo de engajamento",
  "Kullanıcı başına etkileşim süresi {bar} altında kalan sayfalar (listenin ortancası {median}, yarısı {bar}).":
    "Páginas com tempo de engajamento por usuário abaixo de {bar} (a mediana da lista é {median}; metade dela é {bar}).",
  "Trafiği yüksek, dönüşümü düşük": "Alto tráfego, baixa conversão",
  "Oturumu ortancanın ({sessions}) üstünde ama oturum başına anahtar olay oranı ortancanın ({rate}) altında kalan sayfalar, bir de hiç olay getirmeyenler.":
    "Páginas com sessões acima da mediana ({sessions}), mas com taxa de eventos principais por sessão abaixo da mediana ({rate}), além daquelas sem nenhum evento principal.",
  Diğer: "Outro",
  "Bu dönemde anahtar olay kaydı yok":
    "Nenhum evento principal registrado neste período",
  "Mülkte hiçbir olay anahtar olay işaretli olmayabilir ya da işaretli olaylar bu aralıkta hiç olmamış olabilir.":
    "A propriedade pode não ter eventos marcados como eventos principais ou os eventos marcados podem não ter acontecido neste intervalo.",
  "Anahtar olay nasıl tanımlanır": "Como configurar eventos principais",
  "Bu dönemde ürün verisi yok": "Nenhum dado de item neste período",
  "Mülk e-ticaret olayı (ürün görüntüleme, sepete ekleme, satın alma) göndermiyor olabilir. Mağazası olmayan bir sitede bu normal.":
    "A propriedade pode não estar enviando eventos de e-commerce (visualizações de itens, adições ao carrinho, compras). Isso é normal para um site sem loja.",
  "GA4 e-ticaret ölçümü": "Medição de e-commerce do GA4",
  "Bu dönemde site içi arama kaydı yok":
    "Nenhuma pesquisa no site registrada neste período",
  "Sitede arama kutusu yoksa ya da site içi arama ölçümü kapalıysa bu rapor boş kalır. Açıkken de kimse bir şey aramadıysa boştur.":
    "Este relatório fica vazio se o site não tiver caixa de pesquisa ou se a medição da pesquisa no site estiver desativada. Também fica vazio quando ela está ativada, mas ninguém pesquisou.",
  "Gelişmiş ölçüm ve site içi arama": "Medição aprimorada e pesquisa no site",
  "Bu dönemde veri yok": "Nenhum dado neste período",
  "Google hiç satır vermedi ({reason}).":
    "O Google não retornou nenhuma linha ({reason}).",
  "Google bu aralık için satır vermedi. Mülkü yeni bağladıysanız veri birkaç gün sonra görünür.":
    "O Google não retornou nenhuma linha para este intervalo. Se você conectou a propriedade recentemente, os dados aparecerão após alguns dias.",
  "Şu an yalnızca Google organik aramadan gelen ziyaretler sayılıyor; tüm trafiğe bakmak sonucu değiştirebilir.":
    "No momento, somente as visitas da pesquisa orgânica do Google são contabilizadas; observar todo o tráfego pode alterar o resultado.",
  "Google'ın verdiği not: {reason}.": "Observação do Google: {reason}.",
  "Tüm trafiğe bak": "Ver todo o tráfego",
  "Ölçüm durumunu kontrol et": "Verificar o status da medição",
  "Listelenen {count} satırdan": {
    one: "Da {count} linha listada",
    other: "Das {count} linhas listadas",
  },
  "Analytics mülkü": "Propriedade do Analytics",
  "{shown} / {count} satır": {
    one: "{shown} / {count} linha",
    other: "{shown} / {count} linhas",
  },
  "{count} satır": {
    one: "{count} linha",
    other: "{count} linhas",
  },
  örneklenmiş: "amostradas",
  "eşik altı satırlar gizlendi": "linhas abaixo dos limites ocultas",
  "Hızlı filtreler": "Filtros rápidos",
  "Yalnızca Google organik aramadan gelen ziyaretleri gösterir.":
    "Mostra apenas visitas da pesquisa orgânica do Google.",
  "Sadece organik": "Somente orgânico",
  "Sayılar, listelenen tüm satırlara göre hesaplanır. Birden fazla filtre seçerseniz satırın hepsine uyması gerekir.":
    "As contagens se baseiam em todas as linhas listadas. Se você escolher mais de um filtro, uma linha precisa corresponder a todos eles.",
  "Filtreleri temizle": "Limpar filtros",
  "E-Tablolar'a aktar ({count} satır)": {
    one: "Exportar para o Sheets ({count} linha)",
    other: "Exportar para o Sheets ({count} linhas)",
  },
  "CSV ({count} satır)": {
    one: "CSV ({count} linha)",
    other: "CSV ({count} linhas)",
  },
  "Bu filtrelere uyan satır yok": "Nenhuma linha corresponde a esses filtros",
  "Seçtiğiniz filtrelerle hiçbir satır eşleşmiyor.":
    "Nenhuma linha corresponde aos filtros que você escolheu.",
  "Kanal grubu": "Grupo de canais",
  "Organik arama": "Pesquisa orgânica",
  "Tüm trafik": "Todo o tráfego",
  "Ziyaretçiler siteye hangi sayfadan giriyor ve o sayfada kalıp bir sonuca ulaşıyor mu?":
    "Por qual página os visitantes entram no site? Eles ficam e chegam a um resultado?",
  "Hangi sayfalar en çok görüntüleniyor ve okurlar orada ne kadar vakit geçiriyor?":
    "Quais páginas têm mais visualizações e quanto tempo os leitores passam nelas?",
  "Ziyaretçiler hangi kanallardan geliyor ve hangi kanal gerçekten sonuç getiriyor?":
    "De quais canais os visitantes vêm e qual deles realmente traz resultados?",
  "Sonuç saydığınız olaylar ne sıklıkla gerçekleşiyor ve kaç kişi tetikliyor?":
    "Com que frequência acontecem os eventos que você considera como resultados e quantas pessoas os acionam?",
  "Hangi ürünler görüntüleniyor, sepete ekleniyor ve gelir getiriyor? Mülkte e-ticaret ölçümü yoksa bu sekme boş kalır.":
    "Quais itens são visualizados, adicionados ao carrinho e geram receita? Esta aba fica vazia se a propriedade não medir e-commerce.",
  "Ziyaretçiler sitenizde ne arıyor? Bulamadıkları içerik, yazacağınız yeni sayfaların ipucudur.":
    "O que os visitantes pesquisam no seu site? O conteúdo que eles não encontram indica as novas páginas a escrever.",
  "Ziyaretçileriniz hangi cihazlardan geliyor ve cihaza göre deneyim nasıl değişiyor?":
    "Quais dispositivos seus visitantes usam e como a experiência muda de acordo com o dispositivo?",
  "Ziyaretçiler siteye hangi sayfadan giriyor, orada ne yapıyor.":
    "Em qual página os visitantes entram no site e o que eles fazem lá.",
  "Ölçüm durumu": "Status da medição",
  "Satır sayısı": "Linhas",
  "Analytics gerçekten ölçüyor mu? Mülkünüzün kurulum ayarlarını okur, rapor kotanızdan harcamaz.":
    "O Analytics está realmente medindo? Isto lê a configuração da sua propriedade e não usa a sua cota de relatórios.",
  "Kitleyi neye göre böl": "Dividir o público por",
  "Trafiği neye göre böl": "Dividir o tráfego por",
  "Rapor alınamadı": "Não foi possível carregar o relatório",
  "Web veri akışı yok": "Nenhum fluxo de dados da Web",
  "Bu mülke bir web veri akışı eklenmeden site trafiği hiç ölçülmez.":
    "O tráfego do site não é medido até que esta propriedade tenha um fluxo de dados da Web.",
  "Gelişmiş ölçüm kapalı": "Medição aprimorada desativada",
  "Kaydırma, dış bağlantı ve dosya indirme gibi olaylar toplanmıyor. Akış ayarlarından açabilirsiniz.":
    "Eventos como rolagens, cliques de saída e downloads de arquivos não são coletados. Você pode ativar a medição nas configurações do fluxo.",
  "Site içi arama ölçülmüyor": "A pesquisa no site não é medida",
  "Sitenizde arama kutusu varsa, ziyaretçilerin ne aradığını göremezsiniz.":
    "Se o seu site tiver uma caixa de pesquisa, você não poderá ver o que os visitantes pesquisam.",
  "Anahtar olay tanımlı değil": "Nenhum evento principal configurado",
  "Anahtar olay olmadan trafiğin sonuca dönüşüp dönüşmediği ölçülemez; her rapor oturum sayısında kalır.":
    "Sem eventos principais, não há como saber se o tráfego se transforma em resultados; todos os relatórios param na contagem de sessões.",
  "Envanter eksik olabilir": "O inventário pode estar incompleto",
  'Google bu mülkün listesini eksik verdi. Sayımlara ve "eksik yok" sonucuna tam güvenmeyin.':
    'O Google retornou uma lista incompleta para esta propriedade. Não confie totalmente nas contagens ou em um resultado "nada faltando".',
  Kaydırma: "Rolagens",
  "Dış bağlantı": "Cliques de saída",
  "Dosya indirme": "Downloads de arquivos",
  "Sayfa geçişleri": "Alterações de página",
  "Her tetiklemede sayılır": "Uma vez por evento",
  "Oturumda bir kez sayılır": "Uma vez por sessão",
  "Android uygulaması": "Aplicativo Android",
  "iOS uygulaması": "Aplicativo iOS",
  "Ölçüm durumu okunamadı": "Não foi possível ler o status da medição",
  "Web veri akışı": "Fluxos de dados da Web",
  "{count} akıştan web olanlar": {
    one: "Os da Web, de {count} fluxo",
    other: "Os da Web, de {count} fluxos",
  },
  "Web akışı yok": "Nenhum fluxo da Web",
  "Tüm akışlar web": "Todos os fluxos são da Web",
  "Önemli saydığınız hareket, örneğin form gönderme ya da satın alma. Tanımlı değilse rapor hep 0 gösterir.":
    "Uma ação que você considera importante, como o envio de um formulário ou uma compra. Os relatórios mostram 0 até que uma seja configurada.",
  "Özel boyut": "Dimensões personalizadas",
  "{count} özel metrik": {
    one: "{count} métrica personalizada",
    other: "{count} métricas personalizadas",
  },
  Bulgu: "Descobertas",
  "Kurulum eksiksiz": "A configuração está concluída",
  "Aşağıda açıklanıyor": "Explicado abaixo",
  "Ölçüm kurulumunda eksik yok.":
    "Nada está faltando na configuração de medição.",
  "adres yok": "nenhum endereço",
  "Gelişmiş ölçüm açık": "Medição aprimorada ativada",
  "{on} / {count} otomatik olay açık":
    "{on} / {count} eventos automáticos ativados",
  "Gelişmiş ölçüm": "Medição aprimorada",
  "Gelişmiş ölçüm; kaydırma, dış bağlantı tıklaması ve dosya indirme gibi olayları koda dokunmadan toplar. Kapalı olanlar raporlarda hiç görünmez.":
    "A medição aprimorada coleta eventos como rolagens, cliques de saída e downloads de arquivos sem tocar no código. Os eventos desativados nunca aparecem nos relatórios.",
  "açık:": "ativados:",
  "kapalı:": "desativados:",
  "Uygulama veri akışları": "Fluxos de dados do aplicativo",
  "Bu mülke bağlı, web dışındaki akışlar. Buradaki raporlar yalnızca web trafiğini kapsamaz; uygulama verisi de toplamlara karışır.":
    "Fluxos não Web vinculados a esta propriedade. Os relatórios aqui não se limitam ao tráfego da Web; os dados do aplicativo também estão incluídos nos totais.",
  "Sayım yöntemi": "Método de contagem",
  "Sayım yöntemi, aynı oturumda tekrarlanan bir olayın kaç kez sayılacağını belirler. Dönüşüm rakamlarını karşılaştırırken bu ayara bakın.":
    "O método de contagem decide quantas vezes um evento repetido em uma sessão é contado. Verifique-o ao comparar números de conversão.",
  "Google Analytics bağlandı": "Google Analytics conectado",
  "Google Analytics bağlantısı kesildi": "Google Analytics desconectado",
  "Bağlantı yükleniyor": "Carregando conexão",
  "Bu projenin bağlantısı kontrol edilemedi.":
    "Não foi possível verificar a conexão deste projeto.",
  "Tekrar dene": "Tentar novamente",
  Vazgeç: "Cancelar",
  "Bağlantıyı değiştirmek için Ayarlar'daki Google kurulumunu kontrol edin.":
    "Para alterar a conexão, verifique a configuração do Google em Configurações.",
  Gizle: "Ocultar",
  "Search Console bağlandı": "Search Console conectado",
  "Search Console bağlantısı kesildi": "Search Console desconectado",
  "Google erişim anahtarı eksik": "Chave de acesso do Google ausente",
  "Search Console'u bağlamak için önce Ayarlar'a Google erişim anahtarınızı girin.":
    "Para conectar o Search Console, primeiro insira sua chave de acesso do Google em Configurações.",
  "Ayarlar'ı aç": "Abrir Configurações",
  "Kurulum kılavuzunu aç": "Abrir o guia de configuração",
  görsel: "imagem",
  haber: "notícias",
  "{count} adres": {
    one: "{count} URL",
    other: "{count} URLs",
  },
  "{list} gönderilmiş": "Enviados: {list}",
  "Site haritaları okunamadı": "Não foi possível ler os sitemaps",
  "Search Console bağlı değil": "O Search Console não está conectado",
  "Site haritalarınızı Google'ın gözünden görmek için Search Console bağlantısı gerekir.":
    "Conecte o Search Console para ver seus sitemaps como o Google os vê.",
  Bağlantılar: "Conexões",
  "Google bu mülkün site haritalarını vermedi. Hesabınızın Search Console'da site haritası gönderme yetkisi yoksa, mülke erişseniz bile bu listeyi göremezsiniz.":
    "O Google não retornou os sitemaps desta propriedade. Se sua conta não puder enviar sitemaps no Search Console, você não poderá ver esta lista mesmo com acesso à propriedade.",
  "Gönderilmiş site haritası yok": "Nenhum sitemap enviado",
  "Google site haritası olmadan da sayfa bulur. Ama site haritası, hangi sayfaları önemsediğinizi ona doğrudan söylemenin yoludur.":
    "O Google também encontra páginas sem sitemap. Mas o sitemap é a forma de indicar diretamente ao Google quais páginas importam para você.",
  "Site haritaları": "Sitemaps",
  "Google'a gönderdikleriniz ve Google'ın onlarla ne yaptığı.":
    "O que você enviou ao Google e o que o Google fez com ele.",
  "dizin dosyası": "índice de sitemaps",
  "son indirme {date}": "última leitura {date}",
  "Google hiç indirmedi": "O Google nunca o leu",
  "{count} hata": {
    one: "{count} erro",
    other: "{count} erros",
  },
  "{count} uyarı": {
    one: "{count} aviso",
    other: "{count} avisos",
  },
  Hatalı: "Tem erros",
  İşlenmedi: "Pendente",
  Okundu: "Lido",
  İndirilmedi: "Não lido",
  "{provider} bağlantısı tamamlanmadı":
    "A conexão com {provider} não foi concluída",
  "Google girişi tamamlanmadı": "O login no Google não foi concluído",
  "Deneme zaman aşımına uğradı ya da yarıda kesildi. Tek bir tarayıcı sekmesinde yeniden deneyin ve Google adımlarını 10 dakika içinde bitirin. Tekrar ederse tarayıcınızın bu site için çerezlere izin verdiğinden emin olun.":
    "A tentativa expirou ou foi interrompida. Tente novamente em uma única aba do navegador e conclua as etapas do Google em até 10 minutos. Se isso acontecer novamente, verifique se seu navegador permite cookies para este site.",
  "{provider} bağlantısı iptal edildi":
    "A conexão com {provider} foi cancelada",
  "Google girişi iptal edildi": "O login no Google foi cancelado",
  "Google'ın izin ekranı kapatıldı ya da reddedildi. Hazır olduğunuzda yeniden deneyebilirsiniz.":
    "A tela de consentimento do Google foi fechada ou recusada. Você pode tentar novamente quando estiver pronto.",
  "Google hesabı zaten bağlı": "Conta do Google já vinculada",
  'Bu Google hesabı zaten başka bir kayıtta bağlı görünüyor. {provider} mülk seçicisini açıp hesabın yanındaki "Hesabı kaldır"a basın, sonra yeniden bağlayın.':
    'Esta conta do Google já aparece vinculada a outro registro. Abra o seletor de propriedades {provider}, clique em "Remover conta" ao lado da conta e conecte-a novamente.',
  "Bu Google hesabı zaten başka bir kayıtta bağlı görünüyor. Ayarlar'daki mülk seçicisinden hesabı kaldırıp yeniden bağlayın.":
    "Esta conta do Google já aparece vinculada a outro registro. Remova a conta do seletor de propriedades em Configurações e conecte-a novamente.",
  "Google ile konuşurken bir şeyler ters gitti. Yeniden deneyin. Sürerse hatanın ayrıntısı Yardım ekranındaki günlüklerde.":
    "Algo deu errado na comunicação com o Google. Tente novamente. Se continuar acontecendo, os detalhes do erro estão nos registros da tela Ajuda.",
  "{integration} için önce Ayarlar'a Google erişim anahtarınızı girin.":
    "Para usar {integration}, insira primeiro a sua chave de acesso Google em Configurações.",
  Bağlı: "Conectado",
  "Bağlı değil": "Não conectado",
  "Bu projenin bağlantısını tamamlamak için bir {name} mülkü seçin.":
    "Escolha uma propriedade {name} para concluir a conexão deste projeto.",
  "Bu projenin verisini görmek için {name} bağlayın.":
    "Conecte {name} para ver os dados deste projeto.",
  "Google açılıyor…": "Abrindo o Google…",
  "Mülk seç": "Escolher propriedade",
  Bağlan: "Conectar",
  "Google hesaplarını yönet": "Gerenciar contas do Google",
  Kapat: "Fechar",
  "Alan adı mülkü: tüm alt alan adlarını ve http/https adreslerini kapsar.":
    "Propriedade de domínio: abrange todos os subdomínios e URLs http e https.",
  "Mülkü veya hesabı değiştir": "Alterar propriedade ou conta",
  "Bağlantıyı kes": "Desconectar",
  "Bağlantı kesilirse bu projenin bu kaynağa bağlı ekranları boş kalır. Veriler silinmez; mülkü yeniden seçerek geri bağlayabilirsiniz.":
    "Se você desconectar, as telas deste projeto que dependem desta fonte ficarão vazias. Nenhum dado é excluído; escolha a propriedade novamente para reconectar.",
  "Bağlantı kesiliyor…": "Desconectando…",
  "Google hesabı kaldırıldı": "Conta do Google removida",
  "Google hesabı kaldırılsın mı?": "Remover conta do Google?",
  "Bu hesabın {name} bağlantısı seowatcher'dan kaldırılır. İstediğiniz zaman yeniden bağlayabilirsiniz.":
    "A conexão {name} desta conta foi removida do seowatcher. Você pode conectá-la novamente a qualquer momento.",
  "Bağlı projeler kontrol ediliyor": "Verificando projetos vinculados",
  "Bağlı projeler kontrol edilemedi.":
    "Não foi possível verificar projetos vinculados.",
  "Bu işlem {name} bağlantısını {count} projeden de kaldırır.": {
    one: "Isso também remove a conexão {name} de {count} projeto.",
    other: "Isso também remove a conexão {name} de {count} projetos.",
  },
  "Hiçbir proje etkilenmeyecek.": "Nenhum projeto será afetado.",
  "Hesap kaldırılamadı. Tekrar deneyin.":
    "Não foi possível remover a conta. Tente novamente.",
  "Kaldırılıyor…": "Removendo…",
  "Hesabı kaldır": "Remover conta",
  "Google hesabı · {id}": "Conta do Google · {id}",
  "Bir mülk seçin…": "Escolha uma propriedade…",
  "Google mülkleri": "Propriedades do Google",
  "Mülk veya hesap ara": "Pesquisar propriedades ou contas",
  "Mülk veya hesap ara…": "Pesquisar propriedades ou contas…",
  "Mülkler yüklenemedi.": "Não foi possível carregar as propriedades.",
  "{account} hesabını kaldır": "Remover conta {account}",
  "Bağlantının süresi doldu": "A conexão expirou",
  "{account} hesabını yeniden bağla": "Reconectar conta {account}",
  "Yeniden bağlan": "Reconectar",
  "Bu hesabın görebildiği bir GA4 mülkü yok. Henüz mülk oluşturmadıysanız analytics.google.com'dan oluşturun, sonra bu hesabı ona Görüntüleyen olarak ekleyin.":
    "Esta conta não pode ver nenhuma propriedade do GA4. Se você ainda não criou uma, crie-a em analytics.google.com e adicione esta conta a ela com o papel de Leitor.",
  "Bu hesabın görebildiği bir Search Console mülkü yok. Mülkü doğruladıysanız bu hesabı search.google.com/search-console adresinden kullanıcı olarak ekleyin.":
    "Essa conta não pode ver nenhuma propriedade do Search Console. Se você verificou a propriedade, adicione esta conta como usuário em search.google.com/search-console.",
  "Doğrulanmış erişim yok": "Sem acesso verificado",
  "Eşleşen mülk veya hesap yok": "Nenhuma propriedade ou conta correspondente",
  "Mülkleri bulmak için bir Google hesabı ekleyin.":
    "Adicione uma conta do Google para encontrar propriedades.",
  "Google hesabı ekle": "Adicionar conta do Google",
  "Kaydediliyor…": "Salvando…",
  "Mülkü kaydet": "Salvar propriedade",
  "Sıradaki adımlar": "Próximos passos",
  "En hızlı kazandıracak işten başlayın.":
    "Comece com o que compensa mais rápido.",
  "Acil bir iş görünmüyor. Denetim güncel ve kritik sorun yok.":
    "Nada urgente. A auditoria está atualizada e não há problemas críticos.",
  "Search Console'u bağlayın": "Conectar o Search Console",
  "Hangi kelimede kaçıncı sırada olduğunuzu yalnızca Google bilir. Bağlantı ücretsiz.":
    "Só o Google sabe a sua posição para cada palavra-chave. A conexão é gratuita.",
  Bağla: "Conectar",
  "İlk denetimi başlatın": "Execute sua primeira auditoria",
  "Sitenizi tarar, teknik sorunları önem sırasına göre listeler.":
    "Rastreia seu site e lista os problemas técnicos por gravidade.",
  Başlat: "Iniciar",
  "{count} kritik sorun var": {
    one: "{count} problema crítico",
    other: "{count} problemas críticos",
  },
  "Kritik sorunlar Google'ın sayfayı taramasını ya da dizine almasını engelleyebilir.":
    "Problemas críticos podem impedir o Google de rastrear ou indexar uma página.",
  Gör: "Visualizar",
  "Fırsatlara bakın": "Revisar oportunidades",
  "Sayfalarınız, sıralarına göre değil, üzerinde çalışmaya ne kadar değdiğine göre sıralı.":
    "Suas páginas, classificadas por quanto vale a pena trabalhar nelas e não por posição.",
  Aç: "Abrir",
  "Denetimi tazeleyin": "Atualizar a auditoria",
  "Son denetim {when}. Bu ekrandaki sayılar o denetimden geliyor.":
    "A última auditoria foi executada {when}. Os números desta tela vêm dela.",
  "{count} uyarı var": {
    one: "{count} aviso",
    other: "{count} avisos",
  },
  "Kritik değil ama Google'ın sayfayı anlamasını zorlaştırıyor.":
    "Não é crítico, mas torna a página mais difícil para o Google entender.",
  "Sitenizi ekleyin": "Adicione seu site",
  "Bu proje için siteyi ve ülkeyi belirleyin.":
    "Defina o site e o país deste projeto.",
  "Başka sitelerinizi de ekleyin": "Adicione seus outros sites",
  "Her site için ayrı proje açın.": "Crie um projeto separado para cada site.",
  "Yapay zeka ajanınızı bağlayın": "Conecte seu agente de IA",
  "seowatcher'ı Claude ya da tercih ettiğiniz ajanın içinden kullanın.":
    "Use o seowatcher de dentro do Claude ou do agente de sua preferência.",
  "Gerçek tıklamalarınızı ve sorgularınızı buraya getirin.":
    "Traga para cá seus cliques e consultas reais.",
  "Projeyi anlatın": "Descreva o projeto",
  "Ajanınız ve raporlarınız siteyi tanısın.":
    "Ajude seu agente e os relatórios a conhecer o site.",
  "Tercihiniz kaydedilemedi. Tekrar deneyin.":
    "Não foi possível salvar sua escolha. Tente novamente.",
  "Kurulum listesi": "Checklist de configuração",
  "Çalışma alanınızı kurun": "Configure seu espaço de trabalho",
  "Bir adım kaldı.": "Falta um passo.",
  "{count} adım kaldı.": {
    one: "{count} passo restante.",
    other: "{count} passos restantes.",
  },
  "Hepsi isteğe bağlı, istediğiniz zaman dönebilirsiniz.":
    "Tudo opcional; volte a qualquer hora.",
  "Tek proje bana yeter": "Um projeto é suficiente para mim",
  "Şimdilik geç": "Pular por enquanto",
  "{count} adım sonraya bırakıldı": {
    one: "{count} etapa adiada",
    other: "{count} etapas adiadas",
  },
  "{step} adımını geri al": "Restaurar a etapa {step}",
  "Geri al": "Restaurar",
  "{count} tamamlandı": "{count} concluídos",
  "Önceki döneme göre yüzde {percent} yüksek.":
    "{percent}% maior que o período anterior.",
  "Önceki döneme göre yüzde {percent} düşük.":
    "{percent}% menor que o período anterior.",
  "Aramada görünürlüğü doğrudan bozan sorunlar; önce bunlar.":
    "Problemas que prejudicam diretamente a visibilidade na pesquisa; corrija-os primeiro.",
  "Sıralamayı zamanla aşındıran, ama acil olmayan sorunlar.":
    "Problemas que desgastam o posicionamento ao longo do tempo, mas não são urgentes.",
  "Küçük iyileştirme fırsatları.": "Pequenas oportunidades de melhoria.",
  "{count} kritik": "{count} críticos",
  "{count} bilgi": "{count} informativos",
  "{severity}: {count} bulgu. {hint}": {
    one: "{severity}: {count} descoberta. {hint}",
    other: "{severity}: {count} descobertas. {hint}",
  },
  "Önem düzeyi": "Gravidade",
  "Kritik sorunlar sayfanın aramada görünmesini engelleyebilir, uyarılar sıralamayı zamanla aşındırır, bilgi notları ise küçük iyileştirmelerdir. Çubuğa ya da altındaki etiketlerden birine tıklarsanız sorun listesine geçersiniz.":
    "Problemas críticos podem manter uma página fora da pesquisa, os avisos desgastam o posicionamento ao longo do tempo e as notas informativas são pequenas melhorias. Clique na barra ou em um dos rótulos abaixo dela para abrir a lista de problemas.",
  "Son denetimin ne kadar eski olduğu okunamadı.":
    "Não foi possível saber há quanto tempo foi a última auditoria.",
  "Son denetimin üzerinden {count} gün geçti. Sitede değişiklik yaptıysanız yeni bir denetim başlatmak iyi olur.":
    {
      one: "Já se passou {count} dia desde a última auditoria. Se você alterou o site, vale a pena executar uma nova.",
      other:
        "Já se passaram {count} dias desde a última auditoria. Se você alterou o site, vale a pena executar uma nova.",
    },
  "Denetimi başlat": "Iniciar auditoria",
  "Son denetimde yeni çıkanlar": "Novidades na última auditoria",
  "Yeni sorun yok.": "Sem novos problemas.",
  Düzelenler: "Corrigido",
  "Düzelen sorun yok.": "Nenhum problema corrigido.",
  "{count} sayfa": { one: "{count} página", other: "{count} páginas" },
  "Site denetimi": "Auditoria do site",
  "Kırık bağlantılar, eksik etiketler ve dizine girme sorunları için sitenizi tarayın.":
    "Rastreie seu site em busca de links quebrados, tags ausentes e problemas de indexação.",
  "{count} sayfa tarandı · {date}": {
    one: "{count} página rastreada · {date}",
    other: "{count} páginas rastreadas · {date}",
  },
  "denetim sürüyor": "auditoria em andamento",
  "son denetim başarısız": "última auditoria falhou",
  Ayrıntılar: "Detalhes",
  "Denetim sürüyor, sonuçlar bittiğinde görünecek.":
    "A auditoria está em execução; os resultados aparecem quando ela termina.",
  "Son denetim tamamlanamadı, bu yüzden sonuç yok.":
    "A última auditoria não pôde ser concluída, portanto não há resultados.",
  "Sorun bulunamadı, siteniz sağlıklı görünüyor.":
    "Nenhum problema encontrado; seu site parece íntegro.",
  "+ {count} sorun daha": {
    one: "+ {count} problema",
    other: "+ {count} problemas",
  },
  "En çok sorunu olan sayfalar": "Páginas com mais problemas",
  "{count} sorun": { one: "{count} problema", other: "{count} problemas" },
  "Son {days} gün": "Últimos {days} dias",
  "Search Console verisi alınamadı":
    "Não foi possível carregar os dados do Search Console",
  "Bağlanınca görünür": "Aparece após a conexão",
  "Bu dönemde gösterim yok": "Não há impressões neste período",
  Tıklama: "Cliques",
  Gösterim: "Impressões",
  "Tıklama oranı": "CTR",
  "Ortalama sıra": "Posição média",
  "{period} · düşük sayı daha iyi: 1, listenin en üstü demek":
    "{period} · quanto mais baixo, melhor: 1 corresponde ao primeiro lugar",
  Panel: "Painel",
  "Panel yüklenemedi": "Não foi possível carregar o painel",
  "Denetim özeti yüklenemedi":
    "Não foi possível carregar o resumo da auditoria",
  "Bu istemi ajanınıza yapıştırın; seowatcher'ı sizin için kendiliğinden kuracak.":
    "Cole este prompt em seu agente; ele configura o seowatcher para você.",
  "seowatcher eklentisi": "plugin do seowatcher",
  "Ajan bağlantısı (MCP) ve hazır SEO görevleri":
    "Conexão do agente (MCP) e tarefas de SEO prontas",
  "Kurulum istemini kopyala": "Copiar prompt de configuração",
  "Kurulum istemi kopyalandı": "Prompt de configuração copiado",
  "Kurulumu elle yapın": "Configure-o manualmente",
  "Ne sattığınız, kimi hedeflediğiniz ve hangi sayfaların para kazandırdığı burada duruyor. Rapor şablonları ve bağladığınız ajan bu bilgiyi okuyor; boşken ikisi de siteyi tanımadan yorum yapıyor.":
    "É aqui que você registra o que vende, qual é o seu público e quais páginas geram receita. Os modelos de relatório e o agente conectado leem estas informações; enquanto estiver vazio, ambos comentam sem conhecer o site.",
  "Proje bilgisini doldurun": "Preencha o contexto do projeto",
  'Her sitenin araştırmasını, sıralamalarını ve bağlantılarını kendi projesinde tutun. Yan menüdeki proje değiştiriciden "Yeni proje" diyerek istediğiniz zaman ekleyebilirsiniz.':
    'Mantenha as pesquisas, posições e conexões de cada site no próprio projeto. Adicione um a qualquer momento com "Novo projeto" no seletor de projetos da barra lateral.',
  "Başka bir proje oluştur": "Criar outro projeto",
  "Bir site listeniz mi var? Ajanınız hepsini kursun.":
    "Tem uma lista de sites? Deixe seu agente configurar todos eles.",
  "{link}, sonra site listenizle birlikte bu istemi yapıştırın.":
    "{link} e depois cole este prompt com a sua lista de sites.",
  "Ajanınızı bağlayın": "Conecte seu agente",
  "Proje istemini kopyala": "Copiar prompt do projeto",
  "Proje istemi kopyalandı": "Prompt de projeto copiado",
  "Site kaydedildi": "Site salvo",
  "Siteniz kaydedilemedi. Tekrar deneyin.":
    "Não foi possível salvar seu site. Tente novamente.",
  "Bu projenin sitesini ekleyin ve müşterilerinizin arama yaptığı ülkeyi seçin. İkisini de proje ayarlarından istediğiniz zaman değiştirebilirsiniz.":
    "Adicione o site deste projeto e escolha o país de onde seus clientes pesquisam. Você pode alterar ambos nas configurações do projeto a qualquer momento.",
  "Site adresi": "Endereço do site",
  "Siteyi kaydet": "Salvar site",
  "{count} oturum": {
    one: "{count} sessão",
    other: "{count} sessões",
  },
  "Organik trafik": "Tráfego orgânico",
  Raporlar: "Relatórios",
  Yönet: "Gerenciar",
  "Google Analytics verileri yüklenemedi.":
    "Não foi possível carregar os dados do Google Analytics.",
  "Bu aralıkta organik arama trafiği kaydedilmemiş.":
    "Nenhum tráfego de pesquisa orgânica foi registrado neste intervalo.",
  "Aktif kullanıcı": "Usuários ativos",
  Sipariş: "Transações",
  "Gösterilecek oturum verisi yok.": "Nenhum dado de sessão para mostrar.",
  "{days} günde toplam {total} oturum. En yüksek gün {day}, {peak} oturum.":
    "{total} sessões em {days} dias. Dia de pico: {day}, com {peak} sessões.",
  "Kart gizlenemedi. Tekrar deneyin.":
    "Não foi possível ocultar o cartão. Tente novamente.",
  "Search Console ve Analytics aynı erişim anahtarını kullanır. Önce onu Ayarlar'a girin.":
    "O Search Console e o Analytics usam a mesma chave de acesso. Insira-a primeiro em Configurações.",
  "Google erişim anahtarını Ayarlar'a girin":
    "Insira a chave de acesso do Google em Configurações",
  "Tıklama eğilimi": "Tendência de cliques",
  "Sorguları aç": "Abrir consultas",
  "tıklama, son {days} gün": "cliques, últimos {days} dias",
  "önceki döneme göre": "vs. período anterior",
  "Son {days} günde {total} tıklama.":
    "{total} cliques nos últimos {days} dias.",
  "En yüksek gün {day}, {clicks} tıklama.":
    "Dia de pico: {day}, com {clicks} cliques.",
  tıklama: "cliques",
  "Sıra 5-20 arası sorgular": "Consultas nas posições 5 a 20",
  "Tümünü gör": "Ver tudo",
  "Şu an 5. ile 20. sıra arasında sorgu yok. Sorgular bu aralığa girdikçe burada listelenir.":
    "No momento, nenhuma consulta está entre as posições 5 e 20. Elas aparecerão aqui conforme entrarem nesse intervalo.",
  "{impressions} gösterim · sıra {position}":
    "{impressions} impressões · posição {position}",
  "seowatcher.io sitesini yeni sekmede aç":
    "Abrir o site seowatcher.io em uma nova aba",
  Duyurular: "Avisos",
  "seowatcher ekibinden ürün, bakım ve güvenlik güncellemeleri.":
    "Atualizações de produto, manutenção e segurança da equipe seowatcher.",
  "Duyurular şu anda alınamıyor":
    "Os avisos não estão disponíveis neste momento",
  "Duyurular alınamadı ({status})":
    "Não foi possível carregar os avisos ({status})",
  "Bağlantınızı kontrol edip yeniden deneyin.":
    "Verifique a conexão e tente novamente.",
  "Şimdilik yeni duyuru yok": "Ainda não há avisos novos",
  "Yeni bir duyuru yayımlandığında burada görünecek.":
    "Os novos avisos aparecerão aqui quando forem publicados.",
  "Ürün yeniliği": "Novidade do produto",
  Bakım: "Manutenção",
  Güvenlik: "Segurança",
  Yeni: "Novo",
  "Sıralama takibi": "Acompanhamento de posições",
  Fırsatlar: "Oportunidades",
  "Kayıtlı kelimeler": "Palavras-chave salvas",
  "Arama performansı": "Desempenho da pesquisa",
  "Proje bilgisi": "Contexto do projeto",
  "Ajan kurulumu": "Configuração do agente",
  Ajan: "Agente",
  "Arama ve site": "Pesquisa e site",
  "Kenar çubuğunu kapat": "Fechar barra lateral",
  "Ana gezinme": "Navegação principal",
  Yardım: "Ajuda",
  Ayarlar: "Configurações",
  Kopyala: "Copiar",
  "Pano kullanılamıyor": "A área de transferência não está disponível",
  "Panoya kopyalanamadı":
    "Não foi possível copiar para a área de transferência",
  Kopyalandı: "Copiado",
  "Bir şeyler ters gitti. Lütfen yeniden deneyin.":
    "Algo deu errado. Tente novamente.",
  "Yeniden dene": "Tentar novamente",
  "Ana sayfa": "Página inicial",
  "Geri dön": "Voltar",
  "Sayfa bulunamadı": "Página não encontrada",
  "Bu adreste bir sayfa yok": "Não existe nenhuma página neste endereço",
  "Adres yanlış yazılmış ya da sayfa kaldırılmış olabilir. Panelden devam edebilir ya da Yardım'a bakabilirsiniz.":
    "O endereço pode estar incorreto ou a página pode ter sido removida. Você pode continuar no Painel ou consultar a Ajuda.",
  "Panele dön": "Voltar ao Painel",
  "{label} hakkında açıklama": "Sobre {label}",
  "Ülke: {country}": "País: {country}",
  seçilmedi: "não selecionado",
  "Ülke seçin": "Selecione um país",
  "Ülke ara": "Pesquisar países",
  "“{query}” ile eşleşen ülke yok": "Nenhum país corresponde a “{query}”",
  arttı: "subiu",
  azaldı: "desceu",
  Sürüyor: "Em andamento",
  Tamamlandı: "Concluído",
  Uyarı: "Aviso",
  Hata: "Erro",
  bekliyor: "aguardando",
  "Bu bölüm yüklenemedi": "Não foi possível carregar esta seção",
  "Uygulamaya ulaşılamadı. Uygulamanın açık olduğunu kontrol edip yeniden deneyin.":
    "Não foi possível acessar o app. Confirme se está em execução e tente novamente.",
  Yenile: "Atualizar",
  Güncellendi: "Atualizado",
  "Güncellendi: {time}": "Atualizado {time}",
  Güncelleniyor: "Atualizando",
  "Giriş gerekli": "Login necessário",
  "Bu kurulum dışarıdan bir giriş korumasının arkasında. Sayfayı yenileyip tekrar deneyin.":
    "Esta instalação está protegida por um sistema externo de login. Atualize a página e tente novamente.",
  "Seçimi kaldır": "Limpar seleção",
  "{total} {totalLabel}; en büyük pay {lead}, {share}.":
    "{total} {totalLabel}; a maior parcela é {lead}, {share}.",
  "{total} {totalLabel}.": "{total} {totalLabel}.",
  "Satırı seç: {name}": "Selecionar linha: {name}",
  "Satırı seç": "Selecionar linha",
  "Tüm satırları seç": "Selecionar todas as linhas",
  "{count} satır panoya kopyalandı": {
    one: "{count} linha copiada para a área de transferência",
    other: "{count} linhas copiadas para a área de transferência",
  },
  "Google E-Tablolar'da yeni bir dosya açıp yapıştırın.":
    "Abra um novo arquivo no Google Sheets e cole.",
  "Google E-Tablolar'da yeni dosya aç": "Abrir novo arquivo no Google Sheets",
  "{label} sütununa göre sırala (şu an artan)":
    "Ordenar pela coluna {label} (atualmente por ordem crescente)",
  "{label} sütununa göre sırala (şu an azalan)":
    "Ordenar pela coluna {label} (atualmente por ordem decrescente)",
  "{label} sütununa göre sırala": "Ordenar pela coluna {label}",
  seçili: "selecionado",
  "Toplu işlemler": "Ações em lote",
  "Seçili satırları dışa aktar": "Exportar linhas selecionadas",
  "Dışa aktar": "Exportar",
  "Dışa aktarma seçenekleri": "Opções de exportação",
  "Sayfa başına satır": "Linhas por página",
  "Sayfa {page} / {total}": "Página {page} de {total}",
  "Sayfa {page}": "Página {page}",
  "Önceki sayfa": "Página anterior",
  "Sonraki sayfa": "Página seguinte",
  "Adresi kopyala": "Copiar URL",
  "Adres kopyalandı": "URL copiado",
  "Oturumunuz doğrulanamadı. Sayfayı yenileyip tekrar deneyin.":
    "Não foi possível verificar a sessão. Atualize a página e tente novamente.",
  "Giriş ayarı eksik. Yardım ekranındaki kurulum belgelerine bakın.":
    "A configuração de login está incompleta. Consulte o guia de configuração na tela Ajuda.",
  "Bu işlem için yetkiniz yok.":
    "Você não tem permissão para realizar esta ação.",
  "Kayıt bulunamadı.": "Registro não encontrado.",
  "Şu an çok fazla denetim çalışıyor. Biri bitince yeniden deneyin.":
    "Há muitas auditorias em execução. Tente novamente quando uma terminar.",
  "Bir denetim en çok {max} sayfa tarayabilir.":
    "Uma auditoria pode rastrear no máximo {max} páginas.",
  "Aynı anda çalışabilecek denetim sayısına ulaştınız. Biri bitene kadar bekleyin ya da çalışan birini silin.":
    "Você atingiu o limite de auditorias simultâneas. Aguarde uma terminar ou exclua uma auditoria em execução.",
  "Girdiğiniz bilgileri kontrol edip tekrar deneyin.":
    "Verifique as informações inseridas e tente novamente.",
  "Güvenlik nedeniyle bu adres taranamaz.":
    "Este endereço não pode ser rastreado por motivos de segurança.",
  "Çok fazla istek gönderildi. Biraz bekleyip tekrar deneyin.":
    "Foram enviadas muitas solicitações. Aguarde um pouco e tente novamente.",
  "Google bu isteği yanıtlamadı. Birazdan tekrar deneyin; sürerse Ayarlar'dan Google bağlantısını kontrol edin.":
    "O Google não respondeu a esta solicitação. Tente novamente em breve; se o problema persistir, verifique a conexão com o Google nas Configurações.",
  "Bu, zaten var olan bir kayıtla çakışıyor.":
    "Isto entra em conflito com um registro existente.",
  "Bir şeyler ters gitti. Yardım ekranından tanılama paketini indirip sorunu bildirin.":
    "Algo deu errado. Baixe o pacote de diagnóstico na tela Ajuda e relate o problema.",
  "Dışa aktarılacak veri yok": "Não há dados para exportar",
  "Bir site adresi girin, örneğin example.com.":
    "Insira o endereço de um site, por exemplo example.com.",
  "Bu bir site adresine benzemiyor.":
    "Isto não parece ser o endereço de um site.",
  "Geçerli bir alan adı girin, örneğin example.com.":
    "Insira um domínio válido, por exemplo example.com.",
  "Bu tarayıcıda pano erişimi yok.":
    "Este navegador não tem acesso à área de transferência.",
  "Ana içeriğe geç": "Pular para o conteúdo principal",
  "Kenar çubuğunu aç": "Abrir barra lateral",
  "Ana menü": "Menu principal",
  "Proje yüklenemedi": "Não foi possível carregar o projeto",
  "Proje bulunamadı": "Projeto não encontrado",
  "Bu proje silinmiş ya da arşivlenmiş olabilir.":
    "Este projeto pode ter sido excluído ou arquivado.",
  "Proje güncellendi": "Projeto atualizado",
  "Proje güncellenemedi": "Não foi possível atualizar o projeto",
  "Proje adı gerekli": "O nome do projeto é obrigatório",
  "Temel bilgiler": "Informações básicas",

  Ad: "Nome",
  "Yalnızca sizin içindir. Proje değiştiricide ve raporların başlığında görünür, Google'a gitmez.":
    "Visível só para você. Aparece no seletor de projetos e nos títulos dos relatórios e nunca é enviado ao Google.",
  "Alan adı": "Domínio",
  "(isteğe bağlı)": "(opcional)",

  "Kaydettiğiniz anahtar kelimeler bu ülke ve dile göre saklanır.":
    "As palavras-chave salvas são associadas a este país e idioma.",
  "Değişiklikleri kaydet": "Salvar alterações",
  "Proje arşivlendi": "Projeto arquivado",
  "Proje arşivlenemedi": "Não foi possível arquivar o projeto",
  "Projeyi arşivle": "Arquivar projeto",
  "Arşivlenen proje kenar çubuğundan kalkar ama hiçbir verisi silinmez. Denetimler, kelimeler ve raporlar durur, geri alınca aynen döner.":
    "O projeto arquivado sai da barra lateral, mas nenhum dado é excluído. As auditorias, palavras-chave e relatórios ficam pausados e voltam sem alterações quando você o restaurar.",
  "{name} projesini arşivlerseniz çalışma alanınızdan kaldırılır. Daha sonra Projeler sayfasından geri alabilirsiniz.":
    "Ao arquivar o projeto {name}, ele é removido do seu espaço de trabalho. Você pode restaurá-lo mais tarde na página Projetos.",
  "Evet, projeyi arşivle": "Sim, arquivar o projeto",
  "Bu projeyi arşivleyerek çalışma alanınızdan kaldırabilirsiniz.":
    "Arquive este projeto para removê-lo do seu espaço de trabalho.",
  "Tek projenizi arşivleyemezsiniz.":
    "Você não pode arquivar seu único projeto.",
  "Proje değiştir": "Mudar de projeto",
  "Proje ayarları": "Configurações do projeto",
  "Proje ara…": "Pesquisar projetos…",
  "Projeleri filtrele": "Filtrar projetos",
  Projeler: "Projetos",
  "“{query}” ile eşleşen proje yok": "Nenhum projeto corresponde a “{query}”",
  "Yeni proje": "Novo projeto",
  "Projeleri yönet": "Gerenciar projetos",
  "Projeler yüklenemedi.": "Não foi possível carregar os projetos.",
  "Projeler yükleniyor": "Carregando projetos",
  "Proje seçin": "Selecione um projeto",
  "Proje oluşturuldu": "Projeto criado",
  "Proje oluşturulamadı": "Não foi possível criar o projeto",
  "Projeyi oluşturduktan sonra Search Console'u bağlayın; arama ve sıralama verileri oradan gelir.":
    "Depois de criar o projeto, conecte o Search Console; os dados de pesquisa e posições vêm de lá.",
  "Kaydettiğiniz anahtar kelimeler bu ülke ve dile göre saklanır. Sonradan proje ayarlarından değiştirebilirsiniz.":
    "As palavras-chave salvas são associadas a este país e idioma. Você pode alterar isso mais tarde nas configurações do projeto.",
  "Proje oluştur": "Criar projeto",
  Ülke: "País",
  Dil: "Idioma",
  "Proje tanımı": "Descrição do projeto",
  "{count} bölümün hepsi dolu.": {
    one: "{count} seção preenchida.",
    other: "Todas as {count} seções estão preenchidas.",
  },
  "{total} bölümün {filled} tanesi dolu. Boş olan: {missing}.":
    "{filled} de {total} seções preenchidas. Vazias: {missing}.",
  "Gözden geçir": "Revisar",
  Doldur: "Preencher",
  Rakipler: "Concorrentes",
  "{count} rakip kayıtlı.": {
    one: "{count} concorrente salvo.",
    other: "{count} concorrentes salvos.",
  },

  "Rakip ekle": "Adicionar concorrente",
  "Önemli sayfalar": "Páginas importantes",
  "{count} önemli sayfa kayıtlı.": {
    one: "{count} página importante salva.",
    other: "{count} páginas importantes salvas.",
  },

  "Sayfa ekle": "Adicionar página",

  "Bağlı değil. Sıralama, arama performansı ve fırsatlar bu bağlantıya dayanır.":
    "Não conectado. O acompanhamento de posições, o desempenho da pesquisa e as oportunidades dependem desta conexão.",

  "PageSpeed anahtarı": "Chave do PageSpeed",

  "Anahtar gir": "Inserir chave",
  "İşin özeti": "Visão geral do negócio",
  "Şu anki hedef": "Objetivo atual",
  Konumlandırma: "Posicionamento",
  "Yazım tercihleri": "Preferências de escrita",
  "Ne satıyorsunuz, kim alıyor, nerede.":
    "O que você vende, quem compra e onde.",
  "Şu anda neyin peşindesiniz ve ne zamana kadar.":
    "O que você busca agora e até quando.",
  "Biri neden alternatifler yerine sizi seçsin.":
    "Por que alguém deveria escolher você em vez das alternativas.",
  "Üslup, kullanılmayacak kelimeler, girilmeyecek konular.":
    "Tom, palavras a evitar e assuntos a não abordar.",
  "örn. Bağımsız restoranlar için rezervasyon yazılımı. Alıcılar pazarlamacı değil, işletme sahipleri.":
    "ex.: Software de reservas para restaurantes independentes. Os compradores são os proprietários, não os profissionais de marketing.",
  "örn. Dördüncü çeyreğe kadar organik üyelikleri ikiye katlamak. Karşılaştırma sayfaları şu anki öncelik.":
    "ex.: Dobrar as inscrições orgânicas até o quarto trimestre. As páginas comparativas são a prioridade atual.",
  "örn. Bir öğleden sonrada kurulan tek rezervasyon aracı. Mevcut rakiplerden ucuz, kendin yap çözümlerden basit.":
    "ex.: A única ferramenta de reservas que se configura em uma tarde. Mais barata do que as opções estabelecidas e mais simples do que soluções faça-você-mesmo.",
  "örn. Sade ve doğrudan, abartı yok. “Kusursuz” ya da “devrim niteliğinde” yazmayın. Rakip fiyatlarına girmeyin.":
    "ex.: Simples e direto, sem exageros. Não use “perfeito” nem “revolucionário”. Não fale dos preços dos concorrentes.",

  "Proje bilgisi yüklenemedi":
    "Não foi possível carregar o contexto do projeto",
  "Henüz boş. Kendiniz doldurabilir ya da ajanınıza sitenizden taslak çıkarttırıp onaylayabilirsiniz.":
    "Ainda está vazio. Você pode preenchê-lo ou pedir ao agente que prepare um rascunho com base no seu site e depois aprová-lo.",
  Boş: "Vazio",
  "{count} bölüm kaydedilmedi": {
    one: "{count} seção não salva",
    other: "{count} seções não salvas",
  },
  "Özel bölümler": "Seções personalizadas",
  "Bir ajanın not aldığı, yukarıdaki bölümlere sığmayan her şey.":
    "Tudo o que um agente anotou e não cabe nas seções acima.",
  "Burada henüz bir şey yok. Ajanlar başka yere sığmayan önemli bir şey öğrendiklerinde buraya bir bölüm ekler.":
    "Ainda não há nada aqui. Quando os agentes descobrem algo importante que não se encaixa em outro lugar, adicionam uma seção aqui.",
  "{title} bölümünü düzenle": "Editar seção {title}",
  "{title} bölümünü sil": "Excluir seção {title}",
  "Bölüm başlığı": "Título da seção",
  "Bölüm içeriği": "Conteúdo da seção",
  "Merkez sayfa": "Página central",
  "Destek sayfası": "Página de apoio",
  "Dönüşüm sayfası": "Página de conversão",
  "Sitenin en önemli sayfaları. Tam liste olması gerekmez.":
    "As páginas mais importantes do site. Não precisa ser uma lista completa.",
  "Henüz önemli sayfa yok. Sıralamada olması gereken birkaç sayfayı ekleyin, ya da bir ajan son site denetiminizden bunları önersin.":
    "Ainda não há páginas importantes. Adicione algumas páginas que devem se posicionar ou peça a um agente que as sugira com base na auditoria do site mais recente.",
  "Hedef: {topic}": "Objetivo: {topic}",
  "{url} sayfasını düzenle": "Editar página {url}",
  "{url} sayfasını kaldır": "Remover página {url}",
  "Sayfa adresi": "URL da página",
  "Sayfa rolü": "Função da página",
  "Hedef konu (isteğe bağlı)": "Tópico-alvo (opcional)",
  "Hedef konu": "Tópico-alvo",
  "Notlar (isteğe bağlı)": "Notas (opcional)",
  "Sayfa notları": "Notas da página",
  "Kendinizi kıyasladığınız siteler.": "Sites com os quais você se compara.",
  "Henüz rakip yok. Rekabet ettiğiniz siteleri ekleyin, ya da bağladığınız ajandan bunları bulup buraya kaydetmesini isteyin.":
    "Ainda não há concorrentes. Adicione os sites com que você compete ou peça ao agente conectado para encontrá-los e salvá-los aqui.",
  "{domain} rakibini düzenle": "Editar concorrente {domain}",
  "{domain} rakibini kaldır": "Remover concorrente {domain}",
  "Rakip alan adı": "Domínio do concorrente",
  "Ad (isteğe bağlı)": "Nome (opcional)",
  "Rakip adı": "Nome do concorrente",
  "Neden önemliler? Örn. her karşılaştırma aramasında önde (isteğe bağlı)":
    "Por que são importantes? Ex.: aparecem na frente em todas as pesquisas comparativas (opcional)",
  "Rakip notları": "Notas sobre o concorrente",
  "Proje bilgisi güncellendi": "Contexto do projeto atualizado",
  "Değişiklikleriniz kaydedilemedi": "Não foi possível salvar as alterações",
  siz: "você",
  ajan: "o agente",
  "yapay zeka istemciniz": "seu cliente de IA",
  "{author} güncelledi · {time}": "Atualizado por {author} · {time}",
  "{author} ekledi": "Adicionado por {author}",
  Kaldır: "Remover",
  Kaydet: "Salvar",
  "Ajanınıza doldurtabilirsiniz": "Peça ao agente para preencher",
  "Ajanınıza gözden geçirtin": "Peça ao agente para revisar",

  "İstemi kopyala": "Copiar prompt",
  "İstem kopyalandı": "Prompt copiado",
  "Araştırma günlüğü": "Registro de pesquisa",

  "Henüz kayıt yok. Bağladığınız ajan bir araştırma yaptıkça buraya yazar.":
    "Ainda não há registros. O agente conectado escreve aqui à medida que faz pesquisas.",
  "{date} tarihli kaydı sil": "Excluir registro de {date}",
  "Kurulum durumu": "Status da configuração",

  Tamam: "Concluído",
  Eksik: "Faltando",
  "Kontrol ediliyor": "Verificando",
  Denetlenemedi: "Não foi possível verificar",
  "Durum okunuyor…": "Lendo o status…",
  "Durum okunamadı. Yeniden deneyin.":
    "Não foi possível ler o status. Tente novamente.",
  "Şablona bir ad verin.": "Dê um nome ao modelo.",
  "Bu şablonun ne zaman kullanılacağını tek cümleyle yazın.":
    "Descreva em uma frase quando este modelo deve ser usado.",
  "Raporun kime yazıldığını ve hangi bölümlerden oluştuğunu yazın.":
    "Informe para quem é o relatório e que seções deve conter.",
  "Kitle: müşterinin pazarlama sorumlusu, teknik biri değil.\nBölümler, sırayla: Neredeyiz / Bu ay ne yaptık / Ne değişti / Sırada ne var.\nÜslup: sade ve kendinden emin. Her SEO terimini açıkla. Ünlem kullanma.\nİmza: Acme SEO\nVurgu rengi: #1C4ED8":
    "Público: responsável de marketing do cliente, não uma pessoa técnica.\nSeções, em ordem: Situação atual / O que fizemos este mês / O que mudou / Próximos passos.\nTom: simples e confiante. Explique todos os termos de SEO. Não use pontos de exclamação.\nAssinatura: Acme SEO\nCor de destaque: #1C4ED8",
  "Şablon oluşturuldu": "Modelo criado",
  "Şablon kaydedildi": "Modelo salvo",
  "Şablon kaydedilemedi": "Não foi possível salvar o modelo",
  "Şablonu düzenle": "Editar modelo",
  "Yeni şablon": "Novo modelo",
  "Aylık müşteri değerlendirmesi": "Revisão mensal do cliente",
  Açıklama: "Descrição",
  "Ne zaman kullanılacağını anlatan tek cümle. Bir ajan kararını buna bakarak verir.":
    "Uma frase que explica quando deve ser usado. O agente decide com base nela.",
  "Sürekli çalıştığımız müşterilere gönderdiğimiz aylık güncelleme.":
    "A atualização mensal que enviamos aos nossos clientes fixos.",
  Yönerge: "Instruções",
  "Projenin geneline ait marka dili Proje bilgisi › Yazım tercihleri altında tutulur.":
    "O tom de voz da marca para todo o projeto está em Contexto do projeto › Preferências de escrita.",
  "Şablon oluştur": "Criar modelo",
  Rapor: "Relatórios",
  "Son 7 gün": "Últimos 7 dias",
  "Bu sürede güncellenen": "Atualizado neste período",
  "Son güncelleme": "Última atualização",
  "{date} · raporu aç": "{date} · abrir relatório",
  "Türe göre raporlar": "Relatórios por tipo",

  rapor: "relatórios",
  Belirtilmemiş: "Não especificado",
  "Site denetimi raporu": "Relatório de auditoria do site",
  "SEO denetimi": "Auditoria de SEO",
  "Dönem karşılaştırması": "Comparação de períodos",
  "Trafik düşüşü incelemesi": "Análise da queda de tráfego",
  "SEO raporu": "Relatório de SEO",
  "Koçluk notu": "Nota de orientação",
  "Proje kurulumu": "Configuração do projeto",
  "Diğer türler": "Outros tipos",
  Tümü: "Todos",

  "Henüz rapor yok": "Ainda não há relatórios",

  "Rapor komutunu kopyala": "Copiar prompt do relatório",
  "Komut kopyalandı. Ajanınıza yapıştırın":
    "Prompt copiado. Cole no seu agente",

  "Raporlarda ara": "Pesquisar relatórios",
  "Aramanıza uyan rapor yok": "Nenhum relatório corresponde à pesquisa",

  Tür: "Tipo",
  Oluşturuldu: "Criado",
  Boyut: "Tamanho",
  İşlemler: "Ações",
  "{title} için işlemler": "Ações para {title}",
  Sil: "Excluir",

  "Henüz şablon yok": "Ainda não há modelos",
  "Şablon olmadan da rapor alabilirsiniz. Her seferinde aynı biçimde rapor istiyorsanız (örneğin yöneticiye aylık özet) sağ üstteki düğmeyle ilk şablonunuzu oluşturun.":
    "Você pode obter relatórios sem um modelo. Se quiser sempre o mesmo formato (por exemplo, um resumo mensal para o seu gestor), crie seu primeiro modelo com o botão no canto superior direito.",
  "{count} şablon": {
    one: "{count} modelo",
    other: "{count} modelos",
  },
  "son güncelleme": "última atualização",
  "Şablonlarda ara": "Pesquisar modelos",
  "{name} şablonunu düzenle": "Editar modelo {name}",
  Düzenle: "Editar",
  "Aramanıza uyan şablon yok": "Nenhum modelo corresponde à pesquisa",
  "Başka bir sözcükle deneyin.": "Tente outra palavra.",
  "Nasıl çalışır?": "Como funciona?",
  "Ajanın yazdığı raporlar": "Relatórios escritos pelo agente",
  "Claude Code ya da Codex projenizi inceler ve raporu buraya kaydeder. “Rapor komutunu kopyala” ajanınıza yapıştıracağınız komutu kopyalar.":
    "O Claude Code ou o Codex analisa o projeto e salva o relatório aqui. “Copiar prompt do relatório” copia o prompt que você cola no agente.",
  "Site denetimi ekranındaki “Raporu indir” hem bilgisayarınıza indirir hem burada saklar. Ajan gerekmez.":
    "“Baixar relatório” na tela Auditoria do site baixa o relatório para o seu computador e também o salva aqui. Não é preciso um agente.",
  "Rapor önizlemesi: {title}": "Prévia do relatório: {title}",
  "HTML olarak indir": "Baixar como HTML",
  "Tam ekrandan çık": "Sair da tela cheia",
  İndir: "Baixar",
  "Rapor indirildi": "Relatório baixado",
  "Rapor indirilemedi.": "Não foi possível baixar o relatório.",
  "Rapor silindi": "Relatório excluído",
  "Rapor silinemedi": "Não foi possível excluir o relatório",
  "“{title}” silinsin mi?": "Excluir “{title}”?",
  "Bu geri alınamaz.": "Esta ação não pode ser desfeita.",
  "Raporu sil": "Excluir relatório",

  "Sıra {band}": "Posição {band}",

  "Sıraya göre hızlı filtreler": "Filtros rápidos por posição",
  "İlk 10": "Top 10",
  "Ortalama sırası 10 veya daha iyi olan kelimeler; yani Google'ın ilk sayfası.":
    "Palavras-chave com posição média igual ou melhor que 10, ou seja, na primeira página do Google.",
  "Ortalama sırası 11 ile 20 arasında olanlar, yani ikinci sayfadakiler. Küçük bir iyileştirme ilk sayfaya taşıyabilir.":
    "Palavras-chave com posição média entre 11 e 20, ou seja, na segunda página. Uma pequena melhoria pode levá-las à primeira página.",
  "Sıra dağılımı": "Distribuição de posições",

  kelime: "palavras-chave",
  Bilgi: "Informacional",
  Ticari: "Comercial",
  İşlem: "Transacional",
  Gezinme: "Navegacional",
  "Bilgi amaçlı": "Informacional",
  "Ticari araştırma": "Pesquisa comercial",
  "İşlem odaklı": "Transacional",
  Yönlendirici: "Navegacional",
  Bilinmiyor: "Desconhecido",
  "Arayan kişi bilgi ya da cevap arıyor. Eğitici içerikler, rehberler ve sade açıklayıcı yazılar için uygun.":
    "A pessoa procura informação ou uma resposta. Adequado para conteúdos educativos, guias e explicações simples.",
  "Arayan kişi satın almadan önce seçenekleri inceliyor. Karşılaştırma, alternatif ve ürün sayfaları bu aramaya uyar.":
    "A pessoa está avaliando opções antes de comprar. Páginas de comparação, alternativas e produtos são adequadas a esta pesquisa.",
  "Arayan kişi bir eylemi, çoğunlukla satın almayı tamamlamaya hazır. Net teklifleri, fiyatları, denemeleri ve dönüşüm yollarını öne çıkarın.":
    "A pessoa está pronta para agir, geralmente para comprar. Dê destaque a ofertas claras, preços, testes e formas de conversão.",
  "Arayan kişi belirli bir siteyi, markayı ya da sayfayı arıyor. Bu aramalarda beklenen siteyle birebir eşleşen sayfa öne çıkar.":
    "A pessoa procura um site, marca ou página específica. Nessas pesquisas, a página que corresponde exatamente ao site esperado aparece primeiro.",
  "Bu kelime için arama amacı bilinmiyor; içerik kararlarınızı yalnızca bu rozete bakarak vermeyin.":
    "A intenção de pesquisa desta palavra-chave é desconhecida; não tome decisões de conteúdo apenas com base nesta etiqueta.",
  "Arama amacı bilinmiyor": "Intenção de pesquisa desconhecida",
  "{intent} arama amacı": "Intenção de pesquisa {intent}",
  "Etiketleri güncelle": "Atualizar etiquetas",
  "Seçili {count} kelimeye etiket ekleyin ya da bunlardan etiket kaldırın.": {
    one: "Adicione ou remova etiquetas da {count} palavra-chave selecionada.",
    other:
      "Adicione ou remova etiquetas das {count} palavras-chave selecionadas.",
  },
  "Etiket ekle": "Adicionar etiquetas",
  "Etiket kaldır": "Remover etiquetas",
  "Seçimden çıkar": "Remover da seleção",
  "Etiket ara": "Pesquisar etiquetas",
  "Ara ya da oluştur…": "Pesquisar ou criar…",
  "Oluştur {name}": "Criar {name}",
  "Henüz etiket yok. Yukarıya bir ad yazıp oluşturun.":
    "Ainda não há etiquetas. Digite um nome acima para criar uma.",
  "Bu aramaya uyan etiket yok.": "Nenhuma etiqueta corresponde à pesquisa.",
  "Seçili kelimelerde kaldırılacak etiket yok.":
    "As palavras-chave selecionadas não têm etiquetas para remover.",
  Kaldırılacak: "Será removida",
  "Kaldırmak için tıklayın": "Clique para remover",
  "Seçili kelimelerden {count} etiket kaldırılacak.": {
    one: "Será removida {count} etiqueta das palavras-chave selecionadas.",
    other: "Serão removidas {count} etiquetas das palavras-chave selecionadas.",
  },
  Uygula: "Aplicar",
  Kelime: "Palavra-chave",

  Amaç: "Intenção",
  Etiketler: "Etiquetas",
  Eklenme: "Adicionada",
  "Kelimeyi kopyala": "Copiar palavra-chave",
  "Kelime kopyalandı": "Palavra-chave copiada",

  "Kelimeyi sil": "Excluir palavra-chave",
  "Bu filtrelere uyan kelime yok":
    "Nenhuma palavra-chave corresponde a estes filtros",
  "Filtreleri gevşetin ya da temizleyin.": "Altere ou limpe os filtros.",
  "Henüz kayıtlı kelime yok": "Ainda não há palavras-chave salvas",
  "Arama performansı ekranında bir ya da birkaç sorguyu seçip “Kelime olarak kaydet” deyin. Kaydettikleriniz burada etiketlenir, sıralamayla birlikte listelenir ve dışa aktarılır.":
    "Na tela Desempenho da pesquisa, selecione uma ou mais consultas e escolha “Salvar como palavra-chave”. Aqui você pode etiquetar os itens salvos, vê-los com a posição e exportá-los.",
  "Search Console'u bağla": "Conectar Search Console",
  "Sorgulara göz at": "Explorar consultas",
  "Sonuçları filtrele": "Filtrar resultados",
  "{count} etkin": "{count} ativos",
  "Tümünü temizle": "Limpar tudo",
  İçeren: "Contém",
  "örn. denetim": "ex.: auditoria",
  İçermeyen: "Não contém",
  "örn. iş ilanı": "ex.: oferta de emprego",
  "{term} terimini kaldır": "Remover o termo {term}",
  Gri: "Cinza",
  Pembe: "Rosa",
  Turuncu: "Laranja",
  "Fıstık yeşili": "Verde-lima",
  Yeşil: "Verde",
  Mavi: "Azul",
  Mor: "Roxo",
  Fuşya: "Fúcsia",
  "Yeniden adlandır": "Renomear",
  Renk: "Cor",
  "Etiket kalıcı olarak silinir. Kelimelere dokunulmaz.":
    "A etiqueta será excluída permanentemente. As palavras-chave não serão alteradas.",
  "Etiketi sil": "Excluir etiqueta",
  "Filtreyi kaldır": "Remover filtro",
  Temizle: "Limpar",
  "Etiket ara…": "Pesquisar etiquetas…",
  "Aramayı temizle": "Limpar pesquisa",
  "Henüz etiket yok. Kelimeleri seçip etiket ekleyin.":
    "Ainda não há etiquetas. Selecione palavras-chave e adicione etiquetas.",
  "{count} seçili": "{count} selecionados",
  "{name} etiketini yönet": "Gerenciar a etiqueta {name}",
  "Etiket güncellendi": "Etiqueta atualizada",
  "Etiket artık yok. Liste yenilendi.":
    "A etiqueta não existe mais. A lista foi atualizada.",
  "Etiket güncellenemedi": "Não foi possível atualizar a etiqueta",
  "Etiket zaten silinmiş. Liste yenilendi.":
    "A etiqueta já tinha sido excluída. A lista foi atualizada.",
  "Etiket silindi": "Etiqueta excluída",
  "Etiket silinemedi": "Não foi possível excluir a etiqueta",
  "Dışa aktarılacak kelime yok": "Não há palavras-chave para exportar",
  "CSV dışa aktarılamadı": "Não foi possível exportar o CSV",
  "E-Tablolar'a aktarılamadı": "Não foi possível exportar para o Google Sheets",
  "{count} kelime kaldırıldı": {
    one: "{count} palavra-chave removida",
    other: "{count} palavras-chave removidas",
  },
  "Kelimeler kaldırılamadı": "Não foi possível remover as palavras-chave",
  "{count} kelimenin etiketleri güncellendi": {
    one: "Etiquetas atualizadas para {count} palavra-chave",
    other: "Etiquetas atualizadas para {count} palavras-chave",
  },
  "Etiketler güncellenemedi": "Não foi possível atualizar as etiquetas",
  "Kelime silinsin mi?": "Excluir palavra-chave?",
  "Kelimeler silinsin mi?": "Excluir palavras-chave?",
  "{keyword} kalıcı olarak silinir. İsterseniz Arama performansından yeniden kaydedebilirsiniz.":
    "{keyword} será excluída permanentemente. Você pode salvá-la novamente em Desempenho da pesquisa.",
  "Kayıtlı {count} kelime kalıcı olarak silinecek. Bu geri alınamaz.": {
    one: "{count} palavra-chave salva será excluída permanentemente. Esta ação não pode ser desfeita.",
    other:
      "{count} palavras-chave salvas serão excluídas permanentemente. Esta ação não pode ser desfeita.",
  },
  "Kelimeler silinemedi. Tekrar deneyin.":
    "Não foi possível excluir as palavras-chave. Tente novamente.",
  "{count} kelimeyi sil": {
    one: "Excluir {count} palavra-chave",
    other: "Excluir {count} palavras-chave",
  },

  "E-Tablolar'a aktar": "Exportar para Sheets",
  "CSV indir": "Baixar CSV",
  "Tablo filtrelerini aç/kapat": "Mostrar ou ocultar filtros da tabela",
  Filtreler: "Filtros",
  Etiketle: "Etiquetar",
  "Kelimeleri kopyala": "Copiar palavras-chave",
  "Nerede durduğunuzu anlatır ve sıradaki adımı seçer.":
    "Explica onde você está e escolhe o próximo passo.",
  "Hedeflerinizi, rakiplerinizi ve önemli sayfalarınızı bir kez kaydeder; diğer beceriler bunu hep bilir.":
    "Salva uma vez seus objetivos, concorrentes e páginas importantes; as outras skills sempre os conhecem.",
  "Sitenizi denetler ve bu hafta yapılacak tek bir işi öne çıkarır.":
    "Audita seu site e destaca a única coisa a fazer esta semana.",
  "Bu dönemi öncekiyle karşılaştırır. Ne değişti, ne zaman değişti, önemli mi, söyler.":
    "Compara este período com o anterior e explica o que mudou, quando mudou e se é importante.",
  "Trafik düştüyse önce şuna bakar. Düşüş gerçek mi, nerede ve ne zaman oldu?":
    "Se o tráfego caiu, verifica isto primeiro: a queda é real? Onde e quando aconteceu?",
  "Yukarıdakilerden birinin sonucunu Raporlar sayfasına kaydeder.":
    "Salva o resultado de qualquer uma das tarefas acima na página Relatórios.",
  "Ajanınızı kurun": "Configure o seu agente",
  Beceriler: "Skills",
  "seowatcher'ı yapay zeka ajanınızla kullanabilirsiniz. Bir kez bağlayın, sonra ne istiyorsanız ona sorun.":
    "Você pode usar o seowatcher com seu agente de IA. Conecte-o uma vez e depois peça o que precisar.",
  "Durum okunamadı": "Não foi possível ler o status",
  Bağlandı: "Conectado",
  "{client} · son çağrı {time}": "{client} · última chamada {time}",
  "Bir ajan": "Um agente",
  "Henüz bağlanmadı": "Ainda não conectado",
  "Kurulum adımları yükleniyor": "Carregando as etapas de configuração",
  "Becerileri güncelleyin": "Atualize as skills",
  "Ajanınızı daha önce kurduysanız güncelleme komutunu yapıştırın. Beceriler yenilenir, bağlantı ayarlarınız ve kendi düzenlemeleriniz olduğu gibi kalır.":
    "Se você já configurou o agente, cole o prompt de atualização. As skills serão atualizadas; as configurações de conexão e as suas próprias alterações serão mantidas.",
  "Güncelleme komutunu kopyala": "Copiar comando de atualização",
  "Güncelleme komutu kopyalandı": "Comando de atualização copiado",
  "Bu kurulum Cloudflare Access arkasında. Ajanın bağlanabilmesi için Access uygulamanızda Managed OAuth'u açın.":
    "Esta instalação está protegida pelo Cloudflare Access. Ative o Managed OAuth no aplicativo do Access para permitir a conexão do agente.",
  "Elle bağlamak istiyorsanız": "Se quiser conectar manualmente",
  "Bu kurulumun MCP adresi:": "Endereço MCP desta instalação:",
  "MCP adresi kopyalandı": "Endereço MCP copiado",
  "Bu adres {token} ile, yani bir parola (token) ile korunuyor. Aracınıza şu başlığı ekletin:":
    "Este endereço está protegido por {token}, uma senha (token). Configure a ferramenta para enviar este cabeçalho:",
  "Windows paketinde parola bir dosyadır (görev çubuğu menüsünde {menu}):":
    "No pacote Windows, a senha está em um arquivo ({menu} no menu da barra de tarefas):",
  "Veri klasörünü aç": "Abrir pasta de dados",
  "Panoya kopyalamak için PowerShell (değer ekrana yazılmaz):":
    "Para copiar para a área de transferência, use PowerShell (o valor não aparece na tela):",
  "Değeri sohbete ya da ekrana yazmayın. Yapıştırdıktan sonra panoyu temizleyin (Win+V, Tümünü temizle).":
    "Não digite o valor em uma conversa nem na tela. Depois de colar, limpe a área de transferência (Win+V, Limpar tudo).",

  "Windows'ta Git Bash için komutun başına {prefix} ekleyin, yoksa parola boş çıkar (PowerShell'de bu önek hata verir).":
    "No Git Bash do Windows, acrescente {prefix} antes do comando; caso contrário, a senha ficará vazia (no PowerShell, este prefixo dá erro).",
  "Bu adres parola istemez. Bilgisayarınızdaki başka bir programın araçları çalıştırmasını önlemek için {token} adıyla bir parola ayarlayın ve aracınıza şu başlığı ekletin:":
    "Este endereço não pede senha. Para impedir que outros programas no computador executem as ferramentas, defina uma senha com o nome {token} e configure a ferramenta para enviar este cabeçalho:",
  "Kurulum komutu bunları kurar. Kısa cevap yerine tam bir çıktı istiyorsanız beceriyi adıyla çağırın.":
    "O prompt de configuração instala estes itens. Para obter uma resposta completa em vez de uma resposta breve, chame a skill pelo nome.",
  "{name} adını kopyala": "Copiar o nome {name}",
  "Beceri adı kopyalandı": "Nome da skill copiado",
  "Bir şey ters giderse önce aşağıdaki duruma bakın. Çözüm çoğu zaman satırın yanındaki düğmededir.":
    "Se algo der errado, consulte primeiro o status abaixo. A solução costuma ser o botão ao lado da linha.",
  Günlükler: "Registros",
  "Konteyner günlüğü": "Registro do contêiner",
  "Kurulum türü anlaşılıyor. Günlüklerin yeri birazdan burada görünür.":
    "Identificando o tipo de instalação. A localização dos registros aparecerá aqui em breve.",
  "Görev çubuğundaki seowatcher simgesine sağ tıklayıp {menu} deyin. Açılış kontrolleri {launcherLog}, sunucu satırları {serverLog} dosyasındadır.":
    "Clique com o botão direito no ícone seowatcher na barra de tarefas e escolha {menu}. As verificações de inicialização estão em {launcherLog}; as linhas do servidor, em {serverLog}.",
  "Günlükleri aç": "Abrir registros",
  "Açılış kontrolleri uygulama başlamadan önce yazılır. Komut:":
    "As verificações de inicialização são registradas antes de o app iniciar. Comando:",
  "Komutu kopyala": "Copiar comando",
  "Komut kopyalandı": "Comando copiado",
  "Sağlık adresi:": "Endereço de status:",
  "{link} hangi bağlantıların ayarlı olduğunu ve veritabanının yanıt verip vermediğini gösterir.":
    "{link} mostra quais conexões estão configuradas e se o banco de dados responde.",
  "Kurulum belgeleri": "Documentação de configuração",
  "Windows paketi, Docker, Search Console, Analytics ve PageSpeed kurulumu kılavuzda anlatılıyor. Üstteki “{button}” düğmesi sizi oraya götürür.":
    "O guia explica como configurar o pacote Windows, o Docker, o Search Console, o Analytics e o PageSpeed. O botão “{button}” no topo abre o guia.",
  "Kılavuzu aç": "Abrir guia",
  "Sorun bildirmek için": "Para relatar um problema",
  "Üstteki “{download}” düğmesi tek bir arşiv indirir. İçinde sürüm, kurulum kontrolleri, tablo büyüklükleri, bağlı Google mülkleri, son denetimlerin durumu ve bu sekmede yakalanan tarayıcı hataları var. Gizli değer yok. Parolalar ve anahtarlar toplanmaz, yalnızca ayarlı olup olmadıkları yazılır. Kısa bir not yeterliyse durum panelindeki “{summary}” düğmesi aynı özeti metin olarak verir. Arşivdeki {readme} içindekileri ve sizi tanımlayan şeyleri satır satır anlatır.":
    "O botão “{download}” no topo baixa um único arquivo. Ele inclui a versão, as verificações de configuração, o tamanho das tabelas, as propriedades do Google conectadas, o status das auditorias recentes e os erros do navegador detectados nesta aba. Nenhum valor secreto: senhas e chaves não são coletadas, apenas se indica se estão configuradas. Se bastar uma nota breve, o botão “{summary}” no painel de status fornece o mesmo resumo em texto. O {readme} no arquivo explica, linha a linha, o que ele contém e o que pode identificar você.",
  "Tanılama paketi indir": "Baixar pacote de diagnóstico",
  "Özeti kopyala": "Copiar resumo",
  "Proje GitHub'da": "Projeto no GitHub",

  "Henüz proje yok": "Ainda não há projetos",
  "Bir proje oluşturun, sonra sitesini ekleyin.":
    "Crie um projeto e, em seguida, adicione o site.",

  "Site eklenmedi": "Nenhum site adicionado",
  "Site ekle": "Adicionar site",
  "Proje geri alındı": "Projeto restaurado",
  "Proje geri alınamadı": "Não foi possível restaurar o projeto",
  Arşivlendi: "Arquivado",
  "Arşivlenen projeler yüklenemedi":
    "Não foi possível carregar os projetos arquivados",
  "Bu çalışma alanına girişiniz doğrulanamadı.":
    "Não foi possível verificar o seu acesso a este espaço de trabalho.",
  "Bir şeyler ters gitti. Yardım ekranındaki günlüklere bakın.":
    "Algo deu errado. Consulte os registros na tela Ajuda.",
  "Bu denetim bulunamadı. Silinmiş olabilir.":
    "Esta auditoria não foi encontrada. Ela pode ter sido excluída.",
  "Denetime bağlanılamadı": "Não foi possível carregar a auditoria",
  "Tüm denetimler": "Todas as auditorias",
  "Site denetimi · {time}": "Auditoria do site · {time}",
  "Denetim bu siteyi tamamen tarayamadı.":
    "A auditoria não conseguiu rastrear este site por completo.",
  "Sitenin bot koruması tarayıcımızı engelledi ve şu an aşmanın bir yolu yok. Bilgisayarınızda çalışan masaüstü tarayıcılar genelde geçer. Şunları deneyin: {libreCrawl} (ücretsiz, açık kaynak) ya da {screamingFrog} (500 adrese kadar ücretsiz).":
    "A proteção contra bots do site bloqueou o nosso crawler e, no momento, não há como contornar o bloqueio. Crawlers para desktop executados no seu computador costumam conseguir passar. Experimente {libreCrawl} (gratuito e de código aberto) ou {screamingFrog} (gratuito até 500 URLs).",
  "Denetim {count} sayfadan sonra erken durdu.": {
    one: "A auditoria parou antes do previsto após {count} página.",
    other: "A auditoria parou antes do previsto após {count} páginas.",
  },
  "Aşağıdaki sonuçlar, tarama durmadan önce bakılan her şeyi içerir. Yeniden denemek için yeni bir denetim başlatın. Yine olursa Yardım'dan tanılama paketini indirip sorunu bildirin.":
    "Os resultados abaixo incluem tudo o que foi verificado antes de o rastreamento parar. Inicie uma nova auditoria para tentar novamente. Se acontecer de novo, baixe o pacote de diagnóstico na Ajuda e relate o problema.",
  "Denetim sonuçları yüklenemedi":
    "Não foi possível carregar os resultados da auditoria",
  "Bu rapor bulunamadı. Silinmiş olabilir ya da başka bir projeye ait olabilir.":
    "Este relatório não foi encontrado. Pode ter sido excluído ou pertencer a outro projeto.",
  "Rapor yüklenemedi": "Não foi possível carregar o relatório",
  Oluşturan: "Criado por",
  "PDF olarak kaydet (yazdır)": "Salvar como PDF (imprimir)",
  "Yeni sekmede aç": "Abrir em uma nova aba",
  "Diğer işlemler": "Mais ações",
  "Tam ekran": "Tela cheia",
  "Bağlantı kopyalanamadı": "Não foi possível copiar o link",
  "Bağlantı kopyalandı": "Link copiado",
  "Bağlantıyı kopyala": "Copiar link",
  "Hazırlanan raporlar. Her raporu açabilir, indirebilir ya da silebilirsiniz.":
    "Relatórios preparados. Você pode abrir, baixar ou excluir cada um.",
  Şablonlar: "Modelos",
  "Raporlar yüklenemedi": "Não foi possível carregar os relatórios",
  "Şablon silindi": "Modelo excluído",
  "Şablon silinemedi": "Não foi possível excluir o modelo",
  "Rapor şablonları": "Modelos de relatório",
  "Şablon, ajanınıza raporu nasıl yazacağını söyler. Kim okuyacak, hangi bölümler olacak, hangi dilde yazılacak, hepsi burada durur. Ajan rapor yazarken uygun olanı seçer.":
    "Um modelo indica ao agente como escrever um relatório: para quem se destina, que seções inclui e em que idioma é escrito. O agente escolhe o modelo adequado ao preparar cada relatório.",
  "Şablonlar yüklenemedi": "Não foi possível carregar os modelos",
  "Bu şablondan üretilmiş raporlar etkilenmez.":
    "Os relatórios criados com este modelo não serão afetados.",
  "Şablonu sil": "Excluir modelo",
  "Bu rapor yok ya da erişiminiz bulunmuyor.":
    "Este relatório não existe ou você não tem acesso a ele.",
  "Bu raporu okumak için oturum açın.": "Faça login para ler este relatório.",
  "Bu proje arşivde, bu yüzden raporları gizli. Okumak için {name} projesini geri alın.":
    "Este projeto está arquivado, por isso os relatórios estão ocultos. Restaure o projeto {name} para lê-los.",
  "Kayıtlı kelimeler yüklenemedi":
    "Não foi possível carregar as palavras-chave salvas",
  "{count} kelime kopyalandı": {
    one: "{count} palavra-chave copiada",
    other: "{count} palavras-chave copiadas",
  },

  Genel: "Geral",
  "Ayar bölümleri": "Seções das configurações",
  "Projeler yüklenemedi": "Não foi possível carregar os projetos",
  Bitti: "Concluído",
  Başarısız: "Falhou",
  "Sitenizde düzeltmeniz gereken her şey, önem sırasına göre. Bir satıra tıklayın. Neden önemli olduğunu, nasıl düzelteceğinizi ve hangi sayfaların etkilendiğini adresleriyle görürsünüz.":
    "Tudo o que precisa ser corrigido no seu site, do mais importante ao menos importante. Clique em uma linha para ver por que isso importa, como corrigir e quais páginas são afetadas, com seus endereços.",
  "Taranan her sayfa ve sunucunun ona verdiği yanıt. Hatalı, yavaş ya da derinde kalmış sayfaları buradan bulun.":
    "Cada página rastreada e como o servidor respondeu a ela. Encontre aqui páginas quebradas, lentas ou muito escondidas na estrutura.",
  "Google bu sayfaları gerçekten dizinine almış mı? Almadıysa nedenini burada görürsünüz.":
    "O Google realmente indexou essas páginas? Caso contrário, você pode ver o motivo aqui.",
  "Sayfalarınız telefonda ve bilgisayarda ne kadar hızlı açılıyor? Ölçüm, Google'ın kullandığı Lighthouse ile yapılır.":
    "Qual a velocidade de carregamento de suas páginas em telefones e computadores? Medido com Lighthouse, a ferramenta que o Google usa.",
  "Rapor oluşturulamadı": "Não foi possível criar o relatório",
  "Raporu indir": "Baixar relatório",
  "{count} {band}": "{count} {band}",
  "Mobilde ölçülen {measured} sayfadan {parts}.":
    "De {measured} páginas medidas em dispositivos móveis: {parts}.",
  Kritik: "Crítico",
  "Sitenizi tarar, bulduğu sorunları önem sırasına göre sıralar.":
    "Rastreia seu site e classifica os problemas encontrados por importância.",
  Kotalar: "Cotas",
  "Güncel durum": "Status atual",
  '"{url}" denetimi silinsin mi?': 'Excluir a auditoria de "{url}"?',
  "{date} · {count} sayfa. Denetimin sayfaları, sorunları ve hız ölçümleri de silinir. Bu geri alınamaz.":
    {
      one: "{date} · {count} página. As páginas, os problemas e as medições de velocidade da auditoria também são excluídos. Isso não pode ser desfeito.",
      other:
        "{date} · {count} páginas. As páginas, os problemas e as medições de velocidade da auditoria também são excluídos. Isso não pode ser desfeito.",
    },
  "Denetimi sil": "Excluir auditoria",
  Hızlı: "Rápido",
  Orta: "Média",
  Yavaş: "Lento",
  "{score} ve üzeri": "{score} ou mais",
  "Kota doldu": "Cota esgotada",
  "{marker}; {measured} sayfa ölçüldü, {left} sayfa ölçülemedi. Google'ın ücretsiz günlük ölçüm sınırı bitti, sayfalarınızda bir sorun yok. Ayarlar'dan bir PageSpeed anahtarı ekleyin ya da kota yenilenince denetimi yeniden başlatın.":
    "{marker}: páginas medidas {measured}, não medidas {left}. O limite diário gratuito de medições do Google se esgotou; não há nada de errado com suas páginas. Adicione uma chave do PageSpeed em Configurações ou execute a auditoria novamente quando a cota for redefinida.",
  "PageSpeed anahtarı girilmediği için {count} ölçüm yapılamadı: Google'ın ortak ücretsiz kotası doldu, sayfalarınızda bir sorun yok. Ayarlar'dan ücretsiz bir anahtar ekleyip denetimi yeniden başlatın.":
    {
      one: "{count} medição não pôde ser executada porque não há chave do PageSpeed definida: a cota gratuita compartilhada do Google se esgotou; não há nada de errado com suas páginas. Adicione uma chave gratuita em Configurações e execute a auditoria novamente.",
      other:
        "{count} medições não puderam ser executadas porque não há chave do PageSpeed definida: a cota gratuita compartilhada do Google se esgotou; não há nada de errado com suas páginas. Adicione uma chave gratuita em Configurações e execute a auditoria novamente.",
    },
  "Google'ın dakikalık sınırı yüzünden {count} ölçüm yapılamadı; denetimi daha sonra yeniden başlatın veya Ayarlar'dan anahtarınızın kotasını kontrol edin.":
    {
      one: "{count} medição não pôde ser executada devido ao limite por minuto do Google. Execute a auditoria novamente mais tarde ou verifique a cota da sua chave em Configurações.",
      other:
        "{count} medições não puderam ser executadas devido ao limite por minuto do Google. Execute a auditoria novamente mais tarde ou verifique a cota da sua chave em Configurações.",
    },
  "Taranacak site adresini girin.":
    "Insira o endereço do site a ser rastreado.",
  "{pages} sayfa taranacak. Biraz zaman alabilir. Devam edelim mi?":
    "Serão rastreadas {pages} páginas. Isso pode demorar. Deseja continuar?",
  "Denetim başlatıldı": "Auditoria iniciada",
  "Denetim başlatılamadı": "Não foi possível iniciar a auditoria",
  "Denetim silindi": "Auditoria excluída",
  "Denetim silinemedi": "Não foi possível excluir a auditoria",
  "Yeni denetim başlat": "Iniciar uma nova auditoria",
  "Taranacak site adresi": "Endereço do site a rastrear",
  "Başlatılıyor…": "Iniciando…",
  "En fazla {input} sayfa tara": "Rastrear até {input} páginas",
  "En çok taranacak sayfa sayısı": "Número máximo de páginas para rastrear",
  "{min} ile {max} arasında bir sayı girin.":
    "Insira um número entre {min} e {max}.",
  "Taranan her sayfanın hızı telefonda ve bilgisayarda ölçülür. En çok {pages} sayfa, yani {checks} ölçüm. Hız aşaması en az yaklaşık {minutes} dakika sürer, Google sınırına takılırsa daha uzun.":
    "A velocidade de cada página rastreada é medida em dispositivos móveis e desktop. Até {pages} páginas, portanto {checks} medições. A fase de velocidade leva pelo menos cerca de {minutes} minutos, mais se atingir o limite do Google.",
  "PageSpeed anahtarınız yok. Google'ın ücretsiz kotası küçük olduğu için en çok {pages} sayfa ({checks} ölçüm) ölçülür. Hız aşaması en az yaklaşık {minutes} dakika sürer, Google sınırına takılırsa daha uzun sürer.":
    "Você não tem uma chave do PageSpeed. A cota gratuita do Google é pequena, portanto são medidas no máximo {pages} páginas ({checks} medições). A fase de velocidade leva pelo menos cerca de {minutes} minutos, mais se atingir o limite do Google.",
  "Tüm sayfaları ölçmek için {settings}'dan ücretsiz bir PageSpeed anahtarı ekleyin.":
    "Para medir cada página, adicione uma chave PageSpeed gratuita em {settings}.",
  "Sayfa hızını da ölç": "Medir também a velocidade da página",
  "Hız ölçümü": "Testes de velocidade",
  "Google Lighthouse ile taranan her sayfanın telefonda ve bilgisayarda ne kadar hızlı açıldığını ölçer, yavaşlatan sorunları listeler.":
    "Usa o Google Lighthouse para medir a velocidade de carregamento de cada página rastreada em dispositivos móveis e desktop e lista o que a deixa mais lenta.",
  "Daha uzun sürer.": "Demora mais.",
  "Sayfa bulma": "Encontrando páginas",
  Taranıyor: "Rastreando",
  Tarama: "Rastreando",
  Tamamlanıyor: "Finalizando",
  Çalışıyor: "Processando",
  "Lighthouse kontrolleri çalışıyor": "Executando verificações do Lighthouse",
  "Sayfalar taranıyor": "Rastreando páginas",
  "{count} ölçüm başarısız oldu; kalanlar sürüyor.": {
    one: "{count} medição falhou; o restante ainda está em execução.",
    other: "{count} medições falharam; o restante ainda está em execução.",
  },
  "Adresler bulunuyor…": "Encontrando endereços…",
  "{done} / {total} kontrol ({failed} başarısız)":
    "{done} / {total} verificações ({failed} com falha)",
  "{done} / {total} kontrol": "{done} / {total} verificações",
  "{done} / {total} sayfa": "{done} / {total} páginas",
  "Taranan sayfalar ({count})": "Páginas rastreadas ({count})",
  "Güncellendi {date}": "Atualizado em {date}",
  "Denetimler arası değişim": "Variação entre auditorias",
  "Yüz sayfa başına sorun sayısı. Farklı büyüklükteki taramalar bu ölçüyle karşılaştırılabilir.":
    "Problemas por cem páginas, para que rastreamentos de tamanhos diferentes possam ser comparados.",
  "Bu {count} denetimin hiçbirinde kritik sorun ya da uyarı çıkmadı, grafik boş. Bilgi düzeyindeki bulgular denetimlerin kendi sayfalarında.":
    "Nenhuma dessas {count} auditorias encontrou problemas críticos ou avisos, por isso o gráfico está vazio. As descobertas informativas estão na página de cada auditoria.",
  "Denetim başına sayfa yoğunluğu: yüz sayfa başına sorun":
    "Densidade por auditoria: problemas por cem páginas",
  Tarih: "Data",
  Sayfa: "Página",
  "{density} ({total} toplam)": "{density} ({total} no total)",
  "{date} · {count} sayfa": {
    one: "{date} · {count} página",
    other: "{date} · {count} páginas",
  },
  "{density} / 100 sayfa ({total} toplam)":
    "{density} / 100 páginas ({total} no total)",
  "kritik sorun": "problemas críticos",
  uyarı: "avisos",
  değişmedi: "inalterado",
  "{count} denetim. Yüz sayfa başına {series}, {fromDate} tarihinde {from} idi, {toDate} tarihinde {to} oldu ({direction}).":
    {
      one: "{count} auditoria. Por cem páginas, {series} passou de {from} em {fromDate} para {to} em {toDate} ({direction}).",
      other:
        "{count} auditorias. Por cem páginas, {series} passou de {from} em {fromDate} para {to} em {toDate} ({direction}).",
    },
  "Denetim geçmişi yüklenemedi":
    "Não foi possível carregar o histórico de auditorias",
  "Henüz denetim yok": "Nenhuma auditoria ainda",
  "Henüz denetim yapılmadı. Yukarıya site adresinizi yazıp başlatın; geçmiş burada listelenir.":
    "Você ainda não executou uma auditoria. Digite o endereço do seu site acima e inicie uma; as auditorias anteriores aparecem aqui.",
  "Önceki denetimler": "Auditorias anteriores",
  Durum: "Status",
  "Yüz sayfa başına (toplam ayrıca parantezde)":
    "Por cem páginas (total entre parênteses)",
  Evet: "Sim",
  "{date} denetimini görüntüle": "Ver a auditoria de {date}",
  Görüntüle: "Ver",
  "Aynı siteye ait bir önceki denetime göre":
    "Comparado com a auditoria anterior do mesmo site",
  "{url} denetimi için işlemler": "Ações para a auditoria de {url}",
  "Aynı ayarlarla yeniden başlat":
    "Executar novamente com as mesmas configurações",
  "Bir denetim zaten başlatılıyor": "Uma auditoria já está sendo iniciada",
  "Google'da": "No Google",
  "Aramada çıkabilir": "Pode aparecer na pesquisa",
  "Dizinde değil": "Não indexado",
  "Google baktı ama almadı": "O Google a analisou, mas não a indexou",
  "Yanıt bekleyen": "Aguardando uma resposta",
  "Google'a sorduk ama yanıt gelmedi ya da hiç sorulmadı":
    "O Google foi consultado e não respondeu, ou nunca foi consultado",
  "Google bu sayfalarla ne yapmış?": "O que o Google fez com essas páginas?",
  "Bir gruba tıklayın, aşağıdaki liste yalnızca o sayfaları göstersin.":
    "Clique em um grupo para mostrar apenas essas páginas na lista abaixo.",
  sayfa: "páginas",
  "Google siteyi anlayamıyor": "O Google não consegue entender o site",
  "Sıralamayı ve tıklamayı düşürür": "Custa posições e cliques",
  "Küçük iyileştirme fırsatları": "Pequenas chances de melhorar",
  "Sorunlar ne kadar ciddi?": "Qual a gravidade dos problemas?",
  bulgu: "descobertas",
  "Bu sorun için kayıtlı adres yok.":
    "Nenhum endereço registrado para este problema.",
  "{title}: etkilenen adresler": "{title}: endereços afetados",
  "Adres ara": "Pesquisar endereços",
  "{title}: adreslerde ara": "{title}: pesquisar endereços",
  "Aramayla eşleşen adres yok.": "Nenhum endereço corresponde à sua pesquisa.",
  "{total} adres içinden {shown} tanesi gösteriliyor.":
    "Mostrando {shown} de {total} endereços.",
  "{total} sayfa içinden {shown} tanesi gösteriliyor.":
    "Mostrando {shown} de {total} páginas.",
  "Daha fazla göster ({left} kaldı)": "Mostrar mais (restam {left})",
  "Bu sayfada {count} kayıt var": {
    one: "{count} registro nesta página",
    other: "{count} registros nesta página",
  },
  "{title}, {count}": "{title}, {count}",
  "Nasıl düzeltilir?": "Como corrigir",
  "Bu sorun tek bir sayfayla değil, sitenin tamamıyla ilgili.":
    "Este problema diz respeito a todo o site, não a uma única página.",
  "URL'leri kopyala ({count})": "Copiar URLs ({count})",
  "Sayfalar sekmesinde göster": "Mostrar na aba Páginas",
  "{count} adres kopyalandı": {
    one: "{count} endereço copiado",
    other: "{count} endereços copiados",
  },
  "Bu denetimde kayıtlı sorun yok.": "Esta auditoria não registrou problemas.",
  "Site gerçekten iyi durumda olabilir ya da bu denetim, sorun kontrolleri eklenmeden önce çalıştırılmış olabilir. Tam raporu görmek için yeni bir denetim başlatın.":
    "O site pode realmente estar em boas condições ou esta auditoria pode ter sido executada antes da adição das verificações de problemas. Inicie uma nova auditoria para obter o relatório completo.",
  "Yalnızca {url}": "Apenas {url}",
  "Tüm sayfaları göster": "Mostrar todas as páginas",
  "Gösterilen:": "Mostrando:",
  "Seçtiğiniz kombinasyonda sorun yok.":
    "Nenhum problema corresponde à combinação que você escolheu.",
  "Bu sayfada kayıtlı sorun yok.":
    "Nenhum problema registrado para esta página.",
  "{label} seçimini kaldır": "Remover o filtro {label}",
  "Durum kodu": "Código de status",
  "Uzunluk (karakter)": "Comprimento (caracteres)",
  "Kelime sayısı": "Contagem de palavras",
  "H1 sayısı": "Contagem de H1",
  "Ana sayfadan uzaklık (tık)": "Cliques a partir da página inicial",
  "Yanıt süresi": "Tempo de resposta",
  "Asıl adres": "URL canônico",
  "Sayfadaki asıl adres": "URL canônico na página",
  "Başlıktaki asıl adres": "URL canônico no cabeçalho HTTP",
  "Yönlendirdiği adres": "Redireciona para",
  "Son adres": "URL final",
  "Aynı içerikteki sayfa sayısı": "Páginas com o mesmo conteúdo",
  "Aynı içerikteki diğer sayfalar": "Outras páginas com o mesmo conteúdo",
  "Karşılıklı bağlanmayan alternatif": "Alternativa sem link de retorno",
  "Dil kodu": "Código do idioma",
  "Dil kodları": "Códigos de idioma",
  Neden: "Motivo",
  "Erişim sonucu": "Resultado da busca",
  "Robots meta etiketi": "Meta tag robots",
  "Googlebot meta etiketi": "Meta tag do Googlebot",
  "X-Robots-Tag başlığı": "Cabeçalho X-Robots-Tag",
  Adet: "Contagem",
  Örnek: "Exemplo",
  Sınır: "Limite",
  "Alt metni eksik görsel": "Imagens sem texto alternativo",
  "Toplam görsel": "Total de imagens",
  "Engellenen kaynaklar": "Recursos bloqueados",
  "Engellenen kaynak sayısı": "Contagem de recursos bloqueados",
  Örnekler: "Exemplos",
  "Sizin belirttiğiniz adres": "URL canônico declarado pelo usuário",
  "Google'ın seçtiği adres": "URL canônico selecionado pelo Google",
  "Google'ın kararı": "Veredicto do Google",
  "Google'ın son tarama tarihi": "Último rastreamento do Google",
  "Kontrol tarihi": "Verificado em",
  "Eşik (gün)": "Limite (dias)",
  "Kontrol edilen sayfa": "Páginas verificadas",
  "Adres sayısı": "Número de URLs",
  Hayır: "Não",
  "{shown} ve {rest} tane daha": "{shown} e mais {rest}",
  "Tüm site": "Site inteiro",
  "{count} sayfa · {findings} bulgu": {
    one: "{count} página · {findings} descobertas",
    other: "{count} páginas · {findings} descobertas",
  },
  Önem: "Gravidade",
  Sorun: "Problema",
  Adres: "URL",
  Ayrıntı: "Detalhes",
  "Nasıl düzeltilir": "Como corrigir",
  "En çok sayfayı hangi sorun etkiliyor?": "Qual problema afeta mais páginas?",
  "Bir çubuğa tıklayıp listeyi daraltın.":
    "Clique em uma barra para restringir a lista.",
  "En çok sayfayı etkileyen sorun: {title}, {pages} sayfa. Grafikte {count} tür var.":
    {
      one: "O problema que afeta mais páginas: {title}, {pages} páginas. O gráfico mostra {count} tipo.",
      other:
        "O problema que afeta mais páginas: {title}, {pages} páginas. O gráfico mostra {count} tipos.",
    },
  "Sorun türüne göre etkilenen sayfa sayısı":
    "Páginas afetadas pelo tipo de problema",
  "Etkilenen sayfa": "Páginas afetadas",
  "Sorun türüne göre filtre": "Filtrar por tipo de problema",
  Başlık: "Título",
  Görsel: "Imagem",
  "Alt metni eksik": "Texto alternativo ausente",
  "Yanıt süresi (ms)": "Tempo de resposta (ms)",
  Cihaz: "Dispositivo",
  Performans: "Desempenho",
  Erişilebilirlik: "Acessibilidade",
  Karar: "Veredicto",
  "Kapsam durumu": "Status de cobertura",
  "Google'ın seçtiği asıl adres": "URL canônico selecionado pelo Google",
  "Sizin belirttiğiniz asıl adres": "URL canônico declarado pelo usuário",
  "Asıl adres uyuşmazlığı": "URL canônico divergente",
  "Son tarama": "Último rastreamento",
  Sorgulandı: "Verificado",
  evet: "sim",
  hayır: "não",
  "Dizine kapalı": "Indexação bloqueada",
  "Google'ın dizine almasına izin verilmeyen sayfalar":
    "Páginas que o Google não tem permissão para indexar",
  "Sunucu yanıtı 1 saniyeden uzun süren sayfalar":
    "Páginas cuja resposta do servidor leva mais de 1 segundo",
  "En az bir görselinde alt metni olmayan sayfalar":
    "Páginas com pelo menos uma imagem sem texto alternativo",
  "Site haritasında yok": "Não está no sitemap",
  "Taranan ama site haritasına girmemiş sayfalar":
    "Páginas rastreadas que não estão no sitemap",
  '"Site haritasında yok" kullanılamıyor: bu denetimde site haritası bulunamadı.':
    '"Não está no sitemap" não está disponível: esta auditoria não encontrou nenhum sitemap.',
  "Eksiksiz. Düzeltilecek bir şey kalmadı.":
    "Impecável. Não há mais nada para consertar.",
  "Çok iyi. Birkaç küçük iş kaldı.":
    "Muito bom. Restam alguns pequenos ajustes.",
  "İyi. Birkaç düzeltme puanı yükseltir.":
    "Bom. Algumas correções aumentarão a pontuação.",
  "Orta. Önce kritik sorunlara bakın.":
    "Razoável. Comece pelos problemas críticos.",
  "Zayıf. Google'ın sitenizi anlamasını engelleyen sorunlar var.":
    "Ruim. Alguns problemas estão impedindo o Google de entender seu site.",
  "Site puanı": "Pontuação do site",
  "Google'ın ücretsiz ölçüm kotası dolmuş; sayfalarınızda bir sorun yok. Ayarlar'dan PageSpeed anahtarı ekleyin ya da kota yenilenince denetimi yeniden başlatın.":
    "A cota gratuita de medição do Google se esgotou; não há nada de errado com suas páginas. Adicione uma chave do PageSpeed em Configurações ou execute a auditoria novamente quando a cota for redefinida.",
  Hız: "Velocidade",
  "Ortalama puanlar": "Pontuações médias",
  "Mobilde hız dağılımı": "Distribuição de velocidade em dispositivos móveis",
  "Ortalama tek başına yanıltır. Bir gruba tıklayıp o sayfaları listeleyin.":
    "Uma média por si só é enganosa. Clique em um grupo para listar essas páginas.",
  "Sayfalar nasıl yanıt verdi?": "Como as páginas responderam?",
  "Bir çubuğa tıklayarak tabloyu daraltın.":
    "Clique em uma barra para restringir a tabela.",
  "Ortalama yanıt süresi {duration}. Bir çubuğa tıklayarak tabloyu daraltın.":
    "Tempo médio de resposta: {duration}. Clique em uma barra para filtrar a tabela.",
  "{count} sayfanın yanıt durumuna göre dağılımı.": {
    one: "{count} página por status de resposta.",
    other: "{count} páginas por status de resposta.",
  },
  "Ana sayfadan kaç tık uzakta?": "Quantos cliques a partir da página inicial?",
  "{count} sayfaya hiçbir bağlantı verilmemiş, bu yüzden çubuklarda yok.": {
    one: "{count} página não tem links apontando para ela, portanto não está nas barras.",
    other:
      "{count} páginas não têm links apontando para elas, portanto não estão nas barras.",
  },
  "Derindeki sayfaları Google geç bulur ve daha az değer verir.":
    "O Google encontra páginas profundas com atraso e as valoriza menos.",
  "En derin sayfalar {depth} uzaklığında.":
    "As páginas mais profundas estão a {depth} de distância.",
  "Derinlik bilgisi yok.": "Não há dados de profundidade.",
  Sorunsuz: "OK",
  "2xx: sayfa açıldı": "2xx: página carregada",
  Yönlendirme: "Redirecionamento",
  "3xx: başka adrese gidiyor": "3xx: vai para outro URL",
  "4xx / 5xx: sayfa açılmadı": "4xx / 5xx: a página não foi carregada",
  Ulaşılamadı: "Inacessível",
  "Sunucudan yanıt gelmedi": "Nenhuma resposta do servidor",
  "1 tık": "1 clique",
  "2 tık": "2 cliques",
  "3 tık": "3 cliques",
  "4+ tık": "4+ cliques",
  "robots.txt izin veriyor": "Permitido por robots.txt",
  "robots.txt engelliyor": "Bloqueado por robots.txt",
  "Google henüz bakmadı": "O Google ainda não verificou",
  "Dizine almaya izin var": "Indexação permitida",
  "Gizleme etiketi (noindex) engelliyor": "Bloqueado pela meta tag noindex",
  "Sunucu başlığı (X-Robots-Tag) engelliyor":
    "Bloqueado pelo cabeçalho HTTP X-Robots-Tag",
  "Sayfa alındı": "Página obtida",
  "Boş sayfa, hata vermeden açılıyor (soft 404)":
    "Página vazia que carrega sem erro (soft 404)",
  "robots.txt engelledi": "Bloqueado por robots.txt",
  "404, sayfa yok": "404, página não encontrada",
  "401 yetkisiz": "401 não autorizado",
  "403 yasak": "403 proibido",
  "Sunucu hatası": "Erro de servidor",
  "Yönlendirme hatası": "Erro de redirecionamento",
  "Zaman aşımı": "Tempo limite esgotado",
  "Google tarafında tarama hatası": "Erro de rastreamento do lado do Google",
  "Geçersiz adres": "URL inválido",
  "Google henüz almadı": "O Google ainda não o obteve",
  "Zengin sonuç verisi geçerli": "Os dados de pesquisa aprimorada são válidos",
  "Zengin sonuç verisinde uyarı var":
    "Os dados de pesquisa aprimorada têm avisos",
  "Zengin sonuç verisi geçersiz":
    "Os dados de pesquisa aprimorada são inválidos",
  "Zengin sonuç verisi yok": "Nenhum dado de pesquisa aprimorada",
  "Google henüz değerlendirmedi": "O Google ainda não o avaliou",
  "{count} sayfada engellendik.": {
    one: "Fomos bloqueados em {count} página.",
    other: "Fomos bloqueados em {count} páginas.",
  },
  "Sitenin bot koruması tarayıcımızı durdurdu, o sayfalar denetlenemedi. Henüz bir çözümümüz yok. Masaüstü tarayıcılar sizin bilgisayarınızdan çalıştığı için genelde geçer. Şunları deneyin: {librecrawl} (ücretsiz, açık kaynak) ya da {screamingfrog} (500 adrese kadar ücretsiz).":
    "A proteção de bot do site interrompeu nosso rastreador, portanto essas páginas não puderam ser auditadas. Ainda não temos solução alternativa. Os rastreadores de desktop geralmente passam porque são executados em seu próprio computador. Experimente {librecrawl} (gratuito, código aberto) ou {screamingfrog} (gratuito até 500 URLs).",
  "Tarama, sitenin istek sınırı yüzünden erken durdu.":
    "O rastreamento foi interrompido antes do previsto devido ao limite de solicitações do site.",
  "Site {count} sayfada istek sınırı uyguladı.": {
    one: "O site limitou as solicitações em {count} página.",
    other: "O site limitou as solicitações em {count} páginas.",
  },
  "İstenen bekleme süresi denetim süresini aştı, bazı adresler ziyaret edilmedi. Bu rapor eksik.":
    "A espera solicitada pelo site ultrapassou o limite de tempo da auditoria, portanto, alguns URLs não foram visitados. Este relatório está incompleto.",
  'Sunucunun "çok fazla istek" (429) yanıtı verdiği sayfalar denetlenemedi.':
    'Páginas onde o servidor respondeu "muitas solicitações" (429) não puderam ser auditadas.',
  'İstek sınırı sıfırlandıktan sonra denetimi yeniden başlatın, ya da site sahibinden "seotracker-audit" tarayıcısına izin vermesini isteyin.':
    'Execute a auditoria novamente quando o limite de solicitações for redefinido ou peça ao proprietário do site para permitir o rastreador "seotracker-audit".',
  "başka bir mülk": "outra propriedade",
  "Sorunlu sayfalar ({count})": "Páginas com problemas ({count})",
  "Sayfalar ({count})": "Páginas ({count})",
  "Dizin durumu": "Status de indexação",
  "Dizin durumu ({count})": "Status de indexação ({count})",
  "Hız ({count})": "Velocidade ({count})",
  "{issue} sorunu olan sayfalar": "Páginas com: {issue}",
  "Taranan sayfalar": "Páginas rastreadas",
  "Bu denetim hiçbir sayfa taramadı.":
    "Esta auditoria não rastreou nenhuma página.",
  "Bu filtrelerle eşleşen sayfa yok.":
    "Nenhuma página corresponde a esses filtros.",
  "Sayfa hızı ölçümleri": "Medições de velocidade da página",
  "Bu denetimde Lighthouse sonucu yok.":
    "Esta auditoria não tem resultados do Lighthouse.",
  "Bu filtrelerle eşleşen performans sonucu yok.":
    "Nenhum resultado de desempenho corresponde a esses filtros.",
  "Hız puanı (0-100)": "Pontuação de desempenho (0-100)",
  "Erişilebilirlik puanı (0-100)": "Pontuação de acessibilidade (0-100)",
  "Arama motoru uyumu puanı (0-100)":
    "Pontuação de preparação para mecanismos de pesquisa (0-100)",
  "Ana içeriğin görünme süresi": "Tempo até o conteúdo principal aparecer",
  "Sayfanın ne kadar kaydığı": "Quanto a página se desloca",
  "Tıklamaya yanıt süresi": "Tempo para responder a um clique",
  "Sunucunun ilk yanıt süresi": "Tempo para a primeira resposta do servidor",
  Sorunlar: "Problemas",
  "Sorunları gör": "Ver problemas",
  "JSON ({count} satır)": {
    one: "JSON ({count} linha)",
    other: "JSON ({count} linhas)",
  },
  "{count} sorunu göster": {
    one: "Mostrar {count} problema",
    other: "Mostrar {count} problemas",
  },
  yönlendirme: "redirecionamento",
  eksik: "ausentes",
  "Sayfadaki kelime sayısı": "Número de palavras na página",
  "Sayfadaki görsel sayısı. Renkli sayı, alt metni (açıklaması) eksik görsellerin sayısıdır.":
    "Número de imagens na página. O número colorido conta imagens sem texto alternativo (sua descrição).",
  Bağlantı: "Links",
  "Bu sayfadan çıkan bağlantılar. Önce site içi, sonra dışarı giden sayısı yazar. Site içi bağlantısı olmayan sayfa, sitenin geri kalanına yönlendirmiyor demektir.":
    "Links que saem desta página: primeiro internos, depois externos. Uma página sem links internos não leva a nenhum outro lugar do site.",
  Dizin: "Índice",
  Derinlik: "Profundidade",
  "Ana sayfadan kaç tıkla ulaşılıyor":
    "Cliques necessários a partir da página inicial",
  Harita: "Sitemap",
  "Site haritasında var mı": "Se está no sitemap",
  Var: "Listado",
  Yok: "Nenhum",
  Ara: "Pesquisa",
  "Adres, başlık, açıklama": "URL, título, descrição",
  "Alt metni": "Texto alternativo",
  "Alt metni yok": "Texto alternativo ausente",
  "Alt metni tam": "Texto alternativo completo",
  Dizinlenebilir: "Indexável",
  "Hayır (noindex)": "Não (noindex)",
  "Site haritası": "Sitemap",
  Haritada: "No sitemap",
  "Haritada yok": "Não está no sitemap",
  "En çok LCP (sn)": "LCP máx. (s)",
  "Filtreleri aç/kapat": "Mostrar ou ocultar filtros",
  "En az": "Mín.",
  "En fazla": "Máx.",
  "{label} en az": "{label} mínimo",
  "{label} en fazla": "{label} máximo",
  "Search Console bağlı değil. Sayfaların Google'daki durumunu görmek için önce bağlayın.":
    "O Search Console não está conectado. Conecte-o primeiro para ver como o Google trata suas páginas.",
  "Google'ın günlük {limit} adres sınırı doldu. {count} sayfa sırada, sınır birkaç saat içinde yenilenir.":
    {
      one: "O limite diário de {limit} URLs do Google se esgotou. {count} página está aguardando; o limite é redefinido em algumas horas.",
      other:
        "O limite diário de {limit} URLs do Google está esgotado. {count} páginas estão aguardando; o limite é redefinido dentro de algumas horas.",
    },
  "Tüm sayfalar güncel, sorulacak bir şey yok.":
    "Todas as páginas estão atualizadas; não há nada para verificar.",
  "{count} sayfa soruldu.": {
    one: "{count} página verificada.",
    other: "{count} páginas verificadas.",
  },
  "{count} sayfa kaldı.": {
    one: "{count} página restante.",
    other: "{count} páginas restantes.",
  },
  "Bugünkü kotadan {count} sorgu kaldı.": {
    one: "{count} verificação restante na cota de hoje.",
    other: "{count} verificações restantes na cota de hoje.",
  },
  "Google'daki durum sorulamadı. Birazdan tekrar deneyin.":
    "Não foi possível verificar o status no Google. Tente novamente em breve.",
  "Dizin durumu yüklenemedi": "Não foi possível carregar o status de indexação",
  "Sorulacak sayfa yok": "Não há páginas para verificar",
  "Bu denetimde Google'ın dizine alabileceği bir sayfa yok.":
    "Esta auditoria não tem páginas que o Google possa indexar.",
  "Google'ın farklı adresi seçtiği sayfalar":
    "Páginas onde o Google escolheu um canônico diferente",
  "Üstteki grafikte seçtiğiniz gruptan bağımsız, kontrol edilen tüm sayfalar. Google, sizin seçtiğiniz adres yerine başka bir sayfayı asıl sayfa saydı.":
    "Conta todas as páginas verificadas, qualquer que seja o grupo que você escolheu no gráfico acima. O Google tratou como canônica uma página diferente daquela que você declarou.",
  "Üstteki grafikte seçtiğiniz gruptan bağımsız, kontrol edilen tüm sayfalar.":
    "Conta todas as páginas verificadas, independentemente do grupo escolhido no gráfico acima.",
  "Google günde en çok {limit} adres sormanıza izin verir. Her seferde {batch} sayfa kontrol edilir. Önce hiç sorulmamış olanlara, sonra Google'ın dizine almadıklarına bakılır.":
    "O Google permite que você verifique até {limit} URLs por dia. Cada execução verifica {batch} páginas: primeiro aquelas que nunca foram verificadas, depois aquelas que o Google não indexou.",
  "Google'da durumunu kontrol et": "Verificar o status no Google",
  "Taradığınız sayfaların gerçekten dizine girip girmediğini görmek için yukarıdaki düğmeyi kullanın.":
    "Use o botão acima para ver se suas páginas rastreadas estão realmente indexadas.",
  "{count} sayfa gösteriliyor": {
    one: "Mostrando {count} página",
    other: "Mostrando {count} páginas",
  },
  "Tümünü göster": "Mostrar tudo",
  Sebep: "Motivo",
  "Google'ın son ziyareti": "Último rastreamento do Google",
  "Sizin seçtiğiniz: {url}": "Sua escolha: {url}",
  "{url} adresini Search Console'da aç": "Abrir {url} no Search Console",
  "Search Console'da aç": "Abrir no Search Console",
  "Google bu adres için yanıt vermedi ({error}). Google'da durumunu kontrol et düğmesiyle yeniden sorabilirsiniz.":
    "O Google não respondeu para este URL ({error}). Você pode perguntar novamente com o botão Verificar o status no Google.",
  Sorulamadı: "Falha na verificação",
  "Kontrol edilmedi": "Não verificado",
  "Yanıt alınamadı": "Sem resposta",
  iyi: "bom",
  geliştirilmeli: "precisa de melhorias",
  zayıf: "ruim",
  "düşüyor, yani iyileşiyor": "caindo, então melhorando",
  "yükseliyor, yani kötüleşiyor": "aumentando, então piorando",
  "yatay seyrediyor": "estável",
  "{metric} son {count} haftada {start} değerinden {now} değerine geldi, {trend}; şu an {rating}.":
    {
      one: "{metric} passou de {start} para {now} na última {count} semana, {trend}; atualmente {rating}.",
      other:
        "{metric} passou de {start} para {now} nas últimas {count} semanas, {trend}; atualmente {rating}.",
    },
  "Gerçek kullanıcı hızı, son haftalar":
    "Velocidade para usuários reais, semanas recentes",
  "Cihaz türü": "Tipo de dispositivo",
  Telefon: "Telefone",
  Bilgisayar: "Computador",
  "Google'a ulaşılamadı.": "Não foi possível acessar o Google.",
  "Bu geçmiş için PageSpeed anahtarı gerekiyor.":
    "Este histórico precisa de uma chave do PageSpeed.",
  "Ayarlar'a git": "Ir para Configurações",
  "Google bu site için yeterli ziyaretçi verisine sahip değil. Siteye Chrome ile gelen ziyaretçi arttıkça burada görünür.":
    "O Google ainda não tem dados de visitantes suficientes para este site. Os dados aparecerão aqui à medida que mais visitantes chegarem usando o Chrome.",
  "Google bu site için yeterli ziyaretçi verisine sahip değil.":
    "O Google não tem dados de visitantes suficientes para este site.",
  "Her nokta, o haftada biten 28 günde ziyaretçilerin yüzde 75'inin gördüğü değerdir (p75). Kesikli çizgiler iyi ile zayıf arasındaki sınırlardır.":
    "Cada ponto é o valor que 75% dos visitantes viram nos 28 dias encerrados naquela semana (p75). As linhas tracejadas marcam os limites de bom e ruim.",
  "Son pencere {date} tarihinde bitiyor.": "A última janela termina em {date}.",
  Kategori: "Categoria",
  Puan: "Pontuação",
  "Görünen değer": "Valor exibido",
  "Etki (ms)": "Impacto (ms)",
  "Etki (bayt)": "Impacto (bytes)",
  "Etkilenen öğeler": "Elementos afetados",
  "En iyi uygulamalar": "Práticas recomendadas",
  "Tüm sorunlar": "Todos os problemas",
  "Tüm sorunları": "todos os problemas",
  "Performans sorunları": "Problemas de desempenho",
  "Performans sorunlarını": "problemas de desempenho",
  "Erişilebilirlik sorunları": "Problemas de acessibilidade",
  "Erişilebilirlik sorunlarını": "problemas de acessibilidade",
  "En iyi uygulama sorunları": "Problemas de práticas recomendadas",
  "En iyi uygulama sorunlarını": "problemas de práticas recomendadas",
  "SEO sorunları": "Problemas de SEO",
  "SEO sorunlarını": "Problemas de SEO",
  "Bu kategoride işlem gerektiren sorun yok.":
    "Nenhum problema nesta categoria precisa de ação.",
  Etki: "Impacto",
  "Ayrıntıları gizle": "Ocultar detalhes",
  "Ayrıntıları göster": "Mostrar detalhes",
  "Etkilenen öğeler ({count})": "Elementos afetados ({count})",
  "{label} sayfasına dön": "Voltar para {label}",
  "{date} tarihinde tarandı": "Verificado em {date}",
  "Sayfa hızı sorunları (Lighthouse)":
    "Problemas de velocidade da página (Lighthouse)",
  "Lighthouse sorunlarını dışa aktar": "Exportar problemas do Lighthouse",
  "{issues} E-Tablolar'da aç": "{issues}: abrir no Sheets",
  "İşlem gerektiren tüm sorunları E-Tablolar'da aç":
    "Abrir no Sheets todos os problemas que precisam de ação",
  "{issues} kopyalandı": "{issues} copiados",
  "{issues} kopyala": "Copiar {issues}",
  "İşlem gerektiren tüm sorunlar kopyalandı":
    "Todos os problemas que precisam de ação copiados",
  "İşlem gerektiren tüm sorunları kopyala":
    "Copiar todos os problemas que precisam de ação",
  "Kayıtlı Lighthouse verisi kopyalandı": "Dados salvos do Lighthouse copiados",
  "Kayıtlı Lighthouse verisini kopyala": "Copiar dados salvos do Lighthouse",
  "JSON indir": "Baixar JSON",
  "{issues} indir": "Baixar {issues}",
  "İşlem gerektiren tüm sorunları indir":
    "Baixar todos os problemas que precisam de ação",
  "Kayıtlı Lighthouse verisini indir": "Baixar dados salvos do Lighthouse",
  "{category} ({count})": "{category} ({count})",
  "Lighthouse sorunları yüklenemedi.":
    "Não foi possível carregar os problemas do Lighthouse.",
  "Bu denetim, Lighthouse sorun ayrıntıları olmadan kaydedilmiş. Bu ekranı doldurmak için denetimi yeniden başlatın.":
    "Esta auditoria foi salva sem os detalhes dos problemas do Lighthouse. Execute a auditoria novamente para preencher esta tela.",
  "Bu Lighthouse çalışması, sorun ayrıntıları saklanmaya başlamadan önce kaydedilmiş. Kategori sayılarını ve sorun kartlarını görmek için denetimi yeniden başlatın.":
    "Esta execução do Lighthouse foi salva antes de os detalhes dos problemas serem armazenados. Execute a auditoria novamente para ver as contagens por categoria e os cartões de problemas.",
  "İndirme başladı": "Download iniciado",
  "Veri dışa aktarılamadı. Birazdan tekrar deneyin.":
    "Não foi possível exportar os dados. Tente novamente em breve.",
  "CSV indirmesi başladı": "O download do CSV foi iniciado",
  "Veri kopyalanamadı. Tekrar deneyin.":
    "Não foi possível copiar os dados. Tente novamente.",
  "Gerçek kullanıcı verisi · site geneli · son 28 gün":
    "Dados de usuários reais · site inteiro · últimos 28 dias",
  "Gerçek kullanıcı verisi · bu sayfa · son 28 gün":
    "Dados de usuários reais · esta página · últimos 28 dias",
  "Yukarıdaki puanlar Google'ın test makinesinde ölçüldü. Bunlar sitenizi gerçekten ziyaret eden Chrome kullanıcılarından geliyor.":
    "As pontuações acima foram medidas na máquina de teste do Google. Estes dados vêm de usuários do Chrome que realmente visitam seu site.",
  "Bu sayfanın kendi ziyaretçi sayısı Google'ın eşiğinin altında kaldığı için sitenizin tamamının ortalaması gösteriliyor.":
    "Esta página tem poucos visitantes para atingir o limite do Google, então a média de todo o site é mostrada.",
  "Laboratuvar ↔ gerçek kullanıcı": "Laboratório ↔ usuários reais",
  "Test ortamında sitenizin hızı ziyaretçilerinkinden iyi çıkıyor. Google sıralamada sağdaki sütunu kullanır.":
    "Seu site parece mais rápido no ambiente de teste do que para os visitantes. O Google usa a coluna da direita para o posicionamento.",
  "Gerçek ziyaretçiler sitenizi test ortamından daha hızlı görüyor. Google sıralamada sağdaki sütunu kullanır.":
    "Os visitantes reais veem seu site mais rápido do que o ambiente de teste. O Google usa a coluna da direita para o posicionamento.",
  "İki ölçüm birbirini tutuyor. Laboratuvar puanı ziyaretçilerin gördüğüne yakın.":
    "As duas medições coincidem. A pontuação do laboratório está próxima da experiência dos visitantes.",
  Ölçüm: "Métrica",
  Laboratuvar: "Laboratório",
  "Gerçek kullanıcı": "Usuários reais",
  Fark: "Diferença",
  Tutuyor: "Coincidem",
  "{gap} daha yavaş": "{gap} mais lento",
  "{gap} daha hızlı": "{gap} mais rápido",
  "en büyük içerik": "maior conteúdo",
  "ilk içerik": "primeiro conteúdo",
  "sunucu yanıtı": "resposta do servidor",
  "düzen kayması": "deslocamento de layout",
  "Tarama robotu engellendi": "O rastreador foi bloqueado",
  "Sayfa yerine bir bot doğrulaması ya da erişim engeli döndü (Cloudflare doğrulaması ya da 403 gibi), bu yüzden sayfa denetlenemedi. Google'ın tarayıcısı da benzer bir engele takılıyor olabilir; takılırsa sayfa aramada çıkmaz.":
    "Em vez da página, o servidor retornou uma verificação de bot ou um bloqueio de acesso (um desafio Cloudflare ou um 403, por exemplo), então a página não pôde ser auditada. O Googlebot pode estar enfrentando um bloqueio semelhante; se for, a página não aparecerá na pesquisa.",
  'Site sizinse güvenlik duvarınızda ya da bot korumanızda "seotracker-audit" kullanıcı aracısına izin verin (Cloudflare\'de: kullanıcı aracısı "seotracker-audit" içerdiğinde bot korumasını atlayan bir WAF kuralı). Sonra denetimi yeniden başlatın.':
    'Se o site for seu, permita o agente de usuário "seotracker-audit" em seu firewall ou proteção de bot (no Cloudflare: uma regra WAF que ignora a proteção de bot quando o agente de usuário contém "seotracker-audit"). Em seguida, execute a auditoria novamente.',
  "İstek sınırına takıldı (429)": "Limite de solicitações atingido (429)",
  "Sunucu 429 (çok fazla istek) yanıtı verdi, bu yüzden sayfa denetlenemedi. Sitenin istediği bekleme süresi denetimin süresine sığıyorsa tarayıcı bekleyip yeniden dener.":
    "O servidor respondeu 429 (muitas solicitações), portanto a página não pôde ser auditada. Se a espera solicitada pelo site estiver dentro do tempo de auditoria, o rastreador aguardará e tentará novamente.",
  'Sunucunuzda ya da güvenlik duvarınızda istek sınırını yükseltin veya "seotracker-audit" kullanıcı aracısını sınırın dışında tutun. Sonra denetimi yeniden başlatın. Sınır çok katıysa denetimi daha az sayfayla başlatmak da işe yarar.':
    'Aumente o limite de solicitações no servidor ou firewall ou isente dele o user agent "seotracker-audit". Em seguida, execute a auditoria novamente. Se o limite for muito rigoroso, iniciar a auditoria com menos páginas também ajuda.',
  "Tarama erken durdu: istek sınırı":
    "Rastreamento interrompido antes do previsto: limite de solicitações",
  "Site, tarayıcıdan denetimin süresinden uzun beklemesini istedi, biz de sayfa istemeyi bıraktık. Bu rapor eksik; çekemediğimiz adresler kırık ya da sınırlanmış diye kaydedilmedi.":
    "O site pediu ao rastreador que esperasse mais do que a auditoria permite, então paramos de solicitar páginas. Este relatório está incompleto; os URLs que não conseguimos obter não foram registrados como quebrados ou com solicitações limitadas.",
  "Sitenin istek sınırı sıfırlandıktan sonra denetimi yeniden başlatın. Sorun sürerse site yöneticisinden seotracker-audit tarayıcısına izin vermesini isteyin.":
    "Execute a auditoria novamente após a redefinição do limite de solicitações do site. Se isso continuar acontecendo, peça ao administrador do site para permitir o rastreador seotracker-audit.",
  "Sunucu hatası (5xx)": "Erro do servidor (5xx)",
  "Sayfa 5xx sunucu hatası verdi. Google sürekli hata veren siteyi daha seyrek tarar ve sayfayı dizinden çıkarabilir.":
    "A página retornou um erro de servidor 5xx. O Google rastreia com menos frequência um site que continua apresentando erros e pode retirar a página do índice.",
  "Sunucu günlüklerinde bu adrese ait hatayı bulup giderin. Sayfa bilerek kaldırıldıysa hata yerine 404 ya da 410 döndürün veya ilgili bir sayfaya yönlendirin.":
    "Encontre o erro desse URL nos registros do servidor e corrija-o. Se a página foi removida propositalmente, retorne um 404 ou 410 em vez de um erro ou redirecione para uma página relacionada.",
  "Kırık iç bağlantı": "Link interno quebrado",
  "Bu sayfa, hata veren (4xx ya da 5xx) başka bir sayfaya bağlantı veriyor. Kırık bağlantı ziyaretçiyi çıkmaza sokar ve Google'ın sayfaya ulaşmasını engeller; çok büyük sitelerde taramayı da boşa harcar.":
    "Esta página tem um link para outra página que retorna um erro (4xx ou 5xx). Um link quebrado leva os visitantes a um beco sem saída e impede o Google de chegar à página; em sites muito grandes, também desperdiça rastreamento.",
  "Bağlantıyı çalışan doğru adrese çevirin ya da kaldırın. Hedef taşındıysa yönlendirmeye güvenmeyin, doğrudan yeni adrese bağlanın.":
    "Aponte o link para o URL correto e funcional ou remova-o. Se o destino mudou de lugar, não dependa de um redirecionamento: crie o link direto para o novo URL.",
  "Sayfa açılırken hata veriyor (4xx)": "A página retorna um erro (4xx)",
  "Bu adres hata döndürdü (404 gibi). Site haritanızda ya da başka sayfalarda geçiyorsa Google boşuna istek yapmaya devam eder; bu, esas olarak çok büyük sitelerde tarama bütçesi açısından önemlidir.":
    "Este URL retornou um erro (como 404). Se ele aparecer no seu sitemap ou em outras páginas, o Google continuará solicitando-o à toa; isso importa principalmente para o orçamento de rastreamento de sites muito grandes.",
  "Sayfa var olmalıysa geri yayınlayın. Bilerek kaldırıldıysa site haritasından ve iç bağlantılardan çıkarın; yerine geçecek bir sayfa varsa oraya 301 (kalıcı) yönlendirme verin.":
    "Se a página deve existir, publique-a novamente. Se você a removeu de propósito, retire-a do sitemap e dos links internos; se outra página a substituir, adicione um redirecionamento 301 (permanente) para ela.",
  "Yönlendirme zinciri": "Cadeia de redirecionamento",
  "Son sayfaya ulaşmak için art arda iki ya da daha fazla yönlendirme gerekiyor. Her adım sayfayı yavaşlatır ve tarama bütçesinden (Google'ın siteniz için ayırdığı tarama zamanından) harcar; bu, esas olarak çok büyük siteler için önemlidir. Çok uzun zincirler (10 adımdan fazla) Google'ın takip ettiği kadarıyla hiç izlenmez.":
    "Para chegar à página final são necessários dois ou mais redirecionamentos consecutivos. Cada salto deixa a página mais lenta e consome orçamento de rastreamento (o tempo de rastreamento que o Google reserva para o seu site); isso importa principalmente para sites muito grandes. O Google não segue de forma alguma cadeias muito longas (mais de 10 saltos).",
  "İlk adresi ve ona bağlantı veren sayfaları doğrudan son hedefe yönlendirin; en fazla tek yönlendirme kalsın.":
    "Redirecione o primeiro URL e as páginas com links para ele diretamente para o destino final, de forma que reste no máximo um redirecionamento.",
  "Yönlendirme döngüsü": "Loop de redirecionamento",
  "Bu adresin yönlendirmesi dönüp dolaşıp kendine geliyor, yani sayfa hiç açılmıyor. Tarayıcılar ve Google hata verip vazgeçer.":
    "Os redirecionamentos deste URL voltam ao próprio URL, de modo que a página nunca carrega. Os navegadores e o Google desistem com um erro.",
  "Bu adresin yönlendirme kurallarını izleyip döngüyü kırın; zincir gerçekten açılan bir sayfada (200) bitmeli.":
    "Siga as regras de redirecionamento deste URL e quebre o loop; a cadeia deve terminar em uma página que realmente carregue (200).",
  "Hiçbir sayfadan bağlantı almayan sayfa":
    "Página sem links apontando para ela",
  "Taranan hiçbir sayfa bu adrese bağlantı vermiyor. Google sayfaları bağlantıları izleyerek bulur, bu yüzden böyle bir sayfa daha seyrek taranır ve ziyaretçi gezinerek ona ulaşamaz.":
    "Não há links de páginas rastreadas para este URL. O Google encontra páginas seguindo links, portanto, uma página como essa é rastreada com menos frequência e os visitantes não conseguem acessá-la navegando.",
  "İlgili sayfalardan buraya bağlantı verin (menü, ilgili yazılar, kategori sayfası). Sayfanın aramada çıkması gerekmiyorsa site haritasından da çıkarın.":
    "Crie links para ela a partir de páginas relacionadas (o menu, posts relacionados, uma página de categoria). Se a página não precisa aparecer na pesquisa, remova-a também do sitemap.",
  "Sunucu yanıtı yavaş": "Resposta lenta do servidor",
  "Sunucu sayfanın HTML'ini 600 milisaniyeden geç verdi; Lighthouse de aynı eşiği kullanır. Bu gecikme sayfanın geri kalan tüm hız ölçümlerini de aşağı çeker. Süre, denetimi çalıştıran bilgisayardan ölçülür, ziyaretçilerinizin bağlantısından değil.":
    "O servidor demorou mais de 600 milissegundos para entregar o HTML da página; o Lighthouse usa o mesmo limite. Esse atraso também reduz todas as outras medições de velocidade da página. O tempo é medido a partir do computador que executa a auditoria, não das conexões dos visitantes.",
  "Bu sayfa için sunucu ve veritabanı süresine bakın, önbelleği açın. Önbelleğe alınmış ya da önceden üretilmiş (statik) HTML sunmak genelde sorunu çözer.":
    "Analise os tempos do servidor e do banco de dados desta página e ative o cache. Servir HTML em cache ou pré-gerado (estático) geralmente resolve o problema.",
  "robots.txt dosyası sunucu hatası veriyor":
    "robots.txt retorna um erro de servidor",
  "robots.txt dosyanız 5xx sunucu hatası veriyor. Google'ın belgelerine göre bu durumda ilk 12 saat siteyi hiç taramaz, sonra 30 gün boyunca dosyanın son çalışan kopyasını kullanır. Yani bu tek dosyanın hatası tüm sitenin taranmasını etkiler.":
    "Seu arquivo robots.txt retorna um erro de servidor 5xx. De acordo com a documentação do Google, o Google então não rastreia o site nas primeiras 12 horas e, nos 30 dias seguintes, usa a última cópia funcional do arquivo. Portanto, um erro neste único arquivo afeta o rastreamento de todo o site.",
  "Sunucu hatasını giderin ve robots.txt adresinin normal açıldığını doğrulayın. Dosya hiç yoksa 404 döndürmesi sorun değildir; Google bunu 'kısıtlama yok' diye okur.":
    'Corrija o erro do servidor e confirme se o URL do robots.txt carrega normalmente. Se o arquivo não existir, um 404 não é problema; o Google o interpreta como "sem restrições".',
  "robots.txt'ye ulaşılamadı": "Não foi possível acessar o robots.txt",
  "robots.txt isteği tamamlanmadı (zaman aşımı, DNS ya da TLS hatası). Bu denetim dosyayı okuyamadığı için siteyi tamamen taranabilir saydı; gerçek robots.txt farklı kurallar içeriyor olabilir.":
    "A solicitação do robots.txt não foi concluída (tempo limite, erro de DNS ou TLS). Como esta auditoria não conseguiu ler o arquivo, ela tratou todo o site como rastreável; o robots.txt real pode conter regras diferentes.",
  "robots.txt adresini tarayıcıda açıp yanıt verdiğini kontrol edin. Yanıt veriyorsa hata geçici bir ağ sorunuydu, denetimi yeniden başlatın.":
    "Abra o URL do robots.txt em um navegador e verifique se ele responde. Se responder, o erro foi um problema temporário de rede; execute a auditoria novamente.",
  "robots.txt 500 KiB sınırını aşıyor": "robots.txt excede o limite de 500 KiB",
  "Google robots.txt dosyasının yalnızca ilk 500 KiB'ını okur, gerisini yok sayar. Dosyanız bu sınırı aştığı için sondaki kurallar Google için yokmuş gibi davranır.":
    "O Google lê apenas os primeiros 500 KiB de um arquivo robots.txt e ignora o restante. Seu arquivo ultrapassou esse limite, portanto as regras no final não existem no que diz respeito ao Google.",
  "Dosyayı kısaltın. Tek tek adresleri engellemek yerine klasör kalıpları kullanın. Aramada çıkmaması gereken sayfalar için robots.txt yerine noindex daha kesin bir yoldur. Ama noindex'in çalışması için sayfanın robots.txt ile engellenmemiş olması gerekir; Google engellenmiş sayfadaki noindex'i göremez.":
    "Encurte o arquivo. Use padrões de pasta em vez de bloquear URLs um por um. Para páginas que não deveriam aparecer na pesquisa, noindex é uma ferramenta mais confiável que o robots.txt. Mas para que o noindex funcione, a página não deve ser bloqueada pelo robots.txt; o Google não consegue ver um noindex em uma página bloqueada.",
  "Başlangıç adresi robots.txt ile engellenmiş":
    "O URL inicial está bloqueado pelo robots.txt",
  "Denetimi başlattığınız adresi sitenizin kendi robots.txt dosyası taramaya kapatıyor. Google da bu kurala uyar, yani bu sayfayı taramaz. Bu denetim de aynı nedenle o sayfadan başlayamadı.":
    "O robots.txt do seu site bloqueia o rastreamento do URL a partir do qual você iniciou a auditoria. O Google também segue essa regra, por isso não rastreia esta página. Pela mesma razão, esta auditoria não pôde ser iniciada a partir dela.",
  "Sayfanın taranması gerekiyorsa robots.txt'teki ilgili Disallow satırını kaldırın. Engel bilerek konduysa denetimi taranabilir bir adresten başlatın.":
    "Se a página precisar ser rastreada, remova a linha Disallow correspondente do robots.txt. Se o bloqueio for intencional, inicie a auditoria a partir de um URL rastreável.",
  "Site haritasındaki sayfa açılmıyor": "A página do sitemap não carrega",
  "Bu adres site haritanızda listelenmiş ama hata veriyor. Site haritası Google'a 'şu sayfaları tara' demenin yoludur; açılmayan adres listelemek Google'ı boşa gönderir ve haritanıza güveni azaltır.":
    'Este URL está listado no seu sitemap, mas retorna um erro. O sitemap é a forma de dizer ao Google "rastreie estas páginas"; listar URLs que não carregam faz o Google desperdiçar solicitações e torna o sitemap menos confiável.',
  "Sayfa var olmalıysa hatayı giderin. Kaldırıldıysa adresi site haritasından çıkarın. Harita otomatik üretiliyorsa, silinen sayfaları listelememesi için üreticinin ayarını kontrol edin.":
    "Se a página deve existir, corrija o erro. Se ela foi removida, retire o URL do sitemap. Se o sitemap for gerado automaticamente, verifique as configurações do gerador para que ele pare de listar as páginas excluídas.",
  "Site haritasındaki sayfa yönlendiriyor": "Página do sitemap redireciona",
  "Bu adres site haritanızda listelenmiş ama başka bir adrese yönlendiriyor. Google site haritasındaki adresleri 'asıl adres' önerisi sayar (asıl adres: aynı sayfanın aramada gösterilmesini istediğiniz tek adres). Yani asıl olmadığını kendiniz söylediğiniz bir adresi öneriyorsunuz.":
    "Este URL está listado no seu sitemap, mas redireciona para outro URL. O Google trata os URLs do sitemap como sugestões de canônico (o canônico é o URL que você quer que apareça na pesquisa para uma página). Então você está sugerindo um URL que você mesmo diz não ser canônico.",
  "Site haritasında yönlendirmenin kaynağını değil, vardığı hedef adresi listeleyin.":
    "Liste o URL de destino do redirecionamento no sitemap, não sua origem.",
  "Site haritasındaki adres robots.txt ile engellenmiş":
    "O URL do sitemap está bloqueado por robots.txt",
  "Bu adres için iki kural çelişiyor: site haritası Google'a 'bunu tara' derken robots.txt 'tarama' diyor. Google robots.txt'ye uyar ve sayfayı taramaz; başka sitelerden bağlantı alıyorsa içeriğini görmeden yine de dizine alabilir.":
    'Duas regras entram em conflito para este URL: o sitemap diz ao Google "rastreie isto" enquanto o robots.txt diz "não". O Google segue o robots.txt e não rastreia a página; se outros sites tiverem links para ela, o Google ainda poderá indexá-la sem ver seu conteúdo.',
  "Sayfanın aramada çıkmasını istiyorsanız robots.txt engelini kaldırın. İstemiyorsanız adresi site haritasından çıkarın.":
    "Se você quiser a página na pesquisa, remova o bloqueio no robots.txt. Caso contrário, retire o URL do sitemap.",
  "Site haritasındaki sayfa, asıl adres olarak başka sayfayı gösteriyor":
    "Uma página do sitemap indica outra página como canônica",
  "Bu sayfa site haritasında listelenmiş ama kendi içinde asıl adres olarak başka bir adresi gösteriyor. Aynı sayfa için iki farklı öneri göndermiş oluyorsunuz; Google birini seçer. Bilerek yaptıysanız sorun yok.":
    "Esta página está listada no sitemap, mas a própria tag canonical aponta para um URL diferente. Você está enviando duas sugestões diferentes para a mesma página e o Google escolhe uma. Se você fez isso de propósito, tudo bem.",
  "Site haritasında yalnızca asıl adresler olmalı: bu adresi haritadan çıkarın ya da sayfanın canonical (asıl adres) etiketini sayfanın kendi adresine çevirin.":
    "Um sitemap deve conter apenas URLs canônicos: remova este URL do sitemap ou altere a tag canonical da página para o URL da própria página.",
  "Site haritasındaki sayfa arama sonuçlarından gizlenmiş":
    "A página do sitemap está oculta nos resultados da pesquisa",
  "Bu sayfa site haritasında listelenmiş ama noindex ile aramadan gizlenmiş. Yani hem 'bunu tara' hem 'bunu gösterme' diyorsunuz. Sayfayı yeni gizlediyseniz bu geçici olabilir: Google noindex'i görmek için sayfayı bir kez daha taramalı.":
    'Esta página está listada no sitemap, mas oculta da pesquisa com noindex. Ou seja, você está dizendo "rastreie isto" e "não mostre isto" ao mesmo tempo. Se você acabou de ocultar a página, isso pode ser temporário: o Google precisa rastrear a página mais uma vez para ver o noindex.',
  "Sayfa aramada çıkacaksa noindex'i kaldırın. Kalıcı olarak gizli kalacaksa, Google noindex'i gördükten sonra adresi site haritasından çıkarın.":
    "Se a página deve aparecer na pesquisa, remova o noindex. Se ela deve permanecer oculta para sempre, remova o URL do sitemap depois que o Google tiver visto o noindex.",
  "Sayfa site yapısında çok derinde":
    "A página está profundamente enterrada na estrutura do site",
  "Bu sayfa ana sayfadan 5 ya da daha fazla tık uzakta. Derin sayfalar Google tarafından daha seyrek taranabilir ve ziyaretçinin bulması zorlaşır.":
    "Esta página está a 5 ou mais cliques da página inicial. O Google pode rastrear páginas profundas com menos frequência e os visitantes têm mais dificuldade em encontrá-las.",
  "Kategori sayfaları, menü ya da öne çıkan listeler gibi üst sayfalardan buraya bağlantı vererek yolu kısaltın.":
    "Encurte o caminho criando links para cá a partir de páginas de nível superior, como páginas de categoria, o menu ou listas de destaque.",
  "Site haritası dosyası okunamayacak kadar büyük":
    "O arquivo do sitemap é muito grande para ser lido",
  "Site haritası parçalarından biri bu aracın okuma sınırını (10 MB) aştı, bu yüzden içindeki adresler bu denetime girmedi. Google'ın sınırı 50 MB olduğundan dosya Google için geçerli olabilir; ama buradaki sayfa listesi eksik.":
    "Um dos arquivos do sitemap excedeu o limite de leitura desta ferramenta (10 MB), portanto os URLs dele não foram incluídos nesta auditoria. O limite do Google é de 50 MB, então o arquivo ainda pode ser válido para o Google, mas a lista de páginas aqui está incompleta.",
  "Site haritanızı daha küçük parçalara bölün ve bir site haritası dizini (sitemapindex) ile birbirine bağlayın. Her parça 50 MB ve 50.000 adresin altında kalmalı; daha küçük parçalar iki tarafın da işine yarar.":
    "Divida seu sitemap em arquivos menores e reúna-os com um índice de sitemaps (sitemapindex). Mantenha cada arquivo com menos de 50 MB e 50.000 URLs; arquivos menores funcionam melhor para ambas as ferramentas.",
  "Site haritasında 50.000'den fazla adres var":
    "O sitemap tem mais de 50.000 URLs",
  "Google bir site haritası dosyasında en fazla 50.000 adrese izin verir. Bu parça sınırı aşıyor; Google dosyayı reddedebilir ya da bir kısmını yok sayabilir.":
    "O Google permite no máximo 50.000 URLs em um arquivo de sitemap. Este arquivo excede o limite; o Google pode rejeitá-lo ou ignorar parte dele.",
  "Dosyayı her biri 50.000 adresin altında kalan parçalara bölün ve hepsini bir site haritası dizini (sitemapindex) dosyasında listeleyin. Search Console'a parçaları tek tek değil, yalnızca dizin dosyasını gönderin.":
    "Divida o arquivo em partes com menos de 50.000 URLs cada e liste todas elas em um arquivo de índice de sitemaps (sitemapindex). Envie apenas o arquivo de índice ao Search Console, não cada parte.",
  "Site haritasında hiç lastmod tarihi yok": "O sitemap não tem datas lastmod",
  "Site haritasındaki adreslerin hiçbirinde <lastmod> (son değişiklik tarihi) yok. Google bu alan doğru olduğu sürece hangi sayfayı ne zaman yeniden tarayacağını buna göre seçer. Yoksa yeniden tarama Google'ın kendi takvimine kalır; güncellediğiniz sayfanın fark edilmesi günler sürebilir.":
    "Nenhum dos URLs no sitemap tem um <lastmod> (data da última modificação). Desde que este campo esteja correto, o Google o utiliza para decidir quais páginas rastrear novamente e quando. Sem ele, o novo rastreamento segue a programação do próprio Google e pode levar dias para que uma página atualizada seja notada.",
  "Site haritasını üreten ayarda ya da eklentide her adres için <lastmod> açın ve içeriğin gerçekten değiştiği tarihi yazdırın. Yayın tarihini ya da her derlemedeki anı yazmayın; bu alanı değersiz kılar.":
    "Ative <lastmod> para cada URL na configuração ou no plugin que gera seu sitemap e faça com que ele registre a data em que o conteúdo realmente mudou. Não registre a data de publicação nem a hora de cada build; isso torna o campo inútil.",
  "Site haritasında gelecek tarihli lastmod var":
    "O sitemap tem uma data de última modificação no futuro",
  "En az bir adresin <lastmod> (son değişiklik tarihi) değeri gelecekte. Bu doğru olamaz; Google bir sitenin tarihlerini tutarsız bulursa alanı o site için tümden yok sayar, yani doğru tarihleriniz de işe yaramaz.":
    "Pelo menos um URL tem um <lastmod> (data da última modificação) no futuro. Isso não pode estar certo; quando o Google considera que as datas de um site não são confiáveis, ele ignora o campo de todo o site, portanto, as datas corretas também deixam de ajudar.",
  "Tarihleri üreten yeri kontrol edin. Genelde sunucu saatinin ileri olmasından ya da tarih alanına içerik tarihi yerine yayın planı tarihinin yazılmasından olur; düzeltip site haritasını yeniden üretin.":
    "Verifique o que gera as datas. Geralmente é o relógio do servidor adiantado ou uma data de publicação agendada escrita no campo em vez da data do conteúdo. Corrija-o e gere novamente o sitemap.",
  "Sayfanın ihtiyaç duyduğu dosya robots.txt ile engellenmiş":
    "Um arquivo que a página precisa está bloqueado pelo robots.txt",
  "Sayfa taranabiliyor ama içindeki bir JavaScript ya da CSS dosyası robots.txt ile kapatılmış. Google engellenen dosyadaki JavaScript'i çalıştırmaz ve CSS'i okuyamaz; içerik JavaScript ile geliyorsa Google boş bir sayfa görür. Klasik örnek `Disallow: /wp-includes/` kuralıdır.":
    "A página pode ser rastreada, mas um arquivo JavaScript ou CSS que ela usa é bloqueado pelo robots.txt. O Google não executa JavaScript a partir de um arquivo bloqueado e não consegue ler seu CSS; se o conteúdo for carregado com JavaScript, o Google verá uma página vazia. O exemplo clássico é uma regra `Disallow: /wp-includes/`.",
  "robots.txt'den bu dosyaları kapsayan kuralı kaldırın. Sayfayı gizlemek istiyorsanız sayfanın kendisini engelleyin; onu oluşturan dosyaları engellemek sayfayı gizlemez, yalnızca Google'ın yanlış görmesine yol açar.":
    "Remova a regra do robots.txt que cobre esses arquivos. Se quiser ocultar a página, bloqueie a própria página; bloquear os arquivos que a compõem não a oculta, apenas faz o Google vê-la errado.",
  "İç bağlantı yönlendirmeye gidiyor":
    "O link interno aponta para um redirecionamento",
  "Bu sayfa sitenizdeki bir adrese bağlantı veriyor ama o adres başka bir yere yönlendiriyor. Bağlantı çalışır ama fazladan bir adım atılır: ziyaretçi bekler ve Google yönlendirmeyi de izlemek zorunda kalır (tarama bütçesi esas olarak çok büyük sitelerde önemlidir). Genelde adresler değişip iç bağlantılar eskisinde kalınca olur.":
    "Esta página tem um link para um URL do seu site, mas esse URL redireciona para outro lugar. O link funciona, mas com uma etapa extra: os visitantes esperam e o Google também precisa seguir o redirecionamento (o orçamento de rastreamento importa principalmente em sites muito grandes). Geralmente acontece quando os URLs mudam e os links internos mantêm o antigo.",
  "Bağlantıyı yönlendirmenin vardığı yeni adresle değiştirin. Yönlendirmenin kendisi kalsın; dışarıdan gelen bağlantılar için gerekli. Düzeltilecek olan kendi sitenizin içinden verdiğiniz adrestir.":
    "Substitua o link pelo novo URL para o qual o redirecionamento leva. Mantenha o próprio redirecionamento; links de outros sites ainda precisam dele. O que precisa ser corrigido é o URL para o qual você cria links dentro do seu próprio site.",
  "Sayfa güvenli olmayan http ile açılıyor":
    "A página é carregada em http inseguro",
  'Sayfa şifreli (https) yerine düz http ile sunuluyor. Tarayıcılar adres çubuğunda "Güvenli değil" uyarısı gösterir, formlara girilen bilgiler başkalarınca görülebilir ve Google https\'i hafif bir sıralama işareti sayar. Aynı içeriğin iki sürümü varsa https olanı tercih eder.':
    'A página é servida em http simples em vez de https criptografado. Os navegadores mostram um aviso "Não seguro" na barra de endereço, as informações inseridas nos formulários podem ser vistas por outras pessoas e o Google trata o https como um leve sinal de posicionamento. Quando o mesmo conteúdo existe nas duas versões, o Google prefere a https.',
  'Barındırma firmanızdan ya da site oluşturucunuzun ayarlarından ücretsiz bir SSL sertifikası açın. Sonra tüm http adreslerini kalıcı yönlendirmeyle (301) https karşılığına gönderin; "http://siteniz.com/hakkimizda" açılınca "https://siteniz.com/hakkimizda" adresine geçilsin.':
    'Ative um certificado SSL gratuito no seu provedor de hospedagem ou nas configurações do seu criador de sites. Em seguida, redirecione cada URL http para o equivalente https com um redirecionamento permanente (301), de modo que "http://seusite.com/sobre" leve a "https://seusite.com/sobre".',
  "Güvenli sayfada güvensiz kaynak": "Recurso inseguro em uma página segura",
  "Bu https sayfa, http ile yüklenen bir betik ya da stil dosyası istiyor. Tarayıcılar bunu engeller: betik çalışmaz, stil uygulanmaz. Google'ın sayfayı işlerken bu dosyayı yükleyememesi de mümkündür; bu yüzden sayfa sizin gördüğünüzden farklı işlenebilir. Adres çubuğundaki kilit de bozulur.":
    "Esta página https solicita um script ou folha de estilo por http. Os navegadores bloqueiam: o script não é executado e os estilos não são aplicados. O Google também pode não conseguir carregar o arquivo durante a renderização, então a página pode ser processada de forma diferente do que você vê. O cadeado na barra de endereço também deixa de aparecer.",
  "Dosyanın adresini https'e çevirin. Dosya https sunmuyorsa kendi sunucunuza alın ya da https sunan bir alternatifle değiştirin.":
    "Altere o URL do arquivo para https. Se o arquivo não estiver disponível em https, hospede-o em seu próprio servidor ou substitua-o por uma alternativa que suporte https.",
  "Karakter kodlaması belirtilmemiş":
    "A codificação de caracteres não foi declarada",
  "Ne sunucu yanıtında ne de sayfanın ilk 1024 baytında karakter kodlaması (charset) belirtilmiş. Bu durumda tarayıcı ve Google kodlamayı tahmin eder; yanlış tahmin ettiğinde Türkçe karakterler (ş, ğ, ı) bozuk görünür.":
    "Nem a resposta do servidor nem os primeiros 1.024 bytes da página declaram uma codificação de caracteres (charset). Os navegadores e o Google então adivinham a codificação; quando erram, caracteres não ingleses (como ş, ğ, ı) aparecem distorcidos.",
  'Sayfanın <head> bölümünün en başına `<meta charset="utf-8">` ekleyin. Şablondan üretiliyorsa şablonda bir kez eklemeniz yeter.':
    'Adicione `<meta charset="utf-8">` bem no início do <head> da página. Se as páginas vierem de um modelo, basta adicioná-la uma vez no modelo.',
  "Sayfa adresi çok uzun": "O URL da página é muito longo",
  "Sayfanın adresi 115 karakterden uzun. Google için katı bir sınır yok ve sıralamayı etkilemez; ama uzun adres paylaşırken kırılır, arama sonucunda kısalarak görünür ve yazarken hata yapılmasına yol açar. Çoğu zaman adrese sorgu parametreleri ya da gereksiz klasörler eklenmiştir.":
    "O URL da página tem mais de 115 caracteres. O Google não tem limite rígido e isso não afeta o posicionamento, mas um URL longo quebra quando compartilhado, aparece encurtado nos resultados de pesquisa e favorece erros de digitação. Geralmente foram adicionados a ele parâmetros de consulta ou pastas desnecessárias.",
  "Adresi kısa ve anlamlı tutun: klasör derinliğini azaltın, gereksiz kelimeleri ve parametreleri çıkarın. Adresi değiştirirseniz eskisinden yenisine 301 yönlendirme verin.":
    "Mantenha URLs curtos e significativos: reduza a profundidade da pasta e remova palavras e parâmetros desnecessários. Se você alterar um URL, adicione um redirecionamento 301 do antigo para o novo.",
  "Adreste büyük harf ya da alt çizgi var":
    "O URL contém letras maiúsculas ou sublinhados",
  "Sayfa adresinin yol kısmında büyük harf ya da alt çizgi (_) var. Adresler büyük/küçük harfe duyarlıdır: /Hakkimizda ile /hakkimizda Google'a iki ayrı sayfa gibi görünebilir ve içerik çift dizine girer. Google ayrıca kelimeleri ayırmak için tire (-) kullanılmasını önerir.":
    "O caminho do URL da página contém letras maiúsculas ou sublinhados (_). URLs diferenciam maiúsculas de minúsculas: /About e /about podem parecer duas páginas separadas para o Google, e o conteúdo é indexado duas vezes. O Google também recomenda hífens (-) para separar palavras.",
  "Adresleri küçük harf ve tireyle yazın. Büyük harfli adrese gelenleri küçük harfli adrese 301 ile yönlendirin ve asıl adresi (canonical) küçük harfli olarak belirtin.":
    "Escreva URLs em letras minúsculas com hífens. Redirecione os visitantes que chegam a um URL maiúsculo para um URL minúsculo com um 301 e declare o URL minúsculo como canônico.",
  "Başlık etiketi yok": "Sem tag title",
  "Sayfanın başlık etiketi (<title>) yok. Başlık, arama sonucunda mavi bağlantı olarak görünen yazıdır. Yoksa Google başlığı sayfadaki başlıklardan ya da başka bağlantı metinlerinden türetir; bu, sizin seçmeyeceğiniz bir metin olabilir.":
    "A página não tem tag title (<title>). O título é o texto mostrado como link azul nos resultados da pesquisa. Sem ele, o Google cria um título a partir dos cabeçalhos da página ou de outro texto de link, que pode não ser o texto que você escolheria.",
  "Sayfaya konusunu anlatan, sayfaya özgü bir <title> ekleyin (yaklaşık 50-60 karakter bir ölçüttür, kural değil). SEO eklentisi ya da site oluşturucunuz varsa başlık alanını doldurmanız yeter.":
    "Adicione um <title> exclusivo da página que descreva seu tópico (cerca de 50 a 60 caracteres é uma referência, não uma regra). Se você usa um plugin de SEO ou um criador de sites, basta preencher o campo de título.",
  "Meta açıklama yok": "Sem meta descrição",
  "Sayfanın meta açıklaması yok. Bu, arama sonucunda başlığın altında görünen kısa özet yazısıdır. Yoksa Google özeti sayfa metninden kendisi seçer; bu özet sizin vermek istediğiniz mesaj olmayabilir.":
    "A página não possui meta descrição. Esse é o breve resumo mostrado sob o título nos resultados da pesquisa. Sem ele, o Google escolhe um snippet do próprio texto da página, que pode não ser a mensagem que você deseja transmitir.",
  "Sayfayı özetleyen ve tıklamak için bir neden veren bir meta açıklama yazın. Yaklaşık 70-160 karakter bir ölçüttür, kural değil; Google sınır koymaz, kesilme ekran genişliğine göre değişir.":
    "Escreva uma meta descrição que resuma a página e dê às pessoas um motivo para clicar. Cerca de 70 a 160 caracteres são um guia, não uma regra; o Google não define limites, e onde ele será cortado depende da largura da tela.",
  "H1 başlığı yok": "Sem título H1",
  "Sayfada H1 (ana başlık) yok. Google H1'i zorunlu tutmaz, ama başlıklar ziyaretçinin sayfanın konusunu ilk bakışta anlamasını ve ekran okuyucuyla gezinmeyi kolaylaştırır; Google da başlıkları sayfanın yapısını anlamak için kullanabilir.":
    "A página não possui H1 (título principal). O Google não exige H1, mas os títulos ajudam os visitantes a compreender rapidamente o tópico da página e facilitam a navegação do leitor de tela; o Google também pode usar títulos para entender a estrutura da página.",
  "Sayfaya konusunu anlatan tek bir H1 ekleyin; başlık etiketiyle uyumlu olsun.":
    "Adicione um único H1 que descreva o tópico da página, alinhado com sua tag de título.",
  "Birden çok H1 başlığı": "Vários títulos H1",
  "Sayfada birden fazla H1 var. Google bunu sorun etmez, yani ceza yok. Ama çoğu zaman şablon hatasının işaretidir; örneğin logo ile sayfa başlığının ikisi de H1 olmuştur.":
    "A página tem mais de um H1. O Google não se importa, então não há penalidade. Mas muitas vezes é sinal de um erro no modelo, como o logotipo e o título da página serem ambos H1.",
  "Ana başlık için tek H1 bırakın, diğerlerini H2 ya da H3 yapın. Logo gibi başlık olmayan öğelerden H1 etiketini kaldırın.":
    "Mantenha um H1 para o título principal e torne os outros H2 ou H3. Remova a tag H1 de elementos que não sejam títulos, como o logotipo.",
  "Sayfada neredeyse hiç metin yok": "A página quase não tem texto",
  "Bu sayfada neredeyse hiç görünür metin bulunamadı. Genelde içeriğin JavaScript ile sonradan yüklenmesi ve ilk gelen HTML'de yer almaması yüzünden olur. Metnin kısa olması sorun değil; sorun sayfanın boş görünmesi, çünkü Google boş sayfayı dizine almak istemez.":
    "Quase nenhum texto visível foi encontrado nesta página. Isso geralmente acontece quando o conteúdo é carregado posteriormente com JavaScript e não está no HTML inicial. Texto curto não é o problema; o problema é que a página parece vazia, porque o Google não deseja indexar páginas vazias.",
  "Sayfayı açıp metnin göründüğünü, sonra sağ tık > Sayfa kaynağını görüntüle ile aynı metnin orada da olduğunu kontrol edin. Yoksa içeriği sunucu tarafında üretin. Sayfa gerçekten boşsa noindex ekleyin ya da daha dolu bir sayfayla birleştirin.":
    "Abra a página e verifique se o texto aparece; depois, use clique com o botão direito > Exibir código-fonte da página para verificar se o mesmo texto também está lá. Caso contrário, renderize o conteúdo no servidor. Se a página estiver realmente vazia, adicione noindex ou mescle-a a uma página mais completa.",
  "Alt metni olmayan görseller": "Imagens sem texto alternativo",
  "Sayfadaki bazı görsellerin alt metni (görseli anlatan kısa yazı) yok. Alt metin, görmeyen kullanıcılar için gereklidir ve Google'ın görselin ne olduğunu anlamasının başlıca yoludur.":
    "Algumas imagens na página não possuem texto alternativo (uma breve descrição da imagem). O texto alternativo é essencial para usuários cegos e é a principal maneira pela qual o Google entende o que uma imagem mostra.",
  'Anlam taşıyan her görsele ne gösterdiğini anlatan kısa bir alt metin yazın. Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").':
    'Dê a cada imagem significativa um pequeno texto alternativo descrevendo o que ela mostra. Deixe o texto alternativo vazio (alt="") apenas em imagens puramente decorativas.',
  "Sayfadan başka hiçbir yere bağlantı yok":
    "A página não tem links para nenhuma outra",
  "Bu sayfadan başka hiçbir sayfaya bağlantı verilmiyor, yani ziyaretçi ve Google için çıkmaz sokak. Google siteyi bağlantıları izleyerek gezer; buradan yeni bir yere gidemez.":
    "Esta página não tem link para nenhuma outra página, então é um beco sem saída para os visitantes e para o Google. O Google percorre um site seguindo links; a partir daqui, não há lugar novo.",
  "İlgili sayfalara, üst kategoriye ya da ana sayfaya bağlantı ekleyin. Menü JavaScript ile oluşuyorsa, bağlantıların ilk gelen HTML'de de bulunduğundan emin olun.":
    "Adicione links para páginas relacionadas, a categoria pai ou a página inicial. Se o menu for construído com JavaScript, certifique-se de que seus links também estejam no HTML inicial.",
  "Başlık çok uzun": "O título é muito longo",
  "Başlık yaklaşık 60 karakteri aşıyor. Bu bir ölçüt, kural değil: Google karakter sınırı koymaz, arama sonucunda kesilme ekran genişliğine göre değişir. Uzun başlıkta en önemli kısım görünmeyebilir.":
    "O título tem mais de 60 caracteres. Isso é um guia, não uma regra: o Google não define limite de caracteres e onde ele é cortado nos resultados da pesquisa depende da largura da tela. Em um título longo, a parte mais importante pode não aparecer.",
  "Başlığı yaklaşık 50-60 karaktere indirin ve en önemli kelimeleri başa koyun.":
    "Reduza o título para cerca de 50-60 caracteres e coloque as palavras mais importantes primeiro.",
  "Başlık çok kısa": "O título é muito curto",
  "Başlık 10 karakterden kısa. Bu kadar kısa bir başlık sayfanın ne sunduğunu anlatmaya ve tıklatmaya yetmez.":
    "O título tem menos de 10 caracteres. Um título tão curto não pode dizer o que a página oferece ou gerar um clique.",
  "Başlığı, sayfanın ne sunduğunu söyleyen bir ifadeye genişletin (yaklaşık 30-60 karakter).":
    "Expanda o título em uma frase que diga o que a página oferece (cerca de 30 a 60 caracteres).",
  "Meta açıklama çok uzun": "A meta descrição é muito longa",
  "Meta açıklama yaklaşık 160 karakteri aşıyor. Bu bir ölçüt, kural değil: Google sınır koymaz, arama sonucunda kesilme ekran genişliğine göre değişir. Uzun açıklamada sondaki mesaj görünmeyebilir.":
    "A meta descrição tem mais de 160 caracteres. Isso é um guia, não uma regra: o Google não estabelece limites e onde ele é cortado nos resultados da pesquisa depende da largura da tela. Em uma descrição longa, a mensagem no final pode não aparecer.",
  "Ana mesajı başta tutarak açıklamayı yaklaşık 70-160 karaktere indirin.":
    "Reduza a descrição para cerca de 70-160 caracteres, mantendo a mensagem principal no início.",
  "Meta açıklama çok kısa": "A meta descrição é muito curta",
  "Meta açıklama yaklaşık 70 karakterden kısa. Bu bir ölçüt, kural değil; ama bu kadar kısa yazı arama sonucundaki alanı boşa harcar ve Google bunun yerine sayfadan kendi seçtiği bir metni gösterebilir.":
    "A meta descrição tem menos de 70 caracteres. Isso é um guia, não uma regra; mas um texto tão curto desperdiça espaço nos resultados de pesquisa, e o Google pode mostrar um snippet de sua própria escolha na página.",
  "Açıklamayı, sayfayı özetleyen ve tıklamak için bir neden veren yaklaşık 70-160 karaktere genişletin.":
    "Expanda a descrição para cerca de 70 a 160 caracteres que resumem a página e fornecem um motivo para clicar.",
  "Başlık seviyeleri atlanmış": "Os níveis de título são ignorados",
  "Başlık seviyeleri atlanmış, örneğin H2'den sonra doğrudan H4 gelmiş. Bu, ekran okuyucuyla gezinen ziyaretçiler için sayfa yapısını karıştırır; Google için sıralama kuralı yoktur. Menü ve altbilgi başlıkları da bu sıralamaya dahil olduğundan bazen yanlış alarm olabilir.":
    "Os níveis de título são pulados, por exemplo, um H4 vem logo após um H2. Isso confunde a estrutura da página para os visitantes que navegam com um leitor de tela; o Google não tem regra de ordem. Os títulos do menu e do rodapé também contam para a ordem, então às vezes isso pode ser um alarme falso.",
  "Başlıkları sırayla kullanın: H1, sonra H2, sonra H3. Seviye atlayan başlığı bir kademe yukarı çekin. Atlamanın menü ya da altbilgiden geldiğini görürseniz orada başlık etiketi yerine düz metin kullanın.":
    "Use os títulos na ordem: H1, depois H2 e depois H3. Suba um nível o título que pula um nível. Se o salto vier do menu ou do rodapé, use texto simples ali em vez de uma tag de título.",
  "Mobil görünüm etiketi (viewport) yok":
    "Nenhuma meta tag viewport para dispositivos móveis",
  'Sayfada mobil görünüm etiketi (`<meta name="viewport">`) yok. Google siteleri telefon sürümü üzerinden değerlendirir; bu etiket yoksa sayfa telefonda masaüstü genişliğinde açılır ve okumak için yakınlaştırmak gerekir. Bu denetim taranan her sayfaya bakar, bu yüzden bozuk bir şablon gözden kaçmaz.':
    'A página não tem a meta tag viewport para dispositivos móveis (`<meta name="viewport">`). O Google avalia os sites pela versão para dispositivos móveis; sem essa tag, a página abre com a largura de desktop em um telefone e precisa ser ampliada para ser lida. Esta auditoria verifica todas as páginas rastreadas, para que um modelo quebrado não passe despercebido.',
  'Sayfanın `<head>` bölümüne `<meta name="viewport" content="width=device-width, initial-scale=1">` satırını ekleyin. Hemen her site için doğru değer budur.':
    'Adicione `<meta name="viewport" content="width=device-width, initial-scale=1">` ao `<head>` da página. Esse é o valor correto para quase todos os sites.',
  "Sayfa dili belirtilmemiş": "O idioma da página não foi declarado",
  "Sayfanın `<html>` etiketinde `lang` (sayfa dili) yok. Ekran okuyucular doğru telaffuz için, tarayıcılar çeviri önerisi için buna bakar. Google dili içerikten de anlar, ama açıkça yazmak belirsizliği ortadan kaldırır.":
    "A tag `<html>` da página não tem `lang` (idioma da página). Os leitores de tela usam esse atributo para a pronúncia correta e os navegadores para oferecer tradução. O Google também consegue identificar o idioma pelo conteúdo, mas declará-lo elimina qualquer dúvida.",
  'Sayfanın başındaki `<html>` etiketine dilinizi ekleyin; Türkçe bir sayfa için `<html lang="tr">`. Sayfalar tek şablondan üretiliyorsa şablonda bir kez düzeltmek hepsine yeter.':
    'Adicione seu idioma à tag `<html>` no topo da página, por exemplo `<html lang="en">` para uma página em inglês. Se as páginas vierem de um único modelo, corrigir o modelo uma vez resolve todas.',
  "Görsellerde genişlik ve yükseklik yok":
    "As imagens não têm largura e altura",
  "Sayfada genişlik (width) ve yükseklik (height) belirtilmemiş üç ya da daha fazla görsel var. Tarayıcı görsel inmeden ona ne kadar yer ayıracağını bilemez; görsel gelince yazılar aşağı kayar ve okuyan kişi yerini kaybeder.":
    "A página tem três ou mais imagens sem largura e altura definidas. O navegador não sabe quanto espaço reservar antes do download de uma imagem; quando ela chega, o texto pula para baixo e o leitor perde o ponto onde estava.",
  'Her `<img>` etiketine görselin gerçek boyutunu yazın: `<img src="..." width="800" height="600">`. CSS ile küçültüyorsanız bu değerler oranı korur, yine de yazın. SVG görsellerde gerek yok.':
    'Dê a cada tag `<img>` o tamanho real da imagem: `<img src="..." width="800" height="600">`. Se você reduzir com CSS, esses valores manterão a proporção, então defina-os de qualquer maneira. Imagens SVG não precisam deles.',
  "Uzun metinde alt başlık yok": "O texto longo não tem subtítulos",
  "Sayfada epey uzun metin var ama H1 dışında hiç başlık yok. Alt başlıklar uzun metni taranabilir yapar ve Google'ın sayfanın hangi konuları kapsadığını anlamasına yardım eder.":
    "A página tem bastante texto, mas nenhum título além do H1. Os subtítulos facilitam a leitura de textos longos e ajudam o Google a entender quais tópicos a página cobre.",
  "Metni konularına göre bölün ve her bölüme bir H2 başlığı verin. Başlıklar bölümün ne anlattığını söylesin; anahtar kelime doldurmayın.":
    "Divida o texto por tópico e atribua a cada seção um título H2. Deixe que cada título diga o que sua seção cobre; não encha com palavras-chave.",
  "Görselin alt metni bir dosya adı":
    "O texto alternativo da imagem é um nome de arquivo",
  "Bir görselin alt metni dosya adı ya da kamera çıktısı gibi duruyor (IMG_2231.jpg, DSC0043, ekran-goruntusu-1.png). Alt metin, görseli göremeyen birine ne olduğunu anlatmalıdır; dosya adı bunu yapmaz. Google'ın görselin konusunu anlamasına da yardım etmez.":
    "O texto alternativo de uma imagem se parece com um nome de arquivo ou saída de câmera (IMG_2231.jpg, DSC0043, screenshot-1.png). O texto alternativo deve informar a alguém que não consegue ver a imagem o que ela mostra; um nome de arquivo não. Também não ajuda o Google a entender o assunto da imagem.",
  'Alt metne görselde ne olduğunu yazın, örneğin "kırmızı koltukta oturan kadın". Yalnızca süs olan görsellerde alt metni boş bırakın (alt="").':
    'Escreva o que a imagem mostra no texto alternativo, por exemplo "mulher sentada em uma poltrona vermelha". Deixe o texto alternativo vazio (alt="") apenas em imagens puramente decorativas.',
  "Görsel alt metni çok uzun": "O texto alternativo da imagem é muito longo",
  "Bir görselin alt metni 250 karakteri aşıyor. Ekran okuyucular alt metni sonuna kadar okur; bu kadar uzun olunca görsel anlatımı paragrafa döner ve dinleyen sayfanın akışını kaybeder.":
    "O texto alternativo de uma imagem tem mais de 250 caracteres. Os leitores de tela leem o texto alternativo até o fim; nesse comprimento, a descrição da imagem se transforma em um parágrafo e o ouvinte perde o fluxo da página.",
  "Görselin ne olduğunu bir cümleyle anlatın (yaklaşık 125 karakter). Daha fazla anlatılacak şey varsa onu sayfanın metnine ya da görselin açıklama yazısına taşıyın.":
    "Descreva o que é a imagem em uma frase (cerca de 125 caracteres). Se houver mais a dizer, mova-o para o texto da página ou para a legenda da imagem.",
  "Sayfada birden fazla başlık etiketi (<title>)":
    "A página tem mais de uma tag title (<title>)",
  "Sayfada birden fazla <title> etiketi var. Bir sayfanın tek başlığı olur; Google hangisini alacağını kendisi seçer ve seçtiği, arama sonucunda görmek istediğiniz olmayabilir. Genelde şablon ile SEO eklentisinin ikisi birden başlık yazınca olur.":
    "A página tem mais de uma tag <title>. Uma página possui um título; o Google escolhe qual usar, e sua escolha pode não ser a que você deseja nos resultados de pesquisa. Geralmente acontece quando o modelo e um plugin de SEO escrevem um título.",
  "Sayfa kaynağında <title> araması yapın ve yalnızca birini bırakın. İkisi farklı yerden geliyorsa (şablon ve eklenti) birini kapatın.":
    "Pesquise <title> no código-fonte da página e mantenha apenas um. Se eles vierem de locais diferentes (modelo e plug-in), desative um deles.",
  "Sayfada birbirinden farklı birden fazla meta açıklama":
    "A página possui várias meta descrições diferentes",
  "Sayfada içeriği farklı iki ya da daha fazla meta açıklama var. Google hangisini özet olarak göstereceğini kendisi seçer, yani arama sonucunda çıkan yazı sizin yazdığınız olmayabilir. Şablon ile SEO eklentisinin ikisi birden yazınca olur.":
    "A página possui duas ou mais meta descrições com conteúdo diferente. O Google escolhe qual deles mostrar como snippet, portanto, o texto nos resultados da pesquisa pode não ser aquele que você escreveu. Isso acontece quando o modelo e um plugin de SEO escrevem um.",
  'Sayfa kaynağında name="description" araması yapın ve yalnızca birini bırakın. İki kaynak varsa (şablon ve eklenti) birini kapatın.':
    'Pesquise name="description" no código-fonte da página e mantenha apenas um. Se houver duas fontes (modelo e plug-in), desative uma delas.',
  "Başlık etiketi yer tutucu bir yazı": "A tag title é um texto provisório",
  'Sayfanın başlığı "Untitled", "Başlıksız" ya da "New Page" gibi kimsenin yazmadığı bir yer tutucu. Arama sonucunda mavi bağlantı olarak bu çıkabilir; kimse tıklamak istemez. Google da bazen bu başlığı kullanmayıp başka bir metinle değiştirir.':
    'O título da página é um texto provisório que ninguém escreveu, como "Sem título", "Başlıksız" ou "Nova página". Ele pode aparecer como o link azul nos resultados da pesquisa, e ninguém quer clicar nele. Às vezes, o Google também substitui esse título por outro texto.',
  "Sayfanın konusunu anlatan kendi başlığını yazın (yaklaşık 50-60 karakter bir ölçüttür). Sayfa sonradan doldurulacaksa dolana kadar noindex ile dizin dışında tutun.":
    "Escreva um título real que descreva o tópico da página (cerca de 50 a 60 caracteres é uma referência). Se a página for preenchida mais tarde, mantenha-a fora do índice com noindex até lá.",
  "Ana başlık (H1) çok uzun": "O título principal (H1) é muito longo",
  "Sayfanın ana başlığı (H1) 70 karakterden uzun. Google için bir sınır yok ve sıralamayı etkilemez; ama uzun başlık bir bakışta okunmaz, genelde de başlığa metin paragrafı yazılmıştır.":
    "O título principal da página (H1) tem mais de 70 caracteres. O Google não tem limite e isso não afeta o posicionamento, mas um título longo não pode ser lido num relance e, geralmente, foi colocado um parágrafo de texto no título.",
  "H1'i bir cümlelik, sayfanın konusunu söyleyen kısa bir başlığa indirin. Geri kalan açıklamayı başlığın altındaki paragrafa taşıyın.":
    "Reduza o H1 para um título curto de uma linha que indica o tópico da página. Mova o restante da descrição para o parágrafo abaixo dela.",
  "Metni olmayan iç bağlantılar": "Links internos sem texto",
  'Sayfada içinde yazı, görsel ya da erişilebilirlik etiketi (aria-label) olmayan iç bağlantılar var. Google bir bağlantının nereye gittiğini bağlantı metninden anlar; boş bağlantı hiçbir şey söylemez. Ekran okuyucu kullanan ziyaretçi için de bağlantı sadece "bağlantı" diye okunur.':
    'A página possui links internos sem texto, imagem ou rótulo de acessibilidade (aria-label) dentro. O Google entende para onde vai um link a partir de seu texto âncora; um link vazio não diz nada. Para visitantes que utilizam um leitor de tela, o link é lido apenas como "link".',
  'Bağlantıya görünür bir yazı ekleyin ya da yalnızca simge ise `aria-label="Sepet"` gibi ne yaptığını söyleyen bir etiket ekleyin. Kullanılmayan boş `<a>` etiketlerini silin.':
    'Adicione texto visível ao link ou, se for apenas um ícone, um rótulo que diga o que ele faz, como `aria-label="Cart"`. Exclua tags `<a>` vazias que não são usadas.',
  '"Buraya tıklayın" gibi anlamsız bağlantı metinleri':
    'Texto de link sem sentido, como "Clique aqui"',
  'Sayfada "buraya tıklayın", "devamı", "daha fazla", "click here" gibi hedefi anlatmayan iç bağlantı metinleri var (üç ya da daha fazla). Google, bağlantı metnini hedef sayfanın konusunu anlamak için kullanır; bu metinler o bilgiyi vermez. Ekran okuyucu kullanan biri bağlantı listesini açtığında hepsini aynı duyar.':
    'A página tem texto de link interno que não descreve o destino, como "clique aqui", "leia mais" ou "mais" (três ou mais deles). O Google usa texto âncora para entender o tópico da página de destino; essas frases não fornecem essa informação. Alguém que usa um leitor de tela ouve todos eles ao abrir a lista de links.',
  'Bağlantı metnini hedefin konusuyla değiştirin: "buraya tıklayın" yerine "2026 fiyat listesini indirin". Kart şablonlarında "Devamı" yazısına yazı başlığını ekleyin ya da görünmeyen bir aria-label ile tamamlayın.':
    'Substitua o texto do link pelo tópico do destino: em vez de "clique aqui", escreva "baixe a lista de preços de 2026". Nos modelos de cartão, adicione o título do post a "Leia mais" ou complete-o com um aria-label oculto.',
  "Sayfada çok fazla bağlantı": "Muitos links na página",
  "Sayfada 300'den fazla farklı adrese bağlantı var. Google'ın sabit bir sınırı yok ve bu tek başına sıralamayı düşürmez; ama bu kadar bağlantı ziyaretçinin seçim yapmasını zorlaştırır ve Google'ın önemli bağlantıyı ayırt etmesini güçleştirir. Genelde büyük bir menü ya da kategori listesinin her sayfada tekrarlanması yüzünden olur.":
    "A página contém links para mais de 300 URLs diferentes. O Google não tem limite fixo e isso por si só não reduz o posicionamento, mas tantos links dificultam a escolha dos visitantes e tornam mais difícil para o Google saber quais links importam. Geralmente vem de um grande menu ou lista de categorias repetido em todas as páginas.",
  "Menüyü ve alt bilgiyi (footer) en önemli sayfalarla sınırlayın. Uzun listeleri sayfalara bölün ya da kategori sayfalarına indirin.":
    "Limite o menu e o rodapé às páginas mais importantes. Divida listas longas em páginas ou mova-as para páginas de categoria.",
  "Kendi sitenizin sayfalarına nofollow bağlantılar":
    "Links nofollow para suas próprias páginas",
  'Sayfada kendi sitenizin sayfalarına giden üç ya da daha fazla bağlantıda rel="nofollow" var. nofollow, Google\'a "bu bağlantıya güvenme" demek içindir ve iç bağlantıda genelde gerek yoktur. Google bu bağlantıları takip etmeyebilir; yani sayfaya başka yolla ulaşılamıyorsa hedef sayfa dizine geç girer ya da hiç girmez.':
    'Três ou mais links na página que levam para seu próprio site carregam rel="nofollow". nofollow diz ao Google “não confie neste link” e links internos raramente precisam dele. O Google pode não seguir esses links, portanto, se a página de destino não puder ser acessada de outra forma, ela será indexada tarde ou nem será indexada.',
  'Kendi sayfalarınıza verdiğiniz bağlantılardan rel="nofollow" özelliğini kaldırın. Sayfanın dizine girmesini istemiyorsanız bağlantıyı değil sayfayı noindex ile işaretleyin.':
    'Remova rel="nofollow" dos links para suas próprias páginas. Se você não quer que uma página seja indexada, marque a própria página com noindex, não o link.',
  "Tekrarlanan başlık": "Título duplicado",
  "Birden çok sayfa aynı başlığı (<title>) kullanıyor. Aynı başlıkla arama sonucunda sayfalar birbirine benzer görünür ve ziyaretçi hangisine tıklayacağını seçemez.":
    "Várias páginas usam o mesmo título (<title>). Com o mesmo título, as páginas ficam parecidas nos resultados de pesquisa e os visitantes não sabem em qual clicar.",
  "Her sayfaya kendi içeriğini anlatan farklı bir başlık yazın. Şablondan üretilen sayfalarda ayırt edici bilgiyi (ürün adı, kategori, şehir) başlık şablonuna ekleyin.":
    "Escreva um título diferente para cada página que descreva seu próprio conteúdo. Para páginas geradas a partir de um modelo, adicione detalhes distintivos (nome do produto, categoria, cidade) ao modelo de título.",
  "Tekrarlanan ana başlık (H1)": "Título principal duplicado (H1)",
  "Birden çok sayfa aynı ana başlığı (H1) kullanıyor. Başlık, ziyaretçiye ve Google'a sayfanın ne hakkında olduğunu söyler; aynı başlık farklı sayfaları ayırt etmeyi zorlaştırır. Sitenin her sayfasında logo ya da site adı H1 olarak yazılmışsa bu uyarı genelde ondan gelir.":
    "Várias páginas usam o mesmo título principal (H1). O título informa aos visitantes e ao Google sobre o que trata a página; o mesmo título torna difícil distinguir páginas diferentes. Se o logotipo ou nome do site for H1 em todas as páginas, geralmente é daí que vem esse aviso.",
  "Her sayfanın H1'ini o sayfanın konusunu anlatan kendi cümlesiyle yazın. Logo ya da site adı H1 ise onu H1 olmayan bir etikete çevirin ve sayfa başlığını H1 yapın.":
    "Dê a cada página seu próprio H1 que indica o tópico da página. Se o logotipo ou nome do site for H1, altere-o para uma tag diferente de H1 e torne o título da página H1.",
  "Tekrarlanan meta açıklama": "Meta descrição duplicada",
  "Birden çok sayfa aynı meta açıklamayı (arama sonucunda başlığın altındaki özet) kullanıyor. Aramada hepsi aynı özetle çıkar ve ziyaretçi sayfaları ayırt edemez.":
    "Várias páginas usam a mesma meta descrição (o resumo abaixo do título nos resultados da pesquisa). Todas elas aparecem com o mesmo snippet na pesquisa e os visitantes não conseguem distinguir as páginas.",
  "Her sayfaya kendi açıklamasını yazın ya da yinelenen açıklamayı tamamen silin. Açıklama yoksa Google sayfa metninden bir özet seçer; bu, yanlış bir kopyadan iyidir.":
    "Escreva uma descrição para cada página ou exclua completamente a descrição duplicada. Sem ele, o Google escolhe um snippet do texto da página, o que é melhor do que uma cópia errada.",
  "Tekrarlanan sayfa içeriği": "Conteúdo duplicado da página",
  "İki ya da daha fazla adres birebir aynı metni gösteriyor. Google bunlardan birini seçip dizine alır ve seçtiği sizin istediğiniz olmayabilir. Ceza değildir, ama sıralama gücü adresler arasında bölünür.":
    "Dois ou mais URLs mostram exatamente o mesmo texto. O Google escolhe um deles para indexar, e a escolha pode não ser a que você deseja. Não é uma penalidade, mas a força de posicionamento é dividida entre os URLs.",
  "Asıl adresi (aramada görünmesini istediğiniz tek adres) seçin. Kopya adres kullanıcıya gerekmiyorsa 301 ile asıl adrese yönlendirin; kopya adres açık kalacaksa (parametreli sayfa gibi) canonical (asıl adres) etiketiyle asıl adresi gösterin. Sık nedenler: sonda eğik çizgi farkı, adrese eklenen parametreler, http/https ya da www farkı.":
    "Escolha o URL canônico (o URL que você deseja que seja exibido na pesquisa). Se os visitantes não precisarem do URL duplicado, redirecione-o para o canônico com 301; se a duplicata precisar permanecer disponível (uma página com parâmetros, por exemplo), aponte para o canônico com uma tag canônica. Causas comuns: diferença de barra final, parâmetros adicionados ao URL ou diferenças de http/https ou www.",
  "Sayfada canonical (asıl adres) etiketi yok":
    "A página não tem tag canonical",
  "Sayfa, kendi asıl adresini belirtmiyor. Aynı sayfa birden çok adresten açılabilir: sonunda eğik çizgi olan ve olmayan, ?utm_source gibi eklerle gelen, www'lu ve www'suz adresler. Etiket yoksa Google bunlardan hangisini göstereceğine kendi karar verir. Google bu etiketi zorunlu değil, önerilen bir işaret sayar; bu yüzden bu yalnızca bir öneridir.":
    "A página não declara seu próprio URL canônico. Muitas vezes, a mesma página pode ser aberta a partir de vários URLs: com e sem barra final, com adições como ?utm_source, com e sem www. Sem a tag, o Google decide qual mostrar. O Google trata essa tag como um sinal recomendado e não como um requisito. Portanto, isso é apenas uma sugestão.",
  'Sayfanın `<head>` bölümüne kendi tam adresini gösteren şu satırı ekleyin: `<link rel="canonical" href="https://www.siteniz.com/hakkimizda">`. Adres, aramada görünmesini istediğiniz adres olsun. Çoğu site oluşturucu ve SEO eklentisi bunu tek ayarla tüm sayfalara ekler.':
    'Adicione esta linha, apontando para o URL completo da própria página, ao `<head>` da página: `<link rel="canonical" href="https://www.yoursite.com/about">`. Use o URL que você deseja que seja mostrado na pesquisa. A maioria dos construtores de sites e plug-ins de SEO adicionam isso a cada página com uma única configuração.',
  "Asıl adres bildirimleri birbiriyle çelişiyor":
    "As declarações canônicas se contradizem",
  "Sayfa, asıl adresi iki yerde farklı söylüyor: HTML içindeki asıl adres etiketinde bir adres, HTTP Link başlığında başka bir adres. Sinyaller çelişince Google ikisini de bırakıp kendi seçimini yapar.":
    "A página indica seu URL canônico de maneira diferente em dois lugares: um URL na tag canonical no HTML e outro no cabeçalho HTTP Link. Quando os sinais entram em conflito, o Google ignora ambos e faz sua própria escolha.",
  "Tek bir asıl adres seçin ve onu yalnızca bir yerde bildirin (genelde HTML head). Diğerini kaldırın ya da aynı adrese çevirin.":
    "Escolha um URL canônico e declare-o em apenas um lugar (geralmente no cabeçalho HTML). Remova o outro ou altere-o para o mesmo URL.",
  "Sayfa arama sonuçlarından gizlenmiş (noindex)":
    "A página está oculta nos resultados da pesquisa (noindex)",
  "Sayfa, arama motorlarından kendisini dizine almamalarını istiyor (robots meta etiketi ya da X-Robots-Tag başlığıyla). Yani sayfa aramada çıkmaz. Çoğu zaman bilerek yapılır; bu bir hata değil, bilgi notudur.":
    "A página solicita que os mecanismos de pesquisa não a indexem (com uma meta tag robots ou um cabeçalho X-Robots-Tag). Portanto, a página não aparecerá na pesquisa. Isso geralmente é intencional; é uma nota, não um erro.",
  "Sayfa aramada çıkmalıysa noindex yönergesini kaldırın. Bilerek konduysa (yönetim paneli, teşekkür, filtre sayfaları gibi) yapmanız gereken bir şey yok.":
    "Se a página deve aparecer na pesquisa, remova a diretiva noindex. Se ela foi adicionada de propósito (páginas de administração, páginas de agradecimento, páginas de filtro e similares), não há nada a fazer.",
  "Sayfa, asıl adres olarak başka bir sayfayı gösteriyor":
    "A página nomeia outra página como canônica",
  "Sayfa asıl adres olarak başka bir adresi gösteriyor, yani Google'dan onun yerine o adresi dizine almasını istiyor. Bilerek yaptıysanız sorun yok (parametreli sayfalar gibi); ama bu sayfanın aramada çıkmasını istiyorsanız sorundur.":
    "A página nomeia outro URL como canônico, o que solicita ao Google que indexe esse URL. Tudo bem se você fez isso de propósito (páginas com parâmetros, por exemplo), mas é um problema se você quiser que esta página apareça na pesquisa.",
  "Bu sayfa kendi adıyla aramada çıkacaksa asıl adres etiketini sayfanın kendi adresine çevirin. Aksi halde yapılacak bir şey yok.":
    "Se esta página deve aparecer na pesquisa com o próprio URL, altere a tag canonical para o URL da própria página. Caso contrário, não há nada a fazer.",
  "Asıl adres olarak gösterilen sayfa açılmıyor":
    "O canônico aponta para uma página que não carrega",
  "Sayfa, asıl adres olarak hata veren (404 ya da 5xx) bir adresi gösteriyor. Asıl adres etiketi güçlü bir işarettir ama gösterdiği adres yayında değilse Google onu kullanamaz ve asıl adresi kendi seçer. Sonuç, hiç asıl adres vermemişsiniz gibi olur.":
    "A página indica como canônico um URL que retorna um erro (404 ou 5xx). A tag canonical é um sinal forte, mas se o URL para o qual ela aponta não estiver ativo, o Google não poderá usá-lo e escolherá ele mesmo o canônico. O resultado é como se você não tivesse indicado canônico algum.",
  "Asıl adres etiketini çalışan bir adrese çevirin ya da hedef sayfayı yeniden yayınlayın. Hedef gerçekten kaldırıldıysa etiket sayfanın kendi adresini göstersin.":
    "Aponte a tag canônica para um URL funcional ou publique a página de destino novamente. Se o alvo realmente foi removido, deixe a tag apontar para o próprio URL da página.",
  "Asıl adres olarak yönlendiren bir sayfa gösterilmiş":
    "O canônico aponta para uma página que redireciona",
  "Sayfa, asıl adres olarak başka yere yönlendiren (3xx) bir adresi gösteriyor. Yönlendirmenin kendisi zaten hedefin asıl olduğunu söyler; yani bu sayfa, asıl olmadığı bilinen bir adresi asıl diye öneriyor.":
    "A página indica como canônico um URL que redireciona para outro lugar (3xx). O próprio redirecionamento já diz que o destino é o canônico, então esta página sugere como canônico um URL que se sabe não ser.",
  "Asıl adres etiketini yönlendirmenin vardığı son adrese çevirin; bildirdiğiniz adres ile açılan adres aynı olsun.":
    "Aponte a tag canônica para o URL final ao qual o redirecionamento leva, de modo que o URL que você declara e o URL que carrega sejam os mesmos.",
  "Asıl adres olarak gizlenmiş bir sayfa gösterilmiş":
    "O canônico aponta para uma página oculta",
  "Sayfa, asıl adres olarak noindex ile gizlenmiş bir sayfayı gösteriyor. Noindex kesin bir yönergedir, asıl adres etiketi ise yalnızca bir işarettir; yani bu sayfa, Google'ın hiçbir zaman gösteremeyeceği bir adresi öneriyor ve kendisi de aramadan düşebilir.":
    "A página indica como canônica uma página oculta com noindex. O noindex é uma diretiva firme, enquanto a tag canonical é apenas um sinal. Portanto, esta página sugere um URL que o Google nunca poderá mostrar, e ela própria pode sair da pesquisa.",
  "İki yoldan biri: hedef sayfadaki noindex'i kaldırın ya da bu sayfanın asıl adres etiketini sayfanın kendi adresine çevirin.":
    "Faça um dos dois: remova o noindex da página de destino ou altere a tag canônica desta página para o próprio URL da página.",
  "Google sayfayı boş sayıyor (soft 404)":
    "O Google trata a página como vazia (soft 404)",
  "Sayfa normal açılıyor (200) ama Google onu 'bulunamadı' sayıyor (soft 404) ve dizine almıyor. Bunu yalnızca Google söyleyebilir; durum kodu sağlıklı göründüğü için tarayıcılar fark etmez. En sık boş sonuç sayfalarında, silinmiş ürünlerde ve 'kayıt bulunamadı' gösteren şablonlarda olur.":
    'A página carrega normalmente (200), mas o Google a trata como "não encontrada" (soft 404) e não a indexa. Somente o Google pode lhe dizer isso; os navegadores não percebem porque o código de status parece íntegro. Isso acontece mais em páginas de resultados vazias, produtos excluídos e modelos que mostram “nenhum registro encontrado”.',
  "Sayfa gerçekten yoksa 404 ya da 410 döndürün. Varsa, içeriğinin gerçek ve dolu olduğundan emin olun; boş liste şablonları en sık nedendir.":
    "Se a página realmente não existir, retorne 404 ou 410. Se existir, certifique-se de que seu conteúdo seja real e substancial; modelos de lista vazia são a causa mais comum.",
  "Google sayfayı robots.txt yüzünden tarayamıyor":
    "O Google não consegue rastrear a página por causa do robots.txt",
  "Google'ın URL Denetleme Aracı bu adresi robots.txt'nin engellediğini söylüyor. Bizim tarayıcımız sayfaya ulaşabildiği halde Google ulaşamıyorsa, iki tarayıcıya farklı kurallar uygulanıyor demektir.":
    "A ferramenta Inspeção de URL do Google diz que o robots.txt bloqueia este URL. Se nosso rastreador consegue acessar a página, mas o Google não, os dois rastreadores estão recebendo regras diferentes.",
  "robots.txt'te bu adresi kapsayan Disallow satırını bulup kaldırın. Googlebot'a özel bir kural (User-agent: Googlebot) olup olmadığına da bakın; çoğu zaman sorun genel kuralda değil, ona özel satırdadır.":
    "Encontre e remova a linha Disallow no robots.txt que cobre esse URL. Verifique também se há uma regra apenas para o Googlebot (User-agent: Googlebot); o problema geralmente está nessa linha específica e não na regra geral.",
  "Google sayfada gizleme etiketi (noindex) görüyor":
    "O Google vê uma tag noindex na página",
  "Google bu sayfada noindex (aramada gösterme) yönergesi gördüğünü söylüyor. Bizim tarayıcımız sayfayı dizine alınabilir görüyorsa, iki tarayıcı sayfanın farklı sürümlerini okuyor demektir; örneğin yönerge yalnızca JavaScript çalışınca ekleniyor olabilir.":
    "O Google diz que vê uma diretiva noindex (não mostrar na pesquisa) nesta página. Se nosso rastreador considerar a página indexável, os dois rastreadores estarão lendo versões diferentes da página; por exemplo, a diretiva pode ser adicionada somente quando o JavaScript é executado.",
  "Sayfanın kaynak kodunu Google'ın gördüğü haliyle karşılaştırın: Search Console'da URL Denetleme > Canlı URL'yi test et > Taranan sayfayı görüntüle > HTML ekranı işlenmiş HTML'i gösterir. Noindex'in nereden geldiğini bulup kaldırın.":
    "Compare o código-fonte da página com o que o Google vê: no Search Console, Inspeção de URL > Testar URL publicado > Ver página testada > HTML mostra o HTML renderizado. Descubra de onde vem o noindex e remova-o.",
  "Google başka bir adresi asıl adres seçti":
    "O Google escolheu um URL canônico diferente",
  "Sayfa bir asıl adres bildiriyor ama Google başka bir adresi seçti. Asıl adres etiketi bir emir değil, öneridir; Google içerik benzerliğine, iç bağlantılara ve site haritasına bakıp farklı karar verebilir. Sonuçta aramada sizin seçtiğiniz adres çıkmaz.":
    "A página declara um URL canônico, mas o Google escolheu outro. A tag canonical é uma sugestão, não uma ordem; o Google pode decidir diferente com base na semelhança do conteúdo, nos links internos e no sitemap. Como resultado, o URL que você escolheu não aparece na pesquisa.",
  "Google'ın seçtiği adrese bakın. Sayfalar gerçekten aynıysa iç bağlantılarınızı ve site haritanızı istediğiniz adrese çevirin. Farklıysa aradaki farkı içerikte belirginleştirin.":
    "Veja o URL escolhido pelo Google. Se as páginas forem realmente iguais, aponte os links internos e o sitemap para o URL desejado. Se forem diferentes, deixe a diferença mais clara no conteúdo.",
  "Dil sürümü kodu (hreflang) geçersiz":
    "O código da versão do idioma (hreflang) é inválido",
  'Dil sürümü bağlantısındaki (hreflang) kod Google\'ın beklediği biçimde değil. Google dil için ISO 639-1 kodunu (tr, en), istenirse bölge için ISO 3166-1 ülke kodunu bekler ve ikisini tire ile ayırır; zh-Hans gibi yazı sistemi eki de geçerlidir. "UK", "EU" ve "UN" gibi ayrılmış kodlarda Google bölge kısmını yok sayar (en-UK, en gibi okunur); es-419 gibi bölge kodları da desteklenmez. Geçersiz kod, o dil sürümünün yok sayılması demektir.':
    'O código em um link de versão de idioma (hreflang) não está no formato esperado pelo Google. O Google espera um código de idioma ISO 639-1 (tr, en), opcionalmente seguido por um código de país ISO 3166-1 para a região, separado por um hífen; um sufixo de script como zh-Hans também é válido. Para códigos reservados como "UK", "EU" e "UN", o Google ignora a parte da região (en-UK é lido como en), e códigos de região como es-419 não são suportados. Um código inválido significa que a versão do idioma é ignorada.',
  'Birleşik Krallık için "en-GB" yazın; "en-UK" geçerli bir bölge kodu değil. Latin Amerika İspanyolcası için es-419 yerine "es" yazın. Ayırıcı alt çizgi değil tire olmalı ("en_US" değil "en-US"). "x-default" geçerlidir, olduğu gibi bırakın.':
    'Escreva "en-GB" para o Reino Unido; "en-UK" não é um código de região válido. Para espanhol latino-americano, escreva "es" em vez de es-419. O separador deve ser um hífen, não um sublinhado ("en-US", não "en_US"). "x-default" é válido; deixe como está.',
  "Dil sürümleri arasında sayfa kendini listelemiyor (hreflang)":
    "A página não se lista entre suas versões de idioma (hreflang)",
  "Bu sayfa, dil sürümü bağlantılarında (hreflang) diğer dilleri listeliyor ama kendisini listelemiyor. Google'ın belgelerine göre her dil sürümü kendisini de listelemeli; yoksa Google dil sürümlerini birbirine bağlamayabilir.":
    "Esta página lista outros idiomas nos links de versão de idioma (hreflang), mas não a si mesma. De acordo com a documentação do Google, cada versão de idioma também deve listar a si mesma; caso contrário, o Google pode não conectar as versões de idioma.",
  "Sayfanın kendi adresini, kendi dil koduyla dil sürümü listesine ekleyin. Şablonlarda sorun çoğu zaman listenin geçerli sayfayı atlayarak üretilmesinden kaynaklanır.":
    "Adicione o próprio URL da página, com seu próprio código de idioma, à lista de versões de idioma. Nos modelos, o problema geralmente vem da lista ser gerada sem a página atual.",
  "Sayfa robots yönergesiyle bağlantılarını kapatıyor":
    "A página desativa seus links com uma diretiva robots",
  'Sayfada "nofollow" (ya da "none") yönergesi var; yani Google bu sayfadaki bağlantıları izlemez. Google yeni sayfaları çoğunlukla bağlantı izleyerek bulur; sayfa aramada çıkıyor olsa bile ondan çıkan yollar kapalıdır.':
    'A página tem uma diretiva "nofollow" (ou "none"), então o Google não segue os links dela. O Google encontra novas páginas principalmente seguindo links; mesmo que esta página apareça na pesquisa, os caminhos que saem dela ficam fechados.',
  'Bağlantıların izlenmesini istiyorsanız yönergeden "nofollow" ifadesini kaldırın. Giriş, filtre ya da kullanıcı içeriği sayfalarında bu bilerek yapılmış olabilir; o durumda yapmanız gereken bir şey yok.':
    'Se você deseja que os links sejam seguidos, remova "nofollow" da diretiva. Nas páginas de login, filtro ou conteúdo do usuário, isso pode ser intencional; nesse caso, não há nada a fazer.',
  "Sayfalanmış sayfa, asıl adres olarak ilk sayfayı gösteriyor":
    "A página paginada indica a primeira página como canônica",
  "Adres bir sayfa numarası taşıyor (2. sayfa gibi) ama asıl adres olarak numarasız ilk sayfayı gösteriyor. Google bunu sayfalama belgelerinde hata sayar: her sayfa kendi adresini asıl adres olarak vermeli. Aksi halde 2. ve sonraki sayfalardaki içerik aramadan düşer.":
    "O URL tem um número de página (página 2, por exemplo), mas indica como canônica a primeira página sem número. A documentação de paginação do Google considera isso um erro: cada página deve indicar o próprio URL como canônico. Caso contrário, o conteúdo da página 2 em diante sai da pesquisa.",
  "Her sayfalama adımının asıl adres etiketini o sayfanın kendi adresine çevirin. Tüm içeriği tek sayfada gösteren bir sürümünüz varsa Google onun asıl adres olmasına izin verir.":
    "Altere a tag canônica de cada página paginada para o próprio URL dessa página. Se você tiver uma versão que mostra todo o conteúdo em uma página, o Google permitirá que essa seja a canônica.",
  "Dil sürümlerinde varsayılan sürüm (x-default) yok":
    "As versões de idioma não têm versão padrão (x-default)",
  "Sayfa dil sürümlerini bildiriyor (hreflang) ama varsayılan bir sürüm (x-default) belirtmiyor. x-default, listelenen dillerin hiçbirine uymayan ziyaretçiye hangi sürümün gösterileceğini söyler; yoksa Google seçimi kendisi yapar.":
    "A página declara versões de idioma (hreflang), mas nenhuma versão padrão (x-default). x-default informa ao Google qual versão mostrar aos visitantes que não correspondem a nenhum dos idiomas listados; sem ele, o próprio Google faz a escolha.",
  'Dil sürümü listesine `<link rel="alternate" hreflang="x-default" href="...">` satırını ekleyin. Genelde dil seçme sayfası ya da ana pazarınızın sürümü gösterilir.':
    'Adicione `<link rel="alternate" hreflang="x-default" href="...">` à lista de versões de idiomas. Geralmente aponta para uma página de seletor de idioma ou para a versão do seu mercado principal.',
  "Dil sürümü karşılıklı bağlanmamış (hreflang)":
    "A versão de idioma não tem link de volta (hreflang)",
  "Bu sayfa başka bir adresi dil sürümü (hreflang) olarak gösteriyor ama o adres bu sayfayı geri göstermiyor. Dil sürümü bağlantısı iki taraflı çalışır; karşılığı olmayan bildirim yok sayılır, yani iki sayfa da bundan fayda görmez.":
    "Esta página indica outro URL como versão de idioma (hreflang), mas esse URL não indica esta página de volta. Os links de versão de idioma funcionam nos dois sentidos; uma declaração sem a contrapartida é ignorada, e nenhuma das páginas se beneficia.",
  "Hedef sayfaya bu sayfayı gösteren bir dil sürümü bağlantısı ekleyin. Gruptaki her sayfa, kendisi dahil tüm sayfaları listelemeli.":
    "Adicione um link de versão do idioma na página de destino que aponte para esta página. Cada página do grupo deve listar todas as páginas, incluindo ela mesma.",
  "Dil sürümü açılmayan ya da dizinden çıkarılmış bir sayfayı gösteriyor":
    "A versão do idioma aponta para uma página que não carrega ou não é indexável",
  "Bu sayfa başka bir adresi dil sürümü (hreflang) olarak gösteriyor ama o adres hata veriyor (404, 500 gibi), başka yere yönlendiriyor ya da noindex ile dizinden çıkarılmış. Google böyle bir adresi dil sürümü olarak kullanamaz, bildirim boşa gider.":
    "Esta página nomeia outro URL como uma versão do idioma (hreflang), mas esse URL retorna um erro (404, 500 e similares), redireciona para outro lugar ou é excluído do índice com noindex. O Google não pode usar esse URL como versão do idioma, portanto a declaração é desperdiçada.",
  "Ayrıntılardaki adrese bakın. Hata veriyorsa sayfayı düzeltin ya da bu bildirimi kaldırın; yönlendiriyorsa bildirimi son adrese çevirin; noindex ise ya noindex'i kaldırın ya da bildirimi silin.":
    "Veja o URL nos detalhes. Se retornar um erro, corrija a página ou remova esta declaração; se redirecionar, aponte a declaração para o URL final; se for noindex, remova o noindex ou exclua a declaração.",
  "Asıl adres (canonical) başka bir alan adını ya da http'yi gösteriyor":
    "O canônico aponta para outro domínio ou para http",
  "Sayfanın asıl adresi (yani Google'a bu içeriğin ana adresi olarak bildirdiğiniz adres) ya güvensiz http:// ile başlıyor ya da başka bir alan adına gidiyor. Bu, sayfanın kendisini dizinde istemediğinizi söyler. Başka sitede yayımlanan içeriği bilerek böyle işaretliyorsanız bu uyarıyı yok sayabilirsiniz.":
    "O URL canônico da página (o URL que você informa ao Google como o endereço principal deste conteúdo) começa com http:// inseguro ou vai para outro domínio. Isso diz ao Google que você não deseja esta página no índice. Se você estiver marcando deliberadamente o conteúdo publicado em outro site dessa maneira, poderá ignorar esse aviso.",
  "Bilerek yapmadıysanız asıl adresi sayfanın kendi https:// adresine çevirin. Şablon ya da SEO eklentisindeki site adresi ayarı genelde yanlış yazılmıştır; oradan bir kez düzeltmek hepsine yeter.":
    "Se não foi intencional, altere o canônico para o URL https:// da própria página. Normalmente, a configuração do URL do site no modelo ou no plugin de SEO está errada; corrigi-la ali uma vez corrige todas as páginas.",
  "Yapısal veri bloğu bozuk": "O bloco de dados estruturados está quebrado",
  "Sayfadaki yapısal veri bloklarından (ld+json) en az biri okunamıyor ya da içinde tür (@type) yok. Bozuk blok Google tarafından yok sayılır, yani o işaretlemeden beklediğiniz ek bilgiler (ürün, makale, kırıntı yolu) aramada çıkmaz.":
    "Pelo menos um bloco de dados estruturados (ld+json) na página não pode ser lido ou não tem tipo (@type). O Google ignora um bloco quebrado, portanto os detalhes extras que você espera dessa marcação (produto, artigo, breadcrumb) não aparecem na pesquisa.",
  'Bloğu bir JSON denetleyicisine yapıştırın; genelde fazladan virgül ya da kapanmamış tırnak çıkar. Sonra bloğa en az bir tür ekleyin, örneğin "@type": "Article". Eklentiyle üretiliyorsa eklentiyi güncelleyin.':
    'Cole o bloco em um validador JSON; geralmente é uma vírgula a mais ou aspas não fechadas. Em seguida, atribua ao bloco pelo menos um tipo, por exemplo "@type": "Article". Se um plugin o gerar, atualize o plugin.',
  "Bazı sayfalar için Google'ın yanıtı eski":
    "As respostas do Google para algumas páginas estão desatualizadas",
  "Bu sayfalar için saklanan Google yanıtları eskidi. Yanıt, sorulduğu andaki durumu anlatır; sayfa o zamandan beri düzelmiş ya da bozulmuş olabilir. Eski yanıtı güncelmiş gibi göstermemek için bu sayfaların Google yanıtları bu denetimde bulgu sayılmadı.":
    "As respostas do Google armazenadas para estas páginas estão desatualizadas. Uma resposta descreve o estado no momento em que foi pedida; a página pode ter sido corrigida ou ter quebrado desde então. Para não apresentar uma resposta antiga como atual, as respostas do Google para estas páginas não foram contadas como constatações nesta auditoria.",
  'Dizin durumu sekmesindeki "Google\'da durumunu kontrol et" düğmesine basın; en eski yanıtlı sayfalar yeniden sorulur. Google bir sitede günde en fazla 2.000 adres incelemeye izin verir, bu yüzden her tıklamada 25 sayfa sorulur; birkaç tıkla liste yenilenir.':
    'Pressione o botão "Verificar o status no Google" na aba Status de indexação; as páginas com as respostas mais antigas são verificadas novamente. O Google permite no máximo 2.000 inspeções de URL por site por dia, então cada clique verifica 25 páginas; alguns cliques atualizam a lista.',
  "Google taradı ama dizine almadı": "Rastreado pelo Google, mas não indexado",
  "Google sayfayı çekti ama dizine almadı; yeniden istek göndermeniz gerekmez, sonradan dizine girebilir de girmeyebilir de. Google nedenini söylemez. Sık görülen olasılıklar: sayfanın başka bir sayfayla büyük ölçüde aynı olması, çok az özgün içerik taşıması ya da siteden az bağlantı alması.":
    "O Google obteve a página, mas não a indexou; você não precisa reenviá-la, e ela pode ou não ser indexada depois. O Google não informa o motivo. Possibilidades comuns: a página é basicamente igual a outra página, tem muito pouco conteúdo original ou recebe poucos links do site.",
  "Önce URL Denetleme Aracı'nda noindex, engellenen kaynak ya da boş görünen içerik olup olmadığına bakın. Sorun yoksa sayfanın kendine ait bir sorusu ve cevabı olduğundan emin olun. Yakın konulu başka sayfalarla örtüşüyorsa birleştirip tek adrese yönlendirin. Sayfa kalacaksa içeriği derinleştirin ve ilgili sayfalardan buraya bağlantı verin.":
    "Primeiro, verifique na ferramenta Inspeção de URL se há noindex, recursos bloqueados ou conteúdo que parece vazio. Se nada disso se aplicar, garanta que a página responda a uma pergunta própria. Se ela se sobrepuser a outras páginas sobre um tema semelhante, mescle-as e redirecione para um único URL. Se a página continuar, aprofunde o conteúdo e crie links para ela a partir de páginas relacionadas.",
  "Google keşfetti ama henüz taramadı":
    "Descoberto pelo Google, mas ainda não rastreado",
  "Google bu adresi biliyor ama sayfayı henüz çekmedi. Google'ın belgelerine göre bu genelde siteyi aşırı yüklememek için taramanın ertelenmesidir; sayfa hakkında bir kalite kararı değildir. Büyük sitelerde ve az bağlantı alan sayfalarda daha sık görülür.":
    "O Google conhece esse URL, mas ainda não obteve a página. De acordo com a documentação do Google, isso geralmente significa que o rastreamento foi adiado para evitar sobrecarregar o site; não é um veredicto de qualidade na página. É mais comum em sites grandes e em páginas com poucos links.",
  "Çoğu durumda beklemek yeterlidir. Sayfa önemliyse sık taranan sayfalardan bağlantı verin, site haritasında olduğundan emin olun ve Search Console'dan dizine ekleme isteyin. Sunucunuz yavaşsa onu da iyileştirin.":
    "Na maioria dos casos, esperar é suficiente. Se a página for importante, crie um link para ela a partir de páginas rastreadas com frequência, certifique-se de que esteja no sitemap e solicite a indexação no Search Console. Se o seu servidor estiver lento, melhore isso também.",
  "Google yinelenen içerik gördü, asıl adres belirtilmemiş":
    "O Google encontrou conteúdo duplicado sem nenhum canônico declarado",
  "Google bu sayfayı başka bir sayfanın kopyası saydı ve hangisinin asıl olduğunu siz söylemediğiniz için kendisi seçti. Seçtiği sayfa sizin istediğiniz olmayabilir; sıralama gücü de seçtiği adreste toplanır.":
    "O Google tratou esta página como uma cópia de outra e, como você não indicou qual é a canônica, escolheu uma por conta própria. A escolha pode não ser a que você deseja, e a força de posicionamento se concentra no URL escolhido.",
  "Kopya grubundaki her sayfaya, asıl saydığınız adresi gösteren bir canonical (asıl adres) etiketi ekleyin. Kopyalar gereksizse asıl sayfaya yönlendirin.":
    "Adicione uma tag canônica a cada página do grupo duplicado, apontando para o URL que você considera canônico. Se as cópias não forem necessárias, redirecione-as para a página canônica.",
  "Google bu adresi hiç bilmiyor": "O Google não conhece esse URL",
  "Google bu adresi hiç duymamış: ne keşfetmiş ne taramış. Yani sayfaya giden bir yol yok ve dizine girmeyen sayfa aramada hiç çıkmaz.":
    "O Google nunca ouviu falar desse URL: ele não o descobriu nem o rastreou. Portanto, não há caminho que leve à página, e uma página que não está indexada nunca aparece na pesquisa.",
  "Adresi site haritasına ekleyin ve site haritasını Search Console'a gönderin. Ayrıca sitenizin taranan sayfalarından bu sayfaya bağlantı verin; Google sayfaları bağlantıları izleyerek bulur.":
    "Adicione o URL ao seu sitemap e envie o sitemap no Search Console. Crie também links para esta página a partir de páginas rastreadas do seu site; o Google encontra páginas seguindo links.",
  "Google yapısal veride hata buldu":
    "O Google encontrou erros nos dados estruturados",
  "Sayfadaki yapısal veri (Google'a sayfanın ürün, makale, tarif gibi ne olduğunu anlatan işaretleme) Google'ın zengin sonuç denetiminden geçemedi. Zengin sonuç, aramada yıldız puanı, fiyat ya da stok durumu gibi ek bilgilerin çıkmasıdır; hatalı işaretleme bunları kapatır. Bu kararı yalnızca Google verebilir; bizim tarayıcımız işaretlemenin var olup olmadığını görür, geçerli olup olmadığını göremez.":
    "Os dados estruturados da página (marcação que informa ao Google o que é a página, como um produto, artigo ou receita) não passaram nas verificações de pesquisa aprimorada do Google. Os resultados da pesquisa aprimorada são extras na pesquisa, como avaliações com estrelas, preços ou disponibilidade em estoque; uma marcação quebrada os desativa. Só o Google pode avaliar isso; nosso rastreador vê se a marcação existe, não se ela é válida.",
  "Adresi Google'ın Zengin Sonuç Testi'nde açın; hangi alanın eksik ya da yanlış türde olduğunu adıyla söyler. Çoğunlukla zorunlu bir alan boştur ya da sayfada görünmeyen bir şey işaretlenmiştir; düzeltin.":
    "Abra o URL no Teste de pesquisa aprimorada do Google; ele indica o campo que está faltando ou que tem o tipo errado. Normalmente, um campo obrigatório está vazio ou algo que não é visível na página foi marcado. Corrija.",
  "Sitede sosyal medya paylaşım etiketleri (Open Graph) yok":
    "O site não tem tags de compartilhamento social (Open Graph)",
  "Taranan sayfaların hiçbirinde og:title ya da og:image yok. Bu etiketler Google sıralamasını etkilemez; bağlantınız WhatsApp, LinkedIn, Slack ya da X'te paylaşılınca ne görüneceğini belirler. Yoksa bağlantı çıplak adres olarak görünür ve paylaşımdan gelen tıklama düşer. Bu bulgu sayfa başına değil, site genelinde bir şablon eksiğini gösterir.":
    "Nenhuma das páginas rastreadas tem og:title ou og:image. Essas tags não afetam o posicionamento no Google; elas decidem o que aparece quando seu link é compartilhado no WhatsApp, LinkedIn, Slack ou X. Sem elas, o link aparece como um URL simples e os cliques vindos de compartilhamentos diminuem. Este resultado aponta para uma lacuna no modelo de todo o site, não de uma página específica.",
  "Şablonun <head> bölümüne og:title, og:description ve tam adresli bir og:image (en az 1200x630 piksel) ekleyin. Tek bir şablon düzeltmesi tüm sayfaları kapatır; SEO eklentileri bunu hazır ayar olarak sunar.":
    "Adicione og:title, og:description e um og:image com URL completo (pelo menos 1200 x 630 pixels) ao <head> do modelo. Uma única correção no modelo cobre todas as páginas; os plugins de SEO oferecem isso como uma configuração pronta.",
  "Sitede hiç yapısal veri yok": "O site não tem dados estruturados",
  "Taranan hiçbir sayfada yapısal veri (Google'a sayfanın ürün, makale, kurum gibi ne olduğunu anlatan işaretleme) yok. Yapısal veri sıralamayı doğrudan etkilemez; bazı türler (ürün, makale, kırıntı yolu, kurum, etkinlik) aramada fiyat, puan ya da yol gibi ek bilgilerle görünmeyi mümkün kılar. Hangi türlerin gösterildiğini Google belirler ve zaman zaman kaldırır; garanti yoktur.":
    "Nenhuma página rastreada tem dados estruturados (marcação que informa ao Google o que é a página, como um produto, artigo ou organização). Os dados estruturados não afetam diretamente o posicionamento; alguns tipos (produto, artigo, breadcrumb, organização, evento) permitem aparecer na pesquisa com extras como preços, avaliações ou trilha de navegação. O Google decide quais tipos são mostrados e descarta alguns de vez em quando; nada é garantido.",
  "Sayfa türüne uyan işaretlemeyle başlayın: yazılar için Article, her yerde BreadcrumbList, ürün sayfası için Product, ana sayfa için Organization. Google'ın desteklediği türleri Search Gallery'den kontrol edin; FAQPage ve HowTo artık arama sonucunda zengin görünüm üretmez. İşaretleme sayfada gerçekten görünen içeriği anlatmalı; görünmeyeni işaretlemek Google kurallarına aykırıdır.":
    "Comece com a marcação adequada ao tipo de página: Article para posts, BreadcrumbList em todos os lugares, Product para páginas de produto, Organization para a página inicial. Verifique os tipos aceitos pelo Google na Search Gallery; FAQPage e HowTo não geram mais resultados aprimorados na pesquisa. A marcação deve descrever conteúdo realmente visível na página; marcar o que não está visível vai contra as diretrizes do Google.",
  "Sayfa birbiriyle çelişen asıl adresler bildiriyor":
    "A página declara canônicos conflitantes",
  "Sayfanın head bölümünde farklı adresleri gösteren birden çok canonical (asıl adres) etiketi var. Bu, iki farklı söz demektir, daha güçlü bir söz değil; Google çelişkiyi kendi seçimini yaparak çözer. Genelde şablon bir adres, bir eklenti başka bir adres yazınca olur.":
    "O cabeçalho da página tem várias tags canonical apontando para URLs diferentes. São duas afirmações diferentes, não uma mais forte; o Google resolve o conflito fazendo sua própria escolha. Geralmente acontece quando o modelo grava um URL e um plugin grava outro.",
  "Sayfa kaynağında asıl adres etiketlerini bulun, hangisinin doğru olduğuna karar verin ve diğerini üreten ayarı ya da eklentiyi kapatın. Aynı adresi iki kez yazan kurulum sorun değildir; bulgu yalnızca adresler farklıyken çıkar.":
    "Encontre as tags canonical no código-fonte da página, decida qual está correta e desative a configuração ou o plugin que grava a outra. Uma configuração que grava o mesmo URL duas vezes não é problema; este resultado aparece apenas quando os URLs são diferentes.",
  "Google bu sayfayı uzun süredir taramadı":
    "O Google não rastreia esta página há muito tempo",
  "Google bu adresi en son aylar önce ziyaret etmiş. Sayfa dizinde olabilir ama Google'ın gördüğü sürüm o tarihteki sürüm: sonradan yaptığınız değişiklikler aramaya yansımamıştır. Nadiren taranan sayfalar genelde siteden yeterince bağlantı almayan ya da Google'ın önemsiz bulduğu sayfalardır.":
    "O Google visitou este URL pela última vez há meses. A página pode estar indexada, mas a versão que o Google tem é a daquela data: as alterações feitas desde então não aparecem na pesquisa. As páginas rastreadas raramente costumam ser as que recebem poucos links do site ou que o Google considera pouco importantes.",
  "Sayfaya sık taranan sayfalardan bağlantı verin ve site haritasında olduğundan emin olun. İçerik gerçekten güncellendiyse Search Console'dan dizine ekleme isteyebilirsiniz; ama kalıcı çözüm sayfayı siteye daha iyi bağlamaktır.":
    "Crie links para a página a partir de páginas rastreadas com frequência e garanta que ela esteja no sitemap. Se o conteúdo foi realmente atualizado, você pode solicitar a indexação no Search Console; mas a solução duradoura é integrar melhor a página ao site.",
  "Sayfanın ana içeriği geç yükleniyor (LCP)":
    "O conteúdo principal da página carrega com atraso (LCP)",
  "Sayfanın en büyük öğesi (genelde kapak görseli ya da ana başlık) 4 saniyeden geç göründü. Google bu süreyi 'zayıf' sayar. Google, sıralama sistemlerinde alan verisini (CrUX) kullanır; ama iyi bir değer tek başına sıralama garantisi vermez, içeriğin ilgili olması öncelik taşır. Bu, PageSpeed Insights'ın laboratuvar ölçümüdür; ziyaretçilerinizin gerçek süresi değil, ama onun güvenilir bir göstergesidir.":
    'O maior elemento da página (geralmente a imagem principal ou o título principal) apareceu após mais de 4 segundos. O Google classifica esse tempo como "ruim". O Google usa dados de campo (CrUX) nos sistemas de posicionamento, mas um bom valor por si só não garante posicionamento; o conteúdo relevante vem em primeiro lugar. Esta é uma medição de laboratório do PageSpeed Insights: não é o tempo real dos seus visitantes, mas um indicador confiável dele.',
  "PageSpeed Insights raporunda en büyük öğenin ne olduğuna bakın. Genelde bir görseldir: görseli küçültüp WebP gibi hafif bir biçime çevirin, ilk ekrandaki görselin geç yüklenmesini kapatın ve sayfayı yavaşlatan betik ve yazı tiplerini erteleyin.":
    "Verifique no relatório do PageSpeed Insights qual é o maior elemento. Geralmente é uma imagem: reduza-a e converta-a para um formato mais leve, como WebP, desative o lazy loading da imagem na primeira tela e adie os scripts e fontes que deixam a página mais lenta.",
  "Sayfa yüklenirken içerik kayıyor (CLS)":
    "O conteúdo se desloca enquanto a página carrega (CLS)",
  "Sayfa yüklenirken içerik 0,25'ten fazla kaydı; Google bu değeri 'zayıf' sayar. Okurken metin kayınca ziyaretçi yanlış yere tıklar. Bu, laboratuvar ölçümüdür.":
    'O conteúdo se deslocou mais de 0,25 enquanto a página carregava; o Google classifica esse valor como "ruim". Quando o texto se move enquanto alguém está lendo, a pessoa clica no lugar errado. Esta é uma medição de laboratório.',
  "Görsellere ve gömülü çerçevelere genişlik ile yükseklik verin, reklam ve afiş alanları için yer ayırın, özel yazı tipi için yerleşimi bozmayan bir yedek yazı tipi tanımlayın.":
    "Dê largura e altura às imagens e aos quadros incorporados, reserve espaço para espaços de anúncios e banners e defina uma fonte substituta para fontes personalizadas que não quebrem o layout.",
  "Sayfa tıklamalara geç yanıt veriyor (INP)":
    "A página responde lentamente a cliques (INP)",
  "Sayfa bir tıklamaya ya da dokunuşa 500 milisaniyeden geç yanıt verdi; Google bu süreyi 'zayıf' sayar. Bu ölçü (INP) 2024'ten beri Core Web Vitals'ın parçasıdır. Laboratuvar testi etkileşimi taklit edemediği için bu değer Chrome kullanıcılarından toplanan gerçek (alan) veridir.":
    'A página demorou mais de 500 milissegundos para responder a um clique ou toque; o Google classifica esse tempo como "ruim". Essa métrica (INP) faz parte das Core Web Vitals desde 2024. Como um teste de laboratório não consegue simular a interação, esse valor vem de dados reais (de campo) coletados de usuários do Chrome.',
  "Sayfayı en çok meşgul eden betikleri bulun; genelde üçüncü taraf etiketler (reklam, sohbet, takip kodu) ve büyük betik paketleridir. Gereksizleri kaldırın, kalanları sayfa açıldıktan sonra yükleyin.":
    "Encontre os scripts que mantêm a página mais ocupada; geralmente são tags de terceiros (anúncios, bate-papo, código de rastreamento) e grandes pacotes de scripts. Remova os desnecessários e carregue o restante depois que a página for aberta.",
  "Google'ın SEO denetim puanı düşük":
    "Pontuação baixa na auditoria de SEO do Google",
  "PageSpeed Insights'ın SEO denetimi bu sayfaya 90'ın altında puan verdi. Bu denetim başlık, meta açıklama, bağlantı metinleri, taranabilirlik (robots, HTTP durum kodu), geçerli canonical ve hreflang gibi temel kontrollere bakar. Puanın kendisi sıralamayı etkilemez; hangi kontrollerin başarısız olduğunu gösterir.":
    "A auditoria de SEO do PageSpeed Insights deu a esta página uma pontuação abaixo de 90. A auditoria analisa verificações básicas, como título, meta descrição, texto do link, rastreabilidade (robots, código de status HTTP), um canônico válido e hreflang. A pontuação em si não afeta o posicionamento; ela mostra quais verificações falharam.",
  "Sayfayı PageSpeed Insights'ta açın ve SEO bölümünde başarısız görünen kontrollere bakın. Her biri neyin eksik olduğunu adıyla söyler; başarısız kontroller düzelince puan yükselir.":
    "Abra a página no PageSpeed Insights e veja as verificações que falharam na seção SEO. Cada uma indica o que falta; a pontuação sobe quando as verificações com falha são corrigidas.",
  "AMP sayfası": "Artigo AMP",
  "AMP haber kutusu": "Principais notícias AMP",
  "AMP hikayesi": "História AMP",
  "Gezinme yolu (breadcrumb)": "Breadcrumb",
  "Etkinlik ayrıntısı": "Detalhes do evento",
  "Etkinlik listesi": "Listagem de eventos",
  "Sık sorulan sorular": "FAQ",
  "Nasıl yapılır": "Como fazer",
  "İş ilanı ayrıntısı": "Detalhes da vaga",
  "İş ilanı listesi": "Vaga de emprego",
  "Ürün listesi": "Listagens de comerciantes",
  "Ürün özeti": "Snippets de produto",
  "Alıştırma sorusu": "Exercícios práticos",
  "Matematik çözücü": "Solucionadores de matemática",
  "Tarif kutusu": "Recurso de receita",
  "Tarif özeti": "Rich snippet de receita",
  "Değerlendirme özeti": "Snippet de avaliação",
  "Site içi arama kutusu": "Caixa de pesquisa de sitelinks",
  "Soru ve cevap": "Perguntas e respostas",
  "Video bölümleri": "Capítulos de vídeo",
  "Web hikayesi": "História da Web",
  "Ücretsiz alışveriş listesi": "Listagens de produtos",
  "Çevrilmiş sonuç": "Resultado traduzido",
  "Diğer görünümler": "Outras aparências",
  "Sayfanın en üstü": "Topo da página",
  "İlk sayfanın geri kalanı": "Resto da primeira página",
  "İkinci sayfa": "Segunda página",
  "21 ve sonrası": "21 e além",
  "Pek görülmeyen yerler": "Raramente visto",
  "Hiç tıklanmayan": "Sem cliques",
  "Görünüyor ama açılmıyor": "Visto, mas não aberto",
  "1-9 tıklama": "1-9 cliques",
  "10-99 tıklama": "10-99 cliques",
  "100+ tıklama": "Mais de 100 cliques",
  "Trafiği taşıyanlar": "As que trazem tráfego",
  "Sıra 5-10": "Posição 5-10",
  "Sıra 11-20": "Posição 11-20",
  "İlk sayfanın alt yarısı": "Metade inferior da primeira página",
  "Ortalama sırası 5 ile 20 arasında olan sorgular. 5-10 arası ilk sayfanın alt yarısı, 11-20 ikinci sayfa; küçük bir iyileştirme ikisini de üste taşıyabilir. Gösterime göre sıralı.":
    "Consultas com posição média entre 5 e 20. As posições 5 a 10 são a metade inferior da primeira página, e 11 a 20 a segunda página; uma pequena melhoria pode levar qualquer uma delas ao topo. Ordenadas por impressões.",
  "İnsanların sizi hangi aramalarla bulduğu; her sorgunun tıklama, gösterim ve ortalama sırasıyla.":
    "As pesquisas pelas quais as pessoas encontram você, cada uma com seus cliques, impressões e posição média.",
  "Google'da en çok görünen ve tıklanan sayfalarınız.":
    "Suas páginas que aparecem e são mais clicadas no Google.",
  "Aynı arama için birden fazla sayfanızın birbiriyle yarıştığı yerler.":
    "Onde várias de suas páginas competem entre si pela mesma pesquisa.",
  "Bu gruba uyan sorgu yok": "Nenhuma consulta neste grupo",
  "Seçimi kaldırarak sıra 4-20 arasındaki tüm sorgulara dönün.":
    "Desmarque a seleção para voltar a todas as consultas nas posições 4 a 20.",
  "Bu dönemde 4-20. sırada kelime yok":
    "Nenhuma palavra-chave nas posições 4 a 20 neste período",
  "Hiçbir kelimeniz 4-20. sırada değil. Bu aralıktaki kelimeler küçük bir iyileştirmeyle üst sıralara çıkabilir; olunca burada listelenir.":
    "Nenhuma de suas palavras-chave está nas posições 4 a 20. Palavras-chave nesta faixa podem subir com uma pequena melhoria; quando houver alguma, ela será listada aqui.",
  "Bu seçimde sorgu verisi yok": "Nenhum dado de consulta para esta seleção",
  "Seçili ülke ya da cihaz için Search Console sorgu verisi paylaşmadı. Filtreyi kaldırarak tüm trafiğe bakın.":
    "O Search Console não compartilhou dados de consulta para o país ou dispositivo selecionado. Remova o filtro para ver todo o tráfego.",
  "Kelime düzeyinde veri henüz gelmedi":
    "Ainda não há dados em nível de palavra-chave",
  "Search Console, hangi kelimeyle arandığınızı bu dönem için henüz paylaşmadı. Az trafikli sitelerde bu normaldir. Veri gelince 4-20. sıradaki kelimeler burada listelenir.":
    "O Search Console ainda não compartilhou quais palavras-chave as pessoas pesquisaram neste período. É normal em sites com pouco tráfego. Quando os dados chegarem, as palavras-chave nas posições 4 a 20 serão listadas aqui.",
  Mobil: "Celular",
  "Akıllı TV": "Smart TV",
  "{value} puan": "{value} p.p.",
  "{start} - {end} dönemine göre": "Em comparação com {start} - {end}",
  "Gösterimlerin yüzde kaçı tıklamaya döndü.":
    "A parcela de impressões que se transformaram em um clique.",
  "Düşük sayı daha iyi: 1, listenin en üstü demek.":
    "Quanto menor, melhor: 1 significa o topo dos resultados.",
  Cihazlar: "Dispositivos",
  "Tıklamaların hangi cihazlardan geldiği. Bir cihaza tıklayarak tüm sayfayı o cihaza göre daraltabilirsiniz.":
    "De quais dispositivos vieram os cliques. Clique em um dispositivo para restringir a página inteira a ele.",
  gösterim: "impressões",
  "Arama görünümü": "Aparência na pesquisa",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü (tıklama sayısına göre). Google bu dökümü başka bir ölçüyle birleştirmez.":
    "Em quais formatos especiais seus resultados apareceram no Google (por cliques). O Google não combina esse detalhamento com nenhuma outra dimensão.",
  "Sonuçlarınızın Google'da hangi özel biçimlerle göründüğü (gösterim sayısına göre). Google bu dökümü başka bir ölçüyle birleştirmez.":
    "Em quais formatos especiais seus resultados apareceram no Google (por impressões). O Google não combina esse detalhamento com nenhuma outra dimensão.",
  "Son 28 gün": "Últimos 28 dias",
  "Son 3 ay": "Últimos três meses",
  Haber: "Notícias",
  "Arama türü": "Tipo de pesquisa",
  "Cihaz filtresi": "Filtro de dispositivo",
  "Tüm cihazlar": "Todos os dispositivos",
  "Ülke filtresi": "Filtro de país",
  "Tüm ülkeler": "Todos os países",
  "Tarih aralığı": "Período",
  "İlk 10'da": "Nos 10 primeiros",
  "Ortalama sırası 10 veya daha iyi olanlar; yani Google'ın ilk sayfası.":
    "Posição média 10 ou melhor, ou seja, a primeira página do Google.",
  "Gösterilmiş ama bir kez bile tıklanmamış satırlar.":
    "Linhas que foram exibidas, mas nunca foram clicadas.",
  "Tıklama oranı düşük": "CTR baixa",
  "İlk sayfada olup {impressions} veya daha fazla gösterim alan ve tıklama oranı {ctr} altında kalan satırlar. Başlığı ve açıklamayı iyileştirmeye değer.":
    "Linhas na primeira página com {impressions} ou mais impressões e CTR abaixo de {ctr}. Vale a pena melhorar o título e a descrição delas.",
  Tıklanan: "Com cliques",
  "En az bir tıklama almış satırlar.": "Linhas com pelo menos um clique.",
  "İlk sayfanın alt yarısı. Küçük bir iyileştirme ilk üçe taşıyabilir.":
    "A metade inferior da primeira página. Uma pequena melhoria pode levá-las às três primeiras posições.",
  "İkinci sayfa. İlk sayfaya girmek tıklamayı en çok artıran adımdır.":
    "Segunda página. Chegar à primeira página é a etapa que mais adiciona cliques.",
  Ülkeler: "Países",
  "{country} filtresini kaldır": "Remover o filtro {country}",
  "Tıklamaların hangi ülkelerden geldiği. Halkadan ya da tablodan bir ülkeye tıklayarak tüm sayfayı o ülkeye göre daraltabilirsiniz.":
    "De quais países vieram os cliques. Clique em um país no anel ou na tabela para restringir a página inteira a ele.",
  "Diğer ülkeler": "Outros países",
  Dağılım: "Distribuição",
  Pay: "Parcela",
  "Ort. sıra": "Pos. média",
  "{count} ülke daha": {
    one: "mais {count} país",
    other: "mais {count} países",
  },
  "Toplam {total} tıklamanın {share} kadarı {country} kaynaklı.":
    "{share} dos {total} cliques vieram de {country}.",
  "Toplam {count} tıklama.": {
    one: "{count} clique no total.",
    other: "{count} cliques no total.",
  },
  Sıra: "Posição",
  "{value} için işlemler": "Ações para {value}",
  "Sayfayı yeni sekmede aç": "Abrir página em uma nova aba",
  "Kelime olarak kaydet": "Salvar como palavra-chave",
  Sorgu: "Consulta",
  "tıklama oranı": "CTR",
  "ortalama sıra": "posição média",
  "Günlük {metric}": "{metric} por dia",
  Gün: "Dia",
  "{days} günde toplam {total} {metric}. En yüksek gün {day}, {peak}.":
    "{total} {metric} no total em {days} dias. Dia mais alto: {day}, {peak}.",
  "{days} günde ortalama {average} {metric}. En iyi gün {day}, {peak}.":
    "Em {days} dias, a média de {metric} foi {average}. Melhor dia: {day}, {peak}.",
  "Günlük değişim": "Tendência diária",
  "Yukarıdaki toplamların günlere dağılımı.":
    "Os totais acima, detalhados por dia.",
  "Grafik ölçüsü": "Métrica do gráfico",
  "Bu dönemde hiç gösterim yok, grafik boş. Search Console sayfalarınızı arama sonuçlarında göstermeye başlayınca günlük dağılım burada görünür.":
    "Não há impressões neste período, portanto o gráfico está vazio. Assim que o Search Console começar a exibir suas páginas nos resultados de pesquisa, o detalhamento diário aparecerá aqui.",
  "Sorgular kaç sırada?": "Em que posições estão suas consultas?",
  "Bu filtrelerle Search Console sorgu vermedi, bu yüzden dağılım çizilemiyor.":
    "O Search Console não retornou consultas para esses filtros, portanto, não há distribuição a ser desenhada.",
  "{total} sorgunun {firstPage} tanesi ilk sayfada (sıra 1-10). Bir çubuğa tıklayarak tabloyu daraltın.":
    "{firstPage} de {total} consultas estão na primeira página (posições 1 a 10). Clique em uma barra para restringir a tabela.",
  "{total} sorgunun ortalama sıraya göre dağılımı; {firstPage} tanesi ilk sayfada.":
    "{total} consultas por posição média; {firstPage} delas estão na primeira página.",
  "Tıklamalar sayfalara nasıl dağılıyor?":
    "Como os cliques são distribuídos pelas páginas?",
  "Bu filtrelerle Search Console sayfa vermedi, bu yüzden dağılım çizilemiyor.":
    "O Search Console não retornou nenhuma página para esses filtros, portanto, não há distribuição a ser desenhada.",
  "{total} sayfanın {clicked} tanesi tıklama aldı.":
    "{clicked} de {total} páginas receberam cliques.",
  "En çok tıklanan 5 sayfanın tıklamalardaki payı: {share}.":
    "As 5 páginas mais clicadas obtiveram {share} de todos os cliques.",
  "{lead} Bir çubuğa tıklayarak tabloyu daraltın.":
    "{lead} Clique em uma barra para restringir a tabela.",
  "{total} sayfanın aldığı tıklamaya göre dağılımı. {lead}":
    "{total} páginas pelos cliques recebidos. {lead}",
  "Sıra 5-20 fırsatı": "Oportunidade das posições 5 a 20",
  "Sıralaması 5 ile 20 arasında kalan sorgu olmadığı için pay hesaplanamıyor.":
    "Nenhuma consulta está entre as posições 5 e 20, portanto não há parcela a calcular.",
  "{queries} sorgu toplam {impressions} gösterim alıyor ama ilk üçün dışında kalıyor. Çubuklar gösterim payını gösterir; birine tıklayarak tabloyu daraltın.":
    "{queries} consultas geram {impressions} impressões no total, mas ficam fora das três primeiras posições. As barras mostram a parcela de impressões de cada grupo; clique em uma barra para restringir a tabela.",
  "Sıra 5-20 arasındaki {queries} sorgunun {impressions} gösterimi, sıra 5-10 ve 11-20 olarak bölünmüş.":
    "{impressions} impressões de {queries} consultas nas posições 5 a 20, divididas em 5 a 10 e 11 a 20.",
  "Search Console bu dönem için sorgu vermedi, bu yüzden karşılaştırılacak bir şey yok.":
    "O Search Console não retornou consultas para esse período, portanto, não há nada para comparar.",
  "Hiçbir sorguda iki sayfanız birbiriyle yarışmıyor, bu yüzden özetlenecek bir şey yok.":
    "Em nenhuma consulta duas de suas páginas competem entre si, portanto não há nada para resumir.",
  "{count} sorgu incelendi.": {
    one: "{count} consulta analisada.",
    other: "{count} consultas analisadas.",
  },
  "{queries} sorguda birden fazla sayfanız yarışıyor; {impressions} gösterim risk altında.":
    "Mais de uma das suas páginas compete em {queries} consultas; {impressions} impressões estão em risco.",
  "En çok kaybettiren sorgu": "Consulta que perde mais",
  "Listeyi bu sorguya daraltır": "Restringe a lista a esta consulta",
  "{impressions} gösterim bölünüyor · {pages} sayfa":
    "{impressions} impressões divididas · {pages} páginas",
  "Çakışma raporu yüklenemedi":
    "Não foi possível carregar o relatório de canibalização",
  "Çakışma araması yapılamadı": "Não foi possível verificar a canibalização",
  "Çakışma bulunamadı": "Nenhuma canibalização encontrada",
  "Search Console bu dönem için sorgu vermedi, karşılaştırılacak bir şey yok. Daha geniş bir tarih aralığı deneyin.":
    "O Search Console não retornou consultas para este período, portanto não há nada para comparar. Experimente um período mais amplo.",
  "İncelenen {count} sorguda çakışma yok. Ancak Search Console satır sınırına takıldık, yani bakamadığımız sorgular kaldı.":
    {
      one: "Não há canibalização na {count} consulta analisada. No entanto, atingimos o limite de linhas do Search Console, portanto algumas consultas não foram verificadas.",
      other:
        "Não há canibalização nas {count} consultas analisadas. No entanto, atingimos o limite de linhas do Search Console, portanto algumas consultas não foram verificadas.",
    },
  "İncelenen {count} sorgunun hiçbirinde iki sayfanız birbiriyle yarışmıyor.": {
    one: "A {count} consulta analisada não tem páginas suas competindo entre si.",
    other:
      "Em nenhuma das {count} consultas analisadas duas de suas páginas competem entre si.",
  },
  "{queries} sorguda birden fazla sayfanız yarışıyor ve bu yüzden {impressions} Google'ın tercih ettiği sayfa dışında kalıyor. Önce hangi sayfayı hedeflediğinize karar verin ve iç bağlantıları ona yöneltin; sayfalar gerçekten aynı soruyu yanıtlıyorsa birleştirin.":
    "Mais de uma de suas páginas compete em {queries} consultas, portanto {impressions} vão para páginas diferentes daquela preferida pelo Google. Decida qual página você quer priorizar e aponte os links internos para ela; se as páginas realmente responderem à mesma pergunta, mescle-as.",
  "{impressions} gösterim": "{impressions} impressões",
  "{start} – {end} · {queries} sorgu incelendi":
    "{start} – {end} · {queries} consultas analisadas",
  "Search Console tek seferde sınırlı satır döndürür ve bu sınıra takıldık. Listede olmayan çakışmalar olabilir.":
    "O Search Console retorna um número limitado de linhas por vez, e atingimos esse limite. Pode haver canibalização não mostrada nesta lista.",
  '"{search}" geçen {count} sorgu gösteriliyor.': {
    one: 'Mostrando {count} consulta que contém "{search}".',
    other: 'Mostrando {count} consultas que contêm "{search}".',
  },
  "Google'ın tercih ettiği sayfa dışında kalan gösterim payı":
    "Parcela de impressões que foram para páginas diferentes daquela preferida pelo Google",
  "Aynı sorguya yarışan sayfalar": "Páginas que competem pela mesma consulta",
  "Google bu sorguda en çok bu sayfayı gösteriyor":
    "O Google mostra esta página com mais frequência para esta consulta",
  "Tercih edilen": "Preferida",
  "Dışa aktarılamadı": "Não foi possível exportar",
  "Google Search Console'dan gelen tıklama, gösterim, tıklama oranı ve ortalama sıra.":
    "Cliques, impressões, CTR e posição média do Google Search Console.",
  "Mülkü değiştir": "Alterar propriedade",
  "Arama performansı yüklenemedi":
    "Não foi possível carregar o desempenho da pesquisa",
  "Arama türü: {type}": "Tipo de pesquisa: {type}",
  "Sıra 5-20 ({count})": "Posições 5-20 ({count})",
  Sorgular: "Consultas",
  Sayfalar: "Páginas",
  "Sayfa çakışmaları": "Canibalização",
  "Bu analiz için 7 günlük seçim 28 güne çıkarılır. Gerçek tarih aralığı aşağıda yazar.":
    "Para esta análise, uma seleção de 7 dias é ampliada para 28 dias. O intervalo de datas real é mostrado abaixo.",
  "Tablo yüklenemedi": "Não foi possível carregar a tabela",
  "{column} içinde ara": "Pesquisar {column}",
  "Arama performansı: {column}": "Desempenho da pesquisa: {column}",
  "Aramanıza uyan satır yok": "Nenhuma linha corresponde à sua pesquisa",
  "Bu hızlı filtreye uyan satır yok":
    "Nenhuma linha corresponde a este filtro rápido",
  "Bu filtrelerle eşleşen satır yok":
    "Nenhuma linha corresponde a esses filtros",
  "Bu dönem için henüz veri yok": "Ainda não há dados para este período",
  '"{search}" hiçbir satırda geçmiyor. Aramayı temizleyin ya da başka bir terim deneyin.':
    'Nenhuma linha contém "{search}". Limpe a pesquisa ou tente outro termo.',
  "Hızlı filtreyi kaldırarak tüm satırlara dönün.":
    "Limpe o filtro rápido para voltar a todas as linhas.",
  "Arama türü, cihaz ya da ülke filtresini genişletmeyi deneyin.":
    "Tente ampliar o filtro de tipo de pesquisa, dispositivo ou país.",
  "Search Console verisi birkaç gün gecikmeli gelir. Mülkü yeni bağladıysanız biraz daha beklemeniz gerekebilir.":
    "Os dados do Search Console chegam com alguns dias de atraso. Se você acabou de conectar a propriedade, talvez seja necessário esperar um pouco mais.",
  "Google tek seferde en fazla bu kadar satır verir ve sınıra ulaşıldı, liste tam değil. Daraltmak için filtreleri kullanın.":
    "O Google retorna no máximo esse número de linhas por vez e o limite foi atingido, portanto a lista está incompleta. Use os filtros para restringi-la.",
  "{count} kelime kayıtlı": {
    one: "{count} palavra-chave salva",
    other: "{count} palavras-chave salvas",
  },
  "Kelimeler kaydedilemedi": "Não foi possível salvar palavras-chave",
  "Kelime kayıtlı": "Palavra-chave salva",
  "Kelime kaydedilemedi": "Não foi possível salvar palavra-chave",
  "Önceki dönemde bu sorgu için veri yok.":
    "Nenhum dado para esta consulta no período anterior.",
  "Önceki dönemde veri yok": "Nenhum dado no período anterior",
  Değişmedi: "Sem variação",
  "Yükseldi {value}": "Subiu {value}",
  "Düştü {value}": "Desceu {value}",
  "Takip edilen sorgular ortalama sırasına göre gruplanır. Bir çubuğa tıklayınca tablo o gruba daralır.":
    "As consultas monitoradas são agrupadas por posição média. Clique em uma barra para restringir a tabela a esse grupo.",
  "{count} sorgunun ortalama sırası. Bir çubuğa tıklayınca tablo o gruba göre daralır.":
    {
      one: "Posição média de {count} consulta. Clique em uma barra para restringir a tabela a esse grupo.",
      other:
        "Posição média de {count} consultas. Clique em uma barra para restringir a tabela a esse grupo.",
    },
  "Sıra grupları": "Grupos de posição",
  "Sıra {band}: {count} sorgu": {
    one: "Posição {band}: {count} consulta",
    other: "Posição {band}: {count} consultas",
  },
  "Sırası {band} olan sorguları göster": "Mostrar consultas em posições {band}",
  "Arşiv durumu okunamadı": "Não foi possível ler o status do arquivo",
  "Sıralama arşivi Search Console verisinden doldurulur. Bağladığınızda geçmiş günler kendiliğinden birikmeye başlar.":
    "O arquivo de posições é preenchido com dados do Search Console. Depois que você o conectar, os dias anteriores começam a se acumular sozinhos.",
  "Arşiv güncellenemedi: {error}":
    "Não foi possível atualizar o arquivo: {error}",
  "{date} tarihine kadar kontrol edildi, kelime verisi bulunamadı.":
    "Verificado até {date}; nenhum dado de palavra-chave encontrado.",
  "Veri yükleme henüz başlamadı.": "O carregamento de dados ainda não começou.",
  "Kalan günler sonraki açılışlarda yüklenecek.":
    "Os dias restantes serão carregados nas próximas vezes que você abrir esta página.",
  "Arşiv {start} – {end} arasını kapsıyor, {rows} satır.":
    "O arquivo cobre {start} – {end}, {rows} linhas.",
  "Arşiv {rows} satır.": "O arquivo contém {rows} linhas.",
  "Bu açılışta {count} gün eklendi.": {
    one: "{count} dia adicionado nesta visita.",
    other: "{count} dias adicionados nesta visita.",
  },
  "Kalan günler sonraki açılışta tamamlanacak.":
    "Os dias restantes serão preenchidos na próxima vez que você abrir esta página.",
  "Hangi kelimelerle arandığınız henüz görünmüyor":
    "As palavras-chave com as quais as pessoas pesquisam você ainda não estão visíveis",
  "Sitenizin hangi aramalarda kaçıncı sırada çıktığını burada izlersiniz. Search Console kelime bazında veri verdikçe birikir. Az ziyaretçisi olan sitelerde birkaç hafta sürebilir. O zamana kadar toplam tıklama ve gösterime Arama performansı'ndan bakın.":
    "É aqui que você acompanha a posição em que seu site aparece em cada pesquisa. Os dados se acumulam à medida que o Search Console compartilha informações em nível de palavra-chave, o que pode levar algumas semanas em sites com pouco tráfego. Até lá, confira o total de cliques e impressões em Desempenho da pesquisa.",
  "Arama performansını aç": "Abrir Desempenho da pesquisa",
  "Henüz sıralama verisi yok": "Ainda não há dados de posição",
  "Search Console'u bağlayınca geçmiş günler kendiliğinden birikir.":
    "Depois que você conecta o Search Console, os dias anteriores se acumulam por conta própria.",
  "Yükselenler ve düşenler": "Em alta e em queda",
  "En çok yükselenler": "Maiores altas",
  "Bu dönemde belirgin yükselen sorgu yok.":
    "Nenhuma consulta subiu de forma significativa neste período.",
  "En çok düşenler": "Maiores quedas",
  "Bu dönemde belirgin düşen sorgu yok.":
    "Nenhuma consulta caiu de forma significativa neste período.",
  "Sıra geçmişi: {best} ile {worst} arasında":
    "Histórico de posição: entre {best} e {worst}",
  "En iyi {value}": "Melhor {value}",
  "En kötü {value}": "Pior {value}",
  "{date} · Sıra {position} · {clicks} tıklama · {impressions} gösterim":
    "{date} · Posição {position} · {clicks} cliques · {impressions} impressões",
  "Günlük değeri görmek için grafiğin üzerine gelin ya da grafiğe odaklanıp sol ve sağ ok tuşlarını kullanın.":
    "Passe o mouse sobre o gráfico para ver o valor de um dia ou foque-o e use as teclas de seta para a esquerda e para a direita.",
  "Sorgu geçmişi yüklenemedi":
    "Não foi possível carregar o histórico de consultas",
  "Bu sorgu için kayıtlı gün yok.": "Nenhum dia registrado para esta consulta.",
  "{start} – {end} · {count} gün kayıtlı": {
    one: "{start} – {end} · {count} dia registrado",
    other: "{start} – {end} · {count} dias registrados",
  },
  "Toplam tıklama / gösterim: {clicks} / {impressions}":
    "Total de cliques / impressões: {clicks} / {impressions}",
  "Arama performansında aç": "Abrir em Desempenho da pesquisa",
  Değişim: "Variação",
  "Bir önceki, aynı uzunluktaki dönemle karşılaştırılır. Sıra numarası küçüldüyse (12'den 8'e gibi) kelime yükselmiştir ve yeşil “Yükseldi” yazar. Büyüdüyse kırmızı “Düştü” yazar.":
    "Comparado com o período anterior de mesma duração. Se o número da posição diminuiu (por exemplo, de 12 para 8), a palavra-chave subiu e mostra “Subiu” em verde. Se aumentou, mostra “Desceu” em vermelho.",
  "Sorgular yüklenemedi": "Não foi possível carregar consultas",
  "Kayıtlı kelimelere ekle": "Adicionar às palavras-chave salvas",
  "30 gün": "30 dias",
  "90 gün": "90 dias",
  "6 ay": "6 meses",
  "16 ay": "16 meses",
  "Arşivin tamamı": "Arquivo inteiro",
  "Aramanıza uyan sorgu yok": "Nenhuma consulta corresponde à sua pesquisa",
  "Bu filtreye uyan sorgu yok": "Nenhuma consulta corresponde a este filtro",
  "Bu aralıkta kayıtlı sorgu yok":
    "Nenhuma consulta registrada neste intervalo",
  "Arama kutusunu temizleyin ya da başka bir sorgu deneyin.":
    "Limpe a caixa de pesquisa ou tente outra consulta.",
  "Sıra dağılımındaki çubuğu ya da hızlı filtreyi kaldırın.":
    "Limpe a barra de distribuição de posições ou o filtro rápido.",
  "Daha geniş bir dönem seçmeyi deneyin.":
    "Tente escolher um período mais longo.",
  "Sorgularınızın Google'daki ortalama sırası. Arşiv bu bilgisayarda tutulduğu için Google'ın 16 aylık sınırından daha eskiye de bakabilirsiniz.":
    "A posição média de suas consultas no Google. O arquivo é mantido neste computador, para que você possa olhar além do limite de 16 meses do Google.",
  "Zaman aralığı": "Intervalo de tempo",
  "Değişim gösterilemiyor. Arşivde önceki dönem ({start} – {end}) için bu sorgulara ait kayıt yok. Karşılaştırma, iki dönemde de verisi olan sorgular için yapılır. Daha kısa bir aralık seçin ya da arşivin dolmasını bekleyin.":
    "Não é possível mostrar a variação. O arquivo não tem registros destas consultas no período anterior ({start} – {end}). A comparação inclui apenas consultas com dados nos dois períodos. Escolha um intervalo mais curto ou aguarde até o arquivo ter dados suficientes.",
  "Sorgu içinde ara": "Pesquisar nas consultas",
  "Değişim filtreleri": "Alterar filtros",
  Yükselenler: "Em alta",
  "Önceki döneme göre en az yarım sıra yükselen sorgular.":
    "Consultas que subiram pelo menos meia posição em relação ao período anterior.",
  Düşenler: "Em queda",
  "Önceki döneme göre en az yarım sıra düşen sorgular.":
    "Consultas que caíram pelo menos meia posição em comparação com o período anterior.",
  "Şu an ilk 10'da": "Agora no top 10",
  "Şimdi ortalama sırası 10 ya da daha iyi olan sorgular, ilk 10'a yeni girenler dahil. Önceki dönemde de verisi olanlar sayılır. Üstteki çubuk ise şu anki tüm sorguları sayar.":
    "Consultas cuja posição média é agora 10 ou melhor, incluindo novas entradas no top 10. Somente consultas com dados no período anterior contam; a barra acima conta todas as consultas atuais.",
  "İlk 10'dan çıkanlar": "Saíram do top 10",
  "Önceki dönemde ilk 10'da olup şimdi ilk 10'un dışına çıkan sorgular.":
    "Consultas que estavam no top 10 no período anterior e agora estão fora dele.",
  "Gösterimi yüksek": "Impressões altas",
  "{impressions} veya daha fazla gösterim alan sorgular.":
    "Consultas com {impressions} ou mais impressões.",
  "Gösterilmiş ama hiç tıklanmamış sorgular.":
    "Consultas que foram mostradas mas nunca clicadas.",
  "Arşivde daha fazla sorgu var. Bu liste en çok gösterim alan {count} tanesiyle sınırlı. Aralığı daraltarak farklı sorguları görebilirsiniz.":
    "O arquivo tem mais consultas. Esta lista está limitada às {count} com mais impressões. Reduza o intervalo para ver consultas diferentes.",
  "Az tıklanan": "Poucos cliques",
  "Sıralaması iyi ama tıklama oranı, sitenizdeki benzer sıralı sayfaların altında. Başlığı ve açıklamayı yeniden yazmaya değer.":
    "Tem boa posição, mas sua CTR está abaixo da de páginas com posição semelhante no seu site. Vale a pena reescrever o título e a descrição.",
  "Başlığı, kullanıcının aradığı şeyi ilk kelimelerde karşılayacak biçimde yeniden yazın.":
    "Reescreva o título para que as primeiras palavras respondam ao que a pessoa está procurando.",
  "Meta açıklamayı, tıklamaya değeceğini gösteren tek bir somut vaatle güncelleyin.":
    "Atualize a meta descrição com uma promessa concreta que mostre que o clique vale a pena.",
  "Yayına aldıktan iki hafta sonra bu ekrana dönüp tıklama oranına bakın.":
    "Duas semanas após a publicação, volte a esta tela e verifique a CTR.",
  "İlk sıralarda": "No topo",
  "Zaten ilk üçte; yükselecek yer az. Tıklama oranı düşükse başlığa ve açıklamaya bakın, değilse içeriği güncel tutmak yeterli.":
    "Já está entre os três primeiros, com pouco espaço para subir. Se a CTR estiver baixa, observe o título e a descrição; caso contrário, manter o conteúdo atualizado é suficiente.",
  "İçeriği güncel tutun; tarih, fiyat ve örnekleri yılda en az bir kez gözden geçirin.":
    "Mantenha o conteúdo atualizado; revise datas, preços e exemplos pelo menos uma vez por ano.",
  "Bu sayfadan öne çıkarmak istediğiniz diğer sayfalara iç bağlantı verin.":
    "Crie links desta página para as outras páginas que você quer promover.",
  "Tıklama oranı beklediğinizden düşükse başlığı ve meta açıklamayı yeniden yazın.":
    "Se a CTR for menor do que o esperado, reescreva o título e a meta descrição.",
  "Yükselmeye yakın": "Perto de subir",
  "İlk sayfaya çok yakın ya da hemen üstünde. Küçük bir iyileştirme sıra kazandırabilir.":
    "Muito perto da primeira página, ou logo nela. Uma pequena melhoria pode fazer ganhar posições.",
  "İçeriği, bu sayfanın öne çıktığı aramalara daha eksiksiz yanıt verecek şekilde güçlendirin.":
    "Fortaleça o conteúdo para que responda de forma mais completa às pesquisas em que esta página aparece.",
  "Sitenizdeki ilgili sayfalardan, doğal bir bağlam içinde bu sayfaya iç bağlantı verin.":
    "Crie links para esta página a partir de páginas relacionadas do seu site, em um contexto natural.",
  "Başlıkta ve ilk paragrafta hedef aramayı açıkça geçirin.":
    "Mencione claramente a pesquisa alvo no título e no primeiro parágrafo.",
  "Derinde kalan": "Enterrada no fundo",
  "20. sıranın gerisinde ama bu arama için bir talep var. Sayfayı genişletip genişletmeyeceğinize ya da başka bir sayfayla birleştirip birleştirmeyeceğinize karar verin.":
    "Além da posição 20, mas há demanda para esta pesquisa. Decida se vai ampliar a página ou mesclá-la com outra.",
  "Sayfa gerçekten bu konunun cevabı mı? Değilse hangi bölümler eksik, yazın.":
    "A página é realmente a resposta para este tópico? Caso contrário, escreva as seções que estão faltando.",
  "Aynı konuya değinen başka sayfanız varsa birleştirmeyi ve yönlendirme kurmayı düşünün.":
    "Se outra de suas páginas abordar o mesmo tópico, considere mesclá-las e configurar um redirecionamento.",
  "Genişletmeye değmiyorsa sayfayı bırakın; emeği daha yakın fırsatlara harcayın.":
    "Se não vale a pena expandir, deixe a página de lado e invista em oportunidades mais próximas.",
  "Analytics'te karşılığı olanlar": "Encontrado no Google Analytics",
  "Analytics'te karşılığı yok": "Não encontrado no Google Analytics",
  "En çok gösterim alan 10": "Top 10 por impressões",
  "Analytics'te aynı dönemde {sessions} oturum getirmiş.":
    "No Google Analytics, ele trouxe {sessions} sessões no mesmo período.",
  "Ortalama {position}. sırada {impressions} kez gösterildi ama yalnızca {clicks} tıklama aldı (tıklama oranı {ctr}).":
    "Exibida {impressions} vezes em posição média {position}, mas obteve apenas {clicks} cliques (CTR {ctr}).",
  "Ortalama {position}. sırada {impressions} kez gösterildi ama yalnızca {clicks} tıklama aldı (tıklama oranı {ctr}, sitenizde bu sıradaki sayfaların ortancasından {gap} yüzde puan daha düşük).":
    "Exibida {impressions} vezes em posição média {position}, mas obteve apenas {clicks} cliques (CTR {ctr}, {gap} pontos percentuais abaixo da mediana das páginas nesta posição no seu site).",
  "Tıklama oranını ({ctr}) kıyaslayacak kadar veri yok; düşük görünüyorsa başlığı ve açıklamayı gözden geçirin.":
    "Não há dados suficientes para comparar sua CTR ({ctr}); se parecer baixa, revise o título e a descrição.",
  "Tıklama oranı sitenizdeki benzer sıradaki sayfalarla uyumlu; içeriği ve başlığı güçlü tutmak yeterli.":
    "Sua CTR está alinhada com a de páginas com posição semelhante no seu site; basta manter o conteúdo e o título fortes.",
  "Ortalama {position}. sırada, yani zaten ilk sıralarda. {impressions} gösterimden {clicks} tıklama aldı.":
    "Posição média {position}, então já está no topo. Obteve {clicks} cliques de {impressions} impressões.",
  "Ortalama {position}. sırada; ilk sayfaya çok yakın. {impressions} gösterimden {clicks} tıklama aldı, birkaç basamak yükselmek bunu belirgin şekilde artırabilir.":
    "Posição média {position}, muito perto da primeira página. Obteve {clicks} cliques de {impressions} impressões; subir algumas posições pode aumentar isso de forma visível.",
  "Ortalama {position}. sırada, yani çoğu kullanıcının görmediği yerde; yine de {impressions} gösterim aldı. Bu sayfaya bir talep var.":
    "Posição média {position}, onde a maioria das pessoas nunca olha, mas ainda assim obteve {impressions} impressões. Há demanda para esta página.",
  Talep: "Demanda",
  "İş değeri": "Valor comercial",
  "Yükselme kolaylığı": "Facilidade de subida",
  "Bu sayfa için arama talebi yüksek.":
    "A demanda de pesquisa para esta página é alta.",
  "Arama talebi orta.": "A demanda de pesquisa é moderada.",
  "Arama talebi düşük.": "A demanda de pesquisa é baixa.",
  "Sitenize gelen ziyaretçiler bu sayfada değerli işlemler yapıyor.":
    "Os visitantes do seu site realizam ações valiosas nesta página.",
  "İş değeri orta.": "O valor comercial é moderado.",
  "Ziyaretçilerin bu sayfada yaptığı işlem az.":
    "Os visitantes realizam poucas ações nesta página.",
  "İlk sıralara çok yakın; emek çabuk karşılık verir.":
    "Muito perto do topo; o esforço compensa rapidamente.",
  "İlk sıralara makul uzaklıkta.": "Uma distância razoável do topo.",
  "İlk sıralardan uzak; sonuç almak zaman alır.":
    "Longe do topo; os resultados levarão tempo.",
  "Fırsat türleri": "Tipos de oportunidade",
  "{kind} · {count} sayfa": {
    one: "{kind} · {count} página",
    other: "{kind} · {count} páginas",
  },
  "Şu an bu türde sayfa yok. {hint}":
    "Nenhuma página deste tipo no momento. {hint}",
  "Analytics'te trafiği olan sayfa yok; Analytics bağlı değilse önce bağlayın.":
    "Nenhuma página tem tráfego no Google Analytics; se o Analytics não estiver conectado, conecte-o primeiro.",
  "Her sayfanın Analytics'te karşılığı var; eşleşmeyen sayfa kalmadı.":
    "Cada página tem uma correspondência no Analytics; não há páginas sem correspondência.",
  "Listelenecek sayfa yok.": "Não há páginas para listar.",
  "Fırsatların dağılımı": "Detalhamento de oportunidades",
  "Fırsat nerede toplanıyor?": "Onde as oportunidades estão concentradas?",
  "Kutular neye göre hesaplansın?": "O que os quadros devem medir?",
  "toplam {unit}": "{unit} no total",
  "Toplam {total} {unit} içinde en büyük pay {kind} kümesinde ({share}).":
    "De {total} {unit} no total, a maior parcela está no grupo {kind} ({share}).",
  "Analytics oturumu": "Sessões do Analytics",
  "Puanın dökümü": "Detalhamento da pontuação",
  "Puan nereden geliyor?": "De onde vem a pontuação?",
  "Puan {score} nereden geliyor?": "De onde vem a pontuação de {score}?",
  "Ne yapmalı?": "O que fazer",
  "Sayfayı aç": "Abrir página",
  "Burası ne işe yarar?": "Para que serve esta página?",
  "Google'ın sayfanızı gösterdiği ama az tıklandığı ya da birkaç basamak yükselince çok daha fazla ziyaretçi getirecek sayfaları burada topluyoruz. Bir satıra tıklayınca nedenini ve ne yapmanız gerektiğini görürsünüz.":
    "Esta página reúne as páginas que o Google mostra, mas em que poucas pessoas clicam, e as que trariam muito mais visitantes se subissem algumas posições. Clique em uma linha para ver por que ela está aqui e o que fazer.",
  "Fırsatlar için Search Console ve Analytics gerekir":
    "As oportunidades precisam do Search Console e do Analytics",
  "Sıralamalar Search Console'dan, sayfaların kazandırdığı Analytics'ten gelir. İkisini de bağlayınca fırsatlar puanlanır.":
    "As posições vêm do Search Console, e o que as páginas geram vem do Analytics. Quando ambos estiverem conectados, as oportunidades recebem pontuação.",
  "Bağlantıları ayarla": "Configurar conexões",
  "Search Console bu dönem için veri vermedi":
    "O Search Console não retornou dados para este período",
  "{start} – {end} aralığında hiçbir sayfanız arama sonuçlarında görünmedi. Mülkü yeni bağladıysanız Google'ın veriyi doldurması birkaç gün sürer.":
    "Nenhuma das suas páginas apareceu nos resultados de pesquisa entre {start} e {end}. Se você acabou de conectar a propriedade, o Google leva alguns dias para preencher os dados.",
  "Bu dönemde fırsat çıkmadı": "Não há oportunidades neste período",
  "{start} – {end} aralığında puanlanacak bir sayfa çıkmadı. Dönemi genişletmeyi deneyin.":
    "Não há páginas para pontuar entre {start} e {end}. Experimente um período mais longo.",
  "Ayrıntı ve öneriler için bir satıra tıklayın.":
    "Clique em uma linha para ver detalhes e sugestões.",
  "E-Tablolar'a aktar ({rows} satır)": "Exportar para o Sheets ({rows} linhas)",
  "CSV ({rows} satır)": "CSV ({rows} linhas)",
  "Bu filtreye uyan sayfa yok": "Nenhuma página corresponde a este filtro",
  "Seçtiğiniz tür ya da hızlı filtre bu dönemde hiçbir sayfayla eşleşmedi. Filtreleri kaldırın ya da dönemi genişletin.":
    "O tipo ou filtro rápido que você escolheu não correspondeu a nenhuma página neste período. Limpe os filtros ou escolha um período maior.",
  "Filtreleri kaldır": "Limpar filtros",
  "Google'da kaçıncı sırada çıktığınız; küçük olan iyidir. 1, sonuçların en üstü demek.":
    "Onde você aparece no Google; menor é melhor. 1 significa o topo dos resultados.",
  "Sayfanızın arama sonuçlarında kaç kez göründüğü.":
    "Quantas vezes sua página apareceu nos resultados de pesquisa.",
  "Aramalardan sayfanıza kaç kez tıklandığı.":
    "Quantas vezes as pessoas clicaram em sua página a partir da pesquisa.",
  "Gösterilenlerin yüzde kaçı tıklandı. Altındaki ok, sayfanın sitenizde aynı sıradaki sayfalara göre farkını gösterir.":
    "A parcela de impressões que geraram um clique. A seta abaixo mostra como a página se compara a páginas na mesma posição no seu site.",
  "Analytics'ten, Search Console ile aynı tarih aralığı için alınır; Analytics ekranındaki aralıktan farklı olabilir.":
    "Do Analytics, para o mesmo período do Search Console; pode ser diferente do intervalo na tela do Analytics.",
  "Son 90 gün": "Últimos 90 dias",
  "Google'da görünen sayfalarınız, üzerinde çalışmaya en değer olandan başlayarak.":
    "Suas páginas que aparecem no Google, começando pelas que valem mais a pena trabalhar.",
  "Fırsatlar yüklenemedi": "Não foi possível carregar oportunidades",
  Dönem: "Período",
  "Search Console tek seferde sınırlı sayıda satır verir ve bu sınıra ulaşıldı; gerçekte daha fazla aday sayfa olabilir.":
    "O Search Console retorna um número limitado de linhas por vez e esse limite foi atingido; pode haver mais páginas candidatas.",
  "Search Console ve Analytics farklı saat dilimlerinde raporluyor; günlük eşleşmeler bir gün kayabilir.":
    "O Search Console e o Analytics usam fusos horários diferentes, portanto as correspondências diárias podem ter um dia de diferença.",
  Listelenen: "Listado",
  "Filtreye uyan · {rows} satır içinde":
    "Correspondentes ao filtro · de {rows} linhas",
  "{candidates} aday sayfanın en iyileri":
    "As melhores entre {candidates} páginas candidatas",
  "Tüm aday sayfalar ({candidates})":
    "Todas as páginas candidatas ({candidates})",
  "{analytics}'te karşılığı var": "Encontrado em {analytics}",
  "{candidates} aday içinde": "De {candidates} candidatas",
  "{analytics}'te karşılığı yok": "Não encontrado em {analytics}",
  "Listedeki her sayfanın Analytics karşılığı var":
    "Cada página listada tem uma correspondência no Analytics",
  "Listelenen {rows} sayfanın {count} tanesi · listele":
    "{count} de {rows} páginas listadas · mostrar",
  "En yüksek puan": "Pontuação máxima",
  "{page} · ayrıntı": "{page} · detalhes",
  "Puan nasıl hesaplanır?": "Como a pontuação é calculada?",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri dönüşüm tanımlı olmadığı için etkileşim oranına göre hesaplanır.":
    "Demanda (50%) + valor comercial (30%) + facilidade de subida (20%). O valor comercial se baseia na taxa de engajamento, porque não há eventos principais configurados.",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri etkileşim oranına göre hesaplanır.":
    "Demanda (50%) + valor comercial (30%) + facilidade de subida (20%). O valor comercial se baseia na taxa de engajamento.",
  "Talep (%50) + iş değeri (%30) + yükselme kolaylığı (%20). İş değeri dönüşümlere göre hesaplanır.":
    "Demanda (50%) + valor comercial (30%) + facilidade de subida (20%). O valor comercial se baseia nos eventos principais.",
  "Analytics'te karşılığı yok ne demek?":
    "O que significa “não encontrado no Google Analytics”?",
  "Analytics o sayfaya hiç ziyaret görmemiş ya da adresi farklı yazılmış olabilir. Bu sayfalar da puanlanır. İş değerinde haksız yere sıfır almasınlar diye ortada bir değer verilir.":
    "O Analytics pode não ter registrado visitas a essa página ou ter registrado o endereço de forma diferente. Essas páginas também recebem pontuação: elas obtêm um valor comercial médio para não ficarem injustamente com zero.",
  "Bu seçenek yalnızca Windows paketinde kullanılabilir.":
    "Essa opção está disponível apenas no aplicativo do Windows.",
  "Windows ayarı kaydedilemedi. Tepsi uygulamasının açık olduğunu ve ayarın yönetici tarafından kilitlenmediğini kontrol edip tekrar deneyin.":
    "A preferência do Windows não pôde ser salva. Verifique se o aplicativo da bandeja está em execução e se a preferência não está bloqueada por um administrador e tente novamente.",
  "Giriş yok: uygulama yalnızca bu bilgisayarda kullanılır. İnternete açacaksanız önüne kendi girişinizi koyun.":
    "Sem login: o app foi feito para ser usado apenas neste computador. Se você expô-lo à internet, proteja-o com seu próprio sistema de login.",
  "Cloudflare Access belirteci reddedildi: hedef kitle uyuşmuyor. POLICY_AUD, Access uygulamanızın AUD etiketiyle aynı değil — Zero Trust -> Access controls -> Applications -> Configure -> Additional settings yolundan kopyalayın.":
    "Token do Cloudflare Access rejeitado: audience não corresponde. POLICY_AUD não corresponde à tag AUD do seu aplicativo do Access; copie-a em Zero Trust -> Controles de acesso -> Aplicativos -> Configurar -> Configurações adicionais.",
  "Cloudflare Access belirteci reddedildi: veren taraf uyuşmuyor. TEAM_DOMAIN, belirteci veren Cloudflare ekibiyle aynı değil — Zero Trust ayarlarındaki ekip alan adınızla karşılaştırın.":
    "Token do Cloudflare Access rejeitado: emissor não corresponde. TEAM_DOMAIN não corresponde à equipe do Cloudflare que emitiu o token; compare-o com o domínio da equipe nas configurações do Zero Trust.",
  "Cloudflare Access belirteci TEAM_DOMAIN'in imza anahtarlarıyla doğrulanamadı. TEAM_DOMAIN'in ekibinizin https://<team>.cloudflareaccess.com adresi olduğundan emin olun.":
    "Não foi possível verificar o token do Cloudflare Access com as chaves de assinatura de TEAM_DOMAIN. Verifique se TEAM_DOMAIN é o endereço https://<team>.cloudflareaccess.com da sua equipe.",
  "Bu projede böyle bir denetim bulunamadı.":
    "Este projeto não tem essa auditoria.",
  "Denetim ayarları geçersiz.": "As configurações de auditoria são inválidas.",
  "Çalışan denetimin durumu doğrulanamadı; silme iptal edildi. Lütfen tekrar deneyin.":
    "Não foi possível confirmar o status da auditoria em execução, portanto ela não foi excluída. Tente novamente.",
  "Çalışan denetim durdurulamadı.":
    "Não foi possível interromper a auditoria em execução.",
  "Bu denetim şu an silinemiyor. Bitmesini bekleyip yeniden deneyin.":
    "Esta auditoria não pode ser excluída no momento. Aguarde a conclusão e tente novamente.",
  "Denetimin Lighthouse çıktıları silinemedi; denetim silinmedi. Lütfen tekrar deneyin.":
    "Não foi possível excluir os resultados do Lighthouse da auditoria, portanto a auditoria não foi excluída. Tente novamente.",
  "Google Analytics bu hizmet hesabına izin vermedi. İki şey gerekiyor: Google Cloud projenizde Google Analytics Admin API etkin olmalı, ve GA4 mülkünüzde Yönetici → Erişim yönetimi altında {email} adresi Görüntüleyen olarak ekli olmalı.":
    "O Google Analytics negou acesso a esta conta de serviço. São necessárias duas coisas: a API Admin do Google Analytics deve estar ativada no seu projeto do Google Cloud, e {email} deve ser adicionado com o papel de Leitor em Administrador → Gerenciamento de acesso na sua propriedade do GA4.",
  "Google Analytics bu hizmet hesabına izin vermedi. Google Analytics Admin API'yi etkinleştirin ve hesabın adresini GA4 mülkünüze Görüntüleyen olarak ekleyin.":
    "O Google Analytics negou acesso a esta conta de serviço. Ative a API Admin do Google Analytics e adicione o endereço da conta à sua propriedade do GA4 com o papel de Leitor.",
  "Bu Google hesabı seowatcher hesabınıza bağlı değil.":
    "Esta conta do Google não está conectada à sua conta do seowatcher.",
  "Bu Google Analytics mülkü bağlı Google hesabınızda bulunmuyor.":
    "Esta propriedade do Google Analytics não está na sua conta do Google conectada.",
  "Google kimlik bilgisini döndürmedi. Bağlantıyı yeniden deneyin.":
    "O Google não retornou um token de identidade. Tente se conectar novamente.",
  "Google, {name} yetkilendirme kodunu reddetti. Bağlantıyı yeniden deneyin.":
    "O Google rejeitou o código de autorização de {name}. Tente conectar novamente.",
  "{name} yapılandırılmamış. GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET ve BETTER_AUTH_SECRET değerlerini ayarlayın.":
    "{name} não está configurado. Defina GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET e BETTER_AUTH_SECRET.",
  "{name} bağlantı isteği geçersiz. Bağlantıyı yeniden başlatın.":
    "A solicitação de conexão de {name} é inválida. Comece a conexão novamente.",
  "{name} bağlantı isteğinin süresi doldu. Bağlantıyı yeniden başlatın.":
    "A solicitação de conexão de {name} expirou. Comece a conexão novamente.",
  "Search Console bağlantısının yenilenmesi gerekiyor.":
    "A conexão do Search Console precisa ser renovada.",
  "Search Console isteği başarısız oldu.":
    "A solicitação do Search Console falhou.",
  "Bu Search Console mülkü bağlı Google hesabınızda bulunmuyor.":
    "Esta propriedade do Search Console não está em sua conta do Google conectada.",
  "Bu Search Console mülkü için doğrulanmış erişiminiz yok.":
    "Você não tem acesso verificado a esta propriedade do Search Console.",
  "En fazla {count} etikete göre filtreleyebilirsiniz.": {
    one: "Você pode filtrar por no máximo {count} tag.",
    other: "Você pode filtrar por no máximo {count} tags.",
  },
  "Bu adda bir etiket zaten var. Farklı bir ad seçin.":
    "Já existe uma tag com esse nome. Escolha um nome diferente.",
  "Etiket {count} kelimeye bağlı. Önce bu kelimelerden kaldırıp tekrar deneyin.":
    {
      one: "Esta tag está em {count} palavra-chave. Remova-a dessa palavra-chave primeiro e tente novamente.",
      other:
        "Esta tag está em {count} palavras-chave. Remova-a dessas palavras-chave primeiro e tente novamente.",
    },
  "Anahtar çalışıyor: Google PageSpeed Insights ölçümü kabul etti.":
    "A chave funciona: o Google PageSpeed Insights aceitou a medição.",
  "Kayıtlı bir anahtar yok; test edilecek bir şey yok. Önce anahtarı kaydedin.":
    "Nenhuma chave salva, portanto não há nada para testar. Salve a chave primeiro.",
  "Google anahtarı geçersiz buldu. Anahtarı Google Cloud Console'dan yeniden kopyalayıp kaydedin.":
    "O Google considerou a chave inválida. Copie-a novamente do Google Cloud Console e salve-a.",
  "Anahtar tanınıyor ama PageSpeed Insights için kullanılamıyor: API etkin değil ya da anahtarın kısıtlamaları buna izin vermiyor. Google Cloud Console'da API'yi etkinleştirin ve anahtar kısıtlamasını kontrol edin.":
    "A chave é reconhecida, mas não pode ser usada para o PageSpeed Insights: a API não está ativada ou as restrições da chave não permitem. Ative a API no Google Cloud Console e verifique as restrições da chave.",
  "Anahtar geçerli ama Google'ın günlük kotası dolmuş. Yarın yeniden deneyin ya da Google Cloud Console'dan kotayı kontrol edin.":
    "A chave é válida, mas a cota diária do Google está esgotada. Tente novamente amanhã ou verifique a cota no Google Cloud Console.",
  "Anahtar geçerli ama Google dakikalık sınıra takıldı. Bir dakika bekleyip yeniden deneyin.":
    "A chave é válida, mas o Google atingiu o limite por minuto. Aguarde um minuto e tente novamente.",
  "Google'a ulaşılamadı. İnternet bağlantısını kontrol edip yeniden deneyin; anahtar hakkında bir sonuç alınamadı.":
    "Não foi possível entrar em contato com o Google, portanto não há resultado para a chave. Verifique sua conexão com a Internet e tente novamente.",
  "Google beklenmeyen bir yanıt verdi; anahtar hakkında bir sonuç alınamadı. Birazdan yeniden deneyin.":
    "O Google enviou uma resposta inesperada, portanto não há resultado para a chave. Tente novamente daqui a pouco.",
  'Alan adı olmayan "Default" adında bir proje zaten var. Farklı bir ad seçin ya da bir alan adı ekleyin.':
    'Já existe um projeto chamado "Padrão" sem domínio. Escolha um nome diferente ou adicione um domínio.',
  "Geçerli bir alan adı girin, örneğin acme.com.":
    "Insira um domínio válido, por exemplo acme.com.",
  'Alan adı olmayan, "Default" adında etkin bir proje zaten var. Önce onu yeniden adlandırın, sonra bunu geri yükleyin.':
    'Já existe um projeto ativo chamado "Padrão" sem domínio. Renomeie-o primeiro e depois restaure este.',
  "Geçerli bir alan adı girin.": "Insira um domínio válido.",
  "Adresin nereye çözümlendiği doğrulanamadı, bu yüzden tarama başlatılmadı. Uygulamanın cloudflare-dns.com adresine erişebildiğinden emin olun.":
    "Não foi possível confirmar onde esse endereço é resolvido, portanto o rastreamento não foi iniciado. Verifique se o aplicativo pode acessar cloudflare-dns.com.",
  "Adres herkese açık DNS'te çözümlenmiyor, bu yüzden tarama başlatılmadı.":
    "Esse endereço não é resolvido em DNS público, portanto o rastreamento não foi iniciado.",
  "Kullanıcı adı veya parola içeren adresler taranamaz.":
    "Endereços que contêm um nome de usuário ou senha não podem ser rastreados.",
  "Google beklenmedik bir yanıt verdi.":
    "O Google enviou uma resposta inesperada.",
  "Google'ın istek sınırı doldu.":
    "O limite de solicitações do Google foi atingido.",
  'Anahtarın API kısıtlaması "Chrome UX Report API"yi dışarıda bırakıyor. Google Cloud Console\'da anahtarın kısıtlamasına ekleyip tekrar deneyin.':
    'As restrições de API da chave deixam de fora a "API Chrome UX Report". Adicione-a às restrições da chave no Google Cloud Console e tente novamente.',
  'Anahtarın Google Cloud projesinde "Chrome UX Report API" etkin değil. Google Cloud Console\'da API bölümünden etkinleştirip tekrar deneyin.':
    'A "API Chrome UX Report" não está ativada no projeto do Google Cloud da chave. Ative-a em APIs no Google Cloud Console e tente novamente.',
  'Google bu anahtara izin vermedi{reason}. Anahtarın Google Cloud projesinde "Chrome UX Report API" etkin olmalı ve anahtarın kısıtlamasında yer almalı.':
    'O Google negou esta chave{reason}. A "API Chrome UX Report" precisa estar ativada no projeto do Google Cloud da chave e incluída nas restrições da chave.',
  "Google yanıt vermedi (HTTP {status}). Birazdan tekrar deneyin.":
    "O Google não respondeu (HTTP {status}). Tente novamente daqui a pouco.",
  "Hizmet hesabı Google Analytics için erişim anahtarı alamadı.":
    "A conta de serviço não conseguiu obter um token de acesso para o Google Analytics.",
  "Google Analytics erişim anahtarı alınamadı (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Não foi possível obter um token de acesso do Google Analytics (o acesso pode ter sido revogado ou expirado).",
  "Google Analytics erişim anahtarı döndürmedi (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "O Google Analytics não retornou um token de acesso (o acesso pode ter sido revogado ou expirado).",
  'Bu bir hizmet hesabı anahtarı değil. Dosyada "type": "service_account" yazmalı.':
    'Esta não é uma chave de conta de serviço. O arquivo deve conter "type": "service_account".',
  "client_email bir e-posta adresi olmalı.":
    "client_email deve ser um endereço de e-mail.",
  "private_key alanı eksik ya da bozuk.":
    "O campo private_key está ausente ou danificado.",
  "Geçerli bir JSON değil. Google'dan indirdiğiniz dosyanın tamamını yapıştırın.":
    "Isto não é um JSON válido. Cole todo o arquivo que você baixou do Google.",
  "Anahtar dosyası okunamadı.": "Não foi possível ler o arquivo de chave.",
  "Hizmet hesabı tanımlı değil ya da saklanan anahtar okunamıyor.":
    "Nenhuma conta de serviço está configurada ou a chave armazenada não pode ser lida.",
  "Hizmet hesabı için izin verilmeyen kapsam: {scope}":
    "Escopo não permitido para a conta de serviço: {scope}",
  "Hizmet hesabı anahtarı imzalanamadı; dosya bozuk olabilir.":
    "Não foi possível assinar com a chave da conta de serviço; o arquivo pode estar danificado.",
  "Google hizmet hesabı için erişim anahtarı vermedi ({status}). {detail}":
    "O Google não emitiu um token de acesso para a conta de serviço ({status}). {detail}",
  "Google beklenmeyen bir erişim anahtarı yanıtı döndürdü.":
    "O Google retornou uma resposta inesperada de token de acesso.",
  "Hizmet hesabı Search Console'a bağlanamadı. Anahtar dosyasını yeniden yükleyin.":
    "A conta de serviço não conseguiu se conectar ao Search Console. Faça upload do arquivo de chave novamente.",
  "Search Console erişim anahtarı alınamadı (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "Não foi possível obter um token de acesso do Search Console (o acesso pode ter sido revogado ou expirado).",
  "Search Console erişim anahtarı döndürmedi (yetki iptal edilmiş ya da süresi dolmuş olabilir).":
    "O Search Console não retornou um token de acesso (o acesso pode ter sido revogado ou expirado).",
  "PageSpeed anahtarı Ayarlar'da kayıtlı.":
    "A chave do PageSpeed está salva em Configurações.",
  "Denetim hâlâ çalışıyor. Rapor, denetim bitince oluşturulabilir.":
    "A auditoria ainda está em execução. O relatório poderá ser criado assim que for concluído.",
  "Bu denetim raporu, sorun listeleri en aza indirilse bile saklama sınırını aşıyor. Raporu oluşturmak için denetimi daha az sayfa veya daha kısa adreslerle yeniden çalıştırın.":
    "Este relatório de auditoria excede o limite de armazenamento mesmo com as listas de problemas reduzidas ao mínimo. Para criá-lo, execute a auditoria novamente com menos páginas ou endereços mais curtos.",
  "URL Denetimi (Search Console)": "Inspeção de URL (Search Console)",
  "Mülk başına günlük {count} sorgu; son 24 saatte bu uygulamanın kaydettiği sorgular sayılır. Google'ın sıfırlanma saati doğrulanmadı.":
    "{count} consultas por propriedade por dia; conta as consultas que este app registrou nas últimas 24 horas. O horário de redefinição do Google não é verificado.",
  "Uygulamanın kendi kaydı": "Registro do próprio app",
  "Anahtar tanımlı.": "Uma chave foi definida.",
  "PageSpeed anahtarı yok: denetimde en fazla {count} sayfanın hızı ölçülür. Anahtarı Ayarlar > Hız ölçümü bölümünden girebilirsiniz.":
    {
      one: "Sem chave do PageSpeed: uma auditoria mede a velocidade de no máximo {count} página. Você pode inserir uma chave em Configurações > Testes de velocidade.",
      other:
        "Sem chave do PageSpeed: uma auditoria mede a velocidade de no máximo {count} páginas. Você pode inserir uma chave em Configurações > Testes de velocidade.",
    },
  "{count} ölçüm günlük sınır nedeniyle yapılamadı": {
    one: "{count} medição foi ignorada devido ao limite diário",
    other: "{count} medições foram ignoradas devido ao limite diário",
  },
  "{count} ölçüm dakikalık sınıra takıldı": {
    one: "{count} medição atingiu o limite por minuto",
    other: "{count} medições atingiram o limite por minuto",
  },
  "Son 24 saatte başlayan denetimlerde {events}.":
    "Em auditorias iniciadas nas últimas 24 horas, {events}.",
  "Son 24 saatte başlayan denetimlerde sınır olayı yok.":
    "Nenhum limite foi atingido em auditorias iniciadas nas últimas 24 horas.",
  "{key} Sayılar, son 24 saatte başlayan denetimlere aittir (tek tek ölçüm saati kaydedilmez). {lastEvent} Google'ın günlük toplamı doğrulanmadı; gerçek kota Google Cloud Console > PageSpeed Insights API > Quotas bölümünde.":
    "{key} Os números cobrem auditorias iniciadas nas últimas 24 horas (os horários de cada medição não são registrados). {lastEvent} O total diário do Google não é verificado; a cota real está em Google Cloud Console > API PageSpeed Insights > Cotas.",
  "Google yanıtındaki son kota bilgisi":
    "Informações de cota mais recentes na resposta do Google",
  "Uygulama yeniden başladığından ya da GA4 bağlantısı değiştiğinden beri bu bağlantıyla GA4 raporu çalışmadı; sayaç bir rapor çalışınca dolar.":
    "Nenhum relatório do GA4 foi executado nesta conexão desde que o app foi reiniciado ou a conexão do GA4 foi alterada; o medidor é atualizado assim que um relatório é executado.",
  "Son istek: {count} puan.": {
    one: "Última solicitação: {count} ponto.",
    other: "Última solicitação: {count} pontos.",
  },
  "günlük {count}": "{count} por dia",
  "saatlik {count}": "{count} por hora",
  "Kalan değer standart mülk sınırını ({limit}) aşıyor; mülk büyük olasılıkla Analytics 360, sınır 10 kat. Gerçek sınır Google'dan gelmez, bu yüzden çubuk gösterilmez. {lastCost}":
    "O valor restante excede o limite de uma propriedade padrão ({limit}), então provavelmente é uma propriedade do Analytics 360 com limite 10 vezes maior. O Google não informa o limite real, por isso nenhuma barra é mostrada. {lastCost}",
  "Google yalnızca kalanı bildirir. Sınır varsayımdır: standart mülk için {limit}; 360 mülklerde 10 kat. Kullanılan = varsayılan sınır − kalan. {lastCost} Sıfırlanma saati doğrulanmadı.":
    "O Google informa apenas o valor restante. O limite é uma suposição: {limit} para uma propriedade padrão, 10 vezes isso para propriedades 360. Usado = limite suposto − restante. {lastCost} O horário de redefinição não é verificado.",
  "Analytics (GA4) günlük kota puanı":
    "Pontos de cota diária do Analytics (GA4)",
  "Analytics (GA4) saatlik kota puanı":
    "Pontos de cota por hora do Analytics (GA4)",
  "Denetim sayfa sınırı": "Limite de páginas por auditoria",

  "Uygulamanın veritabanı": "Banco de dados do aplicativo",
  "Proje başına rapor": "Relatórios por projeto",
  "Takılan bir döngüye karşı koruma; gerçek bir iş akışı buna yaklaşmaz.":
    "Uma proteção contra um loop descontrolado; um fluxo de trabalho real nunca chega perto.",
  "Proje başına rapor şablonu": "Modelos de relatório por projeto",
  "Doluysa yeni şablon için birini silmek gerekir.":
    "Quando estiver cheio, exclua um para adicionar um novo modelo.",
  "En büyük raporun boyutu": "Tamanho do maior relatório",
  "Tek bir rapor bu boyutu aşarsa kaydedilmez; genelde gömülü görseller yüzünden olur.":
    "Um único relatório acima desse tamanho não é salvo; imagens incorporadas são a causa comum.",
  "Denetim tamamlanmadığı için puan hesaplanmadı.":
    "A auditoria não foi concluída, portanto nenhuma pontuação foi calculada.",
  "Taranan sayfa olmadığı için puan hesaplanamadı.":
    "Nenhuma página foi rastreada, portanto nenhuma pontuação pôde ser calculada.",
  "Kayıtlı hiçbir sorun yok. Site temiz görünüyor.":
    "Nenhum problema registrado. O site parece limpo.",
  "Site sağlıklı. Kalan birkaç düzeltme puanı yukarı çeker.":
    "O site está íntegro. Algumas correções restantes aumentarão a pontuação.",
  "Temel sağlam, ama düzeltilmesi gereken belirgin sorunlar var.":
    "A base é sólida, mas há problemas claros a serem corrigidos.",
  "Orta düzeyde. Kritik ve uyarı sorunları aramadaki performansı gölgeliyor.":
    "Razoável. Problemas críticos e avisos estão freando o desempenho na pesquisa.",
  "Zayıf. Önce kritik sorunlar düzeltilmeli; bunlar sayfaların aramada görünmesini engelleyebilir.":
    "Ruim. Corrija primeiro os problemas críticos; eles podem impedir que as páginas apareçam na pesquisa.",
  'Denetim tamamlanmadığı ya da hiç sayfa taranamadığı için sorun listesi eksik olabilir; bu yüzden "sorun yok" denmiyor.':
    'A auditoria não foi concluída ou nenhuma página pôde ser rastreada, portanto a lista de problemas pode estar incompleta; é por isso que não diz "sem problemas".',
  "Yanıt yok": "Sem resposta",
  İçerik: "Conteúdo",
  "Dizine alma": "Indexação",
  "ve {count} adres daha (boyutu makul tutmak için burada kesildi).": {
    one: "e mais {count} endereço (lista cortada para manter o tamanho do arquivo razoável).",
    other:
      "e mais {count} endereços (lista cortada para manter o tamanho do arquivo razoável).",
  },
  "ve {count} sayfa daha (boyutu makul tutmak için burada kesildi).": {
    one: "e mais {count} página (lista cortada para manter o tamanho do arquivo razoável).",
    other:
      "e mais {count} páginas (lista cortada para manter o tamanho do arquivo razoável).",
  },
  "ve {count} kayıt daha (boyutu makul tutmak için burada kesildi).": {
    one: "e mais {count} registro (lista cortada para manter o tamanho do arquivo razoável).",
    other:
      "e mais {count} registros (lista cortada para manter o tamanho do arquivo razoável).",
  },
  "ve {count} sorun türü daha (boyutu makul tutmak için burada kesildi).": {
    one: "e mais {count} tipo de problema (lista cortada para manter o tamanho do arquivo razoável).",
    other:
      "e mais {count} tipos de problema (lista cortada para manter o tamanho do arquivo razoável).",
  },
  "Puan yok": "Sem pontuação",
  "Site puanı 100 üzerinden {score}": "Pontuação do site: {score} em 100",
  "{host} site denetimi": "Auditoria do site {host}",
  "{host} için {count} sayfa tarandı.": {
    one: "{count} página rastreada em {host}.",
    other: "{count} páginas rastreadas em {host}.",
  },
  "Site puanı {count}/100.": "Pontuação do site {count}/100.",
  "Kayıtlı sorun yok.": "Nenhum problema registrado.",
  "Denetim tamamlanmadığı için sorun listesi eksik olabilir.":
    "A auditoria não foi concluída, portanto a lista de problemas pode estar incompleta.",
  "{count} sorun türü bulundu: {critical} kritik, {warning} uyarı, {info} bilgi.":
    {
      one: "{count} tipo de problema encontrado: críticos {critical}, avisos {warning}, informativos {info}.",
      other:
        "{count} tipos de problema encontrados: críticos {critical}, avisos {warning}, informativos {info}.",
    },
  "En çok sayfayı etkileyen: {title} ({count} sayfa).": {
    one: "Afetando o maior número de páginas: {title} ({count} página).",
    other: "Afetando o maior número de páginas: {title} ({count} páginas).",
  },
  "Site denetim raporu": "Relatório de auditoria do site",
  "seowatcher ile üretildi. Bu dosya kendi kendine yeter: açmak için internet bağlantısı gerekmez. PDF için tarayıcıdan Yazdır seçeneğini kullanın.":
    "Feito com seowatcher. Este arquivo é independente: ele abre sem conexão com a Internet. Para um PDF, use Imprimir no seu navegador.",
  "3. Genel görünüm": "3. Visão geral",
  "4. Sorunlar": "4. Problemas",
  "5. Hız ölçümü": "5. Testes de velocidade",
  "6. Google dizin durumu": "6. Status de indexação no Google",
  "7. Site haritası": "7. Sitemap",
  "8. Yöntem ve sınırlar": "8. Método e limites",
  "Ek A. Kalan etkilenen adresler": "Apêndice A. Endereços afetados restantes",
  "Ek B. Taranan sayfalar": "Apêndice B. Páginas rastreadas",
  K: "C",
  U: "A",
  B: "I",
  "K kritik, U uyarı, B bilgi.": "C crítico, A aviso, I informativo.",
  "Sorun türleri": "Tipos de problemas",
  İçindekiler: "Sumário",
  "Sorun sayısı bilinmiyor.": "O número de problemas é desconhecido.",
  "{severity} sorun türü": "Tipos de problemas de {severity}",
  "Önem derecesine göre sorun türleri": "Tipos de problemas por gravidade",
  tür: "tipos",
  "Önem derecesine göre sorun türü dağılımı":
    "Distribuição dos tipos de problemas por gravidade",
  "Kategoriye göre sorun türleri": "Tipos de problemas por categoria",
  "Kategori ve önem derecesine göre sorun türü sayısı":
    "Número de tipos de problemas por categoria e gravidade",
  "En çok sayfayı etkileyen 10 sorun türü":
    "Os 10 tipos de problemas que afetam mais páginas",
  "Etkilenen sayfa sayısına göre ilk on sorun türü":
    "Dez principais tipos de problemas por páginas afetadas",
  "HTTP durum kodları": "Códigos de status HTTP",
  "Durum kodu dağılımı": "Distribuição do código de status",
  "Tarama derinliği (ana sayfadan kaç tıklama)":
    "Profundidade de rastreamento (cliques a partir da página inicial)",
  "Tarama derinliği dağılımı": "Distribuição da profundidade de rastreamento",
  "Başlık uzunluğu (karakter)": "Comprimento do título (caracteres)",
  "Yaklaşık 30-60 karakter, başlığın arama sonucunda kısaltılmadan görünmesi için bir ölçüttür; Google sabit bir sınır koymaz.":
    "Cerca de 30 a 60 caracteres é uma regra prática para que um título apareça nos resultados da pesquisa sem ser cortado; o Google não define um limite fixo.",
  "Sayfa başlığı uzunluğu dağılımı":
    "Distribuição do comprimento do título da página",
  "Sunucu yanıt süresi": "Tempo de resposta do servidor",
  "Yanıt süresi dağılımı": "Distribuição do tempo de resposta",
  "Dizine girebilir": "Indexável",
  "Site haritasında": "No sitemap",
  "Başlığı yok": "Sem título",
  "Meta açıklaması yok": "Sem meta descrição",
  "%{value}": "{value}%",
  "{count} taranan sayfaya oranla.": {
    one: "Em relação a {count} página rastreada.",
    other: "Em relação a {count} páginas rastreadas.",
  },
  "Sayfa durumu": "Status da página",
  "Sayfa durumu özeti": "Resumo do status da página",
  "Her grafiğin altında aynı veriler yazıyla da verilir.":
    "Os dados de cada gráfico também são apresentados em texto abaixo dele.",
  "tüm site": "site inteiro",
  "Etkilenen: tüm site": "Afetado: todo o site",
  "ve {count} sayfa daha (ayrıntı sorun bölümünde)": {
    one: "e mais {count} página (detalhes na seção de problemas)",
    other: "e mais {count} páginas (detalhes na seção de problemas)",
  },
  "Ne yapılmalı:": "O que fazer:",
  "Neden:": "Por que:",
  "Bu hafta yapılacaklar": "A fazer esta semana",
  "Düzeltilecek kayıtlı sorun yok.":
    "Nenhum problema registrado para correção.",
  "Düzeltilecek sorun listesi eksik olabilir.":
    "A lista de problemas a serem corrigidos pode estar incompleta.",
  "Bu hafta yapılacak {count} şey": {
    one: "{count} coisa para fazer esta semana",
    other: "{count} coisas para fazer esta semana",
  },
  "Sıralama, düzeltildiğinde site puanına en çok puan kazandıranlara göre.":
    "Ordenadas por quantos pontos cada correção adiciona à pontuação do site.",
  Sonrasında: "Depois disso",
  "Denetim hata verip durdu.": "A auditoria foi interrompida com um erro.",
  "Denetim hâlâ çalışıyor.": "A auditoria ainda está em execução.",
  "Hiç sayfa taranamadı.": "Nenhuma página pôde ser rastreada.",
  "{count} sayfa tarandı": {
    one: "{count} página rastreada",
    other: "{count} páginas rastreadas",
  },
  "Rapor eksik olabilir.": "O relatório pode estar incompleto.",
  "{count} sorun türü: {critical} kritik, {warning} uyarı, {info} bilgi.": {
    one: "{count} tipo de problema: críticos {critical}, avisos {warning}, informativos {info}.",
    other:
      "{count} tipos de problema: críticos {critical}, avisos {warning}, informativos {info}.",
  },
  "Taranan sayfa": "Páginas rastreadas",
  "Ortalama yanıt": "Resposta média",
  Dizinde: "Indexado",
  Kısmen: "Parcial",
  Nötr: "Neutro",
  "Bu denetimin sayfaları için Search Console URL Denetleme Aracı sonucu kayıtlı değil, bu yüzden Google'ın hangi sayfaları dizine aldığı rapora girmiyor. Dizin Kapsamı ekranından inceleme çalıştırıldıktan sonra rapor yeniden oluşturulursa bu bölüm dolar.":
    "Não há resultados da Inspeção de URL do Search Console armazenados para as páginas desta auditoria, portanto o relatório não pode dizer quais páginas o Google indexou. Execute uma inspeção na tela Status de indexação e crie o relatório novamente para preencher esta seção.",
  "Kaynak: Search Console URL Denetleme Aracı. Sonuçlar kayıtlıdır, bu rapor Google'a yeni istek atmaz; son inceleme {date}.":
    "Fonte: Inspeção de URL do Search Console. Os resultados ficam armazenados, então este relatório não envia novas solicitações ao Google; última inspeção em {date}.",
  "Kaynak: Search Console URL Denetleme Aracı. Sonuçlar kayıtlıdır, bu rapor Google'a yeni istek atmaz.":
    "Fonte: Inspeção de URL do Search Console. Os resultados ficam armazenados, então este relatório não envia novas solicitações ao Google.",
  "Dizine girebilen {count} sayfadan {checked} tanesi için Google yanıt verdi ({percent}).":
    {
      one: "O Google respondeu para {checked} de {count} página indexável ({percent}).",
      other:
        "O Google respondeu para {checked} de {count} páginas indexáveis ({percent}).",
    },
  "Google dizin durumu dağılımı":
    "Distribuição do status de indexação no Google",
  "Google'ın verdiği durumlar": "Estados informados pelo Google",
  "Kapsam durumu dağılımı": "Distribuição do status de cobertura",
  "Dikkat isteyen sayfalar": "Páginas que precisam de atenção",
  Sonuç: "Resultado",
  "Hata: {error}": "Erro: {error}",
  Aynı: "Igual",
  "Dizinde değil olarak işaretlenen ya da asıl adresi farklı seçilen sayfa yok.":
    "Nenhuma página está marcada como não indexada ou com um canônico diferente selecionado.",
  "Taranan {count} sayfanın {inMap} tanesi ({percent}) site haritasında. Haritanın kendisi (toplam adres sayısı, dosya boyutu) rapora girmez; yalnızca taranan sayfaların harita durumu ve haritayla ilgili bulunan sorunlar gösterilir.":
    {
      one: "{inMap} de {count} página rastreada ({percent}) está no sitemap. O sitemap em si (total de endereços, tamanho do arquivo) não é analisado; são mostrados apenas o status no sitemap das páginas rastreadas e os problemas de sitemap encontrados.",
      other:
        "{inMap} de {count} páginas rastreadas ({percent}) estão no sitemap. O sitemap em si (total de endereços, tamanho do arquivo) não é analisado; são mostrados apenas o status no sitemap das páginas rastreadas e os problemas de sitemap encontrados.",
    },
  "Haritayla ilgili sorun": "Problema no sitemap",
  "Haritayla ilgili kayıtlı sorun yok.":
    "Nenhum problema de sitemap registrado.",
  "Dizine girebilen ama haritada olmayan sayfalar ({count})":
    "Páginas indexáveis ausentes no sitemap ({count})",
  "Etkilenen adres": "Endereço afetado",
  "Tüm siteyi ilgilendiriyor": "Afeta todo o site",
  "Ne demek, neden önemli:": "O que significa e por que é importante:",
  "Nasıl düzeltilir:": "Como corrigir:",
  'Kalan adresler raporun sonundaki <a href="#ek-adresler">Ek A</a> bölümünde.':
    'Os endereços restantes estão no <a href="#ek-adresler">Apêndice A</a> no final do relatório.',
  "Sorun listesi eksik olabilir (denetim tamamlanmadı).":
    "A lista de problemas pode estar incompleta (a auditoria não foi concluída).",
  "{count} tür": {
    one: "{count} tipo",
    other: "{count} tipos",
  },
  "{count} sorun türü": {
    one: "{count} tipo de problema",
    other: "{count} tipos de problema",
  },
  "Önem derecesine, sonra kategoriye, sonra etkilenen sayfa sayısına göre sıralı. Her sorun için en fazla {count} adres yazılır.":
    {
      one: "Ordenados por gravidade, depois categoria e depois páginas afetadas. No máximo {count} endereço é listado por problema.",
      other:
        "Ordenados por gravidade, depois categoria e depois páginas afetadas. No máximo {count} endereços são listados por problema.",
    },
  "{take} / {count} adres": {
    one: "{take} / {count} endereço",
    other: "{take} / {count} endereços",
  },
  "Sorunların altında gösterilen ilk {count} adresin ötesindekiler.": {
    one: "Endereços além do primeiro {count} mostrado em cada problema.",
    other: "Endereços além dos primeiros {count} mostrados em cada problema.",
  },
  "{count} sayfa tarandı, başlangıç adresi {url}.": {
    one: "{count} página rastreada, a partir de {url}.",
    other: "{count} páginas rastreadas, a partir de {url}.",
  },
  "Tarama üst sınırı {count} sayfaydı; sınıra ulaşıldı, yani site bundan büyük olabilir ve görülmeyen sayfalardaki sorunlar rapora girmedi.":
    {
      one: "O limite de rastreamento era de {count} página e foi atingido, portanto o site pode ser maior e os problemas em páginas não visitadas não estão no relatório.",
      other:
        "O limite de rastreamento era de {count} páginas e foi atingido, portanto o site pode ser maior e os problemas em páginas não visitadas não estão no relatório.",
    },
  "Tarama üst sınırı {count} sayfaydı.": {
    one: "O limite de rastreamento era de {count} página.",
    other: "O limite de rastreamento era de {count} páginas.",
  },
  "Hız ölçümü bu denetimde kapalıydı.":
    "A medição de velocidade estava desativada para esta auditoria.",
  "Hiçbir sayfa için hız puanı kaydedilmedi.":
    "Nenhuma pontuação de velocidade foi registrada para nenhuma página.",
  "{count} sayfa Lighthouse ile ölçüldü (laboratuvar verisi, tek sanal cihaz). Ölçülmeyen sayfalar hakkında hız bilgisi yoktur.":
    {
      one: "{count} página foi medida com o Lighthouse (dados de laboratório, um único dispositivo simulado). Não há dados de velocidade para páginas que não foram medidas.",
      other:
        "{count} páginas foram medidas com o Lighthouse (dados de laboratório, um único dispositivo simulado). Não há dados de velocidade para páginas que não foram medidas.",
    },
  "Başlangıç {start}.": "Iniciado em {start}.",
  "Başlangıç {start}, bitiş {end}, süre {duration}.":
    "Iniciado em {start}, concluído em {end}, duração: {duration}.",
  "Başlangıç {start}, bitiş {end}.": "Iniciado em {start}, concluído em {end}.",
  "Rapor o andaki durumu gösterir; site sonradan değişmiş olabilir.":
    "O relatório mostra o site como estava então; pode ter mudado desde então.",
  "Google dizin durumu": "Status de indexação no Google",
  "Search Console URL Denetleme Aracı'nın kayıtlı yanıtları; {count} sayfa için Google yanıt verdi. Rapor Google'a yeni istek atmaz.":
    {
      one: "Respostas armazenadas da Inspeção de URL do Search Console; o Google respondeu para {count} página. O relatório não envia novas solicitações ao Google.",
      other:
        "Respostas armazenadas da Inspeção de URL do Search Console; o Google respondeu para {count} páginas. O relatório não envia novas solicitações ao Google.",
    },
  "Bu denetim için kayıtlı Google yanıtı yok, bölüm boş.":
    "Nenhuma resposta do Google é armazenada para esta auditoria, então a seção está vazia.",
  "Listelerdeki kesintiler": "Cortes nas listas",
  "Dosya boyutunu makul tutmak için her sorunun altında en fazla {issuePages} adres, sayfa tablosunda {pages} sayfa, hız tablosunda {speed} sayfa yazılır; kesilen her listenin altında kaç kaydın dışarıda kaldığı belirtilir. Tam kayıtlar denetim ekranındadır.":
    "Para manter o tamanho do arquivo razoável, cada problema lista no máximo {issuePages} endereços, a tabela de páginas {pages} páginas e a tabela de velocidade {speed} páginas; cada lista cortada informa quantos registros ficaram de fora. Os registros completos estão na tela da auditoria.",
  "Bu raporda ölçülmeyenler": "Não medido neste relatório",
  "Arama sıralaması, tıklama ve trafik: bu rapor Search Console ya da Analytics trafiğini içermez.":
    "Posições na pesquisa, cliques e tráfego: este relatório não inclui o tráfego do Search Console ou do Analytics.",
  "Geri bağlantılar ve rakip siteler.": "Backlinks e sites concorrentes.",
  "İçeriğin kalitesi, arama niyetine uygunluğu ve özgünlüğü; yalnızca kelime sayısı gibi yapısal sinyallere bakılır.":
    "Qualidade do conteúdo, adequação à intenção de pesquisa e originalidade; apenas sinais estruturais, como a contagem de palavras, são verificados.",
  "Gerçek kullanıcı hız verisi (CrUX); yalnızca laboratuvar ölçümü vardır.":
    "Dados de velocidade de usuários reais (CrUX); há apenas medições de laboratório.",
  "Giriş gerektiren sayfalar ve taramanın ulaşamadığı adresler.":
    "Páginas que exigem login e endereços que o rastreamento não conseguiu alcançar.",
  "Kayıtlı sayfa yok.": "Nenhuma página registrada.",
  '{count} sayfa; en çok sorunu olanlar üstte. "Başlık" başlığın karakter sayısıdır.':
    {
      one: '{count} página; aquelas com mais problemas primeiro. "Título" é o comprimento do título em caracteres.',
      other:
        '{count} páginas; aquelas com mais problemas primeiro. "Título" é o comprimento do título em caracteres.',
    },
  "Dizine girer": "Indexável",
  Yanıt: "Resposta",
  "Yönlenir: {url}": "Redireciona para: {url}",
  yok: "nenhum",
  İyi: "Bom",
  Zayıf: "Ruim",
  orta: "médio",
  "Bu metrik ölçülmedi.": "Esta métrica não foi medida.",
  "{metric}: en kötü 5": "{metric}: 5 piores",
  "LCP (en büyük içerik)": "LCP (maior conteúdo)",
  "Sayfanın ana görselinin ya da başlığının ekranda belirmesi ne kadar sürdü. 2,5 saniye altı iyi.":
    "Quanto tempo a imagem principal ou o título da página levou para aparecer na tela. Menos de 2,5 segundos é bom.",
  "CLS (görsel kayma)": "CLS (deslocamento de layout)",
  "Sayfa yüklenirken içerik ne kadar yer değiştirdi; yanlış tıklamaya yol açan kayma. 0,1 altı iyi.":
    "Quanto o conteúdo se deslocou durante o carregamento da página, o tipo de deslocamento que causa cliques errados. Abaixo de 0,1 é bom.",
  "INP (tepki süresi)": "INP (capacidade de resposta)",
  "Bir tıklamaya ya da dokunmaya sayfa ne kadar çabuk karşılık verdi. 200 ms altı iyi.":
    "A rapidez com que a página respondeu a um clique ou toque. Menos de 200 ms é bom.",
  İ: "B",
  O: "M",
  Z: "R",
  "İ iyi, O orta, Z zayıf; her sayfa yalnızca ölçülen metrikte sayılır.":
    "B bom, M médio, R ruim; cada página conta apenas para as métricas medidas nela.",
  "Temel Web Verileri: sayfaların dağılımı (mobil)":
    "Core Web Vitals: distribuição das páginas (dispositivos móveis)",
  "Her metrik için iyi, orta ve zayıf sayfa sayısı":
    "Páginas boas, médias e ruins para cada métrica",
  "Bu denetimde hız ölçümü kapalıydı, bu yüzden sayfa hızı hakkında bir şey söylenmiyor.":
    "A medição de velocidade estava desativada para esta auditoria, portanto, nada é dito sobre a velocidade da página.",
  "Bu denetimde kayıtlı Lighthouse sonucu yok: hız ölçümü kapalıydı ya da ölçümler tamamlanamadı (ör. ölçüm servisi istek sınırına takıldı). Hız ölçülmediği için bu rapor hız hakkında bir şey söylemez.":
    "Esta auditoria não tem resultados do Lighthouse armazenados: a medição de velocidade estava desativada ou as medições não puderam ser concluídas (por exemplo, o serviço de medição atingiu seu limite de solicitações). Como a velocidade não foi medida, este relatório não diz nada sobre isso.",
  "(adres bulunamadı)": "(endereço não encontrado)",
  "İyi (90-100)": "Bom (90-100)",
  "Orta (50-89)": "Médio (50-89)",
  "Zayıf (0-49)": "Ruim (0-49)",
  "{category} (mobil ort.)": "{category} (média em dispositivos móveis)",
  "Mobil puan": "Pontuação em dispositivos móveis",
  "Masaüstü puan": "Pontuação em desktop",
  "Ölçüm hatası: {error}": "Erro de medição: {error}",
  "{count} sayfa mobilde ölçüldü": {
    one: "{count} página medida em dispositivos móveis",
    other: "{count} páginas medidas em dispositivos móveis",
  },
  " (taranan {count} sayfanın {percent}'i)": {
    one: " ({percent} de {count} página rastreada)",
    other: " ({percent} de {count} páginas rastreadas)",
  },
  "; {count} ölçüm hata verdi": {
    one: "; {count} medição falhou",
    other: "; {count} medições falharam",
  },
  '<strong>{measured}</strong>{share}{failed}. Ortalama tek bir sayı "her sayfa orta" ile "yarısı mükemmel yarısı felaket"i aynı gösterdiği için dağılım veriliyor.':
    '<strong>{measured}</strong>{share}{failed}. A distribuição é mostrada porque uma única média faz "todas as páginas são razoáveis" parecer igual a "metade excelente, metade péssima".',
  "{planned} sayfanın ölçülmesi planlandı, {measured} tanesi puan verdi{failed}. Aşağıdaki dağılım yalnızca ölçülen sayfaları yansıtır; ölçülmeyenler iyi ya da kötü sayılmadı.":
    "{planned} páginas estavam previstas para medição e {measured} retornaram uma pontuação{failed}. A distribuição abaixo reflete apenas as páginas medidas; o restante não foi contado nem como bom nem como ruim.",
  "; kalanlar hata verdi ya da ölçüm servisinin istek sınırına takılmış olabilir":
    "; o restante falhou ou pode ter atingido o limite de solicitações do serviço de medição",
  "Ölçüm kısmi.": "Medição parcial.",
  "Mobil performans puanı dağılımı":
    "Distribuição da pontuação de desempenho em dispositivos móveis",
  "Lighthouse performans puanı histogramı":
    "Histograma de pontuação de desempenho do Lighthouse",
  "Puan bandı": "Faixa de pontuação",
  "İyi, orta, zayıf sayfa sayısı": "Contagem de páginas boas, médias e ruins",
  "Lighthouse kategorileri": "Categorias do Lighthouse",
  "Kategori başına mobil ortalama puan":
    "Pontuação média em dispositivos móveis por categoria",
  "Sayfa sayfa sonuçlar": "Resultados por página",
  "Mobil performans puanı en düşük sayfalar üstte. Metrikler mobil ölçümden.":
    "Primeiro as páginas com a menor pontuação de desempenho em dispositivos móveis. As métricas vêm da medição em dispositivos móveis.",
  'Eşikler Google\'ın yayımladığı değerlerdir: LCP 2,5 sn altı iyi, 4 sn üstü zayıf; CLS 0,1 altı iyi, 0,25 üstü zayıf; INP 200 ms altı iyi, 500 ms üstü zayıf. INP laboratuvarda çoğu zaman ölçülemez ("--" görünür).':
    'Os limites são os valores publicados pelo Google: LCP abaixo de 2,5 s é bom e acima de 4 s é ruim; CLS abaixo de 0,1 é bom e acima de 0,25 é ruim; INP abaixo de 200 ms é bom e acima de 500 ms é ruim. O INP muitas vezes não pode ser medido em laboratório (mostra "--").',
  "Her sürümde nelerin eklendiğini ve düzeltildiğini burada bulabilirsiniz.":
    "Veja o que foi adicionado e corrigido em cada versão.",
  Yenilik: "Recurso",
  Düzeltme: "Correção",
  "Acil düzeltme": "Hotfix",
  "Windows açılınca başlat": "Iniciar com o Windows",
  "Windows ayarı kaydedildi": "Preferência do Windows salva",
  "Bu tercihler Windows uygulamasına kaydedilir ve tepsi menüsüyle aynı ayarları kullanır.":
    "Essas preferências são salvas no aplicativo do Windows e compartilhadas com o menu da bandeja.",
  "Windows ayarları okunuyor…": "Lendo as preferências do Windows…",
  "Bu seçenekler Windows paketinde kullanılabilir. Docker veya geliştirici kurulumunda başlangıç davranışını işletim sisteminizden yönetin.":
    "Essas opções estão disponíveis no aplicativo do Windows. Para instalações do Docker ou de desenvolvimento, gerencie a inicialização por meio do sistema operacional.",
  "Bu Windows başlatıcısı uygulama içinden ayar değiştirmeyi desteklemiyor. Windows paketini güncelleyin; bu sırada tepsi menüsündeki seçenekleri kullanabilirsiniz.":
    "Este iniciador do Windows não permite alterar as preferências pelo app. Atualize o pacote do Windows; até lá, use as opções do menu da bandeja.",
  "Windows ayarlarına ulaşılamadı. Tepsi uygulamasının açık olduğunu kontrol edip yeniden deneyin.":
    "As preferências do Windows não estão disponíveis. Verifique se o aplicativo da bandeja está em execução e tente novamente.",
  "Windows oturumu açıldığında arka planda başlar. Kapalıyken uygulamayı kendiniz açarsınız.":
    "Inicia em segundo plano quando você entra no Windows. Quando desativada, você mesmo abre o app.",
  "Bu ayar yönetici tarafından tüm kullanıcılar için açılmış. Yalnızca yönetici kapatabilir.":
    "Um administrador ativou esta opção para todos os usuários. Somente um administrador pode desativá-la.",
  "Otomatik güncelleme kurulumu": "Instalar atualizações automaticamente",
  "Yeni sürümü indirir, doğrular ve kurar. Kapalıyken tepsi menüsünden Güncelle seçeneğiyle kurabilirsiniz.":
    "Baixa, verifica e instala novas versões. Quando desativada, use Atualizar no menu da bandeja para instalá-las.",
  "Tüm kullanıcılar için kurulumda güncellemeyi yönetici kurar. Uygulama yeni sürümü haber verir.":
    "Em instalações para todos os usuários, um administrador instala as atualizações. O app avisa você sobre novas versões.",
  "Tarayıcı sekmesini kapatmak uygulamayı durdurmaz. Tamamen kapatmak için tepsi menüsünden Çıkış deyin. Bilgisayar uyurken denetimler çalışmaz.":
    "Fechar a aba do navegador não interrompe o app. Para fechá-lo completamente, escolha Sair no menu da bandeja. As auditorias não são executadas enquanto o computador está em suspensão.",
  Görünüm: "Aparência",
  "Varsayılan koyu tema seowatcher.io ile aynı görünür. Sistem, işletim sisteminizin tercihini izler. Seçim bu tarayıcıda saklanır.":
    "O tema escuro padrão corresponde a seowatcher.io. A opção Sistema segue a preferência do seu sistema operacional. Sua escolha é salva neste navegador.",
  Tema: "Tema",
  "Tema tercihi": "Preferência de tema",
  Sistem: "Sistema",
  Açık: "Claro",
  Koyu: "Escuro",

  Google: "Google",
  "Hizmet hesabı": "Conta de serviço",
  Sınırlar: "Limites",
  Hakkında: "Sobre",
  "Sürüm notları": "Notas de versão",
  Kayıtlı: "Salvo",
  "Kurulum dosyasından geliyor": "Do arquivo de configuração",
  Kullanılmıyor: "Não usado",
  "Şu an kullanılan: hizmet hesabı": "Em uso: conta de serviço",
  "Şu an kullanılan: Google erişim anahtarı":
    "Em uso: chave de acesso do Google",
  "Şu an kullanılmıyor (hizmet hesabı öncelikli): Google erişim anahtarı":
    "Não em uso (a conta de serviço tem precedência): chave de acesso do Google",
  "Şu an kullanılmıyor (Google erişim anahtarı öncelikli): hizmet hesabı":
    "Não em uso (a chave de acesso do Google tem precedência): conta de serviço",
  "Anahtar kayıtlı": "Chave salva",
  "Anahtar eksik": "Chave ausente",
  "Yeni sürüm {version}": "Nova versão {version}",
  "Kontrol kapalı": "Verificações desativadas",
  Güncel: "Atualizado",
  Denetlenmedi: "Não verificado",
  Okunamadı: "Ilegível",
  "Kimlikte boşluk olamaz.": "O ID do cliente não pode conter espaços.",
  "Kimlik {suffix} ile bitmeli. Gizli anahtarı değil, OAuth client ID'yi yapıştırın.":
    "O ID do cliente deve terminar em {suffix}. Cole o ID do cliente OAuth, não o segredo do cliente.",
  "Anahtarı test et": "Testar chave",

  "Google erişim anahtarı kaydedildi": "Chave de acesso do Google salva",
  "Google erişim anahtarı kaydedilemedi. Değerleri kontrol edip tekrar deneyin.":
    "Não foi possível salvar a chave de acesso do Google. Verifique os valores e tente novamente.",
  "Google erişim anahtarı silindi": "Chave de acesso do Google excluída",
  "Google erişim anahtarı silinemedi. Tekrar deneyin.":
    "Não foi possível excluir a chave de acesso do Google. Tente novamente.",
  "Google bağlantısı": "Conexão com o Google",
  "Uygulama Google'a sizin adınıza bağlanır. Bunun için Google'dan aldığınız erişim anahtarını (OAuth client ID) buraya girin. Gizli kısmı şifrelenir ve bir daha tarayıcıya gönderilmez. Search Console ve Analytics aynı anahtarı kullanır.":
    "O aplicativo se conecta ao Google em seu nome. Para fazer isso, insira aqui a chave de acesso (ID do cliente OAuth) que você obteve do Google. A parte secreta é criptografada e nunca é enviada de volta ao navegador. O Search Console e o Analytics usam a mesma chave.",
  "{console}'da bir OAuth client oluşturun (tür: {type}).":
    "Crie um cliente OAuth em {console} (tipo: {type}).",
  "Şu iki adresi {field} alanına ekleyin.":
    "Adicione esses dois endereços em {field}.",
  "Adresler harfi harfine aynı olmalı, aksi halde Google {code} hatası verir. İkisini de ekleyin: biri Search Console, biri Analytics için.":
    "Os endereços devem corresponder exatamente, ou o Google retornará um erro {code}. Adicione ambos: um é para o Search Console e o outro para o Analytics.",
  "{service} yönlendirme adresi kopyalandı":
    "URI de redirecionamento de {service} copiado",
  "Kimliği ve gizli anahtarı aşağıya yazın.":
    "Insira o ID do cliente e o segredo do cliente abaixo.",
  "Google erişim anahtarının durumu okunamadı.":
    "Não foi possível ler o status da chave de acesso do Google.",
  "Ortam değişkenlerinden geliyor": "Vindo de variáveis de ambiente",
  "{id} ve {secret} ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.":
    "{id} e {secret} estão definidos. Se você salvar um valor aqui, ele será usado no lugar.",
  Değiştir: "Alterar",
  "İstemci kimliği": "ID do cliente",
  "Google Cloud Console'da APIs & Services → Credentials listesinde, OAuth 2.0 Client IDs altında görünür. {suffix} ile biter, gizli değildir.":
    "No Google Cloud Console, em APIs e serviços → Credenciais, na lista IDs do cliente OAuth 2.0. Termina em {suffix} e não é secreto.",
  "Gizli anahtar": "Segredo do cliente",
  "Aynı OAuth client'ı açınca sağdaki panelde. Google bunu yalnızca oluşturduğunuz anda tam gösterir. Kaçırdıysanız yeni bir gizli anahtar üretin. Burada sunucuda şifrelenir, bir daha tarayıcıya gönderilmez.":
    "No painel à direita quando você abre o mesmo cliente OAuth. O Google mostra-o por completo apenas no momento em que você o cria; se você perdeu, adicione um novo segredo. Aqui ele é criptografado no servidor e nunca enviado de volta ao navegador.",
  "Google erişim anahtarı silinsin mi?": "Excluir a chave de acesso do Google?",
  "Kimlik ve gizli anahtar bu kurulumdan silinir. Mevcut Search Console ve Analytics bağlantıları yerinde kalır ama anahtar yeniden girilene kadar çalışmaz.":
    "O ID do cliente e o segredo são removidos desta instalação. As conexões existentes do Search Console e do Analytics permanecem em vigor, mas param de funcionar até que a chave seja inserida novamente.",
  "Anahtarı sil": "Excluir chave",
  "Hizmet hesabı kaydedildi": "Conta de serviço salva",
  "Hizmet hesabı kaydedilemedi. Tekrar deneyin.":
    "Não foi possível salvar a conta de serviço. Tente novamente.",
  "Hizmet hesabı bu kurulumdan silindi. Anahtarı gerçekten iptal etmek için Google Cloud'dan da silin.":
    "A conta de serviço foi removida desta instalação. Para revogar de fato a chave, exclua-a também no Google Cloud.",
  "Hizmet hesabı silinemedi. Tekrar deneyin.":
    "Não foi possível excluir a conta de serviço. Tente novamente.",
  "Hizmet hesabı (daha kısa yol)": "Conta de serviço (o caminho mais rápido)",

  "Hizmet hesapları": "Contas de serviço",
  "Hizmet hesabı durumu okunamadı.":
    "Não foi possível ler o status da conta de serviço.",
  "Bu adresi Search Console'da {path} ile mülkünüze ekleyin (yetki: {level}). Eklemeden veri gelmez. Analytics için de GA4 mülkünde {gaPath}'ne aynı adresi Görüntüleyen olarak ekleyin.":
    "No Search Console, adicione este endereço à sua propriedade em {path} (permissão: {level}). Os dados só chegam depois disso. No Analytics, adicione também o mesmo endereço com o papel de Leitor na propriedade do GA4 em {gaPath}.",
  "Ayarlar → Kullanıcılar ve izinler → Kullanıcı ekle":
    "Configurações → Usuários e permissões → Adicionar usuário",
  Tam: "Completo",
  "Yönetici → Erişim yönetimi": "Administrador → Gerenciamento de acesso",
  "Hizmet hesabı adresi kopyalandı": "Endereço da conta de serviço copiado",
  "Hizmet hesabı dosyası (JSON)": "Arquivo de chave da conta de serviço (JSON)",
  "Anahtar sunucuda şifrelenir ve bir daha tarayıcıya gönderilmez.":
    "A chave é criptografada no servidor e nunca enviada de volta ao navegador.",
  "Hizmet hesabı silinsin mi?": "Excluir a conta de serviço?",
  "JSON anahtarı bu kurulumdan silinir ve Search Console ile Analytics bu hesapla veri çekemez. Anahtarı Google tarafında da iptal etmek için Google Cloud'dan silmeniz gerekir.":
    "A chave JSON é removida desta instalação, e o Search Console e o Analytics não podem mais buscar dados com esta conta. Para revogar a chave também no Google, exclua-a no Google Cloud.",
  "Hesabı sil": "Excluir conta",
  "PageSpeed anahtarı kaydedildi": "Chave do PageSpeed salva",
  "PageSpeed anahtarı kaydedilemedi. Anahtarı kontrol edip tekrar deneyin.":
    "Não foi possível salvar a chave do PageSpeed. Verifique a chave e tente novamente.",
  "PageSpeed anahtarı silindi": "Chave do PageSpeed excluída",
  "PageSpeed anahtarı silinemedi. Tekrar deneyin.":
    "Não foi possível excluir a chave do PageSpeed. Tente novamente.",

  "Anahtar durumu okunamadı.": "Não foi possível ler o status da chave.",
  "Ortam değişkeninden geliyor": "Proveniente de uma variável de ambiente",
  "{name} ayarlanmış. Buraya bir değer kaydederseniz o kullanılır.":
    "{name} está definido. Se você salvar um valor aqui, ele será usado no lugar.",
  "API anahtarı": "Chave de API",
  "Google Cloud Console → Credentials → Create credentials → API key. Önce aynı projede PageSpeed Insights API'sini etkinleştirin, yoksa anahtar 403 hatası verir.":
    "Google Cloud Console → Credenciais → Criar credenciais → Chave de API. Ative primeiro a API PageSpeed Insights no mesmo projeto, ou a chave retornará um erro 403.",
  "PageSpeed anahtarı silinsin mi?": "Excluir a chave do PageSpeed?",

  "GitHub'a ulaşılamadı; son bilinen sürüm {version}":
    "Não foi possível conectar ao GitHub; a última versão conhecida é {version}",
  "En güncel sürümü kullanıyorsunuz": "Você está na versão mais recente",
  "Güncelleme kontrol edilemedi. Birazdan tekrar deneyin.":
    "Não foi possível verificar se há atualizações. Tente novamente daqui a pouco.",
  "Güncelleme kontrolü açıldı": "Verificações de atualização ativadas",
  "Güncelleme kontrolü kapatıldı": "Verificações de atualização desativadas",
  "Ayar kaydedilemedi. Tekrar deneyin.":
    "Não foi possível salvar a configuração. Tente novamente.",
  "Uygulama yeni sürümü fark eder ve ne yapacağınızı söyler. Windows paketi güncellemeyi kendisi kurar, Docker'da verilen komutu siz çalıştırırsınız. Docker'da kontrolü kapatırsanız GitHub'a istek gitmez. Windows paketinde görev çubuğu uygulaması günde bir kez GitHub'a bakar. Kendiliğinden kurup kurmayacağını menüdeki {option} seçeneği belirler.":
    "O app detecta uma nova versão e informa o que fazer. O pacote do Windows instala a atualização sozinho; no Docker, você executa o comando mostrado. No Docker, desativar as verificações significa que nenhuma solicitação é enviada ao GitHub. No pacote do Windows, o app da barra de tarefas verifica o GitHub uma vez por dia, e a opção {option} no menu dele decide se as atualizações são instaladas automaticamente.",
  "Güncellemeleri kendiliğinden kur": "Instalar atualizações automaticamente",
  Sürüm: "Versão",
  "Site ve kılavuz": "Site e guia",
  "{version} yayımlandı.": "A versão {version} foi lançada.",
  Değişiklikler: "O que mudou",
  "Windows paketi güncellemeyi kendisi kurar: görev çubuğundaki seowatcher simgesi yeni sürümü indirir, doğrular ve sessizce kurar. Kendiliğinden kurmayı istemiyorsanız simgeye sağ tıklayıp {option} işaretini kaldırın; o zaman yeni sürüm hazır olunca menüde {item} maddesi çıkar, tıklayınca kurulur. Verileriniz ve Google bağlantınız olduğu gibi kalır.":
    "O próprio pacote do Windows instala a atualização: o ícone do seowatcher na barra de tarefas baixa a nova versão, verifica-a e a instala silenciosamente. Se preferir que não faça isso, clique com o botão direito no ícone e desmarque {option}; então, quando uma nova versão estiver pronta, o item {item} aparece no menu e a instala ao ser clicado. Seus dados e sua conexão com o Google permanecem como estão.",
  "Güncelle: sürüm hazır": "Güncelle: sürüm hazır (Atualizar: versão pronta)",
  "Proje klasöründe çalıştırın. Verileriniz Docker biriminde ({volume}) kalır, güncelleme onu silmez.":
    "Execute-o na pasta do projeto. Seus dados permanecem no volume do Docker ({volume}); a atualização não os exclui.",
  "En güncel sürümü kullanıyorsunuz.": "Você está na versão mais recente.",

  "Son kontrol başarısız oldu: GitHub'a ulaşılamadı. Son bilinen sürüm {version} (son başarılı kontrol: {date}); güncel olup olmadığı doğrulanamadı.":
    "A última verificação falhou: não foi possível conectar ao GitHub. A última versão conhecida é {version} (última verificação bem-sucedida: {date}), por isso não foi possível confirmar se você está atualizado.",
  "Son kontrol başarısız oldu: GitHub'a ulaşılamadı. Son bilinen sürüm {version}; güncel olup olmadığı doğrulanamadı.":
    "A última verificação falhou: não foi possível conectar ao GitHub. A última versão conhecida é {version}, por isso não foi possível confirmar se você está atualizado.",
  "Son kontrolde GitHub'a ulaşılamadı.":
    "Não foi possível acessar o GitHub na última verificação.",

  "Şimdi kontrol et": "Verificar agora",
  "Kontrol açıkken uygulama, bir sekmede açık olduğu sürece en çok altı saatte bir GitHub'a bağlanıp en son sürümü sorar. GitHub bu istekte yalnızca genel IP adresinizi, uygulama adını ve sürümü görür; siteleriniz, Google hesabınız ya da denetimleriniz gönderilmez.":
    "Com a verificação ativada, o aplicativo pergunta ao GitHub qual é a versão mais recente no máximo a cada seis horas, enquanto estiver aberto em uma aba do navegador. O GitHub vê apenas seu endereço IP público, o nome do aplicativo e a versão; seus sites, sua conta do Google e suas auditorias nunca são enviados.",
  "Son kontrol: {date}.": "Última verificação: {date}.",
  "Kurulu sürüm": "Versão instalada",
  "Görev çubuğu menüsünden Günlükleri aç deyip server.log dosyasına bakın; düzelmezse Kurulumu onar.":
    "No menu da barra de tarefas, clique em Günlükleri aç (Abrir registros) e verifique server.log; se isso não ajudar, use Kurulumu onar (Reparar instalação).",
  "Ayrıntı için docker compose logs --tail 50 çıktısına bakın.":
    "Para obter detalhes, verifique a saída do docker compose logs --tail 50.",
  "Search Console ve Analytics kapalı. Uygulamanın şifreleme anahtarı (veri klasöründeki instance-secret dosyası) eksik ya da bozuk. Görev çubuğu menüsünden Kurulumu onar deyin.":
    "O Search Console e o Analytics estão desativados. A chave de criptografia do aplicativo (o arquivo secreto da instância na pasta de dados) está ausente ou danificada. No menu da barra de tarefas, clique em Kurulumu onar (Reparar instalação).",
  "Search Console ve Analytics kapalı. Google bağlantılarını şifreleyen gizli kurulum anahtarı (BETTER_AUTH_SECRET) eksik ya da çok kısa. Uygulama bu anahtarı kendisi üretir; elle kısa bir değer girdiyseniz silin.":
    "Search Console e Analytics estão desativados. A chave de instalação secreta que criptografa as conexões do Google (BETTER_AUTH_SECRET) está ausente ou é muito curta. O próprio aplicativo gera essa chave; se você inseriu um valor curto manualmente, remova-o.",
  "GOOGLE_CLIENT_ID ve GOOGLE_CLIENT_SECRET'ten yalnızca biri tanımlı. İkisi de gerekir. Ya da ikisini de boş bırakıp Google erişim anahtarını Ayarlar'dan girin.":
    "Apenas um entre GOOGLE_CLIENT_ID e GOOGLE_CLIENT_SECRET está definido. Ambos são necessários. Ou deixe ambos em branco e insira a chave de acesso do Google em Configurações.",
  "Google erişim anahtarı ya da hizmet hesabı henüz girilmedi. Girmeden Search Console ve Analytics bağlanamaz.":
    "Nenhuma chave de acesso do Google ou conta de serviço foi inserida ainda. O Search Console e o Analytics não podem se conectar sem uma delas.",
  "Google erişim anahtarı ortam değişkenlerinden geliyor.":
    "A chave de acesso do Google vem de variáveis de ambiente.",

  "Google erişimi hazır.": "O acesso ao Google está pronto.",
  "PageSpeed anahtarı kontrol edilemedi. {logs}":
    "Não foi possível verificar a chave do PageSpeed. {logs}",
  "Anahtar yok. Hız ölçümü Google'ın anahtarsız kotasıyla çalışır ve çoğu zaman 429 ile yarım kalır. Tarama ve diğer SEO kontrolleri etkilenmez.":
    "Sem chave. A medição de velocidade usa a cota sem chave do Google e muitas vezes para no meio com um 429. O rastreamento e as outras verificações de SEO não são afetados.",
  "PageSpeed anahtarı ortam değişkeninden geliyor.":
    "A chave do PageSpeed vem de uma variável de ambiente.",
  "Giriş koruması ayarlı.": "A proteção de login está configurada.",
  "Bu kurulum parolasız ama dışarıdan erişime açık görünüyor; açan herkes yönetici olur. Önüne kendi giriş korumanızı koyun ya da uygulamayı yalnızca bu bilgisayara (127.0.0.1) açık tutun.":
    "Esta instalação não tem senha, mas parece acessível de fora; qualquer pessoa que a abrir é administradora. Proteja-a com seu próprio sistema de login ou deixe o app acessível apenas neste computador (127.0.0.1).",
  "Giriş ayarı eksik ya da geçersiz. Görev çubuğu menüsünden Kurulumu onar deyin; düzelmezse Sorunu bildir.":
    "A configuração de login está ausente ou é inválida. No menu da barra de tarefas, clique em Kurulumu onar (Reparar instalação); se isso não ajudar, use Sorunu bildir (Relatar um problema).",
  "Giriş ayarı eksik ya da geçersiz. AUTH_MODE, TEAM_DOMAIN ve POLICY_AUD değerlerini docs/ENVIRONMENT.md'ye göre kontrol edin.":
    "A configuração de login está ausente ou é inválida. Verifique AUTH_MODE, TEAM_DOMAIN e POLICY_AUD em docs/ENVIRONMENT.md.",
  "Yerel veritabanı yanıt veriyor.": "O banco de dados local está respondendo.",
  "Veritabanı yanıt vermiyor. {logs}":
    "O banco de dados não está respondendo. {logs}",
  "Çalışma ortamı hazır.": "O ambiente de execução está pronto.",
  "Çalışma ortamında bir sorun var. {logs}":
    "Algo está errado com o ambiente de execução. {logs}",
  "Giriş ve erişim": "Login e acesso",
  "Google girişi": "Login no Google",
  "Ayarları aç": "Abrir Configurações",
  "Çalışma ortamı": "Ambiente de execução",
  Veritabanı: "Banco de dados",
  "Sorun yok": "OK",
  Dikkat: "Atenção",
  "Kurulum durumu okunamadı": "Não foi possível ler o status de configuração",
  "Sürümünüz v{version}.": "Você está na v{version}.",
  "Yeni sürüm {version} çıktı": "A versão {version} foi lançada",
  "Sürümünüz v{version}. Güncelleme kontrolü başarısız oldu; son bilinen sürüm {latest}.":
    "Você está na v{version}. A verificação de atualizações falhou; a última versão conhecida é {latest}.",
  "Sürümünüz v{version}, güncel.": "Você está na v{version}, a mais recente.",
  "Sürümünüz v{version}. Güncelleme kontrolü kapalı.":
    "Você está na v{version}. As verificações de atualização estão desativadas.",
  "Kurulumunuzun durumu": "Seu status de configuração",

  "Son kontrol: {date}": "Última verificação: {date}",
  "Özet kopyalandı. İçinde gizli değer yok.":
    "Resumo copiado. Ele não contém segredos.",
  "Henüz proje yok. {link}.": "Ainda não há projetos. {link}.",
  "Proje ekleyin": "Adicionar um projeto",
  "Search Console {gsc} · Analytics {ga4}":
    "Search Console {gsc} · Analytics {ga4}",
  bağlı: "conectado",
  "bağlı değil": "não conectado",
  "Bağlantıları aç": "Abrir conexões",

  "Sık sorunlar": "Problemas comuns",
  "Sayfa açılmıyor ya da uygulama kapalı":
    "A página não abre ou o aplicativo não está em execução",
  "Görev çubuğundaki seowatcher simgesine bakın; üzerine gelince {running} yazmalı. Simge yoksa Başlat menüsünden seowatcher'ı açın. Simgede {error} yazıyorsa sağ tıklayıp {restart}, olmazsa {repair} deyin.":
    "Observe o ícone do seowatcher na barra de tarefas; ao passar o mouse sobre ele, deve aparecer {running} (Em execução). Se não houver ícone, abra o seowatcher no menu Iniciar. Se o ícone disser {error} (Erro), clique nele com o botão direito e escolha {restart} (Reiniciar) ou, se isso não ajudar, {repair} (Reparar instalação).",
  "Hâlâ açılmıyorsa {logs} ile {launcher} ve {server} dosyalarının son satırlarına bakın; {report} bunları hazır bir kayda koyar.":
    "Se ainda assim não abrir, escolha {logs} (Abrir registros) e verifique as últimas linhas de {launcher} e {server}; {report} (Relatar um problema) coloca essas linhas em um relatório de problema pronto.",
  "Windows kurulum kılavuzu": "Guia de instalação do Windows",
  "Sayfa açılmıyor ya da Docker kapalı":
    "A página não abre ou o Docker não está em execução",
  "Önce Docker Desktop'ın çalıştığına bakın; Windows'ta tepsideki simge \"running\" demeli. Sonra durumu görün: {command} Durum {healthy} olana kadar bekleyin; ilk açılış birkaç dakika sürebilir.":
    'Primeiro verifique se o Docker Desktop está em execução; no Windows, o ícone da bandeja deve dizer "em execução". Em seguida, verifique o status: {command} Aguarde até que o status seja {healthy}; a primeira inicialização pode levar alguns minutos.',
  "Hâlâ açılmıyorsa son günlük satırları nedeni yazar: {command}":
    "Se ainda assim não abrir, as últimas linhas de log fornecem o motivo: {command}",
  "Docker kurulum belgesi": "Guia de instalação do Docker",
  "Adres numarası (port) dolu": "A porta está em uso",
  "Adres numarası (port) dolu (Bind for 127.0.0.1:3001 failed)":
    "A porta está em uso (falha ao conectar a 127.0.0.1:3001)",
  "Windows paketi 3001 doluysa o açılış için 3002 ile 3010 arasında boş bir numara kullanır; bunu bir bildirimle ve simgenin yazısında söyler. Numarayı kalıcı yapmak istiyorsanız {dataFolder} deyip {config} içindeki {port} değerini değiştirin, sonra {restart} deyin.":
    "Se a 3001 estiver em uso, o pacote do Windows escolhe uma porta livre entre 3002 e 3010 para essa inicialização e informa isso em uma notificação e no texto do ícone. Para tornar a porta permanente, escolha {dataFolder} (Abrir pasta de dados), altere o valor {port} em {config} e escolha {restart} (Reiniciar).",
  "3001 numaralı adresi (port) başka bir program kullanıyor. Proje klasöründe {line} satırı olan bir {env} dosyası oluşturup konteyneri yeniden oluşturun: {command}":
    "Outro programa está usando a porta 3001. Na pasta do projeto, crie um arquivo {env} com a linha {line} e, em seguida, recrie o contêiner: {command}",
  "Adres numarası (port) değişince Google'a verdiğiniz yönlendirme adresleri de değişir. Yenilerini {link} kopyalayıp Google Cloud Console'da güncelleyin.":
    "Quando a porta muda, mudam também os URIs de redirecionamento que você informou ao Google. Copie os novos em {link} e atualize-os no Google Cloud Console.",
  "Ayarlar'daki Google bölümünden": "a seção Google em Configurações",
  "Ajanım bağlanamıyor (401)": "Meu agente não consegue se conectar (401)",
  "Ajan bağlantısı bir parola (token) ister. Windows paketinde bu parola {path} dosyasındadır ({dataFolder}). Panoya kopyalamak için PowerShell (değer ekrana yazılmaz): {command} Değeri sohbete yazmayın; yapıştırdıktan sonra panoyu temizleyin (Win+V, Tümünü temizle).":
    "A conexão do agente pede uma senha (token). No pacote do Windows, ela está no arquivo {path} ({dataFolder}, Abrir pasta de dados). Para copiá-la para a área de transferência com o PowerShell (o valor não é mostrado na tela): {command} Não digite o valor em um chat; limpe a área de transferência depois de colá-la (Win+V, Limpar tudo).",
  "Ajan bağlantısı varsayılan olarak bir parola ister. Parola ilk açılışta üretilir ve veri biriminde durur; okumak için (PowerShell ve cmd): {command}":
    "Por padrão, a conexão do agente pede uma senha. Ela é gerada na primeira inicialização e mantida no volume de dados; para lê-la (PowerShell e cmd): {command}",
  "Git Bash (Windows): {command} Önek olmadan Git Bash yolu bozar ve parola boş çıkar; PowerShell'de önek hata verir.":
    "Git Bash (Windows): {command} Sem o prefixo, o Git Bash confunde o caminho e a senha sai vazia; no PowerShell, o prefixo causa um erro.",
  "Adres: {command} Aracınız {header} başlığını göndermezse bağlantı 401 döner.":
    "Endereço: {command} Se sua ferramenta não enviar o cabeçalho {header}, a conexão retornará 401.",
  "{link} aracınız için hazır komutu verir. {details}":
    "{link} fornece um comando pronto para sua ferramenta. {details}",
  "Ajan kurulumu sayfası": "A página de configuração do agente",
  "Hız ölçümü yarım kalıyor (429)":
    "A medição de velocidade para no meio (429)",
  "{code} genellikle anahtar girilmediğini gösterir: Google'ın anahtarsız kotası birkaç sayfada dolar. Ücretsiz bir anahtar girin: {link}.":
    "{code} geralmente significa que nenhuma chave foi inserida: a cota sem chave do Google se esgota em poucas páginas. Insira uma chave gratuita: {link}.",
  '429 / "çok fazla istek"': '429 / "muitas solicitações"',
  "Ayarlar, Hız ölçümü": "Configurações, Testes de velocidade",
  "Anahtar varken de olabilir: dakikalık sınır aşılırsa denetim bekleyip yeniden dener. {daily} dolarsa ölçülenler korunur ve ölçüm durur; ertesi gün yeniden denetleyin. Kendi kotanızı Google Cloud Console'da APIs & Services, PageSpeed Insights API, Quotas altında görebilirsiniz.":
    "Isso também pode acontecer com uma chave: se o limite por minuto for excedido, a auditoria aguarda e tenta novamente. Se o {daily} se esgotar, o que já foi medido é mantido e a medição para; execute a auditoria novamente no dia seguinte. Você pode ver sua cota no Google Cloud Console, em APIs e serviços, API PageSpeed Insights, Cotas.",
  "Günlük sınır": "limite diário",
  "PageSpeed anahtarı belgesi": "Guia da chave do PageSpeed",
  "Sorgu verisi yok, grafikler boş": "Nenhum dado de consulta, gráficos vazios",
  "Önce projede Search Console'un bağlı olduğunu ve bir mülk seçildiğini doğrulayın. Hizmet hesabı kullanıyorsanız hesabın e-postasını Search Console'da mülke kullanıcı olarak eklemiş olmanız gerekir; eklemeden veri gelmez.":
    "Primeiro, verifique se o Search Console está conectado ao projeto e se uma propriedade está selecionada. Se você usa uma conta de serviço, o endereço de e-mail dela precisa ser adicionado como usuário na propriedade no Search Console; nenhum dado chega enquanto isso não for feito.",
  "Mülk yeni doğrulandıysa Google'ın veri vermesi birkaç gün sürebilir.":
    "Se a propriedade tiver sido verificada recentemente, o Google poderá levar alguns dias para fornecer os dados.",
  "Projenin bağlantılarını aç": "Abrir as conexões do projeto",
  "Projelere git": "Ir para projetos",
  "Search Console belgesi": "Guia do Search Console",
  "seowatcher-tanilama-{date}.zip": "seowatcher-diagnostico-{date}.zip",
  "Tanılama paketi indirildi": "Pacote de diagnóstico baixado",
  "Paket oluşturulamadı": "Não foi possível criar o pacote",
  "seowatcher tanılama paketi\nOluşturulma: {generatedAt}\n\nİçindekiler\n  summary.txt        Tek sayfalık özet.\n  diagnostics.json   Sürüm, kurulum kontrolleri, tablo satır sayıları,\n                     projeler, bağlı Google mülkleri ve son 25 denetim.\n  client-log.json    Bu sekmede yakalanan tarayıcı hataları.\n  browser.json       Tarayıcı ve ekran bilgisi.\n\nİçinde OLMAYAN şeyler\n  Gizli değer yok: Google erişim ve yenileme anahtarları, Google erişim\n  anahtarının gizli kısmı, PageSpeed API anahtarı, ajan parolası (MCP token)\n  ve oturum çerezleri toplanmaz. Yalnızca her birinin ayarlı olup olmadığı yazar.\n  Taranan sayfaların içeriği de yok, yalnızca sayıları var.\n\nİçinde OLAN, sizi tanımlayan şeyler\n  Proje adlarınız, alan adlarınız, bağlı Search Console mülkünüz ve GA4\n  mülk kimliğiniz. Bunlar olmadan bir sorun teşhis edilemez. Göndermeden\n  önce dosyaları açıp okuyun; karar sizin.\n":
    "Pacote de diagnóstico do seowatcher\nCriado: {generatedAt}\n\nConteúdo\n  summary.txt        Um resumo de uma página.\n  diagnostics.json   Versão, verificações de configuração, contagem de linhas das tabelas,\n                     projetos, propriedades do Google conectadas e as últimas 25 auditorias.\n  client-log.json    Erros do navegador detectados nesta aba.\n  browser.json       Detalhes do navegador e da tela.\n\nO que NÃO está incluído\n  Nenhum segredo: os tokens de acesso e de atualização do Google, o segredo da\n  chave de acesso do Google, a chave da API do PageSpeed, a senha do agente (token MCP)\n  e os cookies de sessão não são coletados. Só é anotado se cada um está definido.\n  O conteúdo das páginas rastreadas também não é incluído, apenas a contagem delas.\n\nO que ESTÁ incluído e identifica você\n  Os nomes dos seus projetos, os domínios, a propriedade conectada do Search Console e o ID\n  da propriedade do GA4. Sem eles não é possível diagnosticar um problema. Abra e leia os\n  arquivos antes de enviá-los; a decisão é sua.\n",
  "{pages} sayfa  {issues} bulgu": "{pages} páginas  {issues} problemas",
  "Oluşturulma: {date}": "Criado: {date}",
  "Kurulum kontrolleri": "Verificações de configuração",
  "hepsi ok": "tudo ok",
  Tablolar: "Tabelas",
  "Projeler: {n}": "Projetos: {n}",
  "Search Console bağlantısı: {n}": "Conexões do Search Console: {n}",
  "Analytics bağlantısı: {n}": "Conexões do Analytics: {n}",
  "Son denetimler": "Auditorias recentes",
  "Tarayıcıda yakalanan hata: {n}": "Erros detectados no navegador: {n}",
  "Hızlı işlemler": "Ações rápidas",
  "Durumu yeniden kontrol et": "Verificar o status novamente",
  "(yeni sekmede açılır)": "(abre em uma nova aba)",
  "Becerileri /seo-audit diye çağırırsınız.":
    "As skills são chamadas como /seo-audit.",
  "Komut, Codex'in kendi bağlama adımlarını kullanır. Becerileri $seo-audit diye çağırırsınız.":
    "O comando usa as etapas de conexão do próprio Codex. As skills são chamadas como $seo-audit.",
  "Genel komut. Beceriyi aracınızın kendi yöntemiyle çağırın.":
    "Um comando genérico. Chame a skill do jeito que sua ferramenta faz.",
  "Uygulama kurulu, Google ve PageSpeed hazırsa yalnızca bu adım yeter.":
    "Se o app estiver instalado e o Google e o PageSpeed estiverem prontos, esta etapa é tudo de que você precisa.",
  "Komutu ajanınıza yapıştırın. Ajan seowatcher'ı bağlar, SEO becerilerini kurar, elle yapacağınız adımlarda size yol gösterir.":
    "Cole o comando no seu agente. Ele conecta o seowatcher, instala as skills de SEO e orienta você nas etapas que precisam ser feitas manualmente.",
  "Hangi ajanı kullanıyorsunuz?": "Qual agente você usa?",
  "Ajan bağlantıyı kurar, becerileri kopyalar ve doğrular. Parolayı sohbete yazmaz, bilgisayarınızdan okur.":
    "O agente configura a conexão, copia as skills e as verifica. Ele lê a senha do seu computador em vez de escrevê-la no chat.",
  "Kurulum komutunu kopyala": "Copiar comando de configuração",
  "Kurulum komutu kopyalandı": "Comando de configuração copiado",
  "Bağlandıktan sonra ajanınızdan {skill} becerisini kullanmasını isteyin; sıradaki adımı birlikte seçersiniz.":
    "Depois de conectar, peça ao seu agente para usar a skill {skill}; vocês escolherão juntos o próximo passo.",
  "Ajanınız seowatcher'a ilk kez istek attığında yukarıdaki durum değişir.":
    "O status acima muda na primeira vez que seu agente envia uma solicitação ao seowatcher.",
  "Claude Code, Codex, Cursor, ChatGPT ve MCP destekleyen diğer uygulamalarla çalışır.":
    "Funciona com Claude Code, Codex, Cursor, ChatGPT e outros aplicativos que suportam MCP.",
  "İlk kez mi kuruyorsunuz? Buradan başlayın.":
    "Configurando pela primeira vez? Comece aqui.",
  "Sıfırdan kurulum": "Nova instalação",
  "Uygulamayı yeni kurduysanız ilk adım bu.":
    "Se você acabou de instalar o aplicativo, esta é a primeira etapa.",
  "Yeni bir kurulum ya da baştan kontrol için.":
    "Para uma nova instalação ou uma verificação completa desde o início.",
  "Ajanınız kurulumu, Google bağlantısını, PageSpeed anahtarını ve ilk projenizi sırayla kontrol eder, sonra kendini bağlar. Windows paketini de Docker'ı da tanır. Google Cloud'daki adımları siz yaparsınız. Anahtarlar sohbete değil, yalnızca Ayarlar'a girilir.":
    "Seu agente verifica, uma de cada vez, a instalação, a conexão com o Google, a chave do PageSpeed e seu primeiro projeto e, em seguida, se conecta. Ele conhece tanto o pacote do Windows quanto o Docker. As etapas do Google Cloud você mesmo executa. As chaves são inseridas apenas em Configurações, nunca no chat.",
  "Sıfırdan kurulum komutunu kopyala": "Copiar comando de nova instalação",
  Yeterli: "Resta o suficiente",
  Azalıyor: "Está acabando",
  "Neredeyse doldu": "Quase esgotado",
  "{count} sorgu": {
    one: "{count} consulta",
    other: "{count} consultas",
  },
  "{count} ölçüm": {
    one: "{count} medição",
    other: "{count} medições",
  },
  "{count} puan": {
    one: "{count} ponto",
    other: "{count} pontos",
  },
  "{count} rapor": {
    one: "{count} relatório",
    other: "{count} relatórios",
  },
  "Kalan: {amount}": "Restante: {amount}",
  "Veri yok": "Sem dados",
  "Sınır: {amount}": "Limite: {amount}",
  "{amount} kaldı": "{amount} restantes",
  "Durum: {state}": "Status: {state}",
  "Son güncelleme: {date}": "Última atualização: {date}",
  "Henüz veri yok": "Ainda não há dados",
  "Sabit sınır": "Limite fixo",
  "Kaynak: {source}. {freshness}": "Fonte: {source}. {freshness}",
  "Kota ve sınırlar": "Cotas e limites",
  "Kota bilgisi yüklenemedi": "Não foi possível carregar informações de cota",
  "Gösterilecek sınır yok": "Não há limites para mostrar",
  "Bu bölümde izlenen bir kota yok.": "Nenhuma cota é rastreada nesta seção.",
  "Google ve sistem sınırları": "Limites do Google e do sistema",
  "Search Console, GA4 ve PageSpeed'in günlük sınırları, bir de denetim ve rapor üst sınırları. Rakamlar uygulamanın kendi kaydından gelir, Google'a ek istek gitmez. Sınırlar proje başına gösterilir.":
    "Os limites diários do Search Console, GA4 e PageSpeed, além dos limites para auditorias e relatórios. Os números vêm dos próprios registros do aplicativo, portanto, nenhuma solicitação extra vai ao Google. Os limites são mostrados por projeto.",
  "Projeler okunamadı": "Não foi possível ler os projetos",
  "Henüz bir proje yok": "Nenhum projeto ainda",
  "Sınırlar proje başına gösterilir. Proje listesi yüklenince burada görünür.":
    "Os limites são mostrados por projeto. Eles aparecem aqui assim que a lista de projetos é carregada.",
  "Sınırlar proje başına gösterilir. Bir proje oluşturunca burada görünür.":
    "Os limites são mostrados por projeto. Eles aparecem aqui quando você cria um projeto.",
  "Sınırları göster": "Mostrar limites",
  "Bu ekranın kılavuzunu aç": "Abrir o guia desta tela",
  Yükleniyor: "Carregando",
  "Geçen süre: {duration}": "Tempo decorrido: {duration}",
  "Rapor hazır": "Relatório pronto",
  "Google'dan yanıt bekleniyor…": "Aguardando o Google…",
  "Bildirimler ({count} okunmamış)": "Notificações ({count} não lidas)",
  Bildirimler: "Notificações",
  "Tümünü okundu işaretle": "Marcar tudo como lido",
  "Henüz bildirim yok. İşlemler tamamlandığında burada görünür.":
    "Ainda não há notificações. As tarefas concluídas aparecerão aqui.",
  Okunmamış: "Não lidas",
  "Bildirim sesi": "Som das notificações",
  "Sesi dinle": "Ouvir som",
  "Yeni sürüm yayımlandı: {version}": "Nova versão lançada: {version}",
  "Ayarlar'daki Hakkında bölümü nasıl güncelleyeceğinizi söyler.":
    "Consulte Configurações → Sobre para obter instruções de atualização.",
  "{service} bağlantısı yenilenmeli": "Reconectar {service}",
  "Google erişim izni geçersiz ya da geri alınmış. Hesabı yeniden bağlayın.":
    "O acesso ao Google expirou ou foi revogado. Reconecte sua conta.",
  "Denetim bitti: {pages} sayfa, {issues} bulgu":
    "Auditoria concluída: {pages} páginas, {issues} problemas",
  "Denetim tamamlanamadı": "A auditoria falhou",
  "Kontrol ediliyor…": "Verificando…",
  "Rapor kaydedildi ancak indirilemedi. Raporlar ekranından tekrar deneyin.":
    "O relatório foi salvo, mas não pôde ser baixado. Tente novamente em Relatórios.",
  Denetim: "Auditoria",
  "{start} – {end}. Search Console verisi {count} gün geriden gelir, bu yüzden son gün bugün olmaz.":
    {
      one: "{start} – {end}. Os dados do Search Console têm um atraso de {count} dia, por isso o último dia nunca é hoje.",
      other:
        "{start} – {end}. Os dados do Search Console têm um atraso de {count} dias, por isso o último dia nunca é hoje.",
    },
  "TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı":
    "TEAM_DOMAIN precisa ser um endereço https completo, como https://your-team.cloudflareaccess.com",
  'TEAM_DOMAIN, https://ekibiniz.cloudflareaccess.com gibi tam bir https adresi olmalı — "{value}" değerinin başına https:// ekleyin':
    'TEAM_DOMAIN precisa ser um endereço https completo, como https://your-team.cloudflareaccess.com — adicione https:// no início de "{value}"',
  "Site haritasında var, dizine alındı": "Enviado e indexado",
  "Dizine alındı, site haritasında yok": "Indexado, não enviado no sitemap",
  "Dizine alındı, site haritasına eklemeyi düşünün":
    "Indexado; considere adicioná-lo a um sitemap",
  "Tarandı, şu an dizine alınmadı": "Rastreado, atualmente não indexado",
  "Keşfedildi, henüz taranmadı": "Descoberto, atualmente não indexado",
  "Yinelenen içerik, canonical belirtilmemiş":
    "Duplicado sem canonical selecionado pelo usuário",
  "Yinelenen içerik, Google başka bir canonical seçti":
    "Duplicado: o Google escolheu outro canonical",
  "Yinelenen içerik, gönderilen adres canonical seçilmedi":
    "Duplicado: o URL enviado não foi selecionado como canonical",
  "Alternatif sayfa, canonical doğru":
    "Página alternativa com a tag canonical correta",
  "'noindex' etiketiyle dışlandı": "Excluído pela tag 'noindex'",
  "401 nedeniyle engellendi":
    "Bloqueado devido a uma solicitação não autorizada (401)",
  "403 nedeniyle engellendi": "Bloqueado devido a acesso proibido (403)",
  "Bulunamadı (404)": "Não encontrado (404)",
  "Yumuşak 404": "Soft 404",
  "Yönlendirme yapan sayfa": "Página com redirecionamento",
  "Google bu adresi bilmiyor": "URL desconhecido para o Google",
  "Giriş sayfaları": "Páginas de destino",
  "Ziyaretin başladığı sayfalar: oturum, etkileşim, dönüşüm.":
    "Páginas onde as visitas começam: sessões, engajamento e conversões.",
  "Sayfa performansı": "Páginas e telas",
  "Görüntülenme ve sayfada geçirilen süre.":
    "Visualizações e tempo passado na página.",
  "Trafik kaynakları": "Aquisição de tráfego",
  "Ziyaretçiler nereden geliyor.": "De onde vêm os visitantes.",
  "Anahtar olaylar": "Eventos principais",
  "Dönüşüm saydığınız olaylar ve kaç kişi tetikledi.":
    "Os eventos que você conta como conversões e quantas pessoas os acionaram.",
  "E-ticaret": "E-commerce",
  "Ürün ve gelir; mülkte e-ticaret ölçümü varsa dolar.":
    "Itens e receita; os dados aparecem quando a propriedade mede e-commerce.",
  "Site içi arama": "Pesquisa no site",
  "Ziyaretçilerin sitenizde ne aradığı.":
    "O que os visitantes procuram no seu site.",
  "Kitle dağılımı": "Público",
  "Cihaz, ülke, yeni ve geri dönen ziyaretçi.":
    "Dispositivo, país, visitantes novos e recorrentes.",
  "Ana makine adı": "Nome do host",
  "Giriş sayfası": "Página de destino",
  Olay: "Nome do evento",
  Kanal: "Canal",
  Kaynak: "Origem",
  Ortam: "Meio",
  "Kaynak / ortam": "Origem / meio",
  Kampanya: "Campanha",
  "Yeni / geri dönen": "Novos / recorrentes",
  Ürün: "Item",
  "Ürün kodu": "ID do item",
  "Arama terimi": "Termo de pesquisa",
  Kullanıcı: "Usuários",
  "Etkileşimli oturum": "Sessões engajadas",
  "Olay oranı": "Taxa de eventos principais",
  "Satın alma işlemleri": "Transações",
  Gelir: "Receita",
  Görüntülenme: "Visualizações",
  "Etkileşim süresi": "Tempo de engajamento",
  "Ürün görüntüleme": "Itens visualizados",
  "Sepete eklenen ürün": "Itens adicionados ao carrinho",
  "Arama sayısı": "Pesquisas",
  "Başarısız denetimler, hangi aşamada durduğunu ve URL/kimlik bilgileri ayıklanmış hata açıklamasını içerir. PageSpeed ölçüm hataları URL'ler çıkarılarak özetlenir.":
    "As auditorias com falha indicam a fase em que pararam e um resumo do erro sem dados sensíveis. Os erros de medição do PageSpeed são resumidos sem os URLs das páginas.",
  "PageSpeed ölçüm hatası ({count}): {message}":
    "Erro de medição do PageSpeed ({count}): {message}",
  İndirildi: "Baixado",
  "{count} sayfa soruluyor": "Consultando o Google sobre {count} páginas",
  "{pages} sayfa tarandı, {issues} bulgu":
    "{pages} páginas rastreadas, {issues} problemas",
} as const;
