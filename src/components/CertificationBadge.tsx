import type { Certification } from "@/data/content";
import HoverLift from "./ui/HoverLift";

type CertificationBadgeProps = {
  cert: Certification;
  className?: string;
  compact?: boolean;
};

export default function CertificationBadge({
  cert,
  className = "",
  compact = false,
}: CertificationBadgeProps) {
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
        className={`cert-badge gallery-card flex h-full flex-col rounded-xl transition-[border-color,box-shadow] duration-300 hover:shadow-[0_14px_36px_-22px_rgba(95,168,163,0.45)] ${
          compact ? "p-3 sm:p-3.5" : "p-5 sm:p-6"
        } ${
          isAward
            ? "border border-dashed border-primary/40 bg-bg hover:border-primary"
            : isEnglish
              ? "border border-secondary/35 bg-surface hover:border-secondary/55"
              : "border border-border bg-surface hover:border-accent"
        } ${className}`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3
              className={`font-bold tracking-tight text-text ${
                compact
                  ? "line-clamp-2 min-h-[2.5rem] text-sm"
                  : "min-h-[2.5rem] text-base sm:min-h-[2.75rem] sm:text-lg"
              }`}
            >
              {cert.name}
            </h3>
            <p
              className={`text-preline text-primary ${
                compact ? "mt-0.5 line-clamp-2 min-h-[2rem] text-xs" : "mt-0.5 min-h-[2.25rem] text-sm"
              }`}
            >
              {cert.fullName}
            </p>
          </div>
          <span
            className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${badgeClass}`}
          >
            {badgeLabel}
          </span>
        </div>
        <p className={`shrink-0 text-muted ${compact ? "mt-2 text-xs" : "mt-3 text-sm"}`}>
          {cert.issuer} · {cert.date}
        </p>
        <p
          className={`text-preline flex-1 break-keep leading-relaxed text-text/80 ${
            compact ? "mt-1.5 line-clamp-2 text-xs" : "mt-2 min-h-[2.5rem] text-sm"
          }`}
        >
          {cert.description}
        </p>
      </article>
    </HoverLift>
  );
}
