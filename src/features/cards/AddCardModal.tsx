import * as React from "react";
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import s from "features/cards/Cards.module.css";
import { cardsThunks } from "features/cards/cards.slice";
import { useAppDispatch } from "common/hooks";

export const AddCardModal = (props: AddCardModalType) => {
  const dispatch = useAppDispatch();
  const handleClose = (res: any) => {
    props.setOpenAddCardModal(false);
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
      if (props.packId) {
        await dispatch(
          cardsThunks.createCard({
            cardsPack_id: props.packId,
            question: values.question,
            answer: values.answer,
          })
        );
        dispatch(cardsThunks.getCards({ packId: props.packId }));
      }
      formikHelpers.resetForm();
      props.setOpenAddCardModal(false);
    },
  });

  return (
    <div>
      <Dialog open={props.openAddCardModal} onClose={handleClose}>
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
  );
};

//types
type AddCardModalType = {
  openAddCardModal: boolean;
  setOpenAddCardModal: (open: boolean) => void;
  packId: string;
};
