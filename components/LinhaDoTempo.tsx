
import Link from "next/link";
import type { AparicaoPublica } from "@/lib/aparicoes";

type Props = {
  aparicoes: AparicaoPublica[];
};

export default function LinhaDoTempo({ aparicoes }: Props) {
  // Mantém apenas aparições com ano cadastrado
  // e organiza em ordem cronológica
  const itens = aparicoes
    .filter((a) => a.ano !== null)
    .sort((a, b) => (a.ano ?? 0) - (b.ano ?? 0));

  if (itens.length === 0) {
    return (
      <p className="text-sm text-stone-500">
        Nenhuma aparição disponível na linha do tempo.
      </p>
    );
  }

  return (
    <ol className="relative ml-3 border-l-2 border-amber-700/40">
      {itens.map((a) => (
        <li
          key={a.slug}
          className="relative mb-10 ml-8 last:mb-0"
        >
          {/* Marcador da linha do tempo */}
          <span
            aria-hidden="true"
            className="absolute -left-10.25 mt-2 h-4 w-4 rounded-full border-2 border-white bg-amber-600"
          />

          {/* Ano da aparição */}
          <time className="font-serif text-2xl font-semibold text-sky-900">
            {a.ano}
          </time>

          {/* Card da aparição */}
          <Link
            href={`/aparicoes/${a.slug}`}
            className="mt-2 block rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              {a.nome}
            </h3>

            <p className="text-sm text-stone-500">
              {[a.local, a.pais].filter(Boolean).join(", ")}
            </p>

            {a.periodo && (
              <p className="mt-1 text-xs text-stone-400">
                {a.periodo}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ol>
  );
}
