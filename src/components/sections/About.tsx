import Image from "next/image";
import { professional, type ContentValue, type ProfessionalProfile } from "@/content";
import { Container, Section } from "@/components/ui";
import { sectionAnchors } from "./anchors";
import styles from "./About.module.css";

function approved<T>(field: ContentValue<T>): T | undefined {
  if (field.status !== "approved" || !field.approvalReference.trim()) return undefined;
  return field.value;
}

export function About({ profile = professional }: { profile?: ProfessionalProfile }) {
  const name = approved(profile.name)?.trim();
  const positioning = approved(profile.positioning)?.trim();
  const biography = approved(profile.biography)?.trim();
  const portrait = approved(profile.image);
  const copyPending = !name || !positioning || !biography;
  const hasCopy = Boolean(name || positioning || biography);

  return (
    <Section id={sectionAnchors.about} aria-labelledby="about-title" className={styles.section}>
      <Container>
        <div className={styles.layout}>
          <h2 id="about-title" className={styles.title}>
            Por trás de cada detalhe.
          </h2>

          <figure className={styles.media}>
            {portrait ? (
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                sizes="(min-width: 768px) 44vw, calc(100vw - 3rem)"
                className={styles.image}
              />
            ) : (
              <div className={styles.portraitPlaceholder} aria-hidden="true">
                <span>Retrato profissional</span>
                <small>Material aprovado pendente</small>
              </div>
            )}
            {!portrait && (
              <figcaption className={styles.caption}>
                A fotografia será exibida após o recebimento e a autorização de uso.
              </figcaption>
            )}
          </figure>

          <div className={styles.copy}>
            {name && <h3 className={styles.name}>{name}</h3>}
            {positioning && <p className={styles.positioning}>{positioning}</p>}
            {biography && <p className={styles.biography}>{biography}</p>}
            {copyPending && (
              <p className={styles.pending} role="status">
                {hasCopy
                  ? "As informações complementares serão exibidas após validação."
                  : "Apresentação em curadoria. O texto será exibido após aprovação."}
              </p>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
