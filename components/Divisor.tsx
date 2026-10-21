export default function Divisor() {
  return (
    <div className=" px-6 py-6" aria-hidden="true">
      <div className="mx-auto flex max-w-sm items-center gap-4">
        {/* linha da esquerda */}
        <div className="h-px flex-1 bg-[#c9a46a]/70" />

        {/* estrela de quatro pontas */}
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 shrink-0 text-[#c9a46a]"
          fill="currentColor"
        >
          <path d="M12 0 C12.8 7 17 11.2 24 12 C17 12.8 12.8 17 12 24 C11.2 17 7 12.8 0 12 C7 11.2 11.2 7 12 0 Z" />
        </svg>

        {/* linha da direita */}
        <div className="h-px flex-1 bg-[#c9a46a]/70" />
      </div>
    </div>
  );
}