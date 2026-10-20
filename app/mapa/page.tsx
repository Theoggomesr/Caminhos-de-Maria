
import type { Metadata } from "next";
import Link from "next/link";

import MapaAparicoes from "@/components/MapaAparicoes";
import { listarAparicoesPublicadas } from "@/lib/aparicoes";

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

export default async function Page() {
  const aparicoes = await listarAparicoesPublicadas();

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#14233f]">
      {/* CABEÇALHO */}
      <section className="relative isolate overflow-hidden border-b border-[#c9a46a] bg-[#14233f]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: `
              radial-gradient(
                ellipse at 80% 35%,
                rgba(201,164,106,0.26),
                transparent 45%
              ),
              radial-gradient(
                ellipse at 10% 85%,
                rgba(201,164,106,0.09),
                transparent 45%
              ),
              linear-gradient(
                115deg,
                #101c30 0%,
                #14233f 65%,
                #263954 100%
              )
            `,
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 font-serif text-[160px] leading-none text-[#c9a46a]/10 sm:text-[240px]"
        >
          ✦
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
          <p className="mb-4 font-serif text-sm uppercase tracking-[0.25em] text-[#d5b685]">
            ✦ Caminhos de Maria
          </p>

          <h1 className="max-w-3xl font-serif text-4xl font-medium text-[#f7f0df] sm:text-5xl lg:text-6xl">
            Mapa do Mundo
          </h1>

          <p className="mt-5 max-w-2xl font-serif text-lg leading-8 text-[#e8dcc9] sm:text-xl">
            Explore as aparições de Nossa Senhora pelos
            continentes e descubra os lugares marcados
            pela fé e pela devoção mariana.
          </p>

          <div
            aria-hidden="true"
            className="mt-7 flex items-center gap-3 text-[#d5b685]"
          >
            <span className="h-px w-24 bg-[#c9a46a]" />
            ✦
            <span className="h-px w-24 bg-[#c9a46a]" />
          </div>
        </div>
      </section>

      {/* ÁREA DE CONTEÚDO */}
      <div
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse at 15% 20%,
              rgba(201,164,106,0.12),
              transparent 48%
            ),
            radial-gradient(
              ellipse at 85% 80%,
              rgba(201,164,106,0.12),
              transparent 48%
            ),
            linear-gradient(
              135deg,
              #fbf6e9,
              #f7f0df 55%,
              #f1e5d0
            )
          `,
        }}
      >
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-7 sm:px-10">
          {/* CAMINHO DE NAVEGAÇÃO */}
          <nav
            aria-label="Caminho de navegação"
            className="mb-9 flex items-center gap-3 font-serif text-sm text-[#6b5a42]"
          >
            <Link
              href="/"
              className="transition hover:text-[#14233f]"
            >
              Início
            </Link>

            <span aria-hidden="true">›</span>

            <span aria-current="page" className="text-[#14233f]">
              Mapa do Mundo
            </span>
          </nav>

          {/* MAPA, FILTROS E CARDS */}
          <MapaAparicoes aparicoes={aparicoes} />
        </div>
      </div>
    </main>
  );
}
