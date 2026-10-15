
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeaderOrnaments from "@/components/HeaderOrnaments";
import Image from "next/image";

const LINKS = [
  { label: "Início", href: "/" },
  { label: "Aparições", href: "/aparicoes" },
  { label: "Mapa", href: "/mapa" },
  { label: "Linha do Tempo", href: "/linha-do-tempo" },
  { label: "Sobre", href: "/sobre" },
];

function paginaAtiva(pathname: string, href: string) {
  return href === "/"
    ? pathname === "/"
    : pathname.startsWith(href);
}

export default function Header() {
  const pathname = usePathname();
  const [aberto, setAberto] = useState(false);

  return (
    <header className="relative border-b border-[#c9a46a]/70 bg-linear-to-b from-[#14233f] to-[#0f1b33]">

      {/* Ornamentos decorativos */}
      <HeaderOrnaments />

      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">

        {/* Marca com emblema mariano */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setAberto(false)}
        >
        <Image
          src="/imagens/emblema-mariano.png"
          alt="Emblema Mariano"
          width={55}
          height={72}
          className="h-[65px] w-auto object-contain"
          priority
        />

          <span className="font-serif text-lg font-semibold uppercase leading-tight tracking-wide text-[#d5b685]">
            Caminhos de
            <br />
            Maria
          </span>
        </Link>

        {/* Menu computador */}
        <nav
          aria-label="Principal"
          className="hidden items-center gap-1 md:flex"
        >
          {LINKS.map((item) => {
            const ativo = paginaAtiva(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ativo ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 font-serif text-[15px] transition ${
                  ativo
                    ? "bg-[#c9a46a] font-semibold text-[#14233f]"
                    : "text-[#f3eee3] hover:text-[#d5b685]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Ícones */}
        <div className="flex items-center gap-4 text-[#c9a46a]">

          {/* Pesquisa */}
          <Link
            href="/aparicoes"
            aria-label="Buscar aparição"
            className="transition hover:text-[#f3eee3]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </Link>

          {/* Mapa */}
          <Link
            href="/mapa"
            aria-label="Mapa das aparições"
            className="transition hover:text-[#f3eee3]"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
            </svg>
          </Link>

          {/* Botão do menu celular */}
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            className="md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {aberto ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu celular */}
      {aberto && (
        <nav
          id="menu-mobile"
          aria-label="Principal"
          className="relative z-10 flex flex-col gap-1 border-t border-[#c9a46a]/30 px-6 pb-4 pt-3 md:hidden"
        >
          {LINKS.map((item) => {
            const ativo = paginaAtiva(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setAberto(false)}
                aria-current={ativo ? "page" : undefined}
                className={`rounded-full px-4 py-2 font-serif ${
                  ativo
                    ? "bg-[#c9a46a] font-semibold text-[#14233f]"
                    : "text-[#f3eee3]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
