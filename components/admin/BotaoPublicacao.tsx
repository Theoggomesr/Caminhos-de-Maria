
"use client";

import { useState, useTransition } from "react";
import { alterarPublicacao } from "@/app/admin/(protegido)/aparicoes/actions";

type Props = {
  id: string;
  publicado: boolean;
};

export default function BotaoPublicacao({
  id,
  publicado,
}: Props) {
  const [carregando, iniciarTransicao] = useTransition();
  const [erro, setErro] = useState("");

  function alternar() {
    setErro("");

    iniciarTransicao(async () => {
      try {
        await alterarPublicacao(id, !publicado);
      } catch {
        setErro("Erro ao alterar publicação.");
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={alternar}
        disabled={carregando}
        className={`rounded-lg px-3 py-2 text-sm font-medium disabled:opacity-50 ${
          publicado
            ? "bg-amber-100 text-amber-900 hover:bg-amber-200"
            : "bg-green-100 text-green-800 hover:bg-green-200"
        }`}
      >
        {carregando
          ? "Aguarde..."
          : publicado
          ? "Despublicar"
          : "Publicar"}
      </button>

      {erro && (
        <p role="alert" className="text-xs text-red-600">
          {erro}
        </p>
      )}
    </div>
  );
}
