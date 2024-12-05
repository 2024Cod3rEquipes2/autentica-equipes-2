"use client";

import {
  EnvelopeIcon,
  EyeIcon,
  LockClosedIcon,
  PhoneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "../shared/Button/Button";
import Input from "../shared/Input/Input";
import Titulo from "../shared/Titulo/Titulo";
import Link from "next/link";
import { useState } from "react";

export default function CadastroForm() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [repetirSenha, setRepetirSenha] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const alterarNome = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNome(e.target.value);
  };

  const alterarRepetirSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepetirSenha(e.target.value);
  };

  const alterarTelefone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTelefone(e.target.value);
  };
  const alterarEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const alterarSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
  };

  const enviarFormularioCadastro = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aqui você pode realizar o cadastro com as informações
    alert(`Cadastro realizado para ${nome}!`);
  };

  return (
    <div className="flex flex-1 flex-col justify-evenly w-full">
      <Titulo texto="Cadastrar" />
      <form onSubmit={enviarFormularioCadastro}>
      <div className="flex flex-col gap-2">
        <Input
          label="Nome"
          IconeLadoEsquerdo={UserCircleIcon}
          tipo="text"
          tamanho={6}
          onChange={alterarNome}
          value={nome}
        />

        <Input
          label="Email"
          IconeLadoEsquerdo={EnvelopeIcon}
          tipo="email"
          tamanho={6}
          onChange={alterarEmail}
          value={email}
        />

        <Input
          label="Senha"
          IconeLadoEsquerdo={LockClosedIcon}
          IconeLadoDireito={EyeIcon}
          tipo="password"
          tamanho={6}
          onChange={alterarSenha}
          value={senha}
        />

        <Input
          label="Repetir senha"
          IconeLadoEsquerdo={LockClosedIcon}
          tipo="password"
          tamanho={6}
          onChange={alterarRepetirSenha}
          value={repetirSenha}
        />

        <Input
          label="Telefone"
          IconeLadoEsquerdo={PhoneIcon}
          tipo="text"
          tamanho={6}
          onChange={alterarTelefone}
          value={telefone}
        />
      </div>

      <Button className="verde mt-8" tipo="submit">Cadastrar-se</Button>
      </form>

      <div className="text-center text-textoBranco text-lg leading-5">
        <span>Já possui uma conta? </span>
        <Link
          href={"/login"}
          className="text-verde outline-verde hover:brightness-110 transition"
        >
          Faça login
        </Link>
      </div>
    </div>
  );
}
