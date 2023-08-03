// store.js
import { configureStore } from "@reduxjs/toolkit";
import homesReducer from "./homesSlice";
import reservationReducer from "./ReservationsSlice";

const store = configureStore({
  reducer: {
    homes: homesReducer,
    reservations: reservationReducer,
  },
});

export default store;
