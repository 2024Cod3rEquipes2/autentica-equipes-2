import { useEffect, type ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <div
      className={`flex flex-col justify-center items-center
        bg-fundoPaginaSecundaria
        rounded-xl px-14 py-8
        ${props.className}
        md: w-[630px]
        md: h-[748px]
        `}
    >
      {props.children}
    </div>
  );
}
