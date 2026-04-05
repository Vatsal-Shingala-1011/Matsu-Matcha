"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 50;
const FRAME_PATH = (i: number) => `/frames/${String(i).padStart(2, "0")}.png`;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Preload all frames
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let count = 0;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i);
      img.onload = () => {
        count++;
        if (count === FRAME_COUNT) {
          framesRef.current = images;
          setLoaded(true);
        }
      };
      images.push(img);
    }
  }, []);

  // Draw frame to canvas, covering viewport like object-cover
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !framesRef.current.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const clamped = Math.max(0, Math.min(index, FRAME_COUNT - 1));
    const img = framesRef.current[clamped];
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // object-cover logic
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  };

  // Resize canvas to viewport
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (loaded) drawFrame(0);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [loaded]);

  // GSAP ScrollTrigger to scrub through frames + text animations
  useEffect(() => {
    if (!sectionRef.current || !loaded) return;
    const ctx = gsap.context(() => {
      // Frame scrubbing — animate a proxy object's frame property
      const frameObj = { frame: 0 };
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (FRAME_COUNT - 1));
          if (idx !== frameObj.frame) {
            frameObj.frame = idx;
            drawFrame(idx);
          }
        },
      });

      // Draw initial frame
      drawFrame(0);

      // Title reveal — delayed for preloader
      const lines = titleRef.current?.querySelectorAll(".hero-line");
      if (lines) {
        gsap.set(lines, { y: 120, opacity: 0 });
        gsap.to(lines, {
          y: 0, opacity: 1,
          duration: 1.2, ease: "power3.out",
          stagger: 0.15, delay: 2.5,
        });
      }

      // Description + CTA fade in
      if (descRef.current) {
        gsap.set(descRef.current, { y: 40, opacity: 0 });
        gsap.to(descRef.current, {
          y: 0, opacity: 1,
          duration: 1, ease: "power2.out",
          delay: 3.1,
        });
      }

      // Text layer scrolls up as user scrolls
      const textLayer = sectionRef.current?.querySelector("[data-text-layer]");
      if (textLayer) {
        gsap.to(textLayer, {
          yPercent: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0,
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [loaded]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "200vh" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas background — frame animation scrubbed by scroll */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-kumo-dark/50 via-transparent to-kumo-dark/15 z-[1]" />

        {/* Text layer — scrolls up faster than background */}
        <div
          data-text-layer
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
                <p className="text-[1.25rem] leading-[1.65] text-kumo-beige/80 font-light">
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
