"use client";
import Button from "@/app/components/shared/Button/Button";
import Input from "@/app/components/shared/Input/Input";
import InputPassword from "@/app/components/shared/InputPassword/InputPassword";
import Titulo from "@/app/components/shared/Titulo/Titulo";
import { EyeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [senhaAtual, setSenhaAtual] = useState<string>("");
  const [senhaNova, setSenhaNova] = useState<string>("");
  const [senhaNovaConfirmacao, setSenhaNovaConfirmacao] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");

  const tokenParams = useSearchParams();
  const token = tokenParams.get("token");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (senhaNova === senhaNovaConfirmacao) {
      setMensagem("");
      try {
        const response = await axios.post(
          "http://localhost:4000/auth/change-password",
          {
            lastPassword: senhaAtual,
            password: senhaNova,
            confirmPassword: senhaNovaConfirmacao,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );

        console.log(response);
        alert("Senha alterada com sucesso!");
      } catch (error) {
        console.log(error);
        console.log("Erro na troca de senha:");
      }
    } else {
      setMensagem("As senhas não correspondem! Verifique e tente novamente.");
    }
  }

  return (
    <div className="bg-zinc-900 flex flex-1 mr-8 mb-8 rounded-lg p-7">
      {/* <Titulo texto="Modificar senha" /> */}
      <form onSubmit={handleSubmit}>
        <InputPassword
          label="Senha atual"
          tamanho={6}
          tipo="password"
          IconeLadoDireito={EyeIcon}
          onChange={(e) => setSenhaAtual(e.target.value)}
        />
        <InputPassword
          label="Nova Senha"
          tamanho={6}
          tipo="password"
          IconeLadoDireito={EyeIcon}
          onChange={(e) => setSenhaNova(e.target.value)}
        />
        <InputPassword
          label="Confirmar Nova Senha"
          tamanho={6}
          tipo="password"
          IconeLadoDireito={EyeIcon}
          onChange={(e) => setSenhaNovaConfirmacao(e.target.value)}
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
