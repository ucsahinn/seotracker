# seotracker — Eksiksiz Yapılacaklar, Alınacaklar ve Geliştirme Listesi

> **Durum (2026-09-19): planın tamamı uygulandı.** Faz 0'dan 8'e kadar her aşama bitti ve her
> biri kendi doğrulamasıyla commit edildi. Son durum: 543 test geçiyor, `ci:check` (biçim, ölü
> kod, tip kontrolü, lint) temiz, Docker imajı derleniyor ve çalışan konteyner üzerinde uçtan
> uca doğrulama yapıldı (`pnpm run verify:local`).
>
> Aşağıdaki envanter tarihsel kayıttır. Dosya yolları planın yazıldığı günkü hâli gösterir;
> çoğu artık silinmiş ya da yeniden adlandırılmıştır. Neyin nasıl yapıldığını görmek için git
> geçmişine bakın: her commit ne değiştiğini ve neden öyle yapıldığını anlatır.
>
> **Bilinçli olarak yapılmayan tek şey:** PageSpeed entegrasyonu canlı bir anahtarla
> doğrulanmadı. Anahtarsız kotanın 429 verdiği ve kodun bunu doğru işlediği ölçüldü; asıl
> başarı yolu birim testleriyle ve gerçek yanıt şemasıyla doğrulandı. Anahtar geldiğinde tek
> yapılacak, bir denetim çalıştırıp skorların dolduğunu görmek.

## 0. Bir bakışta

|                                |                                                                                                                                                                                        |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Ne yapıyoruz**               | OpenSEO'yu fork edip ücretli veri gerektiren her şeyi söküyor, geriye kalan ücretsiz çekirdeği Türkçeleştirip kendi aracına çeviriyoruz                                                |
| **Neden**                      | Yazılım ücretsiz ama rakip analizi verisi üçüncü taraf bir servisten satın alınıyor. Kendi sitelerin için gereken veri Google'dan zaten bedava geliyor                                 |
| **Ne kalıyor**                 | Search Console, Google Analytics 4, teknik site denetimi (28 sorun türü), PageSpeed hız skorları, raporlar, Claude Code için 28 MCP aracı                                              |
| **Ne gidiyor**                 | Rakip analizi, anahtar kelime araştırması, backlink, yapay zeka arama görünürlüğü, ücretli sıralama takibi, faturalandırma, uygulama içi yapay zeka ajanı, telemetri, pazarlama sitesi |
| **Sen ne yapacaksın**          | GitHub'da fork, bir Google Cloud projesi ve iki anahtar (§3). Hepsi ücretsiz, kart istemiyor                                                                                           |
| **Kaç aşama**                  | 9 faz. Her fazın sonunda uygulama açılıyor ve doğrulama kapısından geçiyor (§7)                                                                                                        |
| **Yeni kod yazılacak tek yer** | Hız skorlarının kaynağını değiştirmek (Faz 3) ve Faz 8'deki dört yeni özellik                                                                                                          |

## 1. Bağlam

- 2026-09-19: `github.com/every-app/open-seo` (OpenSEO, MIT lisansı, telif Ben Senescu)
  `C:\Users\ulasc\Desktop\open-seo` altına klonlandı ve Docker Compose ile ayağa kaldırıldı
  (`ghcr.io/every-app/open-seo:latest`, konteyner `open-seo-open-seo-1`, `http://localhost:3001`,
  `AUTH_MODE=local_noauth`). Sağlık ucu 200 döndü; DataForSEO anahtarı yok, uyarı veriyor.
- OpenSEO'nun kendisi ücretsiz, ama rakip analizi / anahtar kelime hacmi / backlink / rank tracking
  verisi ücretli DataForSEO API'sinden geliyor (min. 50 USD yükleme). Kullanıcı bunu istemiyor.
- Hedef: OpenSEO'yu fork edip yalnızca **ücretsiz veri kaynaklarıyla** çalışan kişisel bir araca
  dönüştürmek. Adı **seotracker**. Kendi siteleri için (ör. siberdergi.net, vaultpilot.io) Search
  Console verisi, GA4 verisi, teknik site denetimi ve Claude Code'dan MCP ile erişim.

## 2. Korunan kararlar (kullanıcı onaylı, değiştirilmeyecek)

| Karar             | Değer                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Yaklaşım          | OpenSEO fork edilip budanır; sıfırdan yazılmaz                                                                                                                           |
| İsim              | `seotracker`                                                                                                                                                             |
| Repo              | GitHub'da **public fork** (upstream `every-app/open-seo` remote olarak kalır)                                                                                            |
| Çalışma yeri      | **Sadece bu bilgisayarda Docker**; Cloudflare deploy yolu silinir                                                                                                        |
| Arayüz dili       | **Türkçe** (tam çeviri)                                                                                                                                                  |
| Yapay zeka        | SAM sohbet ajanı **silinir**; MCP sunucusu **kalır** (Claude Code mevcut abonelikle kullanır)                                                                            |
| Ücretli veri      | DataForSEO ve ona bağlı her özellik silinir: rakip/domain analizi, keyword araştırması, backlink, AI arama görünürlüğü, DataForSEO tabanlı rank tracking, faturalandırma |
| Ücretsiz kalanlar | Google Search Console, Google Analytics 4, kendi tarayıcısıyla site denetimi, raporlar, projeler, ayarlar, MCP                                                           |
| Lighthouse        | DataForSEO yerine Google **PageSpeed Insights API** (ücretsiz)                                                                                                           |
| Rank tracking     | GSC "ortalama sıralama" verisiyle, kendi siteler için, ücretsiz                                                                                                          |
| Lisans            | MIT metni ve `Copyright (c) 2026 Ben Senescu` satırı korunur; ad/marka değişir                                                                                           |
| Telemetri         | openseo.so'ya giden anonim heartbeat tamamen kaldırılır                                                                                                                  |

Tarama sonrası eklenen teknik kararlar (gerekçesi §4 ve §5'te):

| Karar                      | Değer                                                                                                                                                             |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `badseo/` fixture sitesi   | **KALIR** — denetim motorunun tek regresyon testi, üstelik ücretsiz özellik                                                                                       |
| `e2e/` Playwright testleri | SİLİNİR — yalnız silinen iki ücretli sayfayı kapsıyor                                                                                                             |
| Wrangler kaynak kimlikleri | **DEĞİŞMEZ** — miniflare yerel dosya adlarını bu değerlerin özetinden türetiyor                                                                                   |
| Kimlik doğrulama           | Yalnız `local_noauth`; hosted ve Cloudflare Access dalları silinir, Better Auth çekirdeği token şifrelemesi için kalır                                            |
| Çeviri yöntemi             | Doğrudan tek dilli çeviri, çok dilli altyapı kurulmaz                                                                                                             |
| Google Analytics 4         | **KALIR** — 7 rapor türü, 11 MCP aracı ve Search Console ile birleşik "arama fırsatları" ekranı korunur                                                           |
| Veritabanı                 | **Yalnız SQLite.** Postgres desteği tamamen sökülür; her tablonun ikiz tanımı ve eşitlik testi ortadan kalkar                                                     |
| Çeviri kapsamı             | Arayüz ve kurulum dokümanları Türkçe. **MCP araç açıklamaları İngilizce kalır** — onları Claude okuyor, İngilizce açıklamalar araç seçimini daha isabetli yapıyor |
| Faz 8                      | Dördü de planlanır: Search Console geçmiş arşivi, GSC tabanlı sıralama takibi, Çekirdek Web Verileri saha verisi, zamanlanmış haftalık denetim                    |

## 3. Alınacaklar (hesap, anahtar, araç) — tamamı ücretsiz, hiçbiri kart istemiyor

Sıra önemli: 3.2'deki OAuth istemcisi olmadan Search Console bağlanmaz, o olmadan uygulamanın
ücretsiz çekirdeği boş kalır.

### 3.1 GitHub

- Kullanıcı `every-app/open-seo` reposunu kendi hesabına **fork** eder (public).
- Fork klonlanır, upstream uzak deposu eklenir: `git remote add upstream https://github.com/every-app/open-seo.git`.
- Mevcut `Desktop\open-seo` klasörü bozulmadan durur; iş yeni klasörde (`Desktop\seotracker`) yürür.

### 3.2 Google Cloud — tek proje, tek OAuth istemcisi iki entegrasyona birden yeter

1. Yeni proje oluştur (ör. "seotracker").
2. Etkinleştirilecek API'ler:
   - **Google Search Console API** (`searchconsole.googleapis.com`) — zorunlu.
   - **Google Analytics Admin API** (`analyticsadmin.googleapis.com`) ve **Google Analytics Data API** (`analyticsdata.googleapis.com`) — yalnız GA4 tutulacaksa.
   - **PageSpeed Insights API** (`pagespeedonline.googleapis.com`) — Lighthouse yerine geçecek.
3. OAuth consent screen: **External**, yayın durumu **Testing**. Test users listesine kendi Google hesabını ekle. Testing modunda doğrulama başvurusu gerekmez; kişisel kullanım için yeterli.
4. OAuth client ID: tür **Web application**. Yetkili yönlendirme adresleri (şema, host, port birebir, sonda eğik çizgi yok):
   - `http://localhost:3001/api/gsc/oauth/callback`
   - `http://localhost:3001/api/ga4/oauth/callback` (GA4 tutulacaksa)
   - Çıktı: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`.
5. API key (PageSpeed Insights için, ayrı): Credentials → Create credentials → API key. Kısıtlama: yalnız PageSpeed Insights API. Anahtarsız da çalışır ama kota çok düşüktür; anahtarlı kota günde 25.000 sorgu, dakikada 240.

### 3.3 Ortam değişkenleri (`.env`)

| Değişken                                   | Nereden                                                                                                                                                                         |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` | 3.2 adım 4                                                                                                                                                                      |
| `BETTER_AUTH_SECRET`                       | Kendin üret, **en az 32 karakter**. `openssl rand -base64 32`. Bu değer OAuth token'larını diskte şifreliyor; 32 karakterin altındaysa Search Console sessizce devre dışı kalır |
| `PAGESPEED_API_KEY`                        | 3.2 adım 5 (yeni değişken, kodda henüz yok, Faz 3'te eklenecek)                                                                                                                 |
| `AUTH_MODE=local_noauth`, `PORT=3001`      | Zaten `compose.yaml` içinde                                                                                                                                                     |
| `DATAFORSEO_API_KEY`, `OPENROUTER_API_KEY` | **Gerekmiyor**, bu satırlar silinecek                                                                                                                                           |

`.env` değişince konteyner `docker compose up -d --force-recreate` ile yeniden oluşturulmalı; düz `up -d` değişikliği uygulamıyor.

### 3.4 Search Console tarafı

- Takip edilecek her site Search Console'da **doğrulanmış** olmalı, yoksa bağlantı kurulur ama site listesi boş gelir.
- Domain özelliği (`sc-domain:example.com`) veya URL öneki, ikisi de çalışır.

### 3.5 Makinede hazır olanlar (doğrulandı)

Docker 29.7.2 ve Compose 5.5.0 çalışıyor, Node 25.9.0 kurulu. `pnpm` yok ama gerekmiyor: derleme konteyner içinde kendi pnpm'iyle yapılıyor. Yerel geliştirme yapılacaksa `corepack enable` yeterli.

## 4. Sökülecekler (dosya/dizin envanteri — ajan taramasıyla doğrulandı)

Kısaltma: ÜCRETLİ = DataForSEO ve/veya Autumn faturalandırmasına bağlı. Her satır silinir.

### 4.1 Rotalar (`src/routes/`)

| Dosya                                                                                               | Ne                                                                          |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `_project/p/$projectId/keywords.tsx`                                                                | Keyword araştırması                                                         |
| `_project/p/$projectId/domain.tsx`                                                                  | Rakip domain analizi                                                        |
| `_project/p/$projectId/backlinks.tsx`                                                               | Backlink                                                                    |
| `_project/p/$projectId/brand-lookup.tsx`, `prompt-explorer.tsx`                                     | AI arama görünürlüğü                                                        |
| `_project/p/$projectId/rank-tracking.tsx`, `rank-tracking/index.tsx`, `rank-tracking/$configId.tsx` | DataForSEO SERP tabanlı rank tracking (GSC değil, doğrulandı)               |
| `_project/p/$projectId/sam.tsx`                                                                     | SAM ajanı                                                                   |
| `_app/billing.tsx`, `_authenticated.subscribe.tsx`, `api/autumn/$.ts`                               | Faturalandırma / paywall                                                    |
| `_app/help/dataforseo-api-key.tsx`, `_app/help/openrouter-api-key.tsx`                              | Anahtar yardım sayfaları                                                    |
| `[.well-known]/openai-apps-challenge.ts`, `mockups.signup.tsx`                                      | OpenAI Apps doğrulaması, tasarım mockup'ı (ölü ağırlık)                     |
| `_project/p/$projectId/audit/issues/$resultId.tsx`                                                  | Lighthouse sorun ekranı → PSI'ye geçince **korunur ve uyarlanır** (bkz. §5) |

Her rota silme sonrası `src/routeTree.gen.ts` yeniden üretilir (satır 44 şu an `help/dataforseo-api-key` import ediyor).

### 4.2 Menü (`src/client/navigation/items.ts`, `src/client/components/Sidebar.tsx`)

- "Research" grubu tamamen gider: Keyword Research, Domain Overview, Backlinks, Brand Lookup, Prompt Explorer.
- "My Site" grubundan Rank Tracking gider. Kalan: GSC Insights, Saved Keywords, Site Audit.
- `dataforseoHelpLinkOptions` (`items.ts:151`) ve tüketicileri `AppShellParts.tsx:5,25,46,132`.
- Sidebar Browse/Chat sekmeleri ve `SamSidebarPanel` (`Sidebar.tsx:24,173-188`), footer "Billing" (`Sidebar.tsx:29`).
- `SeoApiStatusBanners`, `MissingSeoSetupModal` (`AppShell.tsx:5-9,16,58`) — DataForSEO anahtar uyarıları.
- Dashboard "Explore a competitor" adımı (`dashboard/DashboardSetupAction.tsx:52`, `dashboardSteps.ts:25`) ve backlink kartı (`DashboardCards.tsx:207-290`).

### 4.3 Sunucu özellik klasörleri (`src/server/features/`)

| Klasör                                                                                                                        | Karar                                                         |
| ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `ai-search/`, `backlinks/`, `domain/`, `rank-tracking/`, `sam/`                                                               | SİL                                                           |
| `keywords/services/research/{research-data,refresh-metrics,serp,research,selection}.ts`                                       | SİL (`saved-keywords.ts`, `helpers.ts`, repository'ler kalır) |
| `dashboard/repositories/BacklinkSnapshotRepository.ts` + `DashboardService.ts` içindeki `ensureBacklinkSnapshot` (`:251-271`) | SİL                                                           |
| `activation/`, `audit/`, `ga4/`, `google/`, `gsc/`, `project-context/`, `projects/`, `reports/`                               | KALIR                                                         |
| `lighthouse/`                                                                                                                 | UYARLANIR (PSI)                                               |

### 4.4 İstemci özellik klasörleri (`src/client/features/`)

| Klasör                                                                                                                                                                               | Karar     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `ai-search/`, `backlinks/` (27 dosya), `domain/` (30), `keywords/`, `rank-tracking/` (30), `sam/`, `billing/`, `search-tabs/`                                                        | SİL       |
| `dashboard/` (backlink kartı ve competitor adımı çıkar), `saved-keywords/` (metrik yenileme düğmesi ve ücretli sütunlar çıkar, `saved.tsx:41,200`), `lighthouse/` (PSI'ye uyarlanır) | UYARLANIR |
| `ai-mcp/`, `audit/`, `auth/`, `ga4/`, `gsc/`, `integrations/`, `onboarding/`, `projects/`, `reports/`, `search-performance/`, `settings/`, `team/`                                   | KALIR     |

### 4.5 Kütüphane ve paylaşılan modüller

| Modül                                                                                                                                          | Karar                                                                                                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/server/lib/dataforseo/` (24 dosya)                                                                                                        | SİL                                                                                                                                         |
| `src/server/lib/dataforseoBillingClassification.ts`, `dataforseoLlmSchemas.ts`, `dataforseoLighthousePayload.ts` (+testler)                    | SİL                                                                                                                                         |
| `src/server/lib/dataforseoBacklinksTarget.ts`                                                                                                  | **KALIR, yeniden adlandırılır** (`domainTarget.ts` gibi): saf domain normalize edici, `projects.ts:9` ve `contextUpdateOps.ts:1` kullanıyor |
| `src/server/lib/scrape.ts`, `openrouter.ts`, `chatAgent.ts`, `just-bash-stub.ts`, `workers-ai-provider-stub.ts`                                | SİL (yalnız SAM)                                                                                                                            |
| `src/server/billing/` (12 dosya), `src/server/referrals/dub*.ts`                                                                               | SİL                                                                                                                                         |
| `src/shared/billing.ts`, `billing-credit-features.ts`, `rank-tracking.ts`, `researchScope.ts`, `serp-location-search.ts`, `targetDetection.ts` | SİL                                                                                                                                         |
| `src/shared/keyword-locations.ts`                                                                                                              | UYARLANIR (proje "market" alanı ve MCP şemaları kullanıyor)                                                                                 |
| `src/server/lib/market.ts`                                                                                                                     | UYARLANIR (`assertLabsLocationCode` çıkar, `assertLanguageForLocation` kalır)                                                               |
| `src/client/components/SerpLocationCombobox.tsx`, `ResearchScopeSelect.tsx`                                                                    | SİL; `LocationSelect.tsx` kalır                                                                                                             |
| `src/serverFunctions/serp-locations.ts`, `ai-search.ts`, `config.ts` içindeki `getSeoApiKeyStatus`                                             | SİL                                                                                                                                         |
| `src/routes/__root.tsx:12` `AutumnProvider`                                                                                                    | SİL (tüm ağacı sarıyor)                                                                                                                     |

### 4.6 MCP araçları (`src/server/mcp/tools/`)

SİL: `dataforseo-research-tools.ts`, `research-keywords`, `get-serp-results.ts`, `local-seo-tools.ts`, `search-serp-locations.ts` (kayıt: `server.ts:24,183`), `get-backlinks-overview.ts`, `get-backlinks-profile.ts`, `rank-tracking-management-tools`.
UYARLA: `whoami.ts` (Autumn kredi bakiyesi satırı çıkar), `context.ts:6` (`BillingCustomerContext` tipi kaldırılır), `create-project` (DataForSEO konum kodu doğrulaması).
KALIR: `project-auth`, `create-project`, `google-analytics-tools`, `project-context`, `report-tools`, `saved-keywords-tools`, `search-console-tools`, `tool-test-support.ts`.

### 4.7 Veritabanı

- Şema dosyaları hem `src/db/*.schema.ts` hem `src/db/pg/*` ikizinden **birlikte** silinir/düzenlenir; `src/db/schema.ts` barrel'ının üç bölgesi (`:36-46`, `:48-75`, `:80-116`), `src/db/d1/schema.ts`, `src/db/pg/schema.ts` ve `schema-parity.test.ts` birlikte güncellenir.
- SİL: `billing.schema.ts`, `sam.schema.ts`; `app.schema.ts` içinden `keyword_metrics`, `rank_tracking_configs`, `rank_tracking_keywords`, `rank_check_runs`, `rank_snapshots`, `backlink_snapshots`.
- KALIR: `audit.schema.ts` (4 tablo, `audit_lighthouse_results` PSI verisi tutacak), `ga4`, `gsc`, `project-context`, `reports`, `report-templates`, `telemetry` (bkz. §5, telemetri silinince bu da gider), `better-auth-schema.ts` (local_noauth da bu tablolara dayanıyor).
- **Mevcut migration dosyalarına dokunulmaz** (`drizzle/` 48 dosya, `drizzle-pg/` 26 dosya, `meta/` snapshot'lar). Eski tablolar yetim kalabilir. `db:generate` bilinçli olarak tek seferde çalıştırılıp `DROP TABLE` migration'ı üretilir (Faz 6).

### 4.8 Cloudflare binding'leri ve giriş noktaları

| Binding                                                                                                                    | Karar                                                              |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `RANK_CHECK_WORKFLOW` (`wrangler.jsonc:34-38`, `src/server.ts:182`, `workflows/RankCheckWorkflow.ts`, `rankCheckPaths.ts`) | SİL                                                                |
| `SAM_CHAT` Durable Object (`wrangler.jsonc:45-52`, `src/server.ts:66-126,153-155,184`)                                     | SİL + `v6 { deleted_classes: ["SamChatAgent"] }` migration etiketi |
| `SITE_AUDIT_WORKFLOW`, `AUDIT_SCRATCHPAD`, `AUDIT_ENGINE`, `KV`, `OAUTH_KV`, `DB`, `R2`                                    | KALIR                                                              |
| Cron `*/5`: `runScheduledRankChecks` çağrısı (`server.ts:233`) çıkar, `reconcileStaleAudits` kalır                         | UYARLA                                                             |
| Cron `17 3`: `sweepDubReferredOrganizations` (`server.ts:213`) çıkar, OAuth purge kalır                                    | UYARLA                                                             |
| `src/env.d.ts`: `DATAFORSEO_API_KEY`, `AUTUMN_*`, `DUB_API_KEY`, `OPENROUTER_*`                                            | SİL                                                                |
| `alchemy.run.ts:399` audit worker'a DataForSEO/Autumn secret geçişi                                                        | Dosya zaten siliniyor (Cloudflare deploy yok)                      |

### 4.9 Testler

- Silinen özelliklerle birlikte giden test dosyaları: DataForSEO lib (12), ai-search (6), backlinks (5), domain (3), keywords research (5), rank tracking (12), SAM (4), billing (8), referrals (1), ücretli MCP araçları (9), search-tabs (1), shared ücretli (5), `e2e/` dizininin tamamı + `playwright.config.ts` + `test:e2e*` script'leri.
- Düzenlenecek testler: `lib/audit/lighthouse.test.ts`, `features/lighthouse/services/lighthouse-export.test.ts`, `lib/lighthouseStoredPayload.test.ts`, `audit/services/AuditService.limitTier.test.ts`, `projects.test.ts`, `mcp/tools/create-project.test.ts`, `saved-keywords-tools.test.ts`, `mcp/context.test.ts`, `mcp/instrumentation.test.ts`, `db/schema-parity.test.ts`, `shared/error-codes.test.ts`, `client/lib/error-messages.test.ts`, `shared/selfhost-checks.test.ts`, `lib/selfhost-preflight.test.ts`, `dashboard/{DashboardOnboarding,dashboardSteps}.test.ts`.
- KALIR: `mcp/tools/tool-test-support.ts`, `ga4/services/ga4-test-fixtures.ts`.

### 4.10 Script'ler, dokümanlar, spec'ler

- `scripts/backlinks-cost-profile.ts`, `brand-lookup-cost-profile.ts`, `dataforseo-account-usage.ts`, `seed-rank-tracking.ts`, `repair-rank-tracking-locations.ts` ve package.json'daki `billing:*`, `seed:rank-tracking`, `repair:rank-locations` script'leri.
- `docs/DATAFORSEO_API_KEY.md`; `specs/0002-hosted-dataforseo-metering-with-autumn.md`, `0004-keyword-data-source-routing.md`, `0005-`/`0006-onboarding-agent*.md`, `0008-local-rank-tracking-locations.md`.
- Ajan skill'leri: `.agents/skills/` ve `plugins/openseo/skills/` ikiz ağaçlarından `competitive-landscape`, `competitor-analysis`, `keyword-clustering`, `keyword-research`, `link-prospecting`, `local-seo` **iki ağaçtan birden** silinir (`ci:check` içindeki `sync-plugin-skills` farkı yakalar).

### 4.11 Çapraz bağımlılık düğümleri (stub gerekenler)

| Yer                                                                                                                                                                        | Yapılacak                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `features/audit/services/AuditService.ts:32-47` `resolveAuditLimitTier`                                                                                                    | Autumn çağrıları çıkar, her zaman `"self_hosted"` döner        |
| `workflows/SiteAuditWorkflow.ts:13`, `siteAuditWorkflowPhases.ts:2,225-226`                                                                                                | `BillingCustomerContext` tipi ve parametresi kaldırılır        |
| `client/features/audit/launch/LaunchFormCard.tsx:7`                                                                                                                        | `SUBSCRIBE_ROUTE` importu ve paywall dalı kaldırılır           |
| `routes/_app/index.tsx:15`, `Sidebar.tsx:29`, `AppShell.tsx:12`                                                                                                            | `BILLING_ROUTE`/`SUBSCRIBE_ROUTE` kaldırılır                   |
| `client/features/team/organizationQueries.ts`                                                                                                                              | `useCanManageBilling` ve tüketicileri kaldırılır               |
| `search-performance/SearchPerformanceParts.tsx:37,299-318` → `saveKeywords`                                                                                                | KALIR (GSC'den kayıtlı kelimeye yazma ücretsiz)                |
| `lib/selfhost-preflight.ts:3,123-151`, `lib/setup-status.ts:27`, `shared/selfhost-checks.ts:34-37`, `shared/error-codes.ts:17,30,40`, `client/lib/error-messages.ts:22-26` | DataForSEO kontrolü, anahtar doğrulayıcı ve hata kodları çıkar |
| `vite-plugin-lean-worker-bundle.ts`                                                                                                                                        | `autumn-js` tembel-yükleme iddiası kaldırılır (paket gidiyor)  |

### 4.12 Telemetri (tamamı kaldırılır — openseo.so'nun PostHog projesine gidiyor)

| Ne                                                                          | Yer                                                                                                         |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| PostHog proje anahtarı ve `https://us.i.posthog.com` ucu                    | `src/server/lib/self-host-telemetry.ts:24-26`, `scripts/selfhost-preflight.ts:17-19`                        |
| Çalışma zamanı heartbeat (`self_host.heartbeat`, her istekte `waitUntil`)   | `self-host-telemetry.ts:225-245`, çağrı `src/server.ts:27,143`                                              |
| MCP araç çağrısı sayacı                                                     | `src/server/mcp/instrumentation.ts:9,45`                                                                    |
| Preflight başarısızlık beacon'ı (`self_host.preflight_failed`, ham `fetch`) | `scripts/selfhost-preflight.ts:31-53,61-66`                                                                 |
| Opt-out mantığı (`OPENSEO_TELEMETRY_DISABLED`, `DO_NOT_TRACK`)              | `src/shared/selfhost-checks.ts:45-53`; `compose.yaml:12,19-20`; `docker-entrypoint.sh:10` bildirimi         |
| `telemetry_state` tablosu                                                   | `src/db/telemetry.schema.ts`, `src/db/pg/telemetry.schema.ts`, barrel'lar; migration dosyalarına dokunulmaz |
| Testler                                                                     | `self-host-telemetry.test.ts`, `mcp/instrumentation.test.ts`, `selfhost-checks.test.ts` (kısmen)            |
| Bağımlılık                                                                  | `posthog-node` (heartbeat kalkınca ölür), `posthog-js` (yalnız hosted)                                      |

### 4.13 Hosted / SaaS kodu (local_noauth'ta zaten erişilemez; çeviri emeği boşa gitmesin diye çeviriden ÖNCE silinir)

- **PostHog ürün analitiği:** `src/client/lib/posthog.ts`, `posthog-sanitize.ts`(+test), `src/server/lib/posthog.ts`; env `POSTHOG_PUBLIC_KEY`/`POSTHOG_HOST` (`src/env.d.ts:28-29,69-70`, `vite.config.ts:28-29`, `docker-entrypoint.sh:25`); `sourcemaps:upload` script'i; ayarlar sayfasındaki "Help improve OpenSEO" anahtarı (`_app/settings/index.tsx:88-116`).
- **Turnstile captcha:** `src/lib/auth-turnstile.ts`(+test), `client/features/auth/TurnstileWidget.tsx`, env `TURNSTILE_*`.
- **Hosted auth arayüzü:** `_auth.sign-in.tsx`, `_auth.sign-up.tsx`, `forgot-password.tsx`, `reset-password.tsx`, `verify-email.tsx`, `auth-error.tsx`, `accept-invitation.$id.tsx`, `_authenticated.subscribe.tsx`, `client/features/auth/*`, `middleware/ensure-user/hosted.ts`, `BYPASS_EMAIL_VERIFICATION` dalları.
- **E-posta (Loops.so):** `src/server/email/loops.ts`, `loops-client.ts`; `LOOPS_*` env. (`mimetext` bizim değil, `agents` paketinin geçişli bağımlılığı; SAM gidince gider.)
- **Ekip / çoklu kullanıcı:** `client/features/team/` (4 dosya), `server/auth/workspace-merge.ts`(+test), `default-hosted-organization.ts`, `specs/0011`.
- **GDPR silme ucu:** `src/server/gdpr/storage-erasure.ts`, `shared/gdpr-erasure.ts`, `scripts/erase-user-data.ts`, `runbooks/gdpr-erasure.md`, `server.ts:28,148-150`.
- **MCP OAuth sağlayıcısı (hosted uzak MCP):** `src/server/mcp/oauth-provider.ts`, `oauth-registration*`, `_authenticated.oauth-consent.tsx`, `OAUTH_KV`, günlük GC cron'u — **karar ajan 2 bulgusuna bağlı** (yerel MCP `handleSelfHostedOpenSeoMcpRequest` kullanıyor, `server.ts:169-174`).
- **KORUNUR:** `src/db/better-auth-schema.ts` ve `user`/`organization` tabloları, `src/server/auth/delegated-organization.ts`, `middleware/ensure-user/delegated.ts` — `local_noauth` modu `admin@localhost` kullanıcısını bu tablolara yazıyor (`delegated.ts:13-17,101-103`). Better Auth sunucu örneği (`src/lib/auth.ts`) MCP API anahtarları için (`apikey` tablosu, `settings/ApiKeySettings.tsx`) sadeleştirilerek kalır.
- **AUTH_MODE:** yalnız `local_noauth` kalır; `cloudflare_access` ve `hosted` dalları (`src/lib/auth-mode.ts`, `middleware/ensure-user/resolve.ts:14-21`, preflight `:35-121`) silinir.

### 4.14 Kök dizin ölü ağırlığı

| Yol                                                                                                                                                                                                                                        | Boyut  | Karar                                                                                                                                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `web/` (openseo.so pazarlama sitesi, 235 dosya, marka geçişlerinin %49'u)                                                                                                                                                                  | 9.5 MB | SİL + `ci.yml`'deki 3 `--dir web` adımı, `knip.jsonc:31`, `tsconfig.json` exclude, `.oxlintrc.json` ignorePatterns, `.prettierignore`                                                                                                   |
| `badseo/` (bozuk SEO fixture sitesi + **denetim motorunun tek regresyon testi**, `badseo/scripts/run-audit.ts`)                                                                                                                            | 300 KB | **KALIR**; `ci:check` içindeki `tsc -p badseo/tsconfig.json` kalır; imaja girmesin diye `.dockerignore`'a eklenir                                                                                                                       |
| `release-notes/` (38 dosya) + `release:*` script'leri + `scripts/release-notes.mjs`, `publish-release.mjs`                                                                                                                                 | 110 KB | SİL                                                                                                                                                                                                                                     |
| `runbooks/`                                                                                                                                                                                                                                | 24 KB  | SİL                                                                                                                                                                                                                                     |
| `specs/`                                                                                                                                                                                                                                   | 128 KB | 0002, 0005, 0006, 0011 SİL; kalanlar mimari referans olarak kalır                                                                                                                                                                       |
| `.greptile/`, `.github/CODEOWNERS`, `CLAUDE.md` "Preserve review learnings" bölümü, `.agents/skills/maintain-greptile-rules/`                                                                                                              | 32 KB  | SİL                                                                                                                                                                                                                                     |
| `plugins/` (openseo.so SaaS'ına işaret eden yayınlanmış eklenti), `.claude-plugin/`, `.cursor-plugin/`, `.opencode/`, `.agents/plugins/`, `scripts/sync-plugin-skills.mjs`, `ci:check`'in son iki cümlesi, `skills-lock.json`              | 130 KB | SİL. `.agents/skills/` içinden ücretsiz araçlara dayanan skill'ler **kalır** (bkz. §5, ajan 2)                                                                                                                                          |
| `chatgpt-app-submission.json`                                                                                                                                                                                                              | 34 KB  | SİL                                                                                                                                                                                                                                     |
| `alchemy.run.ts`, `alchemy.access.ts`, `alchemy.preview-access.run.ts`, `drizzle-prod.config.ts`, `scripts/selfhost-deploy-preflight.mjs`                                                                                                  | 28 KB  | SİL (Cloudflare deploy yok) + `knip.jsonc:4-5,36` + `deploy:*`, `preview:access`, `destroy:preview`, `alchemy` script'leri + devDeps `alchemy`, `@distilled.cloud/cloudflare`, `effect`, `@effect/platform-node`, `chalk`, `cloudflare` |
| `e2e/` (yalnız Domain Overview ve Keyword Research kapsıyor), `playwright.config.ts`, `@playwright/test`, `test:e2e*`                                                                                                                      | 48 KB  | SİL                                                                                                                                                                                                                                     |
| `.github/workflows/pr-preview.yml`, `sourcemaps.yml`, `docker-image.yml`                                                                                                                                                                   | —      | SİL; `ci.yml` kalır (web adımları çıkarılmış hâlde)                                                                                                                                                                                     |
| `docs/`: `MAINTAINERS.md`, `PREVIEW_DEPLOYMENTS.md`, `CONTRIBUTING.md`, `EveryAppLearnings.md`, `SELF_HOSTING_CLOUDFLARE*.md` (3), `DATAFORSEO_API_KEY.md`, `default-project-cleanup.md`, `site-audit-pm-research.md`, `LOCAL_POSTGRES.md` | —      | SİL; kalan: `SELF_HOSTING_DOCKER.md`, `LOCAL_DEVELOPMENT.md`, `SELF_HOSTING_GOOGLE_SEARCH_CONSOLE.md`, `SELF_HOSTING_GOOGLE_ANALYTICS.md` (hepsi Türkçeleştirilip yeniden yazılır)                                                      |
| `package.json` `cloudflare.bindings` (satır 58-76, Deploy düğmesi meta verisi)                                                                                                                                                             | —      | SİL                                                                                                                                                                                                                                     |
| `.gitignore` satır 28 (`/public/build# Sentry Config File` yapıştırma hatası), `.env.sentry-build-plugin`, `dist-sourcemaps/`, `.alchemy/`, preview/production env örnekleri                                                               | —      | Temizle                                                                                                                                                                                                                                 |

### 4.15 Postgres desteğinin sökülmesi (yalnız SQLite kalır)

Kod bugün her tabloyu iki lehçede tanımlıyor ve ikisini senkron tutmak zorunda. Kaldırılması her
ileriki şema değişikliğini yarıya indirir.

| Ne                     | Yer                                                                                                                                                                                                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| İkiz şema ağacı        | `src/db/pg/**` (11 şema + `client.ts`, `retry.ts`, `schema.ts`, `better-auth-schema.ts`)                                                                                                                                                                                                                             |
| Göç dizini             | `drizzle-pg/` (26 dosya, 2.7 MB) ve `drizzle-pg.config.ts`                                                                                                                                                                                                                                                           |
| Lehçe seçici           | `src/db/provider.ts`, `src/db/index.ts` içindeki `withPgClient`, `DATABASE_PROVIDER` değişkeni                                                                                                                                                                                                                       |
| Çift yazma yardımcısı  | `src/db/runBatch.ts` — Postgres işlem dalı çıkar, D1 toplu çağrı dalı kalır                                                                                                                                                                                                                                          |
| İş akışı sarmalayıcısı | `src/server/workflows/pgStep.ts` silinir; `SiteAuditWorkflow.ts:19,49,96` çağrıları düz `step.do` olur. SQLite modunda `withPgClient` zaten boş bir sarmalayıcı, davranış değişmiyor                                                                                                                                 |
| Postgres dalları       | `src/server/features/audit/services/auditReconciler.ts:141`, `src/lib/auth.ts:125`                                                                                                                                                                                                                                   |
| Barrel sadeleşmesi     | `src/db/schema.ts` lehçeye duyarlı kesişim tipi ve çalışma zamanı haritası yerine düz SQLite dışa aktarımı olur                                                                                                                                                                                                      |
| Eşitlik testi          | `src/db/schema-parity.test.ts` silinir (artık eşitlenecek ikinci lehçe yok)                                                                                                                                                                                                                                          |
| Diğer                  | `postgres` bağımlılığı, `HYPERDRIVE` binding'i (zaten yorumda), `db:generate:pg`, `db:migrate:pg`, `auth:generate:pg` script'leri, `scripts/migrate-d1-to-postgres.ts`, `docs/LOCAL_POSTGRES.md`, `knip.jsonc` içindeki `src/db/pg/schema.ts` girdisi, `.oxlintrc.json` içindeki `@/db/pg*` yasak-içe-aktarma kuralı |

Not: `scripts/cli-utils.ts` tüketicilerinin çoğu silinen script'ler. Kalan `seed-projects.ts` ve
`d1-default-project-cleanup.ts` yalnız `parseArgs` kullanıyor; `loadLocalEnv` öksüz kalacağı için
`knip` uyaracak, aynı işlemde temizlenir.

## 5. Korunan ücretsiz çekirdek ve uyarlamalar

### 5.1 Search Console (dokunulmuyor, sadece marka ve dil)

Webmasters v3 `sites.list` ve `searchAnalytics/query` artı URL Inspection. Tamamı senin Google
hesabından, kredi yok. Boyutlar sorgu, sayfa, ülke, cihaz, tarih, arama görünümü. Hazır aralıklar
7 gün ile 16 ay arası, bitiş tarihi bugünden 3 gün geri (Google'ın veri gecikmesi). Satır sınırı
varsayılan 250, en çok 1000.

**Önemli bulgu: hiçbir yerde saklanmıyor, zamanlanmış eşitleme yok.** Her ekran açılışında canlı
Google çağrısı. Sadece proje-site eşleşmesi `gsc_connections` tablosunda tutuluyor.

Arayüz (`search-performance`) üç sekme: **Striking distance** (5-20 arası sıradaki sorgular, en iyi
sayfaya indirgenmiş, en çok 100 satır), Sorgular, Sayfalar. Tıklama, gösterim, tıklama oranı,
ortalama sıra, önceki döneme göre karşılaştırma, CSV ve Google Sheets dışa aktarımı. **İçinde tek bir
DataForSEO izi yok**, anahtar kelime zorluğu sütunu yok.

### 5.2 Site denetimi (tek ücretli çağrısı çıkarılıyor)

Kendi tarayıcısı, düz `fetch`, tarayıcı motoru yok. Keşif robots.txt ve site haritalarından. Eş
zamanlılık 2, sayfa başı 15 saniye zaman aşımı, 429 görünce ortak soğuma. Sayfa bütçesi kendi
kurulumunda sınırsıza yakın (`self_hosted` kademesi, 10.000 sayfa).

**28 sorun türü** üretiyor, hepsi ücretsiz: engellenen sayfa, sunucu hatası, kırık iç bağlantı,
eksik başlık (kritik); yinelenen başlık, yinelenen açıklama, yinelenen içerik, eksik meta açıklama,
eksik veya çoklu H1, yönlendirme zinciri ve döngüsü, canonical çakışması, ince içerik, alt metni
olmayan görseller, yetim sayfa, dış bağlantısı olmayan sayfa (uyarı); başlık ve açıklama uzunluk
sorunları, başlık sırası atlama, yavaş yanıt, noindex, derin sayfa (bilgi).

Sonuçlar üç katmanda: geçici `AuditScratchpad` veritabanı (tarama sınırı, bağlantı grafiği),
uygulama veritabanı (`audits`, `audit_pages`, `audit_issues`), R2 (yalnız Lighthouse yükü).

### 5.3 Lighthouse → PageSpeed Insights geçişi (planın tek gerçek yeni kod işi)

Bugün Lighthouse verisi DataForSEO'dan geliyor. Ama **tüketilen gövde standart Lighthouse
formatında** ve Google'ın ücretsiz PageSpeed Insights v5 API'si birebir aynı yapıyı döndürüyor.
Değişmesi gereken yalnız sağlayıcı sarmalayıcısı.

| Katman                | Dosya                                                                                    | Durum                                                         |
| --------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Sağlayıcı çağrısı     | `src/server/lib/dataforseo/lighthouse.ts`                                                | **Değişecek** → PageSpeed Insights                            |
| Zarf çözme            | `src/server/lib/dataforseoLighthousePayload.ts`                                          | **Değişecek** (yalnız dış zarf; iç gövde aynı)                |
| Kanonik saklama şekli | `src/server/lib/lighthouseStoredPayload.ts`                                              | Değişmiyor (8 metrik eşlemesi, sorun çıkarımı, puan dönüşümü) |
| Okuma ve dışa aktarma | `src/server/lib/lighthousePayload.ts`, `serverFunctions/lighthouse.ts`                   | Değişmiyor                                                    |
| Arayüz                | `client/features/audit/results/ResultsTables.tsx`, `client/features/lighthouse/issues/*` | Değişmiyor                                                    |
| Veritabanı ve R2      | `audit_lighthouse_results`, `site-audit/{projectId}/{auditId}/{pageId}-{strategy}.json`  | Değişmiyor                                                    |

Ücretli olmadığı için iki kısıt gevşiyor: Lighthouse adımının **yeniden deneme sayısı sıfırdı**
(her deneme para demekti), artık denenebilir; örneklem sınırı 10 sayfa × 2 cihaz, kota elverdiği
için sonradan artırılabilir. Ayrıntılı tasarım ve kararlar Faz 3'te.

### 5.4 MCP sunucusu ve ajan becerileri

Yerel modda **kimlik doğrulaması yok**: `/mcp` ucu doğrudan `admin@localhost` kimliğiyle çalışıyor,
token gerekmiyor. Claude Code bağlantısı `http://localhost:3001/mcp` ile kuruluyor.

52 araçtan 28'i ücretsiz kalıyor: proje yönetimi, proje bağlamı, kayıtlı kelimeler, **Search Console
performansı ve URL denetimi**, 11 GA4 aracı ve arama fırsatları, 4 site denetimi aracı, raporlar ve
rapor şablonları. 24 ücretli araç siliniyor.

Beceriler (`.agents/skills/`): **kalan** `seo-audit` (ücretli ek çağrıları çıkarılmış hâlde),
`seo-project-setup` (tek `find_serp_competitors` çağrısı çıkarılır), `seo-coach`, `seo-report`.
**Silinen** `keyword-research`, `keyword-clustering`, `competitive-landscape`, `competitor-analysis`,
`link-prospecting`, `local-seo`.

### 5.5 Raporlar

Veri hattı değil: ajanın yazdığı kendi kendine yeten HTML belgesi veritabanında saklanıyor. PDF
tarayıcının yazdırma penceresinden çıkıyor. Güvenlik modeli sıkı, rapor içeriği düşman kabul
ediliyor: iframe kum havuzu, `default-src 'none'`, JavaScript çalışmıyor. **Paylaşma bağlantısı
hosted'a özel**, yerelde zaten devre dışı.

### 5.6 Kurulum kapısı ve sağlık kontrolleri

Bugün her sayfada DataForSEO anahtarı isteyen tam ekran bir pencere çıkıyor
(`AppShell.tsx` → `MissingSeoSetupModal`) ve kapatılınca kalıcı uyarı şeridine dönüşüyor. Kaynağı
`serverFunctions/config.ts` içindeki `getSeoApiKeyStatus`. Tamamı siliniyor.

Sağlık kontrolleri (`/api/health` ve konteyner açılış denetimi aynı kodu kullanıyor) yeniden
düzenleniyor: `dataforseo` ve `ai` kontrolleri çıkar, `pagespeed` kontrolü eklenir (eksikse uyarı,
engel değil), `auth` kontrolü yalnız yerel moda indirgenir, `gsc` ve `database` kontrolleri kalır.

## 6. Yapılacaklar — fazlar

Sıra tesadüfi değil. Önce silinir, sonra çevrilir: silinecek kodu Türkçeleştirmek saf kayıp olurdu.
Her faz sonunda uygulama açılır ve §7'deki kapıdan geçer; hiçbir faz yarım bırakılmaz.

### Faz 0 — Fork, klon, temel çizgi

1. GitHub'da fork, `Desktop\seotracker` altına klon, `upstream` uzak deposu eklenir.
2. `corepack enable` ile pnpm etkinleştirilir (yerel tip kontrolü ve testler için; derleme yine konteynerde).
3. `pnpm install --frozen-lockfile`, ardından `pnpm test` ve `pnpm exec tsc --noEmit` çalıştırılıp **geçen test sayısı kayda geçirilir**. Sonraki fazlarda bu sayıdan sapma açıklanır.
4. Mevcut `Desktop\open-seo` kurulumu ve konteyneri bozulmadan bırakılır; karşılaştırma için işe yarar.

### Faz 1 — Hosted ve SaaS kabuğunu sök

1. **Kök ölü ağırlık:** `web/`, `release-notes/`, `runbooks/`, `chatgpt-app-submission.json`, `.greptile/`, `.claude-plugin/`, `.cursor-plugin/`, `.opencode/`, `plugins/`, `.agents/plugins/`, `skills-lock.json`, `alchemy.run.ts`, `alchemy.access.ts`, `alchemy.preview-access.run.ts`, `drizzle-prod.config.ts`, `scripts/selfhost-deploy-preflight.mjs`, `e2e/` + `playwright.config.ts`.
2. **CI:** `pr-preview.yml`, `sourcemaps.yml`, `docker-image.yml` ve `CODEOWNERS` silinir. `ci.yml` içindeki üç `--dir web` adımı ve `ci:check` içindeki `sync-plugin-skills` iki cümlesi çıkarılır.
3. **Telemetri:** §4.12'deki her satır. Bu madde tek başına anlamlı: uygulama artık hiçbir yere veri göndermiyor.
4. **Analitik ve SaaS eklentileri:** PostHog, Turnstile, Loops e-posta, Autumn faturalandırma, Dub referans, GDPR silme ucu.
5. **Hosted kimlik doğrulama:** §4.13'teki rota ve klasörler. `AUTH_MODE` yalnız `local_noauth` kalır; `cloudflare_access` ve `hosted` dalları ile `cli-auth.ts` ve `auth:generate*` script'leri gider. Better Auth çekirdeği ve `user`/`organization`/`account` tabloları **kalır**.
6. **Postgres sökümü** (§4.15). Bu adım kendi başına doğrulanır: denetim iş akışı `pgStep` sarmalayıcısını kullandığı için, sökümden sonra bir site denetimi baştan sona çalıştırılıp sonuç alınmadan faz kapanmaz.
7. **Temizlik:** `package.json` bağımlılıkları ve `knip.jsonc` girdileri silinen dosyalarla hizalanır. Ölü script'ler (`deploy:*`, `preview:access`, `destroy:preview`, `alchemy`, `release:*`, `sourcemaps:upload`, `test:e2e*`, `gdpr:erase-user`, `db:*:pg`, `auth:generate*`) kaldırılır.

### Faz 2 — Ücretli özellikleri sök

1. Rotalar ve menü (§4.1, §4.2), ardından `routeTree.gen.ts` yeniden üretilir.
2. İstemci özellik klasörleri (§4.4), sunucu özellik klasörleri (§4.3).
3. DataForSEO kütüphanesi ve paylaşılan modüller (§4.5). Saf domain normalize edici kurtarılıp yeniden adlandırılır.
4. MCP ücretli araçları ve ücretli beceriler (§4.6, §5.4); beceriler iki ağaçtan birden silinir.
5. Çapraz bağımlılık düğümleri çözülür (§4.11): denetim kademesi sabit `self_hosted` olur, `BillingCustomerContext` zinciri sökülür. Denetim iş akışının parametresi faturalandırma nesnesi yerine düz kullanıcı kimliğine indirgenir; bu nesnenin iş akışında tek kullanımı hata kaydı olduğu için kayıpsızdır.
6. **Lighthouse geçici olarak kapatılır:** `lighthouseStrategy` zorla `"none"`. Denetim tam çalışır, yalnız hız skoru gelmez. Bu, Faz 2'nin sonunda uygulamanın ayakta kalmasını sağlar.
7. Kurulum kapısı ve DataForSEO uyarı şeritleri kaldırılır (§5.6).

### Faz 3 — PageSpeed Insights ile hız skorlarını geri getir

İki yeni dosya eski sağlayıcının yerini alıyor: biri saf dönüştürücü (ağ erişimi yok, yoğun test
edilebilir), biri HTTP çağrısı ve bellek kilidi. Saklama biçimi, okuma yolu, veritabanı, R2 anahtarı
ve iki arayüz ekranı **hiç değişmiyor**.

**Sıra önemli, ilk beş adım tek başına test edilebilir:**

1. Kanonik saklama şemasında `source` alanı iki değerli hâle getirilir (eski ve yeni). Eski denetimler okunmaya devam etsin diye; aksi hâlde eski kayıtların sorun ekranı bomboş açılır.
2. Çakışan iki tip adı ayrıştırılır: cihaz anlamındaki "strategy" adını korur, denetim ayarı olan "auto/none" yeni bir ada geçer. Veritabanındaki alan adı **değişmez**, yalnız tip adı değişir.
3. Saf dönüştürücü yazılır ve testleri yeşile alınır. Hiçbir çağıran dosyaya dokunulmadan.
4. HTTP katmanı yazılır: anahtar okuma, hata sınıfı, çok megabaytlık yanıtları sıraya sokan bellek kilidi. Bu kilit isteğe bağlı değil; denetim işçisinin ayrı bir worker olarak var olma sebebi tam olarak bu yüklerin belleği taşırmasıydı.
5. Denetim tarafındaki çağrı noktası yeni sağlayıcıya bağlanır ve faturalandırma parametresi düşer.
6. Ancak bundan sonra iş akışı zinciri güncellenir. Riskli parça en sona, kanıtlanmış bir sağlayıcının üstüne gelir.

**Kararlar ve gerekçeleri:**

| Konu               | Karar                                                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Yeniden deneme     | Eski sağlayıcıda **sıfırdı**, çünkü her deneme para demekti. Artık 2 yeniden deneme, 30 saniyeden başlayan artan bekleme                                                                                                 |
| Zaman aşımı        | 60 saniye yetersiz; Google tam Lighthouse çalıştırdığı için soğuk istekler 60-90 saniyeyi buluyor. 120 saniye                                                                                                            |
| Eş zamanlılık      | Değişmez. Bir denetim en çok 20 istek yapıyor, dakikalık sınır 240. Kişisel kullanımda sınıra yaklaşmak için aynı anda düzinelerce denetim gerekir                                                                       |
| Kalıcı hatalar     | Sayfanın kendisinden kaynaklanan hatalar (içerik yok, HTML değil) yeniden denenmez, satır "başarısız" işaretlenir. Ağ hatası, kota aşımı ve sunucu hatası yeniden denenir                                                |
| Geçersiz anahtar   | Yeniden denenmez. Denetimin asıl değeri olan tarama sonuçları tamamlanır, yalnız hız satırları anahtarı işaret eden bir mesajla boş kalır                                                                                |
| Anahtarsız çalışma | Anahtar yoksa çağrı yine yapılır. Kota çok düşük olduğu için genelde reddedilir ve mesaj bunu açıkça söyler                                                                                                              |
| Kurulum kapısı     | PSI için **tam ekran uyarı penceresi konmaz**. İsteğe bağlı bir anahtarın tek bir aşamayı etkilemesi, her sayfada engel çıkarmayı haklı çıkarmaz. Açılış denetimindeki uyarı ve başarısız satırdaki dürüst mesaj yeterli |

**İki metrik hakkında:**

- Etkileşimden sonraki boyama (INP): laboratuvar çıktısında yok, ama **aynı yanıtın içinde gerçek kullanıcı ölçümü olarak geliyor**. Oradan alınır. Kritik koruma: sayfanın kendi ölçümü yoksa Google site geneli ortalamayı aynı alana koyup bir bayrak kaldırıyor; o bayrak görmezden gelinirse her uzun kuyruk sayfası site ortalamasını kendi değeriymiş gibi gösterir. Bayrak kontrol edilir. Bu madde §8.1'i de kısmen karşılar.
- Etkileşime hazır olma (TTI): Lighthouse 10 ile kaldırıldı, boş kalır. Mevcut kod eksik metrikte zaten boş dönüyor ve arayüz boş değerleri gizliyor, yani o rozet sessizce kaybolur.

**Dil kararı (Türkçeleştirmeyi doğrudan ilgilendiriyor):** PageSpeed isteğine dil parametresi
veriliyor ve Lighthouse sorun başlıklarını, açıklamalarını o dilde döndürüyor. Bu parametre **`tr`
olarak sabitlenir**. Böylece hız sorunları Google'ın kendi resmi Türkçe çevirisiyle gelir, Faz 5'te
elle çevrilecek metin azalır. Sabitlenmesi şart: dil isteğe göre değişirse aynı sorunun metni
kayıttan kayda farklılaşır.

**Anahtar bağlantısı:** ortam tipi tanımı, `compose.yaml`, örnek ortam dosyası, açılış denetimi
(eksikse uyarı seviyesi), sağlık kontrolü listesi ve dokümanlar. Anahtarın biçimi doğrulanmaz;
opak bir metin olduğu için yanlış uyarı vermek hiç uyarı vermemekten kötü.

**Testler:** saf dönüştürücü için altı mevcut senaryodan beşi taşınır, dördü eklenir (hata gövdesi,
çalışma zamanı hatası, gerçek kullanıcı ölçümünden metrik, site geneli bayrağında bastırma).
Çok megabaytlık gerçek yanıt depoya konmaz; testler kendi küçük örneklerini satır içi kurar.
Bir regresyon testi özellikle eklenir: **eski sağlayıcıyla üretilmiş bir kayıt hâlâ okunabiliyor mu.**

**Doğrulama:** gerçek bir sitede denetim, sorun ekranının açılması (R2 gidiş dönüşü ve yeni kaynak
değerinin kabulü bu tek tıkta kanıtlanır), eski bir denetimin hâlâ açılması, geçersiz anahtarla
yeniden deneme fırtınası çıkmaması.

### Faz 4 — Marka: seotracker

1. `package.json` adı, wrangler worker adları, `compose.yaml` imaj ve birim değişkenleri, açılış betiğindeki parmak izi dosyası. **Kaynak kimlikleri (D1 `database_id`, KV `id`, R2 kova adı) değişmez** — miniflare disk dosya adlarını bu değerlerin özetinden türetiyor, değişirse yerel veritabanı yetim kalır.
2. Arayüz markası: sayfa başlığı, favicon ve manifest, logo görselleri, DaisyUI tema adları.
3. **Tarayıcı kimliği:** `OpenSEO-Audit/1.0` → `seotracker-audit/1.0`. Dört yerde sabit metin olarak yazılmış, sabit değişken üzerinden değil. İnternetteki sitelere kendini bu isimle tanıtacak olan satır budur.
4. MCP sunucu kimliği ve `openseo.so` bağlantıları kendi yerel adresine ya da fork adresine çevrilir.
5. `CLAUDE.md`, `AGENTS.md`, `README.md` yeniden yazılır. MIT lisansı ve telif satırı korunur, projenin OpenSEO'dan türediği README'de açıkça belirtilir.

### Faz 5 — Türkçeleştirme

1. Menü, sayfa başlıkları, düğmeler, sekmeler.
2. **Denetim sorun kataloğu** (`src/shared/audit-issues.ts`): 28 sorunun başlığı, açıklaması ve "nasıl düzeltilir" metni. Bu, çevirinin en yüksek değerli parçası; günlük olarak okuyacağın metin bu.
3. Hata mesajları, boş durum metinleri, bildirimler.
4. Bağlantı ve kurulum kartları, Google yönlendirme uyarıları.
5. Dokümanlar: Docker kurulumu, yerel geliştirme, Search Console ve Analytics kurulumu.

**Çevrilmeyecekler:** MCP araç adları, parametreleri ve açıklamaları; ajan becerilerinin içeriği.
Bunları sen değil Claude okuyor ve İngilizce açıklamalar araç seçimini daha isabetli yapıyor. Kod
içindeki değişken adları, günlük kayıtları ve hata kodları da İngilizce kalır.

Tek dilli doğrudan çeviri yapılır, çok dilli altyapı kurulmaz: tek kullanıcı için soyutlama masrafı
karşılığını vermez.

### Faz 6 — Veritabanı temizliği

`pnpm db:generate` **bilinçli olarak tek sefer** çalıştırılır, ürettiği `DROP TABLE` göçü incelenip
kabul edilir. Postgres Faz 1'de söküldüğü için tek lehçe var, eşitlik testi yok. Mevcut göç
dosyalarına dokunulmaz.

### Faz 7 — Kendi imajın ve son doğrulama

`docker build -f Dockerfile.selfhost -t seotracker:local .`, temiz birimle taze konteyner, §7.2'deki
uçtan uca senaryo. `.dockerignore` genişletilir (`badseo/`, `docs/`, `specs/`, `drizzle-pg/` imaja
girmesin).

### Faz 8 — Yeni ücretsiz özellikler

Dördü de onaylandı. Ayrıntı §8'de.

## 7. Doğrulama

### 7.1 Her faz sonunda çalıştırılacak kapı

```
pnpm exec tsc --noEmit
pnpm test
pnpm lint
pnpm knip
pnpm exec prettier --check .
docker build -f Dockerfile.selfhost -t seotracker:local .
```

`knip` bu planda en çok tetiklenecek kapıdır: her silme yeni öksüz dosya ve kullanılmayan bağımlılık
üretir, aynı işlemde temizlenmezse kırmızı kalır. Test sayısındaki her düşüş, silinen özelliğin
testleri olarak §4.9'a karşı hesabı verilir.

### 7.2 Uçtan uca senaryo (Faz 7, gerçek tarayıcıda)

1. Temiz konteyner, boş veri. Açılış denetimi hatasız geçiyor.
2. `http://localhost:3001/api/health` 200 ve kontroller yeşil.
3. Proje oluştur (kendi siten).
4. Search Console bağla, hesap seç, site listesi geliyor.
5. Arama performansı ekranı gerçek veri gösteriyor, üç sekme de dolu, CSV dışa aktarımı çalışıyor.
6. Site denetimi çalıştır; sayfalar taranıyor, sorun listesi doluyor, canlı ilerleme akıyor.
7. PageSpeed skorları dolu, sorun ekranı açılıyor.
8. Rapor kaydet, yazdırma önizlemesi açılıyor.
9. Claude Code'dan `http://localhost:3001/mcp` bağlan, bir Search Console aracı çağır, veri dön.
10. Denetim motoru regresyonu: `pnpm --dir badseo run dev` ve ayrı terminalde `pnpm --dir badseo run audit http://localhost:8787` — her fixture beklediği sorunu üretiyor.

### 7.3 Ölçülmeden yazılmayacaklar

Bu planda "yüzde şu kadar tamamlandı", "şu kadar dosya silindi", "şu kadar test geçiyor" gibi her
rakam, ancak komut çıktısıyla ölçüldükten sonra rapora girer. Dokümanda düzeltilen ile çalışan
sistemde doğrulanan ayrı satırlarda yazılır.

## 8. Faz 8 — onaylanan yeni ücretsiz özellikler

### Önce bir kısıt: Docker'da zamanlanmış görevler çalışmıyor

Uygulamanın kendi açılış denetimi bunu açıkça söylüyor: Docker modunda zamanlanmış işler
tetiklenmiyor. Cloudflare'in cron tetikleyicisi yerel taklitte yok. Bu, "her gece şunu yap" diyen her
özelliği doğrudan etkiliyor.

**Çözüm: fırsatçı yakalama.** Zamanlayıcı beklemek yerine, uygulama her açıldığında "en son ne zaman
veri aldım, o günden bugüne ne eksik" diye bakıp aradaki boşluğu doldurur. Search Console verisini 16
ay geriye kadar sunduğu için, uygulamayı 16 aydan seyrek açmadığın sürece hiçbir gün kaybolmaz. Bu
hem bilgisayarın kapalı olduğu günleri tolere eder hem de yeni altyapı gerektirmez.

### 8.1 Çekirdek Web Verileri saha verisi

Faz 3 bunun bir parçasını zaten getiriyor: etkileşim metriği gerçek kullanıcı ölçümünden okunuyor.
Kalan iş, aynı yanıttaki diğer saha değerlerini (yükleme, kayma, ilk yanıt ve genel geçme durumu)
denetim ekranında laboratuvar skorunun yanına koymak ve ikisinin farkını görünür kılmak. Laboratuvar
skoru Google'ın test makinesinde ölçülür, saha verisi gerçek ziyaretçilerinden gelir; ikisi ayrıldığında
sorunun gerçek kullanıcıyı etkileyip etkilemediği anlaşılır. Veri zaten geliyor, yalnız gösterilmiyor.

### 8.2 Search Console geçmiş arşivi (temel)

Yeni tablo: proje, tarih, sorgu, sayfa, tıklama, gösterim, tıklama oranı, ortalama sıra. Doldurma
mantığı fırsatçı: arama performansı ekranı açıldığında son arşiv gününden bugüne kadar eksik günler
çekilip yazılır. İlk çalıştırmada 16 ayın tamamı geri doldurulur.

Değeri zamanla artar: Google'ın sildiği veriyi sen tutmaya başlarsın. Bu yüzden Faz 8'in **ilk
yapılacak** maddesi budur, en erken başlaması gereken iş.

### 8.3 GSC tabanlı sıralama takibi

Silinen ücretli özelliğin ücretsiz karşılığı. Takip edilecek sorgular seçilir, her biri için zaman
içindeki ortalama sıra grafiği ve değişim uyarısı gösterilir. 8.2 üzerine kurulur; arşiv yoksa 16 ay
sınırı geçerlidir. Menüde "My Site" grubundaki boşluğu doldurur.

Ücretli sürümden farkı: yalnız kendi doğruladığın siteler için çalışır ve Google'ın kendi ölçtüğü
gerçek ortalama sırayı gösterir, üçüncü tarafın robotla ölçtüğü anlık sırayı değil.

### 8.4 Zamanlanmış haftalık denetim

Fırsatçı yaklaşımla: son denetimden bir haftadan fazla geçmişse gösterge panelinde uyarı çıkar ve tek
tıkla başlatılır. Otomatik başlatma yerine bildirim tercih edilir, çünkü denetim uzun sürüyor ve
kullanıcı hazır değilken arka planda çalışması sürpriz olur. Denetim bitince önceki denetimle
karşılaştırıp **yeni çıkan sorunları** ayrı gösterir; asıl değer bu karşılaştırmadır.

### Sıra

8.1 → 8.2 → 8.3 → 8.4. İlk ikisi bağımsız, üçüncüsü ikinciye dayanır, dördüncüsü bağımsızdır ve en
sona bırakılabilir.
