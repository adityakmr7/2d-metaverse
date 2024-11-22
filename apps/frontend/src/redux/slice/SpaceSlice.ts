import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance.ts";
import { ENDPOINT } from "@repo/utils/endpoints";
import {
  CreateSpaceRequest,
  CreateSpaceResponse,
  FetchAllSpaceResponse,
  IndividualSpaceRequest,
  IndividualSpaceResponse,
  SpaceState,
} from "@repo/utils/SpaceTypes";

// create new space
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

// get all spaces list
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

// get individual space
export const fetchIndividualSpace = createAsyncThunk<
  IndividualSpaceResponse,
  IndividualSpaceRequest
>("space/individual", async ({ spaceId }, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(
      `${ENDPOINT.INDIVIDUAL_SPACE}/${spaceId}`,
    );
    const data: IndividualSpaceResponse = await response.data;
    return data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

const initialState: SpaceState = {
  spaceId: null,
  loading: false,
  error: null,
  //
  loadingSpace: false,
  spaceList: [],
  spaceError: null,
  // individual space
  isLoadingIndividualSpace: true,
  individualSpaceData: null,
  individualSpaceError: null,
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
      })
      // fetch Individual space
      .addCase(
        fetchIndividualSpace.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoadingIndividualSpace = action.payload;
        },
      )
      .addCase(
        fetchIndividualSpace.fulfilled,
        (state, action: PayloadAction<IndividualSpaceResponse>) => {
          state.individualSpaceData = action.payload;
          state.isLoadingIndividualSpace = false;
        },
      )
      .addCase(fetchIndividualSpace.pending, (state) => {
        state.isLoadingIndividualSpace = true;
      });
  },
});

export default spaceSlice.reducer;
