
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AparicaoPage from "@/components/AparicaoPage";
import { buscarAparicaoPorSlug } from "@/lib/aparicoes";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Gera os metadados de SEO de cada aparição
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Busca a aparição publicada no Supabase
  const aparicao = await buscarAparicaoPorSlug(slug);

  // Evita gerar metadados de uma aparição inexistente
  if (!aparicao) {
    return {
      title: "Aparição não encontrada",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const titulo = `${aparicao.nome}: História e Aparições`;

  const descricao =
    `Conheça a história de ${aparicao.nome}, ` +
    `suas aparições, mensagens e informações ` +
    `sobre o reconhecimento pela Igreja Católica.`;

  const canonical = `/aparicoes/${encodeURIComponent(slug)}`;

  return {
    title: titulo,

    description: descricao,

    alternates: {
      canonical,
    },

    openGraph: {
      type: "article",
      locale: "pt_BR",
      siteName: "Caminhos de Maria",
      title: `${titulo} | Caminhos de Maria`,
      description: descricao,
      url: canonical,
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
}

// Renderiza a página da aparição
export default async function Page({
  params,
}: PageProps) {
  // Obtém o slug da URL
  const { slug } = await params;

  // Busca a aparição publicada no Supabase
  const aparicao = await buscarAparicaoPorSlug(slug);

  // Retorna 404 se não existir ou não estiver publicada
  if (!aparicao) {
    notFound();
  }

  // Mantém o componente visual original
  return <AparicaoPage aparicao={aparicao} />;
}
