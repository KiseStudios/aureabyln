import { Header } from "@/components/layout";
import { Hero } from "@/components/sections/Hero";
import { sectionAnchors } from "@/components/sections/anchors";

export default function Home() {
  return (
    <>
      <Header availableAnchors={[sectionAnchors.hero]} />
      <main id="conteudo-principal" tabIndex={-1}>
        <Hero />
      </main>
    </>
  );
}
