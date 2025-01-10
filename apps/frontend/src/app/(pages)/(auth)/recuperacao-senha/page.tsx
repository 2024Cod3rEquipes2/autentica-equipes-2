import AuthLayout from "@/app/components/auth/AuthLayout";
import RecuperacaoSenhaForm from "@/app/components/auth/RecuperacaoSenhaForm";

export default function RecuperacaoSenhaPage() {
  return (
    <AuthLayout className="h-max">
      <RecuperacaoSenhaForm />
    </AuthLayout>
  );
}
