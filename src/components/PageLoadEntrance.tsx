"use client";

import { usePageLoadEntrance } from "@/hooks/usePageLoadEntrance";

/** Client controller for the server-rendered intro cover. */
export default function PageLoadEntrance() {
  usePageLoadEntrance();
  return null;
}
