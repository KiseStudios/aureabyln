"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { ImageAsset } from "@/content";
import styles from "./Gallery.module.css";

export interface GalleryImage {
  readonly id: string;
  readonly image: ImageAsset;
}

export function GalleryLightbox({ images }: { images: readonly GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeIndex !== null && !dialog.open) {
      dialog.showModal();
    } else if (activeIndex === null && dialog.open) {
      dialog.close();
    }
  }, [activeIndex]);

  function moveImage(offset: number) {
    setActiveIndex((current) => {
      if (current === null || images.length < 2) return current;
      return (current + offset + images.length) % images.length;
    });
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key === "ArrowRight" && images.length > 1) {
      event.preventDefault();
      moveImage(1);
    }
    if (event.key === "ArrowLeft" && images.length > 1) {
      event.preventDefault();
      moveImage(-1);
    }
  }

  const activeImage = activeIndex === null ? undefined : images[activeIndex];

  return (
    <>
      <div className={styles.grid}>
        {images.map(({ id, image }, index) => (
          <button
            key={id}
            type="button"
            className={styles.thumbnail}
            onClick={() => setActiveIndex(index)}
            aria-haspopup="dialog"
            aria-label={`Ampliar imagem ${index + 1}: ${image.alt}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(max-width: 767px) 42vw, (max-width: 1279px) 30vw, 25vw"
              className={styles.thumbnailImage}
            />
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label="Visualização dos resultados"
        onCancel={(event) => {
          event.preventDefault();
          setActiveIndex(null);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setActiveIndex(null);
        }}
        onKeyDown={handleDialogKeyDown}
      >
        {activeImage && activeIndex !== null && (
          <div className={styles.dialogContent}>
            <div className={styles.dialogTopbar}>
              <p className={styles.counter} aria-live="polite">
                {activeIndex + 1} de {images.length}
              </p>
              <button
                type="button"
                className={styles.dialogButton}
                autoFocus
                onClick={() => setActiveIndex(null)}
              >
                Fechar
              </button>
            </div>

            <figure className={styles.figure}>
              <Image
                src={activeImage.image.src}
                alt={activeImage.image.alt}
                width={activeImage.image.width}
                height={activeImage.image.height}
                sizes="(max-width: 767px) 92vw, 80vw"
                className={styles.expandedImage}
              />
              <figcaption className={styles.caption}>{activeImage.image.alt}</figcaption>
            </figure>

            {images.length > 1 && (
              <div className={styles.dialogControls}>
                <button
                  type="button"
                  className={styles.dialogButton}
                  onClick={() => moveImage(-1)}
                  aria-label="Ver resultado anterior"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  className={styles.dialogButton}
                  onClick={() => moveImage(1)}
                  aria-label="Ver próximo resultado"
                >
                  Próximo
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
