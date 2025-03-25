export interface TransactionType {
  value: TransactionTypeValue | null;
  display: string;
}

export enum TransactionTypeValue {
  SAQUE = "saque",
  DEPOSITO = "deposito",
  TRANSFERENCIA = "transferencia",
  TODAS = "todas",
}
