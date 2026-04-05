"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger);

const matchaProducts = [
  {
    name: "Hikari",
    price: "29,90 €",
    image:
      "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68fc783959e3cbd87c6dc934_hikari-matcha.avif",
    alt: "Matcha Product Hikari on a minimalist green background.",
  },
  {
    name: "Kaze",
    price: "34,90 €",
    image:
      "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68fcc5b74bb4bb22a0aa9494_36b7e3cd9fc2d88e9c914dd607fa58e4_kaze-matcha.avif",
    alt: "Matcha Product Kaze on a minimalist green background.",
  },
  {
    name: "Kuro",
    price: "29,90 €",
    image:
      "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68fccd48bda78e38232a72fb_kuro-matcha.avif",
    alt: "Matcha Product Kuro on a minimalist green background.",
  },
  {
    name: "Suzu",
    price: "9,90 €",
    image:
      "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68de68011aff308383602a13_2b085139c1c9d597c65ccc7632649bf1_suzu-machta-cold-brew.avif",
    alt: "Matcha Product Suzu on a minimalist green background.",
  },
  {
    name: "Asa",
    price: "39,90 €",
    image:
      "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68de8b04e1141382a1809944_5f5beb0ed512cd4ab233fbf311841cb8_asa-reserve-matcha.avif",
    alt: "Matcha Product Asa on a minimalist green background.",
  },
  {
    name: "Enso",
    price: "45,00 €",
    image:
      "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68fc769b92c495ac997746d9_enso-matcha.avif",
    alt: "Matcha Product Enso on a minimalist green background.",
  },
];

function ProductCard({
  name,
  price,
  image,
  alt,
}: {
  name: string;
  price: string;
  image: string;
  alt: string;
}) {
  return (
    <a href="#" className="group block cursor-pointer">
      <div className="aspect-[4/5] bg-[#B2B194]/30 overflow-hidden mb-4">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[0.85rem] uppercase tracking-[0.08em] underline underline-offset-2 decoration-kumo-dark/40 group-hover:decoration-kumo-dark transition-colors">
          {name}
        </h3>
        <span className="text-[0.8rem] tracking-wide shrink-0">{price}</span>
      </div>
    </a>
  );
}

export default function ShopPage() {
  const mainRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
        );
      }

      // Section headings
      const headings = mainRef.current?.querySelectorAll(".shop-heading");
      headings?.forEach((h) => {
        gsap.fromTo(
          h,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: h,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Product cards stagger
      const cards = mainRef.current?.querySelectorAll(".shop-card");
      cards?.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <SmoothScroll>
      <Navigation />
      <main ref={mainRef}>
        {/* Sub-hero */}
        <section className="relative h-[75vh] min-h-[480px] overflow-hidden bg-kumo-dark">
          <img
            src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68d7a967f5fa5f83c9d41975_Pouring%20Green%20Tea.avif"
            alt="Arm with a glass mug in the hand is pouring a green matcha tea into a glass."
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kumo-dark/30 to-transparent" />
          <div className="relative z-10 h-full flex items-end px-6 md:px-12 pb-10 md:pb-14">
            <h1
              ref={titleRef}
              className="font-serif text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.88] tracking-[-0.02em] text-kumo-white uppercase"
            >
              Our
              <br />
              Products
            </h1>
          </div>
        </section>

        {/* Matcha Products */}
        <section className="bg-kumo-beige text-kumo-dark pt-14 md:pt-20 pb-10 md:pb-16">
          <div className="px-6 md:px-12">
            <h2 className="shop-heading font-serif text-[clamp(1.8rem,4vw,3rem)] uppercase tracking-[0.04em] mb-8 md:mb-12 pb-3 border-b border-kumo-dark/15">
              Matcha
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 md:gap-x-7 md:gap-y-12">
              {matchaProducts.map((p) => (
                <div key={p.name} className="shop-card">
                  <ProductCard {...p} />
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </SmoothScroll>
  );
}
