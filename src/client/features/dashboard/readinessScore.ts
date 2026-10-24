const TOTAL_POINTS = 100;

type ReadinessSignals = {
  gscConnected: boolean;
  ga4Connected: boolean;
  auditCompleted: boolean;
  auditFresh: boolean;
  hasProjectContext: boolean;
  agentConnected: boolean;
};

type ReadinessScore = {
  score: number;
  completed: number;
  total: number;
};

/** A setup score, not a ranking or SEO-performance score. */
export function getReadinessScore(signals: ReadinessSignals): ReadinessScore {
  const auditFresh = signals.auditCompleted && signals.auditFresh;
  const ready = [
    signals.gscConnected,
    signals.ga4Connected,
    signals.auditCompleted,
    auditFresh,
    signals.hasProjectContext,
    signals.agentConnected,
  ];
  const weights = [25, 15, 25, 15, 10, 10];
  const score = ready.reduce(
    (sum, isReady, index) => sum + (isReady ? (weights[index] ?? 0) : 0),
    0,
  );

  return {
    score: Math.min(TOTAL_POINTS, score),
    completed: ready.filter(Boolean).length,
    total: ready.length,
  };
}
