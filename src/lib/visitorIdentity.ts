import { createHash } from "crypto";

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  return "unknown";
}

export function getClientFingerprint(request: Request): string {
  const raw = request.headers.get("x-visitor-fp")?.trim() ?? "";
  if (!raw || raw.length > 64) return "";
  return raw.replace(/[^\w-]/g, "").slice(0, 64);
}

export function hashVisitorIdentity(ip: string, fingerprint: string): string {
  const salt = process.env.VISITOR_HASH_SALT ?? "kiminhong-portfolio-visitor-v1";
  return createHash("sha256").update(`${salt}:${ip}:${fingerprint}`).digest("hex").slice(0, 32);
}
