import AuthLayout from "@/app/components/auth/AuthLayout";
import LoginForm from "@/app/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div>
            <AuthLayout>
                <LoginForm />
            </AuthLayout>
        </div>
    )
}