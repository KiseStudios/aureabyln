import { Container, Section } from "@/components/ui";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { sectionAnchors } from "./anchors";
import styles from "./Contact.module.css";

const instagramUrl = "https://www.instagram.com/aureabyln/";

export function Contact({
  phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
}: {
  phone?: string | null;
}) {
  const whatsappUrl = buildWhatsAppUrl(phone, DEFAULT_WHATSAPP_MESSAGE);

  return (
    <Section id={sectionAnchors.contact} aria-labelledby="contact-title" className={styles.section}>
      <Container>
        <div className={styles.panel}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Contato direto</p>
            <h2 id="contact-title" className={styles.title}>
              Seu momento de cuidado começa aqui.
            </h2>
            <p className={styles.description}>
              Converse com Lorrayne para combinar o seu atendimento.
            </p>
          </div>

          <div className={styles.actions}>
            {whatsappUrl ? (
              <a
                className={styles.whatsapp}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar pelo WhatsApp
                <span aria-hidden="true">↗</span>
              </a>
            ) : (
              <div className={styles.pending} role="status">
                <span className={styles.pendingTitle}>WhatsApp em configuração</span>
                <span>O número oficial será adicionado após confirmação.</span>
              </div>
            )}

            <a
              className={styles.instagram}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Conhecer o Instagram <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className={styles.details}>
            <p>
              <span className={styles.detailLabel}>Localização</span>
              Afonso Cláudio, Espírito Santo
            </p>
            <p className={styles.hours}>
              Horários de atendimento a confirmar.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
