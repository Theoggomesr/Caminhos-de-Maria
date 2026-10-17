
import type { Metadata } from "next";
import LinhaDoTempo from "@/components/LinhaDoTempo";
import { listarAparicoesPublicadas } from "@/lib/aparicoes";

export const metadata: Metadata = {
  title: "Linha do tempo | Caminhos de Maria",
  description: "As aparições marianas em ordem cronológica.",
};

export default async function Page() {
  // Busca as aparições publicadas no Supabase
  const aparicoes = await listarAparicoesPublicadas();

  // Mantém apenas aparições com ano cadastrado
  // e organiza em ordem cronológica
  const aparicoesOrdenadas = aparicoes
    .filter((a) => a.ano !== null)
    .sort((a, b) => (a.ano ?? 0) - (b.ano ?? 0));

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold">
        Linha do tempo
      </h1>

      <p className="mb-10 mt-2 text-stone-600">
        As aparições marianas em ordem cronológica.
      </p>

      <LinhaDoTempo aparicoes={aparicoesOrdenadas} />
    </main>
  );
}
