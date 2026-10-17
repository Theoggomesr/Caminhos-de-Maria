
"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { excluirCuriosidade } from "@/app/admin/(protegido)/curiosidades/actions";

type Props = {
  id: string;
  nome: string;
};

export default function BotaoExcluirCuriosidade({
  id,
  nome,
}: Props) {
  const router = useRouter();

  // Controla o carregamento da operação.
  const [carregando, iniciarTransicao] = useTransition();

  // Controla as mensagens de erro.
  const [erro, setErro] = useState("");

  // Impede exclusões duplicadas.
  const operacaoEmAndamento = useRef(false);

  function excluir() {
    if (operacaoEmAndamento.current) return;

    // Solicita confirmação antes da exclusão.
    const confirmou = window.confirm(
      `Deseja realmente excluir a curiosidade "${nome}"?\n\nEsta ação não poderá ser desfeita.`
    );

    if (!confirmou) return;

    operacaoEmAndamento.current = true;

    // Limpa erros anteriores.
    setErro("");

    iniciarTransicao(async () => {
      try {
        // Exclui a curiosidade no Supabase.
        await excluirCuriosidade(id);

        // Redireciona com a mensagem de sucesso.
        router.replace(
          "/admin/curiosidades?sucesso=exclusao"
        );

        // Atualiza os dados da listagem.
        router.refresh();
      } catch (error) {
        console.error(
          "Erro ao excluir curiosidade:",
          error
        );

        setErro(
          error instanceof Error &&
          !error.message.includes("An error occurred")
            ? error.message
            : "Não foi possível excluir a curiosidade. Tente novamente."
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
