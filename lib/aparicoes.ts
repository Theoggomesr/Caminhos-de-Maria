
import "server-only";

import { createClient } from "@/lib/supabase/server";

export type AparicaoPublica = {
  id: string;
  nome: string;
  slug: string;
  pais: string;
  local: string | null;
  continente: string | null;
  ano: number | null;
  periodo: string | null;
  videntes: string[] | null;
  descricao: string | null;
  historia: string | null;
  mensagem: string | null;
  reconhecimento: string | null;
  latitude: number | null;
  longitude: number | null;
  santuario_nome: string | null;
  santuario_descricao: string | null;
  destaque: boolean;
  publicado: boolean;
  imagem_url: string | null;
};

const CAMPOS = `
  id,
  nome,
  slug,
  pais,
  local,
  continente,
  ano,
  periodo,
  videntes,
  descricao,
  historia,
  mensagem,
  reconhecimento,
  latitude,
  longitude,
  santuario_nome,
  santuario_descricao,
  destaque,
  publicado,
  imagem_url
`;

// Busca todas as aparições publicadas
export async function listarAparicoesPublicadas() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("aparicoes")
    .select(CAMPOS)
    .eq("publicado", true)
    .order("ano", { ascending: true });

  if (error) {
    console.error("Erro ao listar aparições:", error.message);
    throw new Error("Erro ao carregar as aparições.");
  }

  return (data ?? []) as AparicaoPublica[];
}

// Busca uma aparição publicada pelo slug
export async function buscarAparicaoPorSlug(
  slug: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("aparicoes")
    .select(CAMPOS)
    .eq("slug", slug)
    .eq("publicado", true)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar aparição:", error.message);
    throw new Error("Erro ao carregar a aparição.");
  }

  return data as AparicaoPublica | null;
}

// Busca apenas as aparições em destaque
export async function listarAparicoesDestaque() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("aparicoes")
    .select(CAMPOS)
    .eq("publicado", true)
    .eq("destaque", true)
    .order("ano", { ascending: true });

  if (error) {
    console.error("Erro ao buscar destaques:", error.message);
    throw new Error("Erro ao carregar os destaques.");
  }

  return (data ?? []) as AparicaoPublica[];
}
