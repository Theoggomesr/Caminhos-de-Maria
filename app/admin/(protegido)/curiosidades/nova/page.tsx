
import FormularioCuriosidade from "@/components/admin/FormularioCuriosidade";
import { cadastrarCuriosidade } from "../actions";
import { exigirAdministrador } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export default async function NovaCuriosidade() {
  await exigirAdministrador();

  const supabase = await createClient();

  const { data: aparicoes, error } = await supabase
    .from("aparicoes")
    .select("id, nome")
    .eq("publicado", true)
    .order("nome", { ascending: true });

  if (error) {
    throw new Error(
      "Não foi possível carregar as aparições."
    );
  }

  return (
    <FormularioCuriosidade
      action={cadastrarCuriosidade}
      aparicoes={aparicoes ?? []}
    />
  );
}
