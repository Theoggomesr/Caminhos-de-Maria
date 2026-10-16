
import { redirect } from "next/navigation";
import { createClient } from "./server";

export async function exigirAdministrador() {
  const supabase = await createClient();

  const { data: claimsData, error: authError } =
    await supabase.auth.getClaims();

  const usuarioId = claimsData?.claims?.sub;

  if (authError || !usuarioId) {
    redirect("/admin/login");
  }

  const { data: administrador, error } = await supabase
    .from("administradores")
    .select("usuario_id")
    .eq("usuario_id", usuarioId)
    .maybeSingle();

  if (error) {
    throw new Error("Erro ao verificar permissões.");
  }

  if (!administrador) {
    redirect("/admin/login?erro=permissao");
  }

  return { usuarioId };
}
