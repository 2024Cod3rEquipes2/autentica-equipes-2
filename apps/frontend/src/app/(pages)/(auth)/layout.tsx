import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  return (
    <div className="flex h-screen w-full justify-center items-center">
      {props.children}
    </div>
  );
}
