
import Link from "next/link";
import type { AparicaoPublica } from "@/lib/aparicoes";

type Props = {
  aparicoes: AparicaoPublica[];
};

export default function LinhaDoTempoResumo({ aparicoes }: Props) {
  // Ordena cronologicamente e exibe as 6 primeiras aparições
  const itens = aparicoes
    .filter((a) => a.ano !== null)
    .sort((a, b) => (a.ano ?? 0) - (b.ano ?? 0))
    .slice(0, 6);

  if (itens.length === 0) {
    return (
      <p className="text-sm text-stone-500">
        Nenhuma aparição disponível na linha do tempo.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto pb-4 pt-3">
      <ol className="relative flex w-max min-w-full">
        {/* Linha horizontal */}
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 border-t-2 border-amber-700/40"
        />

        {itens.map((a) => (
          <li
            key={a.slug}
            className="relative w-52 shrink-0 pr-6 pt-6"
          >
            {/* Marcador da linha do tempo */}
            <span
              aria-hidden="true"
              className="absolute -top-1.75 left-0 h-4 w-4 rounded-full border-2 border-stone-100 bg-amber-600"
            />

            <Link
              href={`/aparicoes/${a.slug}`}
              className="group block"
            >
              <time className="font-serif text-xl font-semibold text-sky-900">
                {a.ano}
              </time>

              <p className="mt-1 text-sm font-medium text-stone-900 group-hover:underline">
                {a.nome}
              </p>

              <p className="text-xs text-stone-500">
                {a.pais}
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
