import ListaAparicoes from "@/components/ListaAparicoes";
import { aparicoes } from "@/content/aparicoes";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
    <main
      // MUDANÇA: removido bg-[#fbf8f1] e py-10 virou pt-14 pb-10
      className="min-h-screen px-6 pb-10 pt-14"
      style={{
        // MUDANÇA: cor de base creme + degradê do azul nos primeiros 260px
        backgroundColor: "#fbf8f1",
        backgroundImage:
          "linear-gradient(to bottom, #dbeafe 0px, #fbf8f1 260px)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <ListaAparicoes
          key={q ?? ""}
          aparicoes={aparicoes}
          buscaInicial={q ?? ""}
        />
      </div>
    </main>
  );
}