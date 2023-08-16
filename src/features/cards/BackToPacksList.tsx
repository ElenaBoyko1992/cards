import React from "react";
import s from "features/cards/Cards.module.css";
import { NavLink } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { cleanPacks, setCardsPackId } from "features/cards/cards.slice";
import { useAppDispatch } from "common/hooks";

export const BackToPacksList = () => {
  const dispatch = useAppDispatch();
  const backToPackListHandler = () => {
    dispatch(setCardsPackId({ packId: null }));
    dispatch(cleanPacks());
  };
  return (
    <div className={s.backToPacksBlock}>
      <NavLink to={"/packs"} className={s.backToPacksLink} onClick={backToPackListHandler}>
        <KeyboardBackspaceIcon />
        <span>Back to Packs List</span>
      </NavLink>
    </div>
  );
};
