import { imageSlots, type ContentValue, type ImageAsset } from "@/content";
import { Container, Section } from "@/components/ui";
import { sectionAnchors } from "./anchors";
import { GalleryLightbox, type GalleryImage } from "./GalleryLightbox";
import styles from "./Gallery.module.css";

export interface GalleryEntry {
  readonly id: string;
  readonly image: ContentValue<ImageAsset>;
}

const galleryEntries: readonly GalleryEntry[] = imageSlots.gallery.map((image, index) => ({
  id: `gallery-${index + 1}`,
  image,
}));

function approvedGallery(entries: readonly GalleryEntry[]): GalleryImage[] {
  return entries.flatMap(({ id, image }) => {
    if (image.status !== "approved" || !image.approvalReference.trim()) return [];
    return [{ id, image: image.value }];
  });
}

export function Gallery({ items = galleryEntries }: { items?: readonly GalleryEntry[] }) {
  const images = approvedGallery(items);

  return (
    <Section id={sectionAnchors.gallery} aria-labelledby="gallery-title" className={styles.section}>
      <Container>
        <h2 id="gallery-title" className={styles.title}>
          Resultados que valorizam sua beleza.
        </h2>
        {images.length > 0 ? (
          <GalleryLightbox images={images} />
        ) : (
          <div className={styles.empty}>
            <p className={styles.status}>Resultados em curadoria</p>
            <p className={styles.note}>
              Os trabalhos serão apresentados após o recebimento das imagens finais e das autorizações de uso.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
