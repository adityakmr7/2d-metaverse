// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice.ts";
import spaceReducer from "./slice/SpaceSlice.ts";
import adminReducer from "./slice/AdminSlice.ts";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    space: spaceReducer,
    admin: adminReducer,
  },
  devTools: true,
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
