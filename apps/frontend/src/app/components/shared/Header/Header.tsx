import Image from "next/image";
import Titulo from "../Titulo/Titulo";
import ImagemUsuario from "./ImagemUsuario";

export default function Header() {
  return (
    <div className="flex h-[150px] justify-between items-center px-10 text-zinc-50">
      <div className="flex gap-5 items-center">
        <Image
          className="mx-8 mt-2"
          src="/logo-menu.svg"
          alt="Logo"
          width={162}
          height={129}
        />

        <h1 className="text-textoBranco text-2xl font-semibold">
          Administrador
        </h1>
      </div>

      <div className="flex gap-5">
        <button>Pesquisa</button>
        <div className="border-r-zinc-500 border-r"></div>
        <div className="flex items-center gap-3">
          <ImagemUsuario />
          <div className="flex flex-col">
            <p className="text-textoBranco text-lg">Sabrina Gomes</p>
            <p className="text-textoCinza text-sm">
              sabriinacorrea13@hotmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
