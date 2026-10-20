
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Globe2,
  Heart,
  Sparkles,
  HandHeart,
} from "lucide-react";

// ======================================================
// SEO DA PÁGINA SOBRE NÓS
// ======================================================

const titulo = "Sobre Nós";

const descricao =
  "Conheça o Caminhos de Maria, nossa história, missão " +
  "e valores. Um projeto dedicado à fé, à devoção " +
  "e à história das aparições de Nossa Senhora.";

export const metadata: Metadata = {
  title: titulo,

  description: descricao,

  alternates: {
    canonical: "/sobre",
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Caminhos de Maria",
    title: `${titulo} | Caminhos de Maria`,
    description: descricao,
    url: "/sobre",
  },

  twitter: {
    card: "summary",
    title: `${titulo} | Caminhos de Maria`,
    description: descricao,
  },

  robots: {
    index: true,
    follow: true,
  },
};

// ======================================================
// PÁGINA SOBRE NÓS
// ======================================================

export default function SobrePage() {
  return (
    <main className="min-h-screen bg-[#f7f3e9]">

      {/* CONTEÚDO PRINCIPAL */}
      <section className="relative overflow-hidden px-6 py-16 md:py-24">

        {/* ELEMENTOS DECORATIVOS */}
        <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#d5b685]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#d5b685]/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">

          {/* APRESENTAÇÃO */}
          <div className="mb-14 text-center">
            <span className="text-2xl text-[#c9a46a]">
              ✦
            </span>

            <h1 className="mt-3 font-serif text-4xl font-semibold uppercase tracking-wide text-[#a97c2f] md:text-5xl">
              Sobre Nós
            </h1>

            <div className="mx-auto mt-5 h-px w-24 bg-[#c9a46a]" />

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#14233f]/70">
              Conheça a essência do Caminhos de Maria,
              um projeto dedicado à história, à fé e
              à devoção a Nossa Senhora.
            </p>
          </div>

          {/* TEXTO E IMAGENS */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* COLUNA DE TEXTO */}
            <div className="space-y-10">

              {/* QUEM SOMOS */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Sparkles
                    size={22}
                    className="text-[#a97c2f]"
                  />

                  <h2 className="font-serif text-2xl font-semibold text-[#14233f]">
                    Quem Somos
                  </h2>
                </div>

                <p className="text-justify leading-8 text-[#14233f]/80">
                  O Caminhos de Maria nasceu de uma profunda
                  devoção e do desejo de compartilhar com o
                  mundo a beleza, a fé e a esperança que as
                  aparições de Nossa Senhora trazem à
                  humanidade.
                </p>

                <p className="mt-4 text-justify leading-8 text-[#14233f]/80">
                  Nossa missão é reunir, de forma histórica
                  e espiritual, os relatos das aparições
                  marianas reconhecidas, oferecendo um
                  espaço de reflexão, oração e conhecimento.
                </p>
              </div>

              {/* DIVISOR */}
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-[#c9a46a]/40" />
                <span className="text-xl text-[#c9a46a]">
                  ✦
                </span>
                <div className="h-px flex-1 bg-[#c9a46a]/40" />
              </div>

              {/* NOSSA MISSÃO */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <Heart
                    size={22}
                    className="text-[#a97c2f]"
                  />

                  <h2 className="font-serif text-2xl font-semibold text-[#14233f]">
                    Nossa Missão
                  </h2>
                </div>

                <p className="text-justify leading-8 text-[#14233f]/80">
                  Desejamos que cada visitante encontre aqui
                  não apenas informações, mas um caminho de
                  aproximação com a Virgem Maria,
                  compreendendo suas mensagens de paz,
                  conversão e amor.
                </p>

                <p className="mt-4 text-justify leading-8 text-[#14233f]/80">
                  Queremos facilitar o acesso à história
                  das aparições e conectar devotos de
                  diferentes lugares por meio da fé,
                  valorizando a tradição e a riqueza
                  espiritual da Igreja Católica.
                </p>
              </div>
            </div>

            {/* COLUNA DE IMAGENS */}
            <div className="relative mx-auto w-full max-w-lg">

              <div className="relative h-110 sm:h-130">

                {/* IMAGEM SUPERIOR */}
                <div className="absolute right-0 top-0 h-[48%] w-[65%] overflow-hidden rounded-[28px] border-[3px] border-[#c9a46a] bg-[#eee5d4] shadow-lg">
                  <Image
                    src="/imagens/sobre/nossa-senhora-oracao.png"
                    alt="Representação de Nossa Senhora em oração"
                    fill
                    sizes="(max-width: 768px) 65vw, 350px"
                    className="object-cover"
                  />
                </div>

                {/* IMAGEM PRINCIPAL */}
                <div className="absolute left-0 top-[12%] z-10 h-[65%] w-[55%] overflow-hidden rounded-[28px] border-4 border-[#c9a46a] bg-[#eee5d4] shadow-xl">
                  <Image
                    src="/imagens/sobre/nossa-senhora-fatima.png"
                    alt="Nossa Senhora de Fátima com os pastorinhos"
                    fill
                    sizes="(max-width: 768px) 55vw, 300px"
                    className="object-cover"
                  />
                </div>

                {/* IMAGEM INFERIOR */}
                <div className="absolute bottom-0 right-0 h-[43%] w-[61%] overflow-hidden rounded-[28px] border-[3px] border-[#c9a46a] bg-[#eee5d4] shadow-lg">
                  <Image
                    src="/imagens/sobre/santuario-mariano.png"
                    alt="Fiéis reunidos em oração em um santuário mariano"
                    fill
                    sizes="(max-width: 768px) 61vw, 330px"
                    className="object-cover"
                  />
                </div>

                {/* CITAÇÃO BÍBLICA */}
                <div className="absolute right-[4%] top-[48%] z-20 max-w-57.5 rounded-full border border-[#c9a46a] bg-[#fffaf0] px-5 py-4 text-center shadow-lg">
                  <p className="font-serif text-sm italic leading-relaxed text-[#14233f]">
                    “Fazei tudo o que Ele vos disser.”
                  </p>

                  <span className="mt-1 block text-xs font-semibold text-[#a97c2f]">
                    João 2,5
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* PILARES DO PROJETO */}
          <div className="mt-24 border-t border-[#c9a46a]/40 pt-14">

            <div className="mb-10 text-center">
              <h2 className="font-serif text-3xl font-semibold text-[#14233f]">
                Nossos Pilares
              </h2>

              <p className="mt-3 text-[#14233f]/60">
                Os valores que orientam o Caminhos de Maria.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">

              {/* PESQUISA HISTÓRICA */}
              <div className="rounded-2xl border border-[#c9a46a]/30 bg-white/70 p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <BookOpen
                  size={36}
                  strokeWidth={1.5}
                  className="mx-auto mb-5 text-[#a97c2f]"
                />

                <h3 className="font-serif text-xl font-semibold text-[#14233f]">
                  Pesquisa Histórica
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#14233f]/70">
                  Conteúdo baseado em fontes históricas,
                  documentos e relatos tradicionais,
                  valorizando a fidelidade às informações.
                </p>
              </div>

              {/* ESPAÇO DE FÉ */}
              <div className="rounded-2xl border border-[#c9a46a]/30 bg-white/70 p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <HandHeart
                  size={36}
                  strokeWidth={1.5}
                  className="mx-auto mb-5 text-[#a97c2f]"
                />

                <h3 className="font-serif text-xl font-semibold text-[#14233f]">
                  Espaço de Fé
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#14233f]/70">
                  Um ambiente dedicado à espiritualidade,
                  à oração e ao aprofundamento da devoção
                  à Virgem Maria.
                </p>
              </div>

              {/* ALCANCE GLOBAL */}
              <div className="rounded-2xl border border-[#c9a46a]/30 bg-white/70 p-7 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <Globe2
                  size={36}
                  strokeWidth={1.5}
                  className="mx-auto mb-5 text-[#a97c2f]"
                />

                <h3 className="font-serif text-xl font-semibold text-[#14233f]">
                  Alcance Global
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#14233f]/70">
                  Reunimos histórias de aparições marianas
                  de diferentes países, aproximando
                  pessoas e culturas por meio da fé.
                </p>
              </div>

            </div>
          </div>

          {/* CHAMADA FINAL */}
          <div className="mt-20 text-center">

            <span className="text-2xl text-[#c9a46a]">
              ✦
            </span>

            <h2 className="mt-4 font-serif text-2xl font-semibold text-[#14233f]">
              Percorra os Caminhos de Maria
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-[#14233f]/70">
              Conheça os relatos das aparições de Nossa Senhora
              e descubra histórias de fé, esperança e devoção.
            </p>

            <Link
              href="/aparicoes"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#14233f] px-8 py-3 font-semibold text-white transition hover:bg-[#243b5c]"
            >
              Explorar as aparições
              <span aria-hidden="true">→</span>
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
