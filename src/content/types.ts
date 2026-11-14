/** Conteúdo aprovado exige referência de aceite; placeholders não são publicáveis. */
export type ContentValue<T> =
  | { readonly status: "placeholder"; readonly value: T; readonly pending: string }
  | { readonly status: "approved"; readonly value: T; readonly approvalReference: string };

export interface ImageAsset {
  readonly src: `/images/${string}`;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

export interface Service {
  readonly id: string;
  readonly name: ContentValue<string>;
  readonly description: ContentValue<string>;
  readonly image: ContentValue<ImageAsset>;
  /** null até existir destino de agendamento aprovado. */
  readonly cta: ContentValue<{ readonly label: string; readonly href: string } | null>;
}

export interface ProfessionalProfile {
  readonly name: ContentValue<string>;
  readonly biography: ContentValue<string>;
  readonly positioning: ContentValue<string>;
  readonly image: ContentValue<ImageAsset>;
}
