"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: "Hikari",
    price: "29,90 €",
    image: "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68fc783959e3cbd87c6dc934_hikari-matcha.avif",
    alt: "Matcha Product Hikari on a minimalist green background.",
    link: "/shop/hikari",
  },
  {
    name: "Kaze",
    price: "34,20 €",
    image: "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68fcc5b74bb4bb22a0aa9494_36b7e3cd9fc2d88e9c914dd607fa58e4_kaze-matcha.avif",
    alt: "Matcha Product Kaze on a minimalist green background.",
    link: "/shop/kaze",
  },
  {
    name: "Suzu",
    price: "9,90 €",
    image: "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68de68011aff308383602a13_2b085139c1c9d597c65ccc7632649bf1_suzu-machta-cold-brew.avif",
    alt: "Matcha Product Suzu on a minimalist green background.",
    link: "/shop/suzu",
  },
  {
    name: "Kuro",
    price: "29,90 €",
    image: "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68fccd48bda78e38232a72fb_kuro-matcha.avif",
    alt: "Matcha Product Kuro on a minimalist green background.",
    link: "/shop/kuro",
  },
  {
    name: "Asa",
    price: "39,90 €",
    image: "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68de8b04e1141382a1809944_5f5beb0ed512cd4ab233fbf311841cb8_asa-reserve-matcha.avif",
    alt: "Matcha Product Asa on a minimalist green background.",
    link: "/shop/asa",
  },
  {
    name: "Enso",
    price: "45,00 €",
    image: "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68fc769b92c495ac997746d9_enso-matcha.avif",
    alt: "Matcha Product Enso on a minimalist green background.",
    link: "/shop/enso",
  },
];

export default function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGPathElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [snapPoints, setSnapPoints] = useState<number[]>([]);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  const getSlideMetrics = useCallback(() => {
    if (!trackRef.current || !collectionRef.current) return null;
    const items = trackRef.current.querySelectorAll(".product-item");
    if (!items.length) return null;
    const firstItem = items[0] as HTMLElement;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap) || 0;
    const slideW = firstItem.offsetWidth + gap;
    const viewW = collectionRef.current.offsetWidth;
    const trackW = trackRef.current.scrollWidth;
    const maxScroll = Math.max(trackW - viewW, 0);
    const maxIndex = maxScroll / slideW;
    const full = Math.floor(maxIndex);
    const points: number[] = [];
    for (let i = 0; i <= full; i++) points.push(-i * slideW);
    if (full < maxIndex) points.push(-maxIndex * slideW);
    return { points, slideW, maxScroll };
  }, []);

  const slideTo = useCallback((index: number) => {
    const metrics = getSlideMetrics();
    if (!metrics || !trackRef.current) return;
    const clamped = Math.max(0, Math.min(index, metrics.points.length - 1));
    setActiveIndex(clamped);
    gsap.to(trackRef.current, {
      x: metrics.points[clamped],
      duration: 0.4,
      ease: "power2.out",
    });
  }, [getSlideMetrics]);

  // Drag handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.clientX;
    currentX.current = gsap.getProperty(trackRef.current, "x") as number;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const metrics = getSlideMetrics();
    if (!metrics) return;
    const dx = e.clientX - startX.current;
    const newX = Math.max(-metrics.maxScroll, Math.min(0, currentX.current + dx));
    gsap.set(trackRef.current, { x: newX });
  }, [getSlideMetrics]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    isDragging.current = false;
    const metrics = getSlideMetrics();
    if (!metrics) return;
    const finalX = gsap.getProperty(trackRef.current, "x") as number;
    let closest = 0;
    let minDist = Infinity;
    metrics.points.forEach((pt, i) => {
      const d = Math.abs(pt - finalX);
      if (d < minDist) { minDist = d; closest = i; }
    });
    slideTo(closest);
  }, [getSlideMetrics, slideTo]);

  // Recalculate snap points on mount and resize
  useEffect(() => {
    const update = () => {
      const metrics = getSlideMetrics();
      if (metrics) setSnapPoints(metrics.points);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [getSlideMetrics]);

  // GSAP scroll animations
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 50, opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      const items = trackRef.current?.querySelectorAll(".product-item");
      if (items) {
        gsap.from(items, {
          x: 80, opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }

      if (svgRef.current) {
        const len = svgRef.current.getTotalLength();
        gsap.set(svgRef.current, { strokeDasharray: len, strokeDashoffset: len });
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

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < snapPoints.length - 1;

  return (
    <section ref={sectionRef} className="bg-kumo-dark py-[5.5rem] md:py-[5.75rem] relative overflow-hidden">
      {/* Decorative SVG */}
      <svg
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[20%] h-auto pointer-events-none"
        viewBox="0 0 300 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={svgRef}
          d="M250,50 C200,100 100,150 80,250 C60,350 120,400 180,380 C240,360 260,280 220,220 C180,160 100,160 50,220 C0,280 10,380 60,450 C110,520 200,560 280,520"
          stroke="#676436"
          strokeWidth="35"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="px-6 md:px-12 lg:px-16 relative z-10">
        {/* Section header — matches original: ~57px uppercase serif */}
        <div ref={titleRef} className="mb-10 md:mb-14">
          <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] uppercase text-kumo-light leading-[1.1]">
            Our matcha
          </h2>
        </div>

        {/* Slider region */}
        <div
          ref={collectionRef}
          className="overflow-hidden"
          role="region"
          aria-roledescription="carousel"
          aria-label="Slider"
        >
          {/* Track — draggable via pointer events */}
          <div
            ref={trackRef}
            className="flex product-track"
            style={{
              gap: "clamp(1.5rem, 2.5vw, 2.5rem)",
              touchAction: "pan-y",
              cursor: isDragging.current ? "grabbing" : "grab",
              userSelect: "none",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {products.map((product, i) => (
              <div
                key={product.name}
                className="product-item flex-shrink-0 relative group"
                role="group"
                aria-roledescription="Slide"
                aria-label={`Slide ${i + 1} of ${products.length}`}
                style={{
                  width: "calc((100% - 2 * clamp(1.5rem, 2.5vw, 2.5rem)) / 3)",
                  minWidth: "220px",
                }}
              >
                {/* Product image — portrait aspect ratio 2/2.5 matching original */}
                <div
                  className="relative overflow-hidden rounded-[4px] mb-0"
                  style={{ aspectRatio: "2 / 2.5" }}
                >
                  <img
                    src={product.image}
                    alt={product.alt}
                    loading="lazy"
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>

                {/* Name + Price row — matches original: flex space-between */}
                <div className="flex items-center justify-between px-[0.4rem] mt-[0.6rem]">
                  <h3 className="font-serif text-[clamp(0.85rem,1.2vw,1.1rem)] uppercase text-kumo-light tracking-wide">
                    {product.name}
                  </h3>
                  <span className="text-[0.72rem] text-kumo-light font-light">
                    {product.price}
                  </span>
                </div>

                {/* Full-card link overlay */}
                <a
                  href={product.link}
                  aria-label={`To the ${product.name} product page`}
                  className="absolute inset-0 z-10"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Slider controls — right-aligned, small muted buttons matching original */}
        <div className="flex gap-2 mt-6 justify-end">
          <button
            onClick={() => slideTo(activeIndex - 1)}
            disabled={!canPrev}
            className="slider-control"
            aria-label="Previous Slide"
            style={{ opacity: canPrev ? 1 : 0.2 }}
          >
            Previous
          </button>
          <button
            onClick={() => slideTo(activeIndex + 1)}
            disabled={!canNext}
            className="slider-control"
            aria-label="Next Slide"
            style={{ opacity: canNext ? 1 : 0.2 }}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
