"use client";

import { InvoiceItem } from "@/components/atoms/invoiceItem/InvoiceItem";
import DropdownMenu from "@/components/moleculas/dropdown-menu/DropdownMenu";
import http from "@/http";
import { ITransaction } from "@/models/Transaction";
import {
  TransactionType,
  TransactionTypeFilterValue,
} from "@/models/TransationType";
import { useEffect, useState } from "react";

export type TransactionProps = {
  transactions: ITransaction[];
};

export function Invoice({ transactions }: TransactionProps) {
  const sortedTransactions = [...transactions].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const [transactionTypeFilter, setTransactionTypeFilter] =
    useState<TransactionType>({
      display: "Todas",
      value: TransactionTypeFilterValue.TODAS,
    });

  const [transactionTypesFilter, setTransactionTypesFilter] = useState<
    TransactionType[]
  >([]);

  const filteredTransactions = sortedTransactions.filter((transaction) => {
    if (transactionTypeFilter.value === TransactionTypeFilterValue.TODAS) {
      return true;
    }
    return transaction.type === transactionTypeFilter.value;
  });

  useEffect(() => {
    http.get<TransactionType[]>("transactions/types").then((response) => {
      setTransactionTypesFilter([
        { display: "Todas", value: TransactionTypeFilterValue.TODAS },
        ...response.data,
      ]);
    });
  }, []);

  return (
    <div
      id="principal"
      className="bg-gray-200 w-full rounded-lg py-6 pl-6"
      style={{ height: "calc(100vh - 120px)" }}
    >
      <div className="pr-6 pb-6">
        <DropdownMenu
          width="auto"
          selected={transactionTypeFilter}
          options={transactionTypesFilter}
          onChange={setTransactionTypeFilter}
          placeholder="Selecione o tipo de transação"
        ></DropdownMenu>
      </div>

      <div className="flex justify-between items-center pb-4">
        <h1 className="text-h1 font-bold">Extrato</h1>
      </div>

      <div
        id="lista"
        className="overflow-y-auto pr-6"
        style={{ height: "calc(100% - 35px)" }}
      >
        {filteredTransactions?.map((transaction) => (
          <InvoiceItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
