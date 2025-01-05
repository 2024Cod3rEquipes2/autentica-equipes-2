"use client";
import Header from "@/app/components/shared/Header/Header";
import Menu from "@/app/components/shared/Menu/Menu";
import { withPrivateRoute } from "@/app/contexts/auth";

function Layout({ children }: any) {
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
// export default Layout;
export default withPrivateRoute(Layout)
