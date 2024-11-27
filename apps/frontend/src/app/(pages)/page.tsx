"use client";

import Image from "next/image";
import { useState } from "react";
import { EyeIcon, EnvelopeIcon } from "@heroicons/react/16/solid";
import Titulo from "../components/Titulo/Titulo";

export default function Page() {
  const [modoLogin, setModoLogin] = useState<boolean>(true);

  if (modoLogin) {
    return (
      <div className="flex h-screen justify-center items-center min-w-[520px]">
        <div className="flex flex-col items-center gap-2 bg-fundoPaginaSecundaria rounded-xl w-full h-screen px-20 py-8 md:w-[630px]  md:h-[780px] md:px-20 md:py-8">
          <Image src="/logo.svg" alt="Logo" width={200} height={150} />

          <Titulo texto="Entre com sua conta" />
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-textoBranco text-lg">
                Email
              </label>
              <div className="flex flex-1 relative justify-center items-center">
                <input className="input" type="email" />
                <EnvelopeIcon className="text-textoCinza absolute top-0 right-0 h-full size-8 mx-4" />
              </div>
            </div>
            <div className="flex flex-col gap-1 ">
              <label htmlFor="password" className="text-textoBranco text-lg">
                Senha
              </label>
              <div className="flex flex-1 relative justify-center items-center">
                <input className="input" type="password" />

                <EyeIcon className="text-textoCinza absolute top-0 right-0 h-full size-8 mx-4" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <button className="text-textoCinza text-md py-4 hover:brightness-125 transition">
              Esqueceu a senha?
            </button>

            <button className="buttonPrimary py-2">Login</button>
            <div className="flex items-center justify-center">
              <hr className="linha my-8" />{" "}
              <span className="text-textoCinza mx-2 text-lg"> ou </span>{" "}
              <hr className="linha" />
            </div>
            <button className="self-center">
              <Image
                src="/google-icon.svg"
                alt={"google-icon"}
                width={60}
                height={60}
              />
            </button>
          </div>
          <hr></hr>
          <span className="text-center text-textoBranco text-lg">
            Ainda não possui uma conta?{" "}
            <button
              onClick={() => {
                setModoLogin(modoLogin ? false : true);
              }}
              className="text-verde outline-verde hover:brightness-110 transition"
            >
              Cadastre-se aqui
            </button>
          </span>
          <span className="text-textoCinza text-sm">
            Ou faça login pelo Google clicando no G acima
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-zinc-100 justify-center items-center">
      <div
        className="flex flex-col gap-5 bg-zinc-50 p-5 border border-zinc-300 rounded w-full m-5
         md:w-auto md:p-10
        
        "
      >
        <h1 className="text-lg font-semibold text-zinc-700">Cadastro</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2 md:flex-row">
            <input className="input" type="text" placeholder="Nome" />
            <input className="input" type="text" placeholder="Sobrenome" />
          </div>
          <input className="input" type="text" placeholder="Telefone" />
          <input className="input" type="email" placeholder="E-mail" />

          <div className="flex flex-col gap-2  md:flex-row">
            <input className="input" type="password" placeholder="Senha" />
            <input
              className="input"
              type="password"
              placeholder="Confirmar senha"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button className="button">CADASTRAR</button>
        </div>
        <hr></hr>
        <button
          onClick={() => {
            setModoLogin(modoLogin ? false : true);
          }}
          className="text-sm text-blue-500 outline-zinc-400"
        >
          Já possui uma conta?
        </button>
      </div>
    </div>
  );
}
