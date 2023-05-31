import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";
import { instance } from "common/api/common.api";

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg, thunkAPI) => {
  await authApi.register(arg);
});

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
  const res = await authApi.login(arg);
  return { profile: res.data };
});

const forgotPassword = createAppAsyncThunk<void, string>("auth/forgotPassword", async (email, thunkAPI) => {
  await authApi.forgotPassword(email);
});

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isLoggedIn: false,
    isRegistered: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isLoggedIn = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isRegistered = true;
      });
  },
});

export const authReducer = slice.reducer;
export const authThunks = { register, login, forgotPassword };
const authActions = slice.actions;
