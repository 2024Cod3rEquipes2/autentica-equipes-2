interface TituloProps {
  texto: string;
  className?: string;
}

export default function Titulo(props: TituloProps) {
  return (
    <h1
      className={`${props.className ?? "text-xl"} leading-9 font-bold text-textoBranco text-center `}
    >
      {props.texto}
    </h1>
  );
}
