import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

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
    url: "https://tusitio.com",
    siteName: "Deuz Constructora",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Deuz Constructora",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Deuz Constructora",
    description: "Obras que trascienden en México.",
    images: ["/og-image.png"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    themeColor: "#E50914",
  },
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="es" className={montserrat.variable}>
      
      <body className="font-sans antialiased overflow-x-clip">{children}
      <Header />
      <Footer />
      </body>
    </html>
  );
}
