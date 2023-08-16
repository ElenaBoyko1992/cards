import React, { useMemo, useState } from "react";
import { useAppSelector } from "common/hooks";
import { NavLink, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import BasicCardsTable from "features/cards/BasicCardsTable";
import s from "./Cards.module.css";
import { AddCardModal } from "features/cards/AddCardModal";
import { BackToPacksList } from "features/cards/BackToPacksList";

export const Cards = () => {
  const { packId } = useParams();
  const packIdForUsing = useMemo(() => (packId ? packId : ""), [packId]);
  const packName = useAppSelector((state) => state.cards.packName);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const packUserId = useAppSelector((state) => state.cards.packUserId);
  const [openAddCardModal, setOpenAddCardModal] = useState(false);

  const handleClickAddCardModalOpen = () => {
    setOpenAddCardModal(true);
  };

  return (
    <div className={s.cardsContainer}>
      <BackToPacksList />
      <div className={s.tableTitle}>
        <span>{packName}</span>
        <div className={s.actionButtons}>
          {packUserId === userId && (
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
              onClick={handleClickAddCardModalOpen}
            >
              Add new card
            </Button>
          )}
          <NavLink to={`/cards/${packId}/studyСards`}>
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
          </NavLink>
        </div>
      </div>
      <BasicCardsTable packIdForUsing={packIdForUsing} />
      <AddCardModal
        setOpenAddCardModal={setOpenAddCardModal}
        openAddCardModal={openAddCardModal}
        packId={packIdForUsing}
      />
    </div>
  );
};
