
import Link from "next/link";
import { exigirAdministrador } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function PainelAdministrativo() {
  // Verifica se o usuário possui permissão administrativa
  await exigirAdministrador();

  // Conecta ao Supabase
  const supabase = await createClient();

  // Consulta os dados das aparições e curiosidades
  const [resultadoAparicoes, resultadoCuriosidades] =
    await Promise.all([
      supabase
        .from("aparicoes")
        .select("id, publicado"),

      supabase
        .from("curiosidades")
        .select("id, publicado"),
    ]);

  // Verifica possíveis erros
  if (resultadoAparicoes.error) {
    console.error(
      "Erro ao buscar aparições:",
      resultadoAparicoes.error.message
    );

    throw new Error(
      "Não foi possível carregar os dados das aparições."
    );
  }

  if (resultadoCuriosidades.error) {
    console.error(
      "Erro ao buscar curiosidades:",
      resultadoCuriosidades.error.message
    );

    throw new Error(
      "Não foi possível carregar os dados das curiosidades."
    );
  }

  const aparicoes = resultadoAparicoes.data ?? [];
  const curiosidades = resultadoCuriosidades.data ?? [];

  // Indicadores das aparições
  const totalAparicoes = aparicoes.length;

  const aparicoesPublicadas = aparicoes.filter(
    (item) => item.publicado === true
  ).length;

  // Indicadores das curiosidades
  const totalCuriosidades = curiosidades.length;

  const curiosidadesPublicadas = curiosidades.filter(
    (item) => item.publicado === true
  ).length;

  return (
    <main className="min-h-screen bg-[#f7f3e9] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* CABEÇALHO */}
        <header className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#a97c2f]">
            Caminhos de Maria ✦
          </p>

          <h1 className="font-serif text-3xl font-bold text-[#14233f] md:text-4xl">
            Painel Administrativo
          </h1>

          <p className="mt-3 max-w-2xl text-[#14233f]/70">
            Gerencie as aparições de Nossa Senhora e as
            curiosidades apresentadas aos visitantes do site.
          </p>
        </header>

        {/* INDICADORES GERAIS */}
        <section className="mb-10">
          <h2 className="mb-5 font-serif text-xl font-semibold text-[#14233f]">
            Visão geral
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* TOTAL DE APARIÇÕES */}
            <div className="rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-[#14233f]/70">
                Total de aparições
              </p>

              <p className="mt-3 text-3xl font-bold text-[#14233f]">
                {totalAparicoes}
              </p>
            </div>

            {/* APARIÇÕES PUBLICADAS */}
            <div className="rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-[#14233f]/70">
                Aparições publicadas
              </p>

              <p className="mt-3 text-3xl font-bold text-green-700">
                {aparicoesPublicadas}
              </p>
            </div>

            {/* TOTAL DE CURIOSIDADES */}
            <div className="rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-[#14233f]/70">
                Total de curiosidades
              </p>

              <p className="mt-3 text-3xl font-bold text-[#14233f]">
                {totalCuriosidades}
              </p>
            </div>

            {/* CURIOSIDADES PUBLICADAS */}
            <div className="rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium text-[#14233f]/70">
                Curiosidades publicadas
              </p>

              <p className="mt-3 text-3xl font-bold text-green-700">
                {curiosidadesPublicadas}
              </p>
            </div>

          </div>
        </section>

        {/* ÁREAS DE GERENCIAMENTO */}
        <section>
          <h2 className="mb-5 font-serif text-xl font-semibold text-[#14233f]">
            Gerenciamento de conteúdo
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            {/* CARD DE APARIÇÕES */}
            <article className="flex flex-col rounded-2xl border border-[#c9a46a]/40 bg-white p-7 shadow-sm transition hover:shadow-md">

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#f7f3e9] text-3xl text-[#a97c2f]">
                ✦
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#14233f]">
                Gerenciar Aparições
              </h3>

              <p className="mt-3 leading-relaxed text-[#14233f]/70">
                Cadastre novas aparições de Nossa Senhora,
                edite informações históricas, gerencie imagens
                e controle a publicação dos registros.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-[#f7f3e9] px-3 py-1.5 text-[#80663d]">
                  {totalAparicoes} cadastradas
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-green-700">
                  {aparicoesPublicadas} publicadas
                </span>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="/admin/aparicoes"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#14233f] px-5 py-3 font-semibold text-white transition hover:bg-[#243b5c]"
                >
                  Gerenciar aparições →
                </Link>
              </div>
            </article>

            {/* CARD DE CURIOSIDADES */}
            <article className="flex flex-col rounded-2xl border border-[#c9a46a]/40 bg-white p-7 shadow-sm transition hover:shadow-md">

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#f7f3e9] text-3xl text-[#a97c2f]">
                ✧
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#14233f]">
                Gerenciar Curiosidades
              </h3>

              <p className="mt-3 leading-relaxed text-[#14233f]/70">
                Cadastre fatos interessantes sobre as aparições,
                adicione imagens e organize os cartões exibidos
                no carrossel “Você sabia?” da página inicial.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-[#f7f3e9] px-3 py-1.5 text-[#80663d]">
                  {totalCuriosidades} cadastradas
                </span>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-green-700">
                  {curiosidadesPublicadas} publicadas
                </span>
              </div>

              <div className="mt-auto pt-8">
                <Link
                  href="/admin/curiosidades"
                  className="inline-flex w-full items-center justify-center rounded-lg bg-[#d5b685] px-5 py-3 font-semibold text-[#14233f] transition hover:bg-[#c9a46a]"
                >
                  Gerenciar curiosidades →
                </Link>
              </div>
            </article>

          </div>
        </section>

        {/* ACESSO AO SITE */}
        <section className="mt-10 rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#14233f]">
                Visualizar o site
              </h2>

              <p className="mt-2 text-sm text-[#14233f]/70">
                Confira como os conteúdos publicados aparecem
                para os visitantes.
              </p>
            </div>

            <Link
              href="/"
              className="rounded-lg border border-[#c9a46a] px-5 py-3 font-semibold text-[#14233f] transition hover:bg-[#f7f3e9]"
            >
              Ir para a página inicial →
            </Link>
          </div>
        </section>

        {/* RODAPÉ */}
        <footer className="mt-10 text-center">
          <p className="text-sm text-[#14233f]/50">
            Caminhos de Maria — Painel Administrativo
          </p>
        </footer>

      </div>
    </main>
  );
}
