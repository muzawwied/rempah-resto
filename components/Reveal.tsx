"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll("[data-reveal]");
      if (!items.length) return;
      gsap.from(items, {
        opacity: 0,
        y: 22,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: el, start: "top 84%", once: true },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
