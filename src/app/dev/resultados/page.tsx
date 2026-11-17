import { notFound } from "next/navigation";
import { imageSlots, type ContentValue, type ImageAsset } from "@/content";
import { Gallery, type GalleryEntry } from "@/components/sections/Gallery";

function sample(image: ImageAsset): ContentValue<ImageAsset> {
  return {
    status: "approved",
    value: image,
    approvalReference: "Amostra técnica local — não é resultado publicado",
  };
}

const previewItems: readonly GalleryEntry[] = imageSlots.gallery.map((slot, index) => ({
  id: `preview-${index + 1}`,
  image: sample(slot.value),
}));

export default function GalleryPreview() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <main>
      <header className="space-y-2 p-6">
        <h1 tabIndex={-1} className="text-xl font-semibold">Prévia local de Resultados</h1>
        <p className="max-w-2xl text-sm">
          Os quadros são placeholders de desenvolvimento. Não representam trabalhos da Áurea e não são
          publicados na galeria real.
        </p>
      </header>
      <Gallery items={previewItems} />
    </main>
  );
}
