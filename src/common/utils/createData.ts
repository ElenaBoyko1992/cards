export function createData(
  name: string,
  cardsCount: number,
  updated: string,
  created: string,
  packId: string,
  userId: string
) {
  return { name, cardsCount, updated, created, packId, userId };
}
