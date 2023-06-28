import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { packsApi, PacksType, PackType } from "features/packs/packs.api";
import { ProfileType } from "features/auth/auth.api";

const getPacks = createAppAsyncThunk<{ packsItems: PacksType; cardPacksTotalCount: number }, any>(
  "packs/getPacks",
  async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await packsApi.getPacks(arg);

      return { packsItems: res.data.cardPacks, cardPacksTotalCount: res.data.cardPacksTotalCount };
    });
  }
);

const slice = createSlice({
  name: "packs",
  initialState: {
    packsItems: [] as PacksType,
    cardPacksTotalCount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.packsItems = action.payload.packsItems;
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount;
    });
  },
});

export const packsReducer = slice.reducer;
export const packsThunks = { getPacks };
const authActions = slice.actions;
