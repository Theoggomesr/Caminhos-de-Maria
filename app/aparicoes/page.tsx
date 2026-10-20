
import type { Metadata } from "next";
import Link from "next/link";

import { listarAparicoesPublicadas } from "@/lib/aparicoes";
import CatalogoAparicoes from "@/components/aparicoes/CatalogoAparicoes";
import Divisor from "@/components/Divisor";

export const dynamic = "force-dynamic";

// ======================================================
// SEO DA PÁGINA DE APARIÇÕES
// ======================================================

const titulo = "Aparições de Nossa Senhora";

const descricao =
  "Conheça as aparições de Nossa Senhora pelo mundo. " +
  "Explore histórias, mensagens, videntes, santuários " +
  "e acontecimentos relacionados às aparições marianas.";

export const metadata: Metadata = {
  title: titulo,

  description: descricao,

  alternates: {
    canonical: "/aparicoes",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Caminhos de Maria",
    title: `${titulo} | Caminhos de Maria`,
    description: descricao,
    url: "/aparicoes",
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
// PÁGINA DE APARIÇÕES
// ======================================================

export default async function PaginaAparicoes() {
  // Busca somente as aparições publicadas no Supabase
  const aparicoes = await listarAparicoesPublicadas();

  return (
    <main className="min-h-screen bg-[#f7f3e9]">
      {/* CABEÇALHO DA PÁGINA */}
      <section className="px-6 pb-10 pt-16 text-center">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-serif text-4xl font-bold text-[#a97c2f] md:text-5xl">
            Aparições de Nossa Senhora
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#14233f]/70">
            Conheça as histórias, mensagens e acontecimentos
            relacionados às aparições marianas ao redor do mundo.
          </p>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <CatalogoAparicoes aparicoes={aparicoes} />
      </section>

      <Divisor />

      {/* RODAPÉ DA PÁGINA */}
      <section className="px-6 py-10 text-center">
        <p className="font-serif text-lg text-[#14233f]">
          &quot;Fazei tudo o que Ele vos disser.&quot;
        </p>

        <p className="mt-2 text-sm text-[#14233f]/60">
          João 2,5
        </p>

        <Link
          href="/"
          className="mt-6 inline-block text-sm font-semibold text-[#98723e] transition hover:text-[#14233f]"
        >
          ← Voltar à página inicial
        </Link>
      </section>
    </main>
  );
}
