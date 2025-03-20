import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { InvoiceProvider } from "@/lib/invoices-context";

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
        suppressHydrationWarning={true} //ignora os erros de hidratração
        className={`
            ${inter.variable}
            antialiased
            h-[100vh]
            w-full
            bg-secondary-200
            `}
      >
        <InvoiceProvider>{children}</InvoiceProvider>
      </body>
    </html>
  );
}
