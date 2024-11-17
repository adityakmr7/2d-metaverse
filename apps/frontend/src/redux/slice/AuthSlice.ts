// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ENDPOINT } from "@/api/endpoints.ts";
import axiosInstance from "../../../utils/axiosInstance.ts";
import {
  AuthState,
  SignInCredentials,
  SignInResponse,
  SignUpCredentials,
  SignUpResponse,
} from "@/redux/slice/types/AuthTypes.ts";

// Initial state
const initialState: AuthState = {
  userId: null,
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for login
export const signup = createAsyncThunk<SignUpResponse, SignUpCredentials>(
  "auth/signup",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ENDPOINT.SIGN_UP, {
        username: credentials.email,
        password: credentials.password,
        type: credentials.type,
      });

      const data: SignUpResponse = await response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for login
export const signin = createAsyncThunk<SignInResponse, SignInCredentials>(
  "auth/signin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ENDPOINT.SIGN_IN, {
        username: credentials.email,
        password: credentials.password,
      });
      const data: SignInResponse = await response.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice for authentication
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signup.fulfilled,
        (state, action: PayloadAction<SignUpResponse>) => {
          state.loading = false;
          state.userId = action.payload.userId;
        },
      )
      .addCase(signup.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signin.fulfilled,
        (state, action: PayloadAction<SignInResponse>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("token", action.payload.token);
        },
      )
      .addCase(signin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
