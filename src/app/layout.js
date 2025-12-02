import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

// 1. Movemos la configuración del viewport aquí afuera
export const viewport = {
  themeColor: "#000000", // Esto pinta la barra de direcciones (arriba)
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  // Opcional: Para iOS web apps (PWA)
  colorScheme: "dark", 
};

export const metadata = {
  title: {
    default: "DEUZ | Grupo Empresarial",
    template: "%s | Deuz Constructora",
  },
  description: "Obras que trascienden. Grupo empresarial en Durango y México.",
  icons: {
    icon: "/fav/favicon.ico",
    shortcut: "/fav/favicon-16x16.png",
    apple: "/fav/apple-touch-icon.png",
  },
  openGraph: {
    title: "Deuz Constructora",
    description: "Obras que trascienden en México.",
    url: "https://deuzmx.com",
    siteName: "Deuz Grupo Empresarial",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Deuz Grupo Empresarial",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grupo Empresarial",
    description: "Obras que trascienden en México.",
    images: ["/og-image.png"],
  },
  // Ya no va viewport aquí dentro
};

export default function RootLayout({ children }) {
  return (
    // 2. Agregamos 'bg-black' a <html> también. 
    // Esto asegura que el "overscroll" (cuando estiras la pagina) sea negro y no blanco.
    <html lang="es" className={`${montserrat.variable} bg-black`}>
      
      {/* Nota: Usualmente el Header va ANTES de children. 
         Si lo tenías abajo intencionalmente (ej. fixed bottom), déjalo así. 
         Si no, muévelo arriba de {children}.
      */}
      <body className="font-sans antialiased overflow-x-clip bg-black text-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}