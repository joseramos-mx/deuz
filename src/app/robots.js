import { abs, SITE_URL } from "@/lib/seo";

export default function robots() {
  // Los previews de Vercel no deben indexarse; solo producción.
  const produccion = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return {
    rules: produccion ? { userAgent: "*", allow: "/", disallow: "/api/" } : { userAgent: "*", disallow: "/" },
    sitemap: abs("/sitemap.xml"),
    host: SITE_URL,
  };
}
