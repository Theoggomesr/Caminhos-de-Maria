
import Link from "next/link";
import type { AparicaoPublica } from "@/lib/aparicoes";

// ======================================================
// TIPOS
// ======================================================

type Props = {
  aparicoes: AparicaoPublica[];
};

// ======================================================
// ORNAMENTO FLORAL MEDIEVAL
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
      style={
        transform
          ? { transform }
          : undefined
      }
      fill="none"
    >
      {/* CONTORNO DOURADO DO CANTO */}
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

      {/* RAMO PRINCIPAL CURVADO */}
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

      {/* FOLHA SUPERIOR */}
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

      {/* FOLHA LATERAL */}
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

      {/* PEQUENA FLOR MEDIEVAL */}
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

        <circle
          r="1.2"
          fill="#14233f"
        />
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

      <circle
        cx="48"
        cy="7"
        r="1.6"
        fill="#d5b685"
      />

      <circle
        cx="7"
        cy="48"
        r="1.6"
        fill="#d5b685"
      />
    </svg>
  );
}

// ======================================================
// ORNAMENTOS DOS QUATRO CANTOS
// ======================================================

function OrnamentosCard() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
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
// LINHA DO TEMPO RESUMIDA
// ======================================================

export default function LinhaDoTempoResumo({
  aparicoes,
}: Props) {
  // Ordena cronologicamente e exibe as 6 primeiras
  // aparições que possuem ano válido.
  const itens = aparicoes
    .filter(
      (aparicao) =>
        typeof aparicao.ano === "number" &&
        Number.isFinite(aparicao.ano)
    )
    .sort(
      (a, b) =>
        (a.ano ?? 0) - (b.ano ?? 0)
    )
    .slice(0, 6);

  // ====================================================
  // ESTADO VAZIO
  // ====================================================

  if (itens.length === 0) {
    return (
      <div className="rounded-md border border-[#c9a46a]/60 bg-[#fff9ed]/80 px-6 py-12 text-center">
        <span
          aria-hidden="true"
          className="font-serif text-3xl text-[#b28b49]"
        >
          ✦
        </span>

        <p className="mt-3 font-serif text-base text-[#765728]">
          Nenhuma aparição disponível na linha do tempo.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full">

      {/* ============================================== */}
      {/* 1. INTRODUÇÃO DECORATIVA */}
      {/* ============================================== */}

      <div className="mb-8 text-center">
        <p className="font-serif text-base italic leading-7 text-[#765728]">
          Uma jornada pelos séculos de fé e devoção mariana.
        </p>

        <div
          aria-hidden="true"
          className="mx-auto mt-4 flex max-w-65 items-center gap-3 text-[#b28b49]"
        >
          <span className="h-px flex-1 bg-[#b28b49]/50" />

          <span className="font-serif text-lg">
            ✦
          </span>

          <span className="h-px flex-1 bg-[#b28b49]/50" />
        </div>
      </div>

      {/* ============================================== */}
      {/* 2. LINHA DO TEMPO HORIZONTAL */}
      {/* ============================================== */}

      <div
        tabIndex={0}
        aria-label="Linha do tempo horizontal. Use a rolagem para explorar as aparições."
        className="
          w-full
          overflow-x-auto
          pb-6
          pt-4
          focus-visible:outline
          focus-visible:outline-offset-2
          focus-visible:outline-[#a97c2f]
        "
      >
        <ol className="relative flex min-w-max items-stretch gap-5 px-2 pb-2 pt-1">

          {/* LINHA DOURADA HORIZONTAL */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-30
              right-30
              top-5
              h-0.5
              bg-linear-to-r
              from-[#c9a46a]/40
              via-[#b28b49]
              to-[#c9a46a]/40
            "
          />

          {/* ========================================== */}
          {/* APARIÇÕES */}
          {/* ========================================== */}

          {itens.map((aparicao) => {
            const localizacao = [
              aparicao.local,
              aparicao.pais,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <li
                key={aparicao.slug}
                className="
                  relative
                  flex
                  w-55
                  shrink-0
                  flex-col
                  items-center
                  pt-12.5
                  sm:w-60
                "
              >
                {/* ==================================== */}
                {/* MARCADOR ORNAMENTAL */}
                {/* ==================================== */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    left-1/2
                    top-2
                    z-10
                    flex
                    h-6.5
                    w-6.5
                    -translate-x-1/2
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#b28b49]
                    bg-[#fff9ed]
                    shadow-sm
                  "
                >
                  <span className="font-serif text-base leading-none text-[#b28b49]">
                    ✦
                  </span>
                </div>

                {/* LINHA VERTICAL */}
                <span
                  aria-hidden="true"
                  className="
                    absolute
                    left-1/2
                    top-8.5
                    h-4
                    w-px
                    -translate-x-1/2
                    bg-[#b28b49]/80
                  "
                />

                {/* ==================================== */}
                {/* CARD COM ORNAMENTOS MEDIEVAIS */}
                {/* ==================================== */}

                <Link
                  href={`/aparicoes/${aparicao.slug}`}
                  aria-label={`Conhecer ${aparicao.nome}, ${aparicao.ano}`}
                  className="
                    group
                    relative
                    flex
                    h-full
                    w-full
                    flex-col
                    items-center
                    overflow-hidden
                    rounded-sm
                    border
                    border-[#c9a46a]/75
                    bg-[#fff9ed]/90
                    px-5
                    pb-7
                    pt-6
                    text-center
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#a97c2f]
                    hover:shadow-md
                    focus-visible:outline
                    focus-visible:outline-offset-2
                    focus-visible:outline-[#a97c2f]
                  "
                >
                  {/* NOVOS ORNAMENTOS FLORAIS */}
                  <OrnamentosCard />

                  {/* ANO */}
                  <time
                    dateTime={String(aparicao.ano)}
                    className="
                      relative
                      z-10
                      font-serif
                      text-3xl
                      font-semibold
                      tracking-wide
                      text-[#a97c2f]
                      transition-colors
                      group-hover:text-[#14233f]
                    "
                  >
                    {aparicao.ano}
                  </time>

                  {/* SEPARADOR */}
                  <div
                    aria-hidden="true"
                    className="relative z-10 my-4 flex w-full items-center gap-2 text-[#b28b49]"
                  >
                    <span className="h-px flex-1 bg-[#c9a46a]/60" />

                    <span className="text-xs">
                      ✦
                    </span>

                    <span className="h-px flex-1 bg-[#c9a46a]/60" />
                  </div>

                  {/* NOME */}
                  <h3
                    className="
                      relative
                      z-10
                      line-clamp-3
                      min-h-14
                      font-serif
                      text-lg
                      font-semibold
                      leading-snug
                      text-[#14233f]
                      transition-colors
                      group-hover:text-[#98723e]
                    "
                  >
                    {aparicao.nome}
                  </h3>

                  {/* LOCALIZAÇÃO */}
                  <p
                    className="
                      relative
                      z-10
                      mt-3
                      line-clamp-2
                      min-h-10
                      font-serif
                      text-sm
                      leading-5
                      text-[#765728]
                    "
                  >
                    {localizacao || "Local não informado"}
                  </p>

                  {/* LINK VISUAL */}
                  <div
                    className="
                      relative
                      z-10
                      mt-auto
                      flex
                      items-center
                      justify-center
                      gap-2
                      pt-5
                      font-serif
                      text-sm
                      font-semibold
                      text-[#98723e]
                      transition-all
                      group-hover:gap-3
                      group-hover:text-[#14233f]
                    "
                  >
                    <span>
                      Conhecer história
                    </span>

                    <span aria-hidden="true">
                      →
                    </span>
                  </div>

                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      {/* ============================================== */}
      {/* 3. INDICAÇÃO DE ROLAGEM */}
      {/* ============================================== */}

      <p className="mt-2 text-center font-serif text-xs italic text-[#98723e] sm:text-sm">
        Deslize horizontalmente para explorar as aparições.
      </p>
    </div>
  );
}
