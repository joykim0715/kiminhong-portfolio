import { Redis } from "@upstash/redis";

const TOTAL_KEY = "visitors:total";

function todayKeyKST() {
  const date = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return `visitors:today:${date}`;
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export type VisitorStats = {
  total: number;
  today: number;
};

export async function getVisitorStats(): Promise<VisitorStats | null> {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const [total, today] = await Promise.all([
      redis.get<number>(TOTAL_KEY),
      redis.get<number>(todayKeyKST()),
    ]);
    return {
      total: total ?? 0,
      today: today ?? 0,
    };
  } catch {
    return null;
  }
}

export async function incrementVisitorStats(): Promise<VisitorStats | null> {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const todayKey = todayKeyKST();
    const [total, today] = await Promise.all([redis.incr(TOTAL_KEY), redis.incr(todayKey)]);
    await redis.expire(todayKey, 60 * 60 * 48);
    return { total, today };
  } catch {
    return null;
  }
}
