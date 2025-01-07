"use client";

import AuthLayout from "@/app/components/auth/AuthLayout";
import LoginForm from "@/app/components/auth/LoginForm";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function LoginPage() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      redirect("/home");
    }
  });

  return (
    <div>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </div>
  );
}
