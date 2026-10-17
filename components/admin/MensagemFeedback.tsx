
"use client";

import { useState } from "react";

type Props = {
  tipo: "sucesso" | "erro";
  mensagem: string;
};

export default function MensagemFeedback({
  tipo,
  mensagem,
}: Props) {
  const [visivel, setVisivel] = useState(true);

  if (!visivel) return null;

  const sucesso = tipo === "sucesso";

  return (
    <div
      role={sucesso ? "status" : "alert"}
      className={`mb-6 flex items-start justify-between gap-4 rounded-xl border px-5 py-4 shadow-sm ${
        sucesso
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
    >
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-xl">
          {sucesso ? "✓" : "!"}
        </span>

        <div>
          <p className="font-semibold">
            {sucesso
              ? "Operação realizada com sucesso!"
              : "Não foi possível concluir a operação"}
          </p>

          <p className="mt-1 text-sm">{mensagem}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setVisivel(false)}
        aria-label="Fechar mensagem"
        className="rounded-md px-2 py-1 font-semibold transition hover:bg-black/5"
      >
        ✕
      </button>
    </div>
  );
}
