import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Set the base URL for Axios
axios.defaults.baseURL = 'http://localhost:3000';

const initialState = {
  reservations: [],
  status: "idle",
  error: null,
};

// Async Thunk for fetching all homes
export const fetchAllReservations = createAsyncThunk(
  "homes/fetchAllReservations",
  async () => {
    const response = await axios.get("/api/v1/reservations");
    return response.data;
  }
);

// Async Thunk for adding a new reservation
export const addReservations = createAsyncThunk(
  "homes/addReservations",
  async ({ reservation }) => {
    const response = await axios.post(
      "/api/v1/reservations",
      JSON.stringify(reservation),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  }
);

export const deleteReservations = createAsyncThunk(
  "homes/deleteReservations",
  async (reservationsId) => {
    await axios.delete(`/api/v1/homes/${reservationsId}`);
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
        state.reservations = action.payload;
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
        state.reservations.push(action.payload);
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
        state.reservations = state.reservations.filter(
          (reservation) => reservation.id !== action.payload
        );
      })
      .addCase(deleteReservations.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

export const { setStatus, setError } = reservationsSlice.actions;

export default reservationsSlice.reducer;
