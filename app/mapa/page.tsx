
import type { Metadata } from "next";

import MapaAparicoes from "@/components/MapaAparicoes";
import { listarAparicoesPublicadas } from "@/lib/aparicoes";

// ======================================================
// SEO DA PÁGINA MAPA DAS APARIÇÕES
// ======================================================

const titulo = "Mapa das Aparições de Nossa Senhora";

const descricao =
  "Explore o mapa das aparições de Nossa Senhora pelo mundo. " +
  "Descubra onde ocorreram as aparições marianas, conheça " +
  "suas histórias, localizações e acontecimentos.";

export const metadata: Metadata = {
  title: titulo,

  description: descricao,

  alternates: {
    canonical: "/mapa",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Caminhos de Maria",
    title: `${titulo} | Caminhos de Maria`,
    description: descricao,
    url: "/mapa",
  },

  twitter: {
    card: "summary",
    title: `${titulo} | Caminhos de Maria`,
    description: descricao,
  },

  robots: {
    index: true,
    follow: true,
  },
};

// ======================================================
// PÁGINA MAPA DAS APARIÇÕES
// ======================================================

export default async function Page() {
  // Busca as aparições publicadas no Supabase
  const aparicoes = await listarAparicoesPublicadas();

  // Mantém apenas aparições com coordenadas cadastradas
  const aparicoesComCoordenadas = aparicoes.filter(
    (a) =>
      a.latitude !== null &&
      a.longitude !== null
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold">
        Mapa das aparições
      </h1>

      <p className="mt-2 text-stone-600">
        Clique em um pino para conhecer a aparição.
      </p>

      <div className="mt-6">
        <MapaAparicoes aparicoes={aparicoesComCoordenadas} />
      </div>
    </main>
  );
}
