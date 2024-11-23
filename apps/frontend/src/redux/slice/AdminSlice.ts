import {
  AdminState,
  CreateMapRequest,
  CreateMapResponse,
  CreateNewElementRequest,
  CreateNewElementResponse,
  ElementResponse,
  MapResponse,
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

// Get all elements
export const getAllElement = createAsyncThunk<ElementResponse>(
  "admin/elements/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/elements/all");
      const data: ElementResponse = await response.data;
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const getAllMap = createAsyncThunk<MapResponse>(
  "admin/map/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/map/all");
      const data: MapResponse = await response.data;
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
  isElementListLoading: false,
  elementList: null,
  elementError: null,
  isMapListLoading: false,
  mapList: null,
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
      })
      // GET ALL ELEMENT
      .addCase(getAllElement.pending, (state) => {
        state.isElementListLoading = true;
      })
      .addCase(
        getAllElement.fulfilled,
        (state, action: PayloadAction<ElementResponse>) => {
          state.elementList = action.payload;
          state.isElementListLoading = false;
        },
      )
      .addCase(getAllElement.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      // ALL MAPS
      .addCase(getAllMap.pending, (state) => {
        state.isMapListLoading = true;
      })
      .addCase(
        getAllMap.fulfilled,
        (state, action: PayloadAction<MapResponse>) => {
          state.mapList = action?.payload;
          state.isMapListLoading = false;
        },
      )
      .addCase(getAllMap.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export default AdminSlice.reducer;
