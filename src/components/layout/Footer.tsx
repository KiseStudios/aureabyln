import Link from "next/link";
import { Container } from "@/components/ui";
import { sectionAnchors } from "@/components/sections/anchors";

const footerNavigation = [
  { label: "Início", anchor: sectionAnchors.hero },
  { label: "Serviços", anchor: sectionAnchors.services },
  { label: "Sobre", anchor: sectionAnchors.about },
  { label: "Resultados", anchor: sectionAnchors.gallery },
  { label: "Contato", anchor: sectionAnchors.contact },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <Link
            href={`#${sectionAnchors.hero}`}
            className="inline-flex text-lg font-semibold tracking-wide text-neutral-950 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            Áurea Beauty Studio
          </Link>
          <p className="text-sm text-neutral-600">
            Cuidado e beleza, com atenção a cada detalhe.
          </p>
        </div>

        <nav aria-label="Navegação do rodapé">
          <ul className="flex flex-wrap gap-x-5 gap-y-3">
            {footerNavigation.map((item) => (
              <li key={item.anchor}>
                <Link
                  href={`#${item.anchor}`}
                  className="inline-flex min-h-11 items-center text-sm text-neutral-700 underline-offset-4 hover:text-neutral-950 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-xs text-neutral-500 md:text-right">
          © {new Date().getFullYear()} Áurea Beauty Studio.
        </p>
      </Container>
    </footer>
  );
}
