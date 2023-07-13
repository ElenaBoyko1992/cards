import * as React from "react";
import s from "./Packs.module.css";
import {
  Box,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slider,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
  packsThunks,
  removeAllFilters,
  setSearchValue,
  setValueForSlider,
  showPacksCardsById,
} from "features/packs/packs.slice";

export const TableFilters = () => {
  const dispatch = useAppDispatch();

  const maxCardsCount = useAppSelector((state) => state.packs.maxCardsCount);
  const minCardsCount = useAppSelector((state) => state.packs.minCardsCount);
  const searchValue = useAppSelector((state) => state.packs.searchValue);
  const userIdForShowingMyPacks = useAppSelector((state) => state.packs.userIdForShowingMyPacks);
  const valueForSlider = useAppSelector((state) => state.packs.valueForSlider);
  const userId = useAppSelector((state) => (state.auth.profile ? state.auth.profile._id : ""));

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
    </>
  );
};
