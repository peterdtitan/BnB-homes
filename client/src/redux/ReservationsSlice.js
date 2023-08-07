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
  "homes/fetchAllReservations",
  async () => {
    const response = await axios.get(
      "http://127.0.0.1:3000/api/v1/reservations"
    );
    return response.data;
  }
);

// Async Thunk for adding a new reservations
export const addReservations = createAsyncThunk(
  "homes/addReservations",
  async ({reservationsData}) => {
    const response = await axios.post(
      "http://127.0.0.1:3000/api/v1/reservations",
      reservationsData,
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
        state.reservations = state.reservations.filter((reservation) => reservation.id !== action.payload);
      })
      .addCase(deleteReservations.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      });
  },
});

export const { setStatus, setError } = reservationsSlice.actions;

export default reservationsSlice.reducer;
