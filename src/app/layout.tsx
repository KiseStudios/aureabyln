import type { Metadata } from "next";
import { siteOrigin } from "@/lib/seo";
import type { ReactNode } from "react";
import "@/app/globals.css";

const title = "Áurea Beauty Studio";
const description = "Conheça o estúdio Áurea, sua apresentação, serviços, resultados e canais de contato.";

export const metadata: Metadata = {
  title,
  description,
  robots: { index: Boolean(siteOrigin), follow: Boolean(siteOrigin) },
  alternates: siteOrigin ? { canonical: siteOrigin + "/" } : undefined,
  openGraph: {
    title, description, siteName: title, locale: "pt_BR", type: "website",
    url: siteOrigin,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
