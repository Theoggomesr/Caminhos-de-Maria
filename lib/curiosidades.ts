
import { createClient } from "@/lib/supabase/server";

export type CuriosidadePublica = {
  id: string;
  titulo: string;
  ano: number | null;
  texto: string;
  imagem_url: string | null;
  imagem_alt: string | null;
  aparicao_id: string | null;
  ordem: number;

  aparicoes: {
    slug: string;
  } | null;
};

export async function listarCuriosidadesPublicadas(): Promise<
  CuriosidadePublica[]
> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("curiosidades")
    .select(`
      id,
      titulo,
      ano,
      texto,
      imagem_url,
      imagem_alt,
      aparicao_id,
      ordem,
      aparicoes (
        slug
      )
    `)
    .eq("publicado", true)
    .order("ordem", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      "Erro ao buscar curiosidades:",
      error.message
    );

    throw new Error(
      "Não foi possível carregar as curiosidades."
    );
  }

  // Normaliza o relacionamento retornado pelo Supabase.
  // Algumas tipagens representam a relação como array.
  return (data ?? []).map((item) => {
    const relacao = item.aparicoes;

    const aparicao = Array.isArray(relacao)
      ? relacao[0] ?? null
      : relacao ?? null;

    return {
      id: item.id,
      titulo: item.titulo,
      ano: item.ano,
      texto: item.texto,
      imagem_url: item.imagem_url,
      imagem_alt: item.imagem_alt,
      aparicao_id: item.aparicao_id,
      ordem: item.ordem,
      aparicoes: aparicao
        ? { slug: aparicao.slug }
        : null,
    };
  });
}
