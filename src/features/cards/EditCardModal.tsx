import * as React from "react";
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { FormikContextType, FormikProvider } from "formik";
import s from "features/cards/Cards.module.css";

export const EditCardModal = (props: EditCardModalType) => {
  const handleEditModalClose = (res: any) => {
    props.setOpenEditModal(false);
  };

  return (
    <div>
      <Dialog open={props.openEditModal} onClose={handleEditModalClose}>
        <DialogTitle>Edit card</DialogTitle>
        <FormikProvider value={props.formik}>
          <form action="" onSubmit={props.formik.handleSubmit} className={s.form}>
            <TextField
              variant="standard"
              {...props.formik.getFieldProps("question")}
              label={"Question"}
              margin="normal"
            />
            <TextField variant="standard" {...props.formik.getFieldProps("answer")} label={"Answer"} margin="normal" />
          </form>
        </FormikProvider>
        <DialogActions>
          <Button onClick={handleEditModalClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={props.formik.submitForm} variant="contained">
            Edit card
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

//types
type EditCardModalType = {
  openEditModal: boolean;
  setOpenEditModal: (open: boolean) => void;
  formik: FormikContextType<any>;
};
