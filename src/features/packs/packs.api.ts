import { instance } from "common/api";

export const packsApi = {
  getPacks(payload: ArgGetPacksType) {
    return instance.get<ReturnGetPacksType>("cards/pack", { params: payload });
  },
  createPack(payload: ArgCreatePackType) {
    return instance.post("cards/pack", { cardsPack: payload });
  },
  deletePack(payload: { id: string }) {
    return instance.delete("cards/pack", { params: payload });
  },
  editPack(payload: ArgEditPackType) {
    return instance.put("cards/pack", { cardsPack: payload });
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
export type ArgGetPacksType = {
  packName?: string;
  min?: number;
  max?: number;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
  block?: boolean;
};
export type ArgCreatePackType = {
  name?: string;
  deckCover?: string;
  private?: boolean;
};
export type ArgEditPackType = {
  name?: string;
  _id: string;
};
