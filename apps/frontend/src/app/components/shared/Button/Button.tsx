interface ButtonProps {
	children: React.ReactNode;
	onClick?: () => void;
	className?: string;
	disabled?: boolean;
	tipo?: "submit" | "reset" | "button";
	cor: "verde" | "vermelho" | "azul";
}

export default function Button({
	children,
	onClick,
	className = "",
	disabled = false,
	tipo = "button",
	cor,
}: ButtonProps) {
	const corBotao = {
		verde: "bg-verde",
		vermelho: "bg-vermelho",
		azul: "bg-azul",
	};

	return (
		<button
			className={`
        w-full py-3 px-4 rounded-lg
        font-semibold text-textoBranco
        transition-all duration-200 ease-in-out
        hover:brightness-110
        disabled:opacity-50 disabled:cursor-not-allowed
        ${corBotao[cor]}
        ${className}
      `}
			onClick={onClick}
			disabled={disabled}
			type={tipo}
		>
			{children}
		</button>
	);
}
