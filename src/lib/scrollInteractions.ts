import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/animations";

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

  const { zone, stepVh = 0.9, scrub = 1.2, holdDuration = 0.5 } = options;
  const pinEl = resolveEl(zone, options.pinSelector);
  const cards = gsap.utils.toArray<Element>(options.cardSelector, zone);
  if (!pinEl || cards.length < 2) return null;

  const steps = cards.length - 1;
  const transitionDuration = 1;
  const segmentDuration = transitionDuration + holdDuration;

  cards.forEach((card, i) => {
    gsap.set(card, {
      zIndex: i + 1,
      y: i === 0 ? 0 : 40,
      scale: i === 0 ? 1 : 0.95,
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
        // 화면에 보이는 카드와 클릭 대상이 어긋남 (예: 라이프놀로지 카드인데 01 패널 오픈).
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
      { y: -28, scale: 0.91, opacity: 0.2, zIndex: i, duration: transitionDuration, ease: "none" },
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

export function refreshScrollTriggers() {
  if (typeof window === "undefined") return;
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

type RevealOptions = {
  stagger?: number;
  start?: string;
  y?: number;
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
    y: options.y ?? 40,
    duration: 0.55,
    ease: "power2.out",
    stagger: options.stagger ?? 0.1,
    immediateRender: false,
    scrollTrigger: {
      trigger,
      start: options.start ?? "top 85%",
      toggleActions: "play none none reverse",
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

  const { y = 40, opacity = 0.85, start = "top bottom", end = "bottom top" } = options;
  const from: gsap.TweenVars = { y };
  const to: gsap.TweenVars = { y: -y * 0.5, ease: "none" };

  if (opacity < 1) {
    from.opacity = opacity;
    to.opacity = 1;
  }

  return gsap.fromTo(target, from, {
    ...to,
    scrollTrigger: { trigger, start, end, scrub: 0.4 },
  });
}
