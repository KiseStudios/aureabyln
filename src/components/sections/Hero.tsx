import localFont from "next/font/local";
import Image from "next/image";
import { professional, type ProfessionalProfile } from "@/content";
import { Button, Container, Section } from "@/components/ui";
import { sectionAnchors } from "./anchors";
import styles from "./Hero.module.css";

const display = localFont({
  src: [
    { path: "./fonts/instrument-serif-latin-400-normal.woff2", style: "normal", weight: "400" },
    { path: "./fonts/instrument-serif-latin-400-italic.woff2", style: "italic", weight: "400" },
  ],
  fallback: ["Georgia", "serif"],
});

const body = localFont({ src: "./fonts/dm-sans-latin-400-normal.woff2", fallback: ["system-ui"] });

export function Hero({ profile = professional }: { profile?: ProfessionalProfile }) {
  const portrait = profile.image;
  return (
    <Section id={sectionAnchors.hero} aria-labelledby="hero-title" className={`${styles.hero} ${body.className}`}>
      <Container className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex min-w-0 flex-col items-start gap-6">
          <h1 id="hero-title" className={`${styles.title} ${display.className}`}>
            Áurea <em className={styles.accent}>Beauty Studio</em>
          </h1>
          {profile.positioning.status === "approved" && <p>{profile.positioning.value}</p>}
          <p id="booking-status">O agendamento pelo site ainda está indisponível.</p>
          <Button disabled aria-describedby="booking-status" className={styles.booking}>
            Agendar horário
          </Button>
        </div>
        <figure className="min-w-0">
          <div className={styles.media}>
            {portrait.status === "approved" ? (
              <Image
                src={portrait.value.src}
                alt={portrait.value.alt}
                fill
                sizes="(min-width: 1440px) 600px, (min-width: 1280px) calc(50vw - 120px), (min-width: 768px) calc(50vw - 72px), calc(100vw - 48px)"
                className="object-cover"
                preload
              />
            ) : (
              <span aria-hidden="true" className={`${styles.study} ${display.className}`}>Á</span>
            )}
          </div>
          {portrait.status === "placeholder" && (
            <figcaption className="mt-2 text-sm">Estudo gráfico provisório · retrato da profissional pendente.</figcaption>
          )}
        </figure>
      </Container>
    </Section>
  );
}
