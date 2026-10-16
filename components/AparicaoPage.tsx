
import type { AparicaoPublica } from "@/lib/aparicoes";

type Props = {
  aparicao: AparicaoPublica;
};

export default function AparicaoPage({ aparicao }: Props) {
  return (
    <main className="min-h-screen text-stone-800">
      <div className="mx-auto max-w-6xl px-6 py-12">

        {/* CABEÇALHO */}
        <section className="mb-10">
          <p className="text-sm uppercase tracking-widest text-amber-700">
            {aparicao.pais}
            {aparicao.periodo && ` • ${aparicao.periodo}`}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-stone-900">
            {aparicao.nome}
          </h2>
        </section>

        <section className="grid gap-10 md:grid-cols-3">

          {/* CONTEÚDO PRINCIPAL */}
          <div className="md:col-span-2">

            {/* IMAGEM DA APARIÇÃO */}
            {aparicao.imagem_url ? (
              <div className="flex h-96 items-center justify-center overflow-hidden rounded-2xl bg-stone-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aparicao.imagem_url}
                  alt={`Imagem de ${aparicao.nome}`}
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-96 items-center justify-center rounded-2xl bg-stone-200">
                <span className="text-stone-500">
                  Imagem não disponível
                </span>
              </div>
            )}

            {/* DESCRIÇÃO */}
            {aparicao.descricao && (
              <article className="mt-10">
                <h3 className="text-2xl font-semibold text-[#a97c2f]">
                  Descrição
                </h3>

                <p className="mt-4 whitespace-pre-line leading-8 text-stone-600">
                  {aparicao.descricao}
                </p>
              </article>
            )}

            {/* HISTÓRIA */}
            {aparicao.historia && (
              <article className="mt-10">
                <h3 className="text-2xl font-semibold text-[#a97c2f]">
                  História
                </h3>

                <p className="mt-4 whitespace-pre-line leading-8 text-stone-600">
                  {aparicao.historia}
                </p>
              </article>
            )}

            {/* MENSAGEM */}
            {aparicao.mensagem && (
              <article className="mt-10">
                <h3 className="text-2xl font-semibold text-[#a97c2f]">
                  Mensagem
                </h3>

                <p className="mt-4 whitespace-pre-line leading-8 text-stone-600">
                  {aparicao.mensagem}
                </p>
              </article>
            )}

            {/* RECONHECIMENTO PELA IGREJA */}
            {aparicao.reconhecimento && (
              <article className="mt-10">
                <h3 className="text-2xl font-semibold text-[#a97c2f]">
                  Reconhecimento pela Igreja
                </h3>

                <p className="mt-4 whitespace-pre-line leading-8 text-stone-600">
                  {aparicao.reconhecimento}
                </p>
              </article>
            )}

            {/* SANTUÁRIO */}
            {(aparicao.santuario_nome ||
              aparicao.santuario_descricao) && (
              <article className="mt-10">
                <h3 className="text-2xl font-semibold text-[#a97c2f]">
                  Santuário
                </h3>

                {aparicao.santuario_nome && (
                  <h4 className="mt-4 text-lg font-medium text-stone-800">
                    {aparicao.santuario_nome}
                  </h4>
                )}

                {aparicao.santuario_descricao && (
                  <p className="mt-3 whitespace-pre-line leading-8 text-stone-600">
                    {aparicao.santuario_descricao}
                  </p>
                )}
              </article>
            )}

          </div>

          {/* INFORMAÇÕES LATERAIS */}
          <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="text-lg font-semibold">
              Informações
            </h3>

            <div className="mt-6 space-y-5">

              {/* LOCAL */}
              <div>
                <p className="text-sm text-stone-500">
                  Local
                </p>

                <p className="font-medium">
                  {aparicao.local || "Não informado"}
                </p>
              </div>

              {/* PAÍS */}
              <div>
                <p className="text-sm text-stone-500">
                  País
                </p>

                <p className="font-medium">
                  {aparicao.pais}
                </p>
              </div>

              {/* PERÍODO */}
              {aparicao.periodo && (
                <div>
                  <p className="text-sm text-stone-500">
                    Período
                  </p>

                  <p className="font-medium">
                    {aparicao.periodo}
                  </p>
                </div>
              )}

              {/* VIDENTES */}
              <div>
                <p className="text-sm text-stone-500">
                  Videntes
                </p>

                {aparicao.videntes?.length ? (
                  aparicao.videntes.map((vidente) => (
                    <p
                      key={vidente}
                      className="font-medium"
                    >
                      {vidente}
                    </p>
                  ))
                ) : (
                  <p className="font-medium">
                    Não informado
                  </p>
                )}
              </div>

            </div>
          </aside>

        </section>
      </div>
    </main>
  );
}
