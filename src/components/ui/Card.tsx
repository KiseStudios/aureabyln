import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { ImageAsset } from "@/content/types";

export interface CardProps {
  title: string;
  description?: ReactNode;
  eyebrow?: string;
  image?: ImageAsset;
  href?: string;
  className?: string;
}

/**
 * Card de conteúdo reutilizável.
 * Não inventa destinos: sem href, o conteúdo é apresentado como artigo estático.
 */
export function Card({
  title,
  description,
  eyebrow,
  image,
  href,
  className = "",
}: CardProps) {
  const content = (
    <>
      {image ? (
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="h-full w-full object-cover"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-5">
        {eyebrow ? (
          <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="text-xl font-semibold text-neutral-950">{title}</h3>
        {description ? (
          <div className="text-sm leading-6 text-neutral-700">{description}</div>
        ) : null}
      </div>
    </>
  );

  const classes = [
    "flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white",
    "transition-colors",
    href
      ? "hover:border-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href?.trim()) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <article className={classes}>{content}</article>;
}
