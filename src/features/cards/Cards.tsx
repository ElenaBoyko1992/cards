import React from "react";
import { packsThunks } from "features/packs/packs.slice";
import { useAppDispatch } from "common/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { useParams } from "react-router-dom";

export const Cards = () => {
  const dispatch = useAppDispatch();
  const { packId } = useParams();
  const handler = () => {
    dispatch(cardsThunks.getCards({ packId }));
  };
  return (
    <>
      cards <button onClick={handler}>getCards</button>{" "}
    </>
  );
};
