
"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { excluirAparicao } from "@/app/admin/(protegido)/aparicoes/actions";

type Props = {
  id: string;
  nome: string;
};

export default function BotaoExcluir({
  id,
  nome,
}: Props) {
  const router = useRouter();

  const [carregando, iniciarTransicao] = useTransition();

  const [erro, setErro] = useState("");

  // Impede exclusões duplicadas.
  const operacaoEmAndamento = useRef(false);

  function excluir() {
    if (operacaoEmAndamento.current) return;

    const confirmou = window.confirm(
      `Deseja realmente excluir a aparição "${nome}"?\n\nEsta ação não poderá ser desfeita.`
    );

    if (!confirmou) return;

    operacaoEmAndamento.current = true;

    setErro("");

    iniciarTransicao(async () => {
      try {
        await excluirAparicao(id);

        // Retorna à listagem com a confirmação.
        router.replace(
          "/admin/aparicoes?sucesso=exclusao"
        );

        // Atualiza os dados apresentados.
        router.refresh();
      } catch (error) {
        console.error(
          "Erro ao excluir aparição:",
          error
        );

        setErro(
          error instanceof Error &&
          !error.message.includes("An error occurred")
            ? error.message
            : "Não foi possível excluir a aparição. Tente novamente."
        );
      } finally {
        operacaoEmAndamento.current = false;
      }
    });
  }

  return (
    <div className="flex flex-col items-start gap-2">
      {/* BOTÃO EXCLUIR */}
      <button
        type="button"
        onClick={excluir}
        disabled={carregando}
        aria-busy={carregando}
        className="rounded-lg px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {carregando ? "Excluindo..." : "Excluir"}
      </button>

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
