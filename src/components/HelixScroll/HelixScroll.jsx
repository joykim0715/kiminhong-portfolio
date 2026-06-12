"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./HelixScroll.module.css";
import useBreakpoint from "./useBreakpoint";

const RADIUS = 200;
const ANGULAR_STEP = 18;
const ROT_PER_PX = 12 / 42;
const FRONT_THRESHOLD = 0.5;
const PERSPECTIVE_PX = 800;
const WHEEL_SENSITIVITY = 0.45;

function HelixColumn({ items, label, onCardClick }) {
  const cardRefs = useRef([]);
  const scrollOffset = useRef(0);
  const columnRef = useRef(null);
  const r = useBreakpoint();

  const RADIUS_ACTUAL = r < 640 ? 90 : r < 1024 ? 130 : RADIUS;
  const V_ACTUAL = RADIUS_ACTUAL * 0.5;

  const updateCards = useCallback(
    (offset) => {
      const N = items.length;
      if (N === 0) return;

      const totalH = N * V_ACTUAL;

      items.forEach((item, i) => {
        const angle = (i * ANGULAR_STEP + offset * ROT_PER_PX) % 360;
        const rad = (angle * Math.PI) / 180;
        const x = RADIUS_ACTUAL * Math.cos(rad);
        const z = RADIUS_ACTUAL * Math.sin(rad);
        const rawY = i * V_ACTUAL - offset;
        const y = ((rawY % totalH) + totalH) % totalH - totalH / 2;
        const depth = (z + RADIUS_ACTUAL) / (2 * RADIUS_ACTUAL);
        const halfRange = totalH / 2;
        const fadeBand = V_ACTUAL * 0.9;
        const edgeDist = halfRange - Math.abs(y);
        const edgeFade =
          edgeDist < fadeBand ? Math.max(0, edgeDist / fadeBand) : 1;
        const isFront =
          Math.sin(rad) > FRONT_THRESHOLD && edgeFade > 0.35 && depth > 0.55;

        const el = cardRefs.current[i];
        if (!el) return;

        el.style.setProperty("--tx", `${x}px`);
        el.style.setProperty("--ty", `${y}px`);
        el.style.setProperty("--tz", `${z}px`);
        el.style.opacity = ((0.28 + depth * 0.72) * edgeFade).toFixed(2);
        el.style.zIndex = String(Math.round(depth * 100));
        el.dataset.front = isFront ? "1" : "0";
        el.style.pointerEvents = isFront ? "auto" : "none";
      });
    },
    [items, RADIUS_ACTUAL, V_ACTUAL],
  );

  useEffect(() => {
    updateCards(scrollOffset.current);
  }, [updateCards]);

  useEffect(() => {
    const el = columnRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      scrollOffset.current += e.deltaY * WHEEL_SENSITIVITY;
      updateCards(scrollOffset.current);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [updateCards]);

  if (items.length === 0) return null;

  return (
    <div ref={columnRef} className={styles.column}>
      <p className={styles.columnLabel}>{label}</p>
      <div
        className={styles.columnScene}
        style={{ perspective: `${PERSPECTIVE_PX}px` }}
      >
        <div className={styles.inner}>
          {items.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={styles.card}
              data-front="0"
              role="button"
              tabIndex={-1}
              onClick={() => {
                const el = cardRefs.current[i];
                if (el?.dataset.front === "1") onCardClick(item);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  const el = cardRefs.current[i];
                  if (el?.dataset.front === "1") onCardClick(item);
                }
              }}
            >
              <span className={styles.cardType}>{item.type ?? "Project"}</span>
              <span className={styles.cardTitle}>{item.title}</span>
              {item.org && <span className={styles.cardOrg}>{item.org}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HelixScroll({ items = [] }) {
  const [modal, setModal] = useState(null);

  const projects = items.filter((item) => item.type === "Project");
  const certifications = items.filter((item) => item.type === "Certification");

  useEffect(() => {
    if (!modal) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") setModal(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [modal]);

  if (projects.length === 0 && certifications.length === 0) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.dualGrid}>
        <HelixColumn
          items={projects}
          label="Project"
          onCardClick={setModal}
        />
        <HelixColumn
          items={certifications}
          label="Certification"
          onCardClick={setModal}
        />
      </div>

      {modal && (
        <div
          className={styles.modalOverlay}
          role="presentation"
          onClick={() => setModal(null)}
        >
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="helix-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setModal(null)}
              aria-label="닫기"
            >
              ×
            </button>

            <p className={styles.modalType}>{modal.type ?? "Project"}</p>
            <h3 id="helix-modal-title" className={styles.modalTitle}>
              {modal.title}
            </h3>
            {(modal.org || modal.date) && (
              <p className={styles.modalMeta}>
                {[modal.org, modal.date].filter(Boolean).join(" · ")}
              </p>
            )}
            <p className={styles.modalDescription}>{modal.description}</p>

            {modal.tags && modal.tags.length > 0 && (
              <div className={styles.modalTags}>
                {modal.tags.map((tag) => (
                  <span key={tag} className={styles.modalTag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {modal.link && (
              <a
                href={modal.link}
                className={styles.modalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                자세히 보기 →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
