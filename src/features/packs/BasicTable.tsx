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
  showPacksCardsById,
  setValueForSlider,
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
  const orderBy = useAppSelector((state) => state.packs.orderBy);
  const nameSortIsActive = useAppSelector((state) => state.packs.nameSortIsActive);
  const cardsCountSortIsActive = useAppSelector((state) => state.packs.cardsCountSortIsActive);
  const lastUpdatedSortIsActive = useAppSelector((state) => state.packs.lastUpdatedSortIsActive);
  const createdSortIsActive = useAppSelector((state) => state.packs.createdSortIsActive);
  const valueForSlider = useAppSelector((state) => state.packs.valueForSlider);

  const rows = packs.map((pack) => {
    return createData(pack.name, pack.cardsCount, pack.updated, pack.created, pack._id, pack.user_id);
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

  const searchHandler = async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    await dispatch(setSearchValue({ searchValue: event.target.value }));
    dispatch(packsThunks.getPacks());
  };

  const showPacksCardsHandler = async (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    await dispatch(showPacksCardsById({ userIdForShowingMyPacks: newAlignment }));
    dispatch(packsThunks.getPacks());
  };

  const minDistance = 1;
  const sliderHandleChange1 = (event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      dispatch(
        setValueForSlider({ value: [Math.min(newValue[0], valueForSlider[1] - minDistance), valueForSlider[1]] })
      );
    } else {
      dispatch(
        setValueForSlider({ value: [valueForSlider[0], Math.max(newValue[1], valueForSlider[0] + minDistance)] })
      );
    }
  };

  const handleInputSliderChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value <= valueForSlider[1] - minDistance) {
      dispatch(
        setValueForSlider({
          value: [Number(event.target.value), valueForSlider[1]],
        })
      );
    }
  };

  const handleInputSliderChangeMax = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value >= valueForSlider[0] + minDistance) {
      dispatch(
        setValueForSlider({
          value: [valueForSlider[0], Number(event.target.value)],
        })
      );
    }
  };

  const removeAllFiltersHandler = async () => {
    await dispatch(removeAllFilters());
    dispatch(packsThunks.getPacks());
  };

  const deletePackHandler = (id: string) => {
    dispatch(packsThunks.deletePack({ id }));
  };

  useEffect(() => {
    dispatch(packsThunks.getPacks());
  }, [debouncedValueForSlider]);

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
