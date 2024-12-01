interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  IconeLadoEsquerdo?: React.ComponentType<React.SVGProps<SVGSVGElement>> | any;
  IconeLadoDireito?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label?: string;
  tipo: "email" | "password" | "text" | "number";
  tamanho?: 8 | 10 | 12;
  descricao?: string;
}

export default function Input({
  IconeLadoEsquerdo,
  IconeLadoDireito,
  label,
  tipo,
  descricao,
  // tamanho,  // o tamanho não está sendo carregado automaticamente
  ...rest
}: InputProps) {
  const inputId = `input-${tipo}-${label?.toLowerCase().replace(/\s+/g, "-") || "default"}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-textoBranco text-lg">
          {label}
        </label>
      )}
      <div className="flex flex-1 relative items-center">
        {IconeLadoEsquerdo && (
          <IconeLadoEsquerdo
            className={`text-textoCinza absolute left-0 h-full mx-4 size-6`}
          />
        )}
        <input
          id={inputId}
          className={`input ${IconeLadoEsquerdo ? "pl-10" : ""} ${
            IconeLadoDireito ? "pr-10" : ""
          }`}
          type={tipo}
          {...rest}
        />
        {IconeLadoDireito && (
          <IconeLadoDireito
            className={`text-textoCinza absolute right-0 h-full mx-4 size-6`}
          />
        )}
      </div>
      {descricao && <p className="text-sm text-textoCinza">{descricao}</p>}
    </div>
  );
}
