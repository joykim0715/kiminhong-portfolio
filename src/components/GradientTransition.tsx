"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { afterIntro } from "@/lib/introReady";
import { prefersReducedMotion } from "@/lib/animations";
import { useSiteContent } from "./ContentProvider";
import styles from "./GradientTransition.module.css";

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
    let ctx: gsap.Context | undefined;

    const start = () => {
    ctx = gsap.context(() => {
      curtain.style.transform = "translate3d(0, 100%, 0)";
      gsap.set(curtain, {
        y: "100%",
        opacity: 1,
        backgroundColor: "#000000",
        pointerEvents: "none",
      });
      gsap.set([rule, line1, line2], { opacity: 0 });
      gsap.set([line1, line2], { y: 16 });
      gsap.set(rule, { scaleX: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: zone,
          start: "top 90%",
          end: "bottom top",
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      tl.to(curtain, { y: "0%", pointerEvents: "auto", duration: 1.15 })
        .to(rule, { opacity: 1, scaleX: 1, duration: 0.24 }, 0.55)
        .to(line1, { opacity: 1, y: 0, duration: 0.28 }, 0.62)
        .to(line2, { opacity: 1, y: 0, duration: 0.32 }, 0.7)
        .to({}, { duration: 0.95 })
        .to([rule, line1, line2], { opacity: 0, y: -12, duration: 0.28 })
        .to(curtain, { backgroundColor: "#1c2b30", duration: 0.28 })
        .to(curtain, { backgroundColor: "#3f6964", duration: 0.32 })
        .to(curtain, { backgroundColor: "#8fc4be", duration: 0.32 })
        .to(curtain, { backgroundColor: "#d4e8e4", duration: 0.28 })
        .to(curtain, { backgroundColor: "#f7f8f6", duration: 0.26 })
        .to(curtain, { opacity: 0, y: "-6%", pointerEvents: "none", duration: 0.45 });
    }, zone);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    afterIntro(start);
    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={zoneRef}
      id="bridge"
      className={styles.zone}
      aria-label={bridge.line2}
    >
      <div className={styles.spacer} aria-hidden="true" />
      <div ref={curtainRef} className={styles.curtain} data-bridge-curtain>
        <div className={styles.lip} aria-hidden="true" />
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
