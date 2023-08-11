import React, { useState } from "react";
import { Button } from "@mui/material";
import s from "./Packs.module.css";
import BasicPackTable from "features/packs/BasicPackTable";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { Navigate } from "react-router-dom";
import { AddPackModal } from "features/packs/AddPackModal";

export const Packs = () => {
  const [openAddPackModal, setOpenAddPackModal] = useState(false);
  const cardsPackId = useAppSelector((state) => state.cards.cardsPackId);

  const handleClickAddPackModalOpen = () => {
    setOpenAddPackModal(true);
  };

  return (
    <>
      {cardsPackId ? (
        <Navigate to={`/cards/${cardsPackId}`} />
      ) : (
        <div className={s.packsContainer}>
          <div className={s.tableTitle}>
            <span>Packs list</span>
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
              onClick={handleClickAddPackModalOpen}
            >
              Add new pack
            </Button>
          </div>
          {/*<EnhancedTable /> - old component*/}
          {/*<DataGridTable /> - old component*/}
          <BasicPackTable />
          <AddPackModal openAddPackModal={openAddPackModal} setOpenAddPackModal={setOpenAddPackModal} />
        </div>
      )}
    </>
  );
};
