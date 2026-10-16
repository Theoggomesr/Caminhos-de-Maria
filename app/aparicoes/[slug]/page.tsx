
import { notFound } from "next/navigation";
import AparicaoPage from "@/components/AparicaoPage";
import { buscarAparicaoPorSlug } from "@/lib/aparicoes";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Obtém o slug da URL
  const { slug } = await params;

  // Busca a aparição publicada no Supabase
  const aparicao = await buscarAparicaoPorSlug(slug);

  // Se não existir ou não estiver publicada, retorna 404
  if (!aparicao) {
    notFound();
  }

  // Mantém o componente visual original
  return <AparicaoPage aparicao={aparicao} />;
}
