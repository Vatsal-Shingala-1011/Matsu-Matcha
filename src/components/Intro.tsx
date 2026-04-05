"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const svgRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Text reveal on scroll
      if (textRef.current) {
        gsap.from(textRef.current, {
          y: 60, opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Button reveal
      if (btnRef.current) {
        gsap.from(btnRef.current, {
          y: 30, opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: btnRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // Image parallax
      if (imgRef.current) {
        gsap.fromTo(imgRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
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

      // SVG path drawing animation
      if (svgRef.current) {
        const pathLength = svgRef.current.getTotalLength();
        gsap.set(svgRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.to(svgRef.current, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: svgRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 bg-kumo-dark">
      {/* SVG path decoration */}
      <svg
        className="absolute top-0 right-0 w-[50%] md:w-[35%] h-auto pointer-events-none z-10"
        viewBox="0 0 500 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMin meet"
      >
        <path
          ref={svgRef}
          d="M500,50 C400,80 300,120 250,200 C200,280 220,350 300,380 C380,410 420,350 400,280 C380,210 300,180 200,250 C100,320 60,450 80,550 C100,650 200,700 300,680 C400,660 450,580 420,500"
          stroke="#676436"
          strokeWidth="40"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Text section */}
      <div className="px-6 md:px-12 pt-24 md:pt-40 pb-12 md:pb-16">
        <div ref={textRef} className="max-w-[80%] md:max-w-[75%]">
          <p className="font-serif text-[clamp(1.4rem,3.2vw,2.8rem)] leading-[1.25] text-kumo-beige">
            Matcha is more than a drink. It&apos;s energy, clarity, and calm in
            one cup. We bring the world&apos;s finest matcha into your daily
            moments – whether it&apos;s your morning boost, a creative break, or
            a slow evening wind-down.
          </p>
        </div>
        <div ref={btnRef} className="mt-8 md:mt-10">
          <Link href="/about" className="btn-kumo btn-green inline-block">
            <span>explore our vision</span>
          </Link>
        </div>
      </div>

      {/* Image section - right-aligned */}
      <div className="px-6 md:px-12 pb-12 md:pb-0 flex justify-end relative">
        <div className="w-full md:w-[50%] aspect-[4/5] overflow-hidden rounded-md">
          <img
            ref={imgRef}
            src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68c805a6a9eb08d6b059ad76_3d6f4f2d3753a07fd36d19b15894ccf3_Tea%20Preparation%20Scene.avif"
            alt="Tea preparation scene: A man is holding a cup of matcha tea with a spoon."
            className="w-full h-[115%] object-cover will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
