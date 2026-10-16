
import Link from "next/link";
import { sair } from "../actions";

export default function DashboardAdmin() {
  return (
    <main className="min-h-screen bg-[#f7f3e9] p-6 md:p-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#c9a46a]/40 pb-6">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-[#14233f]">
              Painel Administrativo
            </h1>

            <p className="mt-2 text-[#14233f]/70">
              Bem-vindo ao Caminhos de Maria.
            </p>
          </div>

          <form action={sair}>
            <button
              type="submit"
              className="rounded-lg bg-[#14233f] px-5 py-2.5 text-white hover:bg-[#243b5c]"
            >
              Sair
            </button>
          </form>
        </header>

        <section className="mt-10 rounded-xl border border-[#c9a46a]/30 bg-white p-8 shadow-sm">
          <h2 className="font-serif text-2xl text-[#14233f]">
            Gerenciamento de aparições
          </h2>

          <p className="mt-3 text-[#14233f]/70">
            Sua área administrativa está funcionando.
            Em breve, você poderá cadastrar, editar
            e publicar aparições diretamente aqui.
          </p>

          <Link
            href="/aparicoes"
            className="mt-6 inline-block rounded-lg bg-[#d5b685] px-5 py-3 font-semibold text-[#14233f]"
          >
            Ver aparições do site
          </Link>
        </section>
      </div>
    </main>
  );
}
