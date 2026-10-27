import type { Catalog } from "@/shared/i18n";

/** Additional app-wide labels. */
export const ptAppSupplemental: Catalog = {
  "{service} yönlendirme adresini kopyala":
    "Copiar endereço de redirecionamento de {service}",
  "Mülk izinlerini ayarla": "Configurar permissões da propriedade",
  "JSON dosyası çok büyük. Google Cloud'dan indirdiğiniz hizmet hesabı anahtarını seçin.":
    "O arquivo JSON é muito grande. Selecione a chave da conta de serviço baixada do Google Cloud.",
  "Dosya okunamadı. Dosyayı yeniden seçin.":
    "Não foi possível ler o arquivo. Selecione o arquivo novamente.",
  "JSON içeriğini gizli yapıştır": "Colar conteúdo JSON de forma oculta",
  "Hizmet hesabı kurulum adımları":
    "Etapas de configuração da conta de serviço",
  "Yukarıdaki Google erişim anahtarı yerine bunu kullanabilirsiniz. Hizmet hesabında izin ekranı, test kullanıcısı ve yönlendirme adresi adımları yok. Google Cloud'da hesabı açıp JSON dosyasını indirin ve burada seçin, sonra hesabın e-posta adresini Search Console'da mülkünüze, bir meslektaşınızı eklermiş gibi kullanıcı olarak ekleyin.":
    "Você pode usar esta opção no lugar da chave de acesso do Google acima. A conta de serviço não exige tela de consentimento, usuário de teste nem endereço de redirecionamento. Crie a conta no Google Cloud, baixe o arquivo JSON e selecione-o aqui. Depois adicione o e-mail da conta como usuário à sua propriedade no Search Console, como faria com um colega.",
  "Anahtarsız ölçüm sınırlıdır; bu uygulama denetim başına en fazla {count} sayfayı dener. Google daha önce sınır koyabilir. Anahtar başarı garantisi vermez.":
    "A medição sem chave é limitada; este app tenta no máximo {count} páginas por auditoria. O Google pode impor um limite antes. A chave não garante o sucesso.",
  "Anahtar bu kurulumdan silinir; hız ölçümü denetim başına uygulamanın anahtarsız sayfa sınırına döner. Google daha erken sınır koyabilir. İstediğiniz zaman yeniden girebilirsiniz.":
    "A chave será excluída desta instalação; a medição de velocidade voltará ao limite de páginas sem chave por auditoria do app. O Google pode impor um limite antes. Você pode inseri-la novamente a qualquer momento.",
  "example.com için 1 mobil istek; denetim ölçüm sayacına eklenmez.":
    "1 solicitação para dispositivos móveis em example.com; não é adicionada ao contador de medições da auditoria.",
  "Test tarihi: {date}": "Data do teste: {date}",
  "Diğer ayar bölümleri için yana kaydırın.":
    "Role para o lado para ver as outras seções de configurações.",
  "Dili uygula": "Aplicar idioma",
  "Arayüz dili bu tarayıcıda saklanır; projenin varsayılan pazar dilini değiştirmez.":
    "O idioma da interface é salvo neste navegador; não altera o idioma do mercado padrão do projeto.",
  "GitHub istek sınırı veya erişim kısıtı bildirdi. Bir süre bekleyip tekrar deneyin; Yardım tanılamasını kontrol edin.":
    "O GitHub informou um limite de solicitações ou uma restrição de acesso. Aguarde e tente novamente; confira o diagnóstico em Ajuda.",
  "GitHub sürüm bilgisi okunamadı. Biraz bekleyip yeniden deneyin; sürerse Yardım ekranından tanılama alın.":
    "Não foi possível ler as informações de versão do GitHub. Aguarde e tente novamente; se o problema persistir, obtenha o diagnóstico na tela Ajuda.",
  "Uygulama içi sürüm kontrolü kapalı. Windows tepsisi bağımsız olarak günlük sürüm kontrolü yapabilir.":
    "A verificação de versão no app está desativada. O ícone na bandeja do Windows pode verificar as versões diariamente de forma independente.",
  "Sürüm kontrolü ayarı okunamadı. Son kayıt güncel olmayabilir.":
    "Não foi possível ler a configuração de verificação de versão. O último registro pode estar desatualizado.",
  "Son başarılı sürüm kontrolü: {date}":
    "Última verificação de versão bem-sucedida: {date}",
  "Windows otomatik kurulum ayarları":
    "Configurações de instalação automática do Windows",
  "Uygulama içi sürüm kontrolü": "Verificação de versão no app",
  "Açıkken uygulama içi kontrol en çok altı saatte bir GitHub sürüm listesine bakar. Bu tercih Windows tepsisinin günlük kontrolünü ve otomatik kurulum tercihini değiştirmez.":
    "Quando ativada, a verificação no app consulta a lista de versões do GitHub no máximo uma vez a cada seis horas. Esta preferência não altera a verificação diária da bandeja do Windows nem a preferência de instalação automática.",
  "Bu pakette sürüm notu bulunmuyor.":
    "Este pacote não contém notas de versão.",
  "Notlar uygulama paketiyle birlikte gelir. Yayınlanan notları kılavuzdan kontrol edebilirsiniz; bu durum kurulum kontrolü değildir.":
    "As notas acompanham o pacote do app. Você pode consultar as notas publicadas no guia; este status não é uma verificação da instalação.",
  "Bu kurulu sürüm için sürüm notu bulunmuyor. Aşağıda bu paketle gelen son notlar var.":
    "Não há notas de versão para esta versão instalada. Abaixo estão as notas mais recentes incluídas neste pacote.",
  "Son doğrulanan Windows ayarları gösteriliyor; yeniden okunana kadar değiştirilemez.":
    "As últimas configurações verificadas do Windows são exibidas; elas não podem ser alteradas até serem lidas novamente.",
  "Google bağlantı ayarı henüz doğrulanamadı. Okuma tamamlanmazsa durumu yeniden kontrol edin.":
    "A configuração da conexão com o Google ainda não foi verificada. Se a leitura não for concluída, verifique o status novamente.",
  "Kurulum türü henüz doğrulanamadı. Üstteki durumu kontrol edin ve gerekirse yeniden deneyin.":
    "O tipo de instalação ainda não foi verificado. Confira o status acima e tente novamente, se necessário.",
  "Sürümünüz v{version}. Güncelleme kontrolü başarısız oldu; yeni sürüm olup olmadığı doğrulanamadı. Ayarlar'daki güncelleme bölümünden yeniden deneyin.":
    "Sua versão é v{version}. A verificação de atualização falhou; não foi possível confirmar se há uma nova versão. Tente novamente na seção de atualização em Configurações.",
  "Kurulum kontrolü sonucu alınamadı. Durumu yeniden kontrol edin.":
    "Não foi possível obter o resultado da verificação da instalação. Verifique o status novamente.",
  "Kurulum kontrollerinde sorun bulunmadı.":
    "As verificações da instalação não encontraram problemas.",
  "{count} kurulum kontrolü dikkat istiyor.":
    "{count} verificações da instalação precisam de atenção.",
  "Ajan araçları bu kurulumdaki projelere erişir. Son çağrı geçmiş kullanım kaydıdır; sürekli çevrimiçi bağlantı anlamına gelmez.":
    "As ferramentas do agente acessam os projetos desta instalação. A última chamada é um registro de uso passado; não indica uma conexão sempre ativa.",
  "Durumu yeniden oku": "Ler status novamente",
  "Bağlantıyı doğrula": "Verificar conexão",
  "Durum okunamadı. Yeniden deneyin; bağlantının başarısız olduğu sonucuna varılamaz.":
    "Não foi possível ler o status. Tente novamente; não é possível concluir que a conexão falhou.",
  "Yeni araç çağrısı doğrulandı.": "Nova chamada de ferramenta verificada.",
  "Yeni araç çağrısı görülmedi. Ajanınızın MCP durumunu kontrol edip bir araç çağrısı yapın, sonra yeniden doğrulayın.":
    "Nenhuma nova chamada de ferramenta foi observada. Confira o status MCP do seu agente, faça uma chamada de ferramenta e verifique novamente.",
  "Yeni araç çağrısı bekleniyor. Ajanınızdan seowatcher araçlarını kullanmasını isteyin.":
    "Aguardando uma nova chamada de ferramenta. Peça ao seu agente para usar as ferramentas do seowatcher.",
  "Sitelerinizi açın; arşiv verisini, son denetimi ve eksik bağlantıları burada görün.":
    "Abra seus sites; veja aqui os dados do arquivo, a última auditoria e as conexões ausentes.",
  "Proje ara": "Pesquisar projeto",
  "Ad veya alan adı": "Nome ou domínio",
  "Liste yenilenemedi; son alınan projeler gösteriliyor. Yeniden deneyin.":
    "Não foi possível atualizar a lista; os últimos projetos recebidos são exibidos. Tente novamente.",
  "Proje verileri yenilenemedi. Listeyi yenileyerek yeniden deneyin.":
    "Não foi possível atualizar os dados do projeto. Atualize a lista para tentar novamente.",
  "Bu aramayla eşleşen proje yok. Aramayı değiştirin.":
    "Nenhum projeto corresponde a esta pesquisa. Altere a pesquisa.",
  "Site eklenmedi. Bu proje için bir site seçin.":
    "Nenhum site adicionado. Selecione um site para este projeto.",
  "Son açılan": "Último aberto",
  "Search Console bağla": "Conectar Search Console",
  "Paneli aç": "Abrir painel",
  "Arşivlenen liste yenilenemedi; son alınan liste gösteriliyor":
    "Não foi possível atualizar a lista arquivada; a última lista recebida é exibida",
  "Görünüm ve dil bu tarayıcıya, Google kimlikleri bu kurulumdaki tüm projelere, Windows tercihleri başlatıcıya uygulanır. Önce kullanacağınız Google kimliğini seçin, sonra proje bağlantılarından mülkünüzü belirleyin.":
    "A aparência e o idioma se aplicam a este navegador, as credenciais do Google a todos os projetos desta instalação e as preferências do Windows ao inicializador. Primeiro escolha as credenciais do Google que usará e depois selecione sua propriedade nas conexões do projeto.",
  "Kurulum türü okunamadı. Durumu yeniden kontrol edin; günlük konumu kurulum türü belirlendiğinde gösterilir.":
    "Não foi possível ler o tipo de instalação. Verifique o status novamente; o local dos logs será exibido quando o tipo de instalação for determinado.",
  "Proje kimliği okunuyor…": "Lendo o ID do projeto…",
  "Proje kimliği okunamadı. Proje listesini yeniden yükleyin.":
    "Não foi possível ler o ID do projeto. Recarregue a lista de projetos.",
  "Yazdırma sekmesi tarayıcı tarafından engellendi. Bu site için açılır pencerelere izin verin veya raporu yeni sekmede açıp Yazdır kullanın.":
    "O navegador bloqueou a aba de impressão. Permita pop-ups para este site ou abra o relatório em uma nova aba e use Imprimir.",
  "Kaynak ve kayıt bilgileri": "Informações de origem e registro",
  "Rapor bilgileri yenilenemedi. Son alınan kayıt gösteriliyor; sayfayı yenileyerek tekrar deneyin.":
    "Não foi possível atualizar as informações do relatório. O último registro recebido é exibido; atualize a página para tentar novamente.",
  "Rapor kaydedildiği dilde ve verilerle açılır. Güncel veri veya başka dil için kaynak ekrandan bilinçli olarak yeniden hazırlayın.":
    "O relatório abre com o idioma e os dados em que foi salvo. Para dados atuais ou outro idioma, gere-o novamente de forma intencional na tela de origem.",
  "Arama raporu hazırla": "Preparar relatório de pesquisa",
  "Denetim raporu hazırla": "Preparar relatório de auditoria",
  "Liste yenilenemedi. Son alınan kayıtlar gösteriliyor; Yenile ile tekrar deneyin.":
    "Não foi possível atualizar a lista. Os últimos registros recebidos são exibidos; use Atualizar para tentar novamente.",
  "Filtreler uygulanıyor. Yeni sonuçlar gelene kadar önceki liste gösteriliyor.":
    "Aplicando filtros. A lista anterior é exibida até que os novos resultados cheguem.",
  "Proje alan adı: {domain} · Search Console mülkü: {property}":
    "Domínio do projeto: {domain} · Propriedade do Search Console: {property}",
  "Alan adı belirtilmedi": "Domínio não informado",
  "Mülk seçilmedi": "Nenhuma propriedade selecionada",
  "Seçilen Search Console mülkü proje alan adını kapsamıyor. Ayrı bir mülkü bilerek seçtiyseniz koruyabilirsiniz; değiştirmek için aşağıdaki mülk seçimini kullanın.":
    "A propriedade do Search Console selecionada não abrange o domínio do projeto. Se você escolheu outra propriedade de propósito, pode mantê-la; para alterar, use o seletor de propriedade abaixo.",
  "{name} · {domain}. Değişiklikler yalnızca bu projeye uygulanır.":
    "{name} · {domain}. As alterações se aplicam somente a este projeto.",
  "PageSpeed Insights · yalnızca denetimler":
    "PageSpeed Insights · somente auditorias",
  "Standart mülk sınırı varsayımı": "Limite presumido de propriedade padrão",
  "Son gözlenen kalan gösteriliyor; kota penceresi güncelliği doğrulanamadı. Yeni rapor yanıtı gelene kadar güncel kapasite bilinmiyor.":
    "A última cota restante observada é exibida; não foi possível verificar a atualidade da janela da cota. A capacidade atual é desconhecida até a resposta de um novo relatório.",
  "Bir denetim en çok {count} sayfa tarar; gösterilen sayı proje alan adındaki son tamamlanan denetime aittir. Tarih denetimin başlangıcıdır.":
    "Uma auditoria rastreia no máximo {count} páginas; o número exibido corresponde à última auditoria concluída no domínio do projeto. A data indica o início da auditoria.",
  "Proje alan adındaki son tamamlanan denetim":
    "Última auditoria concluída no domínio do projeto",
  "Son denetim girişimi": "Última tentativa de auditoria",
  "Proje alan adındaki son denetim girişimi":
    "Última tentativa de auditoria no domínio do projeto",
  "Son denetim sürüyor. Sayfa sınırı için son tamamlanan denetim ayrı gösterilir.":
    "A última auditoria está em andamento. A última auditoria concluída é exibida separadamente para o limite de páginas.",
  "Son denetim tamamlanamadı. Son tamamlanan denetimin sayfa sayısı korunur; ayrıntıyı Denetim ekranından kontrol edin.":
    "A última auditoria não foi concluída. O número de páginas da última auditoria concluída é mantido; confira os detalhes na tela Auditoria.",
  "Rapor dönemi": "Período do relatório",
  "Google'ın tamamlandığını bildirdiği günler kullanıldı. Dönem sonu: {date}. Günler Pasifik saatine göredir.":
    "Foram usados os dias que o Google informou como concluídos. Fim do período: {date}. Os dias seguem o horário do Pacífico.",
  "Son günler gecikme varsayımıyla dışarıda bırakıldı; Google kesinleşme sınırı bildirmedi. Günler Pasifik saatine göredir.":
    "Os dias mais recentes foram excluídos com base em um atraso presumido; o Google não informou o limite dos dados finais. Os dias seguem o horário do Pacífico.",
  "Gösterilen: {shown} / {observed} gözlenen kayıt. Kaynak satır sınırları nedeniyle tüm siteyi temsil etmeyebilir.":
    "Exibidos: {shown} / {observed} registros observados. Devido aos limites de linhas da fonte, eles podem não representar todo o site.",
  "Okunan satırlar: {queries} sorgu, {pages} sayfa, {pairs} sorgu×sayfa. Listelerden türetilen fırsatlar bu kapsamla sınırlıdır.":
    "Linhas lidas: {queries} consultas, {pages} páginas, {pairs} consulta×página. As oportunidades derivadas das listas se limitam a esta cobertura.",
  "Listelenmeyen sorguların tıklama payı: {share}. Gizlenen ve satır sınırı dışında kalan sorgular birlikte hesaplanır.":
    "Parcela de cliques das consultas não listadas: {share}. As consultas ocultas e as que estão além do limite de linhas são calculadas juntas.",
  "Google'ın satır sınırına ulaşıldı; sorgu, sayfa veya sorgu×sayfa listeleri eksik olabilir. Bu listelerden üretilen fırsatlar tam site envanteri değildir.":
    "O limite de linhas do Google foi atingido; as listas de consultas, páginas ou consulta×página podem estar incompletas. As oportunidades geradas a partir dessas listas não são um inventário completo do site.",
  "İlk {count} işin {known} tanesinde kazanç hesaplanabildi; {unknown} tanesinde bilinmiyor. Hesaplanabilen işler için {days} günde en fazla {clicks} ek tıklama (üst sınır).":
    "O ganho pôde ser calculado para {known} das primeiras {count} tarefas; em {unknown} ele é desconhecido. Para as tarefas calculáveis, no máximo {clicks} cliques adicionais em {days} dias (limite superior).",
  "Okunan sayfalarda eşiği aşan, gösterim alıp hiç tıklanmayan sayfa bulunmadı.":
    "Entre as páginas lidas, nenhuma página acima do limite teve impressões sem receber cliques.",
  "Önceki tıklama": "Cliques anteriores",
  "Şimdiki tıklama": "Cliques atuais",
  "Okunan sorgularda bu koşulu sağlayan kayıt bulunmadı.":
    "Nenhum registro entre as consultas lidas atende a esta condição.",
  "Önceki dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Yeni sorgu sayısı bu veriden belirlenemez.":
    "A comparação com o período anterior não está disponível ou a cobertura de linhas está incompleta. Não é possível determinar o número de consultas novas com estes dados.",
  "Dönem karşılaştırması mevcut değil veya satır kapsamı eksik. Kaybolan sorgu sayısı bu veriden belirlenemez.":
    "A comparação entre períodos não está disponível ou a cobertura de linhas está incompleta. Não é possível determinar o número de consultas perdidas com estes dados.",
  "Uzun dönem karşılaştırması alınamadı. Yeterli geçmiş olmayabilir veya kaynak isteği başarısız olmuş olabilir; geçmiş veriyi kontrol edip raporu yeniden hazırlayın.":
    "Não foi possível obter a comparação de longo prazo. Pode não haver histórico suficiente ou a solicitação à fonte pode ter falhado; confira os dados históricos e gere o relatório novamente.",
  "Çakışma analizi alınamadı. Diğer bölümler kullanılabilir; Arama performansında çakışmaları kontrol edip raporu yeniden hazırlayın.":
    "Não foi possível obter a análise de sobreposições. As outras seções estão disponíveis; confira as sobreposições em Desempenho da pesquisa e gere o relatório novamente.",
  "Çakışma dönemi: {start} – {end}. İncelenen: {count} sorgu. Eşik: sorguda 100 gösterim; sayfada 10 gösterim ve yüzde 20 pay. Bu dönem ana rapordan farklı olabilir.":
    "Período das sobreposições: {start} – {end}. Examinadas: {count} consultas. Limite: 100 impressões por consulta; 10 impressões e parcela de 20% por página. Este período pode diferir do relatório principal.",
  "Kaynak satır sınırına ulaştı. Okunmayan sorgularda başka çok sayfalı sonuçlar olabilir.":
    "A fonte atingiu o limite de linhas. As consultas não lidas podem conter outros resultados com várias páginas.",
  "Sonuçlar yalnızca okunan ve eşikleri geçen sorguları kapsar.":
    "Os resultados abrangem somente as consultas lidas que ultrapassam os limites.",
  "Okunan sorgularda eşiği aşan çok sayfalı sonuç bulunmadı.":
    "Nenhum resultado com várias páginas acima do limite foi encontrado nas consultas lidas.",
  "Diğer sayfa sayısı": "Número de outras páginas",
  "Bölünen gösterim payı": "Parcela de impressões dividida",
  "Bir sorguda birden çok sayfanın görünmesi kayıp tıklama veya SEO zararı kanıtı değildir. Sayfaların aynı ihtiyacı karşılayıp karşılamadığını inceleyin.":
    "A presença de várias páginas para uma consulta não comprova perda de cliques nem prejuízo ao SEO. Verifique se as páginas atendem à mesma necessidade.",
  "Kaynak satır sınırına ulaştı; dağılım eksik olabilir.":
    "A fonte atingiu o limite de linhas; a distribuição pode estar incompleta.",
  "Özel sonuç görünümü verisi alınamadı veya kayıt dönmedi. Kaynak bu iki durumu ayırmadığı için yokluk sonucu çıkarılamaz; Arama performansını kontrol edin.":
    "Não foi possível obter os dados de aparência especial dos resultados ou nenhum registro foi retornado. A fonte não distingue essas duas situações, portanto não é possível concluir que não existem; confira Desempenho da pesquisa.",
  "Okunan görünüm tablosunda bu döneme ait kayıt bulunmadı.":
    "Nenhum registro deste período foi encontrado na tabela de aparência na pesquisa lida.",
  "Kaydedilmiş belge": "Documento salvo",
  "Rapor hazırlanırken veriler sunucudan yeniden okundu; Google geçmiş değerleri düzeltebilir. Aynı dönem etiketi önceki ekran görüntüsüyle birebir ölçüm eşitliğini garanti etmez. Başlık dili değiştiğinde ayrı bir belge oluşabilir.":
    "Durante a preparação do relatório, os dados foram lidos novamente do servidor; o Google pode corrigir valores históricos. O mesmo rótulo de período não garante medições idênticas a uma captura de tela anterior. A alteração do idioma do título pode gerar um documento separado.",
  "Sorgu tabloları gizlilik nedeniyle gizlenen satırları içermez. Satır sınırı varsa listelenmeyen pay, sınır dışında kalan sorguları da içerir.":
    "As tabelas de consultas não incluem as linhas ocultas por privacidade. Se houver limite de linhas, a parcela não listada inclui também as consultas além desse limite.",
  "Arama görünümünün istek bütçesi: {count}. Ek çakışma analizi dahil değildir; önbellek kullanımı gerçek ağ isteği sayısını değiştirir.":
    "Orçamento de solicitações de aparência na pesquisa: {count}. Não inclui a análise adicional de sobreposições; o uso de cache altera o número real de solicitações de rede.",
  Özet: "Resumo",
  "Uygulama raporu, tür kaydedilmemiş": "Relatório do app, tipo não registrado",
};
