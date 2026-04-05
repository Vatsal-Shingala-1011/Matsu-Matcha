"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import MatsuLogo from "./MatsuLogo";

export default function Preloader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const logoSvgRef = useRef<HTMLDivElement>(null);
  const matchaLabelRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!overlayRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    // 1. Hold — show logo + MATCHA for a moment
    tl.to(logoSvgRef.current, { duration: 1.0 });

    // 2. MATSU logo slides DOWN to fully overlap/cover MATCHA text
    tl.to(logoSvgRef.current, {
      y: "1.8em",
      duration: 0.6,
      ease: "power2.inOut",
    });

    // 3. Brief hold after overlap
    tl.to({}, { duration: 0.3 });

    // 4. Fade out the entire logo group
    tl.to(logoGroupRef.current, {
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: "power2.in",
    });

    // 5. Split screen reveal — left goes left, right goes right
    tl.to(leftRef.current, {
      xPercent: -100,
      duration: 0.9,
      ease: "power3.inOut",
    }, "-=0.1");

    tl.to(rightRef.current, {
      xPercent: 100,
      duration: 0.9,
      ease: "power3.inOut",
    }, "<");

    // Lock scroll during preloader
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

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
      {/* Left half */}
      <div
        ref={leftRef}
        className="absolute top-0 left-0 w-1/2 h-full bg-kumo-dark"
      />
      {/* Right half */}
      <div
        ref={rightRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-kumo-dark"
      />
      {/* Center logo group */}
      <div
        ref={logoGroupRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
      >
        {/* MATSU SVG logo — this slides down to cover MATCHA */}
        <div ref={logoSvgRef} className="w-40 md:w-52 relative z-[2] bg-kumo-dark px-4 py-1">
          <MatsuLogo className="text-kumo-beige" />
        </div>
        {/* MATCHA label — stays in place, gets covered by logo sliding down */}
        <div ref={matchaLabelRef} className="relative z-[1]">
          <span className="text-kumo-muted text-[0.7rem] tracking-[0.35em] uppercase font-light block mt-2">
            MATCHA
          </span>
        </div>
      </div>
    </div>
  );
}
