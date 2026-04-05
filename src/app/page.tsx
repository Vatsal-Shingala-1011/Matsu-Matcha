"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Crafted from "@/components/Crafted";
import MatchaModern from "@/components/MatchaModern";
import Products from "@/components/Products";
import Nature from "@/components/Nature";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Navigation />
      <main>
        <Hero />
        <Intro />
        <Crafted />
        <MatchaModern />
        <Products />
        <Nature />
        <CtaBanner />
      </main>
      <Footer />
    </>
  );
}
