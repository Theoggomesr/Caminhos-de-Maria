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


export const metadata: Metadata = {
  title: "Aparições Marianas",
  description: "Aparições de Nossa Senhora ao redor do mundo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body  className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-stone-50 text-stone-800 antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}