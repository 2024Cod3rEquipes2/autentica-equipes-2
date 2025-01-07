"use client";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "./useAuth";

export const withPrivateRoute = (Component: React.FC) => {
  return function WithPrivateRouter(props: any) {
    //const { token } = useAuth();
    const token = localStorage.getItem("token");
    if (!token) {
      return redirect("/login");
    }
    return <Component {...props} />;
  };
};
