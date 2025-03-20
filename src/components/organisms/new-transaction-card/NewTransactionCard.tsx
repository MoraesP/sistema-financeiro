"use client";

import DropdownMenu from "@/components/moleculas/dropdown-menu/DropdownMenu";
import { ITransaction } from "@/models/Transaction";
import { TransactionType } from "@/models/TransationType";
import http from "@http";
import Image from "next/image";
import { useEffect, useState } from "react";
import "./NewTransactionCard.styles.css";
import { updatePage } from "@/lib/actions";

export function NewTransactionCard() {
  const [transactionType, setTransactionType] = useState<TransactionType>({
    display: "",
    value: null,
  });
  const [transactionValue, setTransactionValue] = useState("");

  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    []
  );

  const createTransacion = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    http
      .post("transactions", {
        type: transactionType.value,
        value: parseFloat(transactionValue),
      })
      .then((response) => {
        const newTransaction: ITransaction = {
          id: response.data._id,
          type: response.data.type,
          value: response.data.value,
          createdAt: new Date(response.data.createdAt),
        };
        console.log(newTransaction);
        updatePage();
        resetForm();
      });
  };

  // const onChangeType = (value: string) => {
  //   setNewInvoice((prev) => ({ ...prev, type: value }));
  // };

  // const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   if (!isNaN(Number(value))) {
  //     setNewInvoice((prev) => ({ ...prev, value: Number(value) }));
  //   }
  // };

  // const createInvoice = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   if (!newInvoice.type || newInvoice.value === 0) {
  //     alert("Por favor, preencha todos os campos corretamente.");
  //     return;
  //   }
  //   postInvoice(newInvoice);
  //   updatePage();
  //   resetForm();
  // };

  const resetForm = () => {
    setTransactionType({ display: "", value: null });
    setTransactionValue("");
  };

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
          <h1 className="text-h1 font-bold ">Nova Transação</h1>
          <form className="grid gap-6" onSubmit={createTransacion}>
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
                value={transactionValue}
                onChange={(evt) => setTransactionValue(evt.target.value)}
              />
            </div>
            <button
              type="submit"
              className="peer block w-[184px] h-[43px] cursor-pointer rounded-md border border-primary-400 bg-primary-400 py-2 pl-2 text-p outline-2 font-bold text-white"
            >
              Concluir Transação
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
