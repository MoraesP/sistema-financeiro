"use client";

import { Inter } from "next/font/google";
import { Provider } from "react-redux"; // Importando o Provider do Redux
import "./globals.css";
import { store } from "@/store/store";

export const experimental_ppr = true;

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter-font-sans",
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Sistema Financeiro - P. Moraes",
//   description: "Postech da FIAP",
// };

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
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
