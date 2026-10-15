import Link from "next/link";
import { linhaDoTempo } from "@/content/aparicoes";

export default function LinhaDoTempo() {
  return (
    <ol className="relative ml-3 border-l-2 border-amber-700/40">
      {linhaDoTempo.map((a) => (
        <li key={a.slug} className="mb-10 ml-8 last:mb-0">
          <span className="absolute -left-[9px] mt-2 h-4 w-4 rounded-full border-2 border-white bg-amber-600" />

          <time className="font-serif text-2xl font-semibold text-sky-900">
            {a.ano}
          </time>

          <Link
            href={`/aparicoes/${a.slug}`}
            className="mt-2 block rounded-xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="font-serif text-lg font-semibold text-stone-900">
              {a.nome}
            </h3>
            <p className="text-sm text-stone-500">
              {a.local}, {a.pais}
            </p>
            <p className="mt-1 text-xs text-stone-400">{a.periodo}</p>
          </Link>
        </li>
      ))}
    </ol>
  );
}