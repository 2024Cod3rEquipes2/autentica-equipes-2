import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-8 bg-fundoJanelaSegundaria text-textoBranco p-4">
      <div className="flex justify-around">
        <div>
          <h3 className="text-base font-semibold mb-4">Links Úteis</h3>
          <ul>
            <li>
              <Link href="/sobre">Sobre</Link>
            </li>
            <li>
              <Link href="/privacidade">Política de Privacidade</Link>
            </li>
            <li>
              <Link href="/termos">Termos de Serviço</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-4">Contato</h3>
          <p>Email: suporte@s3curity.com</p>
        </div>
        <div>
          <h3 className="text-base font-semibold mb-4">Siga-nos</h3>
          <ul>
            <li>
              <Link href="#">Instagram</Link>
            </li>
            <li>
              <Link href="#">Facebook</Link>
            </li>
            <li>
              <Link href="#">Github</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-end text-sm">
        © 2024 S3curity Authentication. Todos os direitos reservados.
      </div>
    </footer>
  );
}
