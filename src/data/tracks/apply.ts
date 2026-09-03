import type { SiteContent } from "@/data/content";
import { FEATURED_WORK_IDS, SKILL_ORDER } from "./matrix";
import { TRACK_COPY } from "./copy";
import { TRACK_LAYOUT } from "./layouts";
import type { TrackId } from "./types";

function reorderByIds<T extends { id: string }>(items: T[], order: string[]): T[] {
  const map = new Map(items.map((item) => [item.id, item]));
  const ordered = order.flatMap((id) => {
    const item = map.get(id);
    return item ? [item] : [];
  });
  const rest = items.filter((item) => !order.includes(item.id));
  return [...ordered, ...rest];
}

/** content.ts 팩트 저장소 위에 트랙 강조·순서·카피만 얹는다. */
export function applyTrackToContent(base: SiteContent, trackId: TrackId): SiteContent {
  const copy = TRACK_COPY[trackId];
  if (trackId === "research" && !copy.hero) {
    return base;
  }

  return {
    ...base,
    meta: copy.meta ? { ...base.meta, ...copy.meta } : base.meta,
    nav: {
      ...base.nav,
      sections: TRACK_LAYOUT[trackId].nav,
    },
    hero: copy.hero ? { ...base.hero, ...copy.hero } : base.hero,
    bridge: copy.bridge ? { ...base.bridge, ...copy.bridge } : base.bridge,
    values: copy.values ? { ...base.values, ...copy.values } : base.values,
    skills: {
      ...base.skills,
      items: reorderByIds(base.skills.items, SKILL_ORDER[trackId]),
    },
    works: {
      ...base.works,
      featuredIds: FEATURED_WORK_IDS[trackId],
      featuredLabel: trackId === "planning" ? "Case" : base.works.featuredLabel,
    },
    story: copy.story ? { ...base.story, ...copy.story } : base.story,
    about: copy.about ? { ...base.about, ...copy.about } : base.about,
  } as SiteContent;
}
