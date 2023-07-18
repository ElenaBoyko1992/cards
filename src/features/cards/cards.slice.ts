import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { cardsApi } from "features/cards/cards.api";

const getCards = createAppAsyncThunk<any, any>("cards/getCards", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { cardSearchByQuestion, sortCards, valueForCardsSlider, pageCards, rowsPerPageCards } =
      thunkAPI.getState().cards;
    const argForRequest = {
      cardQuestion: cardSearchByQuestion,
      cardsPack_id: arg.packId,
      min: valueForCardsSlider[0],
      max: valueForCardsSlider[1],
      sortCards,
      page: pageCards,
      pageCount: rowsPerPageCards,
    };
    const res = await cardsApi.getCards(argForRequest);
    console.log(res);
    return { cards: res.data };
  });
});

const slice = createSlice({
  name: "cards",
  initialState: {
    cardSearchByQuestion: "",
    valueForCardsSlider: [0, 0],
    sortCards: "",
    pageCards: 1,
    rowsPerPageCards: 5,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export const cardsReducer = slice.reducer;
export const cardsThunks = { getCards };
export const {} = slice.actions;

//types
