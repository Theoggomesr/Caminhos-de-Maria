
import { notFound } from "next/navigation";
import FormularioCuriosidade from "@/components/admin/FormularioCuriosidade";
import { editarCuriosidade } from "../../actions";
import { exigirAdministrador } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditarCuriosidade({
  params,
}: Props) {
  await exigirAdministrador();

  const { id } = await params;
  const supabase = await createClient();

  const { data: curiosidade, error } = await supabase
    .from("curiosidades")
    .select(
      "id, titulo, ano, texto, imagem_url, imagem_alt, aparicao_id, ordem"
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(
      "Não foi possível carregar a curiosidade."
    );
  }

  if (!curiosidade) {
    notFound();
  }

  const { data: aparicoes, error: erroAparicoes } =
    await supabase
      .from("aparicoes")
      .select("id, nome")
      .eq("publicado", true)
      .order("nome", { ascending: true });

  if (erroAparicoes) {
    throw new Error(
      "Não foi possível carregar as aparições."
    );
  }

  const salvar = editarCuriosidade.bind(null, id);

  return (
    <FormularioCuriosidade
      action={salvar}
      aparicoes={aparicoes ?? []}
      curiosidade={curiosidade}
    />
  );
}
