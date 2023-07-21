import * as React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useDebounce } from "common/hooks/useDebounce";
import { createDataForCardsTable } from "common/utils/createData";
import s from "./Cards.module.css";
import { CardsTable } from "features/cards/CardsTable";
import { cardsThunks, setSearchCardsValue } from "features/cards/cards.slice";
import { useParams } from "react-router-dom";
import { InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { TableCardsFilters } from "features/cards/TableCardsFilters";

export default function BasicCardsTable() {
  console.log("перерисовка BasicCardsTable");
  const { packId } = useParams();
  const packIdForUsing = packId ? packId : "";

  const dispatch = useAppDispatch();

  const searchCardsValue = useAppSelector((state) => state.cards.searchCardsValue);
  const cards = useAppSelector((state) => state.cards.cardsItems);

  const cardsRows = cards.map((card) => {
    return createDataForCardsTable(card.question, card.answer, card.updated, card.grade, card._id);
  });

  const debouncedSearchCardsValue = useDebounce<string>(searchCardsValue, 1000);

  useEffect(() => {
    dispatch(cardsThunks.getCards({ packId: packIdForUsing }));
  }, [debouncedSearchCardsValue]);

  return (
    <>
      <TableCardsFilters />
      {cardsRows.length ? (
        <CardsTable cardsRows={cardsRows} packId={packIdForUsing} />
      ) : (
        <div className={s.cardsNotFound}>В этой колоде нет карточек.</div>
      )}
    </>
  );
}
