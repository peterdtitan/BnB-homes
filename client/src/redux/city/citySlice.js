import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiBaseUrl = 'http://127.0.0.1:3000/api/v1';

export const fetchCityData = createAsyncThunk('city/fetchCityData', async () => {
  const response = await fetch(`${apiBaseUrl}/city`);
  const data = await response.json();
  return data;
});

const citySlice = createSlice({
  name: 'city',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCityData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCityData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export default citySlice.reducer;
