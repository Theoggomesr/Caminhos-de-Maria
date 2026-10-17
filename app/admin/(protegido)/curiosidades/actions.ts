
"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { exigirAdministrador } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { EstadoFormulario } from "@/lib/admin/estadoFormulario";

const BUCKET = "aparicoes";
const PASTA_IMAGENS = "curiosidades";
const TAMANHO_MAXIMO = 5 * 1024 * 1024;

const FORMATOS_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

type SupabaseClient = Awaited<
  ReturnType<typeof createClient>
>;

// =====================================================
// LEITURA E VALIDAÇÃO DOS CAMPOS
// =====================================================

function texto(formData: FormData, campo: string) {
  return String(formData.get(campo) ?? "").trim();
}

function obterDados(formData: FormData) {
  const titulo = texto(formData, "titulo");
  const textoCuriosidade = texto(formData, "texto");

  if (!titulo || !textoCuriosidade) {
    throw new Error(
      "Título e descrição são obrigatórios."
    );
  }

  if (titulo.length > 200) {
    throw new Error(
      "O título deve ter no máximo 200 caracteres."
    );
  }

  if (textoCuriosidade.length > 3000) {
    throw new Error(
      "A descrição deve ter no máximo 3000 caracteres."
    );
  }

  const anoTexto = texto(formData, "ano");
  const ano = anoTexto ? Number(anoTexto) : null;

  if (
    ano !== null &&
    (!Number.isInteger(ano) ||
      ano < 1 ||
      ano > 9999)
  ) {
    throw new Error(
      "Informe um ano válido."
    );
  }

  const ordemTexto = texto(formData, "ordem");
  const ordem = ordemTexto
    ? Number(ordemTexto)
    : 0;

  if (
    !Number.isInteger(ordem) ||
    ordem < 0 ||
    ordem > 99999
  ) {
    throw new Error(
      "Informe uma ordem válida."
    );
  }

  const aparicaoId = texto(
    formData,
    "aparicao_id"
  );

  if (
    aparicaoId &&
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      aparicaoId
    )
  ) {
    throw new Error(
      "Aparição vinculada inválida."
    );
  }

  const imagemAlt = texto(
    formData,
    "imagem_alt"
  );

  if (imagemAlt.length > 300) {
    throw new Error(
      "O texto alternativo da imagem deve ter no máximo 300 caracteres."
    );
  }

  return {
    titulo,
    texto: textoCuriosidade,
    ano,
    ordem,
    aparicao_id: aparicaoId || null,
    imagem_alt: imagemAlt || null,
  };
}

// =====================================================
// VALIDAÇÃO DE IMAGENS
// =====================================================

function obterImagem(formData: FormData) {
  const arquivo = formData.get("imagem");

  if (
    !(arquivo instanceof File) ||
    arquivo.size === 0
  ) {
    return null;
  }

  if (arquivo.size > TAMANHO_MAXIMO) {
    throw new Error(
      "A imagem deve ter no máximo 5 MB."
    );
  }

  if (
    !FORMATOS_PERMITIDOS.includes(
      arquivo.type
    )
  ) {
    throw new Error(
      "Formato inválido. Utilize JPG, PNG ou WebP."
    );
  }

  return arquivo;
}

// =====================================================
// UPLOAD DE IMAGENS
// =====================================================

async function enviarImagem(
  supabase: SupabaseClient,
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
      (valor, indice) =>
        bytes[indice] === valor
    );

  const webp =
    bytes.length >= 12 &&
    String.fromCharCode(
      ...bytes.slice(0, 4)
    ) === "RIFF" &&
    String.fromCharCode(
      ...bytes.slice(8, 12)
    ) === "WEBP";

  const valido =
    (arquivo.type === "image/jpeg" && jpg) ||
    (arquivo.type === "image/png" && png) ||
    (arquivo.type === "image/webp" && webp);

  if (!valido) {
    throw new Error(
      "O conteúdo da imagem é inválido."
    );
  }

  const extensao =
    arquivo.type === "image/jpeg"
      ? "jpg"
      : arquivo.type === "image/png"
        ? "png"
        : "webp";

  const caminho =
    `${PASTA_IMAGENS}/${randomUUID()}.${extensao}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(caminho, bytes, {
      contentType: arquivo.type,
      upsert: false,
    });

  if (error) {
    console.error(
      "Erro no upload:",
      error.message
    );

    throw new Error(
      "Não foi possível enviar a imagem."
    );
  }

  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(caminho);

  return {
    caminho,
    url: data.publicUrl,
  };
}

// =====================================================
// IDENTIFICAÇÃO DE IMAGENS DO PROJETO
// =====================================================

// Extrai o caminho somente se a imagem estiver
// no bucket e na pasta utilizados por curiosidades.
function obterCaminhoImagem(
  supabase: SupabaseClient,
  imagemUrl: string | null | undefined
): string | null {
  if (!imagemUrl) return null;

  try {
    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(
        `${PASTA_IMAGENS}/__verificacao_de_origem__`
      );

    const urlBase = new URL(data.publicUrl);
    const urlImagem = new URL(imagemUrl);

    // Não permite remover arquivos externos.
    if (
      urlImagem.origin !== urlBase.origin
    ) {
      return null;
    }

    const prefixo = urlBase.pathname.replace(
      /__verificacao_de_origem__$/,
      ""
    );

    if (
      !urlImagem.pathname.startsWith(
        prefixo
      )
    ) {
      return null;
    }

    const caminhoCodificado =
      urlImagem.pathname.slice(
        prefixo.length
      );

    if (!caminhoCodificado) {
      return null;
    }

    const nomeArquivo = decodeURIComponent(
      caminhoCodificado
    );

    // Aceita somente os nomes gerados
    // pelo sistema para imagens de curiosidades.
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/i.test(
        nomeArquivo
      )
    ) {
      return null;
    }

    return `${PASTA_IMAGENS}/${nomeArquivo}`;
  } catch {
    return null;
  }
}

// =====================================================
// REMOÇÃO DE IMAGENS
// =====================================================

async function limparUpload(
  supabase: SupabaseClient,
  caminho: string
) {
  try {
    const { error } = await supabase.storage
      .from(BUCKET)
      .remove([caminho]);

    if (error) {
      console.error(
        "Erro ao remover imagem:",
        error.message
      );
    }
  } catch (error) {
    console.error(
      "Falha inesperada ao remover imagem:",
      error
    );
  }
}

async function removerImagemAntiga(
  supabase: SupabaseClient,
  imagemUrl: string | null | undefined
) {
  const caminho = obterCaminhoImagem(
    supabase,
    imagemUrl
  );

  if (!caminho) return;

  await limparUpload(
    supabase,
    caminho
  );
}

// =====================================================
// VALIDAÇÃO DA APARIÇÃO VINCULADA
// =====================================================

async function validarAparicaoVinculada(
  supabase: SupabaseClient,
  aparicaoId: string | null
) {
  if (!aparicaoId) return;

  const { data: aparicao, error } =
    await supabase
      .from("aparicoes")
      .select("id")
      .eq("id", aparicaoId)
      .eq("publicado", true)
      .maybeSingle();

  if (error || !aparicao) {
    throw new Error(
      "Selecione uma aparição publicada e válida."
    );
  }
}

// =====================================================
// REVALIDAÇÃO
// =====================================================

function atualizarPaginas() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/curiosidades");
  revalidatePath("/aparicoes");
  revalidatePath(
    "/aparicoes/[slug]",
    "page"
  );
}

function mensagemDeErro(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado. Tente novamente.";
}

// =====================================================
// CADASTRAR CURIOSIDADE
// =====================================================

export async function cadastrarCuriosidade(
  _estadoAnterior: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await exigirAdministrador();

  try {
    const supabase = await createClient();

    const dados = obterDados(formData);
    const arquivo = obterImagem(formData);

    await validarAparicaoVinculada(
      supabase,
      dados.aparicao_id
    );

    const imagem = arquivo
      ? await enviarImagem(
          supabase,
          arquivo
        )
      : null;

    const { error } = await supabase
      .from("curiosidades")
      .insert({
        ...dados,
        imagem_url:
          imagem?.url ?? null,
        publicado: false,
      });

    if (error) {
      // Remove o upload se o cadastro falhar.
      if (imagem) {
        await limparUpload(
          supabase,
          imagem.caminho
        );
      }

      console.error(
        "Erro ao cadastrar curiosidade:",
        error.message
      );

      throw new Error(
        "Não foi possível cadastrar a curiosidade."
      );
    }

    atualizarPaginas();
  } catch (error) {
    return {
      sucesso: false,
      mensagem: mensagemDeErro(error),
    };
  }

  redirect(
    "/admin/curiosidades?sucesso=cadastro"
  );
}

// =====================================================
// EDITAR CURIOSIDADE
// =====================================================

export async function editarCuriosidade(
  id: string,
  _estadoAnterior: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await exigirAdministrador();

  try {
    const supabase = await createClient();

    const dados = obterDados(formData);
    const arquivo = obterImagem(formData);

    // Busca a curiosidade e a imagem existente.
    const {
      data: existente,
      error: erroBusca,
    } = await supabase
      .from("curiosidades")
      .select("id, imagem_url")
      .eq("id", id)
      .single();

    if (erroBusca || !existente) {
      throw new Error(
        "Curiosidade não encontrada."
      );
    }

    const imagemAnterior =
      existente.imagem_url;

    await validarAparicaoVinculada(
      supabase,
      dados.aparicao_id
    );

    const imagem = arquivo
      ? await enviarImagem(
          supabase,
          arquivo
        )
      : null;

    const { error } = await supabase
      .from("curiosidades")
      .update({
        ...dados,
        ...(imagem
          ? {
              imagem_url: imagem.url,
            }
          : {}),
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id)
      .select("id")
      .single();

    if (error) {
      // Remove a nova imagem se a edição falhar.
      if (imagem) {
        await limparUpload(
          supabase,
          imagem.caminho
        );
      }

      console.error(
        "Erro ao editar curiosidade:",
        error.message
      );

      throw new Error(
        "Não foi possível editar a curiosidade."
      );
    }

    // A nova imagem já está vinculada ao registro.
    // Agora podemos tentar remover a anterior.
    if (
      imagem &&
      imagemAnterior
    ) {
      await removerImagemAntiga(
        supabase,
        imagemAnterior
      );
    }

    atualizarPaginas();
  } catch (error) {
    return {
      sucesso: false,
      mensagem: mensagemDeErro(error),
    };
  }

  redirect(
    "/admin/curiosidades?sucesso=edicao"
  );
}

// =====================================================
// EXCLUIR CURIOSIDADE
// =====================================================

export async function excluirCuriosidade(
  id: string
) {
  await exigirAdministrador();

  const supabase = await createClient();

  // Obtém a imagem antes de excluir o registro.
  const {
    data: existente,
    error: erroBusca,
  } = await supabase
    .from("curiosidades")
    .select("id, imagem_url")
    .eq("id", id)
    .single();

  if (erroBusca || !existente) {
    throw new Error(
      "Curiosidade não encontrada."
    );
  }

  const { error } = await supabase
    .from("curiosidades")
    .delete()
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    console.error(
      "Erro ao excluir curiosidade:",
      error.message
    );

    throw new Error(
      "Não foi possível excluir a curiosidade."
    );
  }

  // A curiosidade já foi excluída.
  // Agora tenta remover a imagem vinculada.
  if (existente.imagem_url) {
    await removerImagemAntiga(
      supabase,
      existente.imagem_url
    );
  }

  atualizarPaginas();
}

// =====================================================
// PUBLICAR OU DESPUBLICAR CURIOSIDADE
// =====================================================

export async function alterarPublicacaoCuriosidade(
  id: string,
  publicar: boolean
) {
  await exigirAdministrador();

  const supabase = await createClient();

  if (publicar) {
    const {
      data: curiosidade,
      error: erroBusca,
    } = await supabase
      .from("curiosidades")
      .select("aparicao_id")
      .eq("id", id)
      .single();

    if (erroBusca || !curiosidade) {
      throw new Error(
        "Curiosidade não encontrada."
      );
    }

    if (!curiosidade.aparicao_id) {
      throw new Error(
        "Vincule uma aparição antes de publicar."
      );
    }

    await validarAparicaoVinculada(
      supabase,
      curiosidade.aparicao_id
    );
  }

  const { error } = await supabase
    .from("curiosidades")
    .update({
      publicado: publicar,
      updated_at:
        new Date().toISOString(),
    })
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
