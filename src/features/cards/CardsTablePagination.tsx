import * as React from "react";
import { TablePagination } from "components/TablePagination/TablePagination";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { SelectChangeEvent } from "@mui/material";
import { cardsThunks, setCardsPage, setRowsCardsPerPage } from "features/cards/cards.slice";

export const CardsTablePagination = (props: CardsTablePaginationType) => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.cards.pageCards);
  const rowsPerPage = useAppSelector((state) => state.cards.rowsPerPageCards);
  const cardsTotalCount = useAppSelector((state) => state.cards.cardsTotalCount);

  const handleChangeRowsPerPage = async (event: SelectChangeEvent) => {
    await dispatch(setRowsCardsPerPage({ rowsPerPage: parseInt(event.target.value, 10) as number }));
    dispatch(cardsThunks.getCards({ packId: props.packId }));
  };

  const paginationChangedHandler = async (event: React.ChangeEvent<unknown>, page: number) => {
    await dispatch(setCardsPage({ pageNumber: page }));
    dispatch(cardsThunks.getCards({ packId: props.packId }));
  };
  return (
    <TablePagination
      cardTotalCount={cardsTotalCount}
      paginationChangedHandler={paginationChangedHandler}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      page={page}
      rowsPerPage={rowsPerPage}
    />
  );
};

//types
type CardsTablePaginationType = {
  packId: string;
};
