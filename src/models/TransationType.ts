export interface TransactionType {
  value: string | null;
  display: string;
}

export enum TransactionTypeValue {
  SAQUE = "saque",
  DEPOSITO = "deposito",
  TRANSFERENCIA = "transferencia",
}

export enum TransactionTypeFilterValue {
  SAQUE = "saque",
  DEPOSITO = "deposito",
  TRANSFERENCIA = "transferencia",
  TODAS = "todas",
}
