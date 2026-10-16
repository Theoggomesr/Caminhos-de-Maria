
import Link from "next/link";
import { entrar } from "../actions";

type Props = {
  searchParams: Promise<{
    erro?: string;
  }>;
};

export default async function LoginAdmin({
  searchParams,
}: Props) {
  const { erro } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f3f3f3] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#c9a46a]/40 bg-[#14233f] p-8 shadow-2xl">

        <div className="mb-8 text-center">
          <span className="text-3xl text-[#d5b685]">
            ✦
          </span>

          <h1 className="mt-3 font-serif text-2xl font-semibold text-[#d5b685]">
            Caminhos de Maria
          </h1>

          <p className="mt-2 text-sm text-[#f3eee3]/70">
            Painel Administrativo
          </p>
        </div>

        {erro && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-200"
          >   
        {erro === "permissao"
          ? "Sua conta não possui permissão de administrador."
          : erro === "conexao"
          ? "Não foi possível conectar ao Supabase. Verifique a conexão."
          : erro === "campos"
          ? "Preencha o e-mail e a senha."
          : "E-mail ou senha inválidos."}

          </div>
        )}

        <form action={entrar} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm text-[#f3eee3]"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-[#c9a46a]/30 bg-[#0f1b33] px-4 py-3 text-white outline-none focus:border-[#d5b685]"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="mb-2 block text-sm text-[#f3eee3]"
            >
              Senha
            </label>

            <input
              id="senha"
              type="password"
              name="senha"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-[#c9a46a]/30 bg-[#0f1b33] px-4 py-3 text-white outline-none focus:border-[#d5b685]"
              placeholder="Sua senha"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#d5b685] px-4 py-3 font-semibold text-[#14233f] transition hover:bg-[#e5c99a]"
          >
            Entrar no painel
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-[#d5b685] hover:underline"
          >
            Voltar ao site
          </Link>
        </div>
      </div>
    </main>
  );
}
