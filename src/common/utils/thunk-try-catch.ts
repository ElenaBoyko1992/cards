import { AppDispatch, RootState } from "app/store";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>, logic: Function) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    // dispatch(appActions.setIsLoading({ isLoading: true }));
    const res = await logic();
    return res;
  } catch (e) {
    return rejectWithValue(e);
  }
};
