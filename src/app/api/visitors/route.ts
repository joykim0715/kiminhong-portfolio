import { NextResponse } from "next/server";
import { getClientFingerprint, getClientIp } from "@/lib/visitorIdentity";
import { getVisitorStats, recordVisit } from "@/lib/visitors";

export async function GET() {
  const stats = await getVisitorStats();
  if (!stats) {
    return NextResponse.json({ enabled: false, total: null, today: null });
  }
  return NextResponse.json({ enabled: true, ...stats });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const fingerprint = getClientFingerprint(request);
  const { stats, rateLimited } = await recordVisit(ip, fingerprint);

  if (rateLimited) {
    return NextResponse.json(
      { enabled: true, error: "rate_limited", total: null, today: null },
      { status: 429 },
    );
  }

  if (!stats) {
    return NextResponse.json({ enabled: false, total: null, today: null }, { status: 503 });
  }

  return NextResponse.json({ enabled: true, ...stats });
}
