"use client";

import { useCallback, useRef, type PointerEvent } from "react";
import { animate, useReducedMotion, type AnimationPlaybackControls } from "motion/react";

/** OriginKit radial-reveal-button — clip circle grows from the pointer. */
export function useRadialReveal() {
  const overlayRef = useRef<HTMLSpanElement>(null);
  const clip = useRef({ r: 0, x: 100, y: 100, max: 160 });
  const ctrl = useRef<AnimationPlaybackControls | null>(null);
  const reducedMotion = useReducedMotion();

  const applyClip = useCallback(() => {
    const el = overlayRef.current;
    if (!el) return;
    const { r, x, y } = clip.current;
    const value = `circle(${r}% at ${x}% ${y}%)`;
    el.style.clipPath = value;
    el.style.setProperty("-webkit-clip-path", value);
  }, []);

  const anchorTo = useCallback((event: PointerEvent) => {
    const el = overlayRef.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const px = event.clientX - box.left;
    const py = event.clientY - box.top;
    const unit = Math.hypot(box.width, box.height) / Math.SQRT2;
    const far = Math.max(
      Math.hypot(px, py),
      Math.hypot(box.width - px, py),
      Math.hypot(px, box.height - py),
      Math.hypot(box.width - px, box.height - py),
    );
    clip.current.x = (px / box.width) * 100;
    clip.current.y = (py / box.height) * 100;
    clip.current.max = (far / unit) * 100 + 2;
  }, []);

  const growTo = useCallback(
    (to: number) => {
      ctrl.current?.stop();
      if (reducedMotion) {
        clip.current.r = to;
        applyClip();
        return;
      }
      ctrl.current = animate(clip.current.r, to, {
        type: "tween",
        ease: "easeInOut",
        duration: 0.45,
        onUpdate: (value) => {
          clip.current.r = value;
          applyClip();
        },
      });
    },
    [applyClip, reducedMotion],
  );

  const onPointerEnter = useCallback(
    (event: PointerEvent) => {
      anchorTo(event);
      applyClip();
      growTo(clip.current.max);
    },
    [anchorTo, applyClip, growTo],
  );

  const onPointerLeave = useCallback(
    (event: PointerEvent) => {
      if (clip.current.r >= clip.current.max - 0.5) {
        anchorTo(event);
        clip.current.r = clip.current.max;
        applyClip();
      }
      growTo(0);
    },
    [anchorTo, applyClip, growTo],
  );

  return { overlayRef, onPointerEnter, onPointerLeave };
}
