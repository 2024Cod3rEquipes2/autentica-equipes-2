import Header from "@/app/components/Header/Header";
import Menu from "@/app/components/Menu/Menu";

export default function Layout({ children }: any) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <Menu />
        {children}
      </div>
    </div>
  );
}
