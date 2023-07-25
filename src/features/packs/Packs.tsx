import React, { useEffect } from "react";
import { Button } from "@mui/material";
import s from "./Packs.module.css";
import BasicTable from "features/packs/BasicTable";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import { authThunks } from "features/auth/auth.slice";
import { Navigate, useNavigate } from "react-router-dom";

export const Packs = () => {
  console.log("перерисовка Packs");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cardsPackId = useAppSelector((state) => state.cards.cardsPackId);

  const addNewPackPressHandler = async () => {
    await dispatch(packsThunks.createPack({}));
    dispatch(packsThunks.getPacks());
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
              onClick={addNewPackPressHandler}
            >
              Add new pack
            </Button>
          </div>

          {/*<EnhancedTable /> - old component*/}
          {/*<DataGridTable /> - old component*/}
          <BasicTable />
        </div>
      )}
    </>
  );
};
