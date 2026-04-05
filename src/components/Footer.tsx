"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import MatsuLogo from "./MatsuLogo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Footer background image — tea field */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68c5344b59cd3644fa8c02b5_falaq-lazuardi-x6c9-KJ3nFU-unsplash.avif"
          alt="A wide field of a tea plantation with a hill in the background."
          className="w-full h-full object-cover"
        />
      </div>

      {/* Footer content card */}
      <div className="relative z-10 pt-24 pb-8">
        <div
          ref={contentRef}
          className="mx-6 md:mx-12 lg:mx-16 bg-kumo-dark/90 backdrop-blur-sm rounded-lg p-8 md:p-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr_1fr] gap-10 md:gap-8">
            {/* Left: Photo + Nav links */}
            <div className="flex flex-col gap-6">
              <div className="w-40 h-40 overflow-hidden rounded-sm">
                <img
                  src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68c90c85c2390d6153b2892f_Matcha-Tea-Enjoyment.avif"
                  alt="A man with a cap is enjoying a cup of green matcha tea."
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Center: Navigation links */}
            <div className="flex flex-col gap-3">
              <Link
                href="/about"
                className="font-serif text-sm uppercase text-kumo-light tracking-wider hover:opacity-70 transition-opacity"
              >
                About
              </Link>
              <Link
                href="/producers"
                className="font-serif text-sm uppercase text-kumo-light tracking-wider hover:opacity-70 transition-opacity"
              >
                Producers
              </Link>
              <Link
                href="/recipes"
                className="font-serif text-sm uppercase text-kumo-light tracking-wider hover:opacity-70 transition-opacity"
              >
                Recipes
              </Link>
              <Link
                href="/shop"
                className="font-serif text-sm uppercase text-kumo-light tracking-wider hover:opacity-70 transition-opacity"
              >
                Shop
              </Link>
              <Link
                href="#"
                className="btn-kumo btn-green inline-block self-start text-xs mt-4"
              >
                <span>Join the Club</span>
              </Link>
            </div>

            {/* Right: Social + Newsletter */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs text-kumo-primary italic mb-3 block">
                  Coming soon
                </span>
                <div className="flex gap-3">
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full border border-kumo-olive/40 flex items-center justify-center text-kumo-beige/70 hover:text-kumo-beige transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full border border-kumo-olive/40 flex items-center justify-center text-kumo-beige/70 hover:text-kumo-beige transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle
                        cx="17.5"
                        cy="6.5"
                        r="1.5"
                        fill="currentColor"
                        stroke="none"
                      />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="w-8 h-8 rounded-full border border-kumo-olive/40 flex items-center justify-center text-kumo-beige/70 hover:text-kumo-beige transition-colors"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <span className="text-xs text-kumo-primary font-medium mb-2 block">
                  Join our newsletter
                </span>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="E-Mail"
                    className="bg-transparent border border-kumo-olive/40 rounded-l-sm px-3 py-2 text-xs text-kumo-beige/80 placeholder:text-kumo-muted/50 flex-1 outline-none focus:border-kumo-muted"
                  />
                  <button className="bg-kumo-olive/50 border border-kumo-olive/40 border-l-0 rounded-r-sm px-3 py-2 text-kumo-beige hover:bg-kumo-olive transition-colors">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large logo below the card */}
        <div className="flex justify-center mt-12 mb-8">
          <div className="w-48 md:w-64">
            <MatsuLogo className="text-kumo-dark/30" />
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mx-6 md:mx-12 lg:mx-16 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-kumo-dark/10">
          <div className="flex items-center gap-2 text-xs text-kumo-dark/50">
            <span>©2025</span>
            <span>Matsu Matcha</span>
          </div>
          <div className="flex gap-4 text-xs text-kumo-dark/50">
            <Link
              href="/privacy"
              className="hover:text-kumo-dark transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-kumo-dark transition-colors">
              User agreement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
