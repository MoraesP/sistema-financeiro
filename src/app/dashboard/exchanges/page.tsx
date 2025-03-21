"use client";

import BarChart from "@/components/moleculas/bar-chart/BarChart";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function Exchanges() {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  return (
    <div
      className="bg-gray-200
                    rounded-lg
                    px-6 py-6
                    overflow-scroll
    "
    >
      <h1 className="text-xl font-bold mb-4">Gráfico de transações por mês</h1>
      <BarChart transactions={transactions} />
    </div>
  );
}
