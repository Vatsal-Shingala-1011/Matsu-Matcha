"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MatsuLogo from "./MatsuLogo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!navRef.current || !bgRef.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "body",
        start: "70px top",
        onEnter: () => {
          gsap.to(bgRef.current, { backgroundColor: "rgba(26,31,3,0)", backdropFilter: "blur(0px)", duration: 0.4 });
        },
        onLeaveBack: () => {
          gsap.to(bgRef.current, { backgroundColor: "rgba(26,31,3,0)", backdropFilter: "blur(0px)", duration: 0.4 });
        },
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 text-kumo-beige">
      <div className="relative px-6 md:px-12 py-5">
        {/* Background that expands on scroll */}
        <div ref={bgRef} className="absolute inset-0 pointer-events-none" />

        <div className="relative flex items-center justify-between">
          {/* Left nav links - desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-[0.8rem] uppercase tracking-[0.08em] hover:opacity-70 transition-opacity">
              About
            </Link>
            <Link href="/producers" className="text-[0.8rem] uppercase tracking-[0.08em] hover:opacity-70 transition-opacity">
              Producers
            </Link>
          </div>

          {/* Center logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 w-20 sm:w-28 md:w-36">
            <MatsuLogo className="text-current" />
            <div className="text-center text-[0.6rem] tracking-[0.35em] mt-0.5 uppercase font-light">
              Matcha
            </div>
          </Link>

          {/* Right nav links - desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/recipes" className="text-[0.8rem] uppercase tracking-[0.08em] hover:opacity-70 transition-opacity">
              Recipes
            </Link>
            <Link href="/shop" className="text-[0.8rem] uppercase tracking-[0.08em] hover:opacity-70 transition-opacity">
              Shop
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden ml-auto flex flex-col gap-1.5 p-3"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-[1.5px] bg-current transition-transform duration-300 ${
                menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1.5px] bg-current transition-transform duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[4.5px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 top-0 bg-kumo-dark z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <Link href="/about" className="text-xl sm:text-2xl tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
          About
        </Link>
        <Link href="/producers" className="text-xl sm:text-2xl tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
          Producers
        </Link>
        <Link href="/recipes" className="text-xl sm:text-2xl tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
          Recipes
        </Link>
        <Link href="/shop" className="text-xl sm:text-2xl tracking-wide uppercase" onClick={() => setMenuOpen(false)}>
          Shop
        </Link>
      </div>
    </nav>
  );
}
