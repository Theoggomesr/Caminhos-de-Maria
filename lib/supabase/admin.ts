
import { redirect } from "next/navigation";
import { createClient } from "./server";

export async function exigirAdministrador() {
  const supabase = await createClient();

  const { data: claimsData, error: authError } =
    await supabase.auth.getClaims();

  const usuarioId = claimsData?.claims?.sub;

  // Usuário sem autenticação válida.
  if (authError || !usuarioId) {
    redirect("/admin/login");
  }

  // Verifica se o usuário está autorizado.
  const { data: administrador, error } = await supabase
    .from("administradores")
    .select("usuario_id")
    .eq("usuario_id", usuarioId)
    .maybeSingle();

  if (error) {
    console.error(
      "Erro ao verificar administrador:",
      error.message
    );

    throw new Error(
      "Erro ao verificar permissões."
    );
  }

  // Usuário autenticado, mas sem permissão administrativa.
  if (!administrador) {
    redirect("/admin/login?erro=permissao");
  }

  return { usuarioId };
}
