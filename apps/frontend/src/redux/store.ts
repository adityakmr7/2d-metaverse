// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/AuthSlice.ts';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
