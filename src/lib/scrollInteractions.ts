import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { DURATION, EASE_OUT, MOTION, prefersReducedMotion } from "@/lib/animations";
import { getLenisInstance } from "@/lib/lenisInstance";

const NAV_OFFSET = 64; // matches h-16 navbar

function resolveEl(scope: Element, selector: string) {
  return scope.querySelector(selector);
}

function pinEnd(steps: number, stepVh: number) {
  return () => `+=${window.innerHeight * stepVh * Math.max(steps, 1)}`;
}

type PinStackOptions = {
  zone: HTMLElement;
  pinSelector: string;
  cardSelector: string;
  stepVh?: number;
  scrub?: number;
  /** Transition 완료 후 카드가 잠시 멈추는 구간 (타임라인 비율, 1 ≈ 전환 길이) */
  holdDuration?: number;
  onIndex?: (index: number) => void;
};

/** GSAP pin + card stack scrub — reliable with Lenis via scrollerProxy */
export function scrollPinStack(options: PinStackOptions) {
  if (prefersReducedMotion()) return null;

  const { zone, stepVh = 0.85, scrub = 1.05, holdDuration = 0.65 } = options;
  const pinEl = resolveEl(zone, options.pinSelector);
  const cards = gsap.utils.toArray<Element>(options.cardSelector, zone);
  if (!pinEl || cards.length < 2) return null;

  const steps = cards.length - 1;
  const transitionDuration = 1;
  const segmentDuration = transitionDuration + holdDuration;

  cards.forEach((card, i) => {
    gsap.set(card, {
      zIndex: i + 1,
      y: i === 0 ? 0 : 28,
      scale: i === 0 ? 1 : 0.97,
      opacity: i === 0 ? 1 : 0,
      transformOrigin: "center top",
    });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: zone,
      start: `top ${NAV_OFFSET}px`,
      end: pinEnd(steps, stepVh),
      pin: pinEl,
      pinSpacing: true,
      anticipatePin: 1,
      scrub,
      invalidateOnRefresh: true,
      onUpdate(self) {
        // segmentDuration = 전환(1) + 홀드. floor만 쓰면 홀드 구간 내내 이전 인덱스가 유지되어
        // 화면에 보이는 카드와 클릭 대상이 어긋남.
        // 전환 중반(0.5)을 넘기면 다음 카드로 인덱스를 올려 표시·클릭을 맞춘다.
        const timelinePos = self.progress * steps * segmentDuration;
        const visualIndex = Math.min(
          steps,
          Math.max(0, Math.floor(timelinePos / segmentDuration + 0.5)),
        );
        options.onIndex?.(visualIndex);
      },
    },
  });

  for (let i = 1; i < cards.length; i++) {
    const at = (i - 1) * segmentDuration;
    tl.to(
      cards[i - 1],
      { y: -20, scale: 0.94, opacity: 0.28, zIndex: i, duration: transitionDuration, ease: "none" },
      at,
    ).to(
      cards[i],
      { y: 0, scale: 1, opacity: 1, zIndex: i + 1, duration: transitionDuration, ease: "none" },
      at,
    );
  }

  return tl;
}

type PinCarouselOptions = {
  zone: HTMLElement;
  pinSelector: string;
  count: number;
  stepVh?: number;
  onIndex: (index: number) => void;
};

/** GSAP pin entire panel (text + carousel) while scroll advances carousel index */
export function scrollPinCarousel(options: PinCarouselOptions) {
  if (prefersReducedMotion() || options.count < 2) return null;

  const { zone, stepVh = 0.8 } = options;
  const pinEl = resolveEl(zone, options.pinSelector);
  if (!pinEl) return null;

  const steps = options.count - 1;

  return ScrollTrigger.create({
    trigger: zone,
    start: `top ${NAV_OFFSET}px`,
    end: pinEnd(steps, stepVh),
    pin: pinEl,
    pinSpacing: true,
    anticipatePin: 1,
    invalidateOnRefresh: true,
    onUpdate(self) {
      options.onIndex(Math.min(steps, Math.floor(self.progress * steps + 0.0001)));
    },
  });
}

export type CycleView = "projects" | "certifications";

type PinViewCycleOptions = {
  zone: HTMLElement;
  pinSelector: string;
  projectsSelector: string;
  certsSelector: string;
  /** Pin length in viewport heights. One cycle only — then the page unpins. */
  durationVh?: number;
  onView?: (view: CycleView) => void;
};

const CERT_VIEW_START = 0.31;
const CERT_VIEW_END = 0.69;

function viewFromProgress(progress: number): CycleView {
  return progress >= CERT_VIEW_START && progress < CERT_VIEW_END
    ? "certifications"
    : "projects";
}

/**
 * Pin one panel and crossfade projects ↔ certifications once, then unpin.
 * Sequence: projects → certs → projects → page continues. Does not loop.
 */
export function scrollPinViewCycle(options: PinViewCycleOptions) {
  const projects = resolveEl(options.zone, options.projectsSelector);
  const certs = resolveEl(options.zone, options.certsSelector);
  const pinEl = resolveEl(options.zone, options.pinSelector);
  if (!projects || !certs || !pinEl) return null;

  let lastView: CycleView | null = null;
  const applyLayer = (view: CycleView) => {
    const certsOn = view === "certifications";
    (projects as HTMLElement).style.pointerEvents = certsOn ? "none" : "auto";
    (certs as HTMLElement).style.pointerEvents = certsOn ? "auto" : "none";
    if (view === lastView) return;
    lastView = view;
    options.onView?.(view);
  };

  if (prefersReducedMotion()) {
    gsap.set(projects, { opacity: 1 });
    gsap.set(certs, { opacity: 1 });
    applyLayer("projects");
    return null;
  }

  const durationVh = options.durationVh ?? 2.2;
  gsap.set(projects, { opacity: 1 });
  gsap.set(certs, { opacity: 0 });
  applyLayer("projects");

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: options.zone,
      start: `top ${NAV_OFFSET}px`,
      end: () => `+=${window.innerHeight * durationVh}`,
      pin: pinEl,
      pinSpacing: true,
      scrub: 0.85,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate(self) {
        applyLayer(viewFromProgress(self.progress));
      },
    },
  });

  tl.to({}, { duration: 1, ease: "none" });
  tl.to(projects, { opacity: 0, duration: 0.16, ease: "none" }, 0.22);
  tl.to(certs, { opacity: 1, duration: 0.16, ease: "none" }, 0.22);
  tl.to(certs, { opacity: 0, duration: 0.16, ease: "none" }, 0.6);
  tl.to(projects, { opacity: 1, duration: 0.16, ease: "none" }, 0.6);

  const trigger = tl.scrollTrigger;
  if (!trigger) return { scrollToView: () => undefined };

  return {
    scrollToView(view: CycleView) {
      const progress = view === "certifications" ? 0.5 : trigger.progress >= CERT_VIEW_START ? 0.88 : 0;
      const top = trigger.start + (trigger.end - trigger.start) * progress;
      const lenis = getLenisInstance();
      if (lenis) {
        lenis.scrollTo(top, { immediate: true });
      } else {
        trigger.scroll(top);
      }
    },
  };
}

export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

type RevealOptions = {
  stagger?: number;
  start?: string;
  y?: number;
  duration?: number;
};

export function fadeRevealOnScroll(
  targets: gsap.TweenTarget,
  trigger: Element,
  options: RevealOptions = {},
) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  return gsap.from(targets, {
    opacity: 0,
    y: options.y ?? MOTION.revealY,
    duration: options.duration ?? DURATION.reveal,
    ease: EASE_OUT,
    stagger: options.stagger ?? MOTION.stagger,
    immediateRender: false,
    scrollTrigger: {
      trigger,
      start: options.start ?? MOTION.revealStart,
      toggleActions: "play none none none",
    },
  });
}

type ParallaxFadeOptions = {
  y?: number;
  opacity?: number;
  start?: string;
  end?: string;
};

export function parallaxFadeOnScroll(
  target: Element,
  trigger: Element,
  options: ParallaxFadeOptions = {},
) {
  if (prefersReducedMotion()) return null;

  const { y = 28, opacity = 0.9, start = "top bottom", end = "bottom top" } = options;
  const from: gsap.TweenVars = { y };
  const to: gsap.TweenVars = { y: -y * 0.35, ease: "none" };

  if (opacity < 1) {
    from.opacity = opacity;
    to.opacity = 1;
  }

  return gsap.fromTo(target, from, {
    ...to,
    scrollTrigger: { trigger, start, end, scrub: 0.55 },
  });
}
