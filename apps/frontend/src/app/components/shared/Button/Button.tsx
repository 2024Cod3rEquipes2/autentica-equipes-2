interface buttonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className: string;
  desabilitado?: boolean;
  tipo?: "submit" | "reset" | "button";
}

export default function Button(props: buttonProps) {
  console.log(props);
  return (
    <button
      className={`botao ${props.className}`}
      onClick={props.onClick}
      disabled={props.desabilitado}
      type={props.tipo}
    >
      {props.children}
    </button>
  );
}
