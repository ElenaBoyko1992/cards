import { instance } from "common/api/common.api";

export const authApi = {
  register() {
    const payload = {
      email: "2Boyko@mail.ru",
      password: "1qazxcvBG",
    };
    return instance.post<RegisterResponseType>("auth/register", payload);
  },
  login(payload: ArgLoginType) {
    return instance.post<ProfileType>("/auth/login", payload);
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
