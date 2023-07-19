import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { SelectChangeEvent, TableSortLabel } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import s from "features/packs/Packs.module.css";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TablePagination } from "components/TablePagination/TablePagination";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunks, setPage, setRowsPerPage, sortBy } from "features/packs/packs.slice";
import { NavLink } from "react-router-dom";
import { cardsThunks, setCardsPage, setRowsCardsPerPage, sortCardsBy } from "features/cards/cards.slice";

export const CardsTable = (props: CardsTablePropsType) => {
  const dispatch = useAppDispatch();
  const questionSortIsActive = useAppSelector((state) => state.cards.questionSortIsActive);
  const answerSortIsActive = useAppSelector((state) => state.cards.answerSortIsActive);
  const updatedSortIsActive = useAppSelector((state) => state.cards.updatedSortIsActive);
  const gradeSortIsActive = useAppSelector((state) => state.cards.gradeSortIsActive);
  const orderBy = useAppSelector((state) => state.cards.orderBy);

  const sortByQuestionHandler = async () => {
    await dispatch(sortCardsBy({ sortType: "question" }));
    dispatch(cardsThunks.getCards({ packId: props.packId }));
  };

  const sortByAnswerHandler = async () => {
    await dispatch(sortCardsBy({ sortType: "answer" }));
    dispatch(cardsThunks.getCards({ packId: props.packId }));
  };

  const sortByLastUpdatedHandler = async () => {
    await dispatch(sortCardsBy({ sortType: "updated" }));
    dispatch(cardsThunks.getCards({ packId: props.packId }));
  };

  const sortByGradeHandler = async () => {
    await dispatch(sortCardsBy({ sortType: "grade" }));
    dispatch(cardsThunks.getCards({ packId: props.packId }));
  };

  const deleteCardHandler = async (id: string) => {};

  //for pagination
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
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Question
                <TableSortLabel
                  active={questionSortIsActive}
                  direction={orderBy}
                  onClick={sortByQuestionHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                Answer
                <TableSortLabel
                  active={answerSortIsActive}
                  direction={orderBy}
                  onClick={sortByAnswerHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                Last Updated
                <TableSortLabel
                  active={updatedSortIsActive}
                  direction={orderBy}
                  onClick={sortByLastUpdatedHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell>
                Grade
                <TableSortLabel
                  active={gradeSortIsActive}
                  direction={orderBy}
                  onClick={sortByGradeHandler}
                ></TableSortLabel>
              </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.cardsRows.map((cardRow) => (
              <TableRow key={cardRow.cardId}>
                <TableCell>
                  {/*<NavLink to={`/cards/${cardRow.packId}`}>{cardRow.name}</NavLink>*/}
                  {cardRow.question}
                </TableCell>
                <TableCell>{cardRow.answer}</TableCell>
                <TableCell>{cardRow.updated}</TableCell>
                <TableCell>{cardRow.grade}</TableCell>
                {/*<TableCell>*/}
                {/*  <div className={s.tableSellActions}>*/}
                {/*    {cardRow.userId === userId ? (*/}
                {/*      <div className={s.tableSellIcons}>*/}
                {/*        <button disabled={!cardRow.cardsCount}>*/}
                {/*          <SchoolOutlinedIcon />*/}
                {/*        </button>*/}
                {/*        <button>*/}
                {/*          <BorderColorOutlinedIcon />*/}
                {/*        </button>*/}
                {/*        <button onClick={() => deletePackHandler(cardRow.packId)}>*/}
                {/*          <DeleteOutlineOutlinedIcon />*/}
                {/*        </button>*/}
                {/*      </div>*/}
                {/*    ) : (*/}
                {/*      <div className={s.tableSellIcons}>*/}
                {/*        <button disabled={!cardRow.cardsCount}>*/}
                {/*          <SchoolOutlinedIcon />*/}
                {/*        </button>*/}
                {/*      </div>*/}
                {/*    )}*/}
                {/*  </div>*/}
                {/*</TableCell>*/}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        cardTotalCount={cardsTotalCount}
        paginationChangedHandler={paginationChangedHandler}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
};

//types
type CardsTablePropsType = {
  cardsRows: Array<CardsRowType>;
  packId: string;
};

type CardsRowType = {
  question: string;
  answer: string;
  updated: string;
  grade: number;
  cardId: string;
};
