import { instance } from "common/api";

export const packsApi = {
  getPacks(payload: any) {
    return instance.get<ReturnGetPacksType>("cards/pack", { params: payload });
  },
};

//types
export type PackType = {
  cardsCount: number;
  created: string;
  deckCover: boolean;
  grade: number;
  more_id: string;
  name: string;
  path: string;
  private: boolean;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  user_name: string;
  __v: number;
  _id: string;
};
export type PacksType = PackType[];
export type ReturnGetPacksType = {
  cardPacks: PacksType;
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};
