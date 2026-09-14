"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { useSiteContent } from "./ContentProvider";
import styles from "./GradientTransition.module.css";

const HIDDEN = "inset(100% 0 0 0)";
const SHOWN = "inset(0% 0 0 0)";
const GONE = "inset(0 0 100% 0)";

export default function GradientTransition() {
  const { bridge } = useSiteContent();
  const zoneRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const curtain = curtainRef.current;
    if (!zone || !curtain) return;

    const reduced = prefersReducedMotion();
    if (reduced) {
      zone.setAttribute("data-reduced", "");
      return;
    }

    zone.removeAttribute("data-reduced");

    const rule = curtain.querySelector(".bridge-rule");
    const line1 = curtain.querySelector(".bridge-line-1");
    const line2 = curtain.querySelector(".bridge-line-2");

    const ctx = gsap.context(() => {
      gsap.set(curtain, { clipPath: HIDDEN, pointerEvents: "none" });
      gsap.set([rule, line1, line2], { opacity: 0 });
      gsap.set([line1, line2], { y: 16 });
      gsap.set(rule, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: zone,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      tl.to(curtain, { clipPath: SHOWN, pointerEvents: "auto", duration: 1 })
        .to(rule, { opacity: 1, scaleX: 1, duration: 0.2 }, 0.55)
        .to(line1, { opacity: 1, y: 0, duration: 0.24 }, 0.6)
        .to(line2, { opacity: 1, y: 0, duration: 0.28 }, 0.66)
        .to({}, { duration: 0.72 })
        .to([rule, line1, line2], { opacity: 0, y: -10, duration: 0.2 })
        .to(curtain, { clipPath: GONE, pointerEvents: "none", duration: 0.9 }, "<");
    }, zone);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={zoneRef}
      id="bridge"
      className={styles.zone}
      aria-label={bridge.line2}
    >
      <div className={styles.spacer} aria-hidden="true" />
      <div ref={curtainRef} className={styles.curtain}>
        <div className={styles.copy}>
          <div className={`${styles.rule} bridge-rule`} aria-hidden="true" />
          <p className={`text-preline ${styles.line} ${styles.line1} bridge-line-1`}>
            {bridge.line1}
          </p>
          <p className={`text-preline ${styles.line} ${styles.line2} bridge-line-2`}>
            {bridge.line2}
          </p>
        </div>
      </div>
    </section>
  );
}
