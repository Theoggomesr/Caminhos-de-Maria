import { notFound } from "next/navigation";
import AparicaoPage from "@/components/AparicaoPage";
import { aparicoes } from "@/content/aparicoes";



export function generateStaticParams() {
  return aparicoes.map((a) => ({ slug: a.slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const aparicao = aparicoes.find((a) => a.slug === slug);

  if (!aparicao) notFound();

  return <AparicaoPage aparicao={aparicao} />;
}