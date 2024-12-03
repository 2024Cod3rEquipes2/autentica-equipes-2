import AuthLayout from "@/app/components/auth/AuthLayout";
import CadastroForm from "@/app/components/auth/CadastroForm";

interface CadastroProps {

}

export default function CadastroPage(props: CadastroProps){
    return (
        <div>
            <AuthLayout>
                <CadastroForm />
            </AuthLayout>
        </div>
    )
}