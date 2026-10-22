'use client';

import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — IntersectionObserver hook with MutationObserver support
 * so dynamically loaded items (like products fetched from API) are automatically
 * observed and revealed without getting stuck invisible.
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
  threshold = 0.05,
  rootMargin = '50px 0px 50px 0px'
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observeElements = (parent: HTMLElement, observer: IntersectionObserver) => {
      const targets = parent.querySelectorAll<HTMLElement>(
        '.reveal, .reveal-left, .reveal-right, .reveal-zoom, [data-reveal]'
      );
      targets.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          observer.observe(el);
        }
      });
    };

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

    // Initial pass
    observeElements(container, observer);

    // Watch for dynamic DOM changes (e.g. products finishing loading)
    const mutationObserver = new MutationObserver(() => {
      observeElements(container, observer);
    });

    mutationObserver.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold, rootMargin]);

  return containerRef;
}

/**
 * Global scroll reveal — auto-discovers all reveal elements on the page,
 * watching document body mutations so new elements are always observed.
 */
export function useGlobalScrollReveal(
  threshold = 0.05,
  rootMargin = '50px 0px 50px 0px'
) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-zoom, [data-reveal]';

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

    const observeAll = () => {
      const targets = document.querySelectorAll<HTMLElement>(selectors);
      targets.forEach((el) => {
        if (!el.classList.contains('revealed')) {
          observer.observe(el);
        }
      });
    };

    observeAll();

    // Listen to changes when state updates or products load
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [threshold, rootMargin]);
}
