import { approvedValue } from "@/content/approved";
import { Container, Section, Card } from "@/components/ui";
import { services, type Service } from "@/content";
import { sectionAnchors } from "./anchors";
import styles from "./Services.module.css";


function serviceLink(cta: Service["cta"]) {
  const action = approvedValue(cta);
  const href = action?.href.trim();
  if (!action?.label.trim() || !href || href === "#") return;
  if (/^(?:\/(?!\/)|#)/.test(href) || (/^https?:\/\//i.test(href) && URL.canParse(href))) {
    return { href, label: action.label };
  }
}

export function Services({ catalog = services }: { catalog?: readonly Service[] }) {
  const entries = catalog.flatMap((service) => {
    const title = approvedValue(service.name)?.trim();
    return title ? [{ service, title }] : [];
  });

  return (
    <Section id={sectionAnchors.services} aria-labelledby="services-title" className={styles.section}>
      <Container>
        <h2 id="services-title" className={styles.title}>Serviços</h2>
        {entries.length === 0 ? (
          <div className={styles.empty}>
            <p className={styles.status}>Catálogo em curadoria</p>
            <p className={styles.note}>Espaço para os serviços aprovados.</p>
          </div>
        ) : (
          <ul className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {entries.map(({ service, title }) => {
              const action = serviceLink(service.cta);
              const description = approvedValue(service.description);
              return (
                <li key={service.id} className="min-w-0 wrap-anywhere">
                  <Card
                    title={title}
                    image={approvedValue(service.image)}
                    href={action?.href}
                    description={
                      (description || action) && <>
                        {description && <p>{description}</p>}
                        {action && <span className="mt-2 block underline">{action.label}</span>}
                      </>
                    }
                  />
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </Section>
  );
}
