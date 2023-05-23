import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ArgRegisterType, authApi } from "features/auth/auth.api";

const register = createAsyncThunk<void, ArgRegisterType>("auth/register", (arg, thunkAPI) => {
  authApi.register().then((res) => {
    debugger;
  });
});

const slice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
});

export const authReducer = slice.reducer;
export const authThunks = { register };
