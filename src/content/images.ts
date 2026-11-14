import type { ContentValue, ImageAsset } from "./types";

export const images = {
  service: {
    status: "placeholder",
    pending: "Receber imagem de serviço e autorização de uso.",
    value: {
      src: "/images/placeholders/service.svg",
      alt: "Imagem provisória de serviço; fotografia pendente.",
      width: 800,
      height: 600,
    },
  },
  professional: {
    status: "placeholder",
    pending: "Receber retrato de Lorrayne e autorização de uso.",
    value: {
      src: "/images/placeholders/professional.svg",
      alt: "Retrato provisório; fotografia de Lorrayne pendente.",
      width: 600,
      height: 800,
    },
  },
} as const satisfies Record<string, ContentValue<ImageAsset>>;
