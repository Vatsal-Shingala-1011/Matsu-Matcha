"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MatchaModern() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Title fade-in
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 60, opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Grid cards stagger in
      const cards = gridRef.current?.querySelectorAll(".bento-card");
      if (cards) {
        gsap.from(cards, {
          y: 60, opacity: 0, scale: 0.95,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });
      }

      // SVG path drawing in the decorative card
      if (svgPathRef.current) {
        const len = svgPathRef.current.getTotalLength();
        gsap.set(svgPathRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(svgPathRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: svgPathRef.current,
            start: "top 80%",
            end: "bottom 30%",
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-kumo-muted text-kumo-dark py-20 md:py-32 lg:py-40 overflow-hidden">
      <div className="px-6 md:px-12">
        {/* Section heading */}
        <div ref={titleRef} className="text-center mb-12 md:mb-20">
          <h2 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.1]">
            Matcha Made Modern
          </h2>
        </div>

        {/* Bento grid layout */}
        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {/* Row 1 */}
          <div className="bento-card bg-kumo-olive-dark rounded-md p-6 md:p-10 flex flex-col justify-end aspect-square">
            <p className="font-serif text-[clamp(1.1rem,2.2vw,1.8rem)] leading-[1.25] text-kumo-primary">
              &ldquo;In every sip, there is calm and clarity.&rdquo;
            </p>
          </div>

          <div className="bento-card relative aspect-square overflow-hidden rounded-md">
            <img
              src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68d4df0f507df04486c0034e_Matcha-Tea-Preparation.avif"
              alt="Hand holding a ceremonial matcha whisk"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div className="hidden md:block" />

          {/* Row 2 */}
          <div className="bento-card relative aspect-square overflow-hidden rounded-md">
            <img
              src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68d4de95d6b7a221d639cc68_Cozy-Beverage-Moment.avif"
              alt="Young woman holding a frosted matcha glass"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Decorative SVG card */}
          <div className="bento-card bg-kumo-olive-dark rounded-md flex items-center justify-center aspect-square">
            <svg width="70%" viewBox="0 0 403 406" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                ref={svgPathRef}
                d="M401 120.5C356 124.002 280.204 139.966 227 173.997C171.5 209.497 122.685 266.419 119.5 312.997C115.5 371.497 140 385.997 176 381.997C235 365.997 287.5 254.938 300 184.497C303.5 163.497 311.5 152.5 311.5 111C300 -5.00007 227 5.99753 154.5 74.9975C75.5 158 36 253 21 283"
                stroke="#676436"
                strokeWidth="46"
              />
            </svg>
          </div>

          {/* Japanese text card */}
          <div className="bento-card bg-kumo-brown rounded-md p-6 md:p-10 flex flex-col justify-between aspect-square">
            <div className="font-serif text-[clamp(1.8rem,3.5vw,3rem)] leading-[1] text-kumo-white mt-auto mb-4">
              雲抹茶
            </div>
            <Link href="/shop" className="btn-kumo btn-light inline-block self-start text-xs">
              <span>our merchandise</span>
            </Link>
          </div>

          {/* Row 3 */}
          <div className="hidden md:block" />

          <div className="bento-card bg-kumo-red rounded-md p-6 md:p-10 flex flex-col justify-between aspect-square">
            <p className="text-[0.8rem] md:text-[0.9rem] leading-[1.65] text-kumo-beige/85 font-light">
              Whether you&apos;re looking for a morning boost, a smooth
              afternoon companion, or a calming evening ritual – we&apos;ve
              crafted a matcha for every moment.
            </p>
            <Link href="/shop" className="btn-kumo btn-light inline-block self-start text-xs mt-4">
              <span>Explore products</span>
            </Link>
          </div>

          <div className="bento-card relative aspect-square overflow-hidden rounded-md">
            <img
              src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68d4df0f5cb3dbabd3ddc2b6_Joyful-Beverage-Moment.avif"
              alt="Two women smile at each other and hold glasses of matcha"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
