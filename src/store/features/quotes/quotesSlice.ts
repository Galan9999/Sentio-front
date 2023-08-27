import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuotesStructure } from "../../../types";

const initialState: QuotesStructure = [
  {
    id: "",
    owner: "",
    author: "",
    image: "",
    country: "",
    quote: "",
    tags: "",
    lived: "",
    backgroundInfo: "",
  },
];

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    loadQuotes: (
      currentQuoteState,
      { payload }: PayloadAction<QuotesStructure>
    ): QuotesStructure => [...payload],
    deleteQuoteById: (currentQuoteState, { payload }: PayloadAction<string>) =>
      currentQuoteState.filter((quote) => quote.id !== payload),
  },
});

export const {
  loadQuotes: loadQuotesActionCreator,
  deleteQuoteById: deleteQuoteByIdActionCreator,
} = quotesSlice.actions;
export const quotesReducer = quotesSlice.reducer;
