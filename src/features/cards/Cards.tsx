import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { cardsThunks, cleanPacks, setCardsPackId } from "features/cards/cards.slice";
import { NavLink, useParams } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import BasicCardsTable from "features/cards/BasicCardsTable";
import s from "./Cards.module.css";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { packsThunks } from "features/packs/packs.slice";
import { FormikProvider, useFormik } from "formik";

export const Cards = () => {
  const dispatch = useAppDispatch();
  const { packId } = useParams();
  const packName = useAppSelector((state) => state.cards.packName);
  const userId = useAppSelector((state) => state.auth.profile?._id);
  const packUserId = useAppSelector((state) => state.cards.packUserId);
  const cardsPackId = useAppSelector((state) => state.cards.cardsPackId);

  const addNewCardPressHandler = async () => {
    if (packId) {
      await dispatch(cardsThunks.createCard({ cardsPack_id: packId }));
      dispatch(cardsThunks.getCards({ packId }));
    }
  };

  const backToPackListHandler = () => {
    dispatch(setCardsPackId({ packId: null }));
    dispatch(cleanPacks());
  };

  //add card modal
  const [open, setOpen] = useState(false);

  const handleClickAddModalOpen = () => {
    setOpen(true);
  };

  const handleClose = (res: any) => {
    setOpen(false);
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
      question: "",
      answer: "",
    },
    onSubmit: async (values, formikHelpers) => {
      if (packId) {
        await dispatch(
          cardsThunks.createCard({
            cardsPack_id: packId,
            question: values.question,
            answer: values.answer,
          })
        );
        dispatch(cardsThunks.getCards({ packId }));
      }
      formikHelpers.resetForm();
      setOpen(false);
    },
  });

  return (
    <div className={s.cardsContainer}>
      <div className={s.backToPacksBlock}>
        <NavLink to={"/packs"} className={s.backToPacksLink} onClick={backToPackListHandler}>
          <KeyboardBackspaceIcon />
          <span>Back to Packs List</span>
        </NavLink>
      </div>
      <div className={s.tableTitle}>
        <span>{packName}</span>
        {packUserId === userId ? (
          <Button
            variant="contained"
            type="submit"
            style={{
              borderRadius: "30px",
              textTransform: "none",
              fontFamily: `'Montserrat', 'sans-serif'`,
              fontSize: "16px",
              padding: "8px 28px",
            }}
            onClick={handleClickAddModalOpen}
          >
            Add new card
          </Button>
        ) : (
          <Button
            variant="contained"
            type="submit"
            style={{
              borderRadius: "30px",
              textTransform: "none",
              fontFamily: `'Montserrat', 'sans-serif'`,
              fontSize: "16px",
              padding: "8px 28px",
            }}
            // onClick={handler}
          >
            Learn to pack
          </Button>
        )}
      </div>
      <BasicCardsTable />
      {/*add card modal*/}
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add new card</DialogTitle>
          <FormikProvider value={formik}>
            <form action="" onSubmit={formik.handleSubmit} className={s.form}>
              <TextField variant="standard" {...formik.getFieldProps("question")} label={"Question"} margin="normal" />
              {formik.touched.question && formik.errors.question ? (
                <div className={s.formError}>{formik.errors.question}</div>
              ) : null}
              <TextField variant="standard" {...formik.getFieldProps("answer")} label={"Answer"} margin="normal" />
              {formik.touched.answer && formik.errors.answer ? (
                <div className={s.formError}>{formik.errors.answer}</div>
              ) : null}
            </form>
          </FormikProvider>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button onClick={formik.submitForm} variant="contained">
              Add card
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
