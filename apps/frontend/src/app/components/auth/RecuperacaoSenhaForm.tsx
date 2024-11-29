import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import Titulo from "@/app/components/Titulo/Titulo";
import { EnvelopeIcon } from "@heroicons/react/24/outline";

interface RecuperacaoSenhaProps {

}

export default function RecuperacaoSenhaForm() {
  return (
    <div className="flex flex-1 flex-col justify-center gap-2 w-full">
      <Titulo texto="Solicitar troca de senha" />
      <Input
        label="Email"
        tamanho={6}
        tipo="email"
        IconeLadoDireito={EnvelopeIcon}
      />
      <Button className="verde mt-4" tipo="submit">
        Enviar
      </Button>
    </div>    
  );
}