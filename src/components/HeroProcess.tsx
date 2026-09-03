"use client";

import { PLANNING_PROCESS } from "@/data/tracks";
import HoverLift from "./ui/HoverLift";

export default function HeroProcess() {
  return (
    <ol className="flex h-full flex-col justify-center gap-3 py-8 lg:py-0" aria-label="기획 과정">
      {PLANNING_PROCESS.map((item) => (
        <li key={item.step}>
          <HoverLift>
            <div className="rounded-md border border-white/15 bg-white/5 px-4 py-4 sm:px-5 sm:py-5">
              <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-white/40">
                {item.step}
              </p>
              <p className="mt-2 text-lg font-bold tracking-tight text-white sm:text-xl">{item.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60 sm:text-[0.95rem]">{item.detail}</p>
            </div>
          </HoverLift>
        </li>
      ))}
    </ol>
  );
}
