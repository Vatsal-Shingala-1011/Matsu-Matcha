import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Crafted from "@/components/Crafted";
import MatchaModern from "@/components/MatchaModern";
import Products from "@/components/Products";
import Nature from "@/components/Nature";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Intro />
        <Crafted />
        <MatchaModern />
        <Products />
        <Nature />
      </main>
      <Footer />
    </>
  );
}
