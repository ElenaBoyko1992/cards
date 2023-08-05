import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Rating, TableSortLabel } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import s from "./Cards.module.css";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { cardsThunks, sortCardsBy } from "features/cards/cards.slice";
import { FormikContextType } from "formik";
import { CardsRowType } from "features/cards/CardsTable";

export const CardsTableContainer = (props: CardsTableContainer) => {
  const dispatch = useAppDispatch();
  const questionSortIsActive = useAppSelector((state) => state.cards.questionSortIsActive);
  const answerSortIsActive = useAppSelector((state) => state.cards.answerSortIsActive);
  const updatedSortIsActive = useAppSelector((state) => state.cards.updatedSortIsActive);
  const orderBy = useAppSelector((state) => state.cards.orderBy);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const packUserId = useAppSelector((state) => state.cards.packUserId);

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

  const handleClickOpenDeleteDialog = (id: string, name: string) => {
    props.setOpenDeleteDialog(true);
    props.setIdForDeleteCard(id);
    props.setCardName(name);
  };

  const handleClickEditModalOpen = (id: string, question: string, answer: string) => {
    props.formik.setFieldValue("question", question);
    props.formik.setFieldValue("answer", answer);
    props.setIdForEditCard(id);
    props.setOpenEditModal(true);
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
              <TableCell>Grade</TableCell>
              {userId === packUserId && <TableCell> </TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.cardsRows.map((cardRow) => (
              <TableRow key={cardRow.cardId}>
                <TableCell>{cardRow.question}</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

//types
type CardsTableContainer = {
  setOpenDeleteDialog: (open: boolean) => void;
  setIdForDeleteCard: (id: string) => void;
  setCardName: (name: string) => void;
  formik: FormikContextType<any>;
  packId: string;
  cardsRows: Array<CardsRowType>;
  setOpenEditModal: (open: boolean) => void;
  setIdForEditCard: (id: string) => void;
};
