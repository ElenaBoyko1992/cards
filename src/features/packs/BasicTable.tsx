import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import { useEffect, useState } from "react";
import { visuallyHidden } from "@mui/utils";
import { TableSortLabel } from "@mui/material";

function createData(name: string, cardsCount: number, updated: string, created: string, actions: string, id: string) {
  return { name, cardsCount, updated, created, actions, id };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function BasicTable() {
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.packsItems);
  const rows = packs.map((pack) => {
    return createData(pack.name, pack.cardsCount, pack.updated, pack.created, "заглушка", pack._id);
  });

  const [orderBy, setOrderBy] = useState<Order>("asc"); //1 - ask, 0 - desk
  const sortNumber = orderBy === "asc" ? "1" : "0";

  const [nameSortIsActive, setNameSortIsActive] = useState(false);

  const sortByNameHandler = async () => {
    await dispatch(packsThunks.getPacks({ sortPacks: `${sortNumber}updated` }));
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
    setNameSortIsActive(true);
  };

  useEffect(() => {
    dispatch(packsThunks.getPacks({}));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              Name
              <TableSortLabel active={nameSortIsActive} direction={orderBy} onClick={sortByNameHandler}>
                {/*{headCell.label}*/}
                {/*{orderBy === headCell.id ? (*/}
                {/*  <Box component="span" sx={visuallyHidden}>*/}
                {/*    {order === "desc" ? "sorted descending" : "sorted ascending"}*/}
                {/*  </Box>*/}
                {/*) : null}*/}
              </TableSortLabel>
            </TableCell>
            <TableCell>Cards</TableCell>
            <TableCell>Last Updated</TableCell>
            <TableCell>Created by</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.cardsCount}</TableCell>
              <TableCell>{row.updated}</TableCell>
              <TableCell>{row.created}</TableCell>
              <TableCell>{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

//types
type Order = "asc" | "desc";
