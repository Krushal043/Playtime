'use client';

import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — IntersectionObserver hook that adds
 * the "revealed" class to any element with [data-reveal] or
 * the CSS classes: reveal, reveal-left, reveal-right, reveal-zoom
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <section ref={ref}>
 *     <div className="reveal stagger-1">...</div>
 *   </section>
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.12,
  rootMargin = '0px 0px -60px 0px'
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-left, .reveal-right, .reveal-zoom, [data-reveal]'
    );

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return containerRef;
}

/**
 * Global scroll reveal — auto-discovers all reveal elements on the page.
 * Call once in a layout component.
 */
export function useGlobalScrollReveal(
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px'
) {
  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-zoom';
    const targets = document.querySelectorAll<HTMLElement>(selectors);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [threshold, rootMargin]);
}
