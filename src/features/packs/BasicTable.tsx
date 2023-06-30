import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";
import {
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  TableSortLabel,
  TextField,
} from "@mui/material";
import s from "./Packs.module.css";
import { AccountCircle } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { useDebounce } from "common/hooks/useDebounce";

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
  console.log("перерисовка");
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.packsItems);
  const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount);
  const rows = packs.map((pack) => {
    return createData(pack.name, pack.cardsCount, pack.updated, pack.created, "заглушка", pack._id);
  });

  const [orderBy, setOrderBy] = useState<Order>("asc"); //1 - ask, 0 - desk
  const sortNumber = orderBy === "asc" ? "1" : "0";

  const [nameSortIsActive, setNameSortIsActive] = useState(false);
  const [cardsCountSortIsActive, setCardsCountSortIsActive] = useState(false);
  const [lastUpdatedSortIsActive, setLastUpdatedSortIsActive] = useState(false);
  const [createdSortIsActive, setCreatedSortIsActive] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = React.useState(0);
  const [searchValue, setSearchValue] = useState<string>("");

  const debouncedValue = useDebounce<string>(searchValue, 500);

  const tablePaginationCount = useMemo(() => {
    return Math.ceil(cardPacksTotalCount / rowsPerPage);
  }, [cardPacksTotalCount, rowsPerPage]);

  const sortByNameHandler = async () => {
    setCardsCountSortIsActive(false);
    setLastUpdatedSortIsActive(false);
    setCreatedSortIsActive(false);
    setNameSortIsActive(true);
    // await dispatch(packsThunks.getPacks({ sortPacks: `${sortNumber}name`, pageCount: rowsPerPage, page }));
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  const sortByCardsCountHandler = async () => {
    setNameSortIsActive(false);
    setLastUpdatedSortIsActive(false);
    setCreatedSortIsActive(false);
    setCardsCountSortIsActive(true);
    setOrderBy(orderBy === "asc" ? "desc" : "asc");

    //await dispatch(packsThunks.getPacks({ sortPacks: `${sortNumber}cardsCount`, pageCount: rowsPerPage, page }));
  };

  const sortByLastUpdatedHandler = async () => {
    setNameSortIsActive(false);
    setCardsCountSortIsActive(false);
    setCreatedSortIsActive(false);
    setLastUpdatedSortIsActive(true);
    // await dispatch(packsThunks.getPacks({ sortPacks: `${sortNumber}updated`, pageCount: rowsPerPage, page }));
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  const sortByCreatedHandler = async () => {
    setNameSortIsActive(false);
    setCardsCountSortIsActive(false);
    setLastUpdatedSortIsActive(false);
    setCreatedSortIsActive(true);
    // await dispatch(packsThunks.getPacks({ sortPacks: `${sortNumber}created`, pageCount: rowsPerPage, page }));
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(parseInt(event.target.value, 10) as number);
  };

  const paginationChangedHandler = async (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const searchHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // useEffect(() => {
  //   dispatch(packsThunks.getPacks({ pageCount: rowsPerPage, page, packName: searchValue }));
  // }, [debouncedValue]);

  useEffect(() => {
    // dispatch(packsThunks.getPacks({ pageCount: rowsPerPage, page }));
    if (searchValue) {
      dispatch(packsThunks.getPacks({ pageCount: rowsPerPage, page, packName: searchValue }));
    } else if (nameSortIsActive) {
      dispatch(packsThunks.getPacks({ sortPacks: `${sortNumber}name`, pageCount: rowsPerPage, page }));
    } else if (cardsCountSortIsActive) {
      dispatch(packsThunks.getPacks({ sortPacks: `${sortNumber}cardsCount`, pageCount: rowsPerPage, page }));
    } else if (lastUpdatedSortIsActive) {
      dispatch(packsThunks.getPacks({ sortPacks: `${sortNumber}updated`, pageCount: rowsPerPage, page }));
    } else if (createdSortIsActive) {
      dispatch(packsThunks.getPacks({ sortPacks: `${sortNumber}created`, pageCount: rowsPerPage, page }));
    } else {
      dispatch(packsThunks.getPacks({ pageCount: rowsPerPage, page }));
    }
    // cardsCountSortIsActive && sortByCardsCountHandler();
    // lastUpdatedSortIsActive && sortByLastUpdatedHandler();
    // createdSortIsActive && sortByCreatedHandler();
  }, [
    page,
    rowsPerPage,
    orderBy,
    nameSortIsActive,
    cardsCountSortIsActive,
    lastUpdatedSortIsActive,
    createdSortIsActive,
    debouncedValue,
  ]);

  return (
    <>
      <div className={s.tableFilters}>
        <InputLabel shrink htmlFor="search-input" className={s.inputLabelText}>
          Search
        </InputLabel>
        <OutlinedInput
          id="search-input"
          onChange={searchHandler}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          placeholder="Provide your text"
          size="small"
        />
        {/*<TextField placeholder="Outlined" variant="outlined" id="search-input" />*/}
      </div>
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
      <div className={s.paginationBlock}>
        <Pagination
          count={tablePaginationCount}
          color="primary"
          shape="rounded"
          size="small"
          onChange={paginationChangedHandler}
          className={s.tablePagination}
        />
        {/*<TablePagination*/}
        {/*  rowsPerPageOptions={[5, 10, 25]}*/}
        {/*  component="div"*/}
        {/*  count={tablePaginationCount}*/}
        {/*  rowsPerPage={rowsPerPage}*/}
        {/*  page={page}*/}
        {/*  onPageChange={() => {}}*/}
        {/*  onRowsPerPageChange={handleChangeRowsPerPage}*/}
        {/*  labelRowsPerPage={"Show"}*/}
        {/*/>*/}
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
    </>
  );
}

//types
type Order = "asc" | "desc";
