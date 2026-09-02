"use client";

import { PROOF_METRICS } from "@/data/tracks";
import { useTrack } from "./TrackProvider";

/** Hero 하단 증명 스트립 — 세일즈·기획·마케팅. 연구원은 렌더하지 않음. */
export default function TrackProofBar() {
  const { track } = useTrack();
  const metrics = PROOF_METRICS[track];
  if (!metrics?.length) return null;

  return (
    <div
      className="relative z-[4] border-t border-white/10 bg-black"
      aria-label="핵심 지표"
    >
      <ul className="section-container grid grid-cols-3 divide-x divide-white/10">
        {metrics.map((metric) => (
          <li key={`${metric.value}-${metric.label}`} className="px-3 py-4 text-center sm:py-5">
            <p className="text-lg font-extrabold tabular-nums tracking-tight text-white sm:text-2xl">
              {metric.value}
            </p>
            <p className="mt-1 text-[11px] font-medium tracking-wide text-white/50 sm:text-xs">
              {metric.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
