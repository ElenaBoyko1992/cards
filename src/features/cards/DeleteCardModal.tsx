import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { FormikContextType, FormikProvider } from "formik";
import s from "features/cards/Cards.module.css";
import { cardsThunks } from "features/cards/cards.slice";
import { useAppDispatch } from "common/hooks";

export const DeleteCardModal = (props: DeleteCardModalType) => {
  const dispatch = useAppDispatch();
  const handleCloseDeleteDialog = () => {
    props.setOpenDeleteDialog(false);
    props.setIdForDeleteCard("");
  };
  const deleteCardHandler = async () => {
    await dispatch(cardsThunks.deleteCard({ id: props.idForDeleteCard }));
    dispatch(cardsThunks.getCards({ packId: props.packId }));
    props.setOpenDeleteDialog(false);
  };

  return (
    <div>
      <Dialog open={props.openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{"Delete Card"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{`Do you really want to remove card '${props.cardName}'?`}</DialogContentText>
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
    </div>
  );
};

//types
type DeleteCardModalType = {
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (open: boolean) => void;
  idForDeleteCard: string;
  setIdForDeleteCard: (id: string) => void;
  cardName: string;
  packId: string;
};
