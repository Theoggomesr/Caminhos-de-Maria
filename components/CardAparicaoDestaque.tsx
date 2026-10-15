import Image from "next/image";
import Link from "next/link";
import type { Aparicao } from "@/types/aparicao";

type Props = {
  aparicao: Aparicao;
};

export default function CardAparicaoDestaque({ aparicao }: Props) {
  const imagem =
    aparicao.imagens?.find((img) => img.cardMapa) ?? aparicao.imagens?.[0];

  return (
    <Link
      href={`/aparicoes/${aparicao.slug}`}
      className="group block overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-52 w-full bg-sky-100">
        {imagem && (
          <Image
            src={imagem.src}
            alt={imagem.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-300 group-hover:scale-105"
            style={{ objectPosition: imagem.posicao ?? "50% 50%" }}
          />
        )}
      </div>

      <div className="space-y-1 p-4">
        <h3 className="font-serif text-lg font-semibold text-stone-900">
          {aparicao.nome}
        </h3>
        <p className="text-sm text-stone-500">
          {aparicao.local}, {aparicao.pais}
        </p>
        <p className="text-xs text-stone-400">{aparicao.periodo}</p>
      </div>
    </Link>
  );
}