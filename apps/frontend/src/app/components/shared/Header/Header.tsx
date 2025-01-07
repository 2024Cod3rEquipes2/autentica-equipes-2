"use client";

import Image from "next/image";
import Titulo from "../Titulo/Titulo";
import ImagemUsuario from "./ImagemUsuario";
import { decode } from "jsonwebtoken";

export default function Header() {
  const token = localStorage.getItem("token");
  const decodedToken = token ? decode(token) : null;

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
        <button type="button">Pesquisa</button>
        <div className="border-r-zinc-500 border-r" />
        <div className="flex items-center gap-3">
          <ImagemUsuario />
          <div className="flex flex-col">
            <p className="text-textoBranco text-lg">{decodedToken?.name}</p>
            <p className="text-textoCinza text-sm">{decodedToken?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
