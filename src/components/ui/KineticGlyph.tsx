import styles from "./KineticGlyph.module.css";

export type GlyphKind = "oa" | "data" | "viz" | "ai" | "observe";

type KineticGlyphProps = {
  kind?: GlyphKind;
  className?: string;
};

/**
 * Original line icons with idle CSS motion (Arturo-style kinetic marks).
 * Looping animation stays in CSS so it does not compete with GSAP pins.
 */
export default function KineticGlyph({ kind = "data", className }: KineticGlyphProps) {
  return (
    <svg
      viewBox="0 0 160 160"
      className={className ? `${styles.glyph} ${className}` : styles.glyph}
      data-glyph={kind}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      aria-hidden="true"
    >
      {kind === "oa" ? (
        <g>
          {[0, 1, 2].map((i) => (
            <g
              key={i}
              className={styles.page}
              style={{ animationDelay: `${i * -0.8}s` }}
              transform={`translate(${i * 13 - 13} ${i * -13 + 13})`}
            >
              <rect x="40" y="36" width="67" height="86" rx="3" />
              <path d="M53 56h39M53 66h39M53 76h25M53 95h39M53 105h25" />
            </g>
          ))}
        </g>
      ) : null}

      {kind === "data" || kind === "observe" ? (
        <g className={styles.orbits}>
          <circle cx="80" cy="80" r="49" />
          <ellipse className={styles.orbitA} cx="80" cy="80" rx="49" ry="20" />
          <ellipse className={styles.orbitB} cx="80" cy="80" rx="20" ry="49" />
          <circle cx="80" cy="80" r="5" fill="currentColor" />
          {kind === "observe" ? (
            <path className={styles.scan} d="M80 31v18M80 111v18M31 80h18M111 80h18" />
          ) : null}
          <g className={styles.satellite}>
            <circle cx="129" cy="80" r="4" fill="currentColor" stroke="none" />
          </g>
        </g>
      ) : null}

      {kind === "viz" ? (
        <g>
          <rect className={styles.tileA} x="28" y="30" width="64" height="38" rx="3" />
          <rect className={styles.tileB} x="99" y="30" width="33" height="63" rx="3" />
          <rect className={styles.tileC} x="28" y="75" width="35" height="57" rx="3" />
          <rect className={styles.tileD} x="70" y="100" width="62" height="32" rx="3" />
          <path d="M72 80h18M81 71v18" />
        </g>
      ) : null}

      {kind === "ai" ? (
        <g className={styles.prism}>
          <path d="M80 22 130 51v58l-50 29-50-29V51Z" />
          <path d="m30 51 50 29 50-29M80 80v58M80 22v58M30 109l50-29 50 29" />
          <g className={styles.core}>
            <path d="m80 52 24 14v28l-24 14-24-14V66Z" />
            <path d="m56 66 24 14 24-14M80 80v28" />
          </g>
        </g>
      ) : null}
    </svg>
  );
}
