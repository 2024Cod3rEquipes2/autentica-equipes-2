import AuthLayout from "@/app/components/auth/AuthLayout";
import RedefinirSenhaForm from "@/app/components/auth/RedefinirSenhaForm";

export default function RedefinirSenhaPage() {
  return (
    <AuthLayout className="h-max">
      <RedefinirSenhaForm />
    </AuthLayout>
  );
}
