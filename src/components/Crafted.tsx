"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Crafted() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Title words reveal with stagger
      const titles = titleRef.current?.querySelectorAll(".crafted-word");
      if (titles) {
        gsap.from(titles, {
          y: 80, opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        });
      }

      // Image parallax
      if (imgRef.current) {
        gsap.fromTo(imgRef.current,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: imgRef.current.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Description fade in
      if (descRef.current) {
        gsap.from(descRef.current, {
          y: 40, opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: descRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-kumo-beige text-kumo-dark py-14 sm:py-20 md:py-32 lg:py-40">
      <div className="px-6 md:px-12">
        <div ref={titleRef}>
          {/* Title: Crafted */}
          <h2 className="font-serif text-[clamp(2.8rem,13vw,11rem)] leading-[0.85] tracking-[-0.02em] mb-6 md:mb-12">
            <span className="crafted-word inline-block">Crafted</span>
          </h2>
        </div>

        {/* Grid: Image + Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Left: Image */}
          <div className="aspect-[3/4] overflow-hidden rounded-md">
            <img
              ref={imgRef}
              src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68de29a39a0fdd21c392c6fd_Hands-Holding-Matcha-Cup.avif"
              alt="Hands holding a fancy Matcha Cup"
              className="w-full h-[112%] object-cover will-change-transform"
            />
          </div>

          {/* Right: "For Today" + description */}
          <div className="flex flex-col justify-between py-2">
            <div ref={titleRef} className="flex flex-col">
              <h2 className="crafted-word font-serif text-[clamp(2.8rem,13vw,11rem)] leading-[0.8] tracking-[-0.02em]">
                For
              </h2>
              <h2 className="crafted-word font-serif text-[clamp(2.8rem,13vw,11rem)] leading-[0.8] tracking-[-0.02em]">
                Today
              </h2>
            </div>
            <div ref={descRef} className="max-w-sm mt-8 md:mt-0">
              <p className="text-[0.9rem] leading-[1.7] text-kumo-dark/75 font-light">
                Our matcha blends are designed for modern living – vibrant,
                smooth, and rich in flavor. From traditional sips to bold new
                recipes, we make it easy to turn your routine into a ritual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
