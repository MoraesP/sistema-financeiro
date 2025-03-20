import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import transactionsReducer from "./slices/transactionsSlice";
import balanceReducer from "./slices/balanceSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionsReducer,
    balance: balanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
