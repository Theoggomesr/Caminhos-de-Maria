"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BuscaAparicao() {
  const router = useRouter();
  const [termo, setTermo] = useState("");

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    const q = termo.trim();
    router.push(q ? `/aparicoes?q=${encodeURIComponent(q)}` : "/aparicoes");
  }

  return (
    <form
      onSubmit={buscar}
      className="flex w-full max-w-md items-center rounded-full bg-white py-1.5 pl-5 pr-1.5 shadow-md"
    >
      <input
        type="text"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Buscar aparição (ex: Fátima, Lourdes)"
        aria-label="Buscar aparição"
        className="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-900 text-white hover:bg-sky-800"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      </button>
    </form>
  );
}