import { NextResponse } from "next/server";
import {
  getClientFingerprint,
  getClientIp,
  sanitizeFingerprint,
} from "@/lib/visitorIdentity";
import { getVisitorStats, recordVisit } from "@/lib/visitors";

export const dynamic = "force-dynamic";

async function resolveFingerprint(request: Request): Promise<string> {
  const fromHeader = getClientFingerprint(request);
  if (fromHeader) return fromHeader;

  try {
    const body = (await request.json()) as { fingerprint?: unknown };
    if (typeof body.fingerprint === "string") {
      return sanitizeFingerprint(body.fingerprint);
    }
  } catch {
    // empty or invalid JSON body
  }

  return "";
}

export async function GET() {
  const stats = await getVisitorStats();
  if (!stats) {
    return NextResponse.json({ enabled: false, total: null, today: null });
  }
  return NextResponse.json(
    { enabled: true, ...stats },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const fingerprint = await resolveFingerprint(request);
  const { stats, rateLimited } = await recordVisit(ip, fingerprint);

  if (rateLimited) {
    if (!stats) {
      return NextResponse.json(
        { enabled: false, total: null, today: null, recorded: false },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { enabled: true, recorded: false, error: "rate_limited", ...stats },
      { status: 429, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!stats) {
    return NextResponse.json(
      { enabled: false, total: null, today: null, recorded: false },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  return NextResponse.json(
    { enabled: true, recorded: true, ...stats },
    { headers: { "Cache-Control": "no-store" } },
  );
}
