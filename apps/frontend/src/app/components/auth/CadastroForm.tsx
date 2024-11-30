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

export default function CadastroForm() {
  return (
    <div className="flex flex-1 flex-col justify-evenly w-full">
      <Titulo texto="Cadastrar" />
      <div className="flex flex-col gap-2">
        <Input
          label="Nome"
          IconeLadoEsquerdo={UserCircleIcon}
          tipo="text"
          tamanho={6}
        />

        <Input
          label="Email"
          IconeLadoEsquerdo={EnvelopeIcon}
          tipo="email"
          tamanho={6}
        />

        <Input
          label="Senha"
          IconeLadoEsquerdo={LockClosedIcon}
          IconeLadoDireito={EyeIcon}
          tipo="password"
          tamanho={6}
        />

        <Input
          label="Senha"
          IconeLadoEsquerdo={LockClosedIcon}
          tipo="password"
          tamanho={6}
        />

        <Input
          label="Telefone"
          IconeLadoEsquerdo={PhoneIcon}
          tipo="text"
          tamanho={6}
        />
      </div>

      <Button className="verde mt-8">Cadastrar-se</Button>

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
