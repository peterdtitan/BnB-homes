// homesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  homes: [],
  status: "idle",
  error: null,
  singleHome: null,
};

// Async Thunk for fetching all homes
export const fetchAllHomes = createAsyncThunk(
  "homes/fetchAllHomes",
  async () => {
    const response = await axios.get("http://127.0.0.1:3000/api/v1/homes");
    return response.data;
  }
);

// Async Thunk for adding a new home
export const addHome = createAsyncThunk("homes/addHome", async (homeData) => {
  const response = await axios.post(
    "http://127.0.0.1:3000/api/v1/homes",
    homeData
  );
  return response.data;
});

// Async Thunk for deleting a home
export const deleteHome = createAsyncThunk(
  "homes/deleteHome",
  async (homeId) => {
    await axios.delete(`http://127.0.0.1:3000/api/v1/homes/${homeId}`);
    return homeId;
  }
);

// Async Thunk for fetching a single home
export const showSingleHome = createAsyncThunk(
  "homes/showSingleHome",
  async (homeId) => {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/v1/homes/${homeId}`
    );
    return response.data;
  }
);

const homesSlice = createSlice({
  name: "homes",
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllHomes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllHomes.fulfilled, (state, action) => {
        state.status = "idle";
        state.homes = action.payload;
      })
      .addCase(fetchAllHomes.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(addHome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addHome.fulfilled, (state, action) => {
        state.status = "idle";
        state.homes.push(action.payload);
      })
      .addCase(addHome.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(deleteHome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteHome.fulfilled, (state, action) => {
        state.status = "idle";
        state.homes = state.homes.filter((home) => home.id !== action.payload);
      })
      .addCase(deleteHome.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(showSingleHome.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showSingleHome.fulfilled, (state, action) => {
        state.status = "idle";
        state.singleHome = action.payload;
      })
      .addCase(showSingleHome.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

export const { setStatus, setError } = homesSlice.actions;

export default homesSlice.reducer;
