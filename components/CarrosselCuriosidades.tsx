
"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { CuriosidadePublica } from "@/lib/curiosidades";

function CardCuriosidade({
  item,
}: {
  item: CuriosidadePublica;
}) {
  const [erroImagem, setErroImagem] = useState(false);

  const possuiImagem = Boolean(item.imagem_url) && !erroImagem;
  const slug = item.aparicoes?.slug;

  return (
    <article className="flex w-72 shrink-0 snap-start flex-col rounded-2xl border border-[#c9a46a]/60 bg-[#fbf8f1] p-3 shadow-md sm:w-80">

      {/* IMAGEM */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-[#eee5d4]">

        {possuiImagem && item.imagem_url ? (
          <Image
            src={item.imagem_url}
            alt={item.imagem_alt || item.titulo}
            fill
            sizes="320px"
            className="object-cover"
            onError={() => setErroImagem(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-[#f7f3e9] to-[#e6d5b5]">
            <span
              aria-hidden="true"
              className="font-serif text-6xl text-[#c9a46a]"
            >
              ✦
            </span>

            <span className="text-xs font-medium uppercase tracking-widest text-[#80663d]">
              Caminhos de Maria
            </span>
          </div>
        )}
      </div>

      {/* CONTEÚDO */}
      <div className="flex flex-1 flex-col items-center px-2 pb-2 pt-4 text-center">

        {/* TÍTULO */}
        <h3 className="font-serif text-xl font-semibold text-stone-900">
          {item.titulo}
        </h3>

        {/* ANO */}
        {item.ano !== null && (
          <p className="mt-1 text-sm font-medium text-[#a97c2f]">
            {item.ano}
          </p>
        )}

        {/* DESCRIÇÃO */}
        <p className="mb-4 mt-2 text-sm leading-relaxed text-stone-700">
          {item.texto}
        </p>

        {/* LINK PARA A APARIÇÃO */}
        {slug && (
          <Link
            href={`/aparicoes/${slug}`}
            className="mt-auto inline-block rounded-full bg-[#c9a46a] px-5 py-1.5 text-sm font-medium text-stone-900 transition hover:bg-[#b8924f]"
          >
            Saiba mais →
          </Link>
        )}

      </div>
    </article>
  );
}

export default function CarrosselCuriosidades({
  curiosidades,
}: {
  curiosidades: CuriosidadePublica[];
}) {
  const trilho = useRef<HTMLDivElement>(null);

  function rolar(direcao: 1 | -1) {
    const el = trilho.current;

    if (!el) return;

    el.scrollBy({
      left: direcao * el.clientWidth * 0.8,
      behavior: "smooth",
    });
  }

  if (curiosidades.length === 0) {
    return null;
  }

  return (
    <div>

      {/* TRILHO DO CARROSSEL */}
      <div
        ref={trilho}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth px-1 pb-4 [scrollbar-none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="mx-auto flex shrink-0 gap-6">
          {curiosidades.map((item) => (
            <CardCuriosidade
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>

      {/* BOTÕES DE NAVEGAÇÃO */}
      {curiosidades.length > 1 && (
        <div className="mt-4 flex justify-center gap-3">

          <button
            type="button"
            onClick={() => rolar(-1)}
            aria-label="Curiosidade anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14233f] text-lg text-[#14233f] transition hover:bg-[#14233f]/20"
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => rolar(1)}
            aria-label="Próxima curiosidade"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#14233f] text-lg text-[#14233f] transition hover:bg-[#14233f]/20"
          >
            →
          </button>

        </div>
      )}

    </div>
  );
}
