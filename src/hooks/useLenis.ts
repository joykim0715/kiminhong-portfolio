"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenisInstance } from "@/lib/lenisInstance";

export function useLenis() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced) {
      const lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        autoRaf: false,
        // touchMultiplier: 1 — 기본값 유지. 2 이상이면 iOS Safari에서 네이티브 관성 스크롤과
        // Lenis 스크롤이 겹쳐 이중 관성(튕김)이 발생할 수 있어 의도적으로 설정하지 않음.
      });

      const root = document.documentElement;

      setLenisInstance(lenis);

      lenis.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(root, {
        scrollTop(value) {
          if (arguments.length && value !== undefined) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
      });

      ScrollTrigger.defaults({ scroller: root });

      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      const onRefresh = () => lenis.resize();
      ScrollTrigger.addEventListener("refresh", onRefresh);
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener("refresh", onRefresh);
        ScrollTrigger.scrollerProxy(root, {});
        ScrollTrigger.defaults({ scroller: window });
        gsap.ticker.remove(onTick);
        setLenisInstance(null);
        lenis.destroy();
      };
    }

    gsap.defaults({ duration: 0 });
  }, []);
}
