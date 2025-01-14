import { useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  IconeLadoEsquerdo?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  IconeLadoDireito?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label?: string;
  tipo: "email" | "password" | "text" | "number";
  tamanho: 6 | 8 | 10 | 12;
  descricao?: string;
}

export default function InputPassword({
  IconeLadoEsquerdo,
  IconeLadoDireito,
  label,
  tipo,
  descricao,
  tamanho,
  ...rest
}: InputProps) {
  const inputId = `input-${tipo}-${label?.toLowerCase().replace(/\s+/g, "-") || "default"}`;

  const [modo, setModo] = useState("password");

  function mudarModo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (modo === "password") {
      setModo("text");
    } else setModo("password");
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-textoBranco text-lg">
          {label}
        </label>
      )}
      <div className="flex flex-1 relative items-center">
        <input
          id={inputId}
          className={`input
              ${IconeLadoEsquerdo && IconeLadoDireito ? "pl-12 pr-12" : ""}
              ${IconeLadoEsquerdo && !IconeLadoDireito ? "pl-12 pr-4" : ""}
              ${IconeLadoDireito && !IconeLadoEsquerdo ? "pr-12 pl-4" : ""}
          `}
          type={modo}
          {...rest}
        />
        {IconeLadoEsquerdo && (
          <IconeLadoEsquerdo
            className={`text-textoCinza absolute left-0 h-full mx-4 size-${tamanho ?? 6} brightness-50`}
          />
        )}
        {IconeLadoDireito && (
          <button onClick={mudarModo} className="absolute right-0 h-full ">
            <IconeLadoDireito
              className={`text-textoCinza mx-4 size-${tamanho ?? 6} brightness-50`}
            />
          </button>
        )}
      </div>
      {descricao && <p className="text-sm text-textoCinza">{descricao}</p>}
    </div>
  );
}
