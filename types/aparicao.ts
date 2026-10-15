export type Continente = "Europa" | "América" | "Ásia" | "África" | "Oceania";
export type Aparicao = {
  slug: string;

  nome: string;
  titulo: string;

  local: string;
  pais: string;
  periodo: string;

  ano?: number;

  videntes: string[];

  descricao: string;
  historia: string;
  mensagem: string;

  reconhecimento: string;

  santuario?: {
    nome: string;
    descricao: string;
  };

  fontes: {
    titulo: string;
    url?: string;
  }[];

  imagens: {
    src: string;
    alt: string;
    credito?: string;
    cardMapa?: boolean;
    posicao?: string;
  }[];

  coordenadas?: {
    latitude: number;
    longitude: number;
  };

  continente?: Continente;

  destaque?: boolean;
  
};