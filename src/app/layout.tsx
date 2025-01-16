import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const experimental_ppr = true;

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter-font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sistema Financeiro - ABPW",
  description: "Grupo de Pós da FIAP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.variable}
          antialiased
          h-[100vh]
          w-full
        `}
      >
        {children}
      </body>
    </html>
  );
}
