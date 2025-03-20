import { DBTransaction } from "@/models/Transaction";
import { atom } from "recoil";

export const transactionsState = atom<DBTransaction[]>({
  key: "transacations",
  default: [],
});
