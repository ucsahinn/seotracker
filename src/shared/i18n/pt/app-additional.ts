import type { Catalog } from "@/shared/i18n";

/** Additional app-wide labels. */
export const ptAppAdditional: Catalog = {
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
  "Yanıtınız alındı": "Sua resposta foi registrada",
  "{count} yanıt": { one: "{count} resposta", other: "{count} respostas" },
  "PowerShell: parolayı ekrana yazdırmadan panoya kopyalayın. Yalnızca MCP istemcinizin yerel gizli başlık alanına yapıştırın, ardından panoyu temizleyin. Sohbete yapıştırmayın.":
    "PowerShell: copie a senha para a área de transferência sem exibi-la na tela. Cole somente no campo local de cabeçalhos secretos do cliente MCP e depois limpe a área de transferência. Não cole na conversa.",
  "Google Analytics mülkü seçildi":
    "Propriedade do Google Analytics selecionada",
  "Mülk seçim tarihi: {date}": "Data de seleção da propriedade: {date}",
  "Kimlik yöntemi: hizmet hesabı": "Método de autenticação: conta de serviço",
  "Kimlik yöntemi: Google OAuth": "Método de autenticação: Google OAuth",
  "Saat dilimi: {timezone} · Para birimi: {currency}":
    "Fuso horário: {timezone} · Moeda: {currency}",
  "Search Console mülkü seçildi": "Propriedade do Search Console selecionada",
  "Bağlantı ayarları yenilenemedi. Son kayıt gösteriliyor; erişim durumu bilinmiyor.":
    "Não foi possível atualizar as configurações de conexão. O último registro é exibido; o status do acesso é desconhecido.",
  "Google izni geçersiz veya süresi dolmuş. İlgili Google hesabını yeniden bağlayın.":
    "A autorização do Google é inválida ou expirou. Reconecte a conta do Google correspondente.",
  "Google bu mülke erişimi reddetti. Seçilen hesabın mülk izinlerini kontrol edin.":
    "O Google negou o acesso a esta propriedade. Confira as permissões da conta selecionada para a propriedade.",
  "Google API etkin değil. Google Cloud projesinde ilgili API'yi etkinleştirip yeniden deneyin.":
    "A API do Google não está ativada. Ative a API correspondente no projeto do Google Cloud e tente novamente.",
  "Google istek sınırına ulaşıldı. Bir süre bekleyin ve Google Cloud kota ekranını kontrol edin.":
    "O limite de solicitações do Google foi atingido. Aguarde e confira a tela de cotas do Google Cloud.",
  "Google zamanında yanıt vermedi. Bağlantıyı kontrol edip yeniden deneyin; mevcut mülk seçimi korunur.":
    "O Google não respondeu a tempo. Confira a conexão e tente novamente; a propriedade selecionada será mantida.",
  "Google bağlantı yanıtı okunamadı; erişiminizin olmadığı sonucu çıkarılamaz. Yeniden deneyin. Sürerse Yardım ekranından tanılama paketini alıp sorunu bildirin.":
    "Não foi possível ler a resposta da conexão com o Google; isso não permite concluir que você não tem acesso. Tente novamente. Se o problema persistir, obtenha o pacote de diagnóstico na tela Ajuda e relate o problema.",
  "Mülk seçimi kayıtlıdır. Veri erişimi bu ayar okumasıyla doğrulanmaz; son veri durumunu ilgili rapordan kontrol edin.":
    "A seleção da propriedade está salva. A leitura desta configuração não verifica o acesso aos dados; confira o status mais recente no relatório correspondente.",
  "Kurulumun Google kimlik ayarları":
    "Configurações de credenciais do Google desta instalação",
  "Google mülk listesi okunamadı. Bu durum erişiminiz olmadığı anlamına gelmez. Son liste korunur; yeniden deneyin veya Yardım tanılamasını kontrol edin.":
    "Não foi possível ler a lista de propriedades do Google. Isso não significa que você não tem acesso. A última lista será mantida; tente novamente ou confira o diagnóstico em Ajuda.",
  "Mülk seçili": "Propriedade selecionada",
  "En fazla {count} karakter": "No máximo {count} caracteres",
  "İsteğe bağlı rakip notu eklenmemiş. Bu liste rakip sıralaması ölçmez.":
    "Nenhuma nota opcional sobre concorrentes foi adicionada. Esta lista não mede o posicionamento dos concorrentes.",
  "İsteğe bağlı sayfa listesi boş. Sayfa rolleri sizin notlarınızdır; ölçülen dönüşüm değildir.":
    "A lista opcional de páginas está vazia. Os papéis das páginas são suas anotações, não conversões medidas.",
  "Search Console bağlantısı kayıtlı. Veri durumunu Arama performansında görün.":
    "A conexão com o Search Console está salva. Confira o status dos dados em Desempenho da pesquisa.",
  "Analytics bağlantısı kayıtlı. Veri durumunu Analytics ekranında görün.":
    "A conexão com o Analytics está salva. Confira o status dos dados na tela Analytics.",
  "Bağlı değil. Oturum ve dönüşüm analizi için Analytics bağlayın; arama tıklamalarını Search Console ile inceleyebilirsiniz.":
    "Não conectado. Conecte o Analytics para analisar sessões e conversões; você pode examinar os cliques da pesquisa com o Search Console.",
  "Anahtar kayıtlı. Google kotası veya hizmet hatası hız ölçümünü yine engelleyebilir.":
    "Chave salva. A cota do Google ou um erro no serviço ainda podem impedir a medição de velocidade.",
  "Anahtar yok. Ortak Google kotası hız ölçümünü sınırlayabilir; Ayarlar’dan kendi anahtarınızı ekleyin.":
    "Sem chave. A cota compartilhada do Google pode limitar a medição de velocidade; adicione sua própria chave em Configurações.",
  "Son yedi günde başlatılıp tamamlanmış bu siteye ait denetim var.":
    "Existe uma auditoria deste site iniciada e concluída nos últimos sete dias.",
  "Son yedi günde başlatılıp tamamlanmış bu-site denetimi yok. Site denetiminden yeni bir denetim başlatın.":
    "Não há auditoria deste site iniciada e concluída nos últimos sete dias. Inicie uma nova em Auditoria do site.",
  "Bu kurulumda bir ajan en az bir araç kullandı.":
    "Um agente usou pelo menos uma ferramenta nesta instalação.",
  "Bu kurulumda kayıtlı araç çağrısı yok. Ajan kurulumu adımlarını izleyin.":
    "Não há chamadas de ferramentas registradas nesta instalação. Siga as etapas de configuração do agente.",
  "Kayıtlı bağlantılar ve proje notları. Bu liste bir SEO başarı puanı veya canlı bağlantı testi değildir.":
    "Conexões salvas e notas do projeto. Esta lista não é uma pontuação de sucesso em SEO nem um teste de conexão em tempo real.",
  "Kurulum ve proje notları farklı anlarda okundu. Tutarlı durum için bilgiyi yenileyin.":
    "O status da instalação e as notas do projeto foram lidos em momentos diferentes. Atualize as informações para obter um status consistente.",
  "{done}/{total} kayıtlı · {missing} eksik · {unknown} okunamadı":
    "{done}/{total} salvos · {missing} faltando · {unknown} não puderam ser lidos",
  "Kurulum yenilenemedi; son alınan durum gösteriliyor. Yeniden deneyin.":
    "Não foi possível atualizar a instalação; o último status recebido é exibido. Tente novamente.",
  "Kaydedilmemiş değişiklikleriniz var. Bu sayfadan ayrılmak istiyor musunuz?":
    "Você tem alterações não salvas. Deseja sair desta página?",
  "İstemi kopyalayıp Claude Code ya da Codex'e yapıştırın. Bu istem ajandan kaydetmeden önce onayınızı istemesini ister. Araç çağrıları bilgiyi hemen kaydedebilir; onay davranışı ajanınıza bağlıdır.":
    "Copie o prompt e cole no Claude Code ou Codex. O prompt pede ao agente que solicite sua aprovação antes de salvar. As chamadas de ferramentas podem salvar as informações imediatamente; o comportamento de aprovação depende do seu agente.",
  "İstemi kopyalayıp ajana yapıştırın. Bu istem ajandan mevcut notları gözden geçirmesini ve kaydetmeden önce onayınızı istemesini ister. Uygulama araçları ayrıca bir onay kapısı uygulamaz.":
    "Copie o prompt e cole no agente. O prompt pede que ele revise as notas existentes e solicite sua aprovação antes de salvar. As ferramentas do app não impõem uma etapa adicional de aprovação.",
  "Ajanın kullanabileceği kayıtlı proje notları. Kaydedilen bilgiyi, son yazanı ve eksikleri gözden geçirin.":
    "Notas salvas do projeto disponíveis para o agente. Revise as informações, o último autor e o que está faltando.",
  "Son kayıtlı bilgi gösteriliyor; yenileme başarısız. Taslaklarınız korunuyor.":
    "As últimas informações salvas são exibidas; a atualização falhou. Seus rascunhos são preservados.",
  "{filled}/{total} bölüm dolu": "{filled}/{total} seções preenchidas",
  "Şu anki hedef kayıtlı değil. Hedef bölümüne bu dönem başarmak istediğinizi yazın.":
    "O objetivo atual não está salvo. Na seção Objetivo, escreva o que deseja alcançar neste período.",
  "İlk boş bölümü doldur": "Preencher a primeira seção vazia",
  "Bölüme git": "Ir para a seção",
  "Bölüm seçin": "Selecione uma seção",
  "Ajanla taslak hazırla": "Preparar rascunho com o agente",
  "Proje kimliği okunmadan istem hazırlanamaz. Proje listesini yeniden yükleyin.":
    "Não é possível preparar o prompt antes de ler o ID do projeto. Recarregue a lista de projetos.",
  "Kaynak ve kurulum": "Origem e instalação",
  "En yeni en fazla yirmi kayıt gösterilir. Tarihi sunucu UTC gününe göre belirler. Doksan günden eski kayıtlar yeni kayıt eklenirken temizlenir; bu liste eksiksiz geçmiş değildir.":
    "São exibidos no máximo os vinte registros mais recentes. A data segue o dia UTC do servidor. Registros com mais de noventa dias são removidos quando um novo registro é adicionado; esta lista não é um histórico completo.",
  "Bilgi kaydedilemedi. Taslağınız korunuyor; alanları kontrol edip yeniden kaydedin.":
    "Não foi possível salvar as informações. Seu rascunho é preservado; confira os campos e salve novamente.",
  "Proje verileri okunamadı. Listeyi yenileyerek yeniden deneyin.":
    "Não foi possível ler os dados do projeto. Atualize a lista para tentar novamente.",
  "Bazı kaynaklar okunamadı; gösterilen diğer bilgiler korunuyor.":
    "Não foi possível ler algumas fontes; as demais informações exibidas são preservadas.",
  "Arama arşivi · Web · tüm cihazlar ve ülkeler":
    "Arquivo de pesquisa · Web · todos os dispositivos e países",
  "{observed}/{total} gün kayıtlı; toplam yalnızca kayıtlı günleri içerir.":
    "{observed}/{total} dias registrados; o total inclui somente os dias registrados.",
  "Kayıtlı günlerde ölçülen tıklama sayısı sıfır.":
    "O número de cliques medidos nos dias registrados é zero.",
  "Önceki dönem: {start} – {end} · {observed}/{total} gün kayıtlı":
    "Período anterior: {start} – {end} · {observed}/{total} dias registrados",
  "İki dönemin de tüm günleri kayıtlı olmadığı için değişim hesaplanmadı.":
    "A variação não foi calculada porque pelo menos um dos dois períodos não tem todos os dias registrados.",
  "Arşiv kaynağı": "Origem do arquivo",
  "Son kayıtlı gün: {date}": "Último dia registrado: {date}",
  "Son arşiv okuması: {date}": "Última leitura do arquivo: {date}",
  "Kesinleşme kaynağı arşivde kayıtlı değil":
    "A fonte de confirmação dos dados finais não está registrada no arquivo",
  "Bu kurulumda henüz arama arşivi yok. Arama performansını açarak veriyi okuyun.":
    "Esta instalação ainda não tem um arquivo de pesquisa. Abra Desempenho da pesquisa para ler os dados.",
  "Son tamamlanan bu-site denetimi": "Última auditoria concluída deste site",
  "Başlangıç: {date}": "Início: {date}",
  "Tamamlanma: {date}": "Conclusão: {date}",
  "Bu denetim en az yedi gün önce başlatıldı. Güncel durum için yeni denetim başlatın.":
    "Esta auditoria foi iniciada há pelo menos sete dias. Inicie uma nova para conhecer o status atual.",
  "Denetimi aç": "Abrir auditoria",
  "Bu site için tamamlanmış denetim yok. Siteyi seçip denetim başlatın.":
    "Não há auditoria concluída para este site. Selecione o site e inicie uma auditoria.",
  "Son deneme başarısız": "A última tentativa falhou",
  "Son denetim sürüyor": "A última auditoria está em andamento",
  "Son deneme tamamlanmadı": "A última tentativa não foi concluída",
  "Bağlantı kaydı, verinin başarıyla okunduğunu göstermez.":
    "Uma conexão salva não indica que os dados foram lidos com sucesso.",
  "Bağlantı kayıtlı": "Conexão salva",
  "Ülke ve dil, kaydettiğiniz kelimelerin varsayılan pazarıdır. Arama performansında ülkeyi filtrelerden seçersiniz; bu ayar geçmiş veriyi değiştirmez.":
    "O país e o idioma definem o mercado padrão das palavras-chave salvas. Em Desempenho da pesquisa, você escolhe o país nos filtros; esta configuração não altera os dados históricos.",
  "Denetim bu adresten başlar. Google mülkünü Bağlantılar bölümünden ayrıca seçersiniz. https:// olmadan yazın, örneğin example.com.":
    "A auditoria começa neste endereço. A propriedade do Google é selecionada separadamente em Conexões. Digite sem https://, por exemplo, example.com.",
  "Alan adı değişikliği Google mülk seçimini ve geçmiş kayıtları değiştirmez. Kaydetmeden önce Bağlantılar bölümündeki mülkün bu siteye ait olduğunu kontrol edin.":
    "A alteração do domínio não muda a propriedade do Google selecionada nem os registros históricos. Antes de salvar, confira se a propriedade em Conexões pertence a este site.",
  "Marka terimlerini Arama performansında düzenleyin":
    "Editar os termos da marca em Desempenho da pesquisa",
  "Google mülk seçimi ve geçmiş korunarak alan adının değiştirilmesini onaylıyorum.":
    "Confirmo a alteração do domínio mantendo a propriedade do Google selecionada e o histórico.",
  "Sınırları gösterilen proje": "Projeto cujos limites são exibidos",
  "Sınırlar yenilenemedi; son kayıt gösteriliyor":
    "Não foi possível atualizar os limites; o último registro é exibido",
  "{state} · {count} kaynak bilinmiyor":
    "{state} · {count} fontes desconhecidas",
  "Bilinen sınırlarda sorun yok": "Nenhum problema nos limites conhecidos",
  "Rapor indirmesi bağlantı hatası veya zaman aşımı nedeniyle tamamlanamadı. Bağlantınızı kontrol edip yeniden indirin.":
    "O download do relatório não foi concluído devido a um erro de conexão ou tempo limite. Confira sua conexão e baixe novamente.",
  "Rapor indirmesi başka bir sayfaya yönlendirildi. Uygulamayı yenileyip erişiminizi kontrol edin.":
    "O download do relatório foi redirecionado para outra página. Atualize o app e verifique seu acesso.",
  "Rapor bulunamadı veya erişiminiz yok. Listeyi yenileyip raporu yeniden seçin.":
    "Relatório não encontrado ou sem permissão de acesso. Atualize a lista e selecione o relatório novamente.",
  "Rapor erişimi doğrulanamadı. Uygulamayı yenileyip yeniden indirin.":
    "Não foi possível verificar o acesso ao relatório. Atualize o app e baixe novamente.",
  "Rapor sunucusu indirmeyi tamamlayamadı. Biraz sonra yeniden indirin.":
    "O servidor de relatórios não conseguiu concluir o download. Tente baixar novamente em instantes.",
  "Kaydedildi: {date}": "Salvo: {date}",
  "Arama performansı ekranında dönem ve süzgeçleri seçip Raporu indir düğmesini kullanın. Kaydedilmiş raporlar kaynak bağlantısı kesilse de okunabilir.":
    "Selecione o período e os filtros em Desempenho da pesquisa e use Baixar relatório. Os relatórios salvos podem ser lidos mesmo se a fonte for desconectada.",
  Sıralama: "Ordenação",
  "Oluşturulma zamanı": "Data de criação",
  "{matching} sonuç / projedeki {total} rapor":
    "{matching} resultados / {total} relatórios no projeto",
  "Son 7 gün, bu sürede kaydedilen veya güncellenen ayrı dosyaları süzer; kaynak verinin güncelliğini göstermez. Arama başlık ve kayıtlı özeti tarar.":
    "Últimos 7 dias filtra os arquivos individuais salvos ou atualizados nesse período; não indica a atualidade dos dados de origem. A pesquisa examina o título e o resumo salvo.",
  "Tür sayıları arama ve Son 7 gün süzgecine göredir; seçili türden önce hesaplanır.":
    "As contagens por tipo seguem a pesquisa e o filtro Últimos 7 dias; são calculadas antes de aplicar o tipo selecionado.",
  "Aramayı veya türü temizleyerek kayıtlı raporları görün.":
    "Limpe a pesquisa ou o tipo para ver os relatórios salvos.",
  "Arama performansı veya Site denetimi ekranından rapor hazırlayın ya da rapor komutunu ajanınıza yapıştırın.":
    "Prepare um relatório em Desempenho da pesquisa ou Auditoria do site, ou cole o comando de relatório no seu agente.",
  "Veri dönemi: raporun içinde kontrol edin.":
    "Período dos dados: confira dentro do relatório.",
  Şablon: "Modelo",
  "{start}–{end} / {total}": "{start}–{end} / {total}",
  Sonraki: "Próximo",
  "Saklama durumu": "Status do armazenamento",
  "Saklama bilgileri alınamadı. Bu durum boş alan olduğunu göstermez; bağlantıyı kontrol edip yeniden deneyin.":
    "Não foi possível obter as informações de armazenamento. Isso não indica que há espaço livre; confira a conexão e tente novamente.",
  "Son güncellenen rapor": "Último relatório atualizado",
  "Bu rapora özet kaydedilmemiş. Bulguları ve ilk adımı raporun içinde kontrol edin.":
    "Nenhum resumo foi salvo para este relatório. Confira os resultados e o primeiro passo dentro do relatório.",
  "Kaydedildi: {date}. Bu zaman, kaynak verinin ölçüm tarihi değildir.":
    "Salvo: {date}. Este horário não é a data de medição dos dados de origem.",
  "Bu raporun veri dönemi yapılandırılmış olarak kaydedilmemiş. Dönemi ve veri sınırlarını raporun içinde kontrol edin.":
    "O período dos dados deste relatório não foi salvo de forma estruturada. Confira o período e os limites dos dados dentro do relatório.",
  "Raporu aç": "Abrir relatório",
  "Rapor belgesi bulunamadı veya erişiminiz yok. Listeyi yenileyip raporu yeniden seçin.":
    "Documento do relatório não encontrado ou sem permissão de acesso. Atualize a lista e selecione o relatório novamente.",
  "Raporun kullanılabilirliği doğrulanamadı. Sunucuya veya bağlantınıza erişilemiyor; yeniden deneyin.":
    "Não foi possível verificar a disponibilidade do relatório. O servidor ou sua conexão estão inacessíveis; tente novamente.",
  "Rapor önizlemesi zamanında açılmadı. Bağlantıyı kontrol edin; yeniden deneyin veya yeni sekmede açın.":
    "A prévia do relatório não abriu a tempo. Confira a conexão; tente novamente ou abra em uma nova aba.",
  "Arşiv ayrıntısı": "Detalhes do arquivo",
  "Dönem: {start} – {end}": "Período: {start} – {end}",
  "Sıra bilinmiyor": "Posição desconhecida",
  "Önceki dönem: {start} – {end}": "Período anterior: {start} – {end}",
  "Önceki ortalama sıra": "Posição média anterior",
  Gösterimler: "Impressões",
  "Sıra arşivi okunamadı. Liste kayıtlı; sıra bilgisi için yeniden deneyin.":
    "Não foi possível ler o arquivo de posições. A lista está salva; tente novamente para obter as posições.",
  "Eksik arşiv nedeniyle gözlem yokluğu doğrulanamaz":
    "O arquivo incompleto não permite confirmar a ausência de observações",
  "Okunan arşivde eşleşen gözlem yok":
    "Nenhuma observação correspondente no arquivo lido",
  "Eşleşen ham sorgular; gösterimle ağırlıklandırılır":
    "Consultas originais correspondentes; ponderadas pelas impressões",
  "Önceki dönemin ham sorguları": "Consultas originais do período anterior",
  "Gözlem yok": "Nenhuma observação",
  "Konum ve dil kayıt bilgisi olarak korunur. Arşiv tüm ülkeleri ve cihazları kapsar. Türkçe büyük/küçük harf ve birden fazla boşluk eşleştirilir; ham sorgular gösterimle ağırlıklandırılır. Google bazı nadir sorguları döndürmeyebilir.":
    "O local e o idioma são mantidos como informações do registro. O arquivo abrange todos os países e dispositivos. A correspondência considera maiúsculas e minúsculas do turco e espaços múltiplos; as consultas originais são ponderadas pelas impressões. O Google pode não retornar algumas consultas raras.",
  "Kayıtlı pazar (arşiv filtresi değil)":
    "Mercado salvo (não é um filtro do arquivo)",
  "Eski kayıt bilgisi: {intent}; tarih: {date}":
    "Informações do registro antigo: {intent}; data: {date}",
  "Arama amacı ölçülmedi": "Intenção de pesquisa não medida",
  "Canlı arama son 28 günü ve metni içeren sorguları açar; bu arşiv ortalamasıyla aynı dönem veya tam eşleşme değildir.":
    "A pesquisa ao vivo abre os últimos 28 dias e as consultas que contêm o texto; não usa o mesmo período da média do arquivo nem uma correspondência exata.",
  "Arama performansında ara (canlı dönem)":
    "Pesquisar em Desempenho da pesquisa (período atual)",
  "Günlük arşiv gözlemlerini göster": "Mostrar observações diárias do arquivo",
  "Günlük arşiv okunamadı veya liste değişti. Ayrıntıyı kapatıp listeyi yenileyin; ardından yeniden açın.":
    "Não foi possível ler o arquivo diário ou a lista mudou. Feche os detalhes, atualize a lista e abra novamente.",
  "Bu tarihlerde eşleşen günlük gözlem yok; eksik günler sıfır sayılmaz.":
    "Não há observações diárias correspondentes nestas datas; os dias ausentes não são contados como zero.",
  "Eklenen terimlerin tümü eşleşmelidir.":
    "Todos os termos adicionados devem corresponder.",
  "Eklenen terimlerden hiçbiri bulunmamalıdır.":
    "Nenhum dos termos adicionados deve estar presente.",
  "En fazla {count} terim.": "No máximo {count} termos.",
  "Terim sınırı aşıldı. Eklemek için önce bir terimi kaldırın.":
    "Limite de termos excedido. Remova um termo antes de adicionar outro.",
  "Seçtiğiniz kelimelerin arşiv gözlemlerini, karşılaştırılabilir hareketlerini ve eksik kanıtlarını inceleyin.":
    "Examine as observações no arquivo, as mudanças comparáveis e as evidências ausentes das palavras-chave selecionadas.",
  "Liste yanıtı: {date}": "Resposta da lista: {date}",
  "Arşiv dönemi": "Período do arquivo",
  "{count} gün": "{count} dias",
  "Listeyi yenile": "Atualizar lista",
  "Filtrelenen {count} kelimeyi aktar":
    "Exportar as {count} palavras-chave filtradas",
  "Kelime ara; tüm terimler eşleşir":
    "Pesquisar palavras-chave; todos os termos devem corresponder",
  "Terimleri virgülle ayırın": "Separe os termos por vírgulas",
  "Filtre uygulanıyor…": "Aplicando filtro…",
  "En fazla {count} terim girin; fazla terimleri kaldırın.":
    "Insira no máximo {count} termos; remova os termos excedentes.",
  "Etkin sıra grubu: {band}": "Grupo de posições ativo: {band}",
  "Belirgin gerileyenler": "Quedas significativas",
  "Sıra özeti okunamadı; kayıtlı liste kullanılabilir":
    "Não foi possível ler o resumo de posições; a lista salva está disponível",
  "Sıra grubu uygulanamadı; sıra arşivi okunamadı. Yeniden deneyin veya grubu temizleyin.":
    "Não foi possível aplicar o grupo de posições; o arquivo de posições não pôde ser lido. Tente novamente ou limpe o grupo.",
  "Sıra 1–3": "Posições 1–3",
  "Sıra 4–10": "Posições 4–10",
  "Sıra 11–20": "Posições 11–20",
  "Sıra 21+": "Posições 21+",
  "Gözlenen kelimeler": "Palavras-chave observadas",
  "{shown} / {total} kayıtlı kelime; seçim yalnızca bu sayfada":
    "{shown} / {total} palavras-chave salvas; a seleção vale somente nesta página",
  "Kayıtlı kelimelerin arşiv özeti":
    "Resumo do arquivo das palavras-chave salvas",
  "Kelimeler kayıtlı; sıra karşılaştırması şu anda kullanılamıyor.":
    "As palavras-chave estão salvas; a comparação de posições não está disponível no momento.",
  "Kaydettiğiniz {saved} kelimenin {observed} tanesi bu aralıkta arşivde gözlendi.":
    "Das {saved} palavras-chave salvas, {observed} foram observadas no arquivo neste intervalo.",
  "Google Web · tüm ülkeler ve cihazlar · {zone}":
    "Google Web · todos os países e dispositivos · {zone}",
  "Eşleşen kelimelerde gözlenen gün: {observed} / {requested}":
    "Dias observados nas palavras-chave correspondentes: {observed} / {requested}",
  "Son doğrulanmış yanıt gösteriliyor; liste yenilenirken işlem yapmayın.":
    "A última resposta verificada é exibida; não realize operações enquanto a lista é atualizada.",
  "Sıralamalar'da arşivi güncelle":
    "Atualizar o arquivo em Acompanhamento de posições",
  "Gerileyenleri incele": "Examinar as quedas",
  "Metin ve etiket filtresine uyan kayıtlar":
    "Registros que correspondem aos filtros de texto e etiquetas",
  "{count} kayıtlı kelime içinde": "Entre {count} palavras-chave salvas",
  "Belirgin hareket ≥{value} sıra": "Mudança significativa ≥{value} posições",
  "↑ {up} · ↓ {down}": "↑ {up} · ↓ {down}",
  "Karşılaştırılabilen: {comparable} / {total}":
    "Comparáveis: {comparable} / {total}",
  "Önceki dönem okunamadı; karşılaştırma için yeniden deneyin.":
    "Não foi possível ler o período anterior; tente novamente para comparar.",
  "Belirgin değişmedi: {stable}; önceki gözlem yok: {previous}; güncel gözlem yok: {current}.":
    "Sem mudança significativa: {stable}; sem observação anterior: {previous}; sem observação atual: {current}.",
  "Sıra gruplarının tabanı: {count} kayıtlı kelime (sıra grubu uygulanmadan önce).":
    "Base dos grupos de posições: {count} palavras-chave salvas (antes de aplicar o grupo).",
  "Sıra grupları; metin ve etiket filtresi sonrası tüm kayıtlar":
    "Grupos de posições; todos os registros após os filtros de texto e etiquetas",
  "Veri kapsamı ve hesaplama": "Cobertura dos dados e cálculo",
  "Son arşiv aktarımı: {date}": "Última importação para o arquivo: {date}",
  "Tam yanıt: {complete}; sınırlı: {limited}; başarısız: {failed}; doğrulanmamış gün: {unknown}.":
    "Respostas completas: {complete}; limitadas: {limited}; com falha: {failed}; dias não verificados: {unknown}.",
  "Önceki dönemde tam yanıt: {complete} / {days}; eşleşen gözlem günü: {observed}.":
    "Respostas completas no período anterior: {complete} / {days}; dias com observações correspondentes: {observed}.",
  "Listeyi yenile yalnızca yerel veritabanını okur; Google'dan yeni veri almaz. Tarihler Pasifik takviminde üç günlük gecikme varsayımıyla seçilir; bu, tam arşiv kanıtı değildir.":
    "Atualizar lista lê somente o banco de dados local; não busca novos dados no Google. As datas seguem o calendário do Pacífico com um atraso presumido de três dias; isso não comprova que o arquivo está completo.",
  "Arşiv aktarım durumu okunamadı. Son aktarım bilgisi için yeniden deneyin.":
    "Não foi possível ler o status da importação para o arquivo. Tente novamente para obter informações da última importação.",
  "Search Console bağlantısı okunamadı. Bağlantıyı denetleyin veya yeniden deneyin.":
    "Não foi possível ler a conexão com o Search Console. Confira a conexão ou tente novamente.",
  "Kelimeleriniz kayıtlı. Güncel sıra verisi için Search Console bağlantısı gerekiyor.":
    "Suas palavras-chave estão salvas. A conexão com o Search Console é necessária para obter dados atuais de posição.",
  "Search Console bağlı; bu aralık henüz arşive alınmadı. Sıralamalar'dan arşivi güncelleyin.":
    "O Search Console está conectado; este intervalo ainda não foi arquivado. Atualize o arquivo em Acompanhamento de posições.",
  "Son arşiv aktarımı tamamlanamadı. Sıralamalar ekranında hatayı inceleyip yeniden deneyin.":
    "A última importação para o arquivo não foi concluída. Examine o erro em Acompanhamento de posições e tente novamente.",
  "Arşiv bu tarihlerin tümünü doğrulamıyor. Eksik veya sınırlı günler için Sıralamalar'dan arşivi güncelleyin.":
    "O arquivo não confirma todas estas datas. Atualize o arquivo em Acompanhamento de posições para os dias ausentes ou limitados.",
  "Arşiv seçilen dönemin sonuna ulaşmadı. Sıralamalar'dan arşivi güncelleyin.":
    "O arquivo não chegou ao fim do período selecionado. Atualize o arquivo em Acompanhamento de posições.",
  "Bu tarihlerde okunan arşivde eşleşen sorgu yok. Bu, Google'da görünmediğiniz anlamına gelmez.":
    "Não há consultas correspondentes no arquivo lido para estas datas. Isso não significa que você não aparece no Google.",
  "Sıralar, kaydedilen nihai Google yanıtlarından hesaplanan ortalamalardır; bugünkü sabit sıranız değildir.":
    "As posições são médias calculadas a partir das respostas finais salvas do Google; não representam sua posição fixa de hoje.",
  "Bağlantı okunamadı; yeniden dene":
    "Não foi possível ler a conexão; tente novamente",
  "Seçilen etiketlerden herhangi biri; sayılar tüm kayıtlı kelimelerdeki etiket atamalarıdır.":
    "Qualquer uma das etiquetas selecionadas; os números indicam as atribuições de etiquetas em todas as palavras-chave salvas.",
  "En fazla {count} etiket seçin.": "Selecione no máximo {count} etiquetas.",
  "Liste veya arşiv değişti. Listeyi yenileyip aktarımı yeniden başlatın.":
    "A lista ou o arquivo mudou. Atualize a lista e reinicie a exportação.",
  "Google kimlikleri bu kurulumdaki tüm projelerde kullanılır. Hizmet hesabı kayıtlıysa önceliklidir. Projenizin mülkünü Proje ayarları → Bağlantılar bölümünden seçin.":
    "As credenciais do Google são usadas por todos os projetos desta instalação. Se uma conta de serviço estiver salva, ela terá prioridade. Selecione a propriedade do projeto em Configurações do projeto → Conexões.",
  "Kullanılan kimlik okunamadı. Google kimlik durumunu yeniden yükleyin.":
    "Não foi possível ler as credenciais em uso. Recarregue o status das credenciais do Google.",
  "Kimlik kayıt tarihi: {date}": "Data de registro das credenciais: {date}",
  "Google kurulum adımları": "Etapas de configuração do Google",
};
