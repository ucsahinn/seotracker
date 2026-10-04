import { Ga4ConnectionRepository } from "@/server/features/ga4/repositories/Ga4ConnectionRepository";
import { DAILY_QUOTA } from "@/server/features/gsc/indexCoverage";
import { getPageSpeedKeySource } from "@/server/features/lighthouse/pagespeed-config";
import {
  readGa4Quota,
  type Ga4QuotaSnapshot,
} from "@/server/features/quotas/ga4QuotaSnapshot";
import {
  QuotaRepository,
  type PageSpeedUsage,
} from "@/server/features/quotas/QuotaRepository";
import {
  QUOTA_KINDS,
  stateFromUsage,
  type QuotaItem,
  type QuotaKind,
  type QuotaState,
  type QuotaStatus,
} from "@/server/features/quotas/quotaTypes";
import {
  MAX_AUDIT_PAGES,
  UNKEYED_LIGHTHOUSE_PAGE_CAP,
} from "@/shared/audit-limits";
import { formatNumber } from "@/shared/format";
import {
  REPORT_MAX_HTML_BYTES,
  REPORT_MAX_PER_PROJECT,
} from "@/types/schemas/reports";
import { REPORT_TEMPLATE_MAX_PER_PROJECT } from "@/types/schemas/report-templates";

const DAY_MS = 86_400_000;

function urlInspectionItem(spent: number, now: Date): QuotaItem {
  return {
    id: "url_inspection",
    kind: "url_inspection",
    label: "URL Denetimi (Search Console)",
    used: spent,
    limit: DAILY_QUOTA,
    unit: "sorgu",
    state: stateFromUsage(spent, DAILY_QUOTA),
    detail: `Mülk başına günlük ${formatNumber(DAILY_QUOTA)} sorgu; son 24 saatte bu uygulamanın kaydettiği sorgular sayılır. Google'ın sıfırlanma saati doğrulanmadı.`,
    source: "Uygulamanın kendi kaydı",
    updatedAt: now.toISOString(),
  };
}

function pageSpeedState(usage: PageSpeedUsage): QuotaState {
  if (usage.quotaEvents > 0) return "critical";
  if (usage.rateLimitEvents > 0 || usage.noKeyEvents > 0) return "warn";
  return usage.measured > 0 ? "ok" : "unknown";
}

function pageSpeedDetail(
  usage: PageSpeedUsage,
  keySource: string | null,
): string {
  const key = keySource
    ? "Anahtar tanımlı."
    : `Anahtar yok: anahtarsız denetimde en çok ${formatNumber(UNKEYED_LIGHTHOUSE_PAGE_CAP)} sayfa ölçülür.`;
  const events: string[] = [];
  if (usage.quotaEvents > 0) {
    events.push(
      `${formatNumber(usage.quotaEvents)} ölçüm günlük sınır nedeniyle yapılamadı`,
    );
  }
  if (usage.rateLimitEvents > 0) {
    events.push(
      `${formatNumber(usage.rateLimitEvents)} ölçüm dakikalık sınıra takıldı`,
    );
  }
  const lastEvent = events.length
    ? `Son 24 saatte başlayan denetimlerde ${events.join(", ")}.`
    : "Son 24 saatte başlayan denetimlerde sınır olayı yok.";
  // Results carry no timestamp of their own, so the window is the audit's
  // start time: a long audit's later checks still count for the day it began.
  return `${key} Sayılar, son 24 saatte başlayan denetimlere aittir (tek tek ölçüm saati kaydedilmez). ${lastEvent} Google'ın günlük toplamı doğrulanmadı; gerçek kota Google Cloud Console > PageSpeed Insights API > Quotas bölümünde.`;
}

function pageSpeedItem(
  usage: PageSpeedUsage,
  keySource: string | null,
  now: Date,
): QuotaItem {
  return {
    id: "pagespeed",
    kind: "pagespeed",
    label: "PageSpeed Insights",
    used: usage.measured,
    limit: null,
    unit: "ölçüm",
    state: pageSpeedState(usage),
    detail: pageSpeedDetail(usage, keySource),
    source: "Uygulamanın kendi kaydı",
    updatedAt: now.toISOString(),
  };
}

// Documented ceilings of a standard GA4 property (Analytics Data API, "Property
// quotas"); Analytics 360 gets ten times as much. Google returns only what is
// left, never the ceiling, so these are assumptions the card labels as such.
const GA4_STANDARD_CEILING = { daily: 200_000, hourly: 40_000 } as const;

function ga4Item(input: {
  id: string;
  label: string;
  windowLabel: string;
  ceiling: number;
  pair: { consumed: number; remaining: number } | null;
  seenAt: string | null;
}): QuotaItem {
  const { id, label, windowLabel, ceiling, pair, seenAt } = input;
  const base = {
    id,
    kind: "ga4" as const,
    label,
    unit: "belirteç" as const,
    source: "Google yanıtındaki son kota bilgisi",
    updatedAt: seenAt,
  };
  if (!pair) {
    return {
      ...base,
      used: null,
      limit: null,
      state: "unknown",
      detail:
        "Uygulama yeniden başladığından ya da GA4 bağlantısı değiştiğinden beri bu bağlantıyla GA4 raporu çalışmadı; sayaç bir rapor çalışınca dolar.",
    };
  }
  const lastCost = `Son istek: ${formatNumber(pair.consumed)} belirteç.`;
  // Above the assumed ceiling this is not a standard property: show what is
  // left and draw no bar, since a bar needs a real denominator.
  if (pair.remaining > ceiling) {
    return {
      ...base,
      used: null,
      limit: null,
      remaining: pair.remaining,
      state: "unknown",
      detail: `Kalan değer standart mülk sınırını (${windowLabel} ${formatNumber(ceiling)}) aşıyor; mülk büyük olasılıkla Analytics 360, sınır 10 kat. Gerçek sınır Google'dan gelmez, bu yüzden çubuk gösterilmez. ${lastCost}`,
    };
  }
  const used = ceiling - pair.remaining;
  return {
    ...base,
    used,
    limit: ceiling,
    state: stateFromUsage(used, ceiling),
    detail: `Google yalnızca kalanı bildirir. Sınır varsayımdır: standart mülk için ${windowLabel} ${formatNumber(ceiling)}; 360 mülklerde 10 kat. Kullanılan = varsayılan sınır − kalan. ${lastCost} Sıfırlanma saati doğrulanmadı.`,
  };
}

function ga4Items(snapshot: Ga4QuotaSnapshot | null): QuotaItem[] {
  return [
    ga4Item({
      id: "ga4_daily",
      label: "GA4 Data API: günlük belirteç",
      windowLabel: "günlük",
      ceiling: GA4_STANDARD_CEILING.daily,
      pair: snapshot?.tokensPerDay ?? null,
      seenAt: snapshot?.seenAt ?? null,
    }),
    ga4Item({
      id: "ga4_hourly",
      label: "GA4 Data API: saatlik belirteç",
      windowLabel: "saatlik",
      ceiling: GA4_STANDARD_CEILING.hourly,
      pair: snapshot?.tokensPerHour ?? null,
      seenAt: snapshot?.seenAt ?? null,
    }),
  ];
}

function auditItem(
  latest: { pages: number; startedAt: string } | null,
): QuotaItem {
  return {
    id: "audit_pages",
    kind: "audit",
    label: "Denetim sayfa sınırı",
    used: latest?.pages ?? null,
    limit: MAX_AUDIT_PAGES,
    unit: "sayfa",
    state: stateFromUsage(latest?.pages ?? null, MAX_AUDIT_PAGES),
    detail: `Bir denetim en çok ${formatNumber(MAX_AUDIT_PAGES)} sayfa tarar; gösterilen sayı son denetimin taranan sayfa sayısıdır.`,
    source: "Son denetim kaydı",
    updatedAt: latest?.startedAt ?? null,
  };
}

function reportItems(
  figures: Awaited<ReturnType<typeof QuotaRepository.reportFigures>>,
  now: Date,
): QuotaItem[] {
  const updatedAt = now.toISOString();
  const source = "Uygulamanın veritabanı";
  return [
    {
      id: "reports_count",
      kind: "reports",
      label: "Proje başına rapor",
      used: figures.reportCount,
      limit: REPORT_MAX_PER_PROJECT,
      unit: "rapor",
      state: stateFromUsage(figures.reportCount, REPORT_MAX_PER_PROJECT),
      detail:
        "Takılan bir döngüye karşı koruma; gerçek bir iş akışı buna yaklaşmaz.",
      source,
      updatedAt,
    },
    {
      id: "report_templates",
      kind: "reports",
      label: "Proje başına rapor şablonu",
      used: figures.templateCount,
      limit: REPORT_TEMPLATE_MAX_PER_PROJECT,
      unit: "şablon",
      state: stateFromUsage(
        figures.templateCount,
        REPORT_TEMPLATE_MAX_PER_PROJECT,
      ),
      detail: "Doluysa yeni şablon için birini silmek gerekir.",
      source,
      updatedAt,
    },
    {
      id: "report_size",
      kind: "reports",
      label: "En büyük raporun boyutu",
      used: figures.largestReportBytes,
      limit: REPORT_MAX_HTML_BYTES,
      unit: "bayt",
      state: stateFromUsage(figures.largestReportBytes, REPORT_MAX_HTML_BYTES),
      detail:
        "Tek bir rapor bu boyutu aşarsa kaydedilmez; genelde gömülü görseller yüzünden olur.",
      source,
      updatedAt,
    },
  ];
}

/**
 * Every limit this install can measure honestly, for one project. Reads the
 * database and process memory only: it never calls Google.
 */
export async function getQuotaStatus(input: {
  projectId: string;
  kinds?: readonly QuotaKind[];
  now?: Date;
}): Promise<QuotaStatus> {
  const now = input.now ?? new Date();
  const wanted = new Set<QuotaKind>(input.kinds ?? QUOTA_KINDS);
  const since = new Date(now.getTime() - DAY_MS);
  const items: QuotaItem[] = [];

  if (wanted.has("url_inspection")) {
    const spent = await QuotaRepository.inspectionsInLastDay(
      input.projectId,
      now,
    );
    items.push(urlInspectionItem(spent, now));
  }
  if (wanted.has("pagespeed")) {
    const [usage, keySource] = await Promise.all([
      QuotaRepository.pageSpeedUsageSince(input.projectId, since),
      getPageSpeedKeySource(),
    ]);
    items.push(pageSpeedItem(usage, keySource, now));
  }
  if (wanted.has("ga4")) {
    const connection = await Ga4ConnectionRepository.getByProjectId(
      input.projectId,
    );
    // Only a reading from the project's current connection counts.
    items.push(...ga4Items(connection ? readGa4Quota(connection) : null));
  }
  if (wanted.has("audit")) {
    items.push(
      auditItem(await QuotaRepository.latestAuditPages(input.projectId)),
    );
  }
  if (wanted.has("reports")) {
    items.push(
      ...reportItems(await QuotaRepository.reportFigures(input.projectId), now),
    );
  }
  return { items, generatedAt: now.toISOString() };
}
