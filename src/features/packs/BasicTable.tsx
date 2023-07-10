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
import {
  packsThunks,
  removeAllFilters,
  setPageAction,
  setRowsPerPage,
  setSearchValue,
  setUserIdForShowingMyPacks,
  sortBy,
} from "features/packs/packs.slice";
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
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { createData } from "common/utils/createData";

export default function BasicTable() {
  console.log("перерисовка");
  const dispatch = useAppDispatch();
  const packs = useAppSelector((state) => state.packs.packsItems);
  const cardPacksTotalCount = useAppSelector((state) => state.packs.cardPacksTotalCount);
  const userId = useAppSelector((state) => (state.auth.profile ? state.auth.profile._id : ""));
  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount);
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount);
  const page = useAppSelector((state) => state.packs.page);
  const rowsPerPage = useAppSelector((state) => state.packs.rowsPerPage);
  const searchValue = useAppSelector((state) => state.packs.searchValue);
  const userIdForShowingMyPacks = useAppSelector((state) => state.packs.userIdForShowingMyPacks);
  const sortPacks = useAppSelector((state) => state.packs.sortPacks);
  const orderBy = useAppSelector((state) => state.packs.orderBy);
  const nameSortIsActive = useAppSelector((state) => state.packs.nameSortIsActive);
  const cardsCountSortIsActive = useAppSelector((state) => state.packs.cardsCountSortIsActive);
  const lastUpdatedSortIsActive = useAppSelector((state) => state.packs.lastUpdatedSortIsActive);
  const createdSortIsActive = useAppSelector((state) => state.packs.createdSortIsActive);

  const rows = packs.map((pack) => {
    return createData(pack.name, pack.cardsCount, pack.updated, pack.created, pack._id, pack.user_id);
  });

  // const [orderBy, setOrderBy] = useState<Order>("asc"); //1 - ask, 0 - desk
  // const sortNumber = orderBy === "asc" ? "0" : "1";

  // const [nameSortIsActive, setNameSortIsActive] = useState(false);
  // const [cardsCountSortIsActive, setCardsCountSortIsActive] = useState(false);
  // const [lastUpdatedSortIsActive, setLastUpdatedSortIsActive] = useState(false);
  // const [createdSortIsActive, setCreatedSortIsActive] = useState(false);

  // const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [page, setPage] = useState(1);
  // const [searchValue, setSearchValue] = useState<string>("");
  // const [userIdForShowingMyPacks, setUserIdForShowingMyPacks] = useState("");
  const [valueForSlider, setValueForSlider] = useState<any>([minCardsCount, maxCardsCount]);
  // const [sortPacks, setSortPacks] = useState("");

  const debouncedValueForSearch = useDebounce<string>(searchValue, 500);
  const debouncedValueForSliderMin = useDebounce<number>(valueForSlider[0], 500);
  const debouncedValueForSliderMax = useDebounce<number>(valueForSlider[1], 500);
  const debouncedValueForSlider = useDebounce<any>(valueForSlider, 500);
  const debouncedUserIdForShowingMyPacks = useDebounce<string>(userIdForShowingMyPacks, 500);
  const debouncedPageNumber = useDebounce<number>(page, 500);
  const debouncedOrderBy = useDebounce<string>(orderBy, 500);

  const tablePaginationCount = useMemo(() => {
    return Math.ceil(cardPacksTotalCount / rowsPerPage);
  }, [cardPacksTotalCount, rowsPerPage]);

  const sortByNameHandler = async () => {
    dispatch(sortBy({ sortType: "name" }));
  };

  const sortByCardsCountHandler = async () => {
    dispatch(sortBy({ sortType: "cardsCount" }));
  };

  const sortByLastUpdatedHandler = async () => {
    dispatch(sortBy({ sortType: "updated" }));
  };

  const sortByCreatedHandler = async () => {
    dispatch(sortBy({ sortType: "created" }));
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    dispatch(setRowsPerPage({ rowsPerPage: parseInt(event.target.value, 10) as number }));
    dispatch(setPageAction({ pageNumber: 1 }));
  };

  const paginationChangedHandler = async (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(setPageAction({ pageNumber: page }));
  };

  const searchHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setSearchValue({ searchValue: event.target.value }));
  };

  const showPacksCardsHandler = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    dispatch(setUserIdForShowingMyPacks({ userIdForShowingMyPacks: newAlignment }));
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
    console.log(valueForSlider);
  };

  const handleInputSliderChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value <= valueForSlider[1] - minDistance) {
      setValueForSlider([Number(event.target.value), valueForSlider[1]]);
      dispatch(setPageAction({ pageNumber: 1 }));
    } else {
    }
  };

  const handleInputSliderChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value >= valueForSlider[0] + minDistance) {
      setValueForSlider([valueForSlider[0], Number(event.target.value)]);
      dispatch(setPageAction({ pageNumber: 1 }));
    }
  };

  // временно закомментирована, потом вернуть!
  const removeAllFiltersHandler = () => {
    //    setValueForSlider([0, 0]); - доработать в action removeAllFiltersHandler, когда перенесу setValueForSlider в bll

    dispatch(removeAllFilters());
  };

  const deletePackHandler = (id: string) => {
    dispatch(packsThunks.deletePack({ id }));
  };

  useEffect(() => {
    dispatch(
      packsThunks.getPacks()
      //старые параметры
      // {
      //   pageCount: rowsPerPage,
      //   page,
      //   packName: searchValue,
      //   user_id: userIdForShowingMyPacks,
      //   sortPacks,
      //
      //   //настроить в санке getPacks, когда перенесу логику слайдера в bll!
      //   // min: valueForSlider[0],
      //   // max: valueForSlider[1],
      //
      // }
    );
  }, [
    debouncedPageNumber,
    rowsPerPage,
    debouncedOrderBy,
    debouncedValueForSearch,

    //раскомментить, когда правильно настрою слайдер!
    // debouncedValueForSliderMin,
    // debouncedValueForSliderMax,
    valueForSlider,
    debouncedUserIdForShowingMyPacks,
  ]);
  useEffect(() => {
    setValueForSlider([minCardsCount, maxCardsCount]);
  }, [minCardsCount, maxCardsCount]);
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
          <button onClick={removeAllFiltersHandler}>
            <FilterAltOffOutlinedIcon fontSize={"large"} color={"primary"} />
          </button>
        </div>
      </div>

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

//types
type Order = "asc" | "desc";
