
import Link from "next/link";

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
  action: (formData: FormData) => Promise<void>;
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

  return (
    <form action={action} className="space-y-8">
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
          {aparicao?.imagem_url && (
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

          {/* UPLOAD */}
          <div>
            <label htmlFor="imagem" className={rotulo}>
              {aparicao?.imagem_url
                ? "Substituir imagem"
                : "Selecionar imagem"}
            </label>

            <input
              id="imagem"
              name="imagem"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="w-full rounded-lg border border-[#c9a46a]/40 bg-white px-4 py-3 text-sm text-[#14233f] outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-[#d5b685] file:px-4 file:py-2 file:font-semibold file:text-[#14233f] hover:file:bg-[#c9a46a] focus:border-[#c9a46a] focus:ring-2 focus:ring-[#c9a46a]/20"
            />

            <p className="mt-2 text-xs text-[#14233f]/60">
              Formatos permitidos: JPG, PNG e WebP.
              Tamanho máximo: 5 MB.
            </p>
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
          className="rounded-lg bg-[#14233f] px-8 py-3 font-semibold text-white transition hover:bg-[#243b5c]"
        >
          {editando
            ? "Salvar alterações"
            : "Cadastrar aparição"}
        </button>
      </div>
    </form>
  );
}
