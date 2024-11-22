import {
  AdminState,
  CreateMapRequest,
  CreateMapResponse,
  CreateNewElementRequest,
  CreateNewElementResponse,
  UpdateElementRequest,
  UpdateElementResponse,
} from "@repo/utils/adminTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance.ts";

// admin create new element
export const createElement = createAsyncThunk<
  CreateNewElementResponse,
  CreateNewElementRequest
>("admin/element", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/admin/element", payload);
    const data: CreateNewElementResponse = await response.data;
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

// update existing element
export const updateElement = createAsyncThunk<
  UpdateElementResponse,
  UpdateElementRequest
>("admin/element/update", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.put("/admin/element", payload);
    const data: CreateNewElementResponse = await response.data;
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export const createMap = createAsyncThunk<CreateMapResponse, CreateMapRequest>(
  "admin/map",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/admin/map", payload);
      const data: CreateNewElementResponse = await response.data;
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const initialState: AdminState = {
  isCreateElementLoading: false,
  error: null,
  isUpdateElementLoading: false,
  isCreateMapLoading: false,
};

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createElement.pending, (state) => {
        state.isCreateElementLoading = true;
      })
      .addCase(createElement.fulfilled, (state) => {
        state.isCreateElementLoading = false;
      })
      .addCase(createElement.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      // Update element
      .addCase(updateElement.pending, (state) => {
        state.isUpdateElementLoading = true;
      })
      .addCase(updateElement.fulfilled, (state) => {
        state.isUpdateElementLoading = false;
      })
      .addCase(updateElement.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      // MAP
      .addCase(createMap.pending, (state) => {
        state.isCreateMapLoading = true;
      })
      .addCase(createMap.fulfilled, (state) => {
        state.isCreateMapLoading = false;
      })
      .addCase(createMap.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export default AdminSlice.reducer;
