
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { exigirAdministrador } from "@/lib/supabase/admin";
import FormularioAparicao from "@/components/admin/FormularioAparicao";
import { editarAparicao } from "../../actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditarAparicao({
  params,
}: Props) {
  await exigirAdministrador();

  const { id } = await params;
  const supabase = await createClient();

  const { data: aparicao, error } = await supabase
    .from("aparicoes")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error("Erro ao carregar a aparição.");
  }

  if (!aparicao) {
    notFound();
  }

  const salvar = editarAparicao.bind(null, id);

  return (
    <main className="min-h-screen bg-[#f7f3e9] px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 font-serif text-3xl font-bold text-[#14233f]">
          Editar Aparição
        </h1>

        <FormularioAparicao
          action={salvar}
          aparicao={aparicao}
        />
      </div>
    </main>
  );
}
