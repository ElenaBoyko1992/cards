import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { ArgCreatePackType, ArgGetPacksType, packsApi, PacksType, ReturnGetPacksType } from "features/packs/packs.api";

const getPacks = createAppAsyncThunk<{ packs: ReturnGetPacksType }, ArgGetPacksType>(
  "packs/getPacks",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.getPacks(arg);
      return { packs: res.data };
    });
  }
);

const createPack = createAppAsyncThunk<void, ArgCreatePackType>("packs/createPack", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.createPack(arg);
    const rowsPerPage = thunkAPI.getState().packs.rowsPerPage;
    thunkAPI.dispatch(getPacks({ pageCount: rowsPerPage }));
    return;
  });
});

const deletePack = createAppAsyncThunk<void, { id: string }>("packs/deletePack", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.deletePack(arg);
    const rowsPerPage = thunkAPI.getState().packs.rowsPerPage;
    thunkAPI.dispatch(getPacks({ pageCount: rowsPerPage }));
  });
});

const slice = createSlice({
  name: "packs",
  initialState: {
    packsItems: [] as PacksType,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    rowsPerPage: 5,
    searchValue: "",
    userIdForShowingMyPacks: "",
    nameSortIsActive: false,
    cardsCountSortIsActive: false,
    lastUpdatedSortIsActive: false,
    createdSortIsActive: false,
    orderBy: "asc" as "asc" | "desc",
    sortPacks: "",
  },
  reducers: {
    setPageAction(state, action: PayloadAction<{ pageNumber: number }>) {
      state.page = action.payload.pageNumber;
    },
    setRowsPerPage(state, action: PayloadAction<{ rowsPerPage: number }>) {
      state.rowsPerPage = action.payload.rowsPerPage;
    },
    setSearchValue(state, action: PayloadAction<{ searchValue: string }>) {
      state.searchValue = action.payload.searchValue;
    },
    setUserIdForShowingMyPacks(state, action: PayloadAction<{ userIdForShowingMyPacks: string }>) {
      state.userIdForShowingMyPacks = action.payload.userIdForShowingMyPacks;
    },
    sortBy(state, action: PayloadAction<{ sortType: SortTypeType }>) {
      state.nameSortIsActive = action.payload.sortType === "name";
      state.cardsCountSortIsActive = action.payload.sortType === "cardsCount";
      state.lastUpdatedSortIsActive = action.payload.sortType === "updated";
      state.createdSortIsActive = action.payload.sortType === "created";
      state.orderBy = state.orderBy === "asc" ? "desc" : "asc";
      state.sortPacks = `${state.orderBy === "asc" ? "0" : "1"}${action.payload.sortType}`;
      state.page = 1;
    },
    removeAllFilters(state, action: PayloadAction<void>) {
      state.searchValue = "";
      state.userIdForShowingMyPacks = "";
      state.nameSortIsActive = false;
      state.cardsCountSortIsActive = false;
      state.lastUpdatedSortIsActive = false;
      state.createdSortIsActive = false;
      state.sortPacks = "";
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.packsItems = action.payload.packs.cardPacks;
      state.cardPacksTotalCount = action.payload.packs.cardPacksTotalCount;
      state.maxCardsCount = action.payload.packs.maxCardsCount;
      state.minCardsCount = action.payload.packs.minCardsCount;
    });
    builder.addCase(createPack.fulfilled, (state, action) => {
      state.page = 1;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsThunks = { getPacks, createPack, deletePack };
export const { setPageAction, setRowsPerPage, setSearchValue, setUserIdForShowingMyPacks, sortBy, removeAllFilters } =
  slice.actions;

//types
type SortTypeType = "name" | "cardsCount" | "updated" | "created";
