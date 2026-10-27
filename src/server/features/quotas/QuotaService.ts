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
import {
  REPORT_MAX_HTML_BYTES,
  REPORT_MAX_PER_PROJECT,
} from "@/types/schemas/reports";
import { REPORT_TEMPLATE_MAX_PER_PROJECT } from "@/types/schemas/report-templates";
import { t } from "@/shared/i18n";

const DAY_MS = 86_400_000;

function urlInspectionItem(spent: number, now: Date): QuotaItem {
  return {
    id: "url_inspection",
    kind: "url_inspection",
    label: t("URL Denetimi (Search Console)"),
    used: spent,
    limit: DAILY_QUOTA,
    unit: "sorgu", // i18n-ignore: QuotaUnit code, worded by the client
    state: stateFromUsage(spent, DAILY_QUOTA),
    detail: t(
      "Mülk başına günlük {count} sorgu; son 24 saatte bu uygulamanın kaydettiği sorgular sayılır. Google'ın sıfırlanma saati doğrulanmadı.",
      { count: DAILY_QUOTA },
    ),
    source: t("Uygulamanın kendi kaydı"),
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
    ? t("Anahtar tanımlı.")
    : t(
        "PageSpeed anahtarı yok: denetimde en fazla {count} sayfanın hızı ölçülür. Anahtarı Ayarlar > Hız ölçümü bölümünden girebilirsiniz.",
        { count: UNKEYED_LIGHTHOUSE_PAGE_CAP },
      );
  const events: string[] = [];
  if (usage.quotaEvents > 0) {
    events.push(
      t("{count} ölçüm günlük sınır nedeniyle yapılamadı", {
        count: usage.quotaEvents,
      }),
    );
  }
  if (usage.rateLimitEvents > 0) {
    events.push(
      t("{count} ölçüm dakikalık sınıra takıldı", {
        count: usage.rateLimitEvents,
      }),
    );
  }
  const lastEvent = events.length
    ? t("Son 24 saatte başlayan denetimlerde {events}.", {
        events: events.join(", "),
      })
    : t("Son 24 saatte başlayan denetimlerde sınır olayı yok.");
  // Results carry no timestamp of their own, so the window is the audit's
  // start time: a long audit's later checks still count for the day it began.
  return t(
    "{key} Sayılar, son 24 saatte başlayan denetimlere aittir (tek tek ölçüm saati kaydedilmez). {lastEvent} Google'ın günlük toplamı doğrulanmadı; gerçek kota Google Cloud Console > PageSpeed Insights API > Quotas bölümünde.",
    { key, lastEvent },
  );
}

function pageSpeedItem(
  usage: PageSpeedUsage,
  keySource: string | null,
  now: Date,
): QuotaItem {
  return {
    id: "pagespeed",
    kind: "pagespeed",
    label: t("PageSpeed Insights · yalnızca denetimler"),
    used: usage.measured,
    limit: null,
    unit: "ölçüm", // i18n-ignore: QuotaUnit code, worded by the client
    state: pageSpeedState(usage),
    detail: pageSpeedDetail(usage, keySource),
    source: t("Uygulamanın kendi kaydı"),
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
  /** A t() template taking the ceiling as {count}. */
  windowLabel: string;
  ceiling: number;
  pair: { consumed: number; remaining: number } | null;
  seenAt: string | null;
  now: Date;
}): QuotaItem {
  const { id, label, windowLabel, ceiling, pair, seenAt } = input;
  const base = {
    id,
    kind: "ga4" as const,
    label: `${t(label)} · ${t("Standart mülk sınırı varsayımı")}`,
    unit: "puan" as const, // i18n-ignore: QuotaUnit code, worded by the client
    source: t("Google yanıtındaki son kota bilgisi"),
    updatedAt: seenAt,
  };
  if (!pair) {
    return {
      ...base,
      used: null,
      limit: null,
      state: "unknown",
      detail: t(
        "Uygulama yeniden başladığından ya da GA4 bağlantısı değiştiğinden beri bu bağlantıyla GA4 raporu çalışmadı; sayaç bir rapor çalışınca dolar.",
      ),
    };
  }
  const age = seenAt ? input.now.getTime() - Date.parse(seenAt) : Infinity;
  const expired =
    !Number.isFinite(age) ||
    age < 0 ||
    age >= (id === "ga4_hourly" ? 3_600_000 : DAY_MS) ||
    seenAt?.slice(0, 10) !== input.now.toISOString().slice(0, 10);
  if (expired)
    return {
      ...base,
      used: null,
      limit: null,
      remaining: pair.remaining,
      state: "unknown",
      detail: t(
        "Son gözlenen kalan gösteriliyor; kota penceresi güncelliği doğrulanamadı. Yeni rapor yanıtı gelene kadar güncel kapasite bilinmiyor.",
      ),
    };
  const lastCost = t("Son istek: {count} puan.", { count: pair.consumed });
  const limit = t(windowLabel, { count: ceiling });
  // Above the assumed ceiling this is not a standard property: show what is
  // left and draw no bar, since a bar needs a real denominator.
  if (pair.remaining > ceiling) {
    return {
      ...base,
      used: null,
      limit: null,
      remaining: pair.remaining,
      state: "unknown",
      detail: t(
        "Kalan değer standart mülk sınırını ({limit}) aşıyor; mülk büyük olasılıkla Analytics 360, sınır 10 kat. Gerçek sınır Google'dan gelmez, bu yüzden çubuk gösterilmez. {lastCost}",
        { limit, lastCost },
      ),
    };
  }
  const used = ceiling - pair.remaining;
  return {
    ...base,
    used,
    limit: ceiling,
    state: stateFromUsage(used, ceiling),
    detail: t(
      "Google yalnızca kalanı bildirir. Sınır varsayımdır: standart mülk için {limit}; 360 mülklerde 10 kat. Kullanılan = varsayılan sınır − kalan. {lastCost} Sıfırlanma saati doğrulanmadı.",
      { limit, lastCost },
    ),
  };
}

function ga4Items(snapshot: Ga4QuotaSnapshot | null, now: Date): QuotaItem[] {
  return [
    ga4Item({
      id: "ga4_daily",
      label: "Analytics (GA4) günlük kota puanı",
      windowLabel: "günlük {count}",
      ceiling: GA4_STANDARD_CEILING.daily,
      pair: snapshot?.tokensPerDay ?? null,
      seenAt: snapshot?.seenAt ?? null,
      now,
    }),
    ga4Item({
      id: "ga4_hourly",
      label: "Analytics (GA4) saatlik kota puanı",
      windowLabel: "saatlik {count}",
      ceiling: GA4_STANDARD_CEILING.hourly,
      pair: snapshot?.tokensPerHour ?? null,
      seenAt: snapshot?.seenAt ?? null,
      now,
    }),
  ];
}

function auditItem(
  latest: { pages: number; startedAt: string } | null,
): QuotaItem {
  return {
    id: "audit_pages",
    kind: "audit",
    label: t("Denetim sayfa sınırı"),
    used: latest?.pages ?? null,
    limit: MAX_AUDIT_PAGES,
    unit: "sayfa", // i18n-ignore: QuotaUnit code, worded by the client
    state: stateFromUsage(latest?.pages ?? null, MAX_AUDIT_PAGES),
    detail: t(
      "Bir denetim en çok {count} sayfa tarar; gösterilen sayı proje alan adındaki son tamamlanan denetime aittir. Tarih denetimin başlangıcıdır.",
      { count: MAX_AUDIT_PAGES },
    ),
    source: t("Proje alan adındaki son tamamlanan denetim"),
    updatedAt: latest?.startedAt ?? null,
  };
}

function reportItems(
  figures: Awaited<ReturnType<typeof QuotaRepository.reportFigures>>,
  now: Date,
): QuotaItem[] {
  const updatedAt = now.toISOString();
  const source = t("Uygulamanın veritabanı");
  return [
    {
      id: "reports_count",
      kind: "reports",
      label: t("Proje başına rapor"),
      used: figures.reportCount,
      limit: REPORT_MAX_PER_PROJECT,
      unit: "rapor", // i18n-ignore: QuotaUnit code, worded by the client
      state: stateFromUsage(figures.reportCount, REPORT_MAX_PER_PROJECT),
      detail: t(
        "Takılan bir döngüye karşı koruma; gerçek bir iş akışı buna yaklaşmaz.",
      ),
      source,
      updatedAt,
    },
    {
      id: "report_templates",
      kind: "reports",
      label: t("Proje başına rapor şablonu"),
      used: figures.templateCount,
      limit: REPORT_TEMPLATE_MAX_PER_PROJECT,
      unit: "şablon", // i18n-ignore: QuotaUnit code, worded by the client
      state: stateFromUsage(
        figures.templateCount,
        REPORT_TEMPLATE_MAX_PER_PROJECT,
      ),
      detail: t("Doluysa yeni şablon için birini silmek gerekir."),
      source,
      updatedAt,
    },
    {
      id: "report_size",
      kind: "reports",
      label: t("En büyük raporun boyutu"),
      used: figures.largestReportBytes,
      limit: REPORT_MAX_HTML_BYTES,
      unit: "bayt", // i18n-ignore: QuotaUnit code, worded by the client
      state: stateFromUsage(figures.largestReportBytes, REPORT_MAX_HTML_BYTES),
      detail: t(
        "Tek bir rapor bu boyutu aşarsa kaydedilmez; genelde gömülü görseller yüzünden olur.",
      ),
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
    items.push(...ga4Items(connection ? readGa4Quota(connection) : null, now));
  }
  if (wanted.has("audit")) {
    const selection = await QuotaRepository.latestAuditPages(input.projectId);
    items.push(auditItem(selection.snapshot));
    const attempt = selection.latestAttempt;
    if (attempt && attempt.auditId !== selection.snapshot?.auditId) {
      items.push({
        id: "audit_latest_attempt",
        kind: "audit",
        label: t("Son denetim girişimi"),
        used: null,
        limit: null,
        unit: "sayfa",
        state: "unknown",
        source: t("Proje alan adındaki son denetim girişimi"),
        updatedAt: attempt.startedAt,
        detail:
          attempt.status === "running"
            ? t(
                "Son denetim sürüyor. Sayfa sınırı için son tamamlanan denetim ayrı gösterilir.",
              )
            : t(
                "Son denetim tamamlanamadı. Son tamamlanan denetimin sayfa sayısı korunur; ayrıntıyı Denetim ekranından kontrol edin.",
              ),
      });
    }
  }
  if (wanted.has("reports")) {
    items.push(
      ...reportItems(await QuotaRepository.reportFigures(input.projectId), now),
    );
  }
  return { items, generatedAt: now.toISOString() };
}
