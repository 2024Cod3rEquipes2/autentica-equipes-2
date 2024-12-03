export default function Features() {
    const featuresList = [
      {
        title: 'Cadastro e Login Simples',
        description: 'Registro e login rápido com validação de e-mail e senha criptografada.'
      },
      {
        title: 'Autenticação de Dois Fatores (2FA)',
        description: 'Camada extra de segurança com SMS ou app autenticador.'
      },
      {
        title: 'Gerenciamento de Perfis',
        description: 'Crie e gerencie perfis e permissões de forma intuitiva.'
      },
      {
        title: 'Login com QR Code',
        description: 'Experiência de login segura e conveniente via QR Code.'
      }
    ]
  
    return (
      <section id="funcionalidades" className="px-6 py-16">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Funcionalidades Poderosas para Garantir Segurança
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuresList.map((feature, index) => (
            <div key={index} className="rounded-lg border border-bordas p-6">
              <h3 className="text-xl font-semibold mb-4 text-textoBranco">{feature.title}</h3>
              <p className="text-textoCinza">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }