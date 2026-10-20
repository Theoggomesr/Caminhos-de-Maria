
import Link from "next/link";
import type { ReactNode } from "react";

import type { AparicaoPublica } from "@/lib/aparicoes";
import LetraCapitular from "@/components/LetraCapitular";

type Props = {
  aparicao: AparicaoPublica;
};

type ItemNavegacao = {
  id: string;
  label: string;
};

// ORNAMENTO DOURADO ENTRE AS SEÇÕES
function Ornamento({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-3 text-[#b28b49] ${className}`}
    >
      <span className="h-px flex-1 bg-[#b28b49]/70" />

      <svg
        viewBox="0 0 40 40"
        className="h-8 w-8 shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2C22 12 28 18 38 20C28 22 22 28 20 38C18 28 12 22 2 20C12 18 18 12 20 2Z"
          fill="currentColor"
        />

        <circle
          cx="20"
          cy="20"
          r="4"
          fill="#f7f0df"
        />

        <path
          d="M20 10V30M10 20H30"
          stroke="#765728"
          strokeWidth="1.2"
        />
      </svg>

      <span className="h-px flex-1 bg-[#b28b49]/70" />
    </div>
  );
}

// TÍTULO DAS SEÇÕES
function TituloSecao({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <div id={id} className="scroll-mt-28">
      <h2 className="font-serif text-3xl font-semibold text-[#14233f] sm:text-4xl">
        {children}
      </h2>

      <Ornamento className="mb-6 mt-3" />
    </div>
  );
}

// TEXTO PADRÃO DAS SEÇÕES
function TextoSecao({
  texto,
}: {
  texto: string;
}) {
  return (
    <div className="whitespace-pre-line font-serif text-[17px] leading-8 text-[#42382d] sm:text-lg sm:leading-9">
      {texto}
    </div>
  );
}

// COMPONENTE PRINCIPAL
export default function AparicaoPage({ aparicao }: Props) {
  // Evita erros caso não existam videntes cadastrados
  const videntes = aparicao.videntes ?? [];

  // ITENS DO MENU LATERAL
  const navegacao: ItemNavegacao[] = [];

  // HISTÓRIA AGORA APARECE PRIMEIRO
  if (aparicao.historia) {
    navegacao.push({
      id: "historia",
      label: "História",
    });
  }

  // DESCRIÇÃO AGORA APARECE DEPOIS DA HISTÓRIA
  if (aparicao.descricao) {
    navegacao.push({
      id: "descricao",
      label: "Descrição",
    });
  }

  if (aparicao.mensagem) {
    navegacao.push({
      id: "mensagem",
      label: "Mensagem",
    });
  }

  if (videntes.length > 0) {
    navegacao.push({
      id: "videntes",
      label: "Videntes",
    });
  }

  if (aparicao.reconhecimento) {
    navegacao.push({
      id: "reconhecimento",
      label: "Reconhecimento da Igreja",
    });
  }

  if (
    aparicao.santuario_nome ||
    aparicao.santuario_descricao
  ) {
    navegacao.push({
      id: "santuario",
      label: "Santuário",
    });
  }

  navegacao.push({
    id: "informacoes",
    label: "Informações",
  });

  // RESUMO DA MENSAGEM PARA O QUADRO LATERAL
  const resumoMensagem = aparicao.mensagem
    ? aparicao.mensagem.length > 200
      ? `${aparicao.mensagem.slice(0, 197).trimEnd()}...`
      : aparicao.mensagem
    : null;

  return (
    <main className="min-h-screen bg-[#f7f0df] text-[#30291f]">

      {/* ====================================== */}
      {/* CABEÇALHO DA APARIÇÃO */}
      {/* ====================================== */}

      <section className="relative isolate overflow-hidden border-b border-[#c9a46a] bg-[#14233f]">

        {/* IMAGEM DA APARIÇÃO */}
        {aparicao.imagem_url && (
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 -z-10 w-full sm:w-[65%] lg:w-[50%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={aparicao.imagem_url}
              alt=""
              className="h-full w-full object-cover object-center opacity-60"
            />
          </div>
        )}

        {/* DEGRADÊ SOBRE A IMAGEM */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-r from-[#14233f] via-[#14233f]/95 to-[#14233f]/45"
        />

        {/* ESTRELA DECORATIVA */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-5 font-serif text-6xl text-[#c9a46a]/20"
        >
          ✦
        </div>

        {/* INFORMAÇÕES DO CABEÇALHO */}
        <div className="relative mx-auto flex min-h-65 max-w-7xl flex-col justify-center px-6 py-14 sm:min-h-80 sm:px-10 lg:py-20">

          <p className="mb-4 font-serif text-sm uppercase tracking-[0.25em] text-[#d5b685]">
            Aparições de Nossa Senhora
          </p>

          <h1 className="max-w-3xl font-serif text-4xl font-medium leading-tight text-[#f7f0df] sm:text-5xl lg:text-6xl">
            {aparicao.nome}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 font-serif text-base text-[#f0e3cc] sm:text-lg">

            {aparicao.local && (
              <span className="flex items-center gap-2">
                <span className="text-[#d5b685]">
                  ✦
                </span>

                {aparicao.local}
              </span>
            )}

            <span className="flex items-center gap-2">
              <span className="text-[#d5b685]">
                ✦
              </span>

              {aparicao.pais}
            </span>

            {aparicao.periodo && (
              <span className="flex items-center gap-2">
                <span className="text-[#d5b685]">
                  ✦
                </span>

                {aparicao.periodo}
              </span>
            )}

          </div>
        </div>
      </section>

      {/* ====================================== */}
      {/* FUNDO EM ESTILO PERGAMINHO */}
      {/* ====================================== */}

      <div
        className="relative"
        style={{
          backgroundImage: `
            radial-gradient(
              ellipse at 15% 15%,
              rgba(201, 164, 106, 0.13),
              transparent 45%
            ),
            radial-gradient(
              ellipse at 85% 75%,
              rgba(201, 164, 106, 0.11),
              transparent 50%
            ),
            linear-gradient(
              135deg,
              #fbf6e9 0%,
              #f7f0df 50%,
              #f2e6d0 100%
            )
          `,
        }}
      >
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-7 sm:px-10">

          {/* ====================================== */}
          {/* CAMINHO DE NAVEGAÇÃO */}
          {/* ====================================== */}

          <nav
            aria-label="Caminho de navegação"
            className="mb-12 flex flex-wrap items-center gap-3 font-serif text-sm text-[#6b5a42]"
          >
            <Link
              href="/"
              className="hover:text-[#14233f]"
            >
              Início
            </Link>

            <span aria-hidden="true">
              ›
            </span>

            <Link
              href="/aparicoes"
              className="hover:text-[#14233f]"
            >
              Aparições
            </Link>

            <span aria-hidden="true">
              ›
            </span>

            <span className="text-[#14233f]">
              {aparicao.nome}
            </span>
          </nav>

          {/* ====================================== */}
          {/* LAYOUT PRINCIPAL DE TRÊS COLUNAS */}
          {/* ====================================== */}

          <div className="grid items-start gap-8 lg:grid-cols-[220px_minmax(0,1fr)_240px] xl:gap-10">

            {/* ====================================== */}
            {/* MENU LATERAL ESQUERDO */}
            {/* ====================================== */}

            <aside className="lg:sticky lg:top-24">
              <nav aria-label="Seções da aparição">

                <div className="overflow-hidden rounded-md border border-[#c9a46a]/40 bg-[#fffaf0]/70 shadow-sm">

                  <div className="bg-[#14233f] px-5 py-4 font-serif text-lg font-semibold text-[#f7f0df]">
                    <span className="mr-2 text-[#d5b685]">
                      ✦
                    </span>

                    Nesta página
                  </div>

                  <ul className="divide-y divide-[#c9a46a]/30 px-4">

                    {navegacao.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="block py-3 font-serif text-[15px] text-[#42382d] transition hover:translate-x-1 hover:text-[#a97c2f]"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}

                  </ul>
                </div>

              </nav>
            </aside>

            {/* ====================================== */}
            {/* CONTEÚDO CENTRAL */}
            {/* ====================================== */}

            <div className="min-w-0 space-y-12">

              {/* ====================================== */}
              {/* 1. HISTÓRIA */}
              {/* ====================================== */}

              {aparicao.historia && (
                <section aria-labelledby="historia">

                  <TituloSecao id="historia">
                    História
                  </TituloSecao>

                  <div className="font-serif text-[17px] sm:text-lg [&_p]:text-[#42382d] [&_p]:leading-8 sm:[&_p]:leading-9">
                    <LetraCapitular
                      texto={aparicao.historia}
                    />
                  </div>

                </section>
              )}

              {/* ====================================== */}
              {/* 2. DESCRIÇÃO */}
              {/* ====================================== */}

              {aparicao.descricao && (
                <section aria-labelledby="descricao">

                  <TituloSecao id="descricao">
                    Descrição
                  </TituloSecao>

                  <TextoSecao
                    texto={aparicao.descricao}
                  />

                </section>
              )}

              {/* ====================================== */}
              {/* 3. MENSAGEM */}
              {/* ====================================== */}

              {aparicao.mensagem && (
                <section aria-labelledby="mensagem">

                  <TituloSecao id="mensagem">
                    Mensagem
                  </TituloSecao>

                  <TextoSecao
                    texto={aparicao.mensagem}
                  />

                </section>
              )}

              {/* ====================================== */}
              {/* 4. VIDENTES */}
              {/* ====================================== */}

              {videntes.length > 0 && (
                <section aria-labelledby="videntes">

                  <TituloSecao id="videntes">
                    Videntes
                  </TituloSecao>

                  <ul className="space-y-3 font-serif text-lg text-[#42382d]">

                    {videntes.map((vidente) => (
                      <li
                        key={vidente}
                        className="flex items-start gap-3"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1 text-[#b28b49]"
                        >
                          ✦
                        </span>

                        {vidente}
                      </li>
                    ))}

                  </ul>
                </section>
              )}

              {/* ====================================== */}
              {/* 5. RECONHECIMENTO PELA IGREJA */}
              {/* ====================================== */}

              {aparicao.reconhecimento && (
                <section aria-labelledby="reconhecimento">

                  <TituloSecao id="reconhecimento">
                    Reconhecimento da Igreja
                  </TituloSecao>

                  <TextoSecao
                    texto={aparicao.reconhecimento}
                  />

                </section>
              )}

              {/* ====================================== */}
              {/* 6. SANTUÁRIO */}
              {/* ====================================== */}

              {(
                aparicao.santuario_nome ||
                aparicao.santuario_descricao
              ) && (
                <section aria-labelledby="santuario">

                  <TituloSecao id="santuario">
                    Santuário
                  </TituloSecao>

                  {aparicao.santuario_nome && (
                    <h3 className="mb-4 font-serif text-xl font-semibold text-[#765728]">
                      {aparicao.santuario_nome}
                    </h3>
                  )}

                  {aparicao.santuario_descricao && (
                    <TextoSecao
                      texto={aparicao.santuario_descricao}
                    />
                  )}

                </section>
              )}

              {/* ORNAMENTO FINAL */}
              <Ornamento className="pt-6" />

            </div>

            {/* ====================================== */}
            {/* COLUNA LATERAL DIREITA */}
            {/* ====================================== */}

            <aside
              id="informacoes"
              className="min-w-0 scroll-mt-28 space-y-7 lg:sticky lg:top-24"
            >

              {/* ====================================== */}
              {/* QUADRO COM MOLDURA MEDIEVAL */}
              {/* ====================================== */}

              <div
                className="
                  relative
                  flex
                  min-h-107.5
                  flex-col
                  items-center
                  justify-center
                  bg-transparent
                  px-9
                  py-20
                  text-center
                "
                style={{
                  backgroundImage:
                    "url('/imagens/moldura-lateral.png')",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              >

                {/* CONTEÚDO DA MOLDURA */}
                <div className="relative z-10 w-full min-w-0">

                  {/* NOME DA APARIÇÃO */}
                  <h2 className="wrap-break-word font-serif text-xl font-semibold leading-snug text-[#14233f]">
                    {aparicao.nome}
                  </h2>

                  <Ornamento className="my-5" />

                  {/* MENSAGEM ASSOCIADA */}
                  {resumoMensagem && (
                    <>
                      <h3 className="mb-3 font-serif text-xs font-semibold uppercase tracking-widest text-[#a97c2f]">
                        Mensagem associada
                      </h3>

                      <p className="whitespace-pre-line wrap-break-word font-serif text-sm italic leading-6 text-[#765728]">
                        {resumoMensagem}
                      </p>

                      <Ornamento className="my-6" />
                    </>
                  )}

                  {/* PERÍODO */}
                  {aparicao.periodo && (
                    <p className="wrap-break-word font-serif text-sm text-[#594936]">
                      {aparicao.periodo}
                    </p>
                  )}

                  {/* PAÍS */}
                  <p className="mt-2 wrap-break-word font-serif text-sm text-[#594936]">
                    {aparicao.pais}
                  </p>

                </div>
              </div>

              {/* ====================================== */}
              {/* INFORMAÇÕES COMPLEMENTARES */}
              {/* ====================================== */}

              <div className="rounded-md border border-[#c9a46a]/40 bg-[#fffaf0]/70 p-6 shadow-sm">

                <h2 className="border-b border-[#c9a46a]/50 pb-3 font-serif text-xl font-semibold text-[#14233f]">
                  Informações
                </h2>

                <dl className="mt-5 space-y-5">

                  {/* LOCAL */}
                  <div>
                    <dt className="font-serif text-sm font-semibold uppercase tracking-wide text-[#a97c2f]">
                      Local
                    </dt>

                    <dd className="mt-1 font-serif text-base text-[#42382d]">
                      {aparicao.local || "Não informado"}
                    </dd>
                  </div>

                  {/* PAÍS */}
                  <div>
                    <dt className="font-serif text-sm font-semibold uppercase tracking-wide text-[#a97c2f]">
                      País
                    </dt>

                    <dd className="mt-1 font-serif text-base text-[#42382d]">
                      {aparicao.pais}
                    </dd>
                  </div>

                  {/* PERÍODO */}
                  {aparicao.periodo && (
                    <div>
                      <dt className="font-serif text-sm font-semibold uppercase tracking-wide text-[#a97c2f]">
                        Período
                      </dt>

                      <dd className="mt-1 font-serif text-base text-[#42382d]">
                        {aparicao.periodo}
                      </dd>
                    </div>
                  )}

                  {/* VIDENTES */}
                  <div>
                    <dt className="font-serif text-sm font-semibold uppercase tracking-wide text-[#a97c2f]">
                      Videntes
                    </dt>

                    <dd className="mt-1 font-serif text-base text-[#42382d]">
                      {videntes.length > 0
                        ? videntes.join(", ")
                        : "Não informado"}
                    </dd>
                  </div>

                </dl>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
