interface buttonProps {
  children: React.ReactNode;
  onClick?: () => void;
  // cor?: "green-500" | "blue-500" | "zinc-500"; // a cor não está sendo reconhecida automaticamente
  desabilitado?: boolean;
  tipo?: "submit" | "reset" | "button";
  classe?: string;
}

export default function Button(props: buttonProps) {
  console.log(props);
  return (
    <button
      className={`px-4 py-3 rounded-lg bg-verde text-textoBranco font-bold hover:brightness-110 transition w-full ${props.classe} text-xl`}
      onClick={props.onClick}
      disabled={props.desabilitado}
      type={props.tipo}
    >
      {props.children}
    </button>
  );
}
