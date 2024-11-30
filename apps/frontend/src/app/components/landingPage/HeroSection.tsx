export default function HeroSection() {
  return (
    <section className="flex items-stretch px-6 py-20 gap-4">
      <div className="flex-1">
        <h1 className="text-5xl font-bold text-textoBranco mb-4">
          Autenticação Segura e Gestão de Acessos Simples
        </h1>
        <p className="text-xl text-textoCinza mb-8">
          Garanta o controle total sobre quem acessa seu sistema com
          autenticação robusta e flexível.
        </p>
        <div className="flex space-x-4">
          <a
            href="/cadastro"
            className="bg-azul text-textoBranco px-6 py-3 rounded-lg hover:bg-blue-400 transition"
          >
            Comece Agora
          </a>
          <a
            href="#funcionalidades"
            className="border border-azul text-azul px-6 py-3 rounded-lg hover:bg-blue-50 transition"
          >
            Saiba Mais
          </a>
        </div>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 flex items-center justify-center bg-blue-100 rounded-lg p-8 text-textoCinza">
          Ilustração de Autenticação
        </div>
      </div>
    </section>
  );
}
