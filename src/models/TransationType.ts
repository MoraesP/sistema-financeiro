export interface TransactionType {
  value: TransactionTypeValue;
  display: string;
}

enum TransactionTypeValue {
  SAQUE = "saque",
  DEPOSITO = "deposito",
  TRANSFERENCIA = "transferencia",
}
