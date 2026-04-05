"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Initial load animation - title lines stagger up (delayed for preloader)
      const lines = titleRef.current?.querySelectorAll(".hero-line");
      if (lines) {
        gsap.set(lines, { y: 120, opacity: 0 });
        gsap.to(lines, {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.15,
          delay: 2.5,
        });
      }

      // Description + CTA fade in
      if (descRef.current) {
        gsap.set(descRef.current, { y: 40, opacity: 0 });
        gsap.to(descRef.current, {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          delay: 3.1,
        });
      }

      // Parallax: background moves upward slower than scroll speed.
      // The sticky container keeps it visible, but we translate the image
      // so it drifts up gently as you scroll through the 200vh section.
      const bgContainer = imgRef.current?.parentElement;
      if (bgContainer) {
        gsap.fromTo(
          bgContainer,
          { yPercent: 0 },
          {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Subtle zoom as background scrolls
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { scale: 1 },
          {
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "200vh" }}
    >
      {/* Background image — sticky so it stays visible across the full 200vh scroll.
          The next section (Intro) has z-10 and slides over this naturally. */}
      <div className="sticky top-0 h-screen w-full overflow-hidden -z-0">
        <img
          ref={imgRef}
          src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68ced4037313122cbefe3d2e_1dc96953009912ff36a8191ae292ac89_6.avif"
          alt="A hand stirs with a stick in an elegant cocktail glass filled with green matcha tea and ice cubes."
          className="w-full h-full object-cover object-center will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-kumo-dark/40 via-transparent to-kumo-dark/15" />
      </div>

      {/* Content — positioned absolutely at top of the 200vh section.
          This scrolls naturally (not sticky), so text moves up faster
          than the sticky background, creating the parallax feel.
          Placed within h-screen so it sits at bottom of first viewport. */}
      <div
        ref={contentRef}
        className="absolute top-0 left-0 w-full h-screen flex items-end z-10"
      >
        <div className="w-full px-6 md:px-12 pb-12 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
            {/* Left: Large display title */}
            <div className="md:col-span-5 overflow-hidden">
              <h1
                ref={titleRef}
                className="font-serif text-[clamp(4rem,11vw,9rem)] leading-[0.88] tracking-[-0.02em] text-kumo-white uppercase"
              >
                <span className="hero-line inline-block">Start</span>
                <br />
                <span className="hero-line inline-block">your</span>
                <br />
                <span className="hero-line inline-block">new</span>
                <br />
                <span className="hero-line inline-block">Rituals</span>
              </h1>
            </div>

            {/* Right: Description + CTA */}
            <div
              ref={descRef}
              className="md:col-span-4 md:col-start-8 flex flex-col gap-6 pb-2"
            >
              <p className="text-[0.9rem] leading-[1.7] text-kumo-beige/85 font-light">
                Our matcha blends are designed for modern living – vibrant,
                smooth, and rich in flavor. From traditional sips to bold new
                recipes, we make it easy to turn your routine into a ritual.
              </p>
              <div>
                <Link href="/shop" className="btn-kumo btn-green inline-block">
                  <span>Get your Matcha</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
