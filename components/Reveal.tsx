"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Section wrapper porting the prototype's on-scroll reveal: the section
 * starts translated/transparent (CSS `.reveal`, gated behind
 * prefers-reduced-motion) and gains `.in` the first time it enters the
 * viewport. Children stay server-rendered.
 */
export default function Reveal({
  id,
  className,
  children,
}: {
  id?: string;
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      // Ancient-browser fallback: show the section immediately. Done as a
      // direct DOM write (not setState) so the effect stays side-effect-only;
      // the className prop never changes afterwards, so React won't undo it.
      el.classList.add("in");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={`${className} reveal${inView ? " in" : ""}`}
    >
      {children}
    </section>
  );
}
