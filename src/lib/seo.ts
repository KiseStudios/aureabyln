// Somente a configuração explícita do build de publicação libera a indexação.
function publicOrigin(): string | undefined {
  if (process.env.NODE_ENV !== "production" || process.env.ENABLE_INDEXING !== "true") return;
  const value = process.env.SITE_URL?.trim();
  if (!value || !URL.canParse(value)) return;
  const url = new URL(value);
  if (url.protocol === "https:" && url.href === url.origin + "/") return url.origin;
}

export const siteOrigin = publicOrigin();
