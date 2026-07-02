import { NextResponse } from "next/server";
import { getVisitorStats, incrementVisitorStats } from "@/lib/visitors";

export async function GET() {
  const stats = await getVisitorStats();
  if (!stats) {
    return NextResponse.json({ enabled: false, total: null, today: null });
  }
  return NextResponse.json({ enabled: true, ...stats });
}

export async function POST() {
  const stats = await incrementVisitorStats();
  if (!stats) {
    return NextResponse.json({ enabled: false, total: null, today: null }, { status: 503 });
  }
  return NextResponse.json({ enabled: true, ...stats });
}
