import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { cardsApi, CardType, ReturnGetCardsType } from "features/cards/cards.api";

const getCards = createAppAsyncThunk<{ cards: ReturnGetCardsType }, { packId: string }>(
  "cards/getCards",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { searchCardsValue, sortCards, pageCards, rowsPerPageCards } = thunkAPI.getState().cards;
      const argForRequest = {
        cardQuestion: searchCardsValue,
        cardsPack_id: arg.packId,
        // min: valueForCardsSlider[0],
        // max: valueForCardsSlider[1],
        sortCards,
        page: pageCards,
        pageCount: rowsPerPageCards,
      };
      const res = await cardsApi.getCards(argForRequest);
      console.log(res);
      return { cards: res.data };
    });
  }
);

const slice = createSlice({
  name: "cards",
  initialState: {
    cardsItems: [] as CardType[],
    // valueForCardsSlider: [0, 0],
    sortCards: "",
    pageCards: 1,
    rowsPerPageCards: 5,
    cardsTotalCount: 0,
    searchCardsValue: "",
    questionSortIsActive: false,
    answerSortIsActive: false,
    updatedSortIsActive: false,
    gradeSortIsActive: false,
    orderBy: "asc" as "asc" | "desc",
    packName: "",
  },
  reducers: {
    setCardsPage(state, action: PayloadAction<{ pageNumber: number }>) {
      state.pageCards = action.payload.pageNumber;
    },
    setRowsCardsPerPage(state, action: PayloadAction<{ rowsPerPage: number }>) {
      state.rowsPerPageCards = action.payload.rowsPerPage;
      state.pageCards = 1;
    },
    sortCardsBy(state, action: PayloadAction<{ sortType: SortCardsTypeType }>) {
      state.questionSortIsActive = action.payload.sortType === "question";
      state.answerSortIsActive = action.payload.sortType === "answer";
      state.updatedSortIsActive = action.payload.sortType === "updated";
      state.gradeSortIsActive = action.payload.sortType === "grade";
      state.orderBy = state.orderBy === "asc" ? "desc" : "asc";
      state.sortCards = `${state.orderBy === "asc" ? "1" : "0"}${action.payload.sortType}`;
      state.pageCards = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cardsItems = action.payload.cards.cards;
      state.cardsTotalCount = action.payload.cards.cardsTotalCount;
      state.packName = action.payload.cards.packName;
    });
  },
});

export const cardsReducer = slice.reducer;
export const cardsThunks = { getCards };
export const { setCardsPage, setRowsCardsPerPage, sortCardsBy } = slice.actions;

//types
type SortCardsTypeType = "question" | "answer" | "updated" | "grade";
