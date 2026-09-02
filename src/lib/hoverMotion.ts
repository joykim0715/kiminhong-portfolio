/** Healthcare-safe hover spring — low bounce, short settle. */
export const hoverSpring = {
  type: "spring" as const,
  bounce: 0.12,
  visualDuration: 0.32,
};

export type HoverSpring = typeof hoverSpring;

export function trackHoverSpring(bounce: number, visualDuration: number): HoverSpring {
  return {
    type: "spring",
    bounce,
    visualDuration,
  };
}
