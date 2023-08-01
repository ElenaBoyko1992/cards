import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { ArgCreateCardType, ArgEditCardType, cardsApi, CardType, ReturnGetCardsType } from "features/cards/cards.api";
import { ArgCreatePackType, packsApi } from "features/packs/packs.api";
import { setPage } from "features/packs/packs.slice";

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

const createCard = createAppAsyncThunk<void, ArgCreateCardType>("cards/createCard", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await cardsApi.createCard(arg);
    return;
  });
});

const deleteCard = createAppAsyncThunk<void, { id: string }>("cards/deleteCard", async (arg, thunkAPI) => {
  const { pageCards, cardsTotalCount, rowsPerPageCards, cardsItems } = thunkAPI.getState().cards;
  return thunkTryCatch(thunkAPI, async () => {
    await cardsApi.deleteCard(arg);
    const tablePaginationCount = Math.ceil(cardsTotalCount / rowsPerPageCards);
    if (pageCards === tablePaginationCount && pageCards > 1 && !(cardsItems.length - 1)) {
      thunkAPI.dispatch(setCardsPage({ pageNumber: pageCards - 1 }));
    }
  });
});

const editCard = createAppAsyncThunk<void, ArgEditCardType>("cards/editCard", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await cardsApi.editCard(arg);
    return;
  });
});

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
    packUserId: "",
    cardsPackId: null as null | string,
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
    setSearchCardsValue(state, action: PayloadAction<{ searchValue: string }>) {
      state.searchCardsValue = action.payload.searchValue;
    },
    setCardsPackId(state, action: PayloadAction<{ packId: string | null }>) {
      state.cardsPackId = action.payload.packId;
    },
    cleanPacks(state, action: PayloadAction<void>) {
      state.cardsItems = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCards.fulfilled, (state, action) => {
      state.cardsItems = action.payload.cards.cards;
      state.cardsTotalCount = action.payload.cards.cardsTotalCount;
      state.packName = action.payload.cards.packName;
      state.packUserId = action.payload.cards.packUserId;
    });
    builder.addCase(createCard.fulfilled, (state, action) => {
      state.pageCards = 1;
    });
  },
});

export const cardsReducer = slice.reducer;
export const cardsThunks = { getCards, createCard, deleteCard, editCard };
export const { setCardsPage, setRowsCardsPerPage, sortCardsBy, setSearchCardsValue, setCardsPackId, cleanPacks } =
  slice.actions;

//types
type SortCardsTypeType = "question" | "answer" | "updated" | "grade";
