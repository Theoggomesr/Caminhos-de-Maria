
import type { Metadata } from "next";
import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import BuscaAparicao from "@/components/BuscaAparicao";
import CardAparicaoDestaque from "@/components/CardAparicaoDestaque";
import LinhaDoTempoResumo from "@/components/LinhaDoTempoResumo";
import CarrosselCuriosidades from "@/components/CarrosselCuriosidades";
import Divisor from "@/components/Divisor";

import {
  listarAparicoesDestaque,
  listarAparicoesPublicadas,
} from "@/lib/aparicoes";

import { listarCuriosidadesPublicadas } from "@/lib/curiosidades";

// ======================================================
// SEO DA PÁGINA INICIAL
// ======================================================

const titulo = "Caminhos de Maria";

const descricao =
  "Conheça a história das aparições de Nossa Senhora pelo mundo. " +
  "Explore relatos, mensagens, uma linha do tempo e curiosidades " +
  "sobre as aparições marianas.";

export const metadata: Metadata = {
  title: {
    absolute: titulo,
  },

  description: descricao,

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Caminhos de Maria",
    title: titulo,
    description: descricao,
    url: "/",
  },

  twitter: {
    card: "summary",
    title: titulo,
    description: descricao,
  },

  robots: {
    index: true,
    follow: true,
  },
};

// ======================================================
// ORNAMENTOS REUTILIZÁVEIS
// ======================================================

function FlorDeLis({
  className = "",
}: {
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`font-serif leading-none text-[#ad813e] ${className}`}
    >
      ⚜
    </span>
  );
}

function Separador({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-3 text-[#b28b49] ${className}`}
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
// TÍTULO PADRONIZADO DAS SEÇÕES
// ======================================================

function TituloSecao({
  children,
  href,
  textoLink,
}: {
  children: ReactNode;
  href: string;
  textoLink: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">

      {/* TÍTULO COM ORNAMENTO */}
      <div>
        <div className="flex items-center gap-3">
          <FlorDeLis className="text-3xl sm:text-4xl" />

          <h2 className="font-serif text-2xl font-semibold text-[#14233f] sm:text-3xl">
            {children}
          </h2>
        </div>

        <div
          aria-hidden="true"
          className="ml-11 mt-3 flex items-center gap-2"
        >
          <span className="h-px w-20 bg-[#b28b49]/70" />

          <span className="text-xs text-[#b28b49]">
            ✦
          </span>

          <span className="h-px w-10 bg-[#b28b49]/70" />
        </div>
      </div>

      {/* LINK PARA A PÁGINA COMPLETA */}
      <Link
        href={href}
        className="mb-1 inline-flex items-center gap-2 font-serif text-sm font-semibold text-[#98723e] transition hover:gap-3 hover:text-[#14233f]"
      >
        {textoLink}

        <span aria-hidden="true">
          →
        </span>
      </Link>

    </div>
  );
}

// ======================================================
// PÁGINA INICIAL
// ======================================================

export default async function Home() {
  // Busca os dados publicados no Supabase
  const [
    destaques,
    aparicoesPublicadas,
    curiosidades,
  ] = await Promise.all([
    listarAparicoesDestaque(),
    listarAparicoesPublicadas(),
    listarCuriosidadesPublicadas(),
  ]);

  return (
    <main className="min-h-screen text-[#14233f]">

      {/* ================================================= */}
      {/* 1. BANNER PRINCIPAL */}
      {/* ================================================= */}

      <section
        aria-label="Apresentação do Caminhos de Maria"
        className="relative h-95 w-full overflow-hidden md:h-125"
      >
        {/* IMAGEM ORIGINAL DO BANNER */}
        <Image
          src="/imagens/banner-home/nossas-senhoras-2.png"
          alt="Nossa Senhora de Fátima com os três pastorinhos"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: "50% 75%",

            // Faz a imagem desaparecer gradualmente,
            // revelando o fundo global do globals.css.
            WebkitMaskImage: `
              linear-gradient(
                to bottom,
                black 0%,
                black 60%,
                rgba(0, 0, 0, 0.85) 72%,
                rgba(0, 0, 0, 0.4) 88%,
                transparent 100%
              )
            `,

            maskImage: `
              linear-gradient(
                to bottom,
                black 0%,
                black 60%,
                rgba(0, 0, 0, 0.85) 72%,
                rgba(0, 0, 0, 0.4) 88%,
                transparent 100%
              )
            `,
          }}
        />

      </section>

      {/* ================================================= */}
      {/* 2. TÍTULO PRINCIPAL E BUSCA */}
      {/* ================================================= */}

      <section className="relative z-10 -mt-1 px-6 pb-14 text-center">

        <div className="mx-auto max-w-4xl">

          {/* ORNAMENTO SUPERIOR */}
          <FlorDeLis className="text-4xl" />

          {/* TÍTULO PRINCIPAL */}
          <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#14233f] sm:text-4xl lg:text-5xl">
            Conheça a história das aparições
          </h1>

          {/* SEPARADOR DOURADO */}
          <div className="mx-auto mt-5 max-w-70">
            <Separador />
          </div>

          {/* DESCRIÇÃO */}
          <p className="mx-auto mt-5 max-w-2xl font-serif text-base leading-7 text-[#594936] sm:text-lg">
            Uma jornada pela história, pela fé e pela devoção
            a Nossa Senhora através dos séculos.
          </p>

          {/* BUSCA ORIGINAL */}
          <div className="mt-7 flex justify-center">
            <BuscaAparicao />
          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* 3. APARIÇÕES EM DESTAQUE */}
      {/* FUNDO DEFINIDO NO GLOBALS.CSS */}
      {/* ================================================= */}

      {destaques.length > 0 && (
        <section className="px-6 pb-16 pt-12 sm:pt-16">

          <div className="mx-auto max-w-6xl">

            {/* TÍTULO E LINK */}
            <TituloSecao
              href="/aparicoes"
              textoLink="Ver todas"
            >
              Aparições em destaque
            </TituloSecao>

            {/* CARDS ORIGINAIS */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destaques.map((aparicao) => (
                <CardAparicaoDestaque
                  key={aparicao.slug}
                  aparicao={aparicao}
                />
              ))}
            </div>

          </div>
        </section>
      )}

      {/* ================================================= */}
      {/* 4. DIVISOR DECORATIVO */}
      {/* ================================================= */}

      <Divisor />

      {/* ================================================= */}
      {/* 5. LINHA DO TEMPO */}
      {/* FUNDO DEFINIDO NO GLOBALS.CSS */}
      {/* ================================================= */}

      <section className="px-6 pb-20 pt-8 sm:pt-12">

        <div className="mx-auto max-w-6xl">

          {/* TÍTULO E LINK */}
          <TituloSecao
            href="/linha-do-tempo"
            textoLink="Ver completa"
          >
            Linha do tempo
          </TituloSecao>

          {/* LINHA DO TEMPO ORIGINAL */}
          <div className="mt-10">
            <LinhaDoTempoResumo
              aparicoes={aparicoesPublicadas}
            />
          </div>

        </div>
      </section>

      {/* ================================================= */}
      {/* 6. CURIOSIDADES — VOCÊ SABIA? */}
      {/* ================================================= */}

      {curiosidades.length > 0 && (
        <section>

          {/* ============================================= */}
          {/* CABEÇALHO AZUL-MARINHO */}
          {/* ============================================= */}

          <div className="relative isolate overflow-hidden border-t border-[#c9a46a]/50 bg-[#14233f] px-6 pb-52 pt-16">

            {/* ILUSTRAÇÃO DE NOSSA SENHORA AO FUNDO */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[url('/imagens/background-footer.png')] bg-cover bg-right bg-no-repeat opacity-35"
            />

            {/* DEGRADÊ PARA LEITURA DO TEXTO */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-[#14233f]/95 via-[#14233f]/80 to-[#14233f]/60"
            />

            <div className="relative mx-auto max-w-6xl text-center">

              {/* ORNAMENTO SUPERIOR */}
              <span
                aria-hidden="true"
                className="font-serif text-3xl text-[#d5b685]"
              >
                ✦
              </span>

              {/* TÍTULO */}
              <h2 className="mt-3 font-serif text-3xl font-semibold uppercase tracking-[0.08em] text-[#d5b685] sm:text-4xl">
                Você sabia?
              </h2>

              {/* SEPARADOR DOURADO */}
              <div
                aria-hidden="true"
                className="mx-auto mt-6 flex max-w-65 items-center gap-3 text-[#d5b685]"
              >
                <span className="h-px flex-1 bg-[#d5b685]/70" />

                <span className="font-serif text-xl">
                  ✦
                </span>

                <span className="h-px flex-1 bg-[#d5b685]/70" />
              </div>

              {/* DESCRIÇÃO */}
              <p className="mx-auto mt-5 max-w-2xl font-serif text-base leading-7 text-[#e6dcce] sm:text-lg">
                Curiosidades e fatos fascinantes sobre as
                aparições de Nossa Senhora pelo mundo.
              </p>

            </div>
          </div>

          {/* ============================================= */}
          {/* CARROSSEL ORIGINAL */}
          {/* FUNDO GLOBAL DO PERGAMINHO */}
          {/* ============================================= */}

          <div className="relative z-10 -mt-44 px-6 pb-16">

            <div className="mx-auto max-w-6xl">
              <CarrosselCuriosidades
                curiosidades={curiosidades}
              />
            </div>

          </div>

        </section>
      )}

    </main>
  );
}
