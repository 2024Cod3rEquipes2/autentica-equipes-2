"use client";

import AuthLayout from "@/app/components/auth/AuthLayout";
import CadastroForm from "@/app/components/auth/CadastroForm";

export default function CadastroPage() {
	return (
		<div>
			<AuthLayout>
				<CadastroForm />
			</AuthLayout>
		</div>
	);
}
