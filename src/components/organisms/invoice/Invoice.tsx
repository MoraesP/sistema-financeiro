"use client";

import { InvoiceItem } from "@/components/atoms/invoiceItem/InvoiceItem";
import { ITransaction } from "@/models/Transaction";

export type TransactionProps = {
  transactions: ITransaction[];
};

export function Invoice({ transactions }: TransactionProps) {
  return (
    <div className="bg-gray-200 w-full rounded-lg py-6 px-6">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-h1 font-bold">Extrato</h1>
      </div>

      <div className="">
        {transactions?.map((transaction) => (
          <InvoiceItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
