"use client";

import { MainHeader } from "@/components/moleculas/main-header/MainHeader";
import { Balance } from "@/components/organisms/balance/Balance";
import { Invoice } from "@/components/organisms/invoice/Invoice";
import { Nav } from "@/components/organisms/nav/Nav";
import http from "@/http";
import { fetchBalance } from "@/store/slices/balanceSlice";
import { fetchTransactions } from "@/store/slices/transactionsSlice";
import { setUser } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user.user);
  const balance = useSelector((state: RootState) => state.balance.balance);
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  if (!user) {
    http
      .get("auth/profile")
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch((error) => {
        router.push("/");
        console.error("Usuário não encontrado", error);
      });
  }

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchBalance());
  }, [dispatch]);

  return (
    <main className="h-full w-full">
      <MainHeader user={user} />
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
