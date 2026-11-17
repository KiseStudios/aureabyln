import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import type { ContentValue, ProfessionalProfile } from "@/content";

function sample<T>(value: T): ContentValue<T> {
  return { status: "approved", value, approvalReference: "Amostra técnica local" };
}

const previewProfile: ProfessionalProfile = {
  name: sample("Nome de demonstração"),
  positioning: sample("Texto ilustrativo para revisar a hierarquia da apresentação."),
  biography: sample(
    "Este parágrafo é fictício e existe somente para conferir legibilidade, largura de linha e espaçamento. Não descreve a trajetória, a formação ou a experiência da profissional."
  ),
  image: {
    status: "placeholder",
    value: {
      src: "/images/placeholders/about/about-01.svg",
      alt: "Espaço gráfico provisório; não é um retrato da profissional.",
      width: 600,
      height: 800,
    },
    pending: "Receber retrato autorizado.",
  },
};

export default function AboutPreview() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main>
      <header className="space-y-2 p-6">
        <h1 tabIndex={-1} className="text-xl font-semibold">Prévia local de Sobre</h1>
        <p className="max-w-2xl text-sm">
          Os textos são fictícios e servem somente para revisar o layout. Não representam conteúdo aprovado
          e não são usados na página pública.
        </p>
      </header>
      <About profile={previewProfile} />
    </main>
  );
}
