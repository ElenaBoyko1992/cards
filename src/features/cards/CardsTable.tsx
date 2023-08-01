import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
  SelectChangeEvent,
  TableSortLabel,
  TextField,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import s from "./Cards.module.css";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TablePagination } from "components/TablePagination/TablePagination";
import * as React from "react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { cardsThunks, setCardsPage, setRowsCardsPerPage, sortCardsBy } from "features/cards/cards.slice";
import { FormikProvider, FormikState, useFormik } from "formik";

export const CardsTable = (props: CardsTablePropsType) => {
  const dispatch = useAppDispatch();
  const questionSortIsActive = useAppSelector((state) => state.cards.questionSortIsActive);
  const answerSortIsActive = useAppSelector((state) => state.cards.answerSortIsActive);
  const updatedSortIsActive = useAppSelector((state) => state.cards.updatedSortIsActive);
  const gradeSortIsActive = useAppSelector((state) => state.cards.gradeSortIsActive);
  const orderBy = useAppSelector((state) => state.cards.orderBy);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const packUserId = useAppSelector((state) => state.cards.packUserId);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [idForDeleteCard, setIdForDeleteCard] = useState("");
  const [cardName, setCardName] = useState("");
  const [idForEditCard, setIdForEditCard] = useState("");

  //test
  const [startingValuesForOpenEditForm, setStartingValuesForOpenEditForm] = useState<any>({});
  //****

  const handleClickOpenDeleteDialog = (id: string, name: string) => {
    setOpenDeleteDialog(true);
    setIdForDeleteCard(id);
    setCardName(name);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setIdForDeleteCard("");
  };

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

  const deleteCardHandler = async () => {
    await dispatch(cardsThunks.deleteCard({ id: idForDeleteCard }));
    dispatch(cardsThunks.getCards({ packId: props.packId }));
    setOpenDeleteDialog(false);
  };

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

  //editCardModal

  const [openEditModal, setOpenEditModal] = useState(false);

  const handleClickEditModalOpen = (id: string, question: string, answer: string) => {
    setStartingValuesForOpenEditForm({ question, answer });
    console.log(startingValuesForOpenEditForm);
    setIdForEditCard(id);
    setTimeout(() => {
      setOpenEditModal(true);
    }, 0);
  };

  const handleEditModalClose = (res: any) => {
    setOpenEditModal(false);
    console.log(res);
  };
  const formik = useFormik({
    validate: (values) => {
      if (!values.question) {
        return {
          question: "Question is required",
        };
      }
      if (!values.answer) {
        return {
          answer: "Answer is required",
        };
      }
    },
    initialValues: {
      question: startingValuesForOpenEditForm.question ? startingValuesForOpenEditForm.question : "",
      answer: startingValuesForOpenEditForm.answer ? startingValuesForOpenEditForm.answer : "",
    },
    values: {
      question: startingValuesForOpenEditForm.question ? startingValuesForOpenEditForm.question : "",
      answer: startingValuesForOpenEditForm.answer ? startingValuesForOpenEditForm.answer : "",
    },
    onSubmit: async (values, formikHelpers) => {
      console.log(values);
      const valuesForThunk = { ...values, _id: idForEditCard };
      await dispatch(cardsThunks.editCard(valuesForThunk));
      dispatch(cardsThunks.getCards({ packId: props.packId }));
      formikHelpers.resetForm();
      setOpenEditModal(false);
    },
  });

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
                {/*<TableSortLabel*/}
                {/*  active={gradeSortIsActive}*/}
                {/*  direction={orderBy}*/}
                {/*  onClick={sortByGradeHandler}*/}
                {/*></TableSortLabel>*/}
              </TableCell>
              {userId === packUserId && <TableCell> </TableCell>}
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
                <TableCell>
                  <Rating name="read-only" value={cardRow.grade} readOnly />
                </TableCell>
                {userId === packUserId && (
                  <TableCell>
                    <div>
                      <div className={s.tableSellIcons}>
                        <button
                          onClick={() => handleClickEditModalOpen(cardRow.cardId, cardRow.question, cardRow.answer)}
                        >
                          <BorderColorOutlinedIcon />
                        </button>
                        <button onClick={() => handleClickOpenDeleteDialog(cardRow.cardId, cardRow.question)}>
                          <DeleteOutlineOutlinedIcon />
                        </button>
                      </div>
                    </div>
                  </TableCell>
                )}
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
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{"Delete Card"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Do you really want to remove card '${cardName}'?`}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={deleteCardHandler} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/*editCard modal*/}
      <div>
        <Dialog open={openEditModal} onClose={handleEditModalClose}>
          <DialogTitle>Add new card</DialogTitle>
          <FormikProvider value={formik}>
            <form action="" onSubmit={formik.handleSubmit} className={s.form}>
              <TextField variant="standard" {...formik.getFieldProps("question")} label={"Question"} margin="normal" />
              {/*{formik.touched.question && formik.errors.question ? (*/}
              {/*    <div className={s.formError}>{formik.errors.question}</div>*/}
              {/*) : null}*/}
              <TextField variant="standard" {...formik.getFieldProps("answer")} label={"Answer"} margin="normal" />
              {/*{formik.touched.answer && formik.errors.answer ? (*/}
              {/*    <div className={s.formError}>{formik.errors.answer}</div>*/}
              {/*) : null}*/}
            </form>
          </FormikProvider>
          <DialogActions>
            <Button onClick={handleEditModalClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={formik.submitForm} variant="contained">
              Edit card
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
