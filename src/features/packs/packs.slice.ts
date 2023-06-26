import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { packsApi, PacksType, PackType } from "features/packs/packs.api";
import { ProfileType } from "features/auth/auth.api";

const getPacks = createAppAsyncThunk<{ packsItems: PacksType }, any>("packs/getPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.getPacks(arg);

    return { packsItems: res.data.cardPacks };
  });
});

const slice = createSlice({
  name: "packs",
  initialState: {
    packsItems: [] as PacksType,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.packsItems = action.payload.packsItems;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsThunks = { getPacks };
const authActions = slice.actions;
