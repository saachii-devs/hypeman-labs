import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Marquee } from "@/components/marquee";
import { Abilities } from "@/components/abilities";
import { Work } from "@/components/work";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <Marquee />
      <Abilities />
      <Work />
      <Cta />
      <Footer />
    </>
  );
}
