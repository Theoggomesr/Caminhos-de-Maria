
import Link from "next/link";

import { exigirAdministrador } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

import BotaoPublicacaoCuriosidade from "@/components/admin/BotaoPublicacaoCuriosidade";
import BotaoExcluirCuriosidade from "@/components/admin/BotaoExcluirCuriosidade";
import MensagemFeedback from "@/components/admin/MensagemFeedback";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{
    sucesso?: string;
  }>;
};

export default async function AdminCuriosidades({
  searchParams,
}: Props) {
  // Verifica se o usuário possui permissão de administrador
  await exigirAdministrador();

  // Obtém os parâmetros da URL
  const { sucesso } = await searchParams;

  // Conecta ao Supabase
  const supabase = await createClient();

  // Busca todas as curiosidades cadastradas
  const { data: curiosidades, error } = await supabase
    .from("curiosidades")
    .select(
      "id, titulo, ano, publicado, ordem, created_at"
    )
    .order("ordem", { ascending: true })
    .order("created_at", { ascending: false });

  // Trata erros na consulta
  if (error) {
    console.error(
      "Erro ao buscar curiosidades:",
      error.message
    );

    throw new Error(
      "Não foi possível carregar as curiosidades cadastradas."
    );
  }

  // Garante que a lista seja um array
  const lista = curiosidades ?? [];

  // Calcula os indicadores
  const total = lista.length;

  const publicadas = lista.filter(
    (curiosidade) => curiosidade.publicado === true
  ).length;

  const rascunhos = total - publicadas;

  return (
    <main className="min-h-screen bg-[#f7f3e9] px-6 py-10">
      <div className="mx-auto max-w-6xl">

        {/* MENSAGENS DE SUCESSO */}
        {sucesso === "cadastro" && (
          <MensagemFeedback
            tipo="sucesso"
            mensagem="Curiosidade cadastrada com sucesso! Ela foi salva como rascunho e poderá ser publicada quando estiver pronta."
          />
        )}

        {sucesso === "edicao" && (
          <MensagemFeedback
            tipo="sucesso"
            mensagem="As informações da curiosidade foram atualizadas com sucesso."
          />
        )}

        {sucesso === "exclusao" && (
          <MensagemFeedback
            tipo="sucesso"
            mensagem="A curiosidade foi excluída com sucesso."
          />
        )}

        {/* CABEÇALHO */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/admin"
              className="text-sm font-medium text-[#80663d] transition hover:underline"
            >
              ← Voltar ao painel
            </Link>

            <h1 className="mt-4 font-serif text-3xl font-bold text-[#14233f]">
              Gerenciar Curiosidades
            </h1>

            <p className="mt-2 text-[#14233f]/70">
              Cadastre, edite, publique e organize as
              curiosidades exibidas na página inicial do
              Caminhos de Maria.
            </p>
          </div>

          {/* BOTÃO NOVA CURIOSIDADE */}
          <Link
            href="/admin/curiosidades/nova"
            className="inline-flex items-center gap-2 rounded-lg bg-[#d5b685] px-5 py-3 font-semibold text-[#14233f] shadow-sm transition hover:bg-[#c9a46a]"
          >
            <span className="text-xl leading-none">
              +
            </span>
            Nova curiosidade
          </Link>
        </div>

        {/* INDICADORES */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          {/* TOTAL */}
          <div className="rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#14233f]/70">
              Total de curiosidades
            </p>

            <p className="mt-3 text-3xl font-bold text-[#14233f]">
              {total}
            </p>
          </div>

          {/* PUBLICADAS */}
          <div className="rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#14233f]/70">
              Curiosidades publicadas
            </p>

            <p className="mt-3 text-3xl font-bold text-green-700">
              {publicadas}
            </p>
          </div>

          {/* RASCUNHOS */}
          <div className="rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#14233f]/70">
              Curiosidades em rascunho
            </p>

            <p className="mt-3 text-3xl font-bold text-amber-700">
              {rascunhos}
            </p>
          </div>
        </div>

        {/* LISTAGEM DAS CURIOSIDADES */}
        <section className="overflow-hidden rounded-xl border border-[#c9a46a]/30 bg-white shadow-sm">

          {/* CABEÇALHO DA TABELA */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c9a46a]/20 p-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#14233f]">
                Curiosidades cadastradas
              </h2>

              <p className="mt-1 text-sm text-[#14233f]/60">
                Gerencie os registros armazenados no Supabase.
              </p>
            </div>

            <span className="rounded-full bg-[#f7f3e9] px-4 py-2 text-sm font-medium text-[#14233f]">
              {total}{" "}
              {total === 1 ? "registro" : "registros"}
            </span>
          </div>

          {/* LISTA VAZIA */}
          {lista.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f3e9] text-3xl text-[#c9a46a]">
                ✦
              </div>

              <h3 className="font-serif text-xl font-semibold text-[#14233f]">
                Nenhuma curiosidade cadastrada
              </h3>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#14233f]/60">
                Você ainda não cadastrou nenhuma curiosidade.
                Comece adicionando fatos interessantes sobre
                as aparições de Nossa Senhora.
              </p>

              <Link
                href="/admin/curiosidades/nova"
                className="mt-6 rounded-lg bg-[#d5b685] px-6 py-3 font-semibold text-[#14233f] transition hover:bg-[#c9a46a]"
              >
                + Cadastrar curiosidade
              </Link>
            </div>
          ) : (

            /* TABELA COM CURIOSIDADES */
            <div className="overflow-x-auto">
              <table className="w-full text-left">

                {/* CABEÇALHO */}
                <thead className="bg-[#f7f3e9]">
                  <tr className="text-sm font-semibold text-[#14233f]">
                    <th className="px-6 py-4">
                      Curiosidade
                    </th>

                    <th className="px-6 py-4">
                      Ano
                    </th>

                    <th className="px-6 py-4">
                      Ordem
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Ações
                    </th>
                  </tr>
                </thead>

                {/* CORPO DA TABELA */}
                <tbody>
                  {lista.map((curiosidade) => (
                    <tr
                      key={curiosidade.id}
                      className="border-t border-[#c9a46a]/20 transition hover:bg-[#f7f3e9]/50"
                    >

                      {/* TÍTULO DA CURIOSIDADE */}
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#14233f]">
                          {curiosidade.titulo}
                        </p>
                      </td>

                      {/* ANO */}
                      <td className="px-6 py-4 text-sm text-[#14233f]/70">
                        {curiosidade.ano ?? "—"}
                      </td>

                      {/* ORDEM */}
                      <td className="px-6 py-4 text-sm text-[#14233f]/70">
                        {curiosidade.ordem}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            curiosidade.publicado
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {curiosidade.publicado
                            ? "Publicada"
                            : "Rascunho"}
                        </span>
                      </td>

                      {/* BOTÕES DE GERENCIAMENTO */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center gap-2">

                          {/* EDITAR */}
                          <Link
                            href={`/admin/curiosidades/${curiosidade.id}/editar`}
                            className="rounded-lg bg-[#14233f] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#243b5c]"
                          >
                            Editar
                          </Link>

                          {/* PUBLICAR / DESPUBLICAR */}
                          <BotaoPublicacaoCuriosidade
                            id={curiosidade.id}
                            publicado={curiosidade.publicado}
                          />

                          {/* EXCLUIR */}
                          <BotaoExcluirCuriosidade
                            id={curiosidade.id}
                            nome={curiosidade.titulo}
                          />

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* RODAPÉ */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#14233f]/50">
            Caminhos de Maria — Painel Administrativo
          </p>
        </div>

      </div>
    </main>
  );
}
