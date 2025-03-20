"use client";

import DropdownMenu from "@/components/moleculas/dropdown-menu/DropdownMenu";
import http from "@/http";
import { TransactionType } from "@/models/TransationType";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function EditInvoice() {
  const editInvoice = { id: "1", type: "saque", value: 100 };

  const [transactionType, setTransactionType] = useState<TransactionType>({
    display: "",
    value: null,
  });

  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    []
  );

  // const idParam = useSearchParams();
  // const id = idParam.get("id") || "";
  // const { useGetInvoice, usePatchInvoice } = useInvoiceProvider();
  // const patchInvoice = usePatchInvoice;
  // const invoice = useGetInvoice(id);

  // if(!invoice) redirect('/not-found')

  // const [editInvoice, setEditInvoice] = useState(invoice)

  // const onChangeType = (value: string) => {
  //   setEditInvoice((prev) => ({ ...prev, type: value }));
  // };

  // const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   if (!isNaN(Number(value))) {
  //     setEditInvoice((prev) => ({ ...prev, value: Number(value) }));
  //   }
  // };

  // const updateInvoice = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (!editInvoice.type || editInvoice.value === 0) {
  //     alert("Por favor, preencha todos os campos corretamente.");
  //     return;
  //   }
  //   patchInvoice(editInvoice);
  //   updatePage();
  // };

  useEffect(() => {
    http.get<TransactionType[]>("transactions/types").then((response) => {
      setTransactionTypes(response.data);
    });
  }, []);

  return (
    <div
      id="new-transaction"
      className="bg-gray-400 rounded-lg py-6 px-6 lg:h-[350px] text-primary-400 relative z-0"
    >
      <Image
        src="/Pixels3.png"
        alt=""
        width={180}
        height={178}
        className="absolute bottom-0 left-0 -z-10"
      />
      <Image
        src="/Pixels4.png"
        alt=""
        width={180}
        height={178}
        className="absolute top-0 right-0 -z-10"
      />

      <div className="grid align-left py-4 lg:grid-cols-2">
        <div className="grid gap-6">
          <h1 className="text-h1 font-bold ">Editar Transação</h1>
          <form className="grid gap-6" onSubmit={() => {}}>
            <DropdownMenu
              selected={transactionType}
              options={transactionTypes}
              onChange={setTransactionType}
              placeholder="Selecione o tipo de transação"
            ></DropdownMenu>
            <div className="grid gap-2">
              <label className="font-bold">Valor</label>
              <input
                id="transaction-value"
                name="transaction-value"
                type="numeric"
                step="0.01"
                className="peer block w-[184px] h-[48px] cursor-pointer rounded-md border border-primary-400 py-2 pl-2 text-p text-center outline-2 text-primary-400"
                placeholder="0"
                defaultValue={editInvoice.value}
                onChange={() => {}}
              />
            </div>
            <button
              type="submit"
              className="peer block w-[184px] h-[43px] cursor-pointer rounded-md border border-primary-400 bg-primary-400 py-2 pl-2 text-p outline-2 font-bold text-white"
            >
              Concluir Edição
            </button>
          </form>
        </div>
        <div className="lg:col-start-2">
          <Image
            src="/PersonWithCard.png"
            alt="Desenho de pessoa segurando cartão gigante"
            width={327}
            height={231}
            className="lg:mt-12 mt-8"
          />
        </div>
      </div>
    </div>
  );
}
