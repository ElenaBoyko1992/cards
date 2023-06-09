import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ArgChangeProfileData,
  ArgLoginType,
  ArgRegisterType,
  ArgSetNewPasswordType,
  authApi,
  ProfileType,
} from "features/auth/auth.api";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.register(arg);
  });
});

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authApi.login(arg);
    // toast.success("Вы успешно залогинились");
    return { profile: res.data };
  });
});

const forgotPassword = createAppAsyncThunk<{ email: string }, string>(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    await authApi.forgotPassword(email);
    return { email };
  }
);

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
    // return thunkTryCatch(thunkAPI, async () => {
    //   const res = await authApi.me();
    //   return { profile: res.data };
    // });
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      const res = await authApi.me();
      return { profile: res.data };
    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(authActions.setIsInitialized({ value: true }));
    }
  }
);

const logout = createAppAsyncThunk<void, void>("auth/logout", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    await authApi.logout();
  });
});

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isLoggedIn: false,
    isRegistered: false,
    changePasswordInstructionsWereSend: false,
    passwordWasChanged: false,
    emailForInstructions: "",
    isInitialized: false,
  },
  reducers: {
    setIsInitialized(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value;
    },
  },
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
        state.emailForInstructions = action.payload.email;
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
        state.isInitialized = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.profile = null;
      });
  },
});

export const authReducer = slice.reducer;
export const authThunks = { register, login, forgotPassword, setNewPassword, changeProfileData, initializeApp, logout };
const authActions = slice.actions;
