import type { Metadata } from "next";
import "./globals.css";
import "./demo.css";
import "./responsive-demo.css";
const title = "Info Trilhas | Blusas Térmicas e Proteção UV 50+";
const description = "Vestuário técnico brasileiro: blusa térmica masculina, roupa térmica para motociclista, segunda pele UV 50+ e proteção para frio extremo.";

export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Info Trilhas",
    locale: "pt_BR",
    images: [{ url: "/opengraph-image.png", alt: "Info Trilhas" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/opengraph-image.png", alt: "Info Trilhas" }],
  },
};
export default function RootLayout({children}:LayoutProps<"/">){return <html lang="pt-BR" className="h-full antialiased" data-scroll-behavior="smooth"><body className="min-h-full flex flex-col">{children}</body></html>}
