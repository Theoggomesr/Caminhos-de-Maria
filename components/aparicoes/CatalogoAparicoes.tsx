
"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { AparicaoPublica } from "@/lib/aparicoes";

type Props = {
  aparicoes: AparicaoPublica[];
};

export default function CatalogoAparicoes({
  aparicoes,
}: Props) {
  // Lê o termo enviado pela busca da página inicial
  const searchParams = useSearchParams();
  const termoUrl = searchParams.get("q") ?? "";

  const [pesquisaDigitada, setPesquisaDigitada] = useState<string | null>(
    null
  );
  const [pais, setPais] = useState("todos");
  const [ordem, setOrdem] = useState("antigas");

  // Utiliza a busca da URL até o usuário editar o campo
  const pesquisa = pesquisaDigitada ?? termoUrl;

  const paises = useMemo(() => {
    return [...new Set(aparicoes.map((a) => a.pais))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b, "pt-BR"));
  }, [aparicoes]);

  const filtradas = useMemo(() => {
    const normalizar = (texto: string) =>
      texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();

    const termo = normalizar(pesquisa).trim();

    return aparicoes
      .filter((aparicao) => {
        const conteudo = normalizar(
          [
            aparicao.nome,
            aparicao.pais,
            aparicao.local ?? "",
            aparicao.descricao ?? "",
          ].join(" ")
        );

        const correspondePesquisa =
          !termo || conteudo.includes(termo);

        const correspondePais =
          pais === "todos" || aparicao.pais === pais;

        return correspondePesquisa && correspondePais;
      })
      .sort((a, b) => {
        if (ordem === "nome") {
          return a.nome.localeCompare(b.nome, "pt-BR");
        }

        if (ordem === "recentes") {
          return (b.ano ?? -1) - (a.ano ?? -1);
        }

        return (a.ano ?? 99999) - (b.ano ?? 99999);
      });
  }, [aparicoes, pesquisa, pais, ordem]);

  return (
    <div>
      {/* PESQUISA E FILTROS */}
      <div className="mb-8 rounded-xl border border-[#d5b685]/30 bg-white p-6 shadow-sm">
        <h2 className="mb-5 font-serif text-xl font-semibold text-[#14233f]">
          Explore as aparições
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          {/* PESQUISA */}
          <div>
            <label
              htmlFor="pesquisa"
              className="mb-2 block text-sm font-medium text-[#14233f]"
            >
              Pesquisar
            </label>

            <input
              id="pesquisa"
              type="search"
              value={pesquisa}
              onChange={(e) => setPesquisaDigitada(e.target.value)}
              placeholder="Nome, cidade ou país..."
              className="w-full rounded-lg border border-[#d5b685]/50 bg-[#f7f3e9] px-4 py-3 text-sm text-[#a97c2f] placeholder:text-[#a97c2f]/60 outline-none focus:border-[#c9a46a]"
            />
          </div>

          {/* FILTRO POR PAÍS */}
          <div>
            <label
              htmlFor="pais"
              className="mb-2 block text-sm font-medium text-[#14233f]"
            >
              País
            </label>

            <select
              id="pais"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              className="w-full rounded-lg border border-[#d5b685]/50 bg-[#f7f3e9] px-4 py-3 text-sm text-[#a97c2f] outline-none focus:border-[#c9a46a]"
            >
              <option value="todos">Todos os países</option>

              {paises.map((nomePais) => (
                <option key={nomePais} value={nomePais}>
                  {nomePais}
                </option>
              ))}
            </select>
          </div>

          {/* ORDENAÇÃO */}
          <div>
            <label
              htmlFor="ordem"
              className="mb-2 block text-sm font-medium text-[#14233f]"
            >
              Ordenar por
            </label>

            <select
              id="ordem"
              value={ordem}
              onChange={(e) => setOrdem(e.target.value)}
              className="w-full rounded-lg border border-[#d5b685]/50 bg-[#f7f3e9] px-4 py-3 text-sm text-[#a97c2f] outline-none focus:border-[#c9a46a]"
            >
              <option value="antigas">Mais antigas</option>
              <option value="recentes">Mais recentes</option>
              <option value="nome">Nome (A–Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* CONTADOR */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="font-serif text-2xl font-semibold text-[#a97c2f]">
          Aparições encontradas
        </h2>

        <span className="text-sm text-[#a97c2f]/60">
          {filtradas.length} resultado(s)
        </span>
      </div>

      {/* CARDS */}
      {filtradas.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtradas.map((aparicao) => (
            <article
              key={aparicao.id}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#d5b685]/30 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {/* IMAGEM DA APARIÇÃO */}
              <div className="relative flex h-44 items-center justify-center overflow-hidden bg-linear-to-br from-[#14233f] to-[#243b5c]">
                {aparicao.imagem_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={aparicao.imagem_url}
                    alt={`Imagem de ${aparicao.nome}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span
                    className="font-serif text-6xl text-[#d5b685]"
                    aria-hidden="true"
                  >
                    ✦
                  </span>
                )}
              </div>

              {/* INFORMAÇÕES */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#f7f3e9] px-3 py-1 text-xs font-medium text-[#80663d]">
                    {aparicao.pais}
                  </span>

                  {aparicao.ano !== null && (
                    <span className="rounded-full bg-[#f7f3e9] px-3 py-1 text-xs font-medium text-[#80663d]">
                      {aparicao.ano}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#14233f]">
                  {aparicao.nome}
                </h3>

                {aparicao.local && (
                  <p className="mt-2 text-sm text-[#80663d]">
                    {aparicao.local}
                  </p>
                )}

                <p className="mt-4 line-clamp-4 flex-1 text-sm leading-relaxed text-[#14233f]/70">
                  {aparicao.descricao ||
                    "Conheça a história e as mensagens relacionadas a esta aparição de Nossa Senhora."}
                </p>

                <Link
                  href={`/aparicoes/${aparicao.slug}`}
                  className="mt-6 inline-flex items-center gap-2 self-start font-semibold text-[#98723e] transition hover:text-[#14233f]"
                >
                  Conhecer aparição
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[#d5b685]/30 bg-white px-6 py-16 text-center">
          <span
            className="text-4xl text-[#d5b685]"
            aria-hidden="true"
          >
            ✦
          </span>

          <h3 className="mt-4 font-serif text-xl font-semibold text-[#a97c2f]">
            Nenhuma aparição encontrada
          </h3>

          <p className="mt-3 text-sm text-[#a97c2f]/60">
            {aparicoes.length === 0
              ? "Ainda não existem aparições publicadas."
              : "Tente alterar os filtros ou o termo pesquisado."}
          </p>

          {aparicoes.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setPesquisaDigitada("");
                setPais("todos");
                setOrdem("antigas");
              }}
              className="mt-5 rounded-lg bg-[#d5b685] px-5 py-2 font-semibold text-[#14233f]"
            >
              Limpar filtros
            </button>
          )}
        </div>
      )}
    </div>
  );
}
