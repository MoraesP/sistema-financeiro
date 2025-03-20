import { months } from "@/lib/consts";
import { formatDate } from "@/lib/shared-functions";
import { ITransaction } from "@/models/Transaction";
import { TransactionTypeValue } from "@/models/TransationType";
import { createContext } from "react";

export type InvoiceItemProps = {
  transaction: ITransaction;
};

export const InvoiceContext = createContext({});

export function InvoiceItem({ transaction }: InvoiceItemProps) {
  // const deleteInvoice = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useDeleteInvoice(transaction.id);
  // updatePage();
  // };

  const formatTransactionType = (type: string): string => {
    const typeMap: Record<TransactionTypeValue, string> = {
      [TransactionTypeValue.SAQUE]: "Saque",
      [TransactionTypeValue.DEPOSITO]: "Depósito",
      [TransactionTypeValue.TRANSFERENCIA]: "Transferência",
    };

    return typeMap[type as TransactionTypeValue] || "Desconhecido";
  };

  return (
    <InvoiceContext.Provider value={transaction.id}>
      <div className="flex flex-col border-b border-secondary-400 py-3">
        <small className="text-secondary-400 font-bold pb-1">
          {months[new Date(transaction.createdAt).getMonth()]}
        </small>

        <div className="flex flex-row justify-between items-center">
          <p>{formatTransactionType(transaction.type)}</p>
          {/* <div className="flex gap-2">
            <Link
              href={{
                pathname: `/dashboard/invoices/${transaction.id}/edit`,
                query: `${transaction.id}`,
              }}
            >
              <ButtonIcon Icon={EditIcon} />
            </Link>
            <ButtonIcon Icon={TrashIcon} onClickIcon={deleteInvoice} />
          </div> */}
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="font-bold">R$ {transaction.value}</p>
          <small className="text-gray-600">
            {formatDate(new Date(transaction.createdAt))}
          </small>
        </div>
      </div>
    </InvoiceContext.Provider>
  );
}
