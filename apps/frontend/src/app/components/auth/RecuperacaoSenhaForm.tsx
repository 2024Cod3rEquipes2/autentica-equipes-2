"use client";

import Button from "@/app/components/shared/Button/Button";
import Input from "@/app/components/shared/Input/Input";
import Titulo from "@/app/components/shared/Titulo/Titulo";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { useState } from "react";


export default function RecuperacaoSenhaForm() {
  const [email, setEmail] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(email);
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
