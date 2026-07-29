import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Mais que Vencedor | Aulas de Carro e Moto em Queimados – RJ",
  description: "Aulas práticas de carro, moto, aperfeiçoamento e preparação para exame em Queimados – RJ. Escolha seu plano e agende pelo WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mais que Vencedor | Aulas de Carro e Moto em Queimados – RJ",
    description: "Escolha seu plano de aulas práticas e agende pelo WhatsApp.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: { card: "summary_large_image", title: "Mais que Vencedor em Queimados – RJ", description: "Aulas práticas de carro e moto." },
  keywords: ["autoescola em Queimados", "aulas de direção em Queimados", "aulas de carro", "aulas de moto", "reforço exame prático"],
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${inter.variable} ${manrope.variable}`}>{children}</body></html>;
}
