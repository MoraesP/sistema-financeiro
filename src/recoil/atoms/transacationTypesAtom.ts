import { atom } from "recoil";

export const transactionTypesState = atom<string[]>({
  key: "transactionTypesState",
  default: ["Saque", "Depósito", "Transferência"],
});
