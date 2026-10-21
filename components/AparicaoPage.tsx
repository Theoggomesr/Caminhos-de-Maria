
import Link from "next/link";
import type { ReactNode } from "react";

import type { AparicaoPublica } from "@/lib/aparicoes";
import LetraCapitular from "@/components/LetraCapitular";

// ======================================================
// TIPOS
// ======================================================

type Props = {
  aparicao: AparicaoPublica;
};

type ItemNavegacao = {
  id: string;
  label: string;
};

// ======================================================
// ORNAMENTO DOURADO ENTRE AS SEÇÕES
// ======================================================

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

// ======================================================
// ORNAMENTO FLORAL MEDIEVAL
// ======================================================

function OrnamentoCanto({
  className = "",
  transform,
}: {
  className?: string;
  transform?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={`h-12 w-12 sm:h-14 sm:w-14 ${className}`}
      style={transform ? { transform } : undefined}
      fill="none"
    >
      {/* CONTORNO DOURADO DO CANTO */}
      <path
        d="M4 55V13Q4 4 13 4H55"
        stroke="#ad813e"
        strokeWidth="1.8"
      />

      <path
        d="M9 46V15Q9 9 15 9H46"
        stroke="#d9b873"
        strokeWidth="0.8"
      />

      {/* RAMO PRINCIPAL */}
      <path
        d="M7 48C16 42 13 30 26 25C37 21 40 13 48 7"
        stroke="#98723e"
        strokeWidth="1.9"
        strokeLinecap="round"
      />

      {/* ARABESCO SUPERIOR */}
      <path
        d="M22 14C29 11 33 15 32 20C31 24 25 24 24 20C24 18 26 17 28 18"
        stroke="#b28b49"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* ARABESCO LATERAL */}
      <path
        d="M14 28C11 35 15 40 21 39C26 38 26 32 22 31C20 31 19 33 20 35"
        stroke="#b28b49"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      {/* FOLHA SUPERIOR */}
      <path
        d="M30 20C32 10 39 10 43 11C42 18 37 23 30 20Z"
        fill="#84905d"
        stroke="#97783e"
        strokeWidth="1"
      />

      <path
        d="M31 19L41 12"
        stroke="#e0c786"
        strokeWidth="0.8"
      />

      {/* FOLHA LATERAL */}
      <path
        d="M17 34C8 32 7 25 9 21C16 23 20 28 17 34Z"
        fill="#84905d"
        stroke="#97783e"
        strokeWidth="1"
      />

      <path
        d="M16 32L10 23"
        stroke="#e0c786"
        strokeWidth="0.8"
      />

      {/* FLOR MEDIEVAL */}
      <g transform="translate(27 27)">
        <ellipse
          cy="-7"
          rx="4"
          ry="7"
          fill="#355978"
          stroke="#b28b49"
          strokeWidth="0.9"
        />

        <ellipse
          cy="7"
          rx="4"
          ry="7"
          fill="#355978"
          stroke="#b28b49"
          strokeWidth="0.9"
        />

        <ellipse
          cx="-7"
          rx="7"
          ry="4"
          fill="#8f4440"
          stroke="#b28b49"
          strokeWidth="0.9"
        />

        <ellipse
          cx="7"
          rx="7"
          ry="4"
          fill="#8f4440"
          stroke="#b28b49"
          strokeWidth="0.9"
        />

        <circle
          r="3.5"
          fill="#d5b685"
          stroke="#98723e"
          strokeWidth="1"
        />

        <circle
          r="1.2"
          fill="#14233f"
        />
      </g>

      {/* PONTOS DOURADOS */}
      <circle
        cx="13"
        cy="13"
        r="2.5"
        fill="#d5b685"
        stroke="#98723e"
        strokeWidth="1"
      />

      <circle
        cx="48"
        cy="7"
        r="1.6"
        fill="#d5b685"
      />

      <circle
        cx="7"
        cy="48"
        r="1.6"
        fill="#d5b685"
      />
    </svg>
  );
}

// ======================================================
// ORNAMENTOS NOS QUATRO CANTOS
// ======================================================

function OrnamentosCard() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      {/* SUPERIOR ESQUERDO */}
      <OrnamentoCanto
        className="absolute left-0 top-0"
      />

      {/* SUPERIOR DIREITO */}
      <OrnamentoCanto
        className="absolute right-0 top-0"
        transform="scaleX(-1)"
      />

      {/* INFERIOR ESQUERDO */}
      <OrnamentoCanto
        className="absolute bottom-0 left-0"
        transform="scaleY(-1)"
      />

      {/* INFERIOR DIREITO */}
      <OrnamentoCanto
        className="absolute bottom-0 right-0"
        transform="rotate(180deg)"
      />
    </div>
  );
}

// ======================================================
// TÍTULO DAS SEÇÕES
// ======================================================

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

// ======================================================
// TEXTO PADRÃO DAS SEÇÕES
// ======================================================

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

// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export default function AparicaoPage({
  aparicao,
}: Props) {
  // Evita erros caso não existam videntes cadastrados
  const videntes = aparicao.videntes ?? [];

  // ====================================================
  // MENU DE NAVEGAÇÃO LATERAL
  // ====================================================

  const navegacao: ItemNavegacao[] = [];

  if (aparicao.historia) {
    navegacao.push({
      id: "historia",
      label: "História",
    });
  }

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

  // ====================================================
  // PRIMEIRO PARÁGRAFO DA MENSAGEM
  // ====================================================

  // Mostra somente o primeiro parágrafo no quadro lateral.
  // O texto completo continua na seção "Mensagem".
  //
  // Os parágrafos devem estar separados por uma
  // linha em branco no cadastro do Supabase.

  const resumoMensagem = aparicao.mensagem
    ? aparicao.mensagem
        .trim()
        .split(/\r?\n\s*\r?\n/)[0]
        .trim()
    : null;

  return (
    <main className="min-h-screen text-[#30291f]">

      {/* ============================================== */}
      {/* 1. CABEÇALHO DA APARIÇÃO */}
      {/* ============================================== */}

      <section className="relative isolate overflow-hidden border-b border-[#c9a46a] bg-[#14233f]">

        {/* IMAGEM DA APARIÇÃO */}
        {aparicao.imagem_url && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full sm:w-[65%] lg:w-[58%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={aparicao.imagem_url}
              alt=""
              className="h-full w-full object-cover object-[72%_12%] opacity-75"
            />
          </div>
        )}

        {/* DEGRADÊ AZUL-MARINHO */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                #14233f 0%,
                #14233f 40%,
                rgba(20,35,63,0.96) 52%,
                rgba(20,35,63,0.90) 62%,
                rgba(20,35,63,0.76) 72%,
                rgba(20,35,63,0.48) 82%,
                rgba(20,35,63,0.18) 92%,
                rgba(20,35,63,0) 100%
              )
            `,
          }}
        />

        {/* ESTRELA DECORATIVA */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-5 font-serif text-6xl text-[#c9a46a]/20"
        >
          ✦
        </div>

        {/* INFORMAÇÕES DO CABEÇALHO */}
        <div className="relative mx-auto flex min-h-100 max-w-7xl flex-col justify-center px-6 py-14 sm:px-10 lg:py-20">

          <p className="mb-4 font-serif text-sm uppercase tracking-[0.25em] text-[#d5b685]">
            Aparições de Nossa Senhora
          </p>

          <h1 className="max-w-3xl font-serif text-4xl font-medium leading-tight text-[#f7f0df] sm:text-5xl lg:text-6xl">
            {aparicao.nome}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 font-serif text-base text-[#f0e3cc] sm:text-lg">

            {aparicao.local && (
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="text-[#d5b685]"
                >
                  ✦
                </span>

                {aparicao.local}
              </span>
            )}

            <span className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="text-[#d5b685]"
              >
                ✦
              </span>

              {aparicao.pais}
            </span>

            {aparicao.periodo && (
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="text-[#d5b685]"
                >
                  ✦
                </span>

                {aparicao.periodo}
              </span>
            )}

          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* 2. CONTEÚDO PRINCIPAL */}
      {/* FUNDO DEFINIDO NO GLOBALS.CSS */}
      {/* ============================================== */}

      <div className="relative">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-7 sm:px-10">

          {/* ========================================== */}
          {/* CAMINHO DE NAVEGAÇÃO */}
          {/* ========================================== */}

          <nav
            aria-label="Caminho de navegação"
            className="mb-12 flex flex-wrap items-center gap-3 font-serif text-sm text-[#6b5a42]"
          >
            <Link
              href="/"
              className="transition hover:text-[#14233f]"
            >
              Início
            </Link>

            <span aria-hidden="true">›</span>

            <Link
              href="/aparicoes"
              className="transition hover:text-[#14233f]"
            >
              Aparições
            </Link>

            <span aria-hidden="true">›</span>

            <span
              aria-current="page"
              className="text-[#14233f]"
            >
              {aparicao.nome}
            </span>
          </nav>

          {/* ========================================== */}
          {/* 3. LAYOUT PRINCIPAL DE TRÊS COLUNAS */}
          {/* ========================================== */}

          <div className="grid items-start gap-8 lg:grid-cols-[220px_minmax(0,1fr)_260px] xl:gap-10">

            {/* ======================================== */}
            {/* MENU LATERAL ESQUERDO */}
            {/* ======================================== */}

            <aside className="lg:sticky lg:top-24">

              <nav aria-label="Seções da aparição">

                <div className="overflow-hidden rounded-md border border-[#c9a46a]/40 bg-[#fffaf0]/70 shadow-sm">

                  {/* TÍTULO DO MENU */}
                  <div className="bg-[#14233f] px-5 py-4 font-serif text-lg font-semibold text-[#f7f0df]">

                    <span className="mr-2 text-[#d5b685]">
                      ✦
                    </span>

                    Nesta página
                  </div>

                  {/* LINKS DO MENU */}
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

            {/* ======================================== */}
            {/* CONTEÚDO CENTRAL */}
            {/* ======================================== */}

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
              {/* 3. MENSAGEM COMPLETA */}
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
              {/* 5. RECONHECIMENTO DA IGREJA */}
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

            {/* ======================================== */}
            {/* COLUNA LATERAL DIREITA */}
            {/* ======================================== */}

            <aside
              id="informacoes"
              className="min-w-0 scroll-mt-28 space-y-7 lg:sticky lg:top-24"
            >

              {/* ====================================== */}
              {/* QUADRO COM ORNAMENTOS FLORAIS */}
              {/* ====================================== */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-sm
                  border
                  border-[#c9a46a]/75
                  bg-[#fff9ed]/90
                  px-5
                  py-8
                  text-center
                  shadow-sm
                "
              >

                {/* ORNAMENTOS NOS QUATRO CANTOS */}
                <OrnamentosCard />

                <div className="relative z-10 px-4 py-4">

                  {/* NOME DA APARIÇÃO */}
                  <h2 className="font-serif text-2xl font-semibold leading-snug text-[#14233f]">
                    {aparicao.nome}
                  </h2>

                  <Ornamento className="my-6" />

                  {/* ================================== */}
                  {/* SOMENTE O PRIMEIRO PARÁGRAFO */}
                  {/* ================================== */}

                  {resumoMensagem && (
                    <>
                      <h3 className="mb-3 font-serif text-xs font-semibold uppercase tracking-[0.18em] text-[#a97c2f]">
                        Mensagem associada
                      </h3>

                      <p className="whitespace-pre-line font-serif text-base italic leading-8 text-[#765728]">
                        {resumoMensagem}
                      </p>

                      <Ornamento className="my-6" />
                    </>
                  )}

                  {/* PERÍODO */}
                  {aparicao.periodo && (
                    <p className="font-serif text-sm text-[#594936]">
                      {aparicao.periodo}
                    </p>
                  )}

                  {/* PAÍS */}
                  <p className="mt-2 font-serif text-sm text-[#594936]">
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
