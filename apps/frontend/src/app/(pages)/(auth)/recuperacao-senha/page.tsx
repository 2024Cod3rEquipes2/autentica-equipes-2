
import AuthLayout from "@/app/components/auth/AuthLayout";
import RecuperacaoSenhaForm from "@/app/components/auth/RecuperacaoSenhaForm";

interface RecuperacaoSenhaProps {

}

export default function RecuperacaoSenhaPage(props: RecuperacaoSenhaProps) {
    return (
        <AuthLayout className="h-max">
            <RecuperacaoSenhaForm />
        </AuthLayout>
    )
}