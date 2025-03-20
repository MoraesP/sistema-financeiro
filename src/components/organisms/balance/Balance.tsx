"use client";

import { EyeIcon } from "@/components/icons/EyeIcon";
import { daysOfTheWeek } from "@/lib/consts";
import { formatDate } from "@/lib/shared-functions";
import Image from "next/image";
import { useState } from "react";

export type BalanceProps = {
  username: string;
  balance: number;
};

export function Balance({ username, balance }: BalanceProps) {
  const [isVisible, setIsVisible] = useState(true);
  const dayWeek = daysOfTheWeek[new Date().getDay() - 1];
  const todaysDate = formatDate(new Date());

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div
      id="balance"
      className="bg-primary-400
                        flex
                        relative
                        rounded-lg
                        lg:py-6 md:py-6 py-[60px]
                        lg:px-6 md:px-6 px-[60px]
                        w-full
                        h-auto
                        lg:min-h-[400px] md:min-h-[400px]
                        flex-col lg:flex-row md:flex-row
                        text-white
                        "
    >
      <Image
        src="/Pixels1.png"
        alt=""
        width={180}
        height={178}
        className="absolute bottom-0 left-0"
      />
      <Image
        src="/Pixels2.png"
        alt=""
        width={180}
        height={178}
        className="absolute top-0 right-0"
      />
      <div className="lg:w-1/2 md:w-1/2 w-full h-full z-10 flex flex-col lg:items-start md:items-start items-center">
        <h1 className="text-h1 font-bold mb-6">{`Olá, ${username} :)`}</h1>
        {`${dayWeek}, ${todaysDate}`}
      </div>
      <div className="lg:w-1/2 md:w-1/2 w-full py-8 px-8 h-full flex-col flex items-center justify-center z-10">
        <div
          id="eye"
          className={`w-full flex items-center border-b-2 pb-[16px] ${
            isVisible ? "border-tertiary-400" : "border-primary-100"
          }`}
        >
          <span className="text-h2 font-bold mr-6">Saldo</span>
          <button onClick={toggleVisibility} className="focus:outline-none">
            <EyeIcon
              className={
                isVisible
                  ? "text-tertiary-400"
                  : "text-primary-100 hover:text-tertiary-400"
              }
            />
          </button>
        </div>
        <div id="conta" className="pt-[16px] self-start">
          Conta corrente
        </div>
        <div
          id="valor"
          className="pt-[8px] text-[31px] self-start whitespace-nowrap"
        >
          R$ {isVisible ? balance : "***"}
        </div>
      </div>
      <Image
        src="/Porquinho.png"
        alt=""
        width={250}
        height={250}
        className="lg:absolute md:absolute lg:bottom-[30px] md:bottom-[30px] lg:left-[60px] md:left-[60px] lg:mx-0 md:mx-0 mx-auto lg:mt-0 md:mt-0 mt-4"
      />
    </div>
  );
}
