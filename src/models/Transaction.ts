export interface ITransaction {
  id: string;
  value: number;
  type: string;
  createdAt: Date;
}

export interface DBTransaction {
  _id: string;
  value: number;
  type: string;
  createdAt: string;
}
