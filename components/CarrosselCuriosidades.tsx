"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Curiosidade } from "@/types/curiosidade";

function CardCuriosidade({ item }: { item: Curiosidade }) {
  const [erroImagem, setErroImagem] = useState(false);

  return (
    <article className="flex w-72 shrink-0 snap-start flex-col rounded-2xl border border-[#c9a46a]/60 bg-[#fbf8f1] p-3 shadow-md sm:w-80">
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-stone-200">
        {!erroImagem && (
          <Image
            src={item.imagem}
            alt={item.alt}
            fill
            sizes="320px"
            className="object-cover"
            onError={() => setErroImagem(true)}
          />
        )}
      </div>

      <div className="flex flex-1 flex-col items-center px-2 pb-2 pt-4 text-center">
        <h3 className="font-serif text-xl font-semibold text-stone-900">
          {item.titulo}
        </h3>
        <p className="text-sm font-medium text-[#a97c2f]">{item.ano}</p>
        {/* MUDANÇA: mb-4 garante espaço entre o texto e o botão */}
        <p className="mb-4 mt-2 text-sm leading-relaxed text-stone-700">
          {item.texto}
        </p>

        <Link
          href={`/aparicoes/${item.slug}`}
          className="mt-auto inline-block rounded-full bg-[#c9a46a] px-5 py-1.5 text-sm font-medium text-stone-900 transition hover:bg-[#b8924f]"
        >
          Saiba mais →
        </Link>
      </div>
    </article>
  );
}

export default function CarrosselCuriosidades({
  curiosidades,
}: {
  curiosidades: Curiosidade[];
}) {
  const trilho = useRef<HTMLDivElement>(null);

  function rolar(direcao: 1 | -1) {
    const el = trilho.current;
    if (!el) return;
    el.scrollBy({ left: direcao * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div>
      {/* MUDANÇA: o trilho agora é flex e os cards ficam num wrapper com mx-auto */}
      <div
        ref={trilho}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-1 pb-4 [scrollbar-none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="mx-auto flex shrink-0 gap-6">
          {curiosidades.map((item) => (
            <CardCuriosidade key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => rolar(-1)}
          aria-label="Anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14233f] text-lg text-[#14233f] transition hover:bg-[#14233f]/20"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => rolar(1)}
          aria-label="Próximo"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14233f] text-lg text-[#14233f] transition hover:bg-[#14233f]/20"
        >
          →
        </button>
      </div>
    </div>
  );
}