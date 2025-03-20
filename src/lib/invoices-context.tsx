"use client";

import { createContext, useContext, useState } from "react";

export interface Invoice {
  id: string;
  type: string;
  value: number;
  date: string; // Armazena como string para evitar erro de hidratação
}

interface InvoiceActions {
  invoices: Invoice[];
  useGetInvoice: (id: string) => Invoice | undefined;
  usePostInvoice: (invoice: Invoice) => void;
  usePatchInvoice: (invoice: Invoice) => void;
  useDeleteInvoice: (id: string) => void;
}
// const invoicesMock: Invoice[] = [
//   { id: "4", type: "Saque", value: 600.0, date: "2024-10-19" },
//   { id: "3", type: "Depósito", value: 250.0, date: "2024-06-01" },
//   { id: "2", type: "Saque", value: 300.0, date: "2024-04-08" },
//   { id: "1", type: "Depósito", value: 300.0, date: "2024-04-01" },
// ];

const InvoiceContext = createContext<
  InvoiceActions| undefined
>(undefined);

export function InvoiceProvider({ children }: { children: React.ReactNode }) {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const useGetInvoice = (id: string) => invoices.find((i) => i.id === id);

  const usePostInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [invoice, ...prev]); // Atualiza estado corretamente
  };

  const usePatchInvoice = (invoice: Invoice) => {
    setInvoices((prev) =>
      prev.map((i) => (i.id === invoice.id ? { ...i, ...invoice } : i))
    );
  };

  const useDeleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <InvoiceContext.Provider
      value={{
        useGetInvoice,
        usePostInvoice,
        usePatchInvoice,
        useDeleteInvoice,
        invoices,
      }}
    >
      {children}
    </InvoiceContext.Provider>
  );
}

export function useInvoiceProvider() {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error("Invalid InvoiceContext");
  return context;
}
