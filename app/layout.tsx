import type { Metadata } from "next";
import "./globals.css";
import "./demo.css";
import "./responsive-demo.css";

export const metadata: Metadata = {
  title: "Info Trilhas | Proteção UV 50+ e Conforto Térmico",
  description: "Vestuário tecnológico com proteção UV 50+ e conforto térmico para motociclismo, ciclismo, corrida e aventuras outdoor.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
