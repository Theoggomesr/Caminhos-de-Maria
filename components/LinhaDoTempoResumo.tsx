import Link from "next/link";
import { linhaDoTempo } from "@/content/aparicoes";

export default function LinhaDoTempoResumo() {
  const itens = linhaDoTempo.slice(0, 6);

  return (
    // MUDANÇA: pt-3 dá espaço para a bolinha não ser cortada
    <div className="overflow-x-auto pb-4 pt-3">
      <ol className="relative flex w-max min-w-full">
        {/* MUDANÇA: linha única que atravessa toda a largura */}
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-0 border-t-2 border-amber-700/40"
        />

        {itens.map((a) => (
          <li
            key={a.slug}
            // MUDANÇA: removido o border-t daqui (a linha agora é a de cima)
            className="relative w-52 shrink-0 pr-6 pt-6"
          >
            {/* MUDANÇA: top ajustado de -9px para -7px, para centralizar na linha */}
            <span className="absolute -top-1.75 left-0 h-4 w-4 rounded-full border-2 border-stone-100 bg-amber-600" />

            <Link href={`/aparicoes/${a.slug}`} className="group block">
              <time className="font-serif text-xl font-semibold text-sky-900">
                {a.ano}
              </time>
              <p className="mt-1 text-sm font-medium text-stone-900 group-hover:underline">
                {a.nome}
              </p>
              <p className="text-xs text-stone-500">{a.pais}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}