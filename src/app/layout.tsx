import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Condomínio Vagas",
  description: "Escolha de vagas ao vivo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
