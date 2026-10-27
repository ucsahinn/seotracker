/**
 * What to tell the operator when an audit stopped, chosen from the stored
 * `errorCode` and `failedPhase` (see audit-errors.ts for the vocabulary).
 *
 * Every answer names three things: what happened, whether the fault is the
 * site's or the app's, and what to do next. The raw error text never reaches
 * the screen; it stays in the diagnostics bundle.
 *
 * The strings are Turkish catalog keys: the caller translates them with `t()`
 * at render time, because the locale is not known when this module loads.
 */

/** Who the operator should look at first. */
type FailureSide = "app" | "site" | "unknown";

type CodeCopy = { cause: string; side: FailureSide; action: string };

const UNKNOWN_COPY: CodeCopy = {
  cause: "Denetim beklenmedik bir hatayla durdu.",
  side: "unknown",
  action:
    "Denetimi yeniden başlatın. Tekrarlarsa Yardım'dan tanılama paketini indirip sorunu bildirin.",
};

const COPY_BY_CODE: Record<string, CodeCopy> = {
  step_timeout: {
    cause:
      "Bir adım zamanında bitmedi. Genelde site çok yavaş yanıt veriyor ya da bağlantıyı açık tutup bekletiyor.",
    side: "site",
    action:
      "Birkaç dakika sonra yeniden deneyin. Yine olursa daha az sayfayla başlatın.",
  },
  oom: {
    cause:
      "Denetim, uygulamanın kullanabildiği belleğe sığmadı. Çok büyük sayfalar ya da çok fazla sayfa buna yol açar.",
    side: "app",
    action: "Daha az sayfayla yeniden başlatın.",
  },
  cpu_limit: {
    cause:
      "Denetim, uygulamanın izin verdiği işlemci süresini aştı. Çok büyük ya da çok karmaşık sayfalar buna yol açar.",
    side: "app",
    action: "Daha az sayfayla yeniden başlatın.",
  },
  db_error: {
    cause:
      "Sonuçlar uygulamanın veritabanına yazılırken hata oluştu. Disk dolu ya da veri dosyası başka bir programda kilitli olabilir.",
    side: "app",
    action:
      "Diskte boş yer olduğunu kontrol edin, uygulamayı yeniden başlatın ve denetimi yeniden başlatın.",
  },
  step_output_too_large: {
    cause:
      "Bir adımın sonucu uygulamanın saklayabildiği boyutu aştı. Çok büyük siteler buna yol açar.",
    side: "app",
    action: "Daha az sayfayla yeniden başlatın.",
  },
  workflow_internal: {
    cause: "Denetimi yürüten uygulamanın iç düzeni hata verdi.",
    side: "app",
    action:
      "Uygulamayı yeniden başlatın (tepsi menüsünde Yeniden başlat), sonra denetimi yeniden başlatın.",
  },
  instance_lost: {
    cause:
      "Denetim yarıda kaldı. Uygulama denetimin ortasında kapanmış ya da yeniden başlamış olabilir.",
    side: "app",
    action:
      "Uygulamanın açık kaldığından emin olun ve denetimi yeniden başlatın.",
  },
  missing_secret: {
    cause:
      "Kayıtlı Google ve PageSpeed anahtarlarını açan kurulum anahtarı denetimi yürüten bölüme ulaşmamış. Anahtarlarınız silinmedi.",
    side: "app",
    action:
      "Uygulamayı güncelleyin ya da yeniden başlatın, sonra denetimi yeniden başlatın.",
  },
  unknown: UNKNOWN_COPY,
};

const SIDE_LINE: Record<FailureSide, string> = {
  app: "Sorun sitenizde değil, uygulamada.",
  site: "Büyük olasılıkla sorun sitenizin yavaş yanıt vermesinde; uygulamada bir arıza yok.",
  unknown: "Nedeni belirlenemedi.",
};

const PHASE_LABEL: Record<string, string> = {
  discovery: "adres keşfi",
  crawling: "tarama",
  lighthouse: "hız ölçümü",
  finalizing: "sonuçların hazırlanması",
};

type AuditFailureInput = {
  errorCode?: string | null;
  failedPhase?: string | null;
};

type AuditFailureCopy = {
  /** Catalog key; `{phase}` is filled with the translated `phase`. */
  title: string;
  /** Catalog key for the phase name; `null` when it is unknown. */
  phase: string | null;
  cause: string;
  side: string;
  action: string;
};

export function describeAuditFailure(
  input: AuditFailureInput,
): AuditFailureCopy {
  const copy = COPY_BY_CODE[input.errorCode ?? ""] ?? UNKNOWN_COPY;
  /*
   * An instance key the audit worker never received can only break the speed
   * phase (the one place a saved key is opened), and audits recorded before
   * that phase marked itself still say "crawling": name the phase it really
   * was.
   */
  const phaseKey =
    input.errorCode === "missing_secret" ? "lighthouse" : input.failedPhase;
  const phase = (phaseKey && PHASE_LABEL[phaseKey]) || null;
  return {
    title: phase
      ? "Denetim {phase} aşamasında durdu."
      : "Denetim tamamlanamadan durdu.",
    phase,
    cause: copy.cause,
    side: SIDE_LINE[copy.side],
    action: copy.action,
  };
}

/**
 * The notice on an audit that finished by working around a fault, read from
 * its own `noticeCode` column (never from `errorCode`, which is for failures).
 * Only `missing_secret` is recorded this way (speed tests ran without the
 * saved PageSpeed key); any other code shows nothing.
 */
export function describeAuditNotice(
  noticeCode: string | null | undefined,
): { title: string; body: string } | null {
  if (noticeCode !== "missing_secret") return null;
  return {
    title:
      "Kayıtlı PageSpeed anahtarı okunamadı; hız ölçümü anahtarsız yapıldı.",
    body: "Tarama sonuçları etkilenmedi, ama hız ölçümü yalnızca ilk sayfalarla sınırlı kaldı. Uygulamayı güncelleyin ya da yeniden başlatın, sonra yeni bir denetim başlatın. Sürerse Ayarlar'dan PageSpeed anahtarını yeniden kaydedin.",
  };
}
