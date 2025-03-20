import http from "@/http";
import { DBTransaction, ITransaction } from "@/models/Transaction";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBalance } from "./balanceSlice";

// Async thunk para buscar transações do backend
export const fetchTransactions = createAsyncThunk(
  "fetchTransactions",
  async () => {
    const response = await http.get<DBTransaction[]>("transactions");
    return response.data.map((transaction) => ({
      id: transaction._id,
      type: transaction.type,
      value: transaction.value,
      createdAt: new Date(transaction.createdAt).toISOString(),
    })) as ITransaction[];
  }
);

// Async thunk para criar uma nova transação e buscar a lista atualizada
export const addTransaction = createAsyncThunk(
  "addTransaction",
  async ({ type, value }: { type: string; value: number }, { dispatch }) => {
    await http.post("transactions", { type, value });
    dispatch(fetchTransactions());
    dispatch(fetchBalance()); // Atualiza a lista após adicionar
  }
);

interface TransactionsState {
  transactions: ITransaction[];
}

const initialState: TransactionsState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
    });
  },
});

export default transactionsSlice.reducer;
