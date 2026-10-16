
"use client";

import { useState, useTransition } from "react";
import { excluirAparicao } from "@/app/admin/(protegido)/aparicoes/actions";

type Props = {
  id: string;
  nome: string;
};

export default function BotaoExcluir({ id, nome }: Props) {
  const [carregando, iniciarTransicao] = useTransition();
  const [erro, setErro] = useState("");

  function excluir() {
    const confirmou = window.confirm(
      `Deseja realmente excluir "${nome}"?\n\nEsta ação não poderá ser desfeita.`
    );

    if (!confirmou) return;

    setErro("");

    iniciarTransicao(async () => {
      try {
        await excluirAparicao(id);
      } catch {
        setErro("Não foi possível excluir.");
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        onClick={excluir}
        disabled={carregando}
        className="rounded-lg px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
      >
        {carregando ? "Excluindo..." : "Excluir"}
      </button>

      {erro && (
        <p role="alert" className="text-xs text-red-600">
          {erro}
        </p>
      )}
    </div>
  );
}
