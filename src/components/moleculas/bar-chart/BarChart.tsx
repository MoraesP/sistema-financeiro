/* eslint-disable indent */
"use client";

import { formatMonthYear } from "@/lib/shared-functions";
import { ITransaction } from "@/models/Transaction";
import { TransactionTypeValue } from "@/models/TransationType";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export type BarChartProps = {
  transactions: ITransaction[];
};

const getColorByType = (type: string): string => {
  switch (type) {
    case "saque":
      return "rgba(255, 99, 132, 1)";
    case "deposito":
      return "rgba(54, 162, 235, 1)";
    case "transferencia":
      return "rgba(75, 192, 192, 1)";
    default:
      return "rgba(75, 192, 192, 1)";
  }
};

const processarDados = (transactions: ITransaction[]) => {
  const dataByMonthType: Record<string, Record<string, number>> = {};

  transactions.forEach(({ value, type, createdAt }) => {
    const date = new Date(createdAt);
    const monthYear = formatMonthYear(date);

    if (!dataByMonthType[monthYear]) {
      dataByMonthType[monthYear] = {};
    }

    if (!dataByMonthType[monthYear][type]) {
      dataByMonthType[monthYear][type] = 0;
    }

    dataByMonthType[monthYear][type] += value;
  });

  const months = Object.keys(dataByMonthType).sort();
  const transactionTypesArray = Object.values(TransactionTypeValue);

  const datasets = transactionTypesArray.map((type) => ({
    label: type,
    data: months.map((month) => dataByMonthType[month][type] || 0),
    backgroundColor: getColorByType(type),
    borderColor: getColorByType(type),
    borderWidth: 1,
  }));

  return {
    labels: months.map((m) => m.replace("-", "/")),
    datasets,
  };
};

export default function BarChart({ transactions }: BarChartProps) {
  const data = processarDados(transactions);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      tooltip: { enabled: true },
    },
  };

  return <Bar data={data} options={options} />;
}
