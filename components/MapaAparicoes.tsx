
"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type {
  FeatureCollection,
  Geometry,
} from "geojson";

import mundo from "world-atlas/countries-110m.json";

import type { AparicaoPublica } from "@/lib/aparicoes";

// ======================================================
// TIPOS
// ======================================================

type Props = {
  aparicoes: AparicaoPublica[];
};

type AparicaoComLocal = AparicaoPublica & {
  latitude: number;
  longitude: number;
};

type Continente =
  | "Todos"
  | "Europa"
  | "América do Sul"
  | "América do Norte"
  | "Ásia"
  | "África"
  | "Oceania";

type FiltroPeriodo =
  | "todos"
  | "ate1800"
  | "1801a1900"
  | "apos1900";

type Hover = {
  aparicao: AparicaoComLocal;
  x: number;
  y: number;
};

// ======================================================
// CONSTANTES
// ======================================================

const CONTINENTES: Continente[] = [
  "Todos",
  "Europa",
  "América do Sul",
  "América do Norte",
  "Ásia",
  "África",
  "Oceania",
];

const topologia = mundo as unknown as Topology;

const paises = feature(
  topologia,
  topologia.objects.countries
) as FeatureCollection<Geometry>;

// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

function temCoordenadas(
  aparicao: AparicaoPublica
): aparicao is AparicaoComLocal {
  return (
    typeof aparicao.latitude === "number" &&
    typeof aparicao.longitude === "number" &&
    Number.isFinite(aparicao.latitude) &&
    Number.isFinite(aparicao.longitude) &&
    aparicao.latitude >= -90 &&
    aparicao.latitude <= 90 &&
    aparicao.longitude >= -180 &&
    aparicao.longitude <= 180
  );
}

// Classificação geográfica aproximada
function obterContinente(
  latitude: number,
  longitude: number
): Exclude<Continente, "Todos"> | null {
  // Oceania
  if (
    latitude <= 0 &&
    longitude >= 110 &&
    longitude <= 180
  ) {
    return "Oceania";
  }

  if (longitude >= 100 && latitude < -10) {
    return "Oceania";
  }

  // América do Sul
  if (
    latitude <= 13 &&
    latitude >= -57 &&
    longitude >= -82 &&
    longitude <= -34
  ) {
    return "América do Sul";
  }

  // América do Norte
  if (
    latitude >= 7 &&
    latitude <= 84 &&
    longitude >= -170 &&
    longitude <= -52
  ) {
    return "América do Norte";
  }

  // África
  if (
    latitude >= -35 &&
    latitude <= 38 &&
    longitude >= -18 &&
    longitude <= 52
  ) {
    return "África";
  }

  // Europa
  if (
    latitude >= 35 &&
    latitude <= 72 &&
    longitude >= -25 &&
    longitude <= 45
  ) {
    return "Europa";
  }

  // Ásia
  if (
    latitude >= -12 &&
    latitude <= 82 &&
    longitude >= 26 &&
    longitude <= 180
  ) {
    return "Ásia";
  }

  return null;
}

// Extrai um ano do período
function extrairAno(
  periodo: string | null | undefined
) {
  if (!periodo) return null;

  const resultado = periodo.match(
    /(?:1[0-9]{3}|20[0-9]{2})/
  );

  return resultado ? Number(resultado[0]) : null;
}

// Filtragem por período
function correspondePeriodo(
  periodo: string | null | undefined,
  filtro: FiltroPeriodo
) {
  if (filtro === "todos") return true;

  const ano = extrairAno(periodo);

  if (ano === null) return false;

  if (filtro === "ate1800") {
    return ano <= 1800;
  }

  if (filtro === "1801a1900") {
    return ano >= 1801 && ano <= 1900;
  }

  return ano > 1900;
}

// ======================================================
// ORNAMENTO DOURADO
// ======================================================

function Ornamento() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center gap-3 text-[#b28b49]"
    >
      <span className="h-px flex-1 bg-[#b28b49]/70" />

      <svg
        viewBox="0 0 40 40"
        className="h-7 w-7 shrink-0"
        fill="currentColor"
      >
        <path
          d="M20 2C22 12 28 18 38 20C28 22 22 28 20 38C18 28 12 22 2 20C12 18 18 12 20 2Z"
        />

        <circle
          cx="20"
          cy="20"
          r="4"
          fill="#f7f0df"
        />
      </svg>

      <span className="h-px flex-1 bg-[#b28b49]/70" />
    </div>
  );
}

// ======================================================
// CARD DAS APARIÇÕES EM DESTAQUE
// ======================================================

function CardAparicao({
  aparicao,
}: {
  aparicao: AparicaoPublica;
}) {
  const [erroImagem, setErroImagem] = useState(false);

  return (
    <div className="overflow-hidden rounded-md border border-[#c9a46a]/50 bg-[#fffaf0] shadow-md">
      {aparicao.imagem_url && !erroImagem ? (
        <div className="h-40 overflow-hidden bg-[#e9ddc8]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={aparicao.imagem_url}
            alt={`Imagem de ${aparicao.nome}`}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            loading="lazy"
            onError={() => setErroImagem(true)}
          />
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center bg-[#e9ddc8] font-serif text-4xl text-[#b28b49]">
          ✦
        </div>
      )}

      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold leading-snug text-[#14233f]">
          {aparicao.nome}
        </h3>

        {aparicao.descricao && (
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6b5a42]">
            {aparicao.descricao}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#c9a46a]/30 pt-3 text-xs text-[#765728]">
          <span>
            ✦{" "}
            {[aparicao.local, aparicao.pais]
              .filter(Boolean)
              .join(", ")}
          </span>

          {aparicao.periodo && (
            <span>◷ {aparicao.periodo}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ======================================================
// CARD DE HOVER DOS MARCADORES
// ======================================================

function CardHover({
  aparicao,
}: {
  aparicao: AparicaoComLocal;
}) {
  return (
    <div className="w-48 overflow-hidden rounded-md border border-[#b28b49] bg-[#fff8e9] shadow-xl">
      {aparicao.imagem_url && (
        <div className="h-24 overflow-hidden bg-[#e9ddc8]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={aparicao.imagem_url}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="p-3">
        <p className="font-serif text-sm font-semibold text-[#14233f]">
          {aparicao.nome}
        </p>

        <p className="mt-1 text-xs text-[#765728]">
          {[aparicao.local, aparicao.pais]
            .filter(Boolean)
            .join(", ")}
        </p>

        <p className="mt-2 text-[11px] text-[#a97c2f]">
          Clique para conhecer →
        </p>
      </div>
    </div>
  );
}

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export default function MapaAparicoes({
  aparicoes,
}: Props) {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);

  const [busca, setBusca] = useState("");

  const [continente, setContinente] =
    useState<Continente>("Todos");

  const [periodo, setPeriodo] =
    useState<FiltroPeriodo>("todos");

  const [hover, setHover] = useState<Hover | null>(
    null
  );

  // ====================================================
  // FILTRAGEM
  // ====================================================

  const aparicoesFiltradas = useMemo(() => {
    const termo = busca
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    return aparicoes.filter((aparicao) => {
      const texto = [
        aparicao.nome,
        aparicao.local,
        aparicao.pais,
      ]
        .filter(Boolean)
        .join(" ")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

      const correspondeBusca =
        !termo || texto.includes(termo);

      const correspondeContinente =
        continente === "Todos" ||
        (temCoordenadas(aparicao) &&
          obterContinente(
            aparicao.latitude,
            aparicao.longitude
          ) === continente);

      return (
        correspondeBusca &&
        correspondeContinente &&
        correspondePeriodo(
          aparicao.periodo,
          periodo
        )
      );
    });
  }, [aparicoes, busca, continente, periodo]);

  const aparicoesNoMapa =
    aparicoesFiltradas.filter(temCoordenadas);

  const destaques = aparicoesFiltradas.slice(0, 4);

  // ====================================================
  // CARD DO MARCADOR
  // ====================================================

  function mostrarCard(
    event: React.MouseEvent<SVGGElement>,
    aparicao: AparicaoComLocal
  ) {
    const container = containerRef.current;

    if (!container) return;

    const pino =
      event.currentTarget.getBoundingClientRect();

    const caixa = container.getBoundingClientRect();

    const x =
      pino.left + pino.width / 2 - caixa.left;

    const y = pino.top - caixa.top;

    setHover({
      aparicao,
      x: Math.max(
        105,
        Math.min(x, caixa.width - 105)
      ),
      y,
    });
  }

  function limparFiltros() {
    setBusca("");
    setContinente("Todos");
    setPeriodo("todos");
    setHover(null);
  }

  // ====================================================
  // RENDERIZAÇÃO
  // ====================================================

  return (
    <div className="space-y-12">

      {/* ============================================== */}
      {/* FILTROS E MAPA */}
      {/* ============================================== */}

      <div className="grid items-start gap-6 lg:grid-cols-[230px_minmax(0,1fr)]">

        {/* PAINEL DE FILTROS */}
        <aside className="overflow-hidden rounded-md border border-[#c9a46a]/50 bg-[#fffaf0]/85 shadow-sm">

          <div className="bg-[#14233f] px-5 py-4">
            <h2 className="font-serif text-lg font-semibold text-[#f7f0df]">
              <span className="mr-2 text-[#d5b685]">
                ✦
              </span>
              Filtros do Mapa
            </h2>
          </div>

          <div className="space-y-7 p-5">

            {/* PESQUISA */}
            <div>
              <label
                htmlFor="busca-aparicao-mapa"
                className="block font-serif text-sm font-semibold text-[#14233f]"
              >
                Buscar aparição
              </label>

              <input
                id="busca-aparicao-mapa"
                type="search"
                value={busca}
                onChange={(event) => {
                  setBusca(event.target.value);
                  setHover(null);
                }}
                placeholder="Nome, local ou país..."
                className="mt-3 w-full rounded-md border border-[#c9a46a]/60 bg-[#fffaf0] px-3 py-2.5 text-sm text-[#14233f] outline-none placeholder:text-[#9a8a73] focus:border-[#a97c2f] focus:ring-2 focus:ring-[#c9a46a]/30"
              />
            </div>

            {/* CONTINENTES */}
            <div className="border-t border-[#c9a46a]/30 pt-5">
              <p className="font-serif text-sm font-semibold text-[#14233f]">
                Continentes
              </p>

              <div className="mt-3 space-y-2">
                {CONTINENTES.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-2 text-sm text-[#594936]"
                  >
                    <input
                      type="radio"
                      name="continente-mapa"
                      checked={continente === item}
                      onChange={() => {
                        setContinente(item);
                        setHover(null);
                      }}
                      className="accent-[#14233f]"
                    />

                    {item === "Todos"
                      ? "Todos os continentes"
                      : item}
                  </label>
                ))}
              </div>
            </div>

            {/* PERÍODO */}
            <div className="border-t border-[#c9a46a]/30 pt-5">
              <label
                htmlFor="periodo-mapa"
                className="block font-serif text-sm font-semibold text-[#14233f]"
              >
                Período
              </label>

              <select
                id="periodo-mapa"
                value={periodo}
                onChange={(event) => {
                  setPeriodo(
                    event.target.value as FiltroPeriodo
                  );
                  setHover(null);
                }}
                className="mt-3 w-full rounded-md border border-[#c9a46a]/60 bg-[#fffaf0] px-3 py-2.5 text-sm text-[#14233f] focus:outline-none focus:ring-2 focus:ring-[#c9a46a]/30"
              >
                <option value="todos">
                  Todos os períodos
                </option>

                <option value="ate1800">
                  Até 1800
                </option>

                <option value="1801a1900">
                  1801 a 1900
                </option>

                <option value="apos1900">
                  Após 1900
                </option>
              </select>
            </div>

            {/* LIMPAR FILTROS */}
            <button
              type="button"
              onClick={limparFiltros}
              className="w-full rounded-md bg-[#14233f] px-4 py-3 font-serif text-sm font-semibold text-[#f7f0df] transition hover:bg-[#243c60]"
            >
              Limpar filtros
            </button>

            <p className="text-xs leading-5 text-[#765728]">
              Os filtros atualizam o mapa e os cards
              automaticamente.
            </p>
          </div>
        </aside>

        {/* COLUNA DO MAPA */}
        <section className="min-w-0 space-y-4">

          {/* BOTÕES DOS CONTINENTES */}
          <div className="flex flex-wrap gap-2">
            {CONTINENTES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setContinente(item);
                  setHover(null);
                }}
                aria-pressed={continente === item}
                className={`rounded-md border px-3 py-2 font-serif text-xs transition sm:text-sm ${
                  continente === item
                    ? "border-[#14233f] bg-[#14233f] text-[#fff7e8]"
                    : "border-[#c9a46a]/60 bg-[#fffaf0]/80 text-[#594936] hover:bg-[#f0e2c9]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* ============================================== */}
          {/* MAPA COM MOLDURA MEDIEVAL */}
          {/* ============================================== */}

          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-md shadow-md"
          >
            {/* MOLDURA DECORATIVA */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/imagens/moldura-mapa.png"
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill"
            />

            {/* ÁREA INTERNA COM ESPAÇAMENTO REDUZIDO */}
            <div className="relative z-1 px-3 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6">

              {/* MAPA VETORIAL */}
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 132,
                  center: [0, 18],
                }}
                width={900}
                height={500}
                className="h-auto w-full"
                aria-label="Mapa-múndi com a localização das aparições de Nossa Senhora"
              >
                {/* DESENHO DOS PAÍSES */}
                <Geographies geography={paises}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#cdb58a"
                        stroke="#f9ecd2"
                        strokeWidth={0.7}
                        style={{
                          outline: "none",
                          cursor: "default",
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* MARCADORES */}
                {aparicoesNoMapa.map((aparicao) => (
                  <Marker
                    key={aparicao.slug}
                    coordinates={[
                      aparicao.longitude,
                      aparicao.latitude,
                    ]}
                    onMouseEnter={(event) =>
                      mostrarCard(event, aparicao)
                    }
                    onMouseLeave={() => setHover(null)}
                    onClick={() => {
                      router.push(
                        `/aparicoes/${aparicao.slug}`
                      );
                    }}
                    onFocus={() => setHover(null)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();

                        router.push(
                          `/aparicoes/${aparicao.slug}`
                        );
                      }
                    }}
                    role="link"
                    tabIndex={0}
                    aria-label={`Conhecer ${aparicao.nome}`}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <circle
                      r={10}
                      fill="#14233f"
                      stroke="#b28b49"
                      strokeWidth={2}
                    />

                    <path
                      d="M0 -6 V6 M-4 0 H4"
                      fill="none"
                      stroke="#f1d397"
                      strokeWidth={1.7}
                      strokeLinecap="round"
                    />
                  </Marker>
                ))}
              </ComposableMap>

              {/* ROSA DOS VENTOS */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-5 left-5 z-2 flex h-16 w-16 items-center justify-center rounded-full border border-[#a97c2f]/60 bg-[#f7e9cd]/90 font-serif text-4xl text-[#a97c2f] sm:h-20 sm:w-20"
              >
                ✧

                <span className="absolute top-1 text-[10px]">
                  N
                </span>
              </div>

              {/* CARD AO PASSAR O MOUSE */}
              {hover && (
                <div
                  className="pointer-events-none absolute z-20 hidden md:block"
                  style={{
                    left: hover.x,
                    top: hover.y,
                    transform:
                      hover.y < 150
                        ? "translate(-50%, 14px)"
                        : "translate(-50%, calc(-100% - 10px))",
                  }}
                >
                  <CardHover
                    key={hover.aparicao.slug}
                    aparicao={hover.aparicao}
                  />
                </div>
              )}
            </div>
          </div>

          {/* CONTADOR DE APARIÇÕES */}
          <div className="flex flex-wrap items-center justify-between gap-3 font-serif text-sm text-[#765728]">
            <p>
              <span className="font-semibold text-[#14233f]">
                {aparicoesNoMapa.length}
              </span>{" "}
              {aparicoesNoMapa.length === 1
                ? "aparição localizada no mapa"
                : "aparições localizadas no mapa"}
            </p>

            <p>
              Selecione um marcador para conhecer a história.
            </p>
          </div>

          {/* NENHUM RESULTADO */}
          {aparicoesNoMapa.length === 0 && (
            <p
              role="status"
              className="rounded-md border border-[#c9a46a]/50 bg-[#fffaf0] px-4 py-3 text-sm text-[#765728]"
            >
              Nenhuma aparição com coordenadas foi
              encontrada para esses filtros.
            </p>
          )}
        </section>
      </div>

      {/* ============================================== */}
      {/* APARIÇÕES EM DESTAQUE */}
      {/* ============================================== */}

      <section aria-labelledby="titulo-destaques">
        <div className="mb-7">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="titulo-destaques"
              className="font-serif text-3xl font-semibold text-[#14233f] sm:text-4xl"
            >
              Aparições em Destaque
            </h2>

            <Link
              href="/aparicoes"
              className="font-serif text-sm text-[#765728] transition hover:text-[#14233f] hover:underline"
            >
              Ver todas as aparições →
            </Link>
          </div>

          <Ornamento />
        </div>

        {destaques.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {destaques.map((aparicao) => (
              <Link
                key={aparicao.slug}
                href={`/aparicoes/${aparicao.slug}`}
                className="group block min-w-0 transition hover:-translate-y-1"
              >
                <CardAparicao aparicao={aparicao} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-md border border-[#c9a46a]/50 bg-[#fffaf0] p-7 text-center font-serif text-[#765728]">
            Nenhuma aparição encontrada para os filtros
            selecionados.
          </div>
        )}
      </section>
    </div>
  );
}
