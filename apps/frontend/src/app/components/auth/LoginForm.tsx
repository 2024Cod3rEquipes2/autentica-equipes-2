"use client";

import {
  EnvelopeIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import Button from "../shared/Button/Button";
import Input from "../shared/Input/Input";
import Titulo from "../shared/Titulo/Titulo";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const usuarios = [
  {
    email: "admin@example.com",
    senha: "admin123",
    nome: "Administrador",
    telefone: "(11) 9999-9999",
  },
  {
    email: "usuariopadrao@example.com",
    senha: "usuario123",
    nome: "Usuário Padrão",
    telefone: "(11) 8888-8888",
  },
  {
    email: "guest@example.com",
    senha: "guest123",
    nome: "Guest",
    telefone: "(11) 7777-7777",
  },
];

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const enviarFormularioLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verificarEmail(email, senha);
  };


  const alterarEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const alterarSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

    function verificarEmail(email: string, senha: string): void {
    const usuario = usuarios.find((usuario) => usuario.email === email);

    if (usuario && usuario.senha === senha) {
      alert(`Bem-vindo, ${usuario.nome}!`);
    }
      alert("Email ou senha inválidos.");
  }

  return (
    <div className="flex flex-1 flex-col justify-evenly items-center w-full">
      <Image src="/logo.svg" alt="Logo" width={200} height={150} />

      <Titulo texto="Entre com sua conta" className="text-2xl" />

      <form onSubmit={enviarFormularioLogin}>
      <div className="flex flex-col w-full">
        <Input
          label="Email"
          IconeLadoDireito={EnvelopeIcon}
          tipo="email"
          tamanho={6}
          onChange={alterarEmail}
          value={email}
        />

        <Input
          label="Senha"
          IconeLadoDireito={EyeIcon}
          tipo="password"
          tamanho={6}
          onChange={alterarSenha}
          value={senha}
        />
      </div>

      <Link
        href={"/recuperacao-senha"}
        className="self-end text-textoCinza text-md pb-4 hover:brightness-125 transition"
      >
        Esqueceu a senha?
      </Link>
      <Button className="verde" tipo="submit" >
        Login
      </Button>
      </form>
      <div className="flex items-center justify-center">
        <hr className="linha my-8" />{" "}
        <span className="text-textoCinza mx-2 text-lg"> ou </span>{" "}
        <hr className="linha" />
      </div>

      <button type="button" className="self-center">
        <Image
          src="/google-icon.svg"
          alt={"google-icon"}
          width={60}
          height={60}
        />
      </button>
      
      <hr />
      <span className="text-center text-textoBranco text-lg leading-5">
        Ainda não possui uma conta?{" "}
        <Link
          href={"/cadastro"}
          className="text-verde outline-verde hover:brightness-110 transition"
        >
          Cadastre-se aqui
        </Link>
      </span>

      <span className="text-textoCinza text-sm">
        Ou faça login pelo Google clicando no G acima
      </span>
    </div>
  );
}
