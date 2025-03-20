"use client";

import { InvoiceItem } from "@/components/atoms/invoiceItem/InvoiceItem";
import { ITransaction } from "@/models/Transaction";
import { useEffect, useRef, useState } from "react";

export type TransactionProps = {
  transactions: ITransaction[];
};

export function Invoice({ transactions }: TransactionProps) {
  const [visibleTransactions, setVisibleTransactions] = useState<
    ITransaction[]
  >([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const containerRef = useRef<HTMLDivElement>(null);

  const sortedTransactions = transactions?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  useEffect(() => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    if (startIndex < sortedTransactions.length) {
      setVisibleTransactions((prevTransactions) => [
        ...prevTransactions,
        ...sortedTransactions.slice(startIndex, endIndex),
      ]);
    }
  }, [page, transactions, sortedTransactions]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  return (
    <div
      id="principal"
      className="bg-gray-200 w-full rounded-lg py-6 pl-6"
      style={{ height: "calc(100vh - 120px)" }}
    >
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-h1 font-bold">Extrato</h1>
      </div>

      <div
        id="lista"
        className="overflow-y-auto pr-6"
        style={{ height: "calc(100% - 35px)" }}
        ref={containerRef}
        onScroll={handleScroll}
      >
        {visibleTransactions?.map((transaction) => (
          <InvoiceItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  );
}
