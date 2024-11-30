import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-end w-full h-min py-2 px-6 ">
      <div className="flex items-end gap-4 relative">
        <Image
          src="/logo-menu.svg"
          alt="Logo"
          width={100}
          height={100}
          className="top-2 relative"
        />
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold leading-3">
            S<span className="text-red-500">3</span>CURITY
          </div>
          <div className="text-sm font-semibold">AUTHENTICATION</div>
        </div>
      </div>
      <nav>
        <ul className="flex space-x-6">
          <li
            className="border bordas rounded-lg px-3
            hover:border hover:border-zinc-500 hover:rounded-lg hover:px-3
            "
          >
            <Link href="#sobre">
              Sobre
            </Link>
          </li>
          <li
            className="border bordas rounded-lg px-3
            hover:border hover:border-zinc-500 hover:rounded-lg hover:px-3
            "
          >
            <Link href="#funcionalidades">Funcionalidades</Link>
          </li>
          <li
            className="border bordas rounded-lg px-3
            hover:border hover:border-zinc-500 hover:rounded-lg hover:px-3
            "
          >
            <Link href="#precos">
              Preços
            </Link>
          </li>
          <li 
            className="border bordas rounded-lg px-3
            hover:border hover:border-zinc-500 hover:rounded-lg hover:px-3
            "
          >
            <Link href="/cadastro">
              Cadastrar
            </Link>
          </li>
          <li
            className="border bordas rounded-lg px-3
            hover:border hover:border-zinc-500 hover:rounded-lg hover:px-3
            "
          >
            <Link href="/login">
              Login
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
