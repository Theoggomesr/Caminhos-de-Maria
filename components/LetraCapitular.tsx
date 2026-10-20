
import Image from "next/image";

type Props = {
  texto: string;
};

export default function LetraCapitular({ texto }: Props) {
  // Remove espaços em branco do início
  const conteudo = texto.trimStart();

  if (!conteudo) {
    return null;
  }

  // Identifica a primeira letra do texto
  const primeiraLetra = Array.from(conteudo)[0];

  // Remove acentos e converte para maiúscula
  const letra = primeiraLetra
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  // Verifica se existe uma imagem correspondente no alfabeto A-Z
  const possuiImagem = /^[A-Z]$/.test(letra);

  // Remove a primeira letra do texto para não duplicá-la visualmente
  const restante = conteudo.slice(primeiraLetra.length);

  return (
    <p className="mt-4 flow-root whitespace-pre-line leading-8 text-stone-600">
      {possuiImagem ? (
        <>
          {/* Letra decorativa: ignorada pelos leitores de tela */}
          <span
            aria-hidden="true"
            className="float-left mr-3 mt-1 block h-20 w-20"
          >
            <Image
              src={`/imagens/capitulares/${letra}.webp`}
              alt=""
              width={80}
              height={80}
              className="h-full w-full object-contain"
            />
          </span>

          {/* Mantém a primeira letra acessível */}
          <span className="sr-only">{primeiraLetra}</span>
        </>
      ) : (
        primeiraLetra
      )}

      {restante}
    </p>
  );
}
