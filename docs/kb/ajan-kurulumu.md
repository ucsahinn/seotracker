---
title: Ajan kurulumu
description: Claude Code, Codex ya da Cursor'ı uygulamaya bağlayın. Adres, parola, 33 araç ve 6 hazır görev şablonu, hangisinin Google hakkı harcadığı.
kind: nasil-yapilir
updated: 2026-10-22
---

Bu sayfanın sonunda yapay zekâ asistanınız uygulamaya bağlı olacak ve ilk komutunu çalıştırmış olacak. Bağlayınca "siteyi denetle ve bir rapor yaz" diyebilirsiniz. Asistan Search Console verisini okur, denetimi çalıştırır, raporu **Raporlar** ekranına kaydeder. Bu bağlantının adı asistan bağlantısı (MCP). Asistan böylece uygulamanın araçlarını (örneğin list_projects) çağırabilir. Bağlamak zorunlu değildir. Bağlamazsanız uygulamadan hiçbir şey eksilmez.

## Gerekenler

- Çalışan uygulama ve Search Console bağlı bir proje.
- Claude Code, Codex, Cursor, VS Code Copilot ya da Gemini CLI'dan biri. Uygulama ilk üçü için hazır kurulum metni verir.
- Uygulamada **Ajan kurulumu** ekranı. Sol menüde Yapay zeka bölümünde.

## Adımlar

1. **Ajan kurulumu** ekranını açın. Üstteki rozet **Henüz bağlanmadı** ya da **Bağlandı** der. Bağlandıysa yanında "Claude Code, son çağrı 2 dk önce" gibi bir yazı olur. Altında bağlantı adresi ve kopyalama düğmesi var: `http://127.0.0.1:3001/mcp` (Docker'da `localhost`).
2. Parolayı bulun. Uygulama bağlantıyı izinsiz çağrılara karşı bir parolayla korur ve parolayı ekranda göstermez. Windows paketinde parola veri klasöründeki `mcp-token` dosyasındadır. Görev çubuğu menüsünden **Veri klasörünü aç** deyin. Docker'da şu komutu yazın: `docker compose exec -T seotracker cat /app/.wrangler/mcp-token` (Git Bash'te başına `MSYS_NO_PATHCONV=1` ekleyin).
3. Asistanınıza uygun bölümü izleyin.

### Claude Code

Terminalde (komut penceresinde) şunu yazın. `<parola>` yerine kendi parolanızı koyun:

```sh
claude mcp add --transport http --scope user seotracker http://127.0.0.1:3001/mcp --header "Authorization: Bearer <parola>"
```

Sonra Claude Code içinde `/mcp` yazın ve **Reconnect** deyin. Hazır görev şablonları `/seo-audit` gibi eğik çizgiyle çağrılır.

### Codex

Şu komutu yazın:

```sh
codex mcp add seotracker --url http://127.0.0.1:3001/mcp --bearer-token-env-var SEOTRACKER_MCP_AUTH
```

Sonra `SEOTRACKER_MCP_AUTH` adlı ortam değişkenine (bilgisayarın hatırladığı ayar) parolayı yazın. Windows'ta PowerShell ile: `[Environment]::SetEnvironmentVariable('SEOTRACKER_MCP_AUTH', '<parola>', 'User')`. Şablonlar `$seo-audit` gibi çağrılır.

### Cursor

Projenizdeki `.cursor/mcp.json` dosyasına şunu yazın:

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

Ortam değişkenini Codex'teki gibi ayarlayın. Bu ayar bir Cursor kurulumunda henüz denenmedi. Cursor sürümünüz başka bir alan isterse Cursor'ın belgesine bakın.

### Hazır kurulum metni

Daha kolay yol bu. Önce metni alın:

1. Ekrandaki **Ajan kurulum istemini kopyala** düğmesine basın. Codex için ayrı düğme var.
2. Metni asistanınıza yapıştırın. Asistan bağlantıyı kurar, "whoami" ve "list_projects" ile dener, şablonları yükler.

**Kurulum istemi (sıfırdan kurulum)** ise kurulumun çalışmasından Google bağlantısına kadar bütün kurulumu asistana yaptırır; Windows paketini de Docker kurulumunu da tanır.

### Hazır görev şablonlarını yükleme

**Beceriler** sekmesi altı hazır görev şablonunu anlatır. Asistana "seotracker becerilerini kur" deyin. Kurulum metni nereye kopyalanacağını bilir. Güncellemek için **Güncelleme istemini kopyala** düğmesine basın.

## Araçlar

Toplam 33 araç. "Yazar" sütunu uygulamadaki veriyi değiştirenleri gösterir. "Kota" sütunu Google'ın günlük hakkından harcayanları gösterir. Yazan araçlar sizin onayınız olmadan çağrılmamalı. İyi kurulmuş şablonlar sorar, ama uygulama sormaz.

| Araç                                         | Ne yapar                                                                                    | Yazar | Kota                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------------- | ----- | ---------------------------- |
| `whoami`                                     | Hangi kurulum ve kullanıcı olduğunuzu söyler.                                               |       |                              |
| `get_diagnostics`                            | Sürümü, kurulum kontrollerini, tablo sayılarını, son 25 denetimi ve kota sayaçlarını verir. |       |                              |
| `list_projects`                              | Projelerinizi sıralar. Her araç bir proje numarası ister.                                   |       |                              |
| `create_project`                             | Yeni proje açar.                                                                            | Evet  |                              |
| `get_project_context`                        | Proje bilgisi ekranını okur.                                                                |       |                              |
| `update_project_context`                     | Proje bilgisini değiştirir ve araştırma günlüğüne not düşer.                                | Evet  |                              |
| `get_search_console_performance`             | Tıklama, gösterim, oran ve sırayı sorgu, sayfa, ülke, cihaz ya da tarihe göre verir.        |       |                              |
| `get_search_opportunities`                   | Search Console ve Analytics'ten fırsat listesi çıkarır.                                     |       |                              |
| `get_cannibalization`                        | Aynı aramada birbiriyle yarışan sayfaları gösterir.                                         |       |                              |
| `get_ranking_history`                        | Bilgisayarınızdaki sıralama arşivini verir, 16 aydan eskiyi tutmaz.                         |       |                              |
| `get_index_coverage`                         | Daha önce kaydedilmiş Google dizin cevaplarını verir, Google'a sormaz.                      |       |                              |
| `inspect_urls`                               | Google'a sayfaların durumunu sorar, çağrı başına 10 adres.                                  | Evet  | Günde 2.000, mülk başına     |
| `get_sitemaps`                               | Search Console'daki site haritası durumunu gösterir.                                        |       |                              |
| `run_site_audit`                             | Site denetimini başlatır.                                                                   | Evet  | PageSpeed, hız ölçümü açıksa |
| `get_audit_status`                           | Denetimin hangi aşamada olduğunu söyler, takılan denetimi başarısız işaretleyebilir.        |       |                              |
| `get_audit_issues`                           | Bulunan sorunları düzeltme adımlarıyla verir.                                               |       |                              |
| `get_audit_pages`                            | Taranan sayfaları sıralar.                                                                  |       |                              |
| `get_google_analytics_organic_overview`      | Aramadan gelen ziyaretlerin özetini ve önceki dönemi verir.                                 |       |                              |
| `get_google_analytics_organic_landing_pages` | Aramadan gelenlerin ilk girdiği sayfaları sıralar.                                          |       |                              |
| `get_google_analytics_page_performance`      | Sayfaların görüntülenme ve etkileşimini verir.                                              |       |                              |
| `get_google_analytics_traffic_acquisition`   | Ziyaretçilerin kanal, kaynak ve kampanyaya göre dağılımını verir.                           |       |                              |
| `get_google_analytics_key_events`            | Analytics'te anahtar olarak işaretlenen olayları verir.                                     |       |                              |
| `get_google_analytics_ecommerce_performance` | Ürün satışlarını verir.                                                                     |       |                              |
| `get_google_analytics_site_search`           | Ziyaretçilerin sitenizdeki arama kutusuna yazdığı terimleri verir.                          |       |                              |
| `get_google_analytics_audience_breakdown`    | Ziyaretçileri cihaz, ülke, yeni ve geri dönen diye ayırır.                                  |       |                              |
| `get_google_analytics_measurement_health`    | Ölçüm kurulumunu kontrol eder, rapor hakkı harcamaz.                                        |       |                              |
| `list_saved_keywords`                        | Kaydettiğiniz kelimeleri sıralar.                                                           |       |                              |
| `save_keywords`                              | Kelime kaydeder.                                                                            | Evet  |                              |
| `list_reports`                               | Raporlarınızı sıralar.                                                                      |       |                              |
| `get_report`                                 | Bir raporu okur, istenirse HTML halini de verir.                                            |       |                              |
| `save_report`                                | Rapor kaydeder ya da var olanı günceller.                                                   | Evet  |                              |
| `list_report_templates`                      | Rapor şablonlarını okur.                                                                    |       |                              |
| `save_report_template`                       | Rapor şablonu kaydeder.                                                                     | Evet  |                              |

Analytics araçları Google'ın Analytics rapor hakkından harcar (standart mülkte günde 200.000 birim). Bu hakkı uygulamada **Ayarlar** ekranındaki Sınırlar bölümünden izlersiniz.

## Hazır görev şablonları (beceriler)

| Şablon              | Ne zaman kullanılır                                                                                                | Ne üretir                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| `seo-coach`         | "Ne yapmalıyım" diye sorunca. Yolu anlatır, sonraki adımı önerir.                                                  | Sohbet, gerekirse koçluk notu                 |
| `seo-project-setup` | Yeni projede. İşinizi, hedefinizi, rakiplerinizi, önemli sayfalarınızı sorar, Proje bilgisi ekranını doldurur.     | Dolu proje bilgisi, kayıtlı kelimeler         |
| `seo-audit`         | "Siteyi denetle" deyince. Denetimi çalıştırır, Search Console ile birleştirir, "bu hafta yapılacak tek iş"i seçer. | Tek sayfalık denetim raporu                   |
| `seo-triage`        | Ziyaret düşünce. Düşüşün gerçek olup olmadığına, nerede ve ne zaman olduğuna bakar.                                | Düşüş incelemesi raporu                       |
| `seo-check-in`      | Ayda bir. Bu dönemi öncekiyle karşılaştırır.                                                                       | Aylık kontrol raporu; her ay bir tane birikir |
| `seo-report`        | Öteki şablonlar bitince. Tek dosyalık HTML rapor yazar ve kaydeder.                                                | **Raporlar** ekranında rapor                  |

## Kontrol

- Asistana "whoami aracını çağır" deyin. Kurulum kimliğini söylemeli.
- **Ajan kurulumu** ekranındaki rozet **Bağlandı** demeli ve son çağrı zamanı görünmeli.
- "list_projects" projelerinizi sıralamalı.

## Sık sorulanlar

**Asistan verimi dışarı gönderir mi?** Asistan hangi modeli kullanıyorsa veri oraya gider. Bu, asistanın kendi gizlilik şartlarına bağlıdır. Uygulama yalnızca bilgisayarınızdaki bağlantıya cevap verir.

**Parolasız çalışır mı?** Docker'da `MCP_TOKEN=off` ile çalışır. Windows paketinde parola her zaman açıktır. Parolasız bağlantıda aynı bilgisayardaki her program 33 aracı çağırabilir.

**Asistan Google hakkımı bitirebilir mi?** `inspect_urls` ve `run_site_audit` harcar. Şablonlar görev başına en fazla 20 adres sorar. Denetimi yalnızca siz isteyince başlatırlar. Asistanınıza da aynı sınırı söyleyin.

**Hangi asistan daha iyi?** Fark etmez, araçlar aynı. Kurulum metni Claude Code, Codex ve Cursor için hazır. Öteki asistanlar MCP'yi destekliyorsa aynı adres ve parolayla çalışır.

## Sorun çıkarsa

- **Asistan 401 hatası alıyor.** Parola yanlış ya da gönderilmiyor. Dosyadaki değeri yeniden kopyalayın. Sonunda satır sonu karakteri kalmasın.
- **Bağlantı reddediliyor.** Uygulama kapalıdır. Görev çubuğu simgesine ya da `docker compose ps` çıktısına bakın.
- **Asistan "araç bulunamadı" diyor.** Bağlantıyı yeniden yükleyin. Claude Code'da `/mcp` yazıp **Reconnect** deyin.
- **Şablonlar görünmüyor.** Kurulum metnini yeniden yapıştırın. Şablonlar asistanın kendi klasörüne kopyalanır (Codex'te `$HOME/.agents/skills`).

<!-- Kaynaklar: src/routes/_app/ai.tsx; src/client/features/ai-mcp/agentInstallPrompt.md; agentSetupPrompt.ts; src/server/mcp/server.ts (33 araç); src/server/mcp/token-auth.ts; transport.ts; .agents/skills/setup-seotracker/SKILL.md; .agents/skills/*/SKILL.md; packaging/windows/launcher/SeoWatcher.cs; docker-entrypoint.sh -->
