"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
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

      // Parallax layers — inspired by osmo parallax pattern
      // Background image (layer 1) moves slowly, text (layer 2) moves faster
      const layersContainer = sectionRef.current?.querySelector(
        "[data-parallax-layers]"
      );
      if (layersContainer) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: layersContainer,
            start: "0% 0%",
            end: "100% 0%",
            scrub: 0,
          },
        });

        const layers = [
          { layer: "1", yPercent: -8 },   // background — drifts up very slowly
          { layer: "2", yPercent: -60 },   // text content — scrolls up and away
        ];

        layers.forEach((layerObj, idx) => {
          tl.to(
            layersContainer.querySelectorAll(
              `[data-parallax-layer="${layerObj.layer}"]`
            ),
            { yPercent: layerObj.yPercent, ease: "none" },
            idx === 0 ? undefined : "<"
          );
        });
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
      {/* Parallax layers container — full 200vh so ScrollTrigger has distance */}
      <div
        data-parallax-layers
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {/* Layer 1: Background image — moves slowly, taller than viewport to prevent gaps during parallax */}
        <div
          data-parallax-layer="1"
          className="absolute inset-x-0 top-0 w-full will-change-transform"
          style={{ height: "120%" }}
        >
          <img
            src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68ced4037313122cbefe3d2e_1dc96953009912ff36a8191ae292ac89_6.avif"
            alt="A hand stirs with a stick in an elegant cocktail glass filled with green matcha tea and ice cubes."
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kumo-dark/40 via-transparent to-kumo-dark/15" />
        </div>

        {/* Layer 2: Text content — moves faster, creating parallax depth */}
        <div
          data-parallax-layer="2"
          className="absolute bottom-0 left-0 w-full z-10 will-change-transform"
        >
          <div className="w-full px-6 md:px-12 pb-8 md:pb-14">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
              {/* Left: Large display title */}
              <div className="md:col-span-5 overflow-hidden">
                <h1
                  ref={titleRef}
                  className="font-serif text-[clamp(2.8rem,12vw,10.5rem)] leading-[0.85] tracking-[-0.02em] text-kumo-white uppercase"
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
                className="md:col-span-4 md:col-start-9 flex flex-col gap-5 pb-2"
              >
                <p className="text-[0.85rem] leading-[1.65] text-kumo-beige/80 font-light">
                  Our matcha blends are designed for modern living – vibrant,
                  smooth, and rich in flavor. From traditional sips to bold new
                  recipes, we make it easy to turn your routine into a ritual.
                </p>
                <div>
                  <Link
                    href="/shop"
                    className="btn-kumo btn-green inline-block"
                  >
                    <span>GET YOUR MATCHA</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
