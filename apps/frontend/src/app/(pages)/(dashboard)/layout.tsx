import Header from "@/app/components/shared/Header/Header";
import Menu from "@/app/components/shared/Menu/Menu";

export default function Layout({ children }: any) {
  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <div className="flex flex-1">
        <Menu />
        {children}
      </div>
    </div>
  );
}
