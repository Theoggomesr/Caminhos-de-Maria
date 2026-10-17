
"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import type { FeatureCollection, Geometry } from "geojson";

import mundo from "world-atlas/countries-110m.json";

import type { AparicaoPublica } from "@/lib/aparicoes";

// PROPRIEDADES DO COMPONENTE
type Props = {
  aparicoes: AparicaoPublica[];
};

// Aparições com coordenadas válidas
type AparicaoComLocal = AparicaoPublica & {
  latitude: number;
  longitude: number;
};

// Informações do card exibido ao passar o mouse
type Hover = {
  aparicao: AparicaoComLocal;
  x: number;
  y: number;
};

// CONVERSÃO DE TOPOJSON PARA GEOJSON
const topologia = mundo as unknown as Topology;

const paises = feature(
  topologia,
  topologia.objects.countries
) as FeatureCollection<Geometry>;

// CARD DA APARIÇÃO
function CardAparicao({
  aparicao,
}: {
  aparicao: AparicaoComLocal;
}) {
  const [erroImagem, setErroImagem] = useState(false);

  return (
    <div className="w-48 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-lg">

      {/* IMAGEM DA APARIÇÃO */}
      {aparicao.imagem_url && !erroImagem && (
        <div className="relative h-32 w-full overflow-hidden bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={aparicao.imagem_url}
            alt={`Imagem de ${aparicao.nome}`}
            className="h-full w-full object-cover"
            onError={() => setErroImagem(true)}
          />
        </div>
      )}

      {/* INFORMAÇÕES DA APARIÇÃO */}
      <div className="px-3 py-2">
        <p className="text-sm font-semibold text-stone-900">
          {aparicao.nome}
        </p>

        <p className="text-xs text-stone-500">
          {[aparicao.local, aparicao.pais]
            .filter(Boolean)
            .join(", ")}
        </p>
      </div>
    </div>
  );
}

// COMPONENTE PRINCIPAL DO MAPA
export default function MapaAparicoes({ aparicoes }: Props) {
  const router = useRouter();

  const containerRef = useRef<HTMLDivElement>(null);

  const [hover, setHover] = useState<Hover | null>(null);

  // Filtra aparições com coordenadas válidas
  const comLocal = aparicoes.filter(
    (a): a is AparicaoComLocal =>
      a.latitude !== null &&
      a.longitude !== null &&
      Number.isFinite(a.latitude) &&
      Number.isFinite(a.longitude) &&
      a.latitude >= -90 &&
      a.latitude <= 90 &&
      a.longitude >= -180 &&
      a.longitude <= 180
  );

  // Exibe o card ao passar o mouse sobre o marcador
  function mostrarCard(
    event: React.MouseEvent<SVGGElement>,
    aparicao: AparicaoComLocal
  ) {
    const container = containerRef.current;

    if (!container) return;

    const pino = event.currentTarget.getBoundingClientRect();
    const caixa = container.getBoundingClientRect();

    setHover({
      aparicao,
      x: pino.left + pino.width / 2 - caixa.left,
      y: pino.top - caixa.top,
    });
  }

  // Posiciona o card abaixo do marcador
  // quando estiver próximo ao topo do mapa
  const cardEmbaixo = hover ? hover.y < 190 : false;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-stone-200 bg-sky-100"
    >
      {/* MAPA-MÚNDI */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 120 }}
      >

        {/* DESENHO DOS PAÍSES */}
        <Geographies geography={paises}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1e3a5f"
                stroke="#dbeafe"
                strokeWidth={0.4}
                style={{
                  outline: "none",
                  cursor: "default",
                }}
              />
            ))
          }
        </Geographies>

        {/* MARCADORES DAS APARIÇÕES */}
        {comLocal.map((a) => (
          <Marker
            key={a.slug}
            coordinates={[a.longitude, a.latitude]}
            onMouseEnter={(e) => mostrarCard(e, a)}
            onMouseLeave={() => setHover(null)}
            onClick={() => {
              router.push(`/aparicoes/${a.slug}`);
            }}
            style={{
              cursor: "pointer",
            }}
          >
            <circle
              r={5}
              fill="#b8892b"
              stroke="#ffffff"
              strokeWidth={1.5}
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* CARD EXIBIDO AO PASSAR O MOUSE */}
      {hover && (
        <div
          className="pointer-events-none absolute z-10"
          style={{
            left: hover.x,
            top: hover.y,
            transform: cardEmbaixo
              ? "translate(-50%, 14px)"
              : "translate(-50%, calc(-100% - 8px))",
          }}
        >
          <CardAparicao
            key={hover.aparicao.slug}
            aparicao={hover.aparicao}
          />
        </div>
      )}
    </div>
  );
}
