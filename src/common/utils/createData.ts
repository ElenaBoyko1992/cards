export function createDataForPacksTable(
  name: string,
  cardsCount: number,
  updatedDate: string,
  created: string,
  packId: string,
  userId: string
) {
  const updated = updatedDate.slice(0, 10).split("-").reverse().join(".");
  return { name, cardsCount, updated, created, packId, userId };
}

export function createDataForCardsTable(
  question: string,
  answer: string,
  updatedDate: string,
  grade: number,
  cardId: string
) {
  const updated = updatedDate.slice(0, 10).split("-").reverse().join(".");
  return { question, answer, updated, grade, cardId };
}
