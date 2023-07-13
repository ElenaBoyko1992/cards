export function createData(
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
