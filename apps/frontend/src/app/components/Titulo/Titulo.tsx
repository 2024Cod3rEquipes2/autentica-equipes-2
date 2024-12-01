interface TituloProps {
  texto: string;
}

export default function Titulo({ texto }: TituloProps) {
  return (
    <h1 className="text-2xl font-semibold text-textoBranco text-center mb-4">
      {texto}
    </h1>
  );
}
