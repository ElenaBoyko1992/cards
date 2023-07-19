import React from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { cardsThunks } from "features/cards/cards.slice";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import BasicCardsTable from "features/cards/BasicCardsTable";
import s from "./Cards.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

export const Cards = () => {
  const dispatch = useAppDispatch();
  const packName = useAppSelector((state) => state.cards.packName);

  // //поправить, + убрать этот обработчик из кнопки!
  // const handler = () => {
  //   if (packId) {
  //     dispatch(cardsThunks.getCards({ packId }));
  //   }
  // };
  return (
    <div className={s.cardsContainer}>
      <div>
        <NavLink to={"/packs"} className={s.backToPacksLink}>
          <KeyboardBackspaceIcon />
          <span>Back to Packs List</span>
        </NavLink>
      </div>
      <div className={s.tableTitle}>
        <span>{packName}</span>
        <Button
          variant="contained"
          type="submit"
          style={{
            borderRadius: "30px",
            textTransform: "none",
            fontFamily: `'Montserrat', 'sans-serif'`,
            fontSize: "16px",
            padding: "8px 28px",
          }}
          // onClick={handler}
        >
          ????Learn to pack
        </Button>
      </div>
      <BasicCardsTable />
    </div>
  );
};
