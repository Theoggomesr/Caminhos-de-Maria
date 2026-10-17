
"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
  FormEvent,
} from "react";

import Link from "next/link";

import {
  estadoInicialFormulario,
  type EstadoFormulario,
} from "@/lib/admin/estadoFormulario";

type AparicaoOpcao = {
  id: string;
  nome: string;
};

type CuriosidadeInicial = {
  titulo: string;
  ano: number | null;
  texto: string;
  imagem_url: string | null;
  imagem_alt: string | null;
  aparicao_id: string | null;
  ordem: number;
};

type Props = {
  action: (
    estadoAnterior: EstadoFormulario,
    formData: FormData
  ) => Promise<EstadoFormulario>;
  aparicoes: AparicaoOpcao[];
  curiosidade?: CuriosidadeInicial;
};

const TAMANHO_MAXIMO = 5 * 1024 * 1024;

const FORMATOS_PERMITIDOS = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const campo =
  "w-full rounded-lg border border-[#d5b685]/50 bg-[#f7f3e9] px-4 py-3 text-sm text-[#14233f] outline-none transition focus:border-[#c9a46a] focus:ring-2 focus:ring-[#c9a46a]/20";

const rotulo =
  "mb-2 block text-sm font-semibold text-[#14233f]";

export default function FormularioCuriosidade({
  action,
  aparicoes,
  curiosidade,
}: Props) {
  const editando = Boolean(curiosidade);

  // Estado retornado pela Server Action.
  const [estado, acaoFormulario, carregando] =
    useActionState(action, estadoInicialFormulario);

  // Referência para limpar o input de imagem.
  const inputImagem = useRef<HTMLInputElement>(null);

  // Estados da pré-visualização.
  const [previewImagem, setPreviewImagem] =
    useState<string | null>(null);

  const [nomeArquivo, setNomeArquivo] = useState("");
  const [erroImagem, setErroImagem] = useState("");

  // Libera URLs temporárias ao trocar de imagem
  // ou desmontar o componente.
  useEffect(() => {
    return () => {
      if (previewImagem) {
        URL.revokeObjectURL(previewImagem);
      }
    };
  }, [previewImagem]);

  function selecionarImagem(
    evento: ChangeEvent<HTMLInputElement>
  ) {
    const arquivo = evento.target.files?.[0];

    setPreviewImagem(null);
    setNomeArquivo("");
    setErroImagem("");

    if (!arquivo) {
      return;
    }

    // Validação do formato.
    if (!FORMATOS_PERMITIDOS.includes(arquivo.type)) {
      setErroImagem(
        "Formato inválido. Selecione uma imagem JPG, PNG ou WebP."
      );

      evento.target.value = "";
      return;
    }

    // Validação do tamanho.
    if (arquivo.size > TAMANHO_MAXIMO) {
      setErroImagem(
        "A imagem deve ter no máximo 5 MB."
      );

      evento.target.value = "";
      return;
    }

    // Verifica se o arquivo está vazio.
    if (arquivo.size === 0) {
      setErroImagem(
        "O arquivo selecionado está vazio."
      );

      evento.target.value = "";
      return;
    }

    // Gera uma pré-visualização local.
    // A imagem ainda não é enviada ao Supabase.
    const urlTemporaria =
      URL.createObjectURL(arquivo);

    setPreviewImagem(urlTemporaria);
    setNomeArquivo(arquivo.name);
  }

  function removerImagemSelecionada() {
    if (inputImagem.current) {
      inputImagem.current.value = "";
    }

    setPreviewImagem(null);
    setNomeArquivo("");
    setErroImagem("");
  }

  function validarEnvio(
    evento: FormEvent<HTMLFormElement>
  ) {
    if (erroImagem || carregando) {
      evento.preventDefault();
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f3e9] px-6 py-10">
      <div className="mx-auto max-w-4xl">

        {/* VOLTAR */}
        <Link
          href="/admin/curiosidades"
          className="text-sm font-medium text-[#80663d] transition hover:underline"
        >
          ← Voltar às curiosidades
        </Link>

        {/* CABEÇALHO */}
        <div className="mb-8 mt-5">
          <h1 className="font-serif text-3xl font-bold text-[#14233f]">
            {editando
              ? "Editar Curiosidade"
              : "Nova Curiosidade"}
          </h1>

          <p className="mt-2 text-[#14233f]/70">
            {editando
              ? "Atualize as informações da curiosidade."
              : "Cadastre uma nova curiosidade para o Caminhos de Maria."}
          </p>
        </div>

        {/* FORMULÁRIO */}
        <form
          action={acaoFormulario}
          onSubmit={validarEnvio}
          className="space-y-8 rounded-xl border border-[#d5b685]/30 bg-white p-6 shadow-sm md:p-8"
        >

          {/* MENSAGEM DE ERRO DO SERVIDOR */}
          {estado.mensagem && !estado.sucesso && (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
            >
              <p className="font-semibold">
                Não foi possível salvar a curiosidade.
              </p>

              <p className="mt-2">
                {estado.mensagem}
              </p>
            </div>
          )}

          {/* INFORMAÇÕES PRINCIPAIS */}
          <section>
            <h2 className="mb-5 font-serif text-xl font-semibold text-[#14233f]">
              Informações da curiosidade
            </h2>

            <div className="space-y-5">

              {/* TÍTULO */}
              <div>
                <label
                  htmlFor="titulo"
                  className={rotulo}
                >
                  Título *
                </label>

                <input
                  id="titulo"
                  name="titulo"
                  type="text"
                  required
                  maxLength={200}
                  defaultValue={
                    curiosidade?.titulo ?? ""
                  }
                  placeholder="Ex.: O Milagre do Sol"
                  className={campo}
                />
              </div>

              {/* ANO E ORDEM */}
              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="ano"
                    className={rotulo}
                  >
                    Ano
                  </label>

                  <input
                    id="ano"
                    name="ano"
                    type="number"
                    min={1}
                    max={9999}
                    defaultValue={
                      curiosidade?.ano ?? ""
                    }
                    placeholder="Ex.: 1917"
                    className={campo}
                  />
                </div>

                <div>
                  <label
                    htmlFor="ordem"
                    className={rotulo}
                  >
                    Ordem no carrossel
                  </label>

                  <input
                    id="ordem"
                    name="ordem"
                    type="number"
                    min={0}
                    max={99999}
                    defaultValue={
                      curiosidade?.ordem ?? 0
                    }
                    className={campo}
                  />

                  <p className="mt-1 text-xs text-[#14233f]/60">
                    Números menores aparecem primeiro.
                  </p>
                </div>
              </div>

              {/* DESCRIÇÃO */}
              <div>
                <label
                  htmlFor="texto"
                  className={rotulo}
                >
                  Descrição *
                </label>

                <textarea
                  id="texto"
                  name="texto"
                  required
                  maxLength={3000}
                  rows={5}
                  defaultValue={
                    curiosidade?.texto ?? ""
                  }
                  placeholder="Descreva a curiosidade..."
                  className={campo}
                />
              </div>

            </div>
          </section>

          {/* APARIÇÃO VINCULADA */}
          <section className="border-t border-[#d5b685]/30 pt-7">

            <h2 className="mb-5 font-serif text-xl font-semibold text-[#14233f]">
              Aparição relacionada
            </h2>

            <label
              htmlFor="aparicao_id"
              className={rotulo}
            >
              Vincular a uma aparição
            </label>

            <select
              id="aparicao_id"
              name="aparicao_id"
              defaultValue={
                curiosidade?.aparicao_id ?? ""
              }
              className={campo}
            >
              <option value="">
                Selecione uma aparição
              </option>

              {aparicoes.map((aparicao) => (
                <option
                  key={aparicao.id}
                  value={aparicao.id}
                >
                  {aparicao.nome}
                </option>
              ))}
            </select>

            <p className="mt-2 text-xs text-[#14233f]/60">
              O botão &quot;Saiba mais&quot; levará
              o visitante à página da aparição
              selecionada. É necessário vincular
              uma aparição publicada antes de
              publicar a curiosidade.
            </p>
          </section>

          {/* IMAGEM */}
          <section className="border-t border-[#d5b685]/30 pt-7">

            <h2 className="mb-5 font-serif text-xl font-semibold text-[#14233f]">
              Imagem da curiosidade
            </h2>

            <p className="mb-5 text-sm leading-relaxed text-[#14233f]/70">
              Escolha uma imagem para representar
              a curiosidade no carrossel da
              página inicial.
            </p>

            {/* IMAGEM ATUAL */}
            {curiosidade?.imagem_url &&
              !previewImagem && (
                <div className="mb-6">

                  <p className={rotulo}>
                    Imagem atual
                  </p>

                  <div className="inline-block rounded-xl border border-[#d5b685]/30 bg-[#f7f3e9] p-3">

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={curiosidade.imagem_url}
                      alt={
                        curiosidade.imagem_alt ??
                        curiosidade.titulo
                      }
                      className="h-48 w-full max-w-sm rounded-lg object-contain"
                    />

                  </div>

                  <p className="mt-2 text-xs text-[#14233f]/60">
                    Esta imagem será mantida caso
                    você não selecione uma nova.
                  </p>
                </div>
              )}

            {/* SELEÇÃO DE IMAGEM */}
            <div className="space-y-5">

              <div>
                <label
                  htmlFor="imagem"
                  className={rotulo}
                >
                  {editando
                    ? "Substituir imagem"
                    : "Selecionar imagem"}
                </label>

                <input
                  id="imagem"
                  name="imagem"
                  type="file"
                  ref={inputImagem}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={selecionarImagem}
                  aria-invalid={
                    Boolean(erroImagem)
                  }
                  aria-describedby={
                    erroImagem
                      ? "erro-imagem-curiosidade"
                      : undefined
                  }
                  className="w-full rounded-lg border border-[#d5b685]/50 bg-[#f7f3e9] px-4 py-3 text-sm text-[#14233f] outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-[#d5b685] file:px-4 file:py-2 file:font-semibold file:text-[#14233f] hover:file:bg-[#c9a46a] focus:border-[#c9a46a] focus:ring-2 focus:ring-[#c9a46a]/20"
                />

                <p className="mt-2 text-xs text-[#14233f]/60">
                  Formatos permitidos: JPG, PNG
                  e WebP. Tamanho máximo: 5 MB.
                </p>

                {/* ERRO DA IMAGEM */}
                {erroImagem && (
                  <div
                    id="erro-imagem-curiosidade"
                    role="alert"
                    className="mt-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                  >
                    {erroImagem}
                  </div>
                )}
              </div>

              {/* PRÉ-VISUALIZAÇÃO */}
              {previewImagem && (
                <div className="rounded-xl border border-[#d5b685]/40 bg-[#f7f3e9] p-5">

                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-[#14233f]">
                      Pré-visualização da nova imagem
                    </p>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                      Imagem válida
                    </span>
                  </div>

                  <div className="flex justify-center rounded-lg bg-white p-3">

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={previewImagem}
                      alt="Pré-visualização da imagem selecionada"
                      className="max-h-72 w-full rounded-lg object-contain"
                    />

                  </div>

                  {nomeArquivo && (
                    <p className="mt-3 break-all text-xs text-[#14233f]/70">
                      Arquivo selecionado:{" "}
                      <span className="font-semibold">
                        {nomeArquivo}
                      </span>
                    </p>
                  )}

                  <p className="mt-2 text-xs text-[#14233f]/60">
                    A imagem só será enviada ao
                    Supabase quando você salvar
                    o formulário.
                  </p>

                  <button
                    type="button"
                    onClick={
                      removerImagemSelecionada
                    }
                    disabled={carregando}
                    className="mt-4 rounded-lg border border-[#c9a46a] px-4 py-2 text-sm font-semibold text-[#14233f] transition hover:bg-[#eee5d4] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Remover seleção
                  </button>

                </div>
              )}

              {/* TEXTO ALTERNATIVO */}
              <div>
                <label
                  htmlFor="imagem_alt"
                  className={rotulo}
                >
                  Descrição da imagem
                  (texto alternativo)
                </label>

                <input
                  id="imagem_alt"
                  name="imagem_alt"
                  type="text"
                  maxLength={300}
                  defaultValue={
                    curiosidade?.imagem_alt ?? ""
                  }
                  placeholder="Ex.: Representação do Milagre do Sol em Fátima"
                  className={campo}
                />

                <p className="mt-2 text-xs text-[#14233f]/60">
                  Descreva brevemente o conteúdo
                  da imagem para melhorar a
                  acessibilidade.
                </p>
              </div>

            </div>
          </section>

          {/* AÇÕES */}
          <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#d5b685]/30 pt-7">

            <Link
              href="/admin/curiosidades"
              className="rounded-lg border border-[#d5b685] px-6 py-3 font-semibold text-[#14233f] transition hover:bg-[#f7f3e9]"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={
                carregando ||
                Boolean(erroImagem)
              }
              aria-busy={carregando}
              className="rounded-lg bg-[#d5b685] px-6 py-3 font-semibold text-[#14233f] shadow-sm transition hover:bg-[#c9a46a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {carregando
                ? "Salvando..."
                : editando
                  ? "Salvar alterações"
                  : "Cadastrar curiosidade"}
            </button>

          </div>
        </form>
      </div>
    </main>
  );
}
