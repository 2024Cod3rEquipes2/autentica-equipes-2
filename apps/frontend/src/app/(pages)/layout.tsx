import { ReactNode } from "react";
import { AuthContextProvider } from "../contexts/auth/authContextProvider";

interface LayoutProps {
	children: ReactNode;
}

export default function Layout(props: LayoutProps) {
	return <AuthContextProvider>
		{props.children}
	</AuthContextProvider>
}
