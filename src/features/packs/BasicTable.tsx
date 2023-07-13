import * as React from "react";
import { useEffect, useMemo } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  packsThunks,
  removeAllFilters,
  setPage,
  setRowsPerPage,
  setSearchValue,
  setValueForSlider,
  showPacksCardsById,
  sortBy,
} from "features/packs/packs.slice";
import { MenuItem, Pagination, Select, SelectChangeEvent, TableSortLabel } from "@mui/material";
import s from "./Packs.module.css";

import { useDebounce } from "common/hooks/useDebounce";

import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { createData } from "common/utils/createData";
import { TableFilters } from "features/packs/TableFilters";

export default function BasicTable() {
  console.log("перерисовка BasicTable");
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.packsItems);
  const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount);
  const userId = useAppSelector((state) => (state.auth.profile ? state.auth.profile._id : ""));

  const page = useAppSelector((state) => state.packs.page);
  const rowsPerPage = useAppSelector((state) => state.packs.rowsPerPage);

  const orderBy = useAppSelector((state) => state.packs.orderBy);
  const nameSortIsActive = useAppSelector((state) => state.packs.nameSortIsActive);
  const cardsCountSortIsActive = useAppSelector((state) => state.packs.cardsCountSortIsActive);
  const lastUpdatedSortIsActive = useAppSelector((state) => state.packs.lastUpdatedSortIsActive);
  const createdSortIsActive = useAppSelector((state) => state.packs.createdSortIsActive);
  const valueForSlider = useAppSelector((state) => state.packs.valueForSlider);

  const rows = packs.map((pack) => {
    return createData(pack.name, pack.cardsCount, pack.updated, pack.user_name, pack._id, pack.user_id);
  });

  const debouncedValueForSlider = useDebounce<Array<number>>(valueForSlider, 1000);

  const tablePaginationCount = useMemo(() => {
    return Math.ceil(cardPacksTotalCount / rowsPerPage);
  }, [cardPacksTotalCount, rowsPerPage]);

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

  const handleChangeRowsPerPage = async (event: SelectChangeEvent) => {
    await dispatch(setRowsPerPage({ rowsPerPage: parseInt(event.target.value, 10) as number }));
    dispatch(packsThunks.getPacks());
  };

  const paginationChangedHandler = async (event: React.ChangeEvent<unknown>, page: number) => {
    await dispatch(setPage({ pageNumber: page }));
    dispatch(packsThunks.getPacks());
  };

  const deletePackHandler = async (id: string) => {
    await dispatch(packsThunks.deletePack({ id }));
    dispatch(packsThunks.getPacks());
  };

  useEffect(() => {
    dispatch(packsThunks.getPacks());
  }, [debouncedValueForSlider]);

  return (
    <>
      <TableFilters />

      {rows.length ? (
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
                {rows.map((row) => (
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
          <div className={s.paginationBlock}>
            <Pagination
              count={tablePaginationCount}
              color="primary"
              shape="rounded"
              size="small"
              onChange={paginationChangedHandler}
              className={s.tablePagination}
              page={page}
            />
            <span>Show</span>
            <Select
              value={rowsPerPage.toString()}
              onChange={handleChangeRowsPerPage}
              className={s.tableSelectRowPerPage}
              size="small"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
            </Select>
            <span>Cards per page</span>
          </div>
        </div>
      ) : (
        <div className={s.packsNotFound}>Колоды не найдены. Измените параметры запроса.</div>
      )}
    </>
  );
}
