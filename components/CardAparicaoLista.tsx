import Image from "next/image";
import Link from "next/link";
import type { Aparicao } from "@/types/aparicao";

export default function CardAparicaoLista({ aparicao }: { aparicao: Aparicao }) {
  const imagem =
    aparicao.imagens?.find((img) => img.cardMapa) ?? aparicao.imagens?.[0];

  return (
    <Link
      href={`/aparicoes/${aparicao.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-[#c9a46a]/70 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-44 w-full bg-sky-100">
        {imagem && (
          <Image
            src={imagem.src}
            alt={imagem.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            style={{ objectPosition: imagem.posicao ?? "50% 50%" }}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col items-start gap-1 p-4">
        <h2 className="font-serif text-lg font-bold leading-snug text-stone-900">
          {aparicao.nome}
        </h2>
        <p className="text-sm text-stone-600">
          {aparicao.ano ? `${aparicao.ano}, ` : ""}
          {aparicao.pais}
        </p>

        <span className="mt-auto self-center rounded-full border border-stone-300 bg-stone-100 px-4 py-1 text-xs text-stone-700 group-hover:bg-stone-200">
          Ler mais
        </span>
      </div>
    </Link>
  );
}