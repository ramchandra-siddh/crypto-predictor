import { configureStore } from "@reduxjs/toolkit";
import cryptoSlice from "./cryptoSlice";

const myStore = configureStore({
  reducer: {
    crypto: cryptoSlice.reducer,
  },
});

export default myStore;
