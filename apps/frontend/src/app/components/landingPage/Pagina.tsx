import { ReactNode } from "react"

interface PaginaProps {
    children: ReactNode;
}

export default function Pagina(props: PaginaProps){
    return (
        <div className="flex flex-col w-full justify-center max-w-5xl">
            {props.children}
        </div>
    )
}