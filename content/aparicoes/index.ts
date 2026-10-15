import type { Aparicao } from "@/types/aparicao";
import { fatima } from "./fatima";
import { guadalupe } from "./guadalupe";

export const aparicoes = [fatima, guadalupe];

type AparicaoComAno = Aparicao & { ano: number };

export const linhaDoTempo = aparicoes
  .filter((a): a is AparicaoComAno => a.ano !== undefined)
  .sort((a, b) => a.ano - b.ano);