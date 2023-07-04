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
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";

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
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount);
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount);
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
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>("");
  const [userIdForShowingMyPacks, setUserIdForShowingMyPacks] = useState("");
  const [valueForSlider, setValueForSlider] = useState<any>([0, 0]);

  const debouncedValueForSearch = useDebounce<string>(searchValue, 500);
  const debouncedValueForSliderMin = useDebounce<number>(valueForSlider[0], 500);
  const debouncedValueForSliderMax = useDebounce<number>(valueForSlider[1], 500);
  const debouncedUserIdForShowingMyPacks = useDebounce<string>(userIdForShowingMyPacks, 500);
  const debouncedNameSortIsActive = useDebounce<boolean>(nameSortIsActive, 500);
  const debouncedCardsCountSortIsActive = useDebounce<boolean>(cardsCountSortIsActive, 500);
  const debouncedLastUpdatedSortIsActive = useDebounce<boolean>(lastUpdatedSortIsActive, 500);
  const debouncedCreatedSortIsActive = useDebounce<boolean>(createdSortIsActive, 500);

  console.log(valueForSlider);
  console.log("minCardsCount", minCardsCount);
  console.log("maxCardsCount", maxCardsCount);
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
  };

  const showPacksCardsHandler = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setUserIdForShowingMyPacks(newAlignment);
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
    if (+event.target.value <= valueForSlider[1] - minDistance) {
      setValueForSlider([Number(event.target.value), valueForSlider[1]]);
      setPage(1);
    } else {
    }
  };
  //
  const handleInputSliderChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value >= valueForSlider[0] + minDistance) {
      setValueForSlider([valueForSlider[0], Number(event.target.value)]);
      setPage(1);
    }
  };

  // const onSliderChangeHandler = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
  //   console.log(value);
  //   setValueForSlider(value);
  // };

  const removeAllFilters = () => {
    setSearchValue("");
    setUserIdForShowingMyPacks("");
    setValueForSlider([0, 0]);
    setNameSortIsActive(false);
    setCardsCountSortIsActive(false);
    setLastUpdatedSortIsActive(false);
    setCreatedSortIsActive(false);
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
          min: valueForSlider[0],
          max: valueForSlider[1],
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
          min: valueForSlider[0],
          max: valueForSlider[1],
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
          min: valueForSlider[0],
          max: valueForSlider[1],
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
          min: valueForSlider[0],
          max: valueForSlider[1],
        })
      );
    } else {
      dispatch(
        packsThunks.getPacks({
          pageCount: rowsPerPage,
          page,
          packName: searchValue,
          user_id: userIdForShowingMyPacks,
          min: valueForSlider[0],
          max: valueForSlider[1],
        })
      );
    }
  }, [
    page,
    rowsPerPage,
    orderBy,
    debouncedNameSortIsActive,
    debouncedCardsCountSortIsActive,
    debouncedLastUpdatedSortIsActive,
    debouncedCreatedSortIsActive,
    debouncedValueForSearch,
    debouncedValueForSliderMin,
    debouncedValueForSliderMax,
    debouncedUserIdForShowingMyPacks,
  ]);

  return (
    <>
      <div className={s.tableFilters}>
        <div className={s.filterSearch}>
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
            value={searchValue}
          />
        </div>
        <div className={s.filterShowPacks}>
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
            <ToggleButton value={userId} style={{ width: "100px" }}>
              My
            </ToggleButton>
            <ToggleButton value="" aria-label="left aligned" style={{ width: "100px" }}>
              All
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className={s.filterSlider}>
          <InputLabel shrink htmlFor="slider" className={s.inputLabelText}>
            Number of cards
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
                min: minCardsCount,
                max: maxCardsCount,
                type: "number",
              }}
            />
            <Box sx={{ width: 200 }}>
              <Slider
                value={valueForSlider}
                onChange={sliderHandleChange1}
                valueLabelDisplay="auto"
                min={minCardsCount}
                max={maxCardsCount}
                step={1}
                // getAriaValueText={(value: number) => {
                //   return `${value}°C`;
                // }}
                disableSwap
                // onChangeCommitted={onSliderChangeHandler}
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
                min: minCardsCount,
                max: maxCardsCount,
                type: "number",
              }}
            />
          </div>
        </div>
        <div className={s.filterOffButton}>
          <button onClick={removeAllFilters}>
            <FilterAltOffOutlinedIcon fontSize={"large"} color={"primary"} />
          </button>
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
