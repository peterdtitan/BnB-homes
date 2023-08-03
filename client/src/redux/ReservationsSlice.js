// homesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  reservations: [],
  status: "idle",
  error: null,
};

// Async Thunk for fetching all homes
export const fetchAllReservations = createAsyncThunk(
  "homes/fetchAllHomes",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/reservations"
    );
    return response.data;
  }
);

// Async Thunk for adding a new reservations
export const addReservations = createAsyncThunk(
  "homes/addHome",
  async (reservationsData) => {
    const response = await axios.post(
      "http://127.0.0.1:3000/api/v1/reservations",
      reservationsData
    );
    return response.data;
  }
);

// Async Thunk for deleting a home
export const deleteReservations = createAsyncThunk(
  "homes/deleteHome",
  async (reservationsId) => {
    await axios.delete(`http://127.0.0.1:3000/api/v1/homes/${reservationsId}`);
    return reservationsId;
  }
);

const reservationsSlice = createSlice({
  name: "reservations",
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
      .addCase(fetchAllReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllReservations.fulfilled, (state, action) => {
        state.status = "idle";
        state.homes = action.payload;
      })
      .addCase(fetchAllReservations.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(addReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReservations.fulfilled, (state, action) => {
        state.status = "idle";
        state.homes.push(action.payload);
      })
      .addCase(addReservations.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(deleteReservations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteReservations.fulfilled, (state, action) => {
        state.status = "idle";
        state.homes = state.homes.filter((home) => home.id !== action.payload);
      })
      .addCase(deleteReservations.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

export const { setStatus, setError } = reservationsSlice.actions;

export default reservationsSlice.reducer;
