"use client";
import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "./useAuth";

export const withPrivateRoute = (Component: React.FC) => {
	return function WithPrivateRouter(props: any) {
		const { token } = useAuth();

		if (!token) {
			return redirect("/login");
		}
		return <Component {...props} />;
	};
}