"use client";

import { useEffect } from "react";

// Registers the offline service worker. Silent by design — install/update UX
// is the browser's own add-to-home-screen flow.
export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
  }, []);
  return null;
}
