// store.js
import { configureStore } from "@reduxjs/toolkit";
import homesReducer from "./homesSlice";

const store = configureStore({
  reducer: {
    homes: homesReducer,
  },
});

export default store;
