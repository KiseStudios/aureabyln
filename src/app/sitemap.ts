import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteOrigin ? [{ url: siteOrigin + "/" }] : [];
}
