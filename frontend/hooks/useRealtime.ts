"use client";

import { useEffect, useState } from "react";

export function useRealtime(intervalMs = 10000) {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdated(new Date().toISOString());

    const interval = window.setInterval(() => {
      setLastUpdated(new Date().toISOString());
    }, intervalMs);

    return () => window.clearInterval(interval);
  }, [intervalMs]);

  return { lastUpdated };
}
