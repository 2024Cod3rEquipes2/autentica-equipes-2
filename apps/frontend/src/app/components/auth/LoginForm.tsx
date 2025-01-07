"use client";

import { EnvelopeIcon, EyeIcon } from "@heroicons/react/24/outline";
import Button from "../shared/Button/Button";
import Input from "../shared/Input/Input";
import Titulo from "../shared/Titulo/Titulo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/auth";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setSenha] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [erro, setErro] = useState<string>("");

  const router = useRouter();
  const { login } = useAuth();

  const enviarFormularioLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      const usuario = response.data;

      if (usuario.token) {
        localStorage.setItem("token", usuario.token);
        login(usuario.token);
        router.push("/home");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErro(
          error.response?.data?.message ||
            "Erro ao fazer login. Tente novamente."
        );
      } else {
        setErro("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  const alterarEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErro("");
  };

  const alterarSenha = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSenha(e.target.value);
    setErro("");
  };

  return (
    <div className="flex flex-1 flex-col justify-evenly items-center w-full">
      <Image src="/logo.svg" alt="Logo" width={200} height={150} />

      <Titulo texto="Entre com sua conta" className="text-2xl" />

      <form onSubmit={enviarFormularioLogin} className="flex flex-col w-full">
        <div>
          <Input
            label="Email"
            IconeLadoDireito={EnvelopeIcon}
            tipo="email"
            tamanho={6}
            onChange={alterarEmail}
            value={email}
            disabled={loading}
          />

          <Input
            label="Senha"
            IconeLadoDireito={EyeIcon}
            tipo="password"
            tamanho={6}
            onChange={alterarSenha}
            value={password}
            disabled={loading}
          />
        </div>

        {erro && <div className="text-red-500 text-sm mt-2 mb-2">{erro}</div>}

        <Link
          href={"/recuperacao-senha"}
          className="self-end text-textoCinza text-md pb-4 hover:brightness-125 transition"
        >
          Esqueceu a senha?
        </Link>

        <Button cor="verde" tipo="submit" disabled={loading}>
          {loading ? "Carregando..." : "Login"}
        </Button>
      </form>

      <div className="flex items-center justify-center">
        <hr className="linha my-8" />
        <span className="text-textoCinza mx-2 text-lg"> ou </span>
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
