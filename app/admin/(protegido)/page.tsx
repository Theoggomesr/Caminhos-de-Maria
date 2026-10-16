
import Link from "next/link";
import { exigirAdministrador } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import BotaoExcluir from "@/components/admin/BotaoExcluir";
import BotaoPublicacao from "@/components/admin/BotaoPublicacao";

export const dynamic = "force-dynamic";

export default async function AdminAparicoes() {
  // Verifica se o usuário possui permissão de administrador
  await exigirAdministrador();

  // Conecta ao Supabase
  const supabase = await createClient();

  // Busca todas as aparições cadastradas
  const { data: aparicoes, error } = await supabase
    .from("aparicoes")
    .select("id, nome, slug, pais, ano, publicado")
    .order("criado_em", { ascending: false });

  // Trata erros na consulta
  if (error) {
    console.error("Erro ao buscar aparições:", error.message);

    throw new Error(
      "Não foi possível carregar as aparições cadastradas."
    );
  }

  // Garante que a lista seja um array
  const lista = aparicoes ?? [];

  // Calcula os indicadores
  const total = lista.length;

  const publicadas = lista.filter(
    (aparicao) => aparicao.publicado === true
  ).length;

  const rascunhos = total - publicadas;

  return (
    <main className="min-h-screen bg-[#f7f3e9] px-6 py-10">
      <div className="mx-auto max-w-6xl">

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
              Gerenciar Aparições
            </h1>

            <p className="mt-2 text-[#14233f]/70">
              Cadastre, edite, publique e gerencie as aparições
              de Nossa Senhora.
            </p>
          </div>

          {/* BOTÃO NOVA APARIÇÃO */}
          <Link
            href="/admin/aparicoes/nova"
            className="inline-flex items-center gap-2 rounded-lg bg-[#d5b685] px-5 py-3 font-semibold text-[#14233f] shadow-sm transition hover:bg-[#c9a46a]"
          >
            <span className="text-xl leading-none">+</span>
            Nova aparição
          </Link>
        </div>

        {/* INDICADORES */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">

          {/* TOTAL */}
          <div className="rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#14233f]/70">
              Total de aparições
            </p>

            <p className="mt-3 text-3xl font-bold text-[#14233f]">
              {total}
            </p>
          </div>

          {/* PUBLICADAS */}
          <div className="rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#14233f]/70">
              Aparições publicadas
            </p>

            <p className="mt-3 text-3xl font-bold text-green-700">
              {publicadas}
            </p>
          </div>

          {/* RASCUNHOS */}
          <div className="rounded-xl border border-[#c9a46a]/30 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-[#14233f]/70">
              Aparições em rascunho
            </p>

            <p className="mt-3 text-3xl font-bold text-amber-700">
              {rascunhos}
            </p>
          </div>
        </div>

        {/* LISTAGEM DAS APARIÇÕES */}
        <section className="overflow-hidden rounded-xl border border-[#c9a46a]/30 bg-white shadow-sm">

          {/* TÍTULO DA TABELA */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c9a46a]/20 p-6">
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#14233f]">
                Aparições cadastradas
              </h2>

              <p className="mt-1 text-sm text-[#14233f]/60">
                Gerencie os registros armazenados no Supabase.
              </p>
            </div>

            <span className="rounded-full bg-[#f7f3e9] px-4 py-2 text-sm font-medium text-[#14233f]">
              {total} {total === 1 ? "registro" : "registros"}
            </span>
          </div>

          {/* LISTA VAZIA */}
          {lista.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">

              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f7f3e9] text-3xl text-[#c9a46a]">
                ✦
              </div>

              <h3 className="font-serif text-xl font-semibold text-[#14233f]">
                Nenhuma aparição cadastrada
              </h3>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-[#14233f]/60">
                Você ainda não cadastrou nenhuma aparição.
                Comece adicionando a primeira aparição
                de Nossa Senhora ao banco de dados.
              </p>

              <Link
                href="/admin/aparicoes/nova"
                className="mt-6 rounded-lg bg-[#d5b685] px-6 py-3 font-semibold text-[#14233f] transition hover:bg-[#c9a46a]"
              >
                + Cadastrar aparição
              </Link>
            </div>
          ) : (

            /* TABELA COM APARIÇÕES */
            <div className="overflow-x-auto">
              <table className="w-full text-left">

                {/* CABEÇALHO DA TABELA */}
                <thead className="bg-[#f7f3e9]">
                  <tr className="text-sm font-semibold text-[#14233f]">
                    <th className="px-6 py-4">
                      Aparição
                    </th>

                    <th className="px-6 py-4">
                      País
                    </th>

                    <th className="px-6 py-4">
                      Ano
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
                  {lista.map((aparicao) => (
                    <tr
                      key={aparicao.id}
                      className="border-t border-[#c9a46a]/20 transition hover:bg-[#f7f3e9]/50"
                    >

                      {/* NOME DA APARIÇÃO */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-[#14233f]">
                            {aparicao.nome}
                          </p>

                          <p className="mt-1 text-xs text-[#14233f]/50">
                            {aparicao.slug}
                          </p>
                        </div>
                      </td>

                      {/* PAÍS */}
                      <td className="px-6 py-4 text-sm text-[#14233f]/70">
                        {aparicao.pais}
                      </td>

                      {/* ANO */}
                      <td className="px-6 py-4 text-sm text-[#14233f]/70">
                        {aparicao.ano ?? "—"}
                      </td>

                      {/* STATUS */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            aparicao.publicado
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {aparicao.publicado
                            ? "Publicada"
                            : "Rascunho"}
                        </span>
                      </td>

                      {/* BOTÕES DE GERENCIAMENTO */}
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap items-center gap-2">

                          {/* EDITAR */}
                          <Link
                            href={`/admin/aparicoes/${aparicao.id}/editar`}
                            className="rounded-lg bg-[#14233f] px-3 py-2 text-sm font-medium text-white transition hover:bg-[#243b5c]"
                          >
                            Editar
                          </Link>

                          {/* PUBLICAR / DESPUBLICAR */}
                          <BotaoPublicacao
                            id={aparicao.id}
                            publicado={aparicao.publicado}
                          />

                          {/* EXCLUIR */}
                          <BotaoExcluir
                            id={aparicao.id}
                            nome={aparicao.nome}
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

        {/* RODAPÉ DA PÁGINA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-[#14233f]/50">
            Caminhos de Maria — Painel Administrativo
          </p>
        </div>

      </div>
    </main>
  );
}
