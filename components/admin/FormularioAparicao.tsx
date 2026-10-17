
"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";

import Link from "next/link";

import {
  estadoInicialFormulario,
  type EstadoFormulario,
} from "@/lib/admin/estadoFormulario";

type AparicaoInicial = {
  nome: string;
  pais: string;
  local: string | null;
  continente: string | null;
  ano: number | null;
  periodo: string | null;
  videntes: string[] | null;
  descricao: string | null;
  historia: string | null;
  mensagem: string | null;
  reconhecimento: string | null;
  latitude: number | null;
  longitude: number | null;
  santuario_nome: string | null;
  santuario_descricao: string | null;
  imagem_url?: string | null;
  destaque: boolean;
};

type Props = {
  action: (
    estadoAnterior: EstadoFormulario,
    formData: FormData
  ) => Promise<EstadoFormulario>;
  aparicao?: AparicaoInicial;
};

const campo =
  "w-full rounded-lg border border-[#c9a46a]/40 bg-white px-4 py-3 text-[#14233f] outline-none transition focus:border-[#c9a46a] focus:ring-2 focus:ring-[#c9a46a]/20";

const rotulo =
  "mb-2 block text-sm font-semibold text-[#14233f]";

const secao =
  "rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm";

export default function FormularioAparicao({
  action,
  aparicao,
}: Props) {
  const editando = Boolean(aparicao);

  // Estado retornado pela Server Action.
  const [estado, acaoFormulario, carregando] =
    useActionState(action, estadoInicialFormulario);

  const inputImagem = useRef<HTMLInputElement>(null);

  const [previewImagem, setPreviewImagem] =
    useState<string | null>(null);

  const [erroImagem, setErroImagem] = useState("");

  // Libera URLs temporárias das imagens.
  useEffect(() => {
    return () => {
      if (previewImagem) {
        URL.revokeObjectURL(previewImagem);
      }
    };
  }, [previewImagem]);

  function selecionarImagem(
    evento: React.ChangeEvent<HTMLInputElement>
  ) {
    const arquivo = evento.target.files?.[0];

    setErroImagem("");
    setPreviewImagem(null);

    if (!arquivo) return;

    const tiposPermitidos = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!tiposPermitidos.includes(arquivo.type)) {
      setErroImagem(
        "Formato inválido. Selecione JPG, PNG ou WebP."
      );

      evento.target.value = "";
      return;
    }

    const tamanhoMaximo = 5 * 1024 * 1024;

    if (arquivo.size > tamanhoMaximo) {
      setErroImagem(
        "A imagem deve ter no máximo 5 MB."
      );

      evento.target.value = "";
      return;
    }

    setPreviewImagem(URL.createObjectURL(arquivo));
  }

  function removerImagemSelecionada() {
    if (inputImagem.current) {
      inputImagem.current.value = "";
    }

    setPreviewImagem(null);
    setErroImagem("");
  }

  return (
    <form
      action={acaoFormulario}
      className="space-y-8"
      onSubmit={(evento) => {
        if (erroImagem) {
          evento.preventDefault();
        }
      }}
    >
      {/* MENSAGEM DE ERRO DO SERVIDOR */}
      {estado.mensagem && !estado.sucesso && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-800"
        >
          <p className="font-semibold">
            Não foi possível salvar a aparição.
          </p>

          <p className="mt-2">{estado.mensagem}</p>
        </div>
      )}

      {/* INFORMAÇÕES GERAIS */}
      <section className={secao}>
        <h2 className="mb-6 font-serif text-xl text-[#14233f]">
          Informações gerais
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="nome" className={rotulo}>
              Nome da aparição *
            </label>

            <input
              id="nome"
              name="nome"
              type="text"
              required
              maxLength={200}
              defaultValue={aparicao?.nome ?? ""}
              className={campo}
              placeholder="Nossa Senhora de Lourdes"
            />
          </div>

          <div>
            <label htmlFor="pais" className={rotulo}>
              País *
            </label>

            <input
              id="pais"
              name="pais"
              type="text"
              required
              maxLength={120}
              defaultValue={aparicao?.pais ?? ""}
              className={campo}
              placeholder="França"
            />
          </div>

          <div>
            <label htmlFor="local" className={rotulo}>
              Local
            </label>

            <input
              id="local"
              name="local"
              type="text"
              defaultValue={aparicao?.local ?? ""}
              className={campo}
              placeholder="Lourdes"
            />
          </div>

          <div>
            <label htmlFor="continente" className={rotulo}>
              Continente
            </label>

            <select
              id="continente"
              name="continente"
              defaultValue={aparicao?.continente ?? ""}
              className={campo}
            >
              <option value="">Selecione</option>
              <option value="Europa">Europa</option>
              <option value="América do Norte">
                América do Norte
              </option>
              <option value="América do Sul">
                América do Sul
              </option>
              <option value="Ásia">Ásia</option>
              <option value="África">África</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          <div>
            <label htmlFor="ano" className={rotulo}>
              Ano
            </label>

            <input
              id="ano"
              name="ano"
              type="number"
              min={1}
              max={9999}
              defaultValue={aparicao?.ano ?? ""}
              className={campo}
              placeholder="1858"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="periodo" className={rotulo}>
              Período das aparições
            </label>

            <input
              id="periodo"
              name="periodo"
              type="text"
              defaultValue={aparicao?.periodo ?? ""}
              className={campo}
              placeholder="11 de fevereiro a 16 de julho de 1858"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="videntes" className={rotulo}>
              Videntes
            </label>

            <textarea
              id="videntes"
              name="videntes"
              rows={3}
              defaultValue={
                aparicao?.videntes?.join("\n") ?? ""
              }
              className={campo}
              placeholder="Digite um vidente por linha"
            />

            <p className="mt-2 text-xs text-[#14233f]/60">
              Informe um nome por linha.
            </p>
          </div>
        </div>
      </section>

      {/* HISTÓRIA E MENSAGENS */}
      <section className={secao}>
        <h2 className="mb-6 font-serif text-xl text-[#14233f]">
          História e mensagens
        </h2>

        <div className="space-y-5">
          <div>
            <label htmlFor="descricao" className={rotulo}>
              Descrição
            </label>

            <textarea
              id="descricao"
              name="descricao"
              rows={4}
              defaultValue={aparicao?.descricao ?? ""}
              className={campo}
              placeholder="Breve descrição da aparição..."
            />
          </div>

          <div>
            <label htmlFor="historia" className={rotulo}>
              História das aparições
            </label>

            <textarea
              id="historia"
              name="historia"
              rows={8}
              defaultValue={aparicao?.historia ?? ""}
              className={campo}
              placeholder="Conte a história das aparições..."
            />
          </div>

          <div>
            <label htmlFor="mensagem" className={rotulo}>
              Mensagem associada
            </label>

            <textarea
              id="mensagem"
              name="mensagem"
              rows={6}
              defaultValue={aparicao?.mensagem ?? ""}
              className={campo}
              placeholder="Descreva as mensagens associadas..."
            />
          </div>

          <div>
            <label
              htmlFor="reconhecimento"
              className={rotulo}
            >
              Reconhecimento pela Igreja
            </label>

            <textarea
              id="reconhecimento"
              name="reconhecimento"
              rows={5}
              defaultValue={
                aparicao?.reconhecimento ?? ""
              }
              className={campo}
              placeholder="Informações sobre o reconhecimento eclesiástico..."
            />
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO GEOGRÁFICA */}
      <section className={secao}>
        <h2 className="mb-6 font-serif text-xl text-[#14233f]">
          Localização geográfica
        </h2>

        <p className="mb-5 text-sm text-[#14233f]/70">
          Informe as coordenadas para que a aparição
          possa ser localizada no mapa interativo.
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="latitude" className={rotulo}>
              Latitude
            </label>

            <input
              id="latitude"
              name="latitude"
              type="number"
              step="any"
              min={-90}
              max={90}
              defaultValue={aparicao?.latitude ?? ""}
              className={campo}
              placeholder="43.097"
            />
          </div>

          <div>
            <label htmlFor="longitude" className={rotulo}>
              Longitude
            </label>

            <input
              id="longitude"
              name="longitude"
              type="number"
              step="any"
              min={-180}
              max={180}
              defaultValue={aparicao?.longitude ?? ""}
              className={campo}
              placeholder="-0.058"
            />
          </div>
        </div>
      </section>

      {/* SANTUÁRIO */}
      <section className={secao}>
        <h2 className="mb-6 font-serif text-xl text-[#14233f]">
          Santuário
        </h2>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="santuario_nome"
              className={rotulo}
            >
              Nome do santuário
            </label>

            <input
              id="santuario_nome"
              name="santuario_nome"
              type="text"
              defaultValue={
                aparicao?.santuario_nome ?? ""
              }
              className={campo}
              placeholder="Santuário de Nossa Senhora de Lourdes"
            />
          </div>

          <div>
            <label
              htmlFor="santuario_descricao"
              className={rotulo}
            >
              Descrição do santuário
            </label>

            <textarea
              id="santuario_descricao"
              name="santuario_descricao"
              rows={4}
              defaultValue={
                aparicao?.santuario_descricao ?? ""
              }
              className={campo}
              placeholder="Descreva o santuário..."
            />
          </div>
        </div>
      </section>

      {/* IMAGEM DA APARIÇÃO */}
      <section className={secao}>
        <h2 className="mb-6 font-serif text-xl text-[#14233f]">
          Imagem da aparição
        </h2>

        <p className="mb-5 text-sm text-[#14233f]/70">
          Selecione a imagem principal que será utilizada
          no catálogo e na página individual da aparição.
        </p>

        <div className="space-y-5">
          {/* IMAGEM ATUAL */}
          {aparicao?.imagem_url && !previewImagem && (
            <div>
              <p className={rotulo}>
                Imagem atual
              </p>

              <div className="inline-block overflow-hidden rounded-xl border border-[#c9a46a]/30 bg-[#fbf8f1] p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aparicao.imagem_url}
                  alt={`Imagem de ${aparicao.nome}`}
                  className="h-64 w-full max-w-sm rounded-lg object-contain"
                />
              </div>

              <p className="mt-2 text-xs text-[#14233f]/60">
                Esta imagem será mantida caso você não
                selecione uma nova.
              </p>
            </div>
          )}

          {/* SELEÇÃO DA IMAGEM */}
          <div>
            <label htmlFor="imagem" className={rotulo}>
              {aparicao?.imagem_url
                ? "Substituir imagem"
                : "Selecionar imagem"}
            </label>

            <input
              id="imagem"
              name="imagem"
              ref={inputImagem}
              onChange={selecionarImagem}
              aria-invalid={Boolean(erroImagem)}
              aria-describedby={
                erroImagem ? "erro-imagem" : undefined
              }
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="w-full rounded-lg border border-[#c9a46a]/40 bg-white px-4 py-3 text-sm text-[#14233f] outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-[#d5b685] file:px-4 file:py-2 file:font-semibold file:text-[#14233f] hover:file:bg-[#c9a46a] focus:border-[#c9a46a] focus:ring-2 focus:ring-[#c9a46a]/20"
            />

            <p className="mt-2 text-xs text-[#14233f]/60">
              Formatos permitidos: JPG, PNG e WebP.
              Tamanho máximo: 5 MB.
            </p>

            {/* MENSAGEM DE ERRO DA IMAGEM */}
            {erroImagem && (
              <p
                id="erro-imagem"
                role="alert"
                className="mt-2 text-sm font-medium text-red-700"
              >
                {erroImagem}
              </p>
            )}

            {/* PRÉ-VISUALIZAÇÃO */}
            {previewImagem && (
              <div className="mt-5 rounded-xl border border-[#c9a46a]/40 bg-[#fbf8f1] p-4">

                <p className={rotulo}>
                  Pré-visualização da nova imagem
                </p>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewImagem}
                  alt="Pré-visualização da imagem selecionada"
                  className="h-64 w-full max-w-sm rounded-lg object-contain"
                />

                <p className="mt-2 text-xs text-[#14233f]/60">
                  A imagem só será enviada quando você
                  salvar o formulário.
                </p>

                <button
                  type="button"
                  onClick={removerImagemSelecionada}
                  disabled={carregando}
                  className="mt-3 rounded-lg border border-[#c9a46a] px-4 py-2 text-sm font-semibold text-[#14233f] transition hover:bg-[#eee5d4] disabled:opacity-50"
                >
                  Remover seleção
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONFIGURAÇÕES */}
      <section className={secao}>
        <h2 className="mb-5 font-serif text-xl text-[#14233f]">
          Configurações
        </h2>

        <label className="flex items-center gap-3 text-[#14233f]">
          <input
            type="checkbox"
            name="destaque"
            defaultChecked={
              aparicao?.destaque ?? false
            }
            className="h-4 w-4 accent-[#14233f]"
          />
          Destacar esta aparição
        </label>

        <p className="mt-4 text-sm text-[#14233f]/60">
          {editando
            ? "O status de publicação pode ser alterado na listagem administrativa."
            : "A nova aparição será salva como rascunho. Você poderá publicá-la na listagem administrativa."}
        </p>
      </section>

      {/* BOTÕES */}
      <div className="flex flex-wrap justify-end gap-4 pb-8">
        <Link
          href="/admin/aparicoes"
          className="rounded-lg border border-[#c9a46a] px-6 py-3 font-semibold text-[#14233f] transition hover:bg-[#c9a46a]/10"
        >
          Cancelar
        </Link>

        <button
          type="submit"
          disabled={carregando || Boolean(erroImagem)}
          className="rounded-lg bg-[#14233f] px-8 py-3 font-semibold text-white transition hover:bg-[#243b5c] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {carregando
            ? "Salvando..."
            : editando
              ? "Salvar alterações"
              : "Cadastrar aparição"}
        </button>
      </div>
    </form>
  );
}
