"use client";

import Image from "next/image";
import { useState } from "react";
import {
  EyeIcon,
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import Titulo from "../components/Titulo/Titulo";

export default function Pagina() {
  const [modoLogin, setModoLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");

  const alternarModoLogin = () => {
    setModoLogin(!modoLogin);
  };

  const enviarFormularioLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verificarEmail(email, senha);
  };

  const enviarFormularioCadastro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode realizar o cadastro com as informações
    alert(`Cadastro realizado para ${nome}!`);
  };

  const alterarEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const alterarSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

  const alterarNome = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const alterarTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone(e.target.value);
  };

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

  function verificarEmail(email: string, senha: string): void {
    const usuario = usuarios.find((usuario) => usuario.email === email);

    if (usuario && usuario.senha === senha) {
      alert(`Bem-vindo, ${usuario.nome}!`);
    }
      alert("Email ou senha inválidos.");
  }

  if (modoLogin) {
    return (
      <div className="flex h-screen justify-center items-center min-w-[520px]">
        <div className="flex flex-col items-center gap-2 bg-fundoPaginaSecundaria rounded-xl w-full h-screen px-20 py-8 md:w-[630px]  md:h-[780px] md:px-20 md:py-8">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={200}
            height={150}
            priority
            style={{ width: "auto", height: "auto" }}
          />
          <Titulo texto="Entre com sua conta" />
          <form onSubmit={enviarFormularioLogin} className="flex flex-col gap-4 w-full">
            <Input
              label="Email"
              IconeLadoDireito={EnvelopeIcon}
              tipo="email"
              tamanho={8}
              value={email}
              onChange={alterarEmail}
            />

            <Input
              label="Senha"
              IconeLadoDireito={EyeIcon}
              tipo="password"
              tamanho={8}
              value={senha}
              onChange={alterarSenha}
            />
            <div className="flex flex-col gap-1 w-full">
              <button
                type="button"
                className="text-textoCinza text-md py-4 hover:brightness-125 transition"
              >
                Esqueceu a senha?
              </button>
              <Button tipo="submit">Login</Button>

              <div className="flex items-center justify-center">
                <hr className="linha my-8" />{" "}
                <span className="text-textoCinza mx-2 text-lg"> ou </span>{" "}
                <hr className="linha" />
              </div>
              <button type="button" className="self-center">
                <Image
                  src="/google-icon.svg"
                  alt="google-icon"
                  width={60}
                  height={60}
                  style={{ width: "auto", height: "auto" }}
                />
              </button>
            </div>

            <span className="text-center text-textoBranco text-lg">
              Ainda não possui uma conta?{" "}
              <button
                type="button"
                onClick={alternarModoLogin}
                className="text-verde outline-verde hover:brightness-110 transition hover:underline hover:underline-offset-2"
              >
                Cadastre-se aqui
              </button>
            </span>
            <span className="text-textoCinza text-sm">
              Ou faça login pelo Google clicando no G acima
            </span>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen justify-center items-center min-w-[520px]">
      <div className="flex flex-col items-center gap-2 bg-fundoPaginaSecundaria rounded-xl w-full h-screen px-20 py-6 md:w-[630px]  md:h-[780px] md:px-20 md:py-6">
        <Titulo texto="Cadastrar" />
        <form onSubmit={enviarFormularioCadastro} className="flex flex-col gap-4 w-full mt-6">
          <Input
            label="Nome"
            IconeLadoEsquerdo={UserIcon}
            tipo="text"
            value={nome}
            onChange={alterarNome}
          />
          <Input
            label="Email"
            IconeLadoEsquerdo={EnvelopeIcon}
            tipo="email"
            value={email}
            onChange={alterarEmail}
          />
          <Input
            label="Senha"
            IconeLadoDireito={EyeIcon}
            IconeLadoEsquerdo={LockClosedIcon}
            tipo="password"
            value={senha}
            onChange={alterarSenha}
          />
          <Input
            label="Repetir Senha"
            IconeLadoDireito={EyeIcon}
            IconeLadoEsquerdo={LockClosedIcon}
            tipo="password"
          />
          <Input
            label="Telefone"
            IconeLadoEsquerdo={PhoneIcon}
            tipo="text"
            value={telefone}
            onChange={alterarTelefone}
          />
          <Button tipo="submit" classe="my-7 text-xl">
            Cadastrar-se
          </Button>
        </form>

        <span className="text-center text-textoCinza text-lg">
          Já possui uma conta?{" "}
          <button
            type="button"
            onClick={alternarModoLogin}
            className="text-verde outline-verde hover:brightness-110 transition hover:underline hover:underline-offset-2"
          >
            Faça Login
          </button>
        </span>
      </div>
    </div>
  );
}
