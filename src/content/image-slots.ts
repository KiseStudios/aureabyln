import type { ContentValue, ImageAsset } from "./types";

/** Espaços de desenvolvimento, não catálogo real nem quantidade final de imagens. */
export const imageSlots = {
  services: [
    {
      status: "placeholder",
      pending: "Receber material e autorização para serviços 01.",
      value: { src: "/images/placeholders/services/services-01.svg", alt: "Espaço provisório: serviços 01.", width: 800, height: 600 },
    },
    {
      status: "placeholder",
      pending: "Receber material e autorização para serviços 02.",
      value: { src: "/images/placeholders/services/services-02.svg", alt: "Espaço provisório: serviços 02.", width: 800, height: 600 },
    },
    {
      status: "placeholder",
      pending: "Receber material e autorização para serviços 03.",
      value: { src: "/images/placeholders/services/services-03.svg", alt: "Espaço provisório: serviços 03.", width: 800, height: 600 },
    },
  ],
  about: [
    {
      status: "placeholder",
      pending: "Receber material e autorização para apresentação 01.",
      value: { src: "/images/placeholders/about/about-01.svg", alt: "Espaço provisório: apresentação 01.", width: 600, height: 800 },
    },
  ],
  gallery: [
    {
      status: "placeholder",
      pending: "Receber material e autorização para galeria 01.",
      value: { src: "/images/placeholders/gallery/gallery-01.svg", alt: "Espaço provisório: galeria 01.", width: 800, height: 800 },
    },
    {
      status: "placeholder",
      pending: "Receber material e autorização para galeria 02.",
      value: { src: "/images/placeholders/gallery/gallery-02.svg", alt: "Espaço provisório: galeria 02.", width: 800, height: 800 },
    },
    {
      status: "placeholder",
      pending: "Receber material e autorização para galeria 03.",
      value: { src: "/images/placeholders/gallery/gallery-03.svg", alt: "Espaço provisório: galeria 03.", width: 800, height: 800 },
    },
    {
      status: "placeholder",
      pending: "Receber material e autorização para galeria 04.",
      value: { src: "/images/placeholders/gallery/gallery-04.svg", alt: "Espaço provisório: galeria 04.", width: 800, height: 800 },
    },
  ],
} as const satisfies Record<string, readonly ContentValue<ImageAsset>[]>;
