
import Link from "next/link";
import { listarAparicoesPublicadas } from "@/lib/aparicoes";

const NAVEGACAO = [
  { label: "Início", href: "/" },
  { label: "Aparições", href: "/aparicoes" },
  { label: "Mapa", href: "/mapa" },
  { label: "Linha do tempo", href: "/linha-do-tempo" },
  { label: "Sobre", href: "/sobre" },
];

// Substitua os "#" pelos endereços reais das redes sociais
const REDES = [
  { label: "Instagram", href: "#", icone: "instagram" },
  { label: "Facebook", href: "#", icone: "facebook" },
  { label: "YouTube", href: "#", icone: "youtube" },
] as const;

function IconeRede({
  tipo,
}: {
  tipo: (typeof REDES)[number]["icone"];
}) {
  const comum = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (tipo === "instagram") {
    return (
      <svg {...comum}>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }

  if (tipo === "facebook") {
    return (
      <svg {...comum}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }

  return (
    <svg {...comum}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function Estrela({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0 C12.8 7 17 11.2 24 12 C17 12.8 12.8 17 12 24 C11.2 17 7 12.8 0 12 C7 11.2 11.2 7 12 0 Z" />
    </svg>
  );
}

export default async function Footer() {
  const ano = new Date().getFullYear();

  // Busca somente as aparições publicadas no Supabase
  const aparicoes = await listarAparicoesPublicadas();

  // Seleciona as quatro primeiras aparições
  const aparicoesRodape = aparicoes.slice(0, 4);

  return (
    <footer className="relative isolate  bg-[#14233f] text-[#e6dcce]">
      {/* BACKGROUND DECORATIVO */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-10
          overflow-hidden
          bg-[#14233f]
          bg-[url('/imagens/background-footer.png')]
          bg-cover
          bg-position-[75%_center]
          bg-no-repeat
          md:bg-right
        "
      />

      {/* DEGRADÊ PARA MELHORAR A LEITURA */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-10
          bg-linear-to-r
          from-[#14233f]/75
          via-[#14233f]/45
          to-[#14233f]/15
        "
      />

      {/* BORDA SUPERIOR COM CURVA E ESTRELA */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 flex h-7 -translate-y-full items-end"
      >
        <div className="flex-1 border-b border-[#c9a46a]/70" />

        <svg
          viewBox="0 0 160 32"
          className="h-8 w-40 shrink-0 overflow-visible"
        >
          {/* Preenchimento da curva */}
          <path
            d="M0 33 L0 31.5 H46 C60 31.5 60 4 80 4 C100 4 100 31.5 114 31.5 H160 L160 33 Z"
            fill="#14233f"
          />

          {/* Linha dourada */}
          <path
            d="M0 31.5 H46 C60 31.5 60 4 80 4 C100 4 100 31.5 114 31.5 H160"
            fill="none"
            stroke="#c9a46a"
            strokeOpacity="0.7"
            strokeWidth="1"
          />

          {/* Estrela central */}
          <path
            transform="translate(73 12) scale(0.58)"
            fill="#c9a46a"
            d="M12 0 C12.8 7 17 11.2 24 12 C17 12.8 12.8 17 12 24 C11.2 17 7 12.8 0 12 C7 11.2 11.2 7 12 0 Z"
          />
        </svg>

        <div className="flex-1 border-b border-[#c9a46a]/70" />
      </div>

      {/* CONTEÚDO DO FOOTER */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-8 pt-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* MARCA */}
          <div>
            <p className="flex items-center gap-2 font-serif text-xl font-semibold uppercase leading-tight tracking-wide text-[#e6dcce]">
              <Estrela className="h-4 w-4 shrink-0 text-[#c9a46a]" />
              Caminhos de Maria
            </p>

            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Um espaço dedicado a partilhar a história, a fé e as
              mensagens das aparições de Nossa Senhora pelo mundo.
            </p>

            {/* REDES SOCIAIS */}
            <div className="mt-5 flex gap-4">
              {REDES.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  aria-label={r.label}
                  className="text-[#c9a46a] transition hover:text-[#e6dcce]"
                >
                  <IconeRede tipo={r.icone} />
                </a>
              ))}
            </div>
          </div>

          {/* NAVEGAÇÃO */}
          <nav aria-label="Navegação do rodapé">
            <h2 className="font-serif text-lg font-semibold uppercase tracking-wide text-[#c9a46a]">
              Navegação
            </h2>

            <ul className="mt-4 space-y-2.5 text-sm">
              {NAVEGACAO.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* APARIÇÕES DO SUPABASE */}
          <div>
            <h2 className="font-serif text-lg font-semibold uppercase tracking-wide text-[#c9a46a]">
              Aparições
            </h2>

            <ul className="mt-4 space-y-2.5 text-sm">
              {aparicoesRodape.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/aparicoes/${a.slug}`}
                    className="hover:text-white hover:underline"
                  >
                    {a.nome}
                  </Link>
                </li>
              ))}

              <li>
                <Link
                  href="/aparicoes"
                  className="hover:text-white hover:underline"
                >
                  Ver todas as aparições
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 border-t border-[#c9a46a]/50 pt-6">
          <div className="flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
            <p className="flex flex-wrap items-center gap-x-2">
              © {ano} Totus Tuus Mariae. Todos os direitos reservados.
              <Estrela className="h-3 w-3 text-[#c9a46a]" />
              Feito com fé e devoção.
            </p>

            <p>
              <a
                href="#"
                className="hover:text-white hover:underline"
              >
                Políticas de Privacidade
              </a>{" "}
              |{" "}
              <a
                href="#"
                className="hover:text-white hover:underline"
              >
                Termos de Uso
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
