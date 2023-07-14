import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { TableSortLabel } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import s from "features/packs/Packs.module.css";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TablePagination } from "components/TablePagination/TablePagination";
import * as React from "react";

export const PacksTable = () => {
  return (
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
      <TablePagination
        cardTotalCount={cardPacksTotalCount}
        paginationChangedHandler={paginationChangedHandler}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
      {/*<div className={s.paginationBlock}>*/}
      {/*  <TablePagination*/}
      {/*    count={tablePaginationCount}*/}
      {/*    color="primary"*/}
      {/*    shape="rounded"*/}
      {/*    size="small"*/}
      {/*    onChange={paginationChangedHandler}*/}
      {/*    className={s.tablePagination}*/}
      {/*    page={page}*/}
      {/*  />*/}
      {/*  <span>Show</span>*/}
      {/*  <Select*/}
      {/*    value={rowsPerPage.toString()}*/}
      {/*    onChange={handleChangeRowsPerPage}*/}
      {/*    className={s.tableSelectRowPerPage}*/}
      {/*    size="small"*/}
      {/*  >*/}
      {/*    <MenuItem value={5}>5</MenuItem>*/}
      {/*    <MenuItem value={10}>10</MenuItem>*/}
      {/*    <MenuItem value={25}>25</MenuItem>*/}
      {/*  </Select>*/}
      {/*  <span>Cards per page</span>*/}
      {/*</div>*/}
    </div>
  );
};
