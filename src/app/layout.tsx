import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import { AppDataBootstrap } from "@/components/app/AppDataBootstrap";
import { BrandTheme } from "@/components/app/BrandTheme";
import { OrderListProvider } from "@/lib/order-list";
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
  metadataBase: new URL("https://flannagans.vercel.app"),
  title: {
    default: "Flanagans Burguer | Hamburguesas al fuego en Mostoles",
    template: "%s | Flanagans Burguer",
  },
  description:
    "Hamburguesas al fuego en Mostoles con carne sellada, cheddar fundido, pan tostado y carta digital interactiva con videos por plato.",
  applicationName: "Flanagans Burguer",
  keywords: [
    "Flanagans Burguer",
    "hamburgueseria Mostoles",
    "hamburguesas Mostoles",
    "burguer artesanal",
    "carta digital",
    "menu interactivo",
  ],
  authors: [{ name: "Flanagans Burguer" }],
  creator: "Flanagans Burguer",
  publisher: "Flanagans Burguer",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Flanagans Burguer | Hamburguesas al fuego en Mostoles",
    description:
      "Carne sellada, cheddar fundido, pan tostado y una carta visual pensada para elegir con hambre.",
    url: "/",
    type: "website",
    locale: "es_ES",
    siteName: "Flanagans Burguer",
    images: [
      {
        url: "/logo.webp",
        width: 512,
        height: 174,
        alt: "Logo de Flanagans Burguer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flanagans Burguer | Hamburguesas al fuego en Mostoles",
    description: "Carta digital interactiva con videos por plato y hamburguesas hechas al fuego.",
    images: ["/logo.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Flanagans Burguer",
  servesCuisine: "Hamburguesas",
  priceRange: "€€",
  image: "https://flannagans.vercel.app/logo.webp",
  url: "https://flannagans.vercel.app",
  telephone: "+34919401241",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Casiopea, 12",
    addressLocality: "Móstoles",
    addressRegion: "Madrid",
    postalCode: "28938",
    addressCountry: "ES",
  },
  menu: "https://flannagans.vercel.app/menu",
  acceptsReservations: "True",
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
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground selection:bg-primary selection:text-secondary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
        <OrderListProvider>
          <AppDataBootstrap />
          <BrandTheme />
          {children}
        </OrderListProvider>
      </body>
    </html>
  );
}
