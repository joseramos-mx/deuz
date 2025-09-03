import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = {
  title: "DEUZ",
  description: "Grupo constructor",
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="es" className={montserrat.variable}>
      
      <body className="font-sans antialiased">{children}
      <Header />
      <Footer />
      </body>
    </html>
  );
}
