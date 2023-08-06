// store.js
import { configureStore } from "@reduxjs/toolkit";
import homesReducer from "./homesSlice";
import reservationReducer from "./ReservationsSlice";
import userSlice from "./user/userSlice";

const store = configureStore({
  reducer: {
    homes: homesReducer,
    reservations: reservationReducer,
    user: userSlice
  },
});

export default store;
