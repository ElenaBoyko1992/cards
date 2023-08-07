import * as React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useDebounce } from "common/hooks/useDebounce";
import { createDataForCardsTable } from "common/utils/createData";
import s from "./Cards.module.css";
import { CardsTable } from "features/cards/CardsTable";
import { cardsThunks, setCardsPackId } from "features/cards/cards.slice";
import { TableCardsFilters } from "features/cards/TableCardsFilters";

export default function BasicCardsTable(props: BasicCardsTableType) {
  console.log("перерисовка BasicCardsTable");
  // const { packId } = useParams();
  // const packIdForUsing = useMemo(() => (packId ? packId : ""), [packId]);
  const cardsPackId = useAppSelector((state) => state.cards.cardsPackId);
  const dispatch = useAppDispatch();

  const searchCardsValue = useAppSelector((state) => state.cards.searchCardsValue);
  const cards = useAppSelector((state) => state.cards.cardsItems);

  const cardsRows = cards.map((card) => {
    return createDataForCardsTable(card.question, card.answer, card.updated, card.grade, card._id);
  });

  const debouncedSearchCardsValue = useDebounce<string>(searchCardsValue, 1000);

  useEffect(() => {
    if (props.packIdForUsing && props.packIdForUsing !== cardsPackId) {
      dispatch(setCardsPackId({ packId: props.packIdForUsing }));
    }
    dispatch(cardsThunks.getCards({ packId: props.packIdForUsing }));
  }, [debouncedSearchCardsValue, props.packIdForUsing]);

  return (
    <>
      <TableCardsFilters />
      {cardsRows.length ? (
        <CardsTable cardsRows={cardsRows} packId={props.packIdForUsing} />
      ) : (
        <div className={s.cardsNotFound}>В этой колоде нет карточек.</div>
      )}
    </>
  );
}

//types
type BasicCardsTableType = {
  packIdForUsing: string;
};
