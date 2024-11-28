interface buttonProps {
  children: React.ReactNode;
  onClick?: () => void;
  cor: "green-500" | "blue-500" | "zinc-500";
  desabilitado?: boolean;
  tipo?: "submit" | "reset" | "button";
}

export default function Button(props: buttonProps) {
  console.log(props);
  return (
    <button
      className={`px-4 py-3 rounded-lg bg-${props.cor} text-textoBranco font-bold hover:brightness-110 transition w-full`}
      onClick={props.onClick}
      disabled={props.desabilitado}
      type={props.tipo}
    >
      {props.children}
    </button>
  );
}
