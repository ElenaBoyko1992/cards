import s from "features/packs/Packs.module.css";
import { MenuItem, Pagination, Select, SelectChangeEvent } from "@mui/material";
import * as React from "react";
import { useMemo } from "react";

export const TablePagination = (props: PaginationPropsType) => {
  const { cardTotalCount, paginationChangedHandler, handleChangeRowsPerPage, page, rowsPerPage } = props;
  const tablePaginationCount = useMemo(() => {
    return Math.ceil(cardTotalCount / rowsPerPage);
  }, [cardTotalCount, rowsPerPage]);

  return (
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
  );
};

//types
type PaginationPropsType = {
  cardTotalCount: number;
  rowsPerPage: number;
  page: number;
  paginationChangedHandler: (event: React.ChangeEvent<unknown>, page: number) => void;
  handleChangeRowsPerPage: (event: SelectChangeEvent) => void;
};
