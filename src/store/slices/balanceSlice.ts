import http from "@/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchBalance = createAsyncThunk("fetchBalance", async () => {
  const response = await http.get<{ balance: number }>("transactions/balance");
  return response.data.balance;
});

interface BalanceState {
  balance: number;
}

const initialState: BalanceState = {
  balance: 0,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBalance.fulfilled, (state, action) => {
      state.balance = action.payload;
    });
  },
});

export default balanceSlice.reducer;
