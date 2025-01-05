import { useAuth } from "@/app/contexts/auth";
import { useEffect, useState } from "react";
import router from "next/router";

export default function LogoutPage() {
	const [isloading, setIsLoading] = useState(true);
	const { logout } = useAuth()
	useEffect(() => {
		logout()
		router.push("/")
		setIsLoading(false)
	}, [])

	return (
		<div>{isloading ? "redirecting..." : ""}</div>
	)
}