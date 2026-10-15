import Link from "next/link";
import { Aparicao } from "@/types/aparicao";

type Props = {
  aparicao: Aparicao;
};

export default function AparicaoPage({ aparicao }: Props) {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-800">

     
      <div className="mx-auto max-w-6xl px-6 py-12">

        <section className="mb-10">
          <p className="text-sm uppercase tracking-widest text-amber-700">
            {aparicao.pais} • {aparicao.periodo}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-stone-900">
            {aparicao.nome}
          </h2>

          <p className="mt-4 text-lg text-stone-600">
            {aparicao.titulo}
          </p>
        </section>

        <section className="grid gap-10 md:grid-cols-3">

          <div className="md:col-span-2">

            <div className="flex h-96 items-center justify-center rounded-2xl bg-stone-200">
              Imagem
            </div>

            <article className="mt-10">
              <h3 className="text-2xl font-semibold">
                Descrição
              </h3>

              <p className="mt-4 leading-8 text-stone-600">
                {aparicao.descricao}
              </p>
            </article>

            <article className="mt-10">
              <h3 className="text-2xl font-semibold">
                História
              </h3>

              <p className="mt-4 leading-8 text-stone-600">
                {aparicao.historia}
              </p>
            </article>

            <article className="mt-10">
              <h3 className="text-2xl font-semibold">
                Mensagem
              </h3>

              <p className="mt-4 leading-8 text-stone-600">
                {aparicao.mensagem}
              </p>
            </article>

            <article className="mt-10">
              <h3 className="text-2xl font-semibold">
                Reconhecimento pela Igreja
              </h3>

              <p className="mt-4 leading-8 text-stone-600">
                {aparicao.reconhecimento}
              </p>
            </article>

          </div>

          <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm">

            <h3 className="text-lg font-semibold">
              Informações
            </h3>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-sm text-stone-500">
                  Local
                </p>

                <p className="font-medium">
                  {aparicao.local}
                </p>
              </div>

              <div>
                <p className="text-sm text-stone-500">
                  País
                </p>

                <p className="font-medium">
                  {aparicao.pais}
                </p>
              </div>

              <div>
                <p className="text-sm text-stone-500">
                  Videntes
                </p>

                {aparicao.videntes.map((vidente) => (
                  <p
                    key={vidente}
                    className="font-medium"
                  >
                    {vidente}
                  </p>
                ))}
              </div>

            </div>

          </aside>

        </section>

      </div>

    </main>
  );
}