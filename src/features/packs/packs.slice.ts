import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { packsApi, PacksType, ReturnGetPacksType } from "features/packs/packs.api";

const getPacks = createAppAsyncThunk<{ packs: ReturnGetPacksType }, any>("packs/getPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.getPacks(arg);
    return { packs: res.data };
  });
});

const slice = createSlice({
  name: "packs",
  initialState: {
    packsItems: [] as PacksType,
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.packsItems = action.payload.packs.cardPacks;
      state.cardPacksTotalCount = action.payload.packs.cardPacksTotalCount;
      state.maxCardsCount = action.payload.packs.maxCardsCount;
      state.minCardsCount = action.payload.packs.minCardsCount;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsThunks = { getPacks };
const authActions = slice.actions;
