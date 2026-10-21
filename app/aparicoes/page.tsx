
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
// SEPARADOR DOURADO
// ======================================================

function Separador() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-3 text-[#b28b49]"
    >
      <span className="h-px flex-1 bg-[#b28b49]/60" />

      <svg
        viewBox="0 0 40 40"
        className="h-6 w-6 shrink-0"
        fill="currentColor"
      >
        <path d="M20 2C22 12 28 18 38 20C28 22 22 28 20 38C18 28 12 22 2 20C12 18 18 12 20 2Z" />

        <circle
          cx="20"
          cy="20"
          r="4"
          fill="#f7f0df"
        />
      </svg>

      <span className="h-px flex-1 bg-[#b28b49]/60" />
    </div>
  );
}

// ======================================================
// PÁGINA DE APARIÇÕES
// ======================================================

export default async function PaginaAparicoes() {
  // Busca apenas aparições publicadas no Supabase
  const aparicoes = await listarAparicoesPublicadas();

  return (
    <main className="min-h-screen text-[#14233f]">

      {/* ============================================== */}
      {/* 1. CABEÇALHO MEDIEVAL */}
      {/* ============================================== */}

      <section className="relative isolate min-h-97.5 overflow-hidden border-b border-[#c9a46a]/40 bg-[#f7f0df]">

        {/* IMAGEM DE NOSSA SENHORA AO FUNDO */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[#14233f] bg-[url('/imagens/background-footer.png')] bg-cover bg-right bg-no-repeat"
        />

        {/* DEGRADÊ DO PERGAMINHO PARA A ILUSTRAÇÃO */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                #fbf6e9 0%,
                #f7f0df 30%,
                rgba(247,240,223,0.97) 44%,
                rgba(247,240,223,0.76) 58%,
                rgba(247,240,223,0.25) 78%,
                rgba(247,240,223,0) 100%
              )
            `,
          }}
        />

        {/* CAMADA PARA LEGIBILIDADE NO CELULAR */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[#f7f0df]/75 lg:hidden"
        />

        {/* CONTEÚDO DO CABEÇALHO */}
        <div className="relative mx-auto flex min-h-97.5 max-w-7xl items-center px-6 py-16 sm:px-10 lg:py-20">

          <div className="w-full max-w-165">

            {/* IDENTIFICAÇÃO DO SITE */}
            <div className="mb-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="font-serif text-4xl leading-none text-[#ad813e]"
              >
                ⚜
              </span>

              <span className="font-serif text-sm uppercase tracking-[0.25em] text-[#a97c2f]">
                Caminhos de Maria
              </span>
            </div>

            {/* TÍTULO */}
            <h1 className="font-serif text-5xl font-medium leading-tight text-[#14233f] sm:text-6xl lg:text-7xl">
              Aparições
            </h1>

            {/* ORNAMENTO */}
            <div className="mt-6 max-w-[320px]">
              <Separador />
            </div>

            {/* DESCRIÇÃO */}
            <p className="mt-6 max-w-xl font-serif text-lg leading-8 text-[#594936] sm:text-xl">
              Conheça os relatos das aparições de Nossa
              Senhora, seus contextos históricos, mensagens
              e o legado de fé que permanece até hoje.
            </p>

          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* 2. CATÁLOGO — FUNDO DO GLOBALS.CSS */}
      {/* ============================================== */}

      <div className="relative">

        <div className="mx-auto max-w-7xl px-6 pb-16 pt-7 sm:px-10">

          {/* CAMINHO DE NAVEGAÇÃO */}
          <nav
            aria-label="Caminho de navegação"
            className="mb-9 flex flex-wrap items-center gap-3 font-serif text-sm text-[#6b5a42]"
          >
            <Link
              href="/"
              className="transition hover:text-[#14233f]"
            >
              Início
            </Link>

            <span aria-hidden="true">
              ›
            </span>

            <span
              aria-current="page"
              className="font-semibold text-[#14233f]"
            >
              Aparições
            </span>
          </nav>

          {/* CATÁLOGO INTERATIVO */}
          <CatalogoAparicoes aparicoes={aparicoes} />

        </div>
      </div>

      {/* ============================================== */}
      {/* 3. MENSAGEM FINAL — FUNDO DO GLOBALS.CSS */}
      {/* ============================================== */}

      <div>
        <Divisor />

        <section className="px-6 pb-12 pt-7 text-center">

          <p className="font-serif text-xl italic text-[#765728]">
            “Fazei tudo o que Ele vos disser.”
          </p>

          <p className="mt-2 text-sm text-[#a97c2f]">
            João 2,5
          </p>

          <Link
            href="/"
            className="mt-7 inline-block text-sm font-semibold text-[#98723e] transition hover:text-[#14233f]"
          >
            ← Voltar à página inicial
          </Link>

        </section>
      </div>

    </main>
  );
}
