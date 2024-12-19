import { Header } from "@/components/layout/header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recordar.me",
  description: "Crie e compartilhe sua história de amor ou amizade",
  openGraph: {
    title: "História de Amor e Amizade",
    description: "Crie e compartilhe sua história de amor ou amizade",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
