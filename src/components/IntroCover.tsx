import styles from "./PageLoadEntrance.module.css";

const COVER_STYLE = {
  position: "fixed" as const,
  inset: 0,
  zIndex: 200,
  background: "#f7f8f6",
  pointerEvents: "auto" as const,
};

type IntroCoverProps = {
  greeting: string;
};

/** Server-rendered first paint — must stay ahead of the rest of the homepage HTML. */
export default function IntroCover({ greeting }: IntroCoverProps) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){if(location.hash){document.documentElement.setAttribute("data-skip-intro","");return;}try{if("scrollRestoration"in history)history.scrollRestoration="manual";}catch(e){}window.scrollTo(0,0);})();`,
        }}
      />
      <div
        className={styles.cover}
        style={COVER_STYLE}
        data-intro-cover
        aria-hidden="true"
      >
        <div className={`${styles.panel} ${styles.panelTop} intro-panel-top`} />
        <div className={`${styles.panel} ${styles.panelBottom} intro-panel-bottom`} />
        <div className={styles.seamSlot}>
          <div className={`${styles.seam} intro-seam`} />
        </div>
        <div className={styles.nameWrap}>
          <p className={`${styles.name} intro-name`}>{greeting}</p>
        </div>
      </div>
    </>
  );
}
