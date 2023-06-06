import { forgotPasswordInstance, instance } from "common/api/common.api";

export const authApi = {
  register(payload: ArgRegisterType) {
    return instance.post<RegisterResponseType>("auth/register", payload);
  },
  login(payload: ArgLoginType) {
    return instance.post<ProfileType>("auth/login", payload);
  },
  forgotPassword(email: string) {
    const payload = {
      email, // кому восстанавливать пароль
      from: "", //необязательный параметр
      message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`,
    };

    return forgotPasswordInstance.post<ForgotPasswordResponseType>("auth/forgot", payload);
  },
  setNewPassword(payload: ArgSetNewPasswordType) {
    return forgotPasswordInstance.post<SetNewPasswordResponseType>("/auth/set-new-password", payload);
  },
};

//types
export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ArgRegisterType = Omit<ArgLoginType, "rememberMe">;

export type RegisterResponseType = {
  addedUser: Omit<ProfileType, "token" | "tokenDeathTime">;
};

export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};

type ForgotPasswordResponseType = {
  info: string;
  answer: boolean;
  html: boolean;
  success: boolean;
  error: string;
};

export type ArgSetNewPasswordType = {
  password: string;
  resetPasswordToken: string;
};

type SetNewPasswordResponseType = {
  info: string;
  error: string;
};
