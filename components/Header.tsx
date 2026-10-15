import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="header-clouds ">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-6 py-5">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/logo-mariae.png"
            alt="Logo Aparições Marianas"
            width={78}
            height={100}
            className="h-auto w-[78px]"
            priority
          />
        </Link>

        <div className="flex-1 text-center">
          <p className="text-2xl font-semibold text-stone-900">
            Caminhos de Maria
          </p>

          <nav className="mt-4 flex justify-center gap-6 text-sm text-stone-600">
            <Link href="/" className="hover:text-stone-900">
              Início
            </Link>
            <Link href="/aparicoes" className="hover:text-stone-900">
              Aparições
            </Link>
            <Link href="/mapa" className="hover:text-stone-900">
            Mapa
            </Link>
            <Link href="/linha-do-tempo" className="hover:text-stone-900">
              Linha do tempo
            </Link>
            <Link href="/sobre" className="hover:text-stone-900">
              Sobre
            </Link>

          </nav>
        </div>

        <div className="w-17.5 shrink-0" aria-hidden="true" />
      </div>
    </header>
  );
}