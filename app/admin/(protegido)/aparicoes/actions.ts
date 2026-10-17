
"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { exigirAdministrador } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { EstadoFormulario } from "@/lib/admin/estadoFormulario";

const BUCKET = "aparicoes";
const TAMANHO_MAXIMO = 5 * 1024 * 1024;

const FORMATOS_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

type SupabaseClient = Awaited<
  ReturnType<typeof createClient>
>;

function gerarSlug(valor: string) {
  return valor
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
    throw new Error(
      "Coordenada geográfica inválida."
    );
  }

  return numero;
}

function obterDados(formData: FormData) {
  const nome = texto(formData, "nome");
  const pais = texto(formData, "pais");

  if (!nome || !pais) {
    throw new Error(
      "Nome e país são obrigatórios."
    );
  }

  if (nome.length > 200 || pais.length > 120) {
    throw new Error(
      "Nome ou país muito longo."
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

  return {
    nome,
    pais,
    local: texto(formData, "local") || null,
    continente:
      texto(formData, "continente") || null,
    ano,
    periodo:
      texto(formData, "periodo") || null,
    videntes: texto(formData, "videntes")
      .split("\n")
      .map((vidente) => vidente.trim())
      .filter(Boolean),
    descricao:
      texto(formData, "descricao") || null,
    historia:
      texto(formData, "historia") || null,
    mensagem:
      texto(formData, "mensagem") || null,
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
    destaque:
      formData.get("destaque") === "on",
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

  if (!FORMATOS_PERMITIDOS.includes(arquivo.type)) {
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
    `${randomUUID()}.${extensao}`;

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
// GERENCIAMENTO DE IMAGENS ANTIGAS
// =====================================================

// Extrai o caminho de uma imagem somente se a URL
// pertencer ao bucket público deste projeto.
function obterCaminhoImagem(
  supabase: SupabaseClient,
  imagemUrl: string | null | undefined
): string | null {
  if (!imagemUrl) return null;

  try {
    const { data } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(
        "__verificacao_de_origem__"
      );

    const urlBase = new URL(data.publicUrl);
    const urlImagem = new URL(imagemUrl);

    // Não remove imagens de outros domínios.
    if (urlImagem.origin !== urlBase.origin) {
      return null;
    }

    const prefixo = urlBase.pathname.replace(
      /__verificacao_de_origem__$/,
      ""
    );

    if (!urlImagem.pathname.startsWith(prefixo)) {
      return null;
    }

    const caminhoCodificado =
      urlImagem.pathname.slice(
        prefixo.length
      );

    if (!caminhoCodificado) {
      return null;
    }

    const caminho = decodeURIComponent(
      caminhoCodificado
    );

    // Impede caminhos suspeitos.
    if (
      caminho.startsWith("/") ||
      caminho.includes("\\") ||
      caminho.split("/").some(
        (parte) =>
          !parte ||
          parte === "." ||
          parte === ".."
      )
    ) {
      return null;
    }

    // Somente arquivos criados pelo padrão
    // de upload deste módulo.
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|png|webp)$/i.test(
        caminho
      )
    ) {
      return null;
    }

    return caminho;
  } catch {
    return null;
  }
}

// Remove um arquivo do Storage.
// Erros são registrados sem desfazer uma operação
// que já foi concluída no banco de dados.
async function limparUpload(
  supabase: SupabaseClient,
  caminho: string
) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([caminho]);

  if (error) {
    console.error(
      "Não foi possível remover a imagem:",
      error.message
    );
  }
}

// Remove uma imagem antiga somente se for
// reconhecida como arquivo deste módulo.
async function removerImagemAntiga(
  supabase: SupabaseClient,
  imagemUrl: string | null | undefined
) {
  const caminho = obterCaminhoImagem(
    supabase,
    imagemUrl
  );

  if (!caminho) return;

  await limparUpload(supabase, caminho);
}

// =====================================================
// REVALIDAÇÃO
// =====================================================

function atualizarPaginas() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/aparicoes");
  revalidatePath("/aparicoes");
  revalidatePath(
    "/aparicoes/[slug]",
    "page"
  );
  revalidatePath("/linha-do-tempo");
  revalidatePath("/mapa");
}

function mensagemDeErro(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Ocorreu um erro inesperado. Tente novamente.";
}

// =====================================================
// CADASTRAR APARIÇÃO
// =====================================================

export async function cadastrarAparicao(
  _estadoAnterior: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await exigirAdministrador();

  try {
    const supabase = await createClient();

    const dados = obterDados(formData);
    const arquivo = obterImagem(formData);
    const slug = gerarSlug(dados.nome);

    if (!slug) {
      throw new Error(
        "Não foi possível gerar o slug."
      );
    }

    const imagem = arquivo
      ? await enviarImagem(
          supabase,
          arquivo
        )
      : null;

    const { error } = await supabase
      .from("aparicoes")
      .insert({
        ...dados,
        slug,
        imagem_url:
          imagem?.url ?? null,
        publicado: false,
      });

    if (error) {
      // Remove o upload recém-criado.
      if (imagem) {
        await limparUpload(
          supabase,
          imagem.caminho
        );
      }

      console.error(
        "Erro ao cadastrar:",
        error.message
      );

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
  } catch (error) {
    return {
      sucesso: false,
      mensagem: mensagemDeErro(error),
    };
  }

  redirect(
    "/admin/aparicoes?sucesso=cadastro"
  );
}

// =====================================================
// EDITAR APARIÇÃO
// =====================================================

export async function editarAparicao(
  id: string,
  _estadoAnterior: EstadoFormulario,
  formData: FormData
): Promise<EstadoFormulario> {
  await exigirAdministrador();

  try {
    const supabase = await createClient();

    const dados = obterDados(formData);
    const arquivo = obterImagem(formData);

    // Busca também a URL da imagem atual.
    const {
      data: existente,
      error: erroBusca,
    } = await supabase
      .from("aparicoes")
      .select("id, imagem_url")
      .eq("id", id)
      .single();

    if (erroBusca || !existente) {
      throw new Error(
        "Aparição não encontrada."
      );
    }

    const imagemAnterior =
      existente.imagem_url;

    const imagem = arquivo
      ? await enviarImagem(
          supabase,
          arquivo
        )
      : null;

    const { error } = await supabase
      .from("aparicoes")
      .update({
        ...dados,
        ...(imagem
          ? {
              imagem_url: imagem.url,
            }
          : {}),
      })
      .eq("id", id)
      .select("id")
      .single();

    if (error) {
      // Remove a nova imagem caso a edição falhe.
      if (imagem) {
        await limparUpload(
          supabase,
          imagem.caminho
        );
      }

      console.error(
        "Erro ao editar:",
        error.message
      );

      if (error.code === "23505") {
        throw new Error(
          "Já existe uma aparição com esse nome ou slug."
        );
      }

      throw new Error(
        "Não foi possível editar a aparição."
      );
    }

    // A nova imagem já está salva no banco.
    // Agora podemos tentar remover a antiga.
    if (imagem && imagemAnterior) {
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
    "/admin/aparicoes?sucesso=edicao"
  );
}

// =====================================================
// EXCLUIR APARIÇÃO
// =====================================================

export async function excluirAparicao(
  id: string
) {
  await exigirAdministrador();

  const supabase = await createClient();

  // Busca a imagem antes de excluir o registro.
  const {
    data: existente,
    error: erroBusca,
  } = await supabase
    .from("aparicoes")
    .select("id, imagem_url")
    .eq("id", id)
    .single();

  if (erroBusca || !existente) {
    throw new Error(
      "Aparição não encontrada."
    );
  }

  const { error } = await supabase
    .from("aparicoes")
    .delete()
    .eq("id", id)
    .select("id")
    .single();

  if (error) {
    console.error(
      "Erro ao excluir:",
      error.message
    );

    throw new Error(
      "Não foi possível excluir a aparição."
    );
  }

  // O registro já foi excluído com sucesso.
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
// PUBLICAR OU DESPUBLICAR APARIÇÃO
// =====================================================

export async function alterarPublicacao(
  id: string,
  publicar: boolean
) {
  await exigirAdministrador();

  const supabase = await createClient();

  const { error } = await supabase
    .from("aparicoes")
    .update({
      publicado: publicar,
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
