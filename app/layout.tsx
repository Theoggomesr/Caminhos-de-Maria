
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  .replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,

  applicationName: "Caminhos de Maria",

  title: {
    default: "Aparições de Nossa Senhora | Caminhos de Maria",
    template: "%s | Caminhos de Maria",
  },

  description:
    "Conheça a história das aparições de Nossa Senhora pelo mundo, suas mensagens, videntes, santuários e uma linha do tempo das aparições marianas.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Caminhos de Maria",
    title: "Aparições de Nossa Senhora | Caminhos de Maria",
    description:
      "Explore histórias, mensagens e santuários relacionados às aparições de Nossa Senhora.",
    url: "/",
  },

  robots: {
    index: true,
    follow: true,
  },
};

// Dados estruturados globais para mecanismos de busca
const dadosEstruturados = siteUrl
  ? {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: "Caminhos de Maria",
          url: `${siteUrl}/`,
          inLanguage: "pt-BR",
          description:
            "Um espaço dedicado à história, à fé e às mensagens das aparições de Nossa Senhora pelo mundo.",
          publisher: {
            "@id": `${siteUrl}/#organization`,
          },
        },
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "Caminhos de Maria",
          url: `${siteUrl}/`,
          description:
            "Projeto dedicado à divulgação de informações sobre as aparições marianas, suas histórias, mensagens e santuários.",
        },
      ],
    }
  : null;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-stone-50 text-stone-800 antialiased`}
      >
        {dadosEstruturados && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(dadosEstruturados).replace(
                /</g,
                "\\u003c"
              ),
            }}
          />
        )}

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
