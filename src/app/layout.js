import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, schemaOrganizacion } from "@/lib/seo";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Sin maximumScale: bloquearlo impide el zoom (accesibilidad).
export const viewport = {
  themeColor: "#0A0A0A",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const title = "DEUZ Grupo Empresarial | Obras llave en mano en México";
const description =
  "Construcción llave en mano con insumos, maquinaria y personal propios. Infraestructura, naves industriales, vivienda y energía desde Durango para todo México.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | DEUZ Grupo Empresarial",
  },
  description,
  icons: {
    icon: "/fav/favicon.ico",
    shortcut: "/fav/favicon-16x16.png",
    apple: "/fav/apple-touch-icon.png",
  },
  // La imagen OG se genera en app/opengraph-image.js
  openGraph: {
    title,
    description,
    siteName: "DEUZ Grupo Empresarial",
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }) {
  return (
    // bg en <html> para que el overscroll también sea oscuro
    <html lang="es" className={`${dmSans.variable} ${jetbrainsMono.variable} bg-deuz-bg`}>
      <body className="font-sans antialiased overflow-x-clip bg-deuz-bg text-white">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-deuz-red focus:px-4 focus:py-2 focus:text-white"
        >
          Saltar al contenido
        </a>
        <JsonLd data={schemaOrganizacion()} />
        <Header />
        <div id="contenido" tabIndex={-1} className="outline-none">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
