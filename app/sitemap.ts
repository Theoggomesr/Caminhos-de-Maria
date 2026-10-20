
import type { MetadataRoute } from "next";
import { listarAparicoesPublicadas } from "@/lib/aparicoes";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()
    .replace(/\/$/, "");

  // O sitemap precisa de um domínio público válido.
  if (!siteUrl) {
    throw new Error(
      "Configure NEXT_PUBLIC_SITE_URL para gerar o sitemap."
    );
  }

  const baseUrl = new URL(siteUrl).origin;

  // Páginas públicas fixas do Caminhos de Maria
  const paginasEstaticas: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/aparicoes`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/linha-do-tempo`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/mapa`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/sobre`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Busca somente aparições publicadas no Supabase
  const aparicoes = await listarAparicoesPublicadas();

  // Cria automaticamente as URLs individuais
  const paginasAparicoes: MetadataRoute.Sitemap =
    aparicoes.map((aparicao) => ({
      url: `${baseUrl}/aparicoes/${encodeURIComponent(
        aparicao.slug
      )}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  return [...paginasEstaticas, ...paginasAparicoes];
}
