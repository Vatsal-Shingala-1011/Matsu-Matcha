"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    // Counter animation 0 → 100
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.val).toString();
        }
      },
    });

    // Fade out the logo + counter
    tl.to(logoRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: "power2.in",
    }, "-=0.2");

    // Split screen reveal — top goes up, bottom goes down
    tl.to(topRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power3.inOut",
    }, "-=0.1");

    tl.to(bottomRef.current, {
      yPercent: 100,
      duration: 0.9,
      ease: "power3.inOut",
    }, "<");

    // Lock scroll during preloader
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // After animation, unlock scroll
  useEffect(() => {
    if (done) {
      document.body.style.overflow = "";
    }
  }, [done]);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {/* Top half */}
      <div
        ref={topRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-kumo-dark"
      />
      {/* Bottom half */}
      <div
        ref={bottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-kumo-dark"
      />
      {/* Center logo + counter */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        <span className="font-serif text-[clamp(2rem,5vw,4rem)] text-kumo-beige tracking-[0.15em] uppercase mb-4">
          matsu
        </span>
        <span className="text-kumo-muted text-sm tracking-widest uppercase mb-2">
          Matcha
        </span>
        <span
          ref={counterRef}
          className="text-kumo-muted/60 text-xs tabular-nums tracking-[0.3em] mt-4"
        >
          0
        </span>
      </div>
    </div>
  );
}
