
import type { Metadata } from "next";

import LinhaDoTempo from "@/components/LinhaDoTempo";
import { listarAparicoesPublicadas } from "@/lib/aparicoes";

// ======================================================
// SEO DA PÁGINA LINHA DO TEMPO
// ======================================================

const titulo = "Linha do Tempo das Aparições de Nossa Senhora";

const descricao =
  "Explore a linha do tempo das aparições de Nossa Senhora. " +
  "Conheça a história das aparições marianas em ordem " +
  "cronológica, seus locais e acontecimentos.";

export const metadata: Metadata = {
  title: titulo,

  description: descricao,

  alternates: {
    canonical: "/linha-do-tempo",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Caminhos de Maria",
    title: `${titulo} | Caminhos de Maria`,
    description: descricao,
    url: "/linha-do-tempo",
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
// PÁGINA LINHA DO TEMPO
// ======================================================

export default async function Page() {
  // Busca as aparições publicadas no Supabase
  const aparicoes = await listarAparicoesPublicadas();

  // Mantém apenas aparições com ano cadastrado
  // e organiza em ordem cronológica
  const aparicoesOrdenadas = aparicoes
    .filter((a) => a.ano !== null)
    .sort((a, b) => (a.ano ?? 0) - (b.ano ?? 0));

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold">
        Linha do tempo
      </h1>

      <p className="mb-10 mt-2 text-stone-600">
        As aparições marianas em ordem cronológica.
      </p>

      <LinhaDoTempo aparicoes={aparicoesOrdenadas} />
    </main>
  );
}
