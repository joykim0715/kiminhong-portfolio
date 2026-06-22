import type { Certification } from "@/data/certifications";

type CertificationBadgeProps = {
  cert: Certification;
  className?: string;
};

export default function CertificationBadge({ cert, className = "" }: CertificationBadgeProps) {
  return (
    <article
      className={`cert-badge gallery-card rounded-2xl border border-border bg-surface p-5 shadow-sm transition-colors hover:border-accent sm:p-6 ${className}`}
    >
      <h3 className="text-base font-bold tracking-tight text-text sm:text-lg">{cert.name}</h3>
      <p className="mt-2 text-sm text-muted">{cert.issuer}</p>
      <p className="mt-1 text-sm text-muted">{cert.year}</p>
    </article>
  );
}
