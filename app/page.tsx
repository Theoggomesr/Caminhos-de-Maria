
import Image from "next/image";
import Link from "next/link";
import BuscaAparicao from "@/components/BuscaAparicao";
import CardAparicaoDestaque from "@/components/CardAparicaoDestaque";
import {
  listarAparicoesDestaque,
  listarAparicoesPublicadas,
} from "@/lib/aparicoes";
import LinhaDoTempoResumo from "@/components/LinhaDoTempoResumo";
import CarrosselCuriosidades from "@/components/CarrosselCuriosidades";
import { curiosidades } from "@/content/curiosidades";
import Divisor from "@/components/Divisor";

export default async function Home() {
  const [destaques, aparicoesPublicadas] = await Promise.all([
    listarAparicoesDestaque(),
    listarAparicoesPublicadas(),
  ]);


  return (
    <main className="bg-[#f7f3e9]">
      {/* Imagem com degradê */}
      <section className="relative h-95 w-full md:h-125">
        <Image
          src="/imagens/banner-home/nossas-senhoras-2.png"
          alt="Nossa Senhora de Fátima com os três pastorinhos"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 75%" }}
        />

        {/* Degradê que dissolve a imagem na cor do fundo */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-[#f7f3e9]" />
      </section>

      {/* Título e busca */}
      <section className="relative z-10 -mt-1 px-6 pb-14 text-center">
        <h1 className="font-serif text-2xl text-stone-900 md:text-3xl">
          Conheça a história das aparições
        </h1>

        <div className="mt-5 flex justify-center">
          <BuscaAparicao />
        </div>
      </section>

      {/* APARIÇÕES EM DESTAQUE */}
      {destaques.length > 0 && (
        <section
          className="px-6 pb-14 pt-20"
          style={{
            background:
              "linear-gradient(to bottom, #f7f3e9 0%, #f7f3e9 25%, #f7f3e9 100%)",
          }}
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between">
              <h2 className="font-serif text-2xl text-[#a97c2f]">
                Aparições em destaque
              </h2>

              <Link
                href="/aparicoes"
                className="text-sm text-[#a97c2f] hover:underline"
              >
                Ver todas
              </Link>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {destaques.map((a) => (
                <CardAparicaoDestaque
                  key={a.slug}
                  aparicao={a}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <Divisor />

      {/* LINHA DO TEMPO */}
      <section className="bg-[#f7f3e9] px-6 pb-16 pt-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <h2 className="font-serif text-2xl text-[#a97c2f]">
              Linha do tempo
            </h2>

            <Link
              href="/linha-do-tempo"
              className="text-sm text-[#a97c2f] hover:underline"
            >
              Ver completa
            </Link>
          </div>

          <div className="mt-8">
            <LinhaDoTempoResumo aparicoes={aparicoesPublicadas} />
          </div>
        </div>
      </section>

      {/* CURIOSIDADES */}
      <section className="bg-[#f7f3e9]">
        <div className="bg-[#14233f] px-6 pb-52 pt-16">
          <div className="mx-auto max-w-6xl text-center">
            <h2 className="font-serif text-3xl font-semibold uppercase tracking-wide text-[#d5b685]">
              Você sabia? <span aria-hidden="true">✦</span>
            </h2>

            <p className="mt-2 text-[#e6dcce]">
              Curiosidades e fatos fascinantes sobre as aparições de Nossa
              Senhora pelo mundo.
            </p>
          </div>
        </div>

        <div className="relative z-10 -mt-44 px-6 pb-16">
          <div className="mx-auto max-w-6xl">
            <CarrosselCuriosidades curiosidades={curiosidades} />
          </div>
        </div>
      </section>
    </main>
  );
}
