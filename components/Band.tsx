"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Band({ text }: { text: string }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        xPercent: -50,
        duration: 38,
        ease: "none",
        repeat: -1,
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const line = Array.from({ length: 8 }, () => text);

  return (
    <div className="band" aria-hidden="true">
      <div className="band__track" ref={track}>
        {[...line, ...line].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
