import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { hashVisitorIdentity } from "./visitorIdentity";

const ALL_UNIQUE_SET = "visitors:unique:all";
const LEGACY_TOTAL_KEY = "visitors:total";
const TODAY_TTL_SECONDS = 60 * 60 * 48;
const POST_RATE_LIMIT = 10;
const POST_RATE_WINDOW = "60 s" as const;

function todayDateKST() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function todayUniqueSetKey() {
  return `visitors:unique:today:${todayDateKST()}`;
}

function getRedis() {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

let rateLimiter: Ratelimit | null = null;

function getRateLimiter(redis: Redis) {
  if (!rateLimiter) {
    rateLimiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(POST_RATE_LIMIT, POST_RATE_WINDOW),
      prefix: "visitors:rl",
    });
  }
  return rateLimiter;
}

export type VisitorStats = {
  total: number;
  today: number;
};

function todayLegacyKey() {
  return `visitors:today:${todayDateKST()}`;
}

async function resolveStats(redis: Redis, uniqueTotal: number, uniqueToday: number): Promise<VisitorStats> {
  const [legacyTotal, legacyToday] = await Promise.all([
    redis.get<number>(LEGACY_TOTAL_KEY),
    redis.get<number>(todayLegacyKey()),
  ]);
  return {
    total: Math.max(uniqueTotal, legacyTotal ?? 0),
    today: Math.max(uniqueToday, legacyToday ?? 0),
  };
}

export async function getVisitorStats(): Promise<VisitorStats | null> {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const [uniqueTotal, uniqueToday] = await Promise.all([
      redis.scard(ALL_UNIQUE_SET),
      redis.scard(todayUniqueSetKey()),
    ]);
    return resolveStats(redis, uniqueTotal, uniqueToday);
  } catch {
    return null;
  }
}

export async function recordVisit(
  ip: string,
  fingerprint: string,
): Promise<{ stats: VisitorStats | null; rateLimited: boolean }> {
  const redis = getRedis();
  if (!redis) return { stats: null, rateLimited: false };

  const { success } = await getRateLimiter(redis).limit(`post:${ip}`);
  if (!success) return { stats: null, rateLimited: true };

  try {
    const identity = hashVisitorIdentity(ip, fingerprint);
    const todayKey = todayUniqueSetKey();

    await Promise.all([redis.sadd(todayKey, identity), redis.sadd(ALL_UNIQUE_SET, identity)]);
    await redis.expire(todayKey, TODAY_TTL_SECONDS);

    const [uniqueTotal, uniqueToday] = await Promise.all([
      redis.scard(ALL_UNIQUE_SET),
      redis.scard(todayKey),
    ]);

    const stats = await resolveStats(redis, uniqueTotal, uniqueToday);
    return { stats, rateLimited: false };
  } catch {
    return { stats: null, rateLimited: false };
  }
}
