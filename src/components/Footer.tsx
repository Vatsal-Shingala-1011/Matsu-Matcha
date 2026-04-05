"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import MatsuLogo from "./MatsuLogo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      // Top section elements fade in
      if (topRef.current) {
        const children = topRef.current.querySelectorAll(".footer-animate");
        gsap.from(children, {
          y: 50, opacity: 0,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: topRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Bottom nav fade in
      if (bottomRef.current) {
        gsap.from(bottomRef.current, {
          y: 30, opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // Decorative SVG path draw
      if (svgRef.current) {
        const len = svgRef.current.getTotalLength();
        gsap.set(svgRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(svgRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 70%",
            end: "center center",
            scrub: 1,
          },
        });
      }
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-kumo-dark border-t border-kumo-olive/30 relative overflow-hidden">
      {/* Decorative SVG */}
      <svg
        className="absolute right-0 top-0 w-[30%] h-auto opacity-20 pointer-events-none"
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={svgRef}
          d="M350,50 C300,120 200,180 180,280 C160,380 220,430 300,400 C380,370 400,280 350,220 C300,160 200,170 140,240 C80,310 90,420 160,480"
          stroke="#676436"
          strokeWidth="30"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {/* Top section with image and tagline */}
      <div ref={topRef} className="px-6 md:px-12 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <div className="footer-animate aspect-[4/5] overflow-hidden rounded-sm max-w-sm">
            <img
              src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68d43cb561789bda881ebe52_Hand-Holding-Iced-Coffee-free.avif"
              alt="Hand is holding an iced coffee."
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Tagline */}
          <div className="footer-animate">
            <p className="font-serif text-[clamp(1.25rem,2.5vw,2rem)] leading-[1.3] text-kumo-beige max-w-md">
              At the intersection of culture and craft, we found our purpose –
              to share the glow of matcha with a new generation.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom navigation section */}
      <div ref={bottomRef} className="px-6 md:px-12 py-8 border-t border-kumo-olive/20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div>
            <Link href="/" className="inline-block w-16">
              <MatsuLogo className="text-kumo-beige" />
              <div className="text-[0.5rem] tracking-[0.35em] mt-0.5 uppercase text-kumo-muted">
                Matcha
              </div>
            </Link>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-kumo-muted uppercase tracking-wider mb-2">
              Navigate
            </span>
            <Link href="/about" className="text-sm text-kumo-beige/70 hover:text-kumo-beige transition-colors">
              About
            </Link>
            <Link href="/producers" className="text-sm text-kumo-beige/70 hover:text-kumo-beige transition-colors">
              Producers
            </Link>
            <Link href="/recipes" className="text-sm text-kumo-beige/70 hover:text-kumo-beige transition-colors">
              Recipes
            </Link>
            <Link href="/shop" className="text-sm text-kumo-beige/70 hover:text-kumo-beige transition-colors">
              Shop
            </Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-kumo-muted uppercase tracking-wider mb-2">
              Legal
            </span>
            <Link href="/imprint" className="text-sm text-kumo-beige/70 hover:text-kumo-beige transition-colors">
              Imprint
            </Link>
            <Link href="/privacy" className="text-sm text-kumo-beige/70 hover:text-kumo-beige transition-colors">
              Privacy
            </Link>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2">
            <span className="text-xs text-kumo-muted uppercase tracking-wider mb-2">
              Social
            </span>
            <div className="flex gap-4 mt-1">
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="text-kumo-beige/70 hover:text-kumo-beige transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              {/* TikTok */}
              <a href="#" aria-label="TikTok" className="text-kumo-beige/70 hover:text-kumo-beige transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.33-6.33V9.18a8.16 8.16 0 0 0 3.89.98V6.69z" />
                </svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="text-kumo-beige/70 hover:text-kumo-beige transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-kumo-olive/10">
          <p className="text-xs text-kumo-muted">
            © 2025 Matsu Matcha. All rights reserved. Designed with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
