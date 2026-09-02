import type { Metadata } from "next";
import "./globals.css";
import "./demo.css";
import "./responsive-demo.css";
export const metadata:Metadata={title:"Info Trilhas | Blusas Térmicas e Proteção UV 50+",description:"Vestuário técnico brasileiro: blusa térmica masculina, roupa térmica para motociclista, segunda pele UV 50+ e proteção para frio extremo."};
export default function RootLayout({children}:LayoutProps<"/">){return <html lang="pt-BR" className="h-full antialiased"><body className="min-h-full flex flex-col">{children}</body></html>}
