import { AppDispatch, RootState } from "app/store";
import { appActions } from "app/app.slice";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AxiosError, isAxiosError } from "axios";

export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, null>, logic: Function) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setIsLoading({ isLoading: true }));
  try {
    const res = await logic();
    dispatch(appActions.setIsLoading({ isLoading: false }));
    return res;
  } catch (e) {
    const err = e as Error | AxiosError<{ error: string }>;
    if (isAxiosError(err)) {
      const error = err.response ? err.response.data.error : err.message;
      dispatch(appActions.setAppError({ error }));
    } else {
      dispatch(appActions.setAppError({ error: `Native error ${err.message}` }));
    }
    dispatch(appActions.setIsLoading({ isLoading: false }));
    return rejectWithValue(null);
  }
};
