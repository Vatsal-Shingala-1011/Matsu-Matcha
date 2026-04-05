"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Nature() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Parallax background
      if (imgRef.current) {
        gsap.fromTo(imgRef.current,
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Title reveal
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 80, opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Bottom content fade in
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          y: 40, opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] overflow-hidden">
      {/* Parallax background */}
      <div className="absolute inset-0">
        <img
          ref={imgRef}
          src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68d54eb3a62b630a3ffdf4dd_AdobeStock_1345507359.avif"
          alt="Beautiful landscape of green tea fields with mountains in the background."
          className="w-full h-[130%] object-cover will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-kumo-dark/30 via-transparent to-kumo-dark/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[90vh] flex flex-col justify-between">
        {/* Top: Title */}
        <div ref={titleRef} className="px-6 md:px-12 pt-20 md:pt-28">
          <h2 className="font-serif text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-[-0.02em] text-kumo-white">
            Respect
            <br />
            for Nature
          </h2>
        </div>

        {/* Bottom: Description + B Corp badge */}
        <div ref={contentRef} className="px-6 md:px-12 pb-12 md:pb-20">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="max-w-md">
              <p className="text-base md:text-lg leading-[1.6] text-kumo-white/90 font-light mb-6">
                As a Certified B Corporation, we use business for good: 3% of
                sales fund climate work.
              </p>
              <Link href="/producers" className="btn-kumo inline-block text-kumo-white border-kumo-white/50 hover:border-kumo-white">
                <span>our Producers</span>
              </Link>
            </div>

            {/* B Corp badge */}
            <div className="text-kumo-white w-16 md:w-20 flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 147 210" fill="none">
                <path d="M42.8066 71.2661H73.1026C80.4718 71.2661 90.1914 71.2661 95.2104 74.3139C100.715 77.5891 105.036 83.5482 105.036 91.7515C105.036 100.637 100.366 107.309 92.6326 110.463V110.705C102.928 112.813 108.539 120.531 108.539 130.827C108.539 143.109 99.7593 154.815 83.1557 154.815H42.8066V71.2661ZM53.9212 107.172H76.1655C88.7964 107.172 93.9518 102.608 93.9518 93.8288C93.9518 82.2442 85.7638 80.6066 76.1655 80.6066H53.9212V107.172ZM53.9212 145.429H81.7759C91.3589 145.429 97.4545 139.576 97.4545 130.463C97.4545 119.576 88.6751 116.543 79.3194 116.543H53.9212V145.429Z" fill="currentColor"/>
                <path d="M136.968 113.055C136.968 148.143 108.522 176.589 73.4199 176.589C38.3324 176.589 9.88639 148.143 9.88639 113.055C9.88639 77.9677 38.3324 49.5217 73.4199 49.5217C108.522 49.5369 136.968 77.9829 136.968 113.055ZM73.435 39.8477C33.0253 39.8477 0.257812 72.6152 0.257812 113.025C0.257812 153.435 33.0253 186.202 73.435 186.202C113.86 186.202 146.627 153.435 146.627 113.025C146.627 72.6152 113.86 39.8477 73.435 39.8477Z" fill="currentColor"/>
                <path d="M146.459 201.655H0.392578V211.253H146.459V201.655Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
