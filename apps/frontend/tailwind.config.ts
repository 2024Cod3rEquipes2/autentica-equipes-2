import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fundoPaginaSecundaria: "#18181B",
        fundoJanelaPrimaria: "#0A0A0A", // transparecencia 50%
        fundoJanelaSegundaria: "#27272A",
        textoBranco: "#F5F5F5",
        textoCinza: "#7F7F80",
        azul: "#1D4ED8",
        verde: "#22C55E",
        vermelho: "#EF4444",
        cinza: "#27272A",
        bordas: "#A1A1AA", // transparencia 10%
      },
    },
  },
  plugins: [],
} satisfies Config;
