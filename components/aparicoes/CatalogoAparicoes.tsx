
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import type { AparicaoPublica } from "@/lib/aparicoes";

// ======================================================
// TIPOS
// ======================================================

type Props = {
  aparicoes: AparicaoPublica[];
};

type Continente =
  | "todos"
  | "europa"
  | "america-sul"
  | "america-norte"
  | "asia"
  | "africa"
  | "oceania"
  | "outros";

type Periodo =
  | "todos"
  | "ate1500"
  | "1501a1800"
  | "1801a1900"
  | "apos1900";

type Ordem = "antigas" | "recentes" | "nome";

// ======================================================
// CONFIGURAÇÕES
// ======================================================

const ITENS_POR_PAGINA = 12;

const CONTINENTES: {
  valor: Continente;
  label: string;
}[] = [
  { valor: "todos", label: "Todos os continentes" },
  { valor: "europa", label: "Europa" },
  { valor: "america-sul", label: "América do Sul" },
  {
    valor: "america-norte",
    label: "América do Norte e Central",
  },
  { valor: "asia", label: "Ásia" },
  { valor: "africa", label: "África" },
  { valor: "oceania", label: "Oceania" },
  { valor: "outros", label: "Outros países" },
];

// ======================================================
// PAÍSES POR CONTINENTE
// ======================================================

const PAISES_POR_CONTINENTE: Record<
  Exclude<Continente, "todos" | "outros">,
  string[]
> = {
  europa: [
    "Portugal",
    "França",
    "Itália",
    "Espanha",
    "Alemanha",
    "Bélgica",
    "Irlanda",
    "Reino Unido",
    "Inglaterra",
    "Escócia",
    "País de Gales",
    "Polônia",
    "Áustria",
    "Suíça",
    "Países Baixos",
    "Holanda",
    "Luxemburgo",
    "Dinamarca",
    "Noruega",
    "Suécia",
    "Finlândia",
    "Islândia",
    "Grécia",
    "Croácia",
    "Eslovênia",
    "Sérvia",
    "Montenegro",
    "Bósnia e Herzegovina",
    "Albânia",
    "Macedônia do Norte",
    "Kosovo",
    "Hungria",
    "Romênia",
    "Bulgária",
    "Eslováquia",
    "Tchéquia",
    "República Tcheca",
    "Ucrânia",
    "Bielorrússia",
    "Lituânia",
    "Letônia",
    "Estônia",
    "Malta",
    "Chipre",
    "Mônaco",
    "Andorra",
    "Liechtenstein",
    "San Marino",
    "Vaticano",
    "Rússia",
  ],

  "america-sul": [
    "Brasil",
    "Argentina",
    "Chile",
    "Colômbia",
    "Peru",
    "Bolívia",
    "Equador",
    "Venezuela",
    "Paraguai",
    "Uruguai",
    "Guiana",
    "Suriname",
    "Guiana Francesa",
  ],

  "america-norte": [
    "México",
    "Estados Unidos",
    "Estados Unidos da América",
    "EUA",
    "Canadá",
    "Guatemala",
    "Honduras",
    "El Salvador",
    "Nicarágua",
    "Costa Rica",
    "Panamá",
    "Belize",
    "Cuba",
    "Haiti",
    "Jamaica",
    "República Dominicana",
    "Porto Rico",
    "Bahamas",
    "Trinidad e Tobago",
  ],

  asia: [
    "Japão",
    "China",
    "Índia",
    "Coreia do Sul",
    "Coreia do Norte",
    "Filipinas",
    "Vietnã",
    "Indonésia",
    "Malásia",
    "Singapura",
    "Tailândia",
    "Mianmar",
    "Nepal",
    "Paquistão",
    "Bangladesh",
    "Sri Lanka",
    "Israel",
    "Palestina",
    "Líbano",
    "Síria",
    "Jordânia",
    "Iraque",
    "Irã",
    "Arábia Saudita",
    "Turquia",
    "Armênia",
    "Geórgia",
    "Azerbaijão",
    "Cazaquistão",
    "Uzbequistão",
  ],

  africa: [
    "Egito",
    "Ruanda",
    "Quênia",
    "Uganda",
    "Etiópia",
    "Sudão",
    "Sudão do Sul",
    "África do Sul",
    "Nigéria",
    "Gana",
    "Camarões",
    "Angola",
    "Moçambique",
    "Tanzânia",
    "Madagascar",
    "Marrocos",
    "Argélia",
    "Tunísia",
    "Líbia",
    "Senegal",
    "Costa do Marfim",
    "República Democrática do Congo",
    "Congo",
    "Zâmbia",
    "Zimbábue",
    "Malawi",
    "Benim",
    "Togo",
    "Burundi",
  ],

  oceania: [
    "Austrália",
    "Nova Zelândia",
    "Papua-Nova Guiné",
    "Fiji",
    "Samoa",
    "Tonga",
    "Vanuatu",
    "Ilhas Salomão",
    "Kiribati",
    "Micronésia",
    "Palau",
    "Nauru",
    "Tuvalu",
  ],
};

// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

function normalizarTexto(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function obterContinente(pais: string): Continente {
  const nome = normalizarTexto(pais);

  for (const [continente, paises] of Object.entries(
    PAISES_POR_CONTINENTE
  )) {
    if (
      paises.some(
        (item) => normalizarTexto(item) === nome
      )
    ) {
      return continente as Continente;
    }
  }

  return "outros";
}

function correspondePeriodo(
  ano: number | null,
  periodo: Periodo
) {
  if (periodo === "todos") {
    return true;
  }

  if (ano === null || !Number.isFinite(ano)) {
    return false;
  }

  switch (periodo) {
    case "ate1500":
      return ano <= 1500;

    case "1501a1800":
      return ano >= 1501 && ano <= 1800;

    case "1801a1900":
      return ano >= 1801 && ano <= 1900;

    case "apos1900":
      return ano > 1900;

    default:
      return true;
  }
}

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

      {/* ARABESCOS */}
      <path
        d="M22 14C29 11 33 15 32 20C31 24 25 24 24 20C24 18 26 17 28 18"
        stroke="#b28b49"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

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
      <OrnamentoCanto
        className="absolute left-0 top-0"
      />

      <OrnamentoCanto
        className="absolute right-0 top-0"
        transform="scaleX(-1)"
      />

      <OrnamentoCanto
        className="absolute bottom-0 left-0"
        transform="scaleY(-1)"
      />

      <OrnamentoCanto
        className="absolute bottom-0 right-0"
        transform="rotate(180deg)"
      />
    </div>
  );
}

// ======================================================
// CARD DE APARIÇÃO
// ======================================================

function CardAparicao({
  aparicao,
}: {
  aparicao: AparicaoPublica;
}) {
  const [erroImagem, setErroImagem] = useState(false);

  const localizacao = [
    aparicao.local,
    aparicao.pais,
  ]
    .filter(Boolean)
    .join(", ");

  const temAno =
    typeof aparicao.ano === "number" &&
    Number.isFinite(aparicao.ano);

  return (
    <article
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
        bg-[#fff9ed]/90
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-[#a97c2f]
        hover:shadow-lg
      "
    >
      {/* ORNAMENTOS FLORAIS */}
      <OrnamentosCard />

      {/* ============================================== */}
      {/* IMAGEM DA APARIÇÃO — ENQUADRAMENTO CORRIGIDO */}
      {/* ============================================== */}

      <Link
        href={`/aparicoes/${aparicao.slug}`}
        aria-label={`Conhecer ${aparicao.nome}`}
        className="relative z-10 block border-b border-[#c9a46a]/45 p-2.5"
      >
        <div
          className="
            relative
            h-52
            overflow-hidden
            bg-[#e5d7bd]
            sm:h-56
          "
        >
          {aparicao.imagem_url && !erroImagem ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={aparicao.imagem_url}
              alt={`Representação de ${aparicao.nome}`}
              loading="lazy"
              onError={() => setErroImagem(true)}
              className="
                h-full
                w-full
                object-cover
                object-top
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-linear-to-br from-[#203550] to-[#14233f]">
              <span
                aria-hidden="true"
                className="font-serif text-6xl text-[#d5b685]"
              >
                ✦
              </span>
            </div>
          )}

          {/* ETIQUETA DO ANO */}
          {temAno && (
            <span
              className="
                absolute
                bottom-0
                left-2
                z-10
                rounded-t-sm
                bg-[#c9a46a]
                px-3
                py-1
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
      </Link>

      {/* ============================================== */}
      {/* INFORMAÇÕES DA APARIÇÃO */}
      {/* ============================================== */}

      <div className="relative z-10 flex flex-1 flex-col px-5 pb-8 pt-4">
        {/* TÍTULO */}
        <h3 className="font-serif text-xl font-semibold leading-snug text-[#14233f]">
          <Link
            href={`/aparicoes/${aparicao.slug}`}
            className="transition hover:text-[#a97c2f]"
          >
            {aparicao.nome}
          </Link>
        </h3>

        {/* LOCALIZAÇÃO */}
        <p className="mt-3 flex items-start gap-2 font-serif text-sm leading-5 text-[#765728]">
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

        {/* DESCRIÇÃO */}
        <p className="mt-4 line-clamp-4 flex-1 font-serif text-sm leading-6 text-[#594936]">
          {aparicao.descricao ||
            "Conheça a história e as mensagens relacionadas a esta aparição de Nossa Senhora."}
        </p>

        {/* LINK CENTRALIZADO */}
        <Link
          href={`/aparicoes/${aparicao.slug}`}
          className="
            relative
            z-10
            mt-5
            inline-flex
            items-center
            justify-center
            self-center
            gap-2
            px-4
            font-serif
            text-sm
            font-semibold
            text-[#98723e]
            transition-all
            group-hover:gap-3
            hover:text-[#14233f]
          "
        >
          Ver mais
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export default function CatalogoAparicoes({
  aparicoes,
}: Props) {
  const searchParams = useSearchParams();

  const termoUrl = searchParams.get("q") ?? "";

  const [pesquisaDigitada, setPesquisaDigitada] =
    useState<string | null>(null);

  const [continente, setContinente] =
    useState<Continente>("todos");

  const [pais, setPais] = useState("todos");

  const [periodo, setPeriodo] =
    useState<Periodo>("todos");

  const [ordem, setOrdem] =
    useState<Ordem>("antigas");

  const [paginaSolicitada, setPaginaSolicitada] =
    useState(1);

  const pesquisa = pesquisaDigitada ?? termoUrl;

  // ====================================================
  // PAÍSES DISPONÍVEIS
  // ====================================================

  const paises = useMemo(() => {
    return [
      ...new Set(
        aparicoes
          .map((aparicao) => aparicao.pais)
          .filter(Boolean)
      ),
    ].sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [aparicoes]);

  // ====================================================
  // PESQUISA, FILTROS E ORDENAÇÃO
  // ====================================================

  const filtradas = useMemo(() => {
    const termo = normalizarTexto(pesquisa);

    return aparicoes
      .filter((aparicao) => {
        const conteudo = normalizarTexto(
          [
            aparicao.nome,
            aparicao.local ?? "",
            aparicao.pais,
            aparicao.descricao ?? "",
          ].join(" ")
        );

        const correspondePesquisa =
          !termo || conteudo.includes(termo);

        const correspondeContinente =
          continente === "todos" ||
          obterContinente(aparicao.pais) === continente;

        const correspondePais =
          pais === "todos" ||
          aparicao.pais === pais;

        const correspondeFaixa =
          correspondePeriodo(
            aparicao.ano,
            periodo
          );

        return (
          correspondePesquisa &&
          correspondeContinente &&
          correspondePais &&
          correspondeFaixa
        );
      })
      .sort((a, b) => {
        if (ordem === "nome") {
          return a.nome.localeCompare(
            b.nome,
            "pt-BR"
          );
        }

        if (ordem === "recentes") {
          return (b.ano ?? -1) - (a.ano ?? -1);
        }

        return (a.ano ?? 99999) - (b.ano ?? 99999);
      });
  }, [
    aparicoes,
    pesquisa,
    continente,
    pais,
    periodo,
    ordem,
  ]);

  // ====================================================
  // PAGINAÇÃO
  // ====================================================

  const totalPaginas = Math.ceil(
    filtradas.length / ITENS_POR_PAGINA
  );

  const paginaAtual = Math.min(
    paginaSolicitada,
    Math.max(1, totalPaginas)
  );

  const inicio =
    (paginaAtual - 1) * ITENS_POR_PAGINA;

  const aparicoesPagina = filtradas.slice(
    inicio,
    inicio + ITENS_POR_PAGINA
  );

  const inicioBotoes = Math.max(
    1,
    Math.min(paginaAtual - 2, totalPaginas - 4)
  );

  const paginasVisiveis = Array.from(
    { length: Math.min(5, totalPaginas) },
    (_, indice) => inicioBotoes + indice
  );

  // ====================================================
  // FUNÇÕES DOS FILTROS
  // ====================================================

  function alterarPesquisa(valor: string) {
    setPesquisaDigitada(valor);
    setPaginaSolicitada(1);
  }

  function alterarContinente(valor: Continente) {
    setContinente(valor);
    setPaginaSolicitada(1);
  }

  function alterarPais(valor: string) {
    setPais(valor);
    setPaginaSolicitada(1);
  }

  function alterarPeriodo(valor: Periodo) {
    setPeriodo(valor);
    setPaginaSolicitada(1);
  }

  function alterarOrdem(valor: Ordem) {
    setOrdem(valor);
    setPaginaSolicitada(1);
  }

  function limparFiltros() {
    setPesquisaDigitada("");
    setContinente("todos");
    setPais("todos");
    setPeriodo("todos");
    setOrdem("antigas");
    setPaginaSolicitada(1);
  }

  const possuiFiltros =
    pesquisa.trim() !== "" ||
    continente !== "todos" ||
    pais !== "todos" ||
    periodo !== "todos" ||
    ordem !== "antigas";

  // ====================================================
  // RENDERIZAÇÃO
  // ====================================================

  return (
    <section aria-label="Catálogo de aparições marianas">

      {/* ============================================== */}
      {/* 1. PESQUISA E FILTROS */}
      {/* ============================================== */}

      <div className="mb-8 rounded-md border border-[#c9a46a]/60 bg-[#fffaf0]/75 p-4 shadow-sm sm:p-5">

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-12">

          {/* PESQUISA */}
          <div className="sm:col-span-2 xl:col-span-4">
            <label
              htmlFor="pesquisa-aparicoes"
              className="mb-2 block font-serif text-sm font-semibold text-[#14233f]"
            >
              Pesquisar aparições
            </label>

            <input
              id="pesquisa-aparicoes"
              type="search"
              value={pesquisa}
              onChange={(event) =>
                alterarPesquisa(event.target.value)
              }
              placeholder="Nome, cidade ou país..."
              className="w-full rounded-md border border-[#c9a46a]/60 bg-[#fffaf0] px-4 py-3 text-sm text-[#14233f] outline-none placeholder:text-[#92816a] focus:border-[#a97c2f] focus:ring-2 focus:ring-[#c9a46a]/25"
            />
          </div>

          {/* CONTINENTE */}
          <div className="xl:col-span-2">
            <label
              htmlFor="continente-aparicoes"
              className="mb-2 block font-serif text-sm font-semibold text-[#14233f]"
            >
              Continente
            </label>

            <select
              id="continente-aparicoes"
              value={continente}
              onChange={(event) =>
                alterarContinente(
                  event.target.value as Continente
                )
              }
              className="w-full rounded-md border border-[#c9a46a]/60 bg-[#fffaf0] px-3 py-3 text-sm text-[#14233f] outline-none focus:border-[#a97c2f] focus:ring-2 focus:ring-[#c9a46a]/25"
            >
              {CONTINENTES.map((item) => (
                <option
                  key={item.valor}
                  value={item.valor}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* PERÍODO */}
          <div className="xl:col-span-2">
            <label
              htmlFor="periodo-aparicoes"
              className="mb-2 block font-serif text-sm font-semibold text-[#14233f]"
            >
              Período
            </label>

            <select
              id="periodo-aparicoes"
              value={periodo}
              onChange={(event) =>
                alterarPeriodo(
                  event.target.value as Periodo
                )
              }
              className="w-full rounded-md border border-[#c9a46a]/60 bg-[#fffaf0] px-3 py-3 text-sm text-[#14233f] outline-none focus:border-[#a97c2f] focus:ring-2 focus:ring-[#c9a46a]/25"
            >
              <option value="todos">
                Todos os períodos
              </option>

              <option value="ate1500">
                Até 1500
              </option>

              <option value="1501a1800">
                1501 a 1800
              </option>

              <option value="1801a1900">
                1801 a 1900
              </option>

              <option value="apos1900">
                Após 1900
              </option>
            </select>
          </div>

          {/* PAÍS */}
          <div className="xl:col-span-2">
            <label
              htmlFor="pais-aparicoes"
              className="mb-2 block font-serif text-sm font-semibold text-[#14233f]"
            >
              País
            </label>

            <select
              id="pais-aparicoes"
              value={pais}
              onChange={(event) =>
                alterarPais(event.target.value)
              }
              className="w-full rounded-md border border-[#c9a46a]/60 bg-[#fffaf0] px-3 py-3 text-sm text-[#14233f] outline-none focus:border-[#a97c2f] focus:ring-2 focus:ring-[#c9a46a]/25"
            >
              <option value="todos">
                Todos os países
              </option>

              {paises.map((nomePais) => (
                <option
                  key={nomePais}
                  value={nomePais}
                >
                  {nomePais}
                </option>
              ))}
            </select>
          </div>

          {/* ORDENAÇÃO */}
          <div className="xl:col-span-2">
            <label
              htmlFor="ordem-aparicoes"
              className="mb-2 block font-serif text-sm font-semibold text-[#14233f]"
            >
              Ordenar por
            </label>

            <select
              id="ordem-aparicoes"
              value={ordem}
              onChange={(event) =>
                alterarOrdem(
                  event.target.value as Ordem
                )
              }
              className="w-full rounded-md border border-[#c9a46a]/60 bg-[#fffaf0] px-3 py-3 text-sm text-[#14233f] outline-none focus:border-[#a97c2f] focus:ring-2 focus:ring-[#c9a46a]/25"
            >
              <option value="antigas">
                Mais antigas
              </option>

              <option value="recentes">
                Mais recentes
              </option>

              <option value="nome">
                Nome (A–Z)
              </option>
            </select>
          </div>
        </div>

        {/* LIMPAR FILTROS */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#c9a46a]/30 pt-4">
          <p className="font-serif text-sm text-[#765728]">
            Explore as aparições marianas por localização,
            período ou nome.
          </p>

          <button
            type="button"
            onClick={limparFiltros}
            disabled={!possuiFiltros}
            className="inline-flex items-center gap-2 font-serif text-sm font-semibold text-[#98723e] transition hover:text-[#14233f] disabled:cursor-default disabled:opacity-40"
          >
            <span aria-hidden="true">↻</span>
            Limpar filtros
          </button>
        </div>
      </div>

      {/* ============================================== */}
      {/* 2. CONTADOR DE RESULTADOS */}
      {/* ============================================== */}

      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-[#14233f] sm:text-3xl">
            Explore as Aparições
          </h2>

          <div
            aria-hidden="true"
            className="mt-2 h-px w-32 bg-[#b28b49]/70"
          />
        </div>

        <p
          role="status"
          className="font-serif text-sm text-[#765728]"
        >
          <span className="font-semibold text-[#14233f]">
            {filtradas.length}
          </span>{" "}
          {filtradas.length === 1
            ? "aparição encontrada"
            : "aparições encontradas"}
        </p>
      </div>

      {/* ============================================== */}
      {/* 3. CARDS DAS APARIÇÕES */}
      {/* ============================================== */}

      {filtradas.length > 0 ? (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {aparicoesPagina.map((aparicao) => (
              <CardAparicao
                key={aparicao.id}
                aparicao={aparicao}
              />
            ))}
          </div>

          {/* ========================================== */}
          {/* 4. PAGINAÇÃO */}
          {/* ========================================== */}

          {totalPaginas > 1 && (
            <nav
              aria-label="Paginação das aparições"
              className="mt-12 flex flex-wrap items-center justify-center gap-2"
            >
              {/* ANTERIOR */}
              <button
                type="button"
                onClick={() =>
                  setPaginaSolicitada(paginaAtual - 1)
                }
                disabled={paginaAtual === 1}
                aria-label="Página anterior"
                className="flex h-10 min-w-10 items-center justify-center rounded-md border border-[#c9a46a]/70 bg-[#fffaf0] px-3 font-serif text-[#14233f] transition hover:bg-[#f1e2c6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ‹
              </button>

              {/* NÚMEROS DAS PÁGINAS */}
              {paginasVisiveis.map((numero) => (
                <button
                  key={numero}
                  type="button"
                  onClick={() =>
                    setPaginaSolicitada(numero)
                  }
                  aria-label={`Ir para a página ${numero}`}
                  aria-current={
                    numero === paginaAtual
                      ? "page"
                      : undefined
                  }
                  className={`flex h-10 min-w-10 items-center justify-center rounded-md border px-3 font-serif text-sm transition ${
                    numero === paginaAtual
                      ? "border-[#14233f] bg-[#14233f] text-[#fffaf0]"
                      : "border-[#c9a46a]/70 bg-[#fffaf0] text-[#594936] hover:bg-[#f1e2c6]"
                  }`}
                >
                  {numero}
                </button>
              ))}

              {/* PRÓXIMA */}
              <button
                type="button"
                onClick={() =>
                  setPaginaSolicitada(paginaAtual + 1)
                }
                disabled={paginaAtual === totalPaginas}
                aria-label="Próxima página"
                className="flex h-10 min-w-10 items-center justify-center rounded-md border border-[#c9a46a]/70 bg-[#fffaf0] px-3 font-serif text-[#14233f] transition hover:bg-[#f1e2c6] disabled:cursor-not-allowed disabled:opacity-40"
              >
                ›
              </button>
            </nav>
          )}

          {/* INDICADOR DA PÁGINA ATUAL */}
          {totalPaginas > 1 && (
            <p className="mt-4 text-center font-serif text-sm text-[#765728]">
              Página {paginaAtual} de {totalPaginas}
            </p>
          )}
        </>
      ) : (
        /* ========================================== */
        /* NENHUM RESULTADO */
        /* ========================================== */

        <div className="rounded-md border border-[#c9a46a]/60 bg-[#fffaf0]/80 px-6 py-16 text-center shadow-sm">
          <span
            aria-hidden="true"
            className="font-serif text-5xl text-[#b28b49]"
          >
            ✦
          </span>

          <h3 className="mt-5 font-serif text-2xl font-semibold text-[#14233f]">
            Nenhuma aparição encontrada
          </h3>

          <p className="mx-auto mt-3 max-w-lg font-serif text-base leading-7 text-[#765728]">
            {aparicoes.length === 0
              ? "Ainda não existem aparições publicadas."
              : "Não encontramos aparições para os filtros selecionados. Experimente outra pesquisa."}
          </p>

          {aparicoes.length > 0 && possuiFiltros && (
            <button
              type="button"
              onClick={limparFiltros}
              className="mt-6 rounded-md bg-[#14233f] px-6 py-3 font-serif text-sm font-semibold text-[#fffaf0] transition hover:bg-[#263e61]"
            >
              Mostrar todas as aparições
            </button>
          )}
        </div>
      )}
    </section>
  );
}
