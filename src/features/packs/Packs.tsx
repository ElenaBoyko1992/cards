import React from "react";
import { Button } from "@mui/material";
import s from "./Packs.module.css";
import EnhancedTable from "features/packs/Table";

export const Packs = () => {
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
        >
          Add new pack
        </Button>
      </div>
      <EnhancedTable />
    </div>
  );
};
