function clamp01(n: number) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

/** Map local progress p through [a, b] onto [from, to]. */
function span(p: number, a: number, b: number, from: number, to: number) {
  if (b === a) return p >= b ? to : from;
  return from + (to - from) * clamp01((p - a) / (b - a));
}

/** Progress windows along one already-eased slide-to-slide move (0 = rest, 1 = complete). */
const OUT = {
  index: [0.08, 0.42],
  title: [0.12, 0.48],
  giant: [0.1, 0.5],
  visual: [0.18, 0.55],
  body: [0.18, 0.5],
  metrics: [0.22, 0.52],
  cta: [0.32, 0.6],
} as const;

const IN = {
  index: [0.38, 0.78],
  title: [0.42, 0.82],
  giant: [0.4, 0.8],
  visual: [0.4, 0.88],
  body: [0.5, 0.84],
  metrics: [0.55, 0.86],
  cta: [0.7, 1],
} as const;

const METRIC_STAGGER = 0.04;

function setYPercent(el: HTMLElement | null, value: number) {
  if (!el) return;
  el.style.transform = `translate3d(0, ${value}%, 0)`;
}

function setVisual(el: HTMLElement | null, scale: number, y: number, opacity: number) {
  if (!el) return;
  el.style.transform = `translate3d(0, ${y}px, 0) scale(${scale})`;
  el.style.opacity = String(opacity);
}

function setFade(el: HTMLElement | null, y: number, opacity: number) {
  if (!el) return;
  el.style.transform = `translate3d(0, ${y}px, 0)`;
  el.style.opacity = String(opacity);
}

export type ReelSlideMotion = {
  title: HTMLElement | null;
  index: HTMLElement | null;
  giant: HTMLElement | null;
  visual: HTMLElement | null;
  body: HTMLElement | null;
  cta: HTMLElement | null;
  metrics: HTMLElement[];
};

export function bindReelSlide(slide: HTMLElement): ReelSlideMotion {
  const metricEls = slide.querySelectorAll("[data-reel-metric]");
  const metrics: HTMLElement[] = [];
  for (let i = 0; i < metricEls.length; i += 1) {
    metrics.push(metricEls[i] as HTMLElement);
  }

  return {
    title: slide.querySelector("[data-reel-title]"),
    index: slide.querySelector("[data-reel-index]"),
    giant: slide.querySelector("[data-reel-giant]"),
    visual: slide.querySelector("[data-reel-visual]"),
    body: slide.querySelector("[data-reel-body]"),
    cta: slide.querySelector("[data-reel-cta]"),
    metrics,
  };
}

function applyOutgoing(slide: ReelSlideMotion, p: number) {
  setYPercent(slide.index, span(p, OUT.index[0], OUT.index[1], 0, -108));
  setYPercent(slide.title, span(p, OUT.title[0], OUT.title[1], 0, -108));
  setYPercent(slide.giant, span(p, OUT.giant[0], OUT.giant[1], 0, -12));
  setVisual(
    slide.visual,
    span(p, OUT.visual[0], OUT.visual[1], 1, 0.97),
    span(p, OUT.visual[0], OUT.visual[1], 0, -8),
    span(p, OUT.visual[0], OUT.visual[1], 1, 0.55),
  );
  setFade(
    slide.body,
    span(p, OUT.body[0], OUT.body[1], 0, -6),
    span(p, OUT.body[0], OUT.body[1], 1, 0.22),
  );
  setFade(
    slide.cta,
    span(p, OUT.cta[0], OUT.cta[1], 0, -6),
    span(p, OUT.cta[0], OUT.cta[1], 1, 0),
  );

  for (let k = 0; k < slide.metrics.length; k += 1) {
    const a = OUT.metrics[0] + k * METRIC_STAGGER;
    const b = OUT.metrics[1] + k * METRIC_STAGGER;
    setFade(slide.metrics[k], span(p, a, b, 0, -6), span(p, a, b, 1, 0));
  }
}

function applyIncoming(slide: ReelSlideMotion, p: number) {
  setYPercent(slide.index, span(p, IN.index[0], IN.index[1], 108, 0));
  setYPercent(slide.title, span(p, IN.title[0], IN.title[1], 108, 0));
  setYPercent(slide.giant, span(p, IN.giant[0], IN.giant[1], 14, 0));
  setVisual(
    slide.visual,
    span(p, IN.visual[0], IN.visual[1], 1.055, 1),
    span(p, IN.visual[0], IN.visual[1], 12, 0),
    span(p, IN.visual[0], IN.visual[1], 0.5, 1),
  );
  setFade(
    slide.body,
    span(p, IN.body[0], IN.body[1], 8, 0),
    span(p, IN.body[0], IN.body[1], 0.18, 1),
  );
  setFade(
    slide.cta,
    span(p, IN.cta[0], IN.cta[1], 6, 0),
    span(p, IN.cta[0], IN.cta[1], 0, 1),
  );

  for (let k = 0; k < slide.metrics.length; k += 1) {
    const a = IN.metrics[0] + k * METRIC_STAGGER;
    const b = IN.metrics[1] + k * METRIC_STAGGER;
    setFade(slide.metrics[k], span(p, a, b, 8, 0), span(p, a, b, 0, 1));
  }
}

/**
 * Drive per-slide handoff from holdThenGo visual * lastIndex.
 * local 0 = fully active, +1 = fully exited, -1 = fully waiting.
 */
export function applyReelHandoff(slides: ReelSlideMotion[], t: number) {
  for (let i = 0; i < slides.length; i += 1) {
    const local = t - i;
    if (local >= 0) applyOutgoing(slides[i], local > 1 ? 1 : local);
    else applyIncoming(slides[i], local < -1 ? 0 : local + 1);
  }
}

export function clearReelHandoff(root: HTMLElement) {
  const nodes = root.querySelectorAll<HTMLElement>("[data-reel-anim]");
  for (let i = 0; i < nodes.length; i += 1) {
    nodes[i].style.transform = "";
    nodes[i].style.opacity = "";
  }
}
