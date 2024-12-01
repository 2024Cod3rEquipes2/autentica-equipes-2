import type { Metadata } from "next";
import {Poppins} from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: [ "400", "600", "700"],
  variable: "--font-poppins",

})

export const metadata: Metadata = {
  title: "Projeto em equipes",
  description: "Projeto em equipes | FormaçãoDev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${poppins.variable} antialiased `}
      >
        {children}
      </body>
    </html>
  );
}
