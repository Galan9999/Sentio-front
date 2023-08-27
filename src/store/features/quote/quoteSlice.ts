import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuoteStructure } from "../../../types";

const initialState: QuoteStructure = {
  id: "",
  owner: "",
  author: "",
  image: "",
  country: "",
  quote: "",
  tags: "",
  lived: "",
  backgroundInfo: "",
};

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    loadQuote: (
      currentQuoteState,
      { payload }: PayloadAction<QuoteStructure>
    ): QuoteStructure => ({ ...payload }),
  },
});

export const { loadQuote: loadQuoteActionCreator } = quoteSlice.actions;
export const quoteReducer = quoteSlice.reducer;
