"use client";

import { useEffect, useState } from "react";

type VisitorResponse = {
  enabled: boolean;
  total: number | null;
  today: number | null;
};

const SESSION_KEY = "portfolio-visitor-counted";

function formatCount(value: number) {
  return value.toLocaleString("ko-KR");
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
          const postRes = await fetch("/api/visitors", { method: "POST" });
          if (postRes.ok) {
            sessionStorage.setItem(SESSION_KEY, todayKST);
            setStats((await postRes.json()) as VisitorResponse);
            return;
          }
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
      className="flex min-w-0 items-center gap-1.5 text-[10px] text-muted sm:gap-2 sm:text-xs"
      aria-label={`총 방문 ${stats.total}명, 오늘 방문 ${stats.today}명`}
    >
      <span className="truncate">
        총 <span className="font-medium text-primary">{formatCount(stats.total)}</span>
      </span>
      <span className="text-border" aria-hidden>
        ·
      </span>
      <span className="shrink-0">
        오늘 <span className="font-medium text-primary">{formatCount(stats.today)}</span>
      </span>
    </p>
  );
}
