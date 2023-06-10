import { createSlice } from "@reduxjs/toolkit";
import {
  ArgChangeProfileData,
  ArgLoginType,
  ArgRegisterType,
  ArgSetNewPasswordType,
  authApi,
  ProfileType,
} from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";

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

const setNewPassword = createAppAsyncThunk<void, ArgSetNewPasswordType>(
  "auth/setNewPassword",
  async (arg, thunkAPI) => {
    await authApi.setNewPassword(arg);
  }
);

const changeProfileData = createAppAsyncThunk<{ profile: ProfileType }, ArgChangeProfileData>(
  "auth/changeProfileData",
  async (arg, thunkAPI) => {
    const res = await authApi.changeProfileData(arg);
    return { profile: res.data.updatedUser };
  }
);

const initializeApp = createAppAsyncThunk<{ profile: ProfileType }, void>(
  "auth/initializeApp",
  async (arg, thunkAPI) => {
    const res = await authApi.me();
    return { profile: res.data };
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isLoggedIn: false,
    isRegistered: false,
    changePasswordInstructionsWereSend: false,
    passwordWasChanged: false,
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
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.changePasswordInstructionsWereSend = true;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.passwordWasChanged = true;
      })
      .addCase(changeProfileData.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
        state.isLoggedIn = true;
      });
  },
});

export const authReducer = slice.reducer;
export const authThunks = { register, login, forgotPassword, setNewPassword, changeProfileData, initializeApp };
const authActions = slice.actions;
