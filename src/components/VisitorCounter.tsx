"use client";

import { useEffect, useState } from "react";

type VisitorResponse = {
  enabled: boolean;
  total: number | null;
  today: number | null;
};

const FINGERPRINT_KEY = "portfolio-visitor-fp";
let sessionFingerprint: string | null = null;

function formatCount(value: number) {
  return value.toLocaleString("ko-KR");
}

function getVisitorFingerprint(): string {
  try {
    let fp = localStorage.getItem(FINGERPRINT_KEY);
    if (!fp) {
      fp = crypto.randomUUID();
      localStorage.setItem(FINGERPRINT_KEY, fp);
    }
    return fp;
  } catch {
    if (!sessionFingerprint) {
      sessionFingerprint = crypto.randomUUID();
    }
    return sessionFingerprint;
  }
}

async function fetchVisitorStats(): Promise<VisitorResponse | null> {
  const getRes = await fetch("/api/visitors", { cache: "no-store" });
  if (!getRes.ok) return null;
  return (await getRes.json()) as VisitorResponse;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitorResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const fingerprint = getVisitorFingerprint();
        const postRes = await fetch("/api/visitors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Visitor-Fp": fingerprint,
          },
          body: JSON.stringify({ fingerprint }),
          cache: "no-store",
        });

        const postData = (await postRes.json()) as VisitorResponse;
        if (postData.enabled && postData.total !== null && postData.today !== null) {
          setStats(postData);
          return;
        }

        const fallback = await fetchVisitorStats();
        if (fallback) setStats(fallback);
      } catch {
        const fallback = await fetchVisitorStats();
        if (fallback) {
          setStats(fallback);
          return;
        }
        setStats({ enabled: false, total: null, today: null });
      }
    };

    void load();
  }, []);

  if (!stats?.enabled || stats.total === null || stats.today === null) {
    return null;
  }

  return (
    <p
      className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-bold leading-snug text-text sm:text-sm"
      aria-label={`총 방문자 수 ${stats.total}명, 오늘 방문자 수 ${stats.today}명`}
    >
      <span>
        총 방문자 수{" "}
        <span className="text-base font-extrabold tabular-nums text-primary sm:text-lg">
          {formatCount(stats.total)}
        </span>
      </span>
      <span className="font-normal text-muted" aria-hidden>
        /
      </span>
      <span>
        오늘 방문자 수{" "}
        <span className="text-base font-extrabold tabular-nums text-primary sm:text-lg">
          {formatCount(stats.today)}
        </span>
      </span>
    </p>
  );
}
