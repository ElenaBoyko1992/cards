import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { cardsThunks, cleanPacks, setCardsPackId } from "features/cards/cards.slice";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import BasicCardsTable from "features/cards/BasicCardsTable";
import s from "./Cards.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { packsThunks } from "features/packs/packs.slice";

export const Cards = () => {
  const dispatch = useAppDispatch();
  const { packId } = useParams();
  const packName = useAppSelector((state) => state.cards.packName);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const packUserId = useAppSelector((state) => state.cards.packUserId);
  const cardsPackId = useAppSelector((state) => state.cards.cardsPackId);

  const addNewCardPressHandler = async () => {
    if (packId) {
      await dispatch(cardsThunks.createCard({ cardsPack_id: packId }));
      dispatch(cardsThunks.getCards({ packId }));
    }
  };

  const backToPackListHandler = () => {
    dispatch(setCardsPackId({ packId: null }));
    dispatch(cleanPacks());
  };

  return (
    <div className={s.cardsContainer}>
      <div className={s.backToPacksBlock}>
        <NavLink to={"/packs"} className={s.backToPacksLink} onClick={backToPackListHandler}>
          <KeyboardBackspaceIcon />
          <span>Back to Packs List</span>
        </NavLink>
      </div>
      <div className={s.tableTitle}>
        <span>{packName}</span>
        {packUserId === userId ? (
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
            onClick={addNewCardPressHandler}
          >
            Add new card
          </Button>
        ) : (
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
            Learn to pack
          </Button>
        )}
      </div>
      <BasicCardsTable />
    </div>
  );
};
