
import { listarAparicoesPublicadas } from "@/lib/aparicoes";

export const dynamic = "force-dynamic";

export default async function TesteSupabase() {
  const aparicoes = await listarAparicoesPublicadas();

  return (
    <main className="min-h-screen bg-[#f7f3e9] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-3xl font-bold text-[#14233f]">
          Teste de conexão com o Supabase
        </h1>

        <p className="mt-4 text-[#14233f]">
          Aparições publicadas encontradas: {aparicoes.length}
        </p>

        <div className="mt-8 space-y-4">
          {aparicoes.map((aparicao) => (
            <div
              key={aparicao.id}
              className="rounded-xl border border-[#d5b685] bg-white p-5"
            >
              <h2 className="font-serif text-xl text-[#14233f]">
                {aparicao.nome}
              </h2>

              <p className="mt-2 text-sm text-[#14233f]/70">
                {aparicao.pais} — {aparicao.ano ?? "Ano não informado"}
              </p>

              <p className="mt-2 text-sm text-[#14233f]/70">
                Slug: {aparicao.slug}
              </p>
            </div>
          ))}

          {aparicoes.length === 0 && (
            <p className="text-[#14233f]/70">
              Nenhuma aparição publicada encontrada.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
