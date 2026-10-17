
"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { alterarPublicacao } from "@/app/admin/(protegido)/aparicoes/actions";

type Props = {
  id: string;
  publicado: boolean;
};

export default function BotaoPublicacao({
  id,
  publicado,
}: Props) {
  const router = useRouter();

  const [carregando, iniciarTransicao] = useTransition();

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Evita operações duplicadas antes da atualização do React.
  const operacaoEmAndamento = useRef(false);

  function alternar() {
    if (operacaoEmAndamento.current) return;

    operacaoEmAndamento.current = true;

    setErro("");
    setSucesso("");

    iniciarTransicao(async () => {
      try {
        await alterarPublicacao(id, !publicado);

        setSucesso(
          publicado
            ? "Aparição despublicada com sucesso!"
            : "Aparição publicada com sucesso!"
        );

        // Atualiza os dados da listagem.
        router.refresh();
      } catch (error) {
        console.error(
          "Erro ao alterar publicação da aparição:",
          error
        );

        setErro(
          error instanceof Error &&
          !error.message.includes("An error occurred")
            ? error.message
            : "Não foi possível alterar a publicação. Tente novamente."
        );
      } finally {
        operacaoEmAndamento.current = false;
      }
    });
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {/* BOTÃO PUBLICAR / DESPUBLICAR */}
      <button
        type="button"
        onClick={alternar}
        disabled={carregando}
        aria-busy={carregando}
        className={`rounded-lg px-3 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
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

      {/* MENSAGEM DE SUCESSO */}
      {sucesso && (
        <div
          role="status"
          className="max-w-56 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-medium text-green-800"
        >
          <div className="flex items-start gap-2">
            <span aria-hidden="true">✓</span>

            <span>{sucesso}</span>

            <button
              type="button"
              onClick={() => setSucesso("")}
              aria-label="Fechar mensagem de sucesso"
              className="ml-auto font-bold text-green-700 hover:text-green-900"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* MENSAGEM DE ERRO */}
      {erro && (
        <div
          role="alert"
          className="max-w-56 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
        >
          <div className="flex items-start gap-2">
            <span aria-hidden="true">!</span>

            <span>{erro}</span>

            <button
              type="button"
              onClick={() => setErro("")}
              aria-label="Fechar mensagem de erro"
              className="ml-auto font-bold text-red-700 hover:text-red-900"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
