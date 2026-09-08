"use client";

import { useCallback, useEffect, useRef, type PointerEvent, type ReactNode } from "react";

type FrostGlassHoverProps = {
  children: ReactNode;
  className?: string;
};

/**
 * OriginKit frost-glass-card, overlay only.
 * Pin 스택이 밀리지 않게 카드 스케일은 하지 않는다.
 */
export default function FrostGlassHover({ children, className = "" }: FrostGlassHoverProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const frostRef = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0, s: 0, ts: 0 });
  const raf = useRef(0);

  const trackPointer = useCallback((event: PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const p = pointer.current;
    p.tx = ((event.clientX - box.left) / box.width) * el.offsetWidth;
    p.ty = ((event.clientY - box.top) / box.height) * el.offsetHeight;
  }, []);

  const close = useCallback(() => {
    hovered.current = false;
    pointer.current.ts = 0;
  }, []);

  useEffect(() => {
    const reach = 92;
    const tick = () => {
      const p = pointer.current;
      p.x += (p.tx - p.x) * 0.25;
      p.y += (p.ty - p.y) * 0.25;
      p.s += (p.ts - p.s) * 0.12;
      const el = frostRef.current;
      if (el) {
        if (p.s < 0.01) {
          el.style.maskImage = "none";
          el.style.setProperty("-webkit-mask-image", "none");
        } else {
          const r = Math.round(reach * p.s);
          const mask = `radial-gradient(circle ${r}px at ${Math.round(p.x)}px ${Math.round(p.y)}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 45%, #000 100%)`;
          el.style.maskImage = mask;
          el.style.setProperty("-webkit-mask-image", mask);
        }
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  useEffect(() => {
    window.addEventListener("pointerup", close);
    window.addEventListener("pointercancel", close);
    return () => {
      window.removeEventListener("pointerup", close);
      window.removeEventListener("pointercancel", close);
    };
  }, [close]);

  return (
    <div
      ref={rootRef}
      className={`relative h-full w-full overflow-hidden ${className}`}
      onPointerEnter={(event) => {
        hovered.current = true;
        trackPointer(event);
        pointer.current.x = pointer.current.tx;
        pointer.current.y = pointer.current.ty;
        pointer.current.ts = 1;
      }}
      onPointerMove={(event) => {
        if (!hovered.current) return;
        trackPointer(event);
      }}
      onPointerLeave={close}
    >
      {children}
      <div
        ref={frostRef}
        className="pointer-events-none absolute inset-0 bg-[color-mix(in_srgb,var(--clr-dark)_38%,transparent)] backdrop-blur-[14px] motion-reduce:hidden"
        aria-hidden
      />
    </div>
  );
}
