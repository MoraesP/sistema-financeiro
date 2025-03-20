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

export type InvoiceItemProps = {
  id: string;
  type: string;
  value: number;
  date: string; // Agora data é string no props
};

export const InvoiceContext = createContext({});

export function InvoiceItem({ id, type, value, date }: InvoiceItemProps) {
  const { useDeleteInvoice } = useInvoiceProvider();

  const deleteInvoice = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useDeleteInvoice(id);
    updatePage();
  };

  // Converte a data para um objeto Date antes de usá-la
  const parsedDate = new Date(date);

  return (
    <InvoiceContext.Provider value={{ id }}>
      <div className="flex flex-col border-b border-secondary-400 py-3">
        <small className="text-secondary-400 font-bold pb-1">
          {months[parsedDate.getMonth()]}
        </small>

        <div className="flex flex-row justify-between items-center">
          <p>{type}</p>
          <div className="flex gap-2">
            <Link
              href={{
                pathname: `/dashboard/invoices/${id}/edit`,
                query: { id },
              }}
            >
              <ButtonIcon Icon={EditIcon} />
            </Link>
            <ButtonIcon Icon={TrashIcon} onClickIcon={deleteInvoice} />
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold">R$ {value}</p>
          <small className="text-gray-600">{formatDate(parsedDate)}</small>
        </div>
      </div>
    </InvoiceContext.Provider>
  );
}
