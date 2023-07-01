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
  Box,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  SelectChangeEvent,
  Slider,
  TableSortLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import s from "./Packs.module.css";
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
  const userId = useAppSelector((state) => (state.auth.profile ? state.auth.profile._id : ""));
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
  const [page, setPage] = React.useState(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [userIdForShowingMyPacks, setUserIdForShowingMyPacks] = useState("");
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const [valueForSlider, setValueForSlider] = useState([0, 75]);
  console.log("valueForSlider", valueForSlider);
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
    setPage(1);
  };

  const paginationChangedHandler = async (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const searchHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPage(1);
  };

  const showPacksCardsHandler = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setUserIdForShowingMyPacks(newAlignment);
    setPage(1);
  };

  const minDistance = 1;
  const sliderHandleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValueForSlider([Math.min(newValue[0], valueForSlider[1] - minDistance), valueForSlider[1]]);
    } else {
      setValueForSlider([valueForSlider[0], Math.max(newValue[1], valueForSlider[0] + minDistance)]);
    }
  };

  const handleInputSliderChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueForSlider([event.target.value === "" ? 0 : Number(event.target.value), valueForSlider[1]]);
  };

  const handleInputSliderChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueForSlider([valueForSlider[0], event.target.value === "" ? 0 : Number(event.target.value)]);
  };

  useEffect(() => {
    if (nameSortIsActive) {
      dispatch(
        packsThunks.getPacks({
          sortPacks: `${sortNumber}name`,
          pageCount: rowsPerPage,
          page,
          packName: searchValue,
          user_id: userIdForShowingMyPacks,
        })
      );
    } else if (cardsCountSortIsActive) {
      dispatch(
        packsThunks.getPacks({
          sortPacks: `${sortNumber}cardsCount`,
          pageCount: rowsPerPage,
          page,
          packName: searchValue,
          user_id: userIdForShowingMyPacks,
        })
      );
    } else if (lastUpdatedSortIsActive) {
      dispatch(
        packsThunks.getPacks({
          sortPacks: `${sortNumber}updated`,
          pageCount: rowsPerPage,
          page,
          packName: searchValue,
          user_id: userIdForShowingMyPacks,
        })
      );
    } else if (createdSortIsActive) {
      dispatch(
        packsThunks.getPacks({
          sortPacks: `${sortNumber}created`,
          pageCount: rowsPerPage,
          page,
          packName: searchValue,
          user_id: userIdForShowingMyPacks,
        })
      );
    } else {
      dispatch(
        packsThunks.getPacks({
          pageCount: rowsPerPage,
          page,
          packName: searchValue,
          user_id: userIdForShowingMyPacks,
        })
      );
    }
  }, [
    page,
    rowsPerPage,
    orderBy,
    nameSortIsActive,
    cardsCountSortIsActive,
    lastUpdatedSortIsActive,
    createdSortIsActive,
    debouncedValue,
    userIdForShowingMyPacks,
  ]);

  return (
    <>
      <div className={s.tableFilters}>
        <div>
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
        </div>
        <div>
          <InputLabel shrink htmlFor="show-packs" className={s.inputLabelText}>
            Show packs cards
          </InputLabel>
          <ToggleButtonGroup
            id="show-packs"
            value={userIdForShowingMyPacks}
            exclusive
            onChange={showPacksCardsHandler}
            size={"small"}
            color={"primary"}
          >
            <ToggleButton value={userId}>My</ToggleButton>
            <ToggleButton value="" aria-label="left aligned">
              All
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          <InputLabel shrink htmlFor="slider" className={s.inputLabelText}>
            Show packs cards
          </InputLabel>
          <div className={s.sliderBlock} id={"slider"}>
            <TextField
              id="slider"
              style={{ width: "75px", marginRight: "20px" }}
              variant="outlined"
              value={valueForSlider[0]}
              size="small"
              onChange={handleInputSliderChangeMin}
              // onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 0,
                max: 75,
                type: "number",
              }}
            />
            <Box sx={{ width: 200 }}>
              <Slider
                value={valueForSlider}
                onChange={sliderHandleChange1}
                valueLabelDisplay="auto"
                min={0}
                step={1}
                max={75}
                // getAriaValueText={(value: number) => {
                //   return `${value}°C`;
                // }}
                disableSwap
              />
            </Box>
            <TextField
              style={{ width: "75px", marginLeft: "20px" }}
              variant="outlined"
              value={valueForSlider[1]}
              size="small"
              onChange={handleInputSliderChangeMax}
              // onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 0,
                max: 75,
                type: "number",
              }}
            />
          </div>
        </div>
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
          page={page}
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
