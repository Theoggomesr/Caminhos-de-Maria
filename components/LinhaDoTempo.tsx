
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { AparicaoPublica } from "@/lib/aparicoes";

// ======================================================
// TIPOS
// ======================================================

type Props = {
  aparicoes: AparicaoPublica[];
};

type FiltroPeriodo =
  | "todos"
  | "ate1000"
  | "1001a1500"
  | "1501a1800"
  | "1801a1900"
  | "apos1900";

type OpcaoPeriodo = {
  valor: FiltroPeriodo;
  label: string;
};

// ======================================================
// CONSTANTES
// ======================================================

const PERIODOS: OpcaoPeriodo[] = [
  {
    valor: "todos",
    label: "Todos",
  },
  {
    valor: "ate1000",
    label: "Até 1000",
  },
  {
    valor: "1001a1500",
    label: "1001 – 1500",
  },
  {
    valor: "1501a1800",
    label: "1501 – 1800",
  },
  {
    valor: "1801a1900",
    label: "1801 – 1900",
  },
  {
    valor: "apos1900",
    label: "Após 1900",
  },
];

// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

function normalizarTexto(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function correspondePeriodo(
  ano: number,
  periodo: FiltroPeriodo
) {
  switch (periodo) {
    case "ate1000":
      return ano <= 1000;

    case "1001a1500":
      return ano >= 1001 && ano <= 1500;

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

function numeroRomano(numero: number) {
  const simbolos = [
    { valor: 1000, romano: "M" },
    { valor: 900, romano: "CM" },
    { valor: 500, romano: "D" },
    { valor: 400, romano: "CD" },
    { valor: 100, romano: "C" },
    { valor: 90, romano: "XC" },
    { valor: 50, romano: "L" },
    { valor: 40, romano: "XL" },
    { valor: 10, romano: "X" },
    { valor: 9, romano: "IX" },
    { valor: 5, romano: "V" },
    { valor: 4, romano: "IV" },
    { valor: 1, romano: "I" },
  ];

  let restante = numero;
  let resultado = "";

  for (const simbolo of simbolos) {
    while (restante >= simbolo.valor) {
      resultado += simbolo.romano;
      restante -= simbolo.valor;
    }
  }

  return resultado;
}

function obterSeculo(ano: number) {
  if (ano <= 0) {
    return "Data histórica";
  }

  const seculo = Math.ceil(ano / 100);

  return `Século ${numeroRomano(seculo)}`;
}

// ======================================================
// ORNAMENTO
// ======================================================

function Ornamento() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-3 text-[#b28b49]"
    >
      <span className="h-px w-16 bg-[#b28b49]/60 sm:w-24" />

      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8 shrink-0"
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

      <span className="h-px w-16 bg-[#b28b49]/60 sm:w-24" />
    </div>
  );
}

// ======================================================
// IMAGEM DO ACONTECIMENTO
// ======================================================

function ImagemAparicao({
  aparicao,
}: {
  aparicao: AparicaoPublica;
}) {
  const [erroImagem, setErroImagem] = useState(false);

  return (
    <Link
      href={`/aparicoes/${aparicao.slug}`}
      aria-label={`Conhecer ${aparicao.nome}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-md border border-[#c9a46a]/70 bg-[#e8d7b9] p-1.5 shadow-sm transition duration-300 group-hover:border-[#a97c2f] group-hover:shadow-md">

        <div className="relative h-48 overflow-hidden rounded-sm bg-[#eadbc1] sm:h-56 lg:h-60">

          {aparicao.imagem_url && !erroImagem ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={aparicao.imagem_url}
                alt={`Imagem de ${aparicao.nome}`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={() => setErroImagem(true)}
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#eadbc1]">
              <span
                aria-hidden="true"
                className="font-serif text-7xl text-[#b28b49]"
              >
                ✦
              </span>
            </div>
          )}

          {/* DETALHES DOURADOS NOS CANTOS */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-2 top-1 font-serif text-xl text-[#d5b685] drop-shadow"
          >
            ✦
          </span>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-1 font-serif text-xl text-[#d5b685] drop-shadow"
          >
            ✦
          </span>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 left-2 font-serif text-xl text-[#d5b685] drop-shadow"
          >
            ✦
          </span>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 right-2 font-serif text-xl text-[#d5b685] drop-shadow"
          >
            ✦
          </span>

        </div>
      </div>
    </Link>
  );
}

// ======================================================
// TEXTO DO ACONTECIMENTO
// ======================================================

function InformacoesAparicao({
  aparicao,
  alinhamento = "esquerda",
}: {
  aparicao: AparicaoPublica;
  alinhamento?: "esquerda" | "direita";
}) {
  const ano = aparicao.ano;

  if (ano === null || ano === undefined) {
    return null;
  }

  const alinhadoDireita = alinhamento === "direita";

  return (
    <div
      className={`flex h-full min-w-0 flex-col justify-center ${
        alinhadoDireita
          ? "lg:items-end lg:text-right"
          : "lg:items-start lg:text-left"
      }`}
    >
      {/* ETIQUETA DO ANO */}
      <time
        dateTime={String(ano)}
        className="inline-block w-fit border-x-2 border-[#b28b49] bg-[#e6c78d] px-5 py-1.5 font-serif text-sm font-semibold tracking-wide text-[#513b1f] shadow-sm"
      >
        ANO {ano}
      </time>

      {/* SÉCULO */}
      <p className="mt-3 font-serif text-sm italic text-[#846b46]">
        {obterSeculo(ano)}
      </p>

      {/* NOME DA APARIÇÃO */}
      <h3 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#14233f] sm:text-3xl">
        {aparicao.nome}
      </h3>

      {/* LOCAL */}
      <p
        className={`mt-3 flex flex-wrap items-center gap-2 font-serif text-sm text-[#765728] sm:text-base ${
          alinhadoDireita
            ? "lg:justify-end"
            : "lg:justify-start"
        }`}
      >
        <span
          aria-hidden="true"
          className="text-[#b28b49]"
        >
          ✦
        </span>

        {[aparicao.local, aparicao.pais]
          .filter(Boolean)
          .join(", ")}
      </p>

      {/* DESCRIÇÃO */}
      {aparicao.descricao && (
        <p className="mt-4 line-clamp-4 max-w-lg whitespace-pre-line font-serif text-base leading-7 text-[#594936]">
          {aparicao.descricao}
        </p>
      )}

      {/* LINK PARA A HISTÓRIA */}
      <Link
        href={`/aparicoes/${aparicao.slug}`}
        className="mt-4 inline-flex w-fit items-center gap-2 border-b border-transparent font-serif text-base font-semibold text-[#14233f] transition hover:border-[#b28b49] hover:text-[#a97c2f]"
      >
        Conhecer a história

        <span aria-hidden="true">
          →
        </span>
      </Link>
    </div>
  );
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export default function LinhaDoTempo({
  aparicoes,
}: Props) {
  const [busca, setBusca] = useState("");

  const [periodo, setPeriodo] =
    useState<FiltroPeriodo>("todos");

  // Mantém apenas aparições com ano numérico válido.
  // Cria uma cópia antes de ordenar para não alterar
  // o array recebido do componente servidor.
  const itens = useMemo(() => {
    return [...aparicoes]
      .filter(
        (aparicao) =>
          typeof aparicao.ano === "number" &&
          Number.isFinite(aparicao.ano)
      )
      .sort(
        (a, b) =>
          (a.ano ?? 0) - (b.ano ?? 0)
      );
  }, [aparicoes]);

  // ====================================================
  // PESQUISA E FILTRO DE PERÍODO
  // ====================================================

  const itensFiltrados = useMemo(() => {
    const termo = normalizarTexto(busca.trim());

    return itens.filter((aparicao) => {
      const textoBusca = normalizarTexto(
        [
          aparicao.nome,
          aparicao.local,
          aparicao.pais,
        ]
          .filter(Boolean)
          .join(" ")
      );

      const correspondeBusca =
        termo === "" || textoBusca.includes(termo);

      const correspondeFaixa =
        aparicao.ano !== null &&
        correspondePeriodo(aparicao.ano, periodo);

      return correspondeBusca && correspondeFaixa;
    });
  }, [itens, busca, periodo]);

  function limparFiltros() {
    setBusca("");
    setPeriodo("todos");
  }

  return (
    <div>
      {/* ========================================== */}
      {/* PAINEL DE FILTROS */}
      {/* ========================================== */}

      <div className="rounded-lg border border-[#c9a46a]/50 bg-[#fffaf0]/75 p-4 shadow-sm sm:p-5">

        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

          {/* PERÍODOS */}
          <div className="flex flex-wrap items-center gap-2">

            <span className="mr-2 font-serif text-sm font-semibold text-[#594936]">
              Filtrar por período:
            </span>

            {PERIODOS.map((opcao) => (
              <button
                key={opcao.valor}
                type="button"
                onClick={() => setPeriodo(opcao.valor)}
                aria-pressed={periodo === opcao.valor}
                className={`rounded-full border px-4 py-2 font-serif text-sm transition ${
                  periodo === opcao.valor
                    ? "border-[#b28b49] bg-[#14233f] text-[#f7f0df] shadow-sm"
                    : "border-[#c9a46a]/70 bg-[#fff7e8] text-[#594936] hover:bg-[#f1e2c6]"
                }`}
              >
                {opcao.label}
              </button>
            ))}
          </div>

          {/* PESQUISA */}
          <div className="w-full xl:max-w-xs">

            <label
              htmlFor="pesquisa-linha-tempo"
              className="sr-only"
            >
              Pesquisar aparição, local ou país
            </label>

            <input
              id="pesquisa-linha-tempo"
              type="search"
              value={busca}
              onChange={(event) =>
                setBusca(event.target.value)
              }
              placeholder="Pesquisar aparição, local ou país..."
              className="w-full rounded-full border border-[#c9a46a]/70 bg-[#fffaf0] px-5 py-2.5 text-sm text-[#14233f] outline-none placeholder:text-[#92816a] focus:border-[#a97c2f] focus:ring-2 focus:ring-[#c9a46a]/25"
            />
          </div>

        </div>
      </div>

      {/* ========================================== */}
      {/* CONTADOR */}
      {/* ========================================== */}

      <div className="mb-10 mt-6 flex flex-wrap items-center justify-between gap-3 font-serif text-sm text-[#765728]">

        <p role="status">
          <span className="font-semibold text-[#14233f]">
            {itensFiltrados.length}
          </span>{" "}
          {itensFiltrados.length === 1
            ? "aparição encontrada"
            : "aparições encontradas"}
        </p>

        {(busca || periodo !== "todos") && (
          <button
            type="button"
            onClick={limparFiltros}
            className="underline decoration-[#c9a46a] underline-offset-4 transition hover:text-[#14233f]"
          >
            Limpar filtros
          </button>
        )}
      </div>

      {/* ========================================== */}
      {/* LINHA DO TEMPO */}
      {/* ========================================== */}

      {itensFiltrados.length > 0 ? (
        <div className="relative">

          {/* ======================================== */}
          {/* LINHA DOURADA VERTICAL — CORRIGIDA */}
          {/* ======================================== */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-4
              left-3.5
              top-4
              z-0
              w-[2px]
              lg:left-1/2
              lg:-translate-x-1/2
            "
            style={{
              backgroundImage:
                "linear-gradient(to bottom, transparent 0%, #b28b49 4%, #b28b49 96%, transparent 100%)",
            }}
          />

          {/* ======================================== */}
          {/* APARIÇÕES EM ORDEM CRONOLÓGICA */}
          {/* ======================================== */}

          <ol className="relative z-10 space-y-12 lg:space-y-16">

            {itensFiltrados.map((aparicao, index) => {
              const imagemEsquerda = index % 2 === 0;

              return (
                <li
                  key={aparicao.slug}
                  className="relative pl-10 lg:pl-0"
                >
                  {/* ================================== */}
                  {/* MARCADOR CENTRAL */}
                  {/* ================================== */}

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      left-1.5
                      top-7
                      z-10
                      flex
                      h-4.25
                      w-4.25
                      items-center
                      justify-center
                      rounded-full
                      border-[3px]
                      border-[#b28b49]
                      bg-[#f7f0df]
                      shadow-sm
                      lg:left-1/2
                      lg:-translate-x-1/2
                    "
                  >
                    <span className="h-1.75 w-1.75 rounded-full bg-[#14233f]" />
                  </span>

                  {/* ================================== */}
                  {/* IMAGEM + INFORMAÇÕES */}
                  {/* ================================== */}

                  <div className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_44px_minmax(0,1fr)] lg:items-center lg:gap-4">

                    {/* IMAGEM */}
                    <div
                      className={
                        imagemEsquerda
                          ? "min-w-0 lg:col-start-1 lg:row-start-1"
                          : "min-w-0 lg:col-start-3 lg:row-start-1"
                      }
                    >
                      <ImagemAparicao aparicao={aparicao} />
                    </div>

                    {/* TEXTO */}
                    <div
                      className={
                        imagemEsquerda
                          ? "min-w-0 lg:col-start-3 lg:row-start-1"
                          : "min-w-0 lg:col-start-1 lg:row-start-1"
                      }
                    >
                      <InformacoesAparicao
                        aparicao={aparicao}
                        alinhamento={
                          imagemEsquerda
                            ? "esquerda"
                            : "direita"
                        }
                      />
                    </div>

                  </div>
                </li>
              );
            })}

          </ol>
        </div>
      ) : (
        /* ========================================== */
        /* NENHUMA APARIÇÃO ENCONTRADA */
        /* ========================================== */

        <div className="rounded-lg border border-[#c9a46a]/50 bg-[#fffaf0]/70 px-6 py-12 text-center">

          <span
            aria-hidden="true"
            className="font-serif text-4xl text-[#b28b49]"
          >
            ✦
          </span>

          <h2 className="mt-4 font-serif text-2xl font-semibold text-[#14233f]">
            Nenhuma aparição encontrada
          </h2>

          <p className="mx-auto mt-3 max-w-md font-serif text-base leading-7 text-[#765728]">
            Não há aparições disponíveis para os filtros
            selecionados. Experimente outro período ou
            uma pesquisa diferente.
          </p>

          {(busca || periodo !== "todos") && (
            <button
              type="button"
              onClick={limparFiltros}
              className="mt-6 rounded-md bg-[#14233f] px-6 py-3 font-serif text-sm font-semibold text-[#f7f0df] transition hover:bg-[#263e61]"
            >
              Mostrar todas as aparições
            </button>
          )}

        </div>
      )}

      {/* ========================================== */}
      {/* ORNAMENTO NO FIM DA LINHA */}
      {/* ========================================== */}

      {itensFiltrados.length > 0 && (
        <div className="mt-14">
          <Ornamento />
        </div>
      )}

    </div>
  );
}
