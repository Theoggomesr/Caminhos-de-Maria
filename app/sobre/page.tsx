
import type { Metadata } from "next";
import type { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  BookOpen,
  Globe2,
  HandHeart,
  Heart,
  ArrowRight,
} from "lucide-react";

// ======================================================
// SEO DA PÁGINA SOBRE NÓS
// ======================================================

const titulo = "Sobre Nós";

const descricao =
  "Conheça o Caminhos de Maria, nossa história, missão " +
  "e valores. Um projeto dedicado à fé, à devoção " +
  "e à história das aparições de Nossa Senhora.";

export const metadata: Metadata = {
  title: titulo,
  description: descricao,

  alternates: {
    canonical: "/sobre",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Caminhos de Maria",
    title: `${titulo} | Caminhos de Maria`,
    description: descricao,
    url: "/sobre",
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

function TituloSecao({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-4">
        <FlorDeLis className="text-3xl sm:text-4xl" />

        <h2 className="font-serif text-3xl font-semibold text-[#14233f] sm:text-4xl">
          {children}
        </h2>
      </div>

      <div className="ml-12 mt-3 flex items-center gap-2">
        <span className="h-px w-24 bg-[#b28b49]/70" />

        <span className="text-xs text-[#b28b49]">
          ✦
        </span>

        <span className="h-px w-12 bg-[#b28b49]/70" />
      </div>
    </div>
  );
}

// ======================================================
// PÁGINA SOBRE NÓS
// ======================================================

export default function SobrePage() {
  return (
    <main className="min-h-screen text-[#42382d]">

      {/* ================================================= */}
      {/* 1. HERO — SOBRE NÓS */}
      {/* ================================================= */}

      <section className="relative isolate min-h-97.5 overflow-hidden border-b border-[#c9a46a]/40 bg-[#f7f0df]">

        {/* IMAGEM DE NOSSA SENHORA EM TODA A LARGURA */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[#14233f] bg-[url('/imagens/background-footer.png')] bg-cover bg-right bg-no-repeat"
        />

        {/* TRANSIÇÃO DO PERGAMINHO PARA A ILUSTRAÇÃO */}
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

        {/* CAMADA CLARA ADICIONAL NO CELULAR */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[#f7f0df]/75 lg:hidden"
        />

        {/* CONTEÚDO DO CABEÇALHO */}
        <div className="relative mx-auto flex min-h-97.5 max-w-7xl items-center px-6 py-16 sm:px-10 lg:py-20">

          <div className="w-full max-w-152.5">

            {/* IDENTIFICAÇÃO DO PROJETO */}
            <div className="mb-6 flex items-center gap-3">
              <FlorDeLis className="text-4xl" />

              <span className="font-serif text-sm uppercase tracking-[0.25em] text-[#a97c2f]">
                Caminhos de Maria
              </span>
            </div>

            {/* TÍTULO */}
            <h1 className="font-serif text-5xl font-medium leading-tight text-[#14233f] sm:text-6xl lg:text-7xl">
              Sobre Nós
            </h1>

            {/* ORNAMENTO DOURADO */}
            <div className="mt-6 max-w-[320px]">
              <Separador />
            </div>

            {/* APRESENTAÇÃO */}
            <p className="mt-6 max-w-xl font-serif text-lg leading-8 text-[#594936] sm:text-xl">
              O Caminhos de Maria nasceu do desejo de
              aproximar mais pessoas da história e da
              mensagem de Nossa Senhora, por meio de um
              conteúdo confiável, acessível e bem organizado.
            </p>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 2. MISSÃO E VISÃO — FUNDO DO GLOBALS.CSS */}
      {/* ================================================= */}

      <section className="relative px-6 py-16 sm:px-10 lg:py-20">

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

          {/* IMAGEM HISTÓRICA */}
          <div className="relative">

            <div className="relative h-85 overflow-hidden rounded-tl-[45px] rounded-br-[45px] border border-[#c9a46a]/70 bg-[#eee0c6] shadow-md sm:h-107.5">
              <Image
                src="/imagens/sobre/santuario-mariano.png"
                alt="Santuário mariano, símbolo de fé e peregrinação"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            <span
              aria-hidden="true"
              className="absolute -left-3 -top-4 font-serif text-4xl text-[#b28b49]"
            >
              ✦
            </span>

            <span
              aria-hidden="true"
              className="absolute -bottom-4 -right-2 font-serif text-4xl text-[#b28b49]"
            >
              ✦
            </span>

          </div>

          {/* MISSÃO E VISÃO */}
          <div className="space-y-12">

            <div>
              <TituloSecao>
                Nossa Missão
              </TituloSecao>

              <p className="font-serif text-lg leading-8 text-[#594936]">
                Divulgar as aparições de Nossa Senhora,
                valorizando sua história, seu contexto e
                suas mensagens, para inspirar a fé, a
                oração e a devoção mariana na vida das
                pessoas.
              </p>

              <p className="mt-4 font-serif text-lg leading-8 text-[#594936]">
                Desejamos que cada visitante encontre aqui
                não apenas informações, mas um caminho de
                aproximação com a Virgem Maria, conhecendo
                os relatos históricos e a riqueza espiritual
                da tradição católica.
              </p>
            </div>

            <div>
              <TituloSecao>
                Nossa Visão
              </TituloSecao>

              <p className="font-serif text-lg leading-8 text-[#594936]">
                Ser uma referência acessível em conteúdo
                sobre as aparições marianas, contribuindo
                para que mais pessoas conheçam suas histórias,
                aprofundem sua fé e encontrem inspiração
                na devoção a Nossa Senhora.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 3. NOSSOS PILARES — FUNDO DO GLOBALS.CSS */}
      {/* ================================================= */}

      <section className="border-y border-[#c9a46a]/35 px-6 py-16 sm:px-10">

        <div className="mx-auto max-w-6xl">

          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-semibold text-[#14233f] sm:text-4xl">
              Nossos Pilares
            </h2>

            <p className="mt-3 font-serif text-lg text-[#765728]">
              Os valores que orientam o Caminhos de Maria.
            </p>

            <div className="mx-auto mt-5 max-w-xs">
              <Separador />
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-3 md:gap-0">

            {/* HISTÓRIA */}
            <div className="px-5 text-center md:border-r md:border-[#b28b49]/50">

              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#b28b49] text-[#a97c2f]">
                <BookOpen
                  size={43}
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#14233f]">
                História
              </h3>

              <p className="mx-auto mt-4 max-w-xs font-serif text-base leading-7 text-[#594936]">
                Apresentamos o contexto histórico das
                aparições, com informações organizadas
                e fundamentadas em fontes confiáveis.
              </p>

            </div>

            {/* DEVOÇÃO */}
            <div className="px-5 text-center md:border-r md:border-[#b28b49]/50">

              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#b28b49] text-[#a97c2f]">
                <HandHeart
                  size={43}
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#14233f]">
                Devoção
              </h3>

              <p className="mx-auto mt-4 max-w-xs font-serif text-base leading-7 text-[#594936]">
                Valorizamos a mensagem espiritual de
                Nossa Senhora e sua presença na vida
                de oração e na tradição da Igreja.
              </p>

            </div>

            {/* ACESSO */}
            <div className="px-5 text-center">

              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#b28b49] text-[#a97c2f]">
                <Globe2
                  size={43}
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#14233f]">
                Acesso
              </h3>

              <p className="mx-auto mt-4 max-w-xs font-serif text-base leading-7 text-[#594936]">
                Reunimos histórias de diferentes
                países em um único lugar, com conteúdo
                acessível e fácil de navegar.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 4. POR QUE ESTE PROJETO? */}
      {/* FUNDO DO GLOBALS.CSS */}
      {/* ================================================= */}

      <section className="px-6 py-16 sm:px-10 lg:py-20">

        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">

          {/* QUADRO COM CITAÇÃO BÍBLICA */}
          <div className="relative border border-[#b28b49] bg-[#fff9ed]/70 px-8 py-14 text-center shadow-sm sm:px-12">

            <span
              aria-hidden="true"
              className="absolute left-2 top-1 font-serif text-3xl text-[#b28b49]"
            >
              ❦
            </span>

            <span
              aria-hidden="true"
              className="absolute right-2 top-1 font-serif text-3xl text-[#b28b49]"
            >
              ❦
            </span>

            <span
              aria-hidden="true"
              className="absolute bottom-1 left-2 rotate-180 font-serif text-3xl text-[#b28b49]"
            >
              ❦
            </span>

            <span
              aria-hidden="true"
              className="absolute bottom-1 right-2 rotate-180 font-serif text-3xl text-[#b28b49]"
            >
              ❦
            </span>

            <p className="font-serif text-2xl italic leading-relaxed text-[#765728] sm:text-3xl">
              “Fazei tudo o que Ele vos disser.”
            </p>

            <div className="mx-auto my-6 max-w-55">
              <Separador />
            </div>

            <p className="font-serif text-sm font-semibold tracking-wide text-[#14233f]">
              João 2,5
            </p>

          </div>

          {/* ORIGEM DO PROJETO */}
          <div>

            <TituloSecao>
              Por que este projeto?
            </TituloSecao>

            <p className="font-serif text-lg leading-8 text-[#594936]">
              O Caminhos de Maria nasceu de uma profunda
              devoção e do desejo de compartilhar com
              o mundo a beleza, a fé e a esperança que
              os relatos das aparições de Nossa Senhora
              despertam.
            </p>

            <p className="mt-5 font-serif text-lg leading-8 text-[#594936]">
              Ao longo dos séculos, diferentes lugares
              tornaram-se conhecidos por relatos de
              manifestações marianas. Nosso propósito é
              reunir essas histórias em um único espaço,
              permitindo que visitantes conheçam seus
              contextos, mensagens e acontecimentos.
            </p>

            <p className="mt-5 font-serif text-lg leading-8 text-[#594936]">
              Por meio de um mapa, uma linha do tempo e
              páginas dedicadas a cada aparição, buscamos
              tornar essa jornada de conhecimento mais
              simples, organizada e inspiradora.
            </p>

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 5. NOSSO COMPROMISSO — FUNDO DO GLOBALS.CSS */}
      {/* ================================================= */}

      <section className="relative isolate overflow-hidden border-y border-[#c9a46a]/30">

        <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-2">

          {/* TEXTO */}
          <div className="relative z-10 px-6 py-16 sm:px-10 lg:py-20">

            <TituloSecao>
              Nosso Compromisso
            </TituloSecao>

            <p className="max-w-xl font-serif text-lg leading-8 text-[#594936]">
              Buscamos apresentar informações baseadas
              em fontes confiáveis, respeitando os
              ensinamentos da Igreja Católica e a
              seriedade de cada relato.
            </p>

            <p className="mt-5 max-w-xl font-serif text-lg leading-8 text-[#594936]">
              Nosso compromisso é manter o site
              atualizado, com conteúdo cuidadoso,
              responsável e que ajude os visitantes
              a aprofundar seu conhecimento sobre
              Nossa Senhora.
            </p>

            <div className="mt-7 flex items-center gap-3 text-[#b28b49]">

              <Heart
                size={19}
                strokeWidth={1.5}
                aria-hidden="true"
              />

              <span className="font-serif text-sm italic text-[#765728]">
                Feito com fé, dedicação e devoção.
              </span>

            </div>
          </div>

          {/* IMAGEM */}
          <div className="relative h-85 sm:h-107.5 lg:h-full lg:min-h-110">

            <Image
              src="/imagens/sobre/nossa-senhora-fatima.png"
              alt="Representação de Nossa Senhora de Fátima"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />

            {/* DEGRADÊ LOCAL DA IMAGEM */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#f7f0df]/45 via-transparent to-transparent lg:bg-linear-to-r lg:from-[#f7f0df] lg:via-[#f7f0df]/15 lg:to-transparent"
            />

          </div>
        </div>
      </section>

      {/* ================================================= */}
      {/* 6. CHAMADA FINAL — FUNDO DO GLOBALS.CSS */}
      {/* ================================================= */}

      <section className="px-6 py-16 text-center sm:px-10 lg:py-20">

        <div className="mx-auto max-w-3xl">

          <FlorDeLis className="text-4xl" />

          <h2 className="mt-5 font-serif text-3xl font-semibold text-[#14233f] sm:text-4xl">
            Percorra os Caminhos de Maria
          </h2>

          <div className="mx-auto my-6 max-w-xs">
            <Separador />
          </div>

          <p className="mx-auto max-w-2xl font-serif text-lg leading-8 text-[#594936]">
            Conheça os relatos das aparições de Nossa
            Senhora e descubra histórias de fé,
            esperança e devoção.
          </p>

          {/* BOTÕES */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

            <Link
              href="/aparicoes"
              className="inline-flex items-center gap-2 rounded-md border border-[#14233f] bg-[#14233f] px-7 py-3 font-serif font-semibold text-[#f7f0df] transition hover:bg-[#263e61]"
            >
              Explorar as aparições

              <ArrowRight
                size={17}
                aria-hidden="true"
              />
            </Link>

            <Link
              href="/linha-do-tempo"
              className="inline-flex items-center gap-2 rounded-md border border-[#c9a46a] bg-[#fffaf0]/70 px-7 py-3 font-serif font-semibold text-[#14233f] transition hover:bg-[#f1e2c6]"
            >
              Linha do Tempo

              <ArrowRight
                size={17}
                aria-hidden="true"
              />
            </Link>

          </div>
        </div>
      </section>

    </main>
  );
}
