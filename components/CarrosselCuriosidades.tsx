
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { CuriosidadePublica } from "@/lib/curiosidades";

// ======================================================
// ORNAMENTO FLORAL MEDIEVAL
// MESMO ESTILO DOS CARDS DE APARIÇÕES
// ======================================================

function OrnamentoCanto({
  className = "",
  transform,
}: {
  className?: string;
  transform?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={`h-12 w-12 sm:h-14 sm:w-14 ${className}`}
      style={transform ? { transform } : undefined}
      fill="none"
    >
      {/* CONTORNO DOURADO */}
      <path
        d="M4 55V13Q4 4 13 4H55"
        stroke="#ad813e"
        strokeWidth="1.8"
      />

      <path
        d="M9 46V15Q9 9 15 9H46"
        stroke="#d9b873"
        strokeWidth="0.8"
      />

      {/* RAMO PRINCIPAL */}
      <path
        d="M7 48C16 42 13 30 26 25C37 21 40 13 48 7"
        stroke="#98723e"
        strokeWidth="1.9"
        strokeLinecap="round"
      />

      {/* ARABESCO SUPERIOR */}
      <path
        d="M22 14C29 11 33 15 32 20C31 24 25 24 24 20C24 18 26 17 28 18"
        stroke="#b28b49"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ARABESCO LATERAL */}
      <path
        d="M14 28C11 35 15 40 21 39C26 38 26 32 22 31C20 31 19 33 20 35"
        stroke="#b28b49"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* FOLHAS */}
      <path
        d="M30 20C32 10 39 10 43 11C42 18 37 23 30 20Z"
        fill="#84905d"
        stroke="#97783e"
        strokeWidth="1"
      />

      <path
        d="M31 19L41 12"
        stroke="#e0c786"
        strokeWidth="0.8"
      />

      <path
        d="M17 34C8 32 7 25 9 21C16 23 20 28 17 34Z"
        fill="#84905d"
        stroke="#97783e"
        strokeWidth="1"
      />

      <path
        d="M16 32L10 23"
        stroke="#e0c786"
        strokeWidth="0.8"
      />

      {/* FLOR MEDIEVAL */}
      <g transform="translate(27 27)">
        <ellipse
          cy="-7"
          rx="4"
          ry="7"
          fill="#355978"
          stroke="#b28b49"
          strokeWidth="0.9"
        />

        <ellipse
          cy="7"
          rx="4"
          ry="7"
          fill="#355978"
          stroke="#b28b49"
          strokeWidth="0.9"
        />

        <ellipse
          cx="-7"
          rx="7"
          ry="4"
          fill="#8f4440"
          stroke="#b28b49"
          strokeWidth="0.9"
        />

        <ellipse
          cx="7"
          rx="7"
          ry="4"
          fill="#8f4440"
          stroke="#b28b49"
          strokeWidth="0.9"
        />

        <circle
          r="3.5"
          fill="#d5b685"
          stroke="#98723e"
          strokeWidth="1"
        />

        <circle r="1.2" fill="#14233f" />
      </g>

      {/* PONTOS DOURADOS */}
      <circle
        cx="13"
        cy="13"
        r="2.5"
        fill="#d5b685"
        stroke="#98723e"
        strokeWidth="1"
      />

      <circle cx="48" cy="7" r="1.6" fill="#d5b685" />
      <circle cx="7" cy="48" r="1.6" fill="#d5b685" />
    </svg>
  );
}

// ======================================================
// ORNAMENTOS NOS QUATRO CANTOS
// ======================================================

function OrnamentosCard() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20"
    >
      {/* SUPERIOR ESQUERDO */}
      <OrnamentoCanto
        className="absolute left-0 top-0"
      />

      {/* SUPERIOR DIREITO */}
      <OrnamentoCanto
        className="absolute right-0 top-0"
        transform="scaleX(-1)"
      />

      {/* INFERIOR ESQUERDO */}
      <OrnamentoCanto
        className="absolute bottom-0 left-0"
        transform="scaleY(-1)"
      />

      {/* INFERIOR DIREITO */}
      <OrnamentoCanto
        className="absolute bottom-0 right-0"
        transform="rotate(180deg)"
      />
    </div>
  );
}

// ======================================================
// SEPARADOR DOURADO
// ======================================================

function SeparadorCard() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-3 text-[#b28b49]"
    >
      <span className="h-px flex-1 bg-[#c9a46a]/60" />

      <span className="font-serif text-sm">
        ✦
      </span>

      <span className="h-px flex-1 bg-[#c9a46a]/60" />
    </div>
  );
}

// ======================================================
// CARD DE CURIOSIDADE
// ======================================================

function CardCuriosidade({
  item,
}: {
  item: CuriosidadePublica;
}) {
  const [erroImagem, setErroImagem] = useState(false);

  const possuiImagem =
    Boolean(item.imagem_url) && !erroImagem;

  const slug = item.aparicoes?.slug;

  const possuiAno =
    typeof item.ano === "number" &&
    Number.isFinite(item.ano);

  return (
    <article
      className="
        group
        relative
        flex
        w-72
        shrink-0
        snap-start
        flex-col
        overflow-hidden
        rounded-sm
        border
        border-[#c9a46a]/85
        bg-[#fff9ed]
        shadow-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#a97c2f]
        hover:shadow-lg
        sm:w-80
      "
    >
      {/* ============================================== */}
      {/* 1. ORNAMENTOS MEDIEVAIS */}
      {/* ============================================== */}

      <OrnamentosCard />

      {/* ============================================== */}
      {/* 2. IMAGEM DA CURIOSIDADE */}
      {/* ============================================== */}

      <div className="relative z-10 px-3 pt-3">
        <div className="relative h-48 w-full overflow-hidden bg-[#14233f] sm:h-52">

          {possuiImagem && item.imagem_url ? (
            <Image
              src={item.imagem_url}
              alt={item.imagem_alt || item.titulo}
              fill
              sizes="(max-width: 640px) 288px, 320px"
              className="
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
              onError={() => setErroImagem(true)}
            />
          ) : (
            /* IMAGEM ALTERNATIVA */
            <div
              className="
                flex
                h-full
                w-full
                flex-col
                items-center
                justify-center
                gap-3
                bg-linear-to-br
                from-[#243b5c]
                to-[#14233f]
              "
            >
              <span
                aria-hidden="true"
                className="font-serif text-6xl text-[#d5b685]"
              >
                ✦
              </span>

              <span className="font-serif text-xs uppercase tracking-[0.18em] text-[#e6dcce]">
                Caminhos de Maria
              </span>
            </div>
          )}

          {/* DEGRADÊ INFERIOR DA IMAGEM */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              h-16
              bg-linear-to-t
              from-[#14233f]/50
              to-transparent
            "
          />

          {/* ETIQUETA DO ANO */}
          {possuiAno && (
            <span
              className="
                absolute
                bottom-0
                left-3
                z-10
                bg-[#c9a46a]
                px-4
                py-1.5
                font-serif
                text-sm
                font-semibold
                text-[#14233f]
                shadow-sm
              "
            >
              {item.ano}
            </span>
          )}
        </div>
      </div>

      {/* ============================================== */}
      {/* 3. CONTEÚDO */}
      {/* ============================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-1
          flex-col
          px-7
          pb-9
          pt-6
          text-center
          sm:px-8
        "
      >
        {/* IDENTIFICAÇÃO DECORATIVA */}
        <span
          aria-hidden="true"
          className="mb-3 font-serif text-xl text-[#b28b49]"
        >
          ✦
        </span>

        {/* TÍTULO */}
        <h3
          className="
            font-serif
            text-xl
            font-semibold
            leading-snug
            text-[#14233f]
            sm:text-2xl
          "
        >
          {item.titulo}
        </h3>

        {/* SEPARADOR ORNAMENTAL */}
        <div className="my-5">
          <SeparadorCard />
        </div>

        {/* DESCRIÇÃO */}
        <p
          className="
            mb-6
            flex-1
            font-serif
            text-sm
            leading-6
            text-[#594936]
          "
        >
          {item.texto}
        </p>

        {/* ============================================ */}
        {/* 4. LINK PARA A APARIÇÃO */}
        {/* ============================================ */}

        {slug && (
          <Link
            href={`/aparicoes/${slug}`}
            className="
              relative
              z-30
              mt-auto
              inline-flex
              items-center
              justify-center
              self-center
              gap-2
              rounded-sm
              border
              border-[#b28b49]
              bg-[#14233f]
              px-6
              py-2.5
              font-serif
              text-sm
              font-semibold
              text-[#fff9ed]
              transition-all
              duration-300
              hover:gap-3
              hover:border-[#14233f]
              hover:bg-[#263e61]
              focus-visible:outline
              focus-visible:outline-offset-2
              focus-visible:outline-[#b28b49]
            "
          >
            Saiba mais

            <span aria-hidden="true">
              →
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}

// ======================================================
// CARROSSEL DE CURIOSIDADES
// ======================================================

export default function CarrosselCuriosidades({
  curiosidades,
}: {
  curiosidades: CuriosidadePublica[];
}) {
  const trilho = useRef<HTMLDivElement>(null);

  // ====================================================
  // NAVEGAÇÃO HORIZONTAL
  // ====================================================

  function rolar(direcao: 1 | -1) {
    const elemento = trilho.current;

    if (!elemento) return;

    elemento.scrollBy({
      left: direcao * elemento.clientWidth * 0.8,
      behavior: "smooth",
    });
  }

  // ====================================================
  // ESTADO VAZIO
  // ====================================================

  if (curiosidades.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">

      {/* ============================================== */}
      {/* 1. TRILHO DO CARROSSEL */}
      {/* ============================================== */}

      <div
        ref={trilho}
        tabIndex={0}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Curiosidades sobre as aparições marianas"
        className="
          flex
          w-full
          snap-x
          snap-mandatory
          overflow-x-auto
          scroll-smooth
          px-1
          pb-6
          pt-2
          scrollbar-none
          [&::-webkit-scrollbar]:hidden
          focus-visible:outline
          focus-visible:outline-offset-2
          focus-visible:outline-[#b28b49]
        "
      >
        <div className="mx-auto flex shrink-0 items-stretch gap-6">

          {curiosidades.map((item) => (
            <CardCuriosidade
              key={item.id}
              item={item}
            />
          ))}

        </div>
      </div>

      {/* ============================================== */}
      {/* 2. BOTÕES DE NAVEGAÇÃO */}
      {/* ============================================== */}

      {curiosidades.length > 1 && (
        <div className="mt-5 flex flex-col items-center gap-4">

          {/* ORNAMENTO ENTRE OS BOTÕES */}
          <div
            aria-hidden="true"
            className="flex items-center gap-3 text-[#b28b49]"
          >
            <span className="h-px w-16 bg-[#c9a46a]/70" />

            <span className="font-serif text-lg">
              ✦
            </span>

            <span className="h-px w-16 bg-[#c9a46a]/70" />
          </div>

          {/* SETAS */}
          <div className="flex items-center justify-center gap-4">

            {/* ANTERIOR */}
            <button
              type="button"
              onClick={() => rolar(-1)}
              aria-label="Curiosidade anterior"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-[#b28b49]
                bg-[#14233f]
                font-serif
                text-xl
                text-[#d5b685]
                shadow-sm
                transition-all
                duration-300
                hover:-translate-x-0.5
                hover:bg-[#263e61]
                hover:shadow-md
                focus-visible:outline
                focus-visible:outline-offset-2
                focus-visible:outline-[#b28b49]
              "
            >
              ←
            </button>

            {/* PRÓXIMA */}
            <button
              type="button"
              onClick={() => rolar(1)}
              aria-label="Próxima curiosidade"
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                border
                border-[#b28b49]
                bg-[#14233f]
                font-serif
                text-xl
                text-[#d5b685]
                shadow-sm
                transition-all
                duration-300
                hover:translate-x-0.5
                hover:bg-[#263e61]
                hover:shadow-md
                focus-visible:outline
                focus-visible:outline-offset-2
                focus-visible:outline-[#b28b49]
              "
            >
              →
            </button>

          </div>

          {/* TEXTO AUXILIAR */}
          <p className="font-serif text-xs italic text-[#98723e] sm:text-sm">
            Explore mais curiosidades deslizando para os lados.
          </p>

        </div>
      )}
    </div>
  );
}
