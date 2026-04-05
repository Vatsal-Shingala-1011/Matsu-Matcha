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

const merchProducts = [
  {
    name: "T-Shirt Kumo",
    price: "29,90 €",
    image:
      "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68da9ffe4c3d4d3c92bc61fd_Matcha-Club-T-Shirt.avif",
    alt: "Mockup of a Matcha Club T-shirt.",
  },
  {
    name: "Kumo Patch",
    price: "5,90 €",
    image:
      "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68da9ffe5128a8204305430b_kumo-patch.avif",
    alt: "Mockup of a Matcha Patch.",
  },
  {
    name: "T-Shirt Club",
    price: "29,90 €",
    image:
      "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68da9ebb5f964363707a72ee_6692885b1fb8d5bbe88d6cb1822f33d6_Matcha-Club-T-Shirt-02.avif",
    alt: "Mockup of a Matcha Club T-shirt.",
  },
  {
    name: "Matcha Poster",
    price: "15,90 €",
    image:
      "https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68daa08d1cd2e1299ec8a133_Matcha-Tea-Poster.avif",
    alt: "Mockup of a Matcha Tea Poster.",
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
    <div className="group relative cursor-pointer">
      <div className="aspect-square bg-kumo-muted/40 rounded-sm overflow-hidden mb-3">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex items-baseline justify-between">
        <h3 className="font-serif text-lg uppercase tracking-wide">
          {name}
        </h3>
        <span className="text-sm">{price}</span>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      // Title reveal
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
        );
      }

      // Product cards stagger
      const cards = document.querySelectorAll(".shop-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <SmoothScroll>
        <Navigation />
        <main ref={heroRef}>
          {/* Hero */}
          <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
            <img
              src="https://cdn.prod.website-files.com/68c43ea6bc2e2319f7e948e1/68d7a967f5fa5f83c9d41975_Pouring%20Green%20Tea.avif"
              alt="Arm with a glass mug in the hand is pouring a green matcha tea into a glass."
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-kumo-dark/20" />
            <div className="relative z-10 h-full flex items-end px-6 md:px-12 pb-10 md:pb-14">
              <h1
                ref={titleRef}
                className="font-serif text-[clamp(4rem,11vw,9rem)] leading-[0.85] tracking-[-0.02em] text-kumo-white uppercase"
              >
                Our
                <br />
                Products
              </h1>
            </div>
          </section>

          {/* Matcha Products */}
          <section
            id="matcha"
            className="bg-kumo-beige text-kumo-dark py-16 md:py-24"
          >
            <div className="px-6 md:px-12">
              <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-wide mb-10 md:mb-14 pb-4 border-b border-kumo-dark/20">
                Matcha
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-14">
                {matchaProducts.map((p) => (
                  <div key={p.name} className="shop-card">
                    <ProductCard {...p} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Merchandise */}
          <section
            id="merch"
            className="bg-kumo-beige text-kumo-dark pb-16 md:pb-24"
          >
            <div className="px-6 md:px-12">
              <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-wide mb-10 md:mb-14 pb-4 border-b border-kumo-dark/20">
                Merchandise
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 md:gap-x-8 md:gap-y-14">
                {merchProducts.map((p) => (
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
    </>
  );
}
