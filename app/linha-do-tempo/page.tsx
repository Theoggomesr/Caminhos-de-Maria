import type { Metadata } from "next";
import LinhaDoTempo from "@/components/LinhaDoTempo";

export const metadata: Metadata = {
  title: "Linha do tempo | Totus Tuus Mariae",
  description: "As aparições marianas em ordem cronológica.",
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-semibold">Linha do tempo</h1>
      <p className="mb-10 mt-2 text-stone-600">
        As aparições marianas em ordem cronológica.
      </p>

      <LinhaDoTempo />
    </main>
  );
}