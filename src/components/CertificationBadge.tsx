import type { Certification } from "@/data/content";

type CertificationBadgeProps = {
  cert: Certification;
  className?: string;
};

export default function CertificationBadge({ cert, className = "" }: CertificationBadgeProps) {
  const isAward = cert.type === "award";
  const isEnglish = cert.type === "english";
  const badgeLabel = isAward ? "Award" : isEnglish ? "English" : "Cert";
  const badgeClass = isAward
    ? "border border-primary/50 text-primary"
    : isEnglish
      ? "border border-secondary/50 text-secondary"
      : "bg-accent/15 text-accent";

  return (
    <article
      className={`cert-badge gallery-card rounded-2xl p-5 shadow-sm transition-colors sm:p-6 ${
        isAward
          ? "border-2 border-dashed border-primary/40 bg-bg hover:border-primary"
          : isEnglish
            ? "border border-secondary/35 bg-surface hover:border-secondary/55"
            : "border border-border bg-surface hover:border-accent"
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-bold tracking-tight text-text sm:text-lg">{cert.name}</h3>
          <p className="mt-0.5 text-sm text-primary">{cert.fullName}</p>
        </div>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${badgeClass}`}
        >
          {badgeLabel}
        </span>
      </div>
      <p className="mt-3 text-sm text-muted">
        {cert.issuer} · {cert.date}
      </p>
      <p className="mt-2 break-keep text-sm leading-relaxed text-text/80">{cert.description}</p>
    </article>
  );
}
