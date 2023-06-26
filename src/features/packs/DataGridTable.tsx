import * as React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useEffect } from "react";
import { packsThunks } from "features/packs/packs.slice";

export default function DataGridTable() {
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.packsItems);

  // const rows: GridRowsProp = [{ id: 1, name: "Hello", cards: "World", lastUpdated: "", createdBy: "", actions: "" }];
  console.log(packs);
  const rows: GridRowsProp = packs.map((pack) => {
    return {
      id: pack._id,
      name: pack.name,
      cards: pack.cardsCount,
      lastUpdated: pack.updated,
      createdBy: pack.created,
      actions: "заглушка",
    };
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 250 },
    { field: "cards", headerName: "Cards", width: 250 },
    { field: "lastUpdated", headerName: "Last Updated", width: 250 },
    { field: "createdBy", headerName: "Created by", width: 250 },
    { field: "actions", headerName: "Actions", width: 250 },
  ];
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });
  console.log(paginationModel);
  useEffect(() => {
    dispatch(packsThunks.getPacks({}));
  }, []);
  return (
    <div style={{ height: "auto", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}
