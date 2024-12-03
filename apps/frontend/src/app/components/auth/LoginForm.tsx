import {
  EnvelopeIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import Button from "../shared/Button/Button";
import Input from "../shared/Input/Input";
import Titulo from "../shared/Titulo/Titulo";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  return (
    <div className="flex flex-1 flex-col justify-evenly items-center w-full">
      <Image src="/logo.svg" alt="Logo" width={200} height={150} />

      <Titulo texto="Entre com sua conta" className="text-2xl" />

      <div className="flex flex-col w-full">
        <Input
          label="Email"
          IconeLadoDireito={EnvelopeIcon}
          tipo="email"
          tamanho={6}
        />

        <Input
          label="Senha"
          IconeLadoDireito={EyeIcon}
          tipo="password"
          tamanho={6}
        />
      </div>

      <Link
        href={"/recuperacao-senha"}
        className="self-end text-textoCinza text-md pb-4 hover:brightness-125 transition"
      >
        Esqueceu a senha?
      </Link>
      <Button className="verde" tipo="submit">
        Login
      </Button>

      <div className="flex items-center justify-center">
        <hr className="linha my-8" />{" "}
        <span className="text-textoCinza mx-2 text-lg"> ou </span>{" "}
        <hr className="linha" />
      </div>

      <button className="self-center">
        <Image
          src="/google-icon.svg"
          alt={"google-icon"}
          width={60}
          height={60}
        />
      </button>

      <hr></hr>
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
