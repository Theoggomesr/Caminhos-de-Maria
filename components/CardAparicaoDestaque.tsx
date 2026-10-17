
import Link from "next/link";
import type { AparicaoPublica } from "@/lib/aparicoes";

type Props = {
  aparicao: AparicaoPublica;
};

export default function CardAparicaoDestaque({ aparicao }: Props) {
  return (
    <Link
      href={`/aparicoes/${aparicao.slug}`}
      className="group block overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* IMAGEM DA APARIÇÃO */}
      <div className="relative h-52 w-full overflow-hidden bg-[#14233f]">
        {aparicao.imagem_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={aparicao.imagem_url}
            alt={`Imagem de ${aparicao.nome}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span
              className="font-serif text-6xl text-[#d5b685]"
              aria-hidden="true"
            >
              ✦
            </span>
          </div>
        )}
      </div>

      {/* INFORMAÇÕES DA APARIÇÃO */}
      <div className="space-y-1 p-4">
        <h3 className="font-serif text-lg font-semibold text-stone-900">
          {aparicao.nome}
        </h3>

        <p className="text-sm text-stone-500">
          {[aparicao.local, aparicao.pais]
            .filter(Boolean)
            .join(", ")}
        </p>

        {aparicao.periodo && (
          <p className="text-xs text-stone-400">
            {aparicao.periodo}
          </p>
        )}
      </div>
    </Link>
  );
}
