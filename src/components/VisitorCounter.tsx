"use client";

import { useEffect, useState } from "react";

type VisitorResponse = {
  enabled: boolean;
  total: number | null;
  today: number | null;
};

const SESSION_KEY = "portfolio-visitor-counted";
const FINGERPRINT_KEY = "portfolio-visitor-fp";

function formatCount(value: number) {
  return value.toLocaleString("ko-KR");
}

function getVisitorFingerprint(): string {
  let fp = localStorage.getItem(FINGERPRINT_KEY);
  if (!fp) {
    fp = crypto.randomUUID();
    localStorage.setItem(FINGERPRINT_KEY, fp);
  }
  return fp;
}

export default function VisitorCounter() {
  const [stats, setStats] = useState<VisitorResponse | null>(null);

  useEffect(() => {
    const todayKST = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    const alreadyCounted = sessionStorage.getItem(SESSION_KEY) === todayKST;

    const load = async () => {
      try {
        if (!alreadyCounted) {
          const postRes = await fetch("/api/visitors", {
            method: "POST",
            headers: { "X-Visitor-Fp": getVisitorFingerprint() },
          });
          if (postRes.ok) {
            sessionStorage.setItem(SESSION_KEY, todayKST);
            setStats((await postRes.json()) as VisitorResponse);
            return;
          }
          if (postRes.status !== 429) return;
        }

        const getRes = await fetch("/api/visitors");
        if (getRes.ok) {
          setStats((await getRes.json()) as VisitorResponse);
        }
      } catch {
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
