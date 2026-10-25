import { contacto, redes } from "@/data/contacto";
import { FUNDACION, estadosConObra } from "@/data/empresa";

// TODO: confirmar dominio de producción (NEXT_PUBLIC_SITE_URL)
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://deuzmx.com").replace(/\/$/, "");
export const abs = (path = "/") => `${SITE_URL}${path}`;

const ORG_ID = abs("/#organizacion");

/** Organization + GeneralContractor (LocalBusiness) para todo el sitio. */
export function schemaOrganizacion() {
  const direccion = {
    "@type": "PostalAddress",
    addressLocality: "Durango",
    addressRegion: "Durango",
    addressCountry: "MX",
    ...(contacto.direccion && { streetAddress: contacto.direccion }),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: "DEUZ Grupo Empresarial",
        url: abs("/"),
        logo: abs("/fav/android-chrome-512x512.png"),
        description: "Grupo constructor de obras llave en mano con insumos, maquinaria y personal propios.",
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: 500 },
        ...(FUNDACION && { foundingDate: String(FUNDACION) }),
        ...(redes.length && { sameAs: redes.map((r) => r.href) }),
        address: direccion,
      },
      {
        "@type": "GeneralContractor",
        "@id": abs("/#contratista"),
        name: "DEUZ Grupo Empresarial",
        url: abs("/"),
        image: abs("/opengraph-image"),
        parentOrganization: { "@id": ORG_ID },
        address: direccion,
        areaServed: estadosConObra.map((e) => ({ "@type": "State", name: e.nombre })),
        ...(contacto.telefono && { telephone: contacto.telefono }),
        ...(contacto.correo && { email: contacto.correo }),
      },
    ],
  };
}

export function schemaProyecto(p) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": abs(`/proyectos/${p.slug}#proyecto`),
    name: p.titulo,
    description: p.resumen,
    url: abs(`/proyectos/${p.slug}`),
    image: p.imagenes.map((i) => abs(i)),
    creator: { "@id": ORG_ID },
    locationCreated: { "@type": "Place", address: { "@type": "PostalAddress", addressRegion: p.estado, addressCountry: "MX" } },
    keywords: p.etiquetas.join(", "),
    ...(p.anio && { dateCreated: String(p.anio) }),
  };
}

export function schemaFaq(faq) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.p, acceptedAnswer: { "@type": "Answer", text: f.r } })),
  };
}

export function schemaMigas(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}
