"use client";

import { useEffect } from "react";

// Registers the offline service worker. Silent by design — install/update UX
// is the browser's own add-to-home-screen flow.
export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    // Ask the browser to treat this origin's storage as persistent — on an
    // installed PWA Chrome grants it silently, which protects the journal
    // and "your usual" from storage-pressure eviction.
    try {
      navigator.storage?.persist?.().catch(() => {});
    } catch {}
  }, []);
  return null;
}
