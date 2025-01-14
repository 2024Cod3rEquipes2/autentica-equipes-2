"use client";

import Button from "@/app/components/shared/Button/Button";
import Input from "@/app/components/shared/Input/Input";
import Titulo from "@/app/components/shared/Titulo/Titulo";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RecuperacaoSenhaForm() {
  const [email, setEmail] = useState("");

  const [emailEnviadoSucesso, setEmailEnviadoSucesso] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:4000/auth/recover-password?email=${email}`
      );
      console.log(response.data);
      await alert("Email enviado com sucesso!");
      setEmail("");
      setEmailEnviadoSucesso(true);
      //useRouter().push("/login");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar o email");
    }
  }

  if (emailEnviadoSucesso) {
    const router = useRouter();
    return (
      <div className="flex flex-1 flex-col justify-center gap-2 w-full">
        <Titulo texto="Email enviado com sucesso, verifique sua caixa de mensagens e acesse o link para redefinição da sua senha!" />
        <Button
          className="mt-4"
          cor="verde"
          onClick={() => {
            router.push("/");
          }}
        >
          Retornar
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-2 w-full">
      <Titulo texto="Solicitar troca de senha" />
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          tamanho={6}
          tipo="email"
          IconeLadoDireito={EnvelopeIcon}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button className="mt-4" tipo="submit" cor="verde">
          Enviar
        </Button>
      </form>
    </div>
  );
}
