// src/store/store.ts

import { User } from "@/models/User";
import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Definindo um exemplo de slice de estado (você pode modificar conforme necessário)
const initialState = {
  user: null as User | null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;