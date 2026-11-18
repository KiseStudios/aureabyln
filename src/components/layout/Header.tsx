"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui";
import { sectionAnchors } from "@/components/sections/anchors";

const navigation = [
  { label: "Início", anchor: sectionAnchors.hero },
  { label: "Serviços", anchor: sectionAnchors.services },
  { label: "Sobre", anchor: sectionAnchors.about },
  { label: "Resultados", anchor: sectionAnchors.gallery },
  { label: "Contato", anchor: sectionAnchors.contact },
] as const;

type NavigationAnchor = (typeof navigation)[number]["anchor"];

export function Header({ availableAnchors }: { availableAnchors?: readonly NavigationAnchor[] }) {
  const links = availableAnchors
    ? navigation.filter(({ anchor }) => availableAnchors.includes(anchor))
    : navigation;
  const [menuOpen, setMenuOpen] = useState(false);

  const menuButton = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className="relative z-20 border-b border-neutral-200 bg-white"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen && menuButton.current?.offsetWidth) {
          closeMenu();
          menuButton.current.focus();
        }
      }}
    >
      <a
        href="#conteudo-principal"
        className="sr-only z-50 rounded-md bg-white p-3 text-neutral-950 focus:not-sr-only focus:absolute focus:left-4 focus:right-4 focus:w-fit focus:max-w-[calc(100%-2rem)] focus:whitespace-normal focus:top-4 focus:outline-2 focus:outline-offset-2"
      >
        Pular para o conteúdo
      </a>

      <Container className="flex min-h-20 items-center justify-between gap-6">
        <a
          href={`#${sectionAnchors.hero}`}
          onClick={closeMenu}
          className="shrink-0 text-lg font-semibold tracking-wide text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-4"
          aria-label="Áurea Beauty Studio — início"
        >
          Áurea
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              className="text-sm text-neutral-700 transition-colors hover:text-neutral-950 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          ref={menuButton}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-neutral-300 px-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-4 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Fechar" : "Menu"}
        </button>
      </Container>

      <nav
        id="mobile-primary-navigation"
        aria-label="Navegação mobile"
        hidden={!menuOpen}
        className="border-t border-neutral-200 bg-white md:hidden"
      >
        <Container className="flex flex-col gap-1 py-3">
          {links.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              onClick={closeMenu}
              className="flex min-h-11 items-center rounded-md px-3 text-sm text-neutral-800 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {item.label}
            </a>
          ))}
        </Container>
      </nav>
    </header>
  );
}
