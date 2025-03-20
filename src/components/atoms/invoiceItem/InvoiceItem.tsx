"use client";

import { EditIcon } from "@/components/icons/EditIcon";
import { ButtonIcon } from "../buttonIcon/ButtonIcon";
import Link from "next/link";
import { TrashIcon } from "@/components/icons/TrashIcon";
import { months } from "@/lib/consts";
import { createContext } from "react";
import { formatDate } from "@/lib/shared-functions";
import { updatePage } from "@/lib/actions";
import { useInvoiceProvider } from "@/lib/invoices-context";
import { ITransaction } from "@/models/Transaction";

export type InvoiceItemProps = {
  transaction: ITransaction;
};

export const InvoiceContext = createContext({});

export function InvoiceItem({ transaction }: InvoiceItemProps) {
  const { useDeleteInvoice } = useInvoiceProvider();

  const deleteInvoice = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDeleteInvoice(transaction.id);
    updatePage();
  };
  // Converte a data para um objeto Date antes de usá-la
  return (
    <InvoiceContext.Provider value={transaction.id}>
      <div className="flex flex-col border-b border-secondary-400 py-3">
        <small className="text-secondary-400 font-bold pb-1">
          {months[transaction.createdAt.getMonth()]}
        </small>

        <div className="flex flex-row justify-between items-center">
          <p>{transaction.type}</p>
          <div className="flex gap-2">
            <Link
              href={{
                pathname: `/dashboard/invoices/${transaction.id}/edit`,
                query: `${transaction.id}`,
              }}
            >
              <ButtonIcon Icon={EditIcon} />
            </Link>
            <ButtonIcon Icon={TrashIcon} onClickIcon={deleteInvoice} />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold">R$ {transaction.value}</p>
          <small className="text-gray-600">
            {formatDate(transaction.createdAt)}
          </small>
        </div>
      </div>
    </InvoiceContext.Provider>
  );
}
