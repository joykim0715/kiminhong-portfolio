"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";
import styles from "./HeroPortrait.module.css";

export type ProfileGalleryItem = {
  src: string;
  alt: string;
  variant: "formal" | "field";
};

type HeroPortraitProps = {
  images: ProfileGalleryItem[];
  hint?: { desktop: string; mobile: string };
};

type FocusTarget = "formal" | "field0" | "field1" | null;

const EASE = "power2.out";
const DURATION = 0.55;
const INTRO_DELAY = 2.1;

export default function HeroPortrait({ images, hint }: HeroPortraitProps) {
  const formal = images.find((img) => img.variant === "formal");
  const field = images.filter((img) => img.variant === "field");

  const collageRef = useRef<HTMLDivElement>(null);
  const formalRef = useRef<HTMLDivElement>(null);
  const fieldARef = useRef<HTMLDivElement>(null);
  const fieldBRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<FocusTarget>(null);
  const interactedRef = useRef(false);
  const floatTweensRef = useRef<gsap.core.Tween[]>([]);
  const introPlayedRef = useRef(false);

  const [showHint, setShowHint] = useState(true);
  const [isIdle, setIsIdle] = useState(true);

  const applyFocus = useCallback((target: FocusTarget) => {
    const formalEl = formalRef.current;
    const fieldAEl = fieldARef.current;
    const fieldBEl = fieldBRef.current;
    if (!formalEl) return;

    focusRef.current = target;

    const base = {
      formal: { xPercent: -50, yPercent: -54, x: 0, y: 0, rotation: -2.5, scale: 1, zIndex: 2, opacity: 1 },
      fieldA: { x: 0, y: 0, rotation: -7, scale: 1, zIndex: 3, opacity: 1 },
      fieldB: { x: 0, y: 0, rotation: 6, scale: 1, zIndex: 3, opacity: 1 },
    };

    const layouts: Record<NonNullable<FocusTarget>, typeof base> = {
      formal: {
        formal: { xPercent: -50, yPercent: -54, x: 0, y: 0, rotation: -1, scale: 1.07, zIndex: 5, opacity: 1 },
        fieldA: { x: -34, y: 28, rotation: -14, scale: 0.9, zIndex: 2, opacity: 0.72 },
        fieldB: { x: 34, y: -24, rotation: 14, scale: 0.9, zIndex: 2, opacity: 0.72 },
      },
      field0: {
        formal: { xPercent: -50, yPercent: -54, x: 0, y: 0, rotation: -2.5, scale: 1.02, zIndex: 2, opacity: 1 },
        fieldA: { x: -30, y: 36, rotation: -2, scale: 1.14, zIndex: 6, opacity: 1 },
        fieldB: { x: 22, y: -16, rotation: 10, scale: 0.86, zIndex: 2, opacity: 0.65 },
      },
      field1: {
        formal: { xPercent: -50, yPercent: -54, x: 0, y: 0, rotation: -2.5, scale: 1.02, zIndex: 2, opacity: 1 },
        fieldA: { x: -22, y: 20, rotation: -12, scale: 0.86, zIndex: 2, opacity: 0.65 },
        fieldB: { x: 30, y: -30, rotation: 2, scale: 1.14, zIndex: 6, opacity: 1 },
      },
    };

    const layout = target ? layouts[target] : base;

    gsap.to(formalEl, { ...layout.formal, duration: DURATION, ease: EASE });
    if (fieldAEl) gsap.to(fieldAEl, { ...layout.fieldA, duration: DURATION, ease: EASE });
    if (fieldBEl) gsap.to(fieldBEl, { ...layout.fieldB, duration: DURATION, ease: EASE });
  }, []);

  const startIdleFloat = useCallback(() => {
    if (prefersReducedMotion()) return;

    floatTweensRef.current.forEach((t) => t.kill());
    floatTweensRef.current = [];

    const pairs = [
      { el: formalRef.current, y: 5, duration: 3.2 },
      { el: fieldARef.current, y: 7, duration: 2.6 },
      { el: fieldBRef.current, y: 6, duration: 2.9 },
    ];

    pairs.forEach(({ el, y, duration }) => {
      if (!el) return;
      const tween = gsap.to(el, {
        y: `+=${y}`,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      floatTweensRef.current.push(tween);
    });
  }, []);

  const pauseIdleFloat = useCallback(() => {
    floatTweensRef.current.forEach((t) => t.pause());
  }, []);

  const restartIdleFloat = useCallback(() => {
    if (focusRef.current) return;
    floatTweensRef.current.forEach((t) => t.kill());
    startIdleFloat();
  }, [startIdleFloat]);

  const dismissHint = useCallback(() => {
    if (interactedRef.current) return;
    interactedRef.current = true;
    setIsIdle(false);

    const hintEl = hintRef.current;
    if (hintEl) {
      gsap.to(hintEl, {
        opacity: 0,
        y: 6,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => setShowHint(false),
      });
    } else {
      setShowHint(false);
    }
  }, []);

  const playIntroDemo = useCallback(() => {
    if (prefersReducedMotion() || introPlayedRef.current || interactedRef.current) return;
    introPlayedRef.current = true;

    pauseIdleFloat();

    const tl = gsap.timeline({
      delay: INTRO_DELAY,
      onComplete: () => {
        if (!interactedRef.current) restartIdleFloat();
      },
    });

    tl.call(() => applyFocus("formal"))
      .to({}, { duration: 1.35 })
      .call(() => {
        if (!interactedRef.current) applyFocus(null);
      });
  }, [applyFocus, pauseIdleFloat, restartIdleFloat]);

  useEffect(() => {
    const formalEl = formalRef.current;
    const fieldAEl = fieldARef.current;
    const fieldBEl = fieldBRef.current;
    const collageEl = collageRef.current;
    if (!formalEl || !collageEl) return;

    gsap.set(formalEl, { xPercent: -50, yPercent: -54, rotation: -2.5, transformOrigin: "50% 50%" });
    if (fieldAEl) gsap.set(fieldAEl, { rotation: -7, transformOrigin: "50% 80%" });
    if (fieldBEl) gsap.set(fieldBEl, { rotation: 6, transformOrigin: "50% 20%" });

    if (hintRef.current) {
      gsap.fromTo(hintRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 1.6, ease: EASE });
    }

    startIdleFloat();
    playIntroDemo();

    const onMove = (e: MouseEvent) => {
      dismissHint();
      if (prefersReducedMotion() || focusRef.current) return;
      const rect = collageEl.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(formalEl, { x: px * 10, y: py * 8, duration: 0.55, ease: "sine.out", overwrite: "auto" });
      if (fieldAEl) gsap.to(fieldAEl, { x: px * -14, y: py * -10, duration: 0.6, ease: "sine.out", overwrite: "auto" });
      if (fieldBEl) gsap.to(fieldBEl, { x: px * 14, y: py * -12, duration: 0.6, ease: "sine.out", overwrite: "auto" });
    };

    const onLeave = () => {
      if (focusRef.current) return;
      gsap.to([formalEl, fieldAEl, fieldBEl].filter(Boolean), {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: EASE,
      });
    };

    collageEl.addEventListener("mousemove", onMove);
    collageEl.addEventListener("mouseleave", onLeave);

    return () => {
      collageEl.removeEventListener("mousemove", onMove);
      collageEl.removeEventListener("mouseleave", onLeave);
      floatTweensRef.current.forEach((t) => t.kill());
    };
  }, [startIdleFloat, playIntroDemo, dismissHint]);

  const handleEnter = (target: FocusTarget) => {
    dismissHint();
    pauseIdleFloat();
    applyFocus(target);
  };

  const handleLeaveCollage = () => {
    applyFocus(null);
    restartIdleFloat();
  };

  const handleTap = (target: FocusTarget) => {
    dismissHint();
    if (focusRef.current === target) {
      applyFocus(null);
      restartIdleFloat();
    } else {
      pauseIdleFloat();
      applyFocus(target);
    }
  };

  if (!formal) return null;

  const hintDesktop = hint?.desktop ?? "마우스를 올려 사진을 둘러보세요";
  const hintMobile = hint?.mobile ?? "탭해서 사진 둘러보기";

  return (
    <div
      ref={collageRef}
      className={`${styles.collage} transform-gpu will-change-transform ${isIdle ? styles.collageIdle : ""}`}
      onMouseLeave={handleLeaveCollage}
    >
      <div className={styles.aura} aria-hidden="true" />
      <div className={styles.orbit} aria-hidden="true" />

      <div
        ref={formalRef}
        className={`${styles.card} ${styles.formal} ${styles.interactive} transform-gpu will-change-transform`}
        onMouseEnter={() => handleEnter("formal")}
        onClick={() => handleTap("formal")}
        onKeyDown={(e) => e.key === "Enter" && handleTap("formal")}
        role="button"
        tabIndex={0}
        aria-label="프로필 사진 보기"
      >
        <Image
          src={formal.src}
          alt={formal.alt}
          fill
          className={`${styles.cardImage} ${styles.formalImage} sharp-image`}
          priority
          quality={92}
          sizes="(max-width: 1024px) 300px, 400px"
        />
        <div className={styles.formalTint} aria-hidden="true" />
        <div className={styles.scanGrid} aria-hidden="true" />
        {isIdle && <span className={styles.cardBadge}>Profile</span>}
      </div>

      {field[0] && (
        <div
          ref={fieldARef}
          className={`${styles.card} ${styles.field} ${styles.fieldA} ${styles.interactive} transform-gpu will-change-transform`}
          onMouseEnter={() => handleEnter("field0")}
          onClick={() => handleTap("field0")}
          onKeyDown={(e) => e.key === "Enter" && handleTap("field0")}
          role="button"
          tabIndex={0}
          aria-label={field[0].alt}
        >
          <div className={`${styles.fieldInner} transform-gpu will-change-transform`}>
            <Image
              src={field[0].src}
              alt={field[0].alt}
              fill
              className={`${styles.cardImage} ${styles.fieldImage} sharp-image`}
              quality={92}
              sizes="(max-width: 1024px) 220px, 280px"
            />
          </div>
          {isIdle && <span className={styles.cardBadge}>Field</span>}
        </div>
      )}

      {field[1] && (
        <div
          ref={fieldBRef}
          className={`${styles.card} ${styles.field} ${styles.fieldB} ${styles.interactive} transform-gpu will-change-transform`}
          onMouseEnter={() => handleEnter("field1")}
          onClick={() => handleTap("field1")}
          onKeyDown={(e) => e.key === "Enter" && handleTap("field1")}
          role="button"
          tabIndex={0}
          aria-label={field[1].alt}
        >
          <div className={`${styles.fieldInner} transform-gpu will-change-transform`}>
            <Image
              src={field[1].src}
              alt={field[1].alt}
              fill
              className={`${styles.cardImage} ${styles.fieldImage} sharp-image`}
              quality={92}
              sizes="(max-width: 1024px) 220px, 280px"
            />
          </div>
          {isIdle && <span className={styles.cardBadge}>Field</span>}
        </div>
      )}

      {showHint && hint && (
        <div ref={hintRef} className={styles.hint} role="status">
          <span className={styles.hintIcon} aria-hidden="true">
            <span className={styles.hintCursor} />
            <span className={styles.hintRipple} />
          </span>
          <span className={styles.hintDesktop}>{hintDesktop}</span>
          <span className={styles.hintMobile}>{hintMobile}</span>
        </div>
      )}
    </div>
  );
}
