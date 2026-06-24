"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const HELIX_COLOR_1 = "#5FA8A3";
const HELIX_COLOR_2 = "#6FAED9";
const BRIDGE_COLOR = 0x7ec8c2;

export default function HelixBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 0, 18);

    const createHelix = (color: string, phaseOffset: number): THREE.Points => {
      const count = 1200;
      const positions = new Float32Array(count * 3);
      const radius = 3;
      const step = 0.08;

      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 12;
        positions[i * 3] = radius * Math.cos(t + phaseOffset);
        positions[i * 3 + 1] = t * step - count * step * 0.5 * 0.08;
        positions[i * 3 + 2] = radius * Math.sin(t + phaseOffset);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color: new THREE.Color(color),
        size: 0.14,
        transparent: true,
        opacity: 0.85,
        sizeAttenuation: true,
        depthWrite: false,
      });

      return new THREE.Points(geometry, material);
    };

    const helix1 = createHelix(HELIX_COLOR_1, 0);
    const helix2 = createHelix(HELIX_COLOR_2, Math.PI);

    const bridgeCount = 60;
    const bridgePositions = new Float32Array(bridgeCount * 6);
    for (let i = 0; i < bridgeCount; i++) {
      const t = (i / bridgeCount) * Math.PI * 12;
      const s = 0.08;
      const r = 3;
      const y = t * s - 1200 * s * 0.5 * 0.08;
      bridgePositions[i * 6] = r * Math.cos(t);
      bridgePositions[i * 6 + 1] = y;
      bridgePositions[i * 6 + 2] = r * Math.sin(t);
      bridgePositions[i * 6 + 3] = r * Math.cos(t + Math.PI);
      bridgePositions[i * 6 + 4] = y;
      bridgePositions[i * 6 + 5] = r * Math.sin(t + Math.PI);
    }

    const bridgeGeometry = new THREE.BufferGeometry();
    bridgeGeometry.setAttribute("position", new THREE.BufferAttribute(bridgePositions, 3));
    const bridgeMaterial = new THREE.LineBasicMaterial({
      color: BRIDGE_COLOR,
      transparent: true,
      opacity: 0.22,
    });
    const bridges = new THREE.LineSegments(bridgeGeometry, bridgeMaterial);

    const group = new THREE.Group();
    group.add(helix1, helix2, bridges);
    group.rotation.x = Math.PI * 0.1;
    scene.add(group);

    let animId = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!prefersReduced) {
        group.rotation.y += 0.003;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      helix1.geometry.dispose();
      helix2.geometry.dispose();
      bridgeGeometry.dispose();
      (helix1.material as THREE.Material).dispose();
      (helix2.material as THREE.Material).dispose();
      bridgeMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
