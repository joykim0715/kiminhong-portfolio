"use client";

import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import {
  TRACK_HREF,
  TRACK_NAV,
  TRACK_THEMES,
  type TrackId,
  type TrackTheme,
} from "@/data/tracks";

type TrackContextValue = {
  track: TrackId;
  href: string;
  theme: TrackTheme;
  nav: typeof TRACK_NAV;
};

const TrackContext = createContext<TrackContextValue>({
  track: "research",
  href: "/",
  theme: TRACK_THEMES.research,
  nav: TRACK_NAV,
});

export function TrackProvider({
  track = "research",
  children,
}: {
  track?: TrackId;
  children: ReactNode;
}) {
  const theme = TRACK_THEMES[track];
  const href = TRACK_HREF[track];

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.track = track;
    return () => {
      delete root.dataset.track;
    };
  }, [track]);

  return (
    <TrackContext.Provider value={{ track, href, theme, nav: TRACK_NAV }}>
      <div data-track={track} className="min-h-dvh">
        {children}
      </div>
    </TrackContext.Provider>
  );
}

export function useTrack() {
  return useContext(TrackContext);
}
