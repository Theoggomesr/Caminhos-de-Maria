"use client";

import { useMemo, useState } from "react";
import type { Aparicao, Continente } from "@/types/aparicao";
import CardAparicaoLista from "./CardAparicaoLista";

const CONTINENTES: Continente[] = ["Europa", "América", "Ásia", "África"];

function normalizar(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

type Props = {
  aparicoes: Aparicao[];
  buscaInicial?: string;
};

export default function ListaAparicoes({ aparicoes, buscaInicial = "" }: Props) {
  const [busca, setBusca] = useState(buscaInicial);
  const [continente, setContinente] = useState<Continente | null>(null);

  const filtradas = useMemo(() => {
    const termo = normalizar(busca.trim());

    return aparicoes.filter((a) => {
      if (continente && a.continente !== continente) return false;
      if (!termo) return true;

      return normalizar(
        `${a.nome} ${a.titulo} ${a.local} ${a.pais}`,
      ).includes(termo);
    });
  }, [aparicoes, busca, continente]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <h1 className="font-serif text-3xl font-bold text-stone-900">
          Todas as Aparições
        </h1>

        <label className="flex w-full max-w-xs items-center gap-2 rounded-full border border-[#c9a46a]/70 bg-white/70 px-4 py-2">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0 text-stone-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquise uma aparição..."
            aria-label="Pesquisar aparição"
            className="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-500"
          />
        </label>

        <div className="flex flex-wrap gap-2 md:ml-auto">
          {CONTINENTES.map((c) => {
            const ativo = continente === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={ativo}
                onClick={() => setContinente(ativo ? null : c)}
                className={`rounded-full border px-4 py-1 text-sm transition ${
                  ativo
                    ? "border-sky-900 bg-sky-900 text-white"
                    : "border-stone-300 bg-white text-stone-700 hover:border-stone-500"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {filtradas.length > 0 ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtradas.map((a) => (
            <CardAparicaoLista key={a.slug} aparicao={a} />
          ))}
        </div>
      ) : (
        <p className="mt-10 text-stone-600">
          Nenhuma aparição encontrada. Tente outro termo ou limpe o filtro.
        </p>
      )}
    </div>
  );
}