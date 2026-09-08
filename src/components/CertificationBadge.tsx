import type { Certification } from "@/data/content";
import HoverLift from "./ui/HoverLift";

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
    <HoverLift className="h-full">
      <article
        className={`cert-badge gallery-card flex h-full min-h-[17.5rem] flex-col rounded-xl p-5 transition-[border-color,box-shadow] duration-300 sm:min-h-[18.5rem] sm:p-6 lg:min-h-[20.5rem] hover:shadow-[0_14px_36px_-22px_rgba(95,168,163,0.45)] ${
          isAward
            ? "border border-dashed border-primary/40 bg-bg hover:border-primary"
            : isEnglish
              ? "border border-secondary/35 bg-surface hover:border-secondary/55"
              : "border border-border bg-surface hover:border-accent"
        } ${className}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="min-h-[3.25rem] text-base font-bold tracking-tight text-text sm:min-h-[3.5rem] sm:text-lg">
              {cert.name}
            </h3>
            <p className="text-preline mt-0.5 min-h-[2.5rem] text-sm text-primary">{cert.fullName}</p>
          </div>
          <span
            className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${badgeClass}`}
          >
            {badgeLabel}
          </span>
        </div>
        <p className="mt-3 shrink-0 text-sm text-muted">
          {cert.issuer} · {cert.date}
        </p>
        <p className="text-preline mt-2 min-h-[3.75rem] flex-1 break-keep text-sm leading-relaxed text-text/80">
          {cert.description}
        </p>
      </article>
    </HoverLift>
  );
}
