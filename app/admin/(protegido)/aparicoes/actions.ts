
"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { exigirAdministrador } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

const BUCKET = "aparicoes";
const TAMANHO_MAXIMO = 5 * 1024 * 1024;

const FORMATOS_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

function gerarSlug(texto: string) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function texto(formData: FormData, campo: string) {
  return String(formData.get(campo) ?? "").trim();
}

function coordenada(
  valor: string,
  minimo: number,
  maximo: number
) {
  if (!valor) return null;

  const numero = Number(valor);

  if (
    !Number.isFinite(numero) ||
    numero < minimo ||
    numero > maximo
  ) {
    throw new Error("Coordenada geográfica inválida.");
  }

  return numero;
}

function obterDados(formData: FormData) {
  const nome = texto(formData, "nome");
  const pais = texto(formData, "pais");

  if (!nome || !pais) {
    throw new Error("Nome e país são obrigatórios.");
  }

  if (nome.length > 200 || pais.length > 120) {
    throw new Error("Nome ou país muito longo.");
  }

  const anoTexto = texto(formData, "ano");
  const ano = anoTexto ? Number(anoTexto) : null;

  if (
    ano !== null &&
    (!Number.isInteger(ano) || ano < 1 || ano > 9999)
  ) {
    throw new Error("Informe um ano válido.");
  }

  return {
    nome,
    pais,
    local: texto(formData, "local") || null,
    continente: texto(formData, "continente") || null,
    ano,
    periodo: texto(formData, "periodo") || null,
    videntes: texto(formData, "videntes")
      .split("\n")
      .map((v) => v.trim())
      .filter(Boolean),
    descricao: texto(formData, "descricao") || null,
    historia: texto(formData, "historia") || null,
    mensagem: texto(formData, "mensagem") || null,
    reconhecimento:
      texto(formData, "reconhecimento") || null,
    latitude: coordenada(
      texto(formData, "latitude"),
      -90,
      90
    ),
    longitude: coordenada(
      texto(formData, "longitude"),
      -180,
      180
    ),
    santuario_nome:
      texto(formData, "santuario_nome") || null,
    santuario_descricao:
      texto(formData, "santuario_descricao") || null,
    destaque: formData.get("destaque") === "on",
  };
}

function obterImagem(formData: FormData) {
  const arquivo = formData.get("imagem");

  if (!(arquivo instanceof File) || arquivo.size === 0) {
    return null;
  }

  if (arquivo.size > TAMANHO_MAXIMO) {
    throw new Error("A imagem deve ter no máximo 5 MB.");
  }

  if (!FORMATOS_PERMITIDOS.includes(arquivo.type)) {
    throw new Error(
      "Formato inválido. Utilize JPG, PNG ou WebP."
    );
  }

  return arquivo;
}

async function enviarImagem(
  supabase: Awaited<ReturnType<typeof createClient>>,
  arquivo: File
) {
  const bytes = new Uint8Array(
    await arquivo.arrayBuffer()
  );

  // Confere a assinatura real do arquivo.
  const jpg =
    bytes[0] === 0xff &&
    bytes[1] === 0xd8 &&
    bytes[2] === 0xff;

  const png =
    bytes.length >= 8 &&
    [137, 80, 78, 71, 13, 10, 26, 10].every(
      (valor, i) => bytes[i] === valor
    );

  const webp =
    bytes.length >= 12 &&
    String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" &&
    String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";

  const valido =
    (arquivo.type === "image/jpeg" && jpg) ||
    (arquivo.type === "image/png" && png) ||
    (arquivo.type === "image/webp" && webp);

  if (!valido) {
    throw new Error("O conteúdo da imagem é inválido.");
  }

  const extensao =
    arquivo.type === "image/jpeg"
      ? "jpg"
      : arquivo.type === "image/png"
        ? "png"
        : "webp";

  const caminho = `${randomUUID()}.${extensao}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(caminho, bytes, {
      contentType: arquivo.type,
      upsert: false,
    });

  if (error) {
    console.error("Erro no upload:", error.message);
    throw new Error("Não foi possível enviar a imagem.");
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(caminho);

  return {
    caminho,
    url: data.publicUrl,
  };
}

async function limparUpload(
  supabase: Awaited<ReturnType<typeof createClient>>,
  caminho: string
) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([caminho]);

  if (error) {
    console.error(
      "Não foi possível limpar o upload:",
      error.message
    );
  }
}

function atualizarPaginas() {
  revalidatePath("/admin");
  revalidatePath("/admin/aparicoes");
  revalidatePath("/aparicoes");
  revalidatePath("/aparicoes/[slug]", "page");
}

export async function cadastrarAparicao(
  formData: FormData
) {
  await exigirAdministrador();

  const supabase = await createClient();
  const dados = obterDados(formData);
  const arquivo = obterImagem(formData);
  const slug = gerarSlug(dados.nome);

  if (!slug) {
    throw new Error("Não foi possível gerar o slug.");
  }

  const imagem = arquivo
    ? await enviarImagem(supabase, arquivo)
    : null;

  const { error } = await supabase
    .from("aparicoes")
    .insert({
      ...dados,
      slug,
      imagem_url: imagem?.url ?? null,
      publicado: false,
    });

  if (error) {
    if (imagem) {
      await limparUpload(supabase, imagem.caminho);
    }

    console.error("Erro ao cadastrar:", error.message);

    if (error.code === "23505") {
      throw new Error(
        "Já existe uma aparição com esse nome ou slug."
      );
    }

    throw new Error(
      "Não foi possível cadastrar a aparição."
    );
  }

  atualizarPaginas();
  redirect("/admin/aparicoes?sucesso=cadastro");
}

export async function editarAparicao(
  id: string,
  formData: FormData
) {
  await exigirAdministrador();

  const supabase = await createClient();
  const dados = obterDados(formData);
  const arquivo = obterImagem(formData);

  // Confirma que a aparição existe e é acessível.
  const { data: existente, error: erroBusca } =
    await supabase
      .from("aparicoes")
      .select("id")
      .eq("id", id)
      .single();

  if (erroBusca || !existente) {
    throw new Error("Aparição não encontrada.");
  }

  const imagem = arquivo
    ? await enviarImagem(supabase, arquivo)
    : null;

  const { error } = await supabase
    .from("aparicoes")
    .update({
      ...dados,
      ...(imagem ? { imagem_url: imagem.url } : {}),
    })
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    if (imagem) {
      await limparUpload(supabase, imagem.caminho);
    }

    console.error("Erro ao editar:", error.message);
    throw new Error("Não foi possível editar a aparição.");
  }

  atualizarPaginas();
  redirect("/admin/aparicoes?sucesso=edicao");
}

export async function excluirAparicao(id: string) {
  await exigirAdministrador();

  const supabase = await createClient();

  const { error } = await supabase
    .from("aparicoes")
    .delete()
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    console.error("Erro ao excluir:", error.message);
    throw new Error("Não foi possível excluir a aparição.");
  }

  atualizarPaginas();
}

export async function alterarPublicacao(
  id: string,
  publicar: boolean
) {
  await exigirAdministrador();

  const supabase = await createClient();

  const { error } = await supabase
    .from("aparicoes")
    .update({ publicado: publicar })
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    console.error(
      "Erro ao alterar publicação:",
      error.message
    );

    throw new Error(
      "Não foi possível alterar a publicação."
    );
  }

  atualizarPaginas();
}
