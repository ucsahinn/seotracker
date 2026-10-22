---
title: Ajan kurulumu
description: Claude Code, Codex ya da Cursor'ı uygulamaya bağlama. MCP adresi, parola, 33 aracın ve 6 hazır görev şablonunun listesi, hangi aracın Google kotası harcadığı.
kind: nasil-yapilir
updated: 2026-10-22
---

Uygulamanın tüm verisi, bir yapay zekâ asistanının okuyabileceği biçimde de sunulur. Buna MCP denir: asistanınızın "list_projects", "get_audit_issues" gibi adlandırılmış araçları çağırabildiği standart bir bağlantı. Bağlayınca "siteyi denetle ve bir rapor yaz" diyebilirsiniz; asistan Search Console verisini okur, denetimi çalıştırır, raporu Raporlar ekranına kaydeder. Bağlamak zorunlu değildir; bağlamazsanız uygulamadan hiçbir şey eksilmez. Bu sayfanın sonunda asistanınız bağlı ve ilk araç çağrısı yapılmış olacak.

## Gerekenler

- Uygulama çalışıyor ve bir projede Search Console bağlı.
- Claude Code, Codex, Cursor, VS Code Copilot ya da Gemini CLI'dan biri. Uygulama ilk üçü için hazır kurulum metni verir.
- Uygulamanın **Ajan kurulumu** ekranı (sol menüde, Yapay zekâ bölümünde).

## Adımlar

1. **Ajan kurulumu** ekranını açın. Üstte bağlantı durumu rozeti var: **Henüz bağlanmadı** ya da **Bağlandı** ("Claude Code · son çağrı 2 dk önce" gibi). Altında MCP adresi ve kopyalama düğmesi: **http://127.0.0.1:3001/mcp** (Docker'da localhost).
2. Parolayı bulun. Uygulama, MCP ucunu izinsiz çağrılara karşı bir parolayla korur ve bu parolayı ekranda göstermez; nerede olduğunu söyler. Windows paketinde veri klasöründeki **mcp-token** dosyasıdır (görev çubuğu menüsü → **Veri klasörünü aç**). Docker'da komut: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token` (Git Bash'te başına MSYS_NO_PATHCONV=1).
3. Asistanınıza göre bağlayın.

### Claude Code

Terminalde, parolayı kendi değerinizle değiştirerek:

```sh
claude mcp add --transport http --scope user seotracker http://127.0.0.1:3001/mcp --header "Authorization: Bearer <parola>"
```

Claude Code içinde `/mcp` yazıp **Reconnect** deyin. Beceriler `/seo-audit` gibi eğik çizgiyle çağrılır.

### Codex

```sh
codex mcp add seotracker --url http://127.0.0.1:3001/mcp --bearer-token-env-var SEOTRACKER_MCP_AUTH
```

Sonra SEOTRACKER_MCP_AUTH ortam değişkenine parolayı yazın; Windows'ta PowerShell ile: `[Environment]::SetEnvironmentVariable('SEOTRACKER_MCP_AUTH', '<parola>', 'User')`. Beceriler `$seo-audit` gibi çağrılır.

### Cursor

Projenizin .cursor/mcp.json dosyasına:

```json
{
  "mcpServers": {
    "seotracker": {
      "url": "http://127.0.0.1:3001/mcp",
      "headers": { "Authorization": "Bearer ${env:SEOTRACKER_MCP_AUTH}" }
    }
  }
}
```

ve ortam değişkenini Codex'teki gibi ayarlayın. Uygulama bu biçimi "canlı doğrulanmadı" diye işaretler; Cursor sürümünüz farklı bir alan isterse Cursor'ın belgesine bakın.

4. Hazır kurulum metnini kullanmak daha kolaydır: ekrandaki **Ajan kurulum istemini kopyala** (ya da Codex için ayrı düğme) metni panoya alır; asistanınıza yapıştırın, gerisini o yapar: bağlantıyı kurar, "whoami" ve "list_projects" araçlarıyla test eder, becerileri yükler. **Kurulum istemi (sıfırdan kurulum)** ise Docker'dan Google bağlantısına kadar bütün kurulumu asistana yaptırır.
5. Becerileri yükleyin. **Beceriler** sekmesi altı hazır görev şablonunu anlatır; asistana "seotracker becerilerini kur" demeniz yeter, kurulum metni nereye kopyalanacağını bilir. Güncellemek için **Güncelleme istemini kopyala**.

## Araçlar

Toplam 33 araç. "Yazar" sütunu uygulamadaki veriyi değiştirenleri, "Kota" sütunu Google'ın günlük sınırından harcayanları gösterir. Yazan araçlar sizin onayınız olmadan çağrılmamalı; iyi kurulmuş beceriler sorar, ama sunucu sormaz.

| Araç                                       | Ne yapar                                                                     | Yazar | Kota                         |
| ------------------------------------------ | ---------------------------------------------------------------------------- | ----- | ---------------------------- |
| whoami                                     | Hangi kurulum ve kullanıcı olduğunu söyler                                   |       |                              |
| get_diagnostics                            | Sürüm, kurulum kontrolleri, tablo sayıları, son 25 denetim, kota sayaçları   |       |                              |
| list_projects                              | Projeleri listeler; her araç projectId ister                                 |       |                              |
| create_project                             | Yeni proje açar                                                              | Evet  |                              |
| get_project_context                        | Proje bilgisi ekranını okur                                                  |       |                              |
| update_project_context                     | Proje bilgisini değiştirir, araştırma günlüğüne yazar                        | Evet  |                              |
| get_search_console_performance             | Tıklama, gösterim, oran, sıra; sorgu, sayfa, ülke, cihaz, tarih boyutlarıyla |       |                              |
| get_search_opportunities                   | Fırsatlar listesi (Search Console + Analytics)                               |       |                              |
| get_cannibalization                        | Aynı sorguda yarışan sayfalar                                                |       |                              |
| get_ranking_history                        | Yerel sıralama arşivi, 16 aydan eskiye                                       |       |                              |
| get_index_coverage                         | Kayıtlı Google dizin cevapları; Google'a sormaz                              |       |                              |
| inspect_urls                               | Google'a sayfa sorar; çağrı başına 10 adres                                  | Evet  | Günde 2.000, mülk başına     |
| get_sitemaps                               | Search Console'daki site haritası durumu                                     |       |                              |
| run_site_audit                             | Denetim başlatır                                                             | Evet  | PageSpeed, hız ölçümü açıksa |
| get_audit_status                           | Denetimin aşaması; takılan denetimi başarısız işaretleyebilir                |       |                              |
| get_audit_issues                           | Bulgular, düzeltme adımlarıyla                                               |       |                              |
| get_audit_pages                            | Taranan sayfalar                                                             |       |                              |
| get_google_analytics_organic_overview      | Organik oturum özeti ve önceki dönem                                         |       |                              |
| get_google_analytics_organic_landing_pages | Organik açılış sayfaları                                                     |       |                              |
| get_google_analytics_page_performance      | Sayfa görüntülenme ve etkileşim                                              |       |                              |
| get_google_analytics_traffic_acquisition   | Kanal, kaynak ve kampanya kırılımı                                           |       |                              |
| get_google_analytics_key_events            | Anahtar olaylar                                                              |       |                              |
| get_google_analytics_ecommerce_performance | Ürün satışları                                                               |       |                              |
| get_google_analytics_site_search           | Site içi arama terimleri                                                     |       |                              |
| get_google_analytics_audience_breakdown    | Cihaz, ülke, yeni ve geri dönen                                              |       |                              |
| get_google_analytics_measurement_health    | Ölçüm kurulumu kontrolü; rapor kotası harcamaz                               |       |                              |
| list_saved_keywords                        | Kayıtlı kelimeler                                                            |       |                              |
| save_keywords                              | Kelime kaydeder                                                              | Evet  |                              |
| list_reports                               | Raporları listeler                                                           |       |                              |
| get_report                                 | Bir raporu okur (özet, istenirse HTML)                                       |       |                              |
| save_report                                | Rapor kaydeder ya da günceller                                               | Evet  |                              |
| list_report_templates                      | Şablonları okur                                                              |       |                              |
| save_report_template                       | Şablon kaydeder                                                              | Evet  |                              |

Analytics araçları Google'ın GA4 rapor kotasından (standart mülkte günde 200.000 belirteç) harcar; bu kota uygulamanın Ayarlar ekranındaki Sınırlar bölümünde izlenir.

## Beceriler

| Beceri            | Ne zaman                                                                                                                 | Ne üretir                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------- |
| seo-coach         | "Ne yapmalıyım" diye sorduğunuzda; yolu anlatır, sonraki adımı önerir                                                    | Sohbet, gerekirse koçluk notu         |
| seo-project-setup | Yeni projede; işi, hedefi, rakipleri, önemli sayfaları sorup Proje bilgisi ekranını doldurur                             | Dolu proje bilgisi, kayıtlı kelimeler |
| seo-audit         | "Siteyi denetle" dediğinizde; denetimi çalıştırır, Search Console ile birleştirir, tek bir "bu hafta yapılacak iş" seçer | Tek sayfalık denetim raporu           |
| seo-triage        | Trafik düştüğünde; düşüş gerçek mi, nerede ve ne zaman                                                                   | Düşüş incelemesi raporu               |
| seo-check-in      | Ayda bir; bu dönemle önceki dönemi karşılaştırır                                                                         | Check-in raporu, seri halinde         |
| seo-report        | Diğer beceriler bitince; tek dosyalık HTML raporu yazar ve kaydeder                                                      | Raporlar ekranında rapor              |

## Kontrol

- Asistana "whoami aracını çağır" deyin; kurulum kimliğini döndürmeli.
- **Ajan kurulumu** ekranındaki rozet **Bağlandı** olmalı ve son çağrı zamanı görünmeli.
- "list_projects" projelerinizi listelemeli.

## Sık sorulanlar

**Asistan verimi dışarı gönderir mi?** Asistan hangi modeli kullanıyorsa veri oraya gider; bu, asistanın kendi gizlilik sözleşmesine bağlıdır. Uygulama yalnızca yerel bağlantıya cevap verir.

**Parola olmadan çalışır mı?** Docker'da MCP_TOKEN=off ile evet; Windows paketinde parola her zaman açıktır. Parolasız uç, aynı bilgisayardaki her programın 33 aracı çağırabilmesi demektir.

**Asistan Google kotamı bitirebilir mi?** inspect_urls ve run_site_audit harcar. Beceriler görev başına en fazla 20 adres sorar ve denetimi yalnızca siz istediğinizde başlatır; asistanınıza da aynı sınırı söyleyin.

**Hangi asistan daha iyi?** Fark etmez; araçlar aynı. Kurulum metni Claude Code, Codex ve Cursor için hazır; diğerleri MCP'yi destekliyorsa aynı adres ve parolayla çalışır.

## Sorun çıkarsa

- **Asistan 401 alıyor.** Parola yanlış ya da gönderilmiyor. Dosyadaki değeri yeniden kopyalayın; sonundaki satır sonu karakterine dikkat edin.
- **Bağlantı reddediliyor.** Uygulama kapalıdır. Görev çubuğu simgesine (ya da `docker compose ps` çıktısına) bakın.
- **Asistan "araç bulunamadı" diyor.** Bağlantıyı yeniden yükleyin (Claude Code'da `/mcp` → Reconnect).
- **Beceriler görünmüyor.** Kurulum metnini yeniden yapıştırın; beceriler asistanın kendi beceri klasörüne kopyalanır (Codex'te $HOME/.agents/skills).

<!-- Kaynaklar: src/routes/_app/ai.tsx; src/client/features/ai-mcp/agentInstallPrompt.md; agentSetupPrompt.ts; src/server/mcp/server.ts (33 araç); src/server/mcp/token-auth.ts; transport.ts; .agents/skills/setup-seotracker/SKILL.md; .agents/skills/*/SKILL.md; packaging/windows/launcher/SeoWatcher.cs; docker-entrypoint.sh -->
