import { useEffect } from "react";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { Toaster } from "sonner";
import { notify } from "./notify";
import { setNotificationPrefs } from "./prefs";

function NotifyOnMount() {
  useEffect(() => {
    notify({
      kind: "announcement",
      title: "First-load notification",
      importance: "low",
    });
  }, []);
  return null;
}

// Sonner does not replay events emitted before its subscription. Keep the
// root's Toaster-before-children order so mount effects reach the operator.
it("shows a notification emitted by a child mount effect on first load", async () => {
  setNotificationPrefs({ sound: false });
  render(
    <>
      <Toaster />
      <NotifyOnMount />
    </>,
  );
  expect(await screen.findByText("First-load notification")).toBeTruthy();
});
