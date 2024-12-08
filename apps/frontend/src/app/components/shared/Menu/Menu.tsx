import {
  ArrowLeftStartOnRectangleIcon,
  ClipboardDocumentCheckIcon,
  HomeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Menu() {
  return (
    <aside className="flex flex-col w-[300px] justify-between pb-12 pt-8">
      <ul className="flex flex-col">
        <li className="flex gap-2 py-2 px-4 hover:bg-fundoJanelaSegundaria">
          <HomeIcon className="size-6 text-textoCinza" />
          <Link
            className="flex justify-center items-center text-textoBranco"
            href={"/home"}
          >
            Home
          </Link>
        </li>
        <li className="flex gap-2 py-2 px-4 hover:bg-fundoJanelaSegundaria">
          <ClipboardDocumentCheckIcon className="size-6 text-textoCinza" />
          <Link
            className="flex justify-center items-center text-textoBranco"
            href={"/perfil"}
          >
            Perfis
          </Link>
        </li>
        <li className="flex gap-2 py-2 px-4 hover:bg-fundoJanelaSegundaria">
          <ShieldCheckIcon className="size-6 text-textoCinza" />
          <Link
            className="flex justify-center items-center text-textoBranco"
            href={"/permissao"}
          >
            Permissões
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-2 py-2 px-4 hover:bg-fundoJanelaSegundaria">
        <ArrowLeftStartOnRectangleIcon className="size-6 text-textoCinza" />

        <Link
          className="text-textoBranco flex justify-center items-center hover:bg-fundoJanelaSegundaria"
          href={"/"}
        >
          SAIR
        </Link>
      </div>
    </aside>
  );
}
