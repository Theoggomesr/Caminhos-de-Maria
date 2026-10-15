"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import mundo from "world-atlas/countries-110m.json";
import type { Aparicao } from "@/types/aparicao";

type Props = {
  aparicoes: Aparicao[];
};

type AparicaoComLocal = Aparicao & {
  coordenadas: NonNullable<Aparicao["coordenadas"]>;
};

type Hover = {
  aparicao: AparicaoComLocal;
  x: number;
  y: number;
};

function CardAparicao({ aparicao }: { aparicao: AparicaoComLocal }) {
  const [erroImagem, setErroImagem] = useState(false);
  const imagem =
  aparicao.imagens?.find((img) => img.cardMapa) ?? aparicao.imagens?.[0];

  return (
    <div className="w-48 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-lg">
      {imagem && !erroImagem && (
        <div className="relative h-32 w-full bg-stone-100">
          <Image
            src={imagem.src}
            alt={imagem.alt}
            fill
            sizes="192px"
            className="object-cover"
            style={{ objectPosition: imagem.posicao ?? "50% 50%" }}
            onError={() => setErroImagem(true)}
          />
        </div>
      )}
      <div className="px-3 py-2">
        <p className="text-sm font-semibold text-stone-900">{aparicao.nome}</p>
        <p className="text-xs text-stone-500">
          {aparicao.local}, {aparicao.pais}
        </p>
      </div>
    </div>
  );
}

export default function MapaAparicoes({ aparicoes }: Props) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<Hover | null>(null);

  const comLocal = aparicoes.filter((a): a is AparicaoComLocal =>
    Boolean(a.coordenadas),
  );

  function mostrarCard(
    event: React.MouseEvent<SVGGElement>,
    aparicao: AparicaoComLocal,
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

  // se o pino estiver perto do topo, o card aparece embaixo dele
  const cardEmbaixo = hover ? hover.y < 190 : false;

  return (
    <div
      ref={containerRef}
      className="relative mx-auto max-w-5xl overflow-hidden rounded-xl border border-stone-200 bg-sky-100"
    >
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 120 }}>
        <Geographies geography={mundo as unknown as Record<string, unknown>}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#1e3a5f"
                stroke="#dbeafe"
                strokeWidth={0.4}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", fill: "#274b78" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {comLocal.map((a) => (
          <Marker
            key={a.slug}
            coordinates={[a.coordenadas.longitude, a.coordenadas.latitude]}
            onMouseEnter={(e) => mostrarCard(e, a)}
            onMouseLeave={() => setHover(null)}
            onClick={() => router.push(`/aparicoes/${a.slug}`)}
            style={{ default: { cursor: "pointer" } }}
          >
            <circle r={5} fill="#b8892b" stroke="#ffffff" strokeWidth={1.5} />
          </Marker>
        ))}
      </ComposableMap>

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
          <CardAparicao aparicao={hover.aparicao} />
        </div>
      )}
    </div>
  );
}