import { createSlice } from "@reduxjs/toolkit";
import { shallowEqual, useSelector } from "react-redux";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: { prices: [], prevPrices: {} },
  reducers: {
    updatePrices: (state, action) => {
      const newPrices = action.payload;
      const prev = {};
      state.prices.forEach((coin) => {
        prev[coin.symbol] = coin.price;
      });
      state.prevPrices = prev;
      state.prices = newPrices;
    },
  },
});

export const cryptoActions = cryptoSlice.actions;

export const selectPrices = (state) => state.crypto.prices;
export const useCryptoData = () =>
  useSelector(
    (state) => ({
      prices: state.crypto.prices,
      prevPrices: state.crypto.prevPrices,
    }),
    shallowEqual
  );

export default cryptoSlice;
