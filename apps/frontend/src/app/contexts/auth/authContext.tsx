"use client";
import { createContext } from "react";

export type AuthContextType = {
	token?: string;
	login: (token: string) => void;
	logout: () => void;
	isAuthenticated: boolean;
}


export const authContext = createContext<AuthContextType>({
	token: undefined,
	isAuthenticated: false,
	login: () => { },
	logout: () => { },
});
