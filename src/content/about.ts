import { images } from "./images";
import type { ProfessionalProfile } from "./types";

export const professional = {
  name: {
    status: "placeholder",
    value: "Lorrayne Nunes",
    pending: "Nome registrado no README; confirmar forma pública com a cliente.",
  },
  biography: {
    status: "placeholder",
    value: "[Biografia pendente]",
    pending: "Receber biografia aprovada sem presumir formação ou experiência.",
  },
  positioning: {
    status: "placeholder",
    value: "[Texto de posicionamento pendente]",
    pending: "Receber texto aprovado pela cliente.",
  },
  image: images.professional,
} as const satisfies ProfessionalProfile;
