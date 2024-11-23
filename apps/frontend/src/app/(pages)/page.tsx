"use client";
import { useState } from "react";

export default function Page() {
  const [modoLogin, setModoLogin] = useState<Boolean>(true);

  if (modoLogin) {
    return (
      <div className="flex h-screen bg-zinc-100 justify-center items-center">
        <div className="flex flex-col gap-5 bg-zinc-50 p-5 border border-zinc-300 rounded w-full m-5 md:w-auto md:p-10">
          <h1 className="text-lg font-semibold text-zinc-700">Login</h1>
          <div className="flex flex-col gap-2">
            <input className="input" type="email" placeholder="E-mail" />
            <input className="input" type="password" placeholder="Senha" />
          </div>
          <div className="flex flex-col gap-1">
            <button className="button">ENTRAR</button>
            <button className="text-sm text-blue-500 outline-zinc-400">
              Esqueceu a senha?
            </button>
          </div>
          <hr></hr>
          <span className="text-center text-sm text-zinc-600 ">
            Ainda não possui uma conta?{" "}
            <button
              onClick={() => {
                setModoLogin(modoLogin ? false : true);
              }}
              className="text-sm text-blue-500 outline-zinc-400"
            >
              Cadastre-se
            </button>
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
          {/* <button className="button">CANCELAR</button> */}
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
