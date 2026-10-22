'use client';

import { useEffect, useRef } from 'react';

/**
 * useParallax — Simple scroll-driven parallax for a ref element.
 * @param speed  Parallax speed multiplier (0 = fixed, 1 = scroll-speed, 0.3 = slow drift)
 * @param axis   'y' | 'x'
 */
export function useParallax<T extends HTMLElement = HTMLElement>(
  speed = 0.3,
  axis: 'y' | 'x' = 'y'
) {
  const ref = useRef<T>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const scrollY = window.scrollY;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const center = rect.top + scrollY + rect.height / 2;
      const offset = (scrollY + viewportH / 2 - center) * speed;

      if (axis === 'y') {
        el.style.transform = `translateY(${offset}px)`;
      } else {
        el.style.transform = `translateX(${offset}px)`;
      }
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speed, axis]);

  return ref;
}

/**
 * useRipple — Adds a ripple click effect to a button/element.
 * Returns a click handler that creates & cleans up ripple DOM nodes.
 */
export function useRipple<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  const createRipple = (e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement('span');
    ripple.className = 'ripple-wave';
    ripple.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
    `;

    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  };

  return { ref, createRipple };
}
