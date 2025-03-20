export interface TransactionType {
  value: TransactionTypeValue | null;
  display: string;
}

enum TransactionTypeValue {
  SAQUE = "saque",
  DEPOSITO = "deposito",
  TRANSFERENCIA = "transferencia",
}
