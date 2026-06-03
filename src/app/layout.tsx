import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import { AppDataBootstrap } from "@/components/app/AppDataBootstrap";
import { OrderListProvider } from "@/lib/order-list";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flanagans Burguer | Carta Interactiva Premium",
  description: "Disfruta el sabor de una burguer de verdad en Móstoles. Carne de primera calidad, combinaciones brutales y nuestra carta interactiva exclusiva.",
  keywords: ["Flanagans Burguer", "hamburguesería Móstoles", "burguer artesanal", "carta digital", "menú interactivo"],
  authors: [{ name: "Flanagans Burguer" }],
  openGraph: {
    title: "Flanagans Burguer | Carta Interactiva Premium",
    description: "Disfruta el sabor de una burguer de verdad en Móstoles. Carne de primera calidad y combinaciones brutales.",
    type: "website",
    locale: "es_ES",
    siteName: "Flanagans Burguer",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Optimiza la experiencia móvil tipo app al evitar el zoom accidental al hacer tap
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground selection:bg-primary selection:text-secondary flex flex-col font-sans">
        <OrderListProvider>
          <AppDataBootstrap />
          {children}
        </OrderListProvider>

        {/* Google Translate hidden widget — lo usamos solo para el motor de traducción */}
        <div id="google_translate_element" className="sr-only" aria-hidden="true" />

        {/* Init de Google Translate */}
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            window.googleTranslateElementInit = function() {
              new window.google.translate.TranslateElement(
                { pageLanguage: 'es', autoDisplay: false },
                'google_translate_element'
              );
            };
          `}
        </Script>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
