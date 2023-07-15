import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { SelectChangeEvent, TableSortLabel } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import s from "features/packs/Packs.module.css";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TablePagination } from "components/TablePagination/TablePagination";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks, setPage, setRowsPerPage, sortBy } from "features/packs/packs.slice";

export const PacksTable = (props: PacksTablePropsType) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => (state.auth.profile ? state.auth.profile._id : ""));
  const orderBy = useAppSelector((state) => state.packs.orderBy);
  const nameSortIsActive = useAppSelector((state) => state.packs.nameSortIsActive);
  const cardsCountSortIsActive = useAppSelector((state) => state.packs.cardsCountSortIsActive);
  const lastUpdatedSortIsActive = useAppSelector((state) => state.packs.lastUpdatedSortIsActive);
  const createdSortIsActive = useAppSelector((state) => state.packs.createdSortIsActive);

  const sortByNameHandler = async () => {
    await dispatch(sortBy({ sortType: "name" }));
    dispatch(packsThunks.getPacks());
  };

  const sortByCardsCountHandler = async () => {
    await dispatch(sortBy({ sortType: "cardsCount" }));
    dispatch(packsThunks.getPacks());
  };

  const sortByLastUpdatedHandler = async () => {
    await dispatch(sortBy({ sortType: "updated" }));
    dispatch(packsThunks.getPacks());
  };

  const sortByCreatedHandler = async () => {
    await dispatch(sortBy({ sortType: "created" }));
    dispatch(packsThunks.getPacks());
  };

  const deletePackHandler = async (id: string) => {
    await dispatch(packsThunks.deletePack({ id }));
    dispatch(packsThunks.getPacks());
  };

  //for pagination
  const page = useAppSelector((state) => state.packs.page);
  const rowsPerPage = useAppSelector((state) => state.packs.rowsPerPage);
  const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount);

  const handleChangeRowsPerPage = async (event: SelectChangeEvent) => {
    await dispatch(setRowsPerPage({ rowsPerPage: parseInt(event.target.value, 10) as number }));
    dispatch(packsThunks.getPacks());
  };

  const paginationChangedHandler = async (event: React.ChangeEvent<unknown>, page: number) => {
    await dispatch(setPage({ pageNumber: page }));
    dispatch(packsThunks.getPacks());
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Name
                <TableSortLabel
                  active={nameSortIsActive}
                  direction={orderBy}
                  onClick={sortByNameHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                Cards
                <TableSortLabel
                  active={cardsCountSortIsActive}
                  direction={orderBy}
                  onClick={sortByCardsCountHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                Last Updated
                <TableSortLabel
                  active={lastUpdatedSortIsActive}
                  direction={orderBy}
                  onClick={sortByLastUpdatedHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                Created by
                <TableSortLabel
                  active={createdSortIsActive}
                  direction={orderBy}
                  onClick={sortByCreatedHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows.map((row) => (
              <TableRow key={row.packId}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.cardsCount}</TableCell>
                <TableCell>{row.updated}</TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell>
                  <div className={s.tableSellActions}>
                    {row.userId === userId ? (
                      <div className={s.tableSellIcons}>
                        <button disabled={!row.cardsCount}>
                          <SchoolOutlinedIcon />
                        </button>
                        <button>
                          <BorderColorOutlinedIcon />
                        </button>
                        <button onClick={() => deletePackHandler(row.packId)}>
                          <DeleteOutlineOutlinedIcon />
                        </button>
                      </div>
                    ) : (
                      <div className={s.tableSellIcons}>
                        <button disabled={!row.cardsCount}>
                          <SchoolOutlinedIcon />
                        </button>
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        cardTotalCount={cardPacksTotalCount}
        paginationChangedHandler={paginationChangedHandler}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

//types
type PacksTablePropsType = {
  rows: Array<RowType>;
};

type RowType = {
  cardsCount: number;
  created: string;
  name: string;
  packId: string;
  updated: string;
  userId: string;
};
