import { notFound } from "next/navigation";
import { Services } from "@/components/sections/Services";
import { images, servicePlaceholder, type ContentValue, type Service } from "@/content";

// Estado simulado exclusivamente na rota local para exercitar o contrato de aprovação.
function sample<T>(value: T): ContentValue<T> {
  return { status: "approved", value, approvalReference: "Amostra técnica local" };
}

const samples: readonly Service[] = [
  {
    ...servicePlaceholder,
    id: "sample-image",
    name: sample("Amostra com imagem"),
    description: sample("Exemplo técnico de um card com imagem provisória e link interno."),
    image: sample(images.service.value),
    cta: sample({ label: "Voltar à identificação da prévia", href: "#preview-title" }),
  },
  {
    ...servicePlaceholder,
    id: "sample-static",
    name: sample("Amostra de título mais longo para conferir a quebra de linhas"),
    description: sample("Card estático para revisão de leitura e espaçamento."),
  },
];

export default async function ServicesPreview({
  searchParams,
}: { searchParams: Promise<{ estado?: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();
  const showSamples = (await searchParams).estado === "amostras";
  return (
    <main>
      <header className="space-y-2 p-6">
        <h1 id="preview-title" tabIndex={-1} className="text-xl font-semibold">Prévia local de Serviços</h1>
        {showSamples && <p>Amostras técnicas. Os itens abaixo não representam o catálogo da Áurea.</p>}
        <a className="inline-flex min-h-11 items-center underline" href={showSamples ? "?" : "?estado=amostras"}>
          {showSamples ? "Ver catálogo atual" : "Conferir amostras de cards"}
        </a>
      </header>
      <Services catalog={showSamples ? samples : undefined} />
    </main>
  );
}
