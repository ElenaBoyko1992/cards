import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { ArgCreatePackType, packsApi, PacksType, ReturnGetPacksType } from "features/packs/packs.api";

const getPacks = createAppAsyncThunk<{ packs: ReturnGetPacksType }, void>("packs/getPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const { rowsPerPage, page, searchValue, userIdForShowingMyPacks, sortPacks, valueForSlider } =
      thunkAPI.getState().packs;
    const arg = {
      pageCount: rowsPerPage,
      page,
      packName: searchValue,
      user_id: userIdForShowingMyPacks,
      sortPacks,
      min: valueForSlider[0],
      max: valueForSlider[1],
    };
    const res = await packsApi.getPacks(arg);
    console.log(res);
    return { packs: res.data };
  });
});

const createPack = createAppAsyncThunk<void, ArgCreatePackType>("packs/createPack", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.createPack(arg);
    return;
  });
});

const deletePack = createAppAsyncThunk<void, { id: string }>("packs/deletePack", async (arg, thunkAPI) => {
  const { page, cardPacksTotalCount, rowsPerPage, packsItems } = thunkAPI.getState().packs;
  return thunkTryCatch(thunkAPI, async () => {
    await packsApi.deletePack(arg);
    const tablePaginationCount = Math.ceil(cardPacksTotalCount / rowsPerPage);
    if (page === tablePaginationCount && page > 1 && !(packsItems.length - 1)) {
      thunkAPI.dispatch(setPage({ pageNumber: page - 1 }));
    }
  });
});

const slice = createSlice({
  name: "packs",
  initialState: {
    packsItems: [] as PacksType,
    cardPacksTotalCount: 0,
    maxCardsCount: 78,
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
    valueForSlider: [0, 0],
  },
  reducers: {
    setPage(state, action: PayloadAction<{ pageNumber: number }>) {
      state.page = action.payload.pageNumber;
    },
    setRowsPerPage(state, action: PayloadAction<{ rowsPerPage: number }>) {
      state.rowsPerPage = action.payload.rowsPerPage;
      state.page = 1;
    },
    setSearchValue(state, action: PayloadAction<{ searchValue: string }>) {
      state.searchValue = action.payload.searchValue;
    },
    showPacksCardsById(state, action: PayloadAction<{ userIdForShowingMyPacks: string }>) {
      state.userIdForShowingMyPacks = action.payload.userIdForShowingMyPacks;
      state.valueForSlider = [0, 0];
    },
    sortBy(state, action: PayloadAction<{ sortType: SortTypeType }>) {
      state.nameSortIsActive = action.payload.sortType === "name";
      state.cardsCountSortIsActive = action.payload.sortType === "cardsCount";
      state.lastUpdatedSortIsActive = action.payload.sortType === "updated";
      state.createdSortIsActive = action.payload.sortType === "created";
      state.orderBy = state.orderBy === "asc" ? "desc" : "asc";
      state.sortPacks = `${state.orderBy === "asc" ? "1" : "0"}${action.payload.sortType}`;
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
      state.valueForSlider = [0, 0];
    },
    setValueForSlider(state, action: PayloadAction<{ value: Array<number> }>) {
      state.valueForSlider = [action.payload.value[0], action.payload.value[1]];
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
export const {
  setPage,
  setRowsPerPage,
  setSearchValue,
  showPacksCardsById,
  sortBy,
  removeAllFilters,
  setValueForSlider,
} = slice.actions;

//types
type SortTypeType = "name" | "cardsCount" | "updated" | "created";
