"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CtaBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Text fade in
      if (textRef.current) {
        gsap.from(textRef.current, {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      // Image parallax
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { yPercent: 10 },
          {
            yPercent: -10,
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

      // SVG path drawing
      if (svgRef.current) {
        const len = svgRef.current.getTotalLength();
        gsap.set(svgRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(svgRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-[14rem] md:py-[10rem]"
      style={{ minHeight: "38rem" }}
    >
      {/* SVG decoration — top right, behind the image */}
      <div className="absolute top-[-5rem] right-[5%] w-[30%] max-w-[300px] pointer-events-none z-0">
        <svg
          viewBox="0 0 400 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
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
      </div>

      {/* Hand holding iced coffee — absolute right */}
      <div
        ref={imgRef}
        className="absolute right-0 top-[5rem] bottom-0 w-[55%] md:w-[50%] z-[1] pointer-events-none"
      >
        <img
          src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68d43cb561789bda881ebe52_Hand-Holding-Iced-Coffee-free.avif"
          alt="Hand is holding an iced coffee."
          className="w-full h-full object-contain object-right-bottom"
        />
      </div>

      {/* Text content — left side, on top */}
      <div className="relative z-[2] px-6 md:px-12 lg:px-16">
        <div ref={textRef} className="max-w-[26rem]">
          <p className="text-[clamp(1.25rem,2.2vw,1.7rem)] leading-[1.45] text-kumo-light font-normal font-serif">
            At the intersection of culture and craft, we found our purpose – to
            share the glow of matcha with a new generation.
          </p>
          <Link
            href="/shop"
            className="btn-kumo btn-green inline-block mt-8 text-xs uppercase"
          >
            <span>grab your matcha</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
