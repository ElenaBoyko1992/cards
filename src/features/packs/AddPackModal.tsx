import * as React from "react";
import { Button, Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import s from "./Packs.module.css";
import { useAppDispatch } from "common/hooks";
import { packsThunks } from "features/packs/packs.slice";

export const AddPackModal = (props: AddPackModalType) => {
  const dispatch = useAppDispatch();

  const handleClose = (res: any) => {
    props.setOpenAddPackModal(false);
  };

  const formik = useFormik({
    validate: (values) => {
      if (!values.namePack) {
        return {
          namePack: "Name pack is required",
        };
      }
    },
    initialValues: {
      namePack: "",
    },
    onSubmit: async (values, formikHelpers) => {
      await dispatch(packsThunks.createPack({ name: values.namePack }));
      dispatch(packsThunks.getPacks());
      formikHelpers.resetForm();
      props.setOpenAddPackModal(false);
    },
  });

  return (
    <div>
      <Dialog open={props.openAddPackModal} onClose={handleClose}>
        <DialogTitle>Add new pack</DialogTitle>
        <FormikProvider value={formik}>
          <form action="" onSubmit={formik.handleSubmit} className={s.form}>
            <TextField variant="standard" {...formik.getFieldProps("namePack")} label={"Name pack"} />
            {formik.touched.namePack && formik.errors.namePack ? (
              <div className={s.formError}>{formik.errors.namePack}</div>
            ) : null}
          </form>
        </FormikProvider>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={formik.submitForm} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

//types
type AddPackModalType = {
  openAddPackModal: boolean;
  setOpenAddPackModal: (open: boolean) => void;
};
