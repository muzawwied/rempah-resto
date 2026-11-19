"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroIntro({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-media]", { scale: 1.14, duration: 1.8, ease: "power2.out" }, 0)
        .from("[data-line]", { yPercent: 108, duration: 1.05, stagger: 0.09 }, 0.15)
        .from("[data-fade]", { opacity: 0, y: 16, duration: 0.9, stagger: 0.07 }, 0.5);
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
