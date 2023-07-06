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
  },
  reducers: {
    setPageAction(state, action: PayloadAction<{ pageNumber: number }>) {
      state.page = action.payload.pageNumber;
    },
    setRowsPerPage(state, action: PayloadAction<{ rowsPerPage: number }>) {
      state.rowsPerPage = action.payload.rowsPerPage;
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
export const { setPageAction, setRowsPerPage } = slice.actions;
