"use client";
import React, { useEffect, useState } from "react";
import { authContext } from "./authContext";

export type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | undefined>(undefined);

  const login = (token: string) => {
    setToken(token);
  };

  const logout = () => {
    setToken(undefined);
  };

  return (
    <authContext.Provider
      value={{
        token,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
