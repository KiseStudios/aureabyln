import { images } from "./images";
import type { Service } from "./types";

/** Exemplo estrutural, não representa um serviço oferecido pelo estúdio. */
export const servicePlaceholder = {
  id: "placeholder-service",
  name: {
    status: "placeholder",
    value: "[Nome do serviço pendente]",
    pending: "Confirmar catálogo e nome com a cliente.",
  },
  description: {
    status: "placeholder",
    value: "[Descrição do serviço pendente]",
    pending: "Receber descrição aprovada pela cliente.",
  },
  image: images.service,
  cta: {
    status: "placeholder",
    value: null,
    pending: "Confirmar texto e destino do agendamento; não renderizar link enquanto nulo.",
  },
} as const satisfies Service;

/** Catálogo real vazio até o recebimento dos serviços aprovados. */
export const services: readonly Service[] = [];
