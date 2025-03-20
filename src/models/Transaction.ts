export interface ITransaction {
  id: string;
  value: number;
  type: string;
  createdAt: string;
}

export interface DBTransaction {
  _id: string;
  value: number;
  type: string;
  createdAt: string;
}
