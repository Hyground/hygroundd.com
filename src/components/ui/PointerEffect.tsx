"use client";

import { useEffect, useRef } from "react";

const MAX_PARTICLES = 28;

export function PointerEffect() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const layer = layerRef.current;
    if (!layer) return;

    let frame = 0;
    let lastX = 0;
    let lastY = 0;
    let nextX = 0;
    let nextY = 0;
    let initialized = false;

    const emit = () => {
      frame = 0;
      const distance = Math.hypot(nextX - lastX, nextY - lastY);
      if (!initialized) { lastX = nextX; lastY = nextY; initialized = true; return; }
      if (distance < 5) return;

      const count = Math.min(3, Math.max(1, Math.floor(distance / 18)));
      for (let index = 0; index < count; index += 1) {
        if (layer.childElementCount >= MAX_PARTICLES) layer.firstElementChild?.remove();
        const particle = document.createElement("span");
        const progress = (index + 1) / (count + 1);
        const size = 2 + Math.random() * 2.4;
        particle.className = "trailParticle";
        particle.style.left = `${lastX + (nextX - lastX) * progress}px`;
        particle.style.top = `${lastY + (nextY - lastY) * progress}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.setProperty("--trail-x", `${(Math.random() - 0.5) * 14}px`);
        particle.style.setProperty("--trail-y", `${6 + Math.random() * 13}px`);
        particle.style.setProperty("--trail-duration", `${420 + Math.random() * 240}ms`);
        particle.addEventListener("animationend", () => particle.remove(), { once: true });
        layer.appendChild(particle);
      }
      lastX = nextX;
      lastY = nextY;
    };

    const onMove = (event: PointerEvent) => {
      nextX = event.clientX;
      nextY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(emit);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); if (frame) window.cancelAnimationFrame(frame); layer.replaceChildren(); };
  }, []);

  return <div ref={layerRef} className="particleTrail" aria-hidden="true"/>;
}
