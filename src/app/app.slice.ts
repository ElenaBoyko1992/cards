import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";

export const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isLoading: false,
    isAppInitialized: false,
  },
  reducers: {
    // setIsLoading(state, action: PayloadAction<{ isLoading: boolean }>) {
    //   state.isLoading = action.payload.isLoading;
    // },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        // 1 параметр - функция предикат
        (action) => {
          return action.type.endsWith("/pending");
        },
        // 2 параметр - reducer
        (state, action) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        // 1 параметр - функция предикат
        (action) => {
          return action.type.endsWith("/rejected");
        },
        // 2 параметр - reducer
        (state, action) => {
          const err = action.payload as Error | AxiosError<{ error: string }>;
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message;
          } else {
            state.error = `Native error ${err.message}`;
          }
          state.isLoading = false;
        }
      )
      .addMatcher(
        // 1 параметр - функция предикат
        (action) => {
          return action.type.endsWith("/fulfilled");
        },
        // 2 параметр - reducer
        (state, action) => {
          state.isLoading = false;
        }
      )
      .addDefaultCase((state, action) => {
        // console.log("addDefaultCase 🚀", action.type);
      });
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
