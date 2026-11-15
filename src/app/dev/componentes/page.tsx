import { notFound } from "next/navigation";
import { Button, Container, Section } from "@/components/ui";

export default function ComponentPreview() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main>
      <Section aria-labelledby="preview-title">
        <Container className="space-y-6">
          <h1 id="preview-title" className="text-3xl font-semibold">Prévia local de componentes</h1>
          <p>Estilos neutros para revisão de estrutura e teclado.</p>
          <form className="grid max-w-sm gap-4">
            <label htmlFor="sample">Campo para testar a ação de limpar</label>
            <input id="sample" className="rounded border p-2" />
            <Button type="reset">Limpar campo</Button>
          </form>
          <div className="flex flex-wrap items-center gap-4">
            <Button disabled>Indisponível</Button>
            <Button href="#estrutura" variant="secondary" size="compact">Ver estrutura</Button>
            <Button href="https://github.com/KiseStudios/aureabyln" variant="secondary">Abrir repositório</Button>
          </div>
        </Container>
      </Section>
      <Section id="estrutura" tabIndex={-1} aria-labelledby="structure-title" className="border-t">
        <Container className="space-y-4">
          <h2 id="structure-title" className="text-2xl font-semibold">Section e Container</h2>
          <p>O filete ocupa a seção inteira. O conteúdo se alinha ao título da página.</p>
        </Container>
      </Section>
    </main>
  );
}
