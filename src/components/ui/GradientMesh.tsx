"use client";

import { useEffect, useState } from "react";

const GRADIENT_COLORS = ["#5FA8A3", "#7EC8C2", "#6FAED9"];

export default function GradientMesh() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden" aria-hidden="true">
      <svg
        className="h-full w-full opacity-[0.32]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="mesh-grad-1" cx="30%" cy="40%" r="50%">
            <stop offset="0%" stopColor={GRADIENT_COLORS[0]} stopOpacity="1" />
            <stop offset="100%" stopColor={GRADIENT_COLORS[0]} stopOpacity="0" />
            {!prefersReduced && (
              <animate
                attributeName="cx"
                values="30%;45%;25%;30%"
                dur="12s"
                repeatCount="indefinite"
              />
            )}
            {!prefersReduced && (
              <animate
                attributeName="cy"
                values="40%;55%;35%;40%"
                dur="12s"
                repeatCount="indefinite"
              />
            )}
          </radialGradient>
          <radialGradient id="mesh-grad-2" cx="70%" cy="60%" r="45%">
            <stop offset="0%" stopColor={GRADIENT_COLORS[1]} stopOpacity="1" />
            <stop offset="100%" stopColor={GRADIENT_COLORS[1]} stopOpacity="0" />
            {!prefersReduced && (
              <animate
                attributeName="cx"
                values="70%;55%;75%;70%"
                dur="16s"
                repeatCount="indefinite"
              />
            )}
            {!prefersReduced && (
              <animate
                attributeName="cy"
                values="60%;45%;65%;60%"
                dur="16s"
                repeatCount="indefinite"
              />
            )}
          </radialGradient>
          <radialGradient id="mesh-grad-3" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor={GRADIENT_COLORS[2]} stopOpacity="1" />
            <stop offset="100%" stopColor={GRADIENT_COLORS[2]} stopOpacity="0" />
            {!prefersReduced && (
              <animate
                attributeName="cx"
                values="50%;60%;40%;50%"
                dur="20s"
                repeatCount="indefinite"
              />
            )}
            {!prefersReduced && (
              <animate
                attributeName="cy"
                values="50%;40%;60%;50%"
                dur="20s"
                repeatCount="indefinite"
              />
            )}
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#mesh-grad-1)" />
        <rect width="100%" height="100%" fill="url(#mesh-grad-2)" />
        <rect width="100%" height="100%" fill="url(#mesh-grad-3)" />
      </svg>
    </div>
  );
}
