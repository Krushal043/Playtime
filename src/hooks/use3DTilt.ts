'use client';

import { useRef, useCallback } from 'react';

/**
 * use3DTilt — Applies realistic 3D perspective tilt to a card element
 * on mouse movement, resets on mouse leave.
 *
 * Usage:
 *   const { ref, handlers } = use3DTilt({ maxDeg: 15, scale: 1.03 });
 *   <div ref={ref} {...handlers} className="card-3d-tilt">...</div>
 */
interface TiltOptions {
  maxDeg?: number;
  scale?: number;
  perspective?: number;
  shineSelector?: string;
}

export function use3DTilt<T extends HTMLElement = HTMLElement>({
  maxDeg = 14,
  scale = 1.04,
  perspective = 900,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotX = ((y - cy) / cy) * -maxDeg;
      const rotY = ((x - cx) / cx) * maxDeg;

      el.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(${scale})`;

      // Update shine position
      const shine = el.querySelector<HTMLElement>('.card-3d-shine');
      if (shine) {
        const pctX = (x / rect.width) * 100;
        const pctY = (y / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.18) 0%, transparent 65%)`;
        shine.style.opacity = '1';
      }
    },
    [maxDeg, scale, perspective]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`;
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';

    const shine = el.querySelector<HTMLElement>('.card-3d-shine');
    if (shine) shine.style.opacity = '0';

    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 500);
  }, [perspective]);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.1s ease';
  }, []);

  return {
    ref,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
    },
  };
}
