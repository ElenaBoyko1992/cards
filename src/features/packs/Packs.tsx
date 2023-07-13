import React from "react";
import { Button } from "@mui/material";
import s from "./Packs.module.css";
import BasicTable from "features/packs/BasicTable";
import { useAppDispatch } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";

export const Packs = () => {
  const dispatch = useAppDispatch();

  const addNewPackPressHandler = async () => {
    await dispatch(packsThunks.createPack({}));
    dispatch(packsThunks.getPacks());
  };

  return (
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
  );
};
