"use client";

import Button from "@/app/components/shared/Button/Button";
import Input from "@/app/components/shared/Input/Input";
import Titulo from "@/app/components/shared/Titulo/Titulo";
import { EnvelopeIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function RedefinirSenhaForm() {
  const [senha, setSenha] = useState<string>("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");

  const tokenParams = useSearchParams();
  const token = tokenParams.get("token");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (senha === senhaConfirmacao) {
      setMensagem("");
      try {
        const response = await axios.post(
          "http://localhost:4000/auth/reset-password",
          {
            confirmPassword: senhaConfirmacao,
            password: senha,
            recoverToken: token,
          }
        );

        console.log(response.data);
        alert("Senha alterada com sucesso!");
        router.push("/login");
        //useRouter().push("/login");
      } catch (error) {
        console.error(error);
        alert("Erro ao redefinir senha");
      }
    } else {
      setMensagem("As senhas não correspondem! Verifique e tente novamente.");
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-2 w-full">
      <Titulo texto="Solicitar troca de senha" />
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          tamanho={6}
          tipo="password"
          IconeLadoDireito={EyeIcon}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Input
          label="Confirmar Senha"
          tamanho={6}
          tipo="password"
          IconeLadoDireito={EyeIcon}
          onChange={(e) => setSenhaConfirmacao(e.target.value)}
        />

        {mensagem != "" && (
          <h3
            className={`text-sm text-red-400 leading-9 font-boldtext-center `}
          >
            {mensagem}
          </h3>
        )}

        <Button className="mt-4" tipo="submit" cor="verde">
          Enviar
        </Button>
      </form>
    </div>
  );
}
