
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function entrar(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const senha = String(formData.get("senha") ?? "");

  // Verifica se os campos foram preenchidos
  if (!email || !senha) {
    redirect("/admin/login?erro=campos");
  }

  // Verifica as configurações do Supabase
  console.log("URL Supabase:", process.env.NEXT_PUBLIC_SUPABASE_URL);

  console.log(
    "Chave configurada:",
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
  );

  const supabase = await createClient();

  // Realiza a autenticação
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    console.error("Erro de autenticação:", {
      message: error.message,
      code: error.code,
      status: error.status,
    });

    if (error.message === "fetch failed") {
      redirect("/admin/login?erro=conexao");
    }

    redirect("/admin/login?erro=credenciais");
  }

  console.log("Login realizado:", data.user?.id);

  // Redireciona para o painel administrativo
  redirect("/admin");
}

export async function sair() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Erro ao sair:", error.message);
    throw new Error("Não foi possível encerrar a sessão.");
  }

  redirect("/admin/login");
}
