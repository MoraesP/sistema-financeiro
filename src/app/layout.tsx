"use client";

import { store } from "@/store/store";
import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "@styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--inter-font-sans",
  display: "swap",
});


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
