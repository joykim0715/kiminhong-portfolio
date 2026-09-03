"use client";

import { PLANNING_PROCESS } from "@/data/tracks";
import HoverLift from "./ui/HoverLift";

/** 기획 히어로 하단 스트립 — 컷아웃 사진을 대체하지 않음 */
export default function HeroProcess() {
  return (
    <ol
      className="relative z-[5] grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 bg-black/80 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
      aria-label="기획 과정"
    >
      {PLANNING_PROCESS.map((item) => (
        <li key={item.step} className="px-5 py-4 sm:px-6 sm:py-5">
          <HoverLift>
            <div>
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[color:var(--clr-accent)]">
                {item.step} {item.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.detail}</p>
            </div>
          </HoverLift>
        </li>
      ))}
    </ol>
  );
}
