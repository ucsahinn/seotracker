import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAgentConnection } from "@/serverFunctions/agentConnection";
import {
  connectionEvidence,
  verificationState,
} from "./connectionVerification";
export function useAgentVerification() {
  const [verification, setVerification] = useState<{
    startedAt: number;
    baseline: number | null;
  } | null>(null);
  const [clock, setClock] = useState(Date.now());
  useEffect(() => {
    if (!verification) return;
    const timer = setInterval(() => {
      setClock(Date.now());
      if (Date.now() - verification.startedAt >= 60_000) clearInterval(timer);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [verification]);
  const connection = useQuery({
    queryKey: ["agentConnection"],
    queryFn: () => getAgentConnection(),
    /*
     * The global default is a 5-minute staleTime, and `refetchOnWindowFocus`
     * only fires on a stale query -- which would have made this pill inert
     * during the exact minute it exists for: copy the prompt, paste it into
     * an agent, come back.
     */
    staleTime: 0,
    /*
     * And while it is still waiting, poll, so the operator who kept this tab
     * open watches it flip rather than reaching for reload. It stops the
     * moment it has an answer -- and on an error, or a failing endpoint would
     * be polled every five seconds for as long as the tab is open. TanStack
     * pauses it on a hidden tab either way.
     */
    retry: false,
    refetchInterval: (query) =>
      verification &&
      query.state.status !== "error" &&
      verificationState(
        query.state.data?.lastCallAt,
        verification.startedAt,
        verification.baseline,
        clock,
      ) === "waiting"
        ? 5_000
        : false,
  });
  const lastCallAt = connection.data?.lastCallAt ?? null;
  /*
   * Green forever would be a lie of a different kind. Recency is the only
   * thing this page actually knows, and spending it on a binary ever/never
   * puts a success pill beside "8 ay önce", which reads as healthy to the one
   * operator whose agent has been broken since spring. Thirty days is a
   * judgement, not a measurement: wider than this tool's own weekly cadence,
   * narrow enough that a dead install stops claiming to be alive.
   */
  const evidence = connectionEvidence(lastCallAt);
  const isRecent =
    evidence !== null && Date.now() - evidence < 30 * 24 * 60 * 60 * 1000;
  /*
   * A failed read is not a verdict of "not connected". Several screens in
   * this app once rendered a 500 as an empty state, which is what
   * QueryErrorState was written to stop; the same mistake in a header slot
   * would send an operator whose agent works fine back through setup.
   */
  const statusUnknown =
    connection.isError ||
    connection.data === undefined ||
    (lastCallAt !== null && evidence === null);
  // A running installation defaults to client setup, independent of call history.
  const startVerification = () => {
    setClock(Date.now());
    setVerification({
      startedAt: Date.now(),
      baseline: connectionEvidence(lastCallAt),
    });
    void connection.refetch();
  };
  const verificationOutcome = verification
    ? verificationState(
        lastCallAt,
        verification.startedAt,
        verification.baseline,
        clock,
      )
    : null;

  return {
    connection,
    lastCallAt,
    isRecent,
    statusUnknown,
    verification,
    verificationOutcome,
    startVerification,
    cancelVerification: () => setVerification(null),
  };
}
