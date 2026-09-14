"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import { useSiteContent } from "./ContentProvider";
import styles from "./GradientTransition.module.css";

export default function GradientTransition() {
  const { bridge } = useSiteContent();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      const rule = section.querySelector(".bridge-rule");
      const line1 = section.querySelector(".bridge-line-1");
      const line2 = section.querySelector(".bridge-line-2");

      if (reduced) {
        gsap.set([rule, line1, line2], { opacity: 1, y: 0, scaleX: 1, clipPath: "inset(0 0% 0 0)" });
        return;
      }

      gsap.set(rule, { scaleX: 0 });
      gsap.set(line1, { y: 22, clipPath: "inset(0 100% 0 0)" });
      gsap.set(line2, { y: 28, clipPath: "inset(0 100% 0 0)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      tl.to(rule, { scaleX: 1, duration: 0.7, ease: "power2.out" })
        .to(
          line1,
          { y: 0, clipPath: "inset(0 0% 0 0)", duration: 0.9, ease: "power3.out" },
          "-=0.32",
        )
        .to(
          line2,
          { y: 0, clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power3.out" },
          "-=0.72",
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.bridgeSection} aria-hidden="false">
      <div className={styles.bridgeGradient} aria-hidden="true" />
      <div className={styles.bridgeTopFade} aria-hidden="true" />
      <div className={styles.bridgeBottomFade} aria-hidden="true" />

      <div className={styles.bridgeCopy}>
        <div className={`${styles.bridgeRule} bridge-rule`} aria-hidden="true" />
        <p className={`text-preline ${styles.bridgeLine} ${styles.bridgeLine1} bridge-line-1`}>
          {bridge.line1}
        </p>
        <p className={`text-preline ${styles.bridgeLine} ${styles.bridgeLine2} bridge-line-2`}>
          {bridge.line2}
        </p>
      </div>
    </section>
  );
}
