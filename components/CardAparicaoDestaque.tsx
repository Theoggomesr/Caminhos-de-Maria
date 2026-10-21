
import Link from "next/link";

import type { AparicaoPublica } from "@/lib/aparicoes";

// ======================================================
// TIPOS
// ======================================================

type Props = {
  aparicao: AparicaoPublica;
};

// ======================================================
// ORNAMENTO FLORAL MEDIEVAL
// MESMO ESTILO DA LINHA DO TEMPO
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
      className={`h-14 w-14 sm:h-16 sm:w-16 ${className}`}
      style={
        transform
          ? { transform }
          : undefined
      }
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

        <circle
          r="1.2"
          fill="#14233f"
        />
      </g>

      {/* DETALHES DOURADOS */}
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
// ORNAMENTOS NOS QUATRO CANTOS
// ======================================================

function OrnamentosCard() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20"
    >
      {/* CANTO SUPERIOR ESQUERDO */}
      <OrnamentoCanto
        className="absolute left-0 top-0"
      />

      {/* CANTO SUPERIOR DIREITO */}
      <OrnamentoCanto
        className="absolute right-0 top-0"
        transform="scaleX(-1)"
      />

      {/* CANTO INFERIOR ESQUERDO */}
      <OrnamentoCanto
        className="absolute bottom-0 left-0"
        transform="scaleY(-1)"
      />

      {/* CANTO INFERIOR DIREITO */}
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
// CARD DE APARIÇÃO EM DESTAQUE
// ======================================================

export default function CardAparicaoDestaque({
  aparicao,
}: Props) {
  const localizacao = [
    aparicao.local,
    aparicao.pais,
  ]
    .filter(Boolean)
    .join(", ");

  const possuiAno =
    typeof aparicao.ano === "number" &&
    Number.isFinite(aparicao.ano);

  return (
    <Link
      href={`/aparicoes/${aparicao.slug}`}
      aria-label={`Conhecer a história de ${aparicao.nome}`}
      className="
        group
        relative
        flex
        h-full
        min-w-0
        flex-col
        overflow-hidden
        rounded-sm
        border
        border-[#c9a46a]/75
        bg-[#fff9ed]/95
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#a97c2f]
        hover:shadow-lg
        focus-visible:outline
        focus-visible:outline-offset-4
        focus-visible:outline-[#a97c2f]
      "
    >
      {/* ============================================== */}
      {/* 1. ORNAMENTOS MEDIEVAIS */}
      {/* ============================================== */}

      <OrnamentosCard />

      {/* ============================================== */}
      {/* 2. IMAGEM DA APARIÇÃO */}
      {/* ============================================== */}

      <div className="relative z-10 px-3 pt-3">

        <div className="relative h-52 overflow-hidden bg-[#14233f] sm:h-56">

          {aparicao.imagem_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={aparicao.imagem_url}
              alt={`Representação de ${aparicao.nome}`}
              loading="lazy"
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-[#243b5c] to-[#14233f]">
              <span
                aria-hidden="true"
                className="font-serif text-7xl text-[#d5b685]"
              >
                ✦
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
              from-[#14233f]/40
              to-transparent
            "
          />

          {/* ANO DA APARIÇÃO */}
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
              {aparicao.ano}
            </span>
          )}
        </div>
      </div>

      {/* ============================================== */}
      {/* 3. CONTEÚDO DA APARIÇÃO */}
      {/* ============================================== */}

      <div
        className="
          relative
          z-10
          flex
          flex-1
          flex-col
          px-8
          pb-10
          pt-6
          sm:px-9
        "
      >
        {/* TÍTULO */}
        <h3
          className="
            line-clamp-2
            font-serif
            text-xl
            font-semibold
            leading-snug
            text-[#14233f]
            transition-colors
            group-hover:text-[#98723e]
            sm:text-2xl
          "
        >
          {aparicao.nome}
        </h3>

        {/* LOCALIZAÇÃO */}
        <p
          className="
            mt-3
            flex
            items-start
            gap-2
            font-serif
            text-sm
            leading-6
            text-[#765728]
          "
        >
          <span
            aria-hidden="true"
            className="shrink-0 text-[#b28b49]"
          >
            ✦
          </span>

          <span>
            {localizacao || "Local não informado"}
          </span>
        </p>

        {/* PERÍODO */}
        {aparicao.periodo && (
          <p
            className="
              mt-1
              pl-5
              font-serif
              text-xs
              italic
              text-[#98723e]
            "
          >
            {aparicao.periodo}
          </p>
        )}

        {/* ============================================ */}
        {/* 4. SEPARADOR DECORATIVO */}
        {/* ============================================ */}

        <div className="my-5">
          <SeparadorCard />
        </div>

        {/* ============================================ */}
        {/* 5. DESCRIÇÃO */}
        {/* ============================================ */}

        <p
          className="
            line-clamp-3
            flex-1
            font-serif
            text-sm
            leading-6
            text-[#594936]
          "
        >
          {aparicao.descricao ||
            "Conheça a história, os acontecimentos e as mensagens relacionadas a esta aparição de Nossa Senhora."}
        </p>

        {/* ============================================ */}
        {/* 6. BOTÃO VISUAL CENTRALIZADO */}
        {/* ============================================ */}

        <div
          className="
            mt-auto
            flex
            w-full
            items-center
            justify-center
            gap-2
            pt-8
            text-center
            font-serif
            text-sm
            font-semibold
            text-[#98723e]
            transition-all
            duration-300
            group-hover:gap-3
            group-hover:text-[#14233f]
          "
        >
          <span>
            Conhecer aparição
          </span>

          <span
            aria-hidden="true"
            className="text-lg"
          >
            →
          </span>
        </div>

      </div>
    </Link>
  );
}
