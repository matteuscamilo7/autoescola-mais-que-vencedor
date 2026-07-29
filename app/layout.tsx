import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });

const siteUrl = "https://autoescola-mais-que-vencedor.vercel.app";

export const metadata: Metadata = {
  title: "Mais que Vencedor | Aulas de Carro e Moto em Queimados – RJ",
  description: "Aulas práticas de carro, moto, aperfeiçoamento e preparação para exame em Queimados – RJ. Escolha seu plano e agende pelo WhatsApp.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mais que Vencedor | Aulas de Carro e Moto em Queimados – RJ",
    description: "Escolha seu plano de aulas práticas e agende pelo WhatsApp.",
    url: siteUrl,
    siteName: "Autoescola Mais que Vencedor",
    type: "website",
    locale: "pt_BR",
    images: [{ url: `${siteUrl}/images/brand-logo.webp`, width: 1200, height: 427, alt: "Auto Escola Mais que Vencedor" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mais que Vencedor em Queimados – RJ",
    description: "Aulas práticas de carro e moto.",
    images: [`${siteUrl}/images/brand-logo.webp`],
  },
  keywords: ["autoescola em Queimados", "aulas de direção em Queimados", "aulas de carro", "aulas de moto", "reforço exame prático", "autoescola Queimados", "CNH Queimados"],
  other: { "codex-preview": "development" },
};

const gaId = "G-ZFCXF0TE45";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          async
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config','${gaId}');`,
          }}
        />
      </head>
      <body className={`${inter.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
