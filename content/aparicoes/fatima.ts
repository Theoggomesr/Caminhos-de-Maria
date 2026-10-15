import { Aparicao } from "@/types/aparicao";

export const fatima: Aparicao = {
  slug: "nossa-senhora-de-fatima",

  destaque: true,

  nome: "Nossa Senhora de Fátima",

  titulo: "Aparições de Nossa Senhora de Fátima",

  local: "Cova da Iria, Fátima",

  pais: "Portugal",

  periodo: "13 de maio a 13 de outubro de 1917",

  ano: 1917,

  videntes: [
    "Lúcia dos Santos",
    "Francisco Marto",
    "Jacinta Marto",
  ],

  descricao:
    "Descrição das aparições de Nossa Senhora de Fátima.",

  historia:
    "História das aparições e dos acontecimentos relacionados.",

  mensagem:
    "Informações sobre a mensagem associada às aparições.",

  reconhecimento:
    "Informações sobre o reconhecimento pela Igreja.",

  santuario: {
    nome: "Santuário de Fátima",
    descricao:
      "Informações sobre o santuário relacionado às aparições.",
  },

  fontes: [
    {
      titulo: "Fonte oficial",
      url: "https://www.fatima.pt/",
    },
  ],

  imagens: [
    {
      src: "/imagens/fatima/nossa-senhora-de-fatima.jpg",
      alt: "Nossa Senhora de Fátima",
      credito: "Fonte da imagem",
    },
    {
      src: "/imagens/fatima/rosto-fatima.jpg",
      alt: "Rosto de Nossa Senhora de Fátima",
      credito: "Fonte da imagem",
      cardMapa: true,
      posicao: "50% 20%",
    },
  ],

  coordenadas: {
    latitude: 39.63,
    longitude: -8.67,
  },

  continente: "Europa",
  
};