import AuthLayout from "@/app/components/auth/AuthLayout";
import LoginForm from "@/app/components/auth/LoginForm";

interface LoginProps {

}

export default function LoginPage(props: LoginProps) {
    return (
        <div>
            <AuthLayout>
                <LoginForm />
            </AuthLayout>
        </div>
    )
}