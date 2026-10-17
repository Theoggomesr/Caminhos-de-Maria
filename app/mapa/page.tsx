
import type { Metadata } from "next";
import MapaAparicoes from "@/components/MapaAparicoes";
import { listarAparicoesPublicadas } from "@/lib/aparicoes";

export const metadata: Metadata = {
  title: "Mapa das aparições | Caminhos de Maria",
  description: "Mapa-múndi com os locais das aparições marianas.",
};

export default async function Page() {
  // Busca as aparições publicadas no Supabase
  const aparicoes = await listarAparicoesPublicadas();

  // Mantém apenas as aparições com coordenadas cadastradas
  const aparicoesComCoordenadas = aparicoes.filter(
    (a) =>
      a.latitude !== null &&
      a.longitude !== null
  );

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-semibold">
        Mapa das aparições
      </h1>

      <p className="mt-2 text-stone-600">
        Clique em um pino para conhecer a aparição.
      </p>

      <div className="mt-6">
        <MapaAparicoes aparicoes={aparicoesComCoordenadas} />
      </div>
    </main>
  );
}
