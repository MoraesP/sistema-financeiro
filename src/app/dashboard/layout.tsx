"use client";

import { MainHeader } from "@/components/moleculas/main-header/MainHeader";
import { Balance } from "@/components/organisms/balance/Balance";
import { Invoice } from "@/components/organisms/invoice/Invoice";
import { Nav } from "@/components/organisms/nav/Nav";
import http from "@/http";
import { DBTransaction, ITransaction } from "@/models/Transaction";
import { RootState, setUser } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [balance, setBalance] = useState<number>(0);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user.user);

  if (!user) {
    http
      .get("auth/profile")
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch((error) => {
        console.error("Usuário não encontrado", error);
      });
  }

  function fetchTransactions() {
    http
      .get("transactions")
      .then((response) => {
        setTransactions(
          response.data.map((transaction: DBTransaction) => {
            return {
              id: transaction._id,
              type: transaction.type,
              value: transaction.value,
              createdAt: new Date(transaction.createdAt),
            };
          })
        );
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao buscar as transações", error);
      });
  }

  function fetchBalance() {
    http
      .get("transactions/balance")
      .then((response) => {
        setBalance(response.data.balance);
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao buscar o saldo", error);
      });
  }

  useEffect(() => {
    fetchTransactions();
    fetchBalance();
  }, []);

  return (
    <main className="h-full w-full">
      <MainHeader />
      <div className="grid gap-6 mt-6 place-self-center lg:grid-cols-[180px_1fr_280px] lg:max-w-[1320px] w-full lg:px-[60px] md:px-[60px] px-6">
        <Nav />
        <div className="grid gap-y-6 w-full">
          <Balance username={user?.name ?? ""} balance={balance} />
          {children}
        </div>
        <Invoice transactions={transactions} />
      </div>
    </main>
  );
}
