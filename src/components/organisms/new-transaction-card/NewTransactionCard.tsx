"use client";

import { Button } from "@/components/atoms/button/Button";
import DropdownMenu from "@/components/moleculas/dropdown-menu/DropdownMenu";
import { TransactionType } from "@/models/TransationType";
import { addTransaction } from "@/store/slices/transactionsSlice";
import { AppDispatch } from "@/store/store";
import http from "@http";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./NewTransactionCard.styles.css";

export function NewTransactionCard() {
  const [transactionType, setTransactionType] = useState<TransactionType>({
    display: "",
    value: null,
  });
  const [transactionValue, setTransactionValue] = useState("");
  const [transactionTypes, setTransactionTypes] = useState<TransactionType[]>(
    []
  );

  const dispatch = useDispatch<AppDispatch>();

  const createTransacion = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const value = parseFloat(transactionValue.replace(",", "."));
    if (!transactionType.value || isNaN(value)) return;
    dispatch(addTransaction({ type: transactionType.value, value }));
    resetForm();
  };

  const resetForm = () => {
    setTransactionType({ display: "", value: null });
    setTransactionValue("");
  };

  const isSubmitDisabled =
    !transactionValue ||
    !transactionTypes.some((type) => type.value === transactionType.value);

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
                type="text"
                className="peer block w-[184px] h-[48px] cursor-pointer rounded-md border border-primary-400 py-2 pl-2 text-p text-center outline-2 text-primary-400"
                placeholder="0"
                value={transactionValue}
                onChange={(evt) => {
                  const value = evt.target.value;
                  if (/^\d*(,\d{0,2})?$/.test(value)) {
                    setTransactionValue(value);
                  }
                }}
              />
            </div>
            <Button
              variant={isSubmitDisabled ? "disabled" : "primary"}
              buttonType={"regular"}
              disabled={isSubmitDisabled}
              customClass="w-[50%] h-[43px] py-2 pl-2 text-p outline-2 font-bold"
              type="submit"
            >
              Concluir Transação
            </Button>
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
