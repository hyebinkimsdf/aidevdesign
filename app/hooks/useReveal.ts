import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to `ref` and adds `in-view` to every
 * child element matching `selector` (default `.ap-scroll`) when it enters
 * the viewport.  Works with the existing `.ap-scroll / .ap-step` CSS.
 */
export function useReveal(
  selector = ".ap-scroll",
  options?: IntersectionObserverInit,
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>(selector);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px", ...options },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [selector]);

  return ref as React.RefObject<HTMLElement>;
}
