import * as React from "react";
import s from "features/cards/Cards.module.css";
import { InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { setSearchCardsValue } from "features/cards/cards.slice";
import { useAppDispatch, useAppSelector } from "common/hooks";

export const TableCardsFilters = () => {
  const dispatch = useAppDispatch();
  const searchCardsValue = useAppSelector((state) => state.cards.searchCardsValue);
  const searchHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setSearchCardsValue({ searchValue: event.target.value }));
  };
  return (
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
        value={searchCardsValue}
        style={{ width: "100%", marginBottom: "20px" }}
      />
    </div>
  );
};
