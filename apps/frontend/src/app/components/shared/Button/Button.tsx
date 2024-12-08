interface buttonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  desabilitado?: boolean;
  tipo?: "submit" | "reset" | "button";
  cor: "verde" | "vermelho" | "azul";
}

export default function Button(props: buttonProps) {

  return (
    <button
      className={`botao ${props.className} bg-${props.cor}`}
      onClick={props.onClick}
      disabled={props.desabilitado}
      type={props.tipo}
    >
      {props.children}
    </button>
  );
}
