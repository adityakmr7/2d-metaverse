import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance.ts";
import { ENDPOINT } from "@/api/endpoints.ts";

interface CreateSpaceRequest {
  name: string;
  dimensions: string;
}
interface CreateSpaceResponse {
  spaceId: string;
}

interface SpaceState {
  spaceId: string | null;
  loading: boolean;
  error: string | null;
  loadingSpace: boolean;
  spaceList: Space[] | [];
  spaceError: string | null;
}

export const createSpace = createAsyncThunk<
  CreateSpaceResponse,
  CreateSpaceRequest
>("space/create", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post(ENDPOINT.CREATE_SPACE, {
      name: payload.name,
      dimensions: payload.dimensions,
    });
    const data: CreateSpaceResponse = await response.data;
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});
interface Space {
  id: string;
  name: string;
  thumbnail: string | null;
  dimensions: string;
}
interface FetchAllSpaceResponse {
  spaces: Space[];
}

export const fetchAllSpace = createAsyncThunk<FetchAllSpaceResponse>(
  "space/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(ENDPOINT.ALL_SPACE);
      const data: FetchAllSpaceResponse = await response.data;
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

const initialState: SpaceState = {
  spaceId: null,
  loading: false,
  error: null,
  loadingSpace: false,
  spaceList: [],
  spaceError: null,
};

const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSpace.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createSpace.fulfilled,
        (state, action: PayloadAction<CreateSpaceResponse>) => {
          state.loading = false;
          state.spaceId = action.payload.spaceId;
        },
      )
      .addCase(createSpace.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(fetchAllSpace.pending, (state) => {
        state.loadingSpace = true;
      })
      .addCase(
        fetchAllSpace.fulfilled,
        (state, action: PayloadAction<FetchAllSpaceResponse>) => {
          state.spaceList = action.payload.spaces;
          state.loadingSpace = false;
        },
      )
      .addCase(fetchAllSpace.rejected, (state, action: PayloadAction<any>) => {
        state.spaceError = action.payload;
        state.loadingSpace = false;
      });
  },
});

export default spaceSlice.reducer;