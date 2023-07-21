import { instance } from "common/api";
import { ArgCreatePackType } from "features/packs/packs.api";

export const cardsApi = {
  getCards(payload: ArgGetCardsType) {
    return instance.get<ReturnGetCardsType>("cards/card", { params: payload });
  },
  createCard(payload: ArgCreateCardType) {
    return instance.post("cards/card", { card: payload });
  },
};

//types
type ArgGetCardsType = {
  cardAnswer?: string;
  cardQuestion?: string;
  cardsPack_id: string;
  min?: number;
  max?: number;
  sortCards?: string;
  page?: number;
  pageCount?: number;
};
export type CardType = {
  answer: string;
  answerImg: string;
  answerVideo: string;
  cardsPack_id: string;
  comments: string;
  created: string;
  grade: number;
  more_id: string;
  question: string;
  questionImg: string;
  questionVideo: string;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  __v: number;
  _id: string;
};
export type ReturnGetCardsType = {
  cards: CardType[];
  cardsTotalCount: number;
  maxGrade: number;
  minGrade: number;
  packCreated: string;
  packDeckCover: any;
  packName: string;
  packPrivate: boolean;
  packUpdated: string;
  packUserId: string;
  page: number;
  pageCount: number;
  token: string;
  tokenDeathTime: number;
};
export type ArgCreateCardType = {
  cardsPack_id: string;
  question?: string;
  answer?: string;
  grade?: number;
  shots?: number;
  answerImg?: string;
  questionImg?: string;
  questionVideo?: string;
  answerVideo?: string;
};
