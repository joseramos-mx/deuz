import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
  // TODO: confirmar dominio de producción
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://deuzmx.com"),
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
    url: "/",
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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
