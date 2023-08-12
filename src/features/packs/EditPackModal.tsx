import * as React from "react";
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { FormikContextType, FormikProvider } from "formik";
import s from "features/cards/Cards.module.css";

export const EditPackModal = (props: EditPackModalType) => {
  const handleEditModalClose = (res: any) => {
    props.setOpenEditModal(false);
  };

  return (
    <div>
      <Dialog open={props.openEditModal} onClose={handleEditModalClose}>
        <DialogTitle>Edit pack</DialogTitle>
        <FormikProvider value={props.formik}>
          <form action="" onSubmit={props.formik.handleSubmit} className={s.form}>
            <TextField
              variant="standard"
              {...props.formik.getFieldProps("namePack")}
              label={"Name pack"}
              margin="normal"
            />
          </form>
        </FormikProvider>
        <DialogActions>
          <Button onClick={handleEditModalClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={props.formik.submitForm} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

//types
type EditPackModalType = {
  openEditModal: boolean;
  setOpenEditModal: (open: boolean) => void;
  formik: FormikContextType<any>;
};
