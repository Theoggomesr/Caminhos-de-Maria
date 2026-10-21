
import type { Metadata } from "next";
import Link from "next/link";

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
// ORNAMENTO DOURADO DO CABEÇALHO
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
// PÁGINA LINHA DO TEMPO
// ======================================================

export default async function Page() {
  // Busca somente as aparições publicadas no Supabase
  const aparicoes = await listarAparicoesPublicadas();

  // Mantém apenas aparições com ano válido
  // e organiza em ordem cronológica
  const aparicoesOrdenadas = aparicoes
    .filter(
      (aparicao) =>
        typeof aparicao.ano === "number" &&
        Number.isFinite(aparicao.ano)
    )
    .sort(
      (a, b) =>
        (a.ano ?? 0) - (b.ano ?? 0)
    );

  return (
    <main className="min-h-screen text-[#14233f]">

      {/* ================================================= */}
      {/* 1. CABEÇALHO EM ESTILO PERGAMINHO */}
      {/* ================================================= */}

      <section className="relative isolate min-h-97.5 overflow-hidden border-b border-[#c9a46a]/40 bg-[#f7f0df]">

        {/* IMAGEM DE NOSSA SENHORA AO FUNDO */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            -z-10
            bg-[#14233f]
            bg-[url('/imagens/background-footer.png')]
            bg-cover
            bg-right
            bg-no-repeat
          "
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

        {/* CAMADA CLARA PARA MELHOR LEITURA NO CELULAR */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[#f7f0df]/75 lg:hidden"
        />

        {/* CONTEÚDO DO CABEÇALHO */}
        <div className="relative mx-auto flex min-h-97.5 max-w-7xl items-center px-6 py-16 sm:px-10 lg:py-20">

          <div className="w-full max-w-165">

            {/* IDENTIFICAÇÃO */}
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
              Linha do Tempo
            </h1>

            {/* SEPARADOR DOURADO */}
            <div className="mt-6 max-w-[320px]">
              <Separador />
            </div>

            {/* DESCRIÇÃO */}
            <p className="mt-6 max-w-xl font-serif text-lg leading-8 text-[#594936] sm:text-xl">
              Conheça a história das aparições de Nossa Senhora
              ao longo dos séculos e descubra os acontecimentos
              que marcaram diferentes épocas e lugares do mundo.
            </p>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 2. CONTEÚDO — FUNDO DEFINIDO NO GLOBALS.CSS */}
      {/* ================================================= */}

      <div className="relative">

        <div className="mx-auto max-w-7xl px-6 pb-20 pt-7 sm:px-10">

          {/* CAMINHO DE NAVEGAÇÃO */}
          <nav
            aria-label="Caminho de navegação"
            className="mb-10 flex flex-wrap items-center gap-3 font-serif text-sm text-[#6b5a42]"
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
              className="text-[#14233f]"
            >
              Linha do Tempo
            </span>
          </nav>

          {/* LINHA DO TEMPO COM FILTROS E APARIÇÕES */}
          <LinhaDoTempo aparicoes={aparicoesOrdenadas} />

          {/* ORNAMENTO FINAL */}
          <div
            aria-hidden="true"
            className="mt-16 flex items-center justify-center gap-4 text-[#b28b49]"
          >
            <span className="h-px w-20 bg-[#b28b49]/60 sm:w-40" />

            <span className="font-serif text-3xl">
              ✦
            </span>

            <span className="h-px w-20 bg-[#b28b49]/60 sm:w-40" />
          </div>

          {/* MENSAGEM FINAL */}
          <p className="mx-auto mt-5 max-w-2xl text-center font-serif text-base italic leading-7 text-[#765728]">
            Uma jornada pela história, pela fé e pela devoção
            a Nossa Senhora.
          </p>

        </div>
      </div>
    </main>
  );
}
